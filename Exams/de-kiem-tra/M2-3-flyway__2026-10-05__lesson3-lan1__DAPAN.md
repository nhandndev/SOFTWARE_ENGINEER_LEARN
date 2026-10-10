# Đáp án M2-3 · Lesson 03

40đ; normalize /40 ×100. Chấp nhận kế hoạch hợp lý tương đương.

| Câu | Rubric 5 điểm |
|---|---|
| 1 | Sửa kết nối/credential, không repair (2); lỗi gốc (1), DB URL đích (1), nguồn user/password/profile (1). |
| 2 | Repair không thực thi SQL thêm cột (2); phục hồi file đã phát hành (1); thêm V mới (1); kiểm diff/schema/history trước xử lý (1). |
| 3 | CHECK ở lệnh 3 lỗi do stock=-1 (1); cột stock và UPDATE thuộc V2 rollback (2); dữ liệu V1 còn (1); không suy rộng cho SQL không transactional, có thể chạy dở (1). |
| 4 | Ghi mốc lịch sử (1); không chạy V1 (1); không chứng minh schema đúng (1); V2 tiếp tục migrate (1); xác minh schema trước baseline (1). |
| 5 | Không tự lấy lại dữ liệu (2); forward fix đổi schema bằng V mới (1); repair chỉ history (1); backup/restore hoặc recovery cho dữ liệu mất (1). |
| 6 | Thêm title giữ name (1); backfill (1); xử lý đồng bộ ghi/chuyển code (1); chỉ bỏ name khi app cũ hết và dữ liệu đúng (2). |
| 7 | PostgreSQL test phù hợp deploy (1); DB trống migrate/validate (1); DB cũ có dữ liệu migrate (1); kiểm dữ liệu/constraint/app (1); lỗi làm CI fail (1). |
| 8 | Maven cần plugin/cấu hình (1); CLI cần cài/cấu hình riêng (1); không tự đọc application.yml (1); đúng URL/schema/credential (1); clean xóa object, không dùng cho dữ liệu cần giữ (1). |

Đọc lại: 1/8 mục 2; 2 mục 4; 3 mục 3; 4 mục 5; 5 mục 1/6/7; 6 mục 6; 7 mục 8. Câu 7 chỉ yêu cầu kế hoạch, không đòi GitHub Actions syntax chưa học.

## Quy tắc chấm

Áp dụng [chấm nghiêm theo từng ý](../../Notes/M2_Database/QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md). Không cộng điểm cho lệnh nguy hiểm chỉ vì thuộc cú pháp; cần đúng phạm vi và mục đích.

## Bài giải từng câu

### Câu 1 — Chữa nguyên nhân kết nối

**Đáp án đủ ý:** Sửa credential/kết nối, không chọn repair. Kiểm lỗi gốc có đúng authentication fail không; kiểm URL/DB đích; kiểm user/password lấy từ profile/env/secret nào. Không in password vào log. Repair không sửa password và bản thân cũng cần kết nối được DB.

**Chấm nghiêm:** “Restart/repair thử” không phải chẩn đoán. Phải phân biệt thất bại kết nối với sai history; điểm kiểm tra bằng chứng tách khỏi điểm chọn giải pháp.

### Câu 2 — Repair không thêm description

**Đáp án đủ ý:** Repair thao tác metadata/history, không thực thi phần SQL mới để thêm cột description. Cách thông thường: so diff file với bản đã phát hành, kiểm history/schema đúng DB, khôi phục V1 đã dùng, tạo V mới thêm cột, rồi validate/migrate theo quy trình. Không dùng repair để che việc file và schema đã lệch mà chưa hiểu nguyên nhân.

**Chấm nghiêm:** Chỉ nói “repair sửa checksum” mà kết luận DB có cột mới là sai. Đề hỏi cách xử lý thông thường; không bắt liệt kê mọi trường hợp repair hợp lệ khác.

### Câu 3 — Rollback chỉ trong phạm vi transaction

**Đáp án đủ ý:** Lệnh thứ ba thêm CHECK thất bại vì dòng đã bị UPDATE stock=-1, trái `stock >= 0`. Theo giả định toàn V2 chạy trong một transaction PostgreSQL, ALTER thêm stock và UPDATE của V2 rollback: cột stock không còn. V1 đã commit ở transaction trước nên bảng/dòng cũ của V1 còn. Không suy ra SQL không transactional hoặc công cụ chạy từng lệnh autocommit cũng rollback nguyên vẹn như vậy.

