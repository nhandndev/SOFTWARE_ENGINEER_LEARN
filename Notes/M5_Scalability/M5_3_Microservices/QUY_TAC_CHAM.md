# Quy tắc chấm M5-3

## Điểm và cách đọc câu trả lời

Mỗi đề 8 × 5 = 40 điểm, đạt từ 34/40. Normalize = điểm thô / 40 × 100. Rubric từng câu có 5 cụm ý độc lập; ý một phần có thể cho 0,5 khi lập luận có cơ sở. Không đánh rớt toàn câu/đề chỉ vì một ý sai, không đặt hidden cap ngoài đề.

Đọc ý nghĩa toàn câu, chấp nhận lời/sơ đồ/pseudocode và thuật ngữ diễn đạt khác. Không trừ chính tả/cú pháp nhỏ nếu ý rõ. Từ khóa đúng nhưng kết luận ngược (ví dụ timeout chắc chắn remote chưa commit) không được điểm ý đó.

## Gắt ở điều gì?

Boundary/ownership phải nhất quán; local transaction không tự rollback remote effect; số process/repo không chứng minh độc lập deploy; quyết định tách cần evidence và consequences. Không thưởng điểm tối đa cho “microservices tốt hơn” hoặc “luôn monolith” không có context.

ADR phải tách fact/assumption, options, decision/reason, mặt trái và trigger review. Không ghi Accepted/đã benchmark/đã modular/đã merge nếu không có bằng chứng. Trigger là review có owner/data, không ngưỡng thần kỳ tự tách.

## Chấp nhận phương án khác

Có thể giữ monolith, modularize hoặc tách một capability nếu assumptions/constraints/reasoning phù hợp và thừa nhận chi phí. Không ép chọn cùng phương án mẫu. Không bắt service mesh/saga code, nhiều repo/project hoặc deploy AWS khi đề chỉ hỏi design.

Không bắt thuộc mọi pattern/resilience term để đủ điểm nếu giải thích đúng cơ chế được hỏi. Rubric chỉ chấm ý đề đã yêu cầu; không thêm production checklist vô hạn sau khi học viên trả lời.

## Khi chấm thật

Theo AGENTS: tạo snapshot trong Exams/nhan-xet cho mỗi lần chấm, ghi từng câu điểm/ý đúng/thiếu hoặc sai/đáp án sửa/mục ôn. Phần chưa làm không được gọi đã đạt toàn đề. Khi chuẩn bị tài liệu/ADR mẫu, không tự đánh dấu học viên pass hoặc deliverable xong.
