# M3-4 OAuth2/OIDC · Lesson 03 · Lần 1

PHONG_VAN theo lesson 8×5=40đ, đạt34/40, 30–40  phút. Google identity đã được OIDC library validate. Local roles/status do shopcore quản lý. Có unique(issuer,sub), không auto-link chỉ theo email.

## Câu 1 - Identity đổi email

Lần1 issuer=Google,sub=abc,email=a@example.com map user42. Lần2 cùng issuer/sub, email đổi b@example.com. Map user nào và vì sao? Khóa DB nào cần unique?

**Trả lời:**

## Câu 2 - Trùng email

Identity Google mới có email trùng local password user42 nhưng chưa có mapping. Có tự gắn vào42 không, kể cả email_verified=true? Nêu flow linking bảo vệ ownership.

**Trả lời:**

## Câu 3 - Google pass nhưng local disabled

Mapping trỏ tới local user disabled. Có cấp local token/session không? Local ADMIN lấy từ đâu? Email đuôi công ty hay Google scope có quyết định ADMIN không?

**Trả lời:**

## Câu 4 - User Google có password không?

Thiết kế tối thiểu User, ExternalIdentity và local credential. Google-only user có nên được tạo password cố định giả không? Request/response có lộ provider token/passwordHash không?

**Trả lời:**

## Câu 5 - Mapping race và principal

Hai callback cùng issuer/sub lần đầu. Cần transaction/constraint gì? Chỉ lưu local role vào DB nhưng Authentication vẫn giữ role cũ có đủ chưa? Nêu vị trí tích hợp Spring phù hợp.

**Trả lời:**

## Câu 6 - Hai thiết kế kết quả login

So sánh local browser session và cấp local JWT sau Google Login. Nếu API chỉ nhận local Bearer, session Google hoặc ID token Google có đủ không? Cách giao token nào không được dùng?

**Trả lời:**

## Câu 7 - Logout khỏi đâu?

Phân biệt local session logout/revoke refresh, Google browser session và Google consent/token revocation. Access JWT local còn hạn có tự mất hiệu lực không?

**Trả lời:**

## Câu 8 - Test và bằng chứng

Nêu bốn case kiểm policy mapping khác nhau; oidcLogin() mock chứng minh và không chứng minh gì? Cần bước nào trước khi claim Google integration thật đã chạy?

**Trả lời:**
