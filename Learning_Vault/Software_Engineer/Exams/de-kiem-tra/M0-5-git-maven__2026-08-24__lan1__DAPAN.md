# Đáp án M0-5: Git & Maven - lần 1

Topic: `M0-5-git-maven`  
Chế độ: `DAY_DU`  
Tổng điểm thô: 90 điểm  
Normalize: `(điểm thô / 90) × 100`

---

## Câu 1 `(3đ)`

Đáp án:

- Git là version control system chạy local để quản lý lịch sử code. `(1.5đ)`
- GitHub là nền tảng remote/collaboration quanh Git: repo online, PR, review, issue, CI. `(1đ)`
- Backend dev cần biết cả hai vì làm team phải branch, commit, push, PR, review, merge. `(0.5đ)`

## Câu 2 `(3đ)`

Đáp án:

- Working tree: file đang sửa trong thư mục làm việc. `(1đ)`
- Staging area: vùng đã `git add`, chuẩn bị đưa vào commit. `(1đ)`
- Repository: lịch sử commit đã lưu. `(1đ)`

## Câu 3 `(3đ)`

Đáp án:

- `git add`: chọn thay đổi đưa vào staging. `(1.5đ)`
- `git commit`: lưu snapshot từ staging vào lịch sử repo. `(1.5đ)`

## Câu 4 `(3đ)`

Đáp án:

- Branch là nhánh làm việc độc lập để phát triển feature/bugfix. `(1đ)`
- Không code trực tiếp trên `main` vì `main` nên ổn định, dễ review, dễ rollback, tránh phá code chung. `(1.5đ)`
- Nêu ví dụ branch như `feature/maven-setup`, `bugfix/...`. `(0.5đ)`

## Câu 5 `(3đ)`

Đáp án:

- Merge nhập thay đổi từ branch khác, giữ lịch sử nhánh và có thể tạo merge commit. `(1đ)`
- Rebase dời base của branch lên commit mới hơn, làm lịch sử thẳng hơn nhưng viết lại commit. `(1đ)`
- Merge thường dùng khi nhập PR vào `main`; rebase thường dùng để cập nhật feature branch theo `main`, cẩn thận với branch public. `(1đ)`

## Câu 6 `(3đ)`

Đáp án:

- Conflict xảy ra khi hai branch sửa cùng vùng/dòng mà Git không tự quyết được. `(1đ)`
- Cần mở file, đọc `<<<<<<<`, `=======`, `>>>>>>>`, chọn/sửa nội dung cuối cùng đúng. `(1đ)`
- Sau đó `git add`, rồi `git commit` hoặc `git rebase --continue` tùy thao tác. `(1đ)`

## Câu 7 `(3đ)`

Đáp án:

- `git stash` dùng để cất thay đổi đang sửa dở khi cần chuyển branch/làm việc khác. `(1.5đ)`
- `stash` không tạo commit chính thức trong lịch sử branch như commit. `(1đ)`
- Có thể lấy lại bằng `git stash pop` hoặc `git stash apply`. `(0.5đ)`

## Câu 8 `(3đ)`

Đáp án:

- Maven là build tool/project management tool cho Java. `(1đ)`
- Quản lý dependencies qua `pom.xml`. `(0.75đ)`
- Compile, chạy test, package, install/deploy artifact. `(1đ)`
- Chuẩn hóa cấu trúc project. `(0.25đ)`

## Câu 9 `(3đ)`

Đáp án:

- Dependency là thư viện code import và dùng, ví dụ JUnit, Lombok. `(1.5đ)`
- Plugin là công cụ Maven dùng trong build/test/package, ví dụ compiler plugin, surefire plugin. `(1.5đ)`

## Câu 10 `(3đ)`

Đáp án:

- `compile`: biên dịch code chính. `(0.75đ)`
- `test`: chạy unit test. `(0.75đ)`
- `package`: đóng gói artifact như `.jar`, thường chạy các phase trước. `(0.75đ)`
- `install`: đưa artifact vào local Maven repository `~/.m2/repository`. `(0.75đ)`

---

## Câu 11 `(5đ)`

Đáp án:

- Chạy `git status` để xem thay đổi. `(1đ)`
- Dùng `git stash` hoặc `git stash push -m "..."` để cất sửa dở. `(1.5đ)`
- Chuyển sang `main` bằng `git switch main`. `(1đ)`
- Khi quay lại branch cũ, dùng `git stash pop` hoặc `git stash apply`. `(1.5đ)`

## Câu 12 `(5đ)`

Đáp án:

