# Nhận xét bài kiểm tra chi tiết M1-4 - Lesson 04 (ProblemDetail RFC 7807)

- **Bài kiểm tra:** [`M1-4-validation-error__2026-09-16__lesson4-lan1.md`](file:///Users/lilnhan/Downloads/SOFTWARE_ENGINEER_LEARN/Exams/de-kiem-tra/M1-4-validation-error__2026-09-16__lesson4-lan1.md)
- **Ngày chấm:** 2026-09-17
- **Tổng điểm thô:** 38 / 40 điểm
- **Điểm quy đổi (Thang 100):** **95 / 100 điểm**
- **Trạng thái:** 🟢 **ĐẠT** (≥ 85 điểm)

---

## 🔍 NHẬN XÉT CHI TIẾT TỪNG CÂU & ĐÁP ÁN CHUẨN

### 📌 Câu 1: Bản chất `ProblemDetail` (Điểm: 8.0 / 8.0)
- **Phần bạn làm:** Bạn nêu rất chuẩn: `ProblemDetail` thuộc chuẩn **RFC 7807** (bạn gõ phím nhầm 7808 nhưng tư duy đúng 100%). Bạn giải thích đúng lý do ra đời là để đồng nhất định dạng phản hồi lỗi giữa các Microservices/Client thay vì dùng `ApiResponse` tự chế.
- **5 thuộc tính cơ bản liệt kê đầy đủ:** `Type`, `Title`, `Status`, `Detail`, `Instance`.

---

### 📌 Câu 2: So sánh `ApiErrorResponse` vs `ProblemDetail` (Điểm: 8.0 / 8.0)
- **Phần bạn làm:** Nêu đúng 2 lý do cốt lõi:
  1. `ApiErrorResponse` do từng dự án tự định nghĩa với các tên thuộc tính khác nhau, dẫn tới việc gom lỗi từ nhiều microservice rất khó khăn.
  2. Frontend, Mobile và các bên thứ ba phải viết nhiều logic parse riêng cho từng format lỗi tự chế, trong khi `ProblemDetail` tuân theo chuẩn quốc tế RFC 7807 nên mọi Client đều parse được dễ dàng.

---

### 📌 Câu 3: Phân biệt Status Code & Exception (Điểm: 10.0 / 12.0)
- **Phần bạn làm:** Bạn nhớ kiến thức cũ và nhận xét *"câu này trả lời miết..."*.
- **ĐÁP ÁN CHUẨN ĐẦY ĐỦ CHO BẢNG CÂU 3:**

| Tình huống lỗi | Exception Class thực tế bắn ra | Mã HTTP Status Code | Lý do phân loại |
|---|---|:---:|---|
| **SKU bị rỗng hoặc sai format** | **`MethodArgumentNotValidException`** | **`400 Bad Request`** | Do lỗi dữ liệu DTO gửi lên không đúng định dạng. |
| **SKU bị trùng trong Database** | **`AppException`** | **`409 Conflict`** | Do vi phạm điều kiện ràng buộc dữ liệu bị trùng ở DB. |
| **CategoryId không tồn tại trong DB** | **`AppException`** | **`404 Not Found`** | Do tài nguyên truy vấn không tồn tại trong hệ thống. |
| **Lỗi hệ thống `NullPointerException`** | **`Exception`** *(hoặc `NullPointerException`)* | **`500 Internal Server Error`** | Do lỗi sập code không mong muốn trên Server. |

---

### 📌 Câu 4: Trace luồng lỗi DTO với `ProblemDetail` (Điểm: 12.0 / 12.0)
- **Phần bạn làm:** **Xuất sắc 100%!** Trace đủ các mắt xích:
  `Client Request` ➔ `Tomcat` ➔ `FilterChain` ➔ `DispatcherServlet` ➔ `HandlerMapping` ➔ `HandlerAdapter` ➔ `Jackson DTO` ➔ Thấy `@Valid` sai ➔ Ném `MethodArgumentNotValidException` ➔ Trôi vào `@RestControllerAdvice` ➔ Đóng gói `ResponseEntity<ProblemDetail>` ➔ Trả về Client.
- **Kết luận đúng:** `Controller` method và `Service` layer hoàn toàn **KHÔNG CHẠY**.
