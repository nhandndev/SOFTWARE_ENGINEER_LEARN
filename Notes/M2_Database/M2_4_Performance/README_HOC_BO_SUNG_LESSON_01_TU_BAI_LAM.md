# Học bổ sung M2-4 Lesson 01 — Từ bài làm của bạn đến cách kiểm chứng

> Ngày 2026-11-01. Dựa trên câu 1, 2, 3, 4, 6 bạn đã làm và kiến thức câu 5, 7, 8 còn trống. Đây là bài phụ để hiểu và quay lại đề chính, không phải lesson mới hoặc yêu cầu thi thêm.

- [Bài nộp đã chụp lại](../../../Exams/nhan-xet/archive/M2-4-perf-jpa__2026-11-01__lesson1-lan2__2026-11-01__BAI_NOP_CHAM_TAM_1.md).
- [Nhận xét từng câu và điểm](../../../Exams/nhan-xet/M2-4-perf-jpa__2026-11-01__lesson1-lan2__NHANXET.md).
- [Đề đang làm](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-11-01__lesson1-lan2.md).
- [Bài học gốc](LESSON_01_N_PLUS_1_VA_SQL_LOG.md).

## 1. Bạn đã hiểu gì, thực sự còn thiếu gì?

| Nội dung | Bằng chứng từ bài của bạn | Việc cần làm |
|---|---|---|
| LAZY chưa tải tên Category | Câu 1, 2 nói rõ phải đọc name mới tải thêm | Giữ cách hiểu này |
| Một repository call có nhiều SQL | Câu 1 đếm 1 Product + 3 Category | Phân biệt dự đoán bằng code với xác nhận bằng log |
| Context dùng lại Category đã tải | Câu 3 giải thích Category 1 không phải query hai lần | Thêm bằng chứng quan sát |
| EAGER không chắc một JOIN | Câu 4 không nhận cam kết một JOIN | EAGER là tải quan hệ đó, không phải toàn bộ graph DB |
| Dropdown không cần Category | Câu 6 chỉ map id/name | Sửa tên kiểu trả về và biết kiểm log |
| FK đổi thành 2 thì đọc gì? | Câu 2 biết đi theo FK nhưng chưa chốt Category id=2 | Đọc theo khóa khác cập nhật khóa |
| N+1 và lỗi session đóng | Câu 5 trống | Học mục 5 dưới |
| Statistics và query nền | Câu 7 trống | Học mục 6 dưới |
| Ít query nhưng đúng/chậm thế nào | Câu 8 trống | Học mục 7 dưới |

**Không hiểu nhầm điểm:** 22,5/25 = 90% chỉ tính năm câu đã làm. Không phải điểm hoàn thành Lesson 01. Câu trống chưa được chấm, không kết luận bạn đã trả lời sai các câu đó.

## 2. Câu 2: tìm Category theo khóa, không phải “đổi Category”

Bạn viết: “Hibernate sẽ tìm khoá ngoại của Product là Category để mà đổi thôi”.

Bạn đã nhận ra FK quyết định quan hệ, nhưng câu hỏi đang hỏi **đọc theo khóa nào**, không yêu cầu cập nhật dữ liệu.

Giả sử DB đã được chuẩn bị trước request như sau:

| Product.id | Product.name | Product.category_id |
|---:|---|---:|
| 10 | Java Book | 2 |

Context mới của request chưa có Category 2. Query Product mang về:

```text
Product id = 10
Product name = Java Book
Tham chiếu Category có id = 2
Chưa có Category.name
```

Khi mapper đọc:

```java
product.getCategory().getName()
```

Hibernate cần dữ liệu Category đang được tham chiếu, tương đương:

```sql
SELECT id, name
FROM categories
WHERE id = 2;
```

Nếu Category 2 tên Electronics, giá trị trả về là Electronics, dù tên Product vẫn là Java Book. Product id=10 và Category id=2 là khóa của **hai bảng khác nhau**.

Không có bước tự UPDATE Product hoặc “đổi Category” chỉ vì gọi getter. Việc thay FK trong dữ kiện câu hỏi được xem là đã làm trước request; getter đang đọc kết quả liên kết đó.

