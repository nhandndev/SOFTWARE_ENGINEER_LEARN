# Dap an - De kiem tra nhanh M0-3 - DSA I

**Topic:** `M0-3-dsa-basic`  
**Che do:** `NHANH`  
**Tong diem tho:** 43 diem  
**Normalize:** `(diem tho / 43) x 100`

---

## Phan A - Ly thuyet

### Cau 1 - 3 diem

- 1d: Big-O mo ta toc do tang chi phi thuat toan khi input lon dan.
- 1d: Time complexity = chi phi thoi gian/so buoc xu ly.
- 1d: Space complexity = bo nho phu can dung.

### Cau 2 - 3 diem

- 1d: Best case = truong hop tot nhat/it buoc nhat.
- 1d: Average case = truong hop trung binh.
- 1d: Worst case = truong hop xau nhat/nhieu buoc nhat; linear search best `O(1)`, average/worst `O(n)`.

### Cau 3 - 3 diem

- 1d: ArrayList truy cap index `O(1)`, LinkedList truy cap index `O(n)`.
- 1d: Them/xoa giua list deu thuong can `O(n)` vi ArrayList doi phan tu, LinkedList can tim node.
- 1d: LinkedList ton memory hon vi node/reference; ArrayList cache-friendly hon.

### Cau 4 - 3 diem

- 1d: Stack = LIFO, vao sau ra truoc.
- 1d: Queue = FIFO, vao truoc ra truoc.
- 1d: Deque = double-ended queue, them/xoa duoc ca hai dau, co the dung nhu stack/queue.

### Cau 5 - 3 diem

- 1d: Binary Search can du lieu da sorted.
- 1d: Moi buoc loai bo mot nua khong gian tim kiem.
- 1d: Time `O(log n)`, space iterative `O(1)` neu noi them duoc.

### Cau 6 - 3 diem

- 1d: Merge Sort: average/worst `O(n log n)`, space `O(n)`, stable neu implement dung.
- 1d: Quick Sort: average `O(n log n)`, worst `O(n^2)`, space avg `O(log n)`, thuong nhanh thuc te.
- 1d: Heap Sort: average/worst `O(n log n)`, space `O(1)` in-place, khong stable.

---

## Phan B - Tinh huong

### Cau 7 - 5 diem

- 1d: Vong lap dau `O(n)`.
- 1d: Vong lap long nhau `O(n^2)`.
- 1d: Tong `O(n + n^2)` rut gon thanh `O(n^2)`.
- 1d: Space `O(1)` neu khong tinh output console.
- 1d: Giai thich bo hang so/giu phan tang nhanh nhat.

### Cau 8 - 5 diem

- 2d: Chon Stack hoac Deque dung nhu stack.
- 1d: Ly do ngoac can LIFO: ngoac mo gan nhat phai dong truoc.
- 1d: Java nen dung `Deque<Character>`/`ArrayDeque`.
- 1d: Neu duoc y tuong push ngoac mo, pop khi gap ngoac dong, cuoi cung stack rong.

### Cau 9 - 5 diem

- 2d: Neu danh sach da sort, chon Binary Search.
- 1d: Binary Search `O(log n)` tot hon linear `O(n)` voi 1 trieu phan tu.
- 1d: Neu chua sort, binary search khong dung truc tiep.
- 1d: Neu chua sort: linear search `O(n)` hoac sort truoc roi binary search neu tim nhieu lan.

---

## Phan C - Code mini

### Cau 10 - 10 diem

Dap an tham khao:

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

Cham diem:

- 1d: Khoi tao `left = 0`, `right = nums.length - 1`.
- 1.5d: Dung loop `while (left <= right)`.
- 1.5d: Tinh mid tranh overflow: `left + (right - left) / 2`.
- 2d: Check found va return index.
- 2d: Update `left = mid + 1` / `right = mid - 1` dung.
- 1d: Return `-1` neu khong tim thay.
- 1d: Neu Big-O dung: time `O(log n)`, space `O(1)`.

