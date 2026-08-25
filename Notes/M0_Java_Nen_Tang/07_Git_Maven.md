# Bài học: Git & Maven - Khởi tạo shopcore

Module: `M0-5 · Git & Maven`

Mục tiêu của bài này:

- Hiểu Git ở mức làm việc thật: commit, branch, merge, rebase, stash, conflict.
- Biết workflow Pull Request: tạo nhánh, code, push, mở PR, review, merge.
- Hiểu Maven lifecycle: `validate`, `compile`, `test`, `package`, `install`, `deploy`.
- Đọc và chỉnh được `pom.xml`: dependencies, plugins, properties, profiles.
- Biết tạo `.gitignore`, README skeleton và cấu trúc Maven chuẩn cho `shopcore`.

---

# Phần 1: Git là gì?

Git là hệ thống quản lý phiên bản.

Nó giúp mình trả lời 4 câu hỏi:

| Câu hỏi | Git giúp bằng |
|---|---|
| Code đã thay đổi gì? | `git diff` |
| Ai thay đổi? Khi nào? | `git log` |
| Muốn thử hướng mới mà không phá code chính? | `branch` |
| Code bị lỗi, muốn quay lại bản ổn? | `checkout`, `revert`, `reset` |

Trong dự án thật, Git không chỉ để lưu code. Git là cách team phối hợp.

---

## 1. Working tree, staging area, repository

Git có 3 vùng quan trọng:

```text
Working tree  ->  Staging area  ->  Repository
file đang sửa     file chuẩn bị commit   lịch sử commit
```

Ví dụ:

```bash
git status
git add README.md
git commit -m "docs: add project overview"
```

Ý nghĩa:

- `git status`: xem file nào đang thay đổi.
- `git add`: đưa file vào staging area.
- `git commit`: chốt thay đổi thành một mốc lịch sử.

Một commit tốt nên nhỏ, rõ ý, và có message dễ hiểu.

Ví dụ commit message tốt:

```text
feat: add product domain model
test: add binary search test cases
docs: update shopcore setup guide
fix: validate product price before build
```

---

## 2. Các lệnh Git cơ bản

| Lệnh | Ý nghĩa |
|---|---|
| `git status` | Xem trạng thái file |
| `git diff` | Xem nội dung đang sửa |
| `git add <file>` | Đưa file vào staging |
| `git commit -m "message"` | Tạo commit |
| `git log --oneline` | Xem lịch sử ngắn |
| `git restore <file>` | Bỏ thay đổi chưa commit |
| `git switch <branch>` | Chuyển branch |
| `git switch -c <branch>` | Tạo và chuyển sang branch mới |

Lưu ý:

```bash
git restore file.java
```

Lệnh này bỏ thay đổi chưa commit trong file đó. Khi dùng phải chắc chắn mình không cần phần sửa nữa.

---

# Phần 2: Branch

Branch là nhánh làm việc.

Ví dụ dự án có branch chính:

```text
main
```

Khi muốn làm feature mới, không sửa trực tiếp trên `main`, mà tạo branch:

```bash
git switch -c feature/product-domain
```

Workflow phổ biến:

```text
main
  |
  +-- feature/product-domain
```

Sau khi code xong:

```bash
git add .
git commit -m "feat: add product domain"
git push origin feature/product-domain
```

Rồi mở Pull Request để merge vào `main`.

---

## 3. Vì sao không code thẳng vào main?

Vì `main` nên là nhánh ổn định.

Nếu code thẳng vào `main`:

- Dễ làm hỏng code đang chạy.
- Khó review.
- Khó tách từng feature.
- Khó rollback.

Làm đúng hơn:

```text
main: code ổn định
feature/*: code đang làm
bugfix/*: sửa lỗi
hotfix/*: sửa lỗi gấp
```

Ví dụ tên branch:

```text
feature/product-domain
feature/maven-setup
bugfix/product-price-validation
docs/readme-setup
```

---

# Phần 3: Merge và Rebase

## 4. Merge là gì?

