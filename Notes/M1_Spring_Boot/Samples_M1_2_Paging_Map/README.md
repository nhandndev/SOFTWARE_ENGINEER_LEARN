# Sample M1-2 - Paging Với Map In-Memory

> Mục tiêu: nhìn rõ pagination nằm ở đâu khi chưa dùng JPA/database.

## Luồng

```text
GET /api/products?page=0&size=2
-> ProductController nhận page/size
-> ProductService validate page/size
-> ProductService gọi ProductRepository.findAll()
-> Repository trả List<Product>
-> Service sort + cắt list + map sang ProductResponse
-> Controller trả PageResponse<ProductResponse>
```

## Ý chính

Repository chỉ biết dữ liệu:

```text
findAll() -> List<Product>
```

Service biết use case list có phân trang:

```text
validate page/size
sort theo id
fromIndex = page * size
toIndex = min(fromIndex + size, totalElements)
totalPages = ceil(totalElements / size)
```

Controller biết HTTP:

```text
@RequestParam(defaultValue = "0") int page
@RequestParam(defaultValue = "20") int size
ResponseEntity.ok(...)
```

## Test nhanh

```bash
curl -i 'http://localhost:8080/api/products?page=0&size=2'
curl -i 'http://localhost:8080/api/products?page=1&size=2'
curl -i 'http://localhost:8080/api/products?page=2&size=2'
curl -i 'http://localhost:8080/api/products?page=3&size=2'
curl -i 'http://localhost:8080/api/products?page=-1&size=2'
curl -i 'http://localhost:8080/api/products?page=0&size=101'
```

## Ghi nhớ

```text
Repository trả dữ liệu nguồn.
Service tính pagination.
Controller trả HTTP response.
```
