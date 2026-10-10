# Bài giải và rubric M2-2 - Lesson 03: Transaction và Spring

Soạn lại: **2026-10-09**, khớp bản đề soạn lại cùng ngày. Không phải nhận xét bài làm của người học.

Bản bổ sung cùng ngày: đề đã cho entity/repository/exception, constructor injection, Controller với endpoint cụ thể và toàn bộ Service của câu 5–8. Không chấm kiến thức JPA mapping/HTTP từ phần code nền. EmailGateway implementation được giả định sẵn; không yêu cầu gửi email thật. Câu 5 đã giải thích saveAndFlush ngay trong đề, không thêm tiêu chí nhớ API này.

## Quy tắc chấm

- 8 câu × 5 = **40 điểm**, đạt lesson từ **34/40 = 85%**; không tự công nhận toàn module/deliverable.
- Mỗi câu dưới có năm tiêu chí, tương ứng năm gạch đầu dòng trong đề, mỗi tiêu chí **1 điểm**. Đúng một phần 0,5; thiếu hoặc sai 0. Không cap ngầm, không trừ hai lần cùng một lỗi trong một tiêu chí.
- Chấm ý nghĩa, không bắt thuộc từ proxy, tên transaction manager hoặc viết Java đúng từng dấu nếu mô tả đúng vai trò. Không lấy sự ngắn gọn làm lý do trừ điểm.
- Chấp nhận ý đã thể hiện rõ trong SQL hoặc câu khác; không bắt lặp lại máy móc. Nếu câu chữ mơ hồ, không tự thêm kiến thức người học chưa nói; ghi cụ thể phần cần làm rõ.
- Chỉ chấm giả định đề: không yêu cầu phân tích savepoint, isolation nâng cao, propagation khác REQUIRED, outbox, async hoặc cấu hình rollback ngoài đề.

## Đối chiếu bài học

Nguồn: [Lesson 03](../../Notes/M2_Database/M2_2_PostgreSQL/LESSON_03_TRANSACTION_VA_SPRING.md).

| Câu | Mục đã dạy | Điều được kiểm tra |
|---|---|---|
| 1 | 1–3 | Autocommit từng lệnh và nhu cầu transaction chung |
| 2 | 4 | BEGIN, hai lệnh hợp lệ, chủ động ROLLBACK |
| 3 | 4 | Session thấy thay đổi của mình, không thấy dữ liệu chưa commit của session khác |
| 4 | 4 | SQL lỗi trong transaction và hủy bằng ROLLBACK |
| 5 | 5–6 | Service boundary, proxy/manager, save khác commit |
| 6 | 7 | Runtime/checked exception và rollbackFor |
| 7 | 5, 7 | Bắt/nuốt lỗi, normal return, rollback-only |
| 8 | 8.1–8.2 | Self-invocation, side effect và giới hạn transaction |

Read Committed ở câu 3 là **giả định được cung cấp**, không yêu cầu định nghĩa hoặc so sánh isolation level. Phần visibility chỉ chấm kết quả đọc đã dạy ở mục 4. Tổng đề gồm 4 tình huống SQL và 4 tình huống nối sang Spring, không đòi code project.

## Câu 1 (5đ)

- 1đ: INSERT Category hợp lệ; ở autocommit và không có ranh giới ngoài thì lệnh này được commit riêng khi thành công.
- 1đ: INSERT Product bị CHECK(price > 0) chặn vì price=0.
- 1đ: cuối tình huống Category 3 còn, Product ST-01 không có.
- 1đ: cùng file/request không tự gom hai câu thành một transaction chung; lỗi lệnh hai không hủy lệnh đầu đã commit riêng.
- 1đ: cần một transaction bao cả hai bước, commit khi cả nhóm thành công hoặc rollback cả nhóm khi thất bại.

Giải thích: thứ tự hai dòng code chỉ nói lệnh nào chạy trước, không nói chúng có chung đơn vị commit. Muốn không còn Category trống sau lỗi Product phải thay ranh giới transaction, không chỉ đổi vị trí câu SQL.

## Câu 2 (5đ)

