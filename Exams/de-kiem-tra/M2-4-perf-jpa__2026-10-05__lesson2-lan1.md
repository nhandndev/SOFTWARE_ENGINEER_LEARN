# M2-4 Performance · Kiểm tra Lesson 02

> LESSON: 8 câu ×5đ =40đ; normalize /40 ×100. Product.category là to-one; DTO class cần id/name/categoryName. Chấm tư duy; JPQL ngắn, không cần imports.

Mỗi câu độc lập. Trường hợp Category tùy chọn ở câu 2 và 7 giả định mapping/FK cho phép NULL. Các câu còn lại dùng quan hệ bắt buộc như bài học. Có thể mô tả giải pháp đúng bằng lời nếu quên cú pháp; không trừ lỗi gõ khi hiểu rõ ý.

## Câu 1 (5đ)
`select p from Product p join p.category c where c.name=:name` có bảo đảm initialize Category không? JOIN thường phục vụ gì, JOIN FETCH thêm ý nghĩa gì?

**Trả lời:**

## Câu 2 (5đ)
Viết JPQL tải Product cùng Category để mapper đọc category.name trong Service. Khi Category tùy chọn và phải giữ Product không có Category, đổi gì ở query và mapper?

**Trả lời:**

## Câu 3 (5đ)
Method có `@EntityGraph(attributePaths="category")`. Graph yêu cầu điều gì? Có làm mọi endpoint fetch Category hay bảo đảm cứng một SQL cho mọi provider không? Kiểm thế nào?

**Trả lời:**

## Câu 4 (5đ)
`default_batch_fetch_size=16` giúp đọc LAZY ra sao? Vì sao không được nói mọi list đều chỉ còn một query? Khác `hibernate.jdbc.batch_size` thế nào?

**Trả lời:**

## Câu 5 (5đ)
DTO class ProductResponse có constructor `(Long id, String name, String categoryName)` trong package com.shopcore.product.dto. Viết JPQL constructor projection, giải thích vì sao không có Category proxy trong response này.

**Trả lời:**

## Câu 6 (5đ)
Endpoint chỉ đọc id/name/categoryName; endpoint khác cần cập nhật Product bằng dirty checking. Chọn DTO projection hoặc managed entity cho mỗi endpoint và nêu lý do; có phải DTO thay được mọi entity không?

**Trả lời:**

## Câu 7 (5đ)
Trước sửa endpoint trả Product 1,2,3; Product 3 không có Category. Sau inner JOIN FETCH chỉ trả 1,2 và query giảm. Có đạt không? Sửa thế nào và kiểm lại gì?

**Trả lời:**

## Câu 8 (5đ)
Endpoint list chỉ cần Product id/name/categoryName. Một bạn đề xuất fetch cả category.products và nhiều collection khác. Chọn một giải pháp phù hợp (fetch to-one, graph hoặc projection), giải thích dữ liệu nó lấy; nêu hai rủi ro của tải nhiều collection và cách kiểm trước–sau.

**Trả lời:**