- Sai vì `target/`, `.class` là output/generated file, không phải source cần version control. `(1.5đ)`
- Thêm vào `.gitignore`: `target/`, `*.class`. `(1.5đ)`
- Nếu đã commit thì cần xóa khỏi Git tracking bằng cách commit xóa file khỏi repo, ví dụ `git rm -r --cached target` rồi commit. `(1.5đ)`
- Luôn chạy `git status` trước commit. `(0.5đ)`

## Câu 13 `(5đ)`

Đáp án:

Workflow đủ ý:

```bash
git switch main
git pull
git switch -c feature/readme-gitignore
# sửa .gitignore và README.md
git status
git add .gitignore README.md
git commit -m "docs: add readme and gitignore"
git push origin feature/readme-gitignore
```

Sau đó mở PR trên GitHub, ghi summary/test, review, sửa nếu cần, merge vào `main`. Chấm theo ý:

- Tạo branch từ `main`. `(1đ)`
- Sửa file và kiểm tra status/diff. `(1đ)`
- Add/commit message rõ. `(1đ)`
- Push branch. `(1đ)`
- Mở PR, review, merge. `(1đ)`

## Câu 14 `(5đ)`

Đáp án:

Nội dung sửa hợp lý, ví dụ:

```text
Run all tests using mvn clean test
```

Hoặc câu khác miễn rõ và không còn marker conflict. Chấm:

- Xóa toàn bộ marker `<<<<<<<`, `=======`, `>>>>>>>`. `(1đ)`
- Chọn/sửa nội dung cuối cùng hợp lý. `(1.5đ)`
- Chạy test hoặc kiểm tra lại file. `(0.75đ)`
- `git add README.md`. `(0.75đ)`
- Hoàn tất merge bằng `git commit` nếu cần, hoặc tiếp tục theo hướng dẫn của Git. `(1đ)`

## Câu 15 `(5đ)`

Đáp án:

- JUnit dependency cung cấp API/framework test để code test import và chạy. `(2đ)`
- Surefire plugin là plugin Maven dùng để phát hiện và chạy test trong phase `test`. `(2đ)`
- Một cái là thư viện cho code, một cái là công cụ build. `(1đ)`

## Câu 16 `(5đ)`

Đáp án:

- Bình thường. `(1đ)`
- Maven lifecycle chạy phase trước trước khi tới phase sau. `(2đ)`
- `package` nằm sau `test`, nên thường compile và chạy test rồi mới đóng gói. `(1.5đ)`
- Có thể skip test nhưng không nên lạm dụng trong workflow học/team. `(0.5đ)`

## Câu 17 `(5đ)`

Đáp án:

- Sai nếu hiểu như cài app để chạy như phần mềm desktop. `(1.5đ)`
- `mvn install` build artifact và đưa vào local Maven repository. `(2đ)`
- Local repo thường là `~/.m2/repository`. `(1đ)`
- Hữu ích khi project khác trên máy cần dependency artifact đó. `(0.5đ)`

## Câu 18 `(5đ)`

Đáp án:

Cấu trúc tối thiểu:

```text
shopcore/
├── pom.xml
├── README.md
├── .gitignore
└── src/
    ├── main/
    │   ├── java/
    │   └── resources/
    └── test/
        ├── java/
        └── resources/
```

Chấm:

- Có `pom.xml`. `(1đ)`
- Có `src/main/java` và `src/main/resources`. `(1đ)`
- Có `src/test/java` và `src/test/resources`. `(1đ)`
- Có `.gitignore`. `(1đ)`
- Có README skeleton và giải thích được vai trò từng phần. `(1đ)`

---

## Câu 19 `(10đ)`

Đáp án mẫu:

```bash
git switch -c feature/maven-setup
git status
git add pom.xml README.md .gitignore
git commit -m "build: initialize maven project"
git log --oneline
git push origin feature/maven-setup
```

Chấm:

- Tạo branch đúng. `(2đ)`
- Kiểm tra status/diff hợp lý. `(1đ)`
- Add file. `(2đ)`
- Commit message rõ. `(2đ)`
- Xem log ngắn. `(1đ)`
- Push đúng branch lên remote. `(2đ)`

## Câu 20 `(10đ)`

Đáp án mẫu:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>shopcore</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <properties>
        <maven.compiler.release>17</maven.compiler.release>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <junit.version>5.10.2</junit.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>${junit.version}</version>
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
</project>
```

Chấm:

- Có cấu trúc `<project>` và `modelVersion`. `(1đ)`
- Có `groupId`, `artifactId=shopcore`, `version`. `(2đ)`
- Có Java 17 trong properties/plugin. `(2đ)`
- Có JUnit 5 dependency scope test. `(2đ)`
- Có compiler plugin. `(1.5đ)`
- Có surefire plugin. `(1.5đ)`

