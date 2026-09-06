# Paging Baby Step

> Đọc file này trước nếu `ProductService.java` còn khó hiểu.

## 1. Có list này

```text
index:  0    1    2    3    4
item:   A    B    C    D    E
```

Code:

```java
List<String> items = List.of("A", "B", "C", "D", "E");
```

Tổng có `5` item.

## 2. `size = 2` nghĩa là gì?

```text
Mỗi trang lấy 2 item.
```

Vậy chia bằng mắt:

```text
page=0 -> A, B
page=1 -> C, D
page=2 -> E
page=3 -> rỗng
```

## 3. `page = 0` nghĩa là gì?

Trong Spring, page bắt đầu từ `0`.

```text
page=0 -> trang đầu tiên
page=1 -> trang thứ hai
page=2 -> trang thứ ba
```

## 4. Công thức lấy điểm bắt đầu

```text
from = page * size
```

Ví dụ:

```text
page=0, size=2 -> from=0*2=0
page=1, size=2 -> from=1*2=2
page=2, size=2 -> from=2*2=4
page=3, size=2 -> from=3*2=6
```

`from` là index bắt đầu lấy.

## 5. Công thức lấy điểm kết thúc

```text
to = from + size
```

Nhưng nếu `to` vượt quá tổng item thì kéo nó về cuối list:

```text
to = min(from + size, totalItems)
```

Ví dụ:

```text
page=2:
from = 4
to = min(4 + 2, 5) = 5
content = items.subList(4, 5) = E
```

## 6. Vì sao `page=3` rỗng?

```text
page=3
size=2
from=3*2=6
totalItems=5
```

Vì:

```text
from >= totalItems
6 >= 5
```

Nên không còn gì để lấy.

Kết quả:

```text
content = []
```

## 7. Code dễ nhất

```java
int from = page * size;

List<String> content;
if (from >= totalItems) {
    content = List.of();
} else {
    int to = from + size;
    if (to > totalItems) {
        to = totalItems;
    }
    content = items.subList(from, to);
}
```

## 8. Tổng số trang

```text
totalPages = ceil(totalItems / size)
```

Với:

```text
totalItems = 5
size = 2
```

Ta có:

```text
5 / 2 = 2.5
ceil(2.5) = 3
```

Nên có 3 trang thật sự có dữ liệu:

```text
page=0
page=1
page=2
```

## 9. Chạy file

```bash
javac PagingBabyStep.java
java PagingBabyStep
```

Output sẽ cho bạn thấy từng biến:

```text
page
size
from
to
content
totalItems
totalPages
```

## 10. Dịch sang REST API

Khi client gọi:

```http
GET /api/products?page=1&size=2
```

Thì trong Java:

```text
page = 1
size = 2
```

Service dùng công thức trên để lấy đúng phần tử.

```text
Repository trả list đầy đủ.
Service cắt list.
Controller trả JSON.
```
