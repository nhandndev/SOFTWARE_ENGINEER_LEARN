# Đáp án M3-5 · Lesson04

8×5=40đ, đạt34/40. Chấm kiểm chứng và security boundary, không học thuộc jq/curl syntax.

| Câu | Rubric /5 |
| --- | --- |
| 1 | Name ref phải khớp (1); HTTP bearer/JWT hint (1); requirement mô tả operation (1); runtime Security mới validate/authorize (1); info version khác spec/library version (1) |
| 2 | bearerAuth:[] vẫn yêu cầu Bearer không scopes (2); operation security:[] bỏ inherited requirement (2); kiểm generated spec login không còn auth requirement (1) |
| 3 | Nhập raw token/check header prefix (1); đúng local access không ID/refresh (1); kiểm expiry/issuer/audience theo runtime (1); UI không tự cấp/refresh (2) |
| 4 | Docs paths allowlist đúng (1); sửa chain first-match phù hợp (1); không permitAll toànAPI (1); UI lẫn spec policy (1); prod bảo vệ/tắt tùy policy (1) |
| 5 | Không secret/token trong spec/example (1); không UI lạ (1); Try it out side effect thật (1); dùng môi trường/token thử giới hạn (1); không persist credentials tùy tiện (1) |
| 6 | 302 --fail chưa bắt,HTML không spec (1); kiểm status/contenttype và parse JSON (2); openapi/paths/components của bài (1); scheme/operation security (1) |
| 7 | Mock pipeline không network (2); HTTP stub kiểm connector/request/timeouts (1); provider smoke kiểm env/credential (1); không thay các tầng bằng một test (1) |
| 8 | Success/schema (1);failure/retry/timeout (1);auth/input (1);spec/export/diff (1);chưa claim chỉ từ UI200/đọc bài (1) |

## Câu 1

Name là key tham chiếu; type HTTP/scheme bearer mô tả header; bearerFormat JWT chỉ gợi ý. Requirement gắn scheme vào operation. SecurityFilterChain/decoder/method rules mới thực thi, không annotations docs. info.version là version API contract, khác version specification hoặc thư viện.

Ôn lesson 4 mục 1.

## Câu 2

security:[{bearerAuth:[]}] yêu cầu Bearer, array của scheme rỗng vì không OAuth scopes ở đây. Operation security:[] mới override global requirement thành không yêu cầu auth theo docs. Kiểm generated spec của login thật, không giả định array default annotation xóa inheritance. Runtime login public vẫn phải cấu hình riêng.

Ôn mục 2.

## Câu 3

Nhập token raw cho HTTP bearer UI, kiểm Network/curl generated không prefix kép. Dùng access JWT local đúng issuer/audience/hạn theo decoder, không Google ID token/refresh. Authorized UI không bảo đảm token hợp lệ; UI không tự login/cấp/refresh nếu chưa tích hợp flow riêng.

Ôn mục 3.

## Câu 4

Allowlist /v3/api-docs/**,/v3/api-docs.yaml,/swagger-ui/**,/swagger-ui.html trong browser/fallback chain bắt docs. Không nới anyRequest toàn app/API. API vẫn auth theo runtime; production chọn bảo vệ hoặc tắt cả UI và spec theo policy, không chỉ khóa UI mà bỏ JSON công khai ngoài ý muốn.

Ôn mục 4. Không bắt mọi hệ thống phải cấm docs production.

## Câu 5

Không secret/token thật trong schema/example/artifact hoặc UI không tin cậy. Try it out gửi HTTP thật, DELETE có thể xóa dữ liệu. Dùng môi trường thử, token ngắn/quyền tối thiểu, không lưu authorization tùy tiện trên máy dùng chung, không log credentials.

Ôn mục 3 và6.

## Câu 6

--fail chủ yếu bắt4xx/5xx, không tự coi302 là fail. Kiểm HTTP status/Content-Type, parse JSON bằng jq; kiểm openapi/paths/components vì bài có bearer scheme; inspect scheme và security operation cùng responses/schema. Không theo redirect mù rồi lưu HTML. Review diff, không commit credential.

Ôn mục 5. components không bắt buộc mọi OpenAPI document, chỉ kỳ vọng spec bài này có security scheme. Review diff/không commit credential là lời khuyên bổ sung, không là điểm riêng câu 6; câu 5 và 8 đã hỏi các trách nhiệm này.

## Câu 7

ExchangeFunction mock trả response để kiểm mapping/decode/retry nhưng bypass network. HTTP stub qua connector thật kiểm URL/header/codec/socket deadline phù hợp; TLS cần stub TLS/cert setup thật, không một plain HTTP stub là đã chứng minh TLS production. Provider smoke kiểm môi trường/credential/contract thực tế, không tạo mọi lỗi ổn định. Các tầng bổ sung nhau.

Ôn mục 6. Không cho điểm chứng minh TLS nếu chỉ mock object response.

## Câu 8

Ví dụ: setup provider fixture và config an toàn; kiểm success DTO; kiểm404/503/timeout/schema lỗi và attempts; kiểm input 400/auth 401/quyền403 khi có route; export spec kiểm path/schema/status/security; diff/review artifact không secret, rồi smoke provider thực khi phù hợp. UI200/đọc bài chưa chứng minh các đường này hoặc deliverable đã merge.

Ôn mục 5–7. Các bước khác tương đương được tính, không cần đúng thứ tự chữ trong đáp án.
