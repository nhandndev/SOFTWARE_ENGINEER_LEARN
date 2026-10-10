# M3-3 · JWT

[Ghi chú tích hợp API/Security/lỗi giữa các module](../README_TICH_HOP_CONTRACT.md).

> Soạn sẵn theo yêu cầu. Không đổi tiến độ, không thêm Security vào POM, không triển khai thay bạn trong shopcore.

Bạn đã biết Controller → Service → Repository. Module này trả lời: **request chưa vào Controller thì ai kiểm token, kiểm điều gì, token hết hạn và logout sẽ xảy ra thế nào?**

| Bài | Bài học | Đề | Đáp án và rubric |
|---|---|---|---|
| 1 | [Cấu trúc và kiểm chứng JWT](LESSON_01_JWT_STRUCTURE_VALIDATION.md) | [Đề 1](../../../Exams/de-kiem-tra/M3-3-jwt__2026-10-07__lesson1-lan1.md) | [Giải 1](../../../Exams/de-kiem-tra/M3-3-jwt__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [Register, login và Bearer API](LESSON_02_REGISTER_LOGIN_BEARER_API.md) | [Đề 2](../../../Exams/de-kiem-tra/M3-3-jwt__2026-10-07__lesson2-lan1.md) | [Giải 2](../../../Exams/de-kiem-tra/M3-3-jwt__2026-10-07__lesson2-lan1__DAPAN.md) |
| 3 | [Refresh, rotation và logout](LESSON_03_REFRESH_ROTATION_LOGOUT.md) | [Đề 3](../../../Exams/de-kiem-tra/M3-3-jwt__2026-10-07__lesson3-lan1.md) | [Giải 3](../../../Exams/de-kiem-tra/M3-3-jwt__2026-10-07__lesson3-lan1__DAPAN.md) |
| 4 | [Phân quyền và security test](LESSON_04_AUTHORIZATION_SECURITY_TESTS.md) | [Đề 4](../../../Exams/de-kiem-tra/M3-3-jwt__2026-10-07__lesson4-lan1.md) | [Giải 4](../../../Exams/de-kiem-tra/M3-3-jwt__2026-10-07__lesson4-lan1__DAPAN.md) |

## Cách học

Mỗi bài: đọc flow, dự đoán một request, làm tám câu bằng lời hoặc code ngắn. Đề **PHONG_VAN theo lesson, 8×5=40 điểm**, không phải DAY_DU tổng module. Đạt lesson từ 34/40, không tự suy ra đã hoàn thành module/project.

Roadmap 20h: bốn buổi cho bốn bài, buổi thứ năm ôn, ghép flow và kiểm chứng khi bạn thực hành. Module Testing đang hoãn không có nghĩa bỏ hết kiểm chứng auth: bài 4 dạy phân biệt test giả lập user với test chữ ký thật, không bắt thuộc JUnit.

## Điều kiện ví dụ

- Source hiện dùng Boot 4.1.1 / Java 21; ví dụ theo bean/lambda DSL Security hiện đại. Để BOM Boot quản lý phiên bản, không pin Security 6 vào Boot 4.
- API JWT dùng Bearer trong header, không Basic/cookie/session auth. Chỉ dưới giả định này mới cân nhắc tắt CSRF cho **API chain**.
- Access token là JWT ký RS256; refresh token có thể là chuỗi ngẫu nhiên bí mật. Không dựng introspection server hay Authorization Server đầy đủ.
- DTO dùng class; không trả User/passwordHash/entity trực tiếp. HTTPS bắt buộc khi triển khai thật.
- Tài liệu chính thức và gợi ý tìm video có trong từng bài; video không được giả vờ đã xác minh.

Xem [kế hoạch coverage](LESSON_PLAN.md), [quy tắc chấm](QUY_TAC_CHAM.md) và [kiểm chất lượng](QUALITY_REVIEW.md).
