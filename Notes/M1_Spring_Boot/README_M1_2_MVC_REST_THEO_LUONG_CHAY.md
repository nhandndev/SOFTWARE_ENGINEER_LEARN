# M1-2 - MVC REST Theo Luồng Chạy

> Bản này dành cho người **biết code Controller/Service/Repository rồi nhưng chưa giữ được luồng chạy trong đầu**. Không học thuộc từng annotation. Hãy đọc như đang debug một request thật.

## 1. Một câu nhớ cả module

```text
Client gửi HTTP request.
Spring MVC biến request thành lời gọi Controller.
Controller gọi Service.
Service xử lý nghiệp vụ và gọi Repository.
Repository lấy/lưu dữ liệu.
Kết quả đi ngược về Controller.
Spring MVC biến object thành HTTP response.
```

Rút gọn:

```text
HTTP -> Controller -> Service -> Repository -> Service -> Controller -> HTTP
```

Điểm rất quan trọng:

```text
Client <-> Server: HTTP/JSON
Controller <-> Service <-> Repository: Java method call
```

## 2. Ví dụ request thật

Client gửi:

```http
POST /api/products
Content-Type: application/json

{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": 1500000,
  "categoryId": 1
}
```

Backend trả:

```http
HTTP/1.1 201 Created
Location: /api/products/10
Content-Type: application/json

{
  "id": 10,
  "sku": "KB-001",
  "name": "Keyboard",
  "price": 1500000,
  "categoryId": 1
}
```

## 3. Request này chạy từng bước thế nào?

```text
1. Client gửi HTTP request.
2. Embedded Tomcat nhận request.
3. DispatcherServlet nhận request từ Tomcat.
4. Spring MVC tìm Controller method khớp POST /api/products.
5. Jackson đọc JSON body.
6. Jackson tạo CreateProductRequest.
7. ProductController.create(request) được gọi.
8. Controller gọi productService.create(request).
9. Service validate input.
10. Service hỏi CategoryRepository xem categoryId có tồn tại không.
11. Service hỏi ProductRepository xem sku có trùng không.
12. Service tạo Product model.
13. Repository lưu Product vào Map.
14. Repository trả Product đã có id.
15. Service đổi Product thành ProductResponse.
16. Controller tạo ResponseEntity 201 + Location.
17. Jackson đổi ProductResponse thành JSON.
18. Client nhận HTTP response.
```

Hãy nhớ:

```text
JSON thành DTO trước khi vào Controller method.
DTO thành model trong Service.
Model thành response DTO trong Service.
Response DTO thành JSON sau khi Controller return.
```

## 4. Ai làm gì?

### Controller

Controller là lớp hiểu HTTP.

Nó biết:

```text
URL nào
HTTP method nào
path variable nào
query param nào
request body nào
status code nào
header nào
```

Ví dụ:

```java
@PostMapping
public ResponseEntity<ProductResponse> create(
        @RequestBody CreateProductRequest request) {
    ProductResponse created = productService.create(request);
    URI location = URI.create("/api/products/" + created.getId());
    return ResponseEntity.created(location).body(created);
}
```

Controller nên làm:

```text
nhận request
gọi Service
trả ResponseEntity
```

Controller không nên làm:

```text
check sku trùng
tính business rule lớn
gọi Repository trực tiếp
tự thao tác Map/database
```

### Service

Service là lớp hiểu nghiệp vụ.

Nó biết:

```text
Product tạo mới cần rule gì
Category có tồn tại không
SKU có trùng không
price có hợp lệ không
delete có được phép không
```

Ví dụ luồng trong Service:

```text
create Product
-> check sku không rỗng
-> check price > 0
-> check category tồn tại
-> check sku không trùng
-> tạo Product
-> save
-> trả ProductResponse
```

Service nên làm:

```text
validate business rule
gọi repository
mapping DTO <-> model
throw AppException khi lỗi
```

Service không nên làm:

```text
trả ResponseEntity
biết quá nhiều về HTTP
tự parse JSON
```

### Repository

Repository là lớp hiểu cách lấy/lưu dữ liệu.

Ở M1-2:

```text
Repository dùng Map.
```

Ở M1-3:

```text
Repository dùng JPA/database.
```

Điểm hay là Service không cần quan tâm bên dưới là Map hay database:

```java
productRepository.findById(id)
```

Repository nên làm:

```text
save
findById
findAll
existsBySku
deleteById
```

Repository không nên làm:

