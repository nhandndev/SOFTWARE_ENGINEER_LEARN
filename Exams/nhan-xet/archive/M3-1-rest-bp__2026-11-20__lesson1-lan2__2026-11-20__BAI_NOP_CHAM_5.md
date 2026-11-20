# M3-1 · Lesson 01 — Kiểm tra contract, versioning và retry

> Bản **2026-11-20**. LESSON mở rộng: **16 câu × 5đ = 80đ**. Điểm = điểm thô /80 ×100; đạt từ **68/80 =85%**. Có thể làm hai buổi, mỗi buổi khoảng 45–60 phút.

Trả lời bằng lời của bạn, bảng state hoặc vài dòng code. Chấm đúng ý nghĩa, không yêu cầu học thuộc tên API/imports. Không cần chạy project. Mỗi câu độc lập; chỉ dùng dữ kiện được nêu, không đoán framework tự xử lý nghiệp vụ.

## Quy ước chung của bài

Shopcore có API version /api/v1. Product response gồm id/name/price/categoryId; price là number theo đơn vị đã công bố. Create request có sku/name/price/categoryId; SKU unique. PUT Product chỉ thay name/price/categoryId, id từ path, createdAt do server quản lý, SKU không sửa qua PUT này.

| Tình huống | Policy bài |
|---|---|
| Detail/list thành công | 200 + DTO/danh sách theo contract |
| Create thành công | 201 + Location tới resource vừa tạo cùng version + DTO |
| PUT Product đang có | 200 + DTO |
| DELETE Product đang có | 204 không body |
| Detail/PUT id không có | 404 |
| DELETE id đã vắng | 404 |
| Input thiếu bắt buộc | 400 |
| SKU trùng | 409 |

Đây là policy đã chọn cho bài, không khẳng định mọi API bắt buộc giống vậy. Khi hỏi retry, không có job/người khác thay state xen giữa, trừ khi câu nói khác. Không cần cấu hình DB, exception handler hoặc security.

Bài học: [Lesson 01 đã viết lại](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_01_RESOURCE_VERSIONING_IDEMPOTENCY.md).

---

## Câu 1 — Client nhìn thấy contract nào? (5đ)

