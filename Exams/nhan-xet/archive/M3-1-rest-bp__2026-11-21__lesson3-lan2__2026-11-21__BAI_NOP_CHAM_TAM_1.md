# M3-1 · Lesson 03 — Hiểu luồng lỗi và ra quyết định đúng

> Bản điều chỉnh 2026-11-21 theo hướng **hiểu rộng, nắm bản chất, đào sâu đúng chỗ quan trọng** để làm nền AI Engineering. `TU_DUY_RONG`: **8 câu ×5đ =40đ, đạt34/40 =85%**. Khoảng30–45 phút. Không phải nới điểm cho qua hoặc bỏ nền Software.

[Bài học giữ nguyên](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_03_PROBLEMDETAIL_HATEOAS_REVIEW.md). Đáp án/rubric cùng tên thêm __DAPAN.md. Con số12câu/60đ ở cuối bài học thuộc bản đề trước; **bản hiện hành này chấm trên40đ**.

## Bạn cần trả lời theo cách nào?

- Mỗi ý trả lời1–3câu bằng lời của bạn; quan trọng là đúng lý do và quyết định. Không cần viết code project.
- Không bắt thuộc tên exception, signature override, UUID hoặc dựng đủ từng field của ProblemDetail. Nếu quên tên field nhưng mô tả đúng vai trò, vẫn được nhận theo rubric.
- Vẫn kiểm các điểm không được hiểu sai: lỗi dừng ở đâu, status thật, không lộ dữ liệu, không phá client, và giới hạn Advice.
- Không hỏi kiến thức AI/ML mới. Khi nói “API cho AI sau này”, nguyên tắc dữ liệu/bảo mật vẫn áp dụng; không cần biết ML để làm đề.

## Quy ước để không phải đoán

- API mẫu: /api/v2/products. Success trả ProductResponse/PageResponse; lỗi chọn ProblemDetail **trực tiếp** với Content-Type application/problem+json, không bọc dưới data.
- Trong bài, HTTP status phải khớp body.status. errorKey là mã loại lỗi ổn định do dự án định nghĩa; detail là lời giải thích cho người đọc. Không cần học thuộc mọi field RFC.
- Có AppException + ErrorCode cho business error; một Advice chính; không handler cục bộ cạnh tranh. Exception không bị catch rồi nuốt.
- JSON/param sai hoặc DTO không đạt validation →400; Product không có→404; SKU trùng→409; sai method→405; lỗi nội bộ bất ngờ→500.
- Nơi ghi validation thì provider và @Valid đã được cấu hình. Filter không tự chuyển lỗi vào MVC resolver. Response chưa gửi ra, trừ câu nói rõ đã gửi.

---

## Câu 1 — Ai làm việc gì khi Service ném lỗi? (5đ)

Client GET /api/v2/products/999. Product999 không có; Service thực hiện:

```java
throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
```

Mỗi ý1đ:

1. Trong tình huống này, AppException thông báo điều gì? Nó có phải JSON đã gửi cho client chưa?
2. Handler được khai báo trong Advice làm gì để biến lỗi trên thành HTTP response? Có phải mọi request đều chạy qua handler này trước Controller không?
3. ProblemDetail là **object mô tả lỗi** hay chính nó là cơ chế tự bắt mọi exception?
4. Muốn dùng ProblemDetail có bắt bỏ ErrorCode và đổi hết business logic không? Giải thích cách hai phần có thể cùng tồn tại.
5. Sau dòng throw trên, Service có tiếp tục return ProductResponse thành công bình thường không? Vì sao?

**Trả lời:** 1 tình huống này App Exception thông báo là quăng cái lỗi AppException là ErrorCode.PRODUCT_NOT_FOUND để cho có 1 cái class khác có Annonation là @RestControllerAdvice có cái chuyên xử lý lỗi AppEXception này sẽ xử lý và sẽ có các xử lý thành JSOn rguiwr cho Client
2 là sẽ dựa vào loại lỗi gì mà sẽ có các method xử lý đúng phần của nó , mọi request tuỳ loại lỗi mà sẽ được bắt lỗi từ phần Tạo DTO , valid DTO , rồi bussiness vi phạm r đồ
3 là Object mô tả lỗi theo quy chuẩn quốc tế là RTL j j đó tôi quên rồi
4 cái này là optional , nếu như là Api Contract nó quy định như cũ mà ta tự ý đổi thành ProblemDetail thfi sẽ gọi là break , nên là đề xuất tạo version mới r đồng bộ từ từ 
5 Không tiếp tục return nữa mà trả về lỗi là ngừng luồn tiếp tục nghiệp vụ happy path cuản ó rồi 

