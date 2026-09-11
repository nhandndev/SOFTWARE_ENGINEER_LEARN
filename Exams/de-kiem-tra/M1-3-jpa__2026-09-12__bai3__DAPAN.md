# Dap an M1-3 JPA - Bai 03 @Transactional

> Tong diem tho: 43 diem.  
> Normalize: `diem tho / 43 * 100`.

---

## Cau 1 - 3d

Y dung:

- Transaction la mot don vi cong viec voi database gom mot hoac nhieu thao tac.
- Thanh cong thi commit, thay doi duoc ghi chinh thuc.
- Co loi rollback thi huy cac thay doi trong transaction.

## Cau 2 - 3d

Y dung:

- Dat `@Transactional` o Service vi Service dai dien use case nghiep vu.
- Controller chi xu ly HTTP, khong nen quan tam commit/rollback.
- Vi du: `create`, `update`, `delete` dung `@Transactional`; `getById`, `list` dung `readOnly = true`.

## Cau 3 - 3d

Y dung:

- Co rollback.
- Vi `AppException extends RuntimeException`.
- Spring mac dinh rollback voi `RuntimeException` va `Error`.

## Cau 4 - 3d

Y dung:

- Mac dinh Spring khong rollback voi checked exception.
- Neu muon rollback thi dung `@Transactional(rollbackFor = SomeCheckedException.class)`.

## Cau 5 - 3d

Y dung:

- `readOnly = true` dung cho method doc: getById, list/search paging.
- Khong dung cho create/update/delete vi cac method do co y dinh ghi DB.
- `readOnly` giup ro y dinh va co the toi uu.

## Cau 6 - 3d

Y dung:

- Dirty checking la Hibernate theo doi managed entity trong transaction.
- Khi entity duoc load trong transaction va bi thay doi field, luc commit Hibernate so voi snapshot ban dau.
- Neu co thay doi, Hibernate sinh SQL update.
- Vi vay update co the khong can goi `save(product)` neu entity dang managed.

## Cau 7 - 5d

Y dung:

```text
Vao method @Transactional -> Spring mo transaction.
Check SKU ok, tim Category ok, save Product ok.
Method ket thuc binh thuong -> commit.
Neu sau save xay ra AppException -> AppException la RuntimeException -> rollback.
Product vua save khong duoc commit vao DB.
```

## Cau 8 - 5d

Y dung:

- `REQUIRED` la propagation mac dinh.
- Neu chua co transaction thi tao transaction moi.
- Neu da co transaction thi tham gia transaction hien tai.
- A co transaction goi B `REQUIRED` thi B dung chung transaction cua A.

## Cau 9 - 5d

Y dung:

- Dirty read: doc du lieu chua commit cua transaction khac.
- Non-repeatable read: doc cung mot row hai lan ra ket qua khac vi transaction khac commit update.
- Phantom read: query theo range hai lan thay them/mat row vi transaction khac insert/delete.
- Moi hoc khong nen tu doi isolation lung tung, dung default/tru khi co ly do ro.

## Cau 10 - 10d

Vi du:

```java
@Service
@RequiredArgsConstructor
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
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public ProductResponse getById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        return toResponse(product);
    }

    @Transactional
    public ProductResponse update(Long id, UpdateProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        product.setName(request.getName());
        product.setPrice(request.getPrice());

        return toResponse(product);
    }
}
```

Chấm theo ý: annotation đúng, rollback đúng, dirty checking đúng, service responsibility đúng.
