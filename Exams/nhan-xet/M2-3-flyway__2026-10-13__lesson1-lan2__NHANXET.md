# Nhận xét M2-3 Flyway Lesson 01: chấm đủ 8 câu

Ngày chấm: **2026-10-23**. Chấm bản đã lưu, câu 4–8 theo đề sửa ngày 2026-10-23. Đọc toàn bộ phần bổ sung, không bỏ qua ý viết sau câu cũ. Chấm theo ý nghĩa và rubric hiện hành, không trừ chính tả/Markdown, không sửa bài làm.

## 0. Snapshot và bài nộp

- [Bài nộp đủ 8 câu tại thời điểm chấm](archive/M2-3-flyway__2026-10-13__lesson1-lan2__2026-10-23__BAI_NOP_DU_8_CAU.md).
- [Nhận xét tạm câu 1–3 trước đây](archive/M2-3-flyway__2026-10-13__lesson1-lan2__2026-10-23__CHAM_TAM_CAU1_3.md).
- Archive cũ trước khi thay câu hỏi vẫn giữ nguyên. Điểm dưới đây thay điểm tạm, không cộng hai lần.

## 1. Điểm tổng và nhóm

**36/40 = 90/100: đạt Lesson 01.** Không đồng nghĩa đã đạt cả module Flyway hoặc đã chạy migration thực tế.

| Nhóm | Điểm | Mức |
|---|---:|---|
| DB đích, history, version và phụ thuộc (1–3) | 13,5/15 = 90% | Đạt |
| Naming, thêm schema và checksum (4–6) | 12,5/15 = 83,33% | Cần củng cố |
| Dữ liệu cũ và thời điểm chạy (7–8) | 10/10 = 100% | Đạt |

## 2. Bảng từng câu

| Câu | Đúng/Sai/Thiếu | Điểm | Nhận xét |
|---|---|---:|---|
| 1 | Đúng phần chính, kiểm sau migrate còn thiếu | 4,5/5 | Có history; chưa nói kiểm cột thật trên deploy sau xử lý. |
| 2 | Đã sửa đúng | 5/5 | Đủ thứ tự, restart và cùng schema nhưng dữ liệu có thể khác. |
| 3 | Đúng thứ tự, thiếu lý do phụ thuộc | 4/5 | An trước/Bình sau và thêm V3 khi V2 đã áp dụng; chưa giải thích index cần cột tồn tại. |
| 4 | Đúng | 5/5 | Naming, thêm cột nullable, giữ bảng và ghi history đúng theo ý nghĩa. |
| 5 | Thiếu SQL | 3,5/5 | Giữ V1, nêu mismatch, đặt V2 hợp lệ, giữ dữ liệu; chưa viết ALTER. |
| 6 | Hiểu phần lớn, nhầm nguồn checksum | 4/5 | Không rerun V1, validate file/history đúng; không phải checksum được tính từ schema thực tế. |
| 7 | Đúng theo ý kết luận cuối | 5/5 | NULL, giữ dòng cũ, NOT NULL thất bại và đủ data rồi thêm constraint đúng; cần xóa cụm gõ mâu thuẫn phía trước. |
| 8 | Đúng | 5/5 | History chọn V2, ghi thành công, GET không migrate, restart kiểm nhưng không rerun version cũ. |

## 3. Từng câu: làm được, thiếu gì, đáp án đúng

### Câu 1 — 4,5/5

- Repo/dev không chứng minh deploy có cột: **1/1**.
- Nhận đúng dev ở V2, deploy mới V1: **1/1**.
- Chọn chạy V2 trên deploy: **1/1**.
- History và schema thực tế sau xử lý: **0,5/1**. Đã bổ sung Flyway kiểm history để biết version áp dụng; chưa nêu kiểm cột thật trên deploy sau chạy. Câu thêm “ở Dev ... description” mô tả DB dev, chưa phải xác nhận DB deploy.
- Entity không tự đổi schema trong setup validate: **1/1**.

**Bổ sung đủ:** “Sau khi migrate deploy, xem history V2 thành công và bảng products trên chính deploy có description.”

Không trừ từ “chắc vậy”; thiếu điểm vì thiếu phép kiểm, không vì cách nói không tự tin. Đọc Lesson 01 mục 2 và 5.

### Câu 2 — 5/5