---

## Câu 2 — Năm lỗi thường gặp: xảy ra ở đâu? (5đ)

Mỗi dòng là request độc lập. Với mỗi dòng, ghi **lỗi ở bước nào, Service đã chạy chưa và status nào**. Mỗi dòng1đ; không cần tên exception chính xác.

| Dữ kiện | Bước lỗi / Service đã chạy? / status |
|---|---|
| POST có JSON bị thiếu dấu đóng, không đọc thành DTO được | lỗi là SpringMVC cố đọc Json nhưng k đọc được thì lỗi /400|
| GET có page=abc; Controller khai báo page làint | lỗi là Spring MVC đọc được json rồi xong nó k có biến thành DTO được do là sai dữ liệu /400|
| JSON đúng; name rỗng; @Valid kiểm @NotBlank trước khi gọi Controller method Spring MVC đọc được json rồi biến thành DTO rồi sau đó là Valid cái DTO đó thì gặp lỗi thì sẽ vứt lỗi /400| |
| Request hợp lệ; Service kiểm thấy SKU đã có rồi ném AppException(DUPLICATE_SKU) |Cái này lỗi ửo phần Bussiness rồi , đến phần service sau đó check dưới repository rồi quăng lỗi ra , lỗi 409 conflict  |
| Endpoint chỉ hỗ trợ GET; client gửi POST nên MVC không chọn được handler method cho POST | cía này là lỗi từ khúc Dispatcher k tì được method phù hơp / lỗi 400 chắc vậy |

**Trả lời:**

| Dữ kiện | Bước lỗi / Service đã chạy? / status |
|---|---|
| POST có JSON bị thiếu dấu đóng, không đọc thành DTO được | lỗi là SpringMVC cố đọc Json nhưng k đọc được thì lỗi /400|
| GET có page=abc; Controller khai báo page làint | lỗi là Spring MVC đọc được json rồi xong nó k có biến thành DTO được do là sai dữ liệu /400|
| JSON đúng; name rỗng; @Valid kiểm @NotBlank trước khi gọi Controller method Spring MVC đọc được json rồi biến thành DTO rồi sau đó là Valid cái DTO đó thì gặp lỗi thì sẽ vứt lỗi /400| |
| Request hợp lệ; Service kiểm thấy SKU đã có rồi ném AppException(DUPLICATE_SKU) |Cái này lỗi ửo phần Bussiness rồi , đến phần service sau đó check dưới repository rồi quăng lỗi ra , lỗi 409 conflict  |
| Endpoint chỉ hỗ trợ GET; client gửi POST nên MVC không chọn được handler method cho POST | cía này là lỗi từ khúc Dispatcher k tì được method phù hơp / lỗi 400 chắc vậy |

---

## Câu 3 — Body nói lỗi, HTTP lại nói thành công (5đ)

Product999 không có. API muốn trả lỗi theo contract nhưng hiện gửi:

```http
HTTP/1.1 200 OK
Content-Type: application/problem+json

{
  "type":"urn:shopcore:problem:product-not-found",
  "title":"Product Not Found",
  "status":404,
  "detail":"Product không tồn tại.",
  "errorKey":"PRODUCT_NOT_FOUND"
}
```

Body minh họa chỉ cần các field đang xét; **không yêu cầu thêm instance/traceId hay dựng lại toàn JSON**.

1. Chỗ nào cần sửa ở tầng HTTP, và vì sao chỉ ghi status404 trong JSON chưa đủ? **(2đ)**
2. Success vẫn trả ProductResponse, lỗi trả ProblemDetail: cách tách hai loại body này có hợp lý không? Nêu vai trò mỗi loại. **(1đ)**
3. Client nên phân nhánh xử lý bằng errorKey ổn định hay so nguyên câu tiếng Việt trong detail? Vì sao? **(1đ)**
4. Theo contract đã cho, có cần bọc body lỗi này vào ApiResponse.data không? Có phải mọi API trên đời đều bị cấm chọn envelope riêng không? **(1đ)**

