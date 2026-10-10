# M5-3 Microservices · Lesson 01 · Kiến trúc và boundary

Chế độ `PHONG_VAN` theo lesson: 8 tình huống × 5 = 40 điểm, đạt từ 34/40 (85%). Khoảng 40 phút. Trả lời bằng ý nghĩa/sơ đồ/pseudocode, không cần thuộc thuật ngữ. [Bài học](../../Notes/M5_Scalability/M5_3_Microservices/LESSON_01_MONOLITH_BOUNDARIES.md).

## Câu 1 - Ba layer là ba service?

Bạn có ProductController, ProductService, ProductRepository cùng JVM và 10 bean @Service. Đây có tự là microservices không? Phân biệt layer, Spring bean, deployable, bounded context; độc lập deploy cần thể hiện điều gì ngoài tên class/repo/container?

**Trả lời:**

## Câu 2 - Một monolith, nhiều instance

Một bạn nói “monolith không scale được, mỗi service phải một repo và một máy DB”. Hãy sửa từng ý; so modular monolith và monolith rối; nói chi phí scale chung và vì sao nhiều DB/container chưa đủ chứng minh microservices.

**Trả lời:**

## Câu 3 - Product có một Entity chung?

Catalog sửa tên/giá Product, nhưng Order cũ phải giữ giá/tên lúc mua; Inventory giữ tồn/giữ chỗ. Giải thích bounded context qua ví dụ, ai sở hữu rule nào, vì sao Ordering có thể lưu snapshot; một table có luôn là một context và một context có bắt buộc một service không?

**Trả lời:**

## Câu 4 - Tách theo tầng

Bạn định triển khai Controller service gọi Business service gọi Repository service để “chuẩn 3-layer và microservices”. Chỉ ra coupling/network/deploy problem; đề xuất boundary ứng viên theo capability; nêu thông tin rule/transaction/change ownership cần hỏi trước khi chốt, không mặc định Product/Category phải tách.

**Trả lời:**

## Câu 5 - Ordering UPDATE bảng Inventory

Đã tách hai process nhưng Ordering dùng credentials chung để UPDATE trực tiếp inventory.stock. Vì sao sai ownership/coupling? Thay bằng contract gì? Database per service có bắt buộc khác server không; shared DB host còn rủi ro gì; query tổng hợp có hướng nào và trade-off gì?

**Trả lời:**

## Câu 6 - Cùng JVM là atomic?

Modular monolith gọi Catalog/Inventory local rồi gửi email/Kafka. Cùng JVM có tự atomic tất cả không? Điều kiện để transaction DB chung là gì; external side effect khác gì; local event có luôn durable không? Nếu tách process, timeout/commit và @Transactional thay đổi thế nào?

**Trả lời:**

## Câu 7 - Có Kafka, 6 container, release cùng nhau

Sáu process dùng shared tables/shared Entity jar, phải nâng version/release đồng loạt. Có Kafka thì đã đạt mục tiêu microservices chưa? Nêu dấu hiệu distributed monolith và vì sao shared utility không luôn xấu; monolith có dùng Kafka được không; cần cải thiện coupling nào trước?

**Trả lời:**

## Câu 8 - Vẽ boundary nhỏ cho shopcore

Cho ví dụ thiết kế tương lai Catalog, Ordering, Inventory: nói trách nhiệm, owner dữ liệu, một contract giữa hai phần và phần nào nên giữ transaction/rule gần nhau. Có cần triển khai ba service ngay không? Nêu một assumption cần hỏi lại và phân biệt sơ đồ đề xuất với feature đã code.

**Trả lời:**
