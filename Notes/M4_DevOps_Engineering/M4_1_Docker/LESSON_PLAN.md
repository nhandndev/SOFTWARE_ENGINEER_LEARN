# Kế hoạch và coverage M4-1

| Checklist roadmap | Bài | Câu kiểm |
|---|---|---|
| Dockerfile multi-stage Spring Boot | 2 | 1–4, 8 |
| Image layers/cache/.dockerignore | 2 | 5–7 |
| Compose services/volumes/networks | 3 | 1–8 |
| Env vars/secrets không hard-code | 4 | 4–6 |
| Port mapping | 1/3 | Bài1 câu5–6; bài 3 câu2–3 |
| depends_on/healthcheck | 4 | 1–3 |

Bài1 bổ sung nền image/process/lifecycle trước khi đọc YAML. Bài3 dạy volume/down -v ngay trước khi yêu cầu kiểm dữ liệu; bài 4 nâng topology thành health-gated/secrets và hướng dẫn debug.

Liên hệ kiến thức cũ: port khác URL app; profile/env có precedence; JDBC host trong container là db chứ không localhost; DB readiness khác schema migration; external HTTP cần egress; Docker không thay JWT/CSRF/validation. Config/Flyway/Redis chỉ nối khái niệm, không dạy lại toàn module.

Deliverable roadmap là Dockerfile multi-stage + Compose chạy shopcore/PostgreSQL/Redis bằng một lệnh. Tài liệu chỉ chuẩn bị kiến thức; không xác nhận code/merge/deliverable. Người học có quyết định chưa làm capstone, không tự tick tiến độ vì đã có bài soạn sẵn.
