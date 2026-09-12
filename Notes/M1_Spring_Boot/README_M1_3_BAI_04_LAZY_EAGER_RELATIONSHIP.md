# M1-3 Bai 04 - Lazy vs Eager Va Relationship

> Muc tieu bai 04: hieu `LAZY` va `EAGER` khac nhau the nao, khi nao Hibernate query relation, vi sao co `LazyInitializationException`, va map DTO sao cho khong bi lo entity/khong gay loi.

---

## 1. Bai nay nam o dau?

Ban da hoc:

```text
Bai 01: Entity + JpaRepository.
Bai 02: Query + Paging.
Bai 03: @Transactional.
```

Bai 04 noi ve relation:

```text
Product -> Category
```

Trong Java:

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_id", nullable = false)
private Category category;
```

Cau hoi cua bai nay:

```text
Khi lay Product, Category co duoc lay luon khong?
Khi nao Hibernate query Category?
Neu transaction/session dong roi moi goi product.getCategory() thi sao?
Neu tra entity truc tiep ra JSON co loi gi?
```

---

## 2. Relationship Product - Category

Quan he:

```text
Mot Category co nhieu Product.
Mot Product thuoc mot Category.
```

Database:

```text
categories
id | name

products
id | sku | name | price | category_id
```

Java:

```java
public class Product {
    private Long id;
    private String sku;
    private String name;
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
```

Nho:

```text
Database luu category_id.
Java giu Category object.
```

---

## 3. Fetch type la gi?

Fetch type tra loi cau hoi:

```text
Khi load entity chinh, relation co duoc load ngay khong?
```

Co 2 kieu:

```text
EAGER:
Load relation ngay.

LAZY:
Chua load relation ngay, khi nao can moi load.
```

---

## 4. EAGER loading

EAGER nghia la:

```text
Lay Product thi lay Category luon.
```

Vi du:

```java
@ManyToOne(fetch = FetchType.EAGER)
private Category category;
```

Khi goi:

```java
Product product = productRepository.findById(1L).orElseThrow();
```

Hibernate co the query Product va Category ngay.

Y tuong:

```text
Product load -> Category cung load.
```

### Uu diem

```text
De hieu.
It bi LazyInitializationException.
Dung neu luc nao cung can relation.
```

### Nhuoc diem

```text
De load thua du lieu.
Query co the nang hon.
Neu nhieu relation EAGER, API don gian cung co the keo ca dong object lien quan.
```

---

## 5. LAZY loading

LAZY nghia la:

```text
Lay Product truoc.
Category chua duoc lay that su.
Khi goi product.getCategory() thi Hibernate moi load Category.
```

Vi du:

```java
@ManyToOne(fetch = FetchType.LAZY)
private Category category;
```

Code:

```java
Product product = productRepository.findById(1L).orElseThrow();
```

Luc nay:

```text
Product da co.
Category co the chi la proxy/reference, chua query that su.
```

Khi goi:

```java
String categoryName = product.getCategory().getName();
```

Hibernate moi can Category data.

No co the query:

```sql
select * from categories where id = ?;
```

### Uu diem

```text
Khong load thua relation neu khong can.
Phu hop project that.
```

### Nhuoc diem

```text
Neu truy cap relation ngoai transaction/session -> LazyInitializationException.
Neu loop nhieu Product roi getCategory() tung cai -> de gay N+1.
```

---

## 6. Lazy proxy la gi?

Khi relation la LAZY, Hibernate co the dat mot proxy vao field `category`.

Ban co the hinh dung:

```text
product.category khong phai null.
Nhung no chua chac la Category data day du.
No la "dai dien" de Hibernate biet khi nao can query.
```

Khi ban goi:

```java
product.getCategory().getName()
```

Proxy se thu load Category that.

Dieu kien:

```text
Hibernate session/persistence context con mo.
```

Neu session da dong:

```text
LazyInitializationException
```

---

## 7. LazyInitializationException

Loi nay thuong co y nghia:

```text
Ban dang truy cap lazy relation khi Hibernate session da dong.
```

Vi du:

```java
public Product getEntity(Long id) {
    return productRepository.findById(id).orElseThrow();
}

Product product = productService.getEntity(1L);
String categoryName = product.getCategory().getName();
```

Neu transaction/session dong sau khi service return, dong:

```java
product.getCategory().getName()
```

co the loi.

Trong REST API, loi hay xay ra khi:

```text
Tra entity truc tiep ra Controller.
Jackson serialize entity.
Jackson goi getter cua lazy relation.
Session da dong hoac relation chua load.
```

---

## 8. Tai sao khong tra entity truc tiep?

Khong nen:

```java
@GetMapping("/{id}")
public Product getById(@PathVariable Long id) {
    return productService.getEntity(id);
}
```

Vi:

```text
Entity co relation lazy.
Jackson co the goi getter relation.
Co the gay LazyInitializationException.
Co the lo field noi bo.
Co the JSON lap vo han neu relation 2 chieu.
API bi phu thuoc vao schema/entity.
```

Nen:

```text
Service map entity sang DTO trong transaction.
Controller tra DTO.
```

---

## 9. Map DTO voi lazy relation

Service:

```java
@Transactional(readOnly = true)
public ProductResponse getById(Long id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

    return toResponse(product);
}
```

Mapping:

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

O day, neu method dang trong transaction:

```text
product.getCategory().getName()
```

co the trigger lazy load Category khi session con mo.

---

## 10. N+1 lien quan Lazy nhu the nao?

Vi du list 10 Product:

```java
Page<Product> productPage = productRepository.findAll(pageable);
```

Sau do map:

```java
productPage.getContent()
        .stream()
        .map(product -> product.getCategory().getName())
        .toList();
```

Neu `category` la LAZY, Hibernate co the:

```text
1 query lay products
10 query lay category cho tung product
```

Tong:

```text
1 + N queries
```

Day la N+1.

Bai 04 chi can nhan dien. Bai 05 se hoc N+1 ky hon.

---

## 11. LAZY vs EAGER chon cai nao?

Quy tac thuc dung:

```text
Mac dinh uu tien LAZY cho relationship.
Chi dung EAGER khi chac chan luc nao cung can relation va relation nho.
```

Ly do:

```text
EAGER de load thua.
LAZY kiem soat tot hon, nhung can hieu transaction va query.
```

Voi `@ManyToOne`, JPA default la EAGER, nhung project that thuong chu dong set:

```java
@ManyToOne(fetch = FetchType.LAZY)
```

de tranh load thua.

---

## 12. Bidirectional relationship can can than

Co the viet:

```java
public class Category {
    @OneToMany(mappedBy = "category")
    private List<Product> products;
}
```

Nhung moi hoc JPA, nen tranh lam relation 2 chieu neu chua can.

Vi de gap:

```text
JSON lap vo han: Category -> Product -> Category -> Product...
N+1 de hon.
toString/equals/hashCode bi keo relation.
```

Giai doan nay:

```text
Chi can Product -> Category la du.
```

---

## 13. `@Data` tren entity can than

Khong khuyen khich:

```java
@Data
@Entity
public class Product {}
```

Vi `@Data` sinh:

```text
getter/setter
toString
equals/hashCode
```

`toString`, `equals`, `hashCode` co the cham vao lazy relation va gay:

```text
Lazy load bat ngo.
N+1.
Loop relation.
```

Nen dung:

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
```

Va can than khi generate `toString`, `equals`, `hashCode`.

---

## 14. Fetch join la gi? (nhan dien)

Neu biet list Product chac chan can Category, co the query fetch join:

```java
@Query("""
        select p
        from Product p
        join fetch p.category
        where p.id = :id
        """)
Optional<Product> findByIdWithCategory(@Param("id") Long id);
```

`join fetch` noi Hibernate:

```text
Lay Product va Category cung luc.
```

Bai nay chi can nhan dien. Fix N+1 ky hon o bai sau.

---

## 15. EntityGraph la gi? (nhan dien)

Mot cach khac de noi:

```text
Query nay can load them relation nao.
```

Vi du:

```java
@EntityGraph(attributePaths = "category")
Page<Product> findAll(Pageable pageable);
```

Bai nay chua can dung thanh thao, chi can biet no la mot cach load relation co chu dich.

---

## 16. Luong get Product detail co Category

Request:

```http
GET /api/products/1
```

Luong:

```text
1. Controller goi productService.getById(1).
2. Service mo transaction readOnly.
3. Repository findById lay Product.
4. Product.category la LAZY.
5. Service map Product -> ProductResponse.
6. Trong toResponse, goi product.getCategory().getName().
7. Hibernate load Category neu chua load.
8. Service return ProductResponse.
9. Controller tra JSON DTO.
```

Diem quan trong:

```text
Map DTO trong Service, khi transaction/session con mo.
Khong tra entity cho Jackson tu serialize.
```

---

## 17. Checklist pass bai 04

- [ ] Giai thich duoc EAGER: lay relation ngay.
- [ ] Giai thich duoc LAZY: can moi load relation.
- [ ] Biet Product Java giu `Category category`, DB luu `category_id`.
- [ ] Biet LazyInitializationException xay ra khi truy cap lazy relation luc session da dong.
- [ ] Biet khong nen tra entity truc tiep ra API.
- [ ] Biet map DTO trong Service/transaction.
- [ ] Biet LAZY co the gay N+1 khi loop list va get relation.
- [ ] Biet EAGER de load thua.
- [ ] Biet can than relation 2 chieu.
- [ ] Nhan dien fetch join / EntityGraph la cach load relation co chu dich.

---

## 18. Tom tat 10 dong

```text
EAGER lay relation ngay.
LAZY chi load relation khi truy cap.
Product entity giu Category object.
Database products table luu category_id.
Lazy relation can Hibernate session con mo khi truy cap.
Truy cap lazy relation ngoai session co the LazyInitializationException.
Khong tra entity truc tiep ra API.
Map entity sang DTO trong Service.
Loop list Product roi getCategory co the gay N+1.
Mac dinh nen chu dong dung LAZY va query relation khi can.
```

