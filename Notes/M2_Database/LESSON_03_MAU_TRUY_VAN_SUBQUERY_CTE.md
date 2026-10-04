# M2-1 - Lesson 03: Lọc dữ liệu, kiểm tra tồn tại và CTE

> Mục tiêu: tự đọc được `DISTINCT`, `IN`, `BETWEEN`, `CASE`, subquery, `EXISTS`/`NOT EXISTS` và CTE (`WITH`). Không học thuộc tên lệnh: luôn hỏi "query này giữ những dòng nào, một dòng kết quả đại diện cho gì?".

Lesson 01 cho bạn `SELECT`/`WHERE`; Lesson 02 cho bạn JOIN và cách một dòng bị nhân lên. Lesson này dùng lại hai nền đó. Các bảng dưới đây là **dữ liệu minh họa**, không yêu cầu bạn tạo thêm bảng trong `shopcore`.

## Tài liệu / video

- [PostgreSQL: SELECT và DISTINCT](https://www.postgresql.org/docs/current/sql-select.html) - xem phần `DISTINCT` sau mục 2.
- [PostgreSQL: IN và NOT IN](https://www.postgresql.org/docs/current/functions-comparisons.html) - xem lưu ý về `NULL` sau mục 3.
- [PostgreSQL: BETWEEN](https://www.postgresql.org/docs/current/functions-comparison.html) - xem sau mục 4.
- [PostgreSQL: CASE](https://www.postgresql.org/docs/current/functions-conditional.html) - xem sau mục 5.
- [PostgreSQL: EXISTS và subquery](https://www.postgresql.org/docs/current/functions-subquery.html) - xem sau mục 7.
- [PostgreSQL: WITH/CTE](https://www.postgresql.org/docs/current/queries-with.html) - xem sau mục 8.
- Video nếu cần: tìm `SQL EXISTS vs JOIN rows visualized` hoặc `PostgreSQL CTE WITH beginner`; ưu tiên video vẽ từng dòng kết quả.

## 1. Bộ dữ liệu xuyên suốt

**categories**

| id | name |
|---:|---|
| 1 | Bàn phím |
| 2 | Chuột |
| 3 | Tai nghe |
| 4 | Giá đỡ |

**products**

| id | name | price | category_id |
|---:|---|---:|---:|
| 10 | K1 | 1500 | 1 |
| 11 | K2 | 800 | 1 |
| 12 | M1 | 300 | 2 |
| 13 | M2 | 300 | 2 |
| 14 | H1 | 1200 | 3 |
| 15 | Chưa phân loại | 200 | NULL |

**order_items** - chỉ dùng khi hỏi Product đã được đặt hay chưa:

| id | product_id |
|---:|---:|
| 100 | 10 |
| 101 | 10 |
| 102 | 12 |
| 103 | 13 |

K1 có **hai item**. Giá đỡ không có Product. Product 15 chưa có Category. Nếu không có `ORDER BY`, SQL không hứa thứ tự dòng; các ví dụ có thứ tự đều ghi rõ `ORDER BY`.

## 2. `DISTINCT`: bỏ dòng kết quả trùng nhau

```sql
SELECT DISTINCT category_id
FROM products
ORDER BY category_id NULLS LAST;
```

| category_id |
|---:|
| 1 |
| 2 |
| 3 |
| NULL |

Có 6 Product nhưng chỉ có 4 **giá trị kết quả khác nhau** ở cột được chọn. Nhiều `NULL` cũng chỉ còn một dòng trong kết quả `DISTINCT`. `DISTINCT` áp dụng lên **cả bộ cột được SELECT**, không chỉ cột đầu:

```sql
SELECT DISTINCT id, category_id
FROM products;
```

Ở đây `id` khác nhau giữa 6 Product, nên vẫn có **6 dòng**. `DISTINCT` không sửa bảng gốc và **không phải** cách chữa một JOIN bị nhân dòng sai; trước tiên cần xem bạn JOIN theo khóa nào.

## 3. `IN`: một giá trị thuộc tập lựa chọn?

```sql
SELECT id, name
FROM products
WHERE category_id IN (1, 3)
ORDER BY id;
```

Đọc: "Category của Product là 1 **hoặc** 3". Kết quả: `(10,K1)`, `(11,K2)`, `(14,H1)`. Product 15 có `category_id = NULL` nên không được giữ.

`IN (1, 3)` gần như viết `category_id = 1 OR category_id = 3`. Nhưng **đừng suy ra** `NOT IN` luôn là cách dễ tìm dữ liệu chưa liên kết: `NULL` trong tập so sánh có thể khiến kết quả trở thành UNKNOWN và `WHERE` loại dòng. Khi cần hỏi "không có dòng liên quan", thường diễn đạt rõ hơn bằng `NOT EXISTS` ở mục 7.

## 4. `BETWEEN`: khoảng có tính cả hai đầu

```sql
SELECT id, name, price
FROM products
WHERE price BETWEEN 300 AND 800
ORDER BY id;
```

Tương đương `price >= 300 AND price <= 800`. Kết quả: K2 (800), M1 (300), M2 (300). K1 (1500), H1 (1200), Product 15 (200) không qua điều kiện.

**Sai lầm dễ gặp:** nghĩ 300 và 800 bị loại. Với `BETWEEN`, cả 300 lẫn 800 đều **được tính**. Với khoảng thời gian kiểu timestamp, cần cẩn thận ranh giới ngày/giờ; bài này chỉ xét số.

## 5. `CASE`: tạo giá trị theo điều kiện, không tự lọc dòng

Bạn muốn gắn nhãn mức giá cho từng Product:

```sql
SELECT id, name, price,
       CASE
           WHEN price >= 1000 THEN 'Cao'
           WHEN price >= 300 THEN 'Vua'
           ELSE 'Thap'
       END AS price_level
FROM products
ORDER BY id;
```

| id | name | price_level |
|---:|---|---|
| 10 | K1 | Cao |
| 11 | K2 | Vua |
| 12 | M1 | Vua |
| 13 | M2 | Vua |
| 14 | H1 | Cao |
| 15 | Chưa phân loại | Thap |

`CASE` kiểm tra `WHEN` theo thứ tự và lấy nhánh đầu tiên TRUE. K1 đạt cả `>= 1000` và `>= 300` nhưng nhận **Cao**, vì điều kiện đầu đúng trước. `AS price_level` đặt tên cột output; không thêm cột thật vào bảng.

`CASE` nằm trong `SELECT` nên **vẫn có 6 dòng**. Muốn bỏ dòng, dùng `WHERE`. Nếu không có `ELSE` và không nhánh nào đúng, `CASE` trả `NULL`.

## 6. Subquery: dùng kết quả query nhỏ trong query lớn

Bạn muốn Product thuộc Category tên "Chuột". `products` chỉ lưu `category_id`, không lưu tên Category. Ta có thể hỏi Category trước:

```sql
SELECT c.id
FROM categories c
WHERE c.name = 'Chuột';
```

Query nhỏ trả **một cột**, giá trị `2`. Đặt nó vào `IN (...)` của query lớn:

```sql
SELECT p.id, p.name
FROM products p
WHERE p.category_id IN (
    SELECT c.id
    FROM categories c
    WHERE c.name = 'Chuột'
)
ORDER BY p.id;
```

Kết quả `(12,M1)`, `(13,M2)`. Phần `SELECT` trong ngoặc là **subquery**. Ví dụ này cũng có thể viết bằng JOIN; không có quy tắc "subquery luôn nhanh hơn JOIN". Ở Lesson 05 ta mới đo plan, còn bây giờ chọn cách diễn đạt dễ hiểu.

## 7. `EXISTS`: hỏi "có ít nhất một dòng liên quan không?"

Lesson 02: `categories JOIN products` làm Bàn phím lặp hai lần vì có K1 và K2. Nếu yêu cầu chỉ là **liệt kê Category có ít nhất một Product**, ta không cần liệt kê từng cặp ghép:

```sql
SELECT c.id, c.name
FROM categories c
WHERE EXISTS (
    SELECT 1
    FROM products p
    WHERE p.category_id = c.id
)
ORDER BY c.id;
```

Đọc chậm: với từng Category `c`, hỏi query bên trong "có dòng Product `p` nào mà `p.category_id = c.id` không?" Nếu có ít nhất một dòng, giữ `c`; không có thì bỏ. `p.category_id = c.id` là **liên hệ** giữa query con và query ngoài. `SELECT 1` là cách viết quen thuộc vì `EXISTS` chỉ quan tâm có dòng hay không, không quan tâm giá trị `1`.

| c.id | c.name | Có Product khớp? | Giữ? |
|---:|---|---|---|
| 1 | Bàn phím | K1, K2 | Có, **một dòng Category** |
| 2 | Chuột | M1, M2 | Có, một dòng |
| 3 | Tai nghe | H1 | Có, một dòng |
| 4 | Giá đỡ | Không có | Không |

Kết quả có **3 dòng Category**. `EXISTS` không đưa các dòng `products` vào output, nên việc có 2 Product khớp không làm Bàn phím xuất hiện 2 lần. Đây là khác biệt về **ý nghĩa query** so với JOIN liệt kê cặp dòng; không khẳng định một cách luôn nhanh hơn.

Đổi thành **Category không có Product**:

```sql
SELECT c.id, c.name
FROM categories c
WHERE NOT EXISTS (
    SELECT 1
    FROM products p
    WHERE p.category_id = c.id
);
```

Kết quả: `(4, Giá đỡ)`. Nó cùng ý nghĩa với `LEFT JOIN products ... WHERE p.id IS NULL` bạn làm ở Lesson 02.

Muốn Product **chưa từng được đặt**, dùng cùng kiểu suy nghĩ nhưng đổi cặp bảng thành `products p` và `order_items oi`, rồi liên hệ `oi.product_id = p.id`. Với dữ liệu này, những Product đó là K2, H1 và Chưa phân loại. Bạn sẽ tự viết query ở phần ôn; không cần thêm `COUNT`.

## 8. CTE (`WITH`): đặt tên cho một bước của query

Ví dụ: bước 1 chọn Product giá từ 800, bước 2 lấy tên Category của chúng.

```sql
WITH selected_products AS (
    SELECT id, name, category_id, price
    FROM products
    WHERE price >= 800
)
SELECT sp.name AS product, c.name AS category
FROM selected_products sp
LEFT JOIN categories c ON c.id = sp.category_id
ORDER BY sp.id;
```

1. `selected_products` gồm Product 10 K1, 11 K2, 14 H1.
2. Query ngoài đọc tập đó như một nguồn dữ liệu, alias là `sp`.
3. `LEFT JOIN` lấy tên Category; ở đây cả ba Product đều có Category.

| product | category |
|---|---|
| K1 | Bàn phím |
| K2 | Bàn phím |
| H1 | Tai nghe |

CTE giúp chia một query thành các bước có tên dễ hiểu. Tên `selected_products` chỉ có trong **câu SQL này**; không phải bảng lưu vĩnh viễn. Cũng đừng mặc định PostgreSQL luôn tạo một bảng tạm vật lý cho CTE: cách chạy thực tế tùy query và optimizer; kiểm tra bằng `EXPLAIN` ở Lesson 05.

Nếu query ngắn, không cần ép dùng CTE. Dùng khi nó làm rõ ý nghĩa bước trung gian hoặc bạn cần tham chiếu bước đó trong query lớn.

## 9. Chọn công cụ trong một câu

| Bạn muốn hỏi | Dùng gì? |
|---|---|
| Một cột kết quả có nhiều giá trị giống nhau, chỉ muốn mỗi giá trị một lần | `DISTINCT` |
| Giá trị thuộc một danh sách | `IN` |
| Giá nằm trong khoảng gồm cả hai đầu | `BETWEEN` |
| Giữ dòng và gắn thêm nhãn tùy điều kiện | `CASE` trong `SELECT` |
| Dùng kết quả query nhỏ làm điều kiện | Subquery |
| Chỉ cần biết có/không có dòng liên quan, không muốn nhân dòng | `EXISTS` / `NOT EXISTS` |
| Muốn đặt tên cho một bước trung gian | CTE `WITH` |

Đừng dùng `DISTINCT` để giấu việc JOIN sai khóa. Với dữ liệu cho báo cáo hoặc AI, sai đơn vị của một dòng sẽ khiến đếm/tổng hợp sai ở Lesson 04.

## 10. Tự kiểm tra trước khi thi

1. Vì sao `SELECT DISTINCT category_id` có ít dòng hơn `SELECT DISTINCT id, category_id`?
2. `BETWEEN 300 AND 800` có giữ Product giá đúng 300 hoặc 800 không?
3. `CASE` trong `SELECT` có làm giảm số dòng không?
4. Bàn phím có 2 Product. Vì sao query `EXISTS` ở mục 7 chỉ trả một dòng Bàn phím?
5. Trong `p.category_id = c.id` ở subquery `EXISTS`, `c.id` lấy từ đâu?
6. `WITH selected_products AS (...)` có tạo bảng vĩnh viễn không?

Sau khi tự trả lời, làm [bài kiểm tra Lesson 03](../../Exams/de-kiem-tra/M2-1-sql-index__2026-10-01__lesson3-lan1.md). Đề có bảng dữ liệu riêng; bạn được giải thích bằng lời khi chưa nhớ cú pháp, nhưng câu yêu cầu viết query vẫn cần thể hiện đúng điều kiện.
