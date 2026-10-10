# M4-1 Docker · Lesson 02 · Lần 1

PHONG_VAN theo lesson 8 × 5=40đ, đạt 34/40, 30–40 phút. Dựa Dockerfile Maven/JDK 21→JRE 21 trong bài, không cần thuộc cú pháp từng instruction.

## Câu 1 - Context

docker build -f shopcore/Dockerfile . chạy từ root folder học khác build context shopcore thế nào? COPY có lấy ../secrets ngoài context tùy ý không? Vì sao nên giữ context hẹp?

**Trả lời:**

## Câu 2 - Hai FROM

Giải thích builder/runtime, COPY --from và lợi ích. Final image có tự mang Maven/.m2/source từ builder không? Multi-stage này có phải đã tách layers nội bộ Boot JAR không?

**Trả lời:**

## Câu 3 - Java version và JAR

Compile Java 21 chạy runtime 17 có rủi ro gì? Vì sao chọn đúng executable Boot JAR thay COPY *.jar mù? POM version đổi thì path mẫu cần xử lý sao?

**Trả lời:**

## Câu 4 - USER và ENTRYPOINT

Vì sao chạy non-root và chown artifact? Exec-form ENTRYPOINT java khác chạy java & rồi shell thoát thế nào? Permissions secret/volume có tự đúng chỉ vì đã USER app không?

**Trả lời:**

## Câu 5 - Cache khi sửa source

COPY pom→dependency step→COPY src→package. Sửa ProductService so với sửa pom ảnh hưởng cache thế nào? Cache mount /root/.m2 khác image layer reuse ra sao?

**Trả lời:**

## Câu 6 - Ignore hai hệ thống

.dockerignore khác .gitignore thế nào? Nếu đã COPY secret rồi RUN rm thì có chắc xóa khỏi layers/history/cache không? Nêu cách giữ secret ngoài build context/image.

**Trả lời:**

## Câu 7 - Offline và tests

dependency:go-offline có bảo đảm package mọi profile không cần mạng không? -DskipTests có chứng minh test pass không? Cache/tag mutable ảnh hưởng reproducibility thế nào?

**Trả lời:**

## Câu 8 - Code mới chưa chạy

Rebuild shopcore:local rồi docker start container cũ; app vẫn code cũ. Giải thích và nêu bước áp image mới. Nếu COPY not found thì kiểm gì, khác lỗi runtime config ra sao?

**Trả lời:**
