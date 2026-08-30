# Bài học: IoC / DI, Bean & ApplicationContext

Module: `M1-1 · IoC / DI, Bean & ApplicationContext`

Mục tiêu của bài này:

- Hiểu IoC và DI là gì, không học thuộc lòng annotation.
- Biết vì sao Spring container tạo và nối object thay cho mình.
- Phân biệt `@Component`, `@Service`, `@Repository`, `@Controller`, `@Configuration`, `@Bean`.
- Hiểu `ApplicationContext` là gì.
- Biết bean scope: singleton, prototype, request, session.
- Biết bean lifecycle: tạo bean, inject dependency, init, destroy.
- Nhận diện circular dependency và cách tránh.
- Chuẩn bị deliverable: cấu hình bean cho `shopcore`, log chứng minh lifecycle.

---

# Phần 1: Vấn đề trước khi có Spring

Giả sử bạn viết service tạo đơn hàng:

```java
class OrderService {
    private final ProductRepository productRepository = new ProductRepository();
    private final EmailService emailService = new EmailService();

    void createOrder(Long productId) {
        Product product = productRepository.findById(productId);
        emailService.send("Order created");
    }
}
```

Code này chạy được, nhưng có vấn đề:

- `OrderService` tự tạo dependency bằng `new`.
- Muốn đổi `EmailService` thật sang `FakeEmailService` để test rất khó.
- `OrderService` bị dính chặt vào implementation cụ thể.
- Dependency càng nhiều thì class càng khó kiểm soát.

Vấn đề chính:

```text
Class tự quản lý dependency của nó.
```

Spring giải quyết bằng IoC và DI.

---

# Phần 2: IoC là gì?

IoC = Inversion of Control.

Dịch dễ hiểu:

```text
Đảo ngược quyền điều khiển.
```

Trước Spring:

```text
Code của mình tự tạo object, tự nối dependency.
```

Với Spring:

```text
Spring container tạo object, quản lý object, inject dependency vào nơi cần dùng.
```

Ví dụ:

```java
@Service
class OrderService {
    private final ProductRepository productRepository;
    private final EmailService emailService;

    OrderService(ProductRepository productRepository, EmailService emailService) {
        this.productRepository = productRepository;
        this.emailService = emailService;
    }
}
```

Ở đây `OrderService` không tự `new ProductRepository()`. Nó chỉ nói:

```text
Tôi cần ProductRepository và EmailService.
```

Spring sẽ tìm bean phù hợp và inject vào constructor.

---

## 1. Cách nhớ IoC

Không dùng Spring:

```text
Tôi tự tạo dependency.
```

Dùng Spring:

```text
Tôi khai báo tôi cần gì, Spring đưa cho tôi.
```

Đây là inversion:

```text
quyền tạo/nối object chuyển từ code của mình sang container.
```

---

# Phần 3: DI là gì?

DI = Dependency Injection.

Dependency là thứ một class cần để làm việc.

Ví dụ:

```java
class ProductService {
    private final ProductRepository productRepository;
}
```

`ProductRepository` là dependency của `ProductService`.

DI nghĩa là:

```text
Dependency được đưa từ bên ngoài vào, thay vì class tự tạo bằng new.
```

---

## 2. IoC vs DI

| Khái niệm | Ý nghĩa |
|---|---|
| IoC | Nguyên lý: đảo quyền tạo/quản lý object cho container |
| DI | Kỹ thuật: inject dependency vào object |

Cách nhớ:

```text
IoC là ý tưởng lớn.
DI là cách Spring thực hiện ý tưởng đó.
```

---

# Phần 4: 3 kiểu Dependency Injection

## 3. Constructor Injection

Đây là cách nên dùng mặc định.

```java
@Service
class ProductService {
    private final ProductRepository productRepository;

    ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
}
```

Ưu điểm:

- Dependency bắt buộc được truyền vào khi tạo object.
- Field có thể `final`.
- Dễ test unit.
- Tránh object ở trạng thái thiếu dependency.
- Rõ class cần những gì.

Khi class chỉ có một constructor, Spring tự inject, không cần ghi `@Autowired`.

---

## 4. Setter Injection

