# Dap an M1-5 - Lesson 01

> Tong diem tho: 40 diem.

## Cau 1 - 5d

Externalized config la tach gia tri cau hinh ra khoi code Java.

Hard-code `jwtSecret` gay van de:

```text
- Doi secret phai sua code/build lai.
- De commit secret len Git.
- Khong linh hoat giua dev/test/prod.
```

## Cau 2 - 5d

Properties la key phang:

```text
shopcore.jwt.expiration-minutes=60
```

YAML la cau truc cay:

```text
shopcore -> jwt -> expiration-minutes
```

YAML phu thuoc indentation. Sai indentation co the lam parser loi hoac config bi bind sai.

## Cau 3 - 8d

```yaml
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
```

## Cau 4 - 7d

`${SERVER_PORT:8080}` nghia la:

```text
Neu co env var SERVER_PORT thi lay gia tri do.
Neu khong co thi dung 8080.
```

Khong co `SERVER_PORT` thi app chay port `8080`.

## Cau 5 - 8d

```java
@Service
public class UploadService {

    @Value("${shopcore.upload.max-file-size-mb:5}")
    private int maxFileSizeMb;
}
```

## Cau 6 - 7d

Nhieu `@Value` khong tot vi:

```text
- Key la String, de go sai.
- Config rai rac nhieu class.
- Kho validate ca nhom.
- Kho nhin tong the config.
```

Nen dung `@ConfigurationProperties` de bind config thanh class type-safe.

