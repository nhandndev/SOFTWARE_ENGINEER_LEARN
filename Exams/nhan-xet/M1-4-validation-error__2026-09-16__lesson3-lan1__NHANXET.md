# Nhận xét bài kiểm tra M1-4 - Lesson 03

- **Bài kiểm tra:** [`M1-4-validation-error__2026-09-16__lesson3-lan1.md`](file:///Users/lilnhan/Downloads/SOFTWARE_ENGINEER_LEARN/Exams/de-kiem-tra/M1-4-validation-error__2026-09-16__lesson3-lan1.md)
- **Ngày chấm:** 2026-09-16
- **Tổng điểm thô:** 39 / 40 điểm
- **Điểm quy đổi (Thang 100):** **97.5 / 100 điểm**
- **Trạng thái:** 🟢 **ĐẠT** (≥ 85 điểm)

---

## Bảng điểm chi tiết từng câuÍ

| Câu | Nội dung | Điểm tối đa | Điểm đạt | Nhận xét |
|:---:|---|:---:|:---:|---|
| **1** | Chọn cách validate SKU | 4 | **4.0** | Trả lời xuất sắc. Nêu rõ ưu điểm của `@ValidSku` giúp sạch DTO và tái sử dụng tốt. |
| **2** | Đọc annotation custom | 4 | **4.0** | Giải thích đúng chuẩn 3 annotation và hậu quả khi thiếu `validatedBy`. |
| **3** | Viết validator | 5 | **4.0** | Viết Regex rất chuẩn. Bị trừ 1đ vì thiếu check `value == null` trước `value.isBlank()` (sẽ bị NPE khi `value = null`). |
| **4** | Tách format và business | 4 | **4.0** | Phân biệt xuất sắc giữa Format Validation (400) và Business Validation (409). |
| **5** | Validator có gọi DB? | 3 | **3.0** | Tư duy Single Responsibility Principle (SRP) rất vững. |
| **6** | Exception bubble | 4 | **4.0** | Mô tả luồng trôi ngoại lệ qua Controller lên `@RestControllerAdvice` rất chuẩn. |
| **7** | RestControllerAdvice & ExceptionHandler | 4 | **4.0** | Nắm chắc vai trò các annotation trong Global Exception Handler. |
| **8** | Gom nhiều lỗi DTO | 4 | **4.0** | Nắm chắc cách dùng `putIfAbsent` để lọc câu lỗi đầu tiên. |
| **9** | Lập bảng mapping lỗi | 4 | **4.0** | Khắc phục chuẩn xác tên các Exception Class và HTTP Status Code. |
| **10** | Trace tổng hợp | 4 | **4.0** | **Rất ấn tượng!** Trace luồng từ Tomcat, FilterChain, DispatcherServlet đến HandlerAdapter cực kỳ sâu sắc. |

---

## 🔍 Chi tiết lỗi sai & Thắc mắc của học viên

### 1. Lỗi nhỏ ở Câu 3 (Cần lưu ý):
```java
// CODE CỦA BẠN:
if (value.isBlank()) { // ❌ Nếu value = null sẽ bị NullPointerException ngay lập tức!
    return true;
}

// SỬA CHUẨN:
if (value == null || value.isBlank()) { // ✅ Luôn check null trước
    return true;
}
```

### 2. Giải đáp thắc mắc ở Câu 2:
> *Hỏi: "Nếu thiếu `validatedBy` thì lỗi nổ ra là Unchecked hay Checked Exception?"*  
👉 **Giải đáp:** Khi bạn quên khai báo `validatedBy` hoặc cấu hình sai Bean Validation, Spring/Hibernate Validator sẽ ném ra **`ConstraintDefinitionException`**. Đây là một **Unchecked Exception** (kế thừa từ `RuntimeException`), xuất hiện ngay khi ứng dụng khởi chạy hoặc khi lần đầu validate field đó.

---

## 🎯 Kế hoạch tiếp theo
- Hoàn thành xuất sắc Lesson 03 với điểm số **97.5/100**.
- Chuyển sang **Lesson 04 - ProblemDetail & Mini Project** của Module M1-4.
