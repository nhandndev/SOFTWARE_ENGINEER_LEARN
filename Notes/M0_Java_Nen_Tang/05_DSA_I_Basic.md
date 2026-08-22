# Bài học: DSA I - Big-O, Array, LinkedList, Stack, Queue, Binary Search, Sort

Module: `M0-3 · DSA I`

Mục tiêu của bài này:

- Hiểu Big-O: time/space, best/average/worst.
- Phân biệt Array và LinkedList.
- Biết dùng Stack, Queue, Deque.
- Viết được Binary Search iterative và recursive.
- Nhận diện Merge Sort, Quick Sort, Heap Sort và khi nào dùng.
- Chuẩn bị deliverable: package `algo` có ít nhất 15 lời giải kèm JUnit test.

---

## 1. DSA là gì?

DSA = Data Structures and Algorithms.

- Data Structure: cách tổ chức dữ liệu.
- Algorithm: cách xử lý dữ liệu.

Ví dụ:

| Bài toán | Data structure thường dùng | Algorithm thường dùng |
|---|---|---|
| Tìm số trong list đã sort | Array/List | Binary Search |
| Check ngoặc hợp lệ | Stack | Push/pop |
| Xử lý request theo thứ tự đến trước | Queue | FIFO |
| Undo/redo | Stack/Deque | Push/pop hai đầu |
| Sort danh sách product theo price | Array/List | Sort |

DSA không phải học để thuộc tên thuật toán. Mục tiêu thực tế là:

> Nhìn bài toán, chọn cấu trúc dữ liệu hợp lý và phân tích được chi phí chạy.

---

# Phần 1: Big-O

## 2. Big-O là gì?

Big-O mô tả tốc độ tăng của chi phí thuật toán khi input lớn dần.

Input size thường ký hiệu là `n`.

Ví dụ:

```java
for (int i = 0; i < n; i++) {
    System.out.println(i);
}
```

Vòng lặp chạy `n` lần, nên time complexity là:

```text
O(n)
```

Big-O không hỏi máy chạy bao nhiêu mili giây. Nó hỏi:

> Khi n tăng, số bước tăng kiểu gì?

---

## 3. Các Big-O thường gặp

| Big-O | Tên dễ hiểu | Ví dụ |
|---|---|---|
| `O(1)` | Hằng số | Truy cập `arr[0]` |
| `O(log n)` | Logarithmic | Binary Search |
| `O(n)` | Tuyến tính | Duyệt list |
| `O(n log n)` | Gần tuyến tính | Merge Sort, Heap Sort, Quick Sort average |
| `O(n^2)` | Bình phương | 2 vòng lặp lồng nhau |
| `O(2^n)` | Mũ | Brute force subset |

Thứ tự từ tốt đến xấu thường là:

```text
O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)
```

---

## 4. Time complexity

Time complexity là số bước xử lý tăng thế nào theo input.

### O(1)

```java
int first(int[] arr) {
    return arr[0];
}
```

Dù array có 10 hay 1 triệu phần tử, lấy `arr[0]` vẫn là một bước chính.

### O(n)

```java
int sum(int[] arr) {
    int total = 0;
    for (int value : arr) {
        total += value;
    }
    return total;
}
```

Phải duyệt toàn bộ array.

### O(n^2)

```java
void printPairs(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < arr.length; j++) {
            System.out.println(arr[i] + ", " + arr[j]);
        }
    }
}
```

Mỗi phần tử lại đi với mọi phần tử khác.

### O(log n)

Binary Search mỗi lần chia đôi không gian tìm kiếm.

```text
1000 -> 500 -> 250 -> 125 -> ...
```

Số bước tăng rất chậm.

---

## 5. Space complexity

Space complexity là lượng bộ nhớ phụ thuật toán cần dùng.

Ví dụ `O(1)` space:

```java
int sum(int[] arr) {
    int total = 0;
    for (int value : arr) {
        total += value;
    }
    return total;
}
```

Chỉ dùng thêm biến `total`.

Ví dụ `O(n)` space:

```java
int[] copy(int[] arr) {
    int[] result = new int[arr.length];
    for (int i = 0; i < arr.length; i++) {
        result[i] = arr[i];
    }
    return result;
}
```

Tạo array mới cùng size với input.

---

## 6. Best, average, worst case

Một thuật toán có thể nhanh/chậm tùy input.

Ví dụ linear search:

```java
int indexOf(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}
```

