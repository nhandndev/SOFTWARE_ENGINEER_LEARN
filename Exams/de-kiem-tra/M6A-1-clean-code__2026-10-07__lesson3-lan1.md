# M6A-1 Clean Code · Lesson 3 · Data Clump và types

Ngày soạn: 2026-10-07. Chế độ PHONG_VAN: 8 tình huống × 5 = 40 điểm; đạt từ **34/40**. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/LESSON_03_DATA_CLUMP_PRIMITIVE_OBSESSION.md). Trả lời bằng ý hiểu hoặc pseudocode, không ép thuộc tên API. Mỗi ý trong “Cần nói đủ” là 1 điểm; đúng một phần 0,5. Đề theo lesson, không phải DAY_DU cuối module; không tự xác nhận capstone/deliverable đã hoàn thành.

## Câu 1 · Address hay CommonRequest? (5đ)

street/ward/city/postalCode đi cùng ở ba method, còn report chỉ cần city. Team muốn mọi method nhận CommonRequest40 fields.

**Cần nói đủ:**

- Nhóm Address có concept gì?
- Invariant/owner giúp quyết định ra sao?
- CommonRequest nhiều field có trade-off gì?
- Report chỉ cần city nên nhận gì?
- Signature/callers bị ảnh hưởng thế nào?

**Trả lời:**

## Câu 2 · Bọc mọi String? (5đ)

Status String có nhiều spellings gây lỗi, còn label hiển thị đơn giản không có rule. Team muốn bọc tất cả thành value classes.

**Cần nói đủ:**

- Status nên dùng primitive/type nào, vì sao?
- Label đơn giản có cần class không?
- Primitive Obsession có phải cấm primitives không?
- Type mới nên bảo vệ điều gì?
- Legacy/unknown values và ceremony cần xét gì?

**Trả lời:**

## Câu 3 · ProductPrice constructor (5đ)

Dùng class ProductPrice trong bài, giá0 hợp lệ, giá âm và currency null không hợp lệ. Giải thích cơ chế và giới hạn.

**Cần nói đủ:**

- Constructor bảo vệ invariant như thế nào?
- Các input amount 0/âm/null được xử lý ra sao?
- Currency có contract gì?
- Final/immutable fields giữ trạng thái ra sao?
- Đưa rule mới vào code cũ có phải refactor thuần không?

**Trả lời:**

## Câu 4 · Cộng USD với VND (5đ)

ProductPrice100USD add100VND, caller mong200 vì đều BigDecimal.

**Cần nói đủ:**

- Chỉ cùng BigDecimal đã đủ cộng được chưa?
- Mẫu xử lý mismatch/null other ra sao?
- Conversion có nằm trong contract mẫu không?
- Cộng cùng currency thay object gốc thế nào?
- Rounding/scale cần policy gì?

**Trả lời:**

## Câu 5 · 1.0 và1.00 trong test (5đ)

Bạn test BigDecimal bằng equals rồi thắc mắc1.0 khác1.00, đồng thời dùng ProductPrice làm Map key nhưng chưa override equals/hashCode.

**Cần nói đủ:**

- BigDecimal.equals phân biệt điều gì?
- compareTo dùng cho kiểu so sánh nào?
- Chọn equality/assertion theo contract thế nào?
- Class mẫu đang có value equality chưa?
- Map/Set key cần thiết kế gì?

**Trả lời:**

## Câu 6 · Nội bộ mới, JSON cũ (5đ)

API cũ price/currency flat, nội bộ muốn dùng ProductPrice. Team serialize thẳng class mới để tiện.

**Cần nói đủ:**

- Internal type và API schema liên hệ thế nào?
- DTO boundary có thể giữ ra sao?
- Mapping hai chiều nên làm gì?
- Nếu đổi schema cần kế hoạch nào?
- Cần compatibility tests nào?

**Trả lời:**

## Câu 7 · Builder bỏ qua invariant (5đ)

Một class có constructor validate nhưng @Builder đặt trên đường tạo khác cho phép state thiếu currency. Developer bảo immutable final nên luôn hợp lệ.

**Cần nói đủ:**

- Final fields chứng minh valid state tới đâu?
- Các đường construction cần giữ điều gì?
- Builder tự làm validation gì?
- Có thể giữ class/Lombok thế nào?
- Bạn test null/invalid/construction paths ra sao?

**Trả lời:**

## Câu 8 · Null PATCH khác null price (5đ)

PATCH trước đây field vắng/null có ý nghĩa riêng. Type mới reject null và auto round mọi amount; team gọi pure refactor.

**Cần nói đủ:**

- Null/absent là phần contract nào?
- Reject null tác động PATCH ra sao?
- Auto rounding là loại thay đổi gì?
- Bạn preserve mapping hoặc tách change thế nào?
- Nêu boundary/schema test cases cần có.

**Trả lời:**
