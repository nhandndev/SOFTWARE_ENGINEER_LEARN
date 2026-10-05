# Lesson 03 - `@Valid` Va `@Validated`

## 1. Co annotation tren DTO chua du

Neu DTO co:

```java
public class CreateProductRequest {
    @NotBlank
    private String name;
}
```

nhung Controller viet:

```java
@PostMapping
public ResponseEntity<?> create(@RequestBody CreateProductRequest request) {
    ...
}
```

thi validation **khong tu chay**.

Can them:

```java
@Valid
```

## 2. `@Valid` dung o dau?

Thuong dung ngay truoc `@RequestBody`:

```java
@PostMapping
public ResponseEntity<ApiResponse<ProductResponse>> create(
        @Valid @RequestBody CreateProductRequest request
) {
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success(productService.create(request)));
}
```

Luong chay:

```text
Jackson convert JSON -> CreateProductRequest
-> Bean Validation check request vi co @Valid
-> neu fail: MethodArgumentNotValidException
-> neu pass: Controller method chay
```

## 3. Neu validation fail thi exception nao?

Voi `@RequestBody @Valid`:

```text
MethodArgumentNotValidException
```

Vi du:

```json
{
  "name": ""
}
```

Response mong muon:

```http
HTTP/1.1 400 Bad Request
```

## 4. Validate nested object

Neu DTO co object con:

```java
public class CreateOrderRequest {
    @Valid
    @NotNull
    private AddressRequest shippingAddress;
}
```

`@Valid` tren field con giup validate tiep `AddressRequest`.

## 5. Query/path param validation

Voi query param:

```java
@GetMapping
public PageResponse<ProductResponse> getAll(
        @RequestParam @Min(0) int page,
        @RequestParam @Min(1) @Max(100) int size
) {
    ...
}
```

De validation tren method parameter chay, class Controller can:

```java
@Validated
@RestController
public class ProductController {
}
```

Khi fail, exception hay gap:

```text
ConstraintViolationException
```

## 6. `@Valid` vs `@Validated`

| Annotation | Den tu dau | Hay dung khi nao |
|---|---|---|
| `@Valid` | Jakarta Validation | Validate object/DTO, nested object |
| `@Validated` | Spring | Validate method parameter, validation group |

Trong project thuc te:

```java
@Validated
@RestController
public class ProductController {

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreateProductRequest request) {
        ...
    }

    @GetMapping
    public ResponseEntity<?> list(@RequestParam @Min(0) int page) {
        ...
    }
}
```

## 7. Co nen validate page/size bang tay khong?

Co 2 cach:

### Cach A: Validate bang tay

```java
if (page < 0 || size < 1 || size > 100) {
    throw new AppException(ErrorCode.INVALID_PARAMETER);
}
```

Hop voi style ban dang lam.

### Cach B: Dung annotation

```java
public ResponseEntity<?> list(
        @RequestParam(defaultValue = "0") @Min(0) int page,
        @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size
) {
    ...
}
```

Can `@Validated` tren Controller.

M1-4 nen biet ca hai. Khi hoc custom/global error thi thu cach B.

## 8. Loi hay gap

### Sai 1: Quen `@Valid`

DTO co annotation nhung request sai van vao Service.

### Sai 2: Tuong `@Validated` thay the moi thu

`@Validated` tren Controller khong thay cho `@Valid` truoc `@RequestBody`.

### Sai 3: Validate trong Service qua nhieu

Service nen xu ly business rule. Input shape nen chan o DTO/Controller.

## 9. Tu kiem tra

1. DTO co `@NotBlank` nhung Controller khong co `@Valid` thi sao?
2. `@RequestBody @Valid` fail se nem exception nao?
3. Validate `@RequestParam @Min(0)` can them gi tren Controller?
4. `@Valid` va `@Validated` khac nhau the nao?
5. `categoryId` null nen bi chan o DTO hay Service?

