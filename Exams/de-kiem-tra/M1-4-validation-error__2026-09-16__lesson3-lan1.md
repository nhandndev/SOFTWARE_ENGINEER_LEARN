# Bai kiem tra M1-4 - Lesson 03

> Trong tam: Custom Validator va Global Exception Handler.  
> Khong hoi lai cac cau co ban ve `@Valid`, `page=abc` hay `page=-1` da lam o Lesson 01-02.

## Huong dan

- Tra loi theo dung so cau.
- Uu tien giai thich luong va y nghia.
- Code mini co the viet theo style `class` + Lombok cua ban.
- Tong diem tho: 40 diem. Khi cham se normalize ve thang 100.

---

## Cau 1 - Chon cach validate SKU (4d)

SKU co rule:

```text
Chi gom A-Z, 0-9 va dau -
Dai tu 3 den 30 ky tu
Khong bat dau/ket thuc bang -
```

Ban se dung `@Pattern` hay custom `@ValidSku`? Giai thich khi nao custom validator dang gia tri hon.

**Tra loi:**
Thực chất là xài cả 2 đều được 
@Pattern nếu bạn muốn xài Annonation có sẵn và dùng regex là sẽ được , tuy nhiên thì độ dài của annonation đó sẽ khá dài vì Chi gom A-Z, 0-9 va dau -
Dai tu 3 den 30 ky tu
Khong bat dau/ket thuc bang - , chưa kể là annonation nó có quá nhiều thông tin thì nên custom 
@ValidSku thì sẽ che dấu được độ dài của regex , sẽ có thể tái sử dụng được ở field khác hoặc param ( tuỳ vào scope xử dụng của nó) . trong trường hợp này tôi sẽ custom @Valid Sku

---

## Cau 2 - Doc annotation custom (4d)

Giai thich y nghia cua:

```java
@Constraint(validatedBy = ValidSkuValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
```

Neu thieu `validatedBy` thi Bean Validation biet phai goi class nao khong?

**Tra loi:**
@Constraint(validatedBy = ValidSkuValidator.class) cho biết là nó sẽ được validated bởi class nào , class này là ValidSkuValidator.class
@Target(ElementType.FIELD) là được xử dụng ở đâu , trường hợp này là annonation được áp dụng vô các field 

@Retention(RetentionPolicy.RUNTIME) là cái annonation này sẽ được chính sách giữ như nào , ở đây là RunTIme là trong runtime còn giữ lại annonation này  . nếu thiếu validatedBy thì Bean Validation sẽ không biết gọi calss nào để thực thi hết ( cho tôi hỏi là unchecked hay checked error vậy)
---

## Cau 3 - Viet validator (5d)

Viet than method:

```java
public boolean isValid(String value, ConstraintValidatorContext context)
```

voi quy tac:

```text
null/blank de @NotBlank xu ly
gia tri hop le: KB-001, ABC123
gia tri sai: abc-001, ABC 001, -ABC, ABC-
```

Khong can viet lai ca annotation.

**Tra loi:**
package com.nhan.identity_service.exception;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidSkuValidator implements ConstraintValidator<ValidSku, String> {
    private static final String SKU_PATTERN = "^[A-Z0-9](?:[A-Z0-9-]{1,28}[A-Z0-9])?$";
    @Override
    public boolean isValid(String value , ConstraintValidatorContext context) {
        if(value.isBlank()){
            return true;
        }
        return value.matches(SKU_PATTERN);
    }
}


---

## Cau 4 - Tach format va business (4d)

Hai request deu co SKU `KB-001` dung format:

```text
A: SKU chua ton tai trong database
B: SKU da ton tai trong database
```

Request B nen bi phat hien o custom validator hay Service? Status code nao? Vi sao?

**Tra loi:**A: SKU chua ton tai trong database nên được phát hiện ở custom validator vì đây giống như là lớp bảo mật đầu tiên phải đúng với lại các ràng buộc lên field này để đúng đắn tính dữ liệu , status sẽ là 400 và nó sẽ quăng ra lỗi là validation gì đó ( thường thường k ai nhớ lỗi đâu , 1 phần trong lỗi là dc r )

