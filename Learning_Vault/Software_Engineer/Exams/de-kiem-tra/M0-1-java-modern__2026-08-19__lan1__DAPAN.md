# Dap an - De kiem tra nhanh M0-1 - Optional, Records va Sealed Classes

**Topic:** `M0-1-java-modern`  
**Che do:** `NHANH`  
**Trong tam:** Optional, Records, sealed classes Java 17+  
**Tong diem tho:** 43 diem  
**Normalize:** `(diem tho / 43) x 100`

---

## Phan A - Ly thuyet

### Cau 1 - 3 diem

- 1d: Optional bieu dien gia tri co the co hoac khong co.
- 1d: Giam null/NullPointerException va buoc caller xu ly truong hop vang mat.
- 1d: Nen dung o return type de noi ro method co the khong tim thay/khong co ket qua.

### Cau 2 - 3 diem

- 1d: `Optional.of(value)` dung khi chac chan value khac null.
- 1d: `Optional.ofNullable(value)` dung khi value co the null.
- 1d: `of(null)` nem `NullPointerException`, `ofNullable(null)` tra `Optional.empty()`.

### Cau 3 - 3 diem

- 1d: `map` dung khi function tra ve gia tri thuong `T -> R`.
- 1d: `flatMap` dung khi function tra ve Optional `T -> Optional<R>`.
- 1d: `flatMap` lam phang ket qua, tranh `Optional<Optional<R>>`.

### Cau 4 - 3 diem

- 1d: `orElse` nhan default value va default co the duoc tinh ngay.
- 1d: `orElseGet` nhan Supplier va chi goi khi Optional rong.
- 1d: Uu tien `orElseGet` khi default ton chi phi, goi method, query DB, goi API, tao object nang.

### Cau 5 - 3 diem

- 1d: Record la class du lieu bat bien/gon de chua data.
- 1d: Tu sinh constructor, accessor, `equals`, `hashCode`, `toString`.
- 1d: Accessor co dang `name()`, `id()`, khong phai `getName()`.

### Cau 6 - 3 diem

- 1d: Sealed class/interface gioi han tap subclass/implementation duoc phep.
- 1d: `sealed` dong tap con, `permits` liet ke class duoc ke thua/implement.
- 1d: Class con phai la `final`, `sealed`, hoac `non-sealed`; `final` chan ke thua tiep, `non-sealed` mo lai.

---

## Phan B - Tinh huong

### Cau 7 - 5 diem

Dap an tham khao:

```java
String name = findById(id)
        .map(Product::name)
        .orElse("Unknown product");
```

Cham diem:

- 2d: Dung `map(Product::name)` hoac lambda tuong duong.
- 1d: Dung `orElse("Unknown product")`.
- 1d: Giai thich `.get()` co the nem `NoSuchElementException` neu Optional rong.
- 1d: Noi duoc cach tren xu ly ro truong hop khong tim thay.

### Cau 8 - 5 diem

Dap an tham khao:

```java
String name = optionalName.orElseGet(() -> loadDefaultName());
```

Cham diem:

- 2d: Noi duoc `loadDefaultName()` trong `orElse(...)` se bi goi ngay ca khi Optional co gia tri.
- 2d: Viet lai dung `orElseGet(() -> loadDefaultName())` hoac `orElseGet(this::loadDefaultName)`.
- 1d: Giai thich `orElseGet` chi goi Supplier khi Optional rong.

### Cau 9 - 5 diem

Cham diem:

- 2d: Chon sealed interface/class vi checkout result co tap kha nang co dinh.
- 1d: Nen dung record cho implementation neu moi loai chi chua data.
- 1d: Neu duoc 2 implementation hop ly: `CheckoutSuccess`, `CheckoutFailed`.
- 1d: Giai thich loi ich: compiler/nguoi doc biet toan bo case hop le, tranh implementation tuy tien.

---

## Phan C - Code mini

### Cau 10 - 10 diem

Dap an tham khao:

```java
public record ProductResponse(Long id, String name, int price) {
}

public sealed interface CheckoutResult
        permits CheckoutSuccess, CheckoutFailed {
}

public record CheckoutSuccess(Long orderId, int totalPrice)
        implements CheckoutResult {
}

public record CheckoutFailed(String reason)
        implements CheckoutResult {
}
```

Cham diem:

- 2d: `ProductResponse` la record dung field.
- 2d: `CheckoutResult` la sealed interface dung ten.
- 2d: `permits CheckoutSuccess, CheckoutFailed` dung.
- 2d: `CheckoutSuccess` la record dung field va implements `CheckoutResult`.
- 1.5d: `CheckoutFailed` la record dung field va implements `CheckoutResult`.
- 0.5d: Cu phap Java 17+ ro rang, ten class/field hop ly.

