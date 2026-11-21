Câu 2 — Filter, Sort, Pagination và PageResponse
1. Tập Product sau Filter và Sort
- Product thỏa điều kiện: ID 10, 11, 13.
- Thứ tự sau Sort: 10 → 11 → 13.
2. Pagination
- page = 0, size = 2.
- offset = 0.
- Content của trang đầu: Product 10, 11.
3. Metadata
- totalElements = 3.
- totalPages = 2.
4. HTTP Response

Status: 200 OK.
{
  "content": [
    {
      "id": 10,
      "name": "Java Basic",
      "price": 100,
      "categoryId": 1
    },
    {
      "id": 11,
      "name": "Spring Guide",
      "price": 100,
      "categoryId": 1
    }
  ],
  "page": 0,
  "size": 2,
  "totalElements": 3,
  "totalPages": 2
}



Câu 3 — Page 1, Page 2 và Metadata
1. Page 1, size 2
{
  "content": [
    {
      "id": 13,
      "name": "Java Advanced",
      "price": 150,
      "categoryId": 1
    }
  ],
  "page": 1,
  "size": 2,
  "totalElements": 3,
  "totalPages": 2
}


2. Page 2, size 2

Status: 200 OK.
{
  "content": [],
  "page": 2,
  "size": 2,
  "totalElements": 3,
  "totalPages": 2
}


Trang vượt cuối không trả 404 và không làm totalElements trở thành 0.

3. Phân biệt size và content.size()
- size: Kích thước trang Client yêu cầu.
- content.size(): Số phần tử thực tế trong trang hiện tại.
- totalElements: Tổng phần tử khớp bộ lọc trước khi phân trang.

Câu 4 — Lỗi if/else làm bỏ mất Filter
1. Lỗi của code

Khi categoryId có giá trị, nhánh if đầu tiên chạy và trả kết quả ngay.

Điều kiện keyword bị bỏ qua.

Kết quả sai:
10 — Java Basic
11 — Spring Guide
13 — Java Advanced


2. Kết quả đúng

Khi áp dụng:
categoryId = 1 AND keyword chứa "java"


Kết quả:
10 — Java Basic
13 — Java Advanced


totalElements = 2.

3. Hướng xử lý

Phải kết hợp các điều kiện bằng AND trước khi Pagination.

Count Query cũng phải áp dụng cùng điều kiện.

Không thể sửa đúng bằng cách lấy hai Page đã phân trang riêng rồi ghép lại, vì cách đó không bảo toàn phép giao và metadata.

Có thể sử dụng query kết hợp điều kiện hoặc JPA Specification.

Câu 5 — Filter trước Pagination
1. Cách xử lý sai

Backend phân trang trước:
Page 0, size 2 → 10, 11


Sau đó mới Filter categoryId = 2.

Kết quả:
[]


2. Kết quả đúng

Phải Filter toàn bộ tập dữ liệu trước.

Product thuộc Category 2:
12, 15


Sau đó mới Pagination.

Kết quả:
content = [12, 15]
totalElements = 2


3. Thứ tự xử lý đúng
Filter → Sort → Pagination → Map DTO


Không lọc sau khi đã cắt trang, vì có thể bỏ sót Product phù hợp nằm ngoài trang ban đầu.

4. Nên xử lý ở đâu?

Nên áp dụng Filter, Sort và Pagination tại Repository/Database.

Không nên load toàn bộ Product về Service rồi mới Filter và Pagination bằng Java cho tập dữ liệu lớn, vì tốn bộ nhớ và chi phí truyền dữ liệu không cần thiết.

Câu 6 — Sorting, Tie-break và dữ liệu thay đổi
1. Thứ tự Sort

Thứ tự đúng:
13 → 10 → 11 → 15 → 12 → 14


Hai Product có cùng giá 100 cần thêm id ASC để xác định thứ tự rõ ràng.

