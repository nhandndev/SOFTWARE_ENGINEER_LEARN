# M1-3 Bai 06 - Mini Project Cham Spring Data JPA

> Muc tieu bai cuoi: khong hoc them ly thuyet nua. Ban se code mot mini project nho trong `shopcore`, sau do cham tren san pham that de ket luan ban da nam M1-3 chua.

---

## 1. Vi sao bai cuoi nen la mini project?

M1-3 khong chi la nho annotation.

Ban can chung minh duoc:

```text
Controller goi Service
Service xu ly business + transaction
Repository dung Spring Data JPA
Entity map voi table
Product co Category relation
DTO khong lo entity/lazy proxy
Paging day xuong database
Auditing tu dien createdAt/updatedAt
SQL log nhin duoc query/N+1
```

Neu chi thi ly thuyet, co the tra loi duoc nhung vao project lai roi.

Nen bai cuoi nay se cham theo:

```text
Code chay duoc + thiet ke dung + giai thich duoc luong.
```

---

## 2. Pham vi mini project

Code vao project:

```text
shopcore
```

Khong tao project moi.

Domain:

```text
Category
Product
```

Quan he:

```text
Mot Category co nhieu Product.
Mot Product thuoc mot Category.
```

Trong M1-3, chi can code chieu:

```java
Product -> Category
```

Bang:

```text
categories
- id
- name
- created_at
- updated_at

products
- id
- sku
- name
- price
- category_id
- created_at
- updated_at
```

---

## 3. Dependency mong doi

Trong `pom.xml`, project can co cac nhom dependency:

```text
Spring Web
Spring Data JPA
H2 Database hoac PostgreSQL driver
Lombok
Validation neu project da hoc/da dung
```

Neu dung H2 de hoc:

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

Neu dung PostgreSQL:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

M1-3 khong bat buoc PostgreSQL. H2 van duoc neu muc tieu la hoc JPA.

---

## 4. Cau truc package goi y

Khong bat buoc y chang, nhung nen gan nhu sau:

```text
com.shopcore
├── common
│   ├── ApiResponse
│   ├── PageResponse
│   ├── AppException
│   ├── ErrorCode
│   └── GlobalExceptionHandler
├── common.entity
│   └── BaseEntity
├── category
│   ├── Category
│   ├── CategoryRepository
│   ├── CategoryService
│   ├── CategoryController
│   └── dto
└── product
    ├── Product
    ├── ProductRepository
    ├── ProductService
    ├── ProductController
    └── dto
```

Neu ban muon giu package `common` hien tai cung duoc. Dieu quan trong la moi class dung dung trach nhiem.

---

## 5. Entity bat buoc

### BaseEntity

Can co:

```java
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

Va app can bat:

```java
@EnableJpaAuditing
```

### Category

Can co:

```text
id
name
createdAt
updatedAt
```

Rang buoc:

```text
name unique
name not null
```

### Product

Can co:

```text
id
sku
name
price
category
createdAt
updatedAt
```

Rang buoc:

```text
sku unique
sku not null
name not null
price not null
category not null
```

Relation:

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_id", nullable = false)
private Category category;
```

---

## 6. DTO bat buoc

### Category DTO

```text
CreateCategoryRequest
- name

UpdateCategoryRequest
- name

CategoryResponse
- id
- name
- createdAt
- updatedAt
```

### Product DTO

```text
CreateProductRequest
- sku
- name
- price
- categoryId

UpdateProductRequest
- name
- price
- categoryId

ProductResponse
- id
- sku
- name
- price
- categoryId
- categoryName
- createdAt
- updatedAt
```

Quy tac:

```text
Request DTO khong co createdAt/updatedAt.
Response DTO co the co createdAt/updatedAt.
Controller khong tra entity.
```

---

## 7. Repository bat buoc

### CategoryRepository

Can co:

```java
public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String name);
}
```

Co the them:

```java
Optional<Category> findByName(String name);
```

### ProductRepository

Can co:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
}
```

Them mot query tu chon de test `@Query`:

```java
@Query("""
       select p
       from Product p
       where lower(p.name) like lower(concat('%', :keyword, '%'))
       """)
