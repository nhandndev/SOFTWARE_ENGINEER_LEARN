# Kiểm chất lượng M5-2 · Kafka

Ngày kiểm: 2026-10-07. Báo cáo này nói về tài liệu/ví dụ đã kiểm, không phải điểm của học viên hoặc deliverable shopcore đã hoàn tất.

## Task 1 · Phạm vi roadmap và format

Đã đọc AGENTS, prompt tạo đề, module 5-2 trong roadmap, tiến độ, POM shopcore và format M5-1. Bộ học gồm 5 lesson theo 20h / 5 buổi, 5 đề PHONG_VAN theo lesson, 5 bài giải/rubric, tổng 40 câu tình huống. Mỗi đề 40 điểm, đạt từ 34.

Giữ style DTO class, BigDecimal, Vietnamese có dấu, giải thích từng mũi tên Mermaid và từng đoạn code. Không bắt thuộc tên API khi đề hỏi bản chất. Tài liệu chính thức và từ khóa tìm video có trong từng lesson; không giả vờ đã xem/kiểm chứng video cụ thể.

Không thêm Kafka Streams, cluster production, full EOS hoặc code relay/CDC thành tiêu chí đạt. Nhận diện dual-write/outbox để tránh hiểu sai giao dịch, không kéo thành khóa nâng cao. Liên hệ AI worker ở job/replay/idempotency, không mặc định cần Kafka cho mọi ứng dụng AI.

## Task 2 · Rà riêng từng lesson

| Lesson | Nội dung/rủi ro đã rà | Độ khớp đề và bài giải |
|---|---|---|
| 01 | Log/retention khác queue xóa khi đọc; offset theo partition; traditional group khác share group; key/order phạm vi rõ; checkpoint khác effect | 8 câu phủ mô hình, capacity, ordering, reset/retention và lab; thêm crash ví dụ ngay lesson để câu checkpoint không đòi ý chưa dạy |
| 02 | Event khác Entity/API DTO; eventId khác key; producer future và lỗi đồng bộ; acks có điều kiện; JSON fixed target; schema evolution | 8 câu hỏi đúng contract/config/flow/verification; starter-json được bổ sung sau compile thật, không dựa dependency tình cờ |
| 03 | Listener không qua MVC; decode lỗi trước business; RECORD khác poll-size; auto/manual checkpoint; catch-return; crash windows/rebalance | 8 câu chấm theo timeline, không gắn RestControllerAdvice vào Kafka; phân biệt method test và container test |
| 04 | Unique race, cùng transaction, rollback và stable event identity; effect giới hạn trong DB; dual-write và email ngoài resource | 8 câu có boundary rõ; không dùng RAM Set/exists làm lời giải bền vững; không yêu cầu implementation outbox ngoài scope |
| 05 | Retry classification/count; DLT không business success; raw bytes đúng serializer; recovery send failure; replay/dedup/metrics | 8 câu có tiêu chí được hỏi trước trong đề; nêu rõ config plaintext tự build props không tự merge toàn bộ SSL/SASL YAML |

Đã đối chiếu từng câu với mục đã dạy và từng ý rubric. Các khái niệm lặp có độ sâu mới: checkpoint definition → crash timeline → durable effect. Chấm một ý sai không tự xóa điểm cả câu hoặc đặt trần điểm toàn đề.

## Task 3 · Compile và integration test thật

Harness lấy 6 class và SQL từ marker trong lesson, không viết lại logic riêng để test dễ đạt. Chỉ thay tên topic constant thành namespace QA ngẫu nhiên và dùng schema PostgreSQL riêng mỗi lần; không đổi thuật toán. Fault mode cố ý bỏ @Transactional trong **bản sao tạm**, không sửa lesson hay source shopcore.

Môi trường: JDK 21, Maven, Boot BOM 4.1.1; image Kafka `apache/kafka:4.1.2`, PostgreSQL `postgres:17`. Kafka digest đã tải:

```text
sha256:5cc2a2fd93fa2687b44015eee04fb2c3edd9e526bd64bf8bec5ff1e268772e0e
```

| Test | Bằng chứng |
|---|---|
| JSON round-trip | Class, eventId, version và BigDecimal đọc lại đúng; malformed JSON bị reject |
| Duplicate tuần tự | Một processed row và một notification |
| Hai sự việc cùng Order | ID khác không bị bỏ nhầm bởi dedup orderId |
| Contract validation | Version/số tiền không hợp policy không được mark processed |
| Effect INSERT lỗi | Marker rollback cùng notification, gỡ lỗi rồi retry được |
| Outer rollback | Hai row đều không tồn tại sau rollback |
| Concurrent duplicate | Hai worker gọi bean transaction thật, vẫn một marker/effect |
| Producer không chờ consumer | Future ack khi listener chưa start; same key cùng partition và offset tăng |
| Broker + Spring container | DTO đến listener, inbox dedup và committed offset vượt record đã xử lý |
| DLT contract/decode failure | Invalid version không có effect; malformed bytes giữ nguyên ở DLT, có metadata và đúng partition |
| Retryable failure | Advice QA gây lỗi tạm trước effect, thực tế 3 attempts rồi DLT; không insert notification |