Sku đã tồn tại trong database nên được phát hiện ở Service vì nó đụng tới logic nghiệp vụ r , nó đã được tồn tại trong database thì nó đã đi qua được các bước valid dữ liệu r thì sẽ bị lỗi ở phần bussiness logic , tịnh đúng đắng của bussiness để phù hơp với lại ứng dụng mình làm , trả về lỗi 409 conflict 
---

## Cau 5 - Validator co duoc goi database? (3d)

Vi sao khong nen viet `productRepository.existsBySku(...)` ben trong `ValidSkuValidator`?

Hay neu mot hau qua neu tron hai trach nhiem nay.

**Tra loi:**
cái existsbySku thì nên ở trong phần service xử lý bussiness logic , trong ValidSkuValidator là custom annonation nên làm theo kiểu là nơi kiểm tra đầu tiên về tính đúng đắn của format thôi , nó cần phải kiểm tra tính đúng đắn dữ liệu , đúng đắn về format , data type , ... để chia responsiblity ra , để tái xử dụng ở các field khác , còn những thứ check bussiness logic thì nên để trong service vì mỗi ứng dụng hay là mỗi feature thì có khi là cái logic nó sẽ khác . Tóm lại nên phân tách ra được các responsiblity ra không được để cho nó đảm nhiệm quá nhiều vai trò 
---

## Cau 6 - Exception bubble (4d)

Service viet:

```java
if (productRepository.existsBySku(request.getSku())) {
    throw new AppException(ErrorCode.DUPLICATE_SKU);
}
```

Hay mo ta exception di tu Service len `GlobalExceptionHandler` nhu the nao. Controller co can `try/catch` khong?

**Tra loi:**đầu tiên là Service ở khúc đó là qua được phần if đúng không , thấy là nó thoã mãn điều kiện if thì nó sẽ throw ra AppException , khi mà throw thì nó sẽ bubble up lên và ra được controller và tới phần restcontrolleradvice sẽ đảm nhiệm phần này , restcontrolleradvice là kết hợp giữa controlleradvice và responsebody thì nó sẽ đảm nhiệm phần xử lý lỗi , nó thấy AppException thì nó sẽ có cái Exceptionhandler là AppException.class. thì nó sẽ biết được rằng là nó sẽ dựa vào code của Exceptionhandler AppException.class để mà làm , thì ErrorCode là thứ code lỗi do mình tự định nghĩa trong dự án thì nó chứa các thông tin cần thiết như status , message và nó sẽ return lại theo responseEntity , đóng gói lại thành json và gửi về cho client
. Controller không cần phải try catch vì thứ nhất là chia trách nhiệm ra. thứ 2 là sẽ bị lỗi code dài dòng và phức tạp ? mắc gì phải try catch 
---

## Cau 7 - `@RestControllerAdvice` va `@ExceptionHandler` (4d)

