# README tổng kết M0-2: OOP SOLID & Patterns

Nguồn chấm:

```text
Exams/de-kiem-tra/M0-2-oop-solid__2026-08-20__lan1.md
```

Kết quả sau chấm lại:

```text
38 / 43 = 88 / 100 -> Đạt
```

Bạn đã đạt M0-2 về mặt kiểm tra nhanh. Phần lý thuyết và nhận diện thiết kế khá tốt. Phần cần luyện thêm là viết Builder/Lombok Builder cho đúng cú pháp và validate đúng chỗ.

---

## 1. Tổng quan

### Bạn làm tốt

- Hiểu encapsulation không chỉ là private field.
- Hiểu composition vs inheritance ở mức has-a/is-a.
- Nhận diện SRP/OCP tốt.
- Hiểu LSP/ISP/DIP đủ dùng.
- Nhận diện 5 pattern cơ bản khá tốt.
- Nhận diện tình huống vi phạm OCP/SRP và đề xuất Strategy/Factory.
- Nhận diện Observer/EventListener cho side effects khi order created.

### Cần luyện thêm

- Diễn đạt composition sâu hơn: giảm coupling, thay behavior dễ hơn.
- Câu Observer cần nói rõ `OrderService` đang vi phạm SRP.
- Nếu dùng Lombok `@Builder`, constructor validate trực tiếp bằng tham số `name`, `price`, không dùng biến `builder`.
- Nếu tự viết Builder, phải có `builder()` và `build()`.

---

## 2. Tổng kết từng câu

### Câu 1: Encapsulation

**Bạn làm được:**  
Bạn hiểu encapsulation là object tự bảo vệ tính đúng đắn của field, và private field + getter/setter chưa đủ nếu setter không validate.

**Còn thiếu:**  
Không đáng kể. Chỉ cần dùng từ chuẩn hơn: invariant.

**Giải pháp:**  
Mẫu trả lời:

```text
Encapsulation là che giấu state bên trong object và chỉ cho thay đổi qua method có kiểm soát để bảo vệ invariant.
```

---

### Câu 2: Composition over inheritance

**Bạn làm được:**  
Bạn phân biệt được `has-a` và `is-a`, biết không nên extends bừa.

**Còn thiếu:**  
Bạn chưa nói rõ lợi ích thực tế: composition giảm coupling với class cha và dễ thay behavior.

**Giải pháp:**  
Mẫu trả lời:

```text
Ưu tiên composition khi object chỉ cần dùng một hành vi có thể thay đổi. Inheritance chỉ nên dùng khi quan hệ is-a thật sự rõ.
```

---

### Câu 3: SRP và OCP

**Bạn làm được:**  
Bạn hiểu SRP là một class có một lý do chính để thay đổi. Bạn hiểu OCP là mở rộng bằng code mới, hạn chế sửa code cũ.

**Còn thiếu:**  
Không đáng kể. Diễn đạt “Singlet response” nên sửa thành “Single Responsibility”.

**Giải pháp:**  
Nhớ đúng tên:

```text
Single Responsibility Principle
Open/Closed Principle
```

---

### Câu 4: LSP và ISP

**Bạn làm được:**  
Ví dụ Bird/Penguin đúng hướng. Bạn hiểu interface không nên ôm quá nhiều method.

**Còn thiếu:**  
Bạn nhắc `instanceof` hơi lệch trọng tâm. Điểm chính là class con không thay thế được class cha.

**Giải pháp:**  
Mẫu trả lời:

```text
Nếu class con phải throw UnsupportedOperationException cho method kế thừa, nó thường không thật sự thay thế được class cha, nên có nguy cơ vi phạm LSP.
```

---

### Câu 5: DIP

**Bạn làm được:**  
Bạn hiểu module cấp cao không nên `new` trực tiếp module cấp thấp, nên nhận dependency qua constructor/interface để dễ mock khi test.

**Còn thiếu:**  
Không đáng kể.

**Giải pháp:**  
Mẫu code:

```java
public class OrderService {
    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
}
```

---

### Câu 6: Nhận diện pattern

**Bạn làm được:**  
Bạn nhận diện tốt Singleton, Factory, Builder, Strategy, Observer. Đặc biệt Strategy ví dụ discount khá đúng.

**Còn thiếu:**  
Factory nên nói rõ hơn là tạo object/chọn implementation, không chỉ “gọi lên một tập hợp”.

**Giải pháp:**  
Mẫu nhớ:

```text
Factory che giấu logic khởi tạo object.
Strategy che giấu thuật toán/hành vi có thể thay thế.
Observer thông báo event cho nhiều listener.
```

