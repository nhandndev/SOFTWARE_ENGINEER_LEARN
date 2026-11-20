# Kiểm chất lượng M3-1 Lesson 02 — 2026-11-20

Phạm vi: [bài học mới](LESSON_02_PAGINATION_FILTER_SORT_CONTRACT.md), [đề 12 câu](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson2-lan2.md), [đáp án/rubric](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson2-lan2__DAPAN.md). Đây là báo cáo kiểm tài liệu, không phải snapshot chấm học viên.

## Task 1 — Phạm vi và năng lực hiện tại

- Đọc roadmap M3-1, tiến độ và kết quả Lesson01 đạt68,5/80.
- Bài tập trung pagination/filter/sort và contract DTO, không giảng lại 3-layer như kiến thức mới.
- Có code Controller/Service/DTO class; repository search được ghi rõ là hợp đồng cần query implementation, không giả vờ Spring tự suy ra tổ hợp filter.
- Không thêm security/ProblemDetail/cursor implementation/fetch/pool đang ngoài scope.
- Không đổi01/05 hoặc tự đánh dấu Lesson02/deliverable đã đạt khi chỉ soạn.

## Task 2 — Kiểm dữ liệu độc lập bằng chương trình

Đọc dataset sáu dòng từ chính đề, tính lại bằng Ruby, không lấy các số trong đáp án làm phép tính:

| Ca kiểm | Kết quả |
|---|---|
| Category1 AND price≥100, sortpriceASC/idASC | 10,11,13 |
| Page0/1/2, size2 trên tập trên | [10,11] / [13] / [] |
| Metadata tập trên | total3, pages2 |
| Category1 AND name chứa java | 10,13 |
| Category2 | 12,15 |
| Toàn bảng priceDESC/idASC | 13,10,11,15,12,14 |
| Trim JAVA và tìm không phân biệt hoa/thường | 10,13,15 |
| Chèn id9 trước requestpage1 | Page1[11,12], id11 lặp |
| Root IDs10,10,13 | Hai Product khác nhau |
| JSON mẫu trong bài học | Content10/11, page0,size2,total3,pages2 |

Tất cả assertion đã qua. Không nhầm unique order với snapshot giữa hai request. Ví dụ id9 ghi rõ là giả định chèn hợp lệ, không dạy sai cơ chế identity.

## Task 3 — Câu hỏi rõ và đã được dạy

- Có bảng dữ liệu ngay trong đề, không bắt mở bài học để tìm dataset.
- Có default/range/sort/tie-break/AND/status và schema response rõ ràng.
- Phân biệt policy riêng với chuẩn HTTP; category filter và parent route không bị dùng lẫn.
- Câu7 cho số điểm từng dòng, không bắt thuộc tên exception; tổng1+1+0,5+0,5+0,5+0,5+1=5.
- Câu9 cho Page đầu vào đủ metadata; không hỏi chữa một project thiếu class.
- Câu12 loại trừ lỗiDB/lazy để chỉ kiểm luồng list.
- Đáp án có bảng độ phủ mục bài học→câu hỏi; không có tiêu chí ngoài đề.

## Task 4 — Rubric và tài liệu liên quan

- 12 câu, mỗi câu5đ; tổng60đ; đạt51đ. Có12 dòng Trả lời và12 mục đáp án tương ứng.
- Chia điểm từng ý tổng5; có partial credit và không có veto “sai một câu là trượt”.
- QUY_TAC_CHAM/README/LESSON_PLAN đã dùng mẫu số đúng của từng bản đề, không giữ luật40đ cho đề60đ.
- Bài cũ được lưu ở file thêm __TRUOC_2026_11_20; đề cũ2026-10-07 không bị xóa/sửa bài làm.
- Kiểm tự động liên kết nội bộ, code fence cân bằng và JSON hợp lệ: qua.

## Task 5 — Nguồn và giới hạn xác minh

Đã mở nguồn chính thức:

- [Spring MVC RequestParam](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestparam.html): binding param.
- [Spring Data Page](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html): map và thông tin tổng.
- [Spring Data Web](https://docs.spring.io/spring-data/commons/reference/repositories/core-extensions.html): cảnh báo serialize PageImpl như contract ổn định.
- [PostgreSQL LIMIT/OFFSET](https://www.postgresql.org/docs/current/queries-limit.html): thứ tự xác định khi lấy lát dữ liệu.

Tài liệu current có thể khác phiên bản repo; lượt này không đổi dependency/BOM. Code chỉ là snippet để đọc; **chưa compile Java, chưa chạy Spring hoặc DB/API thực tế**. Phép tính đã được kiểm bằng chương trình, không được quảng cáo là integration test. Video là từ khóa tìm, chưa xem/xác minh video cụ thể.

## Kết luận

Đủ để học và làm đề Lesson02 theo roadmap hiện tại. Các giới hạn runtime được nêu rõ; không tuyên bố là bộ project chạy ngay. Đồng bộ Vault phải giữ cùng nội dung và sao lưu bản đích trước khi thay.
