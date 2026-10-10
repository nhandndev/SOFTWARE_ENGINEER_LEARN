# M4-1 · Docker & Compose

> Soạn sẵn theo yêu cầu; không thay tiến độ, không tạo project mới và không sửa capstone thay bạn.

**Docker đóng gói môi trường chạy; không thay code, không tự biến app thiếu dependency thành app kết nối database.**

| Bài | Nội dung | Đề | Đáp án và rubric |
|---|---|---|---|
| 1 | [Image, container và vòng đời](LESSON_01_IMAGE_CONTAINER_LIFECYCLE.md) | [Đề1](../../../Exams/de-kiem-tra/M4-1-docker__2026-10-07__lesson1-lan1.md) | [Giải 1](../../../Exams/de-kiem-tra/M4-1-docker__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [Dockerfile multi-stage và cache](LESSON_02_DOCKERFILE_MULTISTAGE_CACHE.md) | [Đề2](../../../Exams/de-kiem-tra/M4-1-docker__2026-10-07__lesson2-lan1.md) | [Giải 2](../../../Exams/de-kiem-tra/M4-1-docker__2026-10-07__lesson2-lan1__DAPAN.md) |
| 3 | [Compose, network và volume](LESSON_03_COMPOSE_NETWORK_VOLUME.md) | [Đề3](../../../Exams/de-kiem-tra/M4-1-docker__2026-10-07__lesson3-lan1.md) | [Giải 3](../../../Exams/de-kiem-tra/M4-1-docker__2026-10-07__lesson3-lan1__DAPAN.md) |
| 4 | [Healthcheck, secrets và debug](LESSON_04_HEALTHCHECK_SECRETS_DEBUG.md) | [Đề4](../../../Exams/de-kiem-tra/M4-1-docker__2026-10-07__lesson4-lan1.md) | [Giải 4](../../../Exams/de-kiem-tra/M4-1-docker__2026-10-07__lesson4-lan1__DAPAN.md) |

## Cách học

16 h roadmap: bốn buổi, mỗi bài khoảng 4 h đọc flow, dự đoán lỗi, thử lệnh ở môi trường riêng khi bạn sẵn sàng. Mỗi đề **PHONG_VAN theo lesson 8 × 5=40đ**, đạt 34/40; tổng 32 câu. Không phải đề DAY_DU tổng module; chấm tư duy, không bắt thuộc mọi flag.

Docker thường dễ hiểu hơn bằng trạng thái thực tế: image build thành công chưa chắc app chạy; container running chưa chắc ready; database volume tồn tại chưa chắc dữ liệu đã backup.

## Điều kiện của ví dụ

- Shopcore hiện Boot 4.1.1/Java 21, Maven wrapper, chỉ có MVC/Lombok/test starter. Chưa có JPA/driver PostgreSQL/Redis starter hoặc endpoint health. Không claim cấu hình env tự bổ sung các thành phần này.
- Bài dùng Docker CLI và Compose V2 (`docker compose` có dấu cách). `docker-compose` trong roadmap là tên quen thuộc, không bắt cài V1 cũ.
- Docker Desktop trên macOS chạy Linux containers qua Linux VM, không container dùng trực tiếp kernel macOS.
- Base image dạy dùng Maven/Temurin 21; PostgreSQL 16-alpine, Redis 7.4-alpine là lựa chọn nhánh cụ thể, không latest. Tag vẫn mutable; release thật kiểm patch/digest, scan và policy nâng cấp.
- Redis ở topology học local, không publish port, network backend riêng; chưa auth/ACL, không phải cấu hình production. Không dạy cache business logic trước M5-1.
- Không Kubernetes/Helm/Swarm orchestration, không CI push registry/AWS deploy; học các module sau.

Xem [kế hoạch](LESSON_PLAN.md), [quy tắc chấm](QUY_TAC_CHAM.md), [kiểm chất lượng](QUALITY_REVIEW.md).
