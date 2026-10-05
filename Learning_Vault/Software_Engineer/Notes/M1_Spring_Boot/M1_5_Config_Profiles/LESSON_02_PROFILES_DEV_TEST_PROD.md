# M1-5 - Lesson 02: Profiles `dev`, `test`, `prod`

> Muc tieu: hieu profile la gi, Spring merge config theo profile ra sao, va biet kich hoat dung profile khi chay app.

## Tai lieu / video nen xem

Nen doc theo thu tu:

1. Official: Spring Boot Profiles  
   https://docs.spring.io/spring-boot/reference/features/profiles.html

2. Official: Set Active Spring Profiles  
   https://docs.spring.io/spring-boot/how-to/properties-and-configuration.html

3. Baeldung: Spring Profiles  
   https://www.baeldung.com/spring-profiles

Video nen search tren YouTube:

```text
Spring Boot profiles dev test prod tutorial
Spring Boot application dev yml application prod yml
Spring Boot @Profile tutorial
```

Doc nhanh: tap trung vao `spring.profiles.active`, `application-{profile}.yml`, va `@Profile` tren bean.

## 1. Profile la gi?

Profile la ten moi truong dang chay cua app.

Trong `shopcore`, cung mot code co the chay o nhieu noi:

```text
dev  -> may lap trinh vien
test -> moi truong test tu dong / integration test
prod -> production
```

Moi moi truong can config khac nhau:

```text
dev:
  DB local
  log SQL ro
  CORS localhost

test:
  DB test hoac H2/Postgres test
  config on dinh cho test

prod:
  DB production
  secret tu env var
  log gon
```

## 2. Cau truc file profile

Thuong dung:

```text
src/main/resources/application.yml
src/main/resources/application-dev.yml
src/main/resources/application-test.yml
src/main/resources/application-prod.yml
```

`application.yml` chua config chung.

`application-dev.yml` chi ghi de phan rieng cho dev.

## 3. Vi du config chung

`application.yml`:

```yaml
spring:
  application:
    name: shopcore

server:
  port: ${SERVER_PORT:8080}

shopcore:
  jwt:
    expiration-minutes: 60
  cors:
    allowed-origins:
      - http://localhost:3000
```

## 4. Vi du profile dev

`application-dev.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/shopcore_dev
    username: postgres
    password: postgres
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update

logging:
  level:
    org.hibernate.SQL: debug
```

Dev co the de password local neu chi la database local gia. Nhung secret that van khong nen commit.

## 5. Vi du profile test

`application-test.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/shopcore_test
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: create-drop

shopcore:
  jwt:
    secret: test-secret-only
```

Test can lap lai duoc. Config test nen phuc vu test on dinh, khong dung DB production.

## 6. Vi du profile prod

`application-prod.yml`:

```yaml
spring:
  datasource:
    url: ${DB_URL}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    show-sql: false
    hibernate:
      ddl-auto: validate

shopcore:
  jwt:
    secret: ${JWT_SECRET}
```

Prod khong nen co default secret/password that trong file.

## 7. Spring merge config nhu the nao?

Neu active profile la `dev`:

```text
application.yml
     +
application-dev.yml
     =
Environment cuoi cung
```

Gia tri trong `application-dev.yml` se ghi de gia tri cung key trong `application.yml`.

Vi du:

`application.yml`:

```yaml
server:
  port: 8080
```

`application-dev.yml`:

```yaml
server:
  port: 9090
```

Khi chay profile `dev`:

```text
server.port = 9090
```

## 8. Kich hoat profile

### Cach 1: Trong IDE

Them VM option hoac program argument:

```bash
--spring.profiles.active=dev
```

### Cach 2: Command line

```bash
java -jar shopcore.jar --spring.profiles.active=dev
```

### Cach 3: Environment variable

```bash
SPRING_PROFILES_ACTIVE=prod
```

### Cach 4: Trong `application.yml`

```yaml
spring:
  profiles:
    active: dev
```

Khong khuyen nghi commit active profile co dinh vao repo neu project can deploy nhieu moi truong.

## 9. `@Profile` tren Bean

`@Profile` dung de bat/tat bean theo moi truong.

Vi du:

```java
@Configuration
public class DataSeederConfig {

    @Bean
    @Profile("dev")
    CommandLineRunner seedData() {
        return args -> {
            // tao data mau cho dev
        };
    }
}
```

Bean nay chi ton tai khi profile `dev` active.

## 10. Config theo profile vs Bean theo profile

| Truong hop | Nen dung |
|---|---|
| Doi DB URL, port, secret, CORS | File profile |
| Doi gia tri timeout, page size | File profile |
| Chi tao seed data o dev | `@Profile("dev")` |
| Dung fake service o test | `@Profile("test")` |
| Doi implementation theo moi truong | `@Profile` |

Dung rule:

```text
Gia tri khac nhau -> profile config file.
Bean co ton tai hay khong -> @Profile.
```

## 11. Loi hay gap

### Loi 1: Tuong profile dang chay nhung that ra khong

Nen check log luc start:

```text
The following 1 profile is active: "dev"
```

### Loi 2: Dat sai ten file

Dung:

```text
application-dev.yml
```

Sai:

```text
application_profile_dev.yml
application.dev.yml
```

### Loi 3: Commit `spring.profiles.active=prod`

De prod active mac dinh trong repo co the lam dev/test vo tinh ket noi production.

## 12. Bai tap nho

Thiet ke 3 file:

```text
application.yml
application-dev.yml
application-prod.yml
```

Yeu cau:

```text
Config chung: app name, jwt expiration
Dev: DB local, show SQL true
Prod: DB URL/password tu env var, show SQL false
```
