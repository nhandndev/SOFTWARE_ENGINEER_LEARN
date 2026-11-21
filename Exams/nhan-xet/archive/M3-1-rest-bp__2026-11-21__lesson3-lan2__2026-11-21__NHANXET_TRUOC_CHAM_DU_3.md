# Chấm lại Lesson 03 — Phần đã làm, lần 2

Ngày 2026-11-21. [Đề hiện hành](../de-kiem-tra/M3-1-rest-bp__2026-11-21__lesson3-lan2.md): TU_DUY_RONG, 8câu/40đ. Chấm theo nội dung đã viết, không ép thuộc API hoặc viết lại code.

## 0. Snapshot và phạm vi

- [Bài nộp lần2](archive/M3-1-rest-bp__2026-11-21__lesson3-lan2__2026-11-21__BAI_NOP_CHAM_TAM_2.md).
- [Nhận xét lần trước](archive/M3-1-rest-bp__2026-11-21__lesson3-lan2__2026-11-21__NHANXET_TRUOC_CHAM_LAI_2.md):26/35.
- Bạn bổ sung câu6 ý3–5 và thay câu7 bằng nội dung đủ bốn ý.
- Câu1,2,3,5,8 chưa thay đổi về ý nghĩa, giữ nguyên điểm; không tự cộng điểm từ phần chữa trong chat.
- Câu4 trống, chưa chấm. Câu2 có bảng trùng và đoạn trả lời lệch ô: đọc toàn bộ nhưng tính một lần, không phạt trình bày.
- Không sửa bài làm; lời chữa dưới đây không được tính là đáp án bạn đã tự nộp.

## 1. Tổng điểm và nhóm kiến thức

**31,5/35 =90% phần đã làm**, tăng5,5đ so với26/35. Chưa phải31,5/40 để kết luận trượt, cũng chưa phải90% toàn bộ8câu.

| Nhóm | Câu | Điểm | Đánh giá |
|---|---|---:|---|
| Vai trò/luồng lỗi | 1,2 | 8,5/10 =85% | Còn nhầm query param và405 |
| HTTP/error contract | 3 | 4/5 =80% | HTTPstatus/body.status chưa giải thích đúng trọng tâm |
| Privacy và phạm vi handler | 5,6 | 9/10 =90% | Câu6 đã đủ; còn log an toàn và tương quanID |
| Client compatibility | 7 | 5/5 =100% | Đã bổ sung đủ |
| Hypermedia nhận diện | 8 | 5/5 =100% | Đủ nội dung được hỏi |
| Chuẩn hóa các nhánh lỗi | 4 | Chưa chấm | Chưa trả lời |

Đánh giá dựa trên bài viết, không suy ra đã triển khai/chạy API hoặc tự giải được mọi biến thể.

## 2. Điểm từng câu

| Câu | Điểm | Thay đổi so với trước |
|---|---:|---|
| 1 | 4,5/5 | Giữ điểm; thiếu cách ErrorCode cùng tồn tại với ProblemDetail |
| 2 | 4/5 | Giữ điểm; pageabc không phảiJSON và sai method là405 |
| 3 | 4/5 | Giữ điểm; sửa404 đúng, nhưng lý do chưa đúng vấn đề HTTP/body |
| 4 | — | Trống, chưa chấm |
| 5 | 4/5 | Giữ điểm; thiếu access/secret trong log và liên kếtID |
| 6 | 5/5 | Tăng từ2; đủ năm giới hạn |
| 7 | 5/5 | Tăng từ2,5; đủ nguy cơ, kế hoạch chuyển, success/error, format/status |
| 8 | 5/5 | Giữ điểm; hiểu links và phạm vi nhận diện |

## 3. Nhận xét và chữa từng câu

### Câu1 — 4,5/5

Ý1/2/3/5: mỗi ý1đ. Bạn phân biệt exception với JSON, biết handler dựa loại lỗi, ProblemDetail là object và throw ngắt happy path. Quên chữRFC hoặc gõ sai không bị trừ.

