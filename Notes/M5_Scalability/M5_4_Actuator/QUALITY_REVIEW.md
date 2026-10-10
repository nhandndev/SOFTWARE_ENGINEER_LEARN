# Kiểm chất lượng M5-4 · 2026-10-07

## Task 1 · Scope và điều kiện học

Đối chiếu Module 5-4 trong `01_LO_TRINH.md`: health/metrics/info, exposure, custom indicator, Counter/Timer, logging/MDC đều có mapping trong LESSON_PLAN. Hai lesson / 8h, không kéo thành Kubernetes hoặc full Prometheus/Grafana. Code mẫu không tự thêm feature upload vào source: upload chỉ là tình huống local để hiểu indicator. Trạng thái vẫn Chưa bắt đầu, capstone không tự hoàn thành.

## Task 2 · Lesson 01

Rà riêng luồng framework vs Product, access/exposure/auth, hai security chain, health details và probes. Mẫu chỉ public status health; metrics/info yêu cầu OPS, có fallback bảo vệ app. Contributor không chứa exception/path nhạy cảm. Không coi filesystem writable là bảo đảm ghi được; không gọi provider tính tiền, không coi slow warning là timeout. Không đưa shared dependency vào liveness mặc định.

## Task 3 · Lesson 02

Rà riêng boundary đồng bộ, finally ghi cả lỗi mà không nuốt exception, attempts vs completions, null/fallback semantics, async caveat. COUNT/TOTAL_TIME/mean/unit không bị gọi nhầm p95. ID/hash/raw prompt không trở thành tag. Metrics endpoint không được mô tả như kho lịch sử hoặc production scrape backend; HTTP instrumentation khác vùng Service.

## Task 4 · Đề và rubric

Hai đề PHONG_VAN, mỗi đề 8 tình huống × 5. Mỗi câu nêu năm ý chấm, bài giải có đúng năm tiêu chí cộng 5, đủ chỗ trả lời. Tất cả 16 câu đối chiếu với lesson tương ứng; không bắt code async, Grafana/Kubernetes hoặc thuộc import. Chấp nhận ý tương đương; 0/0,5/1 theo ý, không cap ẩn. Các lời giải không tự được xem là bài người học.

## Task 5 · Kiểm tự động và runtime

Script cấu trúc: 11 Markdown files, 16 câu, 16 rubric, 21 local links (tính cả index Chặng 5 hiện tại), không lỗi. Bốn fault probes cho checker bắt được sai tổng rubric, link mất, fence lẻ và sai số câu. Script chỉ kiểm cấu trúc, không chứng minh chất lượng sư phạm.

Runtime: **13 tests, 0 failures, 0 errors, 0 skipped** ở lượt cuối sau khôi phục. Java 21 + Boot 4.1.1, embedded Tomcat localhost port ngẫu nhiên, Maven/JUnit. Trích nguyên bốn class và YAML có marker từ lesson vào fixture tạm, không sửa POM/source shopcore. QA thêm user OPS/USER và một controller lookup riêng chỉ để test; đó không phải feature hoặc bài nộp của người học.

| Nhóm | Assertion thực chạy |
|---|---|
| Security | Anonymous metrics 401; USER 403; OPS 200; info protected + contributor present; fallback app 401 |
| Exposure | OPS vẫn nhận 404 khi gọi env/heapdump không được expose/access |
| Health | Anonymous thấy status không components; thư mục mất khiến root/readiness 503; liveness 200; khôi phục thư mục readiness 200; không lộ absolute path |
| Custom metrics | Success/error ghi đúng count; giữ nguyên exception; in-flight tăng attempts trước completion |
| HTTP/binding | page=abc trả 400 và không vào helper; HTTP Timer hiện sau request hoàn tất |
| Endpoint data | Metric trả seconds, COUNT khớp registry, tags custom chỉ outcome hữu hạn |

Fault probe runtime cố ý thay `hasRole("OPS")` thành `permitAll()` trong bản tạm: test `anonymousMetricsDenied` fail đúng assertion **expected 401, actual 200**, không phải fail do compile/startup. Sau đó trích lại bản gốc và chạy toàn suite để xác nhận khôi phục.

### Tái chạy QA, không cần sửa shopcore

Máy cần Node, Maven và JDK 21. Từ root repo:

```bash
export M54_QA_DIR="$(mktemp -d)"
node Notes/M5_Scalability/M5_4_Actuator/qa/prepare-runtime.mjs
cd "$M54_QA_DIR"
mvn test
```

Fixture sinh POM/source dưới thư mục tạm đã chỉ định. Không dùng đường dẫn project học làm M54_QA_DIR. Khi chạy cần được phép tải Maven dependencies và mở localhost. Mặc định script dùng thư mục `m54-actuator-qa` trong OS temp; có thể đặt M54_FAULT=public-metrics **chỉ cho QA negative test**, không phải mode để học cách deploy.

