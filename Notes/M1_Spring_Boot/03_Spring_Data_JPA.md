# Module 1-3 - Spring Data JPA

> Mục tiêu: biến `Repository` từ chỗ tự quản lý dữ liệu bằng `Map` thành repository thật làm việc với database, nhưng vẫn giữ tư duy M1-2: **Controller hiểu HTTP, Service hiểu nghiệp vụ, Repository hiểu dữ liệu**.

## 1. M1-3 nối từ M1-2 như thế nào?

Ở M1-2, bạn học REST MVC:

```text
Client
-> Controller
-> Service
-> Repository
-> Map/in-memory data
```

Ở M1-3, luồng trên gần như giữ nguyên, chỉ thay phần cuối:

```text
Client
-> Controller
-> Service
-> JpaRepository
-> Hibernate/JPA
-> Database
```

Điểm quan trọng:

```text
Controller không cần biết database.
Service không nên viết SQL.
Repository là cổng nói chuyện với database.
JPA/Hibernate là máy dịch object Java thành row/table.
```

Nói ngắn:

```text
M1-2: Repository tự viết bằng Map.
M1-3: Repository kế thừa JpaRepository, Spring Data JPA tự tạo implementation.
```

## 2. Vấn đề JPA giải quyết là gì?

Không có JPA, muốn lưu Product xuống database bạn phải tự viết:

```sql
INSERT INTO products (sku, name, price, category_id)
VALUES (?, ?, ?, ?);
```

Muốn đọc:

```sql
SELECT id, sku, name, price, category_id
FROM products
WHERE id = ?;
```

Sau đó bạn còn phải tự map:

```text
ResultSet -> Product object
```

JPA giúp bạn làm phần object-relational mapping:

```text
Product object <-> products table
Category object <-> categories table
```

Hibernate là implementation phổ biến của JPA. Trong Spring Boot, khi dùng `spring-boot-starter-data-jpa`, thường bạn đang dùng:

```text
Spring Data JPA -> JPA API -> Hibernate -> JDBC -> Database
```

## 3. Entity là gì?

Entity là Java object đại diện cho một dòng dữ liệu có thể lưu trong database.

Ví dụ bảng:

```text
products
id | sku    | name     | price   | category_id
1  | KB-001 | Keyboard | 1500000 | 10
```

Entity Java:

```java
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
}
```

Nhớ kỹ:

```text
Table nằm trong database.
Entity là object Java trong app.
JPA/Hibernate map entity với table.
```

## 4. Các annotation entity cơ bản

### `@Entity`

Đánh dấu class là JPA entity.

```java
@Entity
public class Product {}
```

Khi app start, Hibernate sẽ scan entity và hiểu class này có thể map với table.

### `@Table`

Chỉ định tên table.

```java
@Table(name = "products")
```

Nếu không ghi, Hibernate có thể tự suy ra tên từ class, nhưng project thật nên ghi rõ để dễ đọc.

### `@Id`

Đánh dấu primary key.

```java
@Id
private Long id;
```

Mỗi entity bắt buộc nên có id.

### `@GeneratedValue`

Nói id được database/app sinh tự động.

```java
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

`IDENTITY` thường hiểu là database tự tăng id.

### `@Column`

Cấu hình column.

```java
@Column(nullable = false, unique = true, length = 100)
private String sku;
```

Ý nghĩa:

```text
nullable = false -> không cho null
unique = true    -> không cho trùng
length = 100     -> độ dài column string
name = "..."     -> tên column nếu khác field
```

## 5. Product/Category hiện tại của bạn đổi sang JPA ra sao?

Hiện tại `Product` của bạn đang là model thường:

```java
public class Product {
    Long id;
    String sku;
    String name;
    BigDecimal price;
    Long categoryId;
}
```

Sang JPA, nên đổi tư duy từ:

```text
Product giữ categoryId
```

sang:

```text
Product giữ Category object
```

Vì database quan hệ sẽ có:

```text
categories
id | name

