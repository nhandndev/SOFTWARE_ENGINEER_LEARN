# M4-1 Docker · Lesson 03 · Lần 1

**Chế độ:** PHONG_VAN theo lesson · 8 câu × 5đ = 40đ · Đạt 34/40 · 35–45 phút.

Trả lời bằng lời hoặc pseudo-config. Chấm ý nghĩa, không bắt thuộc YAML. Dùng topology bài học: app thuộc backend + egress; db/redis chỉ thuộc backend; backend internal; chỉ app publish `127.0.0.1:8081:8080`.

## Câu 1 - Dockerfile và Compose

Dockerfile giải quyết việc gì, Compose giải quyết việc gì? `image`, `service`, `container` có phải cùng một thứ không? Ba service chạy có chứng minh API đã dùng được database chưa?

**Trả lời:**

## Câu 2 - Chọn địa chỉ đúng

Browser trên máy bạn gọi app địa chỉ nào? App container gọi PostgreSQL địa chỉ nào nếu DB nghe 5432? Vì sao JDBC `localhost:5432` trong app sai? Nếu publish thêm DB host port 15432 thì app có phải đổi sang `db:15432` không?

**Trả lời:**

## Câu 3 - Không publish DB

DB/Redis không có `ports`; app có gọi được chúng không, vì sao? Network backend internal có tác dụng gì? Vì sao app có thêm egress khi cần gọi OAuth provider/API ngoài? Cấu hình này đã đủ gọi là production secure chưa?

**Trả lời:**

## Câu 4 - `.env` có tự vào Java không?

`.env` có `DB_PASSWORD=...`. Chỉ tạo file này có tự sinh `SPRING_DATASOURCE_PASSWORD` trong app không? Nêu cách truyền rõ ràng ở bước học environment. Phân biệt Compose `${APP_PORT:-8080}`, `${DB_PASSWORD:?Set DB_PASSWORD}` và Spring `${name:default}`. Vì sao không share nguyên output `docker compose config` có secret?

**Trả lời:**

## Câu 5 - Xóa container và dữ liệu

PostgreSQL dùng named volume `pg_data`. Phân biệt stop/start, down/up và down có tùy chọn xóa volumes về dữ liệu. Vì sao named volume không phải backup? Khi nào tuyệt đối không thử xóa volume để chữa lỗi?

**Trả lời:**

## Câu 6 - Dữ liệu bỗng trống

Hôm qua dùng project name `shopcore-local`, hôm nay dùng `demo-local`, cùng Compose có `pg_data`; DB mới trống. Có chắc Docker đã xóa dữ liệu không? Giải thích tên volume và cách kiểm trước khi đụng/xóa dữ liệu. Tránh thao tác gì?

**Trả lời:**

## Câu 7 - Volume không giải quyết mọi thứ

Có volume rồi đổi PostgreSQL 16 sang major khác là cứ dùng lại nguyên thư mục được không? Vì sao phải kiểm migration/đường dẫn của tag? Redis mẫu bật AOF và mount `/data`: được lợi gì, có thay backup hoặc biến Redis thành nguồn dữ liệu Product chuẩn không?

**Trả lời:**

## Câu 8 - Compose đúng nhưng app chưa tích hợp

Shopcore hiện chỉ có MVC/Lombok và test starter. Bạn đã đặt datasource URL/password và Redis host trong Compose. Những biến này có tự cài driver/JPA/Redis client hoặc tạo repository dùng DB không? Còn phải chuẩn bị và kiểm chứng gì để nói app thật sự tích hợp được?

**Trả lời:**
