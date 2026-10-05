# Lesson 02 - Jakarta Validation Tren DTO

## 1. DTO validation la gi?

DTO validation la dat rule ngay tren request class.

Vi du:

```java
public class CreateProductRequest {
    @NotBlank(message = "Product sku is required")
    private String sku;

    @NotBlank(message = "Product name is required")
    private String name;

    @NotNull(message = "Product price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Product price must be greater than 0")
    private BigDecimal price;

    @NotNull(message = "Category id is required")
    private Long categoryId;
}
```

Y nghia:

```text
DTO tu mo ta dau vao nao duoc chap nhan.
Controller/Service khong can viet if name == null lung tung.
```

## 2. Cac annotation hay dung

### `@NotNull`

Khong duoc null.

Dung cho:

```text
Long categoryId
BigDecimal price
Integer quantity
```

Vi du:

```java
@NotNull(message = "Category id is required")
private Long categoryId;
```

Luu y:

```text
@NotNull khong chan String rong "".
```

### `@NotBlank`

Khong duoc null, khong duoc rong, khong duoc toan khoang trang.

Dung cho:

```text
String name
String sku
String email
```

Vi du:

```java
@NotBlank(message = "Product name is required")
private String name;
```

### `@NotEmpty`

Khong null va khong empty, nhung String toan space van pass.

It dung hon `@NotBlank` voi String.

```java
@NotEmpty
private List<Long> ids;
```

### `@Size`

Kiem tra do dai String, Collection, Array.

```java
@Size(min = 3, max = 100, message = "Product name must be 3-100 characters")
private String name;
```

### `@Min` va `@Max`

Dung cho so nguyen.

```java
@Min(value = 1, message = "Quantity must be at least 1")
private Integer quantity;
```

### `@DecimalMin` va `@DecimalMax`

Dung tot cho `BigDecimal`.

```java
@DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
private BigDecimal price;
```

### `@Pattern`

Kiem tra String theo regex.

Vi du SKU:

```java
@Pattern(
    regexp = "^[A-Z0-9-]{3,30}$",
    message = "SKU must contain uppercase letters, numbers or hyphen"
)
private String sku;
```

### `@Email`

Dung cho email.

```java
@Email(message = "Email is invalid")
private String email;
```

## 3. Chon annotation dung

| Field | Nen dung | Vi sao |
|---|---|---|
| `String name` | `@NotBlank`, `@Size` | Chan null/rong/space va gioi han do dai |
| `String sku` | `@NotBlank`, `@Pattern` | Chan rong va format |
| `BigDecimal price` | `@NotNull`, `@DecimalMin` | Chan null va so <= 0 |
| `Long categoryId` | `@NotNull` | Bat buoc co id |
| `Integer quantity` | `@NotNull`, `@Min(1)` | Bat buoc va so luong duong |

