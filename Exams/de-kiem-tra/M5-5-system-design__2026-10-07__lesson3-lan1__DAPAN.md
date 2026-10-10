# Bài giải / rubric · M5-5 System Design Lesson 3

40 điểm, đạt 34. Mỗi tiêu chí 1 điểm: đủ và đúng = 1; đúng hướng nhưng thiếu điều kiện = 0,5; sai/thiếu = 0. Chấm ý nghĩa tương đương, không ép câu chữ; không cap ngầm. [Bài học](../../Notes/M5_Scalability/M5_5_System_Design/LESSON_03_READ_REPLICA_CONSISTENCY.md) · [Quy tắc chấm](../../Notes/M5_Scalability/M5_5_System_Design/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Write vào primary và commit (1); Async không chờ mọi replica replay (1); GET ở t20 có thể thấy Old (1); t100 có thể thấy New nếu replay đã áp (1); Không dùng delay cố định làm guarantee thực (1) |
| 2 | Public stale-tolerant có thể replica (1); Read-after-write chọn primary/policy phù hợp (1); Invariant/constraint trên primary (1); Không route chỉ theo HTTP method (1); Cache cũ vẫn cần bypass/invalidate (1) |
| 3 | Annotation không tự tạo/routing replica (1); Cần DataSource/connection policy rõ (1); Transaction semantics liên quan nguồn đọc (1); HTTP LB không route SQL (1); Kiểm actual endpoint/query source thay vì đoán (1) |
| 4 | Replica chủ yếu chia reads đủ điều kiện (1); Writes vẫn primary trong mô hình bài (1); Locks/write bottleneck không tự được chữa (1); Có thể giảm read load gián tiếp nếu đúng workload (1); Đo/query optimize trước và sau (1) |
| 5 | Replication có thể truyền xóa nhầm (1); Replica không phải lịch sử backup (1); Backup/PITR phục vụ khôi phục trạng thái (1); HA/failover là mục tiêu khác (1); Không hứa zero-loss/zero-downtime mọi mode (1) |
| 6 | Đúng topology DB instance standby không phục vụ reads (1); Read replica là lựa chọn chia reads riêng (1); Không suy mọi Multi-AZ product giống nhau (1); HA khác read scaling (1); Kiểm docs/topology/endpoint cụ thể (1) |
| 7 | Nêu CPU/IO/network/storage/cost (1); Lag cần quan sát (1); Query conflict/replay trade-off (1); Query thiếu index vẫn cần tối ưu (1); Replica hỏng fallback có thể overload primary (1) |
| 8 | Replica không tự thành writer trong sơ đồ (1); Cần promote/failover/routing design (1); Nêu rủi ro write chưa replay (1); RPO là data-loss mục tiêu (1); RTO là recovery-time mục tiêu (1) |

## Câu 1 · PUT xong GET thấy tên cũ

Primary đã commit nhưng async replica chưa replay. GET t20 có thể Old, t100 sau replay có thể New nếu không có nguồn stale khác. Timeline chỉ minh họa; lag thực thay đổi, sleep cố định không bảo read-after-write.

## Câu 2 · Route mọi GET tới replica?

Public list có thể dùng replica khi cần chia read load. Admin cần mới nên primary hoặc contract write response/read routing rõ. SKU cần primary transaction/unique constraint bảo vệ race; GET/SELECT không tự đủ thông tin consistency. Primary routing vẫn không chữa cached response cũ nếu chưa bypass/invalidate.

## Câu 3 · readOnly annotation tự route?

readOnly không tự cấu hình endpoint hoặc route replica. Cần routing DataSource/connection/transaction policy và xác minh query dùng nguồn nào. HTTP LB chỉ route app requests, không chọn SQL primary/replica. Không claim chia tải khi thực tế mọi query còn vào primary.

## Câu 4 · DB nghẽn writes

Replica mô hình này phục vụ reads, writes/locks vẫn primary. Nó có thể giảm phần read contention phù hợp nhưng không đảm bảo write throughput ×2. Điều tra transaction/locks/query/workload; đo before/after, không thêm replica như write scaling switch.

## Câu 5 · Replica có phải backup?

Replication sao thay đổi, kể cả DELETE nhầm. Cần backup/PITR để phục hồi lịch sử theo cơ chế đã thiết kế; replica khác HA/failover và backup. Async promote có rủi ro phần chưa replay, không hứa zero-loss/downtime chỉ vì có bản sao.

## Câu 6 · Standby và replica đều đọc được?

RDS Multi-AZ DB instance standby phục vụ HA, không read traffic. Không đánh đồng với Multi-AZ DB cluster có readers hoặc read replica riêng. Muốn report cần lựa chọn read source hỗ trợ thật; kiểm service/topology/endpoint, không dựa vào tên standby.

## Câu 7 · Replica không miễn phí

Replica execute query và replay, tiêu CPU/IO/network/storage/cost. Hot standby có query conflict/replay trade-off, cần theo dõi lag; query xấu vẫn cần index/plan. Fallback report về primary có thể tạo overload, cần giới hạn/degraded policy, không coi bản sao là tài nguyên miễn phí.

## Câu 8 · Promote khi primary hỏng

Mũi tên replication không tạo automation promote/reroute. Thiết kế failover riêng, đánh giá write chưa replay có thể mất. RPO mô tả lượng/thời gian dữ liệu chấp nhận mất; RTO thời gian khôi phục mục tiêu. Không cần triển khai DR ở đề này nhưng không được hứa zero-loss tự động.

