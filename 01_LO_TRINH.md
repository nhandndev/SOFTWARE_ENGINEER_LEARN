# Lộ trình Software Engineer — Java Ecosystem

> Capstone duy nhất: **`shopcore`**. Không đổi tên. Không mở project mới.
> Cơ sở tính: 5 buổi/tuần × 3–4h = 15–20h/tuần (quy đổi **17.5h/tuần**).

## Tổng quan lộ trình

| Chặng | Tên | Số module | Tổng giờ | Số tuần (15–20h/tuần) |
|---|---|---|---|---|
| 0 | Nền tảng Java | 5 | 68h | 4 tuần |
| 1 | Spring Boot thực chất | 6 | 86h | 5 tuần |
| 2 | Database & Persistence | 4 | 52h | 3 tuần |
| 3 | API & Security | 5 | 74h | 4 tuần |
| 4 | DevOps & Engineering | 4 | 58h | 3.5 tuần |
| 5 | Scalability | 5 | 64h | 3.5 tuần |
| 6A | Clean Code & Patterns | 4 | 72h | 4 tuần |
| 6B | AWS Cloud | 4 | 60h | 3.5 tuần |
| 7 | Phỏng vấn & Portfolio | 4 | 56h | 3 tuần |
| **TỔNG (full path)** | — | **41** | **~590h** | **~34 tuần** |

> **Cảnh báo phạm vi:** Full path (~34 tuần): đầy đủ từ nền tảng đến AWS. Nếu mục tiêu intern/fresher sớm hơn, dùng MVP path.

> **MVP path** (tối thiểu để apply fresher Java backend):  
> Chặng 0 → 1 → 2 → 3 → 4 → Chặng 7, bỏ Chặng 5 / 6A / 6B.  
> MVP vẫn ~23 tuần — không phải con đường ngắn, chỉ là bỏ phần nâng cao. JWT, Docker, test vẫn cần.

### Ngưỡng điểm (nguồn sự thật duy nhất)

| Điểm (thang 100) | Trạng thái | Hành động |
|---|---|---|
| ≥ 85 | 🟢 Đạt | Sang module kế tiếp |
| 55–84 | 🟠 Cần ôn | Ôn chủ đề yếu → đề `NHANH` (70–84) hoặc `THI_LAI` (55–69) |
| < 55 | 🔴 Học lại | Học lại cả module, đổi cách (bớt video, tăng code) |

**Không tự tick `[x]`** — chỉ AI chấm bài được tick, sau khi điểm ≥ 85%.  
**Không mở module mới khi module trước chưa đạt 🟢.**

---

# Chặng 0 — Nền tảng Java (68h / 4 tuần)

## Module 0-1 · Java hiện đại: Generics, Lambda, Stream, Optional
**Trạng thái:** 🟢 Đạt
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Viết được utility type-safe với Generics, Stream và Optional; áp dụng ngay vào package `common` của shopcore.

### Checklist kiến thức
- [x] Generics: type parameter, bounded type, wildcards (`? extends` / `? super`)
- [x] Functional Interface, Lambda, method reference
- [x] Stream API: map/filter/reduce, collectors, flatMap
- [x] Optional: of/ofNullable, map/flatMap, orElse/orElseGet — tránh anti-pattern
- [x] Records và sealed classes (Java 17+) ở mức nhận diện và dùng khi hợp lý

### Phần bỏ qua giai đoạn này
- Reactive Streams / Project Reactor — học khi sang WebFlux (không thuộc lộ trình hiện tại)

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/stream/package-summary.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/java-8-streams-introduction | Đọc song song |
| YouTube | Amigoscode — Java Streams playlist `[Cần verify]` | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Package `common` với `Result<T>`, `PageResponse<T>` và utils viết bằng Stream/Optional, có unit test

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M0-1-java-modern

---

## Module 0-2 · OOP nâng cao, SOLID & nhận diện Design Pattern
**Trạng thái:** 🟢 Đạt
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** Thiết kế domain model shopcore tuân SOLID; nhận diện Singleton, Factory, Builder, Strategy, Observer.

### Checklist kiến thức
- [x] Encapsulation, composition over inheritance
- [x] SOLID: SRP, OCP, LSP, ISP, DIP — ví dụ vi phạm và sửa
- [x] Nhận diện: Singleton, Factory, Builder, Strategy, Observer
- [x] Khi nào không dùng pattern (over-engineering)

### Phần bỏ qua giai đoạn này
- Áp sâu toàn bộ GoF vào code — đào sâu ở Chặng 6A

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.oracle.com/javase/tutorial/java/concepts/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/solid-principles | Đọc song song |
| Sách | Clean Code — Robert C. Martin (ch. Objects and Data Structures, Classes) | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Domain model draft (Product, Category, Order) tuân SOLID + 1 Builder cho Product

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M0-2-oop-solid

---

## Module 0-3 · DSA I: Big-O, Array/LinkedList/Stack/Queue, Binary Search, Sort
**Trạng thái:** 🟢 Đạt
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Phân tích Big-O và giải ≥ 15 bài cấu trúc dữ liệu cơ bản kèm JUnit.

### Checklist kiến thức
- [x] Big-O: time/space, best/average/worst
- [x] Array vs LinkedList — trade-off
- [x] Stack, Queue, Deque — ứng dụng
- [x] Binary Search (iterative + recursive)
- [x] Sort phổ biến: merge, quick, heap — khi nào dùng

### Phần bỏ qua giai đoạn này
- Dynamic Programming nâng cao — để Chặng 7 (LeetCode pattern)

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/package-summary.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/java-algorithm-complexity | Đọc song song |
| YouTube | freeCodeCamp — Data Structures Easy to Advanced `[Cần verify]` | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Package `algo` chứa ≥ 15 lời giải kèm JUnit test

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M0-3-dsa-basic