```java
@Service
class ReportService {
    private EmailService emailService;

    @Autowired
    void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }
}
```

Dùng khi dependency là optional hoặc có thể thay đổi sau khi object được tạo.

Nhược điểm:

- Object có thể bị tạo ra trong trạng thái chưa đủ dependency.
- Khó đảm bảo bất biến.

---

## 5. Field Injection

```java
@Service
class ProductService {
    @Autowired
    private ProductRepository productRepository;
}
```

Không khuyến nghị cho code chính.

Vì:

- Khó test unit nếu không dùng Spring/reflection.
- Không thể dùng `final`.
- Dependency bị giấu trong field, constructor không thể hiện class cần gì.
- Dễ tạo circular dependency mà không nhận ra sớm.

Cách nhớ:

```text
Constructor injection là mặc định.
Setter injection cho optional dependency.
Field injection tránh dùng trong production code.
```

---

# Phần 5: Bean là gì?

Bean là object do Spring container quản lý.

Không phải object Java nào cũng là bean.

Ví dụ object thường:

```java
Product product = new Product("Book");
```

Đây chỉ là object bình thường.

Ví dụ bean:

```java
@Service
class ProductService {
}
```

Spring thấy class này, tạo object, quản lý vòng đời và inject vào nơi cần.

---

## 6. Bean khác object thường ở đâu?

| Object thường | Spring bean |
|---|---|
| Tạo bằng `new` | Tạo bởi Spring container |
| Mình tự quản lý lifecycle | Spring quản lý lifecycle |
| Không tự inject | Có thể được inject |
| Không nằm trong ApplicationContext | Nằm trong ApplicationContext |

---

# Phần 6: ApplicationContext

`ApplicationContext` là Spring container.

Nó chứa và quản lý bean.

Nó làm các việc chính:

- đọc configuration
- scan component
- tạo bean
- inject dependency
- quản lý scope
- gọi lifecycle callback
- cung cấp bean khi cần

Ví dụ lấy bean thủ công:

```java
ApplicationContext context = SpringApplication.run(ShopcoreApplication.class, args);
ProductService productService = context.getBean(ProductService.class);
```

Trong code app thật, mình hiếm khi `getBean()` thủ công. Thường dùng constructor injection.

`getBean()` chủ yếu dùng để hiểu container hoặc demo.

---

## 7. Spring Boot tạo ApplicationContext thế nào?

Trong app Spring Boot:

```java
@SpringBootApplication
public class ShopcoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopcoreApplication.class, args);
    }
}
```

`SpringApplication.run(...)` sẽ:

1. Tạo `ApplicationContext`.
2. Đọc config.
3. Component scan từ package gốc.
4. Tạo bean.
5. Inject dependency.
6. Start app.

---

# Phần 7: Component Scan

Spring cần biết class nào nên trở thành bean.

Cách phổ biến nhất là dùng stereotype annotation:

```java
@Component
@Service
@Repository
@Controller
@RestController
```

Các annotation này giúp Spring phát hiện class khi component scan.

---

## 8. `@Component`

Annotation chung nhất.

```java
@Component
class SlugGenerator {
}
```

Dùng cho helper/component không thuộc rõ service/repository/controller.

---

## 9. `@Service`

Dùng cho business/service layer.

```java
@Service
class ProductService {
}
```

Ý nghĩa thiết kế:

```text
Class này chứa nghiệp vụ.
```

---

## 10. `@Repository`

Dùng cho data access layer.

```java
@Repository
class JdbcProductRepository {
}
```

Với Spring Data JPA, interface extends `JpaRepository` thường tự được Spring tạo bean, không cần ghi `@Repository`.

Ý nghĩa thiết kế:

```text
Class/interface này lo truy cập dữ liệu.
```

---

## 11. `@Controller` và `@RestController`

`@Controller` dùng cho MVC trả view.

`@RestController` dùng cho REST API, trả JSON/body.

```java
@RestController
class ProductController {
}
```

`@RestController` gần như bằng:

```text
@Controller + @ResponseBody
```

---

# Phần 8: `@Configuration` và `@Bean`

Không phải lúc nào mình cũng sửa được class để gắn `@Component`.

