# Chua tung cau M1-3 JPA - Bai 04 Lazy vs Eager

> Diem hien tai: **37 / 43 = 86.0 / 100**  
> Ket luan: **🟢 Dat bai 04**, nhung cau 9 van can on.

## Cau 1 - Lazy vs Eager

**Diem:** 3/3

Ban tra loi dung. Co du:

- Lazy chua query relation ngay.
- Khi truy cap relation moi query.
- Co proxy.
- Eager load lien quan ngay.
- Lazy toi uu hon nhung co rui ro loi lazy/session.

Cau mau gon:

```text
LAZY la chua load relation khi load entity chinh, chi load khi truy cap relation.
EAGER la load relation ngay cung entity chinh.
LAZY tranh load thua nhung can session/transaction khi truy cap.
EAGER de dung nhung de query nang va load thua du lieu.
```

## Cau 2 - Product va Category luu o dau?

**Diem:** 3/3

Lan nay ban sua dung:

- Database luu khoa ngoai category.
- Java object giu relation `Category`.
- Vi LAZY nen chua query data category cho den khi cham vao relation.

Cau mau:

```text
Database table products luu cot category_id lam foreign key.
Java Product entity co field Category category.
Voi fetch LAZY, field category co the duoc Hibernate dai dien bang proxy va chi query Category khi code truy cap relation.
```

## Cau 3 - Khi nao LAZY query Category?

**Diem:** 2.5/3

Ban dung y chinh, nhung dien dat con hoi roi o doan "find toi thu lien quan".

Cau mau:

```text
productRepository.findById(id) query Product truoc.
Category LAZY chua query ngay.
Hibernate query Category khi code truy cap relation, vi du product.getCategory().getName(), neu session/persistence context con mo.
Sau khi transaction ket thuc/session dong, cham relation nua se khong an toan.
```

## Cau 4 - LazyInitializationException

**Diem:** 2.5/3

Ban dung ban chat:

```text
Session dong ma van co gang query lazy relation thi loi.
```

Can them case REST hay gap:

```text
Service tra entity ve Controller.
Transaction ket thuc.
Jackson serialize Product thanh JSON.
Jackson cham getCategory().
Category LAZY can query them nhung session da dong.
=> LazyInitializationException.
```

## Cau 5 - Vi sao khong tra entity truc tiep?

**Diem:** 3/3

Dung trong tam. Ban nam duoc: tra entity lazy ra controller de gay query khi session da dong.

Co the them de day du hon:

```text
Khong tra entity truc tiep vi co the gay LazyInitializationException, lo field noi bo, lam API phu thuoc schema/entity, va neu relation 2 chieu co the lap JSON vo han. Nen map sang DTO trong Service.
```

## Cau 6 - Map DTO trong transaction

**Diem:** 3/3

Ban da sua dung trong tam:

- DTO che field.
- DTO la API contract.
- Tranh gan API voi database.
- Tranh vong lap JSON.
- Method co `@Transactional`.
- Persistence context/session con mo nen Hibernate van load lazy relation duoc.

Cau tra loi dep hon nua:

```text
Nen map Product sang ProductResponse trong Service co @Transactional(readOnly = true) vi luc do Hibernate session/persistence context con mo. Neu response can categoryName, goi product.getCategory().getName() se load Category an toan. Sau khi map xong, Controller chi tra ProductResponse nen Jackson khong cham entity/lazy proxy nua.
```

Cach nho:

```text
Service map DTO = cham lazy luc session con mo.
Controller tra DTO = khong con cham entity/proxy.
```

## Cau 7 - N+1 voi LAZY

**Diem:** 4.5/5

Ban da giai thich dung hon lan truoc:

- 1 query lay list Product.
- LAZY category chua query.
- Mapping goi `product.getCategory().getName()` thi query them tung category.
- Tong thanh N+1.

Cau mau:

```text
Repository lay list/page Product bang 1 query.
Product.category la LAZY nen category chua load ngay.
Khi map tung Product va goi product.getCategory().getName(), Hibernate co the query Category rieng cho tung Product.
Neu co N Product thi tong la 1 query Product + N query Category = N+1.
```

## Cau 8 - EAGER co van de gi?

**Diem:** 4/5

Ban dung cac y:

- EAGER de hinh dung hon.
- Co the query day du relation ngay.
- Nhieu relation EAGER lam ton tai nguyen, query nang, cham.
- Nen dung khi relation nho.

Thieu/ can sua:

- Khong nen xem EAGER la cach ne `LazyInitializationException`.
- Can noi ro hon: relation nho va gan nhu luc nao cung can.
- Can noi uu tien LAZY va fetch co chu dich.

Cau mau:

```text
Neu de tat ca relation EAGER, Hibernate se load nhieu relation ngay ca khi API khong can. Query se nang, kho kiem soat performance, va co the keo ca object graph lon. Chi nen dung EAGER khi relation nho, don gian, va gan nhu luc nao cung can trong moi use case. Thuc te thuong uu tien LAZY, khi can thi fetch co chu dich bang fetch join, EntityGraph hoac query rieng.
```

## Cau 9 - Doc code va nhan xet

**Diem:** 1.5/5

Day la cau mat diem nhieu nhat.

Ban co noi duoc:

- Co lazy relation.
- Co the bi `LazyInitializationException`.

Nhung thieu:

- Controller dang tra entity truc tiep.
- Jackson serialize entity co the cham lazy getter.
- Co the lo field noi bo.
- API bi phu thuoc entity/schema.
- Relation 2 chieu co the lap JSON.
- Huong sua ro rang.

Cau tra loi nen viet:

```text
Code nay co van de:

1. Controller tra Product entity truc tiep, lam API phu thuoc vao entity/database schema.
2. Product co category LAZY, Jackson serialize Product co the cham getCategory() sau khi transaction da ket thuc.
3. Khi session da dong ma Jackson cham lazy relation, co the bi LazyInitializationException.
4. Entity co the lo field noi bo.
5. Neu Product - Category co relation 2 chieu, JSON co the lap vo han.

Huong sua:
Controller tra ProductResponse, khong tra Product entity.
Service dung @Transactional(readOnly = true), find Product, map sang ProductResponse gom field can thiet nhu categoryId/categoryName.
Controller bọc DTO bang ResponseEntity/ApiResponse.
```

Luu y: `EntityResponse<ApiResponse<Product>>>` ban viet la sai ten/khong can. Y dung la `ResponseEntity<ApiResponse<ProductResponse>>`.

## Cau 10 - Code mini

**Diem:** 10/10

Lam dung day du:

- `@ManyToOne(fetch = FetchType.LAZY)`
- `@JoinColumn(name = "category_id")`
- Service co `@Transactional(readOnly = true)`
- Find entity, nem exception neu khong co.
- Map sang `ProductResponse`, co `categoryId`, `categoryName`.
- Controller tra `ProductResponse`, khong tra entity.

Doan code nay pass.

## Tong ket

Ban da nam duoc phan code va ban chat Lazy kha tot. Bai nay da qua nguong 85, nhung cau 9 van la diem yeu can sua truoc khi di final M1-3.

- Cau 6: da sua dat.
- Cau 8: gan dat, chi thieu y fetch co chu dich.
- Cau 9: review code qua thieu y.

Neu sua cau 9 ro hon, diem bai nay se len rat cao.
