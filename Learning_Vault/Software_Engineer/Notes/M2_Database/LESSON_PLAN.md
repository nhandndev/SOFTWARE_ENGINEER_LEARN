# Kế hoạch M2-1: SQL & Index (BE làm nền cho AI Engineer)

Vẫn gồm **5 lesson**. Lesson 01-04 đã đạt; không phải làm lại. Mục tiêu là đọc dữ liệu đúng, ghép bảng không nhân sai dòng, tạo báo cáo đáng tin và biết kiểm tra hiệu năng. Đây cũng là nền để sau này trích xuất dữ liệu cho phân tích/AI; chưa cần học ML trong module SQL.

| Lesson | Câu hỏi cần trả lời | Sản phẩm tự học |
|---|---|---|
| 01. SQL cơ bản | Bảng, dòng, cột là gì? SELECT/WHERE/ORDER BY/LIMIT/NULL làm gì? | Đọc và lọc một bảng Product, dự đoán từng dòng output |
| 02. JOIN | Mỗi dòng kết quả JOIN đến từ đâu? Khi nào LEFT JOIN bị lọc mất dòng? | Tự dự đoán output 2-3 query trên bộ data nhỏ |
| 03. Mẫu truy vấn dữ liệu | `DISTINCT`, `IN`, `BETWEEN`, `CASE` dùng lúc nào? `EXISTS` khác JOIN ra sao? CTE giúp gì? | Lọc và gắn nhãn Product; tìm Category chưa có Product bằng `NOT EXISTS`; viết lại bằng CTE |
| 04. Tổng hợp dữ liệu | `WHERE` khác `HAVING`? `COUNT(*)` khác `COUNT(col)`? Window giữ dòng thế nào? | Đếm Product theo Category, tính tổng giá trị có ý nghĩa rõ ràng, xếp hạng; tự chỉ ra rủi ro JOIN nhân dòng |
| 05. Index và query plan | Index giúp query nào; đọc scan, row estimate và actual time ra sao? | `EXPLAIN ANALYZE` trước/sau index với data đủ lớn, giải thích kết quả thay vì đoán |

Học theo luồng: xem query, tự dự đoán dòng trả về, chạy/đối chiếu, giải thích vì sao. Với truy vấn phân tích, luôn hỏi **một dòng output đại diện cho gì**, dữ liệu thiếu/NULL có làm sai kết luận không. Viết code vào `shopcore` khi đến phần deliverable; dữ liệu trong lesson chỉ để suy luận. Nếu chưa có Order/OrderItem trong `shopcore`, dùng Product/Category; không cần tạo feature mới chỉ để học SQL.

`INSERT`/`UPDATE`/`DELETE`, transaction, constraint, kiểu dữ liệu và truy vấn có tham số sẽ học trong **M2-2 PostgreSQL thực chiến**, khi có database để thao tác và kiểm tra. Chưa cần nhồi vào Lesson 01 hoặc thi lại Lesson 02. Xem [bản đồ phạm vi SQL](README_PHAM_VI_SQL_BE_TO_AI.md).

Tài liệu: [PostgreSQL SQL Tutorial](https://www.postgresql.org/docs/current/tutorial-sql.html), [Table Expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html), [Aggregate Functions](https://www.postgresql.org/docs/current/tutorial-agg.html), [Indexes](https://www.postgresql.org/docs/current/indexes.html), [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).