## 4. DTO cho Product nen viet the nao?

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateProductRequest {

    @NotBlank(message = "Product sku is required")
    @Pattern(regexp = "^[A-Z0-9-]{3,30}$", message = "Product sku format is invalid")
    private String sku;

    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 100, message = "Product name must be 2-100 characters")
    private String name;

    @NotNull(message = "Product price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Product price must be greater than 0")
    private BigDecimal price;

    @NotNull(message = "Category id is required")
    private Long categoryId;
}
```

## 5. DTO cho update co giong create khong?

Tuy endpoint:

### PUT update day du

PUT nghia la client gui representation day du. DTO co the gan giong create, tru `sku` neu khong cho sua.

```java
public class UpdateProductRequest {
    @NotBlank
    private String name;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotNull
    private Long categoryId;
}
```

### PATCH update mot phan

PATCH phuc tap hon vi field co the null de nghia la "khong sua".

M1-4 chua can di sau PATCH.

## 6. Loi hay gap

### Sai 1: Dung `@NotNull` cho String

```java
@NotNull
private String name;
```

Sai vi `""` van pass.

Nen:

```java
@NotBlank
private String name;
```

### Sai 2: Dung `@Min` cho BigDecimal

`@Min` co the dung cho mot so numeric type, nhung voi tien nen dung:

```java
@DecimalMin(value = "0.0", inclusive = false)
```

### Sai 3: Dat validation tren Entity thay vi Request DTO

Entity co the co constraint DB/JPA, nhung API input nen validate o Request DTO.

Vi:

```text
DTO la hop dong voi client.
Entity la model persistence.
```

## 7. Tu kiem tra

1. `@NotNull` khac `@NotBlank` o dau?
2. `price` la `BigDecimal` nen dung annotation nao?
3. SKU format nen dung annotation nao?
4. Vi sao validation nen dat tren Request DTO?
5. PUT update va PATCH update khac nhau the nao ve validation?

## 8. Validation chay o thoi diem nao?

Voi Controller:

```java
@PostMapping
public ResponseEntity<?> create(
        @Valid @RequestBody CreateProductRequest request
) {
    return ResponseEntity.ok(productService.create(request));
}
```

Luong:

```text
Client gui JSON
-> Jackson doc JSON
-> Jackson tao CreateProductRequest
-> @Valid kich hoat Bean Validation
-> kiem tra tung annotation tren DTO
-> neu fail: nem MethodArgumentNotValidException
-> Controller method khong chay tiep
-> Service khong duoc goi
```

Neu pass:

```text
Jackson tao DTO
-> Validation pass
-> Controller nhan DTO da hop le
-> Controller goi Service
```

`@Valid` khong tu sua du lieu. No chi kiem tra va bao loi.

Vi du:

```text
" name " khong tu dong trim thanh "name".
price = -1 khong tu dong doi thanh 1.
```

Neu muon trim/normalize, do la buoc xu ly rieng.

## 9. Quy tac null cua cac annotation

Nhieu annotation chi kiem tra khi value khong null.

Vi du:

```java
@Size(min = 2, max = 100)
private String name;
```

Neu `name = null`, `@Size` thuong khong fail.

Vi vay neu field bat buoc:

```java
@NotBlank
@Size(min = 2, max = 100)
private String name;
```

Voi price:

```java
@NotNull
@DecimalMin(value = "0.0", inclusive = false)
private BigDecimal price;
```

Y nghia tach thanh hai rule:

```text
@NotNull -> bat buoc co price
@DecimalMin -> neu co price thi phai > 0
```

Voi SKU:

```java
@NotBlank
@Pattern(regexp = "...")
private String sku;
```

Y nghia:

```text
@NotBlank -> khong null/rong/space
@Pattern -> format phai dung
```

## 10. `@NotNull`, `@NotEmpty`, `@NotBlank`

```text
@NotNull
```

Chi chan:

```text
null
```

Nhung van cho:

```text
""
"   "
```

```text
@NotEmpty
```

Chan:

```text
null
empty
```

Nhung `"   "` van co the pass.

```text
@NotBlank
```

Chan:

```text
null
""
"   "
```

Cach nho:

```text
NotNull = phai co object
NotEmpty = phai co phan tu/ky tu
NotBlank = phai co noi dung thuc
```

## 11. So sanh `@Min`, `@Positive`, `@DecimalMin`

### `@Min`

Phu hop khi muon so nguyen lon hon hoac bang gia tri:

```java
@Min(1)
private Integer quantity;
```

### `@Positive`

Phu hop khi so phai lon hon 0:

```java
@Positive(message = "Price must be positive")
private BigDecimal price;
```

Van can `@NotNull` neu price bat buoc:

```java
@NotNull
@Positive
private BigDecimal price;
```

### `@DecimalMin`

Ro rang khi can mot moc thap phan:

```java
@DecimalMin(value = "0.0", inclusive = false)
private BigDecimal price;
```

Trong `shopcore`, dung `@DecimalMin` la de doc va dung voi money.

## 12. Validation cho Product cua ban

### Create Product

```java
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {

    @NotBlank(message = "Product sku is required")
    @Size(min = 3, max = 30, message = "Product sku must be 3-30 characters")
    @Pattern(
            regexp = "^[A-Z0-9-]+$",
            message = "Product sku format is invalid"
    )
    private String sku;

    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 100, message = "Product name must be 2-100 characters")
    private String name;

    @NotNull(message = "Product price is required")
    @DecimalMin(
            value = "0.0",
            inclusive = false,
            message = "Product price must be greater than 0"
    )
    private BigDecimal price;

    @NotNull(message = "Category id is required")
    private Long categoryId;
}
```

### Update Product

Neu khong cho sua SKU:

```java
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductRequest {

    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 100)
    private String name;

    @NotNull(message = "Product price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotNull(message = "Category id is required")
    private Long categoryId;
}
```

## 13. Validation khong thay the business check

DTO:

```java
@NotNull
private Long categoryId;
```

Rule nay chi noi:

```text
categoryId khong duoc null
```

No khong noi:

```text
Category id do co ton tai trong database hay khong
```

Vi vay van can Service:

```java
Category category = categoryRepository.findById(request.getCategoryId())
        .orElseThrow(() ->
                new AppException(ErrorCode.CATEGORY_NOT_FOUND));
