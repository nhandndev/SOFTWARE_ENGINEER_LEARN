# M3-1 · Lesson 03 — Kiểm tra luồng lỗi và error contract

> Bản mới 2026-11-21. **12 câu × 5đ =60đ; đạt 51/60 =85%.** Khoảng 60–90 phút, có thể chia hai buổi. Mỗi ý ghi rõ cần trả lời gì. Chấm ý nghĩa, không bắt thuộc imports/tên exception/signature override.

[Bài học tương ứng](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_03_PROBLEMDETAIL_HATEOAS_REVIEW.md). File đáp án cùng tên thêm __DAPAN.md; mở sau khi làm. Không cần code cả project.

## Contract và giả định dùng chung

Đây là **API v2 mẫu để học**, không khẳng định app thật đã được đổi. Success dùng ProductResponse/PageResponse; lỗi dùng ProblemDetail top-level, Content-Type application/problem+json, không bọc ApiResponse.data. Bài chọn có đủ type/title/status/detail/instance và extension code/errorKey/traceId. Instance là URI riêng cho lần lỗi; traceId tương ứng được dùng để tra log trong hệ thống mẫu.

| Case | HTTP/body.status | code số | errorKey |
|---|---:|---:|---|
| Product không có | 404 | 404 | PRODUCT_NOT_FOUND |
| Category không có | 404 | 404 | CATEGORY_NOT_FOUND |
| SKU trùng | 409 | 409 | DUPLICATE_SKU |
| JSON không đọc được | 400 | 400 | INVALID_REQUEST_BODY |
| Param sai | 400 | 400 | INVALID_PARAMETER |
| DTO không đạt validation | 400 | 400 | INVALID_REQUEST |
| Method không hỗ trợ | 405 | 405 | METHOD_NOT_ALLOWED |
| Lỗi nội bộ bất ngờ | 500 | 9999 | UNCATEGORIZED_EXCEPTION |

- Chỉ một Advice chính; không có handler cục bộ cạnh tranh. Mỗi câu độc lập.
- Validation provider đã có; nơi ghi @Valid thì đã áp dụng. Không yêu cầu cài dependency.
- Filter không tự gọi MVC resolver, trừ khi câu nói khác. Không có code catch rồi nuốt AppException.
- Response chưa commit, trừ tình huống nói rõ đã commit.
- Theo đề, header Allow của case 405 là GET. Client chấp nhận media type được trả.
- Không kiểm SecurityConfig, JWT, full HATEOAS, tracing platform hoặc cú pháp của thư viện.

Các từ: **handler** là method xử lý exception; **body** là nội dung response; **extension** là field riêng thêm vào ProblemDetail; **response commit** nghĩa là status/header hoặc nội dung đã được gửi, không còn chắc sửa lại được.

---

## Câu 1 — Đọc năm field, không học thuộc định nghĩa dài (5đ)

Đây chỉ là phần trích năm field chuẩn để đọc ý nghĩa; các extension của response đầy đủ được lược trong câu này.

```json
{
  "type":"urn:shopcore:problem:product-not-found",
  "title":"Product Not Found",
  "status":404,
  "detail":"Product không tồn tại.",
  "instance":"urn:uuid:11111111-1111-4111-8111-111111111111"
}
```

Mỗi ý1đ, chỉ cần một câu:

1. type ở đây nhận diện loại lỗi hay class Java? Hai lần cùng loại lỗi có cần đổi type không?
2. title là tên ngắn của loại lỗi hay nơi đặt stack trace?
3. status trong body cần khớp thông tin nào ở response HTTP?
4. detail dùng để giúp client hiểu lỗi lần này hay để dump toàn bộ thông tin debug?
5. instance nhận diện loại lỗi hay một lần lỗi cụ thể? Có bắt buộc đó là URL Product có thể GET không?

**Trả lời:**

---

## Câu 2 — Hai lỗi cùng404 thì client phân biệt bằng gì? (5đ)

