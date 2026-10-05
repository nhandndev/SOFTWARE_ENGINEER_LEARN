# Đáp án M1-2 - Spring MVC 3-layer & REST API - Lần 3

> Tổng điểm thô: 40. Điểm cuối = điểm thô / 40 * 100.

## Câu 1 - 5 điểm

Request vào Tomcat/DispatcherServlet. Spring MVC tìm `ProductController`. Jackson đọc JSON và tạo `CreateProductRequest` trước khi gọi method. Controller gọi Service. Service validate input, check Category tồn tại qua CategoryRepository, check SKU trùng qua ProductRepository, tạo Product và save. Repository lưu vào Map. Service map Product sang ProductResponse. Controller tạo `ResponseEntity` 201 + Location. Jackson đổi response object thành JSON.

## Câu 2 - 5 điểm

Controller method không chạy. JSON sai format nên Jackson parse fail trước khi tạo DTO. Đây là framework/request error. Handler nên bắt `HttpMessageNotReadableException`, trả `400 Bad Request`.

## Câu 3 - 5 điểm

Spring MVC cố convert `"abc"` sang `Long` khi resolve `@PathVariable`. Convert fail trước khi method chạy. Service/Repository không được gọi. Trả `400 Bad Request`, thường bắt `MethodArgumentTypeMismatchException`.

## Câu 4 - 5 điểm

Service nên phát hiện bằng cách hỏi CategoryRepository. GlobalExceptionHandler đổi exception thành HTTP response. Trả `404 Not Found` vì resource Category được tham chiếu không tồn tại.

## Câu 5 - 5 điểm

Request đúng cú pháp nhưng xung đột với trạng thái hiện tại vì SKU đã tồn tại, nên `409 Conflict`. Service phát hiện bằng cách hỏi ProductRepository.

## Câu 6 - 5 điểm

Trả `200 OK` với `content` rỗng nếu page/size hợp lệ. Page zero-based: page 0 có item 1-20, page 1 có 21-40, page 2 có 41-45, page 3 không còn item. Công thức: `fromIndex = page * size`, `toIndex = min(fromIndex + size, totalElements)`, `totalPages = ceil(totalElements / size)`. Với page 3, fromIndex = 60 >= 45 nên content rỗng.

## Câu 7 - 5 điểm

Các vấn đề:

- Controller gọi Repository trực tiếp.
- Không có Service.
- Dùng Product làm request body thay vì DTO.
- URL `/create` không RESTful.
- Business rule price nằm trong Controller.
- Trả `null` khi lỗi.
- POST không trả `201 Created`.
- Không có Location header.

Hướng sửa: POST `/api/products`, Controller nhận `CreateProductRequest`, gọi ProductService, Service validate và save qua Repository, Controller trả `201 Created` + Location + ProductResponse.

## Câu 8 - 5 điểm

`GET /api/products?page=0&size=20`. Query param `page` default 0, `size` default 20. Validate `page >= 0`, `1 <= size <= 100`, sai trả 400. Response gồm `content`, `page`, `size`, `totalElements`, `totalPages`. Với Map in-memory, Service tính pagination sau khi lấy list từ Repository. Repository chỉ trả `List<Product>` hoặc dữ liệu nguồn, không biết HTTP/PageResponse.
