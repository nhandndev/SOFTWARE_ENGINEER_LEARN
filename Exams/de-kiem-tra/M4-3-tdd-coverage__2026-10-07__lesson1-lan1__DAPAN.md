# Đáp án M4-3 · Lesson01

8×5=40đ; đạt34/40. [Quy tắc chấm](../../Notes/M4_DevOps_Engineering/M4_3_TDD_Coverage/QUY_TAC_CHAM.md). Ý tương đương được nhận, không đòi code hoàn hảo.

| Câu | Rubric /5 |
|---|---|
| 1 | Chưa chứng minh test-first (2); test sau vẫn regression/document behavior (1); quan sát test fail trước implementation (1); green/refactor chạy lại (1) |
| 2 | Assertion fail do behavior là Red phù hợp (1); import lỗi setup (1); sửa production theo rule (1); sửa import để chạy được test (1); không đổi expected trái contract (1) |
| 3 | Bốn fee đúng (2); case500000 bắt lỗi > (2); lý do equality boundary (1) |
| 4 | Test còn pass (1); assert fee30000 (1); thêm500000→0 (1); oracle từ contract (1); copy công thức có thể cùng sai (1) |
| 5 | equals xét scale (2); compareTo hoặc numerical assertion (1); giá trị0 bằng0.00 (1); contract không scale nên không kết luận business sai (1) |
| 6 | A refactor, B đổi behavior (2); A giữ tests/contract và chạy suite (1); B đổi requirement/tests liên quan (1); regression chống phá case cũ (1) |
| 7 | Catch Exception quá rộng nhận cả NPE (2); assertThrows IllegalArgumentException (1); lambda/hành động gọi fee thật (1); null và âm (1) |
| 8 | Test rồi Red có nguyên nhân (1); Green nhỏ (1); thêm dưới/biên/invalid chống hard-code (1); refactor+suite (1); lưu bằng chứng thứ tự/run, một case không đủ (1) |

## Câu 1

Chưa đủ bằng chứng TDD: thứ tự đã là code-first. Test sau vẫn bảo vệ regression và mô tả behavior. TDD cần thấy test viết trước, fail vì phần behavior chưa đúng, rồi implementation làm xanh, refactor và chạy lại. Không cần mỗi vòng phải push commit đỏ lên main.

Ôn Lesson01 mục1,7–8. Không trừ vì không nêu một công cụ lưu log cụ thể.

## Câu 2

Stub30000 trái rule500000 miễn phí, assertion fail đúng điểm cần làm: sửa implementation để trả0. Import sai chưa chạy được behavior, sửa import/setup trước. Không sửa expected30000 chỉ để test xanh vì requirement chưa đổi.

Ôn mục1,4. “Cứ đỏ là Red tốt” sai phạm vi.

## Câu 3

499999→30000;500000→0;500001→0;0→30000. Dùng > bỏ trường hợp equality, nên case500000 phát hiện trong tập này. Biên tách hai miền hành vi, không chỉ test một giá trị bất kỳ ở xa ngưỡng.

Ôn mục2,6. Bốn fee2đ: mỗi output0.5đ; xác định case và giải thích sai equality2đ.

## Câu 4

Vẫn pass vì1 không null. Assert giá trị30000 cho250000 và0 cho500000. Expected từ bảng contract/giá trị cố định, không dùng cùng công thức điều kiện production để hai chỗ có thể cùng sai mà vẫn xanh.

Ôn mục3,5. Không bắt đúng một thư viện assertion.

## Câu 5

BigDecimal.equals xét cả scale nên0 khác0.00 theo equals. Dùng compareTo kiểm bằng0 hoặc numerical assertion tương đương. Contract chỉ giá trị tiền: đây chưa là bug business; nếu API định scale/format riêng phải có contract/test riêng.

Ôn mục5. Không nhận giải pháp dùng double để né scale cho tiền.

## Câu 6

A giữ kết quả là refactor; chạy suite giữ contract. B đổi vùng miễn phí là behavior change, cần requirement rõ và cập nhật cases/expected có chủ đích, không gọi đó là refactor. Suite cũ giúp thấy tác động ngoài dự kiến.

Ôn mục7. Không cần viết code constants.

## Câu 7

Exception.class/catch Exception nhận cả NPE, không bảo vệ loại lỗi đã quy định. Dùng assertThrows(IllegalArgumentException.class, () -> policy.fee(input)) cho null và số âm. Guard mất làm NPE thì test đúng loại sẽ fail.

Ôn mục3,6,8. Chỉ nói “bắt lỗi” mà không giới hạn loại không đủ điểm trọng tâm.

## Câu 8

Chọn500000→0, viết test; chạy stub30000 thấy assertion fail; sửa nhỏ cho xanh; thêm250000/biên/invalid để loại implementation hard-code; refactor tên/constants; chạy suite và giữ output/red-green/refactor theo đúng thứ tự. Một return0 chỉ đáp ứng một case, không toàn feature.

Ôn mục1,5–8. Bước tương đương được tính; không bắt đủ mọi case test Java để đạt phần lập kế hoạch.
