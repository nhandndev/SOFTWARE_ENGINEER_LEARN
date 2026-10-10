# M5-3 · Microservices — Khái niệm & Ranh giới

> Bộ soạn sẵn theo roadmap 8h / 2 buổi. Giữ Chưa bắt đầu; không tự tick checklist, không tách project và không nộp ADR mẫu thay bạn.

Bạn đã biết 3-layer/DTO/JPA và có bộ Redis/Kafka. Bài này trả lời **khi nào ranh giới Java module nên trở thành ranh giới network**, cùng chi phí phải trả. Không học bằng cách dựng hàng loạt service trước khi hiểu tại sao.

| Buổi | Bài học | Đề | Bài giải / rubric |
|---|---|---|---|
| 1 | [Monolith, modular monolith và bounded context](LESSON_01_MONOLITH_BOUNDARIES.md) | [Đề 01](../../../Exams/de-kiem-tra/M5-3-microservices__2026-10-07__lesson1-lan1.md) | [Giải 01](../../../Exams/de-kiem-tra/M5-3-microservices__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [Trade-off, extraction và ADR](LESSON_02_TRADEOFFS_EXTRACTION_ADR.md) | [Đề 02](../../../Exams/de-kiem-tra/M5-3-microservices__2026-10-07__lesson2-lan1.md) | [Giải 02](../../../Exams/de-kiem-tra/M5-3-microservices__2026-10-07__lesson2-lan1__DAPAN.md) |

Mỗi đề `PHONG_VAN` theo lesson: 8 tình huống × 5 = 40 điểm, đạt từ 34/40. Tổng **16 câu**, không phải đề DAY_DU cuối module. Chấm ý nghĩa, boundary và trade-off, không ép thuộc pattern/API hoặc triển khai saga/service mesh.

## Mẫu để đọc, không giả là deliverable

- [ADR template](ADR_TEMPLATE.md): form điền context/options/decision/consequences/review/validation.
- [ADR mẫu shopcore](ADR_EXAMPLE_SHOPCORE_MONOLITH.md): Proposed, tách fact/assumption và phần chưa implement; có giải thích lý do.
- [Kế hoạch phủ kiến thức](LESSON_PLAN.md), [quy tắc chấm](QUY_TAC_CHAM.md), [kiểm chất lượng](QUALITY_REVIEW.md).

Sơ đồ Order/Inventory/Notification là ví dụ mở rộng, không phải feature đã tồn tại trong source hiện tại. Boundary theo capability là đề xuất cần xác nhận domain, không phải mỗi table/context tự động một service. Không cần code mới để hiểu module.

## Kết quả cần đạt

Phân biệt được layer/context/deployable; giải thích ownership/transaction khi đi qua network; cân nhắc team, scale, failure isolation và ops cost; viết ADR nêu vì sao giữ shopcore monolith bây giờ, điều kiện nào review việc tách.

Roadmap deliverable là ADR trong `shopcore/docs`, không phải microservices implementation. Theo cách học đang hoãn capstone, bộ mẫu không tự ghi đã merge/hoàn thành deliverable. Đọc xong hoặc AI QA đạt không phải điểm thi của bạn.

Liên hệ AI Engineer: core backend có thể giữ monolith và một worker Python/GPU riêng khi nhu cầu runtime/scale thật sự khác. Không biến mục tiêu AI thành lý do tách mọi CRUD.

## Kiểm lại cấu trúc

```bash
node Notes/M5_Scalability/M5_3_Microservices/verify-structure.mjs
```

Đây là module tư duy kiến trúc/ADR, không có runtime sample để tuyên bố đã chạy Docker/API tests. Nội dung được rà theo từng task trong QUALITY_REVIEW; script chỉ kiểm cấu trúc, không tự chứng minh quyết định kiến trúc tối ưu.
