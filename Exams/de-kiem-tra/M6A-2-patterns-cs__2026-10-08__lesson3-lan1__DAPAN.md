# Bài giải / rubric · M6A-2 Lesson 03

40đ, đạt34. Mỗi tiêu chí: đầy đủ1, đúng hướng thiếu điều kiện0,5, sai/thiếu0. Chấm ý nghĩa, không cap ngầm. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/LESSON_03_ADAPTER_FACADE.md) · [Quy tắc](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Vai client/Target ShippingQuote/adaptee LegacyClient/CentsAdapter đúng (1); quote→lookupFee (1); Input trước vendor, negative response sau (1);1250→12.50USD scale2 (1); Cô lập vendor nhưng semantic/integration vẫn cần kiểm (1) |
| 2 |1/100 integer thành0 (1);1→0.01,0→0.00,1250→12.50 (1); Contract cents USD (1); Không mọi currency/minor units giống nhau (1); Test0/1/normal/negative và đọc provider protocol (1) |
| 3 | IAE trước call với null/blank (1); ISE negative vendor fee (1); Vendor RuntimeException propagate (1);0 che failure thành success/free (1); Translate lỗi ổn định có policy/tests, không lộ raw vendor tùy ý (1) |
| 4 | Chữ ký method không bảo semantics (1); Xác định units/estimate-vs-confirmed/limits (1); Translate request/response/error hữu hạn (1); Retry/model/provider đổi behavior/cost (1); Fake không prove quality/provider; contract/integration/evaluation phù hợp (1) |
| 5 | Giấu phối hợp subsystem (1); Load→render→store (1); Id/name/payload đúng dòng dữ liệu (1); Return report:Keyboard sau store, không email tự phát (1); Caller đơn giản nhưng thêm indirection/coordination owner (1) |
| 6 | Renderer fail: không sink/không success (1); Sink exception propagate (1); Timeout không biết chắc side effect đã xảy ra chưa (1); Facade không atomic; HTTP không tự rollback bởi local tx (1); Retry cần idempotency/failure semantics/test, không thêm tùy ý (1) |
| 7 | Adapter thích nghi incompatible contract (1); Facade đơn giản hóa workflow (1); Intent không số field/UML (1); Facade có thể gọi adapter (1); Giữ helper/direct nếu chưa có pain point đáng abstraction (1) |
| 8 | Adapter valid/biên/invalid/exception cases (1); Facade order/data/downstream không chạy khi fail (1); Fakes kiểm logic mẫu, không provider thật (1); Contract/integration/error protocol/storage side effect phù hợp (1); Proposed/gaps, không production/merged/pass giả (1) |

## Câu 1 · Translation hai chiều

Use case gọi ShippingQuote Target; CentsAdapter giữ LegacyClient adaptee. Quote validate postalCode trước, gọi lookupFee giữ mã gốc, reject response âm rồi valueOf1250 scale2 thành12.50USD. Adapter trả domain-shaped result nên client không tự biết cents/method SDK. Fakes vẫn không xác minh SDK real/protocol, cần contract/integration khi dùng thật.

## Câu 2 · Đơn vị phải có contract

Int1/100 bằng0 làm mất một cent; BigDecimal.valueOf(1,2)=0.01,0→0.00,1250→12.50. Scale2 đến từ lab centsUSD, không mặc định mọi currency/provider cùng minor units. Test các biên, giữ representation cần thiết và đọc docs response units trước mapping. Không dùng double hoặc đoán chia100 từ tên amount.

## Câu 3 · Lỗi không phải phí miễn

Null/blank postalCode throw IAE postalCode is required trước vendor. Fee âm throw ISE negative vendor fee. Vendor throw thì mẫu không catch nên cùng exception truyền ra. Trả0 cho tất cả biến lỗi thành success/free, thay contract và che sự cố. Production cần policy translate lỗi nội bộ ổn định, HTTP mapping và tests; mẫu không yêu cầu expose raw exception hay bắt mọi lỗi thành AppException.

## Câu 4 · Semantics còn phải thiết kế

Estimate và confirmed khác nhau dù cùng BigDecimal; provider AI cùng method không đồng nghĩa context/quality/tokens/retry giống. Adapter chuẩn hóa interface/data/error nhưng không xóa khác biệt vật lý/ngữ nghĩa. Ghi contract rõ và tách behavior change khi đổi provider/model/retry. Fake unit chỉ kiểm mapping theo giả định; cần integration/contract và evaluation chất lượng khi claim model behavior.

## Câu 5 · Một entry point điều phối

Caller chỉ generate(10); facade source.loadName10→Keyboard, renderer.renderKeyboard→report:Keyboard, sink.store payload, rồi trả chính payload. Không tự email/transaction/network ngoài implementation dependencies. Giảm duplication workflow và coupling caller, nhưng thêm layer và cần owner/failure semantics rõ. Không tự gọi mọi Service là Facade nếu không có lợi ích này.

## Câu 6 · Không có distributed atomicity tự động

Renderer throw thì sink chưa chạy, generate không return success. Sink throw thì lỗi truyền ra; nếu remote ghi rồi timeout thì không biết chắc state chỉ từ exception. Facade không tạo atomicity, local @Transactional không tự rollback HTTP. Retry phải xét idempotency/protocol/partial writes và failure tests; không nói tên pattern bảo đảm an toàn.

## Câu 7 · Intent quyết định

A là Adapter vì thích nghi cents/protocol với quote contract; B là Facade vì giảm hiểu biết workflow cho caller. Một/multiple delegates không định nghĩa đủ, UML giống có intent khác. Facade có thể dùng adapter làm dependency. Nếu interface đã khớp hoặc workflow đơn giản một nơi, direct call/helper có thể ít cost hơn; giữ đơn giản có lý do được chấm đầy đủ.

## Câu 8 · Evidence theo scope

Adapter kiểm0/1/1250/negative, null/blank no vendor call và exception propagation. Facade kiểm load-render-store data/order và từng failure không chạy downstream. Fakes chứng minh logic mẫu, không SDK/storage/network/rollback thật. Bổ sung provider contract/integration cùng side effect semantics; log Proposed/implemented/tested đúng việc thực tế, gaps và source, không ghi production hoặc module pass từ sample xanh.
