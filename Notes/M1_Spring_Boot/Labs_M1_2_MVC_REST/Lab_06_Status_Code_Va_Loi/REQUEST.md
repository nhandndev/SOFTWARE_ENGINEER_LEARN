# Lab 06 - Status code và luồng lỗi

> Các file Java đã được tạo sẵn ngay trong folder lab này. Bạn chỉ cần mở file đúng tên và tự viết code vào đó.

## Feature duy nhất

Phân biệt input sai, không tìm thấy và xung đột nghiệp vụ.

## Tình huống phải xử lý

| Request | Trường hợp | Status |
|---|---|---:|
| `GET /api/products/999` | Không tồn tại | `404` |
| `POST /api/products` | Trùng SKU | `409` |
| `POST /api/products` | Giá `<= 0` | `400` |

## Yêu cầu

Tạo các exception có ý nghĩa, ví dụ:

```text
ProductNotFoundException
DuplicateSkuException
InvalidProductPriceException
```

Ở lab này được phép chọn một trong hai cách tạm thời:

1. Gắn `@ResponseStatus` lên exception.
2. Ném `ResponseStatusException` từ Service.

M1-4 sẽ thay cách tạm bằng `@ControllerAdvice` và error response thống nhất.

## Request trùng SKU

Gửi hai lần:

```http
POST /api/products
Content-Type: application/json

{"sku":"KB-001","name":"Keyboard","price":1500000}
```

Lần đầu `201`, lần hai `409`.

## Request giá sai

```http
POST /api/products
Content-Type: application/json

{"sku":"BAD-001","name":"Invalid","price":-1}
```

Mong đợi `400`.

## Ràng buộc

- Service phát hiện business rule.
- Repository không trả status code hoặc `ResponseEntity`.
- Controller không tự kiểm tra trùng SKU.

## Debug bắt buộc

Bật breakpoint khi exception được throw. Quan sát call stack khi exception đi từ Service ngược ra Spring MVC.

## Tự trả lời

1. Vì sao không tìm thấy là `404`?
2. Vì sao trùng SKU là `409`, không phải `400`?
3. Thành phần nào đổi exception thành HTTP response?
4. Sau lệnh `throw`, các dòng phía dưới có chạy không?

## Hoàn thành

- [ ] Ba trường hợp trả đúng 400/404/409.
- [ ] Business rule ở Service.
- [ ] Đã trace exception bằng debugger.

Tiếp theo: [Lab 07 - Update và Delete](../Lab_07_Update_Delete/REQUEST.md).
