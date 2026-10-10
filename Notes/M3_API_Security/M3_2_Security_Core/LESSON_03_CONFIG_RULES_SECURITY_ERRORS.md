# M3-2 — Lesson03: Một SecurityFilterChain đọc được bằng lời

> Mục tiêu: tự dự đoán ai được gọi endpoint, nhận ra rule hở và nối lỗi Security với ProblemDetail đã học. Ví dụ chỉ để đọc, không project đã tích hợp.

## Tài liệu / video

- [Java configuration](https://docs.spring.io/spring-security/reference/servlet/configuration/java.html): bean chain, matching và nhiều chain.
- [Authorize HTTP requests](https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html): rule/method, first match và denyAll.
- [HTTP Basic](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/basic.html): failure entry point/challenge.
- [Boot JSON](https://docs.spring.io/spring-boot/reference/features/json.html): Boot4 dùng Jackson3 JsonMapper mặc định, không copy import ObjectMapper Jackson2 vào code mới một cách máy móc.
- Video tìm thêm: `Spring Security SecurityFilterChain requestMatchers hasRole first match 401 403`. Không dùng WebSecurityConfigurerAdapter.

## 1. Điều kiện trước khi chạy thật

POM hiện có webmvc/Lombok nhưng chưa Security. Dependency cần khi thực hành:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

Để BOM Boot quản lý version; không pin Security6 vào Boot4. Chỉ đọc in-memory demo dưới không cần JPA. Nếu chuyển sang UserRepository bài02 mới thêm JPA/PostgreSQL/migration phù hợp, không giả định DB đã có user table.

## 2. Contract security của ví dụ

Giả định endpoint đã tồn tại khi thực hành. GET products là public; GET me cần đăng nhập; các thao tác khác trên products cần ADMIN; admin routes cần ADMIN; mọi URL còn lại denyAll.

```text
GET /api/v1/products và /api/v1/products/{id} → public
GET /api/v1/me → authenticated
/api/v1/products (ngoài GET public) và /api/v1/products/** → ADMIN
/api/v1/admin/** → ADMIN
còn lại → deny
```

URL authorization kiểm method/path; query `?role=ADMIN` không cấp quyền. Security cho qua không tự tạo Controller method: route chưa tồn tại vẫn có thể404/405 ở MVC. Business ownership/tenant cần kiểm riêng khi nghiệp vụ có yêu cầu, không phải hasRole là mọi user đọc được mọi dữ liệu cá nhân.

## 3. Cấu hình minh họa có ranh giới an toàn

Class SecurityDemoConfig trong package được scan; imports Spring config/security/http, PasswordEncoder/BCrypt, UserDetailsService/InMemoryUserDetailsManager và các handler. Helper SecurityProblemWriter ở mục5. Chỉ bật profile `security-demo` khi thực hành local; raw password nhận từ env, không đưa lên Git. Không dùng cùng lúc UDS demo và UDS DB bài02.

```java
@Configuration
@Profile("security-demo")
public class SecurityDemoConfig {
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UserDetailsService demoUsers(
            PasswordEncoder encoder,
            @Value("${DEMO_USER_PASSWORD}") String userPassword,
            @Value("${DEMO_ADMIN_PASSWORD}") String adminPassword) {
        UserDetails user = User.withUsername("lan")
                .password(encoder.encode(userPassword)).roles("USER").build();
        UserDetails admin = User.withUsername("minh")
                .password(encoder.encode(adminPassword)).roles("ADMIN").build();
        return new InMemoryUserDetailsManager(user, admin);
    }

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http, SecurityProblemWriter writer) throws Exception {
        AuthenticationEntryPoint unauthenticated = (request, response, ex) -> {
            response.setHeader("WWW-Authenticate", "Basic realm=\"shopcore\"");
            writer.write(request, response, 401, "UNAUTHENTICATED",
                    "Authentication required");
        };
        AccessDeniedHandler denied = (request, response, ex) ->
                writer.write(request, response, 403, "ACCESS_DENIED",
                        "Access denied");

        http
            .csrf(Customizer.withDefaults())
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .requestCache(cache -> cache.disable())
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.authenticationEntryPoint(unauthenticated))
            .exceptionHandling(errors -> errors
                    .authenticationEntryPoint(unauthenticated)
                    .accessDeniedHandler(denied))
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(HttpMethod.GET,
                            "/api/v1/products", "/api/v1/products/*").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/v1/me").authenticated()
                    .requestMatchers("/api/v1/products", "/api/v1/products/**",
                            "/api/v1/admin/**").hasRole("ADMIN")
                    .anyRequest().denyAll());
        return http.build();
    }
}
```

Chọn STATELESS cho authentication demo, **nhưng CSRF vẫn bật**: Basic có browser threat model. Code không phải cấu hình production cho mọi frontend. CSRF token repository có thể tạo session để giữ token; STATELESS không cam kết toàn app không bao giờ tạo HttpSession. Bài04 giải thích cookie/token/preflight; đừng tắt CSRF vì curl POST403.

Hai chỗ cấu hình entry point có mục đích: Basic filter dùng khi header credentials sai; exceptionHandling dùng khi thiếu authentication lúc kiểm protected route. Chỉ sửa một chỗ có thể làm body lỗi khác nhau.

## 4. First match: đọc từ trên xuống

GET products match public trước rule products ADMIN. POST products không match rule GET nên tới ADMIN. Nếu đặt products/** permitAll không giới hạn method ở trên, POST/DELETE cũng có thể public; ruleADMIN phía dưới không cứu được vì đã match trước.

`anyRequest().denyAll()` là fallback rõ ràng; thêm endpoint mới phải quyết định policy, tránh vô tình mở khi quên khai báo. `authenticated()` chỉ cần danh tính hợp lệ, không tự yêu cầuADMIN. `hasRole("ADMIN")` cần authorityROLE_ADMIN, không chỉ chuỗiADMIN.

Một chain ở đây bao mọi request vì không giới hạn securityMatcher. Nếu giới hạn chain `/api/**`, URL ngoài đó cần fallback chain nếu muốn được Security bảo vệ. Không yêu cầu cấu hình nhiều chain trong đề, chỉ nhận diện lỗ hở.

## 5. Security error body không nhờ MVC Advice serialize

SecurityProblemWriter minh họa **ghi JSON bằng serializer**, không nối chuỗi exception vào JSON. Boot4 JsonMapper là `tools.jackson.databind.json.JsonMapper`; request/response dùng jakarta.servlet.http; các imports khác java.util.Map,java.io.IOException và Spring Component.

```java
@Component
@RequiredArgsConstructor
public class SecurityProblemWriter {
    private final tools.jackson.databind.json.JsonMapper jsonMapper;

    public void write(HttpServletRequest request, HttpServletResponse response,
            int status, String code, String title) throws IOException {
        response.setStatus(status);
        response.setContentType("application/problem+json");
        response.setCharacterEncoding("UTF-8");
        Map<String, Object> body = Map.of(
                "type", "urn:shopcore:problem:"
                        + code.toLowerCase(java.util.Locale.ROOT)
                                .replace('_', '-'),
                "title", title,
                "status", status,
                "detail", title,
                "instance", request.getRequestURI(),
                "code", code);
        jsonMapper.writeValue(response.getOutputStream(), body);
    }
}
```

Map là dữ liệu cho JSON format Problem Details, không bắt phải Java class ProblemDetail để tạo đúng wire format. Nếu dùng ProblemDetail class cũng được, cần serializer được cấu hình phù hợp. Không đưa `ex.getMessage()`/raw credentials/stack vào body. Đây không phải stream đã commit; nếu commit rồi không bảo đảm viết lại response.

AppException business vẫn xử lý ở MVC Advice theo M3-1. Security authentication failure không bắt buộc chuyển thành AppException/ErrorCode business; có thể dùng code riêng UNAUTHENTICATED/ACCESS_DENIED cùng shape. CORS rejection có đường xử lý riêng, không khẳng định writer này bao mọi filter/container lỗi.

## 6. Ma trận dự đoán end-to-end

Điều kiện: endpoint tồn tại, service success, không CORS lỗi; write requests có CSRF token hợp lệ, account active, password đúng khi nói “user/admin”. Nếu bỏ điều kiện CSRF, kết quả có thể403 trước auth/rule.

| Request | Không credentials | lan ROLE_USER | minh ROLE_ADMIN |
|---|---|---|---|
| GET products |200 |200 |200 |
| GET me |401 |200 |200 |
| DELETE Product10 đang tồn tại |401 |403 |204 |
| GET admin/stats |401 |403 |200 |

Header Basic sai password có thể401 ngay cả GET public. ADMIN được phép nhưng Product10 thiếu thì business404, không204; Security không bảo đảm dữ liệu tồn tại. Unknown route gặp denyAll cũng không nhất thiết tới MVC để404.

## 7. Kiểm bằng request khi thực hành sau này

```bash
curl -i http://localhost:8080/api/v1/me
curl -i -u lan http://localhost:8080/api/v1/me
curl -i -u lan http://localhost:8080/api/v1/admin/stats
curl -i -u minh http://localhost:8080/api/v1/admin/stats
```

`-u username` để curl hỏi password, không ghi password thật vào file/shell history. Local HTTP chỉ học trên máy, remote phải HTTPS. Đây là case **kỳ vọng**, chưa chạy app; endpoints chưa tồn tại trong source thì chưa thể thử nguyên xi.

Khi debug nhìn status + WWW-Authenticate khi401 + body/code, không chỉ body JSON. Không log Authorization header. Trước khi kết luận role sai hãy loại CSRF/CORS và xem Controller breakpoint.

Làm [đề03](../../../Exams/de-kiem-tra/M3-2-security-core__2026-10-07__lesson3-lan1.md); không bắt chép full config hoặc nhớ import.