---

## Module 0-4 · DSA II: Tree, Graph, BFS/DFS
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** Triển khai BFS/DFS trên tree/graph; ghi Big-O từng bài trong README.

### Checklist kiến thức
- [ ] Binary Tree, BST — thao tác cơ bản
- [ ] Graph: adjacency list/matrix
- [ ] BFS và DFS — iterative vs recursive
- [ ] Shortest path khái niệm (BFS trên unweighted)
- [ ] Cycle detection cơ bản

### Phần bỏ qua giai đoạn này
- Dijkstra / A* / Union-Find nâng cao — học khi System Design / interview sâu

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Deque.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/java-graphs | Đọc song song |
| YouTube | WilliamFiset — Graph Theory playlist `[Cần verify]` | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Thêm ≥ 10 bài tree/graph có test, README ghi Big-O từng bài

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M0-4-dsa-tree-graph

---

## Module 0-5 · Git & Maven — khởi tạo `shopcore`
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** Tạo repo `shopcore` chuẩn Maven; thao thạo branch/PR/conflict.

### Checklist kiến thức
- [ ] Git: branch, merge, rebase, stash, cherry-pick (nhận diện)
- [ ] Pull Request workflow + resolve conflict
- [ ] Maven lifecycle: validate → compile → test → package → install → deploy
- [ ] `pom.xml`: dependencies, plugins, profiles
- [ ] `.gitignore` cho Java/Maven/IDE

### Phần bỏ qua giai đoạn này
- Git submodule / monorepo tooling — không cần cho shopcore đơn repo

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://git-scm.com/doc | ⭐ Đọc trước |
| Official | https://maven.apache.org/guides/getting-started/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/git-merge-vs-rebase | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Repo GitHub `shopcore`: cấu trúc Maven, `.gitignore`, README skeleton, 1 PR đã merge có conflict resolve

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M0-5-git-maven

---

# Chặng 1 — Spring Boot thực chất (86h / 5 tuần)

## Module 1-1 · IoC / DI, Bean & ApplicationContext
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 14h (4 buổi x 3.5h)
**Mục tiêu:** Giải thích và cấu hình được Bean lifecycle trong shopcore; chứng minh bằng log.

### Checklist kiến thức
- [ ] IoC vs DI — constructor / setter / field injection (ưu tiên constructor)
- [ ] `ApplicationContext`, `@Configuration`, `@Bean`, `@Component`
- [ ] Bean scope: singleton, prototype, request, session
- [ ] Lifecycle: `@PostConstruct`, `@PreDestroy`, `InitializingBean`
- [ ] Circular dependency — nhận biết và tránh

### Phần bỏ qua giai đoạn này
- Spring AOP sâu (pointcut phức tạp) — chỉ cần biết khái niệm; đào sau nếu cần

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-framework/reference/core/beans.html | ⭐ Đọc trước |
| Official | https://spring.io/guides/gs/spring-boot/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Cấu hình Bean cho shopcore: `@Configuration`, scope, log chứng minh lifecycle

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M1-1-ioc-di

---

## Module 1-2 · Spring MVC 3-layer & REST API
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Xây CRUD Product + Category đủ 3 lớp với status code và pagination chuẩn.

### Checklist kiến thức
- [ ] Controller → Service → Repository (3-layer)
- [ ] `@RestController`, `@RequestMapping`, path/query params
- [ ] HTTP methods & status codes (200/201/204/400/404/409)
- [ ] DTO vs Entity — mapping thủ công hoặc MapStruct (tùy chọn)
- [ ] Pagination cơ bản với `Pageable` / `Page`

### Phần bỏ qua giai đoạn này
- GraphQL / gRPC — ngoài scope REST của shopcore

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://spring.io/guides/gs/rest-service/ | ⭐ Đọc trước |
| Official | https://docs.spring.io/spring-framework/reference/web/webmvc.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-controller-vs-restcontroller | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- REST CRUD Product + Category đủ 3 lớp, status code chuẩn, pagination

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M1-2-mvc-rest

---

## Module 1-3 · Spring Data JPA
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 20h (5 buổi x 4h)
**Mục tiêu:** Viết CRUD JPA đầy đủ, hiểu transaction, phát hiện N+1 trong shopcore (fix sâu ở Chặng 2).

### Checklist kiến thức
- [ ] Entity, `@Id`, `@GeneratedValue`, `@Column`, `@Table`
- [ ] `JpaRepository` vs `CrudRepository` vs `PagingAndSortingRepository`
- [ ] Derived query methods (`findByXxx`, `findByXxxAndYyy`)
- [ ] `@Query` với JPQL và native SQL
- [ ] `@Transactional` — propagation, isolation, rollback rules
- [ ] Lazy vs Eager loading — khi nào dùng cái nào
- [ ] N+1 problem — detect bằng Hibernate SQL log (nhận diện; fix sâu ở 2-4)
- [ ] Auditing — `@CreatedDate`, `@LastModifiedDate`, `@EnableJpaAuditing`

### Phần bỏ qua giai đoạn này
- Specification API — học sau khi nắm chắc derived queries
- Reactive JPA (R2DBC) — chỉ cần khi dùng WebFlux

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://spring.io/guides/gs/accessing-data-jpa/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/the-persistence-layer-with-spring-data-jpa | Đọc song song |
| Udemy | "Spring Boot 3, Spring 6 & Hibernate for Beginners" — Chad Darby `[Cần verify]` | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Entity Product/Category `@ManyToOne`, derived query + JPQL, Pageable, chụp log N+1

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M1-3-jpa

