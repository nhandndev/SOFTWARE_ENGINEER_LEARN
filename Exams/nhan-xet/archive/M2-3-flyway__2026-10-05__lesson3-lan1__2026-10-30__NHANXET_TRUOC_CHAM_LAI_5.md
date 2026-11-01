# Chấm toàn bài Flyway Lesson 03: câu 1–8

Ngày: **2026-10-30**. Chấm bản bài làm đã lưu theo ý nghĩa và rubric hiện hành, không trừ lỗi gõ. Câu 7 được viết trước dòng “Trả lời” và vẫn được tính đầy đủ. Câu 8 đã có phản hồi “câu này chịu”: tính 0/5 khi chấm toàn bài, không còn loại khỏi mẫu số. Không sửa câu trả lời của người học.

## 0. Snapshot nhận xét

- [Bài nộp lượt này](archive/M2-3-flyway__2026-10-05__lesson3-lan1__2026-10-30__BAI_NOP_CHAM_4.md).
- [Nhận xét lượt trước](archive/M2-3-flyway__2026-10-05__lesson3-lan1__2026-10-30__NHANXET_TRUOC_CHAM_LAI_4.md).
- Giữ nguyên bài làm, đề và rubric; không cộng điểm từ nhiều lượt.

## 1. Điểm tổng và nhóm kiến thức

**31,5/40 × 100 = 78,75/100. Lesson 03: cần ôn thêm, chưa đạt ngưỡng 85%.** Điểm 90% lượt trước chỉ tính bảy câu đã làm; lần này tính đủ tám câu, không phải giảm điểm câu 1–7.

| Nhóm | Điểm | Đánh giá |
|---|---:|---|
| Chẩn đoán kết nối (1) | 3,5/5 = 70% | 🟡 Còn thiếu bước kiểm |
| Repair và baseline (2,4) | 9,5/10 = 95% | 🟢 Đạt phần được hỏi |
| Rollback và recovery (3,5) | 10/10 = 100% | 🟢 Đạt phần được hỏi |
| Chuyển schema tương thích (6) | 4/5 = 80% | 🟡 Thiếu điều kiện bỏ cột |
| Kiểm migration trong CI (7) | 4,5/5 = 90% | 🟢 Đúng hai đường kiểm |
| Maven/CLI và clean (8) | 0/5 = 0% | 🔴 Chưa thể hiện kiến thức |

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
| 8 | Chưa biết trả lời | 0/5 | Bạn viết “câu này chịu”; chưa có ý đúng để cộng theo năm tiêu chí. |

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

### Câu 8 — 0/5: Boot, Maven plugin và CLI là ba cách chạy khác nhau

Bạn viết **“câu này chịu”**. Đây là chưa biết trả lời, không phải một đáp án kỹ thuật sai cụ thể. Cả năm ý rubric đều chưa được thể hiện nên mỗi ý 0/1; tổng 0/5.

Điểm dễ nhầm: **cùng dùng Flyway nhưng không tự chia sẻ cơ chế đọc cấu hình**.

| Cách chạy | Ai khởi động Flyway? | Cấu hình từ đâu? |
|---|---|---|
| Spring Boot | Boot khởi động app và tích hợp Flyway khi đủ điều kiện | Cấu hình Spring như application.yml, profile, env |
| Maven | Flyway Maven plugin khi gọi goal phù hợp | Cấu hình plugin/Maven hoặc các nguồn Flyway tương ứng, không mặc định lấy YAML của Boot |
| CLI | Chương trình Flyway CLI được gọi riêng | Cấu hình CLI/Flyway tương ứng, không tự hiểu application.yml |

**Ý 1 — Maven (1đ):** thêm dependency flyway-core cho code Java không đồng nghĩa Maven đã được cấu hình để chạy goal flyway:migrate. Cần plugin được Maven phân giải và cấu hình kết nối phù hợp; không cần thuộc XML trong bài này.

**Ý 2 — CLI (1đ):** đề đã nói có CLI, nên phần cần bổ sung là cấp cấu hình cho CLI và bảo đảm driver/module DB phù hợp. Không bắt cài lại CLI vốn đã có.

**Ý 3 — application.yml (1đ):** Boot đọc YAML theo cơ chế Spring. Gọi CLI ngoài app không khởi động Boot để tự đọc YAML đó. Muốn dùng cùng DB phải truyền/cấu hình thông tin tương ứng cho công cụ đang chạy.

**Ý 4 — DB đích (1đ):** kiểm URL/host/port/database, schema và credential thực tế. Lệnh chạy thành công nhưng trỏ nhầm DB vẫn là thao tác sai.

