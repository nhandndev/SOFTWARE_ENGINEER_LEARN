# README học lại: Optional, Records và Sealed Classes

File này dựa trên bài kiểm tra:

```text
Exams/de-kiem-tra/M0-1-java-modern__2026-08-19__lan1.md
```

Điểm hiện tại:

```text
32 / 43 = 74 / 100 -> Cần ôn
```

Bạn đang ổn ở phần Records và Sealed Classes. Phần cần học lại chủ yếu là Optional trong tình huống code thật.

---

## 1. Đánh giá bài làm

### Điểm mạnh

Bạn đã nắm khá tốt:

- `Optional.map` vs `Optional.flatMap`
- sealed class/interface dùng để giới hạn subclass/implementation
- `permits`, `final`, `non-sealed` ở mức nhận diện
- record dùng để viết DTO/request/response gọn
- code sealed interface + record implementation ở câu 10

Câu 10 của bạn rất ổn:

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

Phần này có thể giữ.

### Điểm còn sót

Bạn mất điểm nhiều ở:

- Chưa viết được chain Optional: `findById(id).map(...).orElse(...)`
- Nhầm hướng xử lý câu `orElse(loadDefaultName())`: bạn nhận ra vấn đề nhưng lại nói dùng `get`
- Chưa nói rõ `Optional.ofNullable(null)` trả về `Optional.empty()`
- Record không sinh setter
- Record sinh `hashCode`, không phải `hashmap`
- Accessor của record cần nói rõ dạng `name()`, `id()`, `price()`

---

## 2. Optional: hiểu đúng trước

`Optional<T>` nghĩa là:

> Có thể có một giá trị kiểu `T`, hoặc không có gì.

Ví dụ:

```java
Optional<Product>
```

nghĩa là:

> Có thể tìm thấy `Product`, cũng có thể không tìm thấy.

Optional thường nên dùng ở return type:

```java
public Optional<Product> findById(Long id) {
    // ...
}
```

Vì chữ ký method nói rõ:

> Method này có thể không trả về product.

Không nên hiểu Optional là "field có thể null". Cách nói chuẩn hơn:

> Optional biểu diễn kết quả có thể vắng mặt, giúp caller buộc phải xử lý trường hợp không có giá trị.

---

## 3. `Optional.of` vs `Optional.ofNullable`

### `Optional.of(value)`

Dùng khi chắc chắn value không null.

```java
Optional<String> name = Optional.of("Nhan");
```

Nếu value null:

```java
Optional.of(null); // NullPointerException
```

### `Optional.ofNullable(value)`

Dùng khi value có thể null.

```java
String name = null;
Optional<String> optionalName = Optional.ofNullable(name);
```

Nếu value null:

```java
Optional.empty()
```

Câu trả lời mẫu:

> `Optional.of(value)` dùng khi chắc chắn value khác null, nếu truyền null sẽ ném `NullPointerException`. `Optional.ofNullable(value)` dùng khi value có thể null, nếu value null thì trả về `Optional.empty()`.

---

## 4. Chain quan trọng nhất: `map(...).orElse(...)`

Đây là câu bạn sai nhiều nhất.

Đề:

```java
Optional<Product> findById(Long id)
```

Yêu cầu:

> Lấy tên product nếu tìm thấy, không có thì trả `"Unknown product"`.

Code đúng:

```java
String name = findById(id)
        .map(Product::name)
        .orElse("Unknown product");
```

Đọc từng bước:

```java
findById(id)
```

Trả về:

```java
Optional<Product>
```

Tiếp:

```java
.map(Product::name)
```

Nếu có product, lấy name. Kết quả thành:

```java
Optional<String>
```

Tiếp:

```java
.orElse("Unknown product")
```

Nếu có name thì lấy name. Nếu không có thì dùng `"Unknown product"`.

### Viết bằng lambda nếu chưa quen method reference

```java
String name = findById(id)
        .map(product -> product.name())
        .orElse("Unknown product");
```

