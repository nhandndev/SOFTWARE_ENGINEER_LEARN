# Bài kiểm tra M2-1 - Lesson 04: Aggregate, GROUP BY, HAVING, Window

> 8 câu, tổng 40 điểm thô. Có thể giải thích bằng lời khi đề hỏi ý nghĩa. Câu yêu cầu viết query vẫn cần thể hiện đúng ý truy vấn. Nếu nói `chấm thử`, chỉ chấm câu đã làm. Không mở file `__DAPAN.md` trước khi làm.

**Dữ liệu dùng chung cho cả đề:**

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

Không có `ORDER BY` thì không chấm thứ tự dòng. Luôn nói rõ bạn đang đếm Product, Category hay OrderItem.

## Câu 1 - Aggregate một bảng (5đ)

Với bảng `products`, cho biết giá trị của `COUNT(*)`, `COUNT(category_id)`, `SUM(price)`, `MIN(price)` và `MAX(price)`. Giải thích vì sao hai phép `COUNT` khác nhau.

**Trả lời:**
SELECT
COUNT(*) là 6
COUNT(category_id) là 5 ( khác nhau là vì k tính null của category_id)
SUM price là tổng mấy cía price dùm tôi
MIN là 300
MAX là 1500

---

## Câu 2 - `GROUP BY` (5đ)

Query sau trả những cặp `(category_id, product_count)` nào? Có Category `Giá đỡ` không? Product 15 thuộc nhóm nào?

```sql
SELECT category_id, COUNT(*) AS product_count
FROM products
GROUP BY category_id
ORDER BY category_id NULLS LAST;
```

**Trả lời:**

---
(1,2),(2,2),(3,1)
 không có category giá đỡ vì product khong ốc category_id đó , product 15 không thuộc nhóm nào 

## Câu 3 - `WHERE` và `HAVING` (5đ)

Query sau trả gì? Kể từng bước: `WHERE` giữ Product nào, `GROUP BY` tạo nhóm nào, `HAVING` giữ nhóm nào. Có thể thay `HAVING COUNT(*) >= 2` bằng `WHERE COUNT(*) >= 2` ở cùng cấp query không, vì sao?

```sql
SELECT category_id, COUNT(*) AS product_count
FROM products
WHERE price >= 800
GROUP BY category_id
HAVING COUNT(*) >= 2;
```

**Trả lời:**

---
WHERE price >= 800 giữ lại:
K1 | 1500 | category 1
K2 | 800  | category 1
H1 | 1200 | category 3

Sau đó GROUP BY category_id chia thành:
category 1:
K1
K2

category 3:
H1

Rồi COUNT(*) đếm từng group:
category 1 → 2
category 3 → 1

Cuối cùng:
HAVING COUNT(*) >= 2

chỉ giữ group có count từ 2 trở lên.
Nên kết quả cuối là:
category_id | product_count
1           | 2
Không thể thay `HAVING COUNT(*) >= 2` bằng `WHERE COUNT(*) >= 2` ở cùng cấp query vì là HAVING COUNT là filter sau khi tạo bảng xong , còn WHERE là lọc row trước khi gộp bảng nên là bị sai


## Câu 4 - Đếm sau `LEFT JOIN` (6đ)

```sql
SELECT c.id, c.name,
       COUNT(*) AS joined_rows,
       COUNT(p.id) AS product_count
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name
ORDER BY c.id;
```

Ghi `(category, joined_rows, product_count)` cho cả bốn Category. Giải thích riêng vì sao Giá đỡ có hai con số khác nhau.

**Trả lời:**
id | name     | joined_rows | product_count
---+----------+-------------+--------------
1  | Bàn phím | 2           | 2
2  | Chuột    | 2           | 2
3  | Tai nghe | 1           | 1
4  | Giá đỡ   | 1           | 0

vì giá đỡ product_count là null  , trong bảng product id của giá đỡ là null k có ở trong products
---

## Câu 5 - `SUM` và `COALESCE` (4đ)

Với query sau, `raw_total` và `display_total` của **Bàn phím** và **Giá đỡ** là gì? Đây có phải doanh thu bán hàng không, vì sao?

```sql
SELECT c.name,
       SUM(p.price) AS raw_total,
       COALESCE(SUM(p.price), 0) AS display_total
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name;
```