2. Offset Pagination khi có INSERT

Ban đầu:
10, 11, 12, 13, 14, 15


Client lấy Page 0, size 2:
10, 11


Sau đó INSERT Product #9.

Dữ liệu mới:
9, 10, 11, 12, 13, 14, 15


Client lấy Page 1, size 2:
11, 12


Product #11 bị lặp giữa hai trang.

3. Nguyên nhân

Offset dựa vào vị trí phần tử trong tập dữ liệu tại thời điểm query.

Khi dữ liệu thay đổi, các vị trí có thể bị dịch chuyển.

Tie-break giúp xác định thứ tự trong một tập dữ liệu cố định, nhưng không tạo snapshot nhất quán giữa nhiều HTTP request.

Câu 7 — Binding và Validation
Theo API Contract, các request dưới đây đều phải trả 400 Bad Request.
Input	Nguyên nhân
page=abc	Không thể chuyển "abc" thành int; lỗi Binding trước Controller method
page=-1	Chuyển được thành số nguyên nhưng vi phạm page >= 0
size=101	Vượt giới hạn tối đa 100
size=0	Nhỏ hơn giới hạn tối thiểu 1
categoryId=0	Category ID phải là số nguyên dương
minPrice=-1	Giá tối thiểu không được âm
minPrice=150&maxPrice=100	Khoảng giá không hợp lệ vì min > max

Phân biệt:
- Binding kiểm tra có chuyển được dữ liệu từ HTTP sang kiểu Java hay không.
- Validation kiểm tra giá trị có tuân thủ API Contract hay không.
@RequestParam không tự bảo đảm tất cả quy tắc của dự án.

Câu 8 — Sort Validation và Allowlist
1. Direction không hợp lệ
GET /products?sort=price,up


Trả 400 Bad Request.

Vì up không thuộc asc hoặc desc.

2. Field không thuộc Allowlist
GET /products?sort=costPrice,asc


Trả 400 Bad Request.

Vì Shopcore chỉ hỗ trợ:
id
name
price


3. Sort sai định dạng

Ví dụ:
GET /products?sort=price


Trả 400 Bad Request.

Vì contract yêu cầu đúng một cặp:
field,direction


4. Pageable không tự bảo đảm toàn bộ Contract

Dùng Pageable không đồng nghĩa đã kiểm tra đúng mọi rule về:
- Page và Size.
- Sort field Allowlist.
- Sort direction.
- Định dạng Sort.
Cần kiểm tra hoặc cấu hình validation phù hợp để bảo đảm Backend thực hiện đúng contract.

5. Sort field lạ và SQL Injection

Không thể kết luận mọi Sort field không hợp lệ đều gây SQL Injection.

Nguy cơ phụ thuộc cách Backend xây dựng truy vấn.

Không nên nối raw input từ Client trực tiếp vào SQL.

Câu 9 — Page Entity, Mapper và PageResponse
1. Chuyển Entity thành DTO
Page<ProductResponse> dto =
    page.map(mapper::toResponse);


Page.map() chuyển từng Product thành ProductResponse.

content sau đó là danh sách DTO, không phải Entity.

2. Metadata

Trong tình huống đề bài:
size = 2
totalElements = 3
totalPages = 2


Nguồn lấy metadata:
dto.getSize();          // 2
dto.getTotalElements(); // 3
dto.getTotalPages();    // 2


3. Map không làm thay đổi số dòng

Mapper chuyển một Entity thành một DTO, không lọc thêm dữ liệu hoặc phân trang lại.

Vì vậy metadata được giữ lại.

4. Tại sao cần PageResponse riêng?

DTO PageResponse giúp kiểm soát cấu trúc JSON công khai cho Client.

Không nên phụ thuộc vào cấu trúc JSON nội bộ của PageImpl, vì cách biểu diễn đó có thể thay đổi khi nâng cấp framework.

