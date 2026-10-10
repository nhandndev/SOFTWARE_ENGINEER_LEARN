# M3-1 REST best practices — Kiểm tra Lesson03

> LESSON: 8×5=40đ; normalize/40×100; đạt từ34/40. Chấm tư duy nhưng đủ vế mới đủ điểm; không cần signature override/imports. Tình huống độc lập, không cần chạy app. Bài giải riêng __DAPAN.md.

## Dữ kiện

API công bố lỗi top-level ProblemDetail, HTTP status khớp body.status, media type application/problem+json; extension code ổn định dạng string. AppException giữ ErrorCode cho business error. Spring MVC có Advice tương ứng, chưa triển khai Security. Validation body có thể thêm errors field/message nhưng không rejected secret.

## Câu 1 (5đ) — Đọc error body

```json
{
  "type":"urn:shopcore:problem:product-not-found",
  "title":"Product not found",
  "status":404,
  "detail":"Product không tồn tại.",
  "instance":"/api/v1/products/999",
  "code":"PRODUCT_NOT_FOUND"
}
```

Nói ý nghĩa năm field chuẩn và code. Code có phải field chuẩn bắt buộc RFC không? Đây có phải DTO success cho Product không?

**Trả lời:**

## Câu 2 (5đ) — Lỗi trước Service

Controller nhận int page và @Valid CreateProductRequest từ JSON. Tình huống A page=abc; B JSON thiếu dấu đóng; C JSON bind được nhưng name trống vi phạm constraint. Mỗi lỗi xuất hiện ở bước nào, Service có chạy không, status nào theo convention? Ai chuyển exception thành error response trong phạm vi MVC?

**Trả lời:**

## Câu 3 (5đ) — Business exception ra HTTP

DTO hợp lệ, Service phát hiện SKU trùng và ném AppException(DUPLICATE_SKU), enum có status409. Mô tả exception bubble tới đâu, handler lấy gì để dựng ProblemDetail, HTTP status/media type/code gì. Có cần đổi AppException thành ProblemDetail trong Service không?

**Trả lời:**

## Câu 4 (5đ) — Code lỗi không phải text message

Enum cũ có PRODUCT_NOT_FOUND.code=404 và CATEGORY_NOT_FOUND.code=404. Vì sao HTTP404/code số404 không đủ phân biệt hai business case? Đề xuất stable identifier và cách dùng message. Có được đổi code số thành string âm thầm trong v1 đã có client không?

**Trả lời:**

## Câu 5 (5đ) — Chỉ đổi business handler đã đủ?

AppException handler trả ProblemDetail, invalid JSON và validation handler vẫn trả ApiErrorResponse code/message. Đã thống nhất toàn MVC API chưa? Đề xuất hướng chuẩn hóa framework errors; khi sai method framework trả405 + Allow, vì sao catch-all đổi thành500 là vấn đề? Không yêu cầu viết superclass override.

**Trả lời:**

## Câu 6 (5đ) — Giới hạn Advice

Ba tình huống: (a) filter ném exception trước DispatcherServlet; (b) DB password sai lúc startup; (c) AppException bubble từ Service qua Controller trong MVC. Cái nào thuộc handler MVC đang xét, cái nào không tự được Advice bắt? Nếu response đã commit rồi serialize lỗi thì có luôn viết lại ProblemDetail được không?

**Trả lời:**

## Câu 7 (5đ) — HATEOAS nhận diện

```json
{
  "id":10,
  "name":"Keyboard",
  "_links":{
    "self":{"href":"/api/v1/products/10"},
    "category":{"href":"/api/v1/categories/2"}
  }
}
```

Self/category có nghĩa gì với client? Vì sao ví dụ có tính hypermedia, khác chỉ đặt URL version /api/v1? Roadmap này có bắt cài Spring HATEOAS và triển khai full HAL không?

**Trả lời:**

## Câu 8 (5đ) — Review handler nguy hiểm

Trong nhánh lỗi bất ngờ không thuộc các MVC/business handler cụ thể, code rút gọn:

```java
@ExceptionHandler(Exception.class)
ResponseEntity<ProblemDetail> unknown(Exception ex) {
    ProblemDetail body = ProblemDetail.forStatusAndDetail(
            HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    body.setProperty("stack", ex.getStackTrace());
    return ResponseEntity.ok(body);
}
```

Chỉ rõ lỗi status và rò thông tin; sửa ý tưởng response và nơi lưu chi tiết debug. Nêu hai request lỗi cụ thể và response kỳ vọng để kiểm format/status, trong đó có một lỗi trước Controller và một business error. Không cần JUnit.

**Trả lời:**
