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
Validation Error là bị lỗi về valid , valid ở trong dto thì có các annonation như @NotNull , @NotBlank r đồ thì bị lỗi khi mà trong body gửi về từ client dính mấy field đó mà sai valid của nó . ví dụ như name:"" ( trong khi valid là not blank) hoặc là price : haha , này là bị lỗi là miss match type  . Validation là lỗi về request gửi về có thể là json bị lỗi hoặc thiếu {} , các dữ liệu , value bị sai data . Ví dụ nữa là các field bị trống r đồ thôi nhưng mà tuỳ nha , có 3 loại là notnull , notblank , notempty
---

## Câu 2 - Business Error là gì? (3đ)

Giải thích Business Error bằng lời của bạn. Cho 2 ví dụ trong API Product/Category.

**Trả lời:** Bussiness Error là lỗi về bussiness Logic , kiểu như là request đã vượt qua được từ filterchain đến servlet dispatcher đến controller và qua tới service rồi , đây sẽ là lỗi từ logic mà ta đặt ra , ví dụ như là price bị âm , .. nói ở đây là tính đúng đắng logic của dữ liệu . Ví dụ là Product không tìm thấy , số lượng âm ,...

---

## Câu 3 - Phân biệt hai loại lỗi (3đ)

Điền bảng sau:

| Tình huống | Validation hay Business? | Status |
|---|---|---:|
| `name = ""` |  |  |
| `price = -1` |  |  |
| `categoryId = 999` không tồn tại |  |  |
| SKU đúng format nhưng đã tồn tại |  |  |

**Trả lời:** name = "" thì là Validation , status sẽ là 400 
price là -1 thì là business status là 400
categoryId = 999 k tồn tại thì là bussiness  , status là 404 là không tìm thấy
Sku đúng format nhưng đã tồn tịa thì là Bussiness , status là 409 là conflict , cái price là do bạn k nói rõ là trong dto có @(min = 0) nha , nếu mà có thì là Validation

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
đầu tiên là Requét từu client đi qua Tomcat , sau đó là FIlter Chain ( cho secủity ) sau đó là đi đến DispatcherServlet thì nó sẽ có Handle. Mapping và Handler Apdater , sau khi mà phân giải request rồi thì nó sẽ mapping và thằng DispatcherServlet sẽ gọi Handler Adapter ,để thằng đó nó dùng Jackson để xem thử json đúng dắnd không , nếu mà jsson bị sai k phân giải được thì sẽ quăng ra lỗi là missmatch hoặc là not readable , nếu mà ổn r thì bean Validation là kiểm tra thửu value có hợp lệ vơis annonation valid không , nếu ổn thì đi qua controller , service r trong đó có bussiness logic . 
---

## Câu 5 - Vai trò GlobalExceptionHandler (3đ)

`@RestControllerAdvice` và `@ExceptionHandler` dùng để làm gì? Vì sao không nên `try/catch` riêng trong từng Controller?

**Trả lời:** @RestControllerAdvice là nơi mà khi mà lỗi thì nó sẽ quy tụ về đây để mà xử lý exception đó như nào , giống như khi mà xảy ra lỗi ở phía backend , ví dụ như ở valid hoặc là bussiness thì thằng restcontrolleradvice là nơi để ửl ý exception đó r trả về HTTP lỗi , @ỄcptionHandler là cách xử lý exception . Không nên try catch riêng vì phải viết nhiều thêm , chưa kể là từng controller phải viết try catch r service cũng viết thì khó mà quản lý nên là sinh ra câu chuyện là có 1 thằng chuyên xử lý lỗi bằng cahcs khi có lỗi thì ném lỗi đó để mà nó xử lý , và chúng ta có nhiều class lỗi cần xử lý như AppException , xử lý của valid cũng có , missmatchtype cũng có

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
Jackson không tạo được DTO vì nó bị thiếu } và bị lỗi là notrealable , chính vì thế mà bean validation không được chạy . Exception là HttpMessageNotReadableException gì đó tôi quên r , là nó throw lỗi ở đó và controller và service không được chạy . Status code là 400
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
lỗi nó sẽ như này equét từu client đi qua Tomcat , sau đó là FIlter Chain ( cho secủity ) sau đó là đi đến DispatcherServlet thì nó sẽ có Handle. Mapping và Handler Apdater , sau khi mà phân giải request rồi thì nó sẽ mapping và thằng DispatcherServlet sẽ gọi Handler Adapter ,để thằng đó nó dùng Jackson để xem thử json đúng dắnd không , nếu mà jsson bị sai k phân giải được thì sẽ quăng ra lỗi là missmatch hoặc là not readable , nếu mà ổn r thì bean Validation là kiểm tra thửu value có hợp lệ vơis annonation valid không , nếu ổn thì đi qua controller , service r trong đó có bussiness logic . ở đây là trong dto có NotBlank và NotNull và @DecimalMin thì là trong dto đã sai cả 2 là name và price , name là bị blank , price là -1 thì ở chỉ nằm ở luồng là bean validation xogn nó throw ra lỗi là Valid exception , Service và Repo không được gọi
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
lỗi nó sẽ như này equét từu client đi qua Tomcat , sau đó là FIlter Chain ( cho secủity ) sau đó là đi đến DispatcherServlet thì nó sẽ có Handle. Mapping và Handler Apdater , sau khi mà phân giải request rồi thì nó sẽ mapping và thằng DispatcherServlet sẽ gọi Handler Adapter ,để thằng đó nó dùng Jackson để xem thử json đúng dắnd không , nếu mà jsson bị sai k phân giải được thì sẽ quăng ra lỗi là missmatch hoặc là not readable , nếu mà ổn r thì bean Validation là kiểm tra thửu value có hợp lệ vơis annonation valid không , nếu ổn thì đi qua controller , service r trong đó có bussiness logic . ở trường hợp này là request đúng đắng , không bị lỗi valid . nó sẽ đi qua controller và tới service ,trong service sẽ có code để kiểm tra thử CategoryId có tồn tại không , trường hợp này là không nên nó sẽ ném lỗi là 404 , đây là lỗi businees logic và tất nhiên là controlelr service và repository sẽ được chạy hết , lỗi phát hiện ở service , repo chỉ để tìm dữ liệu , k thấy thì quyết định quăng lỗi là ở service , status là 404 , exception là AppException CategoryNotFound , kiểu vậy
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

**Trả lời:** Spring lỗi ở bước Jackson nó phân giải cái json thì nó hong làm được do là bị lỗi abc là String nhưng mà nó cần int , thì bị lỗi HttpMessageNotReadableException . Controller không chạy được nên là Service/Repo k chạy dc luôn , status code là 400

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
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiErrorResponse> handleAppException(
            AppException exception
    ) {
        ErrorCode errorCode = exception.getErrorCode();

        ApiErrorResponse response = ApiErrorResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(response);
    }
}
