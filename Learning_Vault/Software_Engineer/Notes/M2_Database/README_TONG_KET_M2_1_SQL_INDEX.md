# Tổng kết M2-1: SQL và Index

> Cập nhật 2026-10-05. Tổng kết theo **bài làm đã được chấm**, không suy đoán năng lực chỉ từ việc đã đọc tài liệu.

## 1. Bạn đã học đến đâu?

Bạn đã học và làm bài kiểm tra của cả 5 lesson. **Cả 5 đều đạt ngưỡng 85**; trung bình các điểm lesson là **89,2/100**. Đây là kết quả học theo từng chủ đề, **không phải điểm thi tổng kết module**.

| Lesson | Nội dung | Điểm mới nhất | Bằng chứng |
|---|---|---:|---|
| [01 - SQL cơ bản](LESSON_01_SQL_CO_BAN_DOC_MOT_BANG.md) | `SELECT`, `WHERE`, `NULL`, `ORDER BY`, `LIMIT/OFFSET`, PK/FK | 95/100 | [Nhận xét](../../Exams/nhan-xet/M2-1-sql-index__2026-09-28__lesson1-lan1__NHANXET.md) |
| [02 - JOIN](LESSON_02_JOIN_TU_BANG_DEN_KET_QUA.md) | `INNER/LEFT JOIN`, `ON` so với `WHERE`, ghép ba bảng, đếm dòng sau JOIN | 90/100 | [Nhận xét](../../Exams/nhan-xet/M2-1-sql-index__2026-09-28__lesson2-lan1__NHANXET.md) |
| [03 - Mẫu truy vấn](LESSON_03_MAU_TRUY_VAN_SUBQUERY_CTE.md) | `DISTINCT`, `IN`, `BETWEEN`, `CASE`, subquery, `EXISTS`, CTE | 85/100 | [Nhận xét](../../Exams/nhan-xet/M2-1-sql-index__2026-10-01__lesson3-lan1__NHANXET.md) |
| [04 - Tổng hợp](LESSON_04_AGGREGATE_GROUP_BY_WINDOW.md) | Aggregate, `GROUP BY`, `HAVING`, `COALESCE`, window, JOIN nhân dòng | 88,5/100 | [Nhận xét](../../Exams/nhan-xet/M2-1-sql-index__2026-10-03__lesson4-lan1__NHANXET.md) |
| [05 - Index và plan](LESSON_05_INDEX_EXPLAIN_ANALYZE.md) | B-tree, composite/covering, selectivity, `EXPLAIN ANALYZE` | 87,5/100 | [Nhận xét](../../Exams/nhan-xet/M2-1-sql-index__2026-10-04__lesson5-lan1__NHANXET.md) |

## 2. Những điều bạn đã thể hiện tốt

- **Đọc một query từ dữ liệu đầu vào đến kết quả:** lọc điều kiện, sắp xếp, phân trang và nhận diện một dòng kết quả đại diện cho gì. Lesson 01 cho thấy bạn đã tự sửa tốt phần `OFFSET` và output cụ thể.
- **Nắm bản chất JOIN:** bạn tìm đúng các cặp dòng của `INNER JOIN`, biết `LEFT JOIN` giữ phía trái, phân biệt điều kiện trong `ON` với lọc ở `WHERE`, và hiểu JOIN có thể nhân dòng. Ở Lesson 02, câu đếm dòng sau JOIN đạt trọn điểm.
- **Biết dùng công cụ SQL theo mục đích:** `DISTINCT`, `IN`, `BETWEEN`, `CASE`, CTE; query `EXISTS`/`NOT EXISTS` bạn viết đúng cấu trúc. Bạn hiểu CTE là một bước được đặt tên, không mặc định là bảng tạm vật lý.
- **Phân biệt lọc trước và sau nhóm:** `WHERE`/`HAVING` đạt trọn điểm; bạn cũng làm tốt `SUM` với `COALESCE`, JOIN nhân dòng trong báo cáo và window function giữ từng dòng.
- **Có tư duy chọn index theo workload:** biết tập kết quả nhỏ có thể hưởng lợi, tập lớn/bảng nhỏ có thể dùng `Seq Scan`; chọn đúng thứ tự cột của composite index và không nói planner chắc chắn dùng nó.
- **Đọc được plan cơ bản:** phân biệt số dòng ước lượng với thực tế, `cost` không phải mili-giây, đọc `Execution Time` đúng và giới hạn kết luận trong lần đo. Bạn cũng hiểu `EXPLAIN ANALYZE` thực thi query và có thể làm thay đổi dữ liệu nếu áp dụng lên `UPDATE`.

## 3. Những chỗ còn hổng, theo mức ưu tiên

### A. `NULL` trong phép tổng hợp (ưu tiên cao)

Ở Lesson 04, bạn bỏ sót Product có `category_id=NULL` khi tính `SUM`/`MIN` và bỏ nhóm `NULL` trong `GROUP BY`. Cần tách hai câu hỏi:

1. **Dòng Product có còn trong đầu vào không?** Có, trừ khi `WHERE` loại nó.
2. **Hàm đang đọc cột nào?** `COUNT(*)` đếm dòng; `COUNT(category_id)` bỏ qua giá trị `NULL` của riêng cột đó. `GROUP BY category_id` vẫn tạo một nhóm cho các dòng có `category_id=NULL`.

