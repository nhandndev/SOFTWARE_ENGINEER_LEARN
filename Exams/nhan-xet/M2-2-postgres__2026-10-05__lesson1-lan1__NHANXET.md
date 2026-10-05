# Chấm lại M2-2 PostgreSQL - Lesson 01

Ngày chấm: 2026-10-05. Kết quả mới nhất theo bài làm đã lưu. Chấm ý nghĩa, không trừ lỗi gõ hoặc Markdown.

## 1. Điểm tổng và nhóm kiến thức

**39/40 = 97,5/100 — 🟢 Đạt Lesson 01.** Chưa kết luận toàn M2-2 đạt; còn Lesson 02–04.

| Nhóm | Điểm | Kết quả |
|---|---|---|
| Kiểu dữ liệu (câu 1) | 5/5 = 100% | 🟢 |
| ID, constraint, NULL, default (câu 2–6) | 24/25 = 96% | 🟢 |
| Đồng thời và thiết kế constraint (câu 7–8) | 10/10 = 100% | 🟢 |

## 2. Bảng từng câu

| Câu | Kết quả | Điểm | Nhận xét |
|---|---|---|---|
| 1 | Đúng | 5/5 | Đủ NUMERIC, TIMESTAMPTZ, JSONB, UUID. |
| 2 | Đúng | 5/5 | Đã thêm PK cấm NULL; phân biệt đúng IDENTITY sinh ID và PK bảo vệ ID. |
| 3 | Thiếu một ý | 4/5 | Đã phân biệt CHECK và NOT NULL; chưa kết luận rõ bỏ NOT NULL thì NULL được nhận, vẫn giữ câu “không thể dùng phép so sánh với NULL”. |
| 4 | Đúng về kiến thức | 5/5 | Đã nói trùng SKU bị chặn, chưa tồn tại thì không bị UNIQUE chặn; đủ các ý NULL. Dữ liệu chung đã cho BK-01 tồn tại. |
| 5 | Đúng | 5/5 | Đủ FK tùy chọn, Category tồn tại và NOT NULL khi bắt buộc. |
| 6 | Đúng | 5/5 | Đúng chuỗi rỗng, default khi bỏ cột, NULL tường minh. |
| 7 | Đúng | 5/5 | Đã bổ sung hai request cùng qua Service check; UNIQUE ở DB chặn trùng, handler quyết định response. |
| 8 | Đúng | 5/5 | Đã viết đủ ba định nghĩa cột và lý do DTO không thay DB constraint. |

## 3. Bạn làm được gì, còn thiếu gì, đáp án đúng

### Câu 1 — 5/5

Đúng đủ ý, không thiếu theo rubric: NUMERIC cho số thập phân chính xác; TIMESTAMPTZ biểu diễn thời điểm, hiển thị theo múi giờ session và không giữ tên múi giờ gốc; JSONB hợp thuộc tính linh hoạt; UUID có thể làm ID khi phù hợp.

### Câu 2 — 5/5

Đã sửa đủ phần thiếu. IDENTITY sinh ID mặc định bằng sequence; PRIMARY KEY bảo đảm duy nhất và không NULL. BY DEFAULT vẫn cho chèn ID tường minh, nên IDENTITY không thay ràng buộc duy nhất.

### Câu 3 — 4/5

Bạn đã nói rõ CHECK kiểm tra giá trị phải dương, NOT NULL cấm NULL, nên không còn trừ phần phân biệt hai constraint. Vẫn thiếu phần đề hỏi khi bỏ NOT NULL và còn câu cũ gây hiểu nhầm.

Đáp án đầy đủ:

| Giá | Kết quả | Constraint |
|---|---|---|
| 100 | Nhận | Đúng các quy tắc |
| 0 | Từ chối | CHECK (price > 0) |
| -5 | Từ chối | CHECK (price > 0) |
| NULL | Từ chối | NOT NULL |

**Nếu bỏ NOT NULL, price=NULL được nhận bởi CHECK này.** Biểu thức `NULL > 0` viết được trong SQL nhưng cho kết quả UNKNOWN/NULL. CHECK chỉ từ chối khi biểu thức là FALSE; TRUE hoặc NULL được chấp nhận.

Cách sửa câu chữ: thay “không thể dùng phép so sánh với NULL” bằng “so sánh với NULL cho UNKNOWN; CHECK không tự cấm NULL nên phải có NOT NULL”.

