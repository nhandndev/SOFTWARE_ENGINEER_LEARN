# M2-3 Flyway · Kiểm tra Lesson 03

> LESSON: 8 câu ×5đ =40đ; normalize /40 ×100. Mỗi tình huống độc lập; không cần CLI đã cài.

Các ví dụ dùng PostgreSQL và dữ liệu cần giữ, không hướng dẫn chạy lệnh nguy hiểm trên DB thật. Không cần GitHub Actions YAML, SQL cleanup hoặc cú pháp cấu hình CLI; chỉ giải thích cơ chế và kế hoạch. Trừ khi câu nói khác, V đã áp dụng thành công được giữ nguyên.

## Câu 1 (5đ)
Startup fail vì password DB sai. Bạn chọn sửa credential hay repair? Nêu ba bằng chứng/cấu hình cần kiểm trước khi xử lý.

**Trả lời:**

## Câu 2 (5đ)
V1 đã chạy trên DB chung. V1 trong Git bị thêm cột description làm checksum mismatch; DB chung vẫn chưa có cột đó, chưa có V2. File V1 sửa chưa được phát hành thành công ở nơi khác. Repair có tự thêm description không? Nêu những gì phải đối chiếu trước khi sửa (file đã phát hành, history, schema thật) và phương án giữ V1 gốc, bổ sung thay đổi mới. Không cần lệnh repair hay viết SQL.

**Trả lời:**

## Câu 3 (5đ)
V1 đã commit, products có một dòng, chưa có stock. Flyway chạy toàn V2 trong một transaction:

```sql
ALTER TABLE products ADD COLUMN stock INTEGER;
UPDATE products SET stock = -1;
ALTER TABLE products ADD CONSTRAINT ck_stock CHECK (stock >= 0);
```

Lỗi ở lệnh nào và vì sao? Sau rollback, cột stock của V2 và dữ liệu V1 ra sao? Có được suy ra mọi SQL không transactional cũng rollback đầy đủ như vậy không?

**Trả lời:**

## Câu 4 (5đ)
DB cũ được xác minh tương đương V1 nhưng chưa có history. Baseline version 1 làm gì? Có chạy SQL V1 và tự kiểm toàn schema không? V2 sẽ ra sao?

**Trả lời:**

## Câu 5 (5đ)
Migration đã commit xóa cột có dữ liệu. Viết migration mới thêm lại cột có tự khôi phục giá trị cũ không? Phân biệt forward fix, repair và backup/restore.

**Trả lời:**

## Câu 6 (5đ)
Bạn muốn đổi `products.name TEXT NOT NULL` thành title. App cũ vẫn đọc/ghi name; app mới sẽ dùng title. Dữ liệu cũ phải được giữ. Nêu kế hoạch 3–4 bước: thêm cột mà vẫn giữ app cũ chạy; chuyển dữ liệu cũ; xử lý cả ghi mới trong thời gian chuyển tiếp; điều kiện được bỏ name. Có thể chọn cửa sổ ngừng ghi có kiểm soát hoặc chiến lược đồng bộ writer, không bắt thiết kế trigger/zero-downtime. Vì sao chỉ copy một lần rồi drop ngay chưa đủ?

**Trả lời:**

## Câu 7 (5đ)
Thiết kế kiểm migration trong CI theo hai nhánh: DB trống và DB version cũ có dữ liệu. Nêu DB loại nào, bước chạy, kiểm dữ liệu và xử lý khi lỗi.

**Trả lời:**

## Câu 8 (5đ)
Một bạn chỉ thêm flyway-core rồi chạy mvn flyway:migrate; bạn khác có CLI nhưng nghĩ CLI tự đọc application.yml. Nêu điều kiện còn thiếu ở mỗi cách và vì sao phải xác định DB đích trước khi migrate/clean.

**Trả lời:**
