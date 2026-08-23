# Đề thi lại: M0-4 DSA II - Các lỗi còn sót

```text
topic = M0-4-dsa-tree-graph
che_do = THI_LAI
trong_tam = shortest path BFS, DFS recursive trace, cycle detection parent, Big-O graph
tao_dap_an = co
```

Tổng điểm thô: `36 điểm`

Quy đổi thang 100:

```text
Điểm = (điểm thô / 36) * 100
```

Hướng dẫn:

- Trả lời ngắn gọn, đúng trọng tâm.
- Không cần viết dài.
- Mọi câu code phải ghi Time và Space.

---

## Phần 1: Lý thuyết - 4 câu x 3 điểm

### Câu 1. BFS shortest path

BFS tìm được shortest path trong loại graph nào? Vì sao?

**Trả lời:** BFS tìm được trong loại graph không có trọng số vì mỗi cạnh có trọng số bằng nhau thì sẽ k có sự khác biệt từng level , BFS sẽ dựa vào level mà nó sẽ tìm ra được đường đi ngắn nhất dựa vào level , còn nếu có trọng số thì level nó chưa nói được gì , lúc đó cần djkstra


---

### Câu 2. Khi nào BFS không đủ?

Vì sao BFS thường không đủ với weighted graph? Nêu ví dụ ngắn hoặc giải thích bằng lời.

**Trả lời:** BFS thường k đủ với weighted graph thì khi có trọng số vô thì khả năng phân tầng nó chưa nói được đường đi ngắn nhất , ví dụ như là A đến B là 2 , B đến C là 3 , A đến C là 200 thì nếu không có trọng số thì ngắn nhất sẽ là A đến C nhưng mà có trọng số thì lại là A đến B đến C


---

### Câu 3. Cycle detection trong undirected graph

Viết điều kiện ngắn gọn để DFS phát hiện cycle trong undirected graph.

Gợi ý: dùng `visited` và `parent`.

**Trả lời:** khi mà node đó đã visited nhưng mà không phỉa là parent của current node


---

### Câu 4. Big-O graph

Với adjacency list, Big-O của BFS/DFS graph thường là gì? Giải thích ngắn gọn theo `V` và `E`.

**Trả lời:** Big-O của BFS/DFS thường là complexity time là O(V+E)  , space complexity là O(V)


---

## Phần 2: Tình huống - 4 câu x 5 điểm

### Câu 5. Trace BFS shortest path

Cho graph:

```text
0 -> [1, 2]
1 -> [0, 3]
2 -> [0, 4]
3 -> [1, 5]
4 -> [2, 5]
5 -> [3, 4]
```

Từ `0` đến `5`, shortest path có độ dài bao nhiêu cạnh? Chỉ ra một đường đi hợp lệ.

**Trả lời:** là 3 , 0-1-3-5 hoặc là 0-2-4-5 thì là 3 cạnh 


---

### Câu 6. Trace DFS recursive

Cho adjacency list:

```text
0 -> [1, 2]
1 -> [0, 3]
2 -> [0, 3]
3 -> [1, 2, 4]
4 -> [3]
```

DFS recursive bắt đầu từ `0`, duyệt neighbor theo đúng thứ tự trong list. Ghi kết quả traversal.

**Trả lời:** 0 1 3 2 4


---

### Câu 7. Cycle hay không?

Cho undirected graph:

```text
0 -- 1 -- 2 -- 3
```

Graph này có cycle không? Vì sao?

**Trả lời:** không có graph vì cơ bản là k có chu trình thôi , 0 1 2 3 cái dừng thì làm quái gì có chu trình , k có visted node mà không phỉa là parent curent node


---

### Câu 8. Cycle có parent

Cho undirected graph:

```text
0 -- 1
|    |
2 -- 3
```

Graph này có cycle không? Nếu có, chỉ ra cycle và nêu điều kiện DFS phát hiện cycle.

**Trả lời:** có cycle , 0 1 3 2 0 , vì từ 0 - 2 thì nó quay lại được 0 và visted note nhma k phải là parent của current node


---

## Phần 3: Code mini - 1 câu x 4 điểm

### Câu 9. Ghi Big-O cho code

Cho method:

```java
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

Hãy ghi Time và Space complexity, kèm giải thích 1-2 câu.

Time: O(V + E)
Space: O(V)

- Mỗi vertex được đưa vào queue và visited tối đa một lần.
- Khi duyệt adjacency list, tổng số neighbor được scan theo toàn graph là `O(E)`.
- `visited`, `queue`, `result` tối đa lưu `V` node.



