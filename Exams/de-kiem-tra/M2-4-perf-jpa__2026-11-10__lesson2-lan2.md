# M2-4 · Lesson 02 — Chọn fetch plan và giữ đúng response

> Đề viết lại **2026-11-10**, theo yêu cầu kiểm toàn Lesson 02. Chế độ **LESSON mở rộng: 16 câu × 5đ = 80đ**. Điểm = điểm thô /80 ×100; đạt từ **68/80 = 85%**.

Có thể chia hai buổi: câu 1–8 và 9–16, khoảng 45–60 phút mỗi buổi. Chấm tư duy và ý nghĩa, không bắt thuộc imports, package hoặc cú pháp từng dấu. Khi không nhớ cú pháp, mô tả chính xác query/luồng vẫn được chấm ý tương ứng. Không bắt code nguyên project.

Phạm vi là [Lesson 02](../../Notes/M2_Database/M2_4_Performance/LESSON_02_FETCH_JOIN_ENTITYGRAPH_BATCH_DTO.md). **Chưa hỏi** thuật toán paging collection, OSIV sâu, HikariCP, JUnit, benchmark p95 hoặc cache nâng cao.

## Code và dữ liệu dùng chung

Các class ở file riêng, đã có imports JPA/Lombok/Spring. Tên Entity là Product/Category, tên bảng SQL là products/categories.

```java
@Entity
@Table(name = "categories")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {
    @Id
    private Long id;
    private String name;
}

@Entity
@Table(name = "products")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {
    @Id
    private Long id;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
```

Product có setter name khi câu hỏi cập nhật cần dùng; các câu đọc không có getter/listener tự truy cập quan hệ ngoài code đã cho.

DTO **class**, không phải Entity:

```java
// Package: com.shopcore.product.dto
@Getter
@Setter
public class ProductResponse {
    private Long id;
    private String name;
    private String categoryName;

    public ProductResponse(Long id, String name, String categoryName) {
        this.id = id;
        this.name = name;
        this.categoryName = categoryName;
    }
}
```

Mẫu Service đọc, khi không có code khác:

```java
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<ProductResponse> list() {
        return productRepository.findAll().stream()
                .map(p -> new ProductResponse(
                        p.getId(), p.getName(), p.getCategory().getName()))
                .toList();
    }
}
```

ProductRepository extends JpaRepository<Product, Long>. Mỗi câu cho method/query bổ sung cần dùng.

**products**

| id | name | category_id |
|---:|---|---:|
| 10 | Java Book | 1 |
| 11 | Mouse | 2 |
| 12 | Coffee | 3 |

**categories**

| id | name |
|---:|---|
| 1 | Books |
| 2 | Electronics |
| 3 | Food |

### Điều kiện chung

- Các câu độc lập. Mỗi lần quan sát dùng context mới/chưa tải Category; không cache cấp hai/query cache/batch, trừ câu bật batch.
- Dùng Hibernate hỗ trợ LAZY to-one; Service gọi qua Spring proxy. Mapper được thực hiện trong transaction/context còn mở.
- Không có paging/count query, ghi dữ liệu hoặc query nền, trừ câu nêu tình huống khác.
- Chỉ đếm SELECT dữ liệu cho use case, không tính startup/BEGIN/COMMIT.
- Category bắt buộc trong dữ liệu chung. **Riêng câu 4, 11, 15:** dùng phiên bản mapping optional=true, nullable=true; DB cho phép FK NULL.
- Số SQL kỳ vọng phải gắn điều kiện này, không khẳng định đúng mọi provider/dự án.

---

## Câu 1 — Thiết kế theo dữ liệu endpoint cần (5đ)

Hai endpoint khác nhau:
- GET /api/product-options: chỉ trả id/name.
- GET /api/products: trả id/name/categoryName.

1. Với mỗi endpoint, nêu dữ liệu Product/Category nào cần lấy để dựng response; endpoint dropdown có bắt buộc tải Category không? **(2đ)**
2. Có cần đổi Product.category thành EAGER toàn hệ thống chỉ vì endpoint thứ hai cần categoryName không? Giải thích theo phạm vi use case. **(2đ)**
3. Giải thích “fetch plan” bằng một câu gắn với hai endpoint trên, không cần định nghĩa học thuật. **(1đ)**

