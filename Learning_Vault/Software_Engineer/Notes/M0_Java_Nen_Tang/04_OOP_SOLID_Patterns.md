# Bài học: OOP nâng cao, SOLID và nhận diện Design Pattern

Module: `M0-2 · OOP nâng cao, SOLID & nhận diện Design Pattern`

Mục tiêu của bài này:

- Hiểu encapsulation và composition over inheritance.
- Nhận diện và sửa vi phạm SOLID: SRP, OCP, LSP, ISP, DIP.
- Nhận diện 5 pattern cơ bản: Singleton, Factory, Builder, Strategy, Observer.
- Biết khi nào không nên dùng pattern để tránh over-engineering.
- Chuẩn bị deliverable cho `shopcore`: domain model draft `Product`, `Category`, `Order` và 1 Builder cho `Product`.

---

## 1. OOP là gì ở mức thực dụng?

OOP không chỉ là `class`, `object`, `extends`.

Ở mức làm backend, OOP giúp bạn:

- Gom dữ liệu và hành vi liên quan vào cùng một object.
- Che giấu trạng thái bên trong object.
- Bảo vệ invariant của domain.
- Tách trách nhiệm để code dễ đổi, dễ test, dễ đọc.

Ví dụ domain `shopcore`:

```java
public class Product {
    private Long id;
    private String name;
    private int price;
    private boolean active;
}
```

Nếu chỉ có field, class này mới là "data bag". OOP tốt hơn là đặt hành vi liên quan vào đúng nơi:

```java
public class Product {
    private Long id;
    private String name;
    private int price;
    private boolean active;

    public void activate() {
        this.active = true;
    }

    public void deactivate() {
        this.active = false;
    }

    public void changePrice(int newPrice) {
        if (newPrice < 0) {
            throw new IllegalArgumentException("Price must be >= 0");
        }
        this.price = newPrice;
    }
}
```

Ý chính:

> OOP tốt là để object tự bảo vệ trạng thái hợp lệ của nó, không để code bên ngoài sửa bừa.

---

## 2. Encapsulation: đóng gói

Encapsulation nghĩa là:

> Che giấu dữ liệu bên trong object và chỉ cho thay đổi qua method có kiểm soát.

Không tốt:

```java
public class Product {
    public String name;
    public int price;
}
```

Code bên ngoài có thể làm:

```java
product.price = -100;
product.name = "";
```

Object bị rơi vào trạng thái sai.

Tốt hơn:

```java
public class Product {
    private String name;
    private int price;

    public Product(String name, int price) {
        rename(name);
        changePrice(price);
    }

    public void rename(String newName) {
        if (newName == null || newName.isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        this.name = newName;
    }

    public void changePrice(int newPrice) {
        if (newPrice < 0) {
            throw new IllegalArgumentException("Price must be >= 0");
        }
        this.price = newPrice;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }
}
```

Điểm cần nhớ:

- Field nên `private`.
- Không tạo setter bừa cho mọi field.
- Method nên diễn đạt hành vi domain: `rename`, `changePrice`, `activate`, `cancel`.
- Object nên tự validate invariant của nó.

Invariant là điều kiện luôn phải đúng.

Ví dụ invariant của `Product`:

- name không rỗng.
- price không âm.
- category không null nếu product đã active.

---

## 3. Getter/setter không tự động là OOP tốt

Code này nhìn có vẻ đóng gói nhưng vẫn yếu:

```java
public class Product {
    private String name;
    private int price;

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
```

Vì setter vẫn cho sửa bừa:

```java
product.setPrice(-100);
```

Tốt hơn:

```java
product.changePrice(500);
product.rename("Keyboard");
```

Tên method nói rõ ý định nghiệp vụ.

Câu cần nhớ:

> Encapsulation không chỉ là private field + getter/setter. Encapsulation là kiểm soát cách trạng thái được thay đổi.

---

## 4. Composition over inheritance

Composition over inheritance nghĩa là:

> Ưu tiên "có một" thay vì "là một" khi tái sử dụng hành vi.

Inheritance:

```text
Product is a DiscountableProduct
```

Composition:

```text
Product has a DiscountPolicy
```

Inheritance dễ bị lạm dụng:

```java
public class Product {
    protected int price;
}

public class DiscountedProduct extends Product {
    public int discountedPrice() {
        return price - 100;
    }
}
```

Vấn đề:

- Class con phụ thuộc vào chi tiết class cha.
- Khi có nhiều loại discount, số class con phình ra.
- Dễ sai nếu quan hệ "is-a" không thật sự đúng.

Composition tốt hơn:

```java
public interface DiscountPolicy {
    int apply(int price);
}

public class FixedDiscountPolicy implements DiscountPolicy {
    private final int amount;

    public FixedDiscountPolicy(int amount) {
        this.amount = amount;
    }

    @Override
    public int apply(int price) {
        return Math.max(0, price - amount);
    }
}

public class Product {
    private final int price;
    private final DiscountPolicy discountPolicy;

    public Product(int price, DiscountPolicy discountPolicy) {
        this.price = price;
        this.discountPolicy = discountPolicy;
    }

    public int discountedPrice() {
        return discountPolicy.apply(price);
    }
}
```

Giờ muốn thêm percent discount:

```java
public class PercentDiscountPolicy implements DiscountPolicy {
    private final int percent;

    public PercentDiscountPolicy(int percent) {
        this.percent = percent;
    }

    @Override
    public int apply(int price) {
        return price - price * percent / 100;
    }
}
```

Không cần sửa `Product`.

Câu cần nhớ:

> Inheritance phù hợp khi quan hệ "is-a" thật sự rõ. Composition phù hợp khi object chỉ cần dùng một hành vi có thể thay đổi.

---

# Phần 2: SOLID

SOLID là 5 nguyên tắc giúp thiết kế code dễ đổi và dễ test hơn.

| Chữ | Tên | Câu nhớ nhanh |
|---|---|---|
| S | Single Responsibility Principle | Một class nên có một lý do chính để thay đổi |
| O | Open/Closed Principle | Mở để mở rộng, đóng với sửa đổi |
| L | Liskov Substitution Principle | Class con thay được class cha mà không phá hành vi |
| I | Interface Segregation Principle | Interface nhỏ, đúng nhu cầu client |
| D | Dependency Inversion Principle | Phụ thuộc abstraction, không phụ thuộc implementation cụ thể |

---

## 5. SRP: Single Responsibility Principle

SRP nghĩa là:

> Một class nên có một lý do chính để thay đổi.

Không tốt:

```java
public class OrderService {
    public void createOrder(Order order) {
        validate(order);
        saveToDatabase(order);
        sendEmail(order);
        writeLog(order);
    }

    private void validate(Order order) {}
    private void saveToDatabase(Order order) {}
    private void sendEmail(Order order) {}
    private void writeLog(Order order) {}
}
```

Class này thay đổi khi:

- Rule validate đổi.
- Database đổi.
- Email template đổi.
- Logging đổi.

Tách tốt hơn:

```java
public class OrderService {
    private final OrderValidator validator;
    private final OrderRepository repository;
    private final EmailSender emailSender;

    public OrderService(
            OrderValidator validator,
            OrderRepository repository,
            EmailSender emailSender
    ) {
        this.validator = validator;
        this.repository = repository;
        this.emailSender = emailSender;
    }

    public void createOrder(Order order) {
        validator.validate(order);
        repository.save(order);
        emailSender.sendOrderCreated(order);
    }
}
```

Câu cần nhớ:

> SRP không có nghĩa là class chỉ có một method. Nó nghĩa là class có một nhóm trách nhiệm gắn với một lý do thay đổi.

---

## 6. OCP: Open/Closed Principle

OCP nghĩa là:

> Mở để mở rộng, đóng với sửa đổi.

Không tốt:

```java
public class DiscountCalculator {
    public int calculate(String type, int price) {
        if ("FIXED".equals(type)) {
            return price - 100;
        }
        if ("PERCENT".equals(type)) {
            return price - price * 10 / 100;
        }
        return price;
    }
}
```

Mỗi khi thêm loại discount mới, phải sửa class này.

Tốt hơn dùng interface:

```java
public interface DiscountPolicy {
    boolean supports(String type);
    int apply(int price);
}
```

```java
public class FixedDiscountPolicy implements DiscountPolicy {
    @Override
    public boolean supports(String type) {
        return "FIXED".equals(type);
    }

    @Override
    public int apply(int price) {
        return price - 100;
    }
}
```

```java
public class PercentDiscountPolicy implements DiscountPolicy {
    @Override
    public boolean supports(String type) {
        return "PERCENT".equals(type);
    }

    @Override
    public int apply(int price) {
        return price - price * 10 / 100;
    }
}
```

