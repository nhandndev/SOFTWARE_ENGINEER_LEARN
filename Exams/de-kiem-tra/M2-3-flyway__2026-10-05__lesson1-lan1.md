# M2-3 Flyway · Kiểm tra Lesson 01

> Chế độ LESSON theo cách học hiện tại: 8 câu × 5đ = 40đ; điểm /40 ×100. Chấm theo ý nghĩa, không buộc thuộc API. Đây không phải đề DAY_DU tổng module. Mỗi tình huống độc lập.

## Dữ kiện chung

Repository có `V1__create_catalog.sql`, `V2__add_description.sql`, `V3__add_price_index.sql`, `V10__add_stock.sql`. DB A đã chạy V1/V2 thành công, DB B trống. File không bị thay đổi, naming và cấu hình mặc định hợp lệ.

## Câu 1 (5đ)
Entity có description nhưng DB deploy chưa có cột này. Migration giải quyết việc gì, khác Entity thế nào?

**Trả lời:**

## Câu 2 (5đ)
Giải thích từng phần của `V2__add_description.sql`. Vì sao `V2_add_description.sql` có vấn đề với naming mặc định?

**Trả lời:**

## Câu 3 (5đ)
DB A và B cần chạy những file nào, theo thứ tự nào? V10 có chạy trước V3 không?

**Trả lời:**

## Câu 4 (5đ)
Tình huống độc lập: hai người cùng thêm `V3__add_stock.sql` và `V3__add_price_index.sql`; cả hai chưa áp dụng lên DB chung. Hai mô tả khác nhau có tránh trùng version không? Nêu cách xử lý để giữ thứ tự thay đổi. Sau khi version đã chạy thành công, restart có tự chạy lại version đó không?

**Trả lời:**

## Câu 5 (5đ)
V1 đã áp dụng trên DB dùng chung. Bạn cần thêm description. Nên sửa V1 hay tạo V mới? Giải thích hậu quả với DB cũ và mới.

**Trả lời:**

## Câu 6 (5đ)
Checksum khác có thể báo vấn đề gì? `validate` có chứng minh mọi cột trong DB đúng như Entity không? Vì sao?

**Trả lời:**

## Câu 7 (5đ)
Một bạn nghĩ GET products làm Flyway chạy lại mọi SQL. Hãy sửa cách hiểu và mô tả thứ tự khởi động so với luồng HTTP.

**Trả lời:**

## Câu 8 (5đ)
DB có bảng products và dữ liệu cũ; V1 đã chạy trên môi trường chung. Viết tên file V2 và SQL thêm description nullable; vì sao chưa nên thêm NOT NULL ngay khi chưa có cách cấp giá trị cũ?

**Trả lời:**
