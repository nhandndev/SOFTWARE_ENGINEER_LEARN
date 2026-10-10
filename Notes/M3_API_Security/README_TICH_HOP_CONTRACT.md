# Ghép các ví dụ M3 vào cùng shopcore

> Các lesson cô lập một vấn đề để dễ học; không thay nguyên cấu hình của module trước bằng một đoạn demo rồi mặc định mọi tính năng vẫn còn.

## 1. Một đường dẫn, nhiều nơi phải cùng khớp

M3-1 chọn prefix version cho API nghiệp vụ, ví dụ `/api/v1/products`. Một số tình huống M3-2 đến M3-5 dùng tên ngắn `/api/products` hoặc `/api/shipping/quote` để tập trung vào Security/client. Đó là đường dẫn của tình huống, không phải yêu cầu bỏ version của ứng dụng.

Khi tích hợp, thống nhất đồng thời:

1. Controller mappings và URL client gọi.
2. `securityMatcher` chọn chain và `requestMatchers` chọn quyền trong chain.
3. Spec OpenAPI, examples, curl và kiểm tra regression.

Ví dụ DELETE đổi thành `/api/v1/products/10` thì rule riêng cho ADMIN phải khớp `/api/v1/products/**`. Rule cũ `/api/products/**` không khớp; nếu fallback chỉ `authenticated()`, USER có thể lọt qua quyền dự định. Rule `/api/**` rộng vẫn chọn chain nhưng không thay được rule ADMIN đã lệch đường dẫn. Kiểm cả USER bị 403 và ADMIN được phép, không chỉ happy path.

Không tự thêm `/api/v1` vào `/oauth2/authorization/google`, `/login/oauth2/code/google`, `/swagger-ui/**` hay `/v3/api-docs`: đây là endpoint framework, có quy ước riêng. Nếu muốn đổi chúng, phải cấu hình thành phần tương ứng và callback/provider, không chỉ đổi một matcher.

## 2. JWT, refresh và OAuth phải giữ quyền cũ

- Khi thêm OAuth browser chain, API chain vẫn phải giữ validation JWT, rule ADMIN và policy CSRF tương ứng cách truyền credential. Chain đầu tiên khớp sẽ xử lý; chain sau không cộng thêm rule cho request đó.
- Endpoint refresh không nên bắt access token còn hạn, nhưng vẫn phải xác thực refresh token, kiểm expiry/revocation và rotation tại AuthService. `permitAll()` chỉ bỏ yêu cầu authorization cho route đó, không bỏ các filter hay biến refresh thành vô điều kiện.
- Không gửi access token đã hết hạn kèm request refresh nếu Bearer filter sẽ từ chối nó trước Controller.
- Session OAuth và access JWT local là hai cách biểu diễn đăng nhập khác nhau. Google ID token không tự trở thành access token cho shopcore.

## 3. Một hợp đồng lỗi khi trả HTTP

M3-1 chọn ProblemDetail. Các ví dụ client có `code`/`message` hoặc DTO lỗi nhỏ nhằm minh họa việc phân loại provider error thành lỗi của ứng dụng, không bắt thay hợp đồng lỗi đã có.

Khi tích hợp: Service/client ném lỗi đã phân loại; Advice dựng ProblemDetail với status/type/title/detail theo policy, có thể thêm extension `code`. Không trả raw provider body, credential hoặc stack trace. Schema OpenAPI phải mô tả body thực tế, không lấy DTO success cho response lỗi.

Lỗi Security xảy ra trước MVC thường cần AuthenticationEntryPoint/AccessDeniedHandler riêng. Nếu cần body lỗi đồng nhất, các handler này cũng serialize cùng contract an toàn; chỉ thêm Advice không bao hết FilterChain. Không ép mọi lỗi thành AppException và không mặc định lỗi kỹ thuật đều là 400.

## 4. Phiên bản và mức kiểm chứng

Đọc BOM/POM hiện tại trước khi lấy dependency. Code compile riêng trên một phiên bản Spring chỉ chứng minh cú pháp/API ở phiên bản đó, chưa chứng minh Boot app, filter chains, OAuth callback hoặc springdoc hoạt động chung.

Trình tự kiểm tối thiểu: build app thực → gọi route public/USER/ADMIN → token sai/hết hạn → refresh → error body → export spec so với HTTP. Với OAuth cần thêm browser/callback và tài khoản provider thử. Các đề đã phát hành giữ nguyên giả định URL của từng câu; ghi chú này không tạo tiêu chí chấm ngầm mới.
