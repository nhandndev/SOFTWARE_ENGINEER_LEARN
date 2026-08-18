Đã đọc xong toàn bộ `ROADMAP_PROMPT.md` (530 dòng). Dưới đây là plan thực thi — tôi đang ở Plan mode nên không ghi file; nội dung này chính là nội dung cần lưu thành `PLAN_THUC_THI.md`.

---

# PLAN_THUC_THI.md

> Plan điều phối cho model execute. Không chứa nội dung đầy đủ của 01–06 / AGENTS / README.
> Nguồn contract: `ROADMAP_PROMPT.md` (v4, 11/08/2026).

---

## 1 · Tóm tắt thiết kế

**Cơ sở tính:** 5 buổi/tuần × 3–4h = 15–20h/tuần. Quy đổi tuần dùng **17.5h/tuần** (điểm giữa), làm tròn 0.5 tuần.

- **Full path: ~590 giờ / ~34 tuần** (≈ 8 tháng học song song đại học)
- **MVP path: Chặng 0 → 1 → 2 → 3 → 4 → 7** (bỏ 5 / 6A / 6B) = **394 giờ / ~23 tuần** (≈ 5.5 tháng)
- **Tổng số module: 41**

| Chặng                | Tên                    | Số module | Tổng giờ  | Số tuần      |
| -------------------- | ---------------------- | --------- | --------- | ------------ |
| 0                    | Nền tảng Java          | 5         | 68h       | 4 tuần       |
| 1                    | Spring Boot thực chất  | 6         | 86h       | 5 tuần       |
| 2                    | Database & Persistence | 4         | 52h       | 3 tuần       |
| 3                    | API & Security         | 5         | 74h       | 4 tuần       |
| 4                    | DevOps & Engineering   | 4         | 58h       | 3.5 tuần     |
| 5                    | Scalability            | 5         | 64h       | 3.5 tuần     |
| 6A                   | Clean Code & Patterns  | 4         | 72h       | 4 tuần       |
| 6B                   | AWS Cloud              | 4         | 60h       | 3.5 tuần     |
| 7                    | Phỏng vấn & Portfolio  | 4         | 56h       | 3 tuần       |
| **TỔNG (full path)** | —                      | **41**    | **~590h** | **~34 tuần** |

**Quy ước ID (bắt buộc, dùng thống nhất 3 nơi):**

- Heading trong `01`: `## Module <ID> · <Tên>` với ID dạng `0-1`, `1-3`, `6A-1`, `6B-3`, `7-2`
- Topic kiểm tra: `M<ID>-<slug>` (ví dụ `M1-3-jpa`, theo đúng tinh thần ví dụ `M3-jpa` ở mục 8 của prompt)
- Bảng trạng thái trong `05`: `M<ID> · <Tên rút gọn>`

---

## 2 · Danh sách module (skeleton)

### Chặng 0 — Nền tảng Java (68h / 4 tuần)

| ID  | Tên                                                             | Giờ | Buổi   | Deliverable shopcore                                                                                     | Topic               |
| --- | --------------------------------------------------------------- | --- | ------ | -------------------------------------------------------------------------------------------------------- | ------------------- |
| 0-1 | Java hiện đại: Generics, Lambda, Stream, Optional               | 16h | 4 × 4h | Package `common` với `Result<T>`, `PageResponse<T>` và utils viết bằng Stream/Optional, có unit test     | M0-1-java-modern    |
| 0-2 | OOP nâng cao, SOLID & nhận diện Design Pattern                  | 12h | 4 × 3h | Domain model draft (Product, Category, Order) tuân SOLID + 1 Builder cho Product                         | M0-2-oop-solid      |
| 0-3 | DSA I: Big-O, Array/LinkedList/Stack/Queue, Binary Search, Sort | 16h | 4 × 4h | Package `algo` chứa ≥ 15 lời giải kèm JUnit test                                                         | M0-3-dsa-basic      |
| 0-4 | DSA II: Tree, Graph, BFS/DFS                                    | 12h | 4 × 3h | Thêm ≥ 10 bài tree/graph có test, README ghi Big-O từng bài                                              | M0-4-dsa-tree-graph |
| 0-5 | Git & Maven — khởi tạo `shopcore`                               | 12h | 4 × 3h | Repo GitHub `shopcore`: cấu trúc Maven, `.gitignore`, README skeleton, 1 PR đã merge có conflict resolve | M0-5-git-maven      |

