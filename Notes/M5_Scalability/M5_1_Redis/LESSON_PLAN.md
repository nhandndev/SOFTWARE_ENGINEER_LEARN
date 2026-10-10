# Kế hoạch phủ M5-1 · Redis

Roadmap16h →4buổi×4h. Mỗi buổi đọc/trace khoảng2–2,5h, làm đề35–60phút, đối chiếu/ghi điểm yếu. Không dùng số giờ đọc để tự cho pass.

| Checklist / rủi ro | Lesson | Câu kiểm |
|---|---|---|
| Redis server, source of truth, string/hash | 01 | 1–2, 8 |
| Key/TTL/lệnh overwrite/expiry | 01 | 3–4 |
| Hit/miss do app điều phối | 01 | 5 |
| Isolation/security/lab an toàn | 01 | 6–7 |
| Cache-aside/proxy/Spring Cache | 02 | 1, 3, 5 |
| Key đủ filter/page/sort, normalization | 02 | 2, 7 |
| DTO page/typed serializer/LAZY boundary | 02 | 4 |
| Validate/empty/null/error | 02 | 6 |
| Counter/key/TTL/round-trip proof | 02 | 8 |
| TTL trade-off, list invalidation/create/delete | 03 | 1–2 |
| Cacheable/Put/Evict/beforeInvocation | 03 | 3 |
| Transaction-aware khác immediate writer | 03 | 4–5 |
| Reader race và after-commit outage | 03 | 6–7 |
| Mutation/timing test và giới hạn fake | 03 | 8 |
| Error không phải miss/fail-open có chủ đích | 04 | 1–2 |
| Stampede recognition | 04 | 3 |
| Latency trước/sau có đối chứng | 04 | 4–5 |
| Memory eviction/cardinality/không nên cache | 04 | 6–7 |
| Tổng hợp bằng chứng đúng phạm vi | 04 | 8 |

## Tránh chia vụn/lặp kiến thức cũ

Paging/DTO từ M1-2/M1-3 chỉ nhắc để cache đúng shape và query. Transaction từ JPA/PostgreSQL chỉ nhắc boundary after-commit. Profiles/Docker từ module trước dùng để nối Redis local. Không thêm lesson riêng chỉ để học mỗi annotation/lệnh.

## Phạm vi không bắt buộc

Redis Cluster, Streams, Sentinel/HA chi tiết, distributed lock implementation, full persistence tuning, semantic/vector cache, CDC/outbox implementation. Chỉ nhận diện khi cần nêu giới hạn, không lấy làm rubric ngầm. C4/tracing/monitoring dashboard không tự trở thành yêu cầu Redis.

## Deliverable và bằng chứng

Tài liệu/đề chuẩn bị không mở module. Đạt đề kiến thức không tự hoàn tất code+merge+đo latency của roadmap. Mọi code thực hành sau này vào shopcore, không tạo capstone khác. Fixture của AI kiểm cache machinery không giả thành kết quả benchmark người học.