- 1đ: BEGIN bắt đầu transaction chung bao hai INSERT.
- 1đ: cả hai INSERT hợp lệ: id/sku mới, giá 15 dương, Product tham chiếu Category vừa tạo trong cùng transaction.
- 1đ: sau ROLLBACK, Category 3 không còn.
- 1đ: sau ROLLBACK, Product ST-01 không còn.
- 1đ: INSERT thực hiện thay đổi chưa đồng nghĩa đã commit; COMMIT xác nhận nhóm thay đổi, ROLLBACK hủy nhóm thay đổi chưa commit.

Giải thích: không cần có lỗi SQL mới được rollback. Dù hai lệnh hợp lệ, ứng dụng vẫn có thể chủ động hủy transaction. Không khẳng định rollback làm sequence quay lại; đề không chấm giá trị sequence.

## Câu 3 (5đ)

- 1đ: session đang ghi đọc được Category/Product mới do chính mình tạo.
- 1đ: session khác không đọc được hai dòng chưa commit đó.
- 1đ: nếu COMMIT thành công, cả Category 3 và Product ST-01 tồn tại như thay đổi đã commit.
- 1đ: với lần SELECT mới sau commit theo giả định mặc định của câu hỏi, session khác có thể thấy hai dòng đã commit.
- 1đ: nhìn thấy trong session đang ghi chỉ chứng minh session thấy thay đổi của mình, không chứng minh đã commit; trước commit vẫn có thể rollback.

Giải thích: phân biệt **ai đang đọc** và **đọc trước hay sau commit**. Không chấm định nghĩa Read Committed hoặc suy rộng mọi snapshot cũ đều thấy dữ liệu ngay sau commit.

## Câu 4 (5đ)

- 1đ: Product giá 0 vi phạm CHECK(price > 0).
- 1đ: transaction mở chuyển sang trạng thái lỗi/aborted; nói “transaction không thể tiếp tục bình thường” được chấp nhận.
- 1đ: không thể bỏ qua lỗi rồi chạy SQL bình thường/commit giữ Category như chưa có lỗi trong tình huống không dùng savepoint.
- 1đ: dùng ROLLBACK để kết thúc transaction lỗi và hủy nhóm.
- 1đ: sau ROLLBACK, không còn Category 3 hoặc Product ST-01 mới.

Giải thích: Category được thêm thành công **bên trong transaction chưa commit**, nên khác câu 1. Không yêu cầu mã SQLSTATE hoặc viết SAVEPOINT. Nếu người học biết COMMIT trên transaction đã aborted dẫn đến rollback, chấp nhận miễn không kết luận giữ được Category.

## Câu 5 (5đ)

- 1đ: đặt @Transactional trên CatalogService.register() được Controller gọi qua bean/proxy, bao cả hai repository call.
- 1đ: nếu từng repository call có transaction riêng thì Category có thể đã commit trước khi Product thất bại; không bảo đảm atomic cho cả nghiệp vụ.
- 1đ: Controller gọi lớp bao quanh Service (proxy); lớp này nhờ cơ chế transaction mở/tham gia transaction trước khi chạy method thật, rồi method gọi repositories.
- 1đ: transaction interceptor/manager điều phối commit/rollback ở ranh giới; khi cả transaction rollback thì không giữ Category mới. Không bắt phân biệt từng lớp framework nếu đúng vai trò.
- 1đ: save() trả về chưa chứng minh commit; SQL có thể flush muộn hoặc đã chạy nhưng transaction vẫn mở, commit còn có thể thất bại.

Giải thích bằng luồng:

```text
Controller -> proxy mở transaction -> register -> save Category -> save Product
-> thành công: thử commit | lỗi cần rollback: rollback
-> trả kết quả/lỗi về Controller
```

Code ban đầu không có transaction Service: categories.save() có transaction repository riêng nên Category có thể đã commit trước lỗi Product. Sau khi thêm @Transactional vào register(), repository calls tham gia transaction bao ngoài và Category không được giữ nếu cả nhóm rollback. Không mâu thuẫn hai kết quả này: chúng thuộc **trước/sau sửa ranh giới**.

Đây là tình huống không có transaction ngoài Service; không yêu cầu giải thích thời điểm commit khi method chỉ tham gia một transaction do caller sở hữu. Repository vẫn có vai trò lưu trữ, Service xác định hai bước là một nghiệp vụ.

## Câu 6 (5đ)