### Chặng 1 — Spring Boot thực chất (86h / 5 tuần)

| ID  | Tên                                           | Giờ | Buổi     | Deliverable shopcore                                                                        | Topic                 |
| --- | --------------------------------------------- | --- | -------- | ------------------------------------------------------------------------------------------- | --------------------- |
| 1-1 | IoC / DI, Bean & ApplicationContext           | 14h | 4 × 3.5h | Cấu hình Bean cho shopcore: `@Configuration`, scope, log chứng minh lifecycle               | M1-1-ioc-di           |
| 1-2 | Spring MVC 3-layer & REST API                 | 16h | 4 × 4h   | REST CRUD Product + Category đủ 3 lớp, status code chuẩn, pagination                        | M1-2-mvc-rest         |
| 1-3 | Spring Data JPA                               | 20h | 5 × 4h   | Entity Product/Category `@ManyToOne`, derived query + JPQL, Pageable, chụp log N+1          | M1-3-jpa              |
| 1-4 | Bean Validation & Exception Handling          | 12h | 4 × 3h   | DTO `@Valid` + custom ConstraintValidator (SKU) + `@ControllerAdvice` trả ProblemDetail     | M1-4-validation-error |
| 1-5 | Config, Profiles & `@ConfigurationProperties` | 8h  | 2 × 4h   | `application.yml` tách profile dev/test + lớp `ShopcoreProperties` typed                    | M1-5-config-profiles  |
| 1-6 | Testing & Clean Code tối thiểu                | 16h | 4 × 4h   | ≥ 15 test (`@WebMvcTest`, `@DataJpaTest`, Mockito) + áp checklist naming / method ≤ 20 dòng | M1-6-testing          |

### Chặng 2 — Database & Persistence (52h / 3 tuần)

| ID  | Tên                             | Giờ | Buổi   | Deliverable shopcore                                                                            | Topic          |
| --- | ------------------------------- | --- | ------ | ----------------------------------------------------------------------------------------------- | -------------- |
| 2-1 | SQL nâng cao & Index chiến lược | 16h | 4 × 4h | Bộ query báo cáo (JOIN/subquery) + index cho product/order, kèm EXPLAIN ANALYZE trước–sau       | M2-1-sql-index |
| 2-2 | PostgreSQL thực chiến           | 12h | 4 × 3h | Chuyển shopcore sang PostgreSQL: kiểu dữ liệu chuẩn, constraint FK/unique/check, ghi chú VACUUM | M2-2-postgres  |
| 2-3 | Flyway Migration                | 8h  | 2 × 4h | Toàn bộ schema quản lý bằng Flyway `V1__…`, có seed data, CI chạy migrate                       | M2-3-flyway    |
| 2-4 | Performance: N+1 sâu & HikariCP | 16h | 4 × 4h | Fix N+1 bằng JOIN FETCH / `@EntityGraph` / batch size + tuning HikariCP, báo cáo benchmark      | M2-4-perf-jpa  |

### Chặng 3 — API & Security (74h / 4 tuần)

| ID  | Tên                             | Giờ | Buổi     | Deliverable shopcore                                                                          | Topic               |
| --- | ------------------------------- | --- | -------- | --------------------------------------------------------------------------------------------- | ------------------- |
| 3-1 | REST API best practices         | 12h | 4 × 3h   | Versioning `/api/v1`, pagination chuẩn hoá, error response format thống nhất toàn API         | M3-1-rest-bp        |
| 3-2 | Spring Security 6 Core          | 16h | 4 × 4h   | `SecurityFilterChain`, entity User/Role, password encoder, auth chạy được end-to-end          | M3-2-security-core  |
| 3-3 | JWT & Phân quyền                | 20h | 5 × 4h   | register/login/refresh JWT stateless + `@PreAuthorize` USER/ADMIN + test security             | M3-3-jwt            |
| 3-4 | OAuth2 / OIDC & Google Login    | 12h | 4 × 3h   | Google login tích hợp 1 lần, map sang user nội bộ của shopcore                                | M3-4-oauth2         |
| 3-5 | External API Client & OpenAPI 3 | 14h | 4 × 3.5h | WebClient/OpenFeign gọi 1 external API có error handling + Swagger UI + export `openapi.json` | M3-5-openapi-client |

