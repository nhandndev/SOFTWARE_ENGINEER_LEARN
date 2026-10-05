# Học lại Lesson 05: Index, MVCC và đo bằng `EXPLAIN`

> Dành cho phần còn thiếu ở câu 3, 6, 7, 8. Mục tiêu là **hiểu vì sao** một index có thể giúp hoặc không giúp, rồi tự thiết kế phép đo. Ví dụ thực hành dưới đây dùng `orders`, không phải lời giải trực tiếp cho đề `products`.

## 0. Bản đồ 30 giây

```text
SQL muốn lấy dòng nào?
  -> Planner ước lượng các cách lấy (Seq Scan, Index Scan, ...)
  -> Executor thực sự chạy plan đã chọn
  -> EXPLAIN: xem plan và ước lượng
  -> EXPLAIN ANALYZE: chạy thật để đo
  -> So sánh có kiểm soát, rồi mới quyết định giữ index
```

**Index không phải nút "bật tăng tốc".** Nó là một cấu trúc riêng, có lợi cho *một số mẫu query* và có chi phí duy trì. PostgreSQL chọn plan dựa trên ước lượng, không cam kết cứ có index là dùng. Xem thêm [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).

## 1. Vì sao `INCLUDE` chưa chắc tránh đọc bảng?

Giả sử có:

```sql
CREATE INDEX idx_orders_customer_created
ON orders (customer_id, created_at DESC) INCLUDE (total_amount);
```

Với query:

```sql
SELECT created_at, total_amount
FROM orders
WHERE customer_id = 7
ORDER BY created_at DESC;
```

- `customer_id`, `created_at` là **key**: dùng để tìm và hỗ trợ thứ tự.
- `total_amount` là **payload**: chỉ mang dữ liệu để trả về, không tham gia tìm/sắp xếp.
- Các cột query cần đều có trong index: PostgreSQL **có thể cân nhắc** `Index Only Scan`. Chữ "có thể" rất quan trọng.

### 1.1. Bảng (heap) và index là hai nơi khác nhau

