# Đáp án M2-1 - Lesson 05

> Tổng 40 điểm thô. Điểm thang 100 = điểm thô / 40 x 100. Chấm theo ý nghĩa, không bắt người học khẳng định một plan cụ thể trên database chưa chạy. Đây là điểm lesson, chưa thay đề tổng kết M2-1.

## Câu 1 - 5đ

Đề xuất B-tree `ON products (category_id)` (1đ). 100/10.000 là tập nhỏ, dùng index có thể tránh đọc đa số bảng (1đ). 8.000/10.000 là tập lớn, truy cập index rồi lấy nhiều dòng có thể kém hơn đọc tuần tự; `Seq Scan` có thể hợp lý (2đ). Planner chọn theo chi phí ước lượng, không có bảo đảm dùng index (1đ).

## Câu 2 - 6đ

A đáng thử trước (1đ). `category_id` đầu phục vụ lọc `=` (2đ); `price DESC, id ASC` phù hợp thứ tự trả về và `LIMIT`/phân định giá bằng nhau (2đ). B bắt đầu bằng `price`, không thu hẹp Category ngay theo mẫu query này hiệu quả/rõ ràng như A; không khẳng định planner luôn dùng A (1đ). Vẫn chấp nhận lập luận đúng rằng planner đôi lúc có thể dùng index có cột sau dù thiếu điều kiện cột đầu.

## Câu 3 - 5đ

`name` là payload, không phải key lọc/sắp xếp (1đ). Query chỉ cần `category_id, price, id, name`, đều nằm trong index nên `Index Only Scan` **có thể** được chọn (2đ). Visibility map/heap fetches và quyết định của planner vẫn ảnh hưởng; index lớn hơn có chi phí, nên không hứa `Heap Fetches=0` hoặc nhanh hơn (2đ).

## Câu 4 - 6đ

Trước là `Seq Scan` + `Filter`, sau là `Index Scan` + `Index Cond` (1đ); `rows=100` là ước lượng số dòng node trả, `actual rows=100` là số dòng thực khi `loops=1` (1đ); `cost` là đơn vị ước lượng tương đối, không phải ms (1đ); `Execution Time` trước 3,900 ms, sau 0,320 ms (1đ). Có thể kết luận **trong lần đo minh họa này** index scan nhanh hơn; không suy ra index luôn nhanh hơn trên mọi data/query/lần chạy, cần so sánh có kiểm soát và lặp lại (2đ).

## Câu 5 - 4đ

Không tự động là bug/hỏng index (1đ). Với bảng rất nhỏ, đọc tuần tự rẻ; khi lấy đa số dòng, đi qua index rồi về bảng nhiều lần có thể đắt hơn đọc tuần tự (2đ). Planner có quyền chọn Seq Scan theo chi phí; xem dữ liệu/plan thay vì ép index (1đ).

## Câu 6 - 4đ

Mỗi index thêm dung lượng (1đ), làm thao tác ghi/thay đổi dòng và bảo trì tốn công hơn (1đ); index thừa có thể không được dùng/khó quản lý hoặc lợi ích nhỏ hơn chi phí (1đ). Chọn từ query thường chạy, đo plan/thời gian trước-sau với dữ liệu đại diện rồi chỉ giữ index có lợi thực (1đ).

## Câu 7 - 5đ

`EXPLAIN` chỉ hiển thị plan/ước lượng; `EXPLAIN ANALYZE` **chạy thật** để cho actual rows/time; `BUFFERS` cho thông tin buffer/I/O (2đ). `cost` là ước lượng tương đối, `actual time` và `Execution Time` là thời gian thực theo ms (2đ). `EXPLAIN ANALYZE UPDATE` thực sự sửa dữ liệu nên không thử tùy tiện trên data thật (1đ).

## Câu 8 - 5đ

Chọn query thật với dữ liệu đủ lớn/đại diện và ghi rõ số dòng lọc/trả (1đ); lưu `EXPLAIN (ANALYZE, BUFFERS)` trước (1đ); thử index A và lưu plan sau, so sánh scan type, estimated/actual rows, `Execution Time`, buffers nếu cần (1đ); giữ cùng SQL/điều kiện/dữ liệu, chạy vài lần để tránh nhiễu cache; kiểm tra thống kê nếu ước lượng lệch (1đ); cân lợi ích với dung lượng/chi phí ghi và không giữ nếu lợi ích không đáng hoặc planner không dùng (1đ).
