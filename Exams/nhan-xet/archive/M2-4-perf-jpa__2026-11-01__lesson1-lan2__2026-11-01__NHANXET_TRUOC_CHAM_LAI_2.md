# Chấm tạm M2-4 · Lesson 01 — Câu 1, 2, 3, 4, 6

Ngày **2026-11-01**. Đề [Lesson 01 lần 2](../de-kiem-tra/M2-4-perf-jpa__2026-11-01__lesson1-lan2.md); [rubric hiện hành](../de-kiem-tra/M2-4-perf-jpa__2026-11-01__lesson1-lan2__DAPAN.md).

## 0. Snapshot nhận xét

- [Bài nộp lượt 1, giữ nguyên nội dung](archive/M2-4-perf-jpa__2026-11-01__lesson1-lan2__2026-11-01__BAI_NOP_CHAM_TAM_1.md).
- Đã đọc phần câu 3 nằm **sau dấu phân cách**, không coi câu 3 là trống.
- Có bài làm ở câu **1, 2, 3, 4, 6**. Câu **5, 7, 8** còn trống: chưa chấm, không tự cho 0 trong lượt chấm từng phần.
- [File học bổ sung mới](../../Notes/M2_Database/M2_4_Performance/README_HOC_BO_SUNG_LESSON_01_TU_BAI_LAM.md) bao gồm ý sai/thiếu và cả kiến thức câu chưa làm. Nội dung hướng dẫn không tự trở thành bài nộp hoặc điểm mới.

## 1. Điểm tổng và nhóm kiến thức

**22,5/25 = 90/100 trên năm câu đã làm.** Không phải điểm đủ 40đ và **chưa chốt Lesson 01 hoặc module**.

| Nhóm đã có bài làm | Điểm | Nhận xét |
|---|---:|---|
| Trace query và khóa tham chiếu (1,2) | 9,5/10 = 95% | 🟢 Đúng phần chính; còn thiếu khóa cụ thể ở câu 2 |
| Dùng lại Category, kiểm bằng chứng (3) | 4/5 = 80% | 🟡 Cơ chế đúng, chưa nêu cách kiểm |
| LAZY/EAGER (4) | 5/5 = 100% | 🟢 Đủ ý theo tình huống |
| Endpoint dropdown (6) | 4/5 = 80% | 🟡 Mapper đúng, chưa biết kiểm log |
| Session đóng/Statistics/đánh giá tối ưu (5,7,8) | Chưa đánh giá | Chưa có đáp án, cần học bổ sung |

## 2. Bảng chi tiết từng câu

| Câu | Đúng/Sai/Thiếu | Điểm | Nhận xét |
|---|---|---:|---|
| 1 | Đúng | 5/5 | Nêu Product đã có, tên Category chưa tải, đúng getter và 4 query |
| 2 | Đúng phần chính, vế 3 thiếu cụ thể | 4,5/5 | Phân biệt FK/proxy tốt; chưa chốt đọc Category.id=2, từ “đổi” dễ nhầm cập nhật |
| 3 | Đúng cơ chế, thiếu bằng chứng | 4/5 | 3 SELECT và context dùng lại đúng; vế 3 chưa nêu log/statistics để kiểm |
| 4 | Đúng | 5/5 | EAGER không cam kết JOIN, LAZY tải khi cần name, biết xem SQL log |
| 5 | Chưa làm | Chưa chấm | Học session/transaction/DTO trong bài phụ mục 5 |
| 6 | Đúng phần mapper, thiếu kiểm log | 4/5 | Chỉ map id/name, dự đoán 1 query đúng; vế 3 viết không biết |
| 7 | Chưa làm | Chưa chấm | Học phạm vi Statistics và reset trong bài phụ mục 6 |
| 8 | Chưa làm | Chưa chấm | Học giữ hợp đồng, count khác latency trong bài phụ mục 7 |

## 3. Phân tích, bằng chứng và chữa từng câu

### Câu 1 — 5/5

- Product.id/name đã có, Category.name chưa tải: **1/1**. Bạn nói rõ tên Category chưa tải. “Chỉ tải trước id” được hiểu là đã biết ID tham chiếu Category từ FK, không phải đã SELECT Category đầy đủ.
- Chỉ đúng p.getCategory().getName(): **1/1**.
- Cần name đang thiếu: **1/1**.
- Một SELECT Product + ba SELECT Category = bốn: **1/1**.
- Repository call không bằng tổng SQL: **1/1**. Bạn đã mô tả truy vấn phụ lúc lấy tên quan hệ, nên nhận đủ ý, không đòi lặp lại cùng câu văn.

