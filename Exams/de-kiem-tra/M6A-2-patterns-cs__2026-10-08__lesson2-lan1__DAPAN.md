# Bài giải / rubric · M6A-2 Lesson 02

40đ, đạt34. Mỗi tiêu chí1đ: đủ1, đúng hướng thiếu điều kiện0,5, sai/thiếu0. Không cap ngầm, chấp nhận ý nghĩa tương đương. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/LESSON_02_ABSTRACT_FACTORY_PROTOTYPE_SINGLETON.md) · [Quy tắc](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Encoder và Signer roles (1); Chọn factory ngoài client, tạo trong constructor (1); encode rồi sign (1); A-sign(A:Book)/B-sign(B:Book), marker không crypto (1); Client qua interfaces, composition vẫn biết concrete factory (1) |
| 2 | C implement hai product roles qua factory (1); Thêm role sửa factory interface và implementations/client liên quan (1); Tránh caller mix family (1); Hai hướng expansion có cost khác nhau (1); Inject Encoder ổn định trực tiếp có thể đủ (1) |
| 3 | Mẫu interface không cấm mix (1); Family contract cần tương thích (1); Implementation/contract test cặp và call order (1); Family composition khác creator override, có thể kết hợp (1); Không gom object không cohesive (1) |
| 4 | Object/list mới, String immutable có thể share (1); Base[id,name],detail[id,name,price] (1); Getter snapshot unmodifiable; template vẫn mutable (1); Mutable elements cần ownership/copy policy (1); Không bắt Cloneable, performance cần đo (1) |
| 5 | Giữ id có thể update/identity conflict (1); Quyết định reset id/version/audit và unique SKU theo rule (1); Quan hệ copy/share theo ownership (1); Duplicate feature không mặc định refactor thuần (1); Test persistence/new identity/constraints và original unaffected (1) |
| 6 | Holder an toàn khởi tạo/publish, không mọi method (1); Per-class/classloader không distributed singleton (1); currentUser/shared mutable gây race/leak (1); Request locals/context; shared state cần concurrency design (1); Test concurrency/policy, không suy từ single-thread test (1) |
| 7 | Per-bean definition/per-container (1); Hai definitions/contexts có thể hai instances (1); New bean lookup khác copy prototype (1); Inject một lần giữ reference, không tự mới mỗi request (1); DI/scope/lookup/lifecycle cần thiết kế/kiểm thực (1) |
| 8 | Stateless DI service thường scope đủ (1); Static access giấu dependency/khó fake (1); Không tự lifecycle/proxy quản lý (1); Giữ DI hoặc change có nhu cầu rõ, nêu cost (1); Proposed/tests planned/gaps trung thực (1) |

## Câu 1 · Hai sản phẩm cùng một family

Composition chọn PartnerAFactory rồi PackageClient constructor lấy Encoder/Signer qua hai methods. prepare encode trước, sign sau; kết quả A-sign(A:Book), đổi factoryB ra B-sign(B:Book). Marker là toy, không chữ ký bảo mật. Client không cần biết implementation nhưng composition vẫn phải chọn factory cụ thể; abstraction không xóa nhu cầu cấu hình.

## Câu 2 · Hai trục mở rộng

Thêm familyC thường thêm factory và implementations C cho roles sẵn có, không đổi workflow client. Thêm Compressor là thêm role vào contract nên sửa interface, mọi factory và client cần role đó. Family hữu ích để tạo objects tương thích theo cùng lựa chọn; không mở rộng miễn phí theo mọi hướng. Chỉ một Encoder ổn định thì inject nó trực tiếp có thể rõ hơn.

## Câu 3 · Interface không chứng minh semantics

Custom factory trộn A/B vẫn có thể compile vì Encoder và Signer không encode family ở type. Contract/implementation phải giữ cặp tương thích, kiểm cả outputs và order. Abstract Factory nhấn family nhiều roles qua factory object; Factory Method nhấn điểm tạo overridable trong creator. Chúng có thể phối hợp, không đồng nghĩa. JWT/DB/email không tự là family chỉ vì có thể new.

## Câu 4 · Copy có ranh giới

detail là instance mới, constructor tạo ArrayList mới từ columns. Sửa detail không đổi base; base[id,name],detail[id,name,price]. Getter trả snapshot không sửa được, nhưng addColumn làm template mutable. Strings immutable được share hợp lý; mutable Column cần copy hoặc policy sharing rõ. Copy method không bắt Cloneable; lợi ích performance cần đo, không mặc định.

## Câu 5 · Copy entity là nghiệp vụ khác

Giữ identity rồi save có thể update row cũ hoặc conflict, không đảm bảo insert mới. Duplicate use case phải quyết định id/version/audit, SKU uniqueness và ownership quan hệ; có thể share category chứ không clone cả graph. Đây là feature nếu thay behavior, không tự refactor. Kiểm new identity, constraint, quan hệ và original không bị sửa bằng persistence/integration phù hợp, không chỉ so object fields.

## Câu 6 · Tách initialization và state

Holder dựa class initialization để tạo/publish instance trong phạm vi classloader; không một instance across JVM. currentUser/list mutable có thể race hoặc lộ state giữa requests. Dùng dữ liệu theo request ở local/context đúng, thiết kế synchronization/immutable state khi thật sự share. Single-thread unit không chứng minh concurrent policy đúng; cần kiểm theo state, operations và invariant thực.

## Câu 7 · Scope không phải copy

Spring singleton là per bean definition/per container nên hai definitions hoặc contexts có thể có hai instances. Prototype scope tạo bean mới khi được lookup theo cơ chế tương ứng; Prototype pattern copy object mẫu. Inject prototype một lần vào singleton chỉ có reference đã inject, không tự tạo mới mỗi request. Thiết kế scope/lookup khi cần, giữ lifecycle và test wiring; không buộc nhớ API lookup ở câu này.

## Câu 8 · Đừng thay DI bằng global state khi không có vấn đề

Stateless service do container quản thường không cần GoF Singleton thêm. Static getInstance làm dependency ẩn, khó thay fake/config và instance tự new không tự có Spring lifecycle/AOP. Giữ constructor DI có lý do là đáp án tốt; thay chỉ khi chứng minh requirement và cost. Chưa làm thì Proposed, tests planned và gaps, không claim lifecycle tests thừa vì ít instance.
