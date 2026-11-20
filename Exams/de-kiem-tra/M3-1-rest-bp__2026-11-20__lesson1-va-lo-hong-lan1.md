# M3-1 · Lesson 01 — Đề vá riêng các phần sai và thiếu

> **2026-11-20 · THI_LAI theo tiêu chí thiếu: 12 câu, tổng 20đ.** Điểm = điểm thô /20 ×100. Đạt từ **17/20 =85%**. Khoảng 35–50 phút; trả lời ngắn theo ý nghĩa, không cần dựng project.

## Vì sao đề này không giống bài 16 câu?

Đề lấy từ [bài làm Lesson 01](M3-1-rest-bp__2026-11-20__lesson1-lan2.md) sau khi rà cả 16 câu. Câu 15 mới bổ sung PUT/200 đã được tính đúng, nên không bắt thi lại binding, method mapping hoặc chọn200.

- Chỉ hỏi những vế **còn sai hoặc thiếu**, tổng đúng20 điểm chưa đạt trong bài gốc hiện tại.
- Không kiểm lại toàn bộ một câu cũ chỉ vì nó chưa được5/5.
- Không có PATCH mới, key store, Redis, ETag, locking, paging, security, database hoặc kiến thức mới.
- Câu điểm ít thì trả lời ngắn; không phải mọi câu đều5đ.
- Các tình huống độc lập, trừ phần nói rõ. Không có tác nhân khác cập nhật xen giữa ở ví dụ retry thông thường.
- “Contract/policy của bài” là quy ước đã công bố, không phải luật mọi API phải giống.

## Điều kiện để hoàn tất Lesson 01 sau lượt vá

Đề vá được chấm riêng, đạt **≥17/20** thì đủ ngưỡng xác nhận phần yếu đã được vá để chốt **Lesson 01**, dựa cùng bằng chứng phần đã đúng ở bài gốc. Không bắt đạt100%, không thêm điều kiện ẩn hoặc câu ngoài đề.

Giữ lịch sử bài gốc **60/80 =75%**; không cộng hai điểm phần trăm, không lấy trung bình với điểm cũ, không giả vờ bạn thi lại toàn bộ80đ. Khi chấm sẽ ghi rõ “đạt Lesson01 qua đề vá” nếu đủ ngưỡng. **Không tự coi đã đạt chỉ vì đã tạo đề.** Module M3-1 và deliverable vẫn là chuyện khác.

[Đánh giá hiện tại và bản đồ từng lỗ hổng](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/README_DANH_GIA_VA_KE_HOACH_VA_LESSON_01.md). Bài giải ở file cùng tên thêm __DAPAN.md; mở sau khi làm.

---

## Câu 1 — Giải thích đúng client hỏng ở chỗ nào (2,5đ)

Không hỏi lại bạn kết luận breaking hay không; các kết luận đã cho. Chỉ giải thích cơ chế.

1. Client đang **đọc response** bằng product.price. Request của nó không đổi. Backend xóa price khỏi JSON trả về và chỉ có amount. Vì sao client có thể hiển thị sai dù Java backend compile được? Không giải thích thành client gửi request sai. **(0,5đ)**
2. Bốn kết luận dưới đã được xác định. Với mỗi dòng, nêu **một lý do cụ thể** gắn với hành vi client, không chỉ ghi “phá API contract”. **(2đ — mỗi dòng 0,5đ)**

| Dữ kiện | Kết luận đã cho | Bạn giải thích vì sao |
|---|---|---|
| Client dùng price như number, nay response là object {"value":120} | Breaking | |
| Request cũ không có description, phiên bản mới bắt buộc field này | Breaking | |
| Thêm response field optional; client bỏ qua unknown fields | Tương thích với client này | |
| Thêm response field; client strict từ chối unknown fields | Có thể breaking với client này | |

**Trả lời:**

---

## Câu 2 — Sửa đúng tên resource trong URL (1đ)

Convention dự án: prefix /api/v1, resource tên **products**, detail dùng Product ID trong path.

Viết đúng hai request thay:
1. GET /getAllProducts.
2. GET /getProduct?id=25.

Chỉ cần method + URL, mỗi dòng **0,5đ**. Không hỏi lại ý nghĩa version hoặc GET/DELETE.

**Trả lời:**
Get /Products
Get /Product/25 hoặc là /Prodcut?id=25
---

## Câu 3 — Điền đúng định danh Product vừa tạo (1đ)

POST /api/v1/products đã tạo Product **id=25**. HTTP status201 đã đúng, không cần giải thích lại. Body đang có:

```json
{"name":"Mouse","price":80.00,"categoryId":2}
```

1. Viết giá trị Location trỏ tới chính Product mới, cùng API version. **(0,5đ)**
2. Bổ sung field định danh còn thiếu vào response JSON theo ProductResponse đã công bố. Không cần thêmSKU/httpcode. **(0,5đ)**

**Trả lời:**

---

## Câu 4 — 204 có chỗ cho JSON không? (1đ)

API chọn trả **HTTP204 No Content** khi xóa thành công. Một bạn còn muốn trả body {"message":"deleted"}.

Body đó có được gửi như content của response204 không? Nếu vẫn giữ policy204 thì bạn sẽ trả body thế nào? Không cần chọn status mới. **(1đ)**

**Trả lời:** không được mà Delete thì k có trả về body nhé , 

---

## Câu 5 — List rỗng và giới hạn policy PUT (3đ)

Các endpoint và điều kiện lọc đều hợp lệ. GET /api/v1/products?categoryId=2 không có Product phù hợp. **Riêng bài này list response là JSON array**, không có pagination metadata.

