# Snapshot cham lai bai M1-4 Validation & Error - Lesson 02

> File de: `Exams/de-kiem-tra/M1-4-validation-error__2026-09-15__lesson2-lan1.md`  
> Ngay cham: 2026-09-15  
> Pham vi: Cham lai full 10 cau Lesson 02 theo ban tra loi moi nhat.

## 1. Diem tong

- Diem tho: **41.1 / 43**
- Quy doi: **95.6 / 100**
- Ket qua: **🟢 Dat Lesson 02**

> Day la diem Lesson 02, khong phai diem final Module M1-4. Chua cap nhat `05_TIEN_DO.md`.

## 2. Diem theo nhom kien thuc

| Nhom | Cau | Diem | Trang thai |
|---|---|---:|---|
| Ban chat DTO validation | 1, 4, 6, 7 | 13.7/14 | 🟢 |
| Chon annotation dung | 2, 3, 5 | 7.9/9 | 🟢 |
| Validation vs business | 8 | 5/5 | 🟢 |
| Code DTO | 9, 10 | 14.5/15 | 🟢 |

## 3. Bang diem tung cau

| Cau | Ket qua | Diem | Nhan xet |
|---|---|---:|---|
| 1 | Dung | 3/3 | Hieu DTO validation la cong chan request ve mat hinh thuc truoc Service. |
| 2 | Gan dung | 2.7/3 | Phan biet va chon annotation dung; cach dien dat ve categoryId hoi roi nhung ket luan dung. |
| 3 | Dung | 3/3 | Da sua dung `@NotNull + @DecimalMin` cho BigDecimal, `@NotNull + @Min` cho Integer. |
| 4 | Gan dung | 2.7/3 | Hieu `@DecimalMin` khong xu ly null va can `@NotNull`. |
| 5 | Gan dung | 2.2/3 | Chon `@NotBlank` dung; con nham rang `@Size` cung chan chuoi toan khoang trang. |
| 6 | Dung | 3/3 | Hieu luong `@Valid` va `MethodArgumentNotValidException`; Service/Repository khong chay. |
| 7 | Dung | 5/5 | Dung 3 field vi pham, exception, 400 va flow. |
| 8 | Dung | 5/5 | Phan loai validation/business, status va luong deu dung. |
| 9 | Dung | 5/5 | Viet dung DTO class + Lombok + validation rules. |
| 10 | Gan dung | 9.5/10 | Logic sua DTO dung; phan ghi `Getter/Setter` thieu dau `@` la loi trinh bay nho. |

## 4. Diem can sua

### 4.1. `@Size` khong chan whitespace

Voi:

```java
@Size(min = 2, max = 100)
private String name;
```

Ket qua:

```text
name = null  -> thuong pass
name = ""    -> fail, vi length = 0
name = " "   -> fail neu chi co 1 space, vi length = 1
name = "   " -> pass, vi length = 3
```

Neu muon bat String co noi dung that:

```java
@NotBlank
@Size(min = 2, max = 100)
private String name;
```

### 4.2. Annotation Lombok

Trong code cau 10, can viet:

```java
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
```

Khong viet chi:

```text
Getter
Setter
```

Day la loi format/copy, khong phai loi ve tu duy validation.

## 5. Ban da nam duoc gi?

- Biet validation nam tren Request DTO.
- Biet `@NotNull` cho number/id/object bat buoc.
- Biet `@NotBlank` cho String bat buoc.
- Biet `@NotEmpty` cho collection bat buoc co phan tu.
- Biet ket hop `@NotNull` + `@DecimalMin`.
- Biet `@NotNull` khac `@DecimalMin`.
- Biet validation fail thi Service/Repository khong chay.
- Biet `categoryId=null` la validation, `categoryId=999` la business.
- Viet duoc DTO Product dung rule.

## 6. Phac do hoc lai

```text
@Size vs whitespace
-> Notes/M1_Spring_Boot/M1_4_Validation_Error/02_JAKARTA_VALIDATION_DTO.md muc 9-10
-> 5 phut
-> Tu phan tich null, "", " ", "   " voi @Size va @NotBlank
```

```text
Lombok annotation
-> xem lai code cau 10
-> 2 phut
-> Viet lai day du 5 annotation co dau @
```

## 7. Quyet dinh

```text
Lesson 02: 🟢 Dat - 95.6/100
Module M1-4: chua ket luan
```

Duoc hoc Lesson 03 - `@Valid` va `@Validated`. Chua tick Module M1-4 va chua mo Module M1-5.
