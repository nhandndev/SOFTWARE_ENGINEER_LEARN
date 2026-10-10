# Tiến độ học — State machine & nhật ký

> Cập nhật sau mỗi buổi học và sau mỗi bài kiểm tra.  
> Capstone: **`shopcore`**.

---

## Con trỏ hiện tại

- Module đang học: `M2-2` · PostgreSQL thực chiến
- Buổi trong tuần: 1 / 5
- Ngày bắt đầu module: 2026-10-05
- Giờ học tuần này: 0h / 20h

---

## Bảng trạng thái module (tham chiếu)

| Trạng thái | Ký hiệu | Điều kiện vào | Bước tiếp theo |
|---|---|---|---|
| Chưa bắt đầu | 🔵 | Mặc định | Bắt đầu học → 🟡 |
| Đang học | 🟡 | Bắt đầu module | Hoàn thành → làm đề `DAY_DU` |
| Tạm hoãn | ⏸️ | Người học chủ động dời module | Quay lại học và làm bài trước khi đánh dấu đạt |
| Đạt | 🟢 | Điểm ≥ 85 | Mở module kế tiếp |
| Cần ôn | 🟠 | Điểm 55–84 | Ôn chủ đề yếu → `NHANH` (70–84) hoặc `THI_LAI` (55–69) |
| Học lại | 🔴 | Điểm < 55 | Học lại cả module, bớt video tăng code |

**Quy tắc chuyển state:** `🔵 → 🟡` · `🟡 → 🟢/🟠/🔴` · `🟠 → 🟢` (sau `NHANH`/`THI_LAI` ≥ 85) · `🔴 → 🟡`.  
**Không có đường tắt** `🔵 → 🟢`.

**Ngoại lệ theo quyết định của người học (2026-09-28):** M1-6 được tạm hoãn để học M2-1 trước. Đây không phải trạng thái đạt; checklist và deliverable Testing vẫn còn nguyên.

### Ngưỡng điểm

| Điểm (thang 100) | Trạng thái | Hành động |
|---|---|---|
| ≥ 85 | 🟢 Đạt | Sang module kế tiếp |
| 55–84 | 🟠 Cần ôn | Ôn chủ đề yếu → đề `NHANH` (70–84) hoặc `THI_LAI` (55–69) |
| < 55 | 🔴 Học lại | Học lại cả module, đổi cách (bớt video, tăng code) |

---

## Trạng thái từng module

“Đã có đề + lesson” chỉ xác nhận tài liệu đã được soạn, không có nghĩa đã học hoặc đạt module. Nếu mới có một phần, ghi rõ lesson tương ứng.

