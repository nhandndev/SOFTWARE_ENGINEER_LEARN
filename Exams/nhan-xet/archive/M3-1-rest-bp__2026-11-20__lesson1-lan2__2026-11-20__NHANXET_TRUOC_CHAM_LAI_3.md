# Chấm lại M3-1 Lesson 01 — Câu 1–10 và 13

Ngày **2026-11-20**. Đọc [bài làm hiện tại](../de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson1-lan2.md), chấm theo ý nghĩa và các vế điểm công khai. Không trừ lỗi gõ hoặc lời hỏi/phàn nàn về cách diễn đạt đề.

## 0. Snapshot và phạm vi

- [Bản bài nộp lượt 2](archive/M3-1-rest-bp__2026-11-20__lesson1-lan2__2026-11-20__BAI_NOP_CHAM_TAM_2.md), giữ nguyên cả bảng bị lặp và câu viết dở.
- [Nhận xét lượt trước](archive/M3-1-rest-bp__2026-11-20__lesson1-lan2__2026-11-20__NHANXET_TRUOC_CHAM_LAI_2.md): 33,5/50 =67% trên câu 1–10. So sánh bản nộp cho thấy chỉ câu 13 được thêm; câu 1–10 giữ điểm.
- Câu 1–10 và 13 có bài làm. Câu 4 và 10 mới trả lời một phần: các vế còn thiếu của chính câu đó chưa có điểm, nhưng vẫn chấm câu theo trần 5đ.
- Câu 11, 12, 14, 15, 16 trống: **chưa chấm, không tính 0** trong điểm tạm.
- Đã đọc bảng câu 7 cả trước và sau dòng Trả lời; không tính hai lần.
- File __DAPAN.md của đề mới hiện không có trong workspace. Lượt này dùng thang điểm từng vế ngay trong đề, bài học hiện hành và quy tắc chấm; không giả vờ đã đọc file không tồn tại, không tự khôi phục tài liệu bị thiếu.
- Quy tắc tổng điểm cũ 40đ trong QUY_TAC_CHAM không ghi đè đề mới 80đ; lượt chấm phần đã làm này dùng đúng phạm vi 11 câu ×5=55đ.

## 1. Điểm tổng và nhóm kiến thức

**38,5/55 = 70/100 trên câu 1–10 và 13 đã có bài làm.** Chưa phải điểm đủ 16 câu hoặc kết luận trượt toàn lesson.

| Nhóm được đánh giá | Điểm | Nhận xét |
|---|---:|---|
| Contract/versioning/tương thích (1,2,5,6) | 16/20 =80% | Cần cụ thể hóa route và lý do client hỏng |
| HTTP status và resource/list (3,4) | 5/10 =50% | Nhầm 204 có body và list rỗng là404 |
| Method/PUT/DELETE (7,8,9,10) | 12,5/20 =62,5% | Biết một số nguyên tắc, còn lẫn semantics với cơ chế nhận diện retry |
| Unique SKU và nhận diện ý định gọi (13) | 5/5 =100% | Phân biệt đúng dữ liệu unique và replay/nhận diện retry |
| PATCH/timeout/key/code tích hợp (11,12,14–16) | Chưa chấm | Chưa có bài làm |

Điểm chưa cao không có nghĩa bạn chưa biết code CRUD. Phần đang kiểm là contract cụ thể và tác động retry, không phải chỉ gọi đúng tên HTTP method.

## 2. Bảng từng câu

| Câu | Điểm | Làm được | Sai hoặc thiếu |
|---|---:|---|---|
| 1 | 4,5/5 | Nhận field client thấy, breaking change và response DTO | Ví dụ nhầm chiều client gửi request với client đọc response |
| 2 | 4/5 | Hiểu version và GET/DELETE khác nhau | Hai URL chưa theo convention products và /products/10 |
| 3 | 3/5 | Đúng201, phân biệt HTTP status/body | Location/body chưa cụ thể, thiếu id=11; 204 không được kèm JSON |
| 4 | 2/5 | Detail và PUT id vắng404 | List rỗng phải200; vế2/3 chưa làm |
| 5 | 3/5 | Cả năm kết luận tương thích/breaking đúng | Nhiều lý do chỉ lặp “phá contract”, chưa chỉ client phụ thuộc gì |
| 6 | 4,5/5 | Giữv1/v2, tái dùng Service/DB, index không bắtv2 | Chưa nêu hai hành động cụ thể trước khi dừngv1 |
| 7 | 4/5 | GET/POST/PATCH phần chính đúng | PUT replacement có semantics idempotent; DELETE không safe |
| 8 | 4,5/5 | Hiểu writable fields, server-managed và cần validation | Chưa chốt request thiếuprice phải400 theo policy |
| 9 | 2/5 | Nhận code sai contract, annotation không tự bảo đảm | Không tính8/11; key không sửa được cộng sai thành gán3 |
| 10 | 2/5 | State sau xóa và status khác không tự mất idempotency | Audit/refund và policy204 khi đã vắng chưa làm |
| 13 | 5/5 | Đúng unique SKU,409 và khác biệt với nhận diện retry/replay | Không còn thiếu ý tính điểm trong câu này |
| 11,12,14–16 | Chưa chấm | — | Chưa trả lời |

