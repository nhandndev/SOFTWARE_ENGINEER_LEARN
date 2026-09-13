# Snapshot cham Category va Product partial - M1-3 JPA Mini Project

> Ngay cham: 2026-09-14  
> Pham vi: Category full va Product cac phan da lam: create, getById, getAll.  
> Chua tinh Product update/delete vi dang TODO.

## Ket qua

- Diem: **84 / 100**
- Trang thai: **🟠 Can sua them**
- Maven compile: **Pass**

Day la diem tren pham vi da lam, khong phai diem final project.

## Bang diem

| Hang muc | Diem | Nhan xet |
|---|---:|---|
| Category | 93/100 | Da du CRUD endpoint/service, paging, exception, auditing. |
| Product entity + DTO + controller | 17/20 | Cau truc dung; controller injection dang chua dung `final`. |
| Product create | 14/15 | Logic dung, con double brace thua. |
| Product getById | 15/15 | Dung transaction readOnly, map LAZY relation sang DTO. |
| Product getAll paging/filter | 9/20 | Co paging va map response, nhung dieu kien null dang gay loi runtime. |
| Code quality | 5/10 | Con import thua, mapping lap, chua validate paging/filter ro. |

## Ban da lam tot

- Category da hoan thien feature chinh.
- Product create dung luong:
  `check SKU -> find Category -> build Product -> save -> map DTO`.
- Product dung quan he `Category` entity, khong chi luu `categoryId`.
- Product detail map `categoryName` trong `@Transactional(readOnly = true)`.
- Product list da co `Page`, `PageResponse`, `totalElements`, `totalPages`, `last`.
- Maven compile pass.

## Loi can sua ngay

### 1. `existsById(categoryId)` dang goi truoc khi kiem tra null

Hien tai:

```java
if (categoryRepository.existsById(categoryId) && categoryId != null) {
```

Neu request khong co `categoryId`, `categoryId` la `null`, nhung ban goi `existsById(null)` truoc. Dieu nay co the nem exception.

Sua don gian:

```java
if (categoryId != null) {
    productPage = productRepository.findByCategoryId(categoryId, pageable);
} else if (keyword != null && !keyword.isBlank()) {
    productPage = productRepository.searchByName(keyword, pageable);
} else {
    productPage = productRepository.findAll(pageable);
}
```

Khong can `categoryRepository.existsById(categoryId)` o day. Neu category khong co san pham, query paging tra page rong la duoc. Neu muon validate categoryId ton tai thi phai kiem tra sau khi da chac `categoryId != null`.

### 2. Dieu kien keyword dung `||` va co nguy co NullPointerException

Hien tai:

```java
} else if (keyword != null || !keyword.isBlank()) {
```

Sai vi:

- Dung `||` lam dieu kien khong dung y.
- Khi `keyword == null`, phan sau `!keyword.isBlank()` van co the bi goi va gay `NullPointerException`.

Dung:

```java
} else if (keyword != null && !keyword.isBlank()) {
```

### 3. ProductController tao Pageable trung lap

Controller nhan ca:

```java
@RequestParam int page
@RequestParam int size
Pageable pageable
```

roi lai:

```java
pageable = PageRequest.of(page, size);
```

Nen chon mot cach. Voi style hien tai, bo `Pageable` khoi parameter controller va truyen `PageRequest` vao service:

```java
Pageable pageable = PageRequest.of(page, size);
```

Hoac nhan thang `Pageable` va bo `page/size`, nhung khi do can cau hinh gioi han size.

### 4. ProductController injection chua theo dung style final

Hien tai:

```java
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductController {
    private ProductService productService;
}
```

Nen:

```java
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    ProductService productService;
}
```

hoac:

```java
private final ProductService productService;
```

`@RequiredArgsConstructor` chi tao constructor cho field `final` hoac `@NonNull`.

## Nhan xet tung phan Product

### `create()`

Dat gan full diem. Sua format:

```java
if (productRepository.existsBySku(request.getSku())) {
    throw new AppException(ErrorCode.DUPLICATE_SKU);
}
```

### `getById()`

Dat tot:

```java
@Transactional(readOnly = true)
```

va:

```java
product.getCategory().getName()
```

duoc goi trong transaction, sau do tra DTO. Day la dung cach xu ly LAZY.

### `getAll()`

Ban da hieu phan map `Page` sang `PageResponse`, nhung phan chon query dang loi null. Sua dieu kien xong moi test:

```http
GET /api/products?page=0&size=20
GET /api/products?categoryId=1&page=0&size=20
GET /api/products?keyword=key&page=0&size=20
```

## Phan con thieu

```text
ProductService.update()
ProductService.delete()
```

Sau do can test:

- Duplicate SKU.
- Category khong ton tai khi create/update.
- Product khong ton tai khi get/update/delete.
- Paging khong co filter.
- Paging theo category.
- Search theo keyword.
- Auditing sau update.

## Ket luan

Ban dang o muc **84/100 tren phan da code**. Category pass. Product create va getById tot. Product list da dung khung nhung chua an toan do dieu kien null.

Viec tiep theo:

```text
1. Sua 2 dieu kien null trong ProductService.getAll.
2. Sua injection ProductController.
3. Test 3 truong hop list.
4. Lam ProductService.update.
5. Lam ProductService.delete.
```

