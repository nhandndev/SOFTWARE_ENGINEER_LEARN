package com.shopcore.validation.dto;

import com.shopcore.validation.Valid.ValidSku;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class CreateProductRequest {

    @NotNull
    @ValidSku
    private String sku;
    @NotBlank
    @Size(min = 3, max = 100)
    private String name;
    @NotNull
    @Positive
    private BigDecimal price;
    @NotNull
    private Long categoryId;
}
