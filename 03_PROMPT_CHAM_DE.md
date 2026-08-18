# Prompt chấm đề & giảng lại

> Dán toàn bộ file này cho AI khi đã làm xong đề. Điền đường dẫn file đề đã làm.

---

## Input

```
file = <đường dẫn file đề đã làm, ví dụ: de-kiem-tra/M1-3-jpa__2026-08-11__lan1.md>
```

(Tuỳ chọn) kèm file đáp án nếu có: `…__DAPAN.md` — AI đối chiếu nhưng vẫn chấm theo rubric, không chỉ so khớp máy móc.

---

## Output bắt buộc (theo đúng thứ tự — không bỏ mục, không đảo)

### 1. Điểm tổng + điểm nhóm kiến thức

- Điểm tổng thang 100 (đã normalize theo công thức trong `02_PROMPT_TAO_DE.md`)
- Điểm từng nhóm kiến thức kèm 🟢 / 🟡 / 🔴
  - Gợi ý ngưỡng nhóm: ≥85% nhóm → 🟢 · 55–84% → 🟡 · <55% → 🔴

### 2. Bảng chi tiết từng câu

| Câu số | Đúng/Sai/Thiếu | Điểm đạt | Nhận xét ngắn |
|---|---|---|---|

### 3. Giải thích câu sai

Với mỗi câu sai/thiếu:

- Tại sao sai
- Cách nhớ đúng
- Đọc lại ở đâu (trỏ checklist / tài liệu trong `01_LO_TRINH.md` của module đó)

### 4. Phác đồ học lại cho câu yếu / KB

Format mỗi dòng: `topic → nguồn → số phút → bài tập tự làm`

### 5. Quyết định theo bảng ngưỡng

| Điểm (thang 100) | Trạng thái | Hành động |
|---|---|---|
| ≥ 85 | 🟢 Đạt | Sang module kế tiếp |
| 55–84 | 🟠 Cần ôn | Ôn chủ đề yếu → đề `NHANH` (70–84) hoặc `THI_LAI` (55–69) |
| < 55 | 🔴 Học lại | Học lại cả module, đổi cách (bớt video, tăng code) |

Kết luận rõ: **đi tiếp 🟢 / ôn thêm 🟠 / học lại 🔴**.

### 6. Kế hoạch 3–5 ngày cụ thể nếu không đạt 🟢

Task theo ngày, ước tính giờ, bám chủ đề yếu — không giao module mới.

### 7. Dòng cập nhật `05_TIEN_DO.md`

Chỉ cập nhật **đúng 4 thứ**:

1. **Trạng thái module** (🔵/🟡/🟢/🟠/🔴 theo ngưỡng)
2. **Điểm gần nhất**
3. **Ngày kiểm tra**
4. **Thêm 1 dòng log** trong Nhật ký học

Với `01_LO_TRINH.md`: **chỉ tick `[x]` checklist + đổi emoji trạng thái module** — **không rewrite** nội dung module.

---

## Ràng buộc cứng khi chấm

- Áp công thức: `Điểm = (thô / thô tối đa của đề thực ra) × 100`
- Chấm nghiêm — không nâng điểm vì "cố gắng"
- Không mở module mới khi chưa 🟢
- Không tự tick `[x]` nếu điểm < 85
- Không đổi tên project `shopcore`
- Không tạo project mới
