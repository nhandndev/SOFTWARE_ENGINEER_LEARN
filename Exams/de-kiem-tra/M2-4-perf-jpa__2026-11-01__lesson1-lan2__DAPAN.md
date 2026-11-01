# Bài giải và rubric — M2-4 Lesson 01, bản 2026-11-01

Đề: [Lesson 01 lần 2](M2-4-perf-jpa__2026-11-01__lesson1-lan2.md). Tổng **40đ**, điểm = điểm thô /40 ×100; đạt từ **34/40**. Đạt lesson không tự xác nhận toàn module hoặc benchmark/deliverable.

## Nguyên tắc chấm

- Áp dụng [quy tắc chấm nghiêm](../../Notes/M2_Database/QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md).
- Chấm ý đã viết hoặc suy ra trực tiếp, không đòi từ khóa/đúng văn mẫu. Không trừ lỗi gõ, imports, SQL aliases.
- Mỗi tiêu chí được chấm độc lập; đúng một phần nhận một phần, không cộng vượt trần hoặc phạt một lỗi nhiều lần.
- Không yêu cầu fetch join, EntityGraph, batch, OSIV internals, JUnit, HikariCP hoặc benchmark p95 để đạt đủ điểm.
- Không tự thêm các yêu cầu ở phần giải thích thành rubric. Chấp nhận cách quan sát tương đương SQL log/statistics nếu giải thích đúng phạm vi đo.
- Mỗi lần chấm lưu snapshot, bảng điểm, phần đúng/thiếu và hướng sửa; không sửa bài nộp.

## Bảng tiêu chí

| Câu | Điểm theo đúng các vế công khai |
|---|---|
| 1 | Product đã tải/Category.name chưa tải (1); getCategory().getName() (1) + cần name chưa có (1); 1 Product + 3 Category = 4 (1) + phân biệt repository call và SQL khi map (1) |
| 2 | category_id là khóa (1) + chưa có Category.name (1); có tham chiếu/proxy không có nghĩa đã tải đủ (1) + giải thích trì hoãn tải (1); tìm Category id=2 (1) |
| 3 | 1 Product + 2 Category (1) + tổng 3 (1); Category 1 đã tải được dùng lại trong cùng context (2); SQL log/statistics của request cô lập (1) |
| 4 | EAGER yêu cầu tải quan hệ (1) + không cam kết một JOIN (1); LAZY trì hoãn (1) + đọc name vẫn kích hoạt tải (1); kiểm SQL thực tế (1) |
| 5 | A có thể thêm SELECT (1) + transaction không loại N+1 (1); B lỗi khi serialize/đọc name ngoài Service (1) + quan hệ chưa tải/session đóng (1); mapper DTO vẫn có thể gây N+1 (1) |
| 6 | map id/name (1) + không đọc Category (1); 1 Product/0 Category (1) + giải thích không cần dữ liệu quan hệ (1); kiểm log request riêng không SELECT Category (1) |
| 7 | không quy 20 cho request (1) + statistics dùng chung SessionFactory/job gây nhiễu (1); prepared statement count, không phải ms/row (1); cô lập hoặc quy kết theo request (1) + clear thống kê không xóa context/cache (1) |
| 8 | Bản An giảm SELECT giữ response (1) + chưa có số đo thời gian nên chưa chứng minh nhanh hơn (1); bản Bình sai hợp đồng, khác endpoint mới câu 6 (1); hai điều kiện so sánh có lý do đúng (mỗi điều kiện 1) |

## Câu 1 — Trace request, 5đ

**Đáp án đủ ý:** productRepository.findAll() lấy ba Product gồm id/name và tham chiếu Category theo FK; chưa lấy đủ Category.name. p.getId() và p.getName() đọc field Product đã có. p.getCategory().getName(), cụ thể lúc cần getName() của Category chưa tải, làm Hibernate lấy dữ liệu quan hệ. Theo thứ tự minh họa:

1. SELECT products: ba Product.
2. SELECT categories WHERE id=1 khi cần Books.
3. SELECT categories WHERE id=2 khi cần Electronics.
4. SELECT categories WHERE id=3 khi cần Food.

Tổng **4 SELECT dữ liệu**, dù chỉ gọi repository một lần. SQL phụ phát sinh trong mapper, không cần thêm lời gọi repository viết tay.

**Thiếu thường gặp:** ghi “N+1” nhưng không nói tổng/trigger; đếm 3 mà quên Product; nói getCategory() luôn query ngay. Điểm trigger được nhận đủ nếu chỉ đúng biểu thức p.getCategory().getName() và dữ liệu name đang thiếu, không bắt diễn đạt chi tiết proxy.

**Ôn:** bài học mục 1–3.

## Câu 2 — Khóa khác dữ liệu, 5đ

