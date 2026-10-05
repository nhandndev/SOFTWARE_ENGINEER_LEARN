# Nhan xet M1-5 Config & Profiles - Lesson 01 lan 1

> File duoc cap nhat sau khi cham lai bai `Exams/de-kiem-tra/M1-5-config-profiles__2026-09-20__lesson1-lan1.md`.

## 1. Diem tong

- Diem tho: **39.5/40**
- Diem thang 100: **99/100**
- Trang thai lesson: **🟢 Dat**

Nhan xet ngan:

Ban da sua dung cac loi chinh cua lan truoc. Hien tai ban nam tot externalized config, YAML, placeholder default, `@Value` va ly do chuyen sang `@ConfigurationProperties`.

## 2. Bang diem tung cau

| Cau | Diem toi da | Diem dat | Nhan xet |
|---|---:|---:|---|
| 1 | 5 | 5 | Noi du externalized config, nhieu moi truong, khong build lai, env var va nguy co lo secret khi commit. |
| 2 | 5 | 5 | Phan biet properties phang va YAML phan cap tot; bo sung dung parser loi/bind sai. |
| 3 | 8 | 8 | YAML da dung cau truc va dung key `shopcore`. |
| 4 | 7 | 6.5 | Hieu dung placeholder va default `8080`; con typo nho `SEVER_PORT`. |
| 5 | 8 | 8 | Code `@Service` + `@Value` + field `int` dung yeu cau. |
| 6 | 7 | 7 | Giai thich tot vi sao khong spam `@Value`, co nhac gom prefix, inject, validation va autocomplete. |

## 3. Nhung loi con lai

### Cau 4 - Typo nho

Ban viet co luc:

```text
SEVER_PORT
```

Dung la:

```text
SERVER_PORT
```

Day la loi chinh ta nho, khong anh huong ban chat. Khi lam config thuc te thi ten env var sai mot chu la app khong doc duoc, nen can can than.

## 4. Kien thuc da nam

| Topic | Danh gia |
|---|---|
| Externalized config | 🟢 Nam tot |
| Secret khong hard-code | 🟢 Nam tot |
| YAML vs properties | 🟢 Nam tot |
| YAML syntax | 🟢 Da sua dung |
| Placeholder `${KEY:default}` | 🟢 Nam tot |
| `@Value` | 🟢 Nam du cach viet co ban |
| Khi nao dung `@ConfigurationProperties` | 🟢 Nam dung huong |

## 5. Phac do tiep theo

- Profiles `dev/test/prod` -> `LESSON_02_PROFILES_DEV_TEST_PROD.md` -> 45 phut -> lam bai kiem tra Lesson 02.
- Merge config `application.yml` + `application-dev.yml` -> Lesson 02 -> 15 phut -> tu viet 2 file YAML va noi key nao bi override.
- `@Profile` tren bean -> Lesson 02 -> 15 phut -> viet vi du DataSeeder chi chay profile `dev`.

## 6. Quyet dinh

| Diem | Trang thai | Hanh dong |
|---:|---|---|
| 99/100 | 🟢 Dat Lesson 01 | Sang Lesson 02 Profiles |

Ket luan: **Lesson 01 da pass 🟢. Tiep tuc Lesson 02.**

## 7. Hanh dong tiep theo

1. Doc `Notes/M1_Spring_Boot/M1_5_Config_Profiles/LESSON_02_PROFILES_DEV_TEST_PROD.md`.
2. Lam `Exams/de-kiem-tra/M1-5-config-profiles__2026-09-20__lesson2-lan1.md`.
3. Gui minh cham tiep.

