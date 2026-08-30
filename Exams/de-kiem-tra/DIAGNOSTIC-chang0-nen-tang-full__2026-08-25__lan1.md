# Đề kiểm tra full Chặng 0: Nền tảng Java - lần 1

Phạm vi: `M0-1` đến `M0-5`  
Chế độ: tổng hợp toàn Chặng 0, tư duy là chính  
Tổng điểm thô: 120 điểm  
Normalize: `(điểm thô / 120) × 100`

## Vì sao đề này có 40 câu?

Chặng 0 có 5 module lớn:

- Java hiện đại
- OOP/SOLID/Patterns
- DSA I
- DSA II Tree/Graph
- Git & Maven

Để quét thật sự, 20 câu là hơi ít. Đề này dùng:

- 20 câu trắc nghiệm tư duy: phủ rộng khái niệm.
- 12 câu tự luận: kiểm tra giải thích và lựa chọn thiết kế.
- 8 câu code/pseudo-code: kiểm tra khả năng biến hiểu biết thành cấu trúc.

## Hướng dẫn

- Trả lời ngay dưới dòng `**Trả lời:**`.
- Với code, có thể viết Java gần đúng hoặc pseudo-code rõ ràng.
- Không cần compile tuyệt đối, nhưng tư duy phải đúng.
- Không mở file đáp án khi đang làm.

---

# Phần A - Trắc nghiệm tư duy `(20 câu × 2đ = 40đ)`

## Câu 1. Vì sao `List<Integer>` không phải subtype của `List<Number>` trong Java Generics? `(2đ)`

A. Vì Java không hỗ trợ kế thừa  
B. Vì generic invariant để tránh thêm sai kiểu vào collection  
C. Vì Integer không kế thừa Number  
D. Vì List không phải interface

**Trả lời:**B


## Câu 2. Khi cần đọc dữ liệu từ `List<Integer>` như các `Number`, nên dùng kiểu nào? `(2đ)`

A. `List<? extends Number>`  
B. `List<? super Number>`  
C. `List<Object>`  
D. raw `List`

**Trả lời:** A vì nó sẽ đọc an toàn , extends Number thì sẽ là lấy những con của Number


## Câu 3. Khi cần ghi `Integer` vào một list generic an toàn, nên nghiêng về kiểu nào? `(2đ)`

A. `List<? extends Integer>`  
B. `List<? super Integer>`  
C. `List<? extends Number>`  
D. `List<?>`

**Trả lời:**


## Câu 4. Lambda trong Java chủ yếu dùng với gì? `(2đ)`

A. Abstract class có nhiều abstract method  
B. Functional interface có một abstract method  
C. Class thường  
D. Enum

**Trả lời:**


## Câu 5. Stream operation nào biến mỗi phần tử thành dạng khác? `(2đ)`

A. `filter`  
B. `map`  
C. `collect`  
D. `forEach`

**Trả lời:**


## Câu 6. Khi có `List<List<String>>`, muốn đưa về `List<String>`, dùng gì hợp lý nhất? `(2đ)`

A. `map`  
B. `flatMap`  
C. `reduce`  
D. `peek`

**Trả lời:**


## Câu 7. `orElse()` khác `orElseGet()` ở điểm quan trọng nào? `(2đ)`

A. `orElseGet()` luôn chạy trước  
B. `orElse()` có thể evaluate giá trị fallback dù Optional có value  
C. Hai cái giống hệt nhau  
D. `orElse()` chỉ dùng với Stream

**Trả lời:**


## Câu 8. Record trong Java phù hợp nhất cho trường hợp nào? `(2đ)`

A. Mutable entity phức tạp nhiều lifecycle  
B. Immutable data carrier/DTO đơn giản  
C. Singleton global state  
D. Thread thủ công

**Trả lời:**


## Câu 9. Nguyên tắc SRP nói gì? `(2đ)`

A. Một class nên có một lý do chính để thay đổi  
B. Một class nên kế thừa càng nhiều càng tốt  
C. Một method nên public hết  
D. Một class nên chứa tất cả logic

**Trả lời:**


## Câu 10. OCP khuyến khích điều gì? `(2đ)`

A. Mở rộng bằng cách sửa liên tục code cũ  
B. Mở rộng behavior mà hạn chế sửa code đã ổn định  
C. Không dùng interface  
D. Không viết test

**Trả lời:**


## Câu 11. Strategy pattern phù hợp khi nào? `(2đ)`

A. Có nhiều thuật toán có thể thay thế nhau runtime  
B. Cần tạo object phức tạp từng bước  
C. Cần đảm bảo chỉ có một instance  
D. Cần duyệt tree

**Trả lời:**


## Câu 12. Factory pattern tập trung vào điều gì? `(2đ)`

A. Chọn/tạo object phù hợp, che giấu logic khởi tạo  
B. Sắp xếp array  
C. Chạy transaction  
D. Xóa file Git

**Trả lời:**


## Câu 13. Truy cập phần tử theo index trong `ArrayList` thường là Big-O nào? `(2đ)`

A. `O(1)`  
B. `O(log n)`  
C. `O(n)`  
D. `O(n^2)`

**Trả lời:**


## Câu 14. Binary Search yêu cầu điều kiện quan trọng nào? `(2đ)`

A. Mảng/list phải đã sort theo tiêu chí tìm kiếm  
B. Mảng phải có số âm  
C. Mảng phải rỗng  
D. Không được có duplicate

**Trả lời:**


## Câu 15. Queue thường theo nguyên tắc nào? `(2đ)`

A. LIFO  
B. FIFO  
C. Random  
D. Hashing

**Trả lời:**


## Câu 16. BFS trên graph unweighted thường dùng để tìm gì? `(2đ)`

