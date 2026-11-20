# Chấm lại đầy đủ đề cũ — M3-1 Lesson 01

## Kết quả hiện hành — lần chấm 5, ngày 2026-11-20

**68,5/80 = 85,625% — Đạt Lesson 01 theo đề cũ 16 câu.** Không phải điểm đề vá mới. Các mục nhận xét 60/80 ở phần lịch sử bên dưới đã được thay thế bởi kết quả này.

Snapshot: [bài nộp lần 5](archive/M3-1-rest-bp__2026-11-20__lesson1-lan2__2026-11-20__BAI_NOP_CHAM_5.md); [nhận xét trước lần 5](archive/M3-1-rest-bp__2026-11-20__lesson1-lan2__2026-11-20__NHANXET_TRUOC_CHAM_LAI_5.md). Giữ nguyên bài làm; đọc cả nội dung nằm ngoài code fence do lỗi trình bày ở câu9.

### Điểm nhóm hiện hành

| Nhóm | Điểm | Đánh giá |
|---|---:|---|
| Contract/versioning/tương thích: 1,2,5,6 | 16,5/20 =82,5% | Cần cụ thể hóa route/lý do |
| Status/list/detail: 3,4 | 8,5/10 =85% | Đã sửa204 và list rỗng |
| Method/state/effect: 7–11,16 | 24/30 =80% | Stock đã sửa; safe/concurrency còn thiếu |
| Timeout/unique/key: 12–14 | 15/15 =100% | Đủ ý trên bài viết |
| Controller: 15 | 4,5/5 =90% | Còn create/Location |

### Chấm và chữa đủ 16 câu theo bản mới

| Câu | Điểm | Đã làm được | Thiếu/sai và cách sửa |
|---|---:|---|---|
| 1 | 4,5/5 | Method/URL/type/body3đ; DTO contract1đ; breaking0,5đ | Vẫn giải thích client gửi request, trong khi đề là client đọc response.price bị xóa. Sửa đúng chiều; mục3 bài học |
| 2 | 4,5/5 | List1đ; detail0,5đ; version/Flyway/Java2đ; method1đ | Đã bỏ động từ. Detail còn Product và hai phương án; convention là GET /api/v1/products/10, không tùy payload. Không trừ viết hoa/thiếu slash đầu khi ý rõ; mục4/6 |
| 3 | 4/5 | 201=1; Location0,5; body0,5;204 không body1; HTTP khác JSON1 | Đã sửa204. Còn thiếu Location /api/v1/products/11 và field id11 trong response; DTO không nằm trong Location. 200 vẫn có thể có body; mục5 |
| 4 | 4,5/5 | Ba status3đ; body0,5; PUT policy1đ | Đã sửa200/404/404 và không cấm mọi PUT-create. Nhận “body rỗng” là list không có phần tử theo ngữ cảnh; còn thiếu []/content=[] và lý do collection vẫn tồn tại, không phải bỏ HTTP body; mục5.2 |
| 5 | 3/5 | Cả năm kết luận đúng; dòng đầu có lý do | Bốn lý do còn chung/trống: client cần number nhận object; request cũ thiếu description bị từ chối; tolerant bỏ qua field lạ; strict từ chối field lạ. Mỗi dòng kết luận0,5+lý do0,5; mục7 |
| 6 | 4,5/5 | V1/v2 2đ; chungDB/Service/mapper1; chuyểnclient0,5; index1 | “Không phá contract” chưa phải hành động thứ hai. Thêm kiểm client còn gọi v1/xác nhận đã chuyển hoặc thông báo lịch chuyển; mục6–7 |
| 7 | 4/5 | GET1; PUT0,5; DELETE0,5; POST1; PATCH1 | PUT replacement đúng semantics: không safe nhưng idempotent. DELETE không safe vì xóa state. Service viết sai không đổi semantics được hỏi; mục8–10 |
| 8 | 4,5/5 | Missing0,5; khôngpartial1; khôngmọifieldEntity1; writable1; validation1 | Cần chốt thiếu price →400. Không tự điền field bắt buộc; id từpath/createdAt server quản lý khác giá client bỏ sót; mục9.1 |
| 9 | 5/5 | Số8/11=2đ; nhận sai1; phép gán1; annotation1 | Đã sửa đúng product.setStock(request.getStock()). Phép gán biểu đạt stock=3 sau cả hai lần, không bắt lặp lại bằng văn để có điểm. Không còn lỗi dùng key che phép cộng; mục9.3 |
| 10 | 3,5/5 | State1; lýdo0,5; audit1; refund1; policy0 | Kết luận status khác vẫn idempotent đúng, nhưng lý do “lần3–7 giống lần2” chưa đủ: phải so effect một lần với nhiều lần. 204 khi đã vắng có thể là policy hợp lý nếu công bố/nhất quán. Nhận ý refund cần chỉ làm một lần là đã nhận ra nguy cơ hoàn trùng; mục10 |
| 11 | 5/5 | Đủ trace gán/tăng, PATCH và missing/null | Không cần viết lại; không trừ trả lời gộp |
| 12 | 5/5 | Đủ commit, retry, JSON giống không gộp create, server/client, xác nhận kết quả | Không cần viết hạ tầng |
| 13 | 5/5 | UniqueSKU,409,khác replay,data khác intent,không thay mọi action | Không cần viết lại |
| 14 | 5/5 | Giữkey,payload mismatch,ýđịnhriêng,giới hạnRedis | Không cần viết lại |
| 15 | 4,5/5 | PUT/PathVariable/RequestBody/200:4đ; Location0,5 | Không chỉ v2→v1: bỏ created/Location cũ, dùng ResponseEntity.ok(service.replace(id,request)). @Valid nhắc thêm không cộng/trừ; mục14 |
| 16 | 2/5 | Hai target khác nhau2đ | Ý2/3 trống:0/3. Phần chữa bên dưới không được cộng vào bài nộp |

