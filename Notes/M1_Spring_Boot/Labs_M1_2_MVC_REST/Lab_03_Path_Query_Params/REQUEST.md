# Lab 03 - Path variable và query parameter

> File Java đã được tạo sẵn ngay trong folder lab này. Bạn chỉ cần mở file đúng tên và tự viết code vào đó.

## Feature duy nhất

Nhìn thấy Spring lấy dữ liệu từ URL rồi chuyển thành Java argument.

## File được sửa

```text
ProductController.java
```

## Endpoint 1 - Path variable

```http
GET /api/products/10
```

Response tạm:

```json
{"receivedId":10}
```

Khung:

```java
@GetMapping("/{id}")
public Map<String, Long> receiveId(@PathVariable Long id) {
    // TODO
}
```

Gọi thêm request lỗi:

```http
GET /api/products/abc
```

Quan sát Controller method có được chạy không.

## Endpoint 2 - Query parameter

```http
GET /api/products/search?keyword=mouse&page=0&size=5
```

Response tạm:

```json
{"keyword":"mouse","page":0,"size":5}
```

Tự viết method dùng `@RequestParam`; `page` mặc định `0`, `size` mặc định `20`.

## Tự trả lời

1. `10` ban đầu là text hay Long?
2. Thành phần nào chuyển nó thành Long?
3. Path variable và query parameter khác mục đích gì?
4. Với `abc`, lỗi xảy ra trước hay trong method?

## Hoàn thành

- [ ] Hai endpoint chạy đúng.
- [ ] Query param mặc định hoạt động.
- [ ] Đã thử conversion lỗi với `abc`.
- [ ] Chưa cần Service/Repository.

Tiếp theo: [Lab 04 - GET Product qua 3 lớp](../Lab_04_Three_Layer_Get_Product/REQUEST.md).