**Ý 5 — clean (1đ):** migrate áp dụng migration; clean xóa database objects trong schema/phạm vi cấu hình và có thể làm mất dữ liệu. Không coi clean là cách sửa checksum hay phục hồi dữ liệu. Không chạy thử clean trên DB thật/dữ liệu cần giữ.

**Đáp án mẫu bằng lời:**

> flyway-core là thư viện của ứng dụng, không tự cấu hình Maven plugin. Chạy bằng Maven cần plugin và cấu hình tương ứng. CLI đã có thì phải cấp cấu hình riêng, không tự đọc application.yml như Boot. Trước khi chạy phải xác nhận đúng DB/schema/credential: migrate thay đổi DB đích, còn clean có thể xóa object và dữ liệu nên không dùng như nút sửa lỗi trên DB cần giữ.

**Cách nhớ:** Boot đọc cấu hình Boot; Maven chạy plugin; CLI đọc cấu hình của CLI. Cùng địa chỉ DB chỉ khi bạn cấu hình cho chúng cùng trỏ vào đó.

Đọc lại [bài phụ mục 9](../../Notes/M2_Database/M2_3_Flyway/README_HOC_BO_SUNG_LESSON_03.md) và phần công cụ trong [Lesson 03](../../Notes/M2_Database/M2_3_Flyway/LESSON_03_LOI_REPAIR_BASELINE_VA_CI.md). Không yêu cầu thực thi lệnh nguy hiểm để trả lời câu này.

## 4. Phác đồ ôn ngắn

Nguồn chung: [README học bổ sung Lesson 03](../../Notes/M2_Database/M2_3_Flyway/README_HOC_BO_SUNG_LESSON_03.md), thuộc checklist Flyway của [lộ trình](../../01_LO_TRINH.md).

- Chẩn đoán kết nối → mục 2 → 3 phút → viết lỗi gốc, DB đích và nguồn credential runtime.
- V1 gốc và repair → mục 3 → 2 phút → nói rõ khôi phục V1, thêm V2.
- Điều kiện bỏ cột → mục 7 → 3 phút → thêm điều kiện app/job hết dùng name.
- Kiểm CI → mục 8 → 2 phút → chốt loại PostgreSQL test.
- Công cụ chưa nắm → mục 9 và phần chữa câu 8 ở trên → 10 phút → tự phân biệt ba cách chạy và rủi ro clean, không cần cài CLI.

## 5. Quyết định

**Ôn thêm: 78,75/100, chưa đạt Lesson 03.** Không mở module kế tiếp hoặc tick checklist từ kết quả này. Không kết luận bạn yếu cả Flyway: câu 3–5 đầy đủ, câu 7 đúng gần hết; thiếu tập trung ở công cụ câu 8 và vài bước kiểm chứng.

## 6. Kế hoạch 3 ngày, nhẹ và đúng phần thiếu

1. Ngày 1 — 15 phút: đọc phần chữa câu 8 và mục 9 bài phụ; tự nói Boot/Maven/CLI lấy cấu hình thế nào, không chạy clean.
2. Ngày 2 — 10 phút: sửa rõ ba ý ở câu 1, 2, 6: lỗi gốc/nguồn credential; khôi phục V1 gốc; app/job hết dùng name.
3. Ngày 3 — 10 phút: bổ sung PostgreSQL test cho câu 7, tự trả lời câu 8 bằng lời rồi nộp chấm lại. Có thể hoàn thành sớm hơn; không bắt chờ đủ ba ngày.

Không cần làm lại câu 3–5 hoặc học lại cả module. Ngưỡng đạt của đề là 34/40; hiện thiếu 2,5 điểm so với ngưỡng, nhưng nên hiểu đủ phần an toàn công cụ thay vì chỉ học để bù điểm.

## 7. Tiến độ và lịch sử

- Lượt đầu: câu 2–5 đạt **17/20 = 85% phần đã làm**.
- Lượt tiếp: câu 1–6 đạt **25,5/30 = 85% phần đã làm**.
- Lượt trước: câu 1–7 đạt **31,5/35 = 90% phần đã làm**.
- Lượt này chấm toàn bài sau khi bạn ghi không biết câu 8: **3,5 + 4,5 + 5 + 5 + 5 + 4 + 4,5 + 0 = 31,5/40 = 78,75%**.
- Câu 1–7 giữ nguyên điểm vì bài làm không đổi. Mức giảm phần trăm chỉ do tính thêm câu 8 vào mẫu số.
- 05: giữ module đang học/Lesson 01 đã đạt, ghi Lesson 03 cần ôn, điểm toàn Lesson 03 và một log mới.
- 01: không sửa checklist/trạng thái module; không đánh đồng kết quả một lesson với điểm tổng module.
