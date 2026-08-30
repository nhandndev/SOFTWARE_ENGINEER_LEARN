# README học lại M1-1: IoC / DI, Bean & ApplicationContext

Kết quả gần nhất: `69/100` → `🟠 Cần ôn`

Bạn không yếu toàn module. Bạn đã ổn:

- IoC là gì.
- DI là gì.
- Vì sao không nên `new` dependency trực tiếp.
- Constructor injection tốt hơn field injection.
- Code skeleton bean với `@Service`, `@Repository`, `@Component`.
- `@Configuration` + `@Bean` cơ bản.

Phần cần học lại thật sự:

```text
1. Bean lifecycle
2. Prototype inject vào singleton
3. @Component vs @Bean
4. Nhiều bean cùng interface
5. Cách trả lời tình huống cho đủ bước
```

---

# 1. Ôn lại IoC và DI

## IoC là gì?

IoC = Inversion of Control.

Hiểu đơn giản:

```text
Trước Spring: class tự tạo object phụ thuộc bằng new.
Sau Spring: Spring container tạo bean, nối dependency và quản lý vòng đời.
```

Ví dụ chưa dùng IoC:

```java
class ProductService {
    private final ProductRepository repository = new JdbcProductRepository();
}
```

Vấn đề:

- `ProductService` bị dính cứng với `JdbcProductRepository`.
- Khó đổi sang implementation khác.
- Khó unit test bằng mock.

Sửa bằng IoC/DI:

```java
@Service
class ProductService {
    private final ProductRepository repository;

    ProductService(ProductRepository repository) {
        this.repository = repository;
    }
}
```

Câu trả lời chuẩn:

```text
IoC là đảo quyền điều khiển việc tạo/quản lý object từ code của mình sang Spring container.
DI là kỹ thuật Spring inject dependency từ bên ngoài vào class, thường qua constructor.
```

---

# 2. Constructor Injection

Bạn đã làm tốt phần này, chỉ cần nhớ câu trả lời gọn.

```java
@Service
class ProductService {
    private final ProductRepository repository;

    ProductService(ProductRepository repository) {
        this.repository = repository;
    }
}
```

Vì sao ưu tiên constructor injection?

- Dependency bắt buộc có ngay khi tạo object.
- Dùng được `final`.
- Dễ unit test.
- Nhìn constructor biết class cần gì.
- Tránh object bị thiếu dependency.

Field injection không khuyến nghị:

```java
@Autowired
private ProductRepository repository;
```

Vì:

- Khó test nếu không load Spring.
- Không dùng được `final`.
- Dependency bị giấu.

---

# 3. Bean Lifecycle

Đây là phần bạn sai nhiều nhất.

## Vòng đời bean cơ bản

```text
1. Spring tạo bean
2. Spring inject dependency
3. Spring gọi init callback
4. Bean sẵn sàng dùng
5. App shutdown
6. Spring gọi destroy callback
```

---

## `@PostConstruct`

Bạn từng viết nhầm là `@PostConstruct` dùng để xóa bean.

Đúng là:

```text
@PostConstruct chạy sau khi bean được tạo và inject dependency xong.
```

Ví dụ:

```java
@Component
class StartupLogger {

    @PostConstruct
    void init() {
        System.out.println("bean initialized");
    }
}
```

Dùng cho:

- log startup
- kiểm tra config
- init nhẹ
- warm-up nhỏ

Không dùng cho:

- business logic nặng
- gọi remote service nguy hiểm
- xử lý request

---

## `@PreDestroy`

Đúng là:

```text
@PreDestroy chạy trước khi bean bị destroy, thường khi app shutdown.
```

Ví dụ:

```java
@Component
class StartupLogger {

    @PreDestroy
    void destroy() {
        System.out.println("bean destroyed");
    }
}
```

Dùng cho:

- cleanup nhẹ
- đóng resource
- log shutdown

---

## `InitializingBean`

`InitializingBean` là interface của Spring:

```java
@Component
class ProductCache implements InitializingBean {

    @Override
    public void afterPropertiesSet() {
        System.out.println("init after dependency injection");
    }
}
```

Nó giống nhóm init callback.

Nhớ:

```text
InitializingBean.afterPropertiesSet() giống vai trò @PostConstruct.
Nó không phải destroy.
```

---

## Bảng nhớ nhanh lifecycle

| Cơ chế | Chạy khi nào | Nhóm |
|---|---|---|
| `@PostConstruct` | Sau khi tạo bean + inject xong | Init |
| `InitializingBean.afterPropertiesSet()` | Sau khi tạo bean + inject xong | Init |
| `@PreDestroy` | Trước khi app shutdown/destroy bean | Destroy |
| `DisposableBean.destroy()` | Trước khi destroy bean | Destroy |

