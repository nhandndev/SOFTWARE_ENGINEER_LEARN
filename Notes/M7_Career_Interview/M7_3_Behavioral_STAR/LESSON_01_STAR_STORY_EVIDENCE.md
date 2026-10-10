# Lesson 01 · Biến việc mình thật sự làm thành câu chuyện STAR rõ ràng

> Buổi1/4h. Không cần kể chuyện hoành tráng. Cần người nghe hiểu vấn đề, phần trách nhiệm của bạn, quyết định bạn đã làm và điều đã xảy ra.

## Tài liệu / video

- [Amazon interview loop](https://amazon.jobs/content/en/how-we-hire/interview-loop): xem mục behavioral/STAR và tài nguyên phỏng vấn từ chính nhà tuyển dụng.
- [Harvard MCS: Interviewing](https://careerservices.fas.harvard.edu/resources/interviewing/): đọc Behavioral/Fit, câu hỏi tiêu cực và cách luyện.
- Nguồn riêng của bạn: nhận xét, bài nộp, Git diff, log đã ẩn secret. Chúng giúp nhớ facts, không tự viết lại ai là người thực hiện.

Video: tìm `Harvard MCS behavioral interview STAR` hoặc mở video được liên kết từ trang tuyển dụng Amazon. Tài liệu này không giả đã xem/đánh giá một video Harvard cụ thể; ưu tiên kênh chính thức và câu trả lời có follow-up, không script “đảm bảo đỗ”.

## 1. Behavioral khác hỏi kiến thức

“LAZY hoạt động thế nào?” kiểm hiểu kỹ thuật. “Kể một lần bạn hiểu sai LAZY, nhận feedback và sửa cách làm” kiểm cách bạn đối diện khoảng trống kiến thức, kiểm chứng và học từ sai sót. Kiến thức kỹ thuật là bối cảnh; hành động/quyết định của bạn mới là trọng tâm.

“Bạn có biết teamwork không?” trả lời bằng tính từ rất khó đánh giá. Một sự kiện cụ thể cho phép hỏi: bạn nghe ai, đã quyết định gì, vì sao, kết quả có đúng như bạn nghĩ không? [Harvard MCS](https://careerservices.fas.harvard.edu/resources/interviewing/) chấp nhận ví dụ từ công việc, trường học hoặc hoạt động thực tế, không chỉ việc làm có lương.

Không phải mọi câu đều cần STAR. “Giới thiệu bản thân”, động lực ứng tuyển hay câu hỏi kỹ thuật trực tiếp có cấu trúc phù hợp riêng. STAR hữu ích nhất khi cần kể **một sự kiện đã xảy ra**; hypothetical “nếu...” cần nói rõ phương án tương lai, không giả thành quá khứ.

## 2. Bốn phần, bốn câu hỏi khác nhau

| Phần | Trả lời điều gì? | Ví dụ tự viết, giả định |
|---|---|---|
| Situation | Chuyện gì, bối cảnh/ràng buộc gì? | API paging của project học trả500 với page=-1 |
| Task | Bạn chịu trách nhiệm đạt điều gì? | Sửa xử lý input sai mà không đổi response case hợp lệ |
| Action | Bạn đã làm gì, chọn thế nào, vì sao? | Reproduce, đọc stack, sửa thứ tự validation, kiểm lại cases |
| Result | Thực tế thay đổi gì, biết bằng gì? | Case input sai trả400 qua kiểm thủ công; chưa có automated regression |

Task không phải toàn bộ project và không lặp Situation. “Project có lỗi” là bối cảnh; “phần tôi phụ trách là...” là trách nhiệm. Action không chỉ “team xử lý”; phải có việc bạn thực hiện và lý do. Result không chỉ “tôi học được nhiều”; cần outcome và giới hạn, sau đó mới reflection.

Không cần nói lớn S/T/A/R khi phỏng vấn. Khung giúp bạn kể có đầu/cuối; lời kể có thể tự nhiên. STAR không phải công thức đánh bóng thiếu evidence. Tên chữ cái không đáng điểm hơn nội dung đúng.

## 3. Before/after hoàn chỉnh, không phải lịch sử của bạn

**Tất cả facts trong ví dụ sau là tình huống giả định để học**, dù cùng chủ đề paging bạn đã gặp. Không được chép thành thành tích cá nhân hoặc claim đã làm các bước này.

Before yếu:

> Tôi từng làm paging bằng Spring. Nó lỗi nên tôi tìm mạng, sửa xong. Tôi rất có trách nhiệm và học nhanh.

Thiếu gì: không biết lỗi/ràng buộc, ai chịu trách nhiệm, tìm điều gì, sửa quyết định nào, kiểm ra sao. Tính từ không thay evidence.

After mẫu:

> Trong một project học, endpoint danh sách trả500 khi nhận page=-1, trong khi input sai được kỳ vọng trả400. Tôi phụ trách sửa case này, giữ nguyên kết quả của request paging hợp lệ. Tôi tái hiện lỗi và theo stack trace, thấy PageRequest được tạo trước bước kiểm page/size. Tôi chuyển validation lên trước bước tạo PageRequest, rồi kiểm lại page=-1, size=0 và một request hợp lệ. Sau thay đổi, các request sai trả400 và case hợp lệ vẫn trả đúng dữ liệu trong lượt kiểm thủ công đó. Tôi chưa có automated regression test nên không kết luận mọi case đều an toàn. Bài học của tôi là phải kiểm thứ tự validation và bổ sung test cho input biên thay vì chỉ chạy happy path.

Bóc tách: câu đầu là S; câu hai là T; hai câu tiếp là A với quyết định và lý do; câu sau là R có phạm vi; cuối là gap/reflection. Ví dụ không cần metric latency hoặc user thật. Thời lượng nói phải đo khi bạn tự nói, không tính từ số dòng văn bản.

## 4. Action tốt nói được lựa chọn, không liệt kê tool

“Tôi dùng IntelliJ, Postman, ChatGPT” chỉ kể công cụ. Hãy kể thao tác tạo khác biệt: tái hiện input nào, giả thuyết nào bị loại, vì sao chọn fix validation thay vì catch mọi Exception→400, phối hợp/xin feedback gì khi kẹt, kiểm lại contract nào.

Không thêm toàn bộ stack kỹ thuật vào phần S. Người nghe cần hiểu quyết định: catch mọi lỗi thành400 có thể che lỗi server; validation trước PageRequest xử lý input sai tại đúng bước. Technical deep dive để follow-up nếu được hỏi.

Nếu có đồng đội: “Nhóm chốt schema; tôi làm mapper và kiểm case...” rõ hơn vừa nhận hết credit vừa phủ nhận đóng góp nhóm. Nếu làm một mình: nói project cá nhân, không dựng teammate/khách hàng cho giống công ty.

Nếu AI gợi ý code: có thể nói bạn dùng trợ giúp để xác định hướng, phần nào bạn tự kiểm/điều chỉnh, điều gì chưa hiểu. Không nói “tự thiết kế toàn bộ” khi chỉ chạy solution có sẵn. Ngược lại, dùng tool không tự xóa hết đóng góp của bạn; phân biệt suggestion, implementation, verification và decision.

## 5. Result: có số khi đo được, không ép số cho đẹp

Kết quả có thể là case lỗi được sửa, acceptance criteria đạt, người liên quan đồng ý phương án, tài liệu bàn giao rõ hơn hoặc đã phát hiện giả thuyết sai. Không có tiền/user/latency vẫn kể được, nhưng phải cụ thể: “case nào, ai xác nhận, artifact nào, giới hạn gì?”.

| Claim | Cần hỏi lại | Diễn đạt trung thực hơn nếu chưa có data |
|---|---|---|
| Tăng tốc80% | Baseline/sau là gì? Môi trường, dataset, số lần chạy? | Chưa benchmark; chỉ xác nhận query/output trên dữ liệu test |
| Hết toàn bộ lỗi | Đã kiểm những cases nào? | Lượt kiểm này không tái hiện ba cases đã liệt kê |
| Tiết kiệm cho công ty | Có đo/nguồn nào, bạn có quyền biết không? | Không có số business; chỉ biết phạm vi việc mình làm |
| Team hài lòng | Ai/feedback nào? | Có feedback cụ thể nếu thật; không tự gán suy nghĩ của người khác |

Giả định đã đo200ms→120ms trong cùng bài đo: giảm latency40% vì(200-120)/200=40%; không gọi giảm80%. Nhưng một lượt chạy không đủ claim production p95 hoặc nguyên nhân duy nhất. Nếu dùng số ước lượng, ghi rõ estimate và cách tính; không nâng estimate thành observed result.

## 6. Result và reflection khác nhau

Result: “Tôi chưa kịp hoàn thành phần update trước deadline; nhóm chỉ demo được create/list.” Reflection: “Lần sau tôi chia milestone và báo blocker sớm.” Hai phần đều hữu ích, nhưng **kế hoạch sau này không phải kết quả đã xảy ra**.

Thất bại có thể là chuyện tốt để phỏng vấn nếu nhận đúng trách nhiệm và có learning cụ thể. Đừng sửa outcome thành chiến thắng cho hợp STAR. Nếu chưa có lần sau để chứng minh learning áp dụng, nói “tôi dự định...” chứ không “từ đó không bao giờ lặp lại”.

Quan hệ nhân quả cần thận trọng: điểm thi tăng sau ôn có nhiều yếu tố; không tuyên bố một method chắc làm năng lực tăng X%. Evidence giúp người nghe hiểu mức chắc chắn, không biến interview thành phải công bố mọi dữ liệu riêng tư.

## 7. Tìm chuyện trong context của bạn, không invent sự kiện

[Snapshot M1-3 mini-project](../../../Exams/nhan-xet/M1-3-jpa-mini-project__2026-09-13__bai6-mini-project__NHANXET.md) có ghi nhận compile/API thủ công, paging validation và gap automated tests/N+1. Đây là **ghi nhận lịch sử của snapshot**, chưa phải lượt chạy lại hôm nay và chưa chứng minh bạn tự thực hiện mọi bước. Bài nộp/nhận xét có phần AI hỗ trợ; cần tách credit và kiểm repo trước khi dùng.

Những đầu mối có thể hỏi chính mình:

- Common/AppException: tại sao bạn chọn business ErrorCode và framework error contract? Có thay đổi/feedback nào thực sự xảy ra không?
- Paging: lần nào bạn hiểu sai metadata/validation, đã tự viết/sửa/kiểm phần gì?
- JPA/LAZY: bạn từng gặp bug thật hay chỉ đọc tình huống? Hai loại khác nhau, không kể lab tưởng tượng thành incident.
- Học lại sau kiểm tra: bạn đổi cách học gì và có artifact trước/sau nào? Đây là learning story, không mặc định là shopcore story.

Code tồn tại không chứng minh deadline, conflict hoặc leadership. Chưa nhớ thì tìm commits/notes, hỏi người liên quan nếu phù hợp; không để AI điền khoảng trống bằng câu nghe hay.

## 8. Mười chuyện không phải mười phiên bản của cùng một sự kiện

Mở [story bank](STORY_BANK_TEMPLATE.md). Mỗi card có event ID, ngày/khoảng thời gian, repo/bối cảnh, competency chính, vai trò, facts, S/T/A/R, evidence và giới hạn. Có thể một chuyện dùng cho hai câu hỏi nếu đúng trọng tâm, nhưng không đổi facts giữa hai lần kể và không đếm nó thành hai chuyện độc lập để đủ10.

Ba slot đầu là **ứng viên shopcore**, không auto xác nhận. Một mini-project khác không tự thành shopcore vì cùng Product/Category. Nếu chưa có ba sự kiện shopcore thật, ghi thiếu và giữ deliverable chưa hoàn thành, không điền incident giả. Chưa có conflict/teamwork trong project solo thì tìm case trường/lớp/hoạt động khác thật; không tính trao đổi với AI là đã quản lý một đội kỹ sư.

## 9. Bài tập nhỏ trước đề

Chọn một sự kiện thật, viết bốn đoạn ngắn theo STAR. Tô rõ câu nào là observed fact, nhớ lại chưa chắc, estimate, planned action. Khoanh Action của riêng bạn; gạch metric không có nguồn. Nếu chưa chọn được chuyện, điền một card Facts/Gaps trước, không ép viết trọn.

Chốt: **Không cần chuyện lớn; cần sự kiện thật, đóng góp rõ, lý do có nghĩa và kết quả không nói quá evidence.**