Ý4:0,5/1. Nói đổi format phải xét contract/version là đúng, nhưng chưa giải thích mối quan hệ với ErrorCode.

Bổ sung đủ: “Service vẫn ném AppException chứa ErrorCode. Handler đọc ErrorCode lấy status/thông tin rồi tạo ProblemDetail. Không cần bỏ enum hoặc đổi hết business logic.”

Đọc bài học mục1/4/7.

### Câu2 — 4/5

| Case | Điểm | Vì sao |
|---|---:|---|
| JSON hỏng | 1 | Hiểu lỗi đọc body trước khi vào nghiệp vụ, status400 |
| page=abc | 0,5 | Status400 đúng; giải thích đọcJSON/tạoDTO sai nguồn input |
| DTO nameblank | 1 | Đọc đượcJSON, tạoDTO rồi validation thất bại,400 |
| SKUtrùng | 1 | Lỗi business trongService,409 |
| POST vào endpoint chỉGET | 0,5 | Đúng điểm chọnmethod; status400 sai, phải405 |

Không bắt bạn ghi lại “Service chưa chạy” nếu thời điểm đã mô tả cho phép suy ra rõ.

Hai câu cần nhớ:
- pageabc là **query string không đổi sangint được**, không cần đọcJSON hoặc tạo bodyDTO.
- Endpoint có nhưng không hỗ trợ method gửi tới →**405** theo dữ kiện, không400.

Đọc bài học mục5–6/9; Lesson02 mục8 về binding.

### Câu3 — 4/5

Ý1:1/2. Đổi HTTP200 thành404 đúng1đ. Vì sao body404 chưa đủ còn chưa đúng: bạn giải thích cần thêm ProblemDetail/metadata, trong khi đề đã có ProblemDetail.

Chữa: “HTTPstatus thật vẫn200; ghi404 trongJSON không thay statusHTTP. Client/monitoring có thể hiểu thành công nên phải trảHTTP404 thật.”

Ý2/3/4: mỗi ý1đ. Bạn biết success/error có mục đích khác, errorKey ổn định theo contract và envelope phụ thuộc hợp đồng.

Nhắc nhẹ không trừ thêm: ProblemDetail giúp **client xử lý thất bại an toàn**, không phải nơi đổ chi tiếtdebug cho dev. Stacktrace/SQL vẫn giữ nội bộ.

Đọc bài học mục2–4/9.

### Câu5 — 4/5

Ý1/2/3: mỗi ý1đ. Chọn500 đúng; “Lỗi bất xác định” an toàn dù có thể viết dễ hiểu hơn; không gửi dữ liệu mật đúng.

Ý4:0,5/1. Biết lưu nội bộ server; thiếu kiểm soát truy cập/che token,secret trong log.
Ý5:0,5/1. Nhận “instant” theo ýinstance/ID lỗi, không phạt lỗi gõ; chưa nói ID đó liên kết với log nào.

Bổ sung: “Log nội bộ được bảo vệ và che secret. MãABC gửi client phải có trong log của cùng lần lỗi; khi client báoABC mới tra đúng sự cố.”

Không bắtUUID/tracingtool. Đọc bài học mục8–9.

### Câu6 — 5/5, đã sửa đủ

| Ý | Điểm | Đúng ở đâu |
|---|---:|---|
| Filter trướcDispatcherServlet | 1 | Không tự bảo đảm Advice bắt; xét filter/container hoặc tích hợp |
| Startup | 1 | App chưa ready, không phải request business để trả404 |
| Responsecommit | 1 | Không bảo đảm viết lại/xóa dữ liệu đã gửi |
| Security | 1 | Cơ chế riêng; không suy ra từ MVCAdvice |
| Catch-all | 1 | Phạm vi handler không đồng nghĩa bao phủ toàn server |

