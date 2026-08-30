# Lab 09 - Final Product CRUD và trace runtime

> Các file Java đã được tạo sẵn ngay trong folder lab này. Bạn chỉ cần mở file đúng tên và tự viết code vào đó.

## Mục tiêu

Không thêm framework mới. Ghép các feature đã làm thành một API nhất quán và chứng minh bạn hiểu luồng bằng debugger.

## Endpoint bắt buộc

| Method | URL | Thành công |
|---|---|---:|
| GET | `/api/products` | `200` |
| GET | `/api/products/{id}` | `200` |
| POST | `/api/products` | `201` |
| PUT | `/api/products/{id}` | `200` |
| DELETE | `/api/products/{id}` | `204` |

Lỗi cần có: `400`, `404`, `409`.

## Kịch bản kiểm thử thủ công

Chạy đúng thứ tự:

1. POST tạo Product A → `201`.
2. GET id A → `200` và body đúng.
3. POST lại cùng SKU → `409`.
4. PUT id A → `200`, SKU giữ nguyên.
5. GET list page 0 → `200`, metadata đúng.
6. DELETE id A → `204`, không body.
7. GET id A → `404`.

## Trace bắt buộc 1 - POST thành công

Đặt breakpoint ở:

```text
ProductController.create
ProductService.create
InMemoryProductRepository.existsBySku
InMemoryProductRepository.save
ProductService.toResponse
```

Ghi lại object tại mỗi điểm:

```text
HTTP JSON
-> CreateProductRequest = ...
-> Product trước save = ...
-> Product sau save = ...
-> ProductResponse = ...
-> HTTP 201 + JSON
```

## Trace bắt buộc 2 - GET không tồn tại

Đặt breakpoint từ Repository tới exception handler và ghi:

```text
findById trả gì?
Service ném exception nào?
Exception đi qua call stack nào?
HTTP response cuối là gì?
```

## Tự giải thích bằng lời

1. Spring đăng ký route lúc nào?
2. Ai chọn Controller method?
3. Ai tạo argument `@PathVariable` và `@RequestBody`?
4. Đoạn nào dùng HTTP/JSON, đoạn nào chỉ là Java method call?
5. Tại sao business rule nằm trong Service?
6. Tại sao Repository không trả `ResponseEntity`?
7. Product trở thành JSON lúc nào?
8. Vì sao singleton Controller cần stateless?

## Hoàn thành

- [ ] Bảy bước kiểm thử đều đúng.
- [ ] Không có Controller gọi Repository.
- [ ] DTO tách khỏi model.
- [ ] Trace được chiều đi, chiều về và luồng exception.
- [ ] Tự trả lời được ít nhất 6/8 câu.

Sau khi hoàn thành, bạn đã sẵn sàng làm đề kiểm tra final M1-2. Việc hoàn thành lab chưa tự động cập nhật trạng thái module; cần bài kiểm tra đạt ít nhất 85%.
