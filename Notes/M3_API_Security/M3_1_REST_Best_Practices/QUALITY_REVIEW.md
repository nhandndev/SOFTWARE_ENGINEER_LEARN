# M3-1 — Kiểm tra chất lượng tài liệu

Ngày soạn/rà:2026-10-07. Đây là báo cáo tài liệu, không phải chấm người học hoặc chứng nhận app chạy đúng.

## Phạm vi và context đã đọc

- `AGENTS.md`, Module3-1 và các module liền kề trong roadmap, bảng/log tiến độ, prompt tạo/chấm đề.
- Format LESSON8×5 của hai module gần nhất và yêu cầu mới về bài giải/chấm nghiêm.
- Common hiện có của shopcore: ErrorCode/AppException/GlobalExceptionHandler/PageResponse. Không sửa source app/pom hoặc các file học cũ.
- Mục tiêu SE→AWS→AI Engineer và quy tắc Vault nguồn gốc ở Downloads, bản dùng trong Documents.

## Những quyết định để tránh lặp hoặc quá tải

| Rủi ro | Cách xử lý |
|---|---|
| Học lại toàn MVC/3-layer | Chỉ nhắc nền khi cần; trọng tâm public contract và compatibility |
| Idempotent bị học thành response giống nhau | Ví dụ PUT cộng dồn, DELETE204/404, POST đã commit mất response |
| Quy ước riêng bị gọi là luật HTTP | Phân biệt URL plural/versioning/page/status policy với semantics HTTP |
| Paging chỉ có wrapper | Dataset đủ5 dòng, filter AND, tie-break, total, beyond-last và count sai |
| Pageable được coi tự từ chối mọi input sai | Tách bind/range, nêu resolver có thể normalize; helper kiểm tường minh |
| DTO record không hợp style | Giữ DTO class và PageResponse hiện có |
| ErrorCode bị loại bỏ không cần thiết | Giữ business model; đổi public format có xét client cũ |
| ProblemDetail chỉ business, framework vẫn format khác | Nêu hướng ResponseEntityExceptionHandler, status/headers và phạm vi Advice |
| HATEOAS quá sâu | Chỉ đọc relation/self/category; không yêu cầu full HAL hay cài dependency |
| Câu hỏi yêu cầu thực hành chưa có | Đủ HTTP/code/dataset tại đề, lời giải tương đương được chấp nhận |

## Đối chiếu từng câu với phần đã dạy

| Đề | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 |
|---|---|---|---|---|---|---|---|---|
| L01 | mục1–2 | mục3–4 | mục1–2 | mục5–6 | mục5/7 | mục8 | mục5–6 | mục2/6 và M1-2 đã học |
| L02 | mục1–2 | mục2/6–7 | mục3 | mục4 | mục5 | mục6 | mục1/4–5 | mục7 và L01 mục3–4 |
| L03 | mục1–2 | mục3 | mục1/3–4 | mục2 và L01 | mục5 | mục6 | mục7 | mục2/5/8 |

Mỗi bài giải có rubric8 câu, đáp án đủ vế, lý do/lỗi bị trừ và mục đọc lại. Không chấm kiến thức ở lesson sau như điều kiện ngầm: L01 status đã học M1-2; L02 chỉ nhận diện error body, chưa đòi cấu trúc RFC; L03 không đòi cấu hình Security.

## Nguồn đã mở đối chiếu

Nguồn chính thức RFC9110/RFC5789/RFC9457, Spring MVC request mapping/request params/exception handling/error responses, ProblemDetail Javadoc, Spring Data Page/web support và Spring HATEOAS. Link nằm ở từng bài. RFC9457 là chuẩn hiện hành thay RFC7807; video chỉ là từ khóa tìm, chưa xem/kiểm chứng video cụ thể.

## Kiểm tra đã thực hiện và giới hạn

- Đã tính lại bằng script11 assertion về dataset/filter/page/count và state retry; tất cả đạt.
- Ba JSON code block ở lesson parse được. HTTP/mermaid/code được rà nội dung; không tuyên bố đã render Mermaid hoặc chạy HTTP thật.
- Kiểm tự động3 đề có24 chỗ trả lời, câu1–8;3 bài giải có24 câu tương ứng, mỗi rubric5đ, mỗi đề40đ; kiểm cân code fence và link nội bộ.
- Rà đủ5 mục checklist roadmap bằng coverage plan; giữ ngoài scope Gateway/BFF, Security implementation, full hypermedia.
- **Chưa compile snippets với Spring dependencies, chưa integration test, chưa đổi handler/paging của shopcore hoặc chạy API.** Java chỉ là đoạn minh họa có giả định, không project solution đã chạy.
- Chưa có người học làm đề nên chưa thể chứng minh độ khó thực tế hoặc mức nắm bài. Chấm nghiêm không đồng nghĩa đặt câu vượt phạm vi hoặc yêu cầu thuộc imports.

## Trạng thái

Chỉ soạn sẵn bài học/đề/bài giải và bản sao Vault. Không tick roadmap, không ghi điểm, không đổi con trỏ M2-2, không đánh dấu capstone/deliverable đã làm. Khi người học nộp bài mới tạo snapshot theo prompt chấm.
