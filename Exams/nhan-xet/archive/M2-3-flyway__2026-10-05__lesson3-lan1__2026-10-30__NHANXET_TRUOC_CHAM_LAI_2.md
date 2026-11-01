# Chấm tạm M2-3 Flyway Lesson 03: câu 2–5

Ngày: **2026-10-30**. Chấm đúng bài đã lưu, theo rubric hiện hành. Đã trả lời câu 2, 3, 4, 5; câu 1, 6, 7, 8 còn trống. Không sửa câu trả lời, không trừ lỗi gõ.

## 0. Snapshot

[Bản bài nộp tại thời điểm chấm](archive/M2-3-flyway__2026-10-05__lesson3-lan1__2026-10-30__BAI_NOP_CHAM_TAM.md). Đây là lượt chấm tạm đầu của đề này, không thay điểm Lesson 01 và không xác nhận lab ở folder khác.

## 1. Điểm tổng và nhóm kiến thức

**17/20 = 85/100 trên bốn câu đã làm.** Không phải 85 điểm cả lesson. Chưa có đủ bài để kết luận Lesson 03 đạt; không tính bốn câu trống thành 0 để kết luận trượt.

| Nhóm đã có câu trả lời | Điểm | Mức |
|---|---:|---|
| History: repair/baseline (2, 4) | 7/10 = 70% | Cần ôn |
| Transaction migration (3) | 5/5 = 100% | Đạt phần được hỏi |
| Forward fix và dữ liệu mất (5) | 5/5 = 100% | Đạt phần được hỏi |
| Kết nối, rollout, CI, công cụ (1, 6–8) | Chưa đánh giá | Chưa có câu trả lời, không kết luận không biết |

## 2. Bảng từng câu

| Câu | Đúng/Sai/Thiếu | Điểm | Nhận xét |
|---|---|---:|---|
| 1 | Chưa trả lời | Chưa chấm | Bài phụ dạy cách phân loại lỗi kết nối và kiểm credential. |
| 2 | Đúng phần chính, thiếu phục hồi V1 gốc | 4/5 | Repair không thêm cột, kiểm file/history/schema, V mới đúng; chưa nói trả V1 về nội dung đã áp dụng. |
| 3 | Đúng theo ngữ cảnh | 5/5 | CHECK thêm sau UPDATE gây lỗi; chỉ V2 rollback, V1 còn; không suy rộng cho SQL không transactional. |
| 4 | Sai ý baseline tự kiểm schema | 3/5 | Đúng mốc V1/không chạy V1/V2 tiếp tục; sai việc tự kiểm, thiếu trách nhiệm xác minh trước đặt mốc. |
| 5 | Đúng theo ý nghĩa | 5/5 | Thêm lại cấu trúc không tự có dữ liệu cũ; phân biệt migration mới, history, backup/restore. |
| 6 | Chưa trả lời | Chưa chấm | Bài phụ có ví dụ chuyển name→title giữ tương thích. |
| 7 | Chưa trả lời | Chưa chấm | Bài phụ có hai đường CI và dữ liệu trước/sau. |
| 8 | Chưa trả lời | Chưa chấm | Bài phụ tách Boot/Maven/CLI và rủi ro clean. |

## 3. Chữa phần đã trả lời

### Câu 2 — 4/5

| Tiêu chí rubric | Bạn đã viết | Điểm |
|---|---|---:|
| Repair không thực thi SQL thêm cột | Nói rõ chỉ đổi history, không thêm description | 2/2 |
| Khôi phục file V1 đã phát hành | Chưa có bước này | 0/1 |
| Thay đổi mới dùng V mới | Đã nói nếu phát hành thì tạo version mới; đúng với V1 đã chạy DB chung của đề | 1/1 |
| Kiểm diff/file đã phát hành, history, schema | Đã nêu ba nhóm cần đối chiếu | 1/1 |

Bạn viết “cần lệnh repair” và “nếu chưa phát hành thì sửa SQL rồi repair lại”. Đây là chỗ cần sửa, **không trừ thêm ngoài rubric**: repair không bắt buộc chỉ vì sửa file, và dữ kiện đề là V1 gốc đã được áp dụng trên DB chung. “File V1 sửa chưa được phát hành” không có nghĩa V1 gốc là file chưa từng chạy.

Hướng thông thường trong chính đề: kiểm file/history/schema → khôi phục V1 đúng nội dung đã áp dụng → viết V2 ALTER thêm description → kiểm trên DB phù hợp. Chỉ thêm V2 mà để V1 vẫn mismatch thì chưa giải quyết nguyên nhân validate lỗi. Không mặc định repair để hợp thức hóa file đã sửa.

