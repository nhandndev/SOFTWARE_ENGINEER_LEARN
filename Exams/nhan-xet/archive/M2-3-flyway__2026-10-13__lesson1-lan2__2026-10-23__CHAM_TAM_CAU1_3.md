# Chấm phần đã làm: M2-3 Flyway Lesson 01, câu 1–3

Ngày chấm: **2026-10-23**. Chấm bản đã lưu trước khi sửa riêng câu 4–8 theo yêu cầu. Chấm theo ý nghĩa, không trừ lỗi gõ hoặc câu phàn nàn cách hỏi. Câu 4–8 đang trống, **chưa chấm**, không tính thành 0 để kết luận trượt lesson.

## 0. Bản nộp và rubric tại thời điểm chấm

- [Toàn bộ đề và bài làm trước sửa](archive/M2-3-flyway__2026-10-13__lesson1-lan2__2026-10-23__TRUOC_SUA_DE.md).
- [Rubric trước sửa](archive/M2-3-flyway__2026-10-13__lesson1-lan2__2026-10-23__RUBRIC_CU.md).
- Câu 1–3 trong đề hiện hành giữ nguyên từng chữ. Câu 4–8 mới chưa có điểm, không dùng rubric mới chấm bài cũ.

## 1. Điểm tổng và nhóm

**10,5/15 = 70/100 trên ba câu đã làm.** Đây là đánh giá tạm phần đã trả lời, không phải 70 điểm toàn lesson hay module. Tổng tối đa đề đầy đủ vẫn 40; chưa chốt đạt/trượt lesson.

| Nhóm theo các câu đã làm | Điểm | Mức cần củng cố |
|---|---|---|
| DB đích và vai trò Entity, câu 1 | 4/5 = 80% | Cần ôn bước xác nhận |
| Thứ tự/history và dữ liệu, câu 2 | 4,5/5 = 90% | Đạt nhóm; còn nhầm dữ liệu |
| Version và phụ thuộc migration, câu 3 | 2/5 = 40% | Cần học lại lý do chọn thứ tự |

## 2. Bảng từng câu

| Câu | Kết quả | Điểm | Nhận xét |
|---|---|---:|---|
| 1 | Đúng hướng, thiếu xác nhận sau chạy | 4/5 | Phân biệt dev/deploy, chạy V2 vào deploy và Entity chỉ validate đúng; chưa nêu kiểm history và cột thật sau đó. |
| 2 | Đúng thứ tự, nhầm dữ liệu với schema | 4,5/5 | A/B và restart đúng; cùng version không chứng minh các Product trong DB giống nhau. |
| 3 | Đúng tránh trùng version/giữ bản phát hành, sai cách sắp thứ tự | 2/5 | Không chọn theo ai commit Git trước; phải tạo cột trước index, chưa nêu rõ file index thành V3 khi V2 đã phát hành. |
| 4–8 | Chưa trả lời | Chưa chấm | Đã viết lại câu hỏi theo yêu cầu; không trừ điểm phần trống ở lượt này. |

## 3. Bạn đúng gì, thiếu gì và chữa từng câu

### Câu 1 — 4/5

| Vế rubric | Bằng chứng/đánh giá | Điểm |
|---|---|---:|
| a: dev/repo không chứng minh deploy có cột | Bạn nói phải xem môi trường, dev chạy không bảo đảm deploy | 1/1 |
| b: dev đã V2, deploy mới V1 | Đã nói rõ | 1/1 |
| c: migrate đúng deploy | “Deploy cần phải được chạy thêm V2” là phương án đúng | 1/1 |
| d: kiểm history và cột thực tế sau xử lý | Chưa viết hai phép kiểm sau khi migrate; nhận diện dữ kiện ban đầu không thay thế yêu cầu này | 0/1 |
| e: Entity không tự thêm cột trong setup | Bạn dùng đúng Hibernate validate theo giả định đề | 1/1 |

**Chỉ cần bổ sung:** sau migrate vào DB deploy, xem history ghi V2 thành công và xem bảng products thật có description. Không bắt phải thuộc SQL kiểm schema hoặc câu lệnh CLI.

Nhớ: **chọn đúng DB → chạy migration → xác nhận history và schema thật**. Đọc Lesson 01 mục 2 và 5.

### Câu 2 — 4,5/5

| Vế rubric | Điểm |
|---|---:|
| A chạy V3 rồi V10 | 1/1 |
| B chạy V1, V2, V3, V10 | 1/1 |
| Phiên bản nhỏ trước lớn | 1/1 |
| Restart không thực thi lại versioned đã thành công | 1/1 |
| Cùng chuỗi schema/history nhưng không suy cùng dữ liệu | 0,5/1 |

