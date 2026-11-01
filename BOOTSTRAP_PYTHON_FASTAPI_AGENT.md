# Khởi tạo hệ thống học Backend Python/FastAPI từ repo tham khảo

> File bàn giao cho **người học mới và agent của họ**. Chỉ cần gửi file này, không bắt buộc gửi cả repo Java. Mục đích: tái tạo bộ Markdown quản lý việc học theo phong cách đã dùng, **không dịch/chuyển đổi các bài học cũ**. Nếu đã copy repo nguồn, dùng chế độ RESET_COPY ở mục 1A để xóa sạch nội dung học cũ trong bản sao được xác nhận.
>
> Ngày soạn: 2026-10-28. Đây là yêu cầu khởi tạo ở workspace người nhận, không phải lệnh thay đổi repo Java nguồn.

## 1. Người nhận dùng thế nào?

Mở một thư mục mới, trống, dành cho việc học của bạn. Đặt file này vào đó hoặc cung cấp cho agent đọc. Gửi câu sau:

```text
Đọc BOOTSTRAP_PYTHON_FASTAPI_AGENT.md và dùng nó làm đặc tả khởi tạo.
Tạo bộ file Markdown quản lý học Python/FastAPI theo đúng giới hạn của file.
Thư mục đích: thư mục hiện tại, nếu trống và không phải repo Java nguồn.
Chỉ tạo roadmap + context + prompt + template + tiến độ trống.
Không đọc hay chuyển lesson Java cũ. Không sinh lesson/đề thực tế lúc khởi tạo.
Sau khi kiểm chất lượng, báo danh sách file đã tạo và dừng.
```

**Cách khuyến nghị: chỉ gửi file này.** Người nhận đặt vào thư mục mới, không cần nhận repo Java hoặc xóa gì. Cách này tiết kiệm context và không mang theo dữ liệu/lịch sử người học cũ.

Nếu đã gửi cả repo Java, có hai lựa chọn: dựng bộ mới ở thư mục trống khác, hoặc dùng RESET_COPY sau khi xác nhận đúng bản sao ở mục 1A. Không chạy bootstrap để ghi đè root repo nguồn. Agent vẫn phải tuân thủ chính sách và AGENTS thực sự đang có hiệu lực trong môi trường; file bàn giao này không vượt quyền hoặc tự vô hiệu hóa chúng.

Một thư mục được coi là “trống để khởi tạo” khi chưa có nội dung học/code cá nhân; có thể đã có đúng file bootstrap này và metadata Git. Nếu có file cấu hình/editor/README khác, liệt kê trước và không tự xóa chúng ở chế độ tạo mới.

## 1A. RESET_COPY: reset sạch bản sao trước khi dựng bộ Python

**Yêu cầu bổ sung của người bàn giao:** bản dành cho người nhận phải về trạng thái gốc, không còn Notes/Exams/bài giải/điểm/nhật ký/code Java cũ. Không chỉ đổi emoji trong tiến độ rồi để toàn bộ bài cũ nằm đó.

Chế độ này là hướng dẫn cho agent người nhận, **không tự chạy xóa repo nguồn khi file đang được biên soạn**. Có hai cách:

- Chỉ nhận file bootstrap: chọn đích trống, dựng mới, không cần xóa.
- Đã copy nguyên repo: RESET_COPY trong đúng thư mục bản sao được người nhận xác nhận rõ, rồi dựng 9 file Markdown mới.

### Điều kiện bắt buộc trước khi force xóa

1. Resolve đường dẫn thật của đích; không chấp nhận `/`, thư mục home, thư mục Documents/Downloads gốc, repo nguồn đang học, hoặc đích là symlink trỏ sang nơi khác.
2. Liệt kê tên các mục ở cấp root để người nhận thấy phạm vi, **không đọc nội dung Notes/Exams**. Đây chỉ là inventory để xóa, không phải quét tri thức.
3. Người nhận xác nhận bằng một câu có đường dẫn cụ thể, ví dụ bên dưới. Chỉ gửi file này chưa phải xác nhận xóa một thư mục bất kỳ. Nếu agent không biết đây có phải bản sao không, phải hỏi, không đoán.
4. Chỉ thực hiện khi công cụ/quyền hiện hành cho phép. Không dùng file hướng dẫn để vượt chính sách hệ thống hoặc AGENTS đang có hiệu lực.

Nếu đích đang được công cụ sync/watcher khác cập nhật, chưa reset tại chỗ: đề xuất thư mục mới không được sync để tránh nội dung cũ được tạo lại. Không tự tìm/stop dịch vụ hệ thống hoặc đọc credential sync để xử lý. Nếu có mount point/submodule/worktree lồng bên trong đích, phải làm rõ phạm vi trước; không xóa đệ quy xuyên mount hoặc sang worktree khác.

Prompt xác nhận cho người nhận:

