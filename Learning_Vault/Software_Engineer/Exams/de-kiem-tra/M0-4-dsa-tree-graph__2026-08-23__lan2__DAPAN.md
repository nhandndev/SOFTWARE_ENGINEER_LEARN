# Đáp án: M0-4 DSA II - Graph, BFS/DFS, Shortest Path, Cycle

```text
topic = M0-4-dsa-tree-graph
che_do = NHANH
trong_tam = Graph adjacency list/matrix, BFS/DFS, shortest path unweighted, cycle detection
```

Tổng điểm thô: `43 điểm`

Quy đổi thang 100:

```text
Điểm = (điểm thô / 43) * 100
```

---

## Câu 1. Graph là gì? - 3 điểm

Đáp án cần có:

- Graph gồm vertex và edge.
- Vertex là đỉnh/node.
- Edge là cạnh/kết nối giữa các vertex.
- Ví dụ: mạng xã hội, đường đi thành phố, dependency package, network topology.

Thang điểm:

- 1 điểm: giải thích Graph đúng.
- 1 điểm: giải thích vertex/edge đúng.
- 1 điểm: nêu 2 ví dụ hợp lý.

---

## Câu 2. Adjacency matrix vs adjacency list - 3 điểm

Đáp án:

- Matrix: dùng ma trận `V x V`, `matrix[u][v]` cho biết có cạnh hay không, space `O(V^2)`, check edge `O(1)`.
- List: mỗi node lưu danh sách neighbor, space `O(V + E)`, phù hợp graph thưa và bài coding.
- Matrix hợp khi graph dày hoặc cần check edge liên tục; list thường dùng hơn trong traversal.

Thang điểm:

- 1 điểm: nêu đúng cách lưu.
- 1 điểm: nêu đúng space.
- 1 điểm: nêu đúng khi dùng.

---

## Câu 3. Big-O trong Graph - 3 điểm

Đáp án:

```text
V = số vertex / node / đỉnh
E = số edge / cạnh
```

DFS/BFS là `O(V + E)` vì mỗi vertex được visit tối đa một lần và các cạnh được duyệt qua khi scan neighbor.

Thang điểm:

- 1 điểm: giải thích đúng `V`.
- 1 điểm: giải thích đúng `E`.
- 1 điểm: giải thích đúng vì sao traversal là `O(V + E)`.

---

## Câu 4. BFS và DFS khác nhau thế nào? - 3 điểm

Đáp án:

- BFS dùng queue, đi theo tầng/gần trước.
- DFS dùng recursion hoặc stack, đi sâu trước.
- BFS phù hợp shortest path trong unweighted graph hoặc level-order.

Thang điểm:

- 1 điểm: cấu trúc dữ liệu đúng.
- 1 điểm: cách duyệt đúng.
- 1 điểm: nêu đúng use case BFS.

---

## Câu 5. Vì sao Graph traversal cần `visited`? - 3 điểm

Đáp án:

Graph có thể có cycle. Nếu không có `visited`, DFS/BFS có thể đi lại node cũ nhiều lần, thậm chí DFS recursive có thể chạy vô hạn hoặc stack overflow.

Thang điểm:

- 1 điểm: nêu graph có cycle.
- 1 điểm: nêu `visited` để tránh đi lại node cũ.
- 1 điểm: nêu lỗi có thể xảy ra.

---

## Câu 6. Shortest path bằng BFS - 3 điểm

Đáp án:

BFS tìm được shortest path theo số cạnh trong unweighted graph, vì BFS duyệt theo level. BFS không đủ với weighted graph vì mỗi cạnh có cost khác nhau; lúc đó cần thuật toán khác như Dijkstra.

Thang điểm:

- 1 điểm: nêu đúng unweighted graph.
- 1 điểm: giải thích theo level/số cạnh.
- 1 điểm: nêu đúng weighted graph không dùng BFS thường.

---

## Câu 7. Build adjacency list - 5 điểm

Đáp án:

```text
0 -> [1, 2]
1 -> [0, 3]
2 -> [0, 3]
3 -> [1, 2, 4]
4 -> [3]
```

Thang điểm:

- 4 điểm: các neighbor đúng.
- 1 điểm: hiểu undirected nên lưu hai chiều.

---

## Câu 8. BFS/DFS result - 5 điểm

Adjacency list:

```text
0 -> [1, 2]
1 -> [0, 3]
2 -> [0, 3]
3 -> [1, 2, 4]
4 -> [3]
```

Đáp án:

```text
BFS: 0, 1, 2, 3, 4
DFS recursive: 0, 1, 3, 2, 4
```

Thang điểm:

- 2.5 điểm: BFS đúng.
- 2.5 điểm: DFS recursive đúng theo thứ tự neighbor.

Ghi chú: Nếu học viên ghi DFS khác nhưng vẫn hợp lệ và có giải thích thứ tự neighbor khác, có thể cho điểm một phần.

---

## Câu 9. Detect cycle - 5 điểm

Graph:

```text
0 -- 1
|    |
2 -- 3
```

Đáp án:

Graph có cycle. Một vòng:

```text
0 -> 1 -> 3 -> 2 -> 0
```

Với undirected graph, khi DFS gặp một neighbor đã visited và neighbor đó không phải parent của current node, thì có cycle.

Thang điểm:

- 1 điểm: kết luận có cycle.
- 2 điểm: chỉ ra vòng đúng.
- 2 điểm: nêu đúng điều kiện `visited neighbor != parent`.

---

## Câu 10. Code BFS shortest path - 10 điểm

Đáp án mẫu:

```java
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
```

Big-O:

```text
Time: O(V + E)
Space: O(V)
```

Thang điểm:

- 2 điểm: dùng queue BFS đúng.
- 2 điểm: dùng visited đúng.
- 2 điểm: lưu/cập nhật distance đúng.
- 1 điểm: trả về khi gặp target.
- 1 điểm: trả `-1` nếu không có đường đi.
- 2 điểm: ghi đúng Big-O.

