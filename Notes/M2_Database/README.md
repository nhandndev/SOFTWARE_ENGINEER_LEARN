# M2-1 - SQL & Index: học từ nền tảng đến đọc query plan

Học từng lesson theo [kế hoạch](LESSON_PLAN.md), rồi làm đề tương ứng trong `Exams/de-kiem-tra/`.

Mục tiêu: từ dữ liệu `shopcore`, đọc/viết SQL cơ bản, ghép bảng và tổng hợp đúng dữ liệu để dùng cho backend lẫn phân tích/AI; cuối cùng giải thích khi nào index hữu ích bằng `EXPLAIN ANALYZE`.

1. [Lesson 01: SQL cơ bản, đọc một bảng](LESSON_01_SQL_CO_BAN_DOC_MOT_BANG.md).
2. [Lesson 02: JOIN từ bảng đến kết quả](LESSON_02_JOIN_TU_BANG_DEN_KET_QUA.md).
3. Lesson 03: `DISTINCT`, `IN`, `BETWEEN`, `CASE`, subquery, `EXISTS`, CTE (`WITH`).
4. Lesson 04: `GROUP BY`, `HAVING`, aggregate, window function cơ bản; kiểm tra dữ liệu thiếu và JOIN nhân dòng.
5. Lesson 05: B-tree/composite/covering index, `EXPLAIN ANALYZE` trước và sau index.

Đề Lesson 01: `Exams/de-kiem-tra/M2-1-sql-index__2026-09-28__lesson1-lan1.md`.

Đề Lesson 02: `Exams/de-kiem-tra/M2-1-sql-index__2026-09-28__lesson2-lan1.md`. Chỉ mở file `__DAPAN.md` sau khi làm xong. Điểm lesson không thay cho đề tổng kết module.

M1-6 Testing đang tạm hoãn theo quyết định của bạn, chưa được đánh dấu đạt.

Không cần học toàn bộ mục lục SQL trên W3Schools. [Bản đồ phạm vi SQL cho BE -> AI Engineer](README_PHAM_VI_SQL_BE_TO_AI.md) phân biệt nội dung học ở M2-1, M2-2 và phần chỉ cần nhận diện. `INSERT`/`UPDATE`/`DELETE`, transaction, constraint và truy vấn có tham số thuộc M2-2; chúng quan trọng nhưng nên học cùng database thật.