| Module | Trạng thái | Điểm gần nhất | Ngày kiểm tra | Tài liệu |
|---|---|---|---|---|
| M0-1 · Java hiện đại | 🟢 Đạt | 86 | 2026-08-19 | Đã có đề + lesson |
| M0-2 · OOP SOLID | 🟢 Đạt | 88 | 2026-08-20 | Đã có đề + lesson |
| M0-3 · DSA I | 🟢 Đạt | 95 | 2026-08-22 | Đã có đề + lesson |
| M0-4 · DSA II Tree/Graph | 🟢 Đạt | 97 | 2026-08-23 | Đã có đề + lesson |
| M0-5 · Git & Maven | 🟢 Đạt | 97 | 2026-08-25 | Đã có đề + lesson |
| M1-1 · IoC / DI | 🟢 Đạt | 95 | 2026-08-26 | Đã có đề + lesson |
| M1-2 · MVC & REST | 🟢 Đạt | 92 | 2026-09-07 | Đã có đề + lesson |
| M1-3 · Spring Data JPA | 🟢 Đạt | 91 | 2026-09-15 | Đã có đề + lesson |
| M1-4 · Validation & Error | 🟢 Đạt | 95 | 2026-09-17 | Đã có đề + lesson |
| M1-5 · Config & Profiles | 🟢 Đạt | 88 | 2026-09-24 | Đã có đề + lesson |
| M1-6 · Testing | ⏸️ Tạm hoãn | 44 (tạm, câu 1–3) | 2026-09-28 | Đã có đề + lesson (Lesson 01) |
| M2-1 · SQL & Index | 🟢 Đạt (phạm vi học rút gọn) | 87,5 (Lesson 05; cả 5 lesson ≥ 85) | 2026-10-05 | Đã có đề + lesson |
| M2-2 · PostgreSQL | 🟡 Đang học (4 lesson đạt) | 96,25 (Lesson 04) | 2026-10-10 | Đã có đề + lesson |
| M2-3 · Flyway | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M2-4 · N+1 & HikariCP | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M3-1 · REST best practices | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M3-2 · Security Core | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M3-3 · JWT | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M3-4 · OAuth2 / OIDC | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M3-5 · OpenAPI & Client | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M4-1 · Docker | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M4-2 · GitHub Actions CI | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M4-3 · TDD & Coverage | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |(=))))
| M4-4 · Logging & Hexagonal | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M5-1 · Redis | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M5-2 · Kafka | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M5-3 · Microservices | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M5-4 · Actuator | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M5-5 · System Design | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M6A-1 · Clean Code | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M6A-2 · Patterns C&S | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M6A-3 · Patterns Behavioral | 🔵 Chưa bắt đầu | — | — | — |
| M6A-4 · DDD & Hexagonal | 🔵 Chưa bắt đầu | — | — | — |
| M6B-1 · AWS Core | 🔵 Chưa bắt đầu | — | — | — |
| M6B-2 · RDS & S3 | 🔵 Chưa bắt đầu | — | — | — |
| M6B-3 · Deploy AWS | 🔵 Chưa bắt đầu | — | — | — |
| M6B-4 · AWS Ops | 🔵 Chưa bắt đầu | — | — | — |
| M7-1 · LeetCode | 🔵 Chưa bắt đầu | — | — | — |
| M7-2 · SD Interview | 🔵 Chưa bắt đầu | — | — | — |
| M7-3 · Behavioral STAR | 🔵 Chưa bắt đầu | — | — | Đã có đề + lesson |
| M7-4 · Portfolio & CV | 🔵 Chưa bắt đầu | — | — | — |

---

## Lịch sử bài kiểm tra

| Ngày | Module | Chế độ | Điểm | Kết quả | Ghi chú |
|---|---|---|---|---|---|
| 2026-09-24 | M1-5 (Lesson 4) | LESSON | 88 | 🟢 Đạt | Đã nắm secret/env var/default nguy hiểm, `.env.example`, deliverable config, `@ConfigurationPropertiesScan`, service inject properties và cách test dev/prod/fail fast |
| 2026-09-24 | M1-5 (Lesson 3) | LESSON | 89 | 🟢 Đạt | Đã nắm ConfigurationProperties, scan, validation config, nested @Valid; còn cần cẩn thận YAML list/map key và indentation |
| 2026-09-21 | M1-5 (Lesson 2) | LESSON | 91 | 🟢 Đạt | Đã vá tốt cách kích hoạt profile, phân biệt file profile với @Profile, và rủi ro local/test vô tình chạy prod |
| 2026-09-20 | M1-5 (Lesson 1) | LESSON | 99 | 🟢 Đạt | Đã sửa tốt YAML syntax và code @Value; nắm externalized config, placeholder default, secret và lý do dùng ConfigurationProperties |
| 2026-09-17 | M1-4 (Lesson 4) | DAY_DU | 95 | 🟢 Đạt | Nắm vững ProblemDetail RFC 7807, lý do dùng chuẩn quốc tế & trace luồng lỗi DTO |
| 2026-09-16 | M1-4 (Lesson 3) | DAY_DU | 98 | 🟢 Đạt | Nắm vững Custom Validator @ValidSku, Exception Bubble, RestControllerAdvice & Trace request |