`merge` là lấy thay đổi từ branch khác nhập vào branch hiện tại.

Ví dụ đang ở `main`, muốn nhập branch feature:

```bash
git switch main
git merge feature/product-domain
```

Merge giữ lịch sử theo kiểu có thể thấy nhánh đã tách ra rồi nhập lại.

Ví dụ:

```text
A---B---C main
     \ 
      D---E feature
```

Sau merge:

```text
A---B---C---M main
     \     /
      D---E
```

`M` là merge commit.

---

## 5. Rebase là gì?

`rebase` là đặt lại gốc branch của mình lên đầu branch khác.

Ví dụ:

```bash
git switch feature/product-domain
git rebase main
```

Ý tưởng:

```text
Trước:
A---B---C main
     \
      D---E feature

Sau:
A---B---C---D'---E' feature
```

Rebase làm lịch sử nhìn thẳng hơn.

Nhưng nhớ nguyên tắc quan trọng:

> Không rebase branch public mà người khác cũng đang dùng nếu chưa thống nhất.

Với cá nhân đang học, có thể dùng rebase để cập nhật branch feature từ `main`.

---

## 6. Merge vs Rebase

| Tiêu chí | Merge | Rebase |
|---|---|---|
| Mục tiêu | Nhập branch | Viết lại base của branch |
| Lịch sử | Giữ nhánh rẽ | Lịch sử thẳng hơn |
| An toàn cho team | Dễ an toàn hơn | Cần cẩn thận nếu branch đã push |
| Khi dùng | Merge PR vào main | Cập nhật feature branch theo main |

Cách nhớ:

```text
merge = nhập nhánh
rebase = dời nền nhánh
```

---

# Phần 4: Conflict

## 7. Conflict là gì?

Conflict xảy ra khi Git không tự quyết được nên giữ thay đổi nào.

Ví dụ bạn sửa:

```java
String name = "Product";
```

Người khác cũng sửa cùng dòng:

```java
String name = "Item";
```

Khi merge, Git có thể tạo conflict:

```text
<<<<<<< HEAD
String name = "Product";
=======
String name = "Item";
>>>>>>> feature/item-name
```

Bạn phải sửa tay thành bản đúng:

```java
String name = "Product";
```

Sau đó:

```bash
git add Product.java
git commit
```

Nếu conflict khi rebase:

```bash
git add Product.java
git rebase --continue
```

---

## 8. Quy trình xử lý conflict

Khi gặp conflict:

1. Đọc file bị conflict.
2. Tìm các đoạn `<<<<<<<`, `=======`, `>>>>>>>`.
3. Hiểu ý nghĩa hai phía.
4. Sửa thành code cuối cùng đúng.
5. Chạy test nếu có.
6. `git add`.
7. Tiếp tục merge/rebase.

Tuyệt đối không sửa conflict bằng cách xóa đại cho hết dấu nếu chưa hiểu logic.

---

# Phần 5: Stash và Cherry-pick

## 9. Stash

`stash` dùng khi đang sửa dở nhưng cần chuyển branch gấp.

Ví dụ:

```bash
git stash
git switch main
```

Lấy lại phần sửa:

```bash
git stash pop
```

Các lệnh thường gặp:

| Lệnh | Ý nghĩa |
|---|---|
| `git stash` | Cất thay đổi hiện tại |
| `git stash list` | Xem danh sách stash |
| `git stash pop` | Lấy stash gần nhất và xóa khỏi danh sách |
| `git stash apply` | Lấy stash nhưng giữ trong danh sách |

Stash hữu ích, nhưng không nên lạm dụng. Nếu một phần việc đã rõ, commit nhỏ thường tốt hơn.

---

## 10. Cherry-pick

`cherry-pick` là lấy một commit cụ thể từ branch khác đem sang branch hiện tại.

Ví dụ:

```bash
git cherry-pick abc1234
```

Dùng khi:

- Có một bugfix nhỏ nằm ở branch khác.
- Chỉ muốn lấy đúng commit đó.
- Không muốn merge toàn bộ branch.

