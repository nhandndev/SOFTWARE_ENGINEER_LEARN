# Task 07: OAuth2 / OIDC

Đã đọc 3 lesson và toàn bộ 24 câu/đáp án/rubric.

| Lesson | Trọng tâm kiểm từng nhóm câu |
|---|---|
| 01, câu 1–8 | OAuth/OIDC; bốn vai trò; code flow; state; nonce; PKCE; ID/access token; callback/secrets |
| 02, câu 1–8 | Starter/config; redirect URI; session state; scopes; chains; profile/secrets; provider errors; chạy thử |
| 03, câu 1–8 | issuer+sub; email linking; local account; role; disabled user; session/JWT; provisioning; kiểm tích hợp |

## Lỗi và sửa

- **P1, Lesson 02:** ví dụ API chain khi thêm OAuth bỏ mất rule DELETE Product cần ADMIN của JWT lesson trước. Khôi phục rule trước fallback authenticated. Đây là regression quyền, không chỉ thiếu một dòng minh họa.
- **P2, rubric Lesson 02 câu 3:** đề hỏi vai trò session/state, nhưng dành điểm riêng cho các bước debug không hỏi. Chuyển điểm về giải thích vì sao giữ state; debug cookie/host/repository là hướng bổ sung.
- Thêm ghi chú tích hợp chung để rule `/api/products/**` không bị mang nguyên sang Controller `/api/v1/products/**` rồi vô tình rơi vào fallback USER.

## Các ranh giới đúng đã kiểm

Authorization code được đổi token ở back channel; state/nonce/PKCE không đồng nghĩa nhau. Khóa định danh dùng issuer+sub, không tự link tài khoản chỉ vì email trùng. Provider không tự cấp role ADMIN local; disabled local user vẫn bị từ chối. Google ID token không phải access JWT local. Session browser chain khác stateless API chain; policy CSRF theo cách truyền credential.

## Bằng chứng và giới hạn

Snippet Security đã compile chung với JWT. Chưa dùng Google credential thật, chưa chạy browser callback, consent hoặc account-link DB race. Không báo OAuth end-to-end đã pass chỉ từ compilation.

Nguồn: [Google OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect), [OAuth2 Login](https://docs.spring.io/spring-security/reference/servlet/oauth2/login/core.html).

Kết luận: coverage đủ scope roadmap Google Login/account mapping; cần integration khi triển khai thực, không mở thêm authorization server hay quản trị identity enterprise.
