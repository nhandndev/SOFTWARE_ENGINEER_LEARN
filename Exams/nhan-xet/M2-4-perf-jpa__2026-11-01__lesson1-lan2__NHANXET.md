# Chấm lại đủ 8 câu M2-4 · Lesson 01

Ngày **2026-11-01**. Chấm theo ý nghĩa toàn bộ câu trả lời và [rubric hiện hành](../de-kiem-tra/M2-4-perf-jpa__2026-11-01__lesson1-lan2__DAPAN.md). Không trừ lỗi gõ hoặc mặc định “không biết” là 0 khi sau đó bạn đã giải thích được.

## 0. Snapshot nhận xét

- [Bài nộp lượt này](archive/M2-4-perf-jpa__2026-11-01__lesson1-lan2__2026-11-01__BAI_NOP_CHAM_2.md).
- [Nhận xét lượt trước](archive/M2-4-perf-jpa__2026-11-01__lesson1-lan2__2026-11-01__NHANXET_TRUOC_CHAM_LAI_2.md): 22,5/25 = 90% trên năm câu đã làm.
- Đã đọc cả câu 3 nằm sau dấu phân cách, các bổ sung câu 2 và toàn bộ câu 5/7/8.
- Không sửa bài nộp, đề hoặc rubric trong lượt chấm.

## 1. Điểm tổng và nhóm kiến thức

**35/40 × 100 = 87,5/100 — đạt Lesson 01.** Không phải điểm tổng module M2-4 hoặc bằng chứng benchmark/code thực tế.

| Nhóm | Điểm | Đánh giá |
|---|---:|---|
| Trace, FK, context, LAZY/EAGER, dropdown (1,2,3,4,6) | 24/25 = 96% | 🟢 Nắm tốt; cần kiểm log đúng kỳ vọng |
| Transaction/session và DTO (5) | 5/5 = 100% | 🟢 Đúng bản chất ở tình huống đề |
| Statistics (7) | 4/5 = 80% | 🟡 Thiếu ý nghĩa clear |
| Đánh giá thay đổi và điều kiện đo (8) | 2/5 = 40% | 🔴 Cần củng cố đúng phần này |

## 2. Bảng chi tiết từng câu

| Câu | Đúng/Sai/Thiếu | Điểm | Nhận xét |
|---|---|---:|---|
| 1 | Đúng | 5/5 | Giữ điểm: đúng trigger và 1+3 SELECT |
| 2 | Đã bổ sung đúng quan hệ khóa | 5/5 | FK trỏ PK Category, name là dữ liệu phải tải; nhận theo ngữ cảnh FK mới=2 |
| 3 | Đúng tổng/context, kiểm log còn nhầm | 4,5/5 | Biết xem SQL log, nhưng khẳng định không có query lúc map là sai với tình huống này |
| 4 | Đúng | 5/5 | Giữ điểm: timing không bảo đảm một JOIN |
| 5 | Đúng theo ý nghĩa | 5/5 | Hiểu transaction không loại N+1, đọc quan hệ chưa tải sau session đóng có thể lỗi, DTO không quản lý fetch |
| 6 | Đúng mapper, kiểm log chưa cụ thể | 4,5/5 | Đã sửa kiểu trả về; biết đếm SELECT, chưa chốt có Product/không Category trong log |
| 7 | Đúng phạm vi và đơn vị, thiếu clear | 4/5 | Counter chung, không chỉ SELECT/ms/row; có ý cô lập đo, chưa trả lời clear có làm context/cache rỗng không |
| 8 | Đúng một phần, nhầm DTO dropdown | 2/5 | Biết ít query chưa chắc nhanh và không bỏ field bắt buộc; thiếu phép đo, sai lý do dropdown, chưa làm hai điều kiện |

## 3. Giải thích và chữa từng câu

### Câu 1 — 5/5, giữ nguyên

