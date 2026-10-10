# Đáp án M3-4 · Lesson 03

8×5=40đ, đạt34/40. Đánh giá policy và ranh giới tin cậy, không ép thiết kế schema duy nhất nếu giữ bảo đảm tương đương.

| Câu | Rubric /5 |
|---|---|
| 1 | Vẫn user42 (2); email thuộc tính thay đổi (1); khóa issuer+sub đã validate (1); unique pair (1) |
| 2 | Không auto-link email (2); verified email chưa đủ policy ownership (1); login/reauth local + linking chủ động (1); ràng buộc target server không tin request ID (1) |
| 3 | Từ chối local disabled (2); kiểm trước cấp credential (1); local DB/policy role (1); không auto ADMIN từ Google/email (1) |
| 4 | User/identity/credential tách trách nhiệm (2); nullable hoặc credential riêng federated-only (1); không password giả (1); response không secret/token ngoài contract (1) |
| 5 | Unique issuer/sub chống race (1); transaction user+identity (1); conflict xử lý mapping nhất quán (1); DB roles chưa cập nhật auth tự động (1); OidcUserService/mapper/principal phù hợp (1) |
| 6 | Session cookie và CSRF (1); local JWT riêng issuer/aud/role (1); API Bearer không nhận session/ID token thay thế (2); không raw token query redirect (1) |
| 7 | Local logout phạm vi local (1); Google session riêng (1); consent/token revocation khác (1); JWT local còn hạn không tự thu hồi nếu offline (2) |
| 8 | Bốn case mapping hợp lý (2); mock kiểm principal/rules không code/state/signature thật (2); smoke provider thật trước claim tích hợp (1) |

## Câu 1

Vẫn user42 vì issuer/sub ổn định, email chỉ thuộc tính cập nhật theo policy. Unique trên pair issuer+sub đã validate, không email làm khóa external identity.

Ôn lesson 3 mục 1–2. Không sinh user mới chỉ vì đổi email.

## Câu 2

Không tự link. email_verified không thay chứng minh quyền sở hữu local account và policy linking. User đăng nhập/reauth local rồi chủ động liên kết qua flow ràng buộc tới local user trong trạng thái server đáng tin; không tin linkToUserId client tự chọn.

Ôn mục 3. “Google uy tín nên ghép” chưa bảo vệ local account ownership.

## Câu 3

Từ chối local login trước cấp session/token nếu disabled. Google xác nhận external identity, shopcore quyết định quyền hoạt động. Local ADMIN lấy DB/policy nội bộ; không cấp tự động vì email domain/scope.

Ôn mục 2 và4. Không chỉ tạo token rồi kiểm disabled ở một endpoint ngẫu nhiên.

## Câu 4

User chứa local ID/status/roles; ExternalIdentity chứa issuer/sub/userId; local credential chứa passwordHash nếu có. Federated-only có thể không có local credential hoặc passwordHash nullable theo schema, không tạo password giả chung. Response DTO không lộ passwordHash/provider secrets; chỉ trả credential theo contract login được bảo vệ.

Ôn mục 1 và5. Không bắt dùng đúng ba bảng nếu schema tương đương an toàn.

## Câu 5

Unique pair là bảo đảm DB; transaction tạo User+identity tránh partial mapping. Race conflict cần đọc lại/giải quyết nhất quán mapping, không link sang user tùy tiện. Lưu role DB chưa chắc đổi Authentication hiện tại; custom OidcUserService delegate/authorities mapper/principal wrapper cần đưa local ID/roles vào auth có hiệu lực.

Ôn mục 2 và4. Success handler chỉ cập nhật DB không tự chứng minh principal đã đúng.

## Câu 6

Session design dùng cookie và CSRF phù hợp. JWT design cấp token shopcore sau mapping/status với issuer/audience/local roles riêng. Header-only API vẫn cần Bearer local, không dùng session Google/Google ID token thay thế. Không redirect raw access/refresh trong query; chọn delivery an toàn có thiết kế rõ như session/BFF hoặc handoff có ràng buộc.

Ôn mục 5. Không yêu cầu tự viết handoff protocol.

## Câu 7

Invalidate session/revoke refresh chỉ ảnh hưởng local theo policy. Google browser session có thể còn; thu hồi consent/provider token là hành động khác. JWT access local offline còn hạn không tự fail chỉ vì local logout hoặc Google logout; cần revocation/check riêng nếu muốn chặn tức thì.

Ôn mục 6 và JWT lesson 3.

## Câu 8

Bốn case ví dụ: email đổi giữ user; email trùng không auto-link; disabled bị từ chối; claim email admin không cấp ADMIN; race unique mapping cũng hợp lý. oidcLogin() dựng principal giả để kiểm rules/Controller, không chạy Google code exchange/state/ID token signature thật. Smoke test provider thật trong môi trường thử mới chứng minh redirect/callback/credential/mapping tích hợp chạy.

Case mapping: bốn đủ 2đ, ba 1.5đ, hai 1đ, một 0.5đ. Ôn mục 7. Không bắt secret production/Google thật cho mọi unit test.
