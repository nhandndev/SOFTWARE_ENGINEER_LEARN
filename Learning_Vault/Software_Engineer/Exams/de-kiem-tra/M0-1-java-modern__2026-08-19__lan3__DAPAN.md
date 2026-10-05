# Dap an - De kiem tra DAY_DU M0-1 - Java hien dai

**Topic:** `M0-1-java-modern`  
**Che do:** `DAY_DU`  
**Lan:** 3  
**Tong diem tho:** 90 diem  
**Normalize:** `(diem tho / 90) x 100`

---

## Phan A - Ly thuyet

### Cau 1 - 3 diem

- 1d: Generics giup class/method/interface dung duoc voi nhieu kieu du lieu.
- 1d: Type-safe luc compile-time.
- 1d: Giam cast thu cong va han che `ClassCastException` runtime.

### Cau 2 - 3 diem

- 1d: `T extends Number` gioi han `T` la `Number` hoac subtype cua `Number`.
- 1d: Vi du: `Integer`, `Double`, `Long`, `Float`.
- 1d: Goi duoc `doubleValue()` vi compiler biet `T` la mot dang `Number`.

### Cau 3 - 3 diem

- 1d: PECS = Producer Extends, Consumer Super.
- 1d: `? extends T` dung khi chu yeu doc du lieu ra.
- 1d: `? super T` dung khi chu yeu ghi/add du lieu vao.

### Cau 4 - 3 diem

- 1d: Functional Interface co dung mot abstract method.
- 1d: Lambda la cach implement/truyen hanh vi cho abstract method do.
- 1d: Method reference la dang rut gon cua lambda khi chi goi method co san.

### Cau 5 - 3 diem

- 1d: Stream la pipeline xu ly du lieu, khong phai collection luu tru du lieu.
- 1d: Intermediate operation nhu `filter`, `map`, `flatMap` la lazy.
- 1d: Terminal operation nhu `toList`, `collect`, `reduce`, `count` lam pipeline chay.

### Cau 6 - 3 diem

- 1d: `filter` giu lai phan tu thoa dieu kien boolean.
- 1d: `map` bien doi tung phan tu sang gia tri khac.
- 1d: `filter` thuong khong doi kieu; `map` co the doi kieu.

### Cau 7 - 3 diem

- 1d: `reduce` gom nhieu phan tu thanh mot gia tri.
- 1d: Vi du hop ly: tinh tong, tich, max/min, tong tien.
- 1d: Neu duoc y tuong identity + accumulator, vi du `reduce(0, Integer::sum)`.

### Cau 8 - 3 diem

- 1d: `map` bien moi phan tu thanh mot gia tri, co the tao cau truc long.
- 1d: `flatMap` bien moi phan tu thanh stream/collection con roi lam phang.
- 1d: Dung `flatMap` khi co list/stream long nhau, vi du orders -> items.

### Cau 9 - 3 diem

- 1d: `Optional.of(value)` dung khi value chac chan khac null.
- 1d: `Optional.of(null)` nem `NullPointerException`.
- 1d: `Optional.ofNullable(null)` tra `Optional.empty()`.

### Cau 10 - 3 diem

- 1d: Record la class du lieu bat bien/gon, hop DTO/request/response/value object.
- 1d: Sealed class/interface gioi han tap subclass/implementation hop le.
- 1d: Neu vi du hop ly cho record va sealed.

---

## Phan B - Tinh huong

### Cau 11 - 5 diem

- 2d: Noi duoc `List<Integer>` khong phai subtype cua `List<Number>`.
- 1d: Neu Java cho phep co the add sai subtype, vi du Double vao list Integer.
- 1d: Signature dung: `List<? extends Number>`.
- 1d: Vi method chi doc de tinh tong nen `extends` phu hop.

### Cau 12 - 5 diem

- 2d: Dung `List<? super Integer>`.
- 1d: Nhan duoc `List<Integer>`, `List<Number>`, `List<Object>`.
- 1d: Add Integer an toan vi Integer la Integer/Number/Object.
- 1d: Doc ra chi chac chan la Object vi list thuc te co the la `List<Object>`.

### Cau 13 - 5 diem

Dap an tham khao:

```java
List<String> names = products.stream()
        .filter(Product::active)
        .map(Product::name)
        .toList();
```

- 2d: Dung `filter` de loc active.
- 2d: Dung `map` de lay name.
- 1d: Co terminal operation nhu `toList`.

### Cau 14 - 5 diem

Dap an tham khao:

```java
Map<String, List<Product>> byCategory = products.stream()
        .collect(Collectors.groupingBy(Product::category));
```

- 2d: Dung `collect`.
- 2d: Dung `Collectors.groupingBy`.
- 1d: Key la category, value la list product.

### Cau 15 - 5 diem

Dap an tham khao:

```java
List<OrderItem> items = orders.stream()
        .flatMap(order -> order.items().stream())
        .toList();
```

- 2d: Dung `flatMap`.
- 1d: Chuyen moi order thanh stream items.
- 1d: Ket qua la list phang cac item.
- 1d: Giai thich `map` se tao cau truc long nhu `List<List<OrderItem>>`/`Stream<Stream<...>>`.

### Cau 16 - 5 diem

Dap an tham khao:

```java
String name = findById(id)
        .map(Product::name)
        .orElse("Unknown product");
```

- 2d: Dung `map(Product::name)` hoac lambda tuong duong.
- 1d: Dung `orElse("Unknown product")`.
- 1d: `.get()` co the nem `NoSuchElementException` neu Optional rong.
- 1d: Cach tren xu ly ro truong hop khong tim thay.

### Cau 17 - 5 diem

Dap an tham khao:

```java
String name = optionalName.orElseGet(() -> loadDefaultName());
```

- 2d: Noi duoc `orElse(loadDefaultName())` goi method ngay ca khi Optional co gia tri.
- 2d: Dung `orElseGet(() -> loadDefaultName())` hoac method reference.
- 1d: Giai thich `orElseGet` chi goi khi Optional rong.

### Cau 18 - 5 diem

- 2d: Chon sealed interface/class vi checkout result co tap kha nang co dinh.
- 1d: Neu 2 implementation hop ly: `CheckoutSuccess`, `CheckoutFailed`.
- 1d: Nen dung record cho implementation neu moi case chi chua data.
- 1d: Giai thich sealed lam ro toan bo case hop le va chan implementation tuy tien.

---

## Phan C - Code mini

### Cau 19 - 10 diem

Dap an tham khao:

```java
public class Result<T> {
    private final boolean success;
    private final String message;
    private final T data;

    private Result(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static <T> Result<T> ok(T data) {
        return new Result<>(true, "OK", data);
    }

    public static <T> Result<T> fail(String message) {
        return new Result<>(false, message, null);
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }
}
```

- 2d: Class generic `Result<T>` dung.
- 2d: 3 field dung kieu/modifier.
- 2d: Private constructor gan du field.
- 2d: `ok(T data)` dung static generic method va dung gia tri.
- 1d: `fail(String message)` dung static generic method va dung gia tri.
- 1d: Getter dung.

### Cau 20 - 10 diem

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

- 2d: `ProductResponse` la record dung field.
- 2d: `CheckoutResult` la sealed interface dung ten.
- 2d: `permits CheckoutSuccess, CheckoutFailed` dung.
- 2d: `CheckoutSuccess` la record dung field va implements `CheckoutResult`.
- 1.5d: `CheckoutFailed` la record dung field va implements `CheckoutResult`.
- 0.5d: Cu phap Java 17+ ro rang.

