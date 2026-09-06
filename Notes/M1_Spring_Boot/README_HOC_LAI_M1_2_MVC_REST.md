# Học Lại M1-2 - Spring MVC, REST, 3-Layer

> File này chỉ tập trung vào các phần bạn còn thiếu trong bài kiểm tra M1-2: in-memory repository, JSON lỗi, exception flow, pagination, đọc code sai kiến trúc và thiết kế API list.

## 1. Vì sao M1-2 dùng `Map` thay database?

M1-2 chưa học database/JPA. Mục tiêu chính là hiểu:

```text
HTTP request -> Controller -> Service -> Repository -> response
```

Vì vậy dùng `Map` như một database giả:

```java
Map<Long, Product> products = new LinkedHashMap<>();
```

Lý do hợp lý:

- Có chỗ lưu dữ liệu tạm để CRUD chạy được.
- Không bị phân tâm bởi JPA, SQL, database config.
- Vẫn luyện đúng Repository pattern.
- Sang M1-3 chỉ thay `InMemoryProductRepository` bằng JPA repository.

Cách nhớ:

```text
Map là database giả.
Repository che giấu Map.
Service chỉ biết Repository interface.
Controller không biết dữ liệu lưu ở đâu.
```

Trả lời mẫu:

```text
Trong M1-2 dùng Map hợp lý vì module này học REST, 3-layer, DTO và status code, chưa học persistence. Map đóng vai trò database giả để tập trung vào luồng Controller -> Service -> Repository. Nếu Repository tách tốt bằng interface, sang M1-3 có thể thay implementation bằng JPA mà Controller/Service ít đổi.
```

## 2. JSON hỏng là lỗi gì?

Ví dụ:

```http
POST /api/products
Content-Type: application/json

{"sku":}
```

Đây là JSON sai cú pháp. Lỗi xảy ra trước khi vào Controller method.

Luồng:

```text
Client gửi JSON
-> Spring/Jackson cố đọc body
-> Jackson parse fail
-> Controller method chưa chạy
-> HttpMessageNotReadableException
-> GlobalExceptionHandler trả 400
```

Nó là **framework/request error**, không phải business error.

So sánh:

```text
JSON hỏng              -> framework/request error
GET /products/abc      -> framework/request error
price <= 0             -> business/input error
sku trùng              -> business conflict
category không tồn tại -> business/not found
```

Trả lời mẫu:

```text
Đây là framework/request error vì JSON sai format. Jackson không parse được body thành DTO nên Controller method chưa chạy. GlobalExceptionHandler nên bắt HttpMessageNotReadableException và trả 400 Bad Request.
```

## 3. Sai kiểu path/query parameter

Ví dụ:

```http
GET /api/products/abc
```

Controller:

```java
@GetMapping("/{id}")
public ResponseEntity<ProductResponse> getById(@PathVariable Long id) {
    return ResponseEntity.ok(productService.getById(id));
}
```

`abc` không đổi được thành `Long`.

Luồng:

```text
Spring MVC đọc path variable
-> cố convert "abc" thành Long
-> convert fail
-> Controller method chưa chạy
-> MethodArgumentTypeMismatchException
-> GlobalExceptionHandler trả 400
```

Trả lời mẫu:

```text
Controller method chưa chạy. Lỗi xảy ra ở bước Spring MVC resolve argument vì không convert được "abc" thành Long. Nên trả 400 Bad Request và handle bằng MethodArgumentTypeMismatchException.
```

## 4. AppException, ErrorCode, GlobalExceptionHandler chạy ra sao?

Trong Service:

```java
throw new AppException(ErrorCode.DUPLICATE_SKU);
```

Ý nghĩa:

```text
Service phát hiện lỗi nghiệp vụ: SKU trùng.
```

Luồng:

```text
Service throw AppException
-> exception bay ra khỏi Service
-> bay qua Controller
-> Spring MVC tìm exception handler phù hợp
-> GlobalExceptionHandler bắt AppException
-> lấy ErrorCode bên trong
-> lấy httpStatus/code/message
-> tạo ApiErrorResponse
-> trả HTTP response cho client
```

Ví dụ response:

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "code": 409,
  "message": "Duplicate Product SKU"
}
```

Cách nhớ:

```text
Service phát hiện lỗi.
ErrorCode mô tả lỗi.
AppException mang lỗi đi.
GlobalExceptionHandler đổi lỗi thành HTTP response.
```

Trả lời mẫu:

```text
Service throw AppException chứa ErrorCode.DUPLICATE_SKU. Exception đi ngược lên Spring MVC. GlobalExceptionHandler bắt AppException, lấy ErrorCode bên trong, dùng httpStatus để trả 409 Conflict và dùng code/message để tạo ApiErrorResponse cho client.
```

## 5. Optional trong Repository

Repository:

```java
Optional<Product> findById(Long id);
```

Vì sao không trả `null`?

- `Optional` nói rõ: có thể không tìm thấy dữ liệu.
- Caller buộc phải xử lý case rỗng.
- Giảm nguy cơ `NullPointerException`.
- Service có thể viết rõ:

```java
Product product = productRepository.findById(id)
        .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
