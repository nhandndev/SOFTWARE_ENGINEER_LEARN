# M4-1 Docker · Lesson 04 · Lần 1

**Chế độ:** PHONG_VAN theo lesson · 8 câu × 5đ = 40đ · Đạt 34/40 · 35–45 phút.

Dùng cấu hình đầy đủ ở lesson 4. Không cần thuộc YAML; cần dự đoán đúng hành vi và cách xác minh, không chữa lỗi bằng xóa dữ liệu.

## Câu 1 - Chờ dependency

`depends_on: [db, redis]` khác `condition: service_healthy` thế nào? Running, healthy và app ready có đồng nghĩa không? Healthcheck xanh có chứng minh request tạo Product thành công chưa?

**Trả lời:**

## Câu 2 - Probe PostgreSQL

Mẫu dùng `pg_isready -h 127.0.0.1 -U ... -d ...`. Probe này xác nhận điều gì, không xác nhận điều gì về password/schema/quyền của app? Vì sao chọn TCP thay vì chỉ kiểm Unix socket lúc init? Vì sao không mặc định thêm `/actuator/health` và curl healthcheck vào app image hiện tại?

**Trả lời:**

## Câu 3 - DB chết sau startup

App đã khởi động nhờ DB healthy, sau đó DB ngừng hoạt động. Compose có tự pause app đến khi DB khỏe lại không? Unhealthy có tự restart container không? App cần cách ứng xử và người vận hành cần kiểm gì?

**Trả lời:**

## Câu 4 - Secret đi vào hai service

Giải thích luồng file host → Compose secret → DB `POSTGRES_PASSWORD_FILE` và app `configtree:/run/secrets/` với target `spring.datasource.password`. Vì sao không đặt `SPRING_DATASOURCE_PASSWORD_FILE` rồi cho rằng Spring tự hiểu? File secret local có được mã hóa tự động không, cần bảo vệ gì?

**Trả lời:**

## Câu 5 - Dấu đô la đôi

Trong Compose healthcheck có `test: ["CMD-SHELL", "pg_isready -U \"$$POSTGRES_USER\" -d \"$$POSTGRES_DB\""]`. Vì sao có `$$`? Compose và shell container xử lý ở bước nào? Nếu dùng CMD exec-form mà muốn `$VAR` tự được shell expand thì có đúng không?

**Trả lời:**

## Câu 6 - Đổi password nhưng DB không đổi

Volume đã có DB từ hôm qua. Bạn sửa secret file, recreate app + db; DB vẫn healthy nhưng app báo authentication failed. Giải thích. Nêu hướng sửa/rotate không xóa data, kể cả env cũ có thể override configtree.

**Trả lời:**

## Câu 7 - Phân loại lỗi

Phân biệt và nêu kiểm tra tiếp theo cho: (a) connection refused tới localhost trong app; (b) DB authentication failed; (c) gọi app được HTTP 401; (d) root `/` trả 404. Có nên chữa cả bốn bằng rebuild image hoặc mở public cổng DB không?

**Trả lời:**

## Câu 8 - Chứng cứ hoàn thành

Nêu kế hoạch kiểm chứng: build image/Java/non-root, Compose config/health và network, app thực sự đọc ghi DB, persistence sau recreate, secrets không vào Git/image. Vì sao chưa được báo hoàn thành nếu chỉ kiểm config + DB? Có cần dùng prune hay xóa volume thật trong phép kiểm không?

**Trả lời:**
