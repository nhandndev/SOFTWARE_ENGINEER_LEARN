# Bài kiểm tra M1-4 Validation & Error - Lesson 01

> Chế độ: `NHANH / LESSON_01`  
> Trọng tâm: phân biệt Validation Error và Business Error, vị trí phát sinh lỗi trong request flow, exception tương ứng và GlobalExceptionHandler.  
> Tổng điểm thô: 43 điểm. Normalize về thang 100 khi chấm.  
> Cách làm: ưu tiên giải thích bằng ý nghĩa và luồng chạy; code chỉ cần đúng ý, không bắt buộc hoàn hảo cú pháp.

## Hướng dẫn

- Không xem file đáp án trước khi làm.
- Trả lời theo đúng số câu.
- Với câu tình huống, cần nói rõ: lỗi phát sinh ở bước nào, lớp nào phát hiện, exception nào và HTTP status nào.

---

## Câu 1 - Validation Error là gì? (3đ)

Giải thích Validation Error bằng lời của bạn. Cho 2 ví dụ trong API Product.

**Trả lời:**

---

## Câu 2 - Business Error là gì? (3đ)

Giải thích Business Error bằng lời của bạn. Cho 2 ví dụ trong API Product/Category.

**Trả lời:**

---

## Câu 3 - Phân biệt hai loại lỗi (3đ)

Điền bảng sau:

| Tình huống | Validation hay Business? | Status |
|---|---|---:|
| `name = ""` |  |  |
| `price = -1` |  |  |
| `categoryId = 999` không tồn tại |  |  |
| SKU đúng format nhưng đã tồn tại |  |  |

**Trả lời:**

---

## Câu 4 - Luồng request (3đ)

Viết thứ tự xử lý của request tạo Product từ lúc Client gửi JSON cho đến lúc Service được gọi.

Cần có các thành phần chính:

```text
FilterChain
DispatcherServlet
HandlerMapping
HandlerAdapter
Jackson
Bean Validation
Controller
Service
```

**Trả lời:**

---

## Câu 5 - Vai trò GlobalExceptionHandler (3đ)

`@RestControllerAdvice` và `@ExceptionHandler` dùng để làm gì? Vì sao không nên `try/catch` riêng trong từng Controller?

**Trả lời:**

---

## Câu 6 - JSON sai cú pháp (3đ)

Client gửi JSON thiếu dấu `}`:

```json
{
  "name": "Keyboard",
  "price": 1000,
  "categoryId": 1
```

Hãy trả lời:

- Jackson có tạo được DTO không?
- Bean Validation có chạy không?
- Exception nào xảy ra?
- Controller và Service có chạy không?
- Status code nào?

**Trả lời:**

---

## Câu 7 - DTO validation fail (5đ)

DTO có:

```java
public class CreateProductRequest {
    @NotBlank
    private String name;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;
}
```

Controller có:

```java
@PostMapping
public ResponseEntity<?> create(
        @Valid @RequestBody CreateProductRequest request
) {
    return ResponseEntity.ok(productService.create(request));
}
```

Client gửi:

```json
{
  "name": "",
  "price": -1
}
```

Kể toàn bộ luồng lỗi. Cần nói rõ Service và Repository có được gọi không.

**Trả lời:**

---

## Câu 8 - Business error category không tồn tại (5đ)

Client gửi request hợp lệ:

```json
{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": 1500000,
  "categoryId": 999
}
```

Category `999` không tồn tại.

Hãy kể luồng từ Jackson đến response. Lỗi được phát hiện ở Controller, Service hay Repository? Exception và status là gì?

**Trả lời:**

---

## Câu 9 - Sai kiểu query parameter (5đ)

Controller có:

```java
@GetMapping
public ResponseEntity<?> getAll(
        @RequestParam int page
) {
    return ResponseEntity.ok(...);
}
```

Client gọi:

```http
GET /api/products?page=abc
```

Hãy giải thích:

- Spring lỗi ở bước nào?
- Exception nào?
- Controller method có chạy không?
- Service/Repository có chạy không?
- Status code nào?

**Trả lời:**

---

## Câu 10 - Code handler cho AppException (10đ)

Viết code hoặc pseudo-code cho `GlobalExceptionHandler` xử lý:

```java
throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
```

Yêu cầu:

- Có `@RestControllerAdvice`.
- Có `@ExceptionHandler(AppException.class)`.
- Lấy `ErrorCode` từ exception.
- Tạo error response có `code` và `message`.
- Trả HTTP status từ `ErrorCode`.

Bạn có thể dùng `ApiErrorResponse` của project hiện tại.

**Trả lời:**

