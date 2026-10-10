# M6A-1 Clean Code · Lesson 1 · Naming, functions và comments

Ngày soạn: 2026-10-07. Chế độ PHONG_VAN: 8 tình huống × 5 = 40 điểm; đạt từ **34/40**. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/LESSON_01_NAMING_FUNCTIONS_COMMENTS.md). Trả lời bằng ý hiểu hoặc pseudocode, không ép thuộc tên API. Mỗi ý trong “Cần nói đủ” là 1 điểm; đúng một phần 0,5. Đề theo lesson, không phải DAY_DU cuối module; không tự xác nhận capstone/deliverable đã hoàn thành.

## Câu 1 · Tên không nói behavior (5đ)

Một method process(data,true) có thể save DB và gửi email, nhưng caller không biết true nghĩa gì. Bạn review như thế nào?

**Cần nói đủ:**

- Tên nên diễn đạt intent/domain nào?
- Boolean flag gây khó đọc ra sao?
- Cần xác định contract nào trước?
- Save/email nên được thể hiện thế nào với caller?
- Bạn chọn tên/signature theo tiêu chí gì?

**Trả lời:**

## Câu 2 · Rename field DTO (5đ)

DTO đang serialize price. Developer rename field thành productPrice bằng IDE rồi gọi đó là private cleanup, chưa kiểm JSON.

**Cần nói đủ:**

- IDE rename chứng minh được gì và chưa được gì?
- Field này có thể liên quan contract nào?
- Bạn kiểm serialization/binding/client ra sao?
- Cần giữ schema hay có kế hoạch đổi thế nào?
- So sánh rủi ro với rename private local.

**Trả lời:**

## Câu 3 · Function dưới10 dòng? (5đ)

Method30 dòng xử lý một concept rõ; bản mới thành12 helper step1/step2 khó theo. Team nói ít dòng/method chắc clean hơn.

**Cần nói đủ:**

- Bạn đánh giá ngưỡng số dòng thế nào?
- Chia theo concept/mức trừu tượng ra sao?
- Tên helper cần giúp người đọc hiểu gì?
- Chi phí indirection là gì?
- Bạn giữ hay tách method với lý do nào?

**Trả lời:**

## Câu 4 · Guard clause đổi thứ tự lỗi (5đ)

Code cũ check product null rồi active, mới đổi active trước null để return sớm. Người viết bảo chỉ giảm nesting.

**Cần nói đủ:**

- Null access có thể xảy ra ở đâu?
- Thứ tự checks ảnh hưởng contract thế nào?
- Not-found/inactive errors cần giữ điều gì?
- Side effects quanh checks cần xem gì?
- Nêu test cases trước/sau.

**Trả lời:**

## Câu 5 · Comment nào đáng giữ? (5đ)

Có comment set name và comment Keep first validation error to preserve API contract. Team muốn xóa mọi comment vì self-documenting.

**Cần nói đủ:**

- Comment narration có giá trị gì?
- Comment về lý do/contract có giá trị gì?
- Tên tốt có thay mọi comment không?
- Bạn tránh comment stale thế nào?
- TODO/code bị comment nên được xử lý ra sao?

**Trả lời:**

## Câu 6 · getProduct tự tạo dữ liệu (5đ)

getProduct(id) không thấy thì tạo row default và notify, còn findById trả Optional. Hãy giải thích vì sao caller dễ sai.

**Cần nói đủ:**

- Tên method nói read/command thế nào?
- Missing result có các contract nào cần rõ?
- Tạo row/notify thay đổi gì với caller?
- Bạn đề xuất giữ/đổi/tách behavior ra sao?
- Vai trò convention thống nhất là gì?

**Trả lời:**

## Câu 7 · Lombok và stream là clean tự động? (5đ)

Đã dùng @Builder và stream.map nhưng mỗi map gọi repository. Team nói code ngắn nên đã sạch và nhanh.

**Cần nói đủ:**

- Builder giúp và chưa giúp điều gì?
- Stream ảnh hưởng query/performance thế nào?
- Repository call trong map tạo rủi ro gì?
- Bạn đánh giá readability/behavior theo gì?
- Cần evidence nào thay cho đếm dòng?

**Trả lời:**

## Câu 8 · Tên đơn vị và generic util (5đ)

Một CommonUtil.handleEverything(Object) đọc time=30 rồi dùng như milliseconds dù caller nghĩ seconds.

**Cần nói đủ:**

- Rủi ro ambiguity đơn vị là gì?
- Tên/type nào làm đơn vị rõ hơn?
- Object/generic util ảnh hưởng type/intent ra sao?
- Khi nào abstraction thật sự có ích?
- Nếu đổi đơn vị cần kiểm boundary nào?

**Trả lời:**
