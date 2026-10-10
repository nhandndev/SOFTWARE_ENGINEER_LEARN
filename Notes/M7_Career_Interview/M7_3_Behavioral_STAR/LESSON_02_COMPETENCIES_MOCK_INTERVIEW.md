# Lesson 02 · Conflict, failure, leadership, ownership và luyện nói thật

> Buổi2/4h. Dùng khung STAR linh hoạt cho câu hỏi khác nhau; giữ facts, không biến chuyện nào cũng thành “tôi cứu cả team”.

## Tài liệu / video

- [Harvard MCS: Interviewing](https://careerservices.fas.harvard.edu/resources/interviewing/): đọc phần câu hỏi tiêu cực, communication và practice.
- [Amazon interview loop](https://amazon.jobs/content/en/how-we-hire/interview-loop): tham khảo phần behavioral và tài nguyên/video chính thức. Không biến tiêu chí riêng một hãng thành chuẩn chung mọi công ty.
- [Story bank của module](STORY_BANK_TEMPLATE.md): chuẩn bị bullet facts, không script thuộc lòng.

Video: tìm `Harvard career services behavioral interview conflict failure`, `Amazon official interview tips STAR`. Chưa có video Harvard cụ thể được xác minh trong bộ này; keywords là gợi ý tìm, không recommendation đã xem.

## 1. Competency là năng lực được quan sát, không nhãn tự khen

| Chủ đề | Người nghe cần hiểu | Chưa đủ |
|---|---|---|
| Conflict | Bạn xử lý bất đồng và ra quyết định với người khác thế nào | Tôi đúng, họ sai |
| Failure | Bạn nhận trách nhiệm, kiểm thiệt hại và thay đổi gì | Tôi quá cầu toàn nên thành công |
| Leadership | Bạn tạo clarity/động lực/phối hợp khi cần, có thể không có chức danh | Tôi ra lệnh nên team làm |
| Ownership | Bạn theo việc đến kết quả, minh bạch scope/blocker | Tôi làm tất cả, không cần hỏi ai |

Đây là khung luyện tự soạn cho roadmap, không bảng điểm nội bộ của một nhà tuyển dụng. Người ít kinh nghiệm vẫn có thể kể từ lớp học/project thật. Không dùng size project như proxy cho năng lực.

## 2. Conflict: bất đồng về quyết định, không tấn công con người

**Tình huống giả định**: nhóm học cần thống nhất response lỗi. A muốn trả mọi lỗi400 để code gọn; B muốn phân biệt404/409. Bạn không có quyền chốt một mình.

Hướng STAR:

- S: hai phương án khiến frontend chưa biết contract nào dùng.
- T: phần bạn là đề xuất contract cho endpoint mình phụ trách và giúp nhóm thống nhất; không nhận chức team lead nếu không có.
- A: hỏi lý do A ưu tiên đơn giản; đưa ví dụ input sai/not-found/duplicate và ảnh hưởng client; so chi phí handler chung với mã trạng thái rõ; trao đổi người có quyền quyết định, ghi kết luận. **Đây là hướng có thể làm, không facts đã xảy ra của bạn.**
- R: nếu nhóm thực sự chốt phương án, nói quyết định/evidence; nếu chưa chốt, nói pending và bước tiếp theo, không bịa mọi người đồng ý.

Không cần luôn thắng để có câu chuyện tốt. Nếu quyết định cuối không theo ý bạn nhưng hợp constraints, có thể nêu cách bạn hỗ trợ sau khi chốt. Nếu có risk bảo mật/pháp lý nghiêm trọng thì cần đúng kênh escalation, không đơn giản “đồng ý mọi thứ cho hòa thuận”.

Câu follow-up đáng chuẩn bị: bạn nghe được lý do nào từ người kia? Bạn đã đổi ý điểm gì? Ai có quyền chốt? Evidence nào giúp quyết định? Nếu vẫn bất đồng, bạn làm gì để không chặn công việc?

## 3. Failure: có lỗi thật, trách nhiệm thật, không cần kết thúc thắng lợi

Ví dụ **giả định** có facts cố định: bạn phụ trách mapper, quên categoryName; frontend không demo được một màn hình. Bạn nhận ra thiếu field sau feedback, sửa mapper và kiểm lại endpoint; deadline demo đã lỡ.

Một câu trả lời tốt giữ outcome âm: “Tôi sửa được thiếu field sau đó, nhưng không cứu được buổi demo. Tôi đã chỉ kiểm entity save mà chưa đối chiếu response contract. Tôi nhận phần thiếu của mình, báo tình trạng và bổ sung checklist contract cho lần sau.” Nếu checklist mới chỉ dự định thì nói dự định; nếu đã dùng lần sau mới nêu kết quả lần sau.

Không đổ hết cho frontend, không nói “không bao giờ sai nữa”, không biến lỗi của teammate thành failure của mình cho có chuyện. Tách tác động, nguyên nhân đã biết và giả thuyết chưa kiểm. Một outcome không tốt vẫn cho thấy judgment và learning nếu được kể trung thực.

Không chọn failure bằng khẩu hiệu “tôi quá chăm chỉ”. Nếu không muốn tiết lộ chi tiết nhạy cảm, chọn case khác hoặc ẩn danh, không cần khai secret để chứng minh trung thực.

## 4. Leadership không bắt có chức danh

Ví dụ **giả định**: học nhóm ba người bị kẹt vì chưa chốt interface. Bạn đề xuất một buổi15 phút, gom câu hỏi, giúp thống nhất input/output và ghi đầu việc với người phụ trách được cả nhóm đồng ý. Đây có thể là leadership qua tạo clarity, không phải quản lý nhân sự hoặc tự nhận đã dẫn team production.

Action cần cụ thể: bạn nhận thấy blocker nào, đã hỏi/giúp ai, chia việc dựa vào gì, theo dõi mà không micromanage thế nào? Result có thể là nhóm thống nhất contract và bắt đầu lại công việc, **nếu thật**; không cần số doanh thu. Nếu các bạn khác implement, ghi họ implement, bạn điều phối phần nào.

Solo project có initiative/ownership nhưng không tự chứng minh leadership đối với người khác. Có thể chọn hoạt động lớp/CLB thật cho leadership; nếu chưa có thì ghi gap, không đổi “tôi hỏi AI” thành “tôi hướng dẫn team”.

## 5. Ownership: chịu trách nhiệm không có nghĩa ôm mọi việc

Giả định bạn nhận endpoint list Product, phát hiện paging có input edge case và sắp hết thời gian. Ownership có thể là reproduce, báo rõ risk/phạm vi, đề xuất ưu tiên fix trước tính năng phụ, nhờ review khi chưa chắc, kiểm lại và cập nhật trạng thái. Không im lặng làm overtime rồi tự nhận hero vì chẳng ai biết blocker.

Khác nhau:

```text
Mơ hồ: Tôi cố gắng xử lý hết, cuối cùng chắc ổn.
Rõ: Tôi phụ trách phần X; đến mốc Y phát hiện blocker Z.
     Tôi báo impact/options, chốt phạm vi với người liên quan,
     làm/kiểm phần đã thống nhất và ghi phần còn pending.
```

Nếu deadline không do bạn đặt, nói ai/constraint nào đặt; không invent deadline trong self-study. Nhờ giúp đúng lúc là một quyết định có trách nhiệm, không tự đồng nghĩa yếu. Không hứa kết quả ngoài phạm vi mình kiểm soát.

## 6. Feedback và câu hỏi đào sâu

Khi bị hỏi “vì sao chọn cách đó?”, đừng lặp “best practice”. Nêu phương án khác, constraint, evidence và trade-off. Ví dụ ưu tiên manual check cho một case gấp **không** có nghĩa manual thay automated regression mãi; kể gap và kế hoạch đúng sự thật.

Nếu interviewer chỉ ra assumption sai: tạm dừng, kiểm lại premise, nhận điểm sai và sửa reasoning. Không cần bảo vệ câu trả lời bằng mọi giá. Nếu không nhớ số: “Tôi không nhớ chính xác; tôi có thể mô tả phép đo/phạm vi, không muốn đưa số sai.” Chỉ nêu artifact nếu được phép và có thật.

Nếu chỉ có chuyện tương tự: “Tôi chưa gặp đúng tình huống production đó; ví dụ gần nhất của tôi là project học...” rồi kể phần liên quan. Nếu họ muốn hypothetical, chuyển sang “tôi sẽ...” rõ ràng. Không thay facts để match từ khóa hỏi.

Bảo mật: ẩn tên người/khách hàng, endpoint/token/dữ liệu nhạy cảm; nói đủ role và constraint để hiểu quyết định. Không cần nộp source công ty làm evidence. Evidence nội bộ và lời giải thích có giới hạn vẫn có giá trị; không có public GitHub không đồng nghĩa không có trải nghiệm.

## 7. Từ card đầy đủ sang lời kể1–2 phút

Roadmap yêu cầu luyện1–2 phút, không script cố định. Gợi ý luyện **tự soạn**, không chuẩn mọi interviewer: S khoảng15–20 giây, T10–15 giây, A40–60 giây, R/reflection20–25 giây. Điều chỉnh bằng bản thu âm thực tế; không nói nhanh để nhét mọi chi tiết.

Giữ5 bullet: bối cảnh, trách nhiệm, hai quyết định chính, outcome và learning. Bỏ giải thích full DispatcherServlet nếu câu hỏi là ownership. Có follow-up kỹ thuật thì mới mở rộng. Người nghe cần hiểu phần mình làm và vì sao, không cần mọi class name.

Có thể chuẩn bị một bản ngắn30–45 giây và bản đầy đủ1–2 phút cho cùng **facts**. Chúng không phải hai chuyện khác nhau. Không đếm từ để tự kết luận đã đạt thời lượng, vì nhịp nói/ngôn ngữ/ngắt câu khác nhau. Không bắt nói tiếng Anh nếu chưa được yêu cầu; có thể luyện tiếng Việt trước cho reasoning rõ.

## 8. Quy trình mock dùng ngay

1. Chọn một card đã có facts, không nhìn bài giải hoặc đoạn văn dài.
2. Người hỏi chọn competency; người kể chọn câu chuyện phù hợp, không ép dùng chuyện conflict cho mọi câu.
3. Thu âm/timer khi được sự đồng ý; trả lời trong khoảng mục tiêu, dừng có kết luận.
4. Hỏi follow-up: “Bạn tự làm gì?”, “Vì sao không chọn phương án khác?”, “Biết result bằng gì?”, “Lần sau thay điều gì?”.
5. Nghe lại và sửa **một lỗi chính**: S quá dài, Action mơ hồ, Result nói quá hoặc không trả lời đúng câu hỏi. Luyện lại bằng bullets, không học từng chữ.

| Nhận xét quan sát được | Cách sửa |
|---|---|
| Nói hơn2 phút vì kể nhiều context | Giữ constraint quan trọng, đưa chi tiết sang follow-up |
| Nói “team” mãi, không rõ bạn làm gì | Một câu scope nhóm, rồi chỉ ra phần mình làm |
| Có outcome nhưng không lý do quyết định | Thêm lựa chọn và constraint cho một action chính |
| Result không có số, nhưng có acceptance/evidence cụ thể | Giữ, không invent metric |
| Bị follow-up thì facts thay đổi | Kiểm card gốc/unknown, sửa facts chứ không sửa câu chuyện cho đẹp |

Chỉ đọc file chữ: đánh giá cấu trúc/reasoning, chưa ghi delivery đạt. Không phạt accent/hướng nội; tập trung nghe được, rõ ý, đúng trọng tâm và phản hồi câu hỏi.

## 9. Mười chuyện và một lượt tự review

Registry trong template có10 event slots, không phải10 accomplishments đã viết. Có thể gắn nhiều competencies cho một event nhưng chỉ đếm một chuyện. Ưu tiên đa dạng vấn đề và vai trò thật, không nhất thiết mỗi slot thành công.

Rà lại: đủ S/T/A/R? Task là phần của bạn? AI/nhóm được credit đúng? Result observed/estimate/planned phân biệt? Ít nhất ba event thuộc **shopcore thực sự**, không đổi tên mini-project? Có thể nói1–2 phút theo bản thu chưa? Nếu một mục chưa có thì ghi thiếu, không tự pass bằng điểm lý thuyết.

Chốt: **Câu chuyện tốt chịu được follow-up vì dựa facts, không vì thuộc bài mẫu.**