products
id | sku | name | price | category_id
```

Trong Java:

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

```java
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

Điểm chuyển đổi quan trọng:

```text
DTO request vẫn gửi categoryId.
Service dùng categoryId để tìm Category entity.
Product entity lưu Category object.
Response DTO có thể trả categoryId/categoryName.
```

Luồng tạo Product:

```text
CreateProductRequest(categoryId = 10)
-> Service gọi categoryRepository.findById(10)
-> lấy Category entity
-> tạo Product có category = category
-> productRepository.save(product)
```

## 6. Relationship: `@ManyToOne`

Một Category có nhiều Product.

Một Product thuộc một Category.

```text
Category 1 ---- * Product
```

Trong Product:

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_id", nullable = false)
private Category category;
```

Ý nghĩa:

```text
@ManyToOne:
Nhiều Product trỏ về một Category.

@JoinColumn(name = "category_id"):
Trong bảng products có cột category_id.

fetch = FetchType.LAZY:
Khi lấy Product, chưa load Category ngay, cần thì mới load.
```

Ở M1-3, chỉ cần nắm chiều `Product -> Category` trước. Chưa cần vội làm bidirectional:

```java
@OneToMany(mappedBy = "category")
private List<Product> products;
```

Bidirectional dễ gây rối JSON, N+1 và cascade nếu chưa chắc.

## 7. Repository cũ vs JpaRepository

Repository tự viết bằng Map:

```java
public interface ProductRepository {
    Product save(Product product);
    Optional<Product> findById(Long id);
    List<Product> findAll();
    boolean existsBySku(String sku);
    void deleteById(Long id);
}
```

Với Spring Data JPA:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
    Optional<Product> findBySku(String sku);
}
```

Bạn không viết implementation.

Spring Data JPA tự tạo bean repository lúc app start.

```text
ProductRepository interface
-> Spring Data đọc method
-> tạo proxy implementation
-> inject vào Service
```

## 8. `JpaRepository` vs `CrudRepository` vs `PagingAndSortingRepository`

### `CrudRepository`

Có CRUD cơ bản:

```text
save
findById
findAll
deleteById
existsById
```

### `PagingAndSortingRepository`

Thêm paging/sorting:

```text
findAll(Pageable pageable)
findAll(Sort sort)
```

### `JpaRepository`

Bao gồm CRUD + paging/sorting + một số tiện ích JPA:

```text
flush
saveAndFlush
deleteAllInBatch
```

Trong Spring Boot project thực tế, thường dùng:

```java
JpaRepository<Entity, IdType>
```

Với `shopcore`:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {}
public interface CategoryRepository extends JpaRepository<Category, Long> {}
```

## 9. Derived query methods

Spring Data JPA có thể tự hiểu tên method và sinh query.

Ví dụ:

```java
boolean existsBySku(String sku);
Optional<Product> findBySku(String sku);
List<Product> findByNameContainingIgnoreCase(String keyword);
Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
```

Spring đọc tên method:

```text
existsBySku
-> SELECT COUNT(...) WHERE sku = ?

findByNameContainingIgnoreCase
-> WHERE lower(name) LIKE lower('%keyword%')
```

Các pattern hay dùng:

```text
findByXxx
existsByXxx
deleteByXxx
countByXxx
findByXxxAndYyy
findByXxxOrYyy
findByNameContainingIgnoreCase
findByPriceGreaterThan
findByCreatedAtBetween
```

Không nên nhồi tên method quá dài.

Nếu method dài kiểu:

```java
findByNameContainingIgnoreCaseAndCategoryIdAndPriceGreaterThanAndStatus(...)
```

thì cân nhắc dùng `@Query` hoặc sau này Specification.

## 10. `@Query`: JPQL vs native SQL

### JPQL

JPQL query trên entity và field Java, không query trực tiếp table/column.

```java
@Query("""
        select p
        from Product p
        where lower(p.name) like lower(concat('%', :keyword, '%'))
        """)
