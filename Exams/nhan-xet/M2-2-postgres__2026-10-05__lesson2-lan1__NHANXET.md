# Chấm lại M2-2 PostgreSQL - Lesson 02

Ngày chấm: **2026-10-09**. Kết quả mới nhất của bản bài làm đã lưu, đủ câu 1–8. Chấm theo ý nghĩa và rubric gốc, không trừ lỗi gõ hoặc bắt thuộc câu chữ mẫu. Lượt yêu cầu chấm bị ngắt trước đó không tạo kết quả trung gian.

## 1. Điểm tổng và nhóm kiến thức

**40/40 = 100/100 — 🟢 Đạt Lesson 02 theo rubric hiện tại.** M2-2 vẫn đang học; chưa đánh giá Lesson 03–04 hoặc xác nhận deliverable. Điểm tối đa ở bài này không có nghĩa đã kiểm chứng mọi kiến thức PostgreSQL hoặc thực hành trên DB thật.

| Nhóm | Điểm | Kết quả |
|---|---|---|
| INSERT, default, RETURNING, DO NOTHING (1, 2, 6) | 15/15 = 100% | 🟢 |
| UPDATE, count và lỗi constraint (3, 4, 7) | 15/15 = 100% | 🟢 |
| DELETE, FK và đồng thời (5, 8) | 10/10 = 100% | 🟢 |

## 2. Bảng từng câu

| Câu | Kết quả | Điểm | Nhận xét |
|---|---|---|---|
| 1 | Đúng trọng tâm | 5/5 | Identity/default/RETURNING đúng, không khẳng định id=13. |
| 2 | Đúng theo ý nghĩa | 5/5 | Hiểu bỏ cột dùng default, NULL tường minh bị NOT NULL chặn. |
| 3 | Đã sửa đủ | 5/5 | Đúng ID, giá và count 1/2/3; hiểu thiếu WHERE sửa cả bảng. |
| 4 | Đã sửa đủ | 5/5 | Đúng count, giá không đổi và ứng dụng kiểm count để báo 404; câu 8 làm rõ Service → handler. |
| 5 | Đã sửa đủ | 5/5 | Nhận diện FK chặn với schema hiện tại; đã đổi “buộc phải” thành “có thể CASCADE”. |
| 6 | Đúng theo ý nghĩa | 5/5 | DO NOTHING không thêm/không trả id cũ; không phải cơ chế bỏ qua mọi CHECK/FK. |
| 7 | Đã sửa đủ theo ngữ cảnh | 5/5 | Đã bổ sung SET tham chiếu Category không tồn tại gây FK, WHERE không khớp dòng cho count 0. |
| 8 | Đúng theo ý nghĩa | 5/5 | DELETE theo PK/RETURNING, count 0, Service → handler và race SELECT–DELETE đều đúng. |

## 3. Từng câu: làm được, còn thiếu và đáp án chuẩn

### Câu 1 — 5/5

Bạn đã hiểu lệnh được nhận trong tình huống đề, id do identity sinh, created_at dùng DEFAULT now(), RETURNING lấy dữ liệu dòng mới và sequence không bảo đảm liên tục. Không yêu cầu lặp đúng câu mẫu.

Đáp án gọn: thêm Product SKU BK-03, giá 95, Category 1; trả id/sku/created_at của dòng vừa thêm. Không suy id chắc chắn bằng 13 từ ba id đang thấy.

Ghi chú thêm, không trừ: “id không âm” không phải ràng buộc của schema này. BY DEFAULT cho chèn id tường minh; nếu cần cấm số âm phải có quy tắc riêng. Sequence cũng có thể cần đồng bộ sau khi nhập id tường minh. Đây là kiến thức vận hành của Lesson 04, không thêm thành tiêu chí câu này.

### Câu 2 — 5/5

Bạn nói B bị từ chối và bỏ việc truyền NULL thì được nhận. Hiểu theo ngữ cảnh là bỏ cột created_at như A; không trừ vì cách diễn đạt đời thường.

- A được nhận: không cung cấp created_at nên dùng DEFAULT now().
- B bị NOT NULL chặn: NULL tường minh không được default tự thay thế.

### Câu 3 — 5/5

Đã bổ sung đủ count. Không còn thiếu theo rubric.

| Lệnh độc lập | ID tác động | Giá mới | Count |
|---|---|---|---:|
| A | 10 | 130 | 1 |
| B | 10, 12 | 130, 90 | 2 |
| C | 10, 11, 12 | 130, 310, 90 | 3 |

