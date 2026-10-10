# Đáp án M3-3 · Lesson 03

8×5=40đ; đạt34/40. Chấm policy đã cho, không tự thay bằng “refresh dùng nhiều lần” để né reuse.

| Câu | Rubric /5 |
|---|---|
| 1 | Access gọi API ngắn hạn (2); refresh cấp mới dài hơn (2); phân biệt opaque refresh với introspection access (1) |
| 2 | CSPRNG entropy cao (1); hash không raw (1); user/family/hạn/consumed/revoked (2); phân biệt password dễ đoán (1) |
| 3 | R1 consumed không cấp lại (1); reuse revoke family (1); R2 bị từ chối (1); A1 vẫn có thể dùng đến hạn vì offline (2) |
| 4 | Transaction mặc định chưa đủ (1); lock hoặc conditional update đúng (2); chỉ một winner (1); consume+insert mới atomic (1) |
| 5 | RuntimeException rollback (2); save chưa là commit (1); commit state rồi caller ngoài transaction báo lỗi hoặc policy tx tương đương an toàn (2) |
| 6 | Access còn hạn có thể vẫn nhận (2); cơ chế chặn thêm (1); chi phí state/lookup/vận hành (1); auth stateless vẫn có refresh DB (1) |
| 7 | POST JSON refresh credential (1); 200 token pair/no-store (1); 400 format,401 invalid và không cần access còn hạn (1); check refresh state/hạn (1); user status/roles hiện tại (1) |
| 8 | localStorage XSS (1); HttpOnly không hết CSRF (1); đổi cookie phải xét config chống CSRF (1); race/retry gây reuse/revoke (1); single-flight và policy recovery rõ (1) |

## Câu 1

Access dùng Bearer gọi API, ngắn hạn; refresh chỉ gửi tới endpoint cấp token mới, dài hơn và cần quản lý thu hồi. Refresh ngẫu nhiên không phải opaque access token/introspection server; API vẫn nhận JWT như roadmap.

Ôn lesson 3 mục 1. Không nhầm refresh là token quyền ADMIN cao hơn.

## Câu 2

Sinh CSPRNG ít nhất entropy đủ mạnh, ví dụ32 bytes; chỉ trả raw client, lưu hash tra cứu. DB có user/family, expires, consumed/revoked, liên kết replacement nếu cần. SHA-256 tra secret ngẫu nhiên entropy cao không cùng bài toán với password dễ đoán; password cần adaptive hash như BCrypt.

Phần 2đ model: user/family 1đ, hạn và trạng thái 1đ. Ôn mục 2.

## Câu 3

R1 đã consumed lúc 10:02;10:03 reuse kích hoạt revoke family. R2 thuộc family này nên10:04 refresh bị từ chối. A1 vẫn chưa hết hạn và API offline không biết family bị revoke, nên có thể nhận tới 10:10 theo skew. Revoke refresh không tự đổi chữ ký access.

Ôn mục 4 và6. Đừng cộng cơ chế denylist mà đề đã loại trừ.

## Câu 4

Không đủ chỉ transaction. Lock row hoặc UPDATE có điều kiện consumed_at IS NULL với affectedRows=1 để chỉ một winner consume; consume old và insert new trong cùng transaction. Cần xét khóa/check family khi revoke cạnh tranh. Một chiến lược rõ là đủ, không bắt cả hai.

Ôn mục 5. Dùng synchronized JVM không đủ cho nhiều instance nếu không nêu giới hạn.

## Câu 5

save tham gia transaction, RuntimeException cuối method làm rollback nên revoke có thể mất. Transaction service trả DeniedReuse sau khi ghi revoke; commit xong caller ngoài transaction mới throw AppException 401. Hoặc thiết kế transaction boundary/rollback policy khác có kiểm chứng, bảo đảm không bỏ qua các lỗi ghi DB thật.

Ôn mục 5. Chỉ thêm saveAndFlush chưa sửa được rollback vì flush không là commit.

## Câu 6

Không chặn ngay nếu chỉ revoke refresh. Thêm denylist jti, version/user state check hoặc cơ chế tương đương; phải duy trì state/lookup, TTL cleanup, tính sẵn sàng. STATELESS session auth không cấm refresh DB.

Ôn mục 6. “Xóa token ở frontend” không chặn bản sao attacker giữ.

## Câu 7

POST JSON {refreshToken}; thành công 200 access/refresh mới, no-store. Format sai 400; refresh invalid/expired/revoked 401. Không cần access còn hạn. Kiểm hash lookup, consumed/family/hạn, trạng thái user; role mới lấy nguồn nội bộ hiện tại. Không tự kéo dài family quá 7 ngày đã cho.

Ôn mục 1–4. Endpoint permitAll access không nghĩa ai cũng được cấp token.

## Câu 8

localStorage script đọc được khi XSS; HttpOnly hạn chế đọc cookie nhưng cookie tự gửi nên CSRF vẫn cần xét. Đổi sang cookie phải xem lại CSRF/SameSite/Secure và chain assumptions. Hai tab/retry có thể dùng R1 hai lần gây policy reuse/revoke; single-flight refresh và recovery/retry policy giảm lỗi, không hứa hết mọi timeout.

Ôn mục 4–7. Chấp nhận chiến lược client tương đương nếu giải thích giới hạn.
