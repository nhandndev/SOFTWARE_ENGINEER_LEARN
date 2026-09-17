# Ghi chú về `@Validated` & Validation Groups (Bật/Tắt công tắc Validation)

> **Cốt lõi:** Validation Group KHÔNG TỰ VALIDATE dữ liệu. Nó chỉ đóng vai trò như một **CÔNG TẮC BẬT/TẮT** để quyết định Annotation nào (`@NotBlank`, `@ValidSku`...) được phép chạy trong từng API cụ thể.

---

## 1. Bản chất: Ẩn dụ "Ca làm việc"

- **Annotation (`@NotBlank`, `@ValidSku`...):** Là những **chú cảnh sát** thực thi nhiệm vụ kiểm tra dữ liệu.
- **Group (`CreateGroup.class`, `UpdateGroup.class`):** Là **ca làm việc** (Ca sáng / Ca tối) được dán lên áo chú cảnh sát.
- **`@Validated(CreateGroup.class)` ở Controller:** Là lệnh chỉ đạo: *"API này chỉ cho ca sáng làm việc!"*.

```text
               @Validated(CreateGroup.class) ở Controller
                                   │
                                   ▼
         ┌─────────────────────────┴─────────────────────────┐
         │                                                   │
         ▼                                                   ▼
@NotBlank(groups = CreateGroup.class)               @NotNull(groups = UpdateGroup.class)
   👉 Khớp ca -> BẬT CÔNG TẮC                       👉 Khác ca -> TẮT CÔNG TẮC
   👉 THỰC THI VALIDATE                                👉 BỎ QUA KHÔNG CHECK
```

---

## 2. Phân biệt `@Valid` vs `@Validated`

| Annotation | Nguồn gốc | Có hỗ trợ truyền Group không? | Cú pháp sử dụng |
|---|---|:---:|---|
| **`@Valid`** | Jakarta Bean Validation (Chuẩn Java) | ❌ **KHÔNG** | `@Valid @RequestBody UserDTO dto` |
| **`@Validated`** | Spring Framework (Spring chế thêm) | ✅ **CÓ** | `@Validated(CreateGroup.class) @RequestBody UserDTO dto` |

> 💡 **Quy tắc:** Khi KHÔNG dùng Group thì dùng `@Valid`. Khi muốn chọn Group cụ thể thì dùng `@Validated(GroupName.class)`.

---

## 3. Tại sao Custom Annotation bắt buộc có `groups() default {};`?

Trong Custom Annotation (như `@ValidSku`), dòng code:

```java
Class<?>[] groups() default {};
```

- **KHÔNG PHẢI** do bạn muốn viết, mà do **Framework Jakarta Validation ép buộc**.
- `default {}`: Có nghĩa là mặc định không gắn nhãn ca làm việc nào (dành cho các trường hợp validate thông thường).

---

## 4. Code mẫu hoàn chỉnh 100%

### Bước 1: Tạo 2 Interface rỗng làm nhãn (Marker Interface)

```java
// CreateGroup.java
package com.shopcore.common.validation.group;
public interface CreateGroup {}

// UpdateGroup.java
package com.shopcore.common.validation.group;
public interface UpdateGroup {}
```

### Bước 2: Dán nhãn vào DTO

```java
public class UserRequest {

    // Tạo mới KHÔNG CẦN id. Cập nhật BẮT BUỘC CÓ id.
    @NotNull(groups = UpdateGroup.class, message = "Cập nhật bắt buộc phải có ID")
    private Long id;

    // Cả 2 trường hợp đều bắt buộc
    @NotBlank(groups = {CreateGroup.class, UpdateGroup.class}, message = "Username không rỗng")
    private String username;

    // Tạo mới BẮT BUỘC password. Cập nhật ĐƯỢC BỎ QUA (để giữ password cũ).
    @NotBlank(groups = CreateGroup.class, message = "Đăng ký phải nhập password")
    private String password;
}
```

### Bước 3: Kích hoạt công tắc ở Controller bằng `@Validated`

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    // API 1: Tạo mới -> BẬT công tắc CreateGroup
    @PostMapping
    public ResponseEntity<?> createUser(
            @Validated(CreateGroup.class) @RequestBody UserRequest request
    ) {
        // -> Spring chỉ check: username + password (bỏ qua id)
        return ResponseEntity.ok("Tạo mới thành công");
    }

    // API 2: Cập nhật -> BẬT công tắc UpdateGroup
    @PutMapping
    public ResponseEntity<?> updateUser(
            @Validated(UpdateGroup.class) @RequestBody UserRequest request
    ) {
        // -> Spring chỉ check: id + username (bỏ qua password)
        return ResponseEntity.ok("Cập nhật thành công");
    }
}
```

---

## 5. Khi nào NÊN và KHÔNG NÊN dùng?

- 🟢 **NÊN DÙNG:** Khi muốn **dùng chung 1 DTO duy nhất** cho cả 2 API `Create` và `Update` để tiết kiệm số lượng file trong dự án.
- 🔴 **KHÔNG NÊN DÙNG:** Khi dự án của bạn đã tách biệt sẵn mỗi API 1 DTO riêng (`CreateUserRequest`, `UpdateUserRequest`) ➔ Cứ dùng `@Valid` bình thường cho đơn giản, không cần đụng tới Group!
