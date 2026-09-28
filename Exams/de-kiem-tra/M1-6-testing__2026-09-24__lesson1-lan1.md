# Bai kiem tra M1-6 - Lesson 01

> Trong tam: JUnit 5 co ban, test mindset, Arrange-Act-Assert, assertion va clean test naming.  
> Tong diem tho: 40 diem. Khi cham se normalize ve thang 100.

## Cau 1 - Test de lam gi? (5d)

Neu noi "test chi de tang coverage" thi sai o dau? Hay neu 3 loi ich that su cua test trong backend.

**Tra loi:**

--- tăng tính bao phủ thì cũng đúng nhưng mà không phỉa là ý chính của test , cái test dùng để bảo đảm được tính đúng đắng của kết qủa output khi ta refactor code , chứng minh là code mình đúng logic để ra được đúng output , khi mà tách thì sẽ mock mấy cái dependency thì chỉ cần chứng minh được nó đúng hay k th ,

## Cau 2 - Unit test la gi? (5d)

Unit test khac integration test nhu the nao? Vi sao khong nen dung `@SpringBootTest` cho moi test?

**Tra loi:**  Unittest là test từng feature nhỏ , Intergration là test theo dạng như là gôm nhiều bước lại 

---

## Cau 3 - Arrange, Act, Assert (6d)

Giai thich 3 phan Arrange - Act - Assert bang vi du tao Product:

- SKU hop le.
- Gia hop le.
- Category ton tai.
- Goi service create.
- Kiem tra response.

**Tra loi:**
Arrange là cho trước cái gì đó , ví dụ như là - Goi service create.

Act là Kiểm tra response

Assert là 
- SKU hop le.
- Gia hop le.
- Category ton tai.

---

## Cau 4 - Dat ten test (5d)

Viet lai 3 ten test sau cho ro nghia hon:

```java
test1()
testCreate()
checkError()
```

Boi canh: ProductService co rule SKU trung thi nem loi, request hop le thi tao Product, gia am thi nem loi.

**Tra loi:**


---

## Cau 5 - Assertion co ban (7d)

Cho method:

```java
public int total(int price, int quantity) {
    if (price <= 0) {
        throw new IllegalArgumentException("price must be positive");
    }
    if (quantity <= 0) {
        throw new IllegalArgumentException("quantity must be positive");
    }
    return price * quantity;
}
```

Viet 2 test JUnit 5:

1. `price = 100`, `quantity = 3` thi total la `300`.
2. `price = 0` thi nem `IllegalArgumentException`.

**Tra loi:**


---

## Cau 6 - Test behavior hay implementation? (5d)

Trong hai cach test sau, cach nao tot hon? Vi sao?

```text
A. Test ProductService.create() voi SKU trung thi nem DuplicateSkuException.
B. Test ProductService.create() co goi private method validateSku() hay khong.
```

**Tra loi:**

---

## Cau 7 - Chon test case (7d)

Cho method:

```java
public int finalPrice(int originalPrice, int discountPercent)
```

Rule:

```text
originalPrice phai > 0
discountPercent tu 0 den 100
return originalPrice - originalPrice * discountPercent / 100
```

Hay liet ke it nhat 4 test case nen co, gom ca happy path va sad path.

**Tra loi:**
