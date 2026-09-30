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
SELECT oi.id AS item_id, p.name AS product_name, c.name AS category_name, oi.quantity
FROM order_items oi
JOIN products p ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id;
```

Đủ 2 điều kiện JOIN (2đ), đủ 4 giá trị cột (2đ; thiếu `AS` không làm sai giá trị nhưng cần lưu ý tên cột output), giải thích `oi` là alias bảng `order_items`, `oi.id` lấy id của item còn `AS item_id` đặt tên cột kết quả chứ không sửa database (1đ). Ba dòng kết quả với dữ liệu hiện có là `(100, K1, Bàn phím, 2)`, `(101, K1, Bàn phím, 1)`, `(102, M1, Chuột, 3)`; K1 lặp 2 lần vì item 100/101 đều tham chiếu product 10 (2đ). Biến thể alias tên khác mà đúng ý vẫn được chấp nhận.

## Câu 7 - 5đ

Các cặp sau JOIN là `(A,201)`, `(A,202)`, `(A,203)`, `(B,204)`, `(B,205)`; thứ tự không quan trọng. Có 5 dòng = 3 item của A + 2 item của B (3đ cho các cặp và tổng số dòng). `COUNT(*)` trả 5 vì đếm dòng kết quả sau JOIN, ở đây là số order item khớp, không phải số product (2) hay category (1) (2đ).
