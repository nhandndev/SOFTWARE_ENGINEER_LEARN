# Đáp án — DIAGNOSTIC Chặng 0 nền tảng

**Đề:** `de-kiem-tra/DIAGNOSTIC-chang0-nen-tang__2026-08-11__lan1.md`  
**Chế độ:** `DAY_DU` · Tổng thô tối đa: **90đ**  
**Normalize:** `Điểm = thô/90 × 100`

> Chấm theo ý đúng, không cần khớp từng chữ. Mỗi câu: đủ ý chính = gần max; thiếu ý quan trọng = trừ một phần.

---

## Phần I — Lý thuyết (3đ/câu)

| Câu | Đáp án ngắn | Điểm |
|---|---|---|
| 1 | `? extends Number` **không** add `Integer` an toàn (PECS — producer extends). Đọc ra được kiểu `Number` (hoặc unknown). `? super Integer` **cho phép ghi** `Integer` (consumer super); đọc chỉ chắc `Object`. | 3 |
| 2 | `get()` trên empty → `NoSuchElementException`. An toàn hơn: `orElse` / `orElseGet` / `orElseThrow` / `ifPresent` / `map`. Anti-pattern: `Optional` field/param, `optional.get()` không check, `Optional.of(null)`. | 3 |
| 3 | **S** một trách nhiệm · **O** mở mở rộng/đóng sửa · **L** subtype thay được base · **I** interface nhỏ, không buộc client phụ thuộc method thừa · **D** phụ thuộc abstraction, không phụ thuộc concrete. | 3 |
| 4 | **Factory:** tạo object theo type/logic, ẩn class cụ thể. **Builder:** xây object phức tạp từng bước, nhiều optional. **Singleton:** một instance toàn cục. Rủi ro Singleton: global state, khó test, ẩn dependency, thread-safety. | 3 |
| 5 | (a) O(log n) · (b) O(1) trung bình · (c) O(n²) worst · mergesort space O(n) (thường). | 3 |
| 6 | `ArrayList`: random access O(1), insert đầu O(n). `LinkedList`: access O(n), insert đầu O(1). Thực tế Java: hầu hết dùng `ArrayList`; `LinkedList` ít khi thắng nhờ cache/locality. | 3 |
| 7 | BFS: queue, khám phá theo tầng. DFS: stack/đệ quy, đi sâu một nhánh. BFS → shortest path (số cạnh) trên unweighted graph. | 3 |
| 8 | List: O(V+E) space; matrix: O(V²). Matrix bất lợi khi đồ thị thưa (sparse) — lãng phí bộ nhớ. | 3 |
| 9 | Merge: giữ nhánh, tạo merge commit, lịch sử không tuyến tính. Rebase: viết lại commit lên base mới, lịch sử thẳng. **Không rebase** commit đã push lên branch shared mà người khác đã pull. | 3 |
| 10 | … → `compile` → `test` → `package` → `install` (trước đó có `validate`/`compile` tùy nêu). `pom.xml` khai báo dependency (+ plugin/parent) để Maven tải và quản lý classpath/build. | 3 |

**Gợi ý trừ điểm Phần I:** mỗi ý then chốt sai/thiếu ≈ −1 trong câu 3đ.

---

## Phần II — Tình huống (5đ/câu)

