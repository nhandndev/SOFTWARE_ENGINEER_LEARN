# Lab 05 - POST, DTO và JSON

> Các file Java đã được tạo sẵn ngay trong folder lab này. Bạn chỉ cần mở file đúng tên và tự viết code vào đó.

## Feature duy nhất

Client gửi JSON, Spring tạo request DTO, Service tạo Product và Controller trả `201 Created`.

## File cần tạo/sửa

```text
CreateProductRequest.java
ProductController.java
ProductService.java
ProductRepository.java
InMemoryProductRepository.java
```

## Request DTO

```java
public class CreateProductRequest {
    private String sku;
    private String name;
    private BigDecimal price;

    public CreateProductRequest() {
    }

    // Tự viết getter/setter hoặc dùng Lombok nếu project bạn đã có.
}
```

## Repository bổ sung

```java
Product save(Product product);
boolean existsBySku(String sku);
```

## Request phải chạy

```http
POST /api/products
Content-Type: application/json

{"sku":"KB-001","name":"Keyboard","price":1500000}
```

## Response mong đợi

```http
HTTP/1.1 201 Created
Location: /api/products/{id-mới}
Content-Type: application/json

{"id":2,"sku":"KB-001","name":"Keyboard","price":1500000}
```

## Ràng buộc

- Controller nhận `@RequestBody CreateProductRequest`.
- Service mapping DTO → Product.
- Repository tạo id và lưu vào Map.
- Service mapping Product đã lưu → ProductResponse.
- Controller tạo `Location` và status `201`.

## Thí nghiệm

Gửi JSON hỏng:

```bash
curl -i -X POST http://localhost:8080/api/products \
  -H 'Content-Type: application/json' \
  -d '{"sku":}'
```

Kiểm tra breakpoint Controller có dừng không.

## Tự trả lời

1. Ai chuyển JSON thành CreateProductRequest?
2. ID được tạo ở lớp nào trong implementation hiện tại?
3. `ResponseEntity` được tạo trước hay sau Service?
4. Vì sao không dùng Product làm request body?

## Hoàn thành

- [ ] POST trả `201`.
- [ ] Header `Location` đúng.
- [ ] GET id mới đọc lại được Product.
- [ ] Hiểu JSON hỏng dừng ở đâu.

Tiếp theo: [Lab 06 - Status code và lỗi](../Lab_06_Status_Code_Va_Loi/REQUEST.md).
