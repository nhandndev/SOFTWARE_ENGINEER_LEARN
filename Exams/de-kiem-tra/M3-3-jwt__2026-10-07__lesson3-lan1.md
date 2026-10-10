# M3-3 JWT · Lesson 03 · Lần 1

PHONG_VAN theo lesson, 8×5=40đ, đạt34/40. 30–40  phút. Giả định access JWT offline10 phút, refresh ngẫu nhiên trong JSON body; rotation mỗi lần dùng, reuse thu hồi cả family; family có hạn tuyệt đối7 ngày. Không yêu cầu full code.

## Câu 1 - Vì sao hai token?

So sánh mục đích, nơi dùng, tuổi thọ access/refresh. Dùng refresh ngẫu nhiên có mâu thuẫn roadmap bỏ opaque access token + introspection không?

**Trả lời:**

## Câu 2 - Lưu refresh thế nào?

Nêu cách sinh token, DB giữ gì để kiểm token/rotation/family, và vì sao SHA-256 có thể dùng với token này nhưng không đủ cho password dễ đoán.

**Trả lời:**

## Câu 3 - Timeline

10:00 cấp A1/R1; A1 exp10:10. 10:02 refresh R1 thành công trả A2/R2. 10:03 ai đó dùng lại R1; policy revoke family. 10:04 R2 và A1 còn dùng được không? Giả sử API không kiểm denylist/version và chưa có logout khác.

**Trả lời:**

## Câu 4 - Hai request cùng R1

Hai transaction cùng đọc R1 chưa consumed rồi cùng cấp token. Chỉ @Transactional có đủ không? Nêu một chiến lược consume an toàn và phạm vi transaction.

**Trả lời:**

## Câu 5 - Revoked rồi throw

```java
@Transactional
public void refresh(...) {
    family.setRevoked(true);
    repository.save(family);
    throw new AppException(ErrorCode.INVALID_REFRESH_TOKEN);
}
```

Giả định AppException là RuntimeException, rollback mặc định. Vì sao trạng thái revoke có thể không còn? Sửa luồng sao cho revoke được commit trước báo lỗi.

**Trả lời:**

## Câu 6 - Logout tức thì?

Logout chỉ revoke refresh family. Access JWT còn 5  phút có bị chặn ngay không? Đề xuất một cách chặn ngay và chi phí; stateless auth có cấm refresh DB không?

**Trả lời:**

## Câu 7 - Refresh contract

Thiết kế request/response/status cho /api/auth/refresh. Access đã hết hạn có được refresh không? Cần kiểm gì về refresh và user/roles trước cấp token mới?

**Trả lời:**

## Câu 8 - Client storage và retry

So sánh nguy cơ localStorage và HttpOnly cookie; nếu chuyển refresh từ JSON sang cookie thì xem lại gì? Hai tab refresh đồng thời/retry sau timeout có thể ảnh hưởng rotation thế nào và giảm bằng cách nào?

**Trả lời:**
