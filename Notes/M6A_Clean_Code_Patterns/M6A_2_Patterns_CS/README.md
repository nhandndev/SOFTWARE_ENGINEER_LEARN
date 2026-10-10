# M6A-2 · Design Patterns: Creational & Structural

> Soạn sẵn theo roadmap: 16h, 4 buổi × 4h. Không tự mở module, ghi điểm hoặc xác nhận deliverable. Capstone vẫn là **shopcore**.

Bạn đã biết viết class, DTO, Lombok, Service và hiểu DI. Mục tiêu ở đây là hiểu **ai tạo object, object nào gọi object nào, vì sao cần lớp trung gian và cái giá của nó**. Không học thuộc sơ đồ rồi thêm interface ở mọi nơi.

## Bốn lesson

| Buổi | Bài học | Đề riêng | Bài giải / rubric |
|---|---|---|---|
| 1 | [Builder, Factory Method và Simple Factory](LESSON_01_BUILDER_FACTORY_METHOD.md) | [Đề 01](../../../Exams/de-kiem-tra/M6A-2-patterns-cs__2026-10-08__lesson1-lan1.md) | [Giải 01](../../../Exams/de-kiem-tra/M6A-2-patterns-cs__2026-10-08__lesson1-lan1__DAPAN.md) |
| 2 | [Abstract Factory, Prototype, Singleton](LESSON_02_ABSTRACT_FACTORY_PROTOTYPE_SINGLETON.md) | [Đề 02](../../../Exams/de-kiem-tra/M6A-2-patterns-cs__2026-10-08__lesson2-lan1.md) | [Giải 02](../../../Exams/de-kiem-tra/M6A-2-patterns-cs__2026-10-08__lesson2-lan1__DAPAN.md) |
| 3 | [Adapter và Facade](LESSON_03_ADAPTER_FACADE.md) | [Đề 03](../../../Exams/de-kiem-tra/M6A-2-patterns-cs__2026-10-08__lesson3-lan1.md) | [Giải 03](../../../Exams/de-kiem-tra/M6A-2-patterns-cs__2026-10-08__lesson3-lan1__DAPAN.md) |
| 4 | [Decorator, Proxy, Composite và review shopcore](LESSON_04_DECORATOR_PROXY_COMPOSITE_REVIEW.md) | [Đề 04](../../../Exams/de-kiem-tra/M6A-2-patterns-cs__2026-10-08__lesson4-lan1.md) | [Giải 04](../../../Exams/de-kiem-tra/M6A-2-patterns-cs__2026-10-08__lesson4-lan1__DAPAN.md) |

Mỗi đề theo chế độ **PHONG_VAN: 8 tình huống × 5 = 40 điểm**, đạt từ 34/40. Tổng 32 câu; không phải đề DAY_DU cuối module. Có thể trả lời bằng ý hiểu/pseudocode, không cần thuộc cú pháp testing. Năm ý công khai mỗi câu tương ứng năm tiêu chí trong file giải; không có cap ngầm.

## Cách đọc để hiểu bản chất

1. Đọc vấn đề **trước pattern**. Nếu không thấy vấn đề, đừng vội thêm class.
2. Theo một input cụ thể qua từng object trong trace; mũi tên là lời gọi method, không tự tạo HTTP request/thread mới.
3. Đọc code được đánh dấu `verify`: đây là mẫu Java độc lập trong tài liệu, không phải feature đã có trong shopcore. Các class lồng nhau giúp xem đủ code trong một chỗ; khi code thật mới quyết định package/file.
4. Nêu một trường hợp nên dùng và một trường hợp nên giữ cách đơn giản.
5. Làm đề trước khi mở bài giải; khi chấm sẽ ghi được gì, thiếu gì và đáp án đúng cho từng câu.

Mỗi buổi gợi ý: 90 phút đọc/trace, 45 phút tự thay input và dự đoán, 45 phút trả lời đề, 30 phút đối chiếu, 30 phút ghi note. Không yêu cầu đọc toàn GoF hoặc học Behavioral/DDD trước.

## Scope và bằng chứng

Roadmap yêu cầu Builder + Factory + một Structural trong shopcore, giải thích lựa chọn và một refactor có chủ đích. Bộ này chuẩn bị kiến thức và test mẫu; **không thay bài nộp, không tự ghi merged/pass**. Người học đang hoãn capstone, nên không tạo project mới hoặc sửa source thay bạn.

[Kế hoạch phủ kiến thức](LESSON_PLAN.md) · [Quy tắc chấm](QUY_TAC_CHAM.md) · [Kiểm chất lượng](QUALITY_REVIEW.md)

QA: từ thư mục gốc chạy `node Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/qa/verify.mjs` với JDK21 trong `JAVA_HOME`/PATH. Checker trích literal samples vào thư mục tạm và chạy assertions, không cần Maven/provider/network. Nó không chứng minh Spring proxy, transaction, SDK thật hoặc toàn shopcore đã chạy đúng.
