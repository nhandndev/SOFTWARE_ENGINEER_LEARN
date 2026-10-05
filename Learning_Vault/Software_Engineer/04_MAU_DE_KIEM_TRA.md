# Mẫu đề kiểm tra — format & độ khó chuẩn

> File này là **mẫu tham chiếu**. Khi tạo đề thật, AI ghi vào `de-kiem-tra/` theo `02_PROMPT_TAO_DE.md`.

---

# Đề A · `DAY_DU` — topic `M1-3-jpa`

**Tiêu đề:** Kiểm tra Module 1-3 · Spring Data JPA  
**Chế độ:** `DAY_DU` · Tổng điểm thô tối đa: **90đ**  
**Hướng dẫn:** Trả lời ngay dưới mỗi câu tại dòng `**Trả lời:**`. Không tra tài liệu. Thời gian gợi ý: 90–120 phút.

---

## Phần I — Lý thuyết (10 câu × 3đ = 30đ)

**Câu 1.** `@Entity` khác gì một POJO thường? Annotation nào bắt buộc để JPA nhận diện primary key?

**Trả lời:**

**Câu 2.** Phân biệt `CrudRepository`, `PagingAndSortingRepository`, và `JpaRepository` — khi nào chọn `JpaRepository`?

**Trả lời:**

**Câu 3.** Derived query `findByCategoryIdAndPriceLessThan` được Spring Data dịch thành điều kiện SQL/JPQL thế nào?

**Trả lời:**

**Câu 4.** Khi nào dùng `@Query(JPQL)` thay vì derived method? Cho 1 ví dụ JPQL hợp lệ trên entity `Product`.

**Trả lời:**

**Câu 5.** `@Transactional` đặt trên Service khác gì đặt trên Repository? Rollback mặc định xảy ra với exception loại nào?

**Trả lời:**

**Câu 6.** Lazy vs Eager: mặc định của `@ManyToOne` và `@OneToMany` là gì? Vì sao Eager trên collection thường nguy hiểm?

**Trả lời:**

**Câu 7.** N+1 problem là gì? Làm sao phát hiện bằng Hibernate SQL log?

**Trả lời:**

**Câu 8.** `@GeneratedValue(strategy = …)` — nêu 2 strategy phổ biến với PostgreSQL và khi nào cân nhắc `UUID`.

**Trả lời:**

**Câu 9.** `@CreatedDate` / `@LastModifiedDate` cần bật gì để hoạt động? Entity cần thêm gì?

**Trả lời:**

**Câu 10.** `Pageable` và `Page<T>` giải quyết bài toán gì? Hai thông tin metadata quan trọng trên `Page`?

**Trả lời:**

---

## Phần II — Tình huống (8 câu × 5đ = 40đ)

**Câu 11.** API `GET /products` trả về list product kèm tên category. Log hiện 1 SELECT products + N SELECT category. Nguyên nhân và hướng fix tạm ở mức JPA (chưa cần tối ưu sâu Chặng 2)?

**Trả lời:**

**Câu 12.** Method `findByName(String name)` trả về `Product` nhưng DB có 2 row trùng name. Điều gì xảy ra? Thiết kế lại signature thế nào cho an toàn?

**Trả lời:**

**Câu 13.** Transaction Service A gọi Service B (cùng app). A có `@Transactional`, B không. B ném unchecked exception — transaction có rollback không? Vì sao?

**Trả lời:**

**Câu 14.** Bạn dùng `product.getCategory().getName()` ngoài transaction (controller sau khi service return). Có thể gặp lỗi gì với Lazy? Cách thiết kế đúng tầng?

**Trả lời:**

**Câu 15.** Cần filter product theo `categoryId` + khoảng giá + pagination. Viết chữ ký repository method (derived hoặc `@Query`) phù hợp cho shopcore.

**Trả lời:**

**Câu 16.** Flyway chưa học (Chặng 2) — hiện dùng `ddl-auto=update`. Rủi ro gì khi sang môi trường team/CI? Bạn sẽ ghi chú gì trong README tạm thời?

**Trả lời:**

**Câu 17.** Product và Category quan hệ `@ManyToOne`. Ai giữ FK? Mapping annotation tối thiểu trên Product?

**Trả lời:**

**Câu 18.** Test `@DataJpaTest` chậm vì load full context? `@DataJpaTest` thực sự load gì, và khi nào phải chuyển sang `@SpringBootTest`?

**Trả lời:**

---

## Phần III — Code mini (2 câu × 10đ = 20đ)

**Câu 19.** Viết entity `Product` tối thiểu (field: id, name, price, category) với quan hệ `@ManyToOne` tới `Category`. Không cần getter/setter đầy đủ — đủ annotation JPA.

**Trả lời:**

**Câu 20.** Viết interface `ProductRepository` với: (1) derived method tìm theo categoryId, (2) một `@Query` JPQL lấy product `price >= :minPrice`, (3) method nhận `Pageable` trả `Page<Product>`.

**Trả lời:**

---

# Đáp án đề A · `M1-3-jpa` · DAY_DU

> Thang điểm từng câu như đề. Tổng thô tối đa 90.

### Phần I (3đ/câu)

