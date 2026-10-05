# Chấm M2-1 Lesson 03 - 2026-10-03

Đề: `Exams/de-kiem-tra/M2-1-sql-index__2026-10-01__lesson3-lan1.md`.

## Điểm và trạng thái

- **34/40 điểm thô = 85/100: đạt Lesson 03** theo ngưỡng 85. Đây không phải điểm tổng kết M2-1; module vẫn đang học.
- `DISTINCT` / `IN` / `BETWEEN` / `CASE`: 14/15 = 93%, tốt.
- Subquery trong `IN`: 5/6 = 83%, cần sửa alias để query chạy.
- `EXISTS` / `NOT EXISTS`: 9/13 = 69%, hiểu cấu trúc nhưng thiếu dòng kết quả và cần nói đúng đối tượng được kiểm tra.
- CTE: 6/6 = 100%, tốt.

## Chấm từng câu

| Câu | Điểm | Đã làm được | Còn thiếu / cần sửa |
|---|---:|---|---|
| 1 | 5/5 | A có 4 giá trị `1,2,3,NULL`; B có 6 cặp `(id, category_id)` khác nhau. | Khi ghi output B chỉ cần hai cột `id`, `category_id`, không phải cả dòng Product. |
| 2 | 5/5 | Đúng K1, K2, H1; hiểu `NULL` không qua `IN` và `BETWEEN` gồm hai đầu. | Không có. |
| 3 | 4/5 | Đúng bốn nhãn được hỏi và nhánh TRUE đầu tiên của `CASE`. | Chưa trả lời query vẫn có **6 dòng** vì `CASE` trong `SELECT` chỉ gắn nhãn, không lọc. |
| 4 | 5/6 | Query con trả `2`; kết quả ngoài là `(12,M1)`, `(13,M2)`; ý tưởng `IN (subquery)` đúng. | `WHERE p.category_id` dùng alias `p` nhưng `FROM Products` chưa khai báo `p`: viết `FROM products p` (hoặc bỏ `p.`). Đây là lỗi khiến SQL hiện tại không chạy, không phải lỗi viết hoa `Products`. |
| 5 | 4/7 | Query `EXISTS` đúng; hiểu JOIN có thể lặp Bàn phím. | Chưa liệt kê đủ kết quả `(1,Bàn phím)`, `(2,Chuột)`, `(3,Tai nghe)`; `EXISTS` được kiểm tra theo **mỗi Category `c` ở query ngoài**, không phải theo mỗi Product. |
| 6 | 5/6 | Query `NOT EXISTS` đúng; Product 15 có `NULL` không khớp Category nào. | Chưa nêu kết quả `(4, Giá đỡ)`. `NOT EXISTS` TRUE khi query con **không trả dòng nào** cho Category đang xét. |
| 7 | 6/6 | Đúng Product trong CTE, ba cặp kết quả, alias `sp` và phạm vi của CTE. | "Bảng trung gian" là cách hình dung để đọc query; đừng mặc định PostgreSQL tạo bảng tạm vật lý. |

## Chữa hai chỗ quan trọng

**Alias ở câu 4.** `FROM Products` tự nó hợp lệ trong PostgreSQL khi không có dấu nháy kép, nhưng query của bạn lại dùng `p.category_id` mà chưa hề đặt tên bảng là `p`. Sửa đúng một chỗ:

```sql
FROM products p
```

Sau đó `p.category_id` mới có nghĩa. Đọc lại Lesson 02 mục 1.1 về alias và Lesson 03 mục 6 về subquery.

**`EXISTS` ở câu 5-6.** Query ngoài bắt đầu từ `categories c`: với **từng Category**, query con thử tìm Product có `p.category_id = c.id`. `EXISTS` TRUE nếu tìm được ít nhất một dòng, dù tìm được 1 hay 2 Product thì Category chỉ được giữ **một lần**. `NOT EXISTS` TRUE nếu không tìm được dòng nào. Product 15 có `category_id = NULL`, nên `NULL = c.id` không TRUE với Category nào. Đọc lại Lesson 03 mục 7.

## Ôn đúng chỗ

- `EXISTS` theo dòng ngoài -> Lesson 03 mục 7 -> 10 phút -> tự lập bảng 4 Category và đánh dấu query con trả 0, 1 hay 2 Product; sau đó ghi output `EXISTS`/`NOT EXISTS`.
- Alias bảng -> Lesson 02 mục 1.1 và Lesson 03 mục 6 -> 5 phút -> sửa câu 4, gạch chân nơi khai báo `p` và nơi dùng `p.category_id`.
- `CASE` không lọc -> Lesson 03 mục 5 -> 3 phút -> nói rõ vì sao 6 Product vẫn cho 6 dòng output.

## Bước tiếp theo

Lesson 03 đạt 85/100. Bạn có thể học Lesson 04 sau khi tự nói lại `EXISTS` theo **Category** và ghi đủ kết quả câu 5-6. Chưa tick checklist hoặc đánh dấu hoàn thành M2-1 từ riêng bài lesson này.
