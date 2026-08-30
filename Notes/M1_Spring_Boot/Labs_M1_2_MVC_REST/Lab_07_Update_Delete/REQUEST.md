# Lab 07 - Update và Delete

> Các file Java đã được tạo sẵn ngay trong folder lab này. Bạn chỉ cần mở file đúng tên và tự viết code vào đó.

## Feature duy nhất

Hoàn thiện vòng đời resource bằng PUT và DELETE.

## DTO cần tạo

```java
public class UpdateProductRequest {
    private String name;
    private BigDecimal price;

    public UpdateProductRequest() {
    }

    // Tự viết getter/setter hoặc dùng Lombok nếu project bạn đã có.
}
```

Không cho đổi SKU trong lab này.

## Request 1 - Update

```http
PUT /api/products/1
Content-Type: application/json

{"name":"Wireless Mouse","price":700000}
```

Mong đợi:

```http
HTTP/1.1 200 OK

{"id":1,"sku":"MOUSE-001","name":"Wireless Mouse","price":700000}
```

ID không tồn tại phải trả `404`.

## Request 2 - Delete

```http
DELETE /api/products/1
```

Mong đợi:

```http
HTTP/1.1 204 No Content
```

Body phải rỗng. Gọi GET hoặc DELETE lại id đó phải nhận `404`.

## Repository bổ sung

Tự thiết kế method cần thiết. Không bắt buộc dùng đúng tên sau, nhưng contract phải rõ:

```java
boolean existsById(Long id);
void deleteById(Long id);
```

Có thể dùng `save()` cho cả create và update nếu xử lý id đúng.

## Ràng buộc

- Controller chỉ xử lý HTTP contract.
- Service quyết định Product có tồn tại và dữ liệu nào được cập nhật.
- Repository thay đổi Map.
- `204` không có body.

## Tự trả lời

1. PUT khác POST ở ý nghĩa gì?
2. Vì sao SKU cũ được giữ lại?
3. Ai quyết định trả `204`?
4. DELETE có tính idempotent theo state cuối như thế nào?

## Hoàn thành

- [ ] PUT trả Product đã cập nhật.
- [ ] Update id không tồn tại trả `404`.
- [ ] DELETE trả `204` và body rỗng.
- [ ] Dữ liệu thật sự biến mất khỏi Map.

Tiếp theo: [Lab 08 - Pagination](../Lab_08_Pagination/REQUEST.md).
