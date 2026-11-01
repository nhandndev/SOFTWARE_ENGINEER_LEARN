# Học bổ sung Flyway Lesson 03 theo bài làm của bạn

> Ngày 2026-10-30. Bạn đã làm câu 2–5, đạt tạm **17/20 = 85% phần đó**. Câu 1/6/7/8 chưa trả lời, không kết luận bạn không biết. Tài liệu này giải thích cả phần đã sai/thiếu và phần cần học để hoàn thành các câu trống; không bắt đọc lại mọi bài từ đầu.

## 1. Bản đồ học lại

| Câu đề chính | Tình trạng | Mục đọc |
|---|---|---|
| 1: password sai | Chưa làm | 2 |
| 2: repair/checksum | 4/5; thiếu trả V1 về bản đã chạy, đang coi repair là bắt buộc | 3 |
| 3: rollback V2 | 5/5; củng cố giới hạn, không phải lỗi mới | 4 |
| 4: baseline | 3/5; nhầm tự kiểm schema và ai xác minh trước | 5 |
| 5: dữ liệu đã mất | 5/5; củng cố cấu trúc khác dữ liệu gốc | 6 |
| 6: chuyển name→title | Chưa làm | 7 |
| 7: CI hai đường | Chưa làm | 8 |
| 8: Maven/CLI/clean | Chưa làm | 9 |

Đọc khoảng 40 phút, có thể chia hai lượt. Mọi tình huống dưới là ví dụ để suy luận, **không chạy lệnh sửa/xóa lên DB lab hoặc production** trong lúc đọc.

## 2. Câu 1: password sai thì sửa gì?

Hình dung ba cửa:

```text
Cửa 1: kết nối và đăng nhập DB
-> Cửa 2: đối chiếu file/history và migrate
-> Cửa 3: JPA kiểm mapping rồi app sẵn sàng
```

Nếu DB từ chối mật khẩu, chưa qua cửa 1. Repair history không thay đổi thông tin đăng nhập và cũng cần kết nối được DB.

Bạn cần kiểm ba nhóm:

| Nhóm | Cần biết | Không làm |
|---|---|---|
| Lỗi gốc | Authentication failed hay connection refused/checksum? | Chỉ đọc dòng ngoài cùng “Application failed” |
| DB đích | URL/host/port/database/schema có đúng nơi định dùng? | Thử password trên DB bất kỳ |
| Credential thực tế | App dùng user/password từ env/profile/secret nào? | In password ra log để gửi AI |

Ví dụ lab local: DB lab ở port 15432 nhưng cấu hình trỏ 5434 thì dù password đúng ở lab, bạn đang nói chuyện với nơi khác. Ngược lại, URL đúng nhưng env cũ ghi đè password cũng có thể làm đăng nhập thất bại. **Sửa nguyên nhân kết nối, không repair.**

