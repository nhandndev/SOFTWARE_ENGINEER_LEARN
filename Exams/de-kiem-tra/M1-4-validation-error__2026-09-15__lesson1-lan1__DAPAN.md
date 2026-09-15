# Đáp án M1-4 Validation & Error - Lesson 01

> Tổng điểm thô: 43 điểm.  
> Normalize: `điểm thô / 43 * 100`.

## Câu 1 - 3đ

Validation Error là lỗi dữ liệu đầu vào sai format hoặc sai giá trị, có thể phát hiện trước khi chạy nghiệp vụ.

Ví dụ:

```text
name rỗng -> 400
price <= 0 -> 400
categoryId null -> 400
```

## Câu 2 - 3đ

Business Error là request hợp lệ về format nhưng vi phạm rule hoặc trạng thái hiện tại của hệ thống.

Ví dụ:

```text
categoryId không tồn tại -> 404
SKU đúng format nhưng bị trùng -> 409
```

## Câu 3 - 3đ

| Tình huống | Loại | Status |
|---|---|---:|
| `name = ""` | Validation | 400 |
| `price = -1` | Validation | 400 |
| `categoryId = 999` không tồn tại | Business | 404 |
| SKU đúng format nhưng đã tồn tại | Business | 409 |

## Câu 4 - 3đ

```text
Client
-> FilterChain
-> DispatcherServlet
-> HandlerMapping
-> HandlerAdapter
-> Jackson JSON -> Request DTO
-> Bean Validation
-> Controller
-> Service
```

## Câu 5 - 3đ

`@RestControllerAdvice` tạo một nơi xử lý exception chung cho các REST Controller. `@ExceptionHandler` chỉ định method xử lý từng loại exception.

Không nên try/catch trong từng Controller vì code bị lặp, format lỗi không thống nhất và Controller bị nhiều code xử lý lỗi.

## Câu 6 - 3đ

```text
Jackson không tạo được DTO.
Bean Validation chưa chạy.
Xảy ra HttpMessageNotReadableException.
Controller method chưa chạy.
Service/Repository chưa chạy.
GlobalExceptionHandler trả 400 Bad Request.
```

## Câu 7 - 5đ

```text
Jackson tạo DTO thành công.
Bean Validation kiểm tra @NotBlank và @DecimalMin.
name rỗng và price âm -> validation fail.
Spring ném MethodArgumentNotValidException.
Controller method không chạy tiếp.
Service không được gọi.
Repository không được gọi.
GlobalExceptionHandler bắt exception và trả 400.
```

## Câu 8 - 5đ

```text
Jackson tạo CreateProductRequest.
Bean Validation pass.
Controller được gọi.
Controller gọi Service.
Service gọi Repository để tìm Category 999.
Không tìm thấy Category.
Service throw AppException(CATEGORY_NOT_FOUND).
GlobalExceptionHandler bắt AppException.
Trả 404 Not Found.
```

Lỗi business được quyết định ở Service dựa trên kết quả truy vấn Repository.

## Câu 9 - 5đ

```text
Spring cố convert query parameter "abc" thành int.
Convert thất bại trước khi gọi Controller method.
Xảy ra MethodArgumentTypeMismatchException.
Service và Repository không chạy.
GlobalExceptionHandler trả 400.
```

## Câu 10 - 10đ

Ví dụ:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiErrorResponse> handleAppException(
            AppException exception
    ) {
        ErrorCode errorCode = exception.getErrorCode();

        ApiErrorResponse response = ApiErrorResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(response);
    }
}
```

Chấm đủ khi có đủ 5 ý:

```text
@RestControllerAdvice
@ExceptionHandler(AppException.class)
Lấy ErrorCode
Tạo response code/message
Trả đúng HTTP status
```
