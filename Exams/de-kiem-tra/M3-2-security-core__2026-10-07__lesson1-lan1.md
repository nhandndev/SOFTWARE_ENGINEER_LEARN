# M3-2 Security Core — Kiểm tra Lesson01

> LESSON:8×5=40đ; normalize /40×100; đạt từ34/40. Chấm ý nghĩa, không bắt thuộc mọi tên filter. Đáp án riêng __DAPAN.md, đọc sau khi làm. Các tình huống độc lập.

Giả định: Basic auth, account active; endpoint tồn tại; không CORS lỗi; GET không CSRF lỗi. GET products public, GET me cần authentication, GET admin/stats cầnADMIN. USER đúng có ROLE_USER, ADMIN đúng có ROLE_ADMIN; nếu tới Service thì nghiệp vụ thành công trừ câu nói khác.

## Câu 1 (5đ) — Hai việc khác nhau
Lan gửi password đúng nhưng chỉ có ROLE_USER khi gọi GET admin/stats. Authentication và authorization mỗi phần trả lời câu hỏi gì, phần nào thành công/thất bại? Status nào, Controller có chạy không?

**Trả lời:**

## Câu 2 (5đ) — Thêm security vào luồng cũ
Kể6–8 bước từ request tới MVC/Service, chỉ vị trí filter/proxy/chain, việc xác thực và kiểm quyền. Nếu Security từ chối trước DispatcherServlet thì RestControllerAdvice có tự xử lý không?

**Trả lời:**

## Câu 3 (5đ) — Basic và HTTPS
Authorization Basic Base64(username:password) có mã hóa bí mật không? Basic có tự cấp JWT/refresh token không? Header này được kiểm ở đâu trong flow; vì sao cần HTTPS và không log raw header?

**Trả lời:**

## Câu 4 (5đ) — Thiếu và sai credentials
GET me không credentials, GET me password sai, GET admin/stats user đúng nhưng thiếuADMIN: status từng case, lý do và loại handler Security tương ứng? Có case nào cần gọi Controller để tự kiểm password trước không?

**Trả lời:**

## Câu 5 (5đ) — SecurityContext
Authentication trước và sau kiểm chứng khác nhau thế nào? SecurityContext giữ gì, có phải User table hay response DTO không? Có được mặc định auth tồn tại mãi cho mọi request sau không?

**Trả lời:**

## Câu 6 (5đ) — PermitAll
GET products public, không credentials thì qua. Nhưng nếu gửi Basic password sai, có chắc vẫn200 vì permitAll không? PermitAll khác bỏ qua toàn security chain ở đâu, còn bảo vệ nào có thể tác động?

**Trả lời:**

## Câu 7 (5đ) — Chain và URL mới
Một SecurityFilterChain chỉ match /api/**, không có chain khác. /admin/stats ngoài /api có tự được bảo vệ không? Khi hai chain đều match một request có chạy cả hai không? Nêu vai trò bean chain, nó có tự tạo bảng User/password hash không?

**Trả lời:**

## Câu 8 (5đ) — Debug đúng tầng
ADMIN đã được Security cho qua GET detail Product999, Service ném AppException PRODUCT_NOT_FOUND. Đây là thiếu role hay business error, xử lý ở đâu? Nêu ba bằng chứng an toàn cần xem khi một request khác403 mà chưa rõ nguyên nhân; không dùng password/raw header làm log.

**Trả lời:**
