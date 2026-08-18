# Tiến độ học — State machine & nhật ký

> Cập nhật sau mỗi buổi học và sau mỗi bài kiểm tra.  
> Capstone: **`shopcore`**.

---

## Con trỏ hiện tại

- Module đang học: `M0-1` · Java hiện đại: Generics, Lambda, Stream, Optional
- Buổi trong tuần: 1 / 5
- Ngày bắt đầu module: —
- Giờ học tuần này: 0h / 20h

---

## Bảng trạng thái module (tham chiếu)

| Trạng thái | Ký hiệu | Điều kiện vào | Bước tiếp theo |
|---|---|---|---|
| Chưa bắt đầu | 🔵 | Mặc định | Bắt đầu học → 🟡 |
| Đang học | 🟡 | Bắt đầu module | Hoàn thành → làm đề `DAY_DU` |
| Đạt | 🟢 | Điểm ≥ 85 | Mở module kế tiếp |
| Cần ôn | 🟠 | Điểm 55–84 | Ôn chủ đề yếu → `NHANH` (70–84) hoặc `THI_LAI` (55–69) |
| Học lại | 🔴 | Điểm < 55 | Học lại cả module, bớt video tăng code |

**Quy tắc chuyển state:** `🔵 → 🟡` · `🟡 → 🟢/🟠/🔴` · `🟠 → 🟢` (sau `NHANH`/`THI_LAI` ≥ 85) · `🔴 → 🟡`.  
**Không có đường tắt** `🔵 → 🟢`.

### Ngưỡng điểm

| Điểm (thang 100) | Trạng thái | Hành động |
|---|---|---|
| ≥ 85 | 🟢 Đạt | Sang module kế tiếp |
| 55–84 | 🟠 Cần ôn | Ôn chủ đề yếu → đề `NHANH` (70–84) hoặc `THI_LAI` (55–69) |
| < 55 | 🔴 Học lại | Học lại cả module, đổi cách (bớt video, tăng code) |

---

## Trạng thái từng module

| Module | Trạng thái | Điểm gần nhất | Ngày kiểm tra |
|---|---|---|---|
| M0-1 · Java hiện đại | 🔵 Chưa bắt đầu | — | — |
| M0-2 · OOP SOLID | 🔵 Chưa bắt đầu | — | — |
| M0-3 · DSA I | 🔵 Chưa bắt đầu | — | — |
| M0-4 · DSA II Tree/Graph | 🔵 Chưa bắt đầu | — | — |
| M0-5 · Git & Maven | 🔵 Chưa bắt đầu | — | — |
| M1-1 · IoC / DI | 🔵 Chưa bắt đầu | — | — |
| M1-2 · MVC & REST | 🔵 Chưa bắt đầu | — | — |
| M1-3 · Spring Data JPA | 🔵 Chưa bắt đầu | — | — |
| M1-4 · Validation & Error | 🔵 Chưa bắt đầu | — | — |
| M1-5 · Config & Profiles | 🔵 Chưa bắt đầu | — | — |
| M1-6 · Testing | 🔵 Chưa bắt đầu | — | — |
| M2-1 · SQL & Index | 🔵 Chưa bắt đầu | — | — |
| M2-2 · PostgreSQL | 🔵 Chưa bắt đầu | — | — |
| M2-3 · Flyway | 🔵 Chưa bắt đầu | — | — |
| M2-4 · N+1 & HikariCP | 🔵 Chưa bắt đầu | — | — |
| M3-1 · REST best practices | 🔵 Chưa bắt đầu | — | — |
| M3-2 · Security Core | 🔵 Chưa bắt đầu | — | — |
| M3-3 · JWT | 🔵 Chưa bắt đầu | — | — |
| M3-4 · OAuth2 / OIDC | 🔵 Chưa bắt đầu | — | — |
| M3-5 · OpenAPI & Client | 🔵 Chưa bắt đầu | — | — |
| M4-1 · Docker | 🔵 Chưa bắt đầu | — | — |
| M4-2 · GitHub Actions CI | 🔵 Chưa bắt đầu | — | — |
| M4-3 · TDD & Coverage | 🔵 Chưa bắt đầu | — | — |
| M4-4 · Logging & Hexagonal | 🔵 Chưa bắt đầu | — | — |
| M5-1 · Redis | 🔵 Chưa bắt đầu | — | — |
| M5-2 · Kafka | 🔵 Chưa bắt đầu | — | — |
| M5-3 · Microservices | 🔵 Chưa bắt đầu | — | — |
| M5-4 · Actuator | 🔵 Chưa bắt đầu | — | — |
| M5-5 · System Design | 🔵 Chưa bắt đầu | — | — |
| M6A-1 · Clean Code | 🔵 Chưa bắt đầu | — | — |
| M6A-2 · Patterns C&S | 🔵 Chưa bắt đầu | — | — |
| M6A-3 · Patterns Behavioral | 🔵 Chưa bắt đầu | — | — |
| M6A-4 · DDD & Hexagonal | 🔵 Chưa bắt đầu | — | — |
| M6B-1 · AWS Core | 🔵 Chưa bắt đầu | — | — |
| M6B-2 · RDS & S3 | 🔵 Chưa bắt đầu | — | — |
| M6B-3 · Deploy AWS | 🔵 Chưa bắt đầu | — | — |
| M6B-4 · AWS Ops | 🔵 Chưa bắt đầu | — | — |
| M7-1 · LeetCode | 🔵 Chưa bắt đầu | — | — |
| M7-2 · SD Interview | 🔵 Chưa bắt đầu | — | — |
| M7-3 · Behavioral STAR | 🔵 Chưa bắt đầu | — | — |
| M7-4 · Portfolio & CV | 🔵 Chưa bắt đầu | — | — |

---

## Lịch sử bài kiểm tra

| Ngày | Module | Chế độ | Điểm | Kết quả | Ghi chú |
|---|---|---|---|---|---|

---

## Nhật ký học (mới nhất lên đầu)

- (chưa có buổi học — bắt đầu từ `M0-1`)
