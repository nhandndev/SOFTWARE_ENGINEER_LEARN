# Lesson 04 · Role, method security và test có chứng minh thật không?

> Mục tiêu: role đúng đi từ DB tới JWT tới authorities; hiểu mỗi loại test chứng minh tầng nào. Không bắt bạn thuộc JUnit.

## 1. Hai cổng phân quyền

Request rule kiểm URL/method trước MVC. Method security kiểm lời gọi method qua proxy, hữu ích để bảo vệ nghiệp vụ dù được gọi ngoài Controller đó.

```java
@Configuration
@EnableMethodSecurity
class MethodSecurityConfig {}

@Service
class ProductService {
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(Long id) {
        // Nghiệp vụ xóa đặt ở đây khi thực hành.
    }
}
```

`@EnableMethodSecurity` bật khả năng này; chỉ thêm annotation lên method không đảm bảo nó hoạt động nếu chưa bật. `hasRole('ADMIN')` tìm authority ROLE_ADMIN. `hasAuthority('ADMIN')` tìm đúng chuỗi ADMIN, không tương đương.

Với converter bài 2, JWT `roles:["ADMIN"]` → ROLE_ADMIN → hasRole ADMIN pass. `roles:["ROLE_ADMIN"]` với prefix ROLE_ → ROLE_ROLE_ADMIN → không khớp.

## 2. Proxy và self-invocation

```text
Controller → Spring proxy ProductService → kiểm @PreAuthorize → method
this.delete(id) bên trong ProductService → thường không qua proxy → không dựa vào annotation đó
new ProductService() → không phải bean proxy → không dựa vào method security
```

Không dùng tự gọi nội bộ để “test annotation có chạy”. Giữ boundary: method nghiệp vụ cần bảo vệ được gọi từ bean khác qua Spring. Không phải method private/final nào cũng có thể được intercept như public method tùy loại proxy.

Nếu URL cho USER vào nhưng method yêu cầu ADMIN, USER vẫn bị chặn. Nếu URL chặn trước thì method chưa chạy. Các rule cùng áp dụng, không rule nào tự ghi đè để nới quyền của tầng còn lại.

## 3. Role không thay kiểm ownership

USER có thể gọi GET /api/orders/{id}, nhưng còn phải kiểm order thuộc về user nào. Lấy local user ID từ principal đã xác thực, không tin `userId` client gửi để quyết định chủ sở hữu. ADMIN override chỉ có nếu business policy quy định.

Đây là nhận diện authorization theo tài nguyên, không yêu cầu dựng ABAC engine. Tương lai AI API cũng tương tự: người có role USER chưa chắc được xem mọi conversation/document.

## 4. Test chia ba mức

| Mức | Ví dụ | Chứng minh | Không chứng minh |
|---|---|---|---|
| Mock user | @WithMockUser | Rule theo authorities, method security nếu proxy thật | JWT parser/signature, password login |
| Mock JWT | MockMvc jwt() | Wiring user JWT + authorities tới MVC/rules | Chữ ký thật, exp/iss/aud của decoder |
| Bearer thật | Header chứa token ký + JwtDecoder thật | Token validation và filter chain thực tế | Google, mạng production hoặc mọi cấu hình deploy |

Test cần Spring Security áp vào MockMvc: dùng context/test setup có security filters, hoặc `MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build()`. Đừng tắt filters rồi gọi đó là security integration test.

Dependency cần khi thực hành: Resource Server starter và `spring-security-test` test scope theo BOM Boot. Bài này không sửa POM. Boot 4 có thay đổi package test so với Boot 3; tra đúng phiên bản, không đoán import bằng trí nhớ.

## 5. Hai ví dụ nhỏ, không phải test suite chạy sẵn

Giả sử endpoint DELETE cần ADMIN, ProductService bean thật qua proxy, repository fixture có Product 10; request chain dùng header-only JWT đã tắt CSRF như bài 2:

```java
@Test
@WithMockUser(roles = "USER")
void userCannotDelete() throws Exception {
    mvc.perform(delete("/api/products/10"))
            .andExpect(status().isForbidden());
}
```

Test này kiểm từ chối vì quyền. Nếu đang dùng chain giữ CSRF, phải gửi `.with(csrf())`; nếu không, 403 có thể là CSRF chứ không phải role. Muốn chắc hơn kiểm repository không bị xóa và có positive case ADMIN.

```java
@Test
void adminCanDeleteWithMockJwt() throws Exception {
    mvc.perform(delete("/api/products/10")
            .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN"))))
            .andExpect(status().isNoContent());
}
```

Ở đây authorities đưa trực tiếp vào mock Authentication. **Không kiểm converter từ claim roles**, vì ta đã bypass nó. Muốn kiểm converter thì gọi converter với Jwt fixture hoặc có test Bearer thật đi qua converter.

## 6. Kịch bản Bearer thật

Tạo RSA keypair dành riêng test; decoder tin public key A và issuer/audience cấu hình. Encoder ký token bằng private key A. Chỉ key test được sinh tạm, không đem cách này làm key persistence production.

```text
1. Token A đúng claims, ADMIN → DELETE fixture → 204.
2. USER đúng chữ ký → DELETE → 403, dữ liệu không đổi.
3. Sửa payload nhưng giữ signature → 401.
4. Ký bằng key B không được tin → 401.
5. exp quá khứ ngoài clock skew → 401.
6. issuer hoặc audience sai → 401.
7. Không token → 401 ở protected endpoint.
```

Đồng hồ test phải ổn định, thời gian hết hạn cách xa skew. Không mock JwtDecoder khi bạn muốn chứng minh crypto. Test riêng decoder và test HTTP là hai lớp bổ sung; test decoder pass không tự chứng minh URL rule hoạt động.

## 7. Lỗi method security và catch-all

AccessDeniedException từ method có thể đi qua xử lý MVC. Nếu `@RestControllerAdvice` bắt mọi Exception rồi trả 500, nó có thể biến lỗi quyền thành lỗi server trước khi Security xử lý theo ý bạn. Cần giữ semantics 403 bằng handler phù hợp hoặc để exception đi tới cơ chế Security; đừng đóng gói mọi lỗi thành HTTP 200 với code nội bộ.

ApiResponse chỉ là body contract, `ResponseEntity`/handler mới quyết định HTTP status. AuthenticationEntryPoint và AccessDeniedHandler xử lý nhánh filter; ControllerAdvice không mặc nhiên bao trùm filter chain.

## Tài liệu / video

- [Spring Method Security](https://docs.spring.io/spring-security/reference/servlet/authorization/method-security.html): enable, proxy và before-method authorization.
- [MockMvc OAuth2 testing](https://docs.spring.io/spring-security/reference/servlet/test/mockmvc/oauth2.html): jwt() và authorities.
- [MockMvc security setup](https://docs.spring.io/spring-security/reference/servlet/test/mockmvc/setup.html).
- [Method security tests](https://docs.spring.io/spring-security/reference/servlet/test/method.html): @WithMockUser.
- Video tìm: `Spring Security jwt MockMvc WithMockUser real JwtDecoder integration test`. Khi xem, hỏi “test có thực sự chạy decoder không?”.

[Đề lesson 4](../../../Exams/de-kiem-tra/M3-3-jwt__2026-10-07__lesson4-lan1.md).
