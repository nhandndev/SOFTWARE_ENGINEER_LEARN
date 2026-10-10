# M2-4 · Lesson 02: Chọn fetch plan theo response

> Học 60–75 phút. Mục tiêu: chọn JOIN FETCH, EntityGraph, batch hoặc DTO projection theo dữ liệu endpoint cần. Cần Lesson 01; paging collection đi sâu ở Lesson 03.

**Cần nắm:** response cần field nào thì tải đủ field/quan hệ đó, giữ đúng dữ liệu trước khi bàn số query. **Chỉ tra cứu:** cú pháp annotation và property batch. Khi làm đề có thể diễn đạt kế hoạch bằng lời nếu không nhớ từng dấu Java; các câu JPQL ngắn kiểm xem bạn nối đúng entity/field.

## 1. Bắt đầu từ response, không từ annotation

Endpoint cần `id`, `name`, `categoryName`. Nghĩ trước: cần name của Category nên phải tải dữ liệu đó. Nếu endpoint khác chỉ cần Product id/name, không tự động kéo cả Category và mọi Product trong Category.

Fetch plan là kế hoạch tải dữ liệu cho một use case. Entity mapping LAZY là mặc định có thể giữ; method repository phục vụ endpoint cụ thể quyết định tải thêm gì.

Giữ Product/Category và DTO class từ Lesson 01. Trong ví dụ này Category bắt buộc, mỗi Product có đúng một Category. Ba Product tham chiếu ba Category khác nhau, context lạnh, không batch/cache.

## 2. JOIN thường khác JOIN FETCH

```java
@Query("select p from Product p join p.category c where c.name = :name")
List<Product> findByCategoryName(@Param("name") String name);
```

JOIN thường giúp lọc theo bảng quan hệ. Query trả Product, không có từ fetch, nên không được khẳng định Category đã được initialize chỉ vì SQL có JOIN. Mapping `getCategory().getName()` vẫn có thể cần thêm SQL.

```java
@Query("select p from Product p join fetch p.category")
List<Product> findAllWithCategory();
```

JOIN FETCH yêu cầu tải Category cùng Product. Service đổi từ findAll sang findAllWithCategory rồi map cùng DTO; ở ví dụ này mapper không cần các SELECT Category riêng nữa. Với dữ kiện đã nêu, kỳ vọng một query dữ liệu và cần xác nhận log.

