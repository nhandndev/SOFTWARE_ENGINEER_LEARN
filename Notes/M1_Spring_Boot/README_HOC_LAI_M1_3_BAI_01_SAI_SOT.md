# Hoc Lai M1-3 Bai 01 - Nhung Cho Sai Va Thieu

> Dua tren bai kiem tra `M1-3-jpa__2026-09-09__bai1.md`. Diem gan nhat: **76/100**. File nay khong hoc lai ca JPA, chi tap trung vao nhung diem dang lam ban mat diem.

---

## 1. Ban da nam duoc gi?

Ban da nam kha on:

```text
Entity la object trong Java application.
DTO la bien API giua client va server.
JpaRepository dung de noi repository voi database.
Hibernate map object voi database va di qua JDBC.
Product thuoc Category thi dung @ManyToOne.
Khong nen tra entity truc tiep ra API.
```

Day la nen tot. Nhung de pass chac bai 01, ban can lam ro hon 4 diem:

```text
1. Entity/table/row noi cho chuan.
2. Annotation JPA dung y nghia.
3. Spring Data JPA moi la thang tao implementation repository.
4. Luong create/findById phai co Optional, AppException, ProductResponse.
```

---

## 2. Entity khong nam trong database

Ban hay noi gan dung:

```text
Entity la object nam trong Java application.
```

Dung. Nhung khi thi nen noi day du hon:

```text
Entity la object Java trong application, duoc JPA/Hibernate quan ly.
Database khong luu entity object.
Database luu table va row.
Hibernate map row trong database thanh entity object trong Java.
Hibernate map entity object trong Java thanh SQL de luu xuong database.
```

### Hinh dung

Database:

```text
products table

id | sku    | name     | price   | category_id
1  | KB-001 | Keyboard | 1500000 | 10
```

Java application:

```java
Product product = Product.builder()
        .id(1L)
        .sku("KB-001")
        .name("Keyboard")
        .price(new BigDecimal("1500000"))
        .category(category)
        .build();
```

Moi quan he:

```text
products table row <-> Product entity object
```

Khong phai:

```text
Product object nam trong database
```

Cau tra loi mau:

```text
Entity la object Java trong application. No duoc JPA/Hibernate map voi table trong database.
Database luu table/row, con Hibernate doc row do va tao entity object tuong ung trong Java.
Khi save entity, Hibernate sinh SQL de insert/update row trong database.
```

---

## 3. Annotation JPA - noi dung dung

### `@Entity`

Ban viet:

```text
@Entity bao cho Java biet no duoc quan ly va bao ve boi persistence context.
```

Y nay bi lech. Nen noi:

```text
@Entity danh dau class la JPA entity.
Hibernate se quan ly object cua class nay trong persistence context khi no duoc load/save trong transaction.
```

Nho:

```text
@Entity khong phai "bao ve".
@Entity la "class nay co the map voi table va duoc JPA quan ly".
```

### `@Table`

Khong nen noi moi:

```text
@Table la bang.
```

Nen noi:

```text
@Table chi dinh entity nay map voi table nao trong database.
```

Vi du:

```java
@Entity
@Table(name = "products")
public class Product {}
```

Nghia la:

```text
Product entity <-> products table
```

### `@Id`

Noi dung:

```text
@Id danh dau field la primary key cua entity.
Field nay tuong ung voi khoa chinh trong table.
```

Vi du:

```java
@Id
private Long id;
```

### `@GeneratedValue`

Noi dung:

```text
@GeneratedValue cau hinh cach sinh gia tri cho primary key.
```

Vi du:

```java
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

Nghia la:

```text
Khi insert row moi, database sinh id.
Hibernate lay id do gan lai vao entity.
```

### `@Column`

Ban viet `@Column` la valid. Y nay chua chuan.

Noi dung dung:

```text
@Column cau hinh mapping field Java voi column database.
nullable = false va unique = true la rang buoc schema/database.
```

Vi du:

```java
@Column(nullable = false, unique = true, length = 100)
private String sku;
```

Nghia la:

```text
sku field <-> sku column
Khong duoc null o database.
Khong duoc trung o database.
Do dai toi da 100.
```

Quan trong:

```text
@Column(nullable = false) khong thay the @NotNull/@NotBlank tren DTO.
```

DTO validation:

```java
@NotBlank
private String sku;
```

Database/schema constraint:

```java
@Column(nullable = false)
private String sku;
```

Hai cai nay bo sung cho nhau.

---

## 4. Ai tao implementation cho JpaRepository?

Ban viet:

```text
JpaRepository la nguoi tao implementation.
```

Sai nhe. Dung la:

```text
Spring Data JPA tao implementation/proxy cho repository interface.
JpaRepository chi la interface cha co san cac method CRUD/paging/sorting.
```

Code:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
}
```

