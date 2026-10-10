# Task 01 — PostgreSQL

## Phạm vi đã đọc

| Lesson | Đề/đáp án | Kiểm trọng tâm |
|---|---|---|
| 01 | Câu 1–8 | NUMERIC, NULL/CHECK, UNIQUE/FK, JSONB, timestamp, UUID |
| 02 | Câu 1–8 | RETURNING, DEFAULT/NULL, UPDATE count, conflict và safe writes |
| 03 | Câu 1–8 | Autocommit, transaction aborted, rollback, save/flush/commit, proxy |
| 04 | Câu 1–8 | Driver/URL, bind parameter, identity/sequence, VACUUM |

Đã đối chiếu checklist M2-2 trong roadmap. Mức học phù hợp BE nền tảng; không biến module thành khóa DBA. Các câu tính dữ liệu dùng giả định độc lập, không cộng dồn thay đổi giữa câu.

## Phát hiện và sửa

1. **P2 — NUMERIC:** bài chưa giải thích ép scale trước CHECK. Đã thêm ví dụ 0.004 thành 0.00 với NUMERIC(12,2); kiểm số chữ số thập phân là yêu cầu riêng.
2. **P2 — Identity:** cần cảnh báo explicit ID với BY DEFAULT không tự đẩy sequence. Đã thêm nguy cơ trùng PK khi seed rồi insert tự sinh, và không reset sequence tùy tiện khi có ghi đồng thời.
3. **P2 — Rubric L02 C2:** bỏ yêu cầu lặp giả định A/B độc lập để lấy điểm; thay bằng phân biệt DEFAULT với explicit NULL mà câu hỏi thực sự kiểm.
4. **P3 — UUID:** làm rõ tính khó đoán phụ thuộc generator/version; UUID không thay authorization.

Không sửa bài làm L01 hoặc điểm cũ. Fence chưa đóng trong bài làm được ghi ở inventory, không quy thành lỗi kiến thức.

## Bằng chứng và giới hạn

- [PostgreSQL NUMERIC](https://www.postgresql.org/docs/current/datatype-numeric.html).
- [Identity columns](https://www.postgresql.org/docs/current/ddl-identity-columns.html).
- Đã kiểm tĩnh các kết quả/rubric. Kiểm thực thi SQL, nếu có, ghi riêng ở Task 11; không coi đọc code là chạy DB.
- Không kiểm được năng lực thực hành của học viên chỉ từ chất lượng tài liệu.
