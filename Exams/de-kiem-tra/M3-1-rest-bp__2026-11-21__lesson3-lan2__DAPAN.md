# Đáp án và rubric — Lesson 03: hiểu rộng, nắm bản chất

[Đề hiện hành](M3-1-rest-bp__2026-11-21__lesson3-lan2.md). **8×5 =40đ, đạt34đ =85%.** Dùng mẫu số40, không dùng60 của bản trước.

## Nguyên tắc chấm

- Chấm nghiêm tính đúng đắn, không nới điểm vì đang học nhanh. Không thêm yêu cầu nhớ RFC, API nội bộ, signature hoặc code lại project.
- Chấp nhận lời, sơ đồ hoặc code ngắn tương đương. Không cần trả lời dài. Không trừ chính tả/tên thư viện khi ý nghĩa đúng.
- Tiêu chí1đ: đủ1, một phần0,5, sai/trống0. Ý2đ chia như dưới. Không phạt cùng lỗi hai lần trong một tiêu chí; không có luật sai một câu trượt cả bài.
- Kết luận đúng nhưng thiếu lý do ở ý yêu cầu giải thích chỉ nhận phần đã có. Không nhận từ khóa mâu thuẫn với tình huống.
- Nộp một phần thì ghi mẫu số phần được chấm, chưa chốt toàn bài. Lưu snapshot theo03_PROMPT_CHAM_DE.md. Đạt kiến thức không tự xác nhận code/deliverable.

## Câu 1 — 5đ

1. AppException báo business case Product không có, chưa phải JSON đã gửi:1.
2. MVC chọn handler phù hợp để map exception thành status/body; không phải handler chạy trước Controller ở mọi request:1.
3. ProblemDetail là representation/object mô tả lỗi, không tự bắt mọi exception:1.
4. Không cần bỏ ErrorCode: enum/exception giữ nghĩa business, handler chuyển sang representation HTTP:1.
5. Throw ngắt luồng, không return success bình thường phía sau:1.

Nhận mô tả “bộ xử lý lỗi dùng chung” thay tên resolver nếu hiểu đúng cơ chế.

## Câu 2 — 5đ

| Tình huống | Bước lỗi | Service chạy? | Status |
|---|---|---|---:|
| JSON thiếu dấu đóng | Đọc/bind body | Chưa | 400 |
| page=abc vào int | Convert/bind query param | Chưa | 400 |
| Name blank với validation argument | Validate sau bind, trước Controller method | Chưa | 400 |
| SKU trùng do Service kiểm | Business trong Service | Đã | 409 |
| POST vào endpoint chỉ GET | MVC không chọn được handler method phù hợp | Chưa | 405 |

Mỗi dòng1đ: status0,5; vị trí/Service0,5. Không bắt tên step/exception chính xác nếu mô tả đúng thời điểm. Không bắt header Allow.

## Câu 3 — 5đ

1. Đổi HTTP status thành404:1; JSON status404 không đổi HTTP200 nên client/monitoring có thể nhận nhầm success:1.
2. Success DTO mang dữ liệu thành công, ProblemDetail mô tả lỗi:1.
3. Dùng errorKey/type hoặc mã loại lỗi ổn định; không parse câu detail có thể đổi ngôn ngữ:1.
4. Theo contract không bọc data; API khác có thể chọn envelope riêng nhưng không tự giống contract này:1.

Không bắt thêm instance/traceId/type URI hoặc chép JSON.

## Câu 4 — 5đ

1. Còn JSON hỏng và validation chưa cùng format:0,5 mỗi nhóm; client vẫn phải đoán/các nhánh ngoài AppException chưa được chuẩn hóa:1. Tổng2.
2. Không bắt đổi hết thành AppException; các handler phù hợp có thể cùng tạo format công bố:1.
3. Cho biết field name và message dễ hiểu gắn với nó:1. Không bắt cú pháp errors[] hoặc tên extension chính xác.
4. Hai request đại diện, ví dụ JSON hỏng và SKU trùng hoặc name blank, kèm kiểm cùng schema lỗi/status đúng:1. Chỉ liệt kê request, chưa nói kiểm gì:0,5.

Không cần nhớ protected override hoặc ResponseEntityExceptionHandler API để có điểm.

## Câu 5 — 5đ

1. 500 cho lỗi nội bộ bất ngờ, không giả200/404:1.
2. Detail an toàn, ví dụ “Không xử lý được yêu cầu lúc này.”:1.
3. Không gửi raw exception/DTO chứa token vì lộ dữ liệu:1.
4. Log nội bộ có kiểm soát truy cập, hạn chế/che dữ liệu secret:1.
5. ID lỗi gắn với bản log/cùng lần sự cố để tương quan; random vào JSON mà không liên kết chưa đủ:1.

Không bắt chuẩn UUID, tên công cụ tracing hoặc code9999.

## Câu 6 — 5đ

1. Không tự bảo đảm; xem cơ chế filter/container hoặc tích hợp tường minh:1.
2. Startup chưa ready, không phải request business để Advice trả404:1.
3. Không bảo đảm viết lại response đã commit/gửi; không thể hứa xóa dữ liệu đã gửi:1.
4. Security có cơ chế riêng, không suy ra từ MVC Advice:1.
5. Catch-all trong một phạm vi không chứng minh bao phủ toàn server:1.

Không bắt triển khai resolver/filter/Security. Nhận lời giải thích bằng ranh giới gọi hàm/trước sau MVC.

## Câu 7 — 5đ

1. Ví dụ client cũ đọc message nay không có, hoặc field đổi vị trí/kiểu:1.
2. Một kế hoạch tương thích/cùng tồn tại v1/v2 hoặc chuyển phối hợp:1; nêu cách cho client có thời gian chuyển/kiểm đã chuyển trước khi bỏ cũ:1.
3. Không cần đổi success DTO thành ProblemDetail vì success/error có vai trò khác:1.
4. Cùng format không có nghĩa cùng status; input sai400/resource vắng404/conflict409 theo contract:1.

Không yêu cầu chiến lược versioning hoặc cơ chế deploy cụ thể.

## Câu 8 — 5đ

1. self→Product10:1.
2. category→Category2:1.
3. Relation+href cho client địa chỉ để theo, giảm tự ghép URL:1.
4. Prefix version/page metadata không tự chứa hypermedia links như mẫu:1.
5. Không bắt cài Spring HATEOAS hoặc dùng HAL cho mọi API; chỉ cần nhận diện ý nghĩa:1.

Không kết luận mẫu JSON này tự chứng minh toàn bộ API hoàn chỉnh HATEOAS.

## Bản đồ phạm vi

| Mảng cốt lõi | Mục bài học | Câu |
|---|---|---|
| Exception/handler/representation/business | 1,4,5,7 | 1 |
| Điểm dừng và phân loại lỗi/status | 5,6,9 | 2 |
| HTTP thật, error contract và client đọc lỗi | 2,3,4 | 3 |
| Thống nhất các nhánh, validation giúp client | 7,8,12 | 4 |
| 500, privacy và điều tra sự cố | 8,9 | 5 |
| Giới hạn MVC/Advice | 10 | 6 |
| Client compatibility và success/error | 2,4,9 | 7 |
| Hypermedia nhận diện | 11 | 8 |

**Không kiểm sâu:** đủ từng field RFC, cú pháp setProperty, URI/UUID, signature override, thứ tự nhiều Advice, header framework chi tiết, tracing implementation. Các phần đó vẫn ở bài học để tra cứu. Không bỏ nguyên tắc cốt lõi hoặc tự đánh dấu thực hành đã xong.
