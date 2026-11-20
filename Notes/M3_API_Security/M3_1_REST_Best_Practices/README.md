# M3-1 — REST API best practices

[Ghi chú tích hợp API/Security/lỗi giữa các module](../README_TICH_HOP_CONTRACT.md).

> Kết quả mới nhất ngày2026-11-20: đề cũ Lesson01 đạt68,5/80=85,625%. Có thể tiếp Lesson02; câu16 cần củng cố. M3-1 vẫn đang học, M2-4 tạm dừng. Đềvá bên dưới là tài liệu của mốc75%, không bắt buộc làm để công nhận kết quả mới. Xem [nhận xét hiện hành](../../../Exams/nhan-xet/M3-1-rest-bp__2026-11-20__lesson1-lan2__NHANXET.md).

## Lesson 02 mới — bản 2026-11-20

- [Bài học viết lại: list contract theo luồng chạy](LESSON_02_PAGINATION_FILTER_SORT_CONTRACT.md).
- [Đề mới: 12 câu ×5đ =60đ, đạt từ51đ](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson2-lan2.md).
- [Đáp án và rubric từng ý](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson2-lan2__DAPAN.md), mở sau khi tự làm.

Bài có dataset, code Controller/Service/DTO class và giải thích; không cần code cả project để làm đề. Bộ Lesson02 ngày2026-10-07 ở bảng dưới giữ làm lịch sử, không phải bài bắt buộc làm thêm. Lesson02 mới chưa có bài nộp/chưa có điểm; soạn sẵn không tick tiến độ.

## Tài liệu vá Lesson01 ở mốc trước

- [Đánh giá toàn bộ câu trả lời và bản đồ phần còn thiếu](README_DANH_GIA_VA_KE_HOACH_VA_LESSON_01.md).
- [Đề vá riêng: 12 câu/20đ, đạt từ17/20](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson1-va-lo-hong-lan1.md).
- [Đáp án/rubric đề vá](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson1-va-lo-hong-lan1__DAPAN.md), mở sau khi tự làm.

Đây là THI_LAI phần thiếu, không phải lesson mới. Không yêu cầu thi lại các phần đã được ghi nhận đúng. Các mô tả8×5đ của bộ đề soạn sẵn bên dưới thuộc bản2026-10-07; đề gốc Lesson01 hiện hành có16câu/80đ và đềvá có12câu/20đ, normalize theo tổng điểm thực của đề.

Bạn đã học MVC/DTO/JPA/validation và đã viết common theo `AppException + ErrorCode`. Mục tiêu ở đây không phải nhớ lại DispatcherServlet, mà là **làm API nhất quán để client, đồng đội và chính bạn không phải đoán**.

| Thứ tự | Bài học | Đề | Bài giải và điểm |
|---|---|---|---|
| 1 | [Resource, versioning, idempotency](LESSON_01_RESOURCE_VERSIONING_IDEMPOTENCY.md) | [Đề 01](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-10-07__lesson1-lan1.md) | [Giải 01](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [Pagination, filter, sort và DTO contract](LESSON_02_PAGINATION_FILTER_SORT_CONTRACT.md) | [Đề 02 mới](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson2-lan2.md) | [Giải 02 mới](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson2-lan2__DAPAN.md) |
| 3 | [ProblemDetail, luồng lỗi và HATEOAS](LESSON_03_PROBLEMDETAIL_HATEOAS_REVIEW.md) | [Đề 03](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-10-07__lesson3-lan1.md) | [Giải 03](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-10-07__lesson3-lan1__DAPAN.md) |

## Cách học

1. Đọc một tình huống và tự dự đoán request/response trước khi đọc giải thích.
2. Dùng lời của mình giải thích quyết định; không bắt thuộc imports hoặc tên lớp nội bộ Spring.
3. Làm đề lesson rồi mới mở bài giải. Dùng đúng tổng điểm in trên bản đề: Lesson01 hiện16×5=80đ; Lesson02 mới12×5=60đ; bộ cũ8×5=40đ. Normalize về100, đạt85%; không dùng nhầm mẫu số của bộ cũ.
4. [Quy tắc chấm](QUY_TAC_CHAM.md): nghiêm về thiếu ý, sai bản chất và kết luận không có điều kiện; không chấm văn mẫu.

Tổng 3 lesson; số câu theo từng bản đề hiện hành, không dùng tổng24 câu của bộ cũ. Theo12h roadmap: ba buổi học, buổi thứ tư đối chiếu/sửa contract. Không tự ép capstone trong phần đọc; deliverable roadmap vẫn chưa được ghi nhận. Khi thực hành thì dùng `shopcore`, không tạo project mới.

## Cần hiểu và được tra

- Cần hiểu: thay đổi nào làm client vỡ; retry ảnh hưởng state gì; list được filter/sort/page theo thứ tự nào; lỗi nào xuất hiện trước Service; vì sao body/status phải khớp.
- Được tra: cú pháp JPQL, signature override handler, method factory của ProblemDetail, syntax Spring HATEOAS.
- Chỉ nhận diện: cursor pagination, ETag, idempotency key; không yêu cầu triển khai.
- Ngoài phạm vi: Gateway/BFF, JWT/OAuth2, full HATEOAS framework, pipeline/load test.

## Hướng Backend → AWS → AI Engineer

Model/LLM có thể là một Service khác nhưng client vẫn cần API contract ổn định, dữ liệu list đầy đủ và lỗi máy đọc được. Ví dụ AI trong bài chỉ để thấy ứng dụng kiến thức; không yêu cầu học ML, streaming hoặc hàng đợi trước roadmap.

Xem [bản đồ phạm vi](LESSON_PLAN.md) và [báo cáo kiểm tra tài liệu](QUALITY_REVIEW.md). Ví dụ HTTP/code là minh họa, không tuyên bố đã tích hợp vào app hoặc test API thật.
