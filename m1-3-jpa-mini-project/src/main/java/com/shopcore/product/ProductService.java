package com.shopcore.product;

import com.shopcore.category.Category;
import com.shopcore.category.CategoryRepository;
import com.shopcore.common.AppException;
import com.shopcore.common.ErrorCode;
import com.shopcore.common.PageResponse;
import com.shopcore.product.dto.CreateProductRequest;
import com.shopcore.product.dto.ProductResponse;
import com.shopcore.product.dto.UpdateProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    @Transactional
    public ProductResponse create(CreateProductRequest request) {
        if(productRepository.existsBySku(request.getSku())){
            throw new AppException(ErrorCode.DUPLICATE_SKU);
        }
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        Product product = Product.builder()
                .name(request.getName())
                .sku(request.getSku())
                .price(request.getPrice())
                .category(category)
                .build();
        product = productRepository.save(product);
        ProductResponse productResponse = ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .sku(product.getSku())
                .price(product.getPrice())
                .categoryName(category.getName())
                .categoryId(category.getId())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
        return productResponse;
   }
    @Transactional(readOnly = true )
    public ProductResponse getById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        ProductResponse productResponse = ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .sku(product.getSku())
                .price(product.getPrice())
                .categoryName(product.getCategory().getName())
                .categoryId(product.getCategory().getId())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
        return productResponse;
    }
    @Transactional(readOnly = true )
    public PageResponse<ProductResponse> getAll(Long categoryId, String keyword, Pageable pageable) {
        Page<Product> productPage;
        if(pageable.getPageNumber() < 0 || pageable.getPageSize() < 1 || pageable.getPageSize() > 100) {
            throw new AppException(ErrorCode.INVALID_PARAMETER);
        }
        if(categoryId != null) {
            if (categoryRepository.existsById(categoryId)) {
                productPage = productRepository.findByCategoryId(categoryId, pageable);
            } else {
                throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
            }
        }
             else if (keyword != null && !keyword.isBlank()) {
                productPage = productRepository.searchByName(keyword, pageable);
        }
        else{
            productPage = productRepository.findAll(pageable);
        }
        List<ProductResponse> productResponseList = productPage.stream().map(product -> ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .sku(product.getSku())
                .price(product.getPrice())
                .categoryName(product.getCategory().getName())
                .categoryId(product.getCategory().getId())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build()).toList();
        return PageResponse.<ProductResponse>builder()
                .size(pageable.getPageSize())
                .page(pageable.getPageNumber())
                .content(productResponseList)
                .last(productPage.isLast())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .build();
    }
    @Transactional
    public ProductResponse update(Long id, UpdateProductRequest request) {
        Product product =productRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setCategory(category);
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .sku(product.getSku())
                .price(product.getPrice())
                .categoryName(category.getName())
                .categoryId(category.getId())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
    @Transactional
    public void delete(Long id) {
        if(!productRepository.existsById(id)) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }
        productRepository.deleteById(id);
    }
}
