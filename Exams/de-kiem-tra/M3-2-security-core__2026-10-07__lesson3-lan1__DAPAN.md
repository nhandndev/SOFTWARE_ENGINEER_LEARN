# M3-2 — Bài giải Lesson03

40đ; normalize /40×100. [Quy tắc chấm](../../Notes/M3_API_Security/M3_2_Security_Core/QUY_TAC_CHAM.md). Đọc status trong đúng giả định CSRF/CORS hợp lệ, không lấy case thiếu token thay case kiểm quyền.

| Câu | Rubric5đ |
|---|---|
| 1 | Starter security (1); BOM Boot quản lý không pin6 vào4 (1); SecurityFilterChain bean/lambda không adapter (2); không tự repository/schema (1). |
| 2 | Rule public đầu tiên match (1); DELETE bị mở trái contract (1); public chỉ GET trước (1); write products ADMIN sau (1); first match không cộng dồn (1). |
| 3 | a401 thiếu auth (1); b403 thiếu quyền (1); c200 public (1); d204 được phép/xóa thành công (1); e404 business sau security (1). |
| 4 | hasRole cần ROLE_ADMIN (1); authn không đồng nghĩa đủ authority (1); sửa authority ROLE_ADMIN/rolesADMIN hoặc hasAuthorityADMIN nhất quán (2); authenticated không giữ ADMIN restriction (1). |
| 5 | Rule fallback từ chối endpoint mới (1); chain scope không bao URL ngoài đó (2); query role không cấp quyền (1); authorities từ nguồn tin cậy server không user input (1). |
| 6 | EntryPoint401 (1); DeniedHandler403 theo case đã auth (1); Advice không tự bắt filter failure (1); WWW-Authenticate Basic challenge (1); status/body khớp và application/problem+json (1). |
| 7 | Basic sai credentials và thiếu auth ở authorization (2); serializer tránh ghép JSON tùy tiện/escaping (1); wire format không bắt Java class (1); không leak exception/credentials (1). |
| 8 | Bốn case request/kết quả rõ (2); body/header/Controller phù hợp (1); chưa chạy không tuyên bố đã chạy (1); chuẩn bị dependencies/chain/user/endpoints đúng trước test (1). |

## Câu 1 — Theo project thực tế
**Đủ ý:** Thêm spring-boot-starter-security khi thực hành, để BOM Boot4 quản lý phiên bản; không ép Security6 vào Boot4. Dùng bean SecurityFilterChain cấu hình bằng HttpSecurity lambda rồi build, không WebSecurityConfigurerAdapter. Chain không tự tạo repository hay schema User.

**Chấm nghiêm:** Nhớ số version không thay điểm hiểu dependency/cấu hình. Không bắt pin một version Security chính xác hoặc sửa POM trong đề. Đọc L03 mục1/3 và README.

## Câu 2 — First match mở nhầm write
**Đủ ý:** DELETE path match permitAll đầu tiên, rule ADMIN sau không được dùng; đã mở write trái contract. Chỉ permitAll GET cho products/list/detail trước, rule products cho các request còn lại ADMIN sau, fallback deny. Không cộng hai rule rồi suy ra ADMIN thắng.

**Chấm nghiêm:** Chỉ đảo ADMIN lên đầu sẽ làm GET cũng cần ADMIN, chưa đạt contract. Phải thu hẹp rule public theo method. Đọc L03 mục2–4.

## Câu 3 — Năm case, năm lý do
**Đủ ý:** a401 vì chưa auth; b403 vì USER khôngADMIN; c200 vì GET public; d204 vì ADMIN được phép và Product10 xóa thành công; e404 vì business resource thiếu sau khi qua Security. Controller không chạy a/b, có thể chạy c/d/e.

**Chấm nghiêm:** Mỗi case1đ có thể chia status0,5 và lý do0,5. Đổi d sang403 doCSRF trái giả định đã cho. Không coi auth qua là buộc200. Đọc L03 mục6.

## Câu 4 — Chọn một convention rõ
**Đủ ý:** hasRoleADMIN mặc định cần ROLE_ADMIN, authorityADMIN không khớp dù user đã auth. Sửa cấp ROLE_ADMIN (roles builder nhận ADMIN) hoặc dùng hasAuthorityADMIN nếu policy authority thực sự là ADMIN. authenticated chỉ kiểm danh tính, sẽ cho user khôngADMIN qua nên không giữ policy.

**Chấm nghiêm:** Không bắt cả hai cách cùng lúc. “Đổi authenticated cho hết403” sai mục tiêu. Đọc L03 mục4; L02 mục4.

## Câu 5 — Deny đúng phạm vi
**Đủ ý:** Reports chưa khai báo gặp denyAll nên bị từ chối theo policy. Nếu chain chỉ /api/**, URL ngoài đó không nhận denyAll của chain; cần fallback hoặc policy chain khác. Role query là dữ liệu client không đáng tin, quyền phải từ principal/authorities đã được server xác nhận.

**Chấm nghiêm:** Không yêu cầu status cụ thể cho anonymous fallback vì depends entry point; đề hỏi authorization effect. Không coi denyAll bên trong chain là firewall toàn server. Đọc L03 mục2/4.

## Câu 6 — Đúng handler đúng tầng
**Đủ ý:** EntryPoint tạo401 khi cần/thất bại auth; DeniedHandler tạo403 với user đã auth không quyền. Failure ởfilter không tự được MVC Advice xử lý. Basic401 có WWW-Authenticate challenge, body status401/403 khớp HTTP và media type application/problem+json.

**Chấm nghiêm:** Nói “Jackson bắt exception rồi cho401” sai chức năng. Không bắt exact realm string hoặc full writer code. Đọc L03 mục3/5.

## Câu 7 — Đừng chỉ kiểm một đường401
**Đủ ý:** Sai Basic credentials có entry point của Basic filter; thiếu auth khi gặp protected rule dùng exception-handling path. Cần kiểm/cấu hình để hai đường cùng contract. Serializer ghi Map thành JSON và xử lý escaping, không nối raw text. RFC format không bắt Java class ProblemDetail; không gửi raw exception, password/header hoặc stack ra client.

**Chấm nghiêm:** Java Map không tự là lỗi format nếu wire body đúng. Chỉ nói “hai chỗ vì Spring yêu cầu” không chỉ hai case chưa đủ2đ. Đọc L03 mục3/5.

## Câu 8 — Kỳ vọng khác bằng chứng đã chạy
**Đủ ý, ví dụ:** GET products không credentials200/DTO, Controller chạy; GET me không credentials401/ProblemDetail+Basic challenge, Controller không chạy; GET admin/stats USER đúng403/ProblemDetail, Controller không chạy; cùng GET với ADMIN đúng200/DTO, Controller chạy. Không CORS/CSRF lỗi theo đề.

Chỉ đọc bảng chưa chứng minh runtime. Khi thực hành cần starter, profile/bean/user/encoder và Controller endpoints đúng, rồi gọi request và ghi response thực tế. Không ghi nhận deliverable bằng tài liệu mẫu.

**Chấm nghiêm:** Bốn case rubric2đ chia0,5/case có request+credentials+status. Phần body/header/breakpoint chấm riêng1đ. Không bắt JUnit hoặc code custom JWT filter. Đọc L03 mục6–7.