**Trả lời:**

---
cái endpoint - GET /api/product-options: chỉ trả id/name. nên chỉ lấy product là id và name của product thôi , không bắt buộc tải category

end point GET /api/products: trả id/name/categoryName. cần phải tải cateogry nữa , ở đây là categoryName  , còn lại thì tải id và name , nên tải theo dạng như là DTO Projection , vì k cần phải tải hết entity như là thằng entity graph hoặc là fetch join , 
2 k cần odidor thành EAGER vì k cần thiết lúc ban đầu tải otanf bộ categỏy , vì chỉ có vài field cần và mỗi API endpoint thì featch plan là khác nhau , k cần phải đổi thành EAAGER , 
3 featch plan thì là api đầu chri cần id và naem của product
API còn lại thì nên xài DTO Projection vì chỉ cần categoryName của category và id và name của Product 
## Câu 2 — JOIN để lọc có đồng nghĩa đã tải Category? (5đ)

Repository có method:

```java
@Query("""
    select p from Product p
    join p.category c
    where c.name = :categoryName
    """)
List<Product> findByCategoryName(@Param("categoryName") String categoryName);
```

Service gọi method với categoryName="Books" rồi map DTO bằng p.getCategory().getName().

1. Theo bảng chung, query chọn Product ID nào? JOIN và điều kiện c.name dùng để làm gì? **(2đ)**
2. Vì query có JOIN, có được kết luận Category đã initialize và mapper chắc chắn không query thêm không? Giải thích query đang chọn đối tượng gì. **(2đ)**
3. Nêu bằng chứng runtime bạn cần kiểm để xác nhận mapper còn tải thêm Category hay không. **(1đ)**

**Trả lời:** 1 query chọn product ID là  10  là record này | 10 | Java Book | 1 | , và c.name là dùng để lấy category name để lọc ra dựa vào cái String categoryname để lấy ra Product có categỏy là categoryName mà para truyền vào 
2 xài Join thì chưa chắc kết luận được Category đã được initialize vì là Hibernate nó sẽ sin hra câu query select có thể là field product và thêm categoryName nữa thôi , chưa init toàn bộ Entity nên là chưa chắc là Category đã udocdwj tải hoàn toàn toàn bộ , Query đang chọn đối tượng là Product 

---

## Câu 3 — Viết fetch query rồi phải dùng nó ở đâu? (5đ)

Bạn thêm:

```java
@Query("select p from Product p join fetch p.category")
List<Product> findAllWithCategory();
```

Nhưng ProductService.list() vẫn giữ productRepository.findAll() như code chung.

1. Chỉ thêm method mới có làm list() tự hết N+1 không? Chỉ rõ lời gọi Service cần thay bằng gì. **(2đ)**
2. Sau khi Service gọi đúng method, mapper còn cần SELECT Category riêng trong dữ liệu chung không? Dự đoán tổng SELECT dữ liệu và nêu lý do. **(2đ)**
3. Có phải đổi DTO sang Entity hoặc trả Entity trực tiếp cho client mới dùng JOIN FETCH được không? **(1đ)**

**Trả lời:** 1 là chưa chắc tự hết N+1 mà phải là chỉ nên xử dụng là cấi findAllWithCategory() bởi vì nó có Join Fetch tải entity hợp lý rồi
2 không cần Select category Riêng trong dự liệu của chúng , dự đoán tổng select là 1 thôi
3 Không nhất thiết phải vậy , có thể dùng Join Fetch để tải sẵn dữ liệu của Entity khác khi cần , và nó thường dùng khi mà cần tải hẵn entity luôn còn hong thì nên xài DTO Projection nếu chỉ cần query ra kết quả còn Join fetch là nếu thao tác update thêm nữa thì nên dùng để nó lấy ra managed Entity 

---

## Câu 4 — Category NULL: query đúng nhưng mất Product (5đ)

Dùng mapping optional và dữ liệu riêng:

| Product.id | Product.name | category_id |
|---:|---|---:|
| 10 | Java Book | 1 |
| 11 | Mouse | 2 |
| 12 | Gift Card | NULL |

