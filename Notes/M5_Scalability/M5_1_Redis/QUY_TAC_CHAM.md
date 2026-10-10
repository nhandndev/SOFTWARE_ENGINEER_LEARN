# Quy tắc chấm M5-1

Mỗi đề PHONG_VAN theo lesson8×5=40đ; quy đổi=điểm thô/40×100; từ34/40đạt kiến thức lesson. Không tự đổi trạng thái module/deliverable từ việc chuẩn bị tài liệu hoặc fixture của AI chạy đạt.

## Gắt đúng chỗ

- Chấm từng ý rubric cộng thành5đ, đúng phần nào được phần đó. Có thể0,5đ cho ý1đ còn thiếu điều kiện quan trọng. Không0cả câu vì một lỗi, không đặt trần điểm/tiêu chí ngầm.
- Chấp nhận tiếng Việt đời thường, timeline, pseudocode hoặc thiết kế khác có contract tương đương. Không bắt thuộc lệnh CLI, spelling serializer, Spring import hay công thức key y hệt mẫu.
- Không chấp nhận “miss là Product404”, “TTL tự sync DB”, “CacheEvict detail sửa mọi list”, “Redis lỗi luôn fallback”, “after-commit là atomic DB+Redis”, “cache hit vẫn chạy body kiểm quyền”. Trừ đúng ý sai, giữ điểm đúng khác.
- Code có key/serialization/timing sai gây trả nhầm/stale thì phân tích hậu quả; không bỏ qua chỉ vì học viên nói ý tưởng. Ngược lại không đánh sai chỉ vì không dùng record hoặc không nhớ một API cụ thể.
- Không bắt triển khai Cluster/Streams/locks/ELK/AI provider. Benchmark kế hoạch phải có đối chứng và số đo, không cần chạy load tool thật nếu đề chỉ yêu cầu mô tả.

## Mỗi lần chấm để lại kinh nghiệm

Đọc bản bài làm mới nhất đã lưu. Tạo snapshot trong `Exams/nhan-xet/` theo quy trình dự án, giữ được lịch sử cần xem lại. Mỗi câu phải ghi: đúng gì, sai/thiếu gì, điểm từng ý, tổng hợp đáp án đúng và mục lesson cần ôn. Không tự điền đáp án vào bài của người học.

Chỉ cập nhật tiến độ/checklist khi thực sự chấm và theo AGENTS; không rewrite roadmap. Nếu capstone hoãn thì ghi nhận đúng, không tuyên bố đã code/merge. Không tạo snapshot giả trong lúc soạn đề.
