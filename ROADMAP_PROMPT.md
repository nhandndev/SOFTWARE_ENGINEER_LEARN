# PROMPT TẠO ROADMAP — SOFTWARE ENGINEER (Java Ecosystem)

> Đây là file prompt mô tả đầy đủ context, profile học viên, và yêu cầu đầu ra.  
> Gửi toàn bộ file này cho AI để AI tạo ra bộ tài liệu lộ trình hoàn chỉnh.

---

## 1 · Tóm tắt yêu cầu

Tôi cần một **bộ tài liệu lộ trình tự học** theo hệ thống module, có kiểm tra từng chặng,
có gợi ý tài liệu/khoá học cụ thể, và có prompt sẵn để AI hỗ trợ học hằng ngày.
Đích đến là trở thành **Software Engineer thực chiến trong hệ sinh thái Java**,
với nền tảng vững về Clean Code, tư duy thiết kế hệ thống, và kỹ năng Cloud (AWS).

---

## 2 · Profile học viên

| Thuộc tính | Giá trị |
|---|---|
| Năm học | Sinh viên năm 2 đại học |
| Nền tảng | Java Core (OOP, Collections, Exception, I/O, cơ bản về Generics) |
| Spring Boot | **Mới bắt đầu — siêu cơ bản**: biết tạo project, chạy được Hello World, hiểu khái niệm annotation cơ bản. **Chưa hiểu sâu DI, IoC, Bean lifecycle, JPA, Security, v.v.** |
| Mục tiêu vị trí | Software Engineer (Backend) — Java ecosystem |
| Thời gian | Học song song với đại học, **15–20h/tuần**, mặc định **5 buổi/tuần**, mỗi buổi **3–4h** (Thứ 7 nghỉ) |
| AWS Budget | **$200 free credit** (không phải Free Tier thông thường) — dùng cho Chặng 6B |
| Ngôn ngữ | Tiếng Việt (thuật ngữ kỹ thuật giữ nguyên tiếng Anh) |

---

## 3 · Yêu cầu bắt buộc về hệ thống lộ trình

### 3.1 Cấu trúc file đầu ra

AI phải tạo ra **đủ các file sau, không thiếu**:

```
01_LO_TRINH.md          — Lộ trình chính (tất cả module, checklist, tài liệu)
02_PROMPT_TAO_DE.md     — Prompt để AI tạo bài kiểm tra cho từng module
03_PROMPT_CHAM_DE.md    — Prompt để AI chấm bài, giảng lại phần sai
04_MAU_DE_KIEM_TRA.md   — Đề mẫu với đáp án để thấy format và độ khó
05_TIEN_DO.md           — File theo dõi tiến độ thực tế (state machine + nhật ký)
06_PROMPT_HOM_NAY.md    — Prompt trả lời "Hôm nay học gì, làm gì tiếp theo?"
AGENTS.md               — Bảng định tuyến để AI tự hiểu người dùng muốn gì
README.md               — Hướng dẫn sử dụng toàn bộ hệ thống
```

---

### 3.2 Schema bắt buộc — `01_LO_TRINH.md`

Dòng đầu tiên phải có **bảng tổng quan toàn lộ trình** với số giờ và số tuần cụ thể:

```markdown
## Tổng quan lộ trình
| Chặng | Tên | Số module | Tổng giờ | Số tuần (15–20h/tuần) |
|---|---|---|---|---|
| 0   | Nền tảng Java          | X | Xh | X tuần |
| 1   | Spring Boot thực chất  | X | Xh | X tuần |
| 2   | Database & Persistence | X | Xh | X tuần |
| 3   | API & Security         | X | Xh | X tuần |
| 4   | DevOps & Engineering   | X | Xh | X tuần |
| 5   | Scalability            | X | Xh | X tuần |
| 6A  | Clean Code & Patterns  | 4 | Xh | X tuần |
| 6B  | AWS Cloud              | 4 | Xh | X tuần |
| 7   | Phỏng vấn & Portfolio  | X | Xh | X tuần |
| **TỔNG (full path)** | — | — | **~Xh** | **~X tuần** |
```

