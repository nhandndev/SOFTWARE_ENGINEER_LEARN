# Project Solution M1-2 - Shopcore MVC & REST API

> Đây là đáp án tham khảo để đọc và hiểu luồng. Đừng học thuộc từng dòng. Hãy nhìn cách request đi qua `Controller -> Service -> Repository`.

## 1. `pom.xml`

Chỉ cần Spring Web:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

## 2. Entry point

```java
package com.shopcore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ShopcoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopcoreApplication.class, args);
    }
}
```

## 3. Common

### `PageResponse.java`

```java
package com.shopcore.common;

import java.util.List;

public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;

    public PageResponse() {
    }

    public PageResponse(List<T> content, int page, int size, long totalElements, int totalPages) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
```

### `ApiErrorResponse.java`

```java
package com.shopcore.common;

public class ApiErrorResponse {
    private int status;
    private String error;
    private String message;

    public ApiErrorResponse() {
    }

    public ApiErrorResponse(int status, String error, String message) {
        this.status = status;
        this.error = error;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```

### `GlobalExceptionHandler.java`

```java
package com.shopcore.common;

import com.shopcore.category.CategoryInUseException;
import com.shopcore.category.CategoryNameDuplicatedException;
import com.shopcore.category.CategoryNotFoundException;
import com.shopcore.category.InvalidCategoryInputException;
import com.shopcore.product.DuplicateSkuException;
import com.shopcore.product.InvalidProductInputException;
import com.shopcore.product.ProductNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            ProductNotFoundException.class,
            CategoryNotFoundException.class
    })
    public ResponseEntity<ApiErrorResponse> handleNotFound(RuntimeException ex) {
        return error(HttpStatus.NOT_FOUND, "NOT_FOUND", ex.getMessage());
    }

    @ExceptionHandler({
            DuplicateSkuException.class,
            CategoryNameDuplicatedException.class,
            CategoryInUseException.class
    })
    public ResponseEntity<ApiErrorResponse> handleConflict(RuntimeException ex) {
        return error(HttpStatus.CONFLICT, "CONFLICT", ex.getMessage());
    }

    @ExceptionHandler({
            InvalidProductInputException.class,
            InvalidCategoryInputException.class
    })
    public ResponseEntity<ApiErrorResponse> handleBadRequest(RuntimeException ex) {
        return error(HttpStatus.BAD_REQUEST, "BAD_REQUEST", ex.getMessage());
    }

    private ResponseEntity<ApiErrorResponse> error(HttpStatus status, String code, String message) {
        return ResponseEntity
                .status(status)
                .body(new ApiErrorResponse(status.value(), code, message));
    }
}
```

## 4. Category

### `Category.java`

```java
package com.shopcore.category;

public class Category {
    private Long id;
    private String name;

    public Category() {
    }

    public Category(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

### DTO

```java
package com.shopcore.category.dto;

public class CreateCategoryRequest {
    private String name;

    public CreateCategoryRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

```java
package com.shopcore.category.dto;

public class UpdateCategoryRequest {
    private String name;

    public UpdateCategoryRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

```java
package com.shopcore.category.dto;

public class CategoryResponse {
    private Long id;
    private String name;

    public CategoryResponse() {
    }

