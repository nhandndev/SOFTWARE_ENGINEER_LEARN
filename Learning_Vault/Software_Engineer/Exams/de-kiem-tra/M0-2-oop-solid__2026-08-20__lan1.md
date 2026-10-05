# De kiem tra nhanh M0-2 - OOP SOLID & Patterns

**Topic:** `M0-2-oop-solid`  
**Che do:** `NHANH`  
**Trong tam:** Encapsulation, composition, SOLID, pattern recognition, over-engineering  
**Tong diem tho:** 43 diem  
**Cach tinh diem:** `(diem dat duoc / 43) x 100`

## Huong dan

- Lam truc tiep vao cac dong `**Tra loi:**`.
- Co the tra loi bang y tuong ro rang; cau code mini can gan dung Java.
- Tap trung nhan dien vi pham va de xuat cach sua.
- Khong mo file dap an truoc khi lam xong.

---

## Phan A - Ly thuyet (6 cau x 3 diem = 18 diem)

### Cau 1

Encapsulation la gi? Vi sao `private field + getter/setter` chua chac da la encapsulation tot?

**Tra loi:** Encapsule là tính chất đóng gói , là tính chất mà object có thể tự bảo vệ tính đúng đắng của các field , nó sẽ có các method để validate các input ở bên ngoài , ví dụ như set thì sẽ có điều kiện để bảo vệ tính đúng dắnd . private field + getter/setter thì chưa đủ để là 1 encapsulation tốt vì thiếu cơ chế validate từ bên ngoài mà chỉ có đóng gói và private nó . có thể ngta sẽ set money là -10000 , chưa có cơ chế bảo vệ và hợp lý bussienss


### Cau 2

Giai thich `composition over inheritance`. Khi nao nen uu tien composition thay vi inheritance?

**Tra loi:** nên ưu tiên composition hơn là kế thừa , composition là has - A có nghĩa là nó có , còn inheritance là is a có nghĩa là nó là , chúng ta cần phải xét tính logic khi mà class A có mối quan hệ gì với class B , không thể nào cứ bừa bãi extends thì sẽ sai . Nên ưu tiên composition khi mà không phải là Is A mà nó chứa luôn cả object đó (has A),


### Cau 3

Giai thich SRP va OCP trong SOLID. Cho moi nguyen tac mot dau hieu code dang vi pham.

**Tra loi:** SRP là Singlet response principle có nghĩa là một class chỉ được có 1 lý do chung để thay đổi , tránh ôm quá nhiều trách nhiệm trong 1 class , ta nên phân ra được là khi mà có quá nhiều reasson để thay đổi thì đang vi phạm SRP . OCP là open closed principle có nghĩa là cho phép mở rộng để upcale code nhưng lại closed khi modified code cũ , có nghĩa là những feature mới khi update thêm thì ta chỉ nên update thêm code chứ không được sữa code cũ , vi phạm khi mà có thêm trường hợp mới ta lại sửa trong if hoặc sửa trong code cũ .


### Cau 4

Giai thich LSP va ISP. Vi sao class con throw `UnsupportedOperationException` cho method ke thua thuong la mui thiet ke sai?

**Tra loi:**
 LSP là khi mà một class là child của một class parent , khi mà thay đổi thành parent thì vẫn giữ được tính đúng dắng của class parent cũ , ví dụ như class bird ta có fly , khi mà extends cho thằng chim cánh cụt ( không thể bay được)
 và sau đó là 1 class chim lại extend thì con chim cánh cụt vô tình làm sai ý nghĩa là class cha . ISP là một interface không được đảm nhiệm quá nhiều thứ , nên tường minh càng tốt, chia để trị và nó giải quyết một vấn đề cụ thể , tránh việc ôm quá nhiều thứ làm cho interface đó chứa quá nhiều thứ không cần thiết. UnsupportPerationException là lỗi xuất hiện khi mà class con không hỗ trợ cái này và phải dùng instance of thì làm cho thiết kế bị sai ,
### Cau 5

Giai thich DIP. Vi sao constructor injection qua interface giup code de test hon?

**Tra loi:** DIP la 1 module cấp cao không phụ thuộc vào module cấp thấp , ví dụ nhưu car thì cần engine thì thay vì là new engine thì ta chỉ cần chứa object engine bên trong car và ở constrcutor có khia báo cái engine là được , constructor ịnection qua interface giúp code dễ test hơn vì là ta sẽ chỉ cần biết được là có interface này thôi còn chi tiết chọn gì thì sẽ chọn sau , giống như ta sẽ mock object thật ta chỉ cần biết là có object này là được


### Cau 6

Nhan dien ngan gon 5 pattern: Singleton, Factory, Builder, Strategy, Observer. Moi pattern giai quyet van de gi?

