# Chua Tung Cau - M1-3 JPA Bai 03 @Transactional

> File de: `Exams/de-kiem-tra/M1-3-jpa__2026-09-12__bai3.md`  
> Ngay chua: 2026-09-12  
> Diem tong: **40/43 = 93/100 - Dat bai 03**

---

## Cau 1 - Transaction la gi? (3d)

### Ban dat: 3/3

### Nhan xet

Ban tra loi dung:

```text
Transaction gom mot hoac nhieu buoc thanh mot don vi cong viec.
Thanh cong thi commit.
Co loi thi rollback.
```

### Dap an nen viet

```text
Transaction la mot don vi cong viec voi database, gom mot hoac nhieu thao tac.
Neu tat ca thanh cong thi commit, cac thay doi duoc ghi chinh thuc.
Neu co loi can rollback thi huy cac thay doi trong transaction, dua du lieu ve trang thai truoc do.
```

---

## Cau 2 - @Transactional dat o dau? (3d)

### Ban dat: 3/3

### Nhan xet

Ban nam dung:

```text
Controller lo HTTP.
Service lo business/use case.
Transaction nen boc quanh use case o Service.
```

Ban cung da bo sung dung:

```text
read method -> readOnly=true
insert/update/remove -> @Transactional mac dinh
```

### Dap an nen viet

```text
@Transactional nen dat o Service vi Service dai dien cho use case nghiep vu.
Controller chi nhan request/tra response, khong nen quan ly commit/rollback.
Trong ProductService: create/update/delete dung @Transactional.
getById/list/search dung @Transactional(readOnly = true).
```

---

## Cau 3 - Rollback voi AppException (3d)

### Ban dat: 3/3

### Nhan xet

Dung trong tam:

```text
AppException extends RuntimeException.
Spring rollback mac dinh voi RuntimeException/Error.
```

### Dap an nen viet

```text
Co rollback. Vi AppException extends RuntimeException.
Spring mac dinh rollback transaction khi RuntimeException hoac Error duoc throw ra khoi method @Transactional.
```

---

## Cau 4 - Checked exception (3d)

### Ban dat: 2.3/3

### Nhan xet

Ban dung y:

```text
Checked exception khong rollback mac dinh.
Muon rollback thi phai chu dong cau hinh.
```

Thieu cu phap cu the.

### Dap an nen viet

```text
Spring khong rollback mac dinh voi checked exception.
Neu muon rollback voi checked exception thi khai bao:
```

```java
@Transactional(rollbackFor = SomeCheckedException.class)
```

### Can nho

```text
RuntimeException -> rollback mac dinh.
Checked exception -> rollbackFor neu muon rollback.
```

---

## Cau 5 - readOnly = true (3d)

### Ban dat: 2.7/3

### Nhan xet

Ban dung y:

```text
readOnly dung cho truy xuat/read.
Khong dung cho insert/update/remove.
```

Dien dat can nhe hon:

```text
readOnly=true khong nen hieu la cam 100% moi thay doi DB trong moi truong hop.
No la y dinh read-only/hint toi uu va giup code ro nghia.
```

### Dap an nen viet

```text
@Transactional(readOnly = true) dung cho method doc du lieu nhu getById, list, search paging.
Khong dung cho create/update/delete vi cac method do co y dinh ghi du lieu.
readOnly giup code ro y dinh va co the giup Hibernate/database toi uu.
```

---

## Cau 6 - Dirty checking (3d)

### Ban dat: 3/3

### Nhan xet

Ban tra loi tot:

```text
Managed entity.
Hibernate giu snapshot.
Set value moi.
Commit thi so snapshot, co thay doi thi update DB.
```

### Dap an nen viet

```text
Dirty checking la co che Hibernate theo doi managed entity trong transaction.
Khi entity duoc load trong transaction, Hibernate giu snapshot ban dau.
Neu ta set field moi, den luc commit Hibernate so sanh voi snapshot.
Neu co thay doi, Hibernate sinh SQL update.
Vi vay update co luc khong can goi save(product) neu entity dang managed.
```

