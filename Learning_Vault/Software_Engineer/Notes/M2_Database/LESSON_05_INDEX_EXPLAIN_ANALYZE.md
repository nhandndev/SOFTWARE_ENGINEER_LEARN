# M2-1 - Lesson 05: Index và đọc `EXPLAIN ANALYZE`

> Mục tiêu: nhìn một query của backend rồi **đề xuất index có lý do**, đọc được plan cơ bản và biết cách so sánh trước/sau. Bạn chưa cần thuộc mọi loại index hay tối ưu bằng mẹo.

Lesson 01-04 tập trung **query trả dữ liệu gì**. Lesson 05 hỏi thêm: **database tìm những dòng đó bằng cách nào và tốn bao nhiêu?** Đúng kết quả là điều kiện đầu tiên; index chỉ nhằm giảm chi phí cho query quan trọng.

## Tài liệu / video

- [PostgreSQL: Indexes](https://www.postgresql.org/docs/current/indexes.html) và [B-tree](https://www.postgresql.org/docs/current/indexes-types.html) - đọc sau mục 2.
- [PostgreSQL: Multicolumn Indexes](https://www.postgresql.org/docs/current/indexes-multicolumn.html) - đọc sau mục 4.
- [PostgreSQL: Index-Only Scans and Covering Indexes](https://www.postgresql.org/docs/current/indexes-index-only-scans.html) - đọc sau mục 5.
- [PostgreSQL: Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html) - xem mục `EXPLAIN Basics` và `EXPLAIN ANALYZE` sau mục 7.
- [PostgreSQL: Foreign key và index](https://www.postgresql.org/docs/current/ddl-constraints.html) - tra cứu khi làm project.
- Video nếu cần: tìm `PostgreSQL EXPLAIN ANALYZE Seq Scan Index Scan beginner`; chọn video giải thích **plan của cùng một query trước/sau index**, không chỉ đọc tên node.

## 1. Bắt đầu bằng một query, không bắt đầu bằng index

Giả sử `shopcore` có bảng `products(id, name, category_id, price)`. Endpoint list Product theo Category thường gửi:

```sql
SELECT id, name, price
FROM products
WHERE category_id = 42;
```

Với bảng vài dòng, đọc toàn bộ bảng rồi lọc có thể rẻ. Với bảng lớn, nếu Category 42 chỉ chiếm ít dòng, đọc toàn bộ bảng để tìm chúng có thể tốn công. Ta cần biết:

1. Query này có chạy thường xuyên/quan trọng không?
2. Bảng lớn cỡ nào? Điều kiện trả phần nhỏ hay phần lớn bảng?
3. Plan hiện tại là gì, thời gian và số dòng ra sao?

**Index là cấu trúc dữ liệu riêng giúp tìm vị trí những dòng phù hợp**, không thay đổi kết quả SQL. PostgreSQL có thể dùng index hoặc không, tùy query, dữ liệu và ước lượng chi phí.

## 2. B-tree: lựa chọn đầu tiên cho `=`, khoảng, thứ tự

```sql
CREATE INDEX idx_products_category_id ON products (category_id);
```

Trong PostgreSQL, `CREATE INDEX` mặc định tạo **B-tree**. Với `WHERE category_id = 42`, index này là một **ứng viên** để tìm các Product khớp. B-tree cũng thường phù hợp với so sánh `<`, `<=`, `>`, `>=`, `BETWEEN` và có thể giúp `ORDER BY` phù hợp. Nhưng **có index không có nghĩa planner phải dùng index**.

Ví dụ chọn lọc (selectivity):

| Tình huống | Suy luận trước khi xem plan |
|---|---|
| 100 trong 10.000 Product có `category_id=42` | Index có thể hữu ích vì chỉ cần ít dòng. |
| 8.000 trong 10.000 Product có `category_id=42` | Đọc index rồi lấy rất nhiều dòng từ bảng có thể không lợi; `Seq Scan` có thể hợp lý. |
| Bảng chỉ 20 dòng | Đọc cả bảng có thể rẻ hơn mở index. |

Đây là **giả thuyết**, không phải ngưỡng cố định. Dùng `EXPLAIN ANALYZE` để kiểm tra. Với JOIN `products.category_id = categories.id`, PostgreSQL không tự tạo index ở cột **tham chiếu** `products.category_id` chỉ vì có foreign key; hãy xem workload trước khi thêm index.

## 3. Index không miễn phí

Index chiếm dung lượng lưu trữ. Khi thêm/sửa/xóa dòng, database có thể phải cập nhật index liên quan, làm thao tác ghi tốn thêm công. Index thừa còn khiến bạn khó biết index nào thật sự có ích.

Đừng tạo index cho mọi cột hoặc chỉ vì thấy cột xuất hiện trong `WHERE`. Ưu tiên query chạy thường xuyên, bảng đủ lớn, điều kiện lọc có ích và hiệu quả đã được đo. Một `Seq Scan` **không tự động là lỗi**.

## 4. Composite index: thứ tự cột gắn với query

Một API hay gặp:

```sql
SELECT id, name, price
FROM products
WHERE category_id = 42
ORDER BY price DESC, id ASC
LIMIT 20;
```

Một index **đáng thử**:

```sql
CREATE INDEX idx_products_cat_price_id
ON products (category_id, price DESC, id ASC);
```

- `category_id` ở đầu vì query lọc bằng `=` trên cột này.
- Trong các dòng cùng Category, index có thứ tự `price DESC, id ASC`, phù hợp với `ORDER BY`/`LIMIT` của query.
- `id ASC` là tiêu chí phân định khi nhiều Product đồng giá, cũng giúp pagination ổn định.

Với B-tree nhiều cột, điều kiện trên các cột **đầu** thường giúp thu hẹp phần index phải đọc nhất. Điều đó **không có nghĩa** query chỉ dùng `price` thì index trên `(category_id, price)` tuyệt đối vô dụng; planner có thể chọn các cách khác tùy dữ liệu. Hãy đọc plan thay vì thuộc một luật cứng.

Nếu workload chủ yếu `WHERE price >= 1000` mà không lọc Category, thứ tự trên có thể không phải lựa chọn tốt nhất. Đừng tạo cả loạt index gần giống nhau trước khi có query thực tế để đo.

## 5. Covering index và `INCLUDE`: chỉ là khả năng

Query mục 4 còn cần trả `name`, nhưng index `(category_id, price DESC, id ASC)` không chứa `name`. Một **biến thể** để cân nhắc, **không phải lệnh tạo thêm song song bắt buộc**:

```sql
CREATE INDEX idx_products_cat_price_id_cover
ON products (category_id, price DESC, id ASC) INCLUDE (name);
```

Ba cột trong ngoặc đầu là **key** để tìm/sắp thứ tự. `name` sau `INCLUDE` là dữ liệu kèm theo, **không phải key tìm kiếm**. Vì query chỉ cần các cột đã có trong index, PostgreSQL **có thể** dùng `Index Only Scan`.

Nhưng `Index Only Scan` còn phụ thuộc thông tin **visibility** của các dòng: nếu trang dữ liệu chưa được đánh dấu đủ điều kiện, PostgreSQL vẫn có thể phải đọc heap. Xem dòng `Heap Fetches` trong plan; `INCLUDE` không bảo đảm `Heap Fetches = 0` hay query nhanh hơn. Index lớn hơn cũng có chi phí lưu trữ/ghi cao hơn. Chỉ thêm khi đo thấy đáng giá.

## 6. `EXPLAIN` và `EXPLAIN ANALYZE` khác nhau

```sql
EXPLAIN
SELECT id, name, price FROM products WHERE category_id = 42;
```

`EXPLAIN` hiển thị **kế hoạch và ước lượng** của planner; query SELECT không được chạy để đo thời gian thực.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, name, price FROM products WHERE category_id = 42;
```

`ANALYZE` ở đây **thực sự chạy query** và thêm số dòng/thời gian thực tế. `BUFFERS` cung cấp thêm thông tin về các trang dữ liệu đã được đọc hoặc có sẵn trong bộ nhớ. Đừng nhầm tùy chọn `ANALYZE` trong `EXPLAIN` với lệnh độc lập `ANALYZE products;` dùng cập nhật thống kê cho planner.

**Cẩn thận:** `EXPLAIN ANALYZE UPDATE/DELETE/INSERT` cũng **thực sự sửa dữ liệu**. Ở bài này chỉ thử với `SELECT`; khi học thao tác ghi ở M2-2 mới bàn cách thử an toàn trong transaction.

## 7. Đọc một plan từ trái sang phải

Hai plan sau là **số liệu minh họa, không phải output đã chạy trên `shopcore`**. Giả sử cùng query mục 1, cùng khoảng 10.000 Product, Category 42 có 100 Product.

**A. Trước index**

```text
Seq Scan on products  (cost=0.00..210.00 rows=100 width=40)
  (actual time=0.030..3.800 rows=100 loops=1)
  Filter: (category_id = 42)
  Rows Removed by Filter: 9900
Execution Time: 3.900 ms
```

**B. Sau khi thêm index trên `category_id`**

```text
Index Scan using idx_products_category_id on products
  (cost=0.29..30.00 rows=100 width=40)
  (actual time=0.020..0.270 rows=100 loops=1)
  Index Cond: (category_id = 42)
Execution Time: 0.320 ms
```

| Phần plan | Đọc thế nào? |
|---|---|
| `Seq Scan` | Đọc tuần tự bảng rồi áp `Filter`; ở A đã loại 9.900 dòng. |
| `Index Scan` / `Index Cond` | Dùng index để tìm vị trí dòng khớp; **có thể vẫn phải đọc bảng** để lấy cột cần trả. |
| `cost=0.00..210.00` | Ước lượng chi phí bắt đầu..tổng của planner, theo **đơn vị tương đối**, **không phải mili giây**. |
| `rows=100` trước `actual` | Số dòng planner **ước lượng node trả ra**, không phải tổng số dòng đã quét. |
| `actual time=... rows=100 loops=1` | Thời gian (ms) và số dòng thực tế của node; ở ví dụ này node chạy một lần. |
| `Execution Time` | Thời gian thực tế của phần thực thi query; dùng để so sánh có kiểm soát, không đồng nhất với độ trễ HTTP. |

Ví dụ này B nhanh hơn A, nhưng **không suy ra mọi index đều nhanh hơn mọi Seq Scan**. Nếu plan ước lượng 100 dòng mà thực tế trả 8.000 dòng, hãy kiểm tra thống kê/dữ liệu hoặc điều kiện lọc trước khi vội tạo thêm index. Với plan có `loops > 1`, số dòng `actual rows` của node thường là **trung bình mỗi lần chạy**, nên cần nhìn cả `loops`.

## 8. Cách đo trước/sau không tự đánh lừa mình

1. Chọn **một query SELECT thật** của API/báo cáo, ghi lại SQL, điều kiện, số dòng bảng và số dòng trả về.
2. Dùng dữ liệu đủ đại diện; bảng 6 Product trong lesson sẽ không cho phép kết luận index có ích.
3. Lưu plan trước với `EXPLAIN (ANALYZE, BUFFERS) ...`; ghi scan type, estimated/actual rows, `Execution Time`, buffers nếu cần.
4. Thử **một index hợp với query**, lưu plan sau. So sánh cùng SQL, cùng điều kiện, cùng dữ liệu; chạy vài lần vì cache và môi trường có thể làm thời gian dao động.
5. Nếu ước lượng lệch nhiều, kiểm tra thống kê và cân nhắc `ANALYZE products;` trên môi trường thử nghiệm. Không ép planner dùng index chỉ để tạo ra plan đẹp.
6. Giữ index khi lợi ích đáng với dung lượng và chi phí ghi; nếu không, xem lại giả thuyết. Không xóa index sẵn có của project chỉ để làm thí nghiệm.

Trong `shopcore`, có thể bắt đầu từ query list Product theo Category và query sắp giá. Nếu chưa có PostgreSQL/dữ liệu đại diện, **học đọc plan minh họa và làm đề trước**; phần đo thật sẽ là deliverable của M2-1 khi môi trường sẵn sàng.

## 9. Tóm tắt quyết định

```text
Query nào chậm/quan trọng?
-> Dòng nào cần tìm, phần trăm của bảng là bao nhiêu?
-> Index B-tree một cột hay composite có hợp WHERE/ORDER BY không?
-> EXPLAIN ANALYZE trước/sau nói gì?
-> Lợi ích có đáng chi phí ghi và lưu trữ không?
```

Không có chỉ tiêu "phải thấy Index Scan". Chỉ tiêu là **query đúng và đủ nhanh cho workload thật**, với bằng chứng đo hợp lý.

## 10. Tự kiểm tra trước khi làm đề

1. Vì sao bảng 20 dòng có index mà PostgreSQL vẫn có thể dùng `Seq Scan`?
2. Với `WHERE category_id = 42 ORDER BY price DESC, id ASC`, cột nào nên đứng đầu index đáng thử?
3. `INCLUDE (name)` có biến `name` thành key tìm kiếm không?
4. Trong plan, `cost=210` có phải 210 ms không? `actual rows=100` nghĩa gì?
5. `EXPLAIN ANALYZE UPDATE` có thực sự sửa dữ liệu không?
6. Vì sao một lần đo nhanh hơn chưa đủ chứng minh index luôn có ích?

Làm [bài kiểm tra Lesson 05](../../Exams/de-kiem-tra/M2-1-sql-index__2026-10-04__lesson5-lan1.md) sau khi tự trả lời. Đề tự chứa query và plan minh họa, không bắt bạn dựng database chỉ để thi lesson này.
