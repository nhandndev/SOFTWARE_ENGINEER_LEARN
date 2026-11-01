# Chấm lại Flyway Lesson 03: câu 1–6

Ngày: **2026-10-30**. Đọc bản đã lưu mới nhất, chấm theo rubric hiện hành và ý nghĩa. Câu 7–8 còn trống, chưa chấm; không đưa vào mẫu số để kết luận trượt. Không trừ lỗi gõ hoặc câu phàn nàn cách hỏi.

## 0. Snapshot

- [Bài nộp lượt này](archive/M2-3-flyway__2026-10-05__lesson3-lan1__2026-10-30__BAI_NOP_CHAM_TAM_2.md).
- [Nhận xét trước](archive/M2-3-flyway__2026-10-05__lesson3-lan1__2026-10-30__NHANXET_TRUOC_CHAM_LAI_2.md): câu 2–5 đạt 17/20 =85% phần đã làm.
- Snapshot này là kết quả mới nhất, không cộng hai lần chấm hoặc đổi bài nộp.

## 1. Điểm tổng và nhóm

**25,5/30 =85/100 trên sáu câu đã làm.** Đây không phải điểm toàn Lesson 03; chưa đủ bài để chốt lesson/module.

| Nhóm đã làm | Điểm | Mức |
|---|---:|---|
| Chẩn đoán kết nối (1) | 2/5 =40% | Cần học lại bước kiểm |
| Repair và baseline (2,4) | 9,5/10 =95% | Đạt phần được hỏi |
| Rollback và recovery (3,5) | 10/10 =100% | Đạt phần được hỏi |
| Chuyển schema tương thích (6) | 4/5 =80% | Cần bổ sung điều kiện bỏ cột |
| CI/công cụ (7,8) | Chưa đánh giá | Chưa có bài trả lời |

## 2. Bảng từng câu

| Câu | Đúng/Sai/Thiếu | Điểm | Nhận xét |
|---|---|---:|---|
| 1 | Đúng phương án, thiếu kiểm đúng loại lỗi | 2/5 | Sửa credential đúng; code/SQL/file migration không thay ba kiểm tra lỗi gốc, DB đích, nguồn credential runtime. |
| 2 | Cải thiện, bước xử lý V1 gốc chưa rõ | 4,5/5 | Repair không thêm cột, có đối chiếu; ý V1 gốc/thay đổi mới đúng hướng nhưng chưa nói rõ khôi phục nội dung V1 đã chạy. |
| 3 | Đúng | 5/5 | Giữ điểm: lỗi CHECK, rollback V2, V1 còn, không suy rộng SQL không transactional. |
| 4 | Đã sửa đúng | 5/5 | Đã nói DB được xác minh trước, baseline đặt mốc, không tự kiểm schema, V2 tiếp tục. |
| 5 | Đúng theo ý nghĩa | 5/5 | Giữ điểm: cấu trúc không tự phục hồi giá trị, repair/history, backup/restore. |
| 6 | Đúng phần chính, thiếu điều kiện bỏ name | 4/5 | Có expand/backfill/đồng bộ hoặc tạm dừng; chưa nói app/job cũ phải hết phụ thuộc cột cũ. |
| 7–8 | Chưa trả lời | Chưa chấm | Không tính thành 0 ở lượt chấm từng phần. |

## 3. Từng câu: bằng chứng, điểm và chữa

### Câu 1 — 2/5

| Tiêu chí | Điểm | Đánh giá |
|---|---:|---|
| Sửa credential/config thay vì repair | 2/2 | Bạn nói rõ liên quan cấu hình vào DB |
| Xem lỗi gốc | 0/1 | Chưa nêu đọc thông báo authentication/connection cụ thể |
| Kiểm URL/DB đích | 0/1 | Chưa nêu URL/host/port/database |
| Kiểm nguồn user/password/profile runtime | 0/1 | Chưa nêu credential thực sự đang được dùng lấy từ đâu |

Không trừ vì ngắn: ba mục bạn viết “code đúng không, SQL đúng không, migration có không” là kiểm phần khác, chưa chứng minh ba ý được hỏi theo tình huống password sai.

Sửa đủ bằng câu ngắn: “Sửa credential. Kiểm lỗi gốc, URL/DB đích và user/password thực tế lấy từ env/profile/secret nào.” Không in password vào log. DB chưa cho đăng nhập thì kiểm SQL migration không phải bước chữa lỗi authentication.

Đọc [bài phụ mục 2](../../Notes/M2_Database/M2_3_Flyway/README_HOC_BO_SUNG_LESSON_03.md).

### Câu 2 — 4,5/5

- Repair không thêm description, chỉ xử lý metadata: **2/2**.
- Đối chiếu file đã phát hành/history/schema thật: **1/1**.
- Thay đổi mới bằng migration mới: **1/1**, nhận ý “bổ sung thay đổi mới” theo ngữ cảnh.
- Khôi phục V1 đúng nội dung đã áp dụng: **0,5/1**. Bạn có “phương án V1 gốc” nhưng chưa nói rõ hành động giữ/khôi phục file; phần trước lại tập trung đưa checksum match bằng repair. Nhận một phần, không coi hoàn toàn thiếu như lần trước, cũng không tự điền quy trình giúp bạn.

Bổ sung: **“Khôi phục V1 về bản gốc đã chạy; thay đổi mới đưa vào V2.”** Khi đã khôi phục file đúng, không mặc định còn phải repair. Câu bạn nói chỉ dùng repair sau khi kiểm chắc chắn không sai về nguyên tắc, nhưng không thay cho phương án sửa file V1 trong tình huống cụ thể này.

