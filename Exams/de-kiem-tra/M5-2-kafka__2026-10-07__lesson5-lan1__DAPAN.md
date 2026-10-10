# Bài giải M5-2 · Lesson 05

40 điểm, đạt từ 34. [Quy tắc](../../Notes/M5_Scalability/M5_2_Kafka/QUY_TAC_CHAM.md). Không yêu cầu thuộc setter, phải đúng failure semantics.

| Câu | Rubric, tổng 5 điểm |
|---|---|
| 1 | Decode trước business (1); invalid contract trong business/fatal policy (1); DB transient retry hữu hạn (1); container handler không MVC advice (1); producer error boundary riêng (1) |
| 2 | Đầu+2retry=3 calls (1); fatal có thể recover ngay (1); blocking ảnh hưởng tiến độ/order (1); không timing tuyệt đối2s (1); infinite poison risk (1) |
| 3 | DLQ khái niệm/DLT topic (1); quarantine không business success (1); payload+topic/partition/offset/error/group (1); owner/replay và lag không đủ (1); PII/ACL/retention/log (1) |
| 4 | Raw bytes gốc (1); JSON-only có thể encode lại bytes (1); delegate bytes/event serializer (1); DLT đủ partition theo resolver (1); topic name explicit (1) |
| 5 | Recovery giả có thể vượt source (1); send error phải báo/không recover success (1); crash sau DLT có duplicate (1); không atomic DLT+offset (1); replay/DLT idempotency và audit (1) |
| 6 | ID mới có thể nhân effect (1); group/effect scope có chủ đích (1); cùng sự việc giữ ID, contract được sửa có policy (1); audit nguồn/lỗi/sửa/replay (1); marker lifecycle phủ replay (1) |
| 7 | Valid+duplicate DB đúng (1); malformed bytes và invalid không effect (1); retryable3/finite classification (1); recovery failure không success/offset evidence (1); broker/container/DB tests khác unit method (1) |
| 8 | Production props không tự merge/TLS/ACL/replication/timeouts (1); log metadata/metric lag/retry/DLT an toàn (1); eventId label cardinality (1); AI duplicate billing và chọn Kafka theo nhu cầu (1); lesson QA không deliverable (1) |

## Câu 1 - Classification

Decode lỗi trước business được wrapper chuyển handler; contract invalid trong Service không tự hết khi đợi nên mẫu không retry. DB transient retry hữu hạn. Container error handler xử lý Kafka, không HTTP advice. Producer send failure phải quan sát tại producer; handler consumer chưa có record thì không chữa lỗi đó.

## Câu 2 - Attempts

Đầu → lỗi → đợi khoảng1s retry1 → lỗi → đợi khoảng1s retry2 → recover: ba business attempts cho lỗi retryable trong chu kỳ. Fatal có thể recover ngay. Blocking làm record/partition chờ; không hứa đúng2s do processing/poll/scheduling. Infinite retry poison có thể chặn mãi. Non-blocking có trade-off ordering, không tự chọn cho mọi case.

## Câu 3 - Quarantine

DLQ là khái niệm, DLT là topic thực hiện mục đích đó. Notification chưa thành công. Giữ payload/metadata gốc cùng lỗi/group để điều tra, có owner/replay policy. Lag source thấp có thể do chuyển DLT hàng loạt, phải xem DLT/failure/business outcome. Dữ liệu/stacktrace cần ACL, retention và log an toàn.

## Câu 4 - Bytes

Không deserialize được nên recoverer phải giữ raw bytes; JSON serializer cho byte[] có thể encode base64/JSON, không còn payload gốc. Delegating serializer chọn ByteArraySerializer cho bytes, Jackson JSON cho event. Cùng partition thì DLT ít nhất đủ các partition tương ứng source. Tên DLT explicit tránh dựa suffix tutorial/version.

## Câu 5 - Failure không được giấu

Log rồi success có thể cho container checkpoint vượt record chưa cất an toàn. Recoverer phải quan sát send result và throw/recovery fail. Nếu DLT đã nhận nhưng source checkpoint chưa commit rồi crash, DLT có duplicate. Mẫu non-transactional không atomic; processor/replay phải idempotent và có audit, không tự hứa không bao giờ lặp.

## Câu 6 - Replay

ID mới làm duplicate thành event mới, có thể nhân effect. Đổi group/effect identity cũng có thể bỏ dedup cũ, phải có chủ đích. Replay cùng sự việc giữ ID; sửa contract/payload cần policy/audit, không giả vờ là sự việc mới để vượt guard. Ghi nguồn, lỗi, sửa gì, ai replay, outcome; marker sống đủ khả năng replay.

## Câu 7 - Phép kiểm

Valid tạo one/one DB; cùng ID lại vẫn one/one. JSON hỏng DLT giữ bytes, business không chạy; invalid version DLT không notification. Lỗi retryable theo mẫu ba attempts rồi DLT, fatal không retry vô ích. Recovery send fail không coi success/checkpoint an toàn; kiểm source offset và DLT theo config. Unit method không chứng minh decode/container/SQL transaction; cần đúng tầng test. Không yêu cầu thực thi crash test mới được điểm câu thiết kế.

## Câu 8 - Thực tế

Config factory tự tạo không tự merge mọi YAML props: production kiểm TLS/SASL/ACL, replica/min ISR, timeouts và cleanup. Log event metadata hạn chế PII; metric lag/retry/DLT/business outcome, không ID làm label vì cardinality. Kafka không atomic với API AI/provider billing, cần idempotency ngoài. Workflow nhỏ không cần replay/fan-out/capacity có thể dùng job đơn giản. Soạn lesson/AI tests không chứng nhận learner hoàn thành deliverable.
