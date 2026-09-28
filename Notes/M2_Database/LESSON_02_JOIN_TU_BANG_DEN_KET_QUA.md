# M2-1 - Lesson 02: Hiểu JOIN bằng cách đếm từng dòng

> Sau bài này, bạn nhìn hai bảng và nói được JOIN trả những dòng nào, vì sao một dòng lặp lại, và vì sao `LEFT JOIN` đôi khi vẫn làm mất dòng.

## Tài liệu / video

- [PostgreSQL: Joins Between Tables](https://www.postgresql.org/docs/current/tutorial-join.html) - đọc sau khi xem ví dụ trong bài.
- [PostgreSQL: JOIN, ON và WHERE](https://www.postgresql.org/docs/current/queries-table-expressions.html) - xem khi học mục 5.
- Video: tìm `SQL JOIN explained with tables` trên YouTube; chọn video hiển thị bảng dữ liệu và kết quả song song.

## 1. Bắt đầu từ dữ liệu, chưa cần nhớ cú pháp

Một category có thể có nhiều product. Product giữ `category_id` để biết nó thuộc category nào.

**categories**

| id | name |
|---:|---|
| 1 | Bàn phím |
| 2 | Chuột |
| 3 | Tai nghe |

**products**

| id | name | category_id |
|---:|---|---:|
| 10 | K1 | 1 |
| 11 | K2 | 1 |
| 12 | M1 | 2 |
| 13 | Chưa phân loại | NULL |

Nhìn vào `category_id`: K1 và K2 thuộc Bàn phím; M1 thuộc Chuột; product 13 chưa có category. Tai nghe chưa có product.

```text
categories.id = 1  <->  products.category_id = 1
      Bàn phím          K1, K2
```

**JOIN là thao tác ghép dòng của hai bảng theo một điều kiện.** Ở đây điều kiện ghép là `p.category_id = c.id`. Một category khớp hai product thì tạo **hai dòng kết quả**. JOIN không tự tạo một object `Category` chứa list Product.

## 2. INNER JOIN: chỉ lấy các cặp ghép được

```sql
SELECT c.name AS category, p.name AS product
FROM categories c
INNER JOIN products p ON p.category_id = c.id
ORDER BY c.id, p.id;
```

Đọc từng phần:

- `FROM categories c`: lấy từng dòng category; `c` là tên viết tắt.
- `JOIN products p`: thử ghép với các dòng product; `p` là tên viết tắt.
- `ON p.category_id = c.id`: chỉ hai dòng có khóa khớp mới được ghép.
- `SELECT`: hiển thị tên category và product của mỗi cặp đã ghép.

Tự đếm: Bàn phím khớp K1 và K2 (2 dòng); Chuột khớp M1 (1 dòng); Tai nghe không khớp ai (0 dòng).

| category | product |
|---|---|
| Bàn phím | K1 |
| Bàn phím | K2 |
| Chuột | M1 |

Vì vậy có **3 dòng**. Product 13 không có `category_id` nên không khớp category nào. `INNER JOIN` không giữ dòng không khớp.

> Mẹo: đọc một INNER JOIN bằng câu “với mỗi dòng ở bảng đầu, tìm các dòng ở bảng sau có khóa khớp”.

## 3. LEFT JOIN: giữ tất cả dòng bên trái

Giờ yêu cầu đổi thành: **hiển thị mọi category, kể cả category chưa có product**.

```sql
SELECT c.name AS category, p.name AS product
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
ORDER BY c.id, p.id;
```

| category | product |
|---|---|
| Bàn phím | K1 |
| Bàn phím | K2 |
| Chuột | M1 |
| Tai nghe | NULL |

`Tai nghe` vẫn có một dòng vì `categories` nằm **bên trái**. Không có product để ghép nên các cột `p` ở dòng đó là `NULL`.

Product 13 **vẫn không có mặt**. LEFT JOIN chỉ cam kết giữ bảng bên trái (`categories`), không phải cả hai bảng.

Nếu yêu cầu là **hiển thị mọi product, kể cả chưa phân loại**, đổi phía:

```sql
SELECT p.name AS product, c.name AS category
FROM products p
LEFT JOIN categories c ON c.id = p.category_id
ORDER BY p.id;
```

Kết quả có 4 product; dòng product 13 là `(Chưa phân loại, NULL)`.

**Quan trọng:** “giữ dòng bên trái” không có nghĩa mỗi dòng bên trái chỉ xuất hiện một lần. Bàn phím vẫn xuất hiện hai lần vì có hai product khớp.

## 4. RIGHT JOIN: giữ bảng bên phải

```sql
FROM products p RIGHT JOIN categories c ON p.category_id = c.id
```

Query này giữ tất cả `categories`, vì `categories` nằm sau `RIGHT JOIN`. Có thể viết lại dễ đọc hơn:

```sql
FROM categories c LEFT JOIN products p ON p.category_id = c.id
```

Hai cách cho cùng các cặp dòng trong ví dụ này. Lúc mới học, chỉ cần hiểu RIGHT là đổi phía được giữ; bạn có thể ưu tiên viết LEFT cho dễ theo dõi.

## 5. Vì sao LEFT JOIN vẫn có thể làm mất category?

Muốn hiển thị **mọi category** nhưng chỉ ghép product có tên bắt đầu bằng `K`.

**Cách A: điều kiện tên nằm trong `ON`**

```sql
SELECT c.name, p.name
FROM categories c
LEFT JOIN products p
  ON p.category_id = c.id AND p.name LIKE 'K%';
```

Kết quả: `(Bàn phím, K1)`, `(Bàn phím, K2)`, `(Chuột, NULL)`, `(Tai nghe, NULL)`.

Với Chuột, product M1 không bắt đầu bằng K nên **không ghép được**. LEFT JOIN vẫn giữ Chuột và điền NULL ở phía product.

**Cách B: điều kiện tên nằm trong `WHERE`**

```sql
SELECT c.name, p.name
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
WHERE p.name LIKE 'K%';
```

Kết quả chỉ còn `(Bàn phím, K1)` và `(Bàn phím, K2)`.

Ở đây Chuột ghép với M1 theo `category_id`, rồi bị `WHERE` loại vì M1 không bắt đầu bằng K. Tai nghe tạo dòng product NULL, rồi cũng bị loại vì `NULL LIKE 'K%'` không TRUE.

| Chỗ đặt điều kiện | Ý nghĩa trong ví dụ | Chuột còn không? |
|---|---|---|
| `ON` | Chỉ ghép product tên K, vẫn giữ category | Có, product NULL |
| `WHERE` | Lọc kết quả, chỉ giữ dòng product tên K | Không |

Không phải `WHERE` luôn sai. Nếu yêu cầu là **chỉ lấy những category có product tên K**, cách B đúng. Hãy đọc yêu cầu trước. Đây là cách suy luận kết quả; PostgreSQL có thể tối ưu thứ tự thực thi thực tế. [Tài liệu PostgreSQL](https://www.postgresql.org/docs/current/queries-table-expressions.html) cũng minh họa sự khác nhau này.

## 6. Tìm category chưa có product

Bắt đầu từ mọi category, ghép product nếu có, rồi giữ những dòng mà phía product không tồn tại:

```sql
SELECT c.id, c.name
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
WHERE p.id IS NULL;
```

Kết quả: `(3, Tai nghe)`.

Kiểm tra `p.id` vì id của một product thật không NULL. Dùng `IS NULL`, không viết `p.id = NULL`: so sánh thông thường với NULL không cho TRUE. Nếu một cột product vốn cho phép NULL, đừng dùng cột đó để kết luận “không có product”. [Tài liệu PostgreSQL về NULL](https://www.postgresql.org/docs/current/functions-comparison.html).

## 7. JOIN ba bảng: mỗi dòng kết quả đại diện cho cái gì?

Thêm bảng **order_items**:

| id | product_id | quantity |
|---:|---:|---:|
| 100 | 10 | 2 |
| 101 | 10 | 1 |
| 102 | 12 | 3 |

Muốn liệt kê mỗi item cùng tên product và category:

```sql
SELECT oi.id AS item_id, p.name AS product, c.name AS category, oi.quantity
FROM order_items oi
JOIN products p ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id
ORDER BY oi.id;
```

Lần theo item 100: `product_id=10` tìm K1; K1 có `category_id=1` tìm Bàn phím. Item 101 cũng tìm K1, nên K1 xuất hiện lần nữa.

| item_id | product | category | quantity |
|---:|---|---|---:|
| 100 | K1 | Bàn phím | 2 |
| 101 | K1 | Bàn phím | 1 |
| 102 | M1 | Chuột | 3 |

**Ba dòng này đại diện cho ba order item**, không phải ba product. Nếu mỗi product có nhiều item, tên product lặp lại là đúng.

Ví dụ khác: một category có 2 products; product A có 3 items và B có 2 items. INNER JOIN cả ba bảng sẽ có **5 dòng**, vì kết quả đang ở mức item.

## 8. Hai lưu ý trước khi làm bài

**Đếm dòng:** Sau `categories LEFT JOIN products`, category Tai nghe vẫn tạo một dòng có `p.id = NULL`. Vì vậy `COUNT(*)` tính là 1; `COUNT(p.id)` tính là 0. Bài aggregate ở Lesson 03 sẽ học kỹ hơn.

**Thứ tự:** Không có `ORDER BY` thì đừng đoán thứ tự trả về. Khi chấm bài, thứ tự các dòng tương đương đều được chấp nhận.

Nếu từng dùng JPA: `product.getCategory()` đi theo quan hệ object; SQL JOIN ghép dòng từ hai bảng bằng khóa. JPA có thể dùng JOIN hoặc truy vấn riêng tùy cách tải quan hệ, nên đừng mặc định có `@ManyToOne` là SQL sẽ JOIN ngay.

## 9. Cách chọn JOIN trong 10 giây

| Muốn giữ ai dù không có dữ liệu liên quan? | Chọn |
|---|---|
| Chỉ các cặp khớp | INNER JOIN |
| Mọi category | `categories LEFT JOIN products` |
| Mọi product | `products LEFT JOIN categories` |
| Category không có product | `categories LEFT JOIN products` + `WHERE p.id IS NULL` |

Khi đọc bất kỳ query nào, hỏi: **mỗi dòng kết quả đại diện cho gì, ai phải được giữ, điều kiện ghép là khóa nào?**

## 10. Tự kiểm tra

1. Vì sao Bàn phím có hai dòng trong INNER JOIN?
2. Vì sao Tai nghe chỉ hiện khi dùng LEFT JOIN từ categories?
3. Muốn giữ product 13 thì bảng nào phải nằm bên trái?
4. Vì sao đưa `p.name LIKE 'K%'` xuống WHERE làm mất Chuột?
5. Trong query ba bảng, K1 lặp hai lần là lỗi hay là kết quả đúng?

Sau khi tự trả lời, làm [bài kiểm tra Lesson 02](../../Exams/de-kiem-tra/M2-1-sql-index__2026-09-28__lesson2-lan1.md). File đáp án nằm riêng để bạn tự kiểm tra sau.
