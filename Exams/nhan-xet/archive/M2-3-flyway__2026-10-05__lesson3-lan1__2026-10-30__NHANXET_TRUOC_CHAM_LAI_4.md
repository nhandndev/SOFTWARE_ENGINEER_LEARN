# Chấm lại Flyway Lesson 03: câu 1–7

Ngày: **2026-10-30**. Chấm bản bài làm đã lưu theo ý nghĩa và rubric hiện hành, không trừ lỗi gõ. Câu 7 được viết trước dòng “Trả lời” và vẫn được tính đầy đủ. Câu 8 trống: chưa chấm, không đưa vào mẫu số điểm tạm.

## 0. Snapshot nhận xét

- [Bài nộp lượt này](archive/M2-3-flyway__2026-10-05__lesson3-lan1__2026-10-30__BAI_NOP_CHAM_TAM_3.md).
- [Nhận xét lượt trước](archive/M2-3-flyway__2026-10-05__lesson3-lan1__2026-10-30__NHANXET_TRUOC_CHAM_LAI_3.md).
- Giữ nguyên bài làm, đề và rubric; không cộng điểm từ nhiều lượt.

## 1. Điểm tổng và nhóm kiến thức

**31,5/35 = 90/100 trên bảy câu đã làm.** Chưa phải điểm đủ 8 câu và chưa chốt Lesson 03/module.

| Nhóm | Điểm | Đánh giá |
|---|---:|---|
| Chẩn đoán kết nối (1) | 3,5/5 = 70% | 🟡 Còn thiếu bước kiểm |
| Repair và baseline (2,4) | 9,5/10 = 95% | 🟢 Đạt phần được hỏi |
| Rollback và recovery (3,5) | 10/10 = 100% | 🟢 Đạt phần được hỏi |
| Chuyển schema tương thích (6) | 4/5 = 80% | 🟡 Thiếu điều kiện bỏ cột |
| Kiểm migration trong CI (7) | 4,5/5 = 90% | 🟢 Đúng hai đường kiểm |
| Maven/CLI và clean (8) | Chưa chấm | Chưa có câu trả lời |

## 2. Bảng từng câu

| Câu | Đúng/Sai/Thiếu | Điểm | Nhận xét |
|---|---|---:|---|
| 1 | Đã bổ sung, còn thiếu chẩn đoán | 3,5/5 | Đúng sửa credential; có URL/DB và user/password, thiếu đọc lỗi gốc và nguồn cấu hình runtime. |
| 2 | Đúng cơ chế, phương án V1 gốc chưa rõ | 4,5/5 | Không nhầm repair với thêm cột; cần nói rõ khôi phục V1 đã chạy, đưa thay đổi vào V2. |
| 3 | Đúng | 5/5 | CHECK lỗi ở lệnh 3; rollback V2, giữ V1 và không suy rộng cho SQL không transactional. |
| 4 | Đúng | 5/5 | Baseline ghi mốc, không chạy V1/không xác minh toàn schema; V2 tiếp tục. |
| 5 | Đúng theo ý nghĩa | 5/5 | Phân biệt thêm lại cấu trúc với phục hồi giá trị, repair với backup/restore. |
| 6 | Đúng phần chính, thiếu điều kiện contract | 4/5 | Có expand, backfill, kiểm soát ghi; chưa bảo đảm app/job hết phụ thuộc name trước drop. |
| 7 | Đúng hai nhánh, thiếu chốt loại DB | 4,5/5 | Có migrate/schema/data/fail CI; chưa nêu rõ dùng PostgreSQL test tương thích deploy. |
| 8 | Chưa trả lời | Chưa chấm | Không tính 0 khi chấm riêng phần đã làm. |

## 3. Bằng chứng, phần thiếu và chữa bài

### Câu 1 — 3,5/5, tăng từ 2/5

- Chọn sửa credential, không repair: **2/2**.
- Đọc lỗi gốc: **0/1**. “Kiểm tra code có đúng không” chưa thể hiện đọc thông báo authentication/connection cụ thể.
- URL/DB đích: **1/1**, bạn đã bổ sung trực tiếp.
- Nguồn user/password/profile: **0,5/1**. Đã nói kiểm user/password, nhưng chưa nói kiểm giá trị thực sự lấy từ env/profile/secret nào. Không coi mục này hoàn toàn thiếu.

