# M2-4 · N+1 và HikariCP

> Tạm dừng ngày 2026-11-20 theo yêu cầu người học để chuyển M3-1. Lesson 01 đã đạt 87,5%; Lesson 02 mới chấm tạm câu 1–3 được 90%. Giữ tài liệu/bài nộp, không coi module hoặc benchmark/deliverable đã hoàn thành. Trạng thái mới nhất xem 05_TIEN_DO.md.

Module trả lời hai câu: **ORM thực sự chạy bao nhiêu SQL để dựng response? Connection có bị dùng/chờ quá lâu không?** Giảm query, giữ đúng dữ liệu và quản lý connection cần được đo trong cùng điều kiện.

Ôn theo bài làm ngày 2026-11-01: [Học bổ sung Lesson 01 — sai, thiếu và câu chưa làm](README_HOC_BO_SUNG_LESSON_01_TU_BAI_LAM.md). Bao gồm đọc FK, kiểm SQL log, luồng DTO/session đóng, Statistics và giới hạn kết luận tối ưu. Không thay thế bài nộp hoặc tự cập nhật điểm.

| Thứ tự | Bài học | Đề riêng | Bài giải và rubric |
|---|---|---|---|
| 1 | [N+1 và SQL log](LESSON_01_N_PLUS_1_VA_SQL_LOG.md) | [Lesson 01 — bản 2026-11-01](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-11-01__lesson1-lan2.md) | [Giải Lesson 01 và rubric](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-11-01__lesson1-lan2__DAPAN.md) |
| 2 | [Fetch join, graph, batch, DTO](LESSON_02_FETCH_JOIN_ENTITYGRAPH_BATCH_DTO.md) | [Lesson 02 — 16 câu, bản 2026-11-10](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-11-10__lesson2-lan2.md) | [Giải Lesson 02 và rubric](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-11-10__lesson2-lan2__DAPAN.md) |
| 3 | [Paging, OSIV, transaction](LESSON_03_PAGING_OSIV_VA_TRANSACTION.md) | [Lesson 03](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-05__lesson3-lan1.md) | [Giải Lesson 03](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-05__lesson3-lan1__DAPAN.md) |
| 4 | [HikariCP và benchmark](LESSON_04_HIKARICP_VA_BENCHMARK.md) | [Lesson 04](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-06__lesson4-lan1.md) | [Giải Lesson 04](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-06__lesson4-lan1__DAPAN.md) |

Mỗi file bài giải có đáp án đầy đủ từng câu, giải thích cơ chế và lỗi mất điểm. Áp dụng [quy tắc chấm nghiêm](../QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md): phải giữ đúng dữ liệu và điều kiện kết luận, không cho đủ điểm chỉ vì nhắc đúng từ khóa. Mở bài giải sau khi tự làm đề.

Ví dụ dùng Product/Category, DTO **class**, cấu hình YAML, giải thích bước chạy và giả định dữ liệu. Code là đoạn minh họa có ngữ cảnh, không phải project đã build/chạy. Bảng benchmark được đánh dấu giả định, không coi là kết quả đo thực tế.

Các đề Lesson 01, 03, 04 có 8 câu ×5đ =40đ; riêng Lesson 02 hiện hành mở rộng 16 câu ×5đ =80đ theo yêu cầu quét toàn bài ngày 2026-11-10. Normalize theo tổng điểm thực của từng đề, chấm tư duy; ngưỡng đạt 85%. Đáp án riêng thêm `__DAPAN.md`; đọc sau khi làm. Đây là cấu trúc LESSON, không phải DAY_DU tổng module. Khi chấm phải lưu snapshot.

Đề Lesson 02 mới có [bảng coverage và kiểm chất lượng từng task](QUALITY_REVIEW_LESSON_02_EXAM_2026_11_10.md); không đổi điểm/trạng thái chỉ vì viết lại đề.

Xem [kế hoạch và coverage](LESSON_PLAN.md), [kiểm chứng chất lượng](QUALITY_REVIEW.md). Bạn có thể học concept/làm đề trước; tài liệu không tự tạo project hoặc đánh dấu deliverable/benchmark hoàn thành.

**Rà lại ngày 2026-10-07:** thêm giải nghĩa context/proxy/connection; code ghép page collection đủ DTO/order/metadata; đề có lỗi count filter và bảng tune pool. Các ví dụ JOIN/count đã kiểm trên PostgreSQL tạm; method paging trích từ bài đã compile/test phần ghép dữ liệu bằng Java, chưa kiểm tích hợp Hibernate hoặc benchmark thật.
