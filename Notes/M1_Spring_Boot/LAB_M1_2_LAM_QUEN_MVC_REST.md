# Lab M1-2 - Làm quen Spring MVC bằng code và debugger

> **File cũ dạng tổng hợp:** Không cần làm theo file dài này nữa. Lab M1-2 đã được chia thành từng feature nhỏ tại [`Labs_M1_2_MVC_REST/README.md`](Labs_M1_2_MVC_REST/README.md). Hãy bắt đầu từ Lab 00 và chỉ mở một lab tại một thời điểm.

> Mục tiêu: không học thuộc lý thuyết. Bạn sẽ gửi request, dừng breakpoint và tận mắt thấy request đi qua Controller → Service → Repository rồi quay trở lại.

## 1. Quy tắc làm lab

- Code trực tiếp trong capstone `shopcore`, không tạo project mới.
- Chưa dùng database và chưa dùng JPA.
- Repository lưu dữ liệu bằng `Map<Long, Product>`.
- Không xem full lời giải trước khi tự thử.
- Mỗi chặng phải chạy được rồi mới làm chặng tiếp theo.
- Sau mỗi request, ghi lại điều bạn quan sát được bằng lời của mình.

Thời gian gợi ý: `2-3 giờ`.

```text
10% đọc yêu cầu
70% code + debug
20% tự giải thích
```

## 2. Domain dùng xuyên suốt

Product cần các field:

```java
Long id;
String sku;
String name;
BigDecimal price;
```

Bạn có thể dùng `record` hoặc class thông thường. Chưa cần `@Entity`.

Package gợi ý:

```text
com.shopcore.product
├── Product.java
├── ProductController.java
├── ProductService.java
├── ProductRepository.java
├── InMemoryProductRepository.java
└── dto
    ├── CreateProductRequest.java
    └── ProductResponse.java
```

## 3. Khung code ban đầu

Tạo đúng các file dưới đây trong `shopcore`. Khung này cố ý để `TODO` và `UnsupportedOperationException`: ứng dụng compile được, nhưng từng request sẽ lỗi cho tới khi bạn tự hoàn thiện phần tương ứng.

> Nếu package gốc của `shopcore` khác `com.shopcore`, hãy đổi toàn bộ dòng `package` cho khớp project của bạn.

### `Product.java`

```java
package com.shopcore.product;

import java.math.BigDecimal;

public record Product(
        Long id,
        String sku,
        String name,
        BigDecimal price
) {}
```

### `CreateProductRequest.java`

```java
package com.shopcore.product.dto;

import java.math.BigDecimal;

public record CreateProductRequest(
        String sku,
        String name,
        BigDecimal price
) {}
```

### `ProductResponse.java`

```java
package com.shopcore.product.dto;

import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        String sku,
        String name,
        BigDecimal price
) {}
```

### `PageResponse.java`

Nếu `shopcore` đã có `PageResponse<T>` từ M0-1 thì dùng lại, không tạo bản thứ hai.

```java
package com.shopcore.common;

import java.util.List;

public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages
) {}
```

### `ProductRepository.java`

```java
package com.shopcore.product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    Optional<Product> findById(Long id);

    List<Product> findAll();

    Product save(Product product);

    boolean existsBySku(String sku);

    boolean existsById(Long id);

    void deleteById(Long id);
}
```

### `InMemoryProductRepository.java`

```java
package com.shopcore.product;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class InMemoryProductRepository implements ProductRepository {
    private final Map<Long, Product> data = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong();

    @Override
    public Optional<Product> findById(Long id) {
        throw new UnsupportedOperationException("TODO request 2");
    }

    @Override
    public List<Product> findAll() {
        throw new UnsupportedOperationException("TODO request 6");
    }

    @Override
    public Product save(Product product) {
        throw new UnsupportedOperationException("TODO request 3");
    }

    @Override
    public boolean existsBySku(String sku) {
        throw new UnsupportedOperationException("TODO request 3");
    }

    @Override
    public boolean existsById(Long id) {
        throw new UnsupportedOperationException("TODO request 7");
    }

    @Override
    public void deleteById(Long id) {
        throw new UnsupportedOperationException("TODO request 7");
    }
}
```

### `ProductService.java`

