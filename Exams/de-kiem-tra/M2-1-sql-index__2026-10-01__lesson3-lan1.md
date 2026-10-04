# Bài kiểm tra M2-1 - Lesson 03: Mẫu truy vấn, subquery và CTE

> 7 câu, tổng 40 điểm thô. Chấm theo ý nghĩa; không trừ lỗi gõ phím nhỏ nếu query định viết vẫn rõ. Nếu nói `chấm thử`, chỉ chấm các câu đã làm. Không mở file `__DAPAN.md` trước khi làm.

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

| id | product_id |
|---:|---:|
| 100 | 10 |
| 101 | 10 |
| 102 | 12 |
| 103 | 13 |

Không có `ORDER BY` thì **không chấm thứ tự dòng**, chỉ chấm tập dòng/ý nghĩa.

## Câu 1 - `DISTINCT` (5đ)

So sánh hai query sau: mỗi query trả bao nhiêu dòng, những giá trị nào xuất hiện ở kết quả A? Vì sao B không còn ít dòng dù có `DISTINCT`?

```sql
-- A
SELECT DISTINCT category_id FROM products;

-- B
SELECT DISTINCT id, category_id FROM products;
```

**Trả lời:**
A sẽ rả dc 4 dòng là sẽ ra được là 1 2 3 NULL
B sẽ ra được 6 dòng vì DISTINCT là loại bỏ row trùng mà cái này là kết hợp của id và category_id nên là 6 row , k row nào trùng row nào 
 10 | K1 | 1500 | 1 |
| 11 | K2 | 800 | 1 |
| 12 | M1 | 300 | 2 |
| 13 | M2 | 300 | 2 |
| 14 | H1 | 1200 | 3 |
| 15 | Chưa phân loại | 200 | NULL |
chỉ lấy id và category_id dùm tôi 

---

## Câu 2 - `IN` và `BETWEEN` (5đ)

Với query sau, hãy liệt kê `(id, name)` được trả về và giải thích Product có `category_id = NULL` có qua điều kiện không. Giá đúng `800` và `1500` có được tính không?

```sql
SELECT id, name
FROM products
WHERE category_id IN (1, 3)
  AND price BETWEEN 800 AND 1500;
```

**Trả lời:**

(14,H1), (10,K1) ,(11,K2) và Product có category_id = NULL điều kiện không qua , giá đúng 800 và 1500 thì được tính vì BETTWEEN là có lấy dấu = nữa
---

## Câu 3 - `CASE` (5đ)

Query sau trả bao nhiêu dòng? Cho biết nhãn `price_level` của Product id 10, 11, 12 và 15. Vì sao id 10 không nhận nhãn `Vua` dù `1500 >= 300`?

```sql
SELECT id, name,
       CASE
           WHEN price >= 1000 THEN 'Cao'
           WHEN price >= 300 THEN 'Vua'
           ELSE 'Thap'
       END AS price_level
FROM products;
```

**Trả lời:**
vì nó hoạt động theo tôi nghĩ là từ trên xuống dưới , vì nó thoã mãn điều kiện  WHEN price >= 1000 THEN 'Cao' trước r nên là ở id 10 nó sẽ dc gắn là Cao xong qua id khác
nhãn price_level của product là id 10 → Cao
id 11 → Vua
id 12 → Vua
id 15 → Thap
---

## Câu 4 - Subquery trong `IN` (6đ)

Viết query lấy `id`, `name` của Product thuộc Category có `name = 'Chuột'`. **Yêu cầu dùng subquery trong `IN`**: query con đọc `categories.id`, query ngoài đọc `products`. Query con trả giá trị gì với bảng trên, và query ngoài trả Product nào?

**Trả lời:**
SELECT id , name
FROM Products
WHERE p.category_id IN(
  SELECT c.id
  FROM categories c
  WHERE c.name = 'Chuột'
)
;
Query con trả về giá trị là  2 |
Query ngoài trả về product có categỏry_id = 2 

| 12 | M1 | 300 | 2 |
| 13 | M2 | 300 | 2 | trả về id và name th nha ( tôi lười bỏ collum )
---

## Câu 5 - `EXISTS` và JOIN (7đ)

Viết query lấy `id`, `name` của các Category **có ít nhất một Product**, dùng `EXISTS` và liên hệ `products.category_id` với `categories.id`. Liệt kê Category được trả về. Vì sao Bàn phím chỉ có **một dòng** mặc dù nó có hai Product? Nếu đổi thành `INNER JOIN products` để liệt kê cặp dòng thì chuyện gì xảy ra?

**Trả lời:**

---
SELECT c.id,c.name
FROM Categories c
WHERE EXISTS(
  SELECT 1
  FROM Products p
  WHERE c.id = p.category_id
);
Nó chỉ đưa ra True Fal cho từng Product , nếu mà Exists true thì nó sẽ in ra rồi nếu gpawj lại trong subquerry thì vì nó đã được là true r nên là nó vẫn chỉ có in 1 dòng
nếu đổi thnahf INNEr JOIN Prodcuts thì nó sẽ Bàn phím | K1
Bàn phím | K2


## Câu 6 - `NOT EXISTS` (6đ)

Viết query lấy `id`, `name` của Category **không có Product**, dùng `NOT EXISTS`. Category nào được trả về? Product 15 có `category_id = NULL` có khiến một Category nào đó được xem là có Product không? Giải thích ngắn.

**Trả lời:**

---
SELECT c.id,c.name
FROM Categories c
WHERE NOT EXISTS(
  SELECT 1
  FROM Products p
  WHERE c.id = p.category_id
);
theo tôi nghĩ là khi so sánh NOT EXISTS thì có nghĩa là nếu là TRUE thì sẽ không tìm , mà chỉ tìm FALSE thôi đúng k , vì nó so c.id = p.category_id nên là ra TRUE hoặc FALSE nhưng mà nếu category_id = NULL thì sẽ ra được UNKNOWN thì vẫn không được xem 1 cateogry nào đó được xem là có product

## Câu 7 - CTE (`WITH`) (6đ)

Đọc query này, không cần viết query mới:

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

1. `selected_products` gồm những Product nào?
2. Liệt kê các cặp `(product, category)` của kết quả cuối.
3. `selected_products` có phải bảng vĩnh viễn trong database không? `sp` là gì?

**Trả lời:**
| 10 | K1 | 1500 | 1 |
| 11 | K2 | 800 | 1 |
| 14 | H1 | 1200 | 3 |
Selected_products gồm những những cột là id, name, category_id, price của bảng products sao mà price >= 800
(K1,Bàn phím) , ( K2,Bàn phím) , (H1,tai nghe)
không hpari là bảng vĩnh viễn , nó chỉ là bảng trung gian tạm thời thôi dùng đeer mục đích là query tới những bản có quy định mà mình đặt điều kiện á , theo kịnh nghiệm của tôi là vậy , sp là selected_products rồi gắn là sp thôi