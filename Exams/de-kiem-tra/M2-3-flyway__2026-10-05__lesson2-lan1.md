# M2-3 Flyway · Kiểm tra Lesson 02

> LESSON: 8 câu ×5đ =40đ; normalize /40 ×100. Chấm ý nghĩa. Dữ kiện đủ dưới đây, không cần chạy app.

## Câu 1 (5đ)
Trong Boot 4.1.1 có starter JPA, starter Flyway, module PostgreSQL, JDBC driver và cấu hình đúng, ai gọi migrate? Xếp DataSource, Flyway, JPA validate, nhận HTTP theo thứ tự và nói vai trò mỗi phần. Không cần nhớ tên artifact ngoài dữ kiện đã cho.

**Trả lời:**

## Câu 2 (5đ)
Giải thích `ddl-auto: validate`, `flyway.locations`, `validate-migration-naming` và `sql.init.mode: never` trong ví dụ bài học. Vì sao tránh để Hibernate update schema song song Flyway?

**Trả lời:**

## Câu 3 (5đ)
Migration thành công nhưng Entity cần description mà DB chưa có. Lỗi có thể xuất hiện ở bước nào? Có được xem là AppException từ Service hay HTTP handler không?

**Trả lời:**

## Câu 4 (5đ)
DB đã chạy V1 và R__product_summary.sql. Restart không đổi file thì R có chạy lại không? Nếu thêm V2 và đổi R, cái nào chạy trước? Nêu lý do.

**Trả lời:**

## Câu 5 (5đ)
Bạn thêm cột stock và thay định nghĩa view. Việc nào hợp versioned, việc nào có thể hợp repeatable? Có phải mọi SQL đặt trong R đều tự chạy lại an toàn không?

**Trả lời:**

## Câu 6 (5đ)
DB dev/test/prod riêng. Locations chung db/migration, seed nằm db/dev. Viết locations cho profile dev; prod dùng gì? Đổi profile có xóa seed đã ghi vào DB không?

**Trả lời:**

## Câu 7 (5đ)
Schema: categories(id PK, name UNIQUE); products(sku UNIQUE, name, price, category_id NOT NULL FK). Category có `(42, 'Demo Books')`; chưa có SKU DEMO-JAVA. Đọc SQL:

```sql
INSERT INTO products(sku, name, price, category_id)
SELECT 'DEMO-JAVA', 'Java Book', 120.00, c.id
FROM categories c WHERE c.name = 'Demo Books'
ON CONFLICT (sku) DO NOTHING;
```

Lần đầu category_id nhận giá trị gì? Chạy lại có thêm Product trùng hay update dòng cũ không? Tình huống độc lập: nếu không có Category Demo Books thì INSERT thêm mấy dòng, có tự tạo Category không?

**Trả lời:**

## Câu 8 (5đ)
Dev profile trỏ nhầm URL database prod và có locations seed dev. Seed có tự được bảo vệ chỉ vì tên profile là dev không? Mô tả ba điều cần kiểm tra trước migrate: DB đích, locations và nguồn secret/profile.

**Trả lời:**
