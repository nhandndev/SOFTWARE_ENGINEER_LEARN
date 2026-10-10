# Đáp án M2-4 · Lesson 03

40đ; normalize /40 ×100.

| Câu | Rubric 5 điểm |
|---|---|
| 1 | To-one mỗi Product một Category khóa duy nhất (2); count cho tổng/metadata (1); filter count cùng nghĩa content (2). |
| 2 | 4 dòng (1); LIMIT 2 dòng không bằng 2 root đủ collection (2); DISTINCT không tự sửa paging collection (2). |
| 3 | Tải nhiều dòng, memory/latency cao (2); setting fail sớm (2); phải đổi query/chiến lược (1). |
| 4 | Page ID rồi fetch collection theo ID không Pageable (2); restore order (1); metadata ID page (1); rỗng không query IN (1). |
| 5 | Không tự sửa N+1 (1); LazyInitializationException khi LAZY detached chưa tải (2); fetch và map DTO trong Service transaction (2). |
| 6 | Count không filter trả 3 trong khi đúng là 2 (2); thêm where p.category.id=:categoryId trong count (2); wrapper chỉ mang metadata, không tự tính lại total (1). |
| 7 | Không tự fetch (1); read-only không cam kết cấm mọi write (1); proxy interceptor (1); self invocation có thể bỏ qua transaction advice (2). |
| 8 | Connection đã acquire có thể bị giữ lâu (2); tách I/O chậm khỏi DB transaction ngắn có kế hoạch (1); kiểm atomicity/consistency (1); context mở không luôn giữ connection, tùy cấu hình (1). |

Đọc lại: 1/6 mục 1; 2–3 mục 2; 4 mục 3; 5 mục 4–5; 7 mục 5; 8 mục 6 và cuối mục 4. Không yêu cầu viết full service two-query để nhận điểm câu 4. Câu 6 cho rõ count được chạy để không phụ thuộc tối ưu bỏ count của Spring Data.

## Quy tắc chấm

Áp dụng [chấm nghiêm theo từng ý](../../Notes/M2_Database/QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md). Phân trang đúng gồm content, thứ tự và metadata, không chỉ response có field page/size.

## Bài giải từng câu

### Câu 1 — To-one và count cùng nghĩa với content

**Đáp án đủ ý:** Mỗi Product tham chiếu tối đa một Category theo khóa duy nhất nên join to-one này không nhân Product thành nhiều row. Count dùng tính tổng số root khớp truy vấn để dựng totalElements/totalPages, không phải chỉ đếm content trang hiện tại. Nếu content lọc Category/keyword thì count phải biểu diễn cùng tập Product; không cần fetch association trong count.

**Chấm nghiêm:** “JOIN nào cũng nhân row” sai to-one của đề. Count bỏ filter không đúng chỉ vì content vẫn đúng. Không khẳng định mọi Page luôn bắt buộc chạy count nếu framework tối ưu được; đề đang hỏi vai trò count khi cần.

### Câu 2 — LIMIT row không phải LIMIT root đủ collection

**Đáp án đủ ý:** JOIN tạo4 SQL row: Books–Java, Books–Spring, Books–SQL, Electronics–Mouse. LIMIT2 row không bảo đảm hai Category đủ products; nếu hai row đầu là Books thì chỉ thấy một root và collection chưa đầy đủ nếu áp giới hạn trực tiếp. DISTINCT không tự làm giới hạn SQL row biến thành giới hạn root đầy đủ khi đang fetch collection.

**Vì sao:** ORM có thể gộp các row thành entity, nhưng gộp sau không lấy lại row đã bị LIMIT loại. Đây là lý do tránh strategy đó, không phải khẳng định Hibernate chắc chắn trả collection thiếu: nó có thể xử lý paging trong memory hoặc báo lỗi tùy cấu hình.

**Chấm nghiêm:** Đáp2 vì lẫn số Category với số SQL row sai tiêu chí đếm. “Thêm DISTINCT là xong” sai cách giải quyết.

### Câu 3 — Fail sớm không phải tự tối ưu

**Đáp án đủ ý:** Fetch collection rồi phân trang trong memory có thể phải tải nhiều row hơn page cần, tăng RAM và latency. `fail_on_pagination_over_collection_fetch` giúp từ chối tình huống nguy hiểm thay vì âm thầm paging trong memory. Nó không viết lại query; cần đổi chiến lược như page root ID trước rồi fetch collection.

