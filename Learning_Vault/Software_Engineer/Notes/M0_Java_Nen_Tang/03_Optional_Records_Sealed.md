# Bài học: Optional, Records và Sealed Classes

File này gồm 2 phần còn lại của M0-1:

- `Optional`: `of`, `ofNullable`, `map`, `flatMap`, `orElse`, `orElseGet`, tránh anti-pattern.
- Records và sealed classes Java 17+: nhận diện và biết dùng khi hợp lý.

---

# Phần 1: Optional

## 1. Optional là gì?

`Optional<T>` là một object bọc quanh một giá trị có thể có hoặc không có.

Nói dễ hiểu:

```java
Optional<String>
```

nghĩa là:

> Có thể có một `String`, cũng có thể không có gì.

Mục tiêu của Optional:

- Giảm lỗi `NullPointerException`.
- Làm rõ trong chữ ký method rằng kết quả có thể vắng mặt.
- Buộc người dùng xử lý trường hợp không có giá trị.

Ví dụ không dùng Optional:

```java
public User findUserById(Long id) {
    if (id == 1L) {
        return new User("Nhan");
    }
    return null;
}
```

Người gọi dễ quên check null:

```java
User user = findUserById(2L);
System.out.println(user.name()); // NullPointerException
```

Dùng Optional:

```java
public Optional<User> findUserById(Long id) {
    if (id == 1L) {
        return Optional.of(new User("Nhan"));
    }
    return Optional.empty();
}
```

Người gọi thấy ngay: có thể không có user.

```java
Optional<User> user = findUserById(2L);
```

---

## 2. `Optional.of`

`Optional.of(value)` dùng khi bạn chắc chắn `value` không null.

```java
Optional<String> name = Optional.of("Nhan");
```

Nếu truyền null:

```java
Optional<String> name = Optional.of(null); // NullPointerException
```

Câu cần nhớ:

> Dùng `Optional.of(value)` khi chắc chắn value khác null.

---

## 3. `Optional.ofNullable`

`Optional.ofNullable(value)` dùng khi value có thể null.

```java
String input = null;

Optional<String> name = Optional.ofNullable(input);
```

Nếu `input` null, kết quả là:

```java
Optional.empty()
```

Nếu `input` khác null, kết quả là:

```java
Optional[input]
```

Ví dụ:

```java
public Optional<String> normalizeName(String name) {
    return Optional.ofNullable(name);
}
```

Câu cần nhớ:

> Dùng `Optional.ofNullable(value)` khi value có thể null.

---

## 4. `Optional.empty`

`Optional.empty()` nghĩa là không có giá trị.

```java
Optional<User> user = Optional.empty();
```

Ví dụ method tìm user:

```java
public Optional<User> findUserByEmail(String email) {
    if ("a@example.com".equals(email)) {
        return Optional.of(new User(email));
    }
    return Optional.empty();
}
```

---

## 5. `isPresent` và `get`

Bạn có thể kiểm tra Optional có giá trị không:

```java
Optional<String> name = Optional.of("Nhan");

if (name.isPresent()) {
    System.out.println(name.get());
}
```

Nhưng đây thường không phải cách đẹp nhất. Nó gần giống check null kiểu cũ.

Đặc biệt tránh:

```java
String value = optional.get(); // nguy hiểm nếu Optional.empty()
```

Nếu Optional rỗng, `get()` sẽ ném:

```java
NoSuchElementException
```

Câu cần nhớ:

> Không gọi `get()` trực tiếp nếu chưa xử lý trường hợp Optional rỗng.

---

## 6. `orElse`

`orElse(defaultValue)` trả về giá trị bên trong Optional nếu có; nếu không có thì trả về default.

```java
Optional<String> name = Optional.empty();

String result = name.orElse("Anonymous");

System.out.println(result); // Anonymous
```

Nếu Optional có giá trị:

```java
Optional<String> name = Optional.of("Nhan");

String result = name.orElse("Anonymous");

System.out.println(result); // Nhan
```

Câu cần nhớ:

> `orElse` dùng khi default value đã có sẵn và tính toán nhẹ.

---

## 7. `orElseGet`

`orElseGet(() -> defaultValue)` cũng trả về default khi Optional rỗng, nhưng default được tạo bằng Supplier.

```java
Optional<String> name = Optional.empty();

String result = name.orElseGet(() -> "Anonymous");
```

Khác biệt quan trọng:

- `orElse(...)`: giá trị default được tính ngay.
- `orElseGet(...)`: chỉ gọi Supplier khi Optional rỗng.

Ví dụ:

```java
public String loadDefaultName() {
    System.out.println("Loading default...");
    return "Anonymous";
}
```

