# M3-4 OAuth2/OIDC · Lesson 02 · Lần 1

PHONG_VAN theo lesson 8×5=40đ, đạt34/40, 30–40  phút. Dùng default Google registration; hai chain như lesson: /api/** stateless Bearer trước, browser IF_REQUIRED sau. Không cần credentials thật.

## Câu 1 - Dependency và config

OAuth2 Client starter khác Resource Server starter thế nào? Nêu ba mục config Google cần trong bài và giữ client secret ở đâu. Có pin Security6 vào Boot4 không?

**Trả lời:**

## Câu 2 - Hai URL

Ai xử lý /oauth2/authorization/google và /login/oauth2/code/google? Có cần viết Controller nhận email cho callback không? Kể tác dụng mỗi URL.

**Trả lời:**

## Câu 3 - Session để làm gì?

Vì sao OAuth2 Login mặc định giữ authorization request trong session? Ép STATELESS toàn bộ có thể gây lỗi nào và tại sao không bỏ kiểm state để chữa?

**Trả lời:**

## Câu 4 - First matching chain

Chain1 @Order(1) securityMatcher("/api/**") stateless JWT; chain 2 @Order(2) browser oauth2Login. /login/oauth2/code/google vào chain nào? Browser có session Google login rồi gọi /api/products không Bearer có pass không?

**Trả lời:**

## Câu 5 - Redirect mismatch

Console đăng ký http://localhost:8080/login/oauth2/code/google, app gửi http://127.0.0.1:9090/login/oauth2/code/google. Sai gì? Production sau reverse proxy còn kiểm gì?

**Trả lời:**

## Câu 6 - Giữ credential

Dev đưa client secret vào JavaScript và redirect frontend kèm access/refresh trong query để debug. Nêu rủi ro và cách giữ secret/truyền kết quả login an toàn hơn ở mức thiết kế.

**Trả lời:**

## Câu 7 - Chẩn đoán lỗi

authorization_request_not_found khác invalid_client và invalid_grant thế nào về bước cần kiểm? Nêu thông tin log hữu ích nhưng không log credential/token/code.

**Trả lời:**

## Câu 8 - Error handler và CSRF

Sai state trong callback có chắc đi vào ControllerAdvice/AppException JSON không? Handler nào phù hợp? Vì sao browser chain không copy csrf.disable từ header-only API chain?

**Trả lời:**
