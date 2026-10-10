# Bài giải / rubric · M5-4 Lesson 02

40 điểm, đạt 34; mỗi tiêu chí 1 điểm, đúng một phần 0,5, thiếu/sai 0. Chấm ý nghĩa, không yêu cầu thuộc method/import. Không có cap ngầm; dùng [quy tắc chấm](../../Notes/M5_Scalability/M5_4_Actuator/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Instrument ghi registry (1); endpoint đọc registry (1); không chạy lại business (1); instance/history limit (1); không thay durable DB (1) |
| 2 | Attempts 4 (1); success 2 error 1 (1); in-flight giải thích gap (1); Timer đã count completion (1); reset/restart (1) |
| 3 | A không vào helper (1); B error timer (1); finally truyền lỗi/advice 404 (1); boundary HTTP/Service (1); fallback normal return success có giới hạn (1) |
| 4 | Mean 0.2s/200ms (1); không suy p95 (1); distribution/config/backend (1); MAX window (1); filter tag (1) |
| 5 | Outcome hữu hạn (1); ID làm nhiều series (1); hash không giảm số lượng (1); prompt/PII risk (1); log ID và template URI (1) |
| 6 | Sample khi request hoàn tất (1); danh sách tên/config (1); boundary timers (1); phụ thuộc component (1); diagnostic không full monitoring (1) |
| 7 | Health không chứng minh latency (1); time/instance/volume/errors/duration (1); boundary khoanh vùng không kết luận (1); log correlation không metric ID (1); comparable remeasurement (1) |
| 8 | 2 attempts/s (1); reset/instance caveat (1); chỉ đo trả Future (1); dừng khi completion async (1); MDC propagation và cleanup (1) |

## Câu 1

Service gọi increment/record trên meter đã đăng ký vào MeterRegistry. Khi OPS hỏi, endpoint đọc registry và serialize measurements/tags, không gọi lại repository/lookup. Mặc định là số đo instance đang hỏi, không tự là lịch sử nhiều ngày hoặc tổng toàn cluster. Counter RAM có reset/mất khi process restart; giao dịch cần durable DB và contract nghiệp vụ, không dùng metrics làm sổ cái.

## Câu 2

Attempts = 4, success Timer COUNT = 2, error Timer COUNT = 1. Operation thứ tư đang chạy chưa đến finally nên chưa record Timer; chênh lệch hợp lệ với boundary này. Timer đã đếm completion, thêm Counter chỉ đếm cùng completion thường dư. Counter ở process mới có thể bắt đầu lại, không bảo đảm bền vững. Không cần Gauge để trả lời đề.

## Câu 3

A không đến helper nên không tăng custom attempts; observation HTTP là cơ chế khác. B ném trong vùng đo nên error Timer tăng, finally không nuốt exception. GlobalExceptionHandler/advice quyết định mapping 404, metric không tự viết HTTP response. Service Timer bao Supplier, không bao toàn bộ filters/binding/serialize/network; commit transaction bên ngoài cũng có thể không nằm trong vùng đó. Nếu Supplier đã catch và trả fallback, helper ghi success theo normal return, không chứng minh nghiệp vụ thực sự hoàn hảo.

## Câu 4

Mean = 0.8/4 = 0.2 seconds = 200 ms. Count và tổng thời gian không cho phân bố, nên không suy p95; cần histogram/percentile config hoặc dữ liệu phân bố và backend phù hợp. MAX tùy implementation có time window nên không mặc định max lifetime. Đọc một outcome bằng `?tag=outcome:success` hoặc diễn đạt lọc tag tương đương; không bắt đúng dấu câu URL nếu ý rõ.

## Câu 5

Giữ outcome hữu hạn. ID biến đổi tạo rất nhiều tag combinations/series, tăng RAM/storage/chi phí; hash giữ số giá trị phân biệt gần như cũ, không chữa cardinality. Raw prompt có thể nhạy cảm và cardinality cao. Correlation ID thuộc log/tracing có policy dữ liệu phù hợp, không tag metric. URI dùng route template `/products/{id}`, không mỗi `/products/123`. Không bắt nhớ tên exporter.

## Câu 6

HTTP metric có activity khi request hoàn tất; request đầu tiên đang hỏi metric có thể chưa tạo sample của chính nó. Kiểm danh sách meter, tên observation đã đổi hay chưa và policy endpoint, rồi tạo một request hoàn tất và hỏi lại. HTTP Timer khác custom Supplier Timer về vùng đo. Không có DataSource/Hikari thì không chắc có pool metrics. `/metrics` phục vụ chẩn đoán; lưu lịch sử, scrape, nhiều instance và alert cần hệ thống bổ sung, ngoài scope full-stack của module.

## Câu 7

UP chỉ nói health checks đạt, không phủ định API chậm. Đo volume/error/duration cùng khoảng thời gian và instance, ghi restart/config/traffic. So HTTP và Service boundaries để chọn hướng điều tra, không gọi đó là bằng chứng nguyên nhân. Tìm log cùng thời gian/instance/operation rồi requestId; metric aggregate không tự chứa danh sách request và ID tag gây cardinality. Kiểm query/pool/provider liên quan rồi đo lại comparable workload; không mặc định tăng Hikari pool.

## Câu 8

Rate = (180−120)/30 = 2 attempts/s trên interval đã cho. Nếu reset hoặc so hai instance khác tuổi, trừ cumulative trực tiếp sai; cần reset-aware rate và aggregation từng series. Supplier trả Future là kết thúc lời gọi đồng bộ nên helper dừng quá sớm so với tác vụ async. Để đo tác vụ, dừng khi completion thành công/lỗi, không khi vừa submit. MDC thường thread-local, không tự propagate; truyền context có kiểm soát khi async và finally remove/restore phần request sở hữu để tránh rò requestId sang request sau. Không bắt viết code async ở module này.
