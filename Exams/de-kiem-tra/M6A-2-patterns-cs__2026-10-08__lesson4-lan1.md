# M6A-2 · Lesson 04 · Wrapper, cây và review có bằng chứng

Ngày soạn2026-10-08. PHONG_VAN:8×5=40đ, đạt34. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/LESSON_04_DECORATOR_PROXY_COMPOSITE_REVIEW.md). Mỗi ý1đ, đúng một phần0,5; chấm ý hiểu/pseudocode, không ép cú pháp. Đề lesson, không xác nhận đã làm capstone.

## Câu 1 · Hai thứ tự Decorator (5đ)

Theo CompositionExample, so `Bracket(Prefix(Plain("Book"),"sale:"))` với `Prefix(Bracket(Plain("Book")),"sale:")`. Đây là ký hiệu rút gọn cho constructors đã có trong bài.

**Cần nói đủ:**
- Interface chung và delegate đóng vai gì?
- Thứ tự lời gọi vào của cách đầu là gì?
- Return đi ngược và hai outputs khác nhau thế nào?
- Next throw thì wrapper mẫu làm gì?
- Khi nào helper đơn giản hơn chuỗi Decorator?

**Trả lời:**

## Câu 2 · Decorator không phải Proxy chỉ vì có next (5đ)

PrefixText thêm prefix, GuardedText check allowed trước next.read. Team phân loại cả hai chỉ từ class diagram.

**Cần nói đủ:**
- Intent chính của PrefixText là gì?
- Intent chính của GuardedText là gì?
- Allowed false/true đi đường nào?
- BooleanSupplier được hỏi khi nào, và bypass cần xét gì?
- Vì sao cấu trúc giống chưa đủ và thêm cache/retry không tự là refactor thuần?

**Trả lời:**

## Câu 3 · Đổi thứ tự access check (5đ)

Proxy trước đây check quyền rồi mới gọi dependency có side effect. Bản mới gọi dependency trước, check sau; hoặc giữ boolean của user đầu tiên dùng mãi.

**Cần nói đủ:**
- Denied path phải bảo vệ điều gì?
- Đổi check sau ảnh hưởng side effect thế nào?
- Cache một boolean giữa users có rủi ro gì?
- Cần authority/context đáng tin nào ngoài mẫu?
- Nêu tests đủ liên quan và giới hạn sample unit.

**Trả lời:**

## Câu 4 · this.method không đi vòng ra proxy (5đ)

Trong proxy-based Spring AOP, caller gọi public method qua bean, method đó tự gọi this.otherMethod có annotation. Manual GuardedText tests xanh nên team claim transaction/security advice chắc chạy.

**Cần nói đủ:**
- Caller→proxy→target khác self-invocation thế nào?
- Annotation có tự chặn lời gọi nội bộ không?
- JDK/CGLIB và final/private có giới hạn nào cần xem?
- Unit wrapper kiểm scope nào?
- Cần kiểm Spring wiring/boundary ra sao trước claim an toàn?

**Trả lời:**

## Câu 5 · Composite đếm gì? (5đ)

Root chứa LeafBook và Group[LeafPen,LeafKeyboard]. Thử empty Group và Group[book,book] với cùng instance book.

**Cần nói đủ:**
- Node/Leaf/Group cùng operation gì?
- Root.count trace recursion và kết quả ra sao?
- Empty group trả gì?
- Book cùng instance hai lần được đếm thế nào?
- Nếu muốn unique Product hoặc chống overflow cần contract gì?

**Trả lời:**

## Câu 6 · List copy có giải mọi graph không? (5đ)

Group constructor List.copyOf; caller sửa list đầu vào. Một custom Node lại có cycle, hoặc JPA Category children là LAZY. Team bảo Composite tự xử lý hết.

**Cần nói đủ:**
- Copy list bảo vệ thay đổi container ra sao?
- Mutable elements/custom Node có tự deep-copy không?
- Cycle/deep graph cần cân nhắc gì?
- JPA lazy/query/session có được pure Java mẫu giải quyết không?
- Nêu tests/giới hạn cần ghi thay vì claim tuyệt đối.

**Trả lời:**

## Câu 7 · Evidence trong shopcore (5đ)

Mở source hiện tại thấy @Builder và handler gọi builder. Không có bằng chứng bạn đã áp Factory+Structural vào use case thật, chưa chạy integration.

**Cần nói đủ:**
- Evidence nào cho builder-style construction?
- Có suy DTO immutable/valid từ annotation không?
- Có suy đủ deliverable/đã dùng các role khác không?
- Source observation khác runtime evidence thế nào?
- Log và trạng thái nên ghi gì?

**Trả lời:**

## Câu 8 · Chọn pattern mà không dựng cho đủ tên (5đ)

Bạn chuẩn bị một refactor có chủ đích cho roadmap Builder+Factory+Structural. Hiện đang hoãn code capstone; có thể proposal tích hợp provider sau này nhưng chưa có source feature đó.

**Cần nói đủ:**
- Cần xác định pain point/source evidence nào trước?
- So phương án đơn giản với pattern bằng tiêu chí gì?
- Contract nào phải giữ, behavior change nào tách riêng?
- Baseline/tests theo blast radius ra sao?
- Proposed/implemented/tested/merged và điều kiện dừng ghi thế nào?

**Trả lời:**
