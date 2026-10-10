# M4-2 · GitHub Actions CI

> Bộ bài soạn sẵn theo yêu cầu. Không đổi tiến độ, không tạo repo/project mới, không tự kích hoạt workflow hoặc publish image của bạn.

**CI không phải một dấu tích xanh trang trí. Nó là một chuỗi kiểm tra tự động cho một phiên bản code cụ thể, trước khi cho phép xuất bản artifact.**

| Lesson | Học gì | Đề | Bài giải và rubric |
|---|---|---|---|
| 01 | [Event → workflow → runner → step](LESSON_01_WORKFLOW_RUNNER_EVENTS.md) | [Đề 1](../../../Exams/de-kiem-tra/M4-2-ci__2026-10-07__lesson1-lan1.md) | [Giải 1](../../../Exams/de-kiem-tra/M4-2-ci__2026-10-07__lesson1-lan1__DAPAN.md) |
| 02 | [Maven test gate, cache và reports](LESSON_02_MAVEN_TEST_CACHE_REPORTS.md) | [Đề 2](../../../Exams/de-kiem-tra/M4-2-ci__2026-10-07__lesson2-lan1.md) | [Giải 2](../../../Exams/de-kiem-tra/M4-2-ci__2026-10-07__lesson2-lan1__DAPAN.md) |
| 03 | [Build và push Docker image lên GHCR](LESSON_03_BUILD_PUSH_GHCR.md) | [Đề 3](../../../Exams/de-kiem-tra/M4-2-ci__2026-10-07__lesson3-lan1.md) | [Giải 3](../../../Exams/de-kiem-tra/M4-2-ci__2026-10-07__lesson3-lan1__DAPAN.md) |
| 04 | [Debug, badge và bảo vệ nhánh](LESSON_04_DEBUG_BADGE_BRANCH_RULES.md) | [Đề 4](../../../Exams/de-kiem-tra/M4-2-ci__2026-10-07__lesson4-lan1.md) | [Giải 4](../../../Exams/de-kiem-tra/M4-2-ci__2026-10-07__lesson4-lan1__DAPAN.md) |

## Cách học phù hợp với bạn

Bạn đã biết code Java và đang muốn hiểu luồng phía sau. Mỗi bài bắt đầu từ chuyện gì xảy ra sau một lần push/PR, rồi mới giải thích YAML. Được tra tài liệu, không cần thuộc tên mọi input của action.

Roadmap dành 12h: bốn buổi khoảng 3h. Mỗi đề là **PHONG_VAN theo lesson, 8 câu × 5đ = 40đ; đạt 34/40**, tổng 32 câu. Không phải đề DAY_DU tổng module. Điểm lesson không tự xác nhận deliverable.

## Điều kiện và giới hạn

- Source hiện ở `shopcore/` bên trong repo học. Các mẫu dùng layout này. Nếu sau này `shopcore` chính là gốc repo, bài có bảng đổi path; không tạo repo mới ở đây.
- POM hiện Java 21, Maven wrapper; có một test `contextLoads`. CI xanh với một test đó không chứng minh CRUD/transaction/security đã được test đầy đủ. M1-6 vẫn đang hoãn; TDD/JaCoCo thuộc M4-3.
- Dockerfile M4-1 hiện là mẫu Markdown, chưa phải file thật trong capstone. Job publish cần Dockerfile thực tế và quyền GHCR đúng trước khi chạy được.
- Chọn GHCR để học một registry trọn vẹn; không cần học đồng thời Docker Hub. Token dùng để push không phải secret runtime của app và không cần AWS key.
- CI build/test/publish **không deploy AWS**. CD học M6B-3; không thêm Kubernetes, matrix phức tạp hay tự host runner trong bài cơ bản.
- Action versions được đối chiếu nguồn official khi soạn; dùng major tags để dễ đọc, không tuyên bố chúng bất biến. Production nên pin full commit SHA đã xác minh và có policy nâng cấp.

Xem [coverage roadmap](LESSON_PLAN.md), [quy tắc chấm](QUY_TAC_CHAM.md) và [kiểm chất lượng](QUALITY_REVIEW.md).
