# Đánh giá hiện tại và kế hoạch vá riêng — M3-1 Lesson 01

> **Lưu ý lịch sử:** tài liệu này đánh giá bản60/80 trước khi bạn sửa tiếp. Lần chấm5 ngày2026-11-20 trên đề cũ đạt **68,5/80=85,625%**, đã đạtLesson01; không bắt làm đềvá để được công nhận. Xem [nhận xét mới và chữa câu16](../../../Exams/nhan-xet/M3-1-rest-bp__2026-11-20__lesson1-lan2__NHANXET.md). Các bảng/lỗhổng bên dưới giữ làm lịch sử, không phải kết quả hiện tại.

> Rà toàn bộ **16 câu trả lời ngày 2026-11-20**, đối chiếu ba lượt nhận xét và bản bài nộp hiện tại. Mục tiêu: xác định đúng phần đã biết, phần cần kiểm lại; không thêm bài học mới.

## 1. Kết luận về mức kiến thức hiện tại

Bạn đã có nền để hiểu API contract, chuyển version và vấn đề retry. Câu trả lời thể hiện tốt việc:
- Giữ v1 cho client chưa chuyển, có thể dùng chung Service/DB.
- Phân biệt request/response DTO và việc validation cần nghiệp vụ.
- PATCH gán khác tăng; timeout không đồng nghĩa rollback.
- Unique dữ liệu khác replay; key gắn một ý định và không tự bảo đảm exactly-once.

Phần **chưa ổn định là áp dụng contract cụ thể**: viết đúng URL/status/body, dự đoán state rồi sửa đúng logic; giải thích rõ client hỏng vì điều gì thay vì chỉ nhắc “phá contract”. Bạn cũng còn thiếu các vế audit, policy và concurrency đã được dạy.

Đánh giá này chỉ nói về **Lesson 01**, không xếp bạn thành junior/mid/senior hoặc kết luận năng lực backend tổng thể. Chưa có test project/API thực tế ở lượt này. Đọc đáp án đúng hoặc dùng đúng từ khóa không tự chứng minh mọi tình huống tương tự đã vận dụng được.

## 2. Có một thay đổi mới cần được ghi nhận

So với snapshot chấm đủ16 câu trước, hiện câu15 đã thêm:

> “sửa từ Post thành Put, sửa thành 200”

Hai ý đúng này được cộng lại theo thang cũ:
- Câu15: **2,5 → 4,5/5**.
- Bài gốc hiện tại: **60/80 =75%**, không còn là58/80=72,5%.
- Không thay điểm câu khác khi câu trả lời chưa đổi.
- Chưa đạt85%; việc tạo đề vá không tự cho điểm mới.

[Nhận xét hiện hành](../../../Exams/nhan-xet/M3-1-rest-bp__2026-11-20__lesson1-lan2__NHANXET.md) và snapshot bài nộp giúp giữ bằng chứng. Không sửa bài cũ thành một bài “đã hoàn thành” khi chưa làm/chấm đề vá.

## 3. Đối chiếu từng câu, không chỉ nhìn tổng điểm

