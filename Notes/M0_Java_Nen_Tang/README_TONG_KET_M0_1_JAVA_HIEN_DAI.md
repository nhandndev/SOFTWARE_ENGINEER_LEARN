# README tổng kết M0-1: Java hiện đại

Nguồn chấm:

```text
Exams/de-kiem-tra/M0-1-java-modern__2026-08-19__lan3.md
```

Kết quả sau chấm lại:

```text
77.5 / 90 = 86 / 100 -> Đạt
```

Bạn đã qua M0-1 về mặt kiểm tra kiến thức. Nhưng để dùng chắc trong `shopcore`, vẫn cần luyện thêm một số mẫu code, nhất là Stream pipeline đúng kiểu trả về, Optional chain và `Result<T>` đúng contract.

---

## 1. Tổng quan năng lực hiện tại

### Bạn đang làm tốt

- Hiểu mục đích của Generics: tái sử dụng code, type-safe compile-time, giảm cast thủ công.
- Nắm được bounded type `T extends Number`.
- Nắm PECS ở mức ý tưởng: `extends` để đọc, `super` để thêm.
- Hiểu Functional Interface, lambda, method reference.
- Hiểu Stream là pipeline, cần terminal operation.
- Hiểu `filter`, `map`, `reduce`, `flatMap` ở mức ý tưởng.
- Hiểu Optional ở mức ý tưởng: tránh null, xử lý giá trị vắng mặt.
- Hiểu records và sealed classes Java 17+ khá tốt.
- Viết được sealed interface + record implementations đúng.

### Bạn còn cần luyện

- Viết Stream pipeline đúng kiểu trả về: `List<String>` thay vì `String`, dùng `.toList()` thay vì `.toString()`.
- Viết Optional chain đúng: `findById(id).map(Product::name).orElse(...)`.
- Phân biệt default value và exception: `orElse(...)` khác `orElseThrow(...)`.
- Viết `Result<T>` đúng contract: constructor `private`, method đúng tên `ok/fail`, `fail` dùng biến `message`, không dùng chuỗi literal `"message"`.
- Diễn đạt chính xác hơn: `Optional.ofNullable(null)` trả `Optional.empty()`, `.get()` lỗi `NoSuchElementException`, không phải null exception.

---

## 2. Tổng kết từng câu

### Câu 1: Generics giải quyết vấn đề gì?

**Bạn được:**  
Bạn hiểu Generics giúp xử lý nhiều kiểu dữ liệu mà không phải viết nhiều class/method, giúp tái sử dụng code và giảm cast thủ công.

**Còn thiếu:**  
Câu “không bị lỗi runtime” nên nói cẩn thận hơn. Generics giúp bắt lỗi kiểu ở compile-time, từ đó **giảm nguy cơ** `ClassCastException` runtime, không phải bảo đảm mọi runtime error biến mất.

**Cần học thêm:**  
Học cách nói chuẩn:

```text
Generics giúp type-safe ở compile-time, giảm cast thủ công và hạn chế ClassCastException lúc runtime.
```

---

### Câu 2: `T extends Number`

**Bạn được:**  
Bạn hiểu `T` bị giới hạn trong `Number` và các class con như `Integer`, `Double`, `Float`.

**Còn thiếu:**  
Giải thích `doubleValue()` hơi mơ hồ. Ý chuẩn là compiler biết mọi `T` đều là một dạng `Number`, nên gọi được method của `Number`.

**Cần học thêm:**  
Mẫu nhớ:

```java
public static <T extends Number> double convert(T value) {
    return value.doubleValue();
}
```

---

### Câu 3: PECS

**Bạn được:**  
Bạn nhớ đúng lõi: `extends` đọc, `super` thêm.

**Còn thiếu:**  
Cần diễn đạt rõ hơn:

- `? extends T`: đọc ra an toàn như `T`, nhưng không add tùy tiện.
- `? super T`: add `T` an toàn, nhưng đọc ra chỉ chắc là `Object`.

