# M1-5 - Config, Profiles & ConfigurationProperties

> Muc tieu module: biet tach config khoi code, chay ung dung theo profile `dev/test/prod`, bind config thanh class type-safe, va khong commit secret vao repo.

## Vi sao hoc module nay?

Tu M1-2 den M1-4, ban da viet Controller, Service, Repository, Validation va Error Handler.

Nhung project thuc te khong nen hard-code:

```java
String jwtSecret = "abc123";
int tokenExpirationDays = 7;
String frontendUrl = "http://localhost:3000";
```

Vi nhung gia tri nay thay doi theo moi truong:

```text
May dev       -> DB local, log nhieu, secret gia
Moi truong test -> DB test, data test
Production    -> DB that, secret that, log gon hon
```

M1-5 giup ban tra loi:

```text
Config nam o dau?
Profile nao dang chay?
Lop nao doc config?
Secret co duoc commit khong?
Khi thieu config bat buoc thi app nen fail som hay ngam chay?
```

## Cach chia 4 lesson

> Ghi nho cho cac module sau: moi lesson nen co muc `Tai lieu / video nen xem` o dau bai, gom link official, 1-2 bai doc phu va tu khoa video de search.

### Lesson 01 - Externalized Config, YAML va `@Value`

**File hoc:** `LESSON_01_EXTERNALIZED_CONFIG_YAML_VALUE.md`

**Hoc gi:**

- Externalized config la gi.
- `application.properties` vs `application.yml`.
- YAML indentation, list, map.
- Placeholder `${KEY:default}`.
- Doc config nhanh bang `@Value`.
- Gioi han cua `@Value`.

**Bai kiem tra:** `Exams/de-kiem-tra/M1-5-config-profiles__2026-09-20__lesson1-lan1.md`

### Lesson 02 - Profiles `dev/test/prod`

**File hoc:** `LESSON_02_PROFILES_DEV_TEST_PROD.md`

**Hoc gi:**

- Profile la gi.
- `application.yml` va `application-dev.yml`.
- Thu tu merge config.
- Cach kich hoat profile bang IDE, command line, env var.
- `@Profile` dung khi nao.
- Khac nhau giua config theo profile va bean theo profile.

**Bai kiem tra:** `Exams/de-kiem-tra/M1-5-config-profiles__2026-09-20__lesson2-lan1.md`

### Lesson 03 - `@ConfigurationProperties` va validation

**File hoc:** `LESSON_03_CONFIGURATION_PROPERTIES_TYPED_CONFIG.md`

**Hoc gi:**

- Vi sao `@ConfigurationProperties` tot hon `@Value` khi config co nhom.
- Tao `ShopcoreProperties`.
- Bind nested object, list, map, `Duration`.
- `@ConfigurationPropertiesScan`.
- Validate config bang `@Validated`, `@NotBlank`, `@NotNull`.
- App fail fast khi thieu config bat buoc.

**Bai kiem tra:** `Exams/de-kiem-tra/M1-5-config-profiles__2026-09-20__lesson3-lan1.md`

### Lesson 04 - Secrets, env vars va mini project

**File hoc:** `LESSON_04_SECRETS_ENV_MINI_PROJECT.md`

**Hoc gi:**

- Secret la gi.
- Khong commit password/token/private key.
- Dung env var trong YAML.
- Default value nao duoc phep, default value nao nguy hiem.
- Checklist deliverable M1-5 cho `shopcore`.
- Cach test profile/config that.

**Bai kiem tra:** `Exams/de-kiem-tra/M1-5-config-profiles__2026-09-20__lesson4-lan1.md`

## Thu tu hoc

```text
Lesson 01 -> Lesson 02 -> Lesson 03 -> Lesson 04 -> Final M1-5
```

## Tieu chi pass M1-5

- Diem kiem tra module >= 85.
- `shopcore` co `application.yml`, `application-dev.yml`, `application-test.yml`.
- Co class `ShopcoreProperties` typed config.
- Config bat buoc co validation.
- Secret that khong nam trong repo.
