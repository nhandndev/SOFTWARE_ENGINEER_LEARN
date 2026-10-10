# Kế hoạch M3-5

| Checklist roadmap | Lesson | Câu kiểm tra |
| --- | --- | --- |
| WebClient hoặc OpenFeign, chọn và giải thích | 1 | 1–8 |
| Timeout, retry, error mapping | 2 | 1–8 |
| springdoc/OpenAPI3 annotations | 3 | 1–8 |
| Swagger UI + export openapi.json | 3/4 | Bài3 câu2; bài 4 câu4–8 |
| Security scheme Bearer JWT | 4 | 1–5 |

## Nối kiến thức đã học

- MVC: inbound JSON binding khác outbound response decoding; client HTTP không thay Repository.
- Config: base URL/credential từ config, không hard-code secret.
- JPA/PostgreSQL: không giữ transaction/connection DB trong lúc chờ external API nếu không cần; DB rollback không rollback remote side effect.
- REST: status upstream không nhất thiết bằng status local; DTO bảo vệ contract khỏi provider schema.
- JWT/Security: OpenAPI mô tả Bearer, SecurityFilterChain mới thực thi; Swagger UI không tự cấp token.

## Điều kiện chung của ví dụ

Local GET `/api/shipping/quote?postalCode=700000&weightGrams=500` gọi provider GET `/v1/quotes` cùng query. Provider dùng X-Api-Key riêng, không nhận JWT user của shopcore. Contract provider:200 trả amount/currency;404 nghĩa khu vực chưa hỗ trợ,401 nghĩa credential của shopcore sai. Đây là giả định bài học, không áp mọi provider ngoài đời.

Local policy: input 400; unsupported422; provider lỗi502; quá hạn 504; provider quota 429 được map 503. Không lấy số0 hoặc danh sách rỗng giả thành công khi dependency thất bại. Tổng deadline client operation không bao cả thời gian xử lý inbound MVC.

## Điều chưa được thực hiện

Deliverable roadmap vẫn là gọi một external API có error handling và expose UI/export trong shopcore. Tài liệu và đề không xác nhận đã merge/chạy. Không tạo project mới hoặc tick tiến độ. Khi thực hành phải chọn provider/stub thật, cấu hình credentials và kiểm network behavior.
