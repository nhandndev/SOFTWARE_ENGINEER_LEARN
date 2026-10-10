# M2-3 · Lesson 02: Spring Boot, repeatable migration và seed

> Học 60 phút. Cần nắm Lesson 01 và Config/Profiles M1-5. Mục tiêu: hiểu app gọi Flyway thế nào; chọn versioned/repeatable; chia dữ liệu mẫu khỏi production.

**Cần nắm:** ai chạy migration, cấu hình trỏ DB nào, V khác R, seed nào được vào môi trường nào. **Chỉ tra cứu:** tên artifact theo major Boot và các property dài; đề cho cấu hình để bạn phân tích, không bắt thuộc nguyên YAML.

## 1. Ai gọi Flyway?

Bạn không cần gọi `migrate()` trong Controller. Với dependency và DataSource phù hợp, Boot tự cấu hình Flyway rồi chạy migrate khi khởi động. Sau đó JPA dùng schema đã được chuẩn bị. [Spring Boot database initialization](https://docs.spring.io/spring-boot/how-to/data-initialization.html).

```text
Config URL/user/password -> DataSource kết nối PostgreSQL
                         -> Flyway migrate
                         -> JPA kiểm tra mapping
                         -> App sẵn sàng nhận HTTP
```

DataSource cung cấp connection; Flyway thực thi SQL; Hibernate làm ORM. Thêm dependency Flyway không làm mất Repository hay đổi cách Service xử lý nghiệp vụ.

## 2. Dependencies: đọc đúng phiên bản dự án

Đã đối chiếu `shopcore/pom.xml` ngày 2026-10-07: dự án dùng **Spring Boot 4.1.1, Java 21**, hiện có webmvc và Lombok, **chưa có JPA/Flyway/PostgreSQL dependencies**. Snippet dưới là những dependency cần thêm nếu sau này thực hành trên shopcore, không phải khẳng định chúng đã được cài. Giữ parent/BOM của Boot quản lý version.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-flyway</artifactId>
</dependency>
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-database-postgresql</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

Starter JPA cung cấp phần ORM/repository; starter Flyway đưa Flyway và phần tích hợp Boot phù hợp vào classpath; module PostgreSQL hỗ trợ loại DB; JDBC driver cho phép kết nối. Dependency không tự tạo database `shopcore` hoặc user PostgreSQL: DB đích phải được cấp sẵn và account phải có quyền SQL cần dùng.

Nếu mở project Boot 3.5 cũ, setup Flyway thường dùng `org.flywaydb:flyway-core` cùng module PostgreSQL và driver; xem [tài liệu 3.5](https://docs.spring.io/spring-boot/3.5/how-to/data-initialization.html). Đây là ghi chú tương thích, không phải yêu cầu hạ phiên bản shopcore. Bài đang chọn setup Boot 4 theo project hiện tại.

## 3. Configuration dùng được để đọc luồng

`src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/shopcore}
    username: ${DB_USER:shopcore}
    password: ${DB_PASSWORD}
  flyway:
    enabled: true
    locations: classpath:db/migration
    validate-on-migrate: true
    validate-migration-naming: true
  jpa:
    hibernate:
      ddl-auto: validate
  sql:
    init:
      mode: never
```

Giải thích:

- DataSource xác định DB nào bị migrate; thiếu password khi được resolve sẽ làm startup thất bại.
- `locations` chỉ nơi tìm SQL trong classpath.
- `validate-on-migrate` kiểm tra lịch sử trước khi migrate.
- `validate-migration-naming` giúp báo tên file không hợp lệ.
- `ddl-auto: validate`: Hibernate kiểm tra schema phù hợp mapping, không tự sửa schema.
- `sql.init.mode: never`: tránh thêm một cơ chế schema.sql/data.sql tự chạy song song trong ví dụ.

Ví dụ Entity có cột description nhưng migration quên thêm cột: Flyway có thể hoàn tất lịch sử hợp lệ, rồi Hibernate validate báo thiếu cột. Hai cơ chế kiểm tra khác nhau. Nếu migrate thất bại, app chưa sẵn sàng; đây không phải lỗi HTTP do `@RestControllerAdvice` bắt.

Boot khuyến nghị một cơ chế quản lý schema, tránh trộn Flyway với basic SQL initialization. [Nguồn chính thức](https://docs.spring.io/spring-boot/how-to/data-initialization.html).

## 4. Repeatable migration khác versioned thế nào?

| Loại | Ví dụ | Khi dùng |
|---|---|---|
| Versioned | V2__add_description.sql | Bước tiến schema có thứ tự |
| Repeatable | R__product_summary.sql | Định nghĩa có thể thay thế lại, như view |

Repeatable không có số phiên bản. Nó chạy lần đầu, và chạy lại khi checksum thay đổi; trong một lần migrate, các versioned đang chờ chạy trước repeatable cần áp dụng. Việc viết SQL có thể chạy lại an toàn là trách nhiệm của người viết. [Repeatable migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/repeatable-migrations).

Ví dụ `R__product_summary.sql`, sau V1 có products/categories:

```sql
CREATE OR REPLACE VIEW product_summary AS
SELECT p.id, p.sku, p.name AS product_name, c.name AS category_name
FROM products p
JOIN categories c ON c.id = p.category_id;
```

`CREATE OR REPLACE` giúp cùng định nghĩa có thể áp lại khi view đã tồn tại. Nhưng thay đổi kiểu/cấu trúc view có giới hạn PostgreSQL: không được khẳng định mọi thay đổi đều thay thế được. Dùng versioned migration có kế hoạch khi cần đổi cấu trúc không tương thích.

R không mặc định chạy mỗi GET hay mỗi restart nếu nội dung không đổi. R cũng không tự làm một INSERT trùng trở nên an toàn.

## 5. Reference data và demo seed không giống nhau

Reference data là dữ liệu ứng dụng cần để chạy, ví dụ danh sách trạng thái được quy định. Demo seed là vài Product/Category giả để bạn thử API. Không vì dev cần 100 Product mà production cũng cần chúng.

Ta dùng **database riêng cho dev/test/prod** và locations riêng:

```text
src/main/resources/db/migration/V1__create_catalog.sql
src/main/resources/db/dev/R__demo_categories.sql
```

`application-dev.yml`:

```yaml
spring:
  flyway:
    locations: classpath:db/migration,classpath:db/dev
```

Profile prod chỉ dùng locations chung trong application.yml. Kích hoạt dev bằng cấu hình runtime của M1-5. **Đổi profile không xóa demo data đã được ghi**: dùng nhầm DB prod trong profile dev vẫn có thể làm bẩn prod. History cũng thuộc DB đó; không chia sẻ một DB rồi đổi qua lại locations như thể lịch sử tự biến mất.

Với test tự động về sau, có thể đặt seed riêng trong `src/test/resources/db/migration/V9999__test_data.sql`: nó nằm trên test classpath, không đóng gói vào jar production theo cấu trúc Maven thông thường. Version 9999 chỉ là ví dụ cho DB test dùng riêng/dựng lại; không dùng DB test đó để tiếp tục nâng cấp như DB production. Cách test không bắt bạn quay lại học syntax Testing ngay lúc này. [Boot: test-only migrations](https://docs.spring.io/spring-boot/how-to/data-initialization.html#howto.data-initialization.migration-tool.flyway.test-only).

## 6. Seed chạy lại an toàn phải có chủ đích

Ví dụ `R__demo_categories.sql`:

```sql
INSERT INTO categories(name)
VALUES ('Demo Books'), ('Demo Electronics')
ON CONFLICT (name) DO NOTHING;
```

Schema V1 có UNIQUE(name), nên câu này không tạo thêm bản sao tên đã tồn tại. Lần đầu R chạy; nếu sau này đổi nội dung R, script chạy lại và quy tắc chống trùng vẫn có ích.

`DO NOTHING` **không cập nhật** dòng cũ và không bảo đảm mọi dữ liệu mẫu luôn giống script mới. Nếu cần cập nhật, phải thiết kế `DO UPDATE` phù hợp hoặc migration dữ liệu mới. Chỉ dùng cơ chế này với seed có phạm vi rõ; không tự overwrite dữ liệu người dùng.

Tránh hard-code id category=1 trong seed Product rồi nghĩ chắc chắn đúng. Identity có thể đã tiến. Khi cần Product mẫu, tìm Category theo khóa duy nhất rồi lấy ID thực tế, như INSERT...SELECT bạn đã học.

Ví dụ đầy đủ: thêm ngay sau INSERT Category trong cùng file `R__demo_categories.sql` ở trên, với schema Lesson 01, để thứ tự seed rõ ràng:

```sql
INSERT INTO products(sku, name, price, category_id)
SELECT 'DEMO-JAVA', 'Java Book', 120.00, c.id
FROM categories c
WHERE c.name = 'Demo Books'
ON CONFLICT (sku) DO NOTHING;
```

Nếu Category tên Demo Books có id=42 thì Product nhận category_id=42, không đoán id=1. Nếu không có Category đó, SELECT trả 0 dòng nên INSERT thêm 0 dòng; nó không tự tạo Category và cũng không nhất thiết ném lỗi FK. Vì thế seed cần kiểm số dòng/kết quả mong đợi, nối kiến thức affected rows của M2-2. Nếu SKU đã có thì DO NOTHING giữ dòng cũ, không “sửa” Product cũ cho khớp script.

## 7. Tự trace ba lần startup

Giả định dev DB trống, V1 và R demo hợp lệ:

1. Lần đầu: V1 tạo schema, R seed dữ liệu, JPA validate.
2. Lần hai không đổi file: V1 không chạy lại, R không đổi checksum nên không chạy lại.
3. Thêm V2 và thay nội dung R: V2 chạy trước, R chạy lại sau. Không được sửa V1 đã phát hành để thêm thay đổi mới.

## 8. Tài liệu và tự kiểm tra

- [Boot initialization](https://docs.spring.io/spring-boot/how-to/data-initialization.html): phần Flyway, locations và test data; dùng đúng major project.
- [Repeatable](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/repeatable-migrations): checksum và thứ tự.
- [PostgreSQL INSERT](https://www.postgresql.org/docs/current/sql-insert.html): tra ON CONFLICT; đọc kỹ DO NOTHING/DO UPDATE.
- Video tùy chọn: tìm `Spring Boot Flyway PostgreSQL repeatable migrations profiles seed data`; chọn video dùng cùng major Boot với dự án.

Tự trả lời: ai tạo cột? ai kiểm Entity? seed vào DB nào? restart có tự chạy lại R không?

Làm [đề Lesson 02](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-05__lesson2-lan1.md).
