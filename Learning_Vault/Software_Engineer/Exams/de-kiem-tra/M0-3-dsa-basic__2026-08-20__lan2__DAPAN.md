# Dap an - De kiem tra DAY_DU M0-3 - DSA I

**Topic:** `M0-3-dsa-basic`  
**Che do:** `DAY_DU`  
**Tong diem tho:** 90 diem  
**Normalize:** `(diem tho / 90) x 100`

---

## Phan A - Ly thuyet

### Cau 1 - 3 diem

- 1d: Big-O mo ta toc do tang chi phi thuat toan khi input lon dan.
- 1d: Big-O khong phu thuoc may/chay bao nhieu ms cu the.
- 1d: Big-O tap trung xu huong tang so buoc/bo nho theo `n`.

### Cau 2 - 3 diem

- 1d: Time complexity = chi phi thoi gian/so buoc xu ly.
- 1d: Space complexity = bo nho phu can dung.
- 1d: Co vi du hop ly, vi du duyet array `O(n)` time `O(1)` space; copy array `O(n)` space.

### Cau 3 - 3 diem

- 1d: Best case = truong hop tot nhat/it buoc nhat.
- 1d: Average case = truong hop trung binh.
- 1d: Worst case = truong hop xau nhat/nhieu buoc nhat; linear search best `O(1)`, average/worst `O(n)`.

### Cau 4 - 3 diem

- 1d: Tong la `O(n + n^2)`.
- 1d: Rut gon thanh `O(n^2)`.
- 1d: Vi Big-O giu thanh phan tang nhanh nhat va bo hang so/thanh phan nho hon.

### Cau 5 - 3 diem

- 1d: ArrayList truy cap index `O(1)`, LinkedList `O(n)`.
- 1d: Them/xoa giua list thuong `O(n)` voi ca hai neu tinh ca buoc tim vi tri/doi phan tu.
- 1d: LinkedList ton memory hon do node/reference; ArrayList cache-friendly hon.

### Cau 6 - 3 diem

- 1d: Stack = LIFO.
- 1d: Queue = FIFO.
- 1d: Deque = double-ended queue, them/xoa hai dau, dung duoc nhu stack/queue.

### Cau 7 - 3 diem

- 1d: `Stack` la class cu/synchronized legacy.
- 1d: `ArrayDeque` thuong nhanh/gon hon cho stack/queue co ban.
- 1d: Dung qua interface `Deque`, voi `push/pop/peek` cho stack.

### Cau 8 - 3 diem

- 1d: Binary Search can du lieu sorted.
- 1d: Moi buoc loai bo mot nua khong gian tim kiem.
- 1d: Time `O(log n)`, iterative space `O(1)`.

### Cau 9 - 3 diem

- 1d: Merge Sort average/worst `O(n log n)`, space `O(n)`, stable neu implement dung.
- 1d: Quick Sort average `O(n log n)`, worst `O(n^2)`, space avg `O(log n)`, khong dam bao stable.
- 1d: Heap Sort average/worst `O(n log n)`, space `O(1)` in-place, khong stable.

### Cau 10 - 3 diem

- 1d: Merge Sort khi can stable/worst-case chac chan va chap nhan memory.
- 1d: Quick Sort khi sort in-memory, can nhanh thuc te, chap nhan worst-case xau neu pivot te.
- 1d: Heap Sort khi can worst-case `O(n log n)` va it bo nho phu.

---

## Phan B - Tinh huong

### Cau 11 - 5 diem

- 2d: Time `O(n)` vi duyet array mot lan.
- 1d: Space `O(1)` vi chi dung bien `max`.
- 1d: Best/average/worst deu `O(n)` neu van phai tim max trong array khong co thong tin phu.
- 1d: Giai thich ngan gon dung.

### Cau 12 - 5 diem

- 2d: Time `O(n^2)` du loop j chay tu i+1, tong cap van xap xi n(n-1)/2.
- 1d: Space `O(1)` neu khong tinh output console.
- 1d: Noi duoc bo hang so 1/2 trong Big-O.
- 1d: Giai thich day la duyet cac cap phan tu.

### Cau 13 - 5 diem

- 2d: Chon ArrayList.
- 2d: Vi truy cap random theo index la `O(1)`, LinkedList `O(n)`.
- 1d: Neu duoc: ArrayList cache-friendly/thuong nhanh hon trong thuc te.

### Cau 14 - 5 diem

- 2d: Chon Stack hoac Deque dung nhu stack.
- 1d: Ly do ngoac can LIFO: ngoac mo gan nhat phai dong truoc.
- 1d: Java nen dung `Deque<Character>`/`ArrayDeque`.
- 1d: Y tuong push ngoac mo, pop/check khi gap ngoac dong, cuoi cung stack rong.

### Cau 15 - 5 diem

- 2d: Chon Queue.
- 1d: Vi FIFO: den truoc xu ly truoc.
- 1d: Method them: `offer`.
- 1d: Method lay/xoa: `poll`; co the noi `peek` de xem dau queue.

### Cau 16 - 5 diem

- 2d: Da sort thi dung Binary Search.
- 1d: Binary Search `O(log n)` tot hon linear `O(n)` voi 1 trieu phan tu.
- 1d: Chua sort thi binary search khong dung truc tiep.
- 1d: Chua sort: linear `O(n)` neu tim it, hoac sort truoc roi binary search neu tim nhieu lan.

### Cau 17 - 5 diem

- 2d: `left + right` co the integer overflow khi left/right lon.
- 2d: `left + (right - left) / 2` tranh cong hai so lon truc tiep.
- 1d: Van cho mid nam giua left/right.

### Cau 18 - 5 diem

- 2d: Can stable + chap nhan memory: Merge Sort.
- 2d: Can it bo nho phu + worst-case `O(n log n)`: Heap Sort.
- 1d: Giai thich ngan: Merge ton `O(n)` memory, Heap in-place/`O(1)` space, khong stable.

---

## Phan C - Code mini

### Cau 19 - 10 diem

Dap an:

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

- 1d: Khoi tao `left/right` dung.
- 1.5d: `while (left <= right)`.
- 1.5d: Tinh mid tranh overflow.
- 2d: Check target va return index.
- 2d: Update `left/right` dung.
- 1d: Return `-1`.
- 1d: Big-O time `O(log n)`, space `O(1)`.

### Cau 20 - 10 diem

Dap an:

```java
public boolean isValidParentheses(String s) {
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

- 1.5d: Dung `Deque<Character>`/`ArrayDeque`.
- 1.5d: Push ngoac mo.
- 2d: Khi gap ngoac dong, check stack rong va pop.
- 2d: So khop tung cap `()`, `[]`, `{}`.
- 1d: Cuoi cung return `stack.isEmpty()`.
- 1d: Big-O time `O(n)`.
- 1d: Big-O space `O(n)`.