## 3. Phân tích và chữa từng câu

### Câu 1 — 4,5/5

- Vế ba thành phần client thấy: **3/3**. Bạn nêu id/name/price/categoryId. Cách hỏi “ba thành phần contract client quan sát” chưa quy định phải là ba nhóm method/status/schema, nên chấp nhận ít nhất ba field response có thật trong ví dụ; không trừ vì bạn hiểu theo nghĩa field. Tuy nhiên điều này **chưa chứng minh** bạn đã liệt kê đầy đủ các nhóm contract.
- Vì sao client hỏng: **0,5/1**. Nhận đúng ý thay field làm lệch contract. Nhưng đề mô tả client **đọc response product.price**, còn bạn giải thích client **gửi payload price**. Hai hướng request/response không giống nhau.
- Response DTO không chỉ nội bộ, phải khớp contract client: **1/1**.

**Bản đúng của tình huống:** backend chỉ trả amount, client cũ vẫn đọc product.price nên không còn lấy được giá như đã công bố. Server không nhất thiết crash hoặc compile lỗi; client có thể hiển thị sai/thiếu dữ liệu.

Để hiểu rộng hơn, contract còn gồm method/URL, request schema, response schema, status/header và ý nghĩa nghiệp vụ. Không cần trả đủ mọi thứ cho một câu chỉ yêu cầu ba thành phần; không cần nhắc ServiceImpl.

Đọc Lesson 01 mục3.

### Câu 2 — 4/5

- Route list: **0,5/1**, bạn có GET và prefix api/v1 nhưng còn AllProducts.
- Route detail: **0,5/1**, bạn có prefix/version và ý định detail, nhưng còn getProduct?id=10.
- Version API: **1/1**.
- Không tự đổi theo Flyway/Java: **1/1**, nhận theo ngữ cảnh bạn nói version contract và không tự đổi khi Flyway đổi. Câu hỏi Java đang kiểm việc phân biệt version, không yêu cầu nâng Java.
- GET đọc và DELETE xóa: **1/1**, bạn giải thích rõ tác động khác nhau.

Sửa URL theo convention bài:

```http
GET /api/v1/products
GET /api/v1/products/10
```

Không trừ vì thiếu dấu / đầu chuỗi hay hoa/thường ngoài việc URL bạn còn đặt theo tên hành động. Điểm thiếu do chưa làm đúng convention resource mà đề hỏi.

Chỉnh ý Flyway: DB lênV2 **không tự buộc phải thêm APIv2**. Chỉ khi public contract cần phiên bản mới mới cân nhắcv2 và kế hoạch client. Không phải mỗi migration đều giữv1 rồi tạo thêmv2.

Đọc mục4,6–7.

### Câu 3 — 3/5

- HTTP201: **1/1**.
- Location: **0,5/1**. Bạn nói đúng ý “tới resource vừa tạo cùng version”, nhưng chưa xác định target id11; phần “+DTO” không thuộc giá trị Location.
- Body: **0,5/1**. Có name/price/categoryId, nhưng thiếu id11 theo response công bố; bạn đang kể giống request có sku/httpcode. Không phạt thêm vì thừa field, chỉ chấm phần response đã thể hiện.
- DELETE204 có JSON: **0/1**, bạn trả lời có nhưng policy và semantics204 là không có content.
- HTTP200 body status201 không tương đương HTTP201: **1/1**. Bạn đã phân biệt status ở tầng HTTP và số trong body. Từ “@01” coi lỗi gõ của201, không trừ.

**Mẫu đúng:**

```http
HTTP/1.1 201 Created
Location: /api/v1/products/11
Content-Type: application/json

{"id":11,"name":"Keyboard","price":120.00,"categoryId":2}
```

DELETE thành công theo bài là204 không body. HTTP200 có thể có body, nên câu “200 ok nhưng không có gì” không phải định nghĩa đúng của200.

