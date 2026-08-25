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
| M0-1 · Java hiện đại | 🟢 Đạt | 86 | 2026-08-19 |
| M0-2 · OOP SOLID | 🟢 Đạt | 88 | 2026-08-20 |
| M0-3 · DSA I | 🟢 Đạt | 95 | 2026-08-22 |
| M0-4 · DSA II Tree/Graph | 🟢 Đạt | 97 | 2026-08-23 |
| M0-5 · Git & Maven | 🟢 Đạt | 97 | 2026-08-25 |
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

- 2026-08-25 · M0-5 · Chấm lại thi lại lỗi còn hở Git & Maven lần 2: 97/100 → 🟢 Đạt; đã vá tốt PR workflow, stash workflow, package/install, JUnit/Surefire, pom.xml và xử lý conflict, chỉ còn nên thuộc chính xác tên plugin Maven và lệnh `git rm -r --cached target`.
- 2026-08-25 · M0-5 · Chấm lại đề DAY_DU Git & Maven lần 1 sau sửa câu 11 và 12: 88/100 → 🟢 Đạt; đã nắm workflow stash, Git/Maven nền tảng, Maven lifecycle, pom.xml và cấu trúc Maven tối thiểu, còn nên nhớ kỹ lệnh `git rm --cached` khi đã lỡ track file rác.
- 2026-08-25 · M0-5 · Đề DAY_DU Git & Maven lần 1: 83/100 → 🟠 Cần ôn; nắm Git/Maven nền tảng, branch, lifecycle và pom.xml tốt, còn thiếu bước xử lý thực tế ở stash, xóa file rác khỏi Git tracking, PR workflow và conflict.
- 2026-08-23 · M0-4 · Thi lại Graph/BFS/DFS/shortest path/cycle lần 3: 97/100 → 🟢 Đạt; đã nắm shortest path BFS trên unweighted graph, DFS recursive trace, cycle detection bằng parent và Big-O graph.
- 2026-08-23 · M0-4 · Kiểm tra nhanh Graph/BFS/DFS/shortest path/cycle lần 2: 76/100 → 🟠 Cần ôn; yếu ở điều kiện shortest path bằng BFS, cycle detection bằng parent và thứ tự DFS recursive.
- 2026-08-23 · M0-4 · Kiểm tra nhanh Tree cơ bản buổi 1: 98/100 → 🟢 Đạt phần Binary Tree/BST/traversal/max depth; cần học tiếp Graph, BFS/DFS, shortest path và cycle detection trước khi chốt cả module.
- 2026-08-22 · M0-3 · Chấm lại DSA I lần 1 sau khi bổ sung câu 5, 6, 7 và 9: 95/100 → 🟢 Đạt; còn thiếu cách dùng `ArrayDeque` ở câu ngoặc và Big-O của code Binary Search.
- 2026-08-22 · M0-3 · Kiểm tra nhanh DSA I lần 1: 77/100 → 🟠 Cần ôn; nắm Big-O cơ bản, ArrayList/LinkedList, Stack/Queue và code Binary Search, còn thiếu điều kiện/độ phức tạp Binary Search, phân tích space và so sánh Merge/Quick/Heap Sort.
- 2026-08-20 · M0-2 · Chấm lại OOP SOLID & Patterns lần 1 sau khi lưu bản Lombok `@Builder`: 88/100 → 🟢 Đạt; còn lỗi validate trong constructor Lombok nhưng đủ ngưỡng OOP/SOLID/pattern.
- 2026-08-20 · M0-2 · Chấm lại OOP SOLID & Patterns lần 1 có xét ý tưởng Lombok `@Builder`: 84/100 → 🟠 Cần ôn; gần đạt, cần viết rõ bản `@Builder` hoặc Builder có `builder()`/`build()`.
- 2026-08-20 · M0-2 · Kiểm tra nhanh OOP SOLID & Patterns lần 1: 79/100 → 🟠 Cần ôn; lý thuyết/nhận diện tốt, yếu ở code Builder (`builder()`, `build()`, validate null).
- 2026-08-19 · M0-1 · Chấm lại đề DAY_DU Java hiện đại lần 3 sau sửa bài: 86/100 → 🟢 Đạt; còn lỗi nhỏ ở `Result<T>` constructor/private và `fail(message)`, nhưng đủ ngưỡng kiến thức.
- 2026-08-19 · M0-1 · Đề DAY_DU Java hiện đại lần 3: 83/100 → 🟠 Cần ôn; lý thuyết tốt, Stream/Records ổn, còn yếu Optional chain và `Result<T>` đúng contract.
- 2026-08-19 · M0-1 · Thi lại Optional, Records và sealed classes lần 2: 53/100 → 🔴 Học lại; cần viết lại code Optional chain `map/orElse`, `orElseGet` thay vì chỉ nói ý tưởng.
- 2026-08-19 · M0-1 · Kiểm tra nhanh Optional, Records và sealed classes: 74/100 → 🟠 Cần ôn; records/sealed ổn, cần ôn Optional chain `map/orElse`, `orElseGet`, tránh `.get()`.
- 2026-08-18 · M0-1 · Chấm lại thi lại ngắn lần 3 sau sửa câu 7/9: 91/100 → đạt phần Generics & Lambda; tiếp tục M0-1 với Stream, Optional và deliverable `Result<T>`/`PageResponse<T>`.
- 2026-08-18 · M0-1 · Chấm lại thi lại ngắn lần 3 bản mới nhất: 70/100 → 🟠 Cần ôn; PECS đã ổn hơn, còn thiếu method reference và `Result<T>` đúng contract/compile.
- 2026-08-18 · M0-1 · Chấm lại thi lại ngắn lần 3 sau sửa câu 9: 68/100 → 🟠 Cần ôn; `Result<T>` đã có khung nhưng sai contract constructor, method `ok/fail`, field `data`.
- 2026-08-18 · M0-1 · Thi lại ngắn Generics & Lambda lần 3: 59/100 → 🟠 Cần ôn; đã nắm PECS tốt hơn, còn thiếu method reference đầy đủ và code `Result<T>`.
- 2026-08-18 · M0-1 · Thi lại Generics & Lambda lần 2: 49/100 → 🔴 Học lại; có tiến bộ nhưng vẫn yếu invariant generic, đọc từ `? super` và code `Result<T>` đúng contract.
- 2026-08-18 · M0-1 · Kiểm tra nhanh Generics & Lambda lần 1: 38/100 → 🔴 Học lại; yếu ở `? super`, method reference và code `Result<T>`.
- (chưa có buổi học — bắt đầu từ `M0-1`)
