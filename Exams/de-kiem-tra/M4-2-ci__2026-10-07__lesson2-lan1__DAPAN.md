# Bài giải M4-2 · Lesson 02

40đ; đạt 34/40. Chấm giải thích, không yêu cầu thuộc plugin XML hoặc viết test đầy đủ.

| Câu | Rubric /5 |
|---|---|
| 1 | Verify đi qua phases trước (1); không cần lặp test/package (1); Surefire/Failsafe đúng vai trò (1); plugin cần bind/config (1); không tự coverage/tests (1) |
| 2 | No tests không bằng test pass hữu ích (1); Surefire failIfNoTests tác dụng (1); không chứng minh quality/coverage/plugin khác (1); contextLoads init context (1); không CRUD/security đầy đủ (1) |
| 3 | Skip không test pass (2); || true che exit (1); assertion fail làm verify đỏ (1); publish phải chặn (1) |
| 4 | Hit vẫn compile/test (2); dependency reuse khác code pass (1); POM/wrapper hash ảnh hưởng key (1); miss thường chỉ chậm (1) |
| 5 | Cache dependency tối ưu (1); artifact report đầu ra run (1); Docker cache riêng, không tự nhận .m2 runner (2); không secrets/data thật (1) |
| 6 | Always không xóa failure (1); thiếu report trước test bình thường (1); action path từ workspace (1); ignore chỉ thiếu file (1); retention hữu hạn (1) |
| 7 | Runner host dùng published localhost port (1); container job dùng service DNS tùy network (1); DB/data test cô lập và readiness/schema (1); không prod credentials (1); Maven vs Spring profile khác (1) |
| 8 | Chỉ 1 test đã pass, skipped chưa assertion pass (2); cache/upload không chất lượng test (1); kiểm command/counts/plugin/config (1); compile fail đọc logs compiler (1) |

## Câu 1

Verify đi qua các phases trước trong default lifecycle nên không cần gọi test/package thêm chỉ để “đủ”. Surefire thường chạy unit tests; Failsafe cho integration-test/verify khi được cấu hình. Không có goals/config thì phase không tự sinh integration test hay JaCoCo gate.

**Ôn:** lesson 2 mục 1. “Verify là tự test toàn app” mất điểm cơ chế.

## Câu 2

Không tìm thấy test không phải business đã được kiểm. Surefire failIfNoTests=true giúp fail khi không có test phù hợp thay vì bỏ qua theo default; không chứng minh assertions tốt, coverage đủ hoặc plugin test khác đã chạy. ContextLoads chứng minh khởi tạo Spring context trong config test hiện tại, không xác nhận CRUD/security/rollback đầy đủ.

**Ôn:** mục 1, 3, 8. Không cần gọi contextLoads là vô ích; nó có phạm vi cụ thể.

## Câu 3

SkipTests bỏ chạy test nên không là test gate. || true có thể làm shell trả success dù Maven fail. Lệnh verify đúng để assertion failure làm Maven exit khác 0, step/job đỏ, publish needs verify bị chặn. Giữ report không phải bỏ lỗi.

**Ôn:** mục 2. Không trừ vì chưa thuộc exit code số cụ thể.

## Câu 4

Cache dependency chỉ giảm tải/tải lại thư viện. Sửa Java vẫn compile/test; không lấy cache hit làm bằng chứng snapshot mới pass. POM/wrapper nằm trong inputs hash nên thay chúng có thể đổi key; cache miss tải lại là bình thường. Workflow phải đúng cả cold/warm cache.

**Ôn:** mục 4. “Hit nên không build nữa” sai bản chất.

## Câu 5

Maven cache runner giữ dependencies có thể tái tạo; artifact giữ report của run để xem/tải; Docker build layers/cache mount thuộc builder khác. Không có cầu nối tự động để runner .m2 thành .m2 trong Docker. Cache/artifacts có thể bị người có quyền đọc hoặc giữ lâu hơn mong muốn; không chứa token/settings secret/DB production.

**Ôn:** mục 4–5. Không bắt triển khai cơ chế cache mount nâng cao.

## Câu 6

Always cho upload được thử dù verify fail; không đổi exit/status Maven. Compile fail trước Surefire có thể chưa sinh report; ignore chỉ không làm lỗi thêm vì không tìm thấy file. Action upload path từ workspace root, nên dùng shopcore/target/...; defaults.run không đổi input uses. Retention 7 ngày là hữu hạn, không backup vĩnh viễn.

**Ôn:** mục 6. Không khẳng định always đảm bảo upload sau mọi sự cố runner.

## Câu 7

Java trên runner host thường dùng localhost và port đã publish từ service. Java trong container job cùng network có thể dùng DNS service db và port nội bộ. Luôn xác định Java đang ở đâu. Chuẩn bị DB/data cô lập, readiness và schema/migration/config test, không production credentials. -P là Maven profile, không tự là Spring active profile.

**Ôn:** mục 7. Cách Testcontainers khác vẫn được điểm nếu nêu đúng network/config.

## Câu 8

Ghi một contextLoads pass, ba test skipped chưa xác minh assertions, không gọi là bốn test business pass hoặc coverage đủ. Cache hit và report upload chỉ xác nhận tối ưu/lưu output. Xem command có skip/ignore không, counts, test detection, POM/plugin/profile. Compile fail chưa có XML thì đọc compiler logs/root cause trước, không sửa đường upload để giả đã test.

**Ôn:** mục 3, 6, 8. Chấm trung thực bằng chứng, không thưởng kết luận quá phạm vi.
