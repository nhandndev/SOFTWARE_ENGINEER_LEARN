# M1-3 Bai 03 - @Transactional

> Muc tieu bai 03: hieu `@Transactional` de lam gi, nen dat o dau, khi nao commit/rollback, vi sao `AppException` rollback, va `readOnly = true` co y nghia gi.

---

## 1. Vi sao can transaction?

Transaction la mot don vi cong viec voi database:

```text
Tat ca thao tac thanh cong -> commit.
Co loi -> rollback.
```

Vi du tao Product don gian:

```text
1. Check SKU trung.
2. Tim Category.
3. Tao Product.
4. Save Product.
```

Neu chi co mot `save`, nghe co ve khong can transaction. Nhung project that se co nhieu thao tac lien quan:

```text
1. Tao Order.
2. Tao OrderItem.
3. Tru ton kho.
4. Tao Payment record.
```

Neu buoc 3 loi ma buoc 1-2 da luu vao DB thi du lieu se bi nua voi:

```text
Co Order nhung khong tru stock.
Co OrderItem nhung Order failed.
```

Transaction giup dam bao:

```text
Thanh cong het thi luu het.
Loi thi quay lai nhu chua lam gi.
```

---

## 2. @Transactional nen dat o dau?

Nen dat o **Service**, khong dat lung tung o Controller.

Vi:

```text
Controller hieu HTTP.
Service hieu use case nghiep vu.
Repository hieu database.
```

Transaction nen boc quanh mot use case nghiep vu:

```java
@Service
public class ProductService {
    @Transactional
    public ProductResponse create(CreateProductRequest request) {
        ...
    }
}
```

Khong nen:

```java
@RestController
public class ProductController {
    @Transactional
    @PostMapping
    public ResponseEntity<?> create(...) { ... }
}
```

Ly do:

```text
Controller khong nen quan tam commit/rollback.
Service moi la noi biet mot use case can gom nhung thao tac nao.
```

---

## 3. Luong create Product co @Transactional

Code:

```java
@Transactional
public ProductResponse create(CreateProductRequest request) {
    if (productRepository.existsBySku(request.getSku())) {
        throw new AppException(ErrorCode.DUPLICATE_SKU);
    }

    Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

    Product product = Product.builder()
            .sku(request.getSku())
            .name(request.getName())
            .price(request.getPrice())
            .category(category)
            .build();

    Product saved = productRepository.save(product);

    return toResponse(saved);
}
```

Luong chay:

```text
1. Service method bat dau.
2. Spring mo transaction.
3. Check SKU.
4. Tim Category.
5. Tao Product.
6. save Product.
7. Neu khong loi -> commit transaction.
8. Neu RuntimeException/AppException -> rollback transaction.
```

Noi gon:

```text
Vao method @Transactional -> mo transaction.
Method ket thuc binh thuong -> commit.
Method nem RuntimeException -> rollback.
```

---

## 4. Rollback la gi?

Rollback la huy cac thay doi DB trong transaction.

Vi du:

```java
@Transactional
public void createSomething() {
    productRepository.save(productA);
    productRepository.save(productB);
    throw new RuntimeException("failed");
}
```

Neu `productA` va `productB` cung trong transaction:

```text
RuntimeException xay ra
-> rollback
-> productA khong duoc luu
-> productB khong duoc luu
```

---

## 5. AppException co rollback khong?

Trong project ban:

```java
public class AppException extends RuntimeException {
    ...
}
```

Mac dinh Spring rollback voi:

```text
RuntimeException
Error
```

Vay:

```text
throw new AppException(...)
```

se rollback transaction.

Vi du:

```java
@Transactional
public ProductResponse create(CreateProductRequest request) {
    Product saved = productRepository.save(product);

    if (someBusinessError) {
        throw new AppException(ErrorCode.INVALID_PRODUCT_INPUT);
    }

    return toResponse(saved);
}
```

Neu `AppException` xay ra sau `save`, transaction rollback, Product khong duoc commit vao DB.

---

## 6. Checked exception thi sao?

Mac dinh Spring **khong rollback** voi checked exception.

Checked exception la exception khong extends `RuntimeException`, vi du:

```java
public class MyCheckedException extends Exception {}
```

Neu muon rollback voi checked exception:

```java
@Transactional(rollbackFor = MyCheckedException.class)
public void doSomething() throws MyCheckedException {
    ...
}
```

O giai doan nay, ban chi can nho:

```text
RuntimeException/AppException -> rollback mac dinh.
Checked exception -> khong rollback mac dinh, tru khi khai bao rollbackFor.
```

---

## 7. readOnly = true la gi?

Voi method chi doc du lieu:

```java
@Transactional(readOnly = true)
public ProductResponse getById(Long id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

    return toResponse(product);
}
```

`readOnly = true` noi rang:

```text
Method nay chu yeu de doc du lieu, khong co y dinh ghi DB.
```

Loi ich:

```text
Code ro y dinh.
Co the toi uu voi Hibernate/database tuy config.
Giam rui ro vo tinh write trong read method.
```

Dung cho:

```text
getById
getProducts paging
search
list
```

Khong dung cho:

```text
create
update
delete
```

---

## 8. Dirty checking lien quan transaction the nao?

Trong transaction, entity lay tu DB la managed entity.

Vi du update Product:

```java
@Transactional
public ProductResponse update(Long id, UpdateProductRequest request) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

    product.setName(request.getName());
    product.setPrice(request.getPrice());

    return toResponse(product);
}
```

Khong thay goi:

```java
productRepository.save(product);
```

Nhung Hibernate van co the update DB khi transaction commit.

Vi sao?

