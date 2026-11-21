# M3-1 · Lesson 02 — Kiểm tra list contract theo luồng dữ liệu

> Bản tạo 2026-11-20, **viết rõ lại ngày 2026-11-21**. Vẫn **12 câu × 5đ = 60đ**, đạt **51/60 = 85%**. Chỉ đổi cách hỏi, không thêm kiến thức hoặc tăng độ khó. Có thể chia hai buổi, tổng khoảng 60–90 phút.

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

### Đọc các từ trong câu hỏi như sau

- **Filter:** chọn những Product thỏa điều kiện.
- **Sort:** sắp xếp các Product đã chọn.
- **Tie-break:** khi hai Product bằng nhau ở field đang sort, dùng id ASC để quyết định ai đứng trước.
- **Offset:** số dòng bỏ qua trước khi lấy trang, bằng page×size.
- **Content:** các Product thực sự có trong trang đang trả.
- **Metadata:** page, size, totalElements, totalPages; không phải một loại object bí mật khác.
- **Policy/contract:** quy ước của đề trong bảng trên. Hỏi “theo policy” nghĩa là dùng bảng này, không đoán mặc định của Spring.

**Cách trả lời:** đánh số theo từng ý; câu tính dữ liệu chỉ cần ID/số/JSON được yêu cầu. Chỉ viết lý do khi câu có hỏi vì sao. Không cần viết văn dài hoặc code cả project. Bảng dữ liệu đầu đề được dùng cho mọi câu, trừ tình huống riêng đã ghi rõ.

---

## Câu 1 — Client không gửi đủ param: server dùng giá trị nào? (5đ)

```http
GET /api/v1/products?keyword=%20%20JAVA%20%20
```

Sau khi đọc URL, server nhận keyword là chuỗi `"  JAVA  "` có hai space mỗi đầu. Client không gửi page, size, sort, categoryId, minPrice hoặc maxPrice.

1. Dựa vào default trong bảng, điền `page = ...`, `size = ...`. **(1đ)**
2. Điền `sắp theo field ...`, `chiều asc hay desc ...`. **(1đ)**
3. Sau trim, chuỗi keyword còn lại là gì? Tên Product chứa `java` viết thường có được xem là khớp không? **(1đ)**
4. Không truyền categoryId/minPrice/maxPrice nghĩa là **không áp ba điều kiện đó**, hay server phải tự lọc categoryId=0 và price=0? Chọn và giải thích một câu. **(1đ)**
5. Tình huống riêng: nếu keyword chỉ là `"    "`, server phải tìm tên rỗng hay bỏ điều kiện keyword? **(1đ)**

**Trả lời:**
1. Page0,size20:
2. Sort id ASC: 
3. Keyword JAVA sau trim; tên chứa java viết thường vẫn khớp vì không phân biệt hoa/thường: 
4. Không tự áp 0; không truyền filter đó nghĩa là không hạn chế theo nó: 
5. Blank sau trim nghĩa là không lọc keyword: 
---

## Câu 2 — Tính kết quả của một URL cụ thể (5đ)

```http
GET /api/v1/products?categoryId=1&minPrice=100&page=0&size=2&sort=price,asc
```

Chỉ xét request này trên bảng sáu Product đầu đề. Bạn cần trả lời theo bốn bước:

1. Trước khi lấy trang, Product nào thỏa **đồng thời categoryId=1 và price≥100**? Liệt kê ID, rồi viết lại các ID theo thứ tự price ASC, bằng giá thì id ASC. **(1đ)**
2. Tính `offset = page×size`. Sau khi bỏ qua offset dòng và lấy tối đa size dòng, content gồm ID nào theo thứ tự? **(1đ)**
3. Đếm toàn bộ Product khớp ở bước1 để điền totalElements; tính totalPages. **(1đ)**
4. Viết status HTTP và một JSON gồm content,page,size,totalElements,totalPages. Được dùng `"contentIds":[...]` thay danh sách DTO để đỡ gõ; ghi rõ đây là cách viết tắt, không phải đổi schema API. **(2đ)**

**Trả lời:**

---

## Câu 3 — Trang cuối, trang vượt cuối (5đ)

Hai request độc lập dưới đây đều dùng bảng dữ liệu đầu đề, không cần dựa vào câu trả lời câu2:

```http
GET /api/v1/products?categoryId=1&minPrice=100&page=1&size=2&sort=price,asc
GET /api/v1/products?categoryId=1&minPrice=100&page=2&size=2&sort=price,asc
```

1. Với URL page=1, điền `contentIds=...; page=...; size=...; totalElements=...; totalPages=...`. **(2đ)**
2. Với URL page=2, điền lại năm giá trị trên và thêm `HTTP status=...`. Không tự đổi sang page khác. **(2đ)**
3. Giải thích hai điều: totalElements đếm cả tập lọc hay chỉ trang hiện tại? Size là số dòng tối đa được yêu cầu hay số dòng thực có trong content? **(1đ)**

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

