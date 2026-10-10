# Hướng dẫn giải / rubric · M7-3 Lesson 01

40đ, đạt34. Năm tiêu chí mỗi câu, mỗi tiêu chí1: đủ1, đúng hướng thiếu điều kiện0,5, sai/thiếu0. Không cap ngầm; chấp nhận cách kể tương đương. Không có một “đáp án tự truyện” để học thuộc. [Bài học](../../Notes/M7_Career_Interview/M7_3_Behavioral_STAR/LESSON_01_STAR_STORY_EVIDENCE.md) · [Quy tắc](../../Notes/M7_Career_Interview/M7_3_Behavioral_STAR/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | S lỗi500/input âm trong project học (1); T sửa validation/giữ valid contract (1); A reproduce/trace/chuyển thứ tự/check (1); R400 và valid đúng qua manual, chưa automated (1); Không generalize production/all inputs (1) |
| 2 | S lab cá nhân/field thiếu (1); T mapper scope (1); A đối chiếu DTO/sửa mapping có lý do (1); AI gợi ý, bạn kiểm/sửa credit rõ (1); R một curl đúng, chưa regression/không số giả (1) |
| 3 | Hỏi context/Task cụ thể (1); Tool không thay thao tác cá nhân (1); Hỏi choice/reason/alternatives (1); Hỏi outcome/evidence/limits (1); Ghi unknown/hỏi lại, không invent facts (1) |
| 4 | Giảm40% theo baseline200 (1); Local một lượt không production/p95 (1); Conditions/data/repeats/units/method cần rõ (1); Attribution/causality không tự sole cause (1); Câu result giữ phạm vi và uncertainty (1) |
| 5 | Sửa sau nhưng lỡ demo là observed outcome (1); Nhận phần thiếu của mình, không blame vô căn cứ (1); Planned checklist chưa applied result (1); Không ép success/metric (1); Evidence lần áp dụng sau/feedback/result cụ thể khi có (1) |
| 6 | Nhóm chốt schema credit đúng (1); AI đề xuất mapper credit đúng (1); Bạn chỉnh mapping/kiểm một request (1); Không toàn hệ thống/regression claim (1); Tool hỗ trợ không xóa contribution, không nhận hết (1) |
| 7 | Historical observation không current execution/personal proof (1); Xác minh mini-project có phải shopcore không (1); Xác minh ai làm gì/AI support (1); Không đếm một event thành ba (1); Candidate/gap/không hoàn thành deliverable giả (1) |
| 8 |10 unique events/IDs, không variants đếm lặp (1); Competency mapping đúng facts (1); ≥3 events thật đúng repo shopcore (1); Labels/evidence/source/credit rõ (1); Facts checked/practice thật trước claim, Draft nếu thiếu (1) |

## Câu 1 · Tách bối cảnh khỏi trách nhiệm

S: endpoint lab trả500 với page âm. T: sửa validation trong scope mình và không đổi case hợp lệ. A: reproduce, đọc stack, nhận ra thứ tự sai, đưa validation trước PageRequest rồi kiểm. R: cases sai400/valid đúng trong lượt manual; automated regression chưa có. Không cần nhắc đúng chữ cái nếu kể đủ ý; không thêm production users hoặc mọi case đều an toàn.

## Câu 2 · Phiên bản mẫu theo facts giả định

“Trong lab cá nhân, response Product thiếu categoryName. Tôi phụ trách mapper. Sau gợi ý của AI, tôi đối chiếu DTO với mapping và bổ sung field thiếu. Một request curl sau sửa trả đúng categoryName. Tôi chưa regression toàn CRUD nên chỉ xác nhận case đã kiểm; cần bổ sung kiểm các endpoint liên quan.” Đây là cách kể minh họa, không chuyện thật của người học. Task/Action/Result và credit đủ, không cần metric giả hoặc tự nhận team lead.

## Câu 3 · Hỏi để làm rõ, không viết hộ lịch sử

Hỏi project và lỗi cụ thể, phần người kể chịu trách nhiệm, đã thao tác/kiểm gì, lựa chọn khác và lý do, outcome/nguồn xác nhận. Tool list/tính từ không cho biết contribution. Thiếu facts thì để unknown và hỏi lại; không tự thêm deadline, đồng đội hoặc kết quả đẹp. Không bắt trả lời mọi chi tiết kỹ thuật nếu không phục vụ câu hỏi hành vi.

## Câu 4 · Số đúng, phạm vi đúng

(200-120)/200=40% giảm thời gian. Chỉ nói “Trong một lượt đo local, thời gian từ200 xuống120ms, giảm40%; chưa kiểm production/p95.” Muốn claim rộng cần điều kiện/dataset/repeats/method đáng tin và xét nhiễu. Không tự quy hết nhân quả/credit cho mình khi facts chưa đủ; evidence còn yếu không chữa bằng câu văn chắc chắn.

## Câu 5 · Giữ thất bại thật

Fix thiếu field đã xảy ra nhưng demo vẫn lỡ; nêu impact và phần mình thiếu. Checklist mới dự định là future action, không outcome đã dùng thành công. STAR không bắt có chiến thắng/metric business. Khi có lần sau, thêm evidence checklist được dùng, cases/feedback/result ra sao; chưa có thì giữ gap. Learning cụ thể tốt hơn hứa không bao giờ sai.

## Câu 6 · Credit không nhị phân

Nhóm thống nhất schema, AI gợi ý mapper, bạn chỉnh field và kiểm một request. Ba phần cùng tồn tại; không tự nói toàn bộ do mình, cũng không phủ nhận mình vì có tool. Result chỉ request đã kiểm, không toàn hệ thống. Viết Action riêng rõ và ghi giới hạn verification; không cần phơi toàn bộ prompt/source riêng tư để chứng minh.

## Câu 7 · Artifact cần diễn giải

Snapshot ghi nhận lịch sử API/project, không chứng minh bạn tự debug mọi bước hoặc app hôm nay vẫn chạy. Cần xác nhận repo và vai trò, AI/hỗ trợ, các event độc lập. Mini-project không tự là shopcore. Một event nhiều tags vẫn một story; chưa đủ facts ghi candidates/gaps, không10/10 hoặc3/3 giả. Không kết tội không trung thực chỉ vì chưa có artifact public.

## Câu 8 · Inventory có thể bắt đầu bằng gaps

Đặt eventID, thời gian, repo, competency và role;10 events khác nhau, không10 bản kể cùng event. Tối thiểu3 chuyện phải từ shopcore thật; chưa đủ thì ghi thiếu. Facts/estimate/planned/unknown tách, evidence/credit ghi rõ. Draft→facts checked→practiced chỉ khi thực hiện; chuyển deliverable theo roadmap khi đủ, không chấm lý thuyết thành chứng nhận đã luyện nói/merge. Chấp nhận inventory mới ở dạng kế hoạch trung thực theo đề.