Luc app start:

```text
Spring scan ProductRepository.
Spring Data JPA thay interface extends JpaRepository.
Spring Data JPA tao proxy bean cho ProductRepository.
Service inject ProductRepository.
Khi Service goi productRepository.save(product), proxy do se dua len Hibernate.
Hibernate sinh SQL xuong database.
```

Nho:

```text
JpaRepository = contract/interface cha.
Spring Data JPA = may tao implementation/proxy.
Hibernate = may ORM sinh SQL va map row/object.
Database = noi luu du lieu that.
```

Cau tra loi mau:

```text
Trong JpaRepository<Product, Long>, Product la entity repository quan ly,
Long la kieu cua id/primary key. Spring Data JPA se tao proxy implementation
cho interface nay luc app start, nen minh khong can viet ProductRepositoryImpl.
```

---

## 5. Derived query method - them phan giai thich

Ban da sua method dung:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
    Optional<Product> findBySku(String sku);
}

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String name);
}
```

Con thieu phan giai thich:

```text
Spring Data JPA doc ten method.
Phan sau By phai trung voi ten field trong entity.
existsBySku -> field sku trong Product.
findBySku -> field sku trong Product.
existsByName -> field name trong Category.
```

Neu entity la:

```java
private String sku;
```

thi method:

```java
existsBySku(String sku)
```

Neu entity la:

```java
private String productSku;
```

thi method phai la:

```java
existsByProductSku(String productSku)
```

Nho:

```text
Ten method derived query bam theo ten field Java entity, khong bam theo ten column neu column khac ten.
```

---

## 6. Relationship Product - Category

Ban viet duoc:

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_id", nullable = false)
private Category category;
```

Y nay dung.

Nhung can dien dat gon hon:

```text
Nhieu Product thuoc mot Category.
Trong database, bang products luu cot category_id lam foreign key.
Trong Java, Product entity giu Category object.
@JoinColumn noi field category voi cot category_id.
LAZY nghia la khi lay Product thi chua load Category ngay; khi truy cap product.getCategory() moi co the query them.
```

Dung noi:

```text
category_id co kieu gia tri la Category
```

Vi trong database:

```text
category_id la id, thuong la BIGINT/Long.
```

Con trong Java:

```text
category la Category object.
```

Hinh dung:

```text
Database:
products.category_id = 10

Java:
product.getCategory() -> Category object id = 10
```

`@OneToMany(mappedBy = "category")` o ben Category co the co, nhung bai 01 chua bat buoc.

De tranh roi, cu hoc mot chieu truoc:

```text
Product -> Category
```

---

## 7. Luong create Product bang JPA - phan ban dang yeu

Day la cau ban mat diem nhieu nhat.

De bai:

```text
Client gui CreateProductRequest co categoryId.
Hay ke luong Service tao Product.
```

Ban can ke du:

```text
1. Controller nhan CreateProductRequest.
2. Controller goi productService.create(request).
3. Service check SKU trung bang productRepository.existsBySku(request.getSku()).
4. Neu SKU trung -> throw AppException(DUPLICATE_SKU).
5. Service tim Category bang categoryRepository.findById(request.getCategoryId()).
6. Neu khong co Category -> throw AppException(CATEGORY_NOT_FOUND).
7. Service tao Product entity.
8. Product entity giu Category object, khong chi giu categoryId.
9. Service goi productRepository.save(product).
10. Spring Data JPA/Hibernate sinh SQL INSERT.
11. Database luu row va sinh id.
12. Hibernate gan id vao Product entity da save.
13. Service map saved Product -> ProductResponse.
14. Controller tra 201 Created.
```

### Diem can nho

`ProductResponse` chi co sau khi:

```text
Product entity da duoc tao/save
```

Thong thuong response nen map tu `saved`:

```java
Product saved = productRepository.save(product);
return toResponse(saved);
```

Vi `saved` co id duoc sinh.

### Code mau

```java
@Transactional
public ProductResponse create(CreateProductRequest request) {
    if (productRepository.existsBySku(request.getSku())) {
        throw new AppException(ErrorCode.DUPLICATE_SKU);
    }

    Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

    Product product = Product.builder()
            .sku(request.getSku())
            .name(request.getName())
            .price(request.getPrice())
            .category(category)
            .build();

    Product saved = productRepository.save(product);

    return toResponse(saved);
}
```

### SQL trong dau

Khi goi:

```java
productRepository.save(product)
```

Hibernate co the sinh:

```sql
insert into products (sku, name, price, category_id)
values (?, ?, ?, ?);
```

Sau khi insert:

```text
Database sinh id.
Hibernate gan id lai vao saved Product.
```

