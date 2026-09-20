# Đề kiểm tra M1-4 - Lesson 04 (Tự luận Lý thuyết)

> **Trọng tâm:** Chuẩn phản hồi lỗi `ProblemDetail` (RFC 7807) & Tư duy HTTP Status.  
> **Tổng điểm thô:** 40 điểm (Chấm xong sẽ normalize về thang 100).

---

## Câu 1 - Bản chất `ProblemDetail` (8đ)

`ProblemDetail` là chuẩn gì trong Spring Boot 3 (RFC nào)?  
Kể tên 4 thuộc tính cơ bản bắt buộc có trong đối tượng `ProblemDetail` phản hồi về cho Client.

**Trả lời:** ProblemDetail là  chuẩn RFC 7808 chuẩn theo quy định của IETF trong việc phản hồi khi phát sinh lỗi , trước đây là các mini project hay dự án nhỏ thì chúng ta dùng ApiResponse trả về lỗi nhưng mà đối với các dự án lớn . microservice thfi chúng ta sẽ bị một vấn đề khi ApiResponse đó là mỗi dự án có 1 kiểu trả về ApiResponse khác nhau nên là chúng ta sẽ cần phải parse lại , chính vì thế mà Problem detail nó ra đời để là 1 quy chuẩn chung .
4 thuộc tính cơ bản bắt buộc có là 

Type , Title , Status , Detail , Instance


---

## Câu 2 - So sánh `ApiErrorResponse` và `ProblemDetail` (8đ)

Vì sao trong dự án thực tế / microservices, Spring Boot 3 lại khuyến khích chuyển từ format tự chế `ApiErrorResponse` sang `ProblemDetail`? Đưa ra 2 lý do chính.

**Trả lời:**
thứ nhất là ApiErrorResponse là do dự án đó tự định nghĩa và có các attribute khác nhau nên là khi mà các dự án thực tế / microserice thfi cần phải gom lại từ nhiều service khác nhau nên cần phải có 1 cái quy chuẩn khi trả về lỗi . Thứ 2 là ApiErrrorResponse nó sẽ cần phải parse lại khi mà ta microservice hoặc mobile , và còn nhiều lý do lắm ( câu 1 tôi có nhắc tới)


---

## Câu 3 - Phân biệt Status Code & Exception (12đ)

Điền Exception Class và HTTP Status Code phù hợp vào bảng bên dưới:

| Tình huống lỗi | Exception Class | Status Code |
|---|---|:---:|
| SKU bị rỗng hoặc sai format | `____________________` | `____` |
| SKU bị trùng trong Database | `____________________` | `____` |
| CategoryId không tồn tại trong DB | `____________________` | `____` |
| Lỗi hệ thống `NullPointerException` | `____________________` | `____` |

**Trả lời:**

 câu này trả lời miết mà bắt trả lời lại hả
---

## Câu 4 - Trace luồng lỗi DTO với ProblemDetail (12đ)

Khi Client gửi Body sai format `{"sku": "abc 001"}` đến API `@PostMapping`, hãy mô tả xem: 
- Controller method có chạy không?
- Service layer có chạy không?
- Exception nào ném ra và Handler nào trong `GlobalExceptionHandler` sẽ bắt để đóng gói thành `ProblemDetail`?

**Trả lời:**

đầu tiên là client gửi reqeust xuống thì tomcat sẽ bắt và đi qua filter chain ( lớp bảo mật security) và đi đến dispatcher servlet và hanlder mapping sẽ map method phù hợp và chuyền về cho dispatcher servlet và nó tới handler dapter thì nó sẽ tới method phù hợp và dùng jackson đọc json và chuyển thành dto , nhưng mà thấy có @Valid nên nó sẽ kiểm tra các field phù hợp k , nó thấy sku gửi sai format nên là đi đến globalExceptionHandler để kiểm tra và nó sẽ đi vào method có @ExceptionHandler(MethodArgumentNotValidException.class) và trả về cho client và trong đó có có ResponseEntity<ProblemDetaiL> và nó trả về cho Client thôi . Controller và service khong ochayj nhé . 