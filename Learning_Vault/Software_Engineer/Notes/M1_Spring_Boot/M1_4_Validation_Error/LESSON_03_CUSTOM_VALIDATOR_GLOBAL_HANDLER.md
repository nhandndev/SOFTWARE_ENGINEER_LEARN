# M1-4 - Lesson 03: Custom Validator Và Global Exception Handler

> **Mục tiêu:** Tự viết được một quy tắc kiểm tra dữ liệu riêng (Custom Validator) và hiểu cách Ngoại lệ (Exception) từ Service/Controller ném ra trôi lên `@RestControllerAdvice` để trở thành HTTP Response thống nhất cho Client.

---

## 0. Lesson này học gì?

Trong các bài học trước, bạn đã nắm được:
- DTO được kiểm tra dữ liệu bằng các Annotation có sẵn (`@NotBlank`, `@Size`, `@Min`, `@Max`...).
- Annotation `@Valid` giúp kích hoạt quá trình kiểm tra cho Request Body.
- Lỗi định dạng (Format Error) và lỗi nghiệp vụ (Business Error) là hai nhóm hoàn toàn khác nhau.

**Trong Lesson 03, chúng ta sẽ làm 2 việc quan trọng nâng cao:**
1. **Tạo Custom Validator:** Quy tắc nào domain yêu cầu mà Annotation có sẵn không đáp ứng tốt thì tự viết rule riêng.
2. **Global Exception Handler:** Gom tất cả Exception từ nhiều nơi trôi lên về một chỗ và trả về format JSON thống nhất.

---

## 1. Khi nào dùng Custom Validator?

Các Annotation có sẵn rất phù hợp với các quy tắc cơ bản:

```java
@NotBlank
@Size(min = 2, max = 100)
@Positive
@Pattern(regexp = "...")
```

Tuy nhiên, có những quy tắc đặc thụ của nghiệp vụ (Domain Rule), ví dụ quy tắc cho **mã SKU sản phẩm**:
- Bắt buộc viết hoa.
- Chỉ bao gồm các ký tự `A-Z`, `0-9` và dấu gạch ngang `-`.
- Độ dài từ 3 đến 30 ký tự.
- Không được bắt đầu hoặc kết thúc bằng dấu gạch ngang `-`.

Ta có thể viết một chuỗi Regex dài trong `@Pattern`, nhưng việc tự tạo Annotation `@ValidSku` giúp mã nguồn rõ ràng, thể hiện đúng ý niệm nghiệp vụ và dễ tái sử dụng hơn rất nhiều:

```java
@NotBlank(message = "Mã SKU không được để trống")
@ValidSku(message = "Mã SKU không đúng định dạng chuẩn")
private String sku;
```

**Luồng hoạt động ý tưởng:**

```text
@ValidSku trên DTO
        │
        ▼
ValidSkuValidator.isValid(value, context)
        │
        ├──────► true  : Trường dữ liệu hợp lệ
        │
        └──────► false : Tạo lỗi Validation Error (ném MethodArgumentNotValidException)
```

---

## 2. Cấu trúc của một Custom Validator (2 Phần bắt buộc)

Để tạo ra một Custom Validator hoàn chỉnh trong Java / Spring Boot, bạn **luôn phải viết 2 file**:
1. **Annotation Interface:** Khai báo tên Annotation và các cấu hình metadata.
2. **Validator Class:** Cài đặt logic kiểm tra thực tế.

```text
ValidSku.java          (Annotation definition)
ValidSkuValidator.java (Logic implementation)
```

### 2.1. File 1: Annotation `@ValidSku`

```java
package com.shopcore.common.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Constraint(validatedBy = ValidSkuValidator.class) // Chỉ định class chứa logic kiểm tra
@Target({ElementType.FIELD, ElementType.PARAMETER}) // Cho phép gắn ở Field của DTO hoặc Tham số phương thức
@Retention(RetentionPolicy.RUNTIME)                // Giữ lại Annotation ở Runtime để Spring đọc được
public @interface ValidSku {

    String message() default "Format SKU không hợp lệ"; // Thông báo lỗi mặc định

    Class<?>[] groups() default {};                   // Nhóm validation (theo chuẩn Jakarta Validation)

    Class<? extends Payload>[] payload() default {};  // Metadata mở rộng (theo chuẩn Jakarta Validation)
}
```

