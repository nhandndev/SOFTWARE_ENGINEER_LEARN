# Kế hoạch M2-3 · Flyway

Theo quyết định người học ngày 2026-10-30, chỉ còn Lesson 01 và 03 trong phạm vi kiểm tra bắt buộc. Đã xóa bộ Lesson 02; giữ lab thực hành riêng và giữ nguyên số/tên Lesson 03 để bảo toàn lịch sử. Không coi nội dung bỏ qua là đã được kiểm chứng.

Định hướng của bạn: học concept Backend Java để đi tiếp AWS/AI Engineer. Ở đây ưu tiên hiểu schema có lịch sử, dữ liệu cũ được giữ và khác biệt môi trường; không mở rộng thành khóa DBA hoặc bắt học công cụ CI trước M4-2. Ví dụ dùng Boot 4.1.1/Java 21 theo shopcore đã kiểm ngày 2026-10-07.

| Lesson | Trọng tâm mới | Đã có từ trước | Điều kiện hiểu bài |
|---|---|---|---|
| 01 | Versioned, naming, order, history/checksum | CREATE/ALTER và constraint | Kể đúng file nào chạy ở DB mới/cũ |
| Lab tùy chọn | Boot, R, locations/profile, seed | Config/Profiles và INSERT | Tự quan sát migration; không còn đề Lesson 02 bắt buộc |
| 03 | Failure, repair, baseline, forward fix, CI | Transaction PostgreSQL | Chọn cách sửa theo lỗi và giữ dữ liệu |

## Đối chiếu 01_LO_TRINH.md

| Checklist | Bài giải thích | Bằng chứng học qua đề |
|---|---|---|
| Versioned naming/order/history | Lesson 01 mục 2–6 | Đề 2026-10-13 bản sửa 2026-10-23: câu 1–6 |
| Repeatable R__ | Lab thực hành mục 9–12 | Chưa có điểm xác nhận; không chặn chuyển module theo quyết định người học |
| Boot autoconfig | Lab thực hành mục 4–6; Lesson 03 câu 8 | Câu 8 Lesson 03 xác nhận phân biệt công cụ, chưa thay bằng chứng tích hợp đầy đủ |
| Seed dev/test an toàn | Lab thực hành | Chưa có điểm xác nhận; không tự tick checklist |
| Forward-only vs repair | Lesson 03 mục 3–7 | Câu 2–6 |
| Migrate CI trong mục tiêu/deliverable | Lesson 03 mục 8 | Câu 7 kiểm tư duy; không thay bằng chứng chạy thật |

Baseline, compatibility khi deploy và phân biệt CLI/Maven/Boot là bổ sung cần thiết để không áp dụng sai các lệnh trên DB đã có dữ liệu. Không học Liquibase, replication hay mọi tính năng trả phí Flyway.

## Nhịp học

1. Đọc một lesson, tự trace ví dụ bằng lời.
2. Làm đề của lesson đó trước khi mở đáp án.
3. Gửi chấm, sửa ý còn thiếu theo snapshot; đạt lesson rồi tiếp tục.

Không tự chuyển trạng thái module vì file đã được tạo. Việc pass toàn module và việc thực hành CI/schema là hai bằng chứng khác nhau. Roadmap vẫn giữ nguyên tiêu chí hiện có; ngoại lệ học/hoãn thực hành theo quyết định người học phải được ghi riêng, không tự suy ra.

## Đánh giá hiểu, không kiểm thuộc lòng

Mỗi đề còn lại gồm nhận diện, dự đoán kết quả và áp dụng trên dữ kiện cho sẵn. Lesson 01 có tình huống version conflict và ALTER; Lesson 03 tìm lỗi CHECK/rollback và mô tả CI. Seed chuyển sang lab tùy chọn, không còn một đề riêng bắt buộc.

M2-3 chốt phần học rút gọn dựa trên Lesson 01 đạt 36/40 và Lesson 03 đạt 36,5/40: tổng 72,5/80 = 90,625%. Đây không phải điểm đề tổng module hoặc bằng chứng capstone/CI/lab đã hoàn thành. Trạng thái hiện hành xem 05_TIEN_DO.md.
