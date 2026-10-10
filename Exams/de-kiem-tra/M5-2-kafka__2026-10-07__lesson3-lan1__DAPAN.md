# Bài giải M5-2 · Lesson 03

40 điểm, đạt từ 34. [Quy tắc](../../Notes/M5_Scalability/M5_2_Kafka/QUY_TAC_CHAM.md).

| Câu | Rubric, tổng 5 điểm |
|---|---|
| 1 | Poll/decode/adapter (1); listener/Service (1); checkpoint theo policy sau success (1); không MVC/Controller (1); container handler, không HTTP advice (1) |
| 2 | Client auto commit tắt, container quản (1); record listener success rồi checkpoint (1); poll có thể nhiều records (1); manual ack sai thời điểm vẫn nguy hiểm (1); offset khác DB tx (1) |
| 3 | Resume9 (1); business8 thiếu (1); bytes không nhất thiết bị xóa (1); at-most-once window (1); xử lý trước commit sau đổi sang nguy cơ lặp (1) |
| 4 | Đọc lại8 (1); DB effect trước checkpoint tạo redelivery (1); insert lặp nếu không dedup (1); durable idempotency (1); không EOS toàn workflow (1) |
| 5 | Return thường được thấy success (1); offset có thể vượt effect thiếu (1); không tự retry lỗi đã nuốt (1); throw đến đúng handler/recovery (1); duplicate đã commit khác lỗi thật (1) |
| 6 | Poll interval/rebalance/redelivery (1); executor return sớm checkpoint (1); completion đảo thứ tự (1); consumer không tùy tiện share threads (1); timeout/work-size/capacity hợp lý (1) |
| 7 | Retention giới hạn (1); lỗi/recover DLT chưa business success (1); effect ngoài DB không atomic (1); ack khác DB commit (1); offset commit khác hai sự kiện kia (1) |
| 8 | Direct method kiểm delegation/logic (1); chưa container/decode/offset (1); tx proxy/DB thật cần kiểm riêng (1); restart group/DB+offset evidence (1); crash sau DB trước offset và effect một lần (1) |

## Câu 1 - Entry point

Consumer client poll và deserialize, adapter gọi listener rồi Service. Với normal success, container checkpoint theo AckMode. Không qua DispatcherServlet/Controller; decode có wrapper hoặc listener/Service throw được container error handler xử lý. RestControllerAdvice không trả HTTP response cho Kafka.

## Câu 2 - Policy

Auto commit của client tắt, container quản checkpoint. RECORD xử lý từng record listener rồi commit theo success policy, không giới hạn mỗi poll một record. Manual ack vẫn sai khi ack trước business hoặc finally. DB commit thuộc transaction resource khác, không đồng nghĩa Kafka checkpoint.

## Câu 3 - Mất effect

Resume9 nên record8 không tự được xử lý lại bởi checkpoint này, notification thiếu. Bytes có thể còn retention; group đã vượt qua. Đó là nguy cơ at-most-once. Làm business trước offset giảm nguy cơ này nhưng phát sinh duplicate nếu crash ở giữa; phải dedup, không tự gọi là EOS.

## Câu 4 - Lặp

Resume8 vì offset9 chưa commit. Business đã commit trước crash nên listener chạy lại có thể insert notification lần nữa. Cần durable idempotency chung transaction với DB effect. At-least-once cho processing không bảo đảm exactly-once email hay toàn workflow.

## Câu 5 - Không giấu lỗi

Catch rồi return làm container thấy success và có thể checkpoint, không biết cần retry lỗi đã nuốt. Để lỗi đến handler phù hợp; handler classify/retry/recover có kiểm soát. Duplicate đã có marker/effect commit thì return là đúng; DB failure chưa xử lý thì return là sai. Log không phải recovery.

## Câu 6 - Chậm và song song

Vượt poll interval có thể rebalance, record chưa checkpoint bị nhận lại. Executor return sớm khiến container nghĩ đã xong trước background effect; nhiều worker còn đảo completion. KafkaConsumer không thread-safe cho cách dùng tùy tiện. Cần timeout, giới hạn work/poll, đủ partition/capacity và thiết kế async đúng ranh giới, không chỉ tăng consumer.

## Câu 7 - Không tuyệt đối

Retention, unavailable/fatal failure hoặc recovery DLT giới hạn việc xử lý thành công. Side effect ngoài resource DB có cửa sổ không chắc chắn. Producer ack xác nhận phía Kafka theo policy; DB commit xác nhận effect DB; offset commit là checkpoint. Không sự kiện nào tự chứng minh cả hai sự kiện còn lại.

## Câu 8 - Bằng chứng đúng tầng

Direct call kiểm delegation/logic nhưng không decode/container/checkpoint; tự new Service còn bỏ proxy transaction. Broker test: tắt consumer, publish, chạy lại group, nhìn DB notification và committed offset. Crash test phải dừng đúng sau DB commit trước offset commit rồi restart, xác nhận record đọc lại mà effect không tăng. Restart bình thường không đủ chứng minh crash window.
