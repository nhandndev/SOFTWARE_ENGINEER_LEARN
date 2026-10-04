# M2-1 - Lesson 04: Tổng hợp dữ liệu và giữ đúng đơn vị của một dòng

> Mục tiêu: đọc được `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`, `HAVING` và window function cơ bản. Trước mỗi phép tính, phải trả lời: **một dòng đầu vào đang là Product hay OrderItem?**

Lesson 02 cho thấy JOIN có thể làm tên lặp; Lesson 03 cho thấy `EXISTS` kiểm tra sự tồn tại mà không nhân dòng. Bây giờ ta **đếm và tính tổng**. Nếu đếm nhầm đơn vị, query có thể chạy đúng cú pháp mà báo cáo vẫn sai.

## Tài liệu / video

- [PostgreSQL: Aggregate Functions](https://www.postgresql.org/docs/current/tutorial-agg.html) - đọc sau mục 4, nhất là `WHERE` và `HAVING`.
- [PostgreSQL: Window Functions](https://www.postgresql.org/docs/current/tutorial-window.html) - đọc sau mục 8.
- [PostgreSQL: danh sách aggregate](https://www.postgresql.org/docs/current/functions-aggregate.html) - tra cứu khi cần, không học thuộc hết.
- Video nếu cần: tìm `SQL GROUP BY HAVING visual explanation` hoặc `SQL window function PARTITION BY beginner`; ưu tiên video vẽ bảng input và output.

## 1. Bộ dữ liệu của bài

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

**order_items**

| id | product_id | quantity | unit_price |
|---:|---:|---:|---:|
| 100 | 10 | 2 | 1500 |
| 101 | 10 | 1 | 1500 |
| 102 | 12 | 3 | 300 |
| 103 | 13 | 1 | 300 |

Giá trong `order_items.unit_price` là giá của item ở thời điểm được ghi lại; ở ví dụ này nó trùng `products.price`. Khi tính doanh thu của item, dùng `quantity * unit_price`, không lấy số lượng nhân với giá Product hiện tại nếu sau này giá Product có thể đổi.

## 2. Aggregate: nhiều dòng đầu vào -> một giá trị

```sql
SELECT COUNT(*) AS product_rows,
       COUNT(category_id) AS categorized_products,
       SUM(price) AS total_price,
       MIN(price) AS lowest_price,
       MAX(price) AS highest_price
FROM products;
```

| product_rows | categorized_products | total_price | lowest_price | highest_price |
|---:|---:|---:|---:|---:|
| 6 | 5 | 4300 | 200 | 1500 |

- `COUNT(*)` đếm **mọi dòng** Product, kể cả Product 15.
- `COUNT(category_id)` chỉ đếm dòng mà `category_id` **khác NULL**: 5.
- `SUM(price)` cộng 6 giá: `1500 + 800 + 300 + 300 + 1200 + 200 = 4300`.
- `MIN`/`MAX` lấy giá nhỏ nhất/lớn nhất. `AVG(price)` là trung bình của các giá **khác NULL**; chưa cần thuộc số thập phân cụ thể.

Với `SUM`, `AVG`, `MIN`, `MAX`, giá trị `NULL` thường bị bỏ qua. Nếu **không có dòng đầu vào**, `COUNT(*)` trả `0`, còn `SUM(...)` trả `NULL` (không phải `0`).

## 3. `GROUP BY`: nhiều dòng -> một dòng cho mỗi nhóm

Muốn đếm Product theo `category_id`:

```sql
SELECT category_id, COUNT(*) AS product_count
FROM products
GROUP BY category_id
ORDER BY category_id NULLS LAST;
```

| category_id | product_count |
|---:|---:|
| 1 | 2 |
| 2 | 2 |
| 3 | 1 |
| NULL | 1 |

Đọc từng bước: tách 6 Product thành các nhóm có cùng `category_id`; trong **mỗi nhóm**, đếm số dòng. Kết quả có **4 dòng nhóm**, không còn 6 dòng Product. Các Product có `category_id = NULL` nằm chung một nhóm NULL nếu có nhiều dòng như vậy.

Category 4 Giá đỡ **không xuất hiện**: không có Product nào mang `category_id = 4`. Nếu cần hiện cả Category rỗng, phải bắt đầu từ `categories` rồi `LEFT JOIN products` ở mục 5.

Trong query có `GROUP BY category_id`, không thể tùy tiện `SELECT name` của Product vì một nhóm có thể chứa K1 **và** K2. Hãy chọn cột nhóm hoặc một phép aggregate như `COUNT(*)`/`MAX(price)`; muốn giữ từng Product thì xem window function ở mục 8.

## 4. `WHERE` trước nhóm, `HAVING` sau nhóm

```sql
SELECT category_id, COUNT(*) AS product_count
FROM products
WHERE price >= 800
GROUP BY category_id
HAVING COUNT(*) >= 2
ORDER BY category_id;
```

1. `WHERE` chọn **dòng Product đầu vào**: K1 (1500), K2 (800), H1 (1200).
2. `GROUP BY`: category 1 có 2 Product; category 3 có 1.
3. `HAVING` chọn **nhóm** có ít nhất 2 dòng: chỉ category 1.
4. Kết quả: `(1, 2)`.

`WHERE COUNT(*) >= 2` không đúng ở cùng cấp query: tại bước `WHERE`, nhóm chưa được tạo để đếm. Dùng `HAVING COUNT(*) >= 2`. Ngược lại, điều kiện trên **từng giá Product** như `price >= 800` nên đặt ở `WHERE` nếu bạn muốn bỏ Product trước khi tính nhóm.

Đây là **thứ tự suy luận kết quả**, không khẳng định PostgreSQL luôn thực thi vật lý từng bước đúng thứ tự này. Lesson 05 sẽ xem query plan.

## 5. `LEFT JOIN` với `COUNT(*)` và `COUNT(p.id)`

Muốn mọi Category đều hiện, kể cả Giá đỡ:

```sql
SELECT c.id, c.name,
       COUNT(*) AS joined_rows,
       COUNT(p.id) AS product_count
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name
ORDER BY c.id;
```

| c.id | c.name | joined_rows | product_count |
|---:|---|---:|---:|
| 1 | Bàn phím | 2 | 2 |
| 2 | Chuột | 2 | 2 |
| 3 | Tai nghe | 1 | 1 |
| 4 | Giá đỡ | 1 | 0 |

Giá đỡ không có Product nhưng `LEFT JOIN` vẫn tạo **một dòng kết quả** với các cột `p` là NULL. `COUNT(*)` đếm dòng đó thành 1; `COUNT(p.id)` bỏ qua NULL thành 0. `p.id` là khóa không NULL của Product thật, nên phù hợp để đếm Product đã ghép.

`c.id` được đưa vào `GROUP BY` để mỗi Category có nhóm riêng, kể cả nếu hai Category tình cờ trùng tên.

## 6. `SUM` trên nhóm rỗng và `COALESCE`

```sql
SELECT c.id, c.name,
       SUM(p.price) AS raw_total,
       COALESCE(SUM(p.price), 0) AS display_total
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name
ORDER BY c.id;
```

| category | raw_total | display_total |
|---|---:|---:|
| Bàn phím | 2300 | 2300 |
| Chuột | 600 | 600 |
| Tai nghe | 1200 | 1200 |
| Giá đỡ | NULL | 0 |

Với Giá đỡ, `p.price` của dòng LEFT JOIN là NULL, không có giá nào để cộng nên `SUM` trả NULL. `COALESCE(value, 0)` lấy `value` nếu không NULL, nếu NULL thì lấy `0`. Chọn 0 cho **cách hiển thị báo cáo** khi bạn thật sự muốn diễn giải "chưa có Product" là tổng bằng 0; đừng tùy tiện biến mọi dữ liệu thiếu thành 0 trong phân tích.

Đây là **tổng giá niêm yết các Product trong Category**, **không phải doanh thu**. Doanh thu cần bắt đầu từ `order_items`, dùng `quantity * unit_price`, rồi mới JOIN đến Product/Category. Cùng một con số `SUM` nhưng ý nghĩa phụ thuộc dòng đầu vào là gì.

## 7. JOIN có thể làm báo cáo "đúng số nhưng sai ý"

```sql
SELECT c.name,
       COUNT(*) AS item_rows,
       COUNT(DISTINCT p.id) AS ordered_products
FROM categories c
JOIN products p ON p.category_id = c.id
JOIN order_items oi ON oi.product_id = p.id
GROUP BY c.id, c.name
ORDER BY c.id;
```

| c.name | item_rows | ordered_products |
|---|---:|---:|
| Bàn phím | 2 | 1 |
| Chuột | 2 | 2 |

**Vì sao?** Bàn phím có K1 (2 order item) và K2 (0 item). INNER JOIN đến `order_items` tạo **2 dòng K1**, không còn dòng K2. Vì vậy `COUNT(*) = 2` là số **item rows**, còn `COUNT(DISTINCT p.id) = 1` là số **Product đã có item**. Không cái nào là "tất cả Product của Bàn phím" (số đó là 2 ở mục 5). Tai nghe cũng biến mất vì H1 chưa có item.

Đừng chỉ thêm `DISTINCT` để làm báo cáo trông hợp lý. Trước khi aggregate, viết một câu: **"một dòng sau JOIN là gì?"** Nếu cần số Product toàn Category và doanh thu từ item trong cùng báo cáo, thường tính chúng ở hai bước riêng rồi ghép kết quả theo Category.

## 8. Window function: tính theo nhóm nhưng vẫn giữ từng dòng

`GROUP BY` ở mục 3 gộp 6 Product thành 4 dòng nhóm. Nếu vẫn muốn thấy **mỗi Product** kèm tổng giá trong Category của nó:

```sql
SELECT id, name, category_id, price,
       SUM(price) OVER (PARTITION BY category_id) AS category_total
FROM products
ORDER BY id;
```

| id | name | category_id | price | category_total |
|---:|---|---:|---:|---:|
| 10 | K1 | 1 | 1500 | 2300 |
| 11 | K2 | 1 | 800 | 2300 |
| 12 | M1 | 2 | 300 | 600 |
| 13 | M2 | 2 | 300 | 600 |
| 14 | H1 | 3 | 1200 | 1200 |
| 15 | Chưa phân loại | NULL | 200 | 200 |

`PARTITION BY category_id` chia Product thành các tập cùng Category. `SUM(price)` tính trong tập của dòng hiện tại; `OVER (...)` biến nó thành window function nên **không gộp mất dòng Product**. Không có `ORDER BY` **bên trong** `OVER`, nên đây là tổng của toàn bộ tập Category, không phải tổng cộng dồn từng dòng.

`WHERE` vẫn lọc dòng **trước khi** window function chạy. Nếu bạn lọc chỉ các Product giá từ 800, tổng mỗi Category sẽ dựa trên **các dòng còn lại**, không phải toàn bộ bảng.

### Xếp thứ tự Product trong mỗi Category

```sql
SELECT id, name, category_id, price,
       ROW_NUMBER() OVER (
           PARTITION BY category_id
           ORDER BY price DESC, id ASC
       ) AS position_in_category
FROM products
ORDER BY category_id NULLS LAST, position_in_category;
```

- Category 1: K1 `1`, K2 `2`.
- Category 2: M1 `1`, M2 `2` (đồng giá 300, `id ASC` phân định).
- Category 3: H1 `1`.
- Nhóm `category_id = NULL`: Chưa phân loại `1`.

`ORDER BY` **bên trong** `OVER` quyết định cách đánh số; `ORDER BY` cuối query chỉ quyết định **thứ tự hiển thị** các dòng. `ROW_NUMBER()` luôn gán số thứ tự từng dòng; các hàm `RANK`/`DENSE_RANK` xử lý đồng hạng khác đi, chưa cần học ở bài này.

## 9. Cách tự debug một query báo cáo

1. Bỏ aggregate, chạy thử phần `FROM`/`JOIN`/`WHERE` và nhìn **từng dòng**.
2. Nói một dòng là Product, Category hay OrderItem; đếm xem JOIN có nhân dòng không.
3. Quyết định bạn muốn đếm **dòng**, **giá trị khác NULL**, hay **Product khác nhau**: `COUNT(*)`, `COUNT(p.id)` hoặc `COUNT(DISTINCT p.id)`.
4. Nếu cần một dòng mỗi nhóm, dùng `GROUP BY`; nếu cần giữ từng dòng, xem `OVER (PARTITION BY ...)`.
5. Chỉ sau đó mới thêm `HAVING`, sắp xếp, và đối chiếu số nhỏ bằng tay.

## 10. Tự kiểm tra

1. Vì sao `COUNT(*)` trên `products` là 6 nhưng `COUNT(category_id)` là 5?
2. `GROUP BY category_id` cho mấy dòng và có Category Giá đỡ không?
3. `WHERE` và `HAVING` khác nhau ở **thứ được lọc** như thế nào?
4. Vì sao ở Giá đỡ `COUNT(*) = 1` nhưng `COUNT(p.id) = 0`?
5. Vì sao `SUM(p.price)` của Giá đỡ là NULL, còn `COALESCE(SUM(p.price),0)` là 0?
6. Sau JOIN ba bảng, Bàn phím có 2 item rows nhưng chỉ 1 Product đã được đặt. Vì sao?
7. `SUM(price) OVER (PARTITION BY category_id)` có làm mất dòng K1/K2 không?

Sau khi tự trả lời, làm [bài kiểm tra Lesson 04](../../Exams/de-kiem-tra/M2-1-sql-index__2026-10-03__lesson4-lan1.md). Đề tự chứa bảng dữ liệu; đáp án ở file riêng. Không đánh dấu M2-1 hoàn thành chỉ vì đạt một lesson.
