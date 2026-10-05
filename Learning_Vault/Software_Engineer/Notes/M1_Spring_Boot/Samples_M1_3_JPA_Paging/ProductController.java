package com.shopcore.product;

import com.shopcore.common.ApiResponse;
import com.shopcore.common.PageResponse;
import com.shopcore.product.dto.ProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String keyword
    ) {
        PageResponse<ProductResponse> result =
                productService.getProducts(page, size, keyword);

        ApiResponse<PageResponse<ProductResponse>> body = ApiResponse
                .<PageResponse<ProductResponse>>builder()
                .success(true)
                .message("Get products successfully")
                .data(result)
                .build();

        return ResponseEntity.ok(body);
    }
}
