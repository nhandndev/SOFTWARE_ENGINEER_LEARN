# M6A-2 · Lesson 01 · Builder và Factory

Ngày soạn 2026-10-08. PHONG_VAN: 8 × 5 = 40đ; đạt từ 34/40. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_2_Patterns_CS/LESSON_01_BUILDER_FACTORY_METHOD.md). Trả lời bằng ý hiểu/pseudocode; không cần thuộc framework. Mỗi ý hỏi 1đ, đúng một phần 0,5. Không phải đề DAY_DU cuối module, không tự chốt deliverable.

## Câu 1 · Đọc chuỗi builder (5đ)

Với ExportRequest trong bài, gọi `.builder().destination("report").build()`. Kể đường chạy, không chỉ nói “tạo object”.

**Cần nói đủ:**
- Object nào được tạo ở builder()?
- destination() đổi state nào và vì sao gọi nối được?
- Limit nhận giá trị gì, từ đâu?
- Constructor/validation chạy khi nào?
- Sau build, đổi builder có đổi request cũ không, theo mẫu này?

**Trả lời:**

## Câu 2 · Builder thiếu dữ liệu (5đ)

Theo manual builder trong bài, `.builder().limit(0).build()` chưa set destination. Sau đó bạn thử destination hợp lệ với limit1,1000,1001.

**Cần nói đủ:**
- Lỗi nào xuất hiện trước ở lần gọi đầu, vì sao?
- Các biên 1/1000/1001 xử lý thế nào?
- Build có tự gọi Bean Validation hay save không?
- Invariant nên được giữ ở điểm nào?
- Nêu test cases và error contract cần kiểm.

**Trả lời:**

## Câu 3 · Có @Builder là valid/immutable? (5đ)

DTO có @Builder, setters, no-args/all-args; developer bảo state luôn hợp lệ và immutable, default field initializer chắc được dùng.

**Cần nói đủ:**
- Builder thực sự sinh/giúp gì?
- Setters/construction paths ảnh hưởng valid/immutable ra sao?
- Default cần kiểm gì trong Lombok?
- Một cách giữ validation với constructor là gì?
- Cần test đường tạo nào, và sample manual chứng minh tới đâu?

**Trả lời:**

## Câu 4 · Factory Method dispatch (5đ)

`ExportJob job = new JsonJob(); job.run("Book");` theo code bài.

**Cần nói đủ:**
- Creator/Product roles là những kiểu nào?
- run() nằm ở đâu?
- createExporter() thực sự chạy ở đâu?
- export() chạy ở object nào và trả gì?
- new có mất đi không; có tự gọi Spring/HTTP không?

**Trả lời:**

## Câu 5 · Một switch có phải GoF Factory Method? (5đ)

`simpleFactory("CSV")` dùng switch trả CsvExporter. Chỉ hai format ổn định; team yêu cầu tạo hierarchy CsvJob/JsonJob vì gọi mọi factory là Factory Method.

**Cần nói đủ:**
- Simple Factory đang giải quyết việc gì?
- Điểm khác với GoF Factory Method là gì?
- Static method tên of/create có đủ kết luận không?
- Hierarchy thêm cost nào?
- Bạn chọn cách nào với context này, vì sao?

**Trả lời:**

## Câu 6 · Factory, Strategy và DI (5đ)

Service cần một Exporter. Có thể inject sẵn hoặc factory chọn rồi gọi export; team bảo ba khái niệm này là một.

**Cần nói đủ:**
- Factory trả lời câu hỏi nào?
- Strategy trả lời câu hỏi nào?
- DI làm gì và có thể kết hợp ra sao?
- new một dependency cần Spring khác new DTO thế nào?
- Chọn thiết kế ít phức tạp nhất và nêu điều kiện thay đổi lựa chọn.

**Trả lời:**

## Câu 7 · Unknown và null không phải happy path (5đ)

Theo FactoryExample, thử simpleFactory(null), simpleFactory("XML"), và new CsvJob().run(null). Refactor định default unknown sang CSV.

**Cần nói đủ:**
- Null format trả lỗi gì?
- Unknown format trả lỗi gì?
- Null name fail ở đâu, trước hay sau tạo exporter?
- Default CSV thay đổi contract thế nào?
- Test expected/errors cần bảo vệ gì ngoài hai bản cùng trả giống nhau?

**Trả lời:**

## Câu 8 · Đề xuất mà chưa làm (5đ)

Bạn thấy ApiErrorResponse đã dùng builder. Muốn áp thêm Factory vào shopcore nhưng chưa có use case nhiều implementations và chưa chạy tests.

**Cần nói đủ:**
- Evidence nào chứng minh điều đã có?
- Chưa được suy ra điều gì về deliverable/validation?
- Cần tìm pain point/variation nào trước khi chọn Factory?
- So với constructor/injection/helper, cần cân gì?
- Log và kế hoạch test nên ghi thế nào khi chưa thực hiện?

**Trả lời:**
