package com.shopcore.product;

import com.shopcore.common.ApiResponse;
import com.shopcore.common.PageResponse;
import com.shopcore.product.dto.CreateProductRequest;
import com.shopcore.product.dto.ProductResponse;
import com.shopcore.product.dto.UpdateProductRequest;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.servlet.function.EntityResponse;

import java.net.URI;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductController {
    final ProductService productService;
    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> create(@Valid @RequestBody CreateProductRequest request) {
        ApiResponse<ProductResponse> apiResponse = ApiResponse.<ProductResponse>builder()
                .data(productService.create(request))
                .message("Product successfully created")
                .success(true)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getById(@PathVariable Long id) {
        ApiResponse<ProductResponse> apiResponse = ApiResponse.<ProductResponse>builder()
                .data(productService.getById(id))
                .message("Product successfully retrieved")
                .success(true)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getAll(@RequestParam (defaultValue = "0") int page ,
                                 @RequestParam (defaultValue = "20" ) int size ,
                                                                             @RequestParam(required = false) Long categoryId ,
                                                                             @RequestParam(required = false) String keyword
                                                                             ) {
        Pageable pageable = PageRequest.of(page, size);
       PageResponse<ProductResponse> pageResponse = productService.getAll(categoryId,keyword,pageable);
       ApiResponse<PageResponse<ProductResponse>> apiResponse = ApiResponse.<PageResponse<ProductResponse>>builder()
               .data(pageResponse)
               .message("Product successfully retrieved")
               .success(true)
               .build();
       return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProductRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("Product updated", productService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
