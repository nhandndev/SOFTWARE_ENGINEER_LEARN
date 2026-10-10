# Lesson 04 · Refactor an toàn và thay conditional bằng polymorphism có lý do

> Buổi 4 / 4h. Mục tiêu: phân biệt refactor với đổi behavior; dùng test giữ contract; hiểu một before/after chạy được. Testing ở đây là dây bảo vệ cho thay đổi, không bắt học lại toàn module testing.

## Tài liệu / video

- [Refactoring](https://refactoring.com/): thay cấu trúc từng bước nhỏ, giữ external behavior.
- [Replace Conditional with Polymorphism](https://refactoring.com/catalog/replaceConditionalWithPolymorphism.html): phân phối behavior theo loại.
- [JUnit guide](https://docs.junit.org/current/user-guide/): assertions/parameterized tests; chỉ đọc phần cần cho test case.
- [Spring proxying](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html): self-invocation không đi lại qua proxy.

Video: tìm `Java refactoring characterization tests replace conditional polymorphism`. Ưu tiên video có baseline/edge cases, không chỉ code sau đẹp.

## 1. Contract rộng hơn giá trị return

Behavior quan sát được có thể gồm output, exception type/code/message, null behavior, thứ tự checks, DB writes, transaction/side effects, thời điểm notify và API JSON. Performance cũng có thể là ràng buộc cần bảo vệ nếu đang có yêu cầu; không hứa tests chức năng chứng minh latency.

Đổi tên private helper thường là refactor. Sửa `>=500` thành `>500`, đổi 404 thành 400, đổi map mutable thành unmodifiable khi caller từng sửa được: đó là đổi behavior. Có thể là thay đổi tốt nhưng phải tách mục tiêu, không gọi là “chỉ clean”.

## 2. Red → Green → Refactor không nghĩa làm hỏng production trước

Khi thêm tính năng/fix bug: test cho behavior mong muốn fail (Red), code tối thiểu đạt (Green), rồi cải thiện cấu trúc giữ xanh (Refactor).

Với code cũ đang chạy, trước hết thêm **characterization tests** ghi lại behavior hiện tại, chạy baseline xanh, refactor từng bước và chạy lại. Nếu phát hiện bug cũ, ghi riêng: test expectation mới có thể đỏ rồi fix bug thành commit riêng; không vừa refactor vừa đổi rule mà mất dấu.

Tests không chứng minh tuyệt đối mọi input. Chọn normal/boundary/invalid và interactions theo blast radius; mutation/fault probe có thể kiểm test bắt được một lỗi có chủ đích. Nếu chưa biết expected, đọc contract/đo behavior, đừng sửa test chỉ để xanh.

## 3. Before: policy phí giao hàng giả định, không phải feature hiện có

Contract lab: method STANDARD hoặc EXPRESS; subtotal không âm và bắt buộc. STANDARD miễn phí từ 500 trở lên, dưới đó 25; EXPRESS luôn 40. Đơn vị tiền được giả định thống nhất trong lab; không conversion/rounding.

<!-- verify: learning/clean/ShippingFeeBefore.java -->
```java
package learning.clean;

import java.math.BigDecimal;

public class ShippingFeeBefore {
    public BigDecimal calculate(String method, BigDecimal subtotal) {
        if (method == null) {
            throw new IllegalArgumentException("method is required");
        }
        if (subtotal == null || subtotal.signum() < 0) {
            throw new IllegalArgumentException("subtotal must be non-negative");
        }
        if ("STANDARD".equals(method)) {
            if (subtotal.compareTo(new BigDecimal("500")) >= 0) {
                return BigDecimal.ZERO;
            }
            return new BigDecimal("25");
        }
        if ("EXPRESS".equals(method)) {
            return new BigDecimal("40");
        }
        throw new IllegalArgumentException("unsupported method");
    }
}
```

Method này chưa tự là smell nghiêm trọng: hai nhánh ổn định thì giữ conditional có thể đơn giản nhất. Bài giả định sắp có nhiều policy có behavior riêng/lặp phân nhánh ở nhiều nơi, nên thử polymorphism để học kỹ thuật, không khẳng định phải áp vào source thật.

## 4. After: caller chọn policy, policy tính phí

<!-- verify: learning/clean/ShippingFeeAfter.java -->
```java
package learning.clean;

import java.math.BigDecimal;
import java.util.Map;

public class ShippingFeeAfter {
    private interface FeePolicy {
        BigDecimal calculate(BigDecimal subtotal);
    }

    private static final class StandardPolicy implements FeePolicy {
        @Override
        public BigDecimal calculate(BigDecimal subtotal) {
            return subtotal.compareTo(new BigDecimal("500")) >= 0
                    ? BigDecimal.ZERO : new BigDecimal("25");
        }
    }

    private static final class ExpressPolicy implements FeePolicy {
        @Override
        public BigDecimal calculate(BigDecimal subtotal) {
            return new BigDecimal("40");
        }
    }

    private final Map<String, FeePolicy> policies = Map.of(
            "STANDARD", new StandardPolicy(),
            "EXPRESS", new ExpressPolicy());

    public BigDecimal calculate(String method, BigDecimal subtotal) {
        if (method == null) {
            throw new IllegalArgumentException("method is required");
        }
        if (subtotal == null || subtotal.signum() < 0) {
            throw new IllegalArgumentException("subtotal must be non-negative");
        }
        FeePolicy policy = policies.get(method);
        if (policy == null) {
            throw new IllegalArgumentException("unsupported method");
        }
        return policy.calculate(subtotal);
    }
}
```

Giải thích đường chạy:

1. Caller vẫn gọi `calculate(method, subtotal)`, không cần biết class policy nào.
2. Validation giữ thứ tự: null method trước, null/âm subtotal sau. Khi cả hai sai, error ưu tiên vẫn như before.
3. Map chọn implementation theo method; unknown vẫn throw cùng message, không default miễn phí.
4. `policy.calculate` dispatch tới StandardPolicy hoặc ExpressPolicy. Đây là polymorphism: cùng interface, behavior của implementation khác nhau.
5. Nhánh threshold trong StandardPolicy vẫn còn; polymorphism không có nghĩa loại mọi if trong hệ thống. Nó gom behavior theo variation point, không phải đích “0 conditional”.

Chi phí: thêm types/indirection. Nếu chỉ có hai case không đổi, after có thể không đáng. Đừng thêm Spring bean/factory/strategy registry phức tạp để làm bài này; manual objects đủ để hiểu. Chọn pattern khi có complexity thật, M6A-2 sẽ học sâu hơn.

## 5. Test matrix trước khi tin lời “không đổi behavior”

| Input | Expected |
|---|---|
| STANDARD, 0 hoặc 499.99 | 25 |
| STANDARD, 500 / 500.00 / 500.01 | 0 |
| EXPRESS, 0 hoặc 1000 | 40 |
| Unknown, subtotal hợp lệ | IllegalArgumentException: unsupported method |
| Method null và subtotal null | method is required, giữ thứ tự |
| Method hợp lệ, subtotal null/âm | subtotal must be non-negative |

Dùng explicit expected và đối chiếu before/after; chỉ so hai bản bằng nhau chưa đủ nếu cả hai cùng sai. Mutation `>=`→`>` phải bị test tại 500 bắt được. Không cần thuộc JUnit annotation để giải thích ma trận, nhưng muốn claim refactor đã an toàn cần evidence test thật.

## 6. Khi áp vào Spring, test thuần Java chưa đủ

Nếu extract vào private helper rồi chuyển @Transactional từ method public sang helper, proxy có thể không áp transaction như trước. Nếu đổi handler/DTO thì thêm HTTP contract test. Nếu thay Repository query, kiểm transaction/data/SQL count liên quan, không chỉ stub trả đúng object.

Tests unit cho mẫu này chỉ bảo vệ policy thuần; không chứng minh JPA rollback, security hay production perf. Tách các thay đổi nhỏ để biết lỗi xuất hiện từ bước nào; nếu test fail, tìm regression/rollback bước vừa làm, không xóa assertion.

Chốt: **Đầu tiên giữ behavior bằng evidence, sau đó mới tự tin gọi thay cấu trúc là refactor.**
