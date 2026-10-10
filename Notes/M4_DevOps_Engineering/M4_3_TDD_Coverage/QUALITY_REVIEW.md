# Kiểm chất lượng M4-3

Ngày soạn/kiểm: 2026-10-07. Phạm vi:4 lesson,4 đề PHONG_VAN,4 đáp án,32 câu. Đây là kiểm tài liệu, không chấm học viên.

## Task01: TDD

Đối chiếu Lesson01 câu1–8: test-first khác test-after; Red behavior khác setup; dưới/tại/trên ngưỡng; oracle/assertion; BigDecimal scale; refactor; assertThrows; evidence. Contract có0 hợp lệ và null/âm lỗi rõ. Test class đầu được thay bằng suite hoàn chỉnh, không tạo class trùng. Parameterized suite7 invocations, không lẫn số method.

## Task02: Tầng test

Đối chiếu Lesson02 câu1–8: unit/slice/integration; mock không SQL; quantity/exception/interaction; MVC stub; binding abc khác0; flush/clear/commit; server thread transaction; contextLoads/network scope. Controller snippet được ghi rõ prerequisite, imports thiếu và Security assumption; không giả vờ project hiện có endpoint/JPA. Common API trong fixture chỉ stub đúng signatures, không chứng minh handler HTTP thật.

Đã phát hiện self-attach Mockito bị sandbox chặn khi chạy harness mặc định; bổ sung lưu ý explicit agent, giữ argLine JaCoCo và chạy lại đúng JDK21. Không gọi lỗi setup này là business Red hoặc sửa test để che lỗi.

## Task03: Coverage

Đối chiếu Lesson03 câu1–8: số đếm metric/scope; line/branch; bundle không từng class; agent/report/check; argLine/fork; missing-data; excludes; đúng run. Gate LINE BUNDLE0.70 được ghi rõ, không tráo với branch70. POM fragment được merge, không là full POM thay project. JaCoCo0.8.13 là pin ổn định cho ví dụ Java21, không claim latest; docs trunk có SNAPSHOT không được copy version đó.

## Task04: CI và test có ích

Đối chiếu Lesson04 câu1–8: tests/coverage fail độc lập; skip/no-data; discovery/Failsafe; artifact; publish/event/needs; meaningful assertions; deterministic data/AI eval boundary; deliverable evidence. Shell file guards bổ sung chứ không thay JaCoCo check. Artifact always không làm verify xanh. Full workflow ở đây chỉ verify, publish ghép từ M4-2, không bịa có GHCR run.

## Rubric và fairness

32 câu đều có dữ kiện và các ý lấy điểm đã dạy. Mỗi câu5đ, mỗi đề40đ, đạt34/40; partial score theo từng ý. Đã thêm yêu cầu assertion/case và cách kiểm sau sửa vào L03 câu2/câu5 để khớp rubric, không giữ ý chấm ngầm. Không yêu cầu memorized annotation/version hoặc code production hoàn chỉnh cho đề PHONG_VAN.

## Verification

Đã kiểm trên JDK21.0.11, compile release21; fixture dùng JUnit6.0.3, Mockito5.23.0 (explicit agent), Surefire3.5.6, Failsafe3.5.5 và JaCoCo0.8.13. Đây là dependencies của fixture QA, không ghi đè BOM project.

| Case chạy | Kết quả thực tế |
|---|---|
| Stub trả30000 ở ngưỡng500000 | Assertion fail đúng lý do, không compile/setup failure |
| Policy hoàn chỉnh |7 invocations pass |
| Policy+Service unit |10 invocations pass, common API stub đúng signature |
| Chỉ một test pass, coverage thấp | LINE ratio log0.31 <0.70, JaCoCo check fail |
| ArgLine mất agent trên clean run |7 tests pass, report/check skip missing data, Maven exit0; file guards từ chối thiếu exec/XML |
| Không phát hiện tests với failIfNoTests | Maven fail đúng “No tests were executed” |
| Fault đổi>= thành> | Test tại500000 fail assertion |
| Restore toàn suite | Tests/coverage pass, không hạ threshold |
| Thêm IT convention/Failsafe | Surefire10 + Failsafe1 pass; intentional IT failure bị verify chặn; restore pass |
| XML cuối parse bằng REXML | LINE covered19/missed0 ở fixture, không phải coverage shopcore |
| Kiểm cấu trúc |17 Markdown gồm index chặng,32 questions/slots,32 rubric đủ5đ,26 local links; không lỗi |
| Workflow | actionlint1.7.7 pass; không chạy ShellCheck/Pyflakes hoặc GitHub remote |

Harness bản đầu restore policy tests nhưng còn Service production mà chưa restore Service tests: bundle gate fail42% là đúng. Đã sửa harness restore toàn suite, không sửa scope/threshold để ép xanh. Lỗi self-attach đã được ghi ở Task02; bản chạy cuối dùng đúng JDK21/explicit Mockito agent.

Harness tái hiện tại `verify-examples.mjs`, tạo fixture/log ở thư mục tạm, không sửa shopcore. Cần Node, Maven, JDK21 và cached dependencies tương ứng khi chạy offline. `verify-structure.mjs` chạy độc lập không cần Maven.

## Kết luận sau kiểm

Coverage roadmap đủ trong4 lesson; không thêm PIT/multi-module hoặc ép học lại toàn M1-6. Các lỗi kiểm thử phát hiện đã xử lý, đề/rubric khớp sau lượt cuối. Đạt kiểm tài liệu và các case runtime phạm vi fixture nêu trên, không là chứng nhận toàn ứng dụng/CI production. Fixture IT của Lesson04 chỉ kiểm lifecycle/plugin/agent, không kiểm DB integration.

## Bảo toàn và Vault

38 checksum lịch sử gồm roadmap và37 đề đã có giữ nguyên. 41 dòng trạng thái/điểm/ngày kiểm tra giữ nguyên; chỉ nhãn tài liệu M4-3 đổi thành “Đã có đề + lesson” theo yêu cầu quản lý tiến độ trước đó. Không sửa shopcore/POM, không tự tick checklist.

Đã copy và đối chiếu byte20 file (bộ Notes mới,8 đề/đáp án, index chặng và05) sang `Documents/Learning_Vault/Software_Engineer`. Hai bản đích cũ được giữ tạm ở `/private/tmp/m43-vault-before-sync`; không xóa dữ liệu khác. Đồng bộ này không thay cơ chế sync thường ngày.

## Giới hạn

- Không sửa POM/source thật, không chạy feature trên shopcore.
- Không chạy full Boot MVC slice/Security/JPA/PostgreSQL/HTTP server trong harness này; các đoạn đó là snippet/pseudocode có giả định rõ.
- Không chạy remote Actions, push image, branch protection hoặc GitHub credential; lint local không thay remote CI.
- Không đánh dấu deliverable đã làm/merge, không cho module pass; Testing M1-6 vẫn hoãn.
- Không tuyên bố không thể còn lỗi; ghi cụ thể coverage kiểm và nguồn official trong từng lesson.
