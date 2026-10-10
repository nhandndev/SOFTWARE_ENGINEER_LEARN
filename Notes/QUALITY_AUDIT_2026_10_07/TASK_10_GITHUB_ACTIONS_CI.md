# Task 10: GitHub Actions CI

Đã đọc 4 lesson và đủ 32 câu/đáp án/rubric. Đối chiếu riêng trigger, build/test gate và publish gate.

| Lesson | Coverage câu 1–8 |
|---|---|
| 01 | Workflow/events; runner; PR SHA; checkout/setup; layout; jobs/files; permissions; luồng pipeline |
| 02 | Maven phases; test thực sự chạy; cache; DB service; contextLoads; reports/artifacts; failure; điều kiện gate |
| 03 | Build/push; GHCR login; permissions; PR safety; tag/digest; context/path; concurrency; publish≠deploy |
| 04 | Debug; rerun/SHA; cache/artifact; skipped/failed jobs; required checks; badge; branch protection; kế hoạch kiểm |

## Kết quả nội dung

Không phát hiện lỗi bắt buộc sửa trong phạm vi đã kiểm. Ví dụ phân biệt repo root với thư mục shopcore lồng: working-directory của run không tự áp cho uses/context/cache paths. needs không chuyển file giữa runner; Maven verify chỉ chạy plugin đã cấu hình; zero test không là kiểm chứng tốt. Cache dependencies không chứng minh test pass. PR không nhận secrets/push image tùy tiện, không dùng pull_request_target chạy code không tin cậy. Pipeline hiện tại không hứa build Docker trên PR nếu chỉ Maven gate.

GHCR push không là AWS deploy. SHA tag vẫn mutable, digest mới nhận diện nội dung cụ thể. Concurrency không bảo đảm FIFO. Badge xanh ở branch/SHA khác không thay required check đúng commit. Retry/rerun workflow cũ không tự chuyển sang code mới. Không dạy Kubernetes/CD trước roadmap.

## Đã kiểm bằng công cụ

17 file Markdown, 32 câu và rubric; 3 workflow hoàn chỉnh qua actionlint1.7.7, checksum binary đã đối chiếu. Sáu tổ hợp gate được kiểm bằng mô hình tĩnh. ShellCheck/Pyflakes không chạy. Không coi mô hình gate là runner GitHub thật.

**Chưa kiểm:** push lên repository/PR thật, publish package GHCR, fork permission trên GitHub, required rules/badge remote. Không có credential cho các phép kiểm này và không tạo hoạt động remote thay người học.

Nguồn: [Workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax), [Java with Maven](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-java-with-maven), [Publishing Docker images](https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-docker-images).

Kết luận: đạt kiểm nội dung và lint workflow, còn CI end-to-end đúng repository của học viên khi triển khai. Không đổi trạng thái module vì chất lượng bài học không phải năng lực đã kiểm của học viên.
