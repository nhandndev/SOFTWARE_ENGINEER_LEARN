# M2-3 · Lesson 01: hiểu Flyway từ một lần thêm cột

> Viết lại ngày 2026-10-23 sau khi rà bài học và cách người học trả lời. Học 45–60 phút, có thể chia hai lượt. Mục tiêu: nhìn file SQL, database thật và lịch sử rồi giải thích được chuyện gì xảy ra. Chưa cần cài Flyway hay code project.

**Cách đọc:** đi theo một câu chuyện: app cần thêm description cho Product. Trước tiên phân biệt bốn thứ ở mục 1, xem SQL ở mục 4, rồi trace history và startup ở mục 5–7. Không cần thuộc định nghĩa, thuật toán checksum hoặc mọi cột của history.

## 1. Bốn thứ không phải một: Entity, schema, dữ liệu và migration

Bạn đã viết Controller/Service/Repository. Giả sử app cũ có Product chỉ gồm id và name; tính năng mới cần thêm mô tả.

| Thứ đang nói | Ví dụ | Ý nghĩa |
|---|---|---|
| Entity Java | Product có field description | Mapping/model mà code cần |
| Schema database | products có cột description TEXT | Cấu trúc thực tế của bảng |
| Dữ liệu nghiệp vụ | Product 10 tên Java Book | Các dòng đang lưu trong bảng |
| Migration SQL | ALTER TABLE ... ADD COLUMN ... | Bước thay đổi database có tên/version |

**Thêm field Java không đồng nghĩa đã thêm cột DB.** Trong bài này Hibernate chỉ kiểm schema, không tự update. Flyway cũng không đọc Entity rồi tự viết SQL thay bạn.

Ví dụ Entity tối giản để hình dung, không phải project hoàn chỉnh:

```java
@Entity
@Table(name = "products")
public class Product {
    @Id
    private Long id;
    private String name;
    private String description;
}
```

Entity cần description, nhưng bảng thật mới có id/name thì code và DB chưa khớp. Việc cần làm là áp dụng SQL thêm cột vào **đúng database**.

### Cùng schema không có nghĩa cùng dữ liệu

Hai DB có cùng bảng products(id, name, description) nhưng có thể lưu:

| DB dev | DB deploy |
|---|---|
| Product 10: Java Book | Product 21: Keyboard |
| Product 11: Pen | Product 22: Mouse |

Cấu trúc giống nhau; dòng dữ liệu khác nhau. Migration thêm cột không tự copy các Product từ dev sang deploy. Đây không phải cơ chế đồng bộ dữ liệu giữa hai DB.

**Tự nói lại:** “Schema là bảng trông như thế nào; dữ liệu là các dòng đang nằm trong bảng.”

## 2. Flyway làm gì, trên database nào?

Nếu chỉ chạy ALTER bằng tay trên dev, deploy chưa nhận thay đổi. Ta lưu SQL vào Git và để Flyway áp dụng theo lịch sử của từng DB.

```text
File SQL trong repo
-> Flyway dùng connection tới một DB cụ thể
-> đọc history của DB đó
-> xác định bước chưa áp dụng
-> gửi SQL cho PostgreSQL thực thi
-> ghi history khi thành công
```

Ý nghĩa:

1. Có file trong repo chỉ chứng minh có kế hoạch thay đổi.
2. Connection quyết định DB thật nào nhận SQL; tên folder hoặc tên profile không tự thay thế connection.
3. History thuộc DB đang kết nối, không phải lịch sử Git.
4. PostgreSQL thực hiện SQL; Flyway điều phối thứ tự và ghi nhận.
5. Versioned migration đã thành công không tự thực thi lại mỗi lần migrate trong các ví dụ thông thường của bài.

### Ví dụ chạy nhầm DB đích

| DB | History hiện có | Cột products |
|---|---|---|
| shopcore_dev | V1, V2 | id, name, description |
| shopcore | V1 | id, name |

Bạn migrate vào shopcore_dev thì shopcore vẫn chưa có description. Cần xác nhận đúng URL/DB/schema rồi migrate shopcore theo quy trình phát hành phù hợp.

Sau đó kiểm **hai bằng chứng riêng**: history có V2 thành công và bảng thật có description. Chưa cần thuộc SQL introspection; dùng công cụ DB xem cũng được.

Đây là mô hình học, không hướng dẫn thử SQL tùy tiện trên production. [Cơ chế versioned migration](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/versioned-migrations).

## 3. Đặt tên và xếp thứ tự: không theo ai commit Git trước

Thư mục mặc định:

```text
src/main/resources/db/migration/
  V1__create_catalog.sql
  V2__add_product_description.sql
  V3__index_description.sql
```

Trong `V2__add_product_description.sql`:

| Phần | Nghĩa |
|---|---|
| V | Versioned migration |
| 2 | Version |
| __ | Hai underscore phân cách mặc định |
| add_product_description | Mô tả để người đọc biết mục đích |
| .sql | Script SQL |

