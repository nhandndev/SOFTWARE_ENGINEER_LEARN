# M1-4 - Lo trinh 4 Lesson

> Muc tieu: hieu request sai bi chan o dau, validate DTO dung cach, tu tao rule rieng, va tra loi loi thong nhat trong Spring Boot.

Module nay gom **4 lesson chinh**, khong tach thanh 7 bai doc rieng.

## Lesson 01 - Request Error Flow

**Chu de:**

- Validation error va business error.
- JSON parse, JSON binding, DTO validation, query/path conversion.
- `@Valid` o muc nhan biet trong luong request.
- `AppException` va `GlobalExceptionHandler`.
- Chon status `400`, `404`, `409`.

**Tai lieu chinh:** `README.md`

**Trang thai:** Da hoc va da kiem tra.

## Lesson 02 - DTO Validation Trong Thuc Te

**Chu de:**

- `@NotNull`, `@NotBlank`, `@NotEmpty`, `@Size`.
- `@Min`, `@Max`, `@Positive`, `@DecimalMin`.
- Chon annotation theo y nghia field.
- `@Valid` cho `@RequestBody`.
- `@Validated` cho query/path parameter.
- Nested DTO va cascade validation.
- `ConstraintViolationException` va `MethodArgumentNotValidException`.

**Tai lieu gop:**

- `02_JAKARTA_VALIDATION_DTO.md`
- `03_VALID_VA_VALIDATED.md`

**Luu y:** Khong hoc lai phan phan biet validation/business va luong request chi tiet cua Lesson 01. O lesson nay tap trung vao cach dat rule tren DTO va tham so method.

**Trang thai:** Da hoc va da kiem tra.

## Lesson 03 - Custom Rule Va Global Error Handler

**Chu de:**

- Khi nao dung `@Pattern`, khi nao tao custom validator.
- Tao `@ValidSku` va `ConstraintValidator`.
- Tach format validation khoi business validation.
- `@RestControllerAdvice`.
- `@ExceptionHandler`.
- Gom loi validation thanh danh sach field errors.
- Xu ly loi AppException, conversion, binding va loi khong du kien.

**Tai lieu gop:**

- `LESSON_03_CUSTOM_VALIDATOR_GLOBAL_HANDLER.md` (doc hoc chinh)
- `04_CUSTOM_CONSTRAINT_VALIDATOR_SKU.md`
- `05_CONTROLLER_ADVICE_EXCEPTION_HANDLER.md`

**Bai kiem tra:** `Exams/de-kiem-tra/M1-4-validation-error__2026-09-16__lesson3-lan1.md`

**Trang thai:** Dang hoc.

## Lesson 04 - ProblemDetail Va Mini Project

**Chu de:**

- `ProblemDetail` va RFC 7807.
- Thiet ke error response co `type`, `title`, `status`, `detail`, `code`, `path`.
- Chuyen tu format `ApiErrorResponse` sang ProblemDetail.
- Test cac nhom loi trong Product/Category.
- Hoan thien deliverable M1-4 trong `shopcore`.

**Tai lieu gop:**

- `06_PROBLEM_DETAIL_RFC7807.md`
- `07_MINI_PROJECT_CHECKLIST.md`

**Trang thai:** Chua hoc.

## Thu tu hoc va thi

```text
Lesson 01 -> Lesson 02 -> Lesson 03 -> Lesson 04 -> Final M1-4
```

Moi lesson chi co **mot bai hoc va mot bai kiem tra**. Cac file con lai la tai lieu con trong lesson, khong tao them bai thi rieng.

## Phan da hoc, khong can hoi lai

Ban da nam cac y sau o Lesson 01-02:

- Request di qua FilterChain, DispatcherServlet, HandlerMapping, HandlerAdapter.
- JSON sai format khac DTO sai constraint.
- `@Valid` fail thi Controller method khong chay.
- Validation error thuong la `400`.
- `AppException` danh cho business error.
- `404` cho resource khong ton tai, `409` cho conflict.
- DTO la lop nhan du lieu tu client va can rule validation.

## Phan can tap trung tiep

- `@Validated` tren Controller va validation cho method parameter.
- Nested DTO va cascade validation.
- Custom `ConstraintValidator`.
- `@RestControllerAdvice` gom loi va tao response.
- ProblemDetail.
- Test endpoint bang cac input sai khac nhau.

## Tieu chi pass module

- Hoan thanh 4 bai kiem tra.
- Diem tong ket module >= 85.
- `shopcore` co DTO validation, custom SKU validator, global handler va ProblemDetail.
