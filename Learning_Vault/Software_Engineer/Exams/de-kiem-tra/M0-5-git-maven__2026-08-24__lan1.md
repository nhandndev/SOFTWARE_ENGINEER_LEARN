# Đề kiểm tra M0-5: Git & Maven - lần 1

Topic: `M0-5-git-maven`  
Chế độ: `DAY_DU`  
Tổng điểm thô: 90 điểm  
Normalize: `(điểm thô / 90) × 100`

## Hướng dẫn

- Trả lời ngay dưới dòng `**Trả lời:**`.
- Với câu lệnh Git/Maven, không cần nhớ 100% option hiếm, nhưng phải đúng ý nghĩa và đúng workflow.
- Với câu tình huống, ưu tiên giải thích cách xử lý thực tế.
- Không mở file đáp án khi đang làm bài.

---

## Phần A - Lý thuyết ngắn

### Câu 1. Git khác GitHub ở điểm nào? Vì sao học backend vẫn cần biết cả hai? `(3đ)`

**Trả lời:**
git và công cụ dùng để push code , github là nơi dùng để lưu trữ code , và backend cần phải biết để có thể đẩy code lên github , làm việc nhóm cũng như là có thể hạn chế được conflict , có thể truy xuất log , lịch sử commit , nói chung là phù hợp với làm dự án với nhiều người , công ty , nhóm , cá nhân

### Câu 2. Giải thích 3 vùng trong Git: working tree, staging area, repository. `(3đ)`

**Trả lời:** working tree là file đang làm , hiển trị trên ide . staging area là chuẩn bị commit , có nghĩa là khi bạn thay đổi trên working tree khi bạn add thì nó sẽ nằm trong lượt commit tiếp theo và nó giống hàng chờ và khi bạn commit thì  repossitory là lichj sử commit , lưu trữ các commit của bạn và khi bạn push lên thì nó sẽ đẩy toàn bộ commit lên github hoặc gitlab hoặc một thứ gì đó tựa tựa vậy


### Câu 3. `git add` và `git commit` khác nhau thế nào? `(3đ)`

**Trả lời:** git add là trong quá trình từ working tree lên staging area , có tác dụng add file thay đổi vào lượt commit tiếp theo , còn git commit là từ staging area đến repossitory , dùng để thay đổi toàn bộ nội dung có trong staging area


### Câu 4. Branch dùng để làm gì? Vì sao không nên code trực tiếp trên `main`? `(3đ)`

**Trả lời:** Branch dùng để tách nhánh ra . Lý do mà không nên tạo code trực tiếp trên main vì khó phân định feature ra , khó roll back , dễ bị conflict nếu có nhiều người cùng phát triển , khó để xem được sự thay đổi , khó mà quay lại code cũ được , tách ra để nhiều người cùng phát triển. , sau đó là pull request r reivew rồi nếu ok rồi mứoi merge vô dự án 


### Câu 5. Merge và rebase khác nhau thế nào? Nêu khi nào nên dùng mỗi cái. `(3đ)`

**Trả lời:** Merge là dung hợp nhánh lại sao cho vẫn giữ được lịch sử merge phân nhánh , giúp gộp nhánh , giữ nguyên lịch sử và an toàn với nhánh main , rebase hay còn gọi là làm lại acis base code , dùng để gộp lại nhánh sao cho những thay đổi ở nhánh mứoi sẽ áp đặt lên nhánh hiện tại , có nghĩa là 1 đường thẳng tuyến tính chứu không như merge là vẫn là đường nhánh , nó sẽ rewrite lại và phù hợp cho 1 người  , nó sẽ k phù hợp khi làm theo team đang làm trên nhánh main nhiều người 


### Câu 6. Conflict trong Git xảy ra khi nào? Khi gặp conflict thì cần làm gì? `(3đ)`

**Trả lời:** conflict nghĩa là git không thể tự quyết được nào thay đổi nào nên giữ , thay đổi nào nên không , ví dụ như tôi đang làm trên nhánh mới và thay đổi ở class A , lúc đó thì ở main có ngừoi thay đổi ở class A luôn , khi mà ngta thay đổi r tôi mới push thì nó sẽ bị conflict và lúc này ta cần phải xem source code vì nó sẽ để lại chỗ conflict , ta cần đọc và đưa ra quyét định nên giwux cái nào r add thôi


### Câu 7. `git stash` dùng trong tình huống nào? Khác gì với commit tạm? `(3đ)`

**Trả lời:** git stash dùng trong tình huống đang update ở nhánh khác và khi cần phải quay lại nhánh khác thì ta sẽ dùng , kiểu giống như stash sẽ giữ lại code cũ ở nhánh cũ và ta sẽ qua nhánh khác , stash sẽ không tạo lịch sử commit và ta có thể stash pop hoặc apply


### Câu 8. Maven là gì? Maven giải quyết những vấn đề gì trong project Java? `(3đ)`

**Trả lời:** maven là công cụ build dự án của java , có tác dụng là có file pom dùng để quy ước chung dependency , phiên bản , plugins , profile , đóng gói , complie , chạy test ,validated ,...


