# Rút Kinh Nghiệm M1-2 - Phần Common

> File này chỉ tổng kết phần **common** bạn đã làm trong `shopcore`. Chưa tổng kết `Category`, `Product` vì các phần đó chưa làm xong.

## 1. Bạn đã xây được gì?

Trong `common`, bạn đã tạo nền chung cho REST API:

```text
ApiResponse<T>
ApiErrorResponse
PageResponse<T>
AppException
ErrorCode
GlobalExceptionHandler
```

Đây là một bộ common khá giống project thật: có wrapper response, wrapper lỗi, mã lỗi tập trung, exception chung và nơi xử lý lỗi toàn cục.

## 2. Ý tưởng đúng nhất bạn đang có

Bạn tách lỗi thành hai nhóm:

```text
Business error
-> Service chủ động throw AppException(ErrorCode.X)
-> GlobalExceptionHandler đọc ErrorCode
-> trả code + message + HTTP status

Framework/request error
-> Spring/Jackson tự phát hiện
-> GlobalExceptionHandler bắt exception cụ thể
-> trả code + message
```

Cách nghĩ này đúng.

Ví dụ business error:

```text
PRODUCT_NOT_FOUND
DUPLICATE_SKU
CATEGORY_IN_USE
DUPLICATE_CATEGORY_NAME
```

Ví dụ framework/request error:

```text
GET /api/products/abc
JSON body sai format
request body thiếu hoặc không đọc được
```

Điểm quan trọng: không phải lỗi nào cũng cần custom exception riêng. Với project nhỏ, `AppException + ErrorCode` là đủ gọn.

## 3. Vai trò từng file

### `ApiResponse<T>`

