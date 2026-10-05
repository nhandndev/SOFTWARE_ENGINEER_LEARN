# M2-1 - SQL & Index: học từ nền tảng đến đọc query plan

Học từng lesson theo [kế hoạch](LESSON_PLAN.md), rồi làm đề tương ứng trong `Exams/de-kiem-tra/`.

Mục tiêu: từ dữ liệu `shopcore`, đọc/viết SQL cơ bản, ghép bảng và tổng hợp đúng dữ liệu để dùng cho backend lẫn phân tích/AI; cuối cùng giải thích khi nào index hữu ích bằng `EXPLAIN ANALYZE`.

1. [Lesson 01: SQL cơ bản, đọc một bảng](LESSON_01_SQL_CO_BAN_DOC_MOT_BANG.md).
2. [Lesson 02: JOIN từ bảng đến kết quả](LESSON_02_JOIN_TU_BANG_DEN_KET_QUA.md).
3. [Lesson 03: lọc dữ liệu, subquery, `EXISTS` và CTE](LESSON_03_MAU_TRUY_VAN_SUBQUERY_CTE.md).
4. [Lesson 04: aggregate, `GROUP BY`, `HAVING` và window function](LESSON_04_AGGREGATE_GROUP_BY_WINDOW.md).
5. [Lesson 05: B-tree, composite/covering index và `EXPLAIN ANALYZE`](LESSON_05_INDEX_EXPLAIN_ANALYZE.md).

Đề Lesson 01: `Exams/de-kiem-tra/M2-1-sql-index__2026-09-28__lesson1-lan1.md`.

Đề Lesson 02: `Exams/de-kiem-tra/M2-1-sql-index__2026-09-28__lesson2-lan1.md`. Chỉ mở file `__DAPAN.md` sau khi làm xong. Điểm lesson không thay cho đề tổng kết module.

Đề Lesson 03: `Exams/de-kiem-tra/M2-1-sql-index__2026-10-01__lesson3-lan1.md`. Bảng dữ liệu nằm ngay trong đề; đáp án ở file riêng `__DAPAN.md`.

Đề Lesson 04: `Exams/de-kiem-tra/M2-1-sql-index__2026-10-03__lesson4-lan1.md`. Bảng dữ liệu nằm ngay trong đề; đáp án ở file riêng `__DAPAN.md`.

Đề Lesson 05: `Exams/de-kiem-tra/M2-1-sql-index__2026-10-04__lesson5-lan1.md`. Plan minh họa nằm ngay trong đề; đáp án ở file riêng `__DAPAN.md`.

M1-6 Testing đang tạm hoãn theo quyết định của bạn, chưa được đánh dấu đạt.

Không cần học toàn bộ mục lục SQL trên W3Schools. [Bản đồ phạm vi SQL cho BE -> AI Engineer](README_PHAM_VI_SQL_BE_TO_AI.md) phân biệt nội dung học ở M2-1, M2-2 và phần chỉ cần nhận diện. `INSERT`/`UPDATE`/`DELETE`, transaction, constraint và truy vấn có tham số thuộc M2-2; chúng quan trọng nhưng nên học cùng database thật.

Tiếp theo: [M2-2 - PostgreSQL thực chiến](M2_2_PostgreSQL/README.md), bắt đầu từ kiểu dữ liệu và constraint. Theo phạm vi bạn chọn, các lesson đi kèm đề kiểm tra riêng và không giao capstone.
