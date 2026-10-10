# M5-1 · Lesson01 · Redis cơ bản

**PHONG_VAN theo lesson · 8×5=40đ · 35–50phút · đạt từ34/40.** Điểm=điểm thô/40×100. Dùng lời/pseudocode, không bắt thuộc cú pháp CLI. Bám Redis7.4lab, không hỏi Cluster/Streams. Mỗi yêu cầu có điểm riêng, không tiêu chí ngầm.

## Câu 1 - Cache mất thì Product mất không? (5đ)

shopcore giữ Product trong PostgreSQL và snapshot list trong Redis. Phân biệt nguồn gốc/bản sao, giải thích cache mất thì đọc lại ra sao. Redis có phải HashMap trong JVM hoặc luôn không có persistence không?

**Trả lời:**

## Câu 2 - String và hash (5đ)

Muốn cache nguyên DTO JSON và muốn đọc riêng field name/price thì string/hash phù hợp thế nào? Redis có tự hiểu Java Product/JSON thành JPA object không? Dấu `:` trong key có tạo table/folder không? GET string trên hash có tự chuyển kiểu không?

**Trả lời:**

## Câu 3 - Đọc TTL (5đ)

Giải thích TTL=35,0,-1,-2. GET thường có kéo TTL về60không? Hết hạn cache có đồng nghĩa Product không tồn tại trong DB không?

**Trả lời:**

## Câu 4 - Ghi đè rồi mất TTL (5đ)

`SET k old EX 60`, sau đó `SET k new` không kèm expiration. Dự đoán value/TTL; đề xuất cách giữ hoặc đặt lại TTL. Vì sao SET rồi EXPIRE hai lệnh có rủi ro hơn SET k value EX60?

**Trả lời:**

## Câu 5 - Ai gọi DB? (5đ)

Kể luồng đọc cache hit và miss, ai quyết định query DB, lúc nào put snapshot/TTL. DB update có tự sửa cache không, và TTL60có bảo đảm vừa update xong đã đọc mới không?

**Trả lời:**

## Câu 6 - Key và isolation (5đ)

Dev/prod dùng chung Redis, hai tenant thấy Product khác nhau. Vì sao key `products` không đủ? Đề xuất phạm vi prefix/key và dữ liệu không nên đưa vào cache. Base64 keyword có phải bảo mật không?

**Trả lời:**

## Câu 7 - Redis lab an toàn (5đ)

Bạn định public port6379không auth và dùng FLUSHALL để dọn test. Nêu rủi ro và cách chạy lab local/dọn đúng key. Lab không persistence có nói gì về dữ liệu production/DB gốc không? Nếu port bận thì làm gì?

**Trả lời:**

## Câu 8 - Kiểm string/hash/TTL (5đ)

Mô tả phép kiểm: ghi string có TTL, đọc value/type/TTL; ghi và đọc hash field; expire/delete đúng key; kiểm không ảnh hưởng Product DB. Có phải hash chỉ có thể dùng TTL toàn key trong mọi phiên bản Redis không? Bài này chọn phạm vi nào?

**Trả lời:**
