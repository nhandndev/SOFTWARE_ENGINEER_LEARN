# Mini Project Mau - JPA Paging Product

> Muc tieu: xem mot flow nho co du **Controller -> Service -> Repository**, dung **JpaRepository**, **Page<Product>**, va tra ve **PageResponse<ProductResponse>**.

Day la sample de doc hieu, khong phai yeu cau copy nguyen vao `shopcore`.

---

## 1. API can hinh dung

Client goi:

```http
GET /api/products?page=0&size=5&keyword=keyboard
```

Server tra:

```json
{
  "success": true,
  "message": "Get products successfully",
  "data": {
    "content": [
      {
        "id": 1,
        "sku": "KB-001",
        "name": "Keyboard",
        "price": 1500000,
        "categoryId": 10
      }
    ],
    "page": 0,
    "size": 5,
    "totalElements": 1,
    "totalPages": 1
  }
}
```

Ben ngoai API thay:

```text
ApiResponse<PageResponse<ProductResponse>>
```

Ben trong Service lam viec voi:

```text
Page<Product>
```

---

## 2. Luong chay tong the

```text
Client
-> ProductController
-> ProductService
-> ProductRepository
-> Spring Data JPA proxy
-> Hibernate
-> Database
-> Hibernate map row thanh Product entity
-> ProductRepository tra Page<Product>
-> ProductService map Page<Product> thanh PageResponse<ProductResponse>
-> ProductController boc ApiResponse
-> Client
```

Rut gon:

```text
Controller nhan page/size/keyword.
Service tao Pageable.
Repository tra Page<Product>.
Service map content sang ProductResponse.
Service copy metadata tu Page sang PageResponse.
Controller tra ApiResponse.
```

---

## 3. Cau truc file mau

```text
Samples_M1_3_JPA_Paging
├── README.md
├── Product.java
├── ProductResponse.java
├── PageResponse.java
├── ApiResponse.java
├── ProductRepository.java
├── ProductService.java
└── ProductController.java
```

Trong project that, cac file nay se nam trong package:

```text
com.shopcore.product
com.shopcore.product.dto
com.shopcore.common
```

---

## 4. Product entity

File: [Product.java](./Product.java)

Y chinh:

```java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false, unique = true)
    String sku;

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    BigDecimal price;

    @Column(name = "category_id", nullable = false)
    Long categoryId;
}
```

Trong sample nay minh de `Long categoryId` cho de doc paging truoc.

Sau khi chac JPA relationship, ban co the doi sang:

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_id")
Category category;
```

---

## 5. ProductRepository

File: [ProductRepository.java](./ProductRepository.java)

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
}
```

Y nghia:

```text
findByName -> tim theo field name.
Containing -> name co chua keyword.
IgnoreCase -> khong phan biet hoa thuong.
Pageable -> co paging.
Return Page<Product> -> ket qua co content + metadata.
```

Neu keyword rong, Service se dung method co san:

```java
productRepository.findAll(pageable)
```

---

## 6. ProductService

File: [ProductService.java](./ProductService.java)

Service la phan quan trong nhat.

### Buoc 1: validate page/size

```java
validatePageRequest(page, size);
```

Vi:

```text
page < 0 la request sai.
size <= 0 la request sai.
size qua lon co the lam DB/app bi nang.
```

### Buoc 2: tao Pageable

```java
Pageable pageable = PageRequest.of(
        page,
        size,
        Sort.by("id").descending()
);
```

Pageable noi voi repository:

```text
Lay page nao?
Moi page bao nhieu item?
Sap xep the nao?
```

### Buoc 3: chon query

```java
Page<Product> productPage;
if (keyword == null || keyword.isBlank()) {
    productPage = productRepository.findAll(pageable);
} else {
    productPage = productRepository.findByNameContainingIgnoreCase(keyword, pageable);
}
```

Neu khong co keyword:

```text
Lay tat ca Product co paging.
```

Neu co keyword:

```text
Search theo name co chua keyword.
```

### Buoc 4: map content

```java
List<ProductResponse> content = productPage.getContent()
        .stream()
        .map(this::toResponse)
        .toList();
```

`productPage.getContent()` tra:

```text
List<Product>
```

Sau map:

```text
List<ProductResponse>
```

### Buoc 5: tao PageResponse

```java
return PageResponse.<ProductResponse>builder()
        .content(content)
        .page(productPage.getNumber())
        .size(productPage.getSize())
        .totalElements(productPage.getTotalElements())
        .totalPages(productPage.getTotalPages())
        .build();
```

Day la doan ban can thuoc bang cach hieu:

```text
content lay tu getContent roi map DTO.
page lay tu getNumber.
size lay tu getSize.
totalElements lay tu getTotalElements.
totalPages lay tu getTotalPages.
```

Khong tu tinh `fromIndex/toIndex` nua.

---

## 7. ProductController

File: [ProductController.java](./ProductController.java)

Controller chi lam:

```text
Nhan query param.
Goi Service.
Boc ApiResponse.
Tra 200 OK.
```

Code y chinh:

```java
@GetMapping
public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size,
        @RequestParam(required = false) String keyword
) {
    PageResponse<ProductResponse> result =
            productService.getProducts(page, size, keyword);

    ApiResponse<PageResponse<ProductResponse>> body = ApiResponse
            .<PageResponse<ProductResponse>>builder()
            .success(true)
            .message("Get products successfully")
            .data(result)
            .build();

    return ResponseEntity.ok(body);
}
```

---

## 8. Tai sao list rong van tra 200?

Request:

```http
GET /api/products?page=0&size=5&keyword=not-exist
```

Neu khong co Product nao match keyword, repository tra:

```text
Page<Product>
content = []
totalElements = 0
totalPages = 0
```

Day khong phai loi.

Nen tra:

```text
200 OK + content rong
```

Khac voi:

```http
GET /api/products/999
```

Lay chi tiet mot resource ma khong co thi moi:

```text
404 Not Found
```

---

## 9. Checklist doc code

Khi doc mini project nay, hay tu tra loi:

- [ ] Controller co query DB truc tiep khong?
- [ ] Service tao `Pageable` o dau?
- [ ] Repository method nao tra `Page<Product>`?
- [ ] `productPage.getContent()` tra gi?
- [ ] Luc nao `Product` thanh `ProductResponse`?
- [ ] Metadata page/size/totalElements/totalPages lay tu dau?
- [ ] Vi sao search rong tra 200?

---

## 10. Mot cau tom tat

```text
Repository tra Page<Product>, Service map thanh PageResponse<ProductResponse>, Controller boc ApiResponse va tra 200 OK.
```

