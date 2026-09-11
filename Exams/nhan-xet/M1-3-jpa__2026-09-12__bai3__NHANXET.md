# Nhan xet bai cham - M1-3 JPA Bai 03 @Transactional

> File de: `Exams/de-kiem-tra/M1-3-jpa__2026-09-12__bai3.md`  
> Ngay cham: 2026-09-12  
> Ket qua: **40/43 diem tho = 93/100 - Dat bai 03**

---

## 1. Tong ket

Ban da nam tot bai `@Transactional`.

Diem manh:

```text
Hieu transaction la don vi cong viec.
Hieu commit/rollback.
Hieu AppException extends RuntimeException nen rollback.
Hieu readOnly dung cho read method.
Hieu dirty checking: managed entity + snapshot + commit.
Hieu propagation REQUIRED dung chung transaction hien tai.
Hieu isolation anomalies: dirty read, non-repeatable read, phantom read.
```

Con thieu nhe:

```text
Checked exception muon rollback can ghi ro rollbackFor.
readOnly=true khong nen hieu la "cam tuyet doi write" trong moi truong hop, ma la hint/optimization va the hien y dinh read.
Propagation.REQUIRED can noi du: neu chua co transaction thi tao transaction moi.
```

---

## 2. Bang diem tung cau

| Cau | Diem | Nhan xet |
|---|---:|---|
| 1 | 3/3 | Transaction, commit, rollback dung |
| 2 | 3/3 | Dat o Service, phan biet read/write method tot |
| 3 | 3/3 | AppException rollback do extends RuntimeException |
| 4 | 2.3/3 | Dung y checked exception khong rollback mac dinh, thieu cu phap `rollbackFor` |
| 5 | 2.7/3 | Dung readOnly cho read, khong dung write; dien dat "khong cho phep doi DB" hoi manh |
| 6 | 3/3 | Dirty checking tot |
| 7 | 4.5/5 | Flow transaction tot, can noi ro method ket thuc binh thuong moi commit |
| 8 | 4.5/5 | REQUIRED dung chung transaction hien tai, thieu y neu chua co thi tao moi |
| 9 | 4.5/5 | Isolation anomalies tot, nen noi ro khong tu doi isolation lung tung |
| 10 | 9.5/10 | Code mini dung, thieu nhe `@Service` annotation/format |

Tong: **40/43 = 93/100**

---

## 3. Cac loi/thieu can ghi nho

### Checked exception rollback

Dung:

```java
@Transactional(rollbackFor = SomeCheckedException.class)
```

Mac dinh Spring rollback voi:

```text
RuntimeException
Error
```

Khong rollback mac dinh voi:

```text
checked exception
```

### readOnly = true

Nen hieu:

```text
readOnly = true the hien method chi doc du lieu.
Co the giup Hibernate/database toi uu.
Khong nen dung cho create/update/delete.
```

Khong nen noi qua tuyet doi:

```text
readOnly = true cam 100% moi thay doi DB
```

### Propagation.REQUIRED

Can noi du 2 ve:

```text
Neu da co transaction -> tham gia transaction hien tai.
Neu chua co transaction -> tao transaction moi.
```

---

## 4. Kien thuc can hoc lai nhe

`checked exception rollback` -> `Notes/M1_Spring_Boot/README_M1_3_BAI_03_TRANSACTIONAL.md` muc 6 -> 5 phut -> viet lai cu phap `rollbackFor`.

`Propagation.REQUIRED` -> cung file muc 9 -> 5 phut -> noi lai 2 truong hop co/chua co transaction.

`readOnly=true` -> muc 7 -> 5 phut -> viet lai dung la hint/intent read, khong dung cho write.

---

## 5. Hanh dong tiep theo

Duoc phep di tiep:

```text
M1-3 Bai 04 - Lazy vs Eager + relationship
```

Trong bai 04 can tap trung:

```text
Lazy loading
Eager loading
LazyInitializationException
Product -> Category relationship
DTO mapping khi co lazy relation
```

