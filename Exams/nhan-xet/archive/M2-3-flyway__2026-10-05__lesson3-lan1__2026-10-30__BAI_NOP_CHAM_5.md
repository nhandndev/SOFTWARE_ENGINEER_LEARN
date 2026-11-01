# M2-3 Flyway · Kiểm tra Lesson 03

> LESSON: 8 câu ×5đ =40đ; normalize /40 ×100. Mỗi tình huống độc lập; không cần CLI đã cài.

Các ví dụ dùng PostgreSQL và dữ liệu cần giữ, không hướng dẫn chạy lệnh nguy hiểm trên DB thật. Không cần GitHub Actions YAML, SQL cleanup hoặc cú pháp cấu hình CLI; chỉ giải thích cơ chế và kế hoạch. Trừ khi câu nói khác, V đã áp dụng thành công được giữ nguyên.

## Câu 1 (5đ)
Startup fail vì password DB sai. Bạn chọn sửa credential hay repair? Nêu ba bằng chứng/cấu hình cần kiểm trước khi xử lý.

**Trả lời:** chọn sửa credential chứ , cái này liên quan đến cấu hình vô database mà . theo cách hiểu của tôi là kiểm tra code có đúng không. kiểm tra URL/DB , kiểm tra USER,pASSWORD ,

## Câu 2 (5đ)
V1 đã chạy trên DB chung. V1 trong Git bị thêm cột description làm checksum mismatch; DB chung vẫn chưa có cột đó, chưa có V2. File V1 sửa chưa được phát hành thành công ở nơi khác. Repair có tự thêm description không? Nêu những gì phải đối chiếu trước khi sửa (file đã phát hành, history, schema thật) và phương án giữ V1 gốc, bổ sung thay đổi mới. Không cần lệnh repair hay viết SQL.

**Trả lời:** Repair không tự thêm descritption , nó chỉ giúp khi mà ở cái migration history thì cái checksum nó bị khác á , nhưng mà sau khi chắc chắn là dungds thì có thể dùng repair để cho nó match lại checksum , nên đối chiếu lại trước khi sửa file đã phát hành, history, schema thật , phương án V1 gôc , bổ sug thay đổi mới 

## Câu 3 (5đ)
V1 đã commit, products có một dòng, chưa có stock. Flyway chạy toàn V2 trong một transaction:

```sql
ALTER TABLE products ADD COLUMN stock INTEGER;
UPDATE products SET stock = -1;
ALTER TABLE products ADD CONSTRAINT ck_stock CHECK (stock >= 0);
```

Lỗi ở lệnh nào và vì sao? Sau rollback, cột stock của V2 và dữ liệu V1 ra sao? Có được suy ra mọi SQL không transactional cũng rollback đầy đủ như vậy không?

**Trả lời:** lỗi constraint khi stocck >=0 mà trước đó bạn đã set stock sẵn là -1 thì nó bị sai thì nó sẽ rollback , rollback V2 thôi thì nó sẽ quya về điểm là lúc chưa có V2 mà chỉ có V1 , không được suy ra mọi SQL không transactional cũng dc rollback đầy đủ mà phỉa namgwf chung transactional thì mới rollback chugn dc 

## Câu 4 (5đ)
DB cũ được xác minh tương đương V1 nhưng chưa có history. Baseline version 1 làm gì? Có chạy SQL V1 và tự kiểm toàn schema không? V2 sẽ ra sao?

**Trả lời:** DB cũ đã xác minh được là đã tương đường V1 rồi mà chưa có trong history thì cái baseline nó sẽ thành V1 là mặc định đã có V1 , thì V1 đã được confirm rồi , rồi thì V2 thì DB cũ chx có thì nó sẽ dc pending để được áp dụng , nó sẽ không tự kiểm tra toàn Schema mà baseline chỉ nó nhiệm vụ là giống tạo cơ sở cho những production đã có sẵn SQL nhưng mà lúc trước chưa xài FlyWWAY .

## Câu 5 (5đ)
Migration đã commit xóa cột có dữ liệu. Viết migration mới thêm lại cột có tự khôi phục giá trị cũ không? Phân biệt forward fix, repair và backup/restore.

**Trả lời:** không khôi phục lại cột đã xoá , viết migratin mới htif nó sẽ có thêm cột mới nhưng không tự khôi phục giá trị cũ , nếu bạn version đó thêm giá trị vô row cũ thì ok . Repair là sửa migration history , backup là tạo ra phiên bản để mà khôi phục lại , restore cũng là khôi phục lại 

