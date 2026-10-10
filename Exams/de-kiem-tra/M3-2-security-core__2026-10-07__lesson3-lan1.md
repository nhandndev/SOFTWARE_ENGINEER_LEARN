# M3-2 Security Core — Kiểm tra Lesson03

> LESSON: 8×5=40đ, normalize /40×100; đạt từ34/40. Chấm tư duy/code ngắn, không cần imports. Bài giải riêng __DAPAN.md. Tình huống độc lập.

## Contract và giả định

GET products/detail public; GET me cần authentication; các request products ngoài GET public và admin/** cần ADMIN; còn lại denyAll. Basic auth; USER có ROLE_USER, ADMIN có ROLE_ADMIN; account active. Endpoints tồn tại và service thành công trừ khi câu nói khác. **CORS và CSRF đều hợp lệ** khi kiểm quyền; câu không yêu cầu triển khai JWT.

## Câu 1 (5đ) — Dependency và cấu hình
shopcore Boot4.1.1 chưa có Security. Cần starter gì, có nên pin Security6 riêng vì roadmap ghi6 không? Dùng loại bean/DSL nào thay adapter cũ? Bean chain có tự cung cấp UserRepository/schema không?

**Trả lời:**

## Câu 2 (5đ) — Rule rộng đứng trước
```java
auth.requestMatchers("/api/v1/products/**").permitAll()
    .requestMatchers("/api/v1/products/**").hasRole("ADMIN")
    .anyRequest().denyAll();
```
DELETE `/api/v1/products/10` match rule nào, lỗi gì so với contract? Sửa thứ tự/phạm vi method để GET public mà DELETE vẫn ADMIN. Nói rõ first match, không cần viết full config.

**Trả lời:**

## Câu 3 (5đ) — Ma trận kết quả
Theo contract đúng, nêu kết quả và lý do cho: (a) GET me không credentials; (b) GET admin/stats với USER đúng; (c) GET products không credentials; (d) DELETE Product10 đang có với ADMIN đúng; (e) ADMIN qua Security nhưng Service báo Product999 không có. Chỉ status không có lý do chưa đủ điểm.

**Trả lời:**

## Câu 4 (5đ) — Prefix và authenticated
Rule hasRole("ADMIN") đang gặp authority "ADMIN" (không ROLE_). Vì sao bị từ chối dù auth thành công? Sửa convention theo một trong hai cách. Nếu thay rule thành authenticated() có giữ đúng yêu cầu ADMIN không?

**Trả lời:**

## Câu 5 (5đ) — Fallback và chain scope
Theo policy deny-by-default, endpoint mới `/api/v1/reports` chưa khai báo sẽ ra sao về authorization? Nếu người khác giới hạn chain chỉ `/api/**` thì URL ngoài đó có tự nhận denyAll của chain này không? Query `?role=ADMIN` có cấp quyền không, vì sao?

**Trả lời:**

## Câu 6 (5đ) —401/403 ngoài MVC
Thiếu auth và sai Basic password cần401 JSON thống nhất; user đúng thiếu quyền cần403. Nêu vai trò AuthenticationEntryPoint/AccessDeniedHandler, vì sao chỉ sửa RestControllerAdvice chưa đủ. Với Basic401 cần header gì, HTTP status/body.status phải ra sao?

**Trả lời:**

## Câu 7 (5đ) — Tại sao hai chỗ entry point?
Trong bài, cấu hình entry point ở httpBasic và exceptionHandling. Hai nhánh lỗi nào cần xem để không lệch format? SecurityProblemWriter dùng Map + serializer thay vì nối chuỗi JSON có tác dụng gì; format có bắt buộc Java class ProblemDetail không? Có gửi raw exception/credentials ra client không?

**Trả lời:**

## Câu 8 (5đ) — Phép kiểm thực tế có điều kiện
Nêu bốn request để kiểm public GET, thiếu auth GET me, USER thiếuADMIN, ADMIN đủ quyền. Mỗi request nói credentials loại nào, status/body/header kỳ vọng và Controller có chạy không. Có được ghi “auth end-to-end đã chạy” nếu chỉ đọc bảng trong bài không? Khi thực hành thật, thiếu Controller/dependency/user config thì cần xử lý gì trước?

**Trả lời:**
