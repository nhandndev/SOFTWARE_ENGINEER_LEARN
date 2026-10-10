# M3-1 — REST API best practices

[Ghi chú tích hợp API/Security/lỗi giữa các module](../README_TICH_HOP_CONTRACT.md).

> Soạn sẵn theo yêu cầu; M3-1 vẫn **chưa bắt đầu**. Tiến độ hiện tại ở M2-2; học theo thứ tự roadmap, không coi việc có tài liệu là pass các module trước.

Bạn đã học MVC/DTO/JPA/validation và đã viết common theo `AppException + ErrorCode`. Mục tiêu ở đây không phải nhớ lại DispatcherServlet, mà là **làm API nhất quán để client, đồng đội và chính bạn không phải đoán**.

| Thứ tự | Bài học | Đề | Bài giải và điểm |
|---|---|---|---|
| 1 | [Resource, versioning, idempotency](LESSON_01_RESOURCE_VERSIONING_IDEMPOTENCY.md) | [Đề 01](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-10-07__lesson1-lan1.md) | [Giải 01](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [Pagination, filter, sort và DTO contract](LESSON_02_PAGINATION_FILTER_SORT_CONTRACT.md) | [Đề 02](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-10-07__lesson2-lan1.md) | [Giải 02](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-10-07__lesson2-lan1__DAPAN.md) |
| 3 | [ProblemDetail, luồng lỗi và HATEOAS](LESSON_03_PROBLEMDETAIL_HATEOAS_REVIEW.md) | [Đề 03](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-10-07__lesson3-lan1.md) | [Giải 03](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-10-07__lesson3-lan1__DAPAN.md) |

## Cách học

1. Đọc một tình huống và tự dự đoán request/response trước khi đọc giải thích.
2. Dùng lời của mình giải thích quyết định; không bắt thuộc imports hoặc tên lớp nội bộ Spring.
3. Làm đề lesson rồi mới mở bài giải. Mỗi đề **8 × 5 = 40đ**, normalize về100, đạt từ34/40. Đây là format LESSON đang dùng trong dự án, không phải đề DAY_DU tổng module20 câu.
4. [Quy tắc chấm](QUY_TAC_CHAM.md): nghiêm về thiếu ý, sai bản chất và kết luận không có điều kiện; không chấm văn mẫu.

Tổng3 lesson/24 câu, không tách vụn thành bài riêng cho mỗi annotation. Theo12h roadmap: ba buổi học, buổi thứ tư đối chiếu/sửa contract. Không tự ép capstone trong phần đọc; deliverable roadmap vẫn chưa được ghi nhận. Khi thực hành thì dùng `shopcore`, không tạo project mới.

## Cần hiểu và được tra

- Cần hiểu: thay đổi nào làm client vỡ; retry ảnh hưởng state gì; list được filter/sort/page theo thứ tự nào; lỗi nào xuất hiện trước Service; vì sao body/status phải khớp.
- Được tra: cú pháp JPQL, signature override handler, method factory của ProblemDetail, syntax Spring HATEOAS.
- Chỉ nhận diện: cursor pagination, ETag, idempotency key; không yêu cầu triển khai.
- Ngoài phạm vi: Gateway/BFF, JWT/OAuth2, full HATEOAS framework, pipeline/load test.

## Hướng Backend → AWS → AI Engineer

Model/LLM có thể là một Service khác nhưng client vẫn cần API contract ổn định, dữ liệu list đầy đủ và lỗi máy đọc được. Ví dụ AI trong bài chỉ để thấy ứng dụng kiến thức; không yêu cầu học ML, streaming hoặc hàng đợi trước roadmap.

Xem [bản đồ phạm vi](LESSON_PLAN.md) và [báo cáo kiểm tra tài liệu](QUALITY_REVIEW.md). Ví dụ HTTP/code là minh họa, không tuyên bố đã tích hợp vào app hoặc test API thật.
