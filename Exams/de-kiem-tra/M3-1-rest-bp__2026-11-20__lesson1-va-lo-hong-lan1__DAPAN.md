# Đáp án và rubric — Đề vá riêng M3-1 Lesson 01

[Đề vá](M3-1-rest-bp__2026-11-20__lesson1-va-lo-hong-lan1.md). **12 câu, tổng 20đ**, đạt từ **17/20 = 85%**.

## Quy tắc chấm

- Chỉ chấm những tiêu chí đã hỏi. Không mở rộng sang kiến thức khác hoặc phần đã đạt trong bài gốc.
- Chấp nhận lời, HTTP hoặc Java tương đương. Không trừ lỗi gõ/imports; sai state, status hoặc ý nghĩa thao tác là lỗi kiến thức.
- Với tiêu chí 0,5đ: đúng đủ 0,5; đúng một phần 0,25; thiếu/sai 0.
- Với tiêu chí 1đ: đúng đủ 1; đúng một phần 0,5; thiếu/sai 0.
- Không cộng vượt trần, phạt một lỗi hai lần hoặc biến giải thích bổ sung thành điều kiện ngầm.
- Điểm vá = điểm thô /20 ×100. Đạt ≥85% thì xác nhận Lesson 01 qua đề vá, kết hợp bằng chứng phần đã đúng ở bài gốc. Không bắt 100% hoặc tự đặt luật sai một câu là trượt.
- Giữ bài gốc 60/80 trong lịch sử; không cộng điểm phần trăm hoặc lấy trung bình với điểm vá.
- Chỉ chốt sau khi có bài làm và snapshot chấm. Lesson đạt không tự hoàn thành module/deliverable.

## Câu 1 — 2,5đ

**Ý 1: 0,5đ.** Client đọc product.price từ response, nhưng field đó đã bị xóa. Nó không còn lấy giá đúng schema đã công bố. Không cần request sai hoặc Java backend bị crash mới có breaking change.

**Ý 2: mỗi lý do 0,5đ, tổng 2đ.**
- Client cần number nhưng nhận object nên việc đọc/tính toán không còn đúng kiểu.
- Request cũ không gửi description sẽ bị yêu cầu bắt buộc mới từ chối.
- Client bỏ qua field lạ nên field optional thêm vào không đổi hành vi cũ trong giả định.
- Client strict từ chối unknown fields nên response mới có thể làm nó lỗi.

Không chấm lại nhãn breaking/tương thích đã cho. Chỉ viết “phá contract” chưa giải thích cơ chế.

## Câu 2 — 1đ

```http
GET /api/v1/products
GET /api/v1/products/25
```

Mỗi route **0,5đ**. Phải đúng resource và cách xác định detail. Không hỏi lại version. Lỗi trình bày thiếu dấu / đầu chuỗi có thể chấp nhận khi ý rõ; giữ getProduct hoặc AllProducts thì chưa sửa convention.

## Câu 3 — 1đ

- Location: /api/v1/products/25 — **0,5đ**.
- Thêm id:25 vào JSON response — **0,5đ**.

```json
{"id":25,"name":"Mouse","price":80.00,"categoryId":2}
```

Không cộng điểm cho nhắc lại 201 đã cho sẵn. Không bắt đúng thứ tự field. Location là URI, không chứa DTO/body.

## Câu 4 — 1đ

204 không có response content. Nếu giữ policy 204 thì bỏ JSON, trả body rỗng.

**0,5đ** cho nhận định không gửi JSON dưới 204; **0,5đ** cho cách sửa bỏ body. Không bắt nêu status thay thế.

## Câu 5 — 3đ

- List rỗng trả **200** theo policy — **1đ**.
- Body **[]**, vì collection endpoint vẫn hợp lệ, chỉ không có phần tử phù hợp — **1đ**. Chỉ đúng body hoặc lý do nhận 0,5.
- PUT-update-only trả 404 là policy dự án; không chứng minh HTTP cấm mọi thiết kế PUT-create — **1đ**.

Không chấm lại detail/PUT id vắng trả 404 hoặc hỏi metadata pagination.

## Câu 6 — 0,5đ

Một hành động cụ thể phù hợp, ví dụ:
- Kiểm tra/log/thống kê client còn gọi v1 trước khi tắt.
- Xác nhận các client đã chuyển.
- Thông báo lịch và cách nâng cấp để client cũ có kế hoạch chuyển.