### Chặng 4 — DevOps & Engineering (58h / 3.5 tuần)

| ID  | Tên                          | Giờ | Buổi     | Deliverable shopcore                                                                      | Topic                  |
| --- | ---------------------------- | --- | -------- | ----------------------------------------------------------------------------------------- | ---------------------- |
| 4-1 | Docker & docker-compose      | 16h | 4 × 4h   | Dockerfile multi-stage + docker-compose (app + PostgreSQL + Redis) chạy bằng 1 lệnh       | M4-1-docker            |
| 4-2 | GitHub Actions CI            | 12h | 4 × 3h   | Pipeline build → test → push image, badge trạng thái trong README                         | M4-2-ci                |
| 4-3 | TDD & Test Coverage          | 16h | 4 × 4h   | 1 feature viết theo TDD + JaCoCo coverage ≥ 70%, CI fail nếu dưới ngưỡng                  | M4-3-tdd-coverage      |
| 4-4 | Logging & Hexagonal Skeleton | 14h | 4 × 3.5h | Structured JSON log + MDC requestId; tách package `domain / application / infrastructure` | M4-4-logging-hexagonal |

### Chặng 5 — Scalability (64h / 3.5 tuần)

| ID  | Tên                                   | Giờ | Buổi   | Deliverable shopcore                                                                   | Topic              |
| --- | ------------------------------------- | --- | ------ | -------------------------------------------------------------------------------------- | ------------------ |
| 5-1 | Redis & Caching                       | 16h | 4 × 4h | Cache-aside cho product list, TTL + invalidation khi update, đo latency trước–sau      | M5-1-redis         |
| 5-2 | Kafka Event-Driven                    | 20h | 5 × 4h | Publish event `order-placed`, consumer xử lý notification, at-least-once + idempotency | M5-2-kafka         |
| 5-3 | Microservices — khái niệm & ranh giới | 8h  | 2 × 4h | ADR trong `docs/`: vì sao shopcore giữ monolith, điều kiện nào thì tách service        | M5-3-microservices |
| 5-4 | Spring Actuator & Metrics             | 8h  | 2 × 4h | Actuator health/metrics/info + 1 custom health indicator + 1 custom metric             | M5-4-actuator      |
| 5-5 | System Design cơ bản                  | 12h | 4 × 3h | Sơ đồ scale shopcore (LB, CDN, read replica) + ghi chú bottleneck vào `docs/`          | M5-5-system-design |

### Chặng 6A — Clean Code & Patterns (72h / 4 tuần) — 4 module, cố định theo prompt

| ID   | Tên                                       | Giờ | Buổi   | Deliverable shopcore                                                                                             | Topic                     |
| ---- | ----------------------------------------- | --- | ------ | ---------------------------------------------------------------------------------------------------------------- | ------------------------- |
| 6A-1 | Clean Code & Refactoring thực chiến       | 20h | 5 × 4h | Refactor ≥ 5 code smell có thật trong shopcore, test xanh trước–sau, ghi refactor log                            | M6A-1-clean-code          |
| 6A-2 | Design Patterns — Creational & Structural | 16h | 4 × 4h | Áp Builder + Factory + 1 Structural (Adapter/Decorator) vào shopcore, giải thích lý do chọn                      | M6A-2-patterns-cs         |
| 6A-3 | Design Patterns — Behavioral              | 16h | 4 × 4h | Áp ≥ 2 behavioral (Strategy tính giá/ship, Observer hoặc Command) + ghi anti-pattern đã tránh                    | M6A-3-patterns-behavioral |
| 6A-4 | DDD Lite, Hexagonal & C4                  | 20h | 5 × 4h | Hoàn thiện Ports & Adapters, Aggregate Order + Value Object Money, C4 Context + Container, self-review checklist | M6A-4-ddd-hexagonal       |

### Chặng 6B — AWS Cloud (60h / 3.5 tuần) — 4 module, cố định theo prompt