Ví dụ:

- class từ thư viện ngoài
- object cần cấu hình phức tạp
- muốn tạo bean theo điều kiện/config

Khi đó dùng `@Configuration` + `@Bean`.

---

## 12. `@Configuration`

Class chứa method khai báo bean.

```java
@Configuration
class AppConfig {
}
```

---

## 13. `@Bean`

Method tạo bean.

```java
@Configuration
class AppConfig {

    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}
```

Spring sẽ gọi method `clock()` và quản lý object trả về như một bean.

Inject vào service:

```java
@Service
class OrderService {
    private final Clock clock;

    OrderService(Clock clock) {
        this.clock = clock;
    }
}
```

---

## 14. Khi nào dùng `@Component`, khi nào dùng `@Bean`?

| Trường hợp | Nên dùng |
|---|---|
| Class mình viết và đơn giản | `@Component` / `@Service` |
| Class thư viện ngoài | `@Bean` |
| Cần cấu hình object trước khi tạo | `@Bean` |
| Muốn nhóm config rõ ràng | `@Configuration` + `@Bean` |

Ví dụ:

```java
@Service
class ProductService {
}
```

Và:

```java
@Configuration
class TimeConfig {
    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}
```

---

# Phần 9: Bean name và khi có nhiều bean cùng type

Nếu có một interface:

```java
interface PaymentGateway {
    void pay();
}
```

Có hai implementation:

```java
@Component
class MomoPaymentGateway implements PaymentGateway {
    public void pay() {}
}

@Component
class VnpayPaymentGateway implements PaymentGateway {
    public void pay() {}
}
```

Inject như này sẽ lỗi:

```java
@Service
class CheckoutService {
    CheckoutService(PaymentGateway gateway) {
    }
}
```

Vì Spring thấy có 2 bean `PaymentGateway`.

---

## 15. Cách xử lý nhiều bean cùng type

### Cách 1: `@Primary`

```java
@Primary
@Component
class MomoPaymentGateway implements PaymentGateway {
}
```

Bean này được ưu tiên mặc định.

### Cách 2: `@Qualifier`

```java
@Service
class CheckoutService {
    CheckoutService(@Qualifier("vnpayPaymentGateway") PaymentGateway gateway) {
    }
}
```

Tên bean mặc định thường là tên class viết thường chữ đầu:

```text
VnpayPaymentGateway -> vnpayPaymentGateway
```

### Cách 3: Inject map/list strategy

```java
@Service
class PaymentService {
    private final Map<String, PaymentGateway> gateways;

    PaymentService(Map<String, PaymentGateway> gateways) {
        this.gateways = gateways;
    }

    void pay(String type) {
        gateways.get(type).pay();
    }
}
```

Dùng tốt khi có nhiều strategy.

---

# Phần 10: Bean Scope

Scope là phạm vi sống của bean.

## 16. Singleton scope

Mặc định của Spring bean.

```text
Một bean instance cho mỗi ApplicationContext.
```

Ví dụ:

```java
@Service
class ProductService {
}
```

Mặc định là singleton.

Lưu ý:

```text
Singleton trong Spring không hoàn toàn giống GoF Singleton.
```

Spring singleton là một instance trong một container, không phải cấm toàn bộ JVM tạo instance khác.

---

## 17. Prototype scope

Mỗi lần request bean từ container sẽ tạo instance mới.

```java
@Scope("prototype")
@Component
class ExportJob {
}
```

Nhưng nếu inject prototype vào singleton trực tiếp, prototype chỉ được tạo một lần lúc singleton được tạo.

Ví dụ dễ hiểu:

```java
@Service
class ReportService {
    private final ExportJob exportJob;

    ReportService(ExportJob exportJob) {
        this.exportJob = exportJob;
    }
}
```

`ReportService` singleton, nên `ExportJob` được inject một lần.

Nếu thật sự cần prototype mới mỗi lần, dùng `ObjectProvider`.

```java
@Service
class ReportService {
    private final ObjectProvider<ExportJob> exportJobs;

    ReportService(ObjectProvider<ExportJob> exportJobs) {
        this.exportJobs = exportJobs;
    }

    void export() {
        ExportJob job = exportJobs.getObject();
    }
}
```

