# Lesson 03 · Gom dữ liệu đúng concept: Data Clump và Primitive Obsession

> Buổi 3 / 4h. Mục tiêu: biết lúc nào cần class/enum/value object và lúc nào giữ primitive/DTO đơn giản là đủ.

## Tài liệu / video

- [Introduce Parameter Object](https://refactoring.com/catalog/introduceParameterObject.html): thay nhóm tham số đi cùng nhau bằng một concept.
- [Replace Primitive with Object](https://refactoring.com/catalog/replacePrimitiveWithObject.html): đưa rule của một concept về một nơi.
- [BigDecimal Java 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigDecimal.html): số thập phân, so sánh và scale.
- [Value Object](https://martinfowler.com/bliki/ValueObject.html): ý nghĩa equality cần thiết kế, không chỉ đặt hậu tố Value.

Video: tìm `data clumps primitive obsession value object Java money refactoring`. Không cần học toàn DDD trước khi dùng một class nhỏ.

## 1. Data Clump: nhóm dữ liệu cứ đi cùng nhau

Ba method đều nhận `street, ward, city, postalCode`. Nếu đó là cùng địa chỉ với cùng rule, `Address` có thể làm signature rõ hơn, giảm truyền nhầm/thêm thiếu field. Nếu một method chỉ cần city để thống kê, không bắt nhận nguyên Address rồi phụ thuộc quá mức.

Nhóm `page, size, sort` có thể thành một query object khi dùng lặp lại và có validation chung. Không gom mọi tham số thành `CommonRequest` vì caller phải gửi hàng chục field không liên quan.

Điều kiện để gom: dữ liệu thường thay đổi cùng nhau, cùng ý nghĩa/owner, có invariant chung, giảm complexity thật. Hai method cùng có hai String chưa chứng minh chúng là cùng concept.

## 2. Primitive Obsession không nghĩa cấm int/String

Ví dụ status là String tùy ý và nhiều nơi so `"ACTIVE"`, `"active"`, `"A"`: có thể enum giúp tập giá trị rõ. SKU có rule format dùng ở nhiều nơi: một class có thể giữ invariant. Nhưng một label hiển thị không có rule thì String vẫn đủ; bọc mọi String tạo nhiều ceremony mà không thêm ý nghĩa.

Money gồm amount và currency: `100` không nói là VND hay USD. Dùng BigDecimal thay double tránh một loại sai số, nhưng chưa giải quyết currency, rounding, scale hoặc business policy. Tất cả phải có contract.

## 3. Class mẫu nguyên bản để hiểu invariant

Ví dụ lab này **quy định sẵn** price không âm, currency bắt buộc; cộng chỉ cùng currency, không tự rounding. Không áp rule mới vào code cũ rồi gọi đó là refactor thuần.

<!-- verify: learning/clean/ProductPrice.java -->
```java
package learning.clean;

import java.math.BigDecimal;
import java.util.Currency;

public final class ProductPrice {
    private final BigDecimal amount;
    private final Currency currency;

    public ProductPrice(BigDecimal amount, Currency currency) {
        if (amount == null || amount.signum() < 0) {
            throw new IllegalArgumentException("amount must be non-negative");
        }
        if (currency == null) {
            throw new IllegalArgumentException("currency is required");
        }
        this.amount = amount;
        this.currency = currency;
    }

    public BigDecimal getAmount() { return amount; }
    public Currency getCurrency() { return currency; }

    public ProductPrice add(ProductPrice other) {
        if (other == null || !currency.equals(other.currency)) {
            throw new IllegalArgumentException("currency mismatch");
        }
        return new ProductPrice(amount.add(other.amount), currency);
    }
}
```

Đọc code:

1. Constructor là cửa tạo hợp lệ theo contract lab; không để setter sau đó phá rule âm/currency thiếu.
2. `BigDecimal` và `Currency` là immutable; getters không cho caller mutate object con. Nếu field là List mutable thì final một mình chưa đủ, phải defensive copy theo contract.
3. `add` kiểm currency, tạo object mới; không tự đổi USD sang VND hoặc mutate giá gốc.
4. Không `setScale`/rounding tùy tiện. Số `1.0` và `1.00` có thể bằng về giá trị số với compareTo nhưng khác theo BigDecimal.equals; test phải chọn tiêu chí contract cần.
5. Đây là class nhỏ giữ dữ liệu/rule, **chưa là thư viện Money hoàn chỉnh**: chưa implement value equality/hashCode, conversion, discount, serialization/JPA mapping. Khi dùng trong Set/Map key cần thiết kế equality đồng bộ hashCode, không mặc định hai instance bằng nhau.

Bạn quen class/Lombok nên không bắt dùng record. Nhưng @Builder có thể tạo đường khởi tạo khác nếu đặt sai chỗ: phải đảm bảo mọi đường tạo đi qua invariant; thêm annotation không tự tạo validation.

## 4. Làm sao không phá request/response DTO?

API cũ có `{ "price": 100, "currency": "USD" }`. Nội bộ đổi sang ProductPrice không bắt buộc JSON thành object lồng mới. Giữ request/response class cũ, mapping tại boundary sang concept nội bộ nếu đó là mục tiêu.

Nếu chuyển trực tiếp JSON schema, DB column hoặc giá trị enum lưu sẵn thì đó là migration/contract change cần plan và compatibility tests. Không dùng rename/refactor để giấu breaking change. Không tự thêm Currency vào entity thật của bạn trong bài này.

## 5. Các trường hợp cần chậm lại

- Null trước đây nghĩa “giữ nguyên” ở PATCH: object mới reject null sẽ đổi behavior nếu áp thẳng.
- Giá trước đây cho 0 hợp lệ: đổi sang `>0` là thay business rule, không thuần structure.
- Enum chứa status hiện có: phải xử lý dữ liệu legacy/unknown, không deserialize thẳng rồi mất compatibility.
- Một Address để giao hàng và BillingAddress có rule khác: giống fields chưa chắc cùng abstraction.

Bài tập: mô tả ba test cho amount/currency và một test API schema để chứng minh thay cấu trúc nội bộ không phá contract. Nếu chưa có test/baseline thì ghi đề xuất, không tự công nhận behavior-preserving.

## 6. Data Clump before/after: giảm truyền nhầm, không gom cho đẹp

Ví dụ signature giả định, chưa phải code độc lập:

```java
// Before
ship(orderId, street, ward, city, postalCode);
quoteShipping(street, ward, city, postalCode);

// After: Address is a class with getters, not a required record.
Address destination = new Address(street, ward, city, postalCode);
ship(orderId, destination);
quoteShipping(destination);
```

Trước đó bốn String cùng kiểu khiến `city` và `ward` dễ bị đảo ở mỗi lời gọi. Sau đó caller truyền một địa chỉ đã tạo, method biết nó nhận concept gì. Nhưng constructor vẫn có thể bị truyền nhầm: class **giảm** số điểm dễ sai, không làm compiler hiểu mọi String. Factory/builder có tên field rõ có thể giúp khả năng đọc; validation cần được thiết kế riêng.

Đường chạy: nhận Request DTO → đọc các field địa chỉ → tạo Address nội bộ → gọi use case → use case đọc getter cần thiết. JSON không tự đổi chỉ vì method nội bộ nhận Address. Nếu client đang gửi flat fields, giữ request class và mapping ở boundary; không bắt client gửi object lồng mới để thuận tiện cho nội bộ.

Hãy đổi **một caller trước**, kiểm giữ đúng giá trị, rồi đổi các caller khác. Nếu là public API/library dùng bên ngoài, không xóa signature cũ tùy tiện; cân nhắc adapter/overload trong giai đoạn tương thích. Report chỉ thống kê city vẫn nhận city nếu đó là toàn bộ dữ liệu cần dùng, không nhận cả địa chỉ để đủ đồng bộ hình thức.

## 7. Theo dấu một object giá, thay vì học thuộc “immutable”

Với class ProductPrice ở mục 3:

```java
Currency usd = Currency.getInstance("USD");
ProductPrice first = new ProductPrice(new BigDecimal("100.00"), usd);
ProductPrice second = new ProductPrice(new BigDecimal("25.00"), usd);
ProductPrice total = first.add(second);
```

1. Tạo `first`: constructor kiểm amount và currency, rồi gán fields. Object giữ 100.00 USD.
2. Tạo `second`: constructor kiểm lại cho object thứ hai. Object giữ 25.00 USD.
3. Gọi `first.add(second)`: `this` là first; `other` là second. So currency trước khi cộng.
4. `amount.add(other.amount)` trả BigDecimal mới 125.00; không sửa BigDecimal 100.00.
5. `new ProductPrice(...)` kiểm invariant cho kết quả rồi trả một object thứ ba. first vẫn 100.00, second vẫn 25.00, total là 125.00 USD.

Nếu second là VND, lỗi xảy ra ở bước 3; không có object total và không tự đổi tiền. Nếu amount âm ngay lúc tạo second, constructor throw ở bước 2: một object hợp lệ second không được trả về cho caller.

Phân biệt hai câu: **immutable** là object không đổi trạng thái sau tạo; **valid** là trạng thái đáp ứng rule. Một object final chứa amount âm vẫn immutable nhưng sai rule nếu đường tạo không validate. Bởi vậy Lombok `@Builder` cần đi qua constructor/factory có validation phù hợp; không phải gắn annotation là xong. Mẫu thuần Java này không dùng Lombok, nên QA của nó không chứng minh mọi builder bạn viết đều an toàn.

Chốt: **Thêm type khi nó bảo vệ một concept có rule; giữ boundary và compatibility rõ ràng.**
