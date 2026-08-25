# Đề thi lại M0-5: Git & Maven - lỗi còn hở

Topic: `M0-5-git-maven`  
Chế độ: `THI_LAI`  
Trọng tâm: các câu đã sai/thiếu ở lần 1  
Tổng điểm thô: 48 điểm  
Normalize: `(điểm thô / 48) × 100`

## Hướng dẫn

- Trả lời ngay dưới dòng `**Trả lời:**`.
- Không cần viết dài, nhưng phải đủ bước xử lý thực tế.
- Ưu tiên command đúng và giải thích ngắn.
- Không mở file đáp án khi đang làm.

---

## Phần A - Lý thuyết ngắn

### Câu 1. Nói lại thật chuẩn: Git là gì, GitHub là gì? Vì sao nói "Git là công cụ push code" là chưa đủ? `(3đ)`

**Trả lời:** Git là công cụ để quản lý version ( có thể liệt kê là status ,add , commit ,push , .,,,) github là nơi để chứa source code , git là công cụ push code là chưa đủ vì nó còn có thể quản lý version nữa


### Câu 2. `git add` và `git commit` khác nhau thế nào? Dùng các từ: working tree, staging area, repository, snapshot. `(3đ)`

**Trả lời:**
git add là trong quá trình từ working sang staging area , add có nghĩa là sẽ thêm file đó vào lần commit tiếp theoe , git commit nghĩa là quá trình từ staging area sang repository , đây là quá trình ta commit sang local repository và tạo snapshot , còn push là từ local repository git sang github , sẽ push snapsot lên

### Câu 3. Dependency và plugin trong Maven khác nhau thế nào? Cho ví dụ rõ tên mỗi loại. `(3đ)`

**Trả lời:** dependency là thư viện dùng để import, plugin là công cụ hỗ trợ build maven , dependency có thể là lombok , builder , plugin là validated , complied .,,, 


### Câu 4. JUnit và `maven-surefire-plugin` khác vai trò ra sao trong project Maven? `(3đ)`

**Trả lời:** JUnit là dependency cung cấp @Test , maven-surfire-plugins là tool hỗ trợ trong maven , dùng để test


### Câu 5. Phân biệt `mvn package` và `mvn install`. Artifact nằm ở đâu sau mỗi lệnh? `(3đ)`

**Trả lời:** mvn package dùng để tạo aritfact , nằm ở /target  ở trong dự án . còn mvn instal thì cũng tạo artifact đó nhưng mà lưu ở local repository thì sau này dự án khác cũng có thể dùng lại artifact nó ở cùng 1 máy 


---

## Phần B - Tình huống thực tế

### Câu 6. Bạn lỡ commit thư mục `target/` lên Git. Sau đó bạn thêm `target/` vào `.gitignore`. Vì sao như vậy vẫn chưa đủ? Viết chuỗi lệnh xử lý đúng. `(5đ)`

**Trả lời:**
git status trước , sau đó là rm cache ( tôi k nhớ commadn lắm do k command nhiều) , rồi add .gitignore cái target/ vào sau đó là commit r push 

### Câu 7. Bạn merge branch `feature/readme` vào `main` và gặp conflict trong `README.md`. Hãy mô tả đủ các bước từ lúc mở file conflict đến lúc hoàn tất merge. `(5đ)`

**Trả lời:** bạn mở code ra và tìm dòng bị conflict , sau đó xem xét nên giữ gì , sau đó là add , commit r push


### Câu 8. Bạn đang sửa dở file trên branch `feature/maven-setup`, cần chuyển qua `main`, chưa muốn commit. Viết workflow stash đầy đủ, bao gồm cả lúc quay lại lấy code sửa dở. `(5đ)`

**Trả lời:**
đầu tiên là git status , sau đó là coi thay đổi ồi git stash push , sau đó là nó sẽ clean lại working , sau đó là git switch qua main , xong rồi add hay commit r push , rồi muốn quay lại thì git stash pop hoặc apply 

### Câu 9. Bạn đã push branch `feature/readme-gitignore` lên GitHub. Vì sao việc này chưa phải là merge vào `main`? Hãy mô tả các bước Pull Request còn lại. `(5đ)`

**Trả lời:**nó chỉ là mới push lên cái github thôi chứ chưa vô dự án , theo tôi hiểu là chỉ mới push branch lên thôi , ta cần phải PR nó nữa , PR thì cần tạo request , xong viết title , description rồi PR , cho leader review rồi accept merge vô


### Câu 10. Trong conflict sau, bạn sẽ sửa thành nội dung gì và chạy lệnh gì tiếp theo?

```text
<<<<<<< HEAD
Run test with mvn test
=======
Run all tests using mvn clean test
>>>>>>> feature/readme
```

`(5đ)`

**Trả lời:**  ;;

đầu tiên là git status sẽ tìm chỗ nào conflict , sau đó là xoá mấy cái === rồi để lại thứ muốn giữ , sau đó là add , commit ,push


---

## Phần C - Mini practice

### Câu 11. Viết `.gitignore` tối thiểu cho Java/Maven/IDE. `(5đ)`

**Trả lời:**
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


### Câu 12. Viết một đoạn `pom.xml` chỉ gồm phần `<dependencies>` và `<build><plugins>` có JUnit 5, `maven-compiler-plugin`, `maven-surefire-plugin`. `(8đ)`

**Trả lời:**
thường thường tôi dùng start.spring.io nên là tôi chỉ hiểu th chứu k viết lại dc đâu hihi 
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


