# Lesson 01 · Builder và Factory: object được tạo ở đâu, bằng cách nào?

> Buổi 1 / 4h. Hiểu quá trình tạo object trước khi học thêm lớp bao quanh nó. Bạn dùng class/Lombok như cũ, không bắt chuyển sang record.

## Tài liệu / video

- [Builder](https://refactoring.guru/design-patterns/builder): đọc intent và construction steps.
- [Factory Method](https://refactoring.guru/design-patterns/factory-method): chú ý Creator, Product và override, không chỉ tên method.
- [Lombok @Builder](https://projectlombok.org/features/Builder): đọc builder trên constructor/method, default và toBuilder khi cần.
- Sách GoF: chọn Builder và Factory Method; không đọc cả sách trước khi làm bài.

Video: tìm `Java Builder constructor validation Factory Method vs Simple Factory`. Chọn video có trace object và trade-off; ví dụ chỉ rename `new` thành `create` chưa giải thích được Factory Method.

## 1. Pattern là lời giải cho một lực cản, không phần thưởng cho code nhiều class

Creational quan tâm **cách có được object**. Structural quan tâm **cách các object kết hợp**. Hai nhóm có thể cùng xuất hiện; nhìn cấu trúc giống nhau chưa đủ gọi cùng pattern.

Ví dụ tự nghĩ cho bài này: xuất báo cáo Product. Có request xuất với destination/limit, có exporter CSV/JSON. Đây là lab giả định, không phải feature đã tồn tại trong shopcore. Ta muốn caller biết đang chọn gì, không truyền `new ExportRequest("a", true, null, 100, false, ...)` mà phải đoán nghĩa.

## 2. Builder: lắp dữ liệu từng bước, rồi chốt object

Builder tách các bước cấu hình khỏi object cuối. Có thể hữu ích khi nhiều tùy chọn hoặc nhiều representation; không tự cần Director trong mọi ứng dụng. [Ý tưởng Builder](https://refactoring.guru/design-patterns/builder).

Mẫu nguyên bản dưới đây chỉ có hai field để nhìn rõ cơ chế; hai field đơn giản ngoài thực tế thường constructor là đủ. Contract lab: destination không null/blank, limit 1–1000, default 100. Không tự trim destination hoặc sửa dữ liệu người dùng.

<!-- verify: learning/patterns/BuilderExample.java -->
```java
package learning.patterns;

public final class BuilderExample {
    public static final class ExportRequest {
        private final String destination;
        private final int limit;

        private ExportRequest(String destination, int limit) {
            if (destination == null || destination.isBlank()) {
                throw new IllegalArgumentException("destination is required");
            }
            if (limit < 1 || limit > 1000) {
                throw new IllegalArgumentException("limit must be 1..1000");
            }
            this.destination = destination;
            this.limit = limit;
        }

        public String getDestination() { return destination; }
        public int getLimit() { return limit; }
        public static Builder builder() { return new Builder(); }

        public static final class Builder {
            private String destination;
            private int limit = 100;

            public Builder destination(String value) {
                destination = value;
                return this;
            }
            public Builder limit(int value) {
                limit = value;
                return this;
            }
            public ExportRequest build() {
                return new ExportRequest(destination, limit);
            }
        }
    }
}
```

Ví dụ gọi:

```java
BuilderExample.ExportRequest request = BuilderExample.ExportRequest.builder()
        .destination("local-report")
        .limit(20)
        .build();
```

Trace, không học thuộc chuỗi dấu chấm:

1. `builder()` tạo một Builder **mới**, chưa tạo ExportRequest. Destination đang null, limit mặc định 100.
2. `destination(...)` sửa state của Builder và trả `this`, vì vậy có thể gọi tiếp trên cùng builder.
3. `limit(20)` sửa limit của builder, vẫn chưa chạy constructor ExportRequest.
4. `build()` gọi constructor. Constructor kiểm invariant; hợp lệ thì trả object ExportRequest mới, sai thì throw.
5. Sau build, request giữ String/int đã nhận. Đổi builder sang limit khác không đổi request đã tạo. Đây không tự đúng nếu fields là các List mutable dùng chung mà không copy.

`build()` không tự persist, gửi HTTP, tạo bean hoặc chạy `@Valid`. Nó làm đúng điều code trong nó quy định. Builder mutable nên không chia sẻ một builder giữa hai request/thread; object cuối immutable không làm builder thread-safe.

## 3. Lombok bạn đang dùng tương đương ở phần nào?

Trong source hiện tại, ApiErrorResponse/PageResponse có `@Builder`, và handler gọi `.code(...).message(...).build()`. Đây là evidence builder-style construction, không tự chứng minh DTO immutable hoặc rule được validate.

Lombok sinh các method builder; khi muốn validation đi qua constructor, một cách là đặt `@Builder` trên **constructor có validation**. Fragment, không phải mẫu độc lập đã compile:

```java
@Getter
public final class ExportOptions {
    private final int limit;

    @Builder
    public ExportOptions(int limit) {
        if (limit < 1) {
            throw new IllegalArgumentException("limit must be positive");
        }
        this.limit = limit;
    }
}
```

Giá trị chưa gán cho primitive builder thường là 0, reference là null nếu chưa thiết kế default. Với `@Builder` trên class, field initializer không mặc nhiên là builder default; đọc `@Builder.Default` đúng vị trí và test đường tạo. Mẫu constructor trên **không có default 100** như mẫu manual, đừng trộn hai contract. `toBuilder()` tạo builder từ dữ liệu sẵn không có nghĩa deep copy toàn object graph. [Tài liệu Lombok](https://projectlombok.org/features/Builder).

Builder kiểu fluent rất thường gặp, nhưng không phải toàn bộ cấu trúc GoF Builder với Director tách quá trình xây nhiều representation. Cần mô tả đúng variant đang dùng, không tranh tên thay cho hiểu cơ chế. Director chỉ đáng thêm khi có recipe nhiều bước thực sự cần tái dùng, không vì sơ đồ trong sách có nó.

## 4. Builder nên dùng khi nào?

Nhiều optional fields, lời gọi constructor khó đọc, cần gom việc tạo object hoặc có recipe nhiều bước: cân nhắc. Hai field bắt buộc rõ ràng: constructor/factory đơn giản có thể tốt hơn. Builder làm lời gọi rõ nhưng tăng generated/manual code, có thể cho build thiếu field và cần invariant ở điểm chốt. Không dùng Builder để che một request40 fields vốn đang ôm quá nhiều trách nhiệm.

## 5. Factory có ba nghĩa dễ nhầm

| Cách gọi | Cơ chế | Điều không được suy ra |
|---|---|---|
| Static factory method, như `of(...)` | Method có tên trả object | Chưa tự là GoF Factory Method; có thể cache/trả subtype theo contract |
| Simple Factory | Một nơi chọn implementation theo input | Switch trong factory chưa phải subclass override |
| GoF Factory Method | Creator gọi factory method; ConcreteCreator override loại Product | Không phải chỉ đổi tên constructor thành create |

GoF Factory Method cho subclass thay cách tạo Product mà workflow trong Creator vẫn làm việc qua abstraction. [Factory Method](https://refactoring.guru/design-patterns/factory-method).

## 6. Code đủ vai để thấy Factory Method

Contract lab: exporter trả marker `CSV:name` hoặc `JSON:name`, **không phải serializer CSV/JSON hoàn chỉnh**. Không dùng chuỗi này làm API/file thật. Output chỉ giúp theo dấu implementation.

<!-- verify: learning/patterns/FactoryExample.java -->
```java
package learning.patterns;

import java.util.Objects;

public final class FactoryExample {
    public interface Exporter {
        String export(String name);
    }
    public static final class CsvExporter implements Exporter {
        public String export(String name) { return "CSV:" + name; }
    }
    public static final class JsonExporter implements Exporter {
        public String export(String name) { return "JSON:" + name; }
    }

    public static Exporter simpleFactory(String format) {
        if (format == null) throw new IllegalArgumentException("format is required");
        return switch (format) {
            case "CSV" -> new CsvExporter();
            case "JSON" -> new JsonExporter();
            default -> throw new IllegalArgumentException("unsupported format");
        };
    }

    public abstract static class ExportJob {
        protected abstract Exporter createExporter();

        public final String run(String name) {
            Objects.requireNonNull(name, "name is required");
            Exporter exporter = createExporter();
            return exporter.export(name);
        }
    }
    public static final class CsvJob extends ExportJob {
        protected Exporter createExporter() { return new CsvExporter(); }
    }
    public static final class JsonJob extends ExportJob {
        protected Exporter createExporter() { return new JsonExporter(); }
    }
}
```

Vai: Exporter là Product role của pattern, **không phải entity Product bán hàng**; CsvExporter/JsonExporter là ConcreteProducts. ExportJob là Creator, CsvJob/JsonJob là ConcreteCreators. `createExporter` là điểm override; `run` chứa workflow dùng abstraction.

```text
Caller: ExportJob job = new CsvJob()
→ job.run("Keyboard")          [code trong ExportJob]
→ createExporter()             [dispatch tới CsvJob]
→ new CsvExporter()            [tạo concrete product]
→ exporter.export("Keyboard") [dispatch tới CsvExporter]
→ "CSV:Keyboard" trả ngược về caller
```

Mỗi mũi tên là lời gọi Java bình thường. Kiểu biến là ExportJob/Exporter nhưng object thật quyết định method override chạy ở đâu. `new` không biến mất, chỉ chuyển vào nơi có trách nhiệm tạo. Mẫu tạo exporter mỗi lần run; Factory Method nói chung không bắt mọi lần phải object mới nếu contract cho phép reuse.

Before giả định: workflow hard-code `new CsvExporter()`. After: workflow gọi `createExporter()`, subtype quyết định exporter. Trong lab workflow rất nhỏ nên inheritance có thể thừa; mẫu giúp học cấu trúc, không lời khuyên dựng hierarchy cho mọi format.

## 7. Factory khác Strategy, DI ra sao?

Factory hỏi **lấy/tạo implementation nào?** Strategy hỏi **thực hiện hành vi bằng thuật toán nào?** Một factory có thể cung cấp strategy; hai vai không loại trừ nhau. Chọn CsvExporter rồi gọi export tách selection/creation khỏi execution. Đây là so sánh intent, không cần học toàn Behavioral ở bài này.

DI cung cấp dependency từ bên ngoài; không tự có creator-subclass override. Với Spring, có thể inject Exporter đã cấu hình thay vì tự `new` vào Service. Nếu tự new một class cần Spring AOP/config dependencies, instance đó không tự được container quản lý. Ngược lại, `new` object thuần Java như DTO không có gì sai.

Simple Factory switch đủ tốt khi hai format ổn định và không có creator workflow cần extension. GoF Factory Method tốn hierarchy; Abstract Factory ở bài sau dành **family nhiều product roles**, không chỉ “factory to hơn”. Không xóa hết switch bằng mọi giá; selection vẫn phải xảy ra ở composition/configuration boundary.

## 8. Safety net và bài tập đọc

| Mẫu | Cases cần bảo vệ |
|---|---|
| Builder | default100, limit1/1000 hợp lệ, 0/1001 fail, destination null/blank, builder reuse không đổi object cũ |
| Simple Factory | CSV/JSON đúng type/output, null/unknown fail; không âm thầm fallback CSV |
| Factory Method | CsvJob/JsonJob run dispatch đúng; null name fail trước khi tạo exporter theo contract lab |
| Áp vào Spring | giữ lifecycle/proxy/config và API; unit exporter không chứng minh wiring đúng |

Đọc đúng loại exception trong code: null format/unknown format do mẫu tự throw IllegalArgumentException; null name ở `run` dùng Objects.requireNonNull nên là NullPointerException với message `name is required`, trước createExporter. Validation name ở workflow `run`, không tự có trong mọi lời gọi trực tiếp vào toy exporter. Đừng suy validation của một entry point bảo vệ mọi đường gọi khác.

Tự kể luồng `.builder().limit(20).build()` khi chưa set destination. Sau đó kể `new JsonJob().run("Book")`. Cuối cùng chọn cách **ít phức tạp nhất** cho hai format ổn định và giải thích vì sao không bắt chọn Factory Method.

Chốt: **Builder làm rõ cách lắp một object; Factory quyết định cách có implementation; pattern không thay validation, DI hoặc bằng chứng test.**
