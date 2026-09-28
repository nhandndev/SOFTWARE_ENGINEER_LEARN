# M1-6 - Lesson 01: JUnit 5, test mindset va clean test naming

> Muc tieu: hieu test de lam gi, biet viet unit test JUnit 5 co ban, dat ten test ro nghia, va doc duoc test nhu doc mot kich ban.

## Tai lieu / video nen xem

Nen doc theo thu tu:

1. Official: Spring Boot Testing  
   https://docs.spring.io/spring-boot/reference/testing/index.html

2. Official: JUnit 5 User Guide  
   https://junit.org/junit5/docs/current/user-guide/

3. Baeldung: Guide to JUnit 5  
   https://www.baeldung.com/junit-5

4. Baeldung: Assert an Exception Is Thrown in JUnit 5  
   https://www.baeldung.com/junit-assert-exception

Video nen search tren YouTube:

```text
JUnit 5 tutorial assertions assertThrows
Spring Boot testing JUnit 5 unit test service
Arrange Act Assert unit testing
```

Doc nhanh: uu tien `@Test`, assertions, `assertThrows`, va cach dat ten test.

## 1. Test de lam gi?

Test khong phai de "cho co diem coverage". Test co 4 viec chinh:

```text
1. Chung minh code dang lam dung hanh vi mong muon.
2. Bao ve code khi refactor.
3. Ghi lai rule nghiep vu bang vi du song.
4. Giup ban thiet ke code de tach dependency tot hon.
```

Vi du trong `shopcore`:

```text
Tao Product:
- SKU khong duoc trung
- Gia phai > 0
- Category phai ton tai
- Tao thanh cong thi tra ProductResponse
```

Neu co test, sau nay ban sua Service/JPA/DTO ma lam hong rule, test se bao ngay.

## 2. Cac loai test lon

### Unit test

Test mot don vi nho, thuong la mot class/method.

Vi du:

```text
ProductService.create()
SkuValidator.isValid()
PriceCalculator.calculate()
```

Dac diem:

```text
Nhanh
It phu thuoc Spring
It phu thuoc database
De debug
```

Lesson 01 tap trung vao unit test Java thuan.

### Slice test

Test mot "lat" cua Spring context.

Vi du:

```text
@WebMvcTest -> test Controller
@DataJpaTest -> test Repository/JPA
```

Hoc o Lesson 03.

### Integration test

Test nhieu thanh phan chay chung.

Vi du:

```text
@SpringBootTest
Controller -> Service -> Repository -> DB test
```

Hoc o Lesson 04.

## 3. Test pyramid

Y tuong don gian:

```text
Nhieu unit test
It hon slice test
It integration test
```

Ly do:

```text
Unit test nhanh va de khoanh vung loi.
Integration test gan thuc te hon nhung cham hon va kho debug hon.
```

Dung sai thuong gap:

```text
Chi viet @SpringBootTest cho moi thu
-> test cham
-> loi kho biet nam o Controller, Service hay DB
```

## 4. JUnit 5 co ban

Dependency Spring Boot Starter Test thuong da co san:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

Class test nam trong:

```text
src/test/java
```

Vi du:

```java
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PriceCalculatorTest {

    @Test
    void should_return_total_price_when_quantity_is_valid() {
        PriceCalculator calculator = new PriceCalculator();

        int total = calculator.total(100, 3);

        assertEquals(300, total);
    }
}
```

## 5. Arrange - Act - Assert

Mot test de doc nen chia 3 phan:

```text
Arrange: chuan bi du lieu va object
Act: goi method can test
Assert: kiem tra ket qua
```

Vi du:

```java
@Test
void should_return_total_price_when_quantity_is_valid() {
    // Arrange
    PriceCalculator calculator = new PriceCalculator();

    // Act
    int total = calculator.total(100, 3);

    // Assert
    assertEquals(300, total);
}
```

Khong bat buoc phai comment `Arrange/Act/Assert` moi lan. Nhung luc moi hoc, viet comment nay giup ban tach y tot hon.

## 6. Given - When - Then

Day la cach dat ten/ke chuyen:

```text
Given: co dieu kien dau vao nao
When: khi hanh dong nao xay ra
Then: ket qua mong doi la gi
```

Vi du:

```text
Given price = 100 va quantity = 3
When tinh total
Then ket qua la 300
```

Ten test co the viet:

```java
@Test
void should_return_total_price_when_quantity_is_valid() {}
```

Hoac:

```java
@Test
void given_valid_quantity_when_calculate_total_then_return_total_price() {}
```

Trong project cua ban, nen uu tien ten ngan ma ro:

```text
should_create_product_when_request_is_valid
should_throw_exception_when_sku_already_exists
should_return_400_when_price_is_negative
```

## 7. Assertions can biet

### `assertEquals`

```java
assertEquals(expected, actual);
```

Vi du:

```java
assertEquals(300, total);
```

### `assertTrue` va `assertFalse`

```java
assertTrue(product.isActive());
assertFalse(errors.isEmpty());
```