API bắt buộc giữ cả ba Product. Product 12 phải có categoryName=null.

1. Với select p from Product p join fetch p.category, Product ID nào có trong kết quả, ID nào mất? Vì sao? **(2đ)**
2. Viết hoặc mô tả JPQL thay thế để vẫn fetch Category và giữ Product thiếu Category. **(1đ)**
3. Viết vài dòng mapper an toàn hoặc mô tả đủ cách xử lý category==null. Có cần tạo Category giả cho Product 12 không? **(2đ)**

**Trả lời:**

---

## Câu 5 — EntityGraph áp dụng cho method nào? (5đ)

Repository khai báo:

```java
@EntityGraph(attributePaths = "category")
@Query("select p from Product p")
List<Product> findAllForCatalog();

@Query("select p from Product p")
List<Product> findAllForInternalJob();
```

1. Graph ở method thứ nhất yêu cầu tải dữ liệu quan hệ nào? Nó có tự gắn sang method thứ hai hay mọi endpoint dùng Product không? **(2đ)**
2. Đề xuất lời gọi repository cho API cần categoryName. Có phải đổi mapping toàn cục thành EAGER không? **(1đ)**
3. Có được cam kết mọi provider/version đều sinh đúng một SQL chỉ vì có annotation này không? Cần kiểm gì để kết luận trong dự án thật? **(2đ)**

**Trả lời:**

---

## Câu 6 — Batch fetching gom cái gì, đặt cấu hình ở đâu? (5đ)

Hai cách cấu hình minh họa:

```yaml
spring:
  jpa:
    properties:
      hibernate:
        default_batch_fetch_size: 16
```

Hoặc thêm annotation trên class Category đang có:

```java
@Entity
@BatchSize(size = 16)
public class Category {
    // Giữ nguyên id/name, mapping và getter/constructor.
}
```

1. Khi nhiều Category proxy chưa tải cùng nằm trong context, batch có thể thay nhiều SELECT từng ID bằng dạng SELECT nào? Mô tả bằng lời hoặc SQL minh họa. **(2đ)**
2. Phân biệt phạm vi cấu hình YAML toàn cục với việc đặt annotation trên Category, là loại Entity cần gom tải (1đ). Với quan hệ collection, bài học cho phép đặt annotation tại đâu (1đ)? **(2đ)**
3. Bật batch có đồng nghĩa Category luôn được tải dù endpoint chỉ đọc Product.id/name không? **(1đ)**

Không bắt thuộc tên package annotation hoặc gõ lại YAML.

**Trả lời:**

---

## Câu 7 — Hai cấu hình batch có cùng công dụng không? (5đ)

Một đồng đội chỉ đặt hibernate.jdbc.batch_size=16 và nói: “Vậy mapper đọc Category của 36 Product sẽ tự được gom SELECT theo nhóm 16”.

1. Nhận định đó có đủ cơ sở không? Phân biệt JDBC batching và batch fetching trong bài học. **(3đ)**
2. Nếu mục tiêu là gom đọc Category LAZY, chọn lại cấu hình/annotation nào từ câu 6; nêu một bằng chứng cần kiểm sau thay đổi. **(2đ)**

**Trả lời:**

---

## Câu 8 — Tính batch với giả định rõ, không đoán số cố định (5đ)

Dữ liệu riêng: 36 Product, mỗi Product tham chiếu một Category khác nhau. Tất cả 36 Category proxy chưa tải đã đủ điều kiện trong cùng context trước khi mapper đọc. Một SELECT lấy Product; batch size=16.

**Riêng phép tính minh họa này**, giả sử Hibernate gom tối đa 16 ID mỗi lượt theo nhóm 16/16/4, không phát sinh SQL khác.

1. Cần bao nhiêu SELECT Category, tổng bao nhiêu SELECT cả Product? Nếu không batch và không cache thì tổng là bao nhiêu? **(2đ)**
2. Nếu cùng code nhưng endpoint không đọc Category, chỉ lấy Product.id/name, có bắt buộc chạy ba batch Category không? **(1đ)**
3. Vì sao không mang kết quả phép tính này áp cho mọi dự án? Nêu hai yếu tố thực tế có thể làm số lượt tải khác đi. **(2đ)**

