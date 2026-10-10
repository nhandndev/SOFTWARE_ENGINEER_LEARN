# Kế hoạch M2-4 · N+1 & HikariCP

Bốn lesson theo thứ tự phát hiện → chọn fetch → giữ paging/ranh giới đúng → đo và tune. Lesson 04 có thể đọc hai buổi, không tách thêm chỉ vì nhiều setting.

Nối hướng Backend → AWS → AI Engineer: dùng ít lượt DB hợp lý, trả DTO không kéo proxy ngoài ý muốn, và không giữ connection lúc chờ model/network. Chỉ liên hệ để hiểu công dụng; không thêm bài ML/RAG hay bắt triển khai AWS trong module này.

| Lesson | Kiến thức mới | Nối bài đã học | Kết quả cần giải thích |
|---|---|---|---|
| 01 | Query phụ, LAZY/EAGER, cache/context, SQL/statistics | JPA LAZY và JOIN | Tìm nơi phát sinh SQL, nêu giả định khi đếm |
| 02 | JOIN FETCH, EntityGraph, BatchSize, projection | DTO class và JPQL | Chọn dữ liệu đủ cho response và kiểm đúng kết quả |
| 03 | Collection paging, two-step, OSIV, transaction | Page/Pageable, transaction | Giữ root page đúng và serialize không kéo proxy |
| 04 | Pool, timeout/leak, budget, metrics, benchmark | Config YAML, SQL đo trước/sau | Chẩn đoán pool và kết luận có bằng chứng |

## Checklist roadmap được dạy ở đâu?

| Checklist | Bài | Câu kiểm tra |
|---|---|---|
| Phát hiện N+1 SQL log/statistics | Lesson 01 mục 2–5 | Câu 1–4, 6–7 |
| JOIN FETCH/EntityGraph/BatchSize | Lesson 02 mục 2–4 | Câu 1–4, 7–8 |
| open-in-view tắt | Lesson 03 mục 4–5 | Câu 5–6 |
| Hikari maximumPoolSize/timeout/leakDetection | Lesson 04 mục 1–6 | Câu 1–5 |
| Đo số query và latency trước–sau | Lesson 01 mục 5; Lesson 04 mục 7–9 | Lesson 04 câu 6–8 |
| Transaction boundary/performance | Lesson 03 mục 4–6 | Câu 5–8 |

Paging collection và DTO projection là bổ sung để cách sửa N+1 không làm sai API hoặc tải thừa. p50/p95, budget replica và giữ điều kiện đo là phần tối thiểu để báo cáo performance có nghĩa; chưa yêu cầu setup toàn observability.

## Giới hạn và nhịp học

Không học sâu second-level cache, Redis, mọi Hibernate tuning flag hoặc load-test framework. M1-6 Testing vẫn hoãn theo quyết định trước; đề ở đây cho phép mô tả kế hoạch kiểm chứng mà không bắt nhớ test syntax.

Đọc từng lesson → làm đề → chấm snapshot → sửa phần thiếu. Khi thực hành về sau, cần SQL log và benchmark thật để ghi nhận deliverable. Việc chuẩn bị sẵn file không làm M2-4 chuyển khỏi “Chưa bắt đầu”.

## Thứ tự ưu tiên để không quá tải lý thuyết

- Bắt buộc hiểu: từ field DTO lần ra dữ liệu cần fetch; phát hiện query phụ; JOIN type không làm mất dòng; collection paging/metadata; transaction giữ connection; phân biệt pool wait và SQL time; kết luận đo có điều kiện.
- Biết tra: logger/Statistics, package JPQL, BatchSize property, flag fail collection paging, idle/lifetime/validation timeout và meter name.
- Chưa cần: full Actuator/Grafana, JUnit syntax, load-test framework, nâng cao cache, thông số tối ưu cố định cho mọi hệ thống.

Đề đã có ngữ cảnh code/data và phần áp dụng: bỏ field quan hệ khỏi DTO (Lesson 01), chọn fetch theo use case (Lesson 02), sửa count filter (Lesson 03), đọc thử nghiệm nhiều mức pool (Lesson 04). Không yêu cầu viết nguyên project để trả lời 8 câu của một lesson.