**Cần học thêm:**  
Luyện 2 signature:

```java
void printNumbers(List<? extends Number> numbers)
void addDefaults(List<? super Integer> target)
```

---

### Câu 4: Functional Interface, Lambda, Method Reference

**Bạn được:**  
Bạn hiểu Functional Interface có đúng 1 abstract method, lambda/method reference là cách implement ngắn hơn anonymous class.

**Còn thiếu:**  
Từ “override” dùng được ở mức ý tưởng, nhưng khi nói chuẩn hơn nên là:

```text
Lambda cung cấp implementation cho abstract method của functional interface.
```

**Cần học thêm:**  
Luyện đổi lambda sang method reference:

```java
name -> System.out.println(name)  -> System.out::println
s -> s.toUpperCase()             -> String::toUpperCase
n -> n.doubleValue()             -> Number::doubleValue
```

---

### Câu 5: Stream pipeline

**Bạn được:**  
Bạn hiểu Stream xử lý theo luồng/pipeline, có source, intermediate operation và terminal operation. Bạn cũng nhớ nếu thiếu terminal operation thì pipeline chưa chạy.

**Còn thiếu:**  
Cần nói thêm intermediate operation là lazy.

**Cần học thêm:**  
Mẫu pipeline:

```java
List<String> names = products.stream()   // source
        .filter(Product::active)         // intermediate
        .map(Product::name)              // intermediate
        .toList();                       // terminal
```

---

### Câu 6: `filter` vs `map`

**Bạn được:**  
Bạn hiểu `filter` là lọc, `map` là biến đổi `T -> R`.

**Còn thiếu:**  
Cần nói rõ `filter` thường không đổi kiểu phần tử, còn `map` có thể đổi kiểu.

**Cần học thêm:**  
Nhớ:

```text
filter: Product -> Product
map: Product -> String/ProductResponse/Integer
```

---

### Câu 7: `reduce`

**Bạn được:**  
Bạn hiểu `reduce` gom nhiều phần tử thành một giá trị, ví dụ tính tổng.

**Còn thiếu:**  
Cần viết rõ identity và accumulator.

**Cần học thêm:**  
Mẫu thuộc:

```java
int total = numbers.stream()
        .reduce(0, Integer::sum);
```

Hoặc:

```java
int total = numbers.stream()
        .reduce(0, (sum, n) -> sum + n);
```

---

### Câu 8: `map` vs `flatMap`

**Bạn được:**  
Bạn hiểu `flatMap` dùng để trải phẳng dữ liệu lồng nhau.

**Còn thiếu:**  
Cần gắn với kiểu dữ liệu rõ hơn:

- `map`: `Stream<Order>` -> `Stream<List<OrderItem>>`
- `flatMap`: `Stream<Order>` -> `Stream<OrderItem>`

**Cần học thêm:**  
Mẫu thuộc:

```java
List<OrderItem> items = orders.stream()
        .flatMap(order -> order.items().stream())
        .toList();
```

---

### Câu 9: `Optional.of` vs `ofNullable`

**Bạn được:**  
Bạn hiểu `of` dùng khi chắc chắn không null, `ofNullable` dùng khi có thể null.

**Còn thiếu:**  
Cần nói chính xác:

```text
Optional.of(null) -> NullPointerException
Optional.ofNullable(null) -> Optional.empty()
```

**Cần học thêm:**  
Không chỉ nói “không bị sao”, hãy nói rõ là `Optional.empty()`.

---

### Câu 10: Records và sealed classes

**Bạn được:**  
Bạn hiểu record dùng cho data bất biến như DTO/request/response. Bạn cũng hiểu sealed giới hạn class nào được kế thừa/implement.

**Còn thiếu:**  
Cần nhớ record không sinh setter. Accessor dạng `name()`, không phải `getName()`.

**Cần học thêm:**  
Mẫu record:

```java
public record ProductResponse(Long id, String name, int price) {
}
```

---

### Câu 11: `List<? extends Number>`