Response v1 đã công bố:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":10,"name":"Keyboard","price":120.00,"categoryId":2}
```

Client đang đọc product.price để hiển thị giá. Backend đổi DTO thành amount, xóa price; các test compile Java đều qua.

1. Nêu ba thành phần contract client quan sát, không tính tên ServiceImpl/Repository. **(3đ)**
2. Client có thể hỏng vì sao dù backend compile? Response DTO có phải chỉ là dữ liệu nội bộ không thể trả cho client không? **(2đ)**

**Trả lời:** contract nó nhìn những phần mà client nhìn  Http Method , URL , Type , Body mà Backend truyền về
Client có thể hổng khi mà Client gửi payload có price mà Backend đổi DTO thành amount và xoá price thì đã vi phạm Api Contract và cái này là Break thì nó sẽ khiến cho Client và Server bị lỗi và vi phmaj APi Contract ban đầu . Response DTO k chỉ là dữ liệu nội bộ không mà cần phải là Mapping đuọc với APi Contact với thằng Client

---

## Câu 2 — URL, resource và version (5đ)

Hai route cũ: GET /getAllProducts và GET /getProduct?id=10.

1. Viết lại hai route theo convention resource/version của bài. **(2đ)**
2. /api/v1 là version của cái gì? Có tự đổi thành v2 khi Flyway lên V2 hoặc Java nâng version không? **(2đ)**
3. GET và DELETE cùng /api/v1/products/10 có phải cùng một hành động không? Giải thích vai trò HTTP method. **(1đ)**

**Trả lời:**1 GET api/v1/Products  và api/v1/Product?id=10 hoặc là api/v1/Product/10. tuỳ vào payload của Client cần thì V1 và V2 sẽ có các payload tương ứng
2 là Api Version cũ ban đầu của Api contract ban đầu là ApiContract là quy đinh Payload , api là như nà .. nhưng mà sau 1 thời gian thì update thêm nên là sẽ có version mới . Không nên tự đổi thành V2 khi Flyway lên v2 mà phải giữu luôn cả v1 và làm thêm V2 , vì là backend có thể nối tới nhiều client như bên Web hoặc là mobile , nếu như web cập nhật trước mà mobile chưa thay đổi thì nó sẽ sai nên là phải có giữu lại ver cũ và khi nào mà đồng bộ xong hết giauwx các client thì nên bỏ V1 , Java nâng version làm gì ? 
3 là GEt và DELETE là 2 hành động nghiệp vụ khác nhau nhế, Get là dùng chỉ để mục đích là đọc giữ liệu và giữ nguyên trạng thái , state , resource của dự án , chỉ mục đích là đọc thôi . còn delêt là có thay đổi resource của dự án là xoá cái Product có id là 10 nên là khác nhau nhé . HTTP method nó sẽ tuỳ voà mục đích xử dụng ênn là mới phân chia thành nhiều 

---

## Câu 3 — HTTP status không phải số trong JSON (5đ)

POST /api/v1/products tạo thành công Product id=11.

1. Viết HTTP status, Location và các field chính của response body theo policy. **(3đ)**
2. DELETE thành công theo policy có trả JSON dưới HTTP 204 không? **(1đ)**
3. Một bạn trả HTTP 200 với body {"status":201}. Có tương đương HTTP 201 không? Vì sao? **(1đ)**

**Trả lời:** Http status là 201 , Location sẽ là Location tới resource vừa tạo cùng version + DTO , thì sẽ trả về Product Response , chứa thông tin của 1 request và http code r sku/name/price/categoryId
2 delete thành công thì sẽ theo policu và sẽ không trả về body gì hết vì theo APi Contract thì delete k trả về body 
3 nếu như trả về HTTP 200 với body là status 201 thì k tương đương với laị HTTP. 201 nhé , 1 cái là HTTP Status và 1 cái là HTTP có body nói về HTTP Status nên là khác nhau , 1 cái là Ok nhưng k có gì , 1 cái là @01 là ok và đã tạo được cái gì đó .
2 

---

## Câu 4 — Danh sách rỗng khác resource không có (5đ)

Các trường hợp độc lập, query/input đều hợp lệ:
- GET /api/v1/products?categoryId=2 không có Product phù hợp.
- GET /api/v1/products/999 không có Product 999.
- PUT /api/v1/products/999 có body đầy đủ nhưng id không tồn tại.

1. Chọn status cho từng trường hợp theo policy. **(3đ)**
2. Với list rỗng, mô tả body theo hợp đồng list và giải thích vì sao không đồng nhất với detail không có. Không cần schema pagination chi tiết của Lesson 02. **(1đ)**
3. Policy PUT id vắng trả 404 trong bài có chứng minh HTTP cấm mọi API dùng PUT để tạo resource không? **(1đ)**

**Trả lời:**
1 cái đầu là trả về 200 nhưng mà body rỗng , cái thứ 2 là 404 là k tìm thấy resouce , cái thứ 3 là 404 vì id k tìm thấy
2  
3 không chúng minh HTTP cấm mọi APi dùng PUT tạo resource do là phụ thuộc vào API Contract nhé 

---

## Câu 5 — Năm thay đổi, client cũ còn chạy không? (5đ)

Client v1 cũ đọc price là number, gửi request theo schema cũ và bỏ qua response field lạ. Riêng dòng 5 dùng client strict được mô tả ở đó.

Với mỗi dòng, kết luận tương thích/breaking trong đúng giả định và nêu một lý do. **Mỗi dòng 1đ.**

| Thay đổi | Kết luận và lý do của bạn |
|---|---|
| Xóa price, chỉ còn amount | |
| price từ number thành object {"value":120} | |
| Request mới bắt buộc description mà client cũ không gửi | |
| Thêm response description optional, client bỏ qua field lạ | |
| Thêm response field mới nhưng client strict từ chối field không biết | |

**Trả lời:**
| Thay đổi | Kết luận và lý do của bạn |
|---|---|
| Xóa price, chỉ còn amount |  break | do là đã thay đổi Api Contract thì phải đồng bộ body của client và backend chứ , 
| price từ number thành object {"value":120} |Break | phá vỡ Api Contract
| Request mới bắt buộc description mà client cũ không gửi | break| vì là 
| Thêm response description optional, client bỏ qua field lạ | tương thích ngược chứ k break | vì là không bị phá vỡ Api Contract mà dự án vẫn chạy được 
| Thêm response field mới nhưng client strict từ chối field không biết | Break| phá vỡ Api Contract và Client và Sever 

---

## Câu 6 — Chuyển v1 sang v2 mà không bỏ client cũ (5đ)

Bạn muốn v2 dùng amount thay price. Mobile v1 chưa thể cập nhật ngay.

1. Nêu route/representation cho client cũ và mới trong giai đoạn chuyển. **(2đ)**
2. Có bắt buộc tạo DB riêng hoặc copy toàn bộ nghiệp vụ Service cho v2 không? Có thể tổ chức DTO/mapper thế nào? **(1đ)**
3. Nêu hai việc cần làm trước khi ngừng v1, không chỉ đổi string route rồi xóa. **(1đ)**
4. Chỉ thêm index để API nhanh hơn mà contract không đổi có bắt buộc tạo public v2 không? **(1đ)**

**Trả lời:**
cái cũ thì là api/v1/.. cái mới thì api/v2... do bạn k nói rõ là nghiệp vụ cần gì nên vậy
2 k bắt buộc tạo DB riêng , có thể tái xử dụng code bên service v1 mà sẽ thay đổi các thuộc tính bị thay đổi liên quan , nếu như price bị thanh đổi thành amount và loại tiền thì sẽ có cơ chế mapping tương ứng
3 thứ nhất là đồng bộ Api Contract giữa các client và sever , thứ 2 là phải chắc chắn là k vi phạm APi Contract
3 chỉ thêm index làm API nhanh hơn thì bản chất là nó k thya đổi Api Contract nên là k bắt buộc tạo V2 
---

## Câu 7 — Safe và idempotent không phải cùng một khái niệm (5đ)

Theo thiết kế HTTP đúng nghĩa, điền nhận xét về safe/idempotent cho năm trường hợp. Mỗi dòng **1đ**, có giải thích ngắn; không cần thuộc văn RFC.

| Method/thao tác | Safe? | Có bảo đảm idempotent bởi semantics method không? |
|---|---|---|
| GET detail chỉ đọc Product |safe | vẫ đảm bảo idempotent vì là get nó sẽ k thay đổi reosurce hay gì mà chỉ đọc dữ liệu|
| PUT thay writable fields | không| nó k đảm bảo vì là tuỳ vào method của cái hàm mà put xử dụng , có thể là cộng dồn l....|
| DELETE Product |có | đảm bảo idempotent vì xoá thì xoá chứ sao |
| POST create thông thường chưa có bảo vệ retry | không| k có cơ chế bảo vệ retry thì sẽ dễ bị k kiểm soát được số lượng request cho 1 nghiệp vụ|
| PATCH chưa nêu operation cụ thể | không| ó k đảm bảo vì là tuỳ vào method của cái hàm mà patch xử dụng , có thể là cộng dồn l....||

**Trả lời:**
| Method/thao tác | Safe? | Có bảo đảm idempotent bởi semantics method không? |
|---|---|---|
| GET detail chỉ đọc Product |safe | vẫ đảm bảo idempotent vì là get nó sẽ k thay đổi reosurce hay gì mà chỉ đọc dữ liệu|
| PUT thay writable fields | không| nó k đảm bảo vì là tuỳ vào method của cái hàm mà put xử dụng , có thể là cộng dồn l....|
| DELETE Product |có | đảm bảo idempotent vì xoá thì xoá chứ sao |
| POST create thông thường chưa có bảo vệ retry | không| k có cơ chế bảo vệ retry thì sẽ dễ bị k kiểm soát được số lượng request cho 1 nghiệp vụ|
| PATCH chưa nêu operation cụ thể | không| ó k đảm bảo vì là tuỳ vào method của cái hàm mà patch xử dụng , có thể là cộng dồn l....||

---

## Câu 8 — PUT phải gửi field nào, thiếu thì sao? (5đ)

Contract PUT /api/v1/products/{id} yêu cầu đầy đủ name/price/categoryId. SKU không đổi ở endpoint này; id từ path, createdAt do server quản lý.

Client gửi:

```http
PUT /api/v1/products/10
Content-Type: application/json

