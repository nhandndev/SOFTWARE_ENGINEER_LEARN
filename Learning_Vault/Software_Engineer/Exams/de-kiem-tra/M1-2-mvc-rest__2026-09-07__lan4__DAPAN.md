# Đáp án M1-2 - Spring MVC 3-layer & REST API - Lần 4

> Tổng điểm thô: 58 điểm.  
> Normalize: `điểm thô / 58 * 100`.  
> Đạt module nếu >= 85 và deliverable/project đạt yêu cầu.

---

## Câu 1 - 5đ

Đáp án cần có:

- Request vào server/filter chain trước.
- `DispatcherServlet` là cửa điều phối của Spring MVC.
- `HandlerMapping` tìm controller method phù hợp với method + URL.
- `HandlerAdapter` chuẩn bị/gọi method.
- Argument resolver lấy path/query/body.
- Jackson convert JSON body thành request DTO.
- Controller nhận DTO/param đã bind, gọi Service.
- Service xử lý business rule, gọi Repository.
- Repository lấy/lưu dữ liệu.
- Service map model/entity sang response DTO.
- Controller bọc `ResponseEntity`/`ApiResponse`.
- Jackson serialize response object thành JSON trả client.

## Câu 2 - 3đ

- `CreateProductRequest`: DTO nhận dữ liệu client gửi khi tạo Product.
- `Product`: model/entity nội bộ, dùng trong business/storage.
- `ProductResponse`: DTO trả dữ liệu Product ra client.
- `ApiResponse<ProductResponse>`: wrapper response thống nhất, thường có code/message/result.
- Không dùng `Product` cho tất cả vì request/response có contract khác nhau, tránh lộ field nội bộ, tránh API phụ thuộc database model, tránh client set field không được phép như id.

## Câu 3 - 5đ

- Controller method không chạy.
- Lỗi bị phát hiện ở Jackson khi parse JSON body.
- Đây là lỗi framework/request, không phải business.
- Exception thường là `HttpMessageNotReadableException`.
- Trả `400 Bad Request`.

## Câu 4 - 5đ

- Lỗi bị phát hiện ở argument resolver/type converter khi convert `"abc"` sang `Long`.
- Controller method không chạy.
- Service/Repository không được gọi.
- Exception thường là `MethodArgumentTypeMismatchException`.
- Trả `400 Bad Request`.

## Câu 5 - 5đ

- Service phát hiện bằng cách hỏi repository `existsBySku`.
- Không phải lỗi JSON/body vì JSON hợp lệ và DTO tạo được.
- Service throw `new AppException(ErrorCode.DUPLICATE_SKU)`.
- `GlobalExceptionHandler` bắt `AppException`, đọc `ErrorCode`, tạo `ApiErrorResponse`.
- Status phù hợp: `409 Conflict` vì request hợp lệ nhưng xung đột với state hiện tại.

## Câu 6 - 5đ

1. Category không tồn tại: thường `404 Not Found`, vì resource tham chiếu không tồn tại.
2. SKU đã tồn tại: `409 Conflict`, vì xung đột state hiện tại.
3. Xóa Category còn Product: `409 Conflict`, vì request hợp lệ nhưng không thể thực hiện do ràng buộc nghiệp vụ.
4. Product id không tồn tại: `404 Not Found`.
5. `price = -1000`: `400 Bad Request`, vì input không hợp lệ theo rule validate dữ liệu.

## Câu 7 - 5đ

Các vấn đề:

- Controller gọi Repository trực tiếp, bỏ qua Service.
- Business rule `price > 0` đặt trong Controller.
- Dùng URL động từ `/create`, REST nên dùng `POST /api/products`.
- Dùng `Product` làm request DTO.
- Trả thẳng entity/model ra client.
- Trả `null` khi lỗi, không có status/error body rõ ràng.
- Không có `ResponseEntity`, không trả `201 Created`.
- Không check SKU trùng/category tồn tại.
- Không có exception flow/AppException.

Hướng sửa:

- Controller nhận `CreateProductRequest`.
- Controller gọi `productService.create(request)`.
- Service validate business rule và gọi repository.
- Service throw `AppException` khi lỗi.
- Service map sang `ProductResponse`.
- Controller trả `ResponseEntity.status(CREATED).body(ApiResponse...)`.

## Câu 8 - 5đ

- Controller nhận query param `page=2`, `size=10`.
- Repository nên trả `List<Product>` hoặc dữ liệu nguồn, không trả `PageResponse`.
- Service validate `page >= 0`, `size > 0`, nên giới hạn max size.
- Service tính pagination và map DTO.
- Tổng 25, `page=2`, `size=10`:
  - `fromIndex = page * size = 20`.
  - `toIndex = min(20 + 10, 25) = 25`.
  - `content` gồm item index 20..24, tức 5 item nếu list đủ thứ tự.
  - `totalPages = ceil(25 / 10) = 3`.
- Response body nên có `content`, `page`, `size`, `totalElements`, `totalPages`.

## Câu 9 - 3đ

Nên trả `200 OK` với `content` rỗng nếu page/size hợp lệ.

Vì page zero-based:

- `page=0`: item 0..19.
- `page=1`: item 20..39.
- `page=2`: item 40..44.
- `page=3`: bắt đầu từ index 60, vượt tổng 45.

`fromIndex = 3 * 20 = 60`, lớn hơn `totalElements = 45`, nên content rỗng. Đây không phải request sai format.

## Câu 10 - 3đ

1. Đọc `@PathVariable Long id`: Controller/Spring MVC binding.
2. Check SKU trùng: Service.
3. Trả `201 Created`: Controller.
4. Check Category tồn tại: Service.
5. Map `Product` sang `ProductResponse`: thường Service hoặc Mapper riêng.
6. Tạo `Location` header: Controller.

## Câu 11 - 10đ

Ví dụ đúng ý:

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getById(
            @PathVariable Long id) {
        ProductResponse result = productService.getById(id);
        return ResponseEntity.ok(ApiResponse.success(result));
    }
}
```

```java
@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductResponse getById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        return ProductResponse.builder()
                .id(product.getId())
                .sku(product.getSku())
                .name(product.getName())
                .price(product.getPrice())
                .categoryId(product.getCategoryId())
                .build();
    }
}
```

```java
@ExceptionHandler(AppException.class)
public ResponseEntity<ApiErrorResponse> handleAppException(AppException e) {
    ErrorCode errorCode = e.getErrorCode();
    ApiErrorResponse body = ApiErrorResponse.builder()
            .code(errorCode.getCode())
            .message(errorCode.getMessage())
            .build();
    return ResponseEntity.status(errorCode.getHttpStatus()).body(body);
}
```

Chấm theo ý: đúng trách nhiệm Controller/Service/Handler là quan trọng nhất.

## Câu 12 - 4đ

Đáp án cần nêu:

- Sai URL/method: `HandlerMapping`/Spring MVC, thường `404/405`.
- Sai path/query type: argument resolver/type converter, thường `400`.
- JSON body hỏng: Jackson, `HttpMessageNotReadableException`, `400`.
- DTO validation fail: Bean Validation, `MethodArgumentNotValidException`, `400`.
- Business error: Service phát hiện và throw `AppException(ErrorCode.X)`.
- `GlobalExceptionHandler` không phải nơi phát hiện lỗi chính, mà là nơi đổi exception thành HTTP response.
- `AppException` dùng cho lỗi nghiệp vụ như not found, duplicate, conflict.