Không hỏi thuật toán nội bộ Hibernate hoặc padding chi tiết.

**Trả lời:**

---

## Câu 9 — Query trực tiếp DTO class (5đ)

Dùng dữ liệu chung, Category bắt buộc; DTO ProductResponse có package/constructor đã cho.

1. Viết JPQL constructor projection lấy Product.id, Product.name, Category.name; dùng JOIN phù hợp. Có thể mô tả đầy đủ nếu quên cú pháp. **(3đ)**
2. Method trả List<ProductResponse> như vậy có trả Product entity hay Category proxy bên trong DTO không? Khi Jackson đọc ba field DTO, có cần gọi getter LAZY trên Category nữa không? **(2đ)**

**Trả lời:**

---

## Câu 10 — Sửa projection sai tên Entity và constructor (5đ)

Một bạn viết JPQL, không phải native SQL:

```java
@Query("""
    select new ProductResponse(p.name, p.id, c.name)
    from products p join p.category c
    """)
List<ProductResponse> findResponses();
```

Đề chỉ có Entity Product, class DTO ở com.shopcore.product.dto; không đăng ký import tên DTO rút gọn. Constructor duy nhất: (Long id, String name, String categoryName).

1. Chỉ ra ba lỗi về: tên đối tượng trong FROM; cách tham chiếu class DTO; thứ tự/kiểu tham số constructor. **(3đ)**
2. Viết lại query đúng hoặc mô tả chính xác ba chỗ sửa. Vì sao JPQL không lấy tên bảng products thay cho tên Entity ở đây? **(2đ)**

**Trả lời:**

---

## Câu 11 — Projection vẫn phải chọn đúng JOIN khi Category NULL (5đ)

Dùng lại ba Product của câu 4, trong đó Product 12 thiếu Category. API vẫn phải trả đủ ba dòng và categoryName=null cho Product 12.

Query hiện tại:

```java
@Query("""
    select new com.shopcore.product.dto.ProductResponse(
        p.id, p.name, c.name)
    from Product p join p.category c
    """)
List<ProductResponse> findResponses();
```

1. Projection có tự giữ Product 12 chỉ vì kết quả là DTO không? Nêu các ID hiện được trả. **(2đ)**
2. Sửa JOIN để giữ Product 12; đối số categoryName khi dựng DTO cho dòng đó là gì? **(2đ)**
3. Có cần mapper đọc Product.getCategory().getName() thêm sau query để lấy tên cho các DTO không? Giải thích. **(1đ)**

**Trả lời:**

---

## Câu 12 — DTO projection có được dirty checking như Entity không? (5đ)

Có hai repository method:

```java
Optional<Product> findById(Long id);

@Query("""
    select new com.shopcore.product.dto.ProductResponse(
        p.id, p.name, c.name)
    from Product p join p.category c
    where p.id = :id
    """)
Optional<ProductResponse> findResponseById(@Param("id") Long id);
```

Một Service method đang chạy trong transaction ghi hợp lệ; kết thúc sẽ commit, không rollback:

```java
ProductResponse response = productRepository.findResponseById(id)
        .orElseThrow();
response.setName("New name");
```

Không có lệnh ghi DB khác.

1. Chỉ setName trên response này có tự cập nhật products.name khi commit không? Vì sao? **(2đ)**
2. Nếu muốn cập nhật bằng dirty checking, nên lấy loại đối tượng nào bằng method nào rồi thay đổi gì? **(2đ)**
3. Endpoint chỉ đọc ba field và nghiệp vụ cập nhật có bắt buộc dùng cùng một kiểu query/trả về không? **(1đ)**

**Trả lời:**

---

## Câu 13 — Chọn cách tải theo use case, không có cách tốt nhất cho mọi API (5đ)

Ba nhu cầu:
- API danh sách chỉ đọc ba field id/name/categoryName, không cập nhật.
- Service cần Product managed và Category để kiểm business rule trước khi đổi Product.name.
- Một luồng hiện có nhiều tham chiếu Category LAZY trong cùng context; muốn giảm SELECT lẻ, không muốn ghép một query JOIN lớn.

