# Paging Kiểu Project Hay Xài

> Đọc file này sau khi đã hiểu `PagingBabyStep.java`. Mục tiêu: hiểu paging khi đặt vào REST API 3-layer.

## 1. API nhìn từ client

Client gọi:

```http
GET /api/products?page=0&size=2
```

Ý nghĩa:

```text
page = 0  -> lấy trang đầu tiên
size = 2  -> mỗi trang 2 item
```

Response nên có:

```json
{
  "content": [
    {
      "id": 1,
      "sku": "MOUSE-001",
      "name": "Mouse",
      "price": 500000,
      "categoryId": 1
    },
    {
      "id": 2,
      "sku": "KB-001",
      "name": "Keyboard",
      "price": 1500000,
      "categoryId": 1
    }
  ],
  "page": 0,
  "size": 2,
  "totalElements": 5,
  "totalPages": 3
}
```

`content` là dữ liệu trang hiện tại.

Các field còn lại là metadata để frontend biết:

```text
đang ở trang nào
mỗi trang bao nhiêu item
tổng có bao nhiêu item
tổng có bao nhiêu trang
```

## 2. Luồng 3-layer

```text
Client
-> ProductController
-> ProductService
-> ProductRepository
-> ProductService
-> ProductController
-> Client
```

Chi tiết:

```text
Controller nhận page/size từ query param.
Service validate page/size.
Service gọi Repository.findAll().
Repository trả List<Product>.
Service sort list.
Service cắt list bằng fromIndex/toIndex.
Service map Product -> ProductResponse.
Service tạo PageResponse.
Controller trả 200 OK.
```

## 3. Controller

Controller chỉ hiểu HTTP.

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<PageResponse<ProductResponse>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(productService.getProducts(page, size));
    }
}
```

Controller làm đúng 3 việc:

```text
1. Nhận query param page/size.
2. Gọi Service.
3. Trả HTTP response.
```

Controller không nên:

```text
tự cắt list
tự tính totalPages
tự gọi Map
gọi Repository trực tiếp
```

## 4. Repository

Repository chỉ hiểu dữ liệu.

```java
public interface ProductRepository {
    List<Product> findAll();
}
```

Implementation in-memory:

```java
@Repository
public class InMemoryProductRepository implements ProductRepository {
    private final Map<Long, Product> products = new LinkedHashMap<>();

    @Override
    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }
}
```

Repository trả `List<Product>`, không trả `PageResponse`.

Vì sao?

```text
PageResponse là contract API.
Repository không biết API.
Repository chỉ biết lấy dữ liệu nguồn.
```

## 5. Service

Service là nơi tính paging khi đang dùng `Map`.

```java
@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public PageResponse<ProductResponse> getProducts(int page, int size) {
        validatePageRequest(page, size);

        List<Product> products = productRepository.findAll();

        List<ProductResponse> allResponses = products.stream()
                .sorted(Comparator.comparing(Product::getId))
                .map(this::toResponse)
                .toList();

        long totalElements = allResponses.size();
        int totalPages = (int) Math.ceil((double) totalElements / size);
        int fromIndex = page * size;

        if (fromIndex >= totalElements) {
            return new PageResponse<>(
                    List.of(),
                    page,
                    size,
                    totalElements,
                    totalPages
            );
        }

        int toIndex = Math.min(fromIndex + size, allResponses.size());
        List<ProductResponse> content = allResponses.subList(fromIndex, toIndex);

        return new PageResponse<>(
                content,
                page,
                size,
                totalElements,
                totalPages
        );
    }

    private void validatePageRequest(int page, int size) {
        if (page < 0) {
            throw new AppException(ErrorCode.INVALID_PARAMETER);
        }
        if (size < 1 || size > 100) {
            throw new AppException(ErrorCode.INVALID_PARAMETER);
        }
    }

    private ProductResponse toResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .sku(product.getSku())
                .name(product.getName())
                .price(product.getPrice())
                .categoryId(product.getCategoryId())
                .build();
    }
}
```

## 6. Tách từng bước trong Service

### Bước 1: validate

```java
validatePageRequest(page, size);
```

Rule:

```text
page >= 0
1 <= size <= 100
```

Nếu sai:

```text
400 Bad Request
```

### Bước 2: lấy toàn bộ dữ liệu nguồn

```java
List<Product> products = productRepository.findAll();
```

Vì M1-2 dùng `Map`, repository chưa biết query phân trang.

### Bước 3: sort ổn định

```java
.sorted(Comparator.comparing(Product::getId))
```

Vì sao cần sort?

```text
Nếu thứ tự list không ổn định, page=0 hôm nay có thể khác page=0 lần sau.
```

### Bước 4: map model sang response DTO

```java
.map(this::toResponse)
```

Không trả thẳng `Product` ra API.

### Bước 5: tính metadata

```java
long totalElements = allResponses.size();
int totalPages = (int) Math.ceil((double) totalElements / size);
```

Ví dụ:

```text
totalElements = 5
size = 2
totalPages = ceil(5 / 2) = 3
```

### Bước 6: tính index

```java
int fromIndex = page * size;
int toIndex = Math.min(fromIndex + size, allResponses.size());
```

Ví dụ:

```text
page=1
size=2
fromIndex=2
toIndex=4
subList(2, 4) -> item index 2 và 3
```

### Bước 7: page vượt quá thì content rỗng

```java
if (fromIndex >= totalElements) {
    return new PageResponse<>(List.of(), page, size, totalElements, totalPages);
}
```

Không trả lỗi nếu `page/size` hợp lệ.

## 7. PageResponse

```java
public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
}
```

Ý nghĩa:

```text
content       = dữ liệu trang hiện tại
page          = page client đang xin
size          = số item mỗi trang
totalElements = tổng số item trước khi cắt trang
totalPages    = tổng số trang
```

## 8. Ví dụ chạy bằng mắt

Có 5 product:

```text
P1, P2, P3, P4, P5
```

Client gọi:

```http
GET /api/products?page=1&size=2
```

Tính:

```text
totalElements = 5
totalPages = ceil(5 / 2) = 3
fromIndex = 1 * 2 = 2
toIndex = min(2 + 2, 5) = 4
content = subList(2, 4) = P3, P4
```

Response:

```json
{
  "content": ["P3", "P4"],
  "page": 1,
  "size": 2,
  "totalElements": 5,
  "totalPages": 3
}
```

## 9. Khi sang M1-3 JPA thì sao?

M1-2:

```text
Repository trả List<Product>
Service tự cắt list
```

M1-3 với Spring Data JPA:

```text
Repository trả Page<Product>
Database query đúng page
Service map Page<Product> -> PageResponse<ProductResponse>
```

Ví dụ sau này:

```java
Page<Product> productPage = productRepository.findAll(pageable);
```

Khi có database, không nên kéo toàn bộ dữ liệu lên rồi mới cắt. Nhưng M1-2 chưa học database nên cắt trong memory là hợp lý.

## 10. Câu trả lời thi cho Câu 8

```text
Endpoint là GET /api/products?page=0&size=20. Query param gồm page mặc định 0 và size mặc định 20. Validate page >= 0 và 1 <= size <= 100, sai thì trả 400. Response body gồm content, page, size, totalElements, totalPages. Vì dữ liệu đang lưu bằng Map nên Repository chỉ trả List<Product>, còn Service tính pagination bằng fromIndex = page * size, toIndex = min(fromIndex + size, totalElements), totalPages = ceil(totalElements / size). Controller chỉ nhận request và trả ResponseEntity.
```