---

## 18. Request scope

Một instance cho mỗi HTTP request.

```java
@RequestScope
@Component
class RequestContext {
}
```

Dùng khi data sống theo một request cụ thể.

Ví dụ:

- request id
- user info trong request
- trace context

---

## 19. Session scope

Một instance cho mỗi HTTP session.

```java
@SessionScope
@Component
class CartSession {
}
```

Dùng khi data cần giữ theo session user.

Với REST stateless/JWT, session scope ít dùng hơn.

---

## 20. Bảng scope cần nhớ

| Scope | Ý nghĩa | Hay dùng không |
|---|---|---|
| singleton | Một instance trong ApplicationContext | Rất hay dùng |
| prototype | Tạo instance mới mỗi lần request bean | Ít hơn |
| request | Một instance mỗi HTTP request | Có dùng trong web |
| session | Một instance mỗi HTTP session | Ít dùng trong REST stateless |

---

# Phần 11: Bean Lifecycle

Lifecycle là vòng đời bean từ lúc được tạo đến lúc bị destroy.

Luồng đơn giản:

```text
1. Spring tạo object
2. Inject dependency
3. Gọi init callback
4. Bean sẵn sàng dùng
5. App shutdown
6. Gọi destroy callback
```

---

## 21. `@PostConstruct`

Chạy sau khi bean được tạo và inject dependency xong.

```java
@Service
class ProductCache {

    @PostConstruct
    void init() {
        System.out.println("ProductCache init");
    }
}
```

Dùng để:

- log lifecycle
- validate config
- warm up cache đơn giản

Không nên dùng để:

- chạy business flow nặng
- gọi remote service nguy hiểm khi startup
- làm logic phụ thuộc request

---

## 22. `@PreDestroy`

Chạy trước khi bean bị destroy lúc app shutdown.

```java
@Service
class ProductCache {

    @PreDestroy
    void destroy() {
        System.out.println("ProductCache destroy");
    }
}
```

Dùng để:

- đóng resource
- log shutdown
- cleanup nhẹ

---

## 23. `InitializingBean`

Một cách khác để hook init:

```java
@Service
class ProductCache implements InitializingBean {

    @Override
    public void afterPropertiesSet() {
        System.out.println("ProductCache init");
    }
}
```

Trong code app thường ưu tiên `@PostConstruct` vì ít dính Spring interface hơn.

---

## 24. `DisposableBean`

Tương tự destroy callback:

```java
@Service
class ProductCache implements DisposableBean {

    @Override
    public void destroy() {
        System.out.println("ProductCache destroy");
    }
}
```

Ít dùng hơn `@PreDestroy` trong app thường.

---

## 25. Lifecycle với `@Bean`

Có thể khai báo init/destroy method:

```java
@Configuration
class CacheConfig {

    @Bean(initMethod = "start", destroyMethod = "stop")
    ProductCache productCache() {
        return new ProductCache();
    }
}
```

Class:

```java
class ProductCache {
    void start() {
        System.out.println("start cache");
    }

    void stop() {
        System.out.println("stop cache");
    }
}
```

---

# Phần 12: Circular Dependency

Circular dependency xảy ra khi bean phụ thuộc vòng tròn.

Ví dụ:

```java
@Service
class OrderService {
    OrderService(PaymentService paymentService) {}
}

@Service
class PaymentService {
    PaymentService(OrderService orderService) {}
}
```

Vòng phụ thuộc:

```text
OrderService -> PaymentService -> OrderService
```

Spring không biết tạo bean nào trước cho sạch.

---

## 26. Vì sao circular dependency là mùi thiết kế?

Nó thường báo hiệu:

- hai service biết quá nhiều về nhau
- boundary chưa rõ
- logic orchestration đặt sai chỗ
- thiếu abstraction hoặc thiếu service trung gian

Không nên giải quyết bằng cách cố ép Spring chạy bằng mọi giá.

---

## 27. Cách xử lý circular dependency

### Cách tốt: tách trách nhiệm

Sai:

```text
OrderService gọi PaymentService
PaymentService gọi lại OrderService
```

Tốt hơn:

