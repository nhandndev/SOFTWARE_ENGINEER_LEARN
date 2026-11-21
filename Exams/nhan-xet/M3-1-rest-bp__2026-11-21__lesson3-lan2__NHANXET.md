# Chấm đủ Lesson 03 — Kết quả lần 3

Ngày 2026-11-21. [Đề đã làm](../de-kiem-tra/M3-1-rest-bp__2026-11-21__lesson3-lan2.md): TU_DUY_RONG, 8câu/40đ. Chấm đúng ý nghĩa và rubric hiện hành, không ép học thuộc hoặc code lại.

## 0. Snapshot

- [Bài nộp đầy đủ lần3](archive/M3-1-rest-bp__2026-11-21__lesson3-lan2__2026-11-21__BAI_NOP_CHAM_DU_3.md).
- [Nhận xét trước lần3](archive/M3-1-rest-bp__2026-11-21__lesson3-lan2__2026-11-21__NHANXET_TRUOC_CHAM_DU_3.md):31,5/35 trên7câu.
- Câu4 mới có trả lời đủ các ý. Những câu khác không đổi về kiến thức nên giữ điểm.
- Câu2 có bảng lặp và đáp án viết lệch ô: đọc toàn bộ, chấm một lần. Không sửa bài làm.
- Câu4/7 có dấu hai chấm, số điểm hoặc dòng nhắc rubric dư: chấm nội dung đã viết, không phạt hình thức, không tự suy luận về cách bạn soạn bài.

## 1. Điểm tổng và nhóm

**36,5/40 ×100 =91,25% — Đạt Lesson03 về phần kiến thức.**

| Nhóm | Câu | Điểm | Đánh giá |
|---|---|---:|---|
| Vai trò và luồng lỗi | 1,2 | 8,5/10 =85% | Nắm phần lớn, còn query param/405 |
| Error contract và chuẩn hóa các nhánh | 3,4 | 9/10 =90% | Câu4 đã đủ, còn giải thích HTTP/body |
| Bảo mật và điều tra lỗi | 5 | 4/5 =80% | Thiếu liên kết ID/log và bảo vệ log |
| Giới hạn xử lý | 6 | 5/5 =100% | Đủ phạm vi Advice |
| Tương thích client | 7 | 5/5 =100% | Đủ kế hoạch chuyển và phân biệt success/error |
| Hypermedia nhận diện | 8 | 5/5 =100% | Đủ các ý roadmap yêu cầu |

Không gọi kết quả này là kiểm chứng project/API thực tế. Đạt91,25% không có nghĩa mọi ý đã đúng100%.

## 2. Điểm đủ 8 câu

| Câu | Điểm | Nhận xét |
|---|---:|---|
| 1 | 4,5/5 | Hiểu exception/handler/object; cách giữ ErrorCode còn thiếu nửa ý |
| 2 | 4/5 | Còn nhầm queryparam vớiJSON; POST vào endpoint chỉGET là405 |
| 3 | 4/5 | Sửa HTTP404 đúng; lý do body404 chưa đủ còn lệch trọng tâm |
| 4 | 5/5 | Đã hiểu chuẩn hóa ngoài business, field errors và cách kiểm |
| 5 | 4/5 | Đúng500/không lộ secret; cần log có quyền truy cập và liên kết ID |
| 6 | 5/5 | Đúng filter/startup/commit/Security/catch-all |
| 7 | 5/5 | Đúng backward compatibility, kế hoạch chuyển, success và status |
| 8 | 5/5 | Đúngself/category và ý nghĩa links |

Tổng4,5+4+4+5+4+5+5+5=36,5. Ngưỡng34/40, không có luật ẩn bắt mọi câu phải đạt85%.

## 3. Nhận xét từng câu và phần cần giữ

### Câu1 — 4,5/5

Ý1/2/3/5 mỗi ý1đ. Ý4 nhận0,5/1 vì bạn nói đúng thayformat phải xét contract/version, nhưng chưa nói ErrorCode và ProblemDetail cùng tồn tại thế nào.

Chữa ngắn: **Service giữ AppException(ErrorCode...), handler đọc enum lấy thông tin rồi dựng ProblemDetail.** Không cần bỏ business enum hoặc viết lại Service. Đọc bài học mục1/4/7.

### Câu2 — 4/5

JSONhỏng1; pageabc0,5; DTOvalidation1; SKUtrùng1; POST vào endpoint chỉGET0,5.

- pageabc là query string không đổi sangint được, không phải đọcJSON rồi tạoDTO. Lỗi trướcController method/Service.
- Method không được endpoint hỗ trợ là405 theo tình huống, không400.
- Bạn xác định đúng vị trí chọnmethod và status400 của lỗiquery nên được nhận phần tương ứng, không mất cả câu.

Đọc bài học mục5–6/9 và Lesson02 mục8.

### Câu3 — 4/5

Ý1:1/2. ĐổiHTTP200 thành404 đúng; phần lý do còn nói thiếuProblemDetail/metadata, trong khi body đã cóProblemDetail.
Ý2/3/4: mỗi ý1đ.

Chữa: **JSONstatus404 không đổi HTTPstatus thật.** Response200 vẫn có thể được client/monitoring hiểu làsuccess; phải trảHTTP404 thật. Không cần thêmfield để chữa lỗi đó.

ProblemDetail giúpclient hiểu/xử lý lỗi an toàn; stacktrace/SQL đểdebug vẫn giữ nội bộ. Đọc mục2–4/9.

### Câu4 — 5/5, mới chấm

