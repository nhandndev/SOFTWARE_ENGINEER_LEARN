# M3-1 · Lesson 02 — List API: pagination, filter, sort và DTO contract

> Viết lại 2026-11-20 sau khi bạn đạt Lesson 01: 68,5/80. Học khoảng 90–120 phút, có thể chia hai buổi. Bạn đã biết viết 3-layer; bài này giúp bạn tự dự đoán **dữ liệu và response đúng** thay vì chỉ gọi findAll(pageable).

**Học xong:** đọc URL → áp filter → xác định thứ tự → lấy trang → tính metadata → giải thích lỗi input. Không yêu cầu project mới, không mở lại phần fetch/pool của M2-4 đang tạm dừng. DTO dùng **class**, có thể dùng Lombok theo thói quen của bạn.

## 1. Vì sao biết code paging nhưng vẫn dễ làm API sai?

Frontend muốn: “Cho tôi hai Product của Category 1 có giá từ 100, rẻ trước.” Backend có thể trả 200 nhưng vẫn sai nếu:

- Bỏ keyword khi có categoryId.
- Chỉ lọc hai dòng đã lấy, thay vì lọc cả tập trước.
- Trả totalElements bằng số dòng trang hiện tại.
- Không quy định thứ tự khi hai Product bằng giá.

Ta không học thuộc thêm luồng FilterChain. Ta theo dấu **một yêu cầu list** từ query string tới content/metadata.

## 2. Hợp đồng cố định cho cả bài

```http
GET /api/v1/products?categoryId=1&minPrice=100&page=0&size=2&sort=price,asc
```

| Param | Nghĩa và policy trong bài |
|---|---|
| page | Mặc định 0; số nguyên ≥ 0; trang đầu là 0 |
| size | Mặc định 20; số nguyên 1–100; số dòng tối đa mỗi trang |
| sort | Mặc định id,asc; đúng một cặp field,direction; field: id/name/price; direction: asc/desc |
| categoryId | Không có thì không lọc; có thì số nguyên dương |
| keyword | Trim; rỗng sau trim thì không lọc; name chứa keyword, không phân biệt hoa/thường |
| minPrice/maxPrice | Không có thì không giới hạn phía đó; có thì ≥ 0; nếu đủ hai thì min ≤ max; bao gồm giá bằng mốc |

**Mọi filter có mặt kết hợp AND.** `categoryId=1&keyword=java` nghĩa là cùng lúc thuộc Category 1 **và** tên chứa java. Không phải chọn một trong hai.

Nếu sort field khác allowlist hoặc direction khác asc/desc → 400. Không tự bỏ qua, không âm thầm đổi thành mặc định. Ví dụ chỉ xét một giá trị mỗi param, không có param lặp. Bài không kiểm wildcard/collation/keyword đặc biệt; name ví dụ đơn giản. Những rule này là **contract dự án**, không phải HTTP bắt mọi API dùng page 0 hay size tối đa 100.

Response top-level là PageResponse, **không bọc ApiResponse trong ví dụ**. Nếu dự án thật bọc thêm data thì cần công bố nhất quán. Lỗi của bài chỉ cần chọn HTTP 400/404, chưa hỏi ProblemDetail của Lesson 03.

## 3. Một bảng dữ liệu xuyên suốt

Dataset tĩnh, chưa có người sửa/chèn xen giữa, trừ ví dụ mục7.

| id | name | price | categoryId |
|---:|---|---:|---:|
| 10 | Java Basic | 100 | 1 |
| 11 | Spring Guide | 100 | 1 |
| 12 | Mouse | 50 | 2 |
| 13 | Java Advanced | 150 | 1 |
| 14 | Pen | 20 | NULL |
| 15 | Java Notes | 80 | 2 |

Category 1/2 tồn tại, Category 999 không tồn tại. Product có categoryId NULL không khớp filter categoryId 1. Null ở bảng là dữ liệu, không phải một từ khóa query string.

## 4. Chạy URL qua từng bước

Với URL mục2:

