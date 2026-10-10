# M4-4 · Logging & Hexagonal Skeleton

> Tài liệu chuẩn bị sẵn theo roadmap 14h. Không tự mở module, cho pass hoặc ghi nhận đã merge deliverable. Không sửa code/POM shopcore thay bạn.

Bạn đã quen Controller → Service → Repository. Module này trả lời hai câu thực tế: **request lỗi thì tìm dấu vết ở đâu**, và **đổi cách lưu/gọi dịch vụ thì phần nghiệp vụ có phải viết lại không**.

| Lesson | Bài học | Đề | Bài giải, rubric |
|---|---|---|---|
| 01 | [SLF4J, Logback và log có ích](LESSON_01_LOG_LEVELS_SAFE_LOGGING.md) | [Đề 1](../../../Exams/de-kiem-tra/M4-4-logging-hexagonal__2026-10-07__lesson1-lan1.md) | [Giải 1](../../../Exams/de-kiem-tra/M4-4-logging-hexagonal__2026-10-07__lesson1-lan1__DAPAN.md) |
| 02 | [RequestId và vòng đời MDC](LESSON_02_REQUEST_ID_MDC_FILTER.md) | [Đề 2](../../../Exams/de-kiem-tra/M4-4-logging-hexagonal__2026-10-07__lesson2-lan1.md) | [Giải 2](../../../Exams/de-kiem-tra/M4-4-logging-hexagonal__2026-10-07__lesson2-lan1__DAPAN.md) |
| 03 | [Structured JSON và kiểm chứng log](LESSON_03_STRUCTURED_JSON_LOGGING.md) | [Đề 3](../../../Exams/de-kiem-tra/M4-4-logging-hexagonal__2026-10-07__lesson3-lan1.md) | [Giải 3](../../../Exams/de-kiem-tra/M4-4-logging-hexagonal__2026-10-07__lesson3-lan1__DAPAN.md) |
| 04 | [Domain, application, infrastructure](LESSON_04_HEXAGONAL_PORTS_ADAPTERS.md) | [Đề 4](../../../Exams/de-kiem-tra/M4-4-logging-hexagonal__2026-10-07__lesson4-lan1.md) | [Giải 4](../../../Exams/de-kiem-tra/M4-4-logging-hexagonal__2026-10-07__lesson4-lan1__DAPAN.md) |

## Cách học

Bốn buổi khoảng 3,5h: đọc một lesson, trace ví dụ, tự trả lời đề rồi mới mở bài giải. Mỗi đề **PHONG_VAN theo lesson**, 8 tình huống ×5đ=40đ; đạt kiến thức lesson từ34/40, quy đổi điểm = điểm thô/40×100. Tổng32 câu, không phải đề DAY_DU cuối module. Được trả lời bằng lời hoặc pseudocode, chấm bản chất chứ không bắt thuộc import.

Ví dụ bám **Java21, Maven, shopcore Spring Boot4.1.1** hiện tại; DTO class, tiền BigDecimal. Logging dùng starter mặc định và JSON có sẵn của Boot, không thêm encoder bên thứ ba chỉ vì tutorial cũ. Code trong bài là mẫu học, chưa được thêm vào shopcore.

## Phạm vi

- Học mức log, context request, JSON và ranh giới phụ thuộc. Không triển khai ELK, Grafana, OpenTelemetry hay C4 đầy đủ.
- Hexagonal là skeleton cho một feature nhỏ; không ép rewrite toàn bộ CRUD, tạo interface cho mọi class hoặc tách Maven multi-module.
- Liên hệ AI Engineer: theo dõi request gọi model/provider bằng metadata an toàn và thay provider qua port. Không log prompt, dữ liệu người dùng hay API key mặc định; requestId không đo được chất lượng model.
- M1-6 Testing đang hoãn không cản đọc bài; các phép kiểm nhỏ trong bài giúp hiểu cơ chế, không tự coi là đã hoàn tất module Testing.
- Đọc hiểu ≠ đạt đề ≠ đã code/merge deliverable gốc. Trạng thái và capstone vẫn giữ như quyết định học hiện tại.

[Kế hoạch phủ kiến thức](LESSON_PLAN.md) · [Quy tắc chấm](QUY_TAC_CHAM.md) · [Kiểm chất lượng](QUALITY_REVIEW.md).

## Kiểm lại tài liệu

```bash
node Notes/M4_DevOps_Engineering/M4_4_Logging_Hexagonal/verify-structure.mjs
JAVA_HOME=$(/usr/libexec/java_home -v 21) node Notes/M4_DevOps_Engineering/M4_4_Logging_Hexagonal/verify-examples.mjs
```

Harness chạy trong thư mục tạm, không sửa project học. Cần JDK21 và Maven dependencies trong cache; thiếu cache là lỗi setup, không phải bằng chứng nghiệp vụ sai. Phạm vi đã kiểm và phần chưa kiểm được ghi riêng trong QUALITY_REVIEW.