---

## Module 1-4 · Bean Validation & Exception Handling
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** Validate DTO bằng `@Valid` + custom validator SKU; trả lỗi thống nhất qua ProblemDetail.

### Checklist kiến thức
- [ ] Jakarta Validation: `@NotNull`, `@Size`, `@Email`, `@Min`/`@Max`, `@Pattern`
- [ ] `@Valid` / `@Validated` trên controller
- [ ] Custom `ConstraintValidator` (ví dụ SKU)
- [ ] `@ControllerAdvice` + `@ExceptionHandler`
- [ ] `ProblemDetail` (RFC 7807) — format lỗi thống nhất

### Phần bỏ qua giai đoạn này
- Cross-field validation phức tạp với nhiều bean — đủ 1 custom validator đơn giản

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-config/validation.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-boot-bean-validation | Đọc song song |
| Baeldung | https://www.baeldung.com/problem-details-with-spring-boot | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- DTO `@Valid` + custom ConstraintValidator (SKU) + `@ControllerAdvice` trả ProblemDetail

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M1-4-validation-error

---

## Module 1-5 · Config, Profiles & `@ConfigurationProperties`
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 8h (2 buổi x 4h)
**Mục tiêu:** Tách config theo profile và bind typed properties cho shopcore.

### Checklist kiến thức
- [ ] `application.yml` vs `application.properties`
- [ ] Profiles: `dev`, `test`, `prod` — kích hoạt thế nào
- [ ] `@ConfigurationProperties` — typed config, validation
- [ ] Externalized config: env vars, default values
- [ ] Không commit secret vào repo

### Phần bỏ qua giai đoạn này
- Spring Cloud Config Server — quá sớm; dùng env/yml local là đủ

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-boot/reference/features/external-config.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/configuration-properties-in-spring-boot | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- `application.yml` tách profile dev/test + lớp `ShopcoreProperties` typed

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M1-5-config-profiles

---

## Module 1-6 · Testing & Clean Code tối thiểu
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Viết ≥ 15 test tầng khác nhau; áp naming + method ≤ 20 dòng từ buổi đầu.

### Checklist kiến thức
- [ ] JUnit 5: `@Test`, assertions, nested, parameterized
- [ ] Mockito: mock, verify, argumentCaptor
- [ ] `@WebMvcTest`, `@DataJpaTest`, `@SpringBootTest` — khi nào dùng cái nào
- [ ] Test naming rõ ràng (Given-When-Then / should_…)
- [ ] Clean Code tối thiểu: naming, method ≤ 20 dòng, không comment thừa

### Phần bỏ qua giai đoạn này
- TDD đầy đủ + coverage gate — đào sâu ở Module 4-3
- Refactor smell toàn codebase — Chặng 6A

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-boot/reference/testing/index.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-boot-testing | Đọc song song |
| YouTube | Amigoscode — Spring Boot Testing `[Cần verify]` | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- ≥ 15 test (`@WebMvcTest`, `@DataJpaTest`, Mockito) + áp checklist naming / method ≤ 20 dòng

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M1-6-testing

---

# Chặng 2 — Database & Persistence (52h / 3 tuần)

## Module 2-1 · SQL nâng cao & Index chiến lược
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Viết query báo cáo có JOIN/subquery và chứng minh index bằng EXPLAIN ANALYZE.

### Checklist kiến thức
- [ ] JOIN: inner/left/right, multi-table
- [ ] Subquery vs CTE (WITH)
- [ ] Aggregate, GROUP BY, HAVING, window functions cơ bản
- [ ] Index: B-tree, composite, covering — khi nào hại
- [ ] `EXPLAIN ANALYZE` — đọc plan trước/sau index

### Phần bỏ qua giai đoạn này
- Partitioning / sharding DB — thuộc System Design nâng cao

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://www.postgresql.org/docs/current/using-explain.html | ⭐ Đọc trước |
| Official | https://www.postgresql.org/docs/current/indexes.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/sql-join | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Bộ query báo cáo (JOIN/subquery) + index cho product/order, kèm EXPLAIN ANALYZE trước–sau

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M2-1-sql-index

---

## Module 2-2 · PostgreSQL thực chiến
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** Chuyển shopcore sang PostgreSQL với constraint và kiểu dữ liệu chuẩn.

### Checklist kiến thức
- [ ] Kiểu dữ liệu: `UUID`, `NUMERIC`, `TIMESTAMPTZ`, `JSONB` (nhận diện)
- [ ] Constraint: PK, FK, UNIQUE, CHECK, NOT NULL
- [ ] Sequence / identity columns
- [ ] VACUUM / autovacuum — khái niệm vận hành
- [ ] Connection URL và driver JDBC cho Postgres

### Phần bỏ qua giai đoạn này
- Logical replication / PG extension nâng cao — không cần cho shopcore MVP

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://www.postgresql.org/docs/current/datatype.html | ⭐ Đọc trước |
| Official | https://www.postgresql.org/docs/current/ddl-constraints.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-boot-postgresql-setup | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Chuyển shopcore sang PostgreSQL: kiểu dữ liệu chuẩn, constraint FK/unique/check, ghi chú VACUUM

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M2-2-postgres

---

## Module 2-3 · Flyway Migration
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 8h (2 buổi x 4h)
**Mục tiêu:** Quản lý toàn bộ schema bằng Flyway; seed data; migrate chạy được trong CI.

### Checklist kiến thức
- [ ] Versioned migration `V1__description.sql` naming
- [ ] Repeatable migrations `R__` — khi nào dùng
- [ ] Flyway với Spring Boot autoconfig
- [ ] Seed data an toàn cho môi trường test/dev
- [ ] Rollback strategy (forward-only vs repair) — khái niệm