1. Đề xuất một cách tải phù hợp cho từng nhu cầu và nêu lý do ngắn. Có thể có nhiều đáp án hợp lý. **(3đ)**
2. So sánh JOIN FETCH/EntityGraph với batch: batch có đồng nghĩa mọi quan hệ cần đọc đã được lấy cùng query Product không? **(1đ)**
3. Có nên chuyển tất cả API sang DTO projection bất kể nghiệp vụ ghi hay không? Giải thích. **(1đ)**

**Trả lời:**

---

## Câu 14 — Fetch thêm collection có luôn tốt hơn? (5đ)

API chỉ cần Product.id/name/categoryName. Giả sử ngoài quan hệ Category, model còn có các collection nhiều phần tử; không cần các phần tử đó để dựng response.

Một bạn muốn fetch thêm category.products và nhiều collection khác “để sau này không bị LAZY”.

1. Chọn fetch to-one, graph hoặc projection cho response hiện tại; nói rõ dữ liệu nào lấy và không cần lấy. **(2đ)**
2. Nêu hai rủi ro khi fetch nhiều collection cùng lúc. Không cần nhớ tên exception Hibernate. **(2đ)**
3. Vì sao “chỉ một SQL” vẫn chưa đủ kết luận cách fetch sâu này tối ưu? **(1đ)**

Chỉ kiểm nhận diện rủi ro; chưa bắt xử lý paging collection ở Lesson 03.

**Trả lời:**

---

## Câu 15 — Đọc báo cáo sửa lỗi: ít query nhưng sai dữ liệu (5đ)

Dùng dữ liệu optional của câu 4. Trước/sau trên cùng DB, context mới, workload cô lập:

| Bản | SELECT/request | Product ID trả về | categoryName của Product 12 | Thời gian |
|---|---:|---|---|---|
| Ban đầu | 3 | 10, 11, 12 | null | Chưa đo |
| Sau inner JOIN FETCH | 1 | 10, 11 | Không có Product 12 | Chưa đo |

API bắt buộc giữ Product 12. Không cần giải thích lại vì sao trước có ba SELECT.

1. Bạn có duyệt bản sửa chỉ vì giảm SELECT không? Nêu lỗi đúng/sai chức năng. **(2đ)**
2. Đề xuất sửa query và mapper, không đổi hợp đồng API hoặc tự gán Category cho Product 12. **(2đ)**
3. Nếu sau sửa đã đủ Product và ít SELECT hơn, còn cần đo gì để kết luận endpoint nhanh hơn? **(1đ)**

**Trả lời:**

---

## Câu 16 — Lập kế hoạch kiểm chứng cho một fetch plan (5đ)

Bạn được chọn JOIN FETCH, EntityGraph, batch hoặc DTO projection để cải thiện endpoint list Product cần đủ id/name/categoryName. DB có cả Product có Category và Product không có Category; mapping optional và dữ liệu hợp lệ.

Không yêu cầu chạy thử. Trình bày kế hoạch ngắn sao cho người khác biết:

1. Chốt response và dữ liệu mẫu nào để kiểm được cả quan hệ có/không có. **(1đ)**
2. Chọn cách tải và chỉ rõ method/query nào Service thực sự gọi; nếu chọn projection thì có cần map từ Entity sang DTO nữa không? **(1đ)**
3. Đối chiếu gì trong kết quả trước/sau để tránh mất dòng/field hoặc sai null? **(1đ)**
4. Xem những số liệu SQL/row/thời gian nào; vì sao không chỉ nhìn số query? **(1đ)**
5. Giữ hai điều kiện so sánh nào tương đương để kết luận có ý nghĩa? **(1đ)**

Không bắt thuộc đúng thứ tự văn mẫu; cần kế hoạch nhất quán với cách tải bạn chọn.

**Trả lời:**

---

Đây là bản đề hiện hành thay đề 2026-10-05. Giữ file cũ nguyên vẹn để bảo toàn lịch sử; không cần làm cả hai. Đáp án/rubric ở file cùng tên thêm __DAPAN.md. Khi chấm lưu snapshot theo tên đề mới. Soạn đề không tự đổi điểm, trạng thái hoặc tick checklist.
