# README học lại: Generics & Lambda

Mục tiêu của file này: giúp bạn làm lại bài kiểm tra nhanh `M0-1-java-modern` phần Generics & Lambda, đặc biệt các câu đã mất điểm: wildcard `? extends`, `? super`, method reference và code `Result<T>`.

---

## 0. Bức tranh tổng quát

Generics và Lambda giải quyết 2 vấn đề khác nhau:

| Chủ đề | Giải quyết vấn đề gì | Ví dụ |
|---|---|---|
| Generics | Viết code dùng được cho nhiều kiểu dữ liệu nhưng vẫn an toàn kiểu | `Result<T>`, `List<String>` |
| Wildcard | Cho method nhận nhiều dạng generic linh hoạt hơn | `List<? extends Number>` |
| Lambda | Viết hành vi/function ngắn gọn hơn | `(a, b) -> a + b` |
| Method reference | Viết lambda ngắn hơn khi chỉ gọi một method có sẵn | `System.out::println` |

Nếu nhớ 1 câu: **Generics là linh hoạt về kiểu dữ liệu, Lambda là linh hoạt về hành vi.**

---

## 1. Generics là gì?

Generics cho phép class, interface hoặc method làm việc với nhiều kiểu dữ liệu khác nhau mà không cần viết lại code cho từng kiểu.

Không dùng Generics:

```java
List list = new ArrayList();
list.add("hello");
list.add(123);

String value = (String) list.get(1); // Runtime lỗi ClassCastException
```

Dùng Generics:

```java
List<String> names = new ArrayList<>();
names.add("hello");
// names.add(123); // Lỗi ngay lúc compile

String value = names.get(0); // Không cần cast
```

Điểm cần nhớ:

- Generics giúp code **type-safe lúc compile-time**.
- Giảm ép kiểu thủ công.
- Tránh nhiều lỗi runtime như `ClassCastException`.
- Giúp code tái sử dụng tốt hơn.

Câu trả lời mẫu cho câu hỏi “Generics giải quyết vấn đề gì?”:

> Generics giúp class/method/interface dùng được với nhiều kiểu dữ liệu nhưng vẫn giữ type-safety lúc compile-time. Nếu không dùng Generics, ta dễ phải cast thủ công và có thể gặp `ClassCastException` lúc runtime.

---

## 2. Type parameter `<T>`

`T` là một biến kiểu, không phải kiểu cụ thể.

```java
public class Box<T> {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}
```

Khi dùng class, bạn mới truyền kiểu thật vào:

```java
Box<String> stringBox = new Box<>("hello");
Box<Integer> intBox = new Box<>(123);
```

Ở đây:

- `T` trong `Box<T>` là placeholder.
- `Box<String>` biến `T` thành `String`.
- `Box<Integer>` biến `T` thành `Integer`.

Các ký hiệu thường gặp:

| Ký hiệu | Ý nghĩa thường dùng |
|---|---|
| `T` | Type |
| `E` | Element |
| `K` | Key |
| `V` | Value |
| `R` | Return type |

Không bắt buộc phải đặt là `T`, nhưng nên theo convention để code dễ đọc.

---

## 3. Generic method

Generic không chỉ dùng cho class. Method cũng có thể generic.

```java
public static <T> T first(List<T> items) {
    return items.get(0);
}
```

Chú ý vị trí `<T>`:

```java
public static <T> T first(List<T> items)
//            ^ khai báo T cho method
//                ^ kiểu trả về
//                       ^ tham số dùng T
```

Ví dụ:

```java
String firstName = first(List.of("A", "B"));
Integer firstNumber = first(List.of(1, 2));
```

Trong bài `Result<T>`, static factory method cũng cần khai báo generic method:

```java
public static <T> Result<T> ok(T data) {
    return new Result<>(true, "OK", data);
}
```

Nếu viết thiếu `<T>`:

```java
public static Result<T> ok(T data) // sai nếu T chưa được khai báo trong static context
```

Vì method static không dùng trực tiếp `T` của object instance. Nó cần tự khai báo `<T>`.

---

## 4. Bounded type: `<T extends Number>`

Bounded type dùng để giới hạn kiểu generic.

```java
public static <T extends Number> double toDouble(T value) {
    return value.doubleValue();
}
```

`T extends Number` nghĩa là:

- `T` có thể là `Number`.
- Hoặc subtype của `Number`: `Integer`, `Double`, `Long`, `Float`, ...
- Compiler biết chắc `T` là một dạng `Number`.
- Vì vậy bạn gọi được method của `Number`, ví dụ `doubleValue()`, `intValue()`, `longValue()`.

Ví dụ hợp lệ:

```java
toDouble(10);      // Integer
toDouble(10.5);    // Double
toDouble(99L);     // Long
```

