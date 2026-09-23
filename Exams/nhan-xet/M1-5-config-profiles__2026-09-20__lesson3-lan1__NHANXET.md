# Nhan xet M1-5 Config & Profiles - Lesson 03 lan 1

> File duoc cap nhat sau khi cham lai bai `Exams/de-kiem-tra/M1-5-config-profiles__2026-09-20__lesson3-lan1.md`.

## 1. Diem tong

- Diem tho: **35.5/40**
- Diem thang 100: **89/100**
- Trang thai lesson: **🟢 Dat**

Nhan xet ngan:

Ban da nam duoc trong tam Lesson 03: ly do dung `@ConfigurationProperties`, bind YAML vao class, scan properties bean, validation config luc app start, nested `@Valid`, va cac kieu List/Map/Duration. Con loi nho o YAML cau 6 va cach dien dat cau 4 hoi dai, nhung da du nguong qua lesson.

## 2. Bang diem tung cau

| Cau | Diem toi da | Diem dat | Nhan xet |
|---|---:|---:|---|
| 1 | 5 | 5 | Bo sung tot type-safe, validation, List/Map va han che cua `@Value`. |
| 2 | 8 | 7 | Co `prefix = "shopcore"`, nested `Jwt`, `secret`, `expirationMinutes`. Tru nhe vi cau hoi chi can bind toi thieu, package/import thua va dua validation vao cau 2. |
| 3 | 5 | 4.5 | Hieu scan de tao bean properties va scan khac validation. |
| 4 | 8 | 7 | Da co code validation day du va noi fail khi app start. Tru nhe vi dien dat con roi va viet nham `@Validation` thay vi `@Validated`. |
| 5 | 7 | 6.5 | Da nam `@Valid` cascade vao nested object. Dien dat hoi dai nhung ban chat dung. |
| 6 | 7 | 5.5 | Co List/Map/Duration va Java type. Tru vi YAML list key sai `allow-origins` va map nen dat ro `shopcore.feature-flags` hoac dung nested class tuong ung. |

## 3. Chua bai tung cau

### Cau 1

**Ban da noi duoc:**

- `@Value` hop config le.
- `@ConfigurationProperties` gom config cung prefix thanh object.
- Co inject vao service.
- Co type-safe.
- Biet `@Value` khong tu kich hoat validation annotation.
- Biet `@ConfigurationProperties` ho tro List/Map tot hon.

**Ban dung can nho:**

```text
@Value = doc config le, nhanh nhung rai rac va kho validate.
@ConfigurationProperties = bind nhom config vao object Java type-safe, de validate va de quan ly.
```

### Cau 2

**Ban da noi duoc:**

- Co `@ConfigurationProperties(prefix = "shopcore")`.
- Co nested class `Jwt`.
- Co `secret`.
- Co `expirationMinutes`.
- Dung `int` cho minutes.

**Con thieu/sai nho:**

- Cau hoi chi can bind toi thieu, chua can validation.
- Package `exception` khong hop ly cho config class.
- Import `LocalDateTime` thua.

**Ban toi thieu dung:**

```java
@Getter
@Setter
@ConfigurationProperties(prefix = "shopcore")
public class ShopcoreProperties {

    private Jwt jwt = new Jwt();

    @Getter
    @Setter
    public static class Jwt {
        private String secret;
        private int expirationMinutes;
    }
}
```

### Cau 3

**Ban da noi duoc:**

- `@ConfigurationPropertiesScan` bao Spring scan class properties.
- Scan de dang ky bean.
- Quen scan thi Spring khong co bean.
- Scan khac validation.

**Ban dung can nho:**

```text
@ConfigurationPropertiesScan = scan va tao bean properties.
@Validated/@Valid = validate gia tri trong bean.
```

### Cau 4

**Ban da noi duoc:**

- App start thi scan properties class.
- `@Validated`, `@Valid`, `@NotBlank`, `@Min` dung de validation config.
- Thieu `jwt.secret` thi fail luc chay app/start.
- Co code validation day du.

**Can sua cach dien dat:**

- Dung annotation la `@Validated`, khong phai `@Validation`.
- Nen noi ngan: fail luc app start, truoc request.

**Ban dung can nho:**

```java
@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "shopcore")
public class ShopcoreProperties {

    @Valid
    private Jwt jwt = new Jwt();

    @Getter
    @Setter
    public static class Jwt {
        @NotBlank
        private String secret;

        @Min(1)
        private int expirationMinutes = 60;
    }
}
```

```text
Thieu jwt.secret
-> app fail luc start
-> trong luc bind/validate ShopcoreProperties
-> truoc khi Controller nhan request.
```

### Cau 5

**Ban da noi duoc:**

- Class cha co `@Validated`.
- Nested object `jwt` can `@Valid`.
- `@Valid` giup validate sau vao nested class.
- Dung tu khoa cascade valid.

**Ban dung can nho:**

```text
@Valid tren private Jwt jwt giup Bean Validation cascade vao object con Jwt.
Nho vay @NotBlank secret va @Min expirationMinutes ben trong Jwt duoc check.
Giong nested DTO M1-4: validate object cha chua du, phai validate object con.
```

### Cau 6

**Ban da noi duoc:**

- List YAML dung `-`.
- Map YAML la key-value.
- Duration co the viet `60m`.
- Java type: `List<String>`, `Map<String, Boolean>`, `Duration`.

**Can sua:**

- Nen dung `allowed-origins`, khong phai `allow-origins`, de bind vao `allowedOrigins`.
- Map nen viet dung indentation va dung vi tri.

**Ban dung can nho:**

```yaml
shopcore:
  cors:
    allowed-origins:
      - skibidi
      - dopdopyesyes
```

```java
private List<String> allowedOrigins;
```

```yaml
shopcore:
  feature-flags:
    checkout-v2: true
    coupon: false
```

```java
private Map<String, Boolean> featureFlags;
```

```yaml
shopcore:
  jwt:
    expiration: 60m
```

```java
private Duration expiration;
```

## 4. Diem nhom kien thuc

| Nhom | Diem | Danh gia |
|---|---:|---|
| Ly do dung `@ConfigurationProperties` | 5/5 | 🟢 Tot |
| Bind YAML vao class | 7/8 | 🟢 Tot |
| Scan properties | 4.5/5 | 🟢 Tot |
| Validation config | 7/8 | 🟢 Dat |
| Nested `@Valid` | 6.5/7 | 🟢 Tot |
| List/Map/Duration | 5.5/7 | 🟡 Can can than YAML |

## 5. Kien thuc can doc lai

- YAML relaxed binding: `allowed-origins` -> `allowedOrigins`.
- Map indentation trong YAML.
- Khac nhau giua cau hoi "bind toi thieu" va "them validation".

## 6. Quyet dinh

| Diem | Trang thai | Hanh dong |
|---:|---|---|
| 89/100 | 🟢 Dat Lesson 03 | Sang Lesson 04 |

Ket luan: **Lesson 03 da pass 🟢.**

## 7. Hanh dong tiep theo

1. Doc `LESSON_04_SECRETS_ENV_MINI_PROJECT.md`.
2. Lam bai kiem tra Lesson 04.
3. Sau Lesson 04 se lam/tong hop deliverable M1-5 cho `shopcore`.

