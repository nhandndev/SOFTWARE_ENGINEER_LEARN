# M1-3 Bai 02 - Query Va Paging Ban Chi Tiet

> File nay viet lai Bai 02 theo kieu cham, de hieu. Muc tieu la ban nam duoc 3 thu: **repository query nhu the nao**, **JPQL khac SQL o dau**, va **Page<Product> map thanh PageResponse<ProductResponse> ra sao**.

---

## 1. Bai 02 dang hoc cai gi?

Bai 01 ban da biet:

```text
ProductRepository extends JpaRepository<Product, Long>
save(product)
findById(id)
```

Bai 02 tra loi:

```text
Neu muon tim Product theo sku thi sao?
Neu muon search Product theo ten thi sao?
Neu muon loc Product theo categoryId thi sao?
Neu danh sach qua nhieu thi paging nhu the nao?
Neu query method qua dai thi viet @Query ra sao?
```

Tu M1-2 sang M1-3, diem khac lon nhat:

```text
M1-2:
Repository tra List<Product>, Service tu cat list bang fromIndex/toIndex.

M1-3:
Repository tra Page<Product>, database/JPA tu xu ly limit/offset.
Service chi map Page<Product> thanh PageResponse<ProductResponse>.
```

---

## 2. Derived query method la gi?

Derived query la repository method ma **Spring Data JPA doc ten method de tao query**.

Vi du:

```java
boolean existsBySku(String sku);
```

Doc bang tieng nguoi:

```text
exists -> co ton tai khong
BySku  -> theo field sku
```

Nghia la:

```text
Co Product nao co sku = tham so truyen vao khong?
```

Tuong duong y tuong SQL:

```sql
select count(*)
from products
where sku = ?;
```

Nhung ban khong can viet SQL.

Spring Data JPA nhin vao:

```text
existsBySku
```

roi sinh query dua tren field:

```java
private String sku;
```

Cau nho:

```text
Phan sau By phai khop field trong entity Java.
```

---

## 3. Repository method dung cho Product

Trong bai 02, ProductRepository nen co:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);

    Optional<Product> findBySku(String sku);

    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
}
```

Giai thich tung method:

### `existsBySku`

```java
boolean existsBySku(String sku);
```

Dung khi tao Product:

```text
Neu sku da ton tai -> throw DUPLICATE_SKU
```

Return:

```text
true / false
```

### `findBySku`

```java
Optional<Product> findBySku(String sku);
```

Dung khi can lay Product theo SKU.

Return `Optional<Product>` vi:

```text
Co the tim thay Product.
Co the khong tim thay Product.
```

### `findByNameContainingIgnoreCase`

```java
Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
```

Doc:

```text
findByName       -> tim theo field name
Containing       -> co chua keyword
IgnoreCase       -> khong phan biet hoa thuong
Pageable         -> co paging
```

Vi du keyword:

```text
keyboard
```

Se match:

```text
Keyboard
Gaming Keyboard
KEYBOARD PRO
```

### `findByCategoryId`

```java
Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
```

Product entity co:

```java
private Category category;
```

Khong co:

```java
private Long categoryId;
```

Nhung van viet duoc `findByCategoryId` vi Spring Data JPA hieu:

```text
CategoryId -> category.id
```

Noi ro hon:

```java
Page<Product> findByCategory_Id(Long categoryId, Pageable pageable);
```

Hai cach nay deu nham toi:

```text
Product.category.id = categoryId
```

---

## 4. Loi ban dang hay sai o repository method

Sai:

```java
Boolean existsBysku(String sku);
```

Dung:

```java
boolean existsBySku(String sku);
```

Ly do:

```text
Sku phai viet dung PascalCase sau By.
Field la sku, method la existsBySku.
```

Sai:

```java
Page<Product> findByCategory(Long id, Pageable pageable);
```

Dung:

```java
Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
```

Ly do:

```text
findByCategory(...) nghia la tim theo Category object.
Neu tham so la Long id thi method phai la findByCategoryId hoặc findByCategory_Id.
```

Neu muon dung `findByCategory`, tham so phai la:

```java
Page<Product> findByCategory(Category category, Pageable pageable);
```

Nhung trong API client thuong gui `categoryId`, nen dung:

```java
findByCategoryId(Long categoryId, Pageable pageable)
```

---

## 5. JPQL la gi?

JPQL la query tren **entity Java va field Java**.

Vi du:

```java
@Query("""
        select p
        from Product p
        where lower(p.name) like lower(concat('%', :keyword, '%'))
        """)
