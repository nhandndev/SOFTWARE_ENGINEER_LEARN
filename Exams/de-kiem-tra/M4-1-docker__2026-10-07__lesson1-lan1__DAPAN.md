# Đáp án M4-1 · Lesson 01

8 × 5=40đ, đạt 34/40. Chấm ý tương đương, không trừ quên flag/import hoặc lỗi gõ.

| Câu | Rubric /5 |
|---|---|
| 1 | Image template/layers (1); container instance/process (1); nhiều instances config khác (1); writable layer riêng (1); không tự đổi image (1) |
| 2 | Chia sẻ kernel Linux môi trường engine (1); Desktop Linux VM trên Mac (2); không sửa code/dependency (2) |
| 3 | ps -a (1); logs/exit code (2); -d chỉ background (1); build không runtime/readiness proof (1) |
| 4 | stop/start giữ container (1); rm xóa container khác image (1); image riêng (1); start cũ không code mới (1); recreate đúng resource tránh prune (1) |
| 5 | localhost 8081 host URL (2); target 8080 (1); EXPOSE metadata (1); đổi host port bận (1) |
| 6 | localhost thuộc namespace hiện tại (2); JDBC đó tìm trong app nên sai (1); db:5432 shared network (1); browser localhost là host (1) |
| 7 | Writable layer mất khi remove (2); volume sống độc lập theo lifecycle (1); không tự backup (1); không sửa image (1) |
| 8 | Tag mutable (1); digest nội dung (1); kiểm platform ARM/AMD (2); emulation/support không chữa bằng RAM (1) |

## Câu 1

Image chứa layers/config để tạo container; container là instance có process/network/writable layer. Một image có nhiều container env khác. Sửa file trong writable layer không đổi image gốc; remove container có thể mất file đó.

Ôn lesson 1 mục 1, 7.

## Câu 2

Linux containers chia sẻ kernel Linux của môi trường engine, không mỗi container một guest kernel riêng. Desktop trên Mac cung cấp Linux VM, không dùng kernel macOS trực tiếp cho Linux image. Code Java lỗi/driver thiếu vẫn phải sửa app, Docker không tự thêm.

Ôn mục 1–2.

## Câu 3

ps -a tìm exited; logs và exit code xem nguyên nhân config/code/process. -d chỉ background. Build package image không bảo đảm process chạy/HTTP ready. Container chính dừng khi process chính thoát theo vòng đời thông thường.

Ôn mục 3–4. Không đủ chỉ “chạy lại -d”.

## Câu 4

stop dừng process, start chạy lại container cũ; rm xóa container đã dừng khác xóa image. Image rebuilt không đổi container cũ tự động; recreate từ image mới. Chỉ thao tác resource đã xác định, không prune toàn engine để sửa một app.

Ôn mục 4 và lesson 2 mục 7.

## Câu 5

Host gọi `http://localhost:8081`, Docker forward tới container 8080. EXPOSE không publish. Host 8081 bận thì đổi host side 8082 chẳng hạn, container/server vẫn 8080 nếu app không đổi. Bind `127.0.0.1` giới hạn truy cập local theo setup.

Ôn mục 5.

## Câu 6

localhost trong app là app container, trong DB là DB container, trên browser là host. JDBC localhost không tìm DB container khác; dùng db:5432 trên shared Compose network. Không lấy host mapping port làm service-to-service port.

Ôn mục 6.

## Câu 7

Writable layer mất khi container bị xóa; recreate từ image không có DB writes cũ. Named volume giữ data độc lập container nhưng có thể bị xóa theo quản lý volume; không là backup hoặc thay đổi image. Cần backup/restore riêng.

Ôn mục 7; bài 3 dạy down -v.

## Câu 8

Tag có thể trỏ image khác; digest nhận diện nội dung cụ thể. Kiểm platform arm64/amd64 và multi-platform/emulation. exec format error có thể do kiến trúc/executable; thêm RAM không giải quyết mismatch. Không bắt thuộc mã CPU cụ thể.

Ôn mục 8.