Câu thần chú:

```text
PostConstruct = sau khi xây xong
PreDestroy = trước khi phá
InitializingBean = init callback kiểu interface
```

---

# 4. Scope: Singleton vs Prototype

## Singleton

Mặc định của Spring bean.

```text
Một instance trong một ApplicationContext.
```

Ví dụ:

```java
@Service
class ProductService {
}
```

Mặc định là singleton.

---

## Prototype

Prototype nghĩa là:

```text
Spring tạo instance mới mỗi lần bean được request từ container.
```

Ví dụ:

```java
@Scope("prototype")
@Component
class ExportJob {
}
```

---

## Bẫy bạn bị sai: prototype inject vào singleton

Nếu inject prototype trực tiếp vào singleton:

```java
@Service
class ReportService {
    private final ExportJob exportJob;

    ReportService(ExportJob exportJob) {
        this.exportJob = exportJob;
    }
}
```

`ReportService` là singleton.

Kết quả:

```text
ExportJob thường chỉ được tạo một lần lúc ReportService được tạo.
Không phải mỗi lần gọi method là có ExportJob mới.
```

Vì singleton giữ một reference cố định.

---

## Muốn prototype mới mỗi lần thì dùng `ObjectProvider`

```java
@Service
class ReportService {
    private final ObjectProvider<ExportJob> exportJobs;

    ReportService(ObjectProvider<ExportJob> exportJobs) {
        this.exportJobs = exportJobs;
    }

    void export() {
        ExportJob job = exportJobs.getObject();
        job.run();
    }
}
```

Mỗi lần gọi:

```java
exportJobs.getObject();
```

Spring mới request prototype bean từ container.

Câu trả lời chuẩn:

```text
Prototype inject trực tiếp vào singleton không tự tạo mới mỗi lần gọi method.
Nếu cần instance mới mỗi lần, inject ObjectProvider<PrototypeBean> và gọi getObject().
```

---

# 5. `@Component` vs `@Bean`

Bạn bị lẫn ở câu `SkuGenerator`.

## Khi nào dùng stereotype annotation?

Dùng khi class là code mình viết và Spring có thể scan được.

Ví dụ:

```java
@Component
class SkuGenerator {
}
```

```java
@Service
class ProductService {
}
```

```java
@Repository
class InMemoryProductRepository {
}
```

---

## Khi nào dùng `@Configuration` + `@Bean`?

Dùng khi:

- class từ thư viện ngoài
- không sửa được source
- cần cấu hình object trước khi đưa vào Spring

Ví dụ `Clock`:

```java
@Configuration
class TimeConfig {

    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}
```

Ví dụ `ObjectMapper`:

```java
@Configuration
class JsonConfig {

    @Bean
    ObjectMapper objectMapper() {
        return new ObjectMapper()
            .findAndRegisterModules();
    }
}
```

---

## Phân loại nhanh

| Class/object | Nên dùng | Vì sao |
|---|---|---|
| `ProductService` | `@Service` | Class nghiệp vụ mình viết |
| `SkuGenerator` | `@Component` | Helper mình viết |
| `InMemoryProductRepository` | `@Repository` | Data access mình viết |
| `Clock` | `@Bean` | Class thư viện Java |
| `ObjectMapper` | `@Bean` | Class thư viện ngoài/cần config |

Câu thần chú:

```text
Class mình viết -> @Component/@Service/@Repository
Object thư viện ngoài hoặc cần config -> @Bean
```

---

# 6. Nhiều bean cùng interface

Ví dụ:

```java
interface PaymentGateway {
    void pay();
}

@Component
class MomoPaymentGateway implements PaymentGateway {
    public void pay() {}
}

@Component
class VnpayPaymentGateway implements PaymentGateway {
    public void pay() {}
}
```

Nếu inject:

```java
@Service
class CheckoutService {
    CheckoutService(PaymentGateway gateway) {
    }
}
```

Spring sẽ hỏi:

```text
Có 2 PaymentGateway, chọn cái nào?
```

---

## Cách 1: `@Primary`

```java
@Primary
@Component
class MomoPaymentGateway implements PaymentGateway {
}
```

Momo là default.

---

## Cách 2: `@Qualifier`

```java
@Service
class VnpayCheckoutService {

    VnpayCheckoutService(
        @Qualifier("vnpayPaymentGateway") PaymentGateway gateway
    ) {
    }
}
```

Tên bean mặc định:

```text
VnpayPaymentGateway -> vnpayPaymentGateway
```

---

## Cách 3: Inject Map strategy

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

Dùng khi có nhiều strategy và chọn theo runtime.

