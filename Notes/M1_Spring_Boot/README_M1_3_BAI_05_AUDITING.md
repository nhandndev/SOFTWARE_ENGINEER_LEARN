# M1-3 Bai 05 - Auditing Trong Spring Data JPA

> Muc tieu bai 05: hieu vi sao project can `createdAt`, `updatedAt`, Spring Data JPA tu dien cac field do bang cach nao, va can khai bao nhung annotation nao de auditing chay.

---

## 1. Bai nay nam o dau?

Ban da hoc:

```text
Bai 01: Entity + JpaRepository
Bai 02: Derived query, @Query, Pageable/Page
Bai 03: @Transactional
Bai 04: Lazy/Eager, relationship, N+1
```

Bai 05 noi ve metadata cua row:

```text
Record nay duoc tao luc nao?
Record nay duoc sua lan cuoi luc nao?
Ai tao?
Ai sua?
```

O M1-3, can nam chac 2 field thoi:

```text
createdAt
updatedAt
```

`createdBy`, `updatedBy` de qua security/auth se hoc sau.

---

## 2. Auditing la gi?

Auditing la viec tu dong ghi lai thong tin theo doi thay doi du lieu.

Vi du table `products`:

```text
id | sku    | name     | price | created_at          | updated_at
1  | KB-001 | Keyboard | 100   | 2026-09-12 10:00:00 | 2026-09-12 10:00:00
```

Khi tao Product:

```text
createdAt = thoi diem tao
updatedAt = thoi diem tao
```

Khi sua Product:

```text
createdAt giu nguyen
updatedAt = thoi diem sua moi nhat
```

Noi ngan gon:

```text
Auditing = database record co dau moc thoi gian.
```

---

## 3. Vi sao can auditing?

Trong project that, auditing giup tra loi:

- Product nay tao tu luc nao?
- Don hang nay duoc cap nhat luc nao?
- User vua sua profile luc nao?
- Tai sao data ngoai API khac voi data minh nho?
- Khi debug bug, record bi sua truoc hay sau request nao?

Khong co auditing, ban chi thay data hien tai, khong co dau vet thoi gian.

---

## 4. Neu khong dung auditing thi lam sao?

Ban co the tu set tay:

```java
public ProductResponse create(CreateProductRequest request) {
    Product product = new Product();
    product.setSku(request.getSku());
    product.setName(request.getName());
    product.setCreatedAt(LocalDateTime.now());
    product.setUpdatedAt(LocalDateTime.now());

    Product saved = productRepository.save(product);
    return toResponse(saved);
}
```

Khi update:

```java
public ProductResponse update(Long id, UpdateProductRequest request) {
    Product product = productRepository.findById(id).orElseThrow();
    product.setName(request.getName());
    product.setUpdatedAt(LocalDateTime.now());

    return toResponse(product);
}
```

Van chay, nhung co van de:

- Lap code o moi service.
- De quen set `updatedAt`.
- Moi dev set mot kieu.
- Business code bi lan voi metadata code.

Auditing sinh ra de Spring/JPA tu lam viec nay.

---

## 5. Spring Data JPA auditing lam gi?

Spring Data JPA auditing co the tu dong dien:

```text
@CreatedDate       -> createdAt
@LastModifiedDate  -> updatedAt
```

Khi entity duoc insert:

```text
createdAt duoc set
updatedAt duoc set
```

Khi entity duoc update:

```text
updatedAt duoc set lai
createdAt giu nguyen
```

Ban khong can goi:

```java
LocalDateTime.now()
```

trong service nua.

---

## 6. Can nhung annotation nao?

Can 3 mieng ghep:

```text
1. @EnableJpaAuditing
2. @EntityListeners(AuditingEntityListener.class)
3. @CreatedDate / @LastModifiedDate
```

### 6.1. `@EnableJpaAuditing`

Bat tinh nang auditing trong Spring Boot app.

Thuong dat o main class:

```java
@SpringBootApplication
@EnableJpaAuditing
public class ShopcoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopcoreApplication.class, args);
    }
}
```

Neu thieu `@EnableJpaAuditing`, cac annotation auditing co the khong chay.

### 6.2. `@EntityListeners(AuditingEntityListener.class)`

Gan listener vao entity de nghe su kien insert/update.

```java
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Product {
    // fields
}
```

Y nghia:

```text
Khi entity sap duoc insert/update,
AuditingEntityListener duoc goi
va no set createdAt/updatedAt.
```