Tổng: **4,5+4,5+4+4,5+3+4,5+4+4,5+5+3,5+5+5+5+5+4,5+2 =68,5**. So với60đ, tăng8,5đ do bài đã sửa; không lấy điểm đề vá cộng vào.

### Giải thích riêng câu16: ba tình huống khác nhau

**Ý1 — Bạn đã hiểu đúng:** cùng JSON nhưng /products/10 và /products/11 là hai Product khác nhau. Body giống không đủ để gọi lần sau là retry lên cùng resource. Bạn đã nêu hai ID khác nhau nên nhận đủ2đ.

**Ý2 — Chỉ có Product10, không ai sửa xen giữa.** Đọc PUT như yêu cầu: “Hãy để ba field của Product10 có giá trị Keyboard/120/2.” Không cộng thêm gì.

```java
product.setName(request.getName());
product.setPrice(request.getPrice());
product.setCategoryId(request.getCategoryId());
```

| Thời điểm | name | price | categoryId |
|---|---|---:|---:|
| Ban đầu | Old | 100 | 1 |
| PUT lần1 | Keyboard | 120 | 2 |
| Retry cùng PUT | Keyboard | 120 | 2 |

Gửi lại cùng yêu cầu gán thì ba field vẫn vậy: effect thay thế lặp như một lần. updatedAt có thể khác, audit có thể thêm một dòng mỗi request; không cần mọi byte/log trong DB giống nhau. Nếu retry còn hoàn tiền hoặc cộngstock thì đó là side effect nghiệp vụ khác, cần xét riêng.

**Trả lời đủ ý2:** “Sau cả hai lần đều Keyboard/120/2. updatedAt/audit khác không tự làm mất idempotency của effect replacement.”

**Ý3 — Đây là tình huống riêng, có người sửa xen giữa:**

| Thứ tự | Hành động | price trong DB |
|---|---|---:|
| 1 | Bạn PUT giá120 | 120 |
| 2 | Đồng đội sửa giá150 | 150 |
| 3 | Bạn retry PUT giá120 | Có thể trở lại120 |

Service nhận yêu cầu gán120 không tự biết phải giữ thay đổi150 mới hơn của đồng đội. Nếu không có kiểm cạnh tranh, retry có thể ghi đè giá150. **Idempotency không phải cơ chế tự chống lost update.** Không cần học thêm cú pháplock/ETag để trả lời câu này.

