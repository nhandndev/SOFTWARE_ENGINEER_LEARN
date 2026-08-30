# Lab 04 - GET Product qua đủ 3 lớp

> Các file Java đã được tạo sẵn ngay trong folder lab này. Bạn chỉ cần mở file đúng tên và tự viết code vào đó.

## Feature duy nhất

Request GET đi qua Controller → Service → Repository và quay trở lại.

## File cần tạo/sửa

```text
Product.java
ProductController.java
ProductService.java
ProductRepository.java
InMemoryProductRepository.java
ProductResponse.java
```

## Model

```java
public class Product {
    private Long id;
    private String sku;
    private String name;
    private BigDecimal price;

    public Product() {
    }

    public Product(Long id, String sku, String name, BigDecimal price) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.price = price;
    }

    // Tự viết getter/setter hoặc dùng Lombok nếu project bạn đã có.
}
```

## Repository contract

```java
public interface ProductRepository {
    Optional<Product> findById(Long id);
}
```

Implementation dùng `Map<Long, Product>` và seed ít nhất Product id `1`.

## Request phải chạy

```http
GET /api/products/1
```

## Response mong đợi

```http
HTTP/1.1 200 OK

{"id":1,"sku":"MOUSE-001","name":"Mouse","price":500000}
```

## Ràng buộc

- Controller chỉ gọi Service.
- Service gọi Repository và mapping Product → ProductResponse.
- Repository là lớp duy nhất biết `Map`.
- Dùng constructor injection, không tự `new Service/Repository`.

## Debug bắt buộc

Đặt breakpoint tại cả ba lớp và Step Into theo chiều đi, Step Out theo chiều về.

## Tự trả lời

1. Controller gọi Service qua HTTP hay Java?
2. JSON có tồn tại giữa Service và Repository không?
3. Spring inject object implementation nào vào interface Repository?
4. Tại sao Controller không biết dữ liệu nằm trong Map?

## Hoàn thành

- [ ] GET id 1 trả `200`.
- [ ] Request đi đủ ba lớp.
- [ ] Không để business/data logic trong Controller.
- [ ] Trace được object đi và quay về.

Tiếp theo: [Lab 05 - POST, DTO và JSON](../Lab_05_Post_DTO_JSON/REQUEST.md).
