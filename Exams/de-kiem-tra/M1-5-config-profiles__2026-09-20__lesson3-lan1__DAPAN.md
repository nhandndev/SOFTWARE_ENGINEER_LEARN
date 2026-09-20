# Dap an M1-5 - Lesson 03

> Tong diem tho: 40 diem.

## Cau 1 - 5d

`@Value` phu hop config le. `@ConfigurationProperties` phu hop config co nhom vi:

```text
- Type-safe.
- Gom config vao mot class.
- De validate.
- Ho tro nested/list/map tot.
- Khong rai rac String key khap code.
```

## Cau 2 - 8d

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

Co the them `@Validated` va validation o cau 4.

## Cau 3 - 5d

`@ConfigurationPropertiesScan` bao Spring scan va tao bean cho cac class `@ConfigurationProperties`.

Neu quen, inject `ShopcoreProperties` co the fail vi khong co bean.

## Cau 4 - 8d

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

Thieu `jwt.secret` thi app nen fail luc start, truoc khi nhan request.

## Cau 5 - 7d

`@Valid` tren nested field giup validation di vao object con.

Giong nested DTO M1-4:

```text
Object cha hop le chua du, phai validate tiep object con.
```

## Cau 6 - 7d

List:

```yaml
allowed-origins:
  - http://localhost:3000
```

Java:

```java
List<String> allowedOrigins;
```

Map:

```yaml
feature-flags:
  checkout-v2: true
```

Java:

```java
Map<String, Boolean> featureFlags;
```

Duration:

```yaml
expiration: 60m
```

Java:

```java
Duration expiration;
```