Bạn đã có đủ: Product.id/name tải trước, Category.name chưa tải (**1đ**); chỉ getCategory().getName() cần thêm name (**2đ**); một SELECT Product + ba SELECT Category, query phụ có thể phát sinh sau lời gọi repository (**2đ**).

“Tầm 4” không làm mất điểm vì ngay sau bạn chốt rõ 1+3. Chỉnh cách nói: từ code, dữ liệu và giả định có thể dự đoán; log dùng xác minh thực tế.

### Câu 2 — 5/5, tăng 0,5

Bốn ý đầu giữ **4/4**. Phần bổ sung:

> products.category_id: khóa ngoại lưu ID của Category.  
> categories.id: khóa chính để tìm Category.  
> categories.name: dữ liệu cần tải để trả về tên.

Đã làm rõ FK → PK → dữ liệu name. Theo dữ kiện FK mới=2, nhận đủ **1/1** cho đọc Category.id=2, không bắt gõ lại con số nếu cách đối chiếu khóa đã rõ.

Từ “đổi” ở câu trước vẫn nên sửa thành “đọc/tìm”: khi getter cần dữ liệu thì SELECT theo FK, không tự UPDATE FK. Phần bổ sung phía sau chứng minh cách đối chiếu khóa, nên không giữ điểm thiếu cũ chỉ vì chưa dùng đúng câu văn mẫu.

**Câu gọn:** “Theo Product.category_id=2, tìm categories.id=2 rồi đọc name.”

### Câu 3 — 4,5/5, tăng 0,5

- Một SELECT Product, hai SELECT Category, tổng ba: **2/2**.
- Dùng lại Category 1 đã tải trong context: **2/2**.
- Phép kiểm bằng chứng: **0,5/1**. Bạn đã thêm “bật tính năng log SQL lên và đọc”, đúng công cụ. Nhưng phần “không tự tạo query trong lúc map” là kỳ vọng sai của chính tình huống này.

Ở đây **chưa có sửa fetch plan**. Mapper vẫn đọc Category.name chưa tải, nên có hai SELECT Category trong quá trình map. “Chỉ có một query chính” đúng nếu nói riêng query Product, không có nghĩa tổng chỉ một hoặc mapper không query.

**Bản đúng:** “Xem SQL log của request riêng: một SELECT Product, một SELECT Category id=1 và một SELECT Category id=2. Không có SELECT Category 1 thứ hai cho Product 11.”

Không trừ lại hai điểm đếm tổng đã đúng ở vế 1; phần sai chỉ làm thiếu điểm vế kiểm log.

Đọc [bài phụ mục 3.3](../../Notes/M2_Database/M2_4_Performance/README_HOC_BO_SUNG_LESSON_01_TU_BAI_LAM.md).

### Câu 4 — 5/5, giữ nguyên

EAGER tải quan hệ nhưng không cam kết một JOIN (**2đ**); LAZY trì hoãn nhưng đọc name chưa có vẫn tải (**2đ**); dùng SQL log kiểm (**1đ**).

“Tải hết” hiểu trong phạm vi Category đang xét, không cố suy ra bạn nói mọi bảng đều tải. JOIN/fetch sẽ học kỹ ở Lesson 02, không yêu cầu thêm để giữ điểm.

### Câu 5 — 5/5, mới chấm

- Cách A có thể chạy thêm SELECT: **1/1**.
- Transaction không tự loại N+1: **1/1**.
- Cách B đọc dữ liệu sau session đóng: **1/1**. Câu “sau khi đóng session ... chúng ta query lấy nó lên” được hiểu theo ngữ cảnh đề là lúc truy cập quan hệ ở phía ngoài Service/Jackson, không bắt nhắc lại tên Jackson.
- Quan hệ chưa tải mà không còn session hỗ trợ: **1/1**.
- DTO không tự sửa fetch: **1/1**. Dù bạn mở đầu “không biết”, đoạn sau giải thích đúng: field dữ liệu cần cho response và getter trong mapper mới quyết định có cần tải Category.