1. Với URL đã cho, nhánh nào của if/else chạy? Keyword còn được kiểm không? Liệt kê các ID mà **code hiện tại** trả về. **(2đ)**
2. Nếu làm đúng yêu cầu “thuộc Category1 **và** tên chứa java”, ID nào được trả và totalElements bằng bao nhiêu? **(1đ)**
3. Mô tả cách sửa: hai điều kiện cần kết hợp trước hay sau khi lấy trang? Phần đếm tổng phải dùng những điều kiện nào? Nếu gọi hai method riêng rồi ghép kết quả hai trang, tại sao chưa bảo đảm đúng yêu cầu AND? Không cần viết query/Specification. **(2đ)**

**Trả lời:**

---

## Câu 5 — Lấy trang trước rồi mới lọc (5đ)

Request categoryId=2, page=0, size=2, sort=id,asc. Implementation làm:

```text
1. Sắp toàn bộ ID theo id ASC: 10,11,12,13,14,15
2. Lấy page 0 size 2 từ danh sách đó
3. Chỉ giữ Product categoryId=2 trong phần đã lấy
```

1. Thực hiện đúng ba bước sai ở trên: sau bước3 còn ID nào? Nếu không có thì viết `[]`. **(1đ)**
2. Bỏ implementation sai, tính lại theo contract: content đúng gồm ID nào, totalElements đúng là bao nhiêu? **(1đ)**
3. Sắp xếp ba việc **lọc / sắp thứ tự / lấy trang** theo thứ tự logic đúng. Vì sao lấy trang từ toàn bảng rồi mới lọc có thể làm mất Product phù hợp? **(2đ)**
4. Khi DB có rất nhiều dòng, chọn một cách và nêu lý do: cho DB lọc/lấy trang qua Repository, hay tải cả bảng về Service để lọc bằng Java? **(1đ)**

**Trả lời:**

---

## Câu 6 — Bằng giá thì xếp ai trước? Có chèn dòng thì trang thay đổi sao? (5đ)

Hai tình huống **khác nhau**, không lấy sort của tình huống1 dùng cho tình huống2:

1. **Không có ai sửa dữ liệu:** sắp cả sáu Product theo price DESC; nếu bằng giá dùng id ASC. Liệt kê đủ sáu ID theo thứ tự. Chỉ ra hai Product nào bằng giá, và vì sao chỉ ORDER BY price chưa quyết định ai đứng trước trong cặp đó. **(2đ)**
2. **Có người chèn dòng:** không lọc; sort theo id ASC; size=2. Client lấy page0 khi dãy ID là `10,11,12,13,14,15`. Sau đó DB có thêm id9 hợp lệ, dãy thành `9,10,11,12,13,14,15`; client mới lấy page1. Điền `page0 đã nhận=[...]; page1 nhận=[...]; ID bị nhận lặp=...`. Không hỏi cơ chế sinh id9. **(2đ)**
3. Ở tình huống2, id đã unique và có thứ tự rõ. Vì sao client vẫn có thể nhận lại một ID khi chuyển trang? Chỉ giải thích việc vị trí dòng đổi do chèn, không cần giải pháp cursor/lock. **(1đ)**

**Trả lời:**

---

## Câu 7 — Bind kiểu và kiểm range khác nhau (5đ)

Controller dùng @RequestParam bind page/size sang int, categoryId sang Long, giá sang BigDecimal; sau bind có code kiểm đúng bảng policy. Handler trả 400 cho lỗi tương ứng. Không cấu hình tự sửa/cap input sai.

Mỗi input là một request riêng; các param không ghi đều hợp lệ. Với từng dòng, viết:

- HTTP status.
- Giá trị sai quy tắc nào.
- Lỗi xảy ra **khi đổi chuỗi sang kiểu Java, trước Controller method**, hay **sau khi đổi kiểu được, lúc code kiểm giới hạn**.

Không cần nhớ tên exception. Dòng1đ: status0,5 + lý do/bước0,5; dòng0,5đ: mỗi phần0,25.

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

Đề này chỉ cho sort theo id/name/price, chiều asc/desc và đúng một cặp `field,direction`. Helper checkedPage kiểm ba điều đó rồi mới tạo PageRequest. Các input độc lập:

1. Client gửi `sort=price,sideways`. Nêu HTTP status và phần không hợp lệ: tên field, chiều, hay số phần? **(1đ)**
2. Client gửi `sort=secretCost,asc`. Nêu HTTP status và phần không hợp lệ. **(1đ)**
3. Client gửi `sort=price,asc,id,desc`. Nêu HTTP status và quy tắc một cặp bị vi phạm thế nào. **(1đ)**
4. Đồng đội chỉ viết Controller nhận `Pageable pageable`, không cho bạn xem validator/cấu hình. Từ dòng đó có thể khẳng định size>100 và field ngoài danh sách chắc chắn bị trả400 chưa? Nêu việc còn cần kiểm, không cần code. **(1đ)**
5. Đồng đội nói “cứ field ngoài danh sách là đã chứng minh có SQL injection”. Bạn đồng ý không? Phân biệt **vi phạm danh sách sort được công bố** với **lỗ hổng phụ thuộc cách tạo query**. Không cần ví dụ tấn công. **(1đ)**

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