| Ý | Điểm | Bằng chứng nội dung |
|---|---:|---|
| 1 | 2/2 | Nêu JSONhỏng vàvalidation ngoàiAppException chưa cùngformat; client còn phảiđoán |
| 2 | 1/1 | Không bắt đổi hết thànhAppException; handler riêng vẫn tạo cùngformat |
| 3 | 1/1 | Fieldname vàmessage dễhiểu gắn với nó đểfrontend hiểnlỗi |
| 4 | 1/1 | Nêu request JSONhỏng vàSKUtrùng/nameblank, kèm kiểm cùngschema lỗi/statusđúng |

Không bắt bạn bổ sungJUnit hoặcpayload chi tiết vì tiêu chí chỉ hỏi request đại diện và điều cần kiểm ở mức tư duy. Dòng cuối “Chỉ liệt kê request, chưa nói kiểm gì” là ghi chú dư; đoạn phía trên đã có “kèm kiểm cùng schema lỗi/status đúng”, nên không xóa điểm của ý đã thể hiện.

Điều cần giữ: **cùngformat không có nghĩa biến mọiexception thành cùngbusiness exception hoặc cùngstatus.**

### Câu5 — 4/5

Ý1/2/3 đủ3đ. Ý4 được0,5 vì chỉ nói lưu nội bộ; ý5 được0,5 vì cóID lỗi nhưng chưa nói tương quan log.

Chữa đủ bằng một đoạn: “Log nội bộ có quyền truy cập phù hợp, che token/password. MãABC gửi client phải có trong log của chính lần lỗi đó để khi client báoABC có thể tra đúng sự cố.”

Không cần chuẩnUUID/công cụtracing. Đọc mục8–9.

### Câu6 — 5/5

Đủ năm ý: filter trướcMVC khôngtựđượcAdvicebắt; startup chưa ready khôngphảirequestbusiness; đãcommit khôngbảođảmviếtlại; Securityriêng; catch-all khôngchứngminhbao phủtoànserver.

Không khái quát thành mọi lỗi trướcController đều ngoàiMVC: binding/validation cóthể trướcmethod nhưng vẫn trongMVC. Không trừ điểm mới vì điều này đã được nhắc như lưu ý, không phải câu trả lời sai mới.

### Câu7 — 5/5

Đủ: nguy cơ mấtmessage/đổi kiểu; kế hoạch tương thích/chuyểnclient; successDTO khôngthànhProblemDetail; cùngformat nhưngstatus400/404/409 cónghĩakhác.

Không bắt code hai phiên bản hoặc thiếtkếdeploy khi đề chỉ kiểm tưduy.

### Câu8 — 5/5

Đủself→Product10, category→Category2, dùnglink thayhardcode, version/page khôngtựlàhypermedia, khôngbắtSpringHATEOAS/HAL.

Liên hệ state/thanh toán là ví dụ ngoài domain, nhưng lợi ích dùng link đúng. Không suy ra API tự sinh link nghiệp vụ khi server chưa thiết kế.

## 4. Ôn đúng phần còn thiếu

- ErrorCode và representation → bài học mục1/4/7 →3phút → kể lại Service→handler→body.
- Queryparam/405 → mục5–6/9 →5phút → phân biệtpageabc vàPOST vàoendpoint chỉGET.
- HTTPstatus/body.status → mục2–4 →3phút → nói vìsao body404 khôngsửaHTTP200.
- ID/log vàbảovệlog → mục8–9 →5phút → clientbáomãABC thìbạntrađâu.

[Bài học](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_03_PROBLEMDETAIL_HATEOAS_REVIEW.md). Không bắt học lại cảlesson hoặc codeproject chỉ để công nhận điểm này.

## 5. Quyết định Lesson03 và module

**Đạt Lesson03:91,25%.** Cả ba lesson M3-1 hiện đều≥85%.
Theo hướng học SE nền choAI hiện hành, có thể chốt **đạt phần kiến thức M3-1** và học module tiếp theo. Không có yêu cầu thi lạiLesson03 để phủ nhận ngưỡng đã đạt.

**Không tuyên bố đã hoàn thành deliverable:** chưa kiểm versioning/pagination/errorformat tích hợp vàmerge trongshopcore. Tiêu chí hoàn thành đầyđủ theo roadmap vẫn giữ, không sửa/xóa để hợp thức hóa. Các điểm yếu còn lại được ghi để ôn trong dự án sau.

Xem [đánh giá tổng module](M3-1-rest-bp__2026-11-21__TONG_KET_MODULE.md) để thấy phạm vi đã đạt và chưa xác nhận.

## 6. Kế hoạch tiếp theo

Không lập kế hoạch học lại3–5ngày vì bài đã đạt. Dành khoảng15–20phút ôn bốn điểm trên rồi tiếpM3-2 theo yêu cầu học tiếp. Không tự tạo lesson mới trong lượt chấm.

## 7. Lịch sử và tiến độ

- Lần1:26/35≈74,29%, chấm7câu.
- Lần2:31,5/35=90%, chấm7câu sau sửa6/7.
- Lần3: thêmcâu4 đạt5đ, tổng36,5/40=91,25%, đủ8câu.
- 05 cập nhật trạng thái đạtphầnhọc, điểm gầnnhấtLesson03, ngày và mộtdònglog.
- 01 đổi trạngtháiphầnhọc vàtick ProblemDetail/HATEOAS ởphạmvi kiếnthức. Khôngtick idempotency đangcònđiểmyếu ởLesson01 hoặc xácnhận deliverable.