Chỉnh lời, không trừ: “chưa tải xong” ở đây nên nói **“chưa được tải”**. LAZY không nhất thiết có một query đang chạy bất đồng bộ rồi bị đóng giữa chừng.

Không cần thuộc tên LazyInitializationException để được điểm, như đề đã quy định.

### Câu 6 — 4,5/5, tăng 0,5

- Chỉ map id/name, không đọc Category: **2/2**.
- Dự đoán một SELECT, vì endpoint không cần Category: **2/2**.
- Kiểm bằng log: **0,5/1**. “Kiểm tra bao nhiêu SELECT” đúng hướng, nhưng chưa nêu dấu hiệu cần thấy: có một SELECT products và không có SELECT categories.

Phần “time bao nhiêu” là đo thêm được, nhưng log SQL cơ bản không mặc định cho latency cả request. Không thay kiểm đúng query bằng nhìn thời gian.

**Bạn đã sửa đúng lỗi tên kiểu:** List<ProductOptionResponse> khớp object tạo trong mapper. Ghi nhận sửa code, không tự cộng vượt trần vì lần trước cũng không trừ riêng lỗi này.

**Bổ sung:** “Trong request này mong đợi 1 SELECT Product, 0 SELECT Category; đối chiếu log để xác nhận.”

Đọc bài phụ mục 3.4.

### Câu 7 — 4/5, mới chấm

- Không quy 20 cho request: **1/1**.
- Counter của SessionFactory, có thể gồm workload khác: **1/1**. Bạn đã nói rõ không phải riêng list().
- Prepared statement count, không phải ms/row và không chỉ SELECT: **1/1**.
- Cô lập phép đo: **1/1**. Nhận ý “cô lập việc đo cho rõ ràng” theo ngữ cảnh job dùng chung counter; không bắt nêu tool hoặc quy trình nhiều bước mới có điểm.
- clear có làm context/cache rỗng không: **0/1**, chưa trả lời.

**Thêm đúng một câu:** “statistics.clear() chỉ reset thống kê, không tự xóa entity trong persistence context hoặc cache, cũng không chặn job nền chạy sau đó.”

Không cần thuộc EntityManager.clear() hoặc cache API để trả lời.

Đọc bài phụ mục 6.

### Câu 8 — 2/5, mới chấm

| Ý | Điểm | Vì sao |
|---|---:|---|
| Nhận ra số SELECT giảm, phân biệt dữ liệu các bản sửa | 1/1 | Bạn nói rõ số SELECT giảm nhưng dữ liệu hai bản khác nhau; không bắt nhắc số 4→1 nguyên văn |
| Chưa kết luận nhanh hơn và nêu thông tin cần đo | 0,5/1 | Bạn hiểu query có JOIN/phức tạp có thể lâu hơn; chưa nói đo thời gian xử lý request trước/sau |
| Bình sai hợp đồng, khác dropdown mới | 0,5/1 | Không chấp nhận thiếu field là đúng; lý do dropdown là DTO nội bộ không phải output là sai trong đề |
| Điều kiện so sánh thứ nhất và lý do | 0/1 | Vế 3 ghi “chịu” |
| Điều kiện so sánh thứ hai và lý do | 0/1 | Vế 3 chưa có |

**Điểm rất quan trọng cần sửa:** DTO có thể là request DTO, response DTO hoặc DTO nội bộ tùy cách dùng. ProductOptionResponse ở câu 6 chính là dữ liệu response cho endpoint dropdown; nó có thể được Controller trả ra JSON cho client. Không có quy tắc “là DTO thì chỉ nằm trong backend”.

Hai endpoint có **hai yêu cầu khác nhau**:

| Endpoint | Dữ liệu client cần | Bỏ categoryName có sai không? |
|---|---|---|
| /api/products | id, name, categoryName | Có, vì field đang bắt buộc |
| /api/product-options | id, name | Không, vì hợp đồng mới chỉ yêu cầu hai field |

