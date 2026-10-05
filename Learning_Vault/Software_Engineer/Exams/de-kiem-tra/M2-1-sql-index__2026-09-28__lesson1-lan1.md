# Bài kiểm tra M2-1 - Lesson 01: SQL cơ bản

> 7 câu, 40 điểm thô. Trả lời bằng lời hoặc SQL. Chấm theo ý nghĩa, không bắt thuộc lòng cú pháp. Nếu bạn nói `chấm thử`, chỉ chấm câu đã làm.

Dùng bảng Product trong [Lesson 01](../../Notes/M2_Database/LESSON_01_SQL_CO_BAN_DOC_MOT_BANG.md). Đáp án ở file riêng, đọc sau khi làm.

| id | name | price | category_id |
|---:|---|---:|---:|
| 10 | K1 | 1500000 | 1 |
| 11 | K2 | 800000 | 1 |
| 12 | M1 | 300000 | 2 |
| 13 | Chưa phân loại | 200000 | NULL |

## Câu 1 - SQL là gì? (5đ)

SQL giúp backend làm gì với database? Trong `shopcore`, bảng/dòng/cột tương ứng với gì? Kể tên một thao tác SQL dùng để đọc dữ liệu.

**Trả lời:** SQL giúp backend quản trị được cơ sở dữ liệu của database , dùng để thao tác với lại database như thêm bớt xoá sửa ,... , bảng là tương ứng với table là entity , row là value dữ liệu , cột là attribute là các field trong entity đó . QUERY dùng để đọc là Select , from , Where , OrderBy , Limit , Offset gì đó . Mỗi dòng ở đây là 1 Record , 1 Product

---

## Câu 2 - SELECT và WHERE (6đ)

Viết query chỉ lấy `id`, `name`, `price` của Product có `price >= 500000`. Query trả những Product nào? Không cần quan tâm thứ tự nếu chưa có `ORDER BY`.

**Trả lời:**
SELECT id , name , price
FROM Products
WHERE price >= 500000

thì nó sẽ trả id , name , price của Product có price >= 500000 . Trả ra K1 , K2 

---

## Câu 3 - AND và OR (6đ)

Với điều kiện `category_id = 1 OR price < 300000`, những Product nào được giữ? Sau đó thay `OR` bằng `AND`, kết quả là gì? Giải thích ngắn.

**Trả lời:**

trả về những Product có category_id =1  hoặc là price < 300000> , thì nó sẽ giữ nếu thoã 1 trong 2 điều kiện , nếu thay OR bằng AND thì buộc phải đáp ứng được cả 2 điều kiện . OR thì là sẽ trả ra K1 , K2 . Product có id là 13 , AND thì là không trả dòng nào

---

## Câu 4 - NULL (5đ)

Viết query tìm Product chưa có category. Vì sao `WHERE category_id = NULL` không đúng? Product nào được tìm thấy?

**Trả lời:**
SELECT category
FROM Products
WHERE category_id IS NULL

 Vì sao `WHERE category_id = NULL` không đúng?  là vì cái dấu = ở đây nó k phỉa giống như thằng Java là so sánh mà NULL ở đây là SQL quy định là phải so sánh = IS  hoặc là IS NOT , WHERE chỉ dữ giá trị true đúng k mà khi so sanh = NULL thì sẽ là UNKNOWN nên là k dc , Product được tìm thấy sẽ là Product có cột category là NULL , đó là product có id là 13

---

## Câu 5 - ORDER BY, LIMIT, OFFSET (7đ)

Viết query lấy trang thứ hai khi mỗi trang có 2 Product, sắp xếp `price DESC`, rồi `id ASC` nếu trùng giá. Trang được đánh số từ 0. Query trả Product nào?

**Trả lời:**
SELECT *
FROM Products
ORDER BY price DESC , id ASC
LIMIT 2
OFFSET 2

Trả về Product có id là 12 13 



---

## Câu 6 - Đọc query (6đ)

Query sau trả những dòng nào, theo thứ tự nào? Hãy nói ngắn tác dụng từng phần `FROM`, `WHERE`, `ORDER BY`, `LIMIT`.

```sql
SELECT id, name
FROM products
WHERE price >= 300000
ORDER BY price DESC, id ASC
LIMIT 2;
```

**Trả lời:**

FROM để biết là từ Table nào
WHERE là giống như FILTER , nó bộ lọc cái nào true thì lấy
ORDER BY là sắp xếp theo thứu tự gì , DESC là giảm đần , ASC là tăng dần
LIMIT là giới hạn chỉ lấy 2 PRODUCT 

Trả về là (10, K1), (11, K2)

---

## Câu 7 - Khóa và bước tiếp theo (5đ)

`products.id` và `products.category_id` khác vai trò gì? Vì sao muốn lấy tên Category thì chỉ đọc bảng Product chưa đủ? Lesson nào sẽ giải quyết việc này?

**Trả lời:**
products.id là Primary key của bảng Product
products.category_id là Khoá ngoại , vai trò là trỏ sang bảng category , có nghĩa là trong prodcut có chứa category ( nếu theo góc nhìn của java là vậy )
muốn lấy tên Category thì phải truy xuất vô product id để lấy product và truy xuất category_id của nó để ra được category , từ category mới thấy dc name
ý là vầy , có 2 bảng là products và categories thì pà trong products sẽ có field là category_id thì là nó sẽ dựa vào category_id để mà liên kết bảng products và categories lại với nahu , products và categories là quan hệ 1 to many thì là vậy 