# Lab Flyway Lesson 01–02: nhìn migration chạy thật

> Cập nhật 2026-10-30: bộ bài học/đề/bài giải Lesson 02 đã bỏ theo yêu cầu người học. Lab này vẫn giữ làm tài liệu thực hành riêng, không phải bài thi bắt buộc. Tên file giữ nguyên để các liên kết cũ vẫn hoạt động.

> Làm trong **shopcore hiện có**, không tạo project mới. Khoảng 60–90 phút, có thể chia hai buổi. Mình cho cấu hình, yêu cầu và SQL quan sát; bạn tự viết ba file migration. Chưa cần Controller/Service/Repository hoặc CRUD.

**Môi trường đã được setup ngày 2026-10-30:** xem [hướng dẫn chạy nhanh](../../../shopcore/FLYWAY_LAB.md). Trên máy hiện tại bạn bỏ qua bước tạo Docker/dependency/profile ở mục 3–5, vì chúng đã được chuẩn bị bằng Compose. Không chạy docker run lần nữa vì trùng tên container. Bắt đầu viết V1 ở mục 7. Password profile hiện có default local khớp Compose, không bắt buộc export env. Các mục setup dưới giữ làm tham khảo cho một máy chưa setup.

## 1. Kết quả cần thấy

Bạn sẽ kiểm chứng:

1. V1 tạo bảng và ghi history.
2. Restart vẫn kiểm tra nhưng không thực thi lại V1.
3. R seed dữ liệu demo, lấy Category ID thật chứ không đoán bằng 1.
4. V2 thêm cột, giữ dòng cũ; khi V2 và R thay đổi cùng lúc, V2 chạy trước.
5. R chạy lại nhưng DO NOTHING không cập nhật giá của SKU đã tồn tại.

**Không mở sẵn cả V1/V2/R để chạy ngay lần đầu.** Tạo file theo từng chặng dưới đây để nhìn thấy thay đổi.

## 2. Chuẩn bị và nguyên tắc an toàn

Đã đọc shopcore ngày 2026-10-23: pom khai báo Boot 4.1.1/Java 21, có Web MVC/Lombok, chưa có JPA/Flyway/pgJDBC. application.properties hiện chỉ có tên app. Product/Category chưa có @Entity.

- Dùng JDK 21, Maven wrapper của shopcore, Docker Desktop đang chạy và IDE.
- DB riêng: **shopcore_flyway_lab**; không dùng DB prod hoặc dữ liệu cần giữ.
- Profile riêng: **flyway-lab**; app ở port 18080, Postgres host port 15432.
- Nếu port/tên container/volume đã được dùng, kiểm tra trước; không xóa đồ cũ để lấy chỗ.
- Không chạy Flyway clean, DROP DATABASE hoặc sửa/xóa history để hết lỗi.
- Mình chỉ tạo tài liệu; các lệnh dưới đây **chưa được chạy thay bạn**.

Kiểm JDK ở Terminal:

```bash
java -version
```

Nếu đang dùng macOS và Terminal chưa chọn 21, có thể chọn cho cửa sổ hiện tại:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
```

Lệnh này cần máy đã cài JDK 21. IntelliJ cũng phải dùng SDK/Maven runner phù hợp.

## 3. Tạo PostgreSQL riêng cho lab

Mở Docker Desktop. Chạy ở Terminal, không cần đứng trong thư mục nào:

```bash
docker run -d --name shopcore-flyway-lab-pg \
  -e POSTGRES_DB=shopcore_flyway_lab \
  -e POSTGRES_USER=flyway_lab \
  -e POSTGRES_PASSWORD=lab_only_change_me \
  -p 127.0.0.1:15432:5432 \
  -v shopcore_flyway_lab_pg17:/var/lib/postgresql/data \
  postgres:17