```text
trả ResponseEntity
trả HTTP status
trả DTO response
biết Controller
```

## 5. Vì sao cần DTO?

DTO là object đi qua biên API.

```text
CreateProductRequest -> client gửi vào
UpdateProductRequest -> client gửi vào khi sửa
ProductResponse      -> server trả ra
```

Model là object nội bộ:

```text
Product
Category
```

Không dùng thẳng Product làm request/response vì:

```text
Request tạo mới không có id.
Response có id do server tạo.
Client không nên sửa mọi field.
API không nên phụ thuộc chặt vào model/database.
Có thể lộ field nội bộ.
```

Luồng DTO:

```text
JSON request
-> CreateProductRequest
-> Product
-> ProductResponse
-> JSON response
```

## 6. Annotation chạy trong đầu thế nào?

### `@RestController`

Nói với Spring:

```text
Class này nhận HTTP request và trả dữ liệu trực tiếp, thường là JSON.
```

### `@RequestMapping("/api/products")`

Đặt prefix URL cho cả Controller.

```text
/api/products
```

### `@GetMapping("/{id}")`

Ghép với prefix thành:

```text
GET /api/products/{id}
```

### `@PathVariable Long id`

Lấy dữ liệu từ path:

```text
/api/products/10 -> id = 10
```

Nếu:

```text
/api/products/abc
```

Spring không đổi được `"abc"` thành `Long`, method chưa chạy.

### `@RequestParam`

Lấy dữ liệu sau dấu `?`:

```http
GET /api/products?page=0&size=20
```

```java
@RequestParam(defaultValue = "0") int page
@RequestParam(defaultValue = "20") int size
```

### `@RequestBody`

Đọc JSON body và chuyển thành DTO:

```java
@RequestBody CreateProductRequest request
```

Spring dùng Jackson để làm việc này.

## 7. DispatcherServlet là gì?

Bạn có thể hiểu đơn giản:

```text
DispatcherServlet là người điều phối chính của Spring MVC.
```

Nó làm:

```text
nhận request từ Tomcat
tìm Controller method phù hợp
chuẩn bị argument cho method
gọi method
xử lý return value
đổi object thành response
xử lý exception nếu có
```

Bạn không cần tự gọi `DispatcherServlet`. Spring Boot cấu hình sẵn.

## 8. Jackson làm gì?

Jackson là thư viện chuyển đổi JSON <-> Java object.

Request:

```text
JSON body -> CreateProductRequest
```

Response:

```text
ProductResponse -> JSON body
```

Nếu JSON hỏng:

```text
Jackson parse fail
Controller method chưa chạy
HttpMessageNotReadableException
400 Bad Request
```

Ví dụ JSON hỏng:

```json
{"sku":}
```

## 9. Status code nhớ kiểu thực dụng

```text
200 OK
GET thành công
PUT thành công có body

201 Created
POST tạo mới thành công
có Location header

204 No Content
DELETE thành công
không có body

400 Bad Request
request sai format/input sai
page âm, size sai, JSON hỏng, price <= 0

404 Not Found
resource không tồn tại
Product id không có, Category id không có

409 Conflict
request đúng nhưng đụng state hiện tại
SKU trùng, Category name trùng, xóa Category còn Product
```

## 10. Exception flow

Có 2 nhóm lỗi.

### Framework/request error

Lỗi xảy ra khi Spring/Jackson xử lý request.

Ví dụ:

```text
GET /api/products/abc
POST body JSON hỏng
```

Luồng:

```text
Spring/Jackson phát hiện lỗi
-> Controller method có thể chưa chạy
-> GlobalExceptionHandler bắt exception
-> trả 400
```

Exception hay gặp:

```text
MethodArgumentTypeMismatchException
HttpMessageNotReadableException
```

### Business error

Lỗi do rule nghiệp vụ.

Ví dụ:

```text
SKU trùng
Category không tồn tại
Product không tồn tại
Xóa Category còn Product
```

Luồng:

```text
Controller gọi Service
-> Service phát hiện rule sai
-> Service throw AppException(ErrorCode.X)
-> GlobalExceptionHandler bắt AppException
-> lấy httpStatus/code/message
-> trả ApiErrorResponse
```

Cách nhớ:

```text
Framework lỗi trước Controller.
Business lỗi trong Service.
Handler đổi lỗi thành HTTP response.
```

## 11. In-memory Repository bằng Map để làm gì?

M1-2 chưa học database.

Nên dùng:

