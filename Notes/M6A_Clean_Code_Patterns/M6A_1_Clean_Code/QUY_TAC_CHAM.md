# Chấm Clean Code theo reasoning và contract

Mỗi lesson8×5=40; điểm%=điểm thô/40×100; đạt từ34/40. Mỗi ý công khai1 điểm: đầy đủ1, đúng hướng thiếu điều kiện0,5, sai/thiếu0. Chấp nhận diễn đạt/pseudocode tương đương, không ép tên pattern/annotation/câu chữ. Không cap ngầm hoặc trừ lặp một lỗi.

Chấm chặt ở lý do và behavior: nhắc Extract Method mà không biết side effects/order chưa đủ ý safety. Tên smell chỉ là tín hiệu; “giữ nguyên vì cohesive, chưa có pain point” có thể đúng. Không ép mọi if thành polymorphism, mọi String thành class, mọi method dưới10 dòng hoặc mọi bean có interface.

Chỉ 0 ở tiêu chí sai liên quan, không tự trừ toàn bài vì một cú pháp. @Builder/class/Lombok được chấp nhận nếu invariant/contract giữ đúng. Refactor và behavior change phải phân biệt; tests unit không tự chứng minh integration/transaction/perf. Nếu chưa chạy nói planned/unknown là đúng hơn PASS giả.

Khi chấm thật: đọc bản lưu mới nhất; mỗi câu ghi được gì, thiếu/sai gì, điểm từng tiêu chí, đáp án hoàn chỉnh và việc ôn. Tạo snapshot nhận xét theo03; chấm thử chỉ phần đã làm thì denominator rõ, không coi câu trắng là thiếu kiến thức đã chứng minh. Không cập nhật checklist/deliverable từ việc AI chạy mẫu, không dùng template thay bài nộp.
