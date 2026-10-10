# Đáp án M3-3 · Lesson 01

8×5=40đ; đạt34/40. Chấm ý tương đương, không trừ lỗi gõ/import. Chỉ tính ý có bằng chứng; bảng là toàn bộ tiêu chí, không có điều kiện pass ẩn.

| Câu | Rubric /5 |
|---|---|
| 1 | Header metadata (1); payload claims (1); signature tính trên header.payload đã encode (2); decode đọc được nhưng chưa tin (1) |
| 2 | Ký không giấu dữ liệu (2); không đưa passwordHash/secret (1); bearer bị cầm có thể replay (1); HTTPS/giới hạn TTL/không log (1) |
| 3 | Private ký, public kiểm (2); public không cấp chữ ký (1); restart đổi key ảnh hưởng token cũ tùy việc verifier còn tin key cũ hay không (2) |
| 4 | Từ chối vì audience sai (2); 401 (1); trước Controller (1); signature đúng chưa đủ điều kiện sử dụng (1) |
| 5 | sub định danh (1); exp/nbf đúng ý (2); iat không thay exp (1); NumericDate giây và nbf xa bị chặn (1) |
| 6 | Sửa payload làm verify fail (2); 401 và chưa vào Controller (1); USER hợp lệ thiếu ADMIN là 403 (2) |
| 7 | Thiếu signature (1); trusted key/algorithm (1); issuer/audience (1); exp/nbf (1); JwtDecoder trước Authentication (1) |
| 8 | set thay validator làm mất kiểm cũ (2); ghép timestamp/issuer/audience (1); ba case âm hợp lý (2) |

## Câu 1

Header mô tả algorithm/key ID/type; payload chứa claims. Signature bảo vệ chuỗi Base64URL(header) + dấu chấm + Base64URL(payload). Decode giúp xem dữ liệu, không xác nhận chữ ký hoặc ai phát hành.

Thiếu “header cũng được bảo vệ” mất phần tương ứng, không đánh đồng signature chỉ ký payload. Ôn lesson 1 mục 2–4.

## Câu 2

JWT ký không mã hóa nội dung. PasswordHash vẫn nhạy cảm và không cần cho client, nên không đưa vào. Token bị đánh cắp còn hiệu lực có thể replay vì là bearer; chữ ký không biết người cầm thật là ai. HTTPS, TTL ngắn và tránh log giảm rủi ro nhưng không biến token thành bí mật không thể lộ.

Nói “không sửa được nên không đọc được” là nhầm tính toàn vẹn với bí mật. Ôn mục 3.

## Câu 3

Issuer giữ private key ký; API nhận public key tin cậy kiểm. Public key không đủ tạo chữ ký RS256 hợp lệ. Nếu key mới thay hoàn toàn key cũ, access token cũ fail signature. Production cần key persistence và rotation có giai đoạn chuyển tiếp theo policy, không sinh key tùy mỗi restart.

Ôn mục 3 và5; key persistence/rotation là hướng khắc phục bổ sung, không phải điểm riêng vì câu hỏi chỉ hỏi vai trò key và ảnh hưởng restart. Không bắt mô tả KMS/JWKS infrastructure.

## Câu 4

Không nhận: token dành billing-api, không shopcore-api. Resource Server validation từ chối trước Controller, thường 401. Chữ ký đúng chỉ là một trong các điều kiện tin cậy.

403 dùng cho credential hợp lệ nhưng thiếu quyền, không phải audience sai. Ôn mục 4–6.

## Câu 5

sub định danh chủ thể; exp giới hạn hết hạn; nbf chưa cho dùng trước thời điểm định sẵn; iat thời điểm cấp, không thay kiểm expiry. NumericDate dùng giây. nbf tương lai xa ngoài skew làm token bị từ chối.

Ôn bảng claims mục 2; không trừ vì chưa nhớ tên NumericDate nếu nói đúng đơn vị/ý nghĩa.

## Câu 6

Sửa USER thành ADMIN đổi dữ liệu được ký, signature cũ không khớp, trả 401 trước Controller. USER token đúng hoàn toàn nhưng gọi route ADMIN đã xác thực được rồi, thất bại authorization →403.

Ôn mục 4–6. Không cho điểm verify nếu chỉ nói “server đọc thấy role USER”.

## Câu 7

Dùng JwtDecoder với thuật toán chấp nhận và key từ nguồn tin cậy; kiểm signature, issuer, audience, exp/nbf rồi mới tạo Authentication/authorities. Parse Base64 không đủ. Không tin alg=none hoặc URL key do token tùy ý chỉ định.

Ôn mục 5; nêu tên thư viện khác an toàn kèm đủ điều kiện vẫn tính.

## Câu 8

setJwtValidator thay bộ cũ nên audienceOnly có thể bỏ timestamp/issuer. Ghép validator mặc định có issuer/thời gian với audience bằng DelegatingOAuth2TokenValidator. Ba case âm ví dụ: sai issuer, hết hạn ngoài skew, sai audience; wrong signature cũng hợp lý trong bộ test decoder.

Hai điểm case âm: ba case được2, hai case được1, một case được0.5. Ôn mục 5.
