# Đáp án M2-4 · Lesson 02

40đ; normalize /40 ×100.

| Câu | Rubric 5 điểm |
|---|---|
| 1 | JOIN thường lọc/kết hợp theo quan hệ (2); không bảo đảm initialize quan hệ (1); FETCH yêu cầu tải quan hệ cùng entity (2). |
| 2 | select p from Product p join fetch p.category (2); left join fetch khi giữ null (2); mapper kiểm null (1). |
| 3 | Tải category ở method (2); không global mọi endpoint (1); không cam kết mọi provider một SQL (1); quan sát SQL (1). |
| 4 | Gom LAZY đủ điều kiện bằng IN/batch (2); phụ thuộc context/số quan hệ/cache (1); không luôn một query (1); JDBC batching cho ghi (1). |
| 5 | select new com.shopcore.product.dto.ProductResponse(p.id,p.name,c.name) from Product p join p.category c (3); scalar dựng DTO/constructor khớp, không chứa proxy (2). |
| 6 | Projection cho list ít cột (2); managed entity cho dirty checking (2); không thay mọi entity trong nghiệp vụ ghi (1). |
| 7 | Không đạt vì mất dữ liệu (2); left join fetch (1); null-safe mapping (1); so ID/content và SQL trước/sau (1). |
| 8 | Chọn fetch to-one/graph/projection phù hợp và nói đủ dữ liệu response (2); nhân row/memory (1); rủi ro ORM hoặc paging collection (1); so response, SQL và thời gian trước–sau (1). |

Đọc lại: 1–2 mục 2; 3 mục 3; 4 mục 4; 5–6 mục 5; 7 mục 2/7; 8 mục 6–7. Không yêu cầu chi tiết paging chưa học ở Lesson 03.

Chấm câu 2/5: lời mô tả đủ root, quan hệ, loại join/null và field DTO được xem là bằng chứng hiểu, không trừ vì thiếu imports/annotation. Sai loại join làm mất dòng hoặc lấy sai field vẫn trừ theo rubric. Không bắt thuộc chuỗi tên package để đạt phần tư duy.

## Quy tắc chấm

Áp dụng [chấm nghiêm theo từng ý](../../Notes/M2_Database/QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md). Một cách tối ưu chỉ được xem là đúng khi giữ đúng hợp đồng dữ liệu; không thưởng việc giảm SQL bằng cách làm mất Product.

## Bài giải từng câu

### Câu 1 — JOIN dùng quan hệ, FETCH yêu cầu tải quan hệ

**Đáp án đủ ý:** Query JOIN thường dùng Category để kết hợp/lọc Product theo `c.name`. Việc select root `p` với JOIN thường không tự bảo đảm association `p.category` đã initialize. `JOIN FETCH p.category` thêm yêu cầu tải Category cùng Product để truy cập quan hệ này. Phải phân biệt điều kiện truy vấn với fetch plan.

**Chấm nghiêm:** Nói “SQL có JOIN nên Java association chắc chắn initialized” sai tiêu chí trọng tâm. Không yêu cầu giải thích thuật toán hydrate nội bộ Hibernate.

### Câu 2 — Chọn INNER/LEFT theo việc có giữ null hay không

**Đáp án đủ ý:** Quan hệ bắt buộc có thể dùng:

```sql
select p from Product p join fetch p.category
```

Khi Category tùy chọn và phải giữ Product không có Category:

```sql
select p from Product p left join fetch p.category
```

Mapper xử lý null:

```java
String categoryName = p.getCategory() == null
        ? null : p.getCategory().getName();
```

**Vì sao:** INNER bỏ root không có match; LEFT giữ root với Category null. Đây là thay đổi kết quả, không chỉ thay tốc độ.

**Chấm nghiêm:** Đúng fetch nhưng giữ INNER trong case optional mất điểm giữ root. LEFT đúng nhưng mapper không xử lý null mất điểm mapper. Lời mô tả chính xác được chấp nhận như quy ước đề.

### Câu 3 — EntityGraph áp dụng tại điểm sử dụng

**Đáp án đủ ý:** `@EntityGraph(attributePaths="category")` trên method repository yêu cầu fetch Category cho truy vấn sử dụng graph đó. Nó không đổi mọi endpoint hoặc toàn bộ mapping thành EAGER. Không cam kết một SQL cứng cho mọi provider/tình huống; kiểm SQL phát sinh và dữ liệu khi gọi method đó.

