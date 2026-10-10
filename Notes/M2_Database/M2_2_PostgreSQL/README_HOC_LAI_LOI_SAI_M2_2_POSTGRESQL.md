# M2-2 PostgreSQL: ôn những lỗi đã mắc và phần còn thiếu

> Tổng hợp ngày 2026-10-10 từ snapshot chấm cả 4 lesson. Đây là tài liệu ôn cá nhân, không phải danh sách khẳng định bạn vẫn sai tất cả. Không yêu cầu làm thêm đề/project chỉ để được công nhận lại các lesson đã đạt.

## 1. Đọc phần nào trước?

| Bài | Điểm mới nhất | Phần còn thiếu trong bài cuối |
|---|---:|---|
| Lesson 01 | 97,5/100 | CHECK chấp nhận NULL khi thiếu NOT NULL |
| Lesson 02 | 100/100 | Không còn thiếu theo rubric; ôn FK, count và SET/WHERE để nhớ lâu |
| Lesson 03 | 97,5/100 | Aborted khác rollback hoàn tất; transaction riêng khác ranh giới chung |
| Lesson 04 | 96,25/100 | Kiểm soát sort động; giải thích chi phí/khóa VACUUM FULL |

Ưu tiên mục **2, 5, 6, 9 và 11**. Các mục khác là lỗi từng mắc đã sửa hoặc lưu ý không trừ điểm, không phải điểm yếu mới do AI tự thêm.

## 2. CHECK không tự cấm NULL

**Lesson 01 câu 3: còn thiếu.** Bạn biết CHECK kiểm giá dương nhưng chưa kết luận rõ khi bỏ NOT NULL.

```sql
price NUMERIC(12,2) CHECK (price > 0)
```

| Input | price > 0 | CHECK nhận? |
|---|---|---|
| 100 | TRUE | Có |
| 0 | FALSE | Không |
| -5 | FALSE | Không |
| NULL | UNKNOWN/NULL | Có |

Không phải “không viết được phép so sánh NULL”. Viết được nhưng kết quả không phải TRUE/FALSE thông thường. Muốn giá bắt buộc và dương:

```sql
price NUMERIC(12,2) NOT NULL CHECK (price > 0)
```

**Nhớ:** CHECK chặn điều kiện FALSE; NOT NULL chặn giá trị NULL. [PostgreSQL Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html).

## 3. Xóa Category không mặc định xóa Product

**Lesson 02 câu 5: từng sai, đã sửa.** CASCADE là lựa chọn nghiệp vụ, không phải cách duy nhất để hết lỗi FK.

```text
Category 1 <- Product 10 đang tham chiếu
DELETE Category 1, FK mặc định không có ON DELETE CASCADE
-> DB chặn việc xóa; không tự xóa Product 10
```

Có thể từ chối xóa, chuyển Product sang Category khác, đặt FK=NULL nếu cho phép, hoặc thiết kế xóa con. Chọn theo nghiệp vụ, không bật CASCADE máy móc.

Lưu ý đã sửa ở Lesson 01: PRIMARY KEY cấm NULL và trùng; IDENTITY chỉ cấp số. [PostgreSQL Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html).

## 4. UPDATE 0 khác lỗi; WHERE khác SET

**Lesson 02 câu 3–4, 7–8: đã sửa đủ.** Ví dụ giả sử Product 10 có giá 120; Product 999 và Category 999 không tồn tại. Các lệnh độc lập, không có trigger đặc biệt:

```sql
UPDATE products SET price = 130 WHERE id = 999;
-- Count 0: không khớp Product.

UPDATE products SET price = price WHERE id = 10;
-- Count 1: cập nhật một dòng dù giá vẫn là 120.

UPDATE products SET category_id = 999 WHERE id = 10;
-- Lỗi FK: Product có, Category đích không có.
```

**WHERE chọn dòng; SET gán giá trị.** Count là số dòng được cập nhật, không phải số cột hoặc chỉ số giá trị khác trước. Count 0 không tự là HTTP 404: Repository trả kết quả, Service diễn giải theo nghiệp vụ, handler ánh xạ response.

```text
A SELECT Product 10 -> có
B DELETE Product 10 -> count 1
A DELETE Product 10 -> count 0
```

