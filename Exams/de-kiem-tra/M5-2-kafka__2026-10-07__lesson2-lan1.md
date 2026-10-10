# M5-2 Kafka · Lesson 02 · Producer và JSON event

`PHONG_VAN` theo lesson, 8 × 5 = 40 điểm; đạt từ 34. Khoảng 40 phút. Trả lời bằng nghĩa/cách làm; không cần thuộc import. [Bài học](../../Notes/M5_Scalability/M5_2_Kafka/LESSON_02_PRODUCER_JSON_EVENT.md).

## Câu 1 - Dùng Order entity cho nhanh?

Một bạn publish nguyên JPA Order entity và bọc ApiResponse để consumer dùng. Hãy phân biệt event với Request DTO, Response DTO và Entity; chỉ ra hai rủi ro cụ thể, rồi nói payload nên thể hiện điều gì đã xảy ra.

**Trả lời:**

## Câu 2 - Retry tạo UUID mới?

Order101 có event E1 gửi timeout, chưa biết broker đã nhận chưa. Khi retry có tạo eventId mới không? Chọn Kafka key gì? orderId và eventId khác vai trò thế nào? Vì sao producer idempotence không thay consumer dedup? Một sự việc mới có dùng lại E1 không?

**Trả lời:**

## Câu 3 - Trace send thành công

Kể luồng Java event → bytes → partition/broker → future result. Future success có chứng minh notification xong không? Consumer đang tắt thì producer có thể success không? Có lỗi đồng bộ ngay khi gọi send không, caller phải quan sát lỗi thế nào?

**Trả lời:**

## Câu 4 - Acks và một replica

Mẫu dùng acks=all, enable.idempotence=true, broker lab replication 1. Giải thích all trong phạm vi nào, có chịu mất broker không? Cơ chế này có ngăn hai lần app gọi publish/consumer email trùng không? Nêu đúng phạm vi lợi ích của producer idempotence.

**Trả lời:**

## Câu 5 - JSON type và validation

Producer không gửi Java type header. Consumer biết map về class nào bằng cách gì? Có nên trusted packages `*` không? JSON map được nhưng schemaVersion=9/orderId=null có hợp lệ không? Vì sao không đưa Entity/LAZY proxy vào serializer? ErrorHandlingDeserializer làm gì, không làm gì?

**Trả lời:**

## Câu 6 - Dependency/config theo dự án

Shopcore Java21/Boot4.1.1, broker trên máy. Nói dependency cần thêm và ai quản version; bootstrap có vai trò gì; app ở container khác dùng localhost thế nào; vì sao không copy JsonSerializer/Jackson cũ một cách mù quáng; vì sao tách topic string demo khỏi topic JSON?

**Trả lời:**

## Câu 7 - Event v2

Bạn đổi total từ số tiền VND thành USD nhưng giữ field/version, đổi orderId thành object và replay event cũ với ID mới. Nêu các vấn đề; đề xuất cách quản contract/version, field tùy chọn/default và cách giữ event identity cho replay cùng sự việc. Không cần triển khai schema registry.

**Trả lời:**

## Câu 8 - Kiểm producer đúng tầng

Thiết kế kiểm gửi 2 event cùng orderId, khác eventId: cần nhìn future/metadata/key/JSON gì? Tắt consumer rồi gửi giúp chứng minh gì? Tắt broker thì quan sát gì? Nêu điều test producer này chưa chứng minh về DB Order/notification và việc giữ ID khi retry.

**Trả lời:**
