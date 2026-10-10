# Đáp án M3-3 · Lesson 04

8×5=40đ, đạt34/40. Chấm tư duy test, không chấm thuộc cú pháp JUnit.

| Câu | Rubric /5 |
|---|---|
| 1 | hasRole ADMIN đúng (1); authority ADMIN sai (1); authority ROLE_ADMIN đúng (1); giải thích prefix (1); EnableMethodSecurity (1) |
| 2 | USER không xóa (2); method rule còn áp dụng (1); URL chặn thì method chưa chạy (1); hai cổng đều phải pass (1) |
| 3 | Self-invocation thường bypass proxy (2); annotation qua proxy mới intercept (1); bố trí lời gọi qua bean khác/boundary được bảo vệ (2). Ví dụ new service là bổ sung, không yêu cầu ngoài đề. |
| 4 | Role chưa đủ (1); check owner/local policy (2); principal local ID đáng tin (1); request userId có thể giả (1) |
| 5 | Mock user không test password/JWT (2);403 có thể do CSRF nếu bật (1); gửi csrf phù hợp theo chain (1); ADMIN pass và dữ liệu/side effect (1) |
| 6 | jwt() bypass decoder (1); authorities explicit bypass roles converter (2); converter fixture test (1); real signed Bearer+decoder test (1) |
| 7 | Key test và decoder thật trusted config (1); positive case đúng (1); ba negative case (1); mock decoder không crypto (1); expiry ngoài skew/clock ổn định (1) |
| 8 | Catch-all nuốt AccessDenied thành 500 (2); giữ403 đúng tầng (1); filter entry point/denied handler khác MVC Advice (1); ApiResponse body không thay HTTP status (1) |

## Câu 1

hasRole ADMIN đúng vì tự xét ROLE_ prefix; hasAuthority ADMIN sai vì exact string; hasAuthority ROLE_ADMIN đúng. Cần @EnableMethodSecurity và bean proxy phù hợp.

Ôn lesson 4 mục 1. Không trừ lỗi quote/import.

## Câu 2

USER qua URL nhưng fail method ADMIN, không chạy nghiệp vụ delete. Nếu URL đã từ chối thì method chưa được gọi. Cả hai cổng áp dụng, không tự lấy cổng thoáng hơn.

Ôn mục 1–2.

## Câu 3

this.delete thường không đi qua Spring proxy nên không dựa vào annotation của delete để bảo vệ archive. Gọi method bảo vệ qua bean proxy từ bean khác hoặc thiết kế boundary đúng. Tự new Service cũng không có interception như Spring bean.

Ôn mục 2. Phải nêu giới hạn self-invocation, không chỉ “Spring tự chạy”.

## Câu 4

Role USER chưa đủ quyền xem đơn của mọi người. Service kiểm owner bằng local user ID từ principal đã xác thực và policy ADMIN override nếu có. userId client gửi có thể bị thay để truy cập chéo user.

Ôn mục 3. Có thể chọn trả 403 hoặc404 che tồn tại theo contract, câu không chấm lựa chọn này.

## Câu 5

@WithMockUser dựng authentication giả, không chạy password login/chữ ký JWT. Nếu CSRF bật,403 có thể do thiếu CSRF trước khi kiểm role; gửi token CSRF test đúng hoặc xác định chain header-only đã tắt. Thêm ADMIN success và kiểm dữ liệu/side effect để chứng minh đường cho phép thật.

Ôn mục 4–5. Chỉ assert 403 chưa định vị được nguyên nhân.

## Câu 6

jwt() dựng auth, không chạy signature/claims validation của decoder. Authorities explicit không chứng minh roles claim converter. Test converter riêng với Jwt roles fixture; thêm Bearer token ký thật qua decoder/filters thật để kiểm validation và wiring.

Ôn mục 4–6. Test converter không thay crypto test.

## Câu 7

Keypair test A, decoder public A với issuer/audience/time; ký token private A. Positive ADMIN 204; negatives ví dụ wrong key 401, expired 401, wrong audience 401 (thêm USER 403 càng tốt). Mock decoder trả object sẵn nên không chứng minh crypto. Dùng clock cố định hoặc expired đủ xa ngoài skew, không chọn exp vừa cách 1 giây.

Ba negative case 1đ: ba đủ 1, hai 0.5. Ôn mục 6.

## Câu 8

Advice catch-all có thể xử lý lỗi method trước Security và trả 500 sai. Giữ 403 qua handler MVC phù hợp hoặc để Security xử lý theo thiết kế. Nhánh filter dùng entry point 401/denied handler 403; Advice không bao mọi filter. Body ApiResponse(code=403) cùng HTTP 200 vẫn là HTTP 200, phải set status đúng.

Ôn mục 7. Không yêu cầu viết handler hoàn chỉnh.
