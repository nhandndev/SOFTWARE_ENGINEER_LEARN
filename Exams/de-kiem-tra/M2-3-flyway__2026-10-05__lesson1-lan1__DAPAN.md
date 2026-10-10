# Đáp án M2-3 · Lesson 01

40đ; normalize /40 ×100. Chấp nhận lời/SQL tương đương. Không chấm lỗi gõ làm rõ được ý.

| Câu | Rubric 5 điểm |
|---|---|
| 1 | Entity mô tả model code cần (2); migration mô tả bước đổi schema (2); đồng bộ schema môi trường để code chạy (1). |
| 2 | V versioned (1), 2 phiên bản (1), hai underscore phân cách (1), description và sql mô tả/script (1); một underscore sai naming mặc định (1). |
| 3 | A chạy V3/V10 (2); B V1/V2/V3/V10 (2); phiên bản theo số, V3 trước V10 (1). |
| 4 | Vẫn trùng version 3 dù khác mô tả (2); thống nhất đổi file chưa phát hành sang version chưa dùng và kiểm phụ thuộc/thứ tự (2); version đã thành công không tự chạy lại khi restart (1). |
| 5 | Tạo V mới (2); DB cũ không tự chạy V1 lại (1); checksum có thể mismatch (1); tránh DB cũ/mới khác schema (1). |
| 6 | Phát hiện nội dung file khác lịch sử (2); không kiểm toàn schema/Entity (2); schema bị sửa tay có thể lệch (1). |
| 7 | Migration lúc startup/deploy (2); trước sẵn sàng/JPA phụ thuộc schema (1); HTTP sau đó qua các lớp và SQL nghiệp vụ, không migrate mọi GET (2). |
| 8 | Tên V2__add_description.sql hợp lệ (1); ALTER TABLE products ADD COLUMN description TEXT (2); dòng cũ chưa có giá trị, NOT NULL có thể thất bại (2). |

Đọc lại: câu 1/7 mục 1/7; 2–3 mục 3–5; 4 mục 3 (version conflict) và 5 (history); 5–6 mục 5–6; 8 mục 4. Điểm lesson đạt không tự làm toàn M2-3 đạt.

## Quy tắc chấm

Áp dụng [chấm nghiêm theo từng ý](../../Notes/M2_Database/QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md). Bảng trên giữ nguyên tổng 5đ/câu; các lưu ý dưới đây không cộng/trừ ngoài rubric. Đọc bài giải sau khi tự làm.

## Bài giải từng câu

### Câu 1 — Entity không phải lịch sử nâng cấp database

**Đáp án đủ ý:** Entity mô tả model Java và mapping mà ứng dụng hiện tại cần, chẳng hạn `description` ánh xạ sang cột tương ứng. Migration là script thay đổi schema có phiên bản, ví dụ thêm cột cho DB đã tồn tại. Áp dụng migration lên đúng môi trường giúp schema đáp ứng code mới. Chỉ thêm field Java không tự chứng minh DB deploy đã có cột; việc Hibernate có tạo/sửa schema hay không còn tùy cấu hình.

**Vì sao:** Code và database được phát hành, lưu trữ riêng. Flyway ghi lại bước đổi database, không thay vai trò Entity.

**Chấm nghiêm:** “Migration tạo bảng” chỉ mô tả một trường hợp, chưa đủ phần phân biệt với Entity và đồng bộ môi trường. Khẳng định thêm Entity là Flyway tự phát hiện/tự thêm cột không nhận điểm cơ chế migration.

### Câu 2 — Đọc đúng tên migration

**Đáp án đủ ý:** `V` là versioned migration; `2` là version; `__` là dấu phân cách mặc định gồm hai underscore; `add_description` là mô tả; `.sql` là phần mở rộng script SQL. `V2_add_description.sql` dùng một underscore nên không khớp naming mặc định.

**Vì sao:** Flyway dùng cấu trúc tên để nhận diện file, không suy đoán ý định từ câu tiếng Anh. Tùy cấu hình, file sai tên có thể bị bỏ qua hoặc bị báo lỗi naming; không khẳng định luôn fail nếu đề chưa bật kiểm tra nghiêm tên.

**Chấm nghiêm:** Nói “tên nào cũng được miễn có V2” mất điểm naming. Không bắt thuộc thông báo lỗi cụ thể.

### Câu 3 — Mỗi DB có lịch sử riêng

**Đáp án đủ ý:** DB A đã áp dụng V1/V2 nên chạy **V3 rồi V10**. DB B trống chạy **V1 → V2 → V3 → V10**. Phiên bản được so theo giá trị version, không sort chuỗi tên file theo kiểu V10 trước V3.

