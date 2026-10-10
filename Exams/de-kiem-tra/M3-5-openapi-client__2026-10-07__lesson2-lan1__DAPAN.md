# Đáp án M3-5 · Lesson02

8×5=40đ, đạt34/40; chấm đúng policy đề, không đổi policy ngầm để hợp câu trả lời.

| Câu | Rubric /5 |
| --- | --- |
| 1 | Connect khác response (1); attempt riêng (1); overall gồm retry/backoff (1); connect không chặn treo body (1); không bao inbound MVC toàn bộ (1) |
| 2 | Hai attempts tối đa (1); backoff/jitter giảm dồn tải (1); timeout trước retry theo attempt (1); sau retry theo operation (1); budget không vô hạn (1) |
| 3 | 503 retry bounded (1);404 business không retry (1);401 credential không retry (1);429 không retry ngay theo policy (1); schema sai không retry mù (1) |
| 4 | Provider 401→502 (1);404→422 (1);429→503 (1);timeout→504 (1); user JWT invalid 401 trước MVC khác upstream credential (1) |
| 5 | Remote có thể đã thực hiện (2); không tự retry ghi (1); provider hỗ trợ idempotency thật (1); cùng key/payload và reconcile policy (1) |
| 6 | Không fee0 giả success (1); check empty/amount/currency (2); BAD_RESPONSE 502 (1); release/không leak raw body/secret (1) |
| 7 | Wrapper có thể mất category/map thành 500 (2); exhausted trả lỗi cuối/unwrapping an toàn (1); consume/release resource (2) |
| 8 | 503→200 có 2 attempts/success (1);404 không retry/business422 (1);treo timeout 504 bounded (1); latency/count/category không secret (1); mock không network thật (1) |

## Câu 1

Connect chỉ thiết lập connection; per-attempt bao một lần thử tới kết quả; overall bao retry/backoff của operation client. Connection đã có không bảo đảm body tới, nên connect 300 ms chưa đủ. Overall1800ms không bao phần MVC trước/sau client call.

Ôn lesson 2 mục 1. Không yêu cầu timer hard realtime.

## Câu 2

Một retry cộng attempt đầu thành tối đa2 attempts. Backoff/jitter giảm gửi lại đồng loạt; timeout trước retry giới hạn từng lần, sau retry giới hạn cả operation. Retry có thể nhân latency/tải nên cần tổng budget.

Ôn mục 1,4–5.

## Câu 3

503 thuộc nhóm transient cho phép retry một lần.404 là unsupported,401 là key backend,429 policy không retry ngay,JSON sai là contract lỗi: không retry mù. Có thể thiết kế policy khác ngoài đời nhưng phải theo giả định đề khi chấm câu này.

Ôn mục 2.

## Câu 4

Theo contract demo: provider 401→502,404→422,429→503,timeout→504. User đã auth đúng nhưng credential backend với provider sai không phải user unauthorized. JWT user invalid thường401 ở Security trước MVC/client call.

Ôn mục 3. Không bắt mọi API phải dùng422 hoặc503 ngoài contract bài này.

## Câu 5

Timeout chỉ biết client không nhận kết quả đúng hạn; remote có thể đã trừ tiền. Không retry như GET nếu thiếu bảo đảm. Provider phải hỗ trợ idempotency contract; retry cùng operation dùng cùng key và payload, có reconciliation khi kết quả không rõ. Header tự đặt không đủ nếu provider không thực thi.

Ôn mục 2. Không chấp nhận “rollback DB local là hết trừ tiền”.

## Câu 6

Không biến lỗi thành fee0 hợp lệ. Kiểm body có dữ liệu, amount không null/âm, currency đúng contract; BAD_RESPONSE map 502. Consume/release body và chỉ trả error code/message an toàn, không raw provider body/key/stacktrace. Nếu stale fallback cần contract minh bạch riêng.

Ôn mục 3–6. Check fields 2đ: empty/amount 1đ,currency 1đ.

## Câu 7

Advice có thể không nhận wrapper, map 500 hoặc mất loại lỗi. Dùng onRetryExhaustedThrow trả signal.failure hoặc unwrapping có chủ đích. onStatus consume/release body giúp giải phóng tài nguyên response/connection, không giữ response vô hạn. Không bắt nhớ chính xác API nếu ý đúng.

Ôn mục 4–5.

## Câu 8

Fixture 503 rồi 200: đúng2 calls và success.404:1 call và local 422 sau mapping. Treo: timeout trong budget client, local 504 sau mapping, không fee0. Đo latency/attempts/category/correlation ID, không secret/raw PII. ExchangeFunction mock chỉ pipeline, không DNS/TLS/socket; cần mock HTTP server/connector thật cho tầng transport.

Ôn mục 6–7 và lesson 4 mục 6. Không yêu cầu deploy thật.
