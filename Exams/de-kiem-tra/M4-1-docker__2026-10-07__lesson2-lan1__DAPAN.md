# Đáp án M4-1 · Lesson 02

8 × 5=40đ, đạt 34/40; chấm mechanism, không yêu cầu thuộc Dockerfile nguyên văn.

| Câu | Rubric /5 |
|---|---|
| 1 | -f không đổi context cuối lệnh (2); COPY trong context (1); hẹp giảm tải/rủi ro file (2) |
| 2 | Build có Maven/JDK (1); runtime JRE/JAR (1); copy artifact rõ (1); tools/cache không tự theo (1); chưa tách Boot layers (1) |
| 3 | Compile/runtime mismatch (2); executable Boot JAR đúng (1); wildcard nhiều artifact rủi ro (1); path theo version hoặc tên ổn định (1) |
| 4 | Giảm privilege (1); quyền đọc artifact (1); process/signal exec form (2); mounts permissions vẫn kiểm (1) |
| 5 | Source invalid src/package (1); POM invalid dependency (1); phân biệt layer reuse (không chạy lại bước) với cache mount (tái dùng dependency khi bước chạy lại) (3). Reproducibility là lưu ý thêm, không yêu cầu ngoài câu hỏi. |
| 6 | Context ignore vs Git tracking (2); rm không xóa secret layers cũ (1); không COPY/ENV/ARG secret (1); runtime/build secret cơ chế phù hợp (1) |
| 7 | go-offline không mọi plugin/profile (2); skip không chạy test nên không chứng minh pass (2); mutable dependencies/base ảnh hưởng repeatability (1). CI test gate là hướng áp dụng, không điều kiện điểm ngoài đề. |
| 8 | Container cũ giữ image cũ (2); recreate từ image mới (1); context/ignore/path build lỗi (1); logs/config runtime khác (1) |

## Câu 1

Context là argument cuối `.`, -f chỉ chọn Dockerfile. Root học khác shopcore context về file gửi/path COPY; COPY không lấy tùy ý ../ngoài context. Giữ hẹp giảm build overhead và file nhạy cảm tới builder.

Ôn lesson 2 mục1.

## Câu 2

Builder compile/package bằng Maven/JDK; runtime từ JRE và copy đúng JAR qua COPY --from. Chỉ artifact chọn được chuyển, không tự chứa .m2/Maven/source. Đây multi-stage packaging, chưa tối ưu layers nội bộ Boot archive.

Ôn mục2–4.

## Câu 3

Runtime 17 có thể không đọc class target 21, gây UnsupportedClassVersionError. Cần executable Boot JAR theo plugin đúng; wildcard có thể chọn nhiều/plain/original JAR sai. Version POM đổi thì sửa path hoặc cấu hình tên artifact ổn định và kiểm packaging.

Ôn mục3–4, 8.

## Câu 4

Non-root giảm quyền process; chown/quyền đảm bảo đọc artifact. Exec-form để Java là process chính nhận stop signal; java & rồi shell thoát có thể làm container dừng/quản lý signal sai. Volume/secret mount permissions riêng vẫn cần kiểm, USER app không tự sửa mọi mount.

Ôn mục4.

## Câu 5

Sửa Java thường invalid src/package nhưng giữ POM/dependency layer khi input trước không đổi; sửa POM invalid dependency và các bước phụ thuộc. Cache mount giữ Maven artifacts để step chạy lại tái dùng, khác bỏ hẳn step nhờ layer cache. Không bảo đảm mọi build luôn reuse hoặc reproducible.

Ôn mục5.

## Câu 6

.dockerignore lọc context, .gitignore quản Git tracking. Secret copy vào layer/cache rồi rm không đảm bảo xóa vết cũ. Không COPY/ENV/ARG secrets; runtime secret mount hoặc build secret cơ chế đúng khi cần. Ignore không xóa history đã commit.

Ôn mục6.

## Câu 7

go-offline tải trước nhiều thứ, không bảo đảm mọi plugin/profile hoàn toàn offline. skipTests không test pass; CI cần chạy test gate. Tag/snapshot/dependency mutable vẫn có thể làm build khác dù cache nhanh; version/digest/policy giúp quản lý.

Ôn mục4–5.

## Câu 8

start container cũ không cập nhật image vừa rebuild. Recreate đúng service/container từ image mới. COPY not found là context/ignore/path build; app đã build rồi exited thì đọc logs/config/runtime. Không dùng rebuild vô hạn chữa mọi lỗi.

Ôn mục7–8.
