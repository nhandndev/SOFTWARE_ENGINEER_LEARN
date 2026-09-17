package com.shopcore.validation.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler  {

    // TODO: Bạn tự tạo các phương thức @ExceptionHandler xử lý:
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ProblemDetail> appExceptionHandler(AppException e , HttpServletRequest request) {
        ErrorCode errorCode = e.getErrorCode();
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(errorCode.getHttpStatus(), errorCode.getMessage());
        problemDetail.setType(URI.create("https://shopcore.com/errors/"));
        problemDetail.setTitle(errorCode.getHttpStatus().name());
        problemDetail.setInstance(URI.create(request.getRequestURI()));
        problemDetail.setProperty("path", request.getRequestURI());
        problemDetail.setProperty("code", errorCode.getCode());
        problemDetail.setProperty("timestamp", Instant.now().toString());
        return new ResponseEntity<>(problemDetail,  errorCode.getHttpStatus());
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e, HttpServletRequest request) {
      var Error = e.getBindingResult().getFieldErrors().stream().map(fieldError -> Map.of("field", fieldError.getField()
      ,"message", fieldError.getDefaultMessage()
      )).toList();
      ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST,"InValid");
      problemDetail.setType(URI.create("https://shopcore.com/errors/"));
      problemDetail.setTitle("Validation Failed");
      problemDetail.setInstance(URI.create(request.getRequestURI()));
      problemDetail.setProperty("errors",Error);
      problemDetail.setProperty("code","invalid");
      problemDetail.setProperty("timeStamp",Instant.now().toString());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(problemDetail);


    }
}