Ví dụ không hợp lệ:

```java
// toDouble("10"); // String không extends Number
```

Câu trả lời mẫu:

> `T extends Number` giới hạn `T` phải là `Number` hoặc class con của `Number`. Nhờ vậy method vẫn nhận được nhiều kiểu số như `Integer`, `Double`, `Long`, đồng thời có thể gọi các method chung của `Number` như `doubleValue()`.

---

## 5. Vấn đề lớn: `List<Integer>` không phải là `List<Number>`

Đây là điểm dễ sai nhất.

Trong Java:

```java
Integer extends Number // đúng
```

Nhưng:

```java
List<Integer> extends List<Number> // sai
```

Vì sao?

Giả sử Java cho phép điều này:

```java
List<Integer> integers = new ArrayList<>();
List<Number> numbers = integers; // giả sử được phép
numbers.add(10.5);               // Double là Number, nên có vẻ hợp lệ

Integer x = integers.get(0);     // lỗi logic: trong list Integer lại có Double
```

Để tránh lỗi đó, Java không cho `List<Integer>` được xem là `List<Number>`.

Muốn method nhận `List<Integer>`, `List<Double>`, `List<Long>` để đọc số, dùng wildcard:

```java
public static double sum(List<? extends Number> numbers) {
    double total = 0;
    for (Number number : numbers) {
        total += number.doubleValue();
    }
    return total;
}
```

Method này nhận được:

```java
sum(List.of(1, 2, 3));       // List<Integer>
sum(List.of(1.5, 2.5));      // List<Double>
sum(List.of(1L, 2L));        // List<Long>
```

---

## 6. PECS: Producer Extends, Consumer Super

Câu thần chú:

> **Muốn đọc ra thì extends. Muốn ghi vào thì super.**

| Nhu cầu | Dùng | Nhớ nhanh |
|---|---|---|
| Collection cung cấp dữ liệu cho mình đọc | `? extends T` | Producer Extends |
| Collection nhận dữ liệu mình thêm vào | `? super T` | Consumer Super |

---

## 7. `? extends T`: đọc tốt, ghi kém

Ví dụ:

```java
public static void printNumbers(List<? extends Number> numbers) {
    for (Number number : numbers) {
        System.out.println(number.doubleValue());
    }
}
```

Gọi được với:

```java
List<Integer> integers = List.of(1, 2, 3);
List<Double> doubles = List.of(1.1, 2.2);

printNumbers(integers);
printNumbers(doubles);
```

Tại sao đọc được?

Vì dù list thật là `List<Integer>` hay `List<Double>`, phần tử lấy ra chắc chắn là một dạng `Number`.

```java
Number n = numbers.get(0); // an toàn
```

Tại sao không add được?

```java
public static void addBad(List<? extends Number> numbers) {
    // numbers.add(10);   // không được
    // numbers.add(10.5); // không được
}
```

Vì compiler không biết list thật là gì:

- Nếu là `List<Integer>`, add `10.5` là sai.
- Nếu là `List<Double>`, add `10` có thể không đúng ý.
- Nếu là `List<Long>`, cả hai đều không đúng.

Vậy `? extends Number` phù hợp cho method chỉ đọc/tính toán/in dữ liệu.

---

## 8. `? super T`: ghi tốt, đọc ra chỉ chắc là `Object`

Ví dụ:

```java
public static void addDefaults(List<? super Integer> target) {
    target.add(1);
    target.add(2);
    target.add(3);
}
```

Method này nhận được:

```java
List<Integer> integers = new ArrayList<>();
List<Number> numbers = new ArrayList<>();
List<Object> objects = new ArrayList<>();

addDefaults(integers);
addDefaults(numbers);
addDefaults(objects);
```

Tại sao add `Integer` được?

Vì cả 3 loại list trên đều nhận được `Integer`:

- `List<Integer>` nhận `Integer`.
- `List<Number>` nhận `Integer` vì `Integer` là `Number`.
- `List<Object>` nhận `Integer` vì mọi object đều là `Object`.

Tại sao đọc ra không nên gán thẳng vào `Integer`?

```java
public static void readFromSuper(List<? super Integer> target) {
    Object value = target.get(0); // an toàn
    // Integer x = target.get(0); // không an toàn
}
```

Vì list thật có thể là `List<Object>`, trong đó có thể chứa `"hello"`, `true`, hoặc bất kỳ object nào khác. Compiler chỉ chắc chắn phần tử đọc ra là `Object`.

Câu trả lời mẫu cho câu 8:

> `List<? super Integer>` có thể là `List<Integer>`, `List<Number>` hoặc `List<Object>`, nên thêm `Integer` vào là an toàn. Nhưng khi đọc ra, compiler không biết list thật đang chứa kiểu cha nào, nên chỉ đảm bảo giá trị đọc ra là `Object`, không thể gán trực tiếp vào `Integer`.

