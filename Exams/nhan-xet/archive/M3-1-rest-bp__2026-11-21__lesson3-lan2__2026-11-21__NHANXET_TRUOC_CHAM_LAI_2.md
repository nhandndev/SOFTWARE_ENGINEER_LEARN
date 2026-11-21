# Chấm tạm Lesson 03 — Các câu đã làm

Ngày 2026-11-21. [Đề đang làm](../de-kiem-tra/M3-1-rest-bp__2026-11-21__lesson3-lan2.md), bản TU_DUY_RONG 8câu/40đ. Chấm ý nghĩa, không bắt thuộc framework API.

## 0. Snapshot và phạm vi

[Bài nộp lần chấm này](archive/M3-1-rest-bp__2026-11-21__lesson3-lan2__2026-11-21__BAI_NOP_CHAM_TAM_1.md).

- Đã bắt đầu câu1,2,3,5,6,7,8: mẫu số35đ.
- Câu4 hoàn toàn trống: chưa chấm, không đưa vào mẫu số phần đã làm.
- Câu6/7 đã bắt đầu nhưng còn vế trống: những vế đó chưa có điểm trong câu đã chấm.
- Câu2 có bảng trả lời lặp, có đoạn bị viết vào ô dữ kiện thay vì ô trả lời. Đọc cả hai vị trí, chấm một lần, không trừ lỗi trình bày.
- Không sửa đề hoặc tự điền lời chữa thành bài làm của bạn.

## 1. Điểm tổng và nhóm kiến thức

**26/35 ×100 =74,2857% ≈74,29% phần đã làm.** Mức cần củng cố trong phần đã chấm; **chưa kết luận đạt/trượt toàn Lesson03**.

| Nhóm | Câu | Điểm | Nhận xét |
|---|---|---:|---|
| Vai trò và luồng xử lý lỗi | 1,2 | 8,5/10 =85% | Nắm phần lớn; còn nhầm query param/JSON và405 |
| HTTP/error contract với client | 3 | 4/5 =80% | Chọn sửa404 đúng; lý do còn lẫn với đủ field |
| Privacy và phạm vi xử lý | 5,6 | 6/10 =60% | Hướng an toàn đúng; thiếu log tương quan và các vế giới hạn |
| Client compatibility | 7 | 2,5/5 =50% | Biết nguy cơ vàv2; kế hoạch chuyển/ý3–4 còn thiếu |
| Hypermedia nhận diện | 8 | 5/5 =100% | Đủ các ý được hỏi |
| Thống nhất các nhánh lỗi | 4 | Chưa chấm | Chưa trả lời |

Điểm nhóm thấp do có vế chưa làm không chứng minh bạn đã hiểu sai toàn nhóm. Tách rõ thiếu bằng chứng với sai khái niệm.

## 2. Bảng từng câu

| Câu | Điểm | Kết luận ngắn |
|---|---:|---|
| 1 | 4,5/5 | Hiểu exception/handler/object; chưa nói rõ ErrorCode vẫn cùng tồn tại |
| 2 | 4/5 | Nhầm pageabc thànhJSON/DTO; sai method cần405, không400 |
| 3 | 4/5 | SửaHTTP404 đúng; lý do body404 chưa đủ còn sai trọng tâm |
| 4 | — | Trống, chưa chấm |
| 5 | 4/5 | Đúng500 và không lộ secret; thiếu access/log và liên kết ID với sự cố |
| 6 | 2/5 | Hai ý đầu đúng hướng; ý3–5 trống |
| 7 | 2,5/5 | Đúng nguy cơ mấtmessage; kế hoạch chuyển còn chưa đủ; ý3–4 trống |
| 8 | 5/5 | Hiểuself/category/link, không nhầmversion/page thànhhypermedia |

## 3. Chữa từng câu đã làm

### Câu1 — 4,5/5