```

Trả lời mẫu:

```text
findById nên trả Optional<Product> vì Product có thể không tồn tại. Optional buộc Service xử lý trường hợp empty rõ ràng, thường dùng orElseThrow để đổi thành business exception, tránh quên check null và gây NullPointerException.
```

## 6. Pagination bắt đầu từ `page=0`

Trong Spring, page thường bắt đầu từ `0`.

```text
page=0 -> trang 1
page=1 -> trang 2
page=2 -> trang 3
page=3 -> trang 4
```

Ví dụ có `45` Product, `size=20`:

```text
page=0 -> item 1-20
page=1 -> item 21-40
page=2 -> item 41-45
page=3 -> rỗng
```

Vậy request:

```http
GET /api/products?page=3&size=20
```

Nên trả:

```http
200 OK
```

Body:

```json
{
  "content": [],
  "page": 3,
  "size": 20,
  "totalElements": 45,
  "totalPages": 3
}
```

Vì `page=3` không sai format. Nó chỉ là trang không có item.

Công thức:

```text
fromIndex = page * size
toIndex = min(fromIndex + size, totalElements)
totalPages = ceil(totalElements / size)
```

Nếu:

```text
fromIndex >= totalElements
```

thì trả `content` rỗng.

Trả lời mẫu:

```text
Nên trả 200 OK với content rỗng nếu page và size hợp lệ. Vì page bắt đầu từ 0 nên với 45 item, size 20 sẽ có page 0, 1, 2. page 3 là trang hợp lệ về format nhưng không có dữ liệu. Đây không phải lỗi request.
```

## 7. Đọc code sai kiến trúc

Code ví dụ:

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository productRepository;

    @PostMapping("/create")
    public Product create(@RequestBody Product product) {
        if (product.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            return null;
        }
        return productRepository.save(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok("deleted");
    }
}
```

Các lỗi cần nhìn ra:

- Controller gọi Repository trực tiếp.
- Không có Service.
- Dùng `Product` làm request body, thiếu DTO.
- URL `/create` dùng động từ, không RESTful.
- Business rule `price <= 0` nằm trong Controller.
- Lỗi price trả `null`, không có status/error rõ.
- POST tạo mới không trả `201 Created`.
- POST thiếu `Location` header.
- DELETE không check id tồn tại.
- DELETE trả `200` + text, trong khi nên trả `204 No Content`.

Hướng sửa:

```text
POST /api/products
Controller nhận CreateProductRequest
Controller gọi ProductService.create()
Service validate price
Service gọi Repository.save()
Service trả ProductResponse
Controller trả 201 Created + Location
```

DELETE:

```text
Controller gọi ProductService.delete(id)
Service check Product tồn tại
Repository delete
Controller trả 204 No Content
```

## 8. Thiết kế API list Product có pagination

Method + URL:

```http
GET /api/products?page=0&size=20
```

Query param:

```text
page: mặc định 0
size: mặc định 20
```

Validate:

```text
page >= 0
1 <= size <= 100
sai -> 400 Bad Request
```

Response body:

```json
{
  "content": [],
  "page": 0,
  "size": 20,
  "totalElements": 0,
  "totalPages": 0
}
```

Lớp tính pagination:

```text
Service tính pagination nếu đang dùng Map in-memory.
Repository chỉ trả List<Product>.
Repository không biết HTTP.
Repository không trả PageResponse.
```

Trả lời mẫu:

```text
API là GET /api/products?page=0&size=20. Query param gồm page mặc định 0 và size mặc định 20. Response gồm content, page, size, totalElements, totalPages. Validate page >= 0 và 1 <= size <= 100, sai thì trả 400. Với Map in-memory, Service tính pagination sau khi lấy list từ Repository vì Repository chỉ chịu trách nhiệm đọc dữ liệu, không biết HTTP contract.
```

## 9. Checklist học lại trước khi làm lại bài

- [ ] Giải thích được vì sao M1-2 dùng `Map`.
- [ ] Biết JSON hỏng -> `HttpMessageNotReadableException`.
- [ ] Biết path/query sai kiểu -> `MethodArgumentTypeMismatchException`.
- [ ] Kể được flow `AppException -> ErrorCode -> GlobalExceptionHandler`.
- [ ] Biết `Optional` giúp xử lý dữ liệu không tồn tại rõ ràng.
- [ ] Nhớ pagination bắt đầu từ `page=0`.
- [ ] Nhìn code Controller gọi Repository và biết sai kiến trúc.
- [ ] Thiết kế được `GET /api/products?page=0&size=20`.

## 10. Tóm tắt một dòng

```text
M1-2 không phải học database; M1-2 học cách HTTP request đi qua Controller, Service, Repository, cách DTO bảo vệ API, cách exception thành status code, và cách pagination trả metadata đúng.
```