> **AI bắt buộc điền số giờ và số tuần thực tế — không để X.** Ước tính phải dựa trên nội dung module, không làm tròn thấp.

> **Cảnh báo phạm vi (bắt buộc ghi):**  
> _"Full path (~X tuần): đầy đủ từ nền tảng đến AWS. Nếu mục tiêu intern/fresher sớm hơn, dùng MVP path."_

> **MVP path** (tối thiểu để apply fresher Java backend):  
> _Chặng 0 → 1 → 2 → 3 → 4 → Chặng 7, bỏ Chặng 5 / 6A / 6B._  
> _MVP vẫn ~X tuần — không phải con đường ngắn, chỉ là bỏ phần nâng cao. JWT, Docker, test vẫn cần._

**Mỗi module** phải có đủ các heading sau (đúng thứ tự, không thêm không bớt):

```markdown
## Module X · <Tên module>
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** Xh (X buổi x Xh/buổi)
**Mục tiêu:** <Học xong làm được gì — 1-2 câu>

### Checklist kiến thức
- [ ] <kiến thức 1>
- [ ] <kiến thức 2>

### Phần bỏ qua giai đoạn này
- <tên topic> — <lý do bỏ>

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Udemy / Coursera / Official / YouTube / Sách | <tên + tác giả + năm nếu chắc chắn> | ⭐ / Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- <mô tả feature/sản phẩm cụ thể>

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = <tên module rút gọn>
```

---

### 3.3 Schema bắt buộc — `05_TIEN_DO.md`

File này là **state machine** — cập nhật sau mỗi buổi học và sau mỗi bài kiểm tra:

```markdown
## Con trỏ hiện tại
- Module đang học: <tên>
- Buổi trong tuần: <1–5> / 5
- Ngày bắt đầu module: <YYYY-MM-DD>
- Giờ học tuần này: <X>h / 20h

## Trạng thái từng module
| Module | Trạng thái | Điểm gần nhất | Ngày kiểm tra |
|---|---|---|---|
| M0 · Nền tảng | 🔵 Chưa bắt đầu | — | — |

## Lịch sử bài kiểm tra
| Ngày | Module | Chế độ | Điểm | Kết quả | Ghi chú |
|---|---|---|---|---|---|

## Nhật ký học (mới nhất lên đầu)
- YYYY-MM-DD: <đã làm gì, số giờ, vướng mắc nếu có>
```

**Bảng trạng thái module duy nhất (dùng thống nhất ở cả `05_TIEN_DO.md` và `01_LO_TRINH.md`):**

| Trạng thái | Ký hiệu | Điều kiện vào | Bước tiếp theo |
|---|---|---|---|
| Chưa bắt đầu | 🔵 | Mặc định | Bắt đầu học → chuyển sang 🟡 |
| Đang học | 🟡 | Bắt đầu module | Hoàn thành → làm đề `DAY_DU` |
| Đạt | 🟢 | Điểm kiểm tra ≥ 85 | Mở module kế tiếp |
| Cần ôn | 🟠 | Điểm 55–84 | Ôn chủ đề yếu → đề `NHANH` hoặc `THI_LAI` |
| Học lại | 🔴 | Điểm < 55 | Học lại cả module, đổi cách học |

> **Quy tắc chuyển state:** `🔵 → 🟡` (khi bắt đầu) · `🟡 → 🟢/🟠/🔴` (sau kiểm tra) · `🟠 → 🟢` (sau đề NHANH/THI_LAI ≥ 85)

---

### 3.4 Schema bắt buộc — `AGENTS.md`