Đọc lại [Lesson 01 mục 4.5](../../Notes/M2_Database/M2_2_PostgreSQL/LESSON_01_KIEU_DU_LIEU_CONSTRAINT.md); checklist M2-2: CHECK, NOT NULL.

### Câu 4 — 5/5

Bạn nêu đúng nguyên tắc: SKU đã tồn tại bị UNIQUE chặn, SKU mới không bị UNIQUE chặn; NULL bị NOT NULL chặn; chỉ UNIQUE mặc định thì nhiều NULL được nhận.

Đề có ghi ở phần dữ liệu chung: products có một dòng `sku='BK-01'`. Áp dụng vào đề thì Product mới có BK-01 bị từ chối. Cho đủ điểm phần kiến thức vì bạn đã giải thích đúng điều kiện chặn, không trừ việc bỏ sót dữ liệu đầu đề.

### Câu 5 — 5/5

Đúng và đủ: 2 được nhận vì Category tồn tại; 999 bị FK chặn; NULL được nhận vì cột FK cho NULL. Khi bắt buộc có Category, thêm NOT NULL và giữ REFERENCES.

### Câu 6 — 5/5

Đúng và đủ: NOT NULL không chặn chuỗi rỗng; bỏ cột created_at dùng DEFAULT now(); gửi NULL tường minh không được default thay thế và bị NOT NULL chặn.

Lưu ý thêm: DEFAULT không tự cập nhật timestamp mỗi lần UPDATE. Đây là ghi chú thêm, không phải phần bị thiếu điểm.

### Câu 7 — 5/5

Bạn đã bổ sung đúng trọng tâm đồng thời:

```text
A kiểm tra SKU -> chưa có
B kiểm tra SKU -> chưa có
A thử lưu SKU
B thử lưu cùng SKU
```

Service check có thể đúng ở thời điểm kiểm tra nhưng không bảo đảm quy tắc lúc ghi. UNIQUE tại DB không cho cả hai dòng trùng SKU cùng lưu thành công. Nếu bên ghi trước commit, bên còn lại sẽ bị vi phạm UNIQUE; nếu bên ghi trước rollback, bên còn lại có thể thành công.

Ý handler tùy cách người viết ánh xạ lỗi là đúng: không tự khẳng định DB exception luôn thành HTTP 409.

### Câu 8 — 5/5

Đã viết đúng toàn bộ:

```sql
sku TEXT NOT NULL UNIQUE,
price NUMERIC(12,2) NOT NULL CHECK (price > 0),
category_id BIGINT NOT NULL REFERENCES categories(id)
```

Giải thích đúng DB còn bảo vệ SQL trực tiếp và các đường ghi không qua DTO validation. Không thiếu ý theo rubric.

## 4. Ôn phần còn thiếu

CHECK với NULL → Lesson 01 mục 4.5 và tài liệu Constraints trong checklist M2-2 → 5 phút → tự nói kết quả INSERT price=NULL khi có/không có NOT NULL.

## 5. Quyết định

**🟢 Đạt Lesson 01, có thể học Lesson 02 trong M2-2.** Module vẫn đang học vì mới đánh giá lesson đầu tiên. Tick hai checklist đã được chứng minh: nhận diện kiểu dữ liệu và constraint. Sequence/identity ở mức vận hành còn thuộc Lesson 04 nên chưa tick riêng mục đó.

## 6. Kế hoạch tiếp theo

Không cần kế hoạch học lại 3–5 ngày vì đã đạt. Ôn 5 phút câu 3 rồi học Lesson 02: ghi dữ liệu an toàn.

## 7. Tiến độ và lịch sử

- Lần chấm trước: 31/40 = 77,5/100. Thiếu PK cấm NULL, phân biệt CHECK/NOT NULL, kết luận SKU trùng, race condition và SQL câu 8.
- Lần này: 39/40 = 97,5/100. Đã bổ sung các phần trên; chỉ còn 1 điểm ở câu 3 cho trường hợp bỏ NOT NULL.
- 05_TIEN_DO.md: M2-2 đang học, điểm gần nhất 97,5 (Lesson 01), ngày 2026-10-05, thêm dòng log.
- 01_LO_TRINH.md: trở về emoji đang học và tick đúng hai mục đã đạt; không ghi toàn module hoàn thành.