Đáp án ngắn đủ câu 1: “Sửa credential/config, không repair; đọc lỗi gốc, xác minh DB đích và nguồn user/password/profile runtime.” Setup một DataSource ở đây theo [Boot initialization](https://docs.spring.io/spring-boot/how-to/data-initialization.html), không khẳng định mọi app chỉ có một nguồn config DB.

## 3. Câu 2: V1 gốc đã phát hành khác bản V1 vừa bị sửa

Bạn hiểu đúng repair không thêm cột. Nhưng còn thiếu bước quan trọng: **khôi phục file V1 về nội dung đã áp dụng**, không chỉ tạo V2.

Ví dụ hai bản cùng tên V1:

```text
V1 gốc đã chạy: CREATE products(id, name)
V1 bị sửa trong repo: CREATE products(id, name, description)
DB thật: vẫn chỉ có id/name
History: checksum của V1 gốc
```

“Bản V1 sửa chưa được phát hành” chỉ nói **nội dung mới chưa chạy**, không làm mất việc V1 gốc đã chạy trên DB chung.

Phương án thông thường của đề:

```text
1. So file với bản đã phát hành, xem history và schema đúng DB.
2. Trả V1 trong repo về nội dung gốc đã áp dụng.
3. Tạo V2 mới có ALTER thêm description.
4. Kiểm và migrate theo quy trình phù hợp.
```

SQL V2 có thể là:

```sql
-- V2__add_description.sql
ALTER TABLE products ADD COLUMN description TEXT;
```

Nếu chỉ thêm V2 mà vẫn giữ V1 sai checksum, validation vẫn có thể chặn. Nếu sửa metadata bằng repair cho khớp file mới, description vẫn chưa tự xuất hiện. Giữ lịch sử script là lý do không sửa versioned đã phát hành. [Versioned migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/versioned-migrations).

### Khi chưa phát hành thì có luôn cần repair không?

**Không.** Nếu file chưa áp dụng ở DB cần giữ và chưa có record lỗi cần xử lý, chỉ sửa file đúng rồi kiểm/chạy, không có lý do tự thêm repair. Khi migration lỗi, phải kiểm tính transactional và object/history còn lại; không đoán mọi lỗi cần repair.

Repair là công cụ sửa history có kiểm soát. Nó không phải điều kiện bắt buộc của việc sửa SQL, không thực thi phần ALTER mới và không tự cleanup mọi object sót. Bài này không yêu cầu bạn nhớ tất cả action của repair. [Repair](https://documentation.red-gate.com/flyway/reference/commands/repair).

**Nhớ:** file đã chạy thì giữ lịch sử; sửa schema bằng migration mới; sửa metadata chỉ khi đã biết metadata cần sửa vì sao.

## 4. Câu 3: bạn đã hiểu đúng phạm vi rollback

Ví dụ đề có V1 commit trước và một dòng Product. V2 chạy cả ba lệnh trong một transaction:

```sql
ALTER TABLE products ADD COLUMN stock INTEGER;
UPDATE products SET stock = -1;
ALTER TABLE products ADD CONSTRAINT ck_stock CHECK (stock >= 0);
```

| Thời điểm | Tình trạng |
|---|---|
| Sau lệnh 1 | Có stock, dòng cũ ban đầu NULL |
| Sau lệnh 2 | Stock=-1; CHECK mới chưa tồn tại nên chưa chặn |
| Lệnh 3 | Thêm CHECK kiểm dữ liệu hiện có và thất bại |
| Sau rollback V2 | Cột stock vừa thêm không còn; dữ liệu V1 vẫn giữ |

Bạn đã giải thích đúng điều này. Không phải rollback xóa tất cả lịch sử V1/V2 của app; nó hủy transaction đang lỗi. Không áp dụng kết luận trên cho SQL chạy ngoài transaction hay lệnh không hỗ trợ transaction block. [Transaction handling](https://documentation.red-gate.com/fd/migration-transaction-handling-273973399.html).

## 5. Câu 4: baseline ghi mốc, người/quy trình kiểm schema

Bạn viết baseline “tự kiểm toàn schema”. Đây là điểm sai cần sửa dứt khoát.

Giả sử DB cũ đã có bảng do nhóm tạo trước khi dùng Flyway. **Nhóm phải xác minh trước** nó phù hợp schema mốc V1: đúng DB, bảng/cột/constraint và dữ liệu cần thiết. Baseline không làm bước kiểm đó thay nhóm.

```text
Nhóm xác minh DB cũ tương đương V1
-> đặt baseline version 1
-> history có marker mốc 1
-> migrate bỏ qua version tới 1, xử lý V2 trở lên
```

Baseline không chạy CREATE V1, không sửa cột thiếu, không tự chứng nhận schema đúng. [Baseline](https://documentation.red-gate.com/flyway/reference/commands/baseline), [baselineVersion](https://documentation.red-gate.com/flyway/reference/configuration/flyway-namespace/flyway-baseline-version-setting).

### Tình huống để nhớ tác hại của đặt mốc sai

Bạn chưa kiểm, đánh dấu DB là mốc 1; thực tế products còn thiếu name. V2 chỉ thêm description. Sau đó vẫn thiếu name: đặt mốc không tự tạo phần còn thiếu. Vì vậy câu “V1 không chạy lại, V2 chạy” của bạn đúng, nhưng không được nối thêm “và tự kiểm toàn schema”.

Đáp án đủ: “Vì DB đã được xác minh tương đương V1, baseline ghi marker 1, không chạy V1 và không tự kiểm mọi cột; V2 tiếp tục migrate. Việc xác minh phải làm trước.”

## 6. Câu 5: thêm lại cột không đồng nghĩa lấy lại giá trị gốc

Bạn đã trả lời đúng; cần giữ ranh giới này khi áp dụng thực tế:

| Trước DROP | Sau DROP đã commit | Sau migration thêm lại cột |
|---|---|---|
| id=10, description='First edition' | description không còn | Có cột lại, nhưng không tự có 'First edition' |

Forward fix là bước mới thay đổi schema/dữ liệu theo SQL ta viết. Repair đổi metadata history. Backup là nguồn bản sao/khôi phục đã có; restore là đưa dữ liệu từ nguồn đó trở lại môi trường được chọn.

Gán đại description='Default' cho mọi dòng là một giá trị backfill mới, **không phải đã khôi phục giá trị gốc**. Muốn trả lại dữ liệu gốc cần nguồn đáng tin: backup/recovery hoặc nguồn dữ liệu còn giữ được. Không có nguồn thì không hứa phục hồi được. Không có chuyện ROLLBACK transaction cũ sau khi nó đã commit. Không tự restore đè toàn DB thật khi chưa cân nhắc các ghi mới.

## 7. Câu 6 chưa làm: đổi name thành title mà không làm hỏng app cũ

Ví dụ cụ thể:

```text
Schema cũ: products(id, name TEXT NOT NULL)
Product 10: name='Java Book'
App cũ đọc/ghi name.
App mới muốn dùng title.
```

Rename/drop ngay thì app cũ không còn cột nó cần. Chỉ thêm title rồi copy một lần cũng chưa đủ:

| Lúc | name | title |
|---|---|---|
| Sau thêm title/backfill | Java Book | Java Book |
| App cũ sửa tên | Spring Book | Java Book, nếu không đồng bộ |

Ngoài ra app mới chỉ INSERT title mà không ghi name sẽ vi phạm name NOT NULL trong giai đoạn cột cũ còn tồn tại.

### Một phương án đơn giản được chấp nhận trong bài

1. Thêm title nullable, giữ name và app cũ; không drop cột.
2. Trong cửa sổ chuyển đổi có kiểm soát, ngừng các writer liên quan, đồng bộ title từ name và kiểm dữ liệu cũ/mới. Không chỉ dừng một instance nếu còn job/app khác ghi.
3. Chuyển writer/code tương thích sang title; khi name còn NOT NULL, vẫn duy trì hợp đồng ghi name hoặc có kế hoạch thay constraint phù hợp. Kiểm INSERT/UPDATE/đọc trước khi mở lại ghi.
4. Chỉ bỏ name sau khi không còn app/job dùng cột cũ và dữ liệu đã đồng bộ đúng; phối hợp code/migration để writer không tiếp tục ghi một cột vừa bị bỏ.

Không bắt triển khai zero-downtime/trigger. Nếu bạn chọn chạy hai phiên bản song song không ngừng ghi, phải có kế hoạch đồng bộ **mọi writer**; chỉ app mới dual-write chưa xử lý app cũ vẫn ghi một cột. Flyway không tự lo toàn bộ chuyện rollout.

**Nhớ:** thêm trước → chuyển dữ liệu và kiểm soát ghi → chuyển code → bỏ sau khi đủ điều kiện. Đây là kế hoạch suy ra từ constraint/luồng ghi đã cho, không phải tính năng tự động của Flyway.

## 8. Câu 7 chưa làm: CI phải kiểm cài mới và nâng cấp

CI chỉ là máy tự chạy những kiểm tra đã định nghĩa. Bạn chưa cần thuộc GitHub Actions syntax.

Giả sử V1 đã có Product 10 giá 120; V2 thêm description nullable:

| Đường | Chuẩn bị | Chạy | Kiểm sau chạy |
|---|---|---|---|
| Cài mới | PostgreSQL test riêng, trống | Migrate toàn bộ rồi validate | Bảng/cột/constraint, mapping/query cơ bản đúng |
| Nâng cấp | PostgreSQL test ở release trước, có Product 10 giá 120 | Áp migration mới rồi validate | Dòng cũ vẫn id=10/giá=120; description NULL; app đọc/ghi phù hợp |

Nếu V2 lỡ DROP dữ liệu rồi tạo lại bảng, đường DB trống có thể không lộ mất dữ liệu, còn đường nâng cấp phải phát hiện Product 10 mất. **Đó là lý do cần cả hai.**

Kế hoạch đủ cho câu 7: dùng PostgreSQL cô lập phù hợp deploy → hai đường ở trên → kiểm schema/constraint/query/dữ liệu → bất kỳ bước lỗi làm job fail, không báo xanh để release tiếp. Credential test lấy từ secret/config CI; không hard-code password production. H2 không đủ chứng minh SQL PostgreSQL thật chạy đúng.

Không gọi migrate/validate thành công là đã chứng minh mọi dữ liệu nghiệp vụ đúng. Kiểm dữ liệu là bước riêng do nhóm thiết kế theo thay đổi, không phải Flyway tự nghĩ ra cho ta.

## 9. Câu 8 chưa làm: Boot, Maven plugin và CLI không tự dùng chung config

| Cách chạy | Ai gọi Flyway? | Cần gì? |
|---|---|---|
| Boot app | Tích hợp Boot gọi migrate ở startup | Dependency/tích hợp và config DataSource/Flyway của app |
| Maven goal | Plugin Maven | Plugin và cấu hình được resolve đúng, URL/credential/locations phù hợp |
| Flyway CLI | Công cụ CLI cài riêng | Cấu hình theo cơ chế CLI, không tự đọc Spring application.yml |

`flyway-core` là thư viện cho app, không tự thiết lập mọi Maven goal. Maven còn có cơ chế resolve plugin theo môi trường, nên đừng coi “một máy chạy được goal” là bằng chứng dependency core đã cấu hình tất cả. Trong phạm vi đề, cần chủ động kiểm plugin/config và đúng DB.

Tham khảo riêng cách tích hợp [Flyway Maven plugin](https://documentation.red-gate.com/flyway/reference/usage/maven-goal), không copy version/plugin config mới nhất vào project mà chưa kiểm tương thích.

Trước thao tác nào có thể thay đổi DB, xác nhận URL/schema/user và phạm vi. **clean có thể xóa object trong các schema được cấu hình**, không phải xóa vài dòng log. Không dùng nó để chữa checksum trên dữ liệu cần giữ. [Clean](https://documentation.red-gate.com/flyway/reference/commands/clean).

Đáp án câu 8 không đòi bạn tự viết pom plugin hoặc config CLI: chỉ nêu điều kiện từng cách, không tự hiểu application.yml và vì sao chọn nhầm DB nguy hiểm. Không có lệnh clean/repair/baseline để bạn copy chạy trong bài phụ này.

## 10. Tự kiểm và quay lại bài chính

- Đọc mục 3/5 rồi sửa câu 2/4 bằng lời của bạn.
- Đọc mục 2/7/8/9 rồi điền câu 1/6/7/8 trong đề chính.
- Câu 3/5 đã đúng, không phải làm lại vì “chưa dùng đúng văn mẫu”.

[Đề chính Lesson 03](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-05__lesson3-lan1.md), [nhận xét từng câu](../../../Exams/nhan-xet/M2-3-flyway__2026-10-05__lesson3-lan1__NHANXET.md), [Lesson 03 đầy đủ](LESSON_03_LOI_REPAIR_BASELINE_VA_CI.md).

Có thêm [4 câu tự kiểm bổ sung](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-30__lesson3-bo-sung-lan1.md), bài giải/rubric tách riêng. Đây là tùy chọn để luyện, không bắt làm thêm trước khi sửa đề chính và không tự thay điểm đề chính.

Nguồn đọc thêm: [Versioned](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/versioned-migrations), [repair](https://documentation.red-gate.com/flyway/reference/commands/repair), [baseline](https://documentation.red-gate.com/flyway/reference/commands/baseline), [transaction](https://documentation.red-gate.com/fd/migration-transaction-handling-273973399.html). Video tùy chọn: tìm `Flyway repair vs migrate baseline existing database`; đây là từ khóa tìm, chưa xác minh một video cụ thể.

Đã review theo bài nộp/rubric và nguồn chính thức; ví dụ là giải thích có điều kiện, chưa chạy thử recovery/rollout/CI. Không lấy bài phụ làm bằng chứng bạn đã thực hành các thao tác đó.
