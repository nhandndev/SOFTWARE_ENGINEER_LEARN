# Đáp án Module 1-1: IoC / DI, Bean & ApplicationContext - lần 1

Topic: `M1-1-ioc-di`  
Chế độ: `DAY_DU`  
Tổng điểm thô: 90 điểm  
Normalize: `(điểm thô / 90) × 100`

---

## Phần I - Lý thuyết `(30đ)`

### Câu 1 `(3đ)`

- IoC = Inversion of Control, đảo quyền điều khiển tạo/quản lý object cho container. `(1đ)`
- Trước Spring: class tự `new` dependency. `(1đ)`
- Sau Spring: Spring container tạo bean, nối dependency, quản lý lifecycle. `(1đ)`

### Câu 2 `(3đ)`

- DI = Dependency Injection, dependency được đưa từ bên ngoài vào object. `(1đ)`
- IoC là nguyên lý lớn. `(1đ)`
- DI là kỹ thuật/cách thực hiện IoC. `(1đ)`

### Câu 3 `(3đ)`

- Constructor injection: dependency bắt buộc, field `final`, dễ test, rõ dependency. `(1.25đ)`
- Setter injection: hợp dependency optional/thay đổi sau tạo object. `(0.75đ)`
- Field injection: khó test, không final, giấu dependency, không khuyến nghị. `(1đ)`

### Câu 4 `(3đ)`

- Bean là object do Spring container quản lý. `(1đ)`
- Bean được tạo/inject/quản lý lifecycle bởi Spring. `(1đ)`
- Object thường tạo bằng `new`, không nằm trong ApplicationContext. `(1đ)`

### Câu 5 `(3đ)`

- `ApplicationContext` là Spring container chứa/quản lý bean. `(1đ)`
- Nó đọc config, component scan, tạo bean, inject dependency, lifecycle/scope. `(1đ)`
- Không nên lạm dụng `getBean()` trong business code; nên dùng DI để rõ dependency và dễ test. `(1đ)`

### Câu 6 `(3đ)`

- `@Component`: stereotype chung. `(0.5đ)`
- `@Service`: business/service layer. `(0.75đ)`
- `@Repository`: data access layer. `(0.75đ)`
- `@Controller`: MVC controller trả view. `(0.5đ)`
- `@RestController`: REST controller trả body/JSON. `(0.5đ)`

### Câu 7 `(3đ)`

- Dùng `@Bean` khi class từ thư viện ngoài/không sửa được source. `(1đ)`
- Khi cần cấu hình object phức tạp trước khi tạo. `(1đ)`
- Khi muốn nhóm bean config rõ trong `@Configuration`. `(1đ)`

### Câu 8 `(3đ)`

- Spring bị ambiguous/no unique bean khi inject theo type. `(1đ)`
- Dùng `@Primary` chọn default. `(1đ)`
- Dùng `@Qualifier` chỉ định bean, hoặc inject `Map/List` strategy. `(1đ)`

### Câu 9 `(3đ)`

- `singleton`: một instance trong ApplicationContext, mặc định. `(0.9đ)`
- `prototype`: tạo instance mới khi request bean từ container. `(0.8đ)`
- `request`: một instance mỗi HTTP request. `(0.65đ)`
- `session`: một instance mỗi HTTP session. `(0.65đ)`

### Câu 10 `(3đ)`

- `@PostConstruct`: chạy sau tạo bean và inject dependency xong. `(1đ)`
- `@PreDestroy`: chạy trước khi bean bị destroy/app shutdown. `(1đ)`
- `InitializingBean.afterPropertiesSet()`: callback init kiểu Spring interface, thường ít ưu tiên hơn `@PostConstruct`. `(1đ)`

---

## Phần II - Tình huống `(40đ)`

### Câu 11 `(5đ)`

- Vấn đề: class tự tạo dependency bằng `new`, vi phạm IoC/DI. `(1.5đ)`
- Bị coupling vào implementation `JdbcProductRepository`. `(1đ)`
- Khó test/thay implementation. `(1đ)`
- Sửa bằng constructor injection vào interface `ProductRepository`. `(1đ)`
- Repository implementation là Spring bean. `(0.5đ)`

### Câu 12 `(5đ)`

- Field injection khiến dependency bị giấu, khó truyền mock khi unit test không load Spring. `(1.5đ)`
- Không dùng được `final`, object có thể không rõ dependency. `(1đ)`
- Sửa sang constructor injection. `(1.5đ)`
- Test có thể new service với mock repository. `(1đ)`

### Câu 13 `(5đ)`

- Tạo class `@Configuration`. `(1đ)`
- Tạo method `@Bean` trả `Clock`/`ObjectMapper`. `(2đ)`
- Spring quản lý object trả về như bean. `(1đ)`
- Inject bean qua constructor vào nơi cần. `(1đ)`

