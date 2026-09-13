# Snapshot cham phan Category - M1-3 JPA Mini Project

> Ngay cham: 2026-09-14  
> Pham vi: Category Entity, Repository, Service, Controller, Exception, Paging, Auditing.

## Ket qua

- Diem: **93 / 100**
- Trang thai: **🟢 Dat phan Category**
- Compile Maven: **Pass**

Phan Category da du de chuyen sang Product.

## Ban da lam duoc

- Category la JPA entity, co id generated.
- Co unique/not-null cho name.
- Co `BaseEntity` auditing va `@EnableJpaAuditing`.
- Create co check duplicate name va nem `AppException`.
- Create co `@Valid`.
- Co GET detail `/api/categories/{id}`.
- Update co xu ly not found va duplicate name.
- Delete co xu ly not found.
- Paging dung `PageRequest` + `Page<Category>`.
- Paging da map `createdAt`, `updatedAt`, `last`.
- Controller co status 201, 200, 204.
- Dung Lombok Builder dung style project.

## Bang diem

| Hang muc | Diem | Nhan xet |
|---|---:|---|
| Entity + auditing | 20/20 | Entity, BaseEntity, auditing dung. |
| Repository | 9/10 | JpaRepository va query dung; con import `NotBlank` thua. |
| Create | 15/15 | Validate, duplicate, save, map response dung. |
| Get detail | 10/10 | Controller da expose GET `/{id}`, Service xu ly 404. |
| List + paging | 14/15 | Paging va metadata dung; error code page/size nen la `INVALID_PARAMETER`. |
| Update | 15/15 | Not found, duplicate name, managed entity update dung. |
| Delete + HTTP contract | 9/10 | Logic dung, giu `ApiResponse` theo style ban; 204 ve convention thuong khong co body. |
| Code quality | 1/5 | Con import thua, `public final` repository field, code map bi lap. |

## Ghi chu ve delete

Ban muon tat ca response deu co `ApiResponse`, va trong project cua ban dang theo style do. Minh chap nhan cach nay cho bai tap:

```java
ResponseEntity<ApiResponse<Void>>
```

Tuy nhien can hieu HTTP convention:

```text
204 No Content = response khong co body.
```

Vi vay mot so client co the bo qua body du ban truyen `ApiResponse`. Khong phai loi compile, nhung khi lam production can chon mot trong hai:

```text
Cach 1: 204 + body rong, dung REST convention.
Cach 2: 200 + ApiResponse<Void>, neu bat buoc muon tra message.
```

Trong bai nay minh khong tru diem nang vi ban da thong nhat style ApiResponse.

## Diem can chinh nhe

### 1. Dung error code cho page/size

Hien tai:

```java
throw new AppException(ErrorCode.INVALID_REQUEST);
```

Nen la:

```java
throw new AppException(ErrorCode.INVALID_PARAMETER);
```

vi `page` va `size` la query parameter sai.

### 2. Xoa import thua

Trong `CategoryService` dang co import thua:

```java
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
```

Khong sai compile, chi la code quality.

### 3. Dung field dependency private

Hien tai:

```java
public final CategoryRepository categoryRepository;
```

Nen la:

```java
private final CategoryRepository categoryRepository;
```

`@RequiredArgsConstructor` van inject duoc.

### 4. Gop mapping thanh mot method

Ban dang lap lai `CategoryResponse.builder()` o create/get/update/list. Co the gom:

```java
private CategoryResponse toResponse(Category category) {
    return CategoryResponse.builder()
            .id(category.getId())
            .name(category.getName())
            .createdAt(category.getCreatedAt())
            .updatedAt(category.getUpdatedAt())
            .build();
}
```

## Ket luan

Category da hoan thanh feature chinh. Khong con loi logic lon. Ban co the chuyen sang:

```text
ProductService.create()
```

Thu tu Product:

```text
1. Check duplicate SKU.
2. Find Category theo categoryId.
3. Build Product bang @Builder.
4. Set Category entity vao Product.
5. Save.
6. Map ProductResponse.
```

