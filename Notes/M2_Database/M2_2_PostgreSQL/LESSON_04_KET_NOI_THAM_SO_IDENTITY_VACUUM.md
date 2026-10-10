# M2-2 - Lesson 04: Kết nối, tham số, ID tự sinh và VACUUM

> **Mục tiêu:** nhìn được đường đi từ Repository tới PostgreSQL; phân biệt SQL có tham số với ghép chuỗi; giải thích ID tự sinh và vì sao PostgreSQL cần dọn phiên bản dòng cũ. Bài này để hiểu và nhận diện, **không yêu cầu dựng database hay code project mới**.

## Tài liệu / video liên quan

1. [pgJDBC: kết nối và JDBC URL](https://jdbc.postgresql.org/documentation/use/) - URL, port, driver.
2. [Spring Boot: SQL databases](https://docs.spring.io/spring-boot/reference/data/sql.html) - `spring.datasource.*` và `DataSource`.
3. [Java 21: `PreparedStatement`](https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/PreparedStatement.html) - dấu `?` và các `setXxx`.
4. [Spring Data JPA: query methods](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html) - derived query và tham số `@Query`.
5. [PostgreSQL: identity columns](https://www.postgresql.org/docs/current/ddl-identity-columns.html) và [sequence functions](https://www.postgresql.org/docs/current/functions-sequence.html) - ID tự sinh, khoảng trống ID.
6. [PostgreSQL: routine vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html) - lý do cần dọn và autovacuum.

Video tùy chọn: tìm `PostgreSQL JDBC PreparedStatement SQL injection demo`, `PostgreSQL identity sequence gaps`, `PostgreSQL MVCC autovacuum explained`. Ưu tiên video có hiển thị câu SQL và dữ liệu trước/sau.

## 1. Nối với ba lesson trước

- Lesson 01: kiểu dữ liệu và constraint quyết định **giá trị nào hợp lệ**.
- Lesson 02: `INSERT`/`UPDATE`/`DELETE` quyết định **dòng nào bị thay đổi**.
- Lesson 03: transaction quyết định **những thay đổi nào cùng commit/rollback**.
- Lesson 04: ứng dụng **gửi lệnh và giá trị** tới PostgreSQL thế nào; DB **cấp ID** và **dọn phiên bản dòng cũ** thế nào.

Tưởng tượng endpoint `GET /api/products?sku=BK-01`:

```text
HTTP request
  -> Controller nhận sku
  -> Service áp dụng quy tắc nghiệp vụ
  -> Repository gọi JPA/JDBC với sku là tham số
  -> DataSource cấp connection từ pool
  -> pgJDBC (driver) giao tiếp với PostgreSQL
  -> PostgreSQL tìm dòng, trả dữ liệu
  -> Repository/Service tạo response DTO
  -> Controller trả JSON
```

`DataSource` quản lý cách lấy connection; `pgJDBC` là driver nói chuyện với PostgreSQL qua JDBC. Chúng **không** thay thế Controller, Service hay Repository. `@Transactional` của Lesson 03 quyết định ranh giới giao dịch quanh những lời gọi truy cập DB khi được cấu hình phù hợp.

## 2. Kết nối PostgreSQL: URL, driver, cấu hình

Ví dụ JDBC URL:

```text
jdbc:postgresql://localhost:5432/shopcore
     ^ driver      ^ host    ^ port ^ tên database
```

`5432` là port PostgreSQL mặc định; `shopcore` ở cuối là **tên database**, không phải tên bảng hoặc tên Java project. URL chỉ cho biết **đi đâu**; vẫn cần user/password có quyền phù hợp. Driver `org.postgresql:postgresql` phải có trên classpath. Với Java hiện đại, không cần tự `Class.forName("org.postgresql.Driver")`. [pgJDBC](https://jdbc.postgresql.org/documentation/use/).

Ví dụ cấu hình **minh họa khi sau này dùng PostgreSQL**, không phải cấu hình đang chạy trong repo:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/shopcore
    username: ${DB_USER}
    password: ${DB_PASSWORD}
```

Spring Boot đọc `spring.datasource.*` để cấu hình `DataSource`; thường suy ra driver từ URL. Nếu dùng Maven với Spring Boot dependency management, dependency driver thường là:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

Muốn dùng JPA còn cần starter Data JPA; chỉ thêm driver **không tự sinh Repository JPA**. `shopcore/pom.xml` hiện có Web MVC và Lombok, **chưa có** JPA/pgJDBC; mini project M1-3 dùng JPA với **H2**, không phải PostgreSQL. Vì vậy đừng sao chép đoạn YAML rồi nghĩ các ví dụ dưới đây đã chạy trong project hiện tại. [Spring Boot SQL databases](https://docs.spring.io/spring-boot/reference/data/sql.html).

**Phân biệt ba lỗi hay gặp:**

| Hiện tượng | Nghi ngờ đầu tiên |
|---|---|
| Không có driver phù hợp | Thiếu dependency pgJDBC |
| Connection refused | Host/port sai hoặc PostgreSQL chưa nhận kết nối |
| Authentication failed | User/password/quyền không khớp |

Đây là gợi ý chẩn đoán, không phải mọi nguyên nhân có thể xảy ra. Không commit password thật lên Git; biến môi trường cũng cần được quản lý an toàn.

## 3. Vì sao phải bind tham số?

Giả sử cần tìm Product theo SKU do người dùng nhập. **Sai**:

```java
String sql = "SELECT id, sku, name FROM products WHERE sku = '" + sku + "'";
```

Giá trị `sku` bị ghép thẳng vào **cấu trúc câu SQL**. Input có dấu nháy có thể làm câu lệnh hỏng; input ác ý có thể đổi nghĩa lệnh. Không thể coi kiểm tra ở frontend là đủ.

**Đúng với JDBC** (ví dụ độc lập, giả sử đã có `Connection connection`):

```java
String sql = "SELECT id, sku, name FROM products WHERE sku = ?";
try (PreparedStatement ps = connection.prepareStatement(sql)) {
    ps.setString(1, sku);  // vị trí 1 là dấu ? thứ nhất
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            System.out.println(rs.getLong("id") + ": " + rs.getString("name"));
        }
    }
}
```

Ý chính: **cấu trúc query được viết cố định, giá trị đi qua chỗ giữ chỗ**. Nếu `sku` chứa dấu nháy hoặc chữ trông giống SQL, nó vẫn là **giá trị SKU**, không biến thành toán tử SQL. JDBC dùng `?` theo vị trí; `setString(1, sku)` điền dấu thứ nhất. `PreparedStatement` là API bind tham số; không nên suy từ tên gọi rằng PostgreSQL luôn tạo và cache một server-side prepared plan cho mọi lần chạy, vì pgJDBC có cơ chế riêng. [Java `PreparedStatement`](https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/PreparedStatement.html), [pgJDBC server prepare](https://jdbc.postgresql.org/documentation/server-prepare/).

**Đúng với Spring Data JPA** (giả sử có entity `Product` với property `sku`):

```java
interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySku(String sku);

    @Query("select p from Product p where p.sku = :sku")
    Optional<Product> findBySkuExplicit(@Param("sku") String sku);
}
```

`findBySku` là derived query, framework xây truy vấn dựa trên tên method và truyền `sku` làm **giá trị**. Trong `@Query`, `:sku` là tham số có tên. Đây là **JPQL**: `Product` và `p.sku` nói tới entity/property, không phải bảng/cột SQL. Không cần tự nối `"... '" + sku + "'"`. [Spring Data JPA query methods](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html).

### Giới hạn quan trọng

Bind tham số bảo vệ **giá trị**. Bạn không thể thay `ORDER BY ?` bằng tên cột tùy ý rồi mong `?` trở thành SQL identifier. Nếu client được chọn sort, hãy giới hạn vào danh sách field/hướng sort cho phép, ví dụ `name`/`price` và `asc`/`desc`, rồi dùng API sort phù hợp. Binding cũng **không** tự giải quyết kiểm tra quyền, validation, constraint hay thiếu `WHERE` trong `UPDATE`/`DELETE`.

## 4. ID tự sinh: identity và sequence

Ví dụ schema của các lesson trước:

```sql
CREATE TABLE categories (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);
```

Khi `INSERT` bỏ `id`, PostgreSQL dùng **sequence gắn với identity** để cấp một giá trị. `BY DEFAULT` cho phép bạn cố ý truyền `id` tường minh (như `id=3` trong Lesson 03). Nếu muốn DB tự cấp ID trong ví dụ bình thường:

```sql
INSERT INTO categories (name)
VALUES ('Stationery')
RETURNING id, name;
```

`RETURNING` trả về ID **thực tế**, không cần đoán. `IDENTITY` **không tự đảm bảo duy nhất**: `PRIMARY KEY` trong schema mới đảm bảo điều đó. [PostgreSQL identity columns](https://www.postgresql.org/docs/current/ddl-identity-columns.html).

Chèn ID tường minh với `BY DEFAULT` không tự đẩy sequence lên `max(id)`. Nếu seed Category id 1/2 bằng tay rồi để lần INSERT sau tự sinh, sequence vẫn có thể cấp 1 và PK chặn. Với dữ liệu mẫu, ưu tiên để DB sinh ID và lấy `RETURNING`; nếu bắt buộc import ID cũ, việc đồng bộ sequence phải có kế hoạch riêng trên đúng DB, không reset sequence tùy tiện khi có ghi đồng thời.

Đừng tạo ID bằng `SELECT max(id) + 1`: hai request đồng thời có thể cùng tính ra một số. Đừng suy `id=11` chắc chắn xuất hiện sau `id=10`. Sequence có thể có khoảng trống, chẳng hạn transaction lấy số rồi rollback; việc lấy số sequence **không được rollback như dữ liệu bảng**. Đây là lý do ID dùng để **định danh**, không dùng để đếm số bản ghi hoặc suy ra mọi thao tác đã commit. [PostgreSQL sequence functions](https://www.postgresql.org/docs/current/functions-sequence.html).

Trong JPA, ví dụ `@GeneratedValue(strategy = GenerationType.IDENTITY)` biểu thị chiến lược ID do DB cấp; cách ánh xạ cụ thể phụ thuộc entity và dialect. Mục tiêu ở đây là hiểu ai cấp ID và vì sao không tự tính, chưa cần thuộc mọi annotation.

## 5. Tại sao `UPDATE`/`DELETE` cần VACUUM?

Lesson 03 cho biết transaction khác nhau có thể nhìn thấy dữ liệu theo thời điểm khác nhau. PostgreSQL sử dụng **MVCC**: khi `UPDATE`, nó tạo một phiên bản dòng mới; bản cũ có thể còn cần cho transaction đang đọc. Khi `DELETE`, dòng bị đánh dấu để những transaction phù hợp không còn thấy, nhưng không có nghĩa mọi byte lập tức biến mất.

Ví dụ khái niệm:

```text
Ban đầu: Product A giá 100
UPDATE giá 120
Phiên bản cũ (100) có thể còn cần cho transaction cũ
Phiên bản mới (120) được thấy theo quy tắc visibility
Sau khi không ai còn cần bản cũ -> có thể dọn/tái sử dụng không gian
```

**VACUUM** xử lý các phiên bản dòng đã chết khi an toàn để dọn; việc này góp phần kiểm soát bloat và duy trì hoạt động của PostgreSQL. **Autovacuum** tự động chạy công việc bảo trì (bao gồm VACUUM và ANALYZE khi cần); cấu hình mặc định thường đã bật. Không nên tắt autovacuum chỉ vì nhìn thấy nó dùng tài nguyên. [PostgreSQL routine vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html).

`VACUUM` **không** phải rollback và không sửa một `UPDATE` sai thành đúng. Nó cũng không có nghĩa file bảng sẽ luôn lập tức nhỏ đi trên đĩa: VACUUM thường cho phép tái sử dụng chỗ trống trong bảng; `VACUUM FULL` là thao tác khác, khóa mạnh hơn và không dùng như việc bảo trì tùy tiện. Transaction mở quá lâu có thể khiến phiên bản cũ chưa được dọn vì vẫn có thể cần cho việc đọc. [PostgreSQL routine vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html), [PostgreSQL VACUUM](https://www.postgresql.org/docs/current/sql-vacuum.html).

Ở mức Backend/AI Engineer hiện tại, bạn chỉ cần **nhận diện** các ý này, chưa cần chỉnh tham số autovacuum hoặc tối ưu vận hành production.

## 6. Tự kiểm tra nhanh

1. URL `jdbc:postgresql://localhost:5432/shopcore` cho biết những gì, chưa cho biết những gì?
2. Vì sao thiếu pgJDBC không thể chữa bằng cách chỉ đổi username?
3. Trong `WHERE sku = ?`, input có dấu nháy trở thành gì?
4. Vì sao `ORDER BY ?` không phải cách chọn cột sort an toàn?
5. `GENERATED BY DEFAULT AS IDENTITY` và `PRIMARY KEY` có cùng nhiệm vụ không?
6. Sau rollback, vì sao ID tiếp theo có thể nhảy số?
7. `UPDATE` tạo phiên bản mới liên quan gì tới VACUUM?
8. VACUUM có hoàn tác một thao tác ghi sai không?

Bạn trả lời bằng lời của mình được, không cần thuộc cú pháp. Đề có điểm và tình huống cụ thể nằm ở [bài kiểm tra Lesson 04](../../../Exams/de-kiem-tra/M2-2-postgres__2026-10-05__lesson4-lan1.md).

## 7. Chốt bài

```text
Config + driver + DataSource -> kết nối DB.
PreparedStatement / JPA parameter -> gửi giá trị, không ghép vào cấu trúc SQL.
Identity + sequence -> DB cấp ID; PK mới bảo đảm duy nhất; ID có thể nhảy.
MVCC -> có phiên bản dòng cũ; VACUUM/autovacuum dọn khi an toàn.
```

Hoàn thành bốn bài học **không đồng nghĩa đã pass M2-2**. Trạng thái module chỉ đổi theo quy trình chấm và ngưỡng điểm trong roadmap.
