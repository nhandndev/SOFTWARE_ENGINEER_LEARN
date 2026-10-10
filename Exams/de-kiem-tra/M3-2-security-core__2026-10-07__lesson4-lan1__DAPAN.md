# M3-2 — Bài giải Lesson04

40đ; normalize /40×100. [Chấm nghiêm](../../Notes/M3_API_Security/M3_2_Security_Core/QUY_TAC_CHAM.md). Các số status phải đi kèm điều kiện của phép kiểm; không tự khẳng định mọi403 cùng nguyên nhân.

| Câu | Rubric5đ |
|---|---|
| 1 | Browser giữ/gửi sessioncookie (1); server lưu/khôi phục auth theo session (1); STATELESS không dựa session nhớ auth (1); không cấm mọi component tạo session (1); request sau vẫn cần bằng chứng auth (1). |
| 2 | Browser tự gửi credentials tạo nguy cơ hành động trái ý (1); không cần đọc cookie/password/response (1); token chứng minh context request hợp lệ (2); CORS không thay CSRF (1). |
| 3 | a không tự miễn (1); b không tự miễn (1); c có thể cân nhắc theo threat model/scope (2); không miễn XSS/HTTPS/CORS (1). |
| 4 | Có thể403 trước Controller (1); không đủ kết luận thiếu role (1); permitAll không bỏ CSRF (1); abc không thay token server/context (1); kiểm token/repository/context/request thay tắt bảo vệ (1). |
| 5 | Khác origin do port (1); preflight hỏi method/header được phép (1); thường không credentials (1); CORS trước auth tránh chặn sai preflight (1); request thật vẫn auth/CSRF (1). |
| 6 | Wildcard origin+credentials không phù hợp (1); explicit allowlist (1); method/header/source phù hợp (1); bật CORS integration không chỉ permit OPTIONS (1); không mở mọi origin (1). |
| 7 | curl không thực thi SOP nên không chứng minh auth sai (1); kiểm origin/method/headers (1); preflight response/CORS headers/thứ tự integration (1); server client không bị browser CORS enforce (1); allow origin không auth thay (1). |
| 8 | GET user đúng thiếu ADMIN→403 không Controller (1); ADMIN write token thiếu→403 không Controller (1); valid preflight đúng CORS→2xx/header không business Controller (1); giữ các điều kiện khác đúng để tách nguyên nhân (1); disable+permitAll phá bảo vệ không chẩn đoán (1). |

## Câu 1 — Stateless là chính sách auth, không phép màu
**Đủ ý:** Session auth lưu authentication ở server theo session, browser giữ/gửi session ID cookie để khôi phục. STATELESS không dựa session nhớ SecurityContext, request sau vẫn cần bằng chứng. Thành phần khác như CSRF repository có thể tạo session; không cam kết toàn app không bao giờ có HttpSession.

**Chấm nghiêm:** “Có stateless nên request không cần chứng minh gì” sai. Không bắt thuộc SecurityContextRepository implementation. Đọc L04 mục1/4.

## Câu 2 — Gây hành động không cần đọc response
**Đủ ý:** Browser có thể tự gửi cookie hợp lệ khi bị trang khác kích thích request; server chỉ tin credentials tự gửi có thể làm đổi state trái ý user. Attacker không cần đọc password/cookie/response để hành động gây hại. Token thêm bằng chứng gắn context hợp lệ, cần đúng token của server/context. CORS không ngăn mọi request cross-site có tác dụng và không thay CSRF protection.

**Chấm nghiêm:** Không nói cookie chắc chắn được gửi mọi cross-site request, đề đã giả định đủ điều kiện. Rubric2đ token chia bằng chứng1đ và gắn context/server1đ. Đọc L04 mục2/4.

## Câu 3 — Xét cơ chế gửi credentials
**Đủ ý:** Basic browser và JWT cookie tự gửi không mặc định miễn CSRF dù stateless. Case chỉ header chủ động, không auto auth có thể cân nhắc disable trong scope sau khi xác minh threat model. Không miễn các vấn đề XSS/token storage/HTTPS/CORS; chữ JWT không quyết định toàn bộ.

**Chấm nghiêm:** Đáp “REST nên tắt hết” sai. Không bắt implement bearer; đây là so sánh threat model. Đọc L04 mục3.

## Câu 4 — Token thiếu có thể chặn trước quyền
**Đủ ý:** CSRF filter có thể403 trước Controller/auth hoàn tất, không kết luận ADMIN thiếu role. PermitAll chỉ authorization nên POST vẫn chịu CSRF. Header abc không là token server hợp lệ; kiểm cơ chế lấy/gửi token, repository/context cookie và header đúng. Không chữa bằng permitAll/disable toàn cục.

**Chấm nghiêm:** “Mật khẩu đúng thì CSRF tự đúng” sai. Không bắt hướng dẫn full SPA token lifecycle. Đọc L04 mục2/4/7.

## Câu 5 — Preflight không phải business POST
**Đủ ý:** Origin khác vì port khác. OPTIONS hỏi server cho phép POST và headers Authorization/Content-Type không; thường không credentials. CORS xử lý trước auth để valid preflight không bị401 do thiếu cookie/header auth. Request thật sau đó vẫn qua auth/quyền/CSRF theo config.

**Chấm nghiêm:** Không nói valid preflight nghĩa POST đã thực hiện hoặc authenticated. Không bắt status chính xác200 hay204, chỉ2xx/header phù hợp. Đọc L04 mục5.

## Câu 6 — CORS cần policy và integration
**Đủ ý:** Không wildcard origins cùng credentialed browser access; dùng allowlist frontend cụ thể. Cấp method/header cần thiết, source cho API, bật http.cors với nguồn đó. Permit OPTIONS không tự validate origin/tạo response CORS đúng. Không mở mọi origin để hết lỗi.

**Chấm nghiêm:** Chỉ đổi true→false không tự chứng minh client credentials vẫn hoạt động. Chấp nhận phương án khác nếu quy định rõ bỏ cookie/credentials và đổi client phù hợp, không phải mẹo ngầm. Đọc L04 mục6.

## Câu 7 — Browser và server client khác môi trường
**Đủ ý:** curl không enforce same-origin như browser nên không chứng minh password/role sai. Kiểm Origin/method/request headers; OPTIONS response và allow headers/origin/method; CORS source/integration/thứ tự trước auth. Non-browser client có thể gọi API/giả Origin, CORS không là firewall. Allow origin không cấp authentication.

**Chấm nghiêm:** “Chỉ frontend được CORS nên mọi API đã bảo mật” sai. Không cần xuất secret hoặc log Authorization để debug. Đọc L04 mục5–7.

## Câu 8 — Tách một nguyên nhân mỗi phép kiểm
**Đủ ý:**

1. USER auth đúng, GET admin/stats, không CORS/CSRF lỗi:403 thiếu ADMIN, Controller không chạy.
2. ADMIN auth đúng/rule đúng, POST Product nhưng token CSRF thiếu, không CORS lỗi:403 do CSRF, Controller không chạy.
3. OPTIONS preflight origin/method/headers đều allow, CORS integration đúng, không yêu cầu auth preflight:2xx+CORS headers; không thực hiện business Controller POST.

Giữ các điều kiện khác đúng giúp xác định một nguyên nhân. Tắt CSRF và permitAll mọi route chỉ loại bảo vệ, không chữa rule/token/CORS đúng.

**Chấm nghiêm:** Nếu case1 dùng POST thiếu token, không chứng minh403 do role. Không bắt JUnit. Đọc L04 mục7–8.