Đọc mục5,14; tra [RFC9110 về204](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.3.5) khi cần.

### Câu 4 — 2/5

- List không kết quả: **0/1**, không phải404 trong dữ kiện query/input hợp lệ.
- Detail id999 không có: **1/1**.
- PUT id999 không có: **1/1** theo policy.
- Body list rỗng/giải thích: **0/1**, chưa trả lời.
- PUT-create là policy hay giới hạn HTTP: **0/1**, chưa trả lời.

**Bản đúng:** list trả200 với [] hoặc content=[] theo schema list; collection endpoint tồn tại, chỉ là không có phần tử phù hợp. Detail chỉ tới một resource vắng nên404. Bài chọn PUT update-only, nhưng HTTP không cấm mọi thiết kế PUT-create.

Đọc mục5.2. Không kết luận bạn sai các vế chưa viết; chỉ chưa có điểm cho chúng trong câu đã bắt đầu làm.

### Câu 5 — 3/5

Mỗi dòng: kết luận đúng0,5; giải thích đúng phụ thuộc/giả định cụ thể0,5.

| Thay đổi | Điểm | Vì sao |
|---|---:|---|
| price bị xóa, amount thay | 1/1 | Bạn chỉ đúng đổi contract tênfield cần đồng bộ client/backend trong tình huống này |
| number thành object | 0,5/1 | Đúng breaking; “phá contract” chưa nêu client đang xử lý number nhưng nay nhận object |
| Request bắt buộc description | 0,5/1 | Đúng breaking; đoạn “vì là” chưa có lý do |
| Optional response, client bỏ qua field lạ | 0,5/1 | Đúng tương thích; “vẫn chạy” chưa nêu chính giả định client bỏ qua field mới |
| Client strict từ chối field mới | 0,5/1 | Đúng breaking; chưa chỉ strict reject unknown field |

Bạn **không sai năm kết luận**. Điểm thiếu là lý do có tính kiểm chứng, không phải cần viết dài.

Chữa bằng một câu mỗi dòng:
- Đọc number mà nhận object thì code cũ xử lý sai kiểu.
- Client cũ không gửi description nên bị từ chối bởi yêu cầu mới.
- Client tolerant bỏ qua field optional nên hành vi cũ không đổi.
- Client strict từ chối field không biết nên có thể lỗi ngay khi đọc response.

Đọc mục7.

### Câu 6 — 4,5/5

- Route/representation cũ: **1/1**.
- Mới: **1/1**. Nhận api/v1/... và api/v2/... trong ngữ cảnh Product; đoạn mapper sau nêu price→amount nên không bắt lặp lại đầy đủ mỗi URL.
- ChungDB/Service, mapping representation: **1/1**.
- Hai việc trước dừngv1: **0,5/1**. “Đồng bộ contract client/server” được nhận là công việc chuyển client. “Chắc chắn không vi phạm contract” mới là mục tiêu lặp lại, chưa phải hành động kiểm/triển khai riêng.
- Index nội bộ giữ contract không buộc tạo publicv2: **1/1**. Số thứ tự bạn ghi lại3 coi lỗi gõ.

**Bổ sung hành động cụ thể:** thông báo lịch/cách chuyển; theo dõi client còn gọiv1 và xác nhận đã chuyển trước khi ngừng. Chấp nhận một kế hoạch khác có bằng chứng tương đương, không bắt tool telemetry.

Đề đã nói rõ v2 đổi price sangamount, không thiếu nghiệp vụ để nêu representation tương ứng. Phần bạn giải về chuyển loại tiền là ý mở rộng, không phải dữ kiện bắt buộc.

Đọc mục6–7.

### Câu 7 — 4/5

Bảng trùng được tính một lần. Mỗi dòng chấm phần safe0,5 và idempotency/ý nghĩa0,5:

| Method | Điểm | Nhận xét |
|---|---:|---|
| GET | 1/1 | Đúng safe và idempotent do intended operation chỉ đọc |
| PUT replacement | 0,5/1 | Không safe đúng; nhưng semantics replacement là idempotent, không phải tùy code cộng |
| DELETE | 0,5/1 | Idempotent đúng; safe=có sai vì thao tác xóa đổi resource |
| POST create thường | 1/1 | Không safe, chưa bảo vệ retry nên không bảo đảm effect một lần; nhận ý nhiều lần xử lý từ ngữ cảnh create |
| PATCH chưa biết operation | 1/1 | Không safe, không bảo đảm idempotent khi chưa biết operation |

