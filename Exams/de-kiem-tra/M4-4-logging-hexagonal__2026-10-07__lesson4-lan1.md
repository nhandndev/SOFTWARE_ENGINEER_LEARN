# M4-4 · Lesson04 · Hexagonal skeleton

**PHONG_VAN theo lesson · 8×5=40đ · 45–60 phút · đạt từ34/40.** Điểm=điểm thô/40×100. Được xem code Lesson04, nói bằng lời/pseudocode. Không yêu cầu vẽ C4 hoặc triển khai DDD. Chấm ranh giới/luồng/contract, không bắt tạo interface cho mọi class.

## Câu 1 - Đổi folder đã đủ chưa? (5đ)

Application có `new JpaPriceAdapter()` và trả `ResponseEntity<ProductEntity>`, dù folder đã chia domain/application/infrastructure. Chỉ ra dependency sai mục tiêu, đề xuất port/adapter và nơi DTO/HTTP/JPA nên ở. Vì sao tên folder chưa đủ?

**Trả lời:**

## Câu 2 - Hai chiều mũi tên (5đ)

Với code mẫu, kể luồng runtime Controller → QuoteShipping → ProductPricePort → Map adapter và gọi policy. Sau đó nêu chiều import/implements giữa use case, port, adapter, domain. Vì sao runtime gọi adapter mà use case không import adapter? Port có phải thêm một HTTP hop không?

**Trả lời:**

## Câu 3 - Chia trách nhiệm feature (5đ)

Xếp vào domain/application/infrastructure và giải thích: ngưỡng miễn phí500000; lấy giá rồi nhân quantity; Optional giá; JPA query/map Entity; JSON response và error status. Có bắt buộc interface cho policy/Controller không?

**Trả lời:**

## Câu 4 - Ai tạo bean? (5đ)

QuoteShipping không có @Service, ProductPricePort là interface. Nó được inject vào Controller bằng cách nào trong mẫu? Nêu vai trò @Bean/config, implementation thực, cách xử lý nếu có hai port bean và vì sao không new adapter trong use case.

**Trả lời:**

## Câu 5 - Theo dấu tiền và lỗi (5đ)

Adapter có Product10 giá250000. Dự đoán fee cho quantity1/2, Product không có, quantity0 và giá âm do adapter sai. Phân biệt lỗi input với lỗi dữ liệu nội bộ; liệu map mọi IllegalArgumentException thành400 có đúng không? Nêu nơi map HTTP lỗi.

**Trả lời:**

## Câu 6 - Contract và AppException (5đ)

Bạn muốn ProductPricePort trả JpaEntity hoặc SDK DTO và dùng ErrorCode chứa HttpStatus trong domain. Phân tích coupling, đề xuất kiểu trả/dữ liệu và nơi map exception/DTO. Lỗi DB kết nối có được giả Optional.empty để trả404 không? Có cần rewrite toàn app ngay không?

**Trả lời:**

## Câu 7 - Thay adapter, kiểm gì? (5đ)

Thay Map bằng JPA mà không đổi rule. Nêu các phần dự kiến giữ/sửa, test fake port cho use case (kể cả quantity0 không gọi port), và kiểm integration bổ sung cho adapter/web. Một unit test thuần Java có chứng minh query/transaction/Advice đúng không?

**Trả lời:**

## Câu 8 - Skeleton vừa đủ cho AI Engineer (5đ)

Bạn muốn thay provider model qua port. Mô tả contract bên application, adapter giữ gì, wiring ra sao và policy log dữ liệu nhạy cảm. Vì sao không tạo interface cho mọi class hoặc tự nhận đã có DDD/C4/tracing chỉ nhờ skeleton này?

**Trả lời:**
