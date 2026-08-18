# Roadmap Software Engineer — Java Ecosystem

Bộ tài liệu tự học theo module, có kiểm tra từng chặng, và prompt để AI hỗ trợ học hằng ngày.  
Đích: **Software Engineer (Backend) — Java**, capstone duy nhất **`shopcore`**.

---

## Sơ đồ 8 file

```
01_LO_TRINH.md          ← nguồn sự thật: 41 module, checklist, tài liệu, deliverable
02_PROMPT_TAO_DE.md     ← prompt sinh đề (DAY_DU / NHANH / THI_LAI / PHONG_VAN)
03_PROMPT_CHAM_DE.md    ← prompt chấm + giảng lại + cập nhật tiến độ
04_MAU_DE_KIEM_TRA.md   ← mẫu đề + đáp án (tham chiếu format/độ khó)
05_TIEN_DO.md           ← state machine + nhật ký (cập nhật thường xuyên)
06_PROMPT_HOM_NAY.md    ← prompt "Hôm nay học gì?"
AGENTS.md               ← bảng định tuyến intent cho AI
README.md               ← file này — hướng dẫn dùng hệ thống
de-kiem-tra/            ← chỗ chứa đề đã sinh
```

| File | Vai trò |
|---|---|
| `01` | Học gì — không sửa thiết kế khi chỉ đang học |
| `02` | Tạo đề theo topic + chế độ |
| `03` | Chấm đề, quyết định 🟢/🟠/🔴 |
| `04` | Chuẩn format trước khi tin đề AI sinh |
| `05` | Bạn đang ở đâu — cập nhật sau mỗi buổi / mỗi lần chấm |
| `06` | Kế hoạch 1 ngày vừa với giờ có |
| `AGENTS` | AI biết đọc/ghi file nào |
| `README` | Onboarding hệ thống |

---

## Quy trình 1 ngày học

1. Nói với AI: **"Hôm nay học gì"** (hoặc dán `06_PROMPT_HOM_NAY.md` + số giờ có).
2. AI đọc `05` + `01` → giao task ~30% xem / 70% code vào `shopcore`.
3. Học xong → nói **"Xong rồi: …"** → AI ghi nhật ký + giờ vào `05`.
4. Thứ 6: ưu tiên tổng kết tuần / kiểm tra mini.
5. Thứ 7: nghỉ (lịch mặc định 5 buổi/tuần).

---

## Quy trình 1 module

1. **Học** theo checklist + deliverable trong `01` (code vào `shopcore`).
2. Khi xong deliverable → **"Tạo đề"** với `02`, chế độ `DAY_DU`, topic đúng module.
3. Làm bài trong `de-kiem-tra/…md` (điền `**Trả lời:**`).
4. **"Chấm bài"** với `03` → nhận điểm thang 100 + quyết định state.
5. AI cập nhật `05` (4 field) và chỉ tick/đổi emoji trên `01` nếu ≥ 85 🟢.
6. 🟠 → ôn → `NHANH` hoặc `THI_LAI`. 🔴 → học lại module. Chỉ mở module sau khi 🟢.

---

## MVP path vs Full path

| Path | Chặng | Thời gian |
|---|---|---|
| **Full** | 0 → 1 → 2 → 3 → 4 → 5 → 6A → 6B → 7 | **~590h / ~34 tuần** |
| **MVP** (fresher sớm hơn) | 0 → 1 → 2 → 3 → 4 → 7 (bỏ 5 / 6A / 6B) | **~394h / ~23 tuần** |

MVP vẫn ~23 tuần — **không phải con đường ngắn**, chỉ bỏ phần nâng cao. JWT, Docker, test vẫn cần.

Cơ sở lịch: **15–20h/tuần**, 5 buổi × 3–4h (Thứ 7 nghỉ).

---

## Capstone: `shopcore`

- Mini e-commerce backend (Java + Spring Boot).
- **Một project duy nhất** — không đổi tên, không mở repo mới để "thử".
- Deliverable mỗi module merge vào `shopcore` theo contract trong `01` / `ROADMAP_PROMPT.md`.

---

## Ngưỡng điểm

| Điểm | State | Hành động |
|---|---|---|
| ≥ 85 | 🟢 | Module kế tiếp |
| 55–84 | 🟠 | Ôn → `NHANH` (70–84) / `THI_LAI` (55–69) |
| < 55 | 🔴 | Học lại cả module |

Không tự tick `[x]` — chỉ sau khi chấm ≥ 85.

---

## Xử lý mục `[Cần verify]`

Trong bảng tài liệu của `01`, mọi Udemy / Coursera / YouTube đều gắn `[Cần verify]`.

1. Mở link/tên khoá trên nền tảng — kiểm tra còn tồn tại và đúng tác giả.
2. Nếu sai/mất → **ưu tiên Official / Baeldung** đã liệt kê (không cần verify).
3. Không thay bằng khoá lạ chưa kiểm tra — thà thiếu Udemy còn hơn học nhầm.

---

## Bắt đầu ngay

1. Mở `05_TIEN_DO.md` — con trỏ đang ở `M0-1`.
2. Đọc module `0-1` trong `01_LO_TRINH.md`.
3. Bảo AI: **"Hôm nay học gì"** với `hours_available_today = 3`.
