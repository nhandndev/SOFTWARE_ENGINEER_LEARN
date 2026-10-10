# M2-3 · Lesson 03: Lỗi migration, repair, baseline và CI

> Học 60–75 phút. Mục tiêu: chọn đúng cách xử lý khi startup/migration hỏng, hiểu repair không phải rollback, và thiết kế kiểm tra migration trong CI. Chưa yêu cầu dựng pipeline thật.

**Học theo thứ tự:** mục 1–5 là chẩn đoán cần nắm; mục 6–8 là nhận diện quy trình deploy/CI để học tiếp module sau. Không bắt nhớ lệnh phục hồi production hoặc viết GitHub Actions YAML khi M4-2 chưa học. Với AI service, thay đổi bảng document/job/model-result cũng cần cách nâng cấp có dữ liệu cũ như ở đây.

## 1. Ba việc thường bị gọi chung là “sửa migration”

| Việc | Tác động |
|---|---|
| Sửa schema/dữ liệu | SQL thay đổi database thật |
| Repair lịch sử | Điều chỉnh metadata Flyway theo điều kiện được kiểm tra |
| Rollback transaction | Hủy thay đổi chưa commit trong transaction đó |

Nếu đã commit DROP dữ liệu, sửa một dòng history không khôi phục dữ liệu đã mất. Đây là lý do phải xác định vấn đề trước khi dùng lệnh.

## 2. Chẩn đoán từ bằng chứng

```text
Startup fail
 -> Đọc lỗi gốc và DB đích
 -> Lỗi kết nối, naming, checksum hay SQL?
 -> Xem history và trạng thái schema thực tế
 -> Chọn sửa config/file chưa phát hành/migration mới/quy trình recovery
 -> Chạy lại kiểm tra trên DB phù hợp
```

Ví dụ lỗi authentication: giải quyết credential/DB URL, không repair checksum. Lỗi `relation already exists`: kiểm tra schema đã được tạo tay hoặc chạy dở; không cứ xóa history để ép CREATE TABLE lại.

Các lệnh CLI dưới đây **giả định đã cài Flyway CLI và cấu hình DB đích bằng cơ chế của CLI**. CLI không tự đọc application.yml như Boot:

```bash
flyway info
flyway validate
flyway migrate
```

`info` quan sát migration/history; `validate` đối chiếu lịch sử và file; `migrate` áp dụng các bước còn chờ. `mvn flyway:migrate` chỉ dùng khi Maven plugin và cấu hình plugin đã được thiết lập; thêm dependency core chưa tự cấu hình mọi lệnh Maven.

## 3. Migration chưa commit bị lỗi: nhìn ranh giới transaction

Giả sử V1 đã commit và products đang có ít nhất một dòng. V2 chỉ có các lệnh PostgreSQL hỗ trợ transaction, cố tình ghi stock sai để thấy lỗi cụ thể:

```sql
ALTER TABLE products ADD COLUMN stock INTEGER;
UPDATE products SET stock = -1;
ALTER TABLE products ADD CONSTRAINT ck_stock CHECK (stock >= 0);
```

