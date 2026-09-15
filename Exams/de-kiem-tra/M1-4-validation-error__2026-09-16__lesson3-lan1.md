# Bai kiem tra M1-4 - Lesson 03

> Trong tam: Custom Validator va Global Exception Handler.  
> Khong hoi lai cac cau co ban ve `@Valid`, `page=abc` hay `page=-1` da lam o Lesson 01-02.

## Huong dan

- Tra loi theo dung so cau.
- Uu tien giai thich luong va y nghia.
- Code mini co the viet theo style `class` + Lombok cua ban.
- Tong diem tho: 40 diem. Khi cham se normalize ve thang 100.

---

## Cau 1 - Chon cach validate SKU (4d)

SKU co rule:

```text
Chi gom A-Z, 0-9 va dau -
Dai tu 3 den 30 ky tu
Khong bat dau/ket thuc bang -
```

Ban se dung `@Pattern` hay custom `@ValidSku`? Giai thich khi nao custom validator dang gia tri hon.

**Tra loi:**

---

## Cau 2 - Doc annotation custom (4d)

Giai thich y nghia cua:

```java
@Constraint(validatedBy = ValidSkuValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
```

Neu thieu `validatedBy` thi Bean Validation biet phai goi class nao khong?

**Tra loi:**

---

## Cau 3 - Viet validator (5d)

Viet than method:

```java
public boolean isValid(String value, ConstraintValidatorContext context)
```

voi quy tac:

```text
null/blank de @NotBlank xu ly
gia tri hop le: KB-001, ABC123
gia tri sai: abc-001, ABC 001, -ABC, ABC-
```

Khong can viet lai ca annotation.

**Tra loi:**

---

## Cau 4 - Tach format va business (4d)

Hai request deu co SKU `KB-001` dung format:

```text
A: SKU chua ton tai trong database
B: SKU da ton tai trong database
```

Request B nen bi phat hien o custom validator hay Service? Status code nao? Vi sao?

**Tra loi:**

---

## Cau 5 - Validator co duoc goi database? (3d)

Vi sao khong nen viet `productRepository.existsBySku(...)` ben trong `ValidSkuValidator`?

Hay neu mot hau qua neu tron hai trach nhiem nay.

**Tra loi:**

---

## Cau 6 - Exception bubble (4d)

Service viet:

```java
if (productRepository.existsBySku(request.getSku())) {
    throw new AppException(ErrorCode.DUPLICATE_SKU);
}
```

Hay mo ta exception di tu Service len `GlobalExceptionHandler` nhu the nao. Controller co can `try/catch` khong?

**Tra loi:**

---

## Cau 7 - `@RestControllerAdvice` va `@ExceptionHandler` (4d)

Giai thich:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<?> handleAppException(AppException exception) {
        return ...;
    }
}
```

Moi annotation/class o day co vai tro gi?

**Tra loi:**

---

## Cau 8 - Gom nhieu loi DTO (4d)

Request co ba loi:

```text
sku rong
name rong
price am
```

Handler `MethodArgumentNotValidException` nen lay loi o dau va tra response co dang nao? Hay giai thich tac dung cua `putIfAbsent`.

**Tra loi:**

---

## Cau 9 - Lap bang mapping loi (4d)

Dien handler va status phu hop:

| Tinh huong | Handler/Exception | Status |
|---|---|---:|
| SKU sai format |  |  |
| SKU bi trung |  |  |
| Category khong ton tai |  |  |
| Loi khong du kien |  |  |

**Tra loi:**

---

## Cau 10 - Trace tong hop (4d)

Voi endpoint:

```text
POST /api/products
```

Hay trace day du hai request:

### Request A

```json
{
  "sku": "abc 001",
  "name": "Keyboard",
  "price": 1000,
  "categoryId": 1
}
```

### Request B

```json
{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": 1000,
  "categoryId": 1
}
```

Gia su Request B co SKU da ton tai.

Phai noi duoc:

```text
Validator nao chay?
Controller method co chay khong?
Service co chay khong?
Exception nao?
Handler nao bat?
Status nao?
```

**Tra loi:**

