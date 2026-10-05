# Project nay can giai quyet cai gi?

> Day la mini project de hoc va chung minh ban nam **M1-3 Spring Data JPA**.  
> Muc tieu khong phai lam app lon, ma la code mot backend nho co du JPA, relationship, paging, transaction, DTO va auditing.

---

## 1. Y tuong project

Project nay la backend quan ly:

```text
Category = danh muc san pham
Product = san pham thuoc mot danh muc
```

Vi du:

```text
Category: Keyboard
Product:
- sku: KB-001
- name: Keychron K2
- price: 1500000
- category: Keyboard
```

Quan he:

```text
Mot Category co nhieu Product.
Mot Product thuoc mot Category.
```

Trong Java/JPA, ban chi can lam chieu:

```text
Product -> Category
```

Bang database mong muon:

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

## 2. Feature 1 - Quan ly Category

Category la danh muc san pham, vi du:

```text
Keyboard
Mouse
Monitor
Laptop
```

Ban can lam cac API:

```http
POST   /api/categories
GET    /api/categories/{id}
GET    /api/categories?page=0&size=10
PUT    /api/categories/{id}
DELETE /api/categories/{id}
```

### 2.1. Tao Category

Request:

```json
{
  "name": "Keyboard"
}
```

Can xu ly:

```text
Neu name bi trung -> tra 409 Conflict.
Neu tao thanh cong -> tra 201 Created.
```

Response:

```json
{
  "success": true,
  "message": "Category created",
  "data": {
    "id": 1,
    "name": "Keyboard",
    "createdAt": "2026-09-13T10:00:00",
    "updatedAt": "2026-09-13T10:00:00"
  }
}
```

### 2.2. Lay Category theo id

```http
GET /api/categories/1
```

Can xu ly:

```text
Neu khong tim thay -> 404 Not Found.
Neu co -> tra CategoryResponse.
```

### 2.3. List Category co paging

```http
GET /api/categories?page=0&size=10
```

Can xu ly:

```text
Dung Pageable/Page cua Spring Data JPA.
Khong tu cat list bang fromIndex/toIndex.
Map Page<Category> sang PageResponse<CategoryResponse>.
```

### 2.4. Update Category

```http
PUT /api/categories/1
```

Request:

```json
{
  "name": "Gaming Keyboard"
}
```

Can xu ly:

```text
Khong tim thay id -> 404.
Name moi trung voi category khac -> 409.
Thanh cong -> 200.
updatedAt tu doi nho auditing.
```

### 2.5. Delete Category

```http
DELETE /api/categories/1
```

Can xu ly co ban:

```text
Khong tim thay id -> 404.
Xoa thanh cong -> 204 No Content.
```

Ban co the lam nang cao:

```text
Neu Category dang co Product -> 409 CATEGORY_IN_USE.
```

---

## 3. Feature 2 - Quan ly Product

Product la san pham that.

Vi du:

```text
sku: KB-001
name: Keychron K2
price: 1500000
categoryId: 1
```

Ban can lam cac API:

```http
POST   /api/products
GET    /api/products/{id}
GET    /api/products?page=0&size=10
GET    /api/products?categoryId=1&page=0&size=10
GET    /api/products?keyword=key&page=0&size=10
PUT    /api/products/{id}
DELETE /api/products/{id}
```

### 3.1. Tao Product

Request:

```json
{
  "sku": "KB-001",
  "name": "Keychron K2",
  "price": 1500000,
  "categoryId": 1
}
```

Can xu ly:

```text
SKU trung -> 409 DUPLICATE_SKU.
Category khong ton tai -> 404 CATEGORY_NOT_FOUND.
Neu hop le -> tao Product va gan Category entity vao Product.
Thanh cong -> 201 Created.
```

Quan trong:

```text
Product entity khong nen chi luu Long categoryId.
Product entity nen giu Category category.
Database se luu category_id.
```

Luong tao Product:

```text
Controller nhan CreateProductRequest
-> ProductService.create(request)
-> check existsBySku
-> find Category bang categoryId
-> tao Product entity
-> product.setCategory(category)
-> productRepository.save(product)
-> JPA insert products voi category_id
-> auditing set createdAt/updatedAt
-> map sang ProductResponse
-> Controller tra 201 Created
```

### 3.2. Lay Product theo id

```http
GET /api/products/1
```

