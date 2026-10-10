# Kiểm chất lượng M6A-2 · 2026-10-08

## Task 1 · Context và phạm vi

Đã đọc AGENTS, roadmap M6A-2, prompt tạo đề, tiến độ, format M6A-1 và source DTO/common hiện tại. Module 16h/4 buổi, đủ năm Creational và năm Structural đã liệt kê trong roadmap. Không thêm Bridge/Flyweight/Behavioral/DDD thành điều kiện ngầm. Giữ class/Lombok, tư duy và trace; không tạo learner project mới hoặc thay capstone shopcore.

## Task 2 · Lesson01 + đề/giải

Builder manual có build-time invariant, defaults, error order, reuse và mutable builder; phân biệt Lombok generated API với validation/immutability. Factory Method có đủ Creator/Product và concrete overrides, trace hai lần dispatch; Simple Factory/static factory/Strategy/DI không bị gộp tên. Marker export không bị gọi serializer thật. Tám câu tương ứng nội dung, năm ý công khai mỗi câu khớp rubric; không bắt thuộc framework.

## Task 3 · Lesson02 + đề/giải

Abstract Factory có hai product roles/family và trade-off thêm family vs role; ghi rõ type contract không tự cấm custom factory mix. Prototype dùng method copy, list riêng/String share, snapshot getter khác immutable object; copy JPA identity không được coi tạo mới tự động. Singleton phân biệt initialization, mutable state, classloader/JVM, Spring per-container/per-bean và prototype scope khác pattern. Tám câu bám nội dung, không yêu cầu implementation distributed singleton.

## Task 4 · Lesson03 + đề/giải

Adapter có Target/Adaptee và mapping units hai chiều call/return: lab USD cents cố định, không mọi currency. Input trước vendor, negative response/error propagation, không default failure thành0. Facade có load/render/store, failure matrix và partial side effect; không tự transaction/retry an toàn. Có sequence diagram kèm giải thích từng arrow, không chỉ Mermaid. Tám câu kiểm semantics/boundary, không giả SDK thật đã test.

## Task 5 · Lesson04 + đề/giải

Decorator cùng interface/delegation, outputs khác khi đổi order; Proxy intent access khác decoration, denied no-call và check mỗi read. Spring proxy/self-invocation là cơ chế riêng cần integration. Composite có recursive operation, empty/duplicate/overflow/snapshot và cycle/depth/JPA gaps. Review chỉ claim Builder thật trong source, không invent Factory/Structural/deliverable. Tám câu bám lesson, có phương án giữ đơn giản, không ép mọi wrapper là pattern.

## Task 6 · Kiểm tự động và giới hạn

Lệnh tái chạy từ root, cần JDK21:

```bash
node Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/qa/verify.mjs --self-test
```

Checker đọc link/fence/count/resources/năm ý hỏi và năm tiêu chí, sau đó trích **năm literal samples** vào temp, compile/run assertions từ qa/PatternChecks.java. Các fragment Lombok/usage không đánh dấu verify không được claim đã compile. Structural probes chỉ kiểm checker, không thay review semantics.

Fault modes `--fault=adapter`, `--fault=copy`, `--fault=guard`, `--fault=wrapper` chỉ sửa bản trích trong temp. Mỗi fault đúng phải compile rồi fail assertion tương ứng; cần chạy lại bản gốc xanh sau probes. Không sửa source lesson/shopcore để thử mutation.

QA không chứng minh SDK/storage, concurrency mutable state, Spring proxy/transaction/MVC, JPA query/session hoặc chất lượng model; không benchmark và không chứng minh mọi input.

### Kết quả thực thi

- Baseline JDK21 compile/run thành công: **100 assertions** qua năm literal samples. Covered Builder defaults/biên/error order/reuse, Simple Factory/Factory Method dispatch/errors/order, Abstract Factory A/B/data/order, Prototype input/copy/getter snapshot, Singleton reference trong scope mẫu, Adapter units/scale/errors/no-call, Facade order/data/stop-on-failure, Decorator order/error propagation, Proxy deny/allow/check lại mỗi call, Composite nested/empty/duplicate/snapshot/overflow.
- **16 Markdown, 4 lesson, 32 câu, 32 rubric, 27 local links, 5 literal samples**, không lỗi checker. Năm structural fault probes phát hiện thiếu fence/link/resources/ý hỏi/điểm rubric; baseline phải sạch trước khi chạy probes, tránh PASS giả vì lỗi nền.
- Fault Adapter đổi scale2 thành1: compile được, fail `adapter amount/scale 1` (1 cent không còn0.01). Fault Prototype trả this: fail `prototype new identity`. Fault Proxy đảo allowed: fail vì denied path không throw SecurityException. Fault Decorator đổi prefix thành suffix: fail `bracket outside prefix`. Đây là bốn mutations nhỏ, không chứng minh test bắt mọi lỗi.
- Sau mutations, chạy lại bản gốc và checker self-test: **100 assertions xanh**, không giữ fault trong source/tài liệu.
- So hash27 protected files (roadmap và source/project ngoài build/IDE artifacts) không đổi; file05 chỉ thêm nhãn tài liệu M6A-2. Không đổi trạng thái/điểm/ngày/log/con trỏ/checklist. Đề mới không ghi nhận điểm học hoặc snapshot chấm bài giả.

## Task 7 · Tài liệu tham khảo và đồng bộ

Đối chiếu trang tác giả Refactoring.Guru cho các pattern với docs chính thức Lombok, Spring scopes/proxy, Java Object.clone/BigDecimal và JLS class initialization. Từng lesson có tài liệu và video search keywords; không giả đã xem/chọn video chưa kiểm. Các ví dụ tự soạn, không copy dự án/source từ sách hoặc tutorial.

Đồng bộ chọn lọc module, tám file đề/giải, index M6A và tiến độ sang Vault Documents; giữ backup nếu file đích khác. Không đồng bộ toàn bộ Downloads hoặc chạm AWS/AI_Engineer. Không thay cơ chế auto-sync hiện có. Kết quả so hash bản đích được kiểm riêng sau thao tác copy; QA ở đây không phải deliverable của học viên.
