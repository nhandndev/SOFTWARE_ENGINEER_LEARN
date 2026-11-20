# Chấm đủ 16 câu M3-1 Lesson 01

Ngày **2026-11-20**. [Bài làm](../de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson1-lan2.md); [Lesson 01](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_01_RESOURCE_VERSIONING_IDEMPOTENCY.md). Chấm nội dung đã viết, không suy đoán khả năng bên ngoài bài làm.

## 0. Snapshot và phạm vi

- [Bài nộp lượt 3](archive/M3-1-rest-bp__2026-11-20__lesson1-lan2__2026-11-20__BAI_NOP_CHAM_3.md).
- [Nhận xét trước](archive/M3-1-rest-bp__2026-11-20__lesson1-lan2__2026-11-20__NHANXET_TRUOC_CHAM_LAI_3.md): 38,5/55 =70% phần đã làm.
- So bản nộp: chỉ câu11,12,14,15,16 được thêm; câu1–10 và13 không đổi nên giữ điểm.
- Hiện cả16 câu đều có trả lời ít nhất một phần. Chấm toàn bài trên80đ; vế bỏ trống/ghi chịu không có điểm. Không còn loại cả câu16 khỏi mẫu số vì bạn đã trả lời vế1.
- Câu7 có bảng lặp, chỉ chấm một lần. Không sửa đề hoặc bài làm.
- File đáp án mới không hiện có trong workspace ở lượt trước; dùng các vế/chia điểm công khai trong đề và lesson, không tự khôi phục file hoặc thêm tiêu chí ẩn.

## 1. Điểm tổng và nhóm kiến thức

**58/80 ×100 =72,5/100 — Lesson 01 cần ôn, chưa đạt85%.**

| Nhóm | Điểm | Nhận xét |
|---|---:|---|
| Contract/versioning/tương thích (1,2,5,6) | 16/20 =80% | Còn thiếu cụ thể route/lý do client bị vỡ |
| HTTP status/list/detail (3,4) | 5/10 =50% | Còn nhầm204 có body và list rỗng404 |
| Method/state/retry effect (7–11,16) | 19,5/30 =65% | Cần phân biệt replacement và cơ chế key |
| Timeout/unique/key (12,13,14) | 15/15 =100% | Đáp án đã viết đúng, đủ ý được hỏi |
| Controller theo contract (15) | 2,5/5 =50% | Bind đúng; mapping/status còn sai |

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
| 15 | 2,5/5 | Mới: đúng binding, nhận một phần route version; chưa sửaPUT/200 |
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

### Câu 15 — 2,5/5, mới chấm

| Tiêu chí đã công khai | Điểm | Bằng chứng |
|---|---:|---|
| Đổi mapping thành PUT | 0/1 | Chưa nêu, code gốc vẫnPostMapping |
| Bind id bằng PathVariable | 1/1 | Bạn chỉ đúng thiếuannotation |
| Bind JSON bằng RequestBody | 1/1 | Bạn chỉ đúng |
| TrảHTTP200 | 0/1 | Chưa sửacreated sangok |
| BỏLocationv2 không thuộc update contract | 0,5/1 | Nhận ý sửa version vềv1; nhưng bạn vẫn đề xuấtcreate/Location, chưa bỏ semanticscreate |

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

## 4. Phác đồ ôn đúng phần yếu

Nguồn chính: [Lesson01](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_01_RESOURCE_VERSIONING_IDEMPOTENCY.md), mục3–10/14; thuộc checklist versioning/idempotency trong [lộ trình](../../01_LO_TRINH.md).

- HTTPstatus/list/detail → mục5 → 8phút → sửa câu3/4:201+Location đúng,204 khôngbody,list rỗng200.
- URL/contract → mục3–7 → 8phút → sửa câu1/2 và thêm lý do cụ thể câu5/6.
- Safe/PUT/DELETE → mục8–10 → 10phút → sửa câu7/9/10, không lấykey thay choassignment.
- Controller → mục14 → 5phút → sửa câu15 đủ5ý.
- Cùngrequest/concurrency → mục8–9 và ví dụ câu16 ở trên → 5phút → hoàn thành vế2/3.

Không yêu cầu làm lại câu11/12/13/14 đang đủ điểm.

## 5. Quyết định

**Ôn thêm Lesson01:72,5%, chưa đạt85%.** Module M3-1 vẫn đang học; không tick checklist, không chuyển Lesson02 hoặc module tiếp theo trong lượt này.

Đề cần68/80, hiện58/80: thiếu10đ thô so với ngưỡng. Mục tiêu là sửa các lỗi thực sự, không chỉ chọn phần dễ bù đủ điểm. Điểm mới đúng vềkey không tự chứng minh logicPUT câu9 đã đúng.

## 6. Kế hoạch3ngày

1. Ngày1 — khoảng15phút: sửa status/URL và cách giải thích client ở câu1–6.
2. Ngày2 — khoảng15phút: tínhstock câu9 từ5→8→11, sửa gán3; hoàn thànhaudit/policy câu10 và sửaPUT/DELETE câu7.
3. Ngày3 — khoảng10phút: sửaController câu15 theo5ý và tự kể hai tình huống câu16, rồi nộp chấm lại.

Có thể hoàn thành sớm hơn, không bắt chờ đủ3ngày. Không bắt dựngproject hoặc làm một đề mới để thay thế bài này.

## 7. Tiến độ và lịch sử

- Câu1–10:33,5/50=67% phần đã làm.
- Thêmcâu13:38,5/55=70% phần đã làm.
- Lượt này đủ16câu: **4,5+4+3+2+3+4,5+4+4,5+2+2+5+5+5+5+2,5+2 =58/80=72,5%**.
- Câu1–10/13 giữ nguyên; chỉ thêm điểm11/12/14/15/16, tổng mới thêm19,5đ trên25đ.
- 05: ghi Lesson01 cầnôn và điểm72,5/ngày2026-11-20, thêm mộtlog. Giữ module đanghọc, M2-4 tạmdừng.
- 01: không sửa checklist/trạng thái module từ kết quả chưađạt của mộtlesson.
