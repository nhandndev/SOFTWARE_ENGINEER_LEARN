# M5-1 · Lesson02 · Cache-aside và product list

**PHONG_VAN theo lesson · 8×5=40đ · 45–60phút · đạt từ34/40.** Điểm=điểm thô/40×100. Được xem code lesson, dùng lời/pseudocode. Không bắt thuộc serializer/API spelling nhưng phải hiểu kiểu và boundary.

## Câu 1 - Trace miss rồi hit (5đ)

Controller gọi bean ProductCatalogRead qua Spring, cùng query hai lần. Kể vai trò proxy/Redis/body/source và số lần source chạy khi lần đầu miss, lần hai hit. DTO response/wrapper requestId nên được tạo/bọc ở đâu? Redis có tự gọi DB không?

**Trả lời:**

## Câu 2 - Thiết kế key (5đ)

List phụ thuộc categoryId, keyword, page, size, sort. Nêu key cần gì và hậu quả bỏ page hoặc sort. Vì sao normalize keyword phải giống query thật? Nếu kết quả phụ thuộc tenant/quyền thì thêm gì hoặc tránh gì?

**Trả lời:**

## Câu 3 - Gọi method mà không cache (5đ)

So sánh gọi bean qua proxy, `new ProductCatalogRead(...)`, `this.list(...)`. Cần bật/đăng ký gì để annotation có tác dụng? Có nên đặt kiểm quyền chỉ bên trong body list được @Cacheable bỏ qua khi hit không?

**Trả lời:**

## Câu 4 - Giá trị cache có gì? (5đ)

Vì sao chọn ProductListPage chứa DTO items và metadata thay vì JPA entity/LAZY proxy/PageImpl hoặc chỉ list items? Typed serializer giúp vấn đề gì và cần kiểm round-trip nào? DTO class có được dùng thay record không?

**Trả lời:**

## Câu 5 - Cấu hình có thật sự dùng Redis? (5đ)

Nêu mục đích starter cache/data-redis, @EnableCaching/CacheManager và connection config. Manager mẫu đặt TTL60/prefix/serializer ở đâu, có tự lấy mọi spring.cache.redis.* để ghi đè custom bean không? App trong Docker cùng Redis thì host localhost có đúng không?

**Trả lời:**

## Câu 6 - Input, empty và error (5đ)

Theo mẫu, page=-1, size=1000, sort không cho phép phải bị chặn lúc nào? DTO có content rỗng khác null và exception thế nào trong caching? Có nên coi cache miss là Product không tồn tại không?

**Trả lời:**

## Câu 7 - Key đúng chưa đủ paging đúng (5đ)

Query normalize keyword trong key thành lowercase nhưng DB vẫn search case-sensitive/raw. Query sort price không tie-break ID. Chỉ ra hai lỗi, cách giữ contract đồng nhất, và vì sao cache không tự sửa query/paging hoặc quyền truy cập.

**Trả lời:**

## Câu 8 - Phép kiểm read cache (5đ)

Thiết kế5nhóm kiểm: miss/hit với source counter; key khác filter/page/sort; DTO JSON round-trip/metadata/BigDecimal; TTL/prefix; direct/self invocation. Nêu phần chưa được chứng minh nếu source là fake, chưa chạy JPA/HTTP thật.

**Trả lời:**
