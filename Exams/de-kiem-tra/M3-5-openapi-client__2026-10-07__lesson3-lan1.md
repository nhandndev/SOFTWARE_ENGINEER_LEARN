# M3-5 · Lesson03 OpenAPI Contract · Lần1

PHONG_VAN theo lesson 8×5=40đ, đạt34/40,25–35 phút. Bối cảnh Boot4 MVC, DTO class, annotation-first; không yêu cầu thuộc syntax Swagger annotations.

## Câu 1 - Ba công cụ

Phân biệt OpenAPI, springdoc và Swagger UI. Try it out DELETE có chạy nghiệp vụ thật không? Docs có tự tạo endpoint/DB không?

**Trả lời:**

## Câu 2 - Dependency và URL

Trong Boot4 MVC chọn starter springdoc nào/nhánh version nào? JSON/YAML/UI mặc định ở đâu? Vì sao không copy Springfox hoặc springdoc2.x từ tutorial cũ?

**Trả lời:**

## Câu 3 - Luồng sinh tài liệu

Kể từ mapping/DTO/annotations tới spec rồi Try it out/runtime. springdoc có tự suy ra mọi business error và bảo đảm docs luôn đúng không?

**Trả lời:**

## Câu 4 - Schema không phải validation

DTO có @Schema(minimum="0",requiredMode=REQUIRED) nhưng Service trả fee=-1. Có chắc runtime bị chặn không? @Schema(hidden=true) passwordHash có chắc ngừng serialize không? Sửa đúng tầng.

**Trả lời:**

## Câu 5 - Mô tả quote endpoint

Nêu thông tin cần mô tả cho GET quote: route, query, input range, success DTO, các nhóm status400/401/403/422/502/503/504. Có phải thuộc nguyên cú pháp @ApiResponses không?

**Trả lời:**

## Câu 6 - Response wrapper và page

Runtime trả ApiResponse<PageResponse<ProductResponse>>, docs chỉ ghi array Product. Sai gì? Làm sao mô tả đúng và vì sao raw Object/ApiResponse.class có thể mất generic information?

**Trả lời:**

## Câu 7 - Trùng tên ApiResponse

Bạn có class ApiResponse<T> và annotation Swagger ApiResponse. Có import alias được không trong Java? Nêu cách tránh trùng và vì sao các response lỗi cần schema riêng so với200.

**Trả lời:**

## Câu 8 - Contract drift

Docs ghi201 nhưng Controller trả 200; docs ghi fee/currency/provider nhưng JSON bọc data; example ghi size100 nhưng runtime không giới hạn. Nêu cách phát hiện/sửa, và phần nào docs không thể tự thực thi.

**Trả lời:**