```

Password trên chỉ là mẫu cho DB local bỏ được, không dùng nơi khác. Không commit password thật. Image 17 được chọn để giữ đường volume PostgreSQL 17 nhất quán, không dùng tag latest rồi đoán đường dữ liệu.

Đợi DB sẵn sàng:

```bash
docker exec shopcore-flyway-lab-pg pg_isready -U flyway_lab -d shopcore_flyway_lab
```

Nếu chưa sẵn sàng, đợi vài giây rồi chạy lại; có thể xem:

```bash
docker logs --tail 50 shopcore-flyway-lab-pg
```

Named volume giữ DB qua restart container. Các POSTGRES_* chỉ khởi tạo khi dữ liệu volume còn mới; đổi env trên volume cũ không tự đổi user/password/database. Nếu trùng container hoặc volume có dữ liệu trước đây, dừng và xác minh, không tự remove/reset.

### Mở cửa sổ SQL để quan sát

```bash
docker exec -it shopcore-flyway-lab-pg psql -U flyway_lab -d shopcore_flyway_lab
```

Chạy trong psql:

```sql
SELECT current_database(), current_user;
```

Kết quả phải là shopcore_flyway_lab và flyway_lab. Đây là kết nối bên trong container nên không cần port 15432; app trên máy sẽ dùng localhost:15432. Không dùng thông tin DB của dự án khác.

Đóng psql bằng `\q`. Các lệnh docker/mvn chạy ngoài psql, không gõ ở prompt SQL.

## 4. Thêm dependency vào shopcore/pom.xml

Thêm bốn dependency này **bên trong dependencies hiện có**, không thay toàn pom, không xóa Web MVC/Lombok, không đổi Boot version:

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

Reload Maven trong IDE. Boot BOM quản lý version; không thêm flyway-core phiên bản bất kỳ để chữa lỗi dependency. [Boot Flyway setup](https://docs.spring.io/spring-boot/how-to/data-initialization.html).

**Giới hạn JPA của lab:** giữ Product/Category hiện tại, chưa bắt đổi sang Entity. Có starter JPA và ddl-auto=validate nhưng không có @Entity thì chưa chứng minh Hibernate đã kiểm mapping products/categories. Lab này kiểm migration qua SQL/history. Không tự tick là đã kiểm thử mapping JPA.

## 5. Tạo cấu hình riêng, không đụng config gốc

Tạo file **shopcore/src/main/resources/application-flyway-lab.properties**:

```properties
server.port=18080
spring.datasource.url=jdbc:postgresql://localhost:15432/shopcore_flyway_lab
spring.datasource.username=flyway_lab
spring.datasource.password=${FLYWAY_LAB_DB_PASSWORD}

spring.flyway.enabled=true
spring.flyway.locations=classpath:db/flyway-lab/migration,classpath:db/flyway-lab/dev
spring.flyway.validate-on-migrate=true
spring.flyway.validate-migration-naming=true

spring.jpa.hibernate.ddl-auto=validate
spring.sql.init.mode=never
logging.level.org.flywaydb=INFO
```

Dùng thư mục SQL riêng cho lab để không trộn với migration dự án sau này. Đây là cùng cơ chế locations của lesson, chỉ khác đường dẫn. Không tạo application.yml song song chỉ để copy ví dụ; không ghi đè application.properties hiện có.

Tạo hai thư mục bên dưới, nhưng chỉ tạo các file SQL khi đến đúng chặng:

```text
shopcore/src/main/resources/
  application.properties                   # giữ nguyên
  application-flyway-lab.properties         # cấu hình bạn vừa tạo
  db/flyway-lab/
    migration/
      V1__create_catalog.sql                 # chặng 1
      V2__add_product_description.sql        # chặng 4, CHƯA tạo ngay
    dev/
      R__demo_catalog.sql                    # chặng 3, CHƯA tạo ngay
```

Profile này dùng hai locations vì DB là lab/dev riêng. Không dùng nó lên production. Sau khi thêm DataSource/JPA dependencies, chạy không profile mà thiếu config DB có thể làm startup fail: đó không phải lý do xóa dependency hay đặt nhầm URL prod.

## 6. Cách chạy/dừng app cho mọi chặng

Mở Terminal tại thư mục **shopcore**, không phải root SOFTWARE_ENGINEER_LEARN. Kiểm:

```bash
./mvnw -version
```

Kết quả phải dùng JDK 21. Nếu wrapper chưa có quyền execute, dùng `sh mvnw` thay `./mvnw` trong các lệnh dưới.

Cấp password mẫu cho cửa sổ Terminal đang chạy app:

```bash
export FLYWAY_LAB_DB_PASSWORD=lab_only_change_me
```

Chạy app, luôn dùng profile lab:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=flyway-lab
```

Chờ startup hoàn tất. Dừng app bằng Ctrl+C, rồi mới chạy lại. Giữ Docker/DB chạy trong suốt lab. **Restart app không phải tạo lại DB.** Nếu chạy IntelliJ, chọn active profile flyway-lab và env FLYWAY_LAB_DB_PASSWORD tương ứng, không cần chạy đồng thời cả IDE lẫn Maven.

## 7. Chặng 1: chỉ V1 tạo schema

Tạo **V1__create_catalog.sql** trong migration. Tự viết SQL theo bảng yêu cầu:

