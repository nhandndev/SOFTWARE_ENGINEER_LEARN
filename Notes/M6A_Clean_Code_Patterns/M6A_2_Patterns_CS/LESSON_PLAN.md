# Kế hoạch phủ kiến thức M6A-2

| Roadmap | Lesson / câu | Độ sâu |
|---|---|---|
| Builder | L1 mục 2–4; C1–3 | Code nguyên bản, build-time invariant, Lombok, default, mutable builder |
| Factory Method | L1 mục 5–8; C4–8 | So Simple Factory/static factory/DI/Strategy, creator-product, trace override |
| Abstract Factory | L2 mục 1–3; C1–3 | Family, hai product roles, selection một lần, giới hạn tương thích |
| Prototype | L2 mục 4–5; C4–5 | Copy bằng method, mutable list, shallow/deep, JPA identity |
| Singleton + anti-pattern | L2 mục 6–8; C6–8 | Thread-safe init khác mutable state, Spring scope, lifecycle/testability |
| Adapter | L3 mục 1–4; C1–4 | Target/adaptee, mapping chiều đi/về, đơn vị và failure contract |
| Facade | L3 mục 5–7; C5–8 | Điều phối subsystem, call order, failure, không tự có transaction |
| Decorator | L4 mục 1–3; C1–2 | Same interface, delegation và thứ tự wrapper, failure propagation |
| Proxy | L4 mục 4–5; C3–4 | Control access, denied path, Spring proxy/self-invocation, scope test |
| Composite | L4 mục 6–7; C5–6 | Leaf/composite uniform call, recursion, empty/nested/duplicate/cycle |
| Pattern đã có / refactor có chủ đích / tránh thừa | L1, L4 mục 8–10; C7–8 | Đọc source Builder thật, không bịa SDK/service có sẵn, proposed khác tested |

Đi sâu Builder, Factory Method, Adapter, Decorator là các pattern trọng tâm deliverable. Các pattern còn lại vẫn có cơ chế, ví dụ và bẫy riêng; không ép áp hết vào shopcore để đủ điểm. Factory/Strategy có thể kết hợp nhưng creation khác execution; Behavioral thuộc M6A-3.

Lesson và đề phải khớp: không hỏi tool/framework chưa dạy; hỏi reasoning và test cases, không bắt thuộc annotation. Không coi việc AI chạy mẫu là người học đã thực hiện deliverable.