```markdown
| Người dùng nói | Intent | File đọc | File cập nhật | Ghi chú |
|---|---|---|---|---|
| "Hôm nay học gì" | DAILY_PLAN | 05_TIEN_DO.md + 01_LO_TRINH.md | — | Xem hours_available_today |
| "Xong rồi: ..." | LOG_PROGRESS | — | 05_TIEN_DO.md | Ghi log + cập nhật giờ |
| "Tạo đề", "kiểm tra module..." | CREATE_EXAM | 02_PROMPT_TAO_DE.md | — | Cần biết topic + chế độ |
| "Chấm bài", "tôi làm xong" | GRADE_EXAM | 03_PROMPT_CHAM_DE.md | 05_TIEN_DO.md + 01_LO_TRINH.md (chỉ tick checklist + đổi trạng thái, không rewrite nội dung) | — |
| "Tôi đang ở đâu", "tiến độ" | STATUS | 05_TIEN_DO.md + 01_LO_TRINH.md | — | — |
```

---

### 3.5 Schema bắt buộc — `02_PROMPT_TAO_DE.md`

File phải có template input/output rõ ràng:

```markdown
## Input (người dùng cung cấp)
- topic = <tên module, ví dụ: M3-jpa>
- che_do = DAY_DU | NHANH | THI_LAI | PHONG_VAN  (mặc định: DAY_DU)
- trong_tam = <chủ đề con muốn tập trung, tuỳ chọn>
- tao_dap_an = co | khong  (mặc định: co)

## Output (AI phải tạo)
- File đề: `de-kiem-tra/<topic>__<YYYY-MM-DD>__lan<N>.md`
- File đáp án (nếu tao_dap_an = co): `de-kiem-tra/<topic>__<YYYY-MM-DD>__lan<N>__DAPAN.md`
- Cấu trúc đề: tiêu đề + hướng dẫn + danh sách câu hỏi (mỗi câu có dòng `**Trả lời:**`)
```

**Số câu và cấu trúc:**

| Chế độ | Tổng câu | Lý thuyết (3đ/câu) | Tình huống (5đ/câu) | Code mini (10đ/câu) | Tổng điểm thô |
|---|---|---|---|---|---|
| `DAY_DU` | 20 | 10 | 8 | 2 | 10×3 + 8×5 + 2×10 = **90đ** |
| `NHANH` | 10 | 6 | 3 | 1 | 6×3 + 3×5 + 1×10 = **43đ** |
| `THI_LAI` | ≤12 | ~6 | ~4 | ~2 | tối đa 58đ — **ưu tiên topic đã sai/yếu; nếu thiếu câu thì bổ sung cùng nhóm kiến thức đó** |
| `PHONG_VAN` | 8 | 0 | 8 | 0 | 8×5 = **40đ** |

**Công thức normalize về thang 100:**  
`Điểm = (Điểm thô / Tổng điểm thô tối đa của chế độ) × 100`  
Ví dụ DAY_DU: đạt 81đ thô → 81/90 × 100 = **90 điểm**  
Ví dụ THI_LAI: chỉ ra 8 câu (max 46đ thô) → normalize trên 46đ, không trên 58đ.

---

### 3.6 Schema bắt buộc — `03_PROMPT_CHAM_DE.md`

```markdown
## Input
- file = <đường dẫn file đề đã làm>

## Output bắt buộc (theo thứ tự)
1. Điểm tổng (thang 100, áp công thức normalize) + điểm từng nhóm kiến thức (🟢/🟡/🔴)
2. Bảng chi tiết từng câu: câu số | đúng/sai/thiếu | điểm đạt | nhận xét ngắn
3. Giải thích câu sai: tại sao sai, cách nhớ đúng, đọc lại ở đâu
4. Phác đồ học lại cho câu KB: topic → nguồn → số phút → bài tập tự làm
5. Quyết định (dựa bảng state): đi tiếp 🟢 / ôn thêm 🟠 / học lại 🔴
6. Kế hoạch 3–5 ngày cụ thể nếu không đạt 🟢
7. Dòng cập nhật `05_TIEN_DO.md`: ghi rõ field và giá trị mới
   (chỉ cập nhật: Trạng thái module, Điểm gần nhất, Ngày kiểm tra, thêm dòng log)
   (không rewrite toàn bộ 01_LO_TRINH.md — chỉ tick [x] checklist + đổi emoji trạng thái module)
```

