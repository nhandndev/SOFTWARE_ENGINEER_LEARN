# Bài giải và rubric — M2-4 Lesson 02, bản 2026-11-10

[Đề 16 câu](M2-4-perf-jpa__2026-11-10__lesson2-lan2.md). Tổng **80đ**, đạt từ **68/80 = 85%**. Điểm = điểm thô /80 ×100. Đây là điểm lesson, không tự chốt module, benchmark hoặc deliverable.

## Cách chấm

Áp dụng [quy tắc chấm nghiêm](../../Notes/M2_Database/QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md) và chấm theo từng vế công khai. Bản này có 16 câu theo yêu cầu mới, thay số 8 câu của đề cũ.

- Chỉ cộng cho ý đã viết hoặc suy ra trực tiếp; không tự bổ sung thay người học.
- Chấp nhận mô tả đúng bằng lời thay JPQL nếu người học không nhớ cú pháp. Lỗi gõ/import không làm mất điểm bản chất, nhưng nối sai Entity/field, sai join type hoặc sai constructor có thể làm đổi kết quả.
- Mỗi tiêu chí 1đ: đủ 1, đúng một phần 0,5, sai/không có 0; tiêu chí nhiều điểm chia theo ý độc lập đã công khai.
- Không yêu cầu provider internals, exact SQL aliases, cú pháp test/pipeline, paging collection hoặc pool tuning.
- Không mặc định JOIN FETCH là tốt nhất cho mọi câu; chọn giải pháp thay thế hợp lý được chấm theo cùng mục tiêu dữ liệu.
- Lưu snapshot khi chấm; bài giải này không phải bài nộp, không thay điểm bằng việc đọc.
- Các số SQL dưới là dự đoán/đọc báo cáo với giả định của đề, không phải kết quả chạy Hibernate thật trong lượt soạn.

## Câu 1 — Response quyết định nhu cầu tải

**Đáp án:** dropdown cần Product.id/name, không cần Category. Catalog cần thêm Category.name. Có thể giữ mapping LAZY, dùng method/query riêng cho use case cần quan hệ; không cần đổi EAGER toàn hệ thống. Fetch plan là quyết định lấy dữ liệu nào và bằng cách nào để đáp ứng một use case.

**5đ:** nhu cầu hai endpoint đúng, mỗi endpoint **1đ**; không cần EAGER toàn cục **1đ**, giải thích phạm vi method/use case **1đ**; giải nghĩa fetch plan gắn dữ liệu endpoint **1đ**.

Không trừ nếu chọn query Product cho dropdown thay vì projection, miễn không kéo Category không cần thiết. Không cộng đủ ý chỉ vì nói “dùng DTO” mà không nêu dữ liệu cần tải.

## Câu 2 — JOIN lọc không tự fetch

**Đáp án:** chọn Product 10. JOIN cho phép lọc Product theo tên Category Books. Query chọn p, không có fetch, nên không cam kết Category đã initialize; mapper đọc name vẫn có thể phát sinh SELECT bổ sung. Xem SQL log trong request cô lập, tách query Product và query Category khi map, hoặc bộ đếm phù hợp.

**5đ:** Product 10 **1đ**; vai trò JOIN/WHERE **1đ**; không cam kết initialize **1đ**; chọn Product khác fetch Category **1đ**; bằng chứng runtime **1đ**.

Không bắt khẳng định mọi version/provider luôn cùng một số SQL cho JOIN thường. Lỗi bản chất là thấy từ JOIN rồi kết luận chắc chắn không còn tải quan hệ.

## Câu 3 — Method có tồn tại khác method được gọi

**Đáp án:** thêm findAllWithCategory không thay hành vi findAll. Service phải gọi method mới rồi map DTO. JOIN FETCH to-one bắt buộc lấy Category cùng Product; theo dữ kiện chung kỳ vọng một SELECT, mapper không cần SELECT Category riêng. Vẫn dùng Entity bên trong Service và trả DTO, không phải trả Entity cho client.

```java
return productRepository.findAllWithCategory().stream()
        .map(p -> new ProductResponse(
                p.getId(), p.getName(), p.getCategory().getName()))
        .toList();
```

**5đ:** không tự tác động **1đ**; đổi đúng lời gọi **1đ**; một SELECT **1đ**; Category đã được fetch nên không tải riêng **1đ**; vẫn map/trả DTO được **1đ**.

Không yêu cầu tái viết Controller hoặc thêm annotation ở class Service.

