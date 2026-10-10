# M3-1 — Bài giải Lesson02

40đ; normalize/40×100. [Chấm nghiêm](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/QUY_TAC_CHAM.md), theo contract/dataset đề, không dựa thói quen project khác.

| Câu | Rubric5đ |
|---|---|
| 1 | Content10,11 đúng thứ tự (1); page0/size2 (1); total3 (1); totalPages2 (1); filter rồi sort rồi page (1). |
| 2 | Page1=[13], page2=[] (2); cả hai total3/pages2 (1); không lấy content.size thay total (1); page2 hợp lệ200 rỗng (1). |
| 3 | Hai giá bằng nhau chưa có thứ tự đầy đủ (1); thêm id ASC (1); dataset đổi có thể lặp/bỏ sót offset (2); nhận diện cursor/keyset (1). |
| 4 | abc lỗi bind trước method (1); -1/0/101 convert được nhưng sai range (2);400 (1); Pageable/resolver không tự chứng minh contract, cần cấu hình/kiểm (1). |
| 5 | Đúng chỉ11 (1); code trả10,11,13 (1); kết hợp mọi filter có mặt bằng AND (2); blank keyword thành không lọc (1). |
| 6 | Sai5, đúng3 (1); count cùng tập filter (1); không lấy content.size (1); DTO public không entity/proxy (1); không phụ thuộc serialization PageImpl nội bộ (1). |
| 7 | Cả ba400 (1); allowlist field (1); direction asc/desc (1); min≤max (1); unknown property không tự chứng minh injection, không nối raw SQL (1). |
| 8 | a404 lỗi (1); b200 page rỗng total0 (1); c404 parent thiếu (1); filter tập dữ liệu khác xác định parent (1); không đổi behavior v1 âm thầm, xét compatibility (1). |

## Câu 1 — Tính theo tập đã lọc

**Đáp án đủ:** Sau lọc còn10/11/13, sort price ASC,id ASC giữ10/11/13. Content page0 là10,11; page0,size2,totalElements3,totalPages2. Filter phải xác định tập dữ liệu trước, sort xác định thứ tự, page mới cắt lát; lấy page rồi lọc có thể bỏ sót.

**Chấm nghiêm:** Content đúng mà total=2 thiếu điểm tổng. Không bắt viết full JSON nếu đủ field và ID rõ.

**Đọc lại:** L02 mục1–2.

## Câu 2 — Content rỗng vẫn có thể total khác0

**Đáp án đủ:** Page1=[13], page2=[]; cả hai totalElements3,totalPages2, size2. Total là toàn tập khớp filter, không số phần tử lát hiện tại. Page2 hợp lệ về range nên policy trả200 page rỗng, không404.

**Chấm nghiêm:** “Rỗng nên total0” sai metadata. “Không có page2 nên404” không theo policy đề; đây không phải câu cho tự chọn policy khác.

**Đọc lại:** L02 mục2/6–7.

## Câu 3 — Tie-break không phải snapshot

**Đáp án đủ:** Hai Product giá100 nên chỉ ORDER BY price chưa quyết định thứ tự giữa chúng; thêm id ASC unique làm tie-break. Nếu dataset đổi giữa request, insert trước offset có thể đẩy item sang trang khác, lặp/bỏ sót; sort ổn định không đóng băng DB. Nhận diện cursor/keyset cho hướng duyệt phù hợp hơn, không khẳng định nó giải mọi kiểu update.

**Chấm nghiêm:** “Thêm id là vĩnh viễn không trùng dù có insert” mất điểm giới hạn. Không cần công thức cursor hoặc isolation-level từ module khác.

**Đọc lại:** L02 mục3.

## Câu 4 — Hai lớp kiểm khác nhau

**Đáp án đủ:** abc không convert được thành int nên bind/type mismatch trước Controller method. -1,0,101 đều là số nguyên parse được, nhưng page=-1,size0/101 vi phạm range nên code validation tường minh từ chối. Tất cả400 theo policy. Chỉ khai báo Pageable chưa chứng minh behavior từ chối: resolver có thể normalize/cap; cần kiểm/cấu hình để đúng contract.

**Chấm nghiêm:** Gọi cả bốn là JSON parse error sai nguồn input. Không bắt thuộc exception class nếu giải thích đúng bind/range.

**Đọc lại:** L02 mục4.

## Câu 5 — AND không phải if/else lựa chọn một filter

**Đáp án đủ:** Kết quả đúng chỉ Product11 Spring thuộcCategory1. Code category branch hiện trả10,11,13 và bỏ keyword. Dựng query đồng thời category=1 AND name chứa Spring, các filter optional không có thì không thêm điều kiện; trim keyword và blank coi như không lọc.

**Chấm nghiêm:** Đổi hai if nhưng vẫn return ngay filter đầu chưa giải quyết. Dùng OR trả rộng hơn contract. Cần mô tả kết hợp điều kiện, không bắt viết Specification.

**Đọc lại:** L02 mục5.

## Câu 6 — Số5 và số3 là hai tập khác nhau

**Đáp án đủ:** Count toàn bảng5 là sai cho Category1, đúng là3. Content/count cùng filter và cùng nghĩa root. Content.size chỉ là số item trang nên không thay total. ProductResponse DTO class công bố field cần thiết, không kéo entity/proxy ra JSON; PageResponse giữ shape do mình quản lý thay vì phụ thuộc serialization nội bộ PageImpl.

**Chấm nghiêm:** Chỉ bọc PageResponse không sửa count. Không khẳng định DTO tự chữa fetch/N+1; đây là điểm API contract.

**Đọc lại:** L02 mục6.

## Câu 7 — Từ chối input ngoài convention

**Đáp án đủ:** Cả ba400: passwordHash ngoài allowlist public; up không là asc/desc; min200>max100 range đảo. Kiểm giúp contract rõ và tránh field nội bộ/điều kiện vô nghĩa. Unknown Sort property có thể gây lỗi property/contract, không mặc nhiên là SQL injection; vẫn không nối raw user input thành SQL.

**Chấm nghiêm:** Chấp nhận passwordHash hoặc silently fallback trái policy. Không cần giải thích SQL injection sâu, nhưng không đánh đồng mọi unknown field với exploit đã xảy ra.

**Đọc lại:** L02 mục1/4–5.

## Câu 8 — Phân biệt bộ lọc và định danh resource

**Đáp án đủ:** a404 với error body; b200 PageResponse content[],totalElements0,totalPages0 và page/size theo request/default; c404 vì parentCategory999 thiếu. B chỉ lọc tập Products, C định danh một parent cụ thể. Đây là policy đã công bố; project cũ có policy khác cần xét client và kế hoạch compatibility/versioning, không đổi ngầm v1.

**Chấm nghiêm:** Bất kỳ endpoint rỗng nào cũng404 không theo dữ kiện. Không bắt viết đầy đủ ProblemDetail trước Lesson03; chỉ yêu cầu nhận diện error body khác success page.

**Đọc lại:** L02 mục7; L01 mục3–4.
