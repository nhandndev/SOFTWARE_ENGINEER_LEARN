# M5-3 Microservices · Lesson 02 · Trade-off và ADR

`PHONG_VAN` theo lesson: 8 tình huống × 5 = 40 điểm, đạt từ 34/40. Khoảng 45 phút. Trả lời bằng reasoning/sơ đồ/ADR ngắn, không code service mesh hoặc saga. [Bài học](../../Notes/M5_Scalability/M5_3_Microservices/LESSON_02_TRADEOFFS_EXTRACTION_ADR.md).

Mọi số liệu/đội ngũ trong đề là giả định, không phải benchmark shopcore.

## Câu 1 - API chậm thì tách?

List Product chậm nhưng chưa profile; team đề nghị tách Product service cho nhanh. Cần đo gì, loại bottleneck nào cần loại trừ, alternative nào ít chi phí hơn, tách giải quyết/không giải quyết phần gì? Khi nào có bằng chứng đủ đáng xem xét scale/deploy riêng?

**Trả lời:**

## Câu 2 - Hai team cần release riêng

Hai team có owner/pipeline/on-call, nhưng thay đổi Notification độc lập hay phải chờ release Order chung. Đây có phải tín hiệu nên xem xét tách không? Nêu lợi ích, kiểm contract/data coupling gì, chi phí mới, vì sao số team một mình chưa đủ và cải thiện nào có thể thử trong monolith.

**Trả lời:**

## Câu 3 - Process riêng vẫn kéo nhau chết

Ordering gọi Notification đồng bộ không timeout, pool cạn khi Notification chậm. Tách process có tự isolation không? Nêu timeout, retry/idempotency/budget, giới hạn tài nguyên/circuit breaker và hướng durable async; notification có thể degrade thế nào mà payment/stock không được báo thành công giả?

**Trả lời:**

## Câu 4 - Reserve đã commit nhưng timeout

Inventory commit giữ chỗ rồi response mất. Ordering biết chắc thất bại chưa? Retry với ID mới có nguy cơ gì? @Transactional ở Ordering có rollback Inventory không? Nêu status/idempotency hướng giải quyết và phân biệt compensation với rollback; eventual consistency cần cơ chế gì chứ không chỉ đợi.

**Trả lời:**

## Câu 5 - Mang AI vào shopcore

Bạn cần Python/GPU inference, còn Product/Category CRUD ổn. Có thể tách worker riêng mà giữ backend monolith không? Lý do runtime/scale nào cần xác minh, contract/job/error/idempotency cần gì, chi phí vận hành nào phải tính, và vì sao không vì thế tách mọi CRUD?

**Trả lời:**

## Câu 6 - Kế hoạch tách một phần

Đề xuất 5–7 bước extraction Notification theo hướng incremental: boundary/owner/contract, baseline/success criteria, data ownership/migration, chuyển traffic, quan sát và rollback. Vì sao dual-write tùy tiện nguy hiểm và rollback app không chắc rollback data? Không cần triển khai routing/tooling.

**Trả lời:**

## Câu 7 - Review ADR thiếu bằng chứng

ADR viết: “Accepted. Shopcore đã modular hoàn chỉnh và có 1 triệu user; tách 10 service vì microservices luôn nhanh hơn. Không nhược điểm. Khi trên 3 dev tự tách tiếp.” Không có số đo hoặc reviewer. Hãy sửa fact/assumption/status, decision/options/reason, consequences, review trigger và validation/history khi thay quyết định.

**Trả lời:**

## Câu 8 - ADR nhỏ của bạn

Case giả định: một người học, chưa đo production, mục tiêu hiểu backend rồi AI; chưa có team cần release riêng. Hãy viết ADR ngắn gồm:

- Context/fact/assumption.
- Ít nhất hai options, decision và lý do trong context.
- Lợi ích, mặt trái/rủi ro và mitigation.
- Trigger xem xét lại, ai review và nguồn bằng chứng.
- Status phù hợp và cách validation/giới hạn chưa code hoặc chưa đo.

Có thể chọn phương án khác mẫu nếu reasoning/constraints nhất quán. Không coi ADR bạn viết trong đề là đã merge deliverable.

**Trả lời:**
