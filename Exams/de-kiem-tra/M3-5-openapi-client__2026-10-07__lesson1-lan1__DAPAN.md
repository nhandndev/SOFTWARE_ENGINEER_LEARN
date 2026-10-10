# Đáp án M3-5 · Lesson01

8×5=40đ, đạt34/40. Chấm ý nghĩa theo rubric, không trừ thiếu imports/tên operator khi giải thích đúng.

| Câu | Rubric /5 |
| --- | --- |
| 1 | Controller→Service→Client→provider và response ngược (2); hai HTTP boundary (1); Repository local persistence khác remote HTTP (1); không cần DB thì không ép Repository (1) |
| 2 | Chọn WebClient có lý do phù hợp (2); không đổi MVC server (1); Feign declarative interface (1); chọn một nhánh theo roadmap (1) |
| 3 | Decode provider DTO (1); Service/mapper sang local DTO (1); tách schema/contract (2); BigDecimal tiền tránh sai số (1) |
| 4 | Mono lazy/chưa có subscription không coi call hoàn tất (2); block subscribe và chờ (1); boundary MVC đồng bộ (1); servlet thread vẫn chờ, không event loop (1) |
| 5 | Không forward token khác audience tùy tiện (1); provider key riêng (1); config/env không secret trong code/log (1); SSRF/host tin cậy (2) |
| 6 | Connect chỉ thiết lập kết nối (1); redirect NEVER hạn chế đi host khác/lộ key (1); buffer giới hạn RAM body (1); không phải tổng timeout (2) |
| 7 | retrieve mặc định4xx/5xx lỗi (2); deadline (1); error mapping/retry policy (1); empty/schema validation (1) |
| 8 | Giữ connection/lock/thread không cần (2); DB rollback không rollback remote (2); idempotency/reconcile/compensation phù hợp (1) |

## Câu 1

Frontend→Controller→Service→CarrierClient→carrier, rồi DTO provider→DTO local→HTTP response. Đây là request inbound và outbound độc lập. Repository dùng đọc/ghi local data, carrier là hệ thống remote qua mạng. Feature không cần local DB thì không ép đường đi qua Repository.

Ôn lesson 1 mục 1. Chỉ kể Controller→Service→Repository chưa mô tả external boundary.

## Câu 2

WebClient hỗ trợ fluent API, control status/timeout và hướng streaming sau này. Dùng được trong MVC, không cần chuyển server WebFlux. Feign thường khai báo client bằng interface/annotations và cần integration phù hợp; roadmap chọn một, bài không học song song cả hai. Lý do khác hợp lý được tính, không bắt chọn vì “WebClient luôn tốt hơn”.

Ôn mục 3.

## Câu 3

HTTP codec decode thành CarrierQuote; Service/mapper chuyển amount→fee và thêm provider. Tách DTO giữ API local không phụ thuộc trực tiếp schema bên ngoài, tránh trả field không cần. BigDecimal phù hợp tiền vì tránh sai số floating-point double.

Ôn mục 2,5,7. Không bắt mapping phải đúng một tên class mapper duy nhất.

## Câu 4

Mono mô tả pipeline lazy; không subscribe hoặc được framework subscribe thì không coi call đã chạy xong. block subscribe và chờ đồng bộ. Dùng tại boundary MVC đồng bộ với timeout, servlet thread vẫn chờ; không block trên reactive event loop hoặc claim nonblocking end-to-end.

Ôn mục 6. Không dùng subscribe thủ công rồi trả 200 trước kết quả.

## Câu 5

JWT user dành shopcore, không tự là credential carrier. Dùng provider key riêng lấy config/env/secret store, không log. Base URL server quản lý; user-controlled URL có thể gọi internal/metadata SSRF. Dùng URI builder/query, không nối full URL tùy ý.

Ôn mục 4. Không bắt biết viết allowlist network hoàn chỉnh trong đề.

## Câu 6

Connect300ms chỉ giới hạn thiết lập kết nối, không toàn response. NEVER tránh redirect ngoài host với credential; buffer 64 KiB hạn chế RAM decode. Kết nối thành công rồi provider treo vẫn cần per-attempt/overall deadline.

Ôn mục 4 và bài 2 mục 1.

## Câu 7

retrieve mặc định chuyển 4xx/5xx thành WebClientResponseException, không DTO success. Cần deadline; error mapping và retry có giới hạn; kiểm empty body/schema/fields trước trả local 200. Ba phần đã liệt kê đều phải có, không chỉ nói “thêm try-catch”.

Ôn mục 6 và bài 2.

## Câu 8

Chờ network trong transaction có thể giữ DB connection/lock lâu. Rollback local không đảo side effect remote đã commit. Với payment phải có idempotency contract/reconcile hoặc compensation phù hợp, không tự retry vì nghĩ remote chưa làm.

Ôn mục 7. Không yêu cầu dựng saga framework.
