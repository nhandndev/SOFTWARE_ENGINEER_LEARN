# README Buổi 2: Graph cơ bản, BFS/DFS và shortest path

Module: `M0-4 · DSA II`

Mục tiêu của buổi này:

- Hiểu Graph là gì.
- Biết biểu diễn Graph bằng adjacency matrix và adjacency list.
- Code được build graph bằng adjacency list.
- Code được DFS recursive và DFS iterative.
- Code được BFS bằng queue.
- Hiểu shortest path cơ bản bằng BFS trên unweighted graph.
- Ghi đúng Big-O theo `V` và `E`.

---

## 1. Graph là gì?

Graph là cấu trúc dữ liệu dùng để biểu diễn các mối quan hệ kết nối.

Graph gồm:

```text
Vertex = đỉnh / node
Edge = cạnh / kết nối
```

Ví dụ:

```text
0 -- 1
|    |
2 -- 3
```

Ở đây:

- Vertex: `0, 1, 2, 3`
- Edge: `0-1`, `0-2`, `1-3`, `2-3`

Graph dùng cho các bài toán như:

- User follow user.
- Bạn bè trong mạng xã hội.
- Đường đi giữa các thành phố.
- Dependency giữa package/module.
- Tìm đường ngắn nhất trong map không trọng số.

Câu nhớ nhanh:

```text
Tree là phân cấp cha-con.
Graph là mạng kết nối tổng quát.
```

Tree có thể xem là một dạng graph đặc biệt, nhưng graph có thể có cycle.

---

## 2. Các loại Graph cơ bản

| Loại | Ý nghĩa |
|---|---|
| Undirected graph | Cạnh 2 chiều |
| Directed graph | Cạnh có hướng |
| Unweighted graph | Cạnh không có trọng số |
| Weighted graph | Cạnh có trọng số |

Ví dụ undirected graph:

```text
0 -- 1
```

Nghĩa là:

```text
0 đi được tới 1
1 đi được tới 0
```

Ví dụ directed graph:

```text
0 -> 1
```

Nghĩa là:

```text
0 đi được tới 1
nhưng 1 chưa chắc đi được về 0
```

Trong buổi này, tập trung vào:

```text
undirected + unweighted graph
```

---

## 3. Ký hiệu Big-O trong Graph

Với graph, không nên chỉ nói `n`.

Nên dùng:

```text
V = số vertex / node / đỉnh
E = số edge / cạnh
```

Ví dụ:

```text
0 -- 1
|    |
2 -- 3
```

Graph này có:

```text
V = 4
E = 4
```

Câu nhớ nhanh:

```text
Traversal graph thường là O(V + E)
```

Vì thuật toán thường ghé qua mỗi vertex và duyệt qua các edge liên quan.

---

## 4. Adjacency Matrix

Adjacency matrix dùng ma trận `V x V`.

```text
matrix[u][v] = true nếu có cạnh từ u đến v
```

Ví dụ graph:

```text
0 -- 1
|
2
```

Code Java:

```java
boolean[][] graph = new boolean[3][3];

graph[0][1] = true;
graph[1][0] = true;

graph[0][2] = true;
graph[2][0] = true;
```

Matrix tương ứng:

```text
      0      1      2
0   false  true   true
1   true   false  false
2   true   false  false
```

Ưu điểm:

- Check có cạnh `u-v` rất nhanh: `O(1)`.

Nhược điểm:

- Tốn memory `O(V^2)`.
- Nếu graph ít cạnh, rất lãng phí.

Big-O:

| Operation | Time | Space |
|---|---:|---:|
| Check edge `u-v` | `O(1)` | — |
| Duyệt tất cả neighbor của `u` | `O(V)` | — |
| Lưu graph | — | `O(V^2)` |

---

## 5. Adjacency List

Adjacency list lưu mỗi node kèm danh sách neighbor.

Ví dụ graph:

```text
0 -- 1
|    |
2 -- 3
```

Adjacency list:

```text
0 -> [1, 2]
1 -> [0, 3]
2 -> [0, 3]
3 -> [1, 2]
```

Code Java:

```java
Map<Integer, List<Integer>> graph = new HashMap<>();

graph.put(0, List.of(1, 2));
graph.put(1, List.of(0, 3));
graph.put(2, List.of(0, 3));
graph.put(3, List.of(1, 2));
```

Ưu điểm:

- Tiết kiệm memory hơn matrix.
- Duyệt neighbor nhanh theo số cạnh thật.
- Thường dùng nhiều hơn trong bài coding.

Big-O:

| Operation | Time | Space |
|---|---:|---:|
| Duyệt neighbor của `u` | `O(degree(u))` | — |
| Lưu graph | — | `O(V + E)` |

Câu nhớ nhanh:

```text
Coding interview thường ưu tiên adjacency list.
```

---

## 6. Build undirected graph bằng adjacency list

Bài toán:

```text
n = 4
edges = [[0, 1], [0, 2], [1, 3], [2, 3]]
```

Muốn tạo:

```text
0 -> [1, 2]
1 -> [0, 3]
2 -> [0, 3]
3 -> [1, 2]
```

Code:

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public Map<Integer, List<Integer>> buildGraph(int n, int[][] edges) {
    Map<Integer, List<Integer>> graph = new HashMap<>();

    for (int i = 0; i < n; i++) {
        graph.put(i, new ArrayList<>());
    }

    for (int[] edge : edges) {
        int u = edge[0];
        int v = edge[1];

        graph.get(u).add(v);
        graph.get(v).add(u);
    }

    return graph;
}
```

Big-O:

```text
Time: O(V + E)
Space: O(V + E)
```

Vì:

- Tạo `V` list rỗng.
- Duyệt `E` cạnh.
- Với undirected graph, mỗi cạnh lưu 2 lần, nhưng Big-O vẫn là `O(E)`.

---

## 7. DFS là gì?

DFS = Depth First Search.

Nghĩa là:

```text
Đi sâu hết một nhánh trước, rồi mới quay lại nhánh khác.
```

DFS có thể dùng:

- Recursion.
- Stack.

Trên graph, DFS phải có `visited`.

Vì graph có thể có cycle:

```text
0 -- 1
|    |
2 -- 3
```

Nếu không có `visited`, code có thể đi vòng mãi:

```text
0 -> 1 -> 3 -> 2 -> 0 -> ...
```

---

## 8. DFS recursive

Code:

```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public List<Integer> dfsRecursive(Map<Integer, List<Integer>> graph, int start) {
    List<Integer> result = new ArrayList<>();
    Set<Integer> visited = new HashSet<>();

    dfs(graph, start, visited, result);

    return result;
}

private void dfs(
        Map<Integer, List<Integer>> graph,
        int current,
        Set<Integer> visited,
        List<Integer> result
) {
    if (visited.contains(current)) {
        return;
    }

    visited.add(current);
    result.add(current);

    for (int neighbor : graph.getOrDefault(current, List.of())) {
        dfs(graph, neighbor, visited, result);
    }
}
```

Với graph:

```text
0 -> [1, 2]
1 -> [0, 3]
2 -> [0, 3]
3 -> [1, 2]
```

Nếu start là `0`, một kết quả DFS có thể là:

```text
0, 1, 3, 2
```

Ghi chú:

```text
DFS result phụ thuộc vào thứ tự neighbor trong list.
```

Big-O:

```text
Time: O(V + E)
Space: O(V)
```

Space gồm:

- `visited`: `O(V)`
- recursion stack worst case: `O(V)`

---

## 9. DFS iterative bằng Stack

Trong Java hiện đại, dùng `Deque` làm stack.

Không ưu tiên `java.util.Stack` vì class cũ.

Code:

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public List<Integer> dfsIterative(Map<Integer, List<Integer>> graph, int start) {
    List<Integer> result = new ArrayList<>();
    Set<Integer> visited = new HashSet<>();
    Deque<Integer> stack = new ArrayDeque<>();

    stack.push(start);

    while (!stack.isEmpty()) {
        int current = stack.pop();

        if (visited.contains(current)) {
            continue;
        }

        visited.add(current);
        result.add(current);

        for (int neighbor : graph.getOrDefault(current, List.of())) {
            if (!visited.contains(neighbor)) {
                stack.push(neighbor);
            }
        }
    }

    return result;
}
```

Big-O:

```text
Time: O(V + E)
Space: O(V)
```

Lưu ý quan trọng:

```text
DFS recursive và DFS iterative có thể ra thứ tự khác nhau.
```

Vì stack là LIFO:

```text
Last In, First Out
```

Nếu đề yêu cầu đúng thứ tự giống recursive, cần push neighbor theo thứ tự ngược.

---

## 10. BFS là gì?

BFS = Breadth First Search.

Nghĩa là:

```text
Đi theo từng tầng, node gần trước, node xa sau.
```

BFS dùng queue.

Trong Java:

```java
Queue<Integer> queue = new ArrayDeque<>();
```

Với graph:

```text
0 -- 1
|    |
2 -- 3
```

BFS từ `0` có thể đi:

```text
0, 1, 2, 3
```

