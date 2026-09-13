# Request - M1-3 JPA Mini Project

> Khung project da co san. Ban chi can tap trung code Service/Repository va test luong JPA.

## 1. Phan da co san

- `pom.xml`
- `application.yml`
- `ShopcoreJpaMiniApplication`
- Common response/error:
  - `ApiResponse`
  - `ApiErrorResponse`
  - `PageResponse`
  - `AppException`
  - `ErrorCode`
  - `GlobalExceptionHandler`
- Auditing:
  - `BaseEntity`
  - `@EnableJpaAuditing`
- Entity:
  - `Category`
  - `Product`
- DTO:
  - `CreateCategoryRequest`
  - `UpdateCategoryRequest`
  - `CategoryResponse`
  - `CreateProductRequest`
  - `UpdateProductRequest`
  - `ProductResponse`
- Controller:
  - `CategoryController`
  - `ProductController`

## 2. Phan ban can code

Hien tai hai service nay da co method signature san, nhung body dang la TODO:

```text
src/main/java/com/shopcore/category/CategoryService.java
src/main/java/com/shopcore/product/ProductService.java
```

Ban chi can thay `UnsupportedOperationException` bang logic JPA.

### CategoryService

- `create`
- `getById`
- `getAll`
- `update`
- `delete`

Can xu ly:

- Duplicate name -> `AppException(ErrorCode.DUPLICATE_CATEGORY_NAME)`
- Not found -> `AppException(ErrorCode.CATEGORY_NOT_FOUND)`
- Map `Category` -> `CategoryResponse`
- Paging -> `PageResponse<CategoryResponse>`

Controller da goi san cac method nay:

```text
POST   /api/categories        -> create(request)
GET    /api/categories/{id}   -> getById(id)
GET    /api/categories        -> getAll(pageable)
PUT    /api/categories/{id}   -> update(id, request)
DELETE /api/categories/{id}   -> delete(id)
```

### ProductService

- `create`
- `getById`
- `getAll`
- `update`
- `delete`

Can xu ly:

- Duplicate SKU -> `AppException(ErrorCode.DUPLICATE_SKU)`
- Product not found -> `AppException(ErrorCode.PRODUCT_NOT_FOUND)`
- Category not found -> `AppException(ErrorCode.CATEGORY_NOT_FOUND)`
- Product relation dung `Category` entity, khong chi luu `categoryId`
- Map `Product` -> `ProductResponse`
- Khi map `categoryName`, lam trong transaction de an toan voi LAZY
- Paging -> `PageResponse<ProductResponse>`

Controller da goi san method nay:

```text
POST   /api/products                         -> create(request)
GET    /api/products/{id}                    -> getById(id)
GET    /api/products?page=0&size=10          -> getAll(categoryId, keyword, pageable)
GET    /api/products?categoryId=1&page=0     -> getAll(categoryId, keyword, pageable)
GET    /api/products?keyword=phone&page=0    -> getAll(categoryId, keyword, pageable)
PUT    /api/products/{id}                    -> update(id, request)
DELETE /api/products/{id}                    -> delete(id)
```

Trong `getAll(categoryId, keyword, pageable)`, ban tu xu ly:

```text
Neu co categoryId -> findByCategoryId(categoryId, pageable)
Neu co keyword -> searchByName(keyword, pageable)
Neu khong co -> findAll(pageable)
```

## 3. Repository

Repository da co method goi y:

```java
boolean existsByName(String name);
boolean existsBySku(String sku);
Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
Page<Product> searchByName(String keyword, Pageable pageable);
```

Ban co the sua/them method neu can.

## 4. Endpoint test

```http
POST   /api/categories
GET    /api/categories/{id}
GET    /api/categories
PUT    /api/categories/{id}
DELETE /api/categories/{id}

POST   /api/products
GET    /api/products/{id}
GET    /api/products?page=0&size=10
GET    /api/products?categoryId=1&page=0&size=10
GET    /api/products?keyword=phone&page=0&size=10
PUT    /api/products/{id}
DELETE /api/products/{id}
```

## 5. Dieu can quan sat

- `createdAt`, `updatedAt` co tu set khong?
- List product co paging that khong?
- Khi get product detail co tra `categoryName` khong?
- SQL log co hien query khong?
- Co bi LazyInitializationException khong?
