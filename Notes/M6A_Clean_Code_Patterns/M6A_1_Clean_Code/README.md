# M6A-1 · Clean Code & Refactoring thực chiến

> Soạn sẵn 20h / 5 buổi × 4h theo roadmap. Giữ 🔵 Chưa bắt đầu, không tự refactor source, không tự ghi đã sửa năm smells hoặc pass deliverable.

Bạn quen class/Lombok và code backend. Bộ này không bắt viết lại style; nó dạy **đọc đúng contract, tìm pain point thật, thay cấu trúc có lý do và chứng minh behavior được giữ**.

| Buổi | Lesson | Đề | Giải / rubric |
|---|---|---|---|
| 1 | [Naming, functions, comments](LESSON_01_NAMING_FUNCTIONS_COMMENTS.md) | [Đề 01](../../../Exams/de-kiem-tra/M6A-1-clean-code__2026-10-07__lesson1-lan1.md) | [Giải 01](../../../Exams/de-kiem-tra/M6A-1-clean-code__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [Long Method, God Class, Feature Envy](LESSON_02_LONG_METHOD_GOD_CLASS_FEATURE_ENVY.md) | [Đề 02](../../../Exams/de-kiem-tra/M6A-1-clean-code__2026-10-07__lesson2-lan1.md) | [Giải 02](../../../Exams/de-kiem-tra/M6A-1-clean-code__2026-10-07__lesson2-lan1__DAPAN.md) |
| 3 | [Data Clump, Primitive Obsession](LESSON_03_DATA_CLUMP_PRIMITIVE_OBSESSION.md) | [Đề 03](../../../Exams/de-kiem-tra/M6A-1-clean-code__2026-10-07__lesson3-lan1.md) | [Giải 03](../../../Exams/de-kiem-tra/M6A-1-clean-code__2026-10-07__lesson3-lan1__DAPAN.md) |
| 4 | [Safe refactoring và polymorphism](LESSON_04_SAFE_REFACTOR_POLYMORPHISM.md) | [Đề 04](../../../Exams/de-kiem-tra/M6A-1-clean-code__2026-10-07__lesson4-lan1.md) | [Giải 04](../../../Exams/de-kiem-tra/M6A-1-clean-code__2026-10-07__lesson4-lan1__DAPAN.md) |
| 5 | [Review code thật và refactor log](LESSON_05_REAL_REVIEW_REFACTOR_LOG.md) | [Đề 05](../../../Exams/de-kiem-tra/M6A-1-clean-code__2026-10-07__lesson5-lan1.md) | [Giải 05](../../../Exams/de-kiem-tra/M6A-1-clean-code__2026-10-07__lesson5-lan1__DAPAN.md) |

Mỗi đề PHONG_VAN có 8 tình huống × 5 = 40 điểm; đạt từ 34/40. Tổng **40 câu**, không phải đề DAY_DU cuối module. Chấm ý nghĩa, trade-off và safety net, không ép viết nguyên project/thuộc JUnit.

## Học từng buổi

Khoảng 90 phút đọc before/after, 45 phút tự review/test matrix, 45 phút trả lời đề, 30 phút đối chiếu rubric và 30 phút ghi kế hoạch sửa. Nếu thực hành thì làm nhỏ trong shopcore, không tạo project capstone khác; chưa muốn code có thể giải thích trước nhưng không claim đã thực hiện refactor.

Lesson04 có before/after phí giao hàng **giả định** để chạy và so sánh; không phải feature hiện có. Lesson05 đọc duplication construction trong handler thật của bạn nhưng chỉ đề xuất, không sửa/nộp thay bạn. Không bắt bỏ Lombok, dùng record hoặc thêm interface/pattern khi chưa cần.

Nếu bạn biết viết code nhưng khó giải thích bản chất, đọc chậm các walkthrough: **Lesson02 mục 8–9** theo dấu helper/extract class; **Lesson03 mục 6–7** theo dấu Address và object giá; **Lesson04 mục 3–5** chạy before/after và kiểm biên; **Lesson05 mục 8–9** theo dấu business/framework error rồi lập từng bước refactor. Mỗi ví dụ đều nói điều gì được giữ, điều gì chưa được kiểm chứng; không cần học thuộc định nghĩa để trả lời đề.

[Kế hoạch phủ kiến thức](LESSON_PLAN.md) · [Refactor log template](REFACTOR_LOG_TEMPLATE.md) · [Chấm điểm](QUY_TAC_CHAM.md) · [Kiểm chất lượng](QUALITY_REVIEW.md)

Roadmap yêu cầu ≥5 smell có thật trong shopcore, tests xanh trước/sau và refactor log. Theo cách học hoãn capstone, tài liệu/mẫu/QA của AI không tự ghi đã đủ năm, đã merge hoặc hoàn thành module. Không Big Bang rewrite.

## QA tái chạy

```bash
node Notes/QUALITY_AUDIT_2026_10_07/verify-m55-m6a1.mjs --self-test
node Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/qa/verify-examples.mjs
```

Lệnh thứ hai cần JDK21 (`JAVA_HOME` hoặc javac/java trong PATH), trích snippet vào temp và kiểm mẫu thuần Java. Không sửa project, không chứng minh Spring/MVC/JPA integration của shopcore.
