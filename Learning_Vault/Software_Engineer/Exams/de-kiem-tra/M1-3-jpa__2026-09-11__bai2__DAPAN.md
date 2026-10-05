# Dap an M1-3 JPA - Bai 02 Query Va Paging

> Tong diem tho: 43 diem.  
> Normalize: `diem tho / 43 * 100`.

---

## Cau 1 - 3d

Y dung:

- Derived query la method repository ma Spring Data JPA doc ten method de tao query.
- `existsBySku` hoat dong vi `exists` la hanh dong, `BySku` tro toi field `sku` trong entity.
- Phan sau `By` phai khop voi field Java entity.

## Cau 2 - 3d

Vi du:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);

    Optional<Product> findBySku(String sku);

    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
}
```

## Cau 3 - 3d

Y dung:

- Product co field `Category category`.
- Category co field `id`.
- Spring Data JPA hieu `CategoryId` la nested property `category.id`.
- Co the viet ro hon la `findByCategory_Id(...)`.

## Cau 4 - 3d

Y dung:

- JPQL query tren entity va field Java.
- Trong JPQL, `Product` la entity class, `p.name` la field Java.
- Native SQL query tren table va column database.
- Trong native SQL, `products` la table, `name` la column.

## Cau 5 - 3d

Vi du:

```java
@Query("""
        select p
        from Product p
        where lower(p.name) like lower(concat('%', :keyword, '%'))
        """)
Page<Product> searchByName(@Param("keyword") String keyword, Pageable pageable);
```

## Cau 6 - 3d

Y dung:

- `Pageable` mo ta request phan trang: page, size, sort.
- `Page<Product>` la ket qua phan trang tu repository/database.
- Metadata hay dung: `getContent`, `getNumber`, `getSize`, `getTotalElements`, `getTotalPages`, `isFirst`, `isLast`.

## Cau 7 - 5d

Y dung:

```text
Controller nhan page, size, keyword tu query param.
Controller goi Service.
Service validate page/size.
Service tao Pageable bang PageRequest.of.
Service goi repository findAll hoac search method.
Repository tra Page<Product>.
Service lay content va map Product -> ProductResponse.
Service tao PageResponse<ProductResponse>.
Controller tra 200 OK.
```

## Cau 8 - 5d

Y dung:

```text
content = productPage.getContent().stream().map(toResponse).toList()
page = productPage.getNumber()
size = productPage.getSize()
totalElements = productPage.getTotalElements()
totalPages = productPage.getTotalPages()
```

Repository tra entity page, API tra DTO page.

## Cau 9 - 5d

Sai:

- JPQL khong dung table `products`, phai dung entity `Product`.
- JPQL khong dung column `product_name`, phai dung field Java, vi du `name`.
- Neu LIKE keyword thi can concat `%`.

Sua:

```java
@Query("""
        select p
        from Product p
        where lower(p.name) like lower(concat('%', :keyword, '%'))
        """)
List<Product> search(@Param("keyword") String keyword);
```

## Cau 10 - 10d

Vi du:

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