| Bảng/cột | Kiểu và ràng buộc |
|---|---|
| categories.id | BIGINT, GENERATED BY DEFAULT AS IDENTITY, PRIMARY KEY |
| categories.name | TEXT, NOT NULL, UNIQUE |
| products.id | BIGINT, GENERATED BY DEFAULT AS IDENTITY, PRIMARY KEY |
| products.sku | TEXT, NOT NULL, UNIQUE |
| products.name | TEXT, NOT NULL |
| products.price | NUMERIC(12,2), NOT NULL, CHECK > 0 |
| products.category_id | BIGINT, NOT NULL, REFERENCES categories(id) |

Chưa có description, chưa INSERT demo. Tạo bảng Category trước Product. Gợi ý cú pháp đã học: CREATE TABLE, IDENTITY, REFERENCES. Nếu quên, đọc Lesson 01 mục 4 thay vì tạo bảng tay trong công cụ DB.

**Chạy app lần đầu.** Trong psql kiểm:

```sql
SELECT installed_rank, version, description, script, checksum, success
FROM flyway_schema_history
ORDER BY installed_rank;

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'products'
ORDER BY ordinal_position;

SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM products;
```

**Đạt chặng:** có bảng, có V1 success=true, products chưa có description, hai count=0. Không bắt log đúng một câu tiếng Anh; cần chứng minh SQL và history.

## 8. Chặng 2: restart mà không sửa gì

Dừng app, chạy lại đúng lệnh mục 6. Không sửa V1, không xóa DB/history.

Chạy lại SELECT history và count.

**Đạt chặng:** app kiểm migration, V1 không được thực thi lại; history không có thêm một lần V1 success mới, bảng/dữ liệu giữ nguyên. Giải thích một câu: tại sao không lỗi table already exists nếu app đã chạy CREATE trước đó?

## 9. Chặng 3: thêm repeatable seed

Dừng app. Tạo **db/flyway-lab/dev/R__demo_catalog.sql**. Tự viết **hai lệnh trong cùng file, Category trước Product**:

1. Thêm Category tên Demo Books; tên đã có thì không thêm trùng.
2. Thêm Product sku DEMO-JAVA, name Java Book, price 120.00. Lấy category_id bằng SELECT Category có name Demo Books, không hard-code ID. SKU đã có thì DO NOTHING, không update.

Yêu cầu giữ UNIQUE(name), UNIQUE(sku) của V1. Gợi ý: ON CONFLICT ... DO NOTHING giữ dòng cũ khi trùng khóa; INSERT ... SELECT lấy category_id từ dòng Category thực tế. Không điền description vì V2 chưa xuất hiện. Repeatable chạy lần đầu và chạy lại khi checksum đổi, không mặc định chạy mỗi restart; khi có cả V mới và R cần chạy, V chạy trước R.

Chạy app, kiểm history và:

```sql
SELECT p.id, p.sku, p.name, p.price, p.category_id, c.name AS category_name
FROM products p
JOIN categories c ON c.id = p.category_id
WHERE p.sku = 'DEMO-JAVA';

SELECT COUNT(*) FROM categories WHERE name = 'Demo Books';
SELECT COUNT(*) FROM products WHERE sku = 'DEMO-JAVA';
```

**Đạt chặng:** mỗi count=1; Product giá 120.00, FK khớp Category thực tế; history có script R thành công. R không có version số, nên version trong history thường NULL; không kết luận NULL nghĩa là fail.

V1 không chạy lại. Đừng dự đoán Category/Product ID chắc chắn là 1; quan sát ID thật.

## 10. Chặng 4: V2 và R đổi cùng một lần startup

Dừng app. Chỉ lúc này mới:

1. Tạo **V2__add_product_description.sql**: tự viết ALTER thêm description TEXT nullable vào products. Không DROP bảng, không sửa V1, không thêm NOT NULL.
2. Trong R__demo_catalog.sql đổi literal giá seed từ 120.00 thành 130.00; giữ nguyên DO NOTHING theo SKU. Không UPDATE Product bằng tay.

**Trước khi chạy, ghi dự đoán:** V2 hay R trước? Dòng DEMO-JAVA sẽ có giá 120 hay 130? Description dòng cũ sẽ là gì?

Chạy app, kiểm history theo installed_rank và:

```sql
SELECT id, sku, name, price, category_id, description
FROM products
WHERE sku = 'DEMO-JAVA';
```

**Đạt chặng:**

- Có V2 thành công và lần áp dụng R mới sau V2 trong history.
- ID/sku/name/category_id của Product cũ không đổi; description=NULL.
- Giá vẫn **120.00**, dù script mới viết 130: R đã chạy nhưng ON CONFLICT DO NOTHING giữ dòng cũ.
- Không có Product/Category demo trùng. R có thể có nhiều dòng lịch sử các lần áp dụng; đó không phải trùng version V.

**Điểm mấu chốt:** Flyway quyết định script nào chạy; SQL quyết định dữ liệu cuối, không phải cứ script R đổi là DB reset theo nội dung script.