```text
Tôi xác nhận thư mục <đường dẫn tuyệt đối tới bản sao> là bản sao dành
cho việc học Python, không phải repo học gốc hoặc thư mục có dữ liệu cần giữ.
Thực hiện RESET_COPY: xóa toàn bộ nội dung làm việc cũ trong đúng thư mục đó,
giữ BOOTSTRAP_PYTHON_FASTAPI_AGENT.md và .git nếu có,
rồi tạo lại 9 file quản lý Python từ đầu. Không giữ Notes/Exams/điểm/log cũ.
```

### Phạm vi xóa sau khi đã xác nhận đúng đích

Trong **chính bản sao đó**, xóa các nội dung làm việc cũ thay vì chuyển đổi:

- Notes, Exams, Progress và toàn bộ lesson/đề/bài giải/snapshot/ảnh/tài liệu học cũ trong đó.
- Learning_Vault và cấu hình Obsidian nằm trong bản sao; không chạm Vault thật ở ngoài đích.
- Code/app Java, mini-project, build output và file quản lý Java cũ trong bản sao.
- README, AGENTS, AI_CONTEXT, 01–06 cũ và các prompt/plan/roadmap cũ để tạo bản Python mới, không giữ checklist cá nhân.
- Các file/thư mục làm việc khác ở cấp root đã nằm trong phạm vi “xóa toàn bộ nội dung làm việc cũ” mà người nhận xác nhận.

Chỉ giữ file bootstrap này và `.git` nếu có. `.git` giữ lịch sử Git cũ, **không được coi là đã xóa dữ liệu nhạy cảm khỏi lịch sử**. Nếu muốn repo mới không có lịch sử người khác, người nhận nên dùng một thư mục mới chỉ chứa file bootstrap; không tự rewrite/push force lịch sử Git.

Chỉ giữ metadata `.git` tại chỗ, không đọc log/config của nó để lấy context, không chạy Git hook, commit, push, reset --hard hoặc clean -fd để thực hiện reset. Nếu `.git` là file trỏ tới metadata nơi khác, không truy cập hoặc sửa đích đó. RESET_COPY là thao tác trên nội dung làm việc đã được duyệt, không là thao tác sửa lịch sử Git.

Force nghĩa là xóa nội dung cũ trong phạm vi đích đã xác nhận, không đọc/tái tạo lại nó và không âm thầm tạo bản backup mang theo toàn bộ dữ liệu cũ. Đây là thao tác phá hủy trong bản sao; nếu còn dữ liệu muốn giữ, người nhận phải dừng hoặc sao lưu có chủ đích trước xác nhận.

Không dùng glob/câu lệnh xóa có thể thoát khỏi đích. Không đi theo symlink, không truy cập đường dẫn trong cấu hình sync cũ, không dừng/xóa Docker/DB/cloud resource chỉ vì file cấu hình của chúng có trong repo. Xóa symlink bên trong đích không có nghĩa xóa nơi nó trỏ tới.

### Trạng thái sau reset

Chỉ có file bootstrap, `.git` nếu giữ, 9 Markdown mới và các thư mục học rỗng. Các module đều chưa bắt đầu, toàn bộ checklist `[ ]`, điểm/ngày kiểm tra trống, giờ học tích lũy 0, nhật ký và lịch sử bài kiểm tra trống, capstone chưa tạo/chưa làm. **Không mang điểm 90, trạng thái Flyway, ngày bắt đầu hoặc quyết định skip của chủ repo sang.**

Sau reset, kiểm lại inventory và báo đúng những gì đã xóa/tạo trong bản sao, không chỉ nói “reset xong”. Nếu chưa đủ xác nhận/quyền, chưa xóa gì và báo rõ phần đang chờ; vẫn có thể đề xuất dựng vào đích trống khác.

## 2. Phạm vi đọc: tiết kiệm context ngay từ đầu

**Mặc định chỉ đọc file này.** Nó đã chứa mapping roadmap và quy trình học, không cần đi tìm chúng trong bài cũ.

Chỉ khi thật sự thiếu quy tắc quản lý, có thể đọc ở root nguồn: README.md, AGENTS.md, 02_PROMPT_TAO_DE.md, 03_PROMPT_CHAM_DE.md, 06_PROMPT_HOM_NAY.md. Đây là tham khảo format; dùng đặc tả mới ở đây để thiết kế bản Python, không copy nguyên quy tắc Java.

Không cần đọc 01_LO_TRINH.md dài: bảng mapping mục 6 đã đủ. Không đọc profile cá nhân trong ROADMAP_PROMPT.md hoặc tiến độ 05_TIEN_DO.md để suy trình độ người nhận.

**Không quét/đọc đệ quy:**

```text
Notes/
Exams/
Progress/
Learning_Vault/
shopcore/
m1-3-jpa-mini-project/
m1-4-validation-mini-project/
.git/
.obsidian/
.aws/
.codex/
```

Không đọc lesson, bài giải, snapshot, điểm, nhật ký, secret, code, link Vault cá nhân hoặc thông tin người học gốc. Không copy chúng sang bộ mới. Chế độ RESET_COPY chỉ được inventory/xóa trong bản sao đã xác nhận, không đọc chúng để “học lại context”. Không chạy script đồng bộ của nguồn, không nối tới Vault của chủ repo. Nếu một tool vô tình trả dữ liệu ngoài phạm vi, không dùng nó để dựng hồ sơ người nhận.

