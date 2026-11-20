# Chấm tạm M2-4 Lesson 02 — Câu 1–3

Ngày **2026-11-10**. [Đề hiện hành](../de-kiem-tra/M2-4-perf-jpa__2026-11-10__lesson2-lan2.md), [đáp án và rubric](../de-kiem-tra/M2-4-perf-jpa__2026-11-10__lesson2-lan2__DAPAN.md).

## 0. Snapshot nhận xét

- [Bài nộp lượt 1](archive/M2-4-perf-jpa__2026-11-10__lesson2-lan2__2026-11-10__BAI_NOP_CHAM_TAM_1.md).
- Đã đọc cả phần câu 1 nằm sau dấu phân cách.
- Chấm **câu 1, 2, 3 đã có bài**. Câu 4–16 còn trống, chưa chấm; không cho 0 để kết luận trượt toàn lesson.
- Giữ nguyên đề, đáp án và bài trả lời. Lượt này không viết lại đề hoặc tự tạo thêm bài bắt buộc.

## 1. Điểm tổng và nhóm kiến thức

**13,5/15 ×100 = 90/100 trên phần đã làm.** Đề đầy đủ là 80đ; điểm tạm không phải đã đạt Lesson 02/module.

| Nhóm | Điểm | Mức |
|---|---:|---|
| Thiết kế theo response/fetch plan (1) | 5/5 =100% | Đạt phần được hỏi |
| JOIN để lọc khác fetch (2) | 3,5/5 =70% | Cần chỉnh lý do và thêm bằng chứng |
| Gọi đúng method JOIN FETCH và trả DTO (3) | 5/5 =100% | Đạt phần được hỏi |
| NULL, graph, batch, projection, kiểm chứng (4–16) | Chưa chấm | Chưa có bài làm |

## 2. Bảng từng câu

| Câu | Đúng/Sai/Thiếu | Điểm | Nhận xét |
|---|---|---:|---|
| 1 | Đúng | 5/5 | Nêu đúng dữ liệu hai API, không EAGER toàn cục, chọn projection theo use case |
| 2 | Đúng kết quả/lọc, lý do fetch chưa chuẩn | 3,5/5 | Đúng Product 10 và không cam kết initialize; nhầm khả năng lấy thêm categoryName, thiếu vế kiểm runtime |
| 3 | Đúng theo ý nghĩa | 5/5 | Phải đổi Service gọi method fetch; kỳ vọng một SELECT; không bắt trả Entity cho client |
| 4–16 | Chưa làm | Chưa chấm | Không cộng hoặc trừ điểm ở lượt này |

## 3. Phân tích và chữa từng câu

### Câu 1 — 5/5

| Tiêu chí | Điểm | Bằng chứng |
|---|---:|---|
| Dropdown chỉ cần Product.id/name | 1/1 | Bạn nói không bắt buộc tải Category |
| Catalog cần thêm Category.name | 1/1 | Bạn chỉ đúng categoryName và đề xuất DTO projection |
| Không cần đổi EAGER toàn cục | 1/1 | Bạn phủ định trực tiếp |
| Phạm vi từng endpoint/use case | 1/1 | Bạn nói mỗi API có fetch plan khác nhau |
| Fetch plan gắn với dữ liệu/cách tải | 1/1 | Bạn đối chiếu nhu cầu hai API và chọn projection cho API thứ hai |

Không bắt định nghĩa theo sách. Cách mô tả dữ liệu cần và cách lấy đã thể hiện ý fetch plan.

Chỉnh nhỏ, không trừ: “cần tải Category” ở đây nên hiểu là cần **dữ liệu Category.name**, không nhất thiết phải tải toàn Entity Category. Chính lựa chọn projection của bạn đã thể hiện được điều đó.

DTO projection phù hợp endpoint chỉ đọc ít field, nhưng JOIN FETCH/EntityGraph rồi map DTO cũng có thể hợp lý. Không biến “nên dùng projection” thành quy tắc cấm fetch entity ở mọi API đọc.

### Câu 2 — 3,5/5

| Tiêu chí | Điểm | Đánh giá |
|---|---:|---|
| Chọn Product 10 | 1/1 | Đúng ID và dòng dữ liệu |
| JOIN/WHERE lọc theo Category.name | 1/1 | Bạn mô tả lọc Product theo tham số Books |
| JOIN thường không bảo đảm initialize | 1/1 | Bạn kết luận đúng |
| Phân biệt chọn Product với fetch Category | 0,5/1 | Có nói query chọn Product; lý do “thêm categoryName nhưng chưa init toàn Entity” chưa đúng căn cứ |
| Bằng chứng runtime | 0/1 | Chưa trả lời vế 3 |

**Thiếu tổng 1,5đ**, gồm 0,5đ lý do và 1đ phần kiểm runtime.

#### Sửa chỗ dễ nhầm

Query là:

```sql
select p
from Product p
join p.category c
where c.name = :categoryName
```

Ba việc khác nhau:

- JOIN cho phép nối Product với Category để xét điều kiện.
- WHERE c.name='Books' dùng tên Category để chọn Product phù hợp.
- SELECT p nói kết quả JPQL là Product; không yêu cầu trả c.name như một scalar/DTO field, và không có JOIN FETCH để yêu cầu initialize Category.

