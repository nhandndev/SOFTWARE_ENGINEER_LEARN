# M5-2 Kafka · Lesson 05 · Retry, DLT, kiểm chứng

`PHONG_VAN` theo lesson, 8 × 5 = 40 điểm; đạt từ 34. Khoảng 45 phút. Trả lời bằng nghĩa/timeline, không cần thuộc tên setter. [Bài học](../../Notes/M5_Scalability/M5_2_Kafka/LESSON_05_RETRY_DLT_VERIFICATION.md).

## Câu 1 - Lỗi ở đâu?

Phân loại ba case: JSON hỏng; JSON đúng nhưng version không hỗ trợ; DB tạm mất kết nối. Case nào vào business, nên retry gì, lỗi nào không tự sửa khi đợi? Ai bắt lỗi Kafka thay vì RestControllerAdvice và producer send failure có thuộc handler consumer này không?

**Trả lời:**

## Câu 2 - Hai retries hay hai attempts?

FixedBackOff(1000,2) với lỗi retryable: kể timeline và tổng số lần business được gọi. Fatal contract/decode có nhất thiết cũng ba lần không? Blocking retry ảnh hưởng record sau thế nào? Có bảo đảm DLT đúng sau 2 giây không và vì sao không infinite retry mọi lỗi?

**Trả lời:**

## Câu 3 - DLQ không phải business success

DLQ/DLT khác tên hay khác mục đích? Chuyển record lỗi vào DLT có nghĩa notification đã xong không? Payload/metadata nào cần giữ, ai xử lý tiếp, và vì sao lag source thấp chưa đủ? Nêu rủi ro dữ liệu nhạy cảm/log/ACL.

**Trả lời:**

## Câu 4 - JSON hỏng thì publish DLT bằng gì?

ErrorHandlingDeserializer chưa map được object. Recoverer cần giữ payload dạng nào? Vì sao chỉ JSON serializer có thể sai với raw bytes? Nêu ý tưởng serializer theo type, cùng partition resolver cần DLT bao nhiêu partition, và vì sao chọn topic name explicit thay vì đoán suffix.

**Trả lời:**

## Câu 5 - DLT broker lỗi

Recovery send thất bại nhưng code log rồi coi thành công. Nguy cơ checkpoint gì? Mẫu phải báo recovery failure ra sao? Nếu DLT send xong rồi crash trước source offset commit thì có thể gì? Đây có phải transaction atomic không, consumer DLT/replay phải xử lý ra sao?

**Trả lời:**

## Câu 6 - Replay cho qua dedup?

Record vào DLT vì JSON/version sai, bạn sửa code rồi đổi eventId mới để replay; bạn cũng đổi group/effect identity. Vì sao nguy hiểm? Giữ ID khi nào, xử lý payload/contract thế nào, cần audit gì và marker retention ảnh hưởng gì? Không yêu cầu triển khai replay tool.

**Trả lời:**

## Câu 7 - Thiết kế kiểm policy lỗi

Đề xuất kiểm event hợp lệ; duplicate; JSON hỏng giữ raw bytes; contract invalid; lỗi retryable; DLT send fail. Nêu số attempt/outcome cần thấy, DB/offset/DLT cần kiểm và giới hạn của unit test direct-call. Không cần chạy thật.

**Trả lời:**

## Câu 8 - Mang vào project/AI worker

Từ config plaintext lab tự build props, cần kiểm gì trước production về SSL/SASL/ACL/replication/timeouts? Metrics/log nên dùng thông tin gì và vì sao không eventId làm label? Kafka có tránh duplicate billing API AI không, khi nào không cần Kafka, và chuẩn bị lesson có đồng nghĩa xong deliverable không?

**Trả lời:**
