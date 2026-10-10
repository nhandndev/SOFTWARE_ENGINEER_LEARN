# M3-5 · Lesson02 Timeout, Retry, Error · Lần1

PHONG_VAN theo lesson 8×5=40đ, đạt34/40. 30–40 phút. Policy demo: GET carrier read-only; per-attempt 800 ms; retry 1 lần với backoff; overall 1800 ms; provider 404=unsupported,401=credential backend sai,429=quota dependency. Không áp mapping này cho mọi provider.

## Câu 1 - Ba timeout

Phân biệt connect, per-attempt và overall. Nếu chỉ có connect 300 ms nhưng provider kết nối rồi không trả body thì sao? Overall1800ms có bao toàn bộ inbound MVC không?

**Trả lời:**

## Câu 2 - Retry tính thế nào?

Retry.backoff(1,100 ms) nghĩa tổng mấy attempts? Vì sao cần backoff/jitter và overall deadline ngoài retry? Timeout trước retry khác timeout sau retry ở phạm vi nào?

**Trả lời:**

## Câu 3 - Chọn lỗi được retry

Theo policy bài: provider 503;404;401;429;JSON sai. Case nào retry, case nào không, vì sao? Không cần thuộc enum.

**Trả lời:**

## Câu 4 - Mapping hai HTTP boundary

Nêu local status tương ứng provider 401,404,429 và client timeout. Vì sao provider 401 không được trả user 401 một cách máy móc? JWT user invalid khác ở đâu?

**Trả lời:**

## Câu 5 - POST payment timeout

Timeout có chứng minh remote chưa trừ tiền không? Có retry giống GET quote được không? Điều kiện idempotency và cách dùng key cần gì?

**Trả lời:**

## Câu 6 - Response không hợp lệ

Provider 200 body rỗng hoặc amount âm. Có trả fee0 để tránh lỗi không? Client cần kiểm gì, map gì và xử lý raw body/error response ra sao?

**Trả lời:**

## Câu 7 - Review pipeline

Client retry hết ném RetryExhausted thay lỗi cuối, Advice chỉ nhận RemoteCallException. Rủi ro gì và sửa sao? Vì sao onStatus cần consume/release body, không giữ response chưa đọc?

**Trả lời:**

## Câu 8 - Kiểm chứng và quan sát

Mô tả fixture provider 503 lần 1 rồi 200 lần 2; provider 404; provider treo. Ghi chỉ số nào và mong đợi gì? Mock ExchangeFunction có kiểm được DNS/TLS/socket timeout thật không? Không cần viết JUnit.

**Trả lời:**
