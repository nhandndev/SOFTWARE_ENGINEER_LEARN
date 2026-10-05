# Dap an M1-3 JPA - Bai 04 Lazy vs Eager

> Tong diem tho: 43 diem.  
> Normalize: `diem tho / 43 * 100`.

---

## Cau 1 - 3d

Y dung:

- EAGER: load relation ngay khi load entity chinh.
- LAZY: chua load relation ngay, chi load khi truy cap relation.
- LAZY giup tranh load thua nhung can transaction/session khi truy cap.

## Cau 2 - 3d

Y dung:

- Database table `products` luu cot `category_id` lam foreign key.
- Java `Product` entity giu field `Category category`.
- `@JoinColumn(name = "category_id")` noi field Java voi foreign key column.

## Cau 3 - 3d

Y dung:

- `findById` lay Product truoc.
- Category LAZY co the chua query ngay.
- Hibernate query Category khi code truy cap relation, vi du `product.getCategory().getName()`, neu session/persistence context con mo.

## Cau 4 - 3d

Y dung:

- LazyInitializationException xay ra khi truy cap lazy relation nhung Hibernate session/persistence context da dong.
- Hay gap khi tra entity ra Controller/Jackson serialize entity sau khi Service transaction ket thuc.

## Cau 5 - 3d

Y dung:

- Tra entity truc tiep co the gay LazyInitializationException khi Jackson cham lazy relation.
- Co the lo field noi bo.
- API phu thuoc entity/schema.
- Relation 2 chieu co the JSON lap vo han.
- Nen tra DTO.

## Cau 6 - 3d

Y dung:

- Trong Service transaction, Hibernate session con mo.
- Khi map DTO, neu can categoryName thi lazy relation co the duoc load an toan.
- Sau do Controller tra DTO, Jackson khong cham entity/lazy proxy.

## Cau 7 - 5d

Y dung:

```text
Repository lay list/page Product bang 1 query.
category la LAZY.
Khi map tung Product va goi getCategory().getName(), Hibernate co the query Category cho tung Product.
Neu co N Product thi thanh 1 query Product + N query Category = N+1.
```

## Cau 8 - 5d

Y dung:

- EAGER de load thua relation du khong can.
- Query nang hon, kho kiem soat performance.
- Nhieu relation EAGER co the keo ca graph object lon.
- Chi nen dung EAGER khi relation nho va gan nhu luc nao cung can.
- Mac dinh thuc dung nen uu tien LAZY va fetch co chu dich khi can.

## Cau 9 - 5d

Van de:

- Controller tra entity truc tiep.
- Product co lazy category, Jackson serialize co the cham `getCategory()`.
- Co the LazyInitializationException neu session da dong.
- Co the lo field noi bo/API phu thuoc entity.
- Neu bidirectional relation co the lap JSON.

Huong sua:

- Controller tra `ProductResponse`.
- Service `@Transactional(readOnly = true)` lay Product va map DTO.
- DTO chi gom field can tra, vi du `categoryId`, `categoryName`.

## Cau 10 - 10d

Vi du:

```java
@Entity
public class Product {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
```

```java
@Transactional(readOnly = true)
public ProductResponse getById(Long id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

    return ProductResponse.builder()
            .id(product.getId())
            .sku(product.getSku())
            .name(product.getName())
            .price(product.getPrice())
            .categoryId(product.getCategory().getId())
            .categoryName(product.getCategory().getName())
            .build();
}
```

```java
@GetMapping("/{id}")
public ResponseEntity<ApiResponse<ProductResponse>> getById(@PathVariable Long id) {
    ProductResponse result = productService.getById(id);
    return ResponseEntity.ok(ApiResponse.success(result));
}
```

Chấm theo ý: relation LAZY đúng, map DTO trong transaction, Controller không trả entity.
