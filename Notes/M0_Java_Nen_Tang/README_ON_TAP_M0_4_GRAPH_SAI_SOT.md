# README ôn tập M0-4: Graph - các lỗi còn thiếu

Nguồn chấm:

```text
Exams/de-kiem-tra/M0-4-dsa-tree-graph__2026-08-23__lan2.md
```

Kết quả:

```text
32.5 / 43 = 76 / 100 -> Cần ôn
```

Bài này không học lại toàn bộ Graph. Chỉ tập trung vào 4 lỗi đang làm mất điểm:

- Khi nào BFS tìm được shortest path.
- Trace đúng DFS recursive theo thứ tự neighbor.
- Detect cycle trong undirected graph bằng `visited` và `parent`.
- Ghi Big-O cho code graph.

---

## 1. Shortest path bằng BFS

### Bạn đang thiếu gì?

Bạn trả lời được ý BFS đi theo level, nhưng thiếu điều kiện quan trọng:

```text
BFS chỉ tìm shortest path đúng trong unweighted graph.
```

Unweighted graph nghĩa là:

```text
Mỗi cạnh có cost như nhau.
```

Khi đó shortest path là:

```text
Đường có số cạnh ít nhất.
```

---

## 2. Vì sao BFS đúng trong unweighted graph?

BFS duyệt theo từng level.

Ví dụ:

```text
0 -- 1 -- 3
|         |
2 --------
```

BFS từ `0`:

```text
Level 0: 0
Level 1: 1, 2
Level 2: 3
```

Khi BFS gặp `3` ở level 2, nghĩa là:

```text
0 đến 3 mất ít nhất 2 cạnh.
```

Câu nhớ:

```text
BFS gặp target lần đầu ở level nào thì đó là số cạnh ít nhất.
```

---

## 3. Khi nào BFS không đủ?

BFS thường không đủ trong weighted graph.

Weighted graph nghĩa là mỗi cạnh có cost khác nhau.

Ví dụ:

```text
A -> B cost 100
A -> C cost 1
C -> B cost 1
```

Nếu chỉ đếm số cạnh:

```text
A -> B
```

có 1 cạnh.

Nhưng nếu tính cost:

```text
A -> C -> B = 1 + 1 = 2
```

rẻ hơn `A -> B = 100`.

Câu trả lời chuẩn khi kiểm tra:

> BFS tìm shortest path đúng trong unweighted graph vì BFS duyệt theo level, tức số cạnh tăng dần. BFS không đủ với weighted graph vì mỗi cạnh có cost khác nhau, lúc đó cần thuật toán khác như Dijkstra.

---

## 4. Code shortest path cần ghi Big-O

Code của bạn đúng, nhưng thiếu Big-O.

Mẫu đầy đủ:

```java
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

Vì:

- Mỗi vertex vào queue tối đa 1 lần.
- Mỗi edge được scan khi duyệt neighbor.
- `visited`, `queue`, `distance` tối đa lưu `V` node.

---

## 5. Trace DFS recursive

### Bạn đang thiếu gì?

Ở câu DFS recursive, bạn viết:

```text
0, 1, 3, 4, 2
```

Nhưng với adjacency list:

```text
0 -> [1, 2]
1 -> [0, 3]
2 -> [0, 3]
3 -> [1, 2, 4]
4 -> [3]
```

và yêu cầu:

```text
Duyệt neighbor theo đúng thứ tự trong list.
```

DFS recursive đúng là:

```text
0, 1, 3, 2, 4
```

---

## 6. Trace từng bước DFS recursive

Code DFS:

```java
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

Trace từ `0`:

```text
Start 0
result = [0]

0 có neighbor [1, 2]
đi 1 trước
result = [0, 1]

1 có neighbor [0, 3]
0 visited -> bỏ qua
đi 3
result = [0, 1, 3]

3 có neighbor [1, 2, 4]
1 visited -> bỏ qua
đi 2
result = [0, 1, 3, 2]

2 có neighbor [0, 3]
0 visited -> bỏ qua
3 visited -> bỏ qua
quay lại 3

3 tiếp tục neighbor 4
result = [0, 1, 3, 2, 4]
```

Kết quả:

```text
0, 1, 3, 2, 4
```

Câu nhớ:

```text
DFS recursive đi hết neighbor đầu tiên thật sâu trước, rồi mới quay lại neighbor tiếp theo.
```

---

## 7. Cycle detection trong undirected graph

### Bạn đang thiếu gì?

Bạn biết graph có cycle và chỉ ra vòng đúng:

```text
0 -> 1 -> 3 -> 2 -> 0
```

Nhưng phần điều kiện cần nói gọn và chuẩn hơn.

Câu chuẩn:

```text
Trong undirected graph, nếu DFS gặp neighbor đã visited
và neighbor đó không phải parent của current node,
thì graph có cycle.
```

Viết ngắn:

```text
visited neighbor != parent => cycle
```

---

## 8. Vì sao cần parent?

Trong undirected graph, cạnh đi 2 chiều.

Ví dụ đơn giản:

```text
0 -- 1
```

DFS từ `0` sang `1`:

```text
current = 1
neighbor = 0
```

`0` đã visited, nhưng `0` là parent của `1`.

Trường hợp này không phải cycle.

Vì vậy cần check:

```text
neighbor != parent
```

Nếu không có parent, cứ gặp node visited là bạn sẽ báo cycle sai.

---

## 9. Code cycle detection mẫu

```java
public boolean hasCycleUndirected(Map<Integer, List<Integer>> graph) {
    Set<Integer> visited = new HashSet<>();

    for (int node : graph.keySet()) {
        if (!visited.contains(node)) {
            if (hasCycle(graph, node, -1, visited)) {
                return true;
            }
        }
    }

    return false;
}

private boolean hasCycle(
        Map<Integer, List<Integer>> graph,
        int current,
        int parent,
        Set<Integer> visited
) {
    visited.add(current);

    for (int neighbor : graph.getOrDefault(current, List.of())) {
        if (!visited.contains(neighbor)) {
            if (hasCycle(graph, neighbor, current, visited)) {
                return true;
            }
        } else if (neighbor != parent) {
            return true;
        }
    }

    return false;
}
```

Big-O:

```text
Time: O(V + E)
Space: O(V)
```

---

## 10. Big-O graph phải ghi thế nào?

Trong graph, luôn nghĩ bằng:

```text
V = số vertex
E = số edge
```

Bảng cần thuộc:

| Bài | Time | Space |
|---|---:|---:|
| Build adjacency list | `O(V + E)` | `O(V + E)` |
| DFS recursive | `O(V + E)` | `O(V)` |
| DFS iterative | `O(V + E)` | `O(V)` |
| BFS | `O(V + E)` | `O(V)` |
| Shortest path BFS unweighted | `O(V + E)` | `O(V)` |
| Cycle detection undirected | `O(V + E)` | `O(V)` |
| Adjacency matrix | check edge `O(1)` | `O(V^2)` |
| Adjacency list | duyệt neighbor `O(degree(u))` | `O(V + E)` |

Mẫu viết trong bài code:

```text
Time: O(V + E), vì mỗi vertex được visit tối đa một lần và mỗi edge được scan khi duyệt neighbor.
Space: O(V), vì visited/queue/stack/distance lưu tối đa V node.
```

---

## 11. Bài tập sửa lỗi

Làm lại 4 bài nhỏ này, không nhìn đáp án:

1. Viết 3 câu giải thích khi nào BFS tìm shortest path.
2. Trace DFS recursive cho graph:

```text
0 -> [1, 2]
1 -> [0, 3]
2 -> [0, 3]
3 -> [1, 2, 4]
4 -> [3]
```

3. Viết điều kiện detect cycle trong undirected graph bằng 1 dòng.
4. Viết Big-O cho `shortestPath`, `bfs`, `dfsRecursive`, `hasCycleUndirected`.

---

## 12. Checklist trước khi thi lại

- [ ] Nói được: BFS shortest path chỉ đúng trong unweighted graph.
- [ ] Nói được: weighted graph cần thuật toán khác như Dijkstra.
- [ ] Trace được DFS recursive theo đúng thứ tự neighbor.
- [ ] Nói được điều kiện cycle: `visited neighbor != parent`.
- [ ] Không quên ghi Big-O sau câu code.
- [ ] Ghi graph traversal là `O(V + E)`, không ghi mơ hồ `O(n)`.

---

## 13. Mẫu trả lời nhanh khi kiểm tra

### Shortest path BFS

> BFS tìm shortest path đúng trong unweighted graph vì BFS duyệt theo level, tức số cạnh tăng dần. Khi lần đầu gặp target, đó là đường có số cạnh ít nhất. Với weighted graph, BFS không đủ vì cạnh có cost khác nhau.

### DFS recursive

> DFS recursive đi sâu hết neighbor đầu tiên theo thứ tự trong adjacency list, bỏ qua node đã visited, rồi quay lại xử lý neighbor tiếp theo.

### Cycle detection

> Với undirected graph, DFS detect cycle bằng `visited` và `parent`. Nếu gặp neighbor đã visited mà neighbor không phải parent của current node, thì có cycle.

### Big-O graph

> BFS/DFS/shortest path/cycle detection trên adjacency list thường có Time `O(V + E)` và Space `O(V)`.

