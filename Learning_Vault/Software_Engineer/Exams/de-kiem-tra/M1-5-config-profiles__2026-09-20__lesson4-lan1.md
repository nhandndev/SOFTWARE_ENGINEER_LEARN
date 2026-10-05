# Bai kiem tra M1-5 - Lesson 04

> Trong tam: Secrets, env vars va mini project M1-5.  
> Tong diem tho: 40 diem.

## Cau 1 - Secret la gi? (5d)

Ke 4 vi du secret trong backend. Ke 2 config khong phai secret.

**Tra loi:**
Secret như là jwt , db password , api của 1 số cái , 2 config k cần secret là thời gian , ví dụ thời gian token hoạt động , host port 

---

## Cau 2 - Env var trong YAML (7d)

Giai thich:

```yaml
shopcore:
  jwt:
    secret: ${JWT_SECRET}
```

Neu chay prod ma khong set `JWT_SECRET`, app nen bi gi? Vi sao?

**Tra loi:**
không set JWT_SECRET thì khi mà @Value tới á , thì nó sẽ tìm trong YAML , và thấy có secret nhưng mà k có giá trị nào hết ( trong biến env không có ) và k có default value luôn thì khi khởi động dự án thì chắc chắn lỗi vì không đủ dữ liệu tạo thành bean

---

## Cau 3 - Default nguy hiem (7d)

Vì sao config sau nguy hiem trong production?

```yaml
shopcore:
  jwt:
    secret: ${JWT_SECRET:default-secret}
```

Khi nao default value la chap nhan duoc?

**Tra loi:**

--- vì là đó là ý đồ của thằng JWT_SECRET , phải k có default để khi mà người ta k set JWT_SECRET thì nó sẽ lỗi và ép buộc dev phải set giá trị cho nó ở biến môi trường , nếu có default-secret thì dự án vẫn chạy được nhưng mà có thể secret đó yếu và không đủ bảo mật , chưa kể là dev sẽ k biết là mình đã set value đè lên default chưa , rất nguy hiểm 

## Cau 4 - `.gitignore` va `.env.example` (6d)

Nen commit file nao, khong nen commit file nao?

```text
.env
.env.example
application-prod.yml voi placeholder env var
private-key.pem
```

**Tra loi:**

---.env k nên vì đây là biến môi trường , cực kì không nên vì ở trong đây , vì place holder ở trong file YAML nó sẽ mapping value từ biến môi trường qua và nó rất là secret
.env.example đây là ví dụ của biến môi trường , để cho dev khác nhìn vô có thể hiểu được và set env , đây giống như là template nên là cần phải commit
application-prod.yml voi placeholder env var nên commit nha vì bạn nói k rõ là placeholder env var là value trong đây là placeholder và được mapping từ .env
private-key.pem không nên commit vì đây chứa các private key 

## Cau 5 - Deliverable `shopcore` (8d)

Neu nop M1-5, project can co nhung file/class/config nao?

**Tra loi:**
có appilcation-prod.yml
appilcation-dev.yml
appilcation-staging.yml 
có .env , có .env-example để hướng dẫn env var cần set và cái này chỉ là Example
có application.yml
và nếu dùng ConfigurationProperties thì cần phỉa có ShopCoreProperties 
và bên trong đó sẽ có validated r đồ ,
có .gitignore và nhớ để những file k được commit như .env 
@ConfigurationPropertiesScan và service đọc config thông qua Object ShoppeCoreProperties


---

## Cau 6 - Test profile/config (7d)

Ban se test profile `dev` va `prod` nhu the nao de biet config dang chay dung?

**Tra loi:**

thì xem ở file log , đọc thử là có dòng đang chạy với profile gì á và nó sẽ ghi port tomcat , theo tôi nghĩ là vậy 

java -jar target/shopcore.jar --spring.profiles.active=dev

export DB_URL=...
export DB_USERNAME=...
export DB_PASSWORD=...
export JWT_SECRET=...
java -jar target/shopcore.jar --spring.profiles.active=prod

tesst fail thif unset 1 casi laf dc