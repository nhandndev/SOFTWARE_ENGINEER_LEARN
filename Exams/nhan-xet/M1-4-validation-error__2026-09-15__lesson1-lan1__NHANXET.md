# Snapshot cham bai M1-4 Validation & Error - Lesson 01

> File de: `Exams/de-kiem-tra/M1-4-validation-error__2026-09-15__lesson1-lan1.md`  
> Ngay cham: 2026-09-15  
> Pham vi: Cham full 10 cau Lesson 01.

## 1. Diem tong

- Diem tho: **42.2 / 43**
- Quy doi: **98.1 / 100**
- Ket qua: **🟢 Dat Lesson 01**

> Day la diem Lesson 01, khong phai diem final Module M1-4. Chua cap nhat `05_TIEN_DO.md`.

## 2. Diem theo nhom kien thuc

| Nhom | Cau | Diem | Trang thai |
|---|---|---:|---|
| Khai niem Validation/Business | 1, 2, 3 | 8.4/9 | 🟢 |
| Request flow va vi tri loi | 4, 6, 7, 8, 9 | 20.8/21 | 🟢 |
| GlobalExceptionHandler | 5, 10 | 13/13 | 🟢 |

## 3. Bang diem tung cau

| Cau | Ket qua | Diem | Nhan xet |
|---|---|---:|---|
| 1 | Gan dung | 2.7/3 | Sau khi noi lai luong, ban da tach duoc JSON/type mismatch khoi DTO validation; con thieu ten exception day du. |
| 2 | Gan dung | 2.7/3 | Hieu business error nam sau validation o Service; da noi dung AppException va status phu hop. |
| 3 | Dung | 3/3 | Da sua dung: `price = -1` la validation neu DTO co `@DecimalMin`; category missing la 404; SKU trung la 409. |
| 4 | Dung | 3/3 | Luong co Tomcat, FilterChain, DispatcherServlet, HandlerMapping, HandlerAdapter, Jackson, Validation, Controller, Service. |
| 5 | Dung | 3/3 | Hieu dung advice gom loi tap trung va tranh lap try/catch. |
| 6 | Dung | 3/3 | Dung exception `HttpMessageNotReadableException`, validation chua chay, Controller/Service khong chay, status 400. |
| 7 | Dung | 5/5 | Luong Jackson -> DTO -> `@Valid` -> validation fail -> khong vao Service/Repository da ro. |
| 8 | Dung | 5/5 | Hieu validation pass, Controller -> Service -> Repository, Service quyet dinh throw AppException, 404. |
| 9 | Gan dung | 4.8/5 | Da sua dung query param duoc Spring convert truoc khi goi method; exception dung la `MethodArgumentTypeMismatchException`. |
| 10 | Dung | 10/10 | Code handler dung du cac yeu cau, code co the dung voi style `ApiErrorResponse` hien tai. |

## 4. Loi can sua

### 4.1. `price = -1` phu thuoc noi dat rule

Trong de Lesson 01, DTO co validation gia:

```java
@DecimalMin(value = "0.0", inclusive = false)
private BigDecimal price;
```

Nen luong dung la:

```text
price = -1
-> Bean Validation fail
-> MethodArgumentNotValidException
-> 400
-> Service khong chay
```

Neu project khong dat annotation tren DTO ma Service tu check:

```java
if (price.signum() <= 0) {
    throw new AppException(...);
}
```

thi no moi la business rule do Service xu ly. Diem cot loi la phai nhin xem rule dang duoc dat o dau.

### 4.2. `page=abc` khong phai loi Jackson

Request:

```http
GET /api/products?page=abc
```

`abc` la query parameter, khong phai JSON body.

Luong dung:

```text
Spring doc query parameter page
-> co gang convert String "abc" thanh int
-> convert fail
-> MethodArgumentTypeMismatchException
-> Controller method khong chay
-> Service/Repository khong chay
-> 400
```

Nho phan biet:

```text
JSON body sai kieu -> HttpMessageNotReadableException
Query/path parameter sai kieu -> MethodArgumentTypeMismatchException
```

### 4.3. Ten exception can nho

Ban da nam duoc y nghia, nhung khi code/di thi nen goi chinh xac:

```text
@Valid @RequestBody fail
-> MethodArgumentNotValidException
```

Va voi query/path parameter sai kieu:

```text
page=abc
-> MethodArgumentTypeMismatchException
```

## 5. Ban da nam duoc gi?

- Biet validation duoc check truoc Service.
- Biet business error xay ra sau khi request da qua validation.
- Biet `AppException` la loi nghiep vu.
- Biet `GlobalExceptionHandler` gom loi tu nhieu Controller.
- Biet JSON parse fail thi Controller/Service chua chay.
- Biet category khong ton tai can Repository tra ket qua de Service quyet dinh 404.
- Viet dung handler cho `AppException`.

## 6. Phac do hoc lai

```text
Query parameter conversion
-> README Lesson 01 muc 5 va cau 9
-> 10 phut
-> Tu viet 3 vi du: page=abc, id=abc, size=xyz
```

```text
Exception mapping
-> README Lesson 01 bang exception can nho
-> 10 phut
-> Viet bang: loi -> exception -> status -> Controller co chay khong
```

```text
Validation vs business rule
-> README Lesson 01 muc 2-4
-> 10 phut
-> Phan loai 5 case: price am, SKU sai format, SKU trung, category null, category khong ton tai
```

## 7. Quyet dinh

```text
Lesson 01: 🟢 Dat - 98.1/100
Module M1-4: chua ket luan
```

Duoc hoc Lesson 02 - Jakarta Validation tren DTO. Chua tick Module M1-4 va chua mo Module M1-5.
