# README Buổi 1: Tree cơ bản

Module: `M0-4 · DSA II`

Mục tiêu của buổi này:

- Hiểu Binary Tree và Binary Search Tree.
- Code được preorder, inorder, postorder traversal.
- Code được max depth của Binary Tree.
- Ghi đúng Big-O cho từng bài.

---

## 1. Tree là gì?

Tree là cấu trúc dữ liệu phân cấp, gồm nhiều node nối với nhau theo quan hệ cha-con.

Ví dụ:

```text
        5
      /   \
     3     8
    / \     \
   2   4     10
```

Các khái niệm cần nhớ:

| Khái niệm | Ý nghĩa |
|---|---|
| Root | Node gốc của cây |
| Parent | Node cha |
| Child | Node con |
| Leaf | Node không có con |
| Subtree | Cây con |
| Height/depth | Độ cao/độ sâu của cây |

Câu nhớ nhanh:

```text
Tree dùng khi dữ liệu có dạng phân cấp: folder/file, category, comment/reply, organization chart.
```

---

## 2. Binary Tree

Binary Tree là tree mà mỗi node có tối đa 2 con:

```text
left
right
```

Node cơ bản trong Java:

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

Tạo cây ví dụ:

```java
TreeNode root = new TreeNode(5);
root.left = new TreeNode(3);
root.right = new TreeNode(8);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(4);
root.right.right = new TreeNode(10);
```

Cây tương ứng:

```text
        5
      /   \
     3     8
    / \     \
   2   4     10
```

---

## 3. Binary Search Tree - BST

BST là Binary Tree có thêm quy tắc sắp xếp:

```text
left subtree < root < right subtree
```

Ví dụ BST đúng:

```text
        5
      /   \
     3     8
    / \     \
   2   4     10
```

Vì:

```text
2 < 3 < 4 < 5 < 8 < 10
```

BST giúp tìm kiếm nhanh nếu cây cân bằng.

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

Big-O:

| Case | Time | Space |
|---|---:|---:|
| Cây cân bằng | `O(log n)` | `O(h)` |
| Cây lệch | `O(n)` | `O(h)` |

Ghi chú:

```text
n = số node
h = chiều cao cây
```

Nếu BST bị lệch như dưới đây, nó gần giống LinkedList:

```text
1
 \
  2
   \
    3
     \
      4
```

Khi đó search có thể thành `O(n)`.

---

## 4. DFS trên Tree

DFS nghĩa là đi sâu hết một nhánh trước, rồi mới quay lại nhánh khác.

Trên Binary Tree có 3 kiểu DFS quan trọng:

| Kiểu duyệt | Thứ tự |
|---|---|
| Preorder | root -> left -> right |
| Inorder | left -> root -> right |
| Postorder | left -> right -> root |

Với cây:

```text
        5
      /   \
     3     8
    / \     \
   2   4     10
```

Kết quả:

| Kiểu duyệt | Kết quả |
|---|---|
| Preorder | `5, 3, 2, 4, 8, 10` |
| Inorder | `2, 3, 4, 5, 8, 10` |
| Postorder | `2, 4, 3, 10, 8, 5` |

Mẹo nhớ:

```text
Preorder: root đứng trước
Inorder: root đứng giữa
Postorder: root đứng sau
```

---

## 5. Preorder Traversal

Thứ tự:

```text
root -> left -> right
```

Code:

```java
import java.util.ArrayList;
import java.util.List;

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

Big-O:

```text
Time: O(n)
Space: O(h) nếu không tính output list
```

Vì mỗi node được ghé đúng 1 lần.

---

## 6. Inorder Traversal

Thứ tự:

```text
left -> root -> right
```

Code:

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
```

Câu cực quan trọng:

```text
Inorder trên BST sẽ cho ra list tăng dần.
```

Big-O:

```text
Time: O(n)
Space: O(h) nếu không tính output list
```

---

## 7. Postorder Traversal

Thứ tự:

```text
left -> right -> root
```

Code:

```java
import java.util.ArrayList;
import java.util.List;

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

Postorder hay dùng khi cần xử lý con trước cha.

Ví dụ:

- Tính size/depth từ dưới lên.
- Delete tree.
- Evaluate expression tree.

Big-O:

```text
Time: O(n)
Space: O(h) nếu không tính output list
```

---

## 8. Max Depth của Binary Tree

Max depth là số node trên đường dài nhất từ root đến leaf.

Ví dụ:

```text
        5
      /   \
     3     8
    / \     \
   2   4     10
