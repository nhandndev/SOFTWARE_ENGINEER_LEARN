# M3-5 · Lesson04 Bearer, Export, Verification · Lần1

PHONG_VAN theo lesson 8×5=40đ, đạt34/40,30–40 phút. Docs requirements theo operation, không global; API Bearer JWT thực thi bởi Security. Không cần token thật để trả lời.

## Câu 1 - Scheme và enforcement

Giải thích name=bearerAuth,type=HTTP,scheme=bearer,bearerFormat=JWT và @SecurityRequirement. Annotation có tự bật JWT validation/role ADMIN không? info.version=v1 khác openapi=3.1.x thế nào?

**Trả lời:**

## Câu 2 - Hai mảng rỗng

Trong spec, security:[{bearerAuth:[]}] khác operation security:[] thế nào? Nếu có global security thì endpoint login public cần kiểm kết quả gì trong spec? Không cần đoán annotation override chưa verify.

**Trả lời:**

## Câu 3 - Authorize vẫn401

UI Authorized nhưng request gửi Bearer Bearer token, hoặc token hết hạn/Google ID token. Sửa cách nhập/kiểm request và token đúng. UI có tự login/refresh/cấp access JWT không?

**Trả lời:**

## Câu 4 - Cho docs public

Hai chain: API /api/** order1; browser/fallback order2. UI/spec401, dev định anyRequest().permitAll(). Nêu paths/docs chain cần sửa, API phải còn bảo vệ và policy production cho UI/spec.

**Trả lời:**

## Câu 5 - An toàn khi thử

Có đưa token thật vào @Schema example/openapi.json hoặc UI website lạ không? Try it out DELETE môi trường production có an toàn vì chỉ là docs không? Nêu cách giảm rủi ro.

**Trả lời:**

## Câu 6 - Export thành HTML

curl lưu openapi.json nhưng bên trong là trang login302/HTML. Vì sao --fail chưa đủ? Mô tả lệnh/các kiểm tra để xác nhận spec và Bearer requirement, không cần nhớ từng jq expression.

**Trả lời:**

## Câu 7 - Ba mức kiểm chứng client

Phân biệt mock ExchangeFunction, mock HTTP server qua connector, provider thật smoke test. Mỗi mức chứng minh gì/không chứng minh gì? Muốn đo socket/TLS thật thì mock response object đủ chưa?

**Trả lời:**

## Câu 8 - Kế hoạch hoàn thiện deliverable

Nêu5–6 bước kiểm external success/failure, runtime auth/validation, spec schema/status/security và export/diff. Chỉ đọc bài hoặc UI mở200 đã đủ chứng minh deliverable chưa?

**Trả lời:**
