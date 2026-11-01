# M2-4 · Lesson 01 — Đọc code, lần theo SQL và nhận diện N+1

> Bản viết lại ngày **2026-11-01**. Chế độ **LESSON: 8 câu × 5đ = 40đ**. Đạt từ **34/40 = 85%**. Thời gian gợi ý 45–60 phút.

Trả lời bằng lời của bạn, bảng, SQL minh họa hoặc vài dòng Java. Chấm đúng ý nghĩa, không chấm thuộc văn mẫu. Không cần dựng/chạy project, viết imports hoặc nhớ tên logger/API. Chưa yêu cầu sửa bằng fetch join, EntityGraph, batch, paging hay HikariCP; đó là các bài sau.

## A. Code và dữ liệu chung

Các class dưới nằm ở các file riêng; đã có imports JPA, Spring và Lombok tương ứng. Lombok tạo getter/constructor như annotation. Không có listener, getter tùy chỉnh, toString hoặc serializer bí mật truy cập Category.

### Entity

```java
@Entity
@Table(name = "categories")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {
    @Id
    private Long id;
    private String name;
}

@Entity
@Table(name = "products")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {
    @Id
    private Long id;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
```

### Repository, DTO class và Service

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
}

@Getter
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String categoryName;
}

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<ProductResponse> list() {
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(p -> new ProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getCategory().getName()))
                .toList();
    }
}
```

### Database ban đầu

**products**

| id | name | category_id |
|---:|---|---:|
| 10 | Java Book | 1 |
| 11 | Mouse | 2 |
| 12 | Coffee | 3 |

**categories**

| id | name |
|---:|---|
| 1 | Books |
| 2 | Electronics |
| 3 | Food |

### Giả định để không phải đoán

- Dùng Hibernate; quan hệ LAZY to-one được hỗ trợ bằng proxy và ban đầu chưa tải. Lệnh productRepository.findAll() chỉ lấy dữ liệu Product, không JOIN/fetch Category.
- Mỗi tình huống bắt đầu bằng persistence context mới, chưa có Category. Không có batch fetching, cache cấp hai hoặc query cache.
- Trừ khi câu nói khác, gọi Service qua Spring proxy; transaction/context còn mở trong toàn bộ method list().
- Repository trả List, không có count query, paging, ghi dữ liệu hoặc truy vấn nền.
- Chỉ đếm **SELECT dữ liệu do tình huống yêu cầu**, không tính startup, BEGIN/COMMIT hoặc kiểm connection.
- Các câu độc lập; thay dữ liệu ở câu 3 không làm đổi dữ liệu câu khác.
- Không giả định thứ tự findAll(). Khi cần mô tả một trace, xét thứ tự map minh họa 10 → 11 → 12. Số SELECT không phụ thuộc thứ tự này.

---

## Câu 1 — Một request thật sự chạm DB ở đâu? (5đ)

Controller gọi list() đúng một lần với code/dữ liệu chung.

1. Ngay sau khi chạy `List<Product> products = productRepository.findAll();`, trước khi tạo DTO: các field id/name của Product đã có chưa? Tên Category của từng Product đã được tải chưa? **(1đ)**
2. Đọc ba biểu thức sau khi tạo DTO: `p.getId()`, `p.getName()` và `p.getCategory().getName()`. Biểu thức nào có thể làm Hibernate chạy thêm SELECT trong tình huống này? Nó cần lấy dữ liệu gì chưa có? **(2đ)**
3. Liệt kê các lượt SELECT bằng lời hoặc SQL ngắn; cho tổng số SELECT của request và giải thích vì sao một lần gọi repository chưa chứng minh chỉ có một SQL. **(2đ)**

**Trả lời:**
1  field id / name của Product đã có rồi , còn mối quan hệ của Product và Category có mối quan hệ thì nó sẽ tải khi mà ta đụng đến nó , vì là LAZY nên là chưa tải cái này . tên Category của từng Product chưa được tỉa , chỉ được tải trước id 
2 p.getCategory().getName() sẽ làm Hibernate chạy thêm câu lệnh SElect , vì là nó đang truy xuất thông tin ở bên Category thông qua thằng Product thì là cần phải tải thêm để lấy ra được giá trị để trả về result , đầu tiên là select là lấy được các product và có các category được có mối quan hệ nữa thì phải có các query để lấy ra name nữa thì nó sẽ bị n+1 , nó cần lấy name 
3 đầu tiên là 1 cái Select để lấy ra hết tất cả các product , sau đó là sẽ có 1 list các query để lấy ra category naem tương ứng , tầm 4 Query , 1 cái Query ra được Product , 3 cái Query lấy ra Category . 1 lần gọi Repositoryu chưa chứng minh được là bởi vì ta cần phải bật SQL log thì mới thấy được chứu k nhìn code Java mà đoan được , tôi nghĩ vậy 

---

## Câu 2 — Có foreign key rồi, vì sao vẫn phải hỏi Category? (5đ)

Vừa chạy xong `productRepository.findAll()`, chưa chạy phần `.map(...)` để tạo DTO. Product 10 đã được lấy từ DB, trong dòng DB có category_id = 1.

1. Phân biệt thông tin category_id = 1 với Category.name = Books. Query Product hiện tại đã đem về cả hai chưa? **(2đ)**
2. Bạn khác nói: “Java có object Category thì chắc chắn tất cả field của nó đã được tải”. Nhận xét này đúng không trong mô hình proxy của đề? Giải thích bằng lời, không cần biết class proxy nội bộ. **(2đ)**
3. Nếu đổi category_id của Product 10 thành 2, khi mapper cần tên Category thì Hibernate sẽ tìm theo khóa nào? Không cần viết SQL chuẩn cú pháp. **(1đ)**

**Trả lời:** 
category_id = 1 thì đây chỉ là cái id th , giống như là đại diện cho 1 cái category khi mà tải thì tải cái này ở product để biết nó liên kết với category id nào , rồi khi ta query liên quan đến category thì ta thực sự mới query thêm thông tin về category , ở đây ví dụ là Category.name thì vâyj . Query Product hiện tại chỉ đem về id thôi , còn name thì chưa
2 không đúng , vì và Fetch theo kiểu Lazy thì các field có mối quan hệ khoá ngoại thì vẫn chưa được tải ,không đúng trong mô hình proxy của đề là có object đại diện 
3 khi cần đổi thì Hibernate sẽ tìm theo từ khoá category_id của thằng Product để đổi thôi , còn khi mà đụng đến Category là tên thì buộc phải query Category 
products.category_id: khóa ngoại lưu ID của Category.
categories.id: khóa chính để tìm Category.
categories.name: dữ liệu cần tải để trả về tên.

chưa biết dc name dựa vào id 
---

## Câu 3 — Cùng số Product, khác số Category cần tải (5đ)

Giữ nguyên code list(), thay riêng bảng products thành:

| id | name | category_id |
|---:|---|---:|
| 10 | Java Book | 1 |
| 11 | Spring Book | 1 |
| 12 | Mouse | 2 |

Context bắt đầu rỗng, không batch/cache cấp hai như giả định chung.

1. Dự đoán số SELECT Product, số SELECT Category và tổng. **(2đ)**
2. Vì sao đọc Category của Product 11 không nhất thiết tạo thêm một SELECT giống Product 10? **(2đ)**
3. Sau khi đổi dữ liệu, bạn sẽ nhìn bằng chứng gì để kiểm dự đoán này trong một request riêng? **(1đ)**

**Trả lời:**

---
dự đoán là có 1 query tổng , 1 query cho category_id 1.  1 query cho category_id 2.  tổng là 3 thôi
2 vì là Category_id có 2 lần thì lần đầu thì sẽ query , lần 2 thì do persistent context nó đã lưu sẵn rồi nên ta chỉ việc lấy
3 sau khi đổi dữ liệu thì sẽ thấy nó cần thêm Query nữa nếu k có sẵn trong Persistent Context , cần phải bật tính năng log sql lên và đọc,  phải check dc là chỉ có 1 query chính thôi , k có tự tạo query trong lúc map 

## Câu 4 — Hai đề nghị “đổi annotation là xong” (5đ)

Dùng lại dữ liệu ban đầu có ba Category khác nhau. Hai đồng đội đề nghị:

- An: “Đổi Product.category thành EAGER thì chắc chắn Hibernate sẽ dùng một JOIN, hết query phụ.”
- Bình: “Giữ LAZY thì dù mapper đọc category.name vẫn không query Category.”

1. Phân tích lời An: EAGER yêu cầu điều gì, có cam kết hình dạng SQL chỉ một JOIN không? **(2đ)**
2. Phân tích lời Bình: LAZY trì hoãn đến lúc nào trong use case này? **(2đ)**
3. Nêu bằng chứng cần xem để biết một thay đổi thực sự giảm query. Không cần đề xuất kỹ thuật sửa ở Lesson 02. **(1đ)**

**Trả lời:**
1 EAGER là nó sẽ tải hết mà không phải tải từ từ , chauw chắc chắn là sẽ dùng một JOIN , thường là tôi hay làm QUery ở đây là dùng Join , tôi tự chủ động viết query Join
2 là LAzy trì hoãn và đến khi đụng đến Category thì nó sẽ cần phải tải data , vì đùng đến name của category thì chắc chacnws phải có query của Category
3 tôi nghĩ là bằng chứng để xem thay đổi thì bật cái SQL log lên để xem 
---

## Câu 5 — Nhiều query khác lỗi session đóng thế nào? (5đ)

So sánh hai cách dưới đây. **open-in-view tắt**, không có cơ chế tải LAZY ngoài session và không còn session hỗ trợ entity sau khi Service B trả về.

**Cách A:** dùng list() trong dữ kiện chung, mapping DTO bên trong Service transaction.

**Cách B:** dùng Service và Controller dưới đây:

```java
@Service
@RequiredArgsConstructor
public class ProductEntityService {
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<Product> listEntities() {
        return productRepository.findAll();
    }
}

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductEntityController {
    private final ProductEntityService productEntityService;

    @GetMapping
    public List<Product> getAll() {
        return productEntityService.listEntities();
    }
}
```

Ở B, Service được gọi qua Spring proxy; khi method trả về, transaction/context của nó đã đóng. Category vẫn chưa được tải. **Giả định Jackson sau đó thực sự truy cập Category.name**, không có cấu hình bỏ qua field hoặc chỉ serialize ID.

1. Với A, việc đọc Category để tạo DTO có thể chạy thêm SELECT không? Transaction có tự loại N+1 không? **(2đ)**
2. Với B, lỗi đọc quan hệ chưa tải có thể xảy ra lúc nào, vì sao? Có thể giải thích bằng lời thay cho thuộc tên exception. **(2đ)**
3. Vì sao nói “dùng DTO là tự hết N+1” vẫn sai dù A tránh để Jackson duyệt entity? **(1đ)**

**Trả lời:**
1 có thể chạy thêm select được nhé , transaction k tự loại N+1 mà phải có cơ chế để ngăn chặn cái này 
2 bị lỗi sau khi đóng session nhưng mà chưa tải xong mà chúng ta query lấy nó lên thì sẽ bị lỗi 
3 cái này tôi k biết , DTO chỉ là cách mà ta cho phép là nó truyền / trả về những field gì , ở trong map thì nếu chỉ có field ví dụ như id và name thì k đụng tới category thì k cần phải tải thì tránh dc N+1 , nhưng mà nếu vẫn truyền field có category thì k tự loại dc N+1 . Vì vậyh thfi DTO nó chỉ quyết định dc là data nào sẽ được truyền đi thôi chứ k quản lý dcc việc tải dữ liệu 

---

## Câu 6 — Chỉ lấy dữ liệu mà endpoint thật sự cần (5đ)

**Đây là endpoint mới /api/product-options**, chỉ cần id và name để điền dropdown. Không phải tự ý bỏ categoryName khỏi hợp đồng của endpoint cũ.

DTO mới đã có sẵn:

```java
@Getter
@AllArgsConstructor
public class ProductOptionResponse {
    private Long id;
    private String name;
}
```

Vẫn lấy Product bằng findAll(), vẫn giữ Product.category LAZY; không tác nhân nào khác đọc Category.

1. Viết phần map ngắn tạo ProductOptionResponse, hoặc chỉ rõ field/getter nào giữ và bỏ. Không cần viết lại Controller, Entity hoặc Repository. **(2đ)**
2. Dự đoán số SELECT Product/Category để tạo response; giải thích vì sao có quan hệ trong Entity không bắt buộc endpoint này tải quan hệ đó. **(2đ)**
3. Bạn sẽ kiểm gì trong SQL log của một request cô lập? **(1đ)**

**Trả lời:**
@Transactional(readOnly = true)
    public List<ProductOptionResponse> listSimple() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> new ProductOptionResponse(product.getId(),product.getName())).toList();
    }
field bỏ là getCategory vì đây là nó sẽ tải dữ liệu Category
2 1 thôi , vì là DTO nó chỉ có id và name , k cần phải tải dữ liệu của Category
3 kiểm tra được bao nhiêu select , time là bao nhiêu r đồ

---

## Câu 7 — Bộ đếm 20 có thực sự thuộc request của bạn? (5đ)

Thống kê Hibernate đã bật; snippet ở dev harness lấy đúng Statistics của SessionFactory đang được dùng:

```java
statistics.clear();
productService.list();
long count = statistics.getPrepareStatementCount();
```

Trong khoảng từ clear() đến đọc count, một job nền cũng truy vấn bằng **cùng SessionFactory**. count bằng 20. Không biết job đã chạy bao nhiêu statement.

1. Có được khẳng định request list() chạy 20 SELECT không? Vì sao? **(2đ)**
2. Giá trị 20 là loại bộ đếm gì; có nghĩa 20 ms hoặc 20 dòng kết quả không? **(1đ)**
3. Đề xuất cách đo lại để quy kết rõ cho request; clear() có đồng thời làm context/cache rỗng không? **(2đ)**

Không bắt nhớ tên hàm ngoài snippet hoặc triển khai tool tracing.

**Trả lời:**
1 không thể khắng địnhh dc chạy 20 Select được vì đây là count trên phạm vi là session factory , chưa kể là count đó nó k chỉ mỗi select nên là không thể khẳng định request List() chạy 20 select , à chưa kể đó chưa phải là count của List() mà toàn Session Factory
2 20 là giá trị Prepare count , không phải là 20 ms hay 20 dòng kết quả 
3 cô lập việc do cho rõ ràng là được
---

## Câu 8 — Sửa API ít query hơn: kết luận thế nào cho đúng? (5đ)

### Tình huống

API `GET /api/products` phải trả đủ ba Product 10, 11, 12. Mỗi Product phải có **id, name và categoryName** để frontend hiển thị. Không được tự ý bỏ field đang được yêu cầu.

Hai lập trình viên tạo hai bản sửa khác nhau từ cùng code ban đầu:

| Phiên bản | Số SELECT trong một request | Dữ liệu API trả về | Thời gian xử lý request |
|---|---:|---|---|
| Code ban đầu | 4 | Đủ ba Product, đủ id/name/categoryName và giá trị đúng | Chưa đo |
| Bản sửa của An | 1 | Vẫn đủ ba Product, đủ id/name/categoryName và giá trị đúng | Chưa đo |
| Bản sửa của Bình | 1 | Đủ ba Product nhưng chỉ còn id/name, bỏ categoryName | Chưa đo |

Các số đếm trong bảng đã được kiểm trong cùng điều kiện: cùng dữ liệu DB ban đầu, mỗi lần dùng context mới chưa có Category, không cache cấp hai/batch và không job/request khác chạy xen vào. Không cần đoán An/Bình dùng JOIN hay code gì.

### Bạn trả lời ba ý riêng

1. **Xét bản của An (2đ):** So với code ban đầu, bảng đã cho thấy số SELECT thay đổi ra sao? An nói “vậy API chắc chắn trả kết quả nhanh hơn”. Bạn có đồng ý kết luận về **thời gian** đó chưa? Nêu thông tin còn phải đo để xác nhận. Không cần viết cách đo.
2. **Xét bản của Bình (1đ):** Frontend vẫn cần categoryName, nhưng Bình bỏ field này để còn một SELECT. Bạn có chấp nhận bản sửa đó cho API hiện tại không? Vì sao? Nói rõ điểm khác với endpoint dropdown mới ở câu 6, vốn chỉ yêu cầu id/name từ đầu.
3. **Nếu lần sau bạn tự so sánh trước/sau (2đ):** Chọn **hai điều kiện** bạn sẽ giữ giống nhau hoặc kiểm soát khi đếm SQL; với mỗi điều kiện, giải thích một câu vì sao nếu nó khác thì số query có thể khác dù chưa chứng minh code tốt hơn. Có thể chọn từ: dữ liệu DB, dữ liệu đã có trong context/cache, job/request chạy cùng lúc, hoặc cấu hình tải quan hệ.

Ý 3 hỏi cách bạn chuẩn bị **một lần đo sau này**, không yêu cầu tìm lỗi trong bảng trên vì bảng đã cho điều kiện đo đồng nhất. Chỉ cần trả lời bằng lời; không hỏi p95, công cụ benchmark hoặc cấu hình HikariCP.

**Trả lời:**
1 số Select nó đã thay đổi bởi vì 2 người đã tìm cách để mà cho số Select giảm nhưng mà dữ liệu API trả về của 2 người là khác nhau , chưa chắc được API sẽ trả về kết quả nhanh hơn , nó thường là trade off giữa nhiều query và câu lenhej query phúc tạp có Join nhiều thì thời gian trả về cũng lâu xử lý lâu
2 không chấp nhận được với Api Đã quy ước ,k được phép thiếu field nào so với với quy ước của FE và BE m, ó với cái ban đầu là endpoint drop down ở 6 thì cái đó vẫn là DTO nằm nội bộ trong Backend , chưa phải là output trả ra cho client , theo ý tôi là vậy
3 
chịu 
---

Bài học: [Lesson 01 — N+1 từ code đến SQL](../../Notes/M2_Database/M2_4_Performance/LESSON_01_N_PLUS_1_VA_SQL_LOG.md).

Bản này thay đề 2026-10-05 làm đề học hiện hành; giữ file cũ nguyên vẹn, không xóa bài nộp. Khi chấm, lưu snapshot theo tên đề này. Bài giải ở file cùng tên thêm __DAPAN.md, đọc sau khi tự làm.
