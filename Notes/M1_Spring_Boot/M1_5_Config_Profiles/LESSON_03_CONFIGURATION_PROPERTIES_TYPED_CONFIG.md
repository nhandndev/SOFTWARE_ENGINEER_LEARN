# M1-5 - Lesson 03: `@ConfigurationProperties` va typed config

> Muc tieu: gom config cua `shopcore` thanh mot class type-safe, co autocomplete, co validation, va de inject vao Service.

## Tai lieu / video nen xem

Nen doc theo thu tu:

1. Official: Type-safe Configuration Properties  
   https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties

2. Baeldung: Guide to `@ConfigurationProperties` in Spring Boot  
   https://www.baeldung.com/configuration-properties-in-spring-boot

3. Baeldung: Spring Boot Configuration Metadata  
   https://www.baeldung.com/spring-boot-configuration-metadata

Video nen search tren YouTube:

```text
Spring Boot ConfigurationProperties tutorial
Spring Boot type safe configuration properties
Spring Boot configuration processor metadata
```

Doc nhanh: uu tien `@ConfigurationProperties`, `@ConfigurationPropertiesScan`, relaxed binding, nested config va validation.

## 1. Van de cua `@Value`

Neu config it:

```java
@Value("${shopcore.jwt.expiration-minutes:60}")
private int expirationMinutes;
```

Thi on.

Nhung khi config nhieu:

```java
@Value("${shopcore.jwt.secret}")
private String jwtSecret;

@Value("${shopcore.jwt.expiration-minutes}")
private int expirationMinutes;

@Value("${shopcore.cors.allowed-origins}")
private List<String> allowedOrigins;

@Value("${shopcore.upload.max-file-size-mb}")
private int maxFileSizeMb;
```

Code bat dau roi:

```text
- Config rai rac nhieu class.
- String key de go sai.
- Kho nhin toan bo config cua app.
- Kho validate ca nhom config.
```

Giai phap:

```java
@ConfigurationProperties(prefix = "shopcore")
public class ShopcoreProperties {
    ...
}
```

## 2. Typed config la gi?

Thay vi doc tung key bang String, ta bind ca nhom YAML vao class Java.

YAML:

```yaml
shopcore:
  jwt:
    secret: dev-secret
    expiration-minutes: 60
  cors:
    allowed-origins:
      - http://localhost:3000
  upload:
    max-file-size-mb: 10
```

Java:

```java
@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "shopcore")
public class ShopcoreProperties {

    @Valid
    private Jwt jwt = new Jwt();

    @Valid
    private Cors cors = new Cors();

    @Valid
    private Upload upload = new Upload();

    @Getter
    @Setter
    public static class Jwt {
        @NotBlank
        private String secret;

        @Min(1)
        private int expirationMinutes = 60;
    }

    @Getter
    @Setter
    public static class Cors {
        @NotEmpty
        private List<String> allowedOrigins = new ArrayList<>();
    }

    @Getter
    @Setter
    public static class Upload {
        @Min(1)
        private int maxFileSizeMb = 10;
    }
}
```

Doc:

```text
shopcore.jwt.secret -> properties.jwt.secret
shopcore.jwt.expiration-minutes -> properties.jwt.expirationMinutes
shopcore.cors.allowed-origins -> properties.cors.allowedOrigins
```

Spring Boot bind `kebab-case` trong YAML vao `camelCase` trong Java.

## 3. Bat scan properties

Trong main app:

```java
@SpringBootApplication
@ConfigurationPropertiesScan
public class ShopcoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopcoreApplication.class, args);
    }
}
```

Neu khong scan, class `ShopcoreProperties` co the khong duoc tao thanh bean.

Co cach khac:

```java
@EnableConfigurationProperties(ShopcoreProperties.class)
```

Nhung voi project hoc, `@ConfigurationPropertiesScan` ro rang va tien.

## 4. Inject vao Service

```java
@Service
public class JwtService {

    private final ShopcoreProperties properties;

    public JwtService(ShopcoreProperties properties) {
        this.properties = properties;
    }

    public long expirationMinutes() {
        return properties.getJwt().getExpirationMinutes();
    }
}
```

Khong can lap lai ten key config trong Service.

## 5. Validation cho config

Them:

```java
@Validated
@ConfigurationProperties(prefix = "shopcore")
public class ShopcoreProperties {
}
```

Va annotation trong field:

```java
@NotBlank
private String secret;
```

Neu thieu `shopcore.jwt.secret`, app fail ngay khi start.

Day la hanh vi tot:

```text
Config bat buoc thieu -> fail fast luc start
Khong doi den luc user goi API moi loi
```

## 6. Nested object can `@Valid`

Neu class cha co:

```java
private Jwt jwt = new Jwt();
```

Nen them:

```java
@Valid
private Jwt jwt = new Jwt();
```

De validation di tiep vao object con.

Tu duy giong nested DTO cua M1-4.

## 7. List, Map va Duration

### List

```yaml
shopcore:
  cors:
    allowed-origins:
      - http://localhost:3000
      - http://localhost:5173
```

Java:

```java
private List<String> allowedOrigins = new ArrayList<>();
```

### Map

```yaml
shopcore:
  feature-flags:
    checkout-v2: true
    coupon: false
```

Java:

```java
private Map<String, Boolean> featureFlags = new HashMap<>();
```

### Duration

```yaml
shopcore:
  jwt:
    expiration: 60m
```

Java:

```java
private Duration expiration = Duration.ofMinutes(60);
```

Spring Boot bind duoc `10s`, `5m`, `2h`, tuy loai config.

## 8. Dependency processor

Them vao `pom.xml` de IDE co metadata/autocomplete tot hon:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

No khong phai runtime dependency quan trong, ma giup build metadata config.

## 9. Nen dung `@Value` hay `@ConfigurationProperties`?

| Truong hop | Nen dung |
|---|---|
| Doc mot config le tam thoi | `@Value` |
| Config gom thanh nhom | `@ConfigurationProperties` |
| Can validate config luc start | `@ConfigurationProperties` |
| Can list/map/nested object | `@ConfigurationProperties` |
| Muon autocomplete va type-safe | `@ConfigurationProperties` |

Voi `shopcore`, config nen gom thanh:

```text
ShopcoreProperties
```

## 10. Bai tap nho

Tao class:

```text
ShopcoreProperties
```

Co cac nhom:

```text
jwt.secret
jwt.expirationMinutes
cors.allowedOrigins
upload.maxFileSizeMb
```

Validation:

```text
secret: @NotBlank
expirationMinutes: @Min(1)
allowedOrigins: @NotEmpty
maxFileSizeMb: @Min(1)
```
