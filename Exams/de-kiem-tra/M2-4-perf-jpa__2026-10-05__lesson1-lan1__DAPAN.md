# Đáp án M2-4 · Lesson 01

40đ; normalize /40 ×100.

| Câu | Rubric 5 điểm |
|---|---|
| 1 | Không bảo đảm (1); 1 Product+3 Category=4 theo giả định (2); getCategory().getName khi map cần tải name (2). |
| 2 | category_id chỉ khóa (2); Category.name chưa tải (2); Hibernate dùng khóa để tải entity liên quan (1). |
| 3 | Không nhất thiết 4 (2); context có thể dùng lại Category 1 đã tải (2); kiểm log/statistics (1). |
| 4 | EAGER không bảo đảm một JOIN (2); LAZY chỉ trì hoãn (2); quan sát SQL (1). |
| 5 | Transaction mở có thể tải thêm/N+1 (2); detached chưa tải có thể LazyInitializationException (1); DTO chủ động data response nhưng không tự sửa fetch plan (2). |
| 6 | Bỏ đọc getCategory().getName và chỉ map id/name (2); không cần tải Category cho response này (1); kỳ vọng 1 SELECT Product theo giả định (1); kiểm SQL log cô lập request (1). |
| 7 | Counter chung có thể gồm job (2); không phải latency (1); không phải row count (1); cô lập phép đo (1). |
| 8 | Giảm statement trong điều kiện đo (2); chưa chứng minh nhanh hơn (1); điều kiện context/cache/dữ liệu ảnh hưởng số query (2). |

Đọc lại: 1–2 mục 1–3; 3–4 mục 4; 5–6 mục 6 (câu 6 dùng thêm code mục 1); 7 mục 5; 8 mục 4–5 và Lesson 04 cho benchmark chi tiết. Câu 8 chỉ yêu cầu giới hạn kết luận, chưa đòi p95.

## Quy tắc chấm

Áp dụng [chấm nghiêm theo từng ý](../../Notes/M2_Database/QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md). Số query phải đi kèm dữ kiện của đề, không dùng một công thức cho mọi endpoint.

## Bài giải từng câu

### Câu 1 — Một repository call không đồng nghĩa một SQL tổng

**Đáp án đủ ý:** Không bảo đảm. Theo dữ kiện ba Product có ba Category khác nhau, context rỗng, không batch/L2 cache, dự đoán **4 SELECT dữ liệu**: một lấy Product, ba tải Category. Khi mapper đọc `p.getCategory().getName()`, Hibernate cần name của từng Category chưa tải và phát sinh query phụ.

**Vì sao:** Query Product ban đầu và việc truy cập quan hệ diễn ra ở những thời điểm khác nhau, dù cùng nằm trong một Service method.

**Chấm nghiêm:** Chỉ đáp “N+1” không được toàn bộ điểm số/query-trigger. Viết 3 mà bỏ SELECT Product sai tổng; nói `getCategory()` luôn tự query ngay cũng thiếu chính xác vì proxy có thể chưa initialize cho đến khi đọc name.

### Câu 2 — Biết ID chưa có nghĩa biết name

**Đáp án đủ ý:** Product có `category_id` để biết tham chiếu tới Category nào. Nó không chứa mọi cột của Category, đặc biệt `category.name`. Khi name chưa có trong context và không được fetch, Hibernate có thể dùng ID đó để SELECT Category. Proxy giữ thông tin tham chiếu, không phải dữ liệu quan hệ đầy đủ.

**Chấm nghiêm:** “Có foreign key nên đã có Category.name” sai phân biệt khóa/dữ liệu. Chỉ nói “do LAZY” mà không giải thích đang thiếu dữ liệu gì chưa đủ các tiêu chí.

### Câu 3 — N phụ thuộc quan hệ thực sự cần tải

**Đáp án đủ ý:** Không nhất thiết 4. Với cả ba Product cùng Category 1 trong cùng persistence context, Category 1 tải lần đầu có thể được dùng lại cho các Product sau; theo giả định thường là 1 SELECT Product + 1 SELECT Category =2. Kiểm SQL log/statistics trong phép đo cô lập để xác nhận, thay vì luôn lấy số Product cộng một.

