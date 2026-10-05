# Bai kiem tra M1-5 - Lesson 02

> Trong tam: Spring Profiles `dev/test/prod`.  
> Tong diem tho: 40 diem.

## Cau 1 - Profile la gi? (5d)

Profile trong Spring Boot la gi? Vi sao `shopcore` nen co `dev`, `test`, `prod`?

**Tra loi:**
profile là tên môip trường đang chạy dự  án , và phuopngwf là có 4 môip trườngl à chung , dev , staging ( test) , production . chia ra là vầy trong file yaml ( config) thì nó sẽ có các biến khác nhau và mỗi môi trường có mỗi value khác nhau . shopcore nên có  dev , test , production để chuẩn đúng quy trình phát triển sản phẩn , ở dev thì ta sẽ config khác so với test và product . khác nhau có thể là database , jwt , ddl-update gì đó , CORS , nói chung là tuỳ vào dự án và đăng ký bean của profile đó 
---

## Cau 2 - File config theo profile (7d)

Giai thich vai tro cua:

```text
application.yml
application-dev.yml
application-test.yml
application-prod.yml
```

File nao nen chua config chung? File nao ghi de theo moi truong?

**Tra loi:**
application.yml là config chung
application-dev.yml là config của dev
application-test.yml là config của staging(test)
application-prod.yml là config của production
---

## Cau 3 - Merge config (7d)

Cho:

`application.yml`

```yaml
server:
  port: 8080
shopcore:
  jwt:
    expiration-minutes: 60
```

`application-dev.yml`

```yaml
server:
  port: 9090
```

Khi chay profile `dev`, `server.port` va `shopcore.jwt.expiration-minutes` la bao nhieu? Giai thich.

**Tra loi:**
server.port sẽ là 9090
shopcore.jwt.expiration-minutes sẽ là 60
vì trong application là config chung có server.port và shopcore.jwt.expiration-minutes , application-dev.yml; có mỗi server . thì nó sẽ ưu tiên thằng đươc chạy profile hơn là dev,  nhma dev k có thì sẽ lấy cái chung qua .

---

## Cau 4 - Kich hoat profile (6d)

Ke 3 cach kich hoat profile `dev`.

**Tra loi:**
Khích hoạt bằng intelJ trong run/debug configuration là VM -Dspring.profiles.active=dev
hoặc là hoặc là Program argument thfi là --spring.profiles.active=dev
hoặc là trong terminal là 
java -jar shopcore.jar --spring.profiles.active=dev
hoặc là để trong yml chung là spring.profiles.active: dev ( phân cấp dùm tôi)
hoặc bỏ vô biến môi trường á SPRING_PROFILES_ACTIVE value là dev

---

## Cau 5 - `@Profile` (8d)

Khi nao dung file profile, khi nao dung `@Profile` tren bean? Cho vi du `DataSeeder` chi chay o dev.

**Tra loi:**
Giá trị config khác nhau thì xài file profile
@Profile là annonatiopn đăng ký bean khi mà chọn profile ..
ví dụ là 
@Bean
@Profile("dev")
CommandLineRunner dataSeeder() {
    return args -> {
        // seed data dev
    };
}
thì là nó đăng ký bean dataSeeder khi chọn môi trường dev
---

## Cau 6 - Loi nguy hiem (7d)

Vi sao khong nen commit `spring.profiles.active=prod` co dinh vao repo? No co the gay loi gi?

**Tra loi:**

vì nó sẽ bị lỗi là lộ môi trường production ? . Local/test có thể chạy product thật , database của product , dùng secret của product , nói chung là tách biệt ra , k được đụng đến môi trường production ,khi ta dev. thì nên dùng môi trường dev 