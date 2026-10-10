# M5-2 · Kafka Event-Driven

> Soạn sẵn theo roadmap 20h / 5 buổi. Trạng thái học vẫn Chưa bắt đầu; không tự tick checklist hoặc coi AI QA là deliverable của bạn.

Bạn đã biết MVC, DTO, transaction, SQL unique constraint và vừa có bộ Redis. Kafka nối các phần đó bằng **event được lưu, consumer đọc độc lập và effect chịu được nhận lại**. Không dùng Kafka như lời gọi Service “đổi sang annotation”.

## Học theo thứ tự

| Buổi | Bài học | Đề | Giải / rubric |
|---|---|---|---|
| 1 | [Log, partition, consumer group](LESSON_01_LOG_PARTITION_GROUP.md) | [Đề 01](../../../Exams/de-kiem-tra/M5-2-kafka__2026-10-07__lesson1-lan1.md) | [Giải 01](../../../Exams/de-kiem-tra/M5-2-kafka__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [Producer và JSON event](LESSON_02_PRODUCER_JSON_EVENT.md) | [Đề 02](../../../Exams/de-kiem-tra/M5-2-kafka__2026-10-07__lesson2-lan1.md) | [Giải 02](../../../Exams/de-kiem-tra/M5-2-kafka__2026-10-07__lesson2-lan1__DAPAN.md) |
| 3 | [Consumer, offset và delivery](LESSON_03_CONSUMER_OFFSET_DELIVERY.md) | [Đề 03](../../../Exams/de-kiem-tra/M5-2-kafka__2026-10-07__lesson3-lan1.md) | [Giải 03](../../../Exams/de-kiem-tra/M5-2-kafka__2026-10-07__lesson3-lan1__DAPAN.md) |
| 4 | [Idempotency và ranh giới DB–Kafka](LESSON_04_IDEMPOTENCY_DB_BOUNDARY.md) | [Đề 04](../../../Exams/de-kiem-tra/M5-2-kafka__2026-10-07__lesson4-lan1.md) | [Giải 04](../../../Exams/de-kiem-tra/M5-2-kafka__2026-10-07__lesson4-lan1__DAPAN.md) |
| 5 | [Retry, DLT và kiểm chứng](LESSON_05_RETRY_DLT_VERIFICATION.md) | [Đề 05](../../../Exams/de-kiem-tra/M5-2-kafka__2026-10-07__lesson5-lan1.md) | [Giải 05](../../../Exams/de-kiem-tra/M5-2-kafka__2026-10-07__lesson5-lan1__DAPAN.md) |

Mỗi lesson khoảng một buổi học/trace/thi/ôn, không buộc code cả project. Có 8 câu tình huống × 5 = 40 điểm mỗi đề (`PHONG_VAN` theo lesson); đạt từ 34/40. Tổng **40 câu**, không phải một đề DAY_DU cuối module. Nói đúng cơ chế được điểm, không ép thuộc import. Bài giải ở file riêng để tự làm trước khi mở.

## Bối cảnh code thống nhất

- Java 21, shopcore Boot 4.1.1, dependency theo BOM; Redis không là prerequisite để hiểu Kafka, không cần triển khai Redis trước.
- Kafka image lab cố định 4.1.2, KRaft một broker, plaintext localhost; không tuyên bố là bản mới nhất hoặc production HA.
- Event `OrderPlaced`, topic Java lab `order-placed-json-v1`, key orderId, stable eventId, DTO **class**, BigDecimal, JSON serializer theo stack Jackson hiện tại.
- Notification là **in-app row trong PostgreSQL**. Consumer dedup bền vững cùng transaction với effect; không dùng Set trong RAM để giả giải pháp multi-instance.
- Sáu class đầy đủ nằm rải theo lesson, có marker để harness lấy compile. Lesson 03 listener dùng Service được hoàn thiện ở Lesson 04; Lesson 05 bổ sung policy lỗi và producer serializer cho event/raw bytes.
- Đây là ví dụ thành phần, không phải một Order CRUD/project hoàn chỉnh. Khi code thật tích hợp vào shopcore, datasource/migration và business Order có sẵn phải được nối đúng. Không tạo capstone mới.
- Giới hạn rõ: không code Kafka Streams, full EOS transaction, cluster production, outbox relay/CDC hoặc SMTP provider. Học dual-write/outbox ở mức nhận diện để không hiểu sai happy path.

## Ba câu cần hiểu, không cần thuộc lòng

```text
Producer ack: Kafka xác nhận ghi theo policy, không phải notification xong.
DB commit: effect DB đã lưu, không phải source offset đã commit.
Offset commit: checkpoint group, không rollback email hoặc DB.
```

Liên hệ AI Engineer chỉ ở pipeline/job/replay/idempotency: event có thể kích hoạt embedding worker, nhưng Kafka không tự tránh duplicate billing hoặc bảo đảm output model bên ngoài exactly-once.

## Tiêu chí và kiểm chất lượng

[Kế hoạch phủ kiến thức](LESSON_PLAN.md) · [Quy tắc chấm](QUY_TAC_CHAM.md) · [Báo cáo kiểm chất lượng](QUALITY_REVIEW.md).

Đọc xong ≠ đạt đề ≠ deliverable thật. Roadmap gốc yêu cầu publish order-placed và consumer notification với at-least-once/idempotency; đang hoãn capstone thì không tự ghi nhận đã merge/code xong.

```bash
node Notes/M5_Scalability/M5_2_Kafka/verify-structure.mjs
```

Harness broker/DB, cách chạy và giới hạn bằng chứng ghi trong QUALITY_REVIEW. Không trỏ harness vào broker/database thật; không lấy fixture làm benchmark hoặc kết quả học viên.
