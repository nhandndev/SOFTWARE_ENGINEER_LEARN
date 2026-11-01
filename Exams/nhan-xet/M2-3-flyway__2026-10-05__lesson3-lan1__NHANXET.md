# Chấm toàn bài Flyway Lesson 03: câu 1–8

Ngày: **2026-10-30**. Chấm bản bài làm đã lưu theo ý nghĩa và rubric hiện hành, không trừ lỗi gõ. Câu 7 được viết trước dòng “Trả lời” và vẫn được tính đầy đủ. Câu 8 hiện đã có đáp án kỹ thuật đầy đủ, thay cho “câu này chịu” ở bản lượt trước. Chấm theo bản hiện tại; giữ nguyên lời người học.

## 0. Snapshot nhận xét

- [Bài nộp lượt này](archive/M2-3-flyway__2026-10-05__lesson3-lan1__2026-10-30__BAI_NOP_CHAM_5.md).
- [Nhận xét lượt trước](archive/M2-3-flyway__2026-10-05__lesson3-lan1__2026-10-30__NHANXET_TRUOC_CHAM_LAI_5.md).
- Giữ nguyên bài làm, đề và rubric; không cộng điểm từ nhiều lượt.

## 1. Điểm tổng và nhóm kiến thức

**36,5/40 × 100 = 91,25/100. Đạt Lesson 03.** Câu 8 tăng từ 0 lên 5; câu 1–7 không đổi nên giữ điểm. Đây là điểm lesson, không phải điểm tổng kết toàn module.

| Nhóm | Điểm | Đánh giá |
|---|---:|---|
| Chẩn đoán kết nối (1) | 3,5/5 = 70% | 🟡 Còn thiếu bước kiểm |
| Repair và baseline (2,4) | 9,5/10 = 95% | 🟢 Đạt phần được hỏi |
| Rollback và recovery (3,5) | 10/10 = 100% | 🟢 Đạt phần được hỏi |
| Chuyển schema tương thích (6) | 4/5 = 80% | 🟡 Thiếu điều kiện bỏ cột |
| Kiểm migration trong CI (7) | 4,5/5 = 90% | 🟢 Đúng hai đường kiểm |
| Maven/CLI và clean (8) | 5/5 = 100% | 🟢 Đã phân biệt đúng công cụ và rủi ro |

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
| 8 | Đúng, đã bổ sung đầy đủ | 5/5 | Phân biệt core/plugin/CLI/Boot, cấp cấu hình riêng, kiểm DB đích và nguy cơ clean. |

## 3. Bằng chứng, phần thiếu và chữa bài

### Câu 1 — 3,5/5, giữ điểm lượt trước

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

### Câu 7 — 4,5/5, giữ điểm lượt trước

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

### Câu 8 — 5/5, tăng từ 0/5

Đã đọc toàn bộ đáp án mới, gồm cả đoạn “Cách 3” và phần xác định DB đích.

| Tiêu chí | Điểm | Bằng chứng trong bài |
|---|---:|---|
| Maven plugin và cấu hình | 1/1 | Bạn phân biệt flyway-core với Maven Plugin; nêu plugin, driver, kết nối, locations |
| CLI có cấu hình riêng | 1/1 | Bạn nêu cấp URL/user/password/locations qua cơ chế cấu hình CLI |
| Không tự đọc YAML của Boot | 1/1 | Bạn nói trực tiếp CLI không tự đọc application.yml |
| Kiểm đúng DB đích | 1/1 | Bạn yêu cầu xác định chính xác DB trước khi migrate/clean |
| Rủi ro clean | 1/1 | Bạn nói xóa object trong schema cấu hình, gây mất dữ liệu, đặc biệt nguy hiểm trên production |

Nhận ý “xác định chính xác database mà Flyway sẽ kết nối” theo ngữ cảnh kết nối đã nêu; không bắt lặp lại mọi keyword ở từng đoạn.