**Bản đủ ý:** “Sửa credential. Đọc lỗi gốc để xác nhận lỗi đăng nhập; kiểm URL/host/port/database; kiểm user/password đang có hiệu lực lấy từ profile/env/secret nào.” Không in password ra log.

Điểm thiếu là bước xác nhận cấu hình thực tế, không phải phải nhớ nguyên tên property.

### Câu 2 — 4,5/5, giữ điểm

- Repair không chạy SQL thêm cột: **2/2**.
- Đối chiếu file phát hành, history, schema: **1/1**.
- Bổ sung thay đổi mới bằng migration mới: **1/1**, nhận ý theo ngữ cảnh.
- Khôi phục file đã phát hành: **0,5/1**. “Phương án V1 gốc” đúng hướng nhưng chưa nói rõ hành động khôi phục; không tự điền toàn bộ quy trình thay bạn.

**Bản đủ ý:** “Đối chiếu V1 đã phát hành, history và schema đúng DB. Khôi phục V1 về nội dung gốc đã áp dụng, tạo V2 để thêm description. Repair không thêm cột và không phải bước mặc định khi đã trả V1 về đúng bản gốc.”

Không yêu cầu viết lệnh hay SQL vì đề không hỏi.

### Câu 3 — 5/5, giữ điểm

Bạn đúng cả bốn ý: CHECK ở lệnh thứ ba gặp stock=-1 (**1đ**); toàn V2 rollback gồm ALTER/UPDATE (**2đ**); V1 đã commit vẫn còn (**1đ**); không suy rộng cho SQL không transactional (**1đ**).

**Cần giữ:** rollback theo phạm vi transaction được đề cho, không theo tên file một cách tuyệt đối.

### Câu 4 — 5/5, giữ điểm

Bạn đã nói DB được xác minh trước (**1đ**), baseline tạo mốc V1 (**1đ**), coi V1 đã có thay vì chạy lại (**1đ**, nhận theo ngữ cảnh), không tự kiểm toàn schema (**1đ**), V2 pending để migrate (**1đ**).

**Cần giữ:** baseline là bắt đầu quản lý DB có sẵn từ một mốc, không phải công cụ chứng minh schema đúng. Không chỉ production mới có thể cần baseline.

### Câu 5 — 5/5, giữ điểm

Nhận toàn đoạn thay vì bắt riêng câu mở đầu: bạn nói rõ thêm lại cột không tự lấy lại giá trị cũ (**2đ**), migration mới sửa theo SQL mới (**1đ**), repair chỉnh history (**1đ**), backup/restore phục vụ khôi phục (**1đ**).

**Cần giữ:** gán dữ liệu bằng SQL mới có thể là backfill, nhưng không đồng nghĩa lấy lại chính xác giá trị gốc đã mất. Muốn lấy lại cần nguồn backup/recovery phù hợp.

### Câu 6 — 4/5, giữ điểm

- Thêm title, chưa bỏ name ngay: **1/1**.
- Backfill name sang title: **1/1**.
- Kiểm soát ghi bằng tạm dừng có kế hoạch hoặc đồng bộ: **1/1**.
- Điều kiện bỏ name: **1/2**. Có đồng bộ dữ liệu, còn thiếu app/job cũ hết phụ thuộc name.

**Bổ sung đúng một điều kiện:** “Sau khi đồng bộ cuối, chuyển hết app/job sang code không còn đọc/ghi name, kiểm dữ liệu và luồng ghi mới đúng rồi mới drop name.”

Nếu mở lại app cũ vẫn query name sau khi drop, app vẫn lỗi dù dữ liệu đã copy đầy đủ. Không bắt trigger hay zero-downtime; phương án tạm dừng có kiểm soát của bạn được chấp nhận.

### Câu 7 — 4,5/5, mới chấm

Bạn đã viết bài phía trên dòng “Trả lời”; **không bỏ sót phần đó**.