**Câu trả lời gọn:** “Hibernate dùng category_id=2 của Product để tìm Category có id=2, rồi lấy name.”

Lưu ý lời “Query Product chỉ đem về id” của bạn ở câu 2: trong ngữ cảnh so sánh Category, mình hiểu là chỉ biết **ID Category**, nên không trừ nhầm phần này. Query vẫn lấy Product.id và Product.name như bạn đã nói đúng ở câu 1.

## 3. Câu 3 và 6: dự đoán đúng rồi, kiểm log cụ thể ra sao?

### 3.1. Dự đoán và bằng chứng là hai việc khác nhau

Bạn nói cần SQL log mới biết, không nhìn code Java mà đoán. Chỉnh cho chính xác:

- **Code + mapping + dữ liệu + giả định** cho phép dự đoán có căn cứ.
- **SQL log/phép đo** kiểm tra dự đoán có đúng ở runtime không.

Ở câu 1, bạn đã dự đoán đúng 4 SELECT từ code. Không cần phủ nhận khả năng suy luận đó. Khi môi trường thật thiếu thông tin về cache/fetch plan thì càng cần đo.

### 3.2. Cách quan sát đơn giản

Trong profile dev, có thể dùng cấu hình bài gốc:

```yaml
logging:
  level:
    org.hibernate.SQL: DEBUG
    org.hibernate.orm.jdbc.bind: TRACE
```

SQL cho biết truy vấn vào bảng nào. Bind cho biết giá trị thay cho dấu ?. Không bật bind TRACE bừa ở production vì có thể lộ dữ liệu nhạy cảm. Tên logger là phần tra cứu, không cần học thuộc.

Để quan sát một request:

1. Chuẩn bị đúng bảng dữ liệu câu hỏi.
2. Dùng context mới/chưa tải Category; tránh request hoặc job nền trong khoảng quan sát.
3. Chỉ gọi endpoint một lần.
4. Đọc các SELECT xuất hiện trong khoảng request; phân biệt SELECT Product và SELECT Category.
5. Đối chiếu tổng số và Category ID thực sự được tải với dự đoán.

**Context mới không có nghĩa phải xóa database.** Đừng chạy script reset dữ liệu, DROP hoặc clear mọi cache trên hệ thống dùng chung để thử bài.

### 3.3. Câu 3: mong đợi 3 SELECT

Bảng có Category ID theo thứ tự minh họa 1, 1, 2. Khi không batch/cache cấp hai và context ban đầu rỗng:

```sql
SELECT id, name, category_id FROM products;
SELECT id, name FROM categories WHERE id = 1;
SELECT id, name FROM categories WHERE id = 2;
```

Đây là SQL minh họa, alias/thứ tự/cột thực tế có thể khác. Điểm cần thấy là **một SELECT Product và hai SELECT Category**, không có SELECT Category 1 thứ hai do lần map Product 11 trong cùng context.

Bạn đã giải thích đúng cơ chế dùng lại, nhưng vế 3 đang hỏi “bằng chứng nhìn ở đâu”. Câu “nếu chưa có trong context thì query” vẫn là giải thích cơ chế, chưa phải cách kiểm.

**Câu trả lời bổ sung:** “Gọi một request riêng, xem SQL log và bind: có một SELECT Product, một SELECT Category id=1, một SELECT Category id=2.”

### 3.4. Câu 6: mong đợi không có SELECT Category

Mapper dropdown chỉ cần:

```java
@Transactional(readOnly = true)
public List<ProductOptionResponse> listSimple() {
    List<Product> products = productRepository.findAll();

    return products.stream()
            .map(product -> new ProductOptionResponse(
                    product.getId(), product.getName()))
            .toList();
}
```

Đoạn này đặt trong ProductService có ProductRepository được inject; các DTO/Entity là class đã cho trong đề. Không phải project chạy độc lập.

**Bạn làm đúng phần quan trọng:** không gọi getter lấy tên Category. Với LAZY và không tác nhân khác truy cập quan hệ, mong đợi **1 SELECT Product, 0 SELECT Category**.

