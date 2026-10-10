# Kiểm chất lượng M7-3 · 2026-10-08

## Task 1 · Roadmap/context

Đọc AGENTS,01,02,05, AI context của Vault và format lesson/exam gần nhất. Đúng8h/2buổi,10 chuyện≥3shopcore, nói1–2 phút, không script thuộc lòng. Định hướng Backend Java→AI Engineer nhưng chưa invent kinh nghiệm production/AI project. Hoãn capstone không được biến thành hoàn thành deliverable; không tạo project mới hoặc sửa source.

## Task 2 · Lesson01 độc lập

Đủ STAR và phân biệt Task/bối cảnh, Action/tool list, Result/reflection; before/after có đủ lời kể và bóc tách. Có personal contribution/AI credit, quantified result/40% đúng phép tính, local vs production, estimate/observed/planned/unknown, scope evidence. Ví dụ tự soạn đều label giả định. Snapshot project cũ chỉ là historical observation, chưa chứng minh ai thực hiện hoặc đúng repo shopcore.

Tám câu phủ phân tích STAR, rewrite theo facts, tool list, metrics, failure outcome, credit, artifact và inventory. Mỗi câu có5 ý hỏi công khai và5 tiêu chí; bài giải không bắt autobiography mẫu hoặc metric business.

## Task 3 · Lesson02 độc lập

Conflict có nghe/alternatives/quyền hạn/escalation và pending outcome; failure không bị sửa thành thắng lợi; leadership không title, ownership không hero im lặng. Có follow-up/uncertainty, bảo mật, hypothetical khác past experience, bullets/mock/timer, giới hạn written delivery. Không chấm accent/prestige, không hứa đỗ hoặc giả đã xem video.

Tám câu phủ4 competencies, concise delivery plan, follow-up, story bank/privacy và mock. Facts các câu được cho đủ để reasoning; câu8 có lựa chọn case giả định nếu chưa có chuyện thật, không ép bịa. Kết quả luyện giả định không tính chuyện thật cho deliverable.

## Task 4 · Story bank/rubric

10 slots có ID, registry và reusable card đầy đủ S/T/A/R, credit, metric metadata, evidence, gaps, status và bản nói. Ban đầu0 verified/0shopcore;3 slot đầu là candidates, không auto counted. Một event nhiều tags/versions chỉ tính một; mini-project khác không tự rename shopcore. Không điền docs/behavioral-star.md thay học viên.

Chấm theo năm tiêu chí1/0,5/0, normalize trên40; đạt34. Không cap ngầm hoặc trừ toàn bài vì một lỗi; unknown cần hỏi, không kết tội bịa vì không có public artifact. Điểm nội dung khác delivery/deliverable, không tự cập nhật checklist/điểm.

## Task 5 · Nguồn tham khảo

Đã mở Amazon Jobs Interview Loop và Harvard MCS Interviewing. Amazon có tài nguyên behavioral/STAR và link video chính thức. Harvard nhấn trải nghiệm cụ thể/cá nhân, có thể từ trường/hoạt động và luyện thay memorization. Phân bổ giây/mock/rubric ở module là đề xuất tự soạn, không gán thành rubric tuyển dụng của các nguồn. Video Harvard chỉ search keywords, không giả đã verify/watch.

## Task 6 · Kiểm tự động và bảo toàn

Lệnh tái chạy từ root:

```bash
node Notes/M7_Career_Interview/M7_3_Behavioral_STAR/qa/verify.mjs --self-test
```

Checker kiểm file/link/anchor/fence,2lesson,16câu/16rubric,5ý/5criteria mỗi câu,10storyIDs. Fault probes kiểm checker có phát hiện dữ liệu cấu trúc bị phá. Không dùng checker để tự chấm truthfulness, chất lượng nói, thành tích hoặc dự báo tuyển dụng. Không có code Java cần compile cho module này.

Kết quả nguồn: **11 Markdown,2lesson,16câu,16rubric,29local links,10story slots;0lỗi**. Sáu fault probes phát hiện link hỏng, fence lệch, criterion sai điểm, thiếu ý hỏi, trùng số câu và trùng storyID. Đã sửa checker để không nhầm LESSON_PLAN là lesson học; probes chỉ chạy sau baseline sạch, tránh PASS từ lỗi nền.

Đối chiếu từng câu với lesson và năm ý/rubric: không thêm requirement trải nghiệm production/metric/thuộc lòng/script; câu giả định không được dùng làm personal deliverable. Rà các con số:200→120 là giảm40%;1–2phút là mục tiêu roadmap, không thời lượng đã đo;0verified trong template không phải10stories đã hoàn thành.

So hash28 protected files:27file source/project/roadmap không đổi;05 chỉ thêm nhãn tài liệu M7-3, không đổi con trỏ/trạng thái/điểm/ngày/log. Không tạo bài nộp, snapshot chấm hoặc docs capstone giả.

Đồng bộ chọn lọc module,4file đề/giải,index M7 và05 sang Vault Documents; backup đích khác và so SHA-256 từng file sau copy. Chạy lại checker trên bản Vault để kiểm relative links. Không chạm AWS/AI notes hoặc cơ chế sync. Đây là kiểm tài liệu, không bằng chứng người học đã kể10chuyện thật hoặc đạt phỏng vấn.
