# M3-1 — Bài giải Lesson01

40đ; normalize/40×100. Áp dụng [quy tắc chấm nghiêm](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/QUY_TAC_CHAM.md). Phần giải minh họa rubric, không tạo yêu cầu ngầm. Đây chưa phải điểm người học.

| Câu | Rubric5đ |
|---|---|
| 1 | GET /api/v1/products (1); GET /api/v1/products/10 (1); API contract version (1); không phải DB/Java version (1); client dễ dự đoán hợp đồng (1). |
| 2 | Breaking vì client mất price (2); giữ v1/price và cung cấp v2/amount cùng kế hoạch chuyển client (2); thêm optional thường tương thích với client giả định, không nhất thiết v2 (1). |
| 3 | HTTP201 (1); Location /api/v1/products/11 (1); ProductResponse id/dữ liệu public (1); body.status không thay HTTP status (2). |
| 4 | 8 rồi11 (1); sai replacement (1); gán stock=request.stock, lặp vẫn3 (2); annotation không bảo đảm logic (1). |
| 5 | Vẫn idempotent về effect (2); state cuối không có Product10 (1); status khác không quyết định idempotency (1); policy204 khi đã vắng cũng được nếu thống nhất (1). |
| 6 | Timeout không chứng minh chưa commit (1); retry có thể tạo trùng (1); UNIQUE chặn SKU trùng nhưng không replay response (2); nhận diện idempotency key/tra cứu kết quả tương đương (1). |
| 7 | GET không nên đổi state nghiệp vụ (1); PUT/DELETE không safe (1); PATCH gán có thể lặp an toàn (1); cộng dồn khác effect (1); PATCH không tự bảo đảm idempotent (1). |
| 8 | PutMapping (1); PathVariable id (1); RequestBody DTO (1); 200 + body, không created Locationv2 (1); representation writable không phải mọi field DB (1). |

## Câu 1 — Đặt tên theo resource

**Đáp án đủ:** GET `/api/v1/products` cho list, GET `/api/v1/products/10` cho detail. v1 là version public API contract, không là Flyway V1 hay Java21. Client dùng pattern chung để biết URL/input/output thay vì nhớ tên Java method từng nơi.

**Lý do/chấm nghiêm:** Đổi `/getProduct` thành `/getProductV1` vẫn chưa theo convention đề. Đúng route nhưng nhầm version không được điểm version. Không bắt nói danh từ số nhiều là luật bắt buộc HTTP.

**Đọc lại:** L01 mục1–2.

## Câu 2 — Xét từ code client thật

**Đáp án đủ:** Xóa price làm client đọc field không còn nên breaking. Giữ response v1 có price; có thể thêm route v2 với amount, dùng DTO/mapper phù hợp, chuyển client có lộ trình trước khi ngừng v1. Với client đề đã nói bỏ qua field lạ, thêm description optional thường không làm vỡ nên không nhất thiết v2.

**Lý do/chấm nghiêm:** “Backend vẫn compile” không chứng minh client tương thích. “Đổi v2 rồi xóa v1 ngay” thiếu cách giữ client cũ. Không mở rộng nhận định thêm field an toàn cho mọi client strict.

**Đọc lại:** L01 mục3–4.

## Câu 3 — Status thật ở status line

**Đáp án đủ:** HTTP201 Created, Location `/api/v1/products/11`, body ProductResponse có id11 và các field public theo contract. HTTP200 vẫn là200 đối với client/proxy/monitoring, dù body có field status201; JSON không thay status line.

**Lý do/chấm nghiêm:** Nêu201 chỉ trong JSON không nhận điểm HTTP201. Location routev2 không khớp requestv1. Không bắt kể tất cả field nếu đã mô tả DTO đúng.

**Đọc lại:** L01 mục1–2; status/body cũng được nối lại ở L03.

## Câu 4 — Annotation không sửa cộng dồn

**Đáp án đủ:** Lần1 stock8, lần2 stock11. Sai contract thay stock bằng3. Cần gán `product.setStock(request.getStock())`; cùng request lặp giữ stock3 theo giả định. PutMapping chỉ route method, không biến logic cộng dồn thành replacement/idempotent.

**Lý do/chấm nghiêm:** “PUT nên tự idempotent” không giải thích code sai. Sửa thành POST không thực hiện contract PUT đề yêu cầu, nên không nhận điểm sửa replacement.

**Đọc lại:** L01 mục5–6.

## Câu 5 — DELETE response có thể khác

**Đáp án đủ:** Vẫn idempotent: intended effect là Product10 không còn, sau lần1/lần2 state đó như nhau. Status204 rồi404 không làm effect khác. Policy luôn204 khi resource đã vắng cũng có thể dùng nếu công bố nhất quán.

**Lý do/chấm nghiêm:** Nhầm idempotent với identical response mất tiêu chí chính. Chưa yêu cầu triển khai policy khác hoặc hoàn tiền/xử lý side effect ngoài dữ kiện.

**Đọc lại:** L01 mục5/7.

## Câu 6 — Mất response không mất commit

**Đáp án đủ:** Server đã có thể tạo resource và commit dù client timeout. Retry POST không có bảo vệ có thể tạo thêm. Unique SKU chặn trùng SKU bằng constraint/conflict, nhưng không tự biết đó là cùng retry và replay response thành công ban đầu. Nhận diện idempotency key là hướng lưu/nhận biết cùng thao tác, hoặc tra cứu kết quả theo định danh để quyết định retry; cần contract rõ chứ không mù quáng gửi lại.

**Lý do/chấm nghiêm:** “Timeout tự rollback” sai. Chỉ nhắc idempotency key không thay điểm giải thích commit/UNIQUE. Không bắt code store key, TTL hay Redis.

**Đọc lại:** L01 mục8.

## Câu 7 — Safe khác idempotent

**Đáp án đủ:** GET nên đọc, không thực hiện đổi giá nghiệp vụ. PUT/DELETE có tác động state nên không safe, dù designed idempotent. PATCH gán name cùng giá trị có thể idempotent; tăng stock3 lặp lại tăng6 nên không cùng effect một lần. PATCH tự nó không cam kết idempotent.

**Lý do/chấm nghiêm:** Nói mọi method đều safe vì có transaction sai khái niệm. Không bắt nhớ nguyên văn RFC; ví dụ đúng chứng minh hiểu.

**Đọc lại:** L01 mục5–6.

## Câu 8 — Sửa theo contract đã công bố

```java
@PutMapping("/{id}")
ResponseEntity<ProductResponse> replace(
        @PathVariable("id") Long id,
        @RequestBody UpdateProductRequest request) {
    return ResponseEntity.ok(service.replace(id, request));
}
```

**Giải thích:** Path lấy id, body JSON thành request DTO; status200 và DTO theo contract, không created/Locationv2. Replacement là các field client được sửa, không bắt gửi id/createdAt hoặc toàn bộ schema DB. Có thể thêm @Valid nếu thực hành, nhưng đề không chấm nó.

**Chấm nghiêm:** Đề đã cung cấp giả định Controller annotation/DI đúng, không trừ vì snippet thiếu chúng. Câu trả lời bằng lời đủ bốn sửa cụ thể vẫn được điểm code tư duy.

**Đọc lại:** L01 mục2/6.
