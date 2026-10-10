# M6A-2 · Lesson 03 · Adapter và Facade

Ngày soạn2026-10-08. PHONG_VAN:8×5=40đ, đạt34. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/LESSON_03_ADAPTER_FACADE.md). Mỗi ý1đ, đúng một phần0,5. Nói theo ý hiểu/pseudocode, không bắt code SDK thật. Đề lesson, không xác nhận deliverable.

## Câu 1 · 1250 cents đi qua đâu? (5đ)

LegacyClient.lookupFee trả1250, caller gọi ShippingQuote.quote("10000") qua CentsAdapter.

**Cần nói đủ:**
- Client/Target/Adaptee/Adapter là vai nào?
- Lời gọi được translate thế nào?
- Kiểm input và response theo thứ tự nào?
- Output đơn vị/giá trị/scale là gì?
- Vì sao client bớt phụ thuộc SDK và vẫn cần contract test?

**Trả lời:**

## Câu 2 · Một cent không phải zero (5đ)

Người sửa code dùng `cents / 100`, rồi bảo int dễ hơn BigDecimal. Sau đó muốn dùng luôn adapter USD cho mọi currency.

**Cần nói đủ:**
- Integer division gây lỗi gì với1 cent?
- Mẫu valueOf(cents,2) trả gì với1/0/1250?
- Hai chữ số thập phân là contract nào?
- Có thể áp mọi currency/provider units không?
- Nêu test biên và evidence protocol cần đọc.

**Trả lời:**

## Câu 3 · Input sai và vendor lỗi (5đ)

Thử postalCode null/blank, vendor fee âm, và vendor throw RuntimeException. Developer muốn mọi lỗi trả BigDecimal.ZERO.

**Cần nói đủ:**
- Null/blank fail ở đâu và vendor được gọi không?
- Fee âm được xử lý thế nào trong mẫu?
- Vendor exception truyền ra ra sao trong mẫu?
- Fallback0 đổi ngữ nghĩa gì?
- App thật nên thiết kế/test error boundary ra sao?

**Trả lời:**

## Câu 4 · Cùng interface chưa cùng nghĩa (5đ)

ProviderA báo phí xác nhận, ProviderB chỉ estimate; hoặc hai AI providers đều có generate() nhưng context limit/quality khác. Team bảo Adapter khiến swap luôn tương đương.

**Cần nói đủ:**
- Interface compatibility khác semantic compatibility thế nào?
- Cần ghi/giữ contract gì?
- Adapter chuẩn hóa được phần nào?
- Đổi retry/model/provider có thể ảnh hưởng gì?
- Unit fake xanh chưa chứng minh điều gì và cần kiểm thêm gì?

**Trả lời:**

## Câu 5 · Trace Facade thành công (5đ)

ReportFacade.generate(10), source trảKeyboard, renderer trảreport:Keyboard, sink thành công.

**Cần nói đủ:**
- Caller được giấu những bước nào?
- Method calls chạy theo thứ tự gì?
- Giá trị nào truyền giữa các dependency?
- Return cuối là gì và facade có tự gửi email không?
- Interface đơn giản hơn đem lợi ích/cost gì?

**Trả lời:**

## Câu 6 · Renderer và sink fail (5đ)

Ở cùng Facade, renderer throw; lần khác sink ghi remote rồi timeout. Người viết bảo có Facade nên toàn bộ sẽ tự rollback, retry luôn an toàn.

**Cần nói đủ:**
- Renderer fail thì sink có chạy và generate return success không?
- Sink throw thì caller nhận gì theo code?
- Có biết chắc remote chưa ghi gì không?
- Facade/@Transactional có tự bảo vệ HTTP side effect không?
- Retry cần policy/evidence gì để tránh side effect lặp?

**Trả lời:**

## Câu 7 · Adapter hay Facade? (5đ)

CaseA: đổi cents vendor thành quote USD. CaseB: phối hợp load→render→store. Team phân loại theo số field bên trong class.

**Cần nói đủ:**
- CaseA intent là gì?
- CaseB intent là gì?
- Vì sao số delegate chưa đủ kết luận?
- Hai pattern có thể phối hợp thế nào?
- Khi nào helper/direct call đơn giản hơn?

**Trả lời:**

## Câu 8 · Test gì trước khi áp thật? (5đ)

Bạn chỉ có fakes trong lab, muốn ghi Adapter/Facade shopcore đã sẵn sàng production.

**Cần nói đủ:**
- Unit Adapter cần nhóm cases nào?
- Unit Facade cần kiểm data/order/failure nào?
- Unit fake đang chứng minh scope nào?
- SDK/storage integration cần bổ sung gì?
- Log/source observation và trạng thái nên ghi ra sao khi chưa làm?

**Trả lời:**
