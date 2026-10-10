# Kiểm chất lượng M3-3 · 2026-10-07

## Đối chiếu lesson → đề

| Bài | Câu → mục đã dạy |
|---|---|
| 1 | 1→2/4; 2→3; 3→3/5; 4→4/6; 5→2; 6→4/6; 7→4/5; 8→5 |
| 2 | 1→1/2; 2→2; 3→3; 4→4; 5→4; 6→5; 7→7; 8→6 |
| 3 | 1→1; 2→2; 3→4/6; 4→5; 5→5; 6→6; 7→1/3/4; 8→4/7 |
| 4 | 1→1; 2→1/2; 3→2; 4→3; 5→4/5; 6→4/5; 7→6; 8→7 |

Mỗi câu có đáp án riêng và rubric5đ. Không yêu cầu viết full project hoặc nhớ tên class chưa dạy. Các câu timeline ghi rõ offline validation/revocation policy để không có nhiều giả định ngầm.

## Ranh giới an toàn đã soát

- Decode khác verify; signature khác confidentiality; issuer/audience/time/algorithm có vai trò riêng.
- Không tự viết JWT filter/crypto; decoder và converter rõ responsibilities.
- CSRF disable chỉ scoped API header-only, không dùng chung cho browser/cookie refresh.
- Rotation cần atomic consume; revocation không được rollback do throw trong cùng transaction.
- Stateless auth không đồng nghĩa không DB; logout không tự hủy access JWT.
- @WithMockUser/jwt() không kiểm chữ ký; explicit authorities không kiểm roles converter.
- DTO class, không lộ passwordHash, không thêm code vào shopcore, không đổi tiến độ.

## Kiểm kỹ thuật

- Bộ kiểm chung hai module: 30 file Markdown, 38 link nội bộ hợp lệ, 56  câu và 56 dòng rubric, mỗi dòng đủ5đ. Các block JSON parse được; YAML Google config parse bằng Ruby YAML.
- Biên dịch bốn snippet cấu hình trích nguyên từ Markdown, chỉ thêm imports/class wrapper: decoder, converter, API/fallback chains, API/browser chains. `javac --release 21`, cache Security7.0.5 / Framework7.0.6; không chạy Boot context.
- Chạy10 assertions với NimbusJwtDecoder thật và RSA keypair test: token đúng, roles converter, wrong key, wrong issuer, wrong audience, expired ngoài skew, future nbf, payload tampered, alg none, prefix ROLE_ kép. Tất cả qua.
- Test trên chỉ chứng minh decoder/converter và khả năng compile snippet, không chứng minh login HTTP, method proxy, CSRF/CORS, transaction refresh hoặc BOM Boot 4.1.1 đã tích hợp.

## Giới hạn

Không dựng auth app, không chạy endpoint HTTP, không kiểm rotation concurrency bằng PostgreSQL. Các thuật toán transaction/refresh là pseudocode minh họa để người học triển khai sau. Không xác nhận deliverable hoặc điểm module.

Nguồn chính thức và từ khóa video có trong từng lesson. Video là gợi ý tìm, không giả vờ đã xem/verify. Compile cache khác runtime BOM Boot 4.1.1; không coi đó là kiểm tích hợp Boot.
