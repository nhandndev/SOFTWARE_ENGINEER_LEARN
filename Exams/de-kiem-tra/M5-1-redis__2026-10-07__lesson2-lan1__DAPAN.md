# Bài giải M5-1 · Lesson02

40đ, đạt từ34đ. [Quy tắc](../../Notes/M5_Scalability/M5_1_Redis/QUY_TAC_CHAM.md). Chấp nhận key/DTO tương đương bảo đảm contract, không ép thuộc serializer class.

| Câu | Ý được điểm, tổng5 |
|---|---|
| 1 | Proxy lookup/miss chạy body (1); source chạy1lần sau2calls (1); put rồi hit bỏ body (1); wrapper hiện tại bên HTTP không cache ID cũ (1); app/source gọi DB không Redis (1) |
| 2 | Đủ5tham số và prefix phù hợp (2); thiếu page/sort trả sai (1); normalization/query đồng nhất (1); tenant/permission isolation (1) |
| 3 | Qua proxy có intercept (1); new bypass (1); self bypass mặc định (1); bean/caching/manager được bật (1); auth không chỉ ở body bị skip (1) |
| 4 | Snapshot không entity/LAZY/framework internals (1); đủ content+metadata (1); typed deserialize đúng class (1); kiểm giá trị/kiểu/BigDecimal round-trip (1); class DTO hợp lệ (1) |
| 5 | Hai starter mục đích (1); enable/proxy/manager (1); connection và Docker hostname (1); config Java TTL/prefix/serializer (1); custom bean không tự override bằng mọi property (1) |
| 6 | Validate trước lookup query construction (2); empty DTO có thể cache (1); null bị tắt và throw không put result (1); miss không DB404 (1) |
| 7 | Key/query normalization lệch (1); sort thiếu tie-break (1); đồng nhất semantics (1); order ổn định (1); cache không thay query/auth correctness (1) |
| 8 | Counter hit/miss (1); variants key (1); round-trip metadata/giá (1); TTL/prefix (1); bypass test và giới hạn fake (1) |

## Câu 1 - Proxy

Proxy lookup miss rồi gọi body source, put DTO; lần hai hit nên body/source không chạy, tổng1lần. Controller bọc ApiResponse/requestId cho request hiện tại; không cache wrapper chứa ID/thời gian cũ. Redis chỉ giữ bytes, app/source query DB.

## Câu 2 - Key

Cache name/prefix app-env-version và category, normalized keyword, page, size, sort. Thiếu page/sort có thể trả trang/ordering của request khác. Normalize phải đúng nghĩa query DB, không hợp nhất hai truy vấn khác kết quả. Result phụ thuộc tenant/quyền thì key/scope phải tách hoặc không cache chung; TTL ngắn không chữa leak.

## Câu 3 - Annotation

External call qua bean proxy được intercept. new hoặc this gọi nội bộ bypass proxy mặc định. Cần bean, enable caching và manager/provider thích hợp. Kiểm quyền chỉ trong body có thể bị skip khi hit; Security/authorization boundary phải hoạt động cho mọi request theo policy. Không bắt nói cụ thể JDK proxy/CGLIB ở câu này.

## Câu 4 - Snapshot

DTO materialized tránh relation LAZY/session, leakage entity, type framework PageImpl. Giữ content/page/size/totals để page contract đúng. Typed JSON deserialize thành ProductListPage/ProductRow thay vì map; kiểm name/ID/metadata/BigDecimal bằng giá trị. Class với constructor/accessors phù hợp là đúng, không bắt record/Lombok.

## Câu 5 - Wiring

Cache starter/infrastructure và Redis driver/provider; @EnableCaching cho proxy, CacheManager chọn store, connection config chọn Redis server. Docker app localhost là app container, phải dùng Redis service name khi cùng network. Manager Java mẫu chứa TTL/prefix/serializer; properties auto-config không tự thay nội dung mọi custom bean. Không cần thuộc tên property đầy đủ để đạt ý.

## Câu 6 - Kết quả

ProductListQuery validate khi dựng object trước proxy lookup. Empty page vẫn object hợp lệ nên cache được; null bị config disable, source contract không trả null. Exception không tạo result để put. Cache miss chỉ thiếu snapshot, không phải thiếu Product DB. Nếu chỉ validate trong body có thể bị skip khi hit nên không đúng vị trí mẫu.

## Câu 7 - Semantics

Key lowercase nhưng DB phân biệt hoa/thường làm hai truy vấn khác bị hợp nhất. Cùng normalize/search semantics cho cả hai. Sort price cần ID tie-break để trang ổn định; key không tự thêm ORDER BY hoặc kiểm quyền. Nhận diện và sửa cả hai lỗi được điểm tương ứng, không chỉ nói “key phải unique”.

## Câu 8 - Bằng chứng

Hai calls cùng query có counter1, variants có key/counter riêng. JSON round-trip đúng class/content/metadata/giá; keyprefix/TTL đúng; new/self gọi không có cache như proxy. Fake chỉ chứng minh cache machinery/contract giả lập, không JPA query, DB transaction hay HTTP/error contract production.

Ôn Lesson02 mục2–8 khi nhầm proxy, data shape và key semantics.
