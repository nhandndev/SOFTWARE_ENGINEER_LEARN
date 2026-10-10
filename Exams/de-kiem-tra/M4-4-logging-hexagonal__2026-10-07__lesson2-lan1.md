# M4-4 · Lesson02 · RequestId và MDC

**PHONG_VAN theo lesson · 8×5=40đ · 35–50 phút · đạt từ34/40.** Trả lời bằng lời/pseudocode. Chấm cơ chế và hậu quả, không bắt thuộc API. Điểm quy đổi=điểm thô/40×100. Scope request synchronous trừ câu nêu rõ async/error.

## Câu 1 - Hai request xen kẽ (5đ)

Log A/B xen nhau trên các thread xử lý. RequestId/MDC giúp phân biệt thế nào? MDC gắn với gì, vì sao Service cùng thread không cần nhận ID qua mọi method? RequestId có dùng để xác thực hoặc tự thành distributed tracing không?

**Trả lời:**

## Câu 2 - Thread được tái sử dụng (5đ)

Filter đặt A, chain kết thúc hoặc throw; Tomcat dùng lại thread cho B. Nêu vị trí cleanup, thao tác với key requestId khi có/không có previous value, lý do không clear toàn MDC và hậu quả nếu bỏ cleanup.

**Trả lời:**

## Câu 3 - Nhận header của client (5đ)

Theo chính sách mẫu: không có header, một header `demo_A`, chuỗi dài100ký tự, hai header ID khác nhau sẽ xử lý thế nào? Vì sao cần allowlist/giới hạn và vì sao ID hợp lệ vẫn không phải bằng chứng tin cậy về danh tính?

**Trả lời:**

## Câu 4 - Log401 thiếu ID (5đ)

RequestIdFilter đang chạy sau Security nên request bị từ chối trước nó. Sửa thứ tự thế nào, ai trả401/403, và vì sao không vừa đăng ký filter qua FilterRegistrationBean vừa add vào Security chain? Nêu cách kiểm order thật thay vì chỉ tin annotation.

**Trả lời:**

## Câu 5 - AppException và lỗi filter (5đ)

So sánh AppException trong Service với exception chưa xử lý từ một filter downstream. Advice có bắt cả hai không? Trong xử lý synchronous bên trong chain, khi Advice log thì MDC còn không? Finally của RequestIdFilter có phải là nơi đổi mọi lỗi thành500 không?

**Trả lời:**

## Câu 6 - CompletableFuture thiếu ID (5đ)

Request thread có ID nhưng task executor không có. Giải thích; mô tả capture/install/run/restore context trên worker và vì sao không để nguyên MDC cũ trên worker sau task. Không cần viết TaskDecorator.

**Trả lời:**

## Câu 7 - OncePerRequestFilter và ERROR dispatch (5đ)

Một đồng nghiệp nói tên class bảo đảm ID có trong mọi ASYNC/ERROR dispatch. Chỉ ra giới hạn của sample/default, rủi ro của cách bỏ cleanup để “giữ ID”, và việc cần thiết trước khi cam kết ID cho tất cả response lỗi.

**Trả lời:**

## Câu 8 - Kiểm filter không chỉ happy path (5đ)

Mô tả5phép kiểm: header hợp lệ và response ID; request sau không header; chain throw; giữ key khác/previous value; header sai/trùng. Phân biệt kiểm giả lập filter với kiểm Security/container thật.

**Trả lời:**
