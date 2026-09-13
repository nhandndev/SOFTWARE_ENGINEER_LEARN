package com.shopcore.category.service;

import com.shopcore.category.Category;
import com.shopcore.category.CategoryRepository;
import com.shopcore.category.dto.CategoryResponse;
import com.shopcore.category.dto.CreateCategoryRequest;
import com.shopcore.category.dto.UpdateCategoryRequest;
import com.shopcore.common.AppException;
import com.shopcore.common.ErrorCode;
import com.shopcore.common.PageResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    @Transactional
    public CategoryResponse create(CreateCategoryRequest request) {
        if(categoryRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.DUPLICATE_CATEGORY_NAME);
        }
        Category category = Category.builder()
                .name(request.getName())
                .build();
        category = categoryRepository.save(category);
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
    @Transactional
    public CategoryResponse getById(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
    @Transactional
    public PageResponse<CategoryResponse> getAll(int page , int size) {
        if(page < 0 || page > 100 || size < 1 || size > 100) {
            throw new AppException(ErrorCode.INVALID_PARAMETER);
        }
        Pageable pageable = PageRequest.of(page, size);
        Page<Category> categoryPage = categoryRepository.findAll(pageable);
        List<CategoryResponse> categoryResponseList = categoryPage.stream().map(category -> CategoryResponse.builder().name(category.getName()).id(category.getId()).createdAt(category.getCreatedAt()).updatedAt(category.getUpdatedAt()).build()).toList();
        return PageResponse.<CategoryResponse>builder()
                .content(categoryResponseList)
                .page(page)
                .size(size)
                .totalPages(categoryPage.getTotalPages())
                .totalElements(categoryPage.getTotalElements())
                .last(categoryPage.isLast())
                .build();
    }
    @Transactional
    public CategoryResponse update(Long id, UpdateCategoryRequest request) {
        Category category = categoryRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        if(categoryRepository.existsByName(request.getName()) && !category.getName().equals(request.getName())) {
            throw new AppException(ErrorCode.DUPLICATE_CATEGORY_NAME);
        }
        else{
            category.setName(request.getName());
        }
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
    @Transactional
    public void delete(Long id) {
        if(categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
        }else{
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }
    }
}