## Câu 4 — Inner/left và null-safe mapper

**Đáp án:** inner JOIN FETCH trả Product 10/11, bỏ 12 vì không có Category để match. Để giữ cả ba:

```sql
select p from Product p left join fetch p.category
```

Mapper:

```java
Category category = product.getCategory();
return new ProductResponse(
        product.getId(), product.getName(),
        category == null ? null : category.getName());
```

**5đ:** đúng ID giữ/mất **1đ**, giải thích inner loại dòng thiếu match **1đ**; left join fetch **1đ**; kiểm null trước getter name **1đ**, trả categoryName=null/không tạo Category giả **1đ**.

Chỉ đổi query mà vẫn gọi thẳng getCategory().getName() ở dòng NULL chưa đủ mapper.

## Câu 5 — Graph theo method, không EAGER toàn cục

**Đáp án:** graph yêu cầu tải category cho findAllForCatalog. Nó không tự gắn vào findAllForInternalJob hoặc mọi API. Catalog gọi findAllForCatalog; mapping LAZY chung vẫn giữ được. Annotation không cam kết cứng cùng một SQL trên mọi provider/version; quan sát SQL và response ở môi trường thực tế.

**5đ:** yêu cầu category **1đ**, phạm vi method không lan tự động **1đ**; chọn đúng method và không cần EAGER toàn cục **1đ**; không cam kết SQL cố định **1đ**, xem SQL thực tế **1đ**.

Không yêu cầu nhớ fetch graph/load graph enum hoặc khai báo NamedEntityGraph vì lesson không dạy sâu.

## Câu 6 — Gom các quan hệ LAZY đủ điều kiện

**Đáp án:** khi truy cập một proxy, Hibernate có thể tải nhiều Category proxy chưa initialize trong cùng context bằng SELECT dạng WHERE id IN (...). YAML đặt mặc định batch fetching toàn cục cho các đối tượng đủ điều kiện; annotation ở Category khai báo cho loại Entity Category cần gom tải, không phải chỉ cho một method Service. Với collection có thể đặt @BatchSize tại collection association. Batch không tự buộc tải Category cho endpoint không truy cập quan hệ.

**5đ:** gom các Category chưa tải **1đ**, dạng nhiều ID/IN **1đ**; phạm vi global setting so với Category entity **1đ** (mỗi phía đúng 0,5đ), collection association **1đ**; không tự tải khi không cần **1đ**.

Không nhận “đặt đâu cũng hiệu lực giống nhau”. Không bắt thuộc số 16 hoặc YAML khi đã mô tả đúng setting/annotation cho đọc.

## Câu 7 — Batch đọc khác batch ghi

**Đáp án:** hibernate.jdbc.batch_size là JDBC batching cho thao tác ghi; không phải cấu hình batch fetching các Category LAZY. Chỉ bật nó không chứng minh gom SELECT trong mapper. Dùng default_batch_fetch_size hoặc @BatchSize ở Category; kiểm SQL/bind xem các ID được gom và số SELECT thực tế.

**5đ:** không đủ cơ sở từ JDBC batch **1đ**; JDBC batch gom ghi **1đ**; batch fetching phục vụ đọc quan hệ **1đ**; chọn một cấu hình đọc đúng **1đ**; phép kiểm runtime **1đ**.

Không đòi mô tả INSERT batching/identity generator vì ngoài phạm vi.

## Câu 8 — Đếm trong mô hình đã cho

**Đáp án:** ba SELECT Category theo nhóm 16/16/4; cộng một SELECT Product là **4**. Không batch/cache, 36 Category khác nhau phải tải riêng trong mô hình đề: **37**. Chỉ đọc Product.id/name thì không cần ba batch Category đó; dự đoán một SELECT Product.

Không mặc định 4 trên mọi app: số ID khác nhau cần tải, proxy/context đã có, batch size, cache hoặc chiến lược ORM có thể khác. Đề tính dùng giả định nhóm tối đa đã cho; không cần thuộc implementation.

**5đ:** ba Category + tổng bốn **1đ**; không batch tổng 37 **1đ**; không đọc Category thì không bắt tải batch **1đ**; hai yếu tố thực tế đúng, mỗi yếu tố **1đ**.

Nếu người học nói “không thể đếm chính xác mọi dự án” là lưu ý đúng, nhưng không thay cho phép tính đã được cấp đủ giả định. Không phạt ghi chú padding, cũng không bắt phải nêu padding.