Hai cách này tương đương:

```java
Product::name
product -> product.name()
```

### Không viết kiểu này

Sai:

```java
Optional<Product> findById(Long id).orElse
```

Vì đây không phải Java expression hợp lệ.

Sai:

```java
Product product = findById(id).get();
String name = product.name();
```

Vì nếu không tìm thấy product, `.get()` ném `NoSuchElementException`.

---

## 5. Vì sao hạn chế `.get()`

`.get()` lấy giá trị bên trong Optional.

```java
Product product = optionalProduct.get();
```

Nếu Optional có giá trị thì chạy được.

Nếu Optional rỗng:

```java
Optional.empty().get(); // NoSuchElementException
```

Vậy `.get()` rất giống việc bạn bỏ qua null-check.

Không nên:

```java
String name = findById(id).get().name();
```

Nên:

```java
String name = findById(id)
        .map(Product::name)
        .orElse("Unknown product");
```

Hoặc nếu không có product thì muốn báo lỗi:

```java
Product product = findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Product not found"));
```

Câu trả lời mẫu:

> Cách `map(...).orElse(...)` tốt hơn `.get()` vì nó xử lý rõ trường hợp Optional rỗng. `.get()` có thể ném `NoSuchElementException` nếu không có giá trị.

---

## 6. `orElse` vs `orElseGet`

Đây là câu bạn hiểu ý nhưng chọn sai cách sửa.

Code đề:

```java
String name = optionalName.orElse(loadDefaultName());
```

Vấn đề:

```java
loadDefaultName()
```

sẽ được gọi ngay, kể cả khi `optionalName` đã có giá trị.

Nếu `loadDefaultName()` gọi database, code này tốn chi phí vô ích.

### Cách đúng

```java
String name = optionalName.orElseGet(() -> loadDefaultName());
```

Hoặc nếu là instance method:

```java
String name = optionalName.orElseGet(this::loadDefaultName);
```

### Tại sao đúng?

`orElseGet` nhận Supplier:

```java
() -> loadDefaultName()
```

Supplier này chỉ chạy khi Optional rỗng.

### Không dùng `.get()`

Sai:

```java
String name = optionalName.get();
```

Vì:

- Nếu Optional rỗng thì lỗi.
- Nó không tạo default.
- Nó không giải quyết bài toán "nếu không có thì load default".

Câu trả lời mẫu:

> `orElse(loadDefaultName())` có vấn đề vì `loadDefaultName()` được gọi ngay cả khi Optional có giá trị. Nếu method đó gọi database thì tốn chi phí vô ích. Nên dùng `orElseGet(() -> loadDefaultName())` để chỉ gọi khi Optional rỗng.

---

## 7. `map` vs `flatMap`

Bạn làm phần này tốt, chỉ cần giữ chắc.

### `map`

Dùng khi function trả về giá trị thường.

```java
Optional<Product> product = findById(id);

Optional<String> name = product.map(Product::name);
```

Ở đây:

```java
Product -> String
```

Nên dùng `map`.

### `flatMap`

Dùng khi function đã trả về Optional.

Ví dụ:

```java
public Optional<String> findDiscountCode(Product product) {
    return Optional.ofNullable(product.discountCode());
}
```

Dùng đúng:

```java
Optional<String> discountCode = findById(id)
        .flatMap(product -> findDiscountCode(product));
```

Nếu dùng `map`:

```java
Optional<Optional<String>> discountCode = findById(id)
        .map(product -> findDiscountCode(product));
```

Bị lồng Optional.

Câu trả lời mẫu:

> `map` dùng khi function trả về giá trị thường `T -> R`. `flatMap` dùng khi function trả về `Optional<R>`, để làm phẳng và tránh `Optional<Optional<R>>`.

---

## 8. Record: sửa các chi tiết sai

Bạn hiểu record là class dữ liệu gọn và bất biến. Đúng.