Enum hiện có:

```text
PRODUCT_NOT_FOUND: code404, message="Product Not Found", HTTP404
CATEGORY_NOT_FOUND: code404, message="Category Not Found", HTTP404
```

1. Chỉ nhìn HTTP404 hoặc code404 có biết chắc đang thiếu Product hay Category không? **(1đ)**
2. Theo contract, có thể đọc field ổn định nào để phân biệt hai case? Nêu ví dụ một giá trị. **(1đ)**
3. Vì sao không nên so chuỗi detail/message để quyết định logic client? **(1đ)**
4. Trong code/errorKey/traceId, field nào là extension dự án và có phải cả ba là field chuẩn bắt buộc của RFC không? **(1đ)**
5. Với lỗi nội bộ bất ngờ, điền HTTP status, body.status và code theo bảng. Có lấy 9999 làm HTTP status không? **(1đ)**

**Trả lời:**

---

## Câu 3 — Lỗi xuất hiện ở bước nào, Service đã chạy chưa? (5đ)

Ba request độc lập:

| Case | Dữ kiện đầy đủ |
|---|---|
| JSON hỏng | POST /api/v2/products, body là {"name":"Pen" thiếu dấu đóng } |
| DTO không hợp lệ | JSON {"name":""} đúng cú pháp; Request DTO có @NotBlank name; Controller dùng @Valid @RequestBody |
| SKU trùng | Request đã bind/validate hợp lệ; Service kiểm existsBySku rồi throw AppException(DUPLICATE_SKU) |

1. Với **mỗi dòng**, ghi: lỗi ở bước đọc JSON/validation argument/business Service; Service đã được gọi chưa; HTTP status gì. Mỗi dòng 1đ. **(3đ)**
2. Ở case SKU trùng, sau dòng throw có chạy tiếp đoạn tạo/lưu Product bình thường không? Vì sao? **(1đ)**
3. Advice có phải bước mọi request tự đi qua trước Controller không, hay MVC chọn handler khi resolve exception phù hợp? **(1đ)**

Không cần tên exception chính xác.

**Trả lời:**

---

## Câu 4 — Viết một response lỗi theo dữ kiện, không đoán (5đ)

GET /api/v2/products/999: Service ném PRODUCT_NOT_FOUND. Dùng type=urn:shopcore:problem:product-not-found, title=Product Not Found, detail=Product không tồn tại. ID lần lỗi được cấp là11111111-1111-4111-8111-111111111111.

1. Viết HTTP status. **(1đ)**
2. Viết Content-Type. **(1đ)**
3. Viết body đủ năm field chuẩn với các giá trị đã cho; instance dùng urn:uuid: cộng ID lần lỗi. **(2đ)**
4. Thêm code,errorKey,traceId theo bảng/ID đã cho; body để trực tiếp hay dưới data? **(1đ)**

Được viết JSON hoặc bảng field→giá trị. Không bắt đúng thứ tự field hoặc tự tính UUID.

**Trả lời:**

---

## Câu 5 — Validation response cần gì, không được lộ gì? (5đ)

Request DTO có field name với @NotBlank; client gửi name rỗng. Bind JSON được nhưng validation thất bại trước Controller method. API muốn frontend hiện lỗi ngay ô name. Những thông tin khác đã có đủ để dựng ProblemDetail; không cần viết lại cả body.

1. Nêu HTTP status và errorKey theo contract. **(1đ)**
2. Viết extension errors chứa một phần tử có field="name" và message="Không được để trống." **(1đ)**
3. errors là field chuẩn RFC bắt buộc hay extension do dự án định nghĩa? **(1đ)**
4. Có nên đính kèm toàn bộ requestDTO/rejectedValue nếu có password/token để debug không? Nêu lý do. **(1đ)**
5. Chỉ dùng @RequestBody, bỏ @Valid và không có kiểm tra tương đương, có đủ bảo đảm name@NotBlank tự được enforce ở luồng này không? **(1đ)**

