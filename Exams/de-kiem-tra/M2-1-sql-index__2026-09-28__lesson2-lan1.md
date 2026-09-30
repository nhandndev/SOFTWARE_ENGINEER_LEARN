# Bài kiểm tra M2-1 - Lesson 02: JOIN

> 7 câu, tổng 40 điểm thô. Có thể trả lời bằng lời; câu viết query không bắt lỗi gõ phím nhỏ nếu ý đúng. Nếu bạn nói `chấm thử`, tôi chỉ chấm các câu đã làm.

Dùng bộ dữ liệu dưới đây cho câu 1-6. Câu 7 có dữ kiện riêng trong câu hỏi. Bạn không cần mở bài học để tra bảng; không mở file `__DAPAN.md` trước khi làm.

### Bảng `categories`

| id | name |
|---:|---|
| 1 | Bàn phím |
| 2 | Chuột |
| 3 | Tai nghe |

### Bảng `products`

| id | name | category_id |
|---:|---|---:|
| 10 | K1 | 1 |
| 11 | K2 | 1 |
| 12 | M1 | 2 |
| 13 | Chưa phân loại | NULL |

### Bảng `order_items`

| id | product_id | quantity |
|---:|---:|---:|
| 100 | 10 | 2 |
| 101 | 10 | 1 |
| 102 | 12 | 3 |

## Câu 1 - Bản chất JOIN (5đ)

Với query sau, tại sao category `Bàn phím` xuất hiện 2 dòng, còn `Tai nghe` không xuất hiện? Product 13 có xuất hiện không, vì sao?

```sql
SELECT c.name AS category, p.name AS product
FROM categories c
INNER JOIN products p ON p.category_id = c.id;
```

**Trả lời:** 
vì đây là INNEr Join thì phải trùng cả 2 bảng trái phải đó là bảng categories và products , là gì p.category_id = c.id thì phải trùng id ở cả 2 bảng nên là nó chỉ hiện Bàn Phím xuất hiện 2 dòng , tai nghe là id là 3 nên là không trùng nên là k hiện ,2 cái Bàn phím và 1 Chuột dược hiện , Product có id là 13 sẽ k hiện vì là NULL thì là k so sánh dấu = ducodwj vì đó là UnKNOWN

---

## Câu 2 - Dự đoán LEFT JOIN (5đ)

Với `categories c LEFT JOIN products p ON p.category_id = c.id`, hãy liệt kê từng cặp `(category, product)` trả về. Product 13 có trong kết quả không?

**Trả lời:**
đầu tiên là LEFT JOIn thì nó sẽ lấy ra hầu hết bảng ở bên trái là bảng categories , còn nếu id k trùng thì nó sẽ để là NULL ,
(Bàn Phím , K1) , (Bàn phím , K2) , ( Chuột , M1) ( Tai nghe , NULL) , product 13 sẽ k hiển thị nhé , cái này tôi lấy theo name của cả 2 bảng
---

## Câu 3 - Chọn phía được giữ (5đ)

Cần danh sách **tất cả product**, kể cả product chưa được gán category. Hãy viết `FROM ... LEFT JOIN ... ON ...` và nói product 13 có giá trị gì ở cột category.

**Trả lời:**
```sql
SELECT c.name AS category , p.name AS product
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
và product 13 có giá trị là NULL ở cột category , 
```

---

## Câu 4 - ON vs WHERE (7đ)

So sánh hai query sau. Query nào giữ lại đủ cả 3 category? Hãy kể kết quả của từng query và giải thích vì sao.

```sql
-- A
SELECT c.name, p.name
FROM categories c
LEFT JOIN products p ON p.category_id = c.id AND p.name LIKE 'K%';

-- B
SELECT c.name, p.name
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
WHERE p.name LIKE 'K%';
```

**Trả lời:**
query A nó sẽ giữ đủ category hơn vì là điều kiện trong phần ON chỉ là điều kiện để mà Value của thg product có bị NULL hay vẫn giữ được value dựa vào thoã mãn điều kiện On , còn query B là sau khi thoã mãn điều kiện ON r thì sẽ bị lọc ra ngoài vì thằng WHERE nữa , sau khi LEFT JOIN thì nó sẽ có name của products và nó phải thoã điều kiện của WHERE thì category ở đó sẽ k đầy đủ ,

