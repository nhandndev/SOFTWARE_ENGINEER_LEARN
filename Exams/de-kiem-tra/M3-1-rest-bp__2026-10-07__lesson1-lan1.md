# M3-1 REST best practices — Kiểm tra Lesson01

> LESSON: 8 câu ×5đ =40đ; điểm/40×100. Đạt từ34/40. Chấm ý nghĩa nhưng phải đủ vế; không cần imports. Tình huống độc lập, không cần chạy app. Bài giải ở file cùng tên thêm __DAPAN.md; đọc sau khi làm.

## Câu 1 (5đ) — Resource và version

Đổi `GET /getAllProducts` và `GET /getProduct?id=10` sang convention bài học. `/api/v1` nói về version gì, có phải Flyway V1 hay Java version không? Nêu lợi ích của convention thống nhất với client.

**Trả lời:**

## Câu 2 (5đ) — Client v1 có bị vỡ?

Client v1 đọc `body.price` là number và bỏ qua field lạ. Bạn muốn xóa price, thay bằng amount. Có breaking không và vì sao? Đề xuất cách chuyển version để client cũ còn chạy. Nếu chỉ thêm description optional, với chính client được mô tả thì có nhất thiết tạo v2 không?

**Trả lời:**

## Câu 3 (5đ) — Tạo Product

POST `/api/v1/products` thành công tạo id11. Viết status, Location và mô tả body cần trả. Một bạn dùng HTTP200 body `{"status":201}`: có tương đương không? Vì sao?

**Trả lời:**

## Câu 4 (5đ) — PUT có thật sự idempotent?

API công bố PUT `/api/v1/products/10` thay stock thành giá trị trong body. Hiện stock=5, body stock=3 nhưng code mỗi lần gọi lại làm `product.setStock(product.getStock() + request.getStock())`. Gọi hai lần không có update xen giữa: stock ra sao, đúng contract không, sửa nghĩa thao tác thế nào? Đúng annotation có đủ không?

**Trả lời:**

## Câu 5 (5đ) — DELETE lặp lại

Product10 tồn tại. DELETE lần1 trả204 và xóa; lần2 trả404 vì không còn. Có mất idempotency vì status khác nhau không? Nêu state cuối, intended effect và một policy khác vẫn hợp lý nếu được công bố.

**Trả lời:**

## Câu 6 (5đ) — Timeout rồi retry POST

POST đã INSERT/commit nhưng response mất. Client retry cùng JSON. Có chắc request đầu thất bại và lần retry chỉ tạo đúng một resource không? Unique SKU giúp gì, chưa bảo đảm gì? Nêu một hướng xử lý retry chỉ ở mức nhận diện, không code Redis.

**Trả lời:**

## Câu 7 (5đ) — Safe, PUT và PATCH

GET có nên sửa giá Product không? PUT/DELETE có safe không dù idempotent? PATCH “gán name=Keyboard” khác PATCH “tăng stock thêm3” khi retry ra sao? Có phải cứ PATCH là idempotent?

**Trả lời:**

## Câu 8 (5đ) — Chữa contract/code ngắn

Contract công bố PUT `/api/v1/products/{id}` thay đầy đủ name/price/categoryId, trả200 + ProductResponse. Request DTO class có ba field đó. Đoạn rút gọn hiện có:

```java
@RequestMapping("/api/v1/products")
class ProductController {
    @PostMapping("/{id}")
    ResponseEntity<ProductResponse> replace(Long id, UpdateProductRequest request) {
        return ResponseEntity.created(URI.create("/api/v2/products/" + id))
                .body(service.replace(id, request));
    }
}
```

Giả định Controller đã có @RestController và service inject đúng, Service thực hiện replacement đúng. Sửa method mapping, cách bind id/body và response theo contract; có thể viết code ngắn hoặc nói rõ từng sửa. Vì sao không bắt client gửi createdAt hay toàn bộ field DB?

**Trả lời:**
