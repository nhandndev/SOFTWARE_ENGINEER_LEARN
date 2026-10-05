# M1-3 Bai 02 - Derived Query, @Query, Pageable Va Page

> Muc tieu bai 02: sau khi da biet `Entity` va `JpaRepository`, ban hoc cach **hoi database** bang repository method: derived query, JPQL/native query va phan trang bang `Pageable`/`Page`.

---

## 1. Bai 02 noi tiep bai 01 the nao?

Bai 01 ban da hoc:

```text
Product entity
Category entity
ProductRepository extends JpaRepository<Product, Long>
CategoryRepository extends JpaRepository<Category, Long>
save(product)
findById(id)
```

Bai 02 tra loi cau hoi:

```text
Neu khong chi tim theo id thi sao?
Tim theo sku thi sao?
Tim theo ten gan dung thi sao?
Loc theo category thi sao?
Lay danh sach co page/size thi sao?
Khi nao dung ten method, khi nao dung @Query?
```

Luon nho luong:

```text
Controller nhan query param
-> Service tao Pageable / goi repository method
-> Repository query database
-> Hibernate map row thanh entity
-> Service map entity sang Response DTO
-> Controller tra response
```

---

## 2. Derived query method la gi?

Derived query la cach Spring Data JPA doc **ten method** de tao query.

Vi du:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
    Optional<Product> findBySku(String sku);
}
```

Spring Data JPA hieu:

```text
existsBySku
-> kiem tra co row nao co field sku bang tham so sku khong

findBySku
-> tim Product co field sku bang tham so sku
```

Chu `Sku` trong `existsBySku` phai khop voi field Java:

```java
private String sku;
```

Khong phai tuy tien dat.

---

## 3. Derived query doc ten method nhu the nao?

Cong thuc:

```text
<hanh dong>By<field><dieu kien>
```

Vi du:

```java
findByName(String name)
```

Spring hieu:

```text
find Product where name = ?
```

```java
existsBySku(String sku)
```

Spring hieu:

```text
exists Product where sku = ?
```

```java
findByNameContainingIgnoreCase(String keyword)
```

Spring hieu:

```text
find Product where lower(name) like lower('%keyword%')
```

### Cac tu hay gap

| Method keyword | Y nghia |
|---|---|
| `findByXxx` | Tim theo field |
| `existsByXxx` | Kiem tra ton tai |
| `countByXxx` | Dem so luong |
| `deleteByXxx` | Xoa theo field |
| `And` | Dieu kien AND |
| `Or` | Dieu kien OR |
| `Containing` | LIKE `%value%` |
| `IgnoreCase` | Khong phan biet hoa thuong |
| `GreaterThan` | Lon hon |
| `LessThan` | Nho hon |
| `Between` | Trong khoang |

---

## 4. Derived query cho Product

Entity Product gia su co:

```java
private Long id;
private String sku;
private String name;
private BigDecimal price;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_id")
private Category category;
```

Repository:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);

    Optional<Product> findBySku(String sku);

    List<Product> findByNameContainingIgnoreCase(String keyword);

    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    Page<Product> findByNameContainingIgnoreCaseAndCategoryId(
            String keyword,
            Long categoryId,
            Pageable pageable
    );
}
```

### Vi sao `findByCategoryId` duoc?

`Product` khong co field `categoryId`, no co:

```java
private Category category;
```

Nhung `Category` co:

```java
private Long id;
```

Spring Data JPA co the hieu nested property:

```text
category.id
```

Nen:

```java
findByCategoryId(Long categoryId)
```

co y nghia:

```text
where product.category.id = :categoryId
```

Neu muon viet ro hon, co the dung dau gach duoi:

```java
findByCategory_Id(Long categoryId)
```

Trong thuc te, ca hai style co the gap. Moi hoc thi cu hieu:

```text
CategoryId -> category.id
```

---

## 5. Khi nao derived query la du?

Derived query tot khi query ngan va de doc:

```java
existsBySku(String sku)
findBySku(String sku)
findByCategoryId(Long categoryId, Pageable pageable)
findByNameContainingIgnoreCase(String keyword, Pageable pageable)
```

