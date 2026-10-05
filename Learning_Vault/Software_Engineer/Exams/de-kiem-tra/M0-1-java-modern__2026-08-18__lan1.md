# De kiem tra nhanh M0-1 - Java hien dai

**Topic:** `M0-1-java-modern`  
**Che do:** `NHANH`  
**Trong tam:** Generics & Lambda  
**Tong diem tho:** 43 diem  
**Cach tinh diem:** `(diem dat duoc / 43) x 100`

## Huong dan

- Tra loi ngan gon nhung du y.
- Voi cau code, viet Java code co the doc va bien dich ve y tuong.
- Khong xem file dap an khi chua lam xong.

---

## Phan A - Ly thuyet (6 cau x 3 diem)

### Cau 1

Generics trong Java giai quyet van de gi? Neu khong dung Generics, code thuong gap rui ro nao lien quan den type-safety?

**Tra loi:** Generics trong java giải quyết được vấn đề type , khi mà class , interface , method cho phép flex type , ví dự như là 1 class có thể dùng cho nhiều kiểu dữ liệu mà không cần phải viết ra nhiều class xử lý riêng từng type
nếu không dùng gênric thì code sẽ gặp lỗi unchecked , runtime vì có thể nó sẽ bị castexception khi cast lên cha ,


### Cau 2

Giai thich y nghia cua type parameter `<T>` trong class `Box<T>`. Tai sao `T` khong phai la mot kieu cu the nhu `String` hay `Integer`?

**Tra loi:**  T là quy ước đặt chung là type , vì trong box có thể sẽ xử lý cả String hoặc Integer , việc để <T> để cho biết rằng là ta có thể gắn các kiểu khác nhau mà không cố định


### Cau 3

Bounded type `T extends Number` co tac dung gi? Cho biet trong class/method dung `T extends Number`, ban co the goi duoc nhung loai method nao tren bien kieu `T`.

**Tra loi:** T extends Number để giảm scope của nó , nói thông thường thì là T là con của number , có nghĩa là nó chỉ có thể là Integer , Double , Float ,.. các kiểu con của Number hoặc là Number , . 


### Cau 4

Giai thich quy tac PECS: `Producer Extends, Consumer Super`. Khi nao dung `? extends T`, khi nao dung `? super T`?

**Tra loi:** Producer Extends , Comsumer Super có nghigax là Extends dùng để đọc , super dùng để add , ? extends dùng khi mà ta chỉ cần print hoặc đọc còn super khi ta add


### Cau 5

Functional Interface la gi? Annotation `@FunctionalInterface` co bat buoc khong, va no giup ich gi?

**Tra loi:**Functional Interface là interface chỉ có một abstract method , static method và @Functionall Interface không bắt buộc những khuyến khích nên ghi và nó giúp ích cho dev và compiler khi quét annonation này 


### Cau 6

Lambda expression khac anonymous class o diem nao ve cach viet va muc dich su dung? Cho mot vi du ngan.

**Tra loi:** Lambda expression khác với annoymous class ở điểm cách viết ngắn gọn 
lambda chỉ cần (parameter ) ->method , trong khi là annomous cần phải new và viết một hàm nhỏ @ôverride trong đó , mục đích xử dụng là để ngắn gonj hơn thôi 
ví dụ thì là ( có thể viết code bị sai nhma tôi nói lên ý tưởng ) , lambda expression như sau : 
có một abstract class có 1 absstract method là tính tổng thì lambda sẽ (a,b) -> a+b; 
còn cái annoimous sẽ phải new sum{
    @Oveeride 
    ,, r viết hàm ôveride
}


---

## Phan B - Tinh huong (3 cau x 5 diem)

### Cau 7

Ban co method can doc danh sach so de tinh tong:

```java
double sum(List<? extends Number> numbers)
```

Vi sao signature nay hop ly hon `List<Number>` neu caller co `List<Integer>` hoac `List<Double>`?

**Tra loi:** vì ta sẽ cần phải viết lại 2 hàm , nếu như mà 20.5 thì chỉ có mỗi Double mới có thể lưu trữ trong list còn interger thì không 


### Cau 8

Ban can viet method them cac `Integer` vao mot list dau vao:

```java
void addDefaults(List<? super Integer> target)
```

Vi sao method nay co the them `Integer`, nhung khi doc phan tu ra thi khong nen gan truc tiep vao bien `Integer`?

**Tra loi:** k biết


### Cau 9

Trong code review, ban thay doan code:

```java
names.forEach(name -> System.out.println(name));
```

Ban co de xuat doi sang method reference khong? Neu co, viet lai va noi ro dieu kien nao khien method reference phu hop.

**Tra loi:**đề xuất đổi sang referecne là names.forEch(print::name) ( tôi chưa hiểu thực sự method reference thì nó sẽ viết theo quy luật gì )


---

## Phan C - Code mini (1 cau x 10 diem)

### Cau 10

Viet mot class generic `Result<T>` don gian co:

- field `boolean success`
- field `String message`
- field `T data`
- static factory method `ok(T data)`
- static factory method `fail(String message)`
- getter can thiet

Yeu cau: `ok` phai tra ve success = true, message co the la `"OK"`; `fail` phai tra ve success = false va data = null.

**Tra loi:** tôi lười làm quá

