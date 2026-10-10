# M3-2 — Kế hoạch và coverage

Nguồn: Module3-2 trong roadmap và nền M1-1/M1-3/M1-4/M3-1. Không sửa roadmap/tiến độ. Tài liệu chuẩn bị để học sau M3-1.

| Checklist | Nơi học | Nơi kiểm |
|---|---|---|
| Authentication vs authorization | L01 mục1–5 | L01 câu1–6 |
| SecurityFilterChain, không adapter cũ | L01 mục2/6, L03 mục1–4 | L01 câu7–8; L03 câu1–5 |
| UserDetailsService/password BCrypt | L02 mục2–7 | L02 câu1–8 |
| Entity User/Role | L02 mục1/5–6 | L02 câu1/5–7 |
| CSRF/CORS/stateless | L04 mục1–8 | L04 câu1–8 |
| Security errors nối REST contract | L01 mục4, L03 mục5–7 | L03 câu6–8 |

## Từng buổi

1. Ai đứng trước Controller; phân biệt identity/permissions; dự đoán case GET không có/sai/đúng credentials.
2. Dữ liệu User/Role, lưu hash và nạp principal; đọc code mapping authorities, không viết auth bằng if password.equals.
3. Một chain theo URL/method, first match, deny-by-default, role prefix và handler401/403. Có bảng case end-to-end để hiểu; chưa tuyên bố chạy thật.
4. Cùng một lỗi403 có thể là thiếu role hoặc CSRF; phân biệt browser preflight/auth/CSRF. Session/cookie và Authorization header có threat model khác nhau.

Ngoài phạm vi: JWT/refresh, OAuth2/OIDC, method security sâu/ACL, tự viết custom JWT filter, production user lifecycle đầy đủ, rate limit. Chỉ nhận diện ownership/tenant để không hiểu nhầm hasRole giải quyết mọi truy cập dữ liệu; không đòi thiết kế ACL.

Đề đủ dữ kiện, mỗi tình huống độc lập; riêng bảng case authorization phải nói rõ CSRF/CORS đã hợp lệ để không chấm sai nguyên nhân. Chỉ nhận diện vài tên lớp cần tra, không yêu cầu thuộc thứ tự toàn bộ filter.
