# M3-1 · Lesson 02 — Kiểm tra list contract theo luồng dữ liệu

> Bản mới 2026-11-20. LESSON: **12 câu × 5đ = 60đ**, đạt **51/60 = 85%**. Khoảng 60–90 phút, có thể chia hai buổi. Trả lời bằng lời, bảng ID, JSON hoặc code ngắn. Chấm ý nghĩa, không chấm học thuộc imports/API.

[Bài học tương ứng](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_02_PAGINATION_FILTER_SORT_CONTRACT.md). Đáp án/rubric cùng tên thêm `__DAPAN.md`; mở sau khi làm. Không cần nộp project.

## Dữ liệu và contract đủ để làm mọi câu

Trừ câu 6 có chèn dòng được nói rõ, dữ liệu không thay đổi trong lúc xử lý hoặc giữa hai request:

| id | name | price | categoryId |
|---:|---|---:|---:|
| 10 | Java Basic | 100 | 1 |
| 11 | Spring Guide | 100 | 1 |
| 12 | Mouse | 50 | 2 |
| 13 | Java Advanced | 150 | 1 |
| 14 | Pen | 20 | NULL |
| 15 | Java Notes | 80 | 2 |

Category 1/2 tồn tại; Category 999 và Product 999 không tồn tại.

| Nội dung | Policy của đề |
|---|---|
| Endpoint | GET /api/v1/products |
| page/size | Mặc định 0/20; page ≥ 0; size 1–100; trang bắt đầu 0 |
| sort | Mặc định id,asc; một cặp field,direction; field: id/name/price; direction: asc/desc |
| Tie-break | Nếu field khác id, thêm id ASC dù field chính asc hay desc |
| categoryId | Optional; nếu có thì số nguyên dương |
| keyword | Optional; trim; blank coi như không lọc; name chứa keyword không phân biệt hoa/thường |
| minPrice/maxPrice | Optional; ≥ 0; min ≤ max nếu đủ hai; lấy cả giá bằng mốc |
| Nhiều filter | Tất cả kết hợp AND |
| Input không hợp lệ | 400; sai kiểu bind dừng trước Controller method; sai range/format do code kiểm |
| List không khớp hoặc page vượt cuối | 200; không ép trang cuối; giữ số page yêu cầu |
| Nested /categories/{id}/products | Parent không tồn tại → 404 theo policy |
| Response | PageResponse top-level: content chứa ProductResponse(id/name/price/categoryId); page,size,totalElements,totalPages |

totalElements đếm Product khớp filter trên toàn tập; totalPages = ceil(totalElements/size), tổng 0 thì 0 trang. Mỗi câu độc lập. Không có param lặp; keyword không có wildcard đặc biệt. Không cần Specification/locking/ProblemDetail.

---

## Câu 1 — Đọc và normalize request (5đ)

```http
GET /api/v1/products?keyword=%20%20JAVA%20%20
```

`%20` là space sau decode. Không có param khác.

1. Nêu page và size có hiệu lực. **(1đ)**
2. Nêu sort có hiệu lực. **(1đ)**
3. Sau trim, keyword là gì; tìm có phân biệt hoa/thường không? **(1đ)**
4. Category/min/max không có thì có tự áp giá trị 0 không? Nêu nghĩa đúng. **(1đ)**
5. Keyword chỉ chứa space sau decode thì có lọc tên rỗng hay coi như không lọc? **(1đ)**

**Trả lời:**

---

## Câu 2 — Trace filter, sort, page đầu (5đ)

```http
GET /api/v1/products?categoryId=1&minPrice=100&page=0&size=2&sort=price,asc
```

1. Nêu ID khớp filter và thứ tự sau sort/tie-break. **(1đ)**
2. Offset và ID trong content theo đúng thứ tự? **(1đ)**
3. totalElements và totalPages? **(1đ)**
4. Nêu HTTP status và body đủ năm field của PageResponse. Có thể dùng contentIds thay object nếu ghi rõ đó là viết tắt của content DTO. **(2đ)**

**Trả lời:**

---

## Câu 3 — Trang cuối, trang vượt cuối (5đ)

Giữ nguyên filter/sort/size câu 2; xét riêng page 1 và page 2.