Một underscore như V2_add_description.sql không khớp naming mặc định. Việc file sai tên bị bỏ qua hay báo lỗi còn tùy kiểm naming; Lesson 02 cho cấu hình. Hiện tại chỉ cần biết **đúng folder chưa đủ, tên cũng phải đúng**.

V2 đứng trước V10 theo giá trị version, không theo thứ tự chữ của tên file. Các version trong cùng tập migration phải duy nhất.

### Hai người cùng đặt V2 thì làm gì?

Chưa ai phát hành hai file dưới đây lên DB cần giữ:

```sql
-- Nhánh An: V2__add_description.sql
ALTER TABLE products ADD COLUMN description TEXT;

-- Nhánh Bình: V2__index_description.sql
CREATE INDEX idx_products_description ON products(description);
```

Không thể giữ cả hai version 2. Cũng không có luật “ai commit Git trước được chạy trước”.

Đọc SQL để biết phụ thuộc:

```text
Muốn tạo index trên description -> description phải tồn tại
-> V2 phải thêm cột
-> V3 mới tạo index
```

Nếu index commit trước trong Git, nó vẫn cần chạy **sau bước thêm cột**. Team thống nhất version theo thứ tự hợp lệ rồi xử lý nhánh chưa phát hành. Nếu V2 thêm cột đã chạy trên DB chung, giữ nguyên V2 và thêm index bằng version mới chưa dùng.

**Nhớ:** Git giữ code/script; version thể hiện thứ tự áp dụng schema. Hai loại thứ tự không thay thế nhau.

## 4. Theo dõi một thay đổi từ SQL đến bảng thật

Các SQL sau là một chuỗi minh họa, không giả định đã chạy trong shopcore. DB mới ban đầu trống.

### Bước đầu: V1 tạo bảng

```sql
-- V1__create_catalog.sql
CREATE TABLE categories (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE products (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    sku TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    price NUMERIC(12,2) NOT NULL CHECK (price > 0),
    category_id BIGINT NOT NULL REFERENCES categories(id)
);
```

categories tạo trước vì products tham chiếu nó. Sau V1, schema có hai bảng. V1 **không tự tạo dòng Product** vì không có INSERT.

Để xem tác động lên dữ liệu cũ, giả sử trước V2 DB đã có:

| id | sku | name | price | category_id |
|---:|---|---|---:|---:|
| 10 | BK-01 | Java Book | 120.00 | 1 |
| 11 | PEN-01 | Pen | 5.00 | 1 |

Category 1 đã tồn tại. Các dòng minh họa này là dữ liệu sẵn có, không suy ID sequence từ chúng.

### Bước mới: V2 thêm cột

```sql
-- V2__add_product_description.sql
ALTER TABLE products ADD COLUMN description TEXT;
```

Sau thành công, hai dòng cũ vẫn còn nguyên id/sku/name/price/category_id và có thêm:

| id | name | description |
|---:|---|---|
| 10 | Java Book | NULL |
| 11 | Pen | NULL |

Không xóa bảng để tạo lại. Vì chưa NOT NULL, description chưa có giá trị vẫn hợp lệ.

Nếu ngay từ đầu thêm TEXT NOT NULL mà không default/cấp giá trị, các dòng cũ không đáp ứng điều kiện. Sau này muốn bắt buộc mô tả: cấp giá trị hợp lệ cho dòng cũ rồi siết constraint, đồng thời phải có kế hoạch cho đường ghi của app. Bài này chưa yêu cầu triển khai kế hoạch production đó.

### Bước sau: V3 tạo index

```sql
-- V3__index_description.sql
CREATE INDEX idx_products_description ON products(description);
```

Index cần cột V2 đã tạo. Đây là ví dụ phụ thuộc SQL, **không khuyến nghị mọi dự án đều cần index description**; chọn index thực tế phải dựa query/đo đạc M2-1.

## 5. History và checksum: biết đã chạy gì, không phải chụp toàn DB

Sau khi V1/V2 thành công, history có thể được minh họa:

| version | description | checksum minh họa | success |
|---|---|---|---|
| 1 | create catalog | token-A | true |
| 2 | add product description | token-B | true |

token-A/B là nhãn cho dễ hiểu, không phải checksum thật. Bảng mặc định tên `flyway_schema_history`; nó không chứa bản sao mọi Product.

Có thể quan sát khi đã cấu hình đúng schema và history tồn tại:

```sql
SELECT installed_rank, version, description, success
FROM flyway_schema_history
ORDER BY installed_rank;
```

installed_rank là thứ tự được cài, version là phiên bản migration; không cần thuộc cấu trúc nội bộ để học bài này.

### Checksum đang so hai thứ gì?

```text
Nội dung file hiện tại -> checksum hiện tại
Nội dung file khi đã áp dụng -> checksum lưu trong history
-> đối chiếu để phát hiện không khớp
```

Nếu sửa phần SQL của V1 khiến checksum khác, Flyway có thể báo mismatch. **Báo mismatch không có nghĩa SQL mới đã chạy.**

