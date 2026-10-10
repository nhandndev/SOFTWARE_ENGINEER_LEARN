# Chấm lại toàn bộ M2-2 PostgreSQL - Lesson 04

Ngày chấm: **2026-10-10**. Đọc đủ bản đã lưu, gồm bổ sung ở câu 1, đoạn sau --- câu 4/7 và đoạn mới câu 6/8. Chấm theo ý nghĩa/ngữ cảnh và rubric; nhận ý đúng đã thể hiện ở câu khác, không bắt lặp lại. Không sửa bài làm.

## 1. Điểm tổng và nhóm kiến thức

**38,5/40 = 96,25/100 — 🟢 Đạt Lesson 04.** Cả bốn lesson M2-2 đã đạt. Chưa tự xác nhận deliverable, bài tổng kết module hoặc đổi toàn module sang đạt. Lượt này đọc bản mới: câu 6 thêm race MAX+1; câu 8 sửa rollback và không gian nhưng đã bỏ đoạn nói về khóa FULL.

| Nhóm | Điểm | Kết quả |
|---|---|---|
| Kết nối, dependency (1–2) | 10/10 = 100% | 🟢 |
| Binding, JPA và sort (3–4) | 9,5/10 = 95% | 🟢 |
| Identity, sequence (5–6) | 10/10 = 100% | 🟢 |
| MVCC, VACUUM và rollback (7–8) | 9/10 = 90% | 🟢 |

## 2. Bảng từng câu

| Câu | Kết quả | Điểm | Nhận xét |
|---|---|---|---|
| 1 | Đúng | 5/5 | Kết nối đúng; ý thêm JPA starter được nhận cho câu 2. |
| 2 | Đủ ý theo ngữ cảnh toàn bài | 5/5 | Có driver, YAML chỉ cấu hình; starter JPA hỗ trợ JpaRepository đã nêu ở câu 1. |
| 3 | Đúng | 5/5 | Hiểu binding, ghép chuỗi/injection và frontend không đủ. |
| 4 | Đã sửa phần chính | 4,5/5 | Cả hai query bind, Product là entity, không bind tên cột; còn thiếu policy sort động. |
| 5 | Đúng | 5/5 | Identity, BY DEFAULT và PK/UNIQUE đúng. |
| 6 | Đúng, đã bổ sung | 5/5 | Hiểu gap, không đếm bằng ID và nhiều request cùng đọc MAX gây race. |
| 7 | Đúng | 5/5 | MVCC và dọn khi an toàn đúng; không vacuum tay mỗi UPDATE. |
| 8 | Thiếu rủi ro FULL trong bản hiện tại | 4/5 | Đã sửa rollback sau commit và phân biệt không gian; thiếu giải thích FULL nặng/khóa mạnh. |

## 3. Làm được, còn thiếu và chữa từng câu

### Câu 1 — 5/5

Giữ điểm: pgJDBC, localhost, 5432, shopcore, user/password/driver/connection và lỗi kết nối đều đúng theo ý nghĩa. Không còn thiếu theo câu hỏi.

Bạn thêm “Muốn có JPARepository thì cần phải có spring starter”. Hiểu theo ngữ cảnh là **cần starter Data JPA để dùng JpaRepository**, không bắt tên artifact chính xác. Chỉnh thuật ngữ: phải là spring-boot-starter-data-jpa, không phải starter bất kỳ. JpaRepository là interface; JDBC thuần không bắt buộc JPA starter. Đây là ghi chú, không trừ điểm câu 1 hoặc xóa ý đúng cho câu 2.

### Câu 2 — 5/5

Không chỉ đọc riêng đoạn trả lời câu 2 rồi giữ điểm thiếu như lượt trước: phần bạn bổ sung ở câu 1 đã thể hiện starter JPA gắn với JpaRepository. Nhận **2/2** phần hạ tầng JPA; **2/2** phần driver để kết nối PostgreSQL và **1/1** phần YAML chỉ khai báo.

Diễn đạt chính xác:

```text
spring-boot-starter-data-jpa -> hạ tầng JPA và Spring Data repositories
org.postgresql:postgresql   -> driver JDBC cho PostgreSQL
application.yml            -> cấu hình, không tự tải dependency
```

Không cần học lại câu này. Tham khảo [Lesson 04 mục 2](../../Notes/M2_Database/M2_2_PostgreSQL/LESSON_04_KET_NOI_THAM_SO_IDENTITY_VACUUM.md).

### Câu 3 — 5/5

B dùng bind parameter, A ghép chuỗi có rủi ro injection, kiểm frontend không đủ. Nhận đủ **2 + 2 + 1** như lượt trước. “Không hiểu từ giữ input là giá trị” không làm mất điểm khi phần giải thích sau đã đúng.

### Câu 4 — 4,5/5