### Câu 14 `(5đ)`

- Có 2 bean cùng type nên cần disambiguation. `(1đ)`
- Dùng `@Primary` trên Momo để làm default. `(1.5đ)`
- Dùng `@Qualifier("vnpayPaymentGateway")` ở service muốn VNPAY. `(1.5đ)`
- Có thể nêu bean name mặc định hoặc custom name. `(1đ)`

### Câu 15 `(5đ)`

- Sai: prototype inject trực tiếp vào singleton thường chỉ được tạo một lần lúc singleton tạo. `(2đ)`
- Vì singleton giữ reference đó. `(1đ)`
- Nếu cần mới mỗi lần, dùng `ObjectProvider<PrototypeBean>` hoặc lookup/proxy phù hợp. `(1.5đ)`
- Gọi `getObject()` mỗi lần cần instance mới. `(0.5đ)`

### Câu 16 `(5đ)`

- Đây là circular dependency. `(1đ)`
- Là mùi thiết kế, service phụ thuộc vòng tròn/boundary kém. `(1đ)`
- Không nên ưu tiên vá bằng `@Lazy` trừ workaround. `(1đ)`
- Sửa bằng tách orchestration service như `CheckoutService`. `(1.5đ)`
- `OrderService` lo order, `PaymentService` lo payment. `(0.5đ)`

### Câu 17 `(5đ)`

- Dùng `@PostConstruct` để log sau inject. `(1.5đ)`
- Dùng `@PreDestroy` để log khi shutdown/destroy. `(1.5đ)`
- Có thể dùng `InitializingBean` nhưng không bắt buộc. `(0.5đ)`
- Không nên đặt business logic nặng/remote risky vào lifecycle callback. `(1.5đ)`

### Câu 18 `(5đ)`

- `SkuGenerator`: `@Component` vì class mình viết/helper. `(1đ)`
- `ProductService`: `@Service` vì nghiệp vụ. `(1đ)`
- `Clock`: `@Bean` trong `@Configuration` vì class thư viện ngoài/cần config. `(1.5đ)`
- Inject qua constructor. `(1đ)`
- Giải thích vai trò rõ. `(0.5đ)`

---

## Phần III - Code mini `(20đ)`

### Câu 19 `(10đ)`

Tiêu chí:

- Có `ProductRepository` interface. `(1.5đ)`
- Có implementation `InMemoryProductRepository`. `(2đ)`
- Implementation là bean bằng `@Repository`/`@Component`. `(1đ)`
- Có `SkuGenerator` bean bằng `@Component`. `(1.5đ)`
- Có `ProductService` bằng `@Service`. `(1đ)`
- Constructor injection, không field injection. `(2đ)`
- Code rõ, trách nhiệm hợp lý. `(1đ)`

Mẫu:

```java
interface ProductRepository {
    void save(String name, String sku);
}

@Repository
class InMemoryProductRepository implements ProductRepository {
    public void save(String name, String sku) {
        System.out.println("saved " + name + " " + sku);
    }
}

@Component
class SkuGenerator {
    String generate(String name) {
        return name.toUpperCase().replace(" ", "-");
    }
}

@Service
class ProductService {
    private final ProductRepository repository;
    private final SkuGenerator skuGenerator;

    ProductService(ProductRepository repository, SkuGenerator skuGenerator) {
        this.repository = repository;
        this.skuGenerator = skuGenerator;
    }

    void create(String name) {
        repository.save(name, skuGenerator.generate(name));
    }
}
```

### Câu 20 `(10đ)`

Tiêu chí:

- Có `@Configuration`. `(1đ)`
- Có `@Bean` tạo `Clock`. `(1.5đ)`
- Có `StartupLogger` là bean. `(1đ)`
- Có `@PostConstruct`. `(1.5đ)`
- Có `@PreDestroy`. `(1.5đ)`
- Có ví dụ `@Primary` hoặc `@Qualifier` đúng. `(2đ)`
- Code rõ. `(1.5đ)`

Mẫu:

```java
@Configuration
class TimeConfig {
    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}

@Component
class StartupLogger {
    @PostConstruct
    void init() {
        System.out.println("bean initialized");
    }

    @PreDestroy
    void destroy() {
        System.out.println("bean destroyed");
    }
}

interface PaymentGateway {
    void pay();
}

@Primary
@Component
class MomoPaymentGateway implements PaymentGateway {
    public void pay() {}
}

@Component
class VnpayPaymentGateway implements PaymentGateway {
    public void pay() {}
}

@Service
class CheckoutService {
    CheckoutService(@Qualifier("vnpayPaymentGateway") PaymentGateway gateway) {
    }
}
```
