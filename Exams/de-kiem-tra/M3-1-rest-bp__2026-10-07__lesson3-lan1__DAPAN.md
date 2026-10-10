# M3-1 — Bài giải Lesson03

40đ; normalize/40×100. [Quy tắc chấm nghiêm](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/QUY_TAC_CHAM.md). Không bắt thuộc exception class nếu giải thích đúng giai đoạn và cơ chế; không tự nâng điểm ý chưa viết.

| Câu | Rubric5đ |
|---|---|
| 1 | Type/title đúng nghĩa (1); status/detail đúng nghĩa (1); instance đúng nghĩa (1); code là extension không bắt buộc RFC (1); format lỗi không success DTO (1). |
| 2 | A bind int trước method (1); B parse body trước method (1); C bind rồi validation trước method (1); Service không chạy,400 cả ba (1); MVC resolver chọn handler/Advice (1). |
| 3 | Bubble từ Service qua Controller tới MVC resolver/handler (1); ErrorCode cấp status/message/identifier (1); HTTP409 (1); application/problem+json + code DUPLICATE_SKU (1); giữ Service ném exception, không cần dựng HTTP body ở đó (1). |
| 4 |404 chỉ phân loại HTTP, hai case trùng số (1); stable type/code string phân biệt (1); client không parse message (1); message có thể đổi/ngôn ngữ (1); đổi kiểu field v1 cần compatibility/version plan (1). |
| 5 | Chưa thống nhất vì framework errors khác shape (1); chuẩn hóa binding/validation/MVC cùng ProblemDetail (1); nhận diện ResponseEntityExceptionHandler/hướng xử lý tương đương (1); giữ405 đúng nghĩa (1); giữ header Allow, không catch-all thành500 (1). |
| 6 | a không tự vào MVC Advice (1); b startup không là HTTP business response (1); c thuộc MVC resolver/handler (1); cần cơ chế filter/container phù hợp cho a (1); đã commit không bảo đảm viết lại body/status (1). |
| 7 | Self link resource hiện tại (1); category link relation liên quan (1); client khám phá/điều hướng (1); version URL không tự tạo hypermedia (1); chỉ nhận diện không bắt full HAL/framework (1). |
| 8 | HTTP200/body500 mismatch sửa HTTP500 (1); bỏ raw message/stack trả public safe detail (1); log nội bộ có correlation/context an toàn (1); request lỗi binding + expected400 ProblemDetail (1); business error + expected404/409 ProblemDetail (1). |

## Câu 1 — Metadata lỗi thay vì dữ liệu Product

**Đáp án đủ:** Type nhận diện loại problem; title tóm tắt loại; status là mã HTTP; detail là thông tin trường hợp cụ thể; instance nhận diện ngữ cảnh/lần xuất hiện lỗi, mẫu dùng request path. Code là extension ổn định của shopcore, không field RFC bắt buộc. Đây là body lỗi Product không tồn tại, không ProductResponse success.

**Chấm nghiêm:** Gọi type là kiểu Java exception hay instance là Product entity sai nghĩa. Không bắt chép nguyên văn RFC; mô tả đúng vai trò đủ điểm. Không bắt mọi API RFC luôn phải xuất đủ năm field; đó là convention bài.

**Đọc lại:** L03 mục1–2.

## Câu 2 — Không có Controller/Service call khi input bị chặn

**Đáp án đủ:** A không convert abc thành int ở binding; B JSON hỏng ở body converter; C JSON thành DTO rồi validation name thất bại. Trong luồng tham số của đề, đều dừng trước Controller method, Service không chạy, trả400. MVC exception resolver chọn handler thích hợp, có thể ở Advice, dựng response lỗi thống nhất.

**Chấm nghiêm:** “Cả ba Service tự check rồi throw AppException” sai vị trí. C đúng DTO binding nhưng chưa qua @Valid không đủ điều kiện gọi Service. Không bắt thuộc ba tên exception để đạt phần tư duy.

**Đọc lại:** L03 mục3.

## Câu 3 — Business metadata chuyển ở boundary HTTP

**Đáp án đủ:** AppException không bị Service catch thì bubble qua Controller ra MVC resolver, handler AppException được gọi. Handler lấy ErrorCode status409/message và identifier DUPLICATE_SKU để tạo ProblemDetail, HTTP409, media type application/problem+json và code string đó. Service tiếp tục ném exception nghiệp vụ, không cần dựng ResponseEntity/ProblemDetail trong Service.

