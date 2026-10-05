# Đáp án full Chặng 0: Nền tảng Java - lần 1

Phạm vi: `M0-1` đến `M0-5`  
Tổng điểm thô: 120 điểm  
Normalize: `(điểm thô / 120) × 100`

---

# Phần A - Trắc nghiệm `(40đ)`

| Câu | Đáp án | Ý chính |
|---|---|---|
| 1 | B | Generic invariant để tránh ghi sai kiểu |
| 2 | A | Producer extends |
| 3 | B | Consumer super |
| 4 | B | Lambda dùng với functional interface |
| 5 | B | `map` biến đổi phần tử |
| 6 | B | `flatMap` làm phẳng stream lồng |
| 7 | B | `orElse` evaluate fallback eager hơn |
| 8 | B | Record hợp DTO/data carrier immutable |
| 9 | A | SRP: một lý do chính để thay đổi |
| 10 | B | OCP: mở rộng hạn chế sửa code cũ |
| 11 | A | Strategy cho thuật toán thay thế |
| 12 | A | Factory tạo/chọn object |
| 13 | A | ArrayList random access `O(1)` |
| 14 | A | Binary Search cần sorted |
| 15 | B | Queue FIFO |
| 16 | A | BFS shortest path unweighted |
| 17 | A | Undirected cycle cần parent |
| 18 | A | `git add` stage change |
| 19 | B | File đã track cần `git rm --cached` |
| 20 | A | package target, install local repo |

---

# Phần B - Tự luận `(60đ)`

## Câu 21 `(5đ)`

- PECS = Producer Extends, Consumer Super. `(2đ)`
- `? extends T` khi source chỉ đọc ra T/subtype. `(1.25đ)`
- `? super T` khi destination cần ghi T/subtype vào. `(1.25đ)`
- Nhắc hạn chế: extends khó add, super đọc ra thường chỉ an toàn là Object. `(0.5đ)`

## Câu 22 `(5đ)`

- Có ví dụ Stream hợp lý. `(1đ)`
- Có `filter` đúng vai trò lọc. `(1đ)`
- Có `map` đúng vai trò biến đổi. `(1đ)`
- Có `collect` đúng vai trò gom kết quả. `(1đ)`
- Giải thích flow rõ. `(1đ)`

## Câu 23 `(5đ)`

- Nói `get()` dễ `NoSuchElementException` nếu empty. `(1.5đ)`
- Dùng `map` để transform khi có value. `(1đ)`
- Dùng `orElse`/`orElseGet` cho fallback. `(1đ)`
- Dùng `orElseThrow` khi thiếu value là lỗi nghiệp vụ. `(1đ)`
- Nhắc không dùng Optional cho field/entity tùy tiện là điểm cộng trong giới hạn. `(0.5đ)`

## Câu 24 `(5đ)`

- Nhận ra SRP violation/class ôm nhiều trách nhiệm. `(1.5đ)`
- Tách validate. `(0.75đ)`
- Tách shipping fee/calculator strategy. `(0.75đ)`
- Tách repository/persistence. `(0.75đ)`
- Tách email/audit service. `(0.75đ)`
- Service chính orchestration vừa đủ. `(0.5đ)`

## Câu 25 `(5đ)`

- Strategy = thay đổi thuật toán/hành vi. `(1.5đ)`
- Factory = tạo/chọn object phù hợp. `(1.5đ)`
- Ví dụ Strategy shopcore đúng, như shipping/payment discount. `(1đ)`
- Ví dụ Factory shopcore đúng, như tạo payment/shipping strategy theo type. `(1đ)`

## Câu 26 `(5đ)`

- Builder hợp khi object nhiều field optional/constructor dài. `(1.5đ)`
- Hợp khi cần readable construction/validate khi build. `(1đ)`
- Over-engineering nếu object ít field, constructor/factory đủ rõ. `(1.5đ)`
- Nhắc Lombok `@Builder` được nhưng vẫn cần validation hợp lý. `(1đ)`

## Câu 27 `(5đ)`

- ArrayList get index `O(1)`, cache locality tốt. `(1.25đ)`
- LinkedList get index `O(n)`, node overhead lớn. `(1.25đ)`
- Thêm/xóa giữa list chỉ lợi nếu đã có node/iterator; tìm vị trí vẫn `O(n)`. `(1.25đ)`
- Use case thực tế thường ưu tiên ArrayList; Queue/Deque dùng ArrayDeque. `(1.25đ)`

## Câu 28 `(5đ)`

- Time `O(n)` vì duyệt từng phần tử. `(2đ)`
- Space `O(1)` nếu chỉ giữ biến max. `(1.5đ)`
- Best/average/worst đều `O(n)` nếu luôn cần chắc chắn max. `(1đ)`
- Giải thích theo input size n. `(0.5đ)`

## Câu 29 `(5đ)`