Calculator:

```java
public class DiscountCalculator {
    private final List<DiscountPolicy> policies;

    public DiscountCalculator(List<DiscountPolicy> policies) {
        this.policies = policies;
    }

    public int calculate(String type, int price) {
        return policies.stream()
                .filter(policy -> policy.supports(type))
                .findFirst()
                .map(policy -> policy.apply(price))
                .orElse(price);
    }
}
```

Thêm discount mới bằng cách thêm class mới, ít sửa code cũ hơn.

Câu cần nhớ:

> OCP thường đạt được bằng polymorphism, interface, Strategy, Factory hoặc configuration, nhưng đừng lạm dụng khi logic còn đơn giản.

---

## 7. LSP: Liskov Substitution Principle

LSP nghĩa là:

> Class con phải thay thế được class cha mà không làm hỏng kỳ vọng của code dùng class cha.

Ví dụ kinh điển dễ sai:

```java
public class Bird {
    public void fly() {}
}

public class Penguin extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Penguin cannot fly");
    }
}
```

Nếu code nhận `Bird`:

```java
public void makeBirdFly(Bird bird) {
    bird.fly();
}
```

Truyền `Penguin` vào sẽ hỏng. Penguin không nên kế thừa behavior fly.

Thiết kế tốt hơn:

```java
public interface Bird {
}

public interface Flyable {
    void fly();
}

public class Sparrow implements Bird, Flyable {
    @Override
    public void fly() {
    }
}

public class Penguin implements Bird {
}
```

Ví dụ `shopcore`:

Không nên:

```java
public class PaymentMethod {
    public void pay(int amount) {}
}

public class CashOnDelivery extends PaymentMethod {
    @Override
    public void pay(int amount) {
        throw new UnsupportedOperationException("Pay later");
    }
}
```

Vì COD không trả tiền ngay theo kiểu online payment.

Tốt hơn:

```java
public interface OnlinePaymentMethod {
    void payNow(int amount);
}

public class VnPayPayment implements OnlinePaymentMethod {
    @Override
    public void payNow(int amount) {
    }
}

public class CashOnDelivery {
    public void markPayOnDelivery() {
    }
}
```

Câu cần nhớ:

> Nếu class con phải throw `UnsupportedOperationException` cho method kế thừa, rất có thể đang vi phạm LSP.

---

## 8. ISP: Interface Segregation Principle

ISP nghĩa là:

> Đừng bắt client phụ thuộc vào method nó không dùng.

Không tốt:

```java
public interface ProductRepository {
    Product save(Product product);
    Product findById(Long id);
    void delete(Long id);
    void exportToExcel();
    void syncToExternalSystem();
}
```

Class chỉ cần đọc product vẫn phải phụ thuộc cả export/sync.

Tốt hơn:

```java
public interface ProductReader {
    Product findById(Long id);
}

public interface ProductWriter {
    Product save(Product product);
    void delete(Long id);
}

public interface ProductExporter {
    void exportToExcel();
}
```

Câu cần nhớ:

> Interface nên nhỏ và phục vụ đúng nhu cầu của client. Interface quá béo làm code khó implement, khó test và dễ phụ thuộc thừa.

---

## 9. DIP: Dependency Inversion Principle

DIP nghĩa là:

> Module cấp cao không phụ thuộc trực tiếp vào implementation cấp thấp. Cả hai nên phụ thuộc vào abstraction.

Không tốt:

```java
public class OrderService {
    private final MySqlOrderRepository repository = new MySqlOrderRepository();
}
```

`OrderService` bị dính chặt vào MySQL.

Tốt hơn:

```java
public interface OrderRepository {
    Order save(Order order);
}
```

```java
public class MySqlOrderRepository implements OrderRepository {
    @Override
    public Order save(Order order) {
        return order;
    }
}
```

```java
public class OrderService {
    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public void create(Order order) {
        repository.save(order);
    }
}
```

Trong Spring Boot sau này, constructor injection chính là cách áp dụng DIP rất thường gặp.

Câu cần nhớ:

> DIP giúp service dễ test hơn vì ta có thể inject fake/mock repository thay vì phụ thuộc implementation thật.

---

# Phần 3: Nhận diện Design Pattern