{"name":"New Keyboard","categoryId":2}
```

1. Theo policy, request này thiếu gì và nên xử lý thế nào? Có tự coi field thiếu là giữ nguyên như một partial update không? **(2đ)**
2. Có cần client gửi id/createdAt hoặc mọi field của Entity để PUT hợp lệ không? Giải thích writable representation. **(2đ)**
3. Chỉ có @RequestBody đã đủ tự kiểm price hợp lệ và Category tồn tại chưa, hay vẫn cần validation/business rule? **(1đ)**

**Trả lời:**
1 là cần name/price/categoryId, id từ path, createdAt  thì theiesu gì tự điền , k tự coi field thiếu như 1 partial update được mà phải xem thử APi Contract có quy định các field còn thiếu phải được điền đầy đủ hyaf là không , thì nuế như uốn partial update thì nên xài Patch
2 Chỉ cần gửi theo Api Contract là Id và CreatedAt là dược tự mapping rồi , writable represetation là những thứ mà có thể viết đè lên lại 
3 không đủ để kiểm tra price hợp lệ hay là Category Đã tồn tại nhé , vẫn phải cần có cơ chế ở phần service chống các value k hợp lệ hoặc là nghiệp vụ dự án , và trong database thực ra còn 1 lớp để bảo vệ ở database nữa

---

## Câu 9 — Annotation PUT đúng nhưng Service cộng sai (5đ)

Tình huống riêng: PUT /api/v1/products/10/stock công bố body stock là **giá trị stock mới**, không phải số cộng thêm. Stock ban đầu=5; cùng body {"stock":3} được gửi hai lần.

Code hiện tại:

```java
product.setStock(product.getStock() + request.getStock());
```

1. Tính stock sau lần đầu và sau retry. **(2đ)**
2. Có đúng contract replacement/idempotency mong muốn không? Sửa ý nghĩa dòng cập nhật và nêu state cuối đúng. **(2đ)**
3. @PutMapping có tự bảo đảm logic Service idempotent không? **(1đ)**

**Trả lời:**  stock lần đầu sẽ là 8 , stock lần 2 là 11
2 không đúng mong muốn vì vi phạm idempotency là cùng 1 request nhưng lại khác kết quả rồi , product.setStock(request.getStock()); 
3 @PutMapping k đảm bảo được Service idempotent , tuỳ vào code có thay đổi mỗi lần reqeust hay không nữa
```

