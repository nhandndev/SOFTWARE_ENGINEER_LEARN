# Snapshot cham bai M1-3 JPA - Bai 04 Lazy vs Eager

> Ngay cham: 2026-09-12  
> Trang thai: Cham lai full de sau khi sua cau 6 va cau 8.  
> De: `Exams/de-kiem-tra/M1-3-jpa__2026-09-12__bai4.md`

## 1. Diem tong

- Diem tho: **37 / 43**
- Diem quy doi: **86.0 / 100**
- Trang thai: **🟢 Dat bai 04**

Ban da vuot nguong 85 cho bai nho nay. Chua tick module M1-3 vi day la bai thanh phan, chua phai final module/deliverable.

## 2. Diem theo nhom kien thuc

| Nhom | Cau | Diem | Trang thai |
|---|---|---:|---|
| Lazy/Eager co ban | 1, 2, 3 | 8.5 / 9 | 🟢 |
| LazyInitializationException va DTO | 4, 5, 6 | 8.5 / 9 | 🟢 |
| N+1 va performance | 7, 8 | 8.5 / 10 | 🟢 |
| Review code/API design | 9 | 1.5 / 5 | 🔴 |
| Code mini | 10 | 10 / 10 | 🟢 |

## 3. Bang diem tung cau

| Cau | Diem toi da | Diem dat | Nhan xet ngan |
|---|---:|---:|---|
| 1 | 3 | 3 | Dung ban chat LAZY/EAGER, co proxy va trade-off. |
| 2 | 3 | 3 | Dung: DB luu foreign key, Java giu relation Category. |
| 3 | 3 | 2.5 | Dung y lazy query khi truy cap relation trong session, dien dat con hoi roi. |
| 4 | 3 | 2.5 | Dung ban chat session dong, thieu case Jackson serialize sau service. |
| 5 | 3 | 3 | Dung trong tam: khong tra entity vi lazy relation de gay loi. |
| 6 | 3 | 3 | Da sua dung: map DTO trong transaction vi session/persistence context con mo. |
| 7 | 5 | 4.5 | Giai thich N+1 tot. |
| 8 | 5 | 4 | Co noi query nang va relation nho; thieu y "gan nhu luc nao cung can" va fetch co chu dich. |
| 9 | 5 | 1.5 | Con thieu nhieu: moi neu lazy loi, chua du 3 van de va huong sua ro. |
| 10 | 10 | 10 | Dung yeu cau: LAZY relation, transaction, map DTO, controller tra DTO. |

## 4. Nhung cau sai/thieu

### Cau 3

Nen noi gon hon:

```text
findById query Product truoc.
Category LAZY chua query ngay.
Hibernate query Category khi code truy cap relation, vi du product.getCategory().getName(), neu session/persistence context con mo.
```

### Cau 4

Can them REST case hay gap:

```text
Service tra entity ve Controller.
Transaction da ket thuc.
Jackson serialize entity sang JSON va cham lazy relation.
Session da dong nen nem LazyInitializationException.
```

### Cau 8

Ban da noi dung EAGER ton tai nguyen/query lon. De full diem, them:

```text
Chi nen dung EAGER khi relation nho va gan nhu luc nao cung can.
Thuc te thuong uu tien LAZY, khi can thi fetch co chu dich bang fetch join, EntityGraph hoac query rieng.
```

### Cau 9

Day van la cau yeu nhat.

Can chi ra it nhat 3 van de:

1. Controller tra entity truc tiep.
2. Jackson serialize entity co the cham lazy field `category`.
3. Neu transaction/session da dong se bi `LazyInitializationException`.
4. Entity co the lo field noi bo.
5. API bi phu thuoc entity/database schema.
6. Relation 2 chieu co the gay JSON lap vo han.

Huong sua:

```text
Controller tra ProductResponse, khong tra Product entity.
Service @Transactional(readOnly = true) lay Product va map sang DTO.
DTO chi gom field can tra, vi du categoryId va categoryName.
```

## 5. Kien thuc can hoc lai

- Review code REST + JPA phai nhin ca 3 diem: API contract, lazy/session, Jackson serialization.
- EAGER khong phai cach fix lazy mac dinh; uu tien LAZY va fetch co chu dich.
- Khi nhac `ResponseEntity`, kieu dung la `ResponseEntity<ApiResponse<ProductResponse>>`, khong phai `EntityResponse`.

## 6. Hanh dong tiep theo

1. Doc lai rieng cau 9 trong file chua tung cau.
2. Co the chuyen sang bai 05 Auditing vi bai 04 da dat nguong.
3. Chua tick M1-3 cho den khi xong final module va deliverable.

