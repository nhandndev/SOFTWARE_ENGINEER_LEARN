# M6A-1 Clean Code · Lesson 4 · Safety net và polymorphism

Ngày soạn: 2026-10-07. Chế độ PHONG_VAN: 8 tình huống × 5 = 40 điểm; đạt từ **34/40**. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/LESSON_04_SAFE_REFACTOR_POLYMORPHISM.md). Trả lời bằng ý hiểu hoặc pseudocode, không ép thuộc tên API. Mỗi ý trong “Cần nói đủ” là 1 điểm; đúng một phần 0,5. Đề theo lesson, không phải DAY_DU cuối module; không tự xác nhận capstone/deliverable đã hoàn thành.

## Câu 1 · Pure refactor hay rule mới? (5đ)

Trong một commit developer extract helper, đổi fee threshold>=500 thành>500, đổi404 thành400 và bỏ log để ngắn hơn.

**Cần nói đủ:**

- Extract helper thuộc loại thay đổi nào, theo điều kiện gì?
- Đổi threshold ảnh hưởng behavior ra sao?
- Đổi HTTP status thuộc contract nào?
- Bỏ logging có ảnh hưởng gì?
- Bạn chia mục tiêu/commit/tests thế nào?

**Trả lời:**

## Câu 2 · Code cũ chưa có test (5đ)

Bạn muốn refactor policy đang chạy nhưng chưa có tests. Có phải cố ý làm code đỏ trước rồi sửa hết không?

**Cần nói đủ:**

- Characterization tests dùng để làm gì?
- Baseline trước refactor nên có trạng thái nào?
- Khi nào dùng Red/Green cho behavior mới?
- Xử lý expectation sai/bug cũ thế nào?
- Bước refactor và test theo risk ra sao?

**Trả lời:**

## Câu 3 · Test threshold fee (5đ)

Theo contract bài: STANDARD dưới500 phí25, từ500 miễn; EXPRESS40. Hãy nêu test matrix tối thiểu có biên và input sai.

**Cần nói đủ:**

- Case STANDARD dưới threshold mong kết quả gì?
- Các case ngay/tương đương/trên threshold mong gì?
- Case EXPRESS cần gì?
- Các invalid/null/unknown và error priority cần gì?
- Expected và before/after comparison được dùng ra sao?

**Trả lời:**

## Câu 4 · Policy dispatch đi đâu? (5đ)

Ở ShippingFeeAfter, method=STANDARD và subtotal=500. Kể đường chạy và vì sao vẫn có conditional trong StandardPolicy.

**Cần nói đủ:**

- Entry validation chạy theo thứ tự nào?
- Map chọn object nào?
- Interface tham gia call ra sao?
- Implementation tính kết quả thế nào?
- Vì sao after vẫn có conditional?

**Trả lời:**

## Câu 5 · Hai nhánh ổn định có cần pattern? (5đ)

Fee chỉ STANDARD/EXPRESS, không lặp/chưa cần mở rộng. After nhiều types hơn before. Team bắt áp polymorphism vì clean.

**Cần nói đủ:**

- Conditional nhỏ ổn định có thể hợp lý không?
- Thêm types/indirection có cost gì?
- Variation/lặp behavior nào tạo lý do refactor?
- Có cần thêm Spring/factory không?
- Bạn chọn giữ/đổi với trade-off nào?

**Trả lời:**

## Câu 6 · Hai bản agree chưa đủ (5đ)

Test chỉ assert before(input)==after(input); cả hai cùng sửa nhầm>= thành>. Team bảo100% equivalence nên chắc đúng.

**Cần nói đủ:**

- Equivalence có thay contract oracle không?
- Hai bản cùng sai có thể xảy ra thế nào?
- Expected tại boundary 500 là gì?
- Fault probe threshold nên bị test nào phát hiện?
- Giới hạn bằng chứng của tests là gì?

**Trả lời:**

## Câu 7 · Unit fee xanh, transaction có giữ? (5đ)

Unit tests fee xanh. Developer còn move @Transactional sang private helper và đổi DTO schema trong cùng patch.

**Cần nói đủ:**

- Fee unit tests phủ scope nào?
- Transaction proxy có rủi ro gì?
- DTO schema có rủi ro gì?
- Cần integration/contract tests nào theo blast radius?
- Bạn đánh giá claim toàn shopcore safe ra sao?

**Trả lời:**

## Câu 8 · Test fail sau extraction (5đ)

Sau tách helper, null method/null subtotal trả message khác trước. Team định xóa assertion message vì code mới đẹp.

**Cần nói đủ:**

- Message/order có phải contract trong tình huống này không?
- Bạn tìm bước regression thế nào?
- Pure refactor cần làm gì với behavior cũ?
- Nếu muốn đổi error thật thì quy trình khác gì?
- Có nên xóa assertion chỉ để xanh không?

**Trả lời:**