**Trả lời đủ ý3:** “Không. Idempotency không tự giải quyết concurrency; retry có thể ghi đè cập nhật của người khác.” Không trộn giả định ý2 (không ai xen giữa) với ý3 (có người xen giữa).

Nguồn: [RFC9110 §9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2) xác định intended effect và cho phép log/lịch sử riêng từng request; [§9.3.4](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.3.4) mô tả PUT và lưu ý tác nhân khác có thể thay đổi state đồng thời.

### Ôn và quyết định hiện hành

- Chiềuresponse/lýdobreaking → bài học mục3/7 →5phút → nêu client đọc field/kiểu nào.
- URL/Location/list → mục4–5 →5phút → viết route,Locationid11,body[].
- Safe/effect/concurrency → mục8–10 →10phút → kể lại hai bảng câu16 và sửa policy câu10.
- Ngừngv1/responsebuilder → mục7/14 →5phút → nêu hành động kiểm client và bỏcreated.

**Đạt Lesson01 theo đề cũ, có thể tiếp Lesson02.** Câu16 còn thiếu không tạo luật trượt riêng vì ngưỡng là68/80, không phải85% từng câu. Nên đọc phần chữa trước khi tiếp; không bắt làm đềvá cũ mới công nhận đạt. Không áp kế hoạch học lại3–5ngày vì tổng đã đạt.

ModuleM3-1 vẫn đang học: chưa xác nhận pagination/error/HATEOAS/deliverable. Điểm bài viết không chứng minh kỹ năng production. 05 cập nhật trạng thái Lesson01 đạt/điểm/ngày/log; 01 chỉ tick URLversioning, không tick idempotency còn yếu ở7/16 hoặc phần chưa kiểm.

README đánh giá75% và đềvá20đ là tài liệu của mốc trước, không còn là yêu cầu bắt buộc hiện tại. Giữ nguyên chúng để không mất lịch sử; đềvá chưa được chấm.

---

## Lịch sử trước lần chấm5 — không phải kết quả hiện hành

Ngày **2026-11-20**. [Bài làm](../de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson1-lan2.md); [Lesson 01](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_01_RESOURCE_VERSIONING_IDEMPOTENCY.md). Chấm nội dung đã viết, không suy đoán khả năng bên ngoài bài làm.

## 0. Snapshot và phạm vi

- [Bài nộp tại thời điểm rà lỗ hổng](archive/M3-1-rest-bp__2026-11-20__lesson1-lan2__2026-11-20__BAI_NOP_KIEM_TRA_LO_HONG_4.md).
- [Nhận xét trước khi rà và ra đề vá](archive/M3-1-rest-bp__2026-11-20__lesson1-lan2__2026-11-20__NHANXET_TRUOC_RA_DE_VA_4.md): 58/80 =72,5%.
- So với bản chấm đủ16 câu trước: chỉ câu15 thêm “sửa từ Post thành Put, sửa thành200”; nhận thêm2đ, từ2,5 lên4,5. Các câu khác không đổi nên giữ điểm.
- Hiện cả16 câu đều có trả lời ít nhất một phần. Chấm toàn bài trên80đ; vế bỏ trống/ghi chịu không có điểm. Không còn loại cả câu16 khỏi mẫu số vì bạn đã trả lời vế1.
- Câu7 có bảng lặp, chỉ chấm một lần. Không sửa đề hoặc bài làm.
- File đáp án mới không hiện có trong workspace ở lượt trước; dùng các vế/chia điểm công khai trong đề và lesson, không tự khôi phục file hoặc thêm tiêu chí ẩn.

## 1. Điểm tổng và nhóm kiến thức

**60/80 ×100 =75/100 — Lesson 01 cần ôn, chưa đạt85%.**

| Nhóm | Điểm | Nhận xét |
|---|---:|---|
| Contract/versioning/tương thích (1,2,5,6) | 16/20 =80% | Còn thiếu cụ thể route/lý do client bị vỡ |
| HTTP status/list/detail (3,4) | 5/10 =50% | Còn nhầm204 có body và list rỗng404 |
| Method/state/retry effect (7–11,16) | 19,5/30 =65% | Cần phân biệt replacement và cơ chế key |
| Timeout/unique/key (12,13,14) | 15/15 =100% | Đáp án đã viết đúng, đủ ý được hỏi |
| Controller theo contract (15) | 4,5/5 =90% | Đã sửa binding/mapping/status; còn phần Location/create |

