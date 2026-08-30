package com.shopcore.common;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // ==================== CATEGORY ====================

    CategoryNotFoundException(
            404,
            "Category Not Found",
            HttpStatus.NOT_FOUND
    ),

    DuplicateCategoryNameException(
            409,
            "Duplicate Category Name",
            HttpStatus.CONFLICT
    ),

    CategoryInUseException(
            409,
            "Category Is Currently In Use",
            HttpStatus.CONFLICT
    ),

    InvalidCategoryInputException(
            400,
            "Invalid Category Input",
            HttpStatus.BAD_REQUEST
    ),


    // ==================== PRODUCT ====================

    ProductNotFoundException(
            404,
            "Product Not Found",
            HttpStatus.NOT_FOUND
    ),

    DuplicateSkuException(
            409,
            "Duplicate Product SKU",
            HttpStatus.CONFLICT
    ),

    InvalidProductInputException(
            400,
            "Invalid Product Input",
            HttpStatus.BAD_REQUEST
    );


    private final int code;
    private final String message;
    private final HttpStatus httpStatus;


    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}