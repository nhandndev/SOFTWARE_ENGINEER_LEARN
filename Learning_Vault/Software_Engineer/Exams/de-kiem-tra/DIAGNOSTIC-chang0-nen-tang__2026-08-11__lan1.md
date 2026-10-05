# Đề diagnostic — Kiến thức nền (Chặng 0, phạm vi rộng)

**Topic (diagnostic):** `DIAGNOSTIC-chang0-nen-tang`  
**Phạm vi:** lấy mẫu toàn Chặng 0 — `M0-1` · `M0-2` · `M0-3` · `M0-4` · `M0-5` (không phải đề thoát 1 module)  
**Chế độ:** `DAY_DU` · Tổng điểm thô tối đa: **90đ**  
**Ngày:** 2026-08-11 · Lần: 1  
**Hướng dẫn:** Trả lời ngay dưới mỗi câu tại dòng `**Trả lời:**`. Không tra tài liệu / IDE. Thời gian gợi ý: **100–130 phút**.  
**Cách dùng điểm:** normalize `Điểm = thô/90×100`. Dùng để **đánh giá chỗ mạnh/yếu nền** trước khi học sâu — **không** tick 🟢 một module trong `01` từ đề này.

**Bản đồ câu → nhóm kiến thức (để tự định vị sau khi chấm):**

| Nhóm | Câu |
|---|---|
| Java hiện đại (Generics/Lambda/Stream/Optional) | 1, 2, 11, 19 |
| OOP / SOLID / Pattern nhận diện | 3, 4, 12, 13 |
| DSA I (Big-O, list/stack/queue, search/sort) | 5, 6, 14, 15 |
| DSA II (Tree/Graph, BFS/DFS) | 7, 8, 16 |
| Git & Maven / quy trình repo | 9, 10, 17, 18, 20 |

---

## Phần I — Lý thuyết (10 câu × 3đ = 30đ)

**Câu 1. [M0-1]** `List<? extends Number>` cho phép gọi `add(Integer)` không? Vì sao? Khác gì `List<? super Integer>` về phía ghi/đọc?

**Trả lời:**

**Câu 2. [M0-1]** `Optional.get()` khi empty thì sao? Nêu 2 cách lấy giá trị an toàn hơn và 1 anti-pattern hay gặp với Optional.

**Trả lời:**

**Câu 3. [M0-2]** Phát biểu ngắn 5 nguyên lý SOLID (mỗi nguyên lý ≤ 1 câu). Chỉ cần đúng ý, không cần thuộc tên dài.

**Trả lời:**

**Câu 4. [M0-2]** Phân biệt nhanh: Factory vs Builder vs Singleton — mỗi cái giải quyết vấn đề tạo object thế nào? Nêu 1 rủi ro khi lạm dụng Singleton.

**Trả lời:**

**Câu 5. [M0-3]** Big-O của: (a) binary search trên mảng đã sort, (b) tìm phần tử trong `HashMap` trung bình, (c) worst-case quicksort. Nêu thêm space của mergesort.

**Trả lời:**

**Câu 6. [M0-3]** So sánh `ArrayList` vs `LinkedList` về: random access, insert đầu list, và khi nào chọn cái nào trong thực tế Java hiện đại.

**Trả lời:**

**Câu 7. [M0-4]** BFS và DFS khác nhau ở cấu trúc dữ liệu dùng để duyệt và ở “thứ tự khám phá”. Ứng dụng điển hình của BFS trên đồ thị không trọng số?

**Trả lời:**

**Câu 8. [M0-4]** Biểu diễn đồ thị bằng adjacency list vs matrix: độ phức tạp không gian và khi nào matrix bất lợi?

**Trả lời:**

**Câu 9. [M0-5]** `git merge` vs `git rebase` — khác gì về lịch sử commit? Khi nào **không** nên rebase?

**Trả lời:**

**Câu 10. [M0-5]** Liệt kê đúng thứ tự các phase chính của Maven lifecycle từ compile đến install. File `pom.xml` dùng để làm gì với dependency?

**Trả lời:**

---

## Phần II — Tình huống (8 câu × 5đ = 40đ)

