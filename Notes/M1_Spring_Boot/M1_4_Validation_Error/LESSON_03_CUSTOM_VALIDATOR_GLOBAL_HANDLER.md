# M1-4 - Lesson 03: Custom Validator Va Global Exception Handler

> Muc tieu: tu viet duoc mot rule validation rieng va hieu exception tu Service/Controller di len `@RestControllerAdvice` roi tro thanh HTTP response.

## 0. Lesson nay hoc gi?

Ban da hoc:

- DTO co the bi validate bang annotation co san.
- `@Valid` giup kich hoat validation cho request body.
- Loi format va loi business la hai nhom khac nhau.

Lesson nay hoc tiep hai viec:

```text
1. Rule nao chua duoc annotation co san thi tao custom validator.
2. Exception tu nhieu noi duoc gom lai va tra ve mot format thong nhat.
```

Khong hoc lai chi tiet `@Valid`, `page=abc` hay `page=-1`. Neu quen, xem Lesson 01 va Lesson 02.

---

## 1. Khi nao dung custom validator?

Annotation co san phu hop voi rule don gian:

```java
@NotBlank
@Size(min = 2, max = 100)
@Positive
@Pattern(regexp = "...")
```

Nhung co rule dac thu cua domain, vi du:

```text
SKU:
- bat buoc viet hoa
- chi gom A-Z, 0-9 va dau -
- dai tu 3 den 30 ky tu
- khong bat dau hoac ket thuc bang -
```

Ta co the viet `@Pattern`, nhung ten `@ValidSku` doc de hieu hon:

```java
@NotBlank
@ValidSku
private String sku;
```

Y tuong:

```text
@ValidSku
     |
     v
ValidSkuValidator.isValid(value)
     |
     +-- true  -> field hop le
     |
     +-- false -> tao validation error
```

---

## 2. Custom validator gom may phan?

Can hai file:

```text
ValidSku.java
ValidSkuValidator.java
```

