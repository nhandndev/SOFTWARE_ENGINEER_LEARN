# M4-4 · Lesson01 · Log levels và log an toàn

**PHONG_VAN theo lesson · 8 tình huống ×5đ=40đ · 35–50 phút.** Đạt kiến thức lesson từ34/40; điểm=điểm thô/40×100. Trả lời bằng lời/pseudocode, không cần thuộc import. Mỗi yêu cầu dưới đây có điểm riêng; không chấm thêm tiêu chí giấu trong đáp án. Không tự ghi nhận deliverable/module đã hoàn tất.

## Câu 1 - Log đi đâu? (5đ)

Bạn gọi `log.info("Product created")` bằng SLF4J trong app starter Boot mặc định. Giải thích vai trò SLF4J, Logback, appender và encoder. Thêm một SLF4J provider khác có làm log “chắc chắn hơn” không, vì sao?

**Trả lời:**

## Câu 2 - Vì sao DEBUG vẫn hiện? (5đ)

Root INFO, `com.shopcore` DEBUG, không có appender filter khác. Logger `com.shopcore.product.ProductService` ghi DEBUG, INFO, ERROR; logger `org.example.Client` ghi DEBUG, WARN. Những event nào được bật? Giải thích effective level và đề xuất cấu hình ít ồn cho production.

**Trả lời:**

## Câu 3 - Chọn mức theo tác động (5đ)

Chọn mức/khả năng không log và giải thích: ProductID cũ gây404 dự kiến; provider timeout đã hết retry làm feature thất bại; một lần retry đã phục hồi. Có nên suy mọi4xx là ERROR không?

**Trả lời:**

## Câu 4 - DEBUG tắt mà vẫn tốn CPU (5đ)

`log.debug("details={}", buildExpensiveDetails())` tốn CPU dù DEBUG tắt. Vì sao? Sửa thế nào? `{}` có tự che secret hoặc làm raw input an toàn không? Đề xuất event tạo Product với metadata tối thiểu.

**Trả lời:**

## Câu 5 - Một lỗi, ba stack trace (5đ)

Repository, Service, Advice đều catch, log ERROR và throw lại cùng lỗi DB. Đề xuất nơi sở hữu việc log, giải thích catch-log-throw có cần ở cả3lớp không. Nếu throwable có thể chứa SQL parameter/secret trong message/cause thì xử lý rủi ro ra sao?

**Trả lời:**

## Câu 6 - Log lỗi có sửa response không? (5đ)

Service chỉ gọi `log.error("failed")` rồi return null khi gặp lỗi. Vì sao nguy hiểm? Nêu luồng exception phù hợp từ Service về Advice/HTTP và dữ liệu nên có/không có trong response lỗi so với log nội bộ.

**Trả lời:**

## Câu 7 - AI provider và dữ liệu nhạy cảm (5đ)

Bạn muốn debug một request gọi model và định log Authorization, prompt, completion, toàn bộ DTO. Chọn dữ liệu cần loại bỏ, đề xuất metadata an toàn, và nêu hai biện pháp về quyền đọc/retention/khối lượng log. Vì sao log JSON không tự giải quyết bí mật?

**Trả lời:**

## Câu 8 - Kiểm chứng logging (5đ)

Với SafeProductLog trong bài, mô tả phép kiểm tại effective level INFO: `created(10)`, `details(10)` phải cho kết quả gì, kiểm field nào bằng appender, và kiểm thế nào để tránh log lỗi trùng/secret? Nêu giới hạn của test appender so với collector production.

**Trả lời:**