Ở M0-2, mục tiêu là **nhận diện và biết dùng khi hợp lý**, chưa cần áp sâu toàn bộ GoF.

---

## 10. Singleton

Singleton đảm bảo một class chỉ có một instance.

Ví dụ cổ điển:

```java
public class AppConfig {
    private static final AppConfig INSTANCE = new AppConfig();

    private AppConfig() {
    }

    public static AppConfig getInstance() {
        return INSTANCE;
    }
}
```

Trong Spring Boot, bean mặc định thường là singleton trong Spring container. Vì vậy bạn ít cần tự viết Singleton thủ công.

Khi nhận diện Singleton:

- Constructor private.
- Có static instance.
- Có static method lấy instance.

Khi nên dùng:

- Object cấu hình dùng chung.
- Object stateless dùng chung.

Khi không nên dùng:

- Object có state thay đổi theo user/request.
- Bạn dùng Spring rồi nhưng vẫn tự viết singleton không cần thiết.

---

## 11. Factory

Factory tạo object dựa trên input, che giấu logic khởi tạo.

Không tốt:

```java
if ("FIXED".equals(type)) {
    policy = new FixedDiscountPolicy();
} else if ("PERCENT".equals(type)) {
    policy = new PercentDiscountPolicy();
}
```

Tốt hơn:

```java
public class DiscountPolicyFactory {
    public DiscountPolicy create(String type) {
        if ("FIXED".equals(type)) {
            return new FixedDiscountPolicy();
        }
        if ("PERCENT".equals(type)) {
            return new PercentDiscountPolicy();
        }
        throw new IllegalArgumentException("Unsupported discount type");
    }
}
```

Nhận diện Factory:

- Có method kiểu `create`, `of`, `from`.
- Trả về interface/base type.
- Bên trong quyết định class cụ thể nào được tạo.

Trong `shopcore`, Factory có thể dùng cho:

- Tạo discount policy theo type.
- Tạo payment handler theo payment method.
- Tạo shipping fee calculator theo shipping provider.

---

## 12. Builder

Builder giúp tạo object có nhiều field mà không làm constructor quá dài.

Constructor dài khó đọc:

```java
Product product = new Product(
        1L,
        "Keyboard",
        "Mechanical keyboard",
        500,
        true,
        category
);
```

Builder dễ đọc hơn:

```java
Product product = Product.builder()
        .id(1L)
        .name("Keyboard")
        .description("Mechanical keyboard")
        .price(500)
        .active(true)
        .category(category)
        .build();
```

Builder tự viết đơn giản:

```java
public class Product {
    private final Long id;
    private final String name;
    private final int price;

    private Product(Builder builder) {
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
            if (name == null || name.isBlank()) {
                throw new IllegalArgumentException("Name is required");
            }
            if (price < 0) {
                throw new IllegalArgumentException("Price must be >= 0");
            }
            return new Product(this);
        }
    }
}
```

Khi nên dùng Builder:

- Object có nhiều field.
- Một số field optional.
- Constructor quá dài và dễ truyền nhầm thứ tự.

Khi không nên dùng:

- Object chỉ có 2-3 field đơn giản.
- Builder làm code dài hơn nhiều mà không tăng rõ readability.

---

## 13. Strategy

Strategy đóng gói nhiều thuật toán/hành vi có thể thay thế cho nhau.

Ví dụ discount:

```java
public interface DiscountPolicy {
    int apply(int price);
}
```

```java
public class NoDiscountPolicy implements DiscountPolicy {
    @Override
    public int apply(int price) {
        return price;
    }
}
```

```java
public class PercentDiscountPolicy implements DiscountPolicy {
    private final int percent;

    public PercentDiscountPolicy(int percent) {
        this.percent = percent;
    }

    @Override
    public int apply(int price) {
        return price - price * percent / 100;
    }
}
```

Sử dụng:

```java
public class PriceCalculator {
    private final DiscountPolicy discountPolicy;

    public PriceCalculator(DiscountPolicy discountPolicy) {
        this.discountPolicy = discountPolicy;
    }

    public int calculate(int price) {
        return discountPolicy.apply(price);
    }
}
```

Nhận diện Strategy:

- Có interface chung.
- Nhiều implementation khác nhau.
- Client nhận interface và không cần biết implementation cụ thể.

Khi nên dùng:

- Có nhiều thuật toán thay thế nhau.
- Logic `if/else` theo type ngày càng dài.

---

