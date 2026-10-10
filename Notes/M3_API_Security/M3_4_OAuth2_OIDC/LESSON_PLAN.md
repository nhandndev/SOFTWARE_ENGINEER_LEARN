# Kế hoạch M3-4

| Checklist roadmap | Bài | Câu kiểm tra |
|---|---|---|
| Bốn vai trò OAuth2 | 1 | 1, 2 |
| OAuth2 khác OIDC, ID token | 1 | 3–5 |
| Code flow, state/nonce/PKCE | 1 | 6–8 |
| Spring OAuth2 Login flow | 2 | 1–4 |
| Client secret, redirect URI | 2 | 5–8 |
| Map Google → User nội bộ | 3 | 1–5 |
| Kết hợp với session/JWT và xử lý lỗi | 3 | 6–8 |

Kiến thức nối M3-3: local access JWT có audience của shopcore; Google ID token có audience là OAuth client; không hoán đổi token. Dùng provider đáng tin không bỏ được quy tắc phân quyền nội bộ.

Không dạy mobile native flow, xây authorization server, mọi grant OAuth, hay tự phát minh SSO. Chỉ nhận diện PKCE và bảo vệ callback đủ để đọc cấu hình an toàn.

Deliverable vẫn là Google Login và ánh xạ User trong shopcore. Bộ bài không xác nhận đã có Google project, credentials, callback chạy hoặc tài khoản thật.