Phần Boot bạn cũng nói đúng: Flyway có thể chạy khi app khởi động **nếu được cấu hình đúng**. Câu “Cách 3” được hiểu cùng điều kiện này, không coi là khẳng định mọi ứng dụng Java đều tự chạy Flyway.

**Kết luận:** không còn thiếu ý tính điểm ở câu 8. Không đòi viết XML/plugin hoặc cấu hình CLI vì đề chỉ hỏi cơ chế.

Đọc lại khi cần: [bài phụ mục 9](../../Notes/M2_Database/M2_3_Flyway/README_HOC_BO_SUNG_LESSON_03.md) và [Lesson 03](../../Notes/M2_Database/M2_3_Flyway/LESSON_03_LOI_REPAIR_BASELINE_VA_CI.md). Không cần làm lại câu 8.

## 4. Phác đồ ôn ngắn

Nguồn chung: [README học bổ sung Lesson 03](../../Notes/M2_Database/M2_3_Flyway/README_HOC_BO_SUNG_LESSON_03.md), thuộc checklist Flyway của [lộ trình](../../01_LO_TRINH.md).

- Chẩn đoán kết nối → mục 2 → 3 phút → viết lỗi gốc, DB đích và nguồn credential runtime.
- V1 gốc và repair → mục 3 → 2 phút → nói rõ khôi phục V1, thêm V2.
- Điều kiện bỏ cột → mục 7 → 3 phút → thêm điều kiện app/job hết dùng name.
- Kiểm CI → mục 8 → 2 phút → chốt loại PostgreSQL test.
- Công cụ đã nắm → mục 9 → tra cứu khi cần, không giao học lại hoặc chạy clean.

## 5. Quyết định

**Đạt Lesson 03: 91,25/100.** Không yêu cầu thi lại lesson này để đạt 100%. Các ý thiếu ở câu 1, 2, 6, 7 vẫn được giữ trong nhận xét để ôn, không tự xóa vì tổng đã đạt.

Chưa tự chốt toàn module M2-3: điểm Lesson 02 và phần còn lại chưa được xác minh trong lượt chấm này. Không đánh đồng nhận xét lesson với đã hoàn thành capstone hoặc deliverable.

## 6. Kế hoạch tiếp theo

Không cần kế hoạch học lại 3–5 ngày vì lesson đã đạt. Dành khoảng 10 phút sửa rõ các ý còn thiếu:

1. Câu 1: đọc lỗi gốc và nguồn credential runtime.
2. Câu 2: khôi phục V1 đúng bản đã áp dụng; thay đổi mới đưa V2.
3. Câu 6: bỏ name sau khi app/job hết phụ thuộc và dữ liệu đã đúng.
4. Câu 7: nêu rõ PostgreSQL test phù hợp deploy.

Các phần 3–5 và 8 không cần làm lại. Việc quyết định bước học tiếp dựa trên toàn bộ tiến độ, không tự mở module mới trong yêu cầu chấm này.

## 7. Tiến độ và lịch sử

- Câu 2–5: **17/20 = 85% phần đã làm**.
- Câu 1–6: **25,5/30 = 85% phần đã làm**.
- Câu 1–7: **31,5/35 = 90% phần đã làm**.
- Lượt toàn bài trước, câu 8 ghi chưa biết: **31,5/40 = 78,75%**.
- Lượt này, câu 8 đã bổ sung: **3,5 + 4,5 + 5 + 5 + 5 + 4 + 4,5 + 5 = 36,5/40 = 91,25%**, đạt Lesson 03.
- Chỉ câu 8 thay đổi: tăng 5 điểm thô, tương đương 12,5 điểm trên thang 100. Không giảm hoặc nâng điểm các câu không đổi.
- 05: cập nhật Lesson 03 đạt, điểm mới, ngày kiểm tra và một log; module vẫn đang học.
- 01: tick riêng kiến thức rollback/forward fix/repair đã được chứng minh qua câu 2/3/5; không tick repeatable/seed và không đổi cả module thành hoàn thành.