| Ý | Điểm | Đọc bài của bạn theo nghĩa |
|---|---:|---|
| 1 | 1/1 | Ném AppException chứa PRODUCT_NOT_FOUND rồi handler mới xử lý thành JSON: phân biệt được exception với response |
| 2 | 1/1 | “Dựa vào loại lỗi… method xử lý đúng phần” và các điểm phát sinh lỗi thể hiện handler xử lý khi có lỗi phù hợp, không hiểu thành middleware bắt buộc mọi request |
| 3 | 1/1 | Nói đúng Object mô tả lỗi; quên chữRFC không bị trừ |
| 4 | 0,5/1 | Đúng rằng không bắt buộc đổi format và cần giữcontract/client; nhưng chưa trả lời cách AppException/ErrorCode và ProblemDetail cùng tồn tại |
| 5 | 1/1 | Throw ngắt happy path, không return success bình thường |

**Bổ sung ý4:** “Không cần bỏ ErrorCode. Service vẫn ném AppException(ErrorCode...), handler đọc enum để lấy thông tin lỗi rồi dựng ProblemDetail gửi client.”

Bạn trả lời về versioning là đúng, nhưng nó là cách đổi public contract, chưa thay cho câu hỏi vai trò business exception và representation. Không bắt viếtcode để nhận phần còn thiếu.

Đọc bài học mục1,4,7.

### Câu2 — 4/5

Mỗi dòng: status0,5; vị trí/Service0,5.

| Dòng | Status | Bước lỗi/Service | Tổng |
|---|---:|---:|---:|
| JSON hỏng | 0,5 | 0,5 | 1 |
| page=abc | 0,5 | 0 | 0,5 |
| DTO nameblank | 0,5 | 0,5 | 1 |
| SKUtrùng | 0,5 | 0,5 | 1 |
| POST vào endpoint chỉGET | 0 | 0,5 | 0,5 |

**Điểm được nhận:** đọcJSON không được và validateDTO trướcController nênService chưa chạy; SKUtrùng kiểm trongService nênService đã chạy. Bạn không viết nguyên cụm “Service chưa chạy” ở mọi dòng, nhưng vị trí đã mô tả đủ rõ để suy ra trực tiếp, không bắt lặp lại cho có chữ.

**Hai sửa quan trọng:**

```text
GET /products?page=abc
page là query parameter dạngchuỗi "abc"
→ không convert sangint được
→ lỗi binding/đổi kiểu trướcController method;Service chưa chạy
→400
```

Không cần đọc JSON hoặc tạo RequestDTO body cho trường hợp query param này. Chưa biết tên exception không sao; nhầm loại input mới là phần cần sửa.

```text
URL có tồn tại nhưng chỉ hỗ trợGET
Client gửiPOST
→HTTP405 Method Not Allowed
```

Không phải400; cũng không phải “mọi không tìm thấy method đều404”. Ở đây framework nhận diện method không được hỗ trợ trên endpoint theo dữ kiện đề. Bạn đã xác định đúng chỗ chọnmethod nên vẫn nhận0,5 ở vị trí.

Đọc bài học mục5–6 và9; liên hệ Lesson02 mục8 về query binding.

### Câu3 — 4/5

- Ý1: **1/2**. Sửa HTTP200 thành404 được1đ. Phần vì sao body.status404 chưa đủ chưa được1đ: bạn giải thích cần thêm ProblemDetail/metadata. Ví dụ đã có ProblemDetail; vấn đề là HTTPstatus và body đang mâu thuẫn, không phải thiếu các field mô tả.
- Ý2: **1/1**. Bạn phân biệt success mang dữ liệu và error mang thông tin lỗi. Nhận đúng vai trò chung, không ép văn mẫu.
- Ý3: **1/1**. ErrorKey ổn định theo contract; detail chỉ giải thích, không nên dùng nguyên câu để phân nhánh.
- Ý4: **1/1**. Không bọcdata theo contract; APIkhác có thể chọnenvelope khác.

**Cách nói đúng ý1:** “HTTPstatus thật vẫn là200 dù JSON cóstatus404. Client/proxy/monitoring nhìnHTTPstatus có thể hiểu thành công, nên phải trảHTTP404 thật.”

