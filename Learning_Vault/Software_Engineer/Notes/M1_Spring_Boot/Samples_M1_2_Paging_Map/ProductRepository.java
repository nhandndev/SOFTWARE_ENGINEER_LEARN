package com.shopcore.product;

import java.util.List;

public interface ProductRepository {
    List<Product> findAll();
}
