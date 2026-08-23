# Đề kiểm tra: M0-4 DSA II - Graph, BFS/DFS, Shortest Path, Cycle

```text
topic = M0-4-dsa-tree-graph
che_do = NHANH
trong_tam = Graph adjacency list/matrix, BFS/DFS, shortest path unweighted, cycle detection
tao_dap_an = co
```

Tổng điểm thô: `43 điểm`

Quy đổi thang 100:

```text
Điểm = (điểm thô / 43) * 100
```

Hướng dẫn:

- Trả lời ngắn gọn, đúng ý.
- Với câu code, ưu tiên Java.
- Mọi bài graph phải ghi Big-O theo `V` và `E`.

---

## Phần 1: Lý thuyết - 6 câu x 3 điểm

### Câu 1. Graph là gì?

Giải thích `Vertex` và `Edge`. Nêu 2 ví dụ thực tế có thể biểu diễn bằng Graph.

**Trả lời:** Graph là đồ thị , giống như là một tập hợp các node ( Vertex) và chúng có thể liên kết thông qua các cạnh (edge) . Ví dụ là một mạng lưới mạng xã hội thì mỗi user là một node , mối quan hệ của các user thì là một edge , hoặc là đường đi từ A đến D , nó sẽ có là A B C D E F G H và từ A đến D có thể là a-b-c-d



---

### Câu 2. Adjacency matrix vs adjacency list

So sánh adjacency matrix và adjacency list theo 3 ý:

- Cách lưu.
- Space complexity.
- Khi nào nên dùng.

**Trả lời:** chung là nó là cách biểu diễn đồ thị graph , adjaency matrix là ma trận kề  , nó lưu bằng ma trận 2d và nó sẽ có dạng 0 và 1 , 0 là k nối , 1 là nối và space complexity là O(v mũ 2) và ưu điểm nó là có thể truy xuất nhanh node nào nối với node nào (O(1)) và nó dùng nếu như có nhiều V hơn là E vì ví dụ cho 10 triệu node đi , mà mỗi node có liên kết với 5 node à thì rất là phí space complexity , nên dùng khi mà truy xuất node nào nối node nào .
Adjaency List là danh sách kề , nó sẽ dùng map lưu dưới dạng đỉnh này có hàng xóm là đỉnh nào ví dụ như A : B C D ( dạng tựa tựa vậy), có tác dụng lưu những node hàng xóm và loại bỏ node không cần thiết , space complexity là O(V + E) và ưu điểm nó là nó truy xuất được hàng xóm nhanh ( O(degree n)) và nó dùng trong ma trận nó nhiều cạnh và ít node , nó dùng cho một ma trận nó ít node thì nên dùng adjacency list , nhiều thì nên xài adjaency matrix và list thì dùng đa số ở DFS/BFS


---

### Câu 3. Big-O trong Graph

Trong graph, `V` và `E` là gì? Vì sao DFS/BFS thường có Time `O(V + E)`?

**Trả lời:** V là vertex hay còn gọi là node/đỉnh, e là edge là cạnh . DFS và BFS thường có Time complexity vì nó phải xét node và cạnh 


---

### Câu 4. BFS và DFS khác nhau thế nào?

So sánh BFS và DFS theo:

- Dùng cấu trúc dữ liệu gì.
- Cách duyệt.
- Khi nào BFS phù hợp hơn DFS.

**Trả lời:** BFS và DFS là dùng cấu trức dữ liệu graph để mà duyệt và nó hay dùng theo kiểu adjaency list và nó chứa cả visited , cách duyệt thì là BFS sẽ duyệt thoe chiều ngang , có nghĩa là duyệt node gần trước và node xa ở sau dạng như là nó sẽ duyệt node mà chọn trước , sau đó sẽ xét hàng xóm của node đó và xét hàng xóm của hàng xóm của node đó và cứ thees mà xét, nó sẽ theo dạng queue thì gặp node nào truocwsx xong nó duyệt . DFS là duyệt theo chiều sâu , nó sẽ duyệt theo chiều sâu  , khi nào k còn thì nó sẽ backtracking ngược lại để xét mấy node kia . BFS phù hợp khi ta cần phải xét theo level, tìm node gần nhất , tìm đường đi ngắn nhất không có trọng số vì BFS làm theo kiểu lấp đầy từng level , một đồ thị có ít node. DFS phù hợp đối với lại tìm xâu một nhánh và nó phù hợp với tìm đường đi vì có stack call back và nó phù hợp với lại tìm cycle


