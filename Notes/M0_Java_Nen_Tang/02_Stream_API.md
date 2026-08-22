# Bài học: Stream API trong Java

## 0. Stream API là gì?

Stream API giúp xử lý dữ liệu trong collection theo kiểu khai báo: nói **muốn làm gì** thay vì viết chi tiết từng vòng lặp.

Ví dụ dùng vòng lặp:

```java
List<String> names = List.of("An", "Binh", "Chi", "Dung");
List<String> result = new ArrayList<>();

for (String name : names) {
    if (name.length() >= 4) {
        result.add(name.toUpperCase());
    }
}
```

Dùng Stream:

```java
List<String> result = names.stream()
        .filter(name -> name.length() >= 4)
        .map(String::toUpperCase)
        .toList();
```

Cùng một ý nghĩa:

- Lọc tên có độ dài từ 4 trở lên.
- Đổi tên sang chữ hoa.
- Gom kết quả thành list mới.

Điểm cần nhớ:

- Stream không phải collection.
- Stream là một pipeline xử lý dữ liệu.
- Stream thường không làm thay đổi list gốc.
- Stream chỉ chạy khi gặp terminal operation như `toList()`, `collect()`, `forEach()`, `reduce()`, `count()`.

---

## 1. Pipeline của Stream

Một stream pipeline thường có 3 phần:

```java
source.stream()
      .intermediateOperation()
      .intermediateOperation()
      .terminalOperation();
```

Ví dụ:

```java
List<String> result = names.stream()              // source
        .filter(name -> name.length() >= 4)       // intermediate
        .map(String::toUpperCase)                 // intermediate
        .toList();                                // terminal
```

| Phần | Ý nghĩa | Ví dụ |
|---|---|---|
| Source | Nguồn dữ liệu | `names.stream()` |
| Intermediate operation | Biến đổi/lọc, chưa chạy ngay | `filter`, `map`, `flatMap` |
| Terminal operation | Kết thúc pipeline, lúc này stream mới chạy | `toList`, `collect`, `reduce`, `count` |

Intermediate operation là lazy, tức là chưa xử lý ngay.

```java
Stream<String> stream = names.stream()
        .filter(name -> {
            System.out.println("Filtering " + name);
            return name.length() >= 4;
        });

// Chưa in gì cả vì chưa có terminal operation.

List<String> result = stream.toList();
// Đến đây mới chạy filter.
```

---

## 2. `filter`: lọc phần tử

`filter` giữ lại phần tử thỏa điều kiện.

Cú pháp:

```java
stream.filter(element -> dieu_kien_boolean)
```

Ví dụ:

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

List<Integer> evenNumbers = numbers.stream()
        .filter(n -> n % 2 == 0)
        .toList();

System.out.println(evenNumbers); // [2, 4, 6]
```

Ví dụ với object:

```java
public record Product(String name, int price, boolean active) {}

List<Product> products = List.of(
        new Product("Keyboard", 500, true),
        new Product("Mouse", 200, true),
        new Product("Old monitor", 100, false)
);

List<Product> activeProducts = products.stream()
        .filter(Product::active)
        .toList();
```

Giải thích:

```java
Product::active
```

tương đương:

```java
product -> product.active()
```

Câu cần nhớ:

> `filter` dùng để giữ lại phần tử thỏa điều kiện, không đổi kiểu dữ liệu của phần tử.

---

## 3. `map`: biến đổi từng phần tử

`map` biến mỗi phần tử từ dạng này sang dạng khác.

Cú pháp:

```java
stream.map(element -> gia_tri_moi)
```

Ví dụ đổi `String` sang `Integer`:

```java
List<String> names = List.of("An", "Binh", "Chi");

List<Integer> lengths = names.stream()
        .map(String::length)
        .toList();

System.out.println(lengths); // [2, 4, 3]
```

Ví dụ đổi `Product` sang tên sản phẩm:

```java
List<String> productNames = products.stream()
        .map(Product::name)
        .toList();
```

Ví dụ đổi `Product` sang DTO:

```java
public record ProductResponse(String name, int price) {}

List<ProductResponse> responses = products.stream()
        .map(product -> new ProductResponse(product.name(), product.price()))
        .toList();
