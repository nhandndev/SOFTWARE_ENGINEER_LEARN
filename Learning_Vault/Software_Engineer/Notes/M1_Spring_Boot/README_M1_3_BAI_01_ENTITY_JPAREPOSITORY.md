# M1-3 Bai 01 - Entity Va JpaRepository

> Muc tieu bai 01: hieu cach Spring Data JPA thay the `Map Repository` cua M1-2 bang repository that noi chuyen voi database. Sau bai nay, ban can tu giai thich duoc: **Entity la gi, JpaRepository tao implementation o dau, va luong save/find chay nhu the nao**.

---

## 1. Bai nay nam o dau trong lo trinh?

O M1-2, ban da nam:

```text
Client
-> FilterChain
-> DispatcherServlet
-> Controller
-> Service
-> Repository
-> Map
```

O M1-3, ta giu nguyen Controller/Service, nhung thay kho du lieu:

```text
Client
-> FilterChain
-> DispatcherServlet
-> Controller
-> Service
-> JpaRepository
-> Hibernate/JPA
-> JDBC
-> Database
```

Dieu thay doi lon nhat:

```text
M1-2:
Repository la interface/implementation minh tu viet, data nam trong Map.

M1-3:
Repository la interface extends JpaRepository, Spring Data JPA tu tao implementation.
Data nam trong database.
```

Ban co the nho:

```text
M1-2 hoc API di den Service.
M1-3 hoc Service di xuong database.
```

---

## 2. Van de truoc khi co JPA

Neu khong co JPA, de tao Product ban phai tu lam nhieu viec:

```text
1. Viet SQL INSERT.
2. Mo connection database.
3. Set parameter vao PreparedStatement.
4. Execute SQL.
5. Lay generated id.
6. Map row/result ve Java object.
7. Xu ly transaction/rollback.
```

Vi du SQL:

```sql
insert into products (sku, name, price, category_id)
values (?, ?, ?, ?);
```

Khi doc:

```sql
select id, sku, name, price, category_id
from products
where id = ?;
```

Sau do lai map:

```text
ResultSet row -> Product object
```

JPA/Hibernate sinh ra de giam cong lap lai nay.

---

## 3. JPA, Hibernate, Spring Data JPA khac nhau gi?

### JPA

JPA la specification, tuc la bo chuan/quy tac.

No dinh nghia:

```text
@Entity la gi
@Id la gi
@ManyToOne la gi
EntityManager lam gi
```

Nhung JPA khong phai thu truc tiep chay logic.

### Hibernate

Hibernate la implementation pho bien cua JPA.

No lam viec that:

```text
Doc annotation tren entity
Map object Java voi table
Sinh SQL
Quan ly entity trong persistence context
Dirty checking
Lazy loading
```

### Spring Data JPA

Spring Data JPA dung tren JPA/Hibernate de tao repository tien hon.

No giup ban viet:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
}
```

Va khong can tu viet class implementation.

Luong ben duoi:

```text
ProductRepository method
-> Spring Data JPA proxy
-> Hibernate/JPA
-> JDBC
-> Database
```

---

## 4. Entity la gi?

Entity la object Java duoc JPA quan ly va map voi table trong database.

Dung hon la:

```text
Entity khong nam trong database.
Entity la object Java trong app.
Database luu table/row.
JPA/Hibernate map entity voi table/row.
```

Vi du:

```text
Database table: categories

id | name
1  | Keyboard
2  | Mouse
```

Java entity:

```java
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
}
```

Moi row trong table co the duoc doc thanh mot object:

```text
row id=1, name=Keyboard -> new Category(id=1, name=Keyboard)
```

---

## 5. Entity khac DTO the nao?

Tu M1-2 ban da co DTO:

```text
CreateProductRequest
ProductResponse
ApiResponse<ProductResponse>
```

Sang M1-3 van giu nguyen tu duy do.

```text
DTO:
Dung o bien API.
Nhan JSON request hoac tra JSON response.

Entity:
Dung o ben trong app/database layer.
Duoc JPA/Hibernate quan ly.
Map voi table database.
```

Luong tao Product:

```text
Client JSON
-> CreateProductRequest
-> Service
-> Product entity
-> ProductRepository.save(product)
-> Hibernate INSERT vao database
-> Product entity co id
-> ProductResponse
-> ApiResponse
-> JSON response
```

Khong nen tra entity truc tiep ra client vi:

```text
Co the lo field noi bo.
API bi dinh chat vao schema database.
Relation lazy co the gay loi hoac N+1.
Relation 2 chieu co the gay JSON lap vo han.
Client co the thay field khong nen thay.
```

---

## 6. Annotation entity co ban

### `@Entity`

Bao cho JPA:

```text
Class nay la entity, can duoc quan ly va map xuong database.
```

```java
@Entity
public class Product {}
```

### `@Table`

Dat ten table.

```java
@Table(name = "products")
```

Nen ghi ro de code de doc, khong phu thuoc vao cach Hibernate tu dat ten.

### `@Id`

Danh dau primary key.

```java
@Id
private Long id;
```

Entity nen co id ro rang.

### `@GeneratedValue`

Bao cach sinh id.

```java
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

