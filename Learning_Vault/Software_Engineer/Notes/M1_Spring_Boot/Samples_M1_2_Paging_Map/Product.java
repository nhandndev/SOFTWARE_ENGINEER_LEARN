package com.shopcore.product;

import java.math.BigDecimal;

public class Product {
    private Long id;
    private String sku;
    private String name;
    private BigDecimal price;
    private Long categoryId;

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

    public String getSku() {
        return sku;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Long getCategoryId() {
        return categoryId;
    }
}