## 14. Observer

Observer dùng khi một sự kiện xảy ra và nhiều bên cần được thông báo.

Ví dụ:

Khi order được tạo:

- Gửi email.
- Ghi audit log.
- Trừ tồn kho.
- Gửi notification.

Không tốt nếu nhét hết vào `OrderService`:

```java
public class OrderService {
    public void createOrder(Order order) {
        save(order);
        sendEmail(order);
        writeAuditLog(order);
        decreaseStock(order);
    }
}
```

Observer/event style:

```java
public interface OrderCreatedListener {
    void onOrderCreated(Order order);
}
```

```java
public class EmailOrderCreatedListener implements OrderCreatedListener {
    @Override
    public void onOrderCreated(Order order) {
        // send email
    }
}
```

```java
public class AuditLogOrderCreatedListener implements OrderCreatedListener {
    @Override
    public void onOrderCreated(Order order) {
        // write audit log
    }
}
```

```java
public class OrderEventPublisher {
    private final List<OrderCreatedListener> listeners;

    public OrderEventPublisher(List<OrderCreatedListener> listeners) {
        this.listeners = listeners;
    }

    public void publishOrderCreated(Order order) {
        listeners.forEach(listener -> listener.onOrderCreated(order));
    }
}
```

Nhận diện Observer:

- Có subject/publisher.
- Có observer/listener.
- Khi event xảy ra, publisher thông báo cho nhiều listener.

Trong Spring sau này, bạn sẽ gặp:

- `ApplicationEventPublisher`
- `@EventListener`

---

# Phần 4: Khi nào không dùng pattern?

## 15. Over-engineering là gì?

Over-engineering là thiết kế phức tạp hơn nhu cầu thật.

Ví dụ một app nhỏ chỉ có một loại discount:

```java
price - 100
```

Nhưng bạn tạo:

- `DiscountPolicy`
- `DiscountFactory`
- `DiscountContext`
- `DiscountResolver`
- `DiscountRegistry`
- `DiscountStrategyProvider`

Trong khi chỉ cần:

```java
public int discount(int price) {
    return price - 100;
}
```

Không phải cứ dùng pattern là code tốt. Pattern tốt khi nó giải quyết vấn đề thật.

---

## 16. Dấu hiệu nên dùng pattern

Nên cân nhắc pattern khi:

- Logic `if/else` hoặc `switch` theo type ngày càng dài.
- Object có quá nhiều constructor hoặc quá nhiều field optional.
- Nhiều nơi tạo object giống nhau và logic tạo phức tạp.
- Một sự kiện kéo theo nhiều hành động phụ.
- Bạn cần thay implementation mà không sửa code client.

---

## 17. Dấu hiệu chưa nên dùng pattern

Chưa nên dùng pattern khi:

- Chỉ có 1 implementation.
- Chỉ có 1 use-case đơn giản.
- Pattern làm số class tăng mạnh nhưng không giảm độ khó.
- Team chưa cần mở rộng theo hướng đó.
- Bạn không giải thích được pattern đang giải quyết vấn đề gì.

Câu cần nhớ:

> Pattern không phải mục tiêu. Pattern là công cụ để giảm độ phức tạp khi độ phức tạp thật sự xuất hiện.

---

# Phần 5: Domain model draft cho shopcore

M0-2 yêu cầu deliverable:

> Domain model draft `Product`, `Category`, `Order` tuân SOLID + 1 Builder cho `Product`.

## 18. Gợi ý `Category`

```java
public class Category {
    private final Long id;
    private String name;

    public Category(Long id, String name) {
        this.id = id;
        rename(name);
    }

    public void rename(String newName) {
        if (newName == null || newName.isBlank()) {
            throw new IllegalArgumentException("Category name is required");
        }
        this.name = newName;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
```

## 19. Gợi ý `Product` với Builder