**Chấm nghiêm:** Nói rollback xóa cả V1 sai phạm vi. Nói lỗi ngay tại UPDATE vì stock âm cũng sai: CHECK chưa có ở lệnh thứ hai. Phải dùng giả định transaction của đề, không trả lời chung “tùy”.

### Câu 4 — Baseline là ghi mốc, không dựng lại schema

**Đáp án đủ ý:** Sau khi xác minh DB cũ phù hợp V1, baseline version 1 ghi mốc vào history để quản lý các thay đổi tiếp theo. Nó không chạy SQL V1 và không tự chứng minh mọi bảng/cột đúng. Khi migrate, V2 cao hơn mốc baseline tiếp tục được áp dụng. Xác minh schema là trách nhiệm trước khi đặt mốc.

**Chấm nghiêm:** “Baseline chạy V1 tạo bảng” sai. “Có baseline là DB chắc chắn đúng” mất điểm kiểm chứng. Đề không yêu cầu bật baseline-on-migrate đại trà.

### Câu 5 — Thêm lại cột không lấy lại giá trị bị mất

**Đáp án đủ ý:** Không. Migration mới thêm lại cột chỉ phục hồi cấu trúc theo SQL viết ra, không tự lấy lại nội dung đã bị xóa và commit. Forward fix là bước schema mới có version; repair chỉnh history chứ không phục hồi dữ liệu; giá trị mất cần backup/restore hoặc cơ chế recovery phù hợp đã có trước đó, có thể phục hồi ra DB riêng rồi đối chiếu dữ liệu.

**Chấm nghiêm:** Đề đã nói commit, nên “rollback transaction vừa rồi” không giải quyết. Không khẳng định có thể recover chắc chắn nếu không có nguồn phục hồi. Không cần trình bày thao tác DBA chi tiết.

### Câu 6 — Expand → migrate → contract

**Đáp án đủ ý:** (1) Thêm title, giữ name để app cũ vẫn chạy. (2) Backfill title từ name và kiểm các dòng được chuyển. (3) Triển khai code tương thích, có kế hoạch đồng bộ ghi trong thời gian hai phiên bản cùng chạy; chỉ backfill một lần không xử lý các ghi mới từ app cũ. (4) Khi app cũ không còn và dữ liệu/luồng đọc ghi đã kiểm đúng, mới bỏ name trong migration sau.

**Chấm nghiêm:** “Add title → copy → drop name ngay” thiếu thời gian tương thích. Nêu dual-write là một cách, không bắt đúng từ đó, nhưng phải giải quyết dữ liệu phát sinh trong giai đoạn chuyển tiếp.

### Câu 7 — Hai đường nâng cấp phải đều được kiểm

**Đáp án đủ ý:** Dùng PostgreSQL test cô lập phù hợp môi trường deploy. Nhánh A từ DB trống chạy toàn migration và validate. Nhánh B dựng schema version cũ, thêm dữ liệu đại diện, chạy migration mới. Kiểm schema/constraint/mapping và dữ liệu cũ còn đúng, chẳng hạn id/SKU/price còn nguyên, field mới được backfill đúng. Một bước lỗi làm CI fail, không tiếp tục công bố migration hợp lệ.

**Chấm nghiêm:** Chỉ kiểm DB trống thiếu đường upgrade dữ liệu cũ. Chỉ kiểm app start mà không kiểm dữ liệu không đủ điểm dữ liệu. Đề yêu cầu kế hoạch, không đòi tự viết pipeline/JUnit/Testcontainers.

### Câu 8 — Ba môi trường chạy Flyway không tự chia sẻ cấu hình

**Đáp án đủ ý:** Dependency flyway-core cho ứng dụng không tự cài/cấu hình Maven plugin `flyway:migrate`; cách Maven cần plugin và cấu hình tương ứng. CLI cần được cài và cấp cấu hình riêng, không tự hiểu application.yml như Boot. Với cả hai phải kiểm URL/schema/credential đúng đích. `clean` xóa database objects thuộc phạm vi nó quản lý, nên không dùng như nút sửa lỗi trên dữ liệu cần giữ.

**Chấm nghiêm:** “Có dependency là mọi lệnh chạy được” sai điều kiện. “Clean rồi migrate là giữ nguyên dữ liệu” sai nghiêm trọng; vẫn chấm các ý độc lập đúng, không tự thêm hình phạt ngoài rubric.
