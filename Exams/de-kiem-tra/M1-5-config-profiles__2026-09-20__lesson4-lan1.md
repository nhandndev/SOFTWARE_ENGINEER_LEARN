# Bai kiem tra M1-5 - Lesson 04

> Trong tam: Secrets, env vars va mini project M1-5.  
> Tong diem tho: 40 diem.

## Cau 1 - Secret la gi? (5d)

Ke 4 vi du secret trong backend. Ke 2 config khong phai secret.

**Tra loi:**

---

## Cau 2 - Env var trong YAML (7d)

Giai thich:

```yaml
shopcore:
  jwt:
    secret: ${JWT_SECRET}
```

Neu chay prod ma khong set `JWT_SECRET`, app nen bi gi? Vi sao?

**Tra loi:**

---

## Cau 3 - Default nguy hiem (7d)

Vì sao config sau nguy hiem trong production?

```yaml
shopcore:
  jwt:
    secret: ${JWT_SECRET:default-secret}
```

Khi nao default value la chap nhan duoc?

**Tra loi:**

---

## Cau 4 - `.gitignore` va `.env.example` (6d)

Nen commit file nao, khong nen commit file nao?

```text
.env
.env.example
application-prod.yml voi placeholder env var
private-key.pem
```

**Tra loi:**

---

## Cau 5 - Deliverable `shopcore` (8d)

Neu nop M1-5, project can co nhung file/class/config nao?

**Tra loi:**

---

## Cau 6 - Test profile/config (7d)

Ban se test profile `dev` va `prod` nhu the nao de biet config dang chay dung?

**Tra loi:**

