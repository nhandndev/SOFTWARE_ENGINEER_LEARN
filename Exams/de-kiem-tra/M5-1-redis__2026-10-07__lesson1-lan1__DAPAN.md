# Bài giải M5-1 · Lesson01

40đ, đạt từ34đ. [Quy tắc](../../Notes/M5_Scalability/M5_1_Redis/QUY_TAC_CHAM.md). Chấm cơ chế, không bắt nhớ tên lệnh nếu mô tả tương đương đúng.

| Câu | Ý được điểm, tổng5 |
|---|---|
| 1 | DB nguồn gốc/cache bản sao (1); miss đọc DB dựng lại (1); mất cache không mất Product (1); Redis server network không JVM map (1); có persistence ngoài scope lab (1) |
| 2 | String snapshot JSON (1); hash field (1); serializer/client chuyển bytes (1); colon là quy ước không table (1); GET hash sai kiểu không tự convert (1) |
| 3 | 35giây và0sắp hết không vô hạn (1); -1tồn tại không expire (1); -2không key (1); GET không reset TTL thường (1); không suy not-found DB (1) |
| 4 | Value new (1); TTL bỏ/không expire (1); KEEPTTL hoặc set EX lại (1); hai lệnh không atomic (1); chết giữa hai bước để key không expire (1) |
| 5 | Hit trả cache (1); miss app query DB (1); put snapshot kèm TTL (1); DB không tự sync (1); TTL không freshness tức thì (1) |
| 6 | Nhận diện đụng key env/tenant (1); prefix app/env/version (1); tenant nếu result đổi hoặc không cache chung (1); tránh secret/private data không kiểm soát (1); Base64 không bảo mật (1) |
| 7 | Không public/no-auth (1); localhost/port riêng (1); dọn đúng key không FLUSHALL (1); lab persistence khác DB/production (1); đổi port và config đồng bộ (1) |
| 8 | String/value/type/TTL (1); hash field (1); expiry/delete đúng key (1); DB gốc không đổi (1); nhận diện7.4field TTL nhưng bài dùng key TTL (1) |

## Câu 1 - Vai trò

DB Product là nguồn gốc feature; Redis giữ snapshot bỏ được. Cache mất/expire thì app miss và query DB để nạp lại, Product không bị xóa. Redis là server qua network dùng chung được, không JVM HashMap. Redis có tùy chọn persistence/use case khác; lab không persistence không là định nghĩa toàn Redis.

## Câu 2 - Kiểu

String phù hợp nguyên JSON snapshot; hash phù hợp field access. Client/serializer chuyển bytes thành object, Redis không tự tạo JPA entity. Colon chỉ quy ước key. GET hash gây WRONGTYPE, không serialize hash thành JSON tự động. Chọn string/hash khác vẫn được điểm lựa chọn nếu giải thích đúng contract nhu cầu, không coi JSON là Redis type riêng.

## Câu 3 - Expiration

35là khoảng35giây còn lại,0có thể đang sát expire; -1không expiration, -2không key. GET thường không refresh. Miss cache không phải DB404. Không cần thuộc sai số đo TTL; phải phân biệt0với-1.

## Câu 4 - SET

Value new; SET ghi đè không expiry thường bỏ TTL, thành-1. Dùng EX để đặt lại hoặc KEEPTTL khi đúng policy. Hai lệnh SET/EXPIRE có cửa sổ crash, SET EX cùng lệnh tránh key bị bỏ expiration do chết giữa hai lệnh. Không yêu cầu tự viết transaction Lua.

## Câu 5 - Cache-aside

App kiểm key, hit trả snapshot; miss query DB, map và put kèm TTL rồi trả. Redis không gọi DB, DB không tự sửa cache. TTL60có thể trả cũ trong thời gian còn hiệu lực; mutation cần invalidation theo Lesson03.

## Câu 6 - Phạm vi

Prefix app/env/version tránh dev/prod/schema đụng nhau. Tenant/user/visibility phải có trong key nếu result phụ thuộc chúng, hoặc không cache chung. Không tự cache token/password/PII. Base64 là encoding có thể đọc lại, không mã hóa bảo mật. TTL ngắn không sửa được isolation leak.

## Câu 7 - Lab

Redis no-auth không được mở Internet. Bind127.0.0.1, port riêng, không mount data thật. DEL key test cụ thể, không FLUSHALL chung. Lab không persistence mất cache được nhưng không làm mất PostgreSQL Product; production cần policy riêng. Port bận thì đổi host port/config, không dừng dịch vụ người khác cho tiện.

## Câu 8 - Kiểm

Ghi string EX, đọc đúng value/type/TTL; HSET/HGET field và TTL key; DEL/expire rồi kiểm miss. DB Product không thay đổi vì lệnh cache. Redis7.4có hash-field expiration, module chỉ dạy TTL key; không phát biểu phủ định sai mọi phiên bản.

Ôn Lesson01 mục2–7 nếu nhầm key expiration với DB data lifecycle.