Giới hạn: không benchmark, không test mạng production/TLS/firewall, không Kubernetes, không Prometheus exporter, không DB/provider thật. QA dùng test users thay default generated user để kiểm hai role; không kiểm integration JWT của shopcore. Không tuyên bố đã chứng minh mọi workload an toàn hoặc sinh percentile từ dữ liệu thực.

## Task 6 · Đồng bộ và bảo toàn

Snapshot đối chiếu: **28 file được bảo vệ không đổi**, gồm AGENTS, roadmap và source/POM shopcore. `05_TIEN_DO.md` so với bản trước chỉ khác đúng nhãn tài liệu M5-4; trạng thái, điểm, ngày, log không đổi.

Đã đồng bộ chọn lọc **14 file** gồm bộ module/QA, bốn file đề/giải, index Chặng 5 và tiến độ sang `/Users/lilnhan/Documents/Learning_Vault/Software_Engineer`. Kiểm SHA-256 nguồn/đích giống nhau. Bản cũ khác nội dung được sao lưu trong `.sync-backups/m54-1791390656247` dưới folder Software_Engineer của Vault; không ghi đè AWS/AI notes. Đồng bộ lần này không đồng nghĩa LaunchAgent đã được kích hoạt; cơ chế auto-sync hiện hành không bị thay đổi.

## Task 7 · Rà lại theo yêu cầu lặp M5-4

Đọc lại roadmap, README, cả hai đề và các mục bài học tương ứng; giữ bộ đã có thay vì tạo bản trùng hoặc ghi đè câu trả lời. Bài/đề vẫn khớp scope 8h: endpoint/access/exposure/security, health/info/custom indicator, Counter/Timer và MDC. Không phát hiện thiếu checklist cần mở lesson mới.

Trích lại code/YAML hiện tại vào fixture `/private/tmp/m54-actuator-review`, chạy Maven bằng JDK 21/Boot 4.1.1: **13 tests, 0 failures, 0 errors, 0 skipped**. Checker cùng bốn fault probes chạy lại đạt. So sánh 12 file module/đề/giải với Vault trước cập nhật báo cáo: giống byte; báo cáo mới được đồng bộ riêng. Lần rà này không sửa lesson/đề, source shopcore hoặc tiến độ; các số đo không phải benchmark production.

## Task 8 · Kiểm và bổ sung ngày 2026-10-08

Đối chiếu lại checklist roadmap 8h, đọc riêng hai cặp đề/bài giải và các mục lesson tương ứng. Giữ hai lesson, 16 câu tình huống, ngưỡng 34/40 mỗi đề; không thêm yêu cầu Grafana/Kubernetes hoặc mở rộng thành module tracing. Không tạo đề trùng, không sửa phần trả lời của người học.

- Lesson 01 bổ sung bảng chẩn đoán 401/403/404/503 theo đúng policy lab; tách endpoint không được đưa ra với meter chưa tồn tại. Giải thích DOWN là kết quả health, không bắt buộc AppException; Actuator không tự restart JVM.
- Lesson 02 bổ sung trace hai request lỗi: binding 400 trước helper và AppException sau khi vào helper. Theo từng bước Counter/Timer, giải thích vì sao advice quyết định HTTP status còn helper chỉ phân loại normal return/exception.
- Checker bổ sung kiểm năm ý công khai mỗi câu và năm tiêu chí 1 điểm mỗi rubric, tính số câu thực thay vì ghi cứng. Self-test kiểm baseline hợp lệ trước thử lỗi; sáu fault probes đạt, gồm rubric sai cấu trúc dù tổng điểm vẫn đúng và thiếu ý trong đề.

Kết quả cấu trúc: **11 file Markdown, 16 câu, 16 rubric, 21 local links, không lỗi**. Đây không thay thế việc đọc nội dung thủ công ở trên.

Trích nguyên bốn class Java và YAML từ lesson vào `/private/tmp/m54-review-20261008-final`. Lượt đầu compile được nhưng sandbox chặn socket Tomcat (`Operation not permitted`), chưa phải kết quả test nghiệp vụ. Sau khi cho phép localhost, chạy Maven offline bằng JDK 21/Boot 4.1.1: **13 tests, 0 failures, 0 errors, 0 skipped**. Context test đã đóng sau chạy. Không chạy lại runtime fault injection ở lượt này; kết quả fault injection ở Task 5 là lịch sử, không phải phép thử mới.

Không sửa source/POM shopcore, bốn file đề/bài giải, roadmap hoặc tiến độ. Không xác nhận người học pass, không tick deliverable. Các giới hạn production/TLS/JWT/backend metrics đã nêu ở Task 5 vẫn áp dụng.