**Chấm nghiêm:** “Ba Product nên luôn ba query Category” không nhận điểm dùng lại entity. Chỉ viết số 2 mà không giải thích context chưa chứng minh vì sao.

### Câu 4 — Fetch timing không phải cam kết JOIN

**Đáp án đủ ý:** EAGER yêu cầu quan hệ được tải sớm nhưng không bảo đảm provider luôn dùng một JOIN; có thể có secondary selects. LAZY trì hoãn tải, nhưng mapper đọc hết quan hệ vẫn có thể gây N+1. Phải kiểm SQL thực tế ở endpoint với dữ liệu/context/cấu hình đã nêu để kết luận cách sửa có tác dụng.

**Chấm nghiêm:** “EAGER giải quyết hết”, “LAZY không query Category dù đọc name” đều sai. Không nhận đủ điểm bằng chứng nếu chỉ viết “đổi annotation rồi thấy code chạy”.

### Câu 5 — DTO đúng ranh giới nhưng fetch plan vẫn phải đúng

**Đáp án đủ ý:** Trong Service transaction còn context mở, mapper có thể đọc LAZY và gây thêm SELECT/N+1. Nếu trả entity có LAZY chưa tải rồi serialize sau session đóng, việc Jackson truy cập quan hệ có thể gây LazyInitializationException. DTO chỉ gồm dữ liệu đã chọn giúp không để Jackson tự duyệt proxy, nhưng nếu mapper tải từng Category thì N+1 đã xảy ra trước khi DTO được tạo.

**Chấm nghiêm:** Khẳng định mọi DTO tự sửa N+1 mất điểm fetch plan. Không nói mọi entity chắc chắn lỗi; lỗi phụ thuộc quan hệ chưa tải có bị truy cập hay không.

### Câu 6 — Không cần thì không tải

**Đáp án đủ ý:** Bỏ đối số `p.getCategory().getName()` khỏi mapper và đổi DTO constructor sang id/name. Khi mapping LAZY vẫn giữ và không có tác nhân khác đọc Category, response này không cần tải Category; kỳ vọng 1 SELECT Product theo giả định đề, không có count vì repository trả List. Cô lập request, kiểm log Product SELECT và không có Category SELECT.

**Chấm nghiêm:** Chỉ xóa categoryName khỏi JSON nhưng vẫn gọi getter Category trong mapper không đáp ứng. Không bắt viết đầy đủ DTO class; phải nói rõ thay đổi chỗ đọc quan hệ.

### Câu 7 — Statistics có phạm vi đo

**Đáp án đủ ý:** Không thể quy toàn bộ 20 prepared statements cho request nếu job nền dùng cùng SessionFactory/statistics trong khoảng đó. `clear()` reset bộ đếm nhưng không cô lập workload chạy sau reset. Count này không phải thời gian và không phải số row trả về. Cần cô lập request/job hoặc dùng phép đo có khả năng quy query cho từng request, đồng thời đo latency riêng.

**Chấm nghiêm:** “clear rồi nên chắc chắn đúng request” sai. Viết “20ms” hoặc “20 row” sai đơn vị. Không yêu cầu biết tên tool tracing cụ thể.

### Câu 8 — Ít SQL hơn là bằng chứng có giới hạn

**Đáp án đủ ý:** Đã chứng minh số statement quan sát trong điều kiện đo giảm 4→1. Chưa chứng minh endpoint nhanh hơn hoặc dùng ít tài nguyên hơn; còn phải đo thời gian và kiểm dữ liệu response không bị mất. Dữ liệu quyết định số Category khác nhau; context/cache và transaction ảnh hưởng việc dùng lại/tải LAZY nên phải ghi rõ để tái hiện kết quả.

**Chấm nghiêm:** “Một query chắc chắn nhanh nhất” sai giới hạn kết luận. Chưa yêu cầu thuộc p95 hoặc chạy benchmark; chỉ cần biết số query không thay thế bằng chứng latency.
