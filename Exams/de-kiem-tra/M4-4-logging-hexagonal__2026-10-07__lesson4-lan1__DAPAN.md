# Bài giải M4-4 · Lesson04

40đ, đạt từ34đ. [Quy tắc](../../Notes/M4_DevOps_Engineering/M4_4_Logging_Hexagonal/QUY_TAC_CHAM.md). Chấp nhận thiết kế tương đương giữ đúng dependency/contract; không trừ vì thiếu interface inbound không bắt buộc.

| Câu | Ý được điểm, tổng5 |
|---|---|
| 1 | Application phụ thuộc concrete adapter (1); HTTP/entity leak (1); port do core dùng, adapter implements (1); mapping ngoài core (1); folder không bảo đảm dependency (1) |
| 2 | Runtime đến adapter rồi lấy giá/tính rule (1); application phụ thuộc port/domain (1); adapter phụ thuộc port (1); DI inject implementation (1); không HTTP hop qua interface (1) |
| 3 | Policy domain (1); phối hợp application (1); port core, JPA adapter ngoài (1); web DTO/status ngoài (1); không interface mọi class và lý do (1) |
| 4 | Config @Bean tạo core bean (1); implementation map qua port (1); constructor injection (1); chọn rõ khi nhiều bean (1); không new adapter để giữ inversion (1) |
| 5 | quantity1=30000, quantity2=0 (1); missing exception (1); quantity0 từ chối trước port (1); giá âm lỗi dữ liệu không mặc định400 (1); mapping ngoài core có phân loại (1) |
| 6 | Nhận diện JPA/SDK/HTTP coupling (1); contract giá độc lập framework (1); exception/DTO mapping bên ngoài (1); DB error không giả not-found (1); incremental/trade-off không rewrite toàn app (1) |
| 7 | Giữ rule/use case/port phù hợp (1); sửa adapter/wiring (1); fake test kết quả+quantity0 không gọi (1); adapter/web integration (1); unit không chứng minh query/transaction/Advice (1) |
| 8 | Contract nhu cầu app không SDK type (1); adapter SDK/timeout/credentials (1); wiring chọn implementation (1); không raw prompt/token/response (1); giới hạn skeleton, tránh interface vô ích (1) |

## Câu 1 - Dependency

Application new JpaPriceAdapter bị gắn concrete technology; ResponseEntity và Entity làm HTTP/persistence lan vào use case. Định nghĩa ProductPricePort trong core, adapter ngoài implements; mapping HTTP DTO/JPA data ngoài core. Đổi folder mà import giữ nguyên thì dependency vẫn sai mục tiêu.

## Câu 2 - Runtime/source

Controller gọi QuoteShipping; use case gọi findPrice qua port trên object MapProductPriceAdapter thật, lấy giá, nhân quantity và gọi policy. Source use case import port/domain, adapter implements/import port. DI nối object thực nên runtime đi ra ngoài dù source dependency hướng vào contract. Interface Java không tạo HTTP hop hay một process mới.

## Câu 3 - Vị trí

Policy domain; orchestration/nhân quantity trong application; Optional giá trong port application; JPA query/map Entity trong persistence adapter; response DTO/status ở web. Không cần interface policy/Controller khi không có boundary/lợi ích thực. Chấp nhận cách chia nhỏ tương đương, không chấm folder naming cứng.

## Câu 4 - Wiring

Configuration @Bean tạo policy, Map adapter như ProductPricePort và QuoteShipping; Spring inject vào constructor Controller. Interface không tự có instance. Nhiều implementation phải chọn qualifier/profile/config; use case không new concrete adapter để giữ phụ thuộc vào contract. @Service trong application là trade-off có thể có, mẫu này chọn plain Java.

## Câu 5 - Kết quả

250000×1 dưới ngưỡng →30000; ×2 bằng500000 →0. Missing →ProductMissingException; quantity0 →IllegalArgumentException trước port. Giá âm cũng bị policy từ chối nhưng nguồn là dữ liệu nội bộ, không phải client gửi giá. Không map mọi IllegalArgumentException thành400; web Advice phân loại, có thể thêm input exception riêng. Controller mẫu chưa tích hợp đầy đủ Advice, không hứa nó tự trả404đẹp.

## Câu 6 - Contract

JpaEntity/SDK DTO và HttpStatus kéo chi tiết ngoài vào core. Port trả Optional<BigDecimal> hoặc model core thích hợp; outer adapter map Entity/SDK data, web map exception sang AppException/ErrorCode/response nếu cần. DB unavailable không phải product missing, không trảempty để giấu lỗi. Có thể refactor feature từng bước và ghi nhận coupling AppException hiện tại; không bắt rewrite toàn bộ shopcore.

## Câu 7 - Thay thế

Giữ rule/use case và contract nếu semantics không đổi; thêm JPA adapter/mapping và đổi wiring. Fake port trả250000kiểm hai fee, empty kiểm missing, counter bảo đảm quantity0không gọi. Integration kiểm query, dữ liệu, transaction/mapping và HTTP/error handler. Java unit test không chứng minh các phần đó; “thay adapter” không nghĩa khỏi kiểm tích hợp.

## Câu 8 - Áp dụng vừa đủ

Application cần TextGenerationPort với input/output app sở hữu; adapter giữ SDK/auth/timeout/error translation, wiring chọn provider. Log operation/outcome/duration/context an toàn, không raw prompt/token/provider response. Tạo boundary khi có ý nghĩa, không interface mọi class. Skeleton không tự mang DDD/C4 hoặc tracing; những phần này vẫn ngoài scope hiện tại.

Ôn Lesson04 mục4–9, đặc biệt khác biệt runtime với source dependency.
