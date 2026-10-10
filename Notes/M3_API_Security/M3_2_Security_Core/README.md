# M3-2 — Spring Security Core

[Ghi chú tích hợp API/Security/lỗi giữa các module](../README_TICH_HOP_CONTRACT.md).

> Tài liệu soạn sẵn theo yêu cầu; module vẫn **chưa bắt đầu**, không đổi con trỏ M2-2 hoặc coi các module trước đã đạt. Bài học có ví dụ code nhưng chưa sửa/chạy auth trong shopcore.

Bạn đã hiểu MVC/exception; ở đây thêm **cổng bảo vệ trước MVC**. Mục tiêu là biết request nào vào Controller, ai xác thực mật khẩu, ai kiểm quyền và vì sao có lúc403 dù mật khẩu đúng.

| Bài | Nội dung | Đề | Bài giải |
|---|---|---|---|
| 1 | [Filter chain và authentication/authorization](LESSON_01_FILTER_CHAIN_AUTHENTICATION_AUTHORIZATION.md) | [Đề01](../../../Exams/de-kiem-tra/M3-2-security-core__2026-10-07__lesson1-lan1.md) | [Giải01](../../../Exams/de-kiem-tra/M3-2-security-core__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [User/Role, BCrypt, UserDetailsService](LESSON_02_USER_ROLE_BCRYPT_USERDETAILSSERVICE.md) | [Đề02](../../../Exams/de-kiem-tra/M3-2-security-core__2026-10-07__lesson2-lan1.md) | [Giải02](../../../Exams/de-kiem-tra/M3-2-security-core__2026-10-07__lesson2-lan1__DAPAN.md) |
| 3 | [SecurityFilterChain, rules và lỗi401/403](LESSON_03_CONFIG_RULES_SECURITY_ERRORS.md) | [Đề03](../../../Exams/de-kiem-tra/M3-2-security-core__2026-10-07__lesson3-lan1.md) | [Giải03](../../../Exams/de-kiem-tra/M3-2-security-core__2026-10-07__lesson3-lan1__DAPAN.md) |
| 4 | [Session/stateless, CSRF và CORS](LESSON_04_SESSION_CSRF_CORS_DEBUG.md) | [Đề04](../../../Exams/de-kiem-tra/M3-2-security-core__2026-10-07__lesson4-lan1.md) | [Giải04](../../../Exams/de-kiem-tra/M3-2-security-core__2026-10-07__lesson4-lan1__DAPAN.md) |

## Cách học đúng nhu cầu của bạn

Mỗi bài đọc một flow rồi dự đoán case cụ thể, không bắt thuộc toàn bộ tên filter. Làm đề bằng lời/code ngắn; mỗi đề LESSON **8×5=40đ**, đạt từ34/40=85%. Tổng32 câu kiểm tư duy; đây không phải đề DAY_DU tổng module. Bài giải có đủ đáp án, lỗi bị trừ và rubric theo [quy tắc chấm](QUY_TAC_CHAM.md).

Bạn được tra tên API/imports. Phải hiểu ranh giới: credentials khác principal; xác thực khác quyền; password hash khác encryption; stateless khác chống CSRF; CORS khác authentication. Không dùng lỗi403 làm lý do tắt tất cả bảo vệ.

## Phiên bản và điều kiện ví dụ

Roadmap gọi “Spring Security6 Core”; source shopcore hiện dùng **Boot4.1.1, Java21**, tài liệu Security hiện tại7.1.1. Bài giữ concept Core và bean/lambda DSL tương ứng, không dùng WebSecurityConfigurerAdapter. Không pin Security6 thủ công vào Boot4; để BOM Boot quản lý khi thực hành.

POM hiện chưa có Security/JPA/PostgreSQL. Bài chỉ mô tả dependency cần thêm khi thực hành, không tự cài. Ví dụ auth dùng **HTTP Basic để nhìn flow**, không JWT, không endpoint login/register hoàn chỉnh; production dùng HTTPS. Browser Basic có thể tự gửi credentials nên không tự an toàn CSRF dù stateless. Lesson03 giữ CSRF bật; bài04 giải thích quyết định khi nào được đổi.

DTO là class theo style bạn quen; User entity không trả trực tiếp, không đưa passwordHash ra API. Model/LLM/API key quản lý sau này vẫn cần kiểm ai được gọi và ai có quyền dùng tài nguyên; JWT/OAuth2 là module sau, không nhồi vào Core.

## Phạm vi và bằng chứng

Theo16h roadmap: bốn bài, mỗi bài một buổi đọc/vẽ flow/làm đề. Deliverable auth end-to-end trong shopcore **chưa được làm hoặc ghi nhận**. Đọc/làm đề không tự chứng minh app chạy. Xem [coverage plan](LESSON_PLAN.md), [kiểm chứng tài liệu](QUALITY_REVIEW.md).
