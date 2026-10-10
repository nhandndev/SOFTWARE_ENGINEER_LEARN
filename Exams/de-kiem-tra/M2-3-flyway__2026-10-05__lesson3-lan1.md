# M2-3 Flyway · Kiểm tra Lesson 03

> LESSON: 8 câu ×5đ =40đ; normalize /40 ×100. Mỗi tình huống độc lập; không cần CLI đã cài.

## Câu 1 (5đ)
Startup fail vì password DB sai. Bạn chọn sửa credential hay repair? Nêu ba bằng chứng/cấu hình cần kiểm trước khi xử lý.

**Trả lời:**

## Câu 2 (5đ)
V1 đã chạy trên DB chung. V1 trong Git bị thêm cột description làm checksum mismatch. Repair có tự thêm cột đó vào DB không? Cách xử lý thông thường là gì?

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
Bạn muốn đổi name thành title trong khi app cũ còn chạy. Nêu kế hoạch 3–4 bước có giữ tương thích và bảo toàn dữ liệu, thay vì rename/drop ngay.

**Trả lời:**

## Câu 7 (5đ)
Thiết kế kiểm migration trong CI theo hai nhánh: DB trống và DB version cũ có dữ liệu. Nêu DB loại nào, bước chạy, kiểm dữ liệu và xử lý khi lỗi.

**Trả lời:**

## Câu 8 (5đ)
Một bạn chỉ thêm flyway-core rồi chạy mvn flyway:migrate; bạn khác có CLI nhưng nghĩ CLI tự đọc application.yml. Nêu điều kiện còn thiếu ở mỗi cách và vì sao phải xác định DB đích trước khi migrate/clean.

**Trả lời:**
