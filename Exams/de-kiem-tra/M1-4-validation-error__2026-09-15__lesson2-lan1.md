# Bài kiểm tra M1-4 Validation & Error - Lesson 02

> Chế độ: `NHANH / LESSON_02`  
> Trọng tâm: Jakarta Validation trên DTO, cách chọn annotation, `@NotNull`/`@NotBlank`/`@NotEmpty`, validation flow và phân biệt validation với business check.  
> Tổng điểm thô: 43 điểm. Normalize về thang 100 khi chấm.  
> Cách làm: ưu tiên giải thích bản chất; code mini có thể là code gần đúng nhưng phải đúng ý.

## Hướng dẫn

- Không xem file đáp án trước khi làm.
- Trả lời theo đúng số câu.
- Với câu tình huống, cần nói annotation nào fail và Service/Repository có chạy không.

---

## Câu 1 - DTO validation là gì? (3đ)

DTO validation dùng để làm gì? Vì sao nên đặt validation trên Request DTO thay vì chỉ kiểm tra trong Service?

**Trả lời:**
DTO Validation được hiểu là sau khi mà Jackson chuyển từ json thành to thì nó sẽ valid xem thử các field có hợp lệ với annonation dc gắn ở DTo không , việc mà ta đặt validation trên reuqest DTO được ví như là bước kiểm tra thử là request có hợp lệ không đã , service thì chủ yếu là bussiness logic , để kiểm tra tính hợp lệ logic của dự án , còn validation ở DTO thì là cổng kiểm tra request có hợp lệ về mặt hình thức
---

## Câu 2 - `@NotNull`, `@NotEmpty`, `@NotBlank` (3đ)

Phân biệt ba annotation trên. Cho biết annotation nào phù hợp nhất cho:

```text
String name
Long categoryId
List<Long> ids
```

**Trả lời:** @NutNull là kiểm tra có null không , @NotEmpty là kiểm tra có null và "" không , @NotBlank là kiểm tra có null và "" và " " không , Annonation @NotBlank phù hợp với lại String name nha, theo tôi nghĩ là tuỳ thuộc vào tính càn thiết của field đó , ví dụ như là không cần thiết phải attach categoryId ngay từ đầu thì chọn @NotNull , r đồ
Long categoryId thì sẽ là @Notnull , ids sẽ là @NotEmpty , chắc là vậy xong r giải thích tôi vì ssao nên chọn giauwx 3 cái nhé

---

## Câu 3 - Chọn annotation (3đ)

Chọn annotation phù hợp cho các field:

```text
Product name: bắt buộc, dài 2-100 ký tự
Product price: bắt buộc, phải lớn hơn 0, kiểu BigDecimal
Product quantity: bắt buộc, ít nhất 1, kiểu Integer
Product email: phải đúng format email
```

**Trả lời:**
name thì là @NotBlank , @Size(min =2 , max =100)
price là @NotNull , @DecimalMin(value = "0.0", inclusive = false)
quantity là @NotNull , @Min(1)
email là @email
---

## Câu 4 - Annotation bỏ qua null (3đ)

Giải thích vì sao đoạn code sau thường cần thêm `@NotNull`:

```java
@DecimalMin(value = "0.0", inclusive = false)
private BigDecimal price;
```

Nếu `price = null` thì annotation `@DecimalMin` có đủ để bắt lỗi không?

**Trả lời:** thường phải thêm @Notnull là vì nó có thể bị null m @DemicalMin thì nó chỉ là giới hạn là min là > 0 th chứ chưa giải quyết câu chuyện nó null hay không

---

## Câu 5 - `@Size` và `@NotBlank` (3đ)

Đoạn code sau có chặn được `name = ""` và `name = "   "` không?

```java
@Size(min = 2, max = 100)
private String name;
```

Nếu chưa đủ, hãy sửa annotation.

**Trả lời:**không chặn được nhé , phỉa để @NotBlank nha , do name = null  thì vẫn được accept nhé , không được accept khi khi là "" hoặc là " " 

---

## Câu 6 - Luồng `@Valid` (3đ)

Với Controller:

```java
@PostMapping
public ResponseEntity<?> create(
        @Valid @RequestBody CreateProductRequest request
) {
    return ResponseEntity.ok(productService.create(request));
}
```

