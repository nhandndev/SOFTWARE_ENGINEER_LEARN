# Đáp án M4-3 · Lesson03

8×5=40đ, đạt34/40. [Quy tắc](../../Notes/M4_DevOps_Engineering/M4_3_TDD_Coverage/QUY_TAC_CHAM.md).

| Câu | Rubric /5 |
|---|---|
| 1 | A70 pass (1); B66.67 fail (1); covered/tổng (1); LINE khác metric khác (1); BUNDLE rõ scope (1) |
| 2 | Line đã thực thi có thể partial (1); branch cần các nhánh (1); không assertion có thể sai vẫn pass (1); coverage không correctness (1); thêm boundary/assert giá trị (1) |
| 3 | Bundle70 đạt (1); không mỗi class70 (1); Service0 là gap rủi ro (1); thêm test behavior/error quan trọng (1); không giấu bằng excludes (1) |
| 4 | Agent→JVM→exec (1); report tạo báo cáo (1); check rule/exit fail (1); mvn test chưa tới verify (1); report-only không threshold gate (1) |
| 5 | Có thể mất data dù tests pass (1); argLine không nhận agent (1); fork0 không dùng JVM fork args như mẫu (1); late property+giữ JVM args khác (1); kiểm exec/log sau clean (1) |
| 6 | Không phải đã kiểm0%/đạt70 (2); debug agent/argLine/fork/skip (1); clean tránh stale (1); kiểm file exec/report không rỗng để fail (1) |
| 7 | Report/check scope lệch (1); giấu business chưa test (1); exclusions có lý do review (1); thống nhất report/check policy (1); test behavior hữu ích không hạ chuẩn (1) |
| 8 | Surefire/Failsafe reports khi có (1); exec mới (1); HTML/XML đúng metric/scope (1); check log/exit code (1); đúng SHA/run không stale/cache data (1) |

## Câu 1

A21/(21+9)=70%, pass bằng ngưỡng. B20/30≈66.67%, fail. LINE quy định counter; BUNDLE quy định tổng module, khác CLASS từng class hay BRANCH. Không làm tròn66.67 thành70.

Ôn Lesson03 mục2.

## Câu 2

Line có bytecode chạy chưa có nghĩa mọi nhánh trên dòng chạy. Branch kiểm true/false của if phù hợp; số coverage không biết expected fee. Test không assert có thể pass khi đổi output. Thêm assertion tiền từ contract và input biên/nhánh thiếu. Đây là hướng sửa được dạy và câu hỏi yêu cầu giải thích business, không cần viết test Java.

Ôn mục1–2. Không khẳng định branch100 kiểm mọi exception/input.

## Câu 3

700/1000=70% tổng bundle đạt gate này. Không bảo đảm từng Service/class70; Service0 vẫn là gap cần review theo rủi ro, bổ sung test rule/error/biên có oracle. Không exclude Service để “đạt” bằng đổi mẫu số.

Ôn mục2,5–6. Không tự fail toàn đề vì Service0 khi rubric hỏi bundle; nhận đúng kết luận gate và cảnh báo chất lượng riêng.

## Câu 4

Clean loại output cũ; initialize prepare-agent cấp JVM args; Surefire chạy JVM có agent, ghi exec; verify report tạo HTML/XML rồi check so LINE bundle với0.70, vi phạm làm Maven fail. Mvn test chưa verify, report-only không thực thi threshold check.

Ôn mục3–5. Không bắt mọi Maven phase ngoài trọng tâm.

## Câu 5

Có. ArgLine ghi đè chỉ Xmx không đưa JaCoCo agent vào JVM test. Fork0 không chạy JVM fork với args như thiết kế này. Giữ late property agent và nối JVM args cần thiết; dùng fork phù hợp rồi clean verify, kiểm logs/exec. Property rỗng không tự thu data.

Ôn mục4,6.

## Câu 6

Skip thiếu data không phải check đã tính0% và kết luận đạt. Điều tra prepare-agent, argLine/fork, skip flags, output path; dùng clean loại exec/report stale. CI kiểm exec/XML tồn tại không rỗng sau verify để thiếu data làm fail; vẫn cần check threshold khi data có.

Ôn mục3,6 và Lesson04 mục2. Kiểm tồn tại file không thay check coverage.

## Câu 7

HTML và check đang không cùng population; giấu Service còn làm số đẹp nhưng mất chứng cứ rủi ro. Excludes chỉ có lý do được review, dùng cùng policy report/check. Giữ business trong scope, thêm tests hữu ích và xem metric thực, không hạ threshold hay chỉ sửa report.

Ôn mục5–6. Không yêu cầu mọi getter generated phải có test.

## Câu 8

Đọc test reports để biết test count/fail/skip; exec mới của agent; HTML/XML cùng run để biết metric/scope; Maven check log/exit code để biết rule có áp dụng. So đúng SHA/run/config, clean không lấy exec/cache/HTML cũ vì chúng không chứng minh code mới đã được kiểm.

Ôn mục5–6. Failsafe chỉ cần đọc khi suite đó đã cấu hình, không bắt file luôn tồn tại.
