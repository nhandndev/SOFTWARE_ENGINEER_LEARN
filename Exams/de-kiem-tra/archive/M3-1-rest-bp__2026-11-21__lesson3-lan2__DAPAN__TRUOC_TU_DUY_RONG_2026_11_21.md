# Đáp án và rubric — M3-1 Lesson 03, bản 2026-11-21

[Đề](M3-1-rest-bp__2026-11-21__lesson3-lan2.md). **Tổng 60đ, đạt 51đ =85%.** Chưa có bài nộp, không tự chấm điểm.

## Quy tắc

- Mỗi câu 5đ; chỉ chấm điều đã hỏi. Tiêu chí 1đ: đủ1, đúng một phần0,5, sai/trống0. Tiêu chí 0,5đ: đủ0,5, một phần0,25, sai/trống0.
- Không bắt đúng từng chữ, imports, getter hoặc tên exception. Chấp nhận lời/code tương đương. Đọc câu trả lời trong bảng/code hoặc viết gộp.
- Không phạt một lỗi hai lần trong cùng tiêu chí; không có luật sai một câu trượt cả bài. Không thưởng vì nhắc thêm nội dung ngoài đề.
- Điểm=thô/60×100; không làm tròn để vượt ngưỡng. Nộp một phần thì ghi đúng mẫu số, chưa kết luận đạt toàn lesson. Luôn lưu snapshot nhận xét khi chấm.
- Đạt Lesson03 không tự xác nhận deliverable; không sửa lịch sử Lesson01/02.

## Câu 1 — 5đ

1. type nhận diện loại problem, không phải class; cùng loại có thể giữ type:1.
2. title là tên ngắn của loại lỗi, không phải stack trace:1.
3. body.status khớp HTTP status theo contract:1.
4. detail giải thích an toàn/hữu ích về lần lỗi, không dump debug:1.
5. instance là URI của lần lỗi; không bắt là URL Product hoặc GET được:1.

Không bắt học thuộc RFC. RFC không buộc mọi response phải có đủ năm field; bài chọn policy đó.

## Câu 2 — 5đ

1. Chỉ bằng404 chưa phân biệt được Product/Category:1.
2. Dùng errorKey hoặc type đã công bố, ví dụ PRODUCT_NOT_FOUND:1.
3. Message/detail có thể đổi chữ/ngôn ngữ, không ổn định để parse logic:1.
4. Cả code/errorKey/traceId là extension dự án, không phải field chuẩn bắt buộc:1.
5. HTTP500/body.status500/code9999; không HTTP9999:1. Đúng một phần các giá trị:0,5.

## Câu 3 — 5đ

| Case | Bước lỗi / Service / status | Điểm |
|---|---|---:|
| JSON hỏng | Đọc/bind body; Service chưa chạy;400 | 1 |
| DTO blank | Bind được, validation argument không đạt; Service chưa chạy;400 | 1 |
| SKU trùng | Service đã chạy và ném AppException;409 | 1 |

Mỗi dòng đủ ba thông tin nhận1, đúng một phần nhận0,5. Hai ý tiếp:
- Throw ngắt luồng nên không tạo/lưu tiếp bình thường:1.
- Advice không phải trạm mọi request đi qua; MVC chọn handler khi resolve exception phù hợp:1.

## Câu 4 — 5đ

1. HTTP404:1.
2. application/problem+json:1.
3. Năm field chuẩn:2, chia type/title0,5; status4040,5; detail an toàn0,5; instance urn:uuid đúng ID0,5.
4. code404/errorKey PRODUCT_NOT_FOUND:0,5; traceId đúng ID và body trực tiếp:0,5.

```json
{
  "type":"urn:shopcore:problem:product-not-found",
  "title":"Product Not Found",
  "status":404,
  "detail":"Product không tồn tại.",
  "instance":"urn:uuid:11111111-1111-4111-8111-111111111111",
  "code":404,
  "errorKey":"PRODUCT_NOT_FOUND",
  "traceId":"11111111-1111-4111-8111-111111111111"
}
```

Chấp nhận bảng field/giá trị, không trừ thứ tự JSON.

## Câu 5 — 5đ

1. 400/INVALID_REQUEST:1, chia0,5 mỗi giá trị.
2. errors có một phần tử field=name, message=Không được để trống:1; nhận JSON hoặc mô tả tương đương.
3. errors là extension dự án:1.
4. Không dump DTO/rejectedValue chứa password/token vì lộ dữ liệu:1.
5. Chỉ @RequestBody không đủ chạy constraint ở luồng này, cần @Valid/kiểm tương đương:1.

## Câu 6 — 5đ

1. Dùng error.getHttpStatus() cho body.status404:1.
2. ResponseEntity.status(error.getHttpStatus()), HTTP404 thay200:1.
3. MediaType.APPLICATION_PROBLEM_JSON:1.
4. code=error.getCode() số404:0,5; errorKey=error.name() CATEGORY_NOT_FOUND:0,5.
5. Bỏ Map data, trả ProblemDetail trực tiếp:1.

