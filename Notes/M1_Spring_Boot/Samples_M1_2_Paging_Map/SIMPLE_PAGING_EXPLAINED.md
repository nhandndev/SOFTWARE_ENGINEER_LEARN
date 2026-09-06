# Paging Đơn Giản Nhất

> File này chỉ giải thích pagination hoạt động ra sao. Không cần Spring, không cần Controller, không cần Repository.

## 1. Ý tưởng

Giả sử có list:

```text
products = [P1, P2, P3, P4, P5]
```

Client muốn:

```http
GET /api/products?page=0&size=2
```

Nghĩa là:

```text
Tôi muốn trang số 0, mỗi trang 2 item.
```

Trong Spring, page bắt đầu từ `0`:

```text
page=0 -> trang 1
page=1 -> trang 2
page=2 -> trang 3
```

## 2. Công thức

```text
fromIndex = page * size
toIndex = min(fromIndex + size, totalElements)
```

Với 5 item, `size = 2`:

```text
page=0:
fromIndex = 0 * 2 = 0
toIndex = min(0 + 2, 5) = 2
lấy products[0..2) = P1, P2

page=1:
fromIndex = 1 * 2 = 2
toIndex = min(2 + 2, 5) = 4
lấy products[2..4) = P3, P4

page=2:
fromIndex = 2 * 2 = 4
toIndex = min(4 + 2, 5) = 5
lấy products[4..5) = P5

page=3:
fromIndex = 3 * 2 = 6
fromIndex >= totalElements
trả content rỗng
```

Chú ý: `subList(fromIndex, toIndex)` lấy từ `fromIndex` đến trước `toIndex`.

```text
subList(0, 2) -> index 0 và 1
subList(2, 4) -> index 2 và 3
subList(4, 5) -> index 4
```

## 3. Code Java đơn giản

```java
import java.util.List;

public class SimplePagingDemo {
    public static void main(String[] args) {
        List<String> products = List.of("P1", "P2", "P3", "P4", "P5");

        printPage(products, 0, 2);
        printPage(products, 1, 2);
        printPage(products, 2, 2);
        printPage(products, 3, 2);
    }

    static void printPage(List<String> products, int page, int size) {
        int totalElements = products.size();
        int totalPages = (int) Math.ceil((double) totalElements / size);
        int fromIndex = page * size;

        List<String> content;
        if (fromIndex >= totalElements) {
            content = List.of();
        } else {
            int toIndex = Math.min(fromIndex + size, totalElements);
            content = products.subList(fromIndex, toIndex);
        }

        System.out.println("page=" + page);
        System.out.println("size=" + size);
        System.out.println("content=" + content);
        System.out.println("totalElements=" + totalElements);
        System.out.println("totalPages=" + totalPages);
        System.out.println();
    }
}
```

Output:

```text
page=0
size=2
content=[P1, P2]
totalElements=5
totalPages=3

page=1
size=2
content=[P3, P4]
totalElements=5
totalPages=3

page=2
size=2
content=[P5]
totalElements=5
totalPages=3

page=3
size=2
content=[]
totalElements=5
totalPages=3
```

## 4. Đưa vào Spring thì khác gì?

Không khác về công thức.

Spring chỉ thêm phần nhận input từ URL:

```java
@GetMapping
public ResponseEntity<PageResponse<ProductResponse>> getProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size) {
    return ResponseEntity.ok(productService.getProducts(page, size));
}
```

Service vẫn tính như cũ:

```text
findAll()
-> sort
-> fromIndex
-> toIndex
-> subList
-> PageResponse
```

## 5. Tóm tắt

```text
page = muốn lấy trang nào
size = mỗi trang bao nhiêu item
fromIndex = page * size
toIndex = min(fromIndex + size, totalElements)
content = list.subList(fromIndex, toIndex)
totalPages = ceil(totalElements / size)
```