Dùng `orElse`:

```java
String result = Optional.of("Nhan")
        .orElse(loadDefaultName());
```

Dù Optional đã có `"Nhan"`, `loadDefaultName()` vẫn chạy.

Dùng `orElseGet`:

```java
String result = Optional.of("Nhan")
        .orElseGet(() -> loadDefaultName());
```

Vì Optional có giá trị, `loadDefaultName()` không chạy.

Câu cần nhớ:

> Dùng `orElseGet` khi default value tốn chi phí, cần gọi method, query database, gọi API, hoặc tạo object nặng.

---

## 8. `map`

`Optional.map` biến đổi giá trị bên trong Optional nếu nó tồn tại.

Ví dụ:

```java
Optional<String> name = Optional.of("nhan");

Optional<String> upperName = name.map(String::toUpperCase);

System.out.println(upperName); // Optional[NHAN]
```

Nếu Optional rỗng:

```java
Optional<String> name = Optional.empty();

Optional<String> upperName = name.map(String::toUpperCase);

System.out.println(upperName); // Optional.empty
```

Không lỗi, vì `map` chỉ chạy khi có giá trị.

Ví dụ với object:

```java
public record User(String email) {}

Optional<User> user = Optional.of(new User("a@example.com"));

Optional<String> email = user.map(User::email);
```

Câu cần nhớ:

> `map` dùng khi function biến giá trị thường `T` thành giá trị thường `R`.

Tức là:

```java
T -> R
```

Ví dụ:

```java
User -> String
String -> Integer
String -> String
```

---

## 9. `flatMap`

`Optional.flatMap` dùng khi function đã trả về Optional.

Ví dụ có method:

```java
public Optional<String> findEmail(User user) {
    return Optional.ofNullable(user.email());
}
```

Nếu dùng `map`:

```java
Optional<Optional<String>> email = user.map(u -> findEmail(u));
```

Kết quả bị lồng:

```java
Optional<Optional<String>>
```

Dùng `flatMap`:

```java
Optional<String> email = user.flatMap(u -> findEmail(u));
```

Kết quả phẳng:

```java
Optional<String>
```

Câu cần nhớ:

> Dùng `flatMap` khi function bên trong đã trả về `Optional`.

So sánh:

| Operation | Function bên trong | Kết quả |
|---|---|---|
| `map` | `T -> R` | `Optional<R>` |
| `flatMap` | `T -> Optional<R>` | `Optional<R>` |

---

## 10. Ví dụ Optional gần với `shopcore`

Giả sử có `Product`:

```java
public record Product(Long id, String name, Integer price) {}
```

Repository:

```java
public Optional<Product> findById(Long id) {
    if (id == 1L) {
        return Optional.of(new Product(1L, "Keyboard", 500));
    }
    return Optional.empty();
}
```

### 10.1 Lấy tên sản phẩm hoặc default

```java
String productName = findById(1L)
        .map(Product::name)
        .orElse("Unknown product");
```

Đọc pipeline:

> Tìm product. Nếu có product thì lấy name. Nếu không có thì trả `"Unknown product"`.

### 10.2 Lấy giá sản phẩm hoặc 0

```java
int price = findById(1L)
        .map(Product::price)
        .orElse(0);
```

### 10.3 Throw exception nếu không tìm thấy

Bạn sẽ gặp nhiều trong Spring Boot:

```java
Product product = findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Product not found"));
```

`orElseThrow` không nằm trong checklist chính, nhưng rất hay dùng thực tế.

---

## 11. Anti-pattern với Optional

### Anti-pattern 1: Gọi `get()` bừa

Không nên:

```java
Product product = findById(id).get();
```

Vì nếu không có product sẽ lỗi `NoSuchElementException`.

Nên:

```java
Product product = findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Product not found"));
```

Hoặc:

```java
String name = findById(id)
        .map(Product::name)
        .orElse("Unknown product");
```

### Anti-pattern 2: Dùng Optional cho field

Không nên:

```java
public class User {
    private Optional<String> phone;
}
```

Thường Optional nên dùng cho return type của method, không dùng làm field/entity field/DTO field.

Nên:

```java
public class User {
    private String phone;
}

public Optional<String> getPhone() {
    return Optional.ofNullable(phone);
}
```

### Anti-pattern 3: Dùng Optional cho parameter

Không nên:

```java
public void updateName(Optional<String> name) {}
```

Nên:

```java
public void updateName(String name) {}
```

Hoặc tách method rõ ý định hơn.

### Anti-pattern 4: Dùng `orElse` cho default tốn chi phí

Không nên:

```java
String name = optionalName.orElse(loadNameFromDatabase());
```

Vì `loadNameFromDatabase()` luôn chạy.

Nên:

```java
String name = optionalName.orElseGet(() -> loadNameFromDatabase());
```

### Anti-pattern 5: Biến Optional thành null

Không nên:

```java
Optional<String> name = null;
```

Optional sinh ra để tránh null, nên bản thân Optional không nên là null.

Nên:

```java
Optional<String> name = Optional.empty();
```

---

## 12. Checklist Optional

Bạn nắm Optional nếu trả lời được:

- Optional dùng để làm gì?
- Khi nào dùng `Optional.of`?
- Khi nào dùng `Optional.ofNullable`?
- Vì sao không gọi `get()` bừa?
- `orElse` khác `orElseGet` thế nào?
- `map` khác `flatMap` thế nào?
- Optional nên dùng ở return type hay field/parameter?

---

# Phần 2: Records Java 17+

## 13. Record là gì?

Record là cách viết class chuyên để chứa dữ liệu, ngắn hơn class thường.

Class thường:

```java
public class ProductResponse {
    private final Long id;
    private final String name;
    private final int price;

    public ProductResponse(Long id, String name, int price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }
}
```

Record:

```java
public record ProductResponse(Long id, String name, int price) {}
```

Record tự sinh:

- Constructor.
- Getter dạng `id()`, `name()`, `price()`.
- `equals`.
- `hashCode`.
- `toString`.

Ví dụ dùng:

```java
ProductResponse response = new ProductResponse(1L, "Keyboard", 500);

System.out.println(response.id());
System.out.println(response.name());
System.out.println(response.price());
```

Chú ý: getter của record không phải `getName()`, mà là:

```java
response.name()
```

---

## 14. Khi nào dùng record?

Dùng record khi class chủ yếu để chứa dữ liệu bất biến.

Phù hợp:

- DTO response.
- Request đơn giản.
- Value object nhỏ.
- Kết quả trả về từ method.
- Pair dữ liệu nhỏ trong nội bộ.

Ví dụ DTO:

```java
public record ProductResponse(
        Long id,
        String name,
        int price
) {}
```

Ví dụ request:

```java
public record CreateProductRequest(
        String name,
        int price
) {}
```

Không nên dùng record khi:

- Object có nhiều trạng thái thay đổi.
- Entity JPA cần constructor/proxy/lifecycle phức tạp.
- Class có identity riêng cần quản lý theo vòng đời.
- Bạn cần setter nhiều.

Câu cần nhớ:

> Record phù hợp cho object chứa dữ liệu bất biến, đặc biệt DTO/request/response/value object nhỏ.

---

## 15. Record có validate được không?

Có. Dùng compact constructor:

```java
public record CreateProductRequest(String name, int price) {
    public CreateProductRequest {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (price < 0) {
            throw new IllegalArgumentException("Price must be >= 0");
        }
    }
}
```

Chú ý compact constructor không cần viết lại tham số:

```java
public CreateProductRequest {
    // validate here
}
```

Không phải:

```java
public CreateProductRequest(String name, int price) {
    // full constructor
}
```

Cả hai đều có thể dùng, nhưng compact constructor gọn hơn.

---

## 16. Record và Stream

Record rất hợp với Stream để map entity sang DTO.

```java
public record Product(Long id, String name, int price, boolean active) {}
public record ProductResponse(Long id, String name, int price) {}
```

Map:

```java
List<ProductResponse> responses = products.stream()
        .filter(Product::active)
        .map(product -> new ProductResponse(
                product.id(),
                product.name(),
                product.price()
        ))
        .toList();
```

---

# Phần 3: Sealed Classes Java 17+

## 17. Sealed class là gì?

Sealed class giới hạn những class nào được phép kế thừa nó.

Ví dụ:

```java
public sealed interface PaymentResult
        permits PaymentSuccess, PaymentFailed {
}

public final class PaymentSuccess implements PaymentResult {
    private final String transactionId;

    public PaymentSuccess(String transactionId) {
        this.transactionId = transactionId;
    }
}

public final class PaymentFailed implements PaymentResult {
    private final String reason;

    public PaymentFailed(String reason) {
        this.reason = reason;
    }
}
```

Ở đây, chỉ có:

- `PaymentSuccess`
- `PaymentFailed`

được implement `PaymentResult`.

Class khác không được tự ý implement:

```java
public class PaymentPending implements PaymentResult {} // không được nếu không nằm trong permits
```

Câu cần nhớ:

> Sealed class/interface dùng để giới hạn tập subclass/implementation được phép tồn tại.

---

## 18. `sealed`, `permits`, `final`, `non-sealed`

