# Kiểm chất lượng M5-1 · Redis & Caching

Ngày kiểm: 2026-10-07. Đây là kiểm tài liệu và ví dụ của AI, không phải điểm học viên hoặc chứng nhận hoàn thành deliverable.

## 1. Phạm vi và cách học

- Bám roadmap: Redis string/hash, Spring Cache, cache-aside, TTL, invalidation Product và đo latency trước/sau.
- Chia 4 lesson theo 4 buổi, không kéo Redis Cluster/Streams hoặc implementation distributed lock vào tiêu chí đạt.
- Dùng DTO class, BigDecimal và bối cảnh list Product có filter/paging/sort của shopcore hiện tại.
- Mỗi lesson có tài liệu chính thức, từ khóa tìm video, đề riêng, bài giải và rubric. Từ khóa tìm kiếm không được trình bày như video đã xem/kiểm chứng.
- Tổng 32 câu tình huống; mỗi đề 8 câu, 40 điểm, đạt từ 34 điểm. Chấm đúng ý nghĩa và cơ chế; không ép thuộc import hoặc cú pháp khi câu cho phép lời/pseudocode.

## 2. Rà từng lesson và đề

| Lesson | Kiến thức đã đối chiếu | Kiểm độ khớp câu hỏi |
|---|---|---|
| 01 | DB là nguồn gốc; Redis là bản sao trong bài này; string/hash, namespace, TTL và SET ghi đè | 8 câu kiểm vai trò, kiểu dữ liệu, TTL, overwrite, cache-aside, cách ly key và kiểm chứng lab; không đòi thuộc internals Redis |
| 02 | Proxy cache, key đầy đủ tham số, chuẩn hóa query, DTO JSON, cache null/empty/error và cấu hình theo stack hiện tại | 8 câu gắn với flow và code đã dạy; phân biệt body được skip, auth, paging và serializer; không bắt dựng lại project |
| 03 | Invalidate list variants, CachePut/CacheEvict, method success khác commit, transaction-aware khác writer timing, race và Redis outage sau DB commit | 8 câu có timeline và rubric từng ý; chỉ yêu cầu nhận diện race/giới hạn, không bắt tự viết distributed lock |
| 04 | Miss khác lỗi kết nối, fail-open có điều kiện, stampede, memory eviction, baseline/cold/warm và p50/p95 | 8 câu kiểm quyết định và cách đo; số liệu đề là giả định, không được coi là benchmark của shopcore |

Đã rà đề với bài học và bài giải, không chỉ đếm heading. Điểm chia theo từng ý; câu trả lời khác mẫu nhưng đúng contract vẫn được điểm. Tạo sẵn bộ học không mở trạng thái học hoặc tự tick checklist.

## 3. Kiểm code bằng Redis thật

Môi trường kiểm: JDK 21, Spring Boot 4.1.1 theo shopcore; Spring Data Redis 4.1.1, Spring Framework 7.0.9, Jackson 3.1.5. Redis lab dùng image `redis:7.4-alpine`, digest:

```text
sha256:858f009f9709ce576febc734aa78b8f6d624b82571f9ddb6bda4377c833b3499
```

Harness lấy chính Java code có marker trong lesson, ghép fragment cấu hình rồi compile/test trong thư mục tạm. Không thay source/POM shopcore.

| Nhóm kiểm | Kết quả |
|---|---|
| Key chuẩn hóa và đầy đủ biến; kiểm input | Đạt |
| Redis string/hash, TTL, ghi đè, sai kiểu dữ liệu | Đạt |
| JSON round-trip DTO page, metadata, BigDecimal | Đạt |
| Cache miss/hit, prefix, TTL, variants, empty result | Đạt |
| Tự new/self-invocation bỏ qua proxy | Đạt |
| Mutation thành công clear các list; mutation lỗi không clear | Đạt |
| Regular clear hoãn tới commit; rollback không thực hiện clear đã hoãn | Đạt với transaction manager giả |
| Hết TTL thì reload; GET không tự gia hạn TTL | Đạt |
| Tổng suite chức năng | 13 test, không lỗi/fail/skip |
| Cố tình bỏ page khỏi key | Assertion bắt được lỗi |
| Cố tình bỏ annotation eviction | Assertion bắt được lỗi |
| Khôi phục mẫu sau fault injection | 13 test đạt lại |
| Tắt Redis rồi gọi cache | 1 test đạt: lỗi kết nối được truyền ra, source không được gọi; không có fallback mặc định |