| Case | Khi nào | Time |
|---|---|---|
| Best | target ở đầu array | `O(1)` |
| Average | target ở giữa | `O(n)` |
| Worst | target cuối hoặc không có | `O(n)` |

Câu cần nhớ:

> Khi không nói rõ, Big-O thường nói về worst case.

---

## 7. Cách tính Big-O nhanh

### Quy tắc 1: Bỏ hằng số

```java
for (int i = 0; i < n; i++) {}
for (int i = 0; i < n; i++) {}
```

Chạy `2n`, nhưng Big-O là:

```text
O(n)
```

### Quy tắc 2: Giữ phần tăng nhanh nhất

```java
for (int i = 0; i < n; i++) {}

for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {}
}
```

Tổng là:

```text
O(n + n^2) -> O(n^2)
```

### Quy tắc 3: Vòng lặp nối tiếp thì cộng

```java
O(n) + O(m) = O(n + m)
```

Nếu cùng input size:

```java
O(n) + O(n) = O(n)
```

### Quy tắc 4: Vòng lặp lồng nhau thì nhân

```java
for n
    for m
```

Là:

```text
O(n * m)
```

Nếu cả hai đều `n`:

```text
O(n^2)
```

---

# Phần 2: Array vs LinkedList

## 8. Array là gì?

Array lưu phần tử liên tiếp trong bộ nhớ và truy cập bằng index.

```java
int[] numbers = {1, 2, 3};
System.out.println(numbers[0]); // O(1)
```

Trong Java, `ArrayList` bên trong dùng array động.

```java
List<Integer> list = new ArrayList<>();
```

Ưu điểm:

- Truy cập theo index nhanh: `O(1)`.
- Cache-friendly, thường nhanh trong thực tế.
- Phù hợp khi cần đọc nhiều theo index.

Nhược điểm:

- Insert/delete giữa list tốn `O(n)` vì phải dời phần tử.
- Array thường cần resize khi đầy.

---

## 9. LinkedList là gì?

LinkedList gồm các node nối với nhau.

```text
1 -> 2 -> 3 -> null
```

Mỗi node chứa:

- value
- reference tới node tiếp theo

Java có:

```java
List<Integer> list = new LinkedList<>();
```

Ưu điểm:

- Add/remove đầu/cuối có thể nhanh nếu có node reference.
- Không cần mảng liên tiếp.

Nhược điểm:

- Truy cập index chậm: `O(n)`.
- Tốn thêm bộ nhớ cho reference.
- Trong thực tế Java backend, `ArrayList` thường dùng nhiều hơn `LinkedList`.

---

## 10. ArrayList vs LinkedList

| Operation | ArrayList | LinkedList |
|---|---:|---:|
| Get by index | `O(1)` | `O(n)` |
| Add cuối | amortized `O(1)` | `O(1)` |
| Add giữa | `O(n)` | `O(n)` để tìm vị trí |
| Remove giữa | `O(n)` | `O(n)` để tìm vị trí |
| Memory | Ít hơn | Nhiều hơn do node/reference |

Câu cần nhớ:

> Nếu cần truy cập index nhiều, dùng ArrayList. LinkedList chỉ hợp hơn trong vài trường hợp thao tác node/đầu-cuối đặc biệt, nhưng không mặc định tốt hơn.

---

# Phần 3: Stack, Queue, Deque

## 11. Stack

Stack là LIFO:

```text
Last In, First Out
```

Vào sau, ra trước.

Ví dụ:

- Undo.
- Call stack.
- Check ngoặc hợp lệ.
- DFS iterative.

Trong Java hiện đại, thường dùng `Deque` làm stack:

```java
Deque<Integer> stack = new ArrayDeque<>();

stack.push(1);
stack.push(2);

System.out.println(stack.pop()); // 2
```

Không nên ưu tiên `java.util.Stack` vì class cũ.

---

## 12. Queue

Queue là FIFO:

```text
First In, First Out
```

Vào trước, ra trước.

Ví dụ:

- Hàng đợi xử lý request.
- BFS.
- Job queue.

Java:

```java
Queue<Integer> queue = new ArrayDeque<>();

queue.offer(1);
queue.offer(2);

System.out.println(queue.poll()); // 1
```

Method thường dùng:

| Method | Ý nghĩa |
|---|---|
| `offer` | thêm vào queue |
| `poll` | lấy và xóa đầu queue, rỗng trả null |
| `peek` | xem đầu queue, không xóa |