Hãy kể luồng khi DTO vi phạm `@NotBlank`. Service và Repository có chạy không?

**Trả lời:** Nó sẽ đi qua filter chain r tới dispatcher servlet r handler mapping sẽ map dc method , handler adapter nó sẽ xử lý và nó chia 2 luồng xử lý param hoặc là xử lý json body , ở json body nó sẽ kiểm tra tính đúng đắng của json , data có hợp lệ không , nếu ổn thì sẽ từ json thành DTO , khúc này là kiểm tra xem thử có valid theo annonation @Valid không , thì nếu phát hiện lỗi là vi phạm @Notblank thì nó sẽ throw ra lỗi là MethodArgumentNotValidException và service và repo k dc chạy nha 

---

## Câu 7 - Phân tích request sai (5đ)

DTO có:

```java
@NotBlank
private String name;

@NotNull
@DecimalMin(value = "0.0", inclusive = false)
private BigDecimal price;

@NotNull
private Long categoryId;
```

Client gửi:

```json
{
  "name": "",
  "price": null,
  "categoryId": null
}
```

Hãy trả lời:

- Có bao nhiêu field vi phạm?
- Exception nào xảy ra?
- Status code nào?
- Controller method có chạy tiếp không?
- Service/Repository có chạy không?

**Trả lời:**
3 field vi phạm luôn nhé em yêu 
exception MethodArgumentNotValidException
Status code là 400
controller method k chyaj tiếp
service/repo cũng không chạy tiếp

---

## Câu 8 - Validation hay business? (5đ)

Phân loại từng trường hợp và giải thích:

```text
1. categoryId = null
2. categoryId = 999 nhưng database không có Category 999
3. sku = "abc xyz" sai format
4. sku = "KB-001" đúng format nhưng đã tồn tại
5. price = -1 trong DTO có @DecimalMin
```

**Trả lời:** categoryId=null là validation vì thường sẽ nó @Notnull trên categoryId nhé 
categoryId = 999 thì sẽ là lỗi business vì nó đúng request , body json đúng và k vi phạm valid thì nó sẽ được vô controlelr r service , service sẽ kiểm tra thử nó có không , k thì throw lỗi ( bussiness error)
sai format thì là lỗi validation nhé , sẽ có regex để mà check
sku KB-001 đúng format thì sẽ vô được tới service và dùng repo để check , nếu tồn tại r thì lỗi business 409
price --1 sẽ bị lỗi validation nhé , vì trong dto có @DecimalMin rồi mà 

---

## Câu 9 - Viết DTO (5đ)

Viết `CreateProductRequest` dùng Lombok class, có các rule:

```text
sku: bắt buộc, dài 3-30 ký tự
name: bắt buộc, dài 2-100 ký tự
price: bắt buộc, lớn hơn 0
categoryId: bắt buộc
```

Không cần custom `@ValidSku` ở bài này.

**Trả lời:**
```java
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {

    @NotBlank
    @Size(min = 3, max = 30)
    private String sku;

    @NotBlank
    @Size(min = 2, max = 100)
    private String name;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotNull
    private Long categoryId;
}
mà vì sao value = "0.0" mà không phải là 0 vyaaj , chưa hiểu khúc đó lắm
---

## Câu 10 - Sửa code validation (10đ)

Đoạn DTO sau đang thiếu hoặc dùng chưa hợp lý annotation:

```java
public class CreateProductRequest {

    @NotNull
    private String sku;

    private String name;

    @Min(0)
    private BigDecimal price;

    private Long categoryId;
}
```

Hãy sửa lại để phù hợp với yêu cầu:

```text
sku: không null/rỗng, dài 3-30
name: không null/rỗng, dài 2-100
price: bắt buộc và > 0
categoryId: bắt buộc
```

Giải thích ngắn từng thay đổi.

**Trả lời:**

Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {

    @NotBlank(message = "Product sku is required")
    @Size(min = 3, max = 30, message = "Product sku must be 3-30 characters")
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

Các lỗi cần sửa:

```text
@NotNull trên String sku không chặn chuỗi rỗng -> đổi thành @NotBlank.
name chưa có validation -> thêm @NotBlank và @Size.
@Min không phải lựa chọn rõ ràng cho BigDecimal tiền -> dùng @DecimalMin.
price cần @NotNull để chặn null.
categoryId cần @NotNull để bắt buộc có id.
```