---

## 9. Functional Interface

Functional Interface là interface có đúng 1 abstract method.

```java
@FunctionalInterface
public interface MathOperation {
    int apply(int a, int b);
}
```

Nó có thể có thêm:

- `default method`
- `static method`

Miễn là chỉ có đúng 1 abstract method.

```java
@FunctionalInterface
public interface MathOperation {
    int apply(int a, int b);

    default void printName() {
        System.out.println("MathOperation");
    }

    static MathOperation plus() {
        return (a, b) -> a + b;
    }
}
```

`@FunctionalInterface` có bắt buộc không?

Không bắt buộc, nhưng nên dùng vì:

- Compiler sẽ báo lỗi nếu interface có nhiều hơn 1 abstract method.
- Người đọc biết interface này được thiết kế để dùng với lambda.

Câu trả lời mẫu:

> Functional Interface là interface có đúng một abstract method, nên có thể dùng với lambda hoặc method reference. `@FunctionalInterface` không bắt buộc, nhưng nên dùng để compiler kiểm tra và giúp người đọc hiểu ý định thiết kế.

---

## 10. Lambda expression

Lambda là cách viết ngắn gọn để implement Functional Interface.

Có interface:

```java
@FunctionalInterface
public interface MathOperation {
    int apply(int a, int b);
}
```

Anonymous class:

```java
MathOperation plus = new MathOperation() {
    @Override
    public int apply(int a, int b) {
        return a + b;
    }
};
```

Lambda:

```java
MathOperation plus = (a, b) -> a + b;
```

Hai đoạn trên cùng ý nghĩa: tạo một implementation cho `MathOperation`.

Lambda phù hợp khi:

- Interface có đúng 1 abstract method.
- Bạn muốn truyền hành vi vào method.
- Code anonymous class quá dài.

Ví dụ truyền hành vi:

```java
public static int calculate(int a, int b, MathOperation operation) {
    return operation.apply(a, b);
}

int result = calculate(10, 5, (a, b) -> a + b);
```

Câu trả lời mẫu:

> Lambda expression là cách viết ngắn gọn để implement Functional Interface. So với anonymous class, lambda bỏ phần `new Interface()`, `@Override`, tên method, nên code ngắn hơn và phù hợp khi muốn truyền hành vi như một giá trị.

---

## 11. Method reference

Method reference là cú pháp rút gọn của lambda khi lambda chỉ gọi một method đã có.

Ví dụ:

```java
names.forEach(name -> System.out.println(name));
```

Lambda này chỉ làm một việc: gọi `System.out.println(name)`.

Viết bằng method reference:

```java
names.forEach(System.out::println);
```

Cách đọc:

```java
System.out::println
// object :: method
```

Nghĩa là: với từng phần tử trong `names`, truyền phần tử đó vào method `println`.

Một số dạng thường gặp:

| Lambda | Method reference | Dạng |
|---|---|---|
| `x -> System.out.println(x)` | `System.out::println` | object::method |
| `s -> s.toUpperCase()` | `String::toUpperCase` | Class::instanceMethod |
| `s -> Integer.parseInt(s)` | `Integer::parseInt` | Class::staticMethod |
| `() -> new ArrayList<>()` | `ArrayList::new` | Constructor reference |

Điều kiện dùng method reference:

- Lambda chỉ gọi một method có sẵn.
- Không thêm logic phụ.
- Thứ tự tham số khớp với method được gọi.

Nên đổi:

```java
names.forEach(name -> System.out.println(name));
names.forEach(System.out::println);
```

Không nên đổi nếu lambda có logic phụ:

```java
names.forEach(name -> {
    String normalized = name.trim().toUpperCase();
    System.out.println(normalized);
});
```

Câu trả lời mẫu cho câu 9:

> Có. Vì lambda chỉ gọi duy nhất method `println` đã có, có thể viết thành `names.forEach(System.out::println);`. Method reference phù hợp khi lambda chỉ chuyển tham số vào một method sẵn có mà không thêm logic khác.

---

## 12. Code mini: `Result<T>`

`Result<T>` dùng để gói kết quả trả về.

Ví dụ:

```java
Result<String> result = Result.ok("created");
Result<Integer> count = Result.ok(10);
Result<Object> error = Result.fail("Not found");
```

Vì data có thể là `String`, `Integer`, `Product`, `User`, ta dùng `T`.

Code mẫu:

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

Giải thích từng phần:

```java
public class Result<T>
```

Class generic. `T` là kiểu của `data`.

```java
private final T data;
```

`data` có kiểu linh hoạt. Nếu `Result<String>` thì `data` là `String`; nếu `Result<Integer>` thì `data` là `Integer`.