Chỉnh cách diễn đạt, không trừ: bạn viết “tầm 4” nhưng sau đó phân rõ 1+3. Trong giả định đề, dự đoán là 4, không phải số ước lượng ngẫu nhiên. Code và dữ kiện cho phép dự đoán; SQL log dùng để kiểm thực tế, không phải không bao giờ suy ra được từ code.

### Câu 2 — 4,5/5

| Tiêu chí | Điểm | Bằng chứng |
|---|---:|---|
| category_id là khóa | 1/1 | “để biết nó liên kết với category id nào” |
| Category.name chưa có | 1/1 | “còn name thì chưa”, hiểu theo ngữ cảnh Category |
| Object đại diện không có nghĩa đã tải hết | 1/1 | Bạn phủ định và nêu object đại diện/proxy |
| Giải thích trì hoãn tải | 1/1 | Bạn nói khi truy cập thông tin Category mới query thêm |
| FK mới=2 thì tìm Category id=2 | 0,5/1 | Có ý đi theo FK, nhưng chưa nói khóa cụ thể và viết “để mà đổi” trong khi đề hỏi đọc |

**Thiếu 0,5đ ở vế 3**, không phải bạn sai toàn bộ FK/proxy.

Bổ sung đúng: “Hibernate dùng category_id=2 để SELECT Category có id=2 rồi lấy name. Getter không tự UPDATE FK hoặc thay Category.”

Không trừ câu “Query Product chỉ đem về id” vì trong vế đang so ID Category với Category.name, bạn cũng đã nói Product.id/name được tải ở câu 1.

Đọc bài phụ mục 2; bài gốc mục 1–3.

### Câu 3 — 4/5

- Một SELECT Product và hai SELECT Category: **1/1**.
- Tổng ba: **1/1**. Câu mở đầu “1 query tổng” được hiểu qua toàn đoạn là query lấy danh sách Product; bạn chốt tổng ba rõ, không bắt lỗi cắt câu.
- Category 1 dùng lại trong persistence context: **2/2**.
- Cách xác nhận dự đoán: **0/1**. “Nếu không có sẵn trong context thì thêm query” vẫn là cơ chế, chưa trả lời xem bằng chứng nào.

**Bổ sung:** “Gọi một request riêng, xem SQL log/bind hoặc Statistics. Mong đợi một SELECT Product, một SELECT Category id=1, một SELECT Category id=2; không query id=1 thêm cho Product 11.”

Không lấy câu SQL log ở câu 4 tự điền cho vế 3 câu 3: các tình huống độc lập và câu này kiểm bạn áp dụng phép kiểm vào đúng dự đoán cụ thể. Điều này không có nghĩa bạn chưa từng biết SQL log; phần thực hành quan sát vẫn cần nối rõ.

Đọc bài phụ mục 3.2–3.3; bài gốc mục 4–5.

### Câu 4 — 5/5

- EAGER yêu cầu tải quan hệ: **1/1**.
- Không chắc một JOIN: **1/1**.
- LAZY trì hoãn: **1/1**.
- Cần Category.name chưa có thì tải: **1/1**.
- Kiểm SQL log: **1/1**.

“Tải hết” được hiểu trong phạm vi quan hệ Category đang xét, không tự suy diễn rằng bạn nói mọi bảng đều tải. Nói chuẩn hơn là EAGER yêu cầu tải quan hệ đó, không phải toàn graph. Phần bạn tự chủ động JOIN là kiến thức thêm, không cộng điểm ngoài rubric; JOIN và fetch quan hệ sẽ học kỹ ở Lesson 02.

Đọc bài phụ mục 4 nếu cần phân biệt timing với hình dạng SQL.

### Câu 5 — Chưa làm

Chưa có cơ sở chấm bạn sai. Phần cần học:

- Mapper đọc quan hệ trong context mở có thể chạy thêm SELECT; transaction không tự hết N+1.
- Khi context của Service đã đóng, Jackson truy cập Category.name chưa tải theo giả định đề có thể lỗi LAZY.
- DTO đã có String categoryName giúp Jackson không cần đọc proxy, nhưng query phụ có thể đã xảy ra ở mapper.

Bài phụ mục 5 có hai luồng giải thích từng bước, không chỉ đưa tên exception để học thuộc.

### Câu 6 — 4/5

