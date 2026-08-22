# De kiem tra DAY_DU M0-1 - Java hien dai

**Topic:** `M0-1-java-modern`  
**Che do:** `DAY_DU`  
**Lan:** 3  
**Trong tam:** Generics, Lambda, Stream API, Optional, Records, sealed classes Java 17+  
**Tong diem tho:** 90 diem  
**Cach tinh diem:** `(diem dat duoc / 90) x 100`

## Huong dan

- Lam truc tiep vao dong `**Tra loi:**`.
- Phan ly thuyet co the tra loi bang y tuong ro rang, khong can van mau.
- Phan code mini can viet Java code dung y tuong va gan dung cu phap.
- Khong mo file dap an truoc khi lam xong.

---

## Phan A - Ly thuyet (10 cau x 3 diem = 30 diem)

### Cau 1

Generics trong Java giai quyet van de gi? Neu khong dung Generics, code co the gap rui ro nao lien quan den cast va runtime error?

**Tra loi:** Generic giải quyết được vấn đề multi type , khi một class/method có cùng mục đích mà lại khác kiểu dữ liệu thì thay vì ta phải viết lại thành nhiều method/class thì ta sẽ dùng để tái xử dụng code , chưa kể trong complier và cho lập trình viên hiểu được rằng type mà ta muốn là gì . Ta sẽ tránh được trường hợp cast thủ công và khi dùng Gênrics thì nó sẽ không bị lỗi runtime vì nó sẽ quét ở compile time 


### Cau 2

Giai thich `T extends Number`. Method/class dung `T extends Number` nhan duoc nhung kieu nao, va vi sao goi duoc `doubleValue()`?

**Tra loi:** T extends Number theo cách hiểu đơn giản là T nó sẽ có Scope là Number hoặc là con của Number , nó sẽ nhận được những kiểu dữ liệu như là Double , Integer , Float , những class con của number và Number và nó gọi được doubleValie() là gì extends khi đọc lên thì nó sẽ ra được cùng là Number nên là không bị sai .


### Cau 3

Giai thich PECS: `Producer Extends, Consumer Super`. Khi nao dung `? extends T`, khi nao dung `? super T`?

**Tra loi:** là Extends dùng để đọc ,super dùng để thêm , khi mà ta muốn đọc , print ra thì dùng extends T vì ? extends T thì nó sẽ có scope là T và các class con thì mỗi class con có thể đọc được chung 1 cái kiểu dữ liệu . ? super T thì scope sẽ là T và các class cha của T thì nó sẽ quy về 1 cái add để mà add vô được


### Cau 4

Functional Interface la gi? Lambda va method reference lien quan gi den Functional Interface?

**Tra loi:** Functinal Intefer là interface chỉ có duy nhất 1 method abstract  ( có thể có nhiều static , default method ) và cần override , lamda và method reference là cách mà ta override method abstract , thay vì annoynimous class để viết đè lên thì ta dùng lambda ( ví dụ là (paraemter) -> (điều kiện)) hoặc là (...::...) đều chung mục đích là để override method abstract


### Cau 5

Stream API khac collection o diem nao? Giai thich source, intermediate operation va terminal operation trong mot stream pipeline.

**Tra loi:** Stream API là cách xử lý theo dạng một luồng dữ liệu , source là để nói được cái nguòn mà ta sẽ xử lý , intermedia là giai đoạn ở giữa ta sẽ xử lý nhưu nào , ví dụ như là filter , map , skip .,,, và cuối cùng ta cần terminal ví dụ như tolist ,,,, nếu k có terminal thì không thể dùng dc stream , k hoàn thành dc


### Cau 6

Phan biet `filter` va `map` trong Stream API. Moi operation co lam doi kieu phan tu khong?

**Tra loi:** filter là để lọc dữ liệu , còn map thì dùng để chuyển dữ liệu thường T sang R 


### Cau 7

`reduce` dung de lam gi? Cho vi du y tuong mot truong hop nen dung `reduce`.

**Tra loi:** reduce là để rút gọn lại thành 1.  ví dụ như là tính tổng r đồ , tôi nhớ là reduce r có (0,(a,b)->a+b)l


### Cau 8

Phan biet `map` va `flatMap` trong Stream API. Khi nao can dung `flatMap`?

**Tra loi:** map dùng để biến đổi T -> r còn flatMap thì dùng để trải phẳng ra , ví dụ có 2 array thì khi k trải phẳng ra thì nó cũng sẽ tách riêng ra 2 array , nếu như dùng flatmap thì nó sẽ biến odidor lại thành 1 array thôi , trải phẳng


### Cau 9

Phan biet `Optional.of(value)` va `Optional.ofNullable(value)`. Neu value null thi moi cach hanh xu ra sao?

**Tra loi:**Optinal.of(value) dùng khi chắc chắn là sẽ không null , còn cái Optional.OfNullable(value) là value có thể bị null và nếu bị null thì cái thứ nhất sẽ bị null exception còn cái thứ 2 sẽ khongo bị


### Cau 10

Record va sealed class/interface trong Java 17+ dung de lam gi? Neu ngan gon mot truong hop nen dung record va mot truong hop nen dung sealed interface.