### `assertNull` va `assertNotNull`

```java
assertNotNull(response);
assertNull(deletedAt);
```

### `assertThrows`

Dung de test exception.

```java
@Test
void should_throw_exception_when_price_is_negative() {
    PriceCalculator calculator = new PriceCalculator();

    IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> calculator.total(-100, 3)
    );

    assertEquals("price must be positive", exception.getMessage());
}
```

Mau can nho:

```text
assertThrows(ExpectedException.class, () -> methodCanNemLoi());
```

## 8. Test behavior, khong test implementation

Test behavior la test hanh vi ben ngoai:

```text
Input nao -> output nao
Dieu kien nao -> exception nao
```

Khong nen test qua sat implementation noi bo:

```text
Method nay co goi private method A khong?
Bien local co ten gi?
Ben trong dung if hay switch?
```

Vi du nen test:

```text
create product voi SKU trung -> throw DuplicateSkuException
```

Khong nen test:

```text
create product co dung dung if dau tien de check SKU khong
```

Implementation co the doi, behavior phai giu.

## 9. Test case nen co cho mot rule

Voi mot method co business rule, hay nghi theo 2 nhom:

```text
Happy path: input hop le -> thanh cong
Sad path: input loi -> nem exception / tra loi phu hop
```

Vi du `PriceCalculator.total(price, quantity)`:

```text
price = 100, quantity = 3 -> 300
price <= 0 -> throw IllegalArgumentException
quantity <= 0 -> throw IllegalArgumentException
```

Vi du `ProductService.create(request)`:

```text
request hop le -> tao product
SKU trung -> AppException DUPLICATE_SKU
category khong ton tai -> AppException CATEGORY_NOT_FOUND
price <= 0 -> AppException INVALID_PRICE
```

## 10. Vi du day du: class Java thuan

Class can test:

```java
public class PriceCalculator {

    public int total(int price, int quantity) {
        if (price <= 0) {
            throw new IllegalArgumentException("price must be positive");
        }

        if (quantity <= 0) {
            throw new IllegalArgumentException("quantity must be positive");
        }

        return price * quantity;
    }
}
```

Test:

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

    @Test
    void should_throw_exception_when_quantity_is_not_positive() {
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> calculator.total(100, 0)
        );

        assertEquals("quantity must be positive", exception.getMessage());
    }
}
```

## 11. Clean test toi thieu

Test tot nen:

```text
Ten ro hanh vi
Moi test chi test mot y chinh
Arrange/Act/Assert tach bach
Khong copy paste du lieu qua dai
Khong assert qua nhieu thu khong lien quan
Khong phu thuoc thu tu chay test
```

Test kem:

```java
@Test
void test1() {
    // 100 dong setup
    // goi 5 method
    // assert 20 thu
}
```

Test tot hon:

```java
@Test
void should_throw_exception_when_sku_is_blank() {}

@Test
void should_throw_exception_when_price_is_negative() {}

@Test
void should_create_product_when_request_is_valid() {}
```

## 12. Khi nao test that bai la tot?

Test fail khong phai luc nao cung xau.

Test fail tot khi:

```text
Ban sua code va test bao rule bi pha.
Ban viet test truoc de chung minh bug dang ton tai.
Ban doi requirement va test cu fail de nhac ban update behavior.
```

Test fail xau khi:

```text
Test phu thuoc gio hien tai lung tung.
Test phu thuoc data ngoai.
Test phu thuoc thu tu chay.
Test assert implementation qua sat.
```

## 13. Bai tap nho

Tao class:

```java
public class DiscountCalculator {

    public int finalPrice(int originalPrice, int discountPercent) {
        if (originalPrice <= 0) {
            throw new IllegalArgumentException("original price must be positive");
        }

        if (discountPercent < 0 || discountPercent > 100) {
            throw new IllegalArgumentException("discount percent must be between 0 and 100");
        }

        return originalPrice - originalPrice * discountPercent / 100;
    }
}
```

Viet test:

```text
1000, 10 -> 900
originalPrice = 0 -> exception
discountPercent = -1 -> exception
discountPercent = 101 -> exception
```

## 14. Checklist truoc khi qua Lesson 02

- [ ] Giai thich duoc unit test la gi.
- [ ] Biet Arrange - Act - Assert.
- [ ] Viet duoc `@Test`.
- [ ] Dung duoc `assertEquals`.
- [ ] Dung duoc `assertThrows`.
- [ ] Dat ten test theo behavior.
- [ ] Biet vi sao khong nen chi dung `@SpringBootTest` cho moi thu.

## 15. Tom tat can nho

```text
Test tot la test behavior, khong bam vao implementation.
Unit test nen nhanh, nho, de doc.
Moi test nen noi duoc: given gi, when lam gi, then mong doi gi.
JUnit 5 can nam truoc: @Test, assertEquals, assertTrue/assertFalse, assertThrows.
```

> Test khong phai de lam dep coverage. Test la day an toan de ban sua code ma khong so pha rule cu.
