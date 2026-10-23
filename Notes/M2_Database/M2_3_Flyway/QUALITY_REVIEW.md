# Kiểm tra chất lượng M2-3 Flyway

Ngày rà mới nhất: **2026-10-23**. Đây là kiểm tài liệu, không chấm lại người học. Đã rà từng lesson trước, rồi đối chiếu đề/bài giải tương ứng; không chỉ đọc danh mục và kết luận đủ.

## 1. Kết luận theo từng lesson

| Bài | Nhận định trước sửa | Xử lý |
|---|---|---|
| 01 | Cốt lõi kỹ thuật đúng nhưng diễn đạt thiếu bước: schema/data, thứ tự phụ thuộc và kiểm lại/rerun dễ gây hiểu sai | Viết lại toàn bài, giữ 8 mục chính để liên kết chữa bài vẫn dùng được |
| 02 | Phạm vi và SQL chính phù hợp; thuật ngữ classpath/view và tác động seed còn thiếu minh họa | Bổ sung giải thích locations khác URL, view thường, R không tự khôi phục dữ liệu và trace DO NOTHING |
| 03 | Cảnh báo an toàn đúng; nhiều thuật ngữ, kết quả rollback/baseline chưa đủ trực quan | Thêm giải nghĩa và bảng trước/sau; trace repair không đổi schema; hai DB baseline/migrate và ví dụ CI giữ dòng cũ |

**Không cần thay cả module bằng một bài mới hoặc tách thêm lesson.** Ba lesson vẫn đủ checklist hiện tại; cần sửa cách dẫn dắt và ví dụ. Không tự tuyên bố mọi kiến thức Flyway đã được bao phủ.

## 2. Các vấn đề cụ thể đã sửa

1. Lesson 01 chưa tách rõ Entity/schema/dữ liệu/migration: thêm bảng vai trò và hai DB cùng cột khác Product.
2. “History riêng” còn trừu tượng: thêm DB dev/deploy và hai phép kiểm sau migrate.
3. Version conflict có mô tả nhưng chưa trace phụ thuộc: dùng ALTER description trước CREATE INDEX description, nêu rõ không theo ai commit Git trước.
4. Thêm cột chỉ có SQL, thiếu kết quả dòng cũ: thêm bảng id/name/description=NULL.
5. Checksum và schema validation dễ lẫn: giải thích hai nguồn checksum, mismatch không chứng minh SQL mới đã chạy; file/history khác schema thực tế.
6. Restart dễ bị hiểu là Flyway không chạy nữa: tách kiểm history với thực thi SQL versioned.
7. Lesson 02 bổ sung ví dụ R đã chạy nhưng không tự reset dữ liệu; sửa giá seed vẫn DO NOTHING thì giá cũ không đổi.
8. Lesson 03 bổ sung trace đúng thời điểm: stock=-1 chưa lỗi tại UPDATE vì CHECK mới chưa tồn tại; lỗi ở ADD CONSTRAINT.
9. Baseline thiếu sơ đồ hai đường: DB cũ ghi mốc, DB trống migrate V1; không coi baseline tạo schema.
10. Kế hoạch/báo cáo cũ còn ghi chưa bắt đầu và map theo đề Lesson 01 cũ: cập nhật phần hiện hành, giữ lịch sử phía dưới có nhãn rõ.

## 3. Đối chiếu đề hiện hành với bài học

Lesson 01 dùng đề 2026-10-13, **câu 4–8 sửa ngày 2026-10-23**; Lesson 02/03 dùng đề 2026-10-05. Các số là mục trong lesson, không phải điểm.

| Bài | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 |
|---|---|---|---|---|---|---|---|---|
| 01 | 1/2/5/7 | 1/3/5/7/8 | 3/4/6 | 3/4/5 | 1/4/6 | 5/6 | 4 | 2/5/7 |
| 02 | 1/2 | 3 | 3 | 4/7 | 4 | 5 | 6 | 5 |
| 03 | 2 | 4 | 3 | 5 | 1/6/7 | 6 | 8 | 2/7 |

Không yêu cầu repair ở Lesson 01, GitHub Actions syntax ở Lesson 03, hoặc thuộc Maven artifact để thay thế hiểu vai trò. Ví dụ Java chỉ minh họa mapping, không bị trình bày như project runnable.

## 4. Kiểm chứng kỹ thuật lần này

- Đọc lại pom: khai báo Boot 4.1.1/Java 21, chưa có dependency JPA/Flyway/pgJDBC. Không sửa pom hoặc cài thêm thư viện.
- Mở tài liệu chính thức Boot current (lúc rà hiển thị 4.1.2), Flyway versioned/repeatable/validate/repair/baseline/transaction và PostgreSQL CREATE VIEW.
- Đối chiếu starter Flyway + module PostgreSQL, vai trò DataSource, R theo checksum, repair tác động history, baseline bỏ qua tới mốc và transaction theo từng migration.
- Kiểm cấu trúc Markdown, liên kết nội bộ và 8 câu/chỗ trả lời/bài giải cho mỗi đề hiện hành bằng script.
- Không đổi câu trả lời, điểm, snapshot chấm hoặc checklist học viên ở lượt kiểm tài liệu này.

