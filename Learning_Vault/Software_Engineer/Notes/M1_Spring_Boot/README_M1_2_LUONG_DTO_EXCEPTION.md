# M1-2 - Luong Chay, DTO Va Exception Trong MVC REST

> File nay tap trung vao 3 thu ban dang muon nam chac: **request chay qua dau**, **DTO bien doi nhu the nao**, va **loi mac dinh voi loi AppException khac nhau ra sao**.

## 1. Can nho truoc

Trong Spring MVC REST co 2 the gioi:

```text
Ben ngoai app:
Client <-> Server bang HTTP + JSON

Ben trong app:
Controller -> Service -> Repository bang Java method call
```

Vi vay dung hoc theo kieu thuoc annotation rieng le. Hay hoc theo luong:

```text
HTTP request
-> Tomcat
-> DispatcherServlet
-> Controller
-> Service
-> Repository
-> Service
-> Controller
-> HTTP response
```

Mot cau de nho:

```text
Controller khong xu ly nghiep vu.
Service khong biet HTTP.
Repository khong biet API.
```

## 2. Mot request tao Product chay ra sao?

Client gui:

```http
POST /api/products
Content-Type: application/json

{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": 1500000,
  "categoryId": 1
}
```

Backend tra:

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/products/10

{
  "code": 1000,
  "message": "Success",
  "result": {
    "id": 10,
    "sku": "KB-001",
    "name": "Keyboard",
    "price": 1500000,
    "categoryId": 1
  }
}
```

Luong chay that:

```text
1. Client gui HTTP request.
2. Tomcat nhan request.
3. Tomcat dua request vao DispatcherServlet.
4. DispatcherServlet tim method khop POST /api/products.
5. Spring thay method can @RequestBody CreateProductRequest.
6. Jackson doc JSON body.
7. Jackson tao object CreateProductRequest.
8. Spring goi ProductController.create(request).
9. Controller goi productService.create(request).
10. Service check business rule.
11. Service goi Repository de check/save.
12. Repository luu Product.
13. Service map Product -> ProductResponse.
14. Controller boc ProductResponse vao ApiResponse/ResponseEntity.
15. Jackson doi response object thanh JSON.
16. Tomcat tra HTTP response ve client.
```

Ban chi can nhin duoc 3 doan:

```text
Doan 1: HTTP/JSON vao app
Client -> Tomcat -> DispatcherServlet -> Jackson

Doan 2: Java code cua minh
Controller -> Service -> Repository

Doan 3: Object thanh HTTP/JSON tra ra
Controller -> Jackson -> Tomcat -> Client
```

## 3. DTO nam o dau trong luong?

DTO la object dung de noi chuyen voi ben ngoai API.

Trong project cua ban, DTO thuong la class:

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {
    private String sku;
    private String name;
    private BigDecimal price;
    private Long categoryId;
}
```

### Request DTO

Request DTO la object client gui vao.

```text
JSON body
-> Jackson
-> CreateProductRequest
-> Controller method parameter
```

Vi du:

```java
@PostMapping
public ResponseEntity<ApiResponse<ProductResponse>> create(
        @RequestBody CreateProductRequest request) {
    ProductResponse result = productService.create(request);
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success(result));
}
```

Khi method tren bat dau chay, `request` da la Java object roi.

Controller khong tu parse JSON. Spring/Jackson lam viec do truoc.

### Model/entity noi bo

Service dung request DTO de tao model noi bo:

```text
CreateProductRequest
-> Product
```

Vi du:

```java
Product product = Product.builder()
        .sku(request.getSku())
        .name(request.getName())
        .price(request.getPrice())
        .categoryId(request.getCategoryId())
        .build();
```

`Product` la object noi bo cua app. Sau nay qua M1-3, no co the thanh JPA entity.

### Response DTO

Sau khi luu xong, Service khong nen tra thang `Product` ra ngoai. Service map sang response DTO:

```text
Product
-> ProductResponse
-> ApiResponse<ProductResponse>
-> JSON response
```

Vi du:

```java
ProductResponse response = ProductResponse.builder()
        .id(product.getId())
        .sku(product.getSku())
        .name(product.getName())
        .price(product.getPrice())
        .categoryId(product.getCategoryId())
        .build();
```

Luong DTO day du:

```text
Client JSON
-> CreateProductRequest
-> Product
-> ProductResponse
-> ApiResponse<ProductResponse>
-> Client JSON
```