1. Page 1: content ID, page, size, totalElements, totalPages là gì? **(2đ)**
2. Page 2: HTTP status và năm field trên là gì? **(2đ)**
3. Vì sao không lấy content.size() làm totalElements, cũng không đổi size thành số dòng thực trả? **(1đ)**

**Trả lời:**

---

## Câu 4 — Hai filter cùng tồn tại (5đ)

```http
GET /api/v1/products?categoryId=1&keyword=java&page=0&size=20&sort=id,asc
```

Code hiện tại:

```java
if (categoryId != null) {
    return repository.findByCategoryId(categoryId, pageable);
} else if (keyword != null && !keyword.isBlank()) {
    return repository.searchByName(keyword, pageable);
}
return repository.findAll(pageable);
```

Các method trên chỉ lọc điều kiện có trong tên; không ngầm áp filter khác.

1. Code trả ID nào và bỏ điều kiện nào? **(2đ)**
2. Đúng contract phải trả ID nào và tổng bao nhiêu Product? **(1đ)**
3. Sửa bằng lời/pseudocode để content và count cùng đúng. Vì sao không chỉ lấy hai trang riêng rồi ghép? Không cần syntax Specification. **(2đ)**

**Trả lời:**

---

## Câu 5 — Lấy trang trước rồi mới lọc (5đ)

Request categoryId=2, page=0, size=2, sort=id,asc. Implementation làm:

```text
1. Sắp toàn bộ ID theo id ASC: 10,11,12,13,14,15
2. Lấy page 0 size 2 từ danh sách đó
3. Chỉ giữ Product categoryId=2 trong phần đã lấy
```

1. Kết quả sai của implementation trên là gì? **(1đ)**
2. ID và totalElements đúng phải là gì? **(1đ)**
3. Nêu thứ tự logic đúng filter/sort/page và vì sao tránh bỏ mất kết quả. **(2đ)**
4. Với DB lớn, nên query filter/page tại Repository/DB hay load toàn bộ về Service rồi cắt Java? Nêu một lý do. **(1đ)**

**Trả lời:**

---

## Câu 6 — Thứ tự rõ không có nghĩa cùng snapshot (5đ)

1. Trên dữ liệu tĩnh, sort=price,desc cho thứ tự ID nào theo policy tie-break? Vì sao chỉ sort price chưa phân định đủ? **(2đ)**
2. Tình huống riêng: không filter, sort id ASC, size 2. Page 0 được lấy khi dữ liệu là 10,11,12,13,14,15. Sau đó DB có thêm Product id=9, rồi client lấy page 1. Giả định id9 đã được chèn hợp lệ, không hỏi identity sinh số thế nào. Page 0 và page 1 chứa ID nào, ID nào lặp? **(2đ)**
3. Vì sao tie-break unique không tự ngăn hiện tượng ở ý 2? Không cần giải pháp cursor/lock. **(1đ)**

**Trả lời:**

---

## Câu 7 — Bind kiểu và kiểm range khác nhau (5đ)

Controller dùng @RequestParam bind page/size sang int, categoryId sang Long, giá sang BigDecimal; sau bind có code kiểm đúng bảng policy. Handler trả 400 cho lỗi tương ứng. Không cấu hình tự sửa/cap input sai.

Mỗi input độc lập: nêu **status và lý do/bước bị chặn**, điểm từng dòng bên dưới. Không cần tên exception chính xác.

| Input | Điểm | Trả lời |
|---|---:|---|
| page=abc | 1 | |
| page=-1 | 1 | |
| size=101 | 0,5 | |
| size=0 | 0,5 | |
| categoryId=0 | 0,5 | |
| minPrice=-1 | 0,5 | |
| minPrice=150&maxPrice=100 | 1 | |

**Trả lời:**

---

## Câu 8 — Sort allowlist và điều framework không tự biết (5đ)

Helper checkedPage trong bài học kiểm đúng một cặp, allowlist và direction rồi tạo PageRequest. Các input độc lập:

