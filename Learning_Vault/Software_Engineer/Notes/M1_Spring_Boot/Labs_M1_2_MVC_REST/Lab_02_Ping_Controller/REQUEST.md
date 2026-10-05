# Lab 02 - Ping Controller

> File Java đã được tạo sẵn ngay trong folder lab này. Bạn chỉ cần mở file đúng tên và tự viết code vào đó.

## Feature duy nhất

Tạo Controller đầu tiên và thấy Spring tự gọi method theo request mapping.

## File cần tạo

```text
ProductController.java
```

Nếu package gốc khác `com.shopcore`, đặt file dưới package gốc thực tế.

## Request phải chạy

```http
GET /api/products/ping
```

## Response mong đợi

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"message":"product-api-ok"}
```

## Khung

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping("/ping")
    public Map<String, String> ping() {
        // TODO: tự viết return
    }
}
```

## Debug bắt buộc

Đặt breakpoint trong `ping()` rồi chạy:

```bash
curl -i http://localhost:8080/api/products/ping
```

## Tự trả lời

1. Ai gọi `ping()` khi code không gọi trực tiếp method này?
2. `@RequestMapping` và `@GetMapping` ghép thành URL nào?
3. `Map` được biến thành JSON trước hay sau khi method return?

## Hoàn thành

- [ ] Status `200`.
- [ ] JSON đúng.
- [ ] Breakpoint dừng.
- [ ] Không có Service/Repository trong lab này.

Tiếp theo: [Lab 03 - Path và Query Params](../Lab_03_Path_Query_Params/REQUEST.md).
