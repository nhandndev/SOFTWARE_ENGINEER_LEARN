package com.shopcore.validation.controller;

import com.shopcore.validation.dto.CreateProductRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    // TODO: Thêm Annotation kích hoạt Validation cho CreateProductRequest
    @PostMapping
    public ResponseEntity<String> createProduct( @Valid @RequestBody CreateProductRequest request) {
        return ResponseEntity.ok("Tạo sản phẩm thành công!");
    }
}
