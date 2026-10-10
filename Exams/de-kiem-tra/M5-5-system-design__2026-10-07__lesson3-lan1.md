# M5-5 System Design · Lesson 3 · Read replica và freshness

Ngày soạn: 2026-10-07. Chế độ PHONG_VAN: 8 tình huống × 5 = 40 điểm; đạt từ **34/40**. [Bài học](../../Notes/M5_Scalability/M5_5_System_Design/LESSON_03_READ_REPLICA_CONSISTENCY.md). Trả lời bằng ý hiểu hoặc pseudocode, không ép thuộc tên API. Mỗi ý trong “Cần nói đủ” là 1 điểm; đúng một phần 0,5. Đề theo lesson, không phải DAY_DU cuối module; không tự xác nhận capstone/deliverable đã hoàn thành.

## Câu 1 · PUT xong GET thấy tên cũ (5đ)

Primary commit tên New ở t0, GET replica ở t20ms, replay ở t80ms. Không cache. Hãy giải thích.

**Cần nói đủ:**

- PUT được ghi và commit ở đâu?
- Async commit có quan hệ gì với replay?
- GET ở t20 có thể trả gì?
- GET ở t100 có thể trả gì và theo điều kiện nào?
- Delay cố định có đủ cho guarantee thực không?

**Trả lời:**

## Câu 2 · Route mọi GET tới replica? (5đ)

Public list chấp nhận stale, admin vừa sửa cần thấy ngay, kiểm SKU trước insert cần bảo vệ race.

**Cần nói đủ:**

- Public list có thể đọc nguồn nào, với điều kiện gì?
- Admin cần read-after-write nên chọn policy nào?
- Invariant/unique race được bảo vệ ở đâu?
- Route chỉ theo HTTP method có đủ không?
- Các tầng cache ảnh hưởng quyết định freshness thế nào?

**Trả lời:**

## Câu 3 · readOnly annotation tự route? (5đ)

Có primary và replica endpoint; Service đặt @Transactional(readOnly=true), chưa có routing DataSource. Team nói SELECT đã tự sang replica.

**Cần nói đủ:**

- Annotation readOnly tự làm được những gì ở tình huống này?
- Cần thêm policy/config nào để route replica?
- Transaction có liên quan nguồn đọc ra sao?
- HTTP LB có chọn primary/replica SQL không?
- Bạn xác minh query đang tới nguồn nào bằng cách nào?

**Trả lời:**

## Câu 4 · DB nghẽn writes (5đ)

Primary chờ locks trên UPDATE nhiều; team thêm read replica để hứa write throughput gấp đôi.

**Cần nói đủ:**

- Replica chia loại workload nào trong mô hình bài?
- Writes vẫn đi đâu?
- Lock/write bottleneck chịu ảnh hưởng thế nào?
- Có lợi ích gián tiếp nào tùy workload không?
- Bạn đo và tối ưu theo hướng nào?

**Trả lời:**

## Câu 5 · Replica có phải backup? (5đ)

Xóa nhầm row ở primary, vài giây sau replica cũng mất. Team tưởng replica là bản backup luôn giữ dữ liệu cũ.

**Cần nói đủ:**

- DELETE nhầm có thể lan sang replica như thế nào?
- Replica giữ lịch sử phục hồi ra sao?
- Backup/PITR dùng để làm gì?
- HA/failover khác mục tiêu thế nào?
- Có thể hứa zero-loss/zero-downtime chỉ từ bản sao không?

**Trả lời:**

## Câu 6 · Standby và replica đều đọc được? (5đ)

Một người dùng RDS Multi-AZ DB instance có standby và muốn gửi report SELECT vào standby đó.

**Cần nói đủ:**

- Standby của topology cụ thể này có phục vụ report SELECT không?
- Read replica có vai trò gì khác?
- Có được suy mọi sản phẩm Multi-AZ giống nhau không?
- Phân biệt HA và read scaling.
- Bạn cần kiểm docs/topology/endpoint nào?

**Trả lời:**

## Câu 7 · Replica không miễn phí (5đ)

Report query nặng ở PostgreSQL replica, replay bị ảnh hưởng; team cho rằng replica chỉ sao chép data nên không tốn thêm gì.

**Cần nói đủ:**

- Replica tiêu tốn những tài nguyên/chi phí nào?
- Vì sao cần theo dõi lag?
- Query trên standby và replay có trade-off gì?
- Query thiếu index có thay đổi bản chất không?
- Fallback về primary khi replica hỏng có rủi ro gì?

**Trả lời:**

## Câu 8 · Promote khi primary hỏng (5đ)

Async replica được xem là ứng viên writer mới. Chưa có failover automation, có thể còn write chưa replay.

**Cần nói đủ:**

- Replica hiện tại có tự thành writer không?
- Cần thiết kế gì cho promote/failover/routing?
- Writes chưa replay tạo rủi ro gì?
- RPO mô tả mục tiêu nào?
- RTO mô tả mục tiêu nào?

**Trả lời:**
