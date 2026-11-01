# Lab Flyway độc lập: mang file này sang folder mới

> Bạn tự làm trong folder/project riêng theo lựa chọn của bạn. Chỉ cần file này, không cần copy repo học cũ. File cung cấp cấu hình và yêu cầu; **không làm SQL migration thay bạn**.

## 1. Context cho bạn và agent ở folder mới

- Đã học lý thuyết Flyway Lesson 01–02, muốn thử V1/V2, repeatable và history.
- Dùng Java 21, Maven, Spring Boot. Bản đã kiểm trong repo cũ là Boot **4.1.1**.
- PostgreSQL Docker đã được setup trên **cùng máy** ngày 2026-10-30. Đổi folder không làm mất container/DB.
- Đã kiểm kết nối và context ở project cũ: lúc đó DB chỉ có flyway_schema_history rỗng, chưa có bảng Category/Product. Đây là trạng thái lúc kiểm, không bảo đảm DB vẫn trống sau khi bạn tự chạy.
- Không chạy đồng thời hai project vào cùng DB lab. Chỉ app bạn đang thực hành được phép migrate DB này.
- Agent giúp setup/giải thích/debug; giữ SQL cho người học tự viết, không tự cho pass hoặc đánh dấu lab đã xong.

## 2. PostgreSQL đang có, không tạo Docker lần nữa

| Thông tin | Giá trị |
|---|---|
| Container | shopcore-flyway-lab-pg |
| Host | localhost |
| Host port | 15432 |
| DB | shopcore_flyway_lab |
| User | flyway_lab |
| Password mẫu local | lab_only_change_me |
| JDBC URL | jdbc:postgresql://localhost:15432/shopcore_flyway_lab |

Password chỉ dùng DB local lab, không dùng nơi khác. DB/volume không phụ thuộc folder project.

Kiểm container ở Terminal bất kỳ:

```bash
docker ps -a --filter name=shopcore-flyway-lab-pg
```

Nếu container có nhưng đang dừng:

```bash
docker start shopcore-flyway-lab-pg
```

Chờ kết quả accepting connections:

```bash
docker exec shopcore-flyway-lab-pg pg_isready -U flyway_lab -d shopcore_flyway_lab
```

Không chạy docker run/compose từ folder mới: DB đã tồn tại. Nếu không thấy container, báo agent kiểm Docker context/máy đang dùng, **không tự xóa hoặc reset DB**. Nếu chuyển sang máy khác thì các thông tin trên chưa tạo DB trên máy đó; cần setup mới riêng trước khi thực hành.

## 3. Chuẩn bị project trong folder mới

Nếu đã có project Spring Boot Maven, dùng project đó và kiểm dependencies/config sẵn có trước khi sửa. Nếu mới có folder trống, dùng Spring Initializr tạo Maven/Java 21 project tên **shopcore**, giải nén vào folder bạn muốn làm. Không cần code CRUD.

Chọn một bản Boot stable tương thích Java 21; hướng dẫn dưới nhắm **Boot 4.x**. Không mặc định phiên bản Initializr đang chọn giống repo cũ. Với Boot 3.x, nhờ agent chỉnh tích hợp Flyway đúng major trước khi dùng dependency starter Boot 4.

Các dependency cần có trong dependencies của pom, không thêm trùng và không xóa cấu hình có sẵn:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webmvc</artifactId>
</dependency>
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

