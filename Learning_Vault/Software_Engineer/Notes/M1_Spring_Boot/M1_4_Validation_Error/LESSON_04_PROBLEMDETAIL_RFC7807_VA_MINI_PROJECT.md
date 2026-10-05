# M1-4 - Lesson 04: Chuẩn Lỗi RFC 7807 (`ProblemDetail`) & Mini Project

> **Mục tiêu:** 
> 1. Chuẩn hóa format phản hồi lỗi API theo chuẩn quốc tế RFC 7807 (`ProblemDetail`) được tích hợp sẵn trong Spring Boot 3.
> 2. Hoàn thiện toàn bộ bài thực hành Mini Project của Module M1-4 với khung code được dựng sẵn (bạn chỉ cần điền đúng những vị trí cốt lõi).

---

## 1. `ProblemDetail` là gì?

`ProblemDetail` là một class tiêu chuẩn được giới thiệu từ Spring Boot 3.x (Spring 6) dựa trên chuẩn RFC 7807.

Trước đây, mỗi dự án tự chế một cấu trúc lỗi riêng (ví dụ `ApiErrorResponse`). Nhưng khi tích hợp với các ứng dụng khác hoặc thư viện bên thứ ba, cấu trúc này không đồng bộ. `ProblemDetail` sinh ra để giải quyết vấn đề đó với 5 thuộc tính chuẩn:

```json
{
  "type": "https://shopcore/errors/validation-failed",
  "title": "VALIDATION_FAILED",
  "status": 400,
  "detail": "Dữ liệu gửi lên không đúng định dạng",
  "instance": "/api/products"
}
```

- **`type`**: Đường link URI dẫn tới tài liệu mô tả lỗi (hoặc mã lỗi phân loại).
- **`title`**: Tên lỗi vắn tắt, ngắn gọn.
- **`status`**: Mã HTTP Status Code (`400`, `404`, `409`, `500`...).
- **`detail`**: Câu mô tả chi tiết lỗi dành cho người dùng / lập trình viên đọc.
- **`instance`**: Đường dẫn API (URI path) xảy ra lỗi.

---

## 2. So sánh `ApiErrorResponse` (Custom) vs `ProblemDetail` (RFC 7807)

```java
// CÁCH CŨ (Custom thủ công):
ApiErrorResponse response = ApiErrorResponse.builder()
        .code(400)
        .message("Lỗi validation")
        .build();

// CÁCH MỚI (Chuẩn RFC 7807 trong Spring Boot 3):
ProblemDetail problem = ProblemDetail.forStatusAndDetail(
        HttpStatus.BAD_REQUEST,
        "Dữ liệu gửi lên không đúng định dạng"
);
problem.setTitle("VALIDATION_FAILED");
problem.setProperty("code", 400); // Thêm trường mở rộng nếu thích
```

---

## 3. Khung Code sẵn cho `GlobalExceptionHandler` dùng `ProblemDetail`

*(Đây là khung đã viết sẵn 90%, bạn chỉ cần nắm luồng và áp dụng vào dự án).*

```java
package com.shopcore.common.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Xử lý lỗi Nghiệp vụ (AppException)
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

    // 2. Xử lý lỗi Validation DTO (MethodArgumentNotValidException)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> errors = new LinkedHashMap<>();

        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errors.putIfAbsent(fieldError.getField(), fieldError.getDefaultMessage());
        }

        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST,
                "Dữ liệu đầu vào không hợp lệ"
        );

        problem.setTitle("VALIDATION_FAILED");
        problem.setType(URI.create("https://shopcore.com/errors/validation-failed"));
        problem.setProperty("code", 400);
        problem.setProperty("path", request.getRequestURI());
        problem.setProperty("errors", errors); // Đưa danh sách map các field bị lỗi vào

        return ResponseEntity.badRequest().body(problem);
    }
}
```

---

## 🛠️ PHẦN THỰC HÀNH MINI PROJECT (CHỈ ĐIỀN CHỖ CẦN THIẾT)

Khung code DTO đã dựng sẵn bên dưới. Bạn chỉ cần **điền đúng các Annotation Validation thích hợp** vào vị trí `/* TODO: Điền Annotation ở đây */`.

### 📝 Task 1: Điền Annotation cho DTO `CreateProductRequest`

```java
package com.shopcore.dto;

import com.shopcore.common.validation.ValidSku;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class CreateProductRequest {

    /* TODO 1.1: Mã SKU không được để trống VÀ phải đúng format @ValidSku */
    // Điền Annotation ở đây:
    private String sku;

    /* TODO 1.2: Tên sản phẩm không rỗng, độ dài từ 2 đến 100 ký tự */
    // Điền Annotation ở đây:
    private String name;

    /* TODO 1.3: Giá sản phẩm không null VÀ phải lớn hơn 0 (positive) */
    // Điền Annotation ở đây:
    private BigDecimal price;

    /* TODO 1.4: ID danh mục không được null */
    // Điền Annotation ở đây:
    private Long categoryId;
}
```

---

### 📝 Task 2: Điền Code xử lý trong `ValidSkuValidator`

Chỉ điền đúng **1 dòng lệnh return** kiểm tra Regex trong phương thức `isValid`:

```java
package com.shopcore.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidSkuValidator implements ConstraintValidator<ValidSku, String> {

    private static final String SKU_PATTERN = "^[A-Z0-9](?:[A-Z0-9-]{1,28}[A-Z0-9])?$";

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        /* TODO 2.1: Điền điều kiện kiểm tra null hoặc rỗng thì trả về true */
        if (/* Điền điều kiện ở đây */) {
            return true;
        }

        /* TODO 2.2: Kiểm tra value có match với SKU_PATTERN hay không */
        return /* Điền code return ở đây */;
    }
}
```

---

## 🎯 Bảng tra cứu đáp án tự kiểm tra nhanh

| Nhiệm vụ | Đoạn code chính xác cần điền |
|---|---|
| **Mã SKU** | `@NotBlank(message = "SKU is required")`<br>`@ValidSku(message = "SKU format is invalid")` |
| **Tên sản phẩm** | `@NotBlank(message = "Name is required")`<br>`@Size(min = 2, max = 100, message = "Name length must be 2-100")` |
| **Giá sản phẩm** | `@NotNull(message = "Price is required")`<br>`@Positive(message = "Price must be greater than 0")` |
| **ID Danh mục** | `@NotNull(message = "Category ID is required")` |
| **Validator `isValid`** | `if (value == null \|\| value.isBlank()) return true;`<br>`return value.matches(SKU_PATTERN);` |
