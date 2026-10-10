# Bài giải / rubric · M6A-1 Clean Code Lesson 2

40 điểm, đạt 34. Mỗi tiêu chí 1 điểm: đủ và đúng = 1; đúng hướng nhưng thiếu điều kiện = 0,5; sai/thiếu = 0. Chấm ý nghĩa tương đương, không ép câu chữ; không cap ngầm. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/LESSON_02_LONG_METHOD_GOD_CLASS_FEATURE_ENVY.md) · [Quy tắc chấm](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Binding thuộc HTTP boundary (1); Service điều phối business rule (1); Chọn ít nhất một extraction có concept (1); Repository giữ data access (1); Giữ order/exception/side effect và kiểm trước sau (1) |
| 2 | Smell là tín hiệu không verdict (1); Không chọn chỉ theo số dòng (1); Xét reasons-to-change và abstraction (1); Xét testability/dependencies (1); Đề xuất thay đổi hẹp hoặc giữ nguyên có lý do (1) |
| 3 | Nhận diện nhiều reasons-to-change (1); Chia theo dòng không sửa cohesion (1); Đề xuất owner/responsibility rõ (1); Giữ dependencies/boundaries hợp lý (1); Không bắt mỗi method một interface (1) |
| 4 | Nhiều getter chưa đủ kết luận smell (1); Mapper đúng vai trò chuyển dữ liệu (1); Entity không nên phụ thuộc HTTP DTO vì chữa nhầm (1); Xét ownership/behavior thực (1); Không refactor khi chưa có complexity cần giải (1) |
| 5 | Rule business lặp khác mapping (1); Tìm domain owner/pricing policy (1); Xét data locality và reason-to-change (1); Tránh Entity tự query/remote hoặc phụ thuộc HTTP (1); Giữ contract và test cases khi move (1) |
| 6 | Số annotation không là God Class proof (1); Cùng responsibility mapping có thể cohesive (1); Xét reasons-to-change/dependencies (1); Chỉ extract khi có lợi cụ thể (1); Giữ annotations/mapping/response contract (1) |
| 7 | Spring proxy boundary có thể đổi (1); Private/self-invocation không tự được proxy intercept (1); Không gọi đó là refactor an toàn mặc định (1); Giữ hoặc thiết kế lại transaction boundary rõ (1); Kiểm integration/rollback phù hợp (1) |
| 8 | Extraction thuần giữ behavior (1); Timing/commit là contract cần xét (1); Retry có thể đổi side effects/duplication (1); Tách behavior/architecture change khỏi refactor (1); Kiểm fail/order/transaction và không tách mọi dòng (1) |

## Câu 1 · Create trộn nhiều bước

Binding typed ở Controller/framework; Service điều phối rule, Repository truy cập data. Có thể tách pricing/notification formatting khi owner rõ. Không mỗi dòng một service; giữ checks/save/notify order và exceptions, có baseline/test phù hợp trước thay đổi.

## Câu 2 · Long Method có tự sai?

80 dòng không tự sai; method20 dòng trộn nhiều owner có thể khó đổi/test hơn. Dùng cohesion, reasons-to-change, dependencies và mức trừu tượng; điều tra trước khi tách. Có thể giữ algorithm hoặc extract concept thật, không luật máy móc.

## Câu 3 · ManagerPart1 và Part2

Product/token/report/email có owners khác nên có God Class signal. Part1/Part2 theo dòng giữ coupling cũ. Tách theo domain/responsibility như ProductService/TokenService/formatter khi có lý do, rõ dependencies và test; interface không phải mục tiêu tự thân.

## Câu 4 · Mapper đọc nhiều getter

Mapper đọc field đúng nhiệm vụ, không tự Feature Envy. Chuyển HTTP mapping vào Entity có thể đảo boundary sai. Xét rule/ownership/duplication thực, không số getter; nếu mapper rõ thì giữ, không tạo refactor không cần.

## Câu 5 · Rule lặp ở ba services

Business eligibility lặp có thể thuộc PricingPolicy hoặc domain owner phù hợp. Xét dữ liệu và nơi rule đổi cùng nhau; không tự biến Entity thành caller Repository/remote hay HTTP. Move hẹp có baseline/test behavior, không chọn một owner tuyệt đối cho mọi domain.

## Câu 6 · Handler nhiều annotations

Nhiều handler cùng mapping exception→HTTP vẫn có thể cohesive. Review reasons-to-change/dependencies thay vì annotation count. Có thể gom duplication nhỏ hoặc giữ class; nếu tách cần chứng minh lợi ích và bảo vệ mapping/status/body.

## Câu 7 · Di chuyển transaction vào helper

Trong proxy mode self-invocation/private helper không đi qua transaction proxy như public entry trước. Bỏ annotation có thể đổi transaction/rollback. Giữ boundary hoặc thiết kế riêng và integration test; unit stub xanh không chứng minh preserve transaction.

## Câu 8 · Save và notify sau Extract Class

Extract Class thuần không tự đổi timing/retry. Notify trước/sau commit và retry có thể tạo/lặp/mất side effect khác, cần thiết kế riêng. Tách task/commit và kiểm order/failure/transaction; không giấu thay đổi lớn dưới tên refactor.