```

Câu cần nhớ:

> `map` dùng để biến đổi từng phần tử. Sau `map`, kiểu dữ liệu có thể thay đổi.

Ví dụ:

```java
Stream<Product> -> map(Product::name) -> Stream<String>
Stream<String> -> map(String::length) -> Stream<Integer>
```

---

## 4. `filter` vs `map`

Đây là cặp dễ nhầm.

| Operation | Mục đích | Có đổi kiểu không? | Ví dụ |
|---|---|---|---|
| `filter` | Lọc bớt phần tử | Không | giữ sản phẩm active |
| `map` | Biến đổi phần tử | Có thể có | Product -> ProductResponse |

Ví dụ:

```java
List<String> result = products.stream()
        .filter(Product::active)       // Product -> Product, chỉ lọc
        .map(Product::name)            // Product -> String, biến đổi
        .toList();
```

Đọc pipeline trên:

> Từ danh sách sản phẩm, giữ sản phẩm active, lấy ra tên sản phẩm, gom thành list.

---

## 5. `collect` và `Collectors`

Sau khi xử lý stream, ta thường cần gom kết quả lại.

Java có 2 cách phổ biến:

```java
stream.toList()
```

hoặc:

```java
stream.collect(Collectors.toList())
```

Ví dụ:

```java
List<String> names = products.stream()
        .map(Product::name)
        .collect(Collectors.toList());
```

Nhớ import:

```java
import java.util.stream.Collectors;
```

Một số collector hay dùng:

| Collector | Ý nghĩa |
|---|---|
| `Collectors.toList()` | Gom thành list |
| `Collectors.toSet()` | Gom thành set, loại trùng |
| `Collectors.joining(", ")` | Nối chuỗi |
| `Collectors.groupingBy(...)` | Nhóm dữ liệu |
| `Collectors.toMap(...)` | Gom thành map |

### 5.1 `toList`

```java
List<String> names = products.stream()
        .map(Product::name)
        .toList();
```

### 5.2 `toSet`

```java
Set<String> categories = products.stream()
        .map(Product::category)
        .collect(Collectors.toSet());
```

### 5.3 `joining`

```java
String namesText = products.stream()
        .map(Product::name)
        .collect(Collectors.joining(", "));
```

Kết quả:

```text
Keyboard, Mouse, Monitor
```

### 5.4 `groupingBy`

Giả sử:

```java
public record Product(String name, String category, int price) {}
```

Nhóm sản phẩm theo category:

```java
Map<String, List<Product>> productsByCategory = products.stream()
        .collect(Collectors.groupingBy(Product::category));
```

Kết quả dạng:

```java
{
  "keyboard" -> [Product(...), Product(...)],
  "mouse" -> [Product(...)]
}
```

### 5.5 `toMap`

Tạo map theo tên sản phẩm:

```java
Map<String, Product> productByName = products.stream()
        .collect(Collectors.toMap(
                Product::name,
                product -> product
        ));
```

Cẩn thận: nếu key trùng, `toMap` sẽ lỗi. Khi có khả năng trùng key, thêm merge function:

```java
Map<String, Product> productByName = products.stream()
        .collect(Collectors.toMap(
                Product::name,
                product -> product,
                (oldValue, newValue) -> newValue
        ));
```

---

## 6. `reduce`: gom nhiều phần tử thành một giá trị

`reduce` dùng để gom nhiều phần tử thành một kết quả duy nhất.

Ví dụ tính tổng:

```java
List<Integer> numbers = List.of(1, 2, 3, 4);

Integer sum = numbers.stream()
        .reduce(0, (total, n) -> total + n);

System.out.println(sum); // 10
```

Có thể viết bằng method reference:

```java
Integer sum = numbers.stream()
        .reduce(0, Integer::sum);
```

Giải thích:

```java
reduce(0, Integer::sum)
```

- `0` là giá trị ban đầu.
- `Integer::sum` là cách cộng giá trị hiện tại với phần tử tiếp theo.

Ví dụ tìm tổng tiền:

```java
int totalPrice = products.stream()
        .map(Product::price)
        .reduce(0, Integer::sum);
```

Ví dụ nối chuỗi:

```java
String text = List.of("Java", "Stream", "API").stream()
        .reduce("", (result, word) -> result + word + " ");
```

Nhưng nối chuỗi nên dùng `joining` hơn:

```java
String text = List.of("Java", "Stream", "API").stream()
        .collect(Collectors.joining(" "));
