# Bài kiểm tra M2-1 - Lesson 02: JOIN

> 7 câu, tổng 40 điểm thô. Có thể trả lời bằng lời; câu viết query không bắt lỗi gõ phím nhỏ nếu ý đúng. Nếu bạn nói `chấm thử`, tôi chỉ chấm các câu đã làm.

Dùng bộ dữ liệu `categories`, `products`, `order_items` trong [Lesson 02](../../Notes/M2_Database/LESSON_02_JOIN_TU_BANG_DEN_KET_QUA.md). Không mở file `__DAPAN.md` trước khi làm.

## Câu 1 - Bản chất JOIN (5đ)

Tại sao category `Bàn phím` xuất hiện 2 dòng, còn `Tai nghe` không xuất hiện trong query `categories INNER JOIN products ON p.category_id = c.id`? Product 13 có xuất hiện không, vì sao?

**Trả lời:**

---

## Câu 2 - Dự đoán LEFT JOIN (5đ)

Với `categories c LEFT JOIN products p ON p.category_id = c.id`, hãy liệt kê từng cặp `(category, product)` trả về. Product 13 có trong kết quả không?

**Trả lời:**

---

## Câu 3 - Chọn phía được giữ (5đ)

Cần danh sách **tất cả product**, kể cả product chưa được gán category. Hãy viết `FROM ... LEFT JOIN ... ON ...` và nói product 13 có giá trị gì ở cột category.

**Trả lời:**

---

## Câu 4 - ON vs WHERE (7đ)

So sánh hai query sau. Query nào giữ lại đủ cả 3 category? Hãy kể kết quả của từng query và giải thích vì sao.

```sql
-- A
SELECT c.name, p.name
FROM categories c
LEFT JOIN products p ON p.category_id = c.id AND p.name LIKE 'K%';

-- B
SELECT c.name, p.name
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
WHERE p.name LIKE 'K%';
```

**Trả lời:**

---

## Câu 5 - Tìm category rỗng (6đ)

Viết query lấy `id`, `name` của category không có product. Giải thích vì sao dùng `IS NULL` và cột nào nên kiểm tra.

**Trả lời:**

---

## Câu 6 - JOIN 3 bảng (7đ)

Viết query trả `order_items.id`, tên product, tên category, quantity cho mỗi order item. Với bộ dữ liệu trên, có bao nhiêu dòng và tại sao K1 xuất hiện nhiều lần?

**Trả lời:**

---

## Câu 7 - Đọc cardinality (5đ)

Một category có 2 products; product A có 3 order items, product B có 2 order items. Nếu INNER JOIN `categories -> products -> order_items` và lọc đúng category đó, kết quả có bao nhiêu dòng? `COUNT(*)` đang đếm cái gì?

**Trả lời:**