Nhung khi ten method qua dai:

```java
findByNameContainingIgnoreCaseAndCategoryIdAndPriceGreaterThanAndPriceLessThanAndStatus(...)
```

thi kho doc.

Luc do nen can nhac:

```text
@Query JPQL
native query
Specification sau nay
```

---

## 6. `@Query` la gi?

`@Query` cho ban tu viet query cho repository method.

Co 2 loai:

```text
JPQL:
Query theo entity va field Java.

Native SQL:
Query theo table va column database.
```

---

## 7. JPQL

JPQL lam viec voi entity.

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
Product la entity class.
p.name la field Java.
Khong phai products table.
Khong phai product_name column.
```

Neu Product co field:

```java
private String name;
```

thi JPQL dung:

```text
p.name
```

---

## 8. JPQL join relation

Tim Product theo ten Category:

```java
@Query("""
        select p
        from Product p
        join p.category c
        where lower(c.name) = lower(:categoryName)
        """)
Page<Product> findByCategoryName(
        @Param("categoryName") String categoryName,
        Pageable pageable
);
```

Giai thich:

```text
p.category la field Java trong Product.
c.name la field Java trong Category.
```

JPQL join theo object relation, khong join theo column bang tay.

---

## 9. Native SQL

Native SQL query theo table/column that trong database.

```java
@Query(
        value = """
                select *
                from products p
                where lower(p.name) like lower(concat('%', :keyword, '%'))
                """,
        nativeQuery = true
)
List<Product> searchNative(@Param("keyword") String keyword);
```

Trong native SQL:

```text
products la table.
p.name la column.
category_id la column.
```

Vi du join native:

```java
@Query(
        value = """
                select p.*
                from products p
                join categories c on p.category_id = c.id
                where lower(c.name) = lower(:categoryName)
                """,
        nativeQuery = true
)
List<Product> findNativeByCategoryName(@Param("categoryName") String categoryName);
```

---

## 10. JPQL vs native SQL

| Tieu chi | JPQL | Native SQL |
|---|---|---|
| Query tren | Entity/field Java | Table/column DB |
| Vi du object | `Product p` | `products p` |
| Portable DB | Tot hon | Kem hon |
| Dung function DB rieng | Han che | Tot |
| Phu hop | Query theo domain/entity | Query can SQL dac thu/performance |

Moi hoc nen uu tien:

```text
Derived query -> JPQL -> native SQL
```

Dung native khi co ly do ro.

---

## 11. Pageable la gi?

`Pageable` la object mo ta yeu cau phan trang:

```text
page number
page size
sort
```

Tao bang:

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
Lay trang dau tien, moi trang 20 item, sap xep id giam dan.
```

---

## 12. Page<T> la gi?

`Page<T>` la ket qua phan trang tu database/JPA.

```java
Page<Product> productPage = productRepository.findAll(pageable);
```

`Page<Product>` co:

```text
getContent()       -> List<Product> cua trang hien tai
getNumber()        -> page hien tai
getSize()          -> size
getTotalElements() -> tong so record
getTotalPages()    -> tong so trang
isFirst()
isLast()
```

Khac M1-2:

```text
M1-2 Map:
Service tu cat List bang fromIndex/toIndex.

M1-3 JPA:
Repository tra Page<Product>, database/JPA xu ly limit/offset.
```

---

## 13. Luong list Product co paging

Request:

```http
GET /api/products?page=0&size=20&keyword=keyboard
```

Luong:

```text
1. Controller nhan page, size, keyword tu query param.
2. Controller goi productService.getProducts(page, size, keyword).
3. Service validate page >= 0, size > 0.
4. Service tao Pageable bang PageRequest.of(page, size, Sort...).
5. Service goi repository query.
6. Repository tra Page<Product>.
7. Service lay content tu Page<Product>.
8. Service map List<Product> -> List<ProductResponse>.
9. Service tao PageResponse<ProductResponse>.
10. Controller tra 200 OK.
```

Code:

