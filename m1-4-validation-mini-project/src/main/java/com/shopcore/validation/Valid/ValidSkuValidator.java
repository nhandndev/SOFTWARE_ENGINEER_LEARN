package com.shopcore.validation.Valid;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidSkuValidator implements ConstraintValidator<ValidSku,String> {
    private static final String SKU_PATTERN = "^[A-Z0-9](?:[A-Z0-9-]{1,28}[A-Z0-9])?$";
    public boolean isValid(String sku, ConstraintValidatorContext context) {
        if(sku.isBlank() || sku == null){
            return true;
        }
        return sku.matches(SKU_PATTERN);

    }
}
