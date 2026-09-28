# Dap an M1-6 - Lesson 01

> Dung de cham sau khi ban lam xong. Khong doc truoc neu dang tu kiem tra.

## Cau 1 - 5d

Can noi:

- Coverage chi la chi so phu, khong dam bao test co y nghia.
- Test bao ve behavior khi refactor.
- Test ghi lai business rule bang vi du.
- Test giup phat hien regression.
- Test lam code de tach dependency va de thiet ke hon.

## Cau 2 - 5d

Can noi:

- Unit test test mot don vi nho, nhanh, it dependency.
- Integration test test nhieu thanh phan chay chung.
- `@SpringBootTest` load full Spring context nen cham hon.
- Dung `@SpringBootTest` cho moi thu lam kho khoanh vung loi va tang thoi gian test.

## Cau 3 - 6d

Dap an mau:

```text
Arrange:
- Tao request Product hop le
- Chuan bi repository/mock: SKU chua ton tai, Category ton tai
- Tao ProductService

Act:
- Goi productService.create(request)

Assert:
- Kiem tra response khong null
- Kiem tra sku/name/price/category dung
- Kiem tra product da duoc save neu co mock/verify
```

## Cau 4 - 5d

Ten tot:

```java
should_create_product_when_request_is_valid()
should_throw_exception_when_sku_already_exists()
should_throw_exception_when_price_is_negative()
```

Chap nhan bien the Given-When-Then neu ro nghia.

## Cau 5 - 7d

Dap an mau:

```java
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class PriceCalculatorTest {

    private final PriceCalculator calculator = new PriceCalculator();

    @Test
    void should_return_total_when_price_and_quantity_are_valid() {
        int total = calculator.total(100, 3);

        assertEquals(300, total);
    }

    @Test
    void should_throw_exception_when_price_is_not_positive() {
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> calculator.total(0, 3)
        );

        assertEquals("price must be positive", exception.getMessage());
    }
}
```

Cham diem:

- Co `@Test`.
- Co `assertEquals`.
- Co `assertThrows`.
- Lambda trong `assertThrows` dung.
- Ten test ro nghia.

## Cau 6 - 5d

Dap an:

```text
A tot hon.
```

Ly do:

- A test behavior ben ngoai: SKU trung -> loi.
- B test implementation noi bo.
- Private method co the doi ten/xoa/tach logic ma behavior van dung.
- Test bam implementation lam refactor kho hon.

## Cau 7 - 7d

Test case nen co:

```text
originalPrice = 1000, discountPercent = 10 -> 900
originalPrice = 1000, discountPercent = 0 -> 1000
originalPrice = 1000, discountPercent = 100 -> 0
originalPrice = 0 -> IllegalArgumentException
discountPercent = -1 -> IllegalArgumentException
discountPercent = 101 -> IllegalArgumentException
```

Chi can it nhat 4 case, nhung phai co happy path va sad path.