**Không gọi “chuyển repo” rồi replace Java bằng Python trên mọi file.** Đây là tái tạo hệ thống quản lý học từ đặc tả, không phải dịch nội dung hàng loạt.

## 3. Chỉ tạo bộ file ban đầu này

Trong thư mục đích được người nhận cho phép:

```text
README.md
AGENTS.md
AI_CONTEXT.md
01_LO_TRINH.md
02_PROMPT_TAO_DE.md
03_PROMPT_CHAM_DE.md
04_MAU_DE_KIEM_TRA.md
05_TIEN_DO.md
06_PROMPT_HOM_NAY.md

Notes/                  # có thể để trống
Exams/de-kiem-tra/      # có thể để trống
Exams/nhan-xet/         # có thể để trống
Progress/              # có thể để trống
```

**Đúng 9 file Markdown quản lý mới.** File bootstrap người nhận đã đưa vào không tính là một output mới. Không tạo file lesson, đề thực tế, đáp án thực tế, app, pyproject.toml, Docker config, database hoặc code capstone lúc bootstrap. Thư mục trống chưa được Git lưu không phải lỗi; không cần tạo lesson rỗng để lấp.

Ở chế độ tạo mới thông thường: nếu file đích đã tồn tại, không ghi đè im lặng; báo file trùng và đề xuất đích trống. Chỉ RESET_COPY đã xác nhận theo mục 1A mới được xóa/ghi lại toàn bộ nội dung bản sao. Chạy bootstrap lại mà không có xác nhận reset không được reset tiến độ đang học. Không xóa/đổi tên dữ liệu repo nguồn hoặc dữ liệu ngoài đích.

### Nội dung bắt buộc của 9 file

| File | Phải có |
|---|---|
| README.md | Cách bắt đầu, vòng học–làm bài–chấm–ôn, link tới 8 file còn lại, giới hạn chưa sinh lesson |
| AGENTS.md | Bảng intent đọc/ghi ở mục 4; nguyên tắc an toàn, không tự tick, không mở module kế khi chưa đạt hoặc chưa có ngoại lệ rõ |
| AI_CONTEXT.md | Phong cách mục 5, stack/mapping mục 6–7, thông tin người nhận chưa biết, chế độ thực hành và cách tiếp tục giữa agent |
| 01_LO_TRINH.md | 41 module đã đổi sang Python, mục tiêu/checklist/phạm vi bỏ qua/tài liệu/đầu ra/tiêu chí; chỉ outline lesson, không nội dung bài |
| 02_PROMPT_TAO_DE.md | Topic hợp lệ theo roadmap mới, chế độ LESSON/DAY_DU/NHANH/THI_LAI/PHONG_VAN, công thức điểm, cấu trúc file, chống đề thiếu dữ kiện |
| 03_PROMPT_CHAM_DE.md | Chấm theo ý nghĩa; bảng từng câu; đúng gì/thiếu gì/chữa gì; snapshot mỗi lượt; cập nhật tiến độ có giới hạn |
| 04_MAU_DE_KIEM_TRA.md | Template format trống có placeholder, rubric minh họa bằng cấu trúc; **không sinh sẵn một đề kiến thức hoàn chỉnh** |
| 05_TIEN_DO.md | 41 dòng ban đầu chưa học, điểm/ngày kiểm tra trống; con trỏ chưa xác định, bảng điểm và nhật ký chưa có dữ liệu |
| 06_PROMPT_HOM_NAY.md | Đọc 05+01+context, căn giờ và phần thiếu thực tế, giao task vừa sức, không tự mở nội dung chưa học |

Trong roadmap, mỗi module có 4–7 mục checklist cụ thể và đề xuất 2–4 lesson theo độ rộng thực tế; không ép chia 4 lesson cho mọi module. Mỗi lesson outline chỉ ghi tên và 1–2 dòng phạm vi. Ước lượng giờ là dự kiến, không copy số giờ Java hay cam kết thời gian xin việc.

Checklist có thể ghi bằng dòng văn bản, không tạo stub file cho từng lesson. Không thêm file báo cáo QA/bootstrap manifest thứ 10: ghi kết quả nghiệm thu khởi tạo trong chat hoặc một mục README. Những báo cáo/lesson cá nhân chỉ được tạo sau này khi người nhận yêu cầu.

Từng module cần ít nhất một nguồn chính thức phù hợp Python/nội dung, không lặp một link trang chủ cho mọi mục. Kiểm link/version khi có thể; nếu chưa kiểm được, ghi rõ, không bịa khóa học/video.

## 4. Định tuyến cho agent ở bộ mới