---

## Câu 10 — DELETE hai lần, status khác nhau (5đ)

Product 10 ban đầu tồn tại. Lần đầu DELETE xóa và trả 204; retry trả 404 theo policy.

1. State resource sau lần đầu và lần hai là gì? Status khác nhau có tự làm mất idempotency không? **(2đ)**
2. Nếu ghi audit hai lần, điều đó có tự phá idempotency của effect xóa không? So với việc mỗi lần retry đều hoàn thêm 120 tiền, rủi ro khác thế nào? **(2đ)**
3. Một API khác chọn trả 204 khi resource đã vắng có thể là policy hợp lý không? Điều gì cần được công bố/nhất quán? **(1đ)**

**Trả lời:**
1 Lần đầu sẽ là 204 thành công , lần 2 là 404 k tìm thấy resource , statú khác nhau k tự làm matas idempotency vì là delete lần 1 và 2 sẽ khác nhma lần 3 4 5 6 7 sẽ giống 2. 
2 , nếu khi audit 2 lần thì cũng k phá idempotency của effect xoá , retry đều hoàn thêm 120 tiền thì cần phải có cơ chế nhận biết cùng 1 request để mà chỉ áp dụng 1 lần
3 không được , phải trả đúng mã lỗi chứ 

---

## Câu 11 — PATCH gán khác PATCH tăng thêm (5đ)

