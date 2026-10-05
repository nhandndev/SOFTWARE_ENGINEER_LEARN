# Đáp án Bài kiểm tra M1-4 - Lesson 04

> Tổng điểm thô: 40 điểm. Normalize = (Điểm thô / 40) * 100.

---

## Câu 1 - 4đ
- Chuẩn chuẩn hóa phản hồi lỗi: **RFC 7807** (Problem Details for HTTP APIs).
- 4 thuộc tính cơ bản bắt buộc: `type`, `title`, `status`, `detail` (hoặc `instance`).

---

## Câu 2 - 4đ
2 lý do chính:
1. **Đồng nhất chuẩn quốc tế (Standardization):** Giúp Frontend/Clients và các Microservices khác dễ dàng parse lỗi mà không cần học format tự chế của từng dự án.
2. **Khả năng mở rộng linh hoạt (Extensibility):** Hỗ trợ thêm các trường tùy biến (`setProperty("errors", map)`, `setProperty("code", 400)`) mà không làm vỡ cấu trúc chuẩn.

---

## Câu 3 - 10đ
```java
public class CreateProductRequest {

    @NotBlank(message = "SKU is required")
    @ValidSku(message = "SKU format is invalid")
    private String sku;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be 2-100 characters")
    private String name;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than 0")
    private BigDecimal price;

    @NotNull(message = "Category ID is required")
    private Long categoryId;
}
```

---

## Câu 4 - 6đ
```java
@Override
public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null || value.isBlank()) {
        return true;
    }
    return value.matches(SKU_PATTERN);
}
```

---

## Câu 5 - 8đ
```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ProblemDetail> handleValidation(
        MethodArgumentNotValidException ex, 
        HttpServletRequest request
) {
    Map<String, String> errors = new LinkedHashMap<>();

    // 1. Duyệt lấy lỗi:
    for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
        errors.putIfAbsent(fieldError.getField(), fieldError.getDefaultMessage());
    }

    ProblemDetail problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.BAD_REQUEST, 
            "Validation failed"
    );

    // 2. Gán trường errors mở rộng:
    problem.setProperty("errors", errors);

    return ResponseEntity.badRequest().body(problem);
}
```

---

## Câu 6 - 8đ
1. `price = -50`: Status **400 Bad Request** | Title: **`VALIDATION_FAILED`** (hoặc **`BAD_REQUEST`**)
2. `sku` trùng DB: Status **409 Conflict** | Title: **`DUPLICATE_SKU`** (hoặc **`CONFLICT`**)
3. `categoryId` không có: Status **404 Not Found** | Title: **`CATEGORY_NOT_FOUND`** (hoặc **`NOT_FOUND`**)
4. Nổ NullPointerException: Status **500 Internal Server Error** | Title: **`INTERNAL_SERVER_ERROR`**