**Trả lời:**

---

## Câu 6 — Sửa method handler, không viết lại toàn project (5đ)

AppException chứa CATEGORY_NOT_FOUND: HTTP404, code404, message an toàn. Type/title/detail/instance dùng mô tả đúng loại/lần lỗi. Đoạn dưới cố ý có năm chỗ cần sửa; chỉ xét các chỗ được hỏi, không yêu cầu đoán code bị lược:

```java
ErrorCode error = ex.getErrorCode();
ProblemDetail body = ProblemDetail.forStatusAndDetail(
        HttpStatus.BAD_REQUEST, error.getMessage());
// type/title/instance đã được set đúng tại đây
body.setProperty("code", error.name());
return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_JSON)
        .body(Map.of("data", body));
```

Sửa bằng lời hoặccode, mỗi ý1đ:

1. Body.status phải lấy từ đâu, là số nào?
2. HTTP status của ResponseEntity phải đổi thế nào?
3. Content-Type phải là gì?
4. code phải lànumber haystring; errorKey cần thêm giá trị gì? **(0,5đ mỗi phần trong ý này)**
5. Body có giữ Map bọc data không? Theo contract phải trả object nào trực tiếp?

Không thêm lỗi mới ngoài năm ý, không yêu cầu imports.

**Trả lời:**

---

## Câu 7 — Không đổi mọi lỗi framework thành500 (5đ)

Endpoint chỉ hỗ trợ GET. Client gửi POST. Framework đã xác định 405 và header Allow:GET. Giả sử handler rộng của team được gọi nhưng lại đổi response thành 500, bỏ header Allow và trả ex.getMessage() thô.

1. Phải giữ HTTP/body.status nào thay vì 500? **(1đ)**
2. Header nào của framework cần giữ, giá trị đã cho là gì? **(1đ)**
3. Đối với case 405 đã biết này, client nên nhận ProblemDetail theo contract hay success DTO/HTTP200? **(1đ)**
4. Đối với **lỗi khác chưa biết thật sự**, 500 còn hợp lý không; có gửi raw exception message/stack trace cho client không? **(1đ)**
5. Team chọn kế thừa ResponseEntityExceptionHandler để tùy biến một lỗi MVC đã được superclass xử lý. Nên dùng protected override phù hợp hay thêm handler trùng tùy tiện? Được tra signature, không cần nhớ cú pháp. **(1đ)**

Không hỏi bài toán thứ tự nhiều Advice; handler bị chọn là giả định đã cho.

**Trả lời:**

---

## Câu 8 — Advice có tự bắt những case ngoài MVC không? (5đ)

Với mỗi tình huống sau, trả lời câu hỏi ngay cạnh nó. Không cần tên class/cấu hình.

1. Filter chạy **trước DispatcherServlet**, tự throw nhưng không gọi MVC resolver. Có tự bảo đảm handler trong @RestControllerAdvice nhận lỗi này không? Cần xử lý ở phạm vi nào? **(1đ)**
2. App đang startup thì không kết nối DB được, chưa sẵn sàng nhận HTTP. Có phải lỗi business của một request để Advice trả404 không? **(1đ)**
3. Response đã gửi status/header và một phầnbody; serializer sau đó lỗi. Có bảo đảm đổi lại response thành ProblemDetail500 mới hoàn chỉnh không? Vì sao? **(1đ)**
4. Authentication/authorization bị từ chối ở Security. Có nên khẳng định chỉ một MVC Advice tự bao phủ cả Security không? Chỉ nhận diện cần cơ chế Security, chưa hỏi code. **(1đ)**
5. Đồng đội kết luận “có @ExceptionHandler(Exception.class) là mọi lỗi toàn server cùng format”. Từ bốn case trên, kết luận đó đủ cơ sở chưa? **(1đ)**

**Trả lời:**

---

