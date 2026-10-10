# Bài giải M4-4 · Lesson02

8×5=40đ, đạt từ34đ. [Quy tắc](../../Notes/M4_DevOps_Engineering/M4_4_Logging_Hexagonal/QUY_TAC_CHAM.md). Không yêu cầu thuộc order số cụ thể hay tên class handler khi diễn đạt đúng trách nhiệm.

| Câu | Ý được điểm, tổng5 |
|---|---|
| 1 | Nhóm log cùng request (1); context theo thread (1); cùng thread đọc được (1); không authentication (1); không đủ distributed tracing (1) |
| 2 | finally cả return/throw (1); remove nếu không previous, restore nếu có (2); giữ key khác (1); rò context A sang B (1) |
| 3 | Không có/sai/trùng sinh ID mới (1); demo_A được nhận (1); allowlist+giới hạn (1); input vẫn không tin cậy (1); không dùng ID làm danh tính/quyền (1) |
| 4 | Đặt trước Security (1); entry point/denied handler đúng boundary (1); không đăng ký kép (1); test request bị từ chối có ID (1); kiểm chain/order hiệu lực (1) |
| 5 | AppException tới Advice MVC phù hợp (1); filter không tự tới Advice (1); MDC còn trong synchronous chain (1); finally chỉ cleanup (1); lỗi chưa xử lý đi boundary ngoài (1) |
| 6 | MDC không tự sang thread/task (1); capture ở caller (1); lưu context cũ và install ở worker (1); chạy và restore trong finally (1); tránh nhiễm task tiếp (1) |
| 7 | Default/sample bỏ async/error dispatch (2); bỏ cleanup gây leak (1); thiết kế propagation/dispatch lifecycle (1); integration kiểm error/async/header thật (1) |
| 8 | Hợp lệ/header (1); request sau ID mới (1); throw vẫn dọn và propagate (1); giữ context cũ/key khác (1); sai/trùng+giới hạn mock test (1) |

## Câu 1 - Context

Các event cùng requestId được đối chiếu dù xen kẽ. MDC thuộc thread logging trong mẫu; Service chạy cùng thread đọc context qua logger. Không phải object RequestDTO hay session lưu ID tự động. ID không chứng minh người dùng, không có span/quan hệ service nên chưa đủ tracing.

## Câu 2 - Cleanup

Bao `chain.doFilter` bằng try/finally. Không có giá trị cũ thì remove requestId, có thì restore. Không clear cả map vì key khác có owner khác. Nếu bỏ cleanup, threadpool có thể gắn dấu vết A vào B. Nếu chỉ nói “xóa sau khi xử lý” nhưng không bảo đảm khi throw, thiếu ý finally1đ.

## Câu 3 - Input

Không header → UUID; `demo_A` → nhận theo demo policy; dài100/trùng → UUID. Allowlist ASCII và64ký tự giới hạn input/echo. Client vẫn tự chọn được ID hợp lệ, có thể lặp/spoof; không dùng cho auth/audit identity. Production có thể luôn sinh ID hoặc chỉ nhận proxy tin cậy; nhận diện trade-off được chấp nhận, nhưng câu hỏi chính vẫn phải nói sample làm gì.

## Câu 4 - Security

Đặt outer filter trước Security servlet filter, không chỉ trước Controller. Security entry point/denied handler trả401/403, không phải mọi lỗi đi Advice. Chỉ một cơ chế đăng ký; kiểm chain thực và test unauthorized/forbidden có ID tại log/header trong lifecycle đã hỗ trợ. Không có Security integration thì không tuyên bố đã chứng minh đầy đủ.

## Câu 5 - Hai boundary

AppException Service đi lên MVC resolver/Advice phù hợp; ở đó filter ngoài vẫn đang chờ chain nên MDC còn. Exception ở filter không tự được DispatcherServlet xử lý, cần boundary tương ứng/container. Finally dọn context rồi lỗi chưa xử lý tiếp tục propagate; không nuốt và trả500cho mọi trường hợp.

## Câu 6 - Worker

Thread/task mới không tự được copy MDC. Capture bản sao context tại submit; worker lưu context đang có, install bản capture hoặc clear scope phù hợp khi capture rỗng, chạy, finally restore map cũ. Workerpool tái sử dụng nên cần cleanup cả khi lỗi. Không yêu cầu code TaskDecorator nhưng chỉ “truyền ID vào async” chưa đủ điểm lifecycle.

## Câu 7 - Dispatch

Mẫu default synchronous không bảo đảm ASYNC/ERROR dispatch. Bỏ cleanup để giữ ID gây sai context. Phải thiết kế propagation và filter mapping/dispatch behavior thích hợp, rồi kiểm container thật kể cả response bị reset. Tên class không thay bằng chứng. Không bắt triển khai async vì ngoài phạm vi bài; nhận diện giới hạn là đủ.

## Câu 8 - Kiểm

Trong chain/response nhận demo_A; sau finally không còn ID khi trước đó không có. B thiếu header sinh ID mới. Throw vẫn dọn và exception được rethrow. Previous value và key khác được giữ. Header sai/trùng không echo raw input. Mock filter chứng minh logic này, chưa chứng minh Security order/ERROR dispatch trên Tomcat.

Ôn Lesson02 mục2–6 nếu lẫn lifecycle thread với lifecycle request.