---

### Câu 7: Sửa `Product` public field

**Bạn làm được:**  
Bạn chỉ ra đúng vấn đề: object không tự bảo vệ state, field public cho phép set giá âm/name rỗng. Bạn đề xuất private field và method validate.

**Còn thiếu:**  
Bạn vẫn nhắc getter/setter. Nên ưu tiên method có ý nghĩa domain như `rename`, `changePrice`.

**Giải pháp:**  
Mẫu:

```java
public void changePrice(int newPrice) {
    if (newPrice < 0) {
        throw new IllegalArgumentException("Price must be >= 0");
    }
    this.price = newPrice;
}
```

---

### Câu 8: DiscountCalculator

**Bạn làm được:**  
Bạn nhận diện đúng OCP, có thể có SRP, và đề xuất Strategy/Factory đúng.

**Còn thiếu:**  
Không đáng kể. Cần viết tên interface rõ hơn: `DiscountPolicy`.

**Giải pháp:**  
Mẫu:

```java
public interface DiscountPolicy {
    int apply(int price);
}
```

---

### Câu 9: Order side effects

**Bạn làm được:**  
Bạn chọn đúng Observer/EventListener, hiểu có publisher/listener.

**Còn thiếu:**  
Bạn chưa nói rõ mùi thiết kế chính: `OrderService.createOrder` đang ôm quá nhiều trách nhiệm, vi phạm SRP.

**Giải pháp:**  
Mẫu trả lời:

```text
OrderService đang vi phạm SRP vì vừa tạo order vừa gửi email, ghi audit log, trừ tồn kho. Có thể publish OrderCreatedEvent và tách các side effect thành listener riêng.
```

---

### Câu 10: Product Builder

**Bạn làm được:**  
Bạn có ý tưởng dùng Lombok `@Builder`, field private, constructor private, có validate name/price.

**Còn thiếu:**  
Bản hiện tại vẫn có lỗi cú pháp/logic:

```java
private Product(Long id , String name , int price) {
    if(builder == null || builder.name.isBlank()) {
```

Constructor này không có biến `builder`, nên code không compile.

Nếu dùng Lombok, validate trực tiếp bằng tham số:

```java
if (name == null || name.isBlank()) {
```

Ngoài ra:

- `price >= 0`, nên `price = 0` hợp lệ.
- Điều kiện sai hiện tại là `builder.price <= 0`; nếu dùng tham số thì nên là `price < 0`.

**Giải pháp Lombok đúng:**

```java
import lombok.Builder;
import lombok.Getter;

@Getter
public class Product {
    private final Long id;
    private final String name;
    private final int price;

    @Builder
    private Product(Long id, String name, int price) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (price < 0) {
            throw new IllegalArgumentException("Price must be >= 0");
        }
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
```

**Giải pháp Builder tự viết:**

```java
public class Product {
    private final Long id;
    private final String name;
    private final int price;

    private Product(Builder builder) {
        if (builder.name == null || builder.name.isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (builder.price < 0) {
            throw new IllegalArgumentException("Price must be >= 0");
        }
        this.id = builder.id;
        this.name = builder.name;
        this.price = builder.price;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String name;
        private int price;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder price(int price) {
            this.price = price;
            return this;
        }

        public Product build() {
            return new Product(this);
        }
    }
}
```

---

## 3. Việc cần học thêm để chắc M0-2

### 1. Builder/Lombok Builder

Bạn nên tự viết lại 2 bản:

- Bản Lombok `@Builder`.
- Bản manual Builder có `builder()` và `build()`.

### 2. Observer/SRP

Luyện diễn đạt:

```text
OrderService chỉ nên xử lý use case chính. Email, audit log, stock update là side effects nên tách listener/service riêng.
```

### 3. Composition

Luyện thêm ví dụ:

```text
Product has a DiscountPolicy
không phải
DiscountedProduct extends Product
```

---

## 4. Checklist tự kiểm

- [ ] Giải thích được encapsulation không chỉ là getter/setter.
- [ ] Phân biệt được has-a và is-a.
- [ ] Nhận diện SRP/OCP trong code if/else hoặc service ôm nhiều việc.
- [ ] Giải thích được LSP bằng ví dụ Penguin/Bird.
- [ ] Biết interface béo là vi phạm ISP.
- [ ] Biết DIP giúp mock/fake dependency khi test.
- [ ] Nhận diện được Singleton, Factory, Builder, Strategy, Observer.
- [ ] Viết được Product bằng Lombok `@Builder` đúng validate.
- [ ] Viết được Product bằng manual Builder đúng `builder()`/`build()`.

