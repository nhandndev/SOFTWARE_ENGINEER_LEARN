# Kế hoạch M3-3

| Checklist roadmap | Bài chịu trách nhiệm | Bằng chứng trong đề |
|---|---|---|
| Header/payload/signature | 1 | 1–3 |
| Kiểm signature, issuer, audience, thời gian | 1 | 4–8 |
| Register/login, JWT stateless | 2 | 1–8 |
| Access/refresh token | 3 | 1–8 |
| USER/ADMIN, @PreAuthorize | 4 | 1–4 |
| @WithMockUser, MockMvc token | 4 | 5–8 |

M3-2 là nền authentication/authorization, password encoder và filter chain. Không dạy lại toàn bộ MVC. M3-4 tiếp nối bằng danh tính ngoài hệ thống; không đồng nhất JWT với Google Login.

Kiến thức bổ sung cần thiết để không hiểu sai: access JWT không tự bị thu hồi khi logout; refresh cần trạng thái; role trong token có thể cũ; jwt() trong test không chứng minh chữ ký thật; tắt CSRF phụ thuộc cơ chế gửi credential.

Không triển khai hệ thống cấp quyền OAuth đầy đủ, introspection, DPoP, custom crypto hoặc đa tenant. Các phần này chỉ nhận diện nếu gặp trong tài liệu ngoài.

Deliverable roadmap vẫn là register/login/refresh + role + test trong shopcore; tài liệu không ghi nhận deliverable đã có.