---

## 8. Luong findById bang JPA - phan ban con thieu

De bai:

```text
GET /api/products/{id}
```

Can ke dung:

```text
1. Controller nhan id tu @PathVariable.
2. Controller goi productService.getById(id).
3. Service goi productRepository.findById(id).
4. Repository tra Optional<Product>.
5. Neu Optional.empty -> Service throw AppException(PRODUCT_NOT_FOUND).
6. GlobalExceptionHandler bat AppException va tra 404.
7. Neu co Product -> Service map Product entity sang ProductResponse.
8. Controller tra 200 OK.
```

Diem ban thieu la:

```text
findById tra Optional<Product>, khong tra Product truc tiep.
Khong tim thay thi throw AppException(PRODUCT_NOT_FOUND).
Tim thay thi map ProductResponse.
```

### Code mau

```java
@Transactional(readOnly = true)
public ProductResponse getById(Long id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

    return toResponse(product);
}
```

Controller:

```java
@GetMapping("/{id}")
public ResponseEntity<ApiResponse<ProductResponse>> getById(@PathVariable Long id) {
    ProductResponse response = productService.getById(id);
    return ResponseEntity.ok(ApiResponse.success(response));
}
```

Neu khong thay:

```text
productRepository.findById(id) -> Optional.empty()
-> orElseThrow
-> AppException(PRODUCT_NOT_FOUND)
-> GlobalExceptionHandler
-> 404 Not Found
```

Neu thay:

```text
Optional<Product> co value
-> Product entity
-> ProductResponse
-> ApiResponse<ProductResponse>
-> 200 OK
```

---

## 9. Transaction trong bai 01 can nho gi?

Chua can hoc sau propagation/isolation o bai nay.

Chi can nho:

```text
@Transactional dat o Service.
Method ghi du lieu dung @Transactional.
Method doc du lieu dung @Transactional(readOnly = true).
Neu RuntimeException/AppException xay ra thi rollback.
```

Vi:

```java
public class AppException extends RuntimeException
```

nen:

```text
throw AppException -> transaction rollback theo mac dinh cua Spring.
```

Vi du:

```java
@Transactional
public ProductResponse create(CreateProductRequest request) {
    ...
}
```

```java
@Transactional(readOnly = true)
public ProductResponse getById(Long id) {
    ...
}
```

---

## 10. Mau tra loi ngan de thi lai

### Cau: Entity la gi?

```text
Entity la object Java trong application duoc JPA/Hibernate quan ly.
No duoc map voi table trong database. Database luu table/row,
con Hibernate doc row thanh entity object va save entity thanh SQL.
```

### Cau: Ai tao implementation cho repository?

```text
Spring Data JPA tao proxy implementation cho repository interface luc app start.
JpaRepository chi la interface cha cung cap CRUD/paging/sorting.
```

### Cau: Luong create Product?

```text
Controller nhan CreateProductRequest va goi Service.
Service check existsBySku, neu trung thi throw DUPLICATE_SKU.
Service tim Category bang categoryRepository.findById, neu khong co thi throw CATEGORY_NOT_FOUND.
Service tao Product entity co category object roi goi productRepository.save.
Hibernate sinh INSERT, database sinh id, Service map saved Product sang ProductResponse.
Controller tra 201 Created.
```

### Cau: Luong getById?

```text
Controller nhan id va goi Service.
Service goi productRepository.findById(id), repository tra Optional<Product>.
Neu empty thi Service throw AppException(PRODUCT_NOT_FOUND), handler tra 404.
Neu co Product thi Service map sang ProductResponse, Controller tra 200 OK.
```

---

## 11. Checklist on lai truoc khi lam lai

- [ ] Noi duoc entity la object Java, table/row nam trong database.
- [ ] Noi dung `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`.
- [ ] Phan biet DTO validation va database column constraint.
- [ ] Noi dung: Spring Data JPA tao proxy implementation cho repository.
- [ ] Viet dung `existsBySku`, `findBySku`, `existsByName`.
- [ ] Giai thich derived query doc ten field sau `By`.
- [ ] Giai thich Product giu `Category category`, database luu `category_id`.
- [ ] Ke duoc luong create Product bang JPA.
- [ ] Ke duoc luong findById tra `Optional<Product>`.
- [ ] Biet AppException trong Service se di ra GlobalExceptionHandler.

---

## 12. Bai tap tu lam 15 phut

Khong nhin dap an, viet lai 4 doan sau:

1. Giai thich `JpaRepository<Product, Long>`.
2. Giai thich `@ManyToOne + @JoinColumn`.
3. Ke luong `create Product`.
4. Ke luong `getById`.

Neu viet duoc 4 doan nay tron tru, bai 01 coi nhu qua.