## 4. Vi sao khong dung Product lam tat ca?

Khong nen:

```java
public Product create(@RequestBody Product product) { ... }
```

Ly do:

```text
Request tao moi khong nen co id.
Response can co id.
Client khong nen duoc set moi field.
Sau nay entity co field noi bo thi co the bi lo.
API bi dinh chat vao database model.
```

DTO giup tach:

```text
Ben ngoai API: request/response DTO
Ben trong app: model/entity
```

Nho cau nay:

```text
DTO la hop dong voi client.
Entity/model la cach app tu quan ly du lieu.
```

## 5. Loi mac dinh cua Spring/Jackson la gi?

Day la cac loi xay ra truoc khi code nghiep vu cua ban chay, hoac truoc khi Controller method chay xong.

### 5.1. Path variable sai kieu

Controller:

```java
@GetMapping("/{id}")
public ProductResponse getById(@PathVariable Long id) {
    return productService.getById(id);
}
```

Client goi sai:

```http
GET /api/products/abc
```

Spring can bien `"abc"` thanh `Long`, nhung khong duoc.

Luong loi:

```text
Request vao DispatcherServlet
-> Spring tim duoc method getById(Long id)
-> Spring convert "abc" sang Long
-> convert fail
-> MethodArgumentTypeMismatchException
-> Controller method chua chay
-> GlobalExceptionHandler tra 400
```

Trong project cua ban:

```java
@ExceptionHandler(MethodArgumentTypeMismatchException.class)
public ResponseEntity<ApiErrorResponse> handleMethodArgumentTypeMismatchException(
        MethodArgumentTypeMismatchException e) {
    ErrorCode errorCode = ErrorCode.INVALID_PARAMETER;
    ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder()
            .code(errorCode.getCode())
            .message(errorCode.getMessage())
            .build();
    return ResponseEntity.status(errorCode.getHttpStatus()).body(apiErrorResponse);
}
```

Ket qua nen la:

```http
HTTP/1.1 400 Bad Request

{
  "code": 400,
  "message": "Invalid parameter value"
}
```

### 5.2. JSON body sai format

Client gui:

```http
POST /api/products
Content-Type: application/json

{"sku":}
```

Jackson doc JSON va bi loi vi JSON khong hop le.

Luong loi:

```text
Request vao DispatcherServlet
-> Spring thay co @RequestBody
-> Jackson parse JSON
-> JSON hong
-> HttpMessageNotReadableException
-> Controller method chua chay
-> GlobalExceptionHandler tra 400
```

Trong project cua ban:

```java
@ExceptionHandler(HttpMessageNotReadableException.class)
public ResponseEntity<ApiErrorResponse> handleHttpMessageNotReadableException(
        HttpMessageNotReadableException e) {
    ErrorCode errorCode = ErrorCode.INVALID_REQUEST_BODY;
    ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder()
            .code(errorCode.getCode())
            .message(errorCode.getMessage())
            .build();
    return ResponseEntity.status(errorCode.getHttpStatus()).body(apiErrorResponse);
}
```

Ket qua:

```http
HTTP/1.1 400 Bad Request

{
  "code": 400,
  "message": "Invalid request body"
}
```

### 5.3. Validation fail

Sau nay neu DTO co:

```java
@NotBlank(message = "SKU is required")
private String sku;
```

Controller co:

```java
public ResponseEntity<?> create(@Valid @RequestBody CreateProductRequest request)
```

Client gui:

```json
{
  "sku": "",
  "name": "Keyboard",
  "price": 1500000,
  "categoryId": 1
}
```

Luong loi:

```text
Jackson parse JSON OK
-> tao CreateProductRequest OK
-> Bean Validation check @NotBlank
-> fail
-> MethodArgumentNotValidException
-> Controller method chua vao logic chinh
-> GlobalExceptionHandler tra 400
```

