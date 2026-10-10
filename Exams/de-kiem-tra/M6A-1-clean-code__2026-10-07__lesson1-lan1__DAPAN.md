# Bài giải / rubric · M6A-1 Clean Code Lesson 1

40 điểm, đạt 34. Mỗi tiêu chí 1 điểm: đủ và đúng = 1; đúng hướng nhưng thiếu điều kiện = 0,5; sai/thiếu = 0. Chấm ý nghĩa tương đương, không ép câu chữ; không cap ngầm. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/LESSON_01_NAMING_FUNCTIONS_COMMENTS.md) · [Quy tắc chấm](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Nêu tên cần thể hiện domain/intent (1); Nêu boolean flag khó đọc (1); Làm rõ input/output/error/side effects (1); Không giấu save/email dưới tên chỉ đọc (1); Chọn signature/tên theo contract chứ không chỉ ít ký tự (1) |
| 2 | IDE rename không chứng minh external compatibility (1); Field có thể thuộc JSON contract (1); Kiểm serialization/binding/client (1); Giữ schema hoặc có migration rõ (1); Phân biệt private local rename với public contract (1) |
| 3 | Không có ngưỡng dòng tuyệt đối (1); Chọn một concept/mức trừu tượng (1); Helper cần tên có nghĩa (1); Tính chi phí indirection (1); Giữ/tách dựa complexity thực (1) |
| 4 | Null check phải xét trước truy cập (1); Thứ tự checks là behavior (1); Giữ not-found/inactive contract (1); Kiểm side effects quanh checks (1); Test null/inactive/normal trước và sau (1) |
| 5 | Comment narration thường dư (1); Comment lý do/contract có giá trị (1); Tên tốt không kể hết quyết định (1); Cập nhật comment tránh stale (1); TODO cần lý do/điều kiện, không lưu code chết (1) |
| 6 | Tên cần nói read vs command (1); Null/Optional/throw contract phải rõ (1); Tạo row/notify là side effects (1); Chọn tên hoặc tách behavior thích hợp (1); Convention thống nhất, không ép một từ khóa tuyệt đối (1) |
| 7 | Builder chỉ giảm boilerplate, không tự invariant (1); Stream không tự cải thiện query/performance (1); Nhận diện query mỗi phần tử/N+1 risk (1); Đánh giá behavior/readability trước (1); Đo/test thay vì kết luận từ dòng code (1) |
| 8 | Nêu unit ambiguity (1); Đề xuất Duration hoặc tên có đơn vị (1); Object/generic util che type/intent (1); Abstraction chỉ khi cùng concept thật (1); Kiểm config/API contract nếu đổi đơn vị (1) |

## Câu 1 · Tên không nói behavior

Tên process và true mơ hồ; hỏi intent và contract cụ thể, phân biệt create/send/validate với query. Đặt tên/signature giúp caller biết lựa chọn và side effects; có thể tách command khi có concept thật. Không chỉ rename đẹp mà vẫn giấu save/email hoặc tạo abstraction không cần.

## Câu 2 · Rename field DTO

Field DTO có thể ảnh hưởng JSON/binding dù IDE sửa hết Java references. Cần contract test và kiểm client/config/reflection liên quan. Giữ schema hoặc làm migration riêng; rename private local khác rename tên đi qua boundary. Không claim chỉ internal khi chưa xác minh.

## Câu 3 · Function dưới10 dòng?

Số dòng là tín hiệu, không verdict. Tách concept ở mức trừu tượng rõ và tên có nghĩa; step1/step2 không giúp hiểu, nhiều nhảy file tăng cost. Method30 dòng cohesive có thể tốt hơn; giữ/tách bằng clarity/testability/duplication thật.

## Câu 4 · Guard clause đổi thứ tự lỗi

Gọi active trước null có thể NPE và đổi error ưu tiên. Guard clauses phải giữ not-found rồi inactive và side effects tương ứng. Test null, inactive, normal và interactions; giảm nesting không cho phép đổi contract mà gọi refactor thuần.

## Câu 5 · Comment nào đáng giữ?

set name lặp assignment thường dư. Comment first error giải thích quyết định tương thích đáng giữ; tên tốt không đủ kể vì sao. Cập nhật theo contract, TODO có điều kiện/lý do và dùng Git thay block code chết; không cấm mọi comment máy móc.

## Câu 6 · getProduct tự tạo dữ liệu

get/find có contract theo team nhưng phải rõ missing behavior. Tự tạo/notify dưới tên chỉ đọc làm caller không dự đoán side effects. Tách hoặc đặt tên command nói đúng việc; find Optional/getRequired throw chỉ là convention ví dụ, không một chuẩn tên duy nhất.

## Câu 7 · Lombok và stream là clean tự động?

Builder không tự validate domain; stream không đổi network/query cost và map query từng item có N+1 risk. Giữ Lombok nếu hợp style nhưng review invariant, rõ side effects và query/measurement. Ít dòng không là evidence nhanh/clean.

## Câu 8 · Tên đơn vị và generic util

time30 mơ hồ unit; dùng timeoutMillis hoặc Duration đúng contract. Object util che type và responsibilities, không gộp chỉ vì hình thức giống. Nếu đổi unit/config/API phải kiểm compatibility, không rename rồi âm thầm đổi30 seconds thành30ms.

