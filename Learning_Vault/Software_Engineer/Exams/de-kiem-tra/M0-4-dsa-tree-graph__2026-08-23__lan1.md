# Đề kiểm tra: M0-4 DSA II - Tree cơ bản

```text
topic = M0-4-dsa-tree-graph
che_do = NHANH
trong_tam = Buổi 1: Tree cơ bản - Binary Tree, BST, traversal, max depth, Big-O
tao_dap_an = co
```

Tổng điểm thô: `43 điểm`

Quy đổi thang 100:

```text
Điểm = (điểm thô / 43) * 100
```

Hướng dẫn:

- Trả lời ngắn gọn nhưng phải đúng ý.
- Với câu code, ưu tiên Java.
- Với mỗi thuật toán, ghi rõ Time và Space complexity.

---

## Phần 1: Lý thuyết - 6 câu x 3 điểm

### Câu 1. Tree là gì?

Giải thích Tree là gì và nêu 3 ví dụ thực tế có thể biểu diễn bằng Tree.

**Trả lời:**
Tree là một cấu trú dữ liệu theo kiểu phân cấp , có nhiều node và được nối với nhau quan hệ cha con . Tree ví dụ thực tế là folder/file , Comment có nhiều comment con phản hồi , category

---

### Câu 2. Binary Tree là gì?

Binary Tree khác Tree thông thường ở điểm nào? Một node trong Binary Tree có tối đa bao nhiêu con?

**Trả lời:** khác nhau ở điểm là Binary Tree là cây nhị phân , có nghĩa là 1 node chỉ chứa tối đa 2 node con 


---

### Câu 3. BST là gì?

Giải thích quy tắc của Binary Search Tree. Vì sao BST có thể giúp tìm kiếm nhanh hơn Binary Tree thường?

**Trả lời:**quy tắc là node con bên trái phải bé hơn node cha , bên phải phải lớn hơn node cha , lý do mà BST tìm nhanh hơn vì nếu value đó so với node thì nếu lớn thì qua root.right tìm , còn bé thì root.left thì tìm nhanh hơn nhiều , tree bình thường nó sắp xếp không đúng theo quy luất đó nên khó tìm từng cái


---

### Câu 4. Preorder, inorder, postorder

Viết thứ tự duyệt của 3 traversal sau:

- Preorder
- Inorder
- Postorder

**Trả lời:** Preorder  root - left - right , inorder là left - root - right , postorder là left-right-root;


---

### Câu 5. Inorder trên BST

Vì sao inorder traversal trên BST cho ra danh sách tăng dần?

**Trả lời:**vì inorder là left-root-right thì nó sẽ đi hết bên trái thì nó phải danh sách từ min -> max chứ , vì nó quét hết min thì nó ở trên trái , tìm ra dc min rồi thì bắt đầu nó đi tiếp lên root rồi right


---

### Câu 6. Big-O của traversal

Với một Binary Tree có `n` node và chiều cao `h`, Big-O của preorder/inorder/postorder traversal là gì? Giải thích ngắn gọn.

**Trả lời:** Time: O(n)
Space: O(h) nếu không tính output list 
 - Mỗi node được duyệt đúng 1 lần nên Time là `O(n)`.
- rồi dệ quy thì nó tính height (h)
- Nếu tính output list, tổng space là `O(n)`.


---

## Phần 2: Tình huống - 3 câu x 5 điểm

### Câu 7. Xác định kết quả traversal

Cho cây sau:

```text
        5
      /   \
     3     8
    / \     \
   2   4     10
```

Hãy ghi kết quả:


**Trả lời:**- Preorder 5 3 2 4 8 10
- Inorder 2 3 4 5 8 10
- Postorder 2 4 3 10 8 5


---

### Câu 8. BST cân bằng và BST lệch

Một BST có thể search trung bình `O(log n)`, nhưng worst case có thể là `O(n)`.

Giải thích khi nào search là `O(log n)`, khi nào search là `O(n)`. Vẽ hoặc mô tả một ví dụ cây lệch.

**Trả lời:** O(log n ) khi mà Binary tree cân bằng  thì khi tìm thì sẽ bỏ được 1 nữa số node của cây, còn O(n) khi mà cây bị lệch khiến cho số lượng node = chiều cao của tree

1
 \
  2
   \
    3
     \
      4
---

### Câu 9. Space complexity của recursion

Một bạn nói: “Traversal bằng recursion chỉ dùng vài biến nên Space là `O(1)`”.

Nhận xét câu nói này đúng hay sai? Vì sao?

**Trả lời:**
sai , nó dùng call stack nên là space phải là o(h);

---

## Phần 3: Code mini - 1 câu x 10 điểm

### Câu 10. Code traversal và max depth

Cho class:

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

Hãy viết Java code cho 2 method:

```java
List<Integer> inorder(TreeNode root)
int maxDepth(TreeNode root)
```

Yêu cầu:

- `inorder` trả về danh sách node theo thứ tự left -> root -> right.
- `maxDepth` trả về độ sâu lớn nhất của cây.
- Ghi Big-O cho từng method.

**Trả lời:**
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

inorder:
Time: O(n)
Space: O(h) nếu không tính output list

maxDepth:
Time: O(n)
Space: O(h)

