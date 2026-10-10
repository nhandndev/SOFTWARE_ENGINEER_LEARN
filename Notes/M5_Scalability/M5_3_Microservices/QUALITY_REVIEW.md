# Kiểm chất lượng M5-3 · Microservices

Ngày rà: 2026-10-07. Đây là review tài liệu/đề/ADR mẫu, không phải điểm học viên, benchmark hoặc chứng nhận đã triển khai microservices.

## Task 1 · Roadmap và cách học

Đã đọc AGENTS, roadmap M5-3, prompt tạo đề, tiến độ và format bộ Kafka gần nhất. Scope đúng 8h / 2 buổi: monolith vs microservices, bounded context, điều kiện team/scale/failure isolation, ops cost và ADR.

Giữ **2 lesson** đủ sâu, không chia nhiều buổi lặp định nghĩa. Hai đề PHONG_VAN theo lesson, 8 tình huống/đề, 40 điểm, đạt từ 34; tổng 16 câu có bài giải/rubric riêng. Có tài liệu chính thức/nguồn tác giả và từ khóa video trong mỗi lesson. Không tự nhận đã kiểm chứng video cụ thể.

Không giao code saga orchestration, mesh, Kubernetes, CQRS hoặc nhiều project. Deliverable roadmap là ADR ở shopcore/docs, không phải tách microservices. Bộ template/mẫu trong Notes không nộp thay người học; capstone vẫn chưa được xác nhận hoàn thành.

## Task 2 · Review Lesson 01 theo các phân biệt dễ sai

| Phân biệt | Cách dạy đã kiểm | Câu hỏi tương ứng |
|---|---|---|
| Layer / bean / deployable / context | @Service không là process, chia 3-layer không là 3 microservice | Đề 01 câu 1,4 |
| Monolith / modular monolith / microservices | Nhiều instance scale được; module boundary khác số folder; không định nghĩa bằng repo count | Câu 2,7 |
| Product của Catalog/Ordering/Inventory | Snapshot lịch sử khác owner giá hiện tại; contexts là candidates cần xác nhận domain | Câu 3,8 |
| Data ownership / physical server | Private data/contract, schema/user có thể chung host nhưng còn shared failure/resource risk | Câu 5 |
| Local call / local DB transaction / external effect | JVM không tự atomic, local event không tự durable, remote tx/timeout riêng | Câu 6 |
| Distributed monolith | Shared table/entity và lockstep coupling, shared utility không luôn bị cấm | Câu 7 |

Sơ đồ local và remote dùng cùng bối cảnh để nhìn sự thay đổi thật. Mỗi mũi tên có giải thích, không chỉ đưa Mermaid rồi bắt nhớ hình. Order/Inventory/Notification được ghi rõ là ví dụ mở rộng, không nói đã chạy trong workspace.

## Task 3 · Review Lesson 02 và ADR

| Nội dung | Điểm đã rà | Đề tương ứng |
|---|---|---|
| Khi nào tách | Evidence bottleneck/release/failure và alternatives; không luôn microservices hoặc luôn monolith | Đề 02 câu 1,2 |
| Ops/failure cost | Network/pool/timeout/security/test/owner/cost, separate process không tự isolation | Câu 2,3 |
| Data/timeout | Timeout không chắc remote thất bại; operation ID ổn định, compensation không SQL rollback, eventual cần recovery | Câu 4 |
| AI worker | Runtime/scale khác có thể tách worker riêng nhưng không bắt tách CRUD; có job/status/security/cost | Câu 5 |
| Extraction | Incremental, owner/contract/baseline/data/cutover/rollback; app rollback không undo data | Câu 6 |
| ADR | Fact/assumption, options/reason, consequences/mitigation, owner/review evidence, status/history/limits | Câu 7,8 |