---

### 3.7 Schema bắt buộc — `06_PROMPT_HOM_NAY.md`

```markdown
## Input
- hours_available_today = <số giờ, mặc định 3>
- ngay_trong_tuan = <1=Thứ2 ... 5=Thứ6, mặc định đọc từ ngày hệ thống>

## Logic
- Đọc 05_TIEN_DO.md: module đang học, tiến độ tuần, điểm còn nợ
- Đọc 01_LO_TRINH.md: checklist module hiện tại
- Nếu hours_available_today < 1.5h: giao 1 task nhỏ (đọc 1 chủ đề, viết 1 test)
- Nếu ngay_trong_tuan = 5 (Thứ 6): ưu tiên tổng kết tuần / kiểm tra mini
- Nếu module đang 🟠: ưu tiên ôn chủ đề yếu

## Output
1. Bạn đang ở đâu (module, tuần mấy, tổng giờ tuần này)
2. Việc hôm nay (danh sách task vừa đủ với hours_available_today, có ước tính giờ)
3. Tại sao là việc đó (1-2 câu lý do)
4. Điều cần chốt trước khi đóng máy
```

---

### 3.8 Lịch học mặc định

- **5 buổi/tuần** (Thứ 2–6), Thứ 7 nghỉ
- Mỗi buổi **3–4h** (tổng ~15–20h/tuần)
- Khi bận → AI chọn task vừa với giờ có, không giao vượt
- Thứ 6 → tổng kết tuần / kiểm tra mini

---

### 3.9 Ràng buộc ngưỡng điểm (thống nhất toàn hệ thống)

> **Bảng này là nguồn sự thật duy nhất. `02`, `03`, `05`, `01` đều phải dùng bảng này.**

| Điểm (thang 100) | Trạng thái | Hành động |
|---|---|---|
| ≥ 85 | 🟢 Đạt | Sang module kế tiếp |
| 55–84 | 🟠 Cần ôn | Ôn chủ đề yếu → đề `NHANH` (70–84) hoặc `THI_LAI` (55–69) |
| < 55 | 🔴 Học lại | Học lại cả module, đổi cách (bớt video, tăng code) |

**Không tự tick `[x]`** — chỉ AI chấm bài được tick, sau khi điểm ≥ 85%.  
**Không mở module mới khi module trước chưa đạt 🟢.**

---

### 3.10 Ràng buộc chống hallucination cho tài liệu

AI có **2 lựa chọn** khi gợi ý tài liệu — không được chọn cách thứ 3:

1. **Chắc chắn 100%**: ghi tên khoá + tác giả + năm (ví dụ: "Spring Boot 3, Spring 6 & Hibernate for Beginners — Chad Darby — Udemy 2023")
2. **Không chắc**: ghi `[Cần verify]` + thay bằng nguồn official có link xác định (spring.io, docs.oracle.com, baeldung.com)

> Tuyệt đối không bịa tên khoá học. Thà ghi official docs còn hơn hallucinate Udemy.

---

## 4 · Capstone Project Contract

**Tên project:** `shopcore` — mini e-commerce backend (Java + Spring Boot)  
**Không đổi tên. Không mở project mới.**

**Deliverable tích luỹ theo chặng:**

| Sau chặng | Feature phải có trong `shopcore` |
|---|---|
| Chặng 0 | Repo GitHub, cấu trúc package Maven, `.gitignore`, README skeleton |
| Chặng 1 | CRUD Product + Category, REST API, Bean Validation, @ControllerAdvice, JUnit test |
| Chặng 2 | PostgreSQL + Flyway migration, index, fix N+1, HikariCP config |
| Chặng 3 | JWT Auth (register/login/refresh), Swagger/OpenAPI, phân quyền USER/ADMIN |
| Chặng 4 | Docker + docker-compose, GitHub Actions CI (build + test), test coverage ≥ 70%, **skeleton Hexagonal** (tách package domain/application/infrastructure) |
| Chặng 5 | Redis cache (product list), Kafka order-placed event, Spring Actuator endpoint, structured log |
| Chặng 6A | Refactor toàn bộ theo Clean Code checklist, áp ≥ 3 Design Patterns có thể chỉ ra rõ ràng, **hoàn thiện Hexagonal + vẽ C4 diagram** |
| Chặng 6B | Deploy lên AWS: EC2/ECS + RDS + S3 + CloudFront, IAM least-privilege, GitHub Actions → AWS deploy |
| Chặng 7 | README chuyên nghiệp (với diagram + API docs link), demo video, CV-ready |

