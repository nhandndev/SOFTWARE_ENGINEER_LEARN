# Bài giải M4-2 · Lesson 01

40đ; đạt 34/40. Đúng ý tương đương được điểm, không bắt thuộc cú pháp/versions. Thiếu phần nào trừ đúng phần đó, không áp fail bí mật.

| Câu | Rubric /5 |
|---|---|
| 1 | Event khớp tạo run (1); workflow là công thức/run là lần chạy (1); job trên runner (1); steps thực thi và trả status (1); action là một thành phần (1) |
| 2 | Feature chưa PR không khớp (1); mở/cập nhật PR và push main có chạy (1); PR xét base (2); snapshots/ngữ cảnh có thể khác (1) |
| 3 | Workflow phải ở repo root .github/workflows (2); Notes/subfolder không tự chạy (1); phân biệt hai layout (2) |
| 4 | Runner khác local cần source (1); setup JDK khớp POM (1); OS label không Java (1); PR mặc định merge ref, không luôn head (2) |
| 5 | Defaults áp run không mọi uses (2); shell/cd không tự tồn tại step sau (2); khai báo path/env rõ (1) |
| 6 | Vị trí YAML không tạo dependency (1); needs tạo gate/order (1); runner filesystem riêng (1); needs không truyền file (1); artifact handoff hoặc rebuild (1) |
| 7 | Exit khác 0 làm fail mặc định (1); chờ command/status (1); continue-on-error có thể che gate (2); chỉ kiểm phần có phép kiểm (1) |
| 8 | Không chạy fork untrusted trong target quyền cao (2); rủi ro secrets/token (1); verify contents read (1); publish chưa deploy (1) |

## Câu 1

Event được đối chiếu on/filter; khớp thì tạo run của workflow. Job được cấp runner, các steps checkout/setup/build chạy, kết quả thành check. Workflow là công thức, run là lần thực thi; action setup-java chỉ là code tái sử dụng trong một step. Runner không phải Controller xử lý HTTP của shopcore.

**Ôn:** lesson 1 mục 1–2. Chỉ kể “GitHub tự build” chưa đủ phân biệt vai trò.

## Câu 2

Push feature chưa PR không khớp push main. Mở/cập nhật PR nhắm main khớp pull_request; merge tạo push main khớp push. PR filter xét base/đích, không bắt tên feature là main. PR merge ref và push main thuộc hai run/ngữ cảnh có thể khác, cần đọc SHA thay vì mặc định một snapshot.

**Ôn:** mục 4, 7. Không trừ vì thiếu tên activity type nếu nêu đúng hành vi.

## Câu 3

Workflow phải ở `.github/workflows/ci.yml` của repository root mà GitHub thấy. Trong repo học, file nằm dưới shopcore hoặc Notes không tự được nhận như workflow root. Nếu source shopcore chính là repo root thì `.github/workflows` nằm ngay trong gốc đó; đường dẫn giống tương đối nhưng ranh giới repo khác.

**Ôn:** mục 3. Thiếu phân biệt repo root với Java project root mất phần layout.

## Câu 4

Hosted runner là môi trường khác máy cá nhân, phải checkout source đã commit và setup Java theo POM. Ubuntu label chọn OS, không đảm bảo dùng đúng JDK. PR checkout mặc định thường dùng merge ref với base; muốn truy vết cần đọc event/ref/SHA, không luôn gán cho feature head.

**Ôn:** mục 4. Không cần thuộc dạng refs/pull/N/merge để đủ điểm.

## Câu 5

Defaults working-directory áp các run, không tự thay base path input action uses. Mỗi run thường có shell riêng, cd/biến shell step trước không tự tồn tại step sau; filesystem cùng job vẫn có thể chia sẻ. Khai báo working-directory/env/output thích hợp, tránh dựa vào trạng thái shell đã mất.

**Ôn:** mục 4–5. “Tất cả steps độc lập nên không có file chung” cũng sai.

## Câu 6

Jobs không có needs có thể song song dù viết trên/dưới. needs verify buộc publish đợi và phụ thuộc success theo mặc định. Runner/filesystem job khác không tự có JAR; cần upload/download artifact đúng run hoặc rebuild từ source. needs không là truyền file.

**Ôn:** mục 5. Chỉ thêm needs mới giải quyết thứ tự, chưa giải quyết dữ liệu.

## Câu 7

Runner chờ lệnh và nhận exit code; lỗi Maven làm step fail, step thường sau bị skip. Continue-on-error có thể khiến lỗi test không chặn theo ý định, nên không dùng để che lỗi. CI chỉ chứng minh các checks đã cấu hình trên snapshot đó, không chứng minh business chưa được test.

**Ôn:** mục 4, 7. Không cần diễn giải mọi status API của GitHub.

## Câu 8

Không đưa code fork chưa tin cậy vào workflow target có secrets/token quyền cao. Code test/build cũng chạy lệnh và có thể lấy quyền/secret. Verify chỉ cần contents read; fork thường read-only/không repository secrets theo policy. Publish đưa image vào registry, deploy mới chạy/cập nhật app ở môi trường đích.

**Ôn:** mục 1, 6. “Có secret masking nên an toàn” không đủ.
