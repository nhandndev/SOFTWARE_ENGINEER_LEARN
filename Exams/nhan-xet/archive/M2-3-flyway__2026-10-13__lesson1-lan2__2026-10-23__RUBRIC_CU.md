# Bài giải và rubric M2-3 Flyway · Lesson 01, bản tình huống

> Đề ngày 2026-10-13; 8 × 5 = 40đ. Quy đổi điểm thô/40 ×100; đạt từ 34/40. Chấm bằng chứng trong câu trả lời, không thưởng độ dài hoặc chỉ nhắc từ khóa. Không yêu cầu code chạy, tên lỗi chính xác, repair/baseline hay API chưa học.

## Bảng rubric

| Câu | Tiêu chí và điểm tối đa | Bài học |
|---|---|---|
| 1 | (a) Repo/dev không chứng minh deploy có cột: 1; (b) dev có V2, deploy chưa có: 1; (c) migrate đúng deploy: 1; (d) xem history và schema thực tế trên đúng DB: 1, mỗi loại 0,5; (e) Entity không tự sinh/thực thi migration trong setup: 1 | Mục 1–2, 5, 7 |
| 2 | (a) A V3→V10: 1; B V1→V2→V3→V10: 1; (b) thứ tự phiên bản số: 1; (c) restart không chạy lại versioned thành công: 1; (d) schema/history đạt cùng chuỗi nhưng dữ liệu không nhất thiết giống: 1, mỗi ý 0,5 | Mục 3–5 |
| 3 | (a) vẫn trùng version 2: 1; (b) ALTER là V2, index là V3: 1; (c) cột phải tồn tại trước index: 1; (d) không đổi V2 đã phát hành: 1, thêm index bằng V3 chưa dùng: 1 | Mục 3–4, 6 |
| 4 | (a) thiếu underscore và sửa V2__add_description.sql: 1; (b) V2 bị bỏ qua: 1, V3 lỗi vì thiếu cột: 1; (c) bật kiểm tên phát hiện tên sai sớm: 1; (d) sửa file mới chưa phát hành, giữ V1: 1 | Mục 3–4; đề đã cấp quy tắc option |
| 5 | (a) checksum file hiện tại với checksum lưu trong history: 1; (b) không tự ALTER/chạy lại V1: 1; (c) DB mới có description, DB cũ chưa có: 1; (d) khôi phục V1 gốc: 1, thêm V2 ALTER hợp lệ giữ dữ liệu: 1 | Mục 4–6 |
| 6 | (a) sửa tay schema không đổi file/history: 1; (b) validate đối chiếu migration/history: 1, không kiểm toàn schema/Entity: 1; (c) kiểm đúng DB/schema thực tế và file/history: 1, mỗi nhóm 0,5; (d) V2 đã thành công không tự chạy lại: 1 | Mục 2, 5–6 |
| 7 | (a) dòng cũ thiếu giá trị nên NOT NULL thất bại: 1; (b) tên V2 hợp lệ: 0,5, ALTER nullable đúng: 1,5; (c) giữ 2 dòng và description NULL: 1; (d) cấp giá trị hợp lệ cho dòng cũ rồi siết NOT NULL: 1 | Mục 4; M2-2 về NULL/constraint |
| 8 | (a) migrate trước JPA trước ready: 1; HTTP Controller→Service→Repository→DTO/JSON sau ready: 1; (b) Flyway điều phối/history, PostgreSQL thực thi SQL, JPA/Repository truy cập nghiệp vụ: 1, lần lượt 0,5/0,25/0,25; (c) lỗi migration không coi ready bình thường: 1; (d) GET không rerun migrations, đọc nghiệp vụ: 1 | Mục 2, 7; M1-2 luồng response |

## Cách chấm công bằng nhưng nghiêm

- Tiêu chí 1đ: đủ ý 1; đúng một phần 0,5; sai/không trả lời 0. Có thể chia 0,25 khi tiêu chí có các phần độc lập, phải ghi rõ.
- Đúng kết luận chưa đủ điểm phần lý do; giải thích hợp lý bằng từ của người học vẫn nhận đủ.
- Không yêu cầu checklist kỹ thuật ngoài các vế đề: không bắt log CLI chính xác, SQL đọc information_schema, transaction của DDL hay rollback migration.
- Ý đúng đã nói rõ ở câu khác được viện dẫn khi chấm, không bắt viết lặp; không tự suy ý từ kiến thức người học chưa thể hiện trong bài.
- Các tình huống độc lập. Câu 5 file chưa phát hành ở DB khác, vì thế khôi phục V1 gốc là phương án phù hợp dữ kiện; không áp dụng máy móc cho mọi sự cố production.
- Không thêm luật sai một câu là trượt. Khi chấm, lưu snapshot và giải thích điểm mất từng ý theo quy trình repo.

