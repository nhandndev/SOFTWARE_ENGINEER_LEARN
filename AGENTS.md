# AGENTS.md — Định tuyến intent

> AI đọc file này trước khi hành động. Khớp câu người dùng → Intent → đọc/cập nhật đúng file.

| Người dùng nói | Intent | File đọc | File cập nhật | Ghi chú |
|---|---|---|---|---|
| "Hôm nay học gì" | DAILY_PLAN | 05_TIEN_DO.md + 01_LO_TRINH.md | — | Xem `hours_available_today` |
| "Xong rồi: …" | LOG_PROGRESS | — | 05_TIEN_DO.md | Ghi log + cập nhật giờ |
| "Tạo đề", "kiểm tra module…" | CREATE_EXAM | 02_PROMPT_TAO_DE.md | — | Cần topic + chế độ |
| "Chấm bài", "tôi làm xong" | GRADE_EXAM | 03_PROMPT_CHAM_DE.md | 05_TIEN_DO.md + 01_LO_TRINH.md (chỉ tick checklist + đổi trạng thái, không rewrite nội dung) | — |
| "Tôi đang ở đâu", "tiến độ" | STATUS | 05_TIEN_DO.md + 01_LO_TRINH.md | — | — |
| (không rõ intent) | FALLBACK | — | — | Hỏi lại — không đoán |

---

## Quy tắc chung cho AI

1. **Không tự tick `[x]`** trong `01_LO_TRINH.md` — chỉ tick sau khi chấm bài và điểm ≥ 85.
2. **Không mở module mới** khi module trước chưa đạt 🟢.
3. **Không đổi tên** project capstone: luôn là **`shopcore`**.
4. **Không tạo project mới** — mọi deliverable code vào `shopcore`.
5. Ngưỡng điểm thống nhất: ≥85 🟢 · 55–84 🟠 · <55 🔴.
6. Khi `GRADE_EXAM`: chỉ cập nhật 4 field của `05` (trạng thái, điểm gần nhất, ngày kiểm tra, dòng log); với `01` chỉ tick checklist + đổi emoji.
7. Khi không khớp 5 intent trên: dùng FALLBACK — hỏi lại cho rõ.