Page<Product> searchByName(@Param("keyword") String keyword, Pageable pageable);
```

Hoac query khac tuong duong cung duoc.

---

## 8. API bat buoc

### Category

```http
POST   /api/categories
GET    /api/categories/{id}
GET    /api/categories
PUT    /api/categories/{id}
DELETE /api/categories/{id}
```

Status code:

```text
Create thanh cong -> 201
Get/List thanh cong -> 200
Update thanh cong -> 200
Delete thanh cong -> 204
Not found -> 404
Duplicate name -> 409
```

### Product

```http
POST   /api/products
GET    /api/products/{id}
GET    /api/products?page=0&size=10
GET    /api/products?categoryId=1&page=0&size=10
GET    /api/products?keyword=phone&page=0&size=10
PUT    /api/products/{id}
DELETE /api/products/{id}
```

Status code:

```text
Create thanh cong -> 201
Get/List thanh cong -> 200
Update thanh cong -> 200
Delete thanh cong -> 204
Not found -> 404
Duplicate sku -> 409
Category not found -> 404
```

---

## 9. Service rule bat buoc

### CategoryService

Khi create:

```text
Neu name trung -> AppException(ErrorCode.CATEGORY_DUPLICATED) hoac tuong duong 409.
```

Khi get/update/delete:

```text
Khong thay id -> 404.
```

Khi delete Category:

M1-3 co the chon 1 trong 2 cach:

```text
Cach don gian: cho delete neu ton tai.
Cach tot hon: neu con Product thuoc Category thi 409.
```

Neu lam cach tot hon se duoc diem bonus nhe.

### ProductService

Khi create:

```text
Neu sku trung -> 409.
Neu categoryId khong ton tai -> 404.
Load Category entity roi gan vao Product.
```

Khi get detail:

```text
@Transactional(readOnly = true)
Find Product.
Map sang ProductResponse trong transaction.
Neu can categoryName, cham product.getCategory().getName() trong transaction.
```

Khi list:

```text
Dung Pageable/Page, khong tu cat list bang fromIndex/toIndex.
Map Page<Product> sang PageResponse<ProductResponse>.
```

Khi update:

```text
@Transactional
Find Product.
Neu doi categoryId thi find Category.
Set field.
Cho Hibernate dirty checking update.
```

---

## 10. Paging response bat buoc

Dung `PageResponse<T>` tu common hoac viet tuong duong.

Can co toi thieu:

```text
content
page
size
totalElements
totalPages
last
```

Vi du:

```json
{
  "content": [
    {
      "id": 1,
      "sku": "KB-001",
      "name": "Keyboard",
      "price": 1000000,
      "categoryId": 1,
      "categoryName": "Accessories"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 1,
  "totalPages": 1,
  "last": true
}
```

---

## 11. SQL log va N+1

Trong `application.yml`, bat SQL log de hoc:

```yaml
spring:
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

Ban can chup/ghi lai trong file nop bai:

```text
Khi GET /api/products, Hibernate sinh nhung SQL nao?
Co dau hieu N+1 khong?
Vi sao?
```

M1-3 chi can **nhan dien** N+1. Fix sau hoc ky thuat `fetch join`, `EntityGraph` sau.

---

## 12. File nop bai

Sau khi code xong, tao file:

```text
Exams/nop-bai/M1-3-jpa-mini-project__2026-09-13.md
```

Noi dung:

```md
# Nop bai M1-3 Mini Project JPA

## 1. Da lam endpoint nao?

## 2. Cach chay project

## 3. API test bang curl/Postman

## 4. Cau truc entity/repository/service/controller

## 5. Query/paging da dung

## 6. Transaction da dat o dau, vi sao

## 7. Lazy/DTO mapping da xu ly o dau

## 8. Auditing da bat nhu the nao

## 9. SQL log/N+1 quan sat duoc

## 10. Phan con nghi ngo/chua chac
```

Neu ban khong tao file nop bai, minh van co the quet code, nhung cham se kem ro hon.

---

## 13. Rubric cham 100 diem

| Nhom | Diem | Yeu cau |
|---|---:|---|
| Entity mapping | 15 | Product/Category dung `@Entity`, column constraint, `@ManyToOne(fetch = LAZY)`, `@JoinColumn`. |
| Repository | 12 | Dung `JpaRepository`, derived query, it nhat 1 query paging/filter, co `@Query` hoac query tuong duong. |
| Service + Transaction | 18 | Business rule dung, `@Transactional` dung cho write/read detail, dirty checking hieu dung. |
| DTO + API contract | 12 | Request/Response tach entity, khong tra entity, response co category info va audit field hop ly. |
| REST + status code | 10 | 200/201/204/404/409 dung, endpoint ro rang. |
| Paging | 10 | Dung `Pageable/Page`, map sang `PageResponse`, khong tu cat list trong memory. |
| Auditing | 10 | `BaseEntity`, `@EnableJpaAuditing`, `createdAt/updatedAt` chay dung. |
| Lazy/N+1 awareness | 8 | Map DTO trong transaction, bat SQL log, nhan dien duoc N+1. |
| Giai thich trong file nop bai | 5 | Noi duoc luong chay, transaction, lazy, auditing. |

Nguong:

```text
>= 85: Dat M1-3 mini project.
70-84: On/sua them.
< 70: Chua dat, can hoc lai phan JPA yeu.
```

---

## 14. Thu tu lam de khoi bi roi

Lam theo thu tu nay:

```text
1. Them dependency JPA + H2/PostgreSQL.
2. Tao BaseEntity + bat @EnableJpaAuditing.
3. Tao Category entity/repository/service/controller.
4. Tao Product entity co @ManyToOne LAZY.
5. Tao ProductRepository query.
6. Tao ProductService create/get/list/update/delete.
7. Tao DTO response/request.
8. Test API bang curl/Postman.
9. Bat SQL log, quan sat query.
10. Tao file nop bai.
```

Dung nhay vao Product truoc khi Category chay. Product phu thuoc Category.

---

## 15. Dieu minh se cham ky

Minh se cham ky nhat cac diem nay:

```text
Product co Category relation that khong?
Ban co tra entity truc tiep khong?
List co dung Page/Pageable khong?
Map categoryName co nam trong transaction khong?
Auditing co that su chay khong?
Update co hieu dirty checking khong?
Ban co nhin SQL log de biet query chay khong?
```

Neu code chay nhung tra entity truc tiep, diem se bi tru kha nhieu vi M1-3 dang hoc lazy/DTO.

---

## 16. Tieu chi pass M1-3 sau bai nay

De coi nhu xong M1-3:

```text
Bai mini project >= 85
Ban giai thich duoc luong create/get/list/update
Ban khong con nham DTO/entity/lazy/session/auditing
```

Sau do moi nen lam final/tick module.

