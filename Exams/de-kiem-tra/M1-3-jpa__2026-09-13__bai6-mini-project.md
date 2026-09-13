# Bai 06 - Cham Mini Project M1-3 Spring Data JPA

> Day la bai cham san pham, khong phai de ly thuyet.  
> Code vao `shopcore`.  
> Sau khi lam xong, tao file nop bai theo huong dan.

---

## 1. Yeu cau san pham

Xay CRUD JPA cho:

```text
Category
Product
```

Can co:

- Entity Product/Category.
- Product `@ManyToOne(fetch = FetchType.LAZY)` toi Category.
- Repository extends `JpaRepository`.
- Derived query.
- It nhat mot query paging/filter.
- `Pageable` / `Page` / `PageResponse`.
- `@Transactional` trong Service.
- DTO request/response, khong tra entity truc tiep.
- Auditing `createdAt`, `updatedAt`.
- SQL log de quan sat query/N+1.

---

## 2. Endpoint bat buoc

### Category

```http
POST   /api/categories
GET    /api/categories/{id}
GET    /api/categories
PUT    /api/categories/{id}
DELETE /api/categories/{id}
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

---

## 3. File nop bai

Tao file:

```text
Exams/nop-bai/M1-3-jpa-mini-project__2026-09-13.md
```

Template:

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

---

## 4. Rubric cham 100 diem

| Nhom | Diem |
|---|---:|
| Entity mapping | 15 |
| Repository | 12 |
| Service + Transaction | 18 |
| DTO + API contract | 12 |
| REST + status code | 10 |
| Paging | 10 |
| Auditing | 10 |
| Lazy/N+1 awareness | 8 |
| Giai thich trong file nop bai | 5 |

Nguong:

```text
>= 85: Dat bai 06.
70-84: Sua them.
< 70: Chua dat.
```

