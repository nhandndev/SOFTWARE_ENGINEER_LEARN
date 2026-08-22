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

**Tra loi:** Arraylist truy cập index là O(1) còn LinkedList là O(n) , thêm và xóa giữa list thì cả 2 đều là O(n) , và memmory Overhead là vì linkedlist còn lưu cả địa chỉ node tiếp theo nữa nên là memmory của linkedlist lớn hơn so với arraylist


### Cau 4

Stack, Queue va Deque khac nhau the nao? Moi cau truc theo nguyen tac LIFO/FIFO hay hai dau?

**Tra loi:** Stack Là last in first out , ví dụ giống như cây đồ thì ta để đồ vô từ phải sang trái thì nó là pop từ trái sang phỉa , Queue là First in first out , giống như là một hàng dài mua đồ thì người nào tới trước được xử lý trước . Deque là  queue nhưng mà cả 2 đầu trước và sau , có thể dugnf như stack và queue


### Cau 5

Binary Search can dieu kien gi de dung? Vi sao time complexity la `O(log n)`?

**Tra loi:** Binaray Search cần điều kiện là mảng phải được sort . Binary search là ta sẽ mỗi bước sẽ bỏ 1 nữa để chọn 1 nữa chứa số cần tìm ( hoặc vị trí mà nó sẽ phải ở ) 


### Cau 6

So sanh Merge Sort, Quick Sort va Heap Sort ve average/worst time, space, va khi nao nen dung.

**Tra loi:**  Merge Sort: average/worst `O(n log n)`, space `O(n)`, stable neu implement dung.
 Quick Sort: average `O(n log n)`, worst `O(n^2)`, space avg `O(log n)`, thuong nhanh thuc te.
 Heap Sort: average/worst `O(n log n)`, space `O(1)` in-place, khong stable.


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

**Tra loi:** big O của cái này là O(n mũ 2) , dòng code for đầu tiên thì là O(n) , cái thứ 2 là 2 vòng lập for nên là O(n mũ 2) , ta có O(n) + O(n mũ 2) = O(n mũ 2) , space của code là O(1);


### Cau 8

Ban can kiem tra chuoi ngoac hop le, vi du `"()[]{}"` la true, `"([)]"` la false. Nen dung Stack/Queue/Deque nao va vi sao?

**Tra loi:** nên dùng stack vì cơ chế last in first out , bây giờ ta sẽ như này ban đầu là ( thì add vô stack , sau đó nó cần phải có ( hoặc [ hoặc { ( 3 cái này là add ) hoặc là )( cái này thì pop) thì do bài toán này tôi từng làm rồi nên biết


### Cau 9

Ban co danh sach 1 trieu product da sort theo `id` va can tim product theo `id`. Nen dung linear search hay binary search? Neu danh sach chua sort thi sao?

**Tra loi:** danh sách đã được sort rồi thì nên binary search , độ phức tạp của nó sẽ là O(log n) còn nếu ta dùng linear search thì sẽ là O(n) với n = 1 triệu . nếu danh sách chưa được sort thì ta nên linear search hoặc là ta sẽ sort rồi binaray search


---

## Phan C - Code mini (1 cau x 10 diem = 10 diem)

### Cau 10

Viet Java method `binarySearch(int[] nums, int target)` dang iterative:

- Tra ve index neu tim thay.
- Tra ve `-1` neu khong tim thay.
- Dung cach tinh `mid` tranh overflow.
- Neu Big-O time va space.

**Tra loi:**
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

