# M3-4 · OAuth2 / OIDC và Google Login

[Ghi chú tích hợp API/Security/lỗi giữa các module](../README_TICH_HOP_CONTRACT.md).

> Bộ tài liệu chuẩn bị sẵn; module vẫn chưa bắt đầu. Không tạo app mới, không thay code shopcore hoặc đánh dấu đã tích hợp Google.

**Google xác nhận bạn là ai; shopcore vẫn quyết định bạn được làm gì.** Đây là câu xuyên suốt module.

| Bài | Bài học | Đề | Đáp án và rubric |
|---|---|---|---|
| 1 | [Roles, OIDC và code flow](LESSON_01_OAUTH2_OIDC_CODE_FLOW.md) | [Đề 1](../../../Exams/de-kiem-tra/M3-4-oauth2__2026-10-07__lesson1-lan1.md) | [Giải 1](../../../Exams/de-kiem-tra/M3-4-oauth2__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [Spring Google Login và config](LESSON_02_SPRING_GOOGLE_LOGIN_CONFIG.md) | [Đề 2](../../../Exams/de-kiem-tra/M3-4-oauth2__2026-10-07__lesson2-lan1.md) | [Giải 2](../../../Exams/de-kiem-tra/M3-4-oauth2__2026-10-07__lesson2-lan1__DAPAN.md) |
| 3 | [User nội bộ, liên kết và tích hợp](LESSON_03_ACCOUNT_MAPPING_INTEGRATION.md) | [Đề 3](../../../Exams/de-kiem-tra/M3-4-oauth2__2026-10-07__lesson3-lan1.md) | [Giải 3](../../../Exams/de-kiem-tra/M3-4-oauth2__2026-10-07__lesson3-lan1__DAPAN.md) |

Roadmap 12h: ba buổi học ba bài, một buổi ôn và kiểm chứng tích hợp khi thực hành. Mỗi đề PHONG_VAN theo lesson 8×5=40đ, đạt từ 34/40; không phải đề DAY_DU tổng module.

## Phạm vi vừa đủ

- Dùng Google làm provider; không tự host Authorization Server.
- Backend servlet Spring Security, OAuth2 Login qua authorization code. Không tự parse ID token rồi tin claims.
- Tài khoản nội bộ và role thuộc shopcore. Không biến Google access token thành token gọi mọi API.
- Browser login thường cần session giữ handshake; API Bearer stateless có thể dùng chain khác. Không áp cùng STATELESS cho tất cả.
- Giữ DTO class và style AppException/ErrorCode của bạn; lỗi trước MVC không mặc nhiên do ControllerAdvice xử lý.
- Boot hiện tại 4.1.1 / Java21; tài liệu Security hiện hành, BOM Boot quản lý dependency. POM chưa được thay đổi.

Xem [kế hoạch](LESSON_PLAN.md), [quy tắc chấm](QUY_TAC_CHAM.md), [kiểm chất lượng](QUALITY_REVIEW.md). Đọc sau M3-2 và M3-3; soạn sẵn không đổi thứ tự học.
