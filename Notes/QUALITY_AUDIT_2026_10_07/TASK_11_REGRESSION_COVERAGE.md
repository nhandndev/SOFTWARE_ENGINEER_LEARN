# Task 11: Regression và coverage xuyên module

## 1. Đối chiếu roadmap

| Module | Yêu cầu roadmap → nơi học/kiểm |
|---|---|
| M2-2 | Types/constraints L01; safe writes L02; transaction/Spring L03; JDBC/parameter/identity/VACUUM L04. Mỗi lesson có câu 1–8 và đáp án. |
| M2-3 | Migration/history/checksum L01; Boot, repeatable, seed L02; lỗi, forward-only, repair/baseline, upgrade CI L03. |
| M2-4 | Phát hiện N+1 L01; fetch/graph/batch/projection L02; paging/OSIV/transaction L03; Hikari/đo hiệu năng L04. |
| M3-1 | Resource/version/idempotency L01; filter/sort/page L02; ProblemDetail và nhận diện HATEOAS L03. |
| M3-2 | Filter/authn/authz L01; User/Role/BCrypt/UDS L02; rules/errors L03; session/CSRF/CORS L04. |
| M3-3 | JWT/validation L01; register/login/Bearer L02; refresh/logout L03; phân quyền/method boundary/kiểm chứng L04. |
| M3-4 | OAuth/OIDC/code flow L01; Google Login/config/chains L02; local account/role/integration L03. |
| M3-5 | WebClient/external flow L01; timeout/retry/errors L02; OpenAPI/DTO L03; Bearer/export/verification L04. |
| M4-1 | Image/container L01; Dockerfile/layers/cache/dockerignore L02; Compose/services/network/volume/ports L03; healthcheck/secrets L04. |
| M4-2 | Workflow/events/runner L01; cache/test PR/reports L02; image GHCR L03; badge/debug/required checks L04. |

Đã đọc nội dung và đề/đáp án theo từng task module, không chỉ dò từ khóa bảng trên. Không thấy checklist trọng tâm nào thiếu hẳn lesson trong phạm vi 10 module này. “Có bài để học” không đồng nghĩa “học viên đã nắm” hoặc “đã chạy production”.

BE → AI Engineer: phần connection budget/transaction và external client timeout/retry có liên hệ phù hợp. Không ép học DBA sâu, Kubernetes, authorization server, reactive chuyên sâu, codegen hoặc AWS deploy trước thời điểm roadmap. Testing đang hoãn không có nghĩa bỏ mọi kiểm chứng bằng SQL/log/curl; cũng không giả vờ đã kiểm thực hành.

## 2. Lỗi cụ thể đã sửa

| Nhóm | Phát hiện → hành động |
|---|---|
| PostgreSQL | NUMERIC làm tròn trước CHECK; explicit identity không advance sequence; UUID không tự bảo đảm khó đoán. Bổ sung điều kiện/ví dụ và sửa đáp án UUID. |
| JWT | Policy yêu cầu exp/sub nhưng validator cũ chưa buộc tồn tại → thêm required claim validators cùng issuer/time/audience. |
| Refresh | Chain public register/login nhưng chặn refresh không cần access còn hạn → thêm route và giải thích filter/AuthService boundary. |
| OAuth | Ví dụ tích hợp bỏ rule DELETE ADMIN của JWT → khôi phục trước fallback. |
| Xuyên module | Prefix API và error body của ví dụ có thể lệch hợp đồng đã học → thêm ghi chú tích hợp, liên kết từ 5 README M3. |
| Rubric | Bỏ tiêu chí ngoài đề tại PostgreSQL L02 C2; Flyway L02 C6/C7; JWT L01 C3/L04 C3; OAuth L02 C3; OpenAPI L04 C6; Docker L02 C5/C7. Không giảm tiêu chuẩn kiến thức đã hỏi. |
| Danh mục | Bỏ trạng thái “chưa chấm” cũ trong README PostgreSQL; trỏ 05 làm nguồn tiến độ, không chỉnh điểm. |

Không rewrite nguyên lesson chỉ để làm mới; giữ kiến thức đúng, chỉ sửa phần có lý do. Không gọi module không có phát hiện là hoàn hảo tuyệt đối.

## 3. Verification đã thực hiện trong lượt này