---

# 7. Circular Dependency

Bạn trả lời phần này khá ổn, chỉ cần nhớ đừng ưu tiên `@Lazy`.

Ví dụ lỗi:

```text
OrderService -> PaymentService
PaymentService -> OrderService
```

Đây là circular dependency.

Sửa sạch hơn:

```text
CheckoutService -> OrderService
CheckoutService -> PaymentService
```

Code:

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

Nhớ:

```text
@Lazy là workaround.
Refactor trách nhiệm mới là hướng sạch.
```

---

# 8. Bộ câu trả lời mẫu cần thuộc

## Câu 1: `@PostConstruct` là gì?

```text
@PostConstruct chạy sau khi Spring tạo bean và inject dependency xong. Nó dùng cho init nhẹ như log, validate config, warm-up nhỏ. Không phải để xóa bean.
```

## Câu 2: `@PreDestroy` là gì?

```text
@PreDestroy chạy trước khi bean bị destroy, thường khi application shutdown. Nó dùng cho cleanup nhẹ hoặc đóng resource.
```

## Câu 3: Prototype inject vào singleton có tạo mới mỗi lần không?

```text
Không. Nếu prototype được inject trực tiếp vào singleton, singleton giữ một reference được tạo lúc singleton được tạo. Muốn instance mới mỗi lần thì dùng ObjectProvider và gọi getObject().
```

## Câu 4: `@Component` khác `@Bean`?

```text
@Component dùng cho class mình viết và để Spring component scan tự tạo bean.
@Bean dùng trong @Configuration để tự khai báo bean, thường cho class thư viện ngoài hoặc object cần cấu hình trước.
```

## Câu 5: Nếu có nhiều bean cùng interface?

```text
Spring sẽ không biết chọn bean nào khi inject theo type. Có thể dùng @Primary để chọn default, @Qualifier để chỉ định bean cụ thể, hoặc inject Map/List nếu muốn chọn strategy runtime.
```

---

# 9. Bài tập vá lỗi

## Bài 1: Lifecycle

Điền:

```text
@PostConstruct chạy khi nào?
@PreDestroy chạy khi nào?
InitializingBean.afterPropertiesSet() thuộc nhóm init hay destroy?
```

Đáp án:

```text
@PostConstruct: sau tạo bean + inject xong
@PreDestroy: trước khi destroy/shutdown
InitializingBean.afterPropertiesSet(): init
```

---

## Bài 2: Scope

Giải thích bằng lời:

```text
Vì sao prototype inject trực tiếp vào singleton không tạo mới mỗi lần gọi method?
```

Đáp án cần có:

```text
Vì singleton được tạo một lần và giữ reference tới prototype đã inject.
Muốn prototype mới mỗi lần phải request từ container bằng ObjectProvider.getObject().
```

---

## Bài 3: Phân loại bean

Phân loại:

| Object | Đáp án |
|---|---|
| `ProductService` | `@Service` |
| `SkuGenerator` | `@Component` |
| `InMemoryProductRepository` | `@Repository` |
| `Clock` | `@Bean` |
| `ObjectMapper` | `@Bean` |

---

## Bài 4: Viết lại code prototype

```java
@Scope("prototype")
@Component
class ExportJob {
    void run() {
        System.out.println("export");
    }
}

@Service
class ReportService {
    private final ObjectProvider<ExportJob> exportJobs;

    ReportService(ObjectProvider<ExportJob> exportJobs) {
        this.exportJobs = exportJobs;
    }

    void export() {
        ExportJob job = exportJobs.getObject();
        job.run();
    }
}
```

---

# 10. Checklist trước khi thi lại

Bạn sẵn sàng thi lại M1-1 nếu trả lời được:

- IoC là gì?
- DI là gì?
- Vì sao constructor injection tốt?
- Bean là gì?
- `ApplicationContext` làm gì?
- Khi nào dùng `@Component`, khi nào dùng `@Bean`?
- `@PostConstruct` chạy khi nào?
- `@PreDestroy` chạy khi nào?
- `InitializingBean` là init hay destroy?
- Singleton scope là gì?
- Prototype scope là gì?
- Prototype inject vào singleton có bẫy gì?
- `ObjectProvider` dùng khi nào?
- Circular dependency là gì?
- Vì sao nên refactor circular dependency thay vì chỉ dùng `@Lazy`?

---

# Kết luận

Bạn chưa cần học lại toàn M1-1.

Chỉ cần vá 3 điểm:

```text
lifecycle
prototype-in-singleton
@Component vs @Bean
```

Code của bạn đã ổn. Sau khi học file này, làm đề thi lại ngắn là hợp lý.
