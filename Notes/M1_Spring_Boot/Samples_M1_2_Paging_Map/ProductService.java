package com.shopcore.product;

import com.shopcore.common.PageResponse;
import com.shopcore.product.dto.ProductResponse;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public PageResponse<ProductResponse> getProducts(int page, int size) {
        validatePageRequest(page, size);

        List<ProductResponse> allProducts = productRepository.findAll().stream()
                .sorted(Comparator.comparing(Product::getId))
                .map(this::toResponse)
                .toList();

        long totalElements = allProducts.size();
        int totalPages = (int) Math.ceil((double) totalElements / size);
        int fromIndex = page * size;

        if (fromIndex >= totalElements) {
            return new PageResponse<>(List.of(), page, size, totalElements, totalPages);
        }

        int toIndex = Math.min(fromIndex + size, allProducts.size());
        List<ProductResponse> content = allProducts.subList(fromIndex, toIndex);

        return new PageResponse<>(content, page, size, totalElements, totalPages);
    }

    private void validatePageRequest(int page, int size) {
        if (page < 0) {
            throw new IllegalArgumentException("page must be greater than or equal to 0");
        }

        if (size < 1 || size > 100) {
            throw new IllegalArgumentException("size must be between 1 and 100");
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