### Điểm đã sửa sau kiểm thực tế

Writer Redis của stack kiểm có thể ghi/clear bất đồng bộ theo cấu hình mặc định. Mẫu được sửa để chọn `immediateWrites()` rõ ràng, rồi chạy lại test. Lesson giải thích hai thời điểm riêng: transaction-aware decorator đợi commit, sau đó writer mới thực hiện Redis operation. Chọn writer blocking không làm DB và Redis thành một transaction atomic.

Tài liệu tham chiếu: [RedisCacheWriter configurer](https://docs.spring.io/spring-data/redis/reference/api/java/org/springframework/data/redis/cache/RedisCacheWriter.RedisCacheWriterConfigurer.html), [TransactionAwareCacheDecorator](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/cache/transaction/TransactionAwareCacheDecorator.html), [SimpleCacheErrorHandler](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/cache/interceptor/SimpleCacheErrorHandler.html).

## 4. Cách chạy lại

Kiểm cấu trúc không cần Redis:

```bash
node Notes/M5_Scalability/M5_1_Redis/verify-structure.mjs
```

Kiểm chức năng dùng Redis riêng, tuyệt đối không dùng Redis có dữ liệu thật. Cần Docker, Maven, JDK 21 và dependency đã có trong Maven cache; harness chạy Maven offline. Thiếu dependency là lỗi setup, không phải kết luận mẫu cache sai.

```bash
docker run --rm -d --name m51-verify-redis \
  -p 127.0.0.1:16379:6379 redis:7.4-alpine \
  redis-server --save '' --appendonly no

M51_REDIS_PORT=16379 node Notes/M5_Scalability/M5_1_Redis/verify-examples.mjs

docker stop m51-verify-redis

M51_REDIS_PORT=16379 M51_REDIS_DOWN=1 \
  node Notes/M5_Scalability/M5_1_Redis/verify-examples.mjs
```

Nếu port 16379 đã dùng, chọn port localhost khác và đổi `M51_REDIS_PORT` tương ứng. Đặt `JAVA_HOME` trỏ JDK 21 khi máy đang mặc định dùng JDK khác. Nhánh outage yêu cầu Redis thật sự đã dừng, không có dịch vụ khác trên port đó.

## 5. Giới hạn bằng chứng

- Source dữ liệu và transaction manager trong harness là fake: chưa chứng minh rollback PostgreSQL hoặc transaction wiring của ứng dụng thật.
- Không chạy HTTP end-to-end, concurrent stale-reader race, HA/failover hoặc benchmark latency shopcore. Những phần này được giải thích và yêu cầu thiết kế kiểm chứng, không giả số liệu đã đo.
- Mermaid được rà nội dung luồng, chưa kiểm render từng sơ đồ bằng ứng dụng Obsidian.
- Kiểm cấu trúc xác nhận cặp đề/bài giải, tổng điểm rubric, code fence và đích liên kết local; không thay thế rà ngữ nghĩa hoặc đảm bảo URL web luôn tồn tại.
- Container QA đã dừng/xóa; không để Redis lab chạy nền. Image/dependency cache có thể còn trên máy.
- Trạng thái M5-1 giữ “Chưa bắt đầu”; chỉ thêm nhãn đã có đề + lesson. Không ghi điểm học viên, không đổi checklist roadmap, không tự hoàn thành capstone.