Trong project cua ban:

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ApiErrorResponse> handleMethodArgumentNotValidException(
        MethodArgumentNotValidException e) {
    String message = e.getBindingResult().getFieldErrors()
            .stream()
            .findFirst()
            .map(fieldError -> fieldError.getDefaultMessage())
            .orElse("Validation failed");

    ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder()
            .code(HttpStatus.BAD_REQUEST.value())
            .message(message)
            .build();
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiErrorResponse);
}
```

## 6. Loi AppException la gi?

`AppException` la loi do app cua ban chu dong nem ra khi business rule sai.

Vi du:

```text
Product id khong ton tai
Category id khong ton tai
SKU bi trung
Category name bi trung
Xoa Category nhung van con Product
```

Nhung loi nay khac voi JSON hong/path sai kieu.

JSON hong la client gui format sai, Spring/Jackson bat duoc truoc.

SKU trung la request format dung, DTO tao duoc, Controller goi Service duoc, nhung Service phat hien rule nghiep vu sai.

## 7. Luong AppException

Vi du client tao Product bi trung SKU:

```http
POST /api/products
Content-Type: application/json

{
  "sku": "KB-001",
  "name": "Keyboard 2",
  "price": 1600000,
  "categoryId": 1
}
```

Luong chay:

```text
1. Request vao Tomcat.
2. DispatcherServlet tim Controller.
3. Jackson parse JSON thanh CreateProductRequest.
4. ProductController.create(request) chay.
5. Controller goi productService.create(request).
6. Service goi productRepository.existsBySku("KB-001").
7. Repository tra true.
8. Service throw new AppException(ErrorCode.DUPLICATE_SKU).
9. Exception vang nguoc ra khoi Service.
10. Controller khong tu handle nen exception vang ra ngoai.
11. GlobalExceptionHandler bat AppException.
12. Handler lay ErrorCode.DUPLICATE_SKU.
13. Handler tao ApiErrorResponse.
14. Handler tra HTTP 409 Conflict.
```

Code Service:

```java
if (productRepository.existsBySku(request.getSku())) {
    throw new AppException(ErrorCode.DUPLICATE_SKU);
}
```

Code Handler:

```java
@ExceptionHandler(AppException.class)
public ResponseEntity<ApiErrorResponse> handleAppException(AppException e) {
    ErrorCode errorCode = e.getErrorCode();
    ApiErrorResponse apiErrorResponse = ApiErrorResponse.builder()
            .code(errorCode.getCode())
            .message(errorCode.getMessage())
            .build();
    return ResponseEntity.status(errorCode.getHttpStatus()).body(apiErrorResponse);
}
```

Ket qua:

```http
HTTP/1.1 409 Conflict

{
  "code": 409,
  "message": "Duplicate Product SKU"
}
```

## 8. ErrorCode dung de lam gi?

`ErrorCode` gom 3 thong tin:

```java
DUPLICATE_SKU(
        409,
        "Duplicate Product SKU",
        HttpStatus.CONFLICT
)
```

Moi error co:

```text
code       -> ma loi app tra ve
message    -> message tra ve client
httpStatus -> HTTP status dung de ResponseEntity.status(...)
```

Tai sao can enum?

```text
Khong rai rac string loi khap Service.
Khong moi cho tu viet status rieng.
Tat ca business error gom ve mot noi.
Handler chi can doc errorCode la biet tra gi.
```

Nho:

```text
Service nem AppException.
AppException giu ErrorCode.
Handler doc ErrorCode.
HTTP response duoc tao o Handler.
```

## 9. So sanh loi mac dinh va AppException

| Tinh huong | Ai phat hien? | Controller method co chay khong? | Exception | Status |
|---|---|---:|---|---:|
| `/products/abc` nhung id la Long | Spring convert | Khong | MethodArgumentTypeMismatchException | 400 |
| JSON body hong | Jackson | Khong | HttpMessageNotReadableException | 400 |
| DTO fail `@Valid` | Bean Validation | Thuong chua vao logic | MethodArgumentNotValidException | 400 |
| Product id khong ton tai | Service | Co | AppException(PRODUCT_NOT_FOUND) | 404 |
| SKU trung | Service | Co | AppException(DUPLICATE_SKU) | 409 |
| Loi khong ngo toi | Bat cu dau | Co the co/khong | Exception | 500 |

## 10. Vi sao khong throw ResponseEntity trong Service?

Khong nen viet:

```java
if (notFound) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(...);
}
```

trong Service.

Vi Service la lop nghiep vu, khong phai lop HTTP.

Dung hon:

```java
if (notFound) {
    throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
}
```

Sau do Handler quyet dinh HTTP response.

Loi ich:

```text
Service sach hon.
Service dung duoc o noi khac, khong chi REST API.
Controller bot lap code xu ly loi.
Tat ca loi tra ve cung format.
```

## 11. Ba luong can thuoc bang cach hieu

### 11.1. Luong thanh cong

```text
Client gui JSON
-> Jackson tao RequestDTO
-> Controller goi Service
-> Service check rule
-> Repository save/find
-> Service tao ResponseDTO
-> Controller tra status/body
-> Jackson tao JSON response
```

### 11.2. Luong loi request/framework

```text
Client gui request sai format
-> Spring/Jackson/Validation phat hien
-> Controller method co the chua chay
-> GlobalExceptionHandler bat loi
-> tra ApiErrorResponse 400
```

### 11.3. Luong loi nghiep vu

```text
Client gui request dung format
-> Controller chay
-> Service chay
-> Service phat hien business rule sai
-> throw AppException(ErrorCode.X)
-> GlobalExceptionHandler bat
-> tra ApiErrorResponse theo ErrorCode
```

## 12. Cach tu debug de thay luong

Dat breakpoint theo thu tu:

```text
1. ProductController.create()
2. ProductService.create()
3. ProductRepository.save()
4. GlobalExceptionHandler.handleAppException()
5. GlobalExceptionHandler.handleHttpMessageNotReadableException()
6. GlobalExceptionHandler.handleMethodArgumentTypeMismatchException()
```

Thu 3 request:

### Request OK

```http
POST /api/products
Content-Type: application/json

