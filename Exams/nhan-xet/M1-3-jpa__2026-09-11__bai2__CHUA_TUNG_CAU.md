# Chua Tung Cau - M1-3 JPA Bai 02 Query Va Paging

> File de: `Exams/de-kiem-tra/M1-3-jpa__2026-09-11__bai2.md`  
> Ngay chua: 2026-09-12  
> Diem tong: **39/43 = 91/100 - Dat bai 02**

---

## Tong quan

Ban da pass bai 02. Diem tot nhat la ban da nam duoc:

```text
Repository tra Page<Product>.
Service map Page<Product> sang PageResponse<ProductResponse>.
Controller boc ApiResponse tra ve client.
```

Con can sua nhe:

```text
JPQL phai dung entity/field, khong dung table/column.
Page<Product> lay page hien tai bang getNumber(), khong co getPage().
Derived query sau By phai khop field entity.
```

---

## Cau 1 - Derived query la gi? (3d)

### Ban dat: 2.8/3

### Nhan xet

Ban hieu dung y chinh:

```text
Spring Data JPA doc ten method de tao query.
existsBySku = kiem tra ton tai theo sku.
```

Thieu nhe:

```text
Phan sau By phai khop voi field Java trong entity.
```

### Dap an nen viet

```text
Derived query la repository method ma Spring Data JPA doc ten method de tao query.
existsBySku hoat dong vi `exists` la hanh dong kiem tra ton tai,
`BySku` tro toi field `sku` trong Product entity.
Phan sau `By` phai khop voi ten field Java trong entity hoac nested field hop le.
```

### Can nho

```text
existsBySku -> Product.sku
findByCategoryId -> Product.category.id
```

---

## Cau 2 - Viet repository methods (3d)

### Ban dat: 2.7/3

### Nhan xet

Ban viet dung cac method chinh:

```java
findBySku
findByNameContainingIgnoreCase
findByCategoryId
existsBySku
```

Gop y:

```text
boolean nen dung primitive `boolean`.
Ten bien nen la keyword/categoryId de doc ro nghia.
@Repository khong bat buoc voi interface extends JpaRepository.
```

### Dap an nen viet

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);

    Optional<Product> findBySku(String sku);

    Page<Product> findByNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );

    Page<Product> findByCategoryId(
            Long categoryId,
            Pageable pageable
    );
}
```

### Can nho

```text
findByNameContainingIgnoreCase -> search name co chua keyword.
findByCategoryId -> category.id.
```

---

## Cau 3 - `findByCategoryId` hieu the nao? (3d)

### Ban dat: 3/3

### Nhan xet

Ban hieu dung nested property:

```text
Product co Category category.
Category co id.
findByCategoryId duoc hieu la category.id.
```

### Dap an nen viet

```text
Product khong co field categoryId, nhung co field Category category.
Category lai co field id. Spring Data JPA co the doc `CategoryId`
nhu nested property `category.id`, nen `findByCategoryId`
co nghia la tim Product co product.category.id = categoryId.
Co the viet ro hon la `findByCategory_Id`.
```

### Can nho

```text
CategoryId = category.id
```

---

## Cau 4 - JPQL vs native SQL (3d)

### Ban dat: 3/3

### Nhan xet

Ban tra loi dung:

```text
JPQL query tren entity/object Java.
Native SQL query tren table/column database.
```

### Dap an nen viet

```text
JPQL query tren entity va field Java. Trong JPQL, `Product` la entity class,
`p.name` la field Java cua entity.

Native SQL query tren table va column that trong database. Trong native SQL,
`products` la table, `name` la column.
```

### Can nho

```text
JPQL: Product, p.name
SQL: products, name/product_name/category_id
```

---

## Cau 5 - Viet JPQL query (3d)

### Ban dat: 3/3

### Nhan xet

Query cua ban dung.

### Dap an dung

```java
@Query("""
        select p
        from Product p
        where lower(p.name) like lower(concat('%', :keyword, '%'))
        """)
Page<Product> searchByName(@Param("keyword") String keyword, Pageable pageable);
```

### Giai thich

```text
lower(...) de khong phan biet hoa thuong.
concat('%', :keyword, '%') de search chua keyword.
Pageable de repository tra Page<Product>.
```

---

## Cau 6 - Pageable va Page (3d)

### Ban dat: 3/3

### Nhan xet

Ban da sua tot. Cau tra loi co du:

```text
Pageable = page, size, sort.
Page<Product> = ket qua phan trang.
Metadata = content, number, size, totalElements, totalPages, first, last.
```

### Dap an nen viet

```text
Pageable la object mo ta request phan trang, gom page number, page size va sort.
Service thuong tao bang PageRequest.of(page, size, sort).