- 1đ: A rollback vì AppException là RuntimeException và thoát khỏi transactional method theo quy tắc mặc định.
- 1đ: Category mới trong transaction A không được giữ sau rollback.
- 1đ: B là checked exception nên mặc định không yêu cầu rollback chỉ vì exception này; theo giả định không có lỗi khác, Spring thử commit.
- 1đ: dùng rollbackFor=CheckedProblem.class hoặc mô tả cấu hình để checked exception cụ thể này cũng kích hoạt rollback.
- 1đ: quyết định dựa vào exception/quy tắc transaction, không phải HTTP status do Controller/handler chọn sau đó.

Giải thích: “có exception” chưa đủ để suy rollback; phải biết loại exception, quy tắc và việc lỗi có thoát khỏi method hay không. Không mở rộng thành yêu cầu nhớ mọi exception của Spring.

Đối chiếu code mới: A là registerRuntime(), B là registerChecked(), được hai endpoint Controller gọi trực tiếp qua bean Service; không nhầm B là this-call hoặc exception đã bị catch. Với B theo giả định commit thành công, Category-Q6B được giữ dù request đi ra bằng checked exception.

## Câu 7 (5đ)

- 1đ: AppException bị catch bên trong register(), không thoát ra tới proxy.
- 1đ: method kết thúc bình thường sau catch.
- 1đ: theo giả định không rollback-only và commit thành công, Spring thử commit và Category được giữ.
- 1đ: muốn dùng rollback mặc định cho AppException thì để RuntimeException thoát ra, chẳng hạn không nuốt hoặc catch để log rồi rethrow.
- 1đ: không suy mọi lỗi DB/JPA bị catch đều commit; lỗi có thể đã đánh dấu transaction rollback-only, khi đó không thể commit như trường hợp lỗi Java thuần của đề.

Giải thích: proxy quyết định theo điều nó quan sát ở ranh giới và trạng thái transaction. Không yêu cầu viết API setRollbackOnly hay giải thích UnexpectedRollbackException. Việc rethrow không thay thế xử lý HTTP; handler vẫn có thể map lỗi ở bên ngoài ranh giới Service.

## Câu 8 (5đ)

- 1đ: this.savePair() gọi nội bộ object, không đi qua proxy lần nữa ở proxy mode mặc định.
- 1đ: theo giả định handle() không transactional và không có transaction ngoài, annotation trên savePair() không mở transaction chung bao hai bước qua lời gọi này.
- 1đ: một cách sửa đúng: đặt @Transactional trên handle() được Controller gọi qua proxy, hoặc tách savePair sang bean được inject và gọi qua proxy.
- 1đ: ở tình huống B đã có transaction thật, DB rollback không thu hồi email đã gửi vì hệ thống email không tham gia transaction DB đó.
- 1đ: transaction không thay WHERE/constraint; nhóm thao tác atomic vẫn có thể chọn sai dòng hoặc cần DB chặn dữ liệu sai.

Giải thích: không nói “không qua proxy nghĩa là database tuyệt đối không có transaction nào”; từng repository call vẫn có thể có transaction riêng. Điều thiếu ở A là transaction chung cho cả nghiệp vụ. Không yêu cầu triển khai outbox, S3 hoặc distributed transaction để trả lời B.

## Nguồn kiểm chứng

- [PostgreSQL: Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html): transaction chung, autocommit từng lệnh, visibility và rollback.
- [Spring: Rollback rules](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/rolling-back.html): runtime/checked exception và cấu hình rollback.
- [Spring: @Transactional](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html): proxy mode, self-invocation và transaction settings.

Kiểm ngày 2026-10-09: đối chiếu cả 40 ý hỏi với 40 tiêu chí và các mục bài học nêu trên. Đây là kiểm tài liệu/lập luận, không phải báo cáo đã chạy SQL hay test Spring runtime.

Kiểm bổ sung phần code: trích nguyên 13 khối Java có tên file từ đề vào thư mục tạm và biên dịch bằng javac --release 21, Spring Framework 7.0.9, Spring Data JPA/Commons 4.1.1 và Jakarta Persistence 3.2.0 trong cache local. Biên dịch thành công, không có lỗi; không sửa source shopcore. Đây chỉ xác nhận cú pháp, type và tham chiếu class/method; chưa chạy ứng dụng hoặc SQL, chưa kiểm chứng mapping/schema, transaction runtime hay gửi email. EmailGateway implementation và config DB là giả định đã nêu, không phải phần code được tuyên bố đã triển khai.