### Phần bỏ qua giai đoạn này
- Liquibase — đã chọn Flyway; không học song song

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://documentation.red-gate.com/flyway | ⭐ Đọc trước |
| Official | https://docs.spring.io/spring-boot/reference/howto/data-initialization.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/database-migrations-with-flyway | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Toàn bộ schema quản lý bằng Flyway `V1__…`, có seed data, CI chạy migrate

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M2-3-flyway

---

## Module 2-4 · Performance: N+1 sâu & HikariCP
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Fix N+1 bằng JOIN FETCH / `@EntityGraph` / batch; tune HikariCP và báo cáo benchmark.

### Checklist kiến thức
- [ ] N+1: phát hiện bằng SQL log / statistics
- [ ] Fix: JOIN FETCH, `@EntityGraph`, `@BatchSize`, open-in-view tắt
- [ ] HikariCP: `maximumPoolSize`, timeout, leakDetection
- [ ] Đo latency trước–sau (số query + thời gian)
- [ ] Transaction boundary ảnh hưởng performance

### Phần bỏ qua giai đoạn này
- Second-level cache Hibernate nâng cao — Redis cache ở Chặng 5

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://github.com/brettwooldridge/HikariCP#configuration-knobs-baby | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/hibernate-n-plus-one-problem-solutions-spring-data-jpa | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/hikaricp | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Fix N+1 bằng JOIN FETCH / `@EntityGraph` / batch size + tuning HikariCP, báo cáo benchmark

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M2-4-perf-jpa

---

# Chặng 3 — API & Security (74h / 4 tuần)

## Module 3-1 · REST API best practices
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** Chuẩn hoá versioning, pagination và error format toàn bộ API shopcore.

### Checklist kiến thức
- [ ] URL versioning `/api/v1`
- [ ] Pagination/filter/sort convention thống nhất
- [ ] Idempotency cho PUT/DELETE (khái niệm)
- [ ] Error response format thống nhất (ProblemDetail)
- [ ] HATEOAS — nhận diện; không bắt buộc triển khai đầy đủ

### Phần bỏ qua giai đoạn này
- API Gateway / BFF pattern — thuộc microservices sau này

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/rest-api-versioning-best-practices | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Versioning `/api/v1`, pagination chuẩn hoá, error response format thống nhất toàn API

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M3-1-rest-bp

---

## Module 3-2 · Spring Security 6 Core
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Cấu hình `SecurityFilterChain`, User/Role, password encoder; auth chạy end-to-end.

### Checklist kiến thức
- [ ] `SecurityFilterChain` (không dùng `WebSecurityConfigurerAdapter` cũ)
- [ ] Authentication vs Authorization
- [ ] `UserDetailsService`, password encoder (BCrypt)
- [ ] Entity User / Role trong shopcore
- [ ] CSRF, CORS — khi nào bật/tắt với API stateless

### Phần bỏ qua giai đoạn này
- Method security sâu + ACL — JWT + `@PreAuthorize` ở module kế

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-security/reference/servlet/authentication/index.html | ⭐ Đọc trước |
| Official | https://spring.io/guides/gs/securing-web/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-security-authentication-with-a-database | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- `SecurityFilterChain`, entity User/Role, password encoder, auth chạy được end-to-end

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M3-2-security-core

---

## Module 3-3 · JWT & Phân quyền
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 20h (5 buổi x 4h)
**Mục tiêu:** Implement register/login/refresh JWT stateless + phân quyền USER/ADMIN có test.

### Checklist kiến thức
- [ ] JWT structure: header, payload, signature
- [ ] Access token + refresh token flow
- [ ] Stateless session — không lưu server session
- [ ] `@PreAuthorize` / roles USER, ADMIN
- [ ] Test security: `@WithMockUser`, mockMvc với token

### Phần bỏ qua giai đoạn này
- Opaque token + introspection server — JWT đủ cho shopcore

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-security-jwt | ⭐ Đọc trước |
| YouTube | Amigoscode — Spring Security JWT `[Cần verify]` | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- register/login/refresh JWT stateless + `@PreAuthorize` USER/ADMIN + test security

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M3-3-jwt

---

## Module 3-4 · OAuth2 / OIDC & Google Login
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** Tích hợp Google login một lần và map sang user nội bộ shopcore.

### Checklist kiến thức
- [ ] OAuth2 roles: resource owner, client, authorization server, resource server
- [ ] OIDC vs OAuth2 — ID token
- [ ] Spring Security OAuth2 Login flow
- [ ] Map Google account → User nội bộ
- [ ] Bảo mật client secret / redirect URI

### Phần bỏ qua giai đoạn này
- Tự host Authorization Server (Spring Authorization Server đầy đủ) — dùng Google là đủ

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-security/reference/servlet/oauth2/login/index.html | ⭐ Đọc trước |
| Official | https://spring.io/guides/tutorials/spring-boot-oauth2/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-security-openid-connect | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Google login tích hợp 1 lần, map sang user nội bộ của shopcore

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M3-4-oauth2

---

## Module 3-5 · External API Client & OpenAPI 3
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 14h (4 buổi x 3.5h)
**Mục tiêu:** Gọi 1 external API có error handling; expose Swagger UI + export `openapi.json`.

### Checklist kiến thức
- [ ] WebClient hoặc OpenFeign — chọn 1 và giải thích
- [ ] Timeout, retry, error mapping
- [ ] springdoc-openapi / OpenAPI 3 annotations
- [ ] Swagger UI + export `openapi.json`
- [ ] Document security scheme (Bearer JWT)

