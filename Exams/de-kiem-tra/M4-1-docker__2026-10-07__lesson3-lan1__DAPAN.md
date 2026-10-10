# Đáp án M4-1 · Lesson 03

8 câu × 5đ = 40đ; đạt 34/40. Cho điểm đúng phần đã chứng minh; không suy diễn rằng biết hết khi chỉ nêu keyword. Cách diễn đạt tương đương được công nhận.

| Câu | Rubric /5 |
|---|---|
| 1 | Dockerfile build image (1); Compose topology/lifecycle (1); phân biệt image/service/container (2); running không chứng minh integration (1) |
| 2 | Host 8081 (1); db:5432 (1); localhost là app container (1); host mapping không đổi cổng nội bộ (2) |
| 3 | Cùng network + service DNS (2); internal isolation (1); app egress (1); chưa production security (1) |
| 4 | .env phục vụ interpolation, không tự inject (1); environment mapping rõ (1); hai cú pháp default khác nhau (1); required guard (1); config có thể lộ secret (1) |
| 5 | stop/start giữ container (1); down/up giữ named volume mặc định (1); xóa volume có thể mất dữ liệu (1); backup độc lập (1); không reset DB thật chữa lỗi (1) |
| 6 | Project scope tạo tên volume khác (2); volume cũ có thể còn (1); inspect đúng project/mount (1); không prune/xóa thử (1) |
| 7 | Major upgrade không tự tương thích (1); kiểm migration/layout tag (1); AOF và /data persistence (1); durability có giới hạn (1); không backup/nguồn Product tự động (1) |
| 8 | Env chỉ config, không cài dependency (2); driver/JPA/client và code cần thiết (1); schema/migration/config đúng (1); kiểm request đọc/ghi thật (1) |

## Câu 1

Dockerfile là công thức tạo image. Compose khai báo service, image hoặc build, network, volume và cách khởi chạy. Image là gói bất biến dùng tạo container; service là định nghĩa một thành phần trong Compose; container là instance chạy. Có ba process đang running không chứng minh app kết nối hay ghi được DB.

**Thiếu điểm nếu:** gọi Compose là nơi viết business logic, hoặc xem running là đủ. Ôn lesson 3 mục 1–2, 8.

## Câu 2

Browser gọi `http://localhost:8081`; app gọi `jdbc:postgresql://db:5432/shopcore`. Trong app, localhost trỏ về chính app container, không phải db. Mapping `15432:5432` phục vụ client ngoài Docker network; app vẫn dùng cổng đích nội bộ 5432, không dùng 15432.

**Thiếu điểm nếu:** biết db hostname nhưng dùng nhầm host port. Ôn mục 2–4.

## Câu 3

Các service cùng backend network giao tiếp qua DNS tên service và cổng process đang nghe, không cần publish ra host. Internal network hạn chế kết nối bên ngoài của network đó; app còn egress để có đường ra khi cần API ngoài. Đây không thay authorization, TLS, least privilege hay secret management. Redis mẫu chưa ACL/password nên chỉ là local isolated demo.

**Thiếu điểm nếu:** nghĩ không ports thì mọi container khác đều không gọi được. Ôn mục 3–4.

## Câu 4

Compose dùng `.env`/shell làm nguồn thay placeholder; file không tự biến mọi key thành env của app. Bước env có thể khai báo `SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD:?Set DB_PASSWORD}` trong environment. `${APP_PORT:-8080}` dùng default nếu unset/empty; `${DB_PASSWORD:?…}` fail nếu unset/empty. Spring placeholder `${name:default}` có cú pháp khác và do Spring resolve. Config render/inspect có thể chứa password; không đăng nguyên output.

**Thiếu điểm nếu:** nói .env là encrypted secret store. Lesson 4 thay cách env này bằng file mount. Ôn mục 5.

## Câu 5

Stop/start giữ cùng container. Down gỡ container/network; up tạo lại, named volume vẫn còn mặc định. Down với tùy chọn xóa volumes có thể xóa named volume thuộc project và mất dữ liệu; external volume có lifecycle riêng. Volume persistence không chống xóa nhầm, corruption hay mất máy, nên cần backup có kiểm restore. Không xóa volume DB thật để sửa auth/config.

**Thiếu điểm nếu:** nói down mặc định luôn xóa volume, hoặc volume là backup. Ôn mục 6–7.

## Câu 6

Named volume mặc định có project prefix, ví dụ `shopcore-local_pg_data` khác `demo-local_pg_data`. DB mới có thể mount volume mới, còn volume cũ vẫn tồn tại. Kiểm project name, `docker volume ls`, container mounts bằng inspect và đúng volume trước; không prune, xóa hoặc init đè dữ liệu để thử. Nếu cấu hình explicit name/external thì cần đọc lại mapping thay vì đoán theo prefix.

**Thiếu điểm nếu:** kết luận dữ liệu mất chỉ vì query ra trống. Ôn mục 7.

## Câu 7

Major PostgreSQL upgrade cần quy trình tương thích như dump/restore hoặc pg_upgrade được kiểm chứng; không chỉ đổi tag rồi mount lại. Kiểm hướng dẫn tag và mount layout, nhất là thay đổi từ nhánh 18. Redis AOF ghi lại thao tác để phục hồi, volume giữ file khi recreate; độ bền còn tùy fsync/lỗi lưu trữ. Nó không thay backup và không tự quyết định Redis là source of truth Product.

**Thiếu điểm nếu:** coi có volume là đảm bảo mọi major upgrade hoặc không thể mất data. Ôn mục 7.

## Câu 8

Env cung cấp giá trị cho thành phần đã có. Phải có driver, JPA/repository/code truy cập DB hoặc cơ chế persistence đã chọn; Redis cần client/starter và code thực sự dùng. Cấu hình schema/migration và credentials phải đúng. Chứng minh bằng request nghiệp vụ tạo/đọc dữ liệu qua app và dữ liệu còn sau recreate hợp lệ, không bằng container count hay pg_isready đơn thuần. Không bắt triển khai cache business trong bài Docker.

**Thiếu điểm nếu:** chỉ thêm env rồi nói đã tích hợp. Ôn mục 8.
