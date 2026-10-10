# Kế hoạch M5-4 · Phủ kiến thức, không kéo dài ngoài roadmap

Roadmap: 8h, 2 buổi. Đầu vào: MVC/DI/config/security, logging/MDC; không yêu cầu người học đã triển khai Redis/Kafka hay Kubernetes. Chuẩn bị tài liệu không đồng nghĩa mở module khi module trước chưa đạt.

| Checklist roadmap | Bài học | Câu đánh giá |
|---|---|---|
| health, metrics, info | L1 mục 1–6; L2 mục 1, 5–6 | L1 C1/C4/C8; L2 C1/C6 |
| Expose an toàn | L1 mục 3–5 | L1 C2/C3/C4 |
| Custom HealthIndicator | L1 mục 7–9 | L1 C5/C6/C7 |
| Counter/Timer | L2 mục 2–7 | L2 C2/C3/C4/C5/C8 |
| Liên hệ logging/MDC | L2 mục 8–9 | L2 C7/C8 |

## Buổi 1

- 45 phút: vai trò Actuator và đường đi của request; tự phân biệt business/management handler.
- 60 phút: access/exposure/security, đọc hai chain; dự đoán status và details trước khi thử.
- 60 phút: đọc indicator/info, probe semantics và giới hạn; đổi điều kiện thư mục trong vùng lab an toàn nếu muốn thử.
- 45 phút: trả lời 8 tình huống, không xem bài giải.
- 30 phút: đối chiếu rubric và ghi lại hiểu nhầm.

## Buổi 2

- 45 phút: Registry, Counter, Timer và boundary.
- 60 phút: lần theo helper bằng ba lời gọi success/error/in-flight; đọc measurements/tag/unit.
- 45 phút: cardinality, metrics vs logs, MDC và async caveat.
- 30 phút: kịch bản chẩn đoán có time/instance/workload.
- 45 phút: làm đề; 15 phút: đọc đáp án, đánh dấu ý còn thiếu.

## Phần không biến thành yêu cầu ngầm

Không bắt setup full Prometheus/Grafana, scrape metrics JSON ở production, Kubernetes, distributed tracing, dashboards/SLO hoặc async instrumentation implementation. Nhắc chúng để không hiểu quá phạm vi của mẫu, không chấm triển khai ngoài bài.

Không thay đổi code shopcore khi soạn tài liệu. Khi người học thực hành, mọi deliverable vào shopcore, giữ policy JWT/OAuth2 đã có. Không tạo project capstone mới. Bộ QA tạm là kiểm chứng của người soạn, không phải bài nộp hoặc benchmark.