## Câu 1 — Kiểm đúng nơi nhận thay đổi

Repo có SQL không có nghĩa mọi DB đã nhận SQL. Dev đã có V2; deploy chưa có. Lần migrate vừa rồi kết nối dev, nên nó không cập nhật deploy.

Xác nhận connection trỏ deploy và áp dụng V2 lên DB đó trong quy trình phát hành phù hợp. Sau thành công, xem history V2 và cột description thực tế **trên đúng DB/schema**. Entity mô tả mapping code mong đợi; setup đã tắt tự update schema nên sửa Java/restart Controller không tự thêm cột.

Không chấm thêm điểm cho việc nhớ tên YAML. “Chạy lại app” chỉ đủ phương án nếu nói rõ app sẽ migrate đúng DB deploy trước khi sẵn sàng.

## Câu 2 — History theo DB, không theo repo đã chạy ở đâu

```text
A: V3 -> V10
B: V1 -> V2 -> V3 -> V10
Restart A sau thành công: không thực thi lại SQL của bốn version đó.
```

Phiên bản so theo số, V3 trước V10. Cuối cùng cả hai có id/name/description/stock, index name và history thành công V1/V2/V3/V10. Không suy dữ liệu Product giống nhau: migration schema không sao chép dữ liệu nghiệp vụ từ A sang B.

Không cần số lượng Product cụ thể vì đề không cấp dữ liệu đó. Nói “schema giống nên dữ liệu cũng giống” mất phần dữ liệu, không xóa điểm thứ tự đúng.

## Câu 3 — Hết trùng số chưa đủ, phải đúng phụ thuộc

Giữ ALTER thêm description là `V2__add_description.sql`; đổi bước index thành `V3__index_description.sql`. Hai description tên file khác nhau không làm version 2 trở thành hai version khác nhau.

Index cần description. Nếu đổi ALTER sang V3 và giữ index V2, DB đang ở V1 sẽ tạo index trước khi có cột, nên thứ tự không hợp lệ.

Nếu ALTER V2 đã phát hành, giữ nguyên nó, thêm index V3 chưa dùng. Không renumber quá khứ để nhường version. Không cần nêu timestamp version hoặc thuật toán merge Git.

## Câu 4 — Tên sai dẫn đến thiếu bước phụ thuộc

Tên đúng là `V2__add_description.sql`. Theo quy tắc đề cấp, khi kiểm tên tắt, file một underscore bị bỏ qua; DB vẫn thiếu description và V3 tạo index trên cột chưa có sẽ lỗi. Khi kiểm tên bật, lỗi tên được phát hiện sớm thay vì để đến SQL V3.

Vì file mới chưa phát hành, sửa naming V2, giữ nguyên V1; kiểm V2 thêm cột trước V3 tạo index rồi migrate. Không yêu cầu dự đoán history sau lần lỗi, không tự kết luận V3 đã thành công chỉ vì nó có tên đúng.