    public CategoryResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

### Exceptions

```java
package com.shopcore.category;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(Long id) {
        super("Category not found: " + id);
    }
}
```

```java
package com.shopcore.category;

public class CategoryNameDuplicatedException extends RuntimeException {
    public CategoryNameDuplicatedException(String name) {
        super("Category name already exists: " + name);
    }
}
```

```java
package com.shopcore.category;

public class CategoryInUseException extends RuntimeException {
    public CategoryInUseException(Long id) {
        super("Category still has products: " + id);
    }
}
```

### Repository

```java
package com.shopcore.category;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository {
    Category save(Category category);

    Optional<Category> findById(Long id);

    List<Category> findAll();

    boolean existsById(Long id);

    boolean existsByName(String name);

    void deleteById(Long id);
}
```

```java
package com.shopcore.category;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class InMemoryCategoryRepository implements CategoryRepository {
    private final Map<Long, Category> categories = new LinkedHashMap<>();
    private long sequence = 1L;

    public InMemoryCategoryRepository() {
        save(new Category(null, "Accessories"));
        save(new Category(null, "Books"));
    }

    @Override
    public Category save(Category category) {
        if (category.getId() == null) {
            category.setId(sequence++);
        }

        categories.put(category.getId(), category);
        return category;
    }

    @Override
    public Optional<Category> findById(Long id) {
        return Optional.ofNullable(categories.get(id));
    }

    @Override
    public List<Category> findAll() {
        return new ArrayList<>(categories.values());
    }

    @Override
    public boolean existsById(Long id) {
        return categories.containsKey(id);
    }

    @Override
    public boolean existsByName(String name) {
        return categories.values().stream()
                .anyMatch(category -> category.getName().equalsIgnoreCase(name));
    }

    @Override
    public void deleteById(Long id) {
        categories.remove(id);
    }
}
```

### Service

```java
package com.shopcore.category;

import com.shopcore.category.dto.CategoryResponse;
import com.shopcore.category.dto.CreateCategoryRequest;
import com.shopcore.category.dto.UpdateCategoryRequest;
import com.shopcore.product.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public CategoryResponse getById(Long id) {
        return toResponse(findExisting(id));
    }

    public CategoryResponse create(CreateCategoryRequest request) {
        validateName(request.getName());
        ensureNameIsUnique(request.getName());

        Category category = new Category(null, request.getName().trim());
        return toResponse(categoryRepository.save(category));
    }

    public CategoryResponse update(Long id, UpdateCategoryRequest request) {
        Category category = findExisting(id);

        validateName(request.getName());
        if (!category.getName().equalsIgnoreCase(request.getName())
                && categoryRepository.existsByName(request.getName())) {
            throw new CategoryNameDuplicatedException(request.getName());
        }

        category.setName(request.getName().trim());
        return toResponse(categoryRepository.save(category));
    }

    public void delete(Long id) {
        findExisting(id);
        if (productRepository.existsByCategoryId(id)) {
            throw new CategoryInUseException(id);
        }
        categoryRepository.deleteById(id);
    }

    private Category findExisting(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    private void validateName(String name) {
        if (name == null || name.isBlank()) {
            throw new InvalidCategoryInputException("Category name must not be blank");
        }
    }

    private void ensureNameIsUnique(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new CategoryNameDuplicatedException(name);
        }
    }

    private CategoryResponse toResponse(Category category) {
        return new CategoryResponse(category.getId(), category.getName());
    }
}
```

Thêm exception input cho Category:

```java
package com.shopcore.category;

public class InvalidCategoryInputException extends RuntimeException {
    public InvalidCategoryInputException(String message) {
        super(message);
    }
}
```

### Controller

```java
package com.shopcore.category;

import com.shopcore.category.dto.CategoryResponse;
import com.shopcore.category.dto.CreateCategoryRequest;
import com.shopcore.category.dto.UpdateCategoryRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAll() {
        return ResponseEntity.ok(categoryService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getById(id));
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> create(@RequestBody CreateCategoryRequest request) {
        CategoryResponse created = categoryService.create(request);
        URI location = URI.create("/api/categories/" + created.getId());
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> update(
            @PathVariable Long id,
            @RequestBody UpdateCategoryRequest request) {
        return ResponseEntity.ok(categoryService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

## 5. Product

### `Product.java`

```java
package com.shopcore.product;

import java.math.BigDecimal;

public class Product {
    private Long id;
    private String sku;
    private String name;
    private BigDecimal price;
    private Long categoryId;

    public Product() {
    }

    public Product(Long id, String sku, String name, BigDecimal price, Long categoryId) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
```

### DTO

```java
package com.shopcore.product.dto;

import java.math.BigDecimal;

public class CreateProductRequest {
    private String sku;
    private String name;
    private BigDecimal price;
    private Long categoryId;