## 11. Chặng 5: restart cuối, giữ nguyên mọi file

Ghi số dòng history, restart app rồi kiểm lại. Không cần nhớ chính xác tổng bao nhiêu dòng cho mọi Flyway version; so trước/sau trên cùng setup.

**Đạt chặng:** không có lần áp dụng V1/V2/R mới, Product vẫn một dòng giá 120.00, description=NULL. Flyway vẫn kiểm history nhưng không có SQL migration mới cần thực thi.

Không tự sửa R sang DO UPDATE để làm giá thành 130 trong lab này. Nếu muốn luyện upsert thì hỏi thêm sau khi đã giữ được bằng chứng DO NOTHING.

## 12. Lỗi hay gặp và cách dừng đúng chỗ

| Hiện tượng | Kiểm trước, không chữa mò |
|---|---|
| Connection refused | Docker/DB đã ready, host port 15432, URL đúng DB lab |
| Password authentication failed | Env password của app khớp volume DB hiện tại; đổi POSTGRES_PASSWORD không đổi DB đã khởi tạo |
| Thiếu FLYWAY_LAB_DB_PASSWORD | Cấp env trong chính Terminal/run configuration chạy app |
| Unsupported DB/no PostgreSQL support | Module flyway-database-postgresql có trong pom, Maven đã reload; không đoán version |
| Không có SQL migration chạy | Active profile, locations, tên file hai underscore và đúng resources |
| History có V1 nhưng bảng thiếu cột V2 | V2 đã được tạo/chạy chưa, có xem đúng DB/schema không |
| Checksum mismatch V1 | Dừng, xem diff, khôi phục đúng file đã áp dụng; không repair/xóa history theo phản xạ |
| Table already exists | Kiểm DB có bị tạo tay hoặc dùng nhầm không; không dùng IF NOT EXISTS để che lệch history |
| Port app bận | Dừng đúng app cũ; không dừng process lạ chỉ để lấy port |

Nếu migration lỗi: gửi tên file, SQL, lỗi gốc và history/schema quan sát được. Chưa làm Lesson 03 thì không tự chạy repair/baseline/clean. Che password/token khi gửi log.

## 13. Nộp kết quả để mình kiểm

Không phải bài thi lý thuyết mới. Khi xong, gửi đường dẫn ba SQL trong shopcore và ghi ngắn theo mẫu, có thể tạo LAB_RESULT.md bên cạnh tài liệu này:

```text
DB thực sự dùng:
JDK/Boot/PostgreSQL:

Chặng 1: log liên quan + history V1 + danh sách cột + count
Chặng 2: history trước/sau restart, V1 có chạy lại không?
Chặng 3: history R + SELECT Product/Category cho thấy FK và giá
Chặng 4: dự đoán ban đầu; history V2 trước R mới; dữ liệu sau chạy
Chặng 5: history trước/sau restart, dữ liệu còn gì?

Điều tôi hiểu sau lab:
1. History khác schema/dữ liệu:
2. R chạy lại khác SQL update một dòng:
3. Tôi đã kiểm chứng JPA mapping chưa? Vì sao?

Lỗi đã gặp/cách sửa (không kèm secret):
```

Log/ảnh chỉ cần phần liên quan. Mình kiểm SQL, thứ tự thực tế, dữ liệu cũ và giải thích của bạn; không cho đạt chỉ vì app khởi động. Chưa chạy thật thì ghi “chưa chạy”, không tự ghi pass. Kết quả lab không tự thay điểm đề hoặc xác nhận toàn module/capstone.

## 14. Dừng sau buổi lab

Ctrl+C để dừng app. Muốn tạm dừng Postgres:

```bash
docker stop shopcore-flyway-lab-pg
```

Lần sau tiếp tục DB cũ:

```bash
docker start shopcore-flyway-lab-pg
```

Kiểm pg_isready rồi chạy app đúng profile. Không chạy lại docker run để “restart”, không xóa named volume. Không có hướng dẫn reset dữ liệu phá hủy trong lab này.

## Tài liệu liên quan

- [Lesson 01](LESSON_01_MIGRATION_VA_SCHEMA_HISTORY.md).
- [Boot database initialization](https://docs.spring.io/spring-boot/how-to/data-initialization.html).
- [Repeatable migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/repeatable-migrations).
- [PostgreSQL Docker official image](https://hub.docker.com/_/postgres): init env, database và persistent volume.

Hướng dẫn đã được rà tĩnh theo shopcore hiện tại; chưa chạy Docker/Flyway/Boot thay bạn trong lượt tạo tài liệu. Không coi file md này là bằng chứng lab đã hoàn thành.