### 2.2. Giải thích chi tiết các Annotation bổ trợ

| Annotation | Ý nghĩa và Vai trò |
|---|---|
| `@Constraint` | Đánh dấu đây là một Bean Validation Constraint và khai báo `validatedBy` để chỉ định Class xử lý logic. |
| `validatedBy` | Nối Annotation này với Validator Class thực tế sẽ chạy khi validate. |
| `@Target` | Giới hạn nơi có thể đặt Annotation (ở đây là `FIELD` trong DTO hoặc `PARAMETER` trong Controller). |
| `@Retention(RUNTIME)` | Đảm bảo Annotation không bị xóa sau khi biên dịch, giúp Spring Reflection đọc được ở Runtime. |
| `message()` | Thuộc tính chứa câu thông báo lỗi mặc định khi kiểm tra thất bại. |
| `groups()` | Cho phép phân nhóm kiểm tra (Validation Groups) khi cần validate nâng cao. |
| `payload()` | Chứa dữ liệu tải kèm bổ sung cho các công cụ đo đạc hoặc phân tích. |

### 2.3. File 2: Validator Class `ValidSkuValidator`

```java
package com.shopcore.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidSkuValidator implements ConstraintValidator<ValidSku, String> {

    // Ký tự đầu và cuối phải là A-Z hoặc 0-9. Ở giữa được phép chứa A-Z, 0-9, hoặc dấu - (độ dài 3-30)
    private static final String SKU_PATTERN = "^[A-Z0-9](?:[A-Z0-9-]{1,28}[A-Z0-9])?$";

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // NGUYÊN TẮC VÀNG: Nếu giá trị là null hoặc rỗng -> Trả về true!
        if (value == null || value.isBlank()) {
            return true;
        }

        return value.matches(SKU_PATTERN);
    }
}
```

Mối quan hệ Generic `ConstraintValidator<ValidSku, String>` được hiểu là:
- `ValidSku`: Annotation mà Validator này chịu trách nhiệm xử lý.
- `String`: Kiểu dữ liệu của trường (Field) cần được kiểm tra.

### 2.4. Tại sao `null` hoặc `blank` lại trả về `true`?

Chúng ta phân chia rõ ràng trách nhiệm của một trường trong DTO:

```java
@NotBlank(message = "SKU không được để trống")
@ValidSku(message = "SKU không đúng định dạng")
private String sku;
```

- **Khi không truyền giá trị (null/rỗng):** Do `@NotBlank` chịu trách nhiệm bắt lỗi.
- **Khi có truyền giá trị nhưng sai định dạng (ví dụ: `abc 001`):** Do `@ValidSku` chịu trách nhiệm bắt lỗi.

> 💡 **Quy tắc ghi nhớ:**
> - `@NotBlank`: Có bắt buộc phải nhập dữ liệu hay không?
> - `@ValidSku`: Dữ liệu đã nhập có đúng định dạng chuẩn hay không?
> 
> Nếu `@ValidSku` cũng trả về `false` khi `null`, client gửi một Request rỗng sẽ nhận về **2 câu lỗi trùng lặp** cho cùng một nguyên nhân.

---

## 3. Phân biệt Format Validation và Business Validation

### Format Validation (Kiểm tra định dạng)
- **Mục đích:** Kiểm tra xem dữ liệu client gửi lên có đúng hình dáng cấu trúc hay không.
- **Ví dụ:** Mã SKU chứa khoảng trắng (`"abc xyz"`), giá sản phẩm bị âm (`-50000`).
- **Đặc điểm:** Không cần truy vấn Database. Thất bại sẽ trả về **`HTTP 400 Bad Request`**.

