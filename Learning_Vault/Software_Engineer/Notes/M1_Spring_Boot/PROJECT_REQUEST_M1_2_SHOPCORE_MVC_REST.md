# Mini Project M1-2 - Shopcore Catalog API

> Mục tiêu: tự làm một mini project bao quát **Module 1-2 · Spring MVC 3-layer & REST API**. File này là đặc tả yêu cầu, không phải lời giải.

## 1. Bối cảnh

Bạn đang xây **Catalog API** cho `shopcore`.

Catalog quản lý:

- `Category`: danh mục sản phẩm.
- `Product`: sản phẩm thuộc một category.

Chưa dùng database. Dữ liệu lưu tạm bằng `Map` trong memory. Sang M1-3 mới thay bằng JPA/database.

## 2. Tạo project

Nếu đã có `shopcore`, không tạo lại. Nếu chưa có, tạo trên start.spring.io:

```text
Project: Maven
Language: Java
Spring Boot: bản stable
Group: com.shopcore
Artifact: shopcore
Name: shopcore
Package name: com.shopcore
Packaging: Jar
Java: 17 hoặc 21
```

Dependency chọn:

```text
Spring Web
```

Chưa chọn:

```text
Spring Data JPA
PostgreSQL Driver
Spring Security
Validation
Thymeleaf (K CAN)
```

`Lombok` tùy chọn. Nếu muốn học bản chất, viết class/getter/setter tay trước.

## 3. Khái niệm cần biết

`API` là hợp đồng giữa client và server:

```text
URL + HTTP method + request body + response body + status code + header
```

`Request` là thứ client gửi lên:

```text
Path variable: /api/products/10
Query param:   /api/products?page=0&size=20
Body JSON:     {"name":"Keyboard"}
Header:        Content-Type: application/json
```

`Response` là thứ server trả về:

```text
Status code
Header
Body JSON
```

`Model` là object nội bộ của backend, ví dụ `Product`, `Category`.

`Entity` là model gắn với database bằng JPA, ví dụ `@Entity`. M1-2 chưa dùng entity thật, chỉ dùng model class. M1-3 mới dùng:

```text
@Entity
@Table
@Id
@GeneratedValue
@ManyToOne
@OneToMany
```

`DTO` là object đi qua biên API:

```text
CreateProductRequest = client gửi để tạo Product
UpdateProductRequest = client gửi để sửa Product
ProductResponse      = server trả Product cho client
```

Không dùng thẳng model làm request/response vì request, response và model có trách nhiệm khác nhau.

## 4. Luồng bắt buộc phải hiểu

Với `POST /api/products`:

```text
Client gửi JSON
-> Tomcat nhận request
-> DispatcherServlet tìm Controller phù hợp
-> Jackson đổi JSON thành CreateProductRequest
-> ProductController gọi ProductService
-> ProductService kiểm tra rule
-> ProductService hỏi CategoryRepository xem category có tồn tại không
-> ProductService hỏi ProductRepository xem sku có trùng không
-> ProductRepository lưu Product vào Map
-> ProductService đổi Product thành ProductResponse
-> ProductController tạo ResponseEntity 201 + Location header
-> Jackson đổi ProductResponse thành JSON
-> Client nhận response
```

## 5. Kiến trúc

```text
Controller -> Service -> Repository
```

Controller làm:

- Nhận HTTP request.
- Đọc `@PathVariable`, `@RequestParam`, `@RequestBody`.
- Gọi Service.
- Trả `ResponseEntity`.
- Quyết định status thành công như `200`, `201`, `204`.

Service làm:

- Xử lý business rule.
- Gọi Repository.
- Mapping request DTO -> model.
- Mapping model -> response DTO.
- Ném exception khi lỗi.

Repository làm:

- Lưu/tìm/xóa dữ liệu.
- Dùng `Map` trong M1-2.
- Không biết HTTP.

Không được:

- Controller gọi Repository trực tiếp.
- Controller tự thao tác `Map`.
- Service trả `ResponseEntity`.
- Repository trả DTO.
- Repository biết status code.

## 6. Cấu trúc package gợi ý

```text
src/main/java/com/shopcore
├── ShopcoreApplication.java
├── common
│   ├── ApiErrorResponse.java
│   ├── GlobalExceptionHandler.java
│   └── PageResponse.java
├── category
│   ├── Category.java
│   ├── CategoryController.java
│   ├── CategoryService.java
│   ├── CategoryRepository.java
│   ├── InMemoryCategoryRepository.java
│   ├── CategoryNotFoundException.java
│   ├── DuplicateCategoryNameException.java
│   ├── CategoryInUseException.java
│   ├── InvalidCategoryInputException.java
│   └── dto
│       ├── CreateCategoryRequest.java
│       ├── UpdateCategoryRequest.java
│       └── CategoryResponse.java
└── product
    ├── Product.java
    ├── ProductController.java
    ├── ProductService.java
    ├── ProductRepository.java
    ├── InMemoryProductRepository.java
    ├── ProductNotFoundException.java
    ├── DuplicateSkuException.java
    ├── InvalidProductInputException.java
    └── dto
        ├── CreateProductRequest.java
        ├── UpdateProductRequest.java
        └── ProductResponse.java
```