Hai operation riêng do API công bố. Mỗi operation bắt đầu từ name=Old, stock=5:
- PATCH gán name=Keyboard.
- PATCH tăng stock thêm 3.

1. Với từng operation, viết state liên quan sau lần đầu và retry cùng operation. **(2đ)**
2. Operation nào có tác động lặp như một lần trong giả định này, operation nào cộng dồn? Vì sao không kết luận mọi PATCH đều idempotent? **(2đ)**
3. Trước khi cho client PATCH name, vì sao cần phân biệt field vắng và name=null trong contract? Không cần triển khai JSON Patch. **(1đ)**

**Trả lời:**
gán name cho Keyboard sau cả hai lần; tăng stock cho 8 rồi 11. Gán cùng giá trị có effect idempotent ở giả định này, cộng dồn không có; PATCH không tự bảo đảm cho mọi operation. Cần định nghĩa missing/null vì một cái có thể giữ nguyên còn cái kia yêu cầu xóa/gán null hoặc bị từ chối tùy contract.
---

## Câu 12 — POST đã commit nhưng client timeout (5đ)

Request create lần đầu đã INSERT/commit. Response bị mất, client timeout. Tạm bỏ qua unique SKU trong câu này: DB cho phép hai record cùng payload để quan sát retry thông thường.

1. Sau commit, có chắc DB chưa có record chỉ vì client timeout không? **(1đ)**
2. Nếu client retry POST cùng JSON mà server không có bảo vệ, có thể tạo thêm resource không? Cùng JSON có tự có nghĩa cùng một lần tạo không? **(2đ)**
3. Phân biệt điều server đã làm với thông tin client hiện biết; nêu một hướng xác nhận kết quả/thận trọng khi retry, không code hạ tầng. **(2đ)**

**Trả lời:**ecord đã lưu theo dữ kiện commit; timeout chỉ là client chưa nhận kết quả. POST retry không bảo vệ có thể tạo record thứ hai; cùng JSON không tự gộp hai lần gọi thành một create. Phân biệt state đã commit với client chưa biết. Hướng xử lý có thể là xác nhận kết quả qua định danh/trạng thái đã biết, hoặc cơ chế nhận diện retry theo contract; không khẳng định chắc rollback rồi retry tạo mới vô điều kiện.

---

## Câu 13 — Unique SKU giúp gì, không giúp gì? (5đ)

Quay lại policy unique SKU. Lần đầu POST SKU KB-001 đã tạo Product 11 và commit, nhưng client chưa nhận response. Retry cùng SKU gặp conflict.

1. Unique constraint bảo vệ điều gì, theo policy retry có thể nhận status nào? **(2đ)**
2. Nhận 409 có đồng nghĩa server đã tự replay đúng HTTP status/body của create lần đầu không? **(1đ)**
3. SKU unique có thay được cơ chế nhận diện retry cho mọi create/action như tạo order hoặc AI job không? Nêu khác biệt giữa quy tắc dữ liệu duy nhất và nhận diện một ý định gọi. **(2đ)**

**Trả lời:**
1 uniqeu Constraint này giúp cho SKU được là unique , ví dụ như là khi Post và tạo Product và commit rồi nhưng client chưa nhận response thì sẽ Retry lại và nhận ra là Sku unique mà nó đã có trong database rồi thì sẽ conflict và trả về 409 
2 nhận 409 k đồng nghĩa là server đã replau dungds cái create đầu tiên vì óc trường hợp là ban đầu đã bị trùng sẵn rồi 
3 k thay thế được nhận diện retry cho mọi create/action như tạo order hoặc AI job mà nó chỉ là 1 phần trong cơ chế trống trùng thôi thì có nó thì sẽ tốt nhưng mà k phải là tất cả , thì cần phải có cơ chế trống trùng thêm nữa . Quy tắc dữ liệu duy nhất là Unique về phần data còn nhận diện một ý định gọi là trùng nghiệp vụ của user thì sẽ có cơ chế để nhận biết request trùng nhau cùng 1 nghiệp vụ user thì sẽ có idempotency key để làm cơ chế này 

---

