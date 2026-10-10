# Bài giải / rubric · M5-5 System Design Lesson 1

40 điểm, đạt 34. Mỗi tiêu chí 1 điểm: đủ và đúng = 1; đúng hướng nhưng thiếu điều kiện = 0,5; sai/thiếu = 0. Chấm ý nghĩa tương đương, không ép câu chữ; không cap ngầm. [Bài học](../../Notes/M5_Scalability/M5_5_System_Design/LESSON_01_REQUIREMENTS_SCALING_LB.md) · [Quy tắc chấm](../../Notes/M5_Scalability/M5_5_System_Design/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Phân biệt users với RPS/concurrency (1); Nêu route mix/read-write và payload (1); Nêu peak/burst và freshness (1); Nêu latency/errors, ngân sách và vận hành (1); Không chốt 10 máy khi chưa có capacity measurement (1) |
| 2 | Tính payload xấp xỉ MB/s (1); Tính average in-flight requests (1); Nêu điều kiện ổn định và mean (1); Không dùng p95 thay mean như đẳng thức (1); Không đồng nhất in-flight với DB connections/CPU threads (1) |
| 3 | Vertical là gì (1); Horizontal là gì (1); Lợi ích/giới hạn vertical (1); Lợi ích/chi phí state và vận hành horizontal (1); Chọn theo bottleneck/evidence, không mặc định microservices (1) |
| 4 | Client tới LB (1); Một target được chọn theo policy (1); 3-layer/query chạy trong target đó (1); Response đi về qua LB (1); LB không broadcast bình thường hoặc tối ưu SQL/transaction (1) |
| 5 | Giải thích Map A/B độc lập (1); Nêu durability/state location cần thiết kế (1); Giới hạn sticky session khi A hỏng (1); JWT không đồng bộ business data (1); Đề xuất DB/shared storage phù hợp, không bắt tách service (1) |
| 6 | Tính 80 và 200 maximum configured connections (1); Tính cả worker/admin/migration (1); Phân biệt max configured và connections đang bận (1); So với DB budget và workload (1); Không tăng pool vô hạn để chữa SQL/lock (1) |
| 7 | Tính cận lý tưởng 4 (1); Nêu headroom/burst (1); Nêu mất một instance (1); Nêu shared DB/network constraints (1); Kiểm lại capacity dưới workload và mục tiêu (1) |
| 8 | Health detection có interval/threshold (1); Readiness khác liveness (1); Nhận diện ALB all-unhealthy fail-open (1); LB routing khác autoscaling (1); Nêu request đang chạy/failure vẫn cần xử lý (1) |

## Câu 1 · Một triệu user chưa phải workload

User đăng ký không đồng nghĩa đang gửi request. Cần active traffic, peak RPS/concurrency, mix routes/read-write, payload và burst; xác định freshness, mục tiêu latency/errors và chi phí/ops. Chưa có capacity đo thì 10 máy chỉ là giả định, không kết luận từ số user.

## Câu 2 · Ước lượng tải có đơn vị

Khoảng 20 MB/s payload theo đơn vị decimal, average in-flight ≈ 1.000×0,2 = 200. Quan hệ dùng trung bình trong trạng thái ổn định, chưa gồm overhead. Không thay p95 rồi gọi chính xác, và 200 request không có nghĩa cần 200 DB connection/thread vì thời gian giữ tài nguyên khác nhau.

## Câu 3 · Scale up hay scale out?

Vertical tăng tài nguyên mỗi máy, đơn giản nhưng có trần/cost/restart và không tự redundancy. Horizontal thêm instances để chia tải nhưng cần routing/state/deploy và shared dependency budget. Hai cách kết hợp được; dựa measurement/bottleneck, shopcore vẫn có thể là monolith scale-out.

## Câu 4 · Một request có chạy ở cả A và B?

Client gọi LB; routing chọn một target A hoặc B theo policy. MVC/Service/Repository tại đó query DB, nhận dữ liệu và trả response qua LB về client. Hai mũi tên tới A/B là lựa chọn, không broadcast. LB không sửa SQL, chia transaction hoặc tự làm từng query nhanh hơn.

## Câu 5 · Map local sau LB

RAM A/B không tự đồng bộ nên B không có row. Dữ liệu cần durability đặt ở DB/shared source phù hợp; file cũng cần nơi truy cập chung nếu scale. Sticky chỉ ghim routing tạm, A chết vẫn mất RAM và có thể lệch tải. JWT không replicate Product. Giữ monolith nhiều instances vẫn hợp lệ.

## Câu 6 · Pool size theo từng máy

Riêng app có thể cần tối đa 80 rồi 200 connection theo cấu hình, cộng phần khác. Không phải lúc nào tất cả bận. Kiểm budget DB và thời gian giữ connection/SQL/locks khi scale; tăng pool có thể làm DB nặng thêm, không tự chữa query chậm.

## Câu 7 · 4 máy là đủ chính xác?

1.000/250=4 là cận lý tưởng theo measurement đã cho, không sizing guarantee. Cần headroom/burst, khả năng mất một instance và phần shared DB/network. Đo workload thật với replica count dự kiến, latency/errors và cost; không hứa scaling tuyến tính.

## Câu 8 · LB health check có tuyệt đối?

Phát hiện lỗi có độ trễ/policy, readiness hỗ trợ routing còn liveness phục vụ restart decision. ALB có fail-open khi mọi target unhealthy nên không hứa tuyệt đối. LB không tự provision app instances thay autoscaling; in-flight requests có thể lỗi, cần capacity/failure behavior và retry contract phù hợp.

