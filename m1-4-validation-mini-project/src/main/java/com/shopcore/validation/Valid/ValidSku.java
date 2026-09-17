package com.shopcore.validation.Valid;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE , ElementType.FIELD})
@Constraint(validatedBy = ValidSkuValidator.class)
public @interface ValidSku{
    public String message() default "Invalid sku";
    public Class<?>[] groups() default {};
    public Class<? extends Payload>[] payload() default {};
}
