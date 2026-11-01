# Flyway Lab: môi trường đã chuẩn bị

Setup ngày 2026-10-30 trong shopcore hiện có. Không có migration/seed viết sẵn; bạn tự làm SQL theo [bài lab](../Notes/M2_Database/M2_3_Flyway/LAB_LESSON_01_02_FLYWAY.md).

Đã chạy kiểm tra context bằng JDK 21 và profile flyway-lab: 1 test, 0 lỗi. Đã query trực tiếp đúng DB/user: hiện chỉ có flyway_schema_history, 0 migration đã áp dụng; chưa có Category/Product. Đây là kiểm môi trường, không phải đã làm chặng V1 hoặc kiểm mapping Entity. App test đã kết thúc; chỉ container PostgreSQL lab được để chạy cho bạn.

## Chạy tiếp

Mở Terminal tại thư mục shopcore. Khởi động DB nếu đang dừng:

```bash
docker compose -f compose.flyway-lab.yml up -d --wait
```

Không chạy thêm lệnh docker run trong tài liệu lab: container và volume của hai cách là cùng tên. Không xóa/recreate volume để xử lý lỗi.

Chọn JDK 21 cho Terminal macOS:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
```

Tạo file **src/main/resources/db/flyway-lab/migration/V1__create_catalog.sql**, tự viết CREATE TABLE theo chặng 1 của bài lab, rồi chạy app:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=flyway-lab
```

Nếu wrapper chưa có quyền chạy, dùng `sh mvnw` thay `./mvnw`. Không tạo V2/R ngay; làm lần lượt các chặng để quan sát history. Nếu chỉ muốn xem môi trường trước khi viết SQL, app vẫn có thể chạy với thư mục migration trống; điều đó chưa chứng minh lab đã đạt.

## Kết nối database

| Mục | Giá trị |
|---|---|
| Host | localhost |
| Port | 15432 |
| Database | shopcore_flyway_lab |
| User | flyway_lab |
| Password local mẫu | lab_only_change_me |
| Container | shopcore-flyway-lab-pg |
| Port app khi tự chạy | 18080 |

Password là mẫu cho DB local riêng, không dùng production. Profile có default local khớp Compose nên không cần export password. Nếu override FLYWAY_LAB_DB_PASSWORD, phải khớp password thực tế của DB; đổi env không tự đổi password trong volume đã khởi tạo.

Mở psql:

```bash
docker exec -it shopcore-flyway-lab-pg psql -U flyway_lab -d shopcore_flyway_lab
```

Trong psql:

```sql
SELECT current_database(), current_user;
SELECT installed_rank, version, description, script, success
FROM flyway_schema_history ORDER BY installed_rank;
```

Nếu chưa từng migrate, history có thể chưa tồn tại. Sau kiểm tra startup với migration trống, history có thể tồn tại nhưng không có migration đã áp dụng. Không dùng tình trạng đó làm bằng chứng đã làm V1.

## Dừng

Ctrl+C dừng app. Tạm dừng riêng DB lab, giữ container/volume:

```bash
docker compose -f compose.flyway-lab.yml stop
```

Không dùng down -v hoặc Flyway clean. Các container cũ chỉ được stop, không xóa; không tự start lại chúng nếu chưa cần.

Product/Category hiện là class thường, chưa @Entity. ddl-auto=validate ở đây chưa chứng minh mapping bảng nghiệp vụ đã được kiểm; mục tiêu trước mắt là Flyway và SQL/history. Luôn chạy profile flyway-lab cho lab này; config mặc định chưa có DB cho starter JPA vừa thêm.