    public CreateProductRequest() {
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
```

```java
package com.shopcore.product.dto;

import java.math.BigDecimal;

public class UpdateProductRequest {
    private String name;
    private BigDecimal price;
    private Long categoryId;

    public UpdateProductRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
```

```java
package com.shopcore.product.dto;

import java.math.BigDecimal;

public class ProductResponse {
    private Long id;
    private String sku;
    private String name;
    private BigDecimal price;
    private Long categoryId;

    public ProductResponse() {
    }

    public ProductResponse(Long id, String sku, String name, BigDecimal price, Long categoryId) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
```

### Exceptions

```java
package com.shopcore.product;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("Product not found: " + id);
    }
}
```

```java
package com.shopcore.product;

public class DuplicateSkuException extends RuntimeException {
    public DuplicateSkuException(String sku) {
        super("SKU already exists: " + sku);
    }
}
```

```java
package com.shopcore.product;

public class InvalidProductInputException extends RuntimeException {
    public InvalidProductInputException(String message) {
        super(message);
    }
}
```

### Repository

```java
package com.shopcore.product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    Product save(Product product);

    Optional<Product> findById(Long id);

    List<Product> findAll();

    boolean existsBySku(String sku);

    boolean existsByCategoryId(Long categoryId);

    void deleteById(Long id);
}
```

```java
package com.shopcore.product;

import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class InMemoryProductRepository implements ProductRepository {
    private final Map<Long, Product> products = new LinkedHashMap<>();
    private long sequence = 1L;

    public InMemoryProductRepository() {
        save(new Product(null, "MOUSE-001", "Mouse", new BigDecimal("500000"), 1L));
        save(new Product(null, "BOOK-001", "Clean Code", new BigDecimal("300000"), 2L));
    }

    @Override
    public Product save(Product product) {
        if (product.getId() == null) {
            product.setId(sequence++);
        }

        products.put(product.getId(), product);
        return product;
    }

    @Override
    public Optional<Product> findById(Long id) {
        return Optional.ofNullable(products.get(id));
    }

    @Override
    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }

    @Override
    public boolean existsBySku(String sku) {
        return products.values().stream()
                .anyMatch(product -> product.getSku().equalsIgnoreCase(sku));
    }

    @Override
    public boolean existsByCategoryId(Long categoryId) {
        return products.values().stream()
                .anyMatch(product -> product.getCategoryId().equals(categoryId));
    }

    @Override
    public void deleteById(Long id) {
        products.remove(id);
    }
}
```

### Service

```java
package com.shopcore.product;

import com.shopcore.category.CategoryRepository;
import com.shopcore.category.CategoryNotFoundException;
import com.shopcore.common.PageResponse;
import com.shopcore.product.dto.CreateProductRequest;
import com.shopcore.product.dto.ProductResponse;
import com.shopcore.product.dto.UpdateProductRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public PageResponse<ProductResponse> getAll(int page, int size) {
        validatePage(page, size);

        List<ProductResponse> all = productRepository.findAll().stream()
                .sorted(Comparator.comparing(Product::getId))
                .map(this::toResponse)
                .toList();

        int totalElements = all.size();
        int totalPages = (int) Math.ceil((double) totalElements / size);
        int fromIndex = page * size;

        if (fromIndex >= totalElements) {
            return new PageResponse<>(List.of(), page, size, totalElements, totalPages);
        }

        int toIndex = Math.min(fromIndex + size, totalElements);
        return new PageResponse<>(all.subList(fromIndex, toIndex), page, size, totalElements, totalPages);
    }

    public ProductResponse getById(Long id) {
        return toResponse(findExisting(id));
    }

    public ProductResponse create(CreateProductRequest request) {
        validateCreateRequest(request);
        ensureCategoryExists(request.getCategoryId());

        if (productRepository.existsBySku(request.getSku())) {
            throw new DuplicateSkuException(request.getSku());
        }

        Product product = new Product(
                null,
                request.getSku().trim(),
                request.getName().trim(),
                request.getPrice(),
                request.getCategoryId()
        );

        return toResponse(productRepository.save(product));
    }

