# Bài giải và rubric M2-3 Flyway · Lesson 01, bản tình huống

> Đề ngày 2026-10-13, sửa riêng câu 4–8 ngày 2026-10-23; 8 × 5 = 40đ. Quy đổi điểm thô/40 ×100; đạt từ 34/40. Chấm bằng chứng trong câu trả lời, không thưởng độ dài hoặc chỉ nhắc từ khóa. Không yêu cầu code chạy, tên lỗi chính xác, repair/baseline hay API chưa học.

## Bảng rubric

| Câu | Tiêu chí và điểm tối đa | Bài học |
|---|---|---|
| 1 | (a) Repo/dev không chứng minh deploy có cột: 1; (b) dev có V2, deploy chưa có: 1; (c) migrate đúng deploy: 1; (d) xem history và schema thực tế trên đúng DB: 1, mỗi loại 0,5; (e) Entity không tự sinh/thực thi migration trong setup: 1 | Mục 1–2, 5, 7 |
| 2 | (a) A V3→V10: 1; B V1→V2→V3→V10: 1; (b) thứ tự phiên bản số: 1; (c) restart không chạy lại versioned thành công: 1; (d) schema/history đạt cùng chuỗi nhưng dữ liệu không nhất thiết giống: 1, mỗi ý 0,5 | Mục 3–5 |
| 3 | (a) vẫn trùng version 2: 1; (b) ALTER là V2, index là V3: 1; (c) cột phải tồn tại trước index: 1; (d) không đổi V2 đã phát hành: 1, thêm index bằng V3 chưa dùng: 1 | Mục 3–4, 6 |
| 4 | Tên sai một underscore và tên đúng: 2 (mỗi ý 1); SQL thêm cột nullable, không xóa bảng: 2 (mỗi ý 1); ghi history thành công: 1 | Mục 3–5 |
| 5 | Giữ V1 đã chạy và lý do không tự áp dụng thay đổi khi sửa V1: 2; tên V2 hợp lệ: 0,5 và ALTER nullable: 1,5; giữ dữ liệu cũ: 1 | Mục 1, 4, 6 |
| 6 | So checksum file hiện tại với checksum history: 2; mismatch không chứng minh SQL mới đã chạy, giải thích không tự rerun V1: 1; validate đối chiếu migration/history, không kiểm toàn schema/Entity: 2 | Mục 5–6 |
| 7 | Kết quả giữ hai dòng và description NULL: 2; nullable nhận NULL: 1; NOT NULL không có giá trị cho dòng cũ gây lỗi: 1; cấp giá trị hợp lệ rồi siết constraint: 1 | Mục 4, M2-2 |
| 8 | Đối chiếu history chọn V2: 1, chạy thành công ghi history: 1; GET đi qua các lớp đọc nghiệp vụ, không migrate: 1; restart có kiểm tra: 1 nhưng không thực thi lại SQL versioned thành công: 1 | Mục 2, 5, 7 |

## Cách chấm công bằng nhưng nghiêm

- Tiêu chí 1đ: đủ ý 1; đúng một phần 0,5; sai/không trả lời 0. Có thể chia 0,25 khi tiêu chí có các phần độc lập, phải ghi rõ.
- Đúng kết luận chưa đủ điểm phần lý do; giải thích hợp lý bằng từ của người học vẫn nhận đủ.
- Không yêu cầu checklist kỹ thuật ngoài các vế đề: không bắt log CLI chính xác, SQL đọc information_schema, transaction của DDL hay rollback migration.
- Ý đúng đã nói rõ ở câu khác được viện dẫn khi chấm, không bắt viết lặp; không tự suy ý từ kiến thức người học chưa thể hiện trong bài.
- Các tình huống độc lập. Câu 5 mới giữ nguyên V1 và hỏi thêm migration mới; không bắt xử lý sự cố checksum. Rubric câu 1–3 giữ nguyên để không đổi thước đo sau khi người học đã làm.
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

## Câu 4 — Đặt tên và hiểu tác dụng SQL

Tên `V2_add_description.sql` sai vì chỉ có một underscore phân cách. Tên đúng: `V2__add_description.sql`.

