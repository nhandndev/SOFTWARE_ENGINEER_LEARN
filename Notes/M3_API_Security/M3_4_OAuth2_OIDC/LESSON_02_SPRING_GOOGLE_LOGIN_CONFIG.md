# Lesson 02 · Spring Google Login: cấu hình nào chạy ở đâu?

> Mục tiêu: hiểu request bắt đầu/callback, session lưu handshake, cách giữ secret và debug lỗi redirect. Chưa yêu cầu tạo Google app thật để làm đề.

## 1. Dependency và cấu hình, không sửa POM thay bạn

Khi thực hành trong shopcore cần OAuth2 Client starter `spring-boot-starter-oauth2-client`; API JWT còn dùng Resource Server starter. Chúng phục vụ hai vai trò khác nhau. Dùng version theo BOM Boot, không thêm dependency phiên bản ngẫu nhiên từ video cũ.

`application.yml` minh họa, không chứa credential thật:

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: ${GOOGLE_CLIENT_ID}
            client-secret: ${GOOGLE_CLIENT_SECRET}
            scope:
              - openid
              - profile
              - email
```

Tên registration `google` khớp provider thông dụng được Spring hỗ trợ. Client ID định danh app, không phải password của user; client secret là credential backend, không gửi JavaScript hay commit Git. Đặt bằng biến môi trường/secret store. Không dùng secret thật làm default `${...:real-secret}`.

## 2. Hai URL phải hiểu

| URL | Ai xử lý? |
|---|---|
| /oauth2/authorization/google | OAuth2AuthorizationRequestRedirectFilter bắt đầu flow |
| /login/oauth2/code/google | OAuth2LoginAuthenticationFilter xử lý callback mặc định |

Không cần tự tạo Controller cho hai URL đó trong cấu hình mặc định. Filter xử lý trước MVC. Callback không phải endpoint API bạn tự nhận JSON email rồi tin ngay.

Google console cần authorized redirect URI chính xác, ví dụ:

```text
http://localhost:8080/login/oauth2/code/google
```

Scheme, host, port, path phải khớp. `localhost` khác `127.0.0.1`, port 8080 khác 9090. Production dùng HTTPS. Nếu reverse proxy đổi host/scheme, base URL Spring nhìn thấy và forwarded headers phải cấu hình theo proxy tin cậy, không tin header client tùy ý.

## 3. Vì sao browser login thường cần session?

Trước redirect, Spring mặc định lưu authorization request bằng HttpSessionOAuth2AuthorizationRequestRepository. Khi callback về, phải tìm lại request này để kiểm liên kết và tiếp tục xác thực.

```text
Lượt đi: browser → shopcore → lưu request X trong session → redirect Google
Lượt về: browser gửi cookie cùng session → shopcore lấy X → so state → đổi code
```

Nếu ép STATELESS toàn bộ hoặc mất cookie, callback có thể không tìm thấy authorization request. Không sửa bằng bỏ kiểm state. Kiểm host/cookie/path, session repository, load balancing và lưu session phù hợp.

Login thành công thường lưu SecurityContext trong session cho browser. Điều này khác API chain M3-3 nhận Bearer mỗi request; cả hai có thể tồn tại cùng app nếu ranh giới rõ.

## 4. Hai chain minh họa

Các bean dưới **thay thế** cấu hình API/fallback cũ, không thêm trùng bean vào cùng app. Cần decoder và converter bài JWT, OAuth2 client registrations; chưa có success handler map user riêng (bài 3).

```java
@Bean
@Order(1)
SecurityFilterChain apiChain(HttpSecurity http,
        JwtAuthenticationConverter converter) throws Exception {
    return http.securityMatcher("/api/**")
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers(HttpMethod.POST,
                            "/api/auth/register", "/api/auth/login", "/api/auth/refresh")
                    .permitAll()
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")
                    .anyRequest().authenticated())
            .oauth2ResourceServer(oauth -> oauth.jwt(jwt -> jwt
                    .jwtAuthenticationConverter(converter)))
            .build();
}

@Bean
@Order(2)
SecurityFilterChain browserChain(HttpSecurity http) throws Exception {
    return http
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/", "/login", "/error", "/oauth2/**", "/login/oauth2/**")
                    .permitAll()
                    .anyRequest().authenticated())
            .oauth2Login(Customizer.withDefaults())
            .build();
}
```

Đọc code:

- First matching chain: `/api/**` vào chain 1; không chạy tiếp chain 2 để “cộng quyền”.
- API chỉ Bearer header, refresh JSON body, không Basic/cookie auth: giả định cho việc tắt CSRF riêng chain API.
- Giữ rule DELETE Product cần ADMIN từ M3-3. Thêm Google Login không được vô tình hạ DELETE xuống chỉ cần authenticated; `anyRequest().authenticated()` không thay rule quyền này.
- Browser chain còn CSRF mặc định và session IF_REQUIRED, bao phủ mọi URL còn lại.
- Có session Google login không tự đủ gọi `/api/products`: API chain vẫn yêu cầu Bearer local hợp lệ.
- `.oauth2Login()` cấu hình browser flow; `.oauth2ResourceServer().jwt()` kiểm token API. Không phải cùng feature.

Hai chain này là ví dụ boundary, chưa phải app hoàn chỉnh: chưa map local user, chưa success handler, chưa error body custom, chưa thiết lập login UX. Nếu muốn browser session gọi API, phải thiết kế khác và giữ CSRF phù hợp; không lén thêm cookie auth vào giả định header-only.

## 5. Debug theo điểm dừng

| Triệu chứng | Kiểm đầu tiên |
|---|---|
| redirect_uri_mismatch từ Google | URI gửi đi so chính xác với console |
| authorization_request_not_found | session/cookie/host/request đã lưu trước redirect |
| invalid_client khi đổi code | client ID/secret, credential của đúng project, method provider |
| invalid_grant | code hết hạn/đã dùng, redirect URI khác, verifier PKCE nếu dùng |
| Google pass nhưng API 401 | API nhận Bearer local chưa? Không lấy session/Google token thay thế |

Không log secret, code hoặc token để debug. Log correlation ID, registration ID, loại lỗi, URI an toàn và bước đang thất bại.

## 6. Lỗi OAuth Login không tự thành AppException

Sai state/code/ID token có thể thất bại trong filter, được OAuth2 authentication failure handler xử lý (mặc định thường redirect lỗi login). Business mapping local có thể ném lỗi, nhưng callback vẫn ở OAuth2 flow; cần chuyển thành OAuth2AuthenticationException/failure handling hoặc thiết kế xử lý thích hợp.

ControllerAdvice chỉ xử lý MVC không bao trùm mọi callback. Không redirect ra frontend kèm stack trace hoặc token trong query string.

## Tài liệu / video

- [Spring OAuth2 Login Core](https://docs.spring.io/spring-security/reference/servlet/oauth2/login/core.html): Google registration và default redirect.
- [Spring OAuth2 Login Advanced](https://docs.spring.io/spring-security/reference/servlet/oauth2/login/advanced.html): request repository, endpoints, handlers.
- [Google OIDC](https://developers.google.com/identity/openid-connect/openid-connect): đăng ký app/redirect và code exchange.
- Video tìm: `Spring Security oauth2Login Google multiple SecurityFilterChain session`. So cấu hình với phiên bản Boot hiện tại; không copy WebSecurityConfigurerAdapter.

[Đề lesson 2](../../../Exams/de-kiem-tra/M3-4-oauth2__2026-10-07__lesson2-lan1.md).