Dùng cho response thành công nếu bạn muốn bọc dữ liệu:

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {}
}
```

Điểm cần nhớ:

- Nếu dùng wrapper này thì nên dùng nhất quán.
- Nếu không dùng thì controller có thể trả thẳng DTO.
- Đừng trộn lung tung trong cùng một module nếu không có lý do.

### `ApiErrorResponse`

Dùng cho response lỗi:

```json
{
  "code": 404,
  "message": "Product Not Found"
}
```

Bạn đã chọn style đơn giản:

```text
code + message
```

Vậy không cần field `HttpStatus status` trong body nữa. HTTP status đã nằm ở response status line rồi.

### `PageResponse<T>`

Dùng cho API phân trang:

```json
{
  "content": [],
  "page": 0,
  "size": 20,
  "totalElements": 100,
  "totalPages": 5
}
```

Kinh nghiệm:

- `content` là dữ liệu của trang hiện tại, không phải toàn bộ list.
- `totalElements` nên là `long`, vì số record thật có thể lớn.
- `PageResponse<T>` nên generic để dùng lại cho `ProductResponse`, `CategoryResponse`, hoặc các response khác.

### `ErrorCode`

Dùng để gom business error:

```text
code
message
httpStatus
```

Tên enum nên dùng `UPPER_SNAKE_CASE`:

```text
PRODUCT_NOT_FOUND
DUPLICATE_SKU
INVALID_PRODUCT_INPUT
```

Không nên đặt enum giống tên class:

```text
ProductNotFoundException
DuplicateSkuException
```

Vì enum đang mô tả **loại lỗi**, không phải class.

### `AppException`

Dùng để Service ném lỗi nghiệp vụ:

```java
throw new AppException(ErrorCode.DUPLICATE_SKU);
```

Ý nghĩa:

- Service không cần biết `ResponseEntity`.
- Service chỉ nói: nghiệp vụ này lỗi gì.
- Web layer tự đổi lỗi đó thành HTTP response.

### `GlobalExceptionHandler`

Dùng để gom lỗi toàn app:

```text
AppException -> business error
MethodArgumentTypeMismatchException -> path/query sai kiểu
HttpMessageNotReadableException -> JSON body sai
MethodArgumentNotValidException -> validation lỗi
Exception -> fallback 500
```

Đây là nơi hợp lý để chuyển Java exception thành HTTP response.

## 4. Luồng lỗi cần nhớ

### Case 1: Trùng SKU

```text
POST /api/products
-> Controller nhận request
-> Service kiểm tra sku
-> phát hiện trùng
-> throw new AppException(ErrorCode.DUPLICATE_SKU)
-> GlobalExceptionHandler bắt AppException
-> trả 409 + code/message
```

### Case 2: Product id không tồn tại

```text
GET /api/products/999
-> Controller nhận id = 999
-> Service gọi Repository
-> Repository trả Optional.empty()
-> Service throw AppException(ErrorCode.PRODUCT_NOT_FOUND)
-> Handler trả 404
```

### Case 3: Sai kiểu path variable

```text
GET /api/products/abc
-> Spring cố đổi "abc" thành Long
-> đổi thất bại
-> Controller method chưa chạy
-> MethodArgumentTypeMismatchException
-> Handler trả 400
```

### Case 4: JSON body hỏng

```text
POST /api/products
body: {"sku":}
-> Jackson đọc JSON
-> parse thất bại
-> Controller method chưa chạy
-> HttpMessageNotReadableException
-> Handler trả 400
```

## 5. Bài học rút ra

### 1. Common không phải nơi chứa business logic

`common` chỉ nên chứa đồ dùng chung:

```text
response wrapper
error wrapper
exception base
error code
global handler
page response
```

Rule kiểu `SKU không được trùng` vẫn nằm ở `ProductService`.

### 2. ErrorCode nên có ranh giới rõ

Với hướng của bạn:

```text
ErrorCode = business error + một vài request error chung
```

Cũng ổn. Nhưng cần nhất quán:

- Business error dùng trong Service.
- Framework error xử lý trong Handler.
- Không để Repository biết `ErrorCode` nếu chưa cần.

### 3. HTTP status và error body là hai thứ khác nhau

Ví dụ:

```http
HTTP/1.1 404 Not Found
```

Body:

```json
{
  "code": 404,
  "message": "Product Not Found"
}
```

Status là HTTP contract. Body là dữ liệu để client đọc dễ hơn.

### 4. Lombok chạy trong IntelliJ chưa chắc Maven đã chạy

Bạn gặp đúng lỗi này:

```text
IntelliJ nhìn ổn
Maven compile không thấy getter/builder/log
```

Kinh nghiệm:

- IntelliJ cần bật annotation processing.
- Maven cần cấu hình compiler plugin hoặc dependency đủ đúng.
- Sau khi sửa POM phải reload Maven.
- Luôn kiểm tra bằng `mvn clean compile`.

### 5. `PageResponse<T>` nên chuẩn từ đầu

Nếu pagination response chuẩn ngay từ đầu, sau này đổi từ `Map` sang JPA dễ hơn.

M1-2 tự tính page bằng list.

M1-3 có thể dùng `Page<T>` của Spring Data rồi map sang `PageResponse<T>`.

## 6. Checklist common hiện tại

Đã ổn:

- [x] Có `ApiResponse<T>`.
- [x] Có `ApiErrorResponse`.
- [x] Có `PageResponse<T>`.
- [x] Có `AppException`.
- [x] Có `ErrorCode`.
- [x] Có `GlobalExceptionHandler`.
- [x] `ErrorCode` đã đổi sang `UPPER_SNAKE_CASE`.
- [x] `PageResponse.totalElements` dùng `long`.
- [x] Handler có bắt path/query sai kiểu.
- [x] Handler có bắt JSON body sai.

Cần quyết định khi làm tiếp:

- [ ] Success response sẽ dùng `ApiResponse<T>` hay trả thẳng DTO?
- [ ] Business service sẽ dùng `AppException(ErrorCode.X)` nhất quán.
- [ ] Message lỗi có cần chi tiết hơn không, ví dụ kèm id/sku.

## 7. Khi làm Category/Product, áp dụng như nào?

Trong Service:

```text
Nếu không tìm thấy Product:
throw AppException(PRODUCT_NOT_FOUND)

Nếu SKU trùng:
throw AppException(DUPLICATE_SKU)

Nếu input nghiệp vụ sai:
throw AppException(INVALID_PRODUCT_INPUT)
```

Trong Controller:

```text
Không try/catch business error.
Không tự tạo error response.
Cứ gọi Service.
Handler sẽ lo lỗi.
```

Trong Repository:

```text
Không biết HTTP.
Không biết ResponseEntity.
Không trả DTO.
Chỉ trả model hoặc Optional/model list.
```

## 8. Câu tự kiểm tra

1. Vì sao `AppException` không nằm trong package `product`?
2. Vì sao `GlobalExceptionHandler` không nên chứa rule trùng SKU?
3. Vì sao `GET /api/products/abc` chưa vào Controller method?
4. Vì sao `ResponseEntity` không nên xuất hiện trong Service?
5. Khi nào dùng `ApiResponse<T>`, khi nào trả thẳng DTO?

## 9. Kết luận

Phần common của bạn đã có nền tốt để đi tiếp M1-2.

Điều cần giữ vững:

```text
Service ném lỗi nghiệp vụ.
GlobalExceptionHandler đổi lỗi thành HTTP response.
DTO là hợp đồng API.
PageResponse là hợp đồng pagination.
Repository không biết HTTP.
```

> Common tốt không làm app chạy thay domain, nhưng nó làm các domain sau này viết gọn và nhất quán hơn.
