# Đáp án: M0-4 DSA II - Tree cơ bản

```text
topic = M0-4-dsa-tree-graph
che_do = NHANH
trong_tam = Buổi 1: Tree cơ bản - Binary Tree, BST, traversal, max depth, Big-O
```

Tổng điểm thô: `43 điểm`

Quy đổi thang 100:

```text
Điểm = (điểm thô / 43) * 100
```

---

## Câu 1. Tree là gì? - 3 điểm

Đáp án cần có:

- Tree là cấu trúc dữ liệu phân cấp gồm các node có quan hệ cha-con.
- Có một root và các subtree.
- Ví dụ đúng: folder/file, category sản phẩm, comment/reply, organization chart, DOM tree.

Thang điểm:

- 2 điểm: giải thích đúng Tree là cấu trúc phân cấp.
- 1 điểm: nêu được ít nhất 3 ví dụ hợp lý.

---

## Câu 2. Binary Tree là gì? - 3 điểm

Đáp án:

> Binary Tree là Tree mà mỗi node có tối đa 2 con, thường gọi là `left` và `right`.

Thang điểm:

- 2 điểm: nêu đúng mỗi node tối đa 2 con.
- 1 điểm: nêu đúng left/right hoặc phân biệt được với Tree tổng quát.

---

## Câu 3. BST là gì? - 3 điểm

Đáp án:

> BST là Binary Search Tree, có quy tắc `left subtree < root < right subtree`. Nhờ quy tắc này, khi search có thể bỏ qua một nửa hướng không cần tìm nếu cây cân bằng.

Thang điểm:

- 2 điểm: nêu đúng quy tắc left < root < right.
- 1 điểm: giải thích được lý do search nhanh hơn Binary Tree thường.

---

## Câu 4. Preorder, inorder, postorder - 3 điểm

Đáp án:

```text
Preorder: root -> left -> right
Inorder: left -> root -> right
Postorder: left -> right -> root
```

Thang điểm:

- 1 điểm cho mỗi thứ tự đúng.

---

## Câu 5. Inorder trên BST - 3 điểm

Đáp án:

> Inorder duyệt left trước, rồi root, rồi right. Trong BST, toàn bộ left subtree nhỏ hơn root và toàn bộ right subtree lớn hơn root, nên kết quả sẽ tăng dần.

Thang điểm:

- 1 điểm: nêu đúng inorder là left -> root -> right.
- 1 điểm: nêu đúng rule BST left < root < right.
- 1 điểm: kết luận đúng kết quả tăng dần.

---

## Câu 6. Big-O của traversal - 3 điểm

Đáp án:

```text
Time: O(n)
Space: O(h) nếu không tính output list
```

Giải thích:

- Mỗi node được duyệt đúng 1 lần nên Time là `O(n)`.
- Recursion stack sâu tối đa bằng chiều cao cây nên Space là `O(h)`.
- Nếu tính output list, tổng space là `O(n)`.

Thang điểm:

- 1 điểm: Time `O(n)`.
- 1 điểm: Space `O(h)`.
- 1 điểm: giải thích đúng theo số node và call stack.

---

## Câu 7. Xác định kết quả traversal - 5 điểm

Cây:

```text
        5
      /   \
     3     8
    / \     \
   2   4     10
```

Đáp án:

```text
Preorder: 5, 3, 2, 4, 8, 10
Inorder: 2, 3, 4, 5, 8, 10
Postorder: 2, 4, 3, 10, 8, 5
```

Thang điểm:

- 1.5 điểm: preorder đúng.
- 1.5 điểm: inorder đúng.
- 1.5 điểm: postorder đúng.
- 0.5 điểm: trình bày rõ ràng, không lẫn thứ tự.

---

## Câu 8. BST cân bằng và BST lệch - 5 điểm

Đáp án cần có:

- Search là `O(log n)` khi BST tương đối cân bằng, mỗi bước loại bỏ được khoảng một nửa cây.
- Search là `O(n)` khi BST bị lệch, chiều cao cây gần bằng số node.
- Ví dụ cây lệch:

```text
1
 \
  2
   \
    3
     \
      4
```

Thang điểm:

- 2 điểm: giải thích đúng trường hợp `O(log n)`.
- 2 điểm: giải thích đúng trường hợp `O(n)`.
- 1 điểm: có ví dụ hoặc mô tả cây lệch hợp lý.

---

## Câu 9. Space complexity của recursion - 5 điểm

Đáp án:

> Sai. Traversal recursive không chỉ dùng biến local, mà còn dùng call stack. Số frame trên stack tối đa bằng chiều cao cây, nên space là `O(h)`. Nếu cây cân bằng thì `h = log n`, nếu cây lệch thì `h = n`.

Thang điểm:

- 1 điểm: kết luận câu nói sai.
- 2 điểm: nêu được recursion dùng call stack.
- 1 điểm: nêu đúng Space `O(h)`.
- 1 điểm: phân biệt cân bằng `O(log n)` và lệch `O(n)`.

---

## Câu 10. Code traversal và max depth - 10 điểm

Đáp án mẫu:

```java
import java.util.ArrayList;
import java.util.List;

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

public int maxDepth(TreeNode root) {
    if (root == null) {
        return 0;
    }

    int leftDepth = maxDepth(root.left);
    int rightDepth = maxDepth(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
}
```

Big-O:

```text
inorder:
Time: O(n)
Space: O(h) nếu không tính output list

maxDepth:
Time: O(n)
Space: O(h)
```

Thang điểm:

- 2 điểm: `inorder` có base case `node == null`.
- 2 điểm: `inorder` đúng thứ tự left -> root -> right.
- 1 điểm: `inorder` trả về `List<Integer>` đúng.
- 2 điểm: `maxDepth` có base case root null trả `0`.
- 1.5 điểm: `maxDepth` dùng `1 + max(leftDepth, rightDepth)` đúng.
- 1.5 điểm: ghi đúng Big-O cho cả hai method.

