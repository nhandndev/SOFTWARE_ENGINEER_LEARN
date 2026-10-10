# Bài giải M4-4 · Lesson03

40đ, đạt từ34đ. [Quy tắc](../../Notes/M4_DevOps_Engineering/M4_4_Logging_Hexagonal/QUY_TAC_CHAM.md). Chấm nội dung cơ chế, không yêu cầu thuộc schema đầy đủ của ECS/Logstash.

| Câu | Ý được điểm, tổng5 |
|---|---|
| 1 | DTO qua HTTP converter ra client (1); logger qua backend/encoder ra log output (1); không wrapper log (1); không trả stack (1); ID đối chiếu không nhập hai luồng (1) |
| 2 | Config structured console trong application config (1); encoder Boot sẵn đủ (1); không cần server để xuất (1); format khác schema (1); parse/đọc output thật trước query (1) |
| 3 | requestId MDC scope request/thread (1); event/productId key-value event (1); tránh stale productId (1); phải log để emit (1); tránh collision field nền (1) |
| 4 | Nháy/newline làm ghép tay sai (1); JSON lồng trong message không thành field (1); key-value qua encoder (1); escape không redaction (1); không ghi password/raw data (1) |
| 5 | Config hiệu lực/profile (1); custom appender/encoder (1); println/banner/process khác (1); level/MDC thực tế (1); pattern/format không sửa mọi pipeline (1) |
| 6 | event+productId và mức/context thích hợp (1); field có nghĩa không grep mơ hồ (1); phân biệt event/context (1); collector cần cấu hình riêng (1); schema thay đổi phải kiểm query (1) |
| 7 | Bỏ raw secret và kiểm message/cause (2); quyền đọc (1); retention/rotation/volume (1); JSON không tự bảo mật/quản disk (1) |
| 8 | Parse+field nền (1); ID không leak (1); event/ID/kiểu (1); không secret (1); escaping và giới hạn integration (1) |

## Câu 1 - Đích khác nhau

DTO response qua HTTP converter ra client. Log qua SLF4J/Logback/encoder ra console/file. ApiResponse là hợp đồng HTTP, không phải bắt buộc cho log; không trả stack nội bộ. Cùng requestId giúp tra cứu, không làm HTTP body chứa toàn log.

## Câu 2 - Cấu hình

`logging.structured.format.console: logstash` trong application.yml; starter/default Boot hiện tại đủ. Không cần thêm logstash encoder bên thứ ba hoặc server để encode. Collector là bước khác. ECS/Logstash khác schema, phải parse output thật rồi thiết kế truy vấn. Câu trả lời mô tả đúng property purpose mà không thuộc spelling vẫn được điểm config.

## Câu 3 - Lifetime

MDC requestId dùng cho event cùng request trên thread và dọn cuối scope. ProductId/event thuộc hành động cụ thể, dùng key-value theo event để tránh log update20 còn ID10. Fluent builder không emit nếu chưa gọi log. `level` đã có nghĩa schema nền, custom trùng tên gây mơ hồ/xung đột; dùng field riêng có quy ước.

## Câu 4 - Encoder

Ghép tay không xử lý nháy/newline đáng tin; khi backend đã JSON thì chuỗi ghép nằm trong message, không tự được tách thành field. Dùng addKeyValue cho metadata được cho phép, encoder serialize. Escape chỉ giữ cấu trúc, không che password. Không bắt log tên người thật để chứng minh escaping.

## Câu 5 - Điều tra pipeline

Đọc config hiệu lực của profile/env/CLI. Kiểm logback-spring.xml custom có dùng structured encoder. Phân biệt println/banner/output process khác. Kiểm level có cho event đi qua và MDC có key không. Pattern text không quyết định mọi appender JSON; format cũng không tạo MDC hoặc bật event bị threshold chặn.

## Câu 6 - Field

Ví dụ event product_created, numeric productId10, mứcINFO, requestId và thời gian/logger nền. Lọc field tránh nhầm giá500 với status500. Event field riêng từng hành động; MDC là scope request. JSON stdout chưa có ingest/search tập trung. Đổi format/field cần chỉnh và kiểm query/dashboard, không giả schema giữ nguyên.

## Câu 7 - Vận hành

Không ghi token kể cả trong message/cause; thiết kế error metadata/redaction có test. Hạn chế quyền truy cập, đặt rotation/retention và giới hạn volume; stdout cũng cần runtime/collector policy. JSON không tự làm bí mật biến mất và không tự giới hạn disk. Chỉ “bật JSON” không đạt các ý giải pháp.

## Câu 8 - Bằng chứng

Parse JSON và kiểm field nền; A có ID đúng và B không kế thừa; event/productId đúng kiểu; secret giả không xuất; nháy/newline vẫn một event hợp lệ. Không so raw timestamp toàn dòng. Test tách riêng không chứng minh Security order/ERROR dispatch/collector thực tế; cần integration tương ứng khi triển khai.

Ôn Lesson03 mục3–8, đặc biệt phân biệt format, context và sink.
