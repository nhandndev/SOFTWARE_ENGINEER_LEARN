# Bai kiem tra M1-5 - Lesson 02

> Trong tam: Spring Profiles `dev/test/prod`.  
> Tong diem tho: 40 diem.

## Cau 1 - Profile la gi? (5d)

Profile trong Spring Boot la gi? Vi sao `shopcore` nen co `dev`, `test`, `prod`?

**Tra loi:**

---

## Cau 2 - File config theo profile (7d)

Giai thich vai tro cua:

```text
application.yml
application-dev.yml
application-test.yml
application-prod.yml
```

File nao nen chua config chung? File nao ghi de theo moi truong?

**Tra loi:**

---

## Cau 3 - Merge config (7d)

Cho:

`application.yml`

```yaml
server:
  port: 8080
shopcore:
  jwt:
    expiration-minutes: 60
```

`application-dev.yml`

```yaml
server:
  port: 9090
```

Khi chay profile `dev`, `server.port` va `shopcore.jwt.expiration-minutes` la bao nhieu? Giai thich.

**Tra loi:**

---

## Cau 4 - Kich hoat profile (6d)

Ke 3 cach kich hoat profile `dev`.

**Tra loi:**

---

## Cau 5 - `@Profile` (8d)

Khi nao dung file profile, khi nao dung `@Profile` tren bean? Cho vi du `DataSeeder` chi chay o dev.

**Tra loi:**

---

## Cau 6 - Loi nguy hiem (7d)

Vi sao khong nen commit `spring.profiles.active=prod` co dinh vao repo? No co the gay loi gi?

**Tra loi:**

