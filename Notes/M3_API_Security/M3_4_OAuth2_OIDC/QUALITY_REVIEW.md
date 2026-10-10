# Kiểm chất lượng M3-4 · 2026-10-07

## Đối chiếu lesson → đề

| Bài | Câu → mục đã dạy |
|---|---|
| 1 | 1→2; 2→2/3; 3→1/3; 4→3/4; 5→3; 6→4; 7→5; 8→6 và local-role boundary mục 7 |
| 2 | 1→1; 2→2; 3→3; 4→4; 5→2; 6→1/6; 7→5; 8→4/6 |
| 3 | 1→1/2; 2→3; 3→2/4; 4→1/5; 5→2/4; 6→5; 7→6; 8→7 |

Mỗi câu8 có rubric5đ như các câu còn lại; tám câu/lesson. Đề ghi rõ OIDC đã validate trước khi kiểm business mapping. Không bắt người học tự dựng Authorization Server hoặc có Google credential để trả lời.

## Ranh giới an toàn đã soát

- OAuth2/OIDC/JWT không đồng nhất; ID token khác API access token.
- Callback xử lý bởi filters, không nhận email JSON rồi tin ngay.
- state/nonce/PKCE có ràng buộc riêng; không khẳng định confidential client luôn bật PKCE.
- API chain và browser chain first-match, session policy/CSRF khác nhau.
- Identity issuer+sub, email không auto-link; local status/roles quyết định quyền.
- Map DB phải nối tới principal/authorities, không chỉ lưu rồi bỏ qua Authentication.
- Không raw token URL, không client secret frontend; local logout không tự logout Google.

## Kiểm kỹ thuật

- Bộ kiểm chung hai module: 30 Markdown, 38 link nội bộ hợp lệ, 56  câu, 56 dòng rubric đủ5đ; JSON parse hợp lệ và YAML Google config parse bằng Ruby YAML.
- Snippet API/browser chains trích nguyên từ lesson 2, thêm imports/class wrapper và biên dịch `javac --release 21` với cache Security7.0.5 / Framework7.0.6. Đây không phải runtime Boot4.1.1 integration.
- Cùng lượt kiểm có 10 assertions decoder/converter JWT thật; không dùng kết quả đó làm bằng chứng OIDC callback/ID token validation đã chạy.
- Đã đọc đối chiếu đề với mục bài học theo bảng trên; scope giữ Google Login, local mapping, secrets/redirect, không xây authorization server.

## Giới hạn

Không có Google client credentials thật, không chạy provider login, callback, code exchange hoặc trình duyệt. Mock/compile không chứng minh Google integration. Snippet hai chain chưa có local mapping/success handler; bài3 chỉ rõ điểm cần ghép khi thực hành. Không thay POM, progress, capstone.

Nguồn Spring/Google/OpenID/RFC được dẫn trong từng lesson; từ khóa video chưa là video được verify. Test integration thật và delivery local token vẫn là phần thực hành sau, không được claim đã hoàn tất.