## Câu 14 — Nhận diện idempotency key, không triển khai (5đ)

Giả sử API công bố: key gắn với một ý định create trong phạm vi người gọi; retry cùng ý định giữ key. Payload khác với key đã dùng bị từ chối theo policy của API. Không cần biết tên header, Redis hay TTL.

1. Client timeout rồi retry cùng ý định tạo: nên giữ hay đổi key, và để server nhận diện điều gì? **(2đ)**
2. Cùng key nhưng payload khác thì có nên âm thầm coi là request cũ không? **(1đ)**
3. Hai ý định tạo độc lập nhưng JSON giống nhau có bắt buộc dùng chung key không? **(1đ)**
4. Chỉ nói “đã lưu key trong Redis” có đủ chứng minh mọi side effect đúng một lần khi có race/lỗi không? Nêu giới hạn ở mức nhận diện. **(1đ)**

**Trả lời:**
retry cùng ý định giữ key, giúp server nhận ra lần xử lý liên quan. Payload khác với key cũ phải bị phát hiện/từ chối theo policy đã cho. Hai ý định độc lập có thể dùng key khác dù JSON giống. Chỉ lưu Redis chưa chứng minh side effect exactly-once: còn race/failure/ranh giới xử lý phải được thiết kế. . 2 ý định độc lập nhưng jsson giống nhau vẫn tạo Idempodency key riêng vì mục đích nghiệp vụ khác nhau 

---

## Câu 15 — Chữa Controller theo contract, không viết cả project (5đ)

Controller và Service đã inject đúng. ReplaceProductRequest là class có name/price/categoryId. Service.replace thực hiện replacement đúng, input ở câu này hợp lệ.

Contract: PUT /api/v1/products/{id}, id lấy từ path, JSON body bind vào DTO, update thành công trả HTTP 200 + ProductResponse.

Code sai hiện tại:

```java
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService service;

    @PostMapping("/{id}")
    public ResponseEntity<ProductResponse> replace(
            Long id, ReplaceProductRequest request) {
        return ResponseEntity.created(URI.create("/api/v2/products/" + id))
                .body(service.replace(id, request));
    }
}
```

Chỉ rõ hoặc viết code sửa **năm ý, mỗi ý 1đ**: HTTP method mapping; bind id; bind body; response 200; không trả Location v2 không thuộc contract update này. Không yêu cầu xử lý exception/imports.

**Trả lời:**
thiếu @PathVariable , thiếu @RequestBody , theieus @Valid  , create/api/v1/products mới đúng , sửa từ Post thành Put , sửa thành 200 

---

## Câu 16 — “Cùng request” và thời điểm quan sát (5đ)

Product 10 và 11 là hai resource khác nhau. Các field PUT đều hợp lệ. Ban đầu cả hai có name=Old/price=100/categoryId=1.

1. Gửi cùng body Keyboard/120/2 lần lượt tới PUT /products/10 và PUT /products/11 có phải retry cùng một target resource không? Vì sao chỉ cùng JSON chưa đủ? **(2đ)**
2. Gửi hai lần cùng body tới /products/10, không cập nhật xen giữa; state ba field writable cuối là gì? Nếu updatedAt/audit khác, có tự làm effect replacement không idempotent không? **(2đ)**
3. Nếu có người khác cập nhật Product giữa hai lần, tính idempotent có tự giải quyết mọi lost update/concurrency không? Chỉ nhận diện giới hạn, không triển khai locking. **(1đ)**

**Trả lời:**
Không cùng 1 target resource nhé , 1 cái là id là 10 , 1 cía là id 11 . không phải retry cùng 1 targer resource do là nghiệp vụ user khác nhau  , gửi cùng Json là chưa đủ để gì ? tôi chx hiểu ý bạn lắm 
câu 2 
---

Bản đề cũ ngày 2026-10-07 được giữ nguyên. Bản này có đủ policy cho từng tình huống, không cần làm cả hai. Khi chấm lưu snapshot theo tên đề mới; bài giải cùng tên thêm __DAPAN.md, mở sau khi tự làm. Soạn đề không tự sinh điểm hoặc đánh dấu đã làm deliverable.