```java
private Result(boolean success, String message, T data)
```

Constructor private để bắt người dùng tạo object qua factory method `ok` hoặc `fail`.

```java
public static <T> Result<T> ok(T data)
```

Static generic method. `<T>` trước `Result<T>` là phần khai báo type parameter cho method.

```java
return new Result<>(true, "OK", data);
```

Tạo kết quả thành công.

```java
public static <T> Result<T> fail(String message)
```

Tạo kết quả thất bại. Không có data nên data là `null`.

```java
return new Result<>(false, message, null);
```

---

## 13. Checklist trước khi làm lại kiểm tra

Bạn sẵn sàng làm lại nếu tự trả lời được các câu này mà không nhìn note:

- Generics giúp tránh lỗi gì?
- `<T>` khác gì `String`?
- `T extends Number` cho phép gọi method nào?
- Tại sao `List<Integer>` không phải `List<Number>`?
- Khi nào dùng `? extends Number`?
- Khi nào dùng `? super Integer`?
- Vì sao `? super Integer` add được nhưng đọc ra chỉ chắc là `Object`?
- Functional Interface có mấy abstract method?
- Lambda thay thế anonymous class như thế nào?
- `name -> System.out.println(name)` đổi sang method reference là gì?
- Viết được `Result<T>` không nhìn đáp án.

---

## 14. Bài tập tự làm

### Bài 1: `sum`

Viết method nhận `List<Integer>`, `List<Double>`, `List<Long>` đều được và trả về tổng dạng `double`.

Gợi ý signature:

```java
public static double sum(List<? extends Number> numbers)
```

### Bài 2: `addDefaults`

Viết method thêm `1`, `2`, `3` vào list có thể là `List<Integer>`, `List<Number>`, hoặc `List<Object>`.

Gợi ý signature:

```java
public static void addDefaults(List<? super Integer> target)
```

### Bài 3: Lambda

Tạo `@FunctionalInterface` tên `StringFormatter`:

```java
@FunctionalInterface
public interface StringFormatter {
    String format(String input);
}
```

Sau đó tạo 2 lambda:

```java
StringFormatter upper = s -> s.toUpperCase();
StringFormatter trim = s -> s.trim();
```

### Bài 4: Method reference

Đổi các lambda sau sang method reference nếu đổi được:

```java
names.forEach(name -> System.out.println(name));
numbers.forEach(number -> System.out.println(number));
strings.stream().map(s -> s.toUpperCase());
strings.stream().map(s -> s.trim());
```

Đáp án tự kiểm:

```java
names.forEach(System.out::println);
numbers.forEach(System.out::println);
strings.stream().map(String::toUpperCase);
strings.stream().map(String::trim);
```

### Bài 5: `Result<T>`

Viết lại `Result<T>` từ đầu với:

- `boolean success`
- `String message`
- `T data`
- `ok(T data)`
- `fail(String message)`
- getter

Sau đó tự test bằng mắt:

```java
Result<String> r1 = Result.ok("hello");
Result<Integer> r2 = Result.ok(123);
Result<Object> r3 = Result.fail("Not found");
```

---

## 15. Mẫu trả lời nhanh cho bài kiểm tra

### Generics

> Generics giúp class/method/interface dùng được với nhiều kiểu dữ liệu mà vẫn type-safe lúc compile-time. Nó giảm cast thủ công và tránh lỗi runtime như `ClassCastException`.

### `<T>`

> `<T>` là type parameter, tức biến đại diện cho một kiểu sẽ được truyền vào khi dùng class hoặc method. Nó không cố định như `String` hay `Integer`, nên cùng một class có thể dùng cho nhiều kiểu.

### `T extends Number`

> `T extends Number` giới hạn `T` là `Number` hoặc subtype của `Number`, ví dụ `Integer`, `Double`, `Long`. Nhờ đó ta có thể gọi method chung của `Number` như `doubleValue()`.

### PECS

> PECS là Producer Extends, Consumer Super. Nếu collection chủ yếu để đọc dữ liệu ra thì dùng `? extends T`. Nếu collection chủ yếu để thêm dữ liệu vào thì dùng `? super T`.

### Functional Interface

> Functional Interface là interface có đúng một abstract method. Nó dùng được với lambda và method reference. `@FunctionalInterface` không bắt buộc nhưng nên dùng để compiler kiểm tra.

### Lambda

> Lambda là cách viết ngắn gọn để implement Functional Interface, thay cho anonymous class khi chỉ cần truyền một hành vi ngắn.

### Method reference

> Method reference dùng khi lambda chỉ gọi một method có sẵn. Ví dụ `name -> System.out.println(name)` có thể viết thành `System.out::println`.

