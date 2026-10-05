# M2-1 - Lesson 01: SQL cơ bản, đọc một bảng Product

> **Mục tiêu:** hiểu SQL dùng để làm gì và tự đọc được query `SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ...` trên **một bảng**. Bạn chưa cần học JOIN hay index ở bài này.

## Tài liệu / video liên quan

- [PostgreSQL - Querying a Table](https://www.postgresql.org/docs/current/tutorial-select.html): cách đọc `SELECT`, `FROM`, `WHERE`.
- [PostgreSQL - Sorting Rows](https://www.postgresql.org/docs/current/queries-order.html): `ORDER BY`.
- [PostgreSQL - LIMIT/OFFSET](https://www.postgresql.org/docs/current/queries-limit.html): lấy một phần kết quả.
- Video: tìm `SQL SELECT FROM WHERE beginner` trên YouTube; xem sau khi bạn tự đọc được ví dụ ở mục 3.

## 1. SQL dùng để làm gì?

`shopcore` lưu Product trong database. SQL là ngôn ngữ để yêu cầu database đọc hoặc thay đổi dữ liệu.

```text
Controller -> Service -> Repository/JPA -> SQL -> Database
```

Ví dụ, code Java gọi `productRepository.findById(10L)`. JPA có thể tạo câu SQL để database tìm Product có id 10. Bạn cần học SQL để hiểu database đã **lọc gì, trả gì, và vì sao query chậm**. M2-1 học cách đọc/query dữ liệu và index; chưa cần tự viết lại toàn bộ Repository bằng SQL.

Các lệnh SQL thường gặp:

| Lệnh | Việc làm | Ví dụ trong shopcore |
|---|---|---|
| `SELECT` | Đọc dữ liệu | Lấy danh sách Product |
| `INSERT` | Thêm dòng | Tạo Product |
| `UPDATE` | Sửa dòng | Đổi giá Product |
| `DELETE` | Xóa dòng | Xóa Product |

**Lesson 1 chỉ tập trung vào `SELECT`.**

## 2. Bảng, dòng và cột là gì?

Tưởng tượng bảng `products` có 4 dòng sau. Đây là **dữ liệu minh họa**, không bắt buộc trùng tên cột trong project của bạn.

| id | name | price | category_id |
|---:|---|---:|---:|
| 10 | K1 | 1500000 | 1 |
| 11 | K2 | 800000 | 1 |
| 12 | M1 | 300000 | 2 |
| 13 | Chưa phân loại | 200000 | NULL |

- **Bảng** `products`: nơi lưu các Product.
- **Dòng**: một Product, ví dụ dòng id 10.
- **Cột** `price`: một thuộc tính có ở từng dòng.
- **`id`**: khóa chính (PK), giúp phân biệt từng Product.
- **`category_id`**: khóa ngoại (FK), dùng để chỉ đến Category tương ứng. Product 13 chưa được gán Category nên giá trị này là `NULL`.

Trong Java bạn thấy `Product` là object; trong SQL, dữ liệu Product được biểu diễn thành các dòng và cột. Hai cách nhìn phục vụ hai tầng khác nhau.

## 3. Câu SQL đầu tiên: SELECT và FROM

```sql
SELECT id, name, price
FROM products;
```

Đọc thành lời: **“Từ bảng products, hãy cho tôi cột id, name và price của mọi dòng.”**

Kết quả có 4 dòng, mỗi dòng chỉ hiện 3 cột được chọn. `category_id` vẫn ở trong bảng nhưng không được in ra.

```sql
SELECT * FROM products;
```

`*` nghĩa là chọn mọi cột. Khi học có thể dùng `*` cho nhanh; khi làm API/báo cáo, liệt kê cột cần thiết giúp query và kết quả rõ hơn.

**Chú ý:** nếu không có `ORDER BY`, database không cam kết trả 4 dòng theo thứ tự id 10, 11, 12, 13. Bảng ở trên chỉ là cách trình bày để bạn dễ nhìn.

## 4. WHERE: dòng nào được giữ?

```sql
SELECT id, name, price
FROM products
WHERE price >= 500000
ORDER BY id;
```

Đọc: “Lấy Product có giá **từ 500000 trở lên**.”

| id | name | price | Được giữ? |
|---:|---|---:|---|
| 10 | K1 | 1500000 | Có |
| 11 | K2 | 800000 | Có |
| 12 | M1 | 300000 | Không |
| 13 | Chưa phân loại | 200000 | Không |

Kết quả thật có 2 dòng K1, K2; cột “Được giữ?” chỉ để giải thích, không có trong output của query.

Điều kiện thông dụng: `=`, `<>` (khác), `>`, `>=`, `<`, `<=`. Với chuỗi phải đặt dấu nháy đơn: `WHERE name = 'K1'`.

### Ghép nhiều điều kiện

```sql
WHERE price >= 500000 AND category_id = 1
```

`AND`: cả hai điều kiện phải đúng. Với dữ liệu này trả K1, K2.

```sql
WHERE category_id = 1 OR price < 300000
```

`OR`: chỉ cần một điều kiện đúng. Trả K1, K2 và Product 13. Khi trộn `AND` và `OR`, đặt ngoặc để người đọc biết rõ ý:

```sql
WHERE category_id = 1 AND (price < 900000 OR name = 'K1')
```

### Tìm tên theo mẫu

```sql
WHERE name LIKE 'K%'
```

`%` là chuỗi ký tự bất kỳ phía sau chữ K. Với bảng này, kết quả là K1 và K2.

## 5. NULL: không có giá trị, khác số 0

Product 13 có `category_id = NULL`, nghĩa là chưa có giá trị category. `NULL` không phải số 0 hay chuỗi `'NULL'`.

Tìm Product chưa có category:

```sql
SELECT id, name
FROM products
WHERE category_id IS NULL;
```

Kết quả: `(13, Chưa phân loại)`.

Tìm Product đã có category: `WHERE category_id IS NOT NULL`.

Đừng viết `category_id = NULL`. Phép so sánh thông thường với NULL cho kết quả *không xác định*, không phải TRUE; `WHERE` sẽ không giữ dòng đó. Dùng `IS NULL`/`IS NOT NULL`. [Tài liệu PostgreSQL về NULL](https://www.postgresql.org/docs/current/functions-comparison.html).

## 6. ORDER BY: sắp xếp kết quả

```sql
SELECT id, name, price
FROM products
ORDER BY price DESC, id ASC;
```

`DESC` = giảm dần; `ASC` = tăng dần. Kết quả theo giá: K1 (1500000), K2 (800000), M1 (300000), Chưa phân loại (200000).

`id ASC` là tiêu chí phụ khi hai Product có cùng giá. Điều này đặc biệt quan trọng khi phân trang: nếu giá bằng nhau, thứ tự vẫn có cách phân định.

## 7. LIMIT và OFFSET: lấy một phần kết quả

```sql
SELECT id, name, price
FROM products
ORDER BY price DESC, id ASC
LIMIT 2 OFFSET 0;
```

Lấy tối đa 2 dòng đầu: **K1, K2**.

```sql
SELECT id, name, price
FROM products
ORDER BY price DESC, id ASC
LIMIT 2 OFFSET 2;
```

Bỏ qua 2 dòng đầu, lấy 2 dòng tiếp: **M1, Chưa phân loại**.

Với `size = 2`, `page = 0` thì `OFFSET = 0`; `page = 1` thì `OFFSET = 2`. Đây là ý tưởng cơ bản phía sau pagination bạn đã dùng ở Spring Data JPA. Không có `ORDER BY` rõ ràng, mỗi lần phân trang có thể nhận tập dòng khó dự đoán. [PostgreSQL: LIMIT/OFFSET](https://www.postgresql.org/docs/current/queries-limit.html).

## 8. Đọc một query từ đầu đến cuối

```sql
SELECT id, name
FROM products
WHERE price >= 300000
ORDER BY price DESC, id ASC
LIMIT 2;
```

Hãy tự chạy bằng đầu óc:

1. `FROM`: nhìn 4 Product.
2. `WHERE`: giữ K1, K2, M1; bỏ Product 13 vì giá 200000.
3. `SELECT`: chỉ lấy `id`, `name`.
4. `ORDER BY`: thứ tự K1, K2, M1.
5. `LIMIT 2`: trả `(10, K1)` và `(11, K2)`.

Đây là **cách suy luận kết quả**, không khẳng định PostgreSQL luôn thực thi vật lý theo đúng năm bước này. Khi học index ở Lesson 05, ta mới xem database thật sự chọn kế hoạch gì.

## 9. Chuẩn bị cho Lesson 02 JOIN

Bạn đã thấy `products.category_id`. Bảng `categories` có thể là:

| id | name |
|---:|---|
| 1 | Bàn phím |
| 2 | Chuột |

Nếu cần thêm **tên Category** cho mỗi Product, một bảng `products` là chưa đủ: nó chỉ có `category_id`, không có tên Category. Lesson 02 sẽ dùng JOIN để ghép `products.category_id` với `categories.id`. Bạn chưa cần viết JOIN ở Lesson 01.

## 10. Tự kiểm tra trước khi làm đề

1. `SELECT name FROM products` in mấy cột, mấy dòng?
2. `WHERE price < 500000` giữ Product nào?
3. Vì sao `category_id = NULL` không tìm được Product 13?
4. `ORDER BY price DESC LIMIT 2` giữ Product nào?
5. Nếu một Product chỉ có `category_id`, muốn biết tên Category thì cần thêm bảng nào?

Làm [bài kiểm tra Lesson 01](../../Exams/de-kiem-tra/M2-1-sql-index__2026-09-28__lesson1-lan1.md) sau khi đọc bài. Cứ giải thích bằng lời nếu chưa nhớ cú pháp; phần viết SQL sẽ chấm theo ý nghĩa.
