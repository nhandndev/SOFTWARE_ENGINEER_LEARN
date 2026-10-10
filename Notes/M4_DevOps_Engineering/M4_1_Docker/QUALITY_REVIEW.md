# Kiểm chất lượng M4-1 · 2026-10-07

## Phạm vi và format

Bốn lesson bám checklist Docker trong roadmap: image/container → multi-stage/cache → Compose/network/volume → health/secrets/debug. Có bốn đề PHONG_VAN theo lesson, mỗi đề 8 câu × 5đ = 40đ, đạt 34/40; mỗi đề có file bài giải và rubric riêng. Không gọi đây là đề DAY_DU tổng module, không tự chuyển trạng thái học.

| Lesson | Đã rà nội dung và câu hỏi |
|---|---|
| 1 | Image khác process; Mac có Linux VM; EXPOSE khác publish; localhost có ngữ cảnh; tag và CPU platform |
| 2 | Build context; builder/runtime; đúng Java/JAR; non-root; cache mount khác layer cache; secret không vào image; skipTests không phải test pass |
| 3 | Service DNS/cổng nội bộ; internal backend và app egress; interpolation khác container env; down mặc định khác xóa volumes; project name và dữ liệu |
| 4 | Running/healthy/ready; startup gate không continuous guard; _FILE khác configtree; $$ và CMD-SHELL; password init không rotation; debug theo evidence |

Câu hỏi kiểm chính kiến thức trong lesson, không bắt thuộc flag hoặc bổ sung business feature chưa dạy. Rubric tách điểm từng ý, không điều kiện fail bí mật. Dùng cách diễn đạt tương đương được công nhận; hiểu sai bản chất vẫn mất điểm tương ứng.

## Kiểm chứng đã chạy

- Docker Compose cài trên máy báo phiên bản v5.1.0, dùng CLI hiện đại `docker compose` và Compose Specification; bài không yêu cầu binary V1 `docker-compose`.
- Trích đúng YAML đầy đủ từ lesson 4; `docker compose config --quiet` thành công.
- Đọc config JSON để kiểm backend internal, DB/Redis không publish host ports, app secret target đúng tên `spring.datasource.password` và không có raw datasource password env trong mẫu cuối.
- Dùng image PostgreSQL 16 Alpine đã có trên máy, chạy riêng service db thuộc project QA tên duy nhất, không host ports và không dùng dữ liệu người học.
- PostgreSQL init với password từ Compose secret file và báo healthy. Một client container riêng gọi `db:5432`, dùng password thử nghiệm, tạo bảng/ghi/đọc thành công. Đây là kiểm TCP auth thật, không chỉ pg_isready hoặc local Unix trust.
- Force recreate DB container, giữ nguyên named volume: dữ liệu thử nghiệm vẫn đọc được.
- Dọn container/network/volume thuộc project QA đó và kiểm không còn tài nguyên mang project label. Không prune engine hoặc chạm tài nguyên project hiện có.

Script QA/trích xuất đặt trong thư mục tạm `/private/tmp`, không thêm code capstone. Secret QA chỉ là chuỗi giả dùng cho dữ liệu dùng một lần.

## Giới hạn phải nói rõ

**Chưa build Dockerfile Java, chưa chạy app image, chưa chạy Redis và chưa kiểm app → DB/Redis end-to-end.** Maven/Temurin/Redis không có sẵn trong cache lúc rà; không tải/build thêm để giả lập rằng capstone đã hoàn thành. Dockerfile được rà instruction, context, đường dẫn JAR và Java version theo POM, không thay cho build/runtime verification.

Shopcore hiện chưa có JPA/PostgreSQL driver/Redis dependencies, code integration hoặc health endpoint tương ứng. Env và Compose không bổ sung chúng. Dữ liệu giữ qua recreate không chứng minh backup/restore hay production durability.

Redis không ACL/password và PostgreSQL demo user là superuser: chỉ phù hợp topology local đã nêu, không phải baseline production. File secrets local không tự mã hóa; cần quyền host và quyền đọc của runtime user. Chưa xác minh secret mount với Java non-root vì chưa chạy app.

## Nguồn và bước học

Các lesson đặt link tài liệu official Docker, PostgreSQL/Redis images và Spring Boot ngay trong bài. Video là từ khóa tìm kiếm, không giả là đã xem/xác minh video cụ thể. Không yêu cầu Kubernetes, AWS deployment, CI registry hay Redis business caching trong module này.

Kiểm Markdown bao gồm liên kết nội bộ, fence, số câu/chỗ trả lời và tổng rubric. Đọc từ [Lesson 01](LESSON_01_IMAGE_CONTAINER_LIFECYCLE.md), sau đó làm đề tương ứng; cần hoàn thành kiến thức theo thứ tự, không nhảy thẳng vào YAML mẫu cuối.