**Đáp án đủ ý:** category_id=1 cho biết tham chiếu tới dòng Category nào, không chứa name=Books. Query Product không JOIN Category trong giả định đề, nên chưa mang Category.name về. Một object tham chiếu/proxy có thể đại diện cho Category chưa tải đủ dữ liệu; khi cần field chưa có và session còn hỗ trợ, Hibernate tải theo ID. Nếu FK đổi sang 2 thì tìm Category có id=2, không phải Product có id=2.

**Thiếu thường gặp:** “LAZY nên query” mà không phân biệt khóa và nội dung; khẳng định có object là đã có tất cả dữ liệu. Không yêu cầu mô tả bytecode/proxy subclass.

**Ôn:** mục 1–3, phần giải nghĩa proxy.

## Câu 3 — Dùng lại entity trong context, 5đ

**Đáp án đủ ý:** **1 SELECT Product + 2 SELECT Category = 3**. Lần đầu cần Category 1 thì tải nó; Product còn lại cùng Category 1 dùng lại entity đã tải trong context đó. Category 2 vẫn cần một lượt tải. Kiểm log SQL có tham số hoặc statistics trong request cô lập.

Không gán việc dùng lại này cho cache cấp hai: đề tắt L2 cache nhưng cùng persistence context vẫn dùng lại Category đã tải. Không bắt dùng tên “cache cấp một” nếu mô tả đúng.

**Thiếu thường gặp:** lấy số Product cộng một bất kể trùng FK; tưởng ba Category query luôn có vì code mapper chạy ba lần. Câu hỏi này yêu cầu dự đoán trong đúng giả định, không phải tuyên bố công thức đúng mọi JPA query.

**Ôn:** mục 4–5.

## Câu 4 — LAZY/EAGER không phải phép đo, 5đ

**Đáp án đủ ý:** An sai ở cam kết một JOIN: EAGER yêu cầu tải quan hệ nhưng provider vẫn có thể dùng secondary SELECT. Bình sai vì LAZY chỉ trì hoãn; mapper đọc Category.name chưa có thì vẫn phải tải. Cần quan sát SQL ở request cụ thể, giữ rõ dữ liệu/context/cache/cấu hình; annotation tự nó không phải bằng chứng đã hết query phụ.

Không bắt đoán chính xác SQL Hibernate chọn cho phiên bản EAGER vì đề không cho fetch plan chi tiết. Không bắt nêu cách sửa Lesson 02.

**Ôn:** mục 4–5.

## Câu 5 — N+1 khác LazyInitializationException, 5đ

**Đáp án đủ ý:**

- A: transaction/context còn mở khi mapper đọc name nên có thể chạy SELECT phụ; trong dữ kiện chung là 4 SELECT. Transaction giúp truy cập dữ liệu quan hệ, không tự gom query.
- B: Service đã trả entity và context đóng; Jackson thực sự đọc Category.name chưa tải sau đó. Việc đọc có thể lỗi vì entity không còn session hỗ trợ khởi tạo quan hệ, thường là LazyInitializationException hoặc lỗi serialize bọc nó. Không cần nhớ tên exception để nhận đủ điểm.
- DTO không tự sửa fetch plan: ở A, query phụ đã xảy ra khi tạo DTO. Jackson chỉ đọc chuỗi categoryName đã có trong DTO không có nghĩa trước đó không có N+1.

**Thiếu thường gặp:** khẳng định “session đóng thì query thêm được bình thường” trái giả định; nói mọi entity đều lỗi kể cả khi quan hệ đã được tải; nói DTO/transaction tự giải quyết hiệu năng.

Không hỏi HTTP status hoặc cơ chế exception handler. Không yêu cầu giải thích FilterChain.

**Ôn:** mục 1 và 6.

## Câu 6 — Dữ liệu cần cho dropdown, 5đ

**Đáp án mẫu:**

```java
return productRepository.findAll().stream()
        .map(p -> new ProductOptionResponse(p.getId(), p.getName()))
        .toList();
```

Chấp nhận mô tả tương đương: chỉ map id/name, bỏ đọc getCategory().getName(). Với LAZY và không tác nhân nào khác đọc quan hệ, **1 SELECT Product, 0 SELECT Category**. Việc Entity có field category không bắt endpoint lấy name từ nó.

Đo một request riêng, thấy SELECT Product và không có SELECT Category; kiểm response đủ id/name. Không đòi tối ưu SELECT thành projection chỉ lấy hai cột vì chưa hỏi.

**Thiếu thường gặp:** bỏ field khỏi JSON nhưng vẫn gọi getter Category trong mapper; đổi annotation cả hệ thống dù endpoint không cần quan hệ. Đây là hợp đồng endpoint mới, không cho phép bỏ field của API cũ.

**Ôn:** mục 6 và code mục 1.

## Câu 7 — Reset không phải cô lập, 5đ

