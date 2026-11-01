# Flyway Lesson 03: tự kiểm sau bài học bổ sung

> Tùy chọn, không thay đề chính hoặc điểm đã chấm. 4 câu ×5đ =20đ; quy đổi /20 ×100. Tình huống độc lập, trả lời bằng lời, không chạy DB hoặc viết recovery command. Kiến thức ở README_HOC_BO_SUNG_LESSON_03.md.

## Câu 1 — Chọn đúng loại sửa (5đ)

Hai tình huống riêng:

- A: startup báo password authentication failed.
- B: DB chung đã chạy V1 gốc tạo products(id, name). Dev sửa V1 trong repo thêm description nên checksum mismatch; nội dung sửa chưa chạy ở DB nào, chưa có V2.

A nên sửa credential hay repair? Nêu hai nhóm thông tin cần kiểm khi đã biết lỗi authentication. B có cần repair mặc định để thêm cột không? Nêu kế hoạch ở mức file/history/schema để thêm description mà giữ V1 đúng lịch sử, không xóa dữ liệu.

**Trả lời:**

## Câu 2 — Baseline có kiểm tra giúp bạn không? (5đ)

DB cũ tạo trước Flyway, chưa có history. Nhóm muốn đặt baseline 1 rồi migrate V2; V1 là schema chuẩn nhóm muốn công nhận, V2 chỉ thêm description.

Ai phải xác minh schema cũ có đúng V1, trước hay sau baseline? Baseline ghi gì, có chạy SQL V1/đọc mọi cột để xác minh không? Nếu DB thực tế thiếu name, V2 chỉ thêm description có tự bổ sung name không? Không cần SQL/lệnh baseline.

**Trả lời:**

## Câu 3 — Chuyển tên cột theo kế hoạch đơn giản (5đ)

products có name TEXT NOT NULL; app cũ/job cũ vẫn ghi name. Bạn đã thêm title nullable rồi copy name sang title một lần. App cũ lại sửa name, còn app mới dự kiến chỉ INSERT title.

Nêu hai rủi ro dữ liệu/constraint trên và kế hoạch ngắn bảo toàn dữ liệu khi chuyển sang title. Được chọn cửa sổ ngừng ghi có kiểm soát, không bắt giải zero-downtime. Khi nào mới được bỏ name?

**Trả lời:**

## Câu 4 — Kiểm upgrade và chọn công cụ (5đ)

V1 có Product 10 giá 120. V2 thêm description nullable. CI chỉ thử DB trống thấy app start được nên báo xanh. Người chạy có CLI nhưng nghĩ nó đọc application.yml giống Boot; app cũng chỉ thêm dependency flyway-core, chưa thiết lập Maven plugin.

Cần thêm đường kiểm nào, chuẩn bị DB/dữ liệu gì và kiểm kết quả nào sau migrate? Khi lỗi thì CI nên làm gì? CLI có tự đọc Spring YAML không; dependency core đã đủ cấu hình Maven goal chưa? Vì sao không dùng clean để cứu lỗi trên DB có dữ liệu cần giữ?

**Trả lời:**
