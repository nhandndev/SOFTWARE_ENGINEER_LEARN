# Kiểm chất lượng M3-5 · 2026-10-07

## Roadmap và phạm vi

Đủ năm checklist: chọn WebClient; timeout/retry/error mapping; springdoc/OpenAPI annotations; UI/export; Bearer scheme. Bốn lesson tương ứng bốn buổi14h. Không codegen contract-first, không dựng project mới, không giả đã hoàn thành deliverable shopcore.

## Đối chiếu câu hỏi với bài đã dạy

| Bài | Câu → mục trong lesson |
| --- | --- |
| 1 | 1→1;2→3;3→2/5/7;4→6;5→4;6→4;7→6;8→7 |
| 2 | 1→1;2→1/4/5;3→2;4→3;5→2;6→3/4/6;7→4/5;8→6/7 |
| 3 | 1→1/3;2→2;3→3/7;4→4/7;5→5;6→6;7→5;8→6/7 |
| 4 | 1→1;2→2;3→3;4→4;5→3/6;6→5;7→6;8→5/6/7 |

Đề PHONG_VAN theo lesson 8×5=40đ; đáp án từng câu và rubric không yêu cầu thuộc imports/annotations. Không hỏi code framework chưa dạy hoặc tự đổi policy upstream/status trong lúc chấm.

## Ranh giới đã đọc soát

- MVC server khác WebClient; block giữ servlet thread, không nonblocking end-to-end.
- Provider contract giả lập ghi rõ, không giả host.example là API chạy được.
- Provider DTO khác local DTO/entity; credential không forward theo user tùy tiện, tránh SSRF/redirect secret.
- Connect khác attempt/overall; retry 1 nghĩa tối đa2 calls, có filter/backoff/jitter/budget.
- GET an toàn theo contract không làm POST payment tự an toàn retry; timeout không chứng minh remote chưa làm.
- Provider 401 khác local auth 401; invalid/empty body không fee0 giả success.
- OpenAPI mô tả khác runtime validation/security/serialization.
- Bearer scheme requirements theo operation, security array rỗng khác scopes rỗng; docs paths khác API paths/chain.
- UI200 không chứng minh spec/runtime đúng; curl --fail không tự bắt302, phải kiểm JSON.
- Mock ExchangeFunction không chứng minh transport/DNS/TLS; không claim snippet là app đã tích hợp.

## Kiểm tự động

- Kiểm17 Markdown gồm index chung:24 link nội bộ hợp lệ;32 câu có ô trả lời;32 dòng rubric đủ5đ, numbering1–8 đúng; JSON parse được, fences/whitespace hợp lệ.
- Parse ba block YAML và một block XML bằng Ruby YAML/REXML. YAML security là fragment có chủ đích, không claim là full OpenAPI document hợp lệ.
- Biên dịch7 snippet Java trích nguyên từ lesson, thêm imports/class wrappers và interface stub ShippingService cho Controller. `javac --release21`, Lombok1.18.46, Swagger annotations2.2.43. Cache WebClient hiện chỉ có Framework6.1.1/Reactor3.6.0/Jackson2.15.3, nên dùng cache này để kiểm API/pipeline; **không phải kiểm runtime Boot4.1.1/Framework7/Jackson3**. Không thay dependency app về các version cache.
- Chạy14 fixture scenarios,98 assertions (gồm kiểm lặp URL/query/header ở từng attempt):503→200;404;401;429;503 đến hết retry;empty body;invalid JSON;amount âm;currency sai;204;302;body vượt codec limit;media type sai;treo tới deadline. Kiểm thêm annotation scheme. Tất cả qua.
- Đã bổ sung mapper WebClientResponseException vì body/codec failure có thể được bọc trong exception response dù status200; test oversized body/media type giúp không lọt lỗi này thành 500 chung.
- Các fixtures dùng ExchangeFunction, không gọi network. Chưa kiểm connect 300 ms/TLS/redirect/socket thật, chưa sinh spec qua springdoc runtime hoặc mở Swagger UI. Timeout test chỉ kiểm trả lỗi và số attempts có giới hạn, không hard realtime.
- Đọc soát coverage theo bảng: mỗi câu bám mục đã dạy; đặc biệt mock-vs-network đã dạy ngay bài 2 trước khi hỏi.

## Giới hạn

Không sửa POM/code hoặc chạy app shopcore; không credentials/provider thật; không boot-test springdoc3.1.1 với Boot4.1.1. Tài liệu dùng nguồn official hiện tại, cache biên dịch nếu khác version sẽ ghi rõ. Snippet Controller chưa implement ShippingService, lỗi schema chỉ có descriptions và đã chỉ rõ cần hoàn thiện body theo handlers thật.

Nguồn Spring/Reactor/springdoc/OpenAPI có trong từng lesson. Video là từ khóa tìm, không claim đã xem hoặc verify. Không đổi progress/checklist/capstone.