| ID   | Tên                            | Giờ | Buổi   | Deliverable shopcore                                                                           | Topic            |
| ---- | ------------------------------ | --- | ------ | ---------------------------------------------------------------------------------------------- | ---------------- |
| 6B-1 | AWS Core: IAM, VPC, EC2, S3    | 16h | 4 × 4h | IAM user/role least-privilege + S3 bucket cho asset shopcore (LocalStack trước, Free Tier sau) | M6B-1-aws-core   |
| 6B-2 | RDS & S3 Storage               | 12h | 4 × 3h | shopcore kết nối RDS PostgreSQL + upload ảnh product lên S3 qua presigned URL                  | M6B-2-rds-s3     |
| 6B-3 | Deploy `shopcore` lên AWS      | 20h | 5 × 4h | ECR → EC2/ECS Fargate + RDS + S3 + CloudFront, GitHub Actions deploy tự động                   | M6B-3-deploy-aws |
| 6B-4 | Observability, Cost & Security | 12h | 4 × 3h | CloudWatch log + alarm, bật CloudTrail, siết Security Group, bảng cost thực tế đã tiêu         | M6B-4-aws-ops    |

### Chặng 7 — Phỏng vấn & Portfolio (56h / 3 tuần)

| ID  | Tên                            | Giờ | Buổi   | Deliverable shopcore                                                                    | Topic             |
| --- | ------------------------------ | --- | ------ | --------------------------------------------------------------------------------------- | ----------------- |
| 7-1 | LeetCode theo pattern (50 bài) | 24h | 6 × 4h | Package `interview/leetcode`: 50 lời giải có test, ghi pattern + Big-O từng bài         | M7-1-leetcode     |
| 7-2 | System Design Interview        | 12h | 4 × 3h | 2 design doc (URL shortener, notification system) trong `docs/` của shopcore            | M7-2-sd-interview |
| 7-3 | Behavioral & STAR              | 8h  | 2 × 4h | 10 câu chuyện STAR viết sẵn, ≥ 3 lấy từ chính quá trình làm shopcore                    | M7-3-behavioral   |
| 7-4 | Portfolio & CV                 | 12h | 4 × 3h | README chuyên nghiệp (C4 + link API docs + screenshot), demo video ≤ 5 phút, CV 1 trang | M7-4-portfolio    |

---

## 3 · Thứ tự tạo file

Tạo đúng thứ tự này vì file sau tham chiếu file trước. Ngoài 8 file, tạo thêm thư mục rỗng `de-kiem-tra/` với `.gitkeep`.

### [ ] 1. `01_LO_TRINH.md`

**Mục đích:** nguồn sự thật về nội dung học — bảng tổng quan + 41 module.
**Bắt buộc không được thiếu:**

- Bảng tổng quan đúng cột theo mục 3.2, **điền số thật từ Mục 1 của plan này, không để ký tự `X`**
- Dòng cảnh báo phạm vi: _"Full path (~34 tuần): đầy đủ từ nền tảng đến AWS. Nếu mục tiêu intern/fresher sớm hơn, dùng MVP path."_
- Khối MVP path ghi rõ **~23 tuần** và câu "MVP vẫn ~23 tuần — không phải con đường ngắn, chỉ là bỏ phần nâng cao. JWT, Docker, test vẫn cần."
- Chèn **bảng ngưỡng điểm mục 3.9** nguyên văn (≥85 🟢 / 55–84 🟠 / <55 🔴) + 2 câu "Không tự tick `[x]`" và "Không mở module mới khi module trước chưa đạt 🟢"
- 41 module, mỗi module **đúng 8 khối heading theo thứ tự** của mục 3.2, không thêm không bớt
- Mỗi module ≥ 1 link Official/Baeldung
- Mỗi module có mục "Phần bỏ qua giai đoạn này" với ≥ 1 dòng có lý do
- Chặng 6B: mỗi module có cost estimate; module 6B-4 lặp lại "Phần bỏ qua: Lambda, EKS, SQS/SNS, DynamoDB, Step Functions"

### [ ] 2. `02_PROMPT_TAO_DE.md`

**Mục đích:** prompt sinh đề kiểm tra.
**Bắt buộc:** khối Input 4 tham số; khối Output 2 đường dẫn file + cấu trúc đề; bảng 4 chế độ với tổng điểm thô 90/43/58/40; công thức normalize + 2 ví dụ (81/90 → 90; THI_LAI normalize trên số điểm thô thực ra đề); danh sách topic hợp lệ = 41 topic ở Mục 2 của plan này.

