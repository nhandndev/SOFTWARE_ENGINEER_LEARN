# Kế hoạch phủ kiến thức M5-3

## Checklist → bài học → câu hỏi

| Roadmap | Nơi dạy | Nơi kiểm |
|---|---|---|
| Monolith vs microservices, trade-off | Lesson 01 mục 1–3; Lesson 02 mục 1–3 | Đề 01 câu 1,2,6,7; đề 02 câu 1–3 |
| Bounded context | Lesson 01 mục 4–5 | Đề 01 câu 3,4,8 |
| Khi nào tách: team/scale/failure isolation | Lesson 02 mục 1,3,5–6 | Đề 02 câu 1,2,3,5,6 |
| Chi phí vận hành | Lesson 02 mục 2–4 | Đề 02 câu 2–6 |
| ADR format và quyết định giữ shopcore monolith | Lesson 02 mục 7 + template/mẫu | Đề 02 câu 7–8 |
| Deliverable ADR, không phải code microservices | README, Lesson 02 mục 7 | Đề 02 câu 8, rubric status/limits |

Data ownership/transaction được thêm vừa đủ để trade-off có ý nghĩa, nối JPA/Kafka đã có bài. Không yêu cầu triển khai saga, service mesh, CQRS, Kubernetes hoặc distributed transactions.

## Nhịp hai buổi

Buổi 1: đọc hình local/remote, kể ví dụ Product trong ba context, làm đề boundary. Buổi 2: phản biện case bottleneck/release/AI worker, đọc template/mẫu ADR, làm đề trade-off và ADR ngắn. Mỗi buổi khoảng 4h gồm học/trace/thi/đối chiếu, không tách thành nhiều lesson lặp định nghĩa.

## Điểm dễ đánh đồng cần rà

Layer không là service; bounded context không luôn 1:1 service; shared physical DB không đồng nghĩa shared ownership; monolith không đồng nghĩa một instance; Kafka/Docker không chứng minh microservices; Accepted ADR không chứng minh đã deploy; schematic/assumption không phải feature/benchmark thật.

Soạn sẵn khác mở module. Không đổi trạng thái/điểm/ngày hoặc tự tick checklist; chỉ ghi nhãn tài liệu sẵn có. Khi chấm thật mới snapshot theo AGENTS, phân biệt điểm lesson với toàn module/deliverable.
