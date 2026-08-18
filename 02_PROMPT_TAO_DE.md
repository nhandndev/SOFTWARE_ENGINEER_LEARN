# Prompt tạo đề kiểm tra module

> Dán toàn bộ file này cho AI khi cần tạo đề. Điền khối Input trước.

---

## Input (người dùng cung cấp)

```
topic = <1 trong 41 topic hợp lệ bên dưới>
che_do = DAY_DU | NHANH | THI_LAI | PHONG_VAN   (mặc định: DAY_DU)
trong_tam = <chủ đề con muốn tập trung>         (tuỳ chọn)
tao_dap_an = co | khong                         (mặc định: co)
```

---

## Output (AI phải tạo)

- File đề: `de-kiem-tra/<topic>__<YYYY-MM-DD>__lan<N>.md`
- File đáp án (nếu `tao_dap_an = co`): `de-kiem-tra/<topic>__<YYYY-MM-DD>__lan<N>__DAPAN.md`
- Cấu trúc đề: tiêu đề + hướng dẫn + danh sách câu hỏi (mỗi câu có dòng `**Trả lời:**`)

---

## Số câu và cấu trúc theo chế độ

| Chế độ | Tổng câu | Lý thuyết (3đ/câu) | Tình huống (5đ/câu) | Code mini (10đ/câu) | Tổng điểm thô |
|---|---|---|---|---|---|
| `DAY_DU` | 20 | 10 | 8 | 2 | 10×3 + 8×5 + 2×10 = **90đ** |
| `NHANH` | 10 | 6 | 3 | 1 | 6×3 + 3×5 + 1×10 = **43đ** |
| `THI_LAI` | ≤12 | ~6 | ~4 | ~2 | tối đa **58đ** — ưu tiên topic đã sai/yếu; nếu thiếu câu thì bổ sung cùng nhóm kiến thức đó |
| `PHONG_VAN` | 8 | 0 | 8 | 0 | 8×5 = **40đ** |

---

## Công thức normalize về thang 100

```
Điểm = (Điểm thô / Tổng điểm thô tối đa của đề thực ra) × 100
```

- Ví dụ `DAY_DU`: đạt 81đ thô → 81/90 × 100 = **90 điểm**
- Ví dụ `THI_LAI`: chỉ ra 8 câu (max 46đ thô) → normalize trên **46đ**, không trên 58đ

---

## Ngưỡng điểm (thống nhất toàn hệ thống)

| Điểm (thang 100) | Trạng thái | Hành động |
|---|---|---|
| ≥ 85 | 🟢 Đạt | Sang module kế tiếp |
| 55–84 | 🟠 Cần ôn | Ôn chủ đề yếu → đề `NHANH` (70–84) hoặc `THI_LAI` (55–69) |
| < 55 | 🔴 Học lại | Học lại cả module, đổi cách (bớt video, tăng code) |

---

## Quy tắc tạo đề

1. Chỉ dùng **topic hợp lệ** trong danh sách dưới — khớp 1-1 với `01_LO_TRINH.md`.
2. Câu hỏi bám checklist + deliverable của module tương ứng trong `01`.
3. Mỗi câu trong file đề phải có dòng trống `**Trả lời:**` để học viên điền.
4. File đáp án có thang điểm từng câu và đáp án ngắn gọn, chấm được.
5. `THI_LAI`: ưu tiên chủ đề đã sai/yếu (đọc `05_TIEN_DO.md` + lần chấm trước nếu có).
6. `PHONG_VAN`: chỉ tình huống miệng/whiteboard — không hỏi thuộc lòng API.
7. Không tự tick checklist trong `01`; không cập nhật `05` khi chỉ tạo đề.

---

## Danh sách topic hợp lệ (41)

| Topic | Module |
|---|---|
| `M0-1-java-modern` | 0-1 Java hiện đại |
| `M0-2-oop-solid` | 0-2 OOP & SOLID |
| `M0-3-dsa-basic` | 0-3 DSA I |
| `M0-4-dsa-tree-graph` | 0-4 DSA II |
| `M0-5-git-maven` | 0-5 Git & Maven |
| `M1-1-ioc-di` | 1-1 IoC / DI |
| `M1-2-mvc-rest` | 1-2 Spring MVC & REST |
| `M1-3-jpa` | 1-3 Spring Data JPA |
| `M1-4-validation-error` | 1-4 Validation & Exception |
| `M1-5-config-profiles` | 1-5 Config & Profiles |
| `M1-6-testing` | 1-6 Testing |
| `M2-1-sql-index` | 2-1 SQL & Index |
| `M2-2-postgres` | 2-2 PostgreSQL |
| `M2-3-flyway` | 2-3 Flyway |
| `M2-4-perf-jpa` | 2-4 N+1 & HikariCP |
| `M3-1-rest-bp` | 3-1 REST best practices |
| `M3-2-security-core` | 3-2 Security Core |
| `M3-3-jwt` | 3-3 JWT |
| `M3-4-oauth2` | 3-4 OAuth2 / OIDC |
| `M3-5-openapi-client` | 3-5 OpenAPI & Client |
| `M4-1-docker` | 4-1 Docker |
| `M4-2-ci` | 4-2 GitHub Actions |
| `M4-3-tdd-coverage` | 4-3 TDD & Coverage |
| `M4-4-logging-hexagonal` | 4-4 Logging & Hexagonal |
| `M5-1-redis` | 5-1 Redis |
| `M5-2-kafka` | 5-2 Kafka |
| `M5-3-microservices` | 5-3 Microservices |
| `M5-4-actuator` | 5-4 Actuator |
| `M5-5-system-design` | 5-5 System Design |
| `M6A-1-clean-code` | 6A-1 Clean Code |
| `M6A-2-patterns-cs` | 6A-2 Patterns C&S |
| `M6A-3-patterns-behavioral` | 6A-3 Patterns Behavioral |
| `M6A-4-ddd-hexagonal` | 6A-4 DDD & C4 |
| `M6B-1-aws-core` | 6B-1 AWS Core |
| `M6B-2-rds-s3` | 6B-2 RDS & S3 |
| `M6B-3-deploy-aws` | 6B-3 Deploy AWS |
| `M6B-4-aws-ops` | 6B-4 AWS Ops |
| `M7-1-leetcode` | 7-1 LeetCode |
| `M7-2-sd-interview` | 7-2 SD Interview |
| `M7-3-behavioral` | 7-3 Behavioral |
| `M7-4-portfolio` | 7-4 Portfolio |

---

## Template gọi nhanh

```
Dùng 02_PROMPT_TAO_DE.md
topic = M1-3-jpa
che_do = DAY_DU
trong_tam =
tao_dap_an = co
```
