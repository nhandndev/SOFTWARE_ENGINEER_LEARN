# M1-4 - Lesson 04: Chuẩn Ngoại Lệ API `ProblemDetail` (RFC 7807)

> **Mục tiêu:** Hiểu bản chất chuẩn hóa thông báo lỗi HTTP API theo chuẩn quốc tế RFC 7807 (`ProblemDetail`) tích hợp từ Spring Boot 3 / Spring Framework 6.

---

## 1. `ProblemDetail` là gì?

`ProblemDetail` là một class tiêu chuẩn được giới thiệu trong Spring Boot 3.x dựa trên thông số kỹ thuật **RFC 7807 (Problem Details for HTTP APIs)**.

Trước khi có RFC 7807, mỗi dự án hoặc công ty tự tạo một cấu trúc trả về lỗi riêng (ví dụ `ApiErrorResponse`). Việc này khiến các dự án Microservices hoặc Client (Frontend, Mobile) rất khó khăn khi phải parse các format lỗi khác nhau từ nhiều service.

`ProblemDetail` sinh ra với 5 thuộc tính chuẩn quốc tế:

```json
{
  "type": "https://shopcore.com/errors/validation-failed",
  "title": "VALIDATION_FAILED",
  "status": 400,
  "detail": "Dữ liệu đầu vào không đúng định dạng chuẩn",
  "instance": "/api/products"
}
```

### Giải thích các thuộc tính chuẩn:
- **`type` (URI):** Đường dẫn tới trang tài liệu mô tả chi tiết mã lỗi (hoặc định danh duy nhất của lỗi).
- **`title` (String):** Tiêu đề lỗi ngắn gọn, đọc hiểu ngay.
- **`status` (int):** Mã HTTP Status Code (`400`, `404`, `409`, `500`...).
- **`detail` (String):** Câu mô tả lỗi chi tiết dành cho người dùng hoặc lập trình viên debug.
- **`instance` (URI):** Đường dẫn URL API xảy ra lỗi (Request URI).

---

## 2. So sánh `ApiErrorResponse` (Tự chế) vs `ProblemDetail` (Chuẩn RFC 7807)

| Tiêu chí | `ApiErrorResponse` (Tự chế) | `ProblemDetail` (RFC 7807) |
|---|---|---|
| **Tính chuẩn hóa** | Tùy biến theo từng lập trình viên / dự án. | Đạt chuẩn quốc tế RFC 7807. |
| **Hỗ trợ sẵn** | Phải tự tạo class POJO / DTO. | Đã tích hợp sẵn trong Spring Boot 3. |
| **Mở rộng thuộc tính** | Thêm field vào class DTO. | Dùng `problem.setProperty("key", value)`. |
| **Khuyến nghị** | Dùng cho các bài tập nhỏ. | Dùng cho hệ thống Microservices & REST API chuẩn. |

---

## 3. Cách khởi tạo `ProblemDetail` trong Spring Boot 3

```java
// Tạo ProblemDetail cơ bản với HTTP Status và Detail
ProblemDetail problem = ProblemDetail.forStatusAndDetail(
        HttpStatus.BAD_REQUEST, 
        "Dữ liệu đầu vào không hợp lệ"
);

// Bổ sung các thông tin chuẩn
problem.setTitle("VALIDATION_FAILED");
problem.setType(URI.create("https://shopcore.com/errors/validation-failed"));

// Bổ sung các thuộc tính tùy biến mở rộng (Ví dụ: danh sách lỗi DTO, request path)
problem.setProperty("code", 400);
problem.setProperty("path", "/api/products");
```

---

## 4. Áp dụng `ProblemDetail` vào `GlobalExceptionHandler`

### 4.1. Handler cho Lỗi Nghiệp vụ (`AppException`)
```java
@ExceptionHandler(AppException.class)
public ResponseEntity<ProblemDetail> handleAppException(AppException ex, HttpServletRequest request) {
    ErrorCode errorCode = ex.getErrorCode();

    ProblemDetail problem = ProblemDetail.forStatusAndDetail(
            errorCode.getHttpStatus(),
            errorCode.getMessage()
    );

    problem.setTitle(errorCode.name());
    problem.setType(URI.create("https://shopcore.com/errors/" + errorCode.name().toLowerCase()));
    problem.setProperty("code", errorCode.getCode());
    problem.setProperty("path", request.getRequestURI());

    return ResponseEntity.status(errorCode.getHttpStatus()).body(problem);
}
```

### 4.2. Handler cho Lỗi Validation DTO (`MethodArgumentNotValidException`)
```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ProblemDetail> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
    Map<String, String> errors = new LinkedHashMap<>();

    // Duyệt danh sách các trường bị lỗi
    for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
        errors.putIfAbsent(fieldError.getField(), fieldError.getDefaultMessage());
    }

    ProblemDetail problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.BAD_REQUEST,
            "Validation failed"
    );

    problem.setTitle("VALIDATION_FAILED");
    problem.setType(URI.create("https://shopcore.com/errors/validation-failed"));
    problem.setProperty("code", 400);
    problem.setProperty("path", request.getRequestURI());
    problem.setProperty("errors", errors); // Đưa map errors vào response JSON

    return ResponseEntity.badRequest().body(problem);
}
```

---

## 5. Bảng tổng kết Lesson 04

- **RFC 7807:** Tiêu chuẩn hóa định dạng thông báo lỗi HTTP.
- **`ProblemDetail`:** Class có sẵn trong Spring 6 giúp tạo câu phản hồi lỗi chuyên nghiệp.
- **`setProperty("errors", errors)`:** Cách gắn danh sách lỗi validation DTO vào `ProblemDetail`.
