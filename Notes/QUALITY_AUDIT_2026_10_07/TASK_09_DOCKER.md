# Task 09: Docker

Đã đọc 4 lesson, 32 câu và toàn bộ bài giải/rubric; đối chiếu đủ năm checklist Docker trong roadmap.

| Lesson | Coverage câu 1–8 |
|---|---|
| 01 | Image/container; kernel/Desktop VM; exited/debug; stop/start/recreate; ports; localhost; data lifecycle; tag/digest/platform |
| 02 | Build context; multistage; artifact path; runtime USER/exec; cache; dockerignore; go-offline/skip tests; rebuild |
| 03 | Services; DNS/internal ports; host publish; volume; down/-v; health dependency; networks; chạy stack |
| 04 | Readiness; healthcheck; config interpolation; secrets/file; PostgreSQL init; rotation; env precedence; debug matrix |

## Sửa rubric

**P2, Lesson 02 câu 5 và 7:** đề hỏi cache layer/cache mount và ý nghĩa go-offline/skip tests nhưng rubric lấy điểm reproducibility/CI test gate ngoài yêu cầu. Chuyển điểm về cơ chế cache và skip không phải pass. Các lưu ý vận hành vẫn giữ, không tạo yêu cầu ngầm.

## Nội dung có điều kiện đã kiểm

Build thành công khác process chạy và HTTP ready. Docker Desktop Linux VM khác dùng trực tiếp kernel macOS. EXPOSE không publish; localhost trong container không chỉ DB khác. Volume không là backup; không dùng prune để chữa một app. depends_on health không liên tục giám sát/restart app khi DB hỏng. PostgreSQL secret env/init chỉ có tác dụng theo lifecycle phù hợp; đổi file password không tự rotate role trong volume cũ. Compose secret là file mount, không mặc định kho bí mật mã hóa. Không mang cấu trúc data volume PG16 sang PG18 mà bỏ kiểm release notes.

## Đã chạy thật

- Checker 17 file Markdown, 32 câu/rubric và trích Compose/Dockerfile.
- Compose QA cô lập: kiểm cấu hình/secrets/internal network; PostgreSQL16 healthy với password file; client container kết nối bằng DNS `db`, ghi/đọc; recreate DB vẫn giữ dữ liệu volume.
- Chỉ cleanup project/container/volume QA tạo ra, không đụng stack học viên.

**Chưa kiểm:** build toàn image Spring, Redis runtime, khởi động shopcore và gọi API qua host port. Kết quả PostgreSQL QA không được dùng để nói toàn stack app+DB+Redis đã pass.

Nguồn: [Multistage](https://docs.docker.com/build/building/multi-stage/), [Compose startup order](https://docs.docker.com/compose/how-tos/startup-order/), [Compose secrets](https://docs.docker.com/compose/how-tos/use-secrets/).

Kết luận: coverage đúng roadmap, sau sửa rubric đạt kiểm nội dung; Kubernetes/EKS và deploy AWS vẫn ngoài scope.
