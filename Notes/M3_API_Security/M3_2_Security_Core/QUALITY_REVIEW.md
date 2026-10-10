# M3-2 — Kiểm chứng chất lượng tài liệu

Ngày soạn/rà:2026-10-07. Đây là kiểm tài liệu, không phải điểm người học hoặc chứng nhận shopcore đã có authentication chạy end-to-end.

## Context đã đối chiếu

Đọc AGENTS, roadmap M3-2 và moduleJWT/OAuth2 liền kề, trạng thái học hiện tại, POM/source hiện có và format M3-1. Nền: MVC/DTO/JPA/validation/ProblemDetail; DTO class và common business AppException/ErrorCode giữ nguyên. Không sửa app, POM, roadmap hoặc tiến độ.

Theo yêu cầu mới, đã tạo Goal cho công việc này và ghi quy tắc tạo Goal cho bài học/đề trong AGENTS.md. Tài liệu chuẩn bị sẵn không mở module hoặc bỏ qua thứ tự học.

## Phạm vi và quyết định quan trọng

| Rủi ro | Xử lý trong tài liệu |
|---|---|
| Roadmap gọi Security6, project Boot4.1.1 | Nêu chênh lệch, dùng bean/lambda, BOM Boot quản lý; không ép version6 |
| Biết code nhưng không biết request dừng ở đâu | Sơ đồ có giải thích từng bước, bảng case và Controller breakpoint |
|401/403 bị học thành kết luận tuyệt đối | Ghi điều kiện CSRF/CORS hợp lệ khi kiểm quyền; caseCSRF tách riêng |
| permitAll bị coi bỏ hết filters | Case Basic sai trên public; phân biệt ignoring và authorization |
| JWT làm Core quá tải | Dùng Basic để nhìn flow; token chỉ nhận diện, không codeJWT/refresh |
| Demo Basic stateless làm người học tắtCSRF máy móc | Config giữCSRF bật, phân tích browser auto-credentials và token-cookie |
| UserDetailsService bị coi tựlogin | Tách repository/nạpUserDetails/provider/encoder bằng sequence diagram |
| JPA roles LAZY bị đọc sau session | Fetch chủ động và map trong transaction; không readOnly magic |
| Copy Role/DTO tạo privilege escalation | Role do server policy, không bind entity/roles/status từ request |
| RestControllerAdvice bị coi bắt mọi security lỗi | EntryPoint/DeniedHandler + writer format, Basic challenge, giới hạn CORS/container |
| CORS bị coi authentication/firewall | Allowlist rõ, preflight trướcauth, server-client không bịbrowserenforce |

## Câu hỏi có được dạy không?

| Đề | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 |
|---|---|---|---|---|---|---|---|---|
| L01 | mục1/4 | mục2–4 | mục3 | mục4 | mục3 | mục5 | mục6 | mục4/7 |
| L02 | mục1/5 | mục2 | mục2 | mục3/6 | mục4 | mục5–6 | mục6–7 | mục2/7 |
| L03 | mục1/3 | mục4 | mục6 | mục4 và L02 | mục2/4 | mục3/5 | mục3/5 | mục6–7 |
| L04 | mục1/4 | mục2/4 | mục3 | mục2/4/7 | mục5 | mục6 | mục5–7 | mục7–8 |

32 câu có đủ dữ kiện;32 bài giải có rubric5đ/câu, đáp án đầy đủ, lưu ý mất điểm và mục đọc lại. Câu code chấp nhận diễn giải đúng tương đương, không yêu cầu viết full app. Các concept lặp qua bài ở mức ứng dụng khác nhau: L01 nhận diện tầng, L03 đọc/sửa rule, L04 phân biệt threat model/browser; không yêu cầu học thuộc nguyên văn.

## Bằng chứng kỹ thuật đã chạy

1. Đã compile Java21 và chạy **11 assertion** bằng thư viện Security7.0.5 cached: encode có salt khác, matches đúng/sai, encode-equals không phù hợp, roles thêmROLE_, ADMIN không tựUSER, disabled flag, Unicode byte count và giới hạnBCrypt72byte. Password trong harness là dữ liệu tổng hợp tạm, không tài khoản thật; không in credentials/hash.
2. Trích **nguyên snippet SecurityDemoConfig và SecurityProblemWriter từ Markdown**, chỉ bổ sung imports để compile, không viết lại logic. Compile đạt với Security7.0.5/Framework7.0.6/Jackson3.1.2 và Lombok cached; không tải dependency mới, không sửa shopcore. Compiler có cảnh báo Unsafe từ Lombok trên JDK đang dùng, không có lỗi compile.
3. Kiểm tự động32 cặp câu/giải,32 chỗ trả lời, số thứ tự1–8, mỗi rubric5đ/tổng40đ; kiểm code fences và liên kết nội bộ. XML dependency minh họa được parse kiểm cú pháp.

**Giới hạn:** compile thư viện cached không phải build bằng BOM Boot4.1.1 thực tế; tài liệu tham chiếu hiện tại Security7.1.1. Chưa khởi tạo Boot context, chạy SecurityFilterChain HTTP, kiểm browser CSRF/CORS, JPA UserDetailsService với DB hoặc render Mermaid. Không báo đã kiểm end-to-end/auth integration. Entity snippets và full production policy chưa được compile/integration test trong lần soạn này.

## Nguồn và độ khó

Đã mở nguồn chính thức Security architecture/authentication/Basic/UDS/DaoProvider/password storage/authorization/java config/session/CSRF/CORS; UserDetails/BCrypt API; Spring MVC CORS và BootJSON. Link nằm ở từng lesson. Video chỉ là từ khóa tìm, chưa kiểm một video cụ thể.

Chấm nghiêm theo ý viết ra và condition, không thưởng keyword. Chưa có bài nộp nên chưa chứng minh độ khó empirically; có thể hiệu chỉnh câu mơ hồ khi người học phản hồi, không nâng điểm để đạt.

## Trạng thái

Không điểm, không tick, không đổi con trỏ M2-2, không ghi nhận capstone/deliverable. Bản dùng Obsidian được copy theo cấu trúc tương ứng sang Documents/Learning_Vault/Software_Engineer; nguồn học gốc vẫn ở SOFTWARE_ENGINEER_LEARN.