```text
CheckoutService orchestration
OrderService xử lý order
PaymentService xử lý payment
```

Ví dụ:

```java
@Service
class CheckoutService {
    private final OrderService orderService;
    private final PaymentService paymentService;

    CheckoutService(OrderService orderService, PaymentService paymentService) {
        this.orderService = orderService;
        this.paymentService = paymentService;
    }

    void checkout() {
        Order order = orderService.createOrder();
        paymentService.pay(order);
    }
}
```

### Cách tạm: `@Lazy`

```java
@Service
class OrderService {
    OrderService(@Lazy PaymentService paymentService) {}
}
```

`@Lazy` chỉ nên xem là workaround. Nếu có circular dependency, ưu tiên xem lại thiết kế.

---

# Phần 13: Mini shopcore design cho M1-1

Trong `shopcore`, giai đoạn này chưa cần database thật.

Bạn có thể dựng bean đơn giản:

```text
ProductService
ProductRepository
SkuGenerator
Clock
StartupLogger
```

Ví dụ:

```java
interface ProductRepository {
    void save(String name);
}
```

```java
@Repository
class InMemoryProductRepository implements ProductRepository {
    public void save(String name) {
        System.out.println("saved product: " + name);
    }
}
```

```java
@Component
class SkuGenerator {
    String generate(String name) {
        return name.toUpperCase().replace(" ", "-");
    }
}
```

```java
@Service
class ProductService {
    private final ProductRepository repository;
    private final SkuGenerator skuGenerator;
    private final Clock clock;

    ProductService(ProductRepository repository, SkuGenerator skuGenerator, Clock clock) {
        this.repository = repository;
        this.skuGenerator = skuGenerator;
        this.clock = clock;
    }

    void createProduct(String name) {
        String sku = skuGenerator.generate(name);
        repository.save(name + " - " + sku + " - " + clock.instant());
    }
}
```

```java
@Configuration
class TimeConfig {
    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}
```

Log lifecycle:

```java
@Component
class StartupLogger {

    @PostConstruct
    void init() {
        System.out.println("StartupLogger initialized");
    }

    @PreDestroy
    void destroy() {
        System.out.println("StartupLogger destroyed");
    }
}
```

---

# Phần 14: Những lỗi hay gặp

## Lỗi 1: Nghĩ `@Autowired` là bắt buộc ở constructor

Nếu class chỉ có một constructor, Spring tự inject.

```java
@Service
class ProductService {
    ProductService(ProductRepository repository) {}
}
```

Không cần:

```java
@Autowired
ProductService(ProductRepository repository) {}
```

---

## Lỗi 2: Dùng field injection mọi nơi

Không nên:

```java
@Autowired
private ProductRepository repository;
```

Nên:

```java
private final ProductRepository repository;

ProductService(ProductRepository repository) {
    this.repository = repository;
}
```

---

## Lỗi 3: Lạm dụng `ApplicationContext.getBean()`

Không nên dùng `getBean()` trong business code chỉ để lấy dependency.

Không tốt:

```java
class ProductService {
    void create() {
        ProductRepository repo = context.getBean(ProductRepository.class);
    }
}
```

Tốt hơn:

```java
class ProductService {
    private final ProductRepository repo;

    ProductService(ProductRepository repo) {
        this.repo = repo;
    }
}
```

---

## Lỗi 4: Nhầm Spring singleton với GoF Singleton

Spring singleton:

```text
Một instance trong một ApplicationContext.
```

GoF Singleton:

```text
Cố đảm bảo một instance toàn cục qua private constructor/static instance.
```

Trong Spring app, thường không cần tự viết Singleton pattern.

---

## Lỗi 5: Inject prototype vào singleton rồi tưởng mỗi lần đều mới

Nếu prototype được inject trực tiếp vào singleton, nó được tạo lúc singleton được tạo.

Muốn lấy mới mỗi lần, dùng:

```java
ObjectProvider<MyPrototypeBean>
```

---

## Lỗi 6: Dùng circular dependency như chuyện bình thường

Nếu hai service gọi qua lại nhau, đừng vội dùng `@Lazy`.

Hãy hỏi:

