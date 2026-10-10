# Kế hoạch M4-2

| Checklist roadmap | Lesson | Câu kiểm |
|---|---|---|
| Workflow YAML: on, jobs, steps | 01 | 1–8 |
| Cache Maven dependencies | 02 | 4–5 |
| Chạy test trên PR | 01/02 | Lesson 1 câu 2–3; lesson 2 câu 1–3, 6–8 |
| Build và push Docker image | 03 | 1–8 |
| Status badge trong README | 04 | 5–6 |
| Đọc kết quả, kiểm gate và an toàn quyền | 04 | 1–4, 7–8 |

Bốn buổi × 3h. Bài 1 dạy workflow nhỏ trước, bài 2 bổ sung cache/report, bài 3 ghép publish thành pipeline có điều kiện, bài 4 đọc lỗi và kiểm bằng chứng. Mẫu bài 3 là bản đầy đủ thay các mẫu trước, không phải tạo ba workflow trùng nhau.

Kiến thức nối: M0-5 Git/Maven; M1 config/test context; M4-1 Dockerfile/context/image. CI không cần học lại toàn JUnit, Redis hoặc AWS. Test DB về sau dùng dữ liệu cô lập, không credentials production.

Deliverable theo roadmap là pipeline build → test → push image và badge. Đây là tài liệu chuẩn bị, chưa có remote run/merge/publish, không đánh dấu deliverable đã xong và không tự mở module mới.