Không phải DTO quyết định client có quyền nhận field nào một cách tùy tiện; ta thiết kế DTO phù hợp hợp đồng endpoint.

**Bản trả lời đủ ý:**

> An giảm SELECT từ 4 xuống 1, vẫn giữ response đúng. Chưa kết luận nhanh hơn, cần đo thời gian request trước/sau với điều kiện so sánh phù hợp. Bình không đạt vì bỏ categoryName đang bắt buộc. Dropdown là endpoint mới chỉ cần id/name, response DTO của nó vẫn trả cho client.  
> Khi đo lại, giữ cùng dữ liệu/số Category khác nhau vì điều này ảnh hưởng số quan hệ phải tải; giữ context/cache ban đầu tương đương vì dữ liệu đã tải có thể được dùng lại nên số query giảm mà chưa do sửa code.

Chấp nhận hai điều kiện khác có lý do đúng, không bắt đúng cặp trên. Các điều kiện và giải thích trong [bài phụ mục 7](../../Notes/M2_Database/M2_4_Performance/README_HOC_BO_SUNG_LESSON_01_TU_BAI_LAM.md) đã đủ để làm vế này.

## 4. Phác đồ ôn phần còn thiếu

- Query lúc mapper chạy → bài phụ mục 3.3 → 3 phút → sửa kỳ vọng log câu 3.
- Kiểm endpoint chỉ id/name → mục 3.4 → 2 phút → thêm 1 SELECT Product, 0 SELECT Category ở câu 6.
- Reset statistics → mục 6 → 2 phút → viết rõ không clear context/cache.
- DTO và hợp đồng → phần chữa câu 8 ở trên, bài phụ mục 7 → 5 phút → phân biệt hai endpoint.
- Điều kiện phép đo → bài phụ mục 7.3 → 3 phút → chọn hai điều kiện, mỗi điều kiện một lý do.

Nguồn: [bài phụ đã có](../../Notes/M2_Database/M2_4_Performance/README_HOC_BO_SUNG_LESSON_01_TU_BAI_LAM.md), [Lesson 01](../../Notes/M2_Database/M2_4_Performance/LESSON_01_N_PLUS_1_VA_SQL_LOG.md); thuộc checklist SQL log/statistics và ranh giới transaction của [M2-4](../../01_LO_TRINH.md).

## 5. Quyết định

**Đạt Lesson 01 với 87,5%.** Có thể tiếp tục Lesson 02 sau khi đọc các ý sửa, không bắt thi lại để lấy 100%.

Tuy nhiên câu 8 chỉ 2/5, nên kết luận đúng là “đạt lesson, còn yếu đánh giá phép tối ưu”, không phải đã nắm toàn bộ đo hiệu năng. Module M2-4 vẫn đang học; không công nhận benchmark, thực hành hoặc deliverable hoàn thành.

## 6. Kế hoạch tiếp theo

Không cần kế hoạch học lại 3–5 ngày vì lesson đã đạt. Dành khoảng 15 phút cho mục 4; không cần viết lại câu 1, 2, 4, 5. Không tự tạo đề mới hoặc mở module mới trong lượt chấm này.

## 7. Tiến độ và lịch sử

- Lượt trước: câu 1/2/3/4/6 đạt **22,5/25 = 90% phần đã làm**.
- Lượt này: **5 + 5 + 4,5 + 5 + 5 + 4,5 + 4 + 2 = 35/40 = 87,5%**, đủ tám câu.
- Câu 2/3/6 tăng mỗi câu 0,5; câu 5/7/8 mới được chấm. Không so 90% tạm với 87,5% toàn bài như thể bạn thụt lùi.
- 05: ghi Lesson 01 đạt, điểm/ngày kiểm tra và một log, giữ module đang học.
- 01: chưa tick checklist tổng module vì vẫn còn phần phép đo/statistics cần củng cố; không đổi trạng thái toàn module.
