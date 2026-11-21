# Chấm đầy đủ M3-1 Lesson 02 — Bài nộp đã điền vào đề

Ngày 2026-11-21. [Đề đã điền bài làm](../de-kiem-tra/M3-1-rest-bp__2026-11-20__lesson2-lan2.md). Chấm theo ý nghĩa và rubric công khai, không đòi khớp từng chữ.

## 0. Snapshot và nguồn

- Câu1 giữ nguyên phần bạn đã viết trong đề.
- Câu2–12 lấy từ file mới 9f8bae2e-1534-4763-97ea-bafd01361d56/Pasted text.txt, không lấy file rubric c88a9501 đã gửi nhầm trước đó.
- [File bài làm mới nguyên văn](archive/M3-1-rest-bp__2026-11-20__lesson2-lan2__2026-11-21__BAI_LAM_DINH_KEM_2.md).
- [Đề trước khi điền](archive/M3-1-rest-bp__2026-11-20__lesson2-lan2__2026-11-21__BAI_NOP_TRUOC_DIEN_2.md).
- [Đề đã điền, snapshot chấm](archive/M3-1-rest-bp__2026-11-20__lesson2-lan2__2026-11-21__BAI_NOP_CHAM_2.md).
- [Nhận xét chấm tạm trước đó](archive/M3-1-rest-bp__2026-11-20__lesson2-lan2__2026-11-21__NHANXET_TRUOC_CHAM_2.md).
- Điền nguyên nội dung từng câu, không tự hoàn thiện đáp án hộ bạn. Cuối file gửi dừng ở sơ đồ Page.map(); vẫn đọc toàn bộ lời giải phía trên, không trừ vì sơ đồ phụ chưa kết thúc.

## 1. Điểm tổng và nhóm kiến thức

**60/60 ×100 =100/100 — Đạt Lesson02 về nội dung bài nộp.**

| Nhóm | Câu | Điểm |
|---|---|---:|
| Default và normalize | 1 | 5/5 |
| Tính trang, metadata và empty/parent | 2,3,11 | 15/15 |
| Kết hợp filter, vị trí query và count | 4,5,10 | 15/15 |
| Sort/tie-break và dữ liệu thay đổi | 6 | 5/5 |
| Binding/range/sort validation | 7,8 | 10/10 |
| DTO page và luồng response | 9,12 | 10/10 |

Các nhóm đều đạt ngưỡng85% trên bài viết. Đây không phải chứng nhận kỹ năng production hoặc đã làm capstone; không có code/API thực tế được kiểm ở lượt chấm này.

## 2. Bảng từng câu

| Câu | Điểm | Nhận xét |
|---|---:|---|
| 1 | 5/5 | Đúng default, trim, optional và blank keyword |
| 2 | 5/5 | Đúng tập10/11/13, trang10/11 và tổng3/2, response200 |
| 3 | 5/5 | Trang1 có13; trang2 rỗng nhưng giữ total3/pages2 |
| 4 | 5/5 | Nhìn ra bỏ keyword; sửa AND trước page và count cùng filter |
| 5 | 5/5 | Phân biệt [] sai với [12,15] đúng; query tạiDB có lý do |
| 6 | 5/5 | Sort đúng; tính ra id11 lặp và giải thích offset dịch |
| 7 | 5/5 | Đúng400 cho các input; phân biệt binding và kiểm giá trị |
| 8 | 5/5 | Đúng policy sort, allowlist, Pageable và giới hạn kết luận injection |
| 9 | 5/5 | Map DTO đúng; lấy metadata từPage; schemaPageResponse doAPI quản lý |
| 10 | 5/5 | Count6 sai/3 đúng, cùngWHERE, phân biệt2Product với3JOINrows |
| 11 | 5/5 | Đúng các status/content/total/page được hỏi; xem lưu ý size bên dưới |
| 12 | 5/5 | Đủ năm bước và dữ liệu trả12/15,total2/pages1 |

## 3. Chấm từng ý, chỉnh những chỗ dễ hiểu lệch

### Câu1 — 5/5

Default page0/size20:1; idASC:1; JAVA sau trim và khớp thường:1; không tự áp0 cho filter vắng:1; blank không lọc:1. Không cần viết lại.

### Câu2 — 5/5

Tập và thứ tự10,11,13:1; offset0/content10,11:1; total3/pages2:1; HTTP200 và JSON đủ năm field:2. Các giá trị trong DTO khớp dữ liệu đề.

### Câu3 — 5/5

Page1 đúng content13/page1/size2/total3/pages2:2. Page2 đúng200/content[]/page2/size2/total3/pages2:2. Phân biệt size,content.size,totalElements:1. Bạn không đồng nhất trang rỗng với cả tập lọc rỗng.

### Câu4 — 5/5

Nhánhcategory chạy làm bỏkeyword và trả10/11/13:2. Kết quả đúng10/13,total2:1. AND trướcpage/count cùngfilter/không ghép haiPage riêng:2. Nêu Specification chỉ là một hướng hợp lệ, không bị bắt phải dùng.

### Câu5 — 5/5

Cách sai cho[]:1. Đúng12/15,total2:1. Filter→Sort→Pagination và giải thích không bỏ dòng ngoài lát đầu:2. Query ởRepository/DB tránh tốn bộ nhớ/truyền cả bảng:1.

### Câu6 — 5/5

Order13,10,11,15,12,14 và tie-break khi cùng100:2. Page0[10,11], page1[11,12], id11 lặp:2. Vị tríoffset đổi doINSERT, sortunique không đóng băngdataset:1. Không đòi giải pháp cursor/lock.

### Câu7 — 5/5

Bạn nêu chung mọi input trả400, bảng lý do từng dòng và phân biệt binding/validation bên dưới. Đọc gộp ba phần để chấm, không bắt lặp status/bước ở mỗi ô:
- pageabc:1; page-1:1.
- size101:0,5; size0:0,5; categoryId0:0,5; minPrice-1:0,5.
- min150/max100:1.

Bảng chỉ rõ abc không convert được; các dòng còn lại bind được nhưng vi phạm giá trị. Chỉ @RequestParam không tự enforce contract đã được bạn nêu đúng.

### Câu8 — 5/5

Direction:1; fieldallowlist:1; formatđúngmộtcặp:1; Pageable cầncheck/cấu hình:1; fieldlạ không tự chứng minhSQLinjection:1.

Bạn đổi ví dụ sideways→up, secretCost→costPrice, và sort bốn phần→sort chỉ cóprice. Không chấm lỗi tên ví dụ máy móc: cả hai direction đều ngoàiasc/desc; cả hai field ngoàiallowlist; phần format bạn viết rõ **đúng một cặp field,direction**, thể hiện đúng quy tắc áp dụng cho cả thiếu phần lẫn thừa phần.

Để bám sát câu hỏi hơn, với input gốc sort=price,asc,id,desc có thể nói: “Có4phần thay vì2phần nên400.” Đây là cách áp quy tắc bạn đã nêu, không tạo tiêu chí mới để trừ điểm.

### Câu9 — 5/5

Map entity→DTO:1. Nguồnsize2,total3,pages2:2. Map1–1 giữmetadata:1. DTOpage kiểm soát publicJSON thay vì phụ thuộcPageImpl:1. Code dùngLombokBuilder hợp lệ trong giả định bài; không bắt tự viết builder.

### Câu10 — 5/5

Count6/3:1. WHEREcategory1ANDprice≥100 và khôngLIMIT/OFFSET:2. HaiProduct10/13 thay vì3JOINrows:1. Sửa content/count cùngfilter và đơn vịProduct, không váJSON bằngsốđoán:1. COUNTDISTINCT là hướng bạn nêu phù hợp, không phải cú pháp bắt học thuộc.

### Câu11 — 5/5 và một lưu ý không trừ điểm ngoài rubric

Filterkhôngkhớp200/content[]/total0/pages0:2. Parentkhôngcó404 và lýdo:1. Page999 giữ999,200/content[]/total6/pages3:2.

**Chỗ cần chỉnh khi dùng lại response:** ý1 của đề ghi page0&size2, nhưng bạn minh họa URL chỉcategoryId999 vàJSONsize20. Với URL bạn viết, size20 đúng default. Nếu trả lời chính URL của đề thì phải là **size2**, không phải20.

Không trừ vào điểm lần này vì ý1 chỉ hỏi status,content,totalElements,totalPages; cả bốn đều đúng. Không tự thêm tiêu chí size để trừ sau khi làm. Tuy nhiên đừng đổi request vô thức khi áp dụng vào code/test thật.

### Câu12 — 5/5

Binding/check/normalize:1. Truyềncategory2,page0,size2,idASC:1. Repositorytrả12/15,total2/pages1:1. MapDTO rồiđóngPageResponse,khônglọcthêm:1. Controller200 vàserializerđổiJSON:1.

Bạn đã nói đủ luồng trong năm đoạn trước sơ đồ. Sơ đồ cuối dừng ởPage.map không làm mất nội dung đúng đã viết phía trên; không trừ lỗi gửi thiếu phần minh họa lặp.

## 4. Những gì đã nắm và việc ôn nhẹ

Bạn đã thể hiện được:
- Tổng trước phân trang khác số dòng trong một trang.
- AND/filter trướcpage là yêu cầu đúng nghĩa, không phải tùy stylecode.
- Orderunique không bảo đảm snapshot giữaHTTPrequests.
- Typeconversion khác kiểmrange.
- Pageentity cầnmapDTO,metadata lấy từ kết quảqueryđúng.
- Countquery phải giữ đúngfilter/đơnvịProduct.

Không có phần sai kiến thức đủ căn cứ để yêu cầu học lại cảlesson. Hai chỉnh nhẹ:
- Giữ nguyênURL của đề → bài học mục2/11 →3phút → đổiJSONsize20 thành2 nếu dùng đúngURL đã hỏi.
- Ápformatcheck vào đúnginput → bài học mục8 →3phút → nói một câu vì sao4phầnsort bị400.

[Bài học](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_02_PAGINATION_FILTER_SORT_CONTRACT.md). Roadmap: M3-1 checklist pagination/filter/sort thống nhất.

## 5. Quyết định

**Đạt Lesson02:100%. Có thể tiếp Lesson03.** Không bắt thêm đề hoặc project để công nhận kết quả bài viết này.

ModuleM3-1 vẫn đang học: Lesson03/ProblemDetail/HATEOAS và deliverable chưa có kết quả ở lượt này. Không đánh dấu cảmodule hoàn thành. Điểm này không tự chứng minh khả năng tự triển khai/chạyAPI hoặc giải độc lập các biến thể chưa hỏi.

## 6. Kế hoạch tiếp theo

Không áp kế hoạch học lại3–5ngày vì đã đạt. Đọc hai lưu ý trên trong khoảng6phút, rồi tiếpLesson03 khi bạn yêu cầu. Không tự sinh bài học mới trong lượt chấm.

## 7. Tiến độ và lịch sử

- Lần trước chỉ câu1:5/5 phần được chấm.
- Lần này đủ12câu:12×5=60/60=100%.
- Đã lưu bài nguồn, bảntrướcđiền, snapshotđãđiền và nhậnxéttrước.
- 05: cập nhật trạng tháiL01/L02đạt nhưng moduleđanghọc, điểmL02, ngày2026-11-21 và mộtdònglog.
- 01: chỉ tick pagination/filter/sort; không rewrite nội dung, không tick phần khác hoặc xác nhận capstone.
