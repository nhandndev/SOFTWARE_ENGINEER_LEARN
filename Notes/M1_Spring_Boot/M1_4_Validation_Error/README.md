# M1-4 - Lesson 01: Tong Quan Validation & Error Handling

## 1. Bai nay giai quyet cai gi?

O M1-2 va M1-3, ban da co luong:

```text
Client
-> Controller
-> Service
-> Repository
-> Response
```

Nhung bay gio co cau hoi:

```text
Neu client gui data sai thi sao?
Neu JSON sai format thi sao?
Neu categoryId khong ton tai thi sao?
Neu sku bi trung thi sao?
Neu code nem exception thi response tra ve co dep khong?
```

M1-4 tra loi nhung cau do.

## 2. Co 2 loai loi can tach rieng

### Loai 1: Validation error

La loi do request dau vao khong hop le ve mat format/gia tri.

Vi du:

```json
{
  "sku": "",
  "name": "",
  "price": -10,
  "categoryId": null
}
```

Nhung loi nay nen bi chan truoc khi vao business logic.

Thuong tra:

```text
400 Bad Request
```

### Loai 2: Business error

Request co ve hop le, nhung va vao rule cua he thong.

Vi du:

```text
sku dung format nhung da ton tai       -> 409 Conflict
categoryId dung kieu Long nhung khong ton tai -> 404 Not Found
productId khong tim thay              -> 404 Not Found
```

Business error thuong nam trong Service va duoc nem bang:

```java
throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
```

## 3. Loi bi bat o dau trong luong request?

Luong request tao Product:

```text
Client gui JSON
-> FilterChain
-> DispatcherServlet
-> HandlerMapping tim controller method
-> HandlerAdapter chuan bi goi method
-> Jackson convert JSON -> Request DTO
-> Bean Validation check DTO neu co @Valid
-> Controller duoc goi neu validation pass
-> Service xu ly business rule
-> Repository query database
```

Vi tri loi:

```text
JSON sai cu phap
-> Jackson fail
-> HttpMessageNotReadableException

DTO sai constraint
-> Bean Validation fail
-> MethodArgumentNotValidException

Path/query param sai kieu
-> Type conversion fail
-> MethodArgumentTypeMismatchException

Business rule sai
-> Service throw AppException
-> GlobalExceptionHandler bat AppException
```

## 4. Vi du de nho

Endpoint:

```http
POST /api/products
```

Request body:

```json
{
  "sku": "",
  "name": "Keyboard",
  "price": -1,
  "categoryId": 1
}
```

Neu Controller co:

```java
public ResponseEntity<?> create(@Valid @RequestBody CreateProductRequest request)
```

thi luong la:

```text
Jackson tao CreateProductRequest
-> Bean Validation thay sku rong va price am
-> nem MethodArgumentNotValidException
-> Controller method chua duoc chay
-> GlobalExceptionHandler tra 400
```

Con neu body hop le:

```json
{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": 1500000,
  "categoryId": 999
}
```

thi:

```text
Validation pass
-> Controller duoc goi
-> Service find categoryId 999
-> khong thay
-> throw AppException(CATEGORY_NOT_FOUND)
-> GlobalExceptionHandler tra 404
```

## 5. Bang phan biet nhanh

| Tinh huong | Loi gi | Exception hay gap | Status |
|---|---|---|---|
| JSON thieu dau ngoac | JSON parse | `HttpMessageNotReadableException` | 400 |
| `price` la `"abc"` nhung DTO can `BigDecimal` | JSON binding | `HttpMessageNotReadableException` | 400 |
| `name` rong | DTO validation | `MethodArgumentNotValidException` | 400 |
| `page=abc` nhung param la `int` | Type conversion | `MethodArgumentTypeMismatchException` | 400 |
| `categoryId` khong ton tai | Business | `AppException` | 404 |
| `sku` trung | Business | `AppException` | 409 |

## 6. Dieu can nho

```text
Validation dung de chan request sai truoc Service.
Service dung de chan business rule sai.
ControllerAdvice dung de gom loi ve mot format response.
```

## 7. Tu kiem tra

