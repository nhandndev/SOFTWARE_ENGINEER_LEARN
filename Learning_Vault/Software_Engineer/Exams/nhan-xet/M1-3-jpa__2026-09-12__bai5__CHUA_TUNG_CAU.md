# Chua tung cau M1-3 JPA - Bai 05 Auditing

> Diem: **30.5 / 35 = 87.1 / 100**  
> Ket luan: **🟢 Dat bai 05**

## Cau 1 - Auditing la gi?

**Diem:** 3/3

Dung. Ban hieu auditing la truy vet record duoc tao/sua luc nao. Ban nhac them `createdBy`, `updatedBy` cung dung voi project that, chi la trong M1-3 minh tap trung vao time fields.

Cau mau:

```text
Auditing la co che tu dong luu metadata theo doi record/entity, nhu createdAt va updatedAt. No giup biet record duoc tao luc nao, sua luc nao, ho tro debug va quan ly du lieu, tranh viec phai tu set LocalDateTime.now() rai rac trong service.
```

## Cau 2 - createdAt vs updatedAt

**Diem:** 2/3

Ban dung:

- `createdAt` la luc tao.
- `createdAt` khong nen update nua.
- Khi update thi `updatedAt` thay doi.

Can sua:

```text
Khi tao moi entity, updatedAt thuong cung co gia tri, bang hoac gan bang createdAt.
```

Voi Spring Data JPA auditing:

```text
Insert: @CreatedDate set createdAt, @LastModifiedDate set updatedAt.
Update: createdAt giu nguyen, updatedAt duoc set lai.
```

## Cau 3 - Annotation can co

**Diem:** 4/5

Ban hieu dung:

- `@EnableJpaAuditing`: bat auditing trong app.
- `@CreatedDate`: ngay tao.
- `@LastModifiedDate`: ngay sua gan nhat.

Can noi ro lai `@EntityListeners(AuditingEntityListener.class)`:

```text
Annotation nay gan AuditingEntityListener vao entity/BaseEntity.
Listener nay nghe cac su kien lifecycle cua entity nhu insert/update.
Nho no, Spring Data JPA moi biet luc nao can set createdAt/updatedAt.
```

## Cau 4 - BaseEntity va @MappedSuperclass

**Diem:** 5/5

Dung tot. Ban noi dung:

- BaseEntity de gom field chung.
- Entity khac extends de khoi lap field.
- `@MappedSuperclass` khong tao table rieng.
- Field cua BaseEntity nam trong table cua entity con.

Nho them:

```text
BaseEntity khong phai entity doc lap. No chi la class cha mang mapping chung.
```

## Cau 5 - Request DTO co nen nhan audit field?

**Diem:** 3/3

Dung. Client khong nen gui `createdAt`, `updatedAt` vi day la metadata server quan ly. Neu cho gui thi client co the gia mao thoi gian.

Cau mau:

```text
Create request khong nen co createdAt/updatedAt. Hai field nay do backend/JPA auditing tu dien. Response DTO co the tra chung neu client can xem.
```

## Cau 6 - Luong create co auditing

**Diem:** 3.5/4

Ban nam dung y: truoc khi query/insert xuong DB thi audit set thoi gian.

Cau tra loi nen gon va chuan hon:

```text
Service tao Product entity.
Service goi productRepository.save(product).
Hibernate/JPA chuan bi INSERT.
AuditingEntityListener chay trong entity lifecycle truoc insert.
@CreatedDate set createdAt.
@LastModifiedDate set updatedAt.
Hibernate sinh SQL INSERT va database luu row.
```

## Cau 7 - Luong update co auditing

**Diem:** 3/4

Ban dung y dirty checking, nhung can noi ro hon.

Cau dung:

```text
Trong @Transactional, Product lay tu repository la managed entity.
Khi product.setName(...), Hibernate ghi nhan object da thay doi.
Luc flush/commit, Hibernate dirty checking so voi snapshot va sinh SQL UPDATE.
AuditingEntityListener set updatedAt truoc khi update/flush.
Vi entity dang managed nen khong bat buoc goi save().
```

Cach nho:

```text
Managed entity + dirty checking + commit = update database.
```

## Cau 8 - Doc code va tim loi

**Diem:** 3.5/4

Ban bat duoc cac loi chinh:

- Thieu `@EntityListeners(AuditingEntityListener.class)`.
- Thieu `@EnableJpaAuditing`.
- Nen tach `BaseEntity`.
- Nen co column constraints: `createdAt` khong update, `updatedAt` nullable false.

Ve constructor:

```text
JPA entity can no-args constructor de Hibernate tao object khi load tu DB.
Nhung day khong phai loi auditing chinh trong cau nay.
AllArgsConstructor khong bat buoc.
```

## Cau 9 - Code mini

**Diem:** 3.5/4

Y chinh dung:

- Co `@MappedSuperclass`.
- Co `@EntityListeners(AuditingEntityListener.class)`.
- Co `@CreatedDate`, `@LastModifiedDate`.
- Product extends BaseEntity.

Tru diem nhe vi format thieu `@` truoc `Getter` va markdown bi lech. Ban chat code dat.

Cau chuan:

```java
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
```

```java
@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private String name;
}
```

## Tong ket

Ban qua bai 05. Can nho ky 3 cau:

```text
Insert: createdAt va updatedAt deu duoc set.
Update: createdAt giu nguyen, updatedAt doi.
Update khong save van duoc neu entity dang managed trong transaction.
```