1. Chọn HTTP status cho list rỗng theo policy đã học. **(1đ)**
2. Viết body và giải thích ngắn vì sao “không có phần tử phù hợp” không đồng nghĩa endpoint collection không tồn tại. **(1đ)**
3. Dự án này chọn PUT id không có trả404. Policy đó có chứng minh HTTP cấm mọi API dùng PUT tạo resource không? Chỉ trả lời phân biệt policy với khả năng thiết kế, không triển khai PUT-create. **(1đ)**

Detail id vắng trả404 và policy PUT-update-only đã được bạn trả lời đúng; không bắt nêu lại hai status đó.

**Trả lời:**

---

## Câu 6 — Một việc còn thiếu trước khi dừng v1 (0,5đ)

Bạn đã biết giữ v1/v2 và chuyển client, không cần giải thích lại. Team muốn tắt v1 sau giai đoạn chuyển.

Nêu **một hành động kiểm/triển khai cụ thể** để biết client cũ không còn bị bỏ rơi trước khi tắt. Không chỉ nói “đảm bảo không phá contract”, không cần tên tool. **(0,5đ)**

**Trả lời:**

---

## Câu 7 — Chỉ sửa hai ô còn nhầm (1đ)

1. PUT được thiết kế đúng nghĩa **thay writable fields**, không phải code cộng dồn: semantics thao tác này có idempotent không? Nêu một lý do về state khi retry. **(0,5đ)**
2. DELETE thực sự xóa Product: thao tác đó có safe không? Nêu một lý do về state thay đổi. **(0,5đ)**

Không hỏi lại GET, POST, PATCH hoặc việc annotation không tự sửa business logic.

**Trả lời:**

---

## Câu 8 — Áp dụng policy vào input thiếu (0,5đ)

PUT /api/v1/products/25 yêu cầu đủ name/price/categoryId, field writable thiếu không được tự điền hoặc coi như partial update. Request là:

```json
{"name":"Mouse","categoryId":2}
```

Chỉ ra **field thiếu và HTTP status theo policy input thiếu bắt buộc**. Không hỏi lại server-managed fields hoặc trách nhiệm validation. **(0,5đ)**

**Trả lời:**

---

## Câu 9 — Sửa ý nghĩa PUT, không lấy key thay phép gán (3đ)

Tình huống mới cùng kiến thức cũ: PUT /api/v1/products/25/stock công bố body stock là **giá trị stock mới tuyệt đối**. Stock ban đầu=7, body {"stock":4}. Code:

```java
product.setStock(product.getStock() + request.getStock());
```

1. Không có bảo vệ retry, tính stock sau lần đầu và sau lần thứ hai cùng request. **(2đ — mỗi giá trị 1đ)**
2. Viết một dòng thay thế hoặc mô tả chính xác thao tác để đúng replacement; nêu stock sau một/hai lần khi đã sửa. **(1đ)**

Bạn đã nhận ra annotation không bảo đảm logic, nên không hỏi lại. Nếu đề xuất giữ dòng cộng và chỉ chặn retry bằng key, vẫn phải xét nó có cho đúng **giá trị stock mới=4** ngay lần đầu không. Không triển khai key.

**Trả lời:**

---

## Câu 10 — Các vế DELETE bạn còn bỏ trống (3đ)

Effect xóa Product đã hoàn tất sau lần đầu; bạn đã hiểu retry có thể trả status khác. Chỉ xét các vế còn thiếu:

1. Mỗi request ghi thêm một audit log có tự làm effect xóa mất idempotency không? **(1đ)**
2. Nếu mỗi retry còn tự cộng thêm một lần hoàn120 tiền, vấn đề nghiệp vụ gì có thể xảy ra? Phân biệt với ghi audit; không thiết kế hệ thống thanh toán. **(1đ)**
3. Một API công bố trả204 cả khi Product đã vắng thay vì404: policy này có thể hợp lý không, cần điều gì để client không phải đoán? **(1đ)**

**Trả lời:**

---

## Câu 11 — Bỏ phần Location bị copy từ create (0,5đ)

Bạn đã sửa **PUT, binding và HTTP200** đúng ở câu15 cũ. Contract update đang xét chỉ trả200 + ProductResponse, không định nghĩa Location từ quy trìnhcreate.

Còn ý cũ “create/api/v1/products mới đúng”: đổi Location từv2 sangv1 có phải phần sửa phù hợp cuối cùng cho contract update này không? Nêu cách xử lý phần response builder/Location bị copy từcreate. Không cần viết lại annotation hoặc cả Controller. **(0,5đ)**

**Trả lời:**

---

## Câu 12 — Ba vế còn thiếu về effect và concurrency (3đ)

Đã biết hai Product ID khác nhau không phải cùng target, nên không hỏi lại.

1. Cùng Product25, ban đầu name=Old/price=100/categoryId=1. Hai request PUT giống nhau đều thay ba field thành Mouse/80/2. Không có cập nhật xen giữa. State ba field sau lần1 và lần2 là gì? **(1đ)**
2. Nếu updatedAt hoặc audit log khác giữa hai lần, điều đó có tự phá idempotency của intended replacement effect không? **(1đ)**
3. **Tình huống riêng:** bạn PUTprice=80; người khác đổi thành130; bạn retryPUTprice=80. Nếu không có cơ chế kiểm cạnh tranh, idempotency có tự ngăn ghi đè thay đổi của người khác không? Chỉ nhận diện giới hạn, không triển khai lock/ETag. **(1đ)**

**Trả lời:**

---

Đề chỉ bao phủ các tiêu chí còn thiếu trong bài gốc hiện tại; [bảng đối chiếu từng điểm](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/README_DANH_GIA_VA_KE_HOACH_VA_LESSON_01.md) dùng để kiểm không bỏ sót hoặc đưa thêm nội dung. Không sửa/xóa bài gốc hoặc nhận xét cũ khi làm đề vá.
