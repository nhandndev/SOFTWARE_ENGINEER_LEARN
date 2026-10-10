# M2-4 Performance · Kiểm tra Lesson 03

> LESSON: 8 câu ×5đ =40đ; normalize /40 ×100. Không cần nhớ tên lớp nội bộ Spring.

## Câu 1 (5đ)
Page Product JOIN FETCH Category to-one, Category bắt buộc. Vì sao join này không nhân một Product thành nhiều dòng? Count query dùng làm gì; nếu content có filter thì count cần gì?

**Trả lời:**

## Câu 2 (5đ)
Books có Java/Spring/SQL; Electronics có Mouse. JOIN FETCH Category.products tạo bao nhiêu dòng SQL? LIMIT 2 dòng có tương đương hai Category đủ collection không? DISTINCT có tự sửa paging không?

**Trả lời:**

## Câu 3 (5đ)
Hibernate paging trong memory khi fetch collection có rủi ro gì? fail_on_pagination_over_collection_fetch giúp gì và có tự sửa query không?

**Trả lời:**

## Câu 4 (5đ)
ID page là [1,2], query fetch với IN trả Category 2 rồi 1. Mô tả hai bước paging/fetch, sửa thứ tự, metadata lấy đâu và làm gì nếu ID page rỗng.

**Trả lời:**

## Câu 5 (5đ)
Tắt open-in-view có tự hết N+1 không? Nếu Service trả entity có LAZY chưa tải cho Jackson sau session đóng, có thể lỗi gì? Nêu cách trả DTO đúng ranh giới.

**Trả lời:**

## Câu 6 (5đ)
Product 10/11 thuộc Category 1, Product 12 thuộc Category 2. Cần list lọc Category 1. Repository khai báo:

```java
@Query(value = "select p from Product p join fetch p.category where p.category.id = :categoryId",
       countQuery = "select count(p) from Product p")
Page<Product> findPageByCategory(@Param("categoryId") Long categoryId, Pageable pageable);
```

Giả sử countQuery này được thực thi. Content lọc đúng nhưng totalElements nhận bao nhiêu và đáng ra bao nhiêu? Sửa countQuery và giải thích vì sao bọc PageResponse không tự sửa total sai. Không cần viết Service.

**Trả lời:**

## Câu 7 (5đ)
Service có @Transactional(readOnly=true). Nó có tự fetch đủ quan hệ hoặc bảo đảm mọi write bị DB cấm không? Gọi this.list() cùng class khác gì gọi qua Spring proxy?

**Trả lời:**

## Câu 8 (5đ)
Transaction query DB rồi gọi API model mất 5 giây trước khi kết thúc. Vì sao có thể làm request khác chờ pool? Đề xuất hướng xử lý nhưng vẫn cân nhắc business consistency. Session mở có luôn đồng nghĩa connection vật lý bị giữ không?

**Trả lời:**
