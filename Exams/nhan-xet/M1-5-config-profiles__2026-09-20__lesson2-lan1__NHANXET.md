# Nhan xet M1-5 Config & Profiles - Lesson 02 lan 1

> File duoc cap nhat sau khi cham lai bai `Exams/de-kiem-tra/M1-5-config-profiles__2026-09-20__lesson2-lan1.md`.

## 1. Diem tong

- Diem tho: **36.5/40**
- Diem thang 100: **91/100**
- Trang thai lesson: **🟢 Dat**

Nhan xet ngan:

Ban da sua dung cac loi chinh cua lan truoc. Hien tai ban nam duoc profile la moi truong active, cach file profile merge/override, cach kich hoat profile, khi nao dung `@Profile`, va vi sao khong nen commit active `prod`.

## 2. Bang diem tung cau

| Cau | Diem toi da | Diem dat | Nhan xet |
|---|---:|---:|---|
| 1 | 5 | 4.5 | Hieu profile la moi truong dang chay, co dev/test/prod va config khac nhau nhu DB/JWT/CORS/DDL. Nen noi gon hon vai tro tung moi truong. |
| 2 | 7 | 6.5 | Noi dung dung: `application.yml` chung, dev/test/prod rieng. Nen them ro "profile-specific file override key trung". |
| 3 | 7 | 7 | Dung hoan toan: `server.port=9090`, expiration van la `60`, vi dev override port va key con lai lay tu chung. |
| 4 | 6 | 5.5 | Da neu du nhieu cach kich hoat: IntelliJ/VM, program args, jar arg, yml, env var. Loi nho: neu viet trong YAML thi can phan cap ro. |
| 5 | 8 | 7.5 | Dung ban chat: gia tri config khac nhau dung file profile; bean dev-only dung `@Profile("dev")`; co code DataSeeder. |
| 6 | 7 | 5.5 | Da neu dung rui ro local/test chay product/prod, DB production va secret production. Nen bo cau "lo moi truong production" va them y active profile nen do moi truong deploy quyet dinh. |

## 3. Nhung diem con thieu nho

### Cau 2 - Them tu khoa override

Ban nen nho cau:

```text
application.yml chua config chung.
application-{profile}.yml ghi de key trung voi config chung.
Key nao profile file khong co thi lay tu application.yml.
```

### Cau 4 - Viet YAML active profile dung phan cap

Neu kich hoat trong YAML thi viet:

```yaml
spring:
  profiles:
    active: dev
```

Nhung khong nen commit active profile co dinh neu project can chay nhieu moi truong.

### Cau 6 - Rui ro prod can noi chinh xac

Y dung:

```text
Khong commit spring.profiles.active=prod vi local/test co the vo tinh chay profile prod,
ket noi DB production, dung secret production, va co nguy co ghi/sua/xoa data that.
```

Khong can noi "lo moi truong production"; van de chinh la **chay nham production config**.

## 3.5. Chua bai tung cau - Ban noi duoc gi, thieu gi, ban dung la gi

### Cau 1 - Profile la gi?

**Ban da noi duoc:**

- Profile la ten moi truong dang chay cua du an.
- Biet co cac moi truong nhu dev, test/staging, production.
- Hieu moi moi truong co config/value khac nhau.
- Dua duoc vi du config co the khac: database, JWT, DDL, CORS, bean.

**Con thieu nho:**

- Nen noi ro hon muc dich tung moi truong:
  - `dev`: chay local, DB local, log nhieu.
  - `test`: chay test/integration test, config on dinh.
  - `prod`: production, DB that, secret that tu env var, log gon.

**Ban dung can nho:**

```text
Profile la moi truong/cau hinh dang active cua Spring app.
shopcore can dev/test/prod vi cung mot code nhung moi moi truong dung DB, secret, logging, CORS va setting JPA khac nhau.
```

### Cau 2 - Vai tro cac file config

**Ban da noi duoc:**

- `application.yml` la config chung.
- `application-dev.yml` la config cua dev.
- `application-test.yml` la config cua test/staging.
- `application-prod.yml` la config cua production.

**Con thieu nho:**

- Can noi them y quan trong: file theo profile se **ghi de key trung** voi `application.yml`.
- Key nao profile file khong khai bao thi van lay tu file chung.

**Ban dung can nho:**

```text
application.yml:
  chua config chung cho moi profile.

application-dev.yml / application-test.yml / application-prod.yml:
  chua config rieng cua tung moi truong.
  Khi profile tuong ung active, file nay merge voi application.yml.
  Key trung thi profile-specific file override file chung.
  Key khong trung thi lay tu application.yml.
```

### Cau 3 - Merge config

**Ban da noi duoc:**

- `server.port = 9090`.
- `shopcore.jwt.expiration-minutes = 60`.
- Hieu `application-dev.yml` uu tien hon file chung voi key no co.
- Hieu key khong co trong dev thi lay tu config chung.

**Con thieu:**

- Gan nhu khong thieu. Cau nay lam tot.

**Ban dung can nho:**

```text
Khi active profile dev:
application.yml + application-dev.yml = Environment cuoi cung.

server.port:
  application.yml co 8080
  application-dev.yml co 9090
  -> lay 9090

shopcore.jwt.expiration-minutes:
  application.yml co 60
  application-dev.yml khong khai bao
  -> lay 60
```

### Cau 4 - Cach kich hoat profile

**Ban da noi duoc:**

- Kich hoat bang IntelliJ Run/Debug Configuration.
- Biet VM option `-Dspring.profiles.active=dev`.
- Biet program argument `--spring.profiles.active=dev`.
- Biet command line `java -jar shopcore.jar --spring.profiles.active=dev`.
- Biet env var `SPRING_PROFILES_ACTIVE=dev`.
- Biet co the set trong YAML.

