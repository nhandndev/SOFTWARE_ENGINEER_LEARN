# M4-4 · Lesson03 · Structured JSON logging

**PHONG_VAN theo lesson · 8×5=40đ · 35–50 phút · đạt từ34/40.** Điểm=điểm thô/40×100. Trả lời bằng lời/pseudocode; không bắt nhớ mọi config key. Nếu nêu config, phải nói nó tác động gì. Câu hỏi bám Lesson03, không yêu cầu triển khai collector.

## Câu 1 - Hai luồng JSON (5đ)

Controller trả ProductResponse và Service ghi JSON log. Mỗi luồng qua thành phần nào, ai nhận? Có nên bọc log bằng ApiResponse hoặc trả stack log cho client không? RequestId liên kết chúng theo nghĩa nào?

**Trả lời:**

## Câu 2 - Bật format có cài server không? (5đ)

Boot4.1.1 starter mặc định, không custom Logback XML. Muốn console JSON Logstash thì cấu hình ở đâu/ý nghĩa gì, cần thêm encoder bên thứ ba hay server Logstash chỉ để xuất JSON không? Đổi sang ECS có cần giữ nguyên query field của Logstash không? Cần kiểm gì trên output?

**Trả lời:**

## Câu 3 - MDC hay addKeyValue? (5đ)

Một request tạo Product10 rồi cập nhật Product20. RequestId và productId/event nên đặt ở đâu, lifetime khác gì? Nếu `log.atInfo().addKeyValue(...)` nhưng quên `.log()` thì sao? Nêu rủi ro đặt custom field tên `level`.

**Trả lời:**

## Câu 4 - Tự ghép JSON (5đ)

`log.info("{\"name\":\"" + name + "\"}")` có vấn đề gì khi name có nháy/newline và khi encoder đã xuất JSON? Đề xuất cách thêm metadata. Encoder escape đúng có đồng nghĩa được log password không?

**Trả lời:**

## Câu 5 - Có config nhưng log vẫn text (5đ)

Bạn bật structured format nhưng thấy vài dòng text. Nêu4nhóm cần kiểm: config/profile thực tế, custom appender, stdout không qua logger, mức/context event. Vì sao sửa `logging.pattern.console` hoặc format không tự giải quyết tất cả?

**Trả lời:**

## Câu 6 - Schema tìm kiếm (5đ)

Đề xuất metadata tối thiểu cho event Product created và explain vì sao tìm field tốt hơn grep `500`. Phân biệt event metadata với request context. Có stdout JSON thì đã có collector/search chưa? Nếu đổi schema cần lưu ý gì với query/dashboard?

**Trả lời:**

## Câu 7 - JSON vẫn gây lộ bí mật/disk đầy (5đ)

Log JSON chứa token trong message và exception cause, file tăng nhanh. Đề xuất sửa chọn dữ liệu/exception, quyền đọc, retention/rotation hoặc volume limit. Vì sao đổi text thành JSON không tự sửa hai lỗi này?

**Trả lời:**

## Câu 8 - Thiết kế phép kiểm (5đ)

Mô tả5nhóm bằng chứng trước khi tin cấu hình: parse/field nền, requestId không rò, event/productId/kiểu số, không secret, escape dữ liệu giả có nháy/newline. Nêu giới hạn nếu chỉ test filter và encoder riêng, chưa chạy Security/container/collector thật.

**Trả lời:**