Vì `1` và `2` cách `0` một cạnh, được xử lý trước `3`.

---

## 11. BFS Graph

Code:

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
    List<Integer> result = new ArrayList<>();
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new ArrayDeque<>();

    visited.add(start);
    queue.offer(start);

    while (!queue.isEmpty()) {
        int current = queue.poll();
        result.add(current);

        for (int neighbor : graph.getOrDefault(current, List.of())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }

    return result;
}
```

Vì sao BFS thường `visited.add(neighbor)` ngay lúc offer vào queue?

```text
Để tránh cùng một node bị đưa vào queue nhiều lần.
```

Big-O:

```text
Time: O(V + E)
Space: O(V)
```

---

## 12. BFS vs DFS

| Tiêu chí | BFS | DFS |
|---|---|---|
| Dùng gì | Queue | Recursion hoặc Stack |
| Cách đi | Gần trước, theo từng tầng | Sâu trước |
| Shortest path unweighted | Phù hợp | Không đảm bảo |
| Cần visited trong graph | Có | Có |
| Big-O | `O(V + E)` | `O(V + E)` |

Câu nhớ nhanh:

```text
BFS dùng Queue.
DFS dùng Stack hoặc recursion.
Graph traversal phải có visited.
```

---

## 13. Shortest path trong unweighted graph

Bài toán:

```text
Cho graph không trọng số.
Tìm số cạnh ít nhất từ start đến target.
```

Ví dụ:

```text
0 -- 1 -- 3
|         |
2 --------
```

Từ `0` đến `3`:

- Đường 1: `0 -> 1 -> 3`, dài 2 cạnh.
- Đường 2: `0 -> 2 -> 3`, dài 2 cạnh.

Shortest path length là:

```text
2
```

Vì graph không trọng số, mỗi cạnh có cost như nhau.

Câu cực quan trọng:

```text
BFS tìm shortest path đúng trong unweighted graph.
```

---

## 14. Code shortest path bằng BFS

Code:

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

Ý nghĩa:

- `visited`: tránh đi lại node cũ.
- `queue`: xử lý node theo thứ tự gần trước.
- `distance`: lưu số cạnh từ `start` đến từng node.
- Trả `-1` nếu không có đường đi.

Big-O:

```text
Time: O(V + E)
Space: O(V)
```

---

## 15. Vì sao BFS tìm được shortest path?

BFS đi theo từng tầng.

Ví dụ từ node `0`:

```text
Level 0: 0
Level 1: các node cách 0 đúng 1 cạnh
Level 2: các node cách 0 đúng 2 cạnh
Level 3: các node cách 0 đúng 3 cạnh
```

Khi BFS lần đầu gặp `target`, đó là đường có số cạnh ít nhất.

Nhưng điều này chỉ đúng khi graph không trọng số.

Nếu graph có weight:

```text
A -> B cost 100
A -> C cost 1
C -> B cost 1
```

BFS chỉ đếm số cạnh, không hiểu cost. Với weighted graph, cần thuật toán khác như Dijkstra.

---

## 16. Một file code mẫu hoàn chỉnh

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public class GraphBasics {

    public Map<Integer, List<Integer>> buildGraph(int n, int[][] edges) {
        Map<Integer, List<Integer>> graph = new HashMap<>();

        for (int i = 0; i < n; i++) {
            graph.put(i, new ArrayList<>());
        }

        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];

            graph.get(u).add(v);
            graph.get(v).add(u);
        }

        return graph;
    }

    public List<Integer> dfsRecursive(Map<Integer, List<Integer>> graph, int start) {
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        dfs(graph, start, visited, result);
        return result;
    }

    private void dfs(
            Map<Integer, List<Integer>> graph,
            int current,
            Set<Integer> visited,
            List<Integer> result
    ) {
        if (visited.contains(current)) {
            return;
        }

        visited.add(current);
        result.add(current);

        for (int neighbor : graph.getOrDefault(current, List.of())) {
            dfs(graph, neighbor, visited, result);
        }
    }

    public List<Integer> dfsIterative(Map<Integer, List<Integer>> graph, int start) {
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Deque<Integer> stack = new ArrayDeque<>();

        stack.push(start);

        while (!stack.isEmpty()) {
            int current = stack.pop();

            if (visited.contains(current)) {
                continue;
            }

            visited.add(current);
            result.add(current);

            for (int neighbor : graph.getOrDefault(current, List.of())) {
                if (!visited.contains(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }

        return result;
    }

    public List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new ArrayDeque<>();

        visited.add(start);
        queue.offer(start);

        while (!queue.isEmpty()) {
            int current = queue.poll();
            result.add(current);

            for (int neighbor : graph.getOrDefault(current, List.of())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }

        return result;
    }

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
}
```

