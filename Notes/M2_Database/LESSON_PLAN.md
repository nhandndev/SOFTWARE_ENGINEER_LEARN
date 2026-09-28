# Kế hoạch M2-1: SQL & Index

| Lesson | Câu hỏi cần trả lời | Sản phẩm tự học |
|---|---|---|
| 01. SQL cơ bản | Bảng, dòng, cột là gì? SELECT/WHERE/ORDER BY/LIMIT làm gì? | Đọc và lọc một bảng Product, dự đoán từng dòng output |
| 02. JOIN | Mỗi dòng kết quả JOIN đến từ đâu? Tại sao LEFT JOIN mất dòng? | Tự dự đoán output 2-3 query trên bộ data nhỏ |
| 03. Subquery/CTE | Khi nào cần kiểm tra có tồn tại thay vì JOIN? `WITH` giúp gì? | Query sản phẩm chưa từng được đặt; báo cáo qua CTE |
| 04. Aggregate/window | WHERE khác HAVING? Window giữ dòng thế nào? | Báo cáo doanh số theo category và xếp hạng |
| 05. Index/plan | Index giúp query nào; đọc được scan, cost, actual time? | `EXPLAIN ANALYZE` trước/sau index với data đủ lớn |

Học theo luồng: xem query, tự dự đoán dòng trả về, chạy/đối chiếu, giải thích vì sao. Viết code vào `shopcore` khi đến phần deliverable; dữ liệu trong lesson chỉ để suy luận.

Tài liệu: [PostgreSQL SQL Tutorial](https://www.postgresql.org/docs/current/tutorial-sql.html), [Table Expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html), [Aggregate Functions](https://www.postgresql.org/docs/current/tutorial-agg.html), [Indexes](https://www.postgresql.org/docs/current/indexes.html), [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).
