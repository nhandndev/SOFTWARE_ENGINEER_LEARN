# Dap an M1-4 - Lesson 03

> Tong diem tho: 40 diem. Normalize: diem tho / 40 * 100.

## Cau 1 - 4d

Ca hai cach deu co the dung.

```text
@Pattern:
- Phu hop rule ngan, don gian, chi dung mot noi.

@ValidSku:
- Ten rule de doc hon trong DTO.
- Co the tai su dung o nhieu DTO/field.
- De mo rong logic va test rieng.
```

Voi rule SKU cua de, custom validator la lua chon hop ly.

## Cau 2 - 4d

```text
@Constraint:
    Danh dau day la custom Bean Validation constraint.

validatedBy = ValidSkuValidator.class:
    Noi validator nao se duoc goi.

@Target(ElementType.FIELD):
    Chi cho phep dat annotation tren field.

@Retention(RUNTIME):
    Annotation con ton tai de framework doc luc runtime.
```

Thieu `validatedBy`, framework khong biet class nao kiem tra rule, tru khi co cau hinh khac.

## Cau 3 - 5d

Vi du:

```java
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
```

`null/blank` tra ve `true` de `@NotBlank` xu ly viec bat buoc nhap. Validator nay chi xu ly format.

## Cau 4 - 4d

Request B bi phat hien o Service:

```text
Service -> productRepository.existsBySku(...)
        -> throw AppException(DUPLICATE_SKU)
        -> GlobalExceptionHandler
        -> 409 Conflict
```

Duplicate phu thuoc trang thai database, khong phai format cua chuoi.

## Cau 5 - 3d

Validator khong nen query database vi:

```text
- Tron validation voi business/data access.
- Validator kho test va phu thuoc database.
- Moi lan validate co the tao query khong can thiet.
- Khong con ro loi la format hay conflict.
```

`ValidSku` chi kiem format; Service kiem tra trung SKU.

## Cau 6 - 4d

```text
Service phat hien SKU da ton tai.
-> Service throw AppException.
-> Exception bubble len khoi Service va Controller.
-> Spring tim @ExceptionHandler phu hop trong @RestControllerAdvice.
-> handleAppException doc ErrorCode.DUPLICATE_SKU.
-> Tao error response va lay status 409.
-> Tra response ve client.
```

Controller khong bat buoc `try/catch`; global handler da xu ly tap trung. Chi dung `try/catch` cuc bo khi Controller can xu ly rieng mot truong hop dac biet.

## Cau 7 - 4d

```text
@RestControllerAdvice:
    Dang ky class xu ly exception cho REST Controller va tra JSON body.

@ExceptionHandler(AppException.class):
    Method nay chi duoc chon khi exception la AppException
    hoac phu hop voi type nay.

ResponseEntity<?>:
    Cho phep chon HTTP status va response body.
```

## Cau 8 - 4d

Handler doc cac loi tu:

```java
exception.getBindingResult().getFieldErrors()
```

Sau do gom thanh:

```json
{
  "code": 400,
  "message": "Validation failed",
  "errors": {
    "sku": "SKU is required",
    "name": "Name is required",
    "price": "Price must be greater than 0"
  }
}
```

`putIfAbsent` giu message dau tien cua moi field, tranh viec loi sau ghi de loi truoc.

## Cau 9 - 4d

| Tinh huong | Handler/Exception | Status |
|---|---|---:|
| SKU sai format | `MethodArgumentNotValidException` | 400 |
| SKU bi trung | `AppException` | 409 |
| Category khong ton tai | `AppException` | 404 |
| Loi khong du kien | `Exception` | 500 |

## Cau 10 - 4d

### Request A

```text
Jackson tao DTO.
@Valid kich hoat Bean Validation.
ValidSkuValidator nhan "abc 001".
isValid tra false.
Bean Validation tao field error.
MethodArgumentNotValidException.
Global handler validation bat loi.
Controller method khong chay tiep.
Service/Repository khong chay.
Tra 400.
```

### Request B

```text
Jackson tao DTO.
@Valid kich hoat Bean Validation.
ValidSkuValidator nhan "KB-001".
isValid tra true.
Validation pass.
Controller method duoc goi.
Controller goi Service.
Service goi existsBySku va thay SKU da ton tai.
Service throw AppException(DUPLICATE_SKU).
Global handler AppException bat loi.
Tra 409.
```

Khac nhau cot loi:

```text
Request A: sai format -> validation fail -> 400 -> Service khong chay.
Request B: dung format nhung conflict database -> AppException -> 409.
```

## Dap an dat

Mot bai lam dat yeu cau neu ban:

- Phan biet ro format validation va business validation.
- Biet custom validator chi tra true/false, khong tra HTTP.
- Trace duoc exception bubble len global handler.
- Map dung 400, 404, 409, 500.