### Phần bỏ qua giai đoạn này
- Contract-first codegen phức tạp — annotation-first đủ cho shopcore

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-framework/reference/web/webflux-webclient.html | ⭐ Đọc trước |
| Official | https://springdoc.org/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-rest-openapi-documentation | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- WebClient/OpenFeign gọi 1 external API có error handling + Swagger UI + export `openapi.json`

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M3-5-openapi-client

---

# Chặng 4 — DevOps & Engineering (58h / 3.5 tuần)

## Module 4-1 · Docker & docker-compose
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Chạy shopcore + PostgreSQL + Redis bằng một lệnh docker-compose.

### Checklist kiến thức
- [ ] Dockerfile multi-stage cho Spring Boot
- [ ] Image layer caching, `.dockerignore`
- [ ] docker-compose: services, volumes, networks, healthcheck
- [ ] Env vars / secrets trong compose (không hardcode)
- [ ] Port mapping và dependency `depends_on`

### Phần bỏ qua giai đoạn này
- Kubernetes / Helm — ngoài scope Chặng 4; EKS bỏ qua ở 6B

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.docker.com/build/building/multi-stage/ | ⭐ Đọc trước |
| Official | https://docs.docker.com/compose/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/ops/docker-compose | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Dockerfile multi-stage + docker-compose (app + PostgreSQL + Redis) chạy bằng 1 lệnh

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M4-1-docker

---

## Module 4-2 · GitHub Actions CI
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** Pipeline build → test → push image; badge CI trên README.

### Checklist kiến thức
- [ ] Workflow YAML: `on`, `jobs`, `steps`
- [ ] Cache Maven dependencies
- [ ] Chạy test trên PR
- [ ] Build & push Docker image (GHCR hoặc Docker Hub)
- [ ] Status badge trong README

### Phần bỏ qua giai đoạn này
- CD deploy lên AWS — làm ở Module 6B-3

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.github.com/en/actions | ⭐ Đọc trước |
| Official | https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-java-with-maven | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-github-actions | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Pipeline build → test → push image, badge trạng thái trong README

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M4-2-ci

---

## Module 4-3 · TDD & Test Coverage
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Viết 1 feature theo TDD; JaCoCo ≥ 70% và CI fail nếu dưới ngưỡng.

### Checklist kiến thức
- [ ] Red → Green → Refactor
- [ ] Chọn unit vs slice vs integration test đúng tầng
- [ ] JaCoCo plugin + threshold
- [ ] CI fail khi coverage < 70%
- [ ] Không chase coverage bằng test vô nghĩa

### Phần bỏ qua giai đoạn này
- Mutation testing (PIT) — optional sau khi coverage ổn

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-boot/reference/testing/index.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/jacoco | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/tdd | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- 1 feature viết theo TDD + JaCoCo coverage ≥ 70%, CI fail nếu dưới ngưỡng

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M4-3-tdd-coverage

---

## Module 4-4 · Logging & Hexagonal Skeleton
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 14h (4 buổi x 3.5h)
**Mục tiêu:** Structured JSON log + MDC requestId; tách package domain/application/infrastructure.

### Checklist kiến thức
- [ ] Slf4j + Logback; log levels
- [ ] MDC: `requestId` / correlation id
- [ ] Structured JSON logging
- [ ] Hexagonal skeleton: `domain` / `application` / `infrastructure`
- [ ] Ports & Adapters ở mức package — chưa cần C4 đầy đủ

### Phần bỏ qua giai đoạn này
- C4 Context + Container đầy đủ — đào sâu ở Module 6A-4
- Distributed tracing (OpenTelemetry) — nhận diện thôi

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-boot/reference/features/logging.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/mdc-in-log4j-2-logback | Đọc song song |
| Baeldung | https://www.baeldung.com/hexagonal-architecture-ddd-spring | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Structured JSON log + MDC requestId; tách package `domain / application / infrastructure`

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M4-4-logging-hexagonal

---

# Chặng 5 — Scalability (64h / 3.5 tuần)

## Module 5-1 · Redis & Caching
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Cache-aside product list với TTL + invalidation; đo latency trước–sau.

### Checklist kiến thức
- [ ] Redis data types cơ bản (string, hash)
- [ ] Spring Cache abstraction + Redis
- [ ] Cache-aside pattern
- [ ] TTL và invalidation khi update product
- [ ] Đo latency trước–sau

### Phần bỏ qua giai đoạn này
- Redis Cluster / Redis Streams — chưa cần cho shopcore đơn node

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://redis.io/docs/latest/ | ⭐ Đọc trước |
| Official | https://docs.spring.io/spring-data/redis/reference/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-cache-tutorial | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Cache-aside cho product list, TTL + invalidation khi update, đo latency trước–sau

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M5-1-redis

---

## Module 5-2 · Kafka Event-Driven
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 20h (5 buổi x 4h)
**Mục tiêu:** Publish `order-placed`, consume notification với at-least-once + idempotency.

### Checklist kiến thức
- [ ] Topic, partition, consumer group
- [ ] Producer / Consumer với Spring Kafka
- [ ] At-least-once delivery và idempotent consumer
- [ ] Serialization JSON cho event
- [ ] Error handling / DLQ khái niệm

### Phần bỏ qua giai đoạn này
- Kafka Streams / Exactly-once transaction đầy đủ — quá sâu cho giai đoạn này

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://kafka.apache.org/documentation/ | ⭐ Đọc trước |
| Official | https://docs.spring.io/spring-kafka/reference/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-kafka | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Publish event `order-placed`, consumer xử lý notification, at-least-once + idempotency

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M5-2-kafka

---

## Module 5-3 · Microservices — khái niệm & ranh giới
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 8h (2 buổi x 4h)
**Mục tiêu:** Viết ADR giải thích vì sao shopcore giữ monolith và điều kiện tách service.

