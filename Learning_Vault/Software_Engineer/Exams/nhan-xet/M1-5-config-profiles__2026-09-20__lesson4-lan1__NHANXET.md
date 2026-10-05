# Nhan xet M1-5 Config & Profiles - Lesson 04 lan 1

> Snapshot cap nhat sau khi cham lai bai `Exams/de-kiem-tra/M1-5-config-profiles__2026-09-20__lesson4-lan1.md`.

## 1. Diem tong

- Diem tho: **35/40**
- Diem thang 100: **88/100**
- Trang thai: **🟢 Dat lesson**

Nhan xet ngan:

Ban da va duoc phan quan trong nhat cua Lesson 04: secret nao khong duoc hard-code, vi sao prod phai fail khi thieu env var, vi sao default secret nguy hiem, file nao duoc commit va khong duoc commit. Cau 5 va cau 6 da tien bo ro: ban da biet can `ShopcoreProperties`, validation config, `.gitignore`, `@ConfigurationPropertiesScan`, service doc config qua typed properties, chay dev/prod bang profile va test fail-fast bang cach bo env var bat buoc.

## 2. Bang diem tung cau

| Cau | Diem toi da | Diem dat | Nhan xet |
|---|---:|---:|---|
| 1 | 5 | 4 | Dung y: JWT secret, DB password, API key la secret; token expiration, host/port khong phai secret. Thieu mot vi du secret nua nhu private key/OAuth client secret/SMTP password. |
| 2 | 7 | 6 | Hieu `${JWT_SECRET}` lay tu env var va neu thieu thi app fail luc start. Hoi lech nhe sang `@Value`, nhung ban chat dung. |
| 3 | 7 | 6.5 | Giai thich tot vi sao `default-secret` nguy hiem. Thieu phan noi ro default chap nhan voi config khong nhay cam. |
| 4 | 6 | 6 | Dung: commit `.env.example` va `application-prod.yml` placeholder; khong commit `.env` va private key. |
| 5 | 8 | 6.5 | Da co y chinh ve file profile, `.env.example`, `.gitignore`, `ShopcoreProperties`, validation, scan va service dung properties. Con can goi dung `application-test.yml`, noi ro `.env` khong la file commit, va bo typo. |
| 6 | 7 | 6 | Da co check log, command dev/prod, env var prod va unset de test fail. Con thieu mot chut ve ky vong cu the khi fail: app fail luc start vi bind/validate secret bat buoc. |

## 3. Chua bai tung cau

### Cau 1 - Secret la gi?

**Ban da noi duoc:**

- JWT secret.
- DB password.
- API key.
- Config khong secret: token expiration, host/port.

**Thieu nhe:**

- De bai hoi 4 vi du secret; ban moi ke ro khoang 3 nhom.

**Dap an chuan:**

```text
Secret = gia tri neu lo ra thi nguoi khac co the truy cap, gia mao, hoac pha he thong.

Vi du secret:
- DB password
- JWT secret
- API key
- OAuth client secret
- SMTP password
- private key
- access token

Khong phai secret:
- server.port
- spring.application.name
- token expiration minutes
- upload max size
- default page size
```

### Cau 2 - `${JWT_SECRET}` trong YAML

**Ban da noi duoc:**

- Spring lay gia tri tu environment variable `JWT_SECRET`.
- Neu khong co env var va khong co default value, app se loi khi khoi dong.
- Fail luc tao/bind bean la hanh vi dung cho prod.

**Dap an chuan:**

```text
shopcore.jwt.secret: ${JWT_SECRET}

Khi app start:
-> Spring doc application-prod.yml
-> Gap placeholder ${JWT_SECRET}
-> Tim env var JWT_SECRET
-> Neu khong co, khong co default
-> Bean/config bind fail
-> App fail luc start

Voi secret bat buoc, fail-fast tot hon chay ngam voi secret rong/default yeu.
```

### Cau 3 - Default secret nguy hiem

**Ban da noi duoc:**

- `default-secret` lam app van chay duoc du chua set secret that.
- Secret default co the yeu.
- Dev co the khong nhan ra minh dang chay bang secret default.

