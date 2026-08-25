# README tổng kết M0-5: Git & Maven - các lỗ hổng cần vá

Kết quả gần nhất: `88/100` → `🟢 Đạt`

Bạn đã đủ điểm qua M0-5. File này không bắt học lại toàn bộ, chỉ tổng hợp những chỗ còn hỏng hoặc còn mơ hồ để vá trước khi sang Spring Boot.

---

## 1. Tổng quan bạn đã làm được

Bạn đã nắm tốt:

- Git dùng để quản lý lịch sử code.
- GitHub/GitLab dùng để lưu repo remote và làm việc nhóm.
- Working tree → staging area → repository.
- Branch dùng để tách việc khỏi `main`.
- Merge và rebase khác nhau ở mức ý tưởng.
- Stash dùng khi sửa dở mà cần chuyển branch.
- Maven dùng để build project Java.
- `pom.xml` chứa thông tin project, dependency, plugin, profile.
- Maven lifecycle: `validate → compile → test → package → install → deploy`.
- Cấu trúc Maven tối thiểu của `shopcore`.
- Viết được command workflow cơ bản.
- Viết được `pom.xml` Java 17 + JUnit 5 + compiler/surefire plugin.

Điểm mạnh nhất của bạn ở bài này:

> Bạn hiểu tổng thể flow và viết lệnh cơ bản tốt. Vấn đề còn lại là khi gặp tình huống thật, bạn hay trả lời thiếu 1-2 bước xử lý cuối.

---

## 2. Lỗ hổng 1: Git không chỉ là công cụ push code

### Bạn đang nói hơi thiếu

Bạn viết kiểu:

```text
git là công cụ dùng để push code
```

Ý này không sai hoàn toàn, nhưng chưa đủ.

### Hiểu đúng

Git là:

```text
version control system
```

Nó chạy local và quản lý lịch sử thay đổi của code.

Git làm được nhiều việc trước cả khi có GitHub:

- lưu lịch sử commit
- xem diff
- tạo branch
- merge/rebase
- revert/cherry-pick
- resolve conflict

GitHub chỉ là nền tảng remote/collaboration quanh Git.

### Cách nói chuẩn khi phỏng vấn

```text
Git là hệ thống quản lý phiên bản phân tán, dùng để theo dõi lịch sử thay đổi code.
GitHub là nền tảng hosting repo Git, hỗ trợ collaboration như pull request, review, issue và CI.
```

---

## 3. Lỗ hổng 2: Commit là snapshot, không phải chỉ là "thay đổi staging"

### Bạn đang nói hơi lệch

Bạn viết:

```text
git commit là dùng để thay đổi toàn bộ nội dung có trong staging area
```

Ý gần đúng, nhưng wording dễ gây hiểu nhầm.

### Hiểu đúng

`git add`:

```text
đưa thay đổi từ working tree vào staging area
```

`git commit`:

```text
lưu snapshot từ staging area vào lịch sử repository
```

Commit không "thay đổi staging area" theo nghĩa chính. Commit lấy nội dung đã staged và tạo một mốc lịch sử.

### Câu thần chú

```text
working tree: đang sửa
staging area: chuẩn bị commit
repository: lịch sử commit
```

```text
git add = chọn file cho commit kế tiếp
git commit = lưu snapshot vào lịch sử
```

---

## 4. Lỗ hổng 3: Resolve conflict thiếu bước hoàn tất

### Bạn đang thiếu

Bạn biết conflict là Git không tự quyết được, nhưng câu trả lời thường dừng ở:

```text
đọc code, chọn cái nào, rồi add
```

Thiếu bước hoàn tất sau `git add`.

### Hiểu đúng

Khi conflict xảy ra, file sẽ có marker:

```text
<<<<<<< HEAD
phiên bản hiện tại
=======
phiên bản branch kia
>>>>>>> branch-name
```

Bạn cần:

1. Mở file conflict.
2. Xóa toàn bộ marker `<<<<<<<`, `=======`, `>>>>>>>`.
3. Sửa thành nội dung cuối cùng đúng.
4. Chạy test hoặc kiểm tra lại file.
5. `git add <file>`.
6. Hoàn tất merge/rebase.

Nếu đang merge:

```bash
git add README.md
git commit
```

Nếu đang rebase:

```bash
git add README.md
git rebase --continue
```

### Cách nhớ

```text
resolve conflict = sửa nội dung + xóa marker + add + tiếp tục thao tác đang làm
```

Không chỉ `add` là xong.

---

## 5. Lỗ hổng 4: PR workflow không dừng ở push

### Bạn đang thiếu

Ở câu PR, bạn viết tốt phần command:

