# M4-3 · TDD & Test Coverage

> Bộ bài soạn sẵn. Không đổi trạng thái học, không tự cho pass M1-6/M4-3, không sửa POM hoặc code shopcore thay bạn.

**Mục tiêu không phải thuộc code test. Mục tiêu là biết một phép kiểm có thật sự phát hiện rule bị viết sai hay không, và build có thật sự chặn lỗi không.**

| Lesson | Nội dung | Đề | Bài giải và rubric |
|---|---|---|---|
| 01 | [Red → Green → Refactor trên phí vận chuyển](LESSON_01_TDD_RED_GREEN_REFACTOR.md) | [Đề 1](../../../Exams/de-kiem-tra/M4-3-tdd-coverage__2026-10-07__lesson1-lan1.md) | [Giải 1](../../../Exams/de-kiem-tra/M4-3-tdd-coverage__2026-10-07__lesson1-lan1__DAPAN.md) |
| 02 | [Unit, slice, integration và mock đúng chỗ](LESSON_02_TEST_LEVELS_MOCK_BOUNDARIES.md) | [Đề 2](../../../Exams/de-kiem-tra/M4-3-tdd-coverage__2026-10-07__lesson2-lan1.md) | [Giải 2](../../../Exams/de-kiem-tra/M4-3-tdd-coverage__2026-10-07__lesson2-lan1__DAPAN.md) |
| 03 | [JaCoCo: số đo, report và threshold](LESSON_03_JACOCO_METRICS_MAVEN_GATE.md) | [Đề 3](../../../Exams/de-kiem-tra/M4-3-tdd-coverage__2026-10-07__lesson3-lan1.md) | [Giải 3](../../../Exams/de-kiem-tra/M4-3-tdd-coverage__2026-10-07__lesson3-lan1__DAPAN.md) |
| 04 | [CI gate và bằng chứng test có ích](LESSON_04_CI_GATE_MEANINGFUL_TESTS.md) | [Đề 4](../../../Exams/de-kiem-tra/M4-3-tdd-coverage__2026-10-07__lesson4-lan1.md) | [Giải 4](../../../Exams/de-kiem-tra/M4-3-tdd-coverage__2026-10-07__lesson4-lan1__DAPAN.md) |

## Cách học

Roadmap 16h: bốn buổi khoảng 4h. Đọc một lesson, tự dự đoán kết quả các tình huống rồi làm đề tương ứng. Mỗi đề **PHONG_VAN theo lesson**, 8 tình huống ×5đ=40đ, đạt từ34/40. Tổng32 câu, không phải đề DAY_DU tổng module. Được dùng lời/pseudocode, không bắt thuộc import/annotation/flag; chấm đúng cơ chế và bằng chứng.

M1-6 Testing đang hoãn: Lesson01 nhắc lại JUnit/AAA đủ để bắt đầu; Lesson02 dạy mock/slice thực sự cần. Không yêu cầu hoàn tất toàn M1-6 trước khi đọc tài liệu này, nhưng cũng không coi đọc M4-3 là đã hoàn thành Testing.

## Bối cảnh nhất quán

- Java21, Maven, shopcore Boot4.1.1 hiện tại. Boot4 dùng JUnit Jupiter với BOM hiện hành, có thể là JUnit6; package `org.junit.jupiter.api` vẫn quen thuộc. Không pin JUnit5 từ tutorial cũ vào BOM Boot4 chỉ vì tên bài M1-6 có “JUnit5”.
- Feature nhỏ minh họa: **phí vận chuyển nội bộ**, không gọi provider M3-5. Tổng tiền không âm; dưới500000 VND phí30000; từ500000 miễn phí. Đây là rule học, không quy tắc thương mại phổ quát.
- Unit rule không cần Controller/DB/Security. Khi tích hợp vào shopcore, các lớp Spring/controller/adapter phải được nối và kiểm riêng; đoạn Java thuần không tự thành Spring bean.
- DTO dùng class, tiền dùng BigDecimal. Không tạo project capstone khác; fixture tạm dùng kiểm chất lượng tài liệu không phải bài giao cho bạn.
- Gate mẫu chọn **LINE COVEREDRATIO ≥0.70 trên BUNDLE một Maven module**, gồm production classes trong module, không âm thầm chỉ đo class đẹp nhất. Branch coverage được đọc thêm; không bắt branch70 nếu chưa cấu hình.
- Không thêm PIT/mutation testing bắt buộc, không multi-module aggregation, không ép viết hàng trăm test hoặc gọi AI/provider thật. Liên hệ AI: test logic deterministic và contract client; không dùng coverage Java để tuyên bố model thông minh/đúng.

## Kết quả cần phân biệt

Đọc xong → hiểu khái niệm. Làm đề đạt → đạt phần kiểm kiến thức lesson. Deliverable gốc → một feature có lịch sử Red/Green/Refactor, tests có ích, JaCoCo≥70 và CI thực sự fail dưới ngưỡng. Chưa code/merge/chạy CI thì không ghi nhận đã có deliverable; vẫn theo quyết định học hiện tại của bạn.

[Kế hoạch coverage](LESSON_PLAN.md) · [Quy tắc chấm](QUY_TAC_CHAM.md) · [Kiểm chất lượng](QUALITY_REVIEW.md).

## Kiểm lại ví dụ

Kiểm cấu trúc nhanh, không chấm nội dung bằng máy:

```bash
node Notes/M4_DevOps_Engineering/M4_3_TDD_Coverage/verify-structure.mjs
```

Trên macOS có JDK21 và cached Maven dependencies như môi trường hiện tại:

```bash
JAVA_HOME=$(/usr/libexec/java_home -v 21) node Notes/M4_DevOps_Engineering/M4_3_TDD_Coverage/verify-examples.mjs
```

Harness trích đúng Java/XML từ lesson, thêm boilerplate Maven và stub common API để chạy trong thư mục tạm. Nó cố ý tạo test/coverage failure rồi kiểm đúng lý do, không sửa source/POM shopcore. Chưa có dependency trong cache thì offline run fail setup, không được kết luận lesson business sai. Kết quả và giới hạn trong QUALITY_REVIEW.