**Thieu nhe:**

- Khi nao default value chap nhan duoc.

**Dap an chuan:**

```yaml
shopcore:
  jwt:
    secret: ${JWT_SECRET:default-secret}
```

Nguy hiem vi:

```text
Prod co the chay bang secret mac dinh.
Nhieu moi truong co the dung chung secret.
Secret co the bi doan duoc.
Loi cau hinh bi che mat thay vi fail-fast.
```

Default chap nhan voi config khong nhay cam:

```text
server.port=${SERVER_PORT:8080}
request timeout
page size
upload max size
token expiration minutes
```

### Cau 4 - Commit file nao?

**Ban dung het y chinh.**

**Dap an chuan:**

```text
Commit:
- .env.example
- application-prod.yml neu chi chua placeholder env var

Khong commit:
- .env
- private-key.pem
- secret.yml
- file chua password/token/secret that
```

`application-prod.yml` commit duoc neu no nhu vay:

```yaml
shopcore:
  jwt:
    secret: ${JWT_SECRET}
```

Khong commit neu no nhu vay:

```yaml
shopcore:
  jwt:
    secret: real-production-secret
```

### Cau 5 - Deliverable M1-5

**Ban da noi duoc:**

- Co `application.yml`.
- Co `application-dev.yml`.
- Co `application-prod.yml`.
- Co `.env.example`.
- Co `.gitignore`.
- Co `ShopCoreProperties`.
- Co validation.
- Co `@ConfigurationPropertiesScan`.
- Service doc config qua object properties.

**Can sua/bo sung:**

- `.env` co the ton tai local, nhung khong phai deliverable commit.
- Module nay can `application-test.yml`; staging la optional.
- Nen viet dung ten: `application-dev.yml`, `application-prod.yml`, `ShopcoreProperties`.

**Dap an chuan:**

```text
src/main/resources/application.yml
src/main/resources/application-dev.yml
src/main/resources/application-test.yml
src/main/resources/application-prod.yml

ShopcoreProperties.java
@ConfigurationProperties(prefix = "shopcore")
@Validated

Main application:
@ConfigurationPropertiesScan

Service:
Inject ShopcoreProperties, khong doc config bang String rai rac.

.env.example hoac README:
Huong dan DB_URL, DB_USERNAME, DB_PASSWORD, JWT_SECRET...

.gitignore:
.env
*.pem
secret*.yml
```

### Cau 6 - Test profile/config

**Ban da noi duoc:**

- Check log active profile va port.
- Chay dev bang `--spring.profiles.active=dev`.
- Set env var prod.
- Chay prod.
- Unset mot bien bat buoc de test fail.

**Thieu nhe:**

- Noi ro expected result khi fail.

**Dap an chuan:**

Test dev:

```bash
java -jar target/shopcore.jar --spring.profiles.active=dev
```

Kiem tra:

```text
Log hien active profile "dev".
Port, datasource, log level, config cua dev dung nhu mong doi.
```

Test prod local:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/shopcore
export DB_USERNAME=postgres
export DB_PASSWORD=postgres
export JWT_SECRET=local-prod-secret

java -jar target/shopcore.jar --spring.profiles.active=prod
```

Test fail-fast:

```bash
unset JWT_SECRET
java -jar target/shopcore.jar --spring.profiles.active=prod
```

Ky vong:

```text
App fail luc start.
Ly do: secret bat buoc khong duoc cung cap hoac validation config fail.
```

## 4. Phan can doc lai

1. Secret that khong duoc co default trong production.
2. `.env.example` commit; `.env` khong commit.
3. `application-prod.yml` commit duoc neu chi chua placeholder.
4. `@ConfigurationPropertiesScan` la cau noi de Spring tim typed config class.
5. Service nen inject `ShopcoreProperties`, khong doc config lung tung bang nhieu `@Value`.
6. Test config phai test ca happy path va fail-fast path.

## 5. Ket luan

Lesson 04: **Dat**.

Chua nen danh dau ca module M1-5 la hoan thanh neu chua kiem tra deliverable trong `shopcore`. Buoc tiep theo nen la lam/kiem tra mini deliverable config profile trong project that.