**Trả lời:**
1 HTTP/1.1 200 OK mã thành là 404 mới đúng vì đâu tìm thấy resource , Status 404 trong json chưa đủ mà phải trả về thêm ProblemDetail vì cần phải mang đủ thông tin lỗi  "type":"urn:shopcore:problem:product-not-found",
  "title":"Product Not Found",
  "status":404,
  "detail":"Product không tồn tại.",
  "errorKey":"PRODUCT_NOT_FOUND" để cung cấp đủ khi mà cần biết lỗi ở đâu r đồ thì 404 thfi sẽ k biết được resource nào lỗi , lỗi ở chỗ nào r đồ)
  2 Hợp lý vì phải chia ra các loại response cho các mục đích khác nhau , thành công thì nên trả về response tương ứng , lỗi thì nên trả vẻessponse riêng là ProblemDetail thì cung cấp đủ metadata phù hợp hơn , vai trò thì Response thành công sẽ mang các field để mà Client show ra ngoài Ui , còn Lôi thì sẽ để cho người dev họ nhìn và họ biết dc lỗi ở đâu dễ fix hơn 
  3 Client nên phân nhanh xử lý bằng ErrorKey ổn định đã được định nghĩa Trong Api Contract chứ , còn so nguyên câu tiếng việt trong detail thì chỉ là cung cấp thêm thông tin thôi 
  4  Theo contract không bọc data; API khác có thể chọn envelope riêng nhưng không tự giống contract này
---

## Câu 4 — Chỉ sửa business handler đã đủ thống nhất lỗi chưa? (5đ)

Team chỉ đổi handler AppException sang ProblemDetail. JSON hỏng vẫn trả format cũ code/message, lỗi validation lại trả cấu trúc khác. Các lỗi đều được trả về nhưng frontend phải đoán cách đọc tùy trường hợp.

1. Vì sao chỉ sửa AppException chưa đủ để nói “error contract đã thống nhất”? Nêu hai nhóm lỗi ngoài business cần xét từ dữ kiện. **(2đ)**
2. Có bắt biến JSON hỏng và validation thành business AppException mới thống nhất được format không, hay có thể giữ các cơ chế xử lý riêng rồi cùng tạo format đã công bố? **(1đ)**
3. Muốn frontend hiện “name không được để trống” ngay ôname, body nên có thông tin về lỗi field nào? Chỉ mô tả, không cần nhớ cú pháp extension. **(1đ)**
4. Để kiểm tra việc thống nhất, nêu hai request lỗi đại diện và cách kiểm body của chúng có cùng quy ước. Không cần viết JUnit. **(1đ)**

**Trả lời:**

---

## Câu 5 — Lỗi nội bộ: cho client biết gì là đủ? (5đ)

Service gặp lỗi lập trình bất ngờ. Chi tiết kỹ thuật có thể chứa SQL, stack trace, token hoặc dữ liệu nhạy cảm. Client chỉ cần biết request thất bại và có cách báo lỗi để bạn điều tra.

Mỗi ý1đ:

1. Đây phù hợp với HTTP500 hay giả thành200 hoặc404? Giải thích ngắn.
2. Viết một câu thông báo an toàn cho client, không đoán nguyên nhân kỹ thuật.
3. Có gửi toàn bộ exception/requestDTO chứa token cho client không? Vì sao?
4. Thông tin điều tra nên lưu ở đâu, cần lưu ý gì về quyền truy cập và secret?
5. Nếu trả một mã lần lỗi cho client, server cần liên kết mã đó với gì để bạn tra được đúng sự cố? Không cần biết công cụ distributed tracing.

**Trả lời:**
lỗi bất ngờ và k nên tiết lộ chi tiết kỹ thuật thì nên trả về lỗi 500 là lỗi ở phía sever
2 Lỗi bất xác định
3 không nên gửi vì đó là thông tin mật mà hacker có thể khai thác được 
4 Thông tin điều tra nên được lưu nội bộ trong sever mà k được trả về client
5 có cái instant mã đinh danh lỗi trong problem detail .

---

## Câu 6 — Một Advice có bao phủ toàn server không? (5đ)

Mỗi ý1đ. Chỉ nhận diện giới hạn, không yêu cầu cấu hình framework:

