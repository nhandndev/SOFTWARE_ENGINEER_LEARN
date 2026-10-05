# Dap an M1-3 JPA - Bai 05 Auditing

> Tong diem tho: 35 diem.  
> Normalize: `diem tho / 35 * 100`.

---

## Cau 1 - 3d

Y dung:

- Auditing la viec tu dong ghi metadata theo doi entity/record.
- M1-3 tap trung vao `createdAt`, `updatedAt`.
- Giup biet record tao luc nao, sua luc nao, ho tro debug/quan ly data.
- Tranh phai set tay `LocalDateTime.now()` o nhieu service.

## Cau 2 - 3d

Y dung:

- `createdAt`: thoi diem record/entity duoc tao.
- `updatedAt`: thoi diem record/entity duoc sua gan nhat.
- Khi tao moi: ca hai thuong duoc set.
- Khi update: `createdAt` giu nguyen, `updatedAt` thay doi.

## Cau 3 - 5d

Y dung:

- `@EnableJpaAuditing`: bat co che auditing trong Spring app.
- `@EntityListeners(AuditingEntityListener.class)`: gan listener nghe lifecycle insert/update cua entity.
- `@CreatedDate`: field duoc set luc tao entity.
- `@LastModifiedDate`: field duoc set luc entity bi sua.
- Neu thieu enable/listener thi annotation audit co the khong chay.

## Cau 4 - 5d

Y dung:

- Tao `BaseEntity` de gom cac field chung nhu `createdAt`, `updatedAt`, tranh copy qua nhieu entity.
- `@MappedSuperclass` khong tao table rieng.
- Field cua `BaseEntity` duoc map vao table cua entity con.
- Vi du Product extends BaseEntity thi table `products` co `created_at`, `updated_at`.

## Cau 5 - 3d

Y dung:

- Create request khong nen nhan `createdAt`, `updatedAt`.
- Audit fields la metadata server quan ly.
- Client khong nen quyet dinh thoi diem tao/sua.
- Response DTO co the tra audit fields neu can.

## Cau 6 - 4d

Y dung:

```text
Service tao Product entity.
Service goi repository.save(product).
Hibernate/JPA chuan bi INSERT.
AuditingEntityListener chay trong entity lifecycle truoc khi insert.
@CreatedDate set createdAt.
@LastModifiedDate set updatedAt.
Hibernate sinh SQL INSERT va database luu row.
```

## Cau 7 - 4d

Y dung:

- Product lay trong transaction la managed entity.
- Khi `setName`, entity bi thay doi.
- Hibernate dirty checking phat hien thay doi.
- Truoc commit/flush, Hibernate sinh SQL UPDATE.
- Auditing set `updatedAt` khi entity duoc update.
- Khong bat buoc `save()` neu entity dang managed trong transaction.

## Cau 8 - 4d

Y dung:

Thieu:

- `@EnableJpaAuditing` tren main app hoac config.
- `@EntityListeners(AuditingEntityListener.class)` tren Product hoac BaseEntity.
- Nen co `@Column(nullable = false, updatable = false)` cho `createdAt`.
- Nen co `@Column(nullable = false)` cho `updatedAt`.

## Cau 9 - 4d

Vi du:

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

Cham theo y: co BaseEntity, co `@MappedSuperclass`, co listener, co 2 audit annotation, Product ke thua.

