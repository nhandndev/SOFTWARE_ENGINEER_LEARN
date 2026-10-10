# M3-2 — Bài giải Lesson02

40đ; normalize /40×100. [Chấm nghiêm](../../Notes/M3_API_Security/M3_2_Security_Core/QUY_TAC_CHAM.md). Đủ bản chất và các vế mới đủ điểm; không chấm thuộc Lombok.

| Câu | Rubric5đ |
|---|---|
| 1 | User id/username/hash/enabled và Role id/name (1); many-to-many/join table (1); lưu hash không raw (1); unique username (1); unique cặp FK ở DB, Java/exists không chống race đủ (1). |
| 2 | Salt khiến hash khác bình thường (1); tạo/đổi encode rồi lưu (1); login matches raw/hash (2); không decrypt (1). |
| 3 | Encode rồi equals sai do salt (2); matches(candidate, storedHash) (1); không log raw/hash (1); hash không thay HTTPS (1). |
| 4 | UDS nạp theo username trả UserDetails (2); Repository lấy DB (1); provider điều phối/account/password (1); encoder kiểm raw/hash, không Controller/UDS tự so (1). |
| 5 | roles ADMIN thành ROLE_ADMIN (1); hasRole ADMIN kiểm ROLE_ADMIN (1); hasAuthority ADMIN kiểm chuỗi ADMIN khác (1); ADMIN không tự USER (1); cấp cả hai/hasAnyRole/hierarchy theo policy (1). |
| 6 | Có thể LazyInitializationException (1); fetch roles chủ động (1); map UserDetails trong transaction (1); readOnly không tự fetch (1); không trả entity/hash (1). |
| 7 | Client không được chọn role/status đặc thù (2); DTO allowlist + server gán policy (1); disabled/missing không auth thành công (1); auth failure public generic không leak existence (1). |
| 8 | Byte khác ký tự Unicode, không cắt âm thầm (1); cost đổi hiệu năng cần đo (1); không encode hash mỗi load (1); chọn/wire nguồn user rõ, không hai UDS mơ hồ (2). |

## Câu 1 —Schema cần constraint thật
**Đủ ý:** User có id/username/passwordHash/enabled; Role có id/name. Nhiều user–nhiều role qua user_roles; lưu hash không raw. UNIQUE username, PK/UNIQUE(user_id, role_id) cùng FK; Set chỉ ở memory, exists-check có race giữa transactions, DB constraint giữ toàn vẹn.

**Chấm nghiêm:** “Có Set nên DB không trùng” sai. Không bắt viết full DDL hoặc constraint name. Đọc L02 mục1/5.

## Câu 2 —Randomsalt là bìnhthường
**Đủ ý:** Hash khác vì salt, không phải encoder hỏng. Tạo/đổi thì encode raw và lưu hash; login dùng matches(raw, hash). BCrypt one-way, không decrypt để so password.

**Chấm nghiêm:** Dùng hash equals không được điểm matches. Rubric 2đ matches gồm raw password candidate 1đ, stored hash 1đ. Đọc L02 mục2.

## Câu 3 —Chữakếtluận lẫn code
```java
boolean valid = encoder.matches(candidate, storedHash);
```
**Giải thích:** Encode candidate tạo salt mới nên hash equals không đúng cách verify. Không log candidate hoặc hash; đây là dữ liệu nhạy cảm dù hash không phải raw. HTTPS vẫn cần vì password truyền qua Basic có thể đọc nếu HTTP.

**Chấm nghiêm:** Đổi thứ tự matches(hash, raw) sai semantics. Chỉ code đúng mà vẫn khẳng định hash thay HTTPS thiếu điểm an toàn. Đọc L02 mục2.

## Câu 4 —UDS nạp dữliệu, providerxácthực
**Đủ ý:** UDS nhận username để nạp UserDetails từ Repository DB. UserDetails chứa hash/quyền/flags. DaoProvider điều phối kiểm account/password, dùng encoder matches; không phải Controller hay UDS nhận raw để tự login.

**Chấm nghiêm:** UDS trả user không tự chứng minh password đúng. Không bắt tên filter nếu vai trò đúng. Đọc L02 mục3/6.

## Câu 5 —Roleprefix có ýnghĩa
**Đủ ý:** roles("ADMIN") tạo ROLE_ADMIN; hasRole ADMIN xét ROLE_ADMIN; hasAuthority ADMIN xét chuỗi ADMIN nên khác theo đề. Chỉ ROLE_ADMIN không tự có USER; cấp cả hai hoặc hasAnyRole/hierarchy khi policy cần.

**Chấm nghiêm:** Tên gọi ADMIN không tự là role hierarchy. Giải pháp ở vế cuối có thể rất ngắn, không cần code hierarchy. Đọc L02 mục4.

## Câu 6 —ChuẩnbịprincipaltrướcrờiDB
**Đủ ý:** LAZY roles chưa tải sau context đóng có thể lỗi initialize. Fetch roles có chủ đích (graph/fetch) và map giá trị thành Security UserDetails trong transaction, không trả entity lười để filter đọc. ReadOnly không tự fetch. API trả DTO public không passwordHash.

**Chấm nghiêm:** “Bật EAGER mọi nơi” không thay giải thích boundary/map. Không bắt cả graph và fetch join cùng lúc; một cách đúng là đủ. Đọc L02 mục5–6.

## Câu 7 —Không tin quyềnclienttựgửi
**Đủ ý:** Bind roles/enabled từ client có thể tự nâng quyền/kích hoạt account. Request DTO chỉ nhận field được phép, server gán role/status đúng policy. Disabled/missing user không auth thành công, public failure generic không phân biệt username có tồn tại.

**Chấm nghiêm:** Không bắt implement register hay account lifecycle module JWT. Chấp nhận client gửi ADMIN nhưng server ignore/reject theo contract; không được tin để gán quyền. Đọc L02 mục6–7.

## Câu 8 —Hashlưusẵn, nguồnuserchọnrõ
**Đủ ý:** 72 byte khác 72 ký tự, Unicode có thể nhiều byte; không cắt âm thầm. Cost cao tăng CPU/latency, cần đo. UDS đọc stored hash, không encode lại stored hash mỗi load. Chuyển sang DB thì thay/wire bean provider đúng, không để hai UDS mơ hồ rồi mong tự chọn.

**Chấm nghiêm:** Đề không yêu cầu con số cost production chuẩn. Không trộn hash {bcrypt} format khác nếu encoder trực tiếp trong giả định. Đọc L02 mục2/7.
