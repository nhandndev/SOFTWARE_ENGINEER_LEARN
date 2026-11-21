# Đáp án và rubric — M3-1 Lesson 02, bản 2026-11-20

> Cập nhật cách diễn đạt câu hỏi ngày2026-11-21; giữ nguyên kiến thức, đáp án số và thang điểm. Nguồn getter chấp nhận mô tả bằng lời rõ ràng, không bắt thuộc tên API.

[Đề 12 câu](M3-1-rest-bp__2026-11-20__lesson2-lan2.md). **60đ; đạt từ 51đ =85%.** Chưa có bài nộp, không sinh điểm/trạng thái.

## Quy tắc chấm

- Chỉ chấm vế đã hỏi; mỗi câu tối đa 5đ. Không phạt hai lần cùng lỗi trong cùng tiêu chí, không thêm điều kiện ẩn hoặc luật sai một câu trượt cả bài.
- Chấp nhận lời/code tương đương. Không trừ chính tả/imports/package. Sai AND/status/state/metadata là lỗi bản chất khi làm đổi nghĩa.
- Tiêu chí 1đ: đủ 1; đúng một phần 0,5; sai/trống 0. Tiêu chí 0,5đ: đủ 0,5; đúng một phần 0,25; sai/trống 0. Các vế 2đ chia nhỏ bên dưới.
- Chỉ nhận nội dung viết ra hoặc suy ra trực tiếp rõ ràng. Nội dung trong bảng hoặc ngoài dòng Trả lời vẫn được đọc để chấm.
- Nếu số trước sai nhưng áp dụng đúng phương pháp ở bước sau, có thể nhận điểm phương pháp; ghi rõ, không trừ dây chuyền máy móc. Số liệu độc lập vẫn đối chiếu dữ kiện.
- Điểm thang100 = điểm/60×100, không làm tròn để vượt ngưỡng. Từ 51đ đạt Lesson 02, không tự đạt cả module/deliverable.
- Nộp một phần: chấm các câu đã bắt đầu, ghi rõ mẫu số; chưa kết luận đạt toàn bài. Vế chưa làm trong câu đã bắt đầu không có điểm.

## Câu 1 — 5đ

1. Page0,size20: 0,5 mỗi giá trị.
2. Sort id ASC: 1đ.
3. Keyword JAVA sau trim; tên chứa java viết thường vẫn khớp vì không phân biệt hoa/thường: 0,5 mỗi ý.
4. Không tự áp 0; không truyền filter đó nghĩa là không hạn chế theo nó: 1đ.
5. Blank sau trim nghĩa là không lọc keyword: 1đ.

Không bắt client ghi default trong URL mới có điểm.

## Câu 2 — 5đ

1. Tập 10,11,13 và order 10,11,13: 0,5 cho tập; 0,5 cho order.
2. Offset0, content10,11 đúng thứ tự: 0,5 mỗi ý.
3. TotalElements3, totalPages2: 0,5 mỗi ý.
4. Status200: 0,5; content DTO hoặc viết tắt ID: 0,5; page0/size2: 0,5; total3/pages2 trong body: 0,5. Nhận nội dung đã ghi rõ ở vế trước, không bắt chép lại trùng văn.

```json
{"content":[{"id":10,"name":"Java Basic","price":100,"categoryId":1},{"id":11,"name":"Spring Guide","price":100,"categoryId":1}],"page":0,"size":2,"totalElements":3,"totalPages":2}
```

## Câu 3 — 5đ

1. Page1: content[13] 0,5; page1/size2 0,5; total3 0,5; pages2 0,5.
2. Page2: status200 0,5; content[] 0,5; page2/size2 0,5; total3/pages2 0,5.
3. Content.size chỉ đếm trang hiện tại: 0,5; size yêu cầu là giới hạn trang, khác số dòng thực: 0,5.

Không trả404 hoặc đổi total0 chỉ vì trang vượt cuối.

## Câu 4 — 5đ

1. Bỏ keyword vì nhánh category đã chạy: 1đ; trả10,11,13: 1đ.
2. Đúng10,13 và total2: 0,5 mỗi ý.
3. Giao AND trước page: 1đ; count cùng điều kiện: 0,5; ghép hai trang riêng không bảo toàn giao/filter/metadata: 0,5.

Nhận query tổ hợp/Specification/pseudocode tương đương, không bắt API framework.

## Câu 5 — 5đ

1. Cắt10,11 rồi lọc Category2 → []: 1đ.
2. Đúng content12,15 và total2: 0,5 mỗi ý.
3. Filter → sort → page: 1đ; lọc đủ toàn tập trước nên không bỏ dòng khớp nằm ngoài lát đầu tiên: 1đ.
4. Query tại Repository/DB, có lý do tránh load cả bảng/tốn RAM/truyền dữ liệu: 1đ. Chỉ chọn DB chưa lý do: 0,5.

## Câu 6 — 5đ

1. Order13,10,11,15,12,14: 1đ; hai Product giá100 cần idASC để phân định: 1đ.
2. Page0[10,11]: 0,5; sau chèn, dãy9,10,11,12,13,14,15 cho page1[11,12]: 1đ; id11 lặp: 0,5.
3. Dataset đổi làm vị trí offset dịch; tie-break chỉ xác định order trên một tập cố định, không tạo snapshot giữa hai request: 1đ.

Không đòi locking/cursor. “Unique sort chắc chắn không lặp giữa hai request” sai giả định.

