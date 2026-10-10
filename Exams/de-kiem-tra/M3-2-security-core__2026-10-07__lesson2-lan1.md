# M3-2 Security Core — Kiểm tra Lesson02

> LESSON:8×5=40đ; normalize /40×100; đạt34/40. Không yêu cầu code project/imports. Bài giải riêng __DAPAN.md. Các case độc lập.

Giả định role DB lưu USER/ADMIN, Security dùng prefix ROLE_; BCryptPasswordEncoder trực tiếp, không DelegatingPasswordEncoder. Schema app_users/roles/user_roles theo bài.

## Câu 1 (5đ) —Model lưu gì?
Nêu field chính User/Role, quan hệ và join table. Password trong DB nên lưu gì? Username và cặp (user_id, role_id) cần constraint gì, vì sao Java Set/exists-check chưa đủ?

**Trả lời:**

## Câu 2 (5đ) —Hash khác nhau
Encode cùng raw password hai lần ra hash A khác hash B. Có phải encoder sai không? Đăng ký/đổi password làm gì, đăng nhập kiểm gì? Có decrypt được password theo cơ chế BCrypt để so sánh không?

**Trả lời:**

## Câu 3 (5đ) —Chữa kiểm password
Code `encoder.encode(candidate).equals(storedHash)` có đúng không? Sửa code/ý tưởng và giải thích. Có nên log candidate/storedHash để debug hoặc coi hash thay HTTPS không?

**Trả lời:**

## Câu 4 (5đ) —Ai chịu trách nhiệm?
Mô tả vai trò UserDetailsService, UserRepository, DaoAuthenticationProvider và PasswordEncoder khi Basic auth. UDS nhận gì/trả gì, có phải tự nhận password từ Controller để so không?

**Trả lời:**

## Câu 5 (5đ) —Prefix và role hierarchy
DB lưu role ADMIN; builder.roles("ADMIN") tạo authority gì? hasRole("ADMIN") và hasAuthority("ADMIN") có tương đương không? User chỉ có ROLE_ADMIN có tự thỏa hasRole("USER") không, nếu chưa cấu hình hierarchy/cấp thêm quyền? Nêu một cách thể hiện policy cho phép cả USER lẫn ADMIN.

**Trả lời:**

## Câu 6 (5đ) — Roles LAZY
Một người định trả thẳng ApplicationUser có roles LAZY chưa tải để filter duyệt sau transaction đóng. Ngoài việc entity chưa chắc đúng kiểu UserDetails, rủi ro dữ liệu là gì? Đề xuất fetch/map UserDetails và ranh giới transaction; readOnly có tự fetch không? Có trả nguyên entity/passwordHash qua API không?

**Trả lời:**

## Câu 7 (5đ) — Request tự xin ADMIN
Client gửi username/password và roles=[ADMIN], enabled=true rồi server bind thẳng ApplicationUser để lưu. Điểm nguy hiểm và ý tưởng DTO/server policy đúng là gì? Account disabled hoặc không tìm thấy user có được xem là auth thành công không? Public message có nên chỉ rõ username có tồn tại không?

**Trả lời:**

## Câu 8 (5đ) — Policy encoder và nguồn user
BCrypt giới hạn 72 byte có nghĩa 72 ký tự không? Nếu tăng cost cực cao thì đánh đổi gì? Có cần encode lại password mỗi lần UDS load không? Khi chuyển sang DB, giữ đồng thời UDS in-memory và DB rồi mặc định Security tự chọn đúng có ổn không?

**Trả lời:**
