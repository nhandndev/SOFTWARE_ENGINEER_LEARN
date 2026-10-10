# M5-1 · Lesson03 · Invalidation và consistency

**PHONG_VAN theo lesson · 8×5=40đ · 45–60phút · đạt từ34/40.** Điểm=điểm thô/40×100. Dùng lời/timeline/pseudocode. Không yêu cầu triển khai distributed lock/outbox; không có tiêu chí chấm ngoài những điều đã hỏi.

## Câu 1 - TTL có thay invalidation không? (5đ)

DB đổi tên Product nhưng list cache còn TTL45giây. Vì sao vẫn thấy tên cũ? So sánh TTL dài/ngắn theo freshness, hit ratio, DB load; đề xuất policy vừa có TTL vừa xử lý mutation. Có bảo đảm freshness tức thì chỉ bằng TTL không?

**Trả lời:**

## Câu 2 - Xóa key Product10 chưa đủ (5đ)

Đang cache nhiều list khác keyword/category/page/sort. Product10 đổi tên/giá/category hoặc được xóa. Vì sao chỉ evict detail ID không đủ? Nêu policy nhỏ gọn cho list, ảnh hưởng metadata khi create/delete và vì sao không FLUSHALL. Nếu admin sửa DB trực tiếp thì sao?

**Trả lời:**

## Câu 3 - Cacheable, CachePut, CacheEvict (5đ)

Phân biệt3annotation theo việc body chạy và cache thay đổi. Vì sao rename void không dùng CachePut để sửa tất cả list? CacheEvict allEntries mặc định chạy khi nào nếu method throw? beforeInvocation=true có bảo đảm list mới sau DB commit không?

**Trả lời:**

## Câu 4 - Hai loại timing (5đ)

Outer transaction chưa commit, method rename đã return. Giải thích transactionAware giữ clear đến lúc nào, rollback thì sao. immediateWrites của writer mẫu có ép clear trước commit không? Không có transaction thì sao? Vì sao không nói mọi thao tác immediate cache đều deferred?

**Trả lời:**

## Câu 5 - Xóa trước commit (5đ)

Writer xóa cache rồi DB chưa commit. Reader khác miss và đọc DB cũ. Kể timeline tạo cache stale; đề xuất after-commit cho clear, điều kiện Spring transaction/wiring cần có và giới hạn so với transaction chung DB+Redis.

**Trả lời:**

## Câu 6 - Đã xóa sau commit vẫn cũ (5đ)

ReaderR miss/đọc snapshot cũ, writerW commit và evict, rồi R put muộn. Kể lại thứ tự và kết quả. TTL giúp gì/không bảo đảm gì về tuổi dữ liệu từ commit? Với tồn kho/checkout cần quyết định chính xác nên làm gì, có bắt buộc code lock ngay trong module này không?

**Trả lời:**

## Câu 7 - DB commit nhưng evict Redis lỗi (5đ)

DB đã ghi thành công, clear Redis timeout. DB có tự rollback không? Cache/client có thể thấy gì? Đề xuất xử lý/quan sát và safety net; vì sao retry client phải xem idempotency chứ không chỉ trả business404?

**Trả lời:**

## Câu 8 - Kiểm mutation có bằng chứng (5đ)

Mô tả kiểm: prime hai list, successful mutation, failed mutation, outer commit/rollback, race hoặc outage giới hạn. Nếu transaction manager/source chỉ fake thì phần nào chưa được chứng minh về DB/concurrency thật?

**Trả lời:**