Không cần thêm type/title/detail mới sửa được lỗi này. Số trongJSON không có quyền thay statusline củaresponse.

Chỉnh ý2 nhưng không trừ thêm: ProblemDetail giúp **client** hiểu/xử lý lỗi an toàn, không chỉ để dev nhìn vàfix. Stacktrace/SQL đểđiềutra vẫn giữ nội bộ, không đổ raProblemDetail cho dễdebug.

Đọc bài học mục2–4,9.

### Câu5 — 4/5

| Ý | Điểm | Nhận xét |
|---|---:|---|
| 1 | 1/1 | Lỗi bất ngờ phía server→500 đúng |
| 2 | 1/1 | “Lỗi bất xác định” chưa trau chuốt nhưng không lộ kỹ thuật, đáp ứng tiêu chí an toàn |
| 3 | 1/1 | Không gửi thông tin mật vì có thể bị khai thác |
| 4 | 0,5/1 | Lưu nội bộ server đúng; chưa nêu quyền truy cập log/che token/secret |
| 5 | 0,5/1 | “instant” hiểu theo ý làinstance/ID lỗi, không trừ lỗi gõ; thiếu liên kết ID đó với bảnlog của cùng sự cố |

**Bổ sung đủ ý4–5:** “Ghi log nội bộ có kiểm soát quyền truy cập, che password/token. Nếu response có mã lỗiABC thì bản log của chính lần lỗi đó cũng gắnABC, để khi client báoABC mình tra đúng sự cố.”

Không bắt chuẩnUUID hoặc công cụtracing. Tạo ID trongJSON thôi chưa tự làm log có thể tra được bằngID đó. Có thể viết message dễ hiểu hơn: “Không xử lý được yêu cầu lúc này.” Đây là chỉnh cách diễn đạt, không phải lỗi cần trừđiểm thêm.

Đọc bài học mục8–9.

### Câu6 — 2/5

- Ý1 **1/1**: nhận đúng lỗifilter trướcDispatcherServlet không tự đi vàoMVCAdvice, xem xử lý ởfilter/container.
- Ý2 **1/1**: phủ định business request, nhận ra lỗistartup phía server. Đọc theo ngữ cảnh câu đã choappchưaready; không bắt lặp nguyên giả định mới chođiểm.
- Ý3/4/5 **0/3**: chưa trả lời, không gán là bạn đã trả lời sai.

Lưu ý ý1: không khái quát thành **“mọi lỗi trướcController đều ngoàiAdvice”**. JSON/binding/validation có thể lỗi trướcController method nhưng vẫn trongMVC và đượcresolver/Advice xử lý. Mấu chốt câu này làfilter chạy **trướcDispatcherServlet** vàkhôngtựchuyểnlỗivàoMVC.

Ba ý còn thiếu có thể hiểu ngắn:

1. Response đãgửi/commit thìkhông bảo đảm quaylại sửa toànbody/status thànhProblemDetail mới.
2. Securitycócơchế xửlý riêng; mộtMVCAdvice khôngtựchứngminhbao phủnó.
3. Catch-all trongphạmviMVC không cónghĩa bắtđượcmọi lỗi startup/filter/network trênserver.

Đọc bài học mục10. Đây là phần cần bổ sung, chưa yêu cầu code hoặc cấu hìnhSecurity.

### Câu7 — 2,5/5

- Ý1 **1/1**: clientđọcmessage, serverđổifield làmclienthỏng dùbackendcompile: đúng.
- Ý2 **1,5/2**: tạo v2 vàchuyển dần là hướng đúng1đ; “từ từmapping” thể hiện chuyển dần0,5đ, nhưng chưa nói rõ clientcũ cònđượcv1phụcvụ vàclientchuyểnsangschema mới trước khi bỏcũ.
- Ý3/4 **0/2**: chưa trảlời.

**Ý2 đủ:** “Giữ v1 vàformat cũ cho clientchưađổi; thêmv2 theoformat mới. Cho client cậpnhật và xácnhận đãchuyển trước khi ngừngv1.” Không bắt chỉ có cáchURLversioning, cách tương thíchkhác cókếhoạch cũngđược.

