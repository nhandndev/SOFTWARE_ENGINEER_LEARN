# M1-2 Labs - Spring MVC & REST API

> Mỗi folder là một bài thực hành cho một feature nhỏ. Trong mỗi folder, file `REQUEST.md` chứa yêu cầu cần code. Code được tích lũy trong **một project duy nhất là `shopcore`**; không tạo project mới cho từng lab.

## Cách học

1. Chỉ mở một lab tại một thời điểm.
2. Mở `REQUEST.md` để đọc request và tiêu chí đầu ra.
3. Mở các file `.java` nằm ngay trong folder lab; file đúng tên đã được tạo sẵn.
4. Tự viết code vào các file đó, rồi đưa/áp dụng ý tưởng vào project thật là `shopcore`.
5. Chạy request bằng curl/Postman.
6. Chỉ sang lab sau khi checklist lab hiện tại hoàn thành.

Ví dụ:

```text
Lab_04_Three_Layer_Get_Product/
├── REQUEST.md
├── Product.java
├── ProductController.java
├── ProductService.java
├── ProductRepository.java
├── InMemoryProductRepository.java
└── ProductResponse.java
```

Các file Java chỉ là khung tên file để bạn viết. Folder lab không cần đúng package chuẩn; nó chỉ giúp bạn biết bài này cần đụng những class nào.

Không cần đọc trước toàn bộ lý thuyết M1-2. Khi bí ở đâu, quay lại đúng mục tương ứng trong [bài học chính](../02_Spring_MVC_3_Layer_REST_API.md).

## Thứ tự lab

| Lab | Feature | Kết quả |
|---|---|---|
| [01](Lab_01_Tao_Va_Chay_Shopcore/REQUEST.md) | Kiểm tra và chạy project | Hiểu entry point, Spring Web và Tomcat |
| [02](Lab_02_Ping_Controller/REQUEST.md) | Controller đầu tiên | GET ping trả JSON |
| [03](Lab_03_Path_Query_Params/REQUEST.md) | Path/query parameter | Spring bind input đúng |
| [04](Lab_04_Three_Layer_Get_Product/REQUEST.md) | 3-layer + in-memory | GET Product đi đủ ba lớp |
| [05](Lab_05_Post_DTO_JSON/REQUEST.md) | POST + DTO + JSON | Tạo Product, trả 201 |
| [06](Lab_06_Status_Code_Va_Loi/REQUEST.md) | Status và exception | 400/404/409 đúng |
| [07](Lab_07_Update_Delete/REQUEST.md) | PUT + DELETE | Update/xóa đúng contract |
| [08](Lab_08_Pagination/REQUEST.md) | Pagination | Page metadata đúng |
| [09](Lab_09_Final_Product_CRUD_Trace/REQUEST.md) | Tổng hợp | CRUD + trace runtime |

## Nguyên tắc

- Không copy full solution từ mạng.
- Chỉ dùng file `.java` có sẵn trong lab như khung luyện tập.
- Business rule đặt ở Service.
- Controller không gọi Repository trực tiếp.
- Chưa dùng JPA/database trong chuỗi lab này.
- Không cập nhật tiến độ M1-2 cho tới khi làm bài kiểm tra đạt ít nhất 85%.
