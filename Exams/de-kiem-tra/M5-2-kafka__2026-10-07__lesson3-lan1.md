# M5-2 Kafka · Lesson 03 · Consumer, offset, delivery

`PHONG_VAN` theo lesson, 8 × 5 = 40 điểm; đạt từ 34. Khoảng 40 phút. Ưu tiên timeline và ý nghĩa, không ép viết code chạy được. [Bài học](../../Notes/M5_Scalability/M5_2_Kafka/LESSON_03_CONSUMER_OFFSET_DELIVERY.md).

## Câu 1 - Có đi qua Controller không?

Kể luồng broker bytes → consumer poll → deserialize → listener → Service → checkpoint. Nó có đi qua DispatcherServlet không? Nếu deserialize hoặc Service throw thì ai xử lý; RestControllerAdvice có trả HTTP response cho Kafka không?

**Trả lời:**

## Câu 2 - RECORD và auto commit

Mẫu tắt enable-auto-commit và chọn ack-mode=record. Ai quản checkpoint và khi nào listener bình thường được checkpoint? Có nghĩa mỗi poll chỉ lấy một record không? Vì sao manual ack không tự an toàn hơn? Offset commit khác transaction JPA thế nào?

**Trả lời:**

## Câu 3 - Commit sớm

Committed offset đang 8. Poll record8, commit9, app chết trước business insert. Resume từ đâu, notification8 ra sao, record8 có nhất thiết bị xóa khỏi Kafka không? Đây là nguy cơ delivery nào? Sửa thứ tự xử lý/commit và nói nguy cơ mới đi kèm.

**Trả lời:**

## Câu 4 - DB xong nhưng offset chưa xong

Poll8, DB notification commit, app chết trước offset9. Restart đọc gì? Vì sao đây là cửa sổ at-least-once, notification có thể trùng thế nào? Cần cơ chế gì ở consumer? Có được gọi là exactly-once toàn workflow không?

**Trả lời:**

## Câu 5 - Catch và log

Listener gọi inbox.accept(event), catch mọi Exception, log rồi return. Container thấy gì, checkpoint có nguy cơ gì, còn tự retry business không? Hãy sửa ý tưởng boundary lỗi và phân biệt duplicate đã xử lý thành công với lỗi chưa xử lý bị nuốt.

**Trả lời:**

## Câu 6 - Service mất ba phút

Listener làm quá lâu so với max.poll.interval, rồi chuyển task sang executor và return ngay để “fix”. Nêu nguy cơ rebalance/redelivery, checkpoint sớm, đảo thứ tự; KafkaConsumer có tùy tiện dùng chung giữa threads không? Đề xuất timeouts/capacity/work-size thay vì chỉ tăng consumer vô hạn.

**Trả lời:**

## Câu 7 - Nói at-least-once phải có giới hạn

Một bạn khẳng định “at-least-once nên cuối cùng notification nào cũng chắc chắn được gửi”. Nêu điều kiện/giới hạn retention, error/recovery, effect bên ngoài; phân biệt producer ack với notification DB commit và offset commit. Không cần thuộc EOS API.

**Trả lời:**

## Câu 8 - Test bằng gọi method

Test new listener(...).onOrderPlaced(event) chạy đúng. Nó chứng minh được gì, chưa chứng minh deserializer/container/checkpoint/DB proxy gì? Hãy thêm một kiểm broker restart consumer, một kiểm crash window và nói cần nhìn DB/offset nào. Không cần chạy thật.

**Trả lời:**
