# Bai kiem tra M1-5 - Lesson 01

> Trong tam: Externalized config, YAML, placeholder va `@Value`.  
> Tong diem tho: 40 diem. Khi cham se normalize ve thang 100.

## Cau 1 - Externalized config (5d)

Externalized config la gi? Neu trong `shopcore` hard-code `jwtSecret` trong Java thi co van de gi?

**Tra loi:** externalized config là config ở bên ngoài , có nghĩa là tách giá trị config ra khỏi code java , sẽ có 1 class chuyên làm property của value các giá trị có thể thay đổi của biến , ví dụ như port , jwt time hay jwt r đồ . Hardcaord jwtSecret thfi vì nó có nhiều môi trường như là local , dev , production thì sẽ có jwtSEcret khác nhau thì khi mà thay đổi mà nếu hardcord thì cần phải build lại , nếu k hardcode mà để là các biến môi trường thì dễ dàng thay đổi chỉ cần reset lại là dc k cần phải build lại file jar . khi mà hardcode cứng á thì sẽ bị lộ secret và khi commit thì lộ luôn , còn nếu để file cấu hình thì là bởi vì chỉ để theo dạng không hardcode nên là không lộ được , thường thì nó sẽ mapping với biến .env tuỳ voà môi trường .

---

## Cau 2 - YAML vs properties (5d)

Chuyen tu duy cua hai doan sau:

```properties
shopcore.jwt.expiration-minutes=60
```

va

```yaml
shopcore:
  jwt:
    expiration-minutes: 60
```

Noi ro YAML khac properties o dau va neu sai indentation thi co the gap loi gi.

**Tra loi:**  khác nhau ở cấu trúc , propertiest là kiểu dạng phẳng , tất cả các cấu hình của nó sẽ là 1 dòng và được phân cấp bằng dấu . và sau dấu = là value  , còn yaml là theo dạng phân cấp , và nó có phân biệt rõ ràng bằng indentation , phân cấp bằng dấu cách và cùng thụt lề bằng nhau thì sẽ là cùng cấp và sau dấu : value . sai identation thì sẽ bị lỗi phân cấp . YAML khác propertiest ở chỗ là cách nó biểu diễn , YAML dễ đọc hơn . Sai indentation thì YAML Parse lỗi , không cùng thứu cấp , đọc sai cấu trúc , không bind được vào @Value hoặc là @ConfigurationProperties.

---

## Cau 3 - Chuyen properties sang YAML (8d)

Chuyen doan sau sang YAML:

```properties
server.port=9090
spring.application.name=shopcore
shopcore.upload.max-file-size-mb=10
shopcore.jwt.expiration-minutes=60
```

**Tra loi:**

---
server:
  port: 9090

spring:
  application:
    name: shopcore

shopcore:
  upload:
    max-file-size-mb: 10
  jwt:
    expiration-minutes: 60

## Cau 4 - Placeholder va default (7d)

Giai thich y nghia:

```yaml
server:
  port: ${SERVER_PORT:8080}
```

Neu khong co env var `SERVER_PORT` thi app lay port nao?

**Tra loi:** nếu không có env var SEVER_PORT thì app sẽ lấy 8080 thì trong port có ghi là port: ${SERVER_PORT:8080} thì là default value là 8080 , đây là fallback nếu như trong file cấu hình không có env var SERVER_PORT

---

## Cau 5 - `@Value` (8d)

Cho YAML:

```yaml
shopcore:
  upload:
    max-file-size-mb: 10
```

Viet code trong `@Service` doc gia tri nay bang `@Value`. Neu config thieu thi mac dinh la `5`.

**Tra loi:** 

@Service
public class UploadService {

    @Value("${shopcore.upload.max-file-size-mb:5}")
    private int maxFileSizeMb;
}


---

## Cau 6 - Khi nao khong nen dung `@Value`? (7d)

Neu project co nhom config:

```text
shopcore.jwt.*
shopcore.cors.*
shopcore.upload.*
```

Vi sao dung nhieu `@Value` khong tot? Nen dung giai phap gi o cac lesson sau?

**Tra loi:**
Dùng nhiều @Value không tốt , nên xài @ConfigurationProperties vì nó cùng prefix là shopcore , ta sẽ gôm các bind có cùng một phân cấp tạo thành 1 object java có cấu trúc và trong service khi cần xài thì constructor dependecy là được thì nó sẽ dễ dàng thêm bớt mà k cần phải spam @Value , hạn chế Repeat code . @Value dùng thì sẽ bị rải rac, ví dụ như class A B C đều cần mà có một ngày đổi name của cái PlaceHolder thì phải sửa lại toàn bộ nên là nhóm lại theo prefix để dễ dàng quản lý và gom nhóm . và Biến đổi thành class java config , dùng để kiểm tra valid của cái biến đó , ví dụ như kiểm tra độ đúng đắn của type , valid của field đó để kiểm tra thử có valid không , auto complete khi config ( cái này k cần thiết lắm ).
