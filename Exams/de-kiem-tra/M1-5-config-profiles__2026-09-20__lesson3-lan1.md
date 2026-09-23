# Bai kiem tra M1-5 - Lesson 03

> Trong tam: `@ConfigurationProperties`, typed config va validation.  
> Tong diem tho: 40 diem.

## Cau 1 - Vi sao can `@ConfigurationProperties`? (5d)

So sanh `@Value` voi `@ConfigurationProperties` khi config co nhom `shopcore.jwt`, `shopcore.cors`, `shopcore.upload`.

**Tra loi:**
@Value để config riêng lẻ từng cái , viết ra từng cái nhưng mà khó quản lý do vì nếu như có cùng prefix là shopcore thì sau này thay đổi thành shoppecore thì phải đổi ở từng dòng ( khó quản lý)
@ConfigurationProperties thì gom lại chung prefix thì chung 1 nhóm và sau đó biến nó thành class object để mà quản lý , sau đó là dependency injection vô class cần dùng và nó sẽ binding các field . type-safe khi mà ConfigurationProperties ta làm thành object thì các field trong nested class thì sẽ có type thì khi ở file service cần xài thì phải đúng field , validation thì @Value thì phải tự tạo if để kiểm tra hoặc dùng @PostConstruct r tạo hàm valid để mà kiểm tra , nếu xài @Value xong ở dưới @isblank thì nó sẽ k có kiểm tra blank dc vì k có cơ chế tự động kích hoạt valid , có thể nó inject value xogn r k có khích hoạt isblank luôn , muốn vậy thì dùng @PostConstructor r Validator.validate(this), còn @ConfigurationProperties sẽ có @Validation ở class cha và nested class sẽ dùng @Valid . List-map thì là @Configuration sẽ dùng dc List và Map 
---

## Cau 2 - Bind YAML vao class (8d)

Cho YAML:

```yaml
shopcore:
  jwt:
    secret: dev-secret
    expiration-minutes: 60
```

Viet class `ShopcoreProperties` toi thieu de bind nhom `jwt`.

**Tra loi:**
package com.nhan.identity_service.exception;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;

@Validated
@ConfigurationProperties(prefix = "shopcore")
@Getter
@Setter
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



---


## Cau 3 - Scan properties (5d)

`@ConfigurationPropertiesScan` dung de lam gi? Neu quen annotation nay thi co the gap loi gi?

**Tra loi:**
dùng để báo cho Spring biết là có ConfigurationProperties trong dự án và cần nó scan để đăng ký configurationPropertiest để làm bean  , và sẽ có @Valid để kiểm tra tính đúng đắn của dữ liệu , scan khác với validation . Quên thì spring k biết để quét thì nó sẽ k có bean
---

## Cau 4 - Validation config (8d)

Them validation cho:

```text
jwt.secret: khong duoc blank
jwt.expirationMinutes: toi thieu 1
```

Neu thieu `jwt.secret`, app nen fail luc nao?

** khi mà ở class chứa main để chạy appilcation á , thì có Annonation là @ConfigurationPropertiesScan thì khi khởi động dự án , nó sẽ quét toàn bộ dự án để tìm ConfigurationProperties để mà đăng ký làm bean , thì nó sẽ quét và nếu như cái ConfigurationProperties đó có annonation là @Validation và bên trong field có @Valid thì nó sẽ thêm phần kiểm tra tính đúng dắnd của dữ liệu , nếu ở đây mà sai thì nso sẽ dừng chương trình và quăng ra lỗi .
nếu thiếu jwt.sercret thfi sẽ fail lúc mà khi chạy app ,


@Validated
@ConfigurationProperties(prefix = "shopcore")
@Getter
@Setter
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
 
---

## Cau 5 - Nested object va `@Valid` (7d)

Vi sao field nested nhu `private Jwt jwt` nen co `@Valid`? No giong bai nested DTO o M1-4 o diem nao?

**Tra loi:** để bảo vệ tính đúng đắng của field  đầu tiên là Class ConfigurationProperties phải có @Validated để báo cho Spring biết là Annonation này ConfigurationProperties sẽ có kiểm tra valid và bên trong nested file thì sẽ có các field và dùng annonation @Valid để kiểm tra tính đúng đắng của dữ liệu . Nested field như private Jwt jwt nên có @Valid thì @Validation ở class cha nó k có tự động Valid xâu vô đâu , nên là cần phải có @Valid ở     private Jwt jwt = new Jwt() , có nghĩa là ở class cha có @Validation thì chỉ báo thôi ( tôi nghĩ vậy do nó thường chứa các nested class thì cần phải có @Valid trước mỗi nested class đó là vì vậy ) . Có nghĩa là nó là cascade valid , là @Validation để cho class cha kích hoạt valid và từng class con phải có @Valid để có thể kiểm tra được các field

---

## Cau 6 - List/Map/Duration (7d)

Ke vi du mot config list, mot config map, va mot config `Duration` trong YAML va kieu Java tuong ung.

**Tra loi:**
shopcore:
  cors:
    allow-origins:
      - skibidi
      - dopdopyesyes

ở trong java thì là nó là Arraylist 
là allowOrigins

shopcore:
  cors:
      feature-flags:
        checkout-v2: true
        coupon: false
ở trong java thì sẽ là map featureFlags

shopcore:
  jwt:
    expiration: 60m
ở trong java thì sẽ là private Duration expiration = Duration.ofMinutes(60);

private List<String> allowedOrigins;
private Map<String, Boolean> featureFlags;
private Duration expiration;