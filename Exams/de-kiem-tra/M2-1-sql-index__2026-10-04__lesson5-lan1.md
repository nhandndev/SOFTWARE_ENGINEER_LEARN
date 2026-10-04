# Bài kiểm tra M2-1 - Lesson 05: Index và EXPLAIN ANALYZE

> 8 câu, tổng 40 điểm thô. Chấm theo **lập luận**; không cần PostgreSQL đang chạy. Nếu nói `chấm thử`, chỉ chấm câu đã làm. Không mở file `__DAPAN.md` trước khi làm.

Giả sử `shopcore` có bảng `products(id, name, category_id, price)`. Có lúc bảng chỉ vài chục dòng, có lúc có 10.000 Product. Các plan ở dưới là **minh họa**, không phải plan đã đo trên project của bạn.

## Câu 1 - B-tree và selectivity (5đ)

Xét query:

```sql
SELECT id, name, price
FROM products
WHERE category_id = 42;
```

Bạn đề xuất index B-tree đơn cột nào? Nếu 100/10.000 Product thuộc Category 42 thì vì sao index **có thể** hữu ích? Nếu 8.000/10.000 Product thuộc Category đó, có thể xảy ra điều gì với việc chọn `Seq Scan`? Có index là chắc chắn được dùng không?

**Trả lời:**
đề xuất index B-tree đơn cột categỏy_id , nếu 100/10000 Product thuộc category 42 thì nên chọn index , vì thứ nhất là chọn sequence thì nó sẽ quét tuần tự tận  hơn 10000 lần và nó rất là tốn thời gian , nên là cần phải dùng index để tìm cho nhanh , còn 8000/10000 thì ta nên xài sed scan vì là tận 8000 product thuộc thì nó gầnn hư là đọc hết bảng Product nên là scan tuần tự nó sẽ tiết kiệm và đángh ơn so với index , vì phải trade off giữa thời gian và tiết kiệm bộ storage , chi phí vì là dùng index sẽ phải tốn chi phí lưu trữ cũng như là dnahsd đổi giữa compute nhiều để mà cho ra thời gian nhanh nhưng mà 8000 product thì gần như là quét toàn bộ nên là xìa seq Scan
---

## Câu 2 - Composite index (6đ)

Endpoint thường chạy query:

```sql
SELECT id, name, price
FROM products
WHERE category_id = 42
ORDER BY price DESC, id ASC
LIMIT 20;
```

Hai đề xuất:

```sql
-- A
CREATE INDEX idx_a ON products (category_id, price DESC, id ASC);

-- B
CREATE INDEX idx_b ON products (price DESC, category_id, id ASC);
```

Index nào **đáng thử trước** cho query này? Giải thích vai trò của từng key trong A và vì sao B không khớp mẫu query rõ bằng A. Có thể khẳng định planner luôn dùng A không?

**Trả lời:**
cái A là trong cùng category_id thì mới xét đến price là sắp xếp giảm đần , nếu cùng price thì sẽ sắp xếp theo id tăng đần ,, B là cùng price thì mứoi xét category_id rồi trong cùng category_id thì mứoi xét đến id thì là nên dùng index A cho câu lẹnhe query trên vì là WHERE category_id = 42
ORDER BY price DESC, id ASC thì là tìm điều kiện category_id = 42 trước r mới tới các điều kiện , còn  cái kia B là tìm cái price trước . planner không chắc là luôn dùng A , tuỳ vào query nhưng mà trường hợp trên ứng viên phù hợp là A 

---

## Câu 3 - Covering index (5đ)

Xét **biến thể** của A:

```sql
CREATE INDEX idx_cover
ON products (category_id, price DESC, id ASC) INCLUDE (name);
```

`name` sau `INCLUDE` có phải key lọc/sắp xếp không? Tại sao index này **có thể** hỗ trợ `Index Only Scan` cho query câu 2? Vì sao có `INCLUDE` rồi vẫn không được hứa `Heap Fetches = 0` hoặc chạy nhanh hơn?

**Trả lời:**name không phải là key lọc /sắp xếp , nó chỉ là thông tin cung cấp thêm nếu như mà người ta cần phải tìm name dựa vào index thay vì phải tìm ra được cái products sau khi index và tìm ra được product trong bảng products r kiếm naem của nó nên là đây chỉ là cung cấp thông tin ngoài . index này có thể hỗ trợ Index Only Scan cho query câu 2 vì có INCLUDE(name) thì là đủ cung cấp , còn Heap Fetches = 0` hoặc chạy nhanh hơn? thì chịu nhưng mà chịu . name là payload và nó có thể hỗ trợ index co du cac cot cho query nen co the ho tro Index Only Scan , tuy nhiên vẫn có INCLUDe nhưng vẫn còn câu truyện đó là MVVC , visible có thể hiểu đơn giản là nó phải được phép thấy transaction cũ , ví dụ như là tôi cần update row a thì Postgre phải thấy được value cũ và value mới thì nó phải quay lại Heap nên là Heap Fetches >= 0 , cũng k hứa dc chạy nhanh hơn luôn vì nó có thể phải quay về Heap xem ,nhưng mà nếu như đã chắn chắn Visible thì nó sẽ k quay lại

---

## Câu 4 - Đọc plan trước/sau (6đ)

**Cùng query câu 1**, giả sử chạy trên cùng dữ liệu 10.000 Product:

```text
-- Trước index
Seq Scan on products  (cost=0.00..210.00 rows=100 width=40)
  (actual time=0.030..3.800 rows=100 loops=1)
  Filter: (category_id = 42)
  Rows Removed by Filter: 9900
