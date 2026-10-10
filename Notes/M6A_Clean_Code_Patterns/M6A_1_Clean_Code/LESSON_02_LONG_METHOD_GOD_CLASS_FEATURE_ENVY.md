# Lesson 02 · Long Method, God Class và Feature Envy: trách nhiệm đặt sai ở đâu?

> Buổi 2 / 4h. Mục tiêu: nhận diện bằng bằng chứng thay đổi/ownership, chọn Extract Method/Class hoặc di chuyển behavior đúng chỗ.

## Tài liệu / video

- [Code Smell](https://martinfowler.com/bliki/CodeSmell.html): smell không phải kết luận tự động.
- [Extract Function](https://refactoring.com/catalog/extractFunction.html): tách một bước có tên.
- [Extract Class](https://refactoring.com/catalog/extractClass.html): tách trách nhiệm có cohesion.
- [Move Function](https://refactoring.com/catalog/moveFunction.html): đặt behavior gần dữ liệu/owner thích hợp.

Video: tìm `Long Method God Class Feature Envy refactoring Java examples`. Kiểm ví dụ có nói ai sở hữu business rule không, đừng chỉ nhìn số getter.

## 1. Cùng dài nhưng không cùng vấn đề

Long Method đáng quan tâm khi một hàm trộn nhiều bước khó đặt tên, có nhiều mức trừu tượng, nhiều lý do đổi hoặc khó kiểm riêng. 80 dòng algorithm rõ không tự tệ; 20 dòng trộn SQL, gửi email, parse JSON và tính giá có thể phức tạp hơn.

Ví dụ Service giả định:

```text
createProduct:
parse raw JSON
kiểm SKU
kiểm category
tính giá/promotion
save product
gửi HTTP notification
tạo HTML email
map JSON response bằng tay
```

Controller/binding nên nhận input typed; Service giữ điều phối nghiệp vụ; pricing rule/notification formatting có thể có owner riêng; Repository giữ truy cập dữ liệu. Nhưng không tách mọi dòng thành service mới. Trước hết lập contract và giữ thứ tự side effects.

## 2. Extract Method: thay hình thức, giữ trình tự

```text
Trước: create chứa cả đoạn kiểm SKU.
Sau: create gọi ensureSkuAvailable(sku), helper chứa nguyên đoạn kiểm đó.
```

An toàn tương đối khi input/output và exception được giữ. Kiểm xem helper có đọc biến mutable/class field, dùng transaction hay thực hiện query bổ sung không. Không biến kiểm trùng SKU thành “nếu trùng thì tự đổi SKU” trong cùng refactor; đó là behavior change.

Extraction có thể chỉ cải thiện khả năng đọc, chưa đổi architecture. Nếu method mới chỉ tên `step1`, `step2`, abstraction chưa giải thích domain. Nếu nó cần 12 tham số, có thể đang thiếu một concept khác, không cứ thêm tham số mãi.

## 3. God Class: nhiều lý do thay đổi không liên quan

`ShopcoreManager` quản lý Product CRUD, mã hóa token, upload, email HTML, report SQL và config cloud là ví dụ giả định. Khi đổi JWT lẫn giá lẫn email đều chạm cùng class, cohesion thấp và test setup kéo mọi dependency.

Tách theo responsibility/owner thực: `ProductService`, `TokenService`, `NotificationFormatter` khi chúng thật sự khác boundary. Không tách theo số dòng thành `ManagerPart1`/`ManagerPart2`; không bắt mỗi method một interface.

Một GlobalExceptionHandler có nhiều method **cùng trách nhiệm map exception→HTTP** chưa tự là God Class. Nhiều handler cùng file có thể hợp lý; đánh giá reason-to-change, không số annotation. Source hiện tại của bạn có handler kiểu này, bài không tự kết luận nó phải chia nhỏ.

## 4. Feature Envy: rule biết quá nhiều dữ liệu của người khác

Tình huống giả định: `InvoiceService` truy cập hàng loạt field Product để tính “product có đủ điều kiện discounted price không?”, cùng rule lặp ở ba nơi. Có thể behavior thuộc `PricingPolicy` hoặc Product/domain object tùy ownership.

Nhưng `ProductMapper` đọc nhiều getter để tạo DTO là đúng chức năng mapping; không vì nhiều getter mà chuyển HTTP DTO mapping vào Entity. Validation input DTO cũng không tự thuộc Entity nếu đó là transport-specific rule.

Câu hỏi chọn nơi đặt rule:

1. Rule thuộc domain nào và ai quyết định nó?
2. Dữ liệu cần dùng có cùng owner không?
3. Di chuyển có tạo dependency Entity→HTTP/Repository không?
4. Thay đổi thường đi cùng phần nào?
5. Caller sau di chuyển đơn giản hơn hay phải kéo thêm nhiều dependencies?

DTO không bắt buộc có behavior phong phú; entity không nên tự gọi remote chỉ vì “để behavior gần data”. Giữ persistence và transaction boundary có chủ đích.

## 5. Di chuyển code trong Spring có rủi ro riêng

Nếu chuyển method sang bean khác, DI/visibility/proxy có thể thay. Nếu @Transactional chuyển thành private/self-invocation, transaction có thể không hoạt động như trước trong proxy mode. Đừng bỏ annotation hoặc boundary vì helper “ngắn rồi”.

Một thao tác save rồi notify trước đây cùng method, tách service không tự bảo đảm notify sau commit. Thay timing, transaction hoặc retry là behavior/architecture change cần thiết kế và test riêng, không ngụy trang thành Extract Class thuần.

## 6. Một smell có thể có nhiều giải pháp

| Tín hiệu | Thử trước | Khi nào không làm |
|---|---|---|
| Hàm trộn validation/mapping/IO | Extract các concept rõ | Tách làm call graph khó theo hơn |
| Class nhiều reasons-to-change | Extract class theo owner | Chỉ dài vì nhiều case cùng trách nhiệm |
| Rule lặp và đọc sâu dữ liệu khác | Move behavior về owner/policy | Mapper đọc field đúng nhiệm vụ |

Không bắt chọn “một đáp án pattern duy nhất”. Giải thích cost và preserve contract quan trọng hơn tên refactoring.

## 7. Bài tập quan sát

Chọn đoạn giả định create ở đầu bài: đề xuất hai extraction, nêu responsibility, dependencies và test bảo vệ. Sau đó đưa một trường hợp giữ nguyên class là hợp lý. Nếu source thật chưa có smell, không bịa “đã sửa 5 smells” để hoàn tất checklist.

## 8. Đi từng bước qua một Extract Method

Ví dụ sau là **fragment giả định trong cùng ProductService**, dùng class DTO/getter theo style của bạn. Repository, model và mapper đã tồn tại; đây không phải một file Java độc lập để chạy hoặc code hiện có trong shopcore.

Trước:

```java
public ProductResponse create(CreateProductRequest request) {
    if (productRepository.existsBySku(request.getSku())) {
        throw new AppException(ErrorCode.DUPLICATE_SKU);
    }
    Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
    Product product = toProduct(request, category);
    Product saved = productRepository.save(product);
    return toResponse(saved);
}
```

Sau, chỉ tách hai bước đã có:

```java
public ProductResponse create(CreateProductRequest request) {
    ensureSkuAvailable(request.getSku());
    Category category = getRequiredCategory(request.getCategoryId());
    Product product = toProduct(request, category);
    Product saved = productRepository.save(product);
    return toResponse(saved);
}

private void ensureSkuAvailable(String sku) {
    if (productRepository.existsBySku(sku)) {
        throw new AppException(ErrorCode.DUPLICATE_SKU);
    }
}

private Category getRequiredCategory(Long categoryId) {
    return categoryRepository.findById(categoryId)
            .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
}
```

**Điều gì thực sự đổi?** Đoạn kiểm SKU và đoạn tìm Category được đặt tên. Chúng vẫn chạy ngay trên thread đang xử lý lời gọi; private helper không tạo request mới, thread mới, bean mới hoặc transaction mới. Khi helper return, Java tiếp tục dòng kế tiếp trong `create`. Khi helper throw, Java thoát theo exception, không tiếp tục save.

Trace ba đầu vào, với cùng state dữ liệu:

| Đầu vào | Các bước chạy theo thứ tự | Không được chạy |
|---|---|---|
| SKU trùng, Category cũng không tồn tại | existsBySku → throw DUPLICATE_SKU | findById, mapping, save |
| SKU chưa trùng, Category không tồn tại | existsBySku → findById → throw CATEGORY_NOT_FOUND | mapping, save |
| SKU chưa trùng, Category tồn tại | existsBySku → findById → toProduct → save → toResponse | Không thêm query/notify mới |

Đọc dòng đầu: nếu bạn “tiện tay” tìm Category trước, input có hai lỗi sẽ trả CATEGORY_NOT_FOUND thay vì DUPLICATE_SKU. Cả hai đều có vẻ hợp lý, nhưng không còn cùng behavior với bản trước. Đây là lý do test cần cả trường hợp **hai điều kiện cùng sai**, không chỉ từng lỗi riêng.

Safety net nên kiểm output/code của exception, save không chạy khi validation fail, số lần và thứ tự lời gọi liên quan. Với case hợp lệ, map response từ **saved**, không tự đổi sang object trước save vì Repository có thể gán id. Nếu method public đang có `@Transactional`, giữ annotation/boundary đó khi chỉ Extract Method; helper không tự nhận transaction chỉ vì được đặt tên mới.

Quan trọng: ví dụ ngắn này **không bắt buộc phải tách**. Lợi ích là tên bước rõ khi nhiều caller hoặc code dài hơn; chi phí là phải nhảy xuống helper. `existsBySku` rồi `save` cũng không tự chống race condition giữa hai request; uniqueness ở database là vấn đề riêng, không được tuyên bố extraction đã giải quyết nó.

## 9. Extract Class khác “chia file” như thế nào?

Giả định một Service đang vừa điều phối lưu Product vừa dựng nội dung email:

```text
Trước:
ProductService → kiểm rule → save → tự dựng HTML → gửi email

Sau, mục tiêu chỉ chuyển chỗ dựng nội dung:
ProductService → kiểm rule → save
               → ProductEmailFormatter.format(saved)
               → gửi email bằng nội dung vừa nhận
```

`ProductEmailFormatter` sở hữu **cách trình bày email**, không sở hữu quyền tạo Product, transaction hoặc thời điểm gửi. Nó có thể chỉ nhận dữ liệu cần hiển thị rồi trả String; không cần biết Controller/Repository. Khi đổi template email, bạn tìm formatter; khi đổi rule tạo Product, bạn tìm Service. Đó là lợi ích cohesion, không phải lợi ích “file dưới 100 dòng”.

Sau extraction, cần giữ cùng nội dung, cùng thứ tự save/format/send và cùng cách xử lý lỗi. Nếu formatter throw thì bản trước/sau đã lưu gì, có rollback hay không, có gửi gì chưa? Câu trả lời phụ thuộc transaction thật và phải kiểm; sơ đồ không chứng minh được rollback. Nếu tiện tay chuyển gửi email sang async/retry/sau commit, hãy tách thành thay đổi behavior riêng.

Không phải cứ thêm một class là tốt: nếu formatting chỉ một dòng không đổi và không lặp, thêm type/DI có thể tăng công đọc hơn lợi ích. Chọn abstraction vì một trách nhiệm đủ rõ và có pain point, không vì muốn “đúng pattern”.

Chốt: **Tách theo lý do thay đổi và ownership, không theo số dòng hay số getter.**
