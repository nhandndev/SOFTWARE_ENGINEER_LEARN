# M5-4 · Lesson 01 · Endpoint, security và health

Ngày soạn: 2026-10-07. Chế độ `PHONG_VAN`, 8 tình huống × 5 = 40 điểm; đạt từ **34/40**. Trả lời bằng ý hiểu, không bắt thuộc import/code. Tham khảo [Lesson 01](../../Notes/M5_Scalability/M5_4_Actuator/LESSON_01_ENDPOINTS_SECURITY_HEALTH.md). Mỗi gạch đầu dòng là một ý chấm 1 điểm; ý đúng nhưng chưa đầy đủ có thể nhận 0,5. Không cần capstone để làm đề này; điểm lesson không tự xác nhận deliverable/module hoàn tất.

## Câu 1 · Health UP, Product vẫn lỗi (5đ)

`GET /actuator/health` trả 200 với UP nhưng `/api/products/10` trả 500. Bạn hãy nói:

- UP chứng minh điều gì và không chứng minh điều gì?
- Health request có bắt buộc qua ProductController/Service không?
- Health endpoint lấy kết quả từ đâu?
- Metrics trả lời câu hỏi gì khác health?
- Log có requestId giúp điều tra gì?

**Trả lời:**

## Câu 2 · Expose không phải authorize (5đ)

Developer thêm Actuator và `web.exposure.include: health,info,metrics`, đặt `metrics.access: read-only`. Project chưa có Spring Security. Họ nói metrics chỉ OPS mới xem được. Hãy:

- Phân biệt access và exposure.
- Đánh giá kết luận “chỉ OPS”.
- Nêu lớp bảo vệ người gọi cần bổ sung.
- Nêu rủi ro nếu dùng `include: '*'`.
- Đánh giá đổi port có tự làm endpoint an toàn không.

**Trả lời:**

## Câu 3 · Chỉ khai báo một SecurityFilterChain (5đ)

Code có duy nhất chain `@Order(1)`, matcher `EndpointRequest.toAnyEndpoint()`, health permitAll, phần còn lại hasRole OPS. Không có chain ứng dụng nào khác. Hãy:

- Nói custom chain ảnh hưởng security auto-configuration thế nào.
- Giải thích vì sao API Product chưa được chain này bảo vệ.
- Đề xuất fallback chain hoặc tích hợp với chain JWT đã có.
- Giải thích chain nào được chọn khi nhiều chain match.
- Với policy bài học đầy đủ, dự đoán anonymous metrics và ROLE_USER metrics.

**Trả lời:**

## Câu 4 · Kiểm chứng quyền thay vì chỉ nhìn 404 (5đ)

Trong cấu hình lab của bài học, health đang UP, info/metrics có thật; env không được expose và access mặc định none. Hãy nêu kết quả/mục đích kiểm:

- Anonymous GET health và details được thấy.
- Anonymous GET info/metrics.
- ROLE_USER GET metrics và ROLE_OPS GET metrics.
- ROLE_OPS GET env, và vì sao một 404 không chứng minh authorization đúng.
- Vì sao không đưa Basic qua HTTP public, hoặc disable CSRF toàn cục cho tiện.

**Trả lời:**

## Câu 5 · Custom indicator có thật sự kiểm cả hệ thống? (5đ)

`UploadDirectoryHealthIndicator` trong bài dùng isDirectory/isWritable. Không cần viết lại code. Hãy:

- Kể luồng từ health request đến `health()` và JSON response.
- Nói khi nào nó UP/DOWN và contributor ID để cấu hình group.
- Nêu HTTP status mặc định khi DOWN.
- Nêu ít nhất một giới hạn của writable check.
- Nêu cách tránh lộ đường dẫn/secret trong details.

**Trả lời:**

## Câu 6 · DB hỏng, có nên restart mọi API instance? (5đ)

DB dùng chung đang lỗi. Một người thêm DB vào liveness của toàn bộ instance. Giả sử restart không sửa được DB. Hãy:

- Phân biệt quyết định từ liveness và readiness.
- Nêu hệ quả của cấu hình trên.
- Nêu nguyên tắc chọn dependency cho readiness, không tự thêm mọi dependency.
- Với lab: upload bắt buộc, thư mục mất, hãy dự đoán root/readiness/liveness.
- Nếu upload chỉ là feature phụ, có nên kéo cả API khỏi routing không? Vì sao?

**Trả lời:**

## Câu 7 · Probe gọi LLM thật (5đ)

Mỗi health request gọi model provider để sinh một câu trả lời, retry không giới hạn. Developer nghĩ slow-indicator warning sẽ ngắt sau 10 giây. Hãy:

- Nêu rủi ro chi phí/tải hoặc tác dụng phụ của probe lặp lại.
- Phân biệt slow warning và timeout thực.
- Đề xuất check nhẹ với timeout/client phù hợp, không gọi tác vụ tính tiền để thử sống.
- Nêu giới hạn của kết quả UP tại một thời điểm.
- Giải thích vì sao management port UP chưa chứng minh app port phục vụ được.

**Trả lời:**

## Câu 8 · Info rỗng hoặc chứa mật khẩu (5đ)

Info đã expose và OPS được quyền gọi, nhưng response `{}`. Đồng nghiệp đề xuất đưa toàn bộ config vào info. Hãy:

- Giải thích vì sao `{}` chưa chắc là lỗi.
- Nêu vai trò của InfoContributor và bean registration.
- Đề xuất metadata an toàn cho shopcore.
- Nêu dữ liệu phải tránh và vì sao exposure/security vẫn cần.
- Nêu cách xác minh version/build thực, không tự gán một version giả.

**Trả lời:**
