package com.shopcore.product;

import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Repository
public class InMemoryProductRepository implements ProductRepository {
    private final Map<Long, Product> products = new LinkedHashMap<>();

    public InMemoryProductRepository() {
        products.put(1L, new Product(1L, "MOUSE-001", "Mouse", new BigDecimal("500000"), 1L));
        products.put(2L, new Product(2L, "KB-001", "Keyboard", new BigDecimal("1500000"), 1L));
        products.put(3L, new Product(3L, "BOOK-001", "Clean Code", new BigDecimal("300000"), 2L));
        products.put(4L, new Product(4L, "HP-001", "Headphone", new BigDecimal("900000"), 1L));
        products.put(5L, new Product(5L, "MONITOR-001", "Monitor", new BigDecimal("3500000"), 1L));
    }

    @Override
    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }
}
