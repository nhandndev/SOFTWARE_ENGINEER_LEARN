# Bài giải M4-2 · Lesson 04

40đ; đạt 34/40. Chấm cách suy luận và kiểm chứng, không yêu cầu ghi nhớ giao diện GitHub từng nút.

| Câu | Rubric /5 |
|---|---|
| 1 | Không trigger khác execution fail (1); repo root/commit file (1); event/base/ref (1); disabled/policy/approval (1); skipped không pass tests (1) |
| 2 | a checkout/path/working-dir (1); b assertion/report/source (1); c auth/package access/policy (1); xem step đầu fail (1); không che lỗi/tăng toàn quyền (1) |
| 3 | Compile trước tests nên thiếu report được (1); context root cause/profile/DB (1); rerun xanh không loại flaky (1); không log secrets (1); report/log chọn lọc đúng run (1) |
| 4 | Rerun gắn event/SHA cũ không mặc định B (2); metadata run/event/ref/SHA (1); command/counts/result đúng run (1); PR merge vs main commit (1) |
| 5 | Dùng filename ci.yml (1); branch/event scope (1); không PR/test quality/deploy proof (2); private visibility/access (1) |
| 6 | Branch protection/ruleset required checks (2); verify không publish skipped PR (1); bypass/admin policy (1); path filter có thể pending check (1) |
| 7 | Least privilege job (1); SHA xác minh/review nâng cấp (1); input env/quote không shell injection (1); không target chạy fork có secrets (1); không prod DB/AWS keys vô cớ (1) |
| 8 | Cố ý fail PR chặn publish (1); fix đúng commit và test counts (1); main verify→push tag/digest thật (1); badge/rule kiểm thật (1); lint không remote/deploy proof, không new project/AWS cần thiết (1) |

## Câu 1

Không có run là vấn đề workflow discovery/trigger/policy trước execution; verify fail là run đã tới bước có lỗi. Kiểm workflow đã commit đúng repo-root .github/workflows, event/base/ref match, Actions disabled/approval theo policy. Skipped chỉ không chạy phần đó, không chứng minh test assertions pass.

**Ôn:** lesson 4 mục 1–2. Không sửa Java trước khi biết Maven có chạy không.

## Câu 2

Tìm step fail đầu tiên. (a) Kiểm checkout và file/working-directory. (b) Đọc tên test, assertion/stack trace/report rồi sửa logic/test phù hợp. (c) Kiểm login, package owner/access, token permission/org policy. SkipTests không sửa path/auth; write-all không sửa assertion. Sửa nguyên nhân, không phủ lỗi bằng status xanh.

**Ôn:** mục 2. Cách chẩn đoán tương đương được công nhận.

## Câu 3

Compile fail trước Surefire có thể chưa sinh XML, không tự suy ra action upload sai. Context fail đọc nguyên nhân gốc và config test/DB readiness/schema, không cấp production credentials. Rerun xanh có thể là flaky/network transient; cần ghi nhận và điều tra thay vì che lịch sử đỏ. Giữ logs/report cần thiết của đúng run, lọc secret/data nhạy cảm, không upload cả workspace.

**Ôn:** mục 3. Masking không phải bảo đảm tuyệt đối.

## Câu 4

Rerun mặc định của run A vẫn gắn event/ref/SHA của A; không tự kiểm B vì B mới được push. Kết luận B cần run của B. Ghi run ID/URL, event/ref/SHA, command/counts/results; PR thường merge ref với base, push main là commit main của event. Đọc metadata thay vì đoán theo branch hiện tại.

**Ôn:** mục 4. Không bắt thuộc toàn context API.

## Câu 5

Badge URL dùng filename ci.yml, không workflow display name. Query branch main/event push chọn ngữ cảnh badge; không xác minh PR mới, tests đầy đủ hoặc app deploy. Private repo có giới hạn người xem/quyền truy cập. Badge chỉ thông tin trạng thái có thể cập nhật/cache chậm, cần mở run cụ thể.

**Ôn:** mục 5. Thêm badge không tạo check hoặc merge rule.

## Câu 6

Thêm branch protection/ruleset yêu cầu status check verify trên branch đúng. Publish cố ý skipped PR nên không dùng làm gate PR của mẫu. Kiểm tên check thực tế, người có quyền bypass/admin và policy. Path-filter bỏ workflow có thể làm required check chờ, nên không thêm filters mù khi chưa kiểm interaction.

**Ôn:** mục 6. Không yêu cầu mọi repo cùng plan/GitHub UI giống nhau.

## Câu 7

Verify contents read, publish main packages write; pin action full SHA được đối chiếu official/review khi update, không bịa SHA. PR title/body là input không tin cậy: không nhúng trực tiếp vào shell, dùng env/quote và không thực thi như lệnh. Không chạy fork code trong pull_request_target quyền cao. Module này không cần AWS key hoặc DB production; config test phải cô lập.

**Ôn:** mục 7. “Official action nên write-all an toàn” sai.

## Câu 8

Trên capstone khi thực hành: PR với lỗi thử làm verify đỏ, không publish; sửa lỗi có run commit mới và counts đúng; main run verify pass rồi publish thành công, package có tag/digest tương ứng. Kiểm badge đúng scope và rule thực chặn PR đỏ nếu đã cấu hình. Lint YAML local không chứng minh auth/remote test/push/ruleset. Không cần deploy AWS hoặc tạo project mới trong phạm vi CI.

**Ôn:** mục 8. Không ghi nhận remote evidence chưa có.
