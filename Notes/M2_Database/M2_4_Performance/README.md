# M2-4 · N+1 và HikariCP

> Tài liệu soạn sẵn, module vẫn **chưa bắt đầu**. Học sau M2-3 theo roadmap. Không cần thuộc hết cấu hình để bắt đầu; học từ SQL thực tế rồi mới đến pool.

Module trả lời hai câu: **ORM thực sự chạy bao nhiêu SQL để dựng response? Connection có bị dùng/chờ quá lâu không?** Giảm query, giữ đúng dữ liệu và quản lý connection cần được đo trong cùng điều kiện.

| Thứ tự | Bài học | Đề riêng | Bài giải và rubric |
|---|---|---|---|
| 1 | [N+1 và SQL log](LESSON_01_N_PLUS_1_VA_SQL_LOG.md) | [Lesson 01](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-05__lesson1-lan1.md) | [Giải Lesson 01](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-05__lesson1-lan1__DAPAN.md) |
| 2 | [Fetch join, graph, batch, DTO](LESSON_02_FETCH_JOIN_ENTITYGRAPH_BATCH_DTO.md) | [Lesson 02](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-05__lesson2-lan1.md) | [Giải Lesson 02](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-05__lesson2-lan1__DAPAN.md) |
| 3 | [Paging, OSIV, transaction](LESSON_03_PAGING_OSIV_VA_TRANSACTION.md) | [Lesson 03](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-05__lesson3-lan1.md) | [Giải Lesson 03](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-05__lesson3-lan1__DAPAN.md) |
| 4 | [HikariCP và benchmark](LESSON_04_HIKARICP_VA_BENCHMARK.md) | [Lesson 04](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-06__lesson4-lan1.md) | [Giải Lesson 04](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-06__lesson4-lan1__DAPAN.md) |

Mỗi file bài giải có đáp án đầy đủ từng câu, giải thích cơ chế và lỗi mất điểm. Áp dụng [quy tắc chấm nghiêm](../QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md): phải giữ đúng dữ liệu và điều kiện kết luận, không cho đủ điểm chỉ vì nhắc đúng từ khóa. Mở bài giải sau khi tự làm đề.

Ví dụ dùng Product/Category, DTO **class**, cấu hình YAML, giải thích bước chạy và giả định dữ liệu. Code là đoạn minh họa có ngữ cảnh, không phải project đã build/chạy. Bảng benchmark được đánh dấu giả định, không coi là kết quả đo thực tế.

Mỗi lesson có 8 câu ×5đ =40đ, normalize /40 ×100, chấm tư duy. Đáp án riêng thêm `__DAPAN.md`; đọc sau khi làm. Đây là cấu trúc LESSON đã dùng trong dự án, không phải DAY_DU tổng module. Khi chấm phải lưu snapshot.

Xem [kế hoạch và coverage](LESSON_PLAN.md), [kiểm chứng chất lượng](QUALITY_REVIEW.md). Bạn có thể học concept/làm đề trước; tài liệu không tự tạo project hoặc đánh dấu deliverable/benchmark hoàn thành.

**Rà lại ngày 2026-10-07:** thêm giải nghĩa context/proxy/connection; code ghép page collection đủ DTO/order/metadata; đề có lỗi count filter và bảng tune pool. Các ví dụ JOIN/count đã kiểm trên PostgreSQL tạm; method paging trích từ bài đã compile/test phần ghép dữ liệu bằng Java, chưa kiểm tích hợp Hibernate hoặc benchmark thật.
