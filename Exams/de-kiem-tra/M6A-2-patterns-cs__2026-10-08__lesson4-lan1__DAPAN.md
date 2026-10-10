# Bài giải / rubric · M6A-2 Lesson 04

40đ, đạt34. Mỗi tiêu chí1đ: đủ1, đúng hướng thiếu điều kiện0,5, sai/thiếu0. Chấm reasoning tương đương, không cap ngầm. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/LESSON_04_DECORATOR_PROXY_COMPOSITE_REVIEW.md) · [Quy tắc](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Same TextSource/delegate composition (1); Bracket→Prefix→Plain (1); Reverse returns [sale:Book] vs sale:[Book] (1); Exception propagate, không fallback (1); Chọn helper khi fixed/simple, nêu indirection cost (1) |
| 2 | Prefix thêm display behavior (1); Guard kiểm access (1); False deny no next, true delegate (1); Mỗi read hỏi supplier, bypass cần chặn thật (1); Intent không UML, cache/retry có contract cost (1) |
| 3 | Deny không gọi protected side effect (1); Check sau đã quá muộn và đổi behavior (1); Boolean chung gây user/tenant leak/race (1); Trusted principal/policy/context chứ không raw flag (1); Allow/deny/no-call/context-change tests, không claim production security (1) |
| 4 | External qua proxy khác this trực tiếp (1); Annotation không tự intercept self-call trong proxy mode (1); JDK interfaces/CGLIB subclass và final/private caveats (1); Manual unit không Spring integration (1); Test real proxy/advice/transaction boundary phù hợp (1) |
| 5 | Chung Node.count, leaf1/group sum (1); Root 1+(1+1)=3 qua recursion (1); Empty0 (1); Duplicate instance counted2 occurrences (1); Unique policy riêng; addExact overflow throw theo mẫu (1) |
| 6 | Snapshot container không đổi theo list gốc (1); Không deep-copy arbitrary Node (1); Cycle/depth/visited policy phù hợp (1); Không prove LAZY/query/session behavior (1); Test empty/nested/duplicate/mutation và integration nếu JPA (1) |
| 7 | Annotation và call-site là observation (1); Builder không tự immutable/invariant (1); Không suy Factory/Structural/merged (1); Source khác execution/integration evidence (1); Ghi observation/proposed/gaps, giữ trạng thái chưa đạt (1) |
| 8 | Pain point thật, không bịa feature đã có (1); Benefit vs types/indirection/test cost và simple options (1); Giữ output/error/order/units/lifecycle, tách behavior changes (1); Baseline và tests theo boundary, không chỉ sample (1); Log status trung thực, dừng/giữ khi chưa đáng abstraction (1) |

## Câu 1 · Wrapper order là behavior

Các object implement TextSource và giữ delegate cùng contract. Cách đầu gọi Bracket→Prefix→Plain, return Book→sale:Book→[sale:Book]. Cách sau ra sale:[Book]. Next throw thì mẫu không catch, cùng lỗi truyền ra, không success rỗng. Nếu chỉ hai thao tác cố định một nơi, helpers có thể dễ đọc hơn; Decorator đổi được composition nhưng tăng call depth/types.

## Câu 2 · Intent quan trọng hơn hình

PrefixText bổ sung responsibility hiển thị; GuardedText kiểm có được truy cập target. False throw trước next, true trả/delegate result/error. Supplier được đánh giá mỗi read, không memoize user đầu. Cùng next/interface không đủ phân loại; production cần tránh bypass target. Cache/retry có thể đổi stale data/side effects, phải có contract riêng, không tự refactor thuần.

## Câu 3 · Authorization phải đến trước protected work

Denied request không được gọi dependency được bảo vệ. Gọi trước check có thể đã ghi dữ liệu/gửi remote dù cuối cùng throw, khác behavior cũ. Boolean dùng chung giữa users không phản ánh request principal, có thể lộ tenant/state. Cần trusted identity/policy và boundary tránh bypass. Test deny no-call, allow exactly needed call, permission/context đổi giữa calls; mẫu supplier không chứng minh production authentication/authorization.

## Câu 4 · Proxy boundary không tự tái nhập

External caller qua proxy có interception; target tự this.otherMethod là gọi trực tiếp, không tự advice ở annotation đó trong proxy mode. JDK dựa interfaces, CGLIB subclass có giới hạn final/private; không yêu cầu kể mọi chi tiết bytecode. Unit manual wrapper không tạo Spring proxy hoặc transaction. Kiểm thực wiring/advice/rollback/security boundary liên quan trước claim, không suy từ delegate test xanh.

## Câu 5 · Đếm occurrences

Node chung count; Leaf trả1, Group gọi child.count và sum. Root nhận1 từBook,2 từsubgroup rồi trả3; empty trả0. Cùng book reference hai lần trả2 vì count occurrences, không unique objects. Unique Product cần identity/key/rule khác; mẫu Math.addExact throw overflow thay wrap, không count vô hạn hoặc tự deduplicate.

## Câu 6 · Container snapshot không thay graph policy

List.copyOf tách snapshot children nên sửa list đầu vào không đổi Group; không clone mọi Node. Custom Node có thể mutable/cycle, graph sâu có stack risk; cần depth/visited/ownership theo use case. Pure Java recursion không kiểm query count/session LAZY. Test cây/empty/nested/duplicate/list mutation, thêm integration khi dùng JPA và ghi rõ gap, không nói Composite xử lý hết.

## Câu 7 · Đọc source không invent thành tích

@Builder và `.builder().code(...).build()` là evidence builder-style construction. Setters/constructors khác vẫn ảnh hưởng mutable/valid state. Không thấy role khác thì không claim đã áp đủ Builder+Factory+Structural hoặc merge; framework có pattern nội bộ không thay refactor có chủ đích của học viên. Ghi source observation/time/version, proposed/tests gaps; không tự chốt đạt từ QA mẫu.

## Câu 8 · Proposal nhỏ và trung thực

Trước hết pain point/evidence thật; provider giả định chỉ là future candidate. So constructor/helper/DI với pattern dựa complexity giảm và cost types/indirection/testing. Giữ contract output/error/units/order/side effects/lifecycle; thay model/prompt/retry/schema tách riêng. Baseline, change nhỏ, unit và integration theo boundary. Chưa code thì Proposed, chưa test thì không Tested, chưa merge thì không Merged; dừng hoặc giữ thiết kế đơn giản khi lợi ích chưa đủ, không ép đủ pattern bằng feature giả.
