# Rubric dap an - Bai 06 Mini Project M1-3 Spring Data JPA

> Day la rubric cham project. Khi cham, doc code `shopcore` va file nop bai neu co.

---

## 1. Entity mapping - 15 diem

- Product/Category co `@Entity`, `@Table`: 3d
- Id + GeneratedValue dung: 2d
- Column constraint hop ly: 3d
- Product co `@ManyToOne(fetch = FetchType.LAZY)`: 4d
- `@JoinColumn(name = "category_id", nullable = false)`: 3d

## 2. Repository - 12 diem

- Repository extends `JpaRepository`: 3d
- Co `existsBySku`, `existsByName` hoac tuong duong: 3d
- Co query theo category/page: 3d
- Co `@Query` hoac query filter/search tuong duong: 3d

## 3. Service + Transaction - 18 diem

- Business rule duplicate/not found dung: 4d
- Product create load Category entity dung: 3d
- `@Transactional` cho write method: 3d
- `@Transactional(readOnly = true)` cho read detail/list can lazy mapping: 3d
- Update dung managed entity/dirty checking hoac save hop ly: 3d
- Khong de logic business trong Controller: 2d

## 4. DTO + API contract - 12 diem

- Request/Response DTO tach entity: 3d
- Controller khong tra entity truc tiep: 3d
- ProductResponse co categoryId/categoryName: 3d
- Audit field trong response hop ly, request khong nhan audit field: 3d

## 5. REST + status code - 10 diem

- Endpoint dung REST style: 2d
- Create tra 201: 2d
- Delete tra 204: 2d
- Not found 404: 2d
- Conflict duplicate 409: 2d

## 6. Paging - 10 diem

- Dung Pageable/Page o repository/service: 4d
- Khong tu cat list trong memory: 2d
- Map `Page<Product>` sang response dung: 2d
- `PageResponse` co metadata can thiet: 2d

## 7. Auditing - 10 diem

- Co BaseEntity `@MappedSuperclass`: 2d
- Co `@EnableJpaAuditing`: 2d
- Co `@EntityListeners(AuditingEntityListener.class)`: 2d
- Co `@CreatedDate`, `@LastModifiedDate`: 2d
- createdAt/updatedAt xuat hien dung trong response/database: 2d

## 8. Lazy/N+1 awareness - 8 diem

- Relation de LAZY: 2d
- Map DTO trong transaction, khong de Jackson cham entity lazy: 2d
- Bat SQL log: 2d
- File nop bai co nhan xet ve query/N+1: 2d

## 9. Giai thich trong file nop bai - 5 diem

- Giai thich luong create/get/list/update: 2d
- Giai thich transaction/lazy/auditing ro: 2d
- Noi duoc phan con nghi ngo/chua chac: 1d

---

## Ket luan cham

```text
>= 85: Dat bai 06, co the lam final/tick M1-3 neu deliverable hop le.
70-84: Sua project theo nhan xet.
< 70: Hoc lai cac phan yeu cua M1-3.
```