---

## 5 · Nội dung lộ trình — các chặng bắt buộc

> AI tự thiết kế chi tiết từng module. Phải bao gồm đủ các nhóm sau, đúng thứ tự.

### Chặng 0 — Nền tảng Java
- Generics, Functional Interface, Stream API, Optional, Lambda
- OOP nâng cao: SOLID, Design Patterns cơ bản nhận diện (Singleton, Factory, Builder, Strategy, Observer)
- DSA: Big-O, Array/LinkedList/Stack/Queue/Tree/Graph, BFS/DFS, Binary Search, Sort phổ biến
- Git: branch, merge, rebase, pull request, conflict
- Maven: vòng đời build, dependency management, profiles

### Chặng 1 — Spring Boot thực chất
- IoC / DI — Bean, ApplicationContext, Scope, lifecycle
- Spring MVC — Controller, Service, Repository (3-layer)
- Spring Data JPA — Entity, Repository, JPQL, @Transactional *(N+1 nhận diện ở đây, đào sâu ở Chặng 2)*
- REST API — HTTP methods, status codes, pagination
- Bean Validation, custom ConstraintValidator
- @ControllerAdvice, ProblemDetail
- Profiles, application.yml, @ConfigurationProperties
- JUnit 5, Mockito, @SpringBootTest, @WebMvcTest, @DataJpaTest
- **Clean Code tối thiểu từ buổi đầu**: naming convention, method size ≤ 20 dòng, không comment thừa *(không học sâu — Chặng 6A mới đào sâu)*

### Chặng 2 — Database & Persistence *(đào sâu, không trùng Chặng 1)*
- SQL nâng cao: JOIN phức tạp, subquery, EXPLAIN ANALYZE, index chiến lược
- PostgreSQL thực chiến: kiểu dữ liệu, constraint, VACUUM
- Flyway migration versioning (không phải Liquibase — chọn 1)
- HikariCP pool tuning: pool size, timeout
- N+1 **sâu hơn**: JOIN FETCH, @EntityGraph, batch fetch size, so sánh performance

### Chặng 3 — API & Security
- REST best practices: versioning, pagination chuẩn, error response format
- Spring Security 6 + JWT: filter chain, SecurityContext, stateless session
- OAuth2 / OpenID Connect: khái niệm + tích hợp Google login 1 lần
- OpenFeign / WebClient: gọi external API, error handling
- Swagger / OpenAPI 3: annotation đầy đủ, export spec

### Chặng 4 — DevOps & Engineering cơ bản
- Docker: Dockerfile multi-stage, docker-compose (app + PostgreSQL + Redis)
- GitHub Actions: build → test → Docker push pipeline
- TDD cơ bản, test coverage với JaCoCo
- Logging: Slf4j, MDC (request tracking), log level, structured log (JSON format)
- Hexagonal Architecture: **skeleton tối thiểu** — tách package `domain/application/infrastructure`, chưa cần C4 diagram _(đào sâu + C4 ở Chặng 6A-4)_

### Chặng 5 — Scalability & Backend nâng cao
- Redis: Spring Cache, cache-aside pattern, TTL, invalidation
- Kafka: producer/consumer, topic/partition, consumer group, at-least-once delivery
- Microservices: khái niệm, monolith-first, khi nào tách service
- Spring Actuator: health, metrics, info, custom endpoint
- System Design cơ bản: load balancer, CDN, DB read replica, horizontal vs vertical scaling

