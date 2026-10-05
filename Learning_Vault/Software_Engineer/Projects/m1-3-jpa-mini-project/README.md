# M1-3 JPA Mini Project Skeleton

Project nay la khung rieng de ban lam bai cuoi Spring Data JPA.

## Cach chay

```bash
cd m1-3-jpa-mini-project
./mvnw spring-boot:run
```

Neu khong co `mvnw`, dung Maven tren may:

```bash
mvn spring-boot:run
```

App chay port:

```text
http://localhost:8081
```

H2 console:

```text
http://localhost:8081/h2-console
JDBC URL: jdbc:h2:mem:shopcore_jpa
User: sa
Password: de trong
```

## Phan ban can tu code

Service dang de TODO:

- `CategoryService`
- `ProductService`

Repository da de san interface va method can co:

- `CategoryRepository`
- `ProductRepository`

Controller/common/entity/dto da co khung de ban tap trung vao JPA.

## Muc tieu

- Product/Category CRUD.
- Product `@ManyToOne(fetch = FetchType.LAZY)` toi Category.
- Paging bang `Pageable`/`Page`.
- DTO mapping trong transaction.
- Auditing `createdAt`, `updatedAt`.
- Bat SQL log de nhin query va N+1.