Lệnh thứ ba kiểm tra dòng hiện có và thất bại vì -1 không thỏa stock>=0. Flyway thông thường bao mỗi migration trong transaction; rollback hủy cả cột stock vừa thêm và UPDATE của V2 trong ví dụ này. V1 đã commit trước đó vẫn còn. Đây là rollback transaction, không phải tự chạy migration ngược. Nếu bảng rỗng thì ví dụ không tạo lỗi như vậy, nên dữ kiện “có ít nhất một dòng” quan trọng. [Transaction handling](https://documentation.red-gate.com/fd/migration-transaction-handling-273973399.html).

Nếu V2 chưa từng được áp dụng thành công/chia sẻ như migration đã phát hành, sửa giá trị backfill thành 0 và thử lại trên DB test là hướng hợp lý. Nếu migration đã thành công trên môi trường chung rồi mới phát hiện nghiệp vụ sai, tạo V mới thay vì đổi file lịch sử.

Không áp dụng kết luận đó cho mọi SQL: PostgreSQL có lệnh không chạy trong transaction block, như `CREATE INDEX CONCURRENTLY`. Migration không transactional có thể để lại trạng thái chạy dở. Cần cấu hình riêng và quy trình kiểm tra/cleanup theo lệnh cụ thể, không nhét tất cả vào cùng file rồi mặc định rollback đầy đủ.

## 4. Checksum mismatch và repair

Tình huống: V1 đã chạy trên DB chung, bạn vô tình sửa V1 trong Git. Hướng đầu tiên là xem diff và khôi phục file đã phát hành đúng nội dung; thay đổi mong muốn đưa vào V mới.

`repair` có thể sửa metadata lịch sử, bao gồm việc điều chỉnh checksum; **nó không tự thực thi SQL thay đổi đã thêm vào file cũ và không tự dọn mọi object còn sót trong DB**. Phải dùng locations phù hợp với migrate. [Repair chính thức](https://documentation.red-gate.com/flyway/reference/commands/repair).

Ví dụ bạn thêm description vào V1 rồi repair để hết mismatch: DB cũ có thể vẫn thiếu description. History “hợp lệ” không đồng nghĩa schema đã được đổi.

Chỉ dùng repair trong quy trình đã kiểm tra lý do thay đổi, trạng thái schema và tác động tới môi trường khác. Nó không phải nút “bỏ qua lỗi cho app chạy”.

## 5. Schema đã tồn tại: baseline là gì?

Bạn có DB cũ được tạo trước khi dùng Flyway. Baseline ghi nhận một mốc để Flyway bắt đầu quản lý lịch sử từ đó; nó không chạy lại toàn bộ SQL trước mốc và không tự kiểm schema cũ đúng từng cột. [Baseline chính thức](https://documentation.red-gate.com/flyway/reference/commands/baseline).

Ví dụ đã xác minh DB cũ tương đương schema V1. Baseline version 1 trên DB đó khiến các migration có version ≤1 được loại khỏi phần cần chạy; V2 trở lên tiếp tục nâng cấp. Trong DB mới trống, vẫn cần V1 tạo schema từ đầu theo quy trình migrate bình thường.

Trước baseline: xác định DB đúng, sao lưu phù hợp, kiểm schema/constraint/dữ liệu hiện tại so với mốc, chọn version chính xác. Không bật `baseline-on-migrate` chỉ vì muốn hết lỗi non-empty schema: bạn có thể vô tình chấp nhận nhầm DB hoặc schema không đúng.

## 6. Forward-only và triển khai tương thích

Forward-only nghĩa là sửa bằng migration mới tiến lên thay vì sửa migration cũ đã phát hành. Nó không bảo đảm có thể khôi phục dữ liệu bị xóa.

Ví dụ muốn đổi tên cột name thành title, nhưng phiên bản app cũ vẫn cần name. Đổi ngay có thể làm app cũ hỏng khi rolling deploy. Kế hoạch “mở rộng rồi thu hẹp”:

1. Thêm title nullable, giữ name để code cũ còn hoạt động.
2. Backfill dữ liệu và có kế hoạch đồng bộ ghi trong giai đoạn hai cột cùng tồn tại.
3. Deploy code có thể dùng title; kiểm dữ liệu đúng và không còn app cũ.
4. Áp ràng buộc cần thiết rồi migration sau mới bỏ name.

Không cần thuộc thuật ngữ; cần biết schema có thể phục vụ nhiều phiên bản code cùng lúc. App rollback về bản cũ không tự làm database lùi về schema cũ.

## 7. Seed và recovery phải phân biệt dữ liệu

Demo seed có thể dựng lại trên DB dev bỏ được. Production Product, đơn hàng, user không phải dữ liệu để drop/clean rồi tạo lại cho nhanh. `clean` có thể xóa object trong schema quản lý; không dùng nó như repair dữ liệu cần giữ.

Nếu migration đã commit làm mất dữ liệu, phải cân nhắc backup/restore hoặc recovery đã chuẩn bị. Migration “thêm lại cột” không làm giá trị cũ tự quay về. Kiểm tra recovery trước khi triển khai thay đổi không đảo ngược được.

## 8. CI cần kiểm hai đường đi

Chỉ “app khởi động trên DB trống” chưa kiểm đường nâng cấp mà production thực sự dùng. Một kế hoạch đủ ý:

CI ở đây đơn giản là máy tự chạy các bước kiểm khi bạn đẩy code. Bạn chỉ cần hiểu đầu vào, thứ tự và điều kiện fail/pass; công cụ GitHub Actions/Docker sẽ học ở M4.

| Nhánh | Bước | Chứng minh |
|---|---|---|
| DB mới | PostgreSQL test trống → migrate toàn bộ → validate → kiểm schema/data cơ bản | Cài mới được |
| DB cũ | DB test ở version release trước, có dữ liệu đại diện → migrate mới → validate → kiểm dữ liệu/constraint/app | Nâng cấp giữ đúng dữ liệu |

Đây là kế hoạch để đọc, không khẳng định pipeline đã tồn tại. Dùng đúng PostgreSQL major dự định deploy và version Flyway/Boot tương thích; H2 không chứng minh mọi SQL PostgreSQL hợp lệ. CI dùng credential test qua secret/config của job, không hard-code password prod. Migration lỗi phải làm job thất bại, không continue-on-error để báo xanh.

Ví dụ muốn V2 thêm description nullable: nhánh nâng cấp lưu Product cũ trước migrate, rồi kiểm Product đó còn giữ id/sku/name/price/category_id và description ban đầu NULL sau migrate. Nhánh mới kiểm bảng, FK/UNIQUE/CHECK và Entity mapping. Chỉ thấy exit code migrate thành công chưa chứng minh dữ liệu cũ đúng hoặc app query được; các kiểm tra này là bước tiếp theo của job.

Trước merge: review SQL, tên/version duy nhất, file cũ không bị sửa, dữ liệu mẫu không lọt prod, ảnh hưởng lock/runtime, khả năng tương thích code cũ. Nếu nhiều app instance cùng deploy, cần quy trình migration nhất quán; history/locking hỗ trợ nhưng không thay thiết kế release.

## 9. Tài liệu và bài tự luyện

- [Repair](https://documentation.red-gate.com/flyway/reference/commands/repair): tác động lên history, object cần tự kiểm.
- [Baseline](https://documentation.red-gate.com/flyway/reference/commands/baseline): DB có sẵn và mốc version.
- [Transactions](https://documentation.red-gate.com/fd/migration-transaction-handling-273973399.html): lệnh không transactional.
- [PostgreSQL CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html): phần CONCURRENTLY để tra khi cần, chưa bắt thuộc.
- Video tùy chọn: tìm `Flyway checksum mismatch repair baseline forward migration`; bỏ qua video khuyên repair/clean mọi lỗi mà không kiểm DB.

Tự luyện: giải thích một checksum mismatch, một SQL failure chưa commit và một mất dữ liệu đã commit bằng ba cách xử lý khác nhau.

Làm [đề Lesson 03](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-05__lesson3-lan1.md).
