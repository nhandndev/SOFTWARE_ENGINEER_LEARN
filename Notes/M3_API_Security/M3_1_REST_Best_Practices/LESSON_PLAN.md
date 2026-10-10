# M3-1 — Kế hoạch và độ phủ

Nguồn phạm vi: Module3-1 trong `01_LO_TRINH.md`; học viên đã đạt M1-2/M1-4. Không dạy lại3-layer như kiến thức mới. Chưa đổi trạng thái học M3-1.

| Checklist roadmap | Bài | Bằng chứng trong đề |
|---|---|---|
| URL versioning /api/v1 | L01 mục2–4 | L01 câu1–3 |
| Pagination/filter/sort nhất quán | L02 mục1–7 | L02 câu1–8 |
| Idempotency PUT/DELETE | L01 mục5–8 | L01 câu4–8 |
| Error format ProblemDetail | L03 mục1–6 | L03 câu1–6,8 |
| HATEOAS nhận diện | L03 mục7 | L03 câu7 |

## Ba bài, bốn buổi theo12h roadmap

1. Resource/contract/versioning và retry: đọc flow, phân biệt breaking change, giải tình huống PUT/DELETE.
2. List contract: dữ kiện đủ để tự tính page, sort tie-break, filter AND, validation và DTO metadata.
3. Lỗi: ProblemDetail nối với common đã viết; MVC vs business vs filter/startup; HATEOAS nhận diện.
4. Tự sửa đáp án thiếu, đối chiếu ba contract. Có thể vẽ hoặc viết vài dòng code; không bắt dựng project chỉ để làm đề.

Đề lesson có8 câu ×5đ. Có câu đọc HTTP, tính dữ liệu, chữa code ngắn và tình huống. Chấp nhận giải thích tương đương; không yêu cầu thuộc framework API. Không có bài nộp thực hành nào được tự đánh dấu đã làm.

## Ranh giới với các module khác

- M1-2: biết dựng CRUD; M3-1: các CRUD/list/error cùng tuân một hợp đồng.
- M1-4: biết xử lý exception; M3-1: response lỗi chuẩn hóa across API, không đổi ý tưởng business ErrorCode của bạn.
- M2-4: sửa fetch/pool; M3-1: paging đúng nghĩa với client, không lặp benchmark.
- M3-2 trở đi: security/filter response; ở đây chỉ nói ranh giới, không cấu hình SecurityFilterChain.
- M3-5: OpenAPI và client sinh tự động; ở đây mô tả contract thủ công, chưa đòi annotation OpenAPI.

Tài liệu chính thức và từ khóa video ở từng bài. Video là gợi ý tìm, không phải video đã xem/được kiểm chứng. Quy tắc thiết kế riêng được ghi rõ, không gọi mọi lựa chọn của shopcore là chuẩn bắt buộc của HTTP.