### Checklist kiến thức
- [ ] Monolith vs microservices — trade-off
- [ ] Bounded context (khái niệm)
- [ ] Khi nào tách service (team, scale, failure isolation)
- [ ] Chi phí vận hành microservices
- [ ] ADR (Architecture Decision Record) format

### Phần bỏ qua giai đoạn này
- Service mesh, saga orchestration thực thi — chỉ cần khái niệm

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://microservices.io/patterns/monolithic.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/cs/microservices-intro | Đọc song song |
| Official | https://docs.aws.amazon.com/whitepapers/latest/microservices-on-aws/microservices-on-aws.html | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- ADR trong `docs/`: vì sao shopcore giữ monolith, điều kiện nào thì tách service

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M5-3-microservices

---

## Module 5-4 · Spring Actuator & Metrics
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 8h (2 buổi x 4h)
**Mục tiêu:** Bật health/metrics/info + 1 custom health indicator + 1 custom metric.

### Checklist kiến thức
- [ ] Actuator endpoints: health, metrics, info
- [ ] Expose an toàn (không public hết production)
- [ ] Custom `HealthIndicator`
- [ ] Custom metric (Micrometer counter/timer)
- [ ] Liên hệ với logging/MDC từ Chặng 4

### Phần bỏ qua giai đoạn này
- Full Prometheus + Grafana stack production — đủ Actuator endpoint

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.spring.io/spring-boot/reference/actuator/index.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-boot-actuators | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Actuator health/metrics/info + 1 custom health indicator + 1 custom metric

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M5-4-actuator

---

## Module 5-5 · System Design cơ bản
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** Vẽ sơ đồ scale shopcore (LB, CDN, read replica) và ghi bottleneck vào docs.

### Checklist kiến thức
- [ ] Horizontal vs vertical scaling
- [ ] Load balancer, CDN
- [ ] DB read replica
- [ ] Caching layers (client / CDN / app / DB)
- [ ] Nhận diện bottleneck của shopcore hiện tại

### Phần bỏ qua giai đoạn này
- Design interview đầy đủ 2 bài — làm ở Module 7-2

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://aws.amazon.com/architecture/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/cs/system-design-intro | Đọc song song |
| YouTube | ByteByteGo — System Design fundamentals `[Cần verify]` | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Sơ đồ scale shopcore (LB, CDN, read replica) + ghi chú bottleneck vào `docs/`

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M5-5-system-design

---

# Chặng 6A — Clean Code & Patterns (72h / 4 tuần)

## Module 6A-1 · Clean Code & Refactoring thực chiến
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 20h (5 buổi x 4h)
**Mục tiêu:** Refactor ≥ 5 code smell thật trong shopcore; test xanh trước–sau; ghi refactor log.

### Checklist kiến thức
- [ ] Naming, function size, comment đúng chỗ, self-documenting code
- [ ] Code smells: Long Method, God Class, Feature Envy, Data Clump, Primitive Obsession
- [ ] Red → Green → Refactor an toàn
- [ ] Extract method/class, rename, replace conditional với polymorphism
- [ ] Refactor log: trước/sau + lý do

### Phần bỏ qua giai đoạn này
- Big Bang rewrite toàn bộ — chỉ refactor có chủ đích từng smell

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://refactoring.guru/refactoring | ⭐ Đọc trước |
| Sách | Clean Code — Robert C. Martin (ch. Meaningful Names, Functions, Comments) | ⭐ Đọc trước |
| Sách | Refactoring — Martin Fowler, 2nd ed. (ch. 1–4 + catalog chọn lọc) | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/java-clean-code | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Refactor ≥ 5 code smell có thật trong shopcore, test xanh trước–sau, ghi refactor log

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M6A-1-clean-code

---

## Module 6A-2 · Design Patterns — Creational & Structural
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Áp Builder + Factory + 1 Structural vào shopcore và giải thích lý do chọn.

### Checklist kiến thức
- [ ] Creational: Factory Method, Abstract Factory, Builder, Prototype, Singleton (+ anti-pattern)
- [ ] Structural: Adapter, Decorator, Facade, Proxy, Composite
- [ ] Nhận diện pattern đã có trong shopcore
- [ ] Refactor 1 chỗ dùng pattern mới có chủ đích
- [ ] Tránh pattern thừa

### Phần bỏ qua giai đoạn này
- Đọc toàn bộ GoF end-to-end — chỉ đọc chọn lọc pattern đang dùng

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://refactoring.guru/design-patterns | ⭐ Đọc trước |
| Sách | Design Patterns — GoF (Factory, Builder, Adapter, Decorator — chọn lọc) | ⭐ Đọc trước |
| Sách | A Philosophy of Software Design — John Ousterhout (ch. 1–5) | Bổ sung |
| Baeldung | https://www.baeldung.com/creational-design-patterns | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Áp Builder + Factory + 1 Structural (Adapter/Decorator) vào shopcore, giải thích lý do chọn

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M6A-2-patterns-cs

---

## Module 6A-3 · Design Patterns — Behavioral
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Áp ≥ 2 behavioral pattern vào shopcore; ghi anti-pattern đã tránh.

### Checklist kiến thức
- [ ] Strategy, Observer, Command
- [ ] Chain of Responsibility, Template Method, State (nhận diện)
- [ ] Khi nào dùng / không dùng
- [ ] Anti-pattern: God Observer, Strategy explosion
- [ ] Giải thích lý do chọn pattern trong PR/docs