### Chặng 6A — Clean Code & Tư duy kỹ thuật sâu
> **Quan trọng:** Chặng 1–5 chỉ áp dụng checklist Clean Code tối thiểu. Chặng 6A mới học sâu + refactor có chủ đích.

AI phải chia Chặng 6A thành **ít nhất 4 module riêng biệt**:

- **Module 6A-1 · Clean Code & Refactoring thực chiến**
  - Naming, function size, comment đúng chỗ, code self-document
  - Code smells: Long Method, God Class, Feature Envy, Data Clump, Primitive Obsession
  - Refactor an toàn: Red → Green → Refactor, không break test
  - Sách: *Clean Code* (Martin), *Refactoring* (Fowler 2nd)

- **Module 6A-2 · Design Patterns — Creational & Structural**
  - Factory Method, Abstract Factory, Builder, Prototype, Singleton (+ anti-pattern)
  - Adapter, Decorator, Facade, Proxy, Composite
  - Bài tập: nhận diện pattern đã dùng trong `shopcore`, refactor 1 chỗ dùng pattern mới
  - Sách: *Design Patterns* (GoF — đọc chọn lọc), *A Philosophy of Software Design* (Ousterhout)

- **Module 6A-3 · Design Patterns — Behavioral**
  - Strategy, Observer, Command, Chain of Responsibility, Template Method, State
  - Khi nào dùng — khi nào không dùng (anti-patterns)
  - Bài tập: áp ≥ 2 pattern vào `shopcore` có thể giải thích lý do

- **Module 6A-4 · DDD Lite & Architecture**
  - Entity, Value Object, Aggregate, Repository, Domain Service theo DDD
  - Hexagonal Architecture (Ports & Adapters): tách domain khỏi infrastructure
  - Vẽ C4 diagram (Context + Container) cho `shopcore`
  - Code Review mindset: self-review checklist trước khi merge PR

### Chặng 6B — AWS Cloud
> **Budget: $200 free credit** — không giới hạn Free Tier thông thường, nhưng vẫn phải cost-aware để credit dùng được đủ cả lộ trình 6B.

**Nguyên tắc chi phí:**
- Giai đoạn học lý thuyết + thử nghiệm: **ưu tiên LocalStack / AWS Free Tier** trước khi bật resource trả phí
- Chỉ bật EC2/RDS trả phí khi làm bài deploy thực tế
- Tắt resource ngay sau khi xong bài — không để chạy idle
- AI phải ước tính chi phí cho mỗi bài thực hành (ví dụ: "EC2 t3.micro chạy 4h ≈ $0.05")
- Tổng $200 đủ để hoàn thành toàn bộ Chặng 6B nếu quản lý đúng

**Nội dung bắt buộc:**

- **Module 6B-1 · AWS Core** (dùng Free Tier + LocalStack)
  - IAM: user, role, policy, least privilege, MFA
  - VPC: subnet public/private, Internet Gateway, NAT Gateway (concept, không bật trả phí khi học)
  - EC2: launch, security group, SSH, user data script
  - S3: bucket, policy, static hosting, presigned URL

- **Module 6B-2 · Database & Storage trên AWS**
  - RDS PostgreSQL: launch, parameter group, backup, Multi-AZ concept
  - S3 cho file upload: tích hợp vào `shopcore`
  - Cost: RDS db.t3.micro ~$0.017/h — tắt sau khi xong bài

- **Module 6B-3 · Deploy `shopcore` lên AWS** *(bài thực hành chính)*
  - EC2 hoặc ECS Fargate chạy Spring Boot app (Docker image từ Chặng 4)
  - RDS thay thế local PostgreSQL
  - S3 lưu file upload product
  - CloudFront CDN trước S3
  - GitHub Actions → build → push ECR → deploy EC2/ECS tự động
  - Cost estimate toàn stack: ước tính rõ ràng trước khi bật