| Câu gốc | Điểm hiện tại | Đã thể hiện | Chưa thể hiện đúng/đủ | Kiểm lại ở đề vá |
|---|---:|---|---|---|
| 1 | 4,5/5 | DTO là contract client, nhận ra đổi field | Giải thích request thay vì đúng chiều client đọc response | Câu1, ý1 |
| 2 | 4/5 | API version, GET/DELETE khác nhau | URL còn AllProducts/getProduct thay resource path | Câu2 |
| 3 | 3/5 | Biết201 và HTTP status khác số trong JSON | Location/body thiếu target ID;204 có JSON là sai | Câu3–4 |
| 4 | 2/5 | Detail/PUT id vắng404 đúng policy | List rỗng200/body; policy PUT không cấm mọi PUT-create | Câu5 |
| 5 | 3/5 | Năm kết luận breaking/tương thích đúng | Bốn lý do chưa gắn với hành vi client cụ thể | Câu1, ý2 |
| 6 | 4,5/5 | V1/v2, chia sẻ DB/Service, index không bắt v2 | Cần hành động cụ thể trước khi dừng version cũ | Câu6 |
| 7 | 4/5 | GET/POST/PATCH và vài phân loại đúng | PUT replacement idempotent; DELETE không safe | Câu7 |
| 8 | 4,5/5 | Writable/server-managed, cần validation | Chốt thiếuprice→400 theo policy | Câu8 |
| 9 | 2/5 | Nhận code sai và annotation không sửa logic | Chưa tính8/11; lấy key thay cho sửa phép gán3 | Câu9 |
| 10 | 2/5 | DELETE effect khác response status | Audit/refund, policy204 khi đã vắng còn trống | Câu10 |
| 11 | 5/5 | PATCH gán/tăng, missing/null | Không có thiếu điểm được ghi nhận | Không thi lại |
| 12 | 5/5 | Commit/timeout, POST retry, xác nhận kết quả | Không có thiếu điểm được ghi nhận | Không thi lại |
| 13 | 5/5 | Unique khác replay và nhận diện ý định | Không có thiếu điểm được ghi nhận | Không thi lại |
| 14 | 5/5 | Key, payload khác, ý định riêng, giới hạn Redis | Không có thiếu điểm được ghi nhận | Không thi lại |
| 15 | 4,5/5 | Binding, đã sửa PUT và200 | Còn giữ cách xử lý Location/create không phù hợp contract update | Câu11 |
| 16 | 2/5 | Hai ID khác nhau là hai target | State lặp, metadata/audit và giới hạn update xen giữa chưa làm | Câu12 |

Câu1 cũ dùng cách hỏi “thành phần contract” chưa rõ nhóm, nên phần field client nhìn thấy đã được nhận điểm. Đề vá **không tự tạo lỗi mới** bằng bắt bạn thi lại định nghĩa contract hoặc liệt kê method/header/schema.

Những ý chỉnh diễn đạt nhưng không bị thiếu điểm cũng không trở thành câu thi mới. Ví dụ không kiểm lại toàn bộ version/Flyway hoặc GET đọc dữ liệu chỉ để tăng số câu.

## 4. Ba loại khoảng trống khác nhau

### Sai khái niệm/áp dụng

- 204 vẫn có JSON.
- List hợp lệ rỗng đều404.
- Dùng key để thay việc gánstock đúng contract.
- Lẫn semantics PUT đúng nghĩa với khả năng Service triển khai sai.
- DELETE bị gọi làsafe dù yêu cầu xóa.

Đây là những phần cần trả lời đúng tình huống, không chỉ đổi cách diễn đạt.

### Biết hướng nhưng chưa cụ thể

- Biết breaking nhưng chưa chỉ client sai kiểu/thiếu field/từ chối unknown field.
- Biết giữ client cũ nhưng chưa nêu cách kiểm hoặc triển khai trước khi dừngv1.
- Biết replacement cần đủ field nhưng chưa chốt missingprice và400.
- Biết update trả200 nhưng chưa bỏ phần responsecreate/Location cũ.

Chỉ cần một hoặc hai câu đủ ý, không bắt viết văn dài.

### Chưa trả lời

- Audit khác hoàn tiền lặp.
- Policy DELETE204 khi đã vắng.
- Policy PUT-update-only không phải giới hạn HTTP toàn cục.
- State sau retry cùng replacement, metadata và update xen giữa.

Không ghi các vế này là “bạn đã trả lời sai”; bằng chứng hiện tại là còn thiếu.

## 5. Bản đồ đề vá: đúng20 điểm đang thiếu

Chỉ những điểm chưa có trong bài gốc mới được đưa vào:

| Câu vá | Nguồn lỗi/thiếu từ bài gốc | Điểm |
|---|---|---:|
| 1 | Câu1 thiếu0,5; câu5 thiếu4 lý do ×0,5 | 2,5 |
| 2 | Câu2 thiếu hai route resource ×0,5 | 1 |
| 3 | Câu3 thiếu target Location0,5 vàid response0,5 | 1 |
| 4 | Câu3 sai204/body | 1 |
| 5 | Câu4 list status/body và policy PUT | 3 |
| 6 | Câu6 thiếu hành động cụ thể | 0,5 |
| 7 | Câu7 hai ô còn nhầm | 1 |
| 8 | Câu8 thiếu field/status cụ thể | 0,5 |
| 9 | Câu9 hai giá trị trace và sửa assignment/state | 3 |
| 10 | Câu10 audit/refund/policy đã vắng | 3 |
| 11 | Câu15 chỉ còn Location/create | 0,5 |
| 12 | Câu16 ba ý state/metadata/concurrency | 3 |
| **Tổng** | **80−60** | **20** |

Không tính lại phần 60 điểm đã có thành điểm đề vá. Ví dụ:
- Không bắt gõ lại binding đúng ở câu15.
- Không kiểm lại POST timeout/key vốn câu12–14 đã đủ.
- Không bắt giải thích DELETE status khác vẫn idempotent vì bạn đã trả lời được.
- Không hỏi lại hai target khác nhau ở câu16.

Một vài từ như key/DTO/version xuất hiện để đặt ngữ cảnh, không tạo tiêu chí mới về triển khai các công cụ đó.

## 6. Cách học và làm đề

1. Đọc phần chữa đúng các câu còn thiếu trong file nhận xét; có thể tra mục3–10/14 của bài học.
2. Đóng đáp án, làm [đề vá riêng](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson1-va-lo-hong-lan1.md) bằng lời của bạn.
3. Không cần sửa/xóa bài gốc; để đối chiếu lỗi trước/sau.
4. Gửi chấm. Có thể nộp từng phần, nhưng chỉ xét chốt lesson khi đã đủ phạm vi đề vá.

Đổi vài ID/giá trị stock trong đề chỉ để kiểm cùng phép suy luận, không đổi loại kiến thức hoặc bắt làm bài khó hơn ngoài phạm vi.

## 7. Điều kiện hoàn tất, không có luật ẩn

- Đề vá20đ, đạt từ17/20=85%.
- Nếu đạt, dùng kết quả THI_LAI này cùng bằng chứng phần đã đúng để chốt **Lesson01 qua đề vá**; không yêu cầu100%.
- Bài gốc60/80 vẫn nằm trong lịch sử. Điểm vá là phép đánh giá lại phần yếu, không cộng hai điểm phần trăm hoặc lấy trung bình để “đẩy” điểm.
- Không tự chốt Lesson01 chỉ vì đã tạo đề; cần bài làm và snapshot chấm thật.
- Chốt Lesson01 không đồng nghĩa đạt ModuleM3-1 hoặc deliverable.

Đề này đang bao phủ toàn bộ20 điểm thiếu, không chọn một vài câu dễ để bỏ qua lỗi còn lại. Nếu điểm vá vẫn chưa đạt, lần tiếp theo chỉ sửa đúng vế còn thiếu, không mở rộng sang nội dung mới.

## 8. Kiểm chất lượng lượt soạn

- Đã đọc toàn bộ16 câu và đối chiếu lịch sử chấm; chỉ câu15 khác snapshot lượt trước, đã ghi nhận thêm2 điểm.
- 12 câu nằm trong phạm vi THI_LAI tối đa12, tổng điểm theo các vế thiếu thực tế, không ép về40 hoặc80.
- Mọi câu đều có nguồn lỗi/thiếu trong bảng trên; không thêm yêu cầu HATEOAS, pagination, JWT, Redis, ETag/lock hoặc code project.
- Có dữ kiện, điểm từng vế, dòng Trả lời và đáp án tương ứng; code/status/JSON đủ để giải theo bài học.
- Chỉ kiểm tĩnh và trace state, chưa kiểm code/API thực tế. Không suy ra kỹ năng triển khai production chỉ từ bài lý thuyết.

[Bài học gốc](LESSON_01_RESOURCE_VERSIONING_IDEMPOTENCY.md). [Đáp án/rubric đề vá](../../../Exams/de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson1-va-lo-hong-lan1__DAPAN.md), mở sau khi làm.