Trong giai đoạn này, bạn chỉ cần nhận diện cherry-pick, chưa cần dùng nhiều.

---

# Phần 6: Pull Request Workflow

## 11. Pull Request là gì?

Pull Request, thường gọi là PR, là yêu cầu nhập code từ branch này vào branch khác.

Workflow thật:

```text
1. Tạo branch từ main
2. Code
3. Commit
4. Push branch lên GitHub
5. Mở Pull Request
6. Review
7. Sửa nếu cần
8. Merge vào main
```

Ví dụ:

```bash
git switch main
git pull
git switch -c feature/maven-setup

# sửa code

git add .
git commit -m "build: initialize maven project"
git push origin feature/maven-setup
```

Sau đó lên GitHub mở PR.

---

## 12. Một PR tốt cần gì?

Một PR tốt nên có:

- Tên rõ ràng.
- Nội dung thay đổi ngắn gọn.
- Cách test.
- Không trộn quá nhiều mục tiêu.

Ví dụ PR description:

```md
## Summary
- Initialize Maven project structure
- Add Java 17 config
- Add README skeleton

## Test
- mvn test
```

Một PR không tốt:

```text
update code
```

Vì người review không biết bạn làm gì.

---

# Phần 7: Maven là gì?

Maven là công cụ build project Java.

Nó giúp:

- Quản lý dependencies.
- Compile code.
- Chạy test.
- Đóng gói app.
- Quản lý plugin build.
- Chuẩn hóa cấu trúc project.

Maven dùng file trung tâm:

```text
pom.xml
```

`pom` = Project Object Model.

---

## 13. Cấu trúc Maven chuẩn

Cấu trúc cơ bản:

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

Ý nghĩa:

| Đường dẫn | Chứa gì |
|---|---|
| `src/main/java` | Code chính |
| `src/main/resources` | Config/resource chính |
| `src/test/java` | Unit test |
| `src/test/resources` | Resource cho test |
| `pom.xml` | Cấu hình Maven |
| `.gitignore` | File không đưa vào Git |
| `README.md` | Tài liệu dự án |

---

## 14. Maven lifecycle

Maven có lifecycle gồm nhiều phase.

Các phase quan trọng:

| Phase | Ý nghĩa |
|---|---|
| `validate` | Kiểm tra project hợp lệ |
| `compile` | Compile code chính |
| `test` | Chạy unit test |
| `package` | Đóng gói thành `.jar` hoặc `.war` |
| `install` | Đưa artifact vào local Maven repository |
| `deploy` | Đẩy artifact lên remote repository |

Lệnh thường dùng:

```bash
mvn validate
mvn compile
mvn test
mvn package
mvn install
```

Điểm cần nhớ:

> Chạy phase sau sẽ tự chạy các phase trước đó.

Ví dụ:

```bash
mvn test
```

Sẽ chạy các bước trước test như validate và compile.

```bash
mvn package
```

Sẽ compile, test rồi package.

---

## 15. Maven dependency

Dependency là thư viện project cần dùng.

Ví dụ muốn dùng JUnit:

```xml
<dependencies>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.2</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

Ý nghĩa:

| Tag | Ý nghĩa |
|---|---|
| `groupId` | Nhóm/tổ chức phát hành thư viện |
| `artifactId` | Tên thư viện |
| `version` | Phiên bản |
| `scope` | Phạm vi dùng |

`scope` thường gặp:

| Scope | Ý nghĩa |
|---|---|
| `compile` | Dùng khi compile và runtime |
| `test` | Chỉ dùng khi test |
| `runtime` | Không cần compile, cần khi chạy |
| `provided` | Môi trường chạy cung cấp sẵn |

---

## 16. Maven properties

Properties giúp tránh lặp version.

Ví dụ:

```xml
<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <junit.version>5.10.2</junit.version>
</properties>
```

Dùng lại:

```xml
<version>${junit.version}</version>
```

Lợi ích:

- Dễ đổi version.
- File `pom.xml` dễ đọc hơn.
- Tránh mỗi chỗ một version.

---

## 17. Maven plugin

Dependency là thư viện app dùng.

Plugin là công cụ Maven dùng trong quá trình build.

Ví dụ plugin compile Java 17:

```xml
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
    </plugins>
