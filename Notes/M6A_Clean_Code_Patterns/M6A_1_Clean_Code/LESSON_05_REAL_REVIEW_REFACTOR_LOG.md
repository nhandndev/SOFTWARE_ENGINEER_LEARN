# Lesson 05 · Review code thật, ghi refactor log và biết khi nào dừng

> Buổi 5 / 4h. Mục tiêu: áp dụng lập luận vào code bạn đã làm, phân biệt quan sát thật với ví dụ, lập một thay đổi nhỏ kiểm chứng được. Bài không tự sửa/nộp project thay bạn.

## Tài liệu / video

- [Refactoring catalog](https://refactoring.com/catalog/): chọn thao tác theo vấn đề, không cố dùng hết catalog.
- [Extract Function](https://refactoring.com/catalog/extractFunction.html): gom đoạn có cùng ý nghĩa.
- [JUnit guide](https://docs.junit.org/current/user-guide/): dùng assertion để bảo vệ contract đã nêu.
- Code thật: `shopcore/src/main/java/com/shopcore/common/GlobalExceptionHandler.java`. Đọc bản mới nhất trong IDE trước khi áp dụng đề xuất. Bản copy tài liệu project trong Vault nằm ở `Software_Engineer/Projects/shopcore`, không phải project có thể build đầy đủ.

Video: tìm `small refactoring commits characterization tests code review before after`. Ưu tiên walkthrough giải thích khi test fail thì xử lý thế nào.

## 1. Một observation có thật tại thời điểm soạn

Handler của bạn dùng `ApiErrorResponse.builder().code(...).message(...).build()` rồi `ResponseEntity.status(...).body(...)` ở nhiều method. Đây là duplication có thể cân nhắc gom. Nó **không chứng minh** cả class là God Class, và không có nghĩa handler hiện tại sai chức năng.

Contract cần giữ:

- AppException lấy business code/message/status từ ErrorCode.
- Validation trả HTTP 400, code theo hiện tại và lấy message từ lỗi field đầu tiên/fallback.
- Invalid parameter và unreadable body có ErrorCode riêng.
- Uncategorized exception dùng generic error và log stack trace server-side như hiện tại, không đưa stack trace vào JSON.
- Các @ExceptionHandler cụ thể phải giữ mapping, không thay tất cả thành một handler chung trả 400.

Đây là quan sát source, chưa phải kết quả chạy API/đo benchmark. Nếu bạn sửa file sau đó, review lại, đừng áp mẫu dựa trên phiên bản cũ.

## 2. Một extraction nhỏ đề xuất

Đoạn minh họa chỉ là helper, không phải replacement đầy đủ của class:

```java
private ResponseEntity<ApiErrorResponse> errorResponse(
        int code, String message, HttpStatus status) {
    ApiErrorResponse body = ApiErrorResponse.builder()
            .code(code)
            .message(message)
            .build();
    return ResponseEntity.status(status).body(body);
}
```

Ví dụ AppException handler vẫn tự lấy ErrorCode và gọi helper với đúng ba giá trị. Validation vẫn tự chọn first message rồi đưa vào helper; không bắt ErrorCode chứa mọi framework error nếu style của bạn tách business/framework errors.

Lợi ích: builder/response construction tập trung. Chi phí: thêm một method và ba tham số dễ truyền nhầm nếu đặt tên tệ; có thể giữ nguyên nếu repetition ít/đọc rõ hơn. Không cần tạo ErrorResponseFactory bean/interface chỉ cho vài dòng này.

## 3. Test phải bảo vệ điều gì?

| Trường hợp | Check quan trọng |
|---|---|
| Một AppException đã có enum | HTTP status, body code, message đúng enum |
| Một field validation error | 400 và message theo contract hiện tại |
| Không có field error/message dùng được | Fallback như bản trước |
| Parameter sai / JSON không đọc được | Giữ code riêng, HTTP 400 đúng mapping |
| Runtime exception không biết | Generic response, không lộ secret/stack trace; log theo policy hiện tại |

Chọn actual enum/error của source mới nhất. Kiểm response JSON và status bằng test thích hợp; unit gọi method không tự chứng minh Spring MVC chọn đúng handler. Nếu đang thiếu MVC tests, ghi gap, không claim “compile được nên behavior giữ”.

## 4. Phân loại thay đổi để không tự đánh lừa

| Đề xuất | Loại |
|---|---|
| Gom builder giữ code/message/status | Refactor candidate |
| Trả tất cả validation errors thay vì first | API behavior change |
| Thêm requestId vào JSON mới | Contract enhancement, cần tương thích |
| Đổi business not-found 404 thành 400 | Behavior change |
| Xóa logging để code gọn | Đổi observability behavior/policy |

Không đánh giá tốt/xấu chỉ từ tên loại: behavior change có thể cần, nhưng phải được yêu cầu và có test riêng. Đừng gom nó vào commit refactor để reviewer không thấy.

## 5. Refactor log là bằng chứng, không bản quảng cáo

Mỗi entry nên có source/line hoặc commit trước, smell/evidence, mục tiêu, phạm vi không đổi, transformation, tests trước/sau, điều chưa test và quyết định keep/revert. Dùng [template](REFACTOR_LOG_TEMPLATE.md).

Ví dụ trạng thái trung thực:

```text
Status: Proposed, chưa sửa source.
Evidence: duplicated ApiErrorResponse construction trong handler.
Change: extract private errorResponse, giữ từng handler/annotation.
Validation planned: HTTP code/message/status cho các nhóm lỗi trong bảng.
Not verified: MVC integration và regression suite của shopcore.
```

Không điền PASS nếu chưa chạy. Test policy phí giao hàng ở Lesson 04 chạy xanh chỉ chứng minh mẫu policy đó, không phải handler/shopcore của bạn đã xanh. Nếu deliverable cần ≥5 smell thật, phải tìm ≥5 vấn đề có evidence thật; không chia một duplicated block thành năm “smells” để đủ số.

## 6. Khi nào dừng refactor?

- Mục tiêu đọc/sửa/test rõ hơn đã đạt; không còn complexity đáng kể cần thêm abstraction.
- Bước kế tiếp đòi đổi API/schema hoặc transaction: tách task riêng.
- Không có safety net cho vùng rủi ro: bổ sung evidence trước khi đi tiếp.
- Helper/factory làm caller khó hiểu hơn: cân nhắc inline/giữ cấu trúc cũ.

Reviewer cần thấy diff nhỏ và lý do cụ thể. Không Big Bang rewrite toàn shopcore, không đổi package/framework/metadata cùng lúc chỉ vì đang “làm sạch”. Giữ thay đổi của người dùng ngoài scope.

## 7. Liên hệ AI Engineer

Nguyên tắc cũng áp dụng pipeline AI: tách parse/input, retrieval, provider call và mapping khi có responsibility thật; không giấu network trong getter. Refactor không tự được đổi prompt template, model version, retry/timeout hoặc token limits vì chúng đổi behavior/cost. Dùng deterministic fake ở unit tests khi phù hợp và thêm integration/evaluation cho phần chất lượng model cần kiểm; không dùng unit test giả để claim model output tương đương.

## 8. Đọc extraction theo hai đường lỗi của chính bạn

Ví dụ từ source tại lúc rà soát, không phải kết quả chạy HTTP:

```text
Business: new AppException(ErrorCode.PRODUCT_NOT_FOUND)
→ handler AppException lấy enum
→ code 404, message "Product Not Found", status HTTP 404
→ helper chỉ dựng ApiErrorResponse và ResponseEntity
→ Spring MVC dùng message converter serialize body thành JSON
```

Framework validation:

```text
MethodArgumentNotValidException
→ handler validation đọc fieldErrors
→ chọn first error có trong danh sách rồi đọc defaultMessage
→ nếu không có field error hoặc defaultMessage null: "Validation failed"
→ code 400, HTTP 400
→ cùng helper dựng body/ResponseEntity
→ Spring MVC serialize body thành JSON
```

**Ai quyết định điều gì?** Handler quyết định code/message/status theo loại lỗi. Helper chỉ thực hiện công thức dựng response, không quyết định một business error có phải 400 hay không. Spring MVC xử lý việc chọn handler/ghi response, không phải helper tự gửi JSON qua socket. Đề xuất ở đây chỉ gom phần construction, không thay cơ chế xử lý exception của Spring.

“First” là phần tử đầu trong `getFieldErrors()` ở lần chạy đó, không có nghĩa chắc chắn là field đứng đầu trong file DTO. Source hiện tại dùng `findFirst().map(...).orElse(...)`: nếu message đầu tiên null, Optional map trở thành rỗng và dùng fallback; **không** đi tìm message của lỗi thứ hai. Nếu message đầu tiên là chuỗi rỗng, nó vẫn trả chuỗi rỗng. Đổi sang lọc bỏ mọi message null/rỗng rồi chọn lỗi kế tiếp là thay behavior, không chỉ gom builder.

Với unknown exception, giữ response generic theo enum UNCATEGORIZED_EXCEPTION (HTTP 500, body code 9999 trong source hiện tại); đừng mặc định body code luôn bằng HTTP status. Log stack trace vẫn ở server. Helper chung không cho phép bỏ logging hoặc trả thẳng `e.getMessage()` cho client.

## 9. Một vòng refactor nhỏ thực sự nên làm gì?

1. **Chốt mục tiêu:** chỉ giảm lặp construction, không sửa response schema hay error policy. Đọc lại source vì bạn có thể đã đổi nó sau ngày soạn.
2. **Ghi baseline:** HTTP status, body code/message của business, validation, parameter, unreadable và unknown. Phân biệt test dự kiến với test đã chạy; thiếu MVC tests thì ghi gap.
3. **Đổi một handler:** thêm helper, cho AppException handler gọi helper. Không chuyển annotation sang helper; helper không phải exception entry point.
4. **Chạy lại test liên quan:** nếu status/body khác thì tìm nguyên nhân ngay ở diff nhỏ. Đừng chuyển cả năm handlers rồi mới tìm regression.
5. **Đổi từng handler còn lại:** giữ cách chọn message, fallback và log ở từng nơi. Kiểm lại HTTP mapping, không chỉ trực tiếp gọi helper.
6. **Review diff và log:** không có API/enum/status mới ngoài yêu cầu? Test nào đã chạy, test nào chưa? Lợi ích có đáng thêm indirection không? Ghi keep/revert dựa trên kết quả thật.

Đây là kế hoạch cho **một candidate**, không lời khẳng định đã thực hiện. Năm lesson giúp bạn biết cách đánh giá; số lượng lesson hoặc điểm lý thuyết không thay thế evidence refactor thật trong deliverable roadmap.

Chốt: **Một refactor tốt có mục tiêu nhỏ, behavior được bảo vệ và log nói thật những gì đã/chưa kiểm chứng.**