Bạn đã bổ sung đúng cả ba vế còn thiếu. Không yêu cầu giải thích cấu hình hoặc code ngoài đề để có điểm.

Giữ một phân biệt quan trọng: lỗi binding/validation có thể **trước Controller method nhưng vẫn trongMVC**; không đồng nhất nó với filter trướcDispatcherServlet.

### Câu7 — 5/5, đã sửa đủ

- Ý1:1/1. Client cũ đọcmessage, nay field/vị trí/kiểu khác làmhỏng.
- Ý2:2/2. Đã có kế hoạch tương thích/cùngtồntạiv1/v2 hoặc chuyển phối hợp; cho client thời gian chuyển/kiểm trước khi bỏ bảncũ.
- Ý3:1/1. Không bắt successDTO thànhProblemDetail, vì success/error khác vai trò.
- Ý4:1/1. Cùngformat không cùngstatus, ví dụ400/404/409 đúngcontract.

Dòng “:1” còn trong câu trả lời chỉ là phần trình bày, không ảnh hưởng điểm. Chấm nội dung bạn đã nộp; không bắt viết dài hoặc tự triển khai hai phiên bản.

### Câu8 — 5/5

Đúngself→Product10; category→Category2; theo link thayhardcode; version/page không tựlàhypermedia; khôngbắt thưviện/formatduynhất. Mỗi ý1đ.

Ví dụstate/thanh toán bạn liên hệ không có trong mẫuProduct, nhưng phần lợi ích dùng link thayhardcode đáp ứng câu hỏi. Không trừ do dùng domainkhác. Không suy ra link nghiệp vụ tự thay đổi nếu server chưa thiết kế/cung cấp.

## 4. Phần còn thiếu và ôn ngắn

Không cần học lại câu6/7/8 chỉ để làm lại bài. Tập trung:

- ErrorCode→handler→ProblemDetail → bài học mục1/4/7 →3phút → bổ sung câu1 ý4.
- Queryparam/JSON và405 → mục5–6/9 →5phút → sửa hai dòng câu2.
- HTTPstatus thật khácbody.status → mục2–4 →3phút → sửa lý do ởcâu3 ý1.
- Log được bảo vệ/ID cùngsự cố → mục8–9 →5phút → bổ sung câu5 ý4–5.
- Thống nhất JSON/validation/business → mục7–8/12 →5–10phút → làm câu4.

[Bài học](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_03_PROBLEMDETAIL_HATEOAS_REVIEW.md). Chưa có căn cứ nói câu4 đã sai: nó chưa được trả lời.

## 5. Quyết định

**Phần đã làm đạt90%, nhưng Lesson03 chưa được chốt vì câu4 trống.** Không áp mức90% của7câu thành kết quả đủ8câu. Chưa tick thêm roadmap hoặc mở modulemới.

Nếu giữ nguyên điểm7câu này, cần ít nhất2,5/5 ởcâu4 để tổng đạt34/40. Bạn cũng có thể sửa các ý còn thiếu ởcâu1/2/3/5; khi chấm đủ thì dùng tổng40đ thực tế.

Giữ Lesson01/02 đãđạt. Không xác nhận capstone hoặc khả năng codeproduction từ bài viết.

## 6. Bước tiếp theo

Không lập kế hoạch học lại3–5ngày vì phần đã làm90% và bài chưa hoàn tất. Một buổi ngắn đủ để sửa các ý trên và làmcâu4; sau đó gửi chấm lại toànbài.

## 7. Tiến độ và kiểm tổng

- Lần1:26/35≈74,29%.
- Lần2:4,5+4+4+4+5+5+5=31,5/35=90%.
- Câu6 tăng3đ; câu7 tăng2,5đ; các câu khác giữ nguyên.
- Snapshot bài và nhận xét trước đã lưu; đề không bị sửa.
- 05 cập nhật điểm tạm90% trên7câu và log; 01 không đổi checklist/trạng thái vì chưa chốtLesson03.
