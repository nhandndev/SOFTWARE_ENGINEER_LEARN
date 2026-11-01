# Bài giải tự kiểm Flyway Lesson 03 bổ sung

4 ×5 =20đ; quy đổi /20 ×100, đạt từ 17/20 nếu người học yêu cầu chấm đề phụ. Không tự chuyển điểm đề chính sang đề này hoặc ngược lại. Không bắt chạy thật hay thuộc tên lệnh.

| Câu | Rubric 5đ |
|---|---|
| 1 | A sửa credential, không repair (1); kiểm URL/DB đích và nguồn credential runtime (1, mỗi ý 0,5); B kiểm file/history/schema (1); khôi phục V1 gốc (1); thêm V2, không mặc định repair để thêm cột (1) |
| 2 | Nhóm xác minh trước (1); ghi marker mốc 1 (1); không chạy V1 (1); không tự kiểm toàn schema (1); V2 chỉ thêm description không sửa thiếu name (1) |
| 3 | App cũ ghi làm title lệch/thiếu (1); app mới chỉ ghi title vi phạm name NOT NULL (1); kiểm soát tất cả writer, bằng ngừng ghi hoặc đồng bộ phù hợp (1); đồng bộ/kiểm dữ liệu và chuyển code tương thích (1); chỉ bỏ name khi hết phụ thuộc và dữ liệu đúng (1) |
| 4 | DB upgrade PostgreSQL cô lập ở V1 có dòng cũ (1); migrate/validate rồi kiểm Product 10 giữ giá, description=NULL (1); lỗi làm CI fail (0,5); CLI config riêng, không tự đọc YAML (0,5); Maven cần plugin/config phù hợp (1); clean có thể xóa object/dữ liệu nên không dùng để cứu DB cần giữ (1) |

## Câu 1

A chưa qua bước đăng nhập: sửa config đúng DB và credential đang có hiệu lực, không sửa history. B cần đối chiếu đúng DB/file đã phát hành, đưa V1 về bản gốc và thêm V2 ALTER để thay schema; không mặc định đổi checksum bằng repair. Đủ điểm khi có đủ ý độc lập, không bắt thêm câu lệnh shell.

## Câu 2

Việc kiểm schema phải được thực hiện trước bởi người/quy trình của nhóm. Baseline ghi marker, không chạy CREATE V1 hoặc kiểm mọi cột thay bạn. Nếu đặt mốc sai, V2 chỉ thêm description vẫn để name thiếu; phải điều tra sự lệch, không gọi mốc lịch sử là bằng chứng cấu trúc đã đúng.

## Câu 3

Copy một lần không xử lý những ghi sau đó của app cũ. title có thể giữ tên cũ trong khi name đã đổi; code mới không ghi name có thể INSERT lỗi vì NOT NULL. Chấp nhận dừng mọi writer liên quan có kế hoạch, đồng bộ/kiểm dữ liệu, chuyển writer/reader tương thích rồi mở lại; hoặc một chiến lược đồng bộ mọi writer đủ rõ. Không drop name khi app/job cũ còn dùng; các bước bỏ cột và code phải được phối hợp để không còn writer ghi cột đã mất.

## Câu 4

Ngoài cài mới, dựng PostgreSQL test ở V1 và seed Product 10 giá 120; migrate V2/validate rồi kiểm dòng còn giữ giá, thêm description NULL. Job lỗi phải báo fail. CLI nhận config riêng, không tự đọc Spring YAML; thư viện core không tự cài đặt/cấu hình Maven plugin. clean không phải repair/restore: nó xóa object trong schema được cấu hình, nguy hiểm cho dữ liệu cần giữ. Không bắt viết pipeline, config plugin hoặc thao tác reset.

## Đọc lại

[Bài học bổ sung](../../Notes/M2_Database/M2_3_Flyway/README_HOC_BO_SUNG_LESSON_03.md): câu 1 mục 2–3, câu 2 mục 5, câu 3 mục 7, câu 4 mục 8–9. Chấm bằng ý nghĩa theo rubric; ví dụ bổ sung không biến thành tiêu chí ẩn, không phạt thêm ngoài 5đ/câu.