```java
@Transactional(readOnly = true)
public PageResponse<ProductResponse> getProducts(
        int page,
        int size,
        String keyword
) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

    Page<Product> productPage;
    if (keyword == null || keyword.isBlank()) {
        productPage = productRepository.findAll(pageable);
    } else {
        productPage = productRepository.findByNameContainingIgnoreCase(keyword, pageable);
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
```

---

## 14. Repository paging methods

Co san tu JpaRepository:

```java
Page<Product> findAll(Pageable pageable);
```

Tu viet derived query co paging:

```java
Page<Product> findByNameContainingIgnoreCase(
        String keyword,
        Pageable pageable
);
```

Loc theo category:

```java
Page<Product> findByCategoryId(
        Long categoryId,
        Pageable pageable
);
```

Ket hop:

```java
Page<Product> findByNameContainingIgnoreCaseAndCategoryId(
        String keyword,
        Long categoryId,
        Pageable pageable
);
```

---

## 15. Controller nhan paging params

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

Controller chi lam:

```text
Nhan query param.
Goi Service.
Tra response.
```

Khong nen:

```text
Tu tao query.
Tu cat list.
Tu map entity.
```

---

## 16. Sort

Sap xep theo id giam dan:

```java
Sort sort = Sort.by("id").descending();
Pageable pageable = PageRequest.of(page, size, sort);
```

Sap xep theo name tang dan:

```java
Sort sort = Sort.by("name").ascending();
```

Nhieu field:

```java
Sort sort = Sort.by("category.name").ascending()
        .and(Sort.by("id").descending());
```

Can can than voi sort field tu client. Khong nen cho client truyen field nao cung sort duoc neu chua validate.

---

## 17. PageResponse trong API

Repository tra:

```text
Page<Product>
```

API nen tra:

```text
PageResponse<ProductResponse>
```

Vi sao?

```text
Product la entity noi bo.
ProductResponse la DTO cho client.
PageResponse la format paging cua API.
```

Vi du response:

```json
{
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
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

---

## 18. Cac loi thuong gap bai 02

### Loi 1: Nham JPQL voi SQL

Sai JPQL:

```java
@Query("select p from products p where p.product_name = :name")
```

Dung JPQL:

```java
@Query("select p from Product p where p.name = :name")
```

Vì JPQL dùng entity `Product` và field `name`.

### Loi 2: Repository tra DTO API truc tiep khi chua can

Moi hoc nen:

```text
Repository tra Product entity.
Service map Product -> ProductResponse.
```

### Loi 3: Service tu cat list nhu M1-2

M1-3 dung:

```text
Pageable + Page<Product>
```

Khong can tu tinh:

```text
fromIndex/toIndex
```

### Loi 4: Quen validate page/size

Nen check:

```text
page >= 0
size > 0
size <= maxSize
```

### Loi 5: Ten method khong khop field entity

Neu entity co:

```java
private String sku;
```

thi:

```java
findBySku
```

Khong phai:

```java
findByProductSku
```

tru khi field that su ten la `productSku`.

---

## 19. Checklist xong bai 02

- [ ] Giai thich duoc derived query method la gi.
- [ ] Viet duoc `existsBySku`, `findBySku`.
- [ ] Viet duoc `findByNameContainingIgnoreCase`.
- [ ] Hieu `findByCategoryId` la `category.id`.
- [ ] Phan biet JPQL query entity/field voi native SQL query table/column.
- [ ] Tao duoc `Pageable` bang `PageRequest.of`.
- [ ] Giai thich duoc `Page<Product>` gom content va metadata.
- [ ] Map duoc `Page<Product>` sang `PageResponse<ProductResponse>`.
- [ ] Biet Controller nhan `page`, `size`, `keyword`.
- [ ] Biet Service validate page/size va goi repository.

---

## 20. Tom tat can nho

```text
Derived query = Spring Data JPA doc ten method de tao query.
Phan sau By phai khop field entity.
JPQL query theo entity va field Java.
Native SQL query theo table va column database.
Pageable la request phan trang.
Page<T> la ket qua phan trang tu repository.
Repository tra Page<Product>.
Service map sang PageResponse<ProductResponse>.
M1-3 khong tu cat list bang fromIndex/toIndex nua.
```