Kết quả của A sẽ là (Bàn Phím , K1) , (Bàn phím , K2) , ( Chuột , NULL) , (Tai Nghe , NULL)
Kết quả của B sẽ là (Bàn Phím , K1) , (Bàn phím , K2)


---

## Câu 5 - Tìm category rỗng (6đ)

Viết query lấy `id`, `name` của category không có product. Giải thích vì sao dùng `IS NULL` và cột nào nên kiểm tra.

**Trả lời:**
SELECT c.id , c.name
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
WHERE p.category_id IS NULL 

dùng IS NULL vì tìm category Không có product thì là product cột category_id bị NULL thì xài IS NULL th , vì sao xài thì do k xài = thì xài IS NULL chứ xài dấu = sai
tôi chỉ biết vậy thôi giải thích rõ tôi câu này nha , tôi có khi hiểu sai hoặc do ăn máy nên đúng query th 
---

## Câu 6 - JOIN 3 bảng (7đ)

Bạn cần liệt kê các dòng **order item** ở bảng dữ liệu đầu đề. Mỗi item có `product_id` trỏ đến `products.id`; mỗi product có `category_id` trỏ đến `categories.id`.

Hãy trả lời đủ 3 phần:

1. Viết **một câu SELECT** ghép `order_items`, `products`, `categories`. Dùng alias bảng `oi`, `p`, `c`. Kết quả cần đúng 4 cột theo thứ tự: `item_id` (lấy từ `order_items.id`), `product` (tên product), `category` (tên category), `quantity`. Hãy ghi cả hai điều kiện `ON`. Có thể dùng `AS` để đặt tên cột kết quả.
2. Giải thích trong `oi.id AS item_id`: `oi` là gì, `oi.id` lấy giá trị ở đâu, và `AS item_id` có sửa tên cột `id` trong database không?
3. Từ bảng dữ liệu đầu đề, dự đoán query trả **bao nhiêu dòng**. Mỗi dòng kết quả đại diện cho một item hay một product? Vì sao tên `K1` có thể xuất hiện nhiều lần?

**Trả lời:** 

SELECT  oi.id ,
        p.name,
        c.name,
        oi.quantity
FROM order_items oi
INNER JOIN products p ON p.id = oi.product_id
INNER JOIN categories c ON p.category_id = c.id
ORDER BY oi.quantity

r giải thích gì nữa tôi viết querry là hiểu r 

---

## Câu 7 - Đọc cardinality (5đ)

**Câu này dùng dữ liệu riêng, không dùng ba bảng ở đầu đề:**

| categories.id | categories.name |
|---:|---|
| 1 | Phụ kiện |

| products.id | products.name | products.category_id |
|---:|---|---:|
| 10 | A | 1 |
| 11 | B | 1 |

| order_items.id | order_items.product_id |
|---:|---:|
| 201 | 10 |
| 202 | 10 |
| 203 | 10 |
| 204 | 11 |
| 205 | 11 |

Giả sử query bắt đầu từ `categories`, `INNER JOIN products` bằng `products.category_id = categories.id`, sau đó `INNER JOIN order_items` bằng `order_items.product_id = products.id`, và lọc `categories.id = 1`.

1. Hãy liệt kê các cặp `(product name, order_items.id)` sau hai lần JOIN và cho biết có **bao nhiêu dòng**.
2. Nếu thay phần `SELECT` bằng `SELECT COUNT(*)` (giữ nguyên `FROM`, `JOIN`, `WHERE`), kết quả là bao nhiêu? Nó đang đếm **dòng sau JOIN**, số product, hay số category? Giải thích tại sao.

**Trả lời:**
(A , 201) ,(A , 202) ,(A , 203) ,(B , 204) ,(B , 205) ,
có 5 dòng nha 

Count thì vẫn là 5 thôi , nó thì sau qua 2 lần JOIN thì nó tổng quát nhất là tại order item r thì đếm ở đó , tư duy vậy 