**Chấm nghiêm:** ErrorCode có409 nhưng trả200 vẫn sai HTTP. Chỉ nói “Jackson bắt lỗi” sai: Jackson serialize body, không chọn business handler thay resolver.

**Đọc lại:** L03 mục1/3–4.

## Câu 4 — Identifier máy đọc khác message người đọc

**Đáp án đủ:**404 không phân biệt Product thiếu và Category thiếu khi hai enum đều dùng số404. Dùng stable type hoặc code string PRODUCT_NOT_FOUND/CATEGORY_NOT_FOUND để client rẽ nhánh. Message cho người đọc có thể đổi câu chữ/ngôn ngữ, nên không parse message làm protocol. Nếu v1 công bố code number, đổi string là thay contract; giữ compatibility, thêm field hoặc version có kế hoạch chứ không đổi âm thầm.

**Chấm nghiêm:** Không bắt bỏ code cũ ngay. “Chỉ đọc message xem có chữ Product” không nhận điểm identifier ổn định.

**Đọc lại:** L03 mục2 và L01 mục3–4.

## Câu 5 — Cần cùng shape cho framework lẫn business

**Đáp án đủ:** Chưa thống nhất: invalid JSON/validation vẫn shape code/message cũ. Chuẩn hóa các nhánh MVC bằng ProblemDetail, có thể dùng ResponseEntityExceptionHandler trong một Advice và tùy chỉnh handler cần thiết; giữ business handler riêng, tránh trùng handler superclass.405 vẫn phải là405 và giữ Allow phù hợp; catch-all biến nó thành500 làm sai nghĩa client error và mất thông tin method được phép.

**Chấm nghiêm:** Setting/handler AppException không tự chứng minh bao phủ mọi framework lỗi. Chỉ nói “bắt Exception hết” không đủ hướng xử lý vì có thể làm mất status/header. Không bắt signature superclass.

**Đọc lại:** L03 mục5.

## Câu 6 — Advice có phạm vi

**Đáp án đủ:** a xảy ra ở filter trước MVC nên không tự do Advice của MVC xử lý, cần cơ chế filter/container phù hợp. b xảy ra startup khi app chưa ready, không phải HTTP business exception response. c bubble trong handler MVC nên thuộc resolver/Advice thích hợp. Nếu response đã commit, không bảo đảm thay status/body bằng ProblemDetail mới được.

**Chấm nghiêm:** “RestControllerAdvice là chỗ mọi exception cả JVM đi qua” sai. Không yêu cầu cấu hình Security, đó là module sau.

**Đọc lại:** L03 mục6.

## Câu 7 — Link mang relation

**Đáp án đủ:** Self trỏ Product10, category dẫn tới Category2 liên quan. Client có thể theo link với relation thay vì tự đoán đường dẫn, đó là đặc điểm hypermedia. `/api/v1` chỉ version URL, không tự cung cấp links/điều hướng. Roadmap yêu cầu nhận diện, không bắt cài Spring HATEOAS hoặc full HAL.

**Chấm nghiêm:** Chỉ thấy field url rồi gọi mọi response là HATEOAS chưa giải thích relation. Không yêu cầu kết luận một ví dụ link đơn giản chứng minh toàn hệ thống tuân mọi REST constraint.

**Đọc lại:** L03 mục7.

## Câu 8 — Response an toàn và phép kiểm cụ thể

**Đáp án đủ:** Trả HTTP500 khớp body.status500, media type ProblemDetail theo contract; detail chung an toàn, không raw ex.getMessage hay stack vì có thể chứa SQL/secret/internal path. Debug log ở server, có correlation/context đã kiểm an toàn; client chỉ nhận identifier an toàn khi có chính sách phù hợp.

Hai phép kiểm ví dụ:

- POST `/api/v1/products` với JSON hỏng →400, application/problem+json, body.status400 và code input phù hợp; Service không chạy.
- POST Product với DTO hợp lệ nhưng SKU đã tồn tại →409, application/problem+json, body.status409, code DUPLICATE_SKU.

Có thể thay ví dụ hai bằng GET Product thiếu→404. Không gửi password thật để thử rò thông tin.

**Chấm nghiêm:** Chỉ nói “test exception” không chỉ request/expected status chưa nhận điểm phép kiểm. Log có correlation là hướng tổ chức, không yêu cầu tự triển khai tracing; không trả raw stack dù ở extension tùy biến.

**Đọc lại:** L03 mục2/5/8.
