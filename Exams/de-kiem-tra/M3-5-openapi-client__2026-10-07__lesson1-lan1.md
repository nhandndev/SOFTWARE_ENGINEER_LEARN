# M3-5 · Lesson01 External API Client · Lần1

PHONG_VAN theo lesson,8×5=40đ, đạt34/40. 25–35 phút. Trả lời bằng ý nghĩa/code ngắn, không bắt thuộc API. Bối cảnh: shopcore MVC gọi carrier giả lập để lấy báo giá như bài học; DTO class, provider key riêng.

## Câu 1 - Hai HTTP request

Frontend gọi shopcore, Service cần báo giá carrier. Kể luồng tới provider và về client; tại sao carrier không phải Repository local và không phải request nào cũng cần Repository?

**Trả lời:**

## Câu 2 - Chọn client

Bạn chọn WebClient cho roadmap này vì sao? Có cần đổi shopcore MVC sang WebFlux server không? OpenFeign khác ở mức mô hình sử dụng thế nào, có cần học cả hai không?

**Trả lời:**

## Câu 3 - Hai DTO

Provider trả amount/currency, frontend cần fee/currency/provider. Map ở đâu, tại sao tách CarrierQuote và ShippingQuoteResponse? Vì sao dùng BigDecimal thay double?

**Trả lời:**

## Câu 4 - Mono và block

Đoạn code dừng ở bodyToMono(CarrierQuote.class), không subscribe, không return cho framework reactive. Có thể coi đã gọi xong provider không? .block() làm gì, dùng ở đâu được và còn giữ thread nào?

**Trả lời:**

## Câu 5 - Credential và URL

User gửi JWT của shopcore; provider cần X-Api-Key. Có forward JWT user sang provider không? API key/base URL ở đâu? Vì sao không nhận full URL tùy ý từ user rồi gọi?

**Trả lời:**

## Câu 6 - Client bean

Bean bài 1 có connectTimeout300ms, redirects NEVER, buffer 64 KiB. Mỗi setting giúp gì? Connect timeout có chặn được provider kết nối rồi không trả body vô hạn không?

**Trả lời:**

## Câu 7 - Call đơn giản còn thiếu gì?

get→uri→retrieve→bodyToMono→block chỉ là bước đầu. Mặc định4xx/5xx có thành DTO thành công không? Nêu ba phần phải bổ sung trước khi dùng đáng tin cậy.

**Trả lời:**

## Câu 8 - Transaction và remote side effect

Service mở JPA transaction rồi chờ carrier/payment API vài giây. Rủi ro gì? Nếu remote payment đã thành công rồi local rollback, có tự hoàn tác remote không và cần nghĩ tới policy nào?

**Trả lời:**