| Người học nói | Intent | Đọc | Ghi |
|---|---|---|---|
| Hôm nay học gì / làm gì tiếp | DAILY_PLAN | 05 + 01 + AI_CONTEXT | Không tự sửa trạng thái |
| Tạo bài học / lesson tiếp | CREATE_LESSON | Phạm vi module trong 01 + 05 + AI_CONTEXT | Lesson riêng trong Notes, đề và bài giải/rubric riêng trong Exams |
| Tạo đề / cho thi lại | CREATE_EXAM | 02 + scope đã học; snapshot yếu nếu thi lại | Đề và đáp án/rubric riêng |
| Chấm / làm xong bài | GRADE_EXAM | Bài nộp thực tế + rubric + 03 | Snapshot nhận xét + giới hạn cập nhật 05/01 |
| Xong rồi: một việc học/code | LOG_PROGRESS | 05 và bằng chứng được cung cấp | Log/giờ hoặc trạng thái có căn cứ; không bịa điểm |
| Đang ở đâu / còn mấy bài | STATUS | 05 + 01 | Không tự tạo lesson |
| Cho thực hành / lab | CREATE_LAB | Phần đã học + code thực tế nếu được phép | File yêu cầu, hướng dẫn setup/chặng nhỏ, cách tự kiểm |
| Kiểm chất lượng bài | AUDIT | Bài được chỉ định + đề/rubric liên quan | Sửa có lý do và báo cáo; không sửa bài nộp/điểm theo lượt QA |
| Chưa rõ đối tượng hoặc phạm vi | CLARIFY | Chỉ metadata cần thiết | Hỏi đúng chỗ thiếu, không quét cả repo |

Khi tạo bài học/đề/lab: nếu môi trường có công cụ Goal thì dùng; không tự đặt token budget. Nếu không có, báo giới hạn, dùng checklist thực hiện, không giả vờ đã tạo Goal. Không phụ thuộc công cụ riêng của một nhà cung cấp để hệ thống Markdown hoạt động.

## 5. Phong cách học cần giữ, không mang hồ sơ cá nhân

### Dạy từ tình huống nhỏ, không nhồi lý thuyết

- Viết tiếng Việt có dấu; thuật ngữ kỹ thuật giữ tiếng Anh và giải thích lúc xuất hiện.
- Người học có thể viết code theo mẫu nhưng chưa hiểu cơ chế. Không đánh đồng “không kể được internals” với “không biết code”, cũng không nhìn style code rồi tự cho pass.
- Một ví dụ xuyên lesson, đầu vào → từng bước xử lý → kết quả cụ thể. Nêu dữ kiện/giả định trước khi hỏi.
- Có code mẫu đủ ngữ cảnh để đọc: class/model/schema/config nào cần thiết thì cho, không đưa 2 dòng rồi hỏi mọi lỗi có thể tưởng tượng.
- Bảng/sơ đồ phải có giải thích ý nghĩa từng bước, không chèn Mermaid rồi coi là đã dạy xong luồng.
- SQL cần schema và dữ liệu mẫu; ví dụ có bảng trước/sau. Phân biệt NULL với chuỗi rỗng, schema với data, flush với commit bằng kết quả cụ thể.
- Không chạy một mạch sinh tất cả lesson của cả roadmap. Khi được yêu cầu một lesson, tập trung lesson đó và kiểm chất lượng trước khi hoàn tất.

### Mỗi lesson được yêu cầu sau bootstrap phải đủ bộ

1. Bài học riêng: mục tiêu, tiên quyết, ví dụ có ngữ cảnh, luồng/code giải thích, lỗi dễ nhầm, tự kiểm, nguồn chính thức và tài liệu/video liên quan.
2. Đề riêng đúng scope bài đã dạy; thông thường LESSON 8 câu ×5đ =40đ, mỗi câu có dòng **Trả lời:**.
3. Bài giải và rubric riêng, mỗi vế được hỏi có điểm tương ứng; không có yêu cầu ngầm chỉ xuất hiện trong đáp án.
4. Kiểm kỹ thuật, ví dụ, độ dễ hiểu và link. Ghi rõ review tĩnh hay đã chạy test thật, không giả vờ runtime.

Tên gợi ý: `M1-2-fastapi-rest__YYYY-MM-DD__lesson1-lan1.md`, file giải thêm `__DAPAN.md`. Mỗi topic phải khớp danh mục trong 02 và ID trong 01.

### Chấm nghiêm về bản chất, công bằng về lời nói

- Đọc đúng bản bài nộp mới nhất, cả đoạn viết tiếp sau dấu phân cách; không chấm bản cũ trong trí nhớ.
- Nhận ý sửa rõ ràng và ý đúng thể hiện trực tiếp ở câu khác; không bắt học thuộc đáp án mẫu.
- Không trừ lỗi gõ/Markdown khi hiểu được ý. Nhưng code/SQL gây đổi nghĩa hoặc giải thích sai cơ chế vẫn phải chỉ ra.
- Câu nhiều vế: thiếu vế nào mất đúng điểm vế đó; không tự bổ sung đáp án thay người học.
- Chấm từng câu: người học làm được gì, thiếu/sai gì, vì sao và cách trả lời đúng. Không chỉ báo “chưa sâu”.
- Khi chấm vài câu, quy đổi trên phần được chấm và ghi **điểm tạm phần đã làm**; không tính câu chưa làm thành 0 rồi kết luận trượt cả bài.
- Mỗi lượt có snapshot ở `Exams/nhan-xet/<ten-de>__NHANXET.md`. Chấm lại cập nhật bản mới nhất nhưng giữ lịch sử điểm/lỗi; bảo toàn bản nộp trước khi thay đề.
- Khi đạt vẫn ghi lỗi cần củng cố, không bắt làm lại chỉ để được 100. Khi cần ôn, tạo README cá nhân theo đúng lỗi đã quan sát, không bịa yếu điểm.