### Business Validation (Kiểm tra nghiệp vụ)
- **Mục đích:** Kiểm tra xem dữ liệu có hợp lệ trong trạng thái hiện tại của hệ thống hay không.
- **Ví dụ:** Mã SKU `"KB-001"` đúng định dạng nhưng đã bị trùng trong Database; `categoryId = 999` không tồn tại.
- **Đặc điểm:** Phải do **Service Layer** kiểm tra vì cần gọi Repository truy vấn Database. Thất bại sẽ trả về **`HTTP 409 Conflict`** hoặc **`HTTP 404 Not Found`**.

```text
Custom Validator : Kiểm tra "Mã SKU này có viết đúng hình dáng quy định không?"
Service Layer    : Kiểm tra "Mã SKU này đã có ai dùng trong hệ thống chưa?"
```

> ⚠️ **CẢNH BÁO:** Không bao giờ autowired `Repository` vào `ValidSkuValidator` để check trùng DB. Việc làm này làm vi phạm nguyên tắc đơn trách nhiệm (SRP), khiến Validator bị phụ thuộc Database và vô cùng khó viết Unit Test.

---

## 4. Luồng xử lý khi Custom Validator bị sai (Fail)

Hãy nhìn vào luồng thực thi đầy đủ khi Client gửi thông tin tạo sản phẩm:

```java
// DTO
public class CreateProductRequest {
    @NotBlank
    @ValidSku
    private String sku;
}

// Controller
@PostMapping
public ResponseEntity<?> createProduct(@Valid @RequestBody CreateProductRequest request) {
    return ResponseEntity.ok(productService.createProduct(request));
}
```

**Kịch bản Client gửi Request sai format:** `{"sku": "abc 001"}`

```text
1. Request Body JSON tới HTTP Server
        │
        ▼
2. Jackson Mapper giải mã JSON thành Java Object CreateProductRequest
        │
        ▼
3. Annotation @Valid kích hoạt quá trình Bean Validation
        │
        ▼
4. Bean Validation đọc @ValidSku -> Gọi ValidSkuValidator.isValid("abc 001")
        │
        ▼
5. isValid() trả về false -> Bean Validation tạo ra FieldError cho field "sku"
        │
        ▼
6. Spring ném ra ngoại lệ MethodArgumentNotValidException
        │
        ▼
7. Controller Method bị chặn đứng (KHÔNG CHẠY dòng code nào bên trong)
        │
        ▼
8. Service Layer & Repository hoàn toàn KHÔNG ĐƯỢC GỌI
        │
        ▼
9. Exception trôi lên và bị GlobalExceptionHandler bắt lấy
        │
        ▼
10. Trả về cho Client HTTP 400 Bad Request cùng danh sách lỗi JSON
```

---

## 5. Tại sao cần Global Exception Handler?

Nếu không dùng Global Handler, mỗi phương thức trong Controller đều phải tự viết khối `try-catch` cực kỳ cồng kềnh:

```java
// CÁCH VIẾT XẤU (Lặp code ở mọi nơi)
try {
    return ResponseEntity.ok(productService.create(request));
} catch (AppException e) {
    return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(e.getMessage());
}
```

Chúng ta tập trung tất cả logic xử lý lỗi về một nơi duy nhất bằng cách tạo class dùng `@RestControllerAdvice`:

```text
Controller A ném Exception ──┐
Controller B ném Exception ──┼──► GlobalExceptionHandler ──► HTTP Error Response (JSON)
Controller C ném Exception ──┘
```

Mối quan hệ:
- `@ControllerAdvice`: Đóng vai trò lớp lót nghe ngóng tất cả Exception bắn ra từ toàn bộ các Controller.
- `@ResponseBody`: Đảm bảo kết quả trả về từ các phương thức xử lý lỗi được tự động chuyển thành JSON.
- `@RestControllerAdvice` = bao gồm cả 2 Annotation trên.

---

## 6. Luồng Ngoại lệ (Exception Bubble) từ Service trôi lên như thế nào?

Giả sử trong Service kiểm tra trùng mã SKU:

```java
@Service
public class ProductService {
    public ProductResponse createProduct(CreateProductRequest request) {
        if (productRepository.existsBySku(request.getSku())) {
            throw new AppException(ErrorCode.DUPLICATE_SKU);
        }
        // ...
    }
}
```

