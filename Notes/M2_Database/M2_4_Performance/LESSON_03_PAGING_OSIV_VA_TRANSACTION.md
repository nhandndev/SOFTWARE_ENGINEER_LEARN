# M2-4 · Lesson 03: Paging, session và transaction

> Học 60–75 phút. Mục tiêu: phân trang đúng khi có quan hệ; hiểu session khác connection; map response trước khi ra ngoài transaction. Cần Lesson 01–02 và paging M1-2/M1-3.

**Cần nắm:** page root khác page dòng JOIN; metadata phải đếm đúng tập dữ liệu; fetch/map DTO bên trong ranh giới làm việc. **Chỉ tra cứu:** flag Hibernate và chi tiết self-invocation. Ví dụ hai bước dài hơn vì có đủ ghép content/order/metadata, không yêu cầu học thuộc nguyên method.

## 1. Trang Product có Category là quan hệ to-one

Mỗi Product có một Category. Join Product với Category không nhân một Product thành nhiều dòng nếu Category.id duy nhất. Đây là điểm quan trọng khi phân biệt với Category có nhiều Product.

Ví dụ repository cho trang Product, giữ response có categoryName:

```java
@Query(value = "select p from Product p join fetch p.category",
       countQuery = "select count(p) from Product p")
Page<Product> findPageWithCategory(Pageable pageable);
```

Giả định Category bắt buộc theo mapping Lesson 01. `countQuery` chỉ đếm Product, không fetch Category. Nếu query có filter, count phải có điều kiện cùng nghĩa; ví dụ lọc Category thì count cũng phải lọc Category tương ứng. Không bỏ WHERE trong count rồi trả tổng sai.

Ví dụ method có filter cần hai WHERE cùng nghĩa:

```java
@Query(value = """
    select p from Product p join fetch p.category
    where p.category.id = :categoryId
    """, countQuery = """
    select count(p) from Product p where p.category.id = :categoryId
    """)
Page<Product> findPageByCategory(@Param("categoryId") Long categoryId,
                                 Pageable pageable);
```

Nếu 100 Product toàn DB nhưng Category đang lọc chỉ có 7 Product, totalElements phải là 7, không phải 100. `PageResponse` có JSON đúng hình dạng mà total sai vẫn là API sai.

```java
@Transactional(readOnly = true)
public PageResponse<ProductResponse> list(Pageable pageable) {
    Page<Product> page = productRepository.findPageWithCategory(pageable);
    List<ProductResponse> content = page.getContent().stream()
            .map(p -> new ProductResponse(
                    p.getId(), p.getName(), p.getCategory().getName()))
            .toList();
    return new PageResponse<>(content, page.getNumber(), page.getSize(),
            page.getTotalElements(), page.getTotalPages(), page.isLast());
}
```

DTO class (imports List và Lombok):

```java
@Getter
@AllArgsConstructor
public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
```

Đoạn Service là method thêm vào ProductService có repository inject như bài trước. ProductResponse vẫn class với constructor ba field. Dùng Pageable có sort ổn định, ví dụ `PageRequest.of(0, 10, Sort.by("id"))`; validate page≥0, size trong giới hạn ở biên API.

Một Page có thể chạy query dữ liệu và query đếm. Không khẳng định mọi Page luôn đúng hai query vì framework có thể tối ưu count ở một số trường hợp. Quan sát log để phân biệt count có chủ đích với query quan hệ lặp kiểu N+1.

## 2. Collection join làm paging phức tạp

Muốn lấy Category kèm products. Giả định mapping Category có `@OneToMany(mappedBy="category") List<Product> products` và Product có FK về Category.

Đây là association cần thêm vào Category của Lesson 01 nếu thực hành ví dụ collection; class đó ban đầu chưa có field products:

```java
@OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
private List<Product> products = new ArrayList<>();
```

`mappedBy="category"` trỏ đến tên field **Product.category**, không phải tên cột category_id. Getter của Category cần có `getProducts()`; @Getter trên class cung cấp nó. Imports bổ sung List/ArrayList/Product và Jakarta OneToMany/FetchType.

| Category | Product |
|---|---|
| Books | Java |
| Books | Spring |
| Books | SQL |
| Electronics | Mouse |

Join collection tạo ba dòng SQL cho Books và một dòng cho Electronics. `LIMIT 2` trên các dòng join không tương đương “hai Category đầy đủ collection”. Có thể chỉ nhận một phần dữ liệu của Books nếu áp limit ngây thơ.