Trong bài, method khai báo List<SimpleProductResponse> nhưng tạo ProductOptionResponse. Nếu đây là hai class khác nhau thì code không compile. Sửa kiểu trả về như snippet trên. Đây là lỗi nhất quán tên kiểu khi viết code, **không trừ thêm ngoài rubric câu 6** vì đề cho phép trả lời bằng ý tưởng mapper.

**Câu trả lời vế log:** “Trong một request riêng, kiểm có SELECT products nhưng không có SELECT categories, response vẫn đủ id/name.”

Đừng chỉ nhìn JSON: JSON đúng vẫn có thể được tạo bằng quá nhiều SQL.

## 4. Câu 4: tải sớm khác gom thành một query

Bạn nói EAGER “tải hết” và chưa chắc một JOIN: phần chính đúng.

Nói chuẩn hơn: EAGER yêu cầu tải **quan hệ được đánh dấu EAGER**, không phải tự tải mọi bảng hoặc mọi tầng quan hệ của hệ thống. LAZY trì hoãn tải dữ liệu quan hệ đến khi cần; trong đề, mapper cần Category.name.

Ba câu cần tách:

```text
Cần dữ liệu nào?       -> categoryName để tạo DTO.
Tải vào lúc nào?       -> LAZY/EAGER và thời điểm truy cập.
Tải bằng bao nhiêu SQL? -> fetch plan và SQL thực tế.
```

Bạn nhắc thường tự viết JOIN. Đó là hướng chủ động lấy dữ liệu, nhưng **JOIN bình thường và fetch quan hệ cho Entity không luôn là một việc**. Bài sau mới học fetch join/DTO projection rõ hơn; ở bài này không cần viết cách sửa.

## 5. Câu 5 chưa làm: transaction, DTO và session đóng

Không coi phần này là lỗi bạn đã mắc: bạn chưa viết câu trả lời. Mình giảng trước để bạn tự làm lại đề.

### 5.1. Đọc LAZY trong Service còn context mở

Xét ba Product có ba Category khác nhau và các giả định của đề:

```text
Controller gọi Service qua Spring proxy
-> transaction/context mở
-> repository lấy Product bằng 1 SELECT
-> mapper đọc Category.name
-> Hibernate tải Category chưa có bằng 3 SELECT
-> tạo DTO có sẵn categoryName dạng String
-> Service trả về
-> context của Service đóng
-> Jackson đọc các field DTO để tạo JSON
```

Ý nghĩa từng đoạn:

- Transaction/context còn mở cho Hibernate một phạm vi để tải dữ liệu quan hệ.
- Mapper tạo DTO không phải phép biến đổi “miễn phí”: getter được mapper gọi có thể làm chạy SQL.
- Khi DTO đã chứa String categoryName, Jackson không cần đi qua proxy Category để lấy tên nữa.

Vì vậy có thể **không lỗi serialize nhưng vẫn có N+1**. @Transactional(readOnly=true) không tự biến bốn SELECT thành một.

### 5.2. Trả Entity, để Jackson đọc sau khi Service đóng

Theo đúng đề: OSIV tắt, Category chưa tải, không cơ chế tải ngoài session, Jackson thực sự đọc name.

```text
Controller gọi Service
-> Service mở context
-> repository lấy Product; Category chưa tải
-> Service trả List<Product>
-> context của Service đóng
-> Controller trả List<Product>
-> Jackson serialize và truy cập Category.name
-> dữ liệu chưa có nhưng không còn session để tải
-> lỗi khởi tạo quan hệ LAZY
```

Lỗi thường được gọi LazyInitializationException và có thể được bọc bởi lỗi serialize. Bạn không cần thuộc tên mới được điểm; nói “đọc Category chưa tải khi session đã đóng nên không tải thêm được” là đủ ý.

Không nói “Entity nào cũng chắc chắn lỗi”. Nếu quan hệ cần đọc đã được tải trước đó, hoặc serializer không đọc nó, kết quả có thể khác. Đề đã cho đủ điều kiện để không phải đoán.

### 5.3. Bảng nhớ ngắn

