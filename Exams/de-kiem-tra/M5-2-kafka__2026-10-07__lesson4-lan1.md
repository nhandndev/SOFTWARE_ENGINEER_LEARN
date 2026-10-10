# M5-2 Kafka · Lesson 04 · Idempotency và DB boundary

`PHONG_VAN` theo lesson, 8 × 5 = 40 điểm; đạt từ 34. Khoảng 45 phút. Dùng lời/pseudocode/SQL ý tưởng, chấm transaction/race chứ không thuộc cú pháp. [Bài học](../../Notes/M5_Scalability/M5_2_Kafka/LESSON_04_IDEMPOTENCY_DB_BOUNDARY.md).

## Câu 1 - Ba cơ chế có thay nhau không?

Producer enable.idempotence=true, consumer commit sau xử lý. Bạn vẫn cần consumer dedup không? Nêu phạm vi producer idempotence, offset commit, durable consumer dedup; vì sao không suy exactly-once email ngoài DB?

**Trả lời:**

## Câu 2 - Set và exists

Hai pod dùng Set trong RAM để nhớ eventId, hoặc check exists trước rồi insert. Chỉ ra lỗi khi restart, giữa hai pod và race cùng lúc. Unique constraint giải quyết phần nào? Tại sao unique thôi chưa đủ nếu marker/effect nằm ở hai transaction?

**Trả lời:**

## Câu 3 - Marker trước, effect sau

Mô tả đúng thuật toán insert marker với unique(consumer_name,event_id), đọc affected rows rồi insert notification. Đặt transaction boundary ở đâu, duplicate return vì sao đúng, effect fail thì marker ra sao? Không yêu cầu thuộc syntax ON CONFLICT.

**Trả lời:**

## Câu 4 - Hai worker cùng E1

Hai transaction T1/T2 cùng eventId, marker chưa tồn tại. Nêu vai trò unique constraint/chờ transaction đối thủ. Nếu T1 commit thì T2 thế nào; nếu T1 rollback thì T2 có thể làm gì? Vì sao gọi tuần tự hai lần chưa đủ chứng minh race, và cần transaction proxy/manager nào?

**Trả lời:**

## Câu 5 - SQL inbox khác email

Mẫu hai bảng cùng DB chạy đúng. Một bạn thêm sendEmail() vào giữa hai INSERT rồi nói exactly-once. Cho một crash/rollback timeline khiến email lặp, nói DB rollback được gì/không được gì, và hướng durable job/provider idempotency cùng giới hạn khi provider không hỗ trợ.

**Trả lời:**

## Câu 6 - DB Order và Kafka

Nêu hai lỗi đối nghịch khi DB commit rồi send, hoặc send rồi DB rollback. AfterCommit callback giải quyết phần nào và còn cửa sổ nào? Outbox ghi gì trong transaction, relay có thể lặp không? Một @Transactional có atomic DB+Kafka không?

**Trả lời:**

## Câu 7 - Giữ dedup bao lâu?

Bạn xóa marker sau 1 ngày nhưng Kafka/replay có thể đọc event 7 ngày. Có nguy cơ gì? Event retry/replay có đổi ID không? Đổi group có nên đổi effect identity tùy tiện không? Dùng orderId làm dedup tất cả event có sai không? Cùng eventId khác payload phải có contract/policy gì?

**Trả lời:**

## Câu 8 - Thiết kế kiểm DB idempotency

Đề xuất kiểm duplicate tuần tự, concurrent duplicate, effect insert lỗi và retry, dùng instance mới/restart. Mỗi bước nêu expected row counts. Cuối cùng nói giới hạn của test Map/fake và điều DB inbox tests chưa chứng minh về producer/outbox/email.

**Trả lời:**