**Chấm nghiêm:** “Graph làm mọi query tự JOIN Category” sai phạm vi. Chỉ nêu “để tối ưu” chưa nói graph fetch cái gì không đủ điểm chức năng.

### Câu 4 — Batch đọc LAZY không phải JDBC batch ghi

**Đáp án đủ ý:** Batch fetch size16 giúp Hibernate gom việc tải những quan hệ LAZY đủ điều kiện trong context, thường qua SELECT với tập ID thay vì từng ID một. Số query phụ thuộc quan hệ chưa tải, số ID khác nhau, context/cache và cách truy cập; không phải mọi list chỉ một query tổng. `hibernate.jdbc.batch_size` gom các lệnh ghi JDBC tương thích, không đồng nghĩa batch fetch SELECT.

**Ví dụ thêm:** 36 Category ID chưa tải có thể thành các nhóm16/16/4, ngoài query Product, nếu điều kiện batch phù hợp. Đề không bắt tính ví dụ này.

**Chấm nghiêm:** “Size16 luôn chỉ có một SQL” hoặc dùng JDBC batch để bảo đảm sửa N+1 đọc mất điểm cơ chế tương ứng.

### Câu 5 — Dựng DTO từ scalar được chọn

**Đáp án đủ ý:**

```sql
select new com.shopcore.product.dto.ProductResponse(p.id, p.name, c.name)
from Product p join p.category c
```

Constructor DTO class phải khớp ba giá trị/kiểu theo đề. DTO này chứa id/name/categoryName scalar, không chứa entity Category/proxy để Jackson tiếp tục lazy-load. Nếu DTO nhận cả entity thì không được suy ra tính chất đó.

**Chấm nghiêm:** Chỉ `select p` rồi gọi đó là constructor projection sai. Chọn nhầm field hoặc thứ tự làm sai constructor/kết quả vẫn trừ; không bắt thuộc package nếu mô tả rõ constructor và ba trường đúng.

### Câu 6 — Read model khác entity đang được quản lý

**Đáp án đủ ý:** Endpoint chỉ đọc ít cột có thể dùng DTO projection để lấy đúng field cho response. Endpoint cập nhật bằng dirty checking cần Product là managed entity trong transaction để Hibernate theo dõi thay đổi. DTO projection không phải managed entity nên không thay toàn bộ entity trong nghiệp vụ ghi.

**Chấm nghiêm:** “DTO setter là Hibernate tự update” sai dirty checking. Nói đọc luôn bắt buộc DTO projection cũng quá tuyệt đối: đây là lựa chọn phù hợp, không phải duy nhất; nhận phương án có lý do đúng theo đề.

### Câu 7 — Giảm SQL nhưng mất root là lỗi chức năng

**Đáp án đủ ý:** Không đạt vì hợp đồng ban đầu có Product3 nhưng INNER JOIN bỏ nó khi Category null. Đổi LEFT JOIN FETCH và map categoryName null an toàn. Kiểm tập ID/content vẫn1,2,3, null đúng, rồi kiểm query log trước/sau; không chỉ nhìn số query giảm.

**Chấm nghiêm:** Chấp nhận response1,2 là tối ưu thành công mất điểm kết luận tính đúng. Chỉ đổi LEFT mà không kiểm mapper thiếu tiêu chí riêng.

### Câu 8 — Fetch đúng dữ liệu endpoint cần

**Đáp án đủ ý:** Có thể chọn projection ba scalar, hoặc fetch/graph chỉ quan hệ to-one Category rồi map DTO. Không cần Category.products để lấy categoryName. Fetch nhiều collection có thể nhân row và tăng memory/payload xử lý, đồng thời gặp rủi ro ORM hoặc paging collection. So sánh ID/content, null semantics, SQL/row và thời gian trước–sau trong điều kiện tương đương.

**Chấm nghiêm:** Chỉ nói “fetch hết cho tiện” không đủ điểm lựa chọn phù hợp. Phải nêu hai nhóm rủi ro rubric hỏi, không tính “chậm hơn” và “tốn thời gian” là hai lý do độc lập. Chưa yêu cầu trình bày cách paging chi tiết của Lesson03.
