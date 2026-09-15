# Lesson 07 - Mini Project Checklist M1-4

> File nay dung sau khi doc 6 lesson. Ban se code deliverable M1-4 vao project.

## 1. Muc tieu code

Nang cap error/validation cho Product + Category:

```text
DTO validation ro hon
Custom SKU validator
GlobalExceptionHandler day du hon
ProblemDetail cho response loi
```

## 2. Checklist DTO

### Category

`CreateCategoryRequest`:

```text
name: @NotBlank + @Size(min=2, max=80)
```

`UpdateCategoryRequest`:

```text
name: @NotBlank + @Size(min=2, max=80)
```

### Product

`CreateProductRequest`:

```text
sku: @NotBlank + @ValidSku
name: @NotBlank + @Size(min=2, max=100)
price: @NotNull + @DecimalMin(value="0.0", inclusive=false)
categoryId: @NotNull
```

`UpdateProductRequest`:

```text
name: @NotBlank + @Size(min=2, max=100)
price: @NotNull + @DecimalMin(value="0.0", inclusive=false)
categoryId: @NotNull
```

## 3. Checklist Controller

- [ ] `@Valid` tren tat ca `@RequestBody`.
- [ ] Neu validate query param bang annotation thi them `@Validated` tren Controller.
- [ ] `page` >= 0.
- [ ] `size` tu 1 den 100.

## 4. Checklist Custom Validator

Tao:

```text
common/validation/ValidSku.java
common/validation/ValidSkuValidator.java
```

Rule goi y:

```text
SKU chi gom A-Z, 0-9, -
Do dai 3-30
Khong bat dau/ket thuc bang -
```

Duplicate SKU van nam trong Service:

```text
existsBySku -> AppException(DUPLICATE_SKU) -> 409
```

## 5. Checklist GlobalExceptionHandler

Bat toi thieu:

```text
AppException
MethodArgumentNotValidException
ConstraintViolationException
MethodArgumentTypeMismatchException
HttpMessageNotReadableException
Exception
```

## 6. Checklist ProblemDetail

Error response nen co:

```text
type
title
status
detail
code
path
errors neu validation fail
```

## 7. API test can chay

### Validation fail

```http
POST /api/products
```

```json
{
  "sku": "",
  "name": "",
  "price": -1,
  "categoryId": null
}
```

Mong doi:

```text
400 + ProblemDetail + errors map
```

### SKU format sai

```json
{
  "sku": "-abc",
  "name": "Keyboard",
  "price": 1000,
  "categoryId": 1
}
```

Mong doi:

```text
400
```

### Duplicate SKU

Mong doi:

```text
409
```

### Category khong ton tai

Mong doi:

```text
404
```

### Query param sai

```http
GET /api/products?page=abc
GET /api/products?page=-1
GET /api/products?size=1000
```

Mong doi:

```text
400
```

## 8. Cau hoi de pass module

1. Validation error khac business error the nao?
2. `@Valid` dung de lam gi?
3. `@Validated` dung khi nao?
4. `MethodArgumentNotValidException` xay ra khi nao?
5. `ConstraintViolationException` xay ra khi nao?
6. `HttpMessageNotReadableException` xay ra khi nao?
7. Duplicate SKU nen la 400 hay 409?
8. SKU format sai nen la 400 hay 409?
9. ProblemDetail co cac field nao?
10. Vi sao khong query DB trong custom validator format SKU?

