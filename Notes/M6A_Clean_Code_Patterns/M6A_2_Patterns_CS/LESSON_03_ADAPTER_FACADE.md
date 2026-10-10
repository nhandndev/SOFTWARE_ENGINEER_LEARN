# Lesson 03 · Adapter và Facade: hai cách đứng giữa, hai mục đích khác nhau

> Buổi 3 / 4h. Hiểu một lớp trung gian thực sự làm gì; không gọi mọi lớp chuyển tiếp là một pattern.

## Tài liệu / video

- [Adapter](https://refactoring.guru/design-patterns/adapter): target interface, adaptee và translation.
- [Facade](https://refactoring.guru/design-patterns/facade): một cửa vào đơn giản cho subsystem.
- [BigDecimal Java21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigDecimal.html): đọc `valueOf(long, int)` khi chuyển minor units.

Video: tìm `Java Adapter target adaptee example`, `Facade vs Adapter backend examples`. Đừng chỉ xem UML; chọn ví dụ kể cả response mapping và lỗi.

## 1. Vấn đề trước Adapter

Giả định một use case muốn hỏi phí giao hàng USD dạng BigDecimal. SDK cũ có method khác, trả int **cents**. Nếu mọi Service tự gọi SDK, chia100, kiểm số âm và translate lỗi, các Service sẽ biết chi tiết vendor và dễ lệch mapping.

Adapter cung cấp giao diện mà client cần, chuyển lời gọi/dữ liệu sang giao diện có sẵn không tương thích. [Adapter](https://refactoring.guru/design-patterns/adapter).

Ở đây:

- Client: use case cần quote, chưa triển khai nguyên Controller/Service.
- Target: ShippingQuote có `quote(postalCode)` trả USD BigDecimal.
- Adaptee: LegacyClient có `lookupFee(postalCode)` trả cents int.
- Adapter: CentsAdapter giữ LegacyClient, implement ShippingQuote.

Đây là **ví dụ giả định**, không SDK thật và không feature hiện có của shopcore. Chỉ có một currency USD theo contract lab; không tự dùng phép chia100 cho VND hoặc mọi currency.

## 2. Code độc lập: Adapter và một Facade nhỏ

<!-- verify: learning/patterns/IntegrationExample.java -->
```java
package learning.patterns;

import java.math.BigDecimal;
import java.util.Objects;

public final class IntegrationExample {
    public interface LegacyClient {
        int lookupFee(String postalCode);
    }
    public interface ShippingQuote {
        BigDecimal quote(String postalCode);
    }
    public static final class CentsAdapter implements ShippingQuote {
        private final LegacyClient client;
        public CentsAdapter(LegacyClient client) {
            this.client = Objects.requireNonNull(client, "client is required");
        }
        public BigDecimal quote(String postalCode) {
            if (postalCode == null || postalCode.isBlank()) {
                throw new IllegalArgumentException("postalCode is required");
            }
            int cents = client.lookupFee(postalCode);
            if (cents < 0) {
                throw new IllegalStateException("negative vendor fee");
            }
            return BigDecimal.valueOf(cents, 2);
        }
    }

    public interface ProductSource { String loadName(long id); }
    public interface Renderer { String render(String name); }
    public interface ReportSink { void store(String payload); }

    public static final class ReportFacade {
        private final ProductSource source;
        private final Renderer renderer;
        private final ReportSink sink;

        public ReportFacade(ProductSource source, Renderer renderer, ReportSink sink) {
            this.source = Objects.requireNonNull(source, "source is required");
            this.renderer = Objects.requireNonNull(renderer, "renderer is required");
            this.sink = Objects.requireNonNull(sink, "sink is required");
        }
        public String generate(long productId) {
            if (productId <= 0) {
                throw new IllegalArgumentException("productId must be positive");
            }
            String name = source.loadName(productId);
            String payload = renderer.render(name);
            sink.store(payload);
            return payload;
        }
    }
}
```

Các interface subsystem giúp truyền fake hoặc implementation thật; chúng không tự cần Spring bean. Trong tài liệu này lambda/fake đủ để đọc và kiểm order; việc thêm `@Component`/config thuộc wiring ứng dụng, không phải phép màu của pattern.

Contract success của lab Facade giả định source trả name và renderer trả payload dùng được; code chỉ điều phối, không có toàn bộ validation dữ liệu của report thật. Nếu Product không tồn tại, source implementation phải báo theo contract đã chọn; không mặc định interface String tự bảo đảm non-null hoặc Facade tự chuyển lỗi thành404. App thật cần chốt và kiểm các điều kiện này tại boundary phù hợp.

## 3. Trace Adapter: 1250 cents trở thành gì?

Giả sử LegacyClient trả1250 khi nhận postalCode `10000`:

```mermaid
sequenceDiagram
    participant U as Use case
    participant A as CentsAdapter
    participant V as LegacyClient
    U->>A: quote("10000")
    A->>A: validate postalCode
    A->>V: lookupFee("10000")
    V-->>A: 1250 cents
    A->>A: reject negative; valueOf(1250, 2)
    A-->>U: 12.50 USD
```

Giải thích từng đường:

1. Use case gọi Target method; không cần biết tên `lookupFee` hay cents.
2. Adapter kiểm null/blank **trước** gọi vendor; lỗi input thì vendor không được gọi.
3. Adapter chuyển lời gọi sang adaptee; mẫu giữ nguyên postalCode, không trim hay parse mất số0 đầu.
4. Vendor trả int. Adapter kiểm số âm vì contract phí lab không âm; âm là lỗi response phía vendor, không âm thầm đổi thành0.
5. `BigDecimal.valueOf(cents, 2)` tạo giá trị với scale2:1250→12.50,1→0.01,0→0.00. Không dùng `cents / 100` integer division vì1 cent sẽ thành0.
6. Response trả ngược cho use case. Không có HTTP/network thật trong lab; sơ đồ chỉ mô tả delegation.

Đơn vị là một phần contract. Code đúng với cents USD của lab không chứng minh đúng với yen/VND hoặc provider dùng micro-units. Không đoán tỉ lệ từ tên field `amount`; đọc protocol thật.

## 4. Adapter không chữa được mọi khác biệt về ngữ nghĩa

Nếu provider throw RuntimeException trong mẫu, adapter **để exception đó truyền ra**, không có catch/retry. Đây là contract của ví dụ, không policy production khuyên lộ lỗi vendor ra HTTP. Trong app thật có thể translate thành lỗi nội bộ ổn định rồi handler quyết định HTTP; mapping lỗi phải được thiết kế và test, không nuốt thành phí0 thành công.

Provider trả “accepted” chưa chắc “đã giao hàng”; đổi interface method không làm semantics tương đương. Với AI provider cũng vậy: adapter có thể chuẩn hóa request/response/error, nhưng token count, context limit, quality, streaming và retry behavior vẫn phải xét riêng. Không thể swap model rồi khẳng định output tương đương chỉ vì cùng interface.

Nếu SDK đã đúng interface và chỉ dùng một nơi, một helper rõ ràng có thể đủ. Adapter thêm type/mapping/test cost, có lợi khi boundary khác biệt thật hoặc vendor cần được cô lập. Không gọi DTO mapper đơn giản là Adapter của vendor nếu không có giao diện/contract cần thích nghi.

## 5. Facade: caller không phải tự biết ba bước subsystem

Before giả định, mỗi caller tự load tên Product, render report rồi lưu report. Việc phối hợp lặp và callers biết quá nhiều subsystem. Facade cung cấp `generate(id)` làm entry point cho workflow này. [Facade](https://refactoring.guru/design-patterns/facade).

```text
Caller → ReportFacade.generate(10)
       → source.loadName(10)    → "Keyboard"
       → renderer.render(...)  → "report:Keyboard"
       → sink.store(payload)
       ← trả "report:Keyboard"
```

Mũi tên đầu giảm số thao tác caller phải biết; ba mũi tên tiếp là lời gọi có thứ tự trong facade. `loadName` trả dữ liệu cho renderer; renderer trả payload cho sink. Cuối cùng facade trả payload đã dùng, không tự phát sinh bước gửi email mới.

Facade không nhất thiết implement cùng interface với subsystem. Nó cung cấp use-case-level API đơn giản hơn. Nó không bắt cấm mọi truy cập subsystem khác; boundary nào public là quyết định architecture.

## 6. Failure path: lớp điều phối không tự có tính nguyên tử

| Điểm lỗi | Theo code lab | Điều không được claim |
|---|---|---|
| productId≤0 | throw trước mọi dependency | Không có request DB thật được test |
| source throw | renderer/sink không chạy | Không tự trả report rỗng |
| renderer throw | sink không chạy | Không tự fallback format khác |
| sink throw | generate không return payload thành công | Không suy store chưa ghi một phần |
| tất cả thành công | load→render→store, trả payload | Không tự có transaction/retry/idempotency |

Nếu sink ghi remote rồi timeout, facade không biết chắc đã ghi hay chưa nếu protocol không nói. Tên `generate` hoặc một class bao quanh không tạo distributed transaction. Đừng thêm retry tùy ý vì có thể lưu/gửi lặp. Trong Spring, `@Transactional` cũng chỉ bảo vệ resources/transaction manager thực sự tham gia, không tự rollback một HTTP side effect.

Facade quá rộng có thể thành God Class: generateReport, login, pricing, deployCloud đều vào một class vì “một cửa”. Giữ entry point theo subsystem/use case cohesive, không tạo `ShopcoreFacade.handleEverything(Object)`.

## 7. So sánh trực tiếp và safety net

| Câu hỏi | Adapter | Facade |
|---|---|---|
| Nỗi đau | Interface/protocol không khớp client | Caller phải phối hợp nhiều bước subsystem |
| Trọng tâm | Translate lời gọi/data/error | Đơn giản hóa entry point và điều phối |
| Mẫu bài này | cents→USD qua CentsAdapter | load→render→store qua ReportFacade |
| Có thể kết hợp? | Adapter có thể là dependency của facade | Facade có thể gọi qua adapter |

Không phân biệt bằng “bọc một object hay nhiều object” tuyệt đối; **intent và contract** mới là chính. Một wrapper chỉ pass-through không tự chứng minh pattern cần thiết.

Test Adapter:1250/1/0 cents, negative, null/blank input không gọi vendor, giữ postalCode, exception propagation. Test Facade: thứ tự/data passed, success return, mỗi bước fail và downstream không chạy. Unit fake bảo vệ mapping/orchestration mẫu; cần contract/integration với SDK/storage thật khi áp dụng, không lấy fake xanh để claim provider đúng.

Bài tập: nếu provider trả1 cent, kể từng bước ra0.01. Nếu renderer fail thì caller nhận gì và sink có chạy không? Nếu hai Service đều biết cents, hãy đề xuất boundary hẹp thay vì rewrite cả backend.

Chốt: **Adapter giúp giao diện không khớp hợp tác; Facade giúp caller không phải biết chi tiết phối hợp; cả hai không thay contract và failure design.**