1. sort=price,sideways: trả gì, vì sao? **(1đ)**
2. sort=secretCost,asc: trả gì, vì sao? **(1đ)**
3. sort=price,asc,id,desc: trả gì, vì sao? **(1đ)**
4. Chỉ nhận Pageable có chứng minh API đã enforce size ≤ 100 và allowlist này chưa? Cần kiểm/cấu hình gì ở mức ý nghĩa? **(1đ)**
5. Có kết luận mọi sort field lạ trong Spring Data đều là SQL injection không? Chỉ nhận diện giới hạn, không viết exploit. **(1đ)**

**Trả lời:**

---

## Câu 9 — Sửa PageResponse từ kết quả Repository (5đ)

Repository **đã query đúng**, trả Page<Product>:

```text
content: chỉ Product13
number: 1; size: 2; totalElements: 3; totalPages: 2
```

ProductResponse là class DTO có id/name/price/categoryId. Code Service đang sai:

```java
return PageResponse.builder()
        .content(page.getContent())
        .page(page.getNumber())
        .size(page.getContent().size())
        .totalElements(page.getContent().size())
        .totalPages(1)
        .build();
```

1. Nêu cách đổi content thành DTO, không trả entity. Không cần getter từng field. **(1đ)**
2. Sửa nguồn của size,totalElements,totalPages và ghi giá trị đúng. **(2đ)**
3. Mapping một Product → một DTO có cần đổi page/total không? Vì sao? **(1đ)**
4. Vì sao dùng DTO page ổn định thay vì coi JSON tự serialize PageImpl là contract bất biến? **(1đ)**

**Trả lời:**

---

## Câu 10 — Count đếm cái gì? (5đ)

Query content áp categoryId=1 AND price≥100. Count bug lại là `SELECT COUNT(*) FROM products;`. Dùng dataset đầu bài, không có JOIN ở ý 1/2.

1. Count bug là bao nhiêu, total đúng là bao nhiêu? **(1đ)**
2. Viết nghĩa điều kiện count đúng. Có áp LIMIT/OFFSET của trang lên count không? **(2đ)**
3. Tình huống độc lập: JOIN trả các Product ID 10,10,13. API công bố đếm số Product khác nhau. Total đúng bao nhiêu, vì sao không lấy số JOIN rows? **(1đ)**
4. Chỉ sửa total JSON bằng số ước đoán nhưng để query content/count sai thì đã sửa gốc chưa? Nêu hướng sửa đúng nghĩa, không viết fetch join. **(1đ)**

**Trả lời:**

---

## Câu 11 — Filter không khớp, parent không có, trang vượt cuối (5đ)

Các request độc lập, param đều đúng kiểu/range:

1. GET /api/v1/products?categoryId=999&page=0&size=2: status,content,totalElements,totalPages? **(2đ)**
2. GET /api/v1/categories/999/products: status và lý do theo policy parent? **(1đ)**
3. GET /api/v1/products?page=999&size=2&sort=id,asc: status,content,totalElements,totalPages và page có bị đổi thành trang cuối không? **(2đ)**

Không hỏi error body schema. Đừng dùng policy parent cho filter tự do ở ý 1.

**Trả lời:**

---

## Câu 12 — Kể luồng một request list hợp lệ (5đ)

```http
GET /api/v1/products?categoryId=2&page=0&size=2&sort=id,asc
```

Controller/Service đã inject đúng. Repository thực hiện filter/sort/page/count tại DB; entity có getter cần thiết; không phát sinh lỗi DB/lazy.

Kể ngắn luồng theo **năm bước, mỗi bước 1đ**:

1. Query string được đưa vào Java param thế nào; kiểm input ở đâu?
2. Service truyền điều kiện và yêu cầu trang gì xuống Repository?
3. Repository trả content ID và totalElements/totalPages nào?
4. Service biến kết quả thành DTO response gì; có lọc thêm trong mapper không?
5. Controller trả status/body gì; object thành JSON ở bước nào?

Không cần kể FilterChain/HandlerAdapter hoặc viết cả project.

**Trả lời:**

---

Chấm riêng 60đ, không cộng điểm Lesson 01. Đề cũ 2026-10-07 giữ làm lịch sử, không bắt làm cả hai. Khi nộp, chỉ rõ bản lesson2-lan2 này; mỗi lần chấm đều lưu snapshot nhận xét từng câu.
