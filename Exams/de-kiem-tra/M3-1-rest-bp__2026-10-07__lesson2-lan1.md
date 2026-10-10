# M3-1 REST best practices — Kiểm tra Lesson02

> LESSON: 8×5=40đ, normalize/40×100; đạt từ34/40. Không cần chạy DB. Tình huống độc lập, chấm đầy đủ ý nhưng không bắt thuộc API. Đáp án riêng __DAPAN.md.

## Dữ kiện và contract

| id | name | price | categoryId |
|---|---|---|---|
| 10 | Java | 100 | 1 |
| 11 | Spring | 100 | 1 |
| 12 | Mouse | 50 | 2 |
| 13 | SQL | 150 | 1 |
| 14 | Pen | 20 | NULL |

Dataset không đổi trừ câu3 nói khác. Page từ0, size1–100; default page0/size20. Filter có mặt kết hợp AND; keyword trim, chứa name không phân biệt hoa/thường; keyword blank là bỏ lọc. Sort chỉ một cặp field,direction với field id/name/price, asc/desc; mặc định id,asc; nếu field khác id thêm tie-break id ASC. Input vi phạm trả400. Filter hợp lệ không khớp trả200 page rỗng; detail thiếu trả404. Success là PageResponse top-level có content/page/size/totalElements/totalPages.

## Câu 1 (5đ) — Tính một trang

GET `/api/v1/products?categoryId=1&minPrice=100&page=0&size=2&sort=price,asc`. Nêu ID đúng thứ tự trong content, page/size/totalElements/totalPages. Giải thích thứ tự filter → sort → page.

**Trả lời:**

## Câu 2 (5đ) — Trang cuối và vượt cuối

Giữ nguyên query câu1 nhưng lần lượt page1 và page2. Content mỗi trang có ID nào, totalElements/totalPages là gì? Có được đặt total bằng content.size hoặc trả404 chỉ vì page2 rỗng không?

**Trả lời:**

## Câu 3 (5đ) — Sort ổn định nhưng dữ liệu thay đổi

Vì sao chỉ sort price ASC chưa xác định đầy đủ thứ tự Java/Spring? Sửa sort thế nào? Sau request page0 có Product mới chèn phía trước, request page1 bằng offset có còn được bảo đảm không lặp/bỏ sót không? Nhận diện một hướng khác, không cần code.

**Trả lời:**

## Câu 4 (5đ) — Bind khác range validation

Với Controller nhận int page/size và kiểm range tường minh, lần lượt `page=abc`, `page=-1`, `size=0`, `size=101` sai ở bước nào và nên trả status gì? Chỉ thêm Pageable có tự chứng minh mọi request này sẽ400 theo contract không?

**Trả lời:**

## Câu 5 (5đ) — Hai filter nhưng chỉ một chạy

Query categoryId=1, keyword=Spring, page0/size20. Code:

```java
if (categoryId != null) {
    return repository.findByCategory(categoryId, pageable);
} else if (keyword != null && !keyword.isBlank()) {
    return repository.searchByName(keyword, pageable);
}
return repository.findAll(pageable);
```

ID đúng theo contract là gì? Code hiện trả những ID nào? Sửa ý tưởng truy vấn để không bỏ filter, nói rõ AND/OR và keyword blank xử lý ra sao. Không cần Specification code.

**Trả lời:**

## Câu 6 (5đ) — Total và public DTO

Content filter Category1 đúng nhưng countQuery đếm cả bảng. total sai/đúng là bao nhiêu? Vì sao `PageResponse.content` nên là ProductResponse DTO class và total lấy từ count cùng nghĩa filter, không phải serialize PageImpl tùy ý hoặc content.size?

**Trả lời:**

## Câu 7 (5đ) — Allowlist và filter range

Theo contract, xử lý `sort=passwordHash,asc`, `sort=price,up`, `minPrice=200&maxPrice=100` thế nào? Nêu lý do kiểm field/direction/range. Có được kết luận mọi unknown Sort property đều là SQL injection không?

**Trả lời:**

## Câu 8 (5đ) — Empty list và missing parent

Giả định Category999 và Product999 đều không có. Chọn status và mô tả body cho: (a) GET `/api/v1/products/999`; (b) GET `/api/v1/products?categoryId=999`; (c) GET `/api/v1/categories/999/products`. Vì sao (b) khác (c) theo policy đề? Dự án cũ chọn404 cho filter Category không có thì có được âm thầm đổi behavior v1 không?

**Trả lời:**
