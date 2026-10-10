# M3-3 JWT · Lesson 01 · Lần 1

Chế độ PHONG_VAN theo lesson, 8  câu ×5 =40đ. Điểm /40×100, đạt từ 34/40. Khoảng 25–35  phút. Trả lời ý nghĩa, được tra tên API; không cần thuộc tên filter. Giả định JWT ký RS256, API yêu cầu issuer/audience và thời gian đúng.

## Câu 1 - Ba đoạn JWT

Mô tả header, payload, signature; signature bảo vệ những đoạn nào? Có thể xem payload chỉ bằng Base64URL decode không?

**Trả lời:**

## Câu 2 - Ký hay mã hóa?

Bạn định đưa passwordHash vào payload vì token “đã ký nên người ngoài không đọc được”. Nhận xét cả tính bí mật và rủi ro token bị đánh cắp.

**Trả lời:**

## Câu 3 - RSA key và restart

Ai giữ private/public key trong thiết kế RS256? API chỉ giữ public key có tự cấp JWT hợp lệ được không? Mỗi restart sinh key mới ảnh hưởng gì tới token cũ?

**Trả lời:**

## Câu 4 - Signature đúng vẫn bị chặn

Token đúng chữ ký, iss đúng, chưa hết hạn nhưng aud=["billing-api"]. Shopcore đòi aud có shopcore-api. Có nhận không, status nào và trước/sau Controller? Vì sao?

**Trả lời:**

## Câu 5 - Thời gian và subject

Giải thích sub, exp, nbf, iat, đơn vị thời gian. Token nbf ở tương lai xa có dùng ngay được không? Giả định chỉ chấp nhận skew nhỏ.

**Trả lời:**

## Câu 6 - Sửa role

Client sửa payload USER thành ADMIN giữ signature cũ. Dự đoán kết quả. Nếu token USER hoàn toàn hợp lệ gọi route ADMIN thì khác gì?

**Trả lời:**

## Câu 7 - Review pseudocode

```text
payload = base64Decode(token.split('.')[1])
userId = payload.sub
setAuthenticatedUser(userId, payload.roles)
```

Thiếu những kiểm tra nào trước khi tạo Authentication? Nêu cách dùng thư viện thay thế, gồm cả ràng buộc algorithm/key.

**Trả lời:**

## Câu 8 - Thêm audience validator

Một decoder đã kiểm issuer và timestamp. Dev gọi setJwtValidator(audienceOnly). Rủi ro gì? Nêu cách ghép validator và ba case âm cần test (ngoài happy path).

**Trả lời:**
