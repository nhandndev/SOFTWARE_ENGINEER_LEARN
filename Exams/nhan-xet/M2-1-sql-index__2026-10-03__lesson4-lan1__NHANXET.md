# Chấm M2-1 Lesson 04 - 2026-10-04

Đề: `Exams/de-kiem-tra/M2-1-sql-index__2026-10-03__lesson4-lan1.md`.

## Điểm và trạng thái

- **35,4/40 điểm thô = 88,5/100: đạt Lesson 04.** Đây không phải điểm đề tổng kết M2-1; module vẫn đang học.
- Aggregate một bảng: 3,4/5 (68%) - thiếu `SUM`, sai `MIN`.
- `GROUP BY` với `NULL`: 3/5 (60%) - bỏ sót nhóm `NULL`.
- `WHERE`/`HAVING`: 5/5 (100%).
- `LEFT JOIN` và `COUNT`: 5/6 (83%) - output đúng, lời giải thích cần chính xác hơn.
- `SUM`/`COALESCE`, JOIN nhân dòng, window: 19/19 (100%).

## Chấm từng câu

| Câu | Điểm | Đã làm được | Thiếu / sai |
|---|---:|---|---|
| 1 | 3,4/5 | `COUNT(*)=6`, `COUNT(category_id)=5`, `MAX(price)=1500`; giải thích đúng `COUNT(column)` bỏ qua NULL. | Chưa tính `SUM(price)=4300`; `MIN(price)` là **200**, không phải 300, vì Product 15 vẫn thuộc bảng. Theo rubric: 3 giá trị đúng x 0,8 + 1 điểm giải thích. |
| 2 | 3/5 | Đúng các nhóm `(1,2)`, `(2,2)`, `(3,1)`; đúng Giá đỡ không xuất hiện. | Còn nhóm `(NULL,1)`: Product 15 **thuộc nhóm NULL**, không phải "không thuộc nhóm nào". |
| 3 | 5/5 | Đúng K1/K2/H1 qua `WHERE`, hai nhóm trước `HAVING` và kết quả `(1,2)`. | Không có. |
| 4 | 5/6 | Bảng kết quả đúng cả bốn Category, gồm Giá đỡ `(1,0)`. | `p.id` trong **dòng do LEFT JOIN tạo ra** là NULL; **`COUNT(p.id)` là số 0**, không phải NULL. Không có Product thật mang id NULL. |
| 5 | 4/4 | Đúng `(2300,2300)` và `(NULL,0)`; phân biệt tổng giá niêm yết với doanh thu item. | Không có. |
| 6 | 6/6 | Đúng Bàn phím `(2,1)`, Chuột `(2,2)`; hiểu K1 bị nhân dòng còn K2 biến mất do INNER JOIN. | Không có. |
| 7 | 5/5 | Đúng 4 dòng và các tổng 2300/600; hiểu window giữ từng Product sau `WHERE`. | Không có. |
| 8 | 4/4 | Đúng thứ tự trong từng Category; phân biệt `ORDER BY` trong `OVER` với `ORDER BY` hiển thị. | Dòng cuối bản trả lời bị dở dang, nhưng phần giải thích phía trên đã đủ. |

## Chữa phần yếu

### Câu 1: Đừng bỏ quên Product chưa phân loại

Sáu giá là `1500, 800, 300, 300, 1200, 200`. Vì thế:

```text
SUM(price) = 1500 + 800 + 300 + 300 + 1200 + 200 = 4300
MIN(price) = 200
```

`category_id=NULL` **không làm cả Product biến mất**: nó vẫn được tính trong `COUNT(*)`, `SUM(price)` và `MIN(price)`; chỉ `COUNT(category_id)` bỏ qua giá trị NULL của chính cột ấy. Đọc lại `Notes/M2_Database/LESSON_04_AGGREGATE_GROUP_BY_WINDOW.md` mục 2.

### Câu 2: `GROUP BY` vẫn tạo nhóm cho NULL

`GROUP BY category_id` chia 6 Product thành bốn nhóm: `1 -> K1,K2`, `2 -> M1,M2`, `3 -> H1`, `NULL -> Chưa phân loại`. Product 15 không có Category thật, nhưng **vẫn có một dòng Product** nên được gom vào nhóm NULL. Category 4 Giá đỡ không có Product trỏ tới nên không có nhóm `4`. Đọc lại Lesson 04 mục 3.

### Câu 4: NULL của cột khác kết quả đếm

Với Giá đỡ, LEFT JOIN tạo một dòng `(c.id=4, p.id=NULL)`. `COUNT(*)` đếm dòng ấy thành `1`. `COUNT(p.id)` đếm các **giá trị p.id khác NULL**, nên trả **0**. Bản thân `COUNT(p.id)` không trả NULL trong trường hợp này. Đọc lại Lesson 04 mục 5.

## Ôn đúng chỗ

- Aggregate + NULL -> Lesson 04 mục 2 -> 5 phút -> tự cộng đủ 6 giá, chỉ ra vì sao `COUNT(category_id)` là 5.
- `GROUP BY NULL` -> Lesson 04 mục 3 -> 5 phút -> ghi tên Product trong bốn nhóm `1`, `2`, `3`, `NULL`.
- `LEFT JOIN` + COUNT -> Lesson 04 mục 5 -> 5 phút -> viết một dòng Giá đỡ với `p.id=NULL`, rồi tính hai hàm COUNT.

## Bước tiếp theo

Lesson 04 đạt 88,5/100. Sau khi tự giải thích lại ba điểm trên, có thể học Lesson 05 (Index và `EXPLAIN ANALYZE`). Chưa tick checklist hoặc đánh dấu hoàn thành M2-1 từ riêng bài lesson này.