SQL thêm description kiểu TEXT cho phép NULL vào bảng đang có, không xóa bảng. Sau thành công Flyway lưu thông tin migration trong `flyway_schema_history`, giúp biết version đó đã áp dụng. Không cần nêu cấu trúc mọi cột history hoặc option kiểm naming.

## Câu 5 — Thay đổi mới dùng migration mới

Giữ nguyên V1 đã chạy trên DB chung: sửa nội dung file không làm DB cũ tự chạy lại và có thể gây checksum mismatch. Viết:

```sql
-- V2__add_description.sql
ALTER TABLE products ADD COLUMN description TEXT;
```

Không cần xóa id/name hay dựng lại bảng. Entity mô tả mapping mong muốn; migration thực hiện bước đổi schema. Không bắt thêm các bước repair, khôi phục V1 hay triển khai CI.

## Câu 6 — Đối chiếu lịch sử, không tự nâng schema

So checksum của file đang có với checksum lưu khi migration được áp dụng. Khác nhau báo nội dung/lịch sử không khớp, không phải xác nhận SQL mới đã chạy; V1 đã thành công không tự chạy lại chỉ vì bị sửa.

Validate chủ yếu đối chiếu migration khả dụng với history, không so tất cả cột DB với Entity. Đủ điểm nếu giải thích ngắn đúng hai loại bằng chứng; không bắt thuật toán checksum hoặc tên lệnh sửa. [Flyway Validate](https://documentation.red-gate.com/flyway/reference/commands/validate).

## Câu 7 — Nullable giữ được các dòng cũ

| id | name | description |
|---:|---|---|
| 10 | Java Book | NULL |
| 11 | Pen | NULL |

TEXT không có NOT NULL nên chấp nhận NULL. Nếu thêm NOT NULL ngay mà không default/cấp giá trị, các dòng cũ chưa có mô tả không đáp ứng constraint và thao tác sẽ lỗi. Sau này muốn siết: cấp giá trị hợp lệ cho dòng cũ trước, rồi áp dụng NOT NULL. Không yêu cầu cú pháp backfill hoặc triển khai nhiều bước production.

## Câu 8 — Kiểm tra lại khác chạy lại SQL

```text
Khởi động:
Flyway kết nối DB -> đối chiếu file/history -> biết thiếu V2
-> thực thi V2 thành công -> ghi history -> JPA kiểm schema -> app sẵn sàng

GET sau đó:
Controller -> Service -> Repository -> SQL đọc Product
(không chạy lại V1/V2)

Restart cùng trạng thái:
Flyway vẫn kiểm tra file/history
-> không có versioned pending -> không thực thi lại SQL V1/V2
```

Không nói Flyway chỉ hoạt động đúng lần đầu trong đời app: mỗi startup có thể kiểm tra nhưng SQL versioned đã thành công không tự rerun. Đề không đòi luồng MVC nội bộ/Jackson.

## Kiểm tra chất lượng bản sửa ngày 2026-10-23

- Giữ nguyên câu 1–3, bài làm và rubric đã dùng để chấm.
- Chỉ câu 4–8 đổi cách hỏi: naming, migration mới, checksum, nullable, thời điểm chạy.
- Mỗi câu một tình huống, tối đa ba nhóm yêu cầu; tránh chồng debug tùy chọn cấu hình.
- Mỗi vế hỏi có điểm; từng câu 5đ, tổng 40đ; không hỏi repair/baseline/repeatable.
- Đã review tĩnh theo Lesson 01; không tuyên bố đã chạy Flyway/DB thật.
- Bản đề và rubric trước sửa lưu trong `Exams/nhan-xet/archive/`; snapshot chấm câu 1–3 ghi nhận phiên bản đề trước sửa.

Nguồn cơ chế: [Versioned Migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/versioned-migrations), [Validate](https://documentation.red-gate.com/flyway/reference/commands/validate). Đọc lại [Lesson 01](../../Notes/M2_Database/M2_3_Flyway/LESSON_01_MIGRATION_VA_SCHEMA_HISTORY.md).
