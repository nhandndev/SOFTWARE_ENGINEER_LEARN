# M6A-2 · Lesson 02 · Family, copy và Singleton

Ngày soạn 2026-10-08. PHONG_VAN:8×5=40đ, đạt34. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/LESSON_02_ABSTRACT_FACTORY_PROTOTYPE_SINGLETON.md). Mỗi ý1đ, đúng một phần0,5; trả lời bằng ý hiểu, không ép code project/thuộc API. Đây là đề lesson, không chốt module/deliverable.

## Câu 1 · Trace family A/B (5đ)

`new PackageClient(new PartnerAFactory()).prepare("Book")`. Sau đó thay factoryB, không sửa PackageClient.

**Cần nói đủ:**
- Có những product roles nào?
- Factory được chọn ở đâu, tạo dependencies khi nào?
- Prepare gọi theo thứ tự nào?
- Output marker A/B là gì và có phải chữ ký thật không?
- Client được tách khỏi concrete implementation tới đâu?

**Trả lời:**

## Câu 2 · Thêm family khác thêm role (5đ)

Đang có A/B Encoder+Signer. So sánh thêm PartnerC với thêm Compressor cho mọi partner.

**Cần nói đủ:**
- Thêm C cần implementation nào?
- Thêm Compressor ảnh hưởng interface/factories nào?
- Family compatibility giải quyết pain point gì?
- Chi phí mở rộng theo hai hướng khác nhau ra sao?
- Nếu chỉ có một Encoder ổn định thì chọn gì đơn giản hơn?

**Trả lời:**

## Câu 3 · Factory trộn A/B (5đ)

Custom PartnerFactory trả EncoderA và SignerB. Developer bảo Abstract Factory tự bảo đảm không bao giờ có cặp sai vì dùng interface.

**Cần nói đủ:**
- Type system trong mẫu có cấm cặp đó không?
- Contract family yêu cầu gì?
- Implementation/tests cần kiểm gì?
- Abstract Factory khác Factory Method ở intent/collaboration nào?
- Có nên gom JWT, DB pool, email vào một factory chỉ vì đều là object không?

**Trả lời:**

## Câu 4 · Copy template có độc lập không? (5đ)

base có columns[id,name], detail=base.copy("detail"), detail.addColumn("price"). Theo mẫu bài.

**Cần nói đủ:**
- Có những object/list nào mới được tạo?
- Columns cuối của base và detail là gì?
- Getter cho caller sửa list trực tiếp không?
- Nếu columns là object mutable thay vì String thì cần xét gì?
- Có bắt Cloneable và có tự nhanh hơn constructor không?

**Trả lời:**

## Câu 5 · Duplicate JPA Product bằng clone (5đ)

Muốn tạo Product mới, bạn copy cả id/version/audit/SKU/quan hệ rồi save; gọi đó là Prototype nên không cần rule khác.

**Cần nói đủ:**
- Identity cũ có thể dẫn tới hành vi gì?
- Những fields/rules nào phải được quyết định?
- Quan hệ nên copy/share theo tiêu chí gì?
- Duplicate use case có phải refactor thuần không?
- Nêu loại test/constraint evidence cần có, không cần chạy thật.

**Trả lời:**

## Câu 6 · Singleton thread-safe tới đâu? (5đ)

FormatCatalog dùng static Holder; một người thêm currentUser và list mutable dùng chung rồi bảo initialization thread-safe nên mọi request an toàn.

**Cần nói đủ:**
- Holder đang kiểm soát khía cạnh nào?
- Phạm vi instance có phải mọi JVM không?
- Mutable request state có thể gây lỗi gì?
- State theo request và shared mutable state nên được xử lý thế nào?
- Cần kiểm chứng gì nếu claim concurrency safety?

**Trả lời:**

## Câu 7 · Spring singleton và prototype (5đ)

Hai bean definitions cùng class tạo hai object. Singleton Service inject prototype một lần nhưng muốn mỗi request có object mới. Team nói Spring sai Singleton/Prototype.

**Cần nói đủ:**
- Spring singleton tính theo phạm vi nào?
- Hai definitions/contexts có mâu thuẫn scope không?
- Spring prototype khác Prototype pattern thế nào?
- Inject một lần có tự tạo mới mỗi request không?
- Dependency/lifecycle nên được làm rõ bằng cách nào?

**Trả lời:**

## Câu 8 · Một instance không phải lý do đủ (5đ)

Service đang được constructor-inject, stateless; team muốn constructor private và static getInstance cho chắc, đồng thời claim không cần lifecycle tests.

**Cần nói đủ:**
- Pain point hiện tại đã được scope/DI giải quyết thế nào?
- Global access ảnh hưởng dependency visibility và testability gì?
- Instance tự quản có tự nhận container lifecycle/proxy không?
- Bạn giữ/đổi thiết kế với trade-off nào?
- Log/tests cần ghi gì khi chưa sửa/chưa chạy?

**Trả lời:**
