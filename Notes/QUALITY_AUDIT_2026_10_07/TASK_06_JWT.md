# Task 06: JWT

Đã đọc riêng 4 lesson, 32 câu hỏi và 32 đáp án/rubric; đối chiếu token contract với Security Core và OAuth.

| Lesson | Câu 1–8 kiểm lần lượt |
|---|---|
| 01 | Cấu trúc; ký/mã hóa; key/restart; audience; claims thời gian; sửa role/thiếu quyền; decode-only; ghép validators |
| 02 | Register/login; credential/password; phát token; Bearer flow; claims/authorities; role prefix; CSRF policy; luồng lỗi |
| 03 | Access/refresh; lưu hash; rotation; reuse; race; transaction rollback; logout; giới hạn revoke access |
| 04 | Request/method authorization; authority; proxy boundary; owner/admin; 401/403; mock scope; decoder tests; kế hoạch kiểm |

## Lỗi và sửa

- **P1, Lesson 01:** timestamp validator mặc định kiểm expiry nếu có, không đủ để thực thi policy bắt buộc `exp`. Thêm validator yêu cầu `exp` và `sub` không trống, ghép cùng issuer/time/audience. Không thay hết validator cũ bằng audience-only. Không biến lưu ý mới thành điểm trừ hồi tố.
- **P2, Lesson 02 → 03:** chain chỉ public register/login sẽ chặn refresh trong thiết kế refresh không cần access còn hạn. Bổ sung POST refresh, giải thích refresh vẫn phải được xác thực/rotate trong AuthService; Bearer hết hạn kèm request có thể bị filter chặn trước permitAll.
- **P2, rubric Lesson 01 câu 3, Lesson 04 câu 3:** bỏ điểm riêng cho quản trị key hoặc “không new Service” khi đề chưa hỏi; giữ nội dung đó như lời khuyên. Điểm chuyển về ảnh hưởng restart và giải pháp proxy boundary đã hỏi.

## Điểm kỹ thuật đã đối chiếu

Refresh rotation không chỉ update token cũ rồi insert token mới thiếu atomicity. Bài phân biệt một winner của conditional update, reuse/family revocation, và tránh ném exception trong cùng transaction khiến revoke bị rollback. Access JWT offline không tự mất hiệu lực ngay vì logout. Mock JWT Authentication không chứng minh decoder/signature hoặc converter production đúng.

## Bằng chứng và giới hạn

Đã compile 4 snippet M3-3/M3-4 trên Security 7.0.5/Framework 7.0.6 và chạy 12 assertions decoder/converter thật, gồm sai key/audience, payload sửa, thiếu exp/sub. Chỉ chứng minh các component được gọi; chưa chạy toàn Boot app, DB refresh concurrency hoặc browser.

Nguồn: [Timestamp validator source](https://raw.githubusercontent.com/spring-projects/spring-security/main/oauth2/oauth2-jose/src/main/java/org/springframework/security/oauth2/jwt/JwtTimestampValidator.java), [Resource Server JWT](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html).

Kết luận: sửa các lỗi trên rồi đạt kiểm nội dung trong phạm vi; chưa là chứng nhận triển khai production hay điểm pass học viên.