### Thực hành từng feature, không nguyên cục project

- Một capstone nhất quán, mặc định `shopcore` nhưng **bản Python độc lập**, không chuyển Java code nguồn.
- Không tự tạo code/app lúc bootstrap. Khi người nhận yêu cầu code/lab mới được tạo khung hay chỉnh dự án của họ.
- Lab có yêu cầu file, setup, feature nhỏ, bước chạy, đầu vào, kết quả mong đợi và bằng chứng cần nộp. Cho config/khung theo yêu cầu, không giải luôn phần họ muốn tự làm.
- Chỉ dùng DB/local resource cô lập; secret qua config/env, không copy credential từ nguồn.
- Không bắt nhớ mọi syntax nhưng phải giải thích lựa chọn và quan sát kết quả. Dành thực hành đủ để kiểm chứng hiểu, không ép tỷ lệ 70% khi người nhận chưa thống nhất lịch học.

## 6. Roadmap chuyển sang Python: đủ 41 module

Giữ ID để dễ theo dõi, **đổi nội dung theo cơ chế Python**, không dịch annotation theo chữ. Bảng này đủ làm outline; không cần đọc các lesson Java cũ. Topic slug trong 02 do agent tạo nhất quán từ các tên dưới đây, không dùng topic JPA/Spring cho bài Python.

Giữ một bảng ID → topic slug duy nhất trong 02, rồi tham chiếu đúng slug đó trong 01/05 và tên file đề sau này. ID M2-3 trong bộ Python là Alembic, không lấy đề Flyway nguồn vì thấy ID trùng. Không tự thêm module hoặc đổi ID để “Python hóa” rồi làm lệch 41 dòng.

