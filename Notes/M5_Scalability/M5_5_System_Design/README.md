# M5-5 · System Design cơ bản, học theo luồng và trade-off

> Soạn sẵn 12h / 4 buổi × 3h theo roadmap. Giữ 🔵 Chưa bắt đầu, không tự tick checklist, không giả đã triển khai topology hoặc hoàn tất deliverable.

Bạn quen code 3-layer. Bộ này đi từ **một request chạy trên một máy** tới **nhiều instance và nhiều nguồn dữ liệu**, giải thích từng mũi tên, nơi state tồn tại và điều gì xảy ra khi tải tăng/hỏng một phần. Không học bằng cách thuộc tên công nghệ.

| Buổi | Lesson | Đề | Bài giải / rubric |
|---|---|---|---|
| 1 | [Workload, scaling và LB](LESSON_01_REQUIREMENTS_SCALING_LB.md) | [Đề 01](../../../Exams/de-kiem-tra/M5-5-system-design__2026-10-07__lesson1-lan1.md) | [Giải 01](../../../Exams/de-kiem-tra/M5-5-system-design__2026-10-07__lesson1-lan1__DAPAN.md) |
| 2 | [CDN và cache layers](LESSON_02_CDN_CACHE_LAYERS.md) | [Đề 02](../../../Exams/de-kiem-tra/M5-5-system-design__2026-10-07__lesson2-lan1.md) | [Giải 02](../../../Exams/de-kiem-tra/M5-5-system-design__2026-10-07__lesson2-lan1__DAPAN.md) |
| 3 | [Read replica và consistency](LESSON_03_READ_REPLICA_CONSISTENCY.md) | [Đề 03](../../../Exams/de-kiem-tra/M5-5-system-design__2026-10-07__lesson3-lan1.md) | [Giải 03](../../../Exams/de-kiem-tra/M5-5-system-design__2026-10-07__lesson3-lan1__DAPAN.md) |
| 4 | [Bottleneck và design document](LESSON_04_BOTTLENECK_DESIGN_DOCUMENT.md) | [Đề 04](../../../Exams/de-kiem-tra/M5-5-system-design__2026-10-07__lesson4-lan1.md) | [Giải 04](../../../Exams/de-kiem-tra/M5-5-system-design__2026-10-07__lesson4-lan1__DAPAN.md) |

Mỗi đề PHONG_VAN có 8 tình huống × 5 = 40 điểm; đạt từ 34/40. Tổng **32 câu**, không phải full design interview M7-2 hay đề DAY_DU cuối module. Trả lời ý hiểu, sơ đồ/pseudocode, không bắt dựng AWS.

## Cách học kỹ mà không học vẹt

Mỗi buổi: khoảng 75 phút đọc/lần theo luồng, 30 phút tự vẽ/tính và nêu failure case, 45 phút làm đề, 30 phút đối chiếu/ôn. Không đọc đáp án trước.

Với mỗi node tự hỏi: nó giữ state gì, request nào đi qua, cache hit có bỏ qua node nào, nó hỏng thì sao? Với mỗi quyết định tự hỏi: evidence nào ủng hộ, trade-off/cost gì, lúc nào không cần nó?

Các số RPS/latency/capacity và topology là giả định để học, không benchmark thật shopcore. Source hiện tại chưa đủ workload để kết luận bottleneck; docs phải ghi Unknown/Proposed khi chưa đo.

## Phạm vi

Bao phủ vertical/horizontal, LB/CDN, read replica, caching layers và bottleneck. Có freshness/privacy/failure/connection budget để tránh thiết kế sai bản chất. Không thêm yêu cầu sharding, CAP proofs, full distributed transactions, Kubernetes, vectorDB hay full AWS deployment.

[Design template](DESIGN_TEMPLATE.md) · [Kế hoạch phủ kiến thức](LESSON_PLAN.md) · [Chấm điểm](QUY_TAC_CHAM.md) · [Kiểm chất lượng](QUALITY_REVIEW.md)

Roadmap deliverable vẫn là sơ đồ scale + ghi chú bottleneck trong `shopcore/docs`. Theo cách học đang hoãn capstone, template/bài mẫu/QA không tự nộp hoặc đổi capstone thành hoàn thành. Chỉ chuẩn bị tài liệu, không mở module trước khi đủ điều kiện học.

```bash
node Notes/QUALITY_AUDIT_2026_10_07/verify-m55-m6a1.mjs --self-test
```

Kiểm cấu trúc không chứng minh topology tối ưu. Phần semantic review, số liệu giả định và giới hạn đều ghi riêng trong QUALITY_REVIEW.