**Suite: 11 test đạt, không failures/errors/skips.** Đã chạy lại mẫu bình thường sau fault test.

Fault injection bỏ transaction: test rollback marker **thất bại đúng assertion** `expected 0, actual 1`, không phải compile/setup fail. Điều này cho thấy test phát hiện được lỗi marker còn lại sau effect INSERT thất bại. Fault được áp dụng vào fixture riêng; mẫu đúng vẫn giữ @Transactional.

### Lỗi đã tìm và sửa

Compile tối thiểu ban đầu thiếu Jackson core cho JacksonJsonSerializer. Bổ sung `spring-boot-starter-json` theo BOM vào hướng dẫn và fixture, sau đó compile/integration đạt. Starter Kafka không đồng nghĩa JSON runtime đã có; không pin Jackson version cũ để chữa tạm.

## Task 4 · Kiểm cấu trúc và bảo vệ dữ liệu

Script cấu trúc kiểm: 5 lesson, 5 cặp đề/giải, 40 câu và ô trả lời, 40 rubric tổng 5 điểm/câu, mode/ngưỡng, code fences, 6 Java markers và link local có đích. Rà ngữ nghĩa thực hiện riêng ở Task 2; script không chứng minh nội dung đúng chỉ bằng số lượng.

Không sửa POM/source shopcore, không tick roadmap, không đổi điểm/ngày kiểm tra. Chỉ cập nhật nhãn M5-2 “Đã có đề + lesson” ở tiến độ, giữ Chưa bắt đầu. Đồng bộ đúng bộ M5-2, index Chặng 5 và tiến độ vào Vault Documents; không đồng bộ lại các thư mục cũ không liên quan.

## Task 5 · Giới hạn, không nhận quá bằng chứng

- Chưa thực hiện kill process đúng cửa sổ DB commit/offset commit, rebalance fault injection, broker HA hoặc load benchmark.
- Retry test dùng lỗi giả tại Service boundary; không giả đã đo database network outage thật. SQL rollback/race test dùng PostgreSQL thật.
- Chưa ép DLT send failure end-to-end để chứng minh source checkpoint trong failure đó. Chính sách báo recovery error được rà theo API; đề yêu cầu thiết kế kiểm chứng, không nói case này đã chạy.
- Chưa test email/provider/outbox relay/CDC, không chứng minh exactly-once ngoài DB. Notification mẫu chỉ là row trong cùng DB.
- Chưa chạy toàn Order HTTP API hoặc tích hợp vào source shopcore. QA context chỉ có các thành phần cần kiểm Kafka/inbox.
- Mermaid đã rà luồng, chưa render bằng Obsidian; URL tài liệu có thể thay đổi, video mới là từ khóa tìm.
- Dữ liệu/credentials của harness là lab riêng. Không dùng trên broker/DB production. Container QA đã dừng sau kiểm; image/Maven cache và log fixture có thể còn trên máy.

## Chạy lại kiểm chứng

Chỉ kiểm cấu trúc:

```bash
node Notes/M5_Scalability/M5_2_Kafka/verify-structure.mjs
```

Kiểm chức năng cần JDK 21, Maven, Node, Docker. Port 9092 phải rảnh; dùng hai container lab mới, không dùng Kafka/DB có dữ liệu thật:

```bash
docker run --rm -d --name m52-verify-kafka \
  -p 127.0.0.1:9092:9092 apache/kafka:4.1.2

docker run --rm -d --name m52-verify-pg \
  -e POSTGRES_PASSWORD=m52_lab_only -e POSTGRES_DB=m52_qa \
  -p 127.0.0.1::5432 postgres:17

docker port m52-verify-pg
docker exec m52-verify-pg pg_isready -U postgres -d m52_qa
docker exec m52-verify-kafka /opt/kafka/bin/kafka-topics.sh \
  --bootstrap-server localhost:9092 --list
```

Chờ cả hai sẵn sàng. Điền port PostgreSQL lấy từ `docker port` vào biến dưới; 54321 chỉ là ví dụ, không đoán port của container. Đặt JAVA_HOME trỏ JDK 21 nếu máy dùng JDK khác.

```bash
M52_PG_PORT=54321 M52_MAVEN_ONLINE=1 \
  node Notes/M5_Scalability/M5_2_Kafka/verify-examples.mjs

M52_PG_PORT=54321 M52_FAULT=no_tx \
  node Notes/M5_Scalability/M5_2_Kafka/verify-examples.mjs

docker stop m52-verify-kafka m52-verify-pg
```

Lần đầu cho phép Maven tải dependency bằng M52_MAVEN_ONLINE=1; lần sau mặc định offline. Fault mode in Maven BUILD FAILURE là **mong đợi chỉ khi assertion rollback bắt lỗi**; script chỉ trả thành công nếu đúng loại failure đó. Thiếu dependency hoặc compile error không được tính là bắt fault thành công.

Fixture/log ở thư mục tạm được in ra mỗi lần. Namespace topic/schema mới giúp các lần kiểm không trộn dữ liệu; xóa hai container lab sẽ bỏ dữ liệu tạm đó. Nhớ stop cả khi một bước kiểm thất bại.