```java
package com.shopcore.product;

import com.shopcore.common.PageResponse;
import com.shopcore.product.dto.CreateProductRequest;
import com.shopcore.product.dto.ProductResponse;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductResponse getById(Long id) {
        throw new UnsupportedOperationException("TODO request 2");
    }

    public ProductResponse create(CreateProductRequest request) {
        throw new UnsupportedOperationException("TODO request 3");
    }

    public PageResponse<ProductResponse> getAll(int page, int size) {
        throw new UnsupportedOperationException("TODO request 6");
    }

    public void delete(Long id) {
        throw new UnsupportedOperationException("TODO request 7");
    }

    private ProductResponse toResponse(Product product) {
        throw new UnsupportedOperationException("TODO mapping");
    }
}
```

### `ProductController.java`

Controller đã được nối route sẵn. Bạn chủ yếu tự viết Service và Repository; vẫn được sửa Controller khi request yêu cầu status/header khác.

```java
package com.shopcore.product;

import com.shopcore.common.PageResponse;
import com.shopcore.product.dto.CreateProductRequest;
import com.shopcore.product.dto.ProductResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/ping")
    public Map<String, String> ping() {
        return Map.of("message", "product-api-ok");
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ProductResponse> create(
            @RequestBody CreateProductRequest request) {
        ProductResponse created = productService.create(request);
        URI location = URI.create("/api/products/" + created.id());
        return ResponseEntity.created(location).body(created);
    }

    @GetMapping
    public ResponseEntity<PageResponse<ProductResponse>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(productService.getAll(page, size));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

### Kiểm tra khung

Khởi động `shopcore`, sau đó chỉ request này phải chạy ngay:

```bash
curl -i http://localhost:8080/api/products/ping
```

Kết quả:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"message":"product-api-ok"}
```

Các endpoint còn lại trả `500` do `UnsupportedOperationException` là đúng ở thời điểm ban đầu. Mỗi request phía dưới sẽ giúp bạn loại bỏ dần từng `TODO`.

## 4. Danh sách request bạn tự hiện thực

Không đọc hướng dẫn theo “chặng” nếu bạn muốn tự làm hoàn toàn. Hãy xử lý lần lượt từng request sau; chỉ chuyển request tiếp theo khi request hiện tại đạt đúng status, header và body.

### Request 1 - Kiểm tra route

```http
GET /api/products/ping
```

Mong đợi: `200 OK` và `{"message":"product-api-ok"}`.

Việc của bạn: đặt breakpoint và giải thích ai gọi `ping()`.

### Request 2 - Lấy Product theo id

```http
GET /api/products/1
```

Mong đợi khi tồn tại:

```http
HTTP/1.1 200 OK

{"id":1,"sku":"MOUSE-001","name":"Mouse","price":500000}
```

Mong đợi khi gọi id không tồn tại:

```http
GET /api/products/999
HTTP/1.1 404 Not Found
```

Việc của bạn: hoàn thiện `findById`, `getById`, mapping và cách trả `404`.

### Request 3 - Tạo Product

```http
POST /api/products
Content-Type: application/json

{"sku":"KB-001","name":"Keyboard","price":1500000}
```

Mong đợi:

```http
HTTP/1.1 201 Created
Location: /api/products/{id-mới}
```

Việc của bạn: hoàn thiện `existsBySku`, `save`, `create` và mapping.

### Request 4 - Trùng SKU

Gửi lại Request 3 với cùng SKU.

Mong đợi:

```http
HTTP/1.1 409 Conflict
```

Việc của bạn: business rule phải nằm ở Service, không nằm trong Controller.

### Request 5 - Giá không hợp lệ

```http
POST /api/products
Content-Type: application/json

{"sku":"BAD-001","name":"Invalid","price":-1}
```

Mong đợi:

```http
HTTP/1.1 400 Bad Request
```

Việc của bạn: tạm kiểm tra trong Service. M1-4 sẽ chuyển phần input validation sang Bean Validation.

### Request 6 - Phân trang

Sau khi tạo ít nhất 5 Product:

```http
GET /api/products?page=0&size=2
```

Mong đợi:

```json
{
  "content": [
    {"id":1,"sku":"...","name":"...","price":500000},
    {"id":2,"sku":"...","name":"...","price":700000}
  ],
  "page": 0,
  "size": 2,
  "totalElements": 5,
  "totalPages": 3
}
```

Việc của bạn: hoàn thiện `findAll`, `getAll`, cắt List và tính metadata.

### Request 7 - Xóa Product

```http
DELETE /api/products/1
```

Mong đợi khi tồn tại: `204 No Content`, body rỗng.

Gọi lại cùng id: `404 Not Found`.

Việc của bạn: hoàn thiện `existsById`, `deleteById` và `delete`.

