# Lesson 05 - `@ControllerAdvice` Va `@ExceptionHandler`

## 1. Van de neu khong co global handler

Neu Service throw:

```java
throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
```

ma khong co handler, response co the khong theo format minh muon.

Neu validation fail, Spring co response mac dinh nhung co the dai, kho doc, khong dong nhat voi API.

Muc tieu:

```text
Tat ca loi di qua mot noi.
Tat ca response loi co format ro rang.
```

## 2. `@RestControllerAdvice` la gi?

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
}
```

Nghia la:

```text
Class nay bat exception cho cac REST controller.
Method trong class nay co the xu ly exception va tra JSON response.
```

## 3. Bat `AppException`

```java
@ExceptionHandler(AppException.class)
public ResponseEntity<ApiErrorResponse> handleAppException(AppException e) {
    ErrorCode errorCode = e.getErrorCode();

    ApiErrorResponse response = ApiErrorResponse.builder()
            .code(errorCode.getCode())
            .message(errorCode.getMessage())
            .build();

    return ResponseEntity
            .status(errorCode.getHttpStatus())
            .body(response);
}
```

Luong chay:

```text
Service throw AppException
-> Exception bubble len Controller
-> Spring thay GlobalExceptionHandler co @ExceptionHandler(AppException.class)
-> Goi method handleAppException
-> Tra response theo ErrorCode
```

## 4. Bat validation error

Voi `@Valid @RequestBody`, khi fail:

```text
MethodArgumentNotValidException
```

Handler:

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ApiErrorResponse> handleValidation(MethodArgumentNotValidException e) {
    String message = e.getBindingResult()
            .getFieldErrors()
            .stream()
            .findFirst()
            .map(fieldError -> fieldError.getDefaultMessage())
            .orElse("Validation failed");

    ApiErrorResponse response = ApiErrorResponse.builder()
            .code(400)
            .message(message)
            .build();

    return ResponseEntity.badRequest().body(response);
}
```

Day la cach don gian: lay loi dau tien.

Neu muon chi tiet hon, tra list field errors.

## 5. Tra nhieu field error

Response:

```json
{
  "code": 400,
  "message": "Validation failed",
  "errors": {
    "sku": "Product sku is required",
    "price": "Product price must be greater than 0"
  }
}
```

Can DTO error response co:

```java
private Map<String, String> errors;
```

Handler:

```java
Map<String, String> errors = new LinkedHashMap<>();

for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
    errors.putIfAbsent(fieldError.getField(), fieldError.getDefaultMessage());
}
```

`putIfAbsent` giup neu mot field co nhieu loi thi lay loi dau tien.

## 6. Bat query/path param validation

Neu dung:

```java
@RequestParam @Min(0) int page
```

va Controller co `@Validated`, exception thuong la:

```text
ConstraintViolationException
```

Handler:

```java
@ExceptionHandler(ConstraintViolationException.class)
public ResponseEntity<ApiErrorResponse> handleConstraintViolation(ConstraintViolationException e) {
    String message = e.getConstraintViolations()
            .stream()
            .findFirst()
            .map(ConstraintViolation::getMessage)
            .orElse("Invalid parameter");

    return ResponseEntity.badRequest().body(
            ApiErrorResponse.builder()
                    .code(400)
                    .message(message)
                    .build()
    );
}
```

## 7. Bat sai kieu param

Vi du:

```http
GET /api/products?page=abc
```

Controller can:

```java
@RequestParam int page
```

Spring khong convert `"abc"` thanh int duoc.

Exception:

```text
MethodArgumentTypeMismatchException
```

Tra:

```text
400 Invalid parameter value
```

## 8. Bat JSON sai

Vi du:

```json
{
  "name": "Keyboard",
```

JSON sai cu phap.

Exception:

```text
HttpMessageNotReadableException
```

Tra:

```text
400 Invalid request body
```

## 9. Handler cuoi cung

```java
@ExceptionHandler(Exception.class)
public ResponseEntity<ApiErrorResponse> handleException(Exception e) {
    log.error("Uncategorized exception", e);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ApiErrorResponse.builder()
                    .code(9999)
                    .message("Loi he thong khong xac dinh.")
                    .build());
}
```

Dung de chan app lo stacktrace ra client.

Nhung khong duoc lam moi loi thanh 500. Hay bat cac exception cu the truoc.

## 10. Thu tu uu tien

Nen co cac handler:

```text
AppException
MethodArgumentNotValidException
ConstraintViolationException
MethodArgumentTypeMismatchException
HttpMessageNotReadableException
Exception
```

Tu cu the den tong quat.

## 11. Tu kiem tra

1. `@RestControllerAdvice` dung de lam gi?
2. `AppException` nen bat o dau?
3. DTO validation fail nem exception nao?
4. Query param validation fail nem exception nao?
5. Vi sao `Exception.class` phai de cuoi?