    public ProductResponse update(Long id, UpdateProductRequest request) {
        Product product = findExisting(id);

        validateUpdateRequest(request);
        ensureCategoryExists(request.getCategoryId());

        product.setName(request.getName().trim());
        product.setPrice(request.getPrice());
        product.setCategoryId(request.getCategoryId());

        return toResponse(productRepository.save(product));
    }

    public void delete(Long id) {
        findExisting(id);
        productRepository.deleteById(id);
    }

    private Product findExisting(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    private void ensureCategoryExists(Long categoryId) {
        if (categoryId == null || !categoryRepository.existsById(categoryId)) {
            throw new CategoryNotFoundException(categoryId);
        }
    }

    private void validateCreateRequest(CreateProductRequest request) {
        if (request.getSku() == null || request.getSku().isBlank()) {
            throw new InvalidProductInputException("SKU must not be blank");
        }
        validateNameAndPrice(request.getName(), request.getPrice());
    }

    private void validateUpdateRequest(UpdateProductRequest request) {
        validateNameAndPrice(request.getName(), request.getPrice());
    }

    private void validateNameAndPrice(String name, BigDecimal price) {
        if (name == null || name.isBlank()) {
            throw new InvalidProductInputException("Product name must not be blank");
        }
        if (price == null || price.compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidProductInputException("Product price must be greater than 0");
        }
    }

    private void validatePage(int page, int size) {
        if (page < 0) {
            throw new InvalidProductInputException("Page must be greater than or equal to 0");
        }
        if (size < 1 || size > 100) {
            throw new InvalidProductInputException("Size must be between 1 and 100");
        }
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getSku(),
                product.getName(),
                product.getPrice(),
                product.getCategoryId()
        );
    }
}
```

### Controller

```java
package com.shopcore.product;

import com.shopcore.common.PageResponse;
import com.shopcore.product.dto.CreateProductRequest;
import com.shopcore.product.dto.ProductResponse;
import com.shopcore.product.dto.UpdateProductRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<PageResponse<ProductResponse>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(productService.getAll(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ProductResponse> create(@RequestBody CreateProductRequest request) {
        ProductResponse created = productService.create(request);
        URI location = URI.create("/api/products/" + created.getId());
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(
            @PathVariable Long id,
            @RequestBody UpdateProductRequest request) {
        return ResponseEntity.ok(productService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

## 6. Request test

```bash
curl -i http://localhost:8080/api/categories

curl -i -X POST http://localhost:8080/api/categories \
  -H 'Content-Type: application/json' \
  -d '{"name":"Keyboard"}'

curl -i -X POST http://localhost:8080/api/products \
  -H 'Content-Type: application/json' \
  -d '{"sku":"KB-001","name":"Keyboard","price":1500000,"categoryId":1}'

curl -i http://localhost:8080/api/products/1

curl -i 'http://localhost:8080/api/products?page=0&size=2'

curl -i -X PUT http://localhost:8080/api/products/1 \
  -H 'Content-Type: application/json' \
  -d '{"name":"Wireless Mouse","price":700000,"categoryId":1}'

curl -i -X DELETE http://localhost:8080/api/products/1
```

## 7. Luồng cần hiểu

Với `POST /api/products`:

```text
Client gửi JSON
-> Tomcat nhận request
-> DispatcherServlet tìm ProductController.create
-> Jackson tạo CreateProductRequest
-> Controller gọi ProductService.create
-> Service kiểm tra input, category, sku
-> Repository lưu Product vào Map
-> Service đổi Product thành ProductResponse
-> Controller tạo ResponseEntity 201 + Location
-> Jackson đổi ProductResponse thành JSON
-> Client nhận response
```

Điểm quan trọng:

- `Controller` hiểu HTTP.
- `Service` hiểu nghiệp vụ.
- `Repository` hiểu cách lưu dữ liệu.
- `DTO` là hợp đồng với client.
- `Product` và `Category` hiện tại là model nội bộ, chưa phải JPA entity.
- `ResponseEntity` chỉ nên nằm ở Controller.
- `Map` chỉ nên nằm trong Repository.