| Trạng thái lúc đọc name | Có thể xảy ra theo đề |
|---|---|
| Chưa tải, context mở | Tải thêm SQL; có thể N+1 |
| Chưa tải, không session hỗ trợ | Lỗi đọc LAZY |
| Đã tải trước, sau đó context đóng | Dữ liệu đã có có thể đọc được |
| DTO đã có String categoryName | Serialize DTO không cần tải Category |

**Không đồng nhất session với connection vật lý.** “Session hỗ trợ tải quan hệ” là cách hiểu cần cho bài này; chưa cần học pool HikariCP ngay.

**Khung tự trả lời câu 5:** ở cách A, mô tả SQL trong mapper; ở cách B, nêu thời điểm Jackson đọc và trạng thái session; chốt vì sao DTO không tự sửa fetch plan.

## 6. Câu 7 chưa làm: Statistics đếm chung, không tự nhận ra request của bạn

### 6.1. Ba đại lượng khác nhau

| Đại lượng | Ví dụ | Không phải |
|---|---|---|
| Prepared statement count | 20 statements được thu thập | 20 ms hoặc 20 dòng |
| Latency | Request mất 80 ms | Số query |
| Row count | Query trả 300 dòng | Số statement |

Một SELECT có thể trả hàng nghìn dòng. Nhiều SELECT cũng có thể cùng trả một dòng mỗi lần.

Statistics trong đề là của một SessionFactory; request và job nền cùng dùng nó. Ví dụ minh họa, không phải số liệu đã đo trên máy:

```text
Request list(): 4 statements
Job nền:       16 statements
Cùng cửa sổ:   20 statements
```

Đọc tổng 20 không cho bạn biết riêng request bao nhiêu nếu chưa tách được job. Trong thực tế prepared statements cũng không bắt buộc toàn là SELECT.

### 6.2. clear() reset cái gì?

```java
statistics.clear();
```

Nó reset **thống kê đã thu thập**, không phải:

- xóa Product/Category trong database;
- làm persistence context trở thành rỗng;
- xóa tất cả cache;
- chặn job/request khác chạy sau đó.

Tưởng tượng bạn đặt bộ đếm về 0, nhưng cả request và job vẫn có thể làm số tăng. Reset bộ đếm không tạo hàng rào quanh một request.

### 6.3. Kế hoạch đo vừa đủ cho bài

1. Trên môi trường kiểm, tránh job và request khác dùng chung bộ đếm trong khoảng đo.
2. Chuẩn bị dữ liệu và context/cache theo cùng điều kiện của phép so sánh.
3. Reset statistics, gọi một request.
4. Đọc statement count, đối chiếu SQL log.
5. Muốn nói nhanh/chậm thì đo thời gian riêng.

Hoặc dùng cách theo dõi gắn statement với đúng request; không cần biết tên thư viện tracing để trả lời đề.

**Khung tự trả lời câu 7:** “Không quy 20 cho request vì …; 20 đếm … chứ không phải …; đo lại bằng …; clear không làm …”.

## 7. Câu 8 chưa làm: ít query hơn chưa đủ nói nhanh hơn

### 7.1. Kiểm đúng hợp đồng trước

Endpoint cũ bắt buộc trả id/name/categoryName của ba Product.

| Thay đổi | Kết luận được |
|---|---|
| 4 → 1 SELECT, vẫn đủ field/dòng đúng | Giảm số SELECT trong điều kiện đã kiểm |
| 4 → 1 SELECT, bỏ categoryName bắt buộc | Đổi sai hợp đồng, không phải tối ưu tương đương |
| 1 SELECT, chưa đo thời gian | Chưa chứng minh latency tốt hơn |

Dropdown câu 6 là **endpoint mới có hợp đồng chỉ gồm id/name**. Được thiết kế ít field cho endpoint mới không đồng nghĩa được lén bỏ field của endpoint cũ.

### 7.2. Vì sao một query chưa chắc nhanh hơn?

Ví dụ số giả định để hiểu giới hạn, không phải benchmark:

- Trước: bốn query nhỏ, cả request mất 30 ms.
- Sau: một query nặng/trả quá nhiều dữ liệu, cả request mất 80 ms.

Số query giảm nhưng thời gian tăng là điều có thể xảy ra. Ngược lại, gom query có thể cải thiện đáng kể khi giảm round-trip; cần đo để biết trong use case thật.