**Chấm nghiêm:** “Bật setting là database tự paging đúng” mất điểm tác dụng/cách sửa. Chỉ nói lỗi mà không nêu rủi ro row/memory thiếu điểm rủi ro.

### Câu 4 — Page ID quyết định trang, fetch bổ sung dữ liệu

**Đáp án đủ ý:** Bước1 lấy Page Category ID theo sort ổn định. Bước2 fetch Category/products bằng IN các ID đó, không áp Pageable lên collection fetch. Query IN không hứa thứ tự nên tạo map id→Category, duyệt lại ID page [1,2] để dựng DTO theo thứ tự1,2. Giữ total/page/size từ ID Page. Nếu ID page rỗng, trả content rỗng với metadata của ID Page và không query IN rỗng.

**Chấm nghiêm:** Sort theo thứ tự trả ngẫu nhiên của IN thiếu điểm thứ tự. Dùng fetchedList.size làm total sai metadata. Trang vượt cuối có thể content rỗng nhưng total vẫn khác0. Không yêu cầu viết full Service mới nhận5đ.

### Câu 5 — OSIV off buộc chủ động chuẩn bị response

**Đáp án đủ ý:** Tắt open-in-view không tự sửa N+1; query phụ vẫn xảy ra nếu Service đọc từng quan hệ trong context mở. Nếu trả entity chưa tải LAZY cho Jackson sau session đóng, có thể LazyInitializationException khi getter được truy cập. Chọn fetch plan đủ dữ liệu rồi map DTO chỉ chứa giá trị response trong Service transaction, trả DTO ra Controller.

**Chấm nghiêm:** “OSIV off là không bao giờ có query phụ” sai. “Bọc entity trong ApiResponse” vẫn không loại proxy nên không thay DTO đúng boundary.

### Câu 6 — Wrapper không sửa count sai

**Đáp án đủ ý:** Với count của đề được thực thi, totalElements=**3** trong khi tập lọc Category1 chỉ có**2** Product. Sửa thành:

```sql
select count(p) from Product p where p.category.id = :categoryId
```

PageResponse chỉ mang metadata lấy từ Page; copy total sai không làm nó đúng. Không lấy số dòng content thay total vì các trang khác có thể còn dữ liệu.

**Chấm nghiêm:** Chỉ sửa wrapper hoặc đặt total=content.size không nhận điểm sửa count. Thiếu điều kiện categoryId là lỗi bản chất, không phải thiếu cú pháp vụn vặt.

### Câu 7 — Transaction boundary không phải fetch plan

**Đáp án đủ ý:** `@Transactional(readOnly=true)` không tự fetch đủ Category/products. Read-only là gợi ý/tối ưu và tùy stack có thể được thực thi khác nhau, không phải cam kết portable rằng mọi write bị DB cấm. Với Spring proxy transaction thông thường, gọi qua proxy được interceptor áp transaction; `this.list()` gọi nội bộ không đi qua proxy nên có thể không tạo boundary được annotation của list yêu cầu. Nếu caller đã có transaction thì nội bộ vẫn có thể chạy trong transaction đó.

**Chấm nghiêm:** “Self invocation luôn không có transaction nào” quá tuyệt đối. Phải phân biệt bỏ advice của method với việc có transaction do caller. Không yêu cầu kiến thức AspectJ ngoài mô hình proxy của bài.

### Câu 8 — Đừng giữ tài nguyên DB trong lúc chờ API chậm

**Đáp án đủ ý:** Sau khi query đã acquire connection, transaction kéo dài thêm5 giây có thể giữ connection/lock lâu, giảm connection còn rảnh và khiến request khác chờ pool. Cân nhắc đọc dữ liệu/DTO trong transaction ngắn, gọi API model bên ngoài, rồi dùng transaction ngắn khác để ghi; phải xử lý consistency, dữ liệu đổi giữa hai bước, idempotency/retry nếu nghiệp vụ cần. Không khẳng định session mở luôn giữ connection vật lý vì acquire/release phụ thuộc cấu hình và hoạt động thực tế.

**Chấm nghiêm:** “Tăng pool là hết” không đáp ứng cách xử lý boundary. “Bỏ transaction toàn bộ” mà không cân nhắc atomicity không đủ điểm. Chỉ cần nêu hướng và cân nhắc, chưa bắt thiết kế distributed transaction.