### Bảng theo dõi

| Request | Status đúng | Breakpoint đã xem | Tự giải thích được | Hoàn thành |
|---|---:|---|---|---|
| 1. Ping | 200 | [ ] | [ ] | [ ] |
| 2. Get by id | 200/404 | [ ] | [ ] | [ ] |
| 3. Create | 201 | [ ] | [ ] | [ ] |
| 4. Duplicate SKU | 409 | [ ] | [ ] | [ ] |
| 5. Invalid price | 400 | [ ] | [ ] | [ ] |
| 6. Pagination | 200 | [ ] | [ ] | [ ] |
| 7. Delete | 204/404 | [ ] | [ ] | [ ] |

## 5. Hướng dẫn debug theo từng chặng

Phần bên dưới là gợi ý và câu hỏi quan sát. Chỉ mở đúng chặng tương ứng sau khi bạn đã tự thử request ở mục 4.

## 5.1 Chặng 1 - Request chạm vào Controller

### Yêu cầu

Tạo endpoint:

```http
GET /api/products/ping
```

Response mong đợi:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"message":"product-api-ok"}
```

Bạn chỉ cần Controller, chưa cần Service hoặc Repository.

Skeleton:

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping("/ping")
    public Map<String, String> ping() {
        // TODO
    }
}
```

### Debug bắt buộc

Đặt breakpoint tại dòng đầu của `ping()` rồi gọi:

```bash
curl -i http://localhost:8080/api/products/ping
```

Quan sát và tự trả lời:

1. Bạn có tự gọi `ping()` trong code không?
2. Ai tìm thấy method `ping()`?
3. Khi breakpoint dừng, request đã được Tomcat và `DispatcherServlet` xử lý tới đâu?
4. Java `Map` được biến thành JSON ở trước hay sau khi method return?

**Ghi lại quan sát:**

```text
...
```

### Hoàn thành khi

- [ ] Request trả `200`.
- [ ] Body là JSON mong đợi.
- [ ] Breakpoint dừng trong Controller.
- [ ] Giải thích được vì sao method tự chạy dù không có chỗ nào gọi trực tiếp.

## 5.2 Chặng 2 - Path variable và type conversion

### Yêu cầu

Tạo endpoint tạm thời:

```http
GET /api/products/{id}
```

Với request:

```http
GET /api/products/10
```

hãy trả một ProductResponse giả có id `10`.

Skeleton:

```java
@GetMapping("/{id}")
public ProductResponse getById(@PathVariable Long id) {
    // TODO
}
```

### Thí nghiệm A

Gọi:

```bash
curl -i http://localhost:8080/api/products/10
```

Đặt breakpoint ngay đầu method và kiểm tra kiểu cùng giá trị của `id`.

### Thí nghiệm B

Gọi:

```bash
curl -i http://localhost:8080/api/products/abc
```

Trả lời:

1. Breakpoint trong `getById()` có dừng không?
2. Vì sao chuỗi trong URL có thể trở thành `Long`?
3. Với `abc`, lỗi xảy ra trước hay sau Controller method?
4. Service có thể được gọi trong trường hợp conversion thất bại không?

**Ghi lại quan sát:**

```text
...
```

### Hoàn thành khi

- [ ] `10` được bind thành `Long`.
- [ ] Biết điều gì xảy ra với `abc`.
- [ ] Hiểu Spring chuẩn bị argument trước khi gọi Controller method.

## 5.3 Chặng 3 - Tách Service

### Yêu cầu

Di chuyển logic tạo ProductResponse giả sang `ProductService`.

```java
@Service
public class ProductService {

    public ProductResponse getById(Long id) {
        // TODO: tạm trả dữ liệu giả
    }
}
```

Controller chỉ còn:

```java
@GetMapping("/{id}")
public ResponseEntity<ProductResponse> getById(@PathVariable Long id) {
    return ResponseEntity.ok(productService.getById(id));
}
```

Dùng constructor injection, không dùng field injection và không tự `new ProductService()`.

### Debug bắt buộc

Đặt breakpoint tại:

1. Dòng đầu Controller method.
2. Dòng đầu Service method.
3. Dòng `return` của Controller.

Step Into theo thứ tự và ghi lại:

```text
HTTP request
-> breakpoint nào dừng trước?
-> object nào được truyền vào Service?
-> object nào quay về Controller?
-> lúc nào ResponseEntity được tạo?
```

### Câu hỏi bản chất