Index chứa thông tin để tìm tới dòng; dữ liệu bảng nằm trong **heap**. `Index Scan` thông thường dùng index rồi có thể lấy dữ liệu từ heap. `Index Only Scan` cố lấy dữ liệu ngay từ index để bớt lượt đọc heap. Nhưng lấy đủ **giá trị cột** chưa đồng nghĩa biết dòng đó có được phép xuất hiện trong kết quả. [PostgreSQL: Index-Only Scans](https://www.postgresql.org/docs/current/indexes-index-only-scans.html).

### 1.2. MVCC: "visible" nghĩa là gì?

Các transaction có thể đang nhìn những trạng thái khác nhau của dữ liệu. PostgreSQL phải kiểm tra phiên bản dòng nào **hiển thị với snapshot của transaction đang đọc**. Sau `UPDATE`, có thể có nhiều phiên bản dòng, nhưng không phải query nào cũng được nhìn cùng một phiên bản.

**Sửa cách hiểu cũ của bạn:** không phải mỗi lần đọc PostgreSQL đều "phải thấy cả giá trị cũ và mới". Nó phải xác định phiên bản *được phép thấy*; đôi lúc việc đó cần xem heap.

### 1.3. Visibility map quyết định khi nào bỏ qua heap

PostgreSQL có **visibility map**, ghi theo từng *heap page* rằng các dòng trên page đó có "all-visible" hay chưa.

```text
Tìm entry phù hợp trong index
  -> Xem visibility map của heap page tương ứng
  -> Page all-visible: có thể trả dữ liệu từ index, không cần ghé heap
  -> Page chưa all-visible: có thể phải đọc heap để kiểm tra visibility
```

Trong output `EXPLAIN ANALYZE`, `Heap Fetches` cho thấy index-only scan đã phải ghé heap bao nhiêu lần. Nó có thể bằng `0`, nhưng **`INCLUDE` không bảo đảm bằng 0**. Bảng vừa bị cập nhật nhiều thường ít thuận lợi hơn bảng tương đối ổn định. Planner còn có thể chọn plan khác nếu tính ra rẻ hơn. [PostgreSQL: Index-Only Scans](https://www.postgresql.org/docs/current/indexes-index-only-scans.html).

Ví dụ *minh họa*, không phải kết quả đo trên máy bạn:

```text
Index Only Scan using idx_orders_customer_created on orders
  Index Cond: (customer_id = 7)
  Heap Fetches: 18
```

Đọc là: plan dùng `Index Only Scan`, nhưng vẫn có 18 lần cần ghé heap. Tên plan không phải lời hứa "không chạm bảng lần nào".

## 2. Vì sao không tạo index cho mọi cột?

Hãy tưởng tượng mỗi index như một danh mục riêng của cùng một kho dữ liệu. Thêm danh mục giúp một số kiểu tra cứu, nhưng mỗi lần kho thay đổi bạn còn phải duy trì các danh mục liên quan.

| Chi phí / rủi ro | Nghĩa thực tế |
|---|---|
| Dung lượng | Index là dữ liệu lưu riêng trên đĩa; index lớn cũng cạnh tranh bộ nhớ cache với dữ liệu khác. `INCLUDE` cột rộng có thể làm index phình to. |
| Ghi dữ liệu | `INSERT`, `DELETE` và nhiều `UPDATE` phải duy trì index liên quan; chi phí ghi/WAL có thể tăng. Mức ảnh hưởng cụ thể phụ thuộc workload và kiểu cập nhật. |
| Index thừa | Index trùng/chồng lấn hoặc hiếm khi hữu ích vẫn tốn chỗ và công bảo trì. Có index không có nghĩa planner chọn nó. |
| Đọc chưa chắc nhanh | Với bảng nhỏ hoặc query lấy phần lớn dòng, `Seq Scan` có thể rẻ hơn việc đi index rồi ghé nhiều vị trí trong heap. |

**Quyết định giữ index:** chọn từ query thật, đo trên dữ liệu đại diện, so sánh trước/sau, rồi cân lợi ích đọc với chi phí ghi và dung lượng. "Bảng đủ lớn" và "cột có trong WHERE" chỉ là dấu hiệu để *xem xét*, không phải điều kiện đủ. [PostgreSQL: Indexes](https://www.postgresql.org/docs/current/indexes.html), [Index-Only Scans](https://www.postgresql.org/docs/current/indexes-index-only-scans.html).

## 3. Ba lệnh dễ nhầm

```sql
EXPLAIN SELECT ...;
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;
ANALYZE orders;
```

| Lệnh | Làm gì? | Có chạy câu `SELECT` để đo không? |
|---|---|---|
| `EXPLAIN SELECT ...` | Cho biết plan PostgreSQL **dự định** dùng và các **ước lượng** | Không |
| `EXPLAIN (ANALYZE, BUFFERS) SELECT ...` | Chạy query thật; in plan kèm số dòng/thời gian thực tế và thông tin buffer | Có |
| `ANALYZE orders;` | Thu thập/cập nhật thống kê bảng để planner ước lượng tốt hơn | Không phải lệnh đo `SELECT` ở trên |

`EXPLAIN ANALYZE` không gửi các dòng kết quả `SELECT` về cho bạn như `SELECT` thường, nhưng **vẫn thực thi câu lệnh**. Chữ `ANALYZE` ở đây là một tùy chọn của `EXPLAIN`, khác với lệnh độc lập `ANALYZE orders`. [PostgreSQL: EXPLAIN](https://www.postgresql.org/docs/current/sql-explain.html).

### 3.1. Đọc đúng các con số

Ví dụ *minh họa*:

```text
Index Scan using idx_orders_customer on orders
  (cost=0.29..25.00 rows=50 width=24)
  (actual time=0.020..0.140 rows=48 loops=1)
  Index Cond: (customer_id = 7)
  Buffers: shared hit=4 read=1
Planning Time: 0.180 ms
Execution Time: 0.190 ms
```

| Tên | Cách đọc |
|---|---|
| `cost=0.29..25.00` | Ước lượng chi phí khởi động..tổng của **node**; đơn vị tương đối, **không phải ms**. |
| `rows=50` | Planner ước lượng node trả 50 dòng. Không phải bảng chỉ có 50 dòng. |
| `actual ... rows=48 loops=1` | Node thực sự trả 48 dòng trong ví dụ có một lần chạy; `actual time` là thời gian thực tế theo ms ở node. |
| `Buffers: shared hit=4 read=1` | Các lần truy cập block: `hit` tìm thấy trong shared buffer cache, `read` phải đọc block vào đó. Đây không phải số dòng. |
| `Planning Time` | Thời gian lập plan, khác thời gian thực thi. |
| `Execution Time: 0.190 ms` | Thời gian thực thi đo được cho lần chạy này; **không đồng nghĩa** toàn bộ thời gian HTTP/API. |

Với node có `loops > 1`, số `actual rows` trong plan có thể là **trung bình mỗi lần chạy**; đọc thêm `loops` để hiểu tổng công việc. Số `Execution Time` có thể dao động giữa các lần chạy do cache và tải hệ thống; đừng kết luận từ một lần đo. [PostgreSQL: Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html), [EXPLAIN options](https://www.postgresql.org/docs/current/sql-explain.html).

### 3.2. `BUFFERS` cho biết gì và không cho biết gì?

`BUFFERS` giúp nhìn các block đã `hit`, `read`, `dirtied`, `written`... Nó **không tự nó chứng minh** query nhanh/chậm và không phải số lần round-trip qua mạng. Hãy nhìn cùng plan, số dòng và thời gian. `shared hit` là tìm thấy block trong PostgreSQL shared buffers, còn `shared read` là PostgreSQL phải đọc block vào shared buffers; từ một dòng `read` đơn lẻ không thể suy thẳng ra thời gian đĩa vật lý. [PostgreSQL: EXPLAIN, BUFFERS](https://www.postgresql.org/docs/current/sql-explain.html).

## 4. Vì sao `EXPLAIN ANALYZE UPDATE` nguy hiểm?

`EXPLAIN ANALYZE` **thực thi** câu lệnh để đo. Với `UPDATE`, `DELETE`, `INSERT`, dữ liệu thực sự thay đổi nếu transaction được commit. Đừng chạy thử trên production chỉ vì nghĩ `EXPLAIN` là xem trước. Với bài học này, chỉ thực hành trên `SELECT` và dữ liệu thử. [PostgreSQL: EXPLAIN](https://www.postgresql.org/docs/current/sql-explain.html).

Nếu buộc phải kiểm tra một lệnh ghi trong môi trường an toàn, tài liệu PostgreSQL nêu cách bọc transaction rồi rollback:

```sql
BEGIN;
EXPLAIN (ANALYZE, BUFFERS)
UPDATE orders SET status = 'PAID' WHERE id = 123;
ROLLBACK;
```

Đây **không phải** lý do để thử tùy tiện trên dữ liệu thật: câu `UPDATE` vẫn chạy trong transaction, có thể giữ lock, tốn tài nguyên và có các tác động ngoài database không được rollback. Đọc [PostgreSQL: EXPLAIN](https://www.postgresql.org/docs/current/sql-explain.html) trước khi làm thật.

## 5. Cách kiểm chứng một index: ví dụ khác đề

Giả sử API thường lấy 20 Order mới nhất của một Customer:

```sql
SELECT id, created_at, total_amount
FROM orders
WHERE customer_id = 7
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Bạn nghi index `(customer_id, created_at DESC, id DESC)` sẽ hữu ích. Đừng vội trả lời "chắc chắn nhanh". Làm phép thử:

1. **Định nghĩa workload:** query này chạy thường xuyên không? Customer 7 có 20/100.000 Order hay 80.000/100.000? Dùng dữ liệu đủ gần thực tế, không phải bảng có vài dòng.
2. **Ghi mốc trước:** chạy `EXPLAIN (ANALYZE, BUFFERS)` cho chính query trên, lưu scan type, estimated/actual rows, `Execution Time`, buffers. Ghi cả điều kiện và số lượng dữ liệu.
3. **Thử một thay đổi:** trên môi trường thử nghiệm, tạo đúng một index ứng viên; chạy lại cùng query, cùng tham số, cùng tập dữ liệu. Đọc plan mới, không mặc định PostgreSQL phải dùng index.
4. **So sánh có kiểm soát:** chạy vài lần để nhận ra dao động do cache/tải máy. Nếu số dòng ước lượng lệch xa thực tế, kiểm tra thống kê trước khi kết luận. Không đổi SQL, dữ liệu, tham số hay môi trường giữa hai phía rồi quy hết chênh lệch cho index.
5. **Ra quyết định:** giữ nếu cải thiện đáng kể cho workload quan trọng và đáng chi phí lưu trữ/ghi. Nếu planner không dùng hoặc lợi ích nhỏ/không ổn định trong khi chi phí cao, xem lại hoặc bỏ ứng viên trong môi trường thử nghiệm.

**Ví dụ ghi kết quả** (số liệu giả định, chỉ để biết cách đọc bảng):

| Đo trên dữ liệu thử | Trước | Sau |
|---|---:|---:|
| Scan type | `Seq Scan` + sort | `Index Scan` |
| `Execution Time` (ms) | 18.2 | 1.4 |
| `shared read` (blocks) | 120 | 8 |
| Dòng trả về | 20 | 20 |

Trong phép thử giả định này index giúp **query và dữ liệu đang xét**. Chưa thể nói tất cả query sẽ nhanh hơn hoặc backend HTTP giảm đúng 16.8 ms. Nếu bảng đang chỉ có 20 dòng, số đo có thể không nói gì về production. Xem [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).

## 6. Tự kiểm tra, chưa xem đáp án đề

1. Index đã chứa đủ cột query cần thì vì sao vẫn có thể thấy `Heap Fetches`?
2. Trong `cost=0.29..25.00` và `Execution Time: 0.190 ms`, số nào là ước lượng, số nào là đo thật?
3. Nếu chạy `EXPLAIN ANALYZE DELETE ...` ngoài transaction thử nghiệm, có xóa dữ liệu không?
4. Một query nhanh hơn một lần sau khi thêm index đã đủ giữ index chưa? Bạn cần giữ những điều kiện nào giống nhau?
5. Kể hai chi phí tạo index ngoài "tốn thời gian viết lệnh CREATE INDEX".

Khi tự trả lời được, quay lại [đề Lesson 05](../../Exams/de-kiem-tra/M2-1-sql-index__2026-10-04__lesson5-lan1.md) để làm câu 7–8. Chưa cần học sâu vacuum internals, HOT update hay mọi loại index để hoàn thành lesson này.