- Giữ p.getId()/p.getName() trong mapper: **1/1**.
- Không đọc Category: **1/1**.
- Dự đoán một SELECT Product, không cần Category: **1/1**.
- Giải thích endpoint chỉ cần id/name: **1/1**.
- Vế 3 SQL log: **0/1**, bạn viết “không biết”.

**Bổ sung vế 3:** “Xem SQL log của một request riêng: có SELECT products, không có SELECT categories. Kiểm response vẫn có đủ id/name.”

**Lỗi code cần sửa, không trừ thêm ngoài rubric:** method khai báo List<SimpleProductResponse> nhưng map thành ProductOptionResponse. Nếu là hai class khác nhau thì không compile; đổi khai báo thành List<ProductOptionResponse>. Không trừ điểm tư duy mapper vì đề cho phép mô tả bằng lời và ý bạn đúng.

Câu “bỏ getCategory vì nó tải dữ liệu Category” được hiểu theo ngữ cảnh bỏ truy cập quan hệ trong mapper; không buộc hiểu là bạn khẳng định riêng getter trả proxy lúc nào cũng query.

Đọc bài phụ mục 3.4 và bản code đã sửa.

### Câu 7 — Chưa làm

Bài phụ mục 6 dạy:

- Statistics có phạm vi chung của SessionFactory, job có thể góp vào counter.
- Prepared statement count không phải thời gian hoặc số dòng.
- clear reset thống kê, không cô lập workload và không xóa context/cache.
- Cần đo request riêng hoặc có cách quy statement cho request.

Không bắt biết framework tracing hoặc nhớ tên API.

### Câu 8 — Chưa làm

Bài phụ mục 7 dạy:

- Giảm số SELECT chưa chứng minh latency giảm.
- Bỏ field bắt buộc của endpoint cũ là đổi sai hợp đồng, không phải tối ưu tương đương.
- Cần giữ/ghi rõ dữ liệu, context/cache, fetch config, transaction và workload để so sánh.
- Dropdown là endpoint mới nên có hợp đồng riêng, không mâu thuẫn với yêu cầu giữ categoryName của endpoint cũ.

Không cần học p95/pool tuning để trả lời.

## 4. Phác đồ học lại

Nguồn chính: [bài phụ mới](../../Notes/M2_Database/M2_4_Performance/README_HOC_BO_SUNG_LESSON_01_TU_BAI_LAM.md). Gắn với checklist N+1 SQL log/statistics và transaction boundary trong [lộ trình M2-4](../../01_LO_TRINH.md).

- FK và thao tác đọc → bài phụ mục 2 → 3 phút → sửa câu 2 vế 3.
- Kiểm chứng số query → mục 3 → 7 phút → bổ sung vế log câu 3 và 6.
- Session đóng và DTO → mục 5 → 10 phút → trả lời câu 5 theo hai luồng.
- Phạm vi Statistics → mục 6 → 8 phút → trả lời câu 7.
- Đúng hợp đồng và giới hạn kết luận → mục 7 → 7 phút → trả lời câu 8.

Mục tự kiểm có đáp án trong bài phụ là tùy chọn, không bắt nộp đề khác.

## 5. Quyết định

**Đạt ngưỡng phần đã làm, tiếp tục hoàn thành Lesson 01; chưa chốt lesson/module.** Không mở Lesson 02 hoặc tick checklist từ điểm tạm. Bạn nắm tốt cơ chế tải dữ liệu cơ bản; thiếu cách kiểm chứng và chưa có bằng chứng về ba chủ đề còn trống, không phải cần học lại từ đầu.

## 6. Kế hoạch tiếp theo

Vì mới chấm từng phần, không áp kết luận học lại cả module 3–5 ngày. Có thể dành khoảng 35 phút theo mục 4, chia hai buổi ngắn nếu muốn. Giữ câu 1 và 4, sửa phần nhỏ câu 2/3/6 rồi hoàn thành 5/7/8.

## 7. Cập nhật tiến độ

- M2-4 giữ đang học Lesson 01.
- Điểm gần nhất: **90 (tạm Lesson 01 câu 1,2,3,4,6)**; ngày 2026-11-01.
- Thêm một dòng log về chấm tạm và bài phụ.
- Không sửa checklist/trạng thái trong 01_LO_TRINH.md vì chưa đủ bài để chốt kiến thức toàn lesson.
- Công thức lượt này: **5 + 4,5 + 4 + 5 + 4 = 22,5/25 = 90%**; không dùng 40 làm mẫu số cho yêu cầu chỉ chấm các câu đã làm.
