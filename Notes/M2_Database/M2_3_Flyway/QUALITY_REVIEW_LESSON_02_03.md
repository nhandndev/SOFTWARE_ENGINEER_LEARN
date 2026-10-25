# Rà riêng Lesson 02–03 Flyway

Ngày: **2026-10-23**, lượt rà sau yêu cầu “lesson 2-3 kiểm tra chất lượng”. Đây là kiểm bài học/đề/rubric, không chấm lại Lesson 01 hoặc đổi điểm người học.

## 1. Kết quả theo từng việc

| Task | Kết luận | Hành động |
|---|---|---|
| 1: Lesson 02 — cơ chế | Boot/Flyway/JPA, V/R và seed đúng ở phạm vi đã nêu | Giữ nội dung chính; thêm điều kiện checksum không đổi, thứ tự nhiều R |
| 2: Lesson 02 — dễ hiểu | Vẫn thiếu đường đọc xuyên bài và tách config chọn script/DB/quyền | Thêm câu chuyện, sơ đồ ba nguồn cấu hình và bảng tóm tắt |
| 3: Lesson 02 — đề/rubric | Đề hỏi property mà YAML chỉ nằm trong lesson; câu 3 bỏ ngầm giả định validate | Đưa YAML vào đề; cấp giả định rõ và hỏi đủ ý đang có điểm |
| 4: Lesson 03 — cơ chế | Transaction, repair, baseline và hai đường CI đúng theo điều kiện | Giữ ví dụ SQL và bảng trace, không đổi thành hướng dẫn production |
| 5: Lesson 03 — tính thực tế | Ví dụ name→title còn thiếu xung đột ghi khi name NOT NULL; “đồng bộ” còn mơ hồ | Giải thích app mới chỉ ghi title có thể lỗi; cần xử lý mọi writer, chấp nhận cửa sổ ngừng ghi |
| 6: Lesson 03 — đề/rubric | Câu 2 có tiêu chí kiểm diff/schema/history nhưng câu hỏi chỉ nói “cách thông thường” | Hỏi rõ bằng chứng đó trong đề; cấp điều kiện file sửa chưa phát hành ở nơi khác |
| 7: Kiểm cấu trúc | Mỗi bài có đề, bài giải, 8 câu ×5đ, nội dung có nơi đọc lại | Kiểm script riêng; không tạo điểm/thay trạng thái từ QA |

**Kết luận:** đủ để tiếp tục học tuần tự sau các sửa này; không cần viết lại trắng cả hai bài hoặc thêm lesson mới. Không tuyên bố bài hoàn hảo hay đã được kiểm định bằng runtime/thực nghiệm người học.

## 2. Những lỗi áp dụng đã chủ động ngăn

- Nhầm R là “restart luôn chạy”: điều kiện là checksum thay đổi, không đơn thuần tên R.
- Đặt Category seed và Product seed vào nhiều R rồi dựa thứ tự tạo file: R không có version; kiểm thứ tự description hoặc giữ phụ thuộc trong cùng script.
- Dùng profile dev như hàng rào bảo vệ prod: phải kiểm DB đích, locations, config/credential runtime.
- Coi DO NOTHING là đồng bộ giá mới: SQL có thể chạy lại mà dòng conflict không đổi.
- Dùng repair thay ALTER hoặc baseline thay kiểm schema: hai thao tác metadata không thực thi thay đổi nghiệp vụ mong muốn.
- Backfill title một lần rồi drop name khi app cũ còn ghi: dữ liệu phát sinh có thể lệch, và name NOT NULL vẫn ràng buộc code mới.
- Cài mới trên DB trống được rồi kết luận upgrade an toàn: phải kiểm DB cũ có dữ liệu và giữ các giá trị cũ.

## 3. Đối chiếu từng câu với nơi đã dạy

| Lesson 02 | Nguồn trong lesson | Đủ dữ kiện ở đề? |
|---|---|---|
| C1 startup/roles | Mục 1–3 | Có dependencies, YAML và giả định kết nối |
| C2 properties | Mục 3 | YAML đã nằm ngay trong đề |
| C3 startup validation | Mục 3 | Có ddl-auto validate, Entity thiếu cột, hỏi trước/sau ready |
| C4 thứ tự V/R | Mục 4/7 | File đã chạy, checksum giữ nguyên hoặc đổi được nói rõ |
| C5 lựa chọn V/R | Mục 4 | Thêm stock/thay view; không bắt cú pháp VIEW chi tiết |
| C6 locations | Mục 5 | DB riêng, hai đường dẫn và mục đích được cho sẵn |
| C7 seed/FK | Mục 6 | Có schema, Category id 42, SQL và SKU chưa tồn tại |
| C8 dev trỏ prod | Mục 5 | Hỏi rõ ba nhóm cần kiểm, không bắt lộ secret |

