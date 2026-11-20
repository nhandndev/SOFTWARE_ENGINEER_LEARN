# M3-1 — Lesson02: Pagination, filter, sort và DTO contract

> Mục tiêu: đọc một URL list và dự đoán chính xác content/metadata, biết validate input ở đâu và không để client phụ thuộc JSON nội bộ của framework.

## Tài liệu / video

- [Spring Data web và biểu diễn Page ổn định](https://docs.spring.io/spring-data/commons/reference/repositories/core-extensions.html): đọc Web support và page serialization; không học Querydsl ở đây.
- [Spring MVC @RequestParam](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestparam.html): binding query string sang tham số.
- [Spring Data Page API](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html): xem map/totalElements/totalPages khi quên tên method.
- Video tìm thêm: `Spring Boot pagination sorting filtering DTO PageResponse stable ordering`. Không cần học cursor implementation hoặc tool benchmark trong lesson này.

## 1. Thống nhất một list contract trước khi code

Quy ước shopcore **trong bài này**, không phải chuẩn HTTP bắt mọi API làm vậy:

```http
GET /api/v1/products?categoryId=1&minPrice=100&page=0&size=2&sort=price,asc
```

| Tham số | Quy ước |
|---|---|
| page | Mặc định0, từ0 trở lên |
| size | Mặc định20, từ1 đến100 |
| sort | Một cặp field,direction; field id/name/price; asc/desc; mặc định id,asc |
| categoryId | Optional; nếu có phải là số nguyên dương |
| minPrice/maxPrice | Optional, không âm; nếu cùng có thì min≤max |
| keyword | Optional; trim; rỗng sau trim nghĩa là không lọc keyword |

Tất cả filter có mặt được kết hợp **AND**. Nếu muốn OR phải có contract riêng, không để thứ tự if/else vô tình quyết định. Nhận field sort khác hoặc direction không hợp lệ thì400 theo policy bài; không âm thầm ignore.

Chọn convention giúp frontend không phải nhớ endpoint Products page0, Categories page1. Không lấy default của thư viện làm public contract mà không kiểm behavior thực tế.

## 2. Tự tính với dữ liệu nhỏ

Dataset tĩnh, không có update xen giữa:

| id | name | price | categoryId |
|---|---|---|---|
| 10 | Java | 100 | 1 |
| 11 | Spring | 100 | 1 |
| 12 | Mouse | 50 | 2 |
| 13 | SQL | 150 | 1 |
| 14 | Pen | 20 | NULL |

Với URL trên:

1. Lọc categoryId=1 và price≥100 → IDs10,11,13.
2. Sort price ASC, thêm id ASC làm tie-break →10,11,13.
3. Page0 size2, offset=0×2=0 →10,11.
4. totalElements=3; totalPages=ceil(3/2)=2.

Page1 giữ filter/sort/size →13. Page2 →content rỗng nhưng totalElements vẫn3 và totalPages vẫn2. Đừng thay total bằng content.size.

**Vì sao filter trước page?** Nếu cắt page trước rồi mới lọc, bạn chỉ lọc lát dữ liệu tình cờ lấy được, bỏ sót kết quả ở phần khác và đếm tổng sai.

## 3. Sort ổn định không có nghĩa đóng băng database

Java/Spring cùng price100. Nếu chỉ ORDER BY price, thứ tự hai dòng bằng giá không được xác định đầy đủ. Thêm id unique làm tie-break: `ORDER BY price ASC, id ASC`.

Nếu price DESC, bài vẫn chọn id ASC khi cùng giá; quy ước phải rõ, không mặc định “desc là mọi cột đều desc”.

Tie-break giúp deterministic order **khi dataset không đổi**. Giữa hai request page0/page1, dòng mới được chèn phía trước có thể làm offset pagination lặp/bỏ sót item. Nó không cung cấp snapshot. Cursor/keyset là hướng khác khi cần duyệt dữ liệu thay đổi lớn; chỉ nhận diện, không yêu cầu code ở đây.

## 4. Ràng buộc input phải được thực thi thật

Luồng:

```text
Query string
→ Spring bind String sang int/Long/BigDecimal
→ Kiểm khoảng giá trị và convention
→ Tạo Pageable/criteria đã kiểm
→ Service phối hợp truy vấn
→ Repository query filter + sort + page ở DB
→ Service map DTO và metadata
→ Controller trả200
```

`page=abc` thất bại lúc convert sang int, trước Controller method. `page=-1` convert được nhưng sai convention, cần code kiểm range hoặc validation thích hợp. Bài dùng kiểm tường minh, không giả định chỉ thêm Pageable là tất cả input sai đều tự bị trả400; resolver/framework có thể normalize/cap theo cấu hình.

Ví dụ helper minh họa dùng ErrorCode hiện có; cần Spring Data dependency khi thực hành, chưa được tự cài vào shopcore:

```java
private Pageable checkedPage(int page, int size, String sort) {
    if (page < 0 || size < 1 || size > 100) {
        throw new AppException(ErrorCode.INVALID_PARAMETER);
    }
    String[] parts = sort.split(",", -1);
    if (parts.length != 2) {
        throw new AppException(ErrorCode.INVALID_PARAMETER);
    }
    String field = parts[0].trim();
    String direction = parts[1].trim();
    if (!Set.of("id", "name", "price").contains(field)
            || !(direction.equals("asc") || direction.equals("desc"))) {
        throw new AppException(ErrorCode.INVALID_PARAMETER);
    }
    Sort selected = Sort.by(
            direction.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC,
            field);
    if (!field.equals("id")) {
        selected = selected.and(Sort.by("id").ascending());
    }
    return PageRequest.of(page, size, selected);
}
```

Method nhận sort không null vì Controller dùng default `id,asc`. Đây là convention đơn giản một sort field public; không nhận lặp nhiều sort parameter trong bài. Allowlist kiểm contract và hạn chế tùy tiện lộ field nội bộ; không khẳng định mọi unknown Sort property tự động là SQL injection. Không nối raw query input vào SQL.

## 5. Filter là điều kiện truy vấn, không phải nhánh loại trừ nhau

Bug quen thuộc:

```java
if (categoryId != null) {
    return findByCategory(categoryId, pageable);
} else if (keyword != null && !keyword.isBlank()) {
    return searchByName(keyword, pageable);
}
```

Nếu có cả categoryId và keyword thì keyword bị bỏ. Cần query cùng thỏa cả hai, ví dụ query có điều kiện optional, Specification hoặc các method cho tổ hợp được hỗ trợ. Không bắt dùng Specification ở bài này.

Phác thảo nghĩa query:

```text
(không có categoryId OR product.categoryId = categoryId)
AND (không có keyword OR product.name chứa keyword)
AND (không có minPrice OR product.price >= minPrice)
AND (không có maxPrice OR product.price <= maxPrice)
```

Bài chọn name chứa keyword không phân biệt hoa/thường; phải thống nhất tương tự ở count. Query input bind parameter, không string-concatenate. Nếu keyword có wildcard `%`/`_`, khi dùng LIKE phải chọn escape để “chứa chuỗi literal” hoặc công bố nghĩa wildcard; đề chỉ dùng keyword chữ thường không có wildcard.

## 6. Response của mình, không phải ảnh chụp PageImpl

```json
{
  "content": [
    {"id":10,"name":"Java","price":100,"categoryId":1},
    {"id":11,"name":"Spring","price":100,"categoryId":1}
  ],
  "page":0,
  "size":2,
  "totalElements":3,
  "totalPages":2
}
```

PageResponse class trong common của bạn đã có đúng nhóm field này. Content chứa ProductResponse DTO class, không entity/proxy. Service có thể dùng `Page.map(mapper)` rồi lấy content/page/size/total để dựng PageResponse. Đừng serialize PageImpl trực tiếp rồi coi mọi field JSON nội bộ sẽ luôn ổn định qua nâng phiên bản.

`totalElements` đếm **Product khớp filter trên tất cả trang**. Count query phải cùng nghĩa filter content. Không đếm toàn bảng rồi bọc PageResponse để “sửa” metadata; không đếm số JOIN rows thay số root nếu query nhân dòng. M2-4 dạy cách tránh collection fetch paging; ở đây tập trung nghĩa hợp đồng với client.

Bạn có thể bọc success bằng ApiResponse nếu dự án thống nhất, nhưng JSON mẫu bài này để PageResponse ở top-level. Không endpoint thì top-level content, endpoint thì data.items mà không công bố. Error sẽ dùng ProblemDetail riêng ở Lesson03.

## 7. Empty list khác resource không tồn tại

Policy chọn cho bài:

- `GET /api/v1/products/999` không có Product999 →404.
- `GET /api/v1/products?categoryId=999` valid filter nhưng không khớp →200 page rỗng, total0.
- `GET /api/v1/categories/999/products` coi Category999 là parent resource; nếu parent không có →404.

Đây là quyết định contract. Bài cũ có thể từng chọn kiểm category existence ngay trong filter; không phải mọi cách khác đều sai HTTP. Khi chuyển sang policy này phải ghi rõ và xét client, không đổi lén behavior v1.

## 8. Liên hệ backend phục vụ AI

Tải danh sách document để index vào RAG cần không bỏ sót dữ liệu và metadata đúng. Một API “chạy được” nhưng filter bị ignore hoặc thứ tự page không xác định có thể làm downstream lấy sai dữ liệu. Không cần học ML để kiểm các lỗi này.

## 9. Tự kiểm tra

Tự tính URL page1/size2 với dataset trên; giải thích page2 rỗng tại sao total3. Chỉ ra một input bind sai và một input bind đúng nhưng range sai. Sau đó làm [đề Lesson02](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-10-07__lesson2-lan1.md).
