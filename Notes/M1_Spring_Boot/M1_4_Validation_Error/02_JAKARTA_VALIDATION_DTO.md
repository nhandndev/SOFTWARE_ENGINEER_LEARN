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

