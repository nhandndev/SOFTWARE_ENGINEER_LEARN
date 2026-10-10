# Bài giải M5-2 · Lesson 04

40 điểm, đạt từ 34. [Quy tắc](../../Notes/M5_Scalability/M5_2_Kafka/QUY_TAC_CHAM.md). Gắt ở boundary/race, không giao implementation outbox hoặc SMTP ngoài bài.

| Câu | Rubric, tổng 5 điểm |
|---|---|
| 1 | Producer retry scope (1); checkpoint scope (1); consumer effect cần dedup (1); durable DB effect có boundary (1); email ngoài DB không atomic (1) |
| 2 | Restart mất Set (1); pod không chung RAM (1); exists race (1); unique phân xử (1); transaction chung marker/effect vẫn cần (1) |
| 3 | Insert unique marker (1); rows0 duplicate return (1); rows1 mới effect (1); cùng transaction (1); lỗi rollback marker/effect (1) |
| 4 | Unique điều phối race/chờ (1); T1 commit thì T2 không claim (1); T1 rollback thì T2 có thể claim (1); test tuần tự không chứng minh race (1); proxy cùng datasource/manager (1) |
| 5 | Timeline email đã gửi rồi DB rollback (1); DB chỉ rollback DB (1); retry có thể gửi lặp (1); durable job/provider key (1); provider thiếu idempotency vẫn có uncertainty (1) |
| 6 | DB có event thiếu (1); event có DB rollback (1); afterCommit vẫn crash/mất send (1); outbox atomic DB+relay có thể duplicate (1); không atomic chung bằng một annotation (1) |
| 7 | Marker hết sớm có thể effect lặp (1); retry/replay giữ ID (1); effect identity ổn định qua group đổi có chủ đích (1); orderId khác eventId (1); ID cùng payload identity contract/audit conflict (1) |
| 8 | Tuần tự one marker/effect (1); concurrent one marker/effect (1); effect fail zero/zero rồi retry one/one (1); instance mới vẫn dedup DB (1); giới hạn fake/inbox không outbox/email (1) |

## Câu 1 - Không thay nhau

Producer idempotence bảo vệ retry giao thức được hỗ trợ. Offset commit lưu điểm resume, không atomic với effect. Consumer vẫn cần durable dedup khi effect commit rồi crash trước checkpoint. Marker/effect chung DB transaction có thể giữ một effect DB, không rollback SMTP hoặc bảo đảm exactly-once email.

## Câu 2 - Race

Set mất khi restart và không chia sẻ giữa pod. Hai exists cùng false vẫn có thể cùng làm effect. Unique constraint là nơi phân xử atomic giữa transaction, nhưng nếu marker/effect commit riêng thì crash vẫn để marker không effect hoặc effect không marker. Phải boundary chung cho effect trong DB.

## Câu 3 - Thuật toán

Begin DB tx, insert marker unique consumer/event với conflict không gây abort. Affected rows0 nghĩa effect đã commit trước nên return hợp lệ. Rows1 mới insert notification. Cả hai commit cùng nhau; effect throw thì rollback marker. Không catch unique exception của transaction đã abort rồi chạy tiếp tùy tiện.

## Câu 4 - Cùng lúc

Unique constraint có thể làm T2 chờ T1 kết thúc. T1 commit thì T2 không claim và không effect; T1 rollback thì T2 có thể insert rồi effect. Test tuần tự không ép contention. Gọi bean proxy, cùng datasource/transaction manager và infrastructure thật; tự new bỏ annotation không đủ.

## Câu 5 - Ngoài resource

Mark pending → SMTP đã gửi → SQL insert lỗi → DB rollback → retry gửi SMTP lần hai. DB không rollback email. Durable notification job/outbox tách việc gửi và provider idempotency key giảm duplicate; provider thiếu khả năng đó thì timeout/response lost còn trạng thái không chắc, không hứa tuyệt đối.

## Câu 6 - Dual-write

Commit DB rồi crash trước send mất event; send rồi DB rollback tạo event không có business state hợp lệ. AfterCommit tránh publish trước commit nhưng crash trước callback/send còn mất event. Outbox ghi Order+event cùng DB tx, relay publish/mark có duplicate window nên giữ eventId và consumer dedup. Một @Transactional không atomic DB–Kafka chung.

## Câu 7 - Vòng đời

Xóa marker trước hết khả năng replay cho phép effect lặp. Replay/retry cùng sự việc giữ ID. Group và effect identity khác vai trò, thay group không ngẫu nhiên reset dedup effect. Order có nhiều sự việc nên không dùng orderId chặn tất cả. Cùng eventId phải cùng identity/payload contract; conflict cần phát hiện/audit theo policy, mẫu chưa có hash check.

## Câu 8 - Bằng chứng

Hai lần E1 tuần tự: one/one. Hai transaction concurrent E1: one/one. Ép effect INSERT lỗi: zero/zero, gỡ lỗi retry: one/one. Instance mới dùng cùng DB vẫn one/one. Map/fake không chứng minh PostgreSQL unique/rollback; các test inbox không chứng minh producer outbox, source offset crash schedule hay email exactly-once.