Nhận **0,5đ** khi có hành động thực hiện/kiểm được. Chỉ “đồng bộ, không phá contract” mà chưa có việc cụ thể thì chưa đủ. Không bắt tên tool hoặc hai hành động vì chỉ kiểm phần thiếu.

## Câu 7 — 1đ

- PUT replacement đúng nghĩa idempotent: gán cùng writable fields lặp vẫn giữ intended state — **0,5đ**.
- DELETE không safe vì yêu cầu xóa/thay state — **0,5đ**.

Mỗi ý chỉ có kết luận đúng nhưng chưa có lý do nhận 0,25. Không dùng code Service cộng sai để đổi semantics của PUT replacement đã cho. Không hỏi lại các ô đã đúng trong bảng cũ.

## Câu 8 — 0,5đ

Thiếu **price**; theo policy, input thiếu bắt buộc trả **400**. Mỗi phần **0,25đ**.

Không tự điền price hoặc coi missing là giữ nguyên. Không kiểm lại id/createdAt/validation.

## Câu 9 — 3đ

- Code cộng sai cho **7+4=11** sau lần đầu — **1đ**.
- Retry cho **11+4=15** — **1đ**.
- Sửa thành phép gán và state đúng — **1đ**, chia:
  - product.setStock(request.getStock()) hoặc mô tả gán giá trị mới: **0,5đ**.
  - Sau một/hai lần đều stock=4: **0,5đ**.

Giữ logic cộng rồi chỉ chặn retry bằng key vẫn cho 11 ngay lần đầu, không thỏa contract stock mới=4. Không cộng điểm assignment chỉ vì viết “dùng key” hoặc “đảm bảo idempotent”.

Không yêu cầu triển khai key/race; phần nhận diện key đã đủ điểm ở bài gốc.

## Câu 10 — 3đ

- Audit log cho mỗi request không tự làm intended effect xóa mất idempotency — **1đ**.
- Hoàn 120 mỗi retry có thể hoàn trùng/cộng dồn side effect nghiệp vụ, khác ghi nhận audit — **1đ**.
- Trả 204 khi đã vắng có thể là policy hợp lý nếu được công bố và nhất quán cho client — **1đ**.

Chấp nhận diễn đạt bằng tác động lên state, không bắt đúng thuật ngữ. Không hỏi kiến trúc thanh toán hoặc triển khai chống hoàn trùng.

## Câu 11 — 0,5đ

Bỏ phần created/Location bị copy từ create; theo contract update này, trả 200 + DTO, ví dụ ResponseEntity.ok(updated). Không chỉ đổi v2 thành v1 rồi giữ created/Location theo quy trình create.

**0,5đ** cho quyết định/cách sửa builder phù hợp. Không chấm lại annotation/binding/200 đã đúng. Nhắc ok là cách diễn đạt bỏ created, không phải tiêu chí điểm mới.

Không khẳng định mọi HTTP 200 tuyệt đối cấm Location; câu hỏi đang xét contract cụ thể đã công bố.

## Câu 12 — 3đ

- Sau cả hai PUT đều name=Mouse, price=80, categoryId=2 — **1đ**. Chỉ đúng một lần hoặc thiếu phần state quan trọng nhận 0,5.
- Metadata/audit khác không tự phủ định idempotency của replacement — **1đ**.
- Với tình huống update xen giữa, idempotency không tự ngăn ghi đè: retry có thể đưa giá từ 130 về 80 nếu không có kiểm cạnh tranh — **1đ**.

Chỉ nhận diện giới hạn; không bắt giải pháp locking/ETag.

## Phạm vi và kiểm chất lượng

[Đánh giá và bản đồ 20 điểm thiếu](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/README_DANH_GIA_VA_KE_HOACH_VA_LESSON_01.md). Tất cả câu vá truy được về một vế sai/thiếu, không kiểm lại câu 11–14 gốc hoặc phần đã đúng.

Nguồn học: [Lesson 01](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_01_RESOURCE_VERSIONING_IDEMPOTENCY.md). Chỉ đổi ID/giá trị số để kiểm cùng phép suy luận, không thêm lý thuyết.

Kiểm tĩnh: 12 câu, tổng 20đ, ngưỡng 17đ; các vế và rubric khớp; có đáp án từng vế. Chưa chạy Spring/HTTP/DB trong lượt soạn.
