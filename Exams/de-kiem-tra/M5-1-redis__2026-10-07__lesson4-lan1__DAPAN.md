# Bài giải M5-1 · Lesson04

40đ, đạt từ34đ. [Quy tắc](../../Notes/M5_Scalability/M5_1_Redis/QUY_TAC_CHAM.md). Không đòi benchmark thật, nhưng kế hoạch phải có đối chứng và giới hạn.

| Câu | Ý được điểm, tổng5 |
|---|---|
| 1 | Miss là thiếu entry (1); error vận hành/deserialize khác miss (1); default rethrow không mọi fallback (1); GET error có thể chặn body (1); catch-all200giấu lỗi (1) |
| 2 | Boundary/selective cache errors (1); timeout/budget (1); DB chịu fallback load (1); metric/log an toàn (1); không giấu DB/schema bug và không tự có fallback (1) |
| 3 | Concurrent miss cùng query DB (2); hai hướng giảm phù hợp (1); sync/provider không distributed atomicity chung (1); nhận diện không bắt lock implementation (1) |
| 4 | Ba nhóm có đối chứng (1); warm-up+conditions giống (1); p50/p95/error/samples (1); DBcounter/hit proof (1); timer body bỏ hits khác E2E (1) |
| 5 | Latency và DBcalls giảm trong mẫu (1); không mọi request/SLA universal (1); chưa freshness/outage/RAM/diversity (1); hai kiểm bổ sung cụ thể (2) |
| 6 | TTL không bảo đảm sống đủ, miss/write fail theo policy (1); expiration khác memory eviction (1); cardinality overhead/hit thấp (1); đo memory/hit/querycost (1); giới hạn hoặc bỏ cache hợp lý (1) |
| 7 | Query rẻ ít lặp có thể không lợi (1); checkout kiểm nguồn gốc/tx (1); dữ liệu quyền cần isolation hoặc không cache (1); model/context/version thiếu key gây sai/leak (1); chọn scope an toàn (1) |
| 8 | Correctness+hit/miss/TTL (1); mutation/commit (1); outage/concurrency (1); số đo có điều kiện (1); nêu fake/đọc bài không chứng minh toàn deliverable (1) |

## Câu 1 - Không biến lỗi thành miss

Miss là entry không có/expire/evict bình thường. Redis connection/timeout/deserialize error là lỗi, default cache handler rethrow nên GET error có thể chặn source. Catch mọi Exception trả rỗng200che cả lỗi DB/logic; phải có policy rõ thay vì giả “cache luôn optional”.

## Câu 2 - Fail-open

Implement boundary/CacheErrorHandler cho các cache error được chọn, timeout/budget hợp lý, metric/log không secret. Khi cache down DB nhận tải hơn, phải kiểm capacity/rate limit/budget. Không nuốt DB errors hoặc để schema bug im lặng lâu; starter không tự tạo policy fallback đó. Thiết kế khác chấp nhận nếu giữ phân loại và hậu quả.

## Câu 3 - Stampede

Nhiều request thấy miss trước khi một request put xong nên đều load DB. Có thể jitter TTL, warm có mục tiêu, coalesce/lock key phù hợp, rate limit/budget; nêu hai hướng hợp lý được1đ. sync phụ thuộc provider/phạm vi, không tự global lock/atomic DB+Redis. Module cần hiểu giới hạn, không ép implementation distributed lock.

## Câu 4 - Đối chứng

Baseline không cache, cold miss và warm hit tách riêng. Cùng data/index/query/concurrency/network/payload/logging, warm-up JVM/pool/DB buffer. Thu nhiều mẫu, p50/p95/error rate và ghi số mẫu; counter/metric chứng minh source giảm. Timer trong body chỉ chạy lúc miss nên không đo toàn hits; API/client timer là E2E. Kế hoạch chỉ nói “gọi curl hai lần” không đạt hết.

## Câu 5 - Số giả định

Trong workload này latency/DBcalls giảm, không tăng HTTPerror. Không chứng minh mọi request nhanh hơn, SLA production hoặc freshness/outage/memory. Hai kiểm bổ sung có thể: mutation+expiry correctness, Redis outage dưới tải, nhiều filter/key diversity/memory, concurrency stampede. Mỗi kiểm cụ thể gắn rủi ro được1đ; lặp “test thêm” không đủ.

## Câu 6 - RAM

Key cònTTL vẫn có thể bị eviction theo memory policy; policy khác có thể từ chối writes. Expiration theo thời gian khác eviction do RAM. Key quá đa dạng ít hit tốn RAM/network/serialization. Đo hit/miss/memory/querycost rồi giới hạn query được cache/size hoặc bỏ cache không lợi. Không nói Redis luôn giữ key đủ TTL.

## Câu 7 - Scope

Query rẻ/ít lặp có thể bị overhead cache làm chậm. Checkout/tồn kho cần kiểm DB/transaction đúng. Dữ liệu theo user/quyền phải scope/evict đúng hoặc không cache. AI output thay theo version/context/params/quyền, prompt-only key có thể sai/leak; chọn metadata deterministic/public hoặc thiết kế key/policy đầy đủ trước. Không đòi học semantic cache trong câu này.

## Câu 8 - Lời hứa thật

Kiểm data/keys/metadata trước tốc độ; hit/miss/TTL; mutation/after-commit/failure; outage/concurrency; benchmark có đối chứng/điều kiện. Redis thật+fake source chỉ chứng minh cơ chế được test, không JPA/DBrollback/HTTP/SLA. Đọc hoặc fixture đạt không tự thành deliverable code+đo shopcore. Điểm kiến thức và tiến độ deliverable phải ghi tách.

Ôn Lesson04 mục1–8, nhất là fail-open không tự tồn tại và phép đo không được bỏ correctness.
