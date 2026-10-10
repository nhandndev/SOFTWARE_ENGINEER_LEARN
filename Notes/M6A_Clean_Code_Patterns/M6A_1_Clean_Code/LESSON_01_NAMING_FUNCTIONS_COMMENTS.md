# Lesson 01 · Clean Code để đọc và sửa đúng, không để nhìn ngắn nhất

> Buổi 1 / 4h. Mục tiêu: chọn tên theo contract, chia function theo ý nghĩa, dùng comment giải thích quyết định. Không có luật cứng mọi method phải dưới X dòng.

## Tài liệu / video

- [Fowler: Code Smell](https://martinfowler.com/bliki/CodeSmell.html): smell là tín hiệu cần điều tra, không tự là lỗi.
- [Extract Function](https://refactoring.com/catalog/extractFunction.html): đặt tên cho một bước có ý nghĩa.
- [Refactoring overview](https://refactoring.com/): cấu trúc đổi, behavior giữ.
- Sách roadmap: *Clean Code*, Robert C. Martin, các chương Meaningful Names, Functions, Comments. Đọc như nguyên tắc có context, không checklist để làm nhỏ mọi thứ.

Video: tìm `clean code meaningful names extract method comments Java refactoring`. Ưu tiên before/after có giải thích trade-off, không chỉ đếm dòng.

## 1. “Code chạy được” mới giải một phần công việc

Bạn viết Service đúng hôm nay nhưng ba tuần sau đổi rule thì phải tìm nó ở đâu? Clean Code giảm công sức đọc, sửa, kiểm chứng. Một đoạn ngắn nhưng giấu side effects không tốt hơn đoạn dài hơn nói đúng việc.

Ví dụ `process(data, true)` không nói true là gì. `createProduct(request)` rõ hơn nếu thực sự tạo; `findProductById` không nên âm thầm tạo default product và gửi email. Tên là lời hứa với caller, không chỉ tiếng Anh đẹp.

## 2. Tên phải nói domain và đơn vị

| Mơ hồ | Rõ hơn khi đúng contract |
|---|---|
| `time` | `timeoutMillis` hoặc `Duration timeout` |
| `list` | `activeProducts` |
| `checkSku` | `existsBySku` nếu trả boolean; `validateSku` nếu throw khi sai |
| `getProduct` | `findById` trả Optional, hoặc `getRequiredProduct` throw khi thiếu |
| `update` | `updateProductPrice` nếu chỉ đổi giá |

Không đổi tên method thành “find” rồi vẫn throw mà không nói rõ. Vocabulary thống nhất trong team quan trọng hơn một convention tuyệt đối. Boolean như `isActive`/`hasStock` dễ đọc hơn `flag`; tránh double negative `!isNotAllowed`.

**Rename không chỉ sửa text:** IDE rename giúp sửa references trong code, nhưng tên JSON property, SQL column, config key, reflection, API path hoặc public library method có thể là contract bên ngoài. Đổi field DTO có thể đổi JSON và phá client. Tên private local thường rủi ro thấp hơn tên được serialize.

## 3. Function size: một ý chính ở một mức trừu tượng

Ví dụ pseudocode:

```java
public ProductResponse create(CreateProductRequest request) {
    ensureSkuAvailable(request.getSku());
    Category category = getRequiredCategory(request.getCategoryId());
    Product product = toProduct(request, category);
    Product saved = productRepository.save(product);
    return toResponse(saved);
}
```

Đọc từ trên xuống là một câu chuyện nghiệp vụ. Helper không tự phải là class/interface mới. Các dòng này không phải source hiện tại đã có; khi áp dụng phải khớp model/API thật.

Giải thích:

1. Tên bước cho biết vì sao đang làm việc, caller chưa phải đọc chi tiết query/mapping.
2. `ensureSkuAvailable` có side effect throw rõ theo contract; không được âm thầm sửa SKU hoặc save thêm row.
3. Mapping là mapping, không giấu lời gọi remote hoặc một query bổ sung bên trong getter.
4. Thứ tự validate/load/save giữ theo rule đã có; tách method không cho phép đổi error ưu tiên tùy ý.

Method 30 dòng xử lý một algorithm rõ có thể tốt hơn 10 helper một dòng khiến người đọc nhảy file liên tục. Tách khi có concept/testability/duplication đáng kể, không vì “đủ 10 dòng phải tách”.

## 4. Guard clause dễ đọc nhưng có thể đổi behavior

Trước:

```java
if (product != null) {
    if (product.isActive()) {
        return map(product);
    }
    throw inactiveError();
}
throw notFoundError();
```

Sau, về ý tưởng:

```java
if (product == null) {
    throw notFoundError();
}
if (!product.isActive()) {
    throw inactiveError();
}
return map(product);
```

Cùng thứ tự checks nên dễ giữ contract. Nhưng nếu mapper/log/DB call từng chạy trước một check, đổi vị trí return/check có thể đổi side effect/error. Kiểm input biên, null và interaction, không chỉ case happy path.

## 5. Comments: giải thích “vì sao”, đừng nói lại assignment

Comment hữu ích:

```java
// Keep the first validation error to preserve the existing API contract.
```

Đây là quyết định cần biết khi refactor handler; không có comment thì người sau có thể “cải tiến” trả tất cả lỗi và vô tình đổi contract.

Comment không hữu ích: `// set name` trước `setName(name)`. Comment sai/cũ còn nguy hiểm hơn không comment. TODO nên có lý do/điều kiện xử lý, không chỉ “fix later”. Không để block code bị comment lớn trong source thay cho Git history.

Self-documenting không có nghĩa cấm comment: tên tốt khó kể hết transaction workaround, business exception hoặc lý do không retry. Giữ comment ngắn, gần quyết định, cập nhật khi contract đổi.

## 6. Không nhầm ít code với ít complexity

Một stream chain có query trong mỗi map vẫn có thể N+1; đổi for thành stream không là tối ưu tự động. Lombok @Builder giảm boilerplate tạo object nhưng không tự đảm bảo invariant, naming hay separation of concerns. Không bắt bỏ Lombok chỉ để “clean”.

Một generic `CommonUtil.handleEverything(Object)` làm code ở caller ngắn nhưng có thể giấu type/side effects. Chỉ abstraction khi có cùng concept, không chỉ cùng vài dòng hình thức.

## 7. Bài tập đọc, không bắt rewrite project

Chọn một method đã có, nói bằng lời: input/output/error/side effect là gì? Đặt lại một tên private nếu chưa rõ; đề xuất một helper có concept thật; nêu một rename có thể phá contract JSON. Chưa sửa code thì ghi proposed, không ghi “refactor xong”.

Chốt: **Code rõ làm người đọc dự đoán được behavior; không chỉ làm người viết gõ ít hơn.**
