# M5-5 System Design · Lesson 1 · Workload, scaling và LB

Ngày soạn: 2026-10-07. Chế độ PHONG_VAN: 8 tình huống × 5 = 40 điểm; đạt từ **34/40**. [Bài học](../../Notes/M5_Scalability/M5_5_System_Design/LESSON_01_REQUIREMENTS_SCALING_LB.md). Trả lời bằng ý hiểu hoặc pseudocode, không ép thuộc tên API. Mỗi ý trong “Cần nói đủ” là 1 điểm; đúng một phần 0,5. Đề theo lesson, không phải DAY_DU cuối module; không tự xác nhận capstone/deliverable đã hoàn thành.

## Câu 1 · Một triệu user chưa phải workload (5đ)

Team nói shopcore có một triệu user nên cần 10 app instances. Chưa có measurement. Bạn hỏi gì trước và có chốt số máy được chưa?

**Cần nói đủ:**

- User count, RPS và concurrency khác nhau thế nào?
- Cần biết gì về route mix, read/write và payload?
- Cần biết gì về peak, burst và freshness?
- Mục tiêu chất lượng và giới hạn vận hành nào cần hỏi?
- Bạn đánh giá quyết định 10 máy hiện tại ra sao?

**Trả lời:**

## Câu 2 · Ước lượng tải có đơn vị (5đ)

Giả định ổn định 1.000 RPS, mean latency 0,2 giây; mỗi response 20 KB ở link đang xét, chưa headers. Tính rồi giải thích giới hạn của ước lượng.

**Cần nói đủ:**

- Payload bandwidth xấp xỉ là bao nhiêu?
- Average in-flight requests xấp xỉ là bao nhiêu?
- Phép ước lượng cần điều kiện và loại latency nào?
- Có thay mean bằng p95 như đẳng thức được không?
- Số in-flight có ý nghĩa gì với threads/DB connections?

**Trả lời:**

## Câu 3 · Scale up hay scale out? (5đ)

Ứng dụng CPU-bound, workload tăng; team cân nhắc máy lớn hơn hoặc thêm instances. Hãy so sánh thay vì tuyên bố một cách luôn tốt.

**Cần nói đủ:**

- Vertical scaling thay đổi gì?
- Horizontal scaling thay đổi gì?
- Vertical có lợi ích/giới hạn nào?
- Horizontal có lợi ích/chi phí nào?
- Chọn theo gì và có bắt buộc microservices không?

**Trả lời:**

## Câu 4 · Một request có chạy ở cả A và B? (5đ)

Client GET Product qua LB, app A/B dùng cùng DB. Đồng nghiệp nghĩ LB broadcast request để hai máy cùng làm và DB query tự nhanh hơn.

**Cần nói đủ:**

- Client bắt đầu request tới đâu?
- LB chọn target như thế nào trong mô hình bài?
- 3-layer và SQL query chạy ở đâu?
- Response quay về client ra sao?
- Đánh giá ý kiến broadcast và query tự nhanh hơn.

**Trả lời:**

## Câu 5 · Map local sau LB (5đ)

POST tới A lưu Product vào Map RAM, GET tới B trả 404. Team muốn bật sticky session và JWT là đủ.

**Cần nói đủ:**

- Vì sao GET ở B không thấy Product?
- Business state cần đặt ở đâu và cần durability gì?
- Sticky session giải quyết được đến đâu khi A hỏng?
- JWT giúp được gì với Product data?
- Đề xuất hướng sửa và có cần tách microservices không?

**Trả lời:**

## Câu 6 · Pool size theo từng máy (5đ)

4 instances, mỗi maxPool 20; autoscale thành 10. DB có connection budget hữu hạn. Hãy đánh giá.

**Cần nói đủ:**

- Tính connection maximum của app trước/sau scale.
- Ngoài app còn consumers connection nào?
- Maximum configured khác connections bận ra sao?
- Cần so với budget/tải nào?
- Tăng pool có chữa mọi SQL/lock bottleneck không?

**Trả lời:**

## Câu 7 · 4 máy là đủ chính xác? (5đ)

Một instance đo đạt target ở 250 RPS. Peak dự kiến 1.000 RPS. Team chốt đúng 4 instance, không cần dự phòng hoặc đo lại.

**Cần nói đủ:**

- Phép chia cho kết quả sizing lý tưởng nào?
- Burst/headroom ảnh hưởng quyết định ra sao?
- Nếu một instance mất thì sao?
- Shared dependencies ảnh hưởng capacity thế nào?
- Bạn kiểm chứng sizing bằng cách nào?

**Trả lời:**

## Câu 8 · LB health check có tuyệt đối? (5đ)

Health checks bật; một instance chết, rồi giả sử mọi target đều unhealthy trên ALB. Team hứa không request nào tới target lỗi và LB tự tạo máy mới.

**Cần nói đủ:**

- Interval/threshold ảnh hưởng phát hiện lỗi thế nào?
- Readiness và liveness dùng cho quyết định gì?
- ALB có tình huống ngoại lệ nào khi mọi target unhealthy?
- LB và autoscaling khác vai trò thế nào?
- Request đang chạy có được bảo đảm không lỗi không?

**Trả lời:**