| Phép kiểm | Kết quả và phạm vi |
|---|---|
| Structure toàn bộ | 37 lesson, 37 cặp đề/đáp án, 296 câu. 264 rubric bảng cộng đủ 5đ/câu; 32 rubric bullet PostgreSQL cộng/đọc thủ công. Local links/fences kiểm riêng. |
| Bảo toàn | SHA256 của 01, 05 và 37 đề giống baseline trước kiểm: 39/39. Không đổi câu trả lời, điểm, trạng thái, checklist, capstone. |
| PostgreSQL16 thật | SQL seed lấy FK42, repeat không duplicate/overwrite, thiếu Category insert0; nâng schema giữ data, view thay thế, CHECK failure rollback; paging root/count, NUMERIC rounding, identity collision, NULL semantics pass. |
| Security snippets | 2 snippet Security Core compile trên Security7/Framework7/Jackson3. 4 snippet JWT/OAuth compile, 12 decoder/converter assertions thật pass. |
| External client | 7 snippets compile; 98 assertions/14 tình huống ExchangeFunction mock pass. Nền Framework6.1.1/Reactor3.6: không phải Boot4 integration. |
| Docker Compose | Config/internal network/secrets kiểm; PostgreSQL healthy, DNS/password-file/write/read và recreate giữ volume pass trong QA project cô lập, đã cleanup. |
| CI | 3 workflow qua actionlint1.7.7 checksum-verified; 6 tổ hợp gate mô hình tĩnh pass. Không chạy ShellCheck/Pyflakes hay remote runner. |

Harness PostgreSQL lúc đầu chờ Unix socket khiến bắt nhầm server tạm trong init; đã sửa chờ TCP server cuối rồi chạy lại pass. Checker lúc đầu bỏ heading cấp3 và rubric có chú thích sau số điểm; đã sửa parser. Đây là lỗi công cụ kiểm, không ghi thành lỗi bài học.

## 4. Phần chưa chứng minh

- Chưa chạy Flyway CLI/Boot migration history thật: SQL transaction pass không thay Flyway execution.
- Chưa chạy full JPA mappings/EntityGraph/fetch/count hoặc benchmark Hikari; bảng hiệu năng trong bài vẫn là giả định.
- Chưa chạy toàn Boot Security app, refresh DB race, browser Google Login/callback/account linking.
- Chưa chạy springdoc3 trên Boot4, HTTP socket/TLS stub hoặc external provider thật.
- Chưa build/run cả stack Spring+PostgreSQL+Redis; Compose QA chỉ kiểm phần DB/network/volume được mô tả.
- Chưa tạo PR/publish GHCR/kiểm branch rules và badge trên repository GitHub thật.

Các giới hạn này nằm rõ trong kết luận, không được xóa bằng chữ “đủ hết/đảm bảo không lỗi”. Không có phát hiện tĩnh bắt buộc còn bỏ ngỏ sau sửa; runtime còn cần khi bạn triển khai đúng ứng dụng.

## 5. Chạy lại kiểm cấu trúc

Từ repo:

```bash
node Notes/QUALITY_AUDIT_2026_10_07/verify-structure.mjs
```

Script kiểm số lesson/cặp, headings, slots, tổng rubric bảng, links và fences. Không chấm tính đúng của Java/SQL/lập luận. Mặc định dùng `PROTECTED_BASELINE.json` cùng thư mục: map đường dẫn tương đối → SHA256 chụp trước audit. Có thể truyền baseline khác làm tham số thứ hai. Baseline là mốc lịch sử, không tự cập nhật để che thay đổi; sau này bạn sửa bài thì checksum khác là bình thường, cần phân biệt với thay đổi ngoài ý muốn của lượt audit này.

Warning duy nhất về format học viên: đề PostgreSQL Lesson01 đã có fence không cân bằng trước audit. Giữ nguyên vì không sửa bài làm. Bốn warning legacy rubric chỉ nói checker không tự parse điểm bullet, không là phát hiện nội dung sai.

## 6. Đồng bộ Vault

Đích là `Documents/Learning_Vault/Software_Engineer`, không dùng bản Vault cũ trong Downloads. Đã copy 37 file theo `SYNC_MANIFEST.json`, đối chiếu byte từng file; giữ tạm 20 bản đích cũ trước copy. Chỉ gồm lesson/đáp án/README đã sửa và bộ audit; không copy đè 01/05 hoặc đề học viên. Không xóa tài liệu khác và không thay cơ chế sync thường ngày.
