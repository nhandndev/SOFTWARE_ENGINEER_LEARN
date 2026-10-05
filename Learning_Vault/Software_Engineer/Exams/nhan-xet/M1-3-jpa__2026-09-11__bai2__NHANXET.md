# Nhan xet bai cham - M1-3 JPA Bai 02 Query Va Paging

> File de: `Exams/de-kiem-tra/M1-3-jpa__2026-09-11__bai2.md`  
> Ngay cham: 2026-09-12  
> Ket qua: **39/43 diem tho = 91/100 - Dat bai 02**

---

## 1. Tong ket

Ban da dat muc tieu chinh cua bai 02:

```text
Repository tra Page<Product>.
Service tao Pageable.
Service map Page<Product> sang PageResponse<ProductResponse>.
Controller boc ApiResponse tra client.
```

Phan tien bo ro nhat:

- Da sua duoc cau 8: map `Page<Product>` sang `PageResponse`.
- Cau 10 viet duoc code mini gan dung dap an.
- JPQL vs native SQL da hieu hon, biet JPQL query tren entity/field.

Con sot nhe:

- Cau 9 van noi "thieu param" la loi chinh, trong khi loi chinh la JPQL dung sai table/column.
- Cau 2 dung method nhung ten bien nen dat ro hon: `keyword`, `categoryId`.
- Cau 8 code ghi `tolist()` thay vi `toList()`, loi nho ve cu phap.

---

## 2. Bang diem tung cau

| Cau | Diem | Nhan xet |
|---|---:|---|
| 1 | 2.8/3 | Hieu derived query; da them y field/relation phai ton tai |
| 2 | 2.7/3 | Method dung; nen dat bien `keyword`, `categoryId` cho ro |
| 3 | 3/3 | Hieu nested property `category.id` |
| 4 | 3/3 | Phan biet JPQL/native tot |
| 5 | 3/3 | JPQL search dung |
| 6 | 3/3 | Pageable/Page/metadata da on |
| 7 | 4.7/5 | Flow paging day du, thieu nhe Controller tra 200 OK |
| 8 | 4.5/5 | Map Page sang PageResponse dung y, loi cu phap nho `toList()` |
| 9 | 3.3/5 | Sua query gan dung, nhung giai thich loi chinh chua ro |
| 10 | 10/10 | Code mini dung trong tam |

Tong: **39/43 = 91/100**

---

## 3. Cac loi/thieu can ghi nho

### Cau 9 - JPQL sai table/column

De bai:

```java
@Query("select p from products p where p.product_name = :keyword")
List<Product> search(String keyword);
```

Loi chinh:

```text
JPQL khong dung table `products`.
JPQL phai dung entity `Product`.

JPQL khong dung column `product_name`.
JPQL phai dung field Java, vi du `p.name`.
```

Ban co the nho:

```text
JPQL = Java entity/field.
Native SQL = database table/column.
```

Sua dung:

```java
@Query("""
        select p
        from Product p
        where lower(p.name) like lower(concat('%', :keyword, '%'))
        """)
List<Product> search(@Param("keyword") String keyword);
```

### Cau 8 - Page metadata

Dung:

```java
content = productPage.getContent()
        .stream()
        .map(this::toResponse)
        .toList();

page = productPage.getNumber();
size = productPage.getSize();
totalElements = productPage.getTotalElements();
totalPages = productPage.getTotalPages();
```

Khong dung:

```text
productPage.stream
productPage.getPage()
```

---

## 4. Kien thuc can hoc lai nhe

`JPQL vs native SQL` -> `Notes/M1_Spring_Boot/README_M1_3_BAI_02_QUERY_PAGE_CHI_TIET.md` muc 5-8 -> 10 phut -> sua 3 cau query sai.

`Page -> PageResponse` -> `Notes/M1_Spring_Boot/Samples_M1_3_JPA_Paging/README.md` muc 6 -> 5 phut -> doc lai `ProductService`.

---

## 5. Hanh dong tiep theo

Duoc phep di tiep:

```text
M1-3 Bai 03 - @Transactional
```

Trong bai 03 can tap trung:

```text
commit
rollback
readOnly
RuntimeException/AppException rollback
propagation REQUIRED
isolation nhan dien
```

