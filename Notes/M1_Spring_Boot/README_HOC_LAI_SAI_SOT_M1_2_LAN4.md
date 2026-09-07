# Hoc Lai Sai Sot M1-2 - MVC REST Lan 4

> Diem bai lan 4: **92/100 - dat**. File nay chi gom nhung phan con sai/thieu, khong hoc lai ca module.

## 1. Loi lon nhat: `400 Bad Request` vs `409 Conflict`

Ban bi nham case:

```text
price = -1000
```

Ban tra loi `409 Conflict`, nhung dung hon la:

```text
400 Bad Request
```

### Cach phan biet

`400 Bad Request` la khi **input cua client khong hop le**.

Vi du:

```text
price <= 0
name rong
sku rong
page < 0
size <= 0
JSON sai format
path variable sai kieu
```

Nghia la request co van de ngay o du lieu client gui len.

`409 Conflict` la khi **request hop le ve mat du lieu**, nhung bi xung dot voi trang thai hien tai cua he thong.

Vi du:

```text
SKU da ton tai
Category name da ton tai
Xoa Category nhung Category van con Product
Dat hang nhung stock khong du
```

Request khong bi sai format. Nhung neu thuc hien thi se pha rule/trang thai he thong.

### Cau nho nhanh

```text
Du lieu gui len sai -> 400.
Du lieu gui len dung nhung dung voi state hien tai thi bi xung dot -> 409.
Khong tim thay resource -> 404.
```

### Bang on nhanh

| Tinh huong | Status | Ly do |
|---|---:|---|
| `price = -1000` | 400 | Gia tri input khong hop le |
| `sku = ""` | 400 | Field bat buoc bi rong |
| `page = -1` | 400 | Query param khong hop le |
| JSON `{"sku":}` | 400 | Body sai format |
| `/products/abc` voi id la Long | 400 | Path variable sai kieu |
| Product id 99 khong ton tai | 404 | Khong tim thay resource |
| Category id 99 khong ton tai khi tao Product | 404 | Resource tham chieu khong ton tai |
| SKU da ton tai | 409 | Xung dot voi state hien tai |
| Xoa Category con Product | 409 | Xung dot voi rang buoc nghiep vu |

## 2. DTO vs Entity/Model - Dien dat cho chuan

Ban viet:

```text
Product la Entity/Model ben trong database duoc anh xa len du an.
```

Y nay gan dung, nhung nen sua lai thanh:

```text
Product la model/entity noi bo cua app.
Neu dung JPA, Product co the duoc anh xa voi table trong database.
Database luu row/table, con Product la object Java trong ung dung.
```

### Cach hieu dung

```text
Database:
products table
id | sku | name | price | category_id

Java app:
Product object
id, sku, name, price, categoryId
```

Entity khong nam trong database. Entity la object Java dai dien cho du lieu co the duoc luu/xuat tu database.

## 3. DTO chay qua luong nao?

Luong dung:

```text
Client JSON
-> Jackson convert
-> CreateProductRequest
-> Controller
-> Service
-> Product model/entity
-> Repository
-> Product model/entity
-> Service map
-> ProductResponse
-> Controller boc ApiResponse/ResponseEntity
-> Jackson convert
-> JSON response
```

### Tung loai object

`CreateProductRequest`:

```text
Du lieu client gui vao khi tao Product.
Thuong khong co id.
Chi gom field client duoc phep gui.
```

`Product`:

```text
Object noi bo cua app.
Dung cho business/storage.
Sau nay co the la JPA entity.
Khong nen tra thang ra client.
```

`ProductResponse`:

```text
Du lieu server tra ve cho client.
Chi gom field client duoc xem.
Co the khac request DTO.
```

`ApiResponse<ProductResponse>`:

```text
Lop boc response thong nhat.
Thuong gom code, message, result.
```

### Cau nho

```text
Request DTO de nhan vao.
Entity/Model de xu ly noi bo.
Response DTO de tra ra.
ApiResponse de boc format chung.
```

## 4. Validation flow - `@Valid` khong phai Controller tu bat

Ban noi `@Valid` nam o Controller cung khong qua sai khi nhin code, vi annotation duoc dat o parameter cua Controller:

```java
public ResponseEntity<?> create(@Valid @RequestBody CreateProductRequest request)
```

Nhung neu noi ve **luong chay**, can chuan hon:

```text
Jackson parse JSON thanh DTO truoc.
Sau do Spring/Bean Validation kiem tra @Valid.
Neu fail thi MethodArgumentNotValidException.
Controller method chua vao logic chinh.
GlobalExceptionHandler doi exception thanh response 400.
```

### Vi du

DTO:

```java
public class CreateProductRequest {
    @NotBlank(message = "SKU is required")
    private String sku;
}
```

Request:

```json
{
  "sku": ""
}
```

Luong:

```text
JSON hop le
-> Jackson tao CreateProductRequest
-> Bean Validation thay sku rong
-> throw MethodArgumentNotValidException
-> GlobalExceptionHandler tra 400
```

Khac voi JSON hong:

```text
JSON hong
-> Jackson parse fail
-> HttpMessageNotReadableException
-> Controller method khong chay
```

Khac voi business error:

```text
JSON hop le
-> DTO hop le
-> Controller chay
-> Service check SKU trung
-> throw AppException(DUPLICATE_SKU)
-> GlobalExceptionHandler tra 409
```

## 5. Luu y khi doc code sai kien truc

Trong cau 7, ban chi ra dung nhieu loi, nhung con nen noi ro hon cac diem sau.

Code sai:

```java
@PostMapping("/create")
public Product create(@RequestBody Product product) {
    if (product.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
        return null;
    }
    return productRepository.save(product);
}
```

### Loi 1: URL co dong tu

Sai:

```text
POST /api/products/create
```

Nen:

```text
POST /api/products
```

REST URL nen dai dien cho resource, HTTP method moi noi hanh dong.

### Loi 2: Tra `null` khi loi

Sai:

```java
return null;
```

Vi client khong biet loi gi, status gi, message gi.

Nen:

```java
throw new AppException(ErrorCode.INVALID_PRODUCT_INPUT);
```

hoac neu dung validation:

```text
price <= 0 -> 400 Bad Request
```

### Loi 3: Controller goi Repository truc tiep

Sai:

```java
return productRepository.save(product);
```

Nen:

```java
ProductResponse response = productService.create(request);
```

Controller chi nen nhan request, goi Service, tra response.

### Loi 4: Dung Entity/Model lam RequestBody

Sai:

```java
@RequestBody Product product
```

Nen:

```java
@RequestBody CreateProductRequest request
```

Vi request tao moi khong nen cho client set tat ca field cua `Product`.

### Loi 5: Tra Entity/Model ra client

Sai:

```java
public Product create(...)
```

Nen:

```java
public ResponseEntity<ApiResponse<ProductResponse>> create(...)
```

De API contract ro rang va khong lo field noi bo.

## 6. Exception flow can thuoc bang cach hieu

### Loi request/framework

```text
Sai URL/method
-> HandlerMapping/Spring MVC
-> 404/405
```

```text
Sai path/query type
-> Argument Resolver/Type Converter
-> MethodArgumentTypeMismatchException
-> 400
```

```text
JSON hong
-> Jackson
-> HttpMessageNotReadableException
-> 400
```

```text
DTO vi pham @Valid
-> Bean Validation
-> MethodArgumentNotValidException
-> 400
```

### Loi business/app

```text
Request dung format
-> DTO tao duoc
-> Controller chay
-> Service check rule
-> rule sai
-> throw AppException(ErrorCode.X)
-> GlobalExceptionHandler
-> ApiErrorResponse + status tu ErrorCode
```

Vi du:

```java
if (productRepository.existsBySku(request.getSku())) {
    throw new AppException(ErrorCode.DUPLICATE_SKU);
}
```

Ket qua:

```text
DUPLICATE_SKU -> 409 Conflict
PRODUCT_NOT_FOUND -> 404 Not Found
INVALID_PRODUCT_INPUT -> 400 Bad Request
```

## 7. Paging - diem ban lam tot, chi can them validate

Ban da nam dung:

```text
fromIndex = page * size
toIndex = min(fromIndex + size, totalElements)
totalPages = ceil(totalElements / size)
```

Con nen bo sung khi tra loi:

```text
Service validate page >= 0.
Service validate size > 0.
Service nen gioi han max size, vi du size <= 100.
Neu page hop le nhung vuot du lieu thi tra 200 voi content rong.
```

Vi du:

```text
totalElements = 45
page = 3
size = 20
fromIndex = 60
60 > 45
-> content rong
-> van 200 OK
```

## 8. Ban can on gi truoc khi sang M1-3?

Chi can on 4 diem:

- [ ] `400` vs `409`.
- [ ] Noi chuan `Product` la entity/model noi bo, khong phai object nam trong database.
- [ ] Validation flow: Jackson tao DTO truoc, Bean Validation check sau.
- [ ] Khi doc code sai, luon soi: URL REST, DTO, Service, ResponseEntity, exception.

## 9. Mini drill 10 phut

Hay tu tra loi nhanh:

1. `GET /api/products/abc` loi o dau?
2. `POST /api/products` voi JSON hong loi o dau?
3. `POST /api/products` voi `price = -1` tra status nao?
4. `POST /api/products` voi SKU trung tra status nao?
5. `GET /api/products?page=99&size=20` khi page hop le nhung het data tra gi?

Dap an:

```text
1. Argument Resolver/Type Converter -> 400.
2. Jackson -> 400.
3. 400 Bad Request.
4. 409 Conflict.
5. 200 OK + content rong.
```

## 10. Cau chot de nho

```text
Sai input -> 400.
Khong co resource -> 404.
Xung dot state -> 409.

JSON -> RequestDTO -> Model/Entity -> ResponseDTO -> ApiResponse -> JSON.

Framework error duoc Spring/Jackson/Validation phat hien.
Business error duoc Service phat hien va throw AppException.
GlobalExceptionHandler chi bien exception thanh HTTP response.
```