Nhận 0,5 cuối cho ý cả hai lên cùng phiên bản mới nhất trong câu trả lời; không bắt liệt kê lại từng cột khi ý nâng schema đã rõ. Mất 0,5 vì kết luận “dữ liệu nghiệp vụ giống” sai.

**Schema** là cấu trúc bảng/cột/constraint/index. **Dữ liệu nghiệp vụ** là các dòng Product đang lưu.

Ví dụ cả hai DB đều có products(id, name, description, stock), cùng history V1/V2/V3/V10, nhưng dữ liệu có thể là:

| DB | Dòng Product minh họa |
|---|---|
| A | (1, Keyboard, NULL, 0) |
| B | Không có Product |

Migration thêm cột/index không tự copy Product từ A sang B. Đây là một phản ví dụ hợp lệ, không phải tự bổ sung dữ kiện để bắt bạn đoán kết quả đề. Bạn trả lời đúng phần restart: Flyway vẫn có thể kiểm tra history khi startup, nhưng không chạy lại SQL versioned đã thành công. Câu hỏi cũ muốn phân biệt hai việc đó, không khẳng định phải có một version chạy lại.

Đọc Lesson 01 mục 2, 4–5: history ghi các bước đã áp dụng, không phải bản sao dữ liệu nghiệp vụ.

### Câu 3 — 2/5

| Vế rubric | Bằng chứng/đánh giá | Điểm |
|---|---|---:|
| Khác mô tả vẫn trùng version 2 | Bạn đã nói không được trùng version | 1/1 |
| Chọn ALTER là V2, index là V3 | Chưa chọn theo nội dung; quy tắc “ai commit trước” không bảo đảm đúng | 0/1 |
| Cột phải tồn tại trước khi tạo index trên nó | Chưa nêu, thay bằng thứ tự Git | 0/1 |
| Không đổi V2 đã phát hành | Đã nói giữ nguyên | 1/1 |
| Khi đó thêm file index V3 chưa dùng | Chưa nói rõ; không tự suy từ câu “file sau” vì bạn đang dùng quy tắc commit trước/sau | 0/1 |

**Sửa đúng theo hai dòng SQL của đề:**

```sql
-- V2__add_description.sql
ALTER TABLE products ADD COLUMN description TEXT;

-- V3__index_description.sql
CREATE INDEX idx_products_description ON products(description);
```

Không có description thì không thể tạo index trên description. Vì thế version phải biểu diễn **thứ tự phụ thuộc SQL**, không theo timestamp tạo file hay commit Git. Nếu nhánh index commit trước, vẫn phải xếp bước thêm cột trước index.

Nếu V2 thêm cột đã chạy trên DB chung: giữ V2, thêm index bằng V3. Khác với trường hợp file chưa phát hành, không renumber quá khứ để nhường số. Flyway từ chối trùng version, không tự chọn file Git cũ hơn. [Versioned migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/versioned-migrations).

Đọc Lesson 01 mục 3–4 và 6.

## 4. Phác đồ ôn ngắn

- Kiểm đúng DB sau migrate → Lesson 01 mục 2, 5 → 3 phút → nói hai điều phải kiểm sau khi chạy V2.
- Schema khác dữ liệu → Lesson 01 mục 4–5 và ví dụ câu 2 ở trên → 4 phút → cho hai DB cùng cột nhưng khác dòng.
- Phụ thuộc migration → Lesson 01 mục 3–4 → 5 phút → giải thích vì sao ALTER phải đứng trước CREATE INDEX.

## 5. Quyết định

**Ôn thêm phần đã làm, tiếp tục câu 4–8; chưa kết luận lesson đạt hoặc trượt.** Giữ M2-3 đang học. Không tick checklist module, không xác nhận deliverable hay mở module mới.

## 6. Kế hoạch

Chưa yêu cầu học lại 3–5 ngày vì đây là lượt chấm từng phần. Ôn 12 phút ba ý trên, có thể sửa câu 1–3 rồi trả lời câu 4–8 đã viết rõ hơn. Chỉ lên kế hoạch học lại dài khi có kết quả đầy đủ cho thấy cần thiết.

## 7. Cập nhật và phiên bản đề

- 05_TIEN_DO.md: giữ trạng thái đang học; điểm gần nhất 70 (tạm câu 1–3), ngày kiểm tra 2026-10-23, thêm một dòng log.
- 01_LO_TRINH.md: không sửa vì chưa chốt lesson/checklist.
- Câu 4–8 mới giữ mỗi câu 5 điểm: tên file; thêm migration thay vì sửa V1; checksum; nullable; startup khác GET/restart. Cách hỏi ngắn hơn nhưng vẫn yêu cầu giải thích bản chất.
- Không thay câu 1–3 hoặc câu trả lời của người học. Archive giữ nguyên đề và rubric cũ để sau này biết điểm được chấm theo phiên bản nào.