### 6.3. `@CreatedDate`

Danh dau field "ngay tao".

```java
@CreatedDate
@Column(nullable = false, updatable = false)
private LocalDateTime createdAt;
```

`updatable = false` nghia la:

```text
Sau khi insert, cot nay khong nen bi update nua.
```

### 6.4. `@LastModifiedDate`

Danh dau field "ngay sua lan cuoi".

```java
@LastModifiedDate
@Column(nullable = false)
private LocalDateTime updatedAt;
```

Moi lan entity duoc update, field nay doi.

---

## 7. BaseEntity la gi?

Neu entity nao cung can:

```text
createdAt
updatedAt
```

thi khong nen copy 2 field nay vao moi entity.

Ta tao class cha:

```java
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class BaseEntity {

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
```

Sau do entity ke thua:

```java
@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private String name;
}
```

Noi ngan gon:

```text
BaseEntity = noi dat cac field chung cua entity.
```

---

## 8. `@MappedSuperclass` la gi?

`@MappedSuperclass` noi voi JPA:

```text
Class nay khong phai table rieng.
Nhung field cua no duoc map xuong table cua class con.
```

Vi du:

```java
public class Product extends BaseEntity
```

Table `products` se co cot:

```text
id
sku
name
created_at
updated_at
```

Se khong co table `base_entity`.

Day la diem hay bi nham:

```text
@Entity tao table/entity rieng.
@MappedSuperclass khong tao table rieng, chi cho class con ke thua mapping.
```

---

## 9. Luong tao Product co auditing

Goi API:

```http
POST /api/products
Content-Type: application/json

{
  "sku": "KB-001",
  "name": "Keyboard"
}
```

Luong chay:

```text
Controller nhan request DTO
-> Service tao Product entity
-> Service goi productRepository.save(product)
-> Hibernate chuan bi INSERT
-> AuditingEntityListener chay truoc INSERT
-> set createdAt
-> set updatedAt
-> Hibernate sinh SQL INSERT
-> Database luu row co created_at/updated_at
-> Service map ProductResponse
-> Controller tra response
```

Ban can nho:

```text
Auditing khong chay luc new Product().
Auditing chay khi JPA xu ly entity lifecycle insert/update.
```

---

## 10. Luong update Product co auditing

Service:

```java
@Transactional
public ProductResponse update(Long id, UpdateProductRequest request) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

    product.setName(request.getName());

    return toResponse(product);
}
```

Khong thay goi `save`.

Vi sao van update?

```text
Product duoc lay trong transaction.
Product la managed entity.
Ban setName().
Hibernate dirty checking thay entity bi doi.
Truoc khi commit, Hibernate flush UPDATE.
AuditingEntityListener set updatedAt moi.
Transaction commit.
```

Voi update:

```text
createdAt giu nguyen.
updatedAt thay doi.
```

---

## 11. Dung kieu du lieu nao cho time?

Nen dung:

```java
Instant
```

hoac:

```java
LocalDateTime
```

Trong project hoc, `LocalDateTime` de nhin va debug de.

Trong project production nhieu timezone, `Instant` thuong ro hon vi dai dien moc thoi gian UTC.

M1-3 chi can dung nhat quan, dung:

```java
LocalDateTime createdAt;
LocalDateTime updatedAt;
```

la on.

---

## 12. Co nen cho client gui `createdAt`, `updatedAt` khong?

Khong nen.

Request DTO khong nen co:

```java
private LocalDateTime createdAt;
private LocalDateTime updatedAt;
```

Vi:

- Client khong nen quyet dinh ngay tao/ngay sua.
- Day la metadata cua server.
- Neu client gui duoc, data de bi gia mao.

Request DTO:

```java
public class CreateProductRequest {
    private String sku;
    private String name;
}
```

Response DTO co the co:

