# M3-2 Security Core — Kiểm tra Lesson04

> LESSON: 8×5=40đ, normalize /40×100; đạt từ34/40. Tình huống độc lập, không cần implementation JWT/SPA/JUnit. Đáp án riêng __DAPAN.md. Không dùng khẩu hiệu stateless thay phân tích credentials.

## Câu 1 (5đ) — Nhớ authentication
Giải thích session-based auth nhớ danh tính qua request bằng gì, browser gửi gì, server giữ gì. STATELESS khác ở đâu? Có nghĩa toàn app không bao giờ tạo session hoặc request sau khỏi cần credentials không?

**Trả lời:**

## Câu 2 (5đ) — Cookie và CSRF
App dùng cookie auth tự gửi khi đủ điều kiện. Trang khác khiến browser gửi thao tác đổi dữ liệu. Attacker có cần đọc cookie/password/response mới gây hại được không? CSRF token thêm bằng chứng gì, CORS có thay thế bảo vệ CSRF không?

**Trả lời:**

## Câu 3 (5đ) — Stateless có đủ để disable?
So sánh ba case: (a) Basic trên browser có thể tự gửi credentials; (b) JWT nằm cookie tự gửi; (c) API chỉ chấp nhận bearer Authorization header do client chủ động gắn, không cookie/Basic auto auth. Case nào không được mặc định miễnCSRF, case nào có thể cân nhắc disable trong scope phù hợp? Case c có miễn XSS/HTTPS/CORS không?

**Trả lời:**

## Câu 4 (5đ) — ADMIN vẫn403
ADMIN đúng credentials gọi POST Product nhưng CSRF bật và token thiếu. Có thể403 trướcController không, có chắc do role thiếu không? PermitAll POST có tự bỏCSRF không? Nếu tự gửi X-CSRF-TOKEN:abc thì đủ chưa? Nêu hướng kiểm đúng, không tắt mọi bảo vệ.

**Trả lời:**

## Câu 5 (5đ) — Preflight
Frontend http://localhost:3000 gọi API http://localhost:8080 POST JSON có Authorization. Origin có giống nhau không? OPTIONS preflight hỏi gì, thường có credentials không, vì sao CORS cần xử lý trước auth? Request thật sau valid preflight có bỏ auth/CSRF không?

**Trả lời:**

## Câu 6 (5đ) — Chữa CORS config
Config allowedOrigins=["*"], allowCredentials=true; người viết chỉ permitAll OPTIONS mà không bật CORS integration trong Security. Chỉ ra vấn đề, sửa ý tưởng origin/method/header/source/integration; có nên mở mọi origin cho hết lỗi không? Không cần code full bean.

**Trả lời:**

## Câu 7 (5đ) — curl được, browser lỗi
curl đọc GET được nhưng JavaScript frontend báoCORS. Có chứng minh password/role sai không? Nêu ba bằng chứng cần kiểm. Nếu allow originfrontend rồi, một script server-client khác có bịCORS chặn như browser và mọi request từ originđó có tựauthenticated không?

**Trả lời:**

## Câu 8 (5đ) — Thiết kế phép kiểm tách nguyên nhân
Nêu ba phép kiểm: (1) kiểm USER thiếuADMIN bằng protected GET; (2) kiểm thiếuCSRF bằng ADMIN write; (3) kiểm valid preflight. Mỗi case ghi điều kiện giữ đúng, kết quả và Controller có chạy không. Vì sao “403 nên csrf.disable + permitAll mọiURL” không là sửa đúng?

**Trả lời:**