**Tra loi:** Record là cách viết một class dungf để chứa thông tin ( ví dụ như dto , request , response) ngắn gọn hơn so với class bình thường ( những data trong đây phải là bất biến) , sealed class/interface là ta đang giới hạn scope mà class có thể kế thừa tới được thằng dc sealed , mục đích để cho complier và dev biết được class nào được permits . Trường hợp nên dùng record là dữ liêu jbatas biến , dto , request , respóne ,.. truognwf hơp jdungf sealed là ta biết chính xác được là class/interface có mấy truognwf hợp , ví dụ như cái kết quả thì có thể là fail hoặc là success 


---

## Phan B - Tinh huong (8 cau x 5 diem = 40 diem)

### Cau 11

Ban co `List<Integer>`, `List<Double>`, `List<Long>` va muon viet method chi doc danh sach so de tinh tong. Vi sao khong nen dung `List<Number>`? Hay de xuat signature dung hon.

**Tra loi:**ta nên dùng List<Integer> k thể dùng List<Number> để mà đọc vì bị vi phạm . Ta nên dùng ? extends Number để đọc 


### Cau 12

Ban can viet method them cac gia tri mac dinh `1`, `2`, `3` vao list co the la `List<Integer>`, `List<Number>`, hoac `List<Object>`. Nen dung wildcard nao va vi sao khi doc ra chi an toan nhat la `Object`?

**Tra loi:** ? super Integer vì nó có thể thêm vào được Integer , Number , Object vì Integer là Number,object và number là number/object và đọc an toàn thì là object khi dùng super


### Cau 13

Cho:

```java
List<Product> products;
```

Moi `Product` co `name`, `price`, `active`. Hay mo ta hoac viet stream pipeline de lay danh sach ten cua cac product dang active.

**Tra loi:**
String name = products.stream().filter(Product -> Product.active==True).map(Product -> product.name()).toString ( na ná kiểu này )

### Cau 14

Cho:

```java
List<Product> products;
```

Moi `Product` co `category`. Hay mo ta hoac viet stream pipeline de nhom product theo category bang `Collectors`.

**Tra loi:** sẽ dùng Map<String,Product> xong dùng collectos.groupby(Product->Product.category());


### Cau 15

Cho:

```java
List<Order> orders;
```

Moi `Order` co `List<OrderItem> items`. Hay mo ta hoac viet stream pipeline de lay tat ca `OrderItem` thanh mot list phang. Vi sao dung `flatMap` thay vi `map`?

**Tra loi:** List<OrderItem> items = List<Order>.stream().toFlatMap(Order->Order.items.stream()) kieuer kieu v  . Nên dùng flatMap để nó trải thẳng vì đây là xử lý list, nếu dùng mỗi map thì vẫn trả về theo dnajg nhiều list còn flatmap thì se trả về 1 list.


### Cau 16

Cho:

```java
Optional<Product> findById(Long id)
```

Hay lay ten product neu co, neu khong co thi tra `"Unknown product"`. Giai thich vi sao khong nen goi `.get()` truc tiep.

**Tra loi:** String name = Product.findById(Id).orElse("Unknow Product") , k dùng .get() vì ta phải xử lý được value bị null đã .


### Cau 17

Ban thay code:

```java
String name = optionalName.orElse(loadDefaultName());
```

Trong do `loadDefaultName()` goi database. Code nay co van de gi? Hay de xuat cach tot hon.

**Tra loi:** bị vấn đề là dùng orElse thì nó sẽ chủ động loadDèaultName mà không chờ cho optionalName không có , nó sẽ bị truy xuất một cách bừa bãi , tôi nghĩ là nên dùng .orElseGet() thì nó sẽ dùng chỉ khi mà optionalName nó bị null .


### Cau 18

Trong `shopcore`, checkout result chi co 2 kha nang co dinh: thanh cong hoac that bai. Nen dung sealed interface/class hay interface binh thuong? Neu ten 2 implementation hop ly va ly do.

**Tra loi:**.Chon sealed interface/class vi checkout result co tap kha nang co dinh và  Neu 2 implementation hop ly: `CheckoutSuccess`, `CheckoutFailed` và Nen dung record cho implementation neu moi case chi chua data và sealed dùng để chặn scope lại k cho phép class/interface bị ké thừa bừa bãi và được phpes ở trong permits 


---

## Phan C - Code mini (2 cau x 10 diem = 20 diem)

### Cau 19

Viet class generic `Result<T>` co:

- field `private final boolean success`
- field `private final String message`
- field `private final T data`
- private constructor gan du 3 field
- static method `ok(T data)` tra success true, message `"OK"`, data duoc truyen vao
- static method `fail(String message)` tra success false, message duoc truyen vao, data null
- getter `isSuccess()`, `getMessage()`, `getData()`

**Tra loi:**


public class Result<T> {
    private final boolean success;
    private final T data;
    private final String message;
    public Result(boolean success,String message ,T data    ) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
    public boolean isSuccess() {
        return success;
    }
    public T getData() {
        return data;
    }
    public String getMessage() {
        return message;
    }
    public  static <T> Result<T> ok(T data  ) {
      return new  Result<>(true,"OK",data);
    }
    public  static  <T>Result<T> fail(String message ) {
        return new  Result<>(false,"message",null);
    }

}
### Cau 20

Viet Java code cho:

- record `ProductResponse(Long id, String name, int price)`
- sealed interface `CheckoutResult` chi cho phep:
  - record `CheckoutSuccess(Long orderId, int totalPrice)`
  - record `CheckoutFailed(String reason)`

**Tra loi:**
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
