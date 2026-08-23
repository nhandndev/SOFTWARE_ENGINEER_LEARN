# Đáp án thi lại: M0-4 DSA II - Các lỗi còn sót

```text
topic = M0-4-dsa-tree-graph
che_do = THI_LAI
trong_tam = shortest path BFS, DFS recursive trace, cycle detection parent, Big-O graph
```

Tổng điểm thô: `36 điểm`

Quy đổi thang 100:

```text
Điểm = (điểm thô / 36) * 100
```

---

## Câu 1. BFS shortest path - 3 điểm

Đáp án:

> BFS tìm được shortest path trong unweighted graph, vì BFS duyệt theo level/số cạnh tăng dần. Khi lần đầu gặp target, đó là đường có số cạnh ít nhất.

Thang điểm:

- 1 điểm: nêu đúng unweighted graph.
- 1 điểm: giải thích BFS duyệt theo level.
- 1 điểm: nêu đúng lần đầu gặp target là ngắn nhất.

---

## Câu 2. Khi nào BFS không đủ? - 3 điểm

Đáp án:

> BFS thường không đủ với weighted graph vì mỗi cạnh có cost khác nhau. BFS chỉ đếm số cạnh, không tối ưu tổng cost. Weighted graph thường cần thuật toán khác như Dijkstra.

Ví dụ:

```text
A -> B cost 100
A -> C cost 1
C -> B cost 1
```

Đường ít cạnh nhất là `A -> B`, nhưng cost tốt hơn là `A -> C -> B`.

Thang điểm:

- 1 điểm: nêu đúng weighted graph.
- 1 điểm: giải thích cost khác số cạnh.
- 1 điểm: nêu ví dụ hoặc nhắc Dijkstra.

---

## Câu 3. Cycle detection trong undirected graph - 3 điểm

Đáp án:

```text
Nếu DFS gặp neighbor đã visited và neighbor != parent của current node
=> có cycle.
```

Thang điểm:

- 1 điểm: có `visited`.
- 1 điểm: có `parent`.
- 1 điểm: điều kiện `neighbor != parent`.

---

## Câu 4. Big-O graph - 3 điểm

Đáp án:

```text
Time: O(V + E)
Space: O(V)
```

Giải thích:

- Mỗi vertex được visit tối đa một lần.
- Các edge được scan khi duyệt adjacency list.
- `visited`, queue/stack/recursion stack lưu tối đa `V` node.

Thang điểm:

- 1 điểm: Time `O(V + E)`.
- 1 điểm: Space `O(V)`.
- 1 điểm: giải thích đúng theo vertex/edge.

---

## Câu 5. Trace BFS shortest path - 5 điểm

Graph:

```text
0 -> [1, 2]
1 -> [0, 3]
2 -> [0, 4]
3 -> [1, 5]
4 -> [2, 5]
5 -> [3, 4]
```

Đáp án:

Shortest path từ `0` đến `5` dài `3` cạnh.

Một đường hợp lệ:

```text
0 -> 1 -> 3 -> 5
```

Hoặc:

```text
0 -> 2 -> 4 -> 5
```

Thang điểm:

- 2 điểm: độ dài `3`.
- 2 điểm: đường đi hợp lệ.
- 1 điểm: hiểu đây là số cạnh, không phải số node.

---

## Câu 6. Trace DFS recursive - 5 điểm

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
0, 1, 3, 2, 4
```

Thang điểm:

- 2 điểm: bắt đầu đúng `0 -> 1 -> 3`.
- 2 điểm: đi `2` trước `4` khi đang ở node `3`.
- 1 điểm: kết quả đầy đủ, không lặp node visited.

---

## Câu 7. Cycle hay không? - 5 điểm

Graph:

```text
0 -- 1 -- 2 -- 3
```

Đáp án:

Graph không có cycle. Đây là một đường thẳng. DFS có thể gặp parent đã visited khi đi ngược lại, nhưng neighbor đó chính là parent nên không tính là cycle.

Thang điểm:

- 2 điểm: kết luận không có cycle.
- 2 điểm: giải thích là đường thẳng.
- 1 điểm: nhắc đúng parent visited không phải cycle.

---

## Câu 8. Cycle có parent - 5 điểm

Graph:

```text
0 -- 1
|    |
2 -- 3
```

Đáp án:

Graph có cycle.

Một cycle:

```text
0 -> 1 -> 3 -> 2 -> 0
```

Điều kiện DFS:

```text
visited neighbor != parent => cycle
```

Thang điểm:

- 1 điểm: kết luận có cycle.
- 2 điểm: chỉ ra cycle đúng.
- 2 điểm: nêu đúng điều kiện parent.

---

## Câu 9. Ghi Big-O cho code - 4 điểm

Đáp án:

```text
Time: O(V + E)
Space: O(V)
```

Giải thích:

- Mỗi vertex được đưa vào queue và visited tối đa một lần.
- Khi duyệt adjacency list, tổng số neighbor được scan theo toàn graph là `O(E)`.
- `visited`, `queue`, `result` tối đa lưu `V` node.

Thang điểm:

- 1.5 điểm: Time `O(V + E)`.
- 1 điểm: Space `O(V)`.
- 1.5 điểm: giải thích đúng.