---

## Nhật ký học (mới nhất lên đầu)

- 2026-10-10 · M2-2 Lesson 04 · Chấm lại bản đã lưu đủ 8 câu: 38,5/40 = 96,25/100, đạt lesson. Câu 6 đã đủ race MAX+1; câu 8 đã sửa rollback sau commit và tái sử dụng dung lượng, còn thiếu rủi ro khóa/chi phí FULL trong bản hiện tại; câu 4 thiếu kiểm soát sort động. Snapshot chữa bài kèm giải thích phần còn thiếu, giữ lịch sử; không chốt deliverable/toàn module.
- 2026-10-10 · M2-2 Lesson 04 · Chấm lại đủ 8 câu theo ngữ cảnh: 37/40 = 92,5/100, đạt lesson. Nhận ý JPA starter bổ sung ở câu 1 cho câu 2; đã sửa binding/sort câu 4, đếm ID câu 6 và rủi ro khóa FULL câu 8. Còn củng cố whitelist sort, race MAX+1 và không ROLLBACK transaction đã commit. Cập nhật snapshot/tick checklist khái niệm; cả 4 lesson đạt, chưa xác nhận deliverable hoặc chốt module.
- 2026-10-10 · M2-2 Lesson 04 · Chấm đủ 8 câu: 29,5/40 = 73,75/100, cần ôn lesson. Đúng câu 1/3/5/7; thiếu Data JPA starter câu 2, nhầm JPA binding/ORDER BY câu 4, thiếu race max+1 và cách đếm câu 6, nhầm rollback sau commit và rủi ro VACUUM FULL câu 8. Cập nhật snapshot chữa từng câu; Lesson 01–03 vẫn đạt, chưa chốt module/tick thêm checklist.
- 2026-10-10 · M2-2 Lesson 04 · Chấm lại riêng câu 1: 5/5 = 100% trên câu được chấm. Đã sửa đủ pgJDBC/host localhost, bổ sung driver/connection và phân biệt lỗi kết nối với database không tồn tại. Cập nhật snapshot, giữ lịch sử lỗi; chưa chấm các câu khác hoặc kết luận lesson/module đạt.
- 2026-10-10 · M2-2 Lesson 04 · Chỉ chấm câu 1 theo yêu cầu: 2/5 = 40% trên câu đã chấm. Đúng port/database/user-password; cần sửa JDBC/pgJDBC, host localhost, bổ sung dependency driver/cách lấy connection và phân biệt connection refused với database không tồn tại. Đã lưu snapshot; chưa chấm các câu khác, chưa kết luận lesson/module hoặc tick checklist mới.
- 2026-10-09 · M2-2 Lesson 03 · Chấm đủ 8 câu theo ngữ cảnh: 39/40 = 97,5/100, đạt lesson. Hiểu commit/rollback, visibility, proxy, checked exception, catch/rollback-only và side effect; cần phân biệt aborted với rollback hoàn tất, và giải thích transaction riêng bằng ranh giới commit thay vì isolation. Đã lưu snapshot kèm gỡ nhầm dirty checking/flush/commit, tick checklist transaction; toàn module vẫn đang học.
- 2026-10-09 · M2-2 Lesson 02 · Chấm lại bản mới đủ 8 câu: 40/40 = 100/100 theo rubric. Đã sửa CASCADE thành một lựa chọn và làm rõ SET FK/WHERE ở câu 7; cập nhật snapshot, giữ lịch sử lỗi trước. Lesson 01–02 đạt; toàn module vẫn đang học, chưa xác nhận thực hành DB/deliverable.
- 2026-10-09 · M2-2 Lesson 02 · Chấm lại đủ 8 câu: 39/40 = 97,5/100, đạt lesson. Đã bổ sung count, luồng Service/handler, sửa FK và giải thích race SELECT–DELETE; còn cần tránh khẳng định bắt buộc CASCADE và làm rõ WHERE/SET category_id ở câu 7. Đã cập nhật snapshot và tick thao tác ghi an toàn/kiểm count; toàn module vẫn đang học.
- 2026-10-09 · M2-2 Lesson 02 · Chấm tạm câu 1–7: 29,5/35 = 84,3% phần đã làm; INSERT/default/DO NOTHING đúng, cần bổ sung count câu 3, bước Service câu 4, sửa DELETE Category bị FK chặn câu 5 và phân biệt WHERE/SET FK câu 7. Câu 8 còn trống; đã lưu snapshot, chưa kết luận lesson/module đạt hoặc tick checklist mới.
- 2026-10-05 · M2-2 Lesson 01 · Chấm lại đủ 8 câu: 39/40 = 97,5/100, đạt lesson. Đã bổ sung PK cấm NULL, race condition và SQL câu 8; còn cần nói rõ CHECK nhận NULL khi thiếu NOT NULL. Cập nhật snapshot và tick kiểu dữ liệu/constraint; toàn module vẫn đang học.
- 2026-10-05 · M2-2 Lesson 01 · Chấm đủ 8 câu: 31/40 = 77,5/100, cần ôn. Vững kiểu dữ liệu, FK và default; cần phân biệt CHECK/NOT NULL, bổ sung race condition câu 7 và ba định nghĩa cột câu 8. Đã lưu snapshot; chưa tick checklist hoặc kết luận toàn module đạt.
- 2026-10-05 · M2-2 · Bắt đầu PostgreSQL thực chiến theo 4 lesson; đã tạo Lesson 01 kiểu dữ liệu & constraint và đề kiểm tra riêng. Theo cách học hiện tại, không giao capstone; chưa chấm nên chưa có điểm hoặc tick checklist.
- 2026-10-05 · M2-1 · Theo quyết định của người học, chốt 🟢 Đạt trong phạm vi 5 lesson (95, 90, 85, 88,5, 87,5); bỏ qua đề tổng kết module và deliverable `shopcore`. Không ghi nhận đã hoàn thành thực hành index/EXPLAIN trên dữ liệu thật.
- 2026-10-05 · M2-1 Lesson 05 · Chấm đủ 8 câu: 35/40 = 87,5/100, đạt lesson. Câu 7 nắm đúng EXPLAIN/ANALYZE nhưng thiếu BUFFERS; câu 8 cần dữ liệu đại diện, điều kiện trước-sau giống nhau và cân chi phí index. Snapshot đã cập nhật; M2-1 vẫn đang học, chưa chốt deliverable/module.
- 2026-10-04 · M2-1 Lesson 05 · Chấm lại câu 1–6: 28/30 = 93,3/100 tạm tính; đã sửa đúng câu 2 (index A là ứng viên), câu 4 (3.900 ms và giới hạn kết luận), bổ sung MVCC câu 3 và EXPLAIN ANALYZE câu 6. Câu 7–8 còn trống; snapshot đã cập nhật, M2-1 vẫn đang học.
- 2026-10-04 · M2-1 Lesson 05 · Chấm tạm câu 1–6: 24/30 = 80/100 trên phần đã làm; hiểu chọn index/selectivity và Seq Scan, cần ôn Index Only Scan/MVCC, đọc đúng 3.900 ms và chi phí index. Câu 7–8 chưa làm; đã lưu snapshot, M2-1 vẫn đang học.
- 2026-10-04 · M2-1 Lesson 04 · Chấm cả 8 câu: 35,4/40 = 88,5/100, đạt lesson. Vững WHERE/HAVING, JOIN nhân dòng và window; cần ôn SUM/MIN có Product category_id NULL, GROUP BY nhóm NULL và COUNT(p.id)=0 sau LEFT JOIN. Đã lưu snapshot; M2-1 vẫn đang học.
- 2026-10-03 · M2-1 Lesson 03 · Chấm cả 7 câu: 34/40 = 85/100, đạt lesson. Vững DISTINCT/IN/BETWEEN/CTE; cần sửa alias `p` ở câu 4, nói EXISTS theo từng Category và liệt kê output câu 5-6. Đã lưu snapshot; M2-1 vẫn đang học.
- 2026-10-01 · M2-1 Lesson 02 · Chấm câu 6: 4/7; JOIN và cột đúng, thiếu giải thích alias và số dòng. Tổng Lesson 02: 36/40 = 90/100, đạt lesson; M2-1 vẫn đang học. Snapshot đã cập nhật.
- 2026-10-01 · M2-1 Lesson 02 · Chấm riêng câu 7: 5/5, đếm đúng 5 dòng sau JOIN và hiểu COUNT(*) đếm dòng kết quả; tổng tạm 32/33 = 97,0% trên 6 câu đã chấm. Câu 6 đang làm, chưa kết luận lesson/module; snapshot đã cập nhật.
- 2026-10-01 · M2-1 Lesson 02 · Chấm thử cập nhật: 30/33 = 90,9% phần đã xem; câu 4 đã sửa đúng ON/WHERE, câu 7 liệt kê đúng 5 dòng nhưng chưa hiểu COUNT(*), câu 6 mới là bản nháp nên chưa chấm. Đã cập nhật snapshot; M2-1 vẫn đang học.
- 2026-10-01 · M2-1 Lesson 02 · Chấm thử câu 1-3 và 5: 20/21 = 95,2% phần đã làm; câu 4 mới ghi ý ban đầu và đang đảo chiều ON/WHERE nên chưa tính điểm, câu 5 query đúng nhưng cần giải thích NULL chuẩn hơn; câu 6-7 chưa làm. Có snapshot nhận xét; M2-1 vẫn đang học.
- 2026-09-29 · M2-1 Lesson 01 · Chấm lại: 38/40 = 95/100, 🟢 đạt lesson; đã sửa output và PK/FK. Hoàn lại điểm từng trừ sai cho `FROM Products` (PostgreSQL gộp tên không quote về chữ thường). Còn `SELECT category` không có trong bảng; M2-1 vẫn đang học.
- 2026-09-29 · M2-1 Lesson 01 · Chấm lại cả 7 câu: 33/40 = 83/100, 🟠 cần ôn lesson; đã sửa tốt WHERE, OR/AND, OFFSET; còn sai tên cột `category_id` ở câu 4 và thiếu giải thích đầy đủ ở câu 7. M2-1 vẫn đang học.
- 2026-09-29 · M2-1 Lesson 01 · Chấm tạm câu 1–6: 16/35 (46% phần đã làm); hiểu ý nghĩa từ khóa SQL, cần viết đúng ngưỡng/cột, kể dòng kết quả cụ thể và sửa OFFSET trang 2; câu 7 chưa chấm, module đang học.
- 2026-09-28 · M2-1 · Sắp xếp lại bài học theo phản hồi người học: Lesson 01 là SQL cơ bản trên một bảng; chuyển JOIN và đề cũ sang Lesson 02 để học theo thứ tự dễ hiểu.
- 2026-09-28 · Theo quyết định người học, tạm hoãn M1-6 Testing (chưa đạt) và bắt đầu M2-1 SQL & Index; tạo Lesson 01 JOIN cùng bài kiểm tra. Quay lại M1-6 sau.
- 2026-09-28 · M1-6 Lesson 01 · Chấm tạm câu 1–3: 7/16 (44% phần đã làm); nắm mục đích test, cần ôn unit/integration và sắp đúng Arrange–Act–Assert; câu 4–7 chưa chấm, module vẫn đang học.
- 2026-09-24 · M1-5 · Chốt module Config & Profiles: 88/100 → 🟢 Đạt phần học; code deliverable thực tế được defer sang module/project tổng hợp sau theo quyết định học hiện tại.
- 2026-09-24 · M1-6 · Bắt đầu Testing & Clean Code tối thiểu; tạo Lesson 01 JUnit 5, test mindset, Arrange-Act-Assert và clean test naming.
- 2026-09-24 · M1-5 · Chấm lại Lesson 04 Secrets/env vars/mini project: 88/100 → 🟢 Đạt lesson; đã bổ sung tốt deliverable config, `@ConfigurationPropertiesScan`, service inject `ShopcoreProperties`, command chạy dev/prod và test fail-fast khi thiếu env var bắt buộc.
- 2026-09-24 · M1-5 · Chấm lại Lesson 03 `@ConfigurationProperties`: 89/100 → 🟢 Đạt lesson; đã nắm typed config, `@ConfigurationPropertiesScan`, validation config fail lúc app start, nested `@Valid`; còn cần cẩn thận YAML list/map key và indentation.
- 2026-09-21 · M1-5 · Chấm lại Lesson 02 Profiles dev/test/prod: 91/100 → 🟢 Đạt lesson; nắm merge config, cách kích hoạt profile bằng IDE/arg/env var, phân biệt file profile với `@Profile`, và rủi ro local/test vô tình chạy `prod`. Tiếp tục Lesson 03.
- 2026-09-20 · M1-5 · Chấm lại Lesson 01 Externalized Config/YAML/@Value: 99/100 → 🟢 Đạt lesson; đã sửa đúng YAML parent key có `:`, code `@Value` trong `@Service`, hiểu secret/env var và lý do dùng `@ConfigurationProperties`. Tiếp tục Lesson 02 Profiles.
- 2026-09-17 · M1-4 · Chấm bài Lesson 04 ProblemDetail RFC 7807: 95/100 → 🟢 Đạt; hiểu rõ bản chất chuẩn RFC 7807, lý do microservices dùng ProblemDetail thay cho ApiErrorResponse tự chế, trace luồng DispatcherServlet/HandlerAdapter rất mượt. Hoàn thành Module M1-4.
- 2026-09-16 · M1-4 · Chấm bài Lesson 03 Custom Validator & Global Exception Handler: 98/100 → 🟢 Đạt; nắm rất vững luồng Tomcat/DispatcherServlet/HandlerAdapter, Single Responsibility Principle của Validator, RestControllerAdvice và putIfAbsent; chỉ lỗi nhỏ thiếu check null trước isBlank() trong ValidSkuValidator.
- 2026-09-15 · M1-3 · Chấm final project Spring Data JPA: 91/100 → 🟢 Đạt; Category/Product CRUD, Entity relationship LAZY, JpaRepository, derived query/JPQL, paging/filter, transaction, DTO, auditing và API thực tế đều hoạt động; còn thiếu automated test và chưa chứng minh N+1 bằng test đếm query.
- 2026-09-07 · M1-2 · Thi lại/pass module MVC REST lần 4: 92/100 → 🟢 Đạt phần lý thuyết/luồng; đã nắm FilterChain, DispatcherServlet, HandlerMapping/Adapter, DTO, AppException, status code và paging, còn nhầm nhỏ `price < 0` nên là 400 thay vì 409.
- 2026-08-26 · M1-1 · Kiểm tra nhanh ôn lỗi lifecycle/scope/bean lần 2: 95/100 → 🟢 Đạt; đã vá tốt `@PostConstruct`, `@PreDestroy`, `InitializingBean`, `@Component` vs `@Bean`, prototype-in-singleton với `ObjectProvider`, `@Primary` và `@Qualifier`.
- 2026-08-26 · M1-1 · Đề DAY_DU IoC/DI, Bean & ApplicationContext lần 1: 69/100 → 🟠 Cần ôn; nắm IoC/DI, constructor injection, bean cơ bản và code skeleton tốt, còn yếu bean lifecycle (`@PostConstruct`/`@PreDestroy`/`InitializingBean`), prototype-in-singleton và phân biệt stereotype/`@Bean`.
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
