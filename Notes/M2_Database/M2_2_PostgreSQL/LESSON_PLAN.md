# Kế hoạch M2-2: PostgreSQL thực chiến

| Lesson | Trọng tâm | Sau bài này bạn cần làm được |
|---|---|---|
| 01. Kiểu dữ liệu & constraint | `NUMERIC`, `TIMESTAMPTZ`, `UUID`, `JSONB`; PK/FK/UNIQUE/NOT NULL/CHECK; identity | Đọc một `CREATE TABLE`, dự đoán dữ liệu nào DB chấp nhận/từ chối và vì sao |
| 02. Ghi dữ liệu an toàn | `INSERT`, `UPDATE`, `DELETE`, `WHERE`, `RETURNING` | Viết thao tác ghi có điều kiện, không sửa/xóa nhầm toàn bảng; kiểm tra số dòng bị tác động |
| 03. Transaction | `BEGIN`, `COMMIT`, `ROLLBACK`; nhiều bước cùng thành công hoặc cùng hủy; `@Transactional` | Trace điều gì còn trong DB khi bước 2 thất bại |
| 04. App kết nối DB | JDBC URL/driver, parameter binding qua JDBC/JPA, nhận diện sequence và autovacuum | Giải thích vì sao không nối input vào SQL; đọc config kết nối và nêu vai trò vận hành cơ bản |

**Phạm vi học hiện tại:** từng lesson + bài kiểm tra, ví dụ SQL nhỏ; không giao capstone. Bài thi module/deliverable chỉ thực hiện nếu bạn chủ động muốn quay lại. Không đổi tiêu chí gốc trong roadmap chỉ vì mở lesson.

Thứ tự này nối tiếp M2-1: trước tiên xác định **dữ liệu hợp lệ**, rồi học **cách ghi**, sau đó là **nhiều bước ghi**, cuối cùng mới nối ứng dụng Java vào PostgreSQL.
