# Đáp án M3-5 · Lesson03

8×5=40đ, đạt34/40; không chấm thuộc annotation syntax. Thông tin được tính khi nêu đúng trách nhiệm và contract.

| Câu | Rubric /5 |
| --- | --- |
| 1 | OpenAPI spec (1); springdoc generator (1); UI consumer (1); Try it out HTTP thật (1); docs không tạo nghiệp vụ/DB (1) |
| 2 | starter-webmvc-ui (1); springdoc3.x Boot4 (1); JSON/YAML/UI paths (2); compatibility khác tutorial cũ (1) |
| 3 | Mappings/DTO/annotations→springdoc→spec (2); UI đọc (1); HTTP qua runtime (1); không auto đủ business errors/bảo đảm contract (1) |
| 4 | Schema không validate runtime (2); hidden không bảo đảm ngừng serialize (1); runtime validation/logic (1); response DTO loại secret (1) |
| 5 | Method/route/query (1); constraints/ranges (1); success DTO (1); error statuses theo contract (1); không học thuộc syntax nhưng metadata phải đúng (1) |
| 6 | Thiếu wrapper/data/content/metadata (2); type generic/concrete thích hợp (1); kiểm exported schema (1); raw type mất thông tin (1) |
| 7 | Java không import alias (1); fully-qualified annotation hoặc naming rõ (1); wrapper khác annotation docs (1); lỗi schema/body thật không schema 200 (2) |
| 8 | So actual HTTP/status/body với exported spec (2); sửa runtime hoặc docs theo contract đúng (1); example không validate/default runtime (1); regression/review diff (1) |

## Câu 1

OpenAPI là specification; springdoc sinh spec từ Spring metadata; Swagger UI đọc spec và gửi thử HTTP. Try it out DELETE có side effect thật, không sandbox. Docs không tạo Controller/DB/logic thay code.

Ôn lesson 3 mục 1 và3.

## Câu 2

MVC chọn springdoc-openapi-starter-webmvc-ui nhánh3.x cho Boot4. JSON /v3/api-docs, YAML /v3/api-docs.yaml, UI /swagger-ui.html thường redirect tới /swagger-ui/index.html. Tutorial Springfox/springdoc2.x nhắm nền khác nên phải kiểm compatibility, không pin ngẫu nhiên.

Paths 2đ: JSON 1đ,YAML/UI 1đ. Ôn mục 2. Không yêu cầu nhớ số patch3.1.1 để đạt.

## Câu 3

Mappings/DTO/annotations được springdoc đọc thành spec; UI load spec; Try it out HTTP thật qua Security/MVC/Service. Business errors/handlers không được suy ra hoàn hảo, cần khai báo và đối chiếu actual response. Sinh tự động không là chứng minh đúng.

Ôn mục 3 và7.

## Câu 4

minimum/requiredMode mô tả schema, không tự chặn fee âm. hidden chỉ docs, không tự tắt Jackson serialization. Dùng validation/logic đúng ở runtime và response DTO không có passwordHash; đừng trông chờ annotation tài liệu giữ bí mật.

Ôn mục 4 và7.

## Câu 5

GET /api/shipping/quote; postalCode6 chữ số, weightGrams1–30000;200 ShippingQuoteResponse fee/currency/provider.400 input,401 thiếu/sai token,403 thiếu quyền,422 unsupported,502 dependency invalid,503 quota policy,504 timeout. Cần mô tả đúng ý, không cần chép nguyên syntax.

Ôn mục 5. Error statuses 1đ: nêu đúng đa số nhóm 0.5, đầy đủ 1; không trừ tiếp ở tiêu chí khác cho cùng thiếu sót.

## Câu 6

Array Product bỏ mất wrapper/data/content và metadata page/size/totals. Controller giữ generic concrete hoặc annotation/DTO thích hợp, rồi kiểm JSON schema thật. Raw Object/ApiResponse.class có thể mất type argument nên không bảo đảm nested generic được mô tả đúng.

Ôn mục 6. Không bắt tạo DTO mới nếu generic đã được springdoc suy ra đúng.

## Câu 7

Java không alias import. Dùng full-qualified Swagger annotation trong code như bài hoặc tên class wrapper rõ ràng. Annotation chỉ metadata; ApiResponse<T> là runtime body. Error schema phải theo handler thật, không gán success DTO cho401/422/504; nếu filter và Advice chưa thống nhất body thì tài liệu phải phản ánh.

Ôn mục 5. Không ép đổi tên wrapper người học đang dùng.

## Câu 8

Gọi HTTP thực để xem status/body, so spec export/UI. Chọn hợp đồng đúng rồi sửa Controller/DTO/annotations tương ứng, thêm regression check/diff review. Example không giới hạn size, không set default và responseCode201 không đổi runtime200. Cần logic/validation runtime riêng.

Ôn mục 6–7. “Sửa mỗi docs cho đẹp” không đủ nếu runtime trái contract mong muốn.