1. Dòng `.content(page.getContent())` đang lấy entity. Bạn sẽ chuyển mỗi Product thành kiểu gì trước khi đưa vào content? Mô tả cách map hoặc viết code ngắn, không cần getter từng field. **(1đ)**
2. Với ba dòng size/totalElements/totalPages, mỗi dòng hãy ghi **lấy từ thông tin nào của Page** và **giá trị cụ thể theo dữ kiện**. Không cần nhớ chính xác tên getter nếu mô tả rõ nguồn. **(2đ)**
3. Giả sử mỗi entity đổi thành đúng một DTO, không bỏ/thêm dòng: có phải tính lại page/total không? Vì sao? **(1đ)**
4. Frontend cần năm field PageResponse đã công bố. Vì sao tự quản lý DTO này giúp kiểm soát response khi nâng Spring Data, thay vì hứa JSON nội bộ PageImpl sẽ không bao giờ đổi? **(1đ)**

**Trả lời:**

---

## Câu 10 — Count đếm cái gì? (5đ)

Request cần Product thuộc Category1 và giá≥100. Query lấy content đã áp cả hai điều kiện. Nhưng query đếm tổng lại là:

```sql
SELECT COUNT(*) FROM products;
```

Dùng bảng sáu Product đầu đề; không có JOIN ở ý1/2.

1. Query COUNT(*) trên đang trả số nào? Nếu chỉ đếm Product đúng hai điều kiện của request thì phải là số nào? **(1đ)**
2. Nêu điều kiện WHERE cần dùng cho query đếm, bằng lời hoặc SQL. Query đếm tổng có chỉ đếm các dòng của trang hiện tại bằng LIMIT/OFFSET không? **(2đ)**
3. Tình huống riêng: kết quả JOIN có ba dòng mang Product ID `10,10,13`. API đếm **Product khác nhau**, không đếm dòng JOIN. TotalElements cần là bao nhiêu? Giải thích cách đếm. **(1đ)**
4. Một bạn sửa số totalElements trong JSON bằng tay nhưng không sửa query. Cách đó có bảo đảm đúng các filter/request khác không? Nêu cần sửa điều gì ở query để total tự đúng theo dữ liệu. **(1đ)**

**Trả lời:**

---

## Câu 11 — Filter không khớp, parent không có, trang vượt cuối (5đ)

Các request độc lập, param đều đúng kiểu/range. Dùng bảng sáu dòng; Category999 không tồn tại. Điền kết quả cho từng request, không cần viết DTO từng Product:

1. `GET /api/v1/products?categoryId=999&page=0&size=2`: điền `status=...; content=...; totalElements=...; totalPages=...`. Ở đây categoryId chỉ là **điều kiện lọc Product**. **(2đ)**
2. `GET /api/v1/categories/999/products`: đây là danh sách nằm dưới **parent Category999**. Theo policy đầu đề, status gì và tại sao? **(1đ)**
3. `GET /api/v1/products?page=999&size=2&sort=id,asc`: không có filter, chỉ yêu cầu trang rất xa. Điền status,content,totalElements,totalPages và page trong response. Có tự đổi page999 về trang cuối không? **(2đ)**

Không hỏi error body schema. Đừng dùng policy parent cho filter tự do ở ý 1.

**Trả lời:**

---

## Câu 12 — Kể luồng một request list hợp lệ (5đ)

```http
GET /api/v1/products?categoryId=2&page=0&size=2&sort=id,asc
```

Controller/Service đã inject đúng. Repository thực hiện filter/sort/page/count tại DB; entity có getter cần thiết; không phát sinh lỗi DB/lazy.

Không hỏi bạn học thuộc tên các thành phần nội bộ Spring. Chỉ cần giải thích **dữ liệu đi qua năm bước nào**, mỗi bước1đ:

1. **Đầu vào Controller:** ai đổi chuỗi categoryId/page/size thành số Java? Code có kiểm range/sort trước khi query không?
2. **Service gọi Repository:** ghi categoryId, page, size và thứ tự sort cần truyền xuống; không cần viết method signature.
3. **Repository trả kết quả:** tính content ID, totalElements và totalPages từ bảng đầu đề cho đúng URL này.
4. **Service dựng response:** entity trong content được đổi thành class DTO nào và được chứa trong object page nào? Có lọc bỏ thêm dòng trong mapper không?
5. **Trả client:** nêu status thành công, kiểu body theo contract; ai chuyển object Java thành JSON trước khi gửi? Chỉ cần nói cơ chế serializer của Spring, không cần tên class nội bộ.

Không cần kể FilterChain/HandlerAdapter hoặc viết cả project.

**Trả lời:**

---

Chấm riêng 60đ, không cộng điểm Lesson 01. Đề cũ 2026-10-07 giữ làm lịch sử, không bắt làm cả hai. Khi nộp, chỉ rõ bản lesson2-lan2 này; mỗi lần chấm đều lưu snapshot nhận xét từng câu.

Bản ngày2026-11-21 chỉ viết lại câu chữ cho rõ. Bản trước chỉnh được lưu trong thư mục archive; dữ liệu,12câu,60đ và phạm vi kiến thức giữ nguyên.