**Trả lời:**
Bàn phím:
raw_total = 2300
display_total = 2300

Giá đỡ:
raw_total = NULL
display_total = 0
à đây không phải doanh thu bán hàng.
Vì query này đang cộng:
SUM(p.price)

tức là cộng giá niêm yết của Product trong Category.
Doanh thu phải dựa vào order_items, dùng:
quantity * unit_price
---

## Câu 6 - JOIN nhân dòng trước khi đếm (6đ)

```sql
SELECT c.name,
       COUNT(*) AS item_rows,
       COUNT(DISTINCT p.id) AS ordered_products
FROM categories c
JOIN products p ON p.category_id = c.id
JOIN order_items oi ON oi.product_id = p.id
GROUP BY c.id, c.name;
```

Ghi hai con số cho Bàn phím và Chuột. Vì sao K1 có thể làm `item_rows` tăng hơn `ordered_products`? `ordered_products` có phải **tổng mọi Product** trong Category không? Nói rõ trường hợp K2.

**Trả lời:**

---item_rows = 2
ordered_products = 1

Chuột:
item_rows = 2
ordered_products = 2

Vì K1 có 2 order_items, nên sau JOIN K1 xuất hiện 2 dòng → COUNT(*) = 2. Nhưng COUNT(DISTINCT p.id) chỉ đếm Product khác nhau, K1 vẫn chỉ là 1 Product.    Markdown đã dán (1)
ordered_products không phải tổng tất cả Product trong Category, mà chỉ là số Product có xuất hiện trong order_items. K2 thuộc Bàn phím nhưng không có order item nên bị INNER JOIN loại ra, vì vậy không được tính.


## Câu 7 - Window giữ dòng (5đ)

```sql
SELECT id, name, category_id, price,
       SUM(price) OVER (PARTITION BY category_id) AS category_total
FROM products
WHERE category_id IN (1, 2)
ORDER BY id;
```

Query trả bao nhiêu dòng? Ghi `(name, category_total)` của từng dòng. Vì sao nó không chỉ còn hai dòng như `GROUP BY category_id`? Lưu ý `WHERE` trong query này.

**Trả lời:**
---Query trả 4 dòng:
(K1, 2300)
(K2, 2300)
(M1, 600)
(M2, 600)

Vì WHERE category_id IN (1, 2) lọc trước, nên chỉ còn 4 Product thuộc category 1 và 2. Sau đó SUM(price) OVER (PARTITION BY category_id) tính tổng theo từng category nhưng vẫn giữ từng Product, nên không bị gộp còn 2 dòng như GROUP BY.    Markdown đã dán (1)

## Câu 8 - Xếp thứ tự trong nhóm (4đ)

```sql
SELECT id, name, category_id,
       ROW_NUMBER() OVER (
           PARTITION BY category_id
           ORDER BY price DESC, id ASC
       ) AS position_in_category
FROM products
WHERE category_id IN (1, 2, 3)
ORDER BY category_id, position_in_category;
```

Cho biết `position_in_category` của K1, K2, M1, M2, H1. Vì sao M1 và M2 không cùng vị trí dù đồng giá? `ORDER BY` nằm trong `OVER` có tác dụng gì khác với `ORDER BY` cuối query?

**Trả lời:**
ết quả:
K1 → 1
K2 → 2

M1 → 1
M2 → 2

H1 → 1

Vì PARTITION BY category_id chia Product thành từng nhóm Category riêng. Sau đó:
ORDER BY price DESC, id ASC

ở bên trong OVER(...) quyết định thứ tự để đánh số ROW_NUMBER() trong từng nhóm.    Markdown đã dán (1)
M1 và M2 cùng giá 300, nên xét tiếp:
id ASC

M1 có id = 12, M2 có id = 13, nên:
M1 → 1
M2 → 2

Chúng không cùng vị trí vì ROW_NUMBER() luôn gán số khác nhau cho từng row.
Còn:
ORDER BY category_id, position_in_category

ở cuối query chỉ quyết định thứ tự hiển thị kết quả cuối, không quyết định cách đánh số.    Markdown đã dán (1)
Nhớ ngắn:
ORDER BY trong OVER
→ quyết định đánh số

ORDER BY cuối query