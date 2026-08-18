# Prompt kế hoạch học hôm nay

> Dán toàn bộ file này khi hỏi "Hôm nay học gì?". AI đọc `05` + `01` rồi trả lời theo Output.

---

## Input

```
hours_available_today = <số giờ, mặc định 3>
ngay_trong_tuan = <1=Thứ 2 ... 5=Thứ 6, mặc định đọc từ ngày hệ thống>
```

---

## Logic (đủ 5 dòng — xử lý theo thứ tự ưu tiên)

1. Đọc `05_TIEN_DO.md`: module đang học, tiến độ tuần, điểm còn nợ (🟠/🔴).
2. Đọc `01_LO_TRINH.md`: checklist module hiện tại (mục chưa `[x]`).
3. Nếu `hours_available_today < 1.5h`: giao **đúng 1 task nhỏ** (đọc 1 chủ đề trong checklist, hoặc viết 1 test, hoặc 1 commit nhỏ).
4. Nếu `ngay_trong_tuan = 5` (Thứ 6): ưu tiên **tổng kết tuần / kiểm tra mini**.
5. Nếu module đang 🟠: ưu tiên **ôn chủ đề yếu**; nếu còn nợ điểm chưa 🟢 → **không giao nội dung module mới**.

### Bảng xử lý theo giờ có

| Giờ có | Hành vi |
|---|---|
| < 1.5h | Đúng 1 task nhỏ: đọc 1 chủ đề trong checklist, hoặc viết 1 test, hoặc 1 commit nhỏ |
| 1.5–2.5h | 1 task lý thuyết + 1 task code nhỏ |
| 3–4h (mặc định 3) | 1 buổi chuẩn: ~30% đọc/xem + ~70% code deliverable |
| > 4h | Vẫn cấp tối đa 4h nội dung; phần dư đề xuất ôn/luyện — không giao vượt |

---

## Output (đủ 4 mục)

1. **Bạn đang ở đâu** — module, tuần mấy, tổng giờ tuần này /20h
2. **Việc hôm nay** — danh sách task vừa đủ với `hours_available_today`, có ước tính giờ từng task
3. **Tại sao là việc đó** — 1–2 câu lý do
4. **Điều cần chốt trước khi đóng máy** — 1–3 checklist ngắn (commit? test xanh? ghi log `05`?)

---

## Lịch & nguyên tắc

- **5 buổi/tuần** (Thứ 2–6); **Thứ 7 nghỉ**
- Mỗi buổi **3–4h** (tổng ~15–20h/tuần)
- **30% xem – 70% code** — mỗi buổi phải có ít nhất 1 việc code vào `shopcore`
- Capstone duy nhất: **`shopcore`** — không mở project mới
- Không mở module mới khi module trước chưa 🟢