Voi `IDENTITY`, database thuong tu tang id.

### `@Column`

Cau hinh column.

```java
@Column(nullable = false, unique = true, length = 100)
private String sku;
```

Y nghia:

```text
nullable = false -> cot khong duoc null
unique = true    -> gia tri khong duoc trung
length = 100     -> gioi han do dai
name = "..."     -> ten cot neu khac ten field
```

---

## 7. Entity Product va Category cho shopcore

### Category

```java
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
}
```

### Product

Ban dang quen kieu:

```java
private Long categoryId;
```

Nhung khi hoc JPA relationship, nen chuyen sang:

```java
private Category category;
```

Full y tuong:

```java
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
```

Database van luu `category_id`.

Java entity thi giu `Category category`.

```text
Java: product.getCategory()
DB: products.category_id
```

---

## 8. `@ManyToOne` va `@JoinColumn`

Quan he:

```text
1 Category co nhieu Product.
1 Product thuoc 1 Category.
```

Nen trong Product:

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_id", nullable = false)
private Category category;
```

Giai thich:

```text
@ManyToOne:
Nhieu Product cung tro ve mot Category.

@JoinColumn(name = "category_id"):
Table products co cot category_id de noi sang categories.id.

fetch = FetchType.LAZY:
Lay Product truoc, khi nao can Category thi moi load Category.
```

O bai 01, chi can lam mot chieu:

```text
Product -> Category
```

Chua can:

```java
private List<Product> products;
```

trong Category, vi de gay roi relation 2 chieu.

---

## 9. JpaRepository la gi?

Thay vi tu viet:

```java
public interface ProductRepository {
    Product save(Product product);
    Optional<Product> findById(Long id);
    List<Product> findAll();
}
```

Ban viet:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
}
```

Y nghia:

```text
Product la entity repository quan ly.
Long la kieu cua id.
```

JpaRepository cho san:

```text
save(entity)
findById(id)
findAll()
deleteById(id)
existsById(id)
count()
findAll(Pageable)
findAll(Sort)
```

Spring Data JPA tu tao implementation khi app start.

```text
Interface ProductRepository
-> Spring tao proxy bean
-> Service inject ProductRepository
-> Goi method repository
-> Spring Data/Hibernate chay SQL
```

---

## 10. JpaRepository vs CrudRepository vs PagingAndSortingRepository

`CrudRepository`:

```text
CRUD co ban: save, findById, findAll, deleteById, existsById.
```

`PagingAndSortingRepository`:

```text
Them paging/sorting: findAll(Pageable), findAll(Sort).
```

`JpaRepository`:

```text
Co CRUD + paging/sorting + cac tien ich JPA.
Thuong dung nhat trong Spring Boot project.
```

Trong `shopcore`, cu dung:

```java
JpaRepository<Product, Long>
JpaRepository<Category, Long>
```

---

## 11. Derived query method dau tien

Spring Data JPA doc ten method de tao query.

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
    Optional<Product> findBySku(String sku);
}
```

`existsBySku` co nghia:

```text
Kiem tra co Product nao co field sku bang gia tri truyen vao khong.
```

Tuong duong y tuong SQL:

```sql
select count(*)
from products
where sku = ?;
```

Repository Category:

```java
public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String name);
}
```

Can nho:

```text
Ten sau By phai khop field trong entity, khong phai tuy tien dat.
```

Neu entity co:

```java
private String sku;
```

thi dung:

```java
existsBySku
```

---

## 12. Luong save Product bang JPA

Request:

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

Luong:

```text
1. Jackson tao CreateProductRequest.
2. Controller goi productService.create(request).
3. Service check productRepository.existsBySku(request.getSku()).
4. Service tim Category bang categoryRepository.findById(request.getCategoryId()).
5. Neu khong co Category -> AppException(CATEGORY_NOT_FOUND).
6. Service tao Product entity, set category = category tim duoc.
7. Service goi productRepository.save(product).
8. Spring Data JPA dua len Hibernate.
9. Hibernate sinh SQL insert vao products.
10. Database luu row va sinh id.
11. Hibernate gan id lai vao Product entity.
12. Service map Product -> ProductResponse.
13. Controller tra 201 Created.
```

Code Service y tuong:

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

---

## 13. Luong findById bang JPA

Request:

```http
GET /api/products/10
```

Luong:

```text
1. Controller nhan id = 10.
2. Controller goi productService.getById(10).
3. Service goi productRepository.findById(10).
4. Spring Data JPA/Hibernate sinh SQL select.
5. Database tra row neu co.
6. Hibernate map row thanh Product entity.
7. Repository tra Optional<Product>.
8. Neu Optional.empty -> Service throw AppException(PRODUCT_NOT_FOUND).
9. Neu co Product -> Service map ProductResponse.
10. Controller tra 200 OK.
```

Code:

```java
@Transactional(readOnly = true)
public ProductResponse getById(Long id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

    return toResponse(product);
}
```

---

## 14. `@Transactional` trong bai 01 can hieu toi dau?

Bai 01 chua can hoc propagation/isolation sau.

Chi can nho:

```text
@Transactional gom thao tac database trong mot use case.
Neu thanh cong -> commit.
Neu RuntimeException/AppException -> rollback.
Nen dat o Service.
```

Method ghi:

```java
@Transactional
public ProductResponse create(...) {}
```

Method doc:

```java
@Transactional(readOnly = true)
public ProductResponse getById(...) {}
```

Vi `AppException extends RuntimeException`, nen khi Service throw `AppException`, transaction co the rollback.

---

## 15. Dependency can co

Trong `pom.xml` can:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

De hoc nhanh, dung H2:

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

Sau nay qua module database that thi dung PostgreSQL:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

---

## 16. `application.yml` hoc JPA voi H2

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:shopcore
    username: sa
    password:
  h2:
    console:
      enabled: true
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

Y nghia:

```text
datasource.url:
Noi app ket noi database nao.