**Ý3:** đổi errorformat không bắt successProductResponse/PageResponse thànhProblemDetail; chúng phục vụ hai kếtquả khácnhau.

**Ý4:** cùng cấu trúc lỗi không nghĩa cùngstatus500. Input sai400, resource khôngcó404, trùngSKU409 theo chính contract đề.

Đọc bài học mục2,4,9. Không cần tự code cả hai version để chứng minh hiểu các ý này.

### Câu8 — 5/5

self→Product10:1; category→Category2:1; theo link thay hardcode:1; version/page không tự cóhypermedia links:1; không bắtthưviện/formatduynhất:1.

Ý3 bạn nói sang state/thanh toán không có trong mẫuProduct, nhưng **phần dùng link doAPI cung cấp thay vìhardcode** đã đúng điều được hỏi nên nhận đủ. Không trừ vì ví dụ liên hệ khácdomain.

Chỉnh nhẹ: mẫu này chỉ cho linkself/category, không có dữkiện vềstate thanh toán. Nếu cóAPI cung cấp actionlinks theo trạngthái thì serverphải thiết kế/cung cấp chúng; không phải cứ gắnHATEOAS là linktựđổi theo nghiệpvụ.

Đọc bài học mục11 khi cần; không phải học lại phần này.

## 4. Phác đồ ôn ngắn đúng chỗ

- QueryparamkhácJSON và405 → bài học mục5–6/9 →5phút → kể lại GET?pageabc và POST vàoendpoint chỉGET.
- HTTPstatus khác body.status → mục2–4 →3phút → giải thích mộtcâu vì saoHTTP200/body404 sai dùbodyđủfield.
- Log antoàn/ID liênkết → mục8–9 →5phút → mô tả clientbáomãABC thì tìm bảnlog nào.
- Giới hạnAdvice → mục10 →5phút → bổ sung câu6 ý3–5.
- ErrorCode cùngProblemDetail/chuyểnclient → mục4/7 →5phút → bổ sung câu1 ý4 vàcâu7.

[Bài học](../../Notes/M3_API_Security/M3_1_REST_Best_Practices/LESSON_03_PROBLEMDETAIL_HATEOAS_REVIEW.md). Không yêu cầu học sâu API override/RFC haycode lại project.

## 5. Quyết định

**Phần đã làm cần củng cố:74,29%. Chưa đủ dữ kiện chốt Lesson03**, vì câu4 chưa làm và nhiều vế6/7 còn trống. Không mở modulemới hoặc tickProblemDetail/HATEOAS từ điểm tạm. Giữ nguyên Lesson01/02đãđạt.

Với toàn đề40đ, khi làm/chấm đủ phạm vi cần≥34đ. Không tính26/40 để gọi bạn trượt vì câu4chưalàm; cũng không lấy26/35 để suy ra đãhoànthành8câu.

## 6. Kế hoạch phù hợp với bài chưa hoàn tất

Không bắt học lại cảLesson hay kéo dài3–5ngày chỉ vì phần bài còn trống. Có thể hoàn tất trong một buổi ngắn:

1. Ôn đúng năm mục trên khoảng20–25phút.
2. Sửa hai nhầm lẫn ởcâu2/3 và bổ sung câu1/5/6/7.
3. Làm câu4; câu8 đãđủ, không bắt viếtlại.
4. Gửi chấm lại. Chỉ nếu sau hoàn tất vẫn chưa đạt mới lập kế hoạch ôn nhiều ngày theo phần yếu thực tế.

## 7. Tiến độ và kiểm điểm

- Tổng thô:4,5+4+4+4+2+2,5+5=26/35.
- Đềgốcvàbàilàm giữ nguyên; snapshotđãlưu trước chấm.
- 05: cập nhật trạng tháiLesson03chấmtạm,26/35=74,29% trên7câu, ngày2026-11-21 và mộtdònglog.
- 01: không sửa checklist/trạng thái vì chưa có kết quả đạttoànlesson.