</build>
```

Cách phân biệt:

```text
dependency = thư viện cho code
plugin = công cụ cho build
```

Ví dụ:

| Thứ | Loại |
|---|---|
| JUnit | Dependency |
| Lombok | Dependency/annotation processor |
| Maven Compiler Plugin | Plugin |
| Maven Surefire Plugin | Plugin chạy test |

---

## 18. Maven profile

Profile là cấu hình build theo môi trường.

Ví dụ:

```xml
<profiles>
    <profile>
        <id>dev</id>
        <properties>
            <app.env>dev</app.env>
        </properties>
    </profile>

    <profile>
        <id>prod</id>
        <properties>
            <app.env>prod</app.env>
        </properties>
    </profile>
</profiles>
```

Chạy với profile:

```bash
mvn package -Pdev
mvn package -Pprod
```

Giai đoạn này chỉ cần hiểu profile là cách đổi cấu hình build theo ngữ cảnh.

Khi sang Spring Boot, bạn sẽ gặp thêm Spring profile như:

```text
application-dev.yml
application-prod.yml
```

Maven profile và Spring profile không phải một thứ, dù đều có chữ profile.

---

# Phần 8: pom.xml mẫu cho shopcore giai đoạn M0

Đây là mẫu Maven Java 17 đơn giản:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>shopcore</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>shopcore</name>

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

Giai đoạn M0 chưa cần Spring Boot parent. Khi sang M1, mình sẽ chuyển sang Spring Boot project đúng chuẩn.

---

# Phần 9: .gitignore cho Java/Maven/IDE

File `.gitignore` giúp không commit file rác.

Mẫu cơ bản:

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

Không commit:

- `target/`
- file build generated
- file cấu hình IDE cá nhân
- log tạm

Nên commit:

- `pom.xml`
- `README.md`
- `src/main/java`
- `src/test/java`
- tài liệu setup cần cho team

---

# Phần 10: README skeleton cho shopcore

README không cần dài, nhưng phải giúp người khác chạy được project.

Mẫu:

```md
# shopcore

Backend learning project for Java ecosystem.

## Tech stack

- Java 17
- Maven
- JUnit 5

## Requirements

- JDK 17+
- Maven 3.9+

## Run tests

```bash
mvn test
```

## Build

```bash
mvn package
```

## Project structure