## Câu 9 — Constructor projection trả dữ liệu đã chọn

**Đáp án:**

```sql
select new com.shopcore.product.dto.ProductResponse(p.id, p.name, c.name)
from Product p join p.category c
```

Method trả List<ProductResponse>. Các field trong DTO là Long/String, không phải Product/Category entity hoặc proxy; Jackson đọc chúng không cần gọi getter LAZY trên Category.

**5đ:** constructor projection/class DTO **1đ**; chọn field đúng thứ tự **1đ**; FROM Product và JOIN quan hệ đúng **1đ**; không trả managed Product/Category proxy trong DTO scalar này **1đ**; serialize không cần đọc LAZY nữa **1đ**.

Nhấn “DTO scalar này”: không khái quát mọi DTO đều không bao giờ chứa Entity. Chấp nhận left join trong dữ liệu bắt buộc nếu vẫn trả đúng cả ba và giải thích hợp lý.

## Câu 10 — JPQL và chữ ký constructor

**Đáp án sửa:**

```sql
select new com.shopcore.product.dto.ProductResponse(p.id, p.name, c.name)
from Product p join p.category c
```

Ba lỗi: products là tên bảng, không phải Entity Product; DTO tên rút gọn chưa có import được đăng ký nên dùng tên đầy đủ; tham số đang String/Long/String không khớp constructor Long/String/String.

**5đ:** phát hiện mỗi lỗi **1đ**, tổng **3đ**; query/mô tả sửa nhất quán **1đ**; JPQL theo Entity/field Java chứ không bảng/cột SQL **1đ**.

Package đã cho, không biến nhớ package thành bài kiểm tra trí nhớ. Khi trả bằng lời cần nói đúng cả ba chỗ, không chỉ nói “sai cú pháp”.

## Câu 11 — Projection không làm inner thành left

**Đáp án:** query hiện tại trả 10/11, không có 12. DTO không thay đổi quy tắc JOIN. Đổi thành:

```sql
select new com.shopcore.product.dto.ProductResponse(p.id, p.name, c.name)
from Product p left join p.category c
```

Dòng Product 12 được dựng DTO với categoryName=null. Không có mapper từ Product.getCategory() để lấy name thêm vì query đã chọn c.name vào constructor.

**5đ:** không tự giữ dòng vì DTO **1đ**, đúng ID **1đ**; left join **1đ**, categoryName=null **1đ**; không cần đọc Entity LAZY thêm sau projection **1đ**.

Không yêu cầu viết coalesce hoặc thay null thành chuỗi vì API đang quy định null.

## Câu 12 — DTO không được dirty checking như Product

**Đáp án:** ProductResponse không phải entity managed. Setter chỉ đổi object DTO, không tự tạo UPDATE products lúc commit. Muốn dirty checking: gọi findById để có Product managed trong transaction, setName trên Product; thay đổi entity được đồng bộ theo ORM khi flush/commit hợp lệ. API đọc có thể dùng projection, nghiệp vụ ghi dùng managed entity; không bắt một query/kiểu trả về dùng cho mọi mục đích.

**5đ:** không tự UPDATE **1đ**; DTO không managed **1đ**; lấy Product bằng findById **1đ**; sửa managed entity trong transaction **1đ**; đọc/ghi có thể chọn cách khác **1đ**.

Không yêu cầu gọi save nếu đang chứng minh đúng dirty checking trong transaction đã cho. Nếu đề xuất save có quy trình hợp lý vẫn xét tiêu chí, nhưng không được coi setter DTO là tự persist.

## Câu 13 — Chọn theo nhu cầu, nêu lý do

**Đáp án ví dụ:** danh sách read-only ba field dùng DTO projection để chọn đúng field; nghiệp vụ rule/update dùng managed Product và fetch đủ Category bằng JOIN FETCH hoặc graph; luồng nhiều LAZY trong context có thể dùng batch để giảm lượt SELECT lẻ. Batch vẫn có thể tải Category ở các query sau query Product, không giống yêu cầu fetch cùng query của JOIN FETCH. DTO projection không thay entity managed cho mọi nghiệp vụ ghi.

**5đ:** mỗi lựa chọn gắn lý do phù hợp **1đ**, tổng **3đ**; batch không phải luôn lấy hết cùng query Product **1đ**; không thay tất cả entity bằng DTO khi ghi **1đ**.

