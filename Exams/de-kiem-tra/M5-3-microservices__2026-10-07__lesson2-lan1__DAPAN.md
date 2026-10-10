# Bài giải M5-3 · Lesson 02

40 điểm, đạt từ 34. [Quy tắc](../../Notes/M5_Scalability/M5_3_Microservices/QUY_TAC_CHAM.md). Chấm reasoning theo context, không chấm chọn đúng khẩu hiệu. Số liệu/đội ngũ đề là giả định.

| Câu | Rubric, tổng 5 điểm |
|---|---|
| 1 | Profile/latency/load/resource evidence (1); SQL/index/N+1/pool/provider bottleneck (1); alternative phù hợp trước tách (1); tách không sửa query cũ và thêm network (1); riêng workload/team/failure có bằng chứng để review (1) |
| 2 | Tín hiệu autonomy có lý do (1); contract/data/change coupling cần kiểm (1); chi phí network/ops/test/security (1); số team không trigger tự động (1); ownership/module/pipeline alternative (1) |
| 3 | Separate process không tự isolation (1); timeout không chứng minh chưa effect (1); retry idempotency/budget tránh amplification (1); resource limits/breaker/async có trade-off (1); notification trễ khác payment/stock success giả (1) |
| 4 | Timeout là chưa biết kết quả (1); retry ID mới có thể reserve lặp, status/ID ổn định (1); local tx không rollback remote DB (1); compensation là hành động nghiệp vụ có thể fail (1); eventual cần delivery/reconcile/error policy (1) |
| 5 | Worker riêng và monolith cùng tồn tại được (1); runtime/scale evidence (1); job contract/status/deadline/idempotency/security (1); ops/cost/failure owner (1); không suy mọi CRUD cần tách (1) |
| 6 | Boundary/owner/contract (1); baseline/success criteria (1); owner data/migration không dualwrite tùy tiện (1); chuyển phần traffic và đo correctness/error/cost (1); rollback gồm data không chỉ app (1) |
| 7 | Fact chưa biết tách khỏi assumption và Proposed/reviewer (1); bỏ always-fast, so options theo constraint (1); ghi consequences/mitigation (1); trigger có evidence/owner không auto3dev (1); validation chưa có, giữ history/supersede (1) |
| 8 | Context/fact/assumption rõ (1); options+decision+reason nhất quán (1); lợi ích+nhược+risk/mitigation (1); trigger+owner+evidence (1); status phù hợp/validation/limits không tự merge (1) |

## Câu 1 - Đo trước khi chọn thuốc

Profile API/DB/resources dưới workload đại diện, xác định query N+1/index/pool/CPU hoặc provider. Thử tối ưu đúng bottleneck, cache có đo, async job hoặc scale monolith theo case. Service mới chạy SQL cũ không tự nhanh và thêm network. Review extraction khi scale/release/isolation của capability có nhu cầu đo được và readiness tương ứng, không từ một request chậm.

## Câu 2 - Autonomy

Blocked releases dù thay đổi độc lập là tín hiệu đáng xem xét. Kiểm contract backward compatibility, data owner/shared schema và change coupling để không giữ lockstep sau khi tách. Tính ops/network/testing/security/on-call. Có owner và hai team chưa đủ tự động; module ownership/pipeline trong monolith có thể giải quyết một phần trước.

## Câu 3 - Cascading failure

Separate process vẫn coupled qua call giữ pool. Timeout giới hạn chờ nhưng remote effect có thể đã xảy ra. Retry phải có idempotency/budget/backoff và tránh nhiều tầng khuếch đại. Pool giới hạn/breaker/durable async có thể giảm blast radius, đổi lại queue/retry/lag quản lý. Có thể notification trễ theo policy, không giả payment/stock đã thành công.

## Câu 4 - Uncertainty

Inventory có thể đã reserve; mất response không chứng minh thất bại. Retry cùng operation ID hoặc hỏi status, không đổi ID để reserve thêm. Ordering local tx không rollback remote DB. Compensation như release/refund là hành động mới có thể lỗi/retry; eventual consistency cần delivery/reconcile/error ownership để hội tụ, không phải hứa chờ tự đúng.

## Câu 5 - AI runtime

Một worker Python/GPU có thể là thành phần riêng trong hệ thống có core monolith. Xác minh nhu cầu resource/scale/runtime, không chỉ muốn thêm framework. Contract gồm jobId/model version/input policy/status/deadline/idempotency, auth/PII; có owner, observability, retry budget/cost. Không vì runtime worker khác mà Product/Category phải thành nhiều service.

## Câu 6 - Extraction

Chọn capability/owner; định contract/boundary; đo baseline và success criteria; lập owner data/migration/sync strategy; chuyển một phần workflow; theo dõi correctness/latency/errors/backlog/cost; mở rộng hoặc rollback. Dual-write tùy tiện tạo state lệch; rollback app không hoàn tác data đã đổi nên cutover/rollback phải kiểm phần data. Không bắt đủ đúng 7 tên bước nếu đủ ý trong rubric.

## Câu 7 - Sửa ADR

Không có evidence thì không ghi 1 triệu user/modular đã hoàn chỉnh. Chưa phê duyệt thì Proposed, ghi reviewer/owner. So giữ monolith/modularize/tách phần theo constraint, bỏ microservices always-fast. Có costs/risks/mitigation, trigger review bằng số đo/release pain/readiness thay vì auto3dev. Ghi validation chưa làm; decision đổi thì ADR mới supersede giữ lịch sử.

## Câu 8 - Một đáp án tham khảo

Proposed: giả định một người phụ trách, fact chưa có production benchmark; mục tiêu học flow/correctness. So giữ một deployable hướng module với tách service ngay; chọn một deployable vì chưa có evidence autonomy/scale đủ bù ops. Lợi: local debug/tx đơn giản hơn; hại: deploy/scale chung và shared failure; giảm bằng boundary review/query profiling/resource controls. Review khi backlog/resource hoặc blocked independent releases có bằng chứng; người học review profile/incident/release logs. Chưa code/đo nên chưa chứng nhận effectiveness hoặc merge. Phương án khác có đủ 5 cụm ý và reasoning nhất quán được điểm tối đa.