A. Shortest path theo số cạnh  
B. Minimum spanning tree nâng cao  
C. Sort nhanh hơn quicksort  
D. Compile Java

**Trả lời:**


## Câu 17. Cycle detection trong undirected graph bằng DFS thường cần nhớ gì? `(2đ)`

A. Parent node để tránh nhầm cạnh quay về cha là cycle  
B. Maven profile  
C. `orElseGet`  
D. `git stash`

**Trả lời:**


## Câu 18. `git add` làm gì? `(2đ)`

A. Đưa thay đổi vào staging area  
B. Push code lên GitHub  
C. Merge PR  
D. Xóa branch

**Trả lời:**


## Câu 19. `.gitignore` có tự gỡ file đã bị Git track không? `(2đ)`

A. Có, luôn tự gỡ  
B. Không, file đã track cần `git rm --cached`  
C. Có nếu restart IDE  
D. Chỉ khi dùng Maven

**Trả lời:**


## Câu 20. Maven `package` khác `install` thế nào? `(2đ)`

A. `package` tạo artifact trong `target/`, `install` đưa artifact vào local Maven repo  
B. Hai lệnh giống hệt nhau  
C. `install` chỉ format code  
D. `package` chỉ chạy Git

**Trả lời:**


---

# Phần B - Tự luận tư duy `(12 câu × 5đ = 60đ)`

## Câu 21. Giải thích PECS bằng lời của bạn. Khi nào dùng `? extends`, khi nào dùng `? super`? `(5đ)`

**Trả lời:**


## Câu 22. Viết một ví dụ thực tế dùng Stream gồm `filter`, `map`, `collect`. Giải thích từng bước đang làm gì. `(5đ)`

**Trả lời:**


## Câu 23. Vì sao không nên lạm dụng `Optional.get()`? Hãy mô tả cách xử lý tốt hơn bằng `map`, `orElse`, `orElseGet` hoặc `orElseThrow`. `(5đ)`

**Trả lời:**


## Câu 24. Một class `OrderService` vừa validate input, tính phí ship, lưu DB, gửi email, ghi log audit. Hãy chỉ ra vi phạm SOLID và đề xuất tách trách nhiệm. `(5đ)`

**Trả lời:**


## Câu 25. Strategy và Factory khác nhau ở đâu? Cho ví dụ trong shopcore. `(5đ)`

**Trả lời:**


## Câu 26. Khi nào dùng Builder hợp lý? Khi nào Builder là over-engineering? `(5đ)`

**Trả lời:**


## Câu 27. So sánh `ArrayList` và `LinkedList` theo truy cập index, thêm/xóa giữa danh sách, memory locality và use case thực tế. `(5đ)`

**Trả lời:**


## Câu 28. Phân tích Big-O time/space cho thuật toán duyệt một array để tìm max. `(5đ)`

**Trả lời:**


## Câu 29. Giải thích Binary Search iterative: ý tưởng, điều kiện dừng, vì sao là `O(log n)`. `(5đ)`

**Trả lời:**


## Câu 30. So sánh BFS và DFS: dùng data structure gì, khác nhau ở thứ tự duyệt, use case nào hay gặp? `(5đ)`

**Trả lời:**


## Câu 31. Mô tả workflow Git chuẩn để làm một feature mới từ `main` đến lúc mở Pull Request. `(5đ)`

**Trả lời:**


## Câu 32. Giải thích dependency và plugin trong Maven. Cho ví dụ JUnit/Surefire/Compiler plugin. `(5đ)`

**Trả lời:**


---

# Phần C - Code / pseudo-code `(8 câu × 10đ = 80đ)`

> Phần này được tính 20 điểm vào tổng bằng cách lấy `điểm phần C / 4`.  
> Tổng đề vẫn là 120 điểm: A 40 + B 60 + C quy đổi 20.

## Câu 33. Viết class generic `Result<T>` có:

- `success`
- `message`
- `data`
- static factory `ok(data)`
- static factory `fail(message)`

`(10đ)`

**Trả lời:**


## Câu 34. Viết method generic `copy` dùng PECS để copy phần tử từ source sang destination. `(10đ)`

Gợi ý signature nên thể hiện đọc từ source, ghi vào destination.

**Trả lời:**


## Câu 35. Dùng Stream xử lý `List<Product>`:

- lọc product còn hàng
- lấy tên product
- sort tên tăng dần
- collect thành `List<String>`

Bạn có thể tự định nghĩa `Product` tối giản hoặc viết pseudo-code.

`(10đ)`

**Trả lời:**


## Câu 36. Dùng Optional viết hàm lấy email user:

- input: `Optional<User>`
- nếu user có email thì trả email
- nếu không có user/email thì trả `"unknown@example.com"`
- tránh dùng `.get()`

`(10đ)`

**Trả lời:**


## Câu 37. Viết skeleton Strategy cho tính phí ship:

- interface `ShippingFeeStrategy`
- ít nhất 2 implementation
- service chọn hoặc nhận strategy để tính phí

`(10đ)`

**Trả lời:**


## Câu 38. Viết Binary Search iterative trả index nếu tìm thấy, không thấy trả `-1`. `(10đ)`

**Trả lời:**


## Câu 39. Viết pseudo-code BFS shortest path trên graph unweighted từ `start` đến `target`. Cần có `queue`, `visited`, `distance` hoặc `parent`. `(10đ)`

**Trả lời:**


## Câu 40. Viết các lệnh để xử lý tình huống đã lỡ commit `target/` vào Git:

- thêm rule ignore
- gỡ `target/` khỏi Git tracking nhưng giữ file local
- commit cleanup

`(10đ)`

**Trả lời:**

