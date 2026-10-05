# Dap an M1-5 - Lesson 02

> Tong diem tho: 40 diem.

## Cau 1 - 5d

Profile la moi truong/cau hinh dang active cua Spring app.

`shopcore` nen co:

```text
dev: DB local, log nhieu
test: config on dinh cho test
prod: DB/secret that tu env var, log gon
```

## Cau 2 - 7d

```text
application.yml: config chung.
application-dev.yml: config rieng cho dev.
application-test.yml: config rieng cho test.
application-prod.yml: config rieng cho production.
```

Profile-specific file ghi de key trung voi file chung.

## Cau 3 - 7d

Profile `dev`:

```text
server.port = 9090
shopcore.jwt.expiration-minutes = 60
```

Vi `application-dev.yml` ghi de `server.port`, con `expiration-minutes` khong bi ghi de nen lay tu `application.yml`.

## Cau 4 - 6d

Ba cach:

```bash
java -jar shopcore.jar --spring.profiles.active=dev
```

```bash
SPRING_PROFILES_ACTIVE=dev
```

IDE program argument:

```text
--spring.profiles.active=dev
```

## Cau 5 - 8d

Gia tri config khac nhau thi dung file profile.

Bean co ton tai hay khong thi dung `@Profile`.

Vi du:

```java
@Bean
@Profile("dev")
CommandLineRunner dataSeeder() {
    return args -> {
        // seed data dev
    };
}
```

## Cau 6 - 7d

Khong nen commit active prod vi dev/test co the vo tinh chay bang profile prod, ket noi DB production hoac can secret production. Active profile nen duoc truyen tu moi truong chay.

