# Bài học: DSA II - Tree, Graph, BFS/DFS

Module: `M0-4 · DSA II`

Mục tiêu của bài này:

- Hiểu Binary Tree và BST.
- Biết biểu diễn Graph bằng adjacency list và adjacency matrix.
- Viết được BFS và DFS trên tree/graph.
- Hiểu shortest path cơ bản bằng BFS trên graph không trọng số.
- Detect cycle cơ bản trong graph.
- Chuẩn bị deliverable: thêm ít nhất 10 bài tree/graph có test, README ghi Big-O từng bài.

---

## 1. Module này học để làm gì?

Ở DSA I, bạn đã học:

- Big-O.
- Array/List.
- Stack/Queue/Deque.
- Binary Search.
- Sort.

DSA II dùng lại các món đó, nhất là `Deque`.

Ví dụ:

| Bài toán | Cấu trúc/thuật toán thường dùng |
|---|---|
| Duyệt cây thư mục | Tree + DFS |
| Duyệt level của comment/reply | Tree + BFS |
| Tìm đường ít bước nhất trong map không trọng số | Graph + BFS |
| Check một dependency graph có vòng lặp không | Graph + DFS + visited |
| Tìm một node trong BST | BST search |

Câu cần nhớ:

> Tree và Graph không khó vì code dài. Nó khó vì phải nhớ `visited`, nhớ dùng queue/stack đúng lúc, và luôn ghi Big-O theo `V` và `E`.

Trong graph:

```text
V = số vertex / node / đỉnh
E = số edge / cạnh
```

---

# Phần 1: Tree

## 2. Tree là gì?

Tree là cấu trúc dữ liệu phân cấp.

Ví dụ:

```text
        5
      /   \
     3     8
    / \     \
   2   4     10
```

Các khái niệm:

| Khái niệm | Ý nghĩa |
|---|---|
| Root | Node gốc |
| Parent | Node cha |
| Child | Node con |
| Leaf | Node không có con |
| Height | Chiều cao cây |
| Subtree | Cây con |

Tree thường dùng khi dữ liệu có quan hệ cha-con.

Ví dụ:

- Folder/file.
- Category/product category.
- Comment/reply.
- Organization chart.
- DOM tree.

---

## 3. Binary Tree

Binary Tree là tree mà mỗi node có tối đa 2 con:

```text
left
right
```

Java class cơ bản:

```java
class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;

    TreeNode(int value) {
        this.value = value;
    }
}
```

Ví dụ tạo cây:

```java
TreeNode root = new TreeNode(5);
root.left = new TreeNode(3);
root.right = new TreeNode(8);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(4);
root.right.right = new TreeNode(10);
```

---

## 4. Binary Search Tree - BST

BST = Binary Search Tree.

Quy tắc:

```text
left subtree < root < right subtree
```

Ví dụ đúng:

```text
        5
      /   \
     3     8
```

Vì:

```text
3 < 5 < 8
```

BST giúp search nhanh nếu cây cân bằng.

```java
public boolean search(TreeNode root, int target) {
    if (root == null) {
        return false;
    }

    if (root.value == target) {
        return true;
    }

    if (target < root.value) {
        return search(root.left, target);
    }

    return search(root.right, target);
}
```

Complexity:

```text
Average time: O(log n) nếu cây cân bằng
Worst time: O(n) nếu cây lệch
Space: O(h), h là chiều cao cây
```

Nếu BST bị lệch:

```text
1
 \
  2
   \
    3
     \
      4
```

Nó gần giống LinkedList, nên search có thể thành `O(n)`.

---

## 5. Insert vào BST

```java
public TreeNode insert(TreeNode root, int value) {
    if (root == null) {
        return new TreeNode(value);
    }

    if (value < root.value) {
        root.left = insert(root.left, value);
    } else if (value > root.value) {
        root.right = insert(root.right, value);
    }

    return root;
}
```

Ghi chú:

- Code trên bỏ qua duplicate.
- Nếu muốn cho duplicate, phải định nghĩa rule rõ: duplicate đi trái hay phải.

Complexity:

```text
Average time: O(log n)
Worst time: O(n)
Space: O(h)
```

---

# Phần 2: DFS trên Tree

## 6. DFS là gì?

DFS = Depth First Search.

Nghĩa là:

> Đi sâu hết một nhánh trước, rồi mới quay lại nhánh khác.

Trên tree có 3 kiểu DFS phổ biến:

| Kiểu | Thứ tự |
|---|---|
| Preorder | root -> left -> right |
| Inorder | left -> root -> right |
| Postorder | left -> right -> root |

Với cây:

```text
        5
      /   \
     3     8
```

Kết quả:

| Kiểu | Kết quả |
|---|---|
| Preorder | 5, 3, 8 |
| Inorder | 3, 5, 8 |
| Postorder | 3, 8, 5 |