Page<Product> searchByName(@Param("keyword") String keyword, Pageable pageable);
```

Trong JPQL:

```text
Product -> entity class
p.name  -> field Java trong Product
```

Khong phai:

```text
products table
product_name column
```

### Cach doc JPQL tren

```text
select p
```

Lay Product entity.

```text
from Product p
```

Tu entity Product, dat alias la p.

```text
where lower(p.name) like lower(concat('%', :keyword, '%'))
```

Tim Product co name chua keyword, khong phan biet hoa thuong.

---

## 6. Native SQL la gi?

Native SQL la SQL that theo database table/column.

```java
@Query(
        value = """
                select *
                from products
                where lower(name) like lower(concat('%', :keyword, '%'))
                """,
        nativeQuery = true
)
List<Product> searchNative(@Param("keyword") String keyword);
```

Trong native SQL:

```text
products -> table trong database
name     -> column trong database
```

---

## 7. JPQL vs native SQL

| Cau hoi | JPQL | Native SQL |
|---|---|---|
| Query tren cai gi? | Entity/field Java | Table/column DB |
| Dung `Product` hay `products`? | `Product` | `products` |
| Dung `p.name` hay `p.product_name`? | `p.name` field Java | column DB |
| Phu thuoc DB? | It hon | Nhieu hon |
| Moi hoc nen dung? | Co | Chi khi can |

Cau nho:

```text
JPQL noi chuyen voi Java entity.
Native SQL noi chuyen voi database table.
```

---

## 8. Sua cau JPQL sai trong de

De cho:

```java
@Query("select p from products p where p.product_name = :keyword")
List<Product> search(String keyword);
```

Sai o dau?

### Sai 1: `products`

Trong JPQL khong dung table name.

Sai:

```text
products
```

Dung:

```text
Product
```

### Sai 2: `product_name`

Trong JPQL khong dung column name.

Sai:

```text
p.product_name
```

Dung:

```text
p.name
```

### Sai 3: search keyword nen dung LIKE

Neu search keyword trong name, nen dung:

```text
like %keyword%
```

JPQL dung:

```java
@Query("""
        select p
        from Product p
        where lower(p.name) like lower(concat('%', :keyword, '%'))
        """)
List<Product> search(@Param("keyword") String keyword);
```

---

## 9. Pageable la gi?

`Pageable` la object mo ta request phan trang:

```text
page number
page size
sort
```

Tao Pageable:

```java
Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
```

Vi du:

```text
page = 0
size = 20
sort = id desc
```

Nghia la:

```text
Lay trang dau tien.
Moi trang 20 items.
Sap xep id giam dan.
```

Khac voi M1-2:

```text
M1-2 Map:
Tu cat list.

M1-3 JPA:
Tao Pageable, dua cho repository.
Database/JPA tu xu ly limit/offset.
```

---

## 10. Page<Product> la gi?

Khi repository query co `Pageable`, no co the tra:

```java
Page<Product>
```

Vi du:

```java
Page<Product> productPage = productRepository.findAll(pageable);
```

`Page<Product>` gom:

```text
content: List<Product> cua trang hien tai
number: page hien tai
size: kich thuoc trang
totalElements: tong so record
totalPages: tong so trang
first/last: co phai trang dau/cuoi khong
```

Trong code:

```java
productPage.getContent()
productPage.getNumber()
productPage.getSize()
productPage.getTotalElements()
productPage.getTotalPages()
productPage.isFirst()
productPage.isLast()
```

---

## 11. PageResponse<ProductResponse> la gi?

Repository tra:

```text
Page<Product>
```

Nhung API khong nen tra entity.

API nen tra:

```text
PageResponse<ProductResponse>
```

Vi:

```text
Product la entity noi bo.
ProductResponse la DTO tra client.
PageResponse la format paging cua API.
```

Luong map:

```text
Page<Product>
-> List<Product> content
-> List<ProductResponse> content
-> PageResponse<ProductResponse>
```

---

## 12. Cach map Page sang PageResponse

Day la phan quan trong nhat cua bai 02.

Gia su repository tra:

```java
Page<Product> productPage;
```

Buoc 1: lay content entity:

```java
List<Product> products = productPage.getContent();
```

Buoc 2: map entity sang DTO:

```java
List<ProductResponse> content = products.stream()
        .map(this::toResponse)
        .toList();
```

Buoc 3: tao PageResponse:

```java
return PageResponse.<ProductResponse>builder()
        .content(content)
        .page(productPage.getNumber())
        .size(productPage.getSize())
        .totalElements(productPage.getTotalElements())
        .totalPages(productPage.getTotalPages())
        .build();
```

Can nho:

```text
content lay tu productPage.getContent() roi map DTO.
page lay tu productPage.getNumber().
size lay tu productPage.getSize().
totalElements lay tu productPage.getTotalElements().
totalPages lay tu productPage.getTotalPages().
```

Khong co cong thuc:

```text
page = page + size
```

Do la sai.

`Page` da tinh metadata san cho minh.

---

## 13. Luong GET /api/products?page=0&size=20&keyword=keyboard

Day la flow can thuoc bang cach hieu.

Request:

```http
GET /api/products?page=0&size=20&keyword=keyboard
```

### Buoc 1: Controller nhan query param

```java
@GetMapping
public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size,
        @RequestParam(required = false) String keyword
) {
    PageResponse<ProductResponse> result =
            productService.getProducts(page, size, keyword);

    return ResponseEntity.ok(ApiResponse.success(result));
}
```

Controller khong query DB.

Controller chi:

```text
Nhan page/size/keyword.
Goi Service.
Tra 200 OK.
```

### Buoc 2: Service validate page/size

```java
if (page < 0) {
    throw new AppException(ErrorCode.INVALID_PARAMETER);
}