| Tiêu chí | Điểm | Bằng chứng |
|---|---:|---|
| DB test phù hợp deploy | 0,5/1 | Có database test riêng, chưa gọi rõ PostgreSQL tương thích môi trường deploy |
| Đường DB trống | 1/1 | Chạy V1 đến mới nhất, kiểm migration thành công và schema |
| Đường nâng cấp DB cũ | 1/1 | Dựng version cũ có dữ liệu rồi chạy migration còn thiếu |
| Kiểm kết quả | 1/1 | Kiểm schema, dữ liệu cũ không mất/sai và dữ liệu mới đúng |
| Khi lỗi | 1/1 | CI fail, chặn triển khai và sửa theo trạng thái phát hành |

Không bắt đúng từ “validate” hoặc viết pipeline: bạn đã mô tả kiểm kết quả schema và migration, đủ ý tiêu chí đó. Điểm loại DB chỉ nhận một phần vì câu hỏi yêu cầu nêu DB loại nào; không cho 0 hoàn toàn khi bạn đã chọn môi trường test thay production.

**Thêm câu này là đủ phần còn thiếu:** “Cả hai nhánh dùng PostgreSQL test cô lập, với phiên bản và cấu hình liên quan phù hợp môi trường deploy; không thay bằng H2 rồi coi như đã kiểm được SQL PostgreSQL.”

“Nhánh” ở đây là hai kịch bản kiểm, không bắt hai Git branch. Cách bạn hiểu là đúng.

### Câu 8 — Chưa chấm

Chưa có bài làm. Không kết luận bạn sai hay cho 0 ở lượt chấm từng phần.

Đọc lại ba cách chạy: Boot dùng cấu hình Boot; Maven cần plugin/cấu hình phù hợp; CLI cần cài và cấp cấu hình riêng, không tự đọc application.yml. Trước migrate/clean phải biết DB/schema/credential đích; clean xóa object, không dùng để chữa dữ liệu cần giữ.

## 4. Phác đồ ôn ngắn

Nguồn chung: [README học bổ sung Lesson 03](../../Notes/M2_Database/M2_3_Flyway/README_HOC_BO_SUNG_LESSON_03.md), thuộc checklist Flyway của [lộ trình](../../01_LO_TRINH.md).

- Chẩn đoán kết nối → mục 2 → 3 phút → viết lỗi gốc, DB đích và nguồn credential runtime.
- V1 gốc và repair → mục 3 → 2 phút → nói rõ khôi phục V1, thêm V2.
- Điều kiện bỏ cột → mục 7 → 3 phút → thêm điều kiện app/job hết dùng name.
- Kiểm CI → mục 8 → 2 phút → chốt loại PostgreSQL test.
- Công cụ chưa trả lời → mục 9 → 5 phút → trả lời câu 8 bằng lời, không cần cài CLI.

## 5. Quyết định

**Đạt ngưỡng phần đã làm, chưa chốt lesson/module và chưa mở module kế tiếp.** Còn câu 8 và những ý thiếu được ghi rõ trên. Không yêu cầu làm lại cả module hoặc làm đề phụ để thay điểm chính.

## 6. Kế hoạch tiếp theo

Chưa đủ bài để kết luận cần học lại 3–5 ngày. Dành khoảng 15 phút ôn các mục trên, hoàn thành câu 8; sau đó chấm đủ 8 câu theo thang /40. Điểm 90 ở đây chỉ mô tả phần đã trả lời.

## 7. Tiến độ và lịch sử

- Lượt đầu: câu 2–5 đạt **17/20 = 85%**.
- Lượt tiếp: câu 1–6 đạt **25,5/30 = 85%**.
- Lượt này: **3,5 + 4,5 + 5 + 5 + 5 + 4 + 4,5 = 31,5/35 = 90%**.
- Câu 1 tăng 1,5đ nhờ URL/DB và user/password; câu 7 mới đạt 4,5/5. Các câu 2–6 giữ điểm vì nội dung không đổi.
- 05: giữ trạng thái đang học, cập nhật điểm tạm câu 1–7/ngày kiểm tra và thêm một log.
- 01: không tick thêm checklist hoặc đổi trạng thái module từ bài chấm tạm.
