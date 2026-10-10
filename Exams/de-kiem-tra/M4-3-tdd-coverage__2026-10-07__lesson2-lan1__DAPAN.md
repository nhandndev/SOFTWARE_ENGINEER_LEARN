# Đáp án M4-3 · Lesson02

8×5=40đ, đạt34/40. [Quy tắc](../../Notes/M4_DevOps_Engineering/M4_3_TDD_Coverage/QUY_TAC_CHAM.md).

| Câu | Rubric /5 |
|---|---|
| 1 | A unit/policy thật (1); B MVC thật Service mock (1); C JPA/PG thật (1); phạm vi mock phù hợp (1); không full context mọi case vì chi phí/khoanh lỗi (1) |
| 2 | Không chứng minh SQL/constraints (2); mock chỉ kịch bản đã stub (1); reader/repository+DB thật (1); DB test cô lập không prod (1) |
| 3 | Fee0 đúng (1); bỏ nhân ra30000 (1); assert giá trị không chỉ nonnull (1); quantity0 code INVALID_PARAMETER (1); không interaction reader (1) |
| 4 | Kiểm binding/status/JSON (2); không policy thật (1); filters tắt không kiểm auth (1); giữ chain và case401/403 riêng (1) |
| 5 | abc type mismatch trước Service (2);0 parse được (1); cần validation hoặc business/handler cho400 (1); verify không gọi Service khi binding fail (1) |
| 6 | Cache/chưa SQL có thể che lỗi (1); flush ép SQL (1); clear rồi đọc lại (1); flush chưa commit (1); deferred cần kiểm commit boundary (1) |
| 7 | Không đảm bảo rollback HTTP server (2); thread/transaction khác (1); DB/schema/container test riêng (1); cleanup phạm vi đúng không prod/shared wipe (1) |
| 8 | contextLoads chỉ context (1); mock client chỉ pipeline fixture (1); chưa business/socket/provider (1); unit fee và HTTP connector test thích hợp (1); provider smoke riêng không thay fixture (1) |

## Câu 1

A unit Java thật cho rule; B MVC slice chạy binding/serialization, mock Service; C JPA/repository và PostgreSQL test thật. Các dependency ngoài trọng tâm có thể thay nhưng không mock phần muốn kiểm. Full context cho mọi case tăng setup/chậm và khó khoanh lỗi, không tự tăng chất lượng assertion.

Ôn Lesson02 mục1–2. Slice có thể được gọi là integration hẹp nếu mô tả đúng, không trừ vì taxonomy khác.

## Câu 2

Không. Mock trả giá do test lập trình, không chạy query, FK hay transaction thật. Muốn kiểm reader query cần implementation/repository thật trên PostgreSQL test đã seed dữ liệu, cô lập khỏi prod và workload khác. Test unit vẫn có ích cho Service, không bị “vô giá trị” vì scope nhỏ.

Ôn mục2,6.

## Câu 3

250000×2=500000 nên phí0. Bỏ nhân quantity ra250000 nên phí30000, assertion số tiền bắt được. Quantity0 phải AppException có ErrorCode.INVALID_PARAMETER và không đọc reader; chỉ assert có bất cứ exception không đủ.

Ôn mục3–4. Không cần thuộc verifyNoInteractions syntax.

## Câu 4

Có bằng chứng MVC bind/query/gọi collaborator/serialize JSON/status theo case; policy không chạy nếu Service bị mock. Tắt filter thì không chứng minh Security401/403. Cần test riêng giữ chain và credential/quyền đúng/sai; không suy từ JSON200 rằng API auth đúng.

Ôn mục5. Đề đã cho auth đi qua, không trừ vì không cấu hình lại CSRF ở một GET này.

## Câu 5

abc không đổi thành int được nên binding fail trước Service, thông thường400.0 là int hợp lệ; cần validation/Service rule và handler phù hợp mới cấm. Case abc verify Service không được gọi; mock không interaction ở lỗi binding cũng là kiểm boundary.

Ôn mục5. Không dùng tên exception không thuộc lòng để trừ nếu cơ chế đúng.

## Câu 6

Đọc lại có thể trả object đang managed; save chưa luôn flush/commit nên chưa ép SQL/constraint. Flush rồi clear và query lại giúp kiểm DB thay cache; constraint không deferred có thể được kiểm khi flush. Flush chưa commit; deferred constraint cần kiểm boundary commit thích hợp. Không “clear tự commit”.

Ôn mục6.

## Câu 7

Không chắc. Test transaction gắn thread test, request server thường ở thread/transaction khác; rollback test không bao mọi write server. Dùng DB/schema/container test riêng, fixtures và cleanup đúng resource, không trỏ prod hoặc wipe DB dùng chung. Không cần thuộc API Testcontainers.

Ôn mục6–7.

## Câu 8

contextLoads kiểm startup context, mock client kiểm pipeline trên response đã dựng, không business fee hoặc network thật. Thêm unit fee/Service; HTTP stub qua connector cho socket/request/TLS với TLS setup phù hợp; smoke provider riêng cho env/credential/contract live. Các tầng bổ sung, không thay bằng một test mở context.

Ôn mục7. HTTP plain stub chưa chứng minh TLS production.