Page<Product> searchByName(@Param("keyword") String keyword, Pageable pageable);
```

Ở đây:

```text
Product là entity class.
p.name là field Java.
```

Không phải:

```text
products table
product_name column
```

### Native SQL

Native query viết SQL thật theo table/column.

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

Ở đây:

```text
products là table.
name là column.
```

### Khi nào dùng gì?

```text
Derived query:
Query đơn giản, đọc tên method là hiểu.

JPQL:
Query vừa/phức tạp, vẫn muốn làm theo entity.

Native SQL:
Cần SQL đặc thù database, performance, function riêng, query phức tạp.
```

## 11. Pageable và Page trong JPA

Ở M1-2 dùng Map, bạn tự tính:

```text
fromIndex = page * size
toIndex = min(...)
```

Sang JPA, database sẽ làm paging.

Controller:

```java
@GetMapping
public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size) {
    return ResponseEntity.ok(ApiResponse.success(productService.getProducts(page, size)));
}
```

Service:

```java
public PageResponse<ProductResponse> getProducts(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

    Page<Product> productPage = productRepository.findAll(pageable);

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

Repository:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {}
```

Điểm khác M1-2:

```text
M1-2 Map:
Repository trả List, Service tự cắt list.

M1-3 JPA:
Repository trả Page, database/JPA xử lý limit/offset.
```

## 12. Transaction là gì?

Transaction là một nhóm thao tác database phải thành công hoặc thất bại cùng nhau.

Ví dụ tạo order:

```text
1. Tạo Order
2. Tạo OrderItem
3. Trừ stock
4. Tạo Payment record
```

Nếu bước 3 lỗi mà bước 1, 2 đã lưu thì dữ liệu hỏng.

Transaction giúp:

```text
Tất cả thành công -> commit.
Có lỗi -> rollback.
```

Trong Spring:

```java
@Transactional
public ProductResponse create(CreateProductRequest request) {
    ...
}
```

Thường đặt `@Transactional` ở Service, không đặt lung tung ở Controller.

Vì Service là nơi mô tả một use case nghiệp vụ.

## 13. Rollback rules

Mặc định Spring rollback với unchecked exception:

```text
RuntimeException
Error
```

`AppException extends RuntimeException`, nên nếu Service throw `AppException`, transaction sẽ rollback.

Ví dụ:

```java
@Transactional
public ProductResponse create(CreateProductRequest request) {
    if (productRepository.existsBySku(request.getSku())) {
        throw new AppException(ErrorCode.DUPLICATE_SKU);
    }

    Product saved = productRepository.save(product);
    return toResponse(saved);
}
```

Nếu `DUPLICATE_SKU` xảy ra trước save thì không có gì để rollback.

Nếu lỗi xảy ra sau vài thao tác save, transaction rollback các thay đổi trong transaction đó.

## 14. Propagation là gì?

Propagation trả lời câu hỏi:

```text
Nếu method đang chạy trong một transaction rồi gọi method khác cũng @Transactional,
method kia dùng transaction cũ hay tạo transaction mới?
```

Quan trọng nhất ở M1-3:

```text
REQUIRED là mặc định.
Nếu đã có transaction thì dùng transaction hiện tại.
Nếu chưa có thì tạo transaction mới.
```

Ví dụ:

```java
@Transactional
public void createOrder() {
    saveOrder();
    saveOrderItems();
}
```

Nếu `saveOrderItems()` cũng `@Transactional(REQUIRED)`, nó vẫn tham gia transaction của `createOrder()`.

Các loại khác chỉ cần nhận diện:

```text
REQUIRES_NEW:
Tạm dừng transaction cũ, tạo transaction mới.

SUPPORTS:
Có transaction thì tham gia, không có thì chạy không transaction.

MANDATORY:
Bắt buộc phải có transaction sẵn.

NEVER:
Không được chạy trong transaction.
```

M1-3 chỉ cần chắc `REQUIRED`.

## 15. Isolation là gì?

Isolation nói về mức độ transaction này nhìn thấy dữ liệu của transaction khác.

Vấn đề có thể xảy ra:

```text
Dirty read:
Đọc dữ liệu chưa commit của transaction khác.

Non-repeatable read:
Cùng một row, đọc lần 1 và lần 2 ra khác nhau vì transaction khác đã commit update.

Phantom read:
Cùng một query range, lần 2 thấy thêm/mất row vì transaction khác insert/delete.
```

Các mức phổ biến:

```text
READ_COMMITTED:
Chỉ đọc dữ liệu đã commit. Hay dùng.

REPEATABLE_READ:
Cùng một row đọc lại giữ ổn định hơn.

SERIALIZABLE:
Chặt nhất, chậm nhất.
```

Ở giai đoạn này:

```text
Biết khái niệm là đủ.
Không tự đổi isolation nếu chưa có lý do thật.
```

## 16. Lazy vs Eager

Giả sử Product có Category.

### Eager

```text
Lấy Product là lấy Category ngay.
```

Ưu:

```text
Dễ hiểu.
Ít gặp lỗi lazy khi code nhỏ.
```

Nhược:

```text
Dễ load thừa dữ liệu.
Dễ gây query nặng.
```

### Lazy

```text
Lấy Product trước.
Khi nào gọi product.getCategory() thì mới load Category.
```

Ưu:

```text
Không load thừa nếu không cần.
Phù hợp project thật hơn.
```

Nhược:

```text
Dễ gặp LazyInitializationException nếu truy cập ngoài transaction/session.
Dễ gây N+1 nếu loop nhiều entity rồi gọi relation.
```

Khuyến nghị cho `@ManyToOne` trong project học:

```java
@ManyToOne(fetch = FetchType.LAZY)
private Category category;
```

Nhưng khi trả response cần category name, phải hiểu query đang load thêm gì.

## 17. N+1 problem là gì?

Ví dụ bạn lấy 10 Product:

```java
List<Product> products = productRepository.findAll();
```

Sau đó map response:

```java
products.stream()
        .map(product -> product.getCategory().getName())
        .toList();
```

Nếu `category` là lazy, Hibernate có thể chạy:

```text
1 query lấy 10 products
10 query lấy category cho từng product
```

Tổng:

```text
1 + N queries
```

Đó là N+1.

M1-3 chỉ cần biết phát hiện bằng SQL log.

Ví dụ log:

```text
select * from products;
select * from categories where id = ?;
select * from categories where id = ?;
select * from categories where id = ?;
...
```

Fix sâu để M2-4, nhưng nhận diện ngay từ bây giờ.

Cách fix thường gặp sau này:

```text
join fetch
@EntityGraph
DTO projection
batch size
```

## 18. Auditing

Auditing giúp tự ghi:

```text
createdAt
updatedAt
createdBy
updatedBy
```

Ví dụ entity:

```java
@CreatedDate
@Column(nullable = false, updatable = false)
private Instant createdAt;

@LastModifiedDate
@Column(nullable = false)
private Instant updatedAt;
```

Cần bật:

```java
@EnableJpaAuditing
@SpringBootApplication
public class ShopcoreApplication {}
```

Entity cần listener:

```java
@EntityListeners(AuditingEntityListener.class)
```

Thường tạo base class:

```java
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditableEntity {
    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
```

Rồi:

```java
public class Product extends AuditableEntity {}
```

## 19. Service CRUD khi dùng JPA

Tạo Product:

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

Lấy Product:

```java
@Transactional(readOnly = true)
public ProductResponse getById(Long id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

    return toResponse(product);
}
```

Cập nhật Product:

```java
@Transactional
public ProductResponse update(Long id, UpdateProductRequest request) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

    Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

    product.setName(request.getName());
    product.setPrice(request.getPrice());
    product.setCategory(category);

    return toResponse(product);
}
```

Chú ý:

```text
Trong transaction, entity đang managed.
Bạn set field xong, Hibernate tự dirty checking.
Không bắt buộc gọi save lại trong mọi case update.
```

Nhưng lúc mới học, gọi `save(product)` sau update vẫn dễ hiểu. Sau đó học sâu sẽ hiểu dirty checking.

## 20. Dirty checking là gì?

Khi entity được lấy ra trong transaction:

```java
Product product = productRepository.findById(id).orElseThrow(...);
```

Hibernate quản lý object đó.

Bạn đổi field:

```java
product.setName("New Name");
```

Khi transaction commit, Hibernate so sánh entity hiện tại với snapshot ban đầu.

Nếu khác, Hibernate tự tạo SQL:

```sql
update products set name = ? where id = ?;
```

Đó là dirty checking.

Nhớ:

```text
Managed entity + transaction + thay đổi field -> Hibernate tự update khi commit.
```

## 21. Mapping entity sang response DTO

Không trả entity trực tiếp ra API.

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

Cẩn thận:

```text
product.getCategory().getName()
```

Nếu category là lazy, dòng này có thể trigger query lấy Category.

Đây là chỗ liên quan N+1.

## 22. Cấu hình dependency cần cho M1-3

Trong `pom.xml`, cần thêm Spring Data JPA và database driver.

Nếu học nhanh bằng H2:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

Nếu dùng PostgreSQL:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

Giai đoạn học M1-3 có thể dùng H2 trước để hiểu JPA, sau đó qua M2 dùng PostgreSQL thật.

## 23. Cấu hình `application.yml` mẫu

H2:

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

Ý nghĩa:

```text
datasource:
Khai báo database app sẽ kết nối.

ddl-auto: update:
Hibernate tự cập nhật schema theo entity. Dùng học được, production không nên lạm dụng.

show-sql: true:
In SQL ra log để học JPA và phát hiện N+1.
```

## 24. `ddl-auto` là gì?

`ddl-auto` điều khiển Hibernate xử lý schema database thế nào.

```text
none:
Không đụng schema.

validate:
Kiểm tra entity có khớp schema không, không sửa DB.

update:
Cố tự cập nhật schema theo entity.

create:
Xóa schema cũ và tạo lại khi start.

create-drop:
Tạo khi start, drop khi app stop.
```

Giai đoạn học:

```text
H2/local demo: update hoặc create-drop.
Project nghiêm túc/production: dùng Flyway/Liquibase, không dựa vào update.
```

## 25. Các lỗi thường gặp

### Lỗi 1: Quên no-args constructor

JPA cần constructor không tham số.

Với Lombok:

```java
@NoArgsConstructor(access = AccessLevel.PROTECTED)
```

### Lỗi 2: Dùng `@Data` bừa bãi trên entity

Không khuyến khích:

```java
@Data
@Entity
public class Product {}
```

Vì `@Data` sinh `toString`, `equals`, `hashCode` có thể đụng lazy relation hoặc vòng lặp.

Nên dùng:

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
```

Và cẩn thận với relation.

### Lỗi 3: Trả entity trực tiếp

Không nên:

```java
public Product getById(...)
```

Nên:

```java
public ProductResponse getById(...)
```

### Lỗi 4: Dùng `Long categoryId` trong entity Product

Có thể dùng tạm, nhưng học JPA quan hệ thì nên dùng:

```java
private Category category;
```

với:

```java
@ManyToOne
@JoinColumn(name = "category_id")
```

### Lỗi 5: Không biết query nào đang chạy

Bật SQL log:

```yaml
spring:
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

Sau đó quan sát log khi gọi API.

## 26. Bài thực hành cho `shopcore`

Không tạo project mới. Làm trong `shopcore`.

### Bước 1: Thêm dependency

Thêm:

```text
spring-boot-starter-data-jpa
h2 runtime
```

### Bước 2: Biến model thành entity

`Category`:

```text
@Entity
@Table(name = "categories")
id, name
```

`Product`:

```text
@Entity
@Table(name = "products")
id, sku, name, price, category
```

### Bước 3: Tạo repository

```java
public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String name);
}
```

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
}
```

