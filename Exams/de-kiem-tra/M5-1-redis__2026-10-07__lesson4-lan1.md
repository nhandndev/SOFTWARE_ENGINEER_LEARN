# M5-1 · Lesson04 · Đo hiệu quả và cache lỗi

**PHONG_VAN theo lesson · 8×5=40đ · 45–60phút · đạt từ34/40.** Điểm=điểm thô/40×100. Dùng lời/kế hoạch đo, không yêu cầu chạy load tool thật. Số liệu câu5là giả định, không kết quả project.

## Câu 1 - Miss khác error (5đ)

Redis trả không có key so với GET timeout/deserialize lỗi khác nhau thế nào? Default Spring Cache có tự fallback DB cho mọi lỗi không? Nêu hậu quả error trước body và rủi ro catch mọi Exception→empty list200.

**Trả lời:**

## Câu 2 - Thiết kế fail-open (5đ)

Public catalog cần chịu Redis outage. Nêu boundary/policy fallback có chọn lọc, timeout và khả năng DB chịu tải, metric/log, cách phân biệt cache lỗi với DB/serialization bug. Có phải chỉ thêm Redis là đã có fallback này không?

**Trả lời:**

## Câu 3 - Cold key có100request (5đ)

Vì sao có thể100query DB dù đã @Cacheable? Nêu hai hướng giảm stampede và vì sao sync=true không được mặc định coi là distributed lock toàn hệ thống/atomic DB+Redis. Có cần code lock đầy đủ trong module này không?

**Trả lời:**

## Câu 4 - Thiết kế phép đo trước/sau (5đ)

Mô tả baseline/cold miss/warm hit, warm-up và điều kiện giữ giống nhau. Nêu số liệu cần thu ngoài một average, cách xác nhận hit thật giảm DB calls và phân biệt end-to-end với timer trong method cacheable.

**Trả lời:**

## Câu 5 - Đọc số liệu không phóng đại (5đ)

Cùng workload1000request sau warm-up: baseline p50=30ms,p95=55ms,DBcalls1000; cache p50=7ms,p95=15ms,DBcalls20; cả hai0HTTPerror. Có thể kết luận gì và chưa kết luận gì về mọi request, freshness, outage, RAM/key diversity? Nêu hai kiểm bổ sung.

**Trả lời:**

## Câu 6 - Memory eviction và key cardinality (5đ)

Key TTL còn40giây nhưng Redis hết RAM. Có thể miss hoặc write fail không? Phân biệt expiration/eviction/policy. Nhiều keyword/page/sort ít lặp gây vấn đề gì; đề xuất quyết định dựa trên hit ratio, memory và query cost.

**Trả lời:**

## Câu 7 - Khi không nên cache (5đ)

Phân tích query rẻ ít lặp, tồn kho checkout và dữ liệu theo quyền/user. Với AI output phụ thuộc model/version/context, vì sao key chỉ có prompt nguy hiểm? Nêu lựa chọn an toàn hơn thay vì cache mọi thứ.

**Trả lời:**

## Câu 8 - Bằng chứng để tin triển khai (5đ)

Lập checklist5nhóm: correctness/key/metadata; hit/miss/TTL; mutation/commit; outage/concurrency; latency và điều kiện đo. Fake source+Redis thật có chứng minh JPA/DB transaction/HTTP/SLA production không? Đọc bài/fixture đạt có tự đủ deliverable roadmap không?

**Trả lời:**