```

Câu cần nhớ:

> `reduce` gom nhiều phần tử thành một giá trị duy nhất, ví dụ tổng, tích, max, min, hoặc chuỗi.

---

## 7. `flatMap`: làm phẳng nhiều stream/list con

`flatMap` là phần dễ nhầm nhất trong Stream.

Nhớ nhanh:

> `map` biến 1 phần tử thành 1 giá trị.  
> `flatMap` biến 1 phần tử thành nhiều giá trị, rồi làm phẳng lại.

Ví dụ có danh sách list lồng nhau:

```java
List<List<String>> groups = List.of(
        List.of("An", "Binh"),
        List.of("Chi", "Dung")
);
```

Nếu dùng `map`:

```java
List<Stream<String>> result = groups.stream()
        .map(group -> group.stream())
        .toList();
```

Kết quả là list các stream, vẫn bị lồng:

```text
Stream<Stream<String>>
```

Dùng `flatMap`:

```java
List<String> names = groups.stream()
        .flatMap(group -> group.stream())
        .toList();
```

Kết quả:

```java
["An", "Binh", "Chi", "Dung"]
```

Có thể viết gọn:

```java
List<String> names = groups.stream()
        .flatMap(List::stream)
        .toList();
```

Ví dụ thực tế: Order có nhiều items.

```java
public record Order(String code, List<OrderItem> items) {}
public record OrderItem(String productName, int quantity) {}
```

Lấy tất cả item từ nhiều order:

```java
List<OrderItem> allItems = orders.stream()
        .flatMap(order -> order.items().stream())
        .toList();
```

Lấy tất cả tên sản phẩm từ nhiều order:

```java
List<String> productNames = orders.stream()
        .flatMap(order -> order.items().stream())
        .map(OrderItem::productName)
        .toList();
```

Câu cần nhớ:

> Dùng `flatMap` khi mỗi phần tử chứa một collection/stream con và mình muốn làm phẳng thành một stream duy nhất.

---

## 8. `map` vs `flatMap`

Ví dụ:

```java
List<String> sentences = List.of(
        "java stream",
        "spring boot"
);
```

Dùng `map`:

```java
List<String[]> words = sentences.stream()
        .map(sentence -> sentence.split(" "))
        .toList();
```

Kết quả là:

```text
List<String[]>
```

Dùng `flatMap`:

```java
List<String> words = sentences.stream()
        .flatMap(sentence -> Arrays.stream(sentence.split(" ")))
        .toList();
```

Kết quả:

```java
["java", "stream", "spring", "boot"]
```

Nhớ:

| Operation | Kết quả |
|---|---|
| `map` | Giữ cấu trúc lồng |
| `flatMap` | Làm phẳng cấu trúc lồng |

---

## 9. Ví dụ tổng hợp gần với `shopcore`

Giả sử có `Product`:

```java
public record Product(
        Long id,
        String name,
        String category,
        int price,
        boolean active
) {}
```

Và DTO:

```java
public record ProductResponse(
        Long id,
        String name,
        int price
) {}
```

Danh sách mẫu:

```java
List<Product> products = List.of(
        new Product(1L, "Keyboard", "accessory", 500, true),
        new Product(2L, "Mouse", "accessory", 200, true),
        new Product(3L, "Old Monitor", "screen", 100, false)
);
```

### 9.1 Lọc active product và đổi sang response

```java
List<ProductResponse> responses = products.stream()
        .filter(Product::active)
        .map(product -> new ProductResponse(
                product.id(),
                product.name(),
                product.price()
        ))
        .toList();
```

### 9.2 Tính tổng giá sản phẩm active

```java
int totalActivePrice = products.stream()
        .filter(Product::active)
        .map(Product::price)
        .reduce(0, Integer::sum);
```

### 9.3 Nhóm sản phẩm theo category

```java
Map<String, List<Product>> byCategory = products.stream()
        .collect(Collectors.groupingBy(Product::category));
```

### 9.4 Lấy set category

```java
Set<String> categories = products.stream()
        .map(Product::category)
        .collect(Collectors.toSet());
```

---

## 10. Lỗi hay gặp

### Lỗi 1: Quên terminal operation

```java
products.stream()
        .filter(Product::active)
        .map(Product::name);
```

Pipeline này chưa chạy vì thiếu terminal operation.

Đúng:

```java
List<String> names = products.stream()
        .filter(Product::active)
        .map(Product::name)
        .toList();
```

### Lỗi 2: Nhầm `map` với `filter`

Sai:

```java
products.stream()
        .map(product -> product.active())
        .toList();
```

Code này trả về `List<Boolean>`, không lọc sản phẩm.

Đúng:

```java
products.stream()
        .filter(Product::active)
        .toList();
