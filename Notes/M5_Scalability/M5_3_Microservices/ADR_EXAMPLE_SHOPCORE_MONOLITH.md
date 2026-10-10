# ADR-EXAMPLE-001 · Giữ shopcore một deployable, thiết kế boundary theo capability

> **ADR minh họa, không phải bài nộp hoặc quyết định được chấp thuận của project.** Số liệu/đội ngũ future case là giả định. Chưa thực thi module boundaries hoặc đo production.

- Ngày: 2026-10-07
- Status: Proposed — example only
- Owner/reviewer: người học; chưa có phê duyệt
- Liên quan: bài học M5-3, nền tảng MVC/JPA và bộ học Redis/Kafka

## Context

Fact từ workspace: shopcore có ứng dụng Spring Boot và model/DTO Product, Category; bộ bài M5-1/M5-2 đã được soạn. Điều này **không chứng minh** cache/Kafka/module boundaries đã tích hợp vào shopcore hoặc mọi feature đã hoàn thành.

Mục tiêu người học là nắm concept Backend rồi hướng AI Engineer; capstone đang được hoãn theo cách học hiện tại. Không có benchmark production hoặc bằng chứng nhiều team cần release độc lập trong phạm vi review này.

Assumption cho quyết định minh họa: một người phụ trách, quy mô vận hành nhỏ, ưu tiên hiểu flow/transaction và giảm chi phí vận hành. Nếu assumption này sai phải review lại.

## Options

| Phương án | Lợi ích | Mặt trái |
|---|---|---|
| Giữ code không đặt boundary | Ít việc thiết kế ban đầu | Dễ chọc repository/bảng chéo, coupling tăng |
| Một deployable hướng modular monolith | Local calls, pipeline đơn giản hơn; giữ ownership rõ | Release/scale vẫn chung, phải thực thi boundary |
| Tách Catalog/Ordering/Notification ngay | Có thể scale/release riêng nếu contract tốt | Chưa có bằng chứng lợi ích đủ lớn; thêm network/data/ops |

Tiêu chí ưu tiên: độ rõ nghiệp vụ, correctness, khả năng debug, công vận hành và bằng chứng nhu cầu độc lập. Không chọn theo số công nghệ trong CV.

## Decision

Giữ shopcore **một deployable** lúc này; đặt mục tiêu module theo capability khi phát triển feature, không tách theo Controller/Service/Repository. Product/Category có thể thuộc Catalog candidate; Ordering/Inventory/Notification chỉ là ứng viên tương lai, chưa được coi là đã tồn tại trong source.

Giao tiếp qua contract nội bộ có trách nhiệm/ownership rõ; tránh truy cập data/repository chéo tùy tiện. Nếu future case cần worker khác runtime hoặc notification durable, xem xét tách riêng phần đó bằng ADR mới, không kéo theo mọi CRUD.

Không triển khai microservices, service mesh, saga orchestrator hoặc Kafka pipeline chỉ để chứng minh decision này. Không coi shared DB/local transaction giải quyết side effect ngoài resource DB.

## Consequences

Lợi ích kỳ vọng: ít thành phần vận hành hơn, trace local dễ hơn, học rule và transaction trước khi thêm network. Đây là kỳ vọng thiết kế, chưa là kết quả đo latency/cost.

Mặt trái: scale/release chung, lỗi process hoặc shared DB có thể ảnh hưởng nhiều feature, boundary dễ bị phá. Mitigation đề xuất: review dependency, tests boundary khi code, query profiling, pool/timeouts và owner rõ. Modularization không tự xuất hiện từ việc tạo package.

## Revisit Triggers

| Tín hiệu cần review | Dữ liệu cần có | Review điều gì? |
|---|---|---|
| Release độc lập thường bị chặn dù boundary nội bộ rõ | Lịch release/blocked changes, owner/team | Tách có giảm lockstep và đủ pipeline/on-call không |
| Một workload chiếm tài nguyên và vượt mục tiêu | Profile, latency/error/backlog/cost qua nhiều khoảng tải | Query/pool/job/scale monolith đã xử lý chưa; bottleneck có ở provider/DB không |
| Runtime AI/GPU khác biệt thành nhu cầu thật | Resource/job SLA, dữ liệu và security constraints | Worker contract/idempotency/status; không tách mọi CRUD |
| Failure lan sang feature không liên quan | Incident/timeout/pool metrics | Isolation bằng giới hạn resource hay process riêng hợp lý hơn |

Owner minh họa là người học; review khi tín hiệu xuất hiện và trong lần lập kế hoạch kiến trúc kế tiếp. Không có ngưỡng request/team cố định chung. Trigger yêu cầu phân tích, không tự động chuyển sang microservices.

## Validation And Limits

Khi code thật: kiểm dependency/data ownership, flow transaction, failure path và baseline bottleneck trước khi đề xuất extraction. Nếu tách, thêm contract compatibility, data cutover/rollback, metric success/cost và runbook trước khi tăng traffic.

Hiện chưa triển khai các bước đó, chưa benchmark, chưa chứng minh HA hoặc isolation bằng runtime test; ADR này chưa Accepted và chưa merge vào shopcore/docs. Điểm thi/đạt module của học viên không được suy từ mẫu.

## Vì sao mẫu này không chỉ nói “monolith dễ hơn”?

Nó ghi assumption, options, cả mặt trái và tín hiệu xem xét lại. Khi bối cảnh đổi, quyết định có thể đổi mà không phủ nhận lý do hợp lý ở thời điểm cũ. Giữ bản cũ để hiểu lịch sử; ADR mới link supersede khi được chấp thuận.
