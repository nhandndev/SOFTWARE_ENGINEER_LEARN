# M2-3 · Flyway Migration

> Tài liệu đã soạn sẵn theo yêu cầu. Module vẫn **chưa bắt đầu**, chưa có điểm hay deliverable được ghi nhận. Học sau M2-2; không cần đọc cả ba lesson trong một buổi.

Bạn đã biết Entity, PostgreSQL constraint và transaction. Module này trả lời: **làm sao nhiều môi trường nâng cấp database theo cùng lịch sử mà không sửa tay tùy tiện?**

| Thứ tự | Bài học | Đề riêng | Bài giải và rubric |
|---|---|---|---|
| 1 | [Migration và schema history](LESSON_01_MIGRATION_VA_SCHEMA_HISTORY.md) | [Lesson 01](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-05__lesson1-lan1.md) | [Giải Lesson 01](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-05__lesson1-lan1__DAPAN.md) |
| 2 | [Boot, repeatable và seed](LESSON_02_BOOT_REPEATABLE_VA_SEED.md) | [Lesson 02](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-05__lesson2-lan1.md) | [Giải Lesson 02](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-05__lesson2-lan1__DAPAN.md) |
| 3 | [Lỗi, repair, baseline và CI](LESSON_03_LOI_REPAIR_BASELINE_VA_CI.md) | [Lesson 03](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-05__lesson3-lan1.md) | [Giải Lesson 03](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-05__lesson3-lan1__DAPAN.md) |

Mỗi file bài giải có đáp án đầy đủ từng câu, giải thích cơ chế và lỗi mất điểm. Áp dụng [quy tắc chấm nghiêm](../QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md): chấm bằng chứng từng ý, không nương điểm và không bắt học thuộc văn mẫu. Mở bài giải sau khi tự làm đề.

Mỗi đề có 8 câu ×5 điểm, tổng 40; chấm theo ý nghĩa, normalize về 100. Đây là đề **LESSON theo quy trình bạn đang học**, không thay bằng cấu trúc DAY_DU 20 câu. Đáp án ở file cùng tên thêm `__DAPAN.md`; đọc sau khi làm. Khi bạn yêu cầu chấm, luôn lưu snapshot theo `03_PROMPT_CHAM_DE.md`.

Mỗi bài có mục tiêu, điều kiện tiên quyết, ví dụ Product/Category, giải thích luồng, lỗi hay nhầm, tài liệu chính thức và từ khóa video. Tài liệu là nguồn đã đối chiếu; từ khóa video là gợi ý tìm, không phải khẳng định đã xem video cụ thể.

Xem [kế hoạch và phạm vi](LESSON_PLAN.md) để biết checklist nằm ở đâu; xem [kiểm chứng chất lượng](QUALITY_REVIEW.md) để biết đã kiểm gì và giới hạn kiểm chứng.

**Rà lại ngày 2026-10-07:** setup chính đổi theo Boot 4.1.1 của shopcore; thêm đọc SQL seed/rollback có dữ liệu cụ thể, chia rõ kiến thức cần hiểu và phần tra cứu. Các SQL chính đã được kiểm trên PostgreSQL 17 tạm; chưa chạy Flyway/Boot/CI thật. Báo cáo chất lượng ghi riêng các mức bằng chứng đó.

Theo cách học hiện tại, bạn làm đề bằng lời/SQL ngắn. Tài liệu này không tạo project mới, không tự bắt triển khai capstone và không tự ghi nhận migration/CI đã chạy thật. Nếu sau này thực hành, áp dụng trong `shopcore` và báo bằng chứng riêng.
