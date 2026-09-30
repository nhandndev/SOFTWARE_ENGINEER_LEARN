# Chấm M2-1 Lesson 02 JOIN - 2026-10-01

Đề: `Exams/de-kiem-tra/M2-1-sql-index__2026-09-28__lesson2-lan1.md`.

## Điểm tạm và trạng thái

- Đã chấm cả 7 câu theo bản trả lời hiện tại. File đề hiện dùng bộ bảng K1/K2/M1 cho câu 6; đáp án đã được đồng bộ theo bộ bảng này.
- **36/40 điểm thô = 90/100.** Lesson 02 đạt ngưỡng 85; đây **không phải** điểm đề tổng kết M2-1, nên module vẫn đang học.
- Nhóm INNER/LEFT JOIN và chọn phía giữ: 15/15 (100%). Nhóm ON/WHERE: 7/7 (100%). Nhóm tìm category rỗng/NULL: 5/6 (83%). Nhóm JOIN ba bảng: 4/7 (57%). Nhóm cardinality/`COUNT(*)`: 5/5 (100%).

## Từng câu

| Câu | Nhận xét | Điểm |
|---|---|---:|
| 1 | Đúng ý: Bàn phím ghép 2 product; Tai nghe không có cặp ghép; product 13 có `NULL` nên không khớp `=`. | 5/5 |
| 2 | Đúng 4 cặp dòng và đúng việc product 13 không được giữ. Nên nói LEFT JOIN giữ **tất cả** dòng bảng trái, không phải “hầu hết”. | 5/5 |
| 3 | Đúng phía `products`, điều kiện khóa và category `NULL` của product 13. Câu chữ ngoài code fence không làm sai ý. | 5/5 |
| 4 | Đã sửa đúng: A giữ 3 category; B chỉ còn 2 dòng Bàn phím. Giải thích đúng khác biệt ON/WHERE. | 7/7 |
| 5 | Query `WHERE p.category_id IS NULL` **đúng với điều kiện JOIN này**: dòng ghép thật bắt buộc có `p.category_id = c.id` khác NULL. Cần sửa lời giải thích: dòng category rỗng nhận NULL ở **mọi cột phía `p` do LEFT JOIN tạo ra**, không phải có một product thật với `category_id = NULL` được ghép vào. `p.id IS NULL` là lựa chọn rõ nghĩa/ổn định hơn khi xác định không có product. | 5/6 |
| 6 | Hai điều kiện JOIN đúng (2/2), bốn giá trị cột đúng (2/2). Chưa giải thích `oi.id AS item_id` (0/1), chưa nói số dòng/ý nghĩa dòng/K1 lặp (0/2). `ORDER BY oi.quantity` hợp lệ nhưng không được hỏi. | 4/7 |
| 7 | Liệt kê đúng 5 cặp, 5 dòng và `COUNT(*) = 5`. Ý "sau hai lần JOIN đang ở mức order item" đúng với dữ liệu này. Nói chính xác hơn: `COUNT(*)` đếm số dòng sau `FROM`/`JOIN`/`WHERE`; ở đây mỗi dòng ứng với một item. | 5/5 |

## Chữa điểm thiếu

### Câu 4: `ON` và `WHERE` (đã sửa đúng)

- A: `ON` giới hạn product được ghép; LEFT JOIN **vẫn giữ mọi category**. Kết quả `(Bàn phím,K1)`, `(Bàn phím,K2)`, `(Chuột,NULL)`, `(Tai nghe,NULL)`.
- B: ghép trước, rồi `WHERE p.name LIKE 'K%'` chỉ giữ dòng có điều kiện TRUE. `M1` không bắt đầu K; dòng Tai nghe có `p.name = NULL`, mà `NULL LIKE 'K%'` không TRUE. Kết quả chỉ còn hai dòng Bàn phím.
- Đọc lại mục 5 của `Notes/M2_Database/LESSON_02_JOIN_TU_BANG_DEN_KET_QUA.md`.

### Câu 5: Vì sao kiểm tra `IS NULL`?

Sau `categories LEFT JOIN products`, category không có product vẫn xuất hiện một dòng, với các cột phía `p` được điền `NULL`. Vì thế `WHERE p.id IS NULL` tìm category không ghép được product. Trong **query cụ thể** của bạn, `p.category_id IS NULL` cũng cho đúng kết quả: một product đã ghép thành công thì `p.category_id = c.id` không thể NULL. Nhưng `p.id` dễ diễn đạt hơn vì đây là khóa của bản ghi product thật. `= NULL` không cho TRUE theo logic ba giá trị của SQL. Đọc lại mục 6 của lesson JOIN.

### Câu 7: `COUNT(*)` là gì? (đã sửa đúng)

`COUNT(*)` là hàm đếm **số dòng kết quả**. Sau hai INNER JOIN và lọc category 1, bạn đã liệt kê 5 dòng; thay SELECT bằng `SELECT COUNT(*)` sẽ trả một số là **5**. Nó không đếm 2 product hay 1 category. Trong dữ liệu này, mỗi dòng kết quả đúng là một order item; với query khác, một dòng sau JOIN không nhất thiết tương ứng một item. Lesson JOIN mục 8 có nhắc nhanh; Lesson 04 Aggregate sẽ học sâu hơn.

### Câu 6: Phần thiếu dù query đúng

`oi` là alias của `order_items`; `oi.id` lấy id của một order item; `AS item_id` chỉ đặt tên cột **kết quả**, không đổi cột trong database. Với bảng K1/K2/M1 hiện trong đề, INNER JOIN cho **3 dòng**, mỗi dòng ứng với một item 100, 101 hoặc 102. K1 xuất hiện hai lần vì item 100 và 101 đều tham chiếu Product 10. Query của bạn chọn đúng giá trị nhưng không dùng `AS`, nên tên cột hiển thị là `id`, `name`, `name`, `quantity` thay vì `item_id`, `product`, `category`, `quantity`; không trừ điểm giá trị cột theo rubric hiện tại. Xem Lesson 02 mục 7.

## Cách ôn ngắn

- `LEFT JOIN` + NULL -> Lesson 02 mục 6 -> 5 phút -> tự giải thích vì sao product 13 không phải là dòng `Tai nghe, NULL`.
- JOIN ba bảng -> Lesson 02 mục 7 -> 10 phút -> đi từng item 100/101/102, tìm product rồi category; nói một câu về alias `AS`.

## Bước tiếp theo

Lesson 02 đạt 90/100. Có thể sang Lesson 03 khi bạn sẵn sàng; nếu muốn lấy đủ điểm câu 6, bổ sung ba ý giải thích còn thiếu rồi yêu cầu chấm lại. Không đổi checklist M2-1 hoặc kết luận pass module từ riêng Lesson 02.
