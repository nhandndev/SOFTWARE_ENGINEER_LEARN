# Lab 01 - Kiểm tra và chạy `shopcore`

> File Java đã được tạo sẵn ngay trong folder lab này. Bạn chỉ cần mở file đúng tên và tự viết code vào đó.

## Mục tiêu

Không học cách bấm start.spring.io. Phần đó công cụ làm sẵn rồi.

Lab này chỉ kiểm tra bạn hiểu một Spring Boot project tối thiểu cần gì để chạy REST API:

- `pom.xml` khai báo dependency nào.
- Class nào là entry point.
- Khi chạy `main`, Spring Boot tạo gì.
- Vì sao chưa có endpoint vẫn có thể nhận HTTP response.

## Việc phải kiểm tra trong `shopcore`

Không tạo lại project. Mở `pom.xml` và tìm dependency Spring Web:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

Project cần dùng Java 17 trở lên.

Sau đó tìm class có `@SpringBootApplication`, thường tên là:

```text
ShopcoreApplication.java
```

## File Java để đọc lại ý tưởng

```text
ShopcoreApplication.java
```

File này không cần viết nhiều. Bạn chỉ cần tự viết lại entry point tối thiểu để nhớ:

```java
@SpringBootApplication
public class ShopcoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopcoreApplication.class, args);
    }
}
```

Ý nghĩa:

- `@SpringBootApplication`: bật auto configuration và component scanning.
- `main`: điểm JVM bắt đầu chạy app.
- `SpringApplication.run`: tạo `ApplicationContext`, dựng bean, khởi động embedded Tomcat.

## Việc phải làm trong project thật

1. Mở `shopcore`.
2. Kiểm tra `pom.xml` có Spring Web.
3. Kiểm tra Java version là 17 trở lên.
4. Chạy class main.
5. Quan sát log Tomcat mở cổng `8080`.

## Kiểm tra

```bash
curl -i http://localhost:8080
```

Nhận `404` ở đây vẫn được: server đã chạy nhưng chưa có endpoint `/`.

## Tự trả lời

1. Class nào khởi động ứng dụng?
2. `ApplicationContext` được tạo khi nào?
3. Tomcat chạy bên ngoài hay được nhúng trong ứng dụng?
4. Vì sao `404` vẫn chứng minh server đang hoạt động?

## Hoàn thành

- [ ] Project duy nhất tên `shopcore`.
- [ ] Hiểu `pom.xml` đang kéo Spring Web vào project.
- [ ] Hiểu class main khởi động Spring Boot.
- [ ] Log cho thấy Tomcat chạy.
- [ ] Request tới cổng 8080 nhận HTTP response.

Tiếp theo: [Lab 02 - Ping Controller](../Lab_02_Ping_Controller/REQUEST.md).
