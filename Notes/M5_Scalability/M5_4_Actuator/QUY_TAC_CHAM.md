# Quy tắc chấm M5-4

## Chấm chặt bằng tiêu chí, không bằng cảm giác

- Mỗi đề có 8 câu × 5 = 40. Điểm phần trăm = điểm thô / 40 × 100; đạt từ 34/40 = 85%.
- Mỗi câu công khai năm ý, mỗi ý 1 điểm. Đúng rõ và đủ: 1; đúng hướng nhưng thiếu quan hệ/điều kiện: 0,5; thiếu hoặc khẳng định ngược: 0.
- Chấp nhận tiếng Việt đời thường, pseudocode, ví dụ tương đương. Không ép thuộc thứ tự tên class/import hoặc giống nguyên văn đáp án.
- Không cho điểm vì chỉ nhắc từ khóa: “security, safe, metrics” mà không giải thích quyền/phạm vi chưa đủ ý tương ứng.
- Không phạt trùng một lỗi ở nhiều tiêu chí nếu thực chất chỉ là một thiếu sót. Nêu rõ từng ý được/chưa được, không nói chung “thiếu sâu”.
- Không có trần điểm/cap ẩn. Hiểu nhầm nghiêm trọng như read-only = authorized, restart chữa shared DB, tag requestId là tốt, hoặc Counter là durable ledger bị 0 ở tiêu chí liên quan, không tự kéo toàn bài về 0.
- Nếu learner dùng stack khác Boot 4 nhưng diễn đạt đúng concept thì vẫn cho điểm tư duy; nhận xét import/config phiên bản riêng, không biến lỗi nhớ package thành sai toàn bộ thiết kế.
- Câu hỏi chỉ yêu cầu giải thích async/probes/percentile ở mức giới hạn đã dạy, không yêu cầu code triển khai ngoài scope.

## Khi chấm bài thật

Đọc bản file đã lưu mới nhất; chỉ chấm phần đã trả lời nếu người học yêu cầu chấm thử. Phân biệt điểm phần đã làm và tổng điểm, không coi câu trắng là câu đã sai concept. Tạo snapshot theo `03_PROMPT_CHAM_DE.md` trong `Exams/nhan-xet/`, không ghi đè lịch sử nhận xét.

Mỗi câu ghi: lời người học hiểu đúng → ý còn thiếu/sai → điểm từng ý → câu trả lời hoàn chỉnh → một việc ôn cụ thể. Không sửa đáp án của người học thành lời giải rồi chấm bản AI vừa sửa.

Tạo lesson/đề hoặc QA pass không làm thay trạng thái module/capstone. Chỉ cập nhật tiến độ theo quy trình chấm được cho phép; không suy deliverable đã merge từ việc đọc bài hay chạy fixture của AI.