## Câu 7 — 5đ

Ba dòng 1đ (page=abc, page=-1, khoảng giá ngược): status400 0,5; lý do/bước chặn 0,5. Bốn dòng 0,5đ: status400 0,25; lý do 0,25. Tổng5đ.

| Input | Lý do |
|---|---|
| page=abc | Không convert sang int, binding trước Controller method |
| page=-1 | Bind được nhưng range âm, code check chặn |
| size=101 | Vượt tối đa100, code check chặn |
| size=0 | Dưới tối thiểu1, code check chặn |
| categoryId=0 | Không dương, code check chặn |
| minPrice=-1 | Giá âm, code check chặn |
| min150/max100 | Mỗi giá trị không âm nhưng khoảng ngược, code check chặn |

Không cần nhớ tên MethodArgumentTypeMismatchException. Binding không phải validation mọi rule.

## Câu 8 — 5đ

1. 400 vì direction không hợp lệ: 1đ.
2. 400 vì field không thuộc allowlist: 1đ.
3. 400 vì không phải đúng một cặp field,direction: 1đ.
4. Pageable không tự chứng minh policy; cần check/cấu hình range và sort allowlist đúng contract: 1đ.
5. Không kết luận mọi field lạ đều là injection; phụ thuộc cách query, không nối raw input vào SQL: 1đ. Không bắt nêu vector tấn công.

Ba ý đầu chỉ nêu status đúng chưa có lý do: 0,5/ý.

## Câu 9 — 5đ

1. Map Product → ProductResponse, content là DTO list: 1đ.
2. Size lấy kích thước yêu cầu của Page (getSize)=2: 0,5; totalElements lấy tổng Product khớp của Page (getTotalElements)=3: 1đ; totalPages lấy tổng trang của Page (getTotalPages)=2: 0,5. Nhận mô tả nguồn tương đương, không bắt tên getter. Mỗi tiêu chí gồm nguồn và giá trị; thiếu một phần nhận tối đa một nửa điểm tiêu chí.
3. Map1–1 không lọc/chuyển trang, giữ metadata query đúng: 1đ.
4. DTO page kiểm soát schema, JSON nội bộ PageImpl có thể đổi khi nâng framework: 1đ.

```java
Page<ProductResponse> dto = page.map(mapper::toResponse);
return PageResponse.<ProductResponse>builder()
        .content(dto.getContent()).page(dto.getNumber())
        .size(dto.getSize()).totalElements(dto.getTotalElements())
        .totalPages(dto.getTotalPages()).build();
```

Mapper ở code tham khảo chuyển một entity thành một DTO, không lọc dòng. Không bắt tạo class Mapper trong bài làm.

## Câu 10 — 5đ

1. Count sai6, count đúng3: 0,5 mỗi số.
2. CategoryId1 AND price≥100: 1đ; không LIMIT/OFFSET để đếm tổng tập khớp: 1đ.
3. Hai Product khác nhau10/13, total2, không phải3 JOIN rows: 1đ.
4. Sửa query content/count theo cùng nghĩa filter và đơn vị Product; khử trùng đúng chỗ nếu cần, không vá JSON bằng số đoán: 1đ.

Không bắt syntax COUNT DISTINCT; không khẳng định count luôn cần SQL riêng.

## Câu 11 — 5đ

1. 200: 0,5; content[]: 0,5; totalElements0: 0,5; totalPages0: 0,5.
2. 404 vì parent Category999 không có theo policy: 1đ; chỉ404 chưa lý do: 0,5.
3. 200: 0,5; content[]: 0,5; total6/pages3: 0,5; page giữ999 không ép về cuối: 0,5.

Policy API khác có thể hợp lý nhưng bài đang hỏi theo contract đã cho, không kết luận mọi lựa chọn khác sai HTTP.

## Câu 12 — 5đ

1. Spring bind query param; code check range/sort, normalize input trước query: 1đ.
2. Service chuyển category2 và Pageable page0/size2/idASC: 1đ.
3. Repository filter/sort/page/count ở DB, trả content12,15 và total2/pages1: 1đ.
4. Service map1–1 sang ProductResponse, đóng PageResponse; không lọc thêm trong mapper: 1đ.
5. Controller200 với DTO page; Spring HTTP message conversion/JSON serializer chuyển object thành JSON: 1đ. Không bắt tên thư viện/phiên bản chính xác.

Đúng dữ liệu nhưng trách nhiệm lớp sai một phần: tiêu chí liên quan0,5. Không đòi lặp FilterChain.

## Độ phủ bài học → đề

| Mục bài học | Câu kiểm tra |
|---|---|
| 2: default/normalize/filter contract | 1,4,7,8 |
| 3–4: dataset/page/metadata | 2,3,11 |
| 5: filter trước page/vị trí query | 5,12 |
| 6: AND/if-else | 4 |
| 7: sort/tie-break/dataset thay đổi | 6 |
| 8: binding/range/allowlist | 7,8,12 |
| 9: DTO/map/PageResponse | 9,12 |
| 10: count/filter/root Product | 10 |
| 11: filter/nested/empty | 11 |

Không thêm kiến thức ngoài phạm vi vào tiêu chí. Dùng [quy tắc chấm dự án](../../03_PROMPT_CHAM_DE.md), lưu snapshot nhận xét mỗi lần chấm. Không tự cho điểm vì đã tạo đề.