---

## 13. Deque

Deque = double-ended queue.

Có thể thêm/xóa ở cả hai đầu.

Java:

```java
Deque<Integer> deque = new ArrayDeque<>();

deque.addFirst(1);
deque.addLast(2);

System.out.println(deque.removeFirst()); // 1
System.out.println(deque.removeLast());  // 2
```

Deque có thể dùng như:

- Stack.
- Queue.
- Sliding window.
- Palindrome check.

Câu cần nhớ:

> Trong Java, `ArrayDeque` thường là lựa chọn tốt cho stack/queue cơ bản.

---

## 14. Bài kinh điển: Valid Parentheses

Bài toán:

```text
"()[]{}" -> true
"([)]" -> false
```

Dùng stack:

```java
public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();

    for (char ch : s.toCharArray()) {
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.push(ch);
            continue;
        }

        if (stack.isEmpty()) {
            return false;
        }

        char open = stack.pop();
        if (ch == ')' && open != '(') return false;
        if (ch == ']' && open != '[') return false;
        if (ch == '}' && open != '{') return false;
    }

    return stack.isEmpty();
}
```

Complexity:

```text
Time: O(n)
Space: O(n)
```

---

# Phần 4: Binary Search

## 15. Binary Search là gì?

Binary Search tìm phần tử trong array/list **đã được sort** bằng cách chia đôi không gian tìm kiếm.

Điều kiện bắt buộc:

> Dữ liệu phải sorted.

Nếu array chưa sort, binary search không đảm bảo đúng.

---

## 16. Binary Search iterative

```java
public int binarySearch(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid;
        }

        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}
```

Vì sao không viết:

```java
int mid = (left + right) / 2;
```

Với số rất lớn, `left + right` có thể overflow. Cách an toàn:

```java
int mid = left + (right - left) / 2;
```

Complexity:

```text
Time: O(log n)
Space: O(1)
```

---

## 17. Binary Search recursive

```java
public int binarySearchRecursive(int[] nums, int target) {
    return search(nums, target, 0, nums.length - 1);
}

private int search(int[] nums, int target, int left, int right) {
    if (left > right) {
        return -1;
    }

    int mid = left + (right - left) / 2;

    if (nums[mid] == target) {
        return mid;
    }

    if (nums[mid] < target) {
        return search(nums, target, mid + 1, right);
    }

    return search(nums, target, left, mid - 1);
}
```

Complexity:

```text
Time: O(log n)
Space: O(log n)
```

Space là `O(log n)` vì recursive call stack.

---

## 18. Lỗi hay gặp với Binary Search

### Lỗi 1: Quên dữ liệu phải sorted

Binary Search chỉ đúng nếu input sorted.

### Lỗi 2: Sai điều kiện loop

Thường dùng:

```java
while (left <= right)
```

Vì khi `left == right`, vẫn còn một phần tử cần check.

### Lỗi 3: Không update `left/right` đúng

Sai:

```java
left = mid;
right = mid;
```

Có thể bị infinite loop.

Đúng:

```java
left = mid + 1;
right = mid - 1;
```

---

# Phần 5: Sorting

## 19. Sorting là gì?

Sorting là sắp xếp dữ liệu theo thứ tự.

Ví dụ:

```text
[5, 1, 4, 2] -> [1, 2, 4, 5]
```

Trong Java thực tế:

```java
int[] nums = {5, 1, 4, 2};
Arrays.sort(nums);
```

Với list:

```java
products.sort(Comparator.comparing(Product::price));
```

Nhưng trong DSA, bạn cần hiểu các thuật toán sort phổ biến.

---

## 20. Merge Sort

Ý tưởng:

1. Chia array thành 2 nửa.
2. Sort từng nửa.
3. Merge 2 nửa đã sort.

Complexity:

```text
Time: O(n log n)
Space: O(n)
```

Ưu điểm:

- Worst case vẫn `O(n log n)`.
- Stable nếu implement đúng.
- Hợp với linked list/external sort.

Nhược điểm:

- Cần thêm bộ nhớ `O(n)`.

Khi dùng:

- Cần độ ổn định.
- Muốn worst case chắc chắn.

---

## 21. Quick Sort

Ý tưởng:

1. Chọn pivot.
2. Partition: phần nhỏ hơn pivot sang một bên, lớn hơn sang bên kia.
3. Recursively sort hai bên.

Complexity:

```text
Average: O(n log n)
Worst: O(n^2)
Space: O(log n) average do recursion
```

Ưu điểm:

- Thường rất nhanh trong thực tế.
- In-place hơn merge sort.

Nhược điểm:

- Worst case `O(n^2)` nếu chọn pivot tệ.

Khi dùng:

- Sort in-memory array.
- Chấp nhận average-case tốt.

---

## 22. Heap Sort

Ý tưởng:

1. Xây heap.
2. Lặp lại: lấy phần tử max/min ra khỏi heap.
3. Kết quả là array sorted.

Complexity:

```text
Time: O(n log n)
Space: O(1) nếu in-place
```

Ưu điểm:

- Worst case `O(n log n)`.
- Không cần thêm nhiều bộ nhớ.

Nhược điểm:

- Thường không stable.
- Cache behavior không tốt bằng quick sort.

Khi dùng:

- Cần worst-case `O(n log n)` và ít bộ nhớ phụ.

---

## 23. So sánh Merge, Quick, Heap

| Sort | Best | Average | Worst | Space | Stable |
|---|---:|---:|---:|---:|---|
| Merge Sort | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)` | Có thể stable |
| Quick Sort | `O(n log n)` | `O(n log n)` | `O(n^2)` | `O(log n)` avg | Không đảm bảo |
| Heap Sort | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(1)` | Không |

Câu nhớ nhanh:

- Merge: chắc chắn, ổn định, tốn memory.
- Quick: nhanh thực tế, worst case xấu.
- Heap: worst-case tốt, ít memory, không stable.

---

# Phần 6: Deliverable gợi ý

M0-3 yêu cầu:

> Package `algo` chứa >= 15 lời giải kèm JUnit test.

Gợi ý 15 bài:

1. Linear Search
2. Binary Search iterative
3. Binary Search recursive
4. Reverse Array
5. Find Max
6. Find Min
7. Two Sum brute force
8. Two Sum hash map
9. Valid Parentheses
10. Implement Queue using Deque
11. Implement Stack using Deque
12. Merge Two Sorted Arrays
13. Remove Duplicates from Sorted Array
14. Move Zeroes
15. Is Palindrome String

Với mỗi bài, ghi:

```text
Time:
Space:
```

---

## 24. Checklist tự kiểm

Bạn nắm DSA I nếu trả lời được:

- Big-O là gì?
- Time complexity khác space complexity thế nào?
- Best/average/worst case là gì?
- Khi nào là `O(1)`, `O(n)`, `O(n^2)`, `O(log n)`?
- ArrayList khác LinkedList thế nào?
- Stack là LIFO hay FIFO?
- Queue là LIFO hay FIFO?
- Deque dùng được như stack/queue thế nào?
- Binary Search cần điều kiện gì?
- Vì sao binary search là `O(log n)`?
- Merge Sort, Quick Sort, Heap Sort khác nhau ở đâu?

---

## 25. Mẫu trả lời nhanh khi kiểm tra

### Big-O

> Big-O mô tả tốc độ tăng của chi phí thuật toán khi input lớn dần. Nó không đo thời gian cụ thể mà đo xu hướng tăng số bước.

### ArrayList vs LinkedList

> ArrayList truy cập index nhanh `O(1)` nhưng insert/delete giữa list tốn `O(n)`. LinkedList truy cập index `O(n)`, tốn thêm memory cho node/reference, và chỉ lợi hơn trong một số thao tác đầu/cuối hoặc khi đã có node reference.

### Stack

> Stack là LIFO, vào sau ra trước. Trong Java nên dùng `ArrayDeque` qua interface `Deque`.

### Queue

> Queue là FIFO, vào trước ra trước. Thường dùng `offer`, `poll`, `peek`.

### Binary Search

> Binary Search dùng trên dữ liệu đã sorted, mỗi bước loại bỏ một nửa không gian tìm kiếm, nên time là `O(log n)`.

### Merge Sort

> Merge Sort chia đôi array, sort từng nửa rồi merge lại. Time `O(n log n)`, space `O(n)`, worst-case tốt.

### Quick Sort

> Quick Sort chọn pivot rồi partition. Average `O(n log n)`, worst `O(n^2)`, thường nhanh trong thực tế.

### Heap Sort

> Heap Sort dùng heap để lấy phần tử lớn/nhỏ dần. Time `O(n log n)`, space `O(1)` nếu in-place, không stable.