ADR template và mẫu có đủ Context, Options, Decision, Consequences, Revisit Triggers, Validation And Limits; mẫu ở trạng thái Proposed. File mẫu không khẳng định module boundaries, Kafka integration hoặc production workload đã có. Các trigger là yêu cầu review có bằng chứng, không rule “trên N developer/requests thì tự tách”.

Nguồn đối chiếu chính: [Bounded Context](https://martinfowler.com/bliki/BoundedContext.html), [data ownership](https://microservices.io/patterns/data/database-per-service.html), [AWS lựa chọn kiến trúc](https://docs.aws.amazon.com/whitepapers/latest/microservices-on-aws/microservices-on-aws.html), [ADR process](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html). Link chi tiết từng phần nằm trong lesson.

## Task 4 · Đề, rubric và phản ví dụ

Đã đối chiếu 16 câu với mục đã dạy và rubric 5 điểm/câu. Câu ADR hỏi trước đủ các cụm context/options/consequences/trigger/status/validation, không thêm tiêu chí ẩn lúc chấm. Không trừ cú pháp khi đề cho phép reasoning/sơ đồ. Rubric nhận phương án khác nếu nhất quán, không ép “giữ monolith” mới đủ điểm.

Các phản ví dụ đã rà bằng reasoning:

| Phản ví dụ | Kết luận hợp lệ trong bài |
|---|---|
| Monolith có 3 instance, microservices có chung DB host | Instance/host count không quyết định style; ownership/deployability và shared risk mới cần xét |
| Kafka trong một deployable | Có messaging vẫn có thể là monolith; không suy từ tool thành architecture |
| Catalog đổi giá, Order cũ | Snapshot có mục đích giữ lịch sử, không ép một Entity cho mọi model |
| Inventory commit rồi mất response | Ordering chưa biết kết quả, không được retry ID mới tùy tiện hoặc hứa rollback remote |
| Notification thành service nhưng gọi sync không timeout | Cascading failure vẫn có thể xảy ra, cần policy/resource boundaries |
| ADR ghi Accepted/benchmark không có evidence | Sửa status/fact/assumption và validation; không cho điểm vì lời khẳng định tự tin |

Đây là review lập luận, **không phải runtime tests**. Không dùng “đã test 6 case” để khiến người đọc tưởng đã triển khai distributed system.

## Task 5 · Kiểm cấu trúc, bảo vệ và đồng bộ

Chạy:

```bash
node Notes/M5_Scalability/M5_3_Microservices/verify-structure.mjs --self-test
```

Checker kiểm 2 lesson/2 cặp đề–giải, 16 heading/ô trả lời, 16 rubric đúng tổng điểm, fences, local links, nguồn/video keywords và các section/status của ADR mẫu. Bốn probe cố ý tạo lỗi tổng rubric, broken link, fence và Accepted giả để kiểm checker phát hiện; chỉ là self-test của script, không kiểm kiến trúc tối ưu.

Không sửa source/POM shopcore hoặc roadmap checklist. Tiến độ chỉ thêm nhãn M5-3 “Đã có đề + lesson”, giữ Chưa bắt đầu/điểm/ngày/log nguyên. Đồng bộ bộ này với index Chặng 5 và tiến độ sang Vault Documents, không overwrite các phần học khác bằng bản stale.

## Giới hạn

- Không có implementation Java/distributed runtime mới để compile hoặc test HTTP/Docker; không cần dựng dịch vụ chỉ để làm module khái niệm/ADR.
- Không chứng minh scale/latency/cost/HA của shopcore, không xác nhận mọi architectural boundary đã enforced trong code.
- Mermaid được rà theo nội dung, chưa render bằng Obsidian; script chỉ kiểm đích file local, không bảo đảm URL web tồn tại mãi.
- Số liệu future cases là giả định; không dùng làm evidence production. ADR mẫu chưa Accepted/chưa merge, không thay bài làm của bạn.
- Soạn đủ tài liệu và QA không tự đánh dấu học viên đạt module. Chấm thật phải có snapshot và chỉ cập nhật tiến độ theo quy trình.
