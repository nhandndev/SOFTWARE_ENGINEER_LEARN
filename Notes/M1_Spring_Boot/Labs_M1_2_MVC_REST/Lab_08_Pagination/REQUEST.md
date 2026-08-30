# Lab 08 - Pagination

> Các file Java đã được tạo sẵn ngay trong folder lab này. Bạn chỉ cần mở file đúng tên và tự viết code vào đó.

## Feature duy nhất

Trả danh sách Product theo trang cùng metadata.

## Chuẩn bị

Trong Repository cần có ít nhất 5 Product.

Nếu `shopcore` đã có `PageResponse<T>` từ M0-1, dùng lại. Nếu chưa có, tạo:

```java
public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;

    public PageResponse() {
    }

    public PageResponse(
            List<T> content,
            int page,
            int size,
            long totalElements,
            int totalPages) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    // Tự viết getter/setter hoặc dùng Lombok nếu project bạn đã có.
}
```

## Request phải chạy

```http
GET /api/products?page=0&size=2
```

## Response mong đợi với 5 Product

```json
{
  "content": [
    {"id":1,"sku":"...","name":"...","price":500000},
    {"id":2,"sku":"...","name":"...","price":700000}
  ],
  "page": 0,
  "size": 2,
  "totalElements": 5,
  "totalPages": 3
}
```

Kiểm tra thêm:

```text
page=1&size=2 -> 2 Product
page=2&size=2 -> 1 Product
```

## Ràng buộc

- `page` mặc định `0`.
- `size` mặc định `20`.
- Chỉ chấp nhận size từ `1` đến `100`.
- Kết quả phải có thứ tự ổn định, ví dụ sort theo id trước khi cắt.
- `content` không được chứa toàn bộ dữ liệu.

## Công thức cần tự áp dụng

```text
fromIndex = page * size
toIndex = min(fromIndex + size, totalElements)
totalPages = ceil(totalElements / size)
```

Hãy tự xử lý trường hợp `fromIndex >= totalElements`.

## Tự trả lời

1. Page 0 là trang thứ mấy với người dùng?
2. Vì sao cần sort ổn định trước khi phân trang?
3. Vì sao lấy toàn bộ database rồi cắt trong Service không phải pagination thật?
4. Sang M1-3, việc LIMIT/OFFSET sẽ xảy ra ở đâu?

## Hoàn thành

- [ ] Ba trang có số phần tử đúng.
- [ ] Metadata đúng.
- [ ] Size không hợp lệ bị từ chối.
- [ ] Không có lỗi index khi page vượt phạm vi.

Tiếp theo: [Lab 09 - Final Product CRUD](../Lab_09_Final_Product_CRUD_Trace/REQUEST.md).