**Bước 1 — Filter cả tập:** categoryId = 1 AND price ≥ 100 → id 10,11,13. Product 15 có Java trong tên nhưng không thuộc Category 1, nên không lọt vào tập này.

**Bước 2 — Sort:** price ASC; nếu bằng giá thì id ASC → 10,11,13. Ta luôn thêm id ASC khi sort theo field khác id. Sort price DESC vẫn dùng id ASC khi bằng giá → 13,10,11; không đảo mọi cột thành DESC.

**Bước 3 — Page:**

```text
offset = page × size
page 0, size 2: bỏ 0 dòng, lấy tối đa 2 → 10,11
page 1, size 2: bỏ 2 dòng, lấy tối đa 2 → 13
page 2, size 2: bỏ 4 dòng, không còn dòng → []
```

**Bước 4 — Metadata:**

```text
totalElements = số Product khớp filter trước khi cắt trang = 3
totalPages = ceil(3/2) =2
size = kích thước trang yêu cầu =2
content.size() = số dòng thực có trong trang, có thể 0, 1 hoặc 2
```

Response page 0:

```json
{
  "content": [
    {"id":10,"name":"Java Basic","price":100,"categoryId":1},
    {"id":11,"name":"Spring Guide","price":100,"categoryId":1}
  ],
  "page":0,
  "size":2,
  "totalElements":3,
  "totalPages":2
}
```

Response page 1 có content chỉ id 13 nhưng size vẫn 2, totalElements vẫn 3 và totalPages vẫn 2. Response page 2 có content=[] nhưng page vẫn 2, tổng vẫn 3/2. **Trang không có dòng không có nghĩa toàn bộ tập lọc không có dòng.** Theo policy này, page vượt cuối hợp lệ trả 200, không 404 và không tự ép về trang cuối.

Nếu filter không khớp gì: content=[], totalElements=0, totalPages=0. Với size luôn ≥ 1, tổng 0 cho 0 trang theo convention bài. Size vẫn là size yêu cầu.

## 5. Filter trước page nghĩa là gì trong code/SQL?

Đúng về ý nghĩa:

```text
Tất cả Product →lọc→sắp xếp→lấy trang→map DTO
```

SQL minh họa cho page 0 size 2:

```sql
SELECT id, name, price, category_id
FROM products
WHERE category_id = 1 AND price >= 100
ORDER BY price ASC, id ASC
LIMIT 2 OFFSET 0;
```

Không yêu cầu DB vật lý thực thi tuần tự đúng các bước trên: query planner có thể tối ưu khác; đây là **nghĩa kết quả**, không phải lịch chạy nội bộ của engine.

Bug:

```text
Sắp toàn bảng theo id: 10,11,12,13,14,15
Cắt page 0 size 2: 10,11
Sau đó lọc categoryId=2: []
```

Trong khi kết quả đúng sau lọc Category 2 là 12,15; page 0 size 2 phải có cả hai. Lọc sau page làm mất kết quả dù chúng có trong DB.

Với JPA, Repository nhận filter/Pageable và query ở DB. Không nên load cả bảng về Service rồi lọc/cắt Java cho dữ liệu production lớn. Nếu dùng kho Map để học, thao tác Java cần cùng thứ tự logic; không lấy thứ tự Map ngẫu nhiên làm contract.

## 6. Filter AND và bug if/else quen thuộc

```java
if (categoryId != null) {
    return repository.findByCategoryId(categoryId, pageable);
} else if (keyword != null && !keyword.isBlank()) {
    return repository.searchByName(keyword, pageable);
}
return repository.findAll(pageable);
```

Với categoryId=1&keyword=java: nhánh đầu chạy, keyword bị bỏ. Nó trả 10,11,13; trong khi tập đúng là 10,13. Không phải đổi if thành hai if rồi ghép hai trang là xong: phải giao các điều kiện **trước khi phân trang**, và count cùng filter.

Bạn có thể dùng method query cho tổ hợp được hỗ trợ hoặc Specification. Không bắt buộc Specification ở bài này. Ý nghĩa cần giữ:

```text
(category không truyền OR category khớp)
AND (keyword không truyền OR name chứa keyword)
AND (min không truyền OR price >= min)
AND (max không truyền OR price <= max)
```

Keyword `"  JAVA  "` được normalize thành `"JAVA"`, tìm không phân biệt hoa/thường nên khớp 10,13,15. Keyword chỉ space được coi là không lọc. Client truyền filter không phải để server bỏ qua vì một filter khác được ưu tiên.

## 7. Sort có thứ tự rõ, nhưng không đóng băng dữ liệu

Chỉ `ORDER BY price` chưa phân định 10 và 11 vì cùng 100. Thêm id unique để không còn trường hợp đồng hạng chưa xác định. Điều này giúp trang ổn định **khi dataset không đổi**. [PostgreSQL LIMIT/OFFSET](https://www.postgresql.org/docs/current/queries-limit.html).

Ví dụ riêng, không filter, sort id ASC, size 2:

```text
Lúc đầu: 10,11,12,13,14,15
Bạn lấy page 0: 10,11
Người khác chèn id 9; danh sách mới: 9,10,11,12,13,14,15
Bạn lấy page 1, bỏ 2 dòng: 11,12 → id 11 bị lặp
```

Id 9 chỉ là dữ kiện minh họa có chèn khóa nhỏ hơn, không khẳng định identity thường sinh số nhỏ hơn. Sắp unique vẫn không cho hai request cùng snapshot. Tương tự, xóa dòng phía trước có thể làm bỏ sót dòng. Cursor/keyset là hướng tra cứu khi cần, **không hỏi triển khai trong đề**. Nhớ liên hệ Lesson 01: tính chất một thao tác không tự giải quyết mọi cập nhật xen giữa.

## 8. Binding khác kiểm tra giá trị

```text
Query string page=abc
→ Spring không đổi sang int được
→ lỗi binding trước Controller method
→ HTTP 400 trong setup MVC thông thường

Query string page=-1
→ đổi sang int được
→ Controller/validator kiểm range
→ không đúng policy → 400; không gọi repository
```

Tên exception type-mismatch được tra cứu; không bắt thuộc để đủ điểm. @RequestParam làm nhiệm vụ bind param, không tự biết max size 100 hoặc minPrice ≤ maxPrice của dự án. [Spring MVC RequestParam](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestparam.html).

Ví dụ Controller để biết dữ liệu đi vào đâu (imports/Lombok/Service đã được cấu hình):

```java
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService service;

    @GetMapping
    public PageResponse<ProductResponse> list(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "20") int size,
            @RequestParam(name = "sort", defaultValue = "id,asc") String sort,
            @RequestParam(name = "categoryId", required = false) Long categoryId,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "minPrice", required = false) BigDecimal minPrice,
            @RequestParam(name = "maxPrice", required = false) BigDecimal maxPrice) {
        if (page < 0 || size < 1 || size > 100
                || (categoryId != null && categoryId <= 0)
                || (minPrice != null && minPrice.signum() < 0)
                || (maxPrice != null && maxPrice.signum() < 0)
                || (minPrice != null && maxPrice != null
                    && minPrice.compareTo(maxPrice) > 0)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid list parameters");
        }
        Pageable pageable = checkedPage(page, size, sort);
        String normalized = keyword == null ? null : keyword.trim();
        if (normalized != null && normalized.isEmpty()) {
            normalized = null;
        }
        return service.list(categoryId, normalized, minPrice, maxPrice, pageable);
    }

    private Pageable checkedPage(int page, int size, String rawSort) {
        String[] parts = rawSort.split(",", -1);
        if (parts.length != 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Sort must be field,direction");
        }
        String field = parts[0].trim();
        String direction = parts[1].trim();
        if (!Set.of("id", "name", "price").contains(field)
                || !(direction.equals("asc") || direction.equals("desc"))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Unsupported sort");
        }
        Sort order = Sort.by(direction.equals("asc")
                ? Sort.Direction.ASC : Sort.Direction.DESC, field);
        if (!field.equals("id")) {
            order = order.and(Sort.by("id").ascending());
        }
        return PageRequest.of(page, size, order);
    }
}
```

Code kiểm range ở Controller để giữ Service không phụ thuộc HTTP. Dự án của bạn có thể dùng AppException + ErrorCode mapping 400 hoặc validation riêng; bài **không khẳng định ErrorCode.INVALID_PARAMETER đã có sẵn**. Không bắt chép nguyên cú pháp để làm đề. Đây là code đọc minh họa, không phải project hoàn chỉnh; không giả định repository/entity đã được cài.

Nếu chọn nhận trực tiếp `Pageable pageable` thay các param tường minh, phải kiểm cấu hình resolver và validation thực sự. Không suy ra rằng giới hạn size 100, chính sách trả 400 hoặc allowlist tự được enforce chỉ từ chữ Pageable. Framework có thể chuẩn hóa/cap input theo cấu hình; muốn contract từ chối input sai thì phải bảo đảm đúng hành vi đó.

Allowlist giữ public sort không vô tình lộ field nội bộ hoặc cho query không mong muốn. Không nối raw sort vào SQL. Nhưng đừng kết luận mọi field lạ trong Spring Sort đều là SQL injection; điều đó còn phụ thuộc cách build query.

## 9. Repository trả Page, Service trả DTO page: nhìn code rồi đọc nghĩa

Trong đoạn này, **giả định** Product class có getId/getName/getPrice/getCategoryId. Repository đã có method:

```java
Page<Product> search(Long categoryId, String keyword,
        BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
```

Đây là **hợp đồng method**, không phải Spring Data tự hiểu `search` là lọc đủ bốn điều kiện. Cần implementation query trong project thật. Nó phải lọc AND, sort/page ở DB và đếm cùng điều kiện. Trong đề sẽ cho dữ liệu/kết quả repository, không bắt đoán một query bị thiếu.

DTO class với Lombok:

```java
@Getter
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private BigDecimal price;
    private Long categoryId;
}

@Getter
@Builder
public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
}
```

Mỗi public class ở file cùng tên. Import Lombok/java.util/BigDecimal/Spring Data được lược để đọc luồng, không phải bài kiểm tra nhớ import.

```java
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository repository;

    @Transactional(readOnly = true)
    public PageResponse<ProductResponse> list(Long categoryId, String keyword,
            BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        Page<Product> entities = repository.search(
                categoryId, keyword, minPrice, maxPrice, pageable);
        Page<ProductResponse> dtoPage = entities.map(product ->
                ProductResponse.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .price(product.getPrice())
                        .categoryId(product.getCategoryId())
                        .build());
        return PageResponse.<ProductResponse>builder()
                .content(dtoPage.getContent())
                .page(dtoPage.getNumber())
                .size(dtoPage.getSize())
                .totalElements(dtoPage.getTotalElements())
                .totalPages(dtoPage.getTotalPages())
                .build();
    }
}
```

Nghĩa từng đoạn:

1. Repository trả Product trang hiện tại kèm thông tin tổng đúng filter.
2. map đổi **từng Product** thành ProductResponse; không lọc thêm dòng trong mapper.
3. Lấy content là DTO list; number là số trang 0-based; size là kích thước yêu cầu.
4. Lấy total từ Page, **không** lấy content.size(). Với page 1 ở mục 4, content có 1 nhưng total 3.
5. Controller trả object, JSON serializer ghi PageResponse do API công bố.

Trong mapping quan hệ thật, có thể cần `product.getCategory().getId()` thay getCategoryId; điều đó phụ thuộc entity của bạn. Không thêm giả định quan hệ vào bài tính này.

Đọc tên method khi quên: [Page API](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html). Spring Data cảnh báo không nên dựa vào cấu trúc JSON của PageImpl như public contract ổn định; DTO page hoặc PagedModel được hỗ trợ là lựa chọn có kiểm soát. Bài dùng class PageResponse của mình. [Spring Data Web](https://docs.spring.io/spring-data/commons/reference/repositories/core-extensions.html).

## 10. Count phải cùng nghĩa với content

```sql
SELECT COUNT(*) FROM products
WHERE category_id = 1 AND price >= 100;
```

Count này cho 3; count cả bảng cho 6 là sai đối với response lọc ở mục 4. Count không áp LIMIT/OFFSET của trang, không đếm lại trang hiện tại. DB có thể dùng query riêng hoặc tối ưu khác để lấy total; không khẳng định mọi Page đều luôn chạy đúng hai SQL.

Nếu query JOIN làm Product 10 xuất hiện hai dòng, thì số JOIN rows không còn là số Product. Contract đếm Product phải bảo toàn định nghĩa đó, ví dụ count distinct id khi phù hợp; không chỉ đổi total JSON để che query sai. Không bắt viết fetch join/batch/Hikari ở lesson này.

Nếu content và count query chạy khi dữ liệu liên tục thay đổi, có thể chênh lệch do quan sát khác thời điểm. Trong bài tính đề, ta **giả định dataset tĩnh**, không đòi thiết kế isolation/snapshot để đủ điểm.

## 11. List không khớp khác parent resource không tồn tại

Policy cụ thể:

| Request | Tình huống | Response |
|---|---|---|
| GET /api/v1/products?categoryId=999 | Filter hợp lệ, không dòng khớp | 200; content[], tổng 0/0 |
| GET /api/v1/products/999 | Product 999 không có | 404 |
| GET /api/v1/categories/999/products | Category 999 là parent, không tồn tại | 404 |
| GET /api/v1/products?page=999&size=2 | Page hợp lệ nhưng vượt cuối tập không lọc | 200; content[], tổng 6/3 |

Không được đọc categoryId filter thành bắt buộc khởi tạo một parent resource. Trong nested route, contract chọn kiểm parent thực sự. Chọn policy khác có thể hợp lý ở API khác, nhưng cần nói rõ với client; không đổi lén v1.

## 12. Tóm tắt luồng bằng lời của bạn

```text
Client gửi query params
→ Spring bind kiểu; sai kiểu dừng trước Controller method
→ kiểm range/allowlist; normalize keyword
→ Service gọi repository với tất cả filter AND + Pageable
→ DB trả các thực thể trang hiện tại và total đúng filter
→ Service map DTO và đóng PageResponse
→ Controller trả 200; serializer ghi JSON
```

Ví dụ hệ thống AI đọc document theo trang để index: nếu filter bị bỏ qua hoặc trang bị lặp, nó có thể index sai/thiếu dữ liệu. Không cần học ML để thấy API list đúng cũng là đầu vào của pipeline AI đúng.

## 13. Cách học và bài kiểm tra

1. Mục 2–5: tự tính page 0/1/2 trên bảng.
2. Mục 6–8: tự nói vì sao if/else bỏ filter và page=abc/page=-1 khác nhau.
3. Mục 9–11: trace repository → DTO page, phân biệt total và số dòng trang.
4. Đóng bài học, làm [đề mới 12 câu/60đ](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson2-lan2.md). Đạt 51/60 =85%. Không cần chạy project.

Tài liệu đọc đúng phần: RequestParam (binding), Page API (map/getTotalElements), Spring Data Web (page JSON), PostgreSQL LIMIT/OFFSET (order). Video tùy chọn: tìm `Spring Boot pagination filtering sorting PageResponse DTO`; chọn video giải thích AND/tie-break/count, không chỉ gõ findAll(Pageable). Từ khóa là gợi ý, tại lượt này chưa xem/xác nhận một video cụ thể.

**Không hỏi ở đề:** cursor implementation, Specification API, fetch join/pool, locking, ProblemDetail, JWT, OpenAPI, cấu hình DB hoặc imports. Tạo bài học không tự tick roadmap/chấm điểm Lesson 02.
