# Lesson 04 · Cache có thật sự giúp không?

> Mục tiêu: đo có đối chứng và hiểu cache lỗi; không lấy một request nhanh để chứng minh hệ thống scale tốt.

## Tài liệu / video

- [Spring cache strategies](https://docs.spring.io/spring-framework/reference/integration/cache/strategies.html): abstraction không tự khóa mọi concurrent load.
- [CachingConfigurer](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/cache/annotation/CachingConfigurer.html): error handler.
- [SimpleCacheErrorHandler](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/cache/interceptor/SimpleCacheErrorHandler.html): default rethrow.
- [Redis eviction](https://redis.io/docs/latest/develop/reference/eviction/), [Redis latency monitoring](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/latency-monitor/).
- Video: tìm `Redis cache hit ratio latency p95 benchmark`, `cache stampede Redis explanation`. Không học distributed lock implementation trong bài.

## 1. Ba trường hợp khác nhau

| Tình huống | Chuyện xảy ra |
|---|---|
| Hit | Lấy bytes/deserialize DTO; không query body |
| Miss | Không có key còn hiệu lực; query DB và put snapshot |
| Error | Redis timeout, kết nối lỗi hoặc deserialize lỗi; không phải miss bình thường |

Spring Cache default error handler thường **rethrow cache error**, không tự fallback DB cho mọi lỗi. Vì vậy GET cache lỗi có thể làm request fail trước khi Service body chạy. PUT lỗi có thể xảy ra sau khi đã query DB. Evict lỗi có thể xảy ra sau DB commit. Các thời điểm khác nhau, không xử lý như một business error chung.

Nếu muốn fail-open cho cache catalog: thiết kế CacheErrorHandler hoặc explicit boundary để bỏ qua đúng lỗi read/write cache đã chọn, ghi metric/log an toàn, timeout ngắn hợp lý, kiểm DB chịu được fallback. Không catch mọi Exception rồi return empty list; như vậy giấu lỗi DB/logic thành200. Serialization/schema bug nên được phát hiện, không im lặng mãi dưới tên “Redis hơi chậm”.

## 2. Cache stampede

100request cùng miss một key, đều query DB trước khi ai kịp put. Cache không có nghĩa chắc chắn chỉ1query cho100request. Nhận diện stampede khi cold start/expire đồng loạt.

Cách giảm có thể gồm TTL jitter, warming có chọn lọc, coalescing/locking theo key phù hợp hoặc rate limit/fallback budget. `@Cacheable(sync=true)` có semantics/phạm vi phụ thuộc provider và cách triển khai; không coi là distributed lock toàn hệ thống hay transaction chung. Bài này không yêu cầu code locks, nhưng phải nêu được hậu quả và giới hạn.

## 3. Redis hết RAM không phải TTL hết hạn

Expiration: entry hết thời gian. Memory eviction: server có thể bỏ key theo maxmemory/policy dù TTL chưa hết, hoặc từ chối writes tùy policy. Cache app phải luôn xử lý miss, không dựa key sẽ sống đủ60giây.

Nhiều tổ hợp keyword/page/sort tạo nhiều key, gọi là key cardinality cao. Hit ratio thấp mà cache to thì trả chi phí RAM/network/serialize nhưng ít giảm DB. Giới hạn size/keyword, cache truy vấn phổ biến hoặc bỏ cache nếu không có lợi. Persistence/replication không tự bảo đảm cache luôn có key và không phải nội dung bắt buộc của module này.

## 4. Đo trước/sau có đối chứng

Đừng so lần đầu chưa cache50ms với một lần hit5ms rồi ghi “nhanh10lần cho tất cả”. Tách ba nhóm:

1. **Baseline không cache**: cùng query/workload, vẫn đi qua các phần API còn lại; dùng nhánh/config kiểm soát để tắt cache, xác nhận body/source thật sự chạy.
2. **Cold miss**: bỏ đúng key trong Redis lab/test, đo lần đọc và put đầu; miss có thể chậm hơn baseline.
3. **Warm hit**: prime key, lặp cùng workload khi key còn hạn, xác nhận source không được gọi.

Giữ data, index, pagination/sort, môi trường mạng, CPU/load, concurrency, payload và log level giống nhau. Warm-up JVM/connection pools/DB buffer trước khi so; tách warm-up khỏi dữ liệu đo. Xáo/đan xen các đợt để tránh một nhóm luôn hưởng môi trường rảnh hơn.

Thu nhiều mẫu, nêu số lượng và cách lấy. Báo p50/p95, error rate, throughput nếu có tải, DB query count/load, cache hit/miss và thời gian serialize/network. Không kết luận từ average đơn lẻ; không log body/secret để đo.

## 5. Hai tầng số đo

Thời gian `curl time_total` là end-to-end nhìn từ client; thời gian Service body chỉ đo phần method khi miss, và **không chạy khi hit**. Nếu chỉ đặt timer trong body @Cacheable, bạn có thể đo toàn miss mà bỏ mất hits. Đo quanh proxy/API cho tổng latency; query metric riêng để biết DB giảm không.

Ví dụ thử tay sau khi endpoint thật đã có, không phải benchmark đủ tin cậy:

```bash
curl -s -o /dev/null -w '%{http_code} %{time_total}\n' \
  'http://localhost:8080/api/products?page=0&size=10&sort=id,asc'
```

Nhiều mẫu qua load tool mới phù hợp so p95/concurrency. App của bạn chưa có endpoint/cache thật thì không lấy số của fixture giả lập làm kết quả shopcore. Không thêm `Thread.sleep` trong Service thật để tạo biểu đồ đẹp.

## 6. Bảng diễn giải số liệu giả định

**Đây là dữ liệu minh họa, không phải kết quả chạy trên project:** cùng workload1000request sau warm-up.

| Nhóm | p50 | p95 | DB calls | HTTP lỗi |
|---|---|---|---|---|
| Baseline | 30ms | 55ms | 1000 | 0 |
| Warm cache | 7ms | 15ms | 20 | 0 |

Có dấu hiệu tốt: latency giảm, DB calls giảm, không tăng error trong mẫu. Chưa biết behavior sau mutation/Redis outage hoặc nhiều filter ít lặp. Cần correctness test, miss/mutation/outage load và xem RAM. Không suy p95giảm là tất cả request nhanh hơn hoặc mọi dữ liệu luôn đúng.

## 7. Khi nào không cache?

- Query đã rẻ, dữ liệu ít lặp: overhead cache có thể lớn hơn lợi ích.
- Dữ liệu cá nhân/quyền thay đổi, chưa thiết kế isolation/invalidations: nguy cơ lộ dữ liệu.
- Quyết định cần chính xác tức thời như tồn kho/checkout: đọc/kiểm nguồn gốc và transaction phù hợp.
- Key đa dạng, TTL quá ngắn, hit thấp: đo trước khi tiếp tục.

Với AI: output phụ thuộc model/version/prompt/temperature/context/quyền. Key chỉ chứa prompt có thể sai hoặc lộ dữ liệu; semantic cache không phải cùng vấn đề với list Product. Giữ module này ở nền tảng cache deterministic/public metadata trước.

## 8. Quy trình kiểm chứng nhỏ cho shopcore

Đọc baseline/hit/miss rồi kiểm update/invalidation, cache expiry, cache unavailable và concurrency. Kiểm response content/metadata đúng trước khi khen nhanh. Nếu Redis ngừng hoạt động, nêu rõ policy fail-closed/default hay fail-open đã được implement/test; không tự giả hệ thống sẽ an toàn.

Số đo đạt chỉ khi ghi điều kiện, cách đo, kết quả và giới hạn. Đọc hiểu/fixture tests đạt không tự hoàn tất deliverable đo latency của roadmap.

[Làm đề Lesson04](../../../Exams/de-kiem-tra/M5-1-redis__2026-10-07__lesson4-lan1.md).
