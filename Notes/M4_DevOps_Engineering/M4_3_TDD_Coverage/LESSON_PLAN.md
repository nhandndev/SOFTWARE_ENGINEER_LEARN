# Kế hoạch M4-3

| Roadmap | Lesson | Câu kiểm |
|---|---|---|
| Red → Green → Refactor | 01 | 1–8 |
| Chọn unit/slice/integration đúng tầng | 02 | 1–8 |
| JaCoCo plugin + threshold | 03 | 1–8 |
| CI fail coverage <70% | 03/04 | L03 câu4–8; L04 câu1–5 |
| Không chase coverage vô nghĩa | 01/03/04 | L01 câu4,7; L03 câu1–3; L04 câu6–8 |
| Một feature TDD có bằng chứng | 01/04 | L01 câu8; L04 câu8 |

## Bốn task soạn và kiểm riêng

1. Lesson01: rule đầy đủ → test thất bại đúng lý do → code tối thiểu → refactor giữ behavior. Kiểm boundary, exception và BigDecimal.
2. Lesson02: xác định thật/mock từng tầng → case Service/MVC/Repository → giới hạn transaction/Security/network. Không lấy mock repository làm bằng chứng SQL đúng.
3. Lesson03: chọn metric/scope rõ → Maven agent/report/check → missing data và argLine. Chạy thử pass và dưới ngưỡng, không chỉ parse XML.
4. Lesson04: nối verify/publish gate → reports dù fail → zero test/no coverage data → assertions/determinism và bằng chứng deliverable. Lint workflow và kiểm đề/rubric riêng.

Mỗi task xong mới ghép task sau. Kết thúc đối chiếu đủ32 câu: có bài dạy, đủ dữ kiện, đáp án đúng và mọi hàng rubric đủ5đ. Bảng quality review ghi kết quả thực tế và phần chưa chạy, không báo “không thể còn lỗi”.

Kiến thức nối: M0-5 Maven; M1 DTO/exception/JPA; M4-2 events/runner/cache/artifact/needs. M1-6 hoãn nên bài không mặc định Mockito/Failsafe đã biết. Kubernetes, CD AWS và PIT ngoài scope.