if (size <= 0 || size > 100) {
    throw new AppException(ErrorCode.INVALID_PARAMETER);
}
```

### Buoc 3: Service tao Pageable

```java
Pageable pageable = PageRequest.of(
        page,
        size,
        Sort.by("id").descending()
);
```

### Buoc 4: Service chon repository method

```java
Page<Product> productPage;

if (keyword == null || keyword.isBlank()) {
    productPage = productRepository.findAll(pageable);
} else {
    productPage = productRepository.findByNameContainingIgnoreCase(keyword, pageable);
}
```

### Buoc 5: Repository query DB

Neu khong keyword:

```text
findAll(pageable)
```

Neu co keyword:

```text
findByNameContainingIgnoreCase(keyword, pageable)
```

Repository tra:

```text
Page<Product>
```

### Buoc 6: Service map sang response

```java
List<ProductResponse> content = productPage.getContent()
        .stream()
        .map(this::toResponse)
        .toList();
```

### Buoc 7: Service tao PageResponse

```java
PageResponse<ProductResponse> response = PageResponse.<ProductResponse>builder()
        .content(content)
        .page(productPage.getNumber())
        .size(productPage.getSize())
        .totalElements(productPage.getTotalElements())
        .totalPages(productPage.getTotalPages())
        .build();
```

### Buoc 8: Controller tra 200

```text
200 OK + ApiResponse<PageResponse<ProductResponse>>
```

Neu khong co Product nao match keyword:

```text
Khong throw 404.
Tra 200 OK voi content rong.
```

Vì list/search rỗng không phải lỗi.

---

## 14. Code day du cho cau 10

Repository:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );
}
```

Service:

```java
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public PageResponse<ProductResponse> getProducts(
            int page,
            int size,
            String keyword
    ) {
        validatePageRequest(page, size);

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("id").descending()
        );

        Page<Product> productPage;
        if (keyword == null || keyword.isBlank()) {
            productPage = productRepository.findAll(pageable);
        } else {
            productPage = productRepository
                    .findByNameContainingIgnoreCase(keyword, pageable);
        }

        List<ProductResponse> content = productPage.getContent()
                .stream()
                .map(this::toResponse)
                .toList();

        return PageResponse.<ProductResponse>builder()
                .content(content)
                .page(productPage.getNumber())
                .size(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .build();
    }

    private void validatePageRequest(int page, int size) {
        if (page < 0) {
            throw new AppException(ErrorCode.INVALID_PARAMETER);
        }

        if (size <= 0 || size > 100) {
            throw new AppException(ErrorCode.INVALID_PARAMETER);
        }
    }

    private ProductResponse toResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .sku(product.getSku())
                .name(product.getName())
                .price(product.getPrice())
                .categoryId(product.getCategory().getId())
                .build();
    }
}
```

---

## 15. Nhung cau ban can tu noi lai

### Derived query

```text
Derived query la method repository duoc Spring Data JPA doc ten de sinh query.
existsBySku hoat dong vi Product co field sku.
```

### JPQL

```text
JPQL query tren entity va field Java.
Product la entity, p.name la field Java.
Khong dung products table hay product_name column trong JPQL.
```

### Native SQL

```text
Native SQL query tren table va column database.
products la table, name/category_id la column.
```

### Pageable

```text
Pageable mo ta request phan trang gom page, size, sort.
```

### Page

```text
Page<Product> la ket qua phan trang tu repository, gom content va metadata.
```

### PageResponse

```text
Service map Page<Product> thanh PageResponse<ProductResponse>.
content la list DTO, metadata lay tu productPage.
```

---

## 16. Checklist pass bai 02

- [ ] Viet dung `existsBySku`.
- [ ] Viet dung `findBySku`.
- [ ] Viet dung `findByNameContainingIgnoreCase(String keyword, Pageable pageable)`.
- [ ] Viet dung `findByCategoryId(Long categoryId, Pageable pageable)`.
- [ ] Giai thich duoc `CategoryId` la `category.id`.
- [ ] Phan biet JPQL voi native SQL.
- [ ] Sua duoc JPQL sai `products/product_name`.
- [ ] Tao duoc `Pageable` bang `PageRequest.of`.
- [ ] Noi duoc `Page<Product>` co content, page, size, totalElements, totalPages.
- [ ] Map duoc `Page<Product>` sang `PageResponse<ProductResponse>`.
- [ ] Biet search list rong tra `200 OK + content []`, khong throw not found.

---

## 17. Tom tat 7 dong

```text
Derived query doc ten method de tao query.
Phan sau By phai khop field entity.
JPQL dung Entity va field Java.
Native SQL dung table va column DB.
Pageable la yeu cau page/size/sort.
Page<Product> la ket qua DB tra ve co content + metadata.
Service map Page<Product> -> PageResponse<ProductResponse>.
```

