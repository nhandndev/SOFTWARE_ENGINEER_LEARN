# M1-5 - Lesson 01: Externalized Config, YAML va `@Value`

> Muc tieu: hieu vi sao config khong nen hard-code trong Java, biet doc `application.yml`, va biet khi nao `@Value` la du.

## Tai lieu / video nen xem

Nen doc theo thu tu:

1. Official: Spring Boot Externalized Configuration  
   https://docs.spring.io/spring-boot/reference/features/external-config.html

2. Baeldung: A Quick Guide to Spring `@Value`  
   https://www.baeldung.com/spring-value-annotation

3. Baeldung: Properties with Spring and Spring Boot  
   https://www.baeldung.com/properties-with-spring

Video nen search tren YouTube:

```text
Spring Boot externalized configuration application.yml @Value
Spring Boot @Value default value application properties
Spring Boot YAML configuration tutorial
```

Doc nhanh: uu tien muc external config, placeholder `${name:default}` va cach Spring lay config tu file/env/command line.

## 1. Config la gi?

Config la nhung gia tri lam ung dung chay khac nhau theo moi truong, nhung khong phai business logic.

Vi du trong `shopcore`:

```text
server.port
spring.datasource.url
spring.datasource.username
spring.datasource.password
shopcore.jwt.secret
shopcore.jwt.expiration
shopcore.cors.allowed-origins
shopcore.upload.max-file-size
```

Neu viet thang trong code:

```java
private String jwtSecret = "my-secret";
```

thi moi lan doi secret ban phai sua code, build lai, va co nguy co commit secret len Git.

Externalized config nghia la:

```text
Code nam trong Java.
Gia tri cau hinh nam ben ngoai code.
```

Trong Spring Boot, noi quen thuoc nhat la:

```text
src/main/resources/application.yml
```

## 2. Vi sao can externalized config?

### 2.1. Cung mot code, nhieu moi truong

```text
dev  -> DB local, log nhieu, secret gia
test -> DB test, data test
prod -> DB production, secret that
```

Code Controller/Service/Repository khong doi. Chi config doi.

### 2.2. Khong can build lai khi doi config

Vi du doi port tu `8080` sang `9090`, chi can doi config:

```yaml
server:
  port: 9090
```

### 2.3. Bao mat secret

Secret that nen lay tu environment variable:

```yaml
shopcore:
  jwt:
    secret: ${JWT_SECRET}
```

Khong commit secret that vao repo.

## 3. `application.properties` va `application.yml`

Hai file nay cung bieu dien config.

### 3.1. Properties

```properties
server.port=8080
spring.application.name=shopcore
shopcore.jwt.secret=dev-secret
shopcore.jwt.expiration-minutes=60
```

### 3.2. YAML

```yaml
server:
  port: 8080

spring:
  application:
    name: shopcore

shopcore:
  jwt:
    secret: dev-secret
    expiration-minutes: 60
```

YAML de doc hon khi config co nhom.

## 4. Quy tac YAML de tranh loi

### Quy tac 1: Dung space, khong dung tab

Dung:

```yaml
shopcore:
  jwt:
    secret: dev-secret
```

Sai:

```yaml
shopcore:
	jwt:
		secret: dev-secret
```

### Quy tac 2: Sau dau `:` phai co space

Dung:

```yaml
server:
  port: 8080
```

Sai:

```yaml
server:
  port:8080
```

### Quy tac 3: Cung cap phai thut le bang nhau

Dung:

```yaml
shopcore:
  jwt:
    secret: dev-secret
    expiration-minutes: 60
```

Sai:

```yaml
shopcore:
  jwt:
    secret: dev-secret
      expiration-minutes: 60
```

## 5. List va Map trong YAML

### List

```yaml
shopcore:
  cors:
    allowed-origins:
      - http://localhost:3000
      - http://localhost:5173
```

### Map

```yaml
shopcore:
  feature-flags:
    new-checkout: true
    coupon: false
```

## 6. Placeholder va default value

Cau truc:

```text
${TEN_CONFIG:gia_tri_mac_dinh}
```

Vi du:

```yaml
server:
  port: ${SERVER_PORT:8080}
```

Doc la:

```text
Neu co env var SERVER_PORT -> lay gia tri do.
Neu khong co -> dung 8080.
```

Secret nen can than voi default:

```yaml
shopcore:
  jwt:
    secret: ${JWT_SECRET}
```

Neu secret bat buoc ma khong co default, app se fail khi start. Do la hanh vi tot cho production.

## 7. Doc config bang `@Value`

`@Value` phu hop khi ban chi can mot vai gia tri don le.

File `application.yml`:

```yaml
shopcore:
  app-name: Shopcore
  upload:
    max-file-size-mb: 5
```

Service:

```java
@Service
public class UploadService {

    @Value("${shopcore.upload.max-file-size-mb:10}")
    private int maxFileSizeMb;

    public int getMaxFileSizeMb() {
        return maxFileSizeMb;
    }
}
```

Neu config thieu:

```java
@Value("${shopcore.upload.max-file-size-mb}")
```

Spring co the fail khi tao bean vi khong resolve duoc placeholder.

Them default:

```java
@Value("${shopcore.upload.max-file-size-mb:10}")
```

## 8. Nhuoc diem cua `@Value`

`@Value` tien nhung co gioi han:

```text
- Ten config la String, de go sai.
- Nhieu field thi code bi rai rac.
- Kho validate ca nhom config.
- Kho thay cau truc config cua app.
- Khong dep khi config co nested object/list/map.
```

Vi vay:

```text
1-2 config le -> @Value chap nhan duoc.
Ca nhom config cua shopcore -> dung @ConfigurationProperties.
```

## 9. Luong Spring doc config

Don gian hoa:

```text
App start
-> Spring Boot doc application.yml
-> Doc profile-specific file neu co
-> Doc env vars / command line args
-> Tao Environment
-> Inject gia tri vao @Value hoac @ConfigurationProperties
-> Tao bean
```

Neu config bat buoc bi thieu:

```text
Inject fail
-> Bean tao fail
-> App start fail
```

## 10. Bai tap nho

Chuyen properties sau sang YAML:

```properties
server.port=9090
spring.application.name=shopcore
shopcore.jwt.expiration-minutes=60
shopcore.cors.allowed-origins=http://localhost:3000,http://localhost:5173
```

Viet `@Value` doc:

```text
shopcore.jwt.expiration-minutes
```

Neu thieu thi mac dinh `30`.