Không gọi phần mới đúng là bằng chứng đã sửa các câu cũ. Câu9 vẫn sai replacement dù câu14 đã giải thích key đúng.

## 2. Bảng từng câu

| Câu | Điểm | Nhận xét |
|---|---:|---|
| 1 | 4,5/5 | Giữ điểm; nhầm ví dụ client gửi request với đọc response |
| 2 | 4/5 | Giữ điểm; URL chưa đúngproducts và /products/10 |
| 3 | 3/5 | Giữ điểm;204 không body, Location/response chưa cụ thể |
| 4 | 2/5 | Giữ điểm; list rỗng phải200, vế2/3 chưa có |
| 5 | 3/5 | Giữ điểm; kết luận đúng nhưng lý do nhiều dòng còn chung |
| 6 | 4,5/5 | Giữ điểm; thiếu hành động cụ thể trước dừngv1 |
| 7 | 4/5 | Giữ điểm; PUT replacement idempotent, DELETE khôngsafe |
| 8 | 4,5/5 | Giữ điểm; chưa chốt missingprice→400 |
| 9 | 2/5 | Giữ điểm; chưa tính8/11 và gán3; key không sửa cộng sai |
| 10 | 2/5 | Giữ điểm; mới trả lời vế1 |
| 11 | 5/5 | Mới: đúng gán/tăng, PATCH và missing/null |
| 12 | 5/5 | Mới: đúng commit/timeout, POST retry và xác nhận kết quả |
| 13 | 5/5 | Giữ điểm: đúng unique khác replay/request intent |
| 14 | 5/5 | Mới: đúng key cùng ý định, payload mismatch và giới hạn Redis |
| 15 | 4,5/5 | Đã bổ sung PUT/200; chỉ còn phần Location/create cần làm rõ |
| 16 | 2/5 | Mới: phân biệt target đúng, vế2/3 chưa trả lời |

## 3. Phân tích và chữa bài

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

### Câu 11 — 5/5, mới chấm

- Gán name=Keyboard sau cả hai lần: **1/1**.
- Tăng stock cho8 rồi11: **1/1**.
- Nhận gán idempotent và cộng dồn không có effect như một lần: **1/1**.
- PATCH không tự bảo đảm cho mọi operation: **1/1**.
- Missing/null cần contract rõ: **1/1**.

Không trừ vì bạn trả lời gộp một đoạn. Nội dung đã đáp ứng đủ các vế, không bắt đánh số hoặc đổi sang code.

### Câu 12 — 5/5, mới chấm

- Record đã lưu vì đề cho commit: **1/1**.
- POST retry có thể tạo thêm: **1/1**.
- JSON giống không tự gộp hai lần create: **1/1**.
- Phân biệt server đã làm với client chưa biết: **1/1**.
- Nêu xác nhận theo định danh/trạng thái hoặc cơ chế nhận diện retry: **1/1**.

“ecord” coi lỗi gõ, không trừ. Không yêu cầu triển khai hạ tầng khi đề chỉ hỏi nhận diện và hướng xử lý.

### Câu 13 — 5/5, giữ điểm

| Tiêu chí | Điểm | Bằng chứng |
|---|---:|---|
| Unique bảo vệ SKU không trùng | 1/1 | Bạn nêu unique data và SKU đã có trong DB |
| Retry có thể409 theo policy | 1/1 | Bạn mô tả conflict và trả409 |
| Không đồng nghĩa replay response đầu | 1/1 | Bạn phủ định rõ; nhận xét có thể trùng sẵn cho thấy hiểu409 không tự chứng minh xử lý request trước |
| Phân biệt data unique với ý định gọi | 1/1 | Bạn nói quy tắc dữ liệu khác việc nhận biết cùng nghiệp vụ/request của người dùng |
| Không thay mọi create/action | 1/1 | Bạn nói không thay được mọi order/AIjob và nêu hướng key nhận diện |

**Bạn trả lời đúng bản chất, không cần viết lại để lấy điểm.** Unique SKU chặn hai dòng cùng SKU, nhưng không tự lưu/replay kết quả của một lần gọi.

