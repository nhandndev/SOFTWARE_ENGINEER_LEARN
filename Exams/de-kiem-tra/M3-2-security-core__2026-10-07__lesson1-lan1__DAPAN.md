# M3-2 — Bài giải Lesson01

40đ; normalize /40×100. [Chấm nghiêm](../../Notes/M3_API_Security/M3_2_Security_Core/QUY_TAC_CHAM.md). Đây là đáp án, chưa phải điểm người học. Các giải thích bổ sung không tự tạo yêu cầu ngoài rubric.

| Câu | Rubric5đ |
|---|---|
| 1 | Authn xác minh danh tính (1); authz kiểm quyền (1); authn thành công/authz thất bại (1);403 (1); Controller không chạy (1). |
| 2 | Filter/proxy/chain trướcMVC (2); authentication rồi authorization trong flow rút gọn (1); được phép mớiMVC/Service (1); Advice không tự bắt lỗi trướcMVC (1). |
| 3 | Base64 đảo ngược không encryption (1); Basic không tựJWT/refresh (1); filter/provider kiểm trướcMVC (1); HTTPS bảo vệ truyền tải (1); không log header vì lộ credentials (1). |
| 4 | Thiếu401, sai401, thiếurole403 (2); phân biệt authn/authz đúng (1); entry point/denied handler đúng vai trò (1); Controller không cần chạy để kiểm password các case này (1). |
| 5 | Trước là request credentials chưa tin, sau là kết quả principal/quyền (2); context giữ authentication (1); không DB/responseDTO (1); persistence tùy policy không mặc định vĩnh viễn (1). |
| 6 | Sai Basic có thể401 trước permitAll (2); permitAll chỉ authorization không bỏchain (1); ignoring bỏchain khác (1); CORS/CSRF/auth filters còn có thể tác động (1). |
| 7 | URL ngoài chain không tự bảo vệ khi khôngfallback (1); chỉ chain đầu match (1); chain cấu hình filters/rules (1); không tựUsertable (1); không tựhash đăng ký (1). |
| 8 | Business error không thiếurole (1); MVC Advice AppException404 (1); URL/method/chainrule (1); auth/authorities an toàn (1); CSRF/CORS và Controller breakpoint (1). |

## Câu 1 — Password đúng, quyền chưa đủ
**Đủ ý:** Authn xác nhận Lan là ai bằng credentials; authz xét Lan có được gọi admin không. Authn thành công, authz thất bại vì chỉROLE_USER;403, chưa vàoController.

**Chấm nghiêm:** “Sai password nên403” không nhận điểm lý do. Không cho đủ5 chỉ vì đoán đúng403. Đọc L01 mục1/4.

## Câu 2 — Cổng trước MVC
**Đủ ý:** Request → Servlet filters → DelegatingFilterProxy → FilterChainProxy chọn chain → filter authentication/provider → authorization rule → DispatcherServlet → Controller/Service nếu được phép. Lỗi chặn trước MVC không tự đi vào MVC Advice; Security dùng handler phù hợp. Không bắt chép đúng tên proxy nếu mô tả rõ việc nối và chọn chain.

**Chấm nghiêm:** Đặt Security ở sau Controller sai vị trí. Không bắt kể toàn bộ filter order; diagram là flow rút gọn. Đọc L01 mục2–4.

## Câu 3 — Encoding không bảo mật credentials
**Đủ ý:** Base64 dễ decode, không encryption. Basic gửi credentials để filter/provider kiểm trước MVC, không sinh JWT/refresh. HTTPS bảo vệ trên đường truyền; log raw Authorization làm lộ username/password cho người đọc log.

**Chấm nghiêm:** “Đã Base64 nên HTTP đủ an toàn” sai. Hash lưu DB và Base64 truyền header khác nhau, không thay thế HTTPS. Đọc L01 mục3.

## Câu 4 —401 khác403 trong dữ kiện đã loại CSRF
**Đủ ý:** Thiếu credentials401, password sai401; user đã auth nhưng thiếu ADMIN403. EntryPoint xử lý cần/thất bại auth, DeniedHandler cho user auth không quyền. Các case chặn ở filter, không cần Controller tự so password.

**Chấm nghiêm:** Rubric2đ cho ba status chia0,75/0,75/0,5 nếu cần chấm một phần. Không suy ra mọi403 thực tế đều do role; đề đã loại CSRF/CORS. Đọc L01 mục4.

## Câu 5 — Kết quả xác thực trong context
**Đủ ý:** Trước kiểm chứng là authentication request với credentials chưa tin; thành công có principal/authorities đã xác nhận. SecurityContext giữ Authentication cho luồng thực thi, không là bảngUser hoặc DTO public. Cách nhớ qua request khác phụ thuộcsession/stateless; không mặc định tồn tại mãi.

**Chấm nghiêm:** Không lấy raw password làm danh tính “đã tin”. Chưa cần mô tả repositorysession chi tiết bài04. Đọc L01 mục3.

## Câu 6 —Public vẫn có filter
**Đủ ý:** Basic filter có thể từ chối header sai trước authorization nên không chắc200; permitAll chỉ cho phép ở rule, không bỏ auth/CORS/CSRF. Ignoring bỏ security chain cho request khác với permitAll.

**Chấm nghiêm:** “Public không bao giờ kiểm gì” sai. Nêu không credentials được qua chưa giải case header sai. Đọc L01 mục5.

## Câu 7 —Phạm vi chain có giới hạn
**Đủ ý:** Chỉ /api/** không bao /admin/stats và không fallback thì không có chain đang xét bảo vệ URL đó. Nhiều chain match chỉ dùng đầu tiên. Bean chain cấu hình filters/rules, không tự tạo bảng User hay hash password đăng ký.

**Chấm nghiêm:** Không suy từ auth config bean thành DB đã có table. Không yêu cầu code fallback chain. Đọc L01 mục6.

## Câu 8 —Auth qua rồi vẫn có nghiệp vụ lỗi
**Đủ ý:** Service phát hiện thiếu Product là business404 qua MVC Advice AppException, không thiếu role. Request403 khác: kiểm URL/method và chain/rule matched; authentication/authorities không log credentials; xem CSRF/CORS và Controller breakpoint có vào không.

**Chấm nghiêm:** “Thêm ADMIN là chữa PRODUCT_NOT_FOUND” sai tầng. Chỉ “xem log” không nêu bằng chứng không đủ ba điểm debug. Đọc L01 mục4/7.