```java
public class Product {
    private final Long id;
    private String name;
    private String description;
    private int price;
    private boolean active;
    private Category category;

    private Product(Builder builder) {
        this.id = builder.id;
        rename(builder.name);
        changeDescription(builder.description);
        changePrice(builder.price);
        changeCategory(builder.category);
        this.active = builder.active;
    }

    public static Builder builder() {
        return new Builder();
    }

    public void rename(String newName) {
        if (newName == null || newName.isBlank()) {
            throw new IllegalArgumentException("Product name is required");
        }
        this.name = newName;
    }

    public void changeDescription(String newDescription) {
        this.description = newDescription == null ? "" : newDescription;
    }

    public void changePrice(int newPrice) {
        if (newPrice < 0) {
            throw new IllegalArgumentException("Price must be >= 0");
        }
        this.price = newPrice;
    }

    public void changeCategory(Category newCategory) {
        if (newCategory == null) {
            throw new IllegalArgumentException("Category is required");
        }
        this.category = newCategory;
    }

    public void activate() {
        this.active = true;
    }

    public void deactivate() {
        this.active = false;
    }

    public static class Builder {
        private Long id;
        private String name;
        private String description;
        private int price;
        private boolean active;
        private Category category;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder price(int price) {
            this.price = price;
            return this;
        }

        public Builder active(boolean active) {
            this.active = active;
            return this;
        }

        public Builder category(Category category) {
            this.category = category;
            return this;
        }

        public Product build() {
            return new Product(this);
        }
    }
}
```

## 20. Gợi ý `Order`

```java
public class Order {
    private final Long id;
    private final List<OrderItem> items = new ArrayList<>();
    private OrderStatus status = OrderStatus.DRAFT;

    public Order(Long id) {
        this.id = id;
    }

    public void addItem(Product product, int quantity) {
        if (status != OrderStatus.DRAFT) {
            throw new IllegalStateException("Cannot add item after checkout");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        items.add(new OrderItem(product, quantity));
    }

    public void checkout() {
        if (items.isEmpty()) {
            throw new IllegalStateException("Cannot checkout empty order");
        }
        this.status = OrderStatus.CHECKED_OUT;
    }

    public List<OrderItem> getItems() {
        return List.copyOf(items);
    }
}
```

```java
public enum OrderStatus {
    DRAFT,
    CHECKED_OUT,
    CANCELLED
}
```

```java
public class OrderItem {
    private final Product product;
    private final int quantity;

    public OrderItem(Product product, int quantity) {
        if (product == null) {
            throw new IllegalArgumentException("Product is required");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        this.product = product;
        this.quantity = quantity;
    }
}
```

Điểm OOP trong ví dụ:

- `Order` tự bảo vệ rule: không checkout order rỗng.
- `Order` không expose list mutable trực tiếp.
- `Product` tự validate name/price/category.
- `Product` dùng Builder để tránh constructor dài.

---

## 21. Checklist tự kiểm M0-2

Bạn nắm M0-2 nếu trả lời được:

- Encapsulation khác gì với chỉ có getter/setter?
- Vì sao nên ưu tiên composition over inheritance?
- SRP là gì? Cho ví dụ một class vi phạm.
- OCP là gì? Vì sao Strategy giúp giảm sửa code cũ?
- LSP là gì? Vì sao class con throw `UnsupportedOperationException` thường là mùi sai?
- ISP là gì? Interface béo gây vấn đề gì?
- DIP là gì? Vì sao constructor injection giúp test dễ hơn?
- Nhận diện Singleton qua dấu hiệu nào?
- Khi nào nên dùng Factory?
- Khi nào nên dùng Builder?
- Strategy khác Factory thế nào?
- Observer phù hợp khi nào?
- Khi nào không nên dùng pattern?

---

## 22. Mẫu trả lời nhanh khi kiểm tra

### Encapsulation

> Encapsulation là che giấu state bên trong object và chỉ cho thay đổi qua method có kiểm soát, để object tự bảo vệ invariant của nó.

### Composition over inheritance

> Ưu tiên composition khi object chỉ cần dùng một hành vi có thể thay đổi. Inheritance chỉ nên dùng khi quan hệ "is-a" thật sự rõ.

### SRP

> Một class nên có một lý do chính để thay đổi, không ôm nhiều trách nhiệm như validate, save database, send email cùng lúc.

### OCP

> Code nên mở để mở rộng bằng class/implementation mới, nhưng hạn chế sửa code cũ đang chạy ổn.

### LSP

> Class con phải thay thế được class cha mà không phá kỳ vọng của client.

### ISP

> Interface nên nhỏ và đúng nhu cầu client, không bắt class implement method không dùng.

### DIP

> Module cấp cao nên phụ thuộc abstraction, không phụ thuộc implementation cụ thể.

### Pattern

> Pattern là công cụ để giảm độ phức tạp thật, không phải thứ cần nhét vào mọi nơi.