Giai thich:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<?> handleAppException(AppException exception) {
        return ...;
    }
}
```

Moi annotation/class o day co vai tro gi?

**Tra loi:**
@RestcontrollerAdive là annonation báo cho Spring biết là khi có ngừoi nào throw ra lỗi thì nơi này sẽ là nơi tụ tập để mà xử lý lỗi .
@ExceptionHandler (AppException.Class) là anoonation báo rằng là khi có người throw lỗi liên quan đến AppException thì nó sẽ bắt và xử lý , nó sẽ trả về ResponseEntity và pảa là AppException ( sẽ chứa ErrorCode và trong Errorcode có status , message , nói chung do dev tự định nghĩa)

---

## Cau 8 - Gom nhieu loi DTO (4d)

Request co ba loi:

```text
sku rong
name rong
price am
```

Handler `MethodArgumentNotValidException` nen lay loi o dau va tra response co dang nao? Hay giai thich tac dung cua `putIfAbsent`.

**Tra loi:** nên lấy lỗi ở method handleMethodArgumentNotValid trong Restcontroleradvice , theo như kinh nghiệm của tôi thì là nó sẽ có 1 cái class là GlobalExceptionHandler để xử lý lỗi và có annonation @Restcontrolleradvice thì nó sẽ xử lý ExceptionHanlder(MethodArgumentNotValidException.class) sau đó là nó sẽ trả về một cái responseEntity và trong method , quang trọng theo tôi nghĩ là cái message để trong cái Annonation , nên là String errorCode = exception.getFieldError().getDefaultMessage(); để lấy được mesage và trả về một cái error code phù hợp với lại cái error và bọc ResponseEntity trả về code là 400 và message là errorCode . putIfAbsent khi mà nó vi phạm nhiều lỗi cùng lúc thì nếu ta hiển thị hết ( nếu vậy thì tôi sẽ xử lý là lưu trữ dưới dạng map<String,String> và sẽ getBinding ) và putIffAbsent sẽ chri lấy đúng lỗi đầu tiên .

---

## Cau 9 - Lap bang mapping loi (4d)

Dien handler va status phu hop:

| Tinh huong | Handler/Exception | Status |
|---|---|---:|
| SKU sai format |  |  |
| SKU bi trung |  |  |
| Category khong ton tai |  |  |
| Loi khong du kien |  |  |

**Tra loi:**

---
| Tinh huong | Handler/Exception | Status |
|---|---|---:|
| SKU sai format | MethodArgumentNotValidException  | 400|
| SKU bi trung | trong service sẽ có hàm đẻ check exists và check là AppException| 409 |
| Category khong ton tai | trong service sẽ có hàm đẻ check exists và check là AppEXception |  404|
| Loi khong du kien | là lỗi fallback cuối cùng là Exception thì thường tôi hay để vẫn là AppException có ErrorCode để nói riêng lỗi này là 9999 |  500|
## Cau 10 - Trace tong hop (4d)

Voi endpoint:

```text
POST /api/products
```

Hay trace day du hai request:

### Request A

```json
{
  "sku": "abc 001",
  "name": "Keyboard",
  "price": 1000,
  "categoryId": 1
}
```

### Request B

```json
{
  "sku": "KB-001",
  "name": "Keyboard",
  "price": 1000,
  "categoryId": 1
}
```

Gia su Request B co SKU da ton tai.

Phai noi duoc:

```text
Validator nao chay?
Controller method co chay khong?
Service co chay khong?
Exception nao?
Handler nao bat?
Status nao?
```

**Tra loi:**

Ở request A thì validator của cái sku nó sai , lỗi của nó sẽ đi như sau : 
- đầu tiên là request sẽ đi từ client qua tomcat , filter chain và tới dispatcher servlet , nó sẽ dùng mapping handler để tìm method phù hợp và qua adapter handler và nó chuyển từ json thành dto và bắt gặp @Valid thì nó sẽ check Annonation trong dto , thì thấy Sku không hợp lệ thì nó sẽ đi qua RestControllerAdvice và nó sẽ tìm ExceptionHandler để mà xử lý , nên là controller , serivce , repo không chạy nhé . Exception sẽ là MethodArgumentNotValidException và Handler của nó là handleMethodArgumentNotValid . Status là 400
Request B thì luồng nó sẽ đi đầu tiên là request sẽ đi từ client qua tomcat , filter chain và tới dispatcher servlet , nó sẽ dùng mapping handler để tìm method phù hợp và qua adapter handler và nó chuyển từ json thành dto và bắt gặp @Valid thì nó sẽ check Annonation trong dto  và nó hợp lệ nên là chuyển từ json thành dto được và đi vào controller và đi đến service , service sẽ có các code xử lý nghiệp vụ thì nó xử lý việc là trùng thì sẽ có hàm if kiểm tra và nó throw ra AppException với ErrorCode là duplicatedSku thì nó sẽ bubble up đi lên ngược lại vô class GlobalExceptionhandler vì có annonation RestControllerAdvice và nó sẽ dưạ vào ExceptionHandler(Appexception.class) mà xử lý , nó sẽ phân giải errorcode để đưa message và status code phù hợp , lỗi code là 409 .