```java
ProblemDetail body = ProblemDetail.forStatusAndDetail(
        error.getHttpStatus(), error.getMessage());
// Điền type/title/instance như giả định đề.
body.setProperty("code", error.getCode());
body.setProperty("errorKey", error.name());
return ResponseEntity.status(error.getHttpStatus())
        .contentType(MediaType.APPLICATION_PROBLEM_JSON)
        .body(body);
```

Không bắt sửa những field đã cho là đúng hoặc thêm @Valid/thay Service.

## Câu 7 — 5đ

1. Giữ HTTP/body.status405:1.
2. Giữ Allow:GET theo dữ kiện:1.
3. ProblemDetail lỗi đúng contract, không200 success:1.
4. Lỗi thật chưa biết có thể500; detail an toàn, không raw message/stack trace:1.
5. Dùng protected override phù hợp, không handler trùng tùy tiện:1. Được tra signature là hướng dẫn, không phải ý bổ sung phải nhắc lại mới có điểm.

Không hỏi thứ tự nhiều Advice, không nói method đặt trên file thì được chọn trước.

## Câu 8 — 5đ

1. Filter trước DispatcherServlet không tự được MVC Advice bắt; cần filter/container hoặc tích hợp tường minh:1.
2. Startup fail không phải request business để Advice trả404; app chưa ready:1.
3. Không bảo đảm đổi lại vì response đã commit:1.
4. Security có cơ chế riêng, không tự bao phủ bằng MVC Advice:1.
5. Catch-all Exception không chứng minh mọi lỗi toàn server cùng format:1.

Chỉ kết luận đúng nhưng thiếu lý do/phạm vi ở một ý nhận0,5; không đòi code Security.

## Câu 9 — 5đ

1. HTTP500/body500/code9999:1.
2. Detail an toàn, ví dụ “Không xử lý được yêu cầu lúc này.”:1.
3. Không gửi stack trace/SQL/secret; log nội bộ được bảo vệ, không log secret thô:1.
4. traceId đã cho hoặc instance urn:uuid cùngID, gắn vào log cùng lần lỗi để tương quan:1.
5. Random ID vào JSON chưa đủ vì chưa liên kết với log để tra cứu:1.

Không đòi OpenTelemetry hoặc distributed tracing implementation.

## Câu 10 — 5đ

1. Hai ý có thể chọn: bỏ message, code số→string, đổi vị trí field dưới data. Mỗi ý0,5, tổng1.
2. Không mâu thuẫn: exception/enum chứa sự cố và metadata business; handler chuyển thành ProblemDetail HTTP body:1.
3. Giữ code số chưa đủ vì client vẫn đọc message/shape đã đổi:1.
4. Kế hoạch chuyển client/công bố contract mới/giữ v1 và v2 trong giai đoạn chuyển, hoặc cách tương đương rõ ràng:1.
5. Success giữ DTO; lỗi ProblemDetail trực tiếp, không bắt đổi success hoặc bọc data:1.

Không coi ProblemDetail tự bảo đảm backward compatibility.

## Câu 11 — 5đ

1. self đến Product10:1.
2. category đến Category2, href=/api/v2/categories/2:1.
3. Relation+link cung cấp địa chỉ để client theo, giảm tự ghép URL:1.
4. Prefix version/page metadata không tự là hypermedia links:1.
5. Không bắt cài Spring HATEOAS, không phải mọi API dùng HAL; phạm vi nhận diện:1.

Không đòi chứng minh toàn bộ API đã tuân mọi nguyên tắc HATEOAS chỉ từ mẫu JSON.

## Câu 12 — 5đ

1. HTTP404 và application/problem+json:1.
2. body.status404/code404/errorKey PRODUCT_NOT_FOUND:1.
3. type nhận diện product-not-found; instance có thể đổi mỗi lần, không assert UUID cố định:1.
4. Body trực tiếp, không data, không stack trace/password:1.
5. Chỉ assert có field status chưa đủ; cần assert HTTP status để tránh thực tế200 nhưng body báo404:1.

Nhận checklist, bảng, pseudocode; không cần JUnit.

## Độ phủ bài học → đề

| Mục bài học | Câu kiểm |
|---|---|
| 1–4: vai trò, fields, code/type/instance | 1,2,4,6,10 |
| 5–6: luồng và điểm dừng | 3,5 |
| 7: handler/business/override | 6,7 |
| 8: validation extension | 5 |
| 9: status/header/500 an toàn | 7,9,12 |
| 10: giới hạn Advice | 8 |
| 11: HATEOAS nhận diện | 11 |
| 12: testcase cụ thể | 12 |

Không thêm Security/tracing/capstone vào tiêu chí. Lưu nhận xét theo [quy tắc dự án](../../03_PROMPT_CHAM_DE.md).
