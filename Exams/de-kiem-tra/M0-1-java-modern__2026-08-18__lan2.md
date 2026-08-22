# De thi lai M0-1 - Java hien dai

**Topic:** `M0-1-java-modern`  
**Che do:** `THI_LAI`  
**Trong tam:** Generics, PECS, Method Reference, `Result<T>`  
**Tong diem tho:** 46 diem  
**Cach tinh diem:** `(diem dat duoc / 46) x 100`

## Huong dan

- Lam truc tiep vao cac dong `**Tra loi:**`.
- Khong mo file dap an truoc khi lam xong.
- Cau code can viet Java code ro y tuong, uu tien dung cu phap.

---

## Phan A - Ly thuyet (6 cau x 3 diem = 18 diem)

### Cau 1

Generics giup Java type-safe o thoi diem nao: compile-time hay runtime? Giai thich ngan gon va neu 1 loi ma Generics giup han che.

**Tra loi:** type-safe ở runtime , vì là nếu không generic thì là có thể bị lỗi cast exception , việc thêm generic để cho compiler xác định được type để hạn chế việc cast thủ công 


### Cau 2

Trong `public class Result<T>`, `T` co y nghia gi? Khi viet `Result<String>` thi `T` tro thanh kieu nao?

**Tra loi:** T có nghĩa là type , cho phép nhiều loại kiểu dữ liệu trên 1 class thay vì viết thành nhiều class , khi viết Resutl<String> thì t trở htanhf String


### Cau 3

Voi method:

```java
public static <T extends Number> double convert(T value)
```

`T extends Number` cho phep method nhan cac kieu nao, va vi sao trong method goi duoc `value.doubleValue()`?

**Tra loi:** cho phép nhận kiểu Number và con của Number , vì là giới hạn và cho compiler biết được cái scope nên là có thể gọi dc method doubleValue()


### Cau 4

Viet lai quy tac PECS bang ngon ngu cua ban. Cho biet `? extends T` va `? super T` khac nhau o muc dich doc/ghi nhu the nao.

**Tra loi:** PECS là Product Extends , Nhập dữ liệu thì là super , ? extends T để giải quyết được vấn đề xuất dữ liệu vì nó đọc kiểu gì cũng là Integer , ? super T thì nhập dữ liệu cũng là Integer ( nếu generic là ? super/exends Integer)


### Cau 5

Functional Interface la gi? Vi sao lambda chi dung truc tiep duoc voi Functional Interface?

**Tra loi:** Funtioncal Interface là trong 1 absstract class chỉ có 1 abstract method cần được overrride ( có thể có nhiều method static , method default) miễn là có 1 abstract method


### Cau 6

Method reference la gi? Khi nao nen doi lambda sang method reference?

**Tra loi:**  là một dạng ngắn gọn của lambda khi nó xử lý một method đã có sẵn , nên đổi sang method reference khi method đó không làm việc gì ngoài việc .... ,việc viết mtethod refernce để cho ngắn gọn 


---

## Phan B - Tinh huong (4 cau x 5 diem = 20 diem)

### Cau 7

Giai thich vi sao doan code sau khong nen/khong the thiet ke theo `List<Number>` neu caller co `List<Integer>`:

```java
public static double sum(List<Number> numbers)
```

Hay de xuat signature dung hon neu method chi doc du lieu de tinh tong.

**Tra loi:**  chỉ đọc đêt ính tổng thì nên xài ? extends Integer vì kiểu gì nó sẽ có thể là Integer , hoặc là các type con của Integer 


### Cau 8

Cho method:

```java
public static void addDefaults(List<? super Integer> target) {
    target.add(1);
    target.add(2);
}
```

Method nay co the nhan nhung loai list nao trong 3 list sau: `List<Integer>`, `List<Number>`, `List<Object>`? Giai thich vi sao add `Integer` la an toan.

**Tra loi:** Interger an toàn vì là ? super Integer thì nó sẽ có thể là Integer hoặc là cha của Integer , Number là Integer và Object cũng là Integer


### Cau 9

Trong `List<? super Integer> target`, vi sao doc ra khong nen viet:

```java
Integer x = target.get(0);
```

Nen doc ra bang kieu nao la an toan nhat?

**Tra loi:** Number


### Cau 10

Doi cac lambda sau sang method reference neu co the:

```java
names.forEach(name -> System.out.println(name));
strings.stream().map(s -> s.toUpperCase());
numbers.stream().map(n -> n.doubleValue());
```

**Tra loi:** names.forEch(System.out::println) , 2 cía kia quên r


---

## Phan C - Code mini (1 cau x 8 diem = 8 diem)

### Cau 11

Viet class generic `Result<T>` co:

- `boolean success`
- `String message`
- `T data`
- private constructor
- `public static <T> Result<T> ok(T data)`
- `public static <T> Result<T> fail(String message)`
- getter cho 3 field

Yeu cau:

- `ok(data)` tra ve `success = true`, `message = "OK"`, `data = data`.
- `fail(message)` tra ve `success = false`, `message = message`, `data = null`.

**Tra loi:**
``
public class Result<T> {
    private String message;
    public boolean success;
    public T result;
    public Result(String message, boolean success, T result) {
        this.message = message;
    }
    public static <T> Result<T> success(T result) {
        return new Result<>("Success", true, result);
    }
    public static <T> Result<T> failure(String message) {
        return new Result<>(message, false, null);
    }
    public String getMessage() {
        return message;
    }
    public boolean isSuccess() {
        return success;
    }
    public T getResult() {
        return result;
    }
}
``


