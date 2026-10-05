# Đáp án M2-2 - Lesson 01: Kiểu dữ liệu và constraint

> Tổng 40 điểm thô. Điểm thang 100 = điểm thô / 40 x 100. Chấm theo **ý nghĩa**, không ép đúng tên biến/cú pháp Java. Nếu học viên chỉ làm một phần, chấm trên điểm tối đa của các câu đã làm và ghi rõ là điểm tạm.

## Câu 1 - 5đ

- `NUMERIC(12,2)` cho số thập phân chính xác, hợp với tiền; floating-point không bảo đảm biểu diễn thập phân chính xác: 2đ.
- `TIMESTAMPTZ` biểu diễn thời điểm có quy đổi múi giờ; **không giữ tên múi giờ gốc**: 1đ.
- `JSONB` cho thuộc tính linh hoạt, không nên thay cột lõi cần ràng buộc: 1đ.
- `UUID` là kiểu ID khi cần định danh được tạo phân tán/khó đoán; không bắt buộc dùng ở schema này: 1đ.

## Câu 2 - 5đ

- `IDENTITY` sinh giá trị mặc định nhờ sequence khi bỏ qua id: 2đ.
- `PRIMARY KEY` bảo đảm duy nhất và không NULL: 2đ.
- `IDENTITY` một mình không thay thế ràng buộc duy nhất; `BY DEFAULT` có thể nhận id tường minh, sequence có thể được can thiệp: 1đ.

## Câu 3 - 5đ

- `100` được nhận: 1đ.
- `0` và `-5` bị `CHECK (price > 0)` chặn: 1đ cho mỗi trường hợp.
- `NULL` bị `NOT NULL` chặn: 1đ.
- Bỏ `NOT NULL` thì `CHECK` không tự chặn NULL (biểu thức UNKNOWN/NULL được chấp nhận): 1đ.

## Câu 4 - 5đ

- SKU `'BK-01'` đã có nên bị `UNIQUE` chặn: 1đ.
- `sku=NULL` bị `NOT NULL` chặn: 1đ.
- Nếu chỉ `UNIQUE`, nhiều NULL mặc định được nhận: 2đ.
- `UNIQUE` kiểm soát trùng giá trị có nghĩa, không buộc giá trị phải tồn tại; cần `NOT NULL` nếu bắt buộc: 1đ.

## Câu 5 - 5đ

- `category_id=2` được nhận vì Category 2 tồn tại: 1đ.
- `category_id=999` bị FK chặn: 1đ.
- `category_id=NULL` được nhận vì cột FK hiện cho NULL: 2đ (kết luận + lý do).
- Thêm `NOT NULL` cùng FK để buộc Product có Category hợp lệ: 1đ.

## Câu 6 - 5đ

- `NOT NULL` không chặn chuỗi rỗng `''`: 2đ.
- Bỏ qua `created_at` khi INSERT thì `DEFAULT now()` được dùng: 1,5đ.
- Gửi tường minh NULL thì default không thay thế; `NOT NULL` từ chối: 1,5đ.

## Câu 7 - 5đ

- Hai request có thể cùng pass `existsBySku` trước khi một request lưu, nên app check không đủ trong tình huống đồng thời: 2đ.
- DB `UNIQUE` là chốt chặn dữ liệu trùng dù request đi từ đâu: 1đ.
- Không tự suy ra HTTP 409 chỉ từ DB exception: 1đ.
- Handler/controller (cách app map lỗi ra HTTP) quyết định response: 1đ.

## Câu 8 - 5đ

Ví dụ:

```sql
sku TEXT NOT NULL UNIQUE,
price NUMERIC(12,2) NOT NULL CHECK (price > 0),
category_id BIGINT NOT NULL REFERENCES categories(id)
```

- SKU bắt buộc và duy nhất: 1đ.
- Giá là số phù hợp, bắt buộc, dương: 1,5đ.
- Category bắt buộc và tồn tại: 1,5đ.
- DB constraint chặn cả dữ liệu đến từ các nguồn/đường code khác, bổ sung cho DTO validation: 1đ.

## Trọng tâm chữa bài

- Sai `NULL` với `CHECK`/`UNIQUE`/FK -> đọc lại [Lesson 01 mục 4](../../Notes/M2_Database/M2_2_PostgreSQL/LESSON_01_KIEU_DU_LIEU_CONSTRAINT.md).
- Nhầm `IDENTITY` với PK -> đọc lại mục 4.1-4.2.
- Nghĩ validation ở Service thay được constraint -> đọc lại mục 6.
- Chỉ có bài học Lesson 01 đạt không đồng nghĩa toàn M2-2 đạt; còn Lesson 02-04.
