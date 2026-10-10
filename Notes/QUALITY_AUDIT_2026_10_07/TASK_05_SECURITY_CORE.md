# Task 05 — Security Core

Đã đọc 4 lesson và toàn bộ 32 câu/rubric.

| Lesson | Điểm kiểm |
|---|---|
| 01 | Chain/proxy/filter trước MVC, authn/authz, context, permitAll, scope |
| 02 | User/Role schema, BCrypt/matches, prefix, UDS/provider, LAZY mapping |
| 03 | Dependency/BOM, first match, fallback, Basic entry points, JSON errors |
| 04 | Session/stateless, credential transport, CSRF, CORS/preflight, debug |

Không phát hiện lỗi cần sửa qua phần đã kiểm. Rule demo public chỉ GET; write cần ADMIN; prefix nhất quán; role không được lấy từ request. Basic demo giữ CSRF, không dùng STATELESS làm lý do tắt. Token cookie vẫn có threat model CSRF. CORS không thay auth/CSRF và permit OPTIONS không thay integration.

Các đề kiểm quyền đã cho CSRF/CORS hợp lệ; đề kiểm CSRF giữ credential/rule đúng, nên không nhập nhằng mọi 403. Writer dùng serializer thay ghép JSON và không lộ credentials. BCrypt phân biệt byte với ký tự; không encode lại để equals; entity không được public hóa hash.

Nguồn: [Security architecture](https://docs.spring.io/spring-security/reference/servlet/architecture.html), [CSRF](https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html), [CORS](https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html).

Giới hạn: chưa chạy Basic/CSRF/CORS browser matrix trong task này. Các snippet là cấu hình minh họa có profile/dependency, không phải production certification. Không pin Security6 vào Boot4 chỉ vì roadmap dùng tên phiên bản cũ.
