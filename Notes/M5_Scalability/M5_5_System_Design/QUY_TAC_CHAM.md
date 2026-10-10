# Chấm M5-5 chặt và có căn cứ

Mỗi lesson 8×5=40, normalize điểm thô/40×100, đạt từ34/40. Năm ý công khai mỗi câu là năm tiêu chí độc lập: đúng rõ1, đúng hướng thiếu điều kiện0,5, sai/thiếu0. Không cap ngầm, không ép nguyên văn hay tên vendor nếu concept đúng; không cho điểm chỉ vì liệt kê “LB, Redis, replica” không giải thích luồng/trade-off.

Chấp nhận nhiều thiết kế nếu khớp workload/freshness/constraints và giải thích được. “Giữ đơn giản, tối ưu query trước” có thể là đáp án tốt hơn thêm mọi thành phần. Không bắt triển khai AWS hoặc đủ tech trong sơ đồ để được điểm tư duy.

Chấm đúng tiêu chí, không trừ hai lần một lỗi. Các hiểu nhầm như local Map tự shared, readOnly tự route replica, replica là backup, cache mọi GET an toàn, hoặc thêm replicas chắc tuyến tính mất điểm ở ý tương ứng; không tự đặt trần điểm toàn bài.

Nếu đề giả định async, trả lời sync có guarantee khác phải nêu thay assumption và trade-off, không bỏ qua tình huống stale của đề. Nếu chưa đo source, nói Unknown là đúng; bịa benchmark để chắc chắn không được điểm evidence.

Khi chấm thật: đọc bản đã lưu mới nhất, nhận xét từng câu “được gì / thiếu-sai gì / điểm từng ý / đáp án đủ / ôn gì”; tạo snapshot `Exams/nhan-xet/` theo `03_PROMPT_CHAM_DE.md`. Chấm thử phần đã làm thì báo cả denominator phần đã làm, không coi câu trắng là đã sai concept. Không tự công nhận deliverable/template đã merge hay module hoàn tất từ QA của AI.
