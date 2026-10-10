# M6A-1 Clean Code · Lesson 5 · Review thật và refactor log

Ngày soạn: 2026-10-07. Chế độ PHONG_VAN: 8 tình huống × 5 = 40 điểm; đạt từ **34/40**. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/LESSON_05_REAL_REVIEW_REFACTOR_LOG.md). Trả lời bằng ý hiểu hoặc pseudocode, không ép thuộc tên API. Mỗi ý trong “Cần nói đủ” là 1 điểm; đúng một phần 0,5. Đề theo lesson, không phải DAY_DU cuối module; không tự xác nhận capstone/deliverable đã hoàn thành.

## Câu 1 · Handler của bạn có gì thật? (5đ)

Đọc handler được liên kết trong bài: nhiều method build ApiErrorResponse rồi bọc ResponseEntity. Chưa chạy MVC tests.

**Cần nói đủ:**

- Observation source nào có thật?
- Bạn đánh giá kết luận God Class thế nào?
- Đề xuất nhỏ hoặc giữ nguyên có lý do.
- Source observation khác runtime evidence ra sao?
- Status nên ghi gì nếu chưa làm?

**Trả lời:**

## Câu 2 · ErrorCode chỉ business errors (5đ)

Style hiện tại dùng ErrorCode cho AppException; validation framework dùng code/message phù hợp hiện tại. Bạn gom response builder.

**Cần nói đủ:**

- Business error cần giữ code/message/status nào?
- Framework error contract cần giữ gì?
- Helper construction có nên quyết định mọi mapping không?
- Có bắt buộc gom mọi error vào enum không?
- Bạn kiểm từng handler ra sao?

**Trả lời:**

## Câu 3 · First error sang all errors (5đ)

Refactor handler đang trả first field error thành trả list mọi errors và thêm requestId JSON, vì thấy hữu ích hơn.

**Cần nói đủ:**

- First error sang list thuộc loại thay đổi gì?
- Thêm requestId JSON thuộc loại thay đổi gì?
- Có nên gộp vào structural refactor không?
- Bạn giữ contract hoặc tách requirement/migration thế nào?
- Cần HTTP/client compatibility evidence nào?

**Trả lời:**

## Câu 4 · Một handler chung trả400 (5đ)

Để bớt code, developer bỏ các @ExceptionHandler cụ thể và mọi lỗi vào Exception.class trả400, kể cả business404/409 và unknown500.

**Cần nói đủ:**

- Specific handler mappings chịu ảnh hưởng gì?
- Business statuses nên được xử lý thế nào?
- Unknown exception có contract gì?
- Response được phép chứa thông tin lỗi nào?
- Bạn kiểm Spring MVC chọn handler đúng bằng gì?

**Trả lời:**

## Câu 5 · Baseline test handler (5đ)

Muốn extract errorResponse helper, hãy nêu một nhóm assertions đủ bảo vệ ý nghĩa của năm loại lỗi trong bài, không bắt viết JUnit.

**Cần nói đủ:**

- Nêu assertions cho AppException.
- Nêu assertions validation first/fallback/status.
- Nêu assertions parameter/unreadable errors.
- Nêu assertions unknown response/log policy.
- Unit helper khác MVC mapping test ở đâu?

**Trả lời:**

## Câu 6 · Log viết Done hay Proposed? (5đ)

Bạn đã nghĩ ra helper nhưng chưa sửa source hoặc chạy tests; sample fee của AI xanh. Deliverable cần5 smells thật.

**Cần nói đủ:**

- Status nào phản ánh việc chưa thực hiện?
- Log cần evidence/file/transformation nào?
- Log cần contract/tests planned/gaps nào?
- Fee QA có nói được handler/shopcore xanh không?
- Bạn đáp ứng yêu cầu năm smell/deliverable thật thế nào?

**Trả lời:**

## Câu 7 · Khi nào dừng? (5đ)

Helper đã làm mục tiêu rõ hơn, reviewer muốn thêm ErrorFactory interface/bean và rewrite mọi package dù không có thêm pain point.

**Cần nói đủ:**

- Khi nào mục tiêu clarity đã đủ để dừng?
- Factory/interface cần pain point nào?
- Big Bang rewrite có nằm trong scope không?
- Giữ diff/user changes theo nguyên tắc nào?
- Khi nào tách change hoặc revert/giữ nguyên?

**Trả lời:**

## Câu 8 · Clean pipeline AI có đổi prompt? (5đ)

Một lần refactor pipeline còn đổi model version, prompt, retry và token budget. Unit fake luôn trảOK.

**Cần nói đủ:**

- Tách pipeline theo responsibilities thế nào có lý do?
- Đổi model/prompt/retry/budget tác động gì?
- Bạn phân loại với refactor thuần thế nào?
- Unit fake trả OK chứng minh được gì?
- Cần integration/evaluation và ghi gaps ra sao?

**Trả lời:**
