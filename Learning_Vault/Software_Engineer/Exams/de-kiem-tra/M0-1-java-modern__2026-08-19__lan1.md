# De kiem tra nhanh M0-1 - Optional, Records va Sealed Classes

**Topic:** `M0-1-java-modern`  
**Che do:** `NHANH`  
**Trong tam:** Optional, Records, sealed classes Java 17+  
**Tong diem tho:** 43 diem  
**Cach tinh diem:** `(diem dat duoc / 43) x 100`

## Huong dan

- Lam truc tiep vao cac dong `**Tra loi:**`.
- Tra loi ngan nhung phai dung y.
- Cau code can viet Java code ro y tuong va dung contract.
- Khong mo file dap an truoc khi lam xong.

---

## Phan A - Ly thuyet (6 cau x 3 diem = 18 diem)

### Cau 1

`Optional<T>` dung de giai quyet van de gi? Vi sao Optional thuong nen xuat hien o return type cua method?

**Tra loi:** dùng để giải quyết vấn đề có thể null của một method/object/field ( theo anti-pattern thì nên để optional trong method) , optional thường nên xuất hiện để ch compiler hoặc dev biết là nó có thể bị null và tránh việc lồng if else vô bừa bãi


### Cau 2

Phan biet `Optional.of(value)` va `Optional.ofNullable(value)`. Neu `value = null` thi moi cach hanh xu ra sao?

**Tra loi:** Optional.of dùng khi bạn biết chắc chắn là value k null , nếu null thì bị lỗi null exception , còn Opttional.ofNullAble thì có thể là value đó bị null . Nếu value = null thì cái đầu tiên sẽ bị lỗi null , cái thứ 2 thì sẽ không bị sao .


### Cau 3

Phan biet `Optional.map(...)` va `Optional.flatMap(...)`. Khi nao dung `flatMap` de tranh `Optional<Optional<T>>`?

**Tra loi:**  Optional.map dùng để biến đổi giá trị thường T thành R , giống map trong stream . Optional.flatMap khi mà function trả về optional thì ta dùng flatmap để tránh bị lồng Optional<Optional<T>>


### Cau 4

Phan biet `orElse(defaultValue)` va `orElseGet(() -> defaultValue)`. Khi nao nen uu tien `orElseGet`?

**Tra loi:**  cả 2 đều trả về defaultValue , tuy nhiên là cái đầu là nó sẽ tự sinh ra luôn mà không cần phải orElse r mới sinh , còn cái thứ 2 là sinh ra từ suppiler và chỉ khi nào orElse thì nó mới sinh ra . ưu tiên orElseGet khi mà xử lý được trường hợp rỗng của value rồi 


### Cau 5

Record trong Java 17+ la gi? Record tu sinh nhung thanh phan nao, va getter/accessor cua record co dang gi?

**Tra loi:** Record là một cách viết ngắn gọn của một class chỉ chứa giá trị bất biến( ví dụ nhưu dto , request , resposne .,,) nó sẽ tự sinh ra các thànn phần như constructor , getter , setter , hashmap , tostring , và getter sẽ có dạng là attribute của nó thôi .


### Cau 6

Sealed class/interface dung de lam gi? Giai thich vai tro cua `sealed`, `permits`, `final`, `non-sealed` o muc nhan dien.

**Tra loi:** Sealed hay còn gọn là giới hạn của một class/interface cho phép class khác extends hay implentment lên class đó thông qua permit . sealed có nghĩa là tôi đã giải thích rồi , permits là những class được phép extends hay implentment lên , final nghĩa là class đó sẽ là calss final và không cho phép class khác được kế thàuw nữa , non-seald nghĩa là ở class này sẽ không giới hạn các class khác kế thauwf lên class đó 


---

## Phan B - Tinh huong (3 cau x 5 diem = 15 diem)

### Cau 7

Ban co method tim product:

```java
Optional<Product> findById(Long id)
```

Hay viet code lay ten product neu tim thay, neu khong co thi tra ve `"Unknown product"`. Giai thich vi sao cach nay tot hon goi `.get()` truc tiep.

**Tra loi:** Optional<Product> findById(Long id).orElse


### Cau 8

Ban thay code:

```java
String name = optionalName.orElse(loadDefaultName());
```

Trong do `loadDefaultName()` goi database. Code nay co van de gi? Hay viet lai cach tot hon.

**Tra loi:** tôi k viết code ,nhưng mà tôi nói cách làm , dùng get nha do orElse thì nó sẽ tự gọi loadDefaultName luôn thì truy vấn database một cách chủ động vậy thì k tốt , nen theo kiểu Lazy Fetch 


### Cau 9

Trong `shopcore`, ban can bieu dien ket qua checkout chi co 2 kha nang: thanh cong hoac that bai. Ban nen dung interface binh thuong, record, sealed interface, hay class mutable? Giai thich lua chon va neu ten 2 implementation hop ly.

**Tra loi:**thanh cong hoặc thất bại thì dùng sealed và record nha , sealed vì ta biết dc là chỉ có 2 khả năng còn record vì nó chỉ là class chứa thông tin thôi


---

## Phan C - Code mini (1 cau x 10 diem = 10 diem)

### Cau 10

Viet Java code cho:

- record `ProductResponse(Long id, String name, int price)`
- sealed interface `CheckoutResult` chi cho phep 2 implementation:
  - `CheckoutSuccess(Long orderId, int totalPrice)`
  - `CheckoutFailed(String reason)`
- 2 implementation nen la record neu hop ly

Yeu cau dung cu phap Java 17+ o muc y tuong.

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
