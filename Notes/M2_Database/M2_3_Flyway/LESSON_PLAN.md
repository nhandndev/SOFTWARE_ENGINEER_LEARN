# Kế hoạch M2-3 · Flyway

Ba lesson vừa đủ phạm vi checklist hiện tại; không tách mỗi annotation/lệnh thành một lesson nhỏ.

Định hướng của bạn: học concept Backend Java để đi tiếp AWS/AI Engineer. Ở đây ưu tiên hiểu schema có lịch sử, dữ liệu cũ được giữ và khác biệt môi trường; không mở rộng thành khóa DBA hoặc bắt học công cụ CI trước M4-2. Ví dụ dùng Boot 4.1.1/Java 21 theo shopcore đã kiểm ngày 2026-10-07.

| Lesson | Trọng tâm mới | Đã có từ trước | Điều kiện hiểu bài |
|---|---|---|---|
| 01 | Versioned, naming, order, history/checksum | CREATE/ALTER và constraint | Kể đúng file nào chạy ở DB mới/cũ |
| 02 | Boot autoconfig, R, locations/profile, seed | Config/Profiles và INSERT | Trace startup và bảo vệ seed theo DB đích |
| 03 | Failure, repair, baseline, forward fix, CI | Transaction PostgreSQL | Chọn cách sửa theo lỗi và giữ dữ liệu |

## Đối chiếu 01_LO_TRINH.md

| Checklist | Bài giải thích | Bằng chứng học qua đề |
|---|---|---|
| Versioned naming | Lesson 01 mục 3–6 | Câu 2–5, 8 |
| Repeatable R__ | Lesson 02 mục 4, 6–7 | Câu 4–5, 7 |
| Boot autoconfig | Lesson 02 mục 1–3 | Câu 1–3 |
| Seed dev/test an toàn | Lesson 02 mục 5–6 | Câu 6–8 |
| Forward-only vs repair | Lesson 03 mục 3–7 | Câu 2–6 |
| Migrate CI trong mục tiêu/deliverable | Lesson 03 mục 8 | Câu 7 kiểm tư duy; không thay bằng chứng chạy thật |

Baseline, compatibility khi deploy và phân biệt CLI/Maven/Boot là bổ sung cần thiết để không áp dụng sai các lệnh trên DB đã có dữ liệu. Không học Liquibase, replication hay mọi tính năng trả phí Flyway.

## Nhịp học

1. Đọc một lesson, tự trace ví dụ bằng lời.
2. Làm đề của lesson đó trước khi mở đáp án.
3. Gửi chấm, sửa ý còn thiếu theo snapshot; đạt lesson rồi tiếp tục.

Không tự chuyển trạng thái module vì file đã được tạo. Việc pass toàn module và việc thực hành CI/schema là hai bằng chứng khác nhau. Roadmap vẫn giữ nguyên tiêu chí hiện có; ngoại lệ học/hoãn thực hành theo quyết định người học phải được ghi riêng, không tự suy ra.

## Đánh giá hiểu, không kiểm thuộc lòng

Mỗi đề gồm nhận diện, dự đoán kết quả và áp dụng trên dữ kiện cho sẵn. Lesson 01 có tình huống version conflict và ALTER; Lesson 02 đọc seed SQL; Lesson 03 tìm lỗi CHECK/rollback và mô tả CI. Những property/artifact dài đã cho hoặc có thể tra; không coi nhớ tên công cụ là bằng chứng thay cho hiểu.

M2-2 vẫn cần hoàn thành trước khi học chính thức M2-3. Chuẩn bị bài ở đây không đổi trạng thái hay điểm các module. Phần thực hành deferred theo cách học hiện tại không bị ghi nhầm là đã merge capstone.