A chạy V3→V10 **1đ**, B V1→V2→V3→V10 **1đ**, theo version số **1đ**, không rerun khi restart **1đ**, cùng schema/history nhưng dữ liệu có thể khác **1đ**.

Bạn đã thêm câu cuối nói Flyway không copy data và data có thể khác. Nhận đây là **sửa kết luận cũ**, không giữ lỗi trước để trừ điểm. Cách nhớ: version là lịch sử thay đổi, không là bản sao mọi dòng Product. Trong phạm vi bài này migration thay đổi schema; ngoài thực tế script migration cũng có thể chứa INSERT/UPDATE dữ liệu, không nên hiểu Flyway tuyệt đối chỉ làm DDL.

### Câu 3 — 4/5

- Trùng version dù khác mô tả: **1/1**.
- Nhánh An trước, Bình sau: **1/1**; theo ngữ cảnh là An giữ V2, Bình thành V3. Không bắt lặp đủ tên file.
- Lý do index phụ thuộc cột: **0/1**. Bạn đã chọn đúng nhưng chưa giải thích vì sao “đổi bất kỳ file nào” có thể sai.
- Giữ V2 đã phát hành: **1/1**.
- Khi đó tạo version 3 cho bước còn lại: **1/1**, nhận ý câu “đã ... migration ... buộc phải tạo version 3”.

**Lý do cần thêm:** CREATE INDEX ... ON products(description) cần description tồn tại, nên ALTER thêm cột phải chạy trước. Không theo ai commit Git trước.

```text
V2: thêm description
-> V3: tạo index trên description
```

Đọc Lesson 01 mục 3–4 và 6. [Versioned migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/versioned-migrations).

### Câu 4 — 5/5

Tên sai một underscore **1đ**, tên đúng V2__add_description.sql **1đ**, thêm cột nullable **1đ**, giữ bảng **1đ**, ghi history version 2 thành công **1đ**.

Không bắt phải viết nguyên văn “không xóa bảng” khi bạn đã mô tả đúng ALTER thêm cột vào bảng hiện tại. Không trừ ý nói thêm về dữ liệu NULL.

**Lưu ý không trừ:** không mặc định version sau phải thêm NOT NULL. Chỉ thêm khi nghiệp vụ yêu cầu và đã xử lý dữ liệu cũ; cột nullable có thể là thiết kế đúng lâu dài.

### Câu 5 — 3,5/5

| Tiêu chí | Điểm |
|---|---:|
| Không sửa V1 đã áp dụng; nêu checksum mismatch là hậu quả | 2/2 |
| Tên V2 có format hợp lệ | 0,5/0,5 |
| Viết ALTER thêm cột TEXT nullable | 0/1,5 |
| Dữ liệu cũ giữ nguyên | 1/1 |

Tên bạn viết `V2__ADD_CONSTRAINT_NULL_COLUMN_DESCRIPTION.sql` hợp format; mô tả hơi lệch nhưng không trừ vì không làm đổi version/naming. **Tên file không thay cho nội dung SQL**. Bài hỏi viết một dòng SQL và phần đó chưa có; không tự lấy SQL ở đề câu khác làm câu trả lời của bạn.

Chữa đủ:

```sql
-- V2__add_description.sql
ALTER TABLE products ADD COLUMN description TEXT;
```

Không cần thêm “constraint NULL”: cột này mặc định cho phép NULL khi chưa có NOT NULL. Đọc Lesson 01 mục 4 và 6.

### Câu 6 — 4/5

- So checksum hiện tại với checksum đã lưu: **1/2**. Nhận 1đ vì nói đang so checksum và phía sau nhận file/history; còn giải thích “so sánh cấu trúc schema ... checksum” sai nguồn dữ liệu, mất 1đ cơ chế.
- Mismatch không có nghĩa V1 mới được thực thi; không rerun V1: **1/1**.
- Validate đối chiếu file/history, không toàn bộ Entity/schema: **2/2**.

Không chấm cả câu sai; cũng không cho đủ điểm chỉ vì dùng từ checksum. Hai điều bạn viết cần phân biệt:

```text
Đúng:
checksum từ nội dung file migration hiện tại
so với checksum lưu khi file được áp dụng

Không đúng:
Flyway đọc mọi bảng/cột hiện tại rồi tính checksum schema để so
```

