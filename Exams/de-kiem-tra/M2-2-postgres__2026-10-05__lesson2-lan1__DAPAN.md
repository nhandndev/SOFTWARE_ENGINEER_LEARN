# Đáp án và rubric M2-2 - Lesson 02: Ghi dữ liệu an toàn

> Không đọc trước khi làm đề. Tổng 40 điểm thô, 8 câu x 5 điểm. Chấm theo **ý nghĩa đúng**, chấp nhận diễn đạt đời thường và SQL chưa chuẩn dấu nếu tư duy chính xác. Không trừ điểm vì không nói về trigger/transaction nâng cao: đề đã giả định không có trigger và chưa học Lesson 03.

## Câu 1 (5đ)

- 1đ: `BK-03` mới, giá dương, Category 1 tồn tại nên lệnh được nhận.
- 1đ: `id` được identity/sequence sinh khi bỏ qua cột id.
- 1đ: `created_at` dùng `DEFAULT now()` khi bỏ qua cột.
- 1đ: `RETURNING` trả id/sku/created_at của **dòng vừa thêm**, không phải dòng cũ.
- 1đ: không kết luận chắc id = 13; sequence có thể có khoảng trống/đã tăng trước đó.

## Câu 2 (5đ)

- 2đ: A được nhận; bỏ cột `created_at` thì default cấp giá trị.
- 2đ: B bị `NOT NULL(created_at)` từ chối; `NULL` tường minh không kích hoạt default.
- 1đ: nói rõ A/B độc lập nên `BK-04` ở A không tạo xung đột SKU cho B.

## Câu 3 (5đ)

- 1đ: A sửa id 10, giá 130, count 1.
- 1.5đ: B sửa id 10 và 12, giá lần lượt 130 và 90, count 2.
- 1.5đ: C sửa cả 10/11/12, giá 130/310/90, count 3.
- 1đ: bỏ `WHERE` làm phạm vi sửa toàn bảng, nguy hiểm nếu chỉ định sửa một Product.

## Câu 4 (5đ)

- 1đ: id 999 không có nên count 0.
- 1đ: count 0 là kết quả hợp lệ của SQL, DB không tự ném lỗi "not found".
- 1đ: `price = price` với id 10 vẫn count 1 vì dòng được cập nhật.
- 1đ: giá thực tế không khác trước.
- 1đ: Service/ứng dụng diễn giải count 0 là không tìm thấy theo contract; Controller/handler chọn HTTP `404`.

## Câu 5 (5đ)

- 1.5đ: A xóa Product 12, count 1, `RETURNING` cho `(12, 'BK-02')`.
- 1đ: B count 0, `RETURNING` rỗng; id 999 không có, không phải lỗi FK.
- 1.5đ: C bị FK chặn vì Product 10 và 12 đang tham chiếu Category 1; không có `ON DELETE CASCADE`.
- 1đ: C là **lỗi constraint**, không phải lệnh thành công với count 0 hay dữ liệu `RETURNING`.

## Câu 6 (5đ)

- 1đ: SKU `BK-01` đã có, `ON CONFLICT (sku) DO NOTHING` nên không thêm dòng.
- 1đ: count thành công 0.
- 1đ: `RETURNING` rỗng, không tự trả id Product cũ.
- 1đ: không dùng `DO NOTHING` nếu nghiệp vụ cần báo trùng SKU rõ ràng.
- 1đ: không bỏ qua lỗi CHECK/FK không thuộc xung đột `sku` này.

## Câu 7 (5đ)

- 2đ: A cập nhật id 11 từ 300 thành 310, `RETURNING (11, 310.00)`.
- 1.5đ: B bị `CHECK (price > 0)` từ chối, không có dòng thành công giá -20.
- 1.5đ: `UPDATE 0` là lệnh hợp lệ nhưng không sửa dòng; B là lỗi constraint, khác bản chất.

## Câu 8 (5đ)

- 2đ: dùng `DELETE FROM products WHERE id = 12 RETURNING id` hoặc `DELETE ... WHERE id=12` rồi kiểm tra count; điều kiện id đúng một Product theo PK.
- 1đ: xóa thành công 1 dòng; `RETURNING` có id 12 hoặc count 1.
- 1đ: id không tồn tại -> `DELETE 0`/không có dòng `RETURNING`; Service/ứng dụng quyết định not found, Controller/handler chuyển thành HTTP `404` theo contract.
- 1đ: `SELECT` trước chỉ là ảnh chụp tại thời điểm đó; phiên khác có thể thay đổi dữ liệu giữa `SELECT` và `DELETE`, nên không bảo đảm tuyệt đối.

## Những lỗi cần sửa khi chấm

- Nói `WHERE category_id=1` chỉ sửa một Product: phải nhìn dữ liệu, ở đây có **hai** Product.
- Đồng nhất count với số giá trị **thay đổi**: `UPDATE price=price` vẫn có thể count 1.
- Nói `DELETE 0` là lỗi SQL/FK: 0 dòng và vi phạm constraint là hai kết quả khác nhau.
- Nói `RETURNING` của `DO NOTHING` cho id cũ: không có dòng nào được thêm/sửa để trả.
- Tự gán HTTP `404/409` cho DB: response là quyết định của ứng dụng, không phải PostgreSQL.
