# Đáp án M1-2 - Spring MVC 3-layer & REST API - Lần 1

> Tổng điểm thô: 90. Điểm cuối = điểm thô / 90 * 100.

## Câu 1 - 3 điểm

- Controller: nhận/trả HTTP, đọc path/query/body, gọi Service, trả status/header/body.
- Service: xử lý business rule, phối hợp Repository, mapping DTO/model, ném exception.
- Repository: đọc/ghi dữ liệu, che giấu cách lưu trữ.

## Câu 2 - 3 điểm

Controller gọi Repository trực tiếp làm business rule phân tán, khó test, Controller biết quá nhiều về data access, phá luồng `Controller -> Service -> Repository`.

## Câu 3 - 3 điểm

`ResponseEntity` là khái niệm HTTP. Service nên độc lập với web layer để có thể tái dùng, test dễ hơn, và chỉ diễn đạt nghiệp vụ bằng return object/exception.

## Câu 4 - 3 điểm

DTO là hợp đồng API; model/entity là object nội bộ/lưu trữ. Không nên dùng thẳng model/entity vì dễ lộ field, client sửa field không được phép, API phụ thuộc schema, request/response thường khác nhau.

## Câu 5 - 3 điểm

- `@PathVariable`: lấy dữ liệu trong path, thường xác định resource.
- `@RequestParam`: lấy query string, thường dùng filter/search/page/sort.
- `@RequestBody`: đọc body JSON và convert thành object.

## Câu 6 - 3 điểm

`GET /api/products/10` tốt hơn vì REST dùng danh từ/resource, id nằm trong path để xác định resource cụ thể. `/getById` dùng động từ và query id kém RESTful hơn.

## Câu 7 - 3 điểm

Trả `201 Created`; nên có `Location: /api/products/{id}` hoặc URL resource mới.

## Câu 8 - 3 điểm

`204 No Content` dùng khi xử lý thành công nhưng không cần body, thường sau DELETE. Theo ý nghĩa HTTP, `204` báo không có nội dung response.

## Câu 9 - 3 điểm

- `400`: request sai cú pháp/input không hợp lệ, ví dụ name rỗng, price <= 0, page âm.
- `404`: resource không tồn tại, ví dụ Product id không có, Category id không có.
- `409`: request đúng nhưng xung đột state hiện tại, ví dụ SKU trùng, category name trùng, xóa category còn product.

## Câu 10 - 3 điểm

M1-2 học REST/3-layer/status/DTO, chưa học persistence. `Map` giúp tập trung vào luồng kiến trúc; sang M1-3 thay implementation bằng JPA mà Controller/Service ít đổi.

## Câu 11 - 5 điểm

Controller method thường chưa chạy. Spring MVC cố convert `"abc"` thành `Long` trong argument resolving và fail trước khi gọi method. Nên trả `400 Bad Request`, thường handle bằng `MethodArgumentTypeMismatchException`.

## Câu 12 - 5 điểm

Đây là framework/request error, không phải business error. Jackson parse JSON fail trước khi Controller method chạy. Nên handle `HttpMessageNotReadableException` và trả `400 Bad Request`.

## Câu 13 - 5 điểm

Service nên phát hiện bằng cách hỏi `CategoryRepository`. Trả `404 Not Found` vì Category được tham chiếu không tồn tại.

## Câu 14 - 5 điểm

Vì request đúng cú pháp và dữ liệu có nghĩa, nhưng xung đột với trạng thái hệ thống hiện tại: SKU đã tồn tại. Do đó `409 Conflict` phù hợp hơn `400`.

## Câu 15 - 5 điểm

Không bắt buộc. Có thể trả thẳng DTO. Nếu dùng `ApiResponse<T>` thì nên dùng nhất quán, tránh endpoint này bọc endpoint kia không bọc nếu không có convention rõ.

## Câu 16 - 5 điểm

Service ném `AppException`; exception đi lên web layer; `GlobalExceptionHandler` bắt `AppException`; lấy `ErrorCode`; dùng `httpStatus` để set HTTP status; dùng `code/message` để tạo `ApiErrorResponse`.

## Câu 17 - 5 điểm

`Optional<Product>` buộc caller xử lý trường hợp không có dữ liệu rõ ràng, tránh quên check null và giảm `NullPointerException`. Service có thể dùng `orElseThrow`.

## Câu 18 - 5 điểm

Nên trả `200 OK` với `content` rỗng nếu `page` và `size` hợp lệ. Đây không phải lỗi request; chỉ là trang đó không có item. Metadata vẫn nên đúng.

## Câu 19 - 10 điểm

Các vấn đề có thể nêu:

- Controller gọi Repository trực tiếp.
- Không có Service.
- Dùng `Product` làm request body, thiếu DTO.
- URL `/create` dùng động từ, không RESTful; nên POST `/api/products`.
- Business rule price nằm trong Controller.
- Lỗi price trả `null`, không có status/error rõ.
- POST trả mặc định `200` thay vì `201 Created`.
- Không có `Location` header.
- DELETE không check id tồn tại.
- DELETE trả `200` + text thay vì `204 No Content`.
- Repository/data logic lộ lên web layer.

Hướng sửa:

- Thêm ProductService.
- Controller chỉ gọi Service.
- Dùng CreateProductRequest/ProductResponse.
- Dùng `ResponseEntity.created(location).body(response)`.
- Service validate price và throw `AppException`.
- DELETE service check tồn tại, controller trả `noContent()`.

Chấm tối đa nếu nêu >=5 vấn đề hợp lý và hướng sửa đúng.

## Câu 20 - 10 điểm

Đáp án kỳ vọng:

- Method/URL: `GET /api/products?page=0&size=20`.
- Query param: `page`, `size`, có default.
- Response: `content`, `page`, `size`, `totalElements`, `totalPages`.
- Validate: `page >= 0`, `1 <= size <= 100`; sai trả `400`.
- In-memory thì Service hoặc helper trong Service tính pagination sau khi lấy list từ Repository.
- Repository chỉ trả list hoặc dữ liệu nguồn, không biết HTTP.
- Công thức: `fromIndex = page * size`, `toIndex = min(fromIndex + size, totalElements)`, `totalPages = ceil(totalElements / size)`.
