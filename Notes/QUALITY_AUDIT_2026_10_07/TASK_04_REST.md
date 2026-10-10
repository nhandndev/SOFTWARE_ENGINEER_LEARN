# Task 04 — REST best practices

Đã đọc 3 lesson, đối chiếu Câu 1–8 của từng đề và rubric (24 câu).

| Lesson | Kết quả đối chiếu |
|---|---|
| 01 | Resource/version/compatibility, safe vs idempotent, timeout sau commit, PUT/DELETE/PATCH đúng điều kiện |
| 02 | Tự tính data/filter/sort/page và count; binding khác range; allowlist; parent thiếu khác filter rỗng |
| 03 | ProblemDetail/error code, handler đúng tầng, status/header, thông tin nhạy cảm, HATEOAS nhận diện |

Không phát hiện lỗi cần sửa qua phần đã kiểm. Tính tay dataset L02: lọc Category1 còn 10/11/13, page0=[10,11], page1=[13], page2=[], total=3/pages=2. Count toàn bảng=5 là sai cho filter này. Tất cả vế rubric có cơ sở trong lesson/đề.

Policy thay đổi so với bài cũ (filter category thiếu trả 200 rỗng) được công bố, không khẳng định mọi policy khác sai HTTP. PUT thay writable representation, không bắt gửi mọi field DB. ProblemDetail không được bọc HTTP200/body404; Advice không bao mọi lỗi filter/startup/response đã commit.

Nguồn: [RFC9110](https://www.rfc-editor.org/rfc/rfc9110.html), [RFC9457](https://www.rfc-editor.org/rfc/rfc9457.html), [Spring MVC errors](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html).

Giới hạn: tính tay và kiểm code tĩnh, chưa chạy endpoints để xác minh serializer/Advice ordering. Đề là kiểm tư duy, không là bằng chứng deliverable đã hoàn thành.
