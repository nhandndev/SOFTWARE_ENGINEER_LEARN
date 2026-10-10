# Kế hoạch phủ kiến thức · M6A-1

20h/5 buổi theo roadmap; lesson và đề luôn đi thành cặp. Không review năm smell giả rồi ghi source đã làm xong.

| Checklist | Lesson | Câu |
|---|---|---|
| Naming/function size/comments/self-documenting | L1 | L1 C1–8 |
| Long Method/God Class/Feature Envy | L2 | L2 C1–8 |
| Data Clump/Primitive Obsession | L3 | L3 C1–8 |
| Red→Green→Refactor an toàn | L4 mục1–2,5–6 | L4 C1–3/C6–8 |
| Extract method/class, rename | L1 mục2–4; L2; L5 | L1 C2–4; L2 C1–3/C7–8; L5 C1–2 |
| Replace conditional polymorphism | L4 mục3–5 | L4 C3–6 |
| Refactor log trước/sau/lý do | L5, template | L5 C1–8 |

## Review độc lập từng lesson

L1 không dạy luật10 dòng/cấm comment; naming phải khớp behavior, rename DTO có contract risk. L2 chọn responsibility, mapper/handler không tự smell; transaction/notify timing phải giữ. L3 phân biệt concept/invariant với primitive đơn giản, class immutable chưa tự có value equality, builder và serialization có compatibility. L4 before/after giữ threshold/error ordering, explicit expected không chỉ equivalence, không bắt polymorphism khi hai case ổn định. L5 chỉ dùng observation source có thật, tách proposed/implemented/tested, không lấy QA sample làm điểm/deliverable của người học.

Test safety net cần thiết để claim behavior-preserving dù người học từng hoãn module testing. Không biến lesson thành bắt nhớ full test framework: đề hỏi test cases/evidence, mẫu kiểm thuần Java được cung cấp cho việc đọc hiểu. Refactor thực tế sau này cần coverage đúng blast radius, gồm integration khi chạm boundary.