```text
product duoc lay trong transaction.
Hibernate quan ly product do.
Ban thay doi field.
Khi commit, Hibernate so voi snapshot ban dau.
Neu thay doi, Hibernate sinh SQL update.
```

Do la dirty checking.

Nho:

```text
Managed entity + thay doi field + transaction commit -> Hibernate update DB.
```

Moi hoc, ban co the goi `save(product)` sau update cho de doc, nhung can biet dirty checking ton tai.

---

## 9. Propagation la gi?

Propagation tra loi cau hoi:

```text
Method @Transactional nay duoc goi khi da co transaction roi thi lam gi?
Dung transaction cu hay tao transaction moi?
```

Mac dinh:

```text
Propagation.REQUIRED
```

Y nghia:

```text
Neu da co transaction -> tham gia transaction do.
Neu chua co transaction -> tao transaction moi.
```

Vi du:

```java
@Transactional
public void createOrder() {
    saveOrder();
    saveOrderItems();
}

@Transactional
public void saveOrderItems() {
    ...
}
```

Neu `createOrder()` dang co transaction, `saveOrderItems()` voi REQUIRED se tham gia transaction hien tai.

Ket qua:

```text
Mot transaction chung cho ca createOrder va saveOrderItems.
```

O M1-3, chi can chac:

```text
REQUIRED la mac dinh va hay dung nhat.
```

---

## 10. REQUIRES_NEW la gi?

`REQUIRES_NEW`:

```text
Tam dung transaction hien tai.
Mo transaction moi rieng.
```

Vi du hay gap:

```text
Ghi audit log rieng, du nghiep vu chinh rollback van muon log commit.
```

Code y tuong:

```java
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void saveAuditLog(...) {
    ...
}
```

Bai nay chi can nhan dien, chua can dung.

---

## 11. Isolation la gi?

Isolation noi ve viec transaction nay nhin thay du lieu cua transaction khac nhu the nao.

Van de co the gap:

### Dirty read

```text
Doc du lieu chua commit cua transaction khac.
```

### Non-repeatable read

```text
Cung mot row, doc lan 1 va lan 2 ra khac nhau vi transaction khac commit update.
```

### Phantom read

```text
Cung mot query range, lan 2 thay them/mat row vi transaction khac insert/delete.
```

Muc hay nghe:

```text
READ_COMMITTED
REPEATABLE_READ
SERIALIZABLE
```

O giai doan nay:

```text
Hieu ten va van de la du.
Khong tu doi isolation neu khong co ly do.
```

---

## 12. Self-invocation can biet nhe

Spring `@Transactional` hoat dong qua proxy.

Neu method trong cung class goi nhau bang `this.method()`, transaction annotation tren method duoc goi co the khong duoc ap dung nhu ban nghi.

Vi du:

```java
public void outer() {
    this.inner();
}

@Transactional
public void inner() {
    ...
}
```

`inner()` co the khong di qua Spring proxy.

O giai doan nay chi can nhan dien:

```text
@Transactional can duoc goi qua Spring bean/proxy de hoat dong dung.
```

---

## 13. Transaction voi private method

Khong nen dat `@Transactional` tren private method.

Vi Spring proxy thuong chi intercept public method cua bean.

Dung:

```java
@Transactional
public ProductResponse create(...) {}
```

Khong nen:

```java
@Transactional
private void saveSomething() {}
```

---

## 14. Transaction trong shopcore nen dung the nao?

### Create

```java
@Transactional
public ProductResponse create(CreateProductRequest request) {}
```

### Update

```java
@Transactional
public ProductResponse update(Long id, UpdateProductRequest request) {}
```

### Delete

```java
@Transactional
public void delete(Long id) {}
```

### Read detail

```java
@Transactional(readOnly = true)
public ProductResponse getById(Long id) {}
```

### List/search paging

```java
@Transactional(readOnly = true)
public PageResponse<ProductResponse> getProducts(...) {}
```

---

## 15. Loi thuong gap

### Loi 1: Dat @Transactional o Controller

Sai vi Controller la web layer.

Nen dat o Service.

### Loi 2: Tuong checked exception rollback mac dinh

Sai.

Mac dinh rollback voi RuntimeException.

### Loi 3: Quen readOnly cho query

Khong phai loi nghiem trong, nhung nen dung de doc ro y dinh.

### Loi 4: Nghi update bat buoc phai save

Trong transaction, managed entity thay doi field co the duoc dirty checking update khi commit.

### Loi 5: Goi @Transactional method trong cung class roi nghi proxy chay

Can can than self-invocation.

---

## 16. Checklist pass bai 03

- [ ] Giai thich transaction la commit/rollback mot don vi cong viec.
- [ ] Biet dat `@Transactional` o Service.
- [ ] Biet method write dung `@Transactional`.
- [ ] Biet method read dung `@Transactional(readOnly = true)`.
- [ ] Biet RuntimeException/AppException rollback mac dinh.
- [ ] Biet checked exception khong rollback mac dinh.
- [ ] Giai thich duoc dirty checking.
- [ ] Biet `REQUIRED` la propagation mac dinh.
- [ ] Nhan dien `REQUIRES_NEW`.
- [ ] Nhan dien dirty read, non-repeatable read, phantom read.

---

## 17. Tom tat 10 dong

```text
Transaction gom nhieu thao tac DB thanh mot don vi.
Thanh cong thi commit.
RuntimeException/AppException thi rollback.
@Transactional nen dat o Service.
Create/update/delete dung @Transactional.
Read/list/search dung @Transactional(readOnly = true).
findById trong transaction tra managed entity.
Managed entity doi field se duoc dirty checking khi commit.
Propagation REQUIRED la mac dinh.
Isolation noi transaction nhin thay du lieu cua nhau ra sao.
Dung @Transactional qua Spring proxy, can than self-invocation.
```

