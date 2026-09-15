# Nop bai M1-3 Mini Project JPA

## 1. Da lam endpoint nao?

### Category

```http
POST   /api/categories
GET    /api/categories/{id}
GET    /api/categories?page=0&size=10
PUT    /api/categories/{id}
DELETE /api/categories/{id}
```

### Product

```http
POST   /api/products
GET    /api/products/{id}
GET    /api/products?page=0&size=10
GET    /api/products?categoryId=1&page=0&size=10
GET    /api/products?keyword=key&page=0&size=10
PUT    /api/products/{id}
DELETE /api/products/{id}
```

## 2. Cach chay project

```bash
cd m1-3-jpa-mini-project
mvn spring-boot:run
```

App chay tai:

```text
http://localhost:8081
```

Database dung H2 in-memory:

```text
JDBC URL: jdbc:h2:mem:shopcore_jpa
User: sa
Password: de trong
```

Compile da kiem tra:

```text
mvn -DskipTests compile -> BUILD SUCCESS
```

## 3. API test bang curl/Postman

Da test thuc te:

| Case | Ket qua |
|---|---:|
| Tao Category | 201 |
| Tao Product | 201 |
| Lay Product detail | 200 |
| List Product co paging | 200 |
| Filter theo categoryId | 200 |
| Search theo keyword | 200 |
| Trung SKU | 409 |
| Khong tim thay Product | 404 |
| Update Product | 200 |
| Delete Product | 204 |
| Body validation sai | 400 |
| Paging `page=-1` | 400 |

## 4. Cau truc entity/repository/service/controller

```text
Category
  -> CategoryController
  -> CategoryService
  -> CategoryRepository

Product
  -> ProductController
  -> ProductService
  -> ProductRepository
```

`Product` quan he `@ManyToOne(fetch = FetchType.LAZY)` toi `Category`.

`Category` va `Product` dung `BaseEntity` de nhan:

```text
createdAt
updatedAt
```

## 5. Query/paging da dung

- `JpaRepository` cho CRUD va paging.
- Derived query: `findByCategoryId`.
- JPQL query search theo ten Product.
- `Page<Product>` nhan tu Repository.
- Service map `Page<Product>` sang `PageResponse<ProductResponse>`.
- Co `content`, `page`, `size`, `totalElements`, `totalPages`, `last`.
- Co gioi han page/size tu 0 den 100.

## 6. Transaction da dat o dau, vi sao

Transaction dat tai Service:

- `@Transactional` cho create, update, delete.
- `@Transactional(readOnly = true)` cho get detail va get list Product.

Ly do:

```text
Service la noi xu ly mot use case hoan chinh.
Create/update/delete can commit hoac rollback.
Read co the danh dau readOnly.
```

## 7. Lazy/DTO mapping da xu ly o dau

Product khong tra truc tiep ra API. Service map sang `ProductResponse`.

Trong `getById` va `getAll`, code doc:

```java
product.getCategory().getName()
```

ben trong transaction, khi persistence context con mo. Vi vay `categoryName` duoc lay truoc khi tra response va tranh loi lazy khi Jackson serialize.

## 8. Auditing da bat nhu the nao

Application da bat:

```java
@EnableJpaAuditing
```

`BaseEntity` dung:

```java
@CreatedDate
@LastModifiedDate
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
```

Ket qua API da quan sat duoc `createdAt` va `updatedAt` tu dong duoc tao khi insert.

## 9. SQL log/N+1 quan sat duoc

`application.yml` da bat:

```yaml
spring:
  jpa:
    show-sql: true
logging:
  level:
    org.hibernate.SQL: debug
    org.hibernate.orm.jdbc.bind: trace
```

Da quan sat Hibernate sinh SQL cho:

- Paging voi `offset` va `fetch first`.
- Insert Category/Product.
- Query Product theo Category.
- Query Product theo keyword.
- Query detail.

Quan he Product -> Category dang LAZY. Viec map DTO trong transaction giup truy cap relation an toan. N+1 da nam o muc nhan dien; phan toi uu bang fetch join/EntityGraph se hoc sau.

## 10. Phan con nghi ngo/chua chac

- Chua co test JUnit/MockMvc tu dong; hien tai da test API bang curl.
- `DELETE 204` dang boc `ApiResponse`, nhung HTTP convention thuong khong nen co response body voi 204.
- Chua toi uu mapping lap lai bang mapper rieng.
- Chua co fetch join/EntityGraph de fix N+1 o muc nang cao.
- `updatedAt` cua response update co the chua hien gia tri moi truoc luc flush commit; can kiem tra lai neu API can tra timestamp vua cap nhat.