1. `name` rong nen la validation error hay business error?
2. `categoryId=999` khong ton tai nen la validation error hay business error?
3. Neu DTO sai `@NotBlank`, Controller method co duoc chay khong?
4. JSON sai cu phap thi Bean Validation co chay khong?
5. Vi sao khong nen xu ly het loi bang `Exception.class`?

# Bai Kiem Tra Lesson 01

> Khong xem dap an. Tra loi bang loi cua ban, uu tien giai thich luong chay.

## Cau 1 - Phan loai

Request:

```json
{
  "name": "",
  "price": 1000,
  "categoryId": 1
}
```

Hay tra loi:

```text
Validation Error hay Business Error?
Exception nao?
Status nao?
Loi bi phat hien o dau?
Service co chay khong?
```

## Cau 2 - Business error

Request:

```json
{
  "name": "Keyboard",
  "price": 1000,
  "categoryId": 999
}
```

Category `999` khong ton tai. Hay giai thich:

```text
Validation co pass khong?
Loi bi phat hien o Controller hay Service?
Exception nao?
Status nao?
Repository co duoc goi khong?
```

## Cau 3 - JSON sai

Client gui:

```json
{
  "name": "Keyboard",
  "price": 1000,
  "categoryId": 1
```

Hay viet luong request va noi ro Bean Validation co chay hay khong.

## Cau 4 - Sai kieu du lieu

DTO co:

```java
private BigDecimal price;
```

Client gui:

```json
{
  "name": "Keyboard",
  "price": "abc",
  "categoryId": 1
}
```

Hay tra loi:

```text
Jackson co tao DTO duoc khong?
Exception nao?
Controller co chay khong?
Status nao?
```

## Cau 5 - SKU trung

SKU `"KB-001"` dung format nhung da ton tai trong database.

Hay tra loi:

```text
Validation Error hay Business Error?
400 hay 409?
Lop nao kiem tra?
Exception nao?
Vi sao khong phai 400?
```

## Cau 6 - Query parameter

Controller co:

```java
@RequestParam int page
```

Client goi:

```http
GET /api/products?page=abc
```

Hay tra loi:

```text
Spring loi o buoc nao?
Exception nao?
Controller method co chay khong?
Status nao?
```

## Cau 7 - So sanh hai request

### Request A

```json
{
  "sku": "",
  "name": "Keyboard",
  "price": 1000,
  "categoryId": 1
}
```

### Request B

```json
{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": 1000,
  "categoryId": 999
}
```

Hay so sanh:

```text
Request nao bi chan truoc?
Request nao vao Service?
Request nao can truy cap database?
Status cua tung request?
```

## Cau 8 - GlobalExceptionHandler

Giai thich:

```text
Tai sao khong nen try/catch trong tung Controller?
@RestControllerAdvice lam gi?
Tai sao Exception.class nen dat cuoi?
```

## Cau 9 - Code flow

Cho code:

```java
@PostMapping
public ResponseEntity<?> create(
        @Valid @RequestBody CreateProductRequest request
) {
    return ResponseEntity.ok(
            productService.create(request)
    );
}
```

Hay dien tiep:

```text
JSON
-> Jackson
-> ...
-> productService.create
-> ...
```

## Cau 10 - Cau hoi ban chat

Tra loi ngan gon:

1. Vi sao `@NotNull` khong the kiem tra `categoryId` co ton tai trong database?
2. Vi sao validation nen chay truoc Service?
3. Neu validation fail thi Repository co chay khong?
4. `price = -1` va `categoryId = 999` khac nhau o diem nao?
5. Khi nao dung `AppException`?

## Tieu chi tu danh gia

Ban lam tot Lesson 01 neu:

- Dung it nhat 8/10 cau.
- Phan biet ro `400`, `404`, `409`.
- Noi duoc validation fail thi Service khong chay.
- Phan biet JSON parse fail voi DTO validation fail.
- Noi duoc business error nam trong Service.
- Noi duoc GlobalExceptionHandler doi exception thanh HTTP response.

Khi lam xong, gui cau tra loi theo tung cau `1 -> 10`; minh se cham rieng Lesson 01 va tao snapshot nhan xet.
