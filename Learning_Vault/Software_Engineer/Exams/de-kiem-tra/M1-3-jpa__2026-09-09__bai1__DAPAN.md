# Dap an M1-3 JPA - Bai 01 Entity Va JpaRepository

> Tong diem tho: 43 diem.  
> Normalize: `diem tho / 43 * 100`.

---

## Cau 1 - 3d

Y dung:

- M1-2 repository dung `Map`, minh tu viet implementation, data nam trong RAM.
- M1-3 repository extends `JpaRepository`, Spring Data JPA tu tao implementation/proxy.
- Data nam trong database.
- Service van goi repository qua method Java, nhung ben duoi JPA/Hibernate sinh SQL.

## Cau 2 - 3d

Y dung:

- Entity khong nam trong database.
- Entity la object Java trong app.
- Table/row nam trong database.
- JPA/Hibernate map entity voi table va row voi object.

## Cau 3 - 3d

Y dung:

- `CreateProductRequest`: DTO client gui vao.
- `Product`: entity/model noi bo duoc JPA quan ly.
- `ProductResponse`: DTO server tra ra client.
- Khong tra entity truc tiep vi de lo field noi bo, API dinh vao schema, relation lazy/N+1, relation 2 chieu co the gay JSON lap.

## Cau 4 - 3d

Y dung:

- `@Entity`: class duoc JPA quan ly.
- `@Table`: map class voi table cu the.
- `@Id`: primary key.
- `@GeneratedValue`: cach sinh id.
- `@Column(nullable = false, unique = true)`: cau hinh cot khong null va khong trung.

## Cau 5 - 3d

Y dung:

- `Product`: entity repository quan ly.
- `Long`: kieu du lieu cua primary key/id.
- Spring Data JPA tao implementation/proxy luc app start.
- Service inject repository interface nhu bean binh thuong.

## Cau 6 - 3d

Vi du:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
    Optional<Product> findBySku(String sku);
}
```

```java
public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByName(String name);
}
```

Spring Data JPA doc ten method sau `By` va map voi field entity.

## Cau 7 - 5d

Vi du:

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_id", nullable = false)
private Category category;
```

Y dung:

- Nhieu Product thuoc mot Category.
- Database table `products` luu cot `category_id`.
- Java entity `Product` giu `Category category`.
- `@JoinColumn` noi field Java voi foreign key column.
- `LAZY` la khi nao truy cap category thi moi load.

## Cau 8 - 5d

Y dung:

```text
Controller nhan CreateProductRequest.
Service check productRepository.existsBySku.
Service tim categoryRepository.findById(categoryId).
Neu khong co category thi throw CATEGORY_NOT_FOUND.
Service tao Product entity va set category object.
Service goi productRepository.save(product).
Hibernate sinh INSERT va gan id cho entity.
Service map Product entity da save sang ProductResponse.
Controller tra 201 Created.
```

## Cau 9 - 5d

Y dung:

- Controller nhan id tu path.
- Service goi `productRepository.findById(id)`.
- Repository tra `Optional<Product>`.
- Nếu `Optional.empty()` thì Service throw `AppException(PRODUCT_NOT_FOUND)`.
- Nếu có Product thì Service map sang `ProductResponse`.
- Controller tra `200 OK`.

## Cau 10 - 10d

Vi du:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
}
```

```java
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
```

```java
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public ProductResponse create(CreateProductRequest request) {
        if (productRepository.existsBySku(request.getSku())) {
            throw new AppException(ErrorCode.DUPLICATE_SKU);
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        Product product = Product.builder()
                .sku(request.getSku())
                .name(request.getName())
                .price(request.getPrice())
                .category(category)
                .build();

        Product saved = productRepository.save(product);

        return ProductResponse.builder()
                .id(saved.getId())
                .sku(saved.getSku())
                .name(saved.getName())
                .price(saved.getPrice())
                .categoryId(saved.getCategory().getId())
                .build();
    }
}
```

Chấm theo ý: đúng repository, đúng business check trong Service, đúng dùng Category entity, đúng save, đúng map response.