## 5. Giới hạn và cách dùng

Lần này là **review tĩnh, đối chiếu tài liệu và trace ví dụ**, chưa chạy mới Flyway CLI/Boot/PostgreSQL/CI. Không biến kết quả SQL runtime từ báo cáo cũ thành kiểm chứng runtime của bài viết lại hôm nay. Phiên bản phụ thuộc thực tế vẫn phải dùng BOM/pom dự án khi triển khai.

Video vẫn là từ khóa tìm thêm, chưa xác minh một video cụ thể. Tài liệu dài không tự bảo đảm người học dễ hiểu; cần dùng bài làm/feedback tiếp theo để điều chỉnh. Có thể đọc lại Lesson 01 mới trước khi sửa câu 1–3 hoặc làm câu 4–8; không bắt học lại cả module vì tài liệu được sửa.

## 6. Nguồn

- [Versioned](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/versioned-migrations), [repeatable](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/repeatable-migrations).
- [Validate](https://documentation.red-gate.com/flyway/reference/commands/validate), [repair](https://documentation.red-gate.com/flyway/reference/commands/repair), [baseline](https://documentation.red-gate.com/flyway/reference/commands/baseline).
- [Transactions](https://documentation.red-gate.com/fd/migration-transaction-handling-273973399.html).
- [Boot database initialization](https://docs.spring.io/spring-boot/how-to/data-initialization.html).
- [PostgreSQL CREATE VIEW](https://www.postgresql.org/docs/current/sql-createview.html).

---

## Lưu báo cáo cũ ngày 2026-10-07

**Phần dưới là lịch sử đánh giá ở thời điểm cũ**, bao gồm đề Lesson 01 và trạng thái lúc đó; không dùng bảng mapping/trạng thái cũ làm bản hiện hành. Các ghi nhận chạy PostgreSQL bên dưới là báo cáo lịch sử, không phải phép kiểm được chạy lại ngày 2026-10-23.

# Kiểm chứng tài liệu M2-3 Flyway

Ngày rà lại: **2026-10-07** (bản đầu 2026-10-06). Đánh giá chất lượng **tài liệu**, không chấm điểm người học. Đã đọc cả ba lesson, ba đề, ba đáp án, kế hoạch và phạm vi roadmap, rồi sửa từng nhóm vấn đề.

## Những vấn đề tìm thấy và đã sửa

| Vấn đề trước rà | Sửa trực tiếp | Lý do phù hợp người học |
|---|---|---|
| Setup chính Boot 3.5 không khớp shopcore Boot 4.1.1 | Lesson 02 dùng starter JPA + starter Flyway + module PostgreSQL + driver; nêu rõ chưa cài | Không để học viên copy thiếu dependency theo project thực tế |
| Version conflict chỉ nhắc một câu, đề tập trung restart/lịch sử | Thêm tình huống hai V3 và thay câu 4 Lesson 01 | Kiểm cách xử lý thay đổi schema cùng nhóm, giảm lặp định nghĩa |
| Seed chỉ có Category, chưa thấy Product lấy FK thật | Thêm INSERT...SELECT Product, case ID=42 và thiếu Category 0 dòng; thay câu 7 Lesson 02 | Nối SQL/affected rows/constraint M2-2 với migration |
| Ví dụ stock=0 và CHECK>=0 không tự tái hiện lỗi | Dùng stock=-1, bảng có dòng; thêm đầy đủ SQL vào câu 3 Lesson 03 | Người học có thể tự chỉ lệnh lỗi và trạng thái sau rollback |
| Test seed/CI còn trừu tượng | Dạy test-only resources, CI là chuỗi bước và ví dụ giữ Product cũ | Không ép học JUnit/GitHub Actions trước module tương ứng |
| Chưa tách điều cần hiểu và điều tra cứu | Thêm định hướng từng bài và kế hoạch Backend→AI | Tránh biến bài thành thuộc tên property |

## 1. Từng lesson được kiểm gì?

| Bài | Phạm vi đã đối chiếu | Tình huống minh họa | Điểm kỹ thuật đã rà |
|---|---|---|---|
| 01 | Entity/migration, naming, order, history/checksum | V1 tạo Product/Category, V2 thêm cột, V3 thêm index; DB mới/cũ | Hai underscore; version theo số; đã chạy không tự chạy lại; validate không kiểm toàn schema |
| 02 | Autoconfig, config, R và seed/profile | Boot 4.1.1 dependencies/YAML; view; Category/Product seed | JPA và Flyway starter phù hợp project; R theo checksum; seed FK thật, thiếu nguồn thì 0 dòng; test-only data |
| 03 | Failure, repair/baseline, deploy, CI | Transaction lỗi V2; checksum V1; DB cũ; đổi name→title | Repair không chạy SQL/undo; baseline không xác minh schema; không transactional có ngoại lệ; CI cài mới và nâng cấp |

Mỗi bài có mục tiêu, tiên quyết, giải thích ngôn ngữ đơn giản, SQL/config có ngữ cảnh, luồng/timeline, lỗi hay nhầm, tài liệu/video gợi ý và đề riêng. Các phần nối SQL/config/JPA đã học để tránh yêu cầu thuộc công cụ mới từ đầu.

## 2. Câu hỏi đã được dạy trong bài chưa?

Số dưới là mục tương ứng trong file lesson, theo thứ tự câu 1 đến 8:

| Bài | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 |
|---|---|---|---|---|---|---|---|---|
| 01 | 1–2 | 3 | 3–5 | 3/5 | 6 | 5 | 7 | 4 |
| 02 | 1–2 | 3 | 3 | 4/7 | 4 | 5 | 6 | 5 |
| 03 | 2 | 4 | 3 | 5 | 1/6/7 | 6 | 8 | 2/7 |

Đã rà cả yêu cầu lẫn đáp án: không đòi GitHub Actions syntax, migration thật, DB cài sẵn hay API chưa dạy. Mỗi đề độc lập, dùng 8 câu có chỗ trả lời. Mỗi câu 5đ, rubric đủ 5đ; 40đ normalize về 100. Câu SQL yêu cầu đoạn nhỏ, không đòi tự dựng toàn project.

## 3. Nguồn đã đối chiếu

- [Versioned migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/versioned-migrations).
- [Repeatable migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/repeatable-migrations).
- [Validate](https://documentation.red-gate.com/flyway/reference/commands/validate), [repair](https://documentation.red-gate.com/flyway/reference/commands/repair), [baseline](https://documentation.red-gate.com/flyway/reference/commands/baseline).
- [Migration transactions](https://documentation.red-gate.com/fd/migration-transaction-handling-273973399.html).
- [Boot 4.1.1/current](https://docs.spring.io/spring-boot/how-to/data-initialization.html), đối chiếu shopcore/pom.xml; Boot 3.5 chỉ còn ghi chú tương thích.
- [PostgreSQL INSERT](https://www.postgresql.org/docs/current/sql-insert.html) cho ON CONFLICT.

Nguồn đã được mở đối chiếu, không chỉ gắn link tìm kiếm. Video là từ khóa tìm thêm, chưa kiểm chứng một video cụ thể.

## 4. Kiểm tra cấu trúc và giới hạn

Đã kiểm bằng script đọc file: link Markdown nội bộ tồn tại; code fence cân bằng; đủ đề/đáp án tương ứng; câu 1–8 và đủ 8 dòng trả lời, đủ 8 rubric. Kế hoạch lesson đối chiếu đủ 5 checklist M2-3 và phần CI trong mục tiêu roadmap.

**Đã chạy PostgreSQL 17 tạm**, container riêng không mount dữ liệu và không publish port, đã dừng/xóa sau kiểm. Trích các block SQL trực tiếp từ lesson cho schema V1, thêm description/index, seed, view và migration stock; không gõ một bản SQL khác rồi coi là chứng minh bài đúng.

Chín ca phần Flyway/SQL đều đạt:

1. Product seed lấy đúng Category id=42.
2. Chạy seed lại không trùng SKU.
3. DO NOTHING không overwrite tên Product đã sửa.
4. Thiếu Category thì INSERT...SELECT thêm 0 dòng.
5. Thêm description nullable giữ dòng cũ, giá trị ban đầu NULL.
6. CREATE OR REPLACE VIEW áp lại được với cùng định nghĩa.
7. Stock=-1 làm CHECK>=0 thất bại.
8. Rollback transaction thử nghiệm hủy cột stock vừa thêm.
9. Product từ giai đoạn đã commit trước vẫn còn.

Ca rollback dùng PL/pgSQL subtransaction để tái hiện tính transactional của DDL/DML, **không phải chạy Flyway CLI**. V/R order, history/checksum, repair/baseline và Boot autoconfig được đối chiếu tài liệu chính thức, chưa kiểm runtime Flyway/Boot hoặc CI thật. YAML được parse về cú pháp, chưa chứng minh Spring binding runtime. Không có deliverable tự đánh dấu hoàn thành.

Các câu hiện tại có cả nhận diện, đọc dữ liệu, viết SQL ngắn và chọn cách xử lý; không đòi trả lời đúng từng từ trong đáp án. Nếu diễn đạt khác mà đủ ý đúng thì rubric vẫn cho điểm tương ứng. Chưa dùng đề để chấm người học nên không tuyên bố đề đã được kiểm định độ khó bằng kết quả thực tế.

Trạng thái M2-3 trong 01_LO_TRINH.md và 05_TIEN_DO.md vẫn “Chưa bắt đầu”; checklist không tick. Có thể dùng bộ tài liệu này để học từng bài và làm đề, rồi kiểm thực hành riêng khi người học chọn triển khai.
