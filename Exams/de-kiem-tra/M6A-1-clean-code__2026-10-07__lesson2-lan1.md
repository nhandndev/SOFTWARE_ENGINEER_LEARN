# M6A-1 Clean Code · Lesson 2 · Responsibility smells

Ngày soạn: 2026-10-07. Chế độ PHONG_VAN: 8 tình huống × 5 = 40 điểm; đạt từ **34/40**. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/LESSON_02_LONG_METHOD_GOD_CLASS_FEATURE_ENVY.md). Trả lời bằng ý hiểu hoặc pseudocode, không ép thuộc tên API. Mỗi ý trong “Cần nói đủ” là 1 điểm; đúng một phần 0,5. Đề theo lesson, không phải DAY_DU cuối module; không tự xác nhận capstone/deliverable đã hoàn thành.

## Câu 1 · Create trộn nhiều bước (5đ)

createProduct parse JSON, kiểm SKU, tính promotion, save, dựng HTML và gửi HTTP email. Đề xuất refactor theo responsibility, chưa viết code.

**Cần nói đủ:**

- JSON binding nên thuộc boundary nào?
- Service nên giữ trách nhiệm nào?
- Nêu một extraction có concept thật.
- Repository nên giữ phần việc nào?
- Bạn bảo vệ order/error/side effects bằng gì?

**Trả lời:**

## Câu 2 · Long Method có tự sai? (5đ)

Một algorithm80 dòng cohesive và một method20 dòng trộn SQL/email/token. Bạn chọn điều tra cái nào và vì sao?

**Cần nói đủ:**

- Smell là kết luận hay tín hiệu?
- Số dòng giúp đánh giá tới đâu?
- Reasons-to-change/abstraction khác nhau thế nào?
- Dependencies/testability ảnh hưởng lựa chọn ra sao?
- Đề xuất thay đổi hẹp hoặc giữ nguyên có lý do.

**Trả lời:**

## Câu 3 · ManagerPart1 và Part2 (5đ)

ShopcoreManager làm Product, token, report và email. Team chia file thành hai nửa theo số dòng.

**Cần nói đủ:**

- Các reasons-to-change ở đây là gì?
- Chia đôi theo dòng thay đổi cohesion ra sao?
- Bạn đề xuất owners/responsibilities nào?
- Dependencies/boundaries cần kiểm gì?
- Có bắt buộc mỗi method một interface không?

**Trả lời:**

## Câu 4 · Mapper đọc nhiều getter (5đ)

ProductMapper đọc10 getters tạo Response DTO. Một người gọi Feature Envy và muốn chuyển mapping HTTP vào Entity.

**Cần nói đủ:**

- Số getter có đủ để kết luận Feature Envy không?
- Mapper đang làm trách nhiệm gì?
- Đưa HTTP mapping vào Entity có trade-off nào?
- Cần xem ownership/behavior nào?
- Bạn có refactor trong tình huống này không, vì sao?

**Trả lời:**

## Câu 5 · Rule lặp ở ba services (5đ)

Ba services đều đọc Product fields để tính eligibility giảm giá theo cùng policy. So với case mapper, bạn cân nhắc đưa rule về đâu?

**Cần nói đủ:**

- Business rule lặp khác mapping ở điểm nào?
- Rule có thể thuộc owner nào?
- Dữ liệu/lý do thay đổi giúp chọn owner ra sao?
- Boundary nào cần tránh đảo ngược?
- Bạn giữ contract/test gì khi move?

**Trả lời:**

## Câu 6 · Handler nhiều annotations (5đ)

GlobalExceptionHandler có nhiều method map lỗi thành HTTP. Team muốn tách vì có nhiều @ExceptionHandler.

**Cần nói đủ:**

- Số annotation nói được gì?
- Các handlers có cohesion nào?
- Cần xem reasons-to-change/dependencies gì?
- Khi nào extraction có lợi cụ thể?
- Mapping/response contract cần bảo vệ thế nào?

**Trả lời:**

## Câu 7 · Di chuyển transaction vào helper (5đ)

@Transactional public method bị extract thành private helper tự gọi trong cùng bean; annotation public bỏ đi.

**Cần nói đủ:**

- Proxy boundary có thể thay đổi thế nào?
- Private/self-invocation ảnh hưởng interception ra sao?
- Bạn đánh giá claim refactor an toàn thế nào?
- Bạn giữ/thiết kế transaction boundary thế nào?
- Cần loại kiểm chứng nào?

**Trả lời:**

## Câu 8 · Save và notify sau Extract Class (5đ)

Tách notification ra bean khác, đồng thời thay timing notify so với commit và thêm retry. Team gọi tất cả chỉ Extract Class.

**Cần nói đủ:**

- Extraction thuần được giữ behavior nào?
- Commit/notify timing có vai trò gì?
- Retry có thể làm gì với side effects?
- Bạn chia task/commit thế nào?
- Nêu checks về order/failure/transaction.

**Trả lời:**
