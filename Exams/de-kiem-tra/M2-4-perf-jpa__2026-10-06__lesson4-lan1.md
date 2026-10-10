# M2-4 Performance · Kiểm tra Lesson 04

> LESSON: 8 câu ×5đ =40đ; normalize /40 ×100. Số liệu giả định, không cần chạy load test. Chấm theo tư duy.

## Câu 1 (5đ)
Pool max=2, A/B đang mượn cả hai connection. C cần DB. C làm gì; nếu A trả trước timeout thì sao; nếu không connection nào khả dụng trước timeout thì sao? Mượn/trả khác tạo/đóng connection vật lý thế nào?

**Trả lời:**

## Câu 2 (5đ)
connection-timeout=3000ms nhưng query đã mượn connection chạy 8 giây. Có mâu thuẫn không? Phân biệt connection-timeout, validation-timeout và max-lifetime; max-lifetime có cắt query đang chạy không?

**Trả lời:**

## Câu 3 (5đ)
leak-detection-threshold=10000ms; connection được trả sau 12 giây. Warning có chứng minh leak vĩnh viễn không, có tự đóng/rollback không? Nêu hai nguyên nhân khác và cách kiểm.

**Trả lời:**

## Câu 4 (5đ)
DB dành 40 connection cho app. Bốn instance, mỗi pool max=15. Tính trần tổng và đánh giá. Tăng pool có chắc tăng throughput không? Cần cân nhắc thêm gì lúc rolling deploy?

**Trả lời:**

## Câu 5 (5đ)
Số giả định, cùng workload/môi trường/cache, response đúng, chỉ đổi pool:

| Pool max | Pending | p95 | Throughput | DB CPU |
|---|---|---|---|---|
| 5 | Cao | 700ms | 90req/s | 45% |
| 10 | Thấp | 250ms | 140req/s | 70% |
| 30 | Thấp | 600ms | 110req/s | 98% |

Chọn ứng viên trong ba mức để kiểm tiếp và giải thích bằng ít nhất hai chỉ số. Vì sao không chọn 30 chỉ vì pending thấp? Cần kiểm thêm gì về ngân sách nhiều instance và độ tin cậy phép đo trước khi dùng thật?

**Trả lời:**

## Câu 6 (5đ)
Số giả định, cùng endpoint/dataset/cache/tải, response đúng:

| Bản | Query/request | p50 | p95 | Throughput | Error |
|---|---|---|---|---|---|
| A | 22 | 180ms | 520ms | 80req/s | 0% |
| B | 2 | 70ms | 140ms | 130req/s | 0% |

Giải thích p95 và kết luận có điều kiện. Vì sao 2 query có thể hợp lý với Page, không phải cứ >1 là N+1?

**Trả lời:**

## Câu 7 (5đ)
Thiết kế 4–6 bước đo trước/sau sửa fetch plan: dữ liệu, điều kiện, tính đúng response, chỉ số, số lần đo. Sau đó tune pool thế nào để biết tác dụng từng thay đổi?

**Trả lời:**

## Câu 8 (5đ)
Query giảm 22→2 nhưng p95 tăng. Có nên giữ thay đổi chỉ vì ít query không? Nêu ba nguyên nhân cần kiểm và bằng chứng cần thêm; có được báo “đã benchmark” nếu chỉ đọc bảng giả định trong lesson không?

**Trả lời:**