Bạn không nên giải thích “query có thể chọn thêm categoryName nên chỉ tải một phần Category”. Không thể suy ra field kết quả từ việc field đó xuất hiện trong WHERE. SQL thực tế do provider sinh có thể khác nhau; điều cần kết luận ở cấp query này là **JOIN thường phục vụ lọc, không có cam kết fetch quan hệ**.

Sau query, mapper cần getCategory().getName() vẫn có thể làm ORM tải Category. Không đồng nhất “DB đã dùng categories.name để lọc” với “Entity Category đã được khởi tạo trong persistence context”.

**Bản trả lời đủ ý:**

> Query chọn Product 10 vì Category của nó có name=Books. JOIN/WHERE dùng Category để lọc, còn SELECT p trả Product; JOIN thường không bảo đảm Category đã initialize. Gọi request riêng và xem SQL log: tách query lấy Product với các SELECT Category có thể phát sinh lúc map DTO.

Không bắt cam kết số SQL tuyệt đối trên mọi provider/version. Không yêu cầu đọc được SQL alias hoặc nhớ tên logger.

Đọc [Lesson 02 mục 2](../../Notes/M2_Database/M2_4_Performance/LESSON_02_FETCH_JOIN_ENTITYGRAPH_BATCH_DTO.md).

### Câu 3 — 5/5

- Thêm method không tự thay lời gọi Service: **1/1**. Câu “chưa chắc tự hết ... phải sử dụng findAllWithCategory” được hiểu là bạn yêu cầu đổi lời gọi, không coi từ “chưa chắc” thành lỗi học thuật.
- Chọn đúng findAllWithCategory(): **1/1**.
- Kỳ vọng một SELECT dữ liệu: **1/1**.
- Không cần SELECT Category riêng vì JOIN FETCH tải sẵn: **1/1**. Nhận lý do bạn đã nêu ở vế 1 và 3 trong cùng câu, không bắt lặp lại.
- Không cần trả Entity trực tiếp mới dùng JOIN FETCH: **1/1**, bạn đã phủ định và phân biệt tải entity với query DTO.

**Luồng cần giữ:**

```text
Service gọi findAllWithCategory()
-> repository query Product cùng Category
-> mapper đọc dữ liệu đã fetch để dựng ProductResponse
-> Controller trả DTO cho client
```

Chỉnh nhỏ, không trừ: JOIN FETCH không chỉ dành cho update. Nó cũng có thể dùng cho API đọc rồi map DTO; projection là một lựa chọn khác nếu chỉ cần field cố định. Tương tự, managed entity không chỉ có khi dùng JOIN FETCH; truy vấn entity thông thường trong persistence context cũng có thể trả entity managed. FETCH chủ yếu giải quyết nhu cầu tải quan hệ.

Đọc bài học mục 2, 5–6.

### Câu 4–16 — Chưa chấm

Không kết luận bạn sai các câu này. Tiếp tục theo thứ tự đề: NULL/left fetch, phạm vi graph, batch đọc/ghi và phép tính, DTO projection/constructor/dirty checking, chọn cách và kiểm trước–sau. Không cần học HikariCP hoặc paging collection sâu để trả lời.

## 4. Phác đồ ôn phần thiếu

- JOIN lọc khác fetch → Lesson 02 mục 2 → 5 phút → sửa lý do câu 2, không suy ra SELECT field từ WHERE.
- Kiểm SQL runtime → Lesson 01 mục 5, Lesson 02 mục 7 → 3 phút → thêm cách xem SQL khi mapper chạy vào câu 2 vế 3.
- Chọn fetch cho đọc/ghi → Lesson 02 mục 5–6 → 2 phút → nhớ JOIN FETCH có thể dùng cho đọc, không bắt buộc trả Entity ra ngoài.

Các nguồn nằm ở [bài học Lesson 02](../../Notes/M2_Database/M2_4_Performance/LESSON_02_FETCH_JOIN_ENTITYGRAPH_BATCH_DTO.md) và [Lesson 01](../../Notes/M2_Database/M2_4_Performance/LESSON_01_N_PLUS_1_VA_SQL_LOG.md); tương ứng checklist fetch plan/N+1 trong [lộ trình](../../01_LO_TRINH.md).

## 5. Quyết định

**Đạt ngưỡng phần đã làm; tiếp tục Lesson 02, chưa chốt lesson/module.** Bạn hiểu cách chọn theo response và thay đúng repository method. Cần sửa cơ chế JOIN thường ở câu 2 thay vì chỉ nhớ kết luận.

Không mở module mới hoặc tự tick checklist từ ba câu đã làm.

## 6. Kế hoạch tiếp theo

Chưa cần kế hoạch học lại 3–5 ngày từ bài chấm từng phần. Dành khoảng 10 phút sửa các ý trên rồi làm tiếp câu 4–8. Có thể nộp từng đợt; không bắt làm lại câu 1 và 3 đang đúng.

## 7. Cập nhật tiến độ

- Điểm tạm: **5 + 3,5 + 5 =13,5/15 =90% câu 1–3**.
- M2-4 giữ đang học, Lesson 01 đã đạt; thêm ghi nhận Lesson 02 chấm tạm.
- Ngày kiểm tra: 2026-11-10; thêm một dòng log.
- Không đổi checklist hoặc trạng thái toàn module ở 01_LO_TRINH.md; không tự đánh giá các câu 4–16 trống.