```bash
git switch main
git pull
git switch -c feature/readme-gitignore
git status
git add .gitignore README.md
git commit -m "docs: add readme and gitignore"
git push origin feature/readme-gitignore
```

Nhưng workflow Pull Request chưa kết thúc ở `push`.

### Hiểu đúng

Sau `push`, còn các bước:

1. Mở Pull Request trên GitHub/GitLab.
2. Viết summary thay đổi.
3. Ghi cách test.
4. Chờ review.
5. Sửa theo review nếu có.
6. Merge PR vào `main`.
7. Cập nhật local `main` nếu cần.

### Template PR chuẩn

```md
## Summary
- Add .gitignore for Java/Maven
- Add README skeleton

## Test
- Checked file structure
- No code changes
```

### Cách nhớ

```text
push chỉ đưa branch lên remote
PR mới là yêu cầu merge branch đó vào main
```

---

## 6. Lỗ hổng 5: `.gitignore` không tự gỡ file đã bị Git track

### Bạn đang thiếu

Bạn biết:

```text
target/ và *.class là file rác, cần .gitignore
```

Nhưng nếu file đã lỡ commit hoặc đã bị Git track, thêm `.gitignore` thôi là chưa đủ.

### Hiểu đúng

`.gitignore` chỉ ngăn file mới chưa track bị add vào Git.

Nếu file đã bị track, cần gỡ khỏi Git index:

```bash
git rm -r --cached target
git rm --cached SomeFile.class
git add .gitignore
git commit -m "chore: remove generated files from git tracking"
```

Giải thích:

| Lệnh | Ý nghĩa |
|---|---|
| `git rm -r --cached target` | Gỡ `target/` khỏi Git tracking, không xóa local file |
| `git rm --cached SomeFile.class` | Gỡ file `.class` khỏi Git tracking |
| `git add .gitignore` | Commit rule ignore mới |
| `git commit ...` | Lưu việc cleanup vào lịch sử |

### Câu thần chú

```text
.gitignore chặn file chưa track.
git rm --cached gỡ file đã track.
```

---

## 7. Lỗ hổng 6: Stash cần đủ vòng đời

### Bạn đã sửa tốt

Ban đầu bạn chỉ viết:

```text
dùng stash để chuyển sang
```

Sau đó bạn bổ sung:

```text
status -> stash -> switch main -> quay lại -> stash apply/pop
```

Đây là hướng đúng.

### Chuỗi chuẩn

```bash
git status
git stash push -m "wip: readme update"
git switch main

# xem bug hoặc xử lý việc gấp

git switch feature/maven-setup
git stash pop
```

### `pop` khác `apply`

| Lệnh | Ý nghĩa |
|---|---|
| `git stash pop` | Lấy stash ra và xóa khỏi stash list |
| `git stash apply` | Lấy stash ra nhưng vẫn giữ trong stash list |

### Cách nhớ

```text
pop = lấy ra và bỏ khỏi kho
apply = áp dụng nhưng vẫn giữ bản cất
```

---

## 8. Lỗ hổng 7: Dependency và plugin cần ví dụ rõ tên

### Bạn đang nói hơi chung

Bạn viết:

```text
plugin ví dụ như valid, complie, hoặc plugin làm đẹp code
```

Ý đúng hướng nhưng ví dụ chưa chuẩn tên.

### Hiểu đúng

Dependency là thư viện code của mình dùng.

Ví dụ:

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.2</version>
    <scope>test</scope>
</dependency>
```

Plugin là công cụ Maven dùng để build/test/package.

Ví dụ:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
</plugin>
```

Ví dụ khác:

```xml
<artifactId>maven-surefire-plugin</artifactId>
```

### Câu thần chú

```text
dependency = thư viện cho code
plugin = công cụ cho Maven build
```

---

## 9. Lỗ hổng 8: JUnit và Surefire khác vai trò

### Bạn trả lời đúng ý nhưng thiếu cụ thể

Bạn nói cần JUnit library và plugin để build. Nhưng cần tách rõ:

| Thành phần | Vai trò |
|---|---|
| `junit-jupiter` | Cung cấp annotation/API test như `@Test`, assertion |
| `maven-surefire-plugin` | Maven plugin dùng để phát hiện và chạy unit test trong phase `test` |

Nếu thiếu JUnit:

```text
Code test không có thư viện test để import.
```

Nếu thiếu Surefire:

```text
Maven có thể không chạy test đúng như mong muốn, nhất là với cấu hình/version cụ thể.
```

### Cách nói chuẩn

```text
JUnit là dependency cho code test.
Surefire là Maven plugin chịu trách nhiệm chạy unit test khi mvn test.
```

---

## 10. Lỗ hổng 9: `mvn install` không liên quan trực tiếp đến `target/`