### [ ] 3. `03_PROMPT_CHAM_DE.md`

**Mục đích:** prompt chấm + giảng lại.
**Bắt buộc:** Input `file =`; **đủ 7 mục output đúng thứ tự**; nhắc lại bảng ngưỡng điểm; ràng buộc "chỉ cập nhật 4 field của `05`" và "không rewrite `01`".

### [ ] 4. `04_MAU_DE_KIEM_TRA.md`

**Mục đích:** mẫu chuẩn về format và độ khó.
**Bắt buộc:** 1 đề `DAY_DU` hoàn chỉnh cho `M1-3-jpa` — đúng 20 câu (10 lý thuyết + 8 tình huống + 2 code mini), mỗi câu có dòng `**Trả lời:**`; phần đáp án riêng có thang điểm từng câu; 1 ví dụ chấm mẫu chạy qua công thức normalize ra điểm thang 100 và kết luận state. Khuyến nghị thêm 1 đề `NHANH` 10 câu rút gọn để thấy khác biệt chế độ.

### [ ] 5. `05_TIEN_DO.md`

**Mục đích:** state machine + nhật ký.
**Bắt buộc:** 4 section đúng tên theo mục 3.3; bảng "Trạng thái từng module" **liệt kê đủ 41 dòng**, tất cả khởi tạo 🔵 và `—`; bảng 5 trạng thái + dòng quy tắc chuyển state; con trỏ hiện tại khởi tạo ở `M0-1`.

### [ ] 6. `06_PROMPT_HOM_NAY.md`

**Mục đích:** prompt kế hoạch hằng ngày.
**Bắt buộc:** Input `hours_available_today` (mặc định 3) + `ngay_trong_tuan`; đủ 5 dòng Logic (gồm nhánh `< 1.5h` và nhánh Thứ 6); đủ 4 mục Output; nhắc lịch 5 buổi/tuần, Thứ 7 nghỉ; nguyên tắc 30% xem – 70% code.

### [ ] 7. `AGENTS.md`

**Mục đích:** bảng định tuyến intent.
**Bắt buộc:** đủ 5 dòng intent theo mục 3.4, giữ nguyên cột "File cập nhật" (đặc biệt ghi chú GRADE_EXAM chỉ tick checklist + đổi trạng thái); thêm khối "Quy tắc chung cho AI" gồm: không tự tick `[x]`, không mở module mới khi chưa 🟢, không đổi tên `shopcore`, không tạo project mới.

### [ ] 8. `README.md`

**Mục đích:** hướng dẫn sử dụng hệ thống.
**Bắt buộc:** sơ đồ 8 file + vai trò từng file; quy trình 1 ngày học; quy trình 1 module (học → đề DAY_DU → chấm → cập nhật `05`); giải thích MVP vs full path kèm số tuần; nhắc `shopcore` là capstone duy nhất; hướng dẫn xử lý mục `[Cần verify]`.

---

## 4 · Spec ngắn cho file khó

### 4.1 `02_PROMPT_TAO_DE.md`

```
Input:  topic = <1 trong 41 topic>
        che_do = DAY_DU | NHANH | THI_LAI | PHONG_VAN   (mặc định DAY_DU)
        trong_tam = <chủ đề con>                         (tuỳ chọn)
        tao_dap_an = co | khong                          (mặc định co)

Output: de-kiem-tra/<topic>__<YYYY-MM-DD>__lan<N>.md
        de-kiem-tra/<topic>__<YYYY-MM-DD>__lan<N>__DAPAN.md   (nếu tao_dap_an = co)
        Cấu trúc: tiêu đề + hướng dẫn + câu hỏi, mỗi câu có dòng "**Trả lời:**"
```

| Chế độ    | Tổng câu | Lý thuyết 3đ | Tình huống 5đ | Code mini 10đ | Điểm thô   |
| --------- | -------- | ------------ | ------------- | ------------- | ---------- |
| DAY_DU    | 20       | 10           | 8             | 2             | 90đ        |
| NHANH     | 10       | 6            | 3             | 1             | 43đ        |
| THI_LAI   | ≤ 12     | ~6           | ~4            | ~2            | tối đa 58đ |
| PHONG_VAN | 8        | 0            | 8             | 0             | 40đ        |

Normalize: `Điểm = (thô / thô tối đa của đề thực ra) × 100`. THI_LAI ưu tiên topic đã sai/yếu; thiếu câu thì bổ sung trong cùng nhóm kiến thức, và normalize trên tổng thô **thực tế của đề**, không phải 58.

### 4.2 `03_PROMPT_CHAM_DE.md` — đúng 7 mục output, đúng thứ tự

1. Điểm tổng thang 100 (đã normalize) + điểm từng nhóm kiến thức kèm 🟢/🟡/🔴
2. Bảng chi tiết: câu số | đúng/sai/thiếu | điểm đạt | nhận xét ngắn
3. Giải thích câu sai: tại sao sai → cách nhớ đúng → đọc lại ở đâu
4. Phác đồ học lại cho câu KB: topic → nguồn → số phút → bài tập tự làm
5. Quyết định theo bảng ngưỡng: 🟢 đi tiếp / 🟠 ôn thêm / 🔴 học lại
6. Kế hoạch 3–5 ngày cụ thể nếu không đạt 🟢
7. Dòng cập nhật `05_TIEN_DO.md`: chỉ 4 thứ — Trạng thái module, Điểm gần nhất, Ngày kiểm tra, thêm 1 dòng log. Với `01`: chỉ tick `[x]` và đổi emoji, **không rewrite nội dung**.

### 4.3 `05_TIEN_DO.md` — state machine

| Trạng thái   | Ký hiệu | Điều kiện vào  | Bước tiếp theo                                         |
| ------------ | ------- | -------------- | ------------------------------------------------------ |
| Chưa bắt đầu | 🔵      | Mặc định       | Bắt đầu học → 🟡                                       |
| Đang học     | 🟡      | Bắt đầu module | Hoàn thành → làm đề `DAY_DU`                           |
| Đạt          | 🟢      | Điểm ≥ 85      | Mở module kế tiếp                                      |
| Cần ôn       | 🟠      | Điểm 55–84     | Ôn chủ đề yếu → `NHANH` (70–84) hoặc `THI_LAI` (55–69) |
| Học lại      | 🔴      | Điểm < 55      | Học lại cả module, bớt video tăng code                 |

Chuyển state hợp lệ: `🔵 → 🟡` · `🟡 → 🟢/🟠/🔴` · `🟠 → 🟢` (sau `NHANH`/`THI_LAI` ≥ 85) · `🔴 → 🟡`. Không có đường tắt 🔵 → 🟢.

4 section cố định: **Con trỏ hiện tại** (module đang học, buổi 1–5/5, ngày bắt đầu module, giờ tuần này /20h) · **Trạng thái từng module** (41 dòng) · **Lịch sử bài kiểm tra** (bảng rỗng có header) · **Nhật ký học** (mới nhất lên đầu).

### 4.4 `AGENTS.md` — bảng intent

| Người dùng nói               | Intent       | File đọc | File cập nhật                                                         | Ghi chú                     |
| ---------------------------- | ------------ | -------- | --------------------------------------------------------------------- | --------------------------- |
| "Hôm nay học gì"             | DAILY_PLAN   | 05 + 01  | —                                                                     | Xem `hours_available_today` |
| "Xong rồi: …"                | LOG_PROGRESS | —        | 05                                                                    | Ghi log + cập nhật giờ      |
| "Tạo đề", "kiểm tra module…" | CREATE_EXAM  | 02       | —                                                                     | Cần topic + chế độ          |
| "Chấm bài", "tôi làm xong"   | GRADE_EXAM   | 03       | 05 + 01 (chỉ tick checklist + đổi trạng thái, không rewrite nội dung) | —                           |
| "Tôi đang ở đâu", "tiến độ"  | STATUS       | 05 + 01  | —                                                                     | —                           |

Được phép thêm **tối đa 1 dòng fallback** cho trường hợp không rõ intent (hành động: hỏi lại, không đoán). Không thêm intent nào khác.

### 4.5 `06_PROMPT_HOM_NAY.md` — xử lý `hours_available_today`

| Giờ có            | Hành vi                                                                            |
| ----------------- | ---------------------------------------------------------------------------------- |
| < 1.5h            | Đúng 1 task nhỏ: đọc 1 chủ đề trong checklist, hoặc viết 1 test, hoặc 1 commit nhỏ |
| 1.5–2.5h          | 1 task lý thuyết + 1 task code nhỏ                                                 |
| 3–4h (mặc định 3) | 1 buổi chuẩn: ~30% đọc/xem + ~70% code deliverable                                 |
| > 4h              | Vẫn cấp tối đa 4h nội dung, phần dư đề xuất ôn/luyện, không giao vượt              |

Override theo thứ tự ưu tiên: module đang 🟠 → ưu tiên chủ đề yếu; `ngay_trong_tuan = 5` (Thứ 6) → tổng kết tuần / kiểm tra mini; còn nợ điểm chưa 🟢 → không giao nội dung module mới.

---

## 5 · Quy tắc tài liệu khi execute

1. **Thứ tự cột trong bảng tài liệu, không đảo:** Official → Sách → Udemy → Coursera → YouTube.
2. **Official docs và Baeldung: không cần `[Cần verify]`** (link cố định). Bắt buộc mỗi module ≥ 1 link loại này.
3. **Udemy / Coursera / YouTube: luôn ghi `[Cần verify]`.** Không có ngoại lệ — an toàn hơn là tự đánh giá "chắc 100%". Nếu không nghĩ ra tên khoá đáng tin, **bỏ trống dòng đó và thay bằng official docs**.
4. Tối đa **2 mục non-official / module**, để bảng không loãng.
5. **Không bịa** URL cụ thể ngoài domain gốc đã biết chắc. Nguồn an toàn khuyến nghị: `spring.io/guides`, `docs.spring.io`, `docs.oracle.com`, `baeldung.com`, `postgresql.org/docs`, `documentation.red-gate.com/flyway`, `docs.docker.com`, `docs.github.com/actions`, `kafka.apache.org/documentation`, `redis.io/docs`, `docs.aws.amazon.com`, `leetcode.com`.
6. Sách bắt buộc Chặng 6A: _Clean Code_ (Martin), _Refactoring_ (Fowler 2nd), _Design Patterns_ (GoF, đọc chọn lọc), _A Philosophy of Software Design_ (Ousterhout) — ghi rõ chương nếu không đọc toàn bộ.

---

## 6 · Acceptance criteria

- [ ] Đủ 8 file (`01`–`06`, `AGENTS.md`, `README.md`) + thư mục `de-kiem-tra/`
- [ ] Bảng tổng quan trong `01` **không còn ký tự `X`** — số giờ và số tuần khớp Mục 1 của plan này (tổng ~590h / ~34 tuần)
- [ ] MVP path ghi rõ **~23 tuần**, kèm câu cảnh báo "không phải con đường ngắn"
- [ ] Đủ **41 module**, mỗi module đúng 8 heading theo schema 3.2, đúng thứ tự, không thêm không bớt
- [ ] Chặng 6A có **đúng 4 module**, mỗi module có bài tập refactor code thật trong `shopcore`
- [ ] Chặng 6B có **đúng 4 module**, mỗi module có cost estimate cụ thể; nêu rõ LocalStack/Free Tier trước khi bật resource trả phí; tổng ước tính nằm trong $200
- [ ] Bảng ngưỡng điểm 85/55 xuất hiện thống nhất ở `01`, `02`, `03`, `05` — không có biến thể số khác
- [ ] Mỗi module có ≥ 1 link Official/Baeldung; mọi mục Udemy/Coursera/YouTube đều có `[Cần verify]`
- [ ] `05` liệt kê đủ 41 dòng module, tất cả 🔵
- [ ] Topic trong mục "Liên kết kiểm tra" của `01` khớp 1-1 với danh sách topic trong `02`
- [ ] Deliverable từng chặng khớp bảng Capstone Contract mục 4 của prompt; tên project luôn là `shopcore`
- [ ] Không rewrite design ngoài plan này

---

**Model execute: chỉ viết file theo plan này + ROADMAP_PROMPT. Không đổi số module / thứ tự chặng / tên shopcore.**
