# Kiểm chất lượng đề M2-4 Lesson 02 — 2026-11-10

## 1. Phạm vi và quyết định

Người học yêu cầu viết lại đề để bao phủ toàn Lesson 02, không giới hạn số câu. Bản hiện hành: [đề 16 câu](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-11-10__lesson2-lan2.md) và [bài giải/rubric](../../../Exams/de-kiem-tra/M2-4-perf-jpa__2026-11-10__lesson2-lan2__DAPAN.md).

Không phải thi toàn module M2-4. Giữ bài học, đề cũ và mọi bài nộp; không sửa tiến độ hoặc điểm khi soạn đề. Dùng chế độ LESSON mở rộng 16×5=80đ theo yêu cầu mới; đạt 68/80.

## 2. Kiểm theo từng task

| Task | Vấn đề ở đề cũ | Cách xử lý bản mới |
|---|---|---|
| Phạm vi | 8 câu gộp nhiều ý, dễ bỏ sót tiểu mục | 16 câu có vế và điểm riêng, coverage bên dưới |
| Ngữ cảnh | Nhiều câu không có Entity/DTO/data tại chỗ | Cho model, constructor, Service, bảng chung; mỗi case riêng cấp đủ giả định |
| JOIN/FETCH | Hỏi định nghĩa nhưng ít kiểm việc dùng method | Câu 2 trace query lọc; câu 3 phát hiện Service vẫn gọi findAll |
| NULL | Dễ lẫn category bắt buộc và tùy chọn | Đánh dấu case optional, cấp bảng NULL và hợp đồng null; kiểm cả Entity mapper lẫn projection |
| Batch | Gộp cơ chế/cấu hình/phép tính trong một câu | Câu 6–8 tách cơ chế, annotation, đọc/ghi và mô hình đếm |
| Projection | Ít kiểm tên Entity/constructor và managed entity | Câu 9–12 có query đúng/sai, null và thao tác setter DTO |
| Chọn giải pháp | Dễ biến thành một pattern tốt nhất | Câu 13 chấp nhận nhiều lựa chọn khi có lý do đúng |
| Kiểm hiệu quả | Ít query dễ bị đồng nhất với đúng/nhanh | Câu 14–16 kiểm overfetch, mất row và kế hoạch trước/sau |
| Rubric | Yêu cầu gộp khó tự biết mất điểm ở đâu | Mỗi vế hỏi có điểm; giải thích lỗi và đáp án tương đương |
| Độ khó | Nguy cơ hỏi paging/pool chưa dạy | Chỉ nhận diện rủi ro collection; không hỏi thuật toán paging/HikariCP |

## 3. Coverage toàn bộ kiến thức cần nắm trong lesson

| Mục bài học | Ý cần kiểm | Câu |
|---|---|---|
| 1 | Bắt đầu từ field response, use case/fetch plan | 1, 13, 16 |
| 1 | Không EAGER mọi endpoint chỉ vì một API | 1, 5 |
| 2 | JOIN lọc khác initialize quan hệ | 2 |
| 2 | JOIN FETCH và Service phải gọi đúng method | 3 |
| 2 | To-one fetch rồi mapper không cần SELECT riêng theo giả định | 3 |
| 2 | Inner/left giữ hoặc mất root khi optional | 4, 15 |
| 2 | Mapper null-safe, không tạo Category giả | 4, 15 |
| 3 | Graph attributePaths category và phạm vi method | 5 |
| 3 | Graph không cam kết SQL cố định cho mọi provider | 5, 16 |
| 4 | Global setting/annotation, Category entity và collection placement | 6, 7 |
| 4 | Batch proxy đủ điều kiện trong context, dạng IN | 6 |
| 4 | Batch đọc khác JDBC batching ghi | 7 |
| 4 | Batch size 16, 36 ID, mô hình 16/16/4 | 8 |
| 4 | Không truy cập quan hệ thì không bắt tải; không công thức mọi DB | 6, 8 |
| 5 | DTO class, constructor projection, thứ tự/kiểu/tên class | 9, 10 |
| 5 | JPQL theo Entity/field Java, không bảng/cột SQL | 9, 10 |
| 5 | Projection scalar không mang Category proxy | 9, 11 |
| 5 | Projection vẫn cần đúng JOIN/null semantics | 11 |
| 5 | Projection không thay managed entity/dirty checking | 12, 13 |
| 6 | Chọn cả bốn cách theo nhu cầu, đánh đổi | 13, 16 |
| 6 | Không fetch Category.products/collection không cần | 14 |
| 6 | Row multiplication, memory/data volume, giới hạn ORM | 14 |
| 7 | Chốt response → chọn method → map hoặc nhận DTO → kiểm kết quả | 3, 4, 9, 16 |
| 7 | Giữ ID/content/null trước khi kết luận | 4, 11, 15, 16 |
| 7 | Query count khác row/data volume/latency | 14, 15, 16 |
| 7 | Giữ điều kiện so sánh | 16 |
| 8 | Biết giới hạn: paging collection ở bài sau | Hướng dẫn đề và câu 14 nêu rõ; không có điểm ẩn |

Các phần “chỉ tra cứu” (imports, property/annotation dài) có snippet cho sẵn; không chấm trí nhớ tên logger/API/package. Các ví dụ optional là áp dụng dữ kiện đã có trong bài, không thêm chủ đề mới.

## 4. Kiểm dữ kiện và đáp án

- Category bắt buộc trong case chung; case optional được nêu rõ tại câu hỏi, không đánh đố NULL trái mapping.
- Q2 Books chọn Product 10. Không cam kết SQL count tuyệt đối cho JOIN thường.
- Q3 chỉ kỳ vọng một SELECT cho fetch to-one ở dữ kiện chung; Service phải thực sự gọi method fetch.
- Q4/Q11/Q15: inner giữ 10/11; left giữ 10/11/12, dòng 12 có categoryName=null.
- Q8: ba nhóm Category 16/16/4; tổng 4 với Product; không batch 37. Chỉ là mô hình được cấp giả định.
- Q10: DTO FQN, Entity Product và constructor Long/String/String được cấp ngay trong đề.
- Q12: setter DTO không tự UPDATE; transaction ghi/commit/no rollback được nêu rõ.
- Q16 chấp nhận cả bốn cách khi giữ response và kế hoạch kiểm nhất quán, không bắt câu văn đáp án mẫu.

## 5. Tổng điểm và giới hạn kiểm chứng

Mỗi câu 5đ; 16 câu = 80đ. Các vế công khai trong đề có tổng 5đ/câu. Mỗi câu có chỗ Trả lời và bài giải cùng số. Các link bài học/đề/rubric được kiểm tồn tại; code fences được kiểm cân bằng.

Đã đối chiếu tài liệu chính thức HQL, Spring Data EntityGraph/projections và Hibernate BatchSize trong ngày 2026-11-10. Đã kiểm tĩnh code minh họa, suy luận dữ liệu/constructor và phép tính batch. **Không build project, chạy Hibernate/DB, đo latency hoặc coi số minh họa là benchmark thật.**

Không tự đánh dấu người học đã nắm kiến thức vì đã tạo đủ tài liệu. Khi nhận bài vẫn chấm nghiêm theo rubric, giữ snapshot và điểm từng phần/toàn bài đúng mẫu số.