### Bạn đang hơi lẫn

Bạn viết:

```text
app cài vào maven local repository, chỉ vào máy (.target) là package
```

Ý chính đúng: `install` đưa artifact vào local Maven repository. Nhưng cần tách rõ hơn.

### Hiểu đúng

`mvn package`:

```text
compile + test + đóng gói artifact vào target/
```

Ví dụ:

```text
target/shopcore-0.0.1-SNAPSHOT.jar
```

`mvn install`:

```text
chạy đến phase install, sau đó copy artifact vào local Maven repository
```

Local Maven repository thường nằm ở:

```text
~/.m2/repository
```

### Câu thần chú

```text
package tạo artifact trong target/
install đưa artifact vào ~/.m2/repository
```

---

## 11. Lỗ hổng 10: Dùng GitHub Desktop được, nhưng vẫn phải hiểu command

Bạn nói thường dùng GitHub Desktop. Hoàn toàn ổn.

Nhưng khi học backend, vẫn cần hiểu command vì:

- CI/CD log thường hiển thị command.
- Server không có GUI.
- Khi conflict/rebase phức tạp, command rõ hơn.
- Phỏng vấn hay hỏi flow bằng command/ý tưởng.

Mapping nhanh:

| GitHub Desktop / VS Code | Command tương ứng |
|---|---|
| Changes tab | `git status`, `git diff` |
| Stage file | `git add <file>` |
| Commit button | `git commit -m "..."` |
| Push origin | `git push origin <branch>` |
| Pull origin | `git pull` |
| Create branch | `git switch -c <branch>` |

Mục tiêu không phải bỏ GUI. Mục tiêu là:

```text
Dùng GUI vẫn biết phía dưới Git đang làm gì.
```

---

## 12. Bảng vá lỗi nhanh

| Lỗi còn hở | Câu đúng cần nhớ |
|---|---|
| Git = push code | Git = version control local/distributed |
| Commit = thay đổi staging | Commit = lưu snapshot staged vào repo history |
| Conflict chỉ cần add | Conflict = sửa nội dung + xóa marker + add + commit/continue |
| PR dừng ở push | Push branch xong phải mở PR, review, merge |
| `.gitignore` tự gỡ file rác đã commit | File đã track cần `git rm --cached` |
| Plugin ví dụ chưa rõ | Dùng tên như `maven-compiler-plugin`, `maven-surefire-plugin` |
| JUnit/Surefire còn chung chung | JUnit = dependency test, Surefire = plugin chạy test |
| `install` lẫn với `target` | `package` tạo `target/`, `install` đưa vào `~/.m2/repository` |

---

## 13. Bài tập tự vá trong 45 phút

### Bài 1: File rác đã bị track

Viết lại chuỗi lệnh xử lý khi đã lỡ commit `target/`:

```bash
git rm -r --cached target
git add .gitignore
git commit -m "chore: remove target from git tracking"
```

Tự giải thích:

- Vì sao cần `--cached`?
- Nếu không có `--cached` thì chuyện gì có thể xảy ra?

---

### Bài 2: Conflict README

Tập nói đủ quy trình:

```text
Mở file -> xóa marker -> chọn nội dung đúng -> chạy test/kiểm tra -> git add -> git commit hoặc git rebase --continue
```

---

### Bài 3: PR workflow

Viết lại flow đầy đủ:

```bash
git switch main
git pull
git switch -c feature/readme-gitignore
git status
git add .gitignore README.md
git commit -m "docs: add readme and gitignore"
git push origin feature/readme-gitignore
```

Sau đó nói tiếp bằng lời:

```text
Mở PR -> ghi summary/test -> review -> sửa nếu cần -> merge vào main
```

---

### Bài 4: Maven role

Điền nhanh:

```text
junit-jupiter = ?
maven-surefire-plugin = ?
maven-compiler-plugin = ?
mvn package = ?
mvn install = ?
```

Đáp án tự kiểm:

```text
junit-jupiter = dependency cho unit test
maven-surefire-plugin = plugin chạy test
maven-compiler-plugin = plugin compile Java
mvn package = đóng gói artifact vào target/
mvn install = đưa artifact vào ~/.m2/repository
```

---

## 14. Kết luận

Bạn không hỏng nền Git/Maven. Bạn đã pass M0-5.

Phần còn yếu chỉ là:

```text
workflow thực tế cần đủ bước
```

Trước khi qua Spring Boot, chỉ cần nhớ 4 cụm này:

```text
git rm --cached
resolve conflict markers
push -> PR -> review -> merge
JUnit dependency vs Surefire plugin
```

Nắm chắc 4 cụm này là đủ sạch để bước sang `M1-1 · IoC / DI`.