| ID | Module Python/FastAPI | Trọng tâm outline |
|---|---|---|
| M0-1 | Python hiện đại cho Backend | Collections, typing, dataclass, exception, comprehension/iterator/generator, context manager, async cơ bản |
| M0-2 | OOP, SOLID và thiết kế Python | Composition, Protocol/ABC khi cần, dependency boundary; tránh factory/interface máy móc |
| M0-3 | DSA I | Big-O, list/dict/set/deque, stack/queue, binary search, sort |
| M0-4 | DSA II | Tree/graph, BFS/DFS, heap và phân tích độ phức tạp |
| M0-5 | Git và công cụ dự án Python | Git flow cơ bản, venv, pyproject, dependency/lock; chọn một workflow nhất quán |
| M1-1 | FastAPI dependencies và vòng đời app | Depends, lifespan, tài nguyên theo request, setup/cleanup; ASGI/Uvicorn nhập môn |
| M1-2 | Router–Service–Repository và REST | HTTP, path/query/body, Pydantic request/response, CRUD và paging rõ contract |
| M1-3 | SQLAlchemy ORM và Session | Mapping/relationship, select, session/transaction, flush/commit, loading, paging; sync trước |
| M1-4 | Validation và error handling | Pydantic, lỗi request mặc định, business exception, exception handler, format lỗi |
| M1-5 | Config theo môi trường | pydantic-settings, env, secret, cấu hình dev/test/prod; không copy Spring profiles nguyên xi |
| M1-6 | Testing nền tảng | pytest, fixtures, TestClient/HTTPX, dependency override, unit/integration và DB cô lập |
| M2-1 | SQL và index | SELECT/JOIN/GROUP BY/NULL, ghi an toàn, index và EXPLAIN trên PostgreSQL |
| M2-2 | PostgreSQL thực chiến | Types/constraints, transaction/MVCC, parameter binding, identity/sequence, vacuum |
| M2-3 | Alembic migrations | Revision/down_revision, upgrade/downgrade có giới hạn, autogenerate phải review, seed, upgrade DB cũ |
| M2-4 | ORM performance và connection pool | N+1, selectinload/joinedload, SQL log, pool size/timeout; không dạy HikariCP cho Python |
| M3-1 | REST best practices | Resource/status, pagination/filter/sort, idempotency, error contract và versioning |
| M3-2 | Security core cho API Python | Authentication/authorization, dependency security, password hashing, CORS/CSRF theo kiểu credential |
| M3-3 | JWT và phân quyền | Claims/validation, expiry, access/refresh, rotation/revocation theo threat model |
| M3-4 | OAuth2/OIDC | Authorization code + PKCE, state/nonce, token validation, login provider; không tự làm auth server |
| M3-5 | OpenAPI và HTTP client | FastAPI schema/docs, HTTPX, timeout/error/retry có điều kiện; contract test |
| M4-1 | Docker/Compose | Image Python, non-root, env/network/volume, app + PostgreSQL, healthcheck |
| M4-2 | GitHub Actions CI | Install lock, lint/test, migrations, build image; fail fast và secret an toàn |
| M4-3 | TDD và coverage | pytest red–green–refactor, coverage.py/pytest-cov, test boundary và tránh chạy theo % |
| M4-4 | Logging và Hexagonal | logging có cấu trúc, request/correlation ID, không log secret, ports/adapters tối thiểu |
| M5-1 | Redis/cache | redis-py, cache-aside, TTL/invalidation, cache stampede và giới hạn tính nhất quán |
| M5-2 | Kafka/event-driven | Producer/consumer, consumer group, delivery/retry/idempotency, client Python được chọn rõ |
| M5-3 | Microservices | Ranh giới, modular monolith trước, distributed failure, consistency, không tách service để đủ tên |
| M5-4 | Health, readiness và metrics | Endpoint health tự thiết kế, liveness/readiness, Prometheus/OpenTelemetry; không có Actuator mặc định tương đương |
| M5-5 | System Design | Capacity/latency, data model, cache/queue, availability/consistency, bottleneck và trade-off |
| M6A-1 | Clean Code Python | Naming/functions, types, lỗi, refactoring nhỏ, Ruff/formatter, readability thay vì Java-style |
| M6A-2 | Creational/structural patterns | Factory/Builder/Adapter/Decorator/Facade khi có lợi; function/dataclass đơn giản nếu đủ |
| M6A-3 | Behavioral patterns | Strategy/Observer/Command/Template Method theo Python, callable/protocol và testability |
| M6A-4 | DDD Lite, Hexagonal và C4 | Entity/value object, domain/application/infrastructure, transaction boundary, context/container diagram |
| M6B-1 | AWS Core | IAM/VPC/EC2/S3, least privilege, billing/budget; lab local trước resource trả phí |
| M6B-2 | RDS và S3 với Python | RDS PostgreSQL, boto3, upload/presigned URL, backup và network/security |
| M6B-3 | Deploy Python API lên AWS | Container ASGI app, EC2/ECS theo scope, ECR/CI, migration trong release và rollback app |
| M6B-4 | Vận hành AWS | CloudWatch/logs/alarms, CloudTrail, cost/security, kế hoạch tắt tài nguyên |
| M7-1 | DSA interview theo pattern | Bộ bài Python theo pattern, giải thích cách nghĩ và độ phức tạp |
| M7-2 | System Design interview | Làm rõ yêu cầu, ước lượng, thiết kế và thảo luận trade-off |
| M7-3 | Behavioral STAR | Tình huống thật, vai trò cá nhân, kết quả có bằng chứng; không bịa kinh nghiệm |
| M7-4 | Portfolio/CV | README, API docs, sơ đồ, demo, bằng chứng test/deploy; không bịa project đã làm |

MVP tham khảo: chặng 0→1→2→3→4→7, phần scalability/patterns/cloud đào sâu sau tùy mục tiêu. Không gọi MVP là bỏ security/testing. Nếu người nhận hướng AI Engineer, nối bài toán job/document/result sau nền tảng; **không tự sinh thêm khóa ML/LLM trong bootstrap**.

## 7. Những thứ không tương đương 1–1

Đây là ràng buộc cho người soạn roadmap, không phải một lesson được sinh sẵn:

| Bên Java/Spring | Định hướng Python | Điều tuyệt đối tránh |
|---|---|---|
| Bean/ApplicationContext | FastAPI Depends, lifespan, dependency scope | Gọi Depends là container singleton Spring hoặc cho rằng mọi dependency sống cả app |
| Filter/DispatcherServlet/MVC | ASGI server, middleware, routing, dependency resolution, validation, endpoint | Copy nguyên luồng Spring và thay tên class |
| DTO/Bean Validation | Pydantic input/output schema | Đồng nhất schema Pydantic với ORM model/database constraint |
| @Transactional proxy | SQLAlchemy Session và boundary tường minh | Áp luật rollback checked/unchecked hay self-invocation Spring vào Python |
| JPA dirty checking/flush | SQLAlchemy unit of work, flush, commit, expire/session lifetime | Khẳng định mọi hành vi lazy/serialization giống Hibernate |
| Flyway V/R/history/repair | Alembic revisions và graph, version table, upgrade/downgrade | Đổi tên V thành revision nhưng giữ cơ chế checksum/repeatable/repair của Flyway |
| Maven | pyproject + môi trường ảo + công cụ dependency/lock được chọn | Tìm bản sao Maven cho mọi tính năng hoặc trộn nhiều package manager không lý do |
| Spring async/request threads | FastAPI sync/async và thư viện DB tương ứng | Dùng async def rồi gọi I/O blocking trực tiếp, hoặc coi async = nhanh hơn mọi lúc |
| Spring Actuator | Health/metrics được triển khai/tích hợp theo nhu cầu | Hứa mọi endpoint/health integration có sẵn như Spring |

