# Snapshot cham bai M1-3 JPA - Bai 05 Auditing

> Ngay cham: 2026-09-13  
> De: `Exams/de-kiem-tra/M1-3-jpa__2026-09-12__bai5.md`  
> Trang thai: Cham full de Bai 05 Auditing.

## 1. Diem tong

- Diem tho: **30.5 / 35**
- Diem quy doi: **87.1 / 100**
- Trang thai: **🟢 Dat bai 05**

Bai nay dat nguong. Chua tick module M1-3 vi day la bai thanh phan, chua phai final module/deliverable.

## 2. Diem theo nhom kien thuc

| Nhom | Cau | Diem | Trang thai |
|---|---|---:|---|
| Ban chat auditing | 1, 2 | 5 / 6 | 🟡 |
| Annotation auditing | 3, 8 | 7.5 / 9 | 🟡 |
| BaseEntity / MappedSuperclass | 4, 9 | 8.5 / 9 | 🟢 |
| DTO va audit ownership | 5 | 3 / 3 | 🟢 |
| Luong create/update | 6, 7 | 6.5 / 8 | 🟡 |

## 3. Bang diem tung cau

| Cau | Diem toi da | Diem dat | Nhan xet ngan |
|---|---:|---:|---|
| 1 | 3 | 3 | Dung ban chat auditing la truy vet tao/sua record; nhac createdBy/updatedBy la tot. |
| 2 | 3 | 2 | Dung `createdAt` giu nguyen va `updatedAt` doi khi update, nhung sai/khuyet o cho luc tao moi: `updatedAt` thuong cung duoc set. |
| 3 | 5 | 4 | Hieu dung `@EnableJpaAuditing`, `@CreatedDate`, `@LastModifiedDate`; `EntityListener` dien dat con mo ho. |
| 4 | 5 | 5 | Dung: BaseEntity gom field chung, `@MappedSuperclass` khong tao table rieng, field nam o table con. |
| 5 | 3 | 3 | Dung: client khong duoc gui audit field vi de gia mao, backend/auditing tu dien. |
| 6 | 4 | 3.5 | Dung y auditing chay truoc khi insert/query DB; can noi ro `AuditingEntityListener` set `@CreatedDate/@LastModifiedDate`. |
| 7 | 4 | 3 | Dung dirty checking, nhung can noi ro entity dang managed trong transaction va flush/commit moi sinh UPDATE. |
| 8 | 4 | 3.5 | Bat dung thieu `@EnableJpaAuditing`, `@EntityListeners`, column constraints; constructor khong phai trong tam auditing. |
| 9 | 4 | 3.5 | Code dung y chinh; thieu format annotation `@Getter` va co chut loi markdown, nhung concept dat. |

## 4. Cau sai/thieu can hoc lai

### Cau 2

Ban noi luc tao moi `updatedAt` khong co gia tri, sau do them "thuong toi cho no trung createdAt". Trong Spring Data JPA auditing, voi `@CreatedDate` va `@LastModifiedDate`, khi insert moi thi **ca hai thuong duoc set**.

Can nho:

```text
Insert: createdAt co gia tri, updatedAt cung co gia tri.
Update: createdAt giu nguyen, updatedAt thay doi.
```

### Cau 3

`@EntityListeners(AuditingEntityListener.class)` khong phai "entity nao la listener". No co nghia:

```text
Gan AuditingEntityListener vao entity/BaseEntity de nghe lifecycle insert/update.
Khi entity sap insert/update, listener nay set audit fields.
```

### Cau 6

Can noi ro hon:

```text
repository.save(product)
-> Hibernate/JPA chuan bi INSERT
-> AuditingEntityListener chay truoc insert
-> @CreatedDate set createdAt
-> @LastModifiedDate set updatedAt
-> Hibernate sinh SQL INSERT
```

### Cau 7

Ban dung dirty checking. Can them 2 tu khoa:

```text
managed entity
flush/commit
```

Cau dung:

```text
Product lay ra trong @Transactional la managed entity.
Khi setName, Hibernate dirty checking thay doi.
Luc flush/commit, Hibernate sinh SQL UPDATE.
Auditing set updatedAt truoc khi update/flush.
```

### Cau 8

Constructor khong phai loi auditing chinh trong doan code nay. JPA entity can no-args constructor, nhung auditing fail chu yeu do thieu:

- `@EnableJpaAuditing`
- `@EntityListeners(AuditingEntityListener.class)`
- column constraints cho audit fields

## 5. Kien thuc can hoc lai

- Insert auditing: `createdAt` va `updatedAt` thuong cung duoc set.
- `AuditingEntityListener` nghe lifecycle insert/update cua entity.
- Dirty checking chi chay ro trong transaction voi managed entity.
- `@MappedSuperclass` khong tao table rieng.

## 6. Hanh dong tiep theo

1. Doc lai cau 2 va cau 7 trong file chua tung cau.
2. Co the di tiep Bai 06 Tong hop JPA mini CRUD.
3. Chua tick M1-3 cho den khi xong final module va deliverable.

