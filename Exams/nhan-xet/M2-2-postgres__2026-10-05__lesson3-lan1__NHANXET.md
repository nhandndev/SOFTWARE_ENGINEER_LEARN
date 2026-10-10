# Nhận xét M2-2 PostgreSQL - Lesson 03

Ngày chấm: **2026-10-09**. Đọc đủ bản đã lưu, gồm phần câu 1 bạn viết tiếp sau dấu `---` và câu 4 bắt đầu bằng `---Product`. Không dùng dấu Markdown để bỏ sót bài làm. Chấm theo ý nghĩa/ngữ cảnh, đối chiếu năm tiêu chí mỗi câu ở bài giải, không bắt thuộc câu mẫu.

## 1. Điểm tổng và nhóm kiến thức

**39/40 = 97,5/100 — 🟢 Đạt Lesson 03.** Đây là đánh giá hiểu tình huống theo đề, không xác nhận đã chạy PostgreSQL/Spring hoặc hoàn tất toàn module.

| Nhóm | Điểm | Kết quả |
|---|---|---|
| Transaction SQL, commit/rollback, visibility (1–4) | 19,5/20 = 97,5% | 🟢 |
| Spring boundary, exceptions, proxy, side effect (5–8) | 19,5/20 = 97,5% | 🟢 |

## 2. Bảng từng câu

| Câu | Kết quả | Điểm | Nhận xét |
|---|---|---|---|
| 1 | Đúng trọng tâm | 5/5 | Autocommit, lỗi giá 0, Category còn/Product không có và cần transaction chung. |
| 2 | Đúng | 5/5 | Hai INSERT hợp lệ; rollback hủy cả hai, phân biệt commit/rollback. |
| 3 | Đúng kết quả | 5/5 | Đúng ai thấy dữ liệu trước/sau commit; save/flush chỉ là cách bạn liên hệ JPA. |
| 4 | Cần chỉnh trạng thái sau lỗi | 4,5/5 | Đúng CHECK, không tiếp tục bình thường, cần ROLLBACK và không còn hai dòng; nhầm aborted với đã rollback. |
| 5 | Cần chỉnh lý do hai transaction riêng | 4,5/5 | Đúng vị trí, proxy/manager, rollback chung và save khác commit; giải thích bằng isolation chưa đúng. |
| 6 | Đúng theo rubric | 5/5 | Runtime rollback, checked thử commit, rollbackFor và không phụ thuộc HTTP. |
| 7 | Đúng | 5/5 | Hiểu catch giữ lỗi trong method, normal return và giới hạn rollback-only. |
| 8 | Đúng | 5/5 | Hiểu this-call, sửa boundary, không thu hồi email và không thay constraint. |

## 3. Làm được, còn thiếu và chữa từng câu

### Câu 1 — 5/5

Bạn đã nói đúng Category được commit sau INSERT riêng vì autocommit; Product giá 0 vi phạm quy tắc giá; cuối cùng chỉ Category tồn tại. “Product không hợp lệ” được hiểu theo cả câu trả lời là INSERT thất bại, Product không được tạo. Cũng đã nói cùng file/request chưa đủ và cần transaction bao hai lệnh.

Năm ý đều được thể hiện: **1 + 1 + 1 + 1 + 1**.

Lưu ý từ “tự rollback” ở cuối: ý cùng thành công/cùng hủy đúng, nhưng khi viết SQL tường minh phải phân biệt transaction đã lỗi với việc client đã gửi ROLLBACK để kết thúc nó. Đây cùng một nhầm lẫn được chấm ở câu 4; không trừ lại tại câu 1. Spring có thể điều phối rollback giúp bạn khi đi qua đúng proxy và quy tắc.

### Câu 2 — 5/5

Bạn trả lời đủ: BEGIN gom hai INSERT, hai lệnh hợp lệ, sau rollback không còn cả Category lẫn Product, commit xác nhận còn rollback hủy. “Hình như”, “lười đọc” không phải lý do trừ điểm khi kết quả bạn chọn đúng; đề không bắt giải thích thêm từng constraint ở ý này.

Năm ý: **1 + 1 + 1 + 1 + 1**.

Ghi chú không trừ: ROLLBACK không chỉ dùng khi có lỗi. Chính ví dụ câu 2 là hai lệnh hợp lệ nhưng vẫn chủ động rollback. “Cả hai không còn” là hai dòng mới, không phải xóa dữ liệu Books/Electronics ban đầu.

### Câu 3 — 5/5

Bạn nói đúng session đang ghi thấy thay đổi của mình; session khác không thấy phần chưa commit; commit thành công giữ hai dòng; SELECT mới sau commit theo giả định đề thấy dữ liệu; tự đọc thấy chưa chứng minh đã commit.

