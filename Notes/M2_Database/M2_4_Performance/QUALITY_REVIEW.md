# Kiểm chứng tài liệu M2-4 N+1 & HikariCP

Ngày rà lại: **2026-10-07** (bản đầu 2026-10-06). Đây là rà **tài liệu học và đề**, không phải benchmark thật hoặc điểm người học. Đã đọc bốn bài và đủ bốn đề/đáp án, đối chiếu roadmap, sửa lần lượt rồi kiểm toàn bộ.

## Những vấn đề tìm thấy và đã sửa

| Vấn đề trước rà | Sửa trực tiếp | Ý nghĩa |
|---|---|---|
| Dùng context/proxy/session/round-trip trước khi giải nghĩa | Thêm từ vựng ngắn, cách đếm Category khác ID và field DTO không cần quan hệ | Giải thích bản chất thay vì thêm thuật ngữ phải thuộc |
| Đề Lesson 01 chủ yếu kể N+1/counter, thiếu đọc code | Thêm Service code chung và câu bỏ field Category khỏi response | Kiểm xem học viên biết query phụ do chỗ đọc nào |
| Case Category NULL dễ xung đột mapping bắt buộc | Ghi tình huống độc lập, mapping/FK cho NULL và mapper null-safe | Không buộc đoán schema từ đoạn code thiếu |
| Batch chỉ giải thích chung | Thêm ví dụ 36 ID/size16 có điều kiện, phân biệt read và write batch | Có thể hình dung gom query, không học công thức cứng |
| Paging hai bước thiếu đoạn dựng DTO/metadata | Thêm association, DTO class và nguyên method ghép page | Người học tự trace được order, trang rỗng, total và concurrency |
| Câu OSIV/wrapper lặp kiến thức, count chỉ nhắc chung | Thay câu 6 Lesson 03 bằng lỗi count thiếu filter có dataset/code | Kiểm API đúng dữ liệu và tổng, không chỉ đúng hình JSON |
| Hikari nhiều setting và câu chẩn đoán còn lý thuyết | Chia cần hiểu/tra cứu; thêm bảng thử pool5/10/30, đổi câu 5 | Kiểm chọn theo p95/throughput/DB load, không tăng pool theo cảm giác |

## 1. Chất lượng từng lesson

| Bài | Trọng tâm kiểm | Ngữ cảnh đủ cho ví dụ | Điểm dễ sai đã rà |
|---|---|---|---|
| 01 | N+1, LAZY/EAGER, SQL/statistics | Product/Category fields, DTO class, Service mapping; dữ liệu ba Category khác nhau; context/cache/batch giả định | Không khẳng định luôn 1+N; context dùng lại; DTO/transaction không tự sửa N+1; counter chung không là latency |
| 02 | Fetch join, EntityGraph, BatchSize, projection | Repository methods, DTO constructor đầy đủ, optional Category được phân biệt | JOIN thường không là FETCH; left join giữ null; batch đọc không là JDBC batch ghi; SQL graph cần kiểm thực tế |
| 03 | Paging, OSIV, transaction | To-one Page+count, PageResponse class; collection dataset bốn dòng; two-query IDs/fetch | Không paging collection bằng limit ngây thơ; DISTINCT không tự sửa; IN không giữ order; wrapper không thành DTO; context không luôn giữ connection |
| 04 | Hikari pool, timeout/leak, ngân sách, benchmark | Pool A/B/C; YAML ms; nhiều instance; bảng số giả định và mẫu báo cáo | Wait timeout khác query time; lifetime/leak không cắt query; pool max tính cả idle; p95 không là max; ít query chưa chứng minh nhanh hơn |

Mỗi bài có điều kiện tiên quyết, câu chuyện Product/Category, giải thích code và luồng, các bẫy, mục tự luyện, tài liệu chính thức/video gợi ý và đề riêng. Không dùng record DTO; snippets có tên field/package hoặc chỉ rõ là method/annotation thêm vào code bài trước.

## 2. Bài học có dạy đủ câu hỏi?

Số mục trong lesson theo từng câu:

| Bài | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 |
|---|---|---|---|---|---|---|---|---|
| 01 | 1–3 | 2–3 | 4 | 4 | 6 | 1/6 | 5 | 4–5 |
| 02 | 2 | 2 | 3 | 4 | 5 | 5 | 2/7 | 6–7 |
| 03 | 1 | 2 | 2 | 3 | 4–5 | 1 | 5 | 4/6 |
| 04 | 1–2 | 3 | 4 | 5 | 5 | 8 | 7/9 | 7–9 |

Đã đối chiếu từng rubric với yêu cầu: mỗi câu 5đ, tổng 40đ; 8 câu/8 chỗ trả lời/8 rubric cho mỗi bài. Giả định số query được ghi ngay đề, tránh phải đoán từ code thiếu mapping. Đề không buộc nhớ syntax testing/Actuator/load tool chưa học. Câu kết luận trước–sau Lesson 01 chỉ hỏi giới hạn số query, còn p95 được dạy trước khi hỏi ở Lesson 04.

## 3. Coverage roadmap

Đủ SQL log/statistics; JOIN FETCH/EntityGraph/BatchSize; OSIV tắt; transaction boundary; pool max/timeout/leak; số query và latency trước–sau. Paging collection, projection và ngân sách connection thêm để cách tối ưu không làm sai dữ liệu hoặc quá tải DB. Second-level cache sâu không thuộc bộ này.

## 4. Nguồn đối chiếu

- [Hibernate User Guide](https://docs.hibernate.org/orm/7.1/userguide/html_single/): fetching/batch, statistics và fail_on_pagination_over_collection_fetch.
- [Hibernate HQL](https://docs.hibernate.org/orm/7.1/querylanguage/html_single/): fetch join, to-one/to-many, limits.
- [Spring Data JPA methods](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html) và [projections](https://docs.spring.io/spring-data/jpa/reference/repositories/projections.html).
- [Spring transactions](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html).
- [OSIV filter](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/orm/jpa/support/OpenEntityManagerInViewFilter.html).
- [Hikari configuration](https://github.com/brettwooldridge/HikariCP#configuration-knobs-baby), [pool sizing](https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing), [Boot metrics](https://docs.spring.io/spring-boot/reference/actuator/metrics.html).

Đã mở tài liệu để rà nghĩa, không chỉ gắn link. Phiên bản ORM/Hikari theo Boot của dự án; ví dụ tham khảo Hibernate 6/7, không bắt nâng phiên bản để đọc bài. Video là từ khóa tùy chọn, không coi đã xem/đánh giá một video.

## 5. Kiểm cấu trúc và giới hạn

Đã dùng script kiểm link nội bộ, code fence, đủ bộ bài/đề/đáp án, numbering và rubric. Đã rà SQL/JPQL và phép tính ví dụ: ba Product/ba Category khác nhau → 4 statement theo giả định; Books ba Product và Electronics một → 4 dòng join; bốn pool ×15 → trần 60 connection, vượt ngân sách 40.

**Đã kiểm SQL trên PostgreSQL 17 tạm**, cùng lượt kiểm Flyway: bảy ca phần JOIN/count đạt gồm 4 dòng join collection; LIMIT2 dòng chỉ có một root; page root rồi fetch giữ hai Category; LEFT JOIN giữ Category rỗng; count không filter=3; count đúng filter=2; JOIN to-one không nhân Product. Đây là SQL kiểm quan hệ/dữ liệu, không phải Hibernate đã sinh JPQL/SQL đó.

**Đã trích nguyên method listCategories từ Markdown, compile bằng javac --release 21 và chạy 11 ca ghép dữ liệu**. Harness dùng stand-in Page/Repository/entity/DTO/annotation để kiểm Java logic, không thay Spring/Hibernate integration test:

1. Fetch trả đảo thứ tự, response vẫn theo ID page.
2. Product con được sắp ID và map DTO.
3. Category không có Product giữ list rỗng.
4. Metadata lấy từ root Page, không từ content.size().
5. Một fetch cho nhóm ID đang chọn.
6. Trang vượt cuối content rỗng nhưng total vẫn giữ.
7. ID page rỗng không gọi IN.
8. Page âm bị từ chối trước Repository.
9. Size=0 bị từ chối.
10. Size>100 bị từ chối.
11. Category mất giữa hai SELECT báo rõ thay vì silent response thiếu root.

Chưa chạy Hibernate/Boot end-to-end, render Mermaid hoặc load test. Fetch plan, EntityGraph, batch và Hikari được rà tài liệu chính thức; chưa tuyên bố query count runtime đúng ở mọi ORM version. Mọi số p95/throughput/pool trong bài là giả định đã ghi nhãn. YAML parse đạt về cú pháp, không chứng minh binding runtime. Snippet vẫn là code đọc theo ngữ cảnh, chưa phải project được build đầy đủ.

Đề hiện có nhận diện, đọc code/SQL/data, chọn giải pháp và thiết kế phép đo. Rubric không buộc tên package/property thuộc lòng khi ý đúng; lỗi làm mất dữ liệu, total sai hoặc kết luận quá bằng chứng vẫn phải trừ. Chưa có kết quả học viên trên bộ đề này để kiểm định độ khó thực nghiệm.

M2-4 giữ “Chưa bắt đầu”, checklist không tick, chưa ghi deliverable/benchmark đạt. Tài liệu đủ để học và đánh giá tư duy theo phạm vi hiện tại; không thay thế bằng chứng thực hành nếu về sau yêu cầu pass deliverable.
