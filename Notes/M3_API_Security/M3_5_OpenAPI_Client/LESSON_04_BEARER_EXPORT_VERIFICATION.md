# Lesson 04 · Bearer JWT trong docs, export và kiểm chứng

> Mục tiêu: UI gửi đúng Authorization, spec phản ánh quyền thật, export không nhầm HTML thành JSON. Không thay module JWT/OIDC.

## 1. Mô tả authentication, không thực thi authentication

```java
@Configuration
@OpenAPIDefinition(info = @Info(title = "Shopcore API", version = "v1"))
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP,
        scheme = "bearer", bearerFormat = "JWT")
public class OpenApiConfig {}
```

Giải thích:

- `name` là khóa scheme để operation tham chiếu; viết bearerAuth ở đây nhưng bearer-auth ở method thì không khớp.
- `type=HTTP`, `scheme=bearer` mô tả Authorization Bearer; không dùng type apiKey tùy tiện để biểu diễn JWT.
- `bearerFormat=JWT` là gợi ý định dạng, không validate chữ ký/issuer/audience.
- `version=v1` là version contract trong info, không bắt buộc trùng version OpenAPI3.1 hay version thư viện springdoc.

Thêm vào operation protected của lesson 3:

```java
@SecurityRequirement(name = "bearerAuth")
```

Bộ bài dùng **requirements theo operation**, không đặt global requirement để login/register public không vô tình inherit Bearer. Auth runtime vẫn theo SecurityFilterChain và @PreAuthorize, không phụ thuộc annotations OpenAPI.

## 2. Spec nhìn như thế nào?

Đoạn YAML rút gọn dưới **không phải full spec**, thiếu responses/components schema và các endpoints khác:

```yaml
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
paths:
  /api/shipping/quote:
    get:
      security:
        - bearerAuth: []
```

`bearerAuth: []` trong một requirement nghĩa scheme Bearer không có OAuth scopes ở đây, **không phải public**. Operation `security: []` mới tắt inherited security requirement nếu có global security trong spec. Khi không global requirement và operation không security, docs coi operation không yêu cầu auth.

Nếu sau này chuyển global requirement, phải kiểm operation public được override thành security:[] thật trong JSON; annotation có array mặc định rỗng không nhất thiết tự xóa inheritance. Bài không áp một annotation override chưa kiểm vào mọi phiên bản.

Bearer JWT role ADMIN không được thể hiện như OAuth scope tùy tiện. Mô tả role yêu cầu trong operation/403; runtime converter/authorization mới thực thi.

## 3. Swagger UI Authorize gửi gì?

Nhập **token raw**, không nhập password/API key carrier. Với HTTP bearer scheme, UI thường tự thêm prefix Bearer; kiểm request Network/curl do UI tạo để tránh `Bearer Bearer ...`.

```http
Authorization: Bearer eyJ...
```

UI không cấp token: lấy access token từ login flow đã thực hiện ở M3-3. Không dùng Google ID token hoặc refresh token làm access Bearer. Token hết hạn vẫn401 dù UI đang hiện trạng thái Authorized.

Chỉ nhập token vào UI đáng tin, đúng host/environment. Không nhúng token thật vào @Schema example hoặc file openapi.json; không bật lưu authorization lâu dài trên máy dùng chung. Try it out POST/DELETE có side effect thật, ưu tiên môi trường thử.

## 4. Mở tài liệu local không mở API

Trong môi trường dev, có thể cho phép **chỉ docs paths** trong chain bắt được chúng:

```java
.requestMatchers("/v3/api-docs/**", "/v3/api-docs.yaml", "/swagger-ui/**", "/swagger-ui.html")
.permitAll()
```

Đây là đoạn chèn vào authorizeHttpRequests phù hợp, **không phải chain hoàn chỉnh**. Không copy `.anyRequest().permitAll()` để chữa UI401. Với hai chain M3-4, docs thường vào browser/fallback chain, không phải API chain `/api/**`; sửa đúng chain đầu tiên match.

Cho docs public không tự cho `/api/shipping/quote` public. Ngược lại, chỉ bảo vệ UI mà bỏ JSON spec công khai có thể vẫn lộ contract. Production cân nhắc tắt cả UI/docs hoặc bảo vệ theo mạng/quyền; không làm giảm API auth. Property theo springdoc:

```yaml
springdoc:
  api-docs:
    enabled: false
  swagger-ui:
    enabled: false
```

Đặt ở profile phù hợp, không tắt dev toàn bộ ngoài ý muốn. Đây là policy tùy hệ thống, không luật “mọi production tuyệt đối cấm docs”.

## 5. Export đúng openapi.json

Chạy khi app thực hành đã có endpoint, không thực hiện ở bộ bài này:

```bash
curl --fail --show-error --silent \
  -H 'Accept: application/json' \
  http://localhost:8080/v3/api-docs \
  -o openapi.json
jq -e '.openapi and .paths and .components' openapi.json
```

curl không dùng `-L` ở đây để tránh theo login redirect rồi lưu HTML mà tưởng export thành công. curl --fail bắt4xx/5xx nhưng không tự coi302 là lỗi; jq/kiểm Content-Type/status vẫn cần. Nếu docs protected, dùng credential theo chính sách, không commit token vào script/file.

Trong OpenAPI có thể không cần components với API rất nhỏ; jq expression trên dành **bộ spec của bài có bearer scheme**, không tuyên bố mọi spec hợp lệ đều bắt buộc components.

Kiểm path và security cụ thể:

```bash
jq '.paths["/api/shipping/quote"].get.responses | keys' openapi.json
jq '.components.securitySchemes.bearerAuth' openapi.json
jq '.paths["/api/shipping/quote"].get.security' openapi.json
```

Không overwrite bản contract đã review bằng file export chưa kiểm. Chỉ commit spec không chứa secrets; diff contract khi đổi route/schema/status. Spec generated là artifact cần review, không luôn đúng vì máy sinh ra.

## 6. Checklist kiểm chứng end-to-end

| Case | Mong đợi / bằng chứng |
| --- | --- |
| Không access token | Protected API401, docs/UI policy độc lập |
| Token đúng USER | Quote200 khi input/provider tốt |
| Token đúng thiếu role endpoint khác | 403 nếu runtime rule yêu cầu |
| weightGrams=abc | 400 binding, không gọi provider |
| Provider 503 rồi 200 | Hai attempts, local 200 |
| Provider 404 theo demo | Không retry, local 422 |
| Provider chậm | 504 trong budget client, không fee0 giả |
| Provider 200 JSON sai | 502, không leak raw body |
| JSON spec | Route/query/schema/security/status khớp actual response |

Mock exchange function kiểm pipeline status/retry/decode nhưng không kiểm DNS/TLS/socket/connector thật. Mock HTTP server qua connector thật kiểm serialization/header/timeouts tốt hơn. Gọi provider thật smoke test kiểm môi trường/credential; không cần dùng provider thật cho mọi lỗi trong CI.

Testing đã hoãn không đồng nghĩa tin mọi snippet. Bạn có thể mô tả kế hoạch và dùng curl/stub để hiểu; không bị ép nhớ cú pháp JUnit trong đề.

## 7. Bản chất cần giữ

```text
Inbound contract: frontend được hứa gì?
Outbound contract: provider thật sự cung cấp gì?
Client adapter: dịch schema/lỗi, deadline/retry có giới hạn.
Service: nghiệp vụ và DTO local.
OpenAPI: mô tả contract, không thay enforcement.
Runtime test + spec review: chứng minh hai bên khớp nhau.
```

Tương lai gọi LLM cũng vậy: timeout không chứng minh chưa tốn tiền; retry có thể nhân chi phí; dữ liệu prompt/token không nên log tùy tiện. Không biến lỗi provider thành nội dung AI giả mà không có contract fallback.

## Tài liệu / video

- [OpenAPI3.1.1 security requirements/schemes](https://spec.openapis.org/oas/v3.1.1.html): security array, HTTP bearer.
- [springdoc FAQ security và properties](https://springdoc.org/): scheme, protected docs, enabled flags.
- [Spring Security authorize requests](https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html): runtime rules khác docs.
- [Spring WebClient testing](https://docs.spring.io/spring-framework/reference/web/webflux-webclient/client-testing.html): stub server và transport behavior.
- Video tìm: `Swagger UI bearer JWT springdoc OpenAPI export api-docs security`. Chưa verify video cụ thể; không đưa token thật lên website Swagger không rõ nguồn.

[Đề lesson 4](../../../Exams/de-kiem-tra/M3-5-openapi-client__2026-10-07__lesson4-lan1.md).
