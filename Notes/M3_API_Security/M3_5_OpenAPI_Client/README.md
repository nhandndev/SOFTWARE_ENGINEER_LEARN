# M3-5 · External API Client & OpenAPI

[Ghi chú tích hợp API/Security/lỗi giữa các module](../README_TICH_HOP_CONTRACT.md).

> Soạn sẵn, không đổi tiến độ hoặc coi các module trước đã đạt. Không sửa POM/code shopcore thay người học.

Bạn biết nhận request qua Controller → Service → Repository. Bài này thêm một nhánh: **Service gọi hệ thống khác, nhưng vẫn chịu trách nhiệm về hợp đồng API của mình**.

| Lesson | Nội dung | Đề | Bài giải và rubric |
| --- | --- | --- | --- |
| 1 | [WebClient và luồng gọi external API](LESSON_01_WEBCLIENT_EXTERNAL_API_FLOW.md) | [Đề 1](../../../Exams/de-kiem-tra/M3-5-openapi-client__2026-10-07__lesson1-lan1.md) | [Giải 1](../../../Exams/de-kiem-tra/M3-5-openapi-client__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [Timeout, retry và error mapping](LESSON_02_TIMEOUT_RETRY_ERROR_MAPPING.md) | [Đề 2](../../../Exams/de-kiem-tra/M3-5-openapi-client__2026-10-07__lesson2-lan1.md) | [Giải 2](../../../Exams/de-kiem-tra/M3-5-openapi-client__2026-10-07__lesson2-lan1__DAPAN.md) |
| 3 | [OpenAPI, springdoc và DTO contract](LESSON_03_OPENAPI_SPRINGDOC_CONTRACT.md) | [Đề 3](../../../Exams/de-kiem-tra/M3-5-openapi-client__2026-10-07__lesson3-lan1.md) | [Giải 3](../../../Exams/de-kiem-tra/M3-5-openapi-client__2026-10-07__lesson3-lan1__DAPAN.md) |
| 4 | [Bearer JWT, export và kiểm chứng tài liệu](LESSON_04_BEARER_EXPORT_VERIFICATION.md) | [Đề 4](../../../Exams/de-kiem-tra/M3-5-openapi-client__2026-10-07__lesson4-lan1.md) | [Giải 4](../../../Exams/de-kiem-tra/M3-5-openapi-client__2026-10-07__lesson4-lan1__DAPAN.md) |

## Cách học phù hợp với bạn

14h roadmap chia bốn buổi khoảng 3.5h. Mỗi bài có flow kèm giải thích, code theo trách nhiệm, tình huống đúng/sai và tài liệu liên quan. Không bắt thuộc tên operator/import; cần dự đoán được kết quả khi provider chậm/hỏng hoặc docs khác runtime.

Mỗi đề **PHONG_VAN theo lesson, 8×5=40đ**, đạt từ 34/40; tổng 32 câu. Không gọi đây là đề DAY_DU tổng module. Đáp án cho biết từng ý được điểm và phần cần ôn. Testing đang tạm hoãn: vẫn học cách kiểm chứng bằng fixture/curl, không ép nhớ JUnit.

## Quyết định phạm vi

- Chọn **WebClient**, không dạy thêm cả OpenFeign. Không chuyển shopcore MVC sang WebFlux server. `.block()` chỉ ở boundary đồng bộ của MVC, không trên reactive event loop.
- Bối cảnh xuyên suốt: lấy báo giá vận chuyển. Carrier là **hợp đồng giả lập để học**, không phải dịch vụ công khai có thể gọi được. Host `.example` không phải API đang hoạt động.
- DTO class, BigDecimal cho tiền, AppException/ErrorCode ở biên nghiệp vụ theo style bạn đã dùng.
- Giữ Boot4.1.1/Java21 hiện tại. Boot starter theo BOM; springdoc3.x dành Boot4, xem compatibility trước khi thêm. Không pin dependency từ tutorial Boot2/3.
- Không contract-first codegen, không circuit breaker platform, không reactive chuyên sâu, không gọi model AI thật. Liên hệ AI chỉ để hiểu timeout, retry và chi phí external request.

[Kế hoạch coverage](LESSON_PLAN.md) · [Quy tắc chấm](QUY_TAC_CHAM.md) · [Kiểm chất lượng](QUALITY_REVIEW.md).
