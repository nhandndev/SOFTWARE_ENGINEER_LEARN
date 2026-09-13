package com.shopcore.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsBySku(String sku);
    boolean existsByCategoryId(Long id);
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    @Query("""
            select p
            from Product p
            where lower(p.name) like lower(concat('%', :keyword, '%'))
            """)
    Page<Product> searchByName(@Param("keyword") String keyword, Pageable pageable);
}