Bạn cũng giải thích đúng thiếu WHERE nguy hiểm vì sửa toàn bảng khi chỉ định sửa một Product.

### Câu 4 — 5/5

Đã nói ứng dụng kiểm count=0 để quyết định not-found; câu 8 còn mô tả rõ Service nhận row count rồi throw, handler trả HTTP. Không trừ vì chưa nhắc lại tên Service ngay tại câu 4 khi ý nghĩa toàn bài đã rõ.

Đáp án chuẩn:

```text
id=999: UPDATE 0, không tự là lỗi SQL
id=10, price=price: UPDATE 1, giá vẫn 120
Repository trả count → Service quyết định not-found → handler map 404
```

Chỉnh từ cho chính xác, không trừ thêm: count đếm dòng được cập nhật, không phải cột và không chỉ đếm giá trị khác trước. Bạn đã thể hiện đúng bằng kết quả UPDATE 1 dù price không đổi.

### Câu 5 — 5/5

Đã sửa đủ theo rubric: không còn cho rằng DELETE Category tự xóa hai Product; đã nói FK chặn, B có RETURNING rỗng và đổi “buộc phải CASCADE” thành “có thể CASCADE”. Hiểu phần CASCADE là phương án thay đổi chính sách FK, không phải schema hiện tại đã bật sẵn.

Theo rubric:

- A xóa một Product, trả `(12, 'BK-02')`: **1,5/1,5**.
- B xóa 0 dòng, RETURNING rỗng: **1/1**.
- C nhận diện FK chặn, CASCADE chỉ là một phương án: **1,5/1,5**.
- Nhận diện C bị lỗi FK, không phải DELETE 0 thành công: **1/1**.

Đáp án chuẩn: C bị chặn vì Product 10 và 12 vẫn tham chiếu Category 1, schema không cấu hình ON DELETE CASCADE. Không có kết quả RETURNING thành công.

**CASCADE không phải cách duy nhất.** Tùy nghiệp vụ, có thể không cho xóa Category; chuyển Product sang Category khác; đặt category_id=NULL nếu cho phép; hoặc xóa các Product liên quan trước rồi xóa Category. CASCADE chỉ là một chính sách tự động xóa con được thiết kế trước, không nên bật chỉ để hết lỗi. Những phương án nhiều bước cần xử lý transaction phù hợp, sẽ học ở Lesson 03.

Đọc lại [Lesson 02 mục 5](../../Notes/M2_Database/M2_2_PostgreSQL/LESSON_02_GHI_DU_LIEU_AN_TOAN.md). Tham chiếu [PostgreSQL: Foreign keys](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK).

### Câu 6 — 5/5

Giữ nguyên cách chấm theo ý nghĩa: tuy bạn gõ “có bỏ qua” nhưng giải thích sau là CHECK/FK không xử lý được bằng cơ chế này. Không trừ lỗi gõ mâu thuẫn với phần lập luận rõ hơn.

Đáp án: trùng BK-01 nên DO NOTHING, không thêm dòng, RETURNING rỗng và không trả id cũ. Nếu nghiệp vụ cần báo trùng thì không im lặng bỏ qua; dùng xử lý lỗi unique phù hợp. ON CONFLICT (sku) không phải cơ chế bắt mọi lỗi dữ liệu.

Không trừ cú pháp command tag: PostgreSQL thường hiển thị `INSERT 0 0`, số cuối là số dòng được chèn; bạn viết INSERT 0 nhưng ý count=0 đúng.

### Câu 7 — 5/5

Đã bỏ nhầm lẫn ON CONFLICT gắn vào UPDATE. Bạn nêu đúng lệnh hợp lệ nhưng không cập nhật dòng khác với bị constraint từ chối. Phần mới “SET mà nếu không tồn tại id thì sẽ là lỗi FK, còn where thì sẽ dc UPDATE 0” được hiểu theo ví dụ ngay trước là Category ID; không bắt bạn lặp đúng tên category_id để nhận điểm.

- A: RETURNING `(11, 310.00)`: **2/2**.
- B: lỗi CHECK, không trả dòng thành công giá -20: **1,5/1,5**.
- Phân biệt count 0 với lỗi: **1,5/1,5**. Đã làm rõ WHERE khác SET khóa ngoại theo ngữ cảnh Category.

Lưu ý diễn đạt, không trừ điểm: không phải mọi SET một id chưa có đều gây FK. Ví dụ ở đây phải là SET category_id đến Category không tồn tại, trên một Product được WHERE tìm thấy. Nếu WHERE không tìm được Product thì không có dòng được cập nhật để phát sinh lỗi FK trong ví dụ này.

