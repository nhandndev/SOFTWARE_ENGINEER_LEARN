# Đáp án M4-3 · Lesson04

8×5=40đ, đạt34/40. [Quy tắc](../../Notes/M4_DevOps_Engineering/M4_3_TDD_Coverage/QUY_TAC_CHAM.md). Không bắt học thuộc workflow YAML.

| Câu | Rubric /5 |
|---|---|
| 1 | A coverage fail/publish chặn (1); B tests fail/publish chặn (1); C verify pass/publish eligible (1); điều kiện đúng push+needs (1); A cô lập coverage gate khác test gate (1) |
| 2 | Clean tránh stale (1); missing file bị gate fail (1); skip không là tests pass (1); file không thay threshold check (1); report cũ không bằng chứng run mới (1) |
| 3 | Verify không tự cấu hình IT (1); failIfNoTests/test reports (1); Failsafe/includes đúng convention (1); bind integration-test và verify (1); verify kết luận failure/cleanup lifecycle (1) |
| 4 | Always upload chỉ giữ bằng chứng (1); verify fail giữ nguyên, không continue-on-error (1); không cache exec (1); artifact paths shopcore/target/... (1); uses paths từ workspace không defaults run (1) |
| 5 | Needs verify và success (1); chỉ push main, không PR publish (1); đúng SHA/check không badge cũ (1); badge không enforce gate (1); publish không AWS deploy (1) |
| 6 | Không chứng minh phí đúng/excludes giấu gap (1); assert giá trị fee theo contract (1); biên/sad path hữu ích (1); manual fault-check làm test đỏ (1); PIT optional không bắt (1) |
| 7 | Nhận diện dependency không deterministic/shared state (1); Clock/seed (1); provider stub+DB cô lập (1); sleep/rerun không fix root cause (1); Java coverage không AI output quality (1) |
| 8 | Chưa đủ deliverable (1); contract+red/green/refactor bằng chứng (1); source/tests assertions (1); metric/scope và CI pass/fail âm (1); không tự đánh dấu thực hành xong/pass module (1) |

## Câu 1

A fail coverage dù test xanh, publish bị chặn. B fail assertion dù80, publish chặn. C verify pass và publish có thể chạy khi needs success/event/quyền/setup đúng, không bảo đảm push chắc thành công. A là phép kiểm coverage gate riêng: chỉ thử assertion fail mới chứng minh test gate.

Ôn Lesson04 mục1,4.

## Câu 2

Clean loại exec/report cũ. Skip không chứng minh tests pass; mất agent có thể làm JaCoCo skip, file guards sau Maven chặn run không tạo data. Có file chưa biết≥70 nên vẫn phải check metric/threshold. Reuse report cũ che việc commit mới chưa chạy đúng coverage.

Ôn mục2,4. Không khẳng định skipTests luôn làm Surefire failIfNoTests phát hiện.

## Câu 3

Verify chỉ chạy goals đã bind. Đọc reports/test count, failIfNoTests cho suite phù hợp. Muốn *IT chạy thì cấu hình Failsafe/includes và bind integration-test cùng verify; tới verify để kiểm kết quả, không chỉ dừng ở integration-test. Nếu chưa có IT, chưa bật plugin rồi skip để xanh.

Ôn mục3. FailIfNoTests ở Surefire không tự kiểm một IT suite chưa cấu hình.

## Câu 4

Always upload thử giữ reports dù verify fail, không thay verify success. Không continue-on-error verify và không cache exec. Artifact uses paths từ workspace: shopcore/target/surefire-reports, failsafe-reports khi có, site/jacoco; defaults run working-directory không áp uses. Nếu compile fail chưa có reports là bình thường.

Ôn mục1–2. Không cần nhớ retention days để lấy điểm.

## Câu 5

Publish phải needs verify và chạy sau success; giới hạn push main, không PR không tin cậy. Kiểm đúng SHA/run và required check, badge ở commit/branch khác không enforce gì. Push image lên registry chưa deploy AWS. Event gating không thay registry permission/setup.

Ôn mục1–2 và M4-2.

## Câu 6

Nonnull không phát hiện sai tiền, getter/excludes làm đẹp số mà bỏ rule. Assert250000→30000,500000→0, biên/invalid. Trên bản tạm đổi fee thành1 hoặc >= thành>, test liên quan phải fail; phục hồi và chạy suite. Đây là fault-check nhỏ, PIT optional ngoài yêu cầu bắt buộc.

Ôn mục5. Không ép thêm công cụ để đủ điểm.

## Câu 7

Giờ/ngẫu nhiên/provider/data chung tạo biến động ngoài source. Dùng Clock fixed/seed/case cố định, fixture/HTTP stub, DB test cô lập và cleanup. Sleep/rerun tới xanh không tìm nguyên nhân, có thể giấu bug. Coverage Java chỉ execution paths, không đo chất lượng model AI; phần đó cần eval riêng.

Ôn mục6. Không yêu cầu thiết kế toàn AI eval framework.

## Câu 8

Chưa đủ. Cần contract và tests/oracle; evidence test-first red đúng behavior→green→refactor; source/test thực; POM metric/scope/threshold; report/run đúng SHA; CI pass đúng case và fail khi assertions/coverage thiếu ngưỡng/no data theo policy. Đề đạt chỉ xác nhận kiến thức, không bịa deliverable/merge hoặc tự tick hoàn thành.

Ôn mục7 và README. Không bắt người đang học concept phải làm remote CI ngay để được điểm câu kế hoạch.
