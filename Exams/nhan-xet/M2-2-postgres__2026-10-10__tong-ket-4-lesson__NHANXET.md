# Chốt M2-2 PostgreSQL: đạt phần học

Ngày: 2026-10-10. Theo yêu cầu người học chốt module và chuyển sang Lesson 01 Flyway. Đây là tổng hợp điểm đã chấm, **không phải một bài thi tổng module mới**.

## Điểm và bằng chứng

| Lesson | Điểm thô | Quy đổi | Nhận xét đã lưu |
|---|---|---|---|
| 01: kiểu dữ liệu, constraint | 39/40 | 97,5 | [Snapshot 01](M2-2-postgres__2026-10-05__lesson1-lan1__NHANXET.md) |
| 02: ghi dữ liệu an toàn | 40/40 | 100 | [Snapshot 02](M2-2-postgres__2026-10-05__lesson2-lan1__NHANXET.md) |
| 03: transaction và Spring | 39/40 | 97,5 | [Snapshot 03](M2-2-postgres__2026-10-05__lesson3-lan1__NHANXET.md) |
| 04: JDBC, binding, identity, VACUUM | 38,5/40 | 96,25 | [Snapshot 04](M2-2-postgres__2026-10-05__lesson4-lan1__NHANXET.md) |

Tổng **156,5/160 = 97,8125/100**, hiển thị **97,81**. Bốn đề cùng trọng số; đây là điểm tổng hợp bốn lesson, không gắn nhãn điểm thi tổng module.

## Kết luận

**Đạt phần học M2-2** và mở M2-3 theo quyết định hiện tại của người học. Không giao thêm bài thi cuối hay capstone làm điều kiện chuyển tiếp ở lượt này. Deliverable PostgreSQL/shopcore vẫn chưa được kiểm chứng; không ghi nhận đã chạy DB, merge code hoặc hoàn thành capstone. Yêu cầu gốc trong roadmap được giữ nguyên để phân biệt với phạm vi công nhận này.

Checklist kiến thức M2-2 đã được tick qua các lượt đủ điểm trước. Không tick thêm checklist thực hành hoặc checklist Flyway.

## Phần cần củng cố

- Lesson 01: CHECK nhận NULL khi không có NOT NULL.
- Lesson 03: aborted khác rollback hoàn tất; transaction riêng không có chung ranh giới commit/rollback.
- Lesson 04: giới hạn field/direction sort; FULL viết lại bảng, cần dung lượng tạm và khóa mạnh.
- Lesson 02 không còn thiếu theo rubric; không coi lỗi cũ đã sửa là lỗi hiện tại.

Giải thích và ví dụ: [README ôn lỗi cá nhân](../../Notes/M2_Database/M2_2_PostgreSQL/README_HOC_LAI_LOI_SAI_M2_2_POSTGRESQL.md).

## Hành động tiếp theo

Đọc [M2-3 Lesson 01: migration và schema history](../../Notes/M2_Database/M2_3_Flyway/LESSON_01_MIGRATION_VA_SCHEMA_HISTORY.md), làm [đề 8 câu](../de-kiem-tra/M2-3-flyway__2026-10-05__lesson1-lan1.md). Đề chưa có bài làm/điểm; không suy đã đạt Flyway. Bài giải giữ ở file riêng.

Không cần kế hoạch học lại 3–5 ngày vì đã đạt; dùng tài liệu ôn khoảng 25 phút khi cần.