```

### Lỗi 3: Dùng `map` làm lồng list

```java
List<List<OrderItem>> itemGroups = orders.stream()
        .map(Order::items)
        .toList();
```

Nếu muốn lấy tất cả item thành một list phẳng:

```java
List<OrderItem> allItems = orders.stream()
        .flatMap(order -> order.items().stream())
        .toList();
```

### Lỗi 4: Lạm dụng `forEach`

`forEach` phù hợp cho side-effect như in log. Nếu muốn tạo list mới, ưu tiên `map/filter/toList`.

Không nên:

```java
List<String> names = new ArrayList<>();
products.stream()
        .filter(Product::active)
        .forEach(product -> names.add(product.name()));
```

Nên:

```java
List<String> names = products.stream()
        .filter(Product::active)
        .map(Product::name)
        .toList();
```

---

## 11. Checklist tự kiểm

Bạn nắm Stream API cơ bản nếu trả lời được:

- Stream khác collection ở điểm nào?
- Intermediate operation và terminal operation là gì?
- `filter` dùng để làm gì?
- `map` dùng để làm gì?
- `filter` khác `map` thế nào?
- `reduce` dùng khi nào?
- `Collectors.toList`, `toSet`, `joining`, `groupingBy`, `toMap` dùng để làm gì?
- `flatMap` khác `map` thế nào?
- Khi nào không nên dùng `forEach`?

---

## 12. Bài tập tự làm

### Bài 1: Lọc số chẵn

Input:

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);
```

Yêu cầu: dùng stream lấy list số chẵn.

Đáp án tự kiểm:

```java
List<Integer> evens = numbers.stream()
        .filter(n -> n % 2 == 0)
        .toList();
```

### Bài 2: Lấy độ dài tên

Input:

```java
List<String> names = List.of("An", "Binh", "Chi");
```

Yêu cầu: đổi thành list độ dài tên.

Đáp án tự kiểm:

```java
List<Integer> lengths = names.stream()
        .map(String::length)
        .toList();
```

### Bài 3: Lọc và map

Input:

```java
List<String> names = List.of("An", "Binh", "Chi", "Dung");
```

Yêu cầu: lấy tên dài từ 4 ký tự trở lên, đổi sang chữ hoa.

Đáp án tự kiểm:

```java
List<String> result = names.stream()
        .filter(name -> name.length() >= 4)
        .map(String::toUpperCase)
        .toList();
```

### Bài 4: Tính tổng

Input:

```java
List<Integer> prices = List.of(100, 200, 300);
```

Yêu cầu: dùng `reduce` tính tổng.

Đáp án tự kiểm:

```java
int total = prices.stream()
        .reduce(0, Integer::sum);
```

### Bài 5: Làm phẳng list

Input:

```java
List<List<String>> groups = List.of(
        List.of("An", "Binh"),
        List.of("Chi", "Dung")
);
```

Yêu cầu: lấy `List<String>` phẳng.

Đáp án tự kiểm:

```java
List<String> names = groups.stream()
        .flatMap(List::stream)
        .toList();
```

### Bài 6: Nhóm sản phẩm

Với record:

```java
public record Product(String name, String category, int price) {}
```

Yêu cầu: nhóm `List<Product>` theo category.

Đáp án tự kiểm:

```java
Map<String, List<Product>> byCategory = products.stream()
        .collect(Collectors.groupingBy(Product::category));
```

---

## 13. Mẫu trả lời nhanh khi kiểm tra

### Stream API

> Stream API dùng để xử lý dữ liệu theo pipeline gồm source, intermediate operations và terminal operation. Stream không phải collection và thường không mutate dữ liệu gốc.

### `filter`

> `filter` giữ lại phần tử thỏa điều kiện boolean, không đổi kiểu phần tử.

### `map`

> `map` biến đổi từng phần tử sang giá trị khác, có thể đổi kiểu dữ liệu.

### `reduce`

> `reduce` gom nhiều phần tử thành một giá trị duy nhất, ví dụ tổng tiền hoặc tổng số lượng.

### Collectors

> Collectors dùng để gom kết quả stream thành cấu trúc dữ liệu hoặc kết quả khác như list, set, map, chuỗi nối, hoặc nhóm dữ liệu.

### `flatMap`

> `flatMap` dùng khi mỗi phần tử chứa một collection/stream con và cần làm phẳng thành một stream duy nhất.