## Câu 9 — Lỗi500: thông tin nào ra client, thông tin nào giữ nội bộ? (5đ)

Service gặp NullPointerException bất ngờ. Log server có SQL, stack trace và dữ liệu nhạy cảm, không được công khai. ID lần lỗi là33333333-3333-4333-8333-333333333333.

1. Theo bảng, điền HTTP status, body.status và code. **(1đ)**
2. Viết một detail an toàn, không cần đoán nguyên nhân lỗi. **(1đ)**
3. Stack trace/SQL/secret có đưa vào response JSON không? Nêu cách lưu thông tin điều tra an toàn ở mức ý nghĩa. **(1đ)**
4. Client có thể nhận traceId/instance nào, và server cần làm gì với ID đó để tra được log của cùng lần lỗi? **(1đ)**
5. Chỉ random UUID rồi gắn vào JSON mà không dùng trong log có tự tạo được cơ chế tra cứu đầy đủ không? Vì sao? **(1đ)**

**Trả lời:**

---

## Câu 10 — Đổi format lỗi thì phải xét client cũ (5đ)

Client v1 cũ đang đọc body.code là number và body.message. Team định đổi ngay v1 sang ProblemDetail, bỏ message, đổi code thành tên enum dạng string và bọc dưới data. Contract mẫu trong đề dùng body trực tiếp và code số; success vẫn DTO.

1. Nêu **hai thay đổi có thể làm client v1 cũ hỏng** trong kế hoạch trên. **(1đ)**
2. Giữ AppException/ErrorCode ởService có mâu thuẫn với việc dùng ProblemDetail làm HTTPbody không? Phân biệt vai trò chúng. **(1đ)**
3. Theo contract mẫu, chỉ giữ code số nhưng bỏ message có tự chứng minh client v1 không bị ảnh hưởng không? Vì sao? **(1đ)**
4. Nêu một cách triển khai/chuyển client có kế hoạch thay vì đổi lén schema v1. Không bắt chọn URL versioning duy nhất. **(1đ)**
5. Khi GET Product thành công, có bắt đổi ProductResponse thành ProblemDetail không? Còn response lỗi của bài có bọc ProblemDetail vào ApiResponse.data không? **(1đ)**

**Trả lời:**

---

## Câu 11 — Đọc link: HATEOAS chỉ cần nhận diện (5đ)

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

1. self trỏ đến resource nào?
2. category là relation tới resource nào; href trong nhánh đó là gì?
3. Nếu client hiểu relation category, response đã đưa thông tin nào giúp nó không phải tự ghép mọi URL từ ID?
4. Chỉ có prefix /api/v2 hoặc metadata page/size/total có tự chứng minh response có hypermedia links không? Vì sao?
5. Để làm phần nhận diện này, có bắt cài Spring HATEOAS hoặc cho rằng mọi API phải dùng HAL không?

**Trả lời:**

---

## Câu 12 — Viết kỳ vọng kiểm tra cho một request lỗi (5đ)

Testcase: GET /api/v2/products/999, Product không tồn tại, Service ném PRODUCT_NOT_FOUND, response chưa commit. Dùng contract đầu đề.

Không cần chạy test; viết năm nhóm kỳ vọng, mỗi nhóm 1đ:

1. HTTP status và Content-Type.
2. body.status,code,errorKey.
3. Type có ý nghĩa gì và instance có cần cố định qua mọi lần chạy test không?
4. Body để trực tiếp hay data; có được lộ stack trace/password không?
5. Nếu chỉ assert “body có field status” mà không kiểm HTTP status thật thì đủ chứng minh response không giả lỗi thành200 chưa? Vì sao?

**Trả lời:**

---

Đề chỉ kiểm Lesson03; không thi lại stock/pagination của Lesson01/02. Đề cũ2026-10-07 giữ làm lịch sử. Lưu snapshot từng lần chấm; chưa có điểm hoặc kết luận hoàn thành module chỉ vì đã tạo đề.