Chấp nhận fetch to-one/graph rồi map DTO cho danh sách đọc nếu giải thích dữ liệu vừa đủ. Không bắt một pattern “tốt nhất”. Chọn projection cho rule cần cập nhật phải có bước lấy/sửa entity phù hợp mới thỏa use case.

## Câu 14 — Dữ liệu thừa và row multiplication

**Đáp án:** chỉ tải Product và Category.name bằng fetch to-one/graph phù hợp hoặc projection ba field, không cần Category.products/collection không dùng. Hai rủi ro ví dụ: JOIN nhiều to-many nhân số row; lượng dữ liệu truyền/memory tăng; hoặc gặp giới hạn ORM khi fetch một số cấu trúc collection. Một SQL không chứng minh ít row, nhẹ hơn hoặc latency tốt hơn.

**5đ:** chọn cách hợp lý **1đ**, chỉ đúng dữ liệu lấy/không lấy **1đ**; hai rủi ro phân biệt, mỗi ý **1đ**; query count không thay row/data/time **1đ**.

Không bắt exception name hoặc một phép tính Cartesian cụ thể chưa dạy. Không tính hai lần cùng một ý “row nhiều” nếu chỉ lặp lại, nhưng row multiplication và memory/băng thông là hậu quả khác được giải thích rõ thì chấp nhận.

## Câu 15 — Đúng kết quả trước, performance sau

**Đáp án:** không duyệt: mất Product 12 làm sai API dù giảm SELECT. Sửa left join fetch và mapper null-safe; Product 12 giữ categoryName=null, không gán Category giả. Sau khi response đúng, cần đo latency request trước/sau trong điều kiện tương đương mới kết luận nhanh hơn.

**5đ:** không duyệt vì sai dữ liệu **1đ**, chỉ rõ mất Product 12 trái yêu cầu **1đ**; left join fetch **1đ**, mapper null-safe **1đ**; đo thời gian/latency request **1đ**.

Không đòi kể lại ba query ban đầu vì đề đã nói không hỏi. Không nhận cách xóa dữ liệu Product 12 hoặc đổi hợp đồng chỉ để giữ số query đẹp.

## Câu 16 — Một kế hoạch có thể kiểm lại

**Đáp án ví dụ, chọn DTO projection:**

1. Chốt id/name/categoryName, chuẩn bị Product có Category và Product NULL.
2. Dùng repository projection left join; Service gọi đúng method trả DTO, không cần mapper đọc Entity nữa.
3. So ID/số dòng, field/giá trị và categoryName=null của Product thiếu Category.
4. Xem SQL count cùng số row/dữ liệu trả; đo latency request. Ít query nhưng mất dữ liệu hoặc query lớn không đủ chứng minh tốt.
5. Giữ dữ liệu và context/cache tương đương; cô lập workload và giữ điều kiện runtime liên quan.

**5đ:** mỗi bước đáp ứng vế tương ứng **1đ**. Vế 5 chỉ cần hai điều kiện phù hợp, không bắt liệt kê hết ví dụ.

Với JOIN FETCH: cần left join và mapper null-safe, gọi đúng repository method. Với graph: xác minh SQL/join semantics thực tế và giữ Product NULL, không coi annotation tự đảm bảo mọi kết quả. Với batch: query lấy root không làm mất Product NULL, mapper null-safe, cấu hình batch và đo số lượt. Tất cả có thể đạt nếu nhất quán.

Không bắt quan sát endpoint cải thiện ngay trong máy ở lượt làm đề lý thuyết; chỉ không tự ghi là đã benchmark thật.

## Nguồn kiểm kỹ thuật

- [Hibernate HQL: association fetching](https://docs.hibernate.org/orm/7.1/querylanguage/html_single/#hql-explicit-fetch-join).
- [Spring Data JPA: EntityGraph](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.entity-graph).
- [Hibernate BatchSize](https://docs.hibernate.org/orm/7.1/javadocs/org/hibernate/annotations/BatchSize.html).
- [Spring Data JPA: projections](https://docs.spring.io/spring-data/jpa/reference/repositories/projections.html).

Đọc cùng [bài học](../../Notes/M2_Database/M2_4_Performance/LESSON_02_FETCH_JOIN_ENTITYGRAPH_BATCH_DTO.md) và [bảng coverage/QA bản đề này](../../Notes/M2_Database/M2_4_Performance/QUALITY_REVIEW_LESSON_02_EXAM_2026_11_10.md).
