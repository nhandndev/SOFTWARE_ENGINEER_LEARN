# Đáp án M2-3 · Lesson 02

40đ; normalize /40 ×100. Chấp nhận cấu hình/lời tương đương.

| Câu | Rubric 5 điểm |
|---|---|
| 1 | Boot autoconfig gọi migrate (1); DataSource cung cấp kết nối (1); migration chuẩn bị schema trước JPA phụ thuộc (1); JPA validate mapping (1); HTTP sau app ready (1). |
| 2 | Validate không sửa schema (1); locations tìm file (1); naming báo tên sai (1); never tắt basic SQL init (1); tránh nhiều cơ chế thay schema khó kiểm soát (1). |
| 3 | Hibernate schema validation lúc startup (2); migration history không chứng minh mọi mapping đúng (1); không phải HTTP Service/AppException (2). |
| 4 | R không chạy lại khi checksum không đổi (2); V2 trước R đã đổi (2); versioned pending trước repeatable cần áp dụng (1). |
| 5 | Thêm stock bằng V (2); view thay thế phù hợp R (1); phải tự viết SQL chạy lại an toàn, không tự bảo đảm mọi thay đổi view hợp lệ (2). |
| 6 | Dev giữ schema chung và thêm seed dev, đủ hai locations (3); prod chỉ chung (1); đổi profile không xóa dữ liệu cũ (1). DB riêng là giả định đề, không trừ vì không lặp lại; nếu phủ nhận giả định thì nhận xét riêng. |
| 7 | category_id=42 từ SELECT, không hard-code 1 (1); chạy lại không thêm trùng nhờ UNIQUE/ON CONFLICT (1); DO NOTHING không update (1); thiếu Category thì SELECT/INSERT 0 dòng (1); không tự tạo Category (1). Kiểm kết quả seed là lời khuyên, không thêm điều kiện lấy điểm. |
| 8 | Profile không bảo vệ khi URL sai (2); kiểm DB URL/identity DB (1), locations (1), config/profile/secret runtime (1). |

Chữa: câu 1–3 mục 1–3, 4–5 mục 4, 6/8 mục 5, 7 mục 6. Không trừ tên artifact không thuộc nếu đã giải thích đúng cơ chế; đề đã cung cấp setup Boot 4.

## Quy tắc chấm

Áp dụng [chấm nghiêm theo từng ý](../../Notes/M2_Database/QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md). Đủ mọi vế mới đạt 5/5; các giải thích bổ sung không tạo yêu cầu ngầm ngoài rubric.

## Bài giải từng câu

### Câu 1 — Boot điều phối, không phải Service gọi migrate

**Đáp án đủ ý:** Với dependencies và cấu hình của đề, Boot auto-configuration tạo/cấu hình Flyway và kích hoạt migrate. Thứ tự logic: DataSource có cấu hình kết nối → Flyway dùng kết nối để chuẩn bị schema/history → JPA khởi tạo và `ddl-auto=validate` kiểm mapping với schema → app ready phục vụ HTTP. DataSource là nguồn cấp connection; JPA không thay Flyway viết migration.

**Chấm nghiêm:** Chỉ liệt kê bốn tên mà không nói vai trò mất điểm phần chưa chứng minh. Gán migrate cho Controller/Service là sai. Đề kiểm thứ tự phụ thuộc logic, không bắt nêu mọi bean hoặc thứ tự tạo từng object nội bộ.

### Câu 2 — Một cơ chế quản lý thay đổi schema

**Đáp án đủ ý:** `ddl-auto: validate` để Hibernate kiểm schema cần cho mapping, không tự update. `flyway.locations` chỉ nơi tìm migration. `validate-migration-naming` bật kiểm tên không hợp lệ. `spring.sql.init.mode: never` tắt cơ chế basic SQL initialization bằng schema.sql/data.sql, không tắt Flyway. Tránh Hibernate update song song Flyway vì schema có thể bị đổi ngoài lịch sử migration và khác nhau giữa môi trường.

**Chấm nghiêm:** “never tắt mọi SQL” sai. “validate sửa cho đúng Entity” sai. Mỗi cấu hình là một tiêu chí riêng; giải thích đúng hai không được điểm cả bốn.

### Câu 3 — Startup validation không phải business error

**Đáp án đủ ý:** Khi JPA khởi tạo và Hibernate validate mapping, nó có thể phát hiện thiếu `description` và làm startup fail. Flyway migrate thành công chỉ cho thấy các migration đã được áp dụng theo cơ chế của nó, không chứng minh mapping hiện tại đủ cột. Đây không phải Service ném AppException và không được REST exception handler xử lý như một response nghiệp vụ cho client.

**Chấm nghiêm:** Nói trả 404/409 từ Controller bỏ qua việc app chưa ready là sai ranh giới. Không bắt thuộc tên exception startup để nhận điểm.

### Câu 4 — Repeatable theo checksum, không phải mỗi restart

**Đáp án đủ ý:** Restart khi R không đổi checksum thì không chạy lại R đã áp dụng thành công. Khi có V2 pending và R thay đổi, V2 được áp dụng trước, rồi R cần chạy lại. Flyway xử lý pending versioned trước repeatable cần áp dụng, giúp R có thể dùng schema được V2 chuẩn bị.

**Chấm nghiêm:** “R nghĩa là restart luôn chạy” sai phần điều kiện. Chỉ đoán V2 trước mà không nêu cơ chế không đủ toàn bộ điểm câu.

### Câu 5 — Chọn V/R theo loại thay đổi

**Đáp án đủ ý:** Thêm cột stock là bước nâng schema nên dùng V mới. Định nghĩa view có thể dùng R với SQL thay thế/chạy lại an toàn, ví dụ `CREATE OR REPLACE VIEW` khi thay đổi đó được PostgreSQL hỗ trợ. Đặt SQL vào R không tự biến nó thành idempotent: INSERT thường có thể nhân dữ liệu, ALTER ADD COLUMN thường có thể lỗi khi chạy lại; ngay cả thay view cũng phải kiểm tính tương thích.

**Chấm nghiêm:** Chọn đúng V/R nhưng khẳng định Flyway tự làm mọi SQL an toàn mất phần an toàn. Không bắt thuộc mọi hạn chế ALTER VIEW; phải hiểu trách nhiệm viết SQL vẫn thuộc người làm migration.

### Câu 6 — Locations và DB phải cùng được cô lập

**Đáp án đủ ý:** Dev dùng cả migration chung và seed dev:

```yaml
spring:
  flyway:
    locations: classpath:db/migration,classpath:db/dev
```

Prod chỉ `classpath:db/migration`. Dev/test/prod dùng DB riêng theo giả định. Đổi profile chỉ thay cấu hình lần chạy đó, không hoàn tác hay xóa seed đã ghi vào DB.

**Chấm nghiêm:** Chỉ chọn db/dev mà bỏ schema chung thiếu yêu cầu dev. Đổi profile không phải rollback database. Chấp nhận YAML list hai location có nghĩa tương đương.

### Câu 7 — INSERT lấy FK từ dữ liệu thật

**Đáp án đủ ý:** `SELECT ... c.id` tìm Category Demo Books nên Product mới nhận **category_id=42**. Chạy lại, UNIQUE sku cùng `ON CONFLICT (sku) DO NOTHING` khiến SKU đã có không được chèn trùng và không update name/price. Nếu không có Category đó, SELECT trả 0 dòng → INSERT 0 dòng; SQL này không tự tạo Category.

**Vì sao:** Không có dòng đầu vào khác với cố INSERT một dòng có FK/NULL sai. Constraint NOT NULL vẫn tồn tại nhưng không có dòng mới nào để vi phạm trong trường hợp SELECT rỗng.

**Chấm nghiêm:** Trả 1 vì nghĩ ID Category luôn bắt đầu 1 mất điểm FK. Nói DO NOTHING đồng bộ lại giá hoặc thiếu Category chắc chắn ném FK violation sai hai cơ chế riêng.

### Câu 8 — Profile không phải hàng rào bảo vệ DB

**Đáp án đủ ý:** Không. Profile dev vẫn chạy SQL lên DB prod nếu URL/credential thực tế trỏ tới prod và quyền cho phép. Trước migrate phải kiểm (1) URL/schema và danh tính DB đích, (2) locations thực sự chứa file nào, (3) active profile cùng nguồn config/env/secret runtime đang thắng cấu hình file. Tên profile không nhận biết và bảo vệ dữ liệu theo ý định người chạy.

**Chấm nghiêm:** “Có profile dev nên an toàn” sai phần chính. Viết “kiểm config” chung chung không thay thế ba kiểm tra cụ thể. Không yêu cầu lộ password ra log; kiểm nguồn/đích mà không in secret.