**Bạn được:**  
Bạn nhớ đúng cần dùng `? extends Number` để đọc list số.

**Còn thiếu:**  
Bạn chưa giải thích rõ invariant generic:

```text
List<Integer> không phải subtype của List<Number>.
```

**Cần học thêm:**  
Lý do:

```text
Nếu List<Integer> là List<Number>, ta có thể add Double vào List<Integer>, gây sai type.
```

---

### Câu 12: `List<? super Integer>`

**Bạn được:**  
Bạn chọn đúng `? super Integer` và nhớ đọc ra an toàn nhất là `Object`.

**Còn thiếu:**  
Giải thích còn lộn giữa quan hệ `Integer`, `Number`, `Object`.

**Cần học thêm:**  
Câu chuẩn:

```text
List<? super Integer> có thể là List<Integer>, List<Number>, List<Object>.
Add Integer an toàn vì Integer là Integer, là Number, và là Object.
Đọc ra chỉ chắc chắn là Object.
```

---

### Câu 13: Stream lấy tên product active

**Bạn được:**  
Bạn biết cần `filter` rồi `map`.

**Còn thiếu:**  
Code chưa đúng kiểu trả về:

- Không phải `String name`, mà là `List<String> names`.
- Không dùng `.toString()` để gom stream.
- Cần terminal operation `.toList()`.
- Boolean Java dùng `true`, không phải `True`.

**Cần học thêm:**  
Mẫu đúng:

```java
List<String> names = products.stream()
        .filter(Product::active)
        .map(Product::name)
        .toList();
```

---

### Câu 14: `Collectors.groupingBy`

**Bạn được:**  
Bạn nhớ cần dùng `Collectors.groupingBy`.

**Còn thiếu:**  
Kiểu map chưa đúng. Vì nhóm theo category thì value là list product.

**Cần học thêm:**  
Mẫu đúng:

```java
Map<String, List<Product>> byCategory = products.stream()
        .collect(Collectors.groupingBy(Product::category));
```

---

### Câu 15: `flatMap` orders -> items

**Bạn được:**  
Bạn hiểu đúng vì sao dùng `flatMap`: để list phẳng, không bị nhiều list con.

**Còn thiếu:**  
Code sai tên method: không có `toFlatMap`. Phải là `.flatMap(...)`.

**Cần học thêm:**  
Mẫu đúng:

```java
List<OrderItem> items = orders.stream()
        .flatMap(order -> order.items().stream())
        .toList();
```

---

### Câu 16: Optional lấy product name

**Bạn được:**  
Bạn đã sửa từ `orElseThrow` sang hướng default value.

**Còn thiếu:**  
Vẫn thiếu `map(Product::name)`. Nếu `findById(id)` trả `Optional<Product>`, gọi `orElse("Unknown Product")` trực tiếp là sai kiểu, vì default phải là `Product`, không phải `String`.

**Cần học thêm:**  
Mẫu bắt buộc thuộc:

```java
String name = findById(id)
        .map(Product::name)
        .orElse("Unknown product");
```

Giải thích:

```text
Optional<Product> -> map(Product::name) -> Optional<String> -> orElse("Unknown product") -> String
```

---

### Câu 17: `orElse` vs `orElseGet`

**Bạn được:**  
Bạn hiểu đúng vấn đề: `orElse(loadDefaultName())` gọi DB sớm, kể cả khi Optional có giá trị. Bạn biết nên dùng `orElseGet`.

**Còn thiếu:**  
Cần viết code đầy đủ:

```java
String name = optionalName.orElseGet(() -> loadDefaultName());
```

**Cần học thêm:**  
Nhớ:

```text
orElse: default được tính ngay
orElseGet: Supplier chỉ chạy khi Optional rỗng
```

---

### Câu 18: Sealed checkout result

**Bạn được:**  
Bạn trả lời tốt: chọn sealed, nêu `CheckoutSuccess`, `CheckoutFailed`, hiểu nên dùng record cho implementation chỉ chứa data.

**Còn thiếu:**  
Không đáng kể. Chỉ cần diễn đạt gọn hơn.

