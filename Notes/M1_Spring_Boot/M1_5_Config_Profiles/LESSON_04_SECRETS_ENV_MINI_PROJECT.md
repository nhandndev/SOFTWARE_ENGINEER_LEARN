# M1-5 - Lesson 04: Secrets, Env Vars va Mini Project

> Muc tieu: biet config nao duoc commit, config nao phai lay tu environment variable, va hoan thanh deliverable M1-5 cho `shopcore`.

## Tai lieu / video nen xem

Nen doc theo thu tu:

1. Official: Externalized Configuration - Environment Variables, Placeholders, Config Trees  
   https://docs.spring.io/spring-boot/reference/features/external-config.html

2. Baeldung: Properties with Spring and Spring Boot  
   https://www.baeldung.com/properties-with-spring

3. Baeldung: Environment Variable Prefixes in Spring Boot  
   https://www.baeldung.com/spring-boot-env-variable-prefixes

Video nen search tren YouTube:

```text
Spring Boot environment variables secrets application.yml
Spring Boot JWT secret environment variable
Spring Boot production configuration secrets
```

Doc nhanh: tap trung vao env vars, placeholder khong default cho secret, va cach test app fail fast khi thieu secret bat buoc.

## 1. Secret la gi?

Secret la bat ky gia tri nao neu lo ra se gay nguy hiem.

Vi du:

```text
DB password
JWT secret
OAuth client secret
API key thanh toan
SMTP password
Private key
Access token
```

Khong phai secret:

```text
server.port
spring.application.name
jwt expiration minutes
max page size
allowed file size
```

## 2. Nguyen tac khong commit secret

Khong nen commit:

```yaml
spring:
  datasource:
    password: real-production-password

shopcore:
  jwt:
    secret: real-production-secret
```

Nen dung env var:

```yaml
spring:
  datasource:
    password: ${DB_PASSWORD}

shopcore:
  jwt:
    secret: ${JWT_SECRET}
```

Neu bien moi truong khong ton tai, app fail khi start. Day la dieu tot voi secret production.

## 3. Default value nao an toan?

Chap nhan:

```yaml
server:
  port: ${SERVER_PORT:8080}

shopcore:
  jwt:
    expiration-minutes: ${JWT_EXPIRATION_MINUTES:60}
```

Nguy hiem:

```yaml
shopcore:
  jwt:
    secret: ${JWT_SECRET:default-secret}
```

Vi neu quen set `JWT_SECRET` o prod, app van chay bang secret yeu.

Quy tac:

```text
Config khong nhay cam -> co the co default.
Secret that -> khong nen co default trong prod.
```

## 4. `.gitignore` va file mau

Nen commit:

```text
application.yml
application-dev.yml neu chi chua config local gia
application-test.yml neu chi chua config test
application-prod.yml neu chi dung placeholder env var
.env.example
```

Khong nen commit:

```text
.env
application-local.yml
secret.yml
*.pem
*.key
```

`.env.example` co the ghi:

```env
DB_URL=jdbc:postgresql://localhost:5432/shopcore
DB_USERNAME=postgres
DB_PASSWORD=change-me
JWT_SECRET=change-me
```

File mau giup nguoi khac biet can set bien nao, nhung khong chua secret that.

## 5. Deliverable M1-5 cho `shopcore`

### 5.1. File config

Can co:

```text
src/main/resources/application.yml
src/main/resources/application-dev.yml
src/main/resources/application-test.yml
```

Neu muon them prod:

```text
src/main/resources/application-prod.yml
```

### 5.2. `application.yml`

```yaml
spring:
  application:
    name: shopcore

server:
  port: ${SERVER_PORT:8080}

shopcore:
  jwt:
    expiration-minutes: ${JWT_EXPIRATION_MINUTES:60}
  cors:
    allowed-origins:
      - http://localhost:3000
  upload:
    max-file-size-mb: ${UPLOAD_MAX_FILE_SIZE_MB:10}
```

### 5.3. `application-dev.yml`

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

shopcore:
  jwt:
    secret: dev-secret-only
```

### 5.4. `application-test.yml`

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

### 5.5. `application-prod.yml`

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

## 6. `ShopcoreProperties`

Toi thieu can co:

```text
shopcore.jwt.secret
shopcore.jwt.expiration-minutes
shopcore.cors.allowed-origins
shopcore.upload.max-file-size-mb
```

Service khong doc config bang String key nua, ma inject:

```java
private final ShopcoreProperties properties;
```

## 7. Cach test thuc te

### Chay dev

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

Hoac:

```bash
java -jar target/shopcore.jar --spring.profiles.active=dev
```

Kiem tra log:

```text
The following 1 profile is active: "dev"
```

### Chay prod local bang env var

```bash
export DB_URL=jdbc:postgresql://localhost:5432/shopcore
export DB_USERNAME=postgres
export DB_PASSWORD=postgres
export JWT_SECRET=local-prod-secret

java -jar target/shopcore.jar --spring.profiles.active=prod
```

### Test fail fast

Chay prod nhung khong set `JWT_SECRET`.

Ky vong:

```text
App fail luc start.
Khong ngam chay voi secret rong/default yeu.
```

## 8. Checklist nop bai M1-5

- [ ] Co `application.yml`.
- [ ] Co `application-dev.yml`.
- [ ] Co `application-test.yml`.
- [ ] Profile dev/test chay duoc.
- [ ] Khong hard-code secret that trong repo.
- [ ] Co `ShopcoreProperties`.
- [ ] Co `@ConfigurationPropertiesScan`.
- [ ] Config bat buoc co validation.
- [ ] Service doc config qua `ShopcoreProperties`, khong rai rac `@Value`.
- [ ] Co ghi chu env var can set neu chay prod.
