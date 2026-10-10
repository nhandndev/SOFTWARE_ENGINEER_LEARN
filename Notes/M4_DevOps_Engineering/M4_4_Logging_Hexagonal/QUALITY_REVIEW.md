# Kiểm chất lượng M4-4 · 2026-10-07

> Đây là báo cáo kiểm tài liệu/ví dụ, không phải bài chấm người học, không phải bằng chứng deliverable đã merge.

## Task 1 · Đúng roadmap, đúng người học

Đối chiếu Module4-4 trong01: SLF4J/Logback/levels →Lesson01; MDC/requestId →02; JSON →03; domain/application/infrastructure và Ports & Adapters →04. Kế hoạch14h/4buổi. Không thêm ELK/C4 đầy đủ/OpenTelemetry implementation vào bài bắt buộc.

Java21/Boot4.1.1 khớp POM shopcore đang có. DTO class, BigDecimal; nối kiến thức3lớp, Advice/Security và policy phí vận chuyển từ M4-3. Không sửa source/POM shopcore hoặc tạo capstone khác. Bài4 cố ý là skeleton có controller tối thiểu; error mapping/JPA/transactions thật không bị tuyên bố đã hoàn tất.

## Task 2 · Kiểm từng lesson và câu hỏi riêng

| Lesson | Nội dung đã rà | Đề/bài giải đã đối chiếu |
|---|---|---|
| 01 | Facade khác implementation; threshold/override; Java tính argument trước; một owner log lỗi; throwable có thể lộ secret | Câu1–8 đều có kiến thức dạy trong mục2–7; severity chấm theo lý do, không ép mọi404ERROR |
| 02 | Đặt ID trước chain; header allowlist/length/duplicates; finally restore đúng key; filter ngoài MVC; async/error default và thread propagation | Câu1–8 khớp mục1–6; không bắt triển khai TaskDecorator/ERROR dispatch; không hứa filter mock chứng minh Security order |
| 03 | Config Boot thực; event field khác MDC; JSON escaping khác redaction; custom XML/stdout; collector là bước khác | Câu1–8 khớp mục1–8; không hỏi cấu hình ELK; nêu đủ nhóm kiểm chứng trong đề |
| 04 | Core thuần Java; adapter implement port; DI wiring; runtime/source dependency; exception/DTO boundary; fake và integration khác nhau | Câu1–8 khớp mục1–9; không bắt interface inbound hoặc rewrite app; lỗi giá nội bộ không tự thành400 |

Rubric32câu, mỗi câu đúng5đ, từng ý được điểm độc lập. Không bắt học thuộc import/order/schema; không tiêu chí ngầm, không trần điểm bí mật. Chưa có bài làm thì không tạo snapshot/đổi điểm.

## Task 3 · Chạy ví dụ, không chỉ đọc code

Lệnh tái lập nằm trong README; harness trích11classJava và application.yml có marker từ lesson, tạo fixture tạm. Chạy JDK21, Maven offline với dependency cache hiện có, Boot4.1.1.

Kết quả thực tế:

- Bốn core class domain/application biên dịch bằng javac release21 **không có Spring/SLF4J/JPA classpath**.
- Maven/JUnit: **12 tests, 0 failure, 0 error, 0 skipped**, gồm level/override/throwable, header/responseID, cleanup/previous value/key khác, request tiếp, header dài/newline/trùng, executor không tự inherit và scoped copy, policy boundary/invalid input, use case/short-circuit, Spring composition, Boot structured output.
- Output JSON thật parse được: INFO, timestamp/logger, requestId, event, numeric productId. Chuỗi giả có nháy/newline vẫn là một event hợp lệ. Event sau scope không còn requestId cũ.
- Cố tình bỏ remove requestId: test thất bại bằng AssertionFailedError, không phải lỗi compile/setup.
- Cố tình đổi `>=` thành `>` ở ngưỡng500000: test boundary thất bại bằng assertion.
- Khôi phục source mẫu: toàn suite12test chạy đạt lại.

Log lần kiểm cuối nằm ở thư mục tạm `m44-qa-pjCxRg` được harness in ra; thư mục tạm có thể bị hệ điều hành dọn. Hai script đi cùng tài liệu để chạy lại, không phụ thuộc việc giữ log tạm.

**Giới hạn:** chưa chạy Security/Tomcat filter order thật, ASYNC/ERROR redispatch, HTTP contract error mapping đầy đủ, JPA/DB/transactions, collector, real AI/provider hoặc một hệ thống redaction production. Kiểm metadata của fixture không chứng minh mọi log thật đều sạch secret. Mermaid được rà cú pháp/ý nghĩa bằng đọc, chưa render bằng công cụ kiểm hình.

## Task 4 · Cấu trúc, nguồn và bảo toàn tiến độ

verify-structure kiểm số lesson/cặp đề, sequence câu, ô trả lời, tổng rubric, code fence và local link. Số mục dự kiến:17Markdown gồm8note,8đề/giải và index M4;32câu,32rubric. Script kiểm cấu trúc **không tự chứng minh chất lượng nội dung**, vì vậy Task2 vẫn rà riêng.

Nguồn chính đã đối chiếu ngày2026-10-07: [Boot Logging](https://docs.spring.io/spring-boot/reference/features/logging.html), [SLF4J](https://www.slf4j.org/manual.html), [Logback architecture](https://logback.qos.ch/manual/architecture.html), [MDC](https://logback.qos.ch/manual/mdc.html), [OncePerRequestFilter](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/filter/OncePerRequestFilter.html), [Security architecture](https://docs.spring.io/spring-security/reference/servlet/architecture.html), [Spring Java config](https://docs.spring.io/spring-framework/reference/core/beans/java/basic-concepts.html), [Cockburn bài gốc](https://alistair.cockburn.us/hexagonal-architecture), [OWASP Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html). Mỗi lesson có nguồn và video search terms; không giả link video đã xem.

Chỉ thay ô tài liệu M4-4 trong05 và thêm link index M4. Giữ trạng thái chưa bắt đầu, điểm/ngày/log/pointer/capstone; không tick01. Đồng bộ đúng bộ file này tới Documents/Learning_Vault/Software_Engineer và so byte sau copy, không lấy Vault cũ trong Downloads đè ngược source học.