| Lesson 03 | Nguồn trong lesson | Đủ dữ kiện ở đề? |
|---|---|---|
| C1 password | Mục 2 | Có loại lỗi và hỏi đủ ba bằng chứng |
| C2 mismatch/repair | Mục 4 | Có DB cũ, file sửa chưa phát hành, hỏi rõ đối chiếu trước sửa |
| C3 SQL rollback | Mục 3 | Có dòng cũ, ba lệnh, toàn V2 cùng transaction |
| C4 baseline | Mục 5 | DB cũ đã xác minh ở V1; không cần đoán schema |
| C5 dữ liệu mất | Mục 1/6/7 | Đã commit, hỏi giới hạn phục hồi chứ không bắt thao tác DBA |
| C6 tương thích | Mục 6 | name NOT NULL, app cũ ghi name, cho phép phương án ngừng ghi có kiểm soát |
| C7 CI | Mục 8 | Hai nhánh được nêu, chỉ cần kế hoạch không YAML |
| C8 CLI/Maven | Mục 2/7 | Hai cách gọi và nhu cầu DB đích rõ; không bắt syntax config |

Các rubric vẫn tổng 5đ/câu. Câu 6 Lesson 03 làm rõ các phương án hợp lệ cho tiêu chí kiểm soát ghi, không thêm tiêu chí điểm thứ sáu. Câu 3 Lesson 02 và câu 2 Lesson 03 chỉ đưa yêu cầu đã có điểm ra câu hỏi cho minh bạch.

## 4. Nguồn kỹ thuật đã mở lại

- [Boot database initialization](https://docs.spring.io/spring-boot/how-to/data-initialization.html): starter/module, startup, locations, basic SQL initialization.
- [Repeatable migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/repeatable-migrations): checksum, pending V trước R, thứ tự R theo description.
- [Repair](https://documentation.red-gate.com/flyway/reference/commands/repair): sửa history, không tự cleanup mọi object.
- [Baseline](https://documentation.red-gate.com/flyway/reference/commands/baseline): ghi marker và bỏ qua các version tới mốc.
- [Transaction handling](https://documentation.red-gate.com/fd/migration-transaction-handling-273973399.html): từng migration transactional, điều kiện rollback và ngoại lệ.

Ví dụ chuyển name/title là phân tích từ schema/luồng ghi đã nêu, không phải Flyway tự đồng bộ field giữa app cũ/mới.

## 5. Kiểm được gì, chưa kiểm được gì?

Đã review tĩnh riêng hai bài, đọc đề và đáp án, kiểm liên kết/fence/số câu/chỗ trả lời/rubric. Không có psql/postgres/initdb trên PATH. Có Docker CLI nhưng lệnh kiểm daemon bị từ chối quyền truy cập socket trong sandbox; **lượt này không chạy DB, Flyway, Boot hoặc CI thật**. Không lặp lại báo cáo test SQL cũ như thể là test mới.

Không tạo dependency/runtime project mới để làm đẹp báo cáo. Các lệnh SQL trong bài là ví dụ có điều kiện; khi triển khai thật vẫn phải chạy test trên DB cô lập đúng version và kiểm dữ liệu trước/sau.

## 6. Học tiếp thế nào?

Đọc [Lesson 02](LESSON_02_BOOT_REPEATABLE_VA_SEED.md) theo thứ tự 1–7 rồi làm [đề 02](../../../Exams/de-kiem-tra/M2-3-flyway__2026-10-05__lesson2-lan1.md). Lesson 03 học sau; có thể tách đọc phần chẩn đoán và phần triển khai thành hai lượt, không tạo thêm lesson lẻ.

Lượt QA này không thay bài làm Lesson 01, snapshot chấm, 05_TIEN_DO.md hay checklist roadmap. Việc bạn vừa sửa bài Lesson 01 nếu cần đổi điểm phải có một lượt chấm riêng.
