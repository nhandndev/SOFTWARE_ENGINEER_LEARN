# SQL nào cần học để đi từ Backend đến AI Engineer?

Bạn **không cần học hết từng mục trong danh sách W3Schools**. Nhiều mục chỉ là các cách trình bày khác nhau, một số dành cho hệ quản trị khác PostgreSQL. Học theo việc mình cần làm với dữ liệu sẽ dễ nhớ hơn.

## M2-1: Đọc dữ liệu đúng trước

| Nhóm | Học đến mức nào? | Vì sao cần? |
|---|---|---|
| `SELECT`, `WHERE`, `AND`/`OR`/`NOT`, `ORDER BY`, `LIMIT`/`OFFSET`, `NULL`, `LIKE` | Tự viết và giải thích output | Nền của API tìm kiếm/lọc dữ liệu. Lesson 01 đã học. |
| `INNER`/`LEFT`/`RIGHT JOIN`, alias bảng/cột | Tự đếm dòng sau JOIN, giải thích dòng bị mất hoặc bị nhân | Backend lấy dữ liệu liên bảng; truy vấn phân tích cần tránh đếm sai. Lesson 02 đang học. |
| `DISTINCT`, `IN`, `BETWEEN`, `CASE` | Biết khi nào dùng; thử trên bảng nhỏ | Lọc tập giá trị, gắn nhãn dữ liệu. Lesson 03. |
| Subquery, `EXISTS`/`NOT EXISTS`, CTE `WITH` | So sánh với JOIN, viết query dễ đọc | Truy vấn theo điều kiện có/không có dữ liệu liên quan. Lesson 03. |
| `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`, `HAVING` | Tự tính tay kết quả, phân biệt NULL | Báo cáo và kiểm tra dữ liệu trước khi đưa vào phân tích/AI. Lesson 04. |
| Window function cơ bản (`ROW_NUMBER`, `RANK`, `SUM OVER`) | Nhận ra khác `GROUP BY`: giữ các dòng gốc | Xếp hạng, tính toán theo nhóm mà không làm mất chi tiết. Lesson 04. |
| Index và `EXPLAIN ANALYZE` | Đọc plan, đối chiếu query và dữ liệu thực | API/báo cáo chạy nhanh mà không tạo index theo cảm giác. Lesson 05. |

Mỗi bài truy vấn nên trả lời được: **Mỗi dòng kết quả là một Product, một Category, hay một nhóm?** Nếu JOIN làm một Product xuất hiện hai lần, `COUNT`/`SUM` có đang bị đội lên không? Nếu Category chưa có Product, kết quả có bị mất không? Đây là phần đặc biệt quan trọng khi dùng SQL để chuẩn bị dữ liệu cho AI.

## M2-2: Ghi dữ liệu và giữ dữ liệu đáng tin

Học cùng PostgreSQL thật: `INSERT`, `UPDATE`, `DELETE`, `WHERE` an toàn, transaction (`BEGIN`/`COMMIT`/`ROLLBACK`), constraint (`PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `CHECK`, `NOT NULL`), kiểu dữ liệu, và truyền tham số bằng JDBC/JPA thay vì nối chuỗi SQL. Lúc đó mới kiểm tra được chuyện ghi sai, rollback, dữ liệu trùng hoặc thiếu. [Tài liệu PostgreSQL về transaction](https://www.postgresql.org/docs/current/tutorial-transactions.html) giải thích các bước ghi cùng thành công hoặc cùng hủy.

## Nhận diện, chưa cần học sâu ở giai đoạn này

- `FULL JOIN`, self join, `UNION`/`UNION ALL`, `ALL`/`ANY`, `SELECT INTO`, view: biết chúng tồn tại; học khi bài toán cần.
- Stored procedure, trigger, partitioning, replication, vendor-specific SQL Server/MS Access: chưa phải điều kiện để học BE rồi sang AI.
- `CREATE/DROP DATABASE`, backup, hosting, chứng chỉ SQL: không phải một chuỗi lesson bắt buộc. Schema, migration và vận hành sẽ học theo module tương ứng.
- Cú pháp SQL riêng của MySQL/SQL Server/MS Access: tránh học trộn với PostgreSQL đang dùng trong `shopcore`.

## Thứ tự của bạn lúc này

1. Hoàn thành Lesson 02 JOIN và bài kiểm tra của nó.
2. Học Lesson 03 -> 04 -> 05, tập trung đọc **ý nghĩa dữ liệu trả về**, không học thuộc danh sách lệnh.
3. Sang M2-2 mới thực hành ghi dữ liệu, transaction, parameter binding và constraint.

Không thay đổi điểm Lesson 01 hay trạng thái M2-1 chỉ vì cập nhật lộ trình.

Tài liệu gốc: [PostgreSQL SQL Tutorial](https://www.postgresql.org/docs/current/tutorial-sql.html), [Window Functions](https://www.postgresql.org/docs/current/tutorial-window.html), [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).
