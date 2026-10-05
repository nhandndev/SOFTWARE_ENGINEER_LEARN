# Đáp án M2-1 - Lesson 03

> Tổng 40 điểm thô. Chấm theo ý nghĩa; thứ tự dòng không quan trọng khi query không có `ORDER BY`. Điểm / 40 x 100 chỉ là điểm Lesson 03, không thay đề tổng kết M2-1.

## Câu 1 - 5đ

A có 4 dòng: `1`, `2`, `3`, `NULL` (3đ; thứ tự tùy ý). B có 6 dòng vì `DISTINCT` xét **cặp** `(id, category_id)` và mỗi `id` là duy nhất (2đ).

## Câu 2 - 5đ

Kết quả `(10,K1)`, `(11,K2)`, `(14,H1)` (3đ). `BETWEEN` tính cả hai đầu 800, 1500 (1đ). Product 15 có `category_id = NULL` nên `IN (1,3)` không TRUE, bị lọc (1đ).

## Câu 3 - 5đ

Vẫn 6 dòng vì `CASE` ở `SELECT` gắn nhãn chứ không lọc (1đ). Id 10 Cao, 11 Vua, 12 Vua, 15 Thap (3đ). Id 10 nhận nhánh TRUE **đầu tiên** `>=1000` nên không xuống nhánh `>=300` (1đ).

## Câu 4 - 6đ

```sql
SELECT p.id, p.name
FROM products p
WHERE p.category_id IN (
    SELECT c.id
    FROM categories c
    WHERE c.name = 'Chuột'
);
```

Query con trả `2` (1đ); query ngoài có `IN (subquery)` với khóa đúng (3đ); kết quả Product 12 M1, 13 M2 (2đ). Alias hoặc thứ tự khác mà đúng ý vẫn được chấp nhận.

## Câu 5 - 7đ

```sql
SELECT c.id, c.name
FROM categories c
WHERE EXISTS (
    SELECT 1
    FROM products p
    WHERE p.category_id = c.id
);
```

Đúng cấu trúc `EXISTS` và liên hệ hai query (3đ); kết quả Bàn phím, Chuột, Tai nghe (2đ); `EXISTS` chỉ kiểm tra có ít nhất một dòng, nên Bàn phím một dòng; INNER JOIN từng cặp sẽ tạo hai dòng Bàn phím (2đ).

## Câu 6 - 6đ

```sql
SELECT c.id, c.name
FROM categories c
WHERE NOT EXISTS (
    SELECT 1
    FROM products p
    WHERE p.category_id = c.id
);
```

Đúng `NOT EXISTS` và khóa liên hệ (3đ); kết quả `(4, Giá đỡ)` (1đ); Product 15 có `category_id = NULL`, không khớp `c.id` nào và không khiến Category nào được xem là có Product (2đ).

## Câu 7 - 6đ

CTE gồm Product 10 K1, 11 K2, 14 H1 (2đ). Kết quả `(K1,Bàn phím)`, `(K2,Bàn phím)`, `(H1,Tai nghe)` (2đ). `selected_products` chỉ tồn tại trong phạm vi câu SQL, không phải bảng vĩnh viễn; `sp` là alias của CTE trong query ngoài (2đ).