**Cần học thêm:**  
Mẫu chuẩn:

```java
public sealed interface CheckoutResult permits CheckoutSuccess, CheckoutFailed {}
```

---

### Câu 19: `Result<T>`

**Bạn được:**  
Bạn viết được class generic, field gần đúng, getter đúng, method `ok` và `fail` đã đúng tên sau khi sửa.

**Còn thiếu:**  
Còn 2 lỗi quan trọng:

- Constructor phải `private`, bạn đang để `public`.
- `fail(String message)` phải dùng biến `message`, bạn đang dùng chuỗi literal `"message"`.

Bạn viết:

```java
return new Result<>(false,"message",null);
```

Đúng:

```java
return new Result<>(false, message, null);
```

**Cần học thêm:**  
Mẫu đúng:

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

---

### Câu 20: Record + sealed checkout result

**Bạn được:**  
Bạn làm đúng gần như hoàn toàn. Đây là một trong các câu chắc nhất.

**Còn thiếu:**  
Không đáng kể ở mức M0-1.

**Cần học thêm:**  
Giữ mẫu này:

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

---

## 3. Những mẫu cần thuộc để nắm vững

### Generics

```java
public static <T extends Number> double toDouble(T value) {
    return value.doubleValue();
}
```

```java
public static double sum(List<? extends Number> numbers) {
    return numbers.stream()
            .map(Number::doubleValue)
            .reduce(0.0, Double::sum);
}
```

```java
public static void addDefaults(List<? super Integer> target) {
    target.add(1);
    target.add(2);
    target.add(3);
}
```

### Stream

```java
List<String> names = products.stream()
        .filter(Product::active)
        .map(Product::name)
        .toList();
```

```java
Map<String, List<Product>> byCategory = products.stream()
        .collect(Collectors.groupingBy(Product::category));
```

```java
List<OrderItem> items = orders.stream()
        .flatMap(order -> order.items().stream())
        .toList();
```

### Optional

```java
String name = findById(id)
        .map(Product::name)
        .orElse("Unknown product");
```

```java
String name = optionalName.orElseGet(() -> loadDefaultName());
```

```java
Product product = findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Product not found"));
```

### Record và sealed

```java
public record ProductResponse(Long id, String name, int price) {
}
```

```java
public sealed interface CheckoutResult
        permits CheckoutSuccess, CheckoutFailed {
}
```

---

## 4. Lộ trình luyện thêm sau khi đã đạt

Bạn đã đạt M0-1, nên không cần học lại toàn bộ. Chỉ cần luyện để dùng chắc trong code thật.

### Buổi 1: Stream pipeline

Làm 5 bài:

- Lọc product active.
- Map product sang product name.
- Map product sang `ProductResponse`.
- Group product theo category.
- FlatMap orders sang order items.

### Buổi 2: Optional chain

Làm 5 bài:

- `findById(id).map(Product::name).orElse(...)`
- `findById(id).map(Product::price).orElse(0)`
- `optionalName.orElseGet(...)`
- `findById(id).orElseThrow(...)`
- Tránh `.get()` trong mọi bài.

### Buổi 3: Code deliverable

Code vào `shopcore/common`:

- `Result<T>`
- `PageResponse<T>`
- 1-2 utility dùng Stream/Optional
- Unit test cho các case success/fail/empty/null

---

## 5. Checklist tự kiểm trước khi sang module tiếp

- [ ] Viết được `Result<T>` đúng contract không nhìn đáp án.
- [ ] Viết được `PageResponse<T>` dùng generic.
- [ ] Viết được stream `filter + map + toList`.
- [ ] Viết được `Collectors.groupingBy`.
- [ ] Viết được `flatMap` cho list lồng.
- [ ] Viết được Optional `map + orElse`.
- [ ] Biết khi nào dùng `orElseGet`.
- [ ] Biết record không có setter, accessor dạng `name()`.
- [ ] Biết sealed interface dùng cho tập case cố định.

