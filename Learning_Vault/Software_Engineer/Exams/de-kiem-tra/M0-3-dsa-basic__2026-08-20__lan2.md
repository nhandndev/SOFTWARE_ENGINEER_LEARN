# De kiem tra DAY_DU M0-3 - DSA I

**Topic:** `M0-3-dsa-basic`  
**Che do:** `DAY_DU`  
**Lan:** 2  
**Trong tam:** Big-O, Array/LinkedList, Stack/Queue/Deque, Binary Search, Sort  
**Tong diem tho:** 90 diem  
**Cach tinh diem:** `(diem dat duoc / 90) x 100`

## Huong dan

- Lam truc tiep vao cac dong `**Tra loi:**`.
- Voi cau code, viet Java code gan dung cu phap va neu Big-O.
- Khong mo file dap an truoc khi lam xong.

---

## Phan A - Ly thuyet (10 cau x 3 diem = 30 diem)

### Cau 1

Big-O la gi? Vi sao Big-O khong do thoi gian mili giay cu the ma do xu huong tang chi phi?

**Tra loi:** Big O là mức độ tăng của chi phí thuật toán khi tăng input n 


### Cau 2

Phan biet time complexity va space complexity. Cho moi loai mot vi du ngan.

**Tra loi:** time complexity là số bước , space complexity là dung lượng trong từng bước của thuật toán


### Cau 3

Phan biet best case, average case va worst case. Voi linear search, moi case co the la gi?

**Tra loi:**


### Cau 4

Neu mot doan code co mot vong lap `O(n)` sau do co hai vong lap long nhau `O(n^2)`, Big-O tong la gi? Vi sao?

**Tra loi:**


### Cau 5

So sanh ArrayList va LinkedList ve truy cap index, them/xoa giua list, va memory overhead.

**Tra loi:**


### Cau 6

Stack, Queue va Deque khac nhau the nao? Moi cau truc theo nguyen tac LIFO/FIFO/hai dau nhu the nao?

**Tra loi:**


### Cau 7

Trong Java, vi sao thuong nen dung `ArrayDeque`/`Deque` thay vi `Stack` cu khi can stack co ban?

**Tra loi:**


### Cau 8

Binary Search can dieu kien gi de dung? Vi sao time complexity la `O(log n)`?

**Tra loi:**


### Cau 9

So sanh Merge Sort, Quick Sort va Heap Sort ve average/worst time, space va stable hay khong.

**Tra loi:**


### Cau 10

Khi nao nen nghi den Merge Sort, khi nao Quick Sort, khi nao Heap Sort?

**Tra loi:**


---

## Phan B - Tinh huong (8 cau x 5 diem = 40 diem)

### Cau 11

Phan tich Big-O time va space cua code:

```java
int max = nums[0];
for (int i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
        max = nums[i];
    }
}
```

**Tra loi:**


### Cau 12

Phan tich Big-O time va space cua code:

```java
for (int i = 0; i < nums.length; i++) {
    for (int j = i + 1; j < nums.length; j++) {
        System.out.println(nums[i] + nums[j]);
    }
}
```

**Tra loi:**


### Cau 13

Ban can doc random theo index rat nhieu tren mot danh sach product. Nen uu tien ArrayList hay LinkedList? Giai thich.

**Tra loi:**


### Cau 14

Ban can kiem tra chuoi ngoac hop le, vi du `"()[]{}"` true, `"([)]"` false. Nen dung Stack/Queue/Deque nao va vi sao?

**Tra loi:**


### Cau 15

Ban can xu ly cac request theo dung thu tu den truoc xu ly truoc. Nen dung Stack hay Queue? Neu method Java hay dung la gi?

**Tra loi:**


### Cau 16

Ban co danh sach 1 trieu product da sort theo `id` va can tim product theo `id`. Nen dung linear search hay binary search? Neu danh sach chua sort thi sao?

**Tra loi:**


### Cau 17

Trong binary search, vi sao nen tinh:

```java
int mid = left + (right - left) / 2;
```

thay vi:

```java
int mid = (left + right) / 2;
```

**Tra loi:**


### Cau 18

Ban co danh sach order items can sort theo price. Neu can sort on dinh va chap nhan ton them bo nho, nen nghi den sort nao? Neu can it bo nho phu va worst-case `O(n log n)`, nen nghi den sort nao?

**Tra loi:**


---

## Phan C - Code mini (2 cau x 10 diem = 20 diem)

### Cau 19

Viet Java method `binarySearch(int[] nums, int target)` dang iterative:

- Tra ve index neu tim thay.
- Tra ve `-1` neu khong tim thay.
- Dung cach tinh `mid` tranh overflow.
- Neu Big-O time va space.

**Tra loi:**


### Cau 20

Viet Java method `isValidParentheses(String s)`:

- Tra ve true neu ngoac hop le.
- Ho tro `()`, `[]`, `{}`.
- Dung `Deque<Character>`/`ArrayDeque` nhu stack.
- Neu Big-O time va space.

**Tra loi:**