**Câu 11. [M0-1]** Trong shopcore bạn cần `Result<T>` báo thành công/thất bại không dùng exception cho luồng nghiệp vụ thường. Phác thảo API tối thiểu (method/factory) và giải thích vì sao dùng Generic thay vì `Object`.

**Trả lời:**

**Câu 12. [M0-2]** Class `OrderService` vừa: lưu DB, gửi email, tính giảm giá, và in PDF hóa đơn (toàn bộ trong 1 class 800 dòng). Vi phạm SOLID nào rõ nhất? Đề xuất tách tối thiểu 3 trách nhiệm.

**Trả lời:**

**Câu 13. [M0-2]** Cần tạo `Product` với nhiều field optional (sku, description, tags…). Team đang dùng constructor 12 tham số. Bạn chọn pattern nào và vì sao? Nêu 1 dấu hiệu over-engineering nếu áp sai.

**Trả lời:**

**Câu 14. [M0-3]** API tìm product theo tên exact trong list 50k phần tử **đã sort theo tên**. Đồng nghiệp viết vòng `for` tuyến tính. Bạn đề xuất gì về thuật toán và Big-O kỳ vọng? Rủi ro nếu list **chưa** sort?

**Trả lời:**

**Câu 15. [M0-3]** Cần “undo” thao tác thêm item vào giỏ trong session (LIFO). Chọn cấu trúc nào (`Stack`/`Deque`/`Queue`)? Viết pseudo thao tác push/pop và nêu Big-O.

**Trả lời:**

**Câu 16. [M0-4]** Category tạo cây thư mục (parent–child). Cần in toàn bộ category theo tầng (level-order). Chọn BFS hay DFS? Phác thảo ý tưởng (không cần code đầy đủ).

**Trả lời:**

**Câu 17. [M0-5]** Hai người cùng sửa `pom.xml` và `Product.java` trên 2 branch. Khi mở PR, Git báo conflict. Nêu các bước resolve an toàn (local) trước khi merge vào `main`, và 1 điều tuyệt đối không làm trên `main` shared.

**Trả lời:**

**Câu 18. [M0-5]** Repo `shopcore` mới: cần `.gitignore` tối thiểu cho Java/Maven/IDE và README skeleton. Liệt kê ≥ 5 mục nên ignore và 3 mục README skeleton phải có trước khi code feature.

**Trả lời:**

---

## Phần III — Code mini (2 câu × 10đ = 20đ)

**Câu 19. [M0-1]** Viết method Java:

```text
static Map<String, Long> countByFirstLetter(List<String> words)
```

Yêu cầu: dùng **Stream** (không vòng for thủ công là chính); bỏ `null` và chuỗi rỗng; key là chữ cái đầu **uppercase**; value là số lần. Nếu word không có chữ cái (ví dụ `"  "`) thì bỏ.

**Trả lời:**

**Câu 20. [M0-5 + DSA nhẹ]** Viết class/method (Java) trong tinh thần package `algo` của shopcore:

```text
boolean isValidBracketSequence(String s)
```

Chỉ xét `()[]{}`. Trả `true` nếu ngoặc đúng cặp/đúng thứ tự. Dùng Stack/`Deque`. Kèm 3 test case (input → expected) viết bằng lời hoặc JUnit ngắn.

**Trả lời:**

---

## Sau khi làm xong

1. Tự chấm bằng file `…__DAPAN.md` **hoặc** gửi AI: *“Chấm bài”* + đường dẫn file đề này (`03_PROMPT_CHAM_DE.md`).
2. Ghi nhóm yếu (bảng bản đồ câu) vào nhật ký `05_TIEN_DO.md` (LOG_PROGRESS) — đề diagnostic **không** đổi state 🟢 module.
3. Nếu tổng < 55: ưu tiên học kỹ `M0-1`→`M0-5` đúng lộ trình, đừng nhảy Spring.
4. Nếu 55–84: bắt đầu `M0-1` nhưng ôn trước các nhóm 🔴/🟡.
5. Nếu ≥ 85: vẫn bắt đầu từ `M0-1` theo lộ trình (đề này không thay đề thoát module), nhưng có thể đi nhanh hơn ở phần đã vững.