| Câu | Đáp án ngắn | Điểm |
|---|---|---|
| 1 | `@Entity` map tới bảng; cần `@Id` (thường kèm `@GeneratedValue`) | 3 |
| 2 | `JpaRepository` = CRUD + paging/sorting + JPA helpers (`flush`, `saveAndFlush`…). Chọn khi cần API JPA đầy đủ | 3 |
| 3 | `WHERE category_id = ? AND price < ?` (theo tên property) | 3 |
| 4 | Khi biểu thức phức tạp/join/DTO projection; ví dụ `SELECT p FROM Product p WHERE p.price > :min` | 3 |
| 5 | Service = boundary nghiệp vụ; Repository tx mặc định từng method. Rollback mặc định với **unchecked** / `Error` | 3 |
| 6 | `@ManyToOne` mặc định EAGER; `@OneToMany` LAZY. Eager collection dễ load thừa / cartesian | 3 |
| 7 | 1 query gốc + N query con theo từng row; bật `show_sql` / statistics thấy lặp SELECT | 3 |
| 8 | `IDENTITY` / `SEQUENCE` phổ biến; `UUID` khi cần ID phân tán, không lộ sequence | 3 |
| 9 | `@EnableJpaAuditing` + entity `@EntityListeners(AuditingEntityListener.class)` (và field annotated) | 3 |
| 10 | Phân trang server-side; metadata: `totalElements`, `totalPages` (hoặc `number`/`size`) | 3 |

### Phần II (5đ/câu)

| Câu | Đáp án ngắn | Điểm |
|---|---|---|
| 11 | Lazy/EAGER từng category → N+1; tạm: JOIN FETCH / entity graph / DTO query (đào sâu 2-4) | 5 |
| 12 | `IncorrectResultSizeDataAccessException` / NonUnique; trả `List`/`Optional` + ràng UNIQUE hoặc `findFirst` rõ ràng | 5 |
| 13 | Có — cùng persistence context/tx mặc định REQUIRED; unchecked từ B rollback cả tx A | 5 |
| 14 | `LazyInitializationException`; fetch trong tx/service hoặc dùng DTO/projection trước khi đóng session | 5 |
| 15 | Ví dụ: `Page<Product> findByCategoryIdAndPriceBetween(Long id, BigDecimal a, BigDecimal b, Pageable p)` | 5 |
| 16 | Schema drift, không review được DDL, khó tái tạo DB; ghi chú sẽ chuyển Flyway ở Chặng 2 | 5 |
| 17 | Product giữ FK `category_id`; `@ManyToOne` + `@JoinColumn(name="category_id")` | 5 |
| 18 | Slice JPA: entity/repos/JPA config, không full MVC; cần full bean/security/MVC thì `@SpringBootTest` | 5 |

### Phần III (10đ/câu)

| Câu | Tiêu chí chấm | Điểm |
|---|---|---|
| 19 | Có `@Entity`, `@Id`, quan hệ `@ManyToOne` + `@JoinColumn`; field tối thiểu đúng | 10 |
| 20 | Đủ 3 method: derived + `@Query` JPQL + `Pageable`→`Page` | 10 |

---

## Ví dụ chấm mẫu (normalize → state)

Giả sử học viên đạt thô:

| Nhóm | Đạt | Tối đa |
|---|---|---|
| Lý thuyết | 24 | 30 |
| Tình huống | 30 | 40 |
| Code mini | 15 | 20 |
| **Tổng thô** | **69** | **90** |

```
Điểm thang 100 = 69 / 90 × 100 = 76.67 ≈ 77
```

- **55–84 → 🟠 Cần ôn**
- Hành động: ôn N+1 / transaction / Lazy → làm đề `NHANH` (vì 70–84) tập trung các câu sai
- Cập nhật `05`: Trạng thái `🟠`, Điểm gần nhất `77`, Ngày kiểm tra = ngày chấm, +1 dòng log

---

# Đề B · `NHANH` — cùng topic `M1-3-jpa` (rút gọn)

**Chế độ:** `NHANH` · Tổng thô tối đa: **43đ** (6×3 + 3×5 + 1×10)  
**Mục đích:** Thấy khác biệt chế độ — dùng khi đang 🟠 (70–84).

**Câu 1 (3đ).** `@Id` bắt buộc trên entity — đúng/sai? Giải thích 1 câu.

**Trả lời:**

**Câu 2 (3đ).** `JpaRepository` kế thừa gì liên quan pagination?

**Trả lời:**

**Câu 3 (3đ).** Derived `findByPriceGreaterThan` → điều kiện gì?

**Trả lời:**

**Câu 4 (3đ).** JPQL dùng tên **entity/property** hay tên cột DB?

**Trả lời:**

**Câu 5 (3đ).** Unchecked exception trong `@Transactional` service — rollback?

**Trả lời:**

**Câu 6 (3đ).** `@OneToMany` mặc định Lazy hay Eager?

**Trả lời:**

**Câu 7 (5đ).** Mô tả N+1 trên API product + category và 1 cách phát hiện.

**Trả lời:**

**Câu 8 (5đ).** `LazyInitializationException` thường gặp khi nào?

**Trả lời:**

**Câu 9 (5đ).** Viết chữ ký method phân trang theo `categoryId`.

**Trả lời:**

**Câu 10 (10đ).** Viết `@Query` JPQL đếm số product theo `categoryId`.

**Trả lời:**

### Đáp án nhanh đề B

| Câu | Đáp án | Điểm |
|---|---|---|
| 1 | Đúng — JPA cần xác định identity | 3 |
| 2 | `PagingAndSortingRepository` (qua chuỗi kế thừa) | 3 |
| 3 | `price > ?` | 3 |
| 4 | Tên entity/property | 3 |
| 5 | Có (mặc định) | 3 |
| 6 | Lazy | 3 |
| 7 | 1+N SELECT; bật SQL log/statistics | 5 |
| 8 | Touch proxy Lazy ngoài session/tx | 5 |
| 9 | `Page<Product> findByCategoryId(Long id, Pageable p)` | 5 |
| 10 | `@Query("SELECT COUNT(p) FROM Product p WHERE p.category.id = :id")` | 10 |

Normalize ví dụ: đạt 36/43 → 36/43×100 ≈ **84** → vẫn 🟠 (cần ≥85 mới 🟢).