SELECT trước đó không bảo đảm dòng còn khi ghi. [PostgreSQL UPDATE](https://www.postgresql.org/docs/current/sql-update.html).

## 5. Transaction bị lỗi chưa có nghĩa đã kết thúc rollback

**Lesson 03 câu 4: còn thiếu 0,5 điểm.** Giả sử không dùng savepoint và lỗi CHECK xảy ra trong transaction SQL tường minh:

```text
BEGIN
-> INSERT Category hợp lệ, chưa commit
-> INSERT Product giá 0, lỗi CHECK
-> transaction aborted: không tiếp tục bình thường
-> client gửi ROLLBACK
-> transaction kết thúc, thay đổi chưa commit bị hủy
```

**Aborted là trạng thái lỗi; ROLLBACK là thao tác kết thúc/hủy.** Với Spring, transaction manager có thể làm bước rollback giúp bạn khi đúng boundary và quy tắc. [PostgreSQL Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html).

## 6. Hai transaction riêng không có một lần commit chung

**Lesson 03 câu 5: kết luận đúng, lý do cần sửa.** Không phải “transaction này không được đụng transaction kia vì isolation”.

```text
Không có transaction Service bao ngoài:
T1 lưu Category -> COMMIT
T2 lưu Product lỗi -> ROLLBACK T2
-> Category của T1 vẫn còn.

Có transaction chung bao hai thao tác:
BEGIN -> lưu Category -> lưu Product lỗi -> ROLLBACK chung
-> không giữ Category mới.
```

Nguyên nhân là **ranh giới commit/rollback**, không phải hai transaction tuyệt đối không được truy cập cùng dữ liệu. Isolation là câu chuyện kiểm soát tương tác đồng thời, không biến hai lần commit thành một.

Trong Spring, ví dụ cần một method Service được gọi qua proxy, dùng transaction manager phù hợp và các thao tác tham gia cùng transaction. Annotation nằm trong code không đủ nếu lời gọi không được intercept. [Spring @Transactional](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html).

## 7. Dirty checking, save, flush và commit không đồng nghĩa

**Lesson 03: bạn từng hỏi trực tiếp vì bị nhầm; đây là củng cố, không tính thêm lỗi mất điểm.**

| Khái niệm | Ý nghĩa |
|---|---|
| Entity managed | Entity đang được persistence context quản lý |
| Dirty checking | Hibernate phát hiện thay đổi của entity managed |
| save() | Spring Data JPA thực hiện persist/merge tùy entity |
| flush | Đồng bộ thay đổi xuống DB bằng SQL |
| commit | Xác nhận transaction DB |

Ví dụ khái niệm, giả sử method gọi qua proxy và Product có setter:

```java
@Transactional
public void rename(Long id) {
    Product product = productRepository.findById(id).orElseThrow();
    product.setName("New name");
    // Entity managed: thay đổi có thể được phát hiện khi flush.
}
```

Không cần save lại chỉ để Hibernate nhận ra thay đổi của entity managed này. Nhưng không suy ra sửa object bất kỳ cũng tự lưu. Với IDENTITY, INSERT có thể chạy sớm để lấy ID: đừng thuộc máy móc “save luôn chỉ nằm trong RAM”. **SQL đã chạy vẫn chưa chứng minh commit.** [Hibernate Flushing](https://docs.hibernate.org/orm/current/userguide/html_single/#flushing).

## 8. Dependency, cấu hình và tham số làm ba việc khác nhau

**Lesson 04 câu 2–4: các ý chính đã sửa.**

```text
spring-boot-starter-data-jpa -> hạ tầng JPA/repository
org.postgresql:postgresql   -> driver JDBC PostgreSQL
application.yml            -> cấu hình URL, user, password...
```

JpaRepository là interface, không phải tên dependency. YAML không tải thư viện. JDBC thuần không bắt buộc JPA starter.

```text
sku = input -> bind giá trị bằng ?/:sku
"price DESC" -> cấu trúc thứ tự, không biến thành SQL bằng bind
```

Derived query và JPQL dùng tham số không đồng nghĩa tự nối input vào SQL. `Product` trong JPQL là entity, không phải tên bảng. [Spring Data JPA Query Methods](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html).

## 9. Sort cố định khác cho client chọn sort

**Lesson 04 câu 4: còn thiếu 0,5 điểm.** Method `findBySkuOrderByPriceDesc` an toàn cho thứ tự cố định, nhưng chưa giải thích cách nhận lựa chọn `name,asc` từ client.

```text
Client: sort=price,desc
-> field phải thuộc {name, price}
-> direction phải thuộc {asc, desc}
-> tạo Sort.by(DESC, "price") bằng lựa chọn đã kiểm tra
-> truyền xuống Repository

Client: sort=unknownField,anything
-> từ chối theo contract, ví dụ HTTP 400
```

Không đưa input tùy ý thành đoạn SQL. API chỉ hỗ trợ một thứ tự cố định cũng hợp lý, nhưng phải nói rõ contract thay vì hứa hỗ trợ sort tùy chọn. [Spring Data JPA Sorting](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html).

## 10. Gap và race là hai vấn đề khác nhau của ID

**Lesson 04 câu 6: đã sửa đủ 5/5.**

```text
Gap: A lấy sequence 1 rồi rollback -> B có thể nhận 2.
Race: A và B cùng đọc MAX=10 -> cùng tự tính ID=11.
```

Gap khiến ID không dùng để đếm số dòng thành công. Race khiến MAX+1 không an toàn để tự cấp ID. Dùng sequence/identity cấp số và PK/UNIQUE bảo vệ duy nhất. Muốn đếm dòng hiện có thì dùng COUNT phù hợp, không dùng ID lớn nhất; COUNT hiện tại cũng không phải lịch sử mọi lần tạo.

[PostgreSQL Sequence Functions](https://www.postgresql.org/docs/current/functions-sequence.html).

## 11. VACUUM không phục hồi giá; FULL có chi phí

**Lesson 04 câu 8: đã sửa phần commit và không gian; thiếu 1 điểm vì bản cuối bỏ lý do khóa/chi phí FULL.** Bản trước bạn đã viết được lý do đó, nên đây là thiếu trong câu trả lời cuối, không phải chưa từng hiểu.

| Việc | Mục đích |
|---|---|
| ROLLBACK trước commit | Hủy transaction chưa commit |
| Cập nhật bù sau commit | Sửa dữ liệu bằng transaction mới |
| VACUUM thường | Dọn phiên bản hết cần, tái sử dụng chỗ trong bảng |
| VACUUM FULL | Viết lại bảng để thu gọn file |

FULL lấy khóa ACCESS EXCLUSIVE trên bảng xử lý, cản đọc/ghi bảng đó, cần dung lượng tạm và I/O. Không phải khóa toàn database; không dùng tùy tiện như bảo trì thường xuyên mặc định.

VACUUM thường chủ yếu không thu nhỏ file nhưng có ngoại lệ thu hồi page trống cuối bảng. Cả hai không xóa phiên bản vẫn cần cho MVCC và không khôi phục giá cũ. “Rollback thủ công” sau commit nên gọi rõ là cập nhật bù, không phải ROLLBACK transaction cũ. [PostgreSQL Routine Vacuuming](https://www.postgresql.org/docs/current/routine-vacuuming.html).

## 12. Ôn khoảng 25 phút, không cần học lại toàn module

| Thời gian | Việc ôn | Tự nói lại được |
|---|---|---|
| 5 phút | Mục 2 | Vì sao CHECK(price > 0) vẫn nhận NULL? |
| 8 phút | Mục 5–7 | Aborted/rollback; transaction chung; flush/commit |
| 5 phút | Mục 9 | Xử lý price,desc và input không được phép |
| 5 phút | Mục 11 | Vì sao FULL không nên chạy thường xuyên? |
| 2 phút | Mục 4, 10 | Count 0 khác lỗi; gap khác race |

Không phải thuộc câu chữ. Chỉ cần giải thích kết quả và nguyên nhân bằng lời của bạn. Bảng điểm này không chứng minh đã thực hành DB thật hoặc tự xác nhận deliverable.

## 13. Nguồn bài làm cá nhân

- [Nhận xét Lesson 01](../../../Exams/nhan-xet/M2-2-postgres__2026-10-05__lesson1-lan1__NHANXET.md).
- [Nhận xét Lesson 02](../../../Exams/nhan-xet/M2-2-postgres__2026-10-05__lesson2-lan1__NHANXET.md).
- [Nhận xét Lesson 03](../../../Exams/nhan-xet/M2-2-postgres__2026-10-05__lesson3-lan1__NHANXET.md).
- [Nhận xét Lesson 04](../../../Exams/nhan-xet/M2-2-postgres__2026-10-05__lesson4-lan1__NHANXET.md).
- [Danh mục bài học gốc](README.md).

Các nhận xét là lịch sử theo từng thời điểm; câu “còn Lesson 03–04” trong snapshot cũ không phải trạng thái hiện tại. Tài liệu này giữ điểm mới nhất nhưng không ghi đè lịch sử lỗi.
