# M2-4 Performance · Kiểm tra Lesson 01

> LESSON: 8 câu ×5đ =40đ; normalize /40 ×100. Chấm ý nghĩa. Không cần thuộc imports.

## Dữ kiện chung

Product 10→Category 1, Product 11→Category 2, Product 12→Category 3. Ba Category có name. Product.category LAZY chưa tải, context ban đầu chưa có Category, không batch/cache cấp hai. Service list có transaction và map DTO bằng `p.getCategory().getName()`.

Code chính đang xét (repository trả List, không paging/count):

```java
@Transactional(readOnly = true)
public List<ProductResponse> list() {
    return productRepository.findAll().stream()
            .map(p -> new ProductResponse(
                    p.getId(), p.getName(), p.getCategory().getName()))
            .toList();
}
```

ProductResponse là DTO class `(Long id, String name, String categoryName)`; Service được gọi qua Spring bean, không có job/query khác trong phép đếm trừ khi câu hỏi nói khác. Mỗi câu là tình huống độc lập.

## Câu 1 (5đ)
Một lần findAll Product có bảo đảm một SQL tổng cộng không? Trong dữ kiện chung, dự đoán số query và dòng code gây query phụ.

**Trả lời:**

## Câu 2 (5đ)
Product đã có category_id. Vì sao vẫn có thể cần query để đọc category.name? Phân biệt biết khóa và có dữ liệu quan hệ.

**Trả lời:**

## Câu 3 (5đ)
Đổi cả ba Product cùng Category 1, giữ cùng một context ban đầu rỗng. Có nhất thiết 4 query không? Giải thích tác dụng dùng lại entity đã tải và cách xác nhận.

**Trả lời:**

## Câu 4 (5đ)
Đổi LAZY thành EAGER có bảo đảm hết N+1 không? LAZY có tự giải quyết không? Dùng bằng chứng gì để kết luận?

**Trả lời:**

## Câu 5 (5đ)
Mapping DTO trong Service transaction còn mở và serialize entity LAZY chưa tải sau khi session đóng khác nhau thế nào về SQL/lỗi? Có phải DTO tự sửa N+1 không?

**Trả lời:**

## Câu 6 (5đ)
Từ code chung, đổi response thành DTO chỉ có Product id/name và mapper không đọc Category, vẫn giữ mapping LAZY. Có còn lý do tải Category để tạo response này không? Hãy chỉ dòng cần bỏ, dự đoán số SELECT dữ liệu theo giả định đề và nêu cách kiểm bằng log. Không yêu cầu viết cả class DTO.

**Trả lời:**

## Câu 7 (5đ)
Statistics đã bật. clear() rồi chạy request cùng lúc với job nền. PrepareStatementCount=20 có được xem chắc chắn là 20 query của request không? Nó có phải latency/số row không? Giải thích.

**Trả lời:**

## Câu 8 (5đ)
Trước 4 query, sau một cách sửa là 1 query nhưng chưa đo thời gian. Bạn đã chứng minh điều gì, chưa chứng minh điều gì? Vì sao cần nói rõ dữ liệu/context/transaction trong kết luận?

**Trả lời:**