---

## 17. Big-O cần ghi trong README bài nộp

| Bài | Time | Space | Ghi chú |
|---|---:|---:|---|
| Adjacency matrix check edge | `O(1)` | `O(V^2)` | Matrix tốn memory |
| Adjacency matrix find neighbors | `O(V)` | `O(V^2)` | Phải scan cả row |
| Adjacency list build graph | `O(V + E)` | `O(V + E)` | Thường dùng khi coding |
| DFS recursive | `O(V + E)` | `O(V)` | `visited` + call stack |
| DFS iterative | `O(V + E)` | `O(V)` | `visited` + stack |
| BFS | `O(V + E)` | `O(V)` | `visited` + queue |
| Shortest path BFS unweighted | `O(V + E)` | `O(V)` | Chỉ đúng graph không trọng số |

---

## 18. Lỗi hay gặp

### Lỗi 1: Quên visited

Sai:

```java
for (int neighbor : graph.get(current)) {
    dfs(graph, neighbor);
}
```

Nếu graph có cycle, code có thể chạy vô hạn.

Đúng:

```java
if (!visited.contains(neighbor)) {
    dfs(graph, neighbor, visited, result);
}
```

### Lỗi 2: Nhầm Queue và Stack

BFS dùng queue:

```java
Queue<Integer> queue = new ArrayDeque<>();
```

DFS iterative dùng stack:

```java
Deque<Integer> stack = new ArrayDeque<>();
```

### Lỗi 3: Ghi Big-O graph là O(n)

Với graph, nên ghi:

```text
O(V + E)
```

Không nên ghi mơ hồ `O(n)` nếu đề đang nói rõ vertex và edge.

### Lỗi 4: Nghĩ BFS luôn tìm shortest path

BFS chỉ tìm shortest path đúng với:

```text
unweighted graph
```

Nếu graph có trọng số, BFS không đủ.

---

## 19. Bài tập tự luyện trong buổi này

Làm 5 bài này:

1. Build undirected graph bằng adjacency list.
2. DFS recursive.
3. DFS iterative.
4. BFS graph.
5. Shortest path in unweighted graph.

Mỗi bài tự ghi:

```text
Problem:
Approach:
Time:
Space:
```

Ví dụ:

```text
Problem: Graph BFS
Approach: Dùng Queue<ArrayDeque>, HashSet visited để tránh đi lại node cũ.
Time: O(V + E)
Space: O(V)
```

---

## 20. Checklist tự kiểm cuối buổi

- [ ] Giải thích được Graph là gì.
- [ ] Phân biệt được vertex và edge.
- [ ] Phân biệt được adjacency matrix và adjacency list.
- [ ] Biết vì sao adjacency matrix tốn `O(V^2)`.
- [ ] Biết vì sao adjacency list tốn `O(V + E)`.
- [ ] Code được build graph bằng adjacency list.
- [ ] Giải thích được vì sao graph traversal cần `visited`.
- [ ] Code được DFS recursive.
- [ ] Code được DFS iterative bằng `Deque`.
- [ ] Code được BFS bằng `Queue`.
- [ ] Giải thích được vì sao BFS tìm shortest path trong unweighted graph.
- [ ] Ghi được Big-O graph traversal là `O(V + E)`.

---

## 21. Mẫu trả lời nhanh khi kiểm tra

### Graph

> Graph gồm vertex và edge, dùng để biểu diễn dữ liệu có quan hệ kết nối. Khác Tree, graph có thể có cycle nên khi traversal cần `visited`.

### Adjacency matrix vs adjacency list

> Adjacency matrix dùng ma trận `V x V`, check edge `O(1)` nhưng tốn `O(V^2)` memory. Adjacency list lưu danh sách neighbor cho từng node, tốn `O(V + E)` memory và thường dùng nhiều hơn trong bài coding.

### DFS

> DFS đi sâu trước, có thể dùng recursion hoặc stack. Trên graph cần `visited` để tránh lặp vô hạn khi có cycle. Time `O(V + E)`, space `O(V)`.

### BFS

> BFS đi theo từng tầng, node gần trước node xa sau, dùng queue. Time `O(V + E)`, space `O(V)`.

### Shortest path

> Trên unweighted graph, BFS tìm shortest path theo số cạnh vì nó duyệt theo level. Khi lần đầu gặp target, đó là số cạnh ít nhất từ start đến target. Với weighted graph thì BFS không đủ.