Giữ parent/BOM Boot quản lý version. Reload Maven. Web MVC giúp app chạy như web app khi quan sát; chưa cần endpoint. [Boot Flyway initialization](https://docs.spring.io/spring-boot/how-to/data-initialization.html).

**Không bắt tạo Entity:** chỉ quan sát Flyway qua SQL/history. Khi chưa có @Entity, ddl-auto=validate không chứng minh mapping products/categories đã được kiểm. Đừng thêm Entity có description ngay từ V1 vì V1 chưa có cột đó.

## 4. File cấu hình cho sẵn

Tạo **src/main/resources/application-flyway-lab.properties**:

```properties
server.port=18080
spring.datasource.url=jdbc:postgresql://localhost:15432/shopcore_flyway_lab
spring.datasource.username=flyway_lab
spring.datasource.password=${FLYWAY_LAB_DB_PASSWORD:lab_only_change_me}

spring.flyway.enabled=true
spring.flyway.locations=classpath:db/flyway-lab/migration,classpath:db/flyway-lab/dev
spring.flyway.validate-on-migrate=true
spring.flyway.validate-migration-naming=true

spring.jpa.hibernate.ddl-auto=validate
spring.sql.init.mode=never
logging.level.org.flywaydb=INFO
```

Không thay config mặc định chứa dữ liệu khác. Password fallback là mẫu local khớp DB đã tạo; nếu env FLYWAY_LAB_DB_PASSWORD đang có giá trị khác, nó sẽ thắng default và có thể làm kết nối lỗi.

Cấu trúc resources, tạo SQL **theo từng chặng**, không tạo sẵn cả ba:

```text
src/main/resources/
  application-flyway-lab.properties
  db/flyway-lab/
    migration/
      V1__create_catalog.sql             # chặng A
      V2__add_product_description.sql    # chặng D
    dev/
      R__demo_catalog.sql                # chặng C
```

## 5. Kiểm DB trước khi làm SQL

Ở Terminal bất kỳ:

```bash
docker exec -it shopcore-flyway-lab-pg psql -U flyway_lab -d shopcore_flyway_lab
```

Trong psql:

```sql
SELECT current_database(), current_user;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
```

Nếu có history thì xem:

```sql
SELECT installed_rank, version, description, script, checksum, success
FROM flyway_schema_history ORDER BY installed_rank;
```

Nếu history chưa tồn tại thì chưa migrate, không phải lý do tạo bảng history bằng tay. Nếu V1/V2 đã có, dừng để đối chiếu file đã dùng: **không soạn một V1 khác vào cùng DB rồi hy vọng chạy lại từ đầu**. Muốn làm lại từ đầu phải chủ động chọn DB mới được cấp riêng; chưa được tự drop DB/volume hiện tại.

Trong psql, `\q` để thoát. Lệnh mvn/docker chạy ở Terminal thường, không gõ vào prompt SQL.

## 6. Chạy app trong folder mới

Mở Terminal tại **folder chứa pom.xml của project bạn đang làm**. macOS chọn JDK 21:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
```

Kiểm wrapper:

```bash
sh mvnw -version
```

Chạy app với profile lab:

```bash
sh mvnw spring-boot:run -Dspring-boot.run.profiles=flyway-lab
```

Nếu không có wrapper nhưng Maven đã cài, dùng `mvn` thay `sh mvnw`. Trên Windows dùng mvnw.cmd với cùng arguments. Trong IDE chọn JDK 21 và active profile flyway-lab. Không mở đồng thời app cũ ở port 18080 hoặc hai writer cùng migrate DB.

Ctrl+C để dừng app trước mỗi lần sửa file/chạy lại; giữ DB container chạy. Không cần startup ngay trước khi đã viết V1; thư mục migration trống không phải hoàn thành bài.

## 7. Chặng A: tự viết V1, chạy lần đầu

Tạo **V1__create_catalog.sql** theo yêu cầu:

| Bảng/cột | Kiểu/ràng buộc |
|---|---|
| categories.id | BIGINT, GENERATED BY DEFAULT AS IDENTITY, PRIMARY KEY |
| categories.name | TEXT, NOT NULL, UNIQUE |
| products.id | BIGINT, GENERATED BY DEFAULT AS IDENTITY, PRIMARY KEY |
| products.sku | TEXT, NOT NULL, UNIQUE |
| products.name | TEXT, NOT NULL |
| products.price | NUMERIC(12,2), NOT NULL, CHECK(price > 0) |
| products.category_id | BIGINT, NOT NULL, REFERENCES categories(id) |

Category tạo trước Product; **chưa có description và chưa INSERT demo**. Không tạo bảng bằng tay trong DB tool, vì cần Flyway áp dụng và ghi history.

Chạy app, dùng psql/công cụ DB kiểm:

```sql
SELECT installed_rank, version, script, success
FROM flyway_schema_history ORDER BY installed_rank;

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'products'
ORDER BY ordinal_position;

SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM products;
```

**Kỳ vọng:** V1 thành công, hai bảng có cấu trúc yêu cầu, chưa description, hai count=0. Xong chặng A là có thể gửi kiểm tra ngay, chưa cần làm hết.

## 8. Chặng B: restart, không sửa file

Ctrl+C rồi chạy lại cùng lệnh. So history trước/sau.

**Kỳ vọng:** V1 không được thực thi lại, không có thêm lần áp dụng V1; app vẫn kiểm lịch sử khi startup. Giải thích vì sao không lỗi table already exists.

## 9. Chặng C: tự viết repeatable seed

Dừng app. Tạo **R__demo_catalog.sql** trong thư mục dev, gồm hai lệnh theo thứ tự:

1. Thêm Category name=Demo Books, đã có tên thì DO NOTHING.
2. Thêm Product sku=DEMO-JAVA, name=Java Book, price=120.00. Tìm Category Demo Books bằng SELECT và dùng id thực tế, không hard-code 1. Đã có SKU thì DO NOTHING.

Gợi ý dùng INSERT...SELECT và ON CONFLICT, cần UNIQUE đã tạo trong V1. Không có sẵn SQL lời giải để bạn tự viết.

Chạy app, kiểm:

```sql
SELECT p.id, p.sku, p.name, p.price, p.category_id, c.name AS category_name
FROM products p JOIN categories c ON c.id = p.category_id
WHERE p.sku = 'DEMO-JAVA';

SELECT COUNT(*) FROM categories WHERE name = 'Demo Books';
SELECT COUNT(*) FROM products WHERE sku = 'DEMO-JAVA';
```

**Kỳ vọng:** mỗi count=1, FK đúng Category, giá 120.00, history ghi R thành công. R không có version số; version=NULL trong history không phải fail.

## 10. Chặng D: V2 mới và R thay đổi

Dừng app, làm hai việc cùng lúc:

1. Tạo **V2__add_product_description.sql** để thêm description kiểu TEXT nullable. Giữ bảng/dữ liệu; không sửa V1 và không thêm NOT NULL.
2. Trong R đổi giá 120.00 thành 130.00 nhưng vẫn DO NOTHING theo SKU. Không sửa dữ liệu Product bằng tay.

Ghi dự đoán file nào chạy trước, giá sẽ là 120 hay 130. Chạy app rồi kiểm history và:

```sql
SELECT id, sku, name, price, category_id, description
FROM products WHERE sku = 'DEMO-JAVA';
```

**Kỳ vọng:** V2 áp dụng trước R mới; dòng cũ giữ id/name/FK, description=NULL, giá vẫn **120.00**. R có chạy lại nhưng DO NOTHING không update dòng cũ. Không nhân bản Product.

Restart thêm lần nữa không đổi file: không áp dụng lại V1/V2/R, dữ liệu giữ nguyên. Không dùng giá trị checksum cụ thể trong đáp án: chỉ so thay đổi trên DB thật của bạn.

## 11. Khi lỗi, gửi gì?

- Tên/version Boot, JDK và active profile.
- File SQL đang viết và log lỗi gốc, che secret.
- DB hiện kết nối là DB nào, history có gì, đã tới chặng nào.
- Chưa học xử lý recovery thì không tự repair/baseline/clean để bỏ lỗi.

Connection refused: kiểm container ready/URL/port. Authentication failed: kiểm password thực tế/env. Checksum mismatch: dừng, kiểm file version cũ đã bị sửa không. File không chạy: kiểm locations/naming. App ready không chứng minh SQL/constraint/FK đúng; phải xem bằng chứng DB.

## 12. Mẫu gửi agent kiểm lab

```text
Tôi đang làm trong project/folder: ...
Chặng đã làm: A/B/C/D
SQL tôi viết: ...
Log Flyway liên quan: ...
History trước/sau: ...
Kết quả SELECT schema/dữ liệu: ...
Dự đoán ban đầu và quan sát thực tế: ...
Nhờ kiểm đúng phần tôi làm, không viết phần còn lại thay tôi.
```

Mục tiêu là quan sát đúng cơ chế, không phải học thuộc log. Chỉ khi có kết quả thực tế mới công nhận chặng đã hoàn thành. File này không tự đổi điểm bài thi hoặc tiến độ trong repo học cũ.

Xong buổi: Ctrl+C dừng app. Nếu muốn tạm dừng riêng DB:

```bash
docker stop shopcore-flyway-lab-pg
```

Không xóa volume, không stop/start toàn bộ container khác ở folder mới. Lần sau dùng docker start như mục 2; không cần compose file của repo cũ.
