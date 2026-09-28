# Đáp án M2-1 - Lesson 02: JOIN

> Tổng 40 điểm thô; điểm = điểm thô / 40 x 100. Chấm theo ý nghĩa, không trừ vì khác alias/thứ tự dòng nếu đề không yêu cầu `ORDER BY`.

## Câu 1 - 5đ

- Category 1 khớp 2 product 10, 11 nên có 2 cặp dòng (2đ).
- Category 3 không có product khớp nên INNER bỏ qua (1.5đ).
- Product 13 có `category_id = NULL`, không khớp category nào nên không xuất hiện (1.5đ).

## Câu 2 - 5đ

`(Bàn phím, K1)`, `(Bàn phím, K2)`, `(Chuột, M1)`, `(Tai nghe, NULL)` (4đ); product 13 không có vì bảng được giữ là categories (1đ).

## Câu 3 - 5đ

```sql
FROM products p LEFT JOIN categories c ON c.id = p.category_id
```

Products ở bên trái (2đ), điều kiện khóa đúng (2đ), product 13 có category `NULL` (1đ).

## Câu 4 - 7đ

- A giữ 3 category (2đ): `(Bàn phím,K1)`, `(Bàn phím,K2)`, `(Chuột,NULL)`, `(Tai nghe,NULL)` (2đ).
- B chỉ còn `(Bàn phím,K1)`, `(Bàn phím,K2)` (1đ).
- `ON` quyết định cặp khớp khi LEFT JOIN; `WHERE` loại các dòng mà `p.name LIKE 'K%'` không TRUE, gồm dòng `NULL` (2đ).

## Câu 5 - 6đ

```sql
SELECT c.id, c.name
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
WHERE p.id IS NULL;
```

LEFT JOIN đúng (2đ), kiểm tra khóa không nullable phía product `p.id IS NULL` (2đ), giải thích `= NULL` không cho TRUE vì SQL dùng logic ba giá trị (2đ). Kết quả: category 3.

## Câu 6 - 7đ

```sql
SELECT oi.id, p.name AS product_name, c.name AS category_name, oi.quantity
FROM order_items oi
JOIN products p ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id;
```

Đủ 2 điều kiện JOIN (3đ), đủ cột (2đ), 3 dòng và K1 lặp 2 lần vì item 100/101 đều tham chiếu product 10 (2đ).

## Câu 7 - 5đ

5 dòng = 3 + 2 order items (3đ); `COUNT(*)` đếm dòng kết quả sau JOIN, ở đây là số order item khớp, không phải số product/category (2đ).
