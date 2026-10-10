# Bài giải M4-4 · Lesson01

40đ; đạt từ34đ. Chấp nhận cách diễn đạt tương đương. Rubric chấm từng ý, không cần tên API nguyên văn nếu cơ chế đúng. [Quy tắc chung](../../Notes/M4_DevOps_Engineering/M4_4_Logging_Hexagonal/QUY_TAC_CHAM.md).

| Câu | Ý được điểm, tổng5 |
|---|---|
| 1 | SLF4J API (1); Logback implementation (1); appender đích (1); encoder định dạng (1); không thêm nhiều provider, nêu xung đột/cảnh báo (1) |
| 2 | Ba event shopcore bật (1); org.example chỉ WARN (1); giải thích override/inherit (2); prod ít ồn có mục tiêu (1) |
| 3 | 404 dự kiến không nhất thiết ERROR (1); thất bại sau retry (1); retry phục hồi (1); lý do theo tác động (1); bác mọi4xx=ERROR (1) |
| 4 | Java tính argument trước (2); guard hoặc lazy supplier phù hợp (1); không tự redaction/sanitize (1); event+ID tối thiểu (1) |
| 5 | Một owner phù hợp (1); bỏ log trùng (1); không cần catch chỉ để log mọi tầng (1); nhận diện throwable/cause chứa secret (1); kiểm/redact hoặc metadata an toàn (1) |
| 6 | Nuốt lỗi/null làm sai flow/status (2); throw/propagate rồi handler phù hợp (1); response an toàn có ID (1); log chi tiết được kiểm soát không trả stack ra client (1) |
| 7 | Không raw token/prompt/completion/DTO (2); metadata an toàn (1); hai biện pháp vận hành (1); JSON không redaction (1) |
| 8 | INFO có created, không details (1); kiểm level/event/ID (1); kiểm owner log một lần (1); kiểm secret với dữ liệu giả (1); không chứng minh collector bằng appender test (1) |

## Câu 1 - Vai trò

SLF4J cung cấp Logger API. Logback xử lý event và mức; appender chọn console/file, encoder định dạng. Starter đã có backend; nhiều provider gây cấu hình mơ hồ/cảnh báo, không tăng đảm bảo. Thiếu encoder chỉ0đ ý encoder, không xóa điểm các vai trò đúng.

## Câu 2 - Effective level

ProductService kế thừa DEBUG từ package: DEBUG/INFO/ERROR đều bật. Client không override: DEBUG tắt, WARN bật. Root không tự phủ quyết level riêng ở child trong tình huống này. Prod root INFO, package INFO hoặc mức có chủ đích; chỉ bật DEBUG hẹp khi cần, có thời hạn. Appender filter có thể chặn thêm nhưng đề đã loại biến số đó.

## Câu 3 - Severity

404 dự kiến có thể DEBUG hoặc không log; timeout hết retry khiến feature thất bại có thể ERROR; phục hồi sau retry có thể WARN/INFO theo policy. Chấp nhận mức khác nếu giải thích được tần suất/tác động và không đánh đồng mọi4xx với hệ thống hỏng. Không có một bảng mức đúng tuyệt đối cho mọi tổ chức.

## Câu 4 - Argument

Java gọi hàm tính chi tiết trước khi vào logger. Bọc phần tính tốn kém trong `isDebugEnabled()` hoặc supplier được logging API hỗ trợ. `{}` không che JWT/escape mọi input. Ví dụ `event=product_created productId=10`, không dump DTO; requestId bổ sung ở Lesson02. Không bắt học viên biết fluent API ở câu này.

## Câu 5 - Owner và throwable

Chọn Advice làm owner cho lỗi MVC bất ngờ, hoặc một boundary có trách nhiệm tương đương; bỏ bản lặp ở Service/Repository. Các tầng vẫn propagate/translate khi thật sự cần contract. Throwable cuối giữ stack nhưng message/cause có thể chứa secret. Đánh giá dữ liệu, redaction kiểm được và sink truy cập hạn chế; dùng error classification an toàn khi không thể bảo đảm throwable sạch. Chỉ nói “log nội bộ nên an toàn” không đạt hai ý bảo mật.

## Câu 6 - Đừng nuốt lỗi

Log không thay return/throw. Return null có thể khiến Controller trả200 hoặc lỗi khác khó hiểu. Để exception đi lên, Advice thích hợp map status/body; filter/Security có boundary riêng. Client nhận mã/message an toàn và ID; log nội bộ có chi tiết kiểm soát để điều tra, không expose stack/secret trong response.

## Câu 7 - Provider

Không mặc định ghi token, raw prompt/completion hay DTO đầy đủ. Ghi operation/provider alias được duyệt, duration, outcome/error classification và requestId. Hạn chế quyền đọc, đặt retention/rotation/giới hạn volume. JSON là cách encode, không làm thông tin nhạy cảm biến mất. Hai biện pháp vận hành hợp lý được trọn ý1đ.

## Câu 8 - Bằng chứng

Gắn appender thu event: effective INFO chỉ có created; kiểm INFO, tên event, productId10. Test lỗi tại owner chỉ ghi một lần và dữ liệu giả nhạy cảm không bị xuất. Appender test chưa chứng minh collector ingest/index, quyền đọc hay retention production. Test không throw chưa chứng minh nội dung log đúng.

Ôn lại Lesson01 mục2–7, đặc biệt phân biệt định dạng với bảo mật và log với xử lý lỗi.
