# Bài giải / rubric · M6A-1 Clean Code Lesson 4

40 điểm, đạt 34. Mỗi tiêu chí 1 điểm: đủ và đúng = 1; đúng hướng nhưng thiếu điều kiện = 0,5; sai/thiếu = 0. Chấm ý nghĩa tương đương, không ép câu chữ; không cap ngầm. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/LESSON_04_SAFE_REFACTOR_POLYMORPHISM.md) · [Quy tắc chấm](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Extract helper có thể refactor nếu giữ contract (1); Threshold đổi behavior (1); HTTP status đổi contract (1); Bỏ log đổi observability behavior (1); Tách mục tiêu/commit và test rõ (1) |
| 2 | Characterization tests ghi behavior hiện tại (1); Baseline xanh trước structural change (1); Red/Green khi thêm behavior/fix riêng (1); Không sửa expectation chỉ để xanh (1); Bước nhỏ chạy lại tests theo risk (1) |
| 3 | STANDARD499.99 trả25 (1); STANDARD500/500.00/500.01 trả0 (1); EXPRESS trả40 (1); Null/negative/unknown errors và ưu tiên method null (1); Expected rõ và before/after đối chiếu (1) |
| 4 | Validation giữ thứ tự (1); Map chọn StandardPolicy (1); Gọi cùng interface FeePolicy (1); Dynamic implementation tính threshold trả0 (1); Polymorphism không bắt xóa mọi if (1) |
| 5 | Conditional nhỏ có thể rõ hơn (1); Thêm types/indirection có cost (1); Nêu variation/lặp behavior là lý do thực (1); Không bắt Spring/factory mới (1); Chọn giữ hoặc refactor với trade-off cụ thể (1) |
| 6 | Equivalence không thay explicit contract oracle (1); Cả hai có thể cùng sai (1); Expected tại500 phải0 (1); Fault mutation>= sang> cần bị bắt (1); Tests chỉ phủ cases, không chứng minh mọi input (1) |
| 7 | Fee unit chỉ chứng minh policy scope (1); Proxy/self-invocation transaction risk (1); DTO schema là HTTP compatibility risk (1); Thêm integration/contract tests theo thay đổi (1); Không suy all shopcore safe từ fee tests (1) |
| 8 | Message/order có thể là contract đã chọn (1); Tìm bước gây regression (1); Giữ/restore behavior cho refactor thuần (1); Nếu muốn đổi error tách requirement/test change (1); Không xóa assertion để che lỗi (1) |

## Câu 1 · Pure refactor hay rule mới?

Extraction giữ behavior có thể refactor. Threshold, HTTP status và logging policy đều đổi behavior/contract quan sát được. Tách task/commit và tests theo mục tiêu, không giấu dưới cleanup hay coi mọi change không tốt; cần yêu cầu rõ.

## Câu 2 · Code cũ chưa có test

Trước hết xác định/characterize contract hiện tại và baseline xanh. Red→Green dành behavior mới/bug fix có mục tiêu rồi refactor giữ xanh, không cố phá code cũ. Nếu gặp bug ghi/tách change; không đổi tests cho qua. Refactor nhỏ và test theo blast radius.

## Câu 3 · Test threshold fee

Kiểm499.99→25;500/500.00/500.01→0;EXPRESS0/1000→40. Kiểm null method, null/âm subtotal, unknown; khi cả null giữ method error trước. Có explicit expected và before/after, không chỉ hai bản agree với nhau.

## Câu 4 · Policy dispatch đi đâu?

Entry validate method/subtotal rồi map lấy StandardPolicy, gọi FeePolicy.calculate. Implementation so>=500 trả0. Polymorphism gom behavior theo variant, không cấm threshold conditional bên trong; unknown vẫn error, không default miễn phí.

## Câu 5 · Hai nhánh ổn định có cần pattern?

Hai nhánh ổn định có thể giữ để dễ đọc. Polymorphism đáng cân nhắc khi behavior variation/lặp logic làm thay đổi khó; thêm types/indirection có cost. Không bắt Spring bean/factory, giải thích lựa chọn theo context thay vì ít if là tốt tuyệt đối.

## Câu 6 · Hai bản agree chưa đủ

Hai bản cùng sai vẫn agree. Cần oracle expected độc lập:500→0, cùng các biên/invalid. Mutation>=→> phải fail test boundary; giữ original baseline. Tests có evidence trên cases, không absolute proof mọi input hay performance.

## Câu 7 · Unit fee xanh, transaction có giữ?

Fee unit không kiểm Spring transaction/MVC. Private/self-invocation có thể mất proxy boundary; DTO schema có thể breaking. Tách thay đổi, giữ/kiểm transaction và HTTP tests cần thiết; không claim toàn shopcore an toàn từ mẫu fee xanh.

## Câu 8 · Test fail sau extraction

Nếu baseline ghi error/message/order thuộc contract, fail là regression cần tìm ở bước extraction. Restore behavior hoặc revert bước nhỏ. Nếu yêu cầu đổi error có thật thì task/tests riêng; không xóa assertion chỉ để xanh vì thích cấu trúc mới.