**Con thieu nho:**

- Neu viet trong YAML phai dung phan cap:

```yaml
spring:
  profiles:
    active: dev
```

- Nen can than: khong nen commit active profile co dinh neu project can chay nhieu moi truong.

**Ban dung can nho:**

```text
3 cach pho bien:

1. Program argument / jar:
   java -jar shopcore.jar --spring.profiles.active=dev

2. Environment variable:
   SPRING_PROFILES_ACTIVE=dev

3. IntelliJ Program arguments:
   --spring.profiles.active=dev

Co the dung VM option:
   -Dspring.profiles.active=dev

Co the khai bao trong YAML, nhung khong nen commit co dinh neu app can deploy nhieu moi truong.
```

### Cau 5 - File profile vs `@Profile`

**Ban da noi duoc:**

- Gia tri config khac nhau thi dung file profile.
- `@Profile` la annotation de bean chi dang ky khi profile do active.
- Viet duoc code:

```java
@Bean
@Profile("dev")
CommandLineRunner dataSeeder() {
    return args -> {
        // seed data dev
    };
}
```

**Con thieu nho:**

- Nen noi ro cau chot:

```text
Gia tri khac nhau -> file profile.
Bean co ton tai hay khong -> @Profile.
```

- Nen tranh noi `@ConfigurationProperties` la bean can `@Profile` trong cau nay, vi `@ConfigurationProperties` la typed config. `@Profile` chi nen dung khi ban muon bean do co/khong co theo moi truong.

**Ban dung can nho:**

```text
Dung file profile khi muon doi value:
- DB URL
- username/password
- CORS
- logging level
- JPA ddl-auto
- JWT secret

Dung @Profile khi muon bat/tat bean:
- DataSeeder chi chay dev
- FakePaymentService chi chay test
- ProdEmailSender chi chay prod
```

### Cau 6 - Vi sao khong commit `spring.profiles.active=prod`

**Ban da noi duoc:**

- Da sua dung y: local/test co the chay product/prod that.
- Biet co the dung DB production va secret production.
- Hieu khi dev thi nen dung moi truong dev, khong dung production.

**Con thieu nho:**

- Cau "lo moi truong production" khong phai trong tam.
- Trong tam la **chay nham production config**, co the gay tac dong that len data that.
- Nen them y: active profile nen do moi truong chay/deploy quyet dinh, khong nen hard-code trong repo.

**Ban dung can nho:**

```text
Khong nen commit spring.profiles.active=prod vi dev/test co the vo tinh chay bang profile prod.

He qua:
- Ket noi DB production.
- Dung secret production.
- Goi service/email/payment that.
- Ghi/sua/xoa data that.
- Local/test phu thuoc env var production.

Active profile nen duoc truyen tu noi chay app:
- local/IDE -> dev
- CI/test -> test
- server production -> prod
```

## 3.6. Ban tom tat dung de hoc lai

```text
Profile = moi truong/cau hinh dang active cua Spring app.

application.yml = config chung.
application-dev.yml/test/prod.yml = config rieng tung moi truong.

Active profile dev:
application.yml + application-dev.yml -> Environment cuoi cung.
Key trung -> file dev override.
Key khong trung -> lay tu file chung.

Kich hoat profile:
--spring.profiles.active=dev
SPRING_PROFILES_ACTIVE=dev
-Dspring.profiles.active=dev

File profile dung de doi gia tri config.
@Profile dung de bat/tat bean.

Khong commit active prod vi local/test co the chay nham production config.
```

## 4. Diem nhom kien thuc

| Nhom | Diem | Danh gia |
|---|---:|---|
| Khai niem profile | 4.5/5 | 🟢 Tot |
| File profile va merge config | 13.5/14 | 🟢 Tot |
| Kich hoat profile | 5.5/6 | 🟢 Tot |
| `@Profile` tren bean | 7.5/8 | 🟢 Tot |
| Rủi ro production profile | 5.5/7 | 🟡 Con can noi gon/chuan hon |

## 5. Kien thuc da nam

| Topic | Danh gia |
|---|---|
| Profile la gi | 🟢 Nam |
| `application.yml` vs `application-dev.yml` | 🟢 Nam |
| Merge/override config | 🟢 Nam |
| Kich hoat profile | 🟢 Nam |
| `@Profile` cho bean | 🟢 Nam |
| Khong commit active prod | 🟡 Nam y, can dien dat chuan hon |

## 6. Phac do tiep theo

- `@ConfigurationProperties` -> `LESSON_03_CONFIGURATION_PROPERTIES_TYPED_CONFIG.md` -> 60 phut -> tao `ShopcoreProperties`.
- Nested config validation -> Lesson 03 -> 30 phut -> them `@Validated`, `@Valid`, `@NotBlank`, `@Min`.
- Bind list/map/duration -> Lesson 03 -> 20 phut -> viet YAML + field Java tuong ung.

## 7. Quyet dinh

| Diem | Trang thai | Hanh dong |
|---:|---|---|
| 91/100 | 🟢 Dat Lesson 02 | Sang Lesson 03 `@ConfigurationProperties` |

Ket luan: **Lesson 02 da pass 🟢. Tiep tuc Lesson 03.**

## 8. Hanh dong tiep theo

1. Doc `Notes/M1_Spring_Boot/M1_5_Config_Profiles/LESSON_03_CONFIGURATION_PROPERTIES_TYPED_CONFIG.md`.
2. Lam `Exams/de-kiem-tra/M1-5-config-profiles__2026-09-20__lesson3-lan1.md`.
3. Gui minh cham tiep.
