# Bài giải M5-2 · Lesson 02

40 điểm, đạt từ 34. [Quy tắc](../../Notes/M5_Scalability/M5_2_Kafka/QUY_TAC_CHAM.md).

| Câu | Rubric, tổng 5 điểm |
|---|---|
| 1 | Request là mong muốn (1); response là HTTP kết quả (1); entity là lưu trữ, event là sự việc (1); LAZY/lộ nội bộ/coupling, hai rủi ro (1); payload snapshot contract không ApiResponse (1) |
| 2 | Retry giữ eventId (1); key orderId (1); hai ID khác vai trò (1); producer retry khác consumer effect (1); sự việc mới ID mới (1) |
| 3 | Serialize/routing/ghi broker (1); future ack/error (1); success không notification (1); consumer tắt vẫn có thể gửi (1); đồng bộ và future failures đều quan sát (1) |
| 4 | ISR theo broker policy (1); replication1 không HA (1); app gọi hai lần không tự dedup business (1); consumer effect không bảo vệ (1); lợi ích retry giao thức producer (1) |
| 5 | Target type explicit (1); không mở wildcard tùy tiện (1); map được vẫn validate contract (1); không serialize entity/proxy (1); wrapper đưa decode lỗi cho handler không sửa dữ liệu (1) |
| 6 | Starter Kafka và BOM (1); bootstrap tìm cluster metadata (1); localhost container sai đích nếu broker khác (1); API/serializer theo stack (1); topic sạch đúng schema (1) |
| 7 | Không đổi nghĩa/đơn vị ngầm (1); đổi kiểu gây breaking (1); version có policy xử lý (1); optional/default tương thích event cũ (1); replay giữ ID, ID mới làm dedup mất ý nghĩa (1) |
| 8 | Metadata/key/order partition (1); JSON contract đúng (1); consumer off không cản broker ack (1); broker down lỗi/timeout và giữ ID retry (1); chưa chứng minh DB/effect atomic (1) |

## Câu 1 - Contract riêng

Request mô tả điều client yêu cầu; response trả kết quả HTTP; entity mô tả storage/domain state; event mô tả sự việc đã xảy ra. Entity có thể lộ field nội bộ, kéo LAZY query/serialize lỗi và ràng consumer vào schema DB. Event là snapshot tối thiểu ổn định OrderPlaced, không bọc status/requestId ApiResponse của request cũ. Hai rủi ro đúng bất kỳ được điểm tương ứng.

## Câu 2 - ID

Retry E1 giữ eventId vì có thể broker đã nhận. Key orderId để routing/ordering theo Order; eventId cho dedup sự việc. Producer idempotence không thay durable dedup effect, không tự nhận ra mọi lần app gọi lại. Sự việc mới có ID mới, kể cả cùng Order.

## Câu 3 - Luồng

Producer serialize key/value thành bytes, chọn partition, buffer/send broker, future hoàn tất ack/error. Consumer poll độc lập nên tắt consumer vẫn có thể ack, không chứng minh notification xong. Caller phải bắt lỗi đồng bộ nếu có và quan sát future failure; timeout chưa chắc record không đến broker, không retry với identity mới.

## Câu 4 - Durability có điều kiện

All là acknowledgement theo các ISR và broker policy, không mọi replica bất chấp state. Một replica lab không có redundancy. Idempotence giúp retry giao thức producer được hỗ trợ; hai app publish nghiệp vụ hoặc consumer redelivery/effect ngoài Kafka vẫn cần cách xử lý riêng. Không nói all=exactly-once email.

## Câu 5 - Decode không đủ

Consumer định target OrderPlacedEvent, bỏ phụ thuộc type header của producer, chỉ trusted scope phù hợp. JSON map thành DTO vẫn cần version/ID/value validation. Entity/proxy không phải event contract. ErrorHandlingDeserializer mang lỗi decode đến container handler, không sửa JSON hoặc thay validation nghiệp vụ.

## Câu 6 - Stack

Thêm spring-boot-starter-kafka và bảo đảm Jackson JSON có trên classpath (mẫu khai starter-json), để Boot BOM quản version. Bootstrap giúp client kết nối ban đầu/lấy metadata; advertised endpoint còn phải đúng. Localhost trong container app là chính app, không container Kafka khác. Serializer Jackson API phải hợp version hiện tại, không trộn hướng dẫn cũ. Topic string demo E1 không phải JSON event nên tách để không tạo poison records ngoài ý muốn.

## Câu 7 - Evolution

Không đổi đơn vị ngầm; đổi kiểu orderId phá consumer cũ. Version có nhánh hỗ trợ/reject rõ, migration/compatibility có kiểm. Field tùy chọn/default giúp đọc lịch sử cũ nhưng không bảo đảm mọi thay đổi đều backward-compatible. Replay cùng sự việc giữ ID; ID mới làm consumer coi là event mới và có thể nhân effect.

## Câu 8 - Bằng chứng

Quan sát key orderId, metadata partition/offset và JSON fields/BigDecimal. Hai event cùng key với routing ổn định ở cùng partition, offset sau lớn hơn. Tắt consumer chứng minh ack độc lập processing; tắt broker thấy lỗi/timeout và retry giữ ID. Chưa chứng minh atomic DB–Kafka, notification commit hay external email exactly-once.