```text
Có cần service thứ ba orchestration không?
Trách nhiệm của hai service đã tách đúng chưa?
Có interface/event nào phù hợp hơn không?
```

---

# Phần 15: Checklist tự kiểm tra

Bạn ổn M1-1 nếu trả lời được:

- IoC là gì?
- DI là gì?
- IoC khác DI thế nào?
- Vì sao constructor injection được ưu tiên?
- Khi nào dùng setter injection?
- Vì sao tránh field injection?
- Bean là gì?
- `ApplicationContext` làm gì?
- `@Component` khác `@Bean` thế nào?
- `@Configuration` dùng để làm gì?
- `@Service`, `@Repository`, `@RestController` nói gì về vai trò class?
- Nếu có nhiều bean cùng interface thì xử lý thế nào?
- Singleton scope trong Spring nghĩa là gì?
- Prototype scope có bẫy gì khi inject vào singleton?
- Request scope và session scope dùng khi nào?
- `@PostConstruct` chạy lúc nào?
- `@PreDestroy` chạy lúc nào?
- `InitializingBean` là gì?
- Circular dependency là gì?
- Vì sao circular dependency thường là lỗi thiết kế?

---

# Phần 16: Bài tập thực hành

## Bài 1: Vẽ dependency graph

Vẽ bằng text:

```text
ProductController -> ProductService -> ProductRepository
ProductService -> SkuGenerator
ProductService -> Clock
```

Trả lời:

- Bean nào là service?
- Bean nào là repository?
- Bean nào nên tạo bằng `@Bean`?
- Dependency nào inject qua constructor?

---

## Bài 2: Viết bean config

Tạo:

- `Clock` bean bằng `@Configuration` + `@Bean`
- `SkuGenerator` bằng `@Component`
- `ProductService` bằng `@Service`

Yêu cầu:

- không dùng field injection
- dùng constructor injection
- có log trong constructor hoặc `@PostConstruct`

---

## Bài 3: Chứng minh scope

Tạo một singleton bean và một prototype bean.

Log:

```text
created SingletonBean
created PrototypeBean
```

Thử lấy prototype nhiều lần bằng `ObjectProvider` để thấy mỗi lần là instance mới.

---

## Bài 4: Sửa circular dependency

Từ thiết kế sai:

```text
OrderService -> PaymentService
PaymentService -> OrderService
```

Sửa thành:

```text
CheckoutService -> OrderService
CheckoutService -> PaymentService
```

Giải thích vì sao tốt hơn.

---

# Phần 17: Deliverable M1-1 cho shopcore

Deliverable đúng module:

```text
Cấu hình Bean cho shopcore: @Configuration, scope, log chứng minh lifecycle
```

Gợi ý file:

```text
shopcore/
└── src/main/java/com/.../shopcore/
    ├── ShopcoreApplication.java
    ├── config/
    │   └── TimeConfig.java
    ├── product/
    │   ├── ProductService.java
    │   ├── ProductRepository.java
    │   └── InMemoryProductRepository.java
    ├── common/
    │   └── SkuGenerator.java
    └── lifecycle/
        └── StartupLogger.java
```

Yêu cầu:

- Có ít nhất một bean tạo bằng `@Component` hoặc `@Service`.
- Có ít nhất một bean tạo bằng `@Configuration` + `@Bean`.
- Có constructor injection.
- Có log `@PostConstruct`.
- Có log `@PreDestroy` nếu muốn chứng minh shutdown.
- Có ví dụ scope singleton/prototype hoặc giải thích bằng note.
- Không có circular dependency.

---

# Tóm tắt cực ngắn

```text
IoC = container giữ quyền tạo/quản lý object
DI = dependency được inject từ bên ngoài vào
Bean = object do Spring quản lý
ApplicationContext = container chứa bean
@Component/@Service/... = để component scan tạo bean
@Configuration + @Bean = tự khai báo bean bằng method
constructor injection = mặc định nên dùng
singleton = một instance trong ApplicationContext
prototype = tạo mới khi request bean
@PostConstruct = sau inject, trước khi dùng
@PreDestroy = trước shutdown
circular dependency = service phụ thuộc vòng tròn, nên refactor thiết kế
```