```

Tach vai tro:

```text
DTO validation:
categoryId phai co gia tri va dung kieu Long

Service business:
categoryId phai tro toi Category dang ton tai
```

## 14. Validation khong kiem tra duplicate

Khong nen lam:

```java
@SkuMustBeUnique
private String sku;
```

neu custom validator phai query database de check trung.

Nen tach:

```text
SKU sai format -> DTO validation -> 400
SKU da ton tai -> Service repository check -> AppException -> 409
```

Ly do:

- Validation nen kiem tra format/gia tri request.
- Duplicate phu thuoc database state.
- Business rule nen nam trong Service.

## 15. Neu co nhieu loi cung luc

Request:

```json
{
  "sku": "",
  "name": "",
  "price": -1,
  "categoryId": null
}
```

Bean Validation co the thu duoc nhieu loi:

```text
sku required
name required
price must be greater than 0
categoryId required
```

Exception van la:

```text
MethodArgumentNotValidException
```

Global handler co the:

```text
chi lay loi dau tien
```

hoac tot hon:

```text
tra Map<field, message>
```

Vi du:

```json
{
  "code": 400,
  "message": "Validation failed",
  "errors": {
    "sku": "Product sku is required",
    "name": "Product name is required",
    "categoryId": "Category id is required"
  }
}
```

## 16. Cac case tu test trong shopcore

### Case 1: name rong

```json
{
  "sku": "KB-001",
  "name": "",
  "price": 1000,
  "categoryId": 1
}
```

Ket qua:

```text
400
MethodArgumentNotValidException
Service khong chay
```

### Case 2: price null

```json
{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": null,
  "categoryId": 1
}
```

Ket qua:

```text
@NotNull fail
400
```

### Case 3: price am

```json
{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": -1,
  "categoryId": 1
}
```

Ket qua:

```text
@DecimalMin fail
400
```

### Case 4: category khong ton tai

```json
{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": 1000,
  "categoryId": 999
}
```

Ket qua:

```text
DTO validation pass
Service chay
Repository tim Category
AppException(CATEGORY_NOT_FOUND)
404
```

## 17. Checklist truoc khi sang Lesson 03

- [ ] Biet `@NotNull` khong chan chuoi rong.
- [ ] Biet `@NotBlank` dung cho String bat buoc.
- [ ] Biet `@NotEmpty` khac `@NotBlank`.
- [ ] Biet ket hop `@NotNull` voi `@DecimalMin`.
- [ ] Biet `@Size`/`@Pattern` thuong khong thay the `@NotBlank`.
- [ ] Biet DTO validation khac business check trong Service.
- [ ] Biet duplicate SKU khong phai format validation.
- [ ] Biet validation fail thi Service/Repository khong chay.
- [ ] Biet `price = -1` trong DTO co `@DecimalMin` la 400.
