# De kiem tra nhanh M0-3 - DSA I

**Topic:** `M0-3-dsa-basic`  
**Che do:** `NHANH`  
**Trong tam:** Big-O, Array/LinkedList, Stack/Queue/Deque, Binary Search, Sort  
**Tong diem tho:** 43 diem  
**Cach tinh diem:** `(diem dat duoc / 43) x 100`

## Huong dan

- Lam truc tiep vao cac dong `**Tra loi:**`.
- Voi cau code, viet Java code gan dung cu phap va neu Big-O.
- Khong mo file dap an truoc khi lam xong.

---

## Phan A - Ly thuyet (6 cau x 3 diem = 18 diem)

### Cau 1

Big-O la gi? Phan biet time complexity va space complexity.

**Tra loi:** Big o là tốc độ tăng trưởng của phép tính toán khi mà input size tăng . Time complexity là số bước làm ( thời gian độ phức tạp) , chi phí thời gian , space complexity là số dung lượng nó sẽ chiếm trong quá trình thực hiện phép tính toán


### Cau 2

Phan biet best case, average case va worst case. Voi linear search, moi case co the la gi?

**Tra loi:** best case là trường hợp có độ phức tạp nhỏ nhất , thuận tiện nhất với số bước thấp nhất, average case là trường hợp ở mức trung bình ở giữa best và worse, worst case là tường hợp tệ nhất, có số bước nhiều nhất . liner search thì best là O(1) và average là O(n) và worst là O(n)


### Cau 3

So sanh ArrayList va LinkedList ve truy cap index, them/xoa giua list, va memory overhead.

**Tra loi:**


### Cau 4

Stack, Queue va Deque khac nhau the nao? Moi cau truc theo nguyen tac LIFO/FIFO hay hai dau?

**Tra loi:**


### Cau 5

Binary Search can dieu kien gi de dung? Vi sao time complexity la `O(log n)`?

**Tra loi:**


### Cau 6

So sanh Merge Sort, Quick Sort va Heap Sort ve average/worst time, space, va khi nao nen dung.

**Tra loi:**


---

## Phan B - Tinh huong (3 cau x 5 diem = 15 diem)

### Cau 7

Phan tich Big-O time va space cua code sau:

```java
int sum = 0;
for (int i = 0; i < nums.length; i++) {
    sum += nums[i];
}

for (int i = 0; i < nums.length; i++) {
    for (int j = 0; j < nums.length; j++) {
        System.out.println(nums[i] + nums[j]);
    }
}
```

**Tra loi:**


### Cau 8

Ban can kiem tra chuoi ngoac hop le, vi du `"()[]{}"` la true, `"([)]"` la false. Nen dung Stack/Queue/Deque nao va vi sao?

**Tra loi:**


### Cau 9

Ban co danh sach 1 trieu product da sort theo `id` va can tim product theo `id`. Nen dung linear search hay binary search? Neu danh sach chua sort thi sao?

**Tra loi:**


---

## Phan C - Code mini (1 cau x 10 diem = 10 diem)

### Cau 10

Viet Java method `binarySearch(int[] nums, int target)` dang iterative:

- Tra ve index neu tim thay.
- Tra ve `-1` neu khong tim thay.
- Dung cach tinh `mid` tranh overflow.
- Neu Big-O time va space.

**Tra loi:**

