# Quy tắc chấm M4-4

## Điểm và cách hiểu

Mỗi đề PHONG_VAN theo lesson8×5=40đ. Quy đổi=điểm thô/40×100; từ34/40 đạt phần kiến thức lesson. Đây không tự động là trạng thái module hay deliverable. Không lấy việc đọc/chạy fixture của AI để cho người học pass.

Rubric mỗi câu có các ý cộng thành5đ. Chấm độc lập từng ý; đúng một phần được điểm phần đó, có thể0,5đ cho ý1đ còn thiếu điều kiện quan trọng. Không gắn trần toàn câu hoặc đánh0cả bài vì một lỗi khi đề chưa công bố quy tắc ấy. Không thêm tiêu chí giấu.

## Gắt về bản chất, không gắt câu chữ

- Chấp nhận tiếng Việt đời thường/pseudocode/thiết kế tương đương. Không cần thuộc import, số order, schema đầy đủ hoặc tên annotation nếu cơ chế đúng.
- Không chấp nhận “MDC tự theo mọi thread”, “JSON tự che secret”, “Advice bắt mọi filter error”, “đổi folder là Hexagonal”, “interface tự tạo instance”. Chỉ mất điểm đúng ý sai, không xóa điểm đúng khác.
- Severity có nhiều policy hợp lý: chấm lý do/tác động, không áp một mức tuyệt đối khi đề không quy định.
- Giải pháp khác sample được chấp nhận nếu giữ contract, ranh giới, lifecycle và nêu trade-off. Câu hỏi dự đoán sample vẫn phải trả lời sample trước.
- Không bắt viết code hoàn chỉnh cho đề phỏng vấn. Nếu người học đưa code thì xem cả ý nghĩa và hậu quả thực thi; không tự bỏ qua lỗi logic gây leak/sai rule.

## Mỗi lần chấm phải để lại bài học

Đọc bản đã lưu mới nhất. Tạo snapshot mới trong `Exams/nhan-xet/` theo quy trình dự án, giữ được các lần trước; mỗi câu ghi: đã nói đúng gì, sai/thiếu gì, điểm từng ý, câu trả lời tổng hợp đúng và mục lesson cần ôn. Không sửa bài làm thành đáp án rồi gọi đó là chấm.

Chỉ cập nhật tiến độ/checklist theo AGENTS và quy trình chấm, không rewrite roadmap. Deliverable hoãn thì ghi nhận thật, không tự nhận đã merge. Không tạo nhận xét/snapshot của người học lúc chỉ soạn sẵn đề.
