# Đáp án M3-4 · Lesson 02

8×5=40đ, đạt34/40; không chấm nhớ exact imports. Phải giữ giả định chain của đề.

| Câu | Rubric /5 |
|---|---|
| 1 | Client login vs RS validate API (2); client ID/secret/scope (1); secret env/store backend (1); BOM không pin Security 6 (1) |
| 2 | Start filter/redirect (2); callback filter/codeexchange (2); không cần Controller nhận email để tự xác thực (1) |
| 3 | Lưu request để khớp callback/state (2); mất request/session có thể fail (1); không tắt state vì mất ràng buộc callback với lượt login (2). Kiểm cookie/host/repository là hướng debug bổ sung, không vế bắt buộc ngoài câu hỏi. |
| 4 | Callback chain 2 (1); first match không cộng chain (1); API chain 1 (1); không Bearer 401 dù có session (2) |
| 5 | Host khác (1); port khác (1); redirect phải khớp console (1); prod HTTPS/baseURL proxy (1); forwarded headers chỉ proxy tin cậy (1) |
| 6 | Secret frontend lộ (1); tokens URL lộ history/log/referrer (2); secret env/store backend (1); không token trong URL, session/BFF/handoff an toàn (1) |
| 7 | Request not found→session (1); invalid_client→credential client (1); invalid_grant→code/redirect/verifier (2); log correlation/step khôngsecret (1) |
| 8 | Filter trước MVC không chắc Advice (2); OAuth failure handler (1); session cookie ambient CSRF (1); API assumption khác, không copy toànapp (1) |

## Câu 1

OAuth2 Client hỗ trợ app login/ủy quyền với provider; Resource Server kiểm Bearer gửi tới API. Config client-id, client-secret, scope openid/profile/email; secret env hoặc secret store backend. Theo BOM Boot 4, không pin Security 6 từ tutorial.

Ôn lesson 2 mục 1.

## Câu 2

Start URL được redirect filter dùng để tạo/lưu authorization request và redirect Google. Callback filter nhận code/state, tiếp tục kiểm/đổi code/authentication. Mặc định không cần Controller tự nhận JSON email để xác thực.

Ôn mục 2. Nói đúng trách nhiệm được điểm dù quên tên filter.

## Câu 3

Session giữ authorization request lượt đi để callback khớp đúng state/lượt khởi tạo. STATELESS toàn bộ/mất cookie có thể làm request not found. Giữ kiểm state; kiểm host/cookie/request repository/session setup, không bỏ ràng buộc bảo vệ callback.

Ôn mục 3.

## Câu 4

Callback không khớp /api/** nên vào browser chain 2. Chain đầu tiên khớp được chọn, không chạy cả hai cộng auth. /api/products vào chain 1; session browser không thay Bearer theo giả định, nên trả 401 nếu thiếu token.

Ôn mục 4. Cookie có mặt không đủ nếu chain không nhận cookie authentication.

## Câu 5

Host 127.0.0.1 khác localhost, port 9090 khác 8080; phải đăng ký URI gửi thực tế chính xác. Sau reverse proxy, kiểm scheme/host/base URL để tạo HTTPS callback đúng; forwarded header chỉ tin từ proxy kiểm soát, không cho client tự giả host.

Ôn mục 2. Không bắt cấu hình Nginx cụ thể.

## Câu 6

Client secret gửi JS không còn là secret backend. Token trong URL có thể vào history/log/referrer/ảnh chụp, nên không làm. Giữ secret trong env/store backend; chọn session/BFF hoặc handoff một lần có ràng buộc an toàn; không claim một redirect chứa raw token là giải pháp production.

Ôn mục 1 và 6; bài 3 giải thích lựa chọn tích hợp. Không yêu cầu xây handshake mới.

## Câu 7

Request not found kiểm session/cookie/host/request đã lưu. invalid_client kiểm client ID/secret/project/client authentication. invalid_grant kiểm code hết hạn/đã dùng, redirect URI, PKCE verifier nếu dùng. Log correlation ID, registration ID, bước/loại lỗi, không raw code/token/secret.

Phần 2đ invalid_grant: code 1đ, redirect/verifier 1đ. Ôn mục 5.

## Câu 8

Sai state có thể fail trong OAuth filter, không đi ControllerAdvice; dùng OAuth authentication failure handler theo thiết kế UX/API. Browser chain dùng session cookie tự gửi nên CSRF vẫn quan trọng. Header-only API có threat model khác, không copy disable toàn app.

Ôn mục 4 và 6. CORS không thay callback state hoặc CSRF.
