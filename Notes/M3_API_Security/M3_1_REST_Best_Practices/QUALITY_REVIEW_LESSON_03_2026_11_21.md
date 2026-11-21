# Kiểm chất lượng Lesson 03 — 2026-11-21

> Báo cáo dưới ghi nhận **bản soạn12câu/60đ trước khi đổi hướng kiểm tra**. Bài học và kết quả compile giữ nguyên; đề hiện hành đã đổi thành8câu/40đ theo hướng hiểu rộng/nắm bản chất. Xem [kiểm chất lượng bản hiện hành](QUALITY_REVIEW_LESSON_03_TU_DUY_RONG_2026_11_21.md). Các mục số câu/rubric12câu bên dưới là lịch sử, không dùng làm mẫu số khi chấm đề mới.

Phạm vi: [bài học](LESSON_03_PROBLEMDETAIL_HATEOAS_REVIEW.md), [đề mới](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-21__lesson3-lan2.md), [đáp án/rubric](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-21__lesson3-lan2__DAPAN.md). Không phải kết quả chấm học viên.

## Task 1 — Context và roadmap

- Đọc AGENTS, prompt tạo đề, roadmap M3-1, tiến độ L01/L02 và format Lesson02 mới.
- Đọc AppException, ErrorCode, GlobalExceptionHandler, ApiErrorResponse và pom thật. Không giả định code hiện tại đã dùng ProblemDetail.
- Giữ AppException/ErrorCode, code số và extension errorKey riêng. Không bắt mọi framework exception thành business exception.
- Lesson03 chỉ error contract/luồng lỗi và HATEOAS nhận diện; không ép Security/JWT/OpenAPI/tracing implementation hoặc app mới.
- Lưu bản bài học cũ ở file thêm __TRUOC_2026_11_21. Đề cũ2026-10-07 và bài làm Lesson01/02 giữ nguyên.

## Task 2 — Kiểm bản chất và nguồn

- ProblemDetail là representation, không phải bộ bắt exception. Handler/resolver chịu trách nhiệm chuyển lỗi thành response.
- Phân biệt HTTP/body.status với code nghiệp vụ. Case500 có code9999, không HTTP9999.
- type là loại; instance là lần lỗi. Dùng URN riêng cho occurrence, không khẳng định path lặp là định danh duy nhất.
- RFC không bắt tất cả field luôn xuất hiện; đủ năm field là policy của bài. code/errorKey/errors/traceId là extension.
- HTTP/body.status khớp; error media type rõ; không bọc data trong contract mẫu. Success vẫn DTO.
- Đổi format lỗi có xét client cũ; dùng v2 mẫu để không dạy đổi lén v1. Không tự thay source/pom.
- Bảo toàn405/Allow trong tình huống đã cho; không lấy catch-all làm bảo đảm bao phủ filter/startup/Security/responsecommit.
- HATEOAS chỉ đọc relation/href; không khẳng định mọi JSON có url hoặc version là HATEOAS hoàn chỉnh.

Nguồn chính thức đã mở và đối chiếu:

- [RFC9457](https://www.rfc-editor.org/rfc/rfc9457.html): fields/instance/extension/security, thay RFC7807.
- [Spring MVC Error Responses](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html): ProblemDetail và built-in support; tài liệu current7.1 ghi instance không còn tự đặt path.
- [ProblemDetail API](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ProblemDetail.html): factory và properties extension.
- [ResponseEntityExceptionHandler API](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/servlet/mvc/method/annotation/ResponseEntityExceptionHandler.html): signature override và phạm vi.
- [ExceptionHandler](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-exceptionhandler.html): handler selection, không theo vị trí method trong file.
- [Spring HATEOAS](https://docs.spring.io/spring-hateoas/docs/current/reference/html/): links/relations.

## Task 3 — Biên dịch snippet thật, không chỉ nhìn code

Đã trích **nguyên class handler hoàn chỉnh trong Markdown** vào thư mục tạm, copy AppException/ErrorCode thật sang đó và compile:

- javac25.0.2 với --release21.
- Spring7.0.9 và Lombok1.18.46 lấy từ Maven cache hiện có, không tải thêm dependency.
- Compile thành công; có cảnh báo Unsafe từ Lombok trên JDK25, không có lỗi biên dịch.
- Thư mục tạm được dọn; không thay Java source hoặc pom của shopcore.

Đây là kiểm cú pháp/kiểu/API tương thích với bộ cache dùng để compile, **không phải kiểm cả BOM Boot4.1.1 của app và không phải integration test**. Chưa khởi động Spring, gọi HTTP hoặc kiểm serialization runtime. Bài đã ghi snippet chỉ minh họa hai nhánh; chưa tuyên bố mọi nhánh đã có extension theo policy.

## Task 4 — Kiểm đề và rubric riêng

- 12 câu×5đ=60đ; đạt51/60. Có12 ô Trả lời trống và12 mục đáp án tương ứng.
- Contract cho sẵn status/code/errorKey, media type, body shape và giả định validation/handler/filter.
- Câu3 cho rõ ba chỗ dừng, không ép thuộc exception name.
- Câu4 cấp sẵn type/title/detail/ID, không bắt tự đoán UUID.
- Câu6 cho đoạn handler sai cụ thể, giới hạn năm ý; không bắt sửa class/field bị ẩn.
- Câu7 giả định handler được chọn, tránh bài toán độ ưu tiên nhiều Advice chưa dạy.
- Câu8 chỉ nhận diện giới hạn, không yêu cầu cấu hình Security sớm.
- Câu12 là checklist kỳ vọng, không bắt viết JUnit.
- Rubric có partial credit, không luật ẩn “sai một câu trượt”; nội dung ngoài đề không thành tiêu chí.
- Bảng mục bài học→câu hỏi có trong đáp án; mọi câu đều có phần đã dạy.

## Task 5 — Kiểm tĩnh và dữ liệu

- Parse các JSON block của bài/đề/đáp án: hợp lệ. JSON hỏng cố ý ở HTTP example không bị nhầm thành sample JSON hợp lệ.
- Problem examples có status/code số; instance=urn:uuid:+traceId; validation errors có field/name message đúng.
- Ví dụ hypermedia có self và category link đúng resource.
- Kiểm code fences cân bằng và link nội bộ của các tài liệu hiện hành: qua.
- Hash 01_LO_TRINH và05_TIEN_DO trước/sau: không đổi. Không tự chấm điểm/tick Lesson03.

## Giới hạn và bàn giao

Bài mới, đề và đáp án đủ để học theo roadmap. Chưa xem/xác minh video cụ thể; chỉ có từ khóa tìm, tài liệu chính thức đã đối chiếu. Không nâng framework theo trang docs current. Khi chấm sẽ dựa đúng bản đề mới và lưu snapshot, không dùng bài cũ với tổng40đ để chấm bản60đ.

Đồng bộ Vault theo cơ chế hiện hành, sao lưu bản đích trước khi thay và kiểm byte sau copy. Không tự công nhận deliverable/module hoàn thành từ việc soạn tài liệu.