Chỉnh nhẹ không trừ: trong **tình huống cụ thể của đề**, ta đã được cho request đầu tạo Product11 thành công. Ví dụ “có thể trùng sẵn” là lời giải thích chung cho việc409 không chứng minh replay, không cần dùng nó để phủ định dữ kiện đầu bài.

Ngoài ra “cùng nghiệp vụ” nên hiểu là **cùng một ý định/thao tác tạo**, không phải mọi lần tạo Product đều dùng chung một key. Hai ý định tạo riêng vẫn có thể dùng JSON giống nhau. Câu14 đã có bài ở lượt này và được chấm riêng bên dưới, không cộng điểm câu14 từ việc bạn nhắc key ở câu13.

Ý này không tự sửa câu9: bạn đã hiểu key để nhận diện lặp, nhưng stock contract vẫn phải gán3 thay vì cộng thành8 trước khi bàn dedup.

Đọc Lesson01 mục13 để tra lại khi cần.

### Câu 14 — 5/5, mới chấm

- Retry cùng ý định giữ key: **1/1**.
- Server nhận diện lần xử lý liên quan: **1/1**.
- Cùng key/payload khác không âm thầm coi là cũ: **1/1**.
- Hai ý định độc lập không buộc dùng chung key vì JSON giống: **1/1**.
- Redis không tự bảo đảm exactly-once khi race/failure: **1/1**.

Phần cuối bạn nhấn mạnh hai ý định riêng dùng key riêng là đúng. Ghi nhớ phạm vi “một ý định gọi” chứ không phải mọi thao tác cùng loại nghiệp vụ.

### Câu 15 — 4,5/5, đã bổ sung PUT/200

| Tiêu chí đã công khai | Điểm | Bằng chứng |
|---|---:|---|
| Đổi mapping thành PUT | 1/1 | Bản mới đã nói sửa từPost thànhPut |
| Bind id bằng PathVariable | 1/1 | Bạn chỉ đúng thiếuannotation |
| Bind JSON bằng RequestBody | 1/1 | Bạn chỉ đúng |
| TrảHTTP200 | 1/1 | Bản mới đã nói sửa thành200 |
| BỏLocationv2 không thuộc update contract | 0,5/1 | Nhận ý sửa version vềv1; nhưng bạn vẫn đề xuấtcreate/Location, chưa bỏ semanticscreate |

Bạn đã được nhận đủ hai điểm mới cho PUT và200. Không đưa hai ý này vào đề vá lần nữa; chỉ còn0,5đ liên quan cách bỏ phầncreate/Location sai contract.

@Valid có thể phù hợp khi triển khai validation thật, nhưng đề đã cho input hợp lệ và không chấm việc đó. **Không cộng cũng không trừ** vì bạn nhắc thêm.

Vấn đề không chỉ là v2 thànhv1. Đây là **update Product đã có, contract trả200**, nên không dùngcreated. Sửa đúng tối thiểu:

```java
@PutMapping("/{id}")
public ResponseEntity<ProductResponse> replace(
        @PathVariable("id") Long id,
        @RequestBody ReplaceProductRequest request) {
    return ResponseEntity.ok(service.replace(id, request));
}
```

Không cần Location cho contract update này. Không tự sửa route thành một endpointcreate hoặc thêm hành động mà đề không yêu cầu.

Đọc Lesson01 mục14.

### Câu 16 — 2/5, mới chấm

- Không phải cùng target: **1/1**.
- Lý do có id10 vàid11 khác nhau, nên cùng JSON chưa đủ coi cùng request: **1/1**. Bạn đã thực sự giải thích đúng dù sau đó viết chưa hiểu; không xóa điểm ý đúng đó.
- State sau replacement lặp: **0/1**, chưa trả lời.
- Metadata/audit khác có tự phá effect không: **0/1**, chưa trả lời.
- Giới hạn lost update/concurrency: **0/1**, chưa trả lời.

**Câu “cùng JSON chưa đủ” chỉ có nghĩa:** muốn gọi là retry của một thao tác lên resource đó, không thể chỉ nhìn body. Gửibody giống nhưng pathid10 vàid11 là hai đích khác nhau. Bạn đã hiểu đúng phần này, không phải đang sai.

