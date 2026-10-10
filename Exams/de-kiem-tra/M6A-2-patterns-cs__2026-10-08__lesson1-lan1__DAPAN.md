# Bài giải / rubric · M6A-2 Lesson 01

40đ, đạt34. Mỗi tiêu chí1đ: đủ/đúng1, đúng hướng thiếu điều kiện0,5, sai/thiếu0. Chấm ý nghĩa, không cap ngầm hoặc ép câu chữ. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/LESSON_01_BUILDER_FACTORY_METHOD.md) · [Quy tắc](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Builder mới, chưa request (1); destination sửa builder/trả this (1); default100 từ builder field (1); build gọi constructor validate (1); request cũ giữ String/int snapshot theo mẫu (1) |
| 2 | destination error trước limit theo constructor (1); 1/1000 valid,1001 fail (1); Không tự @Valid/save (1); Constructor/build path giữ invariant (1); Test missing/blank/0/biên/error order (1) |
| 3 | Builder giảm construction boilerplate (1); Setter/đường tạo khác không tự immutable/valid (1); Kiểm @Builder.Default/placement và default0/null (1); Builder trên constructor validate hoặc tương đương (1); Test paths; manual QA không prove Lombok thật (1) |
| 4 | ExportJob creator, Exporter product, subtypes đúng (1); run ở base ExportJob (1); override dispatch JsonJob.createExporter (1); JsonExporter.export trả JSON:Book (1); new trong creator, không Spring/HTTP tự động (1) |
| 5 | Simple Factory gom selection/creation (1); GoF có creator extension override (1); Tên static method không đủ (1); Hierarchy/indirection/test cost (1); Chọn simple/giữ với lý do ổn định, không pattern bắt buộc (1) |
| 6 | Factory là creation/obtaining (1); Strategy là execution/algorithm (1); DI cung cấp dependency, có thể kết hợp (1); New không tự có Spring lifecycle/AOP; DTO thuần được (1); Lựa chọn theo variation/complexity thật (1) |
| 7 | Null format IAE format is required (1); XML IAE unsupported format (1); Null name NPE name is required trước create (1); Fallback CSV là behavior change (1); Explicit expectations/error order/type và biên (1) |
| 8 | Annotation/call builder là observation thật (1); Không suy immutable/đủ deliverable/đã test (1); Tìm construction variation/pain point (1); Cân simple options với extra types (1); Proposed/planned tests/gaps, không PASS giả (1) |

## Câu 1 · Lắp rồi chốt

builder() tạo Builder riêng, destination sửa field và trả this cho fluent call. Không set limit thì builder giữ100. build mới gọi constructor kiểm destination rồi limit, tạo ExportRequest. Với String/int final trong mẫu, builder đổi sau không đổi request cũ; không tổng quát thành deep immutability cho mọi reference field.

## Câu 2 · Đọc đúng thứ tự lỗi

Lần đầu thiếu destination và limit0 cùng sai, constructor throw `IllegalArgumentException("destination is required")` trước khi xét limit. Với destination hợp lệ,1 và1000 được phép,1001/0 bị `limit must be 1..1000`. Test cả thiếu/blank, biên và hai lỗi cùng lúc. Build không tự invoke Bean Validation hoặc persistence; invariant do code constructor giữ.

## Câu 3 · Annotation không thay contract

Lombok tạo builder-style methods, không tự sinh business validation. Có setters thì DTO không immutable; no-args/all-args hoặc factory khác cũng cần xét invariant. Field initializer trên class không tự là builder default nếu chưa thiết kế đúng @Builder.Default. Có thể đặt Builder trên constructor validate; test từng construction path/default/invalid trong project thật. Mẫu manual chỉ kiểm cơ chế mẫu, không chứng minh Lombok wiring/generated code của bạn.

## Câu 4 · Hai lần dispatch

Caller giữ ExportJob nhưng instance JsonJob. run ở base gọi factory method dispatch tới JsonJob.createExporter, trả JsonExporter qua interface Exporter. Gọi export dispatch lần nữa và nhận `JSON:Book`. Product ở thuật ngữ pattern không phải entity Product. new vẫn nằm trong ConcreteCreator; không tự có bean/container/network.

## Câu 5 · Không ép hierarchy

Simple Factory dùng input chọn implementation ở một chỗ. GoF Factory Method có creator workflow với điểm tạo overridable cho subclass. Method static tên create/of chưa đủ cấu trúc này. Với hai format ổn định và chưa có workflow extension thật, simple factory hoặc injection hợp lý; hierarchy thêm types, indirection và tests mà chưa chắc thêm lợi ích. Chấp nhận lựa chọn khác nếu chứng minh nhu cầu thật, không chấm theo số class.

## Câu 6 · Tách ba câu hỏi

Factory quyết định cách có implementation; Strategy đóng gói thuật toán/hành vi; DI truyền dependency từ bên ngoài. Factory có thể trả Strategy, DI có thể cung cấp factory hoặc implementation. New một bean-dependent class không tự nhận AOP/lifecycle/config; new DTO thuần không sai. Chỉ cần một implementation thì constructor injection thường đủ; có creation variation thực mới cân factory. Không ép đúng một framework để đạt điểm.

## Câu 7 · Failure contract

Null format→IAE `format is required`; XML→IAE `unsupported format`. CsvJob.run(null) dùng Objects.requireNonNull nên NPE `name is required` trước createExporter. Fallback CSV đổi lỗi thành success khác contract; tách yêu cầu nếu muốn hỗ trợ default. Test explicit output/type/message/order bên cạnh before-after, không lấy hai bản cùng sai làm oracle.

## Câu 8 · Evidence trung thực

Source có @Builder và handler gọi builder là evidence construction style. Nó không chứng minh mọi invariant, tests hay Builder+Factory+Structural deliverable. Tìm pain point chọn implementation/khởi tạo thực, so constructor/helper/injection với factory; chưa có nhu cầu thì giữ. Log Proposed với vị trí/source, contract giữ, planned cases và gaps; không tự viết đã merge hoặc đạt vì xem mẫu.