```sql
-- Không tìm thấy dòng khớp điều kiện trong dữ liệu đề:
UPDATE products SET price = 100 WHERE category_id = 999;
-- UPDATE 0, không lỗi.

-- Tìm thấy Product 11, nhưng gán đến Category không tồn tại:
UPDATE products SET category_id = 999 WHERE id = 11;
-- Lỗi FK, không phải UPDATE 0.
```

Câu trả lời chắc chắn đúng: “UPDATE 0 là lệnh hợp lệ nhưng không cập nhật dòng nào, ví dụ WHERE id=999. Còn UPDATE Product 11 thành giá -20 bị CHECK chặn, không phải count 0 của lệnh thành công.”

Đừng dùng “không có dòng thay đổi” để chỉ giá trị giữ nguyên: price=price vẫn UPDATE 1 như bạn đã trả lời đúng ở câu 4. Đọc lại [Lesson 02 mục 4](../../Notes/M2_Database/M2_2_PostgreSQL/LESSON_02_GHI_DU_LIEU_AN_TOAN.md); [PostgreSQL: UPDATE](https://www.postgresql.org/docs/current/sql-update.html).

### Câu 8 — 5/5

Bạn đã viết đúng DELETE theo id và RETURNING; PK bảo đảm điều kiện này tác động tối đa một Product. Đọc RETURNING id với dữ liệu đề cho biết đã xóa id 12; không bắt lặp lại số 12 bên ngoài SQL.

Bạn cũng nói đủ count 0 → Service throw not-found → handler trả lỗi; và tình huống A/B cùng đọc rồi một bên xóa trước làm bên sau DELETE 0. Chấm đủ điểm theo ý nghĩa.

Viết lại ví dụ cho dễ đọc:

```text
A SELECT Product 12 → có
B SELECT Product 12 → có
A DELETE Product 12 → count 1
B DELETE Product 12 → count 0
```

SELECT chỉ phản ánh lần đọc đó, không bảo đảm Product còn tồn tại lúc DELETE chạy. Không cần thuộc isolation/locking để đạt câu này. Sửa từ “cột” thành “dòng”; bạn đã dùng row affect đúng ngữ cảnh nên không trừ điểm thuật ngữ lặp lại.

## 4. Ôn để giữ vững

- Không còn tiêu chí thiếu điểm theo rubric của đề.
- Chính sách xóa Category → Lesson 02 mục 5, checklist FK M2-2 → 3 phút → tự kể hai cách khác CASCADE; đây là ôn thêm, không phải bài bắt buộc để đạt.
- WHERE khác SET FK → hai lệnh SQL ở câu 7 trên → 3 phút → nói rõ tên cột category_id và điều kiện Product phải được tìm thấy.

## 5. Quyết định

**🟢 Đạt Lesson 02; có thể học Lesson 03 trong M2-2.** Không kết luận toàn module đạt. Tick đúng checklist thao tác INSERT/UPDATE/DELETE an toàn và kiểm count đã được đánh giá; không tick transaction, sequence, JDBC hoặc vận hành chưa học.

## 6. Kế hoạch tiếp theo

Không cần kế hoạch học lại 3–5 ngày vì đã đạt. Ôn hai lưu ý trên khoảng 10 phút rồi học Lesson 03 về transaction và @Transactional.

## 7. Tiến độ và lịch sử nhận xét

- Lượt chấm đã lưu trước: 29,5/35 = 84,3% trên câu 1–7; câu 8 chưa làm. Câu 3 thiếu count, câu 4 thiếu bước kiểm count, câu 5 sai FK và thiếu RETURNING rỗng, câu 7 nhầm DO NOTHING/UPDATE và SET FK.
- Lượt chấm đủ 8 câu trước: **39/40 = 97,5%**. Còn hai lưu ý ở câu 5 và 7, mỗi câu thiếu 0,5 điểm.
- Lượt mới nhất: **40/40 = 100%**. Đã sửa CASCADE thành một lựa chọn và bổ sung phân biệt SET FK/WHERE. Các câu còn lại giữ điểm vì nội dung đúng không thay đổi.
- 05_TIEN_DO.md: M2-2 vẫn đang học, Lesson 01–02 đạt; điểm gần nhất 100 (Lesson 02), ngày 2026-10-09; thêm một dòng log.
- 01_LO_TRINH.md: checklist thao tác ghi an toàn/kiểm count đã tick ở lượt trước; lượt này không sửa roadmap hoặc xác nhận deliverable.
- Không sửa bài làm, đáp án hay source shopcore.
