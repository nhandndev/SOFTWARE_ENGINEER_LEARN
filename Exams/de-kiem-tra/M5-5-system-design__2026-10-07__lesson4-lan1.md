# M5-5 System Design · Lesson 4 · Bottleneck và design document

Ngày soạn: 2026-10-07. Chế độ PHONG_VAN: 8 tình huống × 5 = 40 điểm; đạt từ **34/40**. [Bài học](../../Notes/M5_Scalability/M5_5_System_Design/LESSON_04_BOTTLENECK_DESIGN_DOCUMENT.md). Trả lời bằng ý hiểu hoặc pseudocode, không ép thuộc tên API. Mỗi ý trong “Cần nói đủ” là 1 điểm; đúng một phần 0,5. Đề theo lesson, không phải DAY_DU cuối module; không tự xác nhận capstone/deliverable đã hoàn thành.

## Câu 1 · Đọc sơ đồ proposed (5đ)

Dùng sơ đồ Lesson 04 gồm CDN/object origin, LB/A/B, cache tùy chọn, primary và replica. Kể một read và một write, không bắt code.

**Cần nói đủ:**

- Ảnh public cache hit đi qua các node nào?
- Một API request qua LB/A/B như thế nào?
- Khi nào đọc cache hoặc replica?
- Write/strong read và replication đi theo đường nào?
- Chú giải proposed/implemented và ý nghĩa các arrows.

**Trả lời:**

## Câu 2 · Case A: pool wait tăng (5đ)

Giả lập cùng workload: app CPU25%, DB CPU90%, list21 SQL/request, pool wait tăng, HTTP p95 900ms. Mục tiêu giả định300ms.

**Cần nói đủ:**

- Bạn đặt giả thuyết bottleneck nào, độ chắc chắn ra sao?
- Cần kiểm SQL/plan/locks nào?
- Pool wait có thể là nguyên nhân hay hậu quả thế nào?
- Đánh giá thêm app hoặc tăng pool ngay.
- Bạn kiểm chứng thay đổi dưới điều kiện nào?

**Trả lời:**

## Câu 3 · Case B khác Case A (5đ)

App CPU95%, DB CPU20%, pool wait thấp, profiling thấy transform/serialize payload lớn. Team vẫn đề nghị replica như Case A.

**Cần nói đủ:**

- Evidence nào chỉ hướng điều tra?
- Có thể giảm phần công việc nào trước?
- Khi nào cân nhắc app scaling?
- Read replica giải quyết được phần CPU nào?
- Bạn đo những kết quả nào ngoài CPU?

**Trả lời:**

## Câu 4 · Baseline so thế nào mới công bằng? (5đ)

Team so latency cache warm ở bản mới với cold ở bản cũ, khác dữ liệu và traffic. Họ kết luận thiết kế nhanh gấp10.

**Cần nói đủ:**

- Cần giữ/document workload nào?
- Cần giữ/document dataset/payload/version nào?
- Warm/cold, duration và repeats ảnh hưởng gì?
- Các metrics phải được so thế nào?
- Đánh giá claim 10× và điều kiện correctness/freshness.

**Trả lời:**

## Câu 5 · Facts hay assumption? (5đ)

Source đang xem có model/DTO/common, chưa có business workload để load test; bạn cần docs bottleneck và design.

**Cần nói đủ:**

- Facts nào hiện có thể ghi?
- Các số/yêu cầu giả định đặt ở đâu?
- Bottleneck/capacity chưa đo phải ghi ra sao?
- Decision Proposed cần những nội dung gì?
- Validation chưa chạy được ghi như thế nào?

**Trả lời:**

## Câu 6 · A chết, primary chết (5đ)

Topology hai app và replica. So tình huống A chết với primary DB chết, không có automatic promotion đã chứng minh.

**Cần nói đủ:**

- A chết cần LB/B đáp ứng điều kiện nào?
- Request đang chạy có thể xảy ra gì?
- Primary chết ảnh hưởng flow nào?
- Replica có vai trò/failover nào đã hoặc chưa có?
- Cached/stale reads có thể tiếp tục theo policy nào?

**Trả lời:**

## Câu 7 · Retry ở mọi tầng (5đ)

Client/LB/app đều retry khi POST tạo resource timeout. Team bảo retry luôn tăng availability mà không có giá phải trả.

**Cần nói đủ:**

- Retry nhiều tầng tác động tải ra sao?
- Timeout có cho biết chắc commit chưa xảy ra không?
- POST retry cần contract gì?
- Bạn giới hạn retry/timeout và degraded behavior thế nào?
- LB có guarantee exactly-once không?

**Trả lời:**

## Câu 8 · Thêm Java replicas để tăng quota AI? (5đ)

API tương lai gọi model provider; latency do provider và quota giới hạn. Team muốn thêm10 JVM và shared-cache mọi chat response.

**Cần nói đủ:**

- Capacity backend khác provider latency/quota thế nào?
- Thêm JVM có tác động gì tới quota/GPU?
- Bạn chọn metrics/bottleneck nào để điều tra?
- Cache chat response phải xét điều kiện nào?
- Bạn quyết định/kiểm chứng thay đổi thế nào trong scope bài?

**Trả lời:**