**Đáp án đủ ý:** Không thể quy 20 cho riêng request: statistics thu thập từ các session thuộc cùng SessionFactory nên job nền có thể góp statement. Đây là số prepared statements được thu thập, không phải 20 ms hoặc 20 row; cũng không bảo đảm mọi statement là SELECT.

Đo lại bằng cách tạm dừng job/request khác trong môi trường kiểm, dùng context mới tương đương, reset statistics rồi gọi đúng một request; hoặc dùng theo dõi có thể quy statement cho request. clear() reset statistics, **không tự clear persistence context hay cache**.

**Thiếu thường gặp:** “clear rồi nên không còn nhiễu”; coi statement count là latency. Nếu chọn tracing theo request không cần nêu tên thư viện.

**Ôn:** mục 5, đặc biệt đoạn phạm vi SessionFactory và clear.

## Câu 8 — Giữ hợp đồng và giới hạn kết luận, 5đ

**Đáp án đủ ý:** Bản An đã giảm số SELECT từ 4 xuống 1 trong điều kiện đề cho, vẫn giữ dữ liệu response. Chưa đo thời gian nên chưa chứng minh endpoint nhanh hơn: một query có thể nặng hơn các query cũ. Cần đo thời gian xử lý request trước/sau trong điều kiện so sánh phù hợp; không đòi biết tool hoặc benchmark thật. Bản Bình không đạt vì bỏ categoryName mà API hiện tại bắt buộc có; khác câu 6 nơi endpoint dropdown được thiết kế hợp đồng riêng.

Câu 8 viết lại cùng ngày để gọi rõ tên hai bản sửa, định nghĩa field bắt buộc và tách ý 3 là kế hoạch cho lần đo sau này. Giữ nguyên 5đ và kiến thức cũ; không phải yêu cầu tìm lỗi trong bảng đã đồng nhất điều kiện. Chấp nhận cả cách gọi X/Y nếu người học đang viết dở theo bản trước.

Hai điều kiện có thể chọn bất kỳ cặp khác nhau, kèm lý do:

- Cùng dữ liệu/số Category ID khác nhau: nhiều hoặc ít ID cần tải làm đổi số SELECT.
- Cùng trạng thái context/cache: entity đã có có thể không cần tải lại.
- Cùng fetch/batch config: cách gom/tải quan hệ ảnh hưởng số statement.
- Cùng ranh giới transaction/session và vị trí mapper: ảnh hưởng truy cập LAZY được hay lỗi ở chỗ nào.
- Cùng workload cô lập: query nền làm nhiễu số đếm.
- Cùng hợp đồng response: bỏ dữ liệu cần trả không phải tối ưu tương đương.

Mỗi điều kiện có lý do đúng nhận 1đ; không đếm context và cache thành hai ý trùng lặp nếu cùng một lời giải thích “đã có dữ liệu thì khỏi tải”. Nếu tách rõ các cơ chế khác nhau thì vẫn cân theo ý nghĩa. Không yêu cầu phải nêu đúng cặp của văn mẫu hoặc đo benchmark thật.

**Ôn:** mục 2, 4–6; chưa bắt học nội dung benchmark Lesson 04.

## Đối chiếu bài học và kiểm chất lượng

| Câu | Nguồn Lesson 01 | Không yêu cầu vượt bài |
|---|---|---|
| 1 | Mục 1–3 | Không bắt SQL sinh ra đúng từng alias |
| 2 | Giải nghĩa proxy, mục 1–3 | Không hỏi nội bộ Hibernate |
| 3 | Mục 4–5 | Không hỏi cache nâng cao |
| 4 | Mục 4–5 | Không yêu cầu giải pháp fetch join |
| 5 | Mục 1, 6 | Đã cấp OSIV/session/Jackson assumptions |
| 6 | Mục 6 | Cho DTO sẵn; chỉ viết mapper nhỏ |
| 7 | Mục 5 | Cho Statistics snippet, không thuộc API |
| 8 | Mục 2, 4–6 | Không p95/pool tuning |

Rà ngày 2026-11-01: mỗi câu đúng 5đ, tổng 40; mọi ý chấm đã được hỏi công khai. Đã kiểm tĩnh code/ngữ cảnh và suy luận bảng dữ liệu, **không chạy Hibernate/DB hoặc coi số query dự đoán là benchmark thực tế**. Bản đề trước được giữ nguyên; tiến độ/điểm không đổi khi chỉ viết lại đề.

Nguồn đối chiếu kỹ thuật: [Hibernate fetching](https://docs.hibernate.org/orm/7.1/userguide/html_single/#fetching), [Statistics API](https://docs.hibernate.org/orm/7.1/javadocs/org/hibernate/stat/Statistics.html). Các nguồn dùng để kiểm cơ chế, không biến API chi tiết thành yêu cầu học thuộc.
