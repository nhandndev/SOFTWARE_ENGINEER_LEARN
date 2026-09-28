# Nhận xét M2-1 Lesson 01 - chấm lại lần 3 (2026-09-29)

Đề: `Exams/de-kiem-tra/M2-1-sql-index__2026-09-28__lesson1-lan1.md`.

## 1. Điểm và trạng thái

- **38/40 điểm thô = 95/100: 🟢 Đạt Lesson 01.** M2-1 vẫn 🟡 Đang học vì đây mới là bài SQL cơ bản; JOIN, subquery/CTE, aggregate/window, index/EXPLAIN và đề tổng kết chưa học/chấm.
- Lịch sử: chấm tạm 6 câu **16/35 (46%)** -> chấm đủ 7 câu **33/40 (83%)** -> lần này **38/40 (95%)**.
- Tôi đã chấm sai ở lần trước khi trừ điểm `FROM Products`: [PostgreSQL gộp tên không đặt trong dấu nháy kép về chữ thường](https://www.postgresql.org/docs/current/sql-syntax-lexical.html), nên `Products` và `products` là cùng tên. Lỗi trừ điểm đó đã được trả lại ở câu 2 và 5.
- Nhóm khái niệm/PK-FK (câu 1, 7): 9/10 = 90% 🟢. Lọc/NULL (câu 2-4): 16/17 = 94% 🟢. Phân trang (câu 5): 7/7 = 100% 🟢. Đọc query (câu 6): 6/6 = 100% 🟢.

## 2. Chấm từng câu

| Câu | Điểm | Bạn đã làm được | Còn thiếu |
|---|---:|---|---|
| 1 | 5/5 | SQL thao tác dữ liệu; bảng/dòng/cột; mỗi dòng là một Product; `SELECT` để đọc. | Không có thiếu sót đáng trừ. `FROM/WHERE/...` là các mệnh đề trong query, bạn đã gọi là query nên chấp nhận. |
| 2 | 6/6 | Chọn đúng 3 cột, `price >= 500000`, kết quả K1/K2. `Products` không đặt trong dấu nháy kép hợp lệ với bảng `products` trong PostgreSQL. | Không. |
| 3 | 6/6 | OR trả K1/K2/Product 13; AND không có dòng. | Không. Dấu `>` thừa sau `300000` là lỗi gõ, ý vẫn rõ. |
| 4 | 4/5 | `WHERE category_id IS NULL` đúng; hiểu `= NULL` không TRUE; Product 13 đúng. | `SELECT category` sai vì bảng đề không có cột `category`. Chọn `id, name` hoặc `*`. Dấu `=` vẫn là phép so sánh bằng thông thường trong SQL, chỉ không dùng để kiểm tra NULL. |
| 5 | 7/7 | `ORDER BY price DESC, id ASC`, `LIMIT 2 OFFSET 2`, kết quả id 12/13 đúng. | Không. `FROM Products` hợp lệ với `products` trong PostgreSQL khi không có dấu nháy kép. |
| 6 | 6/6 | Giải thích FROM/WHERE/ORDER/LIMIT và ghi đủ `(10,K1)`, `(11,K2)` theo thứ tự. | Không. |
| 7 | 4/5 | Đúng PK/FK; giải thích `category_id` nối Product với Category và phải đọc Category mới có `name`. | Chưa nêu tên **Lesson 02 - JOIN** như câu hỏi yêu cầu. Ghi nhớ: dòng SQL của Product chỉ lưu `category_id`, không chứa cả object Category như cách nhìn từ Java. |

## 3. Chữa hai điểm còn thiếu

**Câu 4:** Query đúng với bảng trong đề:

```sql
SELECT id, name
FROM products
WHERE category_id IS NULL;
```

Kết quả `(13, Chưa phân loại)`. `=` so sánh với giá trị thông thường; `IS NULL` kiểm tra giá trị thiếu.

**Câu 7:** `products.id` nhận diện một Product; `products.category_id` tham chiếu `categories.id`. Tên Category nằm ở `categories.name`. **Lesson 02 về JOIN** dạy cách ghép hai bảng bằng `products.category_id = categories.id` để lấy tên đó. JPA có thể biểu diễn Category bằng object, nhưng một dòng `products` không chứa toàn bộ object này.

## 4. Kiến thức cần nhắc lại và bước tiếp theo

- Tên cột thực tế -> [Lesson 01](../../Notes/M2_Database/LESSON_01_SQL_CO_BAN_DOC_MOT_BANG.md) mục 2 và 5 -> 5 phút -> viết lại câu 4 với `SELECT id, name`.
- PK/FK và JOIN -> Lesson 01 mục 9, [Lesson 02](../../Notes/M2_Database/LESSON_02_JOIN_TU_BANG_DEN_KET_QUA.md) mục 1 -> 10 phút -> chỉ ra `category_id` và `categories.name` nằm ở hai bảng khác nhau.

**Quyết định:** Lesson 01 🟢 đạt; có thể học Lesson 02 JOIN. Không đánh dấu M2-1 hoàn thành và không tick checklist module vì các chủ đề còn lại chưa được đánh giá.
