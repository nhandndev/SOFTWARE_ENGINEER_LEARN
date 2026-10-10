# M5-1 · Redis & Caching

> Bộ bài chuẩn bị theo roadmap 16h/4buổi. Không tự ghi nhận đã học/đạt, không sửa source/POM shopcore hoặc tạo capstone mới.

Bạn đã biết API list Product, paging và SQL/index. Redis không thay các phần đó. Module này dạy **khi nào có thể bỏ qua lần query DB lặp lại**, và **khi nào bản sao trong cache phải bị bỏ**.

| Lesson | Bài học | Đề | Bài giải / rubric |
|---|---|---|---|
| 01 | [Redis, string/hash, key và TTL](LESSON_01_REDIS_KEYS_TYPES_TTL.md) | [Đề 1](../../../Exams/de-kiem-tra/M5-1-redis__2026-10-07__lesson1-lan1.md) | [Giải 1](../../../Exams/de-kiem-tra/M5-1-redis__2026-10-07__lesson1-lan1__DAPAN.md) |
| 02 | [Cache-aside, Spring Cache và product list](LESSON_02_CACHE_ASIDE_SPRING_CACHE.md) | [Đề 2](../../../Exams/de-kiem-tra/M5-1-redis__2026-10-07__lesson2-lan1.md) | [Giải 2](../../../Exams/de-kiem-tra/M5-1-redis__2026-10-07__lesson2-lan1__DAPAN.md) |
| 03 | [Invalidation, commit và dữ liệu cũ](LESSON_03_INVALIDATION_CONSISTENCY.md) | [Đề 3](../../../Exams/de-kiem-tra/M5-1-redis__2026-10-07__lesson3-lan1.md) | [Giải 3](../../../Exams/de-kiem-tra/M5-1-redis__2026-10-07__lesson3-lan1__DAPAN.md) |
| 04 | [Đo latency, cache lỗi và giới hạn](LESSON_04_MEASUREMENT_FAILURES.md) | [Đề 4](../../../Exams/de-kiem-tra/M5-1-redis__2026-10-07__lesson4-lan1.md) | [Giải 4](../../../Exams/de-kiem-tra/M5-1-redis__2026-10-07__lesson4-lan1__DAPAN.md) |

## Cách học và thi

Bốn buổi khoảng4h: học/trace một lesson, làm đề rồi đối chiếu bài giải. Mỗi đề **PHONG_VAN theo lesson**, 8tình huống×5đ=40đ, đạt từ34/40. Điểm quy đổi=điểm thô/40×100. Tổng32câu, không phải đề DAY_DU cuối module. Được dùng lời/pseudocode; gắt về logic/key/consistency, không ép thuộc import.

## Bối cảnh thống nhất

- Java21, Maven, shopcore Boot4.1.1 hiện có; dependency theo BOM, không tự pin Spring Data/Jackson từ tutorial cũ.
- Redis lab chọn7.4Alpine để cố định phạm vi lệnh, không tuyên bố đây là phiên bản mới nhất. Cache không persistence ở lab vì DB vẫn là nguồn gốc dữ liệu.
- Feature: public catalog list Product với category/keyword/page/size/sort, DTO class và BigDecimal. Không cache dữ liệu riêng từng user bằng key dùng chung.
- Giá trị cache là DTO page đã materialize, không JPA entity/LAZY proxy hoặc PageImpl. Key có đầy đủ tham số đã chuẩn hóa; cùng chuẩn hóa phải áp dụng cho query thật.
- TTL60giây là **giả định học**, không lời khuyên mọi dự án. Sau update/create/delete thì invalidate các list liên quan; không chỉ xóa key productId rồi nghĩ list đã đúng.
- Skeleton repository trong bài là contract và fake để kiểm cache. JPA/Controller/error mapping đầy đủ tiếp tục theo style shopcore; mẫu không phải project thay thế đã hoàn tất.
- Liên hệ AI Engineer: cache metadata hoặc kết quả deterministic có version/quyền rõ; không mặc định cache prompt/PII/output model giữa người dùng. Không học vector DB, semantic cache hoặc distributed lock implementation trong module này.

## Học xong nghĩa là gì?

Đọc xong: hiểu cơ chế. Đạt đề: đạt kiến thức lesson. Deliverable gốc: tích hợp cache-aside product list, TTL/invalidation và đo trước–sau trên shopcore thật. Đang hoãn capstone thì ghi nhận đúng như vậy, không tự cho merge/pass.

[Kế hoạch phủ kiến thức](LESSON_PLAN.md) · [Quy tắc chấm](QUY_TAC_CHAM.md) · [Báo cáo kiểm chất lượng](QUALITY_REVIEW.md).

## Kiểm lại ví dụ

```bash
node Notes/M5_Scalability/M5_1_Redis/verify-structure.mjs
```

Harness Java dùng Redis lab riêng, JDK21 và Maven cache. Không trỏ vào Redis có dữ liệu thật. Hướng dẫn và kết quả cụ thể trong QUALITY_REVIEW; kiểm chức năng không đồng nghĩa benchmark production.
