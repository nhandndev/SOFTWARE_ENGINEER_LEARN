# M5-5 System Design · Lesson 2 · CDN và các tầng cache

Ngày soạn: 2026-10-07. Chế độ PHONG_VAN: 8 tình huống × 5 = 40 điểm; đạt từ **34/40**. [Bài học](../../Notes/M5_Scalability/M5_5_System_Design/LESSON_02_CDN_CACHE_LAYERS.md). Trả lời bằng ý hiểu hoặc pseudocode, không ép thuộc tên API. Mỗi ý trong “Cần nói đủ” là 1 điểm; đúng một phần 0,5. Đề theo lesson, không phải DAY_DU cuối module; không tự xác nhận capstone/deliverable đã hoàn thành.

## Câu 1 · Ảnh hit/miss tại edge (5đ)

Client lấy ảnh public versioned qua CDN. Hãy kể cả hit fresh và miss/revalidate, không gọi chúng là cùng luồng tới JVM.

**Cần nói đủ:**

- Request ảnh tới thành phần nào trước?
- Luồng fresh hit chạy ra sao?
- Luồng miss/revalidate chạy ra sao?
- 304 có ý nghĩa gì với bản cache?
- CDN tác động được đến query bắt buộc tại origin không?

**Trả lời:**

## Câu 2 · Cache nào giảm đoạn nào? (5đ)

Browser, CDN, Redis app cache và PostgreSQL buffers đều được gọi là cache. Bạn cần chỉ ra khác nhau để tránh chọn sai.

**Cần nói đủ:**

- Client cache giảm phần việc nào?
- CDN giảm phần việc nào?
- App cache giảm phần việc nào?
- DB buffers giảm phần việc nào, có phải query-result cache không?
- Chọn tầng cache dựa vào điều gì?

**Trả lời:**

## Câu 3 · Shared cache lộ giá riêng (5đ)

A/B nhận giá cá nhân khác nhau tại cùng URL; shared cache chỉ key URL và cho lưu response. Team bảo TTL 1 giây đủ an toàn.

**Cần nói đủ:**

- Cache key đang bỏ sót điều gì?
- TTL rất ngắn có giải quyết vấn đề không?
- Bạn chọn policy shared-cache nào cho response này?
- Authorization và cache policy liên hệ thế nào?
- Ngoài user/quyền còn dimensions nào có thể đổi response?

**Trả lời:**

## Câu 4 · no-cache khác no-store (5đ)

Developer dùng no-cache để khẳng định response không bao giờ được lưu, và private để cấm cả browser cache.

**Cần nói đủ:**

- no-cache thực sự quy định gì?
- no-store thực sự quy định gì?
- private ảnh hưởng shared/browser cache ra sao?
- no-store có tác động gì với bản đã lưu trước đó?
- Cần kiểm headers và vendor config như thế nào?

**Trả lời:**

## Câu 5 · TTL hai tầng (5đ)

CDN TTL 30s, app TTL 30s, app có thể fill từ replica lag. Team hứa stale tối đa chắc chắn 30s kể từ primary write.

**Cần nói đủ:**

- TTL đang áp cho điều gì?
- Nguồn fill từ replica ảnh hưởng tuổi dữ liệu ra sao?
- Timeline hai tầng cache có liên hệ thế nào?
- Đánh giá guarantee stale tối đa 30 giây.
- Cần policy nào nếu flow yêu cầu dữ liệu mới?

**Trả lời:**

## Câu 6 · Ảnh overwrite cùng URL (5đ)

Ảnh keyboard.webp đổi nội dung nhưng user còn thấy ảnh cũ. Có cả browser và CDN cache.

**Cần nói đủ:**

- Vì sao có thể còn thấy ảnh cũ ở nhiều tầng?
- Versioned URL giải quyết gì?
- Reference của client cần thay đổi thế nào?
- Nếu giữ nguyên URL thì có các lựa chọn nào?
- Xóa app cache có tác động gì tới CDN/browser?

**Trả lời:**

## Câu 7 · 90% hit là API giảm 90%? (5đ)

Riêng ảnh public 1.000 RPS có edge hit 90%; bỏ qua revalidation. Ảnh origin là object storage, API là origin khác.

**Cần nói đủ:**

- Ước lượng fetch/s tới image origin.
- Suy luận đó áp dụng tới tổng API traffic ra sao?
- Writes/uncacheable calls đi đâu?
- Request hit ratio và byte hit ratio khác gì?
- Ngoài hit ratio cần kiểm các kết quả nào?

**Trả lời:**

## Câu 8 · Cache hỏng thì cứ fallback? (5đ)

Cache toàn bộ hot keys đồng thời miss hoặc Redis lỗi; traffic đọc lớn đổ về DB. Team nói cache là tối ưu nên mất cũng không sao.

**Cần nói đủ:**

- DB load có thể thay đổi thế nào khi cache miss/lỗi?
- Fallback cần giới hạn gì?
- Nêu lựa chọn giảm stampede phù hợp mức nhận diện.
- Source of truth vẫn là gì?
- Cần kiểm degradation và correctness theo workload ra sao?

**Trả lời:**