Luồng di chuyển của Ngoại lệ:

```text
1. Service phát hiện trùng SKU -> ném throw new AppException(ErrorCode.DUPLICATE_SKU)
        │
        ▼
2. Phương thức của Service lập tức dừng lại, trả ngoại lệ về cho Controller
        │
        ▼
3. Controller không bắt try-catch -> Ngoại lệ tiếp tục trôi (bubble up) ra khỏi Controller
        │
        ▼
4. Spring Framework tìm kiếm phương thức chứa @ExceptionHandler phù hợp trong @RestControllerAdvice
        │
        ▼
5. GlobalExceptionHandler.handleAppException() thực thi
        │
        ▼
6. Lấy HTTP Status (409 Conflict) và mã lỗi từ ErrorCode để đóng gói thành JSON trả về Client
```

---

## 7. `@ExceptionHandler` làm nhiệm vụ gì?

### 7.1. Xử lý Lỗi Nghiệp vụ (Business Error - `AppException`)

```java
@ExceptionHandler(AppException.class)
public ResponseEntity<ApiErrorResponse> handleAppException(AppException exception) {
    ErrorCode errorCode = exception.getErrorCode();

    ApiErrorResponse response = ApiErrorResponse.builder()
            .code(errorCode.getCode())
            .message(errorCode.getMessage())
            .build();

    return ResponseEntity
            .status(errorCode.getHttpStatus())
            .body(response);
}
```