- **Module 6B-4 · Observability & Best Practices**
  - CloudWatch logs (ship log từ Spring Boot), metric alarm cơ bản
  - CloudTrail: audit trail
  - Cost optimization: Reserved vs On-Demand, right-sizing, tắt idle resource
  - Security: Security Group rules, không để 0.0.0.0/0 trừ port cần thiết

- **Phần bỏ qua** giai đoạn này: Lambda, EKS, SQS/SNS, DynamoDB, Step Functions (học sau nếu cần)

**Phân bổ nội dung module 6B (tham khảo nội bộ — không phải 6 tháng thêm vào lộ trình):**

> ⚠️ Bảng dưới là phân bổ _bên trong_ Chặng 6B, tính sau khi học viên đã hoàn thành Chặng 5. Không cộng thêm 6 tháng vào tổng lộ trình.

| Giai đoạn trong 6B | Nội dung | Ưu tiên service |
|---|---|---|
| Giai đoạn 1 | Module 6B-1: Core + IAM + VPC + EC2 + S3 | LocalStack / Free Tier |
| Giai đoạn 2 | Module 6B-2 + 6B-3: RDS, deploy shopcore | EC2 + RDS trả phí (có credit) |
| Giai đoạn 3 | Module 6B-4: CloudWatch, CI/CD, cost opt. | CloudFront + CloudWatch |

### Chặng 7 — Phỏng vấn & Portfolio
- LeetCode: 50 bài, theo pattern (sliding window, two pointers, BFS/DFS, DP cơ bản)
- System Design Interview: URL shortener, notification system
- Behavioral: STAR method, câu hỏi phổ biến
- Portfolio: README chuyên nghiệp + C4 diagram + API docs + demo video, CV 1 trang

---

## 6 · Gợi ý tài liệu — quy tắc cho AI

**Thứ tự ưu tiên bắt buộc** (AI phải điền theo thứ tự này — không đảo):

1. **Official docs** *(bắt buộc có ít nhất 1 link)* — spring.io, docs.oracle.com, aws.amazon.com/docs, baeldung.com
2. **Sách** *(nếu topic đủ quan trọng)* — tên + tác giả, ghi rõ chương nào nếu không đọc toàn bộ
3. **Udemy** — `[Cần verify]` nếu không chắc 100% tên/tác giả/năm; chỉ ghi chắc khi có thể confirm
4. **Coursera** — tương tự Udemy, ghi `[Cần verify]` nếu không chắc
5. **YouTube** — tên kênh + tên playlist, ghi `[Cần verify]` nếu không chắc playlist còn tồn tại

> **Quy tắc anti-hallucination:** Official docs và Baeldung KHÔNG cần verify (link cố định). Udemy/Coursera/YouTube **phải** ghi `[Cần verify]` trừ khi AI chắc chắn 100%. Thà thiếu link Udemy còn hơn bịa.

**Sách bắt buộc cho Chặng 6A:**
- *Clean Code* — Robert C. Martin
- *Refactoring* — Martin Fowler (2nd edition)
- *Design Patterns* — GoF (đọc chọn lọc)
- *A Philosophy of Software Design* — John Ousterhout

---

## 7 · Triết lý học — nhúng vào toàn hệ thống

- **30% xem — 70% code.** Mỗi buổi phải có ít nhất 1 việc code thực tế.
- **Học để dùng được.** Tiêu chí là làm được deliverable, không phải cảm giác hiểu.
- **Chấm nghiêm khắc.** Điểm cao giả tạo là cách chắc chắn nhất để trượt phỏng vấn thật.
- **Một capstone duy nhất (`shopcore`).** Mở project mới là hình thức trì hoãn tinh vi nhất.
- **Không bỏ kiểm tra.** "Mình hiểu rồi" là thứ dối trá nhất khi tự học.
- **Clean Code là thói quen từ Chặng 1, không phải chặng cuối.** Chặng 6A chỉ đào sâu và refactor có chủ đích.

---

## 8 · Ví dụ module hoàn chỉnh (để AI hiểu format kỳ vọng)

