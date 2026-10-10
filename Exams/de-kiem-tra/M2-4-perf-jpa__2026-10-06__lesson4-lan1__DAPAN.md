# Đáp án M2-4 · Lesson 04

40đ; normalize /40 ×100. Chấp nhận diễn đạt/số bước tương đương, không đòi tên meter thuộc lòng.

| Câu | Rubric 5 điểm |
|---|---|
| 1 | C chờ (1); A trả kịp C có thể mượn (1); hết timeout có thể SQLException (1); pool tái sử dụng (1); close wrapper thường trả pool không đóng vật lý mỗi lần (1). |
| 2 | Không mâu thuẫn, connection timeout là chờ mượn (2); validation kiểm alive (1); lifetime tuổi connection (1); không cắt in-use query vì hết lifetime (1). |
| 3 | Warning không chứng minh leak thật (1); không tự đóng/rollback (1); chậm/lock hoặc transaction/network dài (1); kiểm stack/query/transaction/return lifecycle (2). |
| 4 | 4×15=60>40 (2); tăng không chắc tăng throughput, DB contention (1); tính budget nhiều instance/pool và phần khác (1); instance cũ/mới cùng deploy tăng nhu cầu (1). |
| 5 | 10 là ứng viên trong mẫu (1); p95 thấp hơn và throughput cao hơn (2); 30 DB CPU cao/kết quả xấu dù pending thấp (1); kiểm budget tổng instance và đo lặp cùng điều kiện, không kết luận universal (1). |
| 6 | p95 khoảng 95% request mẫu không vượt mốc, không phải max (2); B tốt hơn trong điều kiện này, không universal (1); data+count hai query hợp lý (2). |
| 7 | Dataset đại diện (1); cùng môi trường/cache/concurrency/warm-up (1); response đúng (1); nhiều lần và SQL/latency/throughput/error/pool (1); thay fetch trước, giữ fetch rồi thử pool trong budget (1). |
| 8 | Không giữ chỉ vì query ít (1); kiểm join/row/payload/memory, DB plan, pool wait hoặc điều kiện đo (2 cho ba hướng hợp lý); đo lặp điều kiện cùng và kiểm data (1); bảng giả định không phải benchmark đã chạy (1). |

Đọc lại: 1 mục 1–2; 2–3 mục 3–4; 4–5 mục 5; 6 mục 8; 7 mục 7/9; 8 mục 7–9. Không yêu cầu triển khai Actuator/load tool để đạt đề này.

## Quy tắc chấm

Áp dụng [chấm nghiêm theo từng ý](../../Notes/M2_Database/QUY_TAC_CHAM_NGHIEM_M2_3_M2_4.md). Không chấp nhận kết luận hiệu năng tuyệt đối từ bảng giả định hoặc chỉ một chỉ số.

## Bài giải từng câu

### Câu 1 — Chờ mượn khác tạo connection mới vô hạn

**Đáp án đủ ý:** Vì max2 và A/B đang giữ cả hai, C phải chờ connection khả dụng. Nếu A trả kịp và connection dùng được, C có thể mượn nó; nếu hết thời gian chờ mà không mượn được thì getConnection có thể ném SQLException, có thể được tầng trên wrap. Pool tái sử dụng connection vật lý; close connection wrapper thường trả nó về pool, không đóng vật lý và mở mới mỗi request.

**Chấm nghiêm:** “C tự tạo connection thứ3 vượt max” sai. Chỉ viết “timeout” mà không phân biệt mượn/trả thiếu các điểm lifecycle. Không bắt thuộc tên exception Spring bao ngoài.

### Câu 2 — Ba đồng hồ đo ba việc khác nhau

**Đáp án đủ ý:** Không mâu thuẫn: connection-timeout3000ms là thời gian chờ mượn từ pool, không giới hạn query đã mượn còn3 giây. Validation-timeout giới hạn thời gian kiểm connection còn alive. Max-lifetime giới hạn tuổi connection trong pool; Hikari không retire connection đang in-use chỉ vì chạm tuổi, thường xử lý khi được trả về. Muốn giới hạn SQL cần cơ chế query/statement timeout phù hợp, không dùng nhầm timeout mượn.

**Chấm nghiêm:** “Query8 giây vi phạm connection-timeout3 giây” sai tiêu chí chính. Không bắt trình bày cấu hình statement timeout vì đó là giải thích bổ sung ngoài đề.

### Câu 3 — Leak warning là dấu hiệu cần điều tra

**Đáp án đủ ý:** Warning khi mượn quá10 giây không tự chứng minh leak vĩnh viễn; đề nói connection trả sau12 giây. Hikari leak detection không tự đóng/rollback thay ứng dụng. Có thể query chậm/lock, transaction quá dài hoặc gọi network chậm. Kiểm stack lúc acquire, SQL/lock, phạm vi transaction và đường trả connection/close để xác định leak thật hay chỉ giữ quá lâu.

**Chấm nghiêm:** “Cứ warning là không bao giờ trả” sai. Phải nêu ít nhất hai nguyên nhân khác và hướng kiểm, không chỉ viết “xem log”.

### Câu 4 — Ngân sách connection tính toàn hệ thống

**Đáp án đủ ý:** Trần cấu hình4×15=**60**, vượt ngân sách40 cho app; không có nghĩa cả60 luôn mở cùng lúc nhưng cấu hình có thể gây vượt tải/không đủ slot. Tăng pool không chắc tăng throughput vì CPU/IO/lock contention của DB. Cần tính tất cả instance/pool và ngân sách phần khác; rolling deploy có instance cũ/mới cùng sống nên mức đỉnh có thể lớn hơn trạng thái ổn định.

**Chấm nghiêm:** Tính15 mà bỏ số instance sai tổng. Chọn tăng max_connections/pool mà không xét tài nguyên chưa giải quyết điều kiện budget. Không bắt chọn một con số pool tối ưu từ dữ kiện chưa đủ.

### Câu 5 — Chọn ứng viên từ nhiều chỉ số

**Đáp án đủ ý:** Chọn10 để kiểm tiếp: p95=250ms thấp nhất, throughput140req/s cao nhất trong mẫu; pending thấp, CPU70% còn khác30 với CPU98%, p95600ms và throughput110. Pool30 pending thấp không chứng minh tốt nếu DB bị đẩy vào contention/bão hòa. Trước áp dụng thật phải kiểm tổng connection qua nhiều instance và đo lặp cùng workload/cache/warm-up, xem lỗi và độ ổn định;10 không là đáp án universal cho mọi máy.

**Chấm nghiêm:** Chỉ chọn10 không có lý do chưa đủ điểm. Nhắc p95 và throughput phải đọc đúng hướng tốt/xấu. Không được suy từ CPU98% một mình thành chắc chắn nguyên nhân cụ thể; cần đo thêm.

### Câu 6 — p95 không phải max, hai SQL không phải N+1

**Đáp án đủ ý:** p95 là mốc percentile95: khoảng95% request trong mẫu có latency không vượt mốc đó, không phải request chậm nhất hay trung bình. B tốt hơn A về các chỉ số được cho trong cùng điều kiện: p95 giảm520→140ms, throughput tăng80→130, lỗi đều0%. Không suy ra B luôn nhanh hơn dưới mọi tải. Page có query content và query count là hai query hợp lý để trả dữ liệu cùng metadata; N+1 là pattern tải quan hệ phụ theo số phần tử, không phải “bất cứ số query nào lớn hơn1”.

**Chấm nghiêm:** Định nghĩa p95 là95% request đều đúng140ms hoặc là max sai ý. Chỉ nói2 query là N+1 mất điểm phân biệt Page.

### Câu 7 — Thử từng thay đổi để biết tác dụng

**Đáp án đủ ý, một kế hoạch 6 bước:**

1. Chuẩn bị dataset đại diện: số Product/Category, số quan hệ và phân bố hợp lý.
2. Cố định endpoint, môi trường, concurrency, cache/warm-up và pool khi so fetch plan.
3. Kiểm content/ID/null/order/metadata response vẫn đúng trước khi so tốc độ.
4. Đo bản trước nhiều lần, ghi SQL/request, latency percentile, throughput/error và pool active/pending/timeouts.
5. Chỉ đổi fetch plan, chạy lại cùng điều kiện nhiều lần và so kết quả; không chọn một lượt đẹp nhất.
6. Sau khi cố định fetch plan, thử các pool size trong budget tổng instance, đo lại từng mức để tách tác động pool khỏi query change.

**Chấm nghiêm:** Đổi query và pool cùng lúc rồi quy mọi cải thiện cho một yếu tố thiếu điểm thiết kế phép đo. Không kiểm response đúng thiếu tiêu chí tính đúng. Không yêu cầu cài công cụ benchmark cụ thể.

### Câu 8 — Điều tra khi số SQL và latency đi ngược chiều

**Đáp án đủ ý:** Không giữ chỉ vì query ít. Ba hướng điều tra, chẳng hạn: (1) JOIN nhân row/tải nhiều dữ liệu gây hydration, memory/GC; (2) DB plan/index/lock làm query mới chậm; (3) pool wait hoặc workload/cache/warm-up khác khiến phép so lệch. Cần đối chiếu response đúng, row/payload, plan/thời gian SQL, tài nguyên/pool và đo lặp trong cùng điều kiện. Bảng giả định chỉ để luyện đọc số, không được báo đã benchmark thật.

**Chấm nghiêm:** Một hướng kiểm chỉ được điểm tương ứng, không tính ba từ đồng nghĩa là ba nguyên nhân. “Chắc chắn N+1 đã hết nên mặc kệ p95” sai quyết định. Chấp nhận ba hướng hợp lý khác nếu có bằng chứng kiểm phù hợp.