### 7.2. Xử lý Lỗi Định dạng DTO (Validation Error - `MethodArgumentNotValidException`)

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ApiErrorResponse> handleValidation(MethodArgumentNotValidException exception) {
    Map<String, String> errors = new LinkedHashMap<>();

    // Lặp qua tất cả các trường bị lỗi dữ liệu
    for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
        errors.putIfAbsent(
                fieldError.getField(),
                fieldError.getDefaultMessage()
        );
    }

    ApiErrorResponse response = ApiErrorResponse.builder()
            .code(400)
            .message("Dữ liệu đầu vào không hợp lệ")
            .errors(errors)
            .build();

    return ResponseEntity.badRequest().body(response);
}
```

---

## 8. Gom nhiều lỗi của DTO thành một JSON phản hồi chuẩn

Khi Client gửi một Request chứa nhiều trường sai cùng lúc:

```json
{
  "sku": "",
  "name": "",
  "price": -100
}
```

Bean Validation sẽ tạo ra một danh sách chứa 3 đối tượng `FieldError`:
- `sku` -> Mã SKU không được để trống
- `name` -> Tên sản phẩm không được để trống
- `price` -> Giá sản phẩm phải lớn hơn 0

Global Handler dùng `putIfAbsent` để gom lại thành cấu trúc JSON rõ ràng cho Frontend dễ hiển thị:

```json
{
  "code": 400,
  "message": "Dữ liệu đầu vào không hợp lệ",
  "errors": {
    "sku": "Mã SKU không được để trống",
    "name": "Tên sản phẩm không được để trống",
    "price": "Giá sản phẩm phải lớn hơn 0"
  }
}
```

> 💡 **Tác dụng của `putIfAbsent`:** Nếu một trường bị vi phạm nhiều Annotation cùng lúc (ví dụ vừa `@NotBlank` vừa `@Size`), `putIfAbsent` đảm bảo chỉ lấy câu thông báo lỗi đầu tiên, không làm rối màn hình người dùng.

---

## 9. Thứ tự sắp xếp các `@ExceptionHandler` chuẩn trong dự án

Nguyên tắc bắt ngoại lệ trong Java: **Ngoại lệ cụ thể xử lý trước, Ngoại lệ tổng quát xử lý sau**.

```java
1. @ExceptionHandler(AppException.class)                         // Lỗi nghiệp vụ tự định nghĩa
2. @ExceptionHandler(MethodArgumentNotValidException.class)       // Lỗi validate @RequestBody
3. @ExceptionHandler(ConstraintViolationException.class)          // Lỗi validate @RequestParam / @PathVariable
4. @ExceptionHandler(MethodArgumentTypeMismatchException.class)  // Lỗi sai kiểu dữ liệu tham số URL
5. @ExceptionHandler(HttpMessageNotReadableException.class)      // Lỗi JSON sai cú pháp
6. @ExceptionHandler(Exception.class)                             // Lỗi hệ thống không lường trước (Bọc lót cuối)
```

**Phương thức bọc lót lỗi hệ thống (bắt `Exception.class`):**

```java
@ExceptionHandler(Exception.class)
public ResponseEntity<ApiErrorResponse> handleUnknownException(Exception exception) {
    // Ghi log đầy đủ StackTrace vào file log trên server để lập trình viên xem và sửa lỗi
    log.error("Hệ thống gặp lỗi không xác định: ", exception);

    // Tuyệt đối KHÔNG trả StackTrace ra cho Client vì lý do bảo mật
    return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ApiErrorResponse.builder()
                    .code(500)
                    .message("Hệ thống gặp sự cố nội bộ. Vui lòng thử lại sau.")
                    .build());
}
```

---

## 10. Bảng tổng kết kiến thức Lesson 03

| Tình huống / Lỗi | Nơi xử lý trực tiếp | Loại Exception / Cơ chế | HTTP Status trả về |
|---|---|---|:---:|
| SKU bị rỗng | `@NotBlank` trên DTO | `MethodArgumentNotValidException` | **400** |
| SKU sai định dạng | `ValidSkuValidator` | `MethodArgumentNotValidException` | **400** |
| SKU bị trùng trong DB | Service + Repository | `AppException(DUPLICATE_SKU)` | **409** |
| Danh mục không tồn tại | Service + Repository | `AppException(CATEGORY_NOT_FOUND)` | **404** |
| Gom danh sách lỗi DTO | `GlobalExceptionHandler` | Đọc từ `BindingResult` | **400** |
| Nổ lỗi NullPointer / Bug code | Handler `Exception.class` | Log lỗi ra server, trả JSON chung | **500** |

---

## 11. Bài tập thực hành ngắn (Thực hiện trên dự án `shopcore`)

### Bài 1 - Cài đặt `@ValidSku`
1. Tạo 2 file: `common/validation/ValidSku.java` và `common/validation/ValidSkuValidator.java`.
2. Gắn `@ValidSku` vào thuộc tính `sku` của `CreateProductRequest`.
3. Kiểm thử các trường hợp dữ liệu:
   - `KB-001` -> Pass
   - `ABC123` -> Pass
   - `abc-001` -> Fail (chứa chữ thường)
   - `ABC 001` -> Fail (chứa khoảng trắng)
   - `-ABC` -> Fail (bắt đầu bằng dấu -)
   - `ABC-` -> Fail (kết thúc bằng dấu -)

### Bài 2 - Bổ sung Global Handler
Trong `GlobalExceptionHandler`, đảm bảo bạn đã viết đầy đủ các phương thức bắt lỗi cho: `AppException`, `MethodArgumentNotValidException`, `ConstraintViolationException`, `HttpMessageNotReadableException`, và `Exception`.

---

## 12. Checklist tự đánh giá trước khi làm Bài kiểm tra

- [ ] Giải thích được vai trò của `@Constraint(validatedBy = ...)` trong Custom Annotation.
- [ ] Hiểu vì sao Custom Validator luôn cần 2 file (Annotation + Validator Class).
- [ ] Phân biệt được trách nhiệm giữa `@NotBlank` và `@ValidSku`.
- [ ] Phân biệt được SKU sai định dạng (Format - 400) và SKU bị trùng (Business - 409).
- [ ] Biết rằng Custom Validator không tự trả về HTTP Status mà chỉ báo `true/false`.
- [ ] Giải thích được luồng ngoại lệ trôi (bubble) từ Service lên Global Handler.
- [ ] Viết thành thạo `@RestControllerAdvice` và `@ExceptionHandler`.
- [ ] Biết cách dùng `BindingResult.getFieldErrors()` để gom danh sách lỗi DTO.
- [ ] Hiểu lý do phải để Handler `Exception.class` ở vị trí cuối cùng.
