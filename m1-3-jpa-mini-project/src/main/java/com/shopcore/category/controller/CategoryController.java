package com.shopcore.category.controller;

import com.shopcore.category.dto.UpdateCategoryRequest;
import com.shopcore.category.service.CategoryService;
import com.shopcore.category.dto.CategoryResponse;
import com.shopcore.category.dto.CreateCategoryRequest;
import com.shopcore.common.ApiResponse;
import com.shopcore.common.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> create(@RequestBody @Valid CreateCategoryRequest createCategoryRequest) {
        ApiResponse<CategoryResponse> apiResponse =  ApiResponse.<CategoryResponse>builder()
                .data(categoryService.create(createCategoryRequest))
                .message("Category created successfully")
                .success(true)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<CategoryResponse>>> getAll(@RequestParam (defaultValue = "0" ) int page , @RequestParam (defaultValue = "20") int size) {
        PageResponse<CategoryResponse> result = categoryService.getAll(page, size);
        ApiResponse<PageResponse<CategoryResponse>> apiResponse =  ApiResponse.<PageResponse<CategoryResponse>>builder()
                .data(result)
                .message("Category found")
                .success(true)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> update( @PathVariable Long id ,@RequestBody @Valid UpdateCategoryRequest updateCategoryRequest)  {
        ApiResponse<CategoryResponse> apiResponse = ApiResponse.<CategoryResponse>builder()
                .data(categoryService.update(id,updateCategoryRequest))
                .message("Category updated successfully")
                .success(true)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable  Long id) {
        categoryService.delete(id);
        ApiResponse<Void> apiResponse = ApiResponse.<Void>builder()
                .message("Category deleted successfully")
                .success(true)
                .build(); // cai gi cung phai co ApiResponse het , ke ca delete ,tin toi di
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(apiResponse);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getById(@PathVariable Long id) {
        ApiResponse<CategoryResponse> apiResponse = ApiResponse.<CategoryResponse>builder()
                .data(categoryService.getById(id))
                .message("Category found")
                .success(true)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