Phần còn lại hiểu bằng ví dụ:

```text
Cùng target Product10:
Trước: name=Old, price=100, categoryId=1.
PUT lần1 gán Keyboard/120/2.
PUT lần2 giống hệt: vẫnKeyboard/120/2.
updatedAt hoặc một dòng audit mới có thể khác;
điều đó không tự làm intended replacement effect khác.
```

Vế3 là tình huống **khác**, có người sửa xen giữa:

```text
Bạn PUTprice=120.
Người khác đổiprice=150.
Bạn retryPUTprice=120.
Nếu không có cơ chế kiểm cạnh tranh, giá có thể lại về120.
```

Vì vậy idempotent không tự bảo vệ thay đổi của người khác. Không cần viếtlock/ETag; chỉ cần nhận ra giới hạn. Ví dụ minh họa này không làm đổi giả định không có update xen giữa ở vế2.

Đọc Lesson01 mục8–9.

## 4. Đánh giá và đề vá hiện hành

Đã rà toàn bộ16 câu, phân biệt phần đúng, sai và còn thiếu ở [README đánh giá hiện tại](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/README_DANH_GIA_VA_KE_HOACH_VA_LESSON_01.md).

Đề vá: [12 câu chỉ kiểm20đ còn thiếu](../de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson1-va-lo-hong-lan1.md). Có [đáp án/rubric riêng](../de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson1-va-lo-hong-lan1__DAPAN.md). Không yêu cầu học kiến thức mới hoặc thi lại phầnđãđúng.

Phác đồ ôn ngắn:
- Request/response và lý do client hỏng → Lesson01 mục3/7 → 5phút → câuvá1.
- URL, Location,204 và list rỗng → mục4–5 → 8phút → câuvá2–5.
- Dừngversion và policy input → mục7/9 → 4phút → câuvá6/8.
- PUT/DELETE, effect và metadata → mục8–10 → 10phút → câuvá7/9/10/12.
- Phần responsebuilder còn thiếu → mục14 → 2phút → câuvá11.

Không thi lại PATCH, timeout, unique/key ở câu11–14 gốc hoặc binding/PUT/200 đã được vá.

## 5. Quyết định

**Lesson01 hiện chưa đạt:75%.** Module M3-1 vẫn đang học, không tick checklist hoặc tự mở lesson tiếp.

Có thể hoàn thành Lesson01 bằng đề vá THI_LAI đã tạo: chấm riêng20đ, đạt≥17/20=85% thì xác nhận Lesson01 qua đề vá, dựa cùng bằng chứng phầnđãđúng ở bài gốc. Không bắt100% hoặc thêm điều kiện ẩn. Chỉ quyết định sau khi thực sự làm/chấm đề vá.

Giữ60/80 của bài gốc trong lịch sử, không cộng hai điểm phần trăm/không trung bình. Chốt mộtlesson không chốtmodule/deliverable.

## 6. Kế hoạch ngắn

1. Đọc README đánh giá để biết chính xác vế nào còn thiếu.
2. Ôn đúng các mục nêu trên trong khoảng30phút.
3. Làm đềvá bằng lời của bạn, không sửa/xóa bài gốc.
4. Gửi chấm để xác nhận các vế đã được vá hay còn sai.

Không bắt làm lại toàn bộ16 câu, không yêu cầu project/Redis/locking hoặc một bài mới ngoài phạm vi cũ.

## 7. Tiến độ và lịch sử

- Câu1–10:33,5/50=67% phần đã làm.
- Thêmcâu13:38,5/55=70% phần đã làm.
- Bản trước đủ16câu:58/80=72,5%.
- Rà bản hiện tại, câu15 thêm đúngPUT/200: **4,5+4+3+2+3+4,5+4+4,5+2+2+5+5+5+5+4,5+2 =60/80=75%**.
- Khoảng trống còn đúng20đ; đề vá chưa làm/chưa có điểm.
- 05: cập nhật điểm75 của bài gốc/ngày2026-11-20 và log; giữ M3-1 đang học, M2-4 tạm dừng.
- 01: không sửa checklist/trạng thái vì chưa có kết quả đạtlesson.
