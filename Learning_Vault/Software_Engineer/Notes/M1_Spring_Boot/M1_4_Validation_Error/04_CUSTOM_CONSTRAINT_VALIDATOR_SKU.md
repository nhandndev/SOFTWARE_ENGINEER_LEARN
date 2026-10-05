# Lesson 04 - Custom Constraint Validator Cho SKU

## 1. Khi nao can custom validator?

Cac annotation co san duoc nhieu viec:

```text
@NotBlank
@Size
@Pattern
@DecimalMin
```

Nhung co luc rule can ten rieng de de doc va tai su dung.

Vi du SKU:

```text
SKU bat dau bang chu in hoa.
Chi gom A-Z, 0-9 va dau gach ngang.
Do dai 3-30 ky tu.
Khong duoc ket thuc bang dau gach ngang.
```

Co the dung `@Pattern`, nhung custom annotation doc de hon:

```java
@ValidSku
private String sku;
```

## 2. Custom validator gom may phan?

Can 2 file:

```text
@interface ValidSku
ValidSkuValidator implements ConstraintValidator<ValidSku, String>
```

## 3. Tao annotation `@ValidSku`

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

Giai thich:

```text
@Constraint -> noi annotation nay duoc validate boi class nao.
@Target -> dung duoc tren field/parameter.
@Retention(RUNTIME) -> runtime van doc duoc annotation.
message -> message mac dinh khi fail.
groups/payload -> bat buoc theo chuan Jakarta Validation.
```

## 4. Tao validator

```java
package com.shopcore.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidSkuValidator implements ConstraintValidator<ValidSku, String> {

    private static final String SKU_PATTERN = "^[A-Z0-9](?:[A-Z0-9-]{1,28}[A-Z0-9])?$";

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return true;
        }
        return value.matches(SKU_PATTERN);
    }
}
```

Tai sao `null/blank` lai return `true`?

Vi:

```text
@ValidSku chi kiem format.
@NotBlank chiu trach nhiem bat buoc co gia tri.
```

DTO se viet:

```java
@NotBlank(message = "Product sku is required")
@ValidSku
private String sku;
```

Neu return false voi null/blank, mot field rong co the bi bao 2 loi cung luc. Tach trach nhiem se sach hon.

## 5. Dung trong DTO

```java
public class CreateProductRequest {

    @NotBlank(message = "Product sku is required")
    @ValidSku
    private String sku;
}
```

Request fail:

```json
{
  "sku": "abc xyz"
}
```

Response mong muon:

```http
400 Bad Request
```

## 6. Custom validator co nen query database khong?

Thuong **khong nen** query database trong validator cho rule business nhu duplicate SKU.

Vi duplicate SKU la business/state rule:

```text
SKU format sai -> validation error -> 400
SKU da ton tai -> business error -> 409
```

Neu validator query DB de check duplicate, validation layer bi tron voi business/data access.

Trong M1-4, custom validator chi nen check format.

## 7. Cau truc goi y

```text
com.shopcore.common.validation
├── ValidSku.java
└── ValidSkuValidator.java
```

## 8. Tu kiem tra

1. Custom validator can may file?
2. `@Constraint(validatedBy = ...)` co y nghia gi?
3. Vi sao `ValidSkuValidator` nen return true voi null/blank?
4. Duplicate SKU nen nam trong validator hay Service?
5. SKU format sai nen tra 400 hay 409?