- Ý tưởng chia đôi search range bằng low/high/mid. `(1.5đ)`
- Điều kiện dừng khi `low > high` hoặc tìm thấy target. `(1đ)`
- Cập nhật trái/phải đúng theo compare. `(1đ)`
- `O(log n)` vì mỗi bước loại khoảng một nửa. `(1đ)`
- Cần sorted. `(0.5đ)`

## Câu 30 `(5đ)`

- BFS dùng queue. `(1đ)`
- DFS dùng stack hoặc recursion. `(1đ)`
- BFS duyệt theo tầng, hợp shortest path unweighted. `(1.25đ)`
- DFS đi sâu, hợp traversal/backtracking/cycle detect. `(1.25đ)`
- Có Big-O `O(V+E)` với graph adjacency list là điểm cộng trong giới hạn. `(0.5đ)`

## Câu 31 `(5đ)`

- `git switch main` + `git pull`. `(1đ)`
- Tạo branch feature. `(1đ)`
- Sửa code, status/diff, add/commit. `(1đ)`
- Push branch lên remote. `(1đ)`
- Mở PR, summary/test, review, merge. `(1đ)`

## Câu 32 `(5đ)`

- Dependency = thư viện code dùng/import. `(1.25đ)`
- Plugin = công cụ Maven build/test/package. `(1.25đ)`
- JUnit là dependency test. `(0.75đ)`
- Surefire là plugin chạy test. `(0.75đ)`
- Compiler plugin compile Java/chọn release. `(1đ)`

---

# Phần C - Code / pseudo-code `(80đ, quy đổi /4 = 20đ)`

## Câu 33 `(10đ)`

- Generic `Result<T>`. `(1.5đ)`
- Field success/message/data. `(2đ)`
- Constructor/private hợp lý. `(1đ)`
- `ok(data)` success true/data. `(2đ)`
- `fail(message)` success false/message/no data. `(2đ)`
- Type-safe/compile gần đúng. `(1.5đ)`

Mẫu:

```java
public final class Result<T> {
    private final boolean success;
    private final String message;
    private final T data;

    private Result(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static <T> Result<T> ok(T data) {
        return new Result<>(true, null, data);
    }

    public static <T> Result<T> fail(String message) {
        return new Result<>(false, message, null);
    }
}
```

## Câu 34 `(10đ)`

- Source dùng `? extends T`. `(3đ)`
- Destination dùng `? super T`. `(3đ)`
- Loop copy đúng. `(2đ)`
- Signature generic hợp lý. `(2đ)`

Mẫu:

```java
public static <T> void copy(List<? extends T> source, List<? super T> dest) {
    for (T item : source) {
        dest.add(item);
    }
}
```

## Câu 35 `(10đ)`

- `filter` còn hàng. `(2đ)`
- `map` sang name. `(2đ)`
- sort tăng dần. `(2đ)`
- collect thành list. `(2đ)`
- Code/pseudo-code rõ. `(2đ)`

Mẫu:

```java
List<String> names = products.stream()
    .filter(Product::inStock)
    .map(Product::name)
    .sorted()
    .toList();
```

## Câu 36 `(10đ)`

- Không dùng `.get()`. `(2đ)`
- Optional chain hợp lý. `(3đ)`
- Lấy email từ user. `(2đ)`
- Fallback đúng. `(2đ)`
- Null/empty email cân nhắc hợp lý. `(1đ)`

Mẫu:

```java
String emailOrUnknown(Optional<User> user) {
    return user
        .map(User::email)
        .filter(email -> !email.isBlank())
        .orElse("unknown@example.com");
}
```

## Câu 37 `(10đ)`

- Interface Strategy. `(2đ)`
- Ít nhất 2 implementation. `(2.5đ)`
- Service dùng strategy thay vì if/else cứng. `(2.5đ)`
- Ví dụ shopcore hợp lý. `(1.5đ)`
- Code rõ. `(1.5đ)`

## Câu 38 `(10đ)`

- low/high/mid đúng. `(2đ)`
- compare target đúng. `(2đ)`
- cập nhật biên đúng. `(2đ)`
- return index hoặc -1. `(2đ)`
- tránh overflow bằng `low + (high-low)/2`. `(1đ)`
- nêu cần sorted. `(1đ)`

## Câu 39 `(10đ)`

- Có queue. `(2đ)`
- Có visited. `(2đ)`
- Có distance hoặc parent. `(2đ)`
- Dừng khi gặp target. `(1.5đ)`
- Trả shortest path/distance hợp lý. `(1.5đ)`
- Big-O `O(V+E)` nếu nêu đúng. `(1đ)`

## Câu 40 `(10đ)`

- Thêm `target/` vào `.gitignore`. `(2đ)`
- Dùng `git rm -r --cached target`. `(3đ)`
- Giải thích giữ file local/gỡ tracking. `(1.5đ)`
- Add `.gitignore`/cleanup. `(1.5đ)`
- Commit message rõ. `(2đ)`

Mẫu:

```bash
echo "target/" >> .gitignore
git rm -r --cached target
git add .gitignore
git commit -m "chore: remove target from git tracking"
```