Vì vậy thay đổi schema bằng SQL tay có thể không đổi checksum của file. **Checksum file khác phép kiểm schema thật.** Đọc Lesson 01 mục 5. [Flyway Validate](https://documentation.red-gate.com/flyway/reference/commands/validate).

### Câu 7 — 5/5

Kết quả hai dòng giữ nguyên và description=NULL **2đ**; nullable cho phép NULL **1đ**; thêm NOT NULL ngay không có giá trị cho dòng cũ gây lỗi **1đ**; cấp dữ liệu trước rồi siết constraint **1đ**.

Bạn có cụm “cần siết not null trước” nhưng ngay sau chốt “version sau này khi đủ data rồi ... thêm constraint not null sau”. Theo kết luận cuối và ngữ cảnh, nhận ý **đủ dữ liệu rồi mới siết**, không trừ một cụm gõ ngược ý mà phần sau đã làm rõ. Nên xóa cụm đầu để không tự mâu thuẫn khi đọc lại.

Bảng Markdown chưa chuẩn nhưng đọc được đủ hai dòng, không trừ. Cách viết lại phần cuối: “Giữ nullable trước → cấp mô tả hợp lệ cho dòng cũ → thêm NOT NULL khi cần.”

Không hiểu “không có constraint nào” là bỏ qua toàn bộ constraint của bảng: ý ở đây là description không có NOT NULL.

### Câu 8 — 5/5

Đọc history để chọn V2 **1đ**, áp dụng thành công ghi trạng thái **1đ**, GET là nghiệp vụ không migrate **1đ**, restart kiểm lại **1đ**, không thực thi lại version cũ thành công **1đ**.

Nhận “controller→service” là viết gọn đường xử lý request, không bắt kể lại toàn bộ MVC khi ý đối lập migration/nghiệp vụ đã đúng; luồng đầy đủ vẫn có Repository/DB để đọc dữ liệu.

Chỉnh nhỏ không trừ: “thay đổi gì mới” nên hiểu là thêm migration version mới hợp lệ; không sửa file version cũ rồi hy vọng nó tự chạy lại. Bạn đã nói rõ không rerun version cũ nên nhận đủ.

## 4. Phác đồ củng cố

- Kiểm kết quả trên DB đích → Lesson 01 mục 2/5 → 2 phút → nêu history và cột thật sau chạy.
- Phụ thuộc index/cột → mục 3/4 → 3 phút → thêm một câu “cột phải có trước index”.
- SQL nâng schema → mục 4/6 → 3 phút → tự viết ALTER thêm TEXT nullable.
- Checksum file khác schema → mục 5 → 4 phút → kể hai nguồn checksum đang đối chiếu.

## 5. Quyết định

**Đạt Lesson 01: 90/100.** Có thể học Lesson 02 trong cùng module M2-3; không cần thi lại để đạt 100. Cần sửa cách hiểu checksum dù tổng đạt. M2-3 vẫn đang học, chưa có điểm Lesson 02/03 hay xác nhận deliverable.

Tick đúng checklist versioned migration naming đã được chứng minh qua câu 2/3/4 và điểm lesson ≥85; không tick repeatable, seed, Boot autoconfig triển khai hoặc repair/CI chưa được kiểm tra.

## 6. Kế hoạch

Không cần kế hoạch học lại 3–5 ngày vì đã đạt. Ôn bốn điểm trên khoảng 12 phút; không giao project mới hoặc tự mở module kế tiếp.

## 7. Tiến độ và lịch sử

- Lượt tạm trước: câu 1–3 = 4 + 4,5 + 2 = 10,5/15 = 70% trên phần đã trả lời, chưa chốt lesson.
- Lượt đầy đủ này: **4,5 + 5 + 4 + 5 + 3,5 + 4 + 5 + 5 = 36/40 = 90%**.
- 05_TIEN_DO.md: M2-3 vẫn đang học, Lesson 01 đạt, điểm gần nhất 90 Lesson 01, ngày 2026-10-23, thêm một dòng log.
- 01_LO_TRINH.md: chỉ tick versioned naming, không rewrite mục tiêu/deliverable hoặc đổi toàn module thành đạt.
- Không chỉnh bài nộp, đề/bài giải hay tự coi kiểm tra của AI là thực hành của người học.
