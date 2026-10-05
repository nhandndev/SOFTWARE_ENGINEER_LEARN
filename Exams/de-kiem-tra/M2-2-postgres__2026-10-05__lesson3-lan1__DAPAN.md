# Đáp án và rubric M2-2 - Lesson 03: Transaction và `@Transactional`

> Không đọc trước khi làm đề. Tổng 40 điểm thô, 8 câu x 5 điểm. Chấm theo **ý nghĩa**, chấp nhận diễn đạt bằng lời. Không trừ vì chưa nhớ thuật ngữ proxy/transaction manager nếu mô tả đúng vai trò. Các ngoại lệ nâng cao ngoài giả định đề không cần nêu.

## Câu 1 (5đ)

- 1đ: lệnh thêm Category 3 hợp lệ và được commit riêng khi không có transaction bao quanh.
- 1đ: Product giá 0 bị `CHECK (price > 0)` chặn, không tồn tại.
- 1đ: Category 3 vẫn tồn tại sau lỗi của lệnh hai.
- 2đ: mặc định mỗi câu lệnh riêng là một transaction khi không có `BEGIN`/ranh giới do client quản lý; cùng file/request không tự gom nhiều lệnh.

## Câu 2 (5đ)

- 1đ: cả hai `INSERT` hợp lệ trong transaction.
- 2đ: sau `ROLLBACK`, không còn Category 3 hay Product ST-01.
- 2đ: thao tác đã thực hiện nhưng chưa `COMMIT`; `ROLLBACK` hủy hiệu lực của toàn bộ thao tác trong transaction đó.

## Câu 3 (5đ)

- 1đ: session đang ghi thấy thay đổi do chính mình tạo trong transaction.
- 2đ: session khác không thấy hai dòng **chưa commit**.
- 2đ: sau `COMMIT`, Category 3 và Product ST-01 cùng tồn tại; session khác có thể thấy dữ liệu đã commit theo quy tắc đọc của nó.

## Câu 4 (5đ)

- 1đ: Product giá 0 vi phạm `CHECK (price > 0)`.
- 2đ: transaction chuyển sang trạng thái lỗi; không thể tiếp tục như chưa có gì rồi commit giữ Category 3 bằng cách thông thường.
- 1đ: `ROLLBACK` là bước đơn giản đúng; savepoint chỉ là kiến thức mở rộng, không bắt buộc.
- 1đ: sau `ROLLBACK`, Category 3 không còn.

## Câu 5 (5đ)

- 2đ: đặt `@Transactional` ở method Service `register()` bao **cả hai** repository call khi được gọi qua Spring proxy.
- 1đ: transaction riêng trên từng repository call không đảm bảo cả hai cùng rollback nếu một call sau thất bại.
- 2đ: `save()` trả về chưa phải thời điểm commit; JPA có thể ghi/flush sau hoặc đã ghi nhưng transaction còn mở.

## Câu 6 (5đ)

- 2đ: A là `RuntimeException` thoát ra nên rollback theo mặc định.
- 2đ: B là checked exception, mặc định không tự rollback chỉ vì lỗi này thoát ra; Spring có thể commit nếu không có nguyên nhân khác khiến transaction lỗi.
- 1đ: cấu hình `@Transactional(rollbackFor = CheckedProblem.class)` (hoặc quy tắc tương đương) nếu B cũng phải rollback.

## Câu 7 (5đ)

- 1đ: exception đã bị bắt bên trong method, không thoát ra tới proxy.
- 2đ: theo giả định đề, method kết thúc bình thường nên Spring **thử commit**; không tự rollback vì lỗi Java đã bị nuốt.
- 2đ: `save()` trả về không bảo đảm Category đã commit tại dòng đó; commit ở ranh giới transaction, SQL còn có thể được flush muộn.

## Câu 8 (5đ)

- 2đ: `this.savePair()` là self-invocation, bỏ qua proxy trong cấu hình mặc định; annotation trên method được gọi không bảo đảm mở transaction mới.
- 1đ: đặt `@Transactional` trên `handle()` được gọi từ bên ngoài qua proxy, hoặc tách `savePair()` sang bean khác được inject và gọi qua proxy.
- 2đ: rollback DB không tự thu hồi email/S3/HTTP side effect đã xảy ra; cần thiết kế riêng cho tác động ngoài DB.

## Lỗi tư duy cần chữa khi chấm

- "Hai lệnh trong một request thì tự atomic": sai nếu không có chung ranh giới transaction.
- "`save()` thành công nghĩa là đã commit": không đúng; commit ở cuối transaction, lỗi còn có thể đến lúc flush/commit.
- "Mọi exception đều rollback": mặc định khác nhau giữa runtime và checked, còn phải xem exception có thoát ra ngoài method hay không.
- "Có `@Transactional` ở đâu đó là đủ": cần lời gọi đi qua proxy và ranh giới bao trùm đủ các bước nghiệp vụ.
- "DB rollback thì email cũng biến mất": transaction DB không quản lý email/S3.