1. Controller gọi Service bằng HTTP hay Java method call?
2. ProductResponse có bị chuyển thành JSON giữa Controller và Service không?
3. Ai tạo ProductService object?
4. Nếu Service đổi cách xử lý nhưng contract không đổi, URL có cần đổi không?

### Hoàn thành khi

- [ ] Controller không còn chứa logic tạo Product.
- [ ] Service được constructor injection.
- [ ] Quan sát được call stack Controller → Service → Controller.

## 5.4 Chặng 4 - Thêm Repository in-memory

### Yêu cầu

Tạo contract:

```java
public interface ProductRepository {
    Optional<Product> findById(Long id);
    List<Product> findAll();
    Product save(Product product);
    boolean existsBySku(String sku);
}
```

Tạo implementation:

```java
@Repository
public class InMemoryProductRepository implements ProductRepository {
    private final Map<Long, Product> data = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong();

    // TODO: implement các method
}
```

Thêm 2-3 Product mẫu khi repository được tạo. Có thể dùng constructor hoặc `@PostConstruct` để seed dữ liệu.

Sửa Service để `getById()` đọc từ Repository thay vì tạo dữ liệu giả.

### Debug bắt buộc

Đặt breakpoint tại Controller, Service và Repository rồi gọi:

```bash
curl -i http://localhost:8080/api/products/1
```

Quan sát call stack:

```text
ProductController.getById
  -> ProductService.getById
    -> InMemoryProductRepository.findById
```

Sau khi Repository return, dùng Step Out để quan sát dữ liệu quay về theo chiều ngược lại.

### Câu hỏi bản chất

1. Service giữ reference kiểu `ProductRepository` hay `InMemoryProductRepository`?
2. Object thật được inject lúc runtime thuộc class nào?
3. Vì sao Service không cần biết dữ liệu nằm trong `Map`?
4. Khi thay bằng JPA ở M1-3, lớp nào không nên thay đổi nhiều?

### Hoàn thành khi

- [ ] Repository đọc được Product từ `Map`.
- [ ] Service không biết chi tiết `ConcurrentHashMap`.
- [ ] Trace được cả chiều đi và chiều về của object.

## 5.5 Chặng 5 - Tạo Product bằng request body

### Yêu cầu

Tạo DTO:

```java
public record CreateProductRequest(
        String sku,
        String name,
        BigDecimal price
) {}
```

Tạo endpoint:

```http
POST /api/products
Content-Type: application/json

{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": 1500000
}
```

Response mong đợi:

```http
HTTP/1.1 201 Created
Location: /api/products/{id}
```

Controller skeleton:

```java
@PostMapping
public ResponseEntity<ProductResponse> create(
        @RequestBody CreateProductRequest request) {
    // TODO: gọi Service
    // TODO: tạo Location
    // TODO: trả 201
}
```

Service phải:

1. Kiểm tra SKU đã tồn tại chưa.
2. Kiểm tra giá lớn hơn `0` ở mức logic tạm thời.
3. Mapping request thành Product.
4. Gọi Repository lưu.
5. Mapping Product đã có id thành ProductResponse.

### Thí nghiệm A - JSON hợp lệ

```bash
curl -i -X POST http://localhost:8080/api/products \
  -H 'Content-Type: application/json' \
  -d '{"sku":"KB-001","name":"Keyboard","price":1500000}'
```

Đặt breakpoint ở Controller và kiểm tra `request` đã là Java object hay chưa.

### Thí nghiệm B - JSON hỏng

```bash
curl -i -X POST http://localhost:8080/api/products \
  -H 'Content-Type: application/json' \
  -d '{"sku":}'
```

### Thí nghiệm C - Sai Content-Type

```bash
curl -i -X POST http://localhost:8080/api/products \
  -H 'Content-Type: text/plain' \
  -d '{"sku":"KB-001","name":"Keyboard","price":1500000}'
```

### Câu hỏi bản chất

1. Ai biến JSON thành `CreateProductRequest`?
2. JSON hỏng có vào Controller method không?
3. `Content-Type` nói về request hay response?
4. ID được tạo ở Controller, Service hay Repository?
5. Vì sao response dùng ProductResponse thay vì trả Product trực tiếp?

### Hoàn thành khi

- [ ] Tạo Product thành công và nhận `201`.
- [ ] Có header `Location` đúng.
- [ ] GET theo id mới trả Product vừa tạo.
- [ ] Phân biệt được lỗi binding và lỗi nghiệp vụ.

## 5.6 Chặng 6 - Status code và luồng lỗi

### Yêu cầu

