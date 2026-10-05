# Dap an - De thi lai M0-1 - Optional, Records va Sealed Classes

**Topic:** `M0-1-java-modern`  
**Che do:** `THI_LAI`  
**Lan:** 2  
**Tong diem tho:** 31 diem  
**Normalize:** `(diem tho / 31) x 100`

---

## Phan A - Ly thuyet ngan

### Cau 1 - 3 diem

- 1d: `Optional.of(value)` dung khi value chac chan khac null.
- 1d: `Optional.of(null)` nem `NullPointerException`.
- 1d: `Optional.ofNullable(null)` tra `Optional.empty()`.

### Cau 2 - 3 diem

- 1d: `.get()` bo qua viec xu ly truong hop rong.
- 1d: Neu Optional rong, `.get()` nem `NoSuchElementException`.
- 1d: Nen dung `orElse`, `orElseGet`, `orElseThrow`, hoac `map(...).orElse(...)` tuy tinh huong.

### Cau 3 - 3 diem

- 1d: `orElse(loadDefaultName())` se tinh/goi `loadDefaultName()` ngay ca khi Optional co gia tri.
- 1d: `orElseGet(() -> loadDefaultName())` chi goi Supplier khi Optional rong.
- 1d: Nen dung `orElseGet` khi default ton chi phi nhu query DB/goi API/tao object nang.

### Cau 4 - 3 diem

- 1d: Record khong sinh setter.
- 1d: Record tu sinh constructor, accessor, `equals`, `hashCode`, `toString`.
- 1d: Accessor co dang `name()`, khong phai `getName()`.

---

## Phan B - Tinh huong code

### Cau 5 - 5 diem

Dap an:

```java
String name = findById(id)
        .map(Product::name)
        .orElse("Unknown product");
```

Cham diem:

- 2d: Goi `findById(id)` dung.
- 1.5d: Dung `map(Product::name)` hoac lambda tuong duong.
- 1.5d: Dung `orElse("Unknown product")`.

### Cau 6 - 5 diem

Dap an:

```java
int price = findById(id)
        .map(Product::price)
        .orElse(0);
```

Cham diem:

- 2d: Goi `findById(id)` dung.
- 1.5d: Dung `map(Product::price)` hoac lambda tuong duong.
- 1.5d: Dung `orElse(0)`.

### Cau 7 - 5 diem

Dap an:

```java
String name = optionalName.orElseGet(() -> loadDefaultName());
```

Hoac:

```java
String name = optionalName.orElseGet(this::loadDefaultName);
```

Cham diem:

- 2d: Dung `orElseGet`.
- 2d: Truyen Supplier dung bang lambda hoac method reference.
- 1d: Dam bao chi goi `loadDefaultName()` khi Optional rong.

---

## Phan C - Nhan dien sealed/record

### Cau 8 - 4 diem

Cham diem:

- 2d: Chon sealed interface/class vi tap ket qua checkout co dinh.
- 1d: Neu 2 implementation hop ly: `CheckoutSuccess`, `CheckoutFailed`.
- 1d: Giai thich sealed giup gioi han implementation va lam ro toan bo case hop le.

