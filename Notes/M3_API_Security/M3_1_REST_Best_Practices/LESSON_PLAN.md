# M3-1 — Kế hoạch và độ phủ

Nguồn phạm vi: Module3-1 trong `01_LO_TRINH.md`; học viên đã đạt M1-2/M1-4. Lesson01 đạt68,5/80, Lesson02 đạt60/60. Ngày2026-11-21 người học chọn hiểu rộng/nắm bản chất, giữ sâu phần quan trọng để làm nền AI Engineering: Lesson03 giữ nguyên bài học, đề chuyển sang8tìnhhuống/40đ, đạt34đ. Chưa ghi nhận Lesson03 đạt.

| Checklist roadmap | Bài | Bằng chứng trong đề |
|---|---|---|
| URL versioning /api/v1 | L01 mục2–4 | L01 câu1–3 |
| Pagination/filter/sort nhất quán | L02 mới mục2–12 | L02 mới câu1–12; bảng độ phủ ở đáp án |
| Idempotency PUT/DELETE | L01 mục5–8 | L01 câu4–8 |
| Error format ProblemDetail và luồng lỗi | L03 mục1–10/12 | L03 TU_DUY_RONG câu1–7; bảng độ phủ ở đáp án |
| HATEOAS nhận diện | L03 mục11 | L03 TU_DUY_RONG câu8 |

## Ba bài, bốn buổi theo12h roadmap

1. Resource/contract/versioning và retry: đọc flow, phân biệt breaking change, giải tình huống PUT/DELETE.
2. List contract: dữ kiện đủ để tự tính page, sort tie-break, filter AND, validation và DTO metadata.
3. Lỗi: ProblemDetail nối với common đã viết; MVC vs business vs filter/startup; HATEOAS nhận diện.
4. Tự sửa đáp án thiếu, đối chiếu ba contract. Có thể vẽ hoặc viết vài dòng code; không bắt dựng project chỉ để làm đề.

Mỗi đề dùng đúng số câu/điểm ghi ở đầu. Lesson02 đã chấm trên60đ; Lesson03 TU_DUY_RONG hiện8×5=40đ, đạt34đ. Đánh giá khả năng giải thích luồng/ra quyết định, không ép code lại hoặc thuộc framework API. Vẫn giữ nghiêm nguyên tắc cốt lõi; không tự đánh dấu thực hành đã làm.

## Ranh giới với các module khác

- M1-2: biết dựng CRUD; M3-1: các CRUD/list/error cùng tuân một hợp đồng.
- M1-4: biết xử lý exception; M3-1: response lỗi chuẩn hóa across API, không đổi ý tưởng business ErrorCode của bạn.
- M2-4: sửa fetch/pool; M3-1: paging đúng nghĩa với client, không lặp benchmark.
- M3-2 trở đi: security/filter response; ở đây chỉ nói ranh giới, không cấu hình SecurityFilterChain.
- M3-5: OpenAPI và client sinh tự động; ở đây mô tả contract thủ công, chưa đòi annotation OpenAPI.

Tài liệu chính thức và từ khóa video ở từng bài. Video là gợi ý tìm, không phải video đã xem/được kiểm chứng. Quy tắc thiết kế riêng được ghi rõ, không gọi mọi lựa chọn của shopcore là chuẩn bắt buộc của HTTP.
