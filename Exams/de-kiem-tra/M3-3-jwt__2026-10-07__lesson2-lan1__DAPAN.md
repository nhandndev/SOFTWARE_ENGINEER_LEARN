# Đáp án M3-3 · Lesson 02

8×5=40đ; đạt34/40. Chấm nội dung, không yêu cầu thuộc code nguyên project.

| Câu | Rubric /5 |
|---|---|
| 1 | Request allowlist không tin role (1); server USER (1); BCrypt không raw (1); response không passwordHash/entity (1); DTO tách request/response (1) |
| 2 | exists race không đủ (2); DB unique trên email chuẩn hóa theo policy (2); map409 an toàn (1) |
| 3 | manager/provider (1); load user/password matches/status (2); chỉ cấp sau success (1); Resource Server không tự có login (1) |
| 4 | bearer extraction và decoder (2); converter/context và authorization (2); không cần gửi password/query DB mọi lần (1) |
| 5 | Không dùng session giữ/lấy auth API (2); vẫn có DB/refresh state (1); JWT cũ có thể còn nhận (1); TTL/check trạng thái bổ sung (1) |
| 6 | scope mặc định không tự map roles (1); đọc claim roles (1); prefix ROLE_ (1); hasRole khớp ROLE_ADMIN (1); tránh prefix kép (1) |
| 7 | JSON 400 MVC (1); password 401 xử lý auth exception (1); trùng 409 Advice/AppException (1); Bearer 401 entry point trước MVC (2) |
| 8 | CSRF phụ thuộc credential tự gửi và chain (2); permitAll không bypass bearer filter (2); no-store và không log token (1) |

## Câu 1

RegisterRequest chỉ email/password theo contract; dù JSON có role cũng không cấp theo client (có thể reject field không hỗ trợ tùy policy). Server cấp USER, encode BCrypt. UserResponse chỉ field công khai như id/email; không raw password/passwordHash/entity. Request/response DTO có trách nhiệm riêng.

Ôn lesson 2 mục 1–2. Lombok chỉ giảm boilerplate, không tự quyết định field nào được phép sửa.

## Câu 2

Hai request có thể cùng thấy false trước khi insert. DB unique constraint trên định danh email chuẩn hóa theo policy là bảo đảm cuối; xử lý conflict thành 409 không lộ SQL. Service check giúp UX nhưng không thay constraint.

Ôn mục 2. Không bắt thiết kế chuẩn hóa email cụ thể, chỉ cần nhất quán với khóa unique.

## Câu 3

AuthController/Service chuyển credentials tới AuthenticationManager; Dao provider tải UserDetails, dùng PasswordEncoder.matches và kiểm trạng thái. Thành công mới lấy danh tính đã xác thực để cấp token. Resource Server kiểm Bearer ở request sau, không tự sinh register/login.

Ôn mục 3. Diễn đạt “Spring kiểm password hash với DB rồi mới ký” có thể đủ ý dù thiếu tên class.

## Câu 4

Filter lấy Bearer, provider gọi decoder kiểm signature/claims, converter tạo Authentication/authorities vào context request, authorization kiểm route rồi mới MVC. Không cần password lại; JWT offline có thể không query user DB mỗi lần.

Ôn mục 4. Không nhận câu “Jackson đổi JWT thành User rồi xuống Controller” như validation đúng.

## Câu 5

STATELESS nói về session authentication, không cấm persistence. Users/refresh DB vẫn có. Access JWT cũ có thể tiếp tục được nhận sau khi DB disabled nếu API chỉ kiểm offline; giảm TTL hoặc thêm trạng thái/revocation check theo policy nếu cần chặn sớm.

Ôn mục 4; “disabled lập tức làm mọi JWT fail” chưa đúng nếu không nêu thêm check.

## Câu 6

Default scope mapping không đảm bảo roles custom. Đặt authoritiesClaimName=roles và authorityPrefix=ROLE_; ADMIN thành ROLE_ADMIN để hasRole ADMIN khớp. Nếu claim đã ROLE_ADMIN sẽ thành ROLE_ROLE_ADMIN, nên thống nhất contract hoặc đổi prefix.

Ôn mục 5. Code converter tương đương được tính đầy đủ.

## Câu 7

JSON binding sai→400 trong MVC; credentials sai→AuthenticationException cần map 401 an toàn; email trùng business→AppException/ErrorCode qua Advice trả 409; invalid Bearer→Security entry point 401 trước Controller. Catch-all không được biến auth failure thành 500/200.

Ôn mục 7. Không bắt tên exception JSON cụ thể trong câu này.

## Câu 8

Tắt CSRF chỉ khi chain và auth mechanism đáp ứng giả định header-only không credential browser tự gửi. Refresh cookie phải đánh giá lại CSRF/SameSite/Secure. permitAll chỉ cho quyền route, không bỏ filter; Bearer hỏng có thể bị401. TokenResponse no-store, không log raw body/token.

Ôn mục 6–7. Không coi “có CORS” là đủ thay CSRF.