h2.console.enabled:
Bat man hinh web de xem database H2.

ddl-auto: update:
Hibernate tu tao/cap nhat table theo entity. Dung hoc duoc, production khong nen lam bua.

show-sql + format_sql:
In SQL ra log de thay JPA that su dang chay cau SQL nao.
```

---

## 17. Mapping Product entity sang ProductResponse

Khong tra entity truc tiep.

```java
private ProductResponse toResponse(Product product) {
    return ProductResponse.builder()
            .id(product.getId())
            .sku(product.getSku())
            .name(product.getName())
            .price(product.getPrice())
            .categoryId(product.getCategory().getId())
            .categoryName(product.getCategory().getName())
            .build();
}
```

Can de y:

```text
product.getCategory().getName()
```

Neu `category` la lazy, dong nay co the lam Hibernate query them Category.

Chua can so, chi can bat SQL log va quan sat.

---

## 18. Loi thuong gap bai 01

### Loi 1: Quen `@Entity`

Neu khong co `@Entity`, JPA khong xem class do la entity.

### Loi 2: Quen `@Id`

Entity khong co id thi Hibernate khong biet primary key.

### Loi 3: Dung `Long categoryId` thay vi `Category category`

Khong sai tuyet doi, nhung neu hoc relationship JPA thi nen dung:

```java
@ManyToOne
private Category category;
```

### Loi 4: Repository sai generic

Sai:

```java
JpaRepository<Product, Integer>
```

khi `Product.id` la `Long`.

Dung:

```java
JpaRepository<Product, Long>
```

### Loi 5: Tra entity ra API

Sai:

```java
public Product getById(Long id)
```

Dung:

```java
public ProductResponse getById(Long id)
```

### Loi 6: Tu viet implementation cho JpaRepository

Khong can:

```java
public class ProductRepositoryImpl implements ProductRepository {}
```

Spring Data JPA se tao implementation/proxy cho ban.

---

## 19. Checklist xong bai 01

- [ ] Noi duoc M1-2 Map Repository khac M1-3 JpaRepository o dau.
- [ ] Giai thich duoc entity la object Java map voi table.
- [ ] Phan biet DTO va entity.
- [ ] Biet dung `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`.
- [ ] Biet `@ManyToOne` va `@JoinColumn` co y nghia gi.
- [ ] Tao duoc `ProductRepository extends JpaRepository<Product, Long>`.
- [ ] Hieu Spring Data JPA tu tao implementation repository.
- [ ] Ke duoc luong `save(product)` sinh SQL insert.
- [ ] Ke duoc luong `findById(id)` tra `Optional<Product>`.
- [ ] Biet `@Transactional` bai 01 chi can dat o Service.

---

## 20. Tom tat 10 dong

```text
Entity la object Java duoc JPA map voi table.
DTO la object qua bien API, khong phai entity.
JpaRepository cho san CRUD/paging/sorting.
Spring Data JPA tu tao implementation cho repository interface.
Hibernate la thang sinh SQL va map row <-> object.
Product nen giu Category object thay vi chi giu categoryId khi hoc relationship.
Request DTO co categoryId, Service tim Category entity.
ProductRepository.save(product) co the sinh INSERT.
ProductRepository.findById(id) tra Optional<Product>.
@Transactional nen dat o Service de commit/rollback use case.
```