---

## Cau 7 - Luong create co transaction (5d)

### Ban dat: 4.5/5

### Nhan xet

Ban nam dung:

```text
Vao method qua proxy.
Co @Transactional thi mo transaction.
Check SKU/Category/save ok.
Thanh cong thi commit.
AppException sau save thi rollback.
```

Can noi ro hon:

```text
Method ket thuc binh thuong thi commit.
Neu AppException xay ra truoc commit thi Product vua save khong duoc commit vao DB.
```

### Dap an nen viet

```text
Khi goi method @Transactional, Spring mo transaction.
Service check SKU ok, tim Category ok, save Product ok.
Neu method ket thuc binh thuong thi transaction commit.
Neu sau save xay ra AppException, vi AppException la RuntimeException nen transaction rollback.
Product vua save se khong duoc commit vao database.
```

---

## Cau 8 - Propagation REQUIRED (5d)

### Ban dat: 4.5/5

### Nhan xet

Ban noi dung truong hop:

```text
A co transaction goi B REQUIRED -> B dung chung transaction A.
```

Thieu nhe truong hop:

```text
Neu chua co transaction thi REQUIRED tao transaction moi.
```

### Dap an nen viet

```text
Propagation.REQUIRED la propagation mac dinh.
Neu method duoc goi khi da co transaction thi no tham gia transaction hien tai.
Neu chua co transaction thi Spring tao transaction moi.
Neu method A co transaction goi method B cung @Transactional(REQUIRED), B se dung chung transaction cua A.
```

---

## Cau 9 - Isolation nhan dien (5d)

### Ban dat: 4.5/5

### Nhan xet

Ban giai thich dung 3 hien tuong:

```text
Dirty read = doc du lieu chua commit.
Non-repeatable read = cung row nhung doc lai ra gia tri khac.
Phantom read = query range thay them/mat row.
```

Thieu nhe:

```text
Moi hoc khong nen tu doi isolation lung tung, dung default/tru khi co ly do ro.
```

### Dap an nen viet

```text
Dirty read la doc du lieu chua commit cua transaction khac.
Non-repeatable read la doc cung mot row hai lan nhung ket qua khac vi transaction khac commit update.
Phantom read la query theo range hai lan thay them hoac mat row vi transaction khac insert/delete.
Moi hoc khong nen tu doi isolation lung tung, nen dung default tru khi co ly do ro ve consistency/performance.
```

---

## Cau 10 - Code mini (10d)

### Ban dat: 9.5/10

### Nhan xet

Code cua ban dung gan tron ven:

```text
create co @Transactional.
getById co readOnly.
update co @Transactional.
create check duplicate SKU, tim Category, save Product.
getById throw PRODUCT_NOT_FOUND.
update set name/price va khong bat buoc save.
```

Thieu nhe:

```text
Nen ghi ro @Service thay vi "Service".
Format bi du dau ``` o cuoi.
```

### Dap an nen viet

```java
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

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

    @Transactional(readOnly = true)
    public ProductResponse getById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        return toResponse(product);
    }

    @Transactional
    public ProductResponse update(Long id, UpdateProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        product.setName(request.getName());
        product.setPrice(request.getPrice());

        return toResponse(product);
    }
}
```

---

## Ket luan

Bai 03 da dat.

Can nho sau bai nay:

```text
@Transactional dat o Service.
RuntimeException/AppException rollback mac dinh.
Checked exception can rollbackFor.
readOnly=true dung cho read method.
Dirty checking giup update managed entity khi commit.
REQUIRED la mac dinh: co transaction thi join, chua co thi tao moi.
```

Buoc tiep theo:

```text
M1-3 Bai 04 - Lazy vs Eager + relationship.
```
