# Bài giải / rubric · M6A-1 Clean Code Lesson 3

40 điểm, đạt 34. Mỗi tiêu chí 1 điểm: đủ và đúng = 1; đúng hướng nhưng thiếu điều kiện = 0,5; sai/thiếu = 0. Chấm ý nghĩa tương đương, không ép câu chữ; không cap ngầm. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/LESSON_03_DATA_CLUMP_PRIMITIVE_OBSESSION.md) · [Quy tắc chấm](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Nhận diện nhóm có concept Address (1); Invariant/owner cùng nhau (1); Không gom mọi field không liên quan (1); Report chỉ cần city không bắt phụ thuộc toàn Address (1); Cân nhắc thay đổi signature/callers (1) |
| 2 | Status có tập/rule có thể enum/type (1); Label đơn giản có thể String (1); Primitive Obsession không cấm primitives (1); Type phải bảo vệ concept/invariant (1); Cân nhắc legacy/unknown values và ceremony (1) |
| 3 | Constructor giữ invariant lab (1); 0 hợp lệ, âm/null amount reject (1); Currency bắt buộc (1); Final fields/immutable dependencies không setters (1); Không áp rule mới vào code cũ rồi gọi refactor (1) |
| 4 | Amount không đủ nếu khác currency (1); Mẫu reject mismatch/null other (1); Không tự conversion (1); Add cùng currency trả object mới (1); Rounding/scale cần policy riêng (1) |
| 5 | BigDecimal equals xét scale (1); compareTo so numeric value phù hợp một số contract (1); Chọn equality theo domain chứ không xóa test (1); Class mẫu chưa value equality (1); Map/Set key cần equals/hashCode đồng bộ khi muốn value semantics (1) |
| 6 | Internal type không bắt đổi API schema (1); Giữ request/response class boundary (1); Map flat fields sang nội bộ và ngược lại (1); Nếu đổi schema cần migration/compatibility (1); Test JSON và persistence liên quan (1) |
| 7 | Final không tự đảm bảo valid state (1); Mọi đường tạo cần invariant (1); Builder không tự validation (1); Giữ class/Lombok được nếu thiết kế đúng (1); Test null/invalid và các construction paths (1) |
| 8 | Null/absent semantics là contract (1); Reject null có thể đổi PATCH behavior (1); Auto rounding là business/numeric change (1); Preserve mapping hoặc tách change có yêu cầu (1); Test boundary/zero/null/schema trước sau (1) |

## Câu 1 · Address hay CommonRequest?

Nhóm địa chỉ có thể thành Address nếu cùng rule/owner, giảm truyền nhầm. CommonRequest40 fields che responsibility; report chỉ city không cần nguyên Address. Xét callers/signature và compatibility, không gom chỉ vì parameter count.

## Câu 2 · Bọc mọi String?

Enum/type có ích cho status hữu hạn/rule lặp, nhưng phải xử lý legacy/unknown. Label đơn giản dùng String có thể đủ. Không cấm primitives hay bọc mọi thứ; cân lợi invariant với ceremony/compatibility.

## Câu 3 · ProductPrice constructor

Constructor kiểm amount non-null/non-negative và currency non-null;0 được phép theo contract lab. Final fields và immutable BigDecimal/Currency không setters giữ trạng thái. Rule này là giả định mẫu; thêm validation mà code cũ cho phép khác là behavior change, không refactor thuần.

## Câu 4 · Cộng USD với VND

Amount cùng kiểu không làm currency giống. Mẫu reject mismatch/null, không conversion và add cùng currency tạo object mới. Conversion/rounding/scale cần contract/rate riêng, không suy BigDecimal tự xử lý tiền hoàn chỉnh.

## Câu 5 · 1.0 và1.00 trong test

BigDecimal.equals xét cả scale, compareTo có thể0 khi numeric bằng. Chọn assertion/domain equality theo contract. ProductPrice mẫu chưa override nên không tự value-equal; muốn Map/Set value semantics phải thiết kế equals/hashCode đồng bộ, không gọi nó thư viện Money đầy đủ.

## Câu 6 · Nội bộ mới, JSON cũ

Có thể giữ DTO flat rồi map ProductPrice nội bộ, không bắt serialize nested schema mới. Đổi API/DB representation là contract/migration task riêng, cần compatibility tests. Kiểm JSON và persistence/callers nếu liên quan, không gọi breaking schema là cleanup.

## Câu 7 · Builder bỏ qua invariant

Final chỉ hạn chế assignment, không chữa initial state sai. Mọi constructor/factory/builder phải đi qua validation hoặc giữ cùng invariant. Vẫn dùng class/Lombok hợp style; kiểm null/invalid ở từng đường tạo, không bỏ builder hoặc thêm annotation để giả an toàn.

## Câu 8 · Null PATCH khác null price

Null/absent trong PATCH cần giữ nghĩa đã định, không reject thẳng qua type mới nếu làm khác contract. Auto rounding cũng đổi numeric behavior. Giữ boundary/mapping hoặc tách yêu cầu change; test null/absent/zero/scale/schema, không gọi pure refactor mặc định.