```java
public class ProductResponse {
    private Long id;
    private String sku;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

Noi ngan gon:

```text
Request khong nhan audit fields.
Response co the tra audit fields neu client can xem.
```

---

## 13. Entity co nen dung `@Setter` cho audit fields khong?

Nen han che.

Vi `createdAt`, `updatedAt` nen do JPA/Spring auditing quan ly, khong phai service set tay.

Neu dung Lombok, co the:

```java
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
```

Khong can `@Setter` cho `BaseEntity`.

---

## 14. Loi thuong gap

### Loi 1: Quen `@EnableJpaAuditing`

Trieu chung:

```text
createdAt/updatedAt bi null
```

Sua:

```java
@EnableJpaAuditing
```

### Loi 2: Quen `@EntityListeners`

Trieu chung:

```text
Annotation @CreatedDate co do nhung khong ai set gia tri.
```

Sua:

```java
@EntityListeners(AuditingEntityListener.class)
```

dat tren entity hoac BaseEntity.

### Loi 3: Cho client set audit field

Sai:

```java
public class CreateProductRequest {
    private String sku;
    private String name;
    private LocalDateTime createdAt;
}
```

Dung:

```java
public class CreateProductRequest {
    private String sku;
    private String name;
}
```

### Loi 4: Tu set `updatedAt` trong service o moi noi

Khong nen lap lai:

```java
product.setUpdatedAt(LocalDateTime.now());
```

Neu da dung auditing, de auditing lam.

### Loi 5: Hieu sai `@MappedSuperclass`

Sai:

```text
BaseEntity co table rieng.
```

Dung:

```text
BaseEntity khong tao table rieng.
Field cua BaseEntity duoc dua vao table cua entity con.
```

---

## 15. Code mau day du

### Main application

```java
@SpringBootApplication
@EnableJpaAuditing
public class ShopcoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopcoreApplication.class, args);
    }
}
```

### BaseEntity

```java
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
```

### Product

```java
@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private String name;
}
```

### ProductResponse

```java
@Getter
@Builder
public class ProductResponse {
    private Long id;
    private String sku;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

### Mapping

```java
private ProductResponse toResponse(Product product) {
    return ProductResponse.builder()
            .id(product.getId())
            .sku(product.getSku())
            .name(product.getName())
            .createdAt(product.getCreatedAt())
            .updatedAt(product.getUpdatedAt())
            .build();
}
```

---

## 16. Auditing lien quan gi toi transaction?

Auditing gan voi JPA entity lifecycle.

Khi create:

```text
save()
-> entity sap insert
-> auditing set createdAt/updatedAt
-> SQL INSERT
-> commit
```

Khi update:

```text
find entity trong transaction
-> entity managed
-> set field
-> dirty checking phat hien doi
-> auditing set updatedAt
-> SQL UPDATE
-> commit
```

Neu entity khong duoc JPA quan ly, auditing khong co ly do de chay.

---

## 17. Co can `save()` sau khi update khong?

Neu entity dang managed trong transaction:

```java
@Transactional
public void update(Long id, String name) {
    Product product = productRepository.findById(id).orElseThrow();
    product.setName(name);
}
```

Thi khong bat buoc goi `save`.

Hibernate se dirty checking luc transaction commit.

Nhung trong code project moi hoc, goi `save(product)` sau update cung khong qua sai. Chi can hieu ban chat:

```text
Managed entity doi field -> Hibernate tu flush UPDATE khi commit.
```

---

## 18. Checklist truoc khi thi

- [ ] Giai thich duoc auditing la gi.
- [ ] Noi duoc `createdAt` khac `updatedAt` the nao.
- [ ] Biet `@CreatedDate` dung cho field nao.
- [ ] Biet `@LastModifiedDate` dung cho field nao.
- [ ] Biet vi sao can `@EnableJpaAuditing`.
- [ ] Biet vi sao can `@EntityListeners(AuditingEntityListener.class)`.
- [ ] Hieu `@MappedSuperclass` khong tao table rieng.
- [ ] Biet request DTO khong nen nhan audit fields.
- [ ] Biet response DTO co the tra audit fields.
- [ ] Hieu update managed entity co dirty checking va auditing set `updatedAt`.

---

## 19. Tom tat 10 dong

```text
Auditing giup tu dong luu createdAt/updatedAt.
createdAt la luc tao record.
updatedAt la luc sua record gan nhat.
@CreatedDate danh dau field ngay tao.
@LastModifiedDate danh dau field ngay sua.
@EnableJpaAuditing bat tinh nang auditing.
@EntityListeners(AuditingEntityListener.class) gan listener vao entity/BaseEntity.
@MappedSuperclass giup entity con ke thua field mapping, khong tao table rieng.
Request DTO khong nen co createdAt/updatedAt.
Response DTO co the tra createdAt/updatedAt neu client can.
```

> Cau nho nhanh: **Audit field la viec cua server/JPA, khong phai viec cua client va khong nen rai `LocalDateTime.now()` khap service.**