## 7. Model

### Category

```text
id: Long
name: String
```

Rule:

- `id` do server tạo.
- `name` không rỗng.
- `name` không trùng, không phân biệt hoa thường.

### Product

```text
id: Long
sku: String
name: String
price: BigDecimal
categoryId: Long
```

Rule:

- `id` do server tạo.
- `sku` không rỗng.
- `sku` không trùng, không phân biệt hoa thường.
- `name` không rỗng.
- `price > 0`.
- `categoryId` phải tồn tại.
- Không cho sửa `sku` ở update.

## 8. DTO

DTO dùng `class`. Mỗi DTO nên có:

```text
private field
no-args constructor
getter/setter
all-args constructor nếu cần
```

Category DTO:

```text
CreateCategoryRequest: name
UpdateCategoryRequest: name
CategoryResponse: id, name
```

Product DTO:

```text
CreateProductRequest: sku, name, price, categoryId
UpdateProductRequest: name, price, categoryId
ProductResponse: id, sku, name, price, categoryId
```

## 9. Common response

`PageResponse<T>`:

```text
content: List<T>
page: int
size: int
totalElements: long
totalPages: int
```

`ApiErrorResponse`:

```text
status: int
error: String
message: String
```

Ví dụ error:

```json
{
  "status": 404,
  "error": "NOT_FOUND",
  "message": "Product not found: 99"
}
```

## 10. Exception

Category:

```text
CategoryNotFoundException       -> 404
DuplicateCategoryNameException  -> 409
CategoryInUseException          -> 409
InvalidCategoryInputException   -> 400
```

Product:

```text
ProductNotFoundException      -> 404
DuplicateSkuException         -> 409
InvalidProductInputException  -> 400
```

Dùng `GlobalExceptionHandler` với:

```text
@RestControllerAdvice
@ExceptionHandler
```

Mục tiêu: mọi lỗi trả JSON thống nhất.

## 11. Repository

Category repository cần có khả năng:

```text
save
findById
findAll
existsById
existsByNameIgnoreCase
deleteById
```

Product repository cần có khả năng:

```text
save
findById
findAll
existsBySkuIgnoreCase
existsByCategoryId
deleteById
```

Storage gợi ý:

```text
LinkedHashMap<Long, Category>
LinkedHashMap<Long, Product>
```

Seed data gợi ý:

```text
Category 1: Accessories
Category 2: Books

Product 1: MOUSE-001, Mouse, 500000, categoryId=1
Product 2: BOOK-001, Clean Code, 300000, categoryId=2
Product 3: KB-001, Keyboard, 1500000, categoryId=1
```

## 12. API Category

| Feature | Method | URL | Success | Error |
|---|---|---|---|---|
| List category | GET | `/api/categories` | 200 | - |
| Get category | GET | `/api/categories/{id}` | 200 | 404 |
| Create category | POST | `/api/categories` | 201 + Location | 400, 409 |
| Update category | PUT | `/api/categories/{id}` | 200 | 400, 404, 409 |
| Delete category | DELETE | `/api/categories/{id}` | 204 | 404, 409 |

Create request:

```json
{
  "name": "Gaming Gear"
}
```

Create response:

```json
{
  "id": 3,
  "name": "Gaming Gear"
}
```

Delete rule:

- Nếu category còn product thì không được xóa.
- Trả `409 Conflict`.

## 13. API Product

| Feature | Method | URL | Success | Error |
|---|---|---|---|---|
| List product | GET | `/api/products?page=0&size=20` | 200 | 400 |
| Get product | GET | `/api/products/{id}` | 200 | 404 |
| Create product | POST | `/api/products` | 201 + Location | 400, 404, 409 |
| Update product | PUT | `/api/products/{id}` | 200 | 400, 404 |
| Delete product | DELETE | `/api/products/{id}` | 204 | 404 |

Create request:

```json
{
  "sku": "HEADPHONE-001",
  "name": "Headphone",
  "price": 900000,
  "categoryId": 1
}
```

Create response:

```json
{
  "id": 4,
  "sku": "HEADPHONE-001",
  "name": "Headphone",
  "price": 900000,
  "categoryId": 1
}
```

Update request:

```json
{
  "name": "Wireless Mouse",
  "price": 700000,
  "categoryId": 1
}
```

Update response giữ nguyên `sku` cũ.

## 14. Pagination

Endpoint:

```http
GET /api/products?page=0&size=2
```

Response:

```json
{
  "content": [],
  "page": 0,
  "size": 2,
  "totalElements": 3,
  "totalPages": 2
}
```

Rule:

- `page` mặc định `0`.
- `size` mặc định `20`.
- `page >= 0`.
- `1 <= size <= 100`.
- Sort ổn định theo `id` tăng dần trước khi cắt trang.

Công thức:

```text
fromIndex = page * size
toIndex = min(fromIndex + size, totalElements)
totalPages = ceil(totalElements / size)
```