Nguồn hành vi option: [Validate Migration Naming](https://documentation.red-gate.com/flyway/reference/configuration/flyway-namespace/flyway-validate-migration-naming-setting).

## Câu 5 — Sửa lịch sử không nâng schema DB cũ

Mismatch so checksum migration hiện tại `new-202` với checksum đã ghi khi V1 chạy `old-101`. Nó không nói V1 mới đã được áp dụng. Restart không biến CREATE thành ALTER; V1 được ghi thành công không tự chạy lại.

DB mới chạy V1 sửa sẽ có description; DB cũ không có. Trong dữ kiện chỉ một V1 gốc đã phát hành, khôi phục nội dung V1 gốc, thêm:

```sql
-- V2__add_description.sql
ALTER TABLE products ADD COLUMN description TEXT;
```

Áp dụng V2 vào DB cũ, giữ bảng/dữ liệu. DB mới sau đó chạy V1 gốc rồi V2 cũng đạt schema mong muốn. Chỉ thêm V2 mà vẫn để checksum V1 sai chưa giải quyết mismatch; xóa bảng/DB chung trái yêu cầu giữ dữ liệu.

## Câu 6 — Lịch sử script không phải phép kiểm mọi cột

Không mâu thuẫn: file/history vẫn khớp, nhưng SQL tay đã làm schema thực tế lệch. Flyway validate kiểm quan hệ giữa migration có sẵn và lịch sử đã áp dụng; nó không chứng minh tất cả cột đúng Entity.

Điều tra: xác nhận DB/schema ứng dụng đang kết nối và xem cột products thực tế; đối chiếu file V2 với history DB đó. Chấp nhận kiểm bằng SQL hoặc công cụ DB, không bắt câu lệnh introspection cụ thể.

V2 đã thành công nên restart không tự chạy V2 để thêm lại cột. Không cần học cách phục hồi drift ở lesson này; chỉ cần không coi validate thành công là bằng chứng schema tuyệt đối đúng. [Flyway Validate](https://documentation.red-gate.com/flyway/reference/commands/validate).

## Câu 7 — Giữ dữ liệu trước khi siết điều kiện

Thêm cột không default vào hai dòng cũ khiến giá trị mới là NULL; NOT NULL không nhận được chúng. Sửa file mới chưa phát hành:

```sql
-- V2__add_description.sql
ALTER TABLE products ADD COLUMN description TEXT;
```

| id | name | description |
|---:|---|---|
| 10 | Java Book | NULL |
| 11 | Pen | NULL |

Sau này muốn bắt buộc: cấp mô tả hợp lệ cho dữ liệu cũ, rồi mới thêm NOT NULL; phải phối hợp đường ghi để không tiếp tục sinh NULL khi siết constraint. Ý phối hợp đường ghi là lưu ý thêm, **không tiêu chí mất điểm**. Không bắt SQL backfill/locking chưa dạy. Không thay NULL bằng chuỗi rỗng nếu chưa có yêu cầu nghiệp vụ.

## Câu 8 — Hai luồng ở hai thời điểm

```text
Khởi động:
Flyway kết nối DB -> đối chiếu history -> chọn V2 còn thiếu
-> PostgreSQL chạy ALTER -> ghi history thành công
-> JPA kiểm schema -> app sẵn sàng

HTTP:
GET -> Controller -> Service -> Repository/JPA -> PostgreSQL SELECT
-> Service map Product thành DTO -> Controller trả kết quả
-> Jackson chuyển response thành JSON -> client
```

Flyway quản lý bước nâng schema và history, PostgreSQL thực thi SQL, Repository/JPA phục vụ thao tác truy cập dữ liệu nghiệp vụ. Không bắt kể FilterChain/HandlerAdapter để nhận đủ điểm.

Migration lỗi thì không coi startup hoàn tất để phục vụ GET bình thường trong setup đề. Khi startup thành công, GET thứ hai tiếp tục đọc nghiệp vụ; không chạy lại V1/V2. Không cần viết Flyway bean hoặc sửa code Controller.

## Kiểm chứng chất lượng đề

| Kiểm tra | Kết quả |
|---|---|
| Phạm vi | Lesson 01 mục 1–7; SQL nullable và luồng MVC dùng kiến thức đã học |
| Độ sâu | Đúng DB đích; thứ tự/history; phụ thuộc file; bỏ qua tên sai; checksum; drift; dữ liệu cũ; startup/request |
| Dữ kiện | Naming và hành vi option cho sẵn; schema/SQL đủ để suy luận; không hỏi history sau lỗi |
| Rubric | Mỗi vế hỏi có điểm tương ứng; 8 × 5 = 40; không tiêu chí ẩn |
| Giới hạn | Review tĩnh và đối chiếu tài liệu; chưa chạy Flyway/PostgreSQL thật, không tuyên bố runtime test |

Nguồn cơ chế version/order/history: [Versioned Migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/versioned-migrations). Bài học đối chiếu: [Lesson 01](../../Notes/M2_Database/M2_3_Flyway/LESSON_01_MIGRATION_VA_SCHEMA_HISTORY.md). Phần giải thích trên là áp dụng cơ chế vào tình huống đề, không trích nguyên văn tài liệu.

