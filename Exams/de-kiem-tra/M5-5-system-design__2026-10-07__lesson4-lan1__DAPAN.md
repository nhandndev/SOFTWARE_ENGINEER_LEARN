# Bài giải / rubric · M5-5 System Design Lesson 4

40 điểm, đạt 34. Mỗi tiêu chí 1 điểm: đủ và đúng = 1; đúng hướng nhưng thiếu điều kiện = 0,5; sai/thiếu = 0. Chấm ý nghĩa tương đương, không ép câu chữ; không cap ngầm. [Bài học](../../Notes/M5_Scalability/M5_5_System_Design/LESSON_04_BOTTLENECK_DESIGN_DOCUMENT.md) · [Quy tắc chấm](../../Notes/M5_Scalability/M5_5_System_Design/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Ảnh hit edge không qua app (1); API LB chọn một instance (1); Cache/replica chỉ dùng theo policy (1); Write/strong read tới primary, async replication (1); Phân biệt proposed với implemented và giải thích arrows (1) |
| 2 | Nêu giả thuyết DB/query/N+1 chứ chưa fact (1); Kiểm SQL count/plan/locks (1); Pool wait có thể là hậu quả (1); Không mặc định thêm app/tăng pool (1); Đo lại same workload và correctness (1) |
| 3 | Dùng profiling/bottleneck app evidence (1); Giảm payload/computation là lựa chọn (1); Vertical/horizontal app có thể hợp lý (1); Replica không chữa app CPU trực tiếp (1); Đo latency/errors/cost không chỉ CPU (1) |
| 4 | Giữ/document route mix, RPS và concurrency (1); Giữ dataset/payload/version liên quan (1); Kiểm warm/cold và duration/repeats (1); So latency distribution/errors/throughput cùng unit/time (1); Không claim10x khi conditions khác và kiểm freshness/privacy (1) |
| 5 | Ghi facts source có thật (1); Ghi số liệu/yêu cầu giả định là assumptions (1); Ghi bottleneck/capacity chưa đo là unknown (1); Decision Proposed có options/trade-off (1); Validation planned không ghi PASS giả (1) |
| 6 | A chết cần health detection và B capacity (1); In-flight request có thể lỗi (1); Primary chết ảnh hưởng writes/strong reads (1); Replica không tự writer/failover (1); Cache/read degradation theo policy, không hứa toàn hệ thống vẫn tốt (1) |
| 7 | Retry nhiều tầng có thể nhân tải (1); Timeout không chứng minh chưa commit (1); POST cần idempotency contract phù hợp (1); Bounded retries/timeouts/degraded behavior (1); LB không bảo đảm exactly-once (1) |
| 8 | Phân biệt backend capacity với provider latency/quota (1); Thêm JVM không tự tăng quota/GPU capacity (1); Đo provider/errors/backlog phù hợp (1); Cache phải xét context/privacy/freshness (1); Chọn thay đổi có validation/cost và không thêm tech ngoài scope (1) |

## Câu 1 · Đọc sơ đồ proposed

Ảnh public hit edge dừng tại CDN; API tới LB chọn A hoặc B. Read chỉ dùng cache/replica nếu key/freshness phù hợp; write và reads cần mới tới primary, primary replicate độc lập. Diagram proposed không nói mọi request qua mọi node hoặc source đã có tất cả.

## Câu 2 · Case A: pool wait tăng

N+1/query/DB work là giả thuyết có cơ sở, chưa kết luận từ CPU. Đếm SQL theo route, xem plan/buffers/locks; pool wait có thể do query giữ connection lâu. Thêm app/pool có thể đẩy DB nặng hơn. Sửa hẹp rồi đo lại cùng workload/correctness.

## Câu 3 · Case B khác Case A

Evidence nghiêng app CPU transform/serialize, nên cân nhắc payload/computation hoặc app scale. Replica không giải trực tiếp phần CPU đó. Chọn bằng phép đo có latency/errors/cost và cùng workload, không reuse giải pháp Case A vì đều chậm.

## Câu 4 · Baseline so thế nào mới công bằng?

Phải giữ hoặc ghi khác biệt workload, dữ liệu/payload, warm/cold, version/count instances, duration và repeats. So distributions, errors, throughput cùng unit/time; kiểm cả freshness/privacy. So warm với cold khác traffic chưa chứng minh10x do thiết kế; đo lại có kiểm soát.

## Câu 5 · Facts hay assumption?

Liệt kê source facts thật, tách RPS/targets giả định. Bottleneck và capacity chưa đo ghi Unknown, không tự gọi DB yếu. Decision Proposed so giữ đơn giản/tối ưu/scale theo trade-off; validation là kế hoạch chưa chạy, không claim PASS/merged deliverable.

## Câu 6 · A chết, primary chết

A chết LB cần detect và B đủ capacity; in-flight có thể lỗi. Primary chết làm writes/strong reads fail; replica không tự promote trong topology này. Một số cached/stale-tolerant reads có thể tiếp tục theo policy nhưng không bảo toàn mọi workflow; nêu recovery/failure behavior.

## Câu 7 · Retry ở mọi tầng

Nhiều tầng retry nhân tải lúc hệ thống đang yếu. Timeout có thể xảy ra sau commit nên POST lặp tạo trùng nếu thiếu idempotency contract. Dùng retries/timeouts có giới hạn và degraded policy theo loại lỗi; LB không tự exactly-once hay tăng capacity.

## Câu 8 · Thêm Java replicas để tăng quota AI?

Provider latency/quota không phải CPU Java; thêm JVM không tạo quota/GPU mới, còn có thể tăng rate-limit. Đo provider latency/errors/backlog và giới hạn traffic. Chat cache phải theo context/quyền/freshness, không shared tùy tiện. Quyết định theo evidence/cost/validation, không bắt thêm vectorDB/sharding ở module này.

