# Dap an - De thi lai ngan M0-1 - Generics & Lambda

**Topic:** `M0-1-java-modern`  
**Che do:** `THI_LAI`  
**Lan:** 3  
**Tong diem tho:** 35 diem  
**Normalize:** `(diem tho / 35) x 100`

---

## Phan A - Ly thuyet trong tam

### Cau 1 - 3 diem

- 1d: Tra loi dung la compile-time.
- 1d: Giai thich compiler kiem tra kieu truoc khi chuong trinh chay.
- 1d: Neu duoc loi han che: cast sai, add sai type vao collection, `ClassCastException` runtime.

### Cau 2 - 3 diem

- 1d: Noi duoc generic trong Java la invariant.
- 1d: `List<Integer>` khong phai subtype cua `List<Number>`.
- 1d: Giai thich neu cho phep co the add `Double` vao list Integer thong qua bien `List<Number>`.

### Cau 3 - 3 diem

- 1d: Chon `List<? extends Number>`.
- 1d: Vi method nhan duoc `List<Integer>`, `List<Double>`, `List<Long>`.
- 1d: Vi method chi doc du lieu ra nen `extends` phu hop.

### Cau 4 - 3 diem

- 1d: `? super Integer` co the la `List<Integer>`, `List<Number>`, `List<Object>`.
- 1d: Add `Integer` an toan vi `Integer` hop voi ca 3 loai tren.
- 1d: Doc ra chi chac chan la `Object`, vi list thuc te co the la `List<Object>`.

### Cau 5 - 3 diem

- 1d: Functional Interface la interface co dung 1 abstract method.
- 1d: Lambda la cach implement abstract method do.
- 1d: Neu co nhieu abstract method, compiler khong biet lambda ung voi method nao.

---

## Phan B - Ap dung nhanh

### Cau 6 - 4 diem

Dap an:

```java
public static double sum(List<? extends Number> numbers)
public static void addDefaults(List<? super Integer> target)
```

Cham diem:

- 2d: `? extends Number` cho `sum`.
- 2d: `? super Integer` cho `addDefaults`.

### Cau 7 - 4 diem

Dap an:

```java
names.forEach(System.out::println);
strings.stream().map(String::toUpperCase);
numbers.stream().map(Number::doubleValue);
```

Cham diem:

- 1.5d: `System.out::println`.
- 1.25d: `String::toUpperCase`.
- 1.25d: `Number::doubleValue`.

### Cau 8 - 4 diem

Dap an:

```java
Object c = target.get(0);
```

Cham diem:

- 2d: Chon `Object c`.
- 1d: Giai thich `? super Integer` doc ra chi dam bao la `Object`.
- 1d: Noi duoc `Integer`/`Number` khong an toan vi target co the la `List<Object>`.

---

## Phan C - Code mini

### Cau 9 - 8 diem

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

Cham diem:

- 1d: `Result<T>` dung.
- 1d: 3 field dung ten/kieu/modifier gan dung.
- 1d: private constructor dung va gan du field.
- 1.5d: `ok(T data)` dung ten, static generic method, tra dung success/message/data.
- 1.5d: `fail(String message)` dung ten, static generic method, tra dung success/message/null.
- 1d: getter dung ten.
- 1d: code ro rang, gan field khong sot.

