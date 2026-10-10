# Bài giải / rubric · M6A-1 Clean Code Lesson 5

40 điểm, đạt 34. Mỗi tiêu chí 1 điểm: đủ và đúng = 1; đúng hướng nhưng thiếu điều kiện = 0,5; sai/thiếu = 0. Chấm ý nghĩa tương đương, không ép câu chữ; không cap ngầm. [Bài học](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/LESSON_05_REAL_REVIEW_REFACTOR_LOG.md) · [Quy tắc chấm](../../Notes/M6A_Clean_Code_Patterns/M6A_1_Clean_Code/QUY_TAC_CHAM.md).

## Rubric công khai

| Câu | Năm tiêu chí độc lập |
|---|---|
| 1 | Nêu duplication quan sát được (1); Không tự gọi cả class God Class (1); Đề xuất extraction nhỏ hoặc giữ có lý do (1); Phân biệt source observation với runtime evidence (1); Chưa sửa thì status Proposed (1) |
| 2 | Giữ business code/message/status từ enum (1); Giữ framework error contract riêng (1); Helper construction không nuốt mapping quyết định (1); Không ép mọi error vào enum để đủ abstraction (1); Kiểm từng handler output/status (1) |
| 3 | First sang list là API behavior/schema change (1); Thêm JSON field là contract enhancement cần xét (1); Không gom vào refactor thuần (1); Giữ contract hoặc có requirement/migration rõ (1); HTTP contract tests/client compatibility (1) |
| 4 | Giữ mapping specific exceptions (1); Business status không tất cả400 (1); Unknown generic error contract riêng (1); Không lộ stack/secret vào response (1); Kiểm annotation selection bằng MVC phù hợp (1) |
| 5 | AppException status/code/message enum (1); Validation first/fallback/400 (1); Parameter và unreadable giữ code riêng (1); Unknown generic response và logging policy (1); Phân biệt unit helper với MVC contract mapping (1) |
| 6 | Status Proposed/chưa thực hiện (1); Ghi evidence/file và transformation (1); Ghi behavior giữ/tests planned/gaps (1); Fee QA không chứng minh handler/shopcore xanh (1); Không chia1 duplication thành5 thành tích hoặc claim merged (1) |
| 7 | Dừng khi mục tiêu clarity đạt (1); Abstraction cần complexity thực (1); Không Big Bang/rewrite ngoài scope (1); Giữ diff nhỏ và user changes (1); Tách API/transaction changes hoặc giữ/revert có lý do (1) |
| 8 | Tách trách nhiệm parse/retrieval/provider/mapping có lý do (1); Model/prompt/retry/budget đổi behavior/cost (1); Tách khỏi refactor thuần (1); Fake unit không chứng minh output model tương đương (1); Cần integration/evaluation phù hợp và log gaps (1) |

## Câu 1 · Handler của bạn có gì thật?

Builder/response construction lặp là observation thật, không tự chứng minh God Class. Có thể extract private helper giữ từng handler hoặc giữ nếu rõ hơn. Chưa test/runtime/sửa thì ghi Proposed và gap, không claim behavior đã được xác minh.

## Câu 2 · ErrorCode chỉ business errors

Helper chỉ gom construction; AppException vẫn enum values, framework validation vẫn contract riêng. Không thay lựa chọn code/message/status hoặc ép enum hóa mọi error khi không cần. Test từng output/status; respect style business/framework separation của người học.

## Câu 3 · First error sang all errors

First→list đổi response behavior/schema; thêm requestId cũng là enhancement phải xét compatibility. Có thể làm nếu được yêu cầu nhưng tách khỏi structural refactor và test/client plan riêng. Giữ original contract nếu mục tiêu chỉ gom builder.

## Câu 4 · Một handler chung trả400

Gom construction không cho xóa mapping. Business404/409 và unknown generic500 giữ theo contract/ErrorCode; không dump exception/secret. Specific annotations và selection cần MVC test, gọi helper trực tiếp chưa chứng minh Spring dispatch đúng.

## Câu 5 · Baseline test handler

Kiểm business enum values; validation first/fallback và400; parameter/body code riêng; unknown generic response không lộ chi tiết và log policy. Unit helper chỉ construction, MVC contract test bảo selection/status/JSON. Dùng enum thật bản mới, không đoán mã tự tạo.

## Câu 6 · Log viết Done hay Proposed?

Ghi Proposed với evidence/file, transformation và behavior giữ, planned tests/gaps. Sample fee QA không test handler của người học. Chưa implementation/test/merge thì không Done/PASS; cần5 issues có evidence thật, không xé1 duplication thành5 cho đủ số.

## Câu 7 · Khi nào dừng?

Nếu mục tiêu đã đạt và factory không giảm complexity, dừng/giữ private helper là hợp lý. Không rewrite packages ngoài scope hoặc đụng user changes. Diff nhỏ dễ review; API/transaction task riêng, có thể revert abstraction làm khó đọc hơn.

## Câu 8 · Clean pipeline AI có đổi prompt?

Tách trách nhiệm hữu ích nếu boundary thật, nhưng model/prompt/retry/token budget đổi output/cost nên là behavior change riêng. Fake unit deterministic chỉ kiểm logic đã mô phỏng, không equivalence chất lượng model. Cần integration/evaluation phù hợp và ghi giới hạn, không claim bằng unitOK.