**Vì sao:** Pending migration phụ thuộc lịch sử của DB đang kết nối; không phụ thuộc máy lập trình viên đã chạy file hay chưa.

**Chấm nghiêm:** Chỉ viết “chạy những file chưa chạy” chưa đáp ứng danh sách/thứ tự đề hỏi. Chạy lại V1/V2 trên A là sai với dữ kiện file và history hợp lệ.

### Câu 4 — Khác mô tả vẫn trùng version

**Đáp án đủ ý:** Hai file đều version 3 nên vẫn xung đột. Vì chưa phát hành lên DB chung, nhóm thống nhất giữ một V3, đổi file còn lại sang version chưa dùng, ví dụ V4, và kiểm bước nào phụ thuộc bước nào trước khi chạy. Khi version đã áp dụng thành công và file không đổi, restart không tự thực thi lại SQL versioned đó.

**Vì sao:** Description không phải cách tạo hai migration cùng version. Đổi số cần giữ thứ tự nghiệp vụ, không chỉ làm tên khác nhau.

**Chấm nghiêm:** Đổi description mà giữ hai V3 không giải quyết lỗi. Đề chỉ cho phép xử lý file chưa phát hành; không suy rộng thành tùy tiện renumber migration đã dùng ở môi trường khác.

### Câu 5 — Thêm thay đổi mới, không viết lại quá khứ

**Đáp án đủ ý:** Tạo một V mới có version chưa dùng để thêm `description`; giữ V1 đã phát hành nguyên trạng. DB cũ không tự chạy lại V1 chỉ vì nội dung bị sửa; validation có thể báo checksum mismatch. Nếu bỏ qua lỗi và chỉ dùng V1 mới trên DB mới, DB cũ/mới có thể khác schema dù tên version giống nhau.

**Vì sao:** Migration đã áp dụng là hợp đồng lịch sử giữa repo và các môi trường.

**Chấm nghiêm:** “Sửa V1 cho nhanh rồi restart” không nhận điểm phương án. Chỉ nói checksum lỗi mà không giải thích DB cũ/mới mất các điểm hậu quả tương ứng.

### Câu 6 — Checksum không phải kiểm toàn schema

**Đáp án đủ ý:** Checksum khác cho thấy nội dung migration được resolve hiện tại không khớp checksum đã lưu khi áp dụng; cần điều tra file/history đúng DB. Flyway validate đối chiếu migration với history, không tự so tất cả cột DB với Entity. Một người ALTER thủ công có thể làm schema lệch dù file migration không đổi.

**Vì sao:** Lịch sử script và trạng thái schema thực tế là hai loại bằng chứng khác nhau. Hibernate schema validation cũng là bước khác, không phải tên khác của Flyway validate.

**Chấm nghiêm:** Viết “validate đảm bảo Entity và DB giống hoàn toàn” mất điểm giới hạn validate. Nêu checksum mismatch không đồng nghĩa chứng minh script đã chạy lại hay dữ liệu bị mất.

### Câu 7 — Startup khác request HTTP

**Đáp án đủ ý:** Trong setup Boot chuẩn, Flyway migrate ở giai đoạn khởi động trước khi app sẵn sàng phục vụ và trước JPA phụ thuộc schema được khởi tạo đầy đủ. Sau đó GET đi qua xử lý MVC → Controller → Service → Repository, thực hiện SQL đọc dữ liệu nghiệp vụ; không chạy lại toàn bộ migration mỗi GET.

**Vì sao:** Migrate chuẩn bị database cho phiên bản app; repository query phục vụ từng thao tác của người dùng. Không cần kể tên mọi lớp nội bộ MVC để có đủ điểm câu này.

**Chấm nghiêm:** Chỉ mô tả Controller/Service/Repository mà bỏ startup thiếu phần chính. Nói Repository gọi Flyway mỗi GET là sai cơ chế.

### Câu 8 — Thêm cột nhưng giữ dữ liệu cũ

**Đáp án đủ ý:** Trong tình huống riêng của câu này, tạo `V2__add_description.sql`:

```sql
ALTER TABLE products ADD COLUMN description TEXT;
```

Cột cho phép NULL, nên các dòng cũ chưa có mô tả vẫn hợp lệ. Nếu thêm NOT NULL ngay mà không có default/backfill phù hợp, dữ liệu cũ có NULL làm thao tác thất bại. Khi cần bắt buộc có mô tả, cần kế hoạch cấp giá trị hợp lệ rồi mới siết constraint.

**Chấm nghiêm:** Đúng tên nhưng không có SQL chỉ nhận điểm tên. Dùng NOT NULL không có cách xử lý dòng cũ sai yêu cầu nullable. Không bắt viết thêm backfill vì đề chỉ yêu cầu giải thích nguy cơ.