Xử lý các trường hợp:

| Tình huống | Status mong đợi |
|---|---|
| GET Product tồn tại | `200` |
| GET Product không tồn tại | `404` |
| POST Product thành công | `201` |
| POST trùng SKU | `409` |
| POST giá không hợp lệ | `400` |

Ở lab làm quen, bạn có thể tạm dùng `ResponseStatusException` hoặc exception gắn `@ResponseStatus`. M1-4 sẽ thay bằng `@ControllerAdvice` và error response chuẩn.

Ví dụ hướng suy nghĩ, không phải full lời giải:

```java
if (repository.existsBySku(request.sku())) {
    // Ném exception có ý nghĩa xung đột.
}
```

### Debug bắt buộc

Đặt breakpoint trước chỗ ném exception và bật chế độ dừng khi exception được throw.

Quan sát:

1. Method nào phát hiện trùng SKU?
2. Sau khi throw, các dòng phía sau có chạy không?
3. Exception đi ngược qua những stack frame nào?
4. Thành phần nào cuối cùng biến exception thành HTTP response?

### Hoàn thành khi

- [ ] Năm tình huống trả đúng status.
- [ ] Business rule nằm trong Service.
- [ ] Repository không trả `ResponseEntity`.

## 5.7 Chặng 7 - List và pagination thủ công

### Yêu cầu

Endpoint:

```http
GET /api/products?page=0&size=2
```

Tạm dùng `PageResponse<T>` từ M0-1 hoặc tự tạo DTO có:

```java
List<T> content;
int page;
int size;
long totalElements;
int totalPages;
```

Vì đây là in-memory repository, bạn có thể cắt List bằng index. Phải xử lý page vượt phạm vi và size không hợp lệ.

### Bộ dữ liệu thử

Tạo 5 Product, `size=2`:

```text
page 0 -> 2 Product
page 1 -> 2 Product
page 2 -> 1 Product
totalElements -> 5
totalPages -> 3
```

### Câu hỏi bản chất

1. `page=0` là trang thứ mấy đối với người dùng?
2. Công thức tính offset là gì?
3. Công thức tính `totalPages` là gì?
4. Vì sao lấy toàn bộ database rồi cắt trong Service không phải pagination thật?
5. Khi học JPA, phần cắt dữ liệu nên xảy ra ở đâu?

### Hoàn thành khi

- [ ] Metadata đúng với 5 Product và size 2.
- [ ] Không trả toàn bộ List trong `content`.
- [ ] Giới hạn `size`, ví dụ từ 1 đến 100.

## 6. Final mini challenge

Không nhìn note, hãy tự bổ sung:

```http
DELETE /api/products/{id}
```

Yêu cầu:

- Product tồn tại: xóa và trả `204 No Content`.
- Product không tồn tại: trả `404 Not Found`.
- `204` không có response body.
- Controller không gọi Repository trực tiếp.

Sau khi chạy được, hãy tự viết trace:

```text
DELETE request
-> ...
-> ...
-> Map.remove(id)
-> ...
-> 204 response
```

## 7. Phiếu tự giải thích sau lab

Không nhìn tài liệu, trả lời bằng lời của bạn:

1. Khi gõ URL trong Postman, thành phần nào nhận request trước Controller?
2. Spring biết gọi Controller method nào bằng cách nào?
3. `@PathVariable Long id` có giá trị từ đâu?
4. `@RequestBody` hoạt động trước hay trong Controller method?
5. Controller gọi Service bằng HTTP hay Java?
6. Vì sao Service không trả `ResponseEntity`?
7. Vì sao Repository không cần biết JSON?
8. ProductResponse được biến thành JSON lúc nào?
9. Exception từ Service trở thành status code bằng cách nào?
10. Vì sao Controller singleton nên stateless?

## 8. Tiêu chí sẵn sàng làm bài kiểm tra final

Bạn sẵn sàng khi:

- [ ] Hoàn thành đủ bảy chặng.
- [ ] Trace được request GET và POST bằng debugger.
- [ ] Không nhầm dữ liệu HTTP với Java method call.
- [ ] Đặt đúng business rule vào Service.
- [ ] Chọn đúng 200/201/204/400/404/409.
- [ ] Tự giải thích được ít nhất 8/10 câu cuối lab.

Nếu chưa đạt, không cần đọc lại toàn bộ bài 1.600 dòng. Chỉ đọc đúng mục tương ứng với checkpoint bạn chưa giải thích được rồi chạy debugger thêm một lần.
