# Đáp án M2-1 - Lesson 04

> Tổng 40 điểm thô. Điểm thang 100 = điểm thô / 40 x 100. Chấm theo ý nghĩa; thứ tự dòng không quan trọng khi query không có `ORDER BY`. Đây là điểm lesson, không thay đề tổng kết M2-1.

## Câu 1 - 5đ

`COUNT(*) = 6`, `COUNT(category_id) = 5`, `SUM(price) = 4300`, `MIN(price) = 200`, `MAX(price) = 1500` (mỗi số 0,8đ = 4đ); `COUNT(column)` bỏ qua `NULL` ở Product 15, còn `COUNT(*)` đếm mọi dòng (1đ).

## Câu 2 - 5đ

Kết quả `(1,2)`, `(2,2)`, `(3,1)`, `(NULL,1)` (3đ). Giá đỡ không có vì không Product nào có `category_id=4` (1đ). Product 15 thuộc nhóm `NULL` (1đ).

## Câu 3 - 5đ

`WHERE` giữ K1, K2, H1 (1đ); `GROUP BY` tạo nhóm category 1 có 2 và category 3 có 1 (1đ); `HAVING` giữ chỉ nhóm `(1,2)` (1đ); không thay bằng `WHERE COUNT(*) >= 2` ở cùng cấp vì `WHERE` chọn dòng trước khi tính nhóm, `HAVING` chọn nhóm sau aggregate (2đ).

## Câu 4 - 6đ

`(Bàn phím,2,2)`, `(Chuột,2,2)`, `(Tai nghe,1,1)`, `(Giá đỡ,1,0)` (4đ); LEFT JOIN giữ Giá đỡ bằng một dòng với `p.id=NULL`, nên `COUNT(*)` tính 1 còn `COUNT(p.id)` không tính NULL (2đ).

## Câu 5 - 4đ

Bàn phím `(2300,2300)` (1đ); Giá đỡ `(NULL,0)` (1đ); `SUM` không có giá trị khác NULL thì NULL, `COALESCE` đổi giá trị hiển thị thành 0 (1đ); đây là tổng giá niêm yết Product, không phải doanh thu từ `order_items.quantity * unit_price` (1đ).

## Câu 6 - 6đ

Bàn phím `(item_rows=2, ordered_products=1)` và Chuột `(2,2)` (3đ). K1 có hai order item 100, 101, nên tạo hai dòng JOIN nhưng chỉ một `p.id` khác nhau (1đ). `ordered_products` chỉ là số Product có ít nhất một item; K2 không có item nên biến mất trong INNER JOIN, dù Bàn phím có tổng cộng 2 Product (2đ).

## Câu 7 - 5đ

Có 4 dòng Product K1, K2, M1, M2 (1đ); `(K1,2300)`, `(K2,2300)`, `(M1,600)`, `(M2,600)` (3đ); `SUM(...) OVER (PARTITION BY ...)` tính tổng theo tập mà **giữ từng dòng**, còn `GROUP BY` gộp mỗi Category thành một dòng; `WHERE` đã bỏ các Category khác khỏi input window (1đ).

## Câu 8 - 4đ

K1 `1`, K2 `2`; M1 `1`, M2 `2`; H1 `1` (2đ). M1 và M2 đồng giá nhưng `id ASC` phân định thứ tự và `ROW_NUMBER` gán số khác nhau (1đ). `ORDER BY` trong `OVER` quyết định cách đánh số trong mỗi partition; `ORDER BY` cuối query chỉ sắp xếp dòng được hiển thị (1đ).