{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": 1500000,
  "categoryId": 1
}
```

Ban se thay:

```text
Controller -> Service -> Repository -> Service -> Controller
```

### Request JSON hong

```http
POST /api/products
Content-Type: application/json

{"sku":}
```

Ban se thay:

```text
Controller breakpoint khong dung.
Handler HttpMessageNotReadableException dung.
```

### Request trung SKU

```http
POST /api/products
Content-Type: application/json

{
  "sku": "KB-001",
  "name": "Keyboard 2",
  "price": 1600000,
  "categoryId": 1
}
```

Ban se thay:

```text
Controller dung.
Service dung.
Service throw AppException.
Handler AppException dung.
```

## 13. Cach noi khi thi

Neu de hoi: "Hay mo ta luong tao Product trong Spring MVC REST"

Tra loi gon:

```text
Client gui HTTP POST kem JSON. Request vao Tomcat roi DispatcherServlet.
DispatcherServlet tim Controller method phu hop. Jackson convert JSON body
thanh CreateProductRequest. Controller nhan DTO va goi Service.
Service xu ly business rule, goi Repository de check/luu du lieu.
Repository tra model ve Service. Service map model sang ProductResponse.
Controller boc response vao ResponseEntity/ApiResponse voi status 201.
Jackson serialize object thanh JSON va tra HTTP response cho client.
```

Neu de hoi: "Loi mac dinh va AppException khac nhau nhu the nao?"

Tra loi gon:

```text
Loi mac dinh nhu sai kieu path variable, JSON hong, validation fail thuong
duoc Spring/Jackson/Validation phat hien truoc hoac ngay luc binding request,
Controller method co the chua chay. Cac loi nay duoc GlobalExceptionHandler
bat va tra 400.

AppException la loi nghiep vu do Service chu dong nem ra khi request dung
format nhung vi pham rule, vi du SKU trung hoac Product khong ton tai.
Handler bat AppException, doc ErrorCode de tra dung code/message/httpStatus
nhu 404 hoac 409.
```

## 14. Mot hinh can giu trong dau

```text
                 Request sai format
                  /        |        \
                 v         v         v
Client -> Tomcat -> DispatcherServlet -> Jackson/Binding
                                      |
                                      | OK
                                      v
                               Controller
                                      |
                                      v
                                  Service
                                  /     \
                         rule OK        rule fail
                            |              |
                            v              v
                       Repository     AppException
                            |              |
                            v              v
                       ResponseDTO   GlobalExceptionHandler
                            |              |
                            v              v
                         JSON 200/201    JSON 400/404/409
```

## 15. Chot lai

```text
DTO khong tu sinh ra.
Jackson tao RequestDTO tu JSON.

Controller khong xu ly business rule.
Controller chi nhan request va tra response.

Service la noi quyet dinh nghiep vu dung/sai.
Service throw AppException neu rule sai.

GlobalExceptionHandler la noi bien exception thanh HTTP response.

Loi framework/request: Spring/Jackson/Validation bat.
Loi business: Service bat va throw AppException.
```

Neu ban nam duoc 5 dong nay, ban da hieu ban chat M1-2 tot hon viec chi code theo mau.
