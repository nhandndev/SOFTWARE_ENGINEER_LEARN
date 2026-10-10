# Kế hoạch phủ M4-4

Roadmap14h →4lesson ×3,5h. Mỗi buổi gồm đọc/trace khoảng2h, làm đề35–60phút, đối chiếu và ghi phần thiếu. Không lấy số giờ đọc làm bằng chứng pass.

| Checklist / rủi ro | Lesson | Câu kiểm |
|---|---|---|
| SLF4J/Logback/appender/encoder | 01 | 1 |
| Levels, effective logger, severity có lý do | 01 | 2–3 |
| Parameterized logging, eager arguments, secret | 01 | 4, 7 |
| Exception ownership, không nuốt lỗi | 01 | 5–6 |
| Bằng chứng và giới hạn appender test | 01 | 8 |
| MDC theo thread/request, cleanup/previous | 02 | 1–2 |
| Request header không tin cậy | 02 | 3 |
| Filter order/Security, MVC và outer errors | 02 | 4–5 |
| Async/ERROR recognition, không tự tracing | 02 | 6–7 |
| Test lifecycle requestId | 02 | 8 |
| JSON response khác JSON log, config Boot | 03 | 1–2 |
| Event field/MDC/schema/escaping | 03 | 3–4, 6 |
| Config hiệu lực/custom XML/stdout | 03 | 5 |
| Retention/privacy/verification | 03 | 7–8 |
| Domain/application/infrastructure | 04 | 1, 3 |
| Runtime khác source dependency | 04 | 2 |
| Ports, wiring, DTO/entity/exception boundaries | 04 | 4, 6 |
| Rule/contract/errors, thay adapter/test | 04 | 5, 7 |
| Liên hệ AI và giới hạn skeleton | 04 | 8 |

## Không lặp module cũ để tăng số lesson

M1-2/M1-4 đã dạy response/Advice; chỉ nhắc boundary khi gắn logging. M3-2 đã dạy Security; chỉ dùng để hiểu filter order và401/403. M4-3 đã có rule ShippingFeePolicy; dùng lại rule, không dạy lại toàn bộ TDD. Logging không thay validation/security, Hexagonal không thay transaction.

## Không thêm scope ngầm

Không yêu cầu ELK, full distributed tracing, DDD aggregates, C4, mutation testing, production AI provider hoặc refactor toàn shopcore. Module6A-4/M5-4 sẽ đào sâu các mặt kiến trúc/observability liên quan. Bộ đề theo lesson không giả thành đề tổng module đã làm xong.