Response can co:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "sku": "KB-001",
    "name": "Keychron K2",
    "price": 1500000,
    "categoryId": 1,
    "categoryName": "Keyboard",
    "createdAt": "2026-09-13T10:00:00",
    "updatedAt": "2026-09-13T10:00:00"
  }
}
```

Quan trong:

```text
Controller khong tra Product entity truc tiep.
Controller tra ProductResponse.
Service map Product sang ProductResponse trong @Transactional(readOnly = true).
```

Ly do:

```text
Product.category la LAZY.
Neu tra entity truc tiep, Jackson co the cham category sau khi transaction dong.
Luc do de bi LazyInitializationException.
```

### 3.3. List Product co paging

```http
GET /api/products?page=0&size=10
```

Can xu ly:

```text
Repository tra Page<Product>.
Service map Page<Product> sang PageResponse<ProductResponse>.
Controller tra ApiResponse<PageResponse<ProductResponse>>.
```

Khong lam:

```text
Khong repository.findAll() roi tu subList trong memory.
```

### 3.4. Loc Product theo Category

```http
GET /api/products?categoryId=1&page=0&size=10
```

Repository da co:

```java
Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
```

Can xu ly:

```text
Neu co categoryId thi dung findByCategoryId.
Neu khong co categoryId thi list all.
```

### 3.5. Tim Product theo keyword

```http
GET /api/products?keyword=key&page=0&size=10
```

Repository da co:

```java
Page<Product> searchByName(String keyword, Pageable pageable);
```

Can xu ly:

```text
Neu co keyword thi search theo name.
Neu keyword rong/null thi list all.
```

Neu ca `categoryId` va `keyword` cung co, ban co the chon cach don gian:

```text
Uu tien categoryId truoc.
Hoac uu tien keyword truoc.
Ghi ro trong code/comment/file nop bai.
```

### 3.6. Update Product

```http
PUT /api/products/1
```

Request:

```json
{
  "name": "Keychron K2 Pro",
  "price": 1800000,
  "categoryId": 1
}
```

Can xu ly:

```text
Product khong ton tai -> 404.
Category khong ton tai -> 404.
Set name/price/category moi.
updatedAt tu doi nho auditing.
```

Voi `@Transactional`, co the:

```text
find Product
set field
khong bat buoc save
Hibernate dirty checking luc commit
```

### 3.7. Delete Product

```http
DELETE /api/products/1
```

Can xu ly:

```text
Product khong ton tai -> 404.
Xoa thanh cong -> 204 No Content.
```

---

## 4. Phan ban can code that su

Mieng chinh ban can code:

```text
CategoryService
ProductService
```

Repository da de method san, nhung ban co the sua/them:

```text
CategoryRepository
ProductRepository
```

Controller, DTO, Entity, Common da co san de ban khoi mat thoi gian setup.

---

## 4.1. Doi chieu voi khung code da tao

Khung project hien tai da tao san cac file nay:

```text
src/main/java/com/shopcore
├── ShopcoreJpaMiniApplication.java
├── common
│   ├── ApiResponse.java
│   ├── ApiErrorResponse.java
│   ├── AppException.java
│   ├── ErrorCode.java
│   ├── GlobalExceptionHandler.java
│   ├── PageResponse.java
│   └── entity/BaseEntity.java
├── category
│   ├── Category.java
│   ├── CategoryController.java
│   ├── CategoryRepository.java
│   ├── CategoryService.java
│   └── dto
└── product
    ├── Product.java
    ├── ProductController.java
    ├── ProductRepository.java
    ├── ProductService.java
    └── dto
```

Nhung file **da code san de compile va chay app**:

```text
Controller
Entity
DTO
Common exception/response
BaseEntity auditing
Repository interface
```

Nhung file **ban can mo ra va code logic**:

```text
src/main/java/com/shopcore/category/CategoryService.java
src/main/java/com/shopcore/product/ProductService.java
```

Trong 2 service nay, hien tai cac method dang nem:

```java
throw new UnsupportedOperationException("TODO: ...");
```

Nghia la:

```text
API da co duong vao roi.
Controller da goi Service roi.
Nhung Service chua xu ly gi het.
Ban can thay TODO bang logic JPA that.
```

Luong thuc te cua khung code:

```text
Client
-> CategoryController/ProductController
-> CategoryService/ProductService   <-- ban code o day
-> CategoryRepository/ProductRepository
-> H2 Database
```

---

## 4.2. Controller da goi service nhu the nao?

### CategoryController

Da co san:

```text
POST /api/categories        -> categoryService.create(request)
GET /api/categories/{id}   -> categoryService.getById(id)
GET /api/categories        -> categoryService.getAll(pageable)
PUT /api/categories/{id}   -> categoryService.update(id, request)
DELETE /api/categories/{id}-> categoryService.delete(id)
```

Viec cua ban:

```text
Lam cho cac method trong CategoryService tra ve dung data thay vi nem TODO.
```

### ProductController

Da co san:

```text
POST /api/products                         -> productService.create(request)
GET /api/products/{id}                    -> productService.getById(id)
GET /api/products?page=0&size=10          -> productService.getAll(categoryId, keyword, pageable)
GET /api/products?categoryId=1&page=0     -> productService.getAll(categoryId, keyword, pageable)
GET /api/products?keyword=key&page=0      -> productService.getAll(categoryId, keyword, pageable)
PUT /api/products/{id}                    -> productService.update(id, request)
DELETE /api/products/{id}                 -> productService.delete(id)
```

Viec cua ban:

```text
ProductService phai tu quyet dinh:
- Neu co categoryId thi goi productRepository.findByCategoryId(...)
- Neu co keyword thi goi productRepository.searchByName(...)
- Neu khong co gi thi goi productRepository.findAll(pageable)
```

---

## 4.3. Repository da cho san cai gi?

### CategoryRepository

Da co:

```java
public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String name);
}
```

Ban dung no de:

```text
save category
findById category
findAll pageable
check trung name
delete category
```

### ProductRepository

Da co:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
    Page<Product> searchByName(String keyword, Pageable pageable);
}
```

