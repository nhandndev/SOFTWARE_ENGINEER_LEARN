# Đáp án kiểm tra nhanh M1-1: Ôn lỗi IoC/DI Bean Lifecycle - lần 2

Topic: `M1-1-ioc-di`  
Chế độ: `NHANH`  
Tổng điểm thô: 43 điểm  
Normalize: `(điểm thô / 43) × 100`

---

## Phần I - Lý thuyết `(18đ)`

### Câu 1 `(3đ)`

- Spring tạo bean/object. `(0.6đ)`
- Inject dependency. `(0.6đ)`
- Gọi init callback như `@PostConstruct`/`InitializingBean`. `(0.8đ)`
- Bean sẵn sàng dùng. `(0.4đ)`
- Khi app shutdown, gọi destroy callback như `@PreDestroy`. `(0.6đ)`

### Câu 2 `(3đ)`

- `@PostConstruct` là lifecycle callback. `(0.75đ)`
- Chạy sau khi bean được tạo và inject dependency xong. `(1.25đ)`
- Dùng cho init nhẹ/log/validate config/warm-up nhỏ. `(0.5đ)`
- Không phải dùng để xóa bean. `(0.5đ)`

### Câu 3 `(3đ)`

- `@PreDestroy` là lifecycle callback trước destroy. `(0.75đ)`
- Chạy trước khi bean bị destroy, thường lúc app shutdown. `(1.25đ)`
- Dùng cleanup nhẹ/đóng resource/log shutdown. `(1đ)`

### Câu 4 `(3đ)`

- Thuộc nhóm init. `(1đ)`
- Chạy sau khi dependency được set/inject xong. `(1đ)`
- Giống `@PostConstruct` hơn, nhưng là Spring interface. `(1đ)`

### Câu 5 `(3đ)`

- `@Component` dùng cho class mình viết, để component scan tạo bean. `(1.25đ)`
- `@Bean` dùng trong `@Configuration` để tự khai báo bean bằng method. `(1.25đ)`
- `@Bean` hợp cho class thư viện ngoài/object cần cấu hình. `(0.5đ)`

### Câu 6 `(3đ)`

- Singleton: một instance trong một ApplicationContext, là scope mặc định. `(1.5đ)`
- Prototype: tạo instance mới mỗi lần request bean từ container. `(1.25đ)`
- Nêu đúng bẫy prototype inject vào singleton là điểm cộng trong giới hạn. `(0.25đ)`

---

## Phần II - Tình huống `(15đ)`

### Câu 7 `(5đ)`

- `ProductService` → `@Service`, vì nghiệp vụ. `(1đ)`
- `SkuGenerator` → `@Component`, vì helper/class mình viết. `(1đ)`
- `Clock` → `@Bean`, vì class thư viện Java/cần config. `(1đ)`
- `ObjectMapper` → `@Bean`, vì class thư viện ngoài/cần config. `(1đ)`
- `InMemoryProductRepository` → `@Repository` hoặc `@Component`, vì data access implementation. `(1đ)`

### Câu 8 `(5đ)`

- Nhận định sai. `(1đ)`
- Prototype inject trực tiếp vào singleton thường chỉ tạo một lần khi singleton được tạo. `(1.5đ)`
- Singleton giữ reference tới prototype đó. `(1đ)`
- Muốn mới mỗi lần, dùng `ObjectProvider<ExportJob>`. `(1đ)`
- Gọi `getObject()` trong method `export()`. `(0.5đ)`

### Câu 9 `(5đ)`

- Có thể lỗi ambiguous/no unique bean vì có 2 bean cùng type. `(1.5đ)`
- Dùng `@Primary` trên bean mặc định, ví dụ Momo. `(1.25đ)`
- Dùng `@Qualifier("vnpayPaymentGateway")` để chỉ định VNPAY. `(1.5đ)`
- Có thể nêu bean name mặc định theo class lowerCamelCase. `(0.75đ)`

---

## Phần III - Code mini `(10đ)`

### Câu 10 `(10đ)`

Tiêu chí:

- `ExportJob` là bean prototype. `(2đ)`
- `ReportService` là service/singleton mặc định. `(1.5đ)`
- Inject `ObjectProvider<ExportJob>`. `(2đ)`
- Gọi `getObject()` trong `export()`. `(1.5đ)`
- `StartupLogger` là bean. `(1đ)`
- Có `@PostConstruct`. `(1đ)`
- Có `@PreDestroy`. `(1đ)`

Mẫu:

```java
@Scope("prototype")
@Component
class ExportJob {
    void run() {
        System.out.println("exporting");
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
```
