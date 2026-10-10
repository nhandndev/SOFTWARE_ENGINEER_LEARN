# Bài giải / rubric · M5-4 Lesson 01

Chấm theo ý nghĩa, không bắt trùng câu chữ. 40 điểm; đạt 34. Mỗi tiêu chí độc lập 1 điểm, đúng một phần 0,5, thiếu/sai 0. Không trừ hai lần cho cùng lỗi và không có cap ngầm. Đọc [quy tắc chấm](../../Notes/M5_Scalability/M5_4_Actuator/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Phạm vi UP (1); không bắt qua Product (1); contributor/aggregation (1); metrics aggregate (1); log sự kiện cụ thể (1) |
| 2 | Access/exposure (1); không tự OPS-only (1); authentication/authorization/network (1); wildcard risk (1); port không thay security (1) |
| 3 | Auto-config nhường custom chain (1); matcher chỉ Actuator (1); fallback/JWT integration (1); first matching chain (1); 401/403 (1) |
| 4 | Health status/details (1); anonymous 401 (1); USER 403 và OPS 200 (1); env 404 không chứng minh auth (1); TLS và không tắt CSRF bừa (1) |
| 5 | Luồng gọi/serialize (1); điều kiện và ID (1); DOWN 503 (1); giới hạn phép kiểm (1); sanitized details (1) |
| 6 | Liveness/readiness action (1); restart storm (1); critical dependency selection (1); ba kết quả lab (1); feature phụ không kéo cả app mặc định (1) |
| 7 | Chi phí/tải/tác dụng phụ (1); warning không timeout (1); bounded nhẹ (1); point-in-time limit (1); management/main port khác đường (1) |
| 8 | Rỗng do thiếu contributor (1); contributor bean (1); safe metadata (1); secrets và security (1); build metadata thật (1) |

## Câu 1

UP nghĩa các check được cấu hình đang đạt lúc đó, không kiểm mọi Product flow. Actuator có handler riêng, không bắt buộc gọi ProductController. Health lấy Health từ contributors rồi tổng hợp/filter details. Metrics cho biết count/duration/error aggregate; log với requestId giúp xem một request cụ thể lỗi ở đâu. Cần kiểm business endpoint thực, không sửa health thành “UP = mọi API chắc chắn đúng”.

## Câu 2

Access cho phép operation của endpoint tồn tại/đọc; exposure đưa nó ra HTTP. Read-only không kiểm role. Không có security phù hợp thì không thể kết luận OPS-only. Cần policy authentication/authorization và giới hạn mạng theo triển khai. Wildcard có thể mở thông tin nhạy cảm/operation quản trị; đổi port/path không phải kiểm quyền. Đáp án “chỉ read-only nên an toàn” thiếu cốt lõi.

## Câu 3

Custom SecurityFilterChain làm Boot nhường cấu hình quyền cho bạn. Matcher chỉ Actuator không match Product, nên phải có chain bao phần còn lại. Có thể dùng fallback authenticated trong lab, hoặc giữ chain JWT ứng dụng và đặt Actuator chain đúng thứ tự. Spring dùng chain đầu tiên match, không áp cả hai chain lần lượt. Policy bài có metrics anonymous 401, USER thiếu OPS 403. Không tự biến toàn bộ Product API thành public để sửa lỗi chain.

## Câu 4

Health anonymous UP trả 200 chỉ status theo policy details. Info/metrics anonymous 401; USER metrics 403, OPS metrics 200. OPS env 404 do không có endpoint được đưa ra; 404 chỉ kiểm tồn tại/exposure, chưa kiểm quyền trên endpoint có thật. Basic phải dùng TLS ngoài loopback; không disable CSRF toàn cục để tiện admin calls. Cần cả positive và negative authorization tests.

## Câu 5

Request qua filters → Actuator MVC handler → health endpoint → indicator.health() → tổng hợp/lọc → JSON/HTTP. Directory tồn tại và writable thì UP; còn lại DOWN. Contributor ID `uploadDirectory`; DOWN mặc định 503. isWritable không bảo đảm còn dung lượng/lần ghi sau thành công, có TOCTOU; check filesystem mạng còn có thể treo. Chỉ trả reason hữu hạn, không đưa absolute path/exception chứa secret ra details. Không yêu cầu nhớ đúng import mới để lấy điểm tư duy.

## Câu 6

Liveness failure thường dẫn restart, readiness failure dẫn tạm loại khỏi traffic. DB shared hỏng làm mọi liveness fail thì restart hàng loạt, không chữa DB và còn tăng tải. Readiness chỉ thêm dependency thực sự cần phục vụ traffic của instance. Lab thư mục bắt buộc mất: root DOWN/503, readiness DOWN/503, liveness UP/200. Nếu upload chỉ phụ, cân nhắc degraded feature thay vì kéo cả catalog API khỏi routing. Không bắt dùng Kubernetes để trả lời.

## Câu 7

Probe gọi thật lặp lại tạo tải, tiền, rate-limit và có thể tác dụng phụ. Slow warning chỉ báo chậm, không cancel call. Chọn check nhẹ, không phát sinh giao dịch/tác vụ tính tiền và đặt timeout thực ở client/driver; không retry vô hạn. UP chỉ tại thời điểm check, không bảo đảm request tiếp theo. Port quản trị có hạ tầng khác main port nên cần kiểm đường phục vụ thực. Không yêu cầu triển khai synthetic monitoring production.

## Câu 8

Endpoint không tự sinh thông tin business/build. Thiếu contributor hợp lệ có thể trả `{}`. InfoContributor là bean được endpoint gọi để thêm chi tiết; mẫu chỉ công bố application name shopcore. Không dump token/password/config nội bộ; kể cả chỉ OPS vẫn tối thiểu hóa dữ liệu. Muốn version thật phải tạo/đọc build metadata từ artifact thực và đối chiếu bản deploy, không hard-code một version giả rồi tuyên bố đúng.
