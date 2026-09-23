# M1-5 Lesson 01 - Luu Y Can Nho

> Doc file nay truoc khi lam tiep Lesson 02. Day la ban rut gon tu bai lam va loi sai cua ban.

## 1. Externalized config la gi?

Externalized config = tach gia tri cau hinh ra khoi code Java.

Vi du config:

```text
server.port
spring.datasource.url
spring.datasource.password
shopcore.jwt.secret
shopcore.jwt.expiration-minutes
shopcore.cors.allowed-origins
```

Code Java khong nen hard-code:

```java
private String jwtSecret = "my-secret";
```

Vi:

```text
- Doi secret/port/DB phai sua code va build lai.
- Khong linh hoat giua dev/test/prod.
- De lo secret khi commit Git.
```

## 2. Secret nen doc tu env var

Dung:

```yaml
shopcore:
  jwt:
    secret: ${JWT_SECRET}
```

Doc la:

```text
Lay JWT_SECRET tu environment variable.
Neu khong co va khong co default -> app fail khi start.
```

Voi secret production, fail som tot hon ngam chay bang secret gia.

## 3. Properties vs YAML

Properties la key phang:

```properties
shopcore.jwt.expiration-minutes=60
```

YAML la cay phan cap:

```yaml
shopcore:
  jwt:
    expiration-minutes: 60
```

YAML de doc hon khi config co nhom.

## 4. Loi YAML ban da sai

Ban tung quen dau `:` sau parent key.

Sai:

```yaml
server
  port: 9090
shopcore
  jwt
    expiration-minutes: 60
```

Dung:

```yaml
server:
  port: 9090

shopcore:
  jwt:
    expiration-minutes: 60
```

Quy tac:

```text
Neu key co con -> key:
Neu key co value -> key: value
Moi parent key deu phai co dau :
```

## 5. Indentation trong YAML

Dung space, khong dung tab.

Cung cap thi thut le bang nhau:

```yaml
shopcore:
  upload:
    max-file-size-mb: 10
  jwt:
    expiration-minutes: 60
```

Sai indentation co the:

```text
- YAML parse loi.
- Spring doc sai cau truc.
- @Value hoac @ConfigurationProperties khong bind duoc.
```

## 6. Placeholder va default

Cu phap:

```text
${KEY:default}
```

Vi du:

```yaml
server:
  port: ${SERVER_PORT:8080}
```

Nghia la:

```text
Neu co SERVER_PORT -> dung gia tri do.
Neu khong co SERVER_PORT -> dung 8080.
```

Can viet dung ten env var. `SERVER_PORT` khac `SEVER_PORT`.

## 7. `@Value` dung the nao?

`@Value` phai gan vao field/constructor parameter cua Spring bean.

Dung:

```java
@Service
public class UploadService {

    @Value("${shopcore.upload.max-file-size-mb:5}")
    private int maxFileSizeMb;
}
```

Sai:

```java
@Value("${shopcore.upload.max-file-size-mb:5}")
```

Vi annotation mot minh khong co field nao de inject gia tri.

## 8. Khi nao dung `@Value`?

Dung `@Value` khi:

```text
- Chi doc 1-2 config le.
- Config don gian.
- Khong can validate ca nhom.
```

Vi du:

```java
@Value("${shopcore.upload.max-file-size-mb:5}")
private int maxFileSizeMb;
```

## 9. Khi nao khong nen dung nhieu `@Value`?

Neu co nhom config:

```text
shopcore.jwt.*
shopcore.cors.*
shopcore.upload.*
```

Khong nen spam `@Value` vi:

```text
- Key la String, de go sai.
- Config bi rai rac o nhieu class.
- Kho validate ca nhom.
- Kho nhin tong the config.
- Doi ten key phai sua nhieu cho.
```

Nen dung:

```java
@ConfigurationProperties(prefix = "shopcore")
```

## 10. Cau nho nhanh

```text
Externalized config = tach config khoi code.
YAML = cay phan cap bang indentation.
Parent key trong YAML luon co dau :
${KEY:default} = co KEY thi dung KEY, khong co thi dung default.
@Value = doc config le vao field cua Spring bean.
@ConfigurationProperties = gom nhom config thanh object type-safe.
Secret that khong commit Git.
```

