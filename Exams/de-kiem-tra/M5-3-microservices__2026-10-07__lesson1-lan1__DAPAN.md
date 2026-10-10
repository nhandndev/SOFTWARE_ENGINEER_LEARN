# Bài giải M5-3 · Lesson 01

40 điểm, đạt từ 34. [Quy tắc](../../Notes/M5_Scalability/M5_3_Microservices/QUY_TAC_CHAM.md). Chấm đúng nghĩa, không bắt khớp chữ hoặc chọn đúng một sơ đồ duy nhất.

| Câu | Rubric, tổng 5 điểm |
|---|---|
| 1 | Layer là trách nhiệm kỹ thuật (1); @Service là bean không process (1); deployable khác số class (1); context là model/rule/language boundary (1); deploy độc lập với contract tương thích không lockstep (1) |
| 2 | Monolith nhiều instance scale được (1); repo count không tiêu chí bắt buộc (1); data ownership không một máy/service (1); modular boundary khác code rối (1); scale chung trade-off và container/DB count không đủ (1) |
| 3 | Context là phạm vi ý nghĩa (1); Catalog/Ordering/Inventory rule rõ (1); snapshot Order giữ lịch sử không owner giá hiện tại (1); table không context mặc định (1); context không bắt1service (1) |
| 4 | Theo layer tạo network hops (1); change/deploy vẫn coupled (1); candidate capability có lý do (1); rule/transaction/change ownership cần hỏi (1); không ép table/ProductCategory tách (1) |
| 5 | Bypass rule và schema coupling (1); command/API/event contract phù hợp (1); logical ownership không cần server riêng (1); shared host còn resource/failure coupling (1); composition/read model và lag/cost trade-off (1) |
| 6 | JVM không tự atomic (1); cùng DB/resource/manager và tx boundary (1); email/Kafka ngoài DB resource (1); local event không tự durable (1); remote timeout/commit riêng không rollback bằng local annotation (1) |
| 7 | Nhiều process/Kafka chưa độc lập (1); shared tables/model gây coupling (1); lockstep là dấu hiệu distributed monolith (1); utility ổn định khác business entity chung (1); monolith dùng Kafka được và cải thiện contract/ownership (1) |
| 8 | Trách nhiệm capability rõ (1); data owner rõ (1); contract cụ thể (1); rule/transaction và assumption được xét (1); không bắtdeploy ngay, diagram không implementation (1) |

## Câu 1 - Ba loại boundary

Ba layer vẫn có thể thuộc một deployable; @Service không tạo network/process. Layer chia HTTP/business/data access, context chia ý nghĩa/mô hình/rule, deployable chia đơn vị phát hành/chạy. Microservices cần khả năng phát hành riêng các thay đổi tương thích, không chỉ nhiều tên repo/container.

## Câu 2 - Không đồng nhất số lượng

Monolith có thể chạy nhiều instance; scale toàn artifact có thể tốn tài nguyên phần khác nhưng không phải không scale. Repo count không quyết định architecture. Ownership data có thể tách bằng schema/private tables/user trên cùng host. Modular monolith cần boundary/contract rõ; folder riêng chưa đủ. Nhiều container/DB không bảo đảm independent deploy hoặc loose coupling.

## Câu 3 - Ngôn ngữ và snapshot

Catalog Product phục vụ niêm yết; Ordering line item phục vụ thỏa thuận lịch sử; Inventory phục vụ tồn/giữ chỗ. Snapshot tên/giá lúc mua giúp Order không đổi theo Catalog hiện tại, không lấy ownership giá catalog. Bounded context là phạm vi ý nghĩa/rule, không tự theo table hoặc 1:1 với service. Context thực tế còn phải xác nhận domain.

## Câu 4 - Capability

Theo layer làm một feature đi nhiều network hops, changes vẫn phối hợp khiến deploy không độc lập. Candidate Catalog/Ordering/Inventory phù hợp hơn nếu rule/data/change ownership xác nhận. Hỏi consistency invariant, transaction, team/owner và cách thay đổi; không bắt Product/Category thành hai service vì hai bảng.

## Câu 5 - Data contract

Direct UPDATE bypass Inventory reservation rule và biến schema thành API ngầm. Dùng command reserveItems/result hoặc event workflow phù hợp consistency. Không bắt một DB server/service; logical ownership cần access barriers. Shared host còn chung tài nguyên/failure. Composition hoặc materialized read model có chi phí call/lag/reconcile; không query bảng owner khác tùy tiện để né contract.

## Câu 6 - Resource boundary

Cùng JVM chưa atomic. Transaction DB cần boundary và cùng resource/manager phù hợp; email/Kafka không tự được rollback theo DB. Local event chưa chắc được lưu bền khi process chết. Tách process có timeout/partial failure và local commit riêng; một @Transactional bên gọi không rollback remote effect. Không yêu cầu thuộc distributed transaction API.

## Câu 7 - Distributed monolith

Kafka là communication choice, không chứng nhận independent deploy. Shared table/entity và release lockstep cho thấy coupling kéo qua network. Shared utility ổn định không nhất thiết xấu như shared business model bắt nâng version cùng nhau. Monolith có thể dùng Kafka; cần sửa ownership/contract/change coupling, không chỉ thêm container.

## Câu 8 - Phương án chấp nhận

Catalog sở hữu niêm yết; Ordering sở hữu Order/line snapshot; Inventory sở hữu reservation. Contract ví dụ getCatalogOffer/reserveItems có ý nghĩa rõ, không chọc Repository chéo. Hỏi rule cần atomic, ai owner và workload/team assumption. Có thể giữ các module trong một deployable trước; các boundary này là đề xuất, không được ghi đã có implementation. Phương án khác có reasoning nhất quán được điểm.