Năm ý: **1 + 1 + 1 + 1 + 1**. Không bắt giải thích MVCC/isolation nâng cao. Không trừ vì bạn dùng save/flush để liên hệ cách viết JPA.

Chỉnh hình dung: ở câu này là SQL trực tiếp, không có repository.save() hay JPA flush(). Chính INSERT đã chạy trong transaction nên session đang ghi đọc được dòng vừa chèn. Ý bạn muốn nói “SQL đã thực hiện nhưng transaction chưa commit” là đúng. Với Read Committed, một SELECT lấy dữ liệu theo snapshot khi câu SELECT bắt đầu; không nên khái quát thành lúc nào cũng thấy giá trị mới nhất đang thay đổi.

### Câu 4 — 4,5/5

Đã làm đúng:

- Price=0 vi phạm CHECK(price > 0): **1/1**.
- Biết không thể tiếp tục bình thường rồi giữ Category như chưa có lỗi: **1/1**.
- Chọn ROLLBACK: **1/1**.
- Sau rollback không còn Category/Product mới: **1/1**.

Ý trạng thái transaction: **0,5/1**. Bạn viết “chuyển sang trạng thái ROLLBACK”, nhưng cũng nhận thấy còn thiếu lệnh kết thúc và chọn ROLLBACK ở sau. Có hiểu nhu cầu hủy nhưng chưa tách đúng hai thời điểm, không chấm toàn ý là sai.

Luồng đúng:

```text
BEGIN
-> INSERT Category hợp lệ, chưa commit
-> INSERT Product lỗi CHECK
-> transaction đang lỗi/aborted, chưa kết thúc bình thường
-> client gửi ROLLBACK
-> hủy nhóm thay đổi, kết thúc transaction
```

Aborted không phải tên lệnh ROLLBACK và không có nghĩa kết nối đã sẵn sàng xử lý transaction mới. Đề dừng ngay sau INSERT lỗi để hỏi bạn cần làm gì tiếp; thiếu COMMIT/ROLLBACK ở đoạn đó là có chủ ý, không phải thiếu code.

Đọc lại [Lesson 03 mục 4](../../Notes/M2_Database/M2_2_PostgreSQL/LESSON_03_TRANSACTION_VA_SPRING.md). [PostgreSQL: Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html).

### Câu 5 — 4,5/5

Bạn đã làm được:

- Đặt @Transactional trên register(): **1/1**.
- Mô tả proxy → transaction manager → transaction bao method: **1/1**.
- Manager điều phối và Category bị hủy khi cả transaction rollback: **1/1**.
- save() không chứng minh commit, không đồng nhất save với commit: **1/1**.

Lý do hai transaction riêng chưa bảo đảm atomic: **0,5/1**. Bạn kết luận đúng “không bảo đảm cùng hủy/cùng thành công” nhưng giải thích “isolation, transaction này không được đụng đến transaction kia” không đúng nguyên nhân. Không cần học isolation nâng cao để sửa chỗ này.

Lý do đơn giản đúng:

```text
Chưa có transaction Service bao ngoài:
Repository call 1: lưu Category -> transaction 1 commit
Repository call 2: lưu Product lỗi -> transaction 2 rollback
-> rollback transaction 2 không hoàn tác transaction 1 đã commit

Có transaction Service bao cả hai:
mở transaction -> lưu Category -> lưu Product lỗi -> rollback chung
-> không giữ Category mới
```

Không phải hai transaction tuyệt đối không được tác động cùng dữ liệu; điểm chính là **không có chung ranh giới commit/rollback**. Đọc lại Lesson 03 mục 5–6, checklist transaction trong M2-2.

