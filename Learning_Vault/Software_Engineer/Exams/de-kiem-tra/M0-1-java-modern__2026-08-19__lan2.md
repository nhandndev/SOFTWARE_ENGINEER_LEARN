# De thi lai M0-1 - Optional, Records va Sealed Classes

**Topic:** `M0-1-java-modern`  
**Che do:** `THI_LAI`  
**Lan:** 2  
**Trong tam:** Optional chain, `orElseGet`, tranh `.get()`, record details  
**Tong diem tho:** 31 diem  
**Cach tinh diem:** `(diem dat duoc / 31) x 100`

## Huong dan

- Lam truc tiep vao dong `**Tra loi:**`.
- Tap trung viet dung code cho Optional.
- Khong mo file dap an truoc khi lam xong.

---

## Phan A - Ly thuyet ngan (4 cau x 3 diem = 12 diem)

### Cau 1

Neu `value = null`, `Optional.of(value)` va `Optional.ofNullable(value)` khac nhau the nao?

**Tra loi:** Optional.of(value) sẽ bị lỗi là null exception , còn Opttional.ofNullable(value) thì cái này nó không bị lỗi và xử lý qua optinal.empty();


### Cau 2

Vi sao khong nen goi `.get()` truc tiep tren Optional? Neu Optional rong thi loi gi co the xay ra?

**Tra loi:**không nên gọi trực tiếp vì nó sẽ có thể không cover được lúc mà value bị null , nếu optional rỗng thì lỗi null exception sẽ xảy ra


### Cau 3

Phan biet `orElse(loadDefaultName())` va `orElseGet(() -> loadDefaultName())` khi `loadDefaultName()` la ham ton chi phi.

**Tra loi:** cái thứ nhất nó sẽ chủ động loadDefaultName ra , còn cái thứ 2 là nó sẽ gọi thông qua suppiler và nó chỉ khi nào qua được thằng orElseget thì mới gọi loadDefaultNme lên .


### Cau 4

Record trong Java co sinh setter khong? Record tu sinh nhung method/thanh phan nao? Accessor cua record co dang `getName()` hay `name()`?

**Tra loi:** không sinh ra setter mà chỉ sinh ra constrcutor ,getter , hashcode , tostring . có dạng là name();


---

## Phan B - Tinh huong code (3 cau x 5 diem = 15 diem)

### Cau 5

Cho:

```java
Optional<Product> findById(Long id)
```

Viet code lay `name` cua product neu co, neu khong co thi tra `"Unknown product"`.

**Tra loi:** tôi chỉ viết sơ sơ có thể k đúng mã code
Strign name = Product.findById(id).map(Product->Product.getName()).orElseThrow(() -> AppException(Unknow product)) tôi thường hay làm Appexception


### Cau 6

Cho:

```java
Optional<Product> findById(Long id)
```

Viet code lay `price` cua product neu co, neu khong co thi tra `0`.

**Tra loi:**Long price= Product.findById(id).map(Product->Product.getPrice()).orElseThrow(0)


### Cau 7

Cho:

```java
Optional<String> optionalName
String loadDefaultName()
```

`loadDefaultName()` goi database. Viet code lay `name`, chi goi `loadDefaultName()` khi `optionalName` rong.

**Tra loi:**dùng orElseGet là được mà , cái này đơn giản tôi k muốn viết


---

## Phan C - Nhan dien sealed/record (1 cau x 4 diem = 4 diem)

### Cau 8

Trong `shopcore`, checkout result chi co 2 kha nang co dinh: thanh cong va that bai. Hay neu nen dung sealed interface hay interface binh thuong, va dat ten 2 implementation hop ly.

**Tra loi:**
nên dùng sealed interface vì nso chỉ có 2 khả năng cố định và chỉ cần implentment ra thôi ,c ái này cũng dễ nên tôi muốn tư udy thay vì viết