## Câu 6 (5đ)
Bạn muốn đổi `products.name TEXT NOT NULL` thành title. App cũ vẫn đọc/ghi name; app mới sẽ dùng title. Dữ liệu cũ phải được giữ. Nêu kế hoạch 3–4 bước: thêm cột mà vẫn giữ app cũ chạy; chuyển dữ liệu cũ; xử lý cả ghi mới trong thời gian chuyển tiếp; điều kiện được bỏ name. Có thể chọn cửa sổ ngừng ghi có kiểm soát hoặc chiến lược đồng bộ writer, không bắt thiết kế trigger/zero-downtime. Vì sao chỉ copy một lần rồi drop ngay chưa đủ?

**Trả lời:** đầu tiên phảo là expland , là tạo thêm cột mới , sau đó là cần phỉa backfill là lấy dữ liệu từ cột cũ là name chuyển sang cột title ( cho nó từ NULL thành dữ liệu của name ) , sau đó là phải có chiến lược , ví dụ như là phải tạm dừng hoạt động liên quan đến querry của bảng products để mà cập nhật đồng bộ lần cuối rồi sau đó xoá cột name, còn không thì sẽ đồng bộ cả 2 liên tục và sau đó có thời điểm sẽ huỷ bỏ cột cũ , Copy một lần rồi Drop ngay thì chưa đủ vì có khi là dữ liệu lúc đó nó đã mứoi rồi , chưa đồng bộ được , còn bạn hỏi vụ khác thì k biết do bạn hỏi thiếu quá 

## Câu 7 (5đ)
Thiết kế kiểm migration trong CI theo hai nhánh: DB trống và DB version cũ có dữ liệu. Nêu DB loại nào, bước chạy, kiểm dữ liệu và xử lý khi lỗi.
Nhánh 1 — DB trống: Tạo database mới hoàn toàn, chạy Flyway từ V1 đến version mới nhất. Kiểm tra tất cả migration thành công và schema cuối cùng đúng yêu cầu.

Nhánh 2 — DB version cũ có dữ liệu: Tạo database test ở version cũ, có dữ liệu mẫu. Chạy Flyway để áp dụng các migration còn thiếu. Kiểm tra schema mới đúng, dữ liệu cũ không bị mất hoặc thay đổi sai và dữ liệu mới đáp ứng yêu cầu.

Khi có lỗi: CI báo Fail, không cho triển khai migration lỗi lên production. Phân tích nguyên nhân, sửa migration theo đúng trạng thái đã áp dụng hay chưa, sau đó chạy lại kiểm tra.

thì CI ta sẽ setup nó 2 nhánh này để mà làm , tôi hiểu là vậy 

**Trả lời:**

## Câu 8 (5đ)
Một bạn chỉ thêm flyway-core rồi chạy mvn flyway:migrate; bạn khác có CLI nhưng nghĩ CLI tự đọc application.yml. Nêu điều kiện còn thiếu ở mỗi cách và vì sao phải xác định DB đích trước khi migrate/clean.

**Trả lời:**

Cách 1 — flyway-core: flyway-core là thư viện để tích hợp Flyway vào ứng dụng, không đồng nghĩa đã có Flyway Maven Plugin. Muốn chạy mvn flyway:migrate cần cấu hình Flyway Maven Plugin, JDBC driver phù hợp, thông tin kết nối database và vị trí migration. Nếu dùng Spring Boot, Flyway cũng có thể chạy khi ứng dụng khởi động nếu được cấu hình đúng.

Cách 2 — Flyway CLI: CLI là công cụ chạy độc lập, không tự động đọc cấu hình application.yml của Spring Boot. Cần cung cấp URL, user, password, vị trí migration và các cấu hình cần thiết thông qua cơ chế cấu hình của Flyway CLI.

Cách 3 là khởi động ứng dụng application là Flyway cũng dc kịch hoạt
Xác định DB đích: Phải kiểm tra chính xác database mà Flyway sẽ kết nối trước khi chạy. migrate có thể thay đổi schema hoặc dữ liệu của database đó; clean có thể xóa các đối tượng trong schema được cấu hình và gây mất dữ liệu nghiêm trọng. Vì vậy không được chạy nhầm vào production, đặc biệt là lệnh clean.