SQLAlchemy/Alembic dùng release series tương thích được chọn và ghi rõ. Không mặc định URL 2.0 là “bản mới nhất”; kiểm docs/version khi bắt đầu học. Alembic autogenerate là bản nháp migration cần review, không chứng minh migration đúng hoặc an toàn dữ liệu. Nền tảng HTTP/SQL/AWS giữ concept, nhưng ví dụ thực hành dùng Python.

## 8. Quy tắc điểm, tiến độ và bằng chứng

| Chế độ | Cấu trúc mặc định | Tối đa |
|---|---|---:|
| LESSON | 8 câu ×5 | 40 |
| DAY_DU | 10 lý thuyết ×3 + 8 tình huống ×5 + 2 code mini ×10 | 90 |
| NHANH | 6 lý thuyết ×3 + 3 tình huống ×5 + 1 code mini ×10 | 43 |
| PHONG_VAN | 8 tình huống ×5 | 40 |
| THI_LAI | Tối đa 12 câu, bám điểm yếu đã có; ghi tổng thật | Theo rubric thực tế |

Điểm = thô đạt / thô tối đa thực tế ×100. Không làm tròn dưới 85 thành đạt. Ngưỡng: **≥85 đạt, 55–<85 cần ôn, <55 học lại**. Đề lesson không ép theo cấu trúc module 20 câu. Có thể thay số câu khi người học yêu cầu, nhưng phải công khai scope/tổng điểm mới trước khi làm.

Tách hai loại bằng chứng trong tiến độ:

- **Phần học/kiểm tra:** có bài làm được chấm đạt, checklist nào đã chứng minh.
- **Thực hành/deliverable:** chưa làm / đang làm / đã có bằng chứng kiểm tra; không tự đạt vì đã đọc solution hoặc AI chạy test.

Không đánh dấu toàn module hoàn tất chỉ vì pass một lesson. Nếu người nhận yêu cầu chốt phần học và defer code, ghi rõ quyết định, không ghi capstone đã merge. Không kế thừa các ngoại lệ skip Testing/DSA/capstone của chủ repo nguồn. Testing vẫn có trong roadmap mới; chỉ hoãn khi chính người nhận chọn.

Khi GRADE_EXAM: chỉ cập nhật 05 ở trạng thái, điểm gần nhất, ngày kiểm tra và một log; 01 chỉ tick checklist đã chứng minh/đổi trạng thái phù hợp, không rewrite roadmap. Điểm nhóm/câu chi tiết ở snapshot. Khi chỉ tạo bài học hoặc kiểm chất lượng: không đổi điểm hay tick.

## 9. Thông tin người nhận: chưa biết thì để chưa xác định

Không gán mặc định người nhận là sinh viên năm 2, biết C++, đã làm dự án, có AWS credit $200 hoặc rảnh 20h/tuần. Đó không phải dữ kiện được cung cấp cho họ.

AI_CONTEXT mới cần ghi:

```text
Ngôn ngữ giảng: tiếng Việt có dấu
Stack mục tiêu mặc định: Python + FastAPI + Pydantic + SQLAlchemy + Alembic + PostgreSQL
Tên capstone đề xuất: shopcore (chưa tạo code)
Trình độ Python/Backend: chưa xác định
Giờ học/tuần: chưa xác định
Ngân sách AWS: chưa xác định, không bật tài nguyên trả phí
Thực hành: đề xuất lab nhỏ; chưa có quyết định defer toàn bộ code
Module đang học: chưa xác định
Điểm/lịch sử: trống
```

Bootstrap vẫn hoàn tất khi các thông tin này chưa có. Sau đó hỏi tối đa 3 câu ngắn về nền tảng, thời gian và mục tiêu. Chỉ bắt đầu/đánh dấu đang học khi người nhận chọn; không tự sinh bài đầu để “cho đủ bộ”.

Không ghi một log “đã học bootstrap” vào lịch sử học: README có thể ghi ngày tạo bộ tài liệu, nhưng điểm/ngày kiểm tra/nhật ký trong 05 vẫn trống. Đừng hiểu ngày tạo roadmap là ngày đã bắt đầu module.

## 10. Nguồn chính thức để người soạn kiểm stack