### Phần bỏ qua giai đoạn này
- Interpreter / Memento / Visitor — ít dùng trong shopcore backend

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://refactoring.guru/design-patterns/behavioral-patterns | ⭐ Đọc trước |
| Sách | Design Patterns — GoF (Strategy, Observer, Command — chọn lọc) | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/behavioral-design-patterns | Đọc song song |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Áp ≥ 2 behavioral (Strategy tính giá/ship, Observer hoặc Command) + ghi anti-pattern đã tránh

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M6A-3-patterns-behavioral

---

## Module 6A-4 · DDD Lite, Hexagonal & C4
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 20h (5 buổi x 4h)
**Mục tiêu:** Hoàn thiện Ports & Adapters; Aggregate Order + Money; C4 Context + Container; self-review checklist.

### Checklist kiến thức
- [ ] Entity, Value Object, Aggregate, Repository, Domain Service (DDD lite)
- [ ] Hexagonal: Ports & Adapters — hoàn thiện từ skeleton Chặng 4
- [ ] Aggregate Order + Value Object Money
- [ ] C4: Context + Container cho shopcore
- [ ] Self-review checklist trước khi merge PR

### Phần bỏ qua giai đoạn này
- Event Sourcing / CQRS đầy đủ — ngoài scope DDD lite

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://c4model.com/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/hexagonal-architecture-ddd-spring | ⭐ Đọc trước |
| Sách | A Philosophy of Software Design — John Ousterhout (ch. Deep Modules) | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Hoàn thiện Ports & Adapters, Aggregate Order + Value Object Money, C4 Context + Container, self-review checklist

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M6A-4-ddd-hexagonal

---

# Chặng 6B — AWS Cloud (60h / 3.5 tuần)

> **Budget:** $200 free credit. Ưu tiên LocalStack / Free Tier trước khi bật resource trả phí. Tắt resource ngay sau bài lab. Tổng ước tính cả chặng nếu quản lý đúng: **~$80–150** (nằm trong $200).

## Module 6B-1 · AWS Core: IAM, VPC, EC2, S3
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 16h (4 buổi x 4h)
**Mục tiêu:** Tạo IAM least-privilege + S3 bucket asset; thực hành LocalStack/Free Tier trước.

### Checklist kiến thức
- [ ] IAM: user, role, policy, least privilege, MFA
- [ ] VPC: subnet public/private, IGW, NAT (concept — không bật NAT trả phí khi học)
- [ ] EC2: launch, security group, SSH, user data
- [ ] S3: bucket, policy, static hosting, presigned URL
- [ ] LocalStack workflow cho lab an toàn

### Phần bỏ qua giai đoạn này
- NAT Gateway trả phí chạy idle — chỉ học concept, không để bật lâu

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html | ⭐ Đọc trước |
| Official | https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html | ⭐ Đọc trước |
| Official | https://docs.localstack.cloud/overview/ | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- IAM user/role least-privilege + S3 bucket cho asset shopcore (LocalStack trước, Free Tier sau)

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project
- **Cost estimate:** LocalStack ≈ $0; Free Tier S3/IAM ≈ $0–2; nếu thử EC2 t3.micro 4h ≈ **$0.04–0.05**. Mục tiêu module **≤ $5**.

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M6B-1-aws-core

---

## Module 6B-2 · RDS & S3 Storage
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** Kết nối shopcore tới RDS PostgreSQL; upload ảnh product qua S3 presigned URL.

### Checklist kiến thức
- [ ] RDS PostgreSQL: launch, parameter group, backup
- [ ] Multi-AZ — concept (không bắt buộc bật để tiết kiệm)
- [ ] Security Group: app → RDS port 5432 only
- [ ] Upload ảnh product qua presigned URL
- [ ] Tắt RDS ngay sau lab

### Phần bỏ qua giai đoạn này
- Aurora / Read replica trả phí — concept ở System Design là đủ

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.html | ⭐ Đọc trước |
| Official | https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/aws-s3-multipart-upload | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- shopcore kết nối RDS PostgreSQL + upload ảnh product lên S3 qua presigned URL

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project
- **Cost estimate:** RDS db.t3.micro ≈ **$0.017/h** → lab 8–12h ≈ **$0.14–0.20** compute + storage nhỏ ≈ **$3–8** nếu quên tắt vài ngày. Mục tiêu module **≤ $15** (tắt ngay sau bài).

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M6B-2-rds-s3

---

## Module 6B-3 · Deploy `shopcore` lên AWS
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 20h (5 buổi x 4h)
**Mục tiêu:** Deploy stack ECR → EC2/ECS Fargate + RDS + S3 + CloudFront; CI deploy tự động.

### Checklist kiến thức
- [ ] Push image lên ECR
- [ ] Chạy app trên EC2 hoặc ECS Fargate
- [ ] RDS thay local Postgres; S3 lưu upload
- [ ] CloudFront trước S3
- [ ] GitHub Actions → build → ECR → deploy

### Phần bỏ qua giai đoạn này
- Multi-region / blue-green phức tạp — 1 region deploy ổn định là đủ

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html | ⭐ Đọc trước |
| Official | https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started.html | ⭐ Đọc trước |
| Official | https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html | ⭐ Đọc trước |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- ECR → EC2/ECS Fargate + RDS + S3 + CloudFront, GitHub Actions deploy tự động

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project
- **Cost estimate (toàn stack lab ~1 tuần bật có kiểm soát):** EC2 t3.micro hoặc Fargate nhỏ ≈ **$5–15**; RDS ≈ **$5–12**; S3+ECR+CloudFront ≈ **$2–8**; data transfer nhỏ. **Ước tính module: $40–80**. Ghi rõ trước khi bật; tắt khi không demo.

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M6B-3-deploy-aws

---