| Câu | Đáp án ngắn | Điểm |
|---|---|---|
| 11 | API kiểu `Result.ok(T)` / `Result.fail(error)` + `isSuccess`/`get`/`map` (hoặc tương đương). Generic giữ type-safety, tránh cast `Object`, tái sử dụng cho mọi T. | 5 |
| 12 | Vi phạm **SRP** (và thường ISP/DIP). Tách ví dụ: persistence repo, `PricingService`, `NotificationService` / `InvoiceRenderer`. | 5 |
| 13 | Chọn **Builder**. Over-engineering: Builder cho object 2 field bắt buộc không optional / không biến thể. | 5 |
| 14 | Dùng **binary search** → O(log n) nếu đã sort. Chưa sort: binary search sai; phải sort O(n log n) rồi search, hoặc `HashMap` nếu exact lookup lặp lại. | 5 |
| 15 | `Deque` làm stack (`ArrayDeque`) hoặc `Stack` (cũ hơn). `push`/`addFirst` + `pop`/`removeFirst` — O(1). Không dùng Queue FIFO cho undo LIFO. | 5 |
| 16 | **BFS** (level-order). Queue: enqueue root; while queue: dequeue, visit, enqueue children. | 5 |
| 17 | `git fetch` → checkout branch → `merge`/`rebase` origin · mở file conflict · sửa · `add` · commit (hoặc tiếp tục rebase) · push · PR. Không force-push/`reset --hard` bừa trên `main` shared. | 5 |
| 18 | Ignore ví dụ: `target/`, `.idea/`, `*.iml`, `.classpath`, `.project`, `.vscode/` (tuỳ), `*.class`, `.DS_Store`, file secret `.env`. README: tên project `shopcore`, cách build (`mvn …`), mô tả ngắn / cấu trúc package. | 5 |

---

## Phần III — Code mini (10đ/câu)

### Câu 19 — gợi ý đáp án (10đ)

```java
static Map<String, Long> countByFirstLetter(List<String> words) {
    return words.stream()
        .filter(Objects::nonNull)
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .map(s -> s.substring(0, 1).toUpperCase())
        .filter(ch -> Character.isLetter(ch.charAt(0))) // optional chặt hơn
        .collect(Collectors.groupingBy(ch -> ch, Collectors.counting()));
}
```

| Tiêu chí | Điểm |
|---|---|
| Dùng Stream + collect/grouping | 4 |
| Filter null/rỗng hợp lý | 3 |
| Key uppercase chữ cái đầu đúng ý | 3 |

(Cho điểm một phần nếu logic đúng nhưng thiếu Stream / thiếu filter.)

### Câu 20 — gợi ý đáp án (10đ)

```java
boolean isValidBracketSequence(String s) {
    Deque<Character> st = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else if (c == ')' || c == ']' || c == '}') {
            if (st.isEmpty()) return false;
            char o = st.pop();
            if ((c == ')' && o != '(') || (c == ']' && o != '[') || (c == '}' && o != '{'))
                return false;
        }
    }
    return st.isEmpty();
}
```

Test case ví dụ: `"()[]{}" → true` · `"(]"` → false · `"([)]"` → false · `""` → true.

| Tiêu chí | Điểm |
|---|---|
| Dùng stack/Deque đúng | 4 |
| Xử lý lệch cặp / thừa đóng / thừa mở | 4 |
| Có ≥ 3 test case hợp lệ | 2 |

---

## Bảng điểm nhóm (điền khi chấm)

| Nhóm | Câu | Thô tối đa | Thô đạt | % | Tag |
|---|---|---|---|---|---|
| Java hiện đại | 1,2,11,19 | 3+3+5+10=21 | | | 🟢≥85% · 🟡55–84 · 🔴<55 |
| OOP / SOLID / Pattern | 3,4,12,13 | 3+3+5+5=16 | | | |
| DSA I | 5,6,14,15 | 3+3+5+5=16 | | | |
| DSA II | 7,8,16 | 3+3+5=11 | | | |
| Git & Maven | 9,10,17,18,20 | 3+3+5+5+10=26 | | | |
| **TỔNG** | | **90** | | **/100** | |

**Quyết định định hướng (không phải state module):**

| Điểm thang 100 | Gợi ý |
|---|---|
| ≥ 85 | Nền ổn — bắt đầu `M0-1` theo lộ trình, có thể rút buổi ôn phần đã 🟢 nhóm |
| 55–84 | Bắt đầu `M0-1` nhưng ưu tiên ôn nhóm 🟡/🔴 trước khi sang Spring (Chặng 1) |
| < 55 | Ở lại Chặng 0; bớt video, tăng code/test trong `shopcore` theo đúng module yếu |

Ngưỡng hệ thống (tham chiếu): ≥85 🟢 · 55–84 🟠 · <55 🔴 — áp cho **định hướng học**, không tick module trên `01` từ đề diagnostic này.
