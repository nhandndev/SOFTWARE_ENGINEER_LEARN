# Lesson 02 · Chọn cả family, sao chép object và giới hạn của Singleton

> Buổi 2 / 4h. Ba câu hỏi khác nhau: các object nào cần đi cùng nhau, copy cái gì, và vì sao một instance dùng chung có thể nguy hiểm?

## Tài liệu / video

- [Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory): related product families.
- [Prototype](https://refactoring.guru/design-patterns/prototype): copy qua contract thay vì caller tự biết mọi field.
- [Singleton](https://refactoring.guru/design-patterns/singleton): kiểm soát instance và global access; đọc cả nhược điểm.
- [Java Object.clone](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#clone()): mặc định copy fields, không tự deep-copy object graph.
- [Spring Bean Scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html): singleton per-container/per-bean, prototype scope và vòng đời.
- [JLS21: Class initialization](https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html#jls-12.4.2): nền tảng của static Holder, không cần thuộc từng bước JVM.

Video: tìm `Abstract Factory family vs Factory Method Java`, `Java shallow deep copy`, `Spring singleton scope thread safety`. Khi xem ví dụ Singleton, hỏi riêng về khởi tạo và mutable state.

## 1. Abstract Factory: không chỉ chọn một implementation

Lesson01 chọn một Exporter. Bây giờ giả định hệ thống gửi package cho hai partner, mỗi partner có **encoder và signer tương ứng**. Chọn PartnerA encoder rồi PartnerB signer có thể sai protocol. Muốn caller chọn một factory family rồi lấy các product roles từ đó. [Intent Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory).

Không phải cứ class có hai method `create...` là Abstract Factory hữu ích. Nếu hai object không có quan hệ compatibility/lifecycle hay không cần đổi cùng nhau, grouping có thể chỉ thêm ceremony.

## 2. Code hoàn chỉnh cho cả ba cơ chế của buổi này

Mọi class dưới đây là **lab giả định**. Encoder/signer chỉ tạo marker, **không mã hóa, không chữ ký mật mã, không an toàn dùng bảo mật**. String giúp nhìn family, không mô phỏng provider thật.

<!-- verify: learning/patterns/CreationFamilyExample.java -->
```java
package learning.patterns;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public final class CreationFamilyExample {
    public interface Encoder { String encode(String value); }
    public interface Signer { String sign(String payload); }
    public interface PartnerFactory {
        Encoder createEncoder();
        Signer createSigner();
    }

    public static final class PartnerAFactory implements PartnerFactory {
        public Encoder createEncoder() { return value -> "A:" + value; }
        public Signer createSigner() { return payload -> "A-sign(" + payload + ")"; }
    }
    public static final class PartnerBFactory implements PartnerFactory {
        public Encoder createEncoder() { return value -> "B:" + value; }
        public Signer createSigner() { return payload -> "B-sign(" + payload + ")"; }
    }
    public static final class PackageClient {
        private final Encoder encoder;
        private final Signer signer;
        public PackageClient(PartnerFactory factory) {
            Objects.requireNonNull(factory, "factory is required");
            encoder = factory.createEncoder();
            signer = factory.createSigner();
        }
        public String prepare(String value) {
            Objects.requireNonNull(value, "value is required");
            return signer.sign(encoder.encode(value));
        }
    }

    public static final class ReportTemplate {
        private final String name;
        private final List<String> columns;
        public ReportTemplate(String name, List<String> columns) {
            this.name = Objects.requireNonNull(name, "name is required");
            this.columns = new ArrayList<>(List.copyOf(columns));
        }
        public ReportTemplate copy(String newName) {
            return new ReportTemplate(newName, columns);
        }
        public void addColumn(String column) {
            columns.add(Objects.requireNonNull(column, "column is required"));
        }
        public String getName() { return name; }
        public List<String> getColumns() { return List.copyOf(columns); }
    }

    public static final class FormatCatalog {
        private FormatCatalog() { }
        private static final class Holder {
            private static final FormatCatalog INSTANCE = new FormatCatalog();
        }
        public static FormatCatalog getInstance() { return Holder.INSTANCE; }
        public String getLabel() { return "demo-formats"; }
    }
}
```

## 3. Trace Abstract Factory và cái giá của family

```text
Composition/config: chọn new PartnerAFactory()
→ new PackageClient(factory)
  → factory.createEncoder() → encoder của A
  → factory.createSigner()  → signer của A
→ client.prepare("Book")
  → encoder.encode("Book") → "A:Book"
  → signer.sign("A:Book")  → "A-sign(A:Book)"
```

Composition là nơi lắp các dependencies. Trong mẫu nó là caller truyền constructor; trong Spring có thể là cấu hình bean. Client giữ abstraction, không tự switch theo tên partner trong `prepare`. Đổi factory B thì nhận `B-sign(B:Book)` mà không sửa workflow client.

Encoder/Signer ở đây dùng lambda vì interface có một method; lambda là implementation của role, không làm pattern biến mất. Dùng class có tên cũng được. Không cần nhớ cú pháp lambda để trả lời trace.

Factory Method: một điểm tạo Product có thể override trong creator workflow. Abstract Factory: object factory cung cấp **nhiều product roles cùng family**, client thường dùng composition. Hai pattern có thể kết hợp, không phải Abstract Factory là “Factory Method có thêm if”.

Lợi ích family: giảm việc caller tự lắp A encoder với B signer. **Không bảo đảm tuyệt đối bằng type system** trong mẫu này: interface cho phép một custom factory trả hai implementation không tương thích; implementation/contract tests phải giữ family. Muốn thêm product role `Compressor` sẽ phải sửa interface và các factories; thêm một family mới thường chỉ thêm implementation. Đây là trade-off quan trọng, không “mở rộng mọi hướng miễn phí”.

Nếu chỉ có một encoder ổn định, inject trực tiếp Encoder thường đơn giản hơn. Một giant factory tạo Product, JWT, email, DB pool không phải family cohesive chỉ vì tất cả là object.

## 4. Prototype: copy theo contract, không mặc định copy cả database identity

Prototype dùng object hiện có làm mẫu và cung cấp thao tác copy. Có thể dùng `copy()`/copy constructor, **không bắt implement Cloneable**. Caller không phải tự đọc mọi field rồi lắp lại. [Prototype](https://refactoring.guru/design-patterns/prototype).

Trace mẫu:

```java
CreationFamilyExample.ReportTemplate base = new CreationFamilyExample.ReportTemplate(
        "basic", java.util.List.of("id", "name"));
CreationFamilyExample.ReportTemplate detail = base.copy("detail");
detail.addColumn("price");
```

1. Constructor base tạo ArrayList riêng từ dữ liệu đầu vào; không giữ trực tiếp list mutable do caller đưa vào.
2. `copy("detail")` tạo object mới, tên mới, sao chép các String columns sang list mới.
3. `detail.addColumn` sửa list của detail; base vẫn `[id, name]`, detail `[id, name, price]`.
4. Getter trả snapshot không sửa được, nên caller không thêm field lén qua getter. Bản thân ReportTemplate **vẫn mutable** vì có addColumn; snapshot không làm cả class immutable.

## 5. Shallow/deep: hỏi graph nào dùng chung

Nếu copy chỉ `copy.columns = original.columns`, hai object có cùng list: sửa một bên ảnh hưởng bên kia. `new ArrayList<>(oldList)` tách container nhưng **vẫn chia sẻ từng element**. Mẫu chỉ chứa String immutable nên sharing elements hợp lý. Nếu list chứa Column mutable thì phải quyết định copy element, dùng immutable element hoặc chấp nhận sharing có chủ đích. “Deep” cần phạm vi graph rõ, không tự copy connection/lock/cache vô hạn. [Object.clone](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#clone()) không tự làm điều đó.

Không copy một JPA Product rồi giữ nguyên id/version/audit và gọi save để “tạo Product mới”. Identity, quan hệ và rule uniqueness có ý nghĩa persistence; clone đơn giản có thể update object cũ hoặc vi phạm constraint. Nếu nghiệp vụ là duplicate Product, thiết kế use case riêng: field nào copy, field nào reset, SKU mới ra sao, category tham chiếu hay copy? Đó có thể là feature mới, không refactor thuần.

Prototype không tự nhanh hơn constructor; có lợi khi có state/recipe cần reuse hoặc việc khởi tạo thực sự đáng kể. Đo nếu tuyên bố performance, không suy “copy luôn rẻ”.

## 6. Singleton: một instance theo phạm vi nào?

GoF Singleton kiểm soát tạo instance và cung cấp điểm truy cập chung. Mẫu FormatCatalog có constructor private; gọi `getInstance()` lấy static Holder.INSTANCE. Đây là ví dụ Java thông thường trong phạm vi class/classloader, **không phải một instance toàn hệ thống nhiều JVM**. [Singleton](https://refactoring.guru/design-patterns/singleton).

Trace lần đầu dùng Holder: JVM khởi tạo class chứa INSTANCE, tạo FormatCatalog; các lần getInstance sau lấy cùng reference trong phạm vi đó. Initialization-on-demand holder dựa [class initialization của Java](https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html#jls-12.4.2), tránh tự viết lazy field không đồng bộ. Không cần học double-checked locking ở module này.

Mẫu chỉ trả label và không có state mutable để người dùng sửa. Hãy tách hai mệnh đề:

```text
Khởi tạo/publish instance an toàn
KHÔNG SUY RA
Mọi method và mọi mutable field của instance đều thread-safe.
```

Thêm `currentUser` field dùng chung cho request A/B có thể khiến user này đọc state của user khác dù instance tạo an toàn. Dữ liệu theo request nên ở local/request context thích hợp, không singleton field. Counter/map mutable cần thiết kế concurrency riêng.

## 7. Spring singleton không đồng nghĩa GoF Singleton

Spring singleton mặc định là **một instance cho một bean definition trong một container**. Cùng class có hai bean definitions có thể có hai instances; hai contexts cũng không phải một instance dùng chung. Spring quản lifecycle/DI, không đòi constructor private/static getInstance. [Bean Scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html).

Stateless service thường phù hợp singleton scope, nhưng scope không tự cho thread safety. Static `getInstance` giấu dependency, khó thay fake/config, có thể bỏ qua container lifecycle/proxy. Ưu tiên constructor injection cho dependency ứng dụng; không thêm GoF Singleton chỉ để chắc service “chỉ có một”.

Spring **prototype scope** nghĩa tạo bean mới mỗi lần container được yêu cầu lấy bean theo cơ chế tương ứng; **Prototype pattern** nghĩa copy object mẫu. Hai khái niệm khác nhau. Inject prototype một lần vào singleton không làm field tự đổi thành instance mới ở mỗi request; muốn lookup mỗi lần phải thiết kế rõ. Không cần code lookup trong bài này.

## 8. Chọn và kiểm chứng

| Pattern | Case kiểm tra | Case không nên dùng máy móc |
|---|---|---|
| Abstract Factory | A/B encode-sign đúng cặp, call order, custom implementation vi phạm contract | Chỉ một dependency ổn định |
| Prototype | object/list mới, đổi bản sao không đổi gốc, mutable elements nếu có | Copy Entity identity hoặc graph không rõ ownership |
| Singleton | reference reuse trong phạm vi mẫu, không state theo request; concurrency nếu có mutable state | Global state/service locator cho mọi dependency |

Tự trả lời: thêm partner C khác thêm Compressor thế nào? Vì sao List mới chưa chắc deep copy? Nếu two beans cùng class thì có mâu thuẫn Spring singleton không? Nếu trả lời bằng luồng object và phạm vi là bạn đang hiểu, không cần thuộc một định nghĩa dài.

Chốt: **Family phải có quan hệ thật; copy phải có ownership; một instance không thay DI, lifecycle hay thread safety.**
