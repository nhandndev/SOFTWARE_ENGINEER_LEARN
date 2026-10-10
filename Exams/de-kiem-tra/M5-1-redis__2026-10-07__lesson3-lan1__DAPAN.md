# Bài giải M5-1 · Lesson03

40đ, đạt từ34đ. [Quy tắc](../../Notes/M5_Scalability/M5_1_Redis/QUY_TAC_CHAM.md). Gắt về timeline/atomicity, không bắt code cơ chế scale ngoài scope.

| Câu | Ý được điểm, tổng5 |
|---|---|
| 1 | Snapshot chưa invalidate (1); TTL dài trade-off (1); TTL ngắn trade-off (1); mutation invalidate và TTL safety net (1); không freshness tức thì (1) |
| 2 | Detail khác nhiều list variants (1); clear list theo phạm vi cache (1); totals/page thay khi create/delete (1); không FLUSHALL (1); write ngoài app không tự evict (1) |
| 3 | Cacheable có thể skip (1); CachePut luôn chạy+put (1); CacheEvict bỏ entry/cache (1); void/ProductDTO không cập nhật mọi page (1); default success/throw và before không đảm bảo commit freshness (1) |
| 4 | Deferred regular clear sau commit/rollback không chạy (2); immediate writer chỉ sau decorator cho phép (1); không tx thì thao tác thường ngay (1); nhận diện immediate APIs không phải đều deferred (1) |
| 5 | Clear trước commit tạo miss (1); reader nạp cũ (1); after-commit policy (1); cần tx/wiring thật (1); không atomic DB+Redis (1) |
| 6 | Đúng thứ tự R/W/R và stale put (2); TTL giới hạn entry không tuổi từ commit tuyệt đối (1); quyết định correctness kiểm nguồn gốc/tx hoặc bỏ cache (1); nhận diện giới hạn không bắt lock implementation (1) |
| 7 | DB đã commit không tự rollback (1); cache cũ/client có thể lỗi (1); metric/log/retry invalidation có kiểm soát (1); TTL safety net (1); idempotency và không404giả (1) |
| 8 | Hai variants/success reload (1); fail không clear (1); commit/rollback timing (1); race/outage không được che (1); fake không chứng minh DB/concurrency thật (1) |

## Câu 1 - TTL

Cache giữ snapshot chưa bỏ, DB không push update tự động. TTL dài tăng cơ hội hit nhưng cũ/RAM lâu; TTL ngắn tăng miss/DB. Chọn theo yêu cầu và đo, mutation invalidate kết hợp TTL safety net. TTL đơn thuần không cho read-after-write tức thì.

## Câu 2 - List scope

Một Product có thể thuộc nhiều result/order/page; detailID không phải list key. Shopcore nhỏ clear productLists sau mutation, detail cache riêng nếu có. Create/delete đổi totals/trang. Không FLUSHALL chung. AdminSQL/batch khác write path không tự chạy annotation; cần policy write path/event hoặc chấp nhận TTL.

## Câu 3 - Annotation

Cacheable lookup/hit skip body; CachePut luôn chạy rồi put result một key; CacheEvict bỏ key hoặc toàn cache name. Rename void/DTO một Product không đại diện mọi list page. Evict default sau method thành công, throw không chạy after-success; beforeInvocation thực hiện trước nhưng reader có thể nạp cũ khi DB chưa commit. Nói “CachePut giống Cacheable” mất đúng ý đó, không xóa toàn điểm câu.

## Câu 4 - Hai tầng hoãn

Transaction-aware decorator giữ regular put/evict/clear tới after-commit; rollback không thực hiện phần đã hoãn. Writer immediateWrites chờ Redis thực hiện **khi đã được decorator gọi**, không vượt qua pending transaction. Không có transaction thì regular operations thực hiện ngay theo writer policy mẫu. Immediate/force APIs như putIfAbsent/evictIfPresent có ngoại lệ; không suy tất cả đều after-commit. Không yêu cầu thuộc API tên cụ thể nếu nêu được ngoại lệ theo cơ chế.

## Câu 5 - Cửa sổ trước commit

Clear trước commit→reader miss→DB vẫn cũ→put cũ→writer commit. Chọn clear sau commit với transaction-aware/event boundary phù hợp, có transaction manager và proxy/wiring thật. Không biến DB/Redis thành transaction atomic; failure/race vẫn cần nhận diện. Annotation mà không có infrastructure không đủ.

## Câu 6 - Reader trễ

R đọc cũ trước W; W commit/evict; R put cũ sau cùng. Cache lại stale. TTL tính từ put entry, không bảo đảm dữ liệu chỉ cũ tối đa60giây từ writer commit khi reader/transaction chậm. Checkout/tồn kho cần nguồn gốc/transaction đúng, không lấy catalog cache làm quyết định cuối. Nhận diện version/coordination như hướng nâng cao được, không bắt code lock.

## Câu 7 - Hai hệ thống

Commit DB rồi thì Redis lỗi không tự rollback DB. Cache có thể cũ, client có thể nhận lỗi sau write đã xảy ra. Quan sát eviction failures, retry invalidation đáng tin nếu cần, TTL safety net và policy cache outage rõ. Client retry có thể lặp mutation, phải xét idempotency. Không đổi timeout thành Product404 để giấu lỗi.

## Câu 8 - Test đúng lời hứa

Prime hai keys, chứng minh hit, mutate rồi cả hai reload và DTO/totals phù hợp. Input/business failure không clear default. Outer transaction giữ cache đến commit; rollback không deferred clear. Race/outage phải nêu/test riêng theo yêu cầu. Fake transaction/source chỉ kiểm callback/cache contract, không rollback PostgreSQL, concurrent schedule hoặc consistency production.

Ôn Lesson03 mục3–8 nếu nhầm success, commit và strong consistency.
