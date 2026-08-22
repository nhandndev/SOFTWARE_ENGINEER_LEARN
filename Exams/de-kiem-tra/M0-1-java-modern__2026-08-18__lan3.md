# De thi lai ngan M0-1 - Generics & Lambda

**Topic:** `M0-1-java-modern`  
**Che do:** `THI_LAI`  
**Lan:** 3  
**Trong tam:** Compile-time type-safety, invariant generic, PECS, method reference, `Result<T>`  
**Tong diem tho:** 35 diem  
**Cach tinh diem:** `(diem dat duoc / 35) x 100`

## Huong dan

- Lam truc tiep vao dong `**Tra loi:**`.
- Tra loi ngan nhung phai dung y.
- Cau code co the viet toi gian, nhung phai dung contract.
- Khong mo file dap an truoc khi lam xong.

---

## Phan A - Ly thuyet trong tam (5 cau x 3 diem = 15 diem)

### Cau 1

Generics giup Java type-safe o compile-time hay runtime? Giai thich bang 2 cau va neu 1 loi Generics giup han che.

**Tra loi:** Generic giúp java type-safe ỏ Compile-time, bởi vì generic giúp cho dev kiểm soát được nhiều  kiểu dữ liệu và giúp cho compiler quét ra được là kiểu dữ liệu scope của nó . ví dụ như là List , nếu ta k generic thì nó có thể là interger , object , number ,.. tuy nhiên nếu ta ép sia kiểu thì nó sẽ bị class cast exception , khi có generci thì ta sẽ giới hạn được và không cần cast thủ công và nó run time nên là khi compiler nó sẽ báo lỗi thay vì runtime 


### Cau 2

Vi sao `Integer extends Number` nhung `List<Integer>` khong phai la `List<Number>`?

**Tra loi:**
vì giả xử nếu java đồng ý cho List<integer là List<number> thì nó sẽ bị lỗi khi add , list number có thể add 10.5 nhưng mà  lítt integer thì không

### Cau 3

Neu method chi can doc danh sach so de tinh tong, nen dung `List<Number>` hay `List<? extends Number>`? Giai thich vi sao.

**Tra loi:**dùng để đọc danh sách số để tính tổng thì nên dùng List<? extends Number > , vì nếu dùng List<Number> thì sẽ sinh ra trường hợp như này . Method sum có pảa là List<Number> nhma khi truyền List<Integer > thì sai , còn List<? extends Number> thì có thể là Number hoặc là các type con của nó 


### Cau 4

Voi `List<? super Integer> target`, vi sao add `Integer` vao duoc, nhung doc ra an toan nhat la `Object`?

**Tra loi:** vì là ? super Integer nghĩa là nó có thể là Integer hoặc là các lớp cha của nó ( object , Number ), và nên đọc ra là object 


### Cau 5

Functional Interface la gi? Lambda lien quan gi den Functional Interface?

**Tra loi:** Functional Interface là  interface có đúng 1 abstract method cần phải oveeride ( nso có thể có nhiều default class ,stati class nhugnw chỉ được phpes có 1 abstract class) , lambda là cách override theo kiểu ngắn gọn cho functional interface 


---

## Phan B - Ap dung nhanh (3 cau x 4 diem = 12 diem)

### Cau 6

Dien dung wildcard vao 2 method sau:

```java
public static double sum(List<_____> numbers) {
    return 0;
}

public static void addDefaults(List<_____> target) {
    target.add(1);
}
```

Yeu cau:

- `sum` nhan duoc `List<Integer>`, `List<Double>`, `List<Long>`.
- `addDefaults` nhan duoc `List<Integer>`, `List<Number>`, `List<Object>`.

**Tra loi:** ? extends Number , ? supper Integer ;


### Cau 7

Doi 3 lambda sau sang method reference:

```java
names.forEach(name -> System.out.println(name));
strings.stream().map(s -> s.toUpperCase());
numbers.stream().map(n -> n.doubleValue());
```

**Tra loi:** names.forEach(System.out::println) , strings.stream().map(String::toUpperCase) , numbers.stream().map(Number::doublevalue);


### Cau 8

Cho code:

```java
List<? super Integer> target = new ArrayList<Number>();
target.add(10);
```

Dong nao duoi day doc ra dung va an toan nhat? Chon 1 va giai thich:

```java
Integer a = target.get(0);
Number b = target.get(0);
Object c = target.get(0);
```

**Tra loi:** đọc ra kiểu object vì là super Integer thì sẽ là Integer hoặc các type cha của Integer là Number ,  Object , sẽ an toàn nhất khi ta đọc ra kiểu Object


---

## Phan C - Code mini (1 cau = 8 diem)

### Cau 9

Viet class `Result<T>` dung contract sau:

- class generic `Result<T>`
- field: `private final boolean success`, `private final String message`, `private final T data`
- private constructor nhan du 3 field va gan du 3 field
- static method `ok(T data)` tra ve `success = true`, `message = "OK"`, `data = data`
- static method `fail(String message)` tra ve `success = false`, `message = message`, `data = null`
- getter: `isSuccess()`, `getMessage()`, `getData()`

**Tra loi:**
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

    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public T getData() { return data; }
}
**Tra loi:** đọc ra kiểu object 