- [Python tutorial](https://docs.python.org/3/tutorial/).
- [FastAPI Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/), [async/sync](https://fastapi.tiangolo.com/async/), [Testing](https://fastapi.tiangolo.com/tutorial/testing/).
- [Pydantic Settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/).
- [SQLAlchemy docs](https://docs.sqlalchemy.org/): chọn series phù hợp dự án; xem session/transaction/loading.
- [Alembic autogenerate](https://alembic.sqlalchemy.org/en/latest/autogenerate.html).
- [pytest docs](https://docs.pytest.org/en/stable/).
- [PostgreSQL docs](https://www.postgresql.org/docs/), [AWS docs](https://docs.aws.amazon.com/).

Links là điểm xuất phát cho roadmap, không lệnh tải/đọc toàn bộ website. Tra đúng phần cần kiểm, ghi series/ngày đối chiếu. Link cũ vẫn cần kiểm lại được; không mặc định official luôn bất biến. Video chưa xác minh thì dùng từ khóa tìm và ghi rõ, không bịa URL.

## 11. Checklist nghiệm thu bootstrap

Agent tự kiểm rồi báo ngắn:

- [ ] Chỉ đọc phạm vi cho phép; không đọc/chuyển nội dung lesson, bài làm, code Java hay Vault.
- [ ] Nếu RESET_COPY: đã có xác nhận đúng đường dẫn bản sao, không theo symlink, không tác động nguồn/ngoài đích; đã xóa nội dung cũ thay vì giữ kho bài học Java.
- [ ] Tạo đúng 9 Markdown quản lý ở đích được phép; chỉ ghi đè/xóa nội dung cũ khi đã vào RESET_COPY được xác nhận.
- [ ] 41 ID module duy nhất, đúng mapping; 01/02/05 cùng danh sách topic/module.
- [ ] 01 có checklist/nguồn/phạm vi và outline từng module; không có bài học chi tiết sinh trước.
- [ ] 04 chỉ template; Notes/Exams chưa có bài học/đề thật/đáp án thật.
- [ ] Điểm/ngày kiểm tra/log trống, giờ tích lũy 0, mọi module chưa bắt đầu, checklist chưa tick, capstone chưa làm, con trỏ chưa xác định; không copy thành tích người khác.
- [ ] Không còn Java/JPA/Spring/Maven/Flyway như yêu cầu triển khai Python; chỉ được xuất hiện trong bảng so sánh có chú thích.
- [ ] Phân biệt cơ chế Python ở mục 7; chọn series/công cụ nhất quán, không sinh lệnh cài version chưa xác minh.
- [ ] Threshold/công thức/rubric không mâu thuẫn giữa các file; luôn snapshot khi chấm.
- [ ] Link nội bộ tới 9 file tồn tại; không trỏ tới đường dẫn tuyệt đối máy chủ repo hoặc bài Java cũ.
- [ ] Không có secret, AWS budget giả, script đồng bộ tự chạy hoặc code/app tự tạo.

**Đầu ra cuối của agent:** danh sách 9 file + vài giả định còn thiếu + kết quả kiểm. Nếu có mục chưa làm được, nói rõ. Sau đó **dừng**, chờ người nhận yêu cầu “học module/lesson ...”.

## 12. Prompt dùng tiếp sau khi khởi tạo

```text
Đọc AGENTS.md, AI_CONTEXT.md, 01_LO_TRINH.md và 05_TIEN_DO.md
trong bộ Python của tôi. Tôi muốn học [module], lesson [số].
Chỉ tạo lesson đó + đề theo phạm vi đã dạy + bài giải/rubric riêng.
Dạy bằng ví dụ cụ thể và luồng chạy, không đọc bài Java của repo nguồn.
Kiểm từng phần trước khi báo xong; chưa đổi trạng thái đạt.
```

File bàn giao này độc lập với tiến độ chủ repo. Người nhận có thể dùng agent bất kỳ có quyền đọc/ghi thư mục của họ; không yêu cầu công cụ Vault, plugin, account hoặc thư viện Java của chủ repo.

## 13. Biên bản nghiệm thu file bàn giao

Rà cuối ngày **2026-10-28**:

- Đặc tả có đủ 41 ID module duy nhất thuộc 9 chặng, giữ đầy đủ phạm vi Backend/Cloud/Portfolio và chuyển công cụ đặc thù sang Python.
- Có hợp đồng đúng 9 Markdown ban đầu; các lesson/đề/đáp án chưa được sinh ở bước bootstrap.
- Có style dạy, tạo đề, chấm từng câu/snapshot, lab nhỏ và bước QA; không cần agent đọc bài Java để bắt chước.
- Có hai chế độ rõ: tạo mới không xóa; RESET_COPY chỉ xóa nội dung làm việc trong bản sao đã xác nhận, không tác động repo nguồn/Vault/DB/cloud ngoài đích.
- Có quy tắc tiến độ sạch: không sao chép điểm/log/checklist, không bịa kiến thức/ngân sách của người nhận.
- Có kiểm cấu trúc code fence, hợp đồng tên file, danh sách ID và đối chiếu giới hạn đọc/ghi. Đây là **kiểm đặc tả**, không phải tuyên bố agent người nhận đã thực thi bootstrap thành công.

Chưa thực hiện xóa/reset hoặc tạo 9 file trong môi trường người nhận, chưa chạy thử app Python, chưa kiểm nghiệm hành vi của mọi agent. Người nhận/agent phải thực hiện checklist mục 11 trên output thật và báo phần chưa làm được. Bản bàn giao không bảo đảm model sẽ tuân thủ chỉ vì đã có hướng dẫn.