Execution Time: 3.900 ms

-- Sau index
Index Scan using idx_products_category_id on products
  (cost=0.29..30.00 rows=100 width=40)
  (actual time=0.020..0.270 rows=100 loops=1)
  Index Cond: (category_id = 42)
Execution Time: 0.320 ms
```

Nói rõ: A/B đọc bảng bằng cách gì; `rows=100` ước lượng khác `actual rows=100` thế nào; `cost=210` có phải 210 ms không; hai giá trị `Execution Time` là bao nhiêu? Từ ví dụ này **được** và **chưa được** kết luận điều gì?

**Trả lời:** A đọc bảng bằng cách là Seq Scan , B là đọc bằng Index Scan , rows=100` là số row ước lượng để tính toán cost và chọn plan còn actual row =100 là số row thực sự sau khi mà nó đã EXPLAIN ANALYZE là đã chạy thửu thật chứu k dự đoán . cost =210 là con số dùng để so sánh con số này với lại cách Scan khác , nó không phải là 210 ms , Execution time của A là 3.900 , index là 0.320 và cái này kết luận được là Index nó chạy nhanh hơn nhiều là vì   Index Cond: (category_id = 42) nó tìm hẵn category_id để ra kết quả luôn còn Seq Scan là   Rows Removed by Filter: 9900 từ đó thấy là số lượng Row bị loại bỏ nhiều và row cần tìm ít so với tổngt thể nên là nên chọn index scan . Tất nhiên là không kết luận dc là lúc nào nó cũng nhanh mà chỉ là nhanh hơn trong lần thử này thôi 

---

## Câu 5 - Có index mà vẫn `Seq Scan` (4đ)

Một bảng chỉ 20 Product, hoặc query trả 80% Product. `EXPLAIN ANALYZE` vẫn hiện `Seq Scan` dù có index trên cột lọc. Đây có phải chắc chắn là bug hay index bị hỏng không? Giải thích theo chi phí đọc dữ liệu.

**Trả lời:**
đây không phải là lỗi mà là vì Seq Scan tối ưu hơn so với Index vì một bảng chỉ cso 20 Product hoặc là query trả 80% Product thì nó sẽ chọn quét tuần tự cả bảng thay vì phải dùng index , đây không phải là indexbij hỏng mà là chi phí đọc dữ liệu của nó khi chọn Seq Scan sẽ tối ưu hơn là Index Scan
---

## Câu 6 - Chi phí của index (4đ)

Một bạn đề nghị: "Tạo index cho **mọi cột** của Product để query nào cũng nhanh". Hãy nêu ít nhất hai chi phí/rủi ro của cách này và một cách quyết định index nào đáng giữ.

**Trả lời:** nên tạo index khi mà bảng đó đủ lớn và truy vấn 1 phần nhỏ trong đó , cột đó xuất hiện nhiều trong where , join , không nên tạo Index khi mà bảng nhỏ , ít cột phải bị loại bỏ , INSERT , UPDATE nhiều thì chi phí câpj nhật index ccũng nhiều và ở composite index thì nên giữ đúng thứ tự , index đáng giữ là index giải quyết được bài toán tối tưu chọn SEQ hay index , tạo index khi giúp database không phải đọc những row k cần thiết , loại bỏ row k cần thiết . Nên dùng EXPLAN ANALYZE để xem được chi phí và thời gian chạy để quyết định là nên dùng cái nào 


---

## Câu 7 - `EXPLAIN` khác `EXPLAIN ANALYZE` (5đ)

`EXPLAIN SELECT ...` và `EXPLAIN (ANALYZE, BUFFERS) SELECT ...` khác nhau ở **có thực sự chạy query để đo** không? Tên `cost`, `actual time`, `Execution Time` nói về loại thông tin nào? Vì sao không nên tùy tiện chạy `EXPLAIN ANALYZE UPDATE products ...` trên dữ liệu thật?

**Trả lời:**
EXPLAIN chỉ cho planner plan và các giá trị ước lượng, không chạy query để đo thực tế. EXPLAIN ANALYZE thực sự chạy query nên có thêm actual time, actual rows và Execution Time. cost là chi phí ước lượng tương đối của planner, không phải milliseconds; actual time là thời gian thực tế của từng node; Execution Time là thời gian thực thi toàn query. Không nên tùy tiện chạy EXPLAIN ANALYZE UPDATE trên dữ liệu thật vì câu UPDATE sẽ thực sự được thực thi và thay đổi dữ liệu.

---

## Câu 8 - Thiết kế một phép kiểm chứng (5đ)

Bạn muốn biết index `(category_id, price DESC, id ASC)` có giúp query câu 2 không. Hãy mô tả **4-5 bước** kiểm tra trước/sau đủ tin cậy: chọn dữ liệu nào, chạy lệnh gì, ghi chỉ số nào, giữ những điều kiện nào giống nhau, và khi nào nên **không giữ** index. Không cần chạy thật.

**Trả lời:**
đầu tiên là  ta chạy EXPLAIN (ANALYZE, BUFFERS) trên câu query bình thường , chạy xong đó , rồi sau đó là ghi lại actual rows, Execution Time và buffers. sau đó là dùng index và chyaj ,chạy lại nhiều lần để giảm bớt sai số do cache , và chạy để xem thử là thời gian chạy và chi phí xem thử có đáng để dùng index k 