Nếu category có thể NULL, inner JOIN FETCH bỏ Product không có Category. Khi cần giữ chúng, chọn `left join fetch p.category` và mapper kiểm null. Đừng sửa performance rồi vô tình đổi dữ liệu endpoint trả. [HQL mục 3.2.4: fetch joins](https://docs.hibernate.org/orm/7.1/querylanguage/html_single/).

Đây là **tình huống tùy chọn riêng**, khác mapping Category bắt buộc ở ví dụ chính. Nếu áp dụng thật, mapping/FK phải cho phép NULL. Mapper cho trường hợp này:

```java
Category category = product.getCategory();
ProductResponse response = new ProductResponse(
        product.getId(), product.getName(),
        category == null ? null : category.getName());
```

Với data Product 1→Category 1, Product 2→Category 2, Product 3→NULL: inner fetch trả 1/2, left fetch trả 1/2/3. Product 3 có categoryName=NULL trong DTO; không tạo Category giả.

## 3. EntityGraph: mô tả quan hệ cần tải ở method

```java
@EntityGraph(attributePaths = "category")
@Query("select p from Product p")
List<Product> findAllWithCategoryGraph();
```

Imports: Spring Data JPA `EntityGraph`, `Query`. Graph nói method này cần tải Category. Cú pháp tránh viết JOIN FETCH trong query, nhưng không phải lời cam kết cứng mọi provider/version luôn sinh đúng một SQL y hệt nhau; kiểm log trong môi trường thực tế. [Spring Data JPA entity graphs](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.entity-graph).

Graph không làm mọi endpoint dùng Product tự nhiên fetch Category; nó áp dụng ở method/query đó. Không cần bật EAGER toàn entity chỉ để một endpoint đủ dữ liệu.

## 4. Batch fetching: gom tải LAZY

Ví dụ cấu hình toàn cục trong profile thử nghiệm:

```yaml
spring:
  jpa:
    properties:
      hibernate:
        default_batch_fetch_size: 16
```

Hoặc đặt annotation Hibernate tại entity được tải theo batch:

```java
@Entity
@BatchSize(size = 16)
public class Category {
    // Các field/annotation như Lesson 01.
}
```

Đây là snippet **thay đổi trên class Category đã có**, không phải class trống thay thế. Import `org.hibernate.annotations.BatchSize`. Với collection, annotation có thể đặt tại collection association. Đừng nhầm đặt tùy tiện trên Product.category và mặc định hiệu lực đúng như entity-level annotation.

Thay vì SELECT Category 1, rồi 2, rồi 3 riêng lẻ, Hibernate có thể gom những proxy đủ điều kiện trong context thành query dạng `WHERE id IN (...)`. Mapping vẫn truy cập LAZY, nhưng số round-trip có thể giảm. Batch không bảo đảm một query cho mọi danh sách; phụ thuộc số quan hệ chưa tải, context, batch size, cache và ORM. [Hibernate batch fetching](https://docs.hibernate.org/orm/7.1/userguide/html_single/#fetching-batch).

Đừng đồng nhất `default_batch_fetch_size` với `hibernate.jdbc.batch_size`: cái đầu giúp **đọc** quan hệ theo nhóm; JDBC batching giúp gom thao tác **ghi**. Tên giống nhau, công việc khác nhau.

Ví dụ để hiểu cách gom, không cam kết SQL count cho mọi version: 36 Product trỏ tới 36 Category chưa tải, batch size 16. Nếu ORM gom tối đa 16 ID mỗi lượt và không có yếu tố khác, có thể hình dung 3 nhóm 16/16/4, cộng query Product là 4 lượt SELECT dữ liệu thay vì 37. Việc padding tham số/chiến lược thực tế có thể khác; kiểm log để biết các ID được gom ra sao. Nếu chỉ đọc Product.name, chưa chạm Category thì không cần các lượt tải Category đó.

## 5. DTO projection: query trực tiếp dữ liệu response

Không cần entity đầy đủ cho một trang danh sách chỉ đọc. Có thể query những cột đúng response cần:

```java
// com.shopcore.product.dto.ProductResponse
@Getter
public class ProductResponse {
    private final Long id;
    private final String name;
    private final String categoryName;

    public ProductResponse(Long id, String name, String categoryName) {
        this.id = id;
        this.name = name;
        this.categoryName = categoryName;
    }
}
```

```java
@Query("""
    select new com.shopcore.product.dto.ProductResponse(p.id, p.name, c.name)
    from Product p join p.category c
    """)
List<ProductResponse> findResponses();
```

JPQL dùng tên entity/field Java, không phải tên bảng/cột SQL. `new` cần tên class đầy đủ và constructor khớp kiểu/thứ tự. Đây là class DTO, không cần record. Query chọn scalar và dựng DTO; response không chứa Category proxy để Jackson vô tình lazy-load. [Spring Data projections](https://docs.spring.io/spring-data/jpa/reference/repositories/projections.html).

Projection không thay mọi Entity ở nghiệp vụ cập nhật. Nếu muốn dirty checking thay đổi Product trong transaction, thường làm việc với entity managed. Danh sách chỉ đọc và thao tác ghi có nhu cầu khác nhau.

## 6. So sánh để chọn có lý do

| Cách | Hợp khi | Điều phải kiểm |
|---|---|---|
| JOIN FETCH | Cần entity và quan hệ đã biết cho use case | Join type, số row, paging nếu fetch collection |
| EntityGraph | Muốn khai báo quan hệ cần tải tại method | SQL thực tế, paging collection |
| Batch | Nhiều LAZY quan hệ cần đọc, không muốn một join lớn | Context, số query, batch size |
| DTO projection | Endpoint đọc cần ít cột cố định | Constructor, null, count/paging và dữ liệu đúng |

Một endpoint cần categoryName không có nghĩa phải fetch Category.products. Fetch sâu nhiều collection có thể nhân dòng, tốn memory hoặc gặp giới hạn ORM. “Ít query” và “ít dữ liệu truyền” cần đo cùng nhau.

**Chọn thử một use case:** list Product chỉ đọc ba field → DTO projection là lựa chọn gọn; Service cần Entity để thực hiện rule rồi update → entity managed cùng fetch plan đủ rule; endpoint đã có LAZY mapping và truy cập nhiều quan hệ trong context → cân nhắc batch. Cả ba đều hợp lý trong điều kiện tương ứng; đề không bắt mọi người trả lời cùng một “pattern tốt nhất”.

## 7. Thử sửa mà vẫn giữ đúng dữ liệu

```text
Chốt response cần gì
 -> Chọn method fetch phù hợp
 -> Gọi trong Service và map DTO
 -> Đối chiếu ID/content/null trước–sau
 -> Xem số SQL và row
 -> Đo thời gian trong cùng điều kiện
```

Trước 4 query và sau 1 query chỉ chứng minh giảm query trong mẫu. Nếu sau sửa mất Product không có Category thì không đạt dù nhanh hơn. Nếu query một lần nhưng join ra hàng chục nghìn dòng thì cũng chưa chứng minh tối ưu.

## 8. Tài liệu, tự luyện và giới hạn

- [HQL mục 3.2.4: fetch joins](https://docs.hibernate.org/orm/7.1/querylanguage/html_single/).
- [Spring EntityGraph](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.entity-graph).
- [Batch fetching](https://docs.hibernate.org/orm/7.1/userguide/html_single/#fetching-batch).
- [DTO projections](https://docs.spring.io/spring-data/jpa/reference/repositories/projections.html).
- Video tùy chọn: tìm `Hibernate join fetch EntityGraph BatchSize DTO projection N+1`; đối chiếu số query và dữ liệu trước/sau.

Tự luyện: list chỉ có Product id/name chọn projection hoặc query Product đủ cột; list cần Category.name có thể fetch to-one hoặc projection; Category chứa nhiều Product cần thận trọng paging ở Lesson 03. Không phải thuộc một “cách tốt nhất cho mọi API”.

Làm [đề Lesson 02](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-10-05__lesson2-lan1.md).