**Tra loi:**
Singleton là trong 1 class chỉ có 1 instance trả về , ví dụ nhu settings game thì nên chỉ là 1 instance chứ không được cấp phát bộ nhớ để tạo nên thành nhiều settings , nhận biết như là constructor private và có một public static để getinstance và instance
Factory là giống như là mình sẽ gọi lên một tập hợp để mà xử lý thay vì nói chi tiết , kiểu giống nhưu ta chỉ cần biết được alf sẽ giải quyết bằng gì , che giấu logic khởi tạo và implentment như nào 
Builder là thay vì ta bỏ trong constrcuter các field khó hiểu vì nó k có tên thì ta sẽ dùng builder để dễ dàng nhìn các field hơn
Strategy là design pattern kiểu chiến lược , ta thay vì chọn thẳng một cái để mà bị dependency thì ta sẽ chọn các chiến lược để mà giải quyết , ví dụ như là discount thì có nhiều loại discount và mỗi cái là 1 strategy , thay vì ta new thẳng 1 loại discount vào trong class giải quyết thì nó sẽ bị phụ thuộc , thứ ta truyền vào là 1 interface thì ta chỉ biết được alf sẽ có discount nhưng mà không biết chi tiết là loại discount nào 
Observer là designpattern theo kiể là cho các object khác đều biết được sự thay đổi của 1 class , phù hợp với file log , event listerner , thường tôi sẽ dùng annonation eventlisterner hơn là tự viết code

---

## Phan B - Tinh huong (3 cau x 5 diem = 15 diem)

### Cau 7

Ban thay class:

```java
public class Product {
    public String name;
    public int price;
}
```

Code ben ngoai co the set `price = -100` va `name = ""`. Hay chi ra van de OOP va de xuat cach sua theo encapsulation.

**Tra loi:** trong class Product thiếu khả năng tự bảo vệ object, tính đúng đắng của mình và cần phải sữa lại field phải private , cho thêm constrcuter , getter và setter ( chứa logic bảo vệ bussienss) , và name phải !=null , nếu null thì throw lỗi exception . phải validate là price không được âm , name k được trống , nên thêm method như changeName , changePricevà thêm điều kiện vô


### Cau 8

Ban thay class:

```java
public class DiscountCalculator {
    public int calculate(String type, int price) {
        if ("FIXED".equals(type)) return price - 100;
        if ("PERCENT".equals(type)) return price - price * 10 / 100;
        return price;
    }
}
```

Class nay co nguy co vi pham nguyen tac nao? Neu he thong se them nhieu loai discount, ban de xuat pattern/huong thiet ke nao?

**Tra loi:** nguy cơ bị lỗi OCP vì khả năng if else có thể bị phìn to ra , khi mà ta update thêm feature vô tình ta đã modify code cũ . Quy phạm nguyên tắt SRP khi mà calculate thì theo suy nghĩ là chỉ có tính toán thôi chứ không phải thêm phần chọn cách tính toán . Đề xuất chọn theo phương pháp strategy hoặc là factory để chọn các tính toán và calculate chỉ thực hiện tính toán như nào thôi , calculate(int price , Strategy discountpolicy ) và có interface stragetegy .


### Cau 9

Khi order duoc tao, he thong can gui email, ghi audit log, tru ton kho. Neu tat ca logic nay nam trong `OrderService.createOrder`, no co mui thiet ke gi? Pattern nao co the phu hop khi so hanh dong phu tang len?

**Tra loi:** theo kiểu observer , nó có thể dùng với các annoantion là EventListerner và sẽ có pusblisher , listerner , tôi chỉ nắm tới đó thôi vì tôi khá là dựa voà annonations 


---

## Phan C - Code mini (1 cau x 10 diem = 10 diem)

### Cau 10

Viet phac thao class `Product` co encapsulation va Builder:

- field: `Long id`, `String name`, `int price`
- field nen duoc che giau hop ly
- constructor chinh nen private va nhan Builder
- static method `builder()`
- nested static class `Builder`
- Builder co method `id`, `name`, `price`, moi method return `this`
- `build()` tao `Product`
- validate: `name` khong duoc null/blank, `price >= 0`

Khong can viet day du getter neu qua dai, nhung can the hien ro y tuong.

**Tra loi:**
//
//Viet phac thao class `Product` co encapsulation va Builder:
//
//        - field: `Long id`, `String name`, `int price`
//        - field nen duoc che giau hop ly
//- constructor chinh nen private va nhan Builder
//- static method `builder()`
//        - nested static class `Builder`
//        - Builder co method `id`, `name`, `price`, moi method return `this`
//        - `build()` tao `Product`
//        - validate: `name` khong duoc null/blank, `price >= 0`
@Getter
class Product {
    private Long id;
    private String name;
    private int price;
    @Builder
    private Product(Long id , String name , int price) {
        if(builder ==null || builder.name.isBlank()) {
            throw new IllegalArgumentException();
        }
        if(builder.price <= 0) {
            throw new IllegalArgumentException();
        }
        this.id = builder.id;
        this.name = builder.name;
        this.price = builder.price;
    }
}
mà tôi thường thường xài @Builder của lombok nên là phàn này tôi viết đại đại 