1. Filter tự ném lỗi trước DispatcherServlet, không gọi MVC resolver. Có tự bảo đảm MVC Advice bắt lỗi này không? Nếu không, cần xét xử lý ở phạm vi nào?
2. App không kết nối được DB lúc startup, chưa sẵn sàng nhận HTTP. Có phải lỗi business của một request để Advice trả404 không?
3. Status/header và một phần body đã gửi; sau đó serializer/network lỗi. Có bảo đảm thay lại thành một ProblemDetail500 hoàn chỉnh không? Vì sao?
4. Security từ chối authentication/authorization. Có thể chỉ nhìn một MVC Advice rồi kết luận lỗi Security cũng được bao phủ chưa? Chỉ cần nhận diện có cơ chế Security riêng, không viết code.
5. Từ các trường hợp trên, câu “thêm catch-all Exception là mọi lỗi server có cùng format” có đủ cơ sở không?

**Trả lời:**
1 là chưa tới được cái tầng Controller thì filter chain sẽ xử lý ở phần đó vì là chưa tới tầng mà RestControllerAdvice nên là k có catch được 
2 k phải là lỗi của Busssiness mà đây là lỗi của server , lỗi tự phát từ sever 
3 
4
5
---

## Câu 7 — Thay format lỗi mà không làm hỏng client cũ (5đ)

Client v1 đang đọc body.code dạng number và body.message. Team muốn chuyển sang ProblemDetail, bỏ message, dùng detail và đổi vị trí field. Cả hai bên chưa được nâng cấp đồng thời.

1. Nêu một cách client cũ có thể hỏng nếu server đổi ngay v1 dù backend vẫn compile. **(1đ)**
2. Nêu cách chuyển có kế hoạch để client có thời gian thích nghi. Không bắt chọn URL versioning duy nhất, nhưng cần nói rõ giữ tương thích/chuyển client thế nào. **(2đ)**
3. Đổi format lỗi có bắt thay ProductResponse/PageResponse ở luồng thành công thành ProblemDetail không? Vì sao? **(1đ)**
4. “Thống nhất format lỗi” có nghĩa mọi lỗi đều phải dùng cùng HTTP status500 không? Giải thích bằng một ví dụ400/404/409 đã học. **(1đ)**

**Trả lời:**
1 là cái nó cần là message mà ProblemDetail có field khác thì sẽ vi phmaj API Contract thì có thể hỏng nếu sever đổi ngay v1 dù backend vẫn complie
2 nếu như lâu dài thì sẽ tạo ra v2 và từ từ mapping lại theo các field problem Detail mới
3 
4
---

## Câu 8 — Nhận diện HATEOAS, không cần học thư viện (5đ)

```json
{
  "id":10,
  "name":"Keyboard",
  "_links":{
    "self":{"href":"/api/v2/products/10"},
    "category":{"href":"/api/v2/categories/2"}
  }
}
```

Mỗi ý1đ:

1. self dẫn tới resource nào?
2. category dẫn tới resource nào?
3. Nếu client hiểu relation category, link giúp gì so với tự ghép mọi URL từ ID?
4. Chỉ có prefix /api/v2 hoặc page/size/total thì đã đủ để nói response có hypermedia links như trên chưa? Vì sao?
5. Để hiểu ý nghĩa mẫu này, có bắt code bằng Spring HATEOAS hoặc áp HAL cho mọi API không?

**Trả lời:**
1 là dẫn đến cái product , id là 10  
2 là dẫn tới category của product đó là id là 2. 
3 thì nó sẽ thay đổi dựa vào state , trạng thái thanh toán nó sẽ có các links khác nhau thì có thể mapping qua thay vì phgair hardcode như đầu
4 chưa vì nếu có Chỉ có prefix /api/v2 hoặc page/size/total thì đâu có cung cấp được _links rồi các hypermedia link r đồ đâu 
5 k bắt buộc code mà óc thể dùng nhiều thứ để mà làm được mục đích tương tự 
---

**Phạm vi hoàn thành:** kiểm tư duy Lesson03 trên40đ; không suy ra đã chạy app hoặc hoàn thành deliverable. Đề trước12câu/60đ được lưu trong archive; không bắt làm cả hai. Khi chấm lưu snapshot, phân biệt thiếu hiểu biết cốt lõi với chi tiết có thể tra cứu.
