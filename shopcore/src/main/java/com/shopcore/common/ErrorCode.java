package com.shopcore.common;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi hệ thống không xác định.", HttpStatus.INTERNAL_SERVER_ERROR),

    // REQUEST / VALIDATION
    INVALID_REQUEST(
            400,
            "Invalid request",
            HttpStatus.BAD_REQUEST
    ),

    INVALID_PARAMETER(
            400,
            "Invalid parameter value",
            HttpStatus.BAD_REQUEST
    ),

    INVALID_REQUEST_BODY(
            400,
            "Invalid request body",
            HttpStatus.BAD_REQUEST
    ),

    // ==================== CATEGORY ====================

    CATEGORY_NOT_FOUND(
            404,
            "Category Not Found",
            HttpStatus.NOT_FOUND
    ),

    DUPLICATE_CATEGORY_NAME(
            409,
            "Duplicate Category Name",
            HttpStatus.CONFLICT
    ),

    CATEGORY_IN_USE(
            409,
            "Category Is Currently In Use",
            HttpStatus.CONFLICT
    ),

    INVALID_CATEGORY_INPUT(
            400,
            "Invalid Category Input",
            HttpStatus.BAD_REQUEST
    ),


    // ==================== PRODUCT ====================

    PRODUCT_NOT_FOUND(
            404,
            "Product Not Found",
            HttpStatus.NOT_FOUND
    ),

    DUPLICATE_SKU(
            409,
            "Duplicate Product SKU",
            HttpStatus.CONFLICT
    ),

    INVALID_PRODUCT_INPUT(
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
