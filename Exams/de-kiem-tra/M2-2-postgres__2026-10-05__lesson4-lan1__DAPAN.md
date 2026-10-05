# Đáp án và rubric M2-2 - Lesson 04

> Chấm theo **ý nghĩa**, không bắt thuộc tên class hoặc cú pháp Java. Tổng 40 điểm thô. Chỉ chấm kiến thức được hỏi, không trừ vì chưa triển khai DB thật. Mỗi câu độc lập.

## Câu 1 (5đ)

- 2đ: đọc được `jdbc:postgresql` là JDBC URL cho PostgreSQL/driver, `localhost` là host, `5432` là port, `shopcore` là tên database (mỗi ý 0.5đ).
- 2đ: cần driver pgJDBC trên classpath và thông tin xác thực hợp lệ (`user/password`); app cần đường lấy connection/DataSource tương ứng.
- 1đ: DB không lắng nghe tại host/port là nhóm lỗi kết nối/connection refused, không phải SQL syntax.

## Câu 2 (5đ)

- 2đ: cần starter Data JPA nếu muốn dùng `JpaRepository` (hoặc hạ tầng truy cập DB phù hợp cho JDBC); Web MVC không cung cấp JPA Repository.
- 2đ: cần PostgreSQL JDBC driver để Java nói chuyện với PostgreSQL; starter và driver khác vai trò.
- 1đ: YAML chỉ cung cấp cấu hình, không tự tải dependency hay tự tạo database.

## Câu 3 (5đ)

- 2đ: B dùng placeholder `?` và `setString`, giữ `sku` là giá trị dữ liệu.
- 2đ: A nối input vào cấu trúc SQL; dấu nháy có thể làm hỏng cú pháp hoặc đổi nghĩa query (SQL injection).
- 1đ: chỉ kiểm tra frontend không đủ; backend phải bind giá trị và áp dụng validation/quyền cần thiết.

## Câu 4 (5đ)

- 1đ: derived query `findBySku` nhận `sku` làm tham số, không phải tự nối SQL string.
- 1đ: `:sku` với `@Param` là tham số có tên.
- 1đ: `Product` trong JPQL là entity, `p.sku` là property.
- 1đ: placeholder bind **giá trị**, không tự biến `"price DESC"` thành identifier/hướng `ORDER BY`.
- 1đ: giới hạn/whitelist field và direction được phép, dùng API sort phù hợp.

## Câu 5 (5đ)

- 1đ: PostgreSQL/sequence gắn identity cấp ID khi không truyền `id`.
- 2đ: identity riêng nó không bảo đảm unique; explicit insert/sequence reset có thể tạo trùng nếu không có constraint.
- 1đ: `BY DEFAULT` cho phép ID tường minh.
- 1đ: cần `PRIMARY KEY` hoặc `UNIQUE` để cưỡng chế duy nhất.

## Câu 6 (5đ)

- 2đ: không khẳng định B sẽ nhận lại số A đã lấy; sequence advance không rollback theo row data, có thể có gap.
- 1đ: `max(id)+1` có rủi ro race khi hai transaction đồng thời và không nên tự cấp ID kiểu này.
- 2đ: độ liên tục của ID không biểu diễn số dòng/transaction thành công; dùng `COUNT`/truy vấn thích hợp nếu cần đếm và để DB cấp ID.

## Câu 7 (5đ)

- 2đ: `UPDATE` tạo phiên bản mới; bản cũ có thể cần cho transaction đang đọc theo MVCC/visibility.
- 2đ: VACUUM dọn/tái sử dụng phiên bản đã chết khi an toàn, autovacuum tự động làm bảo trì định kỳ/khi cần.
- 1đ: không phải mỗi UPDATE phải gọi VACUUM thủ công ngay; autovacuum thường đảm nhiệm.

## Câu 8 (5đ)

- 2đ: `VACUUM`/`VACUUM FULL` không hoàn tác UPDATE đã commit và không phục hồi giá cũ; rollback chỉ áp dụng cho transaction còn có thể hủy trước commit (phục hồi sau commit cần cách khác, ngoài phạm vi bài).
- 1đ: VACUUM dọn các phiên bản cũ có thể dọn, không phải sửa giá trị nghiệp vụ.
- 1đ: VACUUM thường chủ yếu giúp tái sử dụng chỗ trong bảng, không bảo đảm file thu nhỏ ngay.
- 1đ: `VACUUM FULL` là thao tác nặng, yêu cầu khóa mạnh, không chạy tùy tiện/thường xuyên như giải pháp mặc định.

## Khi chấm lại

Nêu **từng câu**: học viên nói đúng gì, thiếu hoặc sai gì, cách giải thích đúng và điểm tương ứng. Tạo snapshot trong `Exams/nhan-xet/` theo quy trình repo. Không tự đổi trạng thái module chỉ vì đã đọc xong lesson.

## Nguồn kiểm chứng

- [pgJDBC connection](https://jdbc.postgresql.org/documentation/use/)
- [Spring Boot SQL databases](https://docs.spring.io/spring-boot/reference/data/sql.html)
- [Spring Data JPA query methods](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html)
- [PostgreSQL identity columns](https://www.postgresql.org/docs/current/ddl-identity-columns.html)
- [PostgreSQL sequence functions](https://www.postgresql.org/docs/current/functions-sequence.html)
- [PostgreSQL routine vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html)
