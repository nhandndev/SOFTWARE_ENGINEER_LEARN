# Lesson 06 - ProblemDetail RFC 7807

## 1. ProblemDetail la gi?

`ProblemDetail` la format loi chuan trong Spring 6 / Spring Boot 3, dua tren RFC 7807.

No giup response loi co cau truc thong nhat:

```json
{
  "type": "about:blank",
  "title": "Bad Request",
  "status": 400,
  "detail": "Product name is required",
  "instance": "/api/products"
}
```

Trong Spring:

```java
ProblemDetail problem = ProblemDetail.forStatusAndDetail(
        HttpStatus.BAD_REQUEST,
        "Product name is required"
);
```

## 2. ProblemDetail khac ApiErrorResponse o dau?

ApiErrorResponse tu custom:

```json
{
  "code": 400,
  "message": "Product name is required"
}
```

ProblemDetail chuan hon:

```json
{
  "type": "https://shopcore/errors/validation-failed",
  "title": "Validation failed",
  "status": 400,
  "detail": "Product name is required",
  "instance": "/api/products"
}
```

| Format | Uu diem | Khi nao dung |
|---|---|---|
| `ApiErrorResponse` | Don gian, de tu custom | Project nho, dang hoc |
| `ProblemDetail` | Chuan HTTP/API, de mo rong | REST API nghiem tuc, module M1-4 |

## 3. Tao ProblemDetail cho AppException

```java
@ExceptionHandler(AppException.class)
public ResponseEntity<ProblemDetail> handleAppException(
        AppException e,
        HttpServletRequest request
) {
    ErrorCode errorCode = e.getErrorCode();

    ProblemDetail problem = ProblemDetail.forStatusAndDetail(
            errorCode.getHttpStatus(),
            errorCode.getMessage()
    );

    problem.setTitle(errorCode.name());
    problem.setType(URI.create("https://shopcore/errors/" + errorCode.name().toLowerCase()));
    problem.setProperty("code", errorCode.getCode());
    problem.setProperty("path", request.getRequestURI());

    return ResponseEntity.status(errorCode.getHttpStatus()).body(problem);
}
```

Response:

```json
{
  "type": "https://shopcore/errors/category_not_found",
  "title": "CATEGORY_NOT_FOUND",
  "status": 404,
  "detail": "Category Not Found",
  "code": 404,
  "path": "/api/products"
}
```

## 4. Tao ProblemDetail cho validation error

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ProblemDetail> handleValidation(
        MethodArgumentNotValidException e,
        HttpServletRequest request
) {
    Map<String, String> errors = new LinkedHashMap<>();

    for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
        errors.putIfAbsent(fieldError.getField(), fieldError.getDefaultMessage());
    }

    ProblemDetail problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.BAD_REQUEST,
            "Request validation failed"
    );

    problem.setTitle("VALIDATION_FAILED");
    problem.setType(URI.create("https://shopcore/errors/validation-failed"));
    problem.setProperty("code", 400);
    problem.setProperty("path", request.getRequestURI());
    problem.setProperty("errors", errors);

    return ResponseEntity.badRequest().body(problem);
}
```

Response:

```json
{
  "type": "https://shopcore/errors/validation-failed",
  "title": "VALIDATION_FAILED",
  "status": 400,
  "detail": "Request validation failed",
  "code": 400,
  "path": "/api/products",
  "errors": {
    "sku": "Product sku is required",
    "price": "Product price must be greater than 0"
  }
}
```

## 5. Nen dung ProblemDetail hay ApiErrorResponse?

Trong M1-4, nen hoc ProblemDetail vi lo trinh yeu cau.

Nhung neu project hien tai da co `ApiErrorResponse`, co 2 cach:

### Cach A: Doi handler sang ProblemDetail

Tot de hoc module.

### Cach B: Giu ApiErrorResponse, nhung hieu ProblemDetail

Chap nhan neu project dang theo style custom, nhung khi thi M1-4 phai giai thich duoc ProblemDetail.

Khuyen nghi cho ban:

```text
Lam mot branch/lesson rieng de doi GlobalExceptionHandler sang ProblemDetail.
Sau khi hieu, quyet dinh giu style nao cho shopcore.
```

## 6. ProblemDetail co phai thanh cong response khong?

Khong.

`ProblemDetail` chi dung cho loi.

Thanh cong van co the dung:

```java
ApiResponse<T>
```

Vi du:

```text
Success -> ApiResponse<ProductResponse>
Error   -> ProblemDetail
```

## 7. Tu kiem tra

1. ProblemDetail dung cho success hay error?
2. Cac field chuan cua ProblemDetail la gi?
3. Muon them `code` va `errors` thi dung method nao?
4. ProblemDetail khac ApiErrorResponse o dau?
5. Trong M1-4, validation fail nen tra ProblemDetail nhu the nao?

