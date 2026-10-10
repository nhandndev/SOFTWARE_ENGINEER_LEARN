# M5-4 · Lesson 02 · Counter, Timer và MDC

Ngày soạn: 2026-10-07. `PHONG_VAN`, 8 tình huống × 5 = 40 điểm; đạt **34/40**. Mỗi ý gạch đầu dòng 1 điểm, đúng một phần 0,5. Không cần thuộc cú pháp Micrometer; dùng contract helper trong [Lesson 02](../../Notes/M5_Scalability/M5_4_Actuator/LESSON_02_METRICS_COUNTER_TIMER_MDC.md). Chấm lời giải thích, không chấm capstone đã hoãn.

## Câu 1 · Đọc metrics có phải chạy lại lookup? (5đ)

Service đã instrument Counter/Timer. OPS gọi `/actuator/metrics/shopcore.catalog.lookup`. Hãy:

- Kể luồng Service ghi số đo vào registry.
- Kể luồng endpoint lấy số đo.
- Nói có chạy lại nghiệp vụ lookup khi đọc endpoint không.
- Nêu phạm vi instance và giới hạn lịch sử của endpoint.
- Nêu vì sao metric không thay DB lưu số lượng giao dịch bền vững.

**Trả lời:**

## Câu 2 · Attempts = 4 nhưng Timer count = 3 (5đ)

Helper tăng attempts ngay khi vào, record Timer trong finally. Trong 4 lời gọi, hai success đã xong, một lỗi đã xong, một đang chạy; không restart. Hãy:

- Nêu attempts.
- Nêu success Timer count và error Timer count.
- Giải thích chênh lệch với total Timer count.
- Nói Timer có sẵn count nên khi nào Counter completion là dư.
- Nêu điều gì xảy ra với Counter khi process restart.

**Trả lời:**

## Câu 3 · Lỗi ở binding và AppException ở Service (5đ)

Request A có `page=abc`, bị reject trước Controller. Request B vào Supplier rồi ném PRODUCT_NOT_FOUND; advice trả 404. Hãy:

- Nói A có tăng custom helper Counter không, vì sao.
- Nói B được ghi vào Timer outcome nào.
- Nói finally có nuốt exception không và ai quyết định 404.
- Nói Service Timer khác HTTP Timer về boundary ra sao.
- Nếu Supplier catch lỗi rồi trả fallback bình thường, helper coi success hay error, và giới hạn của tên đó.

**Trả lời:**

## Câu 4 · Từ TOTAL_TIME đến mean, không phải p95 (5đ)

Một Timer series có baseUnit seconds, COUNT = 4, TOTAL_TIME = 0.8. Hãy:

- Tính mean bằng seconds và milliseconds.
- Nói vì sao chưa suy ra được p95.
- Nêu dữ liệu/config bổ sung cần để có percentile/phân bố.
- Nói vì sao MAX chưa chắc là max từ ngày deploy.
- Nêu cách thu hẹp một outcome bằng tag khi đọc metrics endpoint.

**Trả lời:**

## Câu 5 · “Hash requestId rồi đưa vào tag là an toàn” (5đ)

Team dùng tags gồm outcome success/error, requestId, productId, raw prompt. Hãy:

- Chọn tag hữu hạn phù hợp.
- Giải thích requestId/productId gây cardinality ra sao.
- Đánh giá hashing requestId có giảm cardinality không.
- Nêu rủi ro raw prompt và dữ liệu nhạy cảm.
- Đề xuất nơi chứa correlation ID và cách dùng route template.

**Trả lời:**

## Câu 6 · HTTP metrics chưa có (5đ)

Vừa khởi động, OPS gọi metric tên `http.server.requests` và nhận 404. Source lab không có JPA/DataSource. Hãy:

- Nêu điều kiện request hoàn tất tạo HTTP sample.
- Nêu cách kiểm danh sách tên/config, không kết luận app hỏng.
- Phân biệt auto HTTP Timer với custom Service Timer.
- Nói có chắc có Hikari metrics khi chưa có component không.
- Nói vì sao `/metrics` không tự là hệ thống monitoring nhiều ngày/nhiều instance/alerting.

**Trả lời:**

## Câu 7 · Health UP nhưng API chậm (5đ)

Traffic Product chậm bất thường. Hãy mô tả 5 bước/ý:

- Đánh giá ý nghĩa của health UP trong tình huống này.
- Chọn volume/errors/duration với khoảng thời gian và instance xác định.
- So boundary HTTP Timer với Service Timer để khoanh vùng, không kết luận vội.
- Nối sang log bằng timestamp/instance/operation/requestId; giải thích vì sao không tag requestId vào metrics.
- Đo lại sau thay đổi dưới điều kiện tương đương, không tự tăng pool theo cảm giác.

**Trả lời:**

## Câu 8 · Rate, async và MDC (5đ)

Counter một instance tăng 120 → 180 trong 30 giây, không restart. Sau đó team dùng helper đồng bộ bọc Supplier chỉ trả CompletableFuture và chuyển việc sang thread khác. Hãy:

- Tính rate của đoạn 30 giây.
- Nêu vì sao phép trừ trực tiếp sai nếu restart hoặc so hai instance khác tuổi.
- Nói helper đang đo đến lúc nào khi Supplier trả Future sớm.
- Nói muốn đo duration async phải dừng vào thời điểm nào.
- Nói MDC có tự sang thread mới không, và vì sao phải remove/restore giá trị thuộc request trong finally.

**Trả lời:**