### Bước 4: Service CRUD

Category:

```text
create
getById
getAll pageable
update
delete
```

Product:

```text
create
getById
getAll pageable
update
delete
search by keyword/category
```

### Bước 5: Query

Cần có:

```text
Derived query: existsBySku, existsByName
JPQL query: search product by keyword
Pageable: list product/category
```

### Bước 6: Transaction

Service method write:

```java
@Transactional
```

Service method read:

```java
@Transactional(readOnly = true)
```

### Bước 7: N+1 log

Bật SQL log, gọi list products có category name.

Quan sát:

```text
1 query products?
N query categories?
```

Ghi lại trong note/lab.

## 27. Cách trả lời thi M1-3

Nếu hỏi: "Spring Data JPA làm gì?"

```text
Spring Data JPA giúp tạo repository implementation tự động từ interface.
Repository kế thừa JpaRepository nên có sẵn CRUD, paging, sorting.
JPA/Hibernate map entity Java với table database và chuyển thao tác object thành SQL.
```

Nếu hỏi: "Entity khác DTO thế nào?"

```text
Entity là object nội bộ được JPA quản lý và map với table.
DTO là object qua biên API, dùng để nhận request hoặc trả response.
Không nên trả entity trực tiếp vì dễ lộ field, gây phụ thuộc schema và dính lazy relation.
```