Code minh họa:
Page<ProductResponse> dto =
    page.map(mapper::toResponse);

return PageResponse.<ProductResponse>builder()
    .content(dto.getContent())
    .page(dto.getNumber())
    .size(dto.getSize())
    .totalElements(dto.getTotalElements())
    .totalPages(dto.getTotalPages())
    .build();



Câu 10 — Count Query và JOIN
1. Count sai và Count đúng
Count sai = 6
Count đúng = 3


2. Count phải dùng cùng bộ lọc

Điều kiện đúng:
WHERE category_id = 1
  AND price >= 100


Ví dụ:
SELECT COUNT(*)
FROM products
WHERE category_id = 1
  AND price >= 100;


Không áp dụng LIMIT/OFFSET để đếm tổng tập khớp Filter.

3. JOIN có thể làm trùng Product

Trong tình huống đề bài, có hai Product khác nhau:
10, 13


Tổng Product khác nhau là 2, không phải 3 dòng JOIN.

Nếu contract đếm Product, phải tránh nhầm số dòng JOIN với số Product.

Một hướng:
COUNT(DISTINCT p.id)


4. Hướng xử lý

Cả Content Query và Count Query phải giữ đúng:
- Bộ lọc được yêu cầu.
- Đơn vị dữ liệu cần phân trang và đếm: Product.
- Quy tắc loại trùng khi JOIN nếu cần.
Không sửa metadata bằng cách đoán số rồi gán vào JSON.

Câu 11 — List rỗng, Parent không tồn tại và Page vượt cuối
1. Filter không có kết quả
GET /api/v1/products?categoryId=999


Trả 200 OK.
{
  "content": [],
  "page": 0,
  "size": 20,
  "totalElements": 0,
  "totalPages": 0
}


2. Parent Category không tồn tại
GET /api/v1/categories/999/products


Trả 404 Not Found.

Vì Category #999 không tồn tại và contract yêu cầu kiểm tra Parent Resource.

3. Page vượt cuối
GET /api/v1/products?page=999&size=2


Trả 200 OK.
{
  "content": [],
  "page": 999,
  "size": 2,
  "totalElements": 6,
  "totalPages": 3
}


Backend giữ nguyên page=999, không tự ép về trang cuối.

Câu 12 — Luồng xử lý List API trong Spring Boot
1. Spring MVC / Controller

Client gửi Query Parameters.

Spring thực hiện Binding:
Query String → Java Parameters


Backend kiểm tra:
- Range của page, size, price.
- Sort Allowlist.
- Các điều kiện Filter.
Đồng thời normalize input như trim keyword trước khi truy vấn.

2. Service

Service nhận điều kiện lọc và Pageable.

Trong tình huống đề bài:
categoryId = 2
page = 0
size = 2
sort = id ASC


3. Repository / Database

Repository áp dụng Filter, Sort và Pagination tại Database.

Kết quả:
content = Product 12, Product 15
totalElements = 2
totalPages = 1


4. Service Mapping

Service chuyển Entity thành DTO theo quan hệ một-một:
Page<ProductResponse> dtoPage =
    entities.map(mapper::toResponse);


Sau đó đóng gói thành PageResponse<ProductResponse>.

Không lọc thêm Product trong Mapper.

5. Controller trả Response

Controller trả object PageResponse.

Spring HTTP Message Converter sử dụng JSON serializer phù hợp để chuyển object thành JSON và gửi cho Client với HTTP 200 OK.
Toàn bộ luồng
Client
  ↓
GET /api/v1/products?categoryId=2&page=0&size=2
  ↓
Spring MVC Binding
  ↓
Validation + Normalize Input
  ↓
Service
  ↓
Repository
  ↓
Database
  ├── Filter categoryId = 2
  ├── Sort id ASC
  ├── Pagination page 0, size 2
  └── Count tổng Product khớp filter
  ↓
Page<Product>
  ↓
Page.map()
  ↓