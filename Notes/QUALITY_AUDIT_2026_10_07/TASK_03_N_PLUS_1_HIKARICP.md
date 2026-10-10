# Task 03 — N+1 và HikariCP

| Lesson đã đọc | Câu/rubric đã đối chiếu | Điểm kiểm |
|---|---|---|
| 01 | 1–8 | Context lạnh, ID quan hệ khác nhau, SQL phụ, statistics |
| 02 | 1–8 | JOIN/FETCH, null-safe mapping, graph/batch/projection |
| 03 | 1–8 | To-one vs collection paging, count/filter, OSIV/proxy |
| 04 | 1–8 | Timeout/lifetime/leak, replica budget, benchmark |

## Kết quả

Không phát hiện mâu thuẫn kỹ thuật cần sửa trong lượt đọc này. Điều kiện tính query được công bố, không ép N+1 thành công thức tuyệt đối. Đề L03 C6 cho rõ count được chạy nên đáp án total 3 thay vì 2 không phụ thuộc count optimization.

Ví dụ hai bước paging giữ thứ tự ID, tránh IN rỗng, lấy metadata từ trang root và cảnh báo READ COMMITTED không cố định snapshot qua nhiều SELECT. EntityGraph không được hứa một SQL trên mọi provider. Batch đọc khác JDBC batch ghi. Hikari timeout chờ mượn khác query timeout; leak warning không tự đóng/rollback.

Rubric chấm giải thích dữ liệu/điều kiện, không yêu cầu thuộc logger/import. L04 có nhiều vế: học viên nên dành khoảng 60–90 phút, không coi là quiz 10 phút. Không nâng tiêu chí thực hành thành yêu cầu chấm ngầm.

## Nguồn và giới hạn

- [Hibernate fetching](https://docs.hibernate.org/orm/7.1/userguide/html_single/#fetching).
- [Hikari configuration](https://github.com/brettwooldridge/HikariCP#configuration-knobs-baby).
- [Hikari pool sizing](https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing).
- Đây là kiểm tĩnh, chưa chứng minh JPQL chạy trên toàn bộ mapping thực hay benchmark. Số p95/throughput trong bài được ghi rõ là giả định, không phải kết quả đo.
