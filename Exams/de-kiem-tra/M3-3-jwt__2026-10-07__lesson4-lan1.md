# M3-3 JWT · Lesson 04 · Lần 1

PHONG_VAN theo lesson 8×5=40đ, đạt34/40, 30–40  phút. Giả định JWT API header-only đã tắt CSRF riêng chain, filters được bật; không yêu cầu nhớ imports. Role payload ADMIN, converter thêm ROLE_.

## Câu 1 - hasRole và hasAuthority

Authentication có ROLE_ADMIN. So sánh hasRole('ADMIN'), hasAuthority('ADMIN'), hasAuthority('ROLE_ADMIN'). Cần annotation cấu hình nào để @PreAuthorize hoạt động?

**Trả lời:**

## Câu 2 - Hai cổng

URL DELETE /api/products/10 cho USER hoặc ADMIN; ProductService.delete có @PreAuthorize ADMIN. USER hợp lệ có xóa được không? Nếu URL chặn trước thì method đã chạy chưa?

**Trả lời:**

## Câu 3 - Self-invocation

ProductService.archive gọi this.delete(id), còn delete có @PreAuthorize. Có thể dựa vào annotation để bảo vệ lời gọi nội bộ không? Giải thích proxy và cách bố trí boundary.

**Trả lời:**

## Câu 4 - Ownership

USER gọi GET /api/orders/90; order90 thuộc user khác. Chỉ check role đủ chưa? UserId để kiểm quyền lấy từ đâu, và vì sao userId request không đáng tin?

**Trả lời:**

## Câu 5 - @WithMockUser

Test @WithMockUser(roles="USER") nhận403 khi DELETE. Nó có chứng minh password login/chữ ký JWT đúng không? Nếu CSRF đang bật thì403 có thể do gì, và cần positive case nào để kiểm role chắc hơn?

**Trả lời:**

## Câu 6 - Mock JWT

Test dùng jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")) và nhận204. Nó kiểm decoder hoặc converter từ claim roles chưa? Nêu một test bổ sung cho mỗi phần chưa được kiểm.

**Trả lời:**

## Câu 7 - Test Bearer thật

Mô tả setup dùng key test/decoder thật, ba negative case khác nhau và một positive case. Vì sao mock JwtDecoder không chứng minh validation crypto? Nêu cách tránh test expiry bị clock skew làm sai kỳ vọng.

**Trả lời:**

## Câu 8 - Lỗi403 bị thành 500

ControllerAdvice bắt Exception trả 500, Service qua proxy ném AccessDeniedException. Rủi ro gì? Phân biệt handler nhánh filter và MVC/method, HTTP status với body ApiResponse.

**Trả lời:**
