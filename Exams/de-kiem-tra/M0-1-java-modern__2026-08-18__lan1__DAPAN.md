# Dap an - De kiem tra nhanh M0-1 - Java hien dai

**Topic:** `M0-1-java-modern`  
**Che do:** `NHANH`  
**Trong tam:** Generics & Lambda  
**Tong diem tho:** 43 diem  
**Normalize:** `(diem tho / 43) x 100`

---

## Phan A - Ly thuyet

### Cau 1 - 3 diem

- 1d: Generics cho phep viet class/method/interface dung duoc voi nhieu kieu du lieu.
- 1d: Type-safe luc compile-time.
- 1d: Giam cast thu cong va tranh loi `ClassCastException` khi runtime.

### Cau 2 - 3 diem

- 1d: `<T>` la bien kieu/type parameter.
- 1d: Kieu cu the duoc truyen khi khoi tao/su dung, vi du `Box<String>`.
- 1d: Giup code tai su dung va van giu duoc type-safety.

### Cau 3 - 3 diem

- 1d: `T extends Number` gioi han `T` phai la `Number` hoac subtype cua `Number`.
- 1d: Cho phep dung cac method cua `Number`, vi du `doubleValue`, `intValue`.
- 1d: Van giu tinh generic cho `Integer`, `Double`, `Long`, ...

### Cau 4 - 3 diem

- 1d: `? extends T` dung khi collection san xuat du lieu de doc ra nhu `T`.
- 1d: `? super T` dung khi collection tieu thu/nhan du lieu kieu `T`.
- 1d: Noi duoc tinh chat doc/ghi: extends doc an toan, super ghi an toan.

### Cau 5 - 3 diem

- 1d: Functional Interface co dung mot abstract method.
- 1d: Co the dung voi lambda/method reference.
- 1d: `@FunctionalInterface` khong bat buoc nhung giup compiler bat loi neu interface khong con hop le.

### Cau 6 - 3 diem

- 1d: Lambda viet ngan gon hon anonymous class.
- 1d: Dung de truyen hanh vi/function nhu mot gia tri cho functional interface.
- 1d: Co vi du hop ly, vi du `(a, b) -> a + b`.

---

## Phan B - Tinh huong

### Cau 7 - 5 diem

- 2d: `List<Integer>` khong phai subtype cua `List<Number>`.
- 2d: `? extends Number` chap nhan `List<Integer>`, `List<Double>`, ...
- 1d: Method chi can doc so ra, nen upper bound la hop ly.

### Cau 8 - 5 diem

- 2d: `? super Integer` chap nhan `List<Integer>`, `List<Number>`, `List<Object>`.
- 2d: Co the add `Integer` vi moi target deu nhan duoc `Integer`.
- 1d: Doc ra chi an toan nhat la `Object`, vi list co the la list cua mot supertype.

### Cau 9 - 5 diem

- 2d: Viet lai dung: `names.forEach(System.out::println);`
- 2d: Method reference phu hop khi lambda chi goi mot method da co.
- 1d: Giai thich code ngan gon hon nhung khong doi hanh vi.

---

## Phan C - Code mini

### Cau 10 - 10 diem

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

- 2d: Class generic `Result<T>` dung cu phap.
- 2d: Co du 3 field dung y nghia.
- 2d: Constructor/factory tao object hop ly.
- 2d: `ok(T data)` dung generic static method va success/data dung.
- 1d: `fail(String message)` success false va data null.
- 1d: Getter hop ly, code ro rang.

