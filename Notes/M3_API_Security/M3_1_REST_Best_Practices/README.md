# M3-1 — REST API best practices

[Ghi chú tích hợp API/Security/lỗi giữa các module](../README_TICH_HOP_CONTRACT.md).

> Kết quả hiện tại: Lesson01 đạt68,5/80=85,625%; Lesson02 đạt60/60=100% ngày2026-11-21. Có thể tiếp Lesson03; module vẫn đang học, M2-4 tạm dừng. Đề vá Lesson01 bên dưới là tài liệu ở mốc trước, không bắt buộc làm để công nhận kết quả mới. Điểm hiện hành xem05_TIEN_DO.md.

## Lesson 03 mới — bản 2026-11-21

> Hướng học đã điều chỉnh: **hiểu rộng, nắm bản chất, đào sâu đúng chỗ quan trọng** để làm nền AI Engineering. Giữ bài học chi tiết; kiểm tra bằng tình huống và quyết định, không ép nhớ API hoặc code lại project. Không bỏ tính đúng đắn, dữ liệu, bảo mật hoặc độ tin cậy.

- [Bài học: luồng lỗi, ProblemDetail và nhận diện HATEOAS](LESSON_03_PROBLEMDETAIL_HATEOAS_REVIEW.md).
- [Đề hiện hành TU_DUY_RONG:8câu/40đ, đạt34đ](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-21__lesson3-lan2.md).
- [Đáp án/rubric từng ý](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-21__lesson3-lan2__DAPAN.md), mở sau khi làm.
- [Báo cáo kiểm chất lượng](QUALITY_REVIEW_LESSON_03_2026_11_21.md).
- [Kiểm đề theo hướng tư duy rộng](QUALITY_REVIEW_LESSON_03_TU_DUY_RONG_2026_11_21.md).

Đề12câu/60đ trước đó đã được lưu trong Exams/de-kiem-tra/archive; không bắt làm cả hai. Link cuối bài học vẫn ghi mẫu số của bản cũ vì nội dung bài được giữ nguyên; khi làm/chấm dùng **8câu/40đ của đề hiện hành**, không dùng60.

Giữ style AppException/ErrorCode. Bài dùng contract v2 mẫu để không dạy đổi lén format lỗi v1; không tự sửa app hoặc buộc triển khai v2 thật. Có sơ đồ kèm giải thích, code handler và các tình huống đủ dữ kiện. Lesson03 chưa có bài nộp/chưa có điểm; đây là lesson cuối, không phải tự công nhận hoàn thành module/deliverable.

## Lesson 02 mới — bản 2026-11-20

> Ngày2026-11-21 đã viết rõ lại toàn bộ câu hỏi trong cùng file đề: mỗi ý ghi cụ thể dữ kiện và thông tin cần trả lời. Giữ nguyên12câu/60đ, không tạo thêm lesson hay yêu cầu mới.

- [Bài học viết lại: list contract theo luồng chạy](LESSON_02_PAGINATION_FILTER_SORT_CONTRACT.md).
- [Đề mới: 12 câu ×5đ =60đ, đạt từ51đ](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson2-lan2.md).
- [Đáp án và rubric từng ý](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson2-lan2__DAPAN.md), mở sau khi tự làm.

Bài có dataset, code Controller/Service/DTO class và giải thích; không cần code cả project để làm đề. Bộ Lesson02 ngày2026-10-07 giữ làm lịch sử, không phải bài bắt buộc làm thêm. Lesson02 mới đã được chấm60/60 ngày2026-11-21; xem snapshot tương ứng, không đổi điểm khi chỉ soạn Lesson03.

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
| 3 | [ProblemDetail, luồng lỗi và HATEOAS](LESSON_03_PROBLEMDETAIL_HATEOAS_REVIEW.md) | [Đề 03 mới](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-21__lesson3-lan2.md) | [Giải 03 mới](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-21__lesson3-lan2__DAPAN.md) |

## Cách học

1. Đọc một tình huống và tự dự đoán request/response trước khi đọc giải thích.
2. Dùng lời của mình giải thích quyết định; không bắt thuộc imports hoặc tên lớp nội bộ Spring.
3. Làm đề lesson rồi mới mở bài giải. Dùng đúng tổng điểm in trên bản đề: Lesson01 hiện80đ; Lesson02 đã chấm60đ; Lesson03 TU_DUY_RONG hiện40đ. Normalize về100, đạt85%; không dùng nhầm mẫu số giữa các bản. Điểm/hướng chấm cũ giữ trong lịch sử.
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