```

Max depth là `3`, vì đường dài nhất có 3 node:

```text
5 -> 3 -> 2
5 -> 3 -> 4
5 -> 8 -> 10
```

Ý tưởng:

```text
maxDepth(root) = 1 + max(maxDepth(left), maxDepth(right))
```

Code:

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

Big-O:

```text
Time: O(n)
Space: O(h)
```

Vì phải ghé qua mọi node một lần, và recursion stack sâu tối đa bằng chiều cao cây.

---

## 9. Một file code mẫu hoàn chỉnh

```java
import java.util.ArrayList;
import java.util.List;

class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class BinaryTreeBasics {

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

    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);

        return 1 + Math.max(leftDepth, rightDepth);
    }

    public boolean searchBst(TreeNode root, int target) {
        if (root == null) {
            return false;
        }

        if (root.value == target) {
            return true;
        }

        if (target < root.value) {
            return searchBst(root.left, target);
        }

        return searchBst(root.right, target);
    }
}
```

---

## 10. Big-O cần ghi trong README bài nộp

| Bài | Time | Space | Ghi chú |
|---|---:|---:|---|
| Preorder traversal | `O(n)` | `O(h)` | Không tính output list |
| Inorder traversal | `O(n)` | `O(h)` | Inorder BST ra tăng dần |
| Postorder traversal | `O(n)` | `O(h)` | Xử lý con trước cha |
| Max depth | `O(n)` | `O(h)` | Duyệt toàn bộ tree |
| BST search balanced | `O(log n)` | `O(h)` | Cây cân bằng |
| BST search skewed | `O(n)` | `O(h)` | Cây lệch như LinkedList |

Nếu tính cả output list cho traversal:

```text
Space: O(n)
```

Vì result list chứa toàn bộ node.

---

## 11. Lỗi hay gặp

### Lỗi 1: Quên base case

Sai:

```java
private void preorder(TreeNode node, List<Integer> result) {
    result.add(node.value);
    preorder(node.left, result);
    preorder(node.right, result);
}
```

Nếu `node == null`, code sẽ lỗi `NullPointerException`.

Đúng:

```java
if (node == null) {
    return;
}
```

### Lỗi 2: Nhầm thứ tự traversal

Nhớ vị trí của `result.add(node.value)`:

| Kiểu | Vị trí add |
|---|---|
| Preorder | Trước khi đi left/right |
| Inorder | Giữa left và right |
| Postorder | Sau khi đi left/right |

### Lỗi 3: Ghi sai space complexity

Recursive traversal dùng call stack.

```text
Space: O(h)
```

Không phải lúc nào cũng là `O(1)`.

Nếu cây cân bằng:

```text
h = log n
```

Nếu cây lệch:

```text
h = n
```

---

## 12. Bài tập tự luyện trong buổi 1

Làm 4 bài này trước:

1. Binary Tree Preorder Traversal
2. Binary Tree Inorder Traversal
3. Binary Tree Postorder Traversal
4. Maximum Depth of Binary Tree

Nếu còn thời gian, làm thêm:

5. Search in a Binary Search Tree

Mỗi bài tự ghi:

```text
Problem:
Approach:
Time:
Space:
```

Ví dụ:

```text
Problem: Maximum Depth of Binary Tree
Approach: Dùng recursion, depth của node = 1 + max(depth trái, depth phải).
Time: O(n)
Space: O(h)
```

---

## 13. Checklist tự kiểm cuối buổi

- [ ] Giải thích được Tree là gì.
- [ ] Giải thích được Binary Tree là gì.
- [ ] Giải thích được BST khác Binary Tree thường ở điểm nào.
- [ ] Nhớ thứ tự preorder: root -> left -> right.
- [ ] Nhớ thứ tự inorder: left -> root -> right.
- [ ] Nhớ thứ tự postorder: left -> right -> root.
- [ ] Code được 3 traversal không nhìn đáp án.
- [ ] Code được max depth không nhìn đáp án.
- [ ] Ghi được Big-O của traversal là `O(n)` time.
- [ ] Ghi được recursive space là `O(h)`.

---

## 14. Mẫu trả lời nhanh khi kiểm tra

### Binary Tree và BST

> Binary Tree là tree mà mỗi node có tối đa 2 con: left và right. BST là Binary Tree có thêm quy tắc left subtree nhỏ hơn root, right subtree lớn hơn root. Nếu BST cân bằng thì search trung bình `O(log n)`, nếu bị lệch thì worst case `O(n)`.

### Preorder, inorder, postorder

> Preorder đi root trước: root -> left -> right. Inorder đi root ở giữa: left -> root -> right. Postorder đi root cuối: left -> right -> root.

### Max depth

> Max depth của tree là độ dài đường dài nhất từ root đến leaf. Có thể tính bằng recursion: nếu root null thì depth bằng 0, ngược lại bằng `1 + max(depth trái, depth phải)`. Time `O(n)`, space `O(h)`.