```text
src/main/java      production code
src/test/java      test code
```
```

Khi sang Spring Boot, README sẽ bổ sung:

- cách chạy app
- env vars
- database
- API docs
- Docker

---

# Phần 11: Bài tập thực hành bắt buộc

## Bài 1: Lệnh Git căn bản

Tạo một file note tạm, sau đó chạy:

```bash
git status
git diff
git add <file>
git commit -m "docs: add git practice note"
git log --oneline
```

Bạn cần giải thích được:

- Trước `git add`, file nằm ở đâu?
- Sau `git add`, file nằm ở đâu?
- Sau `git commit`, Git lưu cái gì?

---

## Bài 2: Branch workflow

Tạo branch:

```bash
git switch -c feature/maven-setup
```

Thêm/sửa file:

```text
README.md
pom.xml
.gitignore
```

Commit:

```bash
git add .
git commit -m "build: initialize maven structure"
```

Bạn cần hiểu:

- Vì sao branch tên `feature/maven-setup` hợp lý?
- Vì sao không code thẳng vào `main`?

---

## Bài 3: Conflict mini

Tạo conflict bằng cách:

1. Ở `main`, sửa cùng một dòng trong README.
2. Ở branch feature, cũng sửa dòng đó khác đi.
3. Merge feature vào main.
4. Tự resolve conflict.

Bạn cần biết nhận diện:

```text
<<<<<<< HEAD
=======
>>>>>>> branch-name
```

Và sửa thành nội dung cuối cùng đúng.

---

## Bài 4: Maven lifecycle

Chạy lần lượt:

```bash
mvn validate
mvn compile
mvn test
mvn package
```

Bạn cần giải thích được:

- `compile` làm gì?
- `test` làm gì?
- `package` tạo ra gì?
- Vì sao `mvn package` thường chạy cả test?

---

## Bài 5: Đọc pom.xml

Nhìn vào `pom.xml`, chỉ ra:

- `groupId`
- `artifactId`
- `version`
- `dependencies`
- `plugins`
- Java version
- test framework

Nếu bạn đọc được `pom.xml`, sau này đọc Spring Boot project sẽ đỡ sợ hơn rất nhiều.

---

# Phần 12: Những lỗi hay gặp

## Lỗi 1: Commit file rác

Ví dụ commit:

```text
target/
.idea/
*.class
```

Sai vì đây là file sinh ra từ build hoặc cấu hình máy cá nhân.

Cách tránh:

- Viết `.gitignore`.
- Luôn chạy `git status` trước commit.

---

## Lỗi 2: Commit message quá mơ hồ

Không tốt:

```text
update
fix
code
final
```

Tốt hơn:

```text
build: add maven compiler plugin
docs: add setup instruction
test: add product builder tests
```

---

## Lỗi 3: Không chạy test trước khi merge

Trước khi merge PR, tối thiểu nên chạy:

```bash
mvn test
```

Nếu project chưa có test nhiều, vẫn nên chạy để kiểm tra compile và test framework.

---

## Lỗi 4: Nhầm dependency và plugin

Nhớ:

```text
dependency = thứ code của mình import và dùng
plugin = thứ Maven dùng để build/test/package
```

Ví dụ:

```java
import org.junit.jupiter.api.Test;
```

JUnit là dependency.

Còn `maven-surefire-plugin` là plugin để Maven chạy test.

---

## Lỗi 5: Nghĩ `mvn install` là cài app vào máy

`mvn install` không phải install app như cài Chrome.

Nó build artifact và đưa vào local Maven repository:

```text
~/.m2/repository
```

Dùng khi project khác trên máy cần phụ thuộc vào artifact đó.

---

# Phần 13: Checklist tự kiểm tra

Bạn đã ổn M0-5 nếu trả lời được:

- Git khác GitHub ở đâu?
- Working tree, staging area, repository là gì?
- `git add` và `git commit` khác nhau thế nào?
- Branch dùng để làm gì?
- Merge khác rebase ở đâu?
- Conflict xảy ra khi nào?
- Resolve conflict gồm những bước nào?
- Stash dùng khi nào?
- Cherry-pick là gì?
- PR workflow gồm những bước nào?
- Maven dùng để làm gì?
- `pom.xml` chứa những gì?
- Dependency khác plugin thế nào?
- `mvn test` khác `mvn package` thế nào?
- Vì sao cần `.gitignore`?

---

# Phần 14: Deliverable của M0-5

Sau bài này, deliverable chuẩn là:

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

Yêu cầu:

- Repo tên đúng là `shopcore`.
- Dùng Java 17.
- Maven chạy được `mvn test`.
- Có `.gitignore` Java/Maven/IDE.
- Có README skeleton.
- Có ít nhất một branch feature.
- Có ít nhất một PR hoặc mô phỏng PR workflow.
- Có một lần tự tạo và tự resolve conflict để hiểu cơ chế.

---

# Tóm tắt cực ngắn

Git:

```text
status -> add -> commit -> branch -> push -> PR -> merge
```

Maven:

```text
pom.xml -> dependency/plugin -> compile -> test -> package
```

Cách nhớ quan trọng:

```text
Git quản lý lịch sử code.
GitHub hỗ trợ collaboration quanh Git.
Maven quản lý build và dependency.
pom.xml là trái tim Maven project.
```

Nếu nắm được M0-5, bạn đã có nền để bước sang Spring Boot mà không bị lúng túng ở phần project setup.