Page<Product> la ket qua phan trang repository tra ve, gom danh sach Product
cua trang hien tai va metadata phan trang.

Metadata hay dung: getContent(), getNumber(), getSize(),
getTotalElements(), getTotalPages(), isFirst(), isLast().
```

### Can nho

```text
Pageable = request paging.
Page<T> = result paging.
```

---

## Cau 7 - Luong list Product co paging (5d)

### Ban dat: 4.7/5

### Nhan xet

Ban da noi dung luong chinh:

```text
Controller nhan page/size/keyword.
Service validate va tao Pageable.
Repository query va tra Page<Product>.
Service map ProductResponse va PageResponse.
Controller boc ApiResponse.
```

Thieu nhe:

```text
Controller tra 200 OK.
Neu keyword khong co ket qua thi content rong, khong throw 404.
```

### Dap an nen viet

```text
Controller nhan page, size, keyword tu query param.
Controller goi productService.getProducts(page, size, keyword).
Service validate page >= 0 va size hop le.
Service tao Pageable bang PageRequest.of(page, size, Sort).
Neu keyword rong/null thi Service goi productRepository.findAll(pageable).
Neu co keyword thi goi findByNameContainingIgnoreCase(keyword, pageable).
Repository tra Page<Product>.
Service lay productPage.getContent() va map Product sang ProductResponse.
Service tao PageResponse gom content, page, size, totalElements, totalPages.
Controller boc ApiResponse<PageResponse<ProductResponse>> va tra 200 OK.
```

### Can nho

```text
List/search rong -> 200 OK + content [].
Detail id khong ton tai -> 404.
```

---

## Cau 8 - Map Page sang PageResponse (5d)

### Ban dat: 4.5/5

### Nhan xet

Ban da nam dung y chinh. Loi nho la code can viet:

```java
.stream()
.toList()
```

co dau ngoac.

### Dap an dung

```java
List<ProductResponse> content = productPage.getContent()
        .stream()
        .map(this::toResponse)
        .toList();

PageResponse<ProductResponse> response = PageResponse.<ProductResponse>builder()
        .content(content)
        .page(productPage.getNumber())
        .size(productPage.getSize())
        .totalElements(productPage.getTotalElements())
        .totalPages(productPage.getTotalPages())
        .build();
```

### Giai thich

```text
productPage.getContent() tra List<Product>.
map(this::toResponse) bien Product thanh ProductResponse.
getNumber/getSize/getTotalElements/getTotalPages lay metadata co san tu Page.
```

### Can nho

```text
Page<Product> -> getContent() -> List<Product> -> List<ProductResponse>
```

---

## Cau 9 - Tinh huong sai query (5d)

### Ban dat: 3.3/5

### Nhan xet

Ban da sua query gan dung, nhung giai thich loi chua dung trong tam.

Ban noi:

```text
thieu param keyword
```

Nhung loi chinh la:

```text
JPQL khong dung table `products`.
JPQL khong dung column `product_name`.
JPQL dung entity `Product` va field Java `p.name`.
```

### Dap an nen viet

```text
Query sai vi day la JPQL nhung lai viet theo table/column cua database.
`products` la table nen khong dung trong JPQL, phai dung entity `Product`.
`product_name` la column nen khong dung trong JPQL, phai dung field Java `p.name`.
Neu search keyword trong name thi nen dung LIKE voi concat `%`.
```

Code sua:

```java
@Query("""
        select p
        from Product p
        where lower(p.name) like lower(concat('%', :keyword, '%'))
        """)
List<Product> search(@Param("keyword") String keyword);
```

### Can nho

```text
JPQL = entity/field Java.
Native SQL = table/column DB.
```

---

## Cau 10 - Code mini (10d)

### Ban dat: 10/10

### Nhan xet

Code cua ban dat trong tam:

```text
Repository co method search paging.
Service tao Pageable.
Keyword rong thi findAll.
Keyword co thi search theo name.
Map Page<Product> sang PageResponse<ProductResponse>.
```

### Dap an dung

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
}
```

```java
@Transactional(readOnly = true)
public PageResponse<ProductResponse> getProducts(int page, int size, String keyword) {
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

### Can nho

```text
Cau 10 la cau xac nhan ban da hieu bai 02.
Neu viet duoc ham nay la pass query/paging.
```

---

## Ket luan

Ban da dat **Bai 02 Query Va Paging**.

Phan can on nhe truoc khi qua bai tiep theo:

```text
JPQL khong dung table/column.
JPQL dung entity/field Java.
Search list rong tra 200 + content [].
```

Buoc tiep theo:

```text
M1-3 Bai 03 - @Transactional
```