Một sealed hierarchy thường có:

```java
public sealed interface Result permits Success, Failure {}
```

Các class con phải chọn một trong các hướng:

### 18.1 `final`

Không cho kế thừa tiếp.

```java
public final class Success implements Result {}
```

### 18.2 `sealed`

Tiếp tục giới hạn subclass cấp dưới.

```java
public sealed class Failure implements Result permits ValidationFailure, SystemFailure {}
```

### 18.3 `non-sealed`

Mở lại cho kế thừa tự do.

```java
public non-sealed class UnknownFailure implements Result {}
```

Mới học giai đoạn này, bạn chỉ cần nhận diện:

- `sealed`: đóng tập con lại.
- `permits`: liệt kê class được kế thừa/implement.
- `final`: không cho kế thừa tiếp.
- `non-sealed`: mở lại.

---

## 19. Khi nào dùng sealed class?

Dùng sealed class khi domain có số loại cố định và bạn muốn compiler biết tập loại đó.

Phù hợp:

- Kết quả thanh toán: success/failed.
- Trạng thái đơn hàng cố định.
- Các loại command/event cố định.
- Các loại lỗi trong domain.

Ví dụ kết quả thanh toán:

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

Ở đây dùng record cho class con vì mỗi class chỉ chứa data.

Không nên dùng sealed class khi:

- Bạn muốn người khác/plugin/module khác mở rộng tự do.
- Tập subclass không cố định.
- Chỉ cần interface bình thường là đủ.

---

## 20. Record + sealed class

Record và sealed hay đi cùng nhau.

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

Đọc code:

> Checkout chỉ có 2 loại kết quả: thành công hoặc thất bại.

Khi nhìn vào sealed interface, bạn biết ngay toàn bộ khả năng có thể xảy ra.

---

## 21. Checklist Records và Sealed

Bạn đạt mức M0-1 nếu trả lời được:

- Record là gì?
- Record tự sinh những gì?
- Getter của record có dạng gì?
- Khi nào nên dùng record?
- Khi nào không nên dùng record?
- Sealed class/interface dùng để làm gì?
- `permits` nghĩa là gì?
- Class con của sealed class thường phải là `final`, `sealed`, hoặc `non-sealed` nghĩa là gì?
- Khi nào sealed class hợp lý?

---

## 22. Bài tập tự làm

### Bài 1: Optional `ofNullable`

Viết method nhận `String name`, trả về `Optional<String>` bằng `ofNullable`.

Đáp án:

```java
public Optional<String> normalizeName(String name) {
    return Optional.ofNullable(name);
}
```

### Bài 2: Optional `map` và `orElse`

Cho:

```java
public record User(String email) {}
Optional<User> user = Optional.of(new User("a@example.com"));
```

Lấy email hoặc `"unknown@example.com"` nếu không có user.

Đáp án:

```java
String email = user.map(User::email)
        .orElse("unknown@example.com");
```

### Bài 3: `orElseGet`

Viết code lấy tên default bằng `loadDefaultName()` chỉ khi Optional rỗng.

Đáp án:

```java
String name = optionalName.orElseGet(() -> loadDefaultName());
```

### Bài 4: Record DTO

Viết record `ProductResponse` có `Long id`, `String name`, `int price`.

Đáp án:

```java
public record ProductResponse(Long id, String name, int price) {}
```

### Bài 5: Sealed result

Viết sealed interface `PaymentResult` chỉ cho phép `PaymentSuccess` và `PaymentFailed`.

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

## 23. Mẫu trả lời nhanh khi kiểm tra

### Optional

> Optional là wrapper biểu diễn một giá trị có thể có hoặc không có, giúp giảm null và buộc người gọi xử lý trường hợp vắng mặt.

### `of` vs `ofNullable`

> `Optional.of(value)` dùng khi chắc chắn value khác null. `Optional.ofNullable(value)` dùng khi value có thể null.

### `map` vs `flatMap`

> `map` dùng khi function trả về giá trị thường. `flatMap` dùng khi function đã trả về Optional, để tránh `Optional<Optional<T>>`.

### `orElse` vs `orElseGet`

> `orElse` luôn tính default value trước. `orElseGet` chỉ gọi Supplier khi Optional rỗng, nên hợp với default tốn chi phí.

### Record

> Record là class dữ liệu bất biến, tự sinh constructor, accessor, equals, hashCode và toString. Phù hợp cho DTO/request/response/value object nhỏ.

### Sealed class

> Sealed class/interface giới hạn những class nào được kế thừa hoặc implement nó, thông qua `permits`. Phù hợp khi domain có tập loại cố định.

