# Task 02 — Flyway

| Lesson đã đọc | Câu đã đối chiếu | Điểm kiểm |
|---|---|---|
| 01 | 1–8 | V naming/order/checksum/history, version bất biến |
| 02 | 1–8 | Boot/dependencies, repeatable, locations, seed và profile |
| 03 | 1–8 | Rollback, repair/baseline/clean, expand-contract, CI upgrade |

## Kết quả

Bao phủ roadmap: versioned/repeatable, Boot integration, seed dev/test, forward-only và kiểm nâng cấp. Có phân biệt Flyway validate với Hibernate validate; repair không chạy SQL thay schema; baseline không chứng minh schema đúng; SQL không transactional không được suy diễn rollback toàn bộ.

**P2 đã sửa ở rubric L02 C6/C7:** DB riêng là dữ kiện đề, không bắt nhắc lại mới đủ điểm; việc kiểm kết quả seed là lời khuyên, không điều kiện ngầm. Giữ tổng 5 điểm/câu và giữ nguyên đề.

Ví dụ seed lấy category_id thực từ SELECT, không mặc định id=1. SELECT rỗng tạo INSERT 0 dòng, không tự tạo Category. CI có hai đường DB trống và DB cũ có dữ liệu; không đòi Actions syntax trước M4-2.

## Nguồn và giới hạn

- [Repeatable migrations](https://documentation.red-gate.com/flyway/flyway-concepts/migrations/repeatable-migrations).
- [Boot database initialization](https://docs.spring.io/spring-boot/how-to/data-initialization.html).
- SQL transaction có giả định PostgreSQL rõ; chưa gọi Flyway CLI thật trong task này. Lịch sử schema và migration runtime phải được kiểm độc lập, không chỉ dựa app start.