Ban dung no de:

```text
save product
findById product
findAll pageable
check trung sku
filter theo category id
search theo name bang @Query
delete product
```

---

## 4.4. Entity da cho san cai gi?

### Category

Da co:

```text
id
name
createdAt/updatedAt ke thua tu BaseEntity
```

### Product

Da co:

```text
id
sku
name
price
category
createdAt/updatedAt ke thua tu BaseEntity
```

Relation da co san:

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_id", nullable = false)
Category category;
```

Viec cua ban trong Service:

```text
Khi create/update Product, khong set categoryId truc tiep.
Phai find Category entity roi set vao Product.
```

---

## 4.5. DTO da cho san cai gi?

### CreateProductRequest

Client gui:

```text
sku
name
price
categoryId
```

### ProductResponse

Server tra:

```text
id
sku
name
price
categoryId
categoryName
createdAt
updatedAt
```

Viec cua ban trong Service:

```text
Map Product entity sang ProductResponse.
Khi lay categoryName, phai lam trong transaction/readOnly transaction.
```

Vi du tu duy mapping:

```java
ProductResponse.builder()
        .id(product.getId())
        .sku(product.getSku())
        .name(product.getName())
        .price(product.getPrice())
        .categoryId(product.getCategory().getId())
        .categoryName(product.getCategory().getName())
        .createdAt(product.getCreatedAt())
        .updatedAt(product.getUpdatedAt())
        .build();
```

---

## 5. Cac loi can bat bang AppException

Dung `AppException(ErrorCode.X)` cho business error:

```text
CATEGORY_NOT_FOUND -> 404
DUPLICATE_CATEGORY_NAME -> 409
CATEGORY_IN_USE -> 409
PRODUCT_NOT_FOUND -> 404
DUPLICATE_SKU -> 409
INVALID_PRODUCT_INPUT -> 400
```

Vi du:

```java
throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
```

`GlobalExceptionHandler` se bat `AppException` va tra `ApiErrorResponse`.

---

## 6. Diem JPA can chung minh

Project nay dung de chung minh ban hieu:

```text
@Entity map object voi table.
JpaRepository tu tao implementation.
Derived query nhu existsBySku, existsByName.
@Query cho search custom.
Pageable/Page day paging xuong database.
@Transactional giu persistence context.
Dirty checking update entity.
LAZY relation can map DTO trong transaction.
Auditing tu set createdAt/updatedAt.
SQL log cho thay Hibernate sinh query.
```

---

## 7. Done la khi nao?

Ban coi nhu xong project khi:

```text
Category CRUD chay.
Product CRUD chay.
Product tao duoc voi categoryId ton tai.
Duplicate sku/name tra 409.
Not found tra 404.
List co paging.
Response Product co categoryId va categoryName.
createdAt/updatedAt tu co gia tri.
Khong tra entity truc tiep.
Khong bi LazyInitializationException.
Nhin duoc SQL log khi goi API.
```

---

## 8. Thu tu code de khong bi roi

Lam theo thu tu:

```text
1. Code CategoryService truoc.
2. Test create/get/list category.
3. Code ProductService.create.
4. Test create product voi categoryId.
5. Code ProductService.getById va map categoryName.
6. Code list product co paging.
7. Code filter categoryId/keyword.
8. Code update/delete.
9. Check auditing.
10. Bat log xem SQL.
```

Dung nhay vao Product truoc khi Category chay, vi Product phu thuoc Category.
