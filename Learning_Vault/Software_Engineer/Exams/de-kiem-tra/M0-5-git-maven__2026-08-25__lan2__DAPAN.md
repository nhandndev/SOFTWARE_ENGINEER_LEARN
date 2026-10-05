# Đáp án thi lại M0-5: Git & Maven - lỗi còn hở

Topic: `M0-5-git-maven`  
Chế độ: `THI_LAI`  
Tổng điểm thô: 48 điểm  
Normalize: `(điểm thô / 48) × 100`

---

## Câu 1 `(3đ)`

- Git là distributed/version control system, quản lý lịch sử thay đổi code local. `(1.25đ)`
- GitHub là nền tảng hosting/collaboration cho Git repo: remote, PR, review, issue, CI. `(1.25đ)`
- Nói Git chỉ là push code là thiếu vì Git còn commit, branch, diff, merge, rebase, conflict, revert. `(0.5đ)`

## Câu 2 `(3đ)`

- `git add`: đưa thay đổi từ working tree vào staging area. `(1đ)`
- `git commit`: lưu snapshot từ staging area vào repository history. `(1.5đ)`
- Có dùng đúng các khái niệm requested. `(0.5đ)`

## Câu 3 `(3đ)`

- Dependency là thư viện code import/dùng, ví dụ `junit-jupiter`, `lombok`. `(1.5đ)`
- Plugin là công cụ Maven dùng để build/test/package, ví dụ `maven-compiler-plugin`, `maven-surefire-plugin`. `(1.5đ)`

## Câu 4 `(3đ)`

- JUnit là dependency cung cấp API test như `@Test`, assertions. `(1.5đ)`
- Surefire là Maven plugin phát hiện/chạy unit test trong phase `test`. `(1.5đ)`

## Câu 5 `(3đ)`

- `mvn package`: chạy tới phase package, tạo artifact trong `target/`. `(1.5đ)`
- `mvn install`: chạy tới phase install, đưa artifact vào local Maven repo `~/.m2/repository`. `(1.5đ)`

---

## Câu 6 `(5đ)`

- `.gitignore` chỉ chặn file chưa track, không tự gỡ file đã bị Git tracking. `(1.5đ)`
- Có `target/` trong `.gitignore`. `(0.75đ)`
- Có `git rm -r --cached target`. `(1.5đ)`
- Có commit cleanup. `(0.75đ)`
- Giải thích `--cached` là gỡ khỏi Git tracking nhưng giữ file local. `(0.5đ)`

Đáp án mẫu:

```bash
echo "target/" >> .gitignore
git rm -r --cached target
git add .gitignore
git commit -m "chore: remove target from git tracking"
```

## Câu 7 `(5đ)`

- Mở file conflict và tìm marker. `(0.75đ)`
- Xóa marker `<<<<<<<`, `=======`, `>>>>>>>`. `(1đ)`
- Chọn/sửa nội dung cuối cùng đúng. `(1đ)`
- Chạy test/kiểm tra lại file. `(0.75đ)`
- `git add <file>` và `git commit` để hoàn tất merge. `(1.5đ)`

## Câu 8 `(5đ)`

Đáp án mẫu:

```bash
git status
git stash push -m "wip: maven setup"
git switch main
# xem bug/xử lý việc gấp
git switch feature/maven-setup
git stash pop
```

Chấm:

- Có `git status`. `(0.75đ)`
- Có stash hoặc stash push. `(1.25đ)`
- Có switch sang `main`. `(1đ)`
- Có quay lại branch cũ. `(1đ)`
- Có `stash pop` hoặc `stash apply`. `(1đ)`

## Câu 9 `(5đ)`

- Push chỉ đưa branch lên remote, chưa merge vào `main`. `(1.5đ)`
- Mở Pull Request. `(1đ)`
- Ghi summary/test hoặc mô tả thay đổi. `(0.75đ)`
- Review/sửa theo review. `(1đ)`
- Merge PR vào `main`. `(0.75đ)`

## Câu 10 `(5đ)`

Nội dung sửa hợp lý, ví dụ:

```text
Run all tests using mvn clean test
```

Chấm:

- Xóa toàn bộ marker conflict. `(1đ)`
- Chọn nội dung cuối cùng hợp lý. `(1.25đ)`
- Có `git add README.md`. `(1đ)`
- Có `git commit` để hoàn tất merge. `(1đ)`
- Có kiểm tra file/chạy test nếu cần. `(0.75đ)`

---

## Câu 11 `(5đ)`

Đáp án mẫu:

```gitignore
# Maven
target/

# Java
*.class

# IDE
.idea/
*.iml
.vscode/

# OS
.DS_Store

# Logs
*.log
```

Chấm:

- Có `target/`. `(1.25đ)`
- Có `*.class`. `(1đ)`
- Có IDE files. `(1.25đ)`
- Có OS/logs hoặc file rác tương đương. `(1đ)`
- Format hợp lý. `(0.5đ)`

## Câu 12 `(8đ)`

Đáp án mẫu:

```xml
<dependencies>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.2</version>
        <scope>test</scope>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
            <configuration>
                <release>17</release>
            </configuration>
        </plugin>

        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.2.5</version>
        </plugin>
    </plugins>
</build>
```

Chấm:

- Có JUnit 5 dependency. `(2đ)`
- Có `scope test`. `(1đ)`
- Có `maven-compiler-plugin`. `(1.5đ)`
- Có Java 17/release 17. `(1đ)`
- Có `maven-surefire-plugin`. `(1.5đ)`
- XML nesting hợp lý. `(1đ)`
