# Tổng kết M3-1 — REST Best Practices

Ngày 2026-11-21. **Đạt phần kiến thức qua ba lesson; chưa xác nhận deliverable/capstone.** Hướng học: hiểu rộng, nắm bản chất, đào sâu đúng phần quan trọng để làm nền AI Engineering, không bỏ nền Software.

## 1. Kết quả và bằng chứng

| Lesson | Điểm thô | Phần trăm | Nhận xét |
|---|---:|---:|---|
| 01: resource/versioning/idempotency | 68,5/80 | 85,625% | [Chi tiết01](M3-1-rest-bp__2026-11-20__lesson1-lan2__NHANXET.md) |
| 02: pagination/filter/sort/DTO | 60/60 | 100% | [Chi tiết02](M3-1-rest-bp__2026-11-20__lesson2-lan2__NHANXET.md) |
| 03: error contract/luồng lỗi/HATEOAS | 36,5/40 | 91,25% | [Chi tiết03](M3-1-rest-bp__2026-11-21__lesson3-lan2__NHANXET.md) |

Cả ba lesson đạt ngưỡng85%. Cộng các bài là **165/180 ≈91,67% để tham khảo tổng hợp**, không phải điểm của một đề final module mới. Các đề có độ dài/format khác nhau. Điểm gần nhất trong05 là91,25% của Lesson03.

## 2. Đã thể hiện được gì?

- Hiểu API contract là điều client phụ thuộc: đổi field, kiểu hoặc shape có thể làm client hỏng dù backend compile.
- Biết chuyển version phải xét client cũ; không bắt tạo DB riêng hoặc sao chép toàn bộ Service.
- Phân biệt timeout/retry, unique dữ liệu và ý định gọi; key không tự bảo đảm mọi side effect đúng một lần.
- Tính được filter AND → sort → page; phân biệt tổng tập lọc với số dòng trang hiện tại.
- Hiểu order unique không đóng băng dữ liệu giữa hai request.
- Biết map entity sang DTO, giữ metadata và không phụ thuộc JSON nội bộ framework như schema bất biến.
- Phân biệt exception, handler và representation lỗi; biết thống nhất các nhánh ngoài AppException.
- Nhận diện giới hạn filter/startup/Security/response commit; không coi một Advice là bao phủ toàn server.
- Biết không lộ secret/stack trace và cần giữ tương thích error contract.
- Nhận diện self/category/link, không nhầm versioning hoặc pagination với HATEOAS.

Đây là đánh giá bài viết. Không suy ra mức junior/mid/senior hoặc bảo đảm triển khai production.

## 3. Các điểm chưa được vá hết

### Từ Lesson01

- PUT replacement đúng nghĩa là idempotent; DELETE không safe dù idempotent.
- Code Service viết sai không làm thay đổi semantics mà endpoint phải đáp ứng.
- Idempotency không tự chống lost update khi có người sửa xen giữa.
- Metadata/audit khác không tự phủ định intended effect.
- Một số chi tiết URL/Location/list và lý do breaking còn cần cụ thể hơn.

Chưa có bài sửa chứng minh đã vá hết các ý này. Checklist idempotency trong01 **vẫn chưa tick**, không che khoảng trống bằng điểm tổng. Lesson01 đã đạt theo ngưỡng, không phải đạt100%.

### Từ Lesson03 — còn thiếu3,5đ

1. ErrorCode có thể giữ trong business; handler chuyển thông tin sang ProblemDetail.
2. page=abc là query param → int, không phải JSON → DTO; method không hỗ trợ là405.
3. Body.status404 không thay HTTP200; phải trả HTTP status đúng thật, không phải thêm metadata.
4. Log nội bộ cần quyền truy cập và che secret; ID trả client phải liên kết với log cùng sự cố.

Đây là kiến thức cốt lõi cần giữ khi làm backend/AI service, không phải chi tiết framework có thể bỏ. Có thể ôn ngắn và củng cố trong dự án sau; không bắt code lại toàn bộ chỉ để chuyển bài.

## 4. Phần chưa xác nhận

- Chưa kiểm API tích hợp chạy thật: versioning, pagination và error format nhất quán giữa các endpoint.
- Chưa xác nhận handler app đã chuyển sang ProblemDetail hoặc các đường filter/Security được kiểm.
- Chưa xác nhận deliverable đã merge vào shopcore theo roadmap.
- Code mẫu đã được compile ở lượt soạn không thay cho bài thực hành của bạn.
- Không có bài final module mới được làm/chấm trong lượt này.

Không đổi các mục này thành “đã làm” vì điểm bài viết tốt. Các tiêu chí đầy đủ trong01 được giữ nguyên, capstone không bị đánh dấu hoàn thành.

## 5. Quyết định tiến trình

**Có thể kết thúc phần học M3-1 và chuyển sang M3-2 Security Core theo hướng học hiện hành.**

Trạng thái là **“Đạt phần học, chưa xác nhận deliverable”**, không phải “hoàn thành đầy đủ mọi tiêu chí roadmap”. Không có luật mới bắt đạt100% mỗi câu để phủ nhận ngưỡng các đề đã công bố.

Vẫn cần giữ các nguyên tắc dữ liệu, bảo mật, tính đúng đắn và độ tin cậy; không cần học thuộc toàn bộ RFC/signature hoặc code lại mọi endpoint để chứng minh đã đọc bài.

## 6. Ôn gọn trước khi tiếp

- 10phút: kể lại PUT gán, DELETE safe/idempotent và giới hạn cập nhật xen giữa.
- 10phút: query param/JSON,405 và HTTP status/body.status.
- 5phút: vẽ mãABC ở response và log cùng request, không để lộ secret.

Lượt này chỉ chấm và tổng kết, chưa tạo bài học/module mới. Bài tiếp theo vẫn theo phương pháp hiểu rộng và tư duy, nghiêm ở phần cốt lõi.