### Validate không phải kiểm toàn bộ schema

Flyway validate đối chiếu migration có sẵn với history. Nó không kiểm từng cột theo Entity và không tự dựng lại DB để so toàn bộ trạng thái. [Flyway Validate](https://documentation.red-gate.com/flyway/reference/commands/validate).

Ví dụ người khác DROP COLUMN bằng tay mà không đổi file/history: checksum vẫn có thể khớp nhưng cột thật đã mất. Vì vậy lúc điều tra cần nhìn cả file, history và schema thực tế. Hibernate schema validation ở Lesson 02 là một cơ chế khác, cũng không nên coi là phép kiểm toàn bộ mọi chi tiết DB.

## 6. Vì sao giữ nguyên migration đã phát hành?

DB chung chạy V1 tạo id/name. Bạn sửa V1 thêm description trong CREATE TABLE.

| Nơi | Điều xảy ra |
|---|---|
| DB cũ đã chạy V1 | Không tự chạy V1 lại; có thể gặp checksum mismatch |
| DB trống dùng V1 đã sửa | Nếu chạy được, nó có cột description ngay từ V1 |

Tên V1 giống nhau nhưng lịch sử/nội dung không nhất quán. Không sửa được chuyện này bằng restart Controller.

Cách thông thường: giữ file đã phát hành, tạo V2 có ALTER thêm cột. DB cũ đi từ V1 tới V2; DB trống đi V1 rồi V2.

Nếu V1 chưa phát hành, chỉ dùng trên DB local bỏ được thì có thể sửa và dựng lại DB đó. Điều kiện “bỏ được, chưa dùng chung” quan trọng; không đem thói quen xóa DB áp dụng lên dữ liệu cần giữ.

## 7. Startup, GET và restart: kiểm lại khác chạy lại SQL

Giả sử đủ dependencies/config, Flyway migrate khi Boot khởi động, Hibernate chỉ validate và DB đang ở V1:

```text
Khởi động app
-> Flyway kết nối DB
-> đọc history: V1 đã có, V2 đang thiếu
-> PostgreSQL thực thi SQL của V2
-> ghi V2 thành công
-> JPA kiểm schema cần cho Entity
-> app sẵn sàng nhận request
```

Sau đó:

```text
GET /api/products
-> Controller -> Service -> Repository/JPA
-> PostgreSQL SELECT dữ liệu
-> map Response DTO -> JSON -> client
```

GET không gọi lại migration trong setup này. Nếu migration thất bại, không coi app đã khởi động bình thường để Service trả AppException như một lỗi request.

### Mở app lần hai, cùng file và DB

```text
Flyway vẫn kiểm file/history
-> thấy V1/V2 đã thành công, không đổi file
-> không thực thi lại SQL V1/V2
-> tiếp tục khởi tạo app
```

**“Không chạy lại SQL cũ” không có nghĩa “Flyway không hoạt động khi restart”.**

Thêm một file version mới hợp lệ thì lần migrate sau mới có bước cần áp dụng. Không tự sửa Java/SQL nghiệp vụ thành migration mỗi request.

## 8. Tự kiểm, tài liệu và phạm vi

### Trace trong 2 phút

Giả sử repo có V1/V2/V3/V10 đều hợp lệ theo thứ tự, không sửa file cũ, mọi bước thành công:

| DB trước migrate | SQL còn cần chạy | Sau restart cùng bản |
|---|---|---|
| A đã V1/V2 | V3 rồi V10 | Kiểm lại, không thực thi lại SQL cũ |
| B trống | V1, V2, V3, V10 | Kiểm lại, không thực thi lại SQL cũ |

Sau đó hai DB có thể cùng schema/version nhưng khác Product. Mỗi DB có history riêng. Nếu nói được ba câu này bằng lời của bạn thì đã nắm nền tảng, không cần thuộc văn mẫu.

### Đọc thêm

- [Official Versioned migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/versioned-migrations): version, order, giữ file đã phát hành.
- [Official Validate](https://documentation.red-gate.com/flyway/reference/commands/validate): file/history và checksum.
- [Official Boot initialization](https://docs.spring.io/spring-boot/how-to/data-initialization.html): xem sơ đồ vai trò khi muốn nối với Boot; cấu hình cụ thể học Lesson 02.
- Video tùy chọn: tìm `Flyway PostgreSQL versioned migration schema history beginner`. Chọn video có chạy lần hai và so sánh history với schema; đây là từ khóa tìm, không khẳng định đã xem một video cụ thể.

Bài này không đòi repair/baseline, repeatable, YAML hoặc CLI. Những thứ đó có lesson riêng.

Làm [đề Lesson 01 hiện hành](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-13__lesson1-lan2.md): câu 1–3 giữ bài bạn đã trả lời, câu 4–8 đã viết ngắn lại. Không xóa câu trả lời hoặc đổi điểm chỉ vì bài học được bổ sung.