Đã sửa ba ý sai chính: bạn nói rõ **cả hai** đều bind tham số, Product là entity và placeholder không truyền tên cột/hướng SQL.

| Tiêu chí | Điểm |
|---|---|
| findBySku dùng giá trị tham số, không nối input thành SQL | 1/1 |
| :sku/@Param là binding, không ghép chuỗi | 1/1 |
| Product là entity | 1/1 |
| Không biến price DESC thành cấu trúc ORDER BY bằng placeholder | 1/1 |
| Sort có kiểm soát theo yêu cầu client | 0,5/1 |

Ý dùng findBySkuOrderByPriceDesc hợp lý cho **sort cố định**. Không trừ chính tả DESC/Desc hoặc bắt bạn thuộc tên method. Nhưng đề có client chọn sort: cần thêm policy chỉ nhận field/hướng cho phép, hoặc chỉ hỗ trợ một tập lựa chọn cố định đã định nghĩa. Method cố định riêng nó chưa giải thích xử lý lựa chọn khác từ client.

Đáp án đủ: cho phép name/price và asc/desc; từ các giá trị đã kiểm tra, dùng Sort/Pageable hoặc chọn method sort cố định tương ứng. Không nối input thô hoặc bind identifier bằng ?. Ví dụ đơn giản:

```text
Client price,desc -> kiểm price thuộc field cho phép và desc thuộc hướng cho phép
-> tạo Sort.by(DESC, "price") -> gọi Repository
Client secretField,anything -> từ chối, không đưa thẳng vào query
```

Đọc lại Lesson 04 mục 3 phần giới hạn; [Spring Data JPA query methods](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html).

### Câu 5 — 5/5

DB/sequence cấp id khi bỏ cột **1/1**; identity không cưỡng chế unique **2/2**; BY DEFAULT cho id tường minh **1/1**; thêm PK/UNIQUE **1/1**. Không thiếu theo rubric.

### Câu 6 — 5/5

Đã bổ sung trực tiếp **không dùng độ liên tục ID để đếm bản ghi thành công** vì rollback làm xuất hiện gap. Nhận đủ **2/2** phần này và **2/2** phần sequence không trả lại số đã cấp do rollback. Không bắt phải viết COUNT mới được điểm khi câu hỏi chỉ yêu cầu đánh giá cách đếm bằng ID; COUNT là gợi ý củng cố, không phải yêu cầu mới.

Nhận thêm **1/1** lý do không dùng MAX(id)+1: bạn đã bổ sung nhiều request đọc trùng MAX. Không còn thiếu theo rubric. Minh họa để phân biệt race với gap:

```text
MAX(id)=10
A tính 10+1 -> 11
B tính 10+1 -> 11
A/B cùng chèn -> có thể trùng ID; PK chặn một bên
```

Đây là ví dụ rủi ro thiết kế khi ứng dụng có ghi đồng thời, không nói có request bí mật can thiệp vào dữ liệu đề. Dùng sequence/identity để cấp id, không tự cấp bằng MAX+1. Nếu cần số dòng hiện có thì COUNT theo phạm vi; không dùng COUNT hiện tại làm lịch sử mọi lần tạo thành công.