Đọc bài phụ mục 3; Lesson 03 gốc mục 4. [Repair](https://documentation.red-gate.com/flyway/reference/commands/repair).

### Câu 3 — 5/5

- Lệnh thứ ba thêm CHECK thất bại do stock=-1: **1/1**. Không cần đánh số lệnh khi phần giải thích đã chỉ đúng CHECK sau giá trị -1.
- Cột stock và UPDATE V2 bị rollback: **2/2**. “Về lúc chưa có V2 mà chỉ có V1” đủ thể hiện phạm vi; không bắt liệt kê lại từng object.
- V1 đã commit vẫn còn: **1/1**.
- Không suy rộng cho SQL không transactional: **1/1**.

Lưu ý không trừ: ở đây PostgreSQL hỗ trợ transaction cho ba lệnh và đề cho cả V2 cùng transaction. Không phải cứ viết BEGIN là biến mọi lệnh vốn không hỗ trợ transaction thành có thể rollback. Bạn đã chọn đúng giới hạn nên nhận đủ.

### Câu 4 — 3/5

| Tiêu chí rubric | Điểm | Giải thích |
|---|---:|---|
| Ghi mốc baseline 1 trong history | 1/1 | “Gắn ... làm Baseline” đúng ý |
| Không chạy SQL V1 | 1/1 | Đã nêu |
| Baseline không tự chứng minh schema đúng | 0/1 | Bạn viết “và tự kiểm toàn schema”, ngược cơ chế |
| V2 tiếp tục migrate | 1/1 | Đã nêu |
| Phải xác minh schema trước baseline | 0/1 | Chưa nêu người/quy trình kiểm trước; đang gán việc kiểm cho baseline |

Hai điểm mất là hai ý rubric độc lập: **lệnh baseline làm gì** và **trách nhiệm kiểm schema nằm ở đâu**. Không có điểm phạt thêm.

Sửa thành: “Người vận hành đã xác minh DB cũ tương đương V1; baseline ghi mốc 1, không chạy V1 và không tự kiểm toàn schema; migrate tiếp V2.” Lệnh không đối chiếu từng bảng/cột để xác minh giúp bạn.

Đọc bài phụ mục 5; Lesson 03 gốc mục 5. [Baseline](https://documentation.red-gate.com/flyway/reference/commands/baseline).

### Câu 5 — 5/5

Nhận phần giải thích rõ phía sau để hiểu câu mở đầu “không khôi phục lại cột” là **không khôi phục giá trị cũ**, không cố đọc thành bạn phủ nhận có thể thêm lại cột.

- Không tự khôi phục giá trị sau DROP đã commit: **2/2**.
- Migration mới thêm cấu trúc/có thể sửa dữ liệu theo SQL được viết: **1/1**.
- Repair sửa history: **1/1**.
- Backup là nguồn phục hồi, restore là thao tác khôi phục: **1/1**.

Ghi chú không trừ: UPDATE backfill tùy ý không thay thế việc lấy lại **giá trị gốc đúng**. Nếu không còn nguồn gốc/backup/recovery thích hợp thì không hứa lấy lại được. Không nên restore đè production theo phản xạ làm mất các ghi mới; thường cần phục hồi ở nơi cô lập rồi chọn cách đối chiếu.

## 4. Bài phụ và phần chưa làm

[README học bổ sung Lesson 03](../../Notes/M2_Database/M2_3_Flyway/README_HOC_BO_SUNG_LESSON_03.md) bao gồm:

- Câu 2: V1 gốc khác bản V1 đã sửa; khi nào không cần repair.
- Câu 4: baseline marker khác xác minh schema.
- Câu 1, 6, 7, 8: học mới/củng cố để trả lời; không gắn nhãn sai khi bạn chưa viết.
- Câu 3, 5: giữ phần bạn đã đúng và bổ sung giới hạn để không áp dụng sai.

## 5. Phác đồ học lại

- Repair và lịch sử V1 → bài phụ mục 3 → 8 phút → kể kế hoạch giữ V1 gốc, thêm V2.
- Baseline → bài phụ mục 5 → 7 phút → nói ai xác minh schema và baseline ghi gì.
- Kết nối/công cụ → mục 2, 9 → 10 phút → phân biệt credential sai với checksum sai và ba cách chạy Flyway.
- Rollout/CI → mục 7–8 → 15 phút → chọn phương án ngừng ghi có kiểm soát, thiết kế hai đường kiểm upgrade.

## 6. Quyết định và kế hoạch

**Đạt ngưỡng trên phần đã trả lời; cần ôn hai điểm và hoàn thành bốn câu còn lại. Chưa chốt Lesson 03/module.** Lesson 01 90 điểm vẫn được giữ; không suy Lesson 02 đạt vì đã đọc hoặc báo xong lab.

Không giao kế hoạch học lại cả module 3–5 ngày từ kết quả tạm này. Buổi 1 khoảng 20 phút sửa câu 2/4 và trả lời câu 1/8. Buổi 2 khoảng 20 phút học rollout/CI rồi trả lời câu 6/7. Đề ôn bổ sung trong README là tùy chọn, không thay điểm đề chính nếu chưa được yêu cầu chấm.

## 7. Tiến độ

- Điểm gần nhất: **85 (tạm L03 câu 2–5)**, ngày 2026-10-30; giữ M2-3 đang học, thêm một log.
- Không tick thêm checklist 01_LO_TRINH.md vì bài chưa đủ và ý forward-only/repair còn cần sửa.
- Bảo toàn bài làm. Snapshot này lưu kết quả theo phiên bản rubric đã có; không đổi đề để hợp thức hóa điểm.