---

### Câu 5. Vì sao Graph traversal cần `visited`?

Giải thích vì sao DFS/BFS trên graph cần `visited`. Nếu không có `visited` thì có thể lỗi gì?

**Trả lời:** cần phải có visited để lưu được node nào đã được liên kết , nếu k có visited thì có thể bị lỗi trong result có thể trùng node


---

### Câu 6. Shortest path bằng BFS

Khi nào BFS tìm được shortest path? Khi nào BFS không đủ?

**Trả lời:** BFS tìm được shortest path khi mà level nó quét được thôi , dựa vào khả năng lấp đầy của nó , còn k đủ khi nó k đủ ( tôi k biết làm cauan ày )


---

## Phần 2: Tình huống - 3 câu x 5 điểm

### Câu 7. Build adjacency list

Cho:

```text
n = 5
edges = [[0,1], [0,2], [1,3], [2,3], [3,4]]
```

Đây là undirected graph. Hãy viết adjacency list tương ứng.

**Trả lời:**  0 -> [1 ,2]
rồi ở dưới ghi format y xì vậy nhma tôi lười quá
            1 : 0 ,3
            2 : 0 ,3
            3 : 1 ,2 ,4
            4 : 3


---

### Câu 8. BFS/DFS result

Cho adjacency list:

```text
0 -> [1, 2]
1 -> [0, 3]
2 -> [0, 3]
3 -> [1, 2, 4]
4 -> [3]
```

Nếu bắt đầu từ `0`, hãy ghi một kết quả hợp lệ cho:

- BFS
- DFS recursive

Giả sử duyệt neighbor theo đúng thứ tự trong list.

**Trả lời:** BFS thì sẽ duyệt theo O 1 ,2 ,3 ,4 
DFS recursive thì sẽ là 0 1 3 4 2 


---

### Câu 9. Detect cycle

Cho undirected graph:

```text
0 -- 1
|    |
2 -- 3
```

Graph này có cycle không? Nếu có, hãy chỉ ra một vòng. Với DFS, điều kiện nào cho biết graph undirected có cycle?

**Trả lời:** có cycle , 0 1 3 2 0 , với DFS điều kiện để biết là có một chu trình đi từ số 0 ( ví dụ 1 số) và kết thúc phải ở số 0 sao cho mà parent của số 0 không phải là con của số 0 có nghĩa là chu trình 0 1 3 2 0 thì là số 0 là parent của số 1 , 1 là parent của 3 , 3 là parent của 2 và  gặp node visisted không có parent , ý là ban đầu 0 k có parent , chỉ khi 2 gặp 0 thì 0 có parent nhma 0 thì quay lại r


---

## Phần 3: Code mini - 1 câu x 10 điểm

### Câu 10. Code BFS shortest path

Viết Java method:

```java
int shortestPath(Map<Integer, List<Integer>> graph, int start, int target)
```

Yêu cầu:

- Dùng BFS.
- Trả về số cạnh ít nhất từ `start` đến `target`.
- Trả về `-1` nếu không có đường đi.
- Ghi Time và Space complexity.

**Trả lời:**


import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public int shortestPath(
        Map<Integer, List<Integer>> graph,
        int start,
        int target
) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new ArrayDeque<>();
    Map<Integer, Integer> distance = new HashMap<>();

    visited.add(start);
    queue.offer(start);
    distance.put(start, 0);

    while (!queue.isEmpty()) {
        int current = queue.poll();

        if (current == target) {
            return distance.get(current);
        }

        for (int neighbor : graph.getOrDefault(current, List.of())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                distance.put(neighbor, distance.get(current) + 1);
                queue.offer(neighbor);
            }
        }
    }

    return -1;
}