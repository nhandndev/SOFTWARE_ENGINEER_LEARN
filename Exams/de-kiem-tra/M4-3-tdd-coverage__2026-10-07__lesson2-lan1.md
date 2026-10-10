# M4-3 · Lesson02 Test Levels · Lần1

PHONG_VAN theo lesson8×5=40đ, đạt34/40, khoảng40–50 phút. Nêu phần thật/mock và giới hạn; không thuộc annotation/import. Fee rule như Lesson01. Service đọc giá Product, nhân quantity>0; missing→AppException PRODUCT_NOT_FOUND, quantity≤0→INVALID_PARAMETER trước khi đọc giá.

## Câu 1 - Chọn phép kiểm

Ba rủi ro: A ngưỡng miễn phí sai, B query param không bind/JSON thiếu currency, C JPQL PostgreSQL lọc sai. Chọn unit/slice/DB test phù hợp, nêu phần thật/mock và vì sao không bắt mọi case dùng SpringBootTest.

**Trả lời:**

## Câu 2 - Mock có SELECT không?

Mock reader trả giá250000 cho Product10; Service test pass. Có chứng minh reader implementation/SQL/constraint của PostgreSQL đúng không? Để kiểm phần đó cần đổi gì thành thật và chuẩn bị DB thế nào?

**Trả lời:**

## Câu 3 - Quên nhân quantity

Reader mock trả250000, quantity2. Fee đúng bao nhiêu? Nếu Service bỏ nhân quantity thì ra bao nhiêu? Nêu assertion, và test quantity0 phải kiểm loại business error/code và interaction nào theo contract đề.

**Trả lời:**

## Câu 4 - MVC xanh chứng minh gì?

MVC slice gọi HTTP giả lập qua MockMvc; Service mock quote trả0, Security đã được chuẩn bị cho request đi qua. JSON fee0/currencyVND,status200 pass. Chứng minh binding/serialization hay policy thật? Nếu tắt filters cho test này, còn chứng minh401/403 đúng không?

**Trả lời:**

## Câu 5 - abc và 0 khác nhau

Controller có @RequestParam int quantity. So quantity=abc với0: cái nào lỗi type binding trước Service? Cái nào parse được? Muốn0 trả400 cần gì, và kiểm Service không bị gọi ở case binding fail như thế nào?

**Trả lời:**

## Câu 6 - Repository save là xong?

JPA test save entity rồi đọc lại ngay cùng persistence context và kết luận SQL/constraint đúng. Nêu rủi ro cache/chưa flush, cách flush/clear/read và giới hạn flush khác commit, đặc biệt với deferred constraint.

**Trả lời:**

## Câu 7 - Rollback request HTTP

SpringBootTest RANDOM_PORT, test có @Transactional và gọi server qua HTTP. Có chắc mọi DB write phía server bị rollback khi test xong không? Giải thích thread/transaction boundary và cách cô lập/cleanup dữ liệu an toàn.

**Trả lời:**

## Câu 8 - contextLoads và provider

Chỉ có contextLoads và mock response external client, cả hai pass. Đã chứng minh business fee, socket/TLS và provider live chưa? Mỗi phép kiểm đang chứng minh gì và nên thêm những tầng nào cho các rủi ro đó?

**Trả lời:**
