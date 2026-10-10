# M3-4 OAuth2/OIDC · Lesson 01 · Lần 1

PHONG_VAN theo lesson 8×5=40đ, đạt34/40. 25–35  phút. Bối cảnh backend shopcore dùng Google Login authorization code và OIDC, API riêng dùng local JWT như M3-3. Không cần thuộc toàn bộ spec.

## Câu 1 - Bốn vai trò

Gắn resource owner/client/authorization server/resource server vào ví dụ shopcore xin profile Google của bạn. Browser có phải luôn là OAuth client không?

**Trả lời:**

## Câu 2 - Một app nhiều vai trò

Shopcore vừa Google Login vừa cung cấp /api/products nhận local JWT. Trong hai quan hệ nó có vai trò gì? Google API và shopcore API có cùng hợp đồng token không?

**Trả lời:**

## Câu 3 - OAuth2, OIDC, JWT

Phân biệt ba khái niệm. OAuth2 access token bắt buộc là JWT không? Muốn thông tin xác thực OIDC thì scope nào quan trọng?

**Trả lời:**

## Câu 4 - Code, ID token, access token

Mô tả mục đích của ba thứ và ai nhận/dùng. Có gửi authorization code làm Bearer gọi API được không?

**Trả lời:**

## Câu 5 - Đổi token cho API

ID token Google aud=google-client-id. API shopcore đòi local issuer và aud=shopcore-api. Có dùng ID token này gọi API luôn không? Google access token có tự cấp ADMIN không?

**Trả lời:**

## Câu 6 - Kể code flow

Kể lượt browser→shopcore→Google→callback→token endpoint→local login. Password Google/client secret ở đâu? Code đổi qua browser hay backend?

**Trả lời:**

## Câu 7 - state, nonce, PKCE

Nêu thứ mỗi cơ chế ràng buộc. Có thay cả ba bằng một field state không? Confidential client có nên giả định PKCE luôn bật mà không kiểm cấu hình/request không?

**Trả lời:**

## Câu 8 - Tin email từ payload?

Dev Base64 decode ID token rồi lấy email tạo ADMIN nếu đuôi công ty. Thiếu kiểm chứng gì? Khóa danh tính external nên là gì và ai quyết định local role?

**Trả lời:**