Hibernate tránh một số kết quả collection không đầy đủ bằng cách có thể phân trang trong bộ nhớ khi fetch collection và dùng limit. Khi đó tải nhiều dòng rồi cắt trong Java, gây rủi ro performance. `DISTINCT` loại root entity trùng không tự giải quyết giới hạn theo dòng join. EntityGraph fetch collection cũng phải kiểm cùng vấn đề. [HQL mục 3.2.4: fetch joins và paging](https://docs.hibernate.org/orm/7.1/querylanguage/html_single/).

Để phát hiện sớm trong Hibernate hỗ trợ setting này:

```yaml
spring:
  jpa:
    properties:
      hibernate:
        query:
          fail_on_pagination_over_collection_fetch: true
```

Setting làm fail thay vì âm thầm chấp nhận một đường paging collection nguy hiểm; nó không tự sửa query.

## 3. Hai bước: page root trước, fetch dữ liệu sau

Ví dụ cần trang Category kèm Product:

```java
@Query(value = "select c.id from Category c order by c.id",
       countQuery = "select count(c) from Category c")
Page<Long> findIdPage(Pageable pageable);

@Query("""
    select distinct c from Category c
    left join fetch c.products
    where c.id in :ids
    """)
List<Category> findWithProductsByIds(@Param("ids") List<Long> ids);
```

Ở ví dụ này sort cố định theo id trong query; Pageable truyền vào không thêm sort khác. Page đầu quyết định root ID; query sau không có Pageable và chỉ fetch collection cho các ID đã chọn.

```text
Trang ID: [1, 2]
 -> Fetch Category+Product của ID 1,2
 -> Sắp lại theo thứ tự [1,2]
 -> Map DTO trong transaction
 -> Ghép metadata từ trang ID
```

`IN` không bảo đảm giữ thứ tự list ID; phải sắp kết quả theo thứ tự trang hoặc ORDER BY phù hợp. Trang ID rỗng thì trả trang rỗng, không gọi query IN rỗng để phụ thuộc dialect. Count + ID page + fetch có thể là ba query có chủ đích, không phải N+1.

### Code ghép DTO và metadata, không bỏ bước

Hai method repository ở trên thuộc `CategoryRepository extends JpaRepository<Category, Long>`. Hai DTO dưới đây là hai file riêng, Lombok Getter/AllArgsConstructor, List từ java.util:

```java
@Getter
@AllArgsConstructor
public class ProductBriefResponse {
    private Long id;
    private String name;
}
```

```java
@Getter
@AllArgsConstructor
public class CategoryWithProductsResponse {
    private Long id;
    private String name;
    private List<ProductBriefResponse> products;
}
```

Method dưới đặt trong `@Service` có `private final CategoryRepository categoryRepository` được inject bằng constructor/Lombok. Imports bổ sung Map, Comparator, Collectors, PageRequest, Page, Pageable, Transactional và các entity/DTO:

```java
@Transactional(readOnly = true)
public PageResponse<CategoryWithProductsResponse> listCategories(int page, int size) {
    if (page < 0 || size < 1 || size > 100) {
        throw new IllegalArgumentException("Invalid page or size");
    }
    Pageable pageable = PageRequest.of(page, size);
    Page<Long> idPage = categoryRepository.findIdPage(pageable);
    List<CategoryWithProductsResponse> content;

    if (idPage.isEmpty()) {
        content = List.of();
    } else {
        Map<Long, Category> byId = categoryRepository
                .findWithProductsByIds(idPage.getContent()).stream()
                .collect(Collectors.toMap(Category::getId, c -> c));

        content = idPage.getContent().stream().map(id -> {
            Category category = byId.get(id);
            if (category == null) {
                throw new IllegalStateException("Category changed during paging");
            }
            List<ProductBriefResponse> products = category.getProducts().stream()
                    .sorted(Comparator.comparing(Product::getId))
                    .map(p -> new ProductBriefResponse(p.getId(), p.getName()))
                    .toList();
            return new CategoryWithProductsResponse(
                    category.getId(), category.getName(), products);
        }).toList();
    }

    return new PageResponse<>(content, idPage.getNumber(), idPage.getSize(),
            idPage.getTotalElements(), idPage.getTotalPages(), idPage.isLast());
}
```

Theo lần chạy dữ liệu ổn định:

1. Page ID quyết định trang gồm Category nào, theo ORDER BY c.id của query; Pageable không thêm sort cạnh tranh.
2. Nếu trang rỗng, không gọi fetch IN; metadata vẫn lấy từ Page ID, không tự đặt total=0 nếu chỉ là trang vượt cuối.
3. Map byId cho phép tìm Category đã fetch theo ID. Duyệt **idPage** để giữ thứ tự trang dù query IN trả về đảo thứ tự.
4. Đọc products đã fetch, dựng DTO con chỉ gồm id/name. Category không có Product có list rỗng nhờ left join fetch.
5. Tổng Category và số trang đến từ Page ID, không lấy `content.size()` làm tổng toàn bộ.

Hai exception trong mẫu chỉ giúp đọc luồng, không thay thiết kế ErrorCode/AppException bạn đã có. Khi tích hợp thật, ánh xạ invalid input/lỗi đồng thời theo contract ứng dụng. Check Category null cho biết có thể đã bị xóa giữa hai SELECT; không âm thầm trả trang sai và gọi đó là thành công.

Hai query cũng tạo khoảng thời gian có thể thay đổi dữ liệu. Nếu cần snapshot nhất quán khi có ghi đồng thời, thiết kế transaction/isolation phù hợp; chỉ thêm @Transactional không mặc định biến READ COMMITTED thành snapshot cố định qua mọi SELECT. Chi tiết isolation đã nằm ở M2-2.

## 4. OSIV là gì và vì sao tắt?

Open Session/EntityManager In View có thể giữ persistence context qua thời gian xử lý web request, giúp LAZY còn được tải ngoài Service transaction. Nó có thể che fetch plan thiếu vì Jackson đọc entity rồi query thêm sau khi Service đã trả về.

```yaml
spring:
  jpa:
    open-in-view: false
```

Tắt OSIV giúp đặt ranh giới tải dữ liệu rõ hơn: fetch dữ liệu cần trong Service, map DTO rồi trả response. Nhưng **tắt OSIV không tự chữa N+1**. Code vẫn có thể query N lần trong transaction, hoặc bắt đầu báo LazyInitializationException vì dữ liệu chưa tải.

Đừng sửa bằng cách “mở session cho đến khi Jackson đọc xong” mà bỏ qua fetch plan. Trước hết xác định field response cần, query/fetch trong Service và map DTO; sau đó quan sát SQL. OSIV là lựa chọn kiến trúc, không phải công cụ biến một query thiếu dữ liệu thành tối ưu.

Tài liệu của [OpenEntityManagerInViewFilter](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/orm/jpa/support/OpenEntityManagerInViewFilter.html) mô tả persistence context gắn với web request. Session/EntityManager tồn tại không có nghĩa luôn giữ một connection vật lý suốt request; thời điểm acquire/release phụ thuộc transaction và cấu hình ORM.

## 5. Ranh giới transaction nhìn từ response

```text
Controller gọi Service qua Spring proxy
 -> mở transaction/context cần thiết
 -> query entity và quan hệ cần dùng
 -> map DTO chỉ chứa dữ liệu đã lấy
 -> method kết thúc, transaction hoàn tất
 -> Controller trả DTO
 -> Jackson serialize DTO, không cần truy cập LAZY entity
```

`@Transactional(readOnly=true)` không tự sinh JOIN FETCH, không tự ngăn mọi thao tác ghi ở mức DB và không kéo LAZY mãi sau khi method kết thúc. Nó là cấu hình transaction/read-only hint có tác động tùy cơ chế.

Trong chế độ proxy mặc định, gọi method transactional qua Spring bean để interceptor có hiệu lực. `this.list()` trong cùng class có thể bỏ qua proxy. [Spring transaction annotations](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html).

ResponseEntity/ApiResponse là wrapper HTTP/app; bọc một entity trong wrapper không biến nó thành DTO. Nếu bên trong vẫn chứa Product có proxy chưa tải, Jackson vẫn có thể truy cập quan hệ.

## 6. Vì sao transaction dài làm pool căng?

Ví dụ Service query DB rồi gọi API bên ngoài mất 5 giây trong cùng transaction. Khi connection đã được lấy và còn bị giữ, những request khác có thể phải chờ connection lâu hơn. Không cần nhiều query mới làm pool đầy; vài query trong transaction dài cũng đủ gây áp lực.

Với hệ thống AI bạn định học: gọi model/embedding lâu trong transaction sau một query DB có thể tạo vấn đề tương tự. Thường tách phần I/O ngoài chậm khỏi transaction DB ngắn, rồi ghi kết quả theo nghiệp vụ/idempotency/consistency thích hợp. Không tách tùy tiện nếu nhiều bước bắt buộc atomic; xác định business rule trước.

## 7. Tài liệu và tự luyện

- [HQL mục 3.2.4: fetch joins](https://docs.hibernate.org/orm/7.1/querylanguage/html_single/): collection + limits.
- [OSIV filter](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/orm/jpa/support/OpenEntityManagerInViewFilter.html): context qua request.
- [Transactional](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html): proxy, read-only.
- Video tùy chọn: tìm `Hibernate pagination collection fetch two step query OSIV DTO transaction`.

Tự luyện: so sánh paging Product→Category to-one với Category→products collection; kể vì sao ba query có chủ đích có thể đúng hơn một JOIN lớn.

Làm [đề Lesson 03](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-05__lesson3-lan1.md).
