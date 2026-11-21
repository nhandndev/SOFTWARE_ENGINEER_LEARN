# Kiểm đề Lesson 03 — Hiểu rộng, nắm bản chất

Ngày2026-11-21. [Đề hiện hành](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-21__lesson3-lan2.md); [đáp án](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-21__lesson3-lan2__DAPAN.md).

## 1. Diễn giải đúng yêu cầu mới

- Người học không muốn bỏ nền Software hoặc chỉ học lướt; muốn hiểu rộng và tư duy, đào sâu đúng chỗ thiết yếu để làm nền AI Engineering.
- Giữ bài học chi tiết làm nguồn tra cứu. Giảm kiểm sâu API/cú pháp và việc tự code lại nguyên project chỉ để có điểm.
- Vẫn kiểm nguyên tắc đúng đắn, error contract, bảo mật, khả năng điều tra lỗi và giới hạn cơ chế; không nới ngưỡng85%.
- Lưu quy tắc trong AGENTS,02_PROMPT_TAO_DE và03_PROMPT_CHAM_DE để áp dụng lần sau; không tự đổi/xóa roadmap hoặc công nhận thực hành chưa làm.

## 2. Thay đổi cụ thể

Trước khi sửa đã kiểm12ô trả lời đều trống. Lưu đề/đáp án12câu trước đó vào Exams/de-kiem-tra/archive với hậu tố __TRUOC_TU_DUY_RONG_2026_11_21. Không mất bài làm.

Đề hiện hành8×5=40đ, đạt34đ. Đáp án mới cùng số câu, có partial credit. Không dùng60đ hoặc rubric của đề trước.

## 3. Giữ và giảm những gì?

| Mảng | Cách kiểm hiện hành |
|---|---|
| Exception/handler/representation | Phân vai qua một request thật |
| Binding/validation/business/method | Nhận diện điểm dừng, Service có chạy và status |
| Error contract với client | Sửa HTTP200/body404; mã loại lỗi khác lời giải thích |
| Format thống nhất | Không bỏ sót JSON/validation ngoài business; biết thông tin field cần chofrontend |
| Bảo mật và reliability | Không lộ secret; log an toàn; liên kết sự cố; không giả mọi lỗi thành500 |
| Giới hạn Advice | Nhận diện filter/startup/Security/response đã gửi, không cấu hình framework |
| Tương thích client | Biết hậu quả và kế hoạch chuyển, không học thuộc versioning tool |
| HATEOAS | Đọc self/category/link, không cài thư viện |
| Chi tiết tra cứu | Không bắt đủ từng fieldRFC, URI/UUID, signature override, cơ chế nhiềuAdvice, tracingtool |

Mỗi câu có mục đã dạy trong bài; bảng độ phủ ở đáp án. Không thêm kiến thức AI/ML ngoài bài. Biết rộng không có nghĩa được trả lời từ khóa mà không hiểu tình huống.

## 4. Kiểm nhất quán

- Bài học03 giữ nguyên nội dung/byte so với trước sửa. 01/05 giữ nguyên, không tự sinh điểm hoặc chuyển trạng thái.
- 8câu/8ô trả lời trống/8mục đáp án; mỗi câu5đ; tổng40, ngưỡng34.
- Mọi JSON minh họa hợp lệ; ví dụ ở câu3 cố ý HTTP200/body404 để học viên phát hiện, không phải contract đúng.
- Link/fence hợp lệ; README,LESSON_PLAN,QUY_TAC_CHAM ghi đúng bản hiện hành.
- Bài học có footer12/60 của mốc trước: ghi rõ ở đầu đề/README rằng đề hiện hành40đ mới là mẫu số áp dụng; không sửa nội dung bài theo yêu cầu giữ nguyên.
- Không chỉnh Java source, không cần chạy lại compile/API vì lượt này chỉ đổi đề và quy tắc, không đổi code mẫu đã kiểm ở lượt trước.

## 5. Bàn giao

Đề mới có thể dùng ngay để đánh giá tư duy rộng của Lesson03. Điểm vẫn cần bài làm và snapshot chấm thật; đạt kiến thức không tự chứng minh đã làm shopcore/capstone. Đồng bộ các file thay đổi vào Vault với sao lưu/kiểm byte; không sync lại bản đề cũ thành bản hiện hành.
