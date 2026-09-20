# Dap an M1-5 - Lesson 04

> Tong diem tho: 40 diem.

## Cau 1 - 5d

Secret:

```text
DB password
JWT secret
API key
OAuth client secret
SMTP password
private key
```

Khong phai secret:

```text
server.port
app name
jwt expiration minutes
max page size
```

## Cau 2 - 7d

`${JWT_SECRET}` nghia la lay gia tri tu env var `JWT_SECRET`.

Prod khong set `JWT_SECRET` thi app nen fail luc start. Vi secret la bat buoc; neu app van chay voi secret rong/default yeu thi nguy hiem.

## Cau 3 - 7d

Nguy hiem vi neu quen set env var, app production van chay bang `default-secret`, rat de bi doan/lo.

Default chap nhan voi config khong nhay cam:

```text
server port
timeout
expiration minutes
upload max size
```

## Cau 4 - 6d

Nen commit:

```text
.env.example
application-prod.yml voi placeholder env var
```

Khong nen commit:

```text
.env
private-key.pem
```

## Cau 5 - 8d

Can co:

```text
application.yml
application-dev.yml
application-test.yml
ShopcoreProperties
@ConfigurationPropertiesScan
validation cho config bat buoc
khong hard-code secret that
service doc config qua properties class
huong dan env var can set
```

## Cau 6 - 7d

Test dev:

```bash
java -jar target/shopcore.jar --spring.profiles.active=dev
```

Kiem tra log active profile va config DB/log.

Test prod:

```bash
export DB_URL=...
export DB_USERNAME=...
export DB_PASSWORD=...
export JWT_SECRET=...
java -jar target/shopcore.jar --spring.profiles.active=prod
```

Thu bo `JWT_SECRET` de dam bao app fail fast.