Với `LEFT JOIN`, một category không ghép được Product vẫn sinh dòng có `p.id=NULL`; vì vậy `COUNT(*)` có thể bằng 1 nhưng `COUNT(p.id)` bằng **0**, không phải `NULL`. Đọc lại [Lesson 04 mục 2, 3 và 5](LESSON_04_AGGREGATE_GROUP_BY_WINDOW.md).

### B. Đọc kết quả query theo đúng dòng ngoài (ưu tiên cao)

Ở Lesson 03, `EXISTS`/`NOT EXISTS` đúng ý tưởng nhưng bạn thiếu các dòng output và đôi lúc mô tả như đang kiểm tra từng Product, trong khi query ngoài đang duyệt từng **Category**. Với mỗi dòng `c` của query ngoài, hãy tự hỏi query con trả **0 hay ít nhất 1 dòng**; sau đó mới quyết định giữ `c`. Đọc lại [Lesson 03 mục 7](LESSON_03_MAU_TRUY_VAN_SUBQUERY_CTE.md).

Ở Lesson 02, query JOIN ba bảng chọn đúng cột nhưng thiếu giải thích mỗi dòng ứng với một `order_item`, vì sao Product lặp và `AS item_id` chỉ đổi tên cột output. Đọc lại [Lesson 02 mục 7](LESSON_02_JOIN_TU_BANG_DEN_KET_QUA.md).

### C. Cú pháp có thể làm query không chạy (ưu tiên vừa)

Bạn từng dùng `p.category_id` mà `FROM products` chưa khai báo alias `p`. Cần nhất quán `FROM products p` nếu muốn dùng `p`. Ở Lesson 01 cũng từng chọn cột `category` không có trong bảng. **Lập luận đúng vẫn cần câu SQL chạy được**. Khi viết query, kiểm tra nhanh: bảng nào? alias nào? cột đó có thật không?

### D. Index, MVCC và cách đo (ưu tiên vừa)

- `INCLUDE (name)` chỉ làm index chứa đủ dữ liệu cột; `Index Only Scan` vẫn có thể phải xem heap để kiểm tra row version có *visible* với transaction đang đọc không. Không phải PostgreSQL luôn phải xem đồng thời giá trị cũ và mới. [Bài học lại mục 1](README_HOC_LAI_LESSON_05_INDEX_EXPLAIN.md).
- Index tăng chi phí lưu trữ/cache và có thể tăng chi phí ghi; đừng chỉ nói "tìm nhanh" hoặc "bảng lớn". [Bài học lại mục 2](README_HOC_LAI_LESSON_05_INDEX_EXPLAIN.md).
- `EXPLAIN (ANALYZE, BUFFERS)` không chỉ cho thời gian: `BUFFERS` còn cho biết block `hit`/`read` và thông tin I/O. [Bài học lại mục 3](README_HOC_LAI_LESSON_05_INDEX_EXPLAIN.md).
- Ở câu thiết kế phép thử, bạn có bước đo trước/sau và chạy lặp lại, nhưng thiếu **dữ liệu đại diện**, giữ nguyên SQL/tham số/dữ liệu, ghi scan type + estimated/actual rows, và cân lợi ích với chi phí ghi/dung lượng. Đây là chỗ cần luyện nhất nếu sau này tối ưu query thật. [Bài học lại mục 5](README_HOC_LAI_LESSON_05_INDEX_EXPLAIN.md).

## 4. Phần bạn chủ động bỏ qua

Theo quyết định của bạn, **không làm bài kiểm tra tổng kết M2-1 và không nộp deliverable SQL/index + plan trước-sau trong `shopcore` ở giai đoạn này**. Đây là **phạm vi học rút gọn**, không phải lỗi bài làm. Vì vậy:

- Có đủ bằng chứng để nói **5 lesson lý thuyết đã học và đều đạt**.
- Chưa có bằng chứng rằng bạn đã **chạy query, tạo index và đo plan trên dữ liệu thật của project**.
- Không có điểm bài thi tổng kết module. **M2-1 được đánh dấu 🟢 theo phạm vi học rút gọn bạn đã chọn**, dựa trên 5 bài lesson đều đạt; điều này không đồng nghĩa đã hoàn thành phần thực hành trong `shopcore`. Checklist chưa được tick thay cho deliverable.

Theo phạm vi bạn chọn, phần học theo lesson dừng ở đây. Khi cần dùng SQL/index thực tế cho backend hoặc AI data pipeline, nên quay lại làm một phép đo nhỏ trong project hiện có; không cần dựng project mới.

## 5. Cách ôn ít mà trúng

| Thời lượng | Làm gì | Tự kiểm tra đã hiểu khi nào? |
|---|---|---|
| 10 phút | Viết lại nhóm `NULL` và so sánh `COUNT(*)`, `COUNT(p.id)`, `COUNT(category_id)` | Nói đúng dòng nào còn, giá trị nào bị bỏ qua; không gọi kết quả COUNT là NULL |
| 10 phút | Đọc một query `EXISTS` với `categories c` ở ngoài | Liệt kê từng Category được giữ, không chỉ nói chung chung "có Product" |
| 15 phút | Viết 5 bước kiểm chứng index cho query Product đang học | Có dữ liệu đại diện, plan trước/sau, cùng điều kiện, chạy lặp, quyết định giữ/bỏ dựa trên lợi ích và chi phí |

**Kết luận:** Nền tảng đọc và lập luận SQL của bạn đã khá vững. Điểm cần giữ trong đầu khi đi tiếp là **`NULL` không làm biến mất dòng**, **`EXISTS` phải đọc theo dòng ngoài**, và **index chỉ đáng giữ khi phép đo trên workload thực tế chứng minh được lợi ích**.