Nhưng cần sửa mấy điểm:

### Record không sinh setter

Record là immutable theo mặc định, nên không có setter.

Record:

```java
public record ProductResponse(Long id, String name, int price) {}
```

Dùng:

```java
ProductResponse response = new ProductResponse(1L, "Keyboard", 500);
```

Lấy dữ liệu:

```java
response.id();
response.name();
response.price();
```

Không có:

```java
response.setName("Mouse"); // không có
```

### Record sinh `hashCode`, không phải `hashmap`

Record tự sinh:

- constructor
- accessor: `id()`, `name()`, `price()`
- `equals`
- `hashCode`
- `toString`

Câu trả lời mẫu:

> Record là class dữ liệu bất biến, phù hợp cho DTO/request/response/value object nhỏ. Record tự sinh constructor, accessor, `equals`, `hashCode`, `toString`. Accessor có dạng `name()`, `id()`, không phải `getName()`.

---

## 9. Sealed: câu trả lời chuẩn

Bạn làm phần sealed khá tốt.

Câu trả lời nên gọn như sau:

> Sealed class/interface dùng để giới hạn những class nào được phép kế thừa hoặc implement nó. `sealed` khai báo kiểu bị giới hạn, `permits` liệt kê các class được phép kế thừa/implement. Class con phải chọn `final`, `sealed`, hoặc `non-sealed`: `final` không cho kế thừa tiếp, `sealed` tiếp tục giới hạn, `non-sealed` mở lại cho kế thừa tự do.

Ví dụ:

```java
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

Tại sao hợp với checkout?

> Vì checkout chỉ có tập kết quả cố định: thành công hoặc thất bại. Sealed interface giúp người đọc và compiler biết toàn bộ case hợp lệ.

---

## 10. Mẫu code phải thuộc

### Lấy field từ Optional object

```java
String name = findById(id)
        .map(Product::name)
        .orElse("Unknown product");
```

### Dùng default tốn chi phí

```java
String name = optionalName.orElseGet(() -> loadDefaultName());
```

### Throw nếu không có

```java
Product product = findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Product not found"));
```

### Record DTO

```java
public record ProductResponse(Long id, String name, int price) {
}
```

### Sealed result

```java
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

---

## 11. Bài tập làm lại

### Bài 1

Cho:

```java
Optional<Product> findById(Long id)
```

Viết code lấy price nếu có product, không có thì trả `0`.

Đáp án:

```java
int price = findById(id)
        .map(Product::price)
        .orElse(0);
```

### Bài 2

Cho:

```java
String defaultName = loadDefaultName();
```

`loadDefaultName()` gọi database. Viết code chỉ gọi method này khi Optional rỗng.

Đáp án:

```java
String name = optionalName.orElseGet(() -> loadDefaultName());
```

### Bài 3

Viết record `UserResponse` gồm `Long id`, `String email`.

Đáp án:

```java
public record UserResponse(Long id, String email) {
}
```

### Bài 4

Viết sealed interface `PaymentResult` có 2 implementation: `PaymentSuccess(String transactionId)` và `PaymentFailed(String reason)`.

Đáp án:

```java
public sealed interface PaymentResult
        permits PaymentSuccess, PaymentFailed {
}

public record PaymentSuccess(String transactionId)
        implements PaymentResult {
}

public record PaymentFailed(String reason)
        implements PaymentResult {
}
```

---

## 12. Checklist trước khi thi lại

Bạn sẵn sàng thi lại nếu tự viết được không nhìn note:

- `findById(id).map(Product::name).orElse("Unknown product")`
- `optionalName.orElseGet(() -> loadDefaultName())`
- Giải thích vì sao không gọi `.get()` bừa
- `Optional.of(null)` vs `Optional.ofNullable(null)`
- Record không sinh setter
- Record accessor là `name()`, không phải `getName()`
- Sealed interface + `permits`
- Record implementation cho sealed result

