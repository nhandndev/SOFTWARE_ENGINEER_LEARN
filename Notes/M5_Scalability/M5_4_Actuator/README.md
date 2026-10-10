# M5-4 · Spring Actuator & Metrics

> Tài liệu soạn sẵn theo roadmap 8h / 2 buổi. Không đổi trạng thái học, không tick checklist và không xem code mẫu là deliverable đã nộp.

Bạn đã quen viết Controller → Service → Repository. Module này giúp trả lời một câu khác: **khi ứng dụng đang chạy, làm sao biết nó có phục vụ được không, chậm ở đâu và cần tìm log nào?**

| Buổi | Bài học | Bài kiểm tra | Bài giải / rubric |
|---|---|---|---|
| 1 | [Endpoint, security, health và info](LESSON_01_ENDPOINTS_SECURITY_HEALTH.md) | [Đề 01](../../../Exams/de-kiem-tra/M5-4-actuator__2026-10-07__lesson1-lan1.md) | [Giải 01](../../../Exams/de-kiem-tra/M5-4-actuator__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [Micrometer, Counter, Timer và MDC](LESSON_02_METRICS_COUNTER_TIMER_MDC.md) | [Đề 02](../../../Exams/de-kiem-tra/M5-4-actuator__2026-10-07__lesson2-lan1.md) | [Giải 02](../../../Exams/de-kiem-tra/M5-4-actuator__2026-10-07__lesson2-lan1__DAPAN.md) |

Mỗi đề theo chế độ `PHONG_VAN`: 8 tình huống × 5 = 40 điểm, đạt từ 34/40. Tổng 16 câu, chấm tư duy và ý nghĩa, không bắt thuộc import hoặc viết project mới. Đây không phải đề `DAY_DU` cuối module.

## Cách đọc

Đọc từng lesson, tự dự đoán HTTP status/metric trước khi xem giải thích. Nếu muốn thử code, tích hợp vào `shopcore`; đừng chép đè security hiện có. Các Java class trong bài là ví dụ, không phải feature đã tồn tại trong source của bạn.

- Bản ví dụ: Java 21, Spring Boot **4.1.1** theo POM hiện tại. Import Actuator trong Boot 4 có chỗ khác Boot 3.
- Không cần Prometheus/Grafana, Kubernetes cluster, dashboard hoặc benchmark production ở module này.
- Có liên hệ AI Engineer: health của API không đồng nghĩa model provider đang tốt; không đưa prompt/user ID vào metric tag.
- Code mẫu dùng class, không dùng record. Không thêm Entity/DTO CRUD không liên quan.

## Kết quả cần đạt

Phân biệt endpoint access, web exposure và quyền truy cập; biết bảo vệ info/metrics; hiểu một health check chứng minh được gì; viết một HealthIndicator nhẹ; đọc Counter/Timer đúng đơn vị và phạm vi; nối metric bất thường với log có requestId.

Roadmap vẫn ghi deliverable health/metrics/info + một indicator + một metric trong `shopcore`. Theo lựa chọn hoãn capstone, tài liệu và QA của AI **không** tự xác nhận bạn đã làm/merge deliverable hoặc pass module.

[Kế hoạch phủ kiến thức](LESSON_PLAN.md) · [Quy tắc chấm](QUY_TAC_CHAM.md) · [Kiểm chất lượng](QUALITY_REVIEW.md)

```bash
node Notes/M5_Scalability/M5_4_Actuator/verify-structure.mjs --self-test
```

Script chỉ kiểm cấu trúc/link/rubric. Kiểm chứng runtime và giới hạn được ghi riêng trong QUALITY_REVIEW.
