# Kiểm chất lượng M4-2 · 2026-10-07

## Bám roadmap và cách học

Bốn lesson cho 12h roadmap. Có on/jobs/steps, cache Maven, test trên PR, build/push GHCR và badge. Dạy thêm đúng mức để tránh hiểu sai: gate needs/if, filesystem runner, permissions, report, registry auth và required checks. Không mở rộng sang CD AWS, TDD/JaCoCo hay Kubernetes.

| Lesson | Đã rà kiến thức và đề tương ứng |
|---|---|
| 01 | Workflow ở repo root; event/base branch; PR merge ref; runner khác local; run/uses paths; needs không truyền file; fork trust |
| 02 | Verify chạy goals đã cấu hình; Surefire/no-tests/skip; contextLoads scope; cache không bỏ test; report khi fail; DB host tùy vị trí Java |
| 03 | Publish success gate + main event; PR chưa Docker build trong mẫu; permissions job; context/path; SHA tag vs digest; cache mount giới hạn; push chưa deploy |
| 04 | Không run/skipped/fail khác nhau; logs giả định được ghi rõ; rerun/SHA; badge filename/scope; required checks/bypass; pin SHA và input safety |

Bốn đề PHONG_VAN theo lesson, mỗi đề 8 tình huống × 5đ = 40đ, đạt 34/40. Có bốn bài giải/rubric độc lập. Không dùng nhãn DAY_DU cho bộ đề lesson này. Rà câu hỏi khớp rubric, không trừ phần chưa được hỏi hoặc chưa dạy; không bắt thuộc syntax/action version.

## Kiểm chứng đã thực hiện

- Đọc roadmap, tiến độ, prompt tạo đề, format M4-1 và POM/test/wrapper thật của shopcore; không suy diễn capstone đã có Dockerfile/JPA/tests đầy đủ.
- Đối chiếu tài liệu official GitHub, Maven và Docker. Xác minh metadata/README các action majors được dùng: checkout v6, setup-java v6, upload-artifact v6, setup-buildx v4, login v4, build-push v7. Không gọi đây là pinned immutable versions hoặc cam kết luôn latest.
- Tải actionlint 1.7.7 từ release official vào thư mục tạm và kiểm SHA256 archive theo checksum của publisher trước khi chạy; không cài công cụ vào hệ thống.
- Trích ba workflow đầy đủ từ lesson 1–3 vào thư mục tạm; **cả ba qua actionlint**. Không lint block step setup-java riêng lẻ như một workflow hoàn chỉnh.
- Parse YAML bản đầy đủ và kiểm statically: verify working-directory shopcore; command verify không skip/continue-on-error; publish needs verify và chỉ push main; packages write chỉ job publish; context/file đúng layout.
- Diễn tập mô hình điều kiện cho PR/main và verify success/failure/skipped: chỉ push main + success đủ điều kiện chạy publish. Đây là kiểm mô hình dựa trên YAML, không giả lập đầy đủ scheduler GitHub.
- Rà liên kết Markdown nội bộ, fence, 32 câu/chỗ trả lời, 32 hàng rubric tổng 5đ mỗi hàng.

## Không được suy ra từ các kiểm tra trên

**Chưa chạy workflow trên GitHub, chưa chạy Maven của capstone trong QA này, chưa build/push image thật và chưa cấu hình branch ruleset.** Không kết luận remote run thành công từ actionlint. ShellCheck/Pyflakes không được chạy trong lượt lint; lint YAML không kiểm mọi hành vi scripts/actions/network.

Dockerfile M4-1 vẫn là mẫu trong bài; repo/package access và org policies phải xác minh khi thực hành. Current contextLoads chỉ kiểm Spring context, không thay test business. Rebuild image từ source không chứng minh binary giống từng byte với JAR đã test; mutable actions/dependencies/base tags cần policy cập nhật và pin khi hardening.

Mẫu chủ ý chưa build Docker image trên PR, chưa smoke-test container, chưa enforce coverage, chưa deploy và chưa dùng AWS credentials. Có nêu cách nhận diện bước nâng cấp, không nhận là đã làm. Không thực thi code fork với secrets để làm mẫu “chạy được”.

## Trạng thái tài liệu

Soạn sẵn không đổi `01_LO_TRINH.md`, `05_TIEN_DO.md`, POM/source capstone hay quyền GitHub. Bộ file được copy theo cơ chế hiện hành sang Documents Vault; nguồn vẫn là repo học. Video trong bài chỉ là từ khóa tìm kiếm, không giả là video đã kiểm chứng.

Bắt đầu từ [Lesson 01](LESSON_01_WORKFLOW_RUNNER_EVENTS.md), làm đề ngay sau bài tương ứng. Muốn đánh giá thực hành sau này phải có run URL/SHA, command/test counts, publication tag/digest và bằng chứng ruleset nếu khai báo đã cấu hình.