### Câu 9. Dependency và plugin trong Maven khác nhau thế nào? Cho ví dụ mỗi loại. `(3đ)`

**Trả lời:** Dependency là các thư viện mà ta cần trong dự án , plugins là các tool của maven dùng để build , dependency ví dụ như là cái lombok , builder ,.., plugins ví dụ nhưu valid , complie , hoặc là cái plugins làm đẹp code quên tên rồi


### Câu 10. Giải thích các phase Maven sau: `compile`, `test`, `package`, `install`. `(3đ)`

**Trả lời:** complie để mà complie code , từ java thành .class, test là dùng để complie và unittest, package để từ source code thành các artifact có thể xử dụng ở nhiều nơi ( thành file jar ) tạo trong target , , install là tải nó lên local repository .


---

## Phần B - Tình huống

### Câu 11. Bạn đang sửa dở file `README.md` trên branch `feature/maven-setup`, nhưng cần chuyển gấp sang `main` để xem bug. Bạn chưa muốn commit phần sửa dở. Bạn làm gì? `(5đ)`

**Trả lời:**dùng stash để chuyển sang  . ban đầu là bạn sẽ dùng status , sau đó dùng stash , sau đó switch sang main , rồi ok rồi quay lại thì dùng stash apply hoặc là stash pop 


### Câu 12. Bạn lỡ commit cả thư mục `target/` và file `.class` vào Git. Hãy giải thích vì sao sai và cách xử lý để lần sau không bị nữa. `(5đ)`

**Trả lời:**mấy file đó là mấy file rác , cần phải có gitignore , nếu bạn đã lỡ add rồi thì có thể dùng remove được và gitignore nó sẽ tránh add file bị ignore vô


### Câu 13. Team yêu cầu mọi thay đổi phải đi qua Pull Request. Bạn muốn thêm `.gitignore` và README skeleton cho `shopcore`. Hãy mô tả workflow từ lúc tạo branch đến khi merge. `(5đ)`

**Trả lời:**
git switch main
git pull
git switch -c feature/readme-gitignore
git status
git add .gitignore README.md
git commit -m "docs: add readme and gitignore"
git push origin feature/readme-gitignore


### Câu 14. Khi merge branch `feature/readme` vào `main`, Git báo conflict trong `README.md` với đoạn:

```text
<<<<<<< HEAD
Run test with mvn test
=======
Run all tests using mvn clean test
>>>>>>> feature/readme
```

Bạn sẽ sửa file thành gì và làm tiếp các lệnh nào? `(5đ)`

**Trả lời:**  tôi sẽ sửa file thành Run test with mvn test rồi tôi add rồi commit r push thôi


### Câu 15. Bạn thấy trong `pom.xml` có JUnit ở `<dependencies>` và `maven-surefire-plugin` ở `<plugins>`. Vì sao cần cả hai? `(5đ)`

**Trả lời:** vì nó cần thưu viện của JUnit và cần phải có tool để phụ vụ cho việc build thì là có plugins


### Câu 16. Bạn chạy `mvn package` và thấy Maven cũng chạy test. Điều này có bình thường không? Giải thích theo Maven lifecycle. `(5đ)`

**Trả lời:** bình thường vì đó là trong cycle build của meven , validated , complie , test , package , ínstall deploy thì khi chạy package nó sẽ chạy từ validated đến package


### Câu 17. Một bạn nói: "`mvn install` là cài app vào máy". Nhận định này đúng hay sai? Giải thích. `(5đ)`

**Trả lời:**hong , app cài vào maven local repository chứ k chỉ vào máy , chỉ vào máy (. target) là package


### Câu 18. Bạn chuẩn bị khởi tạo `shopcore` giai đoạn M0. Hãy liệt kê cấu trúc thư mục/file Maven tối thiểu cần có và mỗi phần dùng để làm gì. `(5đ)`

**Trả lời:**
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
pom dùng để cho dependency , profile , plugins , các thông tin cảu dự án , .gitignore là để git nó ignore những file dc liệt kê trong đây , src/main nơi chứa code , test nơi chứa unittest , test


---

## Phần C - Mini practice

### Câu 19. Viết chuỗi lệnh Git hợp lý cho workflow sau: tạo branch `feature/maven-setup`, kiểm tra trạng thái, add file, commit, xem log ngắn, push branch lên remote. `(10đ)`

**Trả lời:**
git switch -c feature/maven-setup
git status
git add pom.xml README.md .gitignore
git commit -m "build: initialize maven project"
git log --oneline
git push origin feature/maven-setup
mà bình thường tôi xài github desktop là tôi sẽ vô github desktop xong xem status , xong tôi tự add tỏng vs code là nó có ghi luôn , tôi chỉ cần djyetje xong tôi ấn commit rồi push là dc 


### Câu 20. Viết một `pom.xml` tối giản cho project `shopcore` dùng Java 17, JUnit 5, có `maven-compiler-plugin` và `maven-surefire-plugin`. Không cần đúng từng version tuyệt đối, nhưng cấu trúc phải hợp lý. `(10đ)`

**Trả lời:**
Tôi xài start.spring.io là được mà 
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