# QA M6A-1 · 2026-10-07

## Task 1 · Scope

5 lesson/20h khớp roadmap; đủ naming/functions/comments, năm smells, safe refactoring, extract/rename/polymorphism và log. Class/Lombok được giữ theo style. Không Big Bang rewrite; không biến patterns tiếp theo thành yêu cầu ngầm. Mẫu shipping/price là giả định, handler là source observation; không tự sửa/nộp project.

## Task 2 · Lesson 01 và đề

Rà clarity/contract thay số dòng; rename DTO/reflection/config có compatibility; guard clauses giữ order; comment why; stream/Builder không tự tối ưu/invariant. C1–8 đều có ví dụ/ý đã dạy; không ép đúng từ tiếng Anh.

## Task 3 · Lesson 02 và đề

Rà Long Method/God Class/Feature Envy bằng responsibility/evidence; mapper/handler có thể cohesive. Extract/move giữ transaction/notify timing, private/self-invocation proxy caveat. C1–8 phủ hai chiều làm/không làm, không bắt mỗi method một interface.

## Task 4 · Lesson 03 và đề

Rà Data Clump/Primitive Obsession, invariant constructor, class immutable và value equality chưa implement; BigDecimal scale/currency/rounding, builder paths, PATCH/schema compatibility. Mẫu price không bị gọi thư viện Money hoàn chỉnh. C1–8 đều có contract/limits tương ứng.

## Task 5 · Lesson 04 và đề

Rà baseline before/after threshold >=500, null/negative/unknown/error order; polymorphism không đòi xóa mọi if, có thể giữ conditional ổn định. Tests có explicit expected cùng equivalence; không lấy unit để claim Spring transaction/MVC. C1–8 không yêu cầu thuộc JUnit hoặc viết project.

## Task 6 · Lesson 05 và đề

Đọc GlobalExceptionHandler/ErrorCode thực; duplication response construction có thật, không bịa năm smells. Proposed helper giữ enum/framework style, first validation/fallback/status/log; API change riêng. C1–8 phủ evidence/contract/test/log/stop/AI behavior changes. QA sample không được xem deliverable của học viên.

## Task 7 · Tự động, giới hạn và bảo toàn

Ba literal classes trích từ Lesson 03/04 compile bằng JDK 21 và qua **41 explicit checks**: expected fee ở biên/scale, before-after representation, error/message/priority, price validation/currency/immutability. Fault probe chỉ sửa bản temp threshold `>=` thành `>`: chương trình fail đúng assertion `after oracle STANDARD 500`, không phải compile failure. Chạy lại bản gốc sau fault để xác nhận khôi phục.

Checker chung có sáu fault probes cho cấu trúc. Review đề đã đổi ý hỏi mang sẵn kết luận thành câu hỏi trung lập, giữ năm criteria công khai tương ứng trong bài giải để chấm minh bạch.

Chạy lại bản gốc sau mutation đạt **41 checks**, không giữ fault trong lesson/source. Chỉ compile/run ba classes thuần Java; helper handler và pseudo Service không claim đã compile/integration. Không test Spring/JPA/HTTP của shopcore, không benchmark hoặc sửa source. Đây không phải chứng minh tuyệt đối mọi input hoặc model quality.

Checker cả nguồn/Vault đạt **39 Markdown files, 9 lessons, 72 câu/rubric, 74 local links, 0 lỗi**, sáu checker fault probes đạt. **28 protected files không đổi**; 05 chỉ thêm hai nhãn “Đã có đề + lesson”, không đổi trạng thái/điểm/ngày/log hoặc checklist. Đồng bộ **42 files** hai module vào Vault Documents và so SHA-256; backup khác nằm dưới `Software_Engineer/.sync-backups/m55-m6a1-1791392218076`. Không thay AWS/AI notes hoặc kích hoạt auto-sync.

## Task 8 · Rà soát chiều sâu từng lesson, 2026-10-08

- Lesson01: đối chiếu tám tình huống naming/function/comment với bài giải; giữ cách đánh giá theo contract, không luật số dòng hoặc cấm comment.
- Lesson02: thêm Extract Method before/after bằng class/getter, trace ba trường hợp và error priority khi hai điều kiện cùng sai. Thêm Extract Class với owner formatting, dependency và giới hạn transaction/notify. Không tự ghi private helper tạo bean/thread/transaction mới; không khẳng định kiểm SKU rồi save chống được race condition.
- Lesson03: thêm signature Address before/after, cách giữ flat DTO và ảnh hưởng callers; trace ba object ProductPrice, constructor, add và phân biệt immutable với valid. Không tự claim sample kiểm được Lombok builder paths.
- Lesson04: đối chiếu tám câu với contract threshold, dispatch, safety net và test scope. Giữ mẫu đã chạy, không thay rule phí hoặc bắt áp pattern cho hai nhánh ổn định.
- Lesson05: đối chiếu handler/ErrorCode hiện tại; thêm business404, validation400 và unknown HTTP500/body9999. Giải thích fallback null khác chuỗi rỗng và việc không chọn lỗi thứ hai; thêm quy trình đổi từng handler, giữ annotation/mapping/log.

Rà riêng năm cặp đề/đáp án: mỗi đề tám tình huống có năm ý công khai, đáp án/rubric tương ứng; tổng 40 câu cho module. Giữ nguyên toàn bộ đề/đáp án và chỗ điền bài, không thêm tiêu chí bắt buộc ngầm từ walkthrough mới.

Chạy lại checker chung: **39 Markdown, 9 lessons, 72 câu/rubric, 74 local links, 0 lỗi**, sáu checker fault probes đạt. Chạy lại mẫu Java bằng JDK21: **41 explicit checks đạt**. Các fragment mới ở Lesson02/03 và trace handler là giải thích đọc code, không được báo là đã compile/chạy integration. Không chạy API hoặc refactor source shopcore; không đổi 01/05 hoặc tự công nhận module đạt.
