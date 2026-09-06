# Đáp án M1-2 - Spring MVC 3-layer & REST API - Lần 2

> Tổng điểm thô: 58. Điểm cuối = điểm thô / 58 * 100.

## Câu 1 - 3 điểm

M1-2 học REST, 3-layer, DTO, status code, chưa học persistence. `Map` đóng vai trò database giả để CRUD chạy được mà không phân tâm bởi JPA/SQL. Repository che giấu cách lưu; nếu tách interface tốt thì sang M1-3 thay bằng JPA mà Controller/Service ít đổi.

## Câu 2 - 3 điểm

Business error: Service phát hiện theo rule nghiệp vụ, ví dụ SKU trùng, Category không tồn tại khi tạo Product, xóa Category còn Product, price <= 0.

Framework/request error: Spring/Jackson phát hiện khi bind/parse request, ví dụ `/products/abc` không convert được sang Long, JSON body sai format.

## Câu 3 - 3 điểm

`ErrorCode` mô tả lỗi: code, message, httpStatus. `AppException` mang `ErrorCode` từ Service ra ngoài. `GlobalExceptionHandler` bắt exception và đổi thành HTTP response JSON.

## Câu 4 - 3 điểm

`Optional<T>` nói rõ dữ liệu có thể không tồn tại, buộc caller xử lý case empty, giảm quên check null/NPE. Service có thể dùng `orElseThrow`.

## Câu 5 - 3 điểm

`page=0` là trang đầu tiên. Với 45 item, `size=20`: page 0 có 20 item, page 1 có 20 item, page 2 có 5 item, page 3 có 0 item.

## Câu 6 - 3 điểm

Không bắt buộc. Có thể trả thẳng DTO. Nếu dùng `ApiResponse<T>` thì nên dùng nhất quán theo convention, tránh endpoint này bọc endpoint kia không bọc. HTTP status vẫn nên nằm ở response status, không chỉ trong body.

## Câu 7 - 5 điểm

Controller method chưa chạy. Spring MVC fail ở bước resolve argument vì không convert được `"abc"` sang `Long`. Exception phù hợp: `MethodArgumentTypeMismatchException`. Trả `400 Bad Request`.

## Câu 8 - 5 điểm

Lỗi xảy ra trước Controller method. Đây là framework/request error vì JSON sai cú pháp. Jackson parse fail khi đọc body. Handler nên bắt `HttpMessageNotReadableException`, trả `400`.

## Câu 9 - 5 điểm

Service nên phát hiện bằng cách hỏi `CategoryRepository`. `GlobalExceptionHandler` đổi exception thành HTTP response. Status phù hợp là `404 Not Found`.

## Câu 10 - 5 điểm

Trả `200 OK` với `content` rỗng nếu `page` và `size` hợp lệ. Page zero-based: page 0 item 1-20, page 1 item 21-40, page 2 item 41-45, page 3 không còn item. Không phải lỗi request.

## Câu 11 - 10 điểm

Các vấn đề có thể nêu:

- Controller gọi Repository trực tiếp.
- Không có Service.
- Dùng `Product` làm request body, thiếu DTO.
- URL `/create` dùng động từ, không RESTful.
- Business rule `price <= 0` nằm trong Controller.
- Lỗi price trả `null`.
- POST tạo mới trả mặc định `200` thay vì `201`.
- Không có `Location` header.
- DELETE không check id tồn tại.
- DELETE trả `200` + body text, nên trả `204 No Content`.

Hướng sửa:

- Controller nhận DTO, gọi Service.
- Service validate rule và gọi Repository.
- Repository chỉ lưu/tìm/xóa.
- POST dùng `/api/products`, trả `201 Created` + `Location`.
- DELETE check tồn tại trong Service, Controller trả `ResponseEntity.noContent().build()`.

## Câu 12 - 10 điểm

Kỳ vọng:

- `GET /api/products?page=0&size=20`.
- Query param `page` default `0`, `size` default `20`.
- Validate `page >= 0`, `1 <= size <= 100`; sai trả `400`.
- Response gồm `content`, `page`, `size`, `totalElements`, `totalPages`.
- Với `Map` in-memory, Service tính pagination sau khi lấy list từ Repository.
- Repository chỉ trả `List<Product>`, không biết HTTP/PageResponse.
- Công thức: `fromIndex = page * size`, `toIndex = min(fromIndex + size, totalElements)`, `totalPages = ceil(totalElements / size)`.
- Nếu `fromIndex >= totalElements`, trả `content` rỗng.