**Điểm mấu chốt:** bạn đúng rằng một method Java gắn @PutMapping vẫn có thể viết sai logic. Nhưng câu này đang hỏi **HTTP semantics đúng nghĩa** cho PUT replacement; không dùng khả năng implement sai để đổi phân loại method trong bảng.

- PUT đúng nghĩa replacement: không safe nhưng idempotent.
- Code cộng dồn dưới @PutMapping: triển khai không đáp ứng contract PUT được cho.
- DELETE: không safe vì xóa, nhưng idempotent vì effect resource vắng sau lần đầu/lặp.

Đọc mục8–10; [RFC9110 idempotent methods](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2).

### Câu 8 — 4,5/5

- Áp policy missingprice/400: **0,5/1**. Bạn liệt kê ba field required, nhưng chưa chốt field thiếu cụ thể làprice và status400.
- Không tự coi missing là partial: **1/1**, bạn nói phải theo contract.
- Không bắt gửi mọi field Entity: **1/1**, nhận theo ý chỉ gửi theo contract.
- Writable/server-managed: **1/1**. Đọc cùng vế1 bạn nói id từpath, createdAt tự quản lý, và định nghĩa writable là phần có thể ghi thay; không ép cụm “tự mapping” thành client phải gửi.
- Binding chưa đủ validation/business: **1/1**, bạn giải thích Service và DB check, đúng.

**Chốt tình huống:** request thiếuprice, contract đã yêu cầu đầy đủ, nên400; không tự điềnprice hoặc giữ nguyên giá nhưpartial. Server tự quản lýcreatedAt không có nghĩa server được tự điền mọi field bắt buộc client bỏ sót.

Đọc mục9.1,14.

### Câu 9 — 2/5

- Stock sau lần đầu8: **0/1**, chưa đưa số; “có tính stock” không trả lời phép tính.
- Stock sau retry11: **0/1**, chưa đưa số.
- Nhận code sai contract replacement: **1/1**.
- Sửa assignment và state=3: **0/1**. Bạn chủ động đề xuất key thay vì sửa setStock nên chưa đáp ứng.
- @PutMapping không tự bảo đảm logic: **1/1**.

**Lỗi quan trọng nhất trong lượt này:** idempotency key không sửa được ý nghĩa cập nhật sai.

```text
Contract: gửi stock=3 để stock mới là3.
Code cộng: từ5 +3 thành8 ngay lần đầu.
Có key chặn retry: vẫn đang sai ở8.
Không có key: retry cộng tiếp thành11.
Sửa đúng replacement: gán3; retry vẫn gán3.
```

Dòng cần sửa:

```java
product.setStock(request.getStock());
```

Key có thể giải quyết nhận diện lặp cho use case phù hợp, nhưng không thay thế việc Service thực hiện đúng contract. Không từ chối giải pháp vì “khác văn mẫu”; từ chối ở tiêu chí này vì **kể cả dedup thành công vẫn không cho kết quả3**.

Đọc mục9.3,13.

### Câu 10 — 2/5

- Resource vắng sau lần đầu và lần hai: **1/1**.
- Status khác không tự mất idempotency: **1/1**.
- Audit khác side effect hoàn tiền lặp: **0/2**, chưa trả lời.
- Policy204 khi đã vắng có thể hợp lý: **0/1**, chưa trả lời.

Chỉnh thêm không trừ điểm mới:404 báo resource không có theo policy, **không tự chứng minh** server nhận biết đây là retry của cùng một request, cũng không tự chứng minh request đầu của chính client này đã xóa. Trong dữ kiện đề ta biết request đầu thành công, nhưng đó là dữ kiện được cung cấp, không phải thông tin suy ra chỉ từ404.

**Bổ sung:** audit mỗi request không tự phá intended effect xóa; hoàn thêm tiền mỗi retry có thể lặp side effect nghiệp vụ sai. API khác có thể chọn204 khi đã vắng nếu công bố và nhất quán.

Đọc mục10.

### Câu 13 — 5/5, mới chấm

| Tiêu chí | Điểm | Bằng chứng |
|---|---:|---|
| Unique bảo vệ SKU không trùng | 1/1 | Bạn nêu unique data và SKU đã có trong DB |
| Retry có thể409 theo policy | 1/1 | Bạn mô tả conflict và trả409 |
| Không đồng nghĩa replay response đầu | 1/1 | Bạn phủ định rõ; nhận xét có thể trùng sẵn cho thấy hiểu409 không tự chứng minh xử lý request trước |
| Phân biệt data unique với ý định gọi | 1/1 | Bạn nói quy tắc dữ liệu khác việc nhận biết cùng nghiệp vụ/request của người dùng |
| Không thay mọi create/action | 1/1 | Bạn nói không thay được mọi order/AIjob và nêu hướng key nhận diện |

