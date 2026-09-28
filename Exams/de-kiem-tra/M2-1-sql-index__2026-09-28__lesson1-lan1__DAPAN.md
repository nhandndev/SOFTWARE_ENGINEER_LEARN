# Đáp án M2-1 - Lesson 01: SQL cơ bản

> Tổng 40 điểm thô; điểm thang 100 = điểm thô / 40 x 100. Chấm theo ý nghĩa; lỗi gõ nhỏ không làm mất toàn bộ điểm nếu câu SQL thể hiện đúng ý.

## Câu 1 - 5đ

SQL cho phép yêu cầu database đọc/thêm/sửa/xóa dữ liệu (2đ). Bảng lưu tập Product, mỗi dòng là một Product, mỗi cột là một thuộc tính (2đ). `SELECT` dùng đọc dữ liệu (1đ).

## Câu 2 - 6đ

```sql
SELECT id, name, price
FROM products
WHERE price >= 500000;
```

Đúng 3 cột và bảng (2đ), điều kiện `>= 500000` (2đ), K1 và K2 (2đ). Thứ tự không bắt buộc vì không có `ORDER BY`.

## Câu 3 - 6đ

Với OR: K1, K2 (category 1) và Product 13 (price 200000 < 300000), không có M1 vì price 300000 không nhỏ hơn 300000 (3đ). Với AND: không có Product nào vì hai product category 1 đều đắt hơn 300000 (2đ). Giải thích OR chỉ cần một điều kiện đúng, AND cần cả hai (1đ).

## Câu 4 - 5đ

```sql
SELECT id, name FROM products WHERE category_id IS NULL;
```

`IS NULL` đúng (2đ), Product 13 (1đ), giải thích `= NULL` không cho TRUE vì NULL là thiếu giá trị xác định (2đ).

## Câu 5 - 7đ

```sql
SELECT id, name, price
FROM products
ORDER BY price DESC, id ASC
LIMIT 2 OFFSET 2;
```

Thứ tự sắp xếp đúng (2đ), `LIMIT 2 OFFSET 2` cho page 1 với size 2 (3đ), kết quả M1 và Product 13 theo thứ tự đó (2đ).

## Câu 6 - 6đ

`FROM` lấy 4 Product (1đ); `WHERE` giữ K1/K2/M1 (1đ); `ORDER BY` giảm giá rồi tăng id khi hòa (1đ); `LIMIT 2` lấy 2 dòng đầu (1đ); output `(10, K1)`, `(11, K2)` đúng thứ tự (2đ).

## Câu 7 - 5đ

`products.id` là PK nhận diện Product (1.5đ); `category_id` là FK tham chiếu Category (1.5đ); tên Category không có trong bảng Product, phải đọc bảng Category (1đ); Lesson 02 học JOIN để ghép hai bảng (1đ).
