# Dap an - De thi lai M0-1 - Java hien dai

**Topic:** `M0-1-java-modern`  
**Che do:** `THI_LAI`  
**Tong diem tho:** 46 diem  
**Normalize:** `(diem tho / 46) x 100`

---

## Phan A - Ly thuyet

### Cau 1 - 3 diem

- 1d: Type-safe o compile-time.
- 1d: Compiler chan viec dua sai kieu vao generic collection/class.
- 1d: Neu duoc loi nhu cast thu cong sai, `ClassCastException` luc runtime.

### Cau 2 - 3 diem

- 1d: `T` la type parameter/bien kieu.
- 1d: `T` dai dien cho kieu cua `data` trong `Result<T>`.
- 1d: `Result<String>` lam `T` tro thanh `String`.

### Cau 3 - 3 diem

- 1d: Nhan `Number` hoac subtype cua `Number`.
- 1d: Vi du hop le: `Integer`, `Double`, `Long`, `Float`.
- 1d: Goi duoc `doubleValue()` vi compiler biet `T` la mot dang `Number`.

### Cau 4 - 3 diem

- 1d: PECS = Producer Extends, Consumer Super.
- 1d: `? extends T` dung khi chu yeu doc du lieu ra nhu `T`.
- 1d: `? super T` dung khi chu yeu ghi/add du lieu kieu `T` vao.

### Cau 5 - 3 diem

- 1d: Functional Interface co dung mot abstract method.
- 1d: Lambda la implementation cho abstract method do.
- 1d: Neu co nhieu abstract method, compiler khong biet lambda map vao method nao.

### Cau 6 - 3 diem

- 1d: Method reference la cach rut gon lambda bang `::`.
- 1d: Dung khi lambda chi goi mot method da co.
- 1d: Khong nen doi neu lambda co them logic phu/nhieu buoc.

---

## Phan B - Tinh huong

### Cau 7 - 5 diem

- 2d: Noi duoc `List<Integer>` khong phai subtype cua `List<Number>`.
- 1d: Giai thich neu cho phep co the add sai subtype vao list.
- 1d: Signature dung: `List<? extends Number>`.
- 1d: Vi method chi doc de tinh tong nen `extends` phu hop.

### Cau 8 - 5 diem

- 2d: Nhan duoc ca `List<Integer>`, `List<Number>`, `List<Object>`.
- 2d: Add `Integer` an toan vi Integer la Integer, la Number, va la Object.
- 1d: Lien he dung voi Consumer Super.

### Cau 9 - 5 diem

- 2d: `target` co the thuc te la `List<Object>` hoac `List<Number>`.
- 1d: Trong list do co the co gia tri khong phai `Integer`.
- 1d: Compiler chi dam bao doc ra la `Object`.
- 1d: Cach an toan: `Object x = target.get(0);`.

### Cau 10 - 5 diem

- 2d: `names.forEach(System.out::println);`
- 1.5d: `strings.stream().map(String::toUpperCase);`
- 1.5d: `numbers.stream().map(Number::doubleValue);`

---

## Phan C - Code mini

### Cau 11 - 8 diem

Tham khao:

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

- 1d: Khai bao `Result<T>` dung.
- 1.5d: Co du 3 field dung kieu.
- 1d: Private constructor dung.
- 1.5d: `ok(T data)` dung static generic method va tra success/message/data dung.
- 1.5d: `fail(String message)` dung static generic method va tra success/message/null dung.
- 1.5d: Getter day du, code ro rang.

