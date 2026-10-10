# Đáp án M3-4 · Lesson 01

8×5=40đ, đạt34/40. Chấm vai trò/ngữ nghĩa, không bắt tên mọi endpoint provider.

| Câu | Rubric /5 |
|---|---|
| 1 | Owner là user (1); client backend shopcore (1); AS Google (1); RS Google API/UserInfo (1); browser không luôn là client (1) |
| 2 | Shopcore OAuth client với Google (2); Resource Server với API local (1); token audience/issuer khác (1); không hoán đổi tùy tiện (1) |
| 3 | OAuth2 ủy quyền (1); OIDC xác thực trên OAuth2 (1); JWT định dạng (1); access không bắt buộc JWT (1); openid (1) |
| 4 | Code đổi token ngắn hạn một lần (2); ID token cho client xác thực (1); access gọi RS theo scope (1); code không làm Bearer API (1) |
| 5 | Không dùng trực tiếp (1); aud/issuer contract khác (2); Google access token cho Google scope/API (1); local role do shopcore (1) |
| 6 | Bắt đầu và redirect Google (1); Google auth/callback code-state (1); backend đổi code (1); password tại Google, secret backend (1); validate/map trước local login (1) |
| 7 | state callback-request (1); nonce ID token-request (1); PKCE code-verifier (1); không thay nhau (1); verify PKCE config/request (1) |
| 8 | Signature/trusted key (1); issuer/audience/time/nonce thích hợp (2); issuer+sub (1); local policy không auto ADMIN email (1) |

## Câu 1

Bạn là owner; backend shopcore là client; Google authorization server xác thực/cấp code-token; Google API/UserInfo là resource server. Browser vận chuyển redirect, không nhất thiết là OAuth client đăng ký.

Ôn lesson 1 mục 2. Gọi Google chung chung được phần AS, nhưng cần phân biệt endpoint tài nguyên để đủ điểm RS.

## Câu 2

Shopcore là client trong quan hệ xin Google identity/data; là Resource Server khi nhận access JWT dành cho API shopcore. Hai hợp đồng token khác issuer/audience/scope, không lấy Google token thay local JWT chỉ vì đều tên token.

Ôn mục 2–3.

## Câu 3

OAuth2 ủy quyền truy cập tài nguyên; OIDC bổ sung xác thực danh tính; JWT là định dạng claims token. Access token OAuth2 có thể opaque, không bắt buộc JWT. Scope openid mở OIDC request.

Ôn mục 1 và3. “OAuth là login Google” chưa đủ phân biệt.

## Câu 4

Code được backend đổi tại token endpoint, ngắn hạn một lần, không gọi API như Bearer. ID token dành client kiểm kết quả xác thực. Access token dành resource server tương ứng theo scope; không mặc nhiên chứa local roles.

Ôn mục 3–4.

## Câu 5

Không theo contract đề: Google ID token aud client ID và issuer Google, không phải local issuer/aud shopcore-api. Google access token phục vụ Google resource theo scope. ADMIN shopcore do policy/DB nội bộ cấp sau mapping.

Ôn mục 3 và6. Không trả lời “decode lấy sub rồi cho API qua” như phương án tương đương.

## Câu 6

Browser mở endpoint bắt đầu; backend lưu request rồi redirect Google; user auth/consent ở Google; callback qua browser mang code/state; backend kiểm liên kết và đổi code server-to-server cùng credential client thích hợp; validate OIDC/map local trước login thành công. Password Google không qua shopcore, client secret không qua frontend.

Ôn mục 4.

## Câu 7

state gắn callback với request/lượt khởi tạo; nonce gắn ID token với OIDC request; PKCE gắn code với verifier client giữ. Không thay nhau; mục tiêu bổ sung. Confidential client phải kiểm cấu hình và request challenge thay vì đoán mặc định mọi phiên bản.

Ôn mục 5. Không yêu cầu thuộc thuật toán challenge S256 trong câu này.

## Câu 8

Decode không validate. Dùng thư viện OIDC kiểm signature/key tin cậy, issuer, audience client ID, thời gian và nonce/ràng buộc liên quan. Dùng issuer+sub làm identity. Role nội bộ do shopcore; đuôi email không tự là ADMIN.

Phần 2đ claims: issuer/aud 1đ, thời gian/nonce phù hợp 1đ. Ôn mục 6 và bài 3 sau đó.