---

## 7. Preorder Traversal

```java
public List<Integer> preorder(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    preorder(root, result);
    return result;
}

private void preorder(TreeNode node, List<Integer> result) {
    if (node == null) {
        return;
    }

    result.add(node.value);
    preorder(node.left, result);
    preorder(node.right, result);
}
```

Complexity:

```text
Time: O(n)
Space: O(h) nếu không tính output list
```

---

## 8. Inorder Traversal

```java
public List<Integer> inorder(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    inorder(root, result);
    return result;
}

private void inorder(TreeNode node, List<Integer> result) {
    if (node == null) {
        return;
    }

    inorder(node.left, result);
    result.add(node.value);
    inorder(node.right, result);
}
```

Câu cần nhớ:

> Inorder trên BST sẽ cho ra list tăng dần.

Complexity:

```text
Time: O(n)
Space: O(h) nếu không tính output list
```

---

## 9. Postorder Traversal

```java
public List<Integer> postorder(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    postorder(root, result);
    return result;
}

private void postorder(TreeNode node, List<Integer> result) {
    if (node == null) {
        return;
    }

    postorder(node.left, result);
    postorder(node.right, result);
    result.add(node.value);
}
```

Postorder thường dùng khi cần xử lý con trước cha.

Ví dụ:

- Delete tree.
- Tính size/depth từ dưới lên.
- Evaluate expression tree.

Complexity:

```text
Time: O(n)
Space: O(h)
```

---

## 10. Max Depth của Binary Tree

Độ sâu lớn nhất:

```java
public int maxDepth(TreeNode root) {
    if (root == null) {
        return 0;
    }

    int leftDepth = maxDepth(root.left);
    int rightDepth = maxDepth(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
}
```

Complexity:

```text
Time: O(n)
Space: O(h)
```

---

# Phần 3: BFS trên Tree

## 11. BFS là gì?

BFS = Breadth First Search.

Nghĩa là:

> Đi theo từng tầng trước, từ gần đến xa.

Ví dụ:

```text
        5
      /   \
     3     8
    / \     \
   2   4     10
```

BFS result:

```text
5, 3, 8, 2, 4, 10
```

BFS dùng Queue.

Trong Java:

```java
Queue<TreeNode> queue = new ArrayDeque<>();
```

---

## 12. Level Order Traversal

```java
public List<Integer> levelOrder(TreeNode root) {
    List<Integer> result = new ArrayList<>();

    if (root == null) {
        return result;
    }

    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        TreeNode current = queue.poll();
        result.add(current.value);

        if (current.left != null) {
            queue.offer(current.left);
        }

        if (current.right != null) {
            queue.offer(current.right);
        }
    }

    return result;
}
```

Complexity:

```text
Time: O(n)
Space: O(n)
```

Vì worst case queue có thể giữ nhiều node ở cùng một level.

---

# Phần 4: Graph

## 13. Graph là gì?

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

Graph dùng để biểu diễn dữ liệu có quan hệ kết nối.

Ví dụ:

- User follow user.
- Đường đi giữa các thành phố.
- Dependency giữa các package.
- Friend graph.
- Network topology.

Graph có nhiều loại:

| Loại | Ý nghĩa |
|---|---|
| Undirected graph | Cạnh 2 chiều |
| Directed graph | Cạnh có hướng |
| Weighted graph | Cạnh có trọng số |
| Unweighted graph | Cạnh không trọng số |

Module này tập trung vào graph cơ bản, không trọng số.

---

## 14. Adjacency Matrix

Adjacency matrix dùng ma trận `V x V`.

```text
matrix[u][v] = true nếu có cạnh từ u đến v
```

Ví dụ:

```java
boolean[][] graph = new boolean[4][4];

graph[0][1] = true;
graph[1][0] = true;

graph[0][2] = true;
graph[2][0] = true;
```

Ưu điểm:

- Check có cạnh `u-v` rất nhanh: `O(1)`.

Nhược điểm:

- Tốn memory `O(V^2)`.
- Nếu graph ít cạnh, rất lãng phí.

Complexity:

```text
Check edge: O(1)
Find all neighbors: O(V)
Space: O(V^2)
```

---

## 15. Adjacency List

Adjacency list lưu mỗi node với danh sách neighbor.

```java
Map<Integer, List<Integer>> graph = new HashMap<>();

graph.put(0, List.of(1, 2));
graph.put(1, List.of(0, 3));
graph.put(2, List.of(0, 3));
graph.put(3, List.of(1, 2));
```

Ưu điểm:

- Tiết kiệm memory hơn matrix.
- Duyệt neighbor nhanh theo số cạnh thực tế.
- Thường dùng nhiều hơn trong bài coding.

Complexity:

```text
Find all neighbors: O(degree(vertex))
Space: O(V + E)
```

Với undirected graph, mỗi cạnh thường được lưu 2 lần:

```text
u -> v
v -> u
```

Nhưng Big-O vẫn là `O(V + E)`.

---

## 16. Tạo undirected graph bằng adjacency list

```java
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

Complexity:

```text
Time: O(V + E)
Space: O(V + E)
```

---

# Phần 5: DFS trên Graph

## 17. DFS Graph recursive

Khác với tree, graph có thể có cycle.

Vì vậy, graph traversal gần như luôn cần `visited`.

```java
public List<Integer> dfs(Map<Integer, List<Integer>> graph, int start) {
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

Complexity:

```text
Time: O(V + E)
Space: O(V)
```

---

## 18. DFS Graph iterative

DFS cũng có thể dùng stack.

Trong Java hiện đại, dùng `Deque` làm stack:

```java
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

Complexity:

```text
Time: O(V + E)
Space: O(V)
```

Ghi chú:

- Thứ tự DFS iterative có thể khác recursive.
- Nếu bài test yêu cầu thứ tự cụ thể, cần push neighbor theo thứ tự ngược.

---

# Phần 6: BFS trên Graph

## 19. BFS Graph

BFS dùng queue.

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

Complexity:

```text
Time: O(V + E)
Space: O(V)
```

Câu cần nhớ:

> BFS đi từ gần đến xa. Vì vậy trên graph không trọng số, BFS tìm shortest path theo số cạnh.

---

## 20. Shortest Path trong unweighted graph

Bài toán:

> Cho graph không trọng số. Tìm số cạnh ít nhất từ `start` đến `target`.

Dùng BFS.

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

Complexity:

```text
Time: O(V + E)
Space: O(V)
```

Nếu graph có trọng số, BFS thường không đủ. Lúc đó mới cần Dijkstra, nhưng module này bỏ qua.

---

# Phần 7: Cycle Detection

## 21. Cycle trong undirected graph

Cycle nghĩa là có thể đi một vòng và quay lại node cũ.

Ví dụ có cycle:

```text
0 -- 1
|    |
2 -- 3
```

Một vòng là:

```text
0 -> 1 -> 3 -> 2 -> 0
```

Với undirected graph:

> Nếu DFS gặp neighbor đã visited và neighbor không phải parent, thì có cycle.

---

## 22. Detect cycle bằng DFS

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

Complexity:

```text
Time: O(V + E)
Space: O(V)
```

---

# Phần 8: So sánh BFS và DFS

## 23. BFS vs DFS

| Tiêu chí | BFS | DFS |
|---|---|---|
| Dùng gì | Queue | Recursion hoặc Stack |
| Đi kiểu gì | Theo tầng / gần trước | Đi sâu trước |
| Shortest path unweighted | Phù hợp | Không đảm bảo |
| Memory | Có thể lớn nếu level rộng | Có thể sâu nếu graph/tree sâu |
| Ứng dụng | Level order, shortest path | Cycle detection, connected components, backtracking |

Câu nhớ nhanh:

- BFS: gần trước, dùng queue.
- DFS: sâu trước, dùng stack/recursion.
- Graph traversal phải có `visited`.

---

# Phần 9: Big-O cần thuộc

## 24. Big-O cho Tree

| Bài | Time | Space |
|---|---:|---:|
| DFS tree traversal | `O(n)` | `O(h)` |
| BFS tree traversal | `O(n)` | `O(n)` worst case |
| Search BST balanced | `O(log n)` | `O(h)` |
| Search BST skewed | `O(n)` | `O(h)` |
| Insert BST balanced | `O(log n)` | `O(h)` |
| Insert BST skewed | `O(n)` | `O(h)` |

Ghi chú:

```text
n = số node
h = chiều cao tree
```

---

## 25. Big-O cho Graph

| Bài | Time | Space |
|---|---:|---:|
| Build adjacency list | `O(V + E)` | `O(V + E)` |
| DFS graph | `O(V + E)` | `O(V)` |
| BFS graph | `O(V + E)` | `O(V)` |
| Shortest path unweighted bằng BFS | `O(V + E)` | `O(V)` |
| Cycle detection undirected | `O(V + E)` | `O(V)` |
| Adjacency matrix space | — | `O(V^2)` |
| Adjacency matrix check edge | `O(1)` | — |

---

# Phần 10: Lỗi hay gặp

## 26. Lỗi 1: Quên visited trong Graph

Sai:

```java
for (int neighbor : graph.get(current)) {
    dfs(neighbor);
}
```

Nếu graph có cycle, code có thể chạy vô hạn.

Đúng:

```java
if (!visited.contains(neighbor)) {
    dfs(neighbor);
}
```

---

## 27. Lỗi 2: Nhầm BFS và DFS

BFS dùng queue:

```java
Queue<Integer> queue = new ArrayDeque<>();
```

DFS iterative dùng stack:

```java
Deque<Integer> stack = new ArrayDeque<>();
```

DFS recursive dùng call stack của Java.

---

## 28. Lỗi 3: Nói graph traversal là O(n)

Với graph, nên ghi:

```text
O(V + E)
```

Không nên chỉ ghi `O(n)` nếu đề đang nói rõ vertex/edge.

---

## 29. Lỗi 4: Nghĩ BFS luôn tìm shortest path

BFS chỉ tìm shortest path đúng trong graph không trọng số.

Nếu edge có weight:

```text
A -> B cost 100
A -> C cost 1
C -> B cost 1
```

BFS có thể chọn sai nếu chỉ tính số cạnh. Graph có trọng số cần thuật toán khác như Dijkstra.

---

# Phần 11: Deliverable gợi ý

## 30. Yêu cầu module

M0-4 yêu cầu:

> Thêm >= 10 bài tree/graph có test, README ghi Big-O từng bài.

Gợi ý 10 bài nên làm:

1. Binary Tree Preorder Traversal
2. Binary Tree Inorder Traversal
3. Binary Tree Postorder Traversal
4. Binary Tree Level Order Traversal
5. Max Depth of Binary Tree
6. Search in BST
7. Insert into BST
8. Graph DFS
9. Graph BFS
10. Shortest Path in Unweighted Graph
11. Detect Cycle in Undirected Graph

Nếu muốn làm đúng 10 bài, có thể bỏ bài 11. Nhưng nên làm 11 bài cho chắc.

Mỗi bài ghi trong README:

```text
Problem:
Approach:
Time:
Space:
```

Ví dụ:

```text
Problem: Graph BFS
Approach: Dùng Queue<ArrayDeque>, visited HashSet để tránh lặp.
Time: O(V + E)
Space: O(V)
```

---

## 31. Package gợi ý trong shopcore

Khi đến phần code deliverable, có thể đặt:

```text
src/main/java/.../algo/tree
src/main/java/.../algo/graph
src/test/java/.../algo/tree
src/test/java/.../algo/graph
```

Không tạo project mới. Tất cả vẫn đi vào `shopcore`.

---

# Phần 12: Checklist tự kiểm

## 32. Bạn nắm M0-4 nếu trả lời được

- Tree là gì?
- Binary Tree khác BST thế nào?
- BST search average/worst Big-O là gì?
- Preorder/Inorder/Postorder khác nhau thế nào?
- Vì sao inorder trên BST ra list tăng dần?
- BFS trên tree dùng gì?
- DFS trên graph vì sao cần visited?
- Adjacency list khác adjacency matrix thế nào?
- Khi nào BFS tìm được shortest path?
- Cycle detection trong undirected graph làm thế nào?
- Graph traversal Big-O vì sao là `O(V + E)`?

---

# Phần 13: Mẫu trả lời nhanh khi kiểm tra

## 33. Tree

> Tree là cấu trúc phân cấp gồm node cha-con. Binary Tree là tree mà mỗi node có tối đa 2 con. BST là Binary Tree có quy tắc left < root < right, giúp search nhanh nếu cây cân bằng.

## 34. DFS

> DFS là duyệt sâu trước, có thể dùng recursion hoặc stack. Trên tree thường có preorder, inorder, postorder. Trên graph cần visited để tránh lặp vô hạn.

## 35. BFS

> BFS là duyệt theo tầng/gần trước, dùng queue. Trên graph không trọng số, BFS tìm shortest path theo số cạnh.

## 36. Adjacency list vs matrix

> Adjacency matrix dùng `O(V^2)` memory và check cạnh `O(1)`. Adjacency list dùng `O(V + E)` memory, phù hợp graph thưa và thường dùng trong bài coding.

## 37. Cycle detection

> Với undirected graph, DFS có thể detect cycle bằng visited và parent. Nếu gặp neighbor đã visited mà neighbor không phải parent, graph có cycle.

---

# Phần 14: Lộ trình học 4 buổi

## Buổi 1: Tree cơ bản

- Học Binary Tree, BST.
- Code preorder/inorder/postorder.
- Code max depth.
- Ghi Big-O.

## Buổi 2: BFS Tree + BST

- Code level order traversal.
- Code search BST.
- Code insert BST.
- Viết test cho tree.

## Buổi 3: Graph cơ bản

- Học adjacency list/matrix.
- Code build graph.
- Code DFS recursive/iterative.
- Code BFS.

## Buổi 4: Shortest path + cycle

- Code shortest path unweighted bằng BFS.
- Code detect cycle undirected graph.
- Tổng hợp README Big-O.
- Làm đề kiểm tra `M0-4-dsa-tree-graph`.

