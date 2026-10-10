# M3-3 JWT · Lesson 02 · Lần 1

PHONG_VAN theo lesson: 8×5=40đ, đạt34/40, 30–40  phút. Trả lời bằng lời/code ngắn. Giả định shopcore dùng JSON + Bearer header, chưa dùng cookie auth/Basic. Role claim là USER/ADMIN, converter thêm ROLE_.

## Câu 1 - Register và role

Client gửi email/password/role=ADMIN. Server nên nhận/trả DTO gì, cấp role gì và bảo vệ password thế nào?

**Trả lời:**

## Câu 2 - Trùng email đồng thời

Hai request cùng qua existsByEmail=false. Kiểm Service có đủ không? Cần DB bảo đảm gì và trả lỗi gì khi trùng?

**Trả lời:**

## Câu 3 - Login chạy thế nào?

Kể đường email/password qua AuthenticationManager/provider/UserDetailsService/PasswordEncoder tới TokenIssuer. Có được ký token trước authenticate không? Resource Server có tự tạo login không?

**Trả lời:**

## Câu 4 - Bearer request sau login

GET /api/products kèm token đúng đi qua những trách nhiệm nào trước Controller? Có cần gửi password và query User DB trong mọi request không?

**Trả lời:**

## Câu 5 - Stateless có DB không?

Giải thích STATELESS của API chain. Có DB users/refresh thì còn gọi stateless được không? User bị disabled trong DB lúc JWT vẫn còn hạn thì điều gì có thể xảy ra?

**Trả lời:**

## Câu 6 - Role converter

Payload roles=["ADMIN"] nhưng mặc định chỉ map scope; route hasRole("ADMIN") bị403. Giải thích và nêu sửa converter. Nếu claim đã là ROLE_ADMIN mà vẫn prefix ROLE_ thì sao?

**Trả lời:**

## Câu 7 - Lỗi do ai bắt?

Phân biệt: JSON login sai; password sai; AppException email trùng; Bearer signature sai. Với mỗi case nêu status và nơi xử lý phù hợp. Không cần nhớ đúng tên mọi exception.

**Trả lời:**

## Câu 8 - Review security assumptions

Dev nói “JWT nên tắt CSRF toàn app, refresh cookie cũng vậy; permitAll login nghĩa là Bearer hỏng không bị filter kiểm”. Sửa hai ý này và nêu cách bảo vệ TokenResponse khỏi cache/log.

**Trả lời:**
