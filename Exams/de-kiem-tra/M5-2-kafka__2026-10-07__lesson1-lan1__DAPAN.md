# Bài giải M5-2 · Lesson 01

40 điểm, đạt từ 34. [Quy tắc chấm](../../Notes/M5_Scalability/M5_2_Kafka/QUY_TAC_CHAM.md). Mỗi ô rubric là ý độc lập; diễn đạt đúng cơ chế được điểm, không bắt khớp từ mẫu.

| Câu | Rubric, tổng 5 điểm |
|---|---|
| 1 | Producer ghi (1); broker lưu/phục vụ (1); consumer đọc/xử lý (1); hai group đọc độc lập (1); đọc không xóa ngay/retention riêng (1) |
| 2 | Offset riêng từng partition (1); topic+partition+offset (1); eventId định danh sự việc (1); orderId aggregate không phải vị trí (1); replica là bản sao log không consumer (1) |
| 3 | Tối đa 3 active có assignment (1); ít nhất 2 không partition (1); một consumer nhiều partition được (1); cùng group chia việc không broadcast (1); hai group cho hai nghiệp vụ độc lập (1) |
| 4 | Key orderId ổn định (1); order trong partition (1); không global order (1); routing/partition count đổi cần xét lại (1); executor có thể đảo completion (1) |
| 5 | Resume 12, không đã làm 12 (1); position khác checkpoint (1); không đồng nhất DB commit (1); không orderId (1); crash trước/sau checkpoint hợp lý (1) |
| 6 | Offset hợp lệ 20 được dùng (1); reset khi thiếu/invalid offset (1); retention xóa trước khi đọc có thể mất cơ hội (1); replay chỉ lịch sử còn tồn tại (1); effect phải chịu redelivery (1) |
| 7 | Một replica không HA (1); localhost/plaintext không production (1); đọc không chứng minh email (1); metadata advertised sai gây kết nối lỗi (1); xóa container không volume mất data lab (1) |
| 8 | Gửi cùng key và xem partition (1); xem offsets/thứ tự trong partition (1); hai group cùng đọc (1); cùng group chia assignment (1); nêu giới hạn bằng chứng (1) |

## Câu 1 - Đọc không lấy mất

Producer ghi record; broker giữ log và phục vụ đọc; consumer poll rồi xử lý. Analytics còn đọc được nếu record còn retention vì group có checkpoint riêng. Đọc không xóa record ngay. Nếu cùng group thì hai worker chia việc chứ không mỗi bên nhận đủ.

## Câu 2 - Địa chỉ trong log

Offset thuộc partition nên P0:0 và P1:0 khác vị trí. Dùng topic, partition, offset. EventId là ID sự việc để giữ qua retry/replay; orderId là ID Order liên quan. Replica sao chép partition cho durability/availability, không phải process thực thi notification.

## Câu 3 - Capacity

Trong traditional group, tối đa 3 consumer có assignment cùng lúc, ít nhất 2 không partition; một consumer có thể giữ nhiều partition. Tên consumer/partition cụ thể không cố định. Cùng group notification/analytics sẽ chia record nên sai nếu cần cả hai nhận đủ; dùng group khác nhau.

## Câu 4 - Ordering

Key orderId giúp các event cùng Order vào cùng partition theo routing ổn định. Thứ tự chỉ trong partition; không global order. Đổi số partition/partitioner cần kế hoạch vì key có thể đổi nơi. Executor tùy ý có thể hoàn thành Paid trước Placed dù đọc đúng thứ tự. Key không sửa producer gửi sai thứ tự nghiệp vụ.

## Câu 5 - Checkpoint

Commit 12 nghĩa là điểm resume tiếp theo 12 khi offset hợp lệ, không phải đã xử lý record 12. Position của client có thể tiến do poll, checkpoint là state phục hồi của group. Nó không phải orderId hoặc DB transaction. Ví dụ DB effect xong nhưng crash trước commit 12 thì record trước đó có thể đọc lại.

## Câu 6 - Reset

Group resume 20 đã commit hợp lệ; earliest không reset mỗi restart. Nó áp dụng khi không có offset hợp lệ theo policy. Event bị retention xóa không thể tự replay chỉ bằng earliest. Replay lịch sử còn lưu và có thể lặp effect đã làm, nên idempotency là yêu cầu.

## Câu 7 - Giới hạn lab

Replication 1 không có replica khác để chịu mất broker. Lab không auth/TLS và chỉ localhost, không dùng như production. Đọc record khác gửi email xong. Client bootstrap lấy metadata rồi kết nối advertised endpoint; đổi port mapping một mình có thể sai endpoint. Container bị xóa không volume thì không giữ data lab.

## Câu 8 - Phép kiểm

Gửi E1/E2 key101, console in key/partition/offset; xác nhận cùng partition và thứ tự offset, không đoán số partition. Hai group mới đọc được cả hai record; hai consumer cùng group kiểm assignment/chia việc. Điều này chưa chứng minh business effect atomic, crash window hoặc email exactly-once. Không yêu cầu thuộc CLI để đủ điểm.
