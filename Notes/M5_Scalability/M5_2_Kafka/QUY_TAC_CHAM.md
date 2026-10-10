# Quy tắc chấm M5-2 · Gắt về bản chất, công bằng về diễn đạt

## Điểm

- Mỗi đề 8 tình huống, mỗi câu 5 điểm; rubric file bài giải có 5 ý độc lập, thường 1 điểm/ý.
- Thang 100 = điểm thô / 40 × 100. Đạt lesson từ 34/40 = 85%; không tự quy đạt một lesson thành đạt toàn module.
- Đúng ý nhưng chưa đầy đủ cho 0,5 điểm tại ý đó khi hợp lý; giải thích rõ điểm đã có, thiếu gì và đáp án đầy đủ. Không cho điểm chỉ vì dùng đúng từ khóa rồi kết luận sai.
- Không trừ lỗi chính tả/Việt-Anh/import/cú pháp nhỏ nếu câu cho phép lời/pseudocode và ý nghĩa rõ. Câu code/SQL thiết kế phải thể hiện được boundary và xử lý lỗi, không ép chép giống mẫu.

## Những nhầm lẫn phải sửa

Producer ack không phải notification success; offset không phải orderId; commit offset không phải DB commit; all không có nghĩa mọi replica mọi lúc. Cùng group là chia việc trong traditional group, không broadcast. Kafka idempotent producer không thay consumer dedup.

RAM Set/exists-check không chứng minh bền vững/race; marker và DB effect ở transaction khác không atomic. DB transaction không rollback email. DLT không phải business success. Bỏ future/catch rồi return không phải error handling đáng tin.

Sai một ý trừ đúng phần rubric liên quan, không tự đặt luật “sai câu này toàn đề tối đa 50” hoặc criteria chưa nêu trong đề. Nếu câu trả lời mâu thuẫn, chỉ rõ mâu thuẫn và hỏi xác nhận khi không thể hiểu chắc; không tự diễn giải theo hướng tốt nhất để cho điểm tối đa.

## Chấp nhận phương án khác

Idempotency dựa unique effect/business key hợp lý, transaction DB và conflict semantics rõ có thể thay processed_events. Manual ack/batch hoặc thiết kế khác vẫn có điểm khi timeline và điều kiện đúng; không bắt dùng mẫu nếu câu không yêu cầu đúng policy mẫu. Provider idempotency được chấp nhận cho external effect nhưng không giả provider nào cũng hỗ trợ.

Không yêu cầu code Streams, full EOS, production outbox/CDC, Kafka cluster hoặc benchmark khi đề chỉ hỏi nhận diện/design. Ví dụ hỏi expected result không bắt chạy máy.

## Khi chấm thật

Đọc bản đã lưu của học viên và hiểu ý toàn câu, không chỉ tìm từ. Chấm câu đã làm thì ghi tạm trên phần đã làm, không gọi cả module pass. Luôn snapshot `Exams/nhan-xet/` theo quy tắc dự án; mỗi câu có điểm, ý đúng, ý thiếu/sai, cách sửa và mục ôn. Chỉ đổi trạng thái/checklist sau bài được chấm và đủ điều kiện hiện hành, không từ AI QA.