Nếu hỏi: "`@Transactional` để làm gì?"

```text
@Transactional gom nhiều thao tác database thành một đơn vị.
Nếu thành công thì commit, nếu RuntimeException/AppException xảy ra thì rollback.
Thường đặt ở Service vì Service đại diện cho use case nghiệp vụ.
```

Nếu hỏi: "Lazy và Eager khác nhau?"

```text
Eager load relation ngay khi lấy entity chính.
Lazy chỉ load relation khi thật sự truy cập.
Lazy giúp tránh load thừa nhưng có thể gây LazyInitializationException hoặc N+1 nếu không hiểu query.
```

Nếu hỏi: "N+1 là gì?"

```text
N+1 là khi lấy danh sách N entity bằng 1 query, sau đó mỗi entity lại trigger thêm 1 query để lấy relation.
Tổng thành 1 + N query. Có thể phát hiện bằng Hibernate SQL log.
```

## 28. Checklist trước khi thi

- [ ] Giải thích được `Entity` là object Java map với table.
- [ ] Biết dùng `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`.
- [ ] Biết tạo `JpaRepository<Product, Long>`.
- [ ] Phân biệt `JpaRepository`, `CrudRepository`, `PagingAndSortingRepository`.
- [ ] Viết được derived query như `existsBySku`.
- [ ] Phân biệt JPQL query entity với native SQL query table.
- [ ] Dùng được `Pageable`, `Page<T>`, `PageRequest`.
- [ ] Hiểu `@Transactional`: commit, rollback, đặt ở Service.
- [ ] Biết `REQUIRED` là propagation mặc định.
- [ ] Nhận diện được Lazy/Eager.
- [ ] Nhận diện được N+1 qua SQL log.
- [ ] Biết auditing cơ bản với `@CreatedDate`, `@LastModifiedDate`.

## 29. Tóm tắt cần nhớ

```text
JPA biến object Java thành dữ liệu database và ngược lại.
Hibernate là implementation phổ biến của JPA.
Spring Data JPA tạo repository implementation từ interface.
JpaRepository cho CRUD + paging + sorting.
Entity dùng trong app/database layer.
DTO dùng ở API boundary.
@Transactional đặt ở Service để commit/rollback một use case.
Lazy giúp không load thừa nhưng dễ N+1 nếu loop relation.
```

> Nếu M1-2 là hiểu request vào Controller thế nào, thì M1-3 là hiểu Service gọi Repository xong dữ liệu thật được lưu/đọc khỏi database thế nào.