Nếu `fromIndex >= totalElements`, trả `content` rỗng.

## 15. Status code

```text
200 OK
- GET thành công
- PUT thành công

201 Created
- POST tạo mới thành công
- Có Location header

204 No Content
- DELETE thành công
- Không có body

400 Bad Request
- name rỗng
- sku rỗng
- price <= 0
- page âm
- size ngoài 1..100
- JSON sai format

404 Not Found
- Product không tồn tại
- Category không tồn tại
- categoryId không tồn tại khi tạo/sửa Product

409 Conflict
- SKU trùng
- Category name trùng
- Xóa Category còn Product
```

## 16. Curl test bắt buộc

Chạy app:

```bash
mvn spring-boot:run
```

Category:

```bash
curl -i http://localhost:8080/api/categories

curl -i http://localhost:8080/api/categories/1

curl -i -X POST http://localhost:8080/api/categories \
  -H 'Content-Type: application/json' \
  -d '{"name":"Gaming Gear"}'

curl -i -X PUT http://localhost:8080/api/categories/1 \
  -H 'Content-Type: application/json' \
  -d '{"name":"Computer Accessories"}'

curl -i -X DELETE http://localhost:8080/api/categories/999
```

Product:

```bash
curl -i 'http://localhost:8080/api/products?page=0&size=2'

curl -i http://localhost:8080/api/products/1

curl -i -X POST http://localhost:8080/api/products \
  -H 'Content-Type: application/json' \
  -d '{"sku":"HEADPHONE-001","name":"Headphone","price":900000,"categoryId":1}'

curl -i -X PUT http://localhost:8080/api/products/1 \
  -H 'Content-Type: application/json' \
  -d '{"name":"Wireless Mouse","price":700000,"categoryId":1}'

curl -i -X DELETE http://localhost:8080/api/products/1
```

Error cases:

```bash
curl -i http://localhost:8080/api/products/999

curl -i http://localhost:8080/api/products/abc

curl -i 'http://localhost:8080/api/products?page=-1&size=2'

curl -i 'http://localhost:8080/api/products?page=0&size=101'

curl -i -X POST http://localhost:8080/api/products \
  -H 'Content-Type: application/json' \
  -d '{"sku":"","name":"Keyboard","price":1500000,"categoryId":1}'

curl -i -X POST http://localhost:8080/api/products \
  -H 'Content-Type: application/json' \
  -d '{"sku":"NEW-001","name":"","price":1500000,"categoryId":1}'

curl -i -X POST http://localhost:8080/api/products \
  -H 'Content-Type: application/json' \
  -d '{"sku":"NEW-002","name":"Keyboard","price":-1,"categoryId":1}'

curl -i -X POST http://localhost:8080/api/products \
  -H 'Content-Type: application/json' \
  -d '{"sku":"NEW-003","name":"Keyboard","price":1500000,"categoryId":999}'
```

## 17. Checklist nộp bài

Feature:

- [ ] Category CRUD đủ 5 endpoint.
- [ ] Product CRUD đủ 5 endpoint.
- [ ] Product list có pagination.
- [ ] Không cho trùng category name.
- [ ] Không cho trùng product sku.
- [ ] Không cho xóa category còn product.
- [ ] Không cho product dùng category không tồn tại.

Architecture:

- [ ] Controller -> Service -> Repository rõ ràng.
- [ ] DTO tách khỏi model.
- [ ] Repository dùng in-memory `Map`.
- [ ] Exception handler trả JSON lỗi đồng nhất.
- [ ] Status code đúng.

## 18. Câu hỏi phải trả lời khi gửi chấm

1. `POST /api/products` đi qua những lớp nào?
2. JSON được đổi thành DTO ở bước nào?
3. DTO được đổi thành model ở lớp nào?
4. Vì sao Controller không nên gọi Repository?
5. Vì sao Service không trả `ResponseEntity`?
6. Vì sao Repository không trả DTO?
7. Trùng SKU được phát hiện ở đâu?
8. Trùng SKU được đổi thành `409 Conflict` ở đâu?
9. `GET /api/products/abc` có vào method Controller không?
10. Pagination của bạn tính `totalPages` như thế nào?

## 19. Tiêu chí chấm

| Hạng mục | Điểm |
|---|---:|
| Đủ API Category | 15 |
| Đủ API Product | 20 |
| Đúng 3-layer | 20 |
| DTO tách model rõ | 10 |
| Exception + error response đúng | 15 |
| Status code đúng | 10 |
| Pagination đúng | 5 |
| Giải thích luồng request đúng | 5 |

Đạt `>= 85/100` thì qua M1-2.

## 20. Thứ tự làm

1. Chạy được app.
2. Làm Category model + repository.
3. Làm Category service.
4. Làm Category controller.
5. Test Category CRUD.
6. Làm Product model + repository.
7. Làm Product service.
8. Làm Product controller.
9. Thêm exception handler.
10. Thêm pagination.
11. Chạy curl test.
12. Gửi mình chấm.

Code xong một endpoint thì test ngay. Đừng đợi xong toàn bộ mới chạy.