**Bạn trả lời đúng bản chất, không cần viết lại để lấy điểm.** Unique SKU chặn hai dòng cùng SKU, nhưng không tự lưu/replay kết quả của một lần gọi.

Chỉnh nhẹ không trừ: trong **tình huống cụ thể của đề**, ta đã được cho request đầu tạo Product11 thành công. Ví dụ “có thể trùng sẵn” là lời giải thích chung cho việc409 không chứng minh replay, không cần dùng nó để phủ định dữ kiện đầu bài.

Ngoài ra “cùng nghiệp vụ” nên hiểu là **cùng một ý định/thao tác tạo**, không phải mọi lần tạo Product đều dùng chung một key. Hai ý định tạo riêng vẫn có thể dùng JSON giống nhau. Phần policy key/payload/race ở câu14 chưa có bài nên không tự cho điểm câu14 từ việc bạn nhắc key ở đây.

Ý này không tự sửa câu9: bạn đã hiểu key để nhận diện lặp, nhưng stock contract vẫn phải gán3 thay vì cộng thành8 trước khi bàn dedup.

Đọc Lesson01 mục13 để tra lại khi cần.

## 4. Phác đồ học lại đúng phần yếu

Nguồn: [Lesson 01 hiện hành](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_01_RESOURCE_VERSIONING_IDEMPOTENCY.md); thuộc checklist versioning/idempotency M3-1 trong [lộ trình](../../01_LO_TRINH.md).

- Response/request và DTO → mục3/5 → 5 phút → sửa lý do client đọcprice ở câu1.
- Resource URL → mục4 → 3 phút → viết hai route câu2 đúngproducts.
- HTTP204/list rỗng/Location → mục5 → 8 phút → sửa câu3/4 bằng response cụ thể.
- Breaking theo hành vi client → mục7 → 5 phút → mỗi dòng câu5 thêm một nguyên nhân riêng.
- Safe/idempotent → mục8–10 → 10 phút → sửa hai dòng PUT/DELETE, tínhstock5→8→11 và gán3→3.
- Key không thay business semantics → mục13 → 5 phút → giải thích vì sao chặn retry vẫn không sửa stock8 thành3.
- DELETE side effects/policy → mục10 → 4 phút → hoàn thành câu10 vế2/3.

## 5. Quyết định

**Ôn thêm trên phần đã làm, tiếp tục Lesson 01; chưa chốt điểm toàn bài.** Không mở lesson/module mới, không tự tick checklist. Câu11/12/14/15/16 chưa được đánh giá, không gọi cả lesson trượt chỉ từ mười câu đang làm.

Bạn có nền contract/versioning; điểm yếu đang tập trung ở status cụ thể và semantics của method/retry. Đừng giải mọi bài retry bằng key trước khi biết một request đúng phải làm gì.

## 6. Kế hoạch ngắn

Không bắt học lại cả module3–5 ngày từ điểm tạm. Có thể chia3 buổi ngắn:
1. Khoảng15 phút: sửa câu1–4 bằng URL/status/body thật.
2. Khoảng15 phút: thêm lý do câu5/6 và sửa bảng safe/idempotent.
3. Khoảng10 phút: làm lại trace stock câu9, hoàn thành câu10; rồi tiếp tục11/12/14/15/16 khi sẵn sàng; câu13 đã đạt.

Không yêu cầu code project, Redis hoặc test tự động để sửa bài lý thuyết.

## 7. Tiến độ và công thức

**4,5 +4 +3 +2 +3 +4,5 +4 +4,5 +2 +2 +5 =38,5/55 =70%.**

Lượt trước33,5/50=67%; lượt này chỉ thêm câu13 được5/5. Các câu1–10 giữ điểm do không thay bài làm, không cộng điểm cho việc đã đọc chữa bài.

Câu4/10 có vế trống vẫn dùng trần5đ của câu đang chấm. Câu11/12/14/15/16 không nằm mẫu số. Không normalize theo40 của đề cũ hoặc80 của toàn bài khi người học chỉ nhờ chấm câu đã làm.

05: giữ M3-1 đang học Lesson01, cập nhật điểm tạm70/ngày2026-11-20 và thêm một log. 01: không đổi checklist/trạng thái. M2-4 vẫn tạm dừng như quyết định trước.
