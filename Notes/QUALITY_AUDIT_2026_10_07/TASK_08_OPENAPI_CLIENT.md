# Task 08: OpenAPI & Client

Đã đọc 4 lesson và đủ 32 câu/đáp án/rubric. Đối chiếu riêng nhánh gọi provider với nhánh mô tả OpenAPI; không chỉ kiểm UI.

| Lesson | Coverage câu 1–8 |
|---|---|
| 01 | MVC/WebClient boundary; DTO provider; URL/query; response mapping; blocking; config/secret; SSRF; luồng gọi |
| 02 | Status mapping; retry policy; deadline; số lần gọi; dữ liệu sai/rỗng; error boundary; side effects; kiểm lỗi |
| 03 | Spec/generator/UI; dependency; sinh spec; docs≠validation; operation contract; generic wrapper; annotation clash; runtime comparison |
| 04 | Scheme; security arrays; Authorize/token; docs chain; an toàn; export; ba tầng kiểm; kế hoạch deliverable |

## Phát hiện và sửa

- **P2, Lesson 04 câu 6:** rubric trừ riêng diff/secret trong câu chỉ hỏi xác nhận export/spec/Bearer. Chuyển điểm về status/content type/parse JSON; diff/secret vẫn là lời khuyên và đã được hỏi ở câu khác.
- **P2, tích hợp:** ví dụ lỗi client dùng code/message không nên bị hiểu là phải thay ProblemDetail đã học ở REST. Ghi chú chung chỉ rõ mapping lỗi provider → lỗi local → HTTP contract và schema phải khớp body thật, kể cả lỗi filter.

## Tiêu chí kỹ thuật đã giữ

WebClient không buộc đổi MVC server thành reactive. Retry có giới hạn, phân biệt transient với bad request/schema/auth; timeout mỗi attempt khác deadline tổng; POST/retry có side effects phải xét idempotency. Mock ExchangeFunction không đo socket/TLS. Provider status không được phản chiếu nguyên thành lỗi client local. Validate payload kể cả HTTP200 nhưng rỗng/sai schema. Không cho client tùy ý URL nội bộ, không tự forward token local hoặc theo redirect mang secret.

OpenAPI annotation không thực thi auth/validation, hidden không làm Jackson ngừng serialize. Wrapper có generic cần kiểm schema export thật. Bearer array rỗng khác operation security rỗng. 302/HTML có thể qua curl --fail, cần kiểm nội dung, không chỉ file tên JSON.

## Verification

17 Markdown/26 links/32 câu/rubric được checker module kiểm sau sửa; 7 snippet compile và 98 assertions qua 14 tình huống ExchangeFunction mock pass. Harness dùng Framework6.1.1/Reactor3.6 có sẵn, **không chứng minh Boot4/springdoc3 chạy chung**. Compatibility Boot4 → springdoc3.x đã đối chiếu tài liệu; chưa chạy springdoc runtime, HTTP socket stub hay provider thật.

Nguồn: [springdoc compatibility](https://springdoc.org/), [Spring WebClient](https://docs.spring.io/spring-framework/reference/web/webflux-webclient.html).

Kết luận: đạt kiểm tài liệu sau sửa; còn runtime verification đã nêu. Không bắt học thêm Feign/reactive chuyên sâu/codegen/circuit breaker ngoài roadmap.
