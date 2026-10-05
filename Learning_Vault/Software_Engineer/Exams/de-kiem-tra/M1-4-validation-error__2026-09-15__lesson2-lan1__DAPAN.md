# Đáp án M1-4 Validation & Error - Lesson 02

> Tổng điểm thô: 43 điểm.  
> Normalize: `điểm thô / 43 * 100`.

## Câu 1 - 3đ

DTO validation mô tả và kiểm tra dữ liệu đầu vào trước khi chạy nghiệp vụ.

Đặt trên DTO giúp:

```text
Request sai bị chặn sớm.
Service không phải viết nhiều if kiểm tra format.
Controller/API có contract rõ ràng.
```

## Câu 2 - 3đ

```text
@NotNull  -> chỉ cấm null
@NotEmpty -> cấm null và empty, nhưng chuỗi toàn space có thể pass
@NotBlank -> cấm null, empty và toàn space
```

Gợi ý:

```text
String name       -> @NotBlank
Long categoryId   -> @NotNull
List<Long> ids    -> @NotEmpty
```

## Câu 3 - 3đ

```text
name     -> @NotBlank + @Size(min = 2, max = 100)
price    -> @NotNull + @DecimalMin(value = "0.0", inclusive = false)
quantity -> @NotNull + @Min(1)
email    -> @Email
```

## Câu 4 - 3đ

`@DecimalMin` thường bỏ qua `null`; nó kiểm tra giá trị khi field có giá trị.

Vì vậy cần:

```java
@NotNull
@DecimalMin(value = "0.0", inclusive = false)
private BigDecimal price;
```

## Câu 5 - 3đ

`@Size` không đảm bảo chặn `null`, chuỗi rỗng hoặc toàn khoảng trắng theo mục tiêu bắt buộc.

Sửa:

```java
@NotBlank
@Size(min = 2, max = 100)
private String name;
```

## Câu 6 - 3đ

```text
Jackson tạo DTO
-> @Valid kích hoạt Bean Validation
-> @NotBlank fail
-> MethodArgumentNotValidException
-> Controller method không chạy tiếp
-> Service/Repository không chạy
-> trả 400
```

## Câu 7 - 5đ

Ba field vi phạm:

```text
name = ""       -> @NotBlank
price = null    -> @NotNull
categoryId=null -> @NotNull
```

Kết quả:

```text
MethodArgumentNotValidException
400 Bad Request
Controller method không chạy tiếp
Service/Repository không chạy
```

## Câu 8 - 5đ

```text
1. categoryId = null
   Validation -> @NotNull -> 400

2. categoryId = 999 không tồn tại
   Business -> Service/AppException -> 404

3. sku = "abc xyz" sai format
   Validation -> @Pattern/custom validator -> 400

4. sku = "KB-001" đã tồn tại
   Business -> Service/AppException -> 409

5. price = -1 có @DecimalMin
   Validation -> MethodArgumentNotValidException -> 400
```

## Câu 9 - 5đ

Ví dụ:

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
```

## Câu 10 - 10đ

Ví dụ:

```java
@Getter
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
