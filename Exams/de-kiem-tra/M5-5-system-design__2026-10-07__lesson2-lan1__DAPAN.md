# Bài giải / rubric · M5-5 System Design Lesson 2

40 điểm, đạt 34. Mỗi tiêu chí 1 điểm: đủ và đúng = 1; đúng hướng nhưng thiếu điều kiện = 0,5; sai/thiếu = 0. Chấm ý nghĩa tương đương, không ép câu chữ; không cap ngầm. [Bài học](../../Notes/M5_Scalability/M5_5_System_Design/LESSON_02_CDN_CACHE_LAYERS.md) · [Quy tắc chấm](../../Notes/M5_Scalability/M5_5_System_Design/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Client tới edge (1); Fresh hit không gọi origin (1); Miss/revalidate hỏi origin theo policy (1); 304 xác nhận bản cache chứ không là ảnh rỗng (1); CDN không chữa query bắt buộc ở origin (1) |
| 2 | Client cache có thể tránh network (1); CDN giảm request/bytes tới origin (1); App cache giảm DB/computation nhưng app vẫn nhận request (1); DB buffers giảm disk IO chứ không auto cache mọi SELECT result (1); Nêu chọn theo phần tải và contract (1) |
| 3 | Chỉ ra key thiếu dimension quyền/user (1); Nêu leakage dù TTL ngắn (1); Không shared-cache user-specific theo policy đơn giản (1); Phân biệt cache policy với authorization (1); Nêu query/language/currency có thể ảnh hưởng key (1) |
| 4 | no-cache có thể lưu nhưng phải validate reuse (1); no-store yêu cầu không lưu (1); private ngăn shared cache, không cấm browser mặc định (1); no-store không tự xóa mọi bản cũ (1); Kiểm HTTP headers cùng CDN vendor policy (1) |
| 5 | TTL là freshness của bản đang giữ theo policy (1); Nguồn fill có thể đã stale (1); Các tầng có timeline độc lập (1); Không khẳng định bound 30s khi chưa phân tích (1); Nêu invalidation/bypass/route freshness phù hợp (1) |
| 6 | Nhận diện caches độc lập (1); Nêu versioned URL (1); Cập nhật reference tới version mới (1); Nếu giữ URL cân nhắc TTL/purge/revalidation (1); Redis invalidation không tự purge browser/CDN (1) |
| 7 | Tính khoảng 100 origin fetch/s cho ảnh (1); Không suy tổng API RPS giảm tương tự (1); Nêu writes/uncacheable vẫn đi origin (1); Request hit ratio khác byte hit ratio (1); Kiểm latency/freshness/cost ngoài hit ratio (1) |
| 8 | Nêu surge/stampede tới DB (1); Timeout/bounded fallback (1); Nêu rải TTL/coalescing/concurrency limit như lựa chọn (1); Không coi cache là source of truth (1); Kiểm degradation/correctness theo workload (1) |

## Câu 1 · Ảnh hit/miss tại edge

Client tới edge; fresh hit phù hợp key trả ngay không origin. Miss hỏi origin, hết freshness có thể conditional revalidate. Origin trả representation hoặc 304 để xác nhận bản đã lưu; edge phục vụ client. CDN giảm distance/origin work cho traffic phù hợp, không làm query của origin bắt buộc tự nhanh.

## Câu 2 · Cache nào giảm đoạn nào?

Client cache có thể tránh network hoặc giảm bytes; CDN hit giảm tới origin. App cache giảm query/tính lại nhưng request vẫn đến app nếu chưa hit ngoài. DB buffers giữ pages giúp IO, SQL vẫn execute/lock/CPU; không response cache tự động. Chọn tầng theo bottleneck/freshness/privacy.

## Câu 3 · Shared cache lộ giá riêng

Key URL coi nhầm response riêng A/B là giống nhau, có thể lộ giá/data trong cả 1 giây. Bài chọn không shared-cache user-specific; authorization vẫn cần. Nếu cache public representation phải xét query/language/currency và mọi dimension làm response khác, không chỉ TTL.

## Câu 4 · no-cache khác no-store

no-cache không cấm lưu, cần validation trước reuse theo rule; no-store yêu cầu không lưu, không tự purge mọi cache cũ. private giới hạn shared cache nhưng browser vẫn có thể lưu. Kiểm cả headers và CDN config thực, không suy an toàn từ tên directive.

## Câu 5 · TTL hai tầng

TTL tính việc reuse bản cache theo policy, không tuổi dữ liệu tính từ primary commit. Replica/app có thể đã stale khi CDN fill; nhiều timeline không tự cho bound 30s. Phân tích fill/invalidation/lag và chọn bypass/primary route khi cần, không cộng hay lấy max TTL máy móc.

## Câu 6 · Ảnh overwrite cùng URL

Browser/CDN có thể giữ representation cũ riêng. Dùng keyboard-v3.webp và cập nhật reference cho nội dung mới. Nếu overwrite cùng URL phải có TTL/purge/revalidation phù hợp các tầng. Xóa Redis app cache không tự xóa CDN/browser; kiểm policy thực.

## Câu 7 · 90% hit là API giảm 90%?

Ảnh origin fetch ≈100/s, không phải shopcore API còn 100 RPS. API/write/uncacheable có đường riêng. Request hit 90% không có nghĩa byte hit 90% vì object sizes khác; vẫn đo miss latency, freshness/privacy, bandwidth và cost.

## Câu 8 · Cache hỏng thì cứ fallback?

Mất cache có thể đẩy origin/DB quá tải dù dữ liệu gốc còn. Cần timeout/fallback có giới hạn và policy giảm tải; rải TTL/coalescing/concurrency limit khi evidence cho thấy cần. DB vẫn source of truth, không bảo cache loss vô hại; kiểm degraded mode và correctness, không bắt implement distributed lock.