Chưa cần thuộc p95 hoặc thiết lập công cụ benchmark ở Lesson 01. Cần nhớ: **query count và latency là hai phép đo khác nhau**.

### 7.3. Điều kiện so sánh và lý do

| Giữ/ghi rõ | Vì sao ảnh hưởng |
|---|---|
| Dữ liệu, số Category ID khác nhau | Số quan hệ thực sự cần tải đổi |
| Context/cache ban đầu | Entity đã có có thể được dùng lại |
| Fetch/batch config | Cách tải/gom quan hệ khác nhau |
| Transaction/session và chỗ map DTO | Có thể tải được hoặc lỗi khi truy cập LAZY |
| Workload cô lập | Job/request khác gây nhiễu |
| Hợp đồng response | Bỏ field/dòng không phải cùng bài toán |

Câu 8 chỉ cần hai điều kiện với lý do, không phải chép cả bảng.

## 8. Tự kiểm ngắn sau khi đọc, không phải bài thi bắt buộc

Có thể trả lời bằng miệng. Mỗi câu tự đối chiếu 5đ, không cộng vào điểm đề chính.

1. Product 50 có category_id=8, Category 8 chưa tải. Gọi getter name trong context mở: Hibernate đọc bảng nào, khóa nào; có tự UPDATE FK không? **(5đ)**
2. Map DTO trong context mở và trả Entity cho Jackson đọc khi session đóng khác nhau thế nào? DTO có tự hết N+1 không? **(5đ)**
3. Statistics đếm 12 trong lúc request và job dùng chung SessionFactory. Kết luận được gì, chưa được gì; đo lại thế nào? **(5đ)**
4. Endpoint cũ bắt buộc categoryName, một bản sửa giảm query bằng bỏ field này. Được coi là tối ưu đúng chưa? Ít query có đủ chứng minh nhanh hơn không? **(5đ)**

### Đáp án và tiêu chí tự kiểm

1. SELECT Category (**1đ**) theo id=8 (**2đ**), vì cần name chưa có (**1đ**); getter không tự UPDATE FK (**1đ**).
2. Mapper có thể tải thêm khi context mở (**2đ**); Jackson có thể lỗi khi cần dữ liệu chưa tải mà session đóng theo giả định đề (**2đ**); DTO không tự sửa N+1 (**1đ**).
3. 12 là count chung, không quy hết cho request (**2đ**); không phải ms/row (**1đ**); cô lập request/job hoặc tracing theo request (**1đ**); reset statistics không xóa context/cache (**1đ**).
4. Bỏ field bắt buộc là sai hợp đồng (**2đ**), khác endpoint mới thiết kế ít field (**1đ**); count không thay thế đo thời gian (**1đ**); cần cùng điều kiện dữ liệu/context/workload (**1đ**).

## 9. Quay lại bài chính theo thứ tự nào?

1. Câu 2 vế 3: viết rõ Category id=2, không cập nhật FK.
2. Câu 3 vế 3 và câu 6 vế 3: nêu SQL log cần thấy cụ thể.
3. Làm câu 5 theo sơ đồ mục 5.
4. Làm câu 7 theo mục 6.
5. Làm câu 8 theo mục 7.

Bạn không cần viết lại câu 1 và 4 đang đầy đủ. Không có yêu cầu code project/test tự động hoặc học trước HikariCP để hoàn thành bài này.

## Nguồn đối chiếu

- [Hibernate fetching](https://docs.hibernate.org/orm/7.1/userguide/html_single/#fetching): đối chiếu thời điểm tải và SQL phụ; đọc cùng mục 1–6 của bài gốc.
- [Statistics API](https://docs.hibernate.org/orm/7.1/javadocs/org/hibernate/stat/Statistics.html): tra ý nghĩa counter và reset, không học thuộc danh sách API.
- Video tùy chọn: tìm “Hibernate N+1 SQL log lazy initialization DTO”; chọn video có hiển thị code và SQL cùng lúc, không chỉ đổi annotation rồi kết luận.

Các SQL/log/số thời gian trong bài là minh họa với giả định được nêu, chưa chạy Hibernate/DB hoặc benchmark trong lượt này.
