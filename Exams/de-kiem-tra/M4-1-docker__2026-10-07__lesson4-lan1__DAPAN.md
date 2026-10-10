# Đáp án M4-1 · Lesson 04

8 câu × 5đ = 40đ; đạt 34/40. Câu đúng một phần vẫn có điểm tương ứng. Không thưởng cho thuật ngữ nếu giải thích ngược hành vi.

| Câu | Rubric /5 |
|---|---|
| 1 | List chỉ thứ tự started (1); condition chờ probe (1); running/healthy/ready phân biệt (2); CRUD cần kiểm thật (1) |
| 2 | Accepting connections theo probe (1); không kiểm app auth/quyền/schema (2); TCP tránh nhầm init Unix-only (1); endpoint/tool chưa có (1) |
| 3 | Không continuous dependency guard (1); unhealthy không tự restart (1); app xử lý timeout/failure/recovery (2); logs/health kiểm nguyên nhân (1) |
| 4 | Mount có grant cho service (1); _FILE là image entrypoint convention (1); target + configtree binding (1); không _FILE universal (1); local file/quyền/no encryption (1) |
| 5 | $$ escape Compose (2); CMD-SHELL expand trong container (2); CMD không tự chạy shell (1) |
| 6 | Init chỉ empty data dir (2); app secret khác password DB thật (1); rotate role + cập nhật/recreate an toàn (1); env override và không xóa volume (1) |
| 7 | Localhost sai/kiểm DNS-port-listener (1); auth kiểm credential/config (1); 401 đã tới HTTP security (1); root404 chưa có mapping không chứng minh CRUD (1); sửa theo nguyên nhân (1) |
| 8 | Build/runtime/non-root evidence (1); config/health/network (1); business DB roundtrip (1); recreate persistence (1); secrets + phạm vi claim + không đụng data thật (1) |

## Câu 1

List depends_on đảm bảo thứ tự khởi chạy dependency, không đợi DB nhận kết nối. Long syntax service_healthy đợi healthcheck dependency báo healthy trước khi start dependent. Running là process còn sống; healthy là probe đạt; app ready phải đáp ứng điều kiện phục vụ đã chọn. CRUD còn cần credentials, schema, code và request thật.

**Điểm dễ mất:** đồng nhất ba trạng thái. Ôn lesson 4 mục 1–2.

## Câu 2

pg_isready kiểm trạng thái PostgreSQL nhận kết nối, không chứng minh password/quyền/schema của user app đúng. Dùng TCP 127.0.0.1 tránh probe Unix socket thấy server init tạm trước khi server chính sẵn sàng. App chưa có Actuator/health route và runtime chưa đảm bảo curl; không viết probe chắc chắn lỗi rồi gọi đó là app readiness.

**Điểm dễ mất:** nói -U/-d là test auth đầy đủ. Ôn mục 1, 3, 5.

## Câu 3

depends_on là điều kiện startup, không theo dõi và pause/restart app liên tục khi DB chết. Health status unhealthy tự nó không kích restart; restart policy thông thường gắn với process exit, không với probe fail. App phải giới hạn timeout, trả lỗi phù hợp, quản lý reconnect/retry có giới hạn tùy thao tác; không retry ghi mù gây duplicate. Kiểm logs/health DB và network trước khi can thiệp.

**Điểm dễ mất:** cho Compose là bộ tự chữa mọi lỗi runtime. Ôn mục 1, 8.

## Câu 4

Compose mount file host vào service được grant. DB image entrypoint đọc POSTGRES_PASSWORD_FILE từ file lúc init. App mount cùng nội dung với tên `spring.datasource.password`, Spring import configtree đọc tên file thành property. Spring không tự hiểu mọi *_FILE; đó không phải chuẩn phổ quát. Secret local vẫn là file host, không tự mã hóa; cần exclude Git/build context, bảo vệ quyền, kiểm app non-root đọc được và không log/share nội dung.

**Điểm dễ mất:** chỉ đổi tên biến thành _FILE mà không có reader. Ôn mục 3–4.

## Câu 5

Compose xử lý interpolation trước khi tạo container. `$$` giữ dấu `$` cho bước sau, tránh lấy POSTGRES_USER từ shell/.env host. CMD-SHELL chạy shell trong container, shell mới expand biến của DB container. Exec-form CMD truyền argument trực tiếp, không tự expand `$VAR`; muốn shell phải chọn rõ, không nhầm hai cơ chế.

**Điểm dễ mất:** nói $$ là cú pháp của PostgreSQL hay đổi thành $ tùy ý. Ôn mục 5.

## Câu 6

POSTGRES_PASSWORD(_FILE) áp dụng khi init data dir trống; không tự ALTER ROLE trong DB có data. App đọc password mới nhưng DB vẫn giữ password cũ nên auth fail dù pg_isready healthy. Kiểm config hiệu lực, kể cả environment password cũ ưu tiên hơn configtree. Rotate bằng quy trình đổi role password có quyền phù hợp, đồng bộ secret và recreate/restart thành phần cần đọc lại theo kế hoạch giảm gián đoạn. Không xóa volume production để ép init.

**Điểm dễ mất:** chữa bằng down xóa volume. Ôn mục 4, 6.

## Câu 7

(a) Localhost trong app là app: kiểm JDBC host db, port 5432, DNS/network và listener. (b) Có phản hồi auth: kiểm username/password thực trong DB và nguồn config ưu tiên; network không phải nghi phạm đầu tiên. (c) 401 chứng tỏ đã có HTTP response từ lớp security hoặc upstream, kiểm auth và xác định responder, không mặc định lỗi TCP. (d) Root 404 có thể chỉ không có route `/`; thử endpoint đã implement, không kết luận CRUD thành công. Không mở public DB hay rebuild vô hạn để chữa sai loại lỗi.

**Điểm dễ mất:** gom HTTP/auth/network thành một loại. Ôn mục 7–8.

## Câu 8

Kiểm config không in secret; build executable JAR đúng Java, runtime non-root và permissions. Start stack, kiểm healthy, DNS/cổng nội bộ và dependency connectivity; gọi endpoint tạo/đọc qua app rồi xác nhận DB. Recreate với volume cũ và kiểm data còn, dùng dữ liệu local riêng. Rà Git/context/image không có secret và quyền file mount. Config parse + DB probe chỉ chứng minh từng phần, chưa chứng minh image app/Redis/business integration. Không cần prune hay xóa data thật.

**Điểm dễ mất:** báo hoàn thành vượt evidence. Ôn mục 9; không phải yêu cầu phải deploy production trong đề này.
