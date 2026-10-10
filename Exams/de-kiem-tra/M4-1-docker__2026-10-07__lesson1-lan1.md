# M4-1 Docker · Lesson 01 · Lần 1

PHONG_VAN theo lesson 8 × 5=40đ, đạt 34/40, 25–35 phút. Trả lời ý nghĩa, được tra lệnh. Không cần có Docker running để làm đề. Bối cảnh shopcore Java 21.

## Câu 1 - Image và container

Một image shopcore:local có chạy hai container env khác nhau được không? Phân biệt image/process/container và file sửa trong container có tự đổi image không.

**Trả lời:**

## Câu 2 - Container trên Mac

Linux container có kernel riêng như VM không? Docker Desktop trên Mac chạy Linux containers theo mô hình nào? Docker có tự sửa Java bug/thiếu driver không?

**Trả lời:**

## Câu 3 - Build success nhưng exited

Build image thành công, run -d rồi ps không thấy container. Kiểm gì và vì sao -d/build success không chứng minh app ready?

**Trả lời:**

## Câu 4 - Stop, start, remove

Phân biệt stop/start/rm container với xóa image. Nếu rebuild tag cùng tên rồi start container cũ thì có chắc chạy code mới không? Đừng đề xuất prune toàn máy.

**Trả lời:**

## Câu 5 - Port mapping

`-p 127.0.0.1:8081:8080`, app nghe 8080. Browser gọi URL gì? `EXPOSE 8080` có tự publish không? Nếu host 8081 bận thì sửa phía nào?

**Trả lời:**

## Câu 6 - localhost

App và DB là hai container. JDBC localhost:5432 đúng không? localhost ở browser/app/db khác nhau thế nào, và app nên dùng hostname nào trong Compose?

**Trả lời:**

## Câu 7 - Dữ liệu biến mất

Ghi DB vào writable layer rồi xóa/recreate container. Dữ liệu còn không? Named volume giúp gì, có tự là backup hoặc làm image đổi không?

**Trả lời:**

## Câu 8 - Tag và kiến trúc

Tag latest có cố định nội dung không, digest khác gì? Mac ARM gặp exec format error với image amd64 thì nên kiểm gì trước khi tăng RAM?

**Trả lời:**