```java
Map<Long, Product> products = new LinkedHashMap<>();
```

Mục tiêu:

```text
có dữ liệu để CRUD
tập trung học REST/3-layer
chưa bị JPA/SQL làm rối
luyện Repository interface
```

Sau này M1-3 đổi:

```text
InMemoryProductRepository -> JpaProductRepository
Map -> database
```

Controller và Service nên đổi ít nhất có thể.

## 12. Pagination chạy thế nào?

Client gọi:

```http
GET /api/products?page=1&size=2
```

Service có list:

```text
P1, P2, P3, P4, P5
```

Spring page bắt đầu từ `0`:

```text
page=0 -> P1, P2
page=1 -> P3, P4
page=2 -> P5
page=3 -> rỗng
```

Công thức:

```text
fromIndex = page * size
toIndex = min(fromIndex + size, totalElements)
totalPages = ceil(totalElements / size)
```

Với `page=1`, `size=2`, `totalElements=5`:

```text
fromIndex = 1 * 2 = 2
toIndex = min(2 + 2, 5) = 4
content = subList(2, 4) = P3, P4
totalPages = ceil(5 / 2) = 3
```

Ai làm gì:

```text
Controller nhận page/size.
Repository trả List<Product>.
Service tính pagination.
Controller trả PageResponse.
```

## 13. Một request thành công, một request lỗi

### Thành công

```text
POST /api/products
-> JSON hợp lệ
-> Jackson tạo DTO
-> Controller chạy
-> Service check OK
-> Repository save OK
-> Controller trả 201
```

### Lỗi SKU trùng

```text
POST /api/products
-> JSON hợp lệ
-> Jackson tạo DTO
-> Controller chạy
-> Service check SKU
-> SKU trùng
-> throw AppException(DUPLICATE_SKU)
-> Handler trả 409
```

### Lỗi JSON hỏng

```text
POST /api/products
-> JSON hỏng
-> Jackson parse fail
-> Controller chưa chạy
-> Handler trả 400
```

### Lỗi path sai kiểu

```text
GET /api/products/abc
-> Spring convert abc sang Long fail
-> Controller chưa chạy
-> Handler trả 400
```

## 14. Cách trả lời thi/phỏng vấn

Khi bị hỏi luồng request, đừng cố nói quá dài. Nói:

```text
Request vào Tomcat rồi DispatcherServlet. Spring tìm Controller method phù hợp.
Nếu có body JSON thì Jackson convert thành request DTO trước khi method chạy.
Controller gọi Service. Service xử lý business rule và gọi Repository.
Repository lấy/lưu dữ liệu. Service map model sang response DTO.
Controller tạo ResponseEntity với status/header/body.
Spring/Jackson serialize response DTO thành JSON trả cho client.
```

Khi bị hỏi lỗi:

```text
Nếu lỗi bind/parse request thì Spring/Jackson phát hiện, Controller có thể chưa chạy.
Nếu lỗi nghiệp vụ thì Service phát hiện và throw AppException.
GlobalExceptionHandler đổi exception thành HTTP response.
```

## 15. Checklist nhớ được là qua

- [ ] Nói được luồng `HTTP -> Controller -> Service -> Repository -> HTTP`.
- [ ] Biết đoạn nào là HTTP, đoạn nào là Java method call.
- [ ] Biết JSON thành DTO nhờ Jackson.
- [ ] Biết Controller không gọi Repository trực tiếp.
- [ ] Biết Service không trả `ResponseEntity`.
- [ ] Biết DTO khác model/entity.
- [ ] Biết 200/201/204/400/404/409.
- [ ] Biết framework error khác business error.
- [ ] Biết Map là database giả cho M1-2.
- [ ] Biết pagination dùng `page`, `size`, `fromIndex`, `toIndex`.

## 16. Tóm tắt cuối

```text
Controller hiểu HTTP.
Service hiểu nghiệp vụ.
Repository hiểu lưu trữ.
DTO là hợp đồng API.
Jackson đổi JSON <-> object.
DispatcherServlet điều phối request.
GlobalExceptionHandler đổi exception thành HTTP response.
Map là database giả.
Pagination là cắt list theo page/size.
```

Nếu bạn chỉ nhớ một hình:

```text
Client
  |
  | HTTP + JSON
  v
Tomcat -> DispatcherServlet -> Controller
                                  |
                                  | Java method call
                                  v
                               Service
                                  |
                                  | Java method call
                                  v
                              Repository -> Map/DB
```
