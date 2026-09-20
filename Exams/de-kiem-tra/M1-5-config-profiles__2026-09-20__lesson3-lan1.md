# Bai kiem tra M1-5 - Lesson 03

> Trong tam: `@ConfigurationProperties`, typed config va validation.  
> Tong diem tho: 40 diem.

## Cau 1 - Vi sao can `@ConfigurationProperties`? (5d)

So sanh `@Value` voi `@ConfigurationProperties` khi config co nhom `shopcore.jwt`, `shopcore.cors`, `shopcore.upload`.

**Tra loi:**

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

---

## Cau 3 - Scan properties (5d)

`@ConfigurationPropertiesScan` dung de lam gi? Neu quen annotation nay thi co the gap loi gi?

**Tra loi:**

---

## Cau 4 - Validation config (8d)

Them validation cho:

```text
jwt.secret: khong duoc blank
jwt.expirationMinutes: toi thieu 1
```

Neu thieu `jwt.secret`, app nen fail luc nao?

**Tra loi:**

---

## Cau 5 - Nested object va `@Valid` (7d)

Vi sao field nested nhu `private Jwt jwt` nen co `@Valid`? No giong bai nested DTO o M1-4 o diem nao?

**Tra loi:**

---

## Cau 6 - List/Map/Duration (7d)

Ke vi du mot config list, mot config map, va mot config `Duration` trong YAML va kieu Java tuong ung.

**Tra loi:**

