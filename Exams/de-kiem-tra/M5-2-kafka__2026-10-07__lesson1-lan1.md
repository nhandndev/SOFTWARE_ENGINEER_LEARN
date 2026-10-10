# M5-2 Kafka · Lesson 01 · Log, partition, group

Chế độ `PHONG_VAN` theo lesson, 8 tình huống × 5 = 40 điểm; đạt từ 34/40 (85%). Khoảng 35–45 phút. Trả lời bằng ý nghĩa/lời/pseudocode, không cần thuộc lệnh. Đây không phải đề cuối toàn module. [Bài học](../../Notes/M5_Scalability/M5_2_Kafka/LESSON_01_LOG_PARTITION_GROUP.md).

## Câu 1 - Notification đọc trước analytics

Order Service ghi một event vào topic. Notification và analytics dùng **hai group khác nhau**. Notification đã đọc xong: analytics còn đọc được không? Giải thích vai trò producer, broker, consumer, và việc Kafka có xóa record ngay sau đọc không.

**Trả lời:**

## Câu 2 - Cùng offset 0

Topic có P0 offset 0=E1(order101), P1 offset 0=E2(order202). Vì sao không lỗi? Cần bộ thông tin nào để chỉ một vị trí record? eventId, orderId khác offset thế nào? Replica có phải consumer thứ hai không?

**Trả lời:**

## Câu 3 - Năm consumer, ba partition

Traditional group có 3 partition và 5 consumer. Tối đa bao nhiêu consumer được giao partition cùng lúc, số còn lại làm gì, một consumer có thể giữ nhiều partition không? Nếu notification/analytics cùng group thì có mỗi bên đủ event không? Muốn độc lập cần gì?

**Trả lời:**

## Câu 4 - Thứ tự Order 101

Bạn cần OrderPlaced và OrderPaid của order101 đi cùng luồng có thứ tự. Chọn key gì, ordering được bảo đảm trong phạm vi nào, khác partition có global order không? Tăng số partition/thay partitioner có gì phải xét? Listener tự giao sang executor tùy ý có thể phá thứ tự business không?

**Trả lời:**

## Câu 5 - Commit 12 nghĩa là gì?

Group commit offset 12 của P0. Lần resume bình thường bắt đầu ở đâu? Consumer position khác committed offset ra sao? Commit này có chứng minh notification DB đã commit không, có phải orderId 12 không? Nêu một crash window liên quan.

**Trả lời:**

## Câu 6 - Earliest và restart

Group đã có committed offset hợp lệ 20, cấu hình earliest rồi restart. Có đọc lại từ đầu không? Khi nào earliest có tác dụng? Consumer chậm hơn retention có nguy cơ gì? Replay cần lịch sử nào và vì sao consumer phải chịu trùng?

**Trả lời:**

## Câu 7 - Lab một broker

Lab bind localhost, replication 1, container `--rm` không volume. Vì sao không được gọi đây là cấu hình HA/production? Đọc topic thành công có chứng minh email gửi xong không? Đổi host port nhưng không sửa advertised listener có thể gặp gì? Dữ liệu có tự còn sau xóa container không?

**Trả lời:**

## Câu 8 - Thiết kế một phép quan sát

Mô tả cách dùng dữ liệu E1/E2 cùng key để kiểm partition/offset; dùng hai group để kiểm đọc độc lập; dùng hai consumer cùng group để kiểm chia việc. Nêu cần quan sát gì và một điều lab này chưa chứng minh được (ví dụ crash recovery hoặc email exactly-once).

**Trả lời:**