Đọc bài phụ mục 3; [Repair](https://documentation.red-gate.com/flyway/reference/commands/repair).

### Câu 3 — 5/5

Giữ cách chấm theo ý nghĩa: lỗi CHECK thêm sau khi stock đã=-1 **1đ**; V2 rollback gồm cột/UPDATE **2đ**; V1 còn **1đ**; không suy rộng cho SQL không transactional **1đ**. Không bắt đánh số lại dòng SQL khi giải thích đã rõ.

### Câu 4 — 5/5

Đã sửa đủ:

- DB cũ được xác minh tương đương V1 trước: **1đ**.
- Ghi baseline/mốc V1 trong history: **1đ**.
- Không chạy SQL V1: **1đ**, nhận ý “mặc định đã có V1/đã confirm” theo ngữ cảnh đặt baseline.
- Không tự kiểm toàn schema: **1đ**, bạn nói trực tiếp.
- V2 pending để migrate: **1đ**.

Không bắt dùng từ marker. Chỉnh nhỏ không trừ: không chỉ production mới dùng baseline; nó dành cho DB có sẵn cần bắt đầu quản lý theo mốc thích hợp. [Baseline](https://documentation.red-gate.com/flyway/reference/commands/baseline).

### Câu 5 — 5/5

Giữ điểm: không tự lấy lại giá trị cũ **2đ**, migration mới sửa cấu trúc/dữ liệu theo SQL **1đ**, repair history **1đ**, backup/restore **1đ**. Câu mở đầu “không khôi phục cột” được hiểu qua đoạn giải thích sau là không tự phục hồi dữ liệu gốc, không cố bắt lỗi câu chữ.

### Câu 6 — 4/5

| Tiêu chí | Điểm | Bạn đã thể hiện |
|---|---:|---|
| Expand thêm title, giữ name giai đoạn chuyển tiếp | 1/1 | Tạo cột mới, chưa bỏ cột cũ ngay |
| Backfill từ name sang title | 1/1 | Nêu rõ chuyển NULL thành giá trị name |
| Kiểm soát ghi/chuyển dữ liệu | 1/1 | Nêu tạm dừng thao tác liên quan, đồng bộ cuối hoặc đồng bộ liên tục |
| Chỉ bỏ name khi app cũ hết phụ thuộc và dữ liệu đúng | 1/2 | Có đồng bộ dữ liệu nhưng chưa nói app/job cũ phải ngừng dùng name |

Bạn **không sai cách nghĩ expand/backfill**. Điều còn thiếu không phải một công nghệ bí mật hoặc code class chưa cho: đề đã nói app cũ còn đọc/ghi name. Đồng bộ dữ liệu cuối rồi xóa name trong khi app cũ vẫn chạy thì request/job sau đó vẫn có thể lỗi.

Chỉ cần thêm: **“Chuyển hết app/job sang code không còn cần name, kiểm dữ liệu và ghi mới đúng rồi mới bỏ name.”** Nếu chọn cửa sổ tạm dừng, phải chuyển writer/reader phù hợp trước khi mở lại, không mở lại app cũ vẫn query name.

Tên gọi “query” trong lời bạn được hiểu theo ngữ cảnh là các thao tác DB liên quan; không trừ vì chưa dùng từ writer. Không bắt trigger, zero-downtime hoặc xử lý name NOT NULL thành tiêu chí điểm mới ngoài rubric; nhưng lưu ý code mới chỉ ghi title khi name còn NOT NULL có thể INSERT lỗi.

Đọc bài phụ mục 7, Lesson 03 gốc mục 6.

## 4. Phác đồ ôn phần còn thiếu

- Chẩn đoán password sai → bài phụ mục 2 → 3 phút → viết đúng ba nhóm kiểm thay vì code/SQL/migration.
- Sửa V1 gốc → bài phụ mục 3 → 2 phút → nêu rõ khôi phục V1, thêm V2.
- Điều kiện bỏ cột → bài phụ mục 7 → 4 phút → nói khi nào app cũ/job cũ hết dùng name.
- Câu chưa làm → bài phụ mục 8–9 → 10 phút → viết kế hoạch CI và phân biệt Maven/CLI/Boot.

## 5. Quyết định và kế hoạch

**Đạt ngưỡng trên phần đã làm, chưa chốt Lesson 03.** Cần hoàn thành câu 7/8 và chỉnh ba ý thiếu trên. Không mở module mới hoặc tick checklist dựa trên điểm tạm.

Không yêu cầu học lại cả module 3–5 ngày từ bài từng phần. Dành khoảng 19 phút cho các mục trên; không bắt làm đề phụ để thay điểm chính hoặc lấy 100.

## 6. Tiến độ và lịch sử

- Lượt trước: câu 2–5 đạt **17/20 =85% phần đã làm**.
- Lượt này: **2 + 4,5 + 5 + 5 + 5 + 4 =25,5/30 =85% phần đã làm**. Mẫu số tăng vì có thêm câu 1 và 6, nên cùng phần trăm không có nghĩa bạn không tiến bộ.
- Câu 2 tăng từ 4 lên 4,5; câu 4 tăng từ 3 lên 5. Câu 1 mới còn thiếu chẩn đoán; câu 6 mới thiếu điều kiện bỏ cột.
- 05: giữ M2-3 đang học/Lesson 01 đã đạt, cập nhật điểm tạm câu 1–6 và một log ngày 2026-10-30.
- 01: không sửa checklist/trạng thái module. Bài làm, đề và bài giải không sửa.
