# Snapshot cham bai M1-3 JPA Mini Project

> File nop bai: `Exams/nop-bai/M1-3-jpa-mini-project__2026-09-13.md`  
> Pham vi: Final project M1-3 Spring Data JPA  
> Ngay cham: 2026-09-15

## 1. Diem tong

**91/100 - 🟢 Dat M1-3**

Day chinh la final project cua module, khong phai bai phu. Project da compile va da chay API thuc te.

## 2. Diem nhom kien thuc

| Nhom | Diem | Trang thai |
|---|---:|---|
| Entity mapping | 15/15 | 🟢 |
| Repository | 11/12 | 🟢 |
| Service + Transaction | 17/18 | 🟢 |
| DTO + API contract | 12/12 | 🟢 |
| REST + status code | 9/10 | 🟢 |
| Paging | 10/10 | 🟢 |
| Auditing | 10/10 | 🟢 |
| Lazy/N+1 awareness | 6/8 | 🟡 |
| Giai thich trong file nop bai | 1/5 | 🔴 |

> Diem phan giai thich duoc tinh thap vi file nop bai duoc tao trong lan cham nay, chua phai phan ban da tu viet truoc khi nop. Tong diem van cho thay phan code va van hanh dat yeu cau.

## 3. Bang chi tiet tung hang muc

| Hang muc | Ket qua | Diem dat | Nhan xet |
|---|---|---:|---|
| Entity mapping | Dat | 15/15 | Co `@Entity`, id generated, column constraint, `@ManyToOne LAZY`, join column va BaseEntity. |
| Repository | Gan dat | 11/12 | Dung `JpaRepository`, derived query, JPQL search va paging; con method `existsByCategoryId` chua dung. |
| Service + Transaction | Dat | 17/18 | CRUD, check not found/duplicate, map DTO, transaction read/write dung. Con co mapping lap va update timestamp can luu y. |
| DTO + API contract | Dat | 12/12 | Request/response tach entity, validation co ban, ApiResponse va ApiErrorResponse thong nhat. |
| REST + status code | Dat | 9/10 | API chay dung `200/201/204/400/404/409`; `204` khong nen co body theo convention. |
| Paging | Dat | 10/10 | `Pageable`, `Page`, filter category/keyword va metadata deu hoat dong. |
| Auditing | Dat | 10/10 | `@EnableJpaAuditing`, listener, created/updated date da chay thuc te. |
| Lazy/N+1 | Gan dat | 6/8 | Map relation LAZY trong transaction va co SQL log; chua co test/so sanh query de chung minh N+1. |
| File giai thich | Chua danh gia day du | 1/5 | File nop bai da duoc bo sung theo template trong lan cham nay. |

## 4. Kiem tra API thuc te

Da xac nhan cac case:

```text
POST Category                  -> 201
POST Product                   -> 201
GET Product detail             -> 200
GET Product paging             -> 200
GET Product filter category    -> 200
GET Product search keyword     -> 200
Duplicate SKU                  -> 409
Missing Product                -> 404
PUT Product                   -> 200
DELETE Product                 -> 204
Invalid request body           -> 400
Invalid page                   -> 400
```

Loi paging truoc day:

```text
page=-1 bi PageRequest tao truoc khi validate -> 500
```

Da sua bang cach validate `page/size` trong Controller truoc khi goi `PageRequest.of(...)`. Sau khi sua, endpoint tra dung `400`.

## 5. Nhung diem lam tot

- Hieu dung quan he JPA: Product giu `Category entity`, khong chi giu `categoryId` roi tu xu ly thu cong.
- Dung `FetchType.LAZY` cho quan he Product -> Category.
- Biet loi `LazyInitializationException` va map DTO trong transaction.
- Dung `Page<Product>` va map sang `PageResponse<ProductResponse>`.
- JPQL dung entity/field Java:

```java
from Product p
where lower(p.name) like ...
```

- Dung `AppException(ErrorCode...)` cho business error va handler tap trung.
- API co phan biet status code thay vi tra `200` cho moi truong hop.

## 6. Diem can cai thien

### 6.1. Chua co automated test

Project compile va curl test pass, nhung chua co JUnit/MockMvc test. Khi code thay doi, test thu cong khong bao phu nhanh bang test tu dong.

Nen bo sung:

```text
CategoryServiceTest
ProductServiceTest
ProductControllerTest
```

### 6.2. N+1 moi chi dung o muc nhan dien

Ban da bat SQL log va hieu LAZY, nhung chua co bai test dem so query. Can biet them:

```text
1 query lay danh sach Product
N query lay Category cua tung Product
=> N+1
```

Huong hoc sau:

```text
fetch join
@EntityGraph
DTO projection
```

### 6.3. 204 va body

Code hien tai:

```java
ResponseEntity<ApiResponse<Void>>
```

voi status `204`. Theo HTTP convention, `204 No Content` khong nen co body. Tuy nhien style ApiResponse cua ban la chu y thong nhat response; day la diem can hieu ve trade-off, khong phai loi lam app hong.

### 6.4. Mapping lap

Mapping `Product -> ProductResponse` xuat hien o nhieu method. Khi project lon hon, nen tach `ProductMapper` de giam lap va tranh quen field.

## 7. Ket luan

```text
Final project: Dat
M1-3 Spring Data JPA: Dat
Diem: 91/100
Quyet dinh: Duoc sang M1-4
```

M1-3 da du cac kien thuc cot loi:

```text
Entity -> Repository -> Transactional Service -> DTO -> REST API
```

## 8. Hanh dong tiep theo

Hoc module tiep theo:

```text
M1-4 - Bean Validation & Exception Handling
```

Khong can hoc lai M1-3. Chi nen giu lai 3 viec de nang cap sau:

1. Them JUnit/MockMvc test.
2. Tao test quan sat N+1.
3. Tach mapper khi code lon hon.
