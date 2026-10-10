# Task 00 · Kiểm kê và bảo toàn dữ liệu

Đã kiểm kê riêng 10 module: 37 lesson, 37 đề và 37 file đáp án. Mỗi module có README/lesson plan; M2-2 cũ chưa có quality review riêng nhưng có đủ bốn lesson/cặp đề.

| Module | Lesson | Cặp đề/đáp án |
|---|---:|---:|
| M2-2 | 4 | 4 |
| M2-3 | 3 | 3 |
| M2-4 | 4 | 4 |
| M3-1 | 3 | 3 |
| M3-2 | 4 | 4 |
| M3-3 | 4 | 4 |
| M3-4 | 3 | 3 |
| M3-5 | 4 | 4 |
| M4-1 | 4 | 4 |
| M4-2 | 4 | 4 |

Lưu checksum của roadmap/tiến độ và tất cả đề trước sửa để kiểm regression, không ghi đè bài làm. Checker ban đầu chỉ nhận `## Câu`, bỏ sót `### Câu` trong đáp án Flyway/Performance: đây là false positive của checker, không phải lỗi tài liệu. Checker cuối đã hỗ trợ cả hai; rubric `(2 cho ba hướng hợp lý)` cũng được parse là 2 điểm thay vì báo thiếu điểm.

**P3 tồn tại:** đề M2-2 Lesson 01 đã làm có fence đóng cuối bài nhưng thiếu fence mở. Không sửa bài làm/không đổi điểm; ghi nhận việc render có thể bất thường. Đề các lesson mới vẫn phải có fence cân bằng.

Kiểm link nội bộ ban đầu không thấy đường dẫn thiếu. Điều này chỉ xác nhận cấu trúc, không chứng minh nội dung đúng; các task module tiếp theo đọc và đối chiếu từng lesson/câu riêng.

Kiểm cuối: 37 lesson/37 cặp/296 câu, 264 rubric bảng tổng 5đ mỗi câu; 32 rubric bullet PostgreSQL đã cộng và đối chiếu bằng tay. Cả 39 checksum file được bảo vệ giữ nguyên. Chi tiết lệnh và giới hạn ở Task 11.
