# Kiểm định chất lượng M2-2 → M4-2

> Đây là kiểm tài liệu, không chấm lại học viên. Không thay điểm, trạng thái, bài làm hoặc capstone. Không dùng chữ “không thiếu sót tuyệt đối” khi chưa có bằng chứng.

## Các task độc lập

| Task | Phạm vi | Trạng thái |
|---|---|---|
| [00](TASK_00_INVENTORY.md) | Inventory, bảo toàn bài làm/tiến độ, link/format/rubric | Xong |
| [01](TASK_01_POSTGRESQL.md) | M2-2 PostgreSQL | Xong, có sửa |
| [02](TASK_02_FLYWAY.md) | M2-3 Flyway | Xong, có sửa rubric |
| [03](TASK_03_N_PLUS_1_HIKARICP.md) | M2-4 N+1/HikariCP | Xong |
| [04](TASK_04_REST.md) | M3-1 REST | Xong |
| [05](TASK_05_SECURITY_CORE.md) | M3-2 Security Core | Xong |
| [06](TASK_06_JWT.md) | M3-3 JWT | Xong, có sửa |
| [07](TASK_07_OAUTH2_OIDC.md) | M3-4 OAuth2/OIDC | Xong, có sửa |
| [08](TASK_08_OPENAPI_CLIENT.md) | M3-5 OpenAPI/Client | Xong, có sửa rubric |
| [09](TASK_09_DOCKER.md) | M4-1 Docker | Xong, có sửa rubric |
| [10](TASK_10_GITHUB_ACTIONS_CI.md) | M4-2 CI | Xong |
| [11](TASK_11_REGRESSION_COVERAGE.md) | Regression, coverage và Vault | Xong; đã đồng bộ |

## Chuẩn kiểm

Mỗi task module kiểm riêng: (1) checklist roadmap và mức học BE → AI, (2) kiến thức đúng/điều kiện áp dụng, (3) ví dụ có giả định/luồng/kết quả và cảnh báo, (4) câu hỏi đã được dạy và đủ dữ kiện, (5) đáp án/rubric đúng, tổng điểm và công bằng, (6) nguồn official + giới hạn verification.

Severity: **P1** sai kiến thức hoặc nguy hiểm/mất dữ liệu/lộ quyền; **P2** thiếu điều kiện, câu hỏi chấm ngoài đề hoặc ví dụ khó tái hiện; **P3** readability/link/format. Không đánh dấu đạt chỉ vì link và số câu đúng. Kiểm tĩnh không thay test runtime; kiểm lịch sử không được báo như vừa chạy lại.

Mỗi task có báo cáo riêng ghi lesson/câu đã đọc, lỗi, bản sửa, nguồn và phần chưa kiểm thực tế.

## Kết luận nội dung

**37 lesson + 37 cặp đề/đáp án + 296 câu đã được đối chiếu theo 12 task.** Sau sửa, chưa thấy checklist trọng tâm roadmap bị thiếu hẳn hoặc lỗi tĩnh bắt buộc còn bỏ ngỏ trong phạm vi kiểm. Không cần rewrite toàn bộ hay thêm lesson chỉ để tăng số lượng.

Sửa quan trọng nhất: validator JWT buộc có exp/sub; public refresh đúng policy; giữ rule DELETE ADMIN khi thêm OAuth; cảnh báo NUMERIC/identity; bỏ tiêu chí chấm ngoài đề. Có thêm [ghi chú tích hợp API/Security/lỗi](../M3_API_Security/README_TICH_HOP_CONTRACT.md).

**Chấm nghiêm = đúng trọng tâm, không nương lỗi bản chất, cũng không gài tiêu chí.** Đủ mọi ý đã hỏi mới 5/5; có đúng từ khóa nhưng sai cơ chế không được điểm của cơ chế; ý tương đương được chấp nhận. Lời khuyên ngoài đề không tự thành điểm trừ. Giữ 8×5=40đ, đạt 34/40; không đổi ngưỡng hoặc điểm cũ của bạn.

Đã chạy SQL PostgreSQL/Compose DB cô lập, decoder JWT thật, compile snippet, client mock và lint workflow. **Chưa kiểm full Boot app/Google Login/Flyway CLI/springdoc runtime/Redis/GHCR**, nên không tuyên bố “production-ready” hoặc “không thể còn lỗi”. Chi tiết từng bằng chứng và giới hạn ở Task 11.

39/39 checksum roadmap, tiến độ và đề giữ nguyên. Một lỗi fence có sẵn trong bài làm PostgreSQL Lesson01 được ghi nhận, không chỉnh bài hoặc điểm.

## Kiểm lại

```bash
node Notes/QUALITY_AUDIT_2026_10_07/verify-structure.mjs
```

Checker kèm baseline lịch sử, không thay review nội dung. Báo cáo này đánh giá **chất lượng tài liệu**, không tự cho bạn pass các module chưa học.

## Vault

Đã copy và đối chiếu byte 37/37 file theo `SYNC_MANIFEST.json` sang `Documents/Learning_Vault/Software_Engineer`. Không xóa file đích, không copy đè roadmap/tiến độ/đề học viên. 20 bản cũ được giữ tạm ở `/private/tmp/learning-audit/vault-before-sync` trước copy; đây không phải backup dài hạn. Chỉ ghi nhận đồng bộ của lượt audit này, không thay cấu hình cơ chế sync thường ngày.