## Module 6B-4 · Observability, Cost & Security
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** CloudWatch log + alarm, CloudTrail, siết Security Group, bảng cost thực tế đã tiêu.

### Checklist kiến thức
- [ ] CloudWatch logs từ Spring Boot + metric alarm cơ bản
- [ ] CloudTrail audit
- [ ] Cost: On-Demand vs Reserved concept, right-sizing, tắt idle
- [ ] Security Group: không `0.0.0.0/0` trừ port cần thiết
- [ ] Bảng cost thực tế đã tiêu trong Chặng 6B

### Phần bỏ qua giai đoạn này
- Lambda, EKS, SQS/SNS, DynamoDB, Step Functions

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html | ⭐ Đọc trước |
| Official | https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html | ⭐ Đọc trước |
| Official | https://docs.aws.amazon.com/cost-management/latest/userguide/what-is-costmanagement.html | ⭐ Đọc trước |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- CloudWatch log + alarm, bật CloudTrail, siết Security Group, bảng cost thực tế đã tiêu

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project
- **Cost estimate:** CloudWatch + CloudTrail lab ≈ **$2–10**; không để log retention / alarm thừa. **Tổng ước tính cả Chặng 6B: ~$80–150 (≤ $200 credit).**

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M6B-4-aws-ops

---

# Chặng 7 — Phỏng vấn & Portfolio (56h / 3 tuần)

## Module 7-1 · LeetCode theo pattern (50 bài)
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 24h (6 buổi x 4h)
**Mục tiêu:** Hoàn thành 50 bài theo pattern kèm test và ghi Big-O.

### Checklist kiến thức
- [ ] Sliding window, two pointers
- [ ] Hash map / set patterns
- [ ] BFS/DFS trên tree/graph
- [ ] DP cơ bản (1D/2D đơn giản)
- [ ] Ghi pattern + Big-O từng bài

### Phần bỏ qua giai đoạn này
- Contest rating grind / hard-only grind — ưu tiên 50 bài đúng pattern

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://leetcode.com/explore/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/java-algorithm-complexity | Đọc song song |
| YouTube | NeetCode — Blind 75 / patterns `[Cần verify]` | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- Package `interview/leetcode`: 50 lời giải có test, ghi pattern + Big-O từng bài

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M7-1-leetcode

---

## Module 7-2 · System Design Interview
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** Viết 2 design doc (URL shortener, notification system) trong `docs/` shopcore.

### Checklist kiến thức
- [ ] Clarify requirements & constraints
- [ ] API design, data model
- [ ] High-level components (LB, cache, DB, queue)
- [ ] Bottleneck & scaling path
- [ ] Trade-off narration (như phỏng vấn thật)

### Phần bỏ qua giai đoạn này
- Design distributed DB nội bộ từ đầu — dùng building blocks đã học

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://aws.amazon.com/architecture/icons/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/cs/system-design-intro | Đọc song song |
| YouTube | ByteByteGo — URL shortener / notification `[Cần verify]` | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- 2 design doc (URL shortener, notification system) trong `docs/` của shopcore

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M7-2-sd-interview

---

## Module 7-3 · Behavioral & STAR
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 8h (2 buổi x 4h)
**Mục tiêu:** Chuẩn bị 10 câu chuyện STAR; ≥ 3 lấy từ quá trình làm shopcore.

### Checklist kiến thức
- [ ] STAR: Situation, Task, Action, Result
- [ ] Câu hỏi phổ biến: conflict, failure, leadership, ownership
- [ ] Quantify result khi được
- [ ] Liên hệ trải nghiệm shopcore thật
- [ ] Luyện nói ngắn 1–2 phút/câu chuyện

### Phần bỏ qua giai đoạn này
- Script thuộc lòng từng chữ — ưu tiên khung STAR linh hoạt

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://www.amazon.jobs/content/en/how-we-hire/interviewing | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/spring-boot-interview-questions (behavioral mindset — đọc chọn) | Bổ sung |
| YouTube | Harvard Career Services — behavioral interview `[Cần verify]` | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- 10 câu chuyện STAR viết sẵn, ≥ 3 lấy từ chính quá trình làm shopcore (lưu `docs/behavioral-star.md`)

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M7-3-behavioral

---

## Module 7-4 · Portfolio & CV
**Trạng thái:** 🔵 Chưa bắt đầu
**Thời gian ước tính:** 12h (4 buổi x 3h)
**Mục tiêu:** README chuyên nghiệp + demo ≤ 5 phút + CV 1 trang sẵn sàng apply.

### Checklist kiến thức
- [ ] README: problem, architecture (C4), API docs link, screenshot
- [ ] Demo video ≤ 5 phút
- [ ] CV 1 trang — impact bullets từ shopcore
- [ ] Link GitHub / LinkedIn / live demo (nếu còn)
- [ ] Checklist tự review trước apply

### Phần bỏ qua giai đoạn này
- Personal brand / blog series dài — không chặn việc apply

### Tài liệu / Khoá học
| Nguồn | Tên cụ thể | Ưu tiên |
|---|---|---|
| Official | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes | ⭐ Đọc trước |
| Official | https://c4model.com/ | ⭐ Đọc trước |
| Baeldung | https://www.baeldung.com/github-best-practices | Bổ sung |

### Deliverable (phải code vào `shopcore`, không phải đọc xong)
- README chuyên nghiệp (C4 + link API docs + screenshot), demo video ≤ 5 phút, CV 1 trang

### Tiêu chí xong
- Điểm kiểm tra module ≥ 85%
- Deliverable đã được merge vào capstone project

### Liên kết kiểm tra
→ Dùng `02_PROMPT_TAO_DE.md`, topic = M7-4-portfolio