Ghi chú quan trọng nhưng không trừ thêm: “save chỉ giữ ở persistence context, chưa SQL/flush” không luôn đúng. Với IDENTITY trong code đề, Hibernate thường cần INSERT sớm để lấy id. Tuy nhiên, **INSERT đã gửi xuống DB vẫn không bằng transaction đã commit**. Ý được chấm là bạn hiểu save khác commit, không phải thuộc thời điểm INSERT của từng chiến lược sinh id. [Hibernate: Flushing](https://docs.hibernate.org/orm/current/userguide/html_single/#flushing).

### Câu 6 — 5/5

Bạn nêu đủ năm quyết định đúng: AppException runtime thoát ra qua proxy thì rollback; Category không còn; checked exception mặc định thử commit; có thể cấu hình rollbackFor=CheckedProblem; không quyết định theo HTTP status. Không trừ cách viết hoa/sai chính tả annotation.

Năm ý: **1 + 1 + 1 + 1 + 1**.

Phần bạn đoán lý do lịch sử của default không nên dùng làm quy luật: checked không đồng nghĩa nghiệp vụ vẫn đúng, runtime cũng không phải lúc nào là lỗi business. Đây là quy tắc mặc định của Spring, có thể thay bằng cấu hình phù hợp nghiệp vụ. Không cần đoán vì sao framework chọn default để nhận đủ điểm.

### Câu 7 — 5/5

Bạn đủ cả năm ý: catch bên trong nên exception không ra proxy; method kết thúc bình thường; theo giả định commit thành công giữ Category; bỏ catch/để runtime exception đi ra để dùng rollback mặc định; biết rollback-only có thể ngăn commit dù lỗi bị bắt.

Năm ý: **1 + 1 + 1 + 1 + 1**. Chấp nhận cách nói “rollback-only thì rollback” ở mức lesson; không bắt thuộc UnexpectedRollbackException. Không suy “mọi lỗi bị catch đều commit”.

### Câu 8 — 5/5

Bạn đủ cả năm ý: this-call không đi qua proxy lần nữa; không tạo transaction chung theo annotation trên savePair trong lời gọi này; đặt annotation lên handle được Controller gọi; DB rollback không thu hồi email bên ngoài; transaction không thay WHERE/constraint.

Năm ý: **1 + 1 + 1 + 1 + 1**. Không bắt đưa thêm cách tách bean khi bạn đã nêu một cách đúng.

Chỉnh hình dung nhỏ, không trừ: proxy/interceptor không tự chạy transaction cho savePair chỉ vì thấy annotation nằm trong class; phải có lời gọi đi qua proxy tới method phù hợp. Nếu handle() đã mở transaction, this.savePair() chạy trong transaction đang có dù annotation riêng của savePair không được áp dụng qua this-call. Giữ annotation trên savePair có thể hữu ích cho caller khác qua proxy, không phải điều kiện để lời gọi nội bộ tham gia transaction của handle.

## 4. Gỡ nhầm dirty checking, flush và commit

Bạn hỏi ở câu 5 “sao bị lạc cái này với Dirty Check”. Chúng liên quan nhưng làm ba việc khác nhau:

| Khái niệm | Vai trò |
|---|---|
| Persistence context | JPA/Hibernate quản lý các entity đang managed trong phiên làm việc |
| Dirty checking | Phát hiện trạng thái entity managed đã thay đổi; giúp chuẩn bị UPDATE khi đồng bộ |
| Flush | Đồng bộ thay đổi từ persistence context xuống DB bằng SQL; có thể phát hiện lỗi constraint |
| Commit | Xác nhận transaction DB; trước đó SQL đã chạy vẫn có thể bị rollback |

Ví dụ khái niệm, giả sử Product có setter và method được gọi qua proxy:

```java
@Transactional
public void rename(Long id) {
    Product product = products.findById(id).orElseThrow();
    product.setName("New name");
    // Entity managed: Hibernate có thể phát hiện thay đổi và flush UPDATE.
    // Không cần save lại chỉ để Hibernate nhận ra field đã đổi.
}
// Ranh giới transaction mới quyết định commit/rollback.
```

Ví dụ này không phải code cần chạy với Product tối giản của đề, vì đề chưa khai báo setter. Dirty checking không phải tên khác của transaction hoặc commit. Với entity mới, save có thể dẫn tới persist/merge; INSERT có thể sớm do IDENTITY. Không học thuộc chuỗi “save luôn chỉ trong RAM → flush → commit” như lịch cố định cho mọi trường hợp. [Hibernate: Flushing](https://docs.hibernate.org/orm/current/userguide/html_single/#flushing).

## 5. Phác đồ ôn hai chỗ còn thiếu

- Aborted khác rollback hoàn tất → Lesson 03 mục 4 → 5 phút → tự kể trạng thái ngay sau INSERT lỗi rồi sau ROLLBACK.
- Transaction riêng khác ranh giới chung → Lesson 03 mục 5–6 → 5 phút → kể lại Category commit riêng rồi Product rollback riêng.
- Dirty checking/flush/commit → bảng ở mục 4 nhận xét này → 5 phút → giải thích vì sao có SQL UPDATE vẫn chưa chứng minh commit; đây là củng cố thêm, không phải điểm bị trừ.

## 6. Quyết định và kế hoạch

**🟢 Đạt Lesson 03, có thể học Lesson 04 trong M2-2.** Không cần kế hoạch học lại 3–5 ngày; ôn ba mục trên khoảng 15 phút. Không mở module mới hoặc xác nhận deliverable từ điểm lesson.

## 7. Cập nhật tiến độ

- 05_TIEN_DO.md: M2-2 vẫn đang học, Lesson 01–03 đạt; điểm gần nhất 97,5 (Lesson 03), ngày 2026-10-09; thêm dòng log.
- 01_LO_TRINH.md: chỉ tick checklist transaction BEGIN/COMMIT/ROLLBACK và ranh giới @Transactional đã được đánh giá; không rewrite module.
- Không sửa bài làm hoặc đáp án. Không coi code mẫu/biên dịch của AI là bài thực hành người học.