```markdown
## Module 3 · Spring Data JPA
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 20h (5 buổi x 4h)
**Mục tiêu:** Viết được CRUD đầy đủ với JPA, hiểu transaction, phát hiện và fix N+1 trong shopcore

### Checklist kiến thức
- [ ] Entity, @Id, @GeneratedValue, @Column, @Table
- [ ] JpaRepository vs CrudRepository vs PagingAndSortingRepository
- [ ] Derived query methods (findByXxx, findByXxxAndYyy)
- [ ] @Query với JPQL và native SQL
- [ ] @Transactional — propagation, isolation, rollback rules
- [ ] Lazy vs Eager loading — khi nào dùng cái nào
- [ ] N+1 problem — detect bằng Hibernate SQL log, fix bằng JOIN FETCH / @EntityGraph
- [ ] Auditing — @CreatedDate, @LastModifiedDate, @EnableJpaAuditing

### Phần bỏ qua giai đoạn này
- Specification API — học sau khi nắm chắc derived queries
- Reactive JPA (R2DBC) — chỉ cần khi dùng WebFlux

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://spring.io/guides/gs/accessing-data-jpa/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/the-persistence-layer-with-spring-data-jpa | Đọc song song |
| Udemy | "Spring Boot 3, Spring 6 & Hibernate for Beginners" — Chad Darby (2023) `[Cần verify]` | Bổ sung |
| YouTube | Amigoscode — "Spring Data JPA Full Course" `[Cần verify]` | Nếu cần xem |

> ⚠️ **Lưu ý:** Bảng này là định dạng mẫu. Khi generate thật, AI phải tuân theo **thứ tự ưu tiên mục 6** (Official → Sách → Udemy → Coursera → YouTube), không copy thứ tự bảng mẫu này.

### Deliverable (phải code vào `shopcore`)
- Entity `Product` và `Category` với quan hệ @ManyToOne
- Repository: query tìm product theo category + price range
- API có pagination (Pageable) và filter theo category
- Bật Hibernate SQL log → chụp N+1 → fix bằng JOIN FETCH → chụp lại để so sánh
- Viết ≥ 5 @DataJpaTest kiểm tra repository

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85% (dùng công thức normalize)
- Tất cả @DataJpaTest đều pass
- Không còn N+1 query trong log khi gọi API product list

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M3-jpa
```

---

## 9 · Hành động AI cần thực hiện

1. **Đọc và phân tích** toàn bộ yêu cầu ở trên
2. **Tạo bảng tổng quan** ở đầu `01_LO_TRINH.md`: số module, tổng giờ, tổng tuần — kèm cảnh báo full path vs MVP path
3. **Tạo đủ tất cả file** theo 3.1, đúng schema từng file (3.2–3.7)
4. **Điền tài liệu** tuân thủ ràng buộc chống hallucination (3.10)
5. **Capstone là `shopcore`** theo contract mục 4 — không đổi
6. **Ước tính thời gian** từng module theo đơn vị (X buổi × Xh)
7. **Chặng 6A**: ≥ 4 module, có bài tập refactor code thực trong `shopcore`
8. **Chặng 6B**: AWS với $200 credit, có cost estimate từng bài thực hành, ưu tiên LocalStack/Free Tier trước khi bật resource trả phí
9. **Thống nhất bảng ngưỡng điểm** từ mục 3.9 cho toàn bộ `02`, `03`, `05`, `01`

---

*Prompt tạo ngày 11/08/2026 — phiên bản 4 (final, đã vá toàn bộ 4 vòng review).*  
*Gửi toàn bộ file này cho AI để bắt đầu tạo roadmap.*

> **Nhắc AI khi paste:** Điền số giờ/tuần cụ thể (không để X). Tài liệu: Official trước; Udemy/YouTube ghi `[Cần verify]` trừ khi chắc 100%. Sau khi generate, kiểm tra: bảng tổng quan có số tuần thật, MVP path có số tuần, và vài module có link official.
