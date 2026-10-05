# YÊU CẦU THỰC HÀNH MINI PROJECT M1-4

> **Thư mục dự án code:** [`m1-4-validation-mini-project`](file:///Users/lilnhan/Downloads/SOFTWARE_ENGINEER_LEARN/m1-4-validation-mini-project)  
> **Mục tiêu:** Tự tay xây dựng từ đầu Custom Validator, DTO Validation và Global Exception Handler trả về `ProblemDetail` chuẩn RFC 7807 trong dự án Java.

---

## 🛠️ CÁC TASK THỰC HÀNH CẦN HOÀN THÀNH

### 📝 Task 1: Tạo Custom Validator `@ValidSku` & `ValidSkuValidator` từ đầu
- Tạo package: `com.shopcore.validation.validator`
- Tạo File 1: Annotation `@ValidSku.java` (gồm `@Constraint(validatedBy = ValidSkuValidator.class)`, `@Target`, `@Retention`, `message`, `groups`, `payload`).
- Tạo File 2: Class `ValidSkuValidator.java` implement `ConstraintValidator<ValidSku, String>`:
  - Regex SKU: `^[A-Z0-9](?:[A-Z0-9-]{1,28}[A-Z0-9])?$`
  - Xử lý safe-null: Nếu `value == null` hoặc `value.isBlank()` ➔ trả về `true`.

---

### 📝 Task 2: Gắn Validation cho DTO `CreateProductRequest.java`
- Mở file: [`CreateProductRequest.java`](file:///Users/lilnhan/Downloads/SOFTWARE_ENGINEER_LEARN/m1-4-validation-mini-project/src/main/java/com/shopcore/validation/dto/CreateProductRequest.java)
- Gắn các Annotation thích hợp:
  - `sku`: `@NotBlank` + `@ValidSku`
  - `name`: `@NotBlank` + `@Size(min = 2, max = 100)`
  - `price`: `@NotNull` + `@Positive`
  - `categoryId`: `@NotNull`

---

### 📝 Task 3: Kích hoạt Validation ở Controller
- Mở file: [`ProductController.java`](file:///Users/lilnhan/Downloads/SOFTWARE_ENGINEER_LEARN/m1-4-validation-mini-project/src/main/java/com/shopcore/validation/controller/ProductController.java)
- Thêm Annotation `@Valid` trước `@RequestBody CreateProductRequest request`.

---

### 📝 Task 4: Xây dựng `GlobalExceptionHandler.java` trả về `ProblemDetail`
- Mở file: [`GlobalExceptionHandler.java`](file:///Users/lilnhan/Downloads/SOFTWARE_ENGINEER_LEARN/m1-4-validation-mini-project/src/main/java/com/shopcore/validation/exception/GlobalExceptionHandler.java)
- Viết phương thức `@ExceptionHandler(MethodArgumentNotValidException.class)`:
  1. Duyệt `ex.getBindingResult().getFieldErrors()` để đưa lỗi vào `Map<String, String> errors`.
  2. Tạo đối tượng `ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Validation failed")`.
  3. Gán trường mở rộng `problem.setProperty("errors", errors)`.
  4. Trả về `ResponseEntity.badRequest().body(problem)`.

---

## 🧪 CÁCH BẠN KIỂM THỬ CODE
Sau khi viết xong code, mở terminal chạy lệnh Maven để verify xem code có compile thành công hay không:
```bash
mvn test-compile
```
Hoặc khởi chạy ứng dụng Spring Boot:
```bash
mvn spring-boot:run
```
Gửi request POST tới `http://localhost:8080/api/products` với JSON body rỗng `{}` để kiểm tra response lỗi `ProblemDetail` trả về `400 Bad Request`!
