# Kế hoạch phủ kiến thức M5-2

## Roadmap → lesson → kiểm tra

| Yêu cầu roadmap | Dạy ở đâu | Kiểm ở đâu |
|---|---|---|
| Topic, partition, consumer group | Lesson 01 mục 2–6 | Đề 01 câu 1–6, 8 |
| Producer Spring Kafka | Lesson 02 mục 3–5 | Đề 02 câu 3, 4, 6, 8 |
| Consumer Spring Kafka | Lesson 03 mục 1–3, 5 | Đề 03 câu 1, 2, 5, 6, 8 |
| At-least-once | Lesson 03 mục 4 | Đề 03 câu 3, 4, 7 |
| Idempotent consumer | Lesson 04 mục 1–5, 8–9 | Đề 04 câu 1–5, 7–8 |
| JSON event serialization | Lesson 02 mục 1–3, 6 | Đề 02 câu 1, 2, 5, 7 |
| Error handling/DLQ khái niệm | Lesson 05 mục 1–5 | Đề 05 câu 1–5 |
| Publish order-placed → notification | Lesson 02–05, code thành phần và flow | Đề 02/03/04/05 câu kiểm chứng; không tự nhận đã tích hợp shopcore |

## Kiến thức bổ sung có chủ đích

- DB–Kafka dual-write, outbox nhận diện: Lesson 04 mục 7, đề 04 câu 6. Không bắt viết relay/CDC.
- Consumer annotation khác MVC entry point: nối với luồng request bạn đã học, tránh RestControllerAdvice bị dùng nhầm.
- DLT raw bytes và recovery failure: giúp ví dụ không hỏng ngay khi gặp malformed JSON; không mở rộng thành khóa vận hành cluster.
- Schema evolution, replay, dedup lifetime và observability tối thiểu: những giới hạn cần biết để không gọi “exactly-once mọi thứ”.

## Nhịp học

Mỗi buổi khoảng 4h có thể chia: đọc flow/ví dụ, tự kể lại với event cụ thể, làm 8 tình huống, đối chiếu những ý thiếu. Không cần đọc lại cả module vì thiếu một ý; ôn đúng mục được chỉ ra trong snapshot chấm sau này.

Một khái niệm xuất hiện lại phải có độ sâu mới: Lesson 01 hiểu checkpoint là gì; Lesson 03 đặt crash vào timeline; Lesson 04 giữ effect an toàn khi checkpoint chưa xong. Không ra lại cùng câu định nghĩa chỉ để tăng số lesson.

## Ranh giới soạn sẵn

Đang học các module trước vẫn có thể đọc bộ chuẩn bị này, nhưng tạo tài liệu không đổi module hiện tại, score, ngày kiểm tra hoặc checklist. Capstone/deliverable vẫn chưa được chứng nhận. Khi chấm bài thật tạo snapshot theo AGENTS và ghi đủ đúng/thiếu/cách sửa cho từng câu.