Đọc lại Lesson 04 mục 4; [PostgreSQL sequence functions](https://www.postgresql.org/docs/current/functions-sequence.html).

### Câu 7 — 5/5

Giữ đủ **2 + 2 + 1** theo ngữ cảnh: bạn hiểu bản cũ có thể cần cho MVCC, dọn khi không còn cần và không gọi VACUUM thủ công ngay mỗi UPDATE. Bản mới giá 150 và bản cũ 120 được hiểu theo tình huống đề. “Sau một khoảng thời gian” không phải TTL cố định; điều kiện an toàn mới quan trọng.

### Câu 8 — 4/5

Đã sửa rõ transaction đã commit không thể ROLLBACK và VACUUM thường chủ yếu tái sử dụng chỗ trống. Tuy nhiên bản hiện tại không còn đoạn FULL khóa đọc/ghi mà bản trước đã có. Chấm phần hiện đang viết, không tự điền lời giải cũ vào bản mới; đây là thiếu ý trong bản nộp, không khẳng định bạn chưa từng hiểu.

| Tiêu chí | Điểm | Nhận xét |
|---|---|---|
| Vacuum không undo; rollback không hủy transaction đã commit | 2/2 | Đã nói rõ không thể rollback sau commit. |
| Vacuum dọn phiên bản cũ, không sửa giá | 1/1 | Đúng. |
| VACUUM thường khác FULL về không gian | 1/1 | Đã bổ sung tái sử dụng chỗ trống. |
| FULL nặng/khóa mạnh, không chạy tùy tiện | 0/1 | Có kết luận không chạy thường xuyên nhưng chưa giải thích vì sao trong bản hiện tại. |

Bạn đã sửa đúng: **ROLLBACK không hoàn tác transaction đã commit**. “Rollback thủ công” nên gọi rõ là **cập nhật bù/khôi phục bằng transaction mới**. Ví dụ sửa giá về giá đúng đã biết, không phải ROLLBACK transaction cũ và không mặc định ghi đè mọi thay đổi mới. Đây là chỉnh thuật ngữ, không trừ thêm điểm vì bạn đã khẳng định đúng phần commit.

**Giải thích phần còn thiếu:** VACUUM thường dọn chỗ trống trong bảng để dùng lại. FULL còn viết lại bảng thành bản gọn hơn: tốn I/O, cần dung lượng tạm và lấy khóa ACCESS EXCLUSIVE trên bảng đang xử lý. Vì vậy đọc/ghi bảng đó phải chờ, không phải khóa toàn bộ database. Đó là lý do không chạy FULL thường xuyên mặc định.

Ví dụ giả định bảng chiếm 1 GB, có 300 MB chỗ có thể tái sử dụng: VACUUM thường có thể làm chỗ đó sẵn sàng cho dữ liệu mới mà file vẫn khoảng 1 GB. FULL có thể thu gọn file qua viết lại, đổi lại chi phí và thời gian khóa. Đây là minh họa, không bảo đảm số liệu thực tế đúng như vậy.

Lưu ý không trừ thêm: không nhớ VACUUM thường **tuyệt đối không** trả dung lượng cho OS; có ngoại lệ thu hồi các page trống cuối bảng khi điều kiện phù hợp. FULL cũng không xóa phiên bản vẫn cần cho MVCC. [PostgreSQL routine vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html).

**Đáp án đủ ý:** VACUUM không phục hồi giá cũ. Transaction đã commit không thể hoàn tác bằng ROLLBACK của transaction đó; phải sửa/phục hồi bằng cách khác. VACUUM thường chủ yếu dọn chỗ để tái sử dụng; FULL viết lại bảng để thu gọn nhưng nặng, cần dung lượng tạm và khóa mạnh cản đọc/ghi bảng, nên không chạy tùy tiện.

Đọc lại Lesson 04 mục 5 và Lesson 03 mục 4 về COMMIT/ROLLBACK.

## 4. Phác đồ củng cố

- Sort động có kiểm soát → Lesson 04 mục 3 → 5 phút → nói field/hướng nào nhận, input nào từ chối.
- VACUUM FULL → Lesson 04 mục 5 → 5 phút → nói vì sao FULL cản hoạt động trên bảng.
- Thuật ngữ cập nhật bù → Lesson 03 mục 4 → 2 phút → phân biệt ROLLBACK trước commit với sửa dữ liệu trong transaction mới.

## 5. Quyết định

**🟢 Đạt Lesson 04 theo rubric; bốn lesson M2-2 đều đạt.** Các điểm thiếu trên vẫn cần nhớ, không bị xóa chỉ vì tổng đạt. Có thể tick checklist khái niệm đã được kiểm tra: tham số JDBC/JPA, sequence/identity, VACUUM/autovacuum, URL/driver.

Chưa ghi nhận chuyển shopcore sang PostgreSQL, thực hành DB thật, bài thi module hoặc merge deliverable. Giữ M2-2 đang học theo tiêu chí module; chưa tự mở module mới.

## 6. Kế hoạch

Không cần kế hoạch học lại 3–5 ngày vì đã đạt. Củng cố các điểm trên trong khoảng 12 phút; không yêu cầu thi lại để lấy 100 mới được công nhận lesson.

## 7. Tiến độ và lịch sử

- Lượt đầu riêng câu 1: 2/5 = 40%; sửa lại câu 1: 5/5 = 100% trên câu đó.
- Lượt toàn bài trước: 29,5/40 = 73,75%; yếu câu 2/4/6/8.
- Lượt trước: **37/40 = 92,5%**. Câu 2 được nhận bổ sung ở câu 1; câu 4 đã sửa binding/identifier; câu 6 đã nói rõ không đếm bằng ID; câu 8 đã bổ sung rủi ro khóa nhưng còn thiếu về rollback và tái sử dụng không gian.
- Lượt mới nhất: **38,5/40 = 96,25%**. Câu 6 đủ race; câu 8 sửa rollback và không gian, nhưng bỏ đoạn rủi ro khóa FULL nên nhận 4/5. Câu 4 vẫn 4,5/5.
- 05_TIEN_DO.md: M2-2 đang học (4 lesson đạt), điểm gần nhất 96,25 Lesson 04, ngày 2026-10-10, thêm log.
- 01_LO_TRINH.md: không sửa; bốn checklist đã được tick khi đủ điều kiện ở lượt trước.
- Không sửa bài làm, đáp án hoặc source shopcore; QA của AI không là deliverable người học.
