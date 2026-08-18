# Bài học: Generics và Lambda trong Java

## 1. Generics (Kiểu dữ liệu tổng quát)

Generics ra đời từ Java 5 giúp bạn viết code một lần nhưng dùng được cho nhiều kiểu dữ liệu khác nhau, đồng thời đảm bảo an toàn kiểu dữ liệu (type-safe) lúc biên dịch (compile-time).

### 1.1 Type Parameter (`<T>`)
Thay vì khai báo cứng một kiểu (ví dụ `String` hay `Integer`), bạn dùng một biến kiểu, thường ký hiệu là `T` (Type), `E` (Element), `K` (Key), `V` (Value).

```java
// Class Box có thể chứa bất kỳ kiểu dữ liệu nào (String, Integer, User...)
public class Box<T> {
    private T item;

    public void set(T item) { this.item = item; }
    public T get() { return item; }
}

// Cách dùng:
Box<String> stringBox = new Box<>();
stringBox.set("Hello");
// stringBox.set(123); // LỖI BIÊN DỊCH ngay lập tức -> An toàn!
```

### 1.2 Bounded Type (`extends`)
Đôi khi bạn muốn Generics chấp nhận nhiều kiểu, nhưng phải thuộc một "họ" nào đó. Ví dụ: chỉ nhận các kiểu số (Integer, Double, Float...).

```java
// T phải là Number hoặc các class con của Number
public class Calculator<T extends Number> {
    private T number;
    
    public Calculator(T number) { this.number = number; }
    
    public double getDoubleValue() {
        return number.doubleValue(); // Gọi được hàm của Number vì đã extends Number
    }
}
```

### 1.3 Wildcards (`? extends` và `? super`)
Đây là phần dễ nhầm lẫn nhất. Hãy nhớ quy tắc vàng **PECS** (Producer Extends, Consumer Super).

- `? extends T` (Upper Bound): Chấp nhận `T` và **con của T**. Dùng khi bạn chỉ muốn **ĐỌC** dữ liệu ra (Producer).
- `? super T` (Lower Bound): Chấp nhận `T` và **cha của T**. Dùng khi bạn chỉ muốn **GHI** dữ liệu vào (Consumer).

```java
public void processElements() {
    List<Integer> ints = List.of(1, 2, 3);
    
    // Dùng ? extends Number: Ta có thể ĐỌC ra dưới dạng Number
    // (Bởi vì Integer là con của Number)
    printNumbers(ints); 
}

// Producer Extends: list này "sản xuất" (cung cấp) dữ liệu cho hàm đọc
public void printNumbers(List<? extends Number> list) {
    for (Number n : list) {
        System.out.println(n);
    }
    // list.add(10); // LỖI! Không được phép thêm (ghi) vào list <? extends>
}

// Consumer Super: list này "tiêu thụ" (nhận) dữ liệu
public void addNumbers(List<? super Integer> list) {
    list.add(10); // HỢP LỆ: Ghi dữ liệu vào list
    list.add(20);
    // Integer i = list.get(0); // LỖI! Đọc ra rất nguy hiểm vì không biết chắc kiểu cha là gì
}
```

---

## 2. Lambda và Functional Interface (Java 8+)

### 2.1 Functional Interface
Là một Interface chỉ có **DUY NHẤT 1 phương thức trừu tượng (abstract method)**. Nó thường được đánh dấu bằng annotation `@FunctionalInterface` (không bắt buộc nhưng nên dùng để trình biên dịch kiểm tra).

```java
@FunctionalInterface
public interface MathOperation {
    int operate(int a, int b); // Duy nhất 1 hàm abstract
}
```

### 2.2 Biểu thức Lambda
Trước Java 8, để implement interface trên, bạn phải dùng Anonymous Class rất dài dòng. Lambda sinh ra để viết gọn lại.

**Cú pháp:** `(tham_số) -> { thân_hàm }`

```java
// CÁCH CŨ: Anonymous Class
MathOperation additionOld = new MathOperation() {
    @Override
    public int operate(int a, int b) {
        return a + b;
    }
};

// CÁCH MỚI: Lambda Expression
MathOperation addition = (a, b) -> a + b;
MathOperation subtraction = (a, b) -> {
    return a - b;
};

System.out.println(addition.operate(10, 5)); // Kết quả: 15
```

### 2.3 Method Reference (`::`)
Khi Lambda của bạn chỉ làm duy nhất một việc là **gọi một hàm đã có sẵn**, bạn có thể viết ngắn hơn nữa bằng Method Reference.

```java
List<String> names = List.of("Nhan", "Anna", "Bob");

// Dùng Lambda:
names.forEach(name -> System.out.println(name));

// Dùng Method Reference (Ngắn gọn hơn):
names.forEach(System.out::println);
```

> **Mẹo nhớ:** `TênLớp::tênHàm` hoặc `đốiTượng::tênHàm`. Khi trình duyệt chạy vòng lặp, nó tự động lấy từng phần tử truyền vào hàm `println`.