### 2.1. Annotation `@ValidSku`

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
@Constraint(validatedBy = ValidSkuValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidSku {

    String message() default "SKU format is invalid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
```

### 2.2. Y nghia tung annotation

| Annotation | Y nghia |
|---|---|
| `@Constraint` | Noi cho Bean Validation biet class nao kiem tra rule |
| `validatedBy` | Validator thuc te se duoc goi |
| `@Target` | Cho phep dat annotation o field/parameter |
| `@Retention(RUNTIME)` | Runtime van doc duoc annotation |
| `message` | Message mac dinh neu rule fail |
| `groups` | Ho tro validation group, phai khai bao theo chuan |
| `payload` | Du lieu metadata tuy chon, phai khai bao theo chuan |

Quan he giua hai file:

```text
DTO co @ValidSku
-> Bean Validation doc @Constraint
-> tim thay ValidSkuValidator
-> goi isValid(sku, context)
```

### 2.3. Validator

```java
package com.shopcore.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidSkuValidator
        implements ConstraintValidator<ValidSku, String> {

    private static final String SKU_PATTERN =
            "^[A-Z0-9](?:[A-Z0-9-]{1,28}[A-Z0-9])?$";

    @Override
    public boolean isValid(
            String value,
            ConstraintValidatorContext context
    ) {
        if (value == null || value.isBlank()) {
            return true;
        }

        return value.matches(SKU_PATTERN);
    }
}
```

`ConstraintValidator<ValidSku, String>` doc la:

```text
ValidSku: annotation ma validator xu ly.
String: kieu du lieu cua field duoc kiem tra.
```

### 2.4. Tai sao null/blank tra ve `true`?

Tach mot field thanh hai trach nhiem:

```java
@NotBlank(message = "SKU is required")
@ValidSku(message = "SKU format is invalid")
private String sku;
```

```text
Khong co gia tri -> @NotBlank xu ly.
Co gia tri nhung sai format -> @ValidSku xu ly.
```

Neu `ValidSku` cung bat blank, mot request co the nhan hai loi cho cung mot nguyen nhan.

Quy tac de nho:

```text
@NotBlank = co bat buoc nhap hay khong?
@ValidSku = gia tri da nhap co dung format hay khong?
```

---

## 3. Format validation khac business validation

### Format validation

Kiem tra gia tri co dung hinh dang khong:

```text
SKU "abc xyz" sai format -> 400 Bad Request
SKU "-ABC" sai format -> 400 Bad Request
```

No khong can truy cap database.

### Business validation

Kiem tra gia tri co hop le trong trang thai he thong khong:

```text
SKU "KB-001" dung format nhung da ton tai -> 409 Conflict
categoryId = 999 khong ton tai -> 404 Not Found
```

No can nam trong Service vi Service biet business rule va co the goi Repository.

```text
Custom Validator: SKU co dung hinh dang?
Service: SKU nay co bi trung trong he thong khong?
```

Khong nen viet `existsBySku()` trong `ValidSkuValidator`, vi nhu vay validation layer se phu thuoc database.

---

## 4. Khi custom validator fail thi luong chay ra sao?

DTO:

```java
public class CreateProductRequest {

    @NotBlank
    @ValidSku
    private String sku;
}
```

Controller:

```java
@PostMapping
public ResponseEntity<?> create(
        @Valid @RequestBody CreateProductRequest request
) {
    return ResponseEntity.ok(productService.create(request));
}
```

Request:

```json
{
  "sku": "abc xyz"
}
```

Luong:

```text
JSON body
-> Jackson tao CreateProductRequest
-> @Valid kich hoat Bean Validation
-> Bean Validation goi ValidSkuValidator
-> isValid("abc xyz") tra false
-> tao field error cho sku
-> nem MethodArgumentNotValidException
-> Controller method khong chay tiep
-> Service/Repository khong chay
-> GlobalExceptionHandler xu ly
-> tra HTTP 400
```

Diem quan trong:

```text
Custom validator khong tu tra HTTP 400.
No chi bao cho Bean Validation biet field pass hay fail.
Global handler moi la noi doi exception thanh response.
```

---

## 5. Vi sao can Global Exception Handler?

Neu moi Controller tu try/catch:

```java
try {
    ...
} catch (AppException e) {
    ...
}
```

thi se bi lap code o nhieu Controller.

Ta gom xu ly loi tai mot noi:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
}
```

Co the hieu don gian:

```text
Controller A throw exception
Controller B throw exception
Controller C throw exception
          |
          v
GlobalExceptionHandler
          |
          v
HTTP error response
```

`@RestControllerAdvice` ket hop hai vai tro:

```text
@ControllerAdvice: lang nghe exception tu cac Controller.
@ResponseBody: ket qua handler duoc viet thanh JSON.
```

---

## 6. Exception tu Service di len nhu the nao?

Vi du Service:

```java
public ProductResponse create(CreateProductRequest request) {
    if (productRepository.existsBySku(request.getSku())) {
        throw new AppException(ErrorCode.DUPLICATE_SKU);
    }

    return ...;
}
```

Khong co `try/catch` o Controller van duoc:

```text
Service throw AppException
-> stack frame cua Service ket thuc
-> exception bubble len Controller
-> Controller khong co handler cuc bo
-> Spring tim @ExceptionHandler phu hop
-> GlobalExceptionHandler.handleAppException(...)
-> ErrorCode cung cap status/message
-> response 409 tra ve client
```

`AppException` khong phai validation error:

```text
Request sai format -> Bean Validation -> 400
Request dung format nhung trung SKU -> AppException -> 409
```

---

## 7. `@ExceptionHandler` lam gi?

Vi du xu ly business error:

```java
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
```

Doc theo luong:

```text
@ExceptionHandler(AppException.class)
-> method nay chi xu ly AppException
-> lay ErrorCode tu exception
-> tao error response
-> lay HTTP status tu ErrorCode
-> tra response
```

Handler validation:

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ApiErrorResponse> handleValidation(
        MethodArgumentNotValidException exception
) {
    Map<String, String> errors = new LinkedHashMap<>();

    for (FieldError fieldError :
            exception.getBindingResult().getFieldErrors()) {
        errors.putIfAbsent(
                fieldError.getField(),
                fieldError.getDefaultMessage()
        );
    }

    ApiErrorResponse response = ApiErrorResponse.builder()
            .code(400)
            .message("Validation failed")
            .errors(errors)
            .build();

    return ResponseEntity.badRequest().body(response);
}
```

Handler nay khong tu validate lai. No chi doc ket qua ma Bean Validation da tao trong `BindingResult`, sau do format lai cho API.

---

## 8. Nhieu field loi duoc gom nhu the nao?

Request:

```json
{
  "sku": "",
  "name": "",
  "price": -1
}
```

Bean Validation co the tao nhieu `FieldError`:

```text
sku   -> Product sku is required
name  -> Product name is required
price -> Product price must be greater than 0
```

Handler gom thanh:

```json
{
  "code": 400,
  "message": "Validation failed",
  "errors": {
    "sku": "Product sku is required",
    "name": "Product name is required",
    "price": "Product price must be greater than 0"
  }
}
```

`putIfAbsent` giup moi field chi giu message dau tien khi co nhieu constraint cung fail.

---

## 9. Thu tu handler nen viet

```java
AppException
MethodArgumentNotValidException
ConstraintViolationException
MethodArgumentTypeMismatchException
HttpMessageNotReadableException
Exception
```

Tu duy:

```text
Loi cu the -> handler cu the
Loi khong xac dinh -> handler Exception o cuoi
```

Handler tong quat:

```java
@ExceptionHandler(Exception.class)
public ResponseEntity<ApiErrorResponse> handleUnknown(Exception exception) {
    log.error("Unexpected error", exception);

    return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ApiErrorResponse.builder()
                    .code(500)
                    .message("Internal server error")
                    .build());
}
```

Khong tra stacktrace cho client. Stacktrace de trong log de developer debug.

---

## 10. Bang tong ket Lesson 03

| Noi dung | Noi xu ly | Ket qua |
|---|---|---|
| SKU rong | `@NotBlank` | Validation error, 400 |
| SKU sai format | `ValidSkuValidator` | Validation error, 400 |
| SKU trung | Service + Repository | `AppException`, 409 |
| Category khong ton tai | Service + Repository | `AppException`, 404 |
| Gom validation errors | `GlobalExceptionHandler` | JSON error response |
| Loi khong du kien | Handler `Exception.class` | 500, khong lo chi tiet |

Cau nhac:

```text
Validator quyet dinh field dung hay sai.
Service quyet dinh business co duoc phep hay khong.
Global handler quyet dinh exception bien thanh response nhu the nao.
```

---

## 11. Bài tập thực hành ngắn

Khong can tao project moi. Lam tren `shopcore`.

### Bai 1 - `@ValidSku`

Tao:

```text
common/validation/ValidSku.java
common/validation/ValidSkuValidator.java
```

Gan `@ValidSku` vao `CreateProductRequest.sku`.

Test:

```text
KB-001  -> pass
ABC123  -> pass
abc-001 -> fail
ABC 001 -> fail
-ABC    -> fail
ABC-    -> fail
```

### Bai 2 - Error handler

Trong `GlobalExceptionHandler`, dam bao co handler cho:

```text
AppException
MethodArgumentNotValidException
ConstraintViolationException
MethodArgumentTypeMismatchException
HttpMessageNotReadableException
Exception
```

### Bai 3 - Trace bang loi

Viet ra luong cua hai request:

```text
sku = "abc 001"
sku = "KB-001" nhung SKU da ton tai
```

Phai chi ra:

```text
Exception nao?
Service co chay khong?
Status nao?
Handler nao bat?
```

## 12. Checklist truoc khi lam bai kiem tra

- [ ] Giai thich duoc `@Constraint(validatedBy = ...)`.
- [ ] Biet vi sao custom validator can annotation va validator class.
- [ ] Phan biet `@NotBlank` va `@ValidSku`.
- [ ] Phan biet SKU sai format voi SKU bi trung.
- [ ] Biet custom validator khong tu tra HTTP response.
- [ ] Giai thich duoc exception bubble tu Service len handler.
- [ ] Viet duoc `@RestControllerAdvice`.
- [ ] Biet `@ExceptionHandler` chon handler theo exception type.
- [ ] Gom duoc nhieu `FieldError`.
- [ ] De handler `Exception.class` o cuoi.